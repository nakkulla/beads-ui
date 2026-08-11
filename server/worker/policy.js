/**
 * Worker exec settings — resolution order (worker-global-exec-defaults §3).
 *
 * The 12 exec keys (orchestration_model / orchestration_effort /
 * orchestration_speed, the three
 * `*_review_model` + `*_review_effort` step pairs, and the linked
 * impl_runtime / impl_model / impl_effort target)
 * resolve bead metadata > workspace global (queue store) > final fallback.
 * Invalid orchestration values fail closed, invalid review values fall
 * through, and an invalid linked implementation target blocks dispatch instead
 * of silently demoting. The
 * final fallback is `opus` for orchestration_model
 * (worker-orchestration-model-default-opus), `default` for orchestration_speed,
 * and unset for the other 10 keys.
 *
 * The single `review_model` key is retired (dotfiles-mqcj): it is neither read
 * nor used to seed the per-step keys, so a bead still carrying it resolves the
 * same as one that never had it.
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
 *
 * @import { ResolvedCatalog } from './runner-catalog.js'
 */
import {
  PLAN_REVIEW_MODELS,
  REVIEW_EFFORTS,
  REVIEW_STEP_MODELS,
  validateImplSettings
} from './exec-enums.js';
import {
  modelOrchestrationEfforts,
  modelRunner,
  modelSpeedTiers
} from './runner-catalog.js';
import { runtimeCatalog } from './runner/index.js';

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
 * Catalog for callers that pass no `catalog`: the process-wide RUNTIME catalog
 * (builtin + `[runner]` config overrides), the same one `createRunner`, the
 * enum table, and the WS snapshot resolve through (impl review 2026-08-10
 * finding 1). A builtin-only default here would let the store accept and the UI
 * offer a config-added model that dispatch then silently demotes to
 * `opus`/claude.
 *
 * @returns {ResolvedCatalog}
 */
function defaultCatalog() {
  return runtimeCatalog();
}

/**
 * @param {ReadonlyArray<string>} allowed
 * @param {unknown} value
 * @returns {value is string}
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
 * Resolve an outer launch setting without treating an explicit incompatible
 * Bead or workspace value as absent. Dispatch must stop rather than silently
 * changing a requested model, effort, or speed to a lower-precedence value.
 *
 * @param {ReadonlyArray<string>} allowed
 * @param {unknown} beadVal
 * @param {unknown} globalVal
 * @param {string|undefined} fallback
 * @param {string} stampKey
 * @param {string[]} stamped_keys
 * @returns {{ value: string|undefined, invalid: boolean }}
 */
function pickOuterFailClosed(
  allowed,
  beadVal,
  globalVal,
  fallback,
  stampKey,
  stamped_keys
) {
  if (beadVal !== undefined) {
    return {
      value: isEnum(allowed, beadVal) ? beadVal : fallback,
      invalid: !isEnum(allowed, beadVal)
    };
  }
  if (globalVal !== undefined) {
    if (!isEnum(allowed, globalVal)) {
      return { value: fallback, invalid: true };
    }
    stamped_keys.push(stampKey);
    return { value: globalVal, invalid: false };
  }
  return { value: fallback, invalid: false };
}

/**
 * Pick a linked implementation setting without silently demoting an explicit
 * invalid value. Coherence validation runs after all three values resolve.
 *
 * @param {unknown} beadVal
 * @param {unknown} globalVal
 * @returns {{ value: unknown, source: 'bead'|'global'|'absent' }}
 */
function pickImplLayered(beadVal, globalVal) {
  if (typeof beadVal === 'string') {
    return { value: beadVal, source: 'bead' };
  }
  if (typeof globalVal === 'string') {
    return { value: globalVal, source: 'global' };
  }
  return { value: undefined, source: 'absent' };
}

/**
 * Infer a known model-only implementation runtime before merging a layer with
 * lower-precedence values. This prevents a lower preset runtime from changing
 * the provider implied by a Bead model.
 *
 * @param {{ impl_runtime?: unknown, impl_model?: unknown, impl_effort?: unknown }} layer
 * @param {ResolvedCatalog} catalog
 * @returns {{ values: Record<string, unknown>, inferred: boolean }}
 */
function normalizeImplLayer(layer, catalog) {
  /** @type {Record<string, unknown>} */
  const values = {};
  if (typeof layer.impl_runtime === 'string') {
    values.impl_runtime = layer.impl_runtime;
  }
  if (typeof layer.impl_model === 'string') {
    values.impl_model = layer.impl_model;
  }
  if (typeof layer.impl_effort === 'string') {
    values.impl_effort = layer.impl_effort;
  }
  const validation = validateImplSettings(values, {
    catalog,
    active_writer: false
  });
  if (
    validation.ok &&
    validation.inferred &&
    typeof validation.impl_runtime === 'string'
  ) {
    values.impl_runtime = validation.impl_runtime;
  }
  return { values, inferred: validation.ok && validation.inferred };
}

