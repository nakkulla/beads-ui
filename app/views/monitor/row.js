/**
 * Monitor tab row template (UI-53es §1).
 *
 * 관제 테이블의 한 줄: 스파인 · id · 제목 · 현재 진행중 child · 라이브 지표.
 * 워커 attempt가 붙은 bead는 경과시간 + 하트비트 + τ·비용을, attempt가 없는
 * bead는 `updated_at` 기준 "마지막 갱신 후 경과"만 싣는다 — 이슈 표면에 상태
 * 진입 시각이 없으므로 "진입 후 지속시간"이라고 쓰면 거짓이 된다.
 */
import { html } from 'lit-html';
import {
  formatRelativeTime,
  formatTimestampLocal
} from '../../utils/relative-time.js';
import {
  formatUsageTotalWithCost,
  usageTooltip
} from '../../utils/token-usage.js';
import { formatElapsed } from '../worker/running-grid.js';

/**
 * 하트비트가 "살아있음"으로 읽히는 창 (UI-53es §1). 이 안에서 마지막 로그
 * 이벤트가 있었으면 밝은 점, 넘으면 흐린 점 + 경과 텍스트.
 */
export const HEARTBEAT_FRESH_MS = 60_000;

/**
 * @typedef {Object} MonitorRowItem
 * @property {string} id - Bead id.
 * @property {string} title - Bead title (falls back to the id).
 * @property {string|null} [current_child] - 현재 진행중 child 제목; 없으면 줄 생략.
 * @property {number|null} [started_at] - 워커 attempt 시작 시각 (attempt 있을 때만).
 * @property {number|null} [last_event_at] - 마지막 세션 로그 이벤트 시각;
 * 서버가 안 보내면 부재 → 점 생략 (fail-quiet).
 * @property {number|string} [updated_at] - Bead 수정 시각 (attempt 없는 행의 근거).
 * @property {import('../../utils/token-usage.js').UsageRecord|null} [usage] -
 * 이 bead의 attempt 토큰 합계; 없으면 배지 생략.
 * @property {boolean} [has_attempt] - 실행중 워커 attempt가 붙어 있는지.
 */

/**
 * The live heartbeat: 최근이면 활성 점, 오래됐으면 흐린 점 + "N분 전",
 * `last_event_at` 자체가 없으면 아무것도 그리지 않는다 (fail-quiet).
 *
 * @param {number|null|undefined} last_event_at
 * @param {number} now
 * @returns {import('lit-html').TemplateResult|''}
 */
export function heartbeatTemplate(last_event_at, now) {
  if (typeof last_event_at !== 'number' || !Number.isFinite(last_event_at)) {
    return '';
  }
  const age = now - last_event_at;
  const fresh = age < HEARTBEAT_FRESH_MS;
  const title = `마지막 이벤트 ${formatTimestampLocal(last_event_at)}`;
  return html`<span
    class="mon-row__beat${fresh ? ' mon-row__beat--live' : ''}"
    title=${title}
    ><span class="mon-row__beat-dot" aria-hidden="true"></span>${fresh
      ? ''
      : html`<span class="mon-row__beat-age"
          >${formatRelativeTime(last_event_at, now)}</span
        >`}</span
  >`;
}

/**
 * One monitor row.
 *
 * @param {MonitorRowItem} item
 * @param {number} now
 * @returns {import('lit-html').TemplateResult}
 */
export function monitorRowTemplate(item, now) {
  const usage_label = formatUsageTotalWithCost(item.usage);
  const has_attempt = item.has_attempt === true;
  const elapsed =
    has_attempt && typeof item.started_at === 'number'
      ? formatElapsed(now - item.started_at)
      : '';
  const since_update = has_attempt
    ? ''
    : formatRelativeTime(item.updated_at, now);
  return html`<div class="mon-row" data-issue-id=${item.id} role="listitem">
    <span class="mon-row__spine" aria-hidden="true"></span>
    <button type="button" class="mon-row__id" title="상세 열기">
      ${item.id}
    </button>
    <span class="mon-row__title">${item.title || item.id}</span>
    ${item.current_child
      ? html`<span class="mon-row__child" title="현재 진행중 child"
          >└ ${item.current_child}</span
        >`
      : ''}
    <span class="mon-row__live">
      ${elapsed ? html`<span class="mon-row__elapsed">${elapsed}</span>` : ''}
      ${has_attempt ? heartbeatTemplate(item.last_event_at, now) : ''}
      ${since_update
        ? html`<span
            class="mon-row__since"
            title=${`수정 ${formatTimestampLocal(item.updated_at)}`}
            >마지막 갱신 ${since_update}</span
          >`
        : ''}
      ${usage_label
        ? html`<span class="worker-usage" title=${usageTooltip(item.usage)}
            >${usage_label}</span
          >`
        : ''}
    </span>
  </div>`;
}

/**
 * The in_progress group: a dense vertical list, or the empty message.
 *
 * @param {MonitorRowItem[]} items
 * @param {number} [now]
 * @returns {import('lit-html').TemplateResult}
 */
export function monitorGroupTemplate(items, now = Date.now()) {
  const list = Array.isArray(items) ? items : [];
  return html`<section class="mon-group" id="monitor-in-progress">
    <header class="mon-group__hd">
      <span class="mon-group__title">진행중</span>
      <span class="mon-group__count">${list.length}</span>
    </header>
    ${list.length === 0
      ? html`<div class="mon-group__empty">진행중 이슈 없음</div>`
      : html`<div class="mon-group__list" role="list">
          ${list.map((item) => monitorRowTemplate(item, now))}
        </div>`}
  </section>`;
}
