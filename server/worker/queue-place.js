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
import { debug } from '../logging.js';
// Import cycle accepted: `worker-handlers.js` imports this module back. Both
// symbols are function declarations called only after both modules initialize,
// so ESM live bindings resolve regardless of which loads first. Relocating
// `fanout` would drag `decorateQueue` and the whole wire projection with it.
import { fanout, laneBlocksEdges } from '../ws/worker-handlers.js';
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
  /** @type {AdmissionResult | null} */
  let admission = null;
  try {
    admission = await checkWorkerQueueAdmission(workspace_key, bead_id);
  } catch (err) {
    log('admission check failed for %s/%s: %o', workspace_key, bead_id, err);
    admission = { ok: false, reason: 'git_error' };
  }
  if (admission && !admission.ok) {
    const reason = admission.reason || 'git_error';
    // Persist the refusal so the candidate badge renders it for EVERY client
    // (the reply-only admission_reason was droppable — implementation review
    // 2026-07-22 finding 4).
    try {
      queueStore().recordAdmission(workspace_key, { bead_id, reason });
    } catch (err) {
      log('admission record failed for %s/%s: %o', workspace_key, bead_id, err);
    }
    const snap = queueStore().snapshot(workspace_key);
    fanout(workspace_key, snap);
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
  const applied =
    admission && admission.stale
      ? queueStore().recordAdmission(workspace_key, {
          bead_id,
          reason: 'spec_review_stale',
          stale: true
        })
      : queueStore().clearAdmission(workspace_key, bead_id);
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
