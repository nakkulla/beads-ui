/**
 * The sheet primitive (UI-dbn6 §3.6): a bottom sheet on a narrow viewport and
 * a centered panel from 720px, over a dimmed backdrop. Opening animates for
 * 200ms and `prefers-reduced-motion` opens instantly (CSS in `base.css`).
 * Closing is a delegated `data-op="sheet-close"` click (✕ or backdrop) — the
 * owner keeps the open state, the sheet is only markup.
 */
import { html } from 'lit-html';

/**
 * @param {{ title: string, body: unknown, label?: string }} input
 * @returns {import('lit-html').TemplateResult}
 */
export function sheetTemplate(input) {
  return html`<div class="ui-sheet" role="presentation">
    <div class="ui-sheet__backdrop" data-op="sheet-close"></div>
    <section
      class="ui-sheet__panel"
      role="dialog"
      aria-modal="true"
      aria-label=${input.label || input.title}
    >
      <div class="ui-sheet__grab" aria-hidden="true"></div>
      <header class="ui-sheet__head">
        <h2 class="ui-sheet__title">${input.title}</h2>
        <button
          type="button"
          class="ui-btn ui-btn--icon"
          data-op="sheet-close"
          aria-label="닫기"
        >
          ✕
        </button>
      </header>
      <div class="ui-sheet__body">${input.body}</div>
    </section>
  </div>`;
}
