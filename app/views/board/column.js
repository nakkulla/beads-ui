import { html } from 'lit-html';
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
 * @property {boolean} [is_closed] - Renders as the collapsible Closed strip.
 * @property {boolean} [collapsed] - Closed strip collapse state.
 */

/**
 * @typedef {BoardCardContext & { onClosedToggle: (ev: Event) => void }} BoardColumnContext
 */

/**
 * Render one board column. The Closed column is a collapsible strip: collapsed
 * by default (vertical "Closed · N"), expandable to show recent items.
 *
 * @param {BoardColumnModel} col
 * @param {BoardColumnContext} ctx
 * @returns {TemplateResult}
 */
export function columnTemplate(col, ctx) {
  const count = Array.isArray(col.items) ? col.items.length : 0;
  const is_closed = col.is_closed === true;
  const collapsed = is_closed && col.collapsed === true;
  const section_class = is_closed
    ? `board-column board-column--closed${collapsed ? ' is-collapsed' : ''}`
    : 'board-column';
  const header_label = collapsed ? `${col.title} · ${count}` : col.title;
  return html`
    <section class=${section_class} id=${col.id}>
      <header
        class="board-column__header"
        id=${col.id + '-header'}
        role="heading"
        aria-level="2"
        @click=${is_closed ? ctx.onClosedToggle : undefined}
      >
        <div class="board-column__title">
          <span class="board-column__title-text">${header_label}</span>
          ${collapsed
            ? ''
            : html`<span class="board-column__count" aria-label=${`${count}건`}
                >${count}</span
              >`}
        </div>
      </header>
      ${collapsed
        ? ''
        : html`<div
            class="board-column__body"
            role="list"
            aria-labelledby=${col.id + '-header'}
          >
            ${col.items.map((issue) => cardTemplate(issue, ctx))}
          </div>`}
    </section>
  `;
}
