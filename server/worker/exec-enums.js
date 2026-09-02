/**
 * Shared exec-setting enums — the SINGLE source of truth for the 15 worker
 * exec-preference keys (orchestration_model / orchestration_effort /
 * orchestration_speed, the three
 * `*_review_model` / `*_review_effort` / `*_review_speed` step triples, and
 * the linked impl_runtime / impl_model / impl_effort target).
 *
 * Consumed by:
 *   - queue-store.js: the three orchestration values' validation and normalize
 *     (`setOrchestrationDefaults`).
 *   - policy.js: dispatch resolution (`resolveExecSettings`).
 *   - ws/mutation-handlers.js: the per-bead detail-panel edit surface, which
 *     synthesizes the extra `workflow_mode` key on top of these 15.
 *
 * `workflow_mode` is intentionally NOT part of this table: it is a SESSION key,
 * so its vocabulary lives in {@link sessionDefaultEnums} beside the other
 * session keys rather than in the worker launcher's table.
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

/** Speed vocabulary shared by all three review steps. */
export const REVIEW_SPEEDS = ['default', 'fast'];

/** Implementation runtime choices from the workflow contract. */
export const IMPL_RUNTIMES = ['inherit', 'claude', 'codex'];

/**
 * `impl_dispatch` — whether the controller delegates the implementation leg or
 * implements it itself. Consumed by the workflow selector, never by the worker
 * launcher (dotfiles `workflow.yaml metadata.parent_keys`).
 *
 * @type {ReadonlyArray<string>}
 */
export const IMPL_DISPATCHES = ['delegated', 'main'];

/**
 * `impl_speed` vocabulary. Fixed by contract rather than catalog-derived: it is
 * a selector-level choice, not an orchestration CLI flag.
 *
 * @type {ReadonlyArray<string>}
 */
export const IMPL_SPEEDS = ['default', 'fast'];

/**
 * `workflow_mode` vocabulary. Both values are storable per bead: `standard` is
 * a LITERAL, not an absence, because a bead must be able to override a
 * `fast_track` workspace default (spec §E).
 *
 * @type {ReadonlyArray<string>}
 */
export const WORKFLOW_MODES = ['standard', 'fast_track'];

/**
 * The `auto` literal accepted by `impl_model` and `impl_effort`: the selector's
 * model/auto · effort/auto state, meaning "assign a tier from the task", not a
 * missing value.
 */
export const AUTO_LITERAL = 'auto';

/**
 * The 15 session keys a PER-BEAD write may carry: a preset applied to one bead
 * and the detail panel's individual edits. `impl_dispatch` belongs here and
 * nowhere else on the session axis — the contract makes it
 * `write_rule: user_write_only`, and both of these surfaces ARE the user
 * writing.
 *
 * @type {ReadonlyArray<string>}
 */
export const BEAD_APPLY_KEYS = [
  'workflow_mode',
  'spec_review_model',
  'spec_review_effort',
  'spec_review_speed',
  'plan_review_model',
  'plan_review_effort',
  'plan_review_speed',
  'impl_review_model',
  'impl_review_effort',
  'impl_review_speed',
  'impl_dispatch',
  'impl_runtime',
  'impl_model',
  'impl_effort',
  'impl_speed'
];

/**
 * `rec_reason` signal vocabulary (UI-sbum §2) — the workflow contract's reasons
 * a Bead was judged 복잡. Mirrored client-side as `REC_REASONS` in
 * `app/utils/rec-settings.js`; the two runtimes share no module, so the equality
 * is asserted from both test files instead.
 *
 * @type {ReadonlyArray<string>}
 */
export const REC_SIGNALS = [
  'hard_diagnosis',
  'invariant_reasoning',
  'verification_by_judgment',
  'claude_bound'
];

