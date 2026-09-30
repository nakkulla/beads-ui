/**
 * Copy primitive (UI-dbn6 §4.4): put a value on the clipboard and say so in
 * the one toast stack — `복사됨`, or `복사 실패` when the clipboard refused —
 * and the button that does it on click. Screens copy through this seam
 * instead of each wiring the clipboard and its toast again.
 */
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { copyToClipboard } from '../utils/clipboard.js';
import { showToast } from './toast.js';

/**
 * @param {string} text
 * @returns {Promise<boolean>} Whether the value landed on the clipboard.
 */
export async function copyWithToast(text) {
  const ok = await copyToClipboard(text);
  if (ok) {
    showToast('복사됨', 'success', 1200);
  } else {
    showToast('복사 실패', 'error', 1600);
  }
  return ok;
}

/**
 * A button that copies `value` on click. `cls` adds a screen class for
 * placement; the look is the primitive's.
 *
 * @param {{ label: unknown, value: string, title?: string, aria_label?: string, cls?: string }} input
 * @returns {import('lit-html').TemplateResult}
 */
export function copyButton(input) {
  return html`<button
    type="button"
    class="ui-copy${input.cls ? ` ${input.cls}` : ''}"
    title=${ifDefined(input.title)}
    aria-label=${ifDefined(input.aria_label)}
    @click=${(/** @type {Event} */ ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      void copyWithToast(input.value);
    }}
  >
    ${input.label}
  </button>`;
}
