import { html } from 'lit-html';
import {
  formatAttemptTuple,
  formatContinuationLineage
} from '../../utils/attempt-display.js';
import { sessionRefKey, sessionRefLabel } from '../../utils/session-ref.js';
import {
  formatUsageTotal,
  projectAttemptUsage,
  providerUsageBadges
} from '../../utils/token-usage.js';
import {
  delegationLegs,
  nativeChildLegs,
  shortTime,
  totalTemplate,
  usageDetail
} from './session-legs.js';

/**
 * @import { SessionRefView } from '../../../server/worker/session-ref.js'
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {import('../../utils/token-usage.js').UsageRecord} UsageRecord
 */

/**
 * @typedef {Object} SessionAttempt
 * @property {string} attempt_id
 * @property {string} [bead_id]
 * @property {string} [status] - running/done/failed/orphaned.
 * @property {number|null} [started_at]
 * @property {string|null} [runner]
 * @property {string|null} [model]
 * @property {string|null} [effort]
 * @property {string|null} [speed]
 * @property {string|null} [session_id] - Runner session id (short display).
 * @property {string|null} [resumed_from] - Prior attempt this one resumes (§1).
 * @property {'session'|'fresh'|null} [continuation_mode]
 * @property {number|null} [dismissed_at] - Epoch ms the attempt was dismissed (closed as handled), if any.
 * @property {string|null} [cause] - Why a failed/orphaned attempt ended
 * (UI-qult §4); absent on records written before the field existed.
 * @property {{ reason: string, command: string|null }|null} [cause_detail] -
 * What the fail-closed path caught behind that cause. `command` is nullable —
 * a guard can trip without one.
 * @property {UsageRecord|null} [usage] - This attempt's token usage (UI-d7pw
 * §2.2); absent/null renders no badge and no [τ 자세히] button.
 * @property {Array<Record<string, any>>} [usage_legs] - Durable completed
 * nested receipts, Codex units and Claude subagents alike. Missing/invalid rows
 * stay absent.
 * @property {Array<Record<string, any>>} [delegation_sessions] - Durable/live
 * normalized delegation summaries, same two providers.
 * @property {Array<Record<string, any>>} [codex_children] - Codex NATIVE
 * subagent observations (UI-mn5u §6.4). Verified direct child segments join
 * this attempt's total; an absent field means the observation was never made,
 * never that the children used nothing.
 * @property {string|null} [exec_default_preset_id] - Outer launch preset id.
 * @property {number|null} [exec_default_preset_revision] - Pinned preset revision.
 * @property {Record<string, string|null>|null} [exec_values] - Outer resolved values.
 */

/** @type {Record<string, string>} */
const STATUS_GLYPH = {
  running: '●',
  done: '✓',
  failed: '✗',
  orphaned: '⚠'
};

/**
 * The outer Worker launch snapshot. It is intentionally not an execution
 * receipt: `impl_model` describes the requested outer target and cannot prove
 * which child provider/model the workflow actually dispatched.
 *
 * @param {SessionAttempt} attempt
 * @returns {TemplateResult|''}
 */
function presetAudit(attempt) {
  if (
    typeof attempt.exec_default_preset_id !== 'string' ||
    attempt.exec_default_preset_id.length === 0
  ) {
    return '';
  }
  const values =
    attempt.exec_values && typeof attempt.exec_values === 'object'
      ? Object.entries(attempt.exec_values)
          .filter(([, value]) => typeof value === 'string' && value.length > 0)
          .map(([key, value]) => `${key}=${value}`)
          .join(' · ')
      : '';
  const revision =
    typeof attempt.exec_default_preset_revision === 'number'
      ? ` r${attempt.exec_default_preset_revision}`
      : '';
  return html`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${attempt.exec_default_preset_id}${revision}</span>
    ${values ? html`<small>${values}</small>` : ''}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`;
}

/**
 * Why a session's transcript cannot be opened from this server, by locality.
 * Same wording as the monitor tile's disabled `▤ 세션` (UI-4xzk §6.4) — one
 * fact, one sentence, wherever it is read.
 *
 * @type {Record<string, string>}
 */
const SESSION_OPEN_BLOCKED = {
  remote: '다른 머신 세션 — 이 서버에 transcript 없음',
  missing: 'transcript 파일 없음'
};

/**
 * One `session_ref` row (UI-4xzk §6.5). It wears the attempt row's shell
 * because it answers the same question — which run produced this issue's work —
 * and a second shell would say they are different kinds of fact.
 *
 * The `⧉ 재개` sibling is NOT `↻ 이어하기`: that one asks the server to resume a
 * Worker attempt, this one copies a command for a human terminal.
 *
 * @param {SessionRefView} view
 * @param {{ onOpenSessionRef?: (view: SessionRefView) => void, onCopyResumeCommand?: (command: string) => void }} handlers
 * @returns {TemplateResult}
 */
