import { createServer } from 'node:http';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { projectedResponse } from './__fixtures__/bd-json/projected.js';
import { getGitUserName, runBd, runBdJsonProjected } from './bd.js';
import { fetchListForSubscription } from './list-adapters.js';
import { registerWorkspace } from './registry-watcher.js';
import { signalWorkspaceSnapshotMutation } from './workspace-snapshot-runtime.js';
import {
  __resetRegistriesForTest,
  attachWsServer,
  handleMessage,
  registryFor,
  scheduleListRefresh
} from './ws.js';

/**
 * Per-cwd list items returned by the mocked list adapter. Mutating this map
 * lets each scenario make per-workspace data diverge by working directory.
 *
 * @type {Map<string, Array<{ id: string, updated_at: number, closed_at: number | null }>>}
 */
const LIST_ITEMS_BY_CWD = new Map();

// The workspace effect gate has its own tests; these state an open gate rather
// than probing the live bd binary.
vi.mock('./bd-effect-gate.js', async (importOriginal) => {
  /** @type {any} */
  const actual = await importOriginal();
  return {
    ...actual,
    requireBdJsonCapabilityForWorkspace: async () => ({ ok: true })
  };
});

vi.mock('./bd.js', () => ({
  runBd: vi.fn(),
  runBdJsonProjected: vi.fn(),
  getGitUserName: vi.fn()
}));

vi.mock('./db.js', () => ({
  // Distinct db path per workspace so set-workspace `changed` is deterministic.
  resolveWorkspaceDatabase: (/** @type {{ cwd?: string }} */ options = {}) => ({
    path: `${options.cwd || ''}/.beads/beads.db`,
    source: 'nearest',
    exists: true
  })
}));

vi.mock('./list-adapters.js', () => ({
  // Return items keyed by the operating cwd so per-workspace data differs.
  fetchListForSubscription: vi.fn(
    async (
      /** @type {{ type: string }} */ _spec,
      /** @type {{ cwd?: string }} */ options = {}
    ) => ({
      ok: true,
      items: LIST_ITEMS_BY_CWD.get(options.cwd || '') || []
    })
  )
}));

beforeEach(() => {
  vi.useFakeTimers();
  __resetRegistriesForTest();
  LIST_ITEMS_BY_CWD.clear();
  /** @type {import('vitest').Mock} */ (runBd).mockReset();
  /** @type {import('vitest').Mock} */ (runBdJsonProjected).mockReset();
  /** @type {import('vitest').Mock} */ (getGitUserName).mockReset();
  /** @type {import('vitest').Mock} */ (fetchListForSubscription).mockClear();
});

afterEach(() => {
  __resetRegistriesForTest();
  vi.useRealTimers();
});

/** @returns {any} */
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
 * @param {any} sock
 * @param {object} req
 */
async function send(sock, req) {
  await handleMessage(sock, Buffer.from(JSON.stringify(req)));
}

/**
 * @param {any} sock
 * @returns {Array<any>}
 */
function envelopes(sock) {
  return sock.sent
    .map((/** @type {string} */ m) => {
      try {
        return JSON.parse(m);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

/**
 * Attach a server defaulting to /repo-a, register both workspaces, then create
 * two stub sockets pinned to /repo-a (A) and /repo-b (B) via set-workspace.
 *
 * @returns {Promise<{ server: import('node:http').Server, wss: import('ws').WebSocketServer, A: any, B: any }>}
 */
async function setupTwoWorkspaces() {
  const server = createServer();
  const { wss } = attachWsServer(server, {
    path: '/ws',
    root_dir: '/repo-a',
    refresh_debounce_ms: 50
  });
  registerWorkspace({ path: '/repo-a', database: '/repo-a/.beads/beads.db' });
  registerWorkspace({ path: '/repo-b', database: '/repo-b/.beads/beads.db' });

  const A = makeSocket();
  const B = makeSocket();
  wss.clients.add(A);
  wss.clients.add(B);

  await send(A, {
    id: 'ws-a',
    type: 'set-workspace',
    payload: { path: '/repo-a' }
  });
  await send(B, {
    id: 'ws-b',
    type: 'set-workspace',
    payload: { path: '/repo-b' }
  });

  A.sent = [];
  B.sent = [];
  return { server, wss, A, B };
}

/**
 * @param {import('ws').WebSocketServer} wss
 * @param {import('node:http').Server} server
 */
async function closeSocketServer(wss, server) {
  wss.clients.clear();
  wss.emit('close');
  if (!server.listening) return;
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve(undefined)));
  });
}