/**
 * Allowed value per RECOMMENDATION key. Deliberately narrow: the workflow
 * records a `rec_*` key only when the recommendation differs from the default,
 * so a value outside this table is a malformed record, not a wider choice.
 *
 * These keys are advisory. They are absent from every list above on purpose —
 * `BEAD_APPLY_KEYS`, `EXEC_SETTING_KEYS` and friends are what the worker
 * RESOLVES, and a recommendation is never resolved, only displayed.
 *
 * @type {Record<string, ReadonlyArray<string>>}
 */
export const REC_VALUES = {
  rec_orchestration_model: ['fable'],
  rec_impl_runtime: ['claude']
};

/** Worker-only per-bead account pins, intentionally outside every preset axis. */
export const ACCOUNT_KEYS = ['claude_account', 'codex_account'];

/**
 * The 16 keys that may be STORED workspace-wide through
 * `bd kv workflow_session_defaults` (dotfiles `workflow-state.yaml
 * workspace_kv_defaults.allowed_keys`).
 *
 * `impl_dispatch` is absent by contract: a workspace-global default would make
 * every later bead's dispatch a value nobody wrote for it, which is exactly
 * what `write_rule: user_write_only` forbids. A value left in an older kv
 * object therefore drops per key with a warning, never failing the layer.
 *
 * The list is NOT a subset of the per-bead list: it carries two kv-only keys
 * with no bead-metadata layer at all — the route-scoped
 * `quick_fix_impl_model` (`workflow-state.yaml route_scoped`) and `bdui_url`
 * (`key_scoped`, `metadata_key: forbidden`). Neither is an `IMPL_PRESET_KEYS`
 * member, so {@link PRESET_KV_KEYS} drops both and a preset apply preserves
 * them.
 *
 * `bdui_url` is also the one key with no entry in {@link sessionDefaultEnums}:
 * the contract types it `enum: none`, so its value is judged by FORMAT in
 * `server/session-defaults.js` rather than by this table.
 *
 * @type {ReadonlyArray<string>}
 */
export const WORKSPACE_KV_KEYS = [
  ...BEAD_APPLY_KEYS.filter((key) => key !== 'impl_dispatch'),
  'quick_fix_impl_model',
  'bdui_url'
];

/**
 * The three orchestration keys stored directly as workspace queue values.
 *
 * @type {ReadonlyArray<string>}
 */
export const ORCHESTRATION_KEYS = [
  'orchestration_model',
  'orchestration_effort',
  'orchestration_speed'
];

/**
 * The 18 sparse keys a full-profile execution preset may carry: all session
 * defaults plus the workspace queue's orchestration defaults.
 *
 * @type {ReadonlyArray<string>}
 */
export const IMPL_PRESET_KEYS = [...BEAD_APPLY_KEYS, ...ORCHESTRATION_KEYS];

/**
 * The 14 kv keys a full-profile preset actually CARRIES — the workspace kv list
 * minus the keys no preset can supply. Preset application replaces exactly this
 * list, so the kv-only `quick_fix_impl_model` survives an apply instead of being
 * cleared by a profile that was never able to name it.
 *
 * @type {ReadonlyArray<string>}
 */
export const PRESET_KV_KEYS = WORKSPACE_KV_KEYS.filter((key) =>
  IMPL_PRESET_KEYS.includes(key)
);

/**
 * Allowed values per per-bead session key. `impl_model`/`impl_effort` add the
 * `auto` literal to their catalog vocabulary; every other key reuses the
 * existing metadata enum so the kv layer cannot diverge from the pin layer.
 *
 * `quick_fix_impl_model` is kv-only and takes the bare catalog tokens: the
 * contract forbids `auto` there because the runtime is DERIVED from the token's
 * catalog uniqueness.
 *
 * @param {ResolvedCatalog} [catalog]
 * @returns {Record<string, ReadonlyArray<string>>}
 */
