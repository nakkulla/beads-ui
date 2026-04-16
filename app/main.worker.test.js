import { describe, expect, test, vi } from 'vitest';
import { bootstrap } from './main.js';
import { createWsClient } from './ws.js';

vi.mock('./ws.js', () => {
  /** @type {Record<string, (payload: any) => void>} */
  const handlers = {};
  const singleton = {
    /**
     * @param {string} _type
     * @param {any} _payload
     * @returns {Promise<null>}
     */
    async send(_type, _payload) {
      return null;
    },
    /**
     * @param {string} type
     * @param {(payload: any) => void} handler
     */
    on(type, handler) {
      handlers[type] = handler;
      return () => {};
    },
    close() {},
    getState() {
      return 'open';
    }
  };
  return { createWsClient: () => singleton };
});

describe('app/main worker route', () => {
  test('activates Worker tab from hash without opening global detail dialog', async () => {
    window.location.hash = '#/worker?issue=UI-62lm';
    document.body.innerHTML =
      '<header><div id="top-nav"></div></header><main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await Promise.resolve();

    expect(document.querySelector('.tab.active')?.textContent).toContain(
      'Worker'
    );
    expect(document.querySelector('#detail-root')).toBeNull();
  });

  test('gotoView worker keeps worker hash semantics', () => {
    const client = /** @type {any} */ (createWsClient());
    expect(client.getState()).toBe('open');
    window.location.hash = '#/issues';

    document.body.innerHTML =
      '<header><div id="top-nav"></div></header><main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);

    const worker_tab = /** @type {HTMLAnchorElement} */ (
      document.querySelector('a[href="#/worker"]')
    );
    worker_tab.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(window.location.hash).toBe('#/worker');
  });
});
