/**
 * Chip primitive (UI-dbn6 §4.4) for shell-level toggles and filters. A
 * pressed chip carries `aria-pressed="true"`; card chips use `pl-chip`.
 */
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

/**
 * @param {{ label: unknown, op?: string, value?: string, pressed?: boolean, title?: string }} input
 * @returns {import('lit-html').TemplateResult}
 */
export function uiChip(input) {
  return html`<button
    type="button"
    class="ui-chip${input.pressed ? ' is-on' : ''}"
    data-op=${ifDefined(input.op)}
    data-value=${ifDefined(input.value)}
    aria-pressed=${input.pressed ? 'true' : 'false'}
    title=${ifDefined(input.title)}
  >
    ${input.label}
  </button>`;
}
