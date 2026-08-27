/**
 * Push-projection retention for the worker/monitor snapshots (UI-qbbg §4).
 *
 * Pure rules, no I/O: the persisted `queue.json` keeps every record it ever
 * held, and only what travels on the wire is bounded here. The judgment input
 * is ALWAYS the full overlaid raw snapshot — a rule that read its own trimmed
 * output would resurrect old failures the moment a done row fell out of the
 * window, which is exactly the disagreement `workspaces_state.counts` (computed
 * from raw) would then expose.
 *
 * Retention is per BEAD, all-or-nothing: the three view surfaces that read
 * terminal attempts (token totals, `done_kind` / head-review badges, the detail
 * panel's session history) all group by bead, so a partially retained bead is
 * the only shape that can render a wrong number.
 */
import {
  activeAttemptStates,
  headReviewAttemptStates
} from '../../app/utils/active-attempts.js';
import {
  doneAtByBead,
  laneBeadIds,
  serialLaneBeadIds
} from './lane-membership.js';

/** How long a terminal record stays on the wire after it settles (§4.1). */
export const DONE_RETENTION_MS = 7 * 86_400_000;

/** How many most-recent repo operations travel regardless of state (§4.4). */
export const REPO_OPERATIONS_RECENT = 20;

/**
 * Terminal-attempt fields no client source reads (§4.3). Removed from the
 * projection copy only; the durable record keeps them.
 *
 * @type {ReadonlyArray<string>}
 */
const INTERNAL_TERMINAL_FIELDS = [
  'verify_result',
  'verify_cmd_result',
  'receipt_check',
  'receipt_baseline',
  'base_drift',
  'process_identity',
  'guard_warnings',
  'exec_stamped_keys',
  'exec_restore_values',
  'continuation_action'
];

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @returns {Record<string, any>}
 */
function asRecord(value) {
  return isRecord(value) ? value : {};
}

/**
 * @param {unknown} value
 * @returns {any[]}
 */
function asArray(value) {
  return Array.isArray(value) ? value : [];
}

/**
 * Attempt ids the completion coordinator currently has in flight (§4.2-5).
 *
 * The projected `completion_status[*].active_attempt_id` is read straight off
 * `completion_intents[*].active_op.attempt_id`, so both shapes are accepted:
 * the rule must hold whether it is handed the persisted snapshot or one that
 * already carries the completion projection.
 *
 * @param {Record<string, any>} raw
 * @returns {Set<string>}
 */
function completionAttemptIds(raw) {
  /** @type {Set<string>} */
  const ids = new Set();
  for (const status of Object.values(asRecord(raw.completion_status))) {
    if (isRecord(status) && typeof status.active_attempt_id === 'string') {
      ids.add(status.active_attempt_id);
    }
  }
  for (const intent of Object.values(asRecord(raw.completion_intents))) {
    const attempt_id = isRecord(intent)
      ? asRecord(intent.active_op).attempt_id
      : null;
    if (typeof attempt_id === 'string' && attempt_id.length > 0) {
      ids.add(attempt_id);
    }
  }
  return ids;
}

/**
 * Rules 1–5 of §4.2 — everything that does not depend on the retained repo
 * operations.
 *
 * @param {Record<string, any>} raw
 * @param {number} now
 * @returns {Set<string>}
 */
