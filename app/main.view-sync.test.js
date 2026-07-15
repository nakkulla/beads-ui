import { describe, expect, test, vi } from 'vitest';
import { bootstrap } from './main.js';

// Mock WS client before importing the app
vi.mock('./ws.js', () => ({
  createWsClient: () => ({
    /**
     * @param {string} type
     */
    async send(type) {
      void type;
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

describe('initial view sync on reload', () => {
  test('shows the Worker view when hash is #/worker', async () => {
    window.location.hash = '#/worker';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await Promise.resolve();

    const boardRoot = /** @type {HTMLElement} */ (
      document.getElementById('board-root')
    );
    const workerRoot = /** @type {HTMLElement} */ (
      document.getElementById('worker-root')
    );

    expect(boardRoot.hidden).toBe(true);
    expect(workerRoot.hidden).toBe(false);
  });
});
