/**
 * Button primitive (UI-dbn6 §4.4). `ui-btn` is the shell's control: 44px tall
 * on a coarse pointer, `--accent` only on the primary tone. Screen-level card
 * ops use their own `pl-op` class; this is for the shell, toolbar and sheets.
 */
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

/**
 * @param {{ label: unknown, op?: string, tone?: 'primary'|'danger'|'ghost'|'plain'|'icon', title?: string, disabled?: boolean, pressed?: boolean, cls?: string, root_dir?: string, value?: string }} input
 * @returns {import('lit-html').TemplateResult}
 */
export function uiButton(input) {
  return html`<button
    type="button"
    class="ui-btn ui-btn--${input.tone || 'plain'}${input.cls
      ? ` ${input.cls}`
      : ''}"
    data-op=${ifDefined(input.op)}
    data-root-dir=${ifDefined(input.root_dir)}
    data-value=${ifDefined(input.value)}
    aria-pressed=${ifDefined(
      typeof input.pressed === 'boolean'
        ? input.pressed
          ? 'true'
          : 'false'
        : undefined
    )}
    title=${ifDefined(input.title)}
    ?disabled=${input.disabled === true}
  >
    ${input.label}
  </button>`;
}
