/**
 * Which `pr_wait` rows are worth putting in the sequential merge queue
 * (UI-5v7d §3, moved worker-side by UI-yk55 §4.2).
 *
 * There are now TWO callers — the lane's toggle click and the automatic
 * enroller — and the point of the move is that they cannot drift apart: a
 * judgment that lived in the ws layer would have to be reimplemented for the
 * enroller, and two eligibility rules for one queue means nobody can say which
 * one is right. The ws handler keeps its own DISPLAY overlay (`wt_present` and
 * friends); only the judgment lives here.
 *
 * Advisory exactly like the badge it mirrors: the driver re-gates every item at
 * its turn, so a row that goes stale between this call and its merge is refused
 * there, not merged wrongly.
 *
 * @import { Queue } from './queue-store.js'
 */
import { evaluateMergeGate } from './merge-gate.js';
import { getWorkerRuntime } from './runtime.js';

/**
 * Whether a bead has a conflict-resolution session of its own in flight
 * (running or paused). The lane row's [머지] is quiet in exactly that state
 * (UI-dxgz §1), so bulk queuing must not take it either — there is nothing to
 * dispatch until the session settles.
 *
 * @param {Record<string, unknown>} queue
 * @param {string} bead_id
 * @returns {boolean}
 */
export function hasConflictSession(queue, bead_id) {
  const attempts = /** @type {Record<string, any>} */ (queue.attempts || {});
  const values = Object.values(attempts);
  // A paused attempt that was already RESUMED is spent history — its child is
  // the live one. Counting it forever would keep a row out of bulk queuing long
  // after the row's own badge said the session was over, which is the exact
  // leaf/supersession rule the client's running list applies.
  const resumed_from = new Set(
    values
      .map((a) => a && a.resumed_from)
      .filter((id) => typeof id === 'string')
  );
  /**
   * `conflict_resolution` is INHERITED through `resumed_from`, exactly as the
   * client inherits it: resuming a paused resolution mints a child that does
   * not re-declare the flag.
   *
   * @param {any} attempt
   * @returns {boolean}
   */
  function isResolution(attempt) {
    let cur = attempt;
    const seen = new Set();
    while (cur && !seen.has(cur.attempt_id)) {
      if (cur.conflict_resolution === true) {
        return true;
      }
      seen.add(cur.attempt_id);
      cur =
        typeof cur.resumed_from === 'string'
          ? attempts[cur.resumed_from]
          : null;
    }
    return false;
  }
  for (const attempt of values) {
    if (!attempt || attempt.bead_id !== bead_id) {
      continue;
    }
    const live =
      attempt.status === 'running' ||
      (attempt.status === 'paused' && !resumed_from.has(attempt.attempt_id));
    if (live && isResolution(attempt)) {
      return true;
    }
  }
  return false;
}

/**
 * The lane as the user sees it: the durable `pr_wait` plus the EXTERNAL rows,
 * which live only in the in-memory registry (UI-7agi §2) and therefore cannot be
 * read out of `queue.json` at all.
 *
 * Only the two fields the judgment needs are synthesized here — the ws layer's
 * own overlay additionally carries display state (`wt_present`), which no
 * eligibility rule reads.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue
 * @returns {Array<{ bead_id: string, external: boolean }>}
 */
export function overlaidPrWait(workspace_key, queue) {
  const lane = Array.isArray(queue.pr_wait)
    ? /** @type {any[]} */ (queue.pr_wait)
    : [];
  /** @type {Array<{ bead_id: string, external: boolean }>} */
  const out = [];
  const seen = new Set();
  for (const entry of lane) {
    const bead_id = entry && entry.bead_id;
    if (
      typeof bead_id !== 'string' ||
      bead_id.length === 0 ||
      seen.has(bead_id)
    ) {
      continue;
    }
    seen.add(bead_id);
    out.push({ bead_id, external: entry.external === true });
  }
  /** @type {import('./external-pr.js').ExternalPrRow[]} */
  let rows = [];
  try {
    rows = getWorkerRuntime().externalPrs.list(workspace_key);
  } catch {
    rows = [];
  }
  for (const row of rows) {
    // A bead the worker itself put in `pr_wait` is a WORKER row: the durable
    // attempt is the better record, so the overlay yields to it.
    if (seen.has(row.bead_id)) {
      continue;
    }
    seen.add(row.bead_id);
    out.push({ bead_id: row.bead_id, external: true });
  }
  return out;
}

/**
 * The rows bulk queuing takes, in lane display order.
 *
 * This is the SERVER's copy of the row's `merge_enabled` judgment, deliberately
 * expressed as the same four disjuncts the client uses: a passing gate, a
 * conflicting non-external row (whose click dispatches a resolution — a
 * first-class queue path), a cleanup retry, and an external merged row's [정리].
 * It has to live server-side because bulk queuing has no per-row click to carry
 * the client's own verdict, and the queue must not be filled with rows the
 * driver would only refuse.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue - The OVERLAID snapshot (external rows
 * included), i.e. what the lane actually renders.
 * @param {boolean} verify_cmd_present
 * @returns {Array<{ bead_id: string, external: boolean }>}
 */
export function mergeQueueCandidates(workspace_key, queue, verify_cmd_present) {
  const lane = Array.isArray(queue.pr_wait)
    ? /** @type {any[]} */ (queue.pr_wait)
    : [];
  /** @type {Record<string, any>} */
  let observed = {};
  try {
    observed = getWorkerRuntime().prObservations.snapshot(workspace_key);
  } catch {
    observed = {};
  }
  const cleanup_failed = /** @type {Record<string, any>} */ (
    queue.cleanup_failed || {}
  );
  /** @type {Array<{ bead_id: string, external: boolean }>} */
  const out = [];
  for (const entry of lane) {
    const bead_id = entry && entry.bead_id;
    if (typeof bead_id !== 'string' || bead_id.length === 0) {
      continue;
    }
    if (hasConflictSession(queue, bead_id)) {
      continue;
    }
    const external = entry.external === true;
    const gate = evaluateMergeGate(observed[bead_id] || null, {
      verify_cmd_present
    });
    const conflicting = gate.base_badge === '충돌';
    const merged_tier = gate.tier === 'merged';
    // An EXTERNAL conflict vetoes even a green gate, exactly as the row does
    // (UI-7agi §5): the click-time branch order puts DIRTY before the gate, so
    // `merge()` refuses it whatever its CI says.
    if (external && conflicting) {
      continue;
    }
    const eligible =
      gate.enabled === true ||
      (conflicting && !external) ||
      (!!cleanup_failed[bead_id] && merged_tier) ||
      (external && merged_tier);
    if (!eligible) {
      continue;
    }
    out.push({ bead_id, external });
  }
  return out;
}

/**
 * The head SHA the server has OBSERVED for a bead's PR, or null when it has
 * none. The auto-merge exclusion is pinned to this value, so an unreadable head
 * is never guessed — every caller treats null as "cannot decide" and fails
 * closed (UI-yk55 §3.2).
 *
 * @param {string} workspace_key
 * @param {string} bead_id
 * @returns {string|null}
 */
export function observedHeadSha(workspace_key, bead_id) {
  try {
    const entry = getWorkerRuntime().prObservations.get(workspace_key, bead_id);
    const sha = entry && entry.pr ? entry.pr.head_sha : null;
    return typeof sha === 'string' && sha.length > 0 ? sha : null;
  } catch {
    return null;
  }
}
