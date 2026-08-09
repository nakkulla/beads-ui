/**
 * Worker exec settings — resolution order (worker-global-exec-defaults §3).
 *
 * The 4 exec keys (orchestration_model / orchestration_effort / review_model /
 * impl_model) resolve bead metadata > workspace global (queue store) > final
 * fallback. A non-enum value at any level falls through to the next level
 * instead of blocking. The final fallback is `opus` for orchestration_model
 * (worker-orchestration-model-default-opus) and unset for the other 3 keys.
 *
 * The `merge_policy`/`drift_policy` axis is retired with the merge axis
 * (worker-phase2 §2): every session is PR-stop by construction and drift
 * behaviour is fixed at the contract default (auto_rereview), so neither is a
 * per-dispatch choice any more.
 *
 * The runner is NOT a separate axis either — it is DERIVED from the resolved
 * `orchestration_model` through the catalog's globally-unique model names
 * (worker-multi-provider-runner §C). That derivation also fixes the effort
 * vocabulary, which is per-model and therefore only knowable after the model
 * resolves.
 */
import { IMPL_MODELS, REVIEW_MODELS } from './exec-enums.js';
import { modelEfforts, modelRunner, resolveCatalog } from './runner-catalog.js';

/**
 * Hardcoded final fallback for `orchestration_model`: what dispatch runs when
 * NEITHER the bead metadata NOR the workspace-global default resolves. Unlike
 * the global layer this never lands in `stamped_keys` — a constant carries no
 * information worth writing back to every bead's metadata.
 *
 * MIRROR: app/views/detail-panel/exec-settings.js DEFAULT_LABELS.
 */
export const ORCHESTRATION_MODEL_FALLBACK = 'opus';

/** Runner the hardcoded model fallback belongs to. */
const RUNNER_FALLBACK = 'claude';

/**
 * Lazily-built builtin catalog for callers that pass no `catalog` — resolving
 * it is pure, but repeating it per dispatch would also repeat its warnings.
 *
 * @type {ReturnType<typeof resolveCatalog> | null}
 */
let default_catalog = null;

/**
 * @returns {ReturnType<typeof resolveCatalog>}
 */
function defaultCatalog() {
  if (!default_catalog) {
    default_catalog = resolveCatalog();
  }
  return default_catalog;
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
 * Resolve the 4 exec settings for one dispatch, plus the runner they imply
 * (worker-global-exec-defaults; worker-multi-provider-runner §C).
 *
 * Order is bead metadata > workspace-global default > final fallback.
 * `orchestration_model` alone has a hardcoded final fallback (`opus`) and
 * therefore never resolves to undefined; the other 3 keys still end at unset.
 *
 * Two of the picks are catalog-driven: `orchestration_model` is validated
 * against every model name the catalog knows (across runners), and
 * `orchestration_effort` against the vocabulary of the model that actually
 * resolved — so a codex-only effort like `max` is accepted under `luna` and
 * rejected under `opus`. The returned `runner` is the reverse lookup of the
 * resolved model, never an independently-set key. `review_model`/`impl_model`
 * stay plain enum picks: their consumer is the workflow skill inside the
 * session, not the worker launcher.
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
 *   defaults?: { orchestration_model?: unknown, orchestration_effort?: unknown, review_model?: unknown, impl_model?: unknown } | null,
 *   catalog?: ReturnType<typeof resolveCatalog>
 * }} input
 * @returns {{
 *   orchestration_model: string,
 *   orchestration_effort: string|undefined,
 *   runner: string,
 *   review_model: string|undefined,
 *   impl_model: string|undefined,
 *   stamped_keys: string[]
 * }}
 */
export function resolveExecSettings(input) {
  const bead = (input && input.bead) || {};
  const defaults = (input && input.defaults) || {};
  const catalog = (input && input.catalog) || defaultCatalog();
  /** @type {string[]} */
  const stamped_keys = [];

  const orchestration_model =
    pickLayered(
      Object.keys(catalog.model_index),
      bead.model,
      defaults.orchestration_model,
      'orchestration_model',
      stamped_keys
    ) ?? ORCHESTRATION_MODEL_FALLBACK;
  const runner = modelRunner(catalog, orchestration_model) ?? RUNNER_FALLBACK;
  const orchestration_effort = pickLayered(
    modelEfforts(catalog, orchestration_model),
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
    runner,
    review_model,
    impl_model,
    stamped_keys
  };
}
