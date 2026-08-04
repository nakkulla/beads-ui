import { html } from 'lit-html';
import { renderMarkdown } from '../../utils/markdown.js';
import { parseReport } from '../../utils/report-marker.js';

/**
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */

/**
 * @typedef {import('../../utils/report-marker.js').ParsedReport} ParsedReport
 */

/**
 * `bd comments <id> --json` 항목. `created_at`은 ISO 문자열이다.
 *
 * @typedef {Object} IssueComment
 * @property {string} id
 * @property {string} [issue_id]
 * @property {string} [author]
 * @property {string} [text]
 * @property {string} [created_at]
 */

/**
 * @typedef {Object} CommentsHandlers
 * @property {(id: string) => void} [onToggle] - Collapse/expand one report card.
 * @property {(value: string) => void} [onDraftInput]
 * @property {() => void} [onSubmit]
 */

/**
 * @typedef {Object} CommentsView
 * @property {Set<string>} [expanded] - Comment ids whose report is open.
 * @property {string} [draft]
 * @property {boolean} [sending]
 * @property {boolean} [error] - A failed `get-comments`.
 */

/** 헤더에 그대로 흘려 쓰기엔 긴 식별자를 자르는 지점. 전체는 `title`에 남는다. */
const IDENTIFIER_MAX = 20;

/**
 * `MM-DD HH:MM` 로컬 시각. 상세 패널의 다른 시각 표시와 같은 기준이다.
 *
 * @param {string|number|null|undefined} value
 * @returns {string}
 */
function shortStamp(value) {
  if (value === null || value === undefined || value === '') {
    return '';
  }
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) {
    return '';
  }
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');
  return `${mm}-${dd} ${hh}:${mi}`;
}

/**
 * @param {string} identifier
 * @returns {string}
 */
function shortIdentifier(identifier) {
  return identifier.length > IDENTIFIER_MAX
    ? `${identifier.slice(0, IDENTIFIER_MAX)}…`
    : identifier;
}

/**
 * One report card. The only sentence that has to read while collapsed is the
 * conclusion, so the 「작업 보고서」 title is pressed down into the meta line and
 * the conclusion is the largest text on the card.
 *
 * @param {IssueComment} comment
 * @param {ParsedReport} report
 * @param {CommentsHandlers} handlers
 * @param {boolean} open
 * @returns {TemplateResult}
 */
function reportTemplate(comment, report, handlers, open) {
  const lane_label = `${report.lane} ${shortIdentifier(report.identifier)}`;
  return html`<div class="detail-report">
    <button
      type="button"
      class="detail-report__head"
      data-comment-id=${comment.id}
      aria-expanded=${open ? 'true' : 'false'}
      @click=${() => handlers.onToggle && handlers.onToggle(comment.id)}
    >
      <span class="detail-report__tri">${open ? '▾' : '▸'}</span>
      <span class="detail-report__glyph">🤖</span>
      <span class="detail-report__meta">
        <span class="detail-report__kind">작업 보고서</span>
        <span
          class="detail-report__lane${report.lane === 'worker'
            ? ' detail-report__lane--worker'
            : ''}"
          title=${`${report.lane} ${report.identifier} · ${report.timestamp}`}
          >${lane_label}</span
        >
        <span class="detail-report__time">${shortStamp(report.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${report.conclusion}</span>
    </button>
    ${open && report.body.length > 0
      ? html`<div class="detail-report__body">
          ${renderMarkdown(report.body)}
        </div>`
      : ''}
  </div>`;
}

/**
 * A human-written comment: no card and no collapse, but Markdown all the same —
 * leaving one side plain would split rendering inside a single list.
 *
 * @param {IssueComment} comment
 * @returns {TemplateResult}
 */
function plainCommentTemplate(comment) {
  return html`<div class="detail-comment" data-comment-id=${comment.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${comment.author || '(작성자 없음)'}</span
      >
      <span class="detail-comment__time"
        >${shortStamp(comment.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${renderMarkdown(typeof comment.text === 'string' ? comment.text : '')}
    </div>
  </div>`;
}

/**
 * Comments section of the issue detail panel (UI-ucq6 §변경 2). It sits right
 * below 「설명」 so the result reads directly after the request.
 *
 * The section renders at zero comments too: it carries the compose box, and a
 * section that disappears leaves no way to write the first comment.
 *
 * @param {IssueComment[]|null|undefined} comments
 * @param {CommentsHandlers} [handlers]
 * @param {CommentsView} [view]
 * @returns {TemplateResult}
 */
export function commentsTemplate(comments, handlers = {}, view = {}) {
  const list = Array.isArray(comments) ? comments.filter(Boolean) : [];
  const expanded = view.expanded || new Set();
  const draft = typeof view.draft === 'string' ? view.draft : '';
  const sending = view.sending === true;
  const sorted = list
    .slice()
    .sort((a, b) =>
      String(b.created_at || '').localeCompare(String(a.created_at || ''))
    );

  return html`
    <div class="detail-section-label">댓글 (${list.length})</div>
    ${view.error
      ? html`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`
      : sorted.length === 0
        ? html`<div class="detail-empty" data-seam="comments">댓글 없음</div>`
        : html`<div class="detail-comments" data-seam="comments">
            ${sorted.map((c) => {
              const report = parseReport(
                typeof c.text === 'string' ? c.text : ''
              );
              return report
                ? reportTemplate(c, report, handlers, expanded.has(c.id))
                : plainCommentTemplate(c);
            })}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${sending}
        .value=${draft}
        @input=${(/** @type {Event} */ ev) =>
          handlers.onDraftInput &&
          handlers.onDraftInput(
            /** @type {HTMLTextAreaElement} */ (ev.target).value
          )}
      ></textarea>
      <div class="detail-comment-compose__row">
        <button
          type="button"
          class="detail-comment-compose__btn"
          ?disabled=${sending || draft.trim().length === 0}
          @click=${() => handlers.onSubmit && handlers.onSubmit()}
        >
          댓글 추가
        </button>
      </div>
    </div>
  `;
}
