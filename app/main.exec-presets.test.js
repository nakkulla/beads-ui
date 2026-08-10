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
          message.type === 'subscribe-exec-presets'
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
          message.type === 'subscribe-exec-presets'
      )
    ).toHaveLength(1);
    expect(
      CLIENT.sent.some(
        (/** @type {{ type: string }} */ message) =>
          message.type === 'unsubscribe-exec-presets'
      )
    ).toBe(false);

    CLIENT.emitConnection('reconnecting');
    CLIENT.emitConnection('open');
    await settle();

    expect(
      CLIENT.sent.filter(
        (/** @type {{ type: string }} */ message) =>
          message.type === 'subscribe-exec-presets'
      )
    ).toHaveLength(2);
  });

  test('keeps the worker queue channel while a detail panel is open', async () => {
    bootstrap(setupShell());
    await settle();

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
    ).toHaveLength(1);
  });

  test('opens the Worker-owned global settings dialog from an empty detail preset state', async () => {
    bootstrap(setupShell());
    await settle();
    CLIENT.trigger('exec-presets-snapshot', { revision: 0, presets: [] });
    window.location.hash = '#/board?issue=UI-1';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await settle();

    /** @type {HTMLButtonElement} */ (
      document.querySelector('[data-open-exec-presets]')
    ).click();
    await settle();

    expect(document.getElementById('detail-panel')?.hidden).toBe(true);
    expect(document.getElementById('worker-root')?.hidden).toBe(false);
    expect(
      document
        .querySelector('#worker-root #worker-exec-defaults-dialog')
        ?.hasAttribute('open')
    ).toBe(true);
  });

  test('shows the same preset snapshot in Worker and Monitor dialogs', async () => {
    bootstrap(setupShell());
    await settle();
    CLIENT.trigger('exec-presets-snapshot', {
      revision: 1,
      presets: [{ id: 'p1', name: '공용 개발', settings: {} }]
    });

    window.location.hash = '#/worker';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await settle();
    /** @type {HTMLButtonElement} */ (
      document.querySelector('#worker-root .worker-exec-defaults-btn')
    ).click();
    expect(
      document.querySelector('#worker-root [data-preset-id="p1"]')?.textContent
    ).toContain('공용 개발');

    CLIENT.trigger('monitor-pipeline-snapshot', {
      workspaces: [],
      workspaces_state: [
        {
          root_dir: '/repo-a',
          name: 'repo-a',
          revision: 1,
          slots: 1,
          exec_defaults: {},
          runner_catalog: { runners: {} }
        }
      ]
    });
    window.location.hash = '#/monitor';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await settle();
    /** @type {HTMLButtonElement} */ (
      document.querySelector('#monitor-root .mon-ctl--exec')
    ).click();

    expect(
      document.querySelector('#monitor-root [data-preset-id="p1"]')?.textContent
    ).toContain('공용 개발');
  });
});
