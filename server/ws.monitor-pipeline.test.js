import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { MESSAGE_TYPES } from '../app/protocol.js';
import { createExternalJobObservations } from './external-job-observations.js';
import { __resetWorkerAttachmentsForTest } from './worker/attach.js';
import { getWorkerRuntime } from './worker/runtime.js';
import {
  __resetRegistriesForTest,
  __resetWorkerQueueForTest,
  attachWsServer,
  handleMessage
} from './ws.js';
import {
  __resetMonitorPipelineForTest,
  buildMonitorPipeline,
  buildMonitorWorkspacesState,
  refreshExternalWaitsForVisible
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
  test('does no external observation work without subscribers', async () => {
    const listRoots = vi.fn(() => ['/repo']);
    const requestSnapshot = vi.fn();
    const collector = { collect: vi.fn() };

    await refreshExternalWaitsForVisible({
      subscriberCount: () => 0,
      listRoots,
      requestSnapshot,
      collector
    });

    expect(listRoots).not.toHaveBeenCalled();
    expect(requestSnapshot).not.toHaveBeenCalled();
    expect(collector.collect).not.toHaveBeenCalled();
  });

  test('shares one snapshot and collector read across concurrent refreshes', async () => {
    let finish_collection = () => {};
    const requestSnapshot = vi.fn(async () => ({ ok: true, snapshot: {} }));
    const collector = {
      collect: vi.fn(
        () =>
          new Promise(
            (resolve) => (finish_collection = () => resolve(undefined))
          )
      )
    };
    const options = /** @type {any} */ ({
      subscriberCount: () => 1,
      listRoots: () => ['/repo'],
      requestSnapshot,
      collector,
      onPush: vi.fn()
    });

    const first = refreshExternalWaitsForVisible(options);
    const second = refreshExternalWaitsForVisible(options);
    await vi.waitFor(() => {
      expect(collector.collect).toHaveBeenCalledTimes(1);
    });

    expect(second).toBe(first);
    expect(requestSnapshot).toHaveBeenCalledTimes(1);
    finish_collection();
    await first;
  });

  test('skips collection when the last subscriber leaves during snapshot read', async () => {
    let subscriber_count = 1;
    let finish_snapshot = () => {};
    const collector = { collect: vi.fn() };
    const pending = refreshExternalWaitsForVisible({
      subscriberCount: () => subscriber_count,
      listRoots: () => ['/repo'],
      requestSnapshot: () =>
        new Promise(
          (resolve) =>
            (finish_snapshot = () =>
              resolve(/** @type {any} */ ({ ok: true, snapshot: {} })))
        ),
      collector,
      onPush: vi.fn()
    });
    subscriber_count = 0;

    finish_snapshot();
    await pending;

    expect(collector.collect).not.toHaveBeenCalled();
  });

  test('marks a stale coordinator snapshot and clears it after recovery', async () => {
    const gate = {
      id: 'UI-gate',
      title: '외부 계산',
      issue_type: 'gate',
      await_id: 'a'.repeat(24),
      await_type: 'human',
      status: 'open'
    };
    const consumer = { id: 'UI-consumer', title: '분석', status: 'open' };
    const snapshot = {
      all: [gate, consumer],
      id_index: new Map([
        [gate.id, gate],
        [consumer.id, consumer]
      ]),
      blocks_in: new Map([[gate.id, [consumer.id]]])
    };
    const watch = {
      schema: 'external-job-monitor-v1',
      watch_id: 'a'.repeat(24),
      repo: '/repo/.worktrees/job',
      gate_id: gate.id,
      consumer: consumer.id,
      job_id: '42',
      stage: 'active',
      observation_state: 'RUNNING',
      last_observed_at: '2026-09-15T00:54:00Z',
      next_observation_at: '2026-09-15T01:09:00Z'
    };
    const observations = createExternalJobObservations({
      state_root: '/state',
      now: () => Date.parse('2026-09-15T01:00:00Z'),
      fs: {
        readdir: async () => [`${watch.watch_id}.json`],
        readFile: async () => JSON.stringify(watch)
      },
      run: async (file) =>
        file === 'bead-job-monitor'
          ? {
              stdout: JSON.stringify({
                ok: true,
                schema: 'external-job-monitor-service-v1',
                loaded: true,
                command_matches: true,
                loaded_matches_plist: true,
                executable_exists: true,
                last_tick: { exit_code: 0, skipped: true }
              })
            }
          : { stdout: '/repo/.git\n' }
    });
    let coordinator_stale = true;
    const options = /** @type {any} */ ({
      subscriberCount: () => 1,
      listRoots: () => ['/repo'],
      requestSnapshot: async () => ({
        ok: true,
        snapshot,
        stale: coordinator_stale,
        fresh: !coordinator_stale
      }),
      collector: observations,
      onPush: vi.fn()
    });

    await refreshExternalWaitsForVisible(options);
    expect(observations.get().rows[0]).toMatchObject({
      gate_id: gate.id,
      stale: true,
      monitor_state: '감시 확인 필요',
      monitor_reason: '이슈 스냅샷이 오래된 자료임'
    });

    coordinator_stale = false;
    await refreshExternalWaitsForVisible(options);
    expect(observations.get().rows[0]).toMatchObject({
      gate_id: gate.id,
      monitor_state: '자동 확인 중'
    });
    expect(observations.get().rows[0].stale).toBeUndefined();
  });

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

describe('monitor pipeline external PR facts (UI-kyky §6.1)', () => {
  const WS_FOREIGN = '/tmp/mon-foreign';

  test('carries the same overlay fields the worker snapshot gets', () => {
    getWorkerRuntime().externalPrs.replace(
      WS_FOREIGN,
      [
        {
          bead_id: 'UI-ext',
          pr_url: 'https://github.com/other/repo/pull/12',
          pr_number: 12
        }
      ],
      { origin_slug: 'o/r' }
    );
    const raw = { revision: 1, queue: [], pr_wait: [], done: [], attempts: {} };

    const workspaces = buildMonitorPipeline({
      listWorkspaces: () => [{ path: WS_FOREIGN }],
      listHidden: () => [],
      runnableFor: () => [],
      sessionActiveFor: () => [],
      snapshotFor: (/** @type {string} */ key) => decorateQueue(key, raw)
    });

    expect(/** @type {any} */ (workspaces[0]).pr_wait[0]).toMatchObject({
      bead_id: 'UI-ext',
      external: true,
      foreign: true,
      repo_slug: 'other/repo',
      pr_url: 'https://github.com/other/repo/pull/12',
      pr_number: 12
    });
  });
});

describe('monitor pipeline external waits (UI-7341)', () => {
  const WS_EXTERNAL = '/tmp/mon-external';
  const external_row = {
    gate_id: 'Analysis-ph3a',
    gate_open: true,
    root_dir: WS_EXTERNAL,
    monitor_state: '감시 확인 필요'
  };

  test('keeps an otherwise empty workspace and reports its attention count', () => {
    const raw = { revision: 1, queue: [], pr_wait: [], done: [], attempts: {} };
    const seams = {
      listWorkspaces: () => [{ path: WS_EXTERNAL }],
      listHidden: () => [],
      runnableFor: () => [],
      sessionActiveFor: () => [],
      snapshotFor: (/** @type {string} */ key) => decorateQueue(key, raw)
    };

    const workspaces = buildMonitorPipeline({
      ...seams,
      externalRows: () => ({
        rows: [external_row],
        collected_at: 123,
        stale: false
      })
    });
    const state = buildMonitorWorkspacesState({
      ...seams,
      issuePrefixFor: () => null,
      sessionDefaultsFor: () => ({ values: {}, warnings: [] }),
      externalRows: () => [external_row]
    });

    expect(workspaces[0]).toMatchObject({
      root_dir: WS_EXTERNAL,
      external_waits: [
        expect.objectContaining({ gate_id: 'Analysis-ph3a', collected_at: 123 })
      ]
    });
    expect(state[0]).toMatchObject({
      external_wait_count: 1,
      external_wait_attention_count: 1
    });
  });
});

describe('monitor pipeline implementation actor (UI-ys18 §5.1)', () => {
  const WS_ACTOR = '/tmp/mon-impl-actor';

  test('carries the same decorated impl_actor the worker snapshot gets', () => {
    const now = Date.now();
    const raw = {
      revision: 1,
      queue: [],
      pr_wait: [],
      done: [{ bead_id: 'UI-done', added_at: now }],
      attempts: {
        'att-1': {
          attempt_id: 'att-1',
          bead_id: 'UI-done',
          status: 'done',
          finished_at: now,
          receipt_check: {
            checks: {
              exec_receipt: `delegated:gpt-5-codex:high@${'a'.repeat(40)}`
            }
          }
        }
      }
    };

    const workspaces = buildMonitorPipeline({
      listWorkspaces: () => [{ path: WS_ACTOR }],
      listHidden: () => [],
      runnableFor: () => [],
      sessionActiveFor: () => [],
      carriedToFor: () => ({}),
      snapshotFor: (key) => decorateQueue(key, raw)
    });

    const attempts = /** @type {any} */ (workspaces[0]).attempts;
    expect(attempts['att-1'].impl_actor.label).toBe('gpt-5-codex/high');
    expect(attempts['att-1']).not.toHaveProperty('receipt_check');
  });
});
