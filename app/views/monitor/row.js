/**
 * Monitor tab row + section templates (UI-nprg).
 *
 * 관제 한 줄: 단계색 스파인 · 레포 뱃지 · 버드 ID · 제목 · 우측 라이브 지표.
 * 지표는 레인마다 다른 것을 말한다 — 실행중은 살아있음(하트비트·경과·모델·토큰),
 * PR 대기는 PR 번호, 대기는 큐 순번, 완료는 완료 종류와 시각. 값이 없으면 그
 * 자리를 비운다(fail-quiet): 없는 지표를 추측해 그리면 없는 사실을 만든다.
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
 * Pipeline stage headings, in the order they are drawn — 배열 순서가 곧 화면
 * 순서다.
 *
 * @type {ReadonlyArray<{ lane: 'running'|'pr_wait'|'queue'|'done', title: string }>}
 */
export const MONITOR_SECTIONS = [
  { lane: 'running', title: '실행중' },
  { lane: 'pr_wait', title: 'PR 대기' },
  { lane: 'queue', title: '대기' },
  { lane: 'done', title: '완료·오늘' }
];

/**
 * 완료 종류의 표시 이름. 여기 없는 종류는 서버가 준 문자열 그대로 싣고 warn
 * 색으로 읽힌다 — 모르는 종료를 "정상"으로 칠하지 않는다.
 *
 * @type {Record<string, string>}
 */
const DONE_KIND_LABELS = {
  auto_merge: '자동 머지',
  merged: '머지',
  merge: '머지',
  pr_stop: 'PR 중단',
  stopped: '중단',
  failed: '실패'
};

/**
 * Kinds that read as a clean finish; 나머지는 전부 warn 색으로 그린다.
 *
 * @type {ReadonlySet<string>}
 */
const DONE_KIND_SUCCESS = new Set(['auto_merge', 'merged', 'merge', 'done']);

/**
 * @typedef {Object} MonitorRowItem
 * @property {string} id - Bead id.
 * @property {string} title - Bead title (falls back to the id).
 * @property {string} root_dir - Owning workspace root (행 클릭의 전환 대상).
 * @property {string} workspace_name - 레포 뱃지에 쓰는 workspace 이름.
 * @property {'running'|'pr_wait'|'queue'|'done'} lane - 배타 우선순위가 정한, 이 행이 그려질 단 하나의 섹션 (running > pr_wait > queue > done).
 * @property {number|null} [started_at] - 실행중 attempt 시작 시각.
 * @property {number|null} [last_event_at] - 하트비트의 근거 — 서버가 attempt 세션 로그에서 관측한 마지막 줄의 시각.
 * @property {string|null} [model] - 실행중 attempt의 모델.
 * @property {import('../../utils/token-usage.js').UsageRecord|null} [usage] - 이 버드 attempt들이 지금까지 쓴 토큰; 없으면 배지 생략.
 * @property {number|null} [pr_number] - 관측된 PR 번호.
 * @property {boolean} [external] - 워커가 아닌 세션이 만든 외부 PR인지.
 * @property {number|null} [queue_position] - 대기 레인의 1-based 디스패치 순번.
 * @property {number|null} [done_at] - 완료 레인 진입 시각; Worker 탭이 쓰는 완료 시각과 같은 값.
 * @property {string|null} [done_kind] - 완료 종류 (매칭 attempt 없으면 null).
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
 * Right-hand metrics — 레인마다 읽는 사람이 알아야 할 것이 다르다.
 *
 * @param {MonitorRowItem} item
 * @param {number} now
 * @returns {import('lit-html').TemplateResult}
 */
