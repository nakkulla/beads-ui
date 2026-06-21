import { createServer } from 'node:http';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { runBd, runBdJson, runShell } from './bd.js';
import { fetchListForSubscription } from './list-adapters.js';
import { registerWorkspace } from './registry-watcher.js';
import {
  __resetRegistriesForTest,
  attachWsServer,
  handleMessage
} from './ws.js';

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
  fetchListForSubscription: vi.fn(async () => ({ ok: true, items: [] }))
}));

beforeEach(() => {
  vi.useFakeTimers();
  __resetRegistriesForTest();
  /** @type {import('vitest').Mock} */ (runBd).mockReset();
  /** @type {import('vitest').Mock} */ (runBdJson).mockReset();
  /** @type {import('vitest').Mock} */ (runShell).mockReset();
  /** @type {import('vitest').Mock} */ (fetchListForSubscription).mockClear();
});

afterEach(() => {
  __resetRegistriesForTest();
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
  if (!server.listening) return;
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve(undefined)));
  });
}

/**
 * @param {import('ws').WebSocketServer} wss
 * @param {string} id
 */
async function callGitPull(wss, id) {
  const ws = makeSocket();
  wss.clients.add(/** @type {any} */ (ws));
  await handleMessage(
    /** @type {any} */ (ws),
    Buffer.from(JSON.stringify({ id, type: 'git-pull-workspace', payload: {} }))
  );
  return ws;
}

