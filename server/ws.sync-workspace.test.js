import { createServer } from 'node:http';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { runBd, runBdJson, runShell } from './bd.js';
import { fetchListForSubscription } from './list-adapters.js';
import { attachWsServer, handleMessage, scheduleListRefresh } from './ws.js';

vi.mock('./bd.js', () => ({
  runBdJson: vi.fn(),
  runBd: vi.fn(),
  runShell: vi.fn(),
  stderrTail: (/** @type {string|null|undefined} */ text) => {
    if (!text) return '';
    const lines = String(text).split(/\r?\n/);
    for (let i = lines.length - 1; i >= 0; i -= 1) {
      const line = lines[i].trim();
      if (line.length > 0) {
        return line.length > 200 ? line.slice(0, 200) : line;
      }
    }
    return '';
  }
}));
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
  /** @type {import('vitest').Mock} */ (runShell).mockReset();
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

/**
 * @param {import('ws').WebSocketServer} wss
 * @param {string} type
 * @param {string} id
 */
async function callOp(wss, type, id) {
  const ws = makeSocket();
  wss.clients.add(/** @type {any} */ (ws));
  await handleMessage(
    /** @type {any} */ (ws),
    Buffer.from(JSON.stringify({ id, type, payload: {} }))
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
      // initial pull, push (both succeed)
      mRun
        .mockResolvedValueOnce({ code: 0, stdout: 'ok', stderr: '' })
        .mockResolvedValueOnce({ code: 0, stdout: 'ok', stderr: '' });

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

      expect(mRun).toHaveBeenNthCalledWith(
        1,
        ['dolt', 'pull'],
        expect.objectContaining({ cwd: '/repo-a', sandbox: false })
      );
      expect(mRun).toHaveBeenNthCalledWith(
        2,
        ['dolt', 'push'],
        expect.objectContaining({ cwd: '/repo-a', sandbox: false })
      );
      expect(mFetch).toHaveBeenCalledTimes(1);

      const reply = JSON.parse(ws.sent[0]);
      expect(reply.ok).toBe(true);
      expect(reply.payload.workspace.root_dir).toBe('/repo-a');
      expect(reply.payload.pulled).toBe(true);
      expect(reply.payload.pushed).toBe(true);
    } finally {
      await closeSocketServer(wss, server);
    }
  });

  test('reports pulled true / pushed false on push retry exhaustion', async () => {
    const server = createServer();
    const { wss } = attachWsServer(server, {
      path: '/ws',
      root_dir: '/repo-a',
      refresh_debounce_ms: 50
    });

    try {
      await subscribeActiveList(wss);

      const mRun = /** @type {import('vitest').Mock} */ (runBd);
      mRun
        .mockResolvedValueOnce({ code: 0, stdout: '', stderr: '' }) // pull
        .mockResolvedValueOnce({
          code: 1,
          stdout: '',
          stderr: 'remote rejected'
        }) // push fail
        .mockResolvedValueOnce({ code: 0, stdout: '', stderr: '' }) // retry pull
        .mockResolvedValueOnce({
          code: 1,
          stdout: '',
          stderr: 'still rejected'
        }); // retry push fail

      const ws = await callOp(wss, 'sync-workspace', 'sync-3');

      const reply = JSON.parse(ws.sent[0]);
      expect(reply.ok).toBe(true);
      expect(reply.payload.pulled).toBe(true);
      expect(reply.payload.pushed).toBe(false);
      expect(reply.payload.push_error).toBe('still rejected');
    } finally {
      await closeSocketServer(wss, server);
    }
  });

  test('retry pull failure also marks pushed false with retry pull error', async () => {
    const server = createServer();
    const { wss } = attachWsServer(server, {
      path: '/ws',
      root_dir: '/repo-a',
      refresh_debounce_ms: 50
    });

    try {
      await subscribeActiveList(wss);

      const mRun = /** @type {import('vitest').Mock} */ (runBd);
      mRun
        .mockResolvedValueOnce({ code: 0, stdout: '', stderr: '' }) // pull
        .mockResolvedValueOnce({ code: 1, stdout: '', stderr: 'reject' }) // push fail
        .mockResolvedValueOnce({
          code: 1,
          stdout: '',
          stderr: 'retry pull failed'
        });

      const ws = await callOp(wss, 'sync-workspace', 'sync-4');

      const reply = JSON.parse(ws.sent[0]);
      expect(reply.ok).toBe(true);
      expect(reply.payload.pulled).toBe(true);
      expect(reply.payload.pushed).toBe(false);
      expect(reply.payload.push_error).toBe('retry pull failed');
    } finally {
      await closeSocketServer(wss, server);
    }
  });

  test('retry push success after pull retry yields pushed true', async () => {
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
      mRun
        .mockResolvedValueOnce({ code: 0, stdout: '', stderr: '' }) // pull
        .mockResolvedValueOnce({ code: 1, stdout: '', stderr: 'reject' }) // push 1
        .mockResolvedValueOnce({ code: 0, stdout: '', stderr: '' }) // retry pull
        .mockResolvedValueOnce({ code: 0, stdout: '', stderr: '' }); // retry push

      const ws = await callOp(wss, 'sync-workspace', 'sync-5');

      const reply = JSON.parse(ws.sent[0]);
      expect(reply.ok).toBe(true);
      expect(reply.payload.pulled).toBe(true);
      expect(reply.payload.pushed).toBe(true);
      // refresh count timing depends on mutation gate; verified separately
    } finally {
      await closeSocketServer(wss, server);
    }
  });

  test('returns busy when sync is already in progress for same workspace', async () => {
    const server = createServer();
    const { wss } = attachWsServer(server, {
      path: '/ws',
      root_dir: '/repo-a',
      refresh_debounce_ms: 50
    });

    try {
      await subscribeActiveList(wss);

      const mRun = /** @type {import('vitest').Mock} */ (runBd);
      let releasePull = () => {};
      // First sync's pull blocks until we release it
      mRun.mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            releasePull = () => resolve({ code: 0, stdout: '', stderr: '' });
          })
      );
      mRun.mockResolvedValueOnce({ code: 0, stdout: '', stderr: '' }); // first sync push

      const ws1 = makeSocket();
      wss.clients.add(/** @type {any} */ (ws1));
      const first = handleMessage(
        /** @type {any} */ (ws1),
        Buffer.from(
          JSON.stringify({ id: 'sync-a', type: 'sync-workspace', payload: {} })
        )
      );
      // Let the first handler enter the lock
      await Promise.resolve();
      await Promise.resolve();

      // Second concurrent sync should bounce with busy
      const ws2 = await callOp(wss, 'sync-workspace', 'sync-b');
      const reply2 = JSON.parse(ws2.sent[0]);
      expect(reply2.ok).toBe(false);
      expect(reply2.error.code).toBe('busy');

      releasePull();
      await first;
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
