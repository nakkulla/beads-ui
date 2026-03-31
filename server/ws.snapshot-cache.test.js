import { createServer } from 'node:http';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { fetchListForSubscription } from './list-adapters.js';
import { keyOf, registry } from './subscriptions.js';
import { attachWsServer, handleMessage, scheduleListRefresh } from './ws.js';

vi.mock('./list-adapters.js', () => ({
  fetchListForSubscription: vi.fn(async () => ({
    ok: true,
    items: [
      { id: 'A', updated_at: 1, closed_at: null },
      { id: 'B', updated_at: 1, closed_at: null }
    ]
  }))
}));

describe('snapshot cache', () => {
  afterEach(() => {
    registry.clear();
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
    const entry = registry.get(key);
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

    const entry = registry.get(key);
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

    registry.clear();

    resolve_refresh({
      ok: true,
      items: [{ id: 'STALE', updated_at: 99, closed_at: null }]
    });
    await Promise.resolve();

    const entry = registry.get(key);
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
          payload: { id: 'c-first', type: 'epics' }
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
          payload: { id: 'c-cached', type: 'epics' }
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
    const entry = registry.get(key);
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
});
