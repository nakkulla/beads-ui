import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  bootstrap,
  readBootstrapConfig,
  refreshConfigSnapshot
} from './main.js';
import { createStore } from './state.js';

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
  delete (/** @type {any} */ (window).__BDUI_BOOTSTRAP__);
  vi.unstubAllGlobals();
});

describe('main config refresh', () => {
  test('reads color policy from bootstrap config', () => {
    /** @type {any} */ (window).__BDUI_BOOTSTRAP__ = {
      label_display_policy: {
        visible_prefixes: ['has:'],
        visible_exact: [],
        colors: {
          prefix: {
            'has:': { fg: '#16a34a' }
          },
          exact: {
            pr: { fg: '#7c3aed' }
          }
        }
      }
    };

    const config = readBootstrapConfig();

    expect(config.label_display_policy.colors).toEqual({
      prefix: {
        'has:': { fg: '#16a34a' }
      },
      exact: {
        pr: { fg: '#7c3aed' }
      }
    });
  });

  test('reads worker config from bootstrap config', () => {
    /** @type {any} */ (window).__BDUI_BOOTSTRAP__ = {
      worker: {
        default_model: 'gpt-5.4',
        default_effort: 'medium',
        pr_review_wait_ms: 120000,
        advance_delay_ms: 45000
      }
    };

    const config = readBootstrapConfig();

    expect(config.worker).toEqual({
      default_model: 'gpt-5.4',
      default_effort: 'medium',
      pr_review_wait_ms: 120000,
      advance_delay_ms: 45000
    });
  });

  test('refresh propagates color policy to state', async () => {
    const fetch_mock = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          label_display_policy: {
            visible_prefixes: ['followup:'],
            colors: {
              prefix: {
                'followup:': { fg: '#b45309' }
              },
              exact: {}
            }
          }
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    });
    vi.stubGlobal('fetch', fetch_mock);
    const store = createStore();

    await refreshConfigSnapshot(store, vi.fn());

    expect(store.getState().config.label_display_policy.colors).toEqual({
      prefix: {
        'followup:': { fg: '#b45309' }
      },
      exact: {}
    });
  });

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
