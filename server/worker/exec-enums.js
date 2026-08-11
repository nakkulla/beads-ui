/**
 * Shared exec-setting enums — the SINGLE source of truth for the 12 worker
 * exec-preference keys (orchestration_model / orchestration_effort /
 * orchestration_speed, the three
 * `*_review_model` / `*_review_effort` step pairs, and the linked
 * impl_runtime / impl_model / impl_effort target).
 *
 * Consumed by:
 *   - queue-store.js: workspace-global default validation + persistence
 *     normalize (`exec_defaults`), and the `setExecDefault` mutation enum.
 *   - policy.js: dispatch resolution (`resolveExecSettings`).
 *   - ws/mutation-handlers.js: the per-bead detail-panel edit surface, which
 *     synthesizes the extra `workflow_mode` key on top of these 10.
 *
 * `workflow_mode` is intentionally NOT part of this table — it is a per-bead
 * metadata key only, never a workspace-global default (spec 비-목표).
 *
 * The runner axis is retired (worker-phase1 §4): the runner is DERIVED from the
 * resolved model through the catalog's globally-unique model names, so there is
 * no `worker_runner` key to validate.
 *
 * `review_model` is RETIRED (2026-08-09, dotfiles-mqcj): the single review key
 * split into per-step `spec_/impl_/plan_` model+effort pairs. There is no dual
 * read and no fallback — a key with no entry in this table is simply unknown, so
 * a persisted `review_model` drops on load and a mutation naming it is rejected.
 *
 * The table is a FUNCTION rather than a constant because four of its entries are
 * catalog-derived, and the catalog is a config-time input: evaluating it at
 * module load would freeze `[runner]` overrides read before the config exists.
 *
 * @import { ResolvedCatalog } from './runner-catalog.js'
 */
import {
  catalogEfforts,
  catalogOrchestrationEfforts,
  catalogSpeedTiers,
  modelEfforts,
  modelRunner
} from './runner-catalog.js';
import { runtimeCatalog } from './runner/index.js';

/**
 * `spec_review_model` / `impl_review_model` options. Consumed by the workflow
 * skill inside the session, not by the worker launcher — which is why `codex`
 * and the non-model verbs `self` / `skip` all belong here.
 *
 * @type {ReadonlyArray<string>}
 */
export const REVIEW_STEP_MODELS = ['codex', 'opus', 'fable', 'self', 'skip'];

/**
 * `plan_review_model` options — narrower than the other two steps by contract:
 * a plan review is never self-reviewed, and `opus` is not one of its legs.
 *
 * @type {ReadonlyArray<string>}
 */
export const PLAN_REVIEW_MODELS = ['codex', 'fable', 'skip'];

/**
 * Effort vocabulary for all three review steps. Fixed by the contract rather
 * than catalog-derived: the review legs are dispatched by the session, so their
 * effort is the workflow's own four-level scale, not a CLI flag.
 *
 * @type {ReadonlyArray<string>}
 */
export const REVIEW_EFFORTS = ['low', 'medium', 'high', 'xhigh'];

/** Implementation runtime choices from the workflow contract. */
export const IMPL_RUNTIMES = ['inherit', 'claude', 'codex'];

/**
 * Canonical execution-setting key order shared by persistence, mutations, and
 * UI presentation. `workflow_mode` is intentionally absent.
 *
 * @type {ReadonlyArray<string>}
 */
export const EXEC_SETTING_KEYS = [
  'orchestration_model',
  'orchestration_effort',
  'orchestration_speed',
  'spec_review_model',
  'spec_review_effort',
  'plan_review_model',
  'plan_review_effort',
  'impl_review_model',
  'impl_review_effort',
  'impl_runtime',
  'impl_model',
  'impl_effort'
];

/**
 * Return the provider inferred from a known legacy model-only setting. An
 * explicit runtime, including `inherit`, always wins and disables inference.
 *
 * @param {{ impl_runtime?: unknown, impl_model?: unknown }} settings
 * @param {ResolvedCatalog} [catalog]
 * @returns {string|undefined}
 */
export function inferImplRuntime(settings, catalog = runtimeCatalog()) {
  if (typeof settings?.impl_runtime === 'string') {
    return undefined;
  }
  const runtime = modelRunner(catalog, settings?.impl_model);
  return runtime ?? undefined;
}

/**
 * Return every effort accepted by at least one model of a provider.
 *
 * @param {ResolvedCatalog} catalog
 * @param {string} runtime
 * @returns {string[]}
 */
function runtimeEfforts(catalog, runtime) {
  const entry = catalog.runners[runtime];
  if (!entry) {
    return [];
  }
  /** @type {string[]} */
  const efforts = [];
  for (const model of Object.keys(entry.models)) {
    for (const effort of modelEfforts(catalog, model)) {
      if (!efforts.includes(effort)) {
        efforts.push(effort);
      }
    }
  }
  return efforts;
}

/**
 * Validate linked implementation runtime/model/effort values at server write
 * boundaries. Legacy readers may infer a missing runtime; active writers may
 * not store an exact model without its matching runtime.
 *
 * @param {{ orchestration_model?: unknown, impl_runtime?: unknown, impl_model?: unknown, impl_effort?: unknown }} settings
 * @param {{ catalog?: ResolvedCatalog, active_writer?: boolean, controller_runtime?: string }} [options]
 * @returns {{ ok: true, impl_runtime: string|undefined, inferred: boolean }|{ ok: false, reason: string }}
 */