function seedRetainedBeadIds(raw, now) {
  const cutoff = now - DONE_RETENTION_MS;
  const ids = laneBeadIds(raw, ['queue', 'pr_wait', 'merge_queue']);
  for (const bead_id of serialLaneBeadIds(raw)) {
    ids.add(bead_id);
  }
  for (const entry of asArray(raw.done)) {
    if (
      isRecord(entry) &&
      typeof entry.bead_id === 'string' &&
      entry.bead_id.length > 0 &&
      typeof entry.added_at === 'number' &&
      entry.added_at >= cutoff
    ) {
      ids.add(entry.bead_id);
    }
  }
  const attempts = asRecord(raw.attempts);
  // The shared classifier, on the FULL `done` map: a bead whose failure an old
  // done row already resolved must not come back as unhandled just because that
  // row is about to leave the wire.
  const active = activeAttemptStates(attempts, doneAtByBead(raw));
  for (const bead_id of active.winners.keys()) {
    ids.add(bead_id);
  }
  for (const bead_id of headReviewAttemptStates(attempts).keys()) {
    ids.add(bead_id);
  }
  for (const attempt of Object.values(attempts)) {
    if (
      !isRecord(attempt) ||
      typeof attempt.bead_id !== 'string' ||
      attempt.bead_id.length === 0
    ) {
      continue;
    }
    // §4.2 rule 4 excludes `paused` deliberately: a LEAF paused is rule 3's to
    // keep, and one a successor already resumed follows that successor's fate
    // rather than holding the bead open on its own timestamp.
    if (attempt.status === 'paused') {
      continue;
    }
    // A discarded/stopped attempt leaves its lane immediately, so this window
    // is the only thing keeping it in the session history for a while.
    if (
      attempt.status === 'running' ||
      (typeof attempt.finished_at === 'number' && attempt.finished_at >= cutoff)
    ) {
      ids.add(attempt.bead_id);
    }
  }
  for (const attempt_id of completionAttemptIds(raw)) {
    const attempt = asRecord(raw.attempts)[attempt_id];
    if (isRecord(attempt) && typeof attempt.bead_id === 'string') {
      ids.add(attempt.bead_id);
    }
  }
  return ids;
}

/**
 * The repo operations that stay on the wire for one retained bead set (§4.4).
 *
 * @param {Record<string, any>} raw
 * @param {Set<string>} retained_beads
 * @returns {Set<string>}
 */
function retainedOperationIds(raw, retained_beads) {
  const operations = asRecord(raw.repo_operations);
  /** @type {Array<[string, Record<string, any>]>} */
  const entries = [];
  for (const [operation_id, operation] of Object.entries(operations)) {
    if (isRecord(operation)) {
      entries.push([operation_id, operation]);
    }
  }
  /** @type {Set<string>} */
  const ids = new Set();
  // Same order `projectRepoOperations` sorts its cards by, so "recent" means
  // the same thing on both sides.
  const recent = [...entries].sort(
    ([left_id, left], [right_id, right]) =>
      (typeof right.requested_at === 'number' ? right.requested_at : 0) -
        (typeof left.requested_at === 'number' ? left.requested_at : 0) ||
      left_id.localeCompare(right_id)
  );
  for (const [operation_id] of recent.slice(0, REPO_OPERATIONS_RECENT)) {
    ids.add(operation_id);
  }
  const cleanup_failed = asRecord(raw.cleanup_failed);
  for (const [operation_id, operation] of entries) {
    if (
      operation.state === 'failed' &&
      !operation.dismissed &&
      !operation.superseded_by
    ) {
      ids.add(operation_id);
      continue;
    }
    for (const subject of asArray(operation.subjects)) {
      const bead_id = isRecord(subject) ? subject.bead_id : null;
      if (typeof bead_id !== 'string' || bead_id.length === 0) {
        continue;
      }
      if (retained_beads.has(bead_id) || bead_id in cleanup_failed) {
        ids.add(operation_id);
        break;
      }
    }
  }
  for (const attempt of Object.values(asRecord(raw.attempts))) {
    if (
      !isRecord(attempt) ||
      typeof attempt.bead_id !== 'string' ||
      !retained_beads.has(attempt.bead_id) ||
      typeof attempt.repair_operation_id !== 'string'
    ) {
      continue;
    }
    if (attempt.repair_operation_id in operations) {
      ids.add(attempt.repair_operation_id);
    }
  }
  // One step only (§4.4-4): a retained card's "superseded by" link must resolve,
  // but the chain behind it is history.
  for (const operation_id of [...ids]) {
    const successor = asRecord(operations[operation_id]).superseded_by;
    if (typeof successor === 'string' && successor in operations) {
      ids.add(successor);
    }
  }
  return ids;
}

/**
 * The retained bead set R and repo-operation set O, iterated to their fixed
 * point (§4.2). Rule 6 and §4.4 reference each other — a multi-subject op can
 * pull in a bead whose own repair op names a third bead — so both sets grow
 * until neither does. Both are monotone and bounded by the raw record counts.
 *
 * @param {Record<string, any>} raw
 * @param {number} now
 * @returns {{ beads: Set<string>, operations: Set<string> }}
 */
