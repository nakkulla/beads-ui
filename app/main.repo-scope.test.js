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

describe('repo scope capsule quiet state', () => {
  test('quiets the capsule on Monitor and restores it on Board', async () => {
    window.location.hash = '#/board';
    document.body.innerHTML =
      '<div id="repo-scope" class="repo-scope"></div><main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));
    const capsule = /** @type {HTMLElement} */ (
      document.getElementById('repo-scope')
    );

    bootstrap(root);
    await Promise.resolve();
    await Promise.resolve();
    expect(capsule.classList.contains('is-quiet')).toBe(false);

    window.location.hash = '#/monitor';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await Promise.resolve();
    await Promise.resolve();
    expect(capsule.classList.contains('is-quiet')).toBe(true);

    window.location.hash = '#/board';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await Promise.resolve();
    await Promise.resolve();

    expect(capsule.classList.contains('is-quiet')).toBe(false);
  });
});
