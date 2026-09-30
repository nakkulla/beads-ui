/**
 * The candidate card of the pipeline screen (UI-dbn6 §3.4) — the successor of
 * `candidateCard`. Line order and slots follow the card grammar (2026-08-25
 * §2, §5.1); the three changes this screen owns are the top progress band
 * (instead of the slot-3 stepper), ticker-driven times (slot 7) and a foot of
 * 44px op buttons. Phase-child rollups and carryover chips are not drawn.
 *
 * The deferred shelf reuses this card as `variant: 'deferred'` (UI-p7s2 §3.2):
 * no `[↴ 대기로]`, no readiness chip, no route tint.
 */
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { SESSION_PREFERRED_TOOLTIP } from '../../model/judgement-popover.js';
import { placementTitle } from '../../model/placement.js';
import {
  depLines,
  execChips,
  footTemplate,
  idChip,
  judgementChips,
  labelChips,
  openChipKey,
  popoverBody,
  popoverChip,
  priorityBadge,
  progressBand,
  routeChip,
  sourceChips,
  timesLine
} from './chips.js';
import { externalWaitParts, interactiveBadges } from './wait.js';

/**
 * @import { LaneItem } from '../../model/lane-model.js'
 * @import { ChipPresetContext } from '../../model/chip-preset-binding.js'
 * @import { OpDef } from './chips.js'
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {{ now: number, chips: ChipPresetContext|null }} CardContext
 */

/**
 * The first readiness judgment of an unready candidate (UI-ff10 §6.1).
 *
 * @param {any} item
 * @returns {{ label: string, title: string }|null}
 */
export function readinessOf(item) {
  if (!Object.hasOwn(item, 'route_ok') || item.queue_placeable === true) {
    return null;
  }
  let label = item.route_ok === false ? '라우팅 필요' : '';
  if (
    label.length === 0 &&
    (item.worker_ineligible === true || item.awaiting_user === true)
  ) {
    return null;
  }
  if (label.length === 0 && item.missing_description === true) {
    label = '본문 필요';
  } else if (label.length === 0 && item.placement_spec === 'conflict') {
    label = '스펙 충돌';
  } else if (
    label.length === 0 &&
    Object.hasOwn(item, 'placement_spec') &&
    item.placement_spec !== 'published'
  ) {
    label = '스펙 미발행';
  }
  if (label.length === 0) {
    return null;
  }
  return {
    label,
    title: placementTitle({
      placeable: false,
      route_ok: item.route_ok,
      worker_ineligible: item.worker_ineligible === true,
      awaiting_user: item.awaiting_user === true,
      missing_description: item.missing_description === true,
      spec: item.placement_spec
    })
  };
}

/**
 * The ops a candidate card offers (slot 6).
 *
 * @param {any} item
 * @param {{ deferred: boolean, external_ops: OpDef[], external: boolean }} input
 * @returns {OpDef[]}
 */
export function candidateOps(item, input) {
  if (input.external) {
    return input.external_ops;
  }
  if (input.deferred) {
    return [];
  }
  const worker_ineligible = item.worker_ineligible === true;
  const placeable =
    item.queue_placeable === true && !item.done && !worker_ineligible;
  return [
    {
      op: 'place-sheet',
      label: '↴ 대기로',
      tone: 'primary',
      disabled: !placeable,
      title: placementTitle({
        placeable,
        route_ok: item.route_ok,
        worker_ineligible,
        awaiting_user: item.awaiting_user === true,
        missing_description: item.missing_description === true,
        spec: item.placement_spec
      }),
      data: { bead_id: item.id, root_dir: item.root_dir }
    }
  ];
}

/**
 * Every op one candidate (or deferred) card offers — the list the card foot
 * and the `⋯` ops sheet both read.
 *
 * @param {any} item
 * @param {number} now
 * @returns {OpDef[]}
 */
export function cardOps(item, now) {
  const external = externalWaitParts(item, now);
  return candidateOps(item, {
    deferred: item.deferred === true,
    external: !!external.badge,
    external_ops: external.ops
  });
}

/**
 * @param {LaneItem & Record<string, any>} item
 * @param {CardContext} ctx
 * @param {{ variant?: 'deferred' }} [options]
 * @returns {TemplateResult}
 */
