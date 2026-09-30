import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createWsClient } from '../../core/ws.js';
import { bootstrap } from '../../main.js';

/**
 * Opening the issue detail from the shell (UI-dbn6 §3.2·§3.5·§4.2): another
 * repo's issue is connected (`set-workspace`) BEFORE the detail subscribes,
 * the displayed scope never changes, the hash keeps `root` so a reload
 * reconnects first, and an open detail adds only its own `issue-detail`
 * subscription — its queue facts come from the monitor rows.
 */
vi.mock('../../core/ws.js', () => {
  /** @type {Record<string, (p: any) => void>} */
  const handlers = {};
  /** @type {Array<{ type: string, payload: any }>} */
  const sent = [];
  const singleton = {
    /**
     * @param {string} type
     * @param {any} payload
     */
    async send(type, payload) {
      sent.push({ type, payload });
      if (type === 'list-workspaces') {
        return {
          workspaces: [
            { path: '/repo-a', database: '/repo-a/.beads' },
            { path: '/repo-b', database: '/repo-b/.beads' }
          ],
          current: { root_dir: '/repo-a', db_path: '/repo-a/.beads' },
          hidden: []
        };
      }
      if (type === 'set-workspace') {
        return {
          changed: true,
          workspace: {
            root_dir: payload.path,
            db_path: `${payload.path}/.beads`
          }
        };
      }
      return null;
    },
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
    _trigger(type, payload) {
      handlers[type]?.(payload);
    },
    _sent() {
      return sent;
    },
    _reset() {
      sent.length = 0;
      for (const key of Object.keys(handlers)) {
        delete handlers[key];
      }
    },
    _clearSent() {
      sent.length = 0;
    },
    onConnection() {
      return () => {};
    },
    close() {},
    getState() {
      return 'open';
    }
  };
  return { createWsClient: () => singleton };
});

/** @type {ReturnType<typeof bootstrap>|null} */
let booted = null;

/** @returns {Promise<void>} */
function flush() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

const SNAPSHOT = {
  seq: 1,
  workspaces: [
    {
      root_dir: '/repo-a',
      name: 'repo-a',
      revision: 1,
      queue: [],
      serial_lanes: [],
      pr_wait: [],
      done: [],
      attempts: {},
      runnable: [{ bead_id: 'A-1', title: '레포 A 후보', created_at: 1 }]
    },
    {
      root_dir: '/repo-b',
      name: 'repo-b',
      revision: 1,
      queue: [],
      serial_lanes: [],
      pr_wait: [],
      done: [],
      attempts: {},
      runnable: [{ bead_id: 'B-1', title: '레포 B 후보', created_at: 1 }]
    }
  ],
  workspaces_state: [
    { root_dir: '/repo-a', name: 'repo-a', revision: 1, slots: 1 },
    { root_dir: '/repo-b', name: 'repo-b', revision: 1, slots: 1 }
  ]
};

/**
 * @param {{ scope?: string, hash?: string }} [options]
 */
async function boot(options = {}) {
  const client = /** @type {any} */ (createWsClient());
  if (options.scope) {
    window.localStorage.setItem('beads-ui.scope', options.scope);
  }
  window.location.hash = options.hash ?? '#/pipeline';
  document.body.innerHTML = '<main id="app"></main>';
  const app = bootstrap(
    /** @type {HTMLElement} */ (document.getElementById('app'))
  );
  booted = app;
  await flush();
  client._trigger('monitor-pipeline-snapshot', SNAPSHOT);
  await flush();
  return { client, app };
}

/**
 * @param {any} client
 * @returns {Array<{ type: string, payload: any }>}
 */
function sentOf(client) {
  return client._sent();
}

/**
 * The index of the first `issue-detail` subscription of `id`.
 *
 * @param {any} client
 * @param {string} id
 * @returns {number}
 */
function detailSubscribeAt(client, id) {
  return sentOf(client).findIndex(
    (m) =>
      m.type === 'subscribe-list' &&
      m.payload?.type === 'issue-detail' &&
      m.payload?.params?.id === id
  );
}

/**
 * @param {string} bead_id
 */
