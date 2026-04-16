import { createServer } from 'node:http';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { runBd, runBdJson } from './bd.js';
import { fetchListForSubscription } from './list-adapters.js';
import { attachWsServer, handleMessage, scheduleListRefresh } from './ws.js';

vi.mock('./bd.js', () => ({ runBdJson: vi.fn(), runBd: vi.fn() }));
vi.mock('./list-adapters.js', () => ({
  fetchListForSubscription: vi.fn(async () => ({
    ok: true,
    items: [{ id: 'UI-1', updated_at: 1, closed_at: null }]
  }))
}));

beforeEach(() => {
  vi.useFakeTimers();
  /** @type {import('vitest').Mock} */ (runBd).mockReset();
  /** @type {import('vitest').Mock} */ (runBdJson).mockReset();
  /** @type {import('vitest').Mock} */ (fetchListForSubscription).mockClear();
});

afterEach(() => {
  vi.useRealTimers();
});

function makeSocket() {
  return {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    /** @param {string} msg */
    send(msg) {
      this.sent.push(String(msg));
    }
  };
}

/**
 * @param {import('ws').WebSocketServer} wss
 * @param {import('node:http').Server} server
 */
async function closeSocketServer(wss, server) {
  wss.clients.clear();
  wss.emit('close');

  if (!server.listening) {
    return;
  }

  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(undefined);
    });
  });
}

/**
 * @param {import('ws').WebSocketServer} wss
 * @returns {Promise<ReturnType<typeof makeSocket>>}
 */
async function subscribeActiveList(wss) {
  const ws = makeSocket();
  wss.clients.add(/** @type {any} */ (ws));

  await handleMessage(
    /** @type {any} */ (ws),
    Buffer.from(
      JSON.stringify({
        id: 'sub-1',
        type: 'subscribe-list',
        payload: { id: 'active-list', type: 'all-issues' }
      })
    )
  );

  return ws;
}

describe('sync-workspace handler', () => {
  test('runs bd dolt pull in current workspace and refreshes active subscriptions', async () => {
    const server = createServer();
    const { wss } = attachWsServer(server, {
      path: '/ws',
      root_dir: '/repo-a',
      refresh_debounce_ms: 50
    });

    try {
      await subscribeActiveList(wss);

      const mFetch = /** @type {import('vitest').Mock} */ (
        fetchListForSubscription
      );
      mFetch.mockClear();

      const mRun = /** @type {import('vitest').Mock} */ (runBd);
      mRun.mockResolvedValueOnce({ code: 0, stdout: 'ok', stderr: '' });

      const ws = makeSocket();
      wss.clients.add(/** @type {any} */ (ws));

      await handleMessage(
        /** @type {any} */ (ws),
        Buffer.from(
          JSON.stringify({
            id: 'sync-1',
            type: 'sync-workspace',
            payload: {}
          })
        )
      );

      scheduleListRefresh();
      await vi.advanceTimersByTimeAsync(0);
      await Promise.resolve();

      expect(mRun).toHaveBeenCalledWith(
        ['dolt', 'pull'],
        expect.objectContaining({
          cwd: '/repo-a',
          sandbox: false
        })
      );
      expect(mFetch).toHaveBeenCalledTimes(1);

      const reply = JSON.parse(ws.sent[0]);
      expect(reply.ok).toBe(true);
      expect(reply.payload.workspace.root_dir).toBe('/repo-a');
    } finally {
      await closeSocketServer(wss, server);
    }
  });

  test('returns bd_error and does not refresh when pull fails', async () => {
    const server = createServer();
    const { wss } = attachWsServer(server, {
      path: '/ws',
      root_dir: '/repo-a',
      refresh_debounce_ms: 50
    });

    try {
      await subscribeActiveList(wss);

      const mFetch = /** @type {import('vitest').Mock} */ (
        fetchListForSubscription
      );
      mFetch.mockClear();

      const mRun = /** @type {import('vitest').Mock} */ (runBd);
      mRun.mockResolvedValueOnce({
        code: 1,
        stdout: '',
        stderr: 'pull failed'
      });

      const ws = makeSocket();
      wss.clients.add(/** @type {any} */ (ws));

      await handleMessage(
        /** @type {any} */ (ws),
        Buffer.from(
          JSON.stringify({
            id: 'sync-2',
            type: 'sync-workspace',
            payload: {}
          })
        )
      );

      await vi.advanceTimersByTimeAsync(500);

      expect(mFetch).toHaveBeenCalledTimes(0);

      const reply = JSON.parse(ws.sent[0]);
      expect(reply.ok).toBe(false);
      expect(reply.error.code).toBe('bd_error');
    } finally {
      await closeSocketServer(wss, server);
    }
  });
});
