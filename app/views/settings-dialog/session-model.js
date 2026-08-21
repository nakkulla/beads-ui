/**
 * Pure view-model for the unified settings dialog.
 *
 * beads-ui CONSUMES the workflow contract's vocabulary; the canonical
 * definitions live in dotfiles `workflow.yaml` (`workspace_kv_defaults`,
 * `metadata.parent_keys`) and are mirrored on the server in
 * `server/worker/exec-enums.js`. Nothing here may widen them. Concrete unset
 * labels come from the pinned projection through the shared resolver.
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
 * The eleven keys `bd kv workflow_session_defaults` may STORE, in dialog
 * display order. `impl_dispatch` is absent by contract
 * (`write_rule: user_write_only`): a workspace-global dispatch would decide for
 * every later bead, so the session-defaults group offers no such row.
 */
export const WORKSPACE_KV_KEYS = BEAD_APPLY_KEYS.filter(
  (key) => key !== 'impl_dispatch'
);

/** The three orchestration keys the workspace queue stores as values. */
export const ORCHESTRATION_KEYS = [
  'orchestration_model',
  'orchestration_effort',
  'orchestration_speed'
];

/** The fifteen keys an execution preset carries. */
export const IMPL_PRESET_KEYS = [...BEAD_APPLY_KEYS, ...ORCHESTRATION_KEYS];

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
 * Effort options for the implementation target: the chosen model's own efforts,
 * or the target runtime's union while the model is `자동`.
 *
 * @param {any} catalog
 * @param {string|undefined} runtime
 * @param {string|undefined} model
 * @returns {string[]}
 */
export function implEffortOptions(catalog, runtime, model) {
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
      const list = isRecord(model_entry) ? model_entry.efforts : null;
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
 * Build labels for the dialog's own layer: it edits the workspace-global values
 * directly, so its unset option names the result without naming a layer.
 * Dependent selectors remain in the draft and immediately affect that label.
 *
 * @param {string} key
 * @param {ReadonlyArray<string>} choices
 * @param {Record<string, string|null|undefined>} draft
 * @param {Record<string, any>|null|undefined} execution_defaults
 * @param {Record<string, any>|null|undefined} runner_catalog
 * @returns {{ unset_label: string, full_value: string|null, unavailable: boolean, disabled: boolean, options: Array<{ value: string, label: string, full_value: string|null }> }}
 */
export function buildExecutionOptionView(
  key,
  choices,
  draft,
  execution_defaults,
  runner_catalog
) {
  return buildOptionView({
    key,
    choices,
    layer: 'global',
    global: draft,
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