function clickCard(bead_id) {
  /** @type {HTMLElement} */ (
    document.querySelector(`#pipeline-root .pl-card[data-bead-id="${bead_id}"]`)
  ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
}

beforeEach(() => {
  const client = /** @type {any} */ (createWsClient());
  client._reset();
  window.localStorage.clear();
});

// A previous test's shell must not answer this test's hash changes.
afterEach(() => {
  booted?.router.stop();
  booted = null;
});

describe('another repo detail in the 전체 scope', () => {
  test('connects the card repo before subscribing its detail', async () => {
    const { client } = await boot();
    client._clearSent();

    clickCard('B-1');
    await flush();

    const set_at = sentOf(client).findIndex(
      (m) => m.type === 'set-workspace' && m.payload.path === '/repo-b'
    );
    expect(set_at).toBeGreaterThanOrEqual(0);
    expect(detailSubscribeAt(client, 'B-1')).toBeGreaterThan(set_at);
  });

  test('keeps the root in the hash and the 전체 scope', async () => {
    const { client, app } = await boot();
    client._clearSent();

    clickCard('B-1');
    await flush();

    expect(window.location.hash).toBe('#/pipeline?issue=B-1&root=%2Frepo-b');
    expect(app.store.getState().scope).toBe('*');
  });

  test('adds only the issue-detail subscription while the detail is open', async () => {
    const { client } = await boot();
    client._clearSent();

    clickCard('A-1');
    await flush();

    expect(
      sentOf(client)
        .filter((m) => m.type.startsWith('subscribe-'))
        .map((m) => `${m.type}:${m.payload?.type || ''}`)
    ).toEqual(['subscribe-list:issue-detail']);
  });

  test('releases the issue-detail subscription when the detail closes', async () => {
    const { client } = await boot();
    clickCard('A-1');
    await flush();
    client._clearSent();

    /** @type {HTMLButtonElement} */ (
      document.querySelector('#detail-panel .detail-overlay__close')
    ).click();
    await flush();

    expect(
      sentOf(client)
        .filter((m) => m.type === 'unsubscribe-list')
        .map((m) => m.payload.id)
    ).toEqual(['detail:A-1']);
  });
});

describe('another repo detail in the 레포 scope', () => {
  /**
   * Open the scope repo's A-1 and click its dependency chip into repo B —
   * the detail's chips know every visible repo's issues.
   *
   * @param {any} client
   */
  async function openForeignFromDetail(client) {
    clickCard('A-1');
    await flush();
    client._trigger('snapshot', {
      type: 'snapshot',
      id: 'detail:A-1',
      revision: 1,
      issues: [
        {
          id: 'A-1',
          title: '레포 A 후보',
          dependencies: [{ id: 'B-1', dependency_type: 'blocks' }]
        }
      ]
    });
    await flush();
    client._clearSent();
    /** @type {HTMLElement} */ (
      document.querySelector(
        '#detail-panel .detail-dep--pred .detail-dep__link'
      )
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush();
  }

  test('connects the other repo before subscribing its detail', async () => {
    const { client } = await boot({ scope: '/repo-a' });

    await openForeignFromDetail(client);

    const set_at = sentOf(client).findIndex(
      (m) => m.type === 'set-workspace' && m.payload.path === '/repo-b'
    );
    expect(set_at).toBeGreaterThanOrEqual(0);
    expect(detailSubscribeAt(client, 'B-1')).toBeGreaterThan(set_at);
  });

  test('keeps the displayed 레포 scope while that detail is open', async () => {
    const { client, app } = await boot({ scope: '/repo-a' });

    await openForeignFromDetail(client);

    expect(window.location.hash).toBe('#/pipeline?issue=B-1&root=%2Frepo-b');
    expect(app.store.getState().scope).toBe('/repo-a');
    expect(window.localStorage.getItem('beads-ui.scope')).toBe('/repo-a');
  });

  test('connects the scope repo back when that detail closes', async () => {
    const { client } = await boot({ scope: '/repo-a' });
    await openForeignFromDetail(client);
    client._clearSent();

    /** @type {HTMLButtonElement} */ (
      document.querySelector('#detail-panel .detail-overlay__close')
    ).click();
    await flush();

    expect(
      sentOf(client)
        .filter((m) => m.type === 'set-workspace')
        .map((m) => m.payload.path)
    ).toEqual(['/repo-a']);
  });
});

describe('reloaded detail hash', () => {
  test('connects the hash root before subscribing the detail', async () => {
    const { client } = await boot({
      hash: `#/pipeline?issue=B-1&root=${encodeURIComponent('/repo-b')}`
    });

    const set_at = sentOf(client).findIndex(
      (m) => m.type === 'set-workspace' && m.payload.path === '/repo-b'
    );
    expect(set_at).toBeGreaterThanOrEqual(0);
    expect(detailSubscribeAt(client, 'B-1')).toBeGreaterThan(set_at);
  });

  test('keeps the saved 전체 scope while the reloaded detail is open', async () => {
    const { app } = await boot({
      hash: `#/pipeline?issue=B-1&root=${encodeURIComponent('/repo-b')}`
    });

    expect(app.store.getState().scope).toBe('*');
    expect(
      /** @type {HTMLElement} */ (document.getElementById('detail-panel'))
        .hidden
    ).toBe(false);
  });
});
