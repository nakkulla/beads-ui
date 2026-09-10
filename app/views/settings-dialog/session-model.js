/**
 * Pure view-model for the unified settings dialog.
 *
 * beads-ui CONSUMES the workflow contract's vocabulary; the canonical
 * definitions live in dotfiles `workflow.yaml` (`workspace_kv_defaults`,
 * `metadata.parent_keys`) and are mirrored on the server in
 * `server/worker/exec-enums.js`. Nothing here may widen them. Concrete unset
 * labels come from the pinned projection through the shared resolver.
 *
 * @typedef {{ key: string, label: string, before: string|null, after: string|null, kind: 'added'|'removed'|'changed' }} PresetDiffRow
 */
import { buildOptionView } from '../../utils/execution-defaults.js';

/**
 * The fourteen session keys a PER-BEAD write may carry — the per-bead preset
 * apply and the detail panel's individual edits. Mirrors
 * `server/worker/exec-enums.js BEAD_APPLY_KEYS`. `workflow_mode` is NOT one of
 * them: a bead's mode is not a value a preset decides (UI-7yh2 §3.7).
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

/**
 * The route-scoped quick_fix kv profile. Each key overrides the same-name
 * general key for a `route=quick_fix` Bead only, and an empty key falls through
 * to that general key. Mirrors `server/worker/exec-enums.js QUICK_FIX_KV_KEYS`.
 */
export const QUICK_FIX_KV_KEYS = [
  'quick_fix_impl_dispatch',
  'quick_fix_impl_runtime',
  'quick_fix_impl_model',
  'quick_fix_impl_effort',
  'quick_fix_impl_speed'
];

/**
 * The twenty-one keys `bd kv workflow_session_defaults` may STORE, in the
 * contract's own order. `impl_dispatch` is absent by contract
 * (`write_rule: user_write_only`): a workspace-global dispatch would decide for
 * every later bead, so the session-defaults group offers no such row.
 * The quick_fix profile, `base_sync_accept_local_commits`, and `bdui_url` are
 * kv-only keys — none has a per-bead layer, so no preset and no pin can carry
 * them.
 */
export const WORKSPACE_KV_KEYS = [
  'workflow_mode',
  ...BEAD_APPLY_KEYS.filter((key) => key !== 'impl_dispatch'),
  ...QUICK_FIX_KV_KEYS,
  'base_sync_accept_local_commits',
  'bdui_url'
];

/**
 * Workspace kv keys the contract types `type: bool` (`workflow-state.yaml
 * key_scoped`): the STORED value is a JSON boolean, and `false` means exactly
 * what absence means to the consumer.
 *
 * The dialog's draft is a flat `Record<string, string>` that every enum row
 * reads, so a boolean is kept out of it: {@link adoptSessionDefaultValues}
 * turns a stored `true` into {@link BOOLEAN_DRAFT_ON} on the way in and
 * {@link buildSessionDefaultsPatch} turns it back into a real boolean on the
 * way out. The server enforces the JSON type in `server/session-defaults.js`.
 */
export const SESSION_DEFAULT_BOOLEAN_KEYS = ['base_sync_accept_local_commits'];

/** The draft marker standing in for a stored `true` on a bool key. */
export const BOOLEAN_DRAFT_ON = 'true';

/**
 * Adopt one server `values` map as the dialog's draft and baseline: a bool key
 * becomes the {@link BOOLEAN_DRAFT_ON} marker when stored `true` and drops when
 * stored `false`, and every other key keeps its string value.
 *
 * Dropping a stored `false` is what keeps the diff honest: the off position
 * sends the deletion request, so a baseline that remembered `false` would
 * re-send it on the next unrelated edit.
 *
 * @param {unknown} values - A `get`/`set` reply's `values`, or nothing.
 * @returns {Record<string, string>}
 */
export function adoptSessionDefaultValues(values) {
  /** @type {Record<string, string>} */
  const adopted = {};
  if (!isRecord(values)) {
    return adopted;
  }
  for (const [key, value] of Object.entries(values)) {
    if (SESSION_DEFAULT_BOOLEAN_KEYS.includes(key)) {
      if (value === true) {
        adopted[key] = BOOLEAN_DRAFT_ON;
      }
      continue;
    }
    if (typeof value === 'string') {
      adopted[key] = value;
    }
  }
  return adopted;
}