function sessionRefRow(view, handlers) {
  const blocked = SESSION_OPEN_BLOCKED[view.locality] || '';
  const meta =
    view.locality === 'remote'
      ? `${view.host} · 다른 머신`
      : view.locality === 'missing'
        ? `${view.host} · 파일 없음`
        : view.host;
  return html`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${sessionRefKey(view)}
      ?disabled=${blocked.length > 0}
      title=${blocked}
      @click=${() => {
        if (blocked.length === 0 && handlers.onOpenSessionRef) {
          handlers.onOpenSessionRef(view);
        }
      }}
    >
      <span class="detail-session__glyph">${view.current ? '◐' : '·'}</span>
      <span class="detail-session__id">${sessionRefLabel(view)}</span>
      <span class="detail-session__meta">${meta}</span>
      <span class="detail-session__sid" title=${view.session_id}
        >${view.session_id.slice(0, 8)}</span
      >
      <span class="detail-session__time">${shortTime(view.last_event_at)}</span>
    </button>
    ${view.resume_command
      ? html`<button
          type="button"
          class="op-btn detail-session__resume-cmd"
          title=${view.resume_command}
          @click=${(/** @type {Event} */ ev) => {
            ev.stopPropagation();
            if (handlers.onCopyResumeCommand && view.resume_command) {
              handlers.onCopyResumeCommand(view.resume_command);
            }
          }}
        >
          ⧉ 재개
        </button>`
      : ''}
  </div>`;
}

/**
 * Session-history section (spec §5.6): lists a bead's past/live Worker attempts;
 * clicking a row opens the transcript drawer against the persisted (or live)
 * log. A failed/orphaned attempt with a captured session id carries a separate
 * "↻ 이어하기" button (spec §1) — the row-click=open convention stays intact
 * because the button is a sibling, not a nested control. The button is ACTIVE
 * only on the newest eligible leaf of a resume lineage; an ancestor already
 * resumed (a child carries its `resumed_from`) or a pre-session-id attempt is
 * disabled with the reason in its title. A resume attempt shows a `↻` badge
 * titled with its `resumed_from`.
 *
 * Token usage rides along per row (UI-d7pw §2.2): a `τ …` badge, a [τ 자세히]
 * sibling button that expands the breakdown under the row, and the issue's
 * total beside the section heading.
 *
 * `session_refs` (UI-4xzk §6.5) are the interactive sessions that claimed the
 * issue. They lead the list — current first, then the past ones newest-first —
 * and attempts follow in their own order. The two are NOT interleaved: an
 * attempt is ordered by `started_at`, a session only by its transcript's mtime,
 * and sorting two different axes together would invent a sequence.
 *
 * @param {SessionAttempt[]} [attempts]
 * @param {{ onOpen?: (attempt_id: string) => void, onOpenDelegation?: (attempt_id: string, launch_id: string) => void, onResume?: (attempt_id: string) => void, onToggleUsage?: (attempt_id: string) => void, onOpenSessionRef?: (view: SessionRefView) => void, onCopyResumeCommand?: (command: string) => void }} [handlers]
 * @param {{ total?: UsageRecord|import('../../utils/token-usage.js').UsageProjection|null, expanded?: Set<string>, catalog?: import('../../../server/worker/runner-catalog.js').ResolvedCatalog|null }} [usage_view]
 * @param {SessionRefView[]} [session_refs]
 * @returns {TemplateResult}
 */
