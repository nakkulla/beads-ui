/**
 * Issue-detail rendering of the effective-settings card (spec §E); the summary
 * header's chips and gates live in `summary-header.js`.
 *
 * The card's signature element is the LAYER RAIL: three notches per row, one
 * per resolution layer, with the notch that actually supplies the value lit.
 * The badge beside it names the same layer in words. A `기본` row lights the
 * bottom notch and shows NO value — the harness default is dotfiles-owned and
 * is never copied here.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {import('../../model/effective-settings.js').EffectiveRow} EffectiveRow
 */
import { html } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import {
  EFFECTIVE_GROUPS,
  SETTING_LABELS,
  SOURCE_LABELS,
  effectiveRows,
  layerSummary,
  presetDeviation
} from '../../model/effective-settings.js';
import { visibleChoicesForKey } from '../../model/model-visibility.js';
import {
  APPLIED_EXEC_PRESET_KEY,
  AUTO_LITERAL,
  IMPL_DISPATCHES,
  IMPL_RUNTIMES,
  IMPL_SPEEDS,
  ORCHESTRATION_KEYS,
  PLAN_REVIEW_MODELS,
  REVIEW_EFFORTS,
  REVIEW_STEP_MODELS,
  WORKFLOW_MODES,
  implEffortOptions,
  implModelOptions,
  normalizeAppliesTo,
  orchestrationModelOptions,
  speedVisible
} from '../../model/session-model.js';
import { buildOptionView } from '../../utils/execution-defaults.js';

/**
 * The gate stages the stepper walks, in workflow order.
 *
 * `fill_stage` names the server stage whose `fill` lights the gate;
 * `stale_stage` names the one whose freshness flags it. They diverge across the
 * two impl gates because the server folds implementation and its review into a
 * single `impl` stage: the fill says work happened, but the stale axis is a
 * property of the review receipt, so it belongs on `impl 리뷰`.
 *
 * `hue` is the board stepper's stage color, so both surfaces speak one palette.
 * Implementation and its review share violet on purpose — they are two gates
 * over one delta.
 */
export const GATE_STAGES = [
  {
    id: 'spec',
    label: 'spec 리뷰',
    receipt: 'spec_review',
    receipt_stage: null,
    fill_stage: 'spec',
    stale_stage: 'spec',
    hue: 'spec'
  },
  {
    id: 'plan',
    label: '계획 리뷰',
    // The plan receipt's own metadata key forks across the contract's legacy
    // shapes (`plan_review` vs `plan_check`). The server already resolved which
    // one applies, so read its answer instead of re-deriving the fork here.
    receipt: null,
    receipt_stage: 'plan',
    fill_stage: 'plan',
    stale_stage: 'plan',
    hue: 'plan'
  },
  {
    id: 'impl',
    label: '구현',
    receipt: null,
    receipt_stage: null,
    fill_stage: 'impl',
    stale_stage: null,
    hue: 'impl'
  },
  {
    id: 'impl_review',
    label: 'impl 리뷰',
    receipt: 'impl_review',
    receipt_stage: null,
    fill_stage: null,
    stale_stage: 'impl',
    hue: 'impl'
  },
  {
    id: 'pr',
    label: 'PR',
    receipt: null,
    receipt_stage: null,
    fill_stage: 'pr',
    stale_stage: null,
    hue: 'pr'
  }
];

/**
 * Route → the gates that route actually walks, mirroring which stages the
 * server builds for it. A `quick_fix` carries no spec document and lands by
 * pushing the base ref with no PR at all (workflow contract, Finish), so those
 * gates are not "not yet" for it — they never come, and drawing them as pending
 * misreports the route. Only `full_plan` has a plan to review, which is exactly
 * when the server sends a `plan` stage. Anything else falls back to the
 * spec-backed set, matching the server's own `deriveRoute` default.
 */
const ROUTE_GATES = {
  quick_fix: ['impl', 'impl_review'],
  spec_backed: ['spec', 'impl', 'impl_review', 'pr'],
  full_plan: ['spec', 'plan', 'impl', 'impl_review', 'pr']
};

/** Layer → rail modifier class. */
const RAIL_CLASS = { pin: 'pin', global: 'global', base: 'base' };

/**
 * The three-notch resolution rail for one row.
 *
 * @param {'pin'|'global'|'base'} source
 * @returns {TemplateResult}
 */
export function layerRailTemplate(source) {
  return html`<span
    class=${`detail-layer-rail detail-layer-rail--${RAIL_CLASS[source]}`}
    data-source=${source}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`;
}