/**
 * @typedef {{
 *   model?: unknown,
 *   effort?: unknown,
 *   orchestration_speed?: unknown,
 *   spec_review_model?: unknown,
 *   spec_review_effort?: unknown,
 *   impl_review_model?: unknown,
 *   impl_review_effort?: unknown,
 *   plan_review_model?: unknown,
 *   plan_review_effort?: unknown,
 *   impl_runtime?: unknown,
 *   impl_model?: unknown,
 *   impl_effort?: unknown
 * }} ExecBeadLayer
 * @typedef {{
 *   orchestration_model?: unknown,
 *   orchestration_effort?: unknown,
 *   orchestration_speed?: unknown,
 *   spec_review_model?: unknown,
 *   spec_review_effort?: unknown,
 *   impl_review_model?: unknown,
 *   impl_review_effort?: unknown,
 *   plan_review_model?: unknown,
 *   plan_review_effort?: unknown,
 *   impl_runtime?: unknown,
 *   impl_model?: unknown,
 *   impl_effort?: unknown
 * }} ExecDefaultsLayer
 */

/**
 * Resolve the 12 exec settings for one dispatch, plus the runner they imply
 * (worker-global-exec-defaults; worker-multi-provider-runner §C; dotfiles-mqcj).
 *
 * Order is bead metadata > workspace-global default > final fallback.
 * `orchestration_model` alone has a hardcoded final fallback (`opus`) and
 * therefore never resolves to undefined; speed finally falls back to `default`
 * and the other 10 keys still end at unset.
 *
 * The implementation runtime/model/effort group is validated as a unit.
 * Model-only legacy metadata infers a known model's provider read-only; a
 * provider mismatch, unknown model, or illegal effort produces
 * `invalid_reason` rather than silently selecting a lower-layer value.
 *
 * The returned `runner` is the reverse lookup of the resolved orchestration
 * model, never an independently-set key. The six review keys are plain enum
 * picks — their consumer is the workflow skill inside the session, not the
 * worker launcher — with `plan_review_model` on the narrower vocabulary.
 *
 * `stamped_keys` is the list of METADATA key names whose bead value was absent
 * and whose resolved value came from the workspace-global default — i.e. the
 * exact keys dispatch should stamp onto the bead metadata (and revert on
 * terminate). Order is FIXED and mirrors the pick order below:
 * orchestration_model, orchestration_effort, orchestration_speed,
 * spec_review_model,
 * spec_review_effort, plan_review_model, plan_review_effort, impl_review_model,
 * impl_review_effort, impl_runtime, impl_model, impl_effort.
 *
 * The `bead` argument uses the BeadSnapshot field names (`model`/`effort` for
 * orchestration, the metadata name for everything else); `defaults` uses the
 * exec_defaults metadata key names throughout.
 *
 * @param {{
 *   bead?: ExecBeadLayer | null,
 *   defaults?: ExecDefaultsLayer | null,
 *   catalog?: ResolvedCatalog
 * }} input
 * @returns {{
 *   orchestration_model: string,
 *   orchestration_effort: string|undefined,
 *   orchestration_speed: string,
 *   runner: string,
 *   spec_review_model: string|undefined,
 *   spec_review_effort: string|undefined,
 *   impl_review_model: string|undefined,
 *   impl_review_effort: string|undefined,
 *   plan_review_model: string|undefined,
 *   plan_review_effort: string|undefined,
 *   impl_runtime: string|undefined,
 *   impl_runtime_inferred: boolean,
 *   impl_model: string|undefined,
 *   impl_effort: string|undefined,
 *   invalid_reason: string|undefined,
 *   stamped_keys: string[]
 * }}
 */
