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

/**
 * A ws client stub that records the message types it sent, lets a test push
 * server events, and lets a test drive the connection state machine.
 *
 * `options.current` is the workspace `list-workspaces` reports; `null` leaves
 * the client without one (the bootstrap state).
 *
 * @param {{ current?: string|null }} [options]
 */
function makeClient(options = {}) {
  const current = options.current ?? null;
  /** @type {Record<string, (p: any) => void>} */
  const handlers = {};
  /** @type {Set<(s: 'connecting'|'open'|'closed'|'reconnecting') => void>} */
  const conn_handlers = new Set();
  /** @type {string[]} */
  const sent = [];

  return {
    sent,
    send: vi.fn(
      async (/** @type {string} */ type, /** @type {any} */ payload) => {
        sent.push(String(type));
        if (type === 'list-workspaces') {
          if (!current) {
            return null;
          }
          return {
            workspaces: [
              { path: current, database: `${current}/.beads/ui.db` }
            ],
            current: { root_dir: current, db_path: `${current}/.beads/ui.db` },
            hidden: []
          };
        }
        if (type === 'set-workspace') {
          return {
            changed: false,
            workspace: {
              root_dir: payload.path,
              db_path: `${payload.path}/.beads/ui.db`
            }
          };
        }
        return null;
      }
    ),
    /**
     * @param {string} type
     * @param {(p: any) => void} handler
     */
    on(type, handler) {
      handlers[type] = handler;
      return () => {
        delete handlers[type];
      };
    },
    /**
     * @param {string} type
     * @param {any} payload
     */
    trigger(type, payload) {
      if (handlers[type]) {
        handlers[type](payload);
      }
    },
    /**
     * @param {(s: 'connecting'|'open'|'closed'|'reconnecting') => void} fn
     */
    onConnection(fn) {
      conn_handlers.add(fn);
      return () => conn_handlers.delete(fn);
    },
    /**
     * @param {'connecting'|'open'|'closed'|'reconnecting'} state
     */
    emitConn(state) {
      for (const fn of Array.from(conn_handlers)) {
        fn(state);
      }
    },
    close() {},
    getState() {
      return 'open';
    }
  };
}

/**
 * A queue snapshot push addressed to one workspace, carrying a single waiting
 * bead so the lane is observable in the DOM.
 *
 * @param {string} root_dir
 */
function queueSnapshotFor(root_dir) {
  return {
    type: 'worker-queue-snapshot',
    id: 'worker:queue',
    root_dir,
    queue: {
      revision: 1,
      auto_advance: false,
      slots: 2,
      queue: [{ bead_id: 'W1' }],
      pr_wait: [],
      done: [],
      attempts: {},
      admission: {},
      cleanup_failed: {}
    }
  };
}

/** @returns {number} Waiting-lane rows currently rendered. */
function waitingRowCount() {
  // 대기 pane은 직렬 레인까지 품는다 (UI-5ksp §4.2) — 병렬 영역만 센다.
  return document.querySelectorAll(
    '#worker-pane-queue .worker-wait__area--parallel .worker-mini'
  ).length;
}

async function settle() {
  for (let i = 0; i < 4; i++) {
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
}

beforeEach(() => {
  window.localStorage.clear();
  window.localStorage.setItem('beads-ui.view', 'worker');
  window.location.hash = '#/worker';
  delete (/** @type {any} */ (window).__BDUI_BOOTSTRAP__);
});

afterEach(() => {
  CLIENT = null;
  delete (/** @type {any} */ (window).__BDUI_BOOTSTRAP__);
});

describe('worker-queue snapshot workspace guard', () => {
  test('ignores a snapshot addressed to another workspace', async () => {
    CLIENT = makeClient({ current: '/repo-a' });
    bootstrap(setupShell());
    await settle();

    CLIENT.trigger('worker-queue-snapshot', queueSnapshotFor('/repo-b'));
    await settle();

    expect(waitingRowCount()).toBe(0);
  });

  test('applies a snapshot addressed to the current workspace', async () => {
    CLIENT = makeClient({ current: '/repo-a' });
    bootstrap(setupShell());
    await settle();

    CLIENT.trigger('worker-queue-snapshot', queueSnapshotFor('/repo-a'));
    await settle();

    expect(waitingRowCount()).toBe(1);
  });

  test('accepts an older queue snapshot with no display projections', async () => {
    CLIENT = makeClient({ current: '/repo-a' });
    bootstrap(setupShell());
    await settle();

    // `queueSnapshotFor` intentionally omits bead_labels and
    // execution_defaults: an older server must keep the queue usable because
    // both fields are display-only projections.
    CLIENT.trigger('worker-queue-snapshot', queueSnapshotFor('/repo-a'));
    await settle();

    expect(waitingRowCount()).toBe(1);
    expect(
      document.querySelector(
        '#worker-pane-queue .worker-wait__area--parallel .exec-chip'
      )
    ).toBeNull();
  });

  test('applies the bootstrap snapshot that arrives before a workspace is known', async () => {
    CLIENT = makeClient({ current: null });
    bootstrap(setupShell());
    await settle();

    CLIENT.trigger('worker-queue-snapshot', queueSnapshotFor('/repo-a'));
    await settle();

    expect(waitingRowCount()).toBe(1);
  });
});

describe('worker-queue resubscribe after reconnect', () => {
  test('subscribes the worker queue again on the new socket', async () => {
    CLIENT = makeClient({ current: '/repo-a' });
    bootstrap(setupShell());
    await settle();
    CLIENT.sent.length = 0;

    CLIENT.emitConn('reconnecting');
    CLIENT.emitConn('open');
    await settle();

    expect(CLIENT.sent).toContain('subscribe-worker-queue');
  });

  test('restores the workspace before subscribing the worker queue', async () => {
    CLIENT = makeClient({ current: '/repo-a' });
    bootstrap(setupShell());
    await settle();
    CLIENT.sent.length = 0;

    CLIENT.emitConn('reconnecting');
    CLIENT.emitConn('open');
    await settle();

    const restore_at = CLIENT.sent.indexOf('set-workspace');
    const subscribe_at = CLIENT.sent.indexOf('subscribe-worker-queue');
    expect(restore_at).toBeGreaterThanOrEqual(0);
    expect(subscribe_at).toBeGreaterThan(restore_at);
  });
});
