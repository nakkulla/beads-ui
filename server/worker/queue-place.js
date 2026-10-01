/**
 * The queue `place` mutation body, shared by the WS handler and the HTTP route
 * (UI-1gpj §3.3).
 *
 * This module holds NO judgement of its own: "which lane suits this bead" stays
 * with the caller (ADR 0009). What it owns is the admission → CAS place →
 * admission-record → fanout → tick sequence that both entry points must run
 * identically, because a second copy of it would drift.
 *
 * @import { Queue } from './queue-store.js'
 * @import { AdmissionResult } from './admission.js'
 */
import { planGroupForPath } from '../list-adapters.js';
import { debug } from '../logging.js';
import { requestWorkspaceSnapshot } from '../workspace-snapshot-runtime.js';
// Import cycle accepted: `worker-handlers.js` imports this module back. Both
// symbols are function declarations called only after both modules initialize,
// so ESM live bindings resolve regardless of which loads first. Relocating
// `fanout` would drag `decorateQueue` and the whole wire projection with it.
import {
  fanout,
  laneBlocksEdges,
  laneMemberIds
} from '../ws/worker-handlers.js';
import { checkWorkerQueueAdmission, tickWorkerQueue } from './attach.js';
import { getWorkerRuntime } from './runtime.js';

const log = debug('worker:queue-place');

/**
 * @typedef {Object} PlaceOutcome
 * @property {boolean} applied - True when the bead was written into a lane.
 * @property {boolean} conflict - True when the revision CAS rejected the write.
 * @property {string} [admission_reason] - Why auto-run admission refused; the
 * queue is unchanged apart from the persisted refusal record.
 * @property {string} [reason] - `'rejected'` when the store refused the write
 * for a non-CAS cause (unknown lane, slot beyond the configured count, discard
 * in flight).
 * @property {string} [lane] - The lane the bead actually landed in, after the
 * `blocks` reordering pass; `'parallel'` or `'s1'`..`'s5'`.
 * @property {number} [index] - Its index within that lane.
 * @property {Queue} queue - The snapshot the caller should project.
 */

/**
 * @returns {ReturnType<typeof import('./queue-store.js').createQueueStore>}
 */
function queueStore() {
  return getWorkerRuntime().queueStore;
}

/**
 * Where a bead sits among the WAITING entries of a snapshot.
 *
 * Read back from the result rather than echoed from the request because
 * `applyLaneBlocksOrder` may move the row after the insert, and the caller's
 * report has to name the seat the bead really got.
 *
 * @param {Queue} queue
 * @param {string} bead_id
 * @returns {{ lane: string, index: number }|null}
 */
function waitingSeatOf(queue, bead_id) {
  const parallel = Array.isArray(queue.queue) ? queue.queue : [];
  const parallel_index = parallel.findIndex(
    (entry) => entry.bead_id === bead_id
  );
  if (parallel_index >= 0) {
    return { lane: 'parallel', index: parallel_index };
  }
  const lanes = Array.isArray(queue.serial_lanes) ? queue.serial_lanes : [];
  for (const lane of lanes) {
    const entries = Array.isArray(lane.entries) ? lane.entries : [];
    const index = entries.findIndex((entry) => entry.bead_id === bead_id);
    if (index >= 0) {
      return { lane: lane.id, index };
    }
  }
  return null;
}

/**
 * Run the server's queue-entry admission for one bead. A thrown check reads as
 * a refusal (`git_error`) rather than an escape, so a caller never has to guess
 * whether a bead it could not check may be placed.
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
 * The admission record a successful placement leaves behind: the non-blocking
 * stale mark when the pass observed a stale receipt (UI-dlim §3.2), else the
 * clearing of any prior refusal.
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
 * Place a bead into a waiting lane, admission-gated and CAS-guarded.
 *
 * Every branch that CHANGED the queue — a placement, a persisted refusal, the
 * stale mark or the refusal clear that follows a placement — fans the final
 * snapshot out exactly once, so an HTTP caller reaches Worker-tab subscribers
 * on the same terms a WS caller does.
 *
 * @param {string} workspace_key
 * @param {{ bead_id: string, lane?: string, index?: number, expected_revision: number }} input
 * @returns {Promise<PlaceOutcome>}
 */
