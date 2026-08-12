import { createServer } from 'node:http';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { fetchListForSubscription } from './list-adapters.js';
import { keyOf } from './subscriptions.js';
import {
  __resetRegistriesForTest,
  attachWsServer,
  handleMessage,
  registryFor,
  scheduleListRefresh
} from './ws.js';

vi.mock('./list-adapters.js', () => ({
  fetchListForSubscription: vi.fn(async () => ({
    ok: true,
    items: [
      { id: 'A', updated_at: 1, closed_at: null },
      { id: 'B', updated_at: 1, closed_at: null }
    ]
  }))
}));

// With no explicit root_dir, attachWsServer seeds DEFAULT_WORKSPACE from
// process.cwd(); connections in these tests therefore use the workspace
// registry keyed by process.cwd().
const activeRegistry = () => registryFor(process.cwd());

describe('snapshot cache', () => {
  beforeEach(() => {
    /** @type {import('vitest').Mock} */ (fetchListForSubscription).mockReset();
    /** @type {import('vitest').Mock} */ (
      fetchListForSubscription
    ).mockResolvedValue({
      ok: true,
      items: [
        { id: 'A', updated_at: 1, closed_at: null },
        { id: 'B', updated_at: 1, closed_at: null }
      ]
    });
  });

  afterEach(() => {
    __resetRegistriesForTest();
    vi.useRealTimers();
  });

  test('subscribe-list populates cachedSnapshot on cold path', async () => {
    const server = createServer();
    attachWsServer(server, {
      path: '/ws',
      heartbeat_ms: 10000,
      refresh_debounce_ms: 50
    });

    const sock = {
      sent: /** @type {string[]} */ ([]),
      readyState: 1,
      OPEN: 1,
      /** @param {string} msg */
      send(msg) {
        this.sent.push(String(msg));
      }
    };

    await handleMessage(
      /** @type {any} */ (sock),
      Buffer.from(
        JSON.stringify({
          id: 'sub-cold',
          type: /** @type {any} */ ('subscribe-list'),
          payload: { id: 'c-cold', type: 'all-issues' }
        })
      )
    );

    const key = keyOf({ type: 'all-issues' });
    const entry = activeRegistry().get(key);
    expect(entry?.cachedSnapshot).not.toBeNull();
    expect(entry?.cachedSnapshot?.length).toBe(2);
  });

  test('refreshAndPublish updates cachedSnapshot', async () => {
    vi.useFakeTimers();
    const server = createServer();
    const { wss } = attachWsServer(server, {
      path: '/ws',
      heartbeat_ms: 10000,
      refresh_debounce_ms: 50
    });

    const sock = {
      sent: /** @type {string[]} */ ([]),
      readyState: 1,
      OPEN: 1,
      /** @param {string} msg */
      send(msg) {
        this.sent.push(String(msg));
      }
    };
    wss.clients.add(/** @type {any} */ (sock));

    await handleMessage(
      /** @type {any} */ (sock),
      Buffer.from(
        JSON.stringify({
          id: 'sub-refresh',
          type: /** @type {any} */ ('subscribe-list'),
          payload: { id: 'c-refresh', type: 'ready-issues' }
        })
      )
    );

    const key = keyOf({ type: 'ready-issues' });

    const mock = /** @type {import('vitest').Mock} */ (
      fetchListForSubscription
    );
    mock.mockResolvedValueOnce({
      ok: true,
      items: [
        { id: 'A', updated_at: 2, closed_at: null },
        { id: 'C', updated_at: 1, closed_at: null }
      ]
    });

    scheduleListRefresh();
    await vi.advanceTimersByTimeAsync(60);

    const entry = activeRegistry().get(key);
    expect(entry?.cachedSnapshot?.length).toBe(2);
    const ids = entry?.cachedSnapshot?.map((it) => it.id).sort();
    expect(ids).toEqual(['A', 'C']);
  });

  test('refreshAndPublish discards in-flight result when generation changes', async () => {
    vi.useFakeTimers();
    const server = createServer();
    const { wss } = attachWsServer(server, {
      path: '/ws',
      heartbeat_ms: 10000,
      refresh_debounce_ms: 50
    });

    const sock = {
      sent: /** @type {string[]} */ ([]),
      readyState: 1,
      OPEN: 1,
      /** @param {string} msg */
      send(msg) {
        this.sent.push(String(msg));
      }
    };
    wss.clients.add(/** @type {any} */ (sock));

    await handleMessage(
      /** @type {any} */ (sock),
      Buffer.from(
        JSON.stringify({
          id: 'sub-gen',
          type: /** @type {any} */ ('subscribe-list'),
          payload: { id: 'c-gen', type: 'in-progress-issues' }
        })
      )
    );

    const key = keyOf({ type: 'in-progress-issues' });

    const mock = /** @type {import('vitest').Mock} */ (
      fetchListForSubscription
    );
    /** @type {(value: { ok: true, items: Array<{ id: string, updated_at: number, closed_at: null }> }) => void} */
    let resolve_refresh = () => {};
    mock.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolve_refresh = resolve;
        })
    );

    scheduleListRefresh();
    await vi.advanceTimersByTimeAsync(60);
    await Promise.resolve();

    activeRegistry().clear();

    resolve_refresh({
      ok: true,
      items: [{ id: 'STALE', updated_at: 99, closed_at: null }]
    });
    await Promise.resolve();

    const entry = activeRegistry().get(key);
    expect(entry?.cachedSnapshot ?? null).toBeNull();
  });

  test('subscribe-list serves cached snapshot immediately on cache hit', async () => {
    const server = createServer();
    attachWsServer(server, {
      path: '/ws',
      heartbeat_ms: 10000,
      refresh_debounce_ms: 50
    });

    const sock1 = {
      sent: /** @type {string[]} */ ([]),
      readyState: 1,
      OPEN: 1,
      /** @param {string} msg */
      send(msg) {
        this.sent.push(String(msg));
      }
    };

    await handleMessage(
      /** @type {any} */ (sock1),
      Buffer.from(
        JSON.stringify({
          id: 'sub-first',
          type: /** @type {any} */ ('subscribe-list'),
          payload: { id: 'c-first', type: 'all-issues' }
        })
      )
    );

    const mock = /** @type {import('vitest').Mock} */ (
      fetchListForSubscription
    );
    /** @type {(value: { ok: true, items: Array<{ id: string, updated_at: number, closed_at: null }> }) => void} */
    let resolve_refresh = () => {};
    mock.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolve_refresh = resolve;
        })
    );

    const sock2 = {
      sent: /** @type {string[]} */ ([]),
      readyState: 1,
      OPEN: 1,
      /** @param {string} msg */
      send(msg) {
        this.sent.push(String(msg));
      }
    };

    await handleMessage(
      /** @type {any} */ (sock2),
      Buffer.from(
        JSON.stringify({
          id: 'sub-cached',
          type: /** @type {any} */ ('subscribe-list'),
          payload: { id: 'c-cached', type: 'all-issues' }
        })
      )
    );

    const snapshot = sock2.sent
      .map((m) => {
        try {
          return JSON.parse(m);
        } catch {
          return null;
        }
      })
      .find((o) => o && o.type === 'snapshot');
    expect(snapshot).toBeTruthy();
    expect(snapshot.payload.id).toBe('c-cached');
    expect(Array.isArray(snapshot.payload.issues)).toBe(true);
    expect(snapshot.payload.issues.length).toBe(2);

    const ok_reply = sock2.sent
      .map((m) => {
        try {
          return JSON.parse(m);
        } catch {
          return null;
        }
      })
      .find((o) => o && o.ok === true && o.type === 'subscribe-list');
    expect(ok_reply).toBeTruthy();

    resolve_refresh({
      ok: true,
      items: [
        { id: 'A', updated_at: 2, closed_at: null },
        { id: 'B', updated_at: 1, closed_at: null }
      ]
    });
  });

  test('cache hit triggers background refresh that updates cachedSnapshot', async () => {
    vi.useFakeTimers();
    const server = createServer();
    const { wss } = attachWsServer(server, {
      path: '/ws',
      heartbeat_ms: 10000,
      refresh_debounce_ms: 50
    });

    const sock1 = {
      sent: /** @type {string[]} */ ([]),
      readyState: 1,
      OPEN: 1,
      /** @param {string} msg */
      send(msg) {
        this.sent.push(String(msg));
      }
    };
    wss.clients.add(/** @type {any} */ (sock1));

    await handleMessage(
      /** @type {any} */ (sock1),
      Buffer.from(
        JSON.stringify({
          id: 'sub-bg',
          type: /** @type {any} */ ('subscribe-list'),
          payload: { id: 'c-bg', type: 'resolved-issues' }
        })
      )
    );

    const mock = /** @type {import('vitest').Mock} */ (
      fetchListForSubscription
    );
    mock.mockResolvedValueOnce({
      ok: true,
      items: [
        { id: 'A', updated_at: 5, closed_at: null },
        { id: 'D', updated_at: 1, closed_at: null }
      ]
    });

    const sock2 = {
      sent: /** @type {string[]} */ ([]),
      readyState: 1,
      OPEN: 1,
      /** @param {string} msg */
      send(msg) {
        this.sent.push(String(msg));
      }
    };
    wss.clients.add(/** @type {any} */ (sock2));

    await handleMessage(
      /** @type {any} */ (sock2),
      Buffer.from(
        JSON.stringify({
          id: 'sub-bg2',
          type: /** @type {any} */ ('subscribe-list'),
          payload: { id: 'c-bg2', type: 'resolved-issues' }
        })
      )
    );

    await vi.advanceTimersByTimeAsync(1);

    const key = keyOf({ type: 'resolved-issues' });
    const entry = activeRegistry().get(key);
    const ids = entry?.cachedSnapshot?.map((it) => it.id).sort();
    expect(ids).toEqual(['A', 'D']);
  });

  test('subscribe-list cache hit serves empty array as valid cache', async () => {
    const mock = /** @type {import('vitest').Mock} */ (
      fetchListForSubscription
    );
    mock.mockResolvedValueOnce({ ok: true, items: [] });

    const sock1 = {
      sent: /** @type {string[]} */ ([]),
      readyState: 1,
      OPEN: 1,
      /** @param {string} msg */
      send(msg) {
        this.sent.push(String(msg));
      }
    };

    await handleMessage(
      /** @type {any} */ (sock1),
      Buffer.from(
        JSON.stringify({
          id: 'sub-empty',
          type: /** @type {any} */ ('subscribe-list'),
          payload: { id: 'c-empty', type: 'blocked-issues' }
        })
      )
    );

    /** @type {(value: { ok: true, items: [] }) => void} */
    let resolve_refresh = () => {};
    mock.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolve_refresh = resolve;
        })
    );

    const sock2 = {
      sent: /** @type {string[]} */ ([]),
      readyState: 1,
      OPEN: 1,
      /** @param {string} msg */
      send(msg) {
        this.sent.push(String(msg));
      }
    };

    await handleMessage(
      /** @type {any} */ (sock2),
      Buffer.from(
        JSON.stringify({
          id: 'sub-empty-2',
          type: /** @type {any} */ ('subscribe-list'),
          payload: { id: 'c-empty-2', type: 'blocked-issues' }
        })
      )
    );

    const snapshot = sock2.sent
      .map((m) => {
        try {
          return JSON.parse(m);
        } catch {
          return null;
        }
      })
      .find((o) => o && o.type === 'snapshot');
    expect(snapshot).toBeTruthy();
    expect(snapshot.payload.id).toBe('c-empty-2');
    expect(snapshot.payload.issues).toEqual([]);

    resolve_refresh({ ok: true, items: [] });
  });

  test('keeps cached registry snapshot when a warm refresh is stale', async () => {
    vi.useFakeTimers();
    const server = createServer();
    const { wss } = attachWsServer(server, {
      path: '/ws',
      heartbeat_ms: 10000,
      refresh_debounce_ms: 50
    });
    const sock = {
      sent: /** @type {string[]} */ ([]),
      readyState: 1,
      OPEN: 1,
      /** @param {string} msg */
      send(msg) {
        this.sent.push(String(msg));
      }
    };
    wss.clients.add(/** @type {any} */ (sock));

    await handleMessage(
      /** @type {any} */ (sock),
      Buffer.from(
        JSON.stringify({
          id: 'sub-stale',
          type: /** @type {any} */ ('subscribe-list'),
          payload: { id: 'c-stale', type: 'ready-issues' }
        })
      )
    );
    sock.sent = [];
    /** @type {import('vitest').Mock} */ (
      fetchListForSubscription
    ).mockResolvedValueOnce({ ok: true, stale: true, items: [] });

    scheduleListRefresh();
    await vi.advanceTimersByTimeAsync(60);

    const entry = activeRegistry().get(keyOf({ type: 'ready-issues' }));
    expect(entry?.cachedSnapshot?.map((item) => item.id)).toEqual(['A', 'B']);
    expect(sock.sent.map((message) => JSON.parse(message).type)).not.toContain(
      'delete'
    );
    expect(sock.sent.map((message) => JSON.parse(message).type)).not.toContain(
      'upsert'
    );
  });

  test('isolates one refresh projection failure from sibling publication', async () => {
    vi.useFakeTimers();
    const server = createServer();
    const { wss } = attachWsServer(server, {
      path: '/ws',
      heartbeat_ms: 10000,
      refresh_debounce_ms: 50
    });
    const ready = {
      sent: /** @type {string[]} */ ([]),
      readyState: 1,
      OPEN: 1,
      /** @param {string} msg */
      send(msg) {
        this.sent.push(String(msg));
      }
    };
    const running = {
      sent: /** @type {string[]} */ ([]),
      readyState: 1,
      OPEN: 1,
      /** @param {string} msg */
      send(msg) {
        this.sent.push(String(msg));
      }
    };
    wss.clients.add(/** @type {any} */ (ready));
    wss.clients.add(/** @type {any} */ (running));

    await handleMessage(
      /** @type {any} */ (ready),
      Buffer.from(
        JSON.stringify({
          id: 'sub-ready',
          type: /** @type {any} */ ('subscribe-list'),
          payload: { id: 'c-ready', type: 'ready-issues' }
        })
      )
    );
    await handleMessage(
      /** @type {any} */ (running),
      Buffer.from(
        JSON.stringify({
          id: 'sub-running',
          type: /** @type {any} */ ('subscribe-list'),
          payload: { id: 'c-running', type: 'in-progress-issues' }
        })
      )
    );
    ready.sent = [];
    running.sent = [];
    /** @type {import('vitest').Mock} */ (
      fetchListForSubscription
    ).mockImplementation(async (spec) => {
      if (spec.type === 'ready-issues') {
        throw new Error('projection failed');
      }
      return {
        ok: true,
        items: [{ id: 'RUNNING-2', updated_at: 2, closed_at: null }]
      };
    });

    scheduleListRefresh();
    await vi.advanceTimersByTimeAsync(60);

    expect(
      activeRegistry()
        .get(keyOf({ type: 'ready-issues' }))
        ?.cachedSnapshot?.map((item) => item.id)
    ).toEqual(['A', 'B']);
    expect(
      activeRegistry()
        .get(keyOf({ type: 'in-progress-issues' }))
        ?.cachedSnapshot?.map((item) => item.id)
    ).toEqual(['RUNNING-2']);
    expect(running.sent.map((message) => JSON.parse(message).type)).toContain(
      'upsert'
    );
  });
});
