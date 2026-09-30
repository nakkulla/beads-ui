/**
 * The fatal error dialog (UI-dbn6 §6, catalog ov-dlg): a backend failure the
 * page cannot recover from by itself (a rejected subscription, a failed load)
 * with its stderr diagnostics, above every other layer (`--z-fatal`).
 * `다시 불러오기 (Reload)` reloads the page, `닫기 (Dismiss)` and Escape close
 * it. Moved from `views/fatal-error-dialog.js` onto the shared dialog
 * primitive (`ui/dialog.js`) with its behaviour and element ids unchanged.
 */
import { html } from 'lit-html';
import { closeDialog, createDialog, showDialog } from '../../ui/dialog.js';
import { render } from '../../ui/render.js';

/**
 * @param {HTMLElement} mount_element - Kept for the call shape; the dialog
 * lives on the body like every other shared dialog.
 * @param {{ reload?: () => void }} [options]
 * @returns {{ open: (title: string, message: string, detail?: string) => void, close: () => void, getElement: () => HTMLDialogElement }}
 */
export function createFatalErrorDialog(mount_element, options = {}) {
  const doc = mount_element.ownerDocument;
  const dialog = createDialog(doc, 'fatal-error-dialog');
  dialog.id = 'fatal-error-dialog';
  dialog.setAttribute('role', 'alertdialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-labelledby', 'fatal-error-title');
  const reload = options.reload || (() => doc.defaultView?.location.reload());

  const close = () => {
    try {
      closeDialog(dialog);
    } catch {
      // A dialog the platform already closed has nothing left to close.
    }
    dialog.removeAttribute('open');
  };

  render(
    html`<div class="fatal-error">
      <div class="fatal-error__icon" aria-hidden="true">⛔</div>
      <div class="fatal-error__body">
        <p class="fatal-error__eyebrow">Critical</p>
        <h2 class="fatal-error__title" id="fatal-error-title">
          Command failed
        </h2>
        <p class="fatal-error__message" id="fatal-error-message"></p>
        <pre class="fatal-error__detail" id="fatal-error-detail" hidden></pre>
        <div class="fatal-error__actions">
          <button
            type="button"
            class="ui-btn ui-btn--ghost"
            id="fatal-error-close"
            @click=${close}
          >
            닫기 (Dismiss)
          </button>
          <button
            type="button"
            class="ui-btn ui-btn--primary"
            id="fatal-error-reload"
            @click=${() => reload()}
          >
            다시 불러오기 (Reload)
          </button>
        </div>
      </div>
    </div>`,
    dialog
  );

  const title_el = /** @type {HTMLElement} */ (
    dialog.querySelector('#fatal-error-title')
  );
  const message_el = /** @type {HTMLElement} */ (
    dialog.querySelector('#fatal-error-message')
  );
  const detail_el = /** @type {HTMLElement} */ (
    dialog.querySelector('#fatal-error-detail')
  );

  /**
   * @param {string} title
   * @param {string} message
   * @param {string} [detail]
   */
  const open = (title, message, detail = '') => {
    title_el.textContent = title || 'Unexpected Error';
    message_el.textContent = message || 'An unrecoverable error occurred.';
    const detail_text = typeof detail === 'string' ? detail.trim() : '';
    if (detail_text.length > 0) {
      detail_el.textContent = detail_text;
      detail_el.removeAttribute('hidden');
    } else {
      detail_el.textContent = 'No additional diagnostics available.';
      detail_el.setAttribute('hidden', '');
    }
    try {
      showDialog(dialog);
    } catch {
      // `showModal` refuses a disconnected or already-modal dialog.
    }
    dialog.setAttribute('open', '');
  };

  dialog.addEventListener('cancel', (ev) => {
    ev.preventDefault();
    close();
  });

  return {
    open,
    close,
    getElement() {
      return dialog;
    }
  };
}
