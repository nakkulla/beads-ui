/**
 * Waiting, PR-wait, done and occupant rows of the pipeline screen (UI-dbn6
 * §3.4) — the successor of `miniRow`. The card grammar's slots are kept; the
 * changes are: a coarse pointer gets ONE `⋯` (the move sheet) at the right end
 * of a waiting row instead of `↑ ↓ ✕`, a fine pointer keeps `✕` and drag;
 * every time is a ticker span; ops stand in a 44px foot with `⋯` for the rest.
 */
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { QUEUE_GRACE_MS } from '../../model/lane-model.js';
import { representativeWaitReason } from '../../model/wait-vocabulary.js';
import {
  depLines,
  execChips,
  footTemplate,
  foreignRepoBadge,
  gateChip,
  graceChip,
  idChip,
  judgementChips,
  labelChips,
  laneOriginChip,
  openChipKey,
  popoverBody,
  popoverChip,
  prLink,
  priorityBadge,
  routeChip,
  sourceChips,
  timeSpan,
  timesLine,
  usageFacts
} from './chips.js';
import {
  externalWaitParts,
  inquiryLine,
  interactiveBadges,
  waitBadge,
  waitLines
} from './wait.js';

/**
 * @import { LaneItem } from '../../model/lane-model.js'
 * @import { OpDef } from './chips.js'
 * @import { CardContext } from './card.js'
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {CardContext & { coarse: boolean }} RowContext
 */

const PREREQUISITE_KINDS = ['prerequisite', 'prerequisite_foreign'];

/**
 * Whether a row is a waiting-lane member (parallel or serial).
 *
 * @param {{ lane?: string }} item
 * @returns {boolean}
 */
export function isQueueRow(item) {
  return item.lane === 'queue' || /^s[1-5]$/.test(item.lane || '');
}

/**
 * `[지금 시작]` (UI-q1tg §3.3, UI-01wh §3.3, UI-3pu9): in grace or gated; never
 * on a non-head serial row.
 *
 * @param {any} item
 * @param {number} now
 * @returns {OpDef|null}
 */
export function startNowOp(item, now) {
  if (
    /^s[1-5]$/.test(item.lane || '') &&
    typeof item.queue_index === 'number' &&
    item.queue_index > 0
  ) {
    return null;
  }
  const gated = !!item.gate;
  const in_grace =
    item.manual_only !== true &&
    typeof item.added_at === 'number' &&
    item.added_at + QUEUE_GRACE_MS > now;
  if (!in_grace && !gated) {
    return null;
  }
  return {
    op: 'start-now',
    label: '지금 시작',
    title: gated
      ? '공급자 보류를 이 행에 대해서만 무시하고 지금 실행합니다'
      : '대기 진입 유예를 이 항목에 대해서만 걷고 지금 실행합니다',
    data: { bead_id: item.id, root_dir: item.root_dir }
  };
}

/**
 * The resolve / handoff pair (UI-jw27 §4, UI-nuwy §3.6). Their presence is
 * `tileResolveFields`' decision, merged into the row by the screen.
 *
 * @param {any} item
 * @returns {OpDef[]}
 */
export function resolveOps(item) {
  /** @type {OpDef[]} */
  const ops = [];
  if (item.resolve_action) {
    ops.push({
      op: 'resolve',
      label: '세션에서 해결',
      disabled: item.resolve_enabled === false,
      title:
        item.resolve_title ||
        '실패한 작업을 이어받는 대화형 세션을 띄웁니다 (기록된 세션이 있으면 fork)',
      data: { bead_id: item.id, root_dir: item.root_dir }
    });
  }
  if (item.handoff_action) {
    ops.push({
      op: 'handoff',
      label: '워커로 이어가기',
      disabled: item.handoff_enabled === false,
      title:
        item.handoff_title ||
        '대화 창을 닫고 Worker가 같은 세션을 무인으로 이어갑니다',
      data: {
        bead_id: item.id,
        root_dir: item.root_dir,
        attempt_id: item.handoff_attempt_id || ''
      }
    });
  }
  return ops;
}

/**
 * `[폐기]` and `[폐기 포기]` — destructive, so they always live in the sheet.
 *
 * @param {any} item
 * @param {{ confirmation?: string }} [options]
 * @returns {OpDef[]}
 */
