import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { MESSAGE_TYPES } from '../app/protocol.js';
import { __resetWorkerAttachmentsForTest } from './worker/attach.js';
import {
  __resetRegistriesForTest,
  __resetWorkerQueueForTest,
  attachWsServer,
  handleMessage
} from './ws.js';
import {
  __resetMonitorPipelineForTest,
  buildMonitorPipeline,
  buildMonitorWorkspacesState
} from './ws/monitor-handlers.js';
import { decorateQueue } from './ws/worker-handlers.js';

/** @type {string} */
let tmp_state;

/**
 * A minimal fake socket that records everything the server sends.
 */
function fakeSocket() {
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
 * @param {{ sent: string[] }} sock
 * @param {string} id
 * @param {string} type
 * @param {Record<string, unknown>} [payload]
 * @returns {Promise<void>}
 */
async function send(sock, id, type, payload) {
  await handleMessage(
    /** @type {any} */ (sock),
    Buffer.from(JSON.stringify({ id, type, payload }))
  );
}

/**
 * @param {{ sent: string[] }} sock
 * @param {string} id
 * @returns {any}
 */
function replyFor(sock, id) {
  for (const raw of sock.sent) {
    const m = JSON.parse(raw);
    if (m.id === id) {
      return m;
    }
  }
  return null;
}

/**
 * @param {{ sent: string[] }} sock
 * @returns {any[]}
 */
function pipelineSnapshots(sock) {
  return sock.sent
    .map((m) => JSON.parse(m))
    .filter((m) => m.type === 'monitor-pipeline-snapshot')
    .map((m) => m.payload);
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-mon-'));
  process.env.XDG_STATE_HOME = tmp_state;
  __resetRegistriesForTest();
  __resetWorkerQueueForTest();
  __resetMonitorPipelineForTest();
  attachWsServer(createServer(), { path: '/ws' });
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  __resetRegistriesForTest();
  __resetWorkerQueueForTest();
  __resetMonitorPipelineForTest();
  __resetWorkerAttachmentsForTest();
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

describe('ws monitor-pipeline channel (UI-nprg)', () => {
  test('carries the three message types in the protocol vocabulary', () => {
    expect(MESSAGE_TYPES).toContain('subscribe-monitor-pipeline');
    expect(MESSAGE_TYPES).toContain('unsubscribe-monitor-pipeline');
    expect(MESSAGE_TYPES).toContain('monitor-pipeline-snapshot');
  });

  test('subscribe emits an initial aggregated snapshot', async () => {
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-monitor-pipeline', { id: 'mon' });

    expect(replyFor(sock, 's1').ok).toBe(true);
    const snaps = pipelineSnapshots(sock);
    expect(snaps).toHaveLength(1);
    expect(snaps[0].id).toBe('mon');
    expect(Array.isArray(snaps[0].workspaces)).toBe(true);
  });

  test('unsubscribe reports the subscription it removed', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-monitor-pipeline', { id: 'mon' });

    await send(sock, 'u1', 'unsubscribe-monitor-pipeline', { id: 'mon' });

    expect(replyFor(sock, 'u1').payload).toEqual({
      id: 'mon',
      unsubscribed: true
    });
  });

  // 승인된 프로토콜의 구독 요청은 payload가 없다.
  test('accepts a payload-less subscribe', async () => {
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-monitor-pipeline');

    expect(replyFor(sock, 's1').ok).toBe(true);
    const snaps = pipelineSnapshots(sock);
    expect(snaps).toHaveLength(1);
    expect(snaps[0].id).toBe('monitor:pipeline');
  });
});

describe('monitor pipeline done retention (UI-qbbg §4.6)', () => {
  const DAY_MS = 86_400_000;
  const WS_RETENTION = '/tmp/mon-retention';

  /**
   * @param {number} added_at
   * @returns {Record<string, any>}
   */
  function repoWithOneDoneRow(added_at) {
    return {
      revision: 3,
      queue: [],
      pr_wait: [],
      done: [{ bead_id: 'UI-old', added_at }],
      attempts: {}
    };
  }

  /**
   * @param {Record<string, any>} raw
   * @returns {{ workspaces: Array<Record<string, any>>, state: Array<Record<string, any>> }}
   */
  function buildBoth(raw) {
    const seams = {
      listWorkspaces: () => [{ path: WS_RETENTION }],
      listHidden: () => [],
      issuePrefixFor: () => null,
      runnableFor: () => [],
      sessionActiveFor: () => []
    };
    return {
      workspaces: buildMonitorPipeline({
        ...seams,
        snapshotFor: (key) => decorateQueue(key, raw)
      }),
      state: buildMonitorWorkspacesState({
        ...seams,
        snapshotFor: () => raw,
        sessionDefaultsFor: () => ({ values: {}, warnings: [] })
      })
    };
  }

  test('drops a repo whose only done row aged out but keeps its control state', () => {
    const raw = repoWithOneDoneRow(Date.now() - 8 * DAY_MS);

    const { workspaces, state } = buildBoth(raw);

    expect(workspaces).toEqual([]);
    expect(state.map((entry) => entry.root_dir)).toEqual([WS_RETENTION]);
  });

  test('keeps a repo whose done row is still inside the window', () => {
    const raw = repoWithOneDoneRow(Date.now() - 1 * DAY_MS);

    const { workspaces } = buildBoth(raw);

    expect(workspaces.map((entry) => entry.root_dir)).toEqual([WS_RETENTION]);
  });
});
