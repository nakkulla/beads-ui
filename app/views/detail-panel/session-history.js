import { html } from 'lit-html';
import { formatUsageTotal } from '../../utils/token-usage.js';

/**
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */

/**
 * @typedef {import('../../utils/token-usage.js').UsageRecord} UsageRecord
 */

/**
 * The breakdown rows behind [τ 자세히] (UI-d7pw §2.2), in tally order. Cost is
 * appended separately because it is reported once per session, not per field.
 *
 * @type {ReadonlyArray<{ key: 'input_tokens'|'output_tokens'|'cache_read_input_tokens'|'cache_creation_input_tokens', label: string }>}
 */
const USAGE_BREAKDOWN = [
  { key: 'input_tokens', label: '입력' },
  { key: 'output_tokens', label: '출력' },
  { key: 'cache_read_input_tokens', label: '캐시 읽기' },
  { key: 'cache_creation_input_tokens', label: '캐시 생성' }
];

/**
 * The note a restart-recovered tally carries (UI-ediw): events lost with the
 * old server's pipe are unrecoverable, so the number is a floor.
 *
 * @type {string}
 */
const REPLAYED_NOTE = '서버 재시작 복구 — 부분 집계';

/**
 * @param {unknown} value
 * @returns {number}
 */
function usageNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

/**
 * The `τ 총 …` label beside the section heading. Null when nothing was
 * reported, so the heading renders exactly as it did before.
 *
 * @param {UsageRecord|null|undefined} total
 * @returns {TemplateResult|''}
 */
function totalTemplate(total) {
  const label = formatUsageTotal(total);
  if (!label || !total) {
    return '';
  }
  const cost =
    typeof total.total_cost_usd === 'number' &&
    Number.isFinite(total.total_cost_usd)
      ? ` · $${total.total_cost_usd.toFixed(2)}`
      : '';
  return html`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력)"
      >${label.replace(/^τ /, 'τ 총 ')}${cost}</span
    >${total.replayed
      ? html`<span class="detail-usage-partial" title=${REPLAYED_NOTE}
          >부분 집계</span
        >`
      : ''}`;
}

/**
 * The expanded breakdown under one session row. Rendered only while that row is
 * toggled open — a sibling block, exactly like {@link causeLine}, so the
 * row-click=open-transcript convention stays intact.
 *
 * @param {UsageRecord} usage
 * @returns {TemplateResult}
 */
function usageDetail(usage) {
  const cost =
    typeof usage.total_cost_usd === 'number' &&
    Number.isFinite(usage.total_cost_usd)
      ? usage.total_cost_usd
      : null;
  return html`<div class="detail-session__usage-detail">
    ${USAGE_BREAKDOWN.map(
      (row) =>
        html`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${row.label}</span
          ><span class="detail-session__usage-value"
            >${usageNumber(usage[row.key]).toLocaleString('en-US')}</span
          ></span
        >`
    )}
    ${cost === null
      ? ''
      : html`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${cost.toFixed(2)}</span
          ></span
        >`}
    ${usage.replayed
      ? html`<span class="detail-session__usage-note">${REPLAYED_NOTE}</span>`
      : ''}
  </div>`;
}

/**
 * @typedef {Object} SessionAttempt
 * @property {string} attempt_id
 * @property {string} [bead_id]
 * @property {string} [status] - running/done/failed/orphaned.
 * @property {number|null} [started_at]
 * @property {string|null} [runner]
 * @property {string|null} [model]
 * @property {string|null} [session_id] - Runner session id (short display).
 * @property {string|null} [resumed_from] - Prior attempt this one resumes (§1).
 * @property {number|null} [dismissed_at] - Epoch ms the attempt was dismissed (closed as handled), if any.
 * @property {string|null} [cause] - Why a failed/orphaned attempt ended
 * (UI-qult §4); absent on records written before the field existed.
 * @property {{ reason: string, command: string|null }|null} [cause_detail] -
 * What the fail-closed path caught behind that cause. `command` is nullable —
 * a guard can trip without one.
 * @property {UsageRecord|null} [usage] - This attempt's token usage (UI-d7pw
 * §2.2); absent/null renders no badge and no [τ 자세히] button.
 */

/** @type {Record<string, string>} */
const STATUS_GLYPH = {
  running: '●',
  done: '✓',
  failed: '✗',
  orphaned: '⚠'
};

/**
 * Format an epoch-ms timestamp as a short `HH:MM` label (empty when absent).
 *
 * @param {number|null|undefined} ms
 * @returns {string}
 */
function shortTime(ms) {
  if (typeof ms !== 'number' || !Number.isFinite(ms)) {
    return '';
  }
  const d = new Date(ms);
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
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
 * @param {SessionAttempt[]} [attempts]
 * @param {{ onOpen?: (attempt_id: string) => void, onResume?: (attempt_id: string) => void, onToggleUsage?: (attempt_id: string) => void }} [handlers]
 * @param {{ total?: UsageRecord|null, expanded?: Set<string> }} [usage_view]
 * @returns {TemplateResult}
 */
export function sessionHistoryTemplate(
  attempts,
  handlers = {},
  usage_view = {}
) {
  const list = Array.isArray(attempts) ? attempts : [];
  const expanded = usage_view.expanded || new Set();
  if (list.length === 0) {
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
      class="detail-session__resume"
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
    if (!formatUsageTotal(a.usage)) {
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
      ${list.map(
        (a) =>
          html`<div class="detail-session-row">
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
              ${a.resumed_from
                ? html`<span
                    class="detail-session__resumed"
                    title=${`이어받은 세션 (from ${a.resumed_from})`}
                    >↻</span
                  >`
                : ''}
              <span class="detail-session__meta"
                >${[a.runner, a.model].filter(Boolean).join(' · ')}</span
              >
              ${a.session_id
                ? html`<span class="detail-session__sid" title=${a.session_id}
                    >${String(a.session_id).slice(0, 8)}</span
                  >`
                : ''}
              ${formatUsageTotal(a.usage)
                ? html`<span class="detail-session__usage"
                    >${formatUsageTotal(a.usage)}</span
                  >`
                : ''}
              <span class="detail-session__time"
                >${shortTime(a.started_at)}</span
              >
            </button>
            ${usageButton(a)} ${resumeButton(a)} ${causeLine(a)}
            ${expanded.has(a.attempt_id) && a.usage ? usageDetail(a.usage) : ''}
          </div>`
      )}
    </div>
  `;
}