export function sessionHistoryTemplate(
  attempts,
  handlers = {},
  usage_view = {},
  session_refs = []
) {
  const list = Array.isArray(attempts) ? attempts : [];
  const views = Array.isArray(session_refs) ? session_refs : [];
  const ordered_views = [
    ...views.filter((view) => view && view.current === true),
    ...views
      .filter((view) => view && view.current !== true)
      .sort((a, b) => b.index - a.index)
  ];
  const session_rows = ordered_views.map((view) =>
    sessionRefRow(view, handlers)
  );
  const expanded = usage_view.expanded || new Set();
  const catalog = usage_view.catalog || null;
  if (list.length === 0 && ordered_views.length === 0) {
    return html`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;
  }
  // A resumed_from that another attempt carries marks its ancestor as spent.
  /** @type {Set<string>} */
  const resumed_from_ids = new Set();
  for (const a of list) {
    if (a && typeof a.resumed_from === 'string' && a.resumed_from.length > 0) {
      resumed_from_ids.add(a.resumed_from);
    }
  }

  /**
   * @param {SessionAttempt} a
   * @returns {TemplateResult|''}
   */
  const resumeButton = (a) => {
    const is_terminal_fail = a.status === 'failed' || a.status === 'orphaned';
    if (!is_terminal_fail) {
      return '';
    }
    const has_sid = typeof a.session_id === 'string' && a.session_id.length > 0;
    const already = resumed_from_ids.has(a.attempt_id);
    // `dismissed_at` is deliberately NOT part of the eligibility: the server's
    // `scheduler.resume()` never reads it, so excluding dismissed attempts here
    // made the UI stricter than the API it drives (UI-qult §4).
    const eligible = has_sid && !already;
    const title = !has_sid
      ? 'session_id 없는 구 attempt — 이어하기 불가'
      : already
        ? '이미 이어받은 attempt (child attempt 존재) — 이어하기 불가'
        : '이 세션을 같은 워크트리에서 이어서 진행';
    return html`<button
      type="button"
      class="op-btn detail-session__resume"
      data-attempt-id=${a.attempt_id}
      ?disabled=${!eligible}
      title=${title}
      @click=${(/** @type {Event} */ ev) => {
        ev.stopPropagation();
        if (eligible && handlers.onResume) {
          handlers.onResume(a.attempt_id);
        }
      }}
    >
      ↻ 이어하기
    </button>`;
  };

  /**
   * The one-line failure cause under a failed/orphaned row (UI-qult §4). A
   * record written before the field existed renders nothing rather than an
   * empty line.
   *
   * @param {SessionAttempt} a
   * @returns {TemplateResult|''}
   */
  const causeLine = (a) => {
    const is_terminal_fail = a.status === 'failed' || a.status === 'orphaned';
    if (!is_terminal_fail || typeof a.cause !== 'string' || a.cause === '') {
      return '';
    }
    const detail = a.cause_detail;
    // `command` is nullable, so it is appended only when it really is one —
    // a tooltip reading "… · null" says less than no tooltip at all.
    const title =
      detail && typeof detail.reason === 'string' && detail.reason.length > 0
        ? typeof detail.command === 'string' && detail.command.length > 0
          ? `${detail.reason} · ${detail.command}`
          : detail.reason
        : a.cause;
    return html`<div class="detail-session__cause" title=${title}>
      ${a.cause}
    </div>`;
  };

  /**
   * The [τ 자세히] toggle. Absent on an attempt that reported no usage — there
   * would be nothing behind it.
   *
   * @param {SessionAttempt} a
   * @returns {TemplateResult|''}
   */
  const usageButton = (a) => {
    const projection = projectAttemptUsage(a, catalog);
    if (
      providerUsageBadges(projection).length === 0 &&
      !formatUsageTotal(a.usage)
    ) {
      return '';
    }
    const open = expanded.has(a.attempt_id);
    return html`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${a.attempt_id}
      aria-expanded=${open ? 'true' : 'false'}
      title=${open ? '토큰 내역 접기' : '토큰 내역 펼치기'}
      @click=${(/** @type {Event} */ ev) => {
        ev.stopPropagation();
        if (handlers.onToggleUsage) {
          handlers.onToggleUsage(a.attempt_id);
        }
      }}
    >
      τ 자세히
    </button>`;
  };

  return html`
    <div class="detail-section-label">
      세션 이력${totalTemplate(usage_view.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${session_rows}${list.map((a) => {
        const projection = projectAttemptUsage(a, catalog);
        const total_badges = providerUsageBadges(projection);
        const parent_badges = providerUsageBadges(
          projectAttemptUsage(
            { ...a, codex_children: [], usage_legs: [] },
            catalog
          )
        );
        return html`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${a.status || 'unknown'}"
            data-attempt-id=${a.attempt_id}
            @click=${() => handlers.onOpen && handlers.onOpen(a.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${STATUS_GLYPH[a.status || ''] || '·'}</span
            >
            <span class="detail-session__id">${a.attempt_id}</span>
            ${formatContinuationLineage(a)
              ? html`<span
                  class="detail-session__resumed"
                  title=${formatContinuationLineage(a)}
                  >↻</span
                >`
              : ''}
            <span class="detail-session__meta">${formatAttemptTuple(a)}</span>
            ${total_badges.length > 0
              ? html`<span class="detail-session__role">부모·자식 합계</span>`
              : ''}
            ${a.session_id
              ? html`<span class="detail-session__sid" title=${a.session_id}
                  >${String(a.session_id).slice(0, 8)}</span
                >`
              : ''}
            ${total_badges.length > 0
              ? total_badges.map(
                  (badge) =>
                    html`<span
                      class="detail-session__usage"
                      title=${badge.tooltip}
                      >${badge.label}</span
                    >`
                )
              : formatUsageTotal(a.usage)
                ? html`<span class="detail-session__usage"
                    >${formatUsageTotal(a.usage)}</span
                  >`
                : ''}
            <span class="detail-session__time">${shortTime(a.started_at)}</span>
          </button>
          ${usageButton(a)} ${resumeButton(a)} ${causeLine(a)} ${presetAudit(a)}
          ${expanded.has(a.attempt_id) && a.usage
            ? usageDetail(a.usage, a.runner === 'codex' ? 'codex' : 'claude')
            : ''}
          ${expanded.has(a.attempt_id) && parent_badges.length > 0
            ? html`<div class="detail-session__usage-detail">
                <span class="detail-session__usage-label">부모 본체</span>
                ${parent_badges.map(
                  (badge) =>
                    html`<span
                      class="detail-session__usage-value"
                      title=${badge.tooltip}
                      >${badge.label}</span
                    >`
                )}
              </div>`
            : ''}
          ${delegationLegs(a, projection, handlers)}${nativeChildLegs(
            a,
            catalog
          )}
        </div>`;
      })}
    </div>
  `;
}