export function discardOps(item, options = {}) {
  const discard = item.discard;
  if (!discard?.action && !item.discard_action) {
    return [];
  }
  /** @type {OpDef[]} */
  const ops = [
    {
      op: 'discard',
      label: discard?.label || '폐기',
      tone: 'danger',
      destructive: true,
      disabled: discard ? !discard.enabled : item.discard_enabled === false,
      title: discard
        ? discard.title
        : item.discard_title ||
          'PR을 닫고 워크트리/브랜치를 폐기합니다 (되돌릴 수 없음)',
      data: {
        bead_id: item.id,
        root_dir: item.root_dir,
        attempt_id: discard?.attempt_id || item.attempt_id || '',
        operation_id: discard?.operation?.operation_id || '',
        confirmation:
          options.confirmation || discard?.confirmation || 'unmerged'
      }
    }
  ];
  if (discard?.abandon?.action) {
    ops.push({
      op: 'discard-abandon',
      label: discard.abandon.label,
      tone: 'danger',
      destructive: true,
      title: discard.abandon.title,
      data: {
        bead_id: item.id,
        root_dir: item.root_dir,
        operation_id: discard.operation?.operation_id || '',
        operation_kind: discard.operation?.kind || '',
        last_error: discard.error || ''
      }
    });
  }
  return ops;
}

/**
 * The foot ops of one row, in reading order (broad → narrow → destructive).
 *
 * @param {any} item
 * @param {OpDef[]} wait_ops
 * @param {number} now
 * @returns {OpDef[]}
 */
export function rowOps(item, wait_ops, now) {
  /** @type {OpDef[]} */
  const ops = [];
  const coord = { bead_id: item.id, root_dir: item.root_dir };
  if (isQueueRow(item) && item.draggable === true && !item.ghost) {
    const start = startNowOp(item, now);
    if (start) {
      ops.push(start);
    }
  }
  ops.push(...wait_ops);
  if (item.merge_action) {
    ops.push({
      op: 'merge',
      label: item.merge_label || '머지',
      tone: 'primary',
      disabled: item.merge_enabled === false,
      title: item.merge_title || '',
      data: coord
    });
  }
  if (item.cancel_action) {
    ops.push({
      op: 'merge-cancel',
      label: '취소',
      disabled: item.cancel_enabled === false,
      title: item.cancel_title || '머지 큐 순서를 내려놓습니다',
      data: coord
    });
  }
  ops.push(...resolveOps(item), ...discardOps(item));
  if (item.revise_action) {
    ops.push(
      {
        op: 'revise-fix',
        label: 'finding 수용·수정',
        destructive: true,
        disabled: item.revise_enabled === false,
        title:
          item.revise_title ||
          'notes의 REVISE finding을 스펙에 반영하는 처분 세션을 띄웁니다',
        data: coord
      },
      {
        op: 'revise-approve',
        label: '승인하고 진행',
        destructive: true,
        disabled: item.revise_enabled === false,
        title:
          '델타를 사용자 권한으로 승인해 영수증을 갱신하고 파킹을 해제합니다 (세션 없음)',
        data: coord
      }
    );
  }
  return ops;
}

/**
 * The merge-step gauge that sits beside the ops (UI-raqh §4).
 *
 * @param {any} step
 * @returns {TemplateResult|''}
 */
export function mergeStepGauge(step) {
  if (!step) {
    return '';
  }
  return html`<span
    class="pl-step${step.failed ? ' is-failed' : ''}"
    style=${`--progress: ${step.percent}%`}
    >${step.label}${step.index > 0
      ? html`<span class="pl-step__n">${step.index}/${step.total}</span>`
      : ''}</span
  >`;
}

/**
 * Durable discard progress / error / receipts (slot 6).
 *
 * @param {any} item
 * @returns {TemplateResult|''}
 */