/**
 * True for an absolute `http`/`https` origin written exactly as `URL`
 * normalizes it — no trailing slash, path, query, fragment, or userinfo.
 *
 * `bdui_url` is the one workspace kv key the contract types `enum: none`
 * (`workflow-state.yaml key_scoped`), so the dialog judges its FORMAT before
 * offering to save it rather than letting the server refuse the whole patch.
 * The server enforces the same rule in `server/session-defaults.js`; the two
 * runtimes share no module, so the equality is asserted from both test files.
 *
 * @param {string} value
 */
export function isHttpOriginValue(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    return false;
  }
  return (
    (url.protocol === 'http:' || url.protocol === 'https:') &&
    value === url.origin
  );
}

/** The three orchestration keys the workspace queue stores as values. */
export const ORCHESTRATION_KEYS = [
  'orchestration_model',
  'orchestration_effort',
  'orchestration_speed'
];

/** Route-scoped queue keys used only for quick_fix dispatches. */
export const QUICK_FIX_ORCHESTRATION_KEYS = [
  'quick_fix_orchestration_model',
  'quick_fix_orchestration_effort',
  'quick_fix_orchestration_speed'
];

/** Lane-neutral preset fields mapped onto quick_fix storage keys. */
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
 * The twenty-five keys an execution preset carries: the per-bead values plus
 * the general and quick_fix workspace profiles, in the same order as
 * `server/worker/exec-enums.js IMPL_PRESET_KEYS`.
 */
export const IMPL_PRESET_KEYS = [
  ...BEAD_APPLY_KEYS,
  ...ORCHESTRATION_KEYS,
  ...QUICK_FIX_ORCHESTRATION_KEYS,
  ...QUICK_FIX_KV_KEYS
];

/**
 * The eighteen kv keys a preset actually CARRIES — the workspace kv list minus
 * the keys no preset can supply. Mirrors `server/worker/exec-enums.js
 * PRESET_KV_KEYS`, which is exactly the list one apply REPLACES.
 */
export const PRESET_KV_KEYS = WORKSPACE_KV_KEYS.filter((key) =>
  IMPL_PRESET_KEYS.includes(key)
);

/** 실행 방식: 위임(기존 runtime matrix) 또는 메인(컨트롤러 직접 구현). */
export const IMPL_DISPATCHES = ['delegated', 'main'];

/** Which runtime the delegated implementation leg runs on. */
export const IMPL_RUNTIMES = ['auto', 'claude', 'codex'];

/** Service tier for the implementation leg; `fast` is Codex-only. */
export const IMPL_SPEEDS = ['default', 'fast'];

/** Both `workflow_mode` values are storable — `standard` is a literal. */
export const WORKFLOW_MODES = ['standard', 'fast_track'];

export const REVIEW_STEP_MODELS = [
  'codex',
  'astra',
  'opus',
  'fable',
  'self',
  'skip'
];
export const PLAN_REVIEW_MODELS = ['codex', 'astra', 'fable', 'skip'];
export const REVIEW_EFFORTS = ['low', 'medium', 'high', 'xhigh'];
export const REVIEW_SPEEDS = ['default', 'fast'];

/** The selector's model/auto · effort/auto state, offered as a real choice. */
export const AUTO_LITERAL = 'auto';

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * `[runner_name, model_names]` pairs from a worker-snapshot catalog, in catalog
 * order. An unresolvable catalog yields an empty list rather than a guess.
 *
 * @param {any} catalog
 * @returns {Array<[string, string[]]>}
 */
function runnerModels(catalog) {
  if (!isRecord(catalog) || !isRecord(catalog.runners)) {
    return [];
  }
  /** @type {Array<[string, string[]]>} */
  const pairs = [];
  for (const [runner, entry] of Object.entries(catalog.runners)) {
    if (isRecord(entry) && isRecord(entry.models)) {
      pairs.push([runner, Object.keys(entry.models)]);
    }
  }
  return pairs;
}

/**
 * `메인` means the controller implements the unit itself, so the delegation
 * target and its model/effort/speed rows carry no meaning and are disabled.
 *
 * A PER-BEAD predicate only: the workspace kv layer stores no `impl_dispatch`,
 * so no workspace draft can ever answer true and the session-defaults group
 * leaves its delegation rows enabled.
 *
 * @param {Record<string, string>} draft
 * @returns {boolean}
 */
export function isDelegationDisabled(draft) {
  return draft?.impl_dispatch === 'main';
}

