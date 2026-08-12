import { createServer } from 'node:http';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { runBdJson } from './bd.js';
import {
  __resetWorkspaceSnapshotRuntimeForTest,
  signalWorkspaceSnapshotMutation
} from './workspace-snapshot-runtime.js';
import {
  __resetRegistriesForTest,
  attachWsServer,
  handleMessage,
  scheduleListRefresh
} from './ws.js';

vi.mock('./bd.js', () => ({ runBdJson: vi.fn(), runBd: vi.fn() }));

const ALL_ARGS = ['list', '--json', '--tree=false', '--all', '--limit', '0'];
const READY_ARGS = ['ready', '--explain', '--limit', '0', '--json'];

beforeEach(() => {
  vi.useFakeTimers();
  __resetRegistriesForTest();
  __resetWorkspaceSnapshotRuntimeForTest();
  /** @type {import('vitest').Mock} */ (runBdJson).mockImplementation(
    async (args) => {
      if (args[0] === 'list') {
        return {
          code: 0,
          stdoutJson: [{ id: 'A', status: 'open', dependencies: [] }]
        };
      }
      return { code: 0, stdoutJson: { ready: [], blocked: [] } };
    }
  );
});

afterEach(() => {
  __resetRegistriesForTest();
  __resetWorkspaceSnapshotRuntimeForTest();
  vi.useRealTimers();
});

/**
 * @returns {{ sent: string[], readyState: number, OPEN: number, send: (message: string) => void }}
 */
function makeSocket() {
  return {
    sent: [],
    readyState: 1,
    OPEN: 1,
    send(message) {
      this.sent.push(String(message));
    }
  };
}

/**
 * @param {object} ws
 * @param {string} id
 * @param {string} type
 */
async function subscribeList(ws, id, type) {
  await handleMessage(
    /** @type {any} */ (ws),
    Buffer.from(
      JSON.stringify({
        id,
        type: 'subscribe-list',
        payload: { id, type }
      })
    )
  );
}

describe('workspace snapshot publication', () => {
  test('runs one watcher generation for multiple active specs', async () => {
    const server = createServer();
    const { wss } = attachWsServer(server, {
      path: '/ws',
      refresh_debounce_ms: 0
    });
    const ws = makeSocket();
    wss.clients.add(/** @type {any} */ (ws));

    await subscribeList(ws, 'all', 'all-issues');
    await subscribeList(ws, 'ready', 'ready-issues');
    await subscribeList(ws, 'progress', 'in-progress-issues');

    /** @type {import('vitest').Mock} */ (runBdJson).mockClear();

    scheduleListRefresh('watcher');
    await vi.advanceTimersByTimeAsync(0);

    expect(runBdJson).toHaveBeenCalledTimes(2);
    expect(
      /** @type {import('vitest').Mock} */ (runBdJson).mock.calls.map(
        (call) => call[0]
      )
    ).toEqual([ALL_ARGS, READY_ARGS]);
  });

  test('publishes only one trailing Board generation after an in-flight mutation', async () => {
    const server = createServer();
    const { wss } = attachWsServer(server, {
      path: '/ws',
      refresh_debounce_ms: 0
    });
    const ws = makeSocket();
    wss.clients.add(/** @type {any} */ (ws));
    await subscribeList(ws, 'board', 'all-issues');
    /** @type {import('vitest').Mock} */ (runBdJson).mockClear();
    ws.sent = [];

    /** @type {Array<(value: unknown) => void>} */
    const resolvers = [];
    /** @type {import('vitest').Mock} */ (runBdJson).mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolvers.push(resolve);
        })
    );
    /** @type {import('vitest').Mock} */ (runBdJson).mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolvers.push(resolve);
        })
    );
    /** @type {import('vitest').Mock} */ (runBdJson).mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolvers.push(resolve);
        })
    );
    /** @type {import('vitest').Mock} */ (runBdJson).mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolvers.push(resolve);
        })
    );

    scheduleListRefresh('poll');
    await vi.advanceTimersByTimeAsync(0);
    signalWorkspaceSnapshotMutation(process.cwd());
    resolvers[0]({
      code: 0,
      stdoutJson: [{ id: 'PRE', status: 'open', dependencies: [] }]
    });
    resolvers[1]({ code: 0, stdoutJson: { ready: [], blocked: [] } });
    await vi.advanceTimersByTimeAsync(0);
    resolvers[2]({
      code: 0,
      stdoutJson: [{ id: 'POST', status: 'open', dependencies: [] }]
    });
    resolvers[3]({ code: 0, stdoutJson: { ready: [], blocked: [] } });
    await vi.advanceTimersByTimeAsync(0);

    expect(runBdJson).toHaveBeenCalledTimes(4);
    const upserts = ws.sent
      .map((message) => JSON.parse(message))
      .filter((message) => message.type === 'upsert')
      .map((message) => message.payload.issue.id);
    expect(upserts).toEqual(['POST']);
  });
});
