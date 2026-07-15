import { html, render } from 'lit-html';

/** localStorage key holding the WS/REST auth token. */
export const TOKEN_STORAGE_KEY = 'bdui:auth-token';

/**
 * Create and manage the auth-token prompt dialog (native <dialog>). Shown when
 * the server rejects the connection for lack of a valid token. On submit the
 * entered token is persisted to `localStorage['bdui:auth-token']` and the
 * provided `onSubmit` callback fires so the caller can reconnect.
 *
 * @param {HTMLElement} mount_element - Container to attach the dialog to.
 * @param {{ onSubmit?: (token: string) => void }} [options]
 * @returns {{ open: () => void, close: () => void, getElement: () => HTMLDialogElement }}
 */
export function createTokenDialog(mount_element, options = {}) {
  const onSubmit =
    typeof options.onSubmit === 'function' ? options.onSubmit : () => {};

  const dialog = /** @type {HTMLDialogElement} */ (
    document.createElement('dialog')
  );
  dialog.id = 'token-dialog';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  mount_element.appendChild(dialog);

  const close = () => {
    if (typeof dialog.close === 'function') {
      try {
        dialog.close();
      } catch {
        // ignore close errors
      }
    }
    dialog.removeAttribute('open');
  };

  /**
   * @param {Event} ev
   */
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const input = /** @type {HTMLInputElement | null} */ (
      dialog.querySelector('#token-input')
    );
    const error_box = dialog.querySelector('#token-error');
    const token = input && input.value ? input.value.trim() : '';
    if (!token) {
      if (error_box) {
        error_box.textContent = 'Token is required.';
      }
      return;
    }
    try {
      window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } catch {
      // ignore storage errors; still hand the token to the caller
    }
    onSubmit(token);
    close();
  };

  const template = html`
    <div class="token-dialog__container">
      <form class="token-dialog__form" @submit=${handleSubmit}>
        <h2 class="token-dialog__title" id="token-title">
          Authentication required
        </h2>
        <p class="token-dialog__message">
          Enter the server auth token to connect.
        </p>
        <label for="token-input">Token</label>
        <input
          id="token-input"
          name="token"
          type="password"
          autocomplete="off"
          required
        />
        <div
          class="token-dialog__error"
          id="token-error"
          role="status"
          aria-live="polite"
        ></div>
        <div class="token-dialog__actions">
          <button type="submit" id="token-submit">Save &amp; reconnect</button>
        </div>
      </form>
    </div>
  `;
  render(template, dialog);

  const open = () => {
    if (typeof dialog.showModal === 'function') {
      try {
        dialog.showModal();
        dialog.setAttribute('open', '');
      } catch {
        dialog.setAttribute('open', '');
      }
    } else {
      dialog.setAttribute('open', '');
    }
  };

  return {
    open,
    close,
    getElement() {
      return dialog;
    }
  };
}
