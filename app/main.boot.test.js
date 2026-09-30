import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createWsClient } from './core/ws.js';
import { bootstrap } from './main.js';

/**
 * Boot and channel lifecycle of the unified shell (UI-dbn6 §5.1, §4.2): the
 * boot opens exactly the server-global channels (+ the worker queue in the
 * 레포 scope) and no issue list; keyed patch recovery, reconnect and
 * workspace changes reopen what an open surface needs. The keyed-patch and
 * reconnect cases are the retired Monitor tab's (UI-nprg, UI-qrfo §4) carried
 * to the pipeline screen that now owns the channel.
 */
vi.mock('./core/ws.js', () => {
  /** @type {Record<string, (p: any) => void>} */
  const handlers = {};
  /** @type {Set<(s: 'connecting'|'open'|'closed'|'reconnecting') => void>} */
  const conn_handlers = new Set();
  /** @type {Array<{ type: string, payload: any }>} */
  const sent = [];
  /** @type {Map<string, any>} */
  const fail_once = new Map();
  /** @type {Map<string, any>} */
  const replies = new Map();
  const singleton = {
    /**
     * @param {string} type
     * @param {any} payload
     */
    async send(type, payload) {
      sent.push({ type, payload });
      if (fail_once.has(type)) {
        const error = fail_once.get(type);
        fail_once.delete(type);
        throw error;
      }
      if (replies.has(type)) {
        const reply = replies.get(type);
        return typeof reply === 'function' ? await reply(payload) : reply;
      }
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
      if (handlers[type]) {
        handlers[type](payload);
      }
    },
    _sent() {
      return sent;
    },
    _reset() {
      sent.length = 0;
      fail_once.clear();
      replies.clear();
      conn_handlers.clear();
      for (const key of Object.keys(handlers)) {
        delete handlers[key];
      }
    },
    _clearSent() {
      sent.length = 0;
    },
    /**
     * @param {string} type
     * @param {any} error
     */
    _failOnce(type, error) {
      fail_once.set(type, error);
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
    _emitConn(state) {
      for (const fn of Array.from(conn_handlers)) {
        fn(state);
      }
    },
    close() {},
    getState() {
      return 'open';
    }
  };
  return { createWsClient: () => singleton };
});

/**
 * The REAL pipeline store, with a handle on the instance `bootstrap` built.
 */
vi.mock('./model/monitor-pipeline-store.js', async (importOriginal) => {
  const actual = /** @type {any} */ (await importOriginal());
  /** @type {any} */
  let instance = null;
  return {
    createMonitorPipelineStore: () => {
      instance = actual.createMonitorPipelineStore();
      return instance;
    },
    __currentMonitorPipelineStore: () => instance
  };
});

const NOW = 1_700_000_000_000;

/**
 * Let queued microtasks and the macrotask boundary behind them settle.
 *
 * @returns {Promise<void>}
 */
function flush() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

/**
 * @param {any} client
 * @returns {string[]}
 */
function sentTypes(client) {
  return client._sent().map((/** @type {any} */ m) => m.type);
}

/**
 * @param {any} client
 * @returns {string[]}
 */
function subscribedListIds(client) {
  return client
    ._sent()
    .filter((/** @type {any} */ m) => m.type === 'subscribe-list')
    .map((/** @type {any} */ m) => m.payload && m.payload.id);
}

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
  bootstrap(/** @type {HTMLElement} */ (document.getElementById('app')));
  await flush();
  const store = /** @type {any} */ (
    await import('./model/monitor-pipeline-store.js')
  ).__currentMonitorPipelineStore();
  return { client, store };
}

/** @param {number} seq */
function snapshot(seq) {
  return {
    seq,
    workspaces: [
      {
        root_dir: '/repo-a',
        name: 'repo-a',
        queue: [{ bead_id: 'UI-wait', added_at: NOW }],
        pr_wait: [],
        done: [],
        attempts: {},
        bead_titles: {},
        pr_observations: {}
      }
    ],
    workspaces_state: [{ root_dir: '/repo-a', name: 'repo-a', revision: 1 }]
  };
}

beforeEach(() => {
  const client = /** @type {any} */ (createWsClient());
  client._reset();
  window.localStorage.clear();
});