describe('git-pull-workspace handler', () => {
  test('returns server_error when no active workspace', async () => {
    const server = createServer();
    // initial_workspace_root: null forces CURRENT_WORKSPACE = null.
    const { wss } = attachWsServer(server, {
      path: '/ws',
      initial_workspace_root: null,
      refresh_debounce_ms: 50
    });

    try {
      const ws = await callGitPull(wss, 'gp-1');
      const reply = JSON.parse(ws.sent[0]);
      expect(reply.ok).toBe(false);
      expect(reply.error.code).toBe('server_error');
    } finally {
      await closeSocketServer(wss, server);
    }
  });

  test('returns updated status on normal pull', async () => {
    const server = createServer();
    const { wss } = attachWsServer(server, {
      path: '/ws',
      root_dir: '/repo-a',
      refresh_debounce_ms: 50
    });

    try {
      const mShell = /** @type {import('vitest').Mock} */ (runShell);
      mShell.mockResolvedValueOnce({
        code: 0,
        stdout: 'From github.com:foo/bar\n   abc..def main -> origin/main\n',
        stderr: ''
      });

      const ws = await callGitPull(wss, 'gp-2');
      const reply = JSON.parse(ws.sent[0]);

      expect(mShell).toHaveBeenCalledWith(
        'git',
        ['pull', '--rebase', '--autostash'],
        expect.objectContaining({ cwd: '/repo-a' })
      );
      expect(reply.ok).toBe(true);
      expect(reply.payload.status).toBe('updated');
      expect(reply.payload.workspace.root_dir).toBe('/repo-a');
    } finally {
      await closeSocketServer(wss, server);
    }
  });

  test('returns up_to_date when already up-to-date', async () => {
    const server = createServer();
    const { wss } = attachWsServer(server, {
      path: '/ws',
      root_dir: '/repo-a',
      refresh_debounce_ms: 50
    });

    try {
      /** @type {import('vitest').Mock} */ (runShell).mockResolvedValueOnce({
        code: 0,
        stdout: 'Already up to date.\n',
        stderr: ''
      });

      const ws = await callGitPull(wss, 'gp-3');
      const reply = JSON.parse(ws.sent[0]);
      expect(reply.payload.status).toBe('up_to_date');
    } finally {
      await closeSocketServer(wss, server);
    }
  });

  test('does not misclassify normal update without "Applied autostash" as stash_pop_conflict', async () => {
    const server = createServer();
    const { wss } = attachWsServer(server, {
      path: '/ws',
      root_dir: '/repo-a',
      refresh_debounce_ms: 50
    });

    try {
      /** @type {import('vitest').Mock} */ (runShell).mockResolvedValueOnce({
        code: 0,
        stdout: 'Updating abc..def\nFast-forward\n  file | 1 +\n',
        stderr: ''
      });

      const ws = await callGitPull(wss, 'gp-4');
      const reply = JSON.parse(ws.sent[0]);
      expect(reply.payload.status).toBe('updated');
    } finally {
      await closeSocketServer(wss, server);
    }
  });

  test('detects stash_pop_conflict via explicit marker', async () => {
    const server = createServer();
    const { wss } = attachWsServer(server, {
      path: '/ws',
      root_dir: '/repo-a',
      refresh_debounce_ms: 50
    });

    try {
      /** @type {import('vitest').Mock} */ (runShell).mockResolvedValueOnce({
        code: 0,
        stdout:
          'Created autostash: abc123\nApplied autostash failed.\nThe stash entry is kept in case you need it again.\n',
        stderr: ''
      });

      const ws = await callGitPull(wss, 'gp-5');
      const reply = JSON.parse(ws.sent[0]);
      expect(reply.payload.status).toBe('stash_pop_conflict');
    } finally {
      await closeSocketServer(wss, server);
    }
  });

  test('detects rebase conflict in stdout (not just stderr) and aborts', async () => {
    const server = createServer();
    const { wss } = attachWsServer(server, {
      path: '/ws',
      root_dir: '/repo-a',
      refresh_debounce_ms: 50
    });

    try {
      const mShell = /** @type {import('vitest').Mock} */ (runShell);
      mShell
        .mockResolvedValueOnce({
          code: 1,
          stdout:
            'Auto-merging file.txt\nCONFLICT (content): Merge conflict in file.txt\n',
          stderr: 'error: could not apply abc... commit\n'
        })
        .mockResolvedValueOnce({ code: 0, stdout: '', stderr: '' }); // abort succeeds

      const ws = await callGitPull(wss, 'gp-6');
      const reply = JSON.parse(ws.sent[0]);

      expect(mShell).toHaveBeenNthCalledWith(
        2,
        'git',
        ['rebase', '--abort'],
        expect.objectContaining({ cwd: '/repo-a' })
      );
      expect(reply.ok).toBe(false);
      expect(reply.error.code).toBe('rebase_conflict');
    } finally {
      await closeSocketServer(wss, server);
    }
  });

  test('returns rebase_conflict_abort_failed when abort fails', async () => {
    const server = createServer();
    const { wss } = attachWsServer(server, {
      path: '/ws',
      root_dir: '/repo-a',
      refresh_debounce_ms: 50
    });

    try {
      /** @type {import('vitest').Mock} */ (runShell)
        .mockResolvedValueOnce({
          code: 1,
          stdout: 'CONFLICT (content): Merge conflict in file.txt\n',
          stderr: 'could not apply\n'
        })
        .mockResolvedValueOnce({
          code: 1,
          stdout: '',
          stderr: 'fatal: No rebase in progress?'
        });

      const ws = await callGitPull(wss, 'gp-7');
      const reply = JSON.parse(ws.sent[0]);
      expect(reply.ok).toBe(false);
      expect(reply.error.code).toBe('rebase_conflict_abort_failed');
    } finally {
      await closeSocketServer(wss, server);
    }
  });

  test('returns git_error for other failures without conflict markers', async () => {
    const server = createServer();
    const { wss } = attachWsServer(server, {
      path: '/ws',
      root_dir: '/repo-a',
      refresh_debounce_ms: 50
    });

    try {
      /** @type {import('vitest').Mock} */ (runShell).mockResolvedValueOnce({
        code: 128,
        stdout: '',
        stderr: 'fatal: not a git repository'
      });

      const ws = await callGitPull(wss, 'gp-8');
      const reply = JSON.parse(ws.sent[0]);
      expect(reply.ok).toBe(false);
      expect(reply.error.code).toBe('git_error');
      expect(reply.error.message).toContain('not a git repository');
    } finally {
      await closeSocketServer(wss, server);
    }
  });

  test('returns busy when git-pull is already running for same workspace', async () => {
    const server = createServer();
    const { wss } = attachWsServer(server, {
      path: '/ws',
      root_dir: '/repo-a',
      refresh_debounce_ms: 50
    });

    try {
      let release = () => {};
      /** @type {import('vitest').Mock} */ (runShell).mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            release = () =>
              resolve({ code: 0, stdout: 'Already up to date.\n', stderr: '' });
          })
      );

      const ws1 = makeSocket();
      wss.clients.add(/** @type {any} */ (ws1));
      const first = handleMessage(
        /** @type {any} */ (ws1),
        Buffer.from(
          JSON.stringify({
            id: 'gp-busy-1',
            type: 'git-pull-workspace',
            payload: {}
          })
        )
      );
      await Promise.resolve();
      await Promise.resolve();

      const ws2 = await callGitPull(wss, 'gp-busy-2');
      const reply2 = JSON.parse(ws2.sent[0]);
      expect(reply2.ok).toBe(false);
      expect(reply2.error.code).toBe('busy');

      release();
      await first;
    } finally {
      await closeSocketServer(wss, server);
    }
  });

  test('git-pull is busy when sync-workspace is in progress for same workspace', async () => {
    const server = createServer();
    const { wss } = attachWsServer(server, {
      path: '/ws',
      root_dir: '/repo-a',
      refresh_debounce_ms: 50
    });

    try {
      let releasePull = () => {};
      /** @type {import('vitest').Mock} */ (runBd).mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            releasePull = () => resolve({ code: 0, stdout: '', stderr: '' });
          })
      );

      const ws1 = makeSocket();
      wss.clients.add(/** @type {any} */ (ws1));
      const first = handleMessage(
        /** @type {any} */ (ws1),
        Buffer.from(
          JSON.stringify({
            id: 'sync-busy',
            type: 'sync-workspace',
            payload: {}
          })
        )
      );
      await Promise.resolve();
      await Promise.resolve();

      const ws2 = await callGitPull(wss, 'gp-busy-3');
      const reply2 = JSON.parse(ws2.sent[0]);
      expect(reply2.ok).toBe(false);
      expect(reply2.error.code).toBe('busy');

      // unblock first sync's pull and let it finish (push will use undefined mock → resolve)
      /** @type {import('vitest').Mock} */ (runBd).mockResolvedValueOnce({
        code: 0,
        stdout: '',
        stderr: ''
      });
      releasePull();
      await first;
    } finally {
      await closeSocketServer(wss, server);
    }
  });

  test('uses snapshotted root_dir even if this connection switches workspace mid-op', async () => {
    const server = createServer();
    const { wss } = attachWsServer(server, {
      path: '/ws',
      root_dir: '/repo-a',
      refresh_debounce_ms: 50
    });

    // Make /repo-b a valid set-workspace target for this connection.
    registerWorkspace({ path: '/repo-b', database: '/repo-b/.beads/beads.db' });

    try {
      let release = () => {};
      /** @type {import('vitest').Mock} */ (runShell).mockImplementationOnce(
        (
          /** @type {any} */ _bin,
          /** @type {any} */ _args,
          /** @type {any} */ opts
        ) =>
          new Promise((resolve) => {
            release = () =>
              resolve({
                code: 0,
                stdout: 'Already up to date.\n',
                stderr: '',
                __cwd: opts.cwd
              });
          })
      );

      const ws = makeSocket();
      wss.clients.add(/** @type {any} */ (ws));
      const inflight = handleMessage(
        /** @type {any} */ (ws),
        Buffer.from(
          JSON.stringify({
            id: 'gp-snap',
            type: 'git-pull-workspace',
            payload: {}
          })
        )
      );

      await Promise.resolve();
      await Promise.resolve();

      // mid-op: switch THIS connection's workspace via a set-workspace message
      await handleMessage(
        /** @type {any} */ (ws),
        Buffer.from(
          JSON.stringify({
            id: 'set-mid',
            type: 'set-workspace',
            payload: { path: '/repo-b' }
          })
        )
      );

      release();
      await inflight;

      // The git-pull reply (found by id, since set-workspace also replied) must
      // use the snapshot root captured before the mid-op switch.
      const reply = ws.sent
        .map((m) => JSON.parse(m))
        .find((o) => o && o.id === 'gp-snap');
      expect(reply.ok).toBe(true);
      expect(reply.payload.workspace.root_dir).toBe('/repo-a');
    } finally {
      await closeSocketServer(wss, server);
    }
  });
});
