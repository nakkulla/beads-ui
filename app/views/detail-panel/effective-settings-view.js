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
 * @typedef {import('../board/card.js').ExecReceipt} ExecReceipt
 */
import { html } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import { buildOptionView } from '../../utils/execution-defaults.js';
import { formatExecReceipt, formatPlannedExecution } from '../board/card.js';
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
const GATE_STAGES = [
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

/**
 * `approval_state` → the words the plan gate's title adds. Native approval is a
 * second axis over the same cell: the server already folded it into `fill` and
 * `stale`, but only the title can say which of the two axes is unfinished.
 */
const PLAN_APPROVAL_TEXT = {
  missing: '승인 필요',
  stale: '재승인 필요',
  unknown: '승인 확인 불가'
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
 *   workspace_values: Record<string, unknown>,
 *   catalog: any,
 *   execution_defaults: Record<string, any>|null,
 *   controller_runtime?: string|null,
 *   expanded: boolean,
 *   presets: any[],
 *   preset_id: string,
 *   preset_busy: boolean,
 *   skipped_orchestration_keys?: string[]
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
  const all_keys = EFFECTIVE_GROUPS.flatMap((group) => group.keys);
  const rows = effectiveRows(
    all_keys,
    model.metadata,
    model.workspace_values,
    model.execution_defaults,
    model.catalog,
    model.controller_runtime || null
  );
  const counts = layerSummary(
    all_keys,
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
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${full_summary}
        >${summaryLine(effective)}</span
      >
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
    </summary>
    ${model.expanded
      ? html`<div class="detail-effective__body">
          ${EFFECTIVE_GROUPS.map(
            (group) => html`
              <div class="detail-effective__subhead">${group.label}</div>
              ${rows
                .filter((row) => group.keys.includes(row.key))
                .map((row) => {
                  const option_view = buildOptionView({
                    key: row.key,
                    choices: optionsForKey(
                      row.key,
                      effective_values,
                      model.catalog
                    ),
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
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${live(model.preset_id)}
              ?disabled=${model.preset_busy}
              @change=${(/** @type {Event} */ ev) =>
                handlers.onPresetSelect(
                  String(/** @type {HTMLSelectElement} */ (ev.target).value)
                )}
            >
              <option value="" ?selected=${model.preset_id === ''}>
                실행 프리셋…
              </option>
              ${model.presets.map(
                (preset) =>
                  html`<option
                    value=${preset.id}
                    ?selected=${preset.id === model.preset_id}
                  >
                    ${preset.name}${preset.compatible === false
                      ? ' (비호환)'
                      : ''}
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
            <span class="detail-effective__hint"
              >세션 키 12개를 핀으로 기록</span
            >
            ${(model.skipped_orchestration_keys || []).length > 0
              ? html`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`
              : ''}
          </div>
        </div>`
      : ''}
  </details>`;
}

/**
 * The card's one-line synthesis: the values a reader checks first.
 *
 * @param {Record<string, EffectiveRow>} effective
 * @returns {string}
 */
export function summaryLine(effective) {
  /** @type {string[]} */
  const parts = [];
  if (effective.workflow_mode) {
    parts.push(effective.workflow_mode.display);
  }
  if (effective.impl_dispatch?.value === 'main') {
    parts.push('메인');
  } else if (effective.impl_dispatch?.value === 'delegated') {
    const target = effective.impl_runtime
      ? ` ${effective.impl_runtime.display}`
      : '';
    parts.push(`위임${target}`);
  }
  for (const key of ['impl_model', 'impl_effort', 'impl_speed']) {
    if (effective[key]?.resolution !== 'not_applicable') {
      parts.push(effective[key]?.display || '기본값 확인 불가');
    }
  }
  return parts.join(' · ');
}

/**
 * Narrow an enriched `workflow.exec_receipt` to the shape the formatters need.
 * A payload without enrichment, or with a partial receipt, yields `null` so the
 * caller falls back to the raw metadata pin (AGENTS.md consumer fail-quiet).
 *
 * @param {any} value
 * @returns {ExecReceipt | null}
 */
function normalizeExecReceipt(value) {
  if (!value || typeof value !== 'object') {
    return null;
  }
  const { kind, actor, effort, sha } = value;
  if (
    typeof kind !== 'string' ||
    typeof actor !== 'string' ||
    typeof sha !== 'string'
  ) {
    return null;
  }
  return {
    kind,
    actor,
    effort: typeof effort === 'string' ? effort : null,
    sha
  };
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
  // The normalized receipt is what splits the delegated effort off the model,
  // so the chip can name it in its own token. Without enrichment the raw pin
  // still renders whole — a display-only surface never withholds what it has.
  const normalized_receipt = normalizeExecReceipt(workflow.exec_receipt);
  const receipt_title = normalized_receipt
    ? formatExecReceipt(normalized_receipt)
    : receipt;
  const receipt_label = normalized_receipt
    ? `${normalized_receipt.kind}:${normalized_receipt.actor}`
    : receipt.split('@')[0];
  const planned_execution = formatPlannedExecution(
    workflow.planned_execution,
    workflow.exec_receipt
  );
  // The board already names the PR by number from this same server-parsed
  // field; naming it the same way here keeps one PR from reading as two.
  const pr_number = workflow.chips?.pr?.number;
  const pr_label = typeof pr_number === 'number' ? `PR #${pr_number}` : 'PR';
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
            >${pr_label}</a
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
      ${receipt_title
        ? html`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${receipt_title}
            >${receipt_label}${normalized_receipt?.effort
              ? html`${' '}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${normalized_receipt.effort}</span
                  >`
              : ''}</span
          >`
        : ''}
    </div>
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${routeGates(route).map((stage) =>
        gateTemplate(stage, metadata, stages, {
          label: stage.id === 'pr' ? pr_label : stage.label,
          href: stage.id === 'pr' ? pr_url : ''
        })
      )}
    </div>
  </section>`;
}

/**
 * The gates one route actually walks. An unknown or absent route falls back to
 * the full set, so a display surface never hides a gate on a guess.
 *
 * @param {unknown} route
 */
function routeGates(route) {
  const ids =
    typeof route === 'string' &&
    Object.hasOwn(ROUTE_GATES, route) &&
    /** @type {Record<string, string[]>} */ (ROUTE_GATES)[route];
  const allowed = ids || ROUTE_GATES.spec_backed;
  return GATE_STAGES.filter((stage) => allowed.includes(stage.id));
}

/** Gate condition → the word the hover title uses for it. */
const GATE_STATE_TEXT = {
  on: '통과',
  stale: '재검토 필요',
  current: '진행 중',
  none: '미도달'
};

/**
 * One gate: label, rail, and — only where a review receipt exists — the short
 * commit it was stamped at. All three rows are reserved on every gate, so a
 * receipt-less gate cannot pull its own label out of line with its neighbours.
 *
 * @param {(typeof GATE_STAGES)[number]} stage
 * @param {Record<string, unknown>} metadata
 * @param {Record<string, any>} stages
 * @param {{ label: string, href: string }} view
 * @returns {TemplateResult}
 */
function gateTemplate(stage, metadata, stages, view) {
  const receipt_value = gateReceipt(stage, metadata, stages);
  // The server's stage decoration speaks `fill`: 'full' is a completed stage,
  // 'dim' an in-progress one (workflow-enrich chips vocabulary). Where it sent
  // one, it decides — a receipt alone must never light a gate the server held
  // back, because a plan whose review is stamped but whose approval is still
  // missing arrives here as exactly that: a receipt with a `dim` fill. Only a
  // gate the server said nothing about falls back to reading the receipt.
  const fill_state = stage.fill_stage ? stages[stage.fill_stage] : null;
  const server_fill =
    typeof fill_state?.fill === 'string' ? fill_state.fill : null;
  const on = server_fill ? server_fill === 'full' : receipt_value.length > 0;
  const current = !on && server_fill === 'dim';
  const stale = stage.stale_stage
    ? stages[stage.stale_stage]?.stale === true
    : false;
  const sha = receipt_value
    ? receipt_value.split('@')[1]?.slice(0, 7) || ''
    : '';
  const state_text = stale
    ? GATE_STATE_TEXT.stale
    : on
      ? GATE_STATE_TEXT.on
      : current
        ? GATE_STATE_TEXT.current
        : GATE_STATE_TEXT.none;
  const approval_text = planApprovalText(stage, stages);
  // The rail shows seven characters; the title is where the whole receipt stays
  // reachable, since the gates carry no editing or drill-down surface.
  const title = `${view.label} · ${state_text}${approval_text ? ` · ${approval_text}` : ''}${receipt_value ? ` · ${receipt_value}` : ''}`;
  const gate_class = `detail-summary__gate${on ? ' detail-summary__gate--on' : ''}${current ? ' detail-summary__gate--current' : ''}${stale ? ' detail-summary__gate--stale' : ''}${sha ? ' detail-summary__gate--receipt' : ''}`;
  const body = html`<span class="detail-summary__gate-label"
      >${view.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${sha}</span>`;
  if (view.href) {
    return html`<a
      class=${gate_class}
      data-gate=${stage.id}
      data-hue=${stage.hue}
      href=${view.href}
      target="_blank"
      rel="noreferrer"
      title=${title}
      >${body}</a
    >`;
  }
  return html`<span
    class=${gate_class}
    data-gate=${stage.id}
    data-hue=${stage.hue}
    title=${title}
    >${body}</span
  >`;
}

/**
 * The raw receipt one gate stands for: its own metadata key where it owns one,
 * otherwise whatever the server resolved onto the matching stage.
 *
 * @param {(typeof GATE_STAGES)[number]} stage
 * @param {Record<string, unknown>} metadata
 * @param {Record<string, any>} stages
 * @returns {string}
 */
function gateReceipt(stage, metadata, stages) {
  if (stage.receipt && typeof metadata[stage.receipt] === 'string') {
    return String(metadata[stage.receipt]);
  }
  if (stage.receipt_stage) {
    const raw = stages[stage.receipt_stage]?.receipt;
    return typeof raw === 'string' ? raw : '';
  }
  return '';
}

/**
 * The plan gate's approval phrase, or `''` for every other gate and for an
 * approval that is settled. Absent state stays silent — a contract key this
 * surface cannot observe is never reported as a problem.
 *
 * @param {(typeof GATE_STAGES)[number]} stage
 * @param {Record<string, any>} stages
 * @returns {string}
 */
function planApprovalText(stage, stages) {
  if (stage.id !== 'plan') {
    return '';
  }
  const state = stages.plan?.approval_state;
  return typeof state === 'string' && Object.hasOwn(PLAN_APPROVAL_TEXT, state)
    ? /** @type {Record<string, string>} */ (PLAN_APPROVAL_TEXT)[state]
    : '';
}
