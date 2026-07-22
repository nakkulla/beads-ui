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
  test('reads the default workspace from bootstrap config', () => {
    /** @type {any} */ (window).__BDUI_BOOTSTRAP__ = {
      workspace_config: { default_workspace: '/repo-a' }
    };

    const config = readBootstrapConfig();

    expect(config.workspace_config.default_workspace).toBe('/repo-a');
  });

  test('ignores a legacy label policy in the bootstrap config', () => {
    /** @type {any} */ (window).__BDUI_BOOTSTRAP__ = {
      label_display_policy: { visible_prefixes: ['has:'] }
    };

    const config = readBootstrapConfig();

    expect('label_display_policy' in config).toBe(false);
  });

  test('refresh propagates the default workspace to state', async () => {
    const fetch_mock = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          workspace_config: { default_workspace: '/repo-b' }
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

    expect(store.getState().config.workspace_config.default_workspace).toBe(
      '/repo-b'
    );
  });

  test('fetches latest config after websocket reconnects', async () => {
    const fetch_mock = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          workspace_config: { default_workspace: '/repo-b' }
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    });
    vi.stubGlobal('fetch', fetch_mock);
    /** @type {any} */ (window).__BDUI_BOOTSTRAP__ = {
      workspace_config: { default_workspace: '/repo-a' }
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

describe('display-policy resubscribe after reconnect', () => {
  /**
   * @param {string|null} current_workspace
   * @returns {any}
   */
  function makeClient(current_workspace) {
    return {
      sent: /** @type {Array<{type: string, payload: any}>} */ ([]),
      /**
       * @param {string} type
       * @param {any} payload
       */
      async send(type, payload) {
        this.sent.push({ type, payload });
        if (type === 'list-workspaces') {
          return {
            workspaces: current_workspace
              ? [
                  {
                    path: current_workspace,
                    database: `${current_workspace}/.beads`
                  }
                ]
              : [],
            // `list-workspaces` reports the active workspace in bd's own
            // root_dir/db_path shape, not the client-side path/database shape.
            current: current_workspace
              ? {
                  root_dir: current_workspace,
                  db_path: `${current_workspace}/.beads`
                }
              : null,
            hidden: []
          };
        }
        if (type === 'set-workspace') {
          return {
            changed: false,
            workspace: {
              root_dir: payload.path,
              db_path: `${payload.path}/.beads`
            }
          };
        }
        return [];
      },
      on() {
        return () => {};
      },
      /** @param {(state: 'connecting'|'open'|'closed'|'reconnecting') => void} handler */
      onConnection(handler) {
        this._conn = handler;
        return () => {};
      },
      /** @param {'connecting'|'open'|'closed'|'reconnecting'} state */
      triggerConn(state) {
        this._conn?.(state);
      },
      close() {},
      getState() {
        return 'open';
      }
    };
  }

  /**
   * @param {any} client
   */
  async function bootAndReconnect(client) {
    CLIENT = client;
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('{}', { status: 200 }))
    );
    const root = setupShell();
    bootstrap(root);
    for (let i = 0; i < 12; i++) {
      await Promise.resolve();
    }
    client.sent.length = 0;

    client.triggerConn('reconnecting');
    client.triggerConn('open');
    for (let i = 0; i < 12; i++) {
      await Promise.resolve();
    }
  }

  test('repoints the workspace before resubscribing the policy', async () => {
    const client = makeClient('/repo-a');

    await bootAndReconnect(client);

    const order = client.sent
      .map((/** @type {any} */ m) => m.type)
      .filter(
        (/** @type {string} */ t) =>
          t === 'set-workspace' || t === 'subscribe-display-policy'
      );
    expect(order[0]).toBe('set-workspace');
    expect(order).toContain('subscribe-display-policy');
  });

  test('restores the selected workspace, not the server default', async () => {
    const client = makeClient('/repo-a');

    await bootAndReconnect(client);

    const set = client.sent.find(
      (/** @type {any} */ m) => m.type === 'set-workspace'
    );
    expect(set.payload.path).toBe('/repo-a');
  });

  test('resubscribes directly when no workspace is selected', async () => {
    const client = makeClient(null);

    await bootAndReconnect(client);

    expect(
      client.sent.some(
        (/** @type {any} */ m) => m.type === 'subscribe-display-policy'
      )
    ).toBe(true);
    expect(
      client.sent.some((/** @type {any} */ m) => m.type === 'set-workspace')
    ).toBe(false);
  });
});