export function sessionDefaultEnums(catalog = runtimeCatalog()) {
  const base = execSettingEnums(catalog);
  return {
    workflow_mode: WORKFLOW_MODES,
    spec_review_model: REVIEW_STEP_MODELS,
    spec_review_effort: REVIEW_EFFORTS,
    spec_review_speed: REVIEW_SPEEDS,
    plan_review_model: PLAN_REVIEW_MODELS,
    plan_review_effort: REVIEW_EFFORTS,
    plan_review_speed: REVIEW_SPEEDS,
    impl_review_model: REVIEW_STEP_MODELS,
    impl_review_effort: REVIEW_EFFORTS,
    impl_review_speed: REVIEW_SPEEDS,
    impl_dispatch: IMPL_DISPATCHES,
    impl_runtime: IMPL_RUNTIMES,
    impl_model: [AUTO_LITERAL, ...base.impl_model],
    impl_effort: [AUTO_LITERAL, ...base.impl_effort],
    impl_speed: IMPL_SPEEDS,
    quick_fix_impl_model: base.impl_model
  };
}

/**
 * Allowed values per full-profile preset key. Session keys reuse the session
 * table; orchestration keys reuse the queue-facing execution table.
 *
 * @param {ResolvedCatalog} [catalog]
 * @returns {Record<string, ReadonlyArray<string>>}
 */
export function implPresetEnums(catalog = runtimeCatalog()) {
  const session_enums = sessionDefaultEnums(catalog);
  const exec_enums = execSettingEnums(catalog);
  /** @type {Record<string, ReadonlyArray<string>>} */
  const narrowed = {};
  for (const key of IMPL_PRESET_KEYS) {
    const source = ORCHESTRATION_KEYS.includes(key)
      ? exec_enums
      : session_enums;
    narrowed[key] = source[key];
  }
  return narrowed;
}

/**
 * Validate one full-profile execution preset's sparse settings.
 *
 * The `auto` literal is a SELECTOR STATE, not a catalog model or effort, so it
 * is removed before the runtime/model/effort coherence check — otherwise
 * `impl_model: 'auto'` would read as an unknown model. `impl_dispatch: 'main'`
 * likewise suspends coherence: a controller-implemented unit has no delegation
 * target to be coherent with.
 *
 * @param {Record<string, unknown>} settings
 * @param {{ catalog?: ResolvedCatalog }} [options]
 * @returns {{ ok: true }|{ ok: false, reason: string }}
 */
export function validateImplPresetSettings(settings, options = {}) {
  const catalog = options.catalog ?? runtimeCatalog();
  const enums = implPresetEnums(catalog);
  for (const [key, value] of Object.entries(settings)) {
    if (!IMPL_PRESET_KEYS.includes(key)) {
      return { ok: false, reason: `unknown_impl_preset_key:${key}` };
    }
    if (typeof value !== 'string' || !enums[key].includes(value)) {
      return { ok: false, reason: `invalid_${key}` };
    }
  }
  if (settings.impl_dispatch === 'main') {
    return { ok: true };
  }
  /** @type {Record<string, unknown>} */
  const coherence_input = {};
  for (const key of ['impl_runtime', 'impl_model', 'impl_effort']) {
    const value = settings[key];
    if (typeof value === 'string' && value !== AUTO_LITERAL) {
      coherence_input[key] = value;
    }
  }
  const coherence = validateImplSettings(coherence_input, {
    catalog,
    active_writer: false
  });
  return coherence.ok ? { ok: true } : { ok: false, reason: coherence.reason };
}

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
  'spec_review_speed',
  'plan_review_model',
  'plan_review_effort',
  'plan_review_speed',
  'impl_review_model',
  'impl_review_effort',
  'impl_review_speed',
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
 * Allowed values per exec-preference key — the 15 workspace-global-capable keys
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
    spec_review_speed: REVIEW_SPEEDS,
    plan_review_model: PLAN_REVIEW_MODELS,
    plan_review_effort: REVIEW_EFFORTS,
    plan_review_speed: REVIEW_SPEEDS,
    impl_review_model: REVIEW_STEP_MODELS,
    impl_review_effort: REVIEW_EFFORTS,
    impl_review_speed: REVIEW_SPEEDS,
    impl_runtime: IMPL_RUNTIMES,
    impl_model: models,
    impl_effort: impl_efforts
  };
}