export function validateImplSettings(settings, options = {}) {
  const catalog = options.catalog ?? runtimeCatalog();
  const active_writer = options.active_writer ?? true;
  const requested_runtime = settings?.impl_runtime;
  const model = settings?.impl_model;
  const effort = settings?.impl_effort;

  if (
    requested_runtime !== undefined &&
    (typeof requested_runtime !== 'string' ||
      !IMPL_RUNTIMES.includes(requested_runtime))
  ) {
    return { ok: false, reason: 'invalid_impl_runtime' };
  }
  if (model !== undefined && typeof model !== 'string') {
    return { ok: false, reason: 'unknown_impl_model' };
  }
  if (effort !== undefined && typeof effort !== 'string') {
    return { ok: false, reason: 'illegal_impl_effort' };
  }

  const model_runtime =
    model === undefined ? null : modelRunner(catalog, model);
  if (model !== undefined && !model_runtime) {
    return { ok: false, reason: 'unknown_impl_model' };
  }
  if (model !== undefined && requested_runtime === undefined && active_writer) {
    return { ok: false, reason: 'impl_runtime_required' };
  }

  const inferred = requested_runtime === undefined && model_runtime !== null;
  const runtime = requested_runtime ?? model_runtime ?? undefined;
  const controller_runtime =
    options.controller_runtime ??
    modelRunner(catalog, settings?.orchestration_model) ??
    undefined;
  const effective_runtime =
    runtime === 'inherit' ? controller_runtime : runtime;

  if (
    model_runtime &&
    effective_runtime &&
    model_runtime !== effective_runtime
  ) {
    return { ok: false, reason: 'provider_model_mismatch' };
  }
  if (model_runtime && runtime === 'inherit' && !effective_runtime) {
    return { ok: false, reason: 'controller_runtime_required' };
  }

  if (effort !== undefined) {
    const allowed = model_runtime
      ? modelEfforts(catalog, model)
      : effective_runtime
        ? runtimeEfforts(catalog, effective_runtime)
        : catalogEfforts(catalog);
    if (!allowed.includes(effort)) {
      return { ok: false, reason: 'illegal_impl_effort' };
    }
  }

  return { ok: true, impl_runtime: runtime, inferred };
}

/**
 * Validate every present canonical exec setting against the current catalog,
 * then validate the linked implementation target as one coherent unit. Unlike
 * durable-state normalization this only reports incompatibility; callers that
 * read old state keep its strings available for display and diagnostics.
 *
 * @param {Record<string, unknown>} settings
 * @param {{ catalog?: ResolvedCatalog, active_writer?: boolean, controller_runtime?: string }} [options]
 * @returns {{ ok: true, impl_runtime: string|undefined, inferred: boolean }|{ ok: false, reason: string }}
 */
export function validateExecSettings(settings, options = {}) {
  const catalog = options.catalog ?? runtimeCatalog();
  const enums = execSettingEnums(catalog);
  for (const key of EXEC_SETTING_KEYS) {
    if (!Object.hasOwn(settings, key)) {
      continue;
    }
    const value = settings[key];
    if (typeof value === 'string' && enums[key].includes(value)) {
      continue;
    }
    if (key === 'impl_model') {
      return { ok: false, reason: 'unknown_impl_model' };
    }
    if (key === 'impl_effort') {
      return { ok: false, reason: 'illegal_impl_effort' };
    }
    if (key === 'impl_runtime') {
      return { ok: false, reason: 'invalid_impl_runtime' };
    }
    return { ok: false, reason: `invalid_${key}` };
  }
  return validateImplSettings(settings, { ...options, catalog });
}

/**
 * Allowed values per exec-preference key — the 12 workspace-global-capable keys
 * (`workflow_mode` excluded).
 *
 * `orchestration_model` and `impl_model` take the catalog's model names (claude
 * aliases plus the codex short names, which pass through unexpanded — the worker
 * never assembles a full model id). `orchestration_effort` uses the outer
 * catalog union and is narrowed per resolved model by `policy.js`; `impl_effort`
 * retains the implementation union because it names a leaf whose model is not
 * known at set time.
 *
 * @param {ResolvedCatalog} [catalog] - Defaults to the process-wide runtime
 * catalog; tests and the WS layer inject their own.
 * @returns {Record<string, ReadonlyArray<string>>}
 */
export function execSettingEnums(catalog = runtimeCatalog()) {
  const models = Object.keys(catalog.model_index);
  const orchestration_efforts = catalogOrchestrationEfforts(catalog);
  const impl_efforts = catalogEfforts(catalog);
  return {
    orchestration_model: models,
    orchestration_effort: orchestration_efforts,
    orchestration_speed: catalogSpeedTiers(catalog),
    spec_review_model: REVIEW_STEP_MODELS,
    spec_review_effort: REVIEW_EFFORTS,
    plan_review_model: PLAN_REVIEW_MODELS,
    plan_review_effort: REVIEW_EFFORTS,
    impl_review_model: REVIEW_STEP_MODELS,
    impl_review_effort: REVIEW_EFFORTS,
    impl_runtime: IMPL_RUNTIMES,
    impl_model: models,
    impl_effort: impl_efforts
  };
}