/**
 * Model options for the implementation target, narrowed by 위임 대상.
 * `auto` derives no provider, so it offers every model; the exact model token is
 * what decides the provider, and the server still refuses an incoherent pair.
 *
 * @param {any} catalog
 * @param {string|undefined} runtime
 * @returns {string[]}
 */
export function implModelOptions(catalog, runtime) {
  const pairs = runnerModels(catalog);
  const selected =
    runtime && runtime !== AUTO_LITERAL
      ? pairs.filter(([runner]) => runner === runtime)
      : pairs;
  return [AUTO_LITERAL, ...selected.flatMap(([, models]) => models)];
}

/**
 * Union of one effort vocabulary over every catalog model the runtime/model
 * pair still admits. `vocabularyOf` names WHICH vocabulary — implementation and
 * orchestration efforts are different lists over the same catalog.
 *
 * @param {any} catalog
 * @param {string|null|undefined} runtime
 * @param {string|null|undefined} model
 * @param {(entry: Record<string, any>, model_entry: any) => unknown} vocabularyOf
 * @returns {string[]}
 */
function effortUnion(catalog, runtime, model, vocabularyOf) {
  if (!isRecord(catalog) || !isRecord(catalog.runners)) {
    return [AUTO_LITERAL];
  }
  /** @type {string[]} */
  const efforts = [];
  for (const [runner, entry] of Object.entries(catalog.runners)) {
    if (!isRecord(entry) || !isRecord(entry.models)) {
      continue;
    }
    if (runtime && runtime !== AUTO_LITERAL && runner !== runtime) {
      continue;
    }
    for (const [model_name, model_entry] of Object.entries(entry.models)) {
      if (model && model !== AUTO_LITERAL && model_name !== model) {
        continue;
      }
      const list = vocabularyOf(entry, model_entry);
      if (!Array.isArray(list)) {
        continue;
      }
      for (const effort of list) {
        if (typeof effort === 'string' && !efforts.includes(effort)) {
          efforts.push(effort);
        }
      }
    }
  }
  return [AUTO_LITERAL, ...efforts];
}

/**
 * Effort options for the implementation target: the chosen model's own efforts,
 * or the target runtime's union while the model is `자동`. A model that declares
 * no `efforts` inherits its runner's list — the same fallback the detail panel's
 * `effortsOf` applies, without which a runner-level-only catalog (claude) offers
 * nothing but `auto`.
 *
 * @param {any} catalog
 * @param {string|undefined} runtime
 * @param {string|undefined} model
 * @returns {string[]}
 */
export function implEffortOptions(catalog, runtime, model) {
  return effortUnion(catalog, runtime, model, (entry, model_entry) =>
    isRecord(model_entry) && Array.isArray(model_entry.efforts)
      ? model_entry.efforts
      : entry.efforts
  );
}

/**
 * Effort options for the OUTER Worker leg, whose vocabulary is its own key:
 * `orchestration_efforts` when the model declares it, then the implementation
 * `efforts`, then the runner's list (`orchestrationEffortsOf`). The dialog's
 * orchestration effort row and the runtime-filter reset both read this, so a
 * value can never survive a list that no longer offers it.
 *
 * @param {any} catalog
 * @param {string|null|undefined} runtime
 * @param {string|null|undefined} model
 * @returns {string[]}
 */
export function orchestrationEffortOptions(catalog, runtime, model) {
  return effortUnion(catalog, runtime, model, (entry, model_entry) => {
    if (
      isRecord(model_entry) &&
      Array.isArray(model_entry.orchestration_efforts)
    ) {
      return model_entry.orchestration_efforts;
    }
    return isRecord(model_entry) && Array.isArray(model_entry.efforts)
      ? model_entry.efforts
      : entry.efforts;
  });
}

/**
 * Orchestration model options. The Worker tab's runtime selector is a UI-ONLY
 * grouping filter (spec §A/§D): the stored key stays `orchestration_model` and
 * the launch client is derived from it.
 *
 * @param {any} catalog
 * @param {string|null|undefined} runtime
 * @returns {string[]}
 */
export function orchestrationModelOptions(catalog, runtime) {
  const pairs = runnerModels(catalog);
  const selected = runtime
    ? pairs.filter(([runner]) => runner === runtime)
    : pairs;
  return selected.flatMap(([, models]) => models);
}

