import { afterEach, describe, expect, test, vi } from 'vitest';
import { bootstrap } from './main.js';

/** @type {any} */
let CLIENT = null;

vi.mock('./ws.js', () => ({
  createWsClient: () => CLIENT
}));

function setupShell() {
  document.body.innerHTML = `
    <header>
      <div id="workspace-picker"></div>
      <nav id="top-nav"></nav>
      <div id="header-loading" hidden></div>
      <button id="new-issue-btn" type="button">New issue</button>
    </header>
    <main id="app"></main>
  `;

  return /** @type {HTMLElement} */ (document.getElementById('app'));
}

afterEach(() => {
  delete /** @type {any} */ (window).__BDUI_BOOTSTRAP__;
  vi.unstubAllGlobals();
});

describe('main config refresh', () => {
  test('fetches latest config after websocket reconnects', async () => {
    const fetch_mock = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          label_display_policy: {
            visible_prefixes: ['agent:']
          }
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    });
    vi.stubGlobal('fetch', fetch_mock);
    /** @type {any} */ (window).__BDUI_BOOTSTRAP__ = {
      label_display_policy: {
        visible_prefixes: ['area:']
      }
    };
    CLIENT = {
      send: vi.fn(async (type) => {
        if (type === 'list-workspaces') {
          return { workspaces: [], current: null };
        }
        return [];
      }),
      on() {
        return () => {};
      },
      /**
       * @param {(state: 'connecting'|'open'|'closed'|'reconnecting') => void} handler
       */
      onConnection(handler) {
        this._conn = handler;
        return () => {};
      },
      /**
       * @param {'connecting'|'open'|'closed'|'reconnecting'} state
       */
      triggerConn(state) {
        this._conn?.(state);
      },
      close() {},
      getState() {
        return 'open';
      }
    };

    const root = setupShell();
    bootstrap(root);
    await Promise.resolve();
    await Promise.resolve();

    expect(fetch_mock).not.toHaveBeenCalled();

    CLIENT.triggerConn('reconnecting');
    await Promise.resolve();
    CLIENT.triggerConn('open');
    await Promise.resolve();
    await Promise.resolve();

    expect(fetch_mock).toHaveBeenCalledWith('/api/config');
  });
});
