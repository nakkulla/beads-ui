import { describe, expect, test, vi } from 'vitest';
import { bootstrap } from './main.js';

/** Every ws op the shell sent, in order. */
const sent = /** @type {string[]} */ ([]);

vi.mock('./ws.js', () => ({
  createWsClient: () => ({
    /**
     * @param {string} type
     */
    async send(type) {
      sent.push(type);
      return null;
    },
    on() {
      return () => {};
    },
    onConnection() {},
    close() {},
    getState() {
      return 'open';
    }
  })
}));

/** Let pending microtasks and timer-0 callbacks run. */
function settle() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

describe('ADR channel lifecycle (UI-8uz7 §7)', () => {
  test('subscribes on tab entry and unsubscribes on leaving', async () => {
    window.location.hash = '#/board';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));
    bootstrap(root);
    await settle();
    sent.length = 0;

    window.location.hash = '#/adr';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await settle();
    const after_entry = sent.slice();
    window.location.hash = '#/board';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await settle();

    expect(after_entry).toContain('subscribe-adr');
    expect(after_entry).not.toContain('unsubscribe-adr');
    expect(sent).toContain('unsubscribe-adr');
  });

  test('shows the ADR route only on the adr view', async () => {
    window.location.hash = '#/adr';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await settle();

    const adr_root = /** @type {HTMLElement} */ (
      document.getElementById('adr-root')
    );
    const board_root = /** @type {HTMLElement} */ (
      document.getElementById('board-root')
    );
    expect(adr_root.hidden).toBe(false);
    expect(board_root.hidden).toBe(true);
  });
});
