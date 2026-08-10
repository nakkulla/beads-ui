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
import { isRepairableCleanupFailure } from './completion-repair-policy.js';
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
  // What an external row YIELDS to (UI-wwby §2). It is seeded with the OTHER
  // durable lanes before anything is emitted: the registry is a whole-set
  // replace on a ~30s tick, so it stays stale for a while after a bead merges
  // and leaves `pr_wait`. Yielding to `pr_wait` alone let that stale row
  // resurrect a bead already sitting in `queue`/`done` as an external
  // candidate — the head that stuck the merge queue. `out`'s composition rule
  // is unchanged; only the yield set widened, which is why the `pr_wait`
  // dedupe below keeps its own set.
  /** @type {Set<string>} */
  const seen = new Set();
  for (const lane_name of ['queue', 'done']) {
    const rows = Array.isArray(queue[lane_name])
      ? /** @type {any[]} */ (queue[lane_name])
      : [];
    for (const entry of rows) {
      const bead_id = entry && entry.bead_id;
      if (typeof bead_id === 'string' && bead_id.length > 0) {
        seen.add(bead_id);
      }
    }
  }
  /** @type {Set<string>} */
  const emitted = new Set();
  for (const entry of lane) {
    const bead_id = entry && entry.bead_id;
    if (
      typeof bead_id !== 'string' ||
      bead_id.length === 0 ||
      emitted.has(bead_id)
    ) {
      continue;
    }
    emitted.add(bead_id);
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
 * @param {'resolved'|'absent'|'invalid'} verify_cmd_state
 * @returns {Array<{ bead_id: string, external: boolean, repairable?: boolean }>}
 */
export function mergeQueueCandidates(workspace_key, queue, verify_cmd_state) {
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
  /** @type {Array<{ bead_id: string, external: boolean, repairable?: boolean }>} */
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
      verify_cmd_state
    });
    const conflicting = gate.base_badge === '충돌';
    const merged_tier = gate.tier === 'merged';
    const repairable =
      !external &&
      ((gate.tier === 'local_verify' && gate.reason === 'verify_cmd_failed') ||
        (gate.tier === 'ci' && gate.reason === 'ci_failed') ||
        (merged_tier && isRepairableCleanupFailure(cleanup_failed[bead_id])));
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
      (external && merged_tier) ||
      repairable;
    if (!eligible) {
      continue;
    }
    out.push({
      bead_id,
      external,
      ...(repairable ? { repairable: true } : {})
    });
  }
  return out;
}

/**
 * Build the bounded initial root subject for a repairable-red intake from the
 * observation cache and the latest worker attempt. The coordinator immediately
 * re-pins both SHAs before acting; this seed exists so intent creation and the
 * public root queue position can be one store mutation.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue
 * @param {string} bead_id
 * @returns {{ target_base: string, subject: any }|null}
 */
export function completionIntentSeed(workspace_key, queue, bead_id) {
  let observed = null;
  try {
    observed = getWorkerRuntime().prObservations.get(workspace_key, bead_id);
  } catch {
    return null;
  }
  const pr = observed?.pr;
  if (
    !pr ||
    typeof pr.url !== 'string' ||
    pr.url.length === 0 ||
    typeof pr.head_sha !== 'string' ||
    !/^[0-9a-f]{40}$/i.test(pr.head_sha)
  ) {
    return null;
  }
  const merged_sha =
    typeof pr.merged_sha === 'string' && /^[0-9a-f]{40}$/i.test(pr.merged_sha)
      ? pr.merged_sha
      : null;
  if (pr.state === 'MERGED' && merged_sha === null) {
    return null;
  }
  /** @type {any} */
  let source = null;
  for (const attempt of Object.values(
    /** @type {Record<string, any>} */ (queue.attempts || {})
  )) {
    if (
      attempt &&
      attempt.bead_id === bead_id &&
      typeof attempt.target_base === 'string' &&
      attempt.target_base.length > 0 &&
      typeof attempt.base_oid === 'string' &&
      /^[0-9a-f]{40}$/i.test(attempt.base_oid)
    ) {
      source = attempt;
    }
  }
  if (!source) {
    return null;
  }
  return {
    target_base: source.target_base,
    subject: {
      role: 'root',
      bead_id,
      pr_url: pr.url,
      head_sha: pr.head_sha,
      base_sha: source.base_oid,
      merged_sha: pr.state === 'MERGED' ? merged_sha : null
    }
  };
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
