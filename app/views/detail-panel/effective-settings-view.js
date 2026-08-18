/**
 * Issue-detail rendering for the summary header and the effective-settings card
 * (spec §E).
 *
 * The card's signature element is the LAYER RAIL: three notches per row, one
 * per resolution layer, with the notch that actually supplies the value lit.
 * The badge beside it names the same layer in words. A `기본` row lights the
 * bottom notch and shows NO value — the harness default is dotfiles-owned and
 * is never copied here.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {import('./effective-settings.js').EffectiveRow} EffectiveRow
 */
import { html } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import { formatPlannedExecution } from '../board/card.js';
import {
  AUTO_LITERAL,
  IMPL_DISPATCHES,
  IMPL_RUNTIMES,
  IMPL_SPEEDS,
  PLAN_REVIEW_MODELS,
  REVIEW_EFFORTS,
  REVIEW_STEP_MODELS,
  WORKFLOW_MODES,
  implEffortOptions,
  implModelOptions,
  orchestrationModelOptions
} from '../settings-dialog/session-model.js';
import {
  EFFECTIVE_GROUPS,
  SETTING_LABELS,
  SOURCE_LABELS,
  effectiveRows,
  layerSummary
} from './effective-settings.js';

/** The five gate stages the stepper walks, in workflow order. */
const GATE_STAGES = [
  { id: 'spec', label: 'spec 리뷰', receipt: 'spec_review' },
  { id: 'impl', label: '구현', receipt: null },
  { id: 'impl_review', label: 'impl 리뷰', receipt: 'impl_review' },
  { id: 'pr', label: 'PR', receipt: null }
];

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
 * @param {{ expanded: boolean, options: ReadonlyArray<string>, onEdit: (key: string, value: string|null) => void }} view
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
      >${row.value ?? '(harness 기본)'}</span
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
          @change=${(/** @type {Event} */ ev) => {
            const next = String(
              /** @type {HTMLSelectElement} */ (ev.target).value
            );
            view.onEdit(row.key, next.length === 0 ? null : next);
          }}
        >
          <option value="" ?selected=${row.source !== 'pin'}>(기본)</option>
          ${view.options.map(
            (option) =>
              html`<option
                value=${option}
                ?selected=${row.source === 'pin' && row.value === option}
              >
                ${option === AUTO_LITERAL ? '자동' : option}
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
 *   workspace_values: Record<string, unknown>,
 *   catalog: any,
 *   expanded: boolean,
 *   presets: any[],
 *   preset_id: string,
 *   preset_busy: boolean
 * }} model
 * @param {{
 *   onToggle: () => void,
 *   onEdit: (key: string, value: string|null) => void,
 *   onPresetSelect: (id: string) => void,
 *   onPresetApply: () => void
 * }} handlers
 * @returns {TemplateResult}
 */
export function effectiveSettingsCardTemplate(model, handlers) {
  const all_keys = EFFECTIVE_GROUPS.flatMap((group) => group.keys);
  const counts = layerSummary(all_keys, model.metadata, model.workspace_values);
  /** @type {Record<string, unknown>} */
  const effective = {};
  for (const row of effectiveRows(
    all_keys,
    model.metadata,
    model.workspace_values
  )) {
    if (row.value !== null) {
      effective[row.key] = row.value;
    }
  }
  return html`<section
    class=${`detail-effective${model.expanded ? ' detail-effective--open' : ''}`}
    data-seam="effective-settings"
  >
    <button
      type="button"
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      aria-expanded=${model.expanded ? 'true' : 'false'}
      @click=${handlers.onToggle}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary">${summaryLine(effective)}</span>
      <span class="detail-effective__counts">
        <span class="detail-effective__count detail-effective__count--pin"
          >핀 ${counts.pin}</span
        >
        <span class="detail-effective__count detail-effective__count--global"
          >전역 ${counts.global}</span
        >
      </span>
      <span class="detail-effective__chev">▸</span>
    </button>
    <div class="detail-effective__body">
      ${EFFECTIVE_GROUPS.map(
        (group) => html`
          <div class="detail-effective__subhead">${group.label}</div>
          ${effectiveRows(
            group.keys,
            model.metadata,
            model.workspace_values
          ).map((row) =>
            rowTemplate(row, {
              expanded: model.expanded,
              options: optionsForKey(row.key, effective, model.catalog),
              onEdit: handlers.onEdit
            })
          )}
        `
      )}
      <div class="detail-effective__foot">
        <select
          data-impl-preset-select
          aria-label="구현 프리셋"
          .value=${live(model.preset_id)}
          ?disabled=${model.preset_busy}
          @change=${(/** @type {Event} */ ev) =>
            handlers.onPresetSelect(
              String(/** @type {HTMLSelectElement} */ (ev.target).value)
            )}
        >
          <option value="" ?selected=${model.preset_id === ''}>
            구현 프리셋…
          </option>
          ${model.presets.map(
            (preset) =>
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
          @click=${handlers.onPresetApply}
        >
          이 이슈에 적용
        </button>
        <span class="detail-effective__hint">구현 키 5개를 핀으로 기록</span>
      </div>
    </div>
  </section>`;
}

/**
 * The card's one-line synthesis: the values a reader checks first.
 *
 * @param {Record<string, unknown>} effective
 * @returns {string}
 */
export function summaryLine(effective) {
  // Only pin/kv-confirmed values appear: naming a concrete fallback here would
  // duplicate a harness default into this repo (spec 비-목표). An unresolved
  // key reads `기본` — the value itself lives in the dotfiles contract.
  /** @type {string[]} */
  const parts = [];
  if (typeof effective.workflow_mode === 'string') {
    parts.push(String(effective.workflow_mode));
  }
  if (effective.impl_dispatch === 'main') {
    parts.push('메인');
  } else if (effective.impl_dispatch === 'delegated') {
    const target =
      typeof effective.impl_runtime === 'string'
        ? ` ${effective.impl_runtime}`
        : '';
    parts.push(`위임${target}`);
  } else if (typeof effective.impl_runtime === 'string') {
    parts.push(`위임 ${effective.impl_runtime}`);
  }
  if (typeof effective.impl_model === 'string') {
    parts.push(String(effective.impl_model));
  }
  return parts.length > 0 ? parts.join(' · ') : '기본';
}

/**
 * The summary header: status, route, the gate stepper with receipt binding, the
 * PR link, and the `exec_receipt` chip. Display-only — the gate receipts have
 * no editing surface by design (spec 비-목표).
 *
 * @param {any} data - The bd issue payload.
 * @returns {TemplateResult}
 */
export function summaryHeaderTemplate(data) {
  const metadata =
    data && typeof data.metadata === 'object' && data.metadata
      ? data.metadata
      : {};
  const workflow =
    data && typeof data.workflow === 'object' && data.workflow
      ? data.workflow
      : {};
  const stages = workflow.stages || {};
  const route = workflow.route || metadata.route || null;
  const pr_url = typeof metadata.pr_url === 'string' ? metadata.pr_url : '';
  const receipt =
    typeof metadata.exec_receipt === 'string' ? metadata.exec_receipt : '';
  const planned_execution = formatPlannedExecution(
    workflow.planned_execution,
    workflow.exec_receipt
  );
  return html`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${data?.status || '—'}</span
      >
      ${route
        ? html`<span class="detail-summary__chip detail-summary__chip--route"
            >${route}</span
          >`
        : ''}
      ${metadata.workflow_mode === 'fast_track'
        ? html`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`
        : ''}
      ${pr_url
        ? html`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${pr_url}
            target="_blank"
            rel="noreferrer"
            >PR</a
          >`
        : ''}
      ${planned_execution
        ? html`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${planned_execution.kind}
            title=${planned_execution.title}
            >${planned_execution.label}</span
          >`
        : ''}
      ${receipt
        ? html`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${receipt}
            >${receipt.split('@')[0]}</span
          >`
        : ''}
    </div>
    <div class="detail-summary__gates">
      ${GATE_STAGES.map((stage) => {
        const receipt_value =
          stage.receipt && typeof metadata[stage.receipt] === 'string'
            ? String(metadata[stage.receipt])
            : '';
        const stage_state = stages[stage.id];
        // The server's stage decoration speaks `fill`: 'full' is a completed
        // stage, 'dim' an in-progress one (workflow-enrich chips vocabulary).
        const on = receipt_value.length > 0 || stage_state?.fill === 'full';
        const current = !on && stage_state?.fill === 'dim';
        const stale = stage_state?.stale === true;
        return html`<span
          class=${`detail-summary__gate${on ? ' detail-summary__gate--on' : ''}${current ? ' detail-summary__gate--current' : ''}${stale ? ' detail-summary__gate--stale' : ''}`}
          data-gate=${stage.id}
        >
          <span class="detail-summary__gate-pill">${stage.label}</span>
          ${receipt_value
            ? html`<span class="detail-summary__gate-sha"
                >${receipt_value.split('@')[1]?.slice(0, 7) || ''}</span
              >`
            : ''}
        </span>`;
      })}
    </div>
  </section>`;
}
