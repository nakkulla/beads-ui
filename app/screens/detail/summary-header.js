/**
 * The issue detail's summary header (spec §E, UI-dbn6 §3.5): the 머리 chips —
 * status, route, mode, PR, planned execution, exec receipt and the 판정 칩 —
 * and the labelled gate stepper with its receipt binding. Split out of
 * `effective-settings-view.js` (UI-dbn6 Phase 2) so the detail places the chips
 * in its header and the stepper under the title; the rendering is unchanged.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {import('./exec-format.js').ExecReceipt} ExecReceipt
 * @typedef {(typeof import('./effective-settings-view.js').GATE_STAGES)[number]} GateStage
 */
import { html } from 'lit-html';
import { chipPresetBinding } from '../../model/chip-preset-binding.js';
import { judgementPopoverLines } from '../../model/judgement-popover.js';
import { chipPopoverTemplate } from '../../ui/chip-popover.js';
import { areaLabels, areaTooltip } from '../../utils/area-judgement.js';
import {
  COMPLEX_CHIP_LABEL,
  complexReason,
  complexTooltip
} from '../../utils/complex-judgement.js';
import { routeGates } from './effective-settings-view.js';
import { formatExecReceipt, formatPlannedExecution } from './exec-format.js';

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
 * One 판정 칩 of the issue detail header — 카드와 같은 판정, 같은 두 모양
 * (UI-wg68 §5.2). 여기서는 클릭이 DOM 위임이 아니라 핸들러 직접 호출이라
 * `data-*`는 상태 표시용이다.
 *
 * @param {{ chip_key: string, label: string, title: string, modifier: string, open: boolean, metadata: Record<string, any>, route: string|null, data: any, handlers: Record<string, any> }} input
 * @returns {TemplateResult}
 */
function detailJudgementChip(input) {
  const { chip_key, label, title, modifier, open, metadata, route, data } =
    input;
  const handlers = input.handlers;
  const binding = chipPresetBinding(
    chip_key,
    metadata,
    route,
    handlers.chipPresets || null,
    typeof data?.id === 'string' ? data.id : ''
  );
  if (!binding) {
    return html`<button
      type="button"
      class="detail-summary__chip detail-summary__chip--${modifier} judgement-chip"
      data-chip-key=${chip_key}
      aria-expanded=${open ? 'true' : 'false'}
      title=${title}
      @click=${() => handlers.onChipToggle?.(chip_key)}
    >
      ${label}
    </button>`;
  }
  return html`<button
    type="button"
    class="detail-summary__chip detail-summary__chip--${modifier} judgement-chip judgement-chip--bound"
    data-chip-key=${chip_key}
    data-bead-id=${typeof data?.id === 'string' ? data.id : ''}
    data-state=${binding.state}
    aria-busy=${binding.busy ? 'true' : 'false'}
    title=${`${title}${binding.title_suffix}`}
    @click=${() => {
      if (!binding.busy) {
        handlers.onChipPresetToggle?.(chip_key);
      }
    }}
  >
    ${label}
  </button>`;
}

/**
 * The facts every part of the header reads off one issue payload.
 *
 * @param {any} data - The bd issue payload.
 */
function headerFacts(data) {
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
  // The board already names the PR by number from this same server-parsed
  // field; naming it the same way here keeps one PR from reading as two.
  const pr_number = workflow.chips?.pr?.number;
  const pr_label = typeof pr_number === 'number' ? `PR #${pr_number}` : 'PR';
  return { metadata, workflow, stages, route, pr_url, pr_label };
}

/**
 * The header chips: status, route, mode, PR, planned execution, the
 * `exec_receipt` chip, and the 판정 칩 (복잡·영역) with their 사유 팝업.
 *
 * 판정 칩 `복잡`·`frontend`·`backend`는 카드와 같은 규칙이다 (UI-wg68 §5): 바인딩이
 * 있고 이슈 route가 `quick_fix`가 아니면 클릭이 그 프리셋을 적용·복원하고, 그
 * 밖에는 UI-8x90 §5.1 그대로 사유 팝업을 연다.
 *
 * @param {any} data - The bd issue payload.
 * @param {{ onChipToggle?: (chip_key: string) => void, isChipOpen?: (chip_key: string) => boolean, onChipPresetToggle?: (chip_key: string) => void, chipPresets?: import('../../model/chip-preset-binding.js').ChipPresetContext|null }} [handlers]
 * @returns {TemplateResult}
 */
