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
  modelOrchestrationEfforts,
  modelRunner,
  modelSpeedTiers
} from './runner-catalog.js';
import { runtimeCatalog } from './runner/index.js';

/**
 * `spec_review_model` / `impl_review_model` options. Consumed by the workflow
 * skill inside the session, not by the worker launcher — which is why `codex`
 * and the non-model verbs `self` / `skip` all belong here.
 *
 * @type {ReadonlyArray<string>}
 */
export const REVIEW_STEP_MODELS = [
  'codex',
  'astra',
  'opus',
  'fable',
  'self',
  'skip'
];

/**
 * `plan_review_model` options — narrower than the other two steps by contract:
 * a plan review is never self-reviewed, and `opus` is not one of its legs.
 *
 * @type {ReadonlyArray<string>}
 */
export const PLAN_REVIEW_MODELS = ['codex', 'astra', 'fable', 'skip'];

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

/**
 * Implementation runtime choices from the workflow contract. `auto` is the
 * selector state "the controller picks a provider per delegated unit at run
 * time" — beads-ui never derives a provider from it (dotfiles-nv53).
 *
 * @type {ReadonlyArray<string>}
 */
export const IMPL_RUNTIMES = ['auto', 'claude', 'codex'];

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
 * The 14 session keys a PER-BEAD write may carry: a preset applied to one bead
 * and the detail panel's individual edits. `impl_dispatch` belongs here and
 * nowhere else on the session axis — the contract makes it
 * `write_rule: user_write_only`, and both of these surfaces ARE the user
 * writing.
 *
 * @type {ReadonlyArray<string>}
 */