function retainedSets(raw, now) {
  const beads = seedRetainedBeadIds(raw, now);
  const attempts = asRecord(raw.attempts);
  const operations = asRecord(raw.repo_operations);
  let retained_operations = retainedOperationIds(raw, beads);
  for (;;) {
    const size_before = beads.size;
    for (const operation_id of retained_operations) {
      const attempt_id = asRecord(
        asRecord(operations[operation_id]).repair
      ).attempt_id;
      if (typeof attempt_id !== 'string') {
        continue;
      }
      const attempt = attempts[attempt_id];
      if (
        isRecord(attempt) &&
        typeof attempt.bead_id === 'string' &&
        attempt.bead_id.length > 0
      ) {
        beads.add(attempt.bead_id);
      }
    }
    if (beads.size === size_before) {
      return { beads, operations: retained_operations };
    }
    retained_operations = retainedOperationIds(raw, beads);
  }
}

/**
 * The bead ids whose records stay on the wire (§4.2).
 *
 * @param {Record<string, any>} raw - The FULL overlaid snapshot, never a
 * trimmed projection.
 * @param {number} [now]
 * @returns {Set<string>}
 */
export function retainedBeadIds(raw, now = Date.now()) {
  return retainedSets(asRecord(raw), now).beads;
}

/**
 * Strip the internal-only fields from a TERMINAL attempt (§4.3). A running
 * attempt is returned untouched — the live overlay owns it.
 *
 * @param {Record<string, any>} attempt
 * @returns {Record<string, any>}
 */
function slimTerminalAttempt(attempt) {
  if (attempt.status === 'running') {
    return attempt;
  }
  if (!INTERNAL_TERMINAL_FIELDS.some((field) => field in attempt)) {
    return attempt;
  }
  const out = { ...attempt };
  for (const field of INTERNAL_TERMINAL_FIELDS) {
    delete out[field];
  }
  return out;
}

/**
 * Trim the three heavy collections of one snapshot projection (§4.3).
 *
 * @param {Record<string, any>} public_queue - The projection being trimmed.
 * @param {Record<string, any>} raw - Judgment input: the FULL overlaid
 * snapshot, which is what keeps the trimmed output self-consistent.
 * @param {number} [now]
 * @returns {{ done: any[], attempts: Record<string, any>, repo_operations: Record<string, any> }}
 */
export function trimQueueProjection(public_queue, raw, now = Date.now()) {
  const projection = asRecord(public_queue);
  const source = asRecord(raw);
  const { beads, operations } = retainedSets(source, now);
  const cutoff = now - DONE_RETENTION_MS;
  // The `bead_id ∈ R` half of the union guards the client classifier's
  // `doneAtByBead` input: drop the done row that resolved a retained bead's old
  // failure and the client redraws that failure as unhandled. The 완료 레인
  // period filter keeps the row off screen either way.
  const done = asArray(projection.done).filter((entry) => {
    // §6 drops a row with no usable `added_at` unconditionally — a retained
    // bead is no reason to keep it either, because `doneAtByBead` cannot read
    // such a row and it therefore protects no classifier input.
    if (!isRecord(entry) || typeof entry.added_at !== 'number') {
      return false;
    }
    if (typeof entry.bead_id === 'string' && beads.has(entry.bead_id)) {
      return true;
    }
    return entry.added_at >= cutoff;
  });
  /** @type {Record<string, any>} */
  const attempts = {};
  for (const [attempt_id, attempt] of Object.entries(
    asRecord(projection.attempts)
  )) {
    if (
      isRecord(attempt) &&
      typeof attempt.bead_id === 'string' &&
      beads.has(attempt.bead_id)
    ) {
      attempts[attempt_id] = slimTerminalAttempt(attempt);
    }
  }
  /** @type {Record<string, any>} */
  const repo_operations = {};
  for (const [operation_id, operation] of Object.entries(
    asRecord(projection.repo_operations)
  )) {
    if (operations.has(operation_id)) {
      repo_operations[operation_id] = operation;
    }
  }
  return { done, attempts, repo_operations };
}
