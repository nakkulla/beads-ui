import { html } from 'lit-html';
import { cardTemplate } from './card.js';

/**
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {import('./card.js').BoardCardIssue} BoardCardIssue
 * @typedef {import('./card.js').BoardCardContext} BoardCardContext
 */

/**
 * @typedef {Object} DeferredPopupModel
 * @property {BoardCardIssue[]} items - Deferred issues, already filtered/sorted.
 * @property {number} count - Live deferred count (the button's badge value).
 */

/**
 * @typedef {Object} DeferredPopupHandlers
 * @property {() => void} onClose
 * @property {(ev: MouseEvent) => void} onOverlayClick
 */

/**
 * The Deferred popup: a native `<dialog>` shell (the repository's dialog
 * pattern) holding the same board cards a column would render. Deferred is a
 * shelf one looks into occasionally, so it gets a modal instead of a permanent
 * column that narrows every other track.
 *
 * The element is rendered only while open, so unmounting it IS closing it —
 * there is no imperative `close()` to keep in sync with the view's state.
 *
 * @param {DeferredPopupModel} model
 * @param {BoardCardContext} card_ctx
 * @param {DeferredPopupHandlers} handlers
 * @returns {TemplateResult}
 */
export function deferredPopupTemplate(model, card_ctx, handlers) {
  return html`
    <dialog
      id="deferred-popup"
      class="deferred-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deferred-popup-title"
      @click=${handlers.onOverlayClick}
      @cancel=${handlers.onClose}
    >
      <div class="deferred-popup__container">
        <header class="deferred-popup__header">
          <div class="deferred-popup__title" id="deferred-popup-title">
            Deferred ${model.count}
          </div>
          <button
            type="button"
            class="deferred-popup__close"
            aria-label="닫기"
            @click=${handlers.onClose}
          >
            ×
          </button>
        </header>
        <div
          class="deferred-popup__body"
          role="list"
          aria-labelledby="deferred-popup-title"
        >
          ${model.items.length === 0
            ? html`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`
            : model.items.map((issue) => cardTemplate(issue, card_ctx))}
        </div>
      </div>
    </dialog>
  `;
}