/**
 * Option list for one editable key.
 *
 * @param {string} key
 * @param {Record<string, unknown>} effective
 * @param {any} catalog
 * @returns {ReadonlyArray<string>}
 */
export function optionsForKey(key, effective, catalog) {
  switch (key) {
    case 'workflow_mode':
      return WORKFLOW_MODES;
    case 'spec_review_model':
    case 'impl_review_model':
      return REVIEW_STEP_MODELS;
    case 'plan_review_model':
      return PLAN_REVIEW_MODELS;
    case 'spec_review_effort':
    case 'plan_review_effort':
    case 'impl_review_effort':
      return REVIEW_EFFORTS;
    case 'spec_review_speed':
    case 'plan_review_speed':
    case 'impl_review_speed':
      return IMPL_SPEEDS;
    case 'impl_dispatch':
      return IMPL_DISPATCHES;
    case 'impl_runtime':
      return IMPL_RUNTIMES;
    case 'impl_model':
      return implModelOptions(
        catalog,
        /** @type {any} */ (effective.impl_runtime)
      );
    case 'impl_effort':
      return implEffortOptions(
        catalog,
        /** @type {any} */ (effective.impl_runtime),
        /** @type {any} */ (effective.impl_model)
      );
    case 'impl_speed':
    case 'orchestration_speed':
      return IMPL_SPEEDS;
    case 'orchestration_model':
      return orchestrationModelOptions(catalog, null);
    case 'orchestration_effort':
      return implEffortOptions(
        catalog,
        undefined,
        /** @type {any} */ (effective.orchestration_model) || AUTO_LITERAL
      ).filter((effort) => effort !== AUTO_LITERAL);
    default:
      return [];
  }
}

/**
 * One key row: rail, label, resolved value, source badge, and — while the card
 * is expanded — the three-state editor.
 *
 * @param {EffectiveRow} row
 * @param {{ expanded: boolean, options: ReadonlyArray<{ value: string, label: string, full_value: string|null }>, default_label: string, default_full_value: string|null, onEdit: (key: string, value: string|null) => void }} view
 * @returns {TemplateResult}
 */