export async function placeBeadInQueue(workspace_key, input) {
  const { bead_id } = input;
  const admission = await admitBead(workspace_key, bead_id);
  if (!admission.ok) {
    const reason = admission.reason || 'git_error';
    // Persist the refusal so the candidate badge renders it for EVERY client
    // (the reply-only admission_reason was droppable — implementation review
    // 2026-07-22 finding 4).
    let recorded = false;
    try {
      recorded = queueStore().recordAdmission(workspace_key, {
        bead_id,
        reason
      }).ok;
    } catch (err) {
      log('admission record failed for %s/%s: %o', workspace_key, bead_id, err);
    }
    const snap = queueStore().snapshot(workspace_key);
    // A REPEATED identical refusal is a no-op write (`recordAdmission` reports
    // `ok:false` without bumping the revision), and so is a throwing one: the
    // fanout obligation is owned by the branches that CHANGED the queue.
    if (recorded) {
      fanout(workspace_key, snap);
    }
    return {
      applied: false,
      conflict: false,
      admission_reason: reason,
      queue: snap
    };
  }
  const place_lane =
    typeof input.lane === 'string' && /^s[1-5]$/.test(input.lane)
      ? input.lane
      : undefined;
  let result = queueStore().place(workspace_key, {
    expected_revision: input.expected_revision,
    bead_id,
    lane: place_lane,
    index: typeof input.index === 'number' ? input.index : undefined,
    blocks_edges: laneBlocksEdges(
      workspace_key,
      queueStore().snapshot(workspace_key),
      place_lane,
      bead_id
    )
  });
  if (!result.ok) {
    return {
      applied: false,
      conflict: result.conflict,
      ...(result.conflict ? {} : { reason: 'rejected' }),
      queue: result.queue
    };
  }
  // A successful (admission-passed) placement clears any prior refusal —
  // unless the pass itself observed a stale receipt (UI-dlim §3.2), in which
  // case the placement REPLACES the refusal with the non-blocking stale mark
  // so the queued row announces the in-session re-review from the moment it
  // enters the lane.
  const applied = settleAdmission(workspace_key, bead_id, admission);
  if (applied.ok) {
    result = { ...result, queue: applied.queue };
  }
  fanout(workspace_key, result.queue);
  // A placement is the OTHER thing that can fill a free slot, and it is the
  // only dispatch path a discarded bead has (discard spec §1): without this
  // kick an auto_advance-ON queue would sit idle until the next attempt
  // finished. Same fire-and-forget pattern as the toggle-ON tick.
  Promise.resolve(tickWorkerQueue(workspace_key)).catch((err) => {
    log('worker tick after place failed for %s: %o', workspace_key, err);
  });
  const seat = waitingSeatOf(result.queue, bead_id);
  return {
    applied: true,
    conflict: false,
    ...(seat ? { lane: seat.lane, index: seat.index } : {}),
    queue: result.queue
  };
}

/**
 * @typedef {Object} PlacePlanOutcome
 * @property {boolean} applied - True when at least one bead was written.
 * @property {boolean} conflict - True when the revision CAS rejected the write.
 * @property {string} [reason] - Why nothing was written (`snapshot_unavailable`,
 * `plan_group_not_found`, `no_eligible`, `rejected`, or the store's own reason
 * such as `member_present`); absent on success.
 * @property {string[]} placed - Bead ids written into the lane, in anchor order.
 * @property {Array<{ id: string, reason: string }>} skipped - Group members the
 * server's admission refused. REPLY-ONLY: no refusal is persisted for them.
 * @property {Queue} queue - The snapshot the caller should project.
 */

/**
 * Place a plan's open, not-yet-queued issues into one serial lane (UI-ruwu §3).
 *
 * The targets come from the SERVER's own workspace snapshot, never from the
 * request: the plan group's members in anchor order that are `open` and stand
 * in no lane. Each target goes through the same {@link checkWorkerQueueAdmission}
 * a single placement runs; a refused one is reported in `skipped` and left out.
 * One survivor takes the single {@link placeBeadInQueue} path, none writes
 * nothing, and two or more are added in ONE revision-checked store mutation so
 * the group is never half-placed. The `blocks` correction is the final order.
 *
 * @param {string} workspace_key
 * @param {{ plan_path: string, lane: string, expected_revision: number }} input
 * @returns {Promise<PlacePlanOutcome>}
 */
