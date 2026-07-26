/**
 * Worker exec settings — resolution order (worker-global-exec-defaults §3).
 *
 * The 4 exec keys (orchestration_model / orchestration_effort / review_model /
 * impl_model) resolve bead metadata > workspace global (queue store) > unset.
 * A non-enum value at any level falls through to the next level instead of
 * blocking.
 *
 * The `merge_policy`/`drift_policy` axis is retired with the merge axis
 * (worker-phase2 §2): every session is PR-stop by construction and drift
 * behaviour is fixed at the contract default (auto_rereview), so neither is a
 * per-dispatch choice any more.
 */
import { EFFORTS, IMPL_MODELS, MODELS, REVIEW_MODELS } from './exec-enums.js';

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
