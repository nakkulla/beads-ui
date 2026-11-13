/**
 * The queue `place-bundle` mutation body, shared by the WS handler and the
 * HTTP route (UI-blx2 §3.4) — the same shape `queue-place.js` gives `place`.
 *
 * A placement bundle is one 묶음 of the placement plan: at most one lane-less
 * occupant to bind to a serial lane, plus the steps to move or add into it in
 * order. Writing it as ONE store CAS leaves no gap between the steps for a
 * partner or the candidate to start in, and no half-applied bundle.
 *
 * This module holds NO judgement of its own: the lane and every step come from
 * the caller (ADR UI-hf8v). What it owns is the admission → CAS write →
 * admission-record → fanout → tick sequence both entry points must run alike.
 *
 * @import { Queue } from './queue-store.js'
 * @import { AdmissionResult } from './admission.js'
 */
import { debug } from '../logging.js';
// Import cycle accepted for the same reason `queue-place.js` accepts it: both
// symbols are function declarations called only after both modules load.
import { fanout, laneBlocksEdges } from '../ws/worker-handlers.js';
import { checkWorkerQueueAdmission, tickWorkerQueue } from './attach.js';
import { getWorkerRuntime } from './runtime.js';

const log = debug('worker:queue-place-bundle');

/**
 * @typedef {Object} PlaceBundleInput
 * @property {string} lane - The serial lane (`s1`..`s5`) the bundle seats in.
 * @property {string[]} binds - At most one bead to bind to the lane.
 * @property {Array<{ bead_id: string, index: number }>} steps - The beads to
 * move or add, in order; `index` counts the lane's rows at that moment without
 * the bound bead's own row.
 * @property {number} expected_revision
 */

/**
 * @typedef {Object} PlaceBundleOutcome
 * @property {boolean} applied - True when the whole bundle was written.
 * @property {boolean} conflict - True when the revision CAS rejected it.
 * @property {string} [reason] - The store's reason when it refused the bundle
 * for a non-CAS cause (see `queue-store.js` `placeBundle`).
 * @property {string} [admission_reason] - Why admission refused a step bead
 * the bundle would newly add. REPLY-ONLY: nothing is written.
 * @property {string} [bead_id] - The step bead `admission_reason` names.
 * @property {Queue} queue - The snapshot the caller should project.
 */

/**
 * @returns {ReturnType<typeof import('./queue-store.js').createQueueStore>}
 */
function queueStore() {
  return getWorkerRuntime().queueStore;
}

/**
 * Run the server's queue-entry admission for one bead; a thrown check reads
 * as a `git_error` refusal, as in `queue-place.js`.
 *
 * @param {string} workspace_key
 * @param {string} bead_id
 * @returns {Promise<AdmissionResult>}
 */
async function admitBead(workspace_key, bead_id) {
  try {
    return await checkWorkerQueueAdmission(workspace_key, bead_id);
  } catch (err) {
    log('admission check failed for %s/%s: %o', workspace_key, bead_id, err);
    return { ok: false, reason: 'git_error' };
  }
}

/**
 * The admission record a placement leaves behind — the non-blocking stale
 * mark (UI-dlim §3.2), else the clearing of a prior refusal. The same rule
 * `queue-place.js` applies after a single placement.
 *
 * @param {string} workspace_key
 * @param {string} bead_id
 * @param {AdmissionResult} admission
 * @returns {import('./queue-store.js').QueueOpResult}
 */
function settleAdmission(workspace_key, bead_id, admission) {
  return admission.stale
    ? queueStore().recordAdmission(workspace_key, {
        bead_id,
        reason: 'spec_review_stale',
        stale: true
      })
    : queueStore().clearAdmission(workspace_key, bead_id);
}

/**
 * Whether a bead stands in a waiting area (parallel or serial) of a snapshot.
 *
 * @param {Queue} queue
 * @param {string} bead_id
 * @returns {boolean}
 */