export function candidateCard(item, ctx, options = {}) {
  const deferred = options.variant === 'deferred';
  const now = ctx.now;
  const open = openChipKey(item);
  const worker_ineligible = item.worker_ineligible === true;
  const external = externalWaitParts(item, now);
  const readiness = deferred ? null : readinessOf(item);
  const slot1_popover =
    item.chip_popover &&
    !['spec_after_blocker', 'readiness', 'gate'].includes(open || '')
      ? popoverBody(item.chip_popover.content)
      : '';
  const slot4_popover =
    item.chip_popover &&
    ['spec_after_blocker', 'readiness'].includes(open || '')
      ? popoverBody(item.chip_popover.content)
      : '';
  const after = html`${item.spec_after_blocker === true
    ? popoverChip(
        item,
        'spec_after_blocker',
        '스펙 대기',
        '선행의 결과가 설계 전제라 스펙도 선행 뒤에 씁니다',
        'label'
      )
    : ''}${readiness
    ? popoverChip(item, 'readiness', readiness.label, readiness.title, 'dep')
    : ''}`;
  const has_after = item.spec_after_blocker === true || readiness !== null;
  const coord_parts = [
    routeChip(item.workflow),
    sourceChips(item),
    labelChips(item.labels)
  ];
  const ops = candidateOps(item, {
    deferred,
    external: !!external.badge,
    external_ops: external.ops
  });
  const draggable =
    !deferred && item.queue_placeable === true && !worker_ineligible;
  const blocked =
    !deferred &&
    !worker_ineligible &&
    (item.blocked === true || item.queue_placeable === false);
  return html`<article
    class="pl-card${deferred ? ' pl-card--deferred' : ''}${worker_ineligible
      ? ' is-ineligible'
      : ''}${blocked ? ' is-blocked' : ''}${item.search_match === false ||
    item.filter_match === false
      ? ' is-dimmed'
      : ''}"
    data-bead-id=${item.id}
    data-root-dir=${item.root_dir}
    data-lane="runnable"
    data-drag-kind=${ifDefined(draggable ? 'candidate' : undefined)}
  >
    ${progressBand(item.workflow, item.status, {
      root_dir: item.root_dir,
      coarse: /** @type {any} */ (ctx).coarse === true
    })}
    <div class="pl-line1">
      ${idChip(item.id)}${priorityBadge(
        item.priority
      )}${item.rereview_required === true
        ? html`<span
            class="pl-badge pl-badge--wait"
            title="stale 판정 — 디스패치가 세션 내 재리뷰를 요구합니다. 실행은 admit됐고 거절이 아닙니다"
            >♻ 재리뷰 필요</span
          >`
        : ''}
      ${worker_ineligible
        ? popoverChip(
            item,
            'ineligible',
            'worker-ineligible',
            'worker-ineligible label이 붙어 워커 실행 대상이 아닙니다',
            'label'
          )
        : item.session_preferred === true
          ? popoverChip(
              item,
              'session_preferred',
              '세션 권장',
              SESSION_PREFERRED_TOOLTIP[item.session_preferred_reason || ''] ||
                '',
              'label'
            )
          : ''}${judgementChips(item, ctx.chips)}${qfrChip(
        item
      )}${interactiveBadges(item.interactive_sessions, {
        bead_id: item.id,
        root_dir: item.root_dir,
        now
      })}${external.badge}
    </div>
    ${slot1_popover}
    <div class="pl-title">${item.title}</div>
    ${external.body}
    ${depLines(item.dependency_chips, {
      root_dir: item.root_dir,
      after: has_after ? html`${after}${slot4_popover}` : ''
    })}
    ${coord_parts.some((part) => part !== '')
      ? html`<div class="pl-chips">${coord_parts}</div>`
      : ''}
    ${item.exec_chips &&
    (item.exec_chips.orchestration || item.exec_chips.worker)
      ? html`<div class="pl-facts">${execChips(item.exec_chips)}</div>`
      : ''}
    ${typeof item.reason === 'string' && item.reason.length > 0
      ? html`<div
          class="pl-reason${item.reason.startsWith('⛔') ? ' is-danger' : ''}"
        >
          ${item.reason}
        </div>`
      : ''}
    ${footTemplate(ops, { bead_id: item.id, root_dir: item.root_dir })}
    ${external.times}${timesLine(item, now)}
  </article>`;
}

/**
 * The quick_fix self-review chip (slot 1, UI-r7or §5.1).
 *
 * @param {any} item
 * @returns {TemplateResult|''}
 */
export function qfrChip(item) {
  const review = item.workflow ? item.workflow.quick_fix_review : null;
  if (!review || (review.state !== 'reviewed' && review.state !== 'stale')) {
    return '';
  }
  const missing = Array.isArray(review.missing) ? review.missing : [];
  return popoverChip(
    item,
    'qfr',
    review.state === 'reviewed' ? '리뷰 ✓' : '리뷰 stale',
    [
      review.state === 'reviewed'
        ? 'quick_fix self-review 영수증이 지금 본문과 일치합니다'
        : 'quick_fix self-review 영수증이 지금 본문과 다릅니다',
      ...missing
    ].join('\n'),
    review.state === 'reviewed' ? 'label' : 'dep'
  );
}