export function discardReceipt(item) {
  const discard = item.discard;
  if (!discard || !discard.operation) {
    return '';
  }
  const operation = discard.operation;
  const archive =
    operation.kind === 'stale_work_backup_fresh' && !discard.error
      ? null
      : operation.backup?.path;
  return html`<div
    class="pl-receipt"
    role=${discard.error ? 'alert' : 'status'}
  >
    <span>${discard.progress}</span>
    ${discard.error ? html`<span>폐기 실패: ${discard.error}</span>` : ''}
    <code>작업: ${operation.operation_id}</code>
    ${archive
      ? html`<code>백업: ${archive}</code>`
      : discard.error
        ? html`<span>아직 아무것도 삭제하지 않음</span>`
        : ''}
    ${operation.original_pr?.url
      ? html`<a
          href=${operation.original_pr.url}
          target="_blank"
          rel="noreferrer noopener"
          >원본 PR #${operation.original_pr.number || '?'}</a
        >`
      : ''}
    ${operation.revert_pr?.url
      ? html`<a
          href=${operation.revert_pr.url}
          target="_blank"
          rel="noreferrer noopener"
          >revert PR #${operation.revert_pr.number || '?'} ·
          ${operation.revert_pr.state || '상태 미확인'}</a
        >`
      : ''}
  </div>`;
}

/**
 * A copyable log path (slot 5b).
 *
 * @param {string|null|undefined} path
 * @returns {TemplateResult|''}
 */
export function logPathFact(path) {
  if (typeof path !== 'string' || path.length === 0) {
    return '';
  }
  return html`<span class="pl-fact pl-fact--path"
    ><code>${path}</code
    ><button
      type="button"
      class="pl-copy"
      data-op="copy-text"
      data-copy=${path}
      title="로그 경로 복사"
      aria-label="로그 경로 복사"
    >
      ⧉
    </button></span
  >`;
}

/**
 * The receipt residue chip (slot 5b, UI-h6t1 §4.3).
 *
 * @param {any} item
 * @returns {TemplateResult|''}
 */
export function receiptChip(item) {
  const codes = Array.isArray(item.receipt_badge?.codes)
    ? item.receipt_badge.codes.filter(
        (/** @type {unknown} */ code) =>
          typeof code === 'string' && code.length > 0
      )
    : [];
  if (codes.length === 0) {
    return '';
  }
  return popoverChip(
    item,
    'receipt',
    codes.length > 1
      ? `영수증 · ${codes[0]} +${codes.length - 1}`
      : `영수증 · ${codes[0]}`,
    codes.join(', ')
  );
}

/**
 * One status badge of `item.badges`.
 *
 * @param {any} item
 * @param {string} badge
 * @returns {TemplateResult}
 */
function statusBadge(item, badge) {
  if (badge === item.live_badge) {
    return html`<span
      class="pl-badge pl-badge--live"
      title="서버가 이 PR을 처리하는 중입니다"
      ><span class="pl-dot is-live" aria-hidden="true"></span>${badge}</span
    >`;
  }
  return html`<span
    class="pl-badge${item.alert ? ' pl-badge--alert' : ''}"
    title=${badge === item.completion_badge ? item.completion_title || '' : ''}
    >${badge}</span
  >`;
}

/**
 * The drag coordinates a waiting row carries (read by `drag.js`).
 *
 * @param {any} item
 * @param {{ kind: 'parallel'|'repo-serial', lane_id?: string, row_index: number }} coord
 * @returns {{ kind: string, lane_id?: string, row_index: number }|null}
 */
export function dragCoord(item, coord) {
  return item.draggable === true && !item.ghost && !item.done ? coord : null;
}

/**
 * The wait reasons a row reads: prerequisite kinds only on waiting rows.
 *
 * @param {any} item
 * @returns {any[]}
 */
function rowWaitReasons(item) {
  const queue_row = isQueueRow(item);
  return (item.wait_reasons || []).filter(
    (/** @type {any} */ reason) =>
      !PREREQUISITE_KINDS.includes(reason.kind) || queue_row
  );
}

/**
 * Every op one row offers — the list the row foot and the `⋯` ops sheet both
 * read. `↻ 지금 프로브` of a waiting row lives in its gate-chip popover
 * (UI-pw2g §3.4), so it is not among them.
 *
 * @param {any} item
 * @param {number} now
 * @returns {OpDef[]}
 */
