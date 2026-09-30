/**
 * Labelled switch primitive (UI-dbn6 design-system round, `.ui-toggle` in
 * `primitives.css`). A fine pointer gets a button with a track whose
 * `aria-pressed` is the current state; a coarse pointer gets the state-only
 * dot — the caller decides, because only it knows whether a 44px target fits.
 */
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

/**
 * @param {{ label: string, on: boolean, op?: string, root_dir?: string, aria_label: string, title?: string, cls?: string, state_only?: boolean }} input
 * @returns {import('lit-html').TemplateResult}
 */
export function uiToggle(input) {
  const cls = `ui-toggle${input.on ? ' is-on' : ''}${
    input.state_only ? ' is-state' : ''
  }${input.cls ? ` ${input.cls}` : ''}`;
  if (input.state_only) {
    return html`<span
      class=${cls}
      role="img"
      aria-label=${input.aria_label}
      title=${ifDefined(input.title)}
      ><span class="ui-toggle__track" aria-hidden="true"></span
      >${input.label}</span
    >`;
  }
  return html`<button
    type="button"
    class=${cls}
    data-op=${ifDefined(input.op)}
    data-root-dir=${ifDefined(input.root_dir)}
    aria-pressed=${input.on ? 'true' : 'false'}
    aria-label=${input.aria_label}
    title=${ifDefined(input.title)}
  >
    <span class="ui-toggle__track" aria-hidden="true"></span>${input.label}
  </button>`;
}
