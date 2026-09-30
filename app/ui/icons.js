/**
 * Inline icon primitives (UI-dbn6 §4.4, design-system round). An icon draws
 * in `currentColor` at the surrounding font size (`.ui-icon`), so the
 * screen's text tone and scale apply. Glyph rule: copy actions use
 * `copyIcon`, never a glyph — `⧉` belongs to the scope-overlap chip alone,
 * `◐` to sessions alone; the theme toggle is the sun/moon icon.
 */
import { html, svg } from 'lit-html';

/**
 * @param {import('lit-html').SVGTemplateResult} body
 * @returns {import('lit-html').TemplateResult}
 */
function icon(body) {
  return html`<svg
    class="ui-icon"
    viewBox="0 0 16 16"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    ${body}
  </svg>`;
}

/**
 * Two overlapping sheets — the copy action.
 *
 * @returns {import('lit-html').TemplateResult}
 */
export function copyIcon() {
  return icon(
    svg`<rect x="5.5" y="5.5" width="8" height="8" rx="1.5"></rect><path d="M10.5 3.5V3.25A1.25 1.25 0 0 0 9.25 2h-5A1.25 1.25 0 0 0 3 3.25v5A1.25 1.25 0 0 0 4.25 9.5h.25"></path>`
  );
}

/**
 * A sun — shown while the dark theme is on (click → light).
 *
 * @returns {import('lit-html').TemplateResult}
 */
export function sunIcon() {
  return icon(
    svg`<circle cx="8" cy="8" r="3"></circle><path d="M8 1.5v1.25M8 13.25v1.25M1.5 8h1.25M13.25 8h1.25M3.4 3.4l.9.9M11.7 11.7l.9.9M3.4 12.6l.9-.9M11.7 4.3l.9-.9"></path>`
  );
}

/**
 * A crescent moon — shown while the light theme is on (click → dark).
 *
 * @returns {import('lit-html').TemplateResult}
 */
export function moonIcon() {
  return icon(
    svg`<path d="M13.2 9.6A5.4 5.4 0 0 1 6.4 2.8a5.4 5.4 0 1 0 6.8 6.8Z"></path>`
  );
}

/**
 * The settings gear.
 *
 * @returns {import('lit-html').TemplateResult}
 */
export function gearIcon() {
  return icon(
    svg`<circle cx="8" cy="8" r="2"></circle><path d="M8 1.75v1.5M8 12.75v1.5M1.75 8h1.5M12.75 8h1.5M3.6 3.6l1.05 1.05M11.35 11.35l1.05 1.05M3.6 12.4l1.05-1.05M11.35 4.65l1.05-1.05"></path>`
  );
}