function liveTemplate(item, now) {
  if (item.lane === 'running') {
    const elapsed =
      typeof item.started_at === 'number'
        ? formatElapsed(now - item.started_at)
        : '';
    const usage_label = formatUsageTotalWithCost(item.usage);
    return html`<span class="mon-row__live">
      ${heartbeatTemplate(item.last_event_at, now)}
      ${elapsed ? html`<span class="mon-row__elapsed">${elapsed}</span>` : ''}
      ${item.model
        ? html`<span class="mon-row__model">${item.model}</span>`
        : ''}
      ${usage_label
        ? html`<span class="worker-usage" title=${usageTooltip(item.usage)}
            >${usage_label}</span
          >`
        : ''}
    </span>`;
  }
  if (item.lane === 'pr_wait') {
    return html`<span class="mon-row__live">
      ${item.external ? html`<span class="mon-row__chip">외부 PR</span>` : ''}
      ${typeof item.pr_number === 'number'
        ? html`<span class="mon-row__pr">#${item.pr_number}</span>`
        : ''}
    </span>`;
  }
  if (item.lane === 'queue') {
    return html`<span class="mon-row__live">
      ${typeof item.queue_position === 'number'
        ? html`<span class="mon-row__pos">#${item.queue_position}</span>`
        : ''}
    </span>`;
  }
  const kind = item.done_kind || '';
  const kind_label = kind ? DONE_KIND_LABELS[kind] || kind : '';
  const ok = DONE_KIND_SUCCESS.has(kind);
  return html`<span class="mon-row__live">
    ${kind_label
      ? html`<span
          class="mon-row__kind${ok
            ? ' mon-row__kind--ok'
            : ' mon-row__kind--warn'}"
          >${kind_label}</span
        >`
      : ''}
    ${typeof item.done_at === 'number'
      ? html`<span
          class="mon-row__done-at"
          title=${`완료 ${formatTimestampLocal(item.done_at)}`}
          >${formatRelativeTime(item.done_at, now)}</span
        >`
      : ''}
  </span>`;
}

/**
 * One monitor row.
 *
 * @param {MonitorRowItem} item
 * @param {number} now
 * @returns {import('lit-html').TemplateResult}
 */
export function monitorRowTemplate(item, now) {
  return html`<div
    class="mon-row mon-row--${item.lane}"
    data-issue-id=${item.id}
    data-root-dir=${item.root_dir}
    role="listitem"
  >
    <span class="mon-row__spine" aria-hidden="true"></span>
    <span class="mon-row__repo" title=${item.root_dir}
      >${item.workspace_name}</span
    >
    <button type="button" class="mon-row__id" title="상세 열기">
      ${item.id}
    </button>
    <span class="mon-row__title">${item.title || item.id}</span>
    ${liveTemplate(item, now)}
  </div>`;
}

/**
 * One pipeline stage section. 빈 섹션은 호출부에서 걸러지므로 여기서는 항상
 * 행이 하나 이상이다.
 *
 * @param {{ lane: string, title: string, items: MonitorRowItem[] }} section
 * @param {number} now
 * @returns {import('lit-html').TemplateResult}
 */
export function monitorSectionTemplate(section, now) {
  return html`<section
    class="mon-group mon-group--${section.lane}"
    id=${`monitor-${section.lane}`}
  >
    <header class="mon-group__hd">
      <span class="mon-group__title">${section.title}</span>
      <span class="mon-group__count">${section.items.length}</span>
    </header>
    <div class="mon-group__list" role="list">
      ${section.items.map((item) => monitorRowTemplate(item, now))}
    </div>
  </section>`;
}

/**
 * The whole monitor body: the non-empty sections in pipeline order, or one
 * empty line.
 *
 * @param {Array<{ lane: string, title: string, items: MonitorRowItem[] }>} sections
 * @param {number} [now]
 * @returns {import('lit-html').TemplateResult}
 */
export function monitorPipelineTemplate(sections, now = Date.now()) {
  const filled = (Array.isArray(sections) ? sections : []).filter(
    (section) => section.items.length > 0
  );
  if (filled.length === 0) {
    return html`<div class="mon-group__empty">진행 중인 워커 작업 없음</div>`;
  }
  return html`<div class="mon-pipeline">
    ${filled.map((section) => monitorSectionTemplate(section, now))}
  </div>`;
}
