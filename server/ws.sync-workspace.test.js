import { createServer } from 'node:http';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { runBd, runBdSync } from './bd.js';
import { getWorkspaceSyncInfo } from './db.js';
import { fetchListForSubscription } from './list-adapters.js';
import { keyOf, registry } from './subscriptions.js';
import { attachWsServer, handleMessage } from './ws.js';

vi.mock('./bd.js', () => ({
  getGitUserName: vi.fn(async () => ''),
  runBd: vi.fn(async () => ({ code: 0, stdout: '', stderr: '' })),
  runBdJson: vi.fn(async () => ({ code: 0, stdoutJson: [] })),
  runBdSync: vi.fn(async () => ({ code: 0, stdout: '', stderr: '' }))
}));

vi.mock('./db.js', () => ({
  getWorkspaceSyncInfo: vi.fn((options = {}) => ({
    path: `${options.cwd || '/tmp/default'}/.beads`,
    source: 'metadata',
    exists: true,
    backend: 'dolt',
    can_sync: true
  }))
}));

vi.mock('./list-adapters.js', () => ({
  fetchListForSubscription: vi.fn(async () => ({
    ok: true,
    items: [{ id: 'A', updated_at: 1, closed_at: null }]
  }))
}));

/**
 * @returns {any}
 */
function makeStubSocket() {
  return {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    /**
     * @param {string} msg
     */
    send(msg) {
      this.sent.push(String(msg));
    }
  };
}

const run_bd_mock = /** @type {import('vitest').Mock} */ (runBd);
const run_bd_sync_mock = /** @type {import('vitest').Mock} */ (runBdSync);
const get_workspace_sync_info_mock = /** @type {import('vitest').Mock} */ (
  getWorkspaceSyncInfo
);
const fetch_list_mock = /** @type {import('vitest').Mock} */ (
  fetchListForSubscription
);

beforeEach(() => {
  run_bd_mock.mockReset();
  run_bd_sync_mock.mockReset();
  fetch_list_mock.mockReset();
  get_workspace_sync_info_mock.mockReset();

  fetch_list_mock.mockResolvedValue({
    ok: true,
    items: [{ id: 'A', updated_at: 1, closed_at: null }]
  });
  get_workspace_sync_info_mock.mockImplementation((options = {}) => ({
    path: `${options.cwd || '/tmp/default'}/.beads`,
    source: 'metadata',
    exists: true,
    backend: 'dolt',
    can_sync: true
  }));
});

afterEach(() => {
  registry.clear();
});

