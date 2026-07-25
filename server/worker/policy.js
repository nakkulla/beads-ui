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
import { EFFORTS, IMPL_MODELS, MODELS, REVIEW_MODELS } from './exec-enums.js';

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

/**
 * @param {ReadonlyArray<string>} allowed
 * @param {unknown} value
 * @returns {boolean}
 */
function isEnum(allowed, value) {
  return typeof value === 'string' && allowed.includes(value);
}

/**
 * Pick a runner-independent enum value across the [bead, global] hierarchy.
 * A key whose bead value is ABSENT (not present as any string) but resolves
 * from the global default is pushed to `stamped_keys` — a bead-SET key (even
 * one skipped as an invalid value) is never a stamp/revert target (spec §3).
 *
 * @param {ReadonlyArray<string>} allowed
 * @param {unknown} beadVal
 * @param {unknown} globalVal
 * @param {string} stampKey - The metadata key name recorded in stamped_keys.
 * @param {string[]} stamped_keys - Accumulator, mutated in place.
 * @returns {string|undefined}
 */
function pickLayered(allowed, beadVal, globalVal, stampKey, stamped_keys) {
  if (isEnum(allowed, beadVal)) {
    return /** @type {string} */ (beadVal);
  }
  if (isEnum(allowed, globalVal)) {
    if (typeof beadVal !== 'string') {
      stamped_keys.push(stampKey);
    }
    return /** @type {string} */ (globalVal);
  }
  return undefined;
}

/**
 * Resolve the 4 exec settings for one dispatch (worker-global-exec-defaults;
 * runner axis retired by worker-phase1 §4).
 *
 * Order is bead metadata > workspace-global default > unset. All four keys are
 * plain enum-hierarchy picks — with claude as the only runner there is no
 * runner-dependent model catalog to reconcile.
 *
 * `stamped_keys` is the list of METADATA key names whose bead value was absent
 * and whose resolved value came from the workspace-global default — i.e. the
 * exact keys dispatch should stamp onto the bead metadata (and revert on
 * terminate). Order is stable: orchestration_model, orchestration_effort,
 * review_model, impl_model.
 *
 * The `bead` argument uses the BeadSnapshot field names (model/effort/
 * review_model/impl_model); `defaults` uses the exec_defaults metadata key
 * names (orchestration_model/orchestration_effort/review_model/impl_model).
 *
 * @param {{
 *   bead?: { model?: unknown, effort?: unknown, review_model?: unknown, impl_model?: unknown } | null,
 *   defaults?: { orchestration_model?: unknown, orchestration_effort?: unknown, review_model?: unknown, impl_model?: unknown } | null
 * }} input
 * @returns {{
 *   orchestration_model: string|undefined,
 *   orchestration_effort: string|undefined,
 *   review_model: string|undefined,
 *   impl_model: string|undefined,
 *   stamped_keys: string[]
 * }}
 */
export function resolveExecSettings(input) {
  const bead = (input && input.bead) || {};
  const defaults = (input && input.defaults) || {};
  /** @type {string[]} */
  const stamped_keys = [];

  const orchestration_model = pickLayered(
    MODELS,
    bead.model,
    defaults.orchestration_model,
    'orchestration_model',
    stamped_keys
  );
  const orchestration_effort = pickLayered(
    EFFORTS,
    bead.effort,
    defaults.orchestration_effort,
    'orchestration_effort',
    stamped_keys
  );
  const review_model = pickLayered(
    REVIEW_MODELS,
    bead.review_model,
    defaults.review_model,
    'review_model',
    stamped_keys
  );
  const impl_model = pickLayered(
    IMPL_MODELS,
    bead.impl_model,
    defaults.impl_model,
    'impl_model',
    stamped_keys
  );

  return {
    orchestration_model,
    orchestration_effort,
    review_model,
    impl_model,
    stamped_keys
  };
}