function rowTemplate(row, view) {
  return html`<div class="detail-effective__row" data-key=${row.key}>
    ${layerRailTemplate(row.source)}
    <span class="detail-effective__k"
      >${SETTING_LABELS[row.key] || row.key}</span
    >
    <span
      class=${`detail-effective__v${row.source === 'base' ? ' detail-effective__v--dim' : ''}`}
      title=${row.full_value || ''}
      >${row.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${row.source}`}
      >${SOURCE_LABELS[row.source]}</span
    >
    ${view.expanded
      ? html`<select
          class="detail-effective__edit"
          data-edit-key=${row.key}
          aria-label=${`${SETTING_LABELS[row.key] || row.key} 편집`}
          ?disabled=${row.resolution === 'not_applicable'}
          @change=${(/** @type {Event} */ ev) => {
            const next = String(
              /** @type {HTMLSelectElement} */ (ev.target).value
            );
            view.onEdit(row.key, next.length === 0 ? null : next);
          }}
        >
          <option
            value=""
            title=${view.default_full_value || ''}
            ?selected=${row.source !== 'pin'}
          >
            ${view.default_label}
          </option>
          ${view.options.map(
            (option) =>
              html`<option
                value=${option.value}
                title=${option.full_value || ''}
                ?selected=${row.source === 'pin' && row.value === option.value}
              >
                ${option.label}
              </option>`
          )}
        </select>`
      : ''}
  </div>`;
}

/**
 * The effective-settings card: a one-line summary with per-layer counts, the
 * grouped rows, and the implementation-preset quick-apply.
 *
 * @param {{
 *   metadata: Record<string, unknown>,
 *   route?: string|null,
 *   workspace_values: Record<string, unknown>,
 *   catalog: any,
 *   execution_defaults: Record<string, any>|null,
 *   controller_runtime?: string|null,
 *   disabled_models?: ReadonlyArray<string>|null,
 *   expanded: boolean,
 *   presets: any[],
 *   presets_loaded: boolean,
 *   preset_id: string,
 *   preset_busy: boolean,
 * }} model
 * @param {{
 *   onToggle: (open: boolean) => void,
 *   onEdit: (key: string, value: string|null) => void,
 *   onPresetSelect: (id: string) => void,
 *   onPresetApply: () => void
 * }} handlers
 * @returns {TemplateResult}
 */
export function effectiveSettingsCardTemplate(model, handlers) {
  const route = model.route || model.metadata?.route;
  const gates = routeGates(route);
  // 이 이슈가 받을 수 있는 계열만 고를 수 있게 한다 (design §6.3). 서버는 어긋난
  // 적용을 `preset_route_mismatch`로 거부하므로, 목록을 좁히는 것이 그 거부를
  // 정상 경로에서 만나지 않게 하는 유일한 장치다.
  const issue_profile = normalizeAppliesTo(route);
  const presets = (model.presets || []).filter(
    (/** @type {any} */ preset) =>
      normalizeAppliesTo(preset && preset.applies_to) === issue_profile
  );
  // 목록이 아직 도착하지 않은 것과 이 계열이 비어 있는 것은 다른 사실이다:
  // 도착 전에는 아무 말도 하지 않는다 (fail-quiet).
  const preset_profile_empty =
    model.presets_loaded === true && presets.length === 0;
  const groups = EFFECTIVE_GROUPS.map((group) => ({
    ...group,
    keys: group.keys.filter((key) => {
      if (key.startsWith('spec_review_')) {
        return gates.some((gate) => gate.id === 'spec');
      }
      if (key.startsWith('plan_review_')) {
        return gates.some((gate) => gate.id === 'plan');
      }
      return true;
    })
  }));
  const all_keys = groups.flatMap((group) => group.keys);
  const resolved_rows = effectiveRows(
    all_keys,
    model.metadata,
    model.workspace_values,
    model.execution_defaults,
    model.catalog,
    model.controller_runtime || null
  );
  /** @type {Record<string, EffectiveRow>} */
  const resolved = Object.fromEntries(
    resolved_rows.map((row) => [row.key, row])
  );
  const rows = resolved_rows.filter((row) => {
    if (
      ['impl_runtime', 'impl_model', 'impl_effort', 'impl_speed'].includes(
        row.key
      ) &&
      resolved.impl_dispatch.value === 'main'
    ) {
      return false;
    }
    if (row.key === 'impl_speed') {
      return speedVisible(model.catalog, {
        runtime: resolved.impl_runtime.value,
        model: resolved.impl_model.value
      });
    }
    return true;
  });
  const counts = layerSummary(
    rows.map((row) => row.key),
    model.metadata,
    model.workspace_values,
    model.execution_defaults,
    model.catalog,
    model.controller_runtime || null
  );
  /** @type {Record<string, EffectiveRow>} */
  const effective = Object.fromEntries(rows.map((row) => [row.key, row]));
  /** @type {Record<string, unknown>} */
  const effective_values = Object.fromEntries(
    rows.filter((row) => row.value !== null).map((row) => [row.key, row.value])
  );
  const full_summary = rows
    .filter((row) => row.full_value && row.display !== row.full_value)
    .map((row) => row.full_value)
    .join(' · ');
  const summary_line = summaryLine(effective, {
    mode_in_metadata: model.metadata?.workflow_mode === 'fast_track'
  });
  return html`<details
    class=${`detail-effective${model.expanded ? ' detail-effective--open' : ''}`}
    data-seam="effective-settings"
    ?open=${model.expanded}
    @toggle=${(/** @type {Event} */ event) =>
      handlers.onToggle(
        /** @type {HTMLDetailsElement} */ (event.currentTarget).open
      )}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${(/** @type {Event} */ event) => {
        event.preventDefault();
        const details = /** @type {HTMLDetailsElement} */ (
          /** @type {HTMLElement} */ (event.currentTarget).parentElement
        );
        handlers.onToggle(!details.open);
      }}
    >
      <span class="detail-effective__t">이 이슈 실행 설정</span>
      ${presetTokenTemplate(model)}
      <span class="detail-effective__counts">
        <span class="detail-effective__count detail-effective__count--pin"
          >핀 ${counts.pin}</span
        >
        <span class="detail-effective__count detail-effective__count--global"
          >전역 ${counts.global}</span
        >
        <span class="detail-effective__count detail-effective__count--base"
          >기본 ${counts.base}</span
        >
      </span>
      <span class="detail-effective__chev">▸</span>
      ${summary_line === null
        ? ''
        : html`<span class="detail-effective__summary" title=${full_summary}
            >${summary_line}</span
          >`}
      <span
        class="detail-effective__preset"
        @click=${(/** @type {Event} */ event) => event.stopPropagation()}
      >
        <select
          data-impl-preset-select
          aria-label="실행 프리셋"
          title=${issue_profile === 'quick_fix'
            ? '오케스트레이션 3키와 구현 5키를 핀으로 기록'
            : '오케스트레이션 3키와 세션 14키를 핀으로 기록'}
          .value=${live(model.preset_id)}
          ?disabled=${model.preset_busy || preset_profile_empty}
          @click=${(/** @type {Event} */ event) => event.stopPropagation()}
          @keydown=${(/** @type {Event} */ event) => event.stopPropagation()}
          @change=${(/** @type {Event} */ ev) => {
            ev.stopPropagation();
            handlers.onPresetSelect(
              String(/** @type {HTMLSelectElement} */ (ev.target).value)
            );
          }}
        >
          <option value="" ?selected=${model.preset_id === ''}>
            ${preset_profile_empty
              ? '이 이슈에 쓸 프리셋이 없습니다'
              : '실행 프리셋…'}
          </option>
          ${presets.map(
            (/** @type {any} */ preset) =>
              html`<option
                value=${preset.id}
                ?selected=${preset.id === model.preset_id}
              >
                ${preset.name}${preset.compatible === false ? ' (비호환)' : ''}
              </option>`
          )}
        </select>
        <button
          type="button"
          data-apply-impl-preset
          ?disabled=${model.preset_id.length === 0 || model.preset_busy}
          @click=${(/** @type {Event} */ event) => {
            event.stopPropagation();
            handlers.onPresetApply();
          }}
          @keydown=${(/** @type {Event} */ event) => event.stopPropagation()}
        >
          이 이슈에 적용
        </button>
      </span>
    </summary>
    ${model.expanded
      ? html`<div class="detail-effective__body">
          ${groups.map(
            (group) => html`
              <div class="detail-effective__subhead">${group.label}</div>
              ${rows
                .filter((row) => group.keys.includes(row.key))
                .map((row) => {
                  const visible = visibleChoicesForKey(
                    row.key,
                    optionsForKey(row.key, effective_values, model.catalog),
                    model.disabled_models ?? null,
                    model.execution_defaults
                  );
                  const option_view = buildOptionView({
                    key: row.key,
                    choices: visible.choices,
                    hidden_choices: visible.hidden_choices,
                    layer: 'pin',
                    pin: model.metadata,
                    global: model.workspace_values,
                    execution_defaults: model.execution_defaults,
                    runner_catalog: model.catalog,
                    route:
                      typeof model.metadata?.route === 'string'
                        ? model.metadata.route
                        : null,
                    controller_runtime: model.controller_runtime || null
                  });
                  return rowTemplate(row, {
                    expanded: model.expanded,
                    options: option_view.options,
                    default_label: option_view.unset_label,
                    default_full_value: option_view.full_value,
                    onEdit: handlers.onEdit
                  });
                })}
            `
          )}
        </div>`
      : ''}
  </details>`;
}

/**
 * One role group's value tokens, in key order, skipping keys that resolved to
 * nothing a reader can act on.
 *
 * A speed of `default` is dropped HERE only: it means "nothing chosen", so in
 * the collapsed line it costs a token and says nothing, while the expanded
 * 속도 row keeps reporting it.
 *
 * @param {Record<string, EffectiveRow>} effective
 * @param {ReadonlyArray<string>} keys
 * @returns {string[]}
 */
function summaryTokens(effective, keys) {
  /** @type {string[]} */
  const tokens = [];
  for (const key of keys) {
    const row = effective[key];
    if (
      !row ||
      row.resolution === 'not_applicable' ||
      row.resolution === 'unavailable'
    ) {
      continue;
    }
    if (key.endsWith('_speed') && row.value === 'default') {
      continue;
    }
    tokens.push(row.display);
  }
  return tokens;
}

/**
 * The 워커 group's tokens. `impl_runtime` is not a token of its own — it is the
 * delegation target, so it reads as part of the 실행 방식 token.
 *
 * @param {Record<string, EffectiveRow>} effective
 * @returns {string[]}
 */
function workerTokens(effective) {
  /** @type {string[]} */
  const tokens = [];
  if (effective.impl_dispatch?.value === 'main') {
    tokens.push('메인');
  } else if (effective.impl_dispatch?.value === 'delegated') {
    const target = effective.impl_runtime
      ? ` ${effective.impl_runtime.display}`
      : '';
    tokens.push(`위임${target}`);
  }
  return [
    ...tokens,
    ...summaryTokens(effective, ['impl_model', 'impl_effort', 'impl_speed'])
  ];
}

/**
 * One role group of the collapsed value line: a dim role name and its tokens.
 *
 * @param {string} role
 * @param {string[]} tokens
 * @returns {TemplateResult}
 */
function roleGroupTemplate(role, tokens) {
  return html`<span class="detail-effective__grp"
    ><span class="detail-effective__role">${role}</span> ${tokens.join(
      ' · '
    )}</span
  >`;
}

/**
 * The card's collapsed value line: an 오케 group and a 워커 group. Tokens
 * inside a group join with `·`; the two groups are separated by WHITESPACE,
 * because one separator cannot carry two nesting levels and stay readable.
 *
 * `mode_in_metadata` suppresses the trailing mode token: the header chip
 * already draws a `fast_track` the bead pins itself, while a `fast_track`
 * inherited from the workspace appears nowhere else on the collapsed card.
 *
 * Returns null when neither group has material, so the card draws no line at
 * all (AGENTS.md fail-quiet).
 *
 * @param {Record<string, EffectiveRow>} effective
 * @param {{ mode_in_metadata?: boolean }} [options]
 * @returns {TemplateResult|null}
 */
export function summaryLine(effective, options = {}) {
  const orchestration = summaryTokens(effective, ORCHESTRATION_KEYS);
  const worker = workerTokens(effective);
  if (orchestration.length === 0 && worker.length === 0) {
    return null;
  }
  const mode =
    effective.workflow_mode?.value === 'fast_track' &&
    options.mode_in_metadata !== true
      ? effective.workflow_mode.display
      : '';
  return html`${orchestration.length > 0
    ? roleGroupTemplate('오케', orchestration)
    : ''}${worker.length > 0
    ? roleGroupTemplate('워커', worker)
    : ''}${mode.length > 0
    ? html`<span class="detail-effective__mode">${mode}</span>`
    : ''}`;
}

/**
 * The `n개 변경` tooltip: one deviated key per line, issue value first.
 *
 * @param {Array<{ key: string, actual: string|null, expected: string|null }>} entries
 * @returns {string}
 */
function deviationTitle(entries) {
  return entries
    .map((entry) => {
      const label = SETTING_LABELS[entry.key] || entry.key;
      const actual = entry.actual === null ? '없음' : entry.actual;
      const expected =
        entry.expected === null ? '프리셋 비움' : `프리셋 ${entry.expected}`;
      return `${label}: ${actual} (${expected})`;
    })
    .join('\n');
}

/**
 * The applied-preset token beside the card title: which preset these pins came
 * from, and how far the issue has drifted from it since.
 *
 * Three different facts share the same silent shape — the bead records no
 * preset, the preset list has NOT ARRIVED, and the deviation is not yet
 * decidable. An unarrived list is empty, so judging membership against it would
 * report a live preset as deleted; an undecided deviation is null for the same
 * reason, a missing runner catalog.
 *
 * @param {any} model
 * @returns {TemplateResult|''}
 */
function presetTokenTemplate(model) {
  const metadata = model.metadata || {};
  const applied_id =
    typeof metadata[APPLIED_EXEC_PRESET_KEY] === 'string'
      ? metadata[APPLIED_EXEC_PRESET_KEY]
      : '';
  if (applied_id.length === 0 || model.presets_loaded !== true) {
    return '';
  }
  const preset = (model.presets || []).find(
    (/** @type {any} */ entry) => entry && entry.id === applied_id
  );
  if (!preset) {
    return html`<span
      class="detail-effective__applied"
      data-applied-preset="missing"
      >프리셋 삭제됨</span
    >`;
  }
  const deviation = presetDeviation(
    metadata,
    preset,
    typeof metadata.route === 'string' ? metadata.route : null,
    model.catalog
  );
  if (deviation === null) {
    return '';
  }
  if (deviation.count === 0) {
    return html`<span class="detail-effective__applied" data-applied-preset="ok"
      >프리셋 ${preset.name}</span
    >`;
  }
  return html`<span
    class="detail-effective__applied"
    data-applied-preset="deviated"
    title=${deviationTitle(deviation.entries)}
    >프리셋 ${preset.name} · ${deviation.count}개 변경</span
  >`;
}

/**
 * The gates one route actually walks. An unknown or absent route falls back to
 * the spec-backed set, matching the server's default route.
 *
 * @param {unknown} route
 */
export function routeGates(route) {
  const ids =
    typeof route === 'string' &&
    Object.hasOwn(ROUTE_GATES, route) &&
    /** @type {Record<string, string[]>} */ (ROUTE_GATES)[route];
  const allowed = ids || ROUTE_GATES.spec_backed;
  return GATE_STAGES.filter((stage) => allowed.includes(stage.id));
}
