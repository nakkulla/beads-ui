import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
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
      <button id="display-settings-btn" type="button">⚙</button>
      <div id="header-loading" hidden></div>
    </header>
    <main id="app"></main>
  `;
  return /** @type {HTMLElement} */ (document.getElementById('app'));
}

function makeClient() {
  /** @type {Record<string, (payload: any) => void>} */
  const handlers = {};
  /** @type {Set<(state: string) => void>} */
  const connection_handlers = new Set();
  /** @type {Array<{ type: string, payload: any }>} */
  const sent = [];
  return {
    sent,
    async send(/** @type {string} */ type, /** @type {any} */ payload) {
      sent.push({ type, payload });
      if (type === 'list-workspaces') {
        return {
          workspaces: [{ path: '/repo-a', database: '/repo-a/.beads' }],
          current: { root_dir: '/repo-a', db_path: '/repo-a/.beads' },
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
      return null;
    },
    on(
      /** @type {string} */ type,
      /** @type {(payload: any) => void} */ handler
    ) {
      handlers[type] = handler;
      return () => delete handlers[type];
    },
    trigger(/** @type {string} */ type, /** @type {any} */ payload) {
      handlers[type]?.(payload);
    },
    onConnection(/** @type {(state: string) => void} */ handler) {
      connection_handlers.add(handler);
      return () => connection_handlers.delete(handler);
    },
    emitConnection(/** @type {string} */ state) {
      for (const handler of Array.from(connection_handlers)) {
        handler(state);
      }
    },
    close() {},
    getState() {
      return 'open';
    }
  };
}

async function settle() {
  for (let index = 0; index < 8; index++) {
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
}

beforeEach(() => {
  const values = new Map();
  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    value: {
      clear: () => values.clear(),
      getItem: (/** @type {string} */ key) => values.get(key) ?? null,
      removeItem: (/** @type {string} */ key) => values.delete(key),
      setItem: (/** @type {string} */ key, /** @type {string} */ value) =>
        values.set(key, String(value))
    }
  });
  window.location.hash = '#/board';
  CLIENT = makeClient();
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => new Response('{}', { status: 200 }))
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
  CLIENT = null;
});

describe('main exec-preset subscription lifecycle', () => {
  test('keeps one global subscription across workspace changes and resubscribes once after reconnect', async () => {
    bootstrap(setupShell());
    await settle();

    expect(
      CLIENT.sent.filter(
        (/** @type {{ type: string }} */ message) =>
          message.type === 'subscribe-impl-presets'
      )
    ).toHaveLength(1);

    CLIENT.trigger('workspace-changed', {
      root_dir: '/repo-b',
      db_path: '/repo-b/.beads'
    });
    await settle();

    expect(
      CLIENT.sent.filter(
        (/** @type {{ type: string }} */ message) =>
          message.type === 'subscribe-impl-presets'
      )
    ).toHaveLength(1);
    expect(
      CLIENT.sent.some(
        (/** @type {{ type: string }} */ message) =>
          message.type === 'unsubscribe-impl-presets'
      )
    ).toBe(false);

    CLIENT.emitConnection('reconnecting');
    CLIENT.emitConnection('open');
    await settle();

    expect(
      CLIENT.sent.filter(
        (/** @type {{ type: string }} */ message) =>
          message.type === 'subscribe-impl-presets'
      )
    ).toHaveLength(2);
  });

  test('keeps the worker queue channel on Board after a detail panel closes', async () => {
    bootstrap(setupShell());
    await settle();

    expect(
      CLIENT.sent.filter(
        (/** @type {{ type: string }} */ message) =>
          message.type === 'subscribe-worker-queue'
      )
    ).toHaveLength(1);

    window.location.hash = '#/board?issue=UI-1';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await settle();

    expect(
      CLIENT.sent.filter(
        (/** @type {{ type: string }} */ message) =>
          message.type === 'subscribe-worker-queue'
      )
    ).toHaveLength(1);

    window.location.hash = '#/board';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await settle();

    expect(
      CLIENT.sent.filter(
        (/** @type {{ type: string }} */ message) =>
          message.type === 'unsubscribe-worker-queue'
      )
    ).toHaveLength(0);
  });

  test('opens the unified settings dialog from the nav-bar ⚙', async () => {
    bootstrap(setupShell());
    await settle();

    /** @type {HTMLButtonElement} */ (
      document.getElementById('display-settings-btn')
    ).click();
    await settle();

    const dialog = document.getElementById('settings-dialog');
    expect(dialog).not.toBe(null);
    expect(dialog?.hasAttribute('open')).toBe(true);
    expect(
      dialog?.querySelector('[role="tab"][data-tab="execution"]')
    ).not.toBe(null);
  });
});