function isWaiting(queue, bead_id) {
  return (
    queue.queue.some((entry) => entry.bead_id === bead_id) ||
    queue.serial_lanes.some((lane) =>
      lane.entries.some((entry) => entry.bead_id === bead_id)
    )
  );
}

/**
 * The `binds`/`steps` of a `place-bundle` payload, or null when either is not
 * the documented shape: `binds` an array of bead ids, `steps` a non-empty
 * array of `{ bead_id, index }` with an integer index ≥ 0.
 *
 * Both entry points validate their body with this one check.
 *
 * @param {any} payload
 * @returns {{ binds: string[], steps: Array<{ bead_id: string, index: number }> }|null}
 */
export function placeBundleShapeOf(payload) {
  const binds = payload.binds;
  const steps = payload.steps;
  if (
    !Array.isArray(binds) ||
    !binds.every((id) => typeof id === 'string' && id.length > 0) ||
    !Array.isArray(steps) ||
    steps.length === 0 ||
    !steps.every(
      (step) =>
        step &&
        typeof step.bead_id === 'string' &&
        step.bead_id.length > 0 &&
        Number.isInteger(step.index) &&
        step.index >= 0
    )
  ) {
    return null;
  }
  return {
    binds: [...binds],
    steps: steps.map((step) => ({ bead_id: step.bead_id, index: step.index }))
  };
}

/**
 * Seat one placement bundle in a serial lane, admission-gated for the beads it
 * newly adds and written in ONE revision-checked store mutation.
 *
 * A stale view is refused before any admission work, as a plan placement is.
 * Admission runs only for steps that stand in no waiting area (a `done` row
 * counts as new, exactly as for `place`); moves and the bind are already in
 * the queue or running. Any refusal returns that bead and its reason and
 * writes NOTHING — no refusal record either, since the bundle as a whole is
 * what was refused. On success each added bead's admission is settled the way
 * a single placement settles it, the final snapshot fans out once, and the
 * Worker is kicked once.
 *
 * @param {string} workspace_key
 * @param {PlaceBundleInput} input
 * @returns {Promise<PlaceBundleOutcome>}
 */
export async function placeBundleInQueue(workspace_key, input) {
  const { lane, binds, steps, expected_revision } = input;
  const before = queueStore().snapshot(workspace_key);
  if (
    !queueStore().placementRevisionMatches(workspace_key, expected_revision)
  ) {
    return { applied: false, conflict: true, queue: before };
  }
  /** @type {Array<{ id: string, admission: AdmissionResult }>} */
  const added = [];
  for (const step of steps) {
    if (isWaiting(before, step.bead_id)) {
      continue;
    }
    const admission = await admitBead(workspace_key, step.bead_id);
    if (!admission.ok) {
      return {
        applied: false,
        conflict: false,
        admission_reason: admission.reason || 'git_error',
        bead_id: step.bead_id,
        queue: queueStore().snapshot(workspace_key)
      };
    }
    added.push({ id: step.bead_id, admission });
  }
  const incoming = [...binds, ...steps.map((step) => step.bead_id)];
  const blocks_edges = laneBlocksEdges(
    workspace_key,
    queueStore().snapshot(workspace_key),
    lane,
    incoming
  );
  const result = queueStore().placeBundle(workspace_key, {
    expected_revision,
    lane,
    binds,
    steps,
    blocks_edges
  });
  if (!result.ok) {
    return {
      applied: false,
      conflict: result.conflict,
      ...(result.conflict ? {} : { reason: result.reason || 'rejected' }),
      queue: result.queue
    };
  }
  let queue = result.queue;
  for (const entry of added) {
    const settled = settleAdmission(workspace_key, entry.id, entry.admission);
    if (settled.ok) {
      queue = settled.queue;
    }
  }
  fanout(workspace_key, queue);
  Promise.resolve(tickWorkerQueue(workspace_key)).catch((err) => {
    log('worker tick after bundle place failed for %s: %o', workspace_key, err);
  });
  return { applied: true, conflict: false, queue };
}