describe('sync-workspace', () => {
  test('starts dolt when needed, pulls, and refreshes active subscriptions', async () => {
    const server = createServer();
    const { wss } = attachWsServer(server, { path: '/ws', root_dir: '/tmp/a' });
    const sock = makeStubSocket();
    wss.clients.add(/** @type {any} */ (sock));

    run_bd_sync_mock
      .mockResolvedValueOnce({
        code: 0,
        stdout: 'Dolt server: not running\n  Expected port: 0',
        stderr: ''
      })
      .mockResolvedValueOnce({ code: 0, stdout: 'started', stderr: '' })
      .mockResolvedValueOnce({ code: 0, stdout: 'pulled', stderr: '' });

    await handleMessage(
      /** @type {any} */ (sock),
      Buffer.from(
        JSON.stringify({
          id: 'sub-1',
          type: 'subscribe-list',
          payload: { id: 'blocked', type: 'blocked-issues' }
        })
      )
    );

    fetch_list_mock.mockClear();

    await handleMessage(
      /** @type {any} */ (sock),
      Buffer.from(
        JSON.stringify({
          id: 'sync-1',
          type: 'sync-workspace',
          payload: { reason: 'manual' }
        })
      )
    );

    const reply = sock.sent
      .map((message) => JSON.parse(message))
      .find((message) => message.id === 'sync-1');

    expect(reply?.ok).toBe(true);
    expect(reply?.payload.started_dolt).toBe(true);
    expect(reply?.payload.pulled).toBe(true);
    expect(reply?.payload.refreshed).toBe(true);
    expect(run_bd_sync_mock.mock.calls.map((call) => call[0])).toEqual([
      ['dolt', 'status'],
      ['dolt', 'start'],
      ['dolt', 'pull']
    ]);
    expect(fetch_list_mock).toHaveBeenCalledTimes(1);
  });

  test('returns structured error when dolt start fails', async () => {
    const sock = makeStubSocket();

    run_bd_sync_mock
      .mockResolvedValueOnce({
        code: 0,
        stdout: 'Dolt server: not running\n  Expected port: 0',
        stderr: ''
      })
      .mockResolvedValueOnce({
        code: 1,
        stdout: '',
        stderr: 'start failed'
      });

    await handleMessage(
      /** @type {any} */ (sock),
      Buffer.from(
        JSON.stringify({
          id: 'sync-start-fail',
          type: 'sync-workspace',
          payload: { path: '/tmp/a', reason: 'manual' }
        })
      )
    );

    const reply = JSON.parse(sock.sent.at(-1));
    expect(reply.ok).toBe(false);
    expect(reply.error.code).toBe('bd_error');
    expect(reply.error.message).toContain('start failed');
  });

  test('returns structured error when pull fails without clearing local subscriptions', async () => {
    const server = createServer();
    const { wss } = attachWsServer(server, { path: '/ws', root_dir: '/tmp/a' });
    const sock = makeStubSocket();
    wss.clients.add(/** @type {any} */ (sock));

    run_bd_sync_mock
      .mockResolvedValueOnce({
        code: 0,
        stdout: 'Dolt server: running\n  Port: 50000',
        stderr: ''
      })
      .mockResolvedValueOnce({
        code: 1,
        stdout: '',
        stderr: 'pull failed'
      });

    await handleMessage(
      /** @type {any} */ (sock),
      Buffer.from(
        JSON.stringify({
          id: 'sub-before-pull-fail',
          type: 'subscribe-list',
          payload: { id: 'blocked', type: 'blocked-issues' }
        })
      )
    );

    await handleMessage(
      /** @type {any} */ (sock),
      Buffer.from(
        JSON.stringify({
          id: 'sync-pull-fail',
          type: 'sync-workspace',
          payload: { path: '/tmp/a', reason: 'manual' }
        })
      )
    );

    const reply = JSON.parse(sock.sent.at(-1));
    expect(reply.ok).toBe(false);
    expect(reply.error.message).toContain('pull failed');
    expect(
      registry.get(keyOf({ type: 'blocked-issues' }))?.subscribers.size
    ).toBeGreaterThan(0);
  });

  test('rejects sync-workspace for a workspace with can_sync false', async () => {
    const sock = makeStubSocket();

    get_workspace_sync_info_mock.mockImplementation((options = {}) => {
      const root_dir = String(options.cwd || '');
      if (root_dir === '/tmp/sqlite-only') {
        return {
          path: '/tmp/sqlite-only/.beads/default.db',
          source: 'home-default',
          exists: true,
          backend: 'sqlite',
          can_sync: false
        };
      }
      return {
        path: `${root_dir || '/tmp/default'}/.beads`,
        source: 'metadata',
        exists: true,
        backend: 'dolt',
        can_sync: true
      };
    });

    await handleMessage(
      /** @type {any} */ (sock),
      Buffer.from(
        JSON.stringify({
          id: 'sync-disabled',
          type: 'sync-workspace',
          payload: { path: '/tmp/sqlite-only', reason: 'manual' }
        })
      )
    );

    const reply = JSON.parse(sock.sent.at(-1));
    expect(reply.ok).toBe(false);
    expect(reply.error.code).toBe('bad_request');
  });

  test('does not refresh active subscriptions for stale workspace after switch', async () => {
    const server = createServer();
    const { wss } = attachWsServer(server, { path: '/ws', root_dir: '/tmp/a' });
    const sock = makeStubSocket();
    wss.clients.add(/** @type {any} */ (sock));

    /** @type {(value: { code: number, stdout: string, stderr: string }) => void} */
    let resolve_pull = () => {};
    run_bd_sync_mock
      .mockResolvedValueOnce({
        code: 0,
        stdout: 'Dolt server: running\n  Port: 50000',
        stderr: ''
      })
      .mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            resolve_pull = resolve;
          })
      );

    await handleMessage(
      /** @type {any} */ (sock),
      Buffer.from(
        JSON.stringify({
          id: 'sub-stale',
          type: 'subscribe-list',
          payload: { id: 'blocked', type: 'blocked-issues' }
        })
      )
    );

    fetch_list_mock.mockClear();

    const sync_promise = handleMessage(
      /** @type {any} */ (sock),
      Buffer.from(
        JSON.stringify({
          id: 'sync-stale',
          type: 'sync-workspace',
          payload: { path: '/tmp/a', reason: 'manual' }
        })
      )
    );

    while (run_bd_sync_mock.mock.calls.length < 2) {
      await new Promise((resolve) => setTimeout(resolve, 0));
    }

    await handleMessage(
      /** @type {any} */ (sock),
      Buffer.from(
        JSON.stringify({
          id: 'switch-b',
          type: 'set-workspace',
          payload: { path: '/tmp/b' }
        })
      )
    );

    resolve_pull({ code: 0, stdout: 'pulled', stderr: '' });
    await sync_promise;

    const reply = sock.sent
      .map((message) => JSON.parse(message))
      .find((message) => message.id === 'sync-stale');

    expect(reply?.ok).toBe(true);
    expect(reply?.payload.refreshed).toBe(false);
    expect(fetch_list_mock).not.toHaveBeenCalled();
  });
});