export function resolveExecSettings(input) {
  const bead = (input && input.bead) || {};
  const defaults = (input && input.defaults) || {};
  const catalog = (input && input.catalog) || defaultCatalog();
  const model_names = Object.keys(catalog.model_index);
  /** @type {string[]} */
  const stamped_keys = [];

  const model_pick = pickOuterFailClosed(
    model_names,
    bead.model,
    defaults.orchestration_model,
    ORCHESTRATION_MODEL_FALLBACK,
    'orchestration_model',
    stamped_keys
  );
  const orchestration_model = model_pick.value ?? ORCHESTRATION_MODEL_FALLBACK;
  const runner = modelRunner(catalog, orchestration_model) ?? RUNNER_FALLBACK;
  const effort_pick = model_pick.invalid
    ? { value: undefined, invalid: false }
    : pickOuterFailClosed(
        modelOrchestrationEfforts(catalog, orchestration_model),
        bead.effort,
        defaults.orchestration_effort,
        undefined,
        'orchestration_effort',
        stamped_keys
      );
  const orchestration_effort = effort_pick.value;
  const speed_pick = model_pick.invalid
    ? { value: 'default', invalid: false }
    : pickOuterFailClosed(
        modelSpeedTiers(catalog, orchestration_model),
        bead.orchestration_speed,
        defaults.orchestration_speed,
        'default',
        'orchestration_speed',
        stamped_keys
      );
  const orchestration_speed = speed_pick.invalid
    ? typeof bead.orchestration_speed === 'string'
      ? bead.orchestration_speed
      : typeof defaults.orchestration_speed === 'string'
        ? defaults.orchestration_speed
        : 'default'
    : (speed_pick.value ?? 'default');
  const spec_review_model = pickLayered(
    REVIEW_STEP_MODELS,
    bead.spec_review_model,
    defaults.spec_review_model,
    'spec_review_model',
    stamped_keys
  );
  const spec_review_effort = pickLayered(
    REVIEW_EFFORTS,
    bead.spec_review_effort,
    defaults.spec_review_effort,
    'spec_review_effort',
    stamped_keys
  );
  const plan_review_model = pickLayered(
    PLAN_REVIEW_MODELS,
    bead.plan_review_model,
    defaults.plan_review_model,
    'plan_review_model',
    stamped_keys
  );
  const plan_review_effort = pickLayered(
    REVIEW_EFFORTS,
    bead.plan_review_effort,
    defaults.plan_review_effort,
    'plan_review_effort',
    stamped_keys
  );
  const impl_review_model = pickLayered(
    REVIEW_STEP_MODELS,
    bead.impl_review_model,
    defaults.impl_review_model,
    'impl_review_model',
    stamped_keys
  );
  const impl_review_effort = pickLayered(
    REVIEW_EFFORTS,
    bead.impl_review_effort,
    defaults.impl_review_effort,
    'impl_review_effort',
    stamped_keys
  );
  const bead_impl = normalizeImplLayer(bead, catalog);
  const defaults_impl = normalizeImplLayer(defaults, catalog);
  const impl_runtime_pick = pickImplLayered(
    bead_impl.values.impl_runtime,
    defaults_impl.values.impl_runtime
  );
  const impl_model_pick = pickImplLayered(
    bead_impl.values.impl_model,
    defaults_impl.values.impl_model
  );
  const impl_effort_pick = pickImplLayered(
    bead_impl.values.impl_effort,
    defaults_impl.values.impl_effort
  );
  const impl_validation = validateImplSettings(
    {
      ...(impl_runtime_pick.value === undefined
        ? {}
        : { impl_runtime: impl_runtime_pick.value }),
      ...(impl_model_pick.value === undefined
        ? {}
        : { impl_model: impl_model_pick.value }),
      ...(impl_effort_pick.value === undefined
        ? {}
        : { impl_effort: impl_effort_pick.value })
    },
    { catalog, active_writer: false, controller_runtime: runner }
  );
  const impl_runtime = impl_validation.ok
    ? impl_validation.impl_runtime
    : undefined;
  const impl_runtime_inferred =
    impl_validation.ok &&
    ((impl_runtime_pick.source === 'bead' && bead_impl.inferred) ||
      (impl_runtime_pick.source === 'global' && defaults_impl.inferred) ||
      impl_validation.inferred);
  const impl_model =
    impl_validation.ok && typeof impl_model_pick.value === 'string'
      ? impl_model_pick.value
      : undefined;
  const impl_effort =
    impl_validation.ok && typeof impl_effort_pick.value === 'string'
      ? impl_effort_pick.value
      : undefined;

  if (impl_runtime_pick.source === 'global') {
    stamped_keys.push('impl_runtime');
  } else if (
    impl_validation.ok &&
    impl_validation.inferred &&
    impl_model_pick.source === 'global'
  ) {
    stamped_keys.push('impl_runtime');
  }
  if (impl_model_pick.source === 'global') {
    stamped_keys.push('impl_model');
  }
  if (impl_effort_pick.source === 'global') {
    stamped_keys.push('impl_effort');
  }

  return {
    orchestration_model,
    orchestration_effort,
    orchestration_speed,
    runner,
    spec_review_model,
    spec_review_effort,
    plan_review_model,
    plan_review_effort,
    impl_review_model,
    impl_review_effort,
    impl_runtime,
    impl_runtime_inferred,
    impl_model,
    impl_effort,
    invalid_reason: model_pick.invalid
      ? 'invalid_orchestration_model'
      : effort_pick.invalid
        ? 'illegal_orchestration_effort'
        : speed_pick.invalid
          ? 'illegal_orchestration_speed'
          : impl_validation.ok
            ? undefined
            : impl_validation.reason,
    stamped_keys
  };
}
