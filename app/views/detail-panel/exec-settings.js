import { html } from 'lit-html';

/**
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {{ value: string, label: string }} SelectOption
 * @typedef {{ label: string|null, options: SelectOption[] }} SelectGroup
 * @typedef {{
 *   key: string,
 *   groups: SelectGroup[],
 *   selected: string,
 *   disabled: boolean,
 *   runner: string|null
 * }} ExecRow
 */

/**
 * `spec_review_model` / `impl_review_model` options. Contract-fixed rather than
 * catalog-derived (mirrors server/worker/exec-enums.js REVIEW_STEP_MODELS): the
 * review legs are dispatched by the session, and `self`/`skip` are verbs, not
 * models.
 */
export const REVIEW_STEP_MODELS = ['codex', 'opus', 'fable', 'self', 'skip'];

/** `plan_review_model` options — narrower by contract: no `self`, no `opus`. */
export const PLAN_REVIEW_MODELS = ['codex', 'fable', 'skip'];

/** Effort vocabulary shared by all three review steps. */
export const REVIEW_EFFORTS = ['low', 'medium', 'high', 'xhigh'];

/** Stored workflow_mode values; `standard` records as key removal (unset). */
export const WORKFLOW_MODES = ['standard', 'fast_track'];

/**
 * The 11 workspace-global-capable exec keys, in display order. Mirrors the
 * server table in server/worker/exec-enums.js; `workflow_mode` is per-bead only
 * and therefore not part of it.
 */