/**
 * Drop the implementation model/effort a newly chosen delegation target cannot
 * run, so one edit saves one coherent triple.
 *
 * Unlike the detail panel's `normalizeImplTarget`, an UNKNOWN effective runtime
 * changes nothing: this layer is the workspace default, where a model without a
 * runtime is legal by contract (the kv model's runtime is DERIVED from the
 * catalog), so an unjudgeable target is "cannot judge", not "illegal". `auto`
 * derives no provider either — only an exact model token does, so `auto` narrows
 * effort to that model's list and narrows nothing at all while the model is
 * `auto`.
 *
 * @param {{ impl_runtime?: string, impl_model?: string, impl_effort?: string }} target
 * @param {any} catalog
 * @returns {{ impl_runtime: string|undefined, impl_model: string|undefined, impl_effort: string|undefined }}
 */
export function narrowImplTarget(target, catalog) {
  const narrowed = {
    impl_runtime: target?.impl_runtime,
    impl_model: target?.impl_model,
    impl_effort: target?.impl_effort
  };
  if (narrowed.impl_runtime === AUTO_LITERAL) {
    if (!narrowed.impl_model || narrowed.impl_model === AUTO_LITERAL) {
      return narrowed;
    }
    if (
      narrowed.impl_effort &&
      !implEffortOptions(catalog, AUTO_LITERAL, narrowed.impl_model).includes(
        narrowed.impl_effort
      )
    ) {
      narrowed.impl_effort = undefined;
    }
    return narrowed;
  }
  const effective_runtime =
    narrowed.impl_runtime === 'claude' || narrowed.impl_runtime === 'codex'
      ? narrowed.impl_runtime
      : null;
  if (!effective_runtime) {
    return narrowed;
  }
  if (
    narrowed.impl_model &&
    !implModelOptions(catalog, effective_runtime).includes(narrowed.impl_model)
  ) {
    narrowed.impl_model = undefined;
  }
  if (
    narrowed.impl_effort &&
    !implEffortOptions(
      catalog,
      effective_runtime,
      narrowed.impl_model || AUTO_LITERAL
    ).includes(narrowed.impl_effort)
  ) {
    narrowed.impl_effort = undefined;
  }
  return narrowed;
}

/**
 * Speed tiers one catalog runner offers, unioned over its models. A model that
 * declares no `speed_tiers` counts as Standard only — the same conservative
 * default the server catalog applies (`modelSpeedTiers`).
 *
 * @param {any} catalog
 * @param {string} runtime
 * @returns {string[]}
 */
function runnerSpeedTiers(catalog, runtime) {
  const entry =
    isRecord(catalog) && isRecord(catalog.runners)
      ? catalog.runners[runtime]
      : null;
  if (!isRecord(entry) || !isRecord(entry.models)) {
    return [];
  }
  /** @type {string[]} */
  const tiers = [];
  for (const model_entry of Object.values(entry.models)) {
    const declared =
      isRecord(model_entry) && Array.isArray(model_entry.speed_tiers)
        ? model_entry.speed_tiers
        : ['default'];
    for (const tier of declared) {
      if (typeof tier === 'string' && !tiers.includes(tier)) {
        tiers.push(tier);
      }
    }
  }
  return tiers;
}

/**
 * The runner a row's stored values name: an explicit runtime when it is
 * concrete, otherwise the runner owning the exact model token (matched on the
 * catalog's model NAME or its `id`, the same derivation `deriveModelRuntime`
 * uses). `auto` names no provider, so it derives nothing.
 *
 * @param {any} catalog
 * @param {{ runtime?: string|null, model?: string|null }} row
 * @returns {string|null}
 */
export function rowRunner(catalog, row) {
  const runtime = row?.runtime;
  if (
    typeof runtime === 'string' &&
    runtime.length > 0 &&
    runtime !== AUTO_LITERAL
  ) {
    return runtime;
  }
  const model = row?.model;
  if (
    typeof model !== 'string' ||
    model.length === 0 ||
    model === AUTO_LITERAL
  ) {
    return null;
  }
  for (const [runner, entry] of Object.entries(
    isRecord(catalog) && isRecord(catalog.runners) ? catalog.runners : {}
  )) {
    if (!isRecord(entry) || !isRecord(entry.models)) {
      continue;
    }
    for (const [name, model_entry] of Object.entries(entry.models)) {
      if (
        name === model ||
        (isRecord(model_entry) && model_entry.id === model)
      ) {
        return runner;
      }
    }
  }
  return null;
}

