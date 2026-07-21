/**
 * Worker policy settings — resolution order (worker-autorun-policy spec §2).
 *
 * Two per-dispatch policies decide a session's terminal behavior:
 *   - `merge_policy`: `auto_merge` (merge to base and close) | `pr_stop`
 *     (open a PR, record `resolved`, stop before merging).
 *   - `drift_policy`: `auto_rereview` (contract default — refresh spec and
 *     continue) | `halt` (abort the attempt on material spec drift).
 *
 * Resolution mirrors the contract's mode_resolution_order pattern:
 * bead metadata > workspace global (queue store) > default. A non-enum value
 * at any level falls through to the next level instead of blocking.
 *
 * The `verify_cmd`-unset demotion (auto_merge → pr_stop) is NOT part of pure
 * resolution — the scheduler applies it at dispatch where the workspace
 * verify_cmd config is known.
 */

/** @type {ReadonlyArray<'auto_merge'|'pr_stop'>} */
export const MERGE_POLICIES = ['auto_merge', 'pr_stop'];

/** @type {ReadonlyArray<'auto_rereview'|'halt'>} */
export const DRIFT_POLICIES = ['auto_rereview', 'halt'];

/**
 * @param {ReadonlyArray<string>} allowed
 * @param {ReadonlyArray<unknown>} candidates - Highest priority first.
 * @param {string} fallback
 * @returns {string}
 */
function firstValid(allowed, candidates, fallback) {
  for (const c of candidates) {
    if (typeof c === 'string' && allowed.includes(c)) {
      return c;
    }
  }
  return fallback;
}

/**
 * Resolve the effective policies for one dispatch.
 *
 * @param {{
 *   bead?: { merge_policy?: unknown, drift_policy?: unknown } | null,
 *   queue?: { merge_policy?: unknown, drift_policy?: unknown } | null
 * }} input
 * @returns {{ merge_policy: 'auto_merge'|'pr_stop', drift_policy: 'auto_rereview'|'halt' }}
 */
export function resolvePolicies(input) {
  const bead = input.bead || {};
  const queue = input.queue || {};
  return {
    merge_policy: /** @type {'auto_merge'|'pr_stop'} */ (
      firstValid(
        MERGE_POLICIES,
        [bead.merge_policy, queue.merge_policy],
        'auto_merge'
      )
    ),
    drift_policy: /** @type {'auto_rereview'|'halt'} */ (
      firstValid(
        DRIFT_POLICIES,
        [bead.drift_policy, queue.drift_policy],
        'auto_rereview'
      )
    )
  };
}
