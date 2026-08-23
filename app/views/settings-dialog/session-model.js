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
 * The twelve session keys a PER-BEAD write may carry — the per-bead preset
 * apply and the detail panel's individual edits. Mirrors
 * `server/worker/exec-enums.js BEAD_APPLY_KEYS`.
 */
export const BEAD_APPLY_KEYS = [
  'workflow_mode',
  'spec_review_model',
  'spec_review_effort',
  'plan_review_model',
  'plan_review_effort',
  'impl_review_model',
  'impl_review_effort',
  'impl_dispatch',
  'impl_runtime',
  'impl_model',
  'impl_effort',
  'impl_speed'
];

/**
 * The twelve keys `bd kv workflow_session_defaults` may STORE, in dialog
 * display order. `impl_dispatch` is absent by contract
 * (`write_rule: user_write_only`): a workspace-global dispatch would decide for
 * every later bead, so the session-defaults group offers no such row.
 * `quick_fix_impl_model` is the one kv-only route-scoped key — it has no
 * per-bead layer, so no preset and no pin can carry it.
 */
export const WORKSPACE_KV_KEYS = [
  ...BEAD_APPLY_KEYS.filter((key) => key !== 'impl_dispatch'),
  'quick_fix_impl_model'
];

/** The three orchestration keys the workspace queue stores as values. */
export const ORCHESTRATION_KEYS = [
  'orchestration_model',
  'orchestration_effort',
  'orchestration_speed'
];

/** The fifteen keys an execution preset carries. */
export const IMPL_PRESET_KEYS = [...BEAD_APPLY_KEYS, ...ORCHESTRATION_KEYS];

/**
 * The eleven kv keys a preset actually CARRIES — the workspace kv list minus the
 * keys no preset can supply. Mirrors `server/worker/exec-enums.js
 * PRESET_KV_KEYS`, which is exactly the list a global apply REPLACES, so the
 * kv-only `quick_fix_impl_model` survives an apply instead of being cleared.
 */
export const PRESET_KV_KEYS = WORKSPACE_KV_KEYS.filter((key) =>
  IMPL_PRESET_KEYS.includes(key)
);

/** 실행 방식: 위임(기존 runtime matrix) 또는 메인(컨트롤러 직접 구현). */
export const IMPL_DISPATCHES = ['delegated', 'main'];

/** Which runtime the delegated implementation leg runs on. */
export const IMPL_RUNTIMES = ['inherit', 'claude', 'codex'];

/** Service tier for the implementation leg; `fast` is Codex-only. */
export const IMPL_SPEEDS = ['default', 'fast'];

/** Both `workflow_mode` values are storable — `standard` is a literal. */
export const WORKFLOW_MODES = ['standard', 'fast_track'];

export const REVIEW_STEP_MODELS = ['codex', 'opus', 'fable', 'self', 'skip'];
export const PLAN_REVIEW_MODELS = ['codex', 'fable', 'skip'];
export const REVIEW_EFFORTS = ['low', 'medium', 'high', 'xhigh'];

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
 * `inherit` cannot know the controller's provider from the client, so it offers
 * every model; the server still refuses an incoherent pair on write.
 *
 * @param {any} catalog
 * @param {string|undefined} runtime
 * @returns {string[]}
 */
export function implModelOptions(catalog, runtime) {
  const pairs = runnerModels(catalog);
  const selected =
    runtime && runtime !== 'inherit'
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
    if (runtime && runtime !== 'inherit' && runner !== runtime) {
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
 * catalog), so an unresolvable `inherit` is "cannot judge", not "illegal".
 *
 * @param {{ impl_runtime?: string, impl_model?: string, impl_effort?: string }} target
 * @param {any} catalog
 * @param {string|null} controller_runtime - The controller's runtime an
 * `inherit` target would adopt, or `null` when this context cannot know it.
 * @returns {{ impl_runtime: string|undefined, impl_model: string|undefined, impl_effort: string|undefined }}
 */
export function narrowImplTarget(target, catalog, controller_runtime) {
  const narrowed = {
    impl_runtime: target?.impl_runtime,
    impl_model: target?.impl_model,
    impl_effort: target?.impl_effort
  };
  const effective_runtime =
    narrowed.impl_runtime === 'claude' || narrowed.impl_runtime === 'codex'
      ? narrowed.impl_runtime
      : narrowed.impl_runtime === 'inherit'
        ? controller_runtime
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
 * Korean labels for the fourteen keys a preset diff can name — the same
 * vocabulary the dialog's own rows use.
 *
 * @type {Record<string, string>}
 */
export const PRESET_DIFF_LABELS = {
  workflow_mode: '워크플로 모드',
  spec_review_model: '스펙 리뷰어',
  spec_review_effort: '스펙 리뷰 effort',
  plan_review_model: '계획 리뷰어',
  plan_review_effort: '계획 리뷰 effort',
  impl_review_model: '구현 리뷰어',
  impl_review_effort: '구현 리뷰 effort',
  impl_runtime: '위임 대상',
  impl_model: '구현 모델',
  impl_effort: '구현 effort',
  impl_speed: '구현 속도',
  orchestration_model: '워커 모델',
  orchestration_effort: '워커 effort',
  orchestration_speed: '워커 속도'
};

/** Exactly the keys a global preset apply replaces, in declaration order. */
const PRESET_DIFF_KEYS = [...PRESET_KV_KEYS, ...ORCHESTRATION_KEYS];

/**
 * Declared keys a preset may carry that a global apply does NOT write:
 * `impl_dispatch` is `user_write_only`, and `quick_fix_impl_model` has no preset
 * layer at all.
 */
const PRESET_IGNORED_KEYS = [...IMPL_PRESET_KEYS, ...WORKSPACE_KV_KEYS].filter(
  (key, index, list) =>
    list.indexOf(key) === index && !PRESET_DIFF_KEYS.includes(key)
);

/**
 * Preview what applying a preset globally would change, key by key.
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
 * @returns {{ unset_label: string, full_value: string|null, unavailable: boolean, disabled: boolean, options: Array<{ value: string, label: string, full_value: string|null }> }}
 */
export function buildExecutionOptionView(
  key,
  choices,
  draft,
  execution_defaults,
  runner_catalog,
  resolution_draft
) {
  return buildOptionView({
    key,
    choices,
    layer: 'global',
    global: draft,
    resolution_global: resolution_draft,
    execution_defaults,
    runner_catalog
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
 * @param {Record<string, string>} baseline
 * @param {Record<string, string>} draft
 * @returns {Record<string, string|null>}
 */
export function buildSessionDefaultsPatch(baseline, draft) {
  /** @type {Record<string, string|null>} */
  const patch = {};
  for (const key of WORKSPACE_KV_KEYS) {
    const before = baseline?.[key];
    const after = draft?.[key];
    if (before === after) {
      continue;
    }
    patch[key] = typeof after === 'string' && after.length > 0 ? after : null;
  }
  return patch;
}

/**
 * Diff the Worker tab's three orchestration values. A session key offered here
 * is dropped rather than forwarded — the two storages are disjoint by contract.
 *
 * @param {Record<string, string|null>} baseline
 * @param {Record<string, string|null>} draft
 * @returns {Record<string, string|null>}
 */
export function buildOrchestrationPatch(baseline, draft) {
  /** @type {Record<string, string|null>} */
  const patch = {};
  for (const key of ORCHESTRATION_KEYS) {
    const before = baseline?.[key] ?? null;
    const after = draft?.[key] ?? null;
    if (before === after) {
      continue;
    }
    patch[key] = typeof after === 'string' && after.length > 0 ? after : null;
  }
  return patch;
}