export const EXEC_KEYS = [
  'orchestration_model',
  'orchestration_effort',
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
 * User-facing execution-setting names and the two non-obvious fallback hints.
 * Every execution-settings surface renders this table so labels cannot drift.
 *
 * @type {Record<string, { title: string, help?: string }>}
 */
export const EXEC_SETTING_PRESENTATION = {
  orchestration_model: { title: '워커 실행 모델' },
  orchestration_effort: { title: '워커 reasoning effort' },
  spec_review_model: { title: '스펙 리뷰어' },
  spec_review_effort: { title: '스펙 리뷰 reasoning effort' },
  plan_review_model: { title: '계획 리뷰어' },
  plan_review_effort: { title: '계획 리뷰 reasoning effort' },
  impl_review_model: { title: '구현 리뷰어' },
  impl_review_effort: { title: '구현 리뷰 reasoning effort' },
  impl_runtime: { title: '구현 runtime' },
  impl_model: {
    title: '구현 모델',
    help: '워크플로가 복잡 구현인지, 범위가 한정된 구현인지 판단해 현재 runtime의 구현용 모델을 선택합니다.'
  },
  impl_effort: {
    title: '구현 reasoning effort',
    help: '자동 선택이면 workflow tier에 선언된 effort를, 모델만 직접 지정했으면 해당 하위 에이전트 호출의 기본 effort를 사용합니다.'
  },
  workflow_mode: { title: '워크플로 모드' }
};

/**
 * Which `*_review_model` key gates each `*_review_effort` key (mqcj §4.4).
 *
 * @type {Record<string, string>}
 */
const REVIEW_EFFORT_PAIR = {
  spec_review_effort: 'spec_review_model',
  impl_review_effort: 'impl_review_model',
  plan_review_effort: 'plan_review_model'
};

/**
 * Review-model values that dispatch no separate leg, so there is no effort to
 * choose: `self` runs inside the session and `skip` runs nothing at all.
 */
const EFFORT_GATING_MODELS = ['self', 'skip'];

/** Mirror of policy.js ORCHESTRATION_MODEL_FALLBACK — what runs when nothing is set. */
const ORCHESTRATION_MODEL_FALLBACK = 'opus';

/**
 * `(기본)` labels for each exec key = what actually runs when NEITHER the bead
 * NOR the workspace-global exec_defaults set the key (the final fallback layer:
 * hardcoded / CLI / workflow default). Used verbatim by the ⚙ global dialog (it
 * edits the global layer, so its `(기본)` IS this fallback), and as the
 * detail-panel fallback when no global override exists (spec §3).
 *
 * MIRROR: keep in sync with the resolution fallbacks —
 *   - orchestration_model: hardcoded `opus` (policy.js
 *     ORCHESTRATION_MODEL_FALLBACK), so `--model opus` is always passed.
 *   - orchestration_effort: no effort flag passed ⇒ the runner CLI's own default
 *     (buildArgv omits the flag when unset).
 *   - `*_review_model`: session workflow gate default `codex` for all three
 *     steps.
 *   - `*_review_effort`: the workflow preset for that step.
 *   - impl_model: workflow delegation tier auto (complex=opus / boundary=sonnet).
 *   - impl_effort: whatever the chosen leaf tier defaults to.
 *
 * @type {Record<string, string>}
 */
export const DEFAULT_LABELS = {
  orchestration_model: '(기본: opus)',
  orchestration_effort: '(기본: CLI 기본)',
  spec_review_model: '(기본: codex)',
  spec_review_effort: '(기본: 프리셋)',
  impl_review_model: '(기본: codex)',
  impl_review_effort: '(기본: 프리셋)',
  impl_runtime: '(기본: orchestration runtime 상속)',
  plan_review_model: '(기본: codex)',
  plan_review_effort: '(기본: 프리셋)',
  impl_model: '(기본: 작업 성격에 따라 구현 모델 자동 선택)',
  impl_effort: '(기본: 선택된 구현 에이전트의 reasoning effort 사용)'
};

/**
 * Shared semantic label for an execution-setting row.
 *
 * @param {string} key
 * @returns {TemplateResult}
 */
export function execSettingLabelTemplate(key) {
  const presentation = EXEC_SETTING_PRESENTATION[key] || { title: key };
  return html`<span data-exec-setting-label>
    <span data-exec-setting-title>${presentation.title}</span>
    <code data-exec-setting-key>${key}</code>
    ${presentation.help
      ? html`<small data-exec-setting-help=${key}>${presentation.help}</small>`
      : ''}
  </span>`;
}

/**
 * The `(기본)` option label for a key on the detail-panel (bead) surface: a bead
 * left unset falls through to the workspace-global exec_defaults FIRST, so when a
 * global override exists show it (`(기본: <값> — 전역)`); otherwise the static
 * final-fallback label (spec §3.2).
 *
 * @param {string} key
 * @param {Record<string, any>} globals - Workspace preset settings.
 * @param {string} [source_name] - Selected workspace preset name.
 * @returns {string}
 */
export function defaultLabelFor(key, globals, source_name = '') {
  const g = globals && globals[key];
  if (typeof g === 'string' && g.length > 0) {
    return `(기본: ${g} — ${source_name || '워크스페이스 프리셋'})`;
  }
  return DEFAULT_LABELS[key] || '(기본)';
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * The snapshot catalog's runners as ordered `[name, entry]` pairs, or null when
 * the decoration is absent or unreadable. Null is the FAIL-QUIET signal: the
 * caller shows the stored value alone rather than an empty selector, because a
 * server that could not resolve the catalog has told us nothing about which
 * models exist — not that none do.
 *
 * @param {any} runner_catalog
 * @returns {[string, any][] | null}
 */
function catalogRunners(runner_catalog) {
  if (!isRecord(runner_catalog) || !isRecord(runner_catalog.runners)) {
    return null;
  }
  const pairs = Object.entries(runner_catalog.runners).filter(
    ([, entry]) => isRecord(entry) && isRecord(entry.models)
  );
  return pairs.length > 0 ? pairs : null;
}

/**
 * @param {string} value
 * @returns {SelectOption}
 */
function plainOption(value) {
  return { value, label: value };
}

/**
 * A stored value that is not in the current vocabulary renders as its OWN
 * selected `(비호환)` option — never hidden behind `(기본)`. That both surfaces
 * the real saved state and keeps `(기본)` a live target: selecting it fires a
 * change that unsets.
 *
 * @param {string} selected
 * @returns {SelectGroup}
 */
function incompatibleGroup(selected) {
  return {
    label: null,
    options: [{ value: selected, label: `${selected} (비호환)` }]
  };
}

/**
 * Grouped options for a catalog-driven MODEL selector: one `<optgroup>` per
 * runner, so a globally-unique model name still shows which runner will spawn
 * it. Without a catalog the stored value stands alone and unjudged — we cannot
 * call it incompatible with a table we never received.
 *
 * @param {any} runner_catalog
 * @param {string} selected
 * @param {string|null} [runner_filter]
 * @returns {SelectGroup[]}
 */
export function modelGroups(runner_catalog, selected, runner_filter = null) {
  const runners = catalogRunners(runner_catalog);
  if (!runners) {
    return selected ? [{ label: null, options: [plainOption(selected)] }] : [];
  }
  const groups = runners
    .filter(([name]) => runner_filter === null || name === runner_filter)
    .map(([name, entry]) => ({
      label: name,
      options: Object.keys(entry.models).map(plainOption)
    }));
  const known = groups.some((g) => g.options.some((o) => o.value === selected));
  return selected && !known ? [incompatibleGroup(selected), ...groups] : groups;
}

/**
 * Ungrouped options for a fixed vocabulary, with the same `(비호환)` rule.
 *
 * @param {ReadonlyArray<string>} values
 * @param {string} selected
 * @returns {SelectGroup[]}
 */
export function valueGroups(values, selected) {
  const group = { label: null, options: values.map(plainOption) };
  return selected && !values.includes(selected)
    ? [incompatibleGroup(selected), group]
    : [group];
}

/**
 * The runner that owns `model` per the snapshot catalog, or null.
 *
 * @param {any} runner_catalog
 * @param {string} model
 * @returns {string|null}
 */
export function modelRunnerOf(runner_catalog, model) {
  const runners = catalogRunners(runner_catalog);
  if (!runners || !model) {
    return null;
  }
  for (const [name, entry] of runners) {
    if (Object.hasOwn(entry.models, model)) {
      return name;
    }
  }
  return null;
}

/**
 * @param {any} entry - A catalog runner entry.
 * @param {any} model_entry
 * @returns {string[]}
 */
function effortsOf(entry, model_entry) {
  if (isRecord(model_entry) && Array.isArray(model_entry.efforts)) {
    return model_entry.efforts.slice();
  }
  return Array.isArray(entry.efforts) ? entry.efforts.slice() : [];
}

/**
 * Effort vocabulary `model` accepts: its own list when it pins one, else the
 * owning runner's. An unknown model (or an absent catalog) has none.
 *
 * @param {any} runner_catalog
 * @param {string} model
 * @returns {string[]}
 */
export function effortsForModel(runner_catalog, model) {
  const runners = catalogRunners(runner_catalog);
  if (!runners || !model) {
    return [];
  }
  for (const [, entry] of runners) {
    if (Object.hasOwn(entry.models, model)) {
      return effortsOf(entry, entry.models[model]);
    }
  }
  return [];
}

/**
 * Every effort level ANY catalog model accepts — the vocabulary for a setting
 * whose model is not yet chosen (`impl_effort` names a delegation leaf the
 * session picks later).
 *
 * @param {any} runner_catalog
 * @returns {string[]}
 */
export function catalogEffortUnion(runner_catalog) {
  const runners = catalogRunners(runner_catalog);
  if (!runners) {
    return [];
  }
  /** @type {string[]} */
  const out = [];
  for (const [, entry] of runners) {
    for (const model_entry of Object.values(entry.models)) {
      for (const effort of effortsOf(entry, model_entry)) {
        if (!out.includes(effort)) {
          out.push(effort);
        }
      }
    }
  }
  return out;
}

/**
 * Every effort level accepted by at least one model of one implementation
 * runtime. This is the legal auto-model vocabulary: when no exact model is
 * selected, the runtime still narrows what an explicit effort can mean.
 *
 * @param {any} runner_catalog
 * @param {string|null} runtime
 * @returns {string[]}
 */
export function runtimeEffortUnion(runner_catalog, runtime) {
  if (!runtime) {
    return catalogEffortUnion(runner_catalog);
  }
  const runners = catalogRunners(runner_catalog);
  const entry = runners?.find(([name]) => name === runtime)?.[1];
  if (!entry) {
    return [];
  }
  /** @type {string[]} */
  const efforts = [];
  for (const model of Object.keys(entry.models)) {
    for (const effort of effortsForModel(runner_catalog, model)) {
      if (!efforts.includes(effort)) {
        efforts.push(effort);
      }
    }
  }
  return efforts;
}

/**
 * Normalize the three coupled implementation settings after an editor change.
 * An inherited runtime has the resolved orchestration provider when known;
 * therefore an exact model survives an `inherit` change exactly when that
 * provider owns it. A model left on auto still constrains effort to the
 * provider-wide union.
 *
 * @param {{ impl_runtime: string, impl_model: string, impl_effort: string }} target
 * @param {any} runner_catalog
 * @param {string|null} controller_runtime - `null` means an inherited runtime
 * has no known controller provider in this editing context.
 * @returns {{ impl_runtime: string, impl_model: string, impl_effort: string }}
 */
export function normalizeImplTarget(
  target,
  runner_catalog,
  controller_runtime
) {
  const normalized = {
    impl_runtime: target.impl_runtime || '',
    impl_model: target.impl_model || '',
    impl_effort: target.impl_effort || ''
  };
  const effective_runtime =
    normalized.impl_runtime === 'inherit'
      ? controller_runtime
      : normalized.impl_runtime === 'claude' ||
          normalized.impl_runtime === 'codex'
        ? normalized.impl_runtime
        : null;
  if (normalized.impl_runtime === 'inherit' && !effective_runtime) {
    normalized.impl_model = '';
    normalized.impl_effort = '';
    return normalized;
  }
  const model_runtime = modelRunnerOf(runner_catalog, normalized.impl_model);
  if (
    normalized.impl_model &&
    (!effective_runtime || model_runtime !== effective_runtime)
  ) {
    normalized.impl_model = '';
    normalized.impl_effort = '';
    return normalized;
  }
  const allowed_efforts = normalized.impl_model
    ? effortsForModel(runner_catalog, normalized.impl_model)
    : runtimeEffortUnion(runner_catalog, effective_runtime);
  if (
    normalized.impl_effort &&
    allowed_efforts.length > 0 &&
    !allowed_efforts.includes(normalized.impl_effort)
  ) {
    normalized.impl_effort = '';
  }
  return normalized;
}

/**
 * Build the option model for all 11 exec rows — the SINGLE implementation both
 * the per-bead detail panel and the ⚙ global dialog render, so the two surfaces
 * cannot drift on grouping, effort narrowing or the self/skip gate.
 *
 * The two callbacks are deliberately separate. `selectedOf` is what THIS surface
 * stores (bead metadata / exec_defaults) and decides which option is selected —
 * an unset key must keep `(기본)` selected. `effectiveOf` is what would actually
 * apply (bead > global on the detail panel, the global alone in the dialog) and
 * decides the derived vocabulary and the gate, because those follow the value in
 * force, not the value this one layer happens to hold.
 *
 * @param {{
 *   selectedOf: (key: string) => string,
 *   effectiveOf: (key: string) => string,
 *   runner_catalog: any,
 *   controller_runtime?: string|null
 * }} input
 * @returns {ExecRow[]}
 */
export function execSettingRows(input) {
  const { selectedOf, effectiveOf, runner_catalog, controller_runtime } = input;
  const orchestration_model =
    effectiveOf('orchestration_model') || ORCHESTRATION_MODEL_FALLBACK;
  const impl_model = effectiveOf('impl_model');
  const requested_runtime = effectiveOf('impl_runtime');
  const impl_runtime =
    requested_runtime === 'claude' || requested_runtime === 'codex'
      ? requested_runtime
      : requested_runtime === 'inherit'
        ? controller_runtime === undefined
          ? modelRunnerOf(runner_catalog, orchestration_model)
          : controller_runtime
        : null;

  return EXEC_KEYS.map((key) => {
    const selected = selectedOf(key);
    /** @type {SelectGroup[]} */
    let groups;
    let disabled = false;
    if (key === 'orchestration_model') {
      groups = modelGroups(runner_catalog, selected);
    } else if (key === 'impl_runtime') {
      groups = valueGroups(['inherit', 'claude', 'codex'], selected);
    } else if (key === 'impl_model') {
      groups = impl_runtime
        ? modelGroups(runner_catalog, selected, impl_runtime)
        : selected
          ? [incompatibleGroup(selected)]
          : [];
      disabled = requested_runtime === 'inherit' && impl_runtime === null;
    } else if (key === 'orchestration_effort') {
      groups = valueGroups(
        effortsForModel(runner_catalog, orchestration_model),
        selected
      );
    } else if (key === 'impl_effort') {
      groups = valueGroups(
        impl_model
          ? effortsForModel(runner_catalog, impl_model)
          : impl_runtime
            ? runtimeEffortUnion(runner_catalog, impl_runtime)
            : catalogEffortUnion(runner_catalog),
        selected
      );
      disabled = requested_runtime === 'inherit' && impl_runtime === null;
    } else if (key === 'plan_review_model') {
      groups = valueGroups(PLAN_REVIEW_MODELS, selected);
    } else if (Object.hasOwn(REVIEW_EFFORT_PAIR, key)) {
      groups = valueGroups(REVIEW_EFFORTS, selected);
      disabled = EFFORT_GATING_MODELS.includes(
        effectiveOf(REVIEW_EFFORT_PAIR[key])
      );
    } else {
      groups = valueGroups(REVIEW_STEP_MODELS, selected);
    }
    return {
      key,
      groups,
      selected,
      disabled,
      runner:
        key === 'orchestration_model'
          ? modelRunnerOf(runner_catalog, orchestration_model)
          : null
    };
  });
}

/**
 * The `<option>`/`<optgroup>` children of one exec `<select>`.
 *
 * @param {SelectGroup[]} groups
 * @param {string} selected
 * @param {string} [default_label] - Label for the leading unset option; omit for none.
 * @returns {TemplateResult}
 */
export function selectOptionsTemplate(groups, selected, default_label) {
  return html`
    ${typeof default_label === 'string'
      ? html`<option value="" ?selected=${!selected}>${default_label}</option>`
      : ''}
    ${groups.map((group) =>
      group.label === null
        ? group.options.map((opt) => optionTemplate(opt, selected))
        : html`<optgroup label=${group.label}>
            ${group.options.map((opt) => optionTemplate(opt, selected))}
          </optgroup>`
    )}
  `;
}

/**
 * @param {SelectOption} opt
 * @param {string} selected
 * @returns {TemplateResult}
 */
function optionTemplate(opt, selected) {
  return html`<option value=${opt.value} ?selected=${opt.value === selected}>
    ${opt.label}
  </option>`;
}

/**
 * @typedef {Object} ExecSettingsHandlers
 * @property {(key: string, value: string) => void} onChange
 * @property {(key: string, value: string) => void} [onImplTargetChange]
 */

/**
 * Build one labelled `<select>` row (detail-panel.html `.kv`).
 *
 * @param {string} key
 * @param {TemplateResult} options - The row's option children.
 * @param {string} selected
 * @param {boolean} highlight
 * @param {boolean} disabled
 * @param {string|null} runner - Derived runner badge, when the row has one.
 * @param {ExecSettingsHandlers} handlers
 * @returns {TemplateResult}
 */
function selectRow(
  key,
  options,
  selected,
  highlight,
  disabled,
  runner,
  handlers
) {
  return html`
    <div class="detail-kv">
      <span class="detail-kv__k">${execSettingLabelTemplate(key)}</span>
      <span class="detail-kv__vgroup">
        <select
          class=${highlight ? 'detail-kv__v detail-kv__v--sel' : 'detail-kv__v'}
          aria-label=${key}
          data-key=${key}
          ?disabled=${disabled}
          @change=${(/** @type {Event} */ ev) =>
            (key === 'impl_runtime' ||
              key === 'impl_model' ||
              key === 'impl_effort') &&
            handlers.onImplTargetChange
              ? handlers.onImplTargetChange(
                  key,
                  /** @type {HTMLSelectElement} */ (ev.target).value
                )
              : handlers.onChange(
                  key,
                  /** @type {HTMLSelectElement} */ (ev.target).value
                )}
        >
          ${options}
        </select>
        ${runner
          ? html`<span class="detail-kv__note" data-runner-for=${key}
              >${runner}</span
            >`
          : ''}
      </span>
    </div>
  `;
}

/**
 * Execution-settings editor (detail-panel.html "실행 설정"): the 11 exec keys +
 * workflow_mode. Selecting `standard` for workflow_mode (or `(기본)` for a key)
 * records an unset — the server mutation removes the metadata key.
 *
 * @param {{ metadata?: Record<string, any> }} effective_issue - Issue whose `metadata` carries the effective (metadata + in-flight edits) values.
 * @param {ExecSettingsHandlers} handlers
 * @param {Record<string, any>} [exec_defaults] - Selected workspace preset settings
 * (queue snapshot). A bead-unset key resolves through these first, so they drive
 * the `(기본)` label (§3.2) and the derived vocabularies.
 * @param {any} [runner_catalog] - The snapshot's `runner_catalog` decoration.
 * @param {string} [default_source] - Selected workspace preset name.
 * Null/absent degrades the model selectors to the stored value (fail-quiet).
 * @returns {TemplateResult}
 */
export function execSettingsTemplate(
  effective_issue,
  handlers,
  exec_defaults,
  runner_catalog,
  default_source = ''
) {
  const md = (effective_issue && effective_issue.metadata) || {};
  const globals =
    exec_defaults && typeof exec_defaults === 'object' ? exec_defaults : {};
  /** @param {string} key */
  const selectedOf = (key) => (typeof md[key] === 'string' ? md[key] : '');
  /** @param {string} key */
  const effectiveOf = (key) => {
    const own = selectedOf(key);
    if (own) {
      return own;
    }
    return typeof globals[key] === 'string' ? globals[key] : '';
  };
  const rows = execSettingRows({ selectedOf, effectiveOf, runner_catalog });
  const wf_mode = md.workflow_mode === 'fast_track' ? 'fast_track' : 'standard';

  return html`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${rows.map((row) =>
      selectRow(
        row.key,
        selectOptionsTemplate(
          row.groups,
          row.selected,
          defaultLabelFor(row.key, globals, default_source)
        ),
        row.selected,
        false,
        row.disabled,
        row.runner,
        handlers
      )
    )}
    ${selectRow(
      'workflow_mode',
      selectOptionsTemplate(valueGroups(WORKFLOW_MODES, wf_mode), wf_mode),
      wf_mode,
      md.workflow_mode === 'fast_track',
      false,
      null,
      handlers
    )}
  `;
}
