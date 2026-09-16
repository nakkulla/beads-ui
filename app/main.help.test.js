import { describe, expect, test, vi } from 'vitest';
import { bootstrap } from './main.js';

// Polyfill <dialog> for jsdom
if (typeof HTMLDialogElement !== 'undefined') {
  const proto = /** @type {any} */ (HTMLDialogElement.prototype);
  if (typeof proto.showModal !== 'function') {
    proto.showModal = function showModal() {
      this.setAttribute('open', '');
    };
    proto.close = function close() {
      this.removeAttribute('open');
    };
  }
}

vi.mock('./ws.js', () => ({
  createWsClient: () => ({
    async send() {
      return null;
    },
    on() {
      return () => {};
    },
    close() {},
    getState() {
      return 'open';
    }
  })
}));

const HEADER =
  '<header class="app-header"><div class="header-actions">' +
  '<button id="help-btn" type="button">?</button>' +
  '</div></header><main id="app"></main>';

/** @returns {HTMLElement} - The bootstrapped app root element. */
function boot() {
  document.body.innerHTML = HEADER;
  const root = /** @type {HTMLElement} */ (document.getElementById('app'));
  bootstrap(root);
  return root;
}

describe('UI-8gem help legend entry points', () => {
  test('header button opens the legend', async () => {
    const root = boot();
    await Promise.resolve();

    /** @type {HTMLButtonElement} */ (
      document.getElementById('help-btn')
    ).click();
    await Promise.resolve();

    expect(
      /** @type {HTMLDialogElement|null} */ (
        root.querySelector('dialog.help-dialog')
      )?.hasAttribute('open')
    ).toBe(true);
  });

  test('? key opens the legend', async () => {
    const root = boot();
    await Promise.resolve();

    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: '?', bubbles: true })
    );
    await Promise.resolve();

    expect(
      /** @type {HTMLDialogElement|null} */ (
        root.querySelector('dialog.help-dialog')
      )?.hasAttribute('open')
    ).toBe(true);
  });

  test('? key stays quiet while another dialog is open', async () => {
    const root = boot();
    await Promise.resolve();
    const other = document.createElement('dialog');
    other.setAttribute('open', '');
    document.body.appendChild(other);

    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: '?', bubbles: true })
    );
    await Promise.resolve();

    expect(
      /** @type {HTMLDialogElement|null} */ (
        root.querySelector('dialog.help-dialog')
      )?.hasAttribute('open')
    ).toBe(false);
  });
});