describe('per-connection workspace isolation', () => {
  test('(1) same mutation runs with each connection cwd — no bleed', async () => {
    const { server, wss, A, B } = await setupTwoWorkspaces();
    try {
      const mRun = /** @type {import('vitest').Mock} */ (runBd);
      const mJson = /** @type {import('vitest').Mock} */ (runBdJsonProjected);
      mRun.mockResolvedValue({ code: 0, stdout: '', stderr: '' });
      mJson.mockResolvedValue(
        projectedResponse(null, { code: 0, stdoutJson: { id: 'X-1' } })
      );

      await send(A, {
        id: 'a-upd',
        type: 'update-status',
        payload: { id: 'X-1', status: 'open' }
      });
      await send(B, {
        id: 'b-upd',
        type: 'update-status',
        payload: { id: 'X-1', status: 'open' }
      });

      const updateCalls = mRun.mock.calls.filter((c) => c[0][0] === 'update');
      const aCall = updateCalls.find((c) => c[1] && c[1].cwd === '/repo-a');
      const bCall = updateCalls.find((c) => c[1] && c[1].cwd === '/repo-b');
      expect(aCall).toBeTruthy();
      expect(bCall).toBeTruthy();
      // No call used the wrong cwd for the other connection.
      expect(updateCalls.length).toBe(2);
    } finally {
      await closeSocketServer(wss, server);
    }
  });

  test('(2) subscribe snapshots carry per-workspace data (entries not shared)', async () => {
    const { server, wss, A, B } = await setupTwoWorkspaces();
    try {
      LIST_ITEMS_BY_CWD.set('/repo-a', [
        { id: 'A-1', updated_at: 1, closed_at: null }
      ]);
      LIST_ITEMS_BY_CWD.set('/repo-b', [
        { id: 'B-1', updated_at: 1, closed_at: null }
      ]);

      await send(A, {
        id: 'sa',
        type: 'subscribe-list',
        payload: { id: 'c-a', type: 'all-issues' }
      });
      await send(B, {
        id: 'sb',
        type: 'subscribe-list',
        payload: { id: 'c-b', type: 'all-issues' }
      });

      const aSnap = envelopes(A).find((e) => e.type === 'snapshot');
      const bSnap = envelopes(B).find((e) => e.type === 'snapshot');
      expect(aSnap.payload.issues.map((/** @type {any} */ i) => i.id)).toEqual([
        'A-1'
      ]);
      expect(bSnap.payload.issues.map((/** @type {any} */ i) => i.id)).toEqual([
        'B-1'
      ]);

      // Registries are independent: different cached snapshots per workspace.
      const regA = registryFor('/repo-a');
      const regB = registryFor('/repo-b');
      expect(regA).not.toBe(regB);
      const keyA = regA.get('all-issues');
      const keyB = regB.get('all-issues');
      expect(keyA?.cachedSnapshot?.map((i) => i.id)).toEqual(['A-1']);
      expect(keyB?.cachedSnapshot?.map((i) => i.id)).toEqual(['B-1']);
    } finally {
      await closeSocketServer(wss, server);
    }
  });

  test('(3) set-workspace on A does not notify B; B keeps its cwd', async () => {
    const { server, wss, A, B } = await setupTwoWorkspaces();
    try {
      const mRun = /** @type {import('vitest').Mock} */ (runBd);
      const mJson = /** @type {import('vitest').Mock} */ (runBdJsonProjected);
      mRun.mockResolvedValue({ code: 0, stdout: '', stderr: '' });
      mJson.mockResolvedValue(
        projectedResponse(null, { code: 0, stdoutJson: { id: 'X-2' } })
      );

      // A switches to /repo-b (a different workspace for A only).
      await send(A, {
        id: 'a-switch',
        type: 'set-workspace',
        payload: { path: '/repo-b' }
      });

      // B received no workspace-changed broadcast as a side effect.
      const bWorkspaceChanged = envelopes(B).find(
        (e) => e.type === 'workspace-changed'
      );
      expect(bWorkspaceChanged).toBeUndefined();

      // B's subsequent mutation still targets /repo-b.
      mRun.mockClear();
      await send(B, {
        id: 'b-upd',
        type: 'update-status',
        payload: { id: 'X-2', status: 'open' }
      });
      const bUpdate = mRun.mock.calls.find((c) => c[0][0] === 'update');
      expect(bUpdate?.[1]?.cwd).toBe('/repo-b');
    } finally {
      await closeSocketServer(wss, server);
    }
  });

  test('(4) server refresh fans out per workspace (one fetch per workspace,key)', async () => {
    const { server, wss, A, B } = await setupTwoWorkspaces();
    try {
      LIST_ITEMS_BY_CWD.set('/repo-a', [
        { id: 'A-1', updated_at: 1, closed_at: null }
      ]);
      LIST_ITEMS_BY_CWD.set('/repo-b', [
        { id: 'B-1', updated_at: 1, closed_at: null }
      ]);

      await send(A, {
        id: 'sa',
        type: 'subscribe-list',
        payload: { id: 'c-a', type: 'all-issues' }
      });
      await send(B, {
        id: 'sb',
        type: 'subscribe-list',
        payload: { id: 'c-b', type: 'all-issues' }
      });

      const mFetch = /** @type {import('vitest').Mock} */ (
        fetchListForSubscription
      );
      mFetch.mockClear();
      A.sent = [];
      B.sent = [];

      // Diverge each workspace's data so the refresh emits a per-workspace delta.
      LIST_ITEMS_BY_CWD.set('/repo-a', [
        { id: 'A-1', updated_at: 1, closed_at: null },
        { id: 'A-2', updated_at: 1, closed_at: null }
      ]);
      LIST_ITEMS_BY_CWD.set('/repo-b', [
        { id: 'B-1', updated_at: 1, closed_at: null },
        { id: 'B-2', updated_at: 1, closed_at: null }
      ]);

      scheduleListRefresh();
      await vi.advanceTimersByTimeAsync(60);
      await Promise.resolve();

      // Exactly one fetch per (workspace, key): one /repo-a + one /repo-b.
      const cwds = mFetch.mock.calls.map((c) => c[1]?.cwd).sort();
      expect(cwds).toEqual(['/repo-a', '/repo-b']);

      // A only sees /repo-a items; B only sees /repo-b items.
      const aIds = envelopes(A)
        .filter((e) => e.type === 'upsert')
        .map((e) => e.payload.issue.id);
      const bIds = envelopes(B)
        .filter((e) => e.type === 'upsert')
        .map((e) => e.payload.issue.id);
      expect(aIds).toContain('A-2');
      expect(aIds.some((/** @type {string} */ id) => id.startsWith('B-'))).toBe(
        false
      );
      expect(bIds).toContain('B-2');
      expect(bIds.some((/** @type {string} */ id) => id.startsWith('A-'))).toBe(
        false
      );
    } finally {
      await closeSocketServer(wss, server);
    }
  });

  test('(5) disconnecting A leaves B subscription intact', async () => {
    const { server, wss, A, B } = await setupTwoWorkspaces();
    try {
      LIST_ITEMS_BY_CWD.set('/repo-a', [
        { id: 'A-1', updated_at: 1, closed_at: null }
      ]);
      LIST_ITEMS_BY_CWD.set('/repo-b', [
        { id: 'B-1', updated_at: 1, closed_at: null }
      ]);

      await send(A, {
        id: 'sa',
        type: 'subscribe-list',
        payload: { id: 'c-a', type: 'all-issues' }
      });
      await send(B, {
        id: 'sb',
        type: 'subscribe-list',
        payload: { id: 'c-b', type: 'all-issues' }
      });

      // Disconnect A: detach from its workspace registry and drop from clients
      // (mirrors the production close handler sweeping all registries).
      registryFor('/repo-a').onDisconnect(A);
      registryFor('/repo-b').onDisconnect(A);
      wss.clients.delete(A);

      A.sent = [];
      B.sent = [];

      // Diverge /repo-b so a later refresh produces a delta for B.
      LIST_ITEMS_BY_CWD.set('/repo-b', [
        { id: 'B-1', updated_at: 1, closed_at: null },
        { id: 'B-2', updated_at: 1, closed_at: null }
      ]);

      scheduleListRefresh();
      await vi.advanceTimersByTimeAsync(60);
      await Promise.resolve();

      // B still receives its refresh.
      const bIds = envelopes(B)
        .filter((e) => e.type === 'upsert')
        .map((e) => e.payload.issue.id);
      expect(bIds).toContain('B-2');

      // A (disconnected) receives nothing further.
      expect(A.sent.length).toBe(0);
    } finally {
      await closeSocketServer(wss, server);
    }
  });

  test('(6) records a watcher mutation for B while A mutation gate is active', async () => {
    const { server, wss, A, B } = await setupTwoWorkspaces();
    try {
      LIST_ITEMS_BY_CWD.set('/repo-a', [
        { id: 'A-1', updated_at: 1, closed_at: null }
      ]);
      LIST_ITEMS_BY_CWD.set('/repo-b', [
        { id: 'B-1', updated_at: 1, closed_at: null }
      ]);
      await send(A, {
        id: 'sub-a',
        type: 'subscribe-list',
        payload: { id: 'sub-a', type: 'all-issues' }
      });
      await send(B, {
        id: 'sub-b',
        type: 'subscribe-list',
        payload: { id: 'sub-b', type: 'all-issues' }
      });
      const spy = vi.spyOn(
        await import('./workspace-snapshot-runtime.js'),
        'signalWorkspaceSnapshotMutation'
      );
      signalWorkspaceSnapshotMutation('/repo-a');
      await import('./ws/refresh.js').then(({ triggerMutationRefreshOnce }) =>
        triggerMutationRefreshOnce(500)
      );

      scheduleListRefresh('watcher', '/repo-b');

      expect(spy).toHaveBeenCalledWith('/repo-b');
    } finally {
      await closeSocketServer(wss, server);
    }
  });
});
