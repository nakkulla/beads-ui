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

// Capture calls and provide simple responses
const calls = /** @type {Array<{ type: string, payload: any }>} */ ([]);
vi.mock('./core/ws.js', () => ({
  createWsClient: () => ({
    /**
     * @param {string} type
     * @param {any} payload
     */
    async send(type, payload) {
      if (type === 'create-issue') {
        calls.push({ type, payload });
        return { created: true };
      }
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

describe('UI-106 new issue flow', () => {
  test('button opens dialog', async () => {
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));
    bootstrap(root);
    await Promise.resolve();
    // UI-dbn6 §3.1: the shell header owns the 새 이슈 button.
    const btn = /** @type {HTMLButtonElement} */ (
      document.querySelector('#app-header [data-op="new-issue"]')
    );
    btn.click();
    await Promise.resolve();
    const dlg = /** @type {HTMLDialogElement} */ (
      document.getElementById('new-issue-dialog')
    );
    expect(dlg).not.toBeNull();
    expect(dlg.hasAttribute('open')).toBe(true);
  });

  test('Ctrl+N opens dialog', async () => {
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));
    bootstrap(root);
    await Promise.resolve();
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'n', ctrlKey: true, bubbles: true })
    );
    await Promise.resolve();
    const dlg = /** @type {HTMLDialogElement} */ (
      document.getElementById('new-issue-dialog')
    );
    expect(dlg.hasAttribute('open')).toBe(true);
  });

  test('submit dispatches create-issue', async () => {
    calls.length = 0;
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));
    bootstrap(root);
    await Promise.resolve();

    // Open dialog
    // UI-dbn6 §3.1: the shell header owns the 새 이슈 button.
    const btn = /** @type {HTMLButtonElement} */ (
      document.querySelector('#app-header [data-op="new-issue"]')
    );
    btn.click();
    await Promise.resolve();

    // Fill form
    const title = /** @type {HTMLInputElement} */ (
      document.getElementById('new-title')
    );
    const labels = /** @type {HTMLInputElement} */ (
      document.getElementById('new-labels')
    );
    title.value = 'Create me';
    labels.value = 'alpha, beta';

    // Submit via Ctrl+Enter
    const dlg = /** @type {HTMLDialogElement} */ (
      document.getElementById('new-issue-dialog')
    );
    dlg.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Enter',
        ctrlKey: true,
        bubbles: true
      })
    );
    await Promise.resolve();
    await Promise.resolve();
    await new Promise((r) => setTimeout(r, 0));

    // Expect the create-issue mutation to be dispatched
    const types = calls.map((c) => c.type);
    expect(types).toContain('create-issue');
  });
});
