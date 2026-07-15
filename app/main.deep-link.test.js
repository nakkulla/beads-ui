import { describe, expect, test, vi } from 'vitest';
import { bootstrap } from './main.js';
import { createWsClient } from './ws.js';

// Mock WS client before importing the app
const calls = [];
vi.mock('./ws.js', () => {
  /** @type {Record<string, (p:any)=>void>} */
  const handlers = {};
  const singleton = {
    /**
     * @param {string} type
     * @param {any} payload
     */
    async send(type, payload) {
      calls.push({ type, payload });
      return null;
    },
    /**
     * @param {string} type
     * @param {(p:any)=>void} handler
     */
    on(type, handler) {
      handlers[type] = handler;
      return () => {};
    },
    /**
     * @param {string} type
     * @param {any} payload
     */
    _trigger(type, payload) {
      if (handlers[type]) handlers[type](payload);
    },
    close() {},
    getState() {
      return 'open';
    }
  };
  return { createWsClient: () => singleton };
});

describe('deep link on initial load (UI-44)', () => {
  test('opens the detail overlay showing the deep-linked id and redirects to #/board', async () => {
    window.location.hash = '#/issue/UI-2';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    // Instantiate the mock so `calls` is wired for the same singleton.
    createWsClient();
    bootstrap(root);

    await Promise.resolve();
    await Promise.resolve();

    // Legacy #/issue/<id> normalizes to the canonical board hash.
    expect(window.location.hash).toBe('#/board?issue=UI-2');

    // The shared detail overlay is visible and shows the raw id.
    const detail = /** @type {HTMLElement} */ (
      document.getElementById('detail-panel')
    );
    expect(detail.hidden).toBe(false);
    const idEl = detail.querySelector('.detail-overlay__id');
    expect(idEl && idEl.textContent && idEl.textContent.trim()).toBe('UI-2');
  });
});