describe('boot subscriptions (UI-dbn6 §5.1)', () => {
  test('subscribes exactly the three global channels in the 전체 scope', async () => {
    const { client } = await boot();

    const subscribed = sentTypes(client)
      .filter((type) => type.startsWith('subscribe-'))
      .sort();

    expect(subscribed).toEqual([
      'subscribe-impl-presets',
      'subscribe-model-visibility',
      'subscribe-monitor-pipeline'
    ]);
  });

  test('adds only the worker queue in the 레포 scope', async () => {
    const { client } = await boot({ scope: '/repo-a' });

    const subscribed = sentTypes(client)
      .filter((type) => type.startsWith('subscribe-'))
      .sort();

    expect(subscribed).toEqual([
      'subscribe-impl-presets',
      'subscribe-model-visibility',
      'subscribe-monitor-pipeline',
      'subscribe-worker-queue'
    ]);
  });

  test('sends one set-workspace before the channels when the scope names another repo', async () => {
    const { client } = await boot({ scope: '/repo-b' });

    const types = sentTypes(client);

    expect(types.filter((type) => type === 'set-workspace')).toHaveLength(1);
    expect(types.indexOf('set-workspace')).toBeLessThan(
      types.indexOf('subscribe-monitor-pipeline')
    );
  });

  test('reopens the open issue detail after set-workspace answers changed: true', async () => {
    const { client } = await boot({ hash: '#/pipeline?issue=UI-1' });
    client._clearSent();

    /** @type {HTMLElement} */ (
      document.querySelector('[data-op="scope-menu"]')
    ).click();
    /** @type {HTMLElement} */ (
      document.querySelector('[data-op="scope-pick"][data-value="/repo-b"]')
    ).click();
    await flush();

    const types = sentTypes(client);
    const set_at = types.indexOf('set-workspace');
    const detail_at = client
      ._sent()
      .findIndex(
        (/** @type {any} */ m, /** @type {number} */ index) =>
          index > set_at &&
          m.type === 'subscribe-list' &&
          m.payload?.type === 'issue-detail'
      );
    expect(set_at).toBeGreaterThanOrEqual(0);
    expect(detail_at).toBeGreaterThan(set_at);
  });

  test('reopens the 레포 closed list after set-workspace answers changed: true', async () => {
    window.localStorage.setItem(
      'beads-ui.worker.lane-collapsed',
      JSON.stringify({ lanes: { done: false }, areas: {} })
    );
    const { client } = await boot({ scope: '/repo-a' });
    client._clearSent();

    /** @type {HTMLElement} */ (
      document.querySelector('[data-op="scope-menu"]')
    ).click();
    /** @type {HTMLElement} */ (
      document.querySelector('[data-op="scope-pick"][data-value="/repo-b"]')
    ).click();
    await flush();

    const types = sentTypes(client);
    expect(types.indexOf('set-workspace')).toBeGreaterThanOrEqual(0);
    expect(subscribedListIds(client)).toContain('pipeline:closed');
  });
});