export function summaryChipsTemplate(data, handlers = {}) {
  const { metadata, workflow, route, pr_url, pr_label } = headerFacts(data);
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
  // 라벨과 사유를 함께 읽는다 (UI-7nhi §4) — 이슈 레코드에 `labels`가 없으면
  // 칩도 없다 (fail-quiet).
  const reason = complexReason(data?.labels, metadata);
  const complex_open =
    reason.length > 0 && handlers.isChipOpen?.('complex') === true;
  const area_labels = areaLabels(data?.labels);
  // 카드와 같은 문장을 쓴다 (§4.5, UI-wg68 §5.2): `복잡`과 영역 칩 셋이 한 팝업
  // 자리를 나눠 쓰므로 열린 칩 하나를 먼저 고르고 그 내용만 그린다. 게이트 칩이
  // 없는 머리이므로 사유 줄은 model의 `judgementPopoverLines` 그대로다 — 레인 항목
  // 전체를 만들지 않고 그 함수가 읽는 필드만 지어 넘긴다.
  const open_chip_key = complex_open
    ? 'complex'
    : area_labels.find((label) => handlers.isChipOpen?.(label) === true) || '';
  const chip_popover = open_chip_key
    ? judgementPopoverLines(
        /** @type {any} */ ({
          complex_reason: reason,
          route,
          labels: data?.labels
        }),
        open_chip_key
      )
    : null;
  return html`<div class="detail-summary__chips">
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
      ${reason.length > 0
        ? detailJudgementChip({
            chip_key: 'complex',
            label: COMPLEX_CHIP_LABEL,
            title: complexTooltip(reason),
            modifier: 'complex',
            open: complex_open,
            metadata,
            route,
            data,
            handlers
          })
        : ''}${area_labels.map((label) =>
        detailJudgementChip({
          chip_key: label,
          label,
          title: areaTooltip(label),
          modifier: 'area',
          open: handlers.isChipOpen?.(label) === true,
          metadata,
          route,
          data,
          handlers
        })
      )}
    </div>
    ${chip_popover ? chipPopoverTemplate(chip_popover) : ''}`;
}

/**
 * The labelled gate stepper: every gate the route walks, lit from the server's
 * stage `fill`, with the receipt's short commit under the stamped ones.
 *
 * @param {any} data - The bd issue payload.
 * @returns {TemplateResult}
 */
export function summaryGatesTemplate(data) {
  const { metadata, stages, route, pr_url, pr_label } = headerFacts(data);
  return html`<div
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
  </div>`;
}

/**
 * The whole summary header — chips, then the gate stepper — as one section.
 *
 * @param {any} data - The bd issue payload.
 * @param {Parameters<typeof summaryChipsTemplate>[1]} [handlers]
 * @returns {TemplateResult}
 */
export function summaryHeaderTemplate(data, handlers = {}) {
  return html`<section class="detail-summary" data-seam="detail-summary">
    ${summaryChipsTemplate(data, handlers)} ${summaryGatesTemplate(data)}
  </section>`;
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
 * @param {GateStage} stage
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
 * @param {GateStage} stage
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
 * The plan gate's phrase for a D7 review pair whose stats anchor disagrees with
 * the review anchor (UI-y9hl U3).
 */
const PLAN_REVIEW_INCOMPLETE_TEXT = '검토 기록 불완전 — 앵커 불일치';

/**
 * The plan gate's approval phrase, or `''` for every other gate and for an
 * approval that is settled. Absent state stays silent — a contract key this
 * surface cannot observe is never reported as a problem.
 *
 * @param {GateStage} stage
 * @param {Record<string, any>} stages
 * @returns {string}
 */
function planApprovalText(stage, stages) {
  if (stage.id !== 'plan') {
    return '';
  }
  const state = stages.plan?.approval_state;
  const approval =
    typeof state === 'string' && Object.hasOwn(PLAN_APPROVAL_TEXT, state)
      ? /** @type {Record<string, string>} */ (PLAN_APPROVAL_TEXT)[state]
      : '';
  if (stages.plan?.review_state !== 'incomplete') {
    return approval;
  }
  return [PLAN_REVIEW_INCOMPLETE_TEXT, approval].filter(Boolean).join(' · ');
}