/**
 * Whether a `속도` row belongs on screen. The catalog decides: a row is drawn
 * only when its effective runner publishes two or more `speed_tiers`, so no
 * runner name is written into this rule (UI-7yh2 §3.4). A row whose runner
 * cannot be derived is hidden rather than guessed.
 *
 * @param {any} catalog
 * @param {{ runtime?: string|null, model?: string|null }} row
 * @returns {boolean}
 */
export function speedVisible(catalog, row) {
  const runner = rowRunner(catalog, row);
  if (runner === null) {
    return false;
  }
  return runnerSpeedTiers(catalog, runner).length >= 2;
}

/**
 * The orchestration runtime choices, in catalog order. There is no `전체`
 * option: the row picks ONE provider and the model list follows it.
 *
 * @param {any} catalog
 * @returns {string[]}
 */
export function orchestrationRuntimeOptions(catalog) {
  return runnerModels(catalog).map(([runner]) => runner);
}

/**
 * The runtime the orchestration row starts on: the runner of the STORED
 * orchestration model, or of the projection's default model while nothing is
 * stored. An undecidable catalog yields the first offered runner, and an empty
 * catalog `null`.
 *
 * @param {any} catalog
 * @param {string|null|undefined} model - Stored `orchestration_model`.
 * @param {string|null|undefined} fallback_model - The projection default model.
 * @returns {string|null}
 */
export function orchestrationRuntimeInitial(catalog, model, fallback_model) {
  const stored = rowRunner(catalog, { model: model ?? null });
  if (stored !== null) {
    return stored;
  }
  const projected = rowRunner(catalog, { model: fallback_model ?? null });
  if (projected !== null) {
    return projected;
  }
  return orchestrationRuntimeOptions(catalog)[0] ?? null;
}

/**
 * Korean labels for every key a preset diff can name — the same vocabulary the
 * dialog's own rows use. The quick_fix half keeps its prefix so a diff row is
 * never mistaken for the general profile's row of the same name.
 *
 * @type {Record<string, string>}
 */
export const PRESET_DIFF_LABELS = {
  spec_review_model: '스펙 리뷰어',
  spec_review_effort: '스펙 리뷰 effort',
  spec_review_speed: '스펙 리뷰 속도',
  plan_review_model: '계획 리뷰어',
  plan_review_effort: '계획 리뷰 effort',
  plan_review_speed: '계획 리뷰 속도',
  impl_review_model: '구현 리뷰어',
  impl_review_effort: '구현 리뷰 effort',
  impl_review_speed: '구현 리뷰 속도',
  impl_runtime: '위임 대상',
  impl_model: '구현 모델',
  impl_effort: '구현 effort',
  impl_speed: '구현 속도',
  orchestration_model: '워커 모델',
  orchestration_effort: '워커 effort',
  orchestration_speed: '워커 속도',
  quick_fix_orchestration_model: 'quick_fix 워커 모델',
  quick_fix_orchestration_effort: 'quick_fix 워커 effort',
  quick_fix_orchestration_speed: 'quick_fix 워커 속도',
  quick_fix_impl_dispatch: 'quick_fix 실행 방식',
  quick_fix_impl_runtime: 'quick_fix 위임 대상',
  quick_fix_impl_model: 'quick_fix 구현 모델',
  quick_fix_impl_effort: 'quick_fix 구현 effort',
  quick_fix_impl_speed: 'quick_fix 구현 속도'
};

/** Exactly the keys one preset apply replaces, in declaration order. */
const PRESET_DIFF_KEYS = [
  ...PRESET_KV_KEYS,
  ...ORCHESTRATION_KEYS,
  ...QUICK_FIX_ORCHESTRATION_KEYS
];

/**
 * Declared keys a preset may carry that one apply does NOT write:
 * `impl_dispatch` is `user_write_only`, and `workflow_mode`/`bdui_url` have no
 * preset layer at all.
 */
const PRESET_IGNORED_KEYS = [...IMPL_PRESET_KEYS, ...WORKSPACE_KV_KEYS].filter(
  (key, index, list) =>
    list.indexOf(key) === index && !PRESET_DIFF_KEYS.includes(key)
);

/**
 * Preview what applying a preset would change, key by key.
 *
 * The comparison set is the one the SERVER replaces, not the workspace kv list:
 * a key the apply preserves must never be previewed as cleared.
 *
 * @param {Record<string, string>} current - `executionDraftSettings()`.
 * @param {Record<string, string>} preset - `preset.settings` (sparse).
 * @returns {{ rows: PresetDiffRow[], ignored_keys: string[] }}
 */
