/**
 * The issue detail panel's "Worker 이력" section (record-timeline-retention
 * §9).
 *
 * The bead's WHOLE timeline, newest first. The failure tile carries only the
 * last five lines — enough to answer "무엇이 이 시도를 끝냈나" — while this
 * section answers "이 bead에 무슨 일이 있었나", and truncating it would leave
 * that question with no surface at all. The list is revealed progressively
 * instead, because a long-running bead has hundreds of lines and a reader
 * opening an issue is asking about the recent ones.
 *
 * Fail-quiet: a bead with no events renders NOTHING — no heading, no empty
 * state. `queue.json` no longer holds finished attempts, so "이력 없음" here
 * would be indistinguishable from "아직 물어보지 않았다" while the reply is in
 * flight, and an empty shell that flickers into a list is worse than a section
 * that simply appears.
 */
import { html } from 'lit-html';

/**
 * How many lines the section shows before the first 더 보기, and how many each
 * click adds. One screenful either way: the reveal exists to keep a long
 * history from pushing the rest of the panel off-screen, not to page through it
 * a handful at a time.
 *
 * @type {number}
 */
export const WORKER_TIMELINE_PAGE = 10;

/**
 * @typedef {Object} WorkerTimelineEvent
 * @property {string} event_id
 * @property {number} [at]
 * @property {string} kind
 * @property {string} summary
 */

/**
 * @typedef {Object} WorkerTimelineState
 * @property {WorkerTimelineEvent[]} events - Newest first, as the server sends.
 * @property {number} [shown] - How many are currently revealed.
 */

/**
 * `MM-DD HH:MM` — the history spans days, so a time alone would put two
 * different days' lines in the same column and read as one session.
 *
 * @param {unknown} at
 * @returns {string}
 */
function eventTimeText(at) {
  if (typeof at !== 'number' || !Number.isFinite(at)) {
    return '';
  }
  const d = new Date(at);
  const pad = (/** @type {number} */ n) => String(n).padStart(2, '0');
  return `${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(
    d.getMinutes()
  )}`;
}

/**
 * @param {WorkerTimelineState} state
 * @param {{ onMore?: () => void }} [handlers]
 * @returns {import('lit-html').TemplateResult|''}
 */
export function workerTimelineTemplate(state, handlers = {}) {
  const events = Array.isArray(state?.events) ? state.events : [];
  const usable = events.filter(
    (event) =>
      event &&
      typeof event.summary === 'string' &&
      event.summary.trim().length > 0
  );
  if (usable.length === 0) {
    return '';
  }
  const shown =
    typeof state.shown === 'number' && state.shown > 0
      ? state.shown
      : WORKER_TIMELINE_PAGE;
  const visible = usable.slice(0, shown);
  const remaining = usable.length - visible.length;
  return html`
    <div class="detail-section-label">Worker 이력 (${usable.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${visible.map(
        (event) =>
          html`<li class="detail-timeline__row">
            ${eventTimeText(event.at)
              ? html`<span class="detail-timeline__at"
                  >${eventTimeText(event.at)}</span
                >`
              : ''}
            <span class="detail-timeline__summary">${event.summary}</span>
          </li>`
      )}
    </ol>
    ${remaining > 0
      ? html`<button
          type="button"
          class="detail-timeline__more"
          data-seam="worker-timeline-more"
          @click=${() => handlers.onMore && handlers.onMore()}
        >
          더 보기 (${remaining})
        </button>`
      : ''}
  `;
}
