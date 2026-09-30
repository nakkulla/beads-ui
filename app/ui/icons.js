/**
 * Inline icon primitives (UI-dbn6 §4.4). An icon draws in `currentColor` at
 * the surrounding font size, so the screen's text tone and scale apply; `⧉`
 * stays the scope-overlap chip's glyph and is not a copy icon.
 */
import { html, svg } from 'lit-html';

/**
 * Two overlapping sheets — the copy action.
 *
 * @returns {import('lit-html').TemplateResult}
 */
export function copyIcon() {
  return html`<svg
    class="ui-icon"
    viewBox="0 0 16 16"
    width="1em"
    height="1em"
    aria-hidden="true"
    focusable="false"
  >
    ${svg`<rect x="5" y="5" width="9" height="9" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"></rect>
    <path d="M11 3.5V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h.5" fill="none" stroke="currentColor" stroke-width="1.5"></path>`}
  </svg>`;
}