export async function placePlanInQueue(workspace_key, input) {
  const { plan_path, lane, expected_revision } = input;
  /** @type {Array<{ id: string, reason: string }>} */
  const skipped = [];
  /**
   * @param {string} reason
   * @returns {PlacePlanOutcome}
   */
  const nothingWritten = (reason) => ({
    applied: false,
    conflict: false,
    reason,
    placed: [],
    skipped,
    queue: queueStore().snapshot(workspace_key)
  });
  // A stale view is refused before any admission work: the store would reject
  // the write at its own CAS anyway, and a git-backed check per member is the
  // expensive part.
  if (queueStore().snapshot(workspace_key).revision !== expected_revision) {
    return {
      applied: false,
      conflict: true,
      placed: [],
      skipped,
      queue: queueStore().snapshot(workspace_key)
    };
  }
  const fetched = await requestWorkspaceSnapshot(
    workspace_key,
    'worker-queue-place-plan'
  );
  const group =
    fetched.ok && !fetched.stale && fetched.snapshot
      ? planGroupForPath(fetched.snapshot, plan_path)
      : null;
  if (!group) {
    return nothingWritten(
      fetched.ok && !fetched.stale
        ? 'plan_group_not_found'
        : 'snapshot_unavailable'
    );
  }
  const standing = new Set(
    laneMemberIds(queueStore().snapshot(workspace_key), true)
  );
  /** @type {Array<{ id: string, admission: AdmissionResult }>} */
  const eligible = [];
  for (const member of group.members) {
    if (member.status !== 'open' || standing.has(member.id)) {
      continue;
    }
    const admission = await admitBead(workspace_key, member.id);
    if (admission.ok) {
      eligible.push({ id: member.id, admission });
    } else {
      skipped.push({ id: member.id, reason: admission.reason || 'git_error' });
    }
  }
  if (eligible.length === 0) {
    return nothingWritten('no_eligible');
  }
  if (eligible.length === 1) {
    const outcome = await placeBeadInQueue(workspace_key, {
      bead_id: eligible[0].id,
      lane,
      expected_revision
    });
    if (typeof outcome.admission_reason === 'string') {
      skipped.push({ id: eligible[0].id, reason: outcome.admission_reason });
    }
    const reason = outcome.admission_reason ? 'no_eligible' : outcome.reason;
    return {
      applied: outcome.applied,
      conflict: outcome.conflict,
      ...(reason ? { reason } : {}),
      placed: outcome.applied ? [eligible[0].id] : [],
      skipped,
      queue: outcome.queue
    };
  }
  const ordered_bead_ids = eligible.map((entry) => entry.id);
  const blocks_edges = laneBlocksEdges(
    workspace_key,
    queueStore().snapshot(workspace_key),
    lane,
    ordered_bead_ids
  );
  // The member's open blockers ride the same snapshot generation, so a target
  // the title cache has not read yet still orders correctly.
  const in_lane = new Set(ordered_bead_ids);
  for (const member of group.members) {
    if (!in_lane.has(member.id)) {
      continue;
    }
    for (const blocker of member.blocked_by) {
      if (
        in_lane.has(blocker) &&
        !blocks_edges.some(
          (edge) => edge.blocker === blocker && edge.blockee === member.id
        )
      ) {
        blocks_edges.push({ blocker, blockee: member.id });
      }
    }
  }
  const result = queueStore().placeSerialGroup(workspace_key, {
    expected_revision,
    lane,
    ordered_bead_ids,
    blocks_edges
  });
  if (!result.ok) {
    return {
      applied: false,
      conflict: result.conflict,
      ...(result.conflict ? {} : { reason: result.reason || 'rejected' }),
      placed: [],
      skipped,
      queue: result.queue
    };
  }
  let queue = result.queue;
  for (const entry of eligible) {
    const settled = settleAdmission(workspace_key, entry.id, entry.admission);
    if (settled.ok) {
      queue = settled.queue;
    }
  }
  fanout(workspace_key, queue);
  Promise.resolve(tickWorkerQueue(workspace_key)).catch((err) => {
    log('worker tick after plan place failed for %s: %o', workspace_key, err);
  });
  return {
    applied: true,
    conflict: false,
    placed: ordered_bead_ids,
    skipped,
    queue
  };
}
