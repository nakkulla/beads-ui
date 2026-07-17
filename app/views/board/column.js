import { html } from 'lit-html';
import { CLOSED_RANGE_OPTIONS } from '../../data/closed-range.js';
import { cardTemplate } from './card.js';

/**
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {import('./card.js').BoardCardIssue} BoardCardIssue
 * @typedef {import('./card.js').BoardCardContext} BoardCardContext
 */

/**
 * @typedef {Object} BoardColumnModel
 * @property {string} title
 * @property {string} id - DOM id, e.g. "ready-col".
 * @property {BoardCardIssue[]} items
 * @property {boolean} [is_closed] - Renders the Closed column (period select).
 * @property {string} [closed_range] - Current Closed period ('today'|'7d'|'30d'|'all').
 */

/**
 * @typedef {BoardCardContext & { onClosedRangeChange?: (ev: Event) => void }} BoardColumnContext
 */

/**
 * Render one board column. The Closed column carries a period dropdown in its
 * header (오늘/최근 7일/최근 30일/전체) that drives server-side `since` filtering;
 * all other columns render identically.
 *
 * @param {BoardColumnModel} col
 * @param {BoardColumnContext} ctx
 * @returns {TemplateResult}
 */
export function columnTemplate(col, ctx) {
  const count = Array.isArray(col.items) ? col.items.length : 0;
  const is_closed = col.is_closed === true;
  const section_class = is_closed
    ? 'board-column board-column--closed'
    : 'board-column';
  return html`
    <section class=${section_class} id=${col.id}>
      <header
        class="board-column__header"
        id=${col.id + '-header'}
        role="heading"
        aria-level="2"
      >
        <div class="board-column__title">
          <span class="board-column__title-text">${col.title}</span>
          <span class="board-column__count" aria-label=${`${count}건`}
            >${count}</span
          >
        </div>
        ${is_closed
          ? html`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${ctx.onClosedRangeChange}
            >
              ${CLOSED_RANGE_OPTIONS.map(
                (opt) =>
                  html`<option
                    value=${opt.value}
                    ?selected=${opt.value === col.closed_range}
                  >
                    ${opt.label}
                  </option>`
              )}
            </select>`
          : ''}
      </header>
      <div
        class="board-column__body"
        role="list"
        aria-labelledby=${col.id + '-header'}
      >
        ${col.items.map((issue) => cardTemplate(issue, ctx))}
      </div>
    </section>
  `;
}