export function buildPresetDiff(current, preset) {
  const before_values = isRecord(current) ? current : {};
  const after_values = isRecord(preset) ? preset : {};
  /** @type {PresetDiffRow[]} */
  const rows = [];
  for (const key of PRESET_DIFF_KEYS) {
    const before = before_values[key] ?? null;
    const after = after_values[key] ?? null;
    if (before === after) {
      continue;
    }
    rows.push({
      key,
      label: PRESET_DIFF_LABELS[key] || key,
      before,
      after,
      kind: before === null ? 'added' : after === null ? 'removed' : 'changed'
    });
  }
  /** @type {string[]} */
  const ignored_keys = [];
  for (const key of [...PRESET_IGNORED_KEYS, ...Object.keys(after_values)]) {
    if (
      !PRESET_DIFF_KEYS.includes(key) &&
      !ignored_keys.includes(key) &&
      Object.hasOwn(after_values, key)
    ) {
      ignored_keys.push(key);
    }
  }
  return { rows, ignored_keys };
}

/**
 * Build labels for the dialog's own layer: it edits the workspace-global values
 * directly, so its unset option names the result without naming a layer.
 * Dependent selectors remain in the draft and immediately affect that label.
 *
 * @param {string} key
 * @param {ReadonlyArray<string>} choices
 * @param {Record<string, string|null|undefined>} draft
 * @param {Record<string, any>|null|undefined} execution_defaults
 * @param {Record<string, any>|null|undefined} runner_catalog
 * @param {Record<string, string|null|undefined>} [resolution_draft] - Values the
 * OTHER keys resolve against when the session draft is not the whole workspace
 * layer; `draft` stays the edited and saved source.
 * @param {string|null} [route]
 * @returns {{ unset_label: string, full_value: string|null, unavailable: boolean, disabled: boolean, options: Array<{ value: string, label: string, full_value: string|null }> }}
 */
export function buildExecutionOptionView(
  key,
  choices,
  draft,
  execution_defaults,
  runner_catalog,
  resolution_draft,
  route = null
) {
  return buildOptionView({
    key,
    choices,
    layer: 'global',
    global: draft,
    resolution_global: resolution_draft,
    execution_defaults,
    runner_catalog,
    route
  });
}

/**
 * Diff a draft against the values last read from the server.
 *
 * Only CHANGED keys are sent, and a key the draft dropped is sent as `null` —
 * the server's deletion request. `workflow_mode: 'standard'` is an ordinary
 * value here, never a deletion: it must be able to override a `fast_track`
 * workspace default when pinned, and to BE the workspace default itself.
 *
 * A `type: bool` key leaves the draft's marker representation here: checked
 * sends the JSON boolean the contract stores, unchecked sends the deletion
 * rather than a stored `false`, which the consumer reads identically.
 *
 * @param {Record<string, string>} baseline
 * @param {Record<string, string>} draft
 * @returns {Record<string, string|boolean|null>}
 */
export function buildSessionDefaultsPatch(baseline, draft) {
  /** @type {Record<string, string|boolean|null>} */
  const patch = {};
  for (const key of WORKSPACE_KV_KEYS) {
    const before = baseline?.[key];
    const after = draft?.[key];
    if (before === after) {
      continue;
    }
    if (SESSION_DEFAULT_BOOLEAN_KEYS.includes(key)) {
      patch[key] = after === BOOLEAN_DRAFT_ON ? true : null;
      continue;
    }
    patch[key] = typeof after === 'string' && after.length > 0 ? after : null;
  }
  return patch;
}

/**
 * Diff the Worker tab's six orchestration values. A session key offered here
 * is dropped rather than forwarded — the two storages are disjoint by contract.
 *
 * @param {Record<string, string|null>} baseline
 * @param {Record<string, string|null>} draft
 * @returns {Record<string, string|null>}
 */
export function buildOrchestrationPatch(baseline, draft) {
  /** @type {Record<string, string|null>} */
  const patch = {};
  for (const key of [...ORCHESTRATION_KEYS, ...QUICK_FIX_ORCHESTRATION_KEYS]) {
    const before = baseline?.[key] ?? null;
    const after = draft?.[key] ?? null;
    if (before === after) {
      continue;
    }
    patch[key] = typeof after === 'string' && after.length > 0 ? after : null;
  }
  return patch;
}