export const BEAD_APPLY_KEYS = [
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

/** Worker-only per-bead account pins, intentionally outside every preset axis. */
export const ACCOUNT_KEYS = ['claude_account', 'codex_account'];

/**
 * The route-scoped quick_fix kv profile (dotfiles `workflow-state.yaml
 * workspace_kv_defaults.route_scoped`). Each key overrides the same-name
 * general key for a `route=quick_fix` Bead only; an empty key falls through to
 * that general key and then to the harness.
 *
 * `quick_fix_impl_dispatch` is the one member with NO general layer: kv
 * `impl_dispatch` stays forbidden, so this key's fallthrough is the model
 * implication and then the harness route default.
 *
 * @type {ReadonlyArray<string>}
 */
export const QUICK_FIX_KV_KEYS = [
  'quick_fix_impl_dispatch',
  'quick_fix_impl_runtime',
  'quick_fix_impl_model',
  'quick_fix_impl_effort',
  'quick_fix_impl_speed'
];

/**
 * The 21 keys that may be STORED workspace-wide through
 * `bd kv workflow_session_defaults` (dotfiles `workflow-state.yaml
 * workspace_kv_defaults.allowed_keys`), in that contract's own order.
 *
 * `impl_dispatch` is absent by contract: a workspace-global default would make
 * every later bead's dispatch a value nobody wrote for it, which is exactly
 * what `write_rule: user_write_only` forbids. A value left in an older kv
 * object therefore drops per key with a warning, never failing the layer.
 *
 * The list is NOT a subset of the per-bead list: it carries the route-scoped
 * {@link QUICK_FIX_KV_KEYS} profile, `base_sync_accept_local_commits`, and
 * `bdui_url` (`key_scoped`, `metadata_key: forbidden`). None of those seven is
 * a {@link GENERAL_PRESET_KEYS} member, so {@link presetKvKeysFor} leaves them
 * out of the general profile and a general preset apply preserves them.
 *
 * Those last two are also the only keys with no entry in
 * {@link sessionDefaultEnums}: the contract types `bdui_url` `enum: none` and
 * `base_sync_accept_local_commits` `type: bool`, so both are judged in
 * `server/session-defaults.js` — by FORMAT and by JSON type — rather than by
 * this table.
 *
 * @type {ReadonlyArray<string>}
 */
export const WORKSPACE_KV_KEYS = [
  'workflow_mode',
  ...BEAD_APPLY_KEYS.filter((key) => key !== 'impl_dispatch'),
  ...QUICK_FIX_KV_KEYS,
  'base_sync_accept_local_commits',
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

/** The 17 keys replaced when a user applies a preset to one Bead. */
export const BEAD_PIN_KEYS = [...ORCHESTRATION_KEYS, ...BEAD_APPLY_KEYS];

/**
 * Bead metadata key naming WHICH preset the 17 pins came from. Deliberately
 * outside `BEAD_PIN_KEYS`: those carry values, this one carries origin, and
 * only `apply-impl-preset` writes it. beads-ui owns this key — dotfiles
 * contracts never read it (spec UI-xq3h §7).
 */
export const APPLIED_EXEC_PRESET_KEY = 'applied_exec_preset';

/** Route-scoped queue keys used only for quick_fix dispatches. */
export const QUICK_FIX_ORCHESTRATION_KEYS = [
  'quick_fix_orchestration_model',
  'quick_fix_orchestration_effort',
  'quick_fix_orchestration_speed'
];

/**
 * Map one canonical key name onto the name the quick_fix layer STORES it
 * under: the route-scoped kv keys and the route-scoped queue keys.
 *
 * This is a storage-name mapping, not a preset profile mapping. An execution
 * preset carries canonical names in both profiles (design §3.2), and it is the
 * workspace apply path and `bench-runs.js` that still need the prefixed names
 * because the kv object and the queue keep them.
 *
 * @type {Readonly<Record<string, string>>}
 */
export const QUICK_FIX_LANE_MAP = Object.freeze({
  orchestration_model: 'quick_fix_orchestration_model',
  orchestration_effort: 'quick_fix_orchestration_effort',
  orchestration_speed: 'quick_fix_orchestration_speed',
  impl_dispatch: 'quick_fix_impl_dispatch',
  impl_runtime: 'quick_fix_impl_runtime',
  impl_model: 'quick_fix_impl_model',
  impl_effort: 'quick_fix_impl_effort',
  impl_speed: 'quick_fix_impl_speed'
});

/**
 * The `applies_to` vocabulary: an execution preset belongs to exactly one
 * profile, and the profile — not a key prefix — decides where its canonical
 * settings apply (design §3.1).
 *
 * @type {ReadonlyArray<string>}
 */
export const APPLIES_TO_VALUES = ['general', 'quick_fix'];

/**
 * Read any stored or requested value as one profile. An absent value and a
 * value outside the vocabulary both read as `general`, so a preset file
 * written before this field existed loads as a general preset.
 *
 * @param {unknown} value
 * @returns {'general'|'quick_fix'}
 */
export function normalizeAppliesTo(value) {
  return value === 'quick_fix' ? 'quick_fix' : 'general';
}

/**
 * The 17 keys a `general` preset may carry. The same set as
 * {@link BEAD_PIN_KEYS} and named separately on purpose: this one is the
 * profile's `settings` vocabulary, that one is what an apply writes onto a
 * Bead, and the two are free to drift.
 *
 * @type {ReadonlyArray<string>}
 */
export const GENERAL_PRESET_KEYS = [...BEAD_PIN_KEYS];

/**
 * The five implementation keys a `quick_fix` preset may carry, in canonical
 * names. The nine review keys are deliberately absent: review settings are a
 * profile-independent axis and the contract has no route-scoped review key.
 *
 * @type {ReadonlyArray<string>}
 */
export const QUICK_FIX_IMPL_KEYS = [
  'impl_dispatch',
  'impl_runtime',
  'impl_model',
  'impl_effort',
  'impl_speed'
];

/**
 * The 8 keys a `quick_fix` preset may carry.
 *
 * @type {ReadonlyArray<string>}
 */
export const QUICK_FIX_PRESET_KEYS = [
  ...ORCHESTRATION_KEYS,
  ...QUICK_FIX_IMPL_KEYS
];

/**
 * The 13 kv keys a `general` apply replaces. `impl_dispatch` is the one
 * general preset key with no kv member: the contract makes it
 * `write_rule: user_write_only`, so it stays an issue pin.
 *
 * @type {ReadonlyArray<string>}
 */
export const GENERAL_PRESET_KV_KEYS = WORKSPACE_KV_KEYS.filter((key) =>
  GENERAL_PRESET_KEYS.includes(key)
);

/**
 * The `settings` key set of one profile. Replaces the retired 25-key
 * `IMPL_PRESET_KEYS`, which merged both profiles into one sparse object and
 * distinguished them by the `quick_fix_` key prefix.
 *
 * @param {unknown} applies_to
 * @returns {ReadonlyArray<string>}
 */
export function presetKeysFor(applies_to) {
  return normalizeAppliesTo(applies_to) === 'quick_fix'
    ? QUICK_FIX_PRESET_KEYS
    : GENERAL_PRESET_KEYS;
}

/**
 * The workspace kv STORAGE keys one profile's apply replaces (design §4).
 * Replaces the retired 18-key `PRESET_KV_KEYS`, which carried both profiles.
 *
 * The general profile stores canonical names, so its list is the canonical
 * keys themselves; the quick_fix profile stores its five canonical
 * implementation keys under the prefixed {@link QUICK_FIX_KV_KEYS} names, so
 * that is the list an apply replaces there.
 *
 * @param {unknown} applies_to
 * @returns {ReadonlyArray<string>}
 */
export function presetKvKeysFor(applies_to) {
  return normalizeAppliesTo(applies_to) === 'quick_fix'
    ? QUICK_FIX_KV_KEYS
    : GENERAL_PRESET_KV_KEYS;
}

/**
 * Allowed values per per-bead session key. `impl_model`/`impl_effort` add the
 * `auto` literal to their catalog vocabulary; every other key reuses the
 * existing metadata enum so the kv layer cannot diverge from the pin layer.
 *
 * `quick_fix_impl_model` takes bare catalog tokens: the contract forbids `auto`
 * there because runtime is DERIVED from the token's catalog uniqueness.
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
    quick_fix_impl_dispatch: IMPL_DISPATCHES,
    quick_fix_impl_runtime: ['claude', 'codex'],
    quick_fix_impl_model: base.impl_model,
    quick_fix_impl_effort: [AUTO_LITERAL, ...base.impl_effort],
    quick_fix_impl_speed: IMPL_SPEEDS
  };
}

/**
 * Allowed values per preset key, for one profile.
 *
 * The three orchestration keys reuse the queue-facing execution table in BOTH
 * profiles. That is not a simplification: the retired
 * `quick_fix_orchestration_*` entries resolved through
 * {@link QUICK_FIX_LANE_MAP} to those same three lists, so the two profiles
 * genuinely share one orchestration vocabulary.
 *
 * The profiles differ on the implementation axis only, and that difference is
 * the contract's (ADR 0012), carried over key for key from the
 * `quick_fix_impl_*` rows of {@link sessionDefaultEnums}: `general` reuses the
 * session table, which adds the `auto` literal to runtime, model, and effort,
 * while `quick_fix` takes `claude`|`codex` with no `auto` runtime and bare
 * catalog tokens with no `auto` model, because there the provider is DERIVED
 * from the model token.
 *
 * @param {unknown} applies_to
 * @param {ResolvedCatalog} [catalog]
 * @returns {Record<string, ReadonlyArray<string>>}
 */
export function implPresetEnums(applies_to, catalog = runtimeCatalog()) {
  const session_enums = sessionDefaultEnums(catalog);
  const exec_enums = execSettingEnums(catalog);
  const profile = normalizeAppliesTo(applies_to);
  /** @type {Record<string, ReadonlyArray<string>>} */
  const narrowed = {};
  for (const key of presetKeysFor(profile)) {
    if (ORCHESTRATION_KEYS.includes(key)) {
      narrowed[key] = exec_enums[key];
      continue;
    }
    narrowed[key] =
      profile === 'quick_fix'
        ? session_enums[QUICK_FIX_LANE_MAP[key]]
        : session_enums[key];
  }
  return narrowed;
}

/**
 * Whether one runner exposes a requested speed through any catalog model.
 *
 * @param {ResolvedCatalog} catalog
 * @param {unknown} runtime
 * @param {string} speed
 * @returns {boolean}
 */
function runnerSupportsSpeed(catalog, runtime, speed) {
  if (typeof runtime !== 'string' || !catalog.runners[runtime]) {
    return false;
  }
  return Object.keys(catalog.runners[runtime].models).some((model) =>
    modelSpeedTiers(catalog, model).includes(speed)
  );
}

/**
 * Validate one execution preset's sparse settings against its profile.
 *
 * The `auto` literal is a SELECTOR STATE, not a catalog model or effort, so it
 * is removed before the runtime/model/effort coherence check — otherwise
 * `impl_model: 'auto'` would read as an unknown model. `impl_dispatch: 'main'`
 * likewise suspends coherence: a controller-implemented unit has no delegation
 * target to be coherent with.
 *
 * Every reason is a canonical key name in both profiles. The retired
 * `quick_fix_` reason prefix went with the prefixed keys: one profile's
 * `impl_model` is judged by one check, so there is nothing to disambiguate
 * (design §3.2).
 *
 * The two `fast` speed checks are the QUICK_FIX profile's alone, as they were
 * when they read the prefixed keys: the general profile stored a `fast` speed
 * unchecked before the split and still does. Each runs against whichever
 * runner that profile resolves, and stays silent when no runner is resolvable
 * at all — an `auto` target names no provider, so its speed tier is unknowable
 * rather than unsupported. The orchestration leg already read that way.
 *
 * @param {Record<string, unknown>} settings
 * @param {{ catalog?: ResolvedCatalog, applies_to?: unknown }} [options]
 * @returns {{ ok: true }|{ ok: false, reason: string }}
 */
export function validateImplPresetSettings(settings, options = {}) {
  const catalog = options.catalog ?? runtimeCatalog();
  const applies_to = normalizeAppliesTo(options.applies_to);
  const preset_keys = presetKeysFor(applies_to);
  const enums = implPresetEnums(applies_to, catalog);
  for (const [key, value] of Object.entries(settings)) {
    if (!preset_keys.includes(key)) {
      return { ok: false, reason: `unknown_impl_preset_key:${key}` };
    }
    if (typeof value !== 'string' || !enums[key].includes(value)) {
      return { ok: false, reason: `invalid_${key}` };
    }
  }

  /** @type {Record<string, unknown>} */
  const impl_target = {};
  for (const key of ['impl_runtime', 'impl_model', 'impl_effort']) {
    const value = settings[key];
    if (typeof value === 'string' && value !== AUTO_LITERAL) {
      impl_target[key] = value;
    }
  }
  if (settings.impl_dispatch !== 'main') {
    const coherence = validateImplSettings(impl_target, {
      catalog,
      active_writer: false
    });
    if (!coherence.ok) {
      return { ok: false, reason: coherence.reason };
    }
  }

  if (applies_to === 'quick_fix' && settings.impl_speed === 'fast') {
    const runtime =
      impl_target.impl_runtime ?? modelRunner(catalog, impl_target.impl_model);
    if (
      typeof runtime === 'string' &&
      !runnerSupportsSpeed(catalog, runtime, 'fast')
    ) {
      return { ok: false, reason: 'impl_speed_unsupported' };
    }
  }

  if (applies_to === 'quick_fix' && settings.orchestration_speed === 'fast') {
    const orchestration_model = settings.orchestration_model;
    if (typeof orchestration_model === 'string') {
      const runtime = modelRunner(catalog, orchestration_model);
      if (!runnerSupportsSpeed(catalog, runtime, 'fast')) {
        return { ok: false, reason: 'orchestration_speed_unsupported' };
      }
    }
  }
  return { ok: true };
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
 * explicit runtime, including `auto`, always wins and disables inference.
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
 * not store an exact model without its matching runtime. `auto` derives no
 * provider, so `provider_model_mismatch` cannot arise under it and a
 * model-less `auto` checks effort against the whole catalog union.
 *
 * @param {{ orchestration_model?: unknown, impl_runtime?: unknown, impl_model?: unknown, impl_effort?: unknown }} settings
 * @param {{ catalog?: ResolvedCatalog, active_writer?: boolean, controller_runtime?: string }} [options] - `controller_runtime`
 * is accepted for call-site compatibility and unused: no runtime value resolves
 * against the controller since `inherit` was retired.
 * @returns {{ ok: true, impl_runtime: string|undefined, inferred: boolean }|{ ok: false, reason: string }}
 */
export function validateImplSettings(settings, options = {}) {
  const catalog = options.catalog ?? runtimeCatalog();
  const active_writer = options.active_writer ?? true;
  const requested_runtime = settings?.impl_runtime;
  // `auto` on the model/effort axes is the selector's "unspecified" state, not
  // a catalog token: a stored `{auto, auto, auto}` Bead must validate as a
  // model-less `auto` runtime rather than as an unknown model. The runtime
  // axis keeps its literal — `auto` is a legal runtime value.
  const model =
    settings?.impl_model === AUTO_LITERAL ? undefined : settings?.impl_model;
  const effort =
    settings?.impl_effort === AUTO_LITERAL ? undefined : settings?.impl_effort;

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
  // Under `auto` the model token alone decides the provider (the dotfiles
  // selector's rule), so an exact model resolves the effective runtime and a
  // model-less `auto` resolves nothing — the controller is irrelevant.
  const effective_runtime =
    runtime === AUTO_LITERAL ? (model_runtime ?? undefined) : runtime;

  if (
    model_runtime &&
    effective_runtime &&
    model_runtime !== effective_runtime
  ) {
    return { ok: false, reason: 'provider_model_mismatch' };
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
 * Validate projected orchestration pins against the selected model's limits.
 * Without a model pin, effort and speed use the global enum vocabulary.
 *
 * @param {Record<string, unknown>} settings
 * @param {{ catalog?: ResolvedCatalog }} [options]
 * @returns {{ ok: true }|{ ok: false, reason: string }}
 */
export function validateOrchestrationPin(settings, options = {}) {
  const catalog = options.catalog ?? runtimeCatalog();
  const enums = execSettingEnums(catalog);
  const model = settings.orchestration_model;
  if (model !== undefined && !modelRunner(catalog, model)) {
    return { ok: false, reason: 'invalid_orchestration_model' };
  }
  if (model !== undefined) {
    enums.orchestration_effort = modelOrchestrationEfforts(catalog, model);
    enums.orchestration_speed = modelSpeedTiers(catalog, model);
  }
  for (const key of ORCHESTRATION_KEYS) {
    const value = settings[key];
    if (value === undefined) {
      continue;
    }
    if (typeof value !== 'string' || !enums[key].includes(value)) {
      return { ok: false, reason: `invalid_${key}` };
    }
  }
  return { ok: true };
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