export function miniRowOps(item, now) {
  if (item.ghost) {
    return [];
  }
  const external = externalWaitParts(item, now);
  /** @type {Set<string>} */
  const seen = new Set();
  const wait_ops = rowWaitReasons(item)
    .flatMap((reason) =>
      reason.kind === 'external_job'
        ? external.ops
        : waitLines(reason, { now, include_probe: false }).ops
    )
    .filter((op) => {
      const data = op.data || {};
      const key = `${op.op}:${data.external_wait_op || ''}:${data.wait_id || ''}:${data.mode || ''}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  return rowOps(item, wait_ops, now);
}

/**
 * One row.
 *
 * @param {LaneItem & Record<string, any>} item
 * @param {RowContext} ctx
 * @param {{ drag?: { kind: string, lane_id?: string, row_index: number }|null }} [options]
 * @returns {TemplateResult}
 */
export function miniRow(item, ctx, options = {}) {
  const now = ctx.now;
  if (item.lane === 'done') {
    return doneRow(item, ctx);
  }
  const queue_row = isQueueRow(item);
  const open = openChipKey(item);
  const wait_reasons = rowWaitReasons(item);
  const external = externalWaitParts(item, now);
  const representative = representativeWaitReason(wait_reasons);
  const lines = external.badge
    ? external
    : representative
      ? waitLines(/** @type {any} */ (representative), {
          now,
          interactive_sessions: item.interactive_sessions
        })
      : { badge: '', body: '', ops: [], times: '' };
  const badge = external.badge
    ? external.badge
    : waitBadge({
        wait_reasons,
        interactive_sessions: item.interactive_sessions,
        now
      });
  const drag = options.drag || null;
  const movable = queue_row && item.draggable === true && !item.ghost;
  const gate_open = open === 'gate';
  const popover = item.chip_popover
    ? popoverBody(item.chip_popover.content)
    : '';
  const run_parts = [
    item.lane !== 'pr_wait'
      ? execChips(item.exec_chips, { pin: item.exec_chips_pinned === true })
      : '',
    judgementChips(item, ctx.chips),
    receiptChip(item),
    usageFacts(item.usage),
    logPathFact(item.log_path)
  ];
  const coord_parts = [
    item.lane === 'pr_wait' && !item.external
      ? laneOriginChip(item.lane_origin)
      : '',
    routeChip(item.workflow),
    sourceChips(item),
    labelChips(item.labels)
  ];
  const ops = miniRowOps(item, now);
  return html`<div
    class="pl-row${item.ghost ? ' is-ghost' : ''}${item.merge_step
      ? ' is-merging'
      : ''}${item.merge_step?.failed ? ' is-merge-failed' : ''}${item.external
      ? ' is-external'
      : ''}${item.search_match === false || item.filter_match === false
      ? ' is-dimmed'
      : ''}"
    style=${ifDefined(
      item.merge_step ? `--progress: ${item.merge_step.percent}%` : undefined
    )}
    data-bead-id=${item.id}
    data-root-dir=${item.root_dir}
    data-lane=${item.lane}
    data-drag-kind=${ifDefined(drag ? drag.kind : undefined)}
    data-lane-id=${ifDefined(drag?.lane_id)}
    data-row-index=${ifDefined(drag ? String(drag.row_index) : undefined)}
    data-queue-index=${ifDefined(
      drag && typeof item.queue_index === 'number'
        ? String(item.queue_index)
        : undefined
    )}
  >
    <div class="pl-line1">
      ${drag && !ctx.coarse
        ? html`<span class="pl-grip" aria-hidden="true">⠿</span>`
        : ''}${typeof item.seq === 'number'
        ? html`<span class="pl-seq" aria-hidden="true">${item.seq}</span>`
        : ''}${idChip(item.id)}${priorityBadge(item.priority)}${prLink(
        item.pr_url,
        item.pr_number
      )}${foreignRepoBadge(item.foreign_repo)}${(item.badges || []).map(
        (/** @type {string} */ entry) => statusBadge(item, entry)
      )}${item.rereview_required === true
        ? html`<span
            class="pl-badge pl-badge--wait"
            title="stale 판정 — 디스패치가 세션 내 재리뷰를 요구합니다. 실행은 admit됐고 거절이 아닙니다"
            >♻ 재리뷰 필요</span
          >`
        : ''}${interactiveBadges(item.interactive_sessions, {
        bead_id: item.id,
        root_dir: item.root_dir,
        now
      })}${badge}
      ${movable
        ? html`<span class="pl-line1__ops">
            ${ctx.coarse
              ? html`<button
                  type="button"
                  class="pl-op pl-op--ghost pl-op--icon"
                  data-op="move-sheet"
                  data-bead-id=${item.id}
                  data-root-dir=${item.root_dir}
                  title="옮기기"
                  aria-label="옮기기"
                >
                  ⋯
                </button>`
              : html`<button
                  type="button"
                  class="pl-op pl-op--ghost pl-op--icon"
                  data-op="queue-remove"
                  data-bead-id=${item.id}
                  data-root-dir=${item.root_dir}
                  title="대기에서 빼기"
                  aria-label="대기에서 빼기"
                >
                  ✕
                </button>`}
          </span>`
        : ''}
    </div>
    ${typeof item.reason === 'string' && item.reason.length > 0
      ? html`<div
          class="pl-reason${item.reason.startsWith('⛔') ? ' is-danger' : ''}"
        >
          ${item.reason}
        </div>`
      : ''}
    <div class="pl-title">${item.title}</div>
    ${lines.body}${inquiryLine(item.interactive_sessions, now)}
    ${depLines(item.dependency_chips, {
      root_dir: item.root_dir,
      leading: item.gate
        ? html`${gateChip(item)}${gate_open ? popover : ''}`
        : '',
      trailing: queue_row ? graceChip(item, QUEUE_GRACE_MS, now) : ''
    })}
    ${coord_parts.some((part) => part !== '')
      ? html`<div class="pl-chips">${coord_parts}</div>`
      : ''}
    ${run_parts.some((part) => part !== '') || (popover && !gate_open)
      ? html`<div class="pl-facts">
          ${run_parts}${gate_open ? '' : popover}
        </div>`
      : ''}
    ${footTemplate(
      ops,
      { bead_id: item.id, root_dir: item.root_dir },
      html`${mergeStepGauge(item.merge_step)}${discardReceipt(item)}`
    )}
    ${lines.times}${timesLine(item, now)}
  </div>`;
}

/**
 * The done row — three lines: identity · title · coordinates and run facts.
 *
 * @param {any} item
 * @param {RowContext} ctx
 * @returns {TemplateResult}
 */
function doneRow(item, ctx) {
  const now = ctx.now;
  const done_at = typeof item.done_at === 'number' ? item.done_at : null;
  const coord_parts = [
    routeChip(item.workflow),
    sourceChips(item, { include_from: false }),
    labelChips(item.labels)
  ];
  const run_parts = [execChips(item.exec_chips), usageFacts(item.usage)];
  const ops = miniRowOps(item, now);
  return html`<div
    class="pl-row pl-row--done${item.search_match === false ||
    item.filter_match === false
      ? ' is-dimmed'
      : ''}"
    data-bead-id=${item.id}
    data-root-dir=${item.root_dir}
    data-lane="done"
  >
    <div class="pl-line1">
      ${idChip(item.id)}${priorityBadge(item.priority)}${prLink(
        item.pr_url,
        item.pr_number
      )}${foreignRepoBadge(item.foreign_repo)}${(item.badges || []).map(
        (/** @type {string} */ entry) => statusBadge(item, entry)
      )}${interactiveBadges(item.interactive_sessions, {
        bead_id: item.id,
        root_dir: item.root_dir,
        now
      })}
    </div>
    <div class="pl-title pl-title--quiet">${item.title}</div>
    ${coord_parts.some((part) => part !== '')
      ? html`<div class="pl-chips">${coord_parts}</div>`
      : ''}
    <div class="pl-facts">
      ${run_parts}${done_at !== null
        ? timeSpan(done_at, 'rel', { pre: '완료 ', now, cls: 'pl-ts pl-fact' })
        : ''}${typeof item.work_ms === 'number'
        ? html`<span
            class="pl-fact"
            title=${item.work_kind === 'session'
              ? 'bead가 in_progress로 잡힌 뒤 닫히기까지의 경과'
              : 'attempt 실행 시간 합산 (재개 세션 포함)'}
            >작업 ${workText(item.work_ms)}</span
          >`
        : ''}
    </div>
    ${footTemplate(ops, { bead_id: item.id, root_dir: item.root_dir })}
  </div>`;
}

/**
 * A finished work duration (`3분 12초`), fixed at completion.
 *
 * @param {number} ms
 * @returns {string}
 */
function workText(ms) {
  if (!Number.isFinite(ms) || ms < 0) {
    return '—';
  }
  const seconds = ms / 1000;
  if (seconds < 60) {
    return `${seconds.toFixed(1)}초`;
  }
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}분 ${Math.round(seconds - minutes * 60)}초`;
  }
  return `${Math.floor(minutes / 60)}시간 ${minutes % 60}분`;
}