describe('pipeline keyed patch lifecycle', () => {
  test('renders a consecutive patch from an explicit snapshot sequence', async () => {
    const { client, store } = await boot();
    client._trigger('monitor-pipeline-snapshot', snapshot(8));
    await flush();
    client._clearSent();

    client._trigger('monitor-pipeline-patch', {
      seq: 9,
      set: { 'ws//repo-a/queue': [] },
      unset: []
    });
    await flush();

    expect(store.get()[0].queue).toEqual([]);
    expect(
      document.querySelector('.pl-row[data-bead-id="UI-wait"]')
    ).toBeNull();
    expect(sentTypes(client)).not.toContain('subscribe-monitor-pipeline');
  });

  test('waits for a recovery snapshot across repeated mismatched patches', async () => {
    const { client, store } = await boot();
    client._trigger('monitor-pipeline-snapshot', snapshot(1));
    client._clearSent();

    for (const seq of [3, 4, 5]) {
      client._trigger('monitor-pipeline-patch', { seq, set: {}, unset: [] });
      await flush();
    }

    expect(
      sentTypes(client).filter((type) => type.endsWith('monitor-pipeline'))
    ).toEqual(['unsubscribe-monitor-pipeline', 'subscribe-monitor-pipeline']);
    expect(store.get()).toBeNull();
  });

  test('shows a fatal error when the recovery subscription is rejected', async () => {
    const { client } = await boot();
    client._trigger('monitor-pipeline-snapshot', snapshot(1));
    client._failOnce(
      'subscribe-monitor-pipeline',
      new Error('pipeline recovery rejected')
    );

    client._trigger('monitor-pipeline-patch', { seq: 3, set: {}, unset: [] });
    await flush();

    expect(document.querySelector('#fatal-error-dialog[open]')).not.toBeNull();
    expect(document.querySelector('#fatal-error-title')?.textContent).toBe(
      'Failed to load pipeline'
    );
    expect(document.querySelector('#fatal-error-message')?.textContent).toBe(
      'pipeline recovery rejected'
    );
  });

  test.each([1, 3])(
    'resubscribes once after mismatched seq %i and accepts recovery',
    async (seq) => {
      const { client, store } = await boot();
      client._trigger('monitor-pipeline-snapshot', snapshot(1));
      await flush();
      client._clearSent();

      client._trigger('monitor-pipeline-patch', { seq, set: {}, unset: [] });
      const cleared = store.get();
      client._trigger('monitor-pipeline-snapshot', snapshot(1));
      client._trigger('monitor-pipeline-patch', {
        seq: 2,
        set: { 'ws//repo-a/queue': [] },
        unset: []
      });
      await flush();

      expect(cleared).toBeNull();
      expect(
        sentTypes(client).filter((type) => type.endsWith('monitor-pipeline'))
      ).toEqual(['unsubscribe-monitor-pipeline', 'subscribe-monitor-pipeline']);
      expect(store.get()[0].queue).toEqual([]);
    }
  );

  test('preserves the pipeline channel, map and seq across a workspace switch', async () => {
    const { client, store } = await boot();
    client._trigger('monitor-pipeline-snapshot', snapshot(8));
    await flush();
    const previous = store.get();
    client._clearSent();

    client._trigger('workspace-changed', {
      root_dir: '/repo-b',
      db_path: '/repo-b/.beads'
    });
    await flush();
    const after_switch = store.get();
    client._trigger('monitor-pipeline-patch', {
      seq: 9,
      set: { 'ws//repo-a/queue': [] },
      unset: []
    });
    await flush();

    expect(after_switch).toBe(previous);
    expect(store.get()[0]).toEqual({ ...previous[0], queue: [] });
    expect(
      sentTypes(client).filter((type) => type.endsWith('monitor-pipeline'))
    ).toEqual([]);
  });

  test('restarts sequencing from the snapshot after reconnect', async () => {
    const { client, store } = await boot();
    client._trigger('monitor-pipeline-snapshot', snapshot(8));

    client._emitConn('reconnecting');
    client._emitConn('open');
    await flush();
    client._trigger('monitor-pipeline-snapshot', snapshot(1));
    client._clearSent();
    client._trigger('monitor-pipeline-patch', {
      seq: 2,
      set: { 'ws//repo-a/queue': [] },
      unset: []
    });
    await flush();

    expect(store.get()[0].queue).toEqual([]);
    expect(sentTypes(client)).not.toContain('subscribe-monitor-pipeline');
  });
});

describe('subscription lifecycle after a reconnect', () => {
  test('re-sends the pipeline and global channels on the new socket', async () => {
    const { client } = await boot();
    client._clearSent();

    client._emitConn('reconnecting');
    client._emitConn('open');
    await flush();

    expect(sentTypes(client)).toEqual(
      expect.arrayContaining([
        'subscribe-monitor-pipeline',
        'subscribe-impl-presets',
        'subscribe-model-visibility'
      ])
    );
  });

  test('restores the 레포 closed subscription after reconnect', async () => {
    window.localStorage.setItem(
      'beads-ui.worker.lane-collapsed',
      JSON.stringify({ lanes: { done: false }, areas: {} })
    );
    const { client } = await boot({ scope: '/repo-a' });
    expect(subscribedListIds(client)).toContain('pipeline:closed');
    client._clearSent();

    client._emitConn('reconnecting');
    client._emitConn('open');
    await flush();

    expect(subscribedListIds(client)).toContain('pipeline:closed');
  });

  test('resubscribes the worker queue after leaving and re-entering the 레포 scope mid-request', async () => {
    const { client } = await boot({ scope: '/repo-a' });
    /** @type {HTMLElement} */ (
      document.querySelector('[data-op="scope-menu"]')
    ).click();
    /** @type {HTMLElement} */ (
      document.querySelector('[data-op="scope-pick"][data-value="*"]')
    ).click();
    await Promise.resolve();
    client._clearSent();

    /** @type {HTMLElement} */ (
      document.querySelector('[data-op="scope-menu"]')
    ).click();
    /** @type {HTMLElement} */ (
      document.querySelector('[data-op="scope-pick"][data-value="/repo-a"]')
    ).click();
    await flush();

    expect(sentTypes(client)).toContain('subscribe-worker-queue');
  });
});
