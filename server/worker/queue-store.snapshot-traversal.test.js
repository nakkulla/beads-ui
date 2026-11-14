import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { buildMonitorPipeline } from '../ws/monitor-handlers.js';
import { decorateQueue } from '../ws/worker-handlers.js';
import { createLockManager } from './locks.js';
import { createMergeQueue } from './merge-queue.js';
import { makeAttempt } from './queue-store.js';
import { createRepoOperationCoordinator } from './repo-operation-coordinator.js';
import { __resetWorkerRuntimeForTest, getWorkerRuntime } from './runtime.js';
import { createScheduler } from './scheduler.js';
import { queueFilePath } from './state-paths.js';

const WS = '/tmp/queue-frozen-traversal';
const SHA = 'a'.repeat(40);
/** @type {string} */
let tmp_state;
/** @type {ReturnType<typeof getWorkerRuntime>['queueStore']} */
let store;
/** @type {import('./queue-store.js').Queue} */
let snapshot;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-frozen-traversal-'));
  vi.stubEnv('XDG_STATE_HOME', tmp_state);
  __resetWorkerRuntimeForTest();
  store = getWorkerRuntime().queueStore;
  seedCollections();
  snapshot = store.load(WS);
  // Every collection must survive real cold-load normalization, not just a
  // hand-built mock. This also catches a fixture that silently loses coverage.
  for (const [key, value] of Object.entries(snapshot)) {
    if (value && typeof value === 'object') {
      expect(Object.keys(value).length, key).toBeGreaterThan(0);
      expect(Object.isFrozen(value), key).toBe(true);
    }
  }
});

afterEach(() => {
  __resetWorkerRuntimeForTest();
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

/** Seed durable collection rows, then let the real store normalize and freeze. */
function seedCollections() {
  const target = {
    kind: 'usage_limit',
    model: 'opus',
    account: null,
    detail: 'limit',
    last_error: 'limit',
    resets_at: null,
    rearm_count: 0,
    attempt_ids: ['a1']
  };
  const raw = {
    ...store.snapshot(WS),
    queue: [{ bead_id: 'QUEUED', added_at: 1 }],
    serial_lanes: [{ id: 's1', entries: [{ bead_id: 'SERIAL', added_at: 1 }] }],
    pr_wait: [{ bead_id: 'MERGE', added_at: 1 }],
    done: [{ bead_id: 'DONE', added_at: Date.now() }],
    attempts: {
      a1: makeAttempt({ attempt_id: 'a1', bead_id: 'HELD', status: 'paused' }),
      merged: makeAttempt({
        attempt_id: 'merged',
        bead_id: 'MERGE',
        status: 'done',
        repo: WS,
        target_base: 'main'
      })
    },
    lineages: [{ bead_id: 'HELD', cause: 'environment', attempts: 1 }],
    provider_hold: { claude: { since: 1, generation: 1, targets: [target] } },
    provider_hold_members: {
      a1: {
        runner: 'claude',
        target_id: 'global-target',
        account: null,
        auto_switch: null,
        switch_ready_at: null,
        switch_ready_account: null
      }
    },
    auto_resume_pending: [
      {
        attempt_id: 'a1',
        generation: 1,
        account: null,
        kind: 'provider_outage'
      }
    ],
    wait_notified: { waiting: 1 },
    admission: { QUEUED: { reason: 'blocked', at: 1 } },
    cleanup_failed: { MERGE: { step: 'cleanup', reason: 'blocked', at: 1 } },
    merge_queue: [
      {
        bead_id: 'MERGE',
        resolution_rounds: 0,
        rebase_rounds: 0,
        resolution: null
      }
    ],
    auto_merge_skips: { SKIPPED: { head_sha: SHA, reason: 'refused', at: 1 } },
    merge_shelved: { SHELVED: { at: 1 } },
    completion_intents: {
      ROOT: {
        target_base: 'main',
        phase: 'gating',
        subject: { role: 'root', bead_id: 'ROOT' },
        active_op: null,
        terminal_reason: null,
        auto_resolution: null
      }
    },
    discard_operations: {
      discard: {
        bead_id: 'DISCARD',
        phase: 'done',
        mode: 'undecided',
        requested_at: 1,
        source_snapshot: {}
      }
    },
    interactive_sessions: {
      'SESSION:resolve': {
        bead_id: 'SESSION',
        kind: 'resolve',
        provider: 'claude',
        pane_id: '%1',
        tmux_session: 'interactive',
        tmux_window: 'session',
        launched_at: 1,
        state: 'live'
      }
    },
    fix_waits: {
      FIX: {
        bead_id: 'FIX',
        rig: WS,
        entered_at: 1,
        failure_identity: 'failure',
        state: 'passed'
      }
    },
    conversation_refusals: {
      SESSION: { reason: 'refused', at: 1, kind: 'resolve' }
    },
    session_inquiries: {
      'si-012345abcdef': {
        repo: WS,
        ref: 'refs/set-aside/test',
        session_id: 'session',
        cwd: WS,
        state: 'closed',
        created_at: 1
      }
    },
    repo_operations: {
      deploy: {
        schema: 1,
        kind: 'deploy',
        repo_id: WS,
        effective_base_sha: SHA,
        target_base: 'main',
        script_mode: '100755',
        script_blob_sha: SHA,
        state: 'succeeded',
        attempt_id: 'deploy',
        subjects: [{ bead_id: 'DONE', merged_sha: SHA }],
        finished_at: 1
      }
    },
    post_merge_jobs: {
      job: { state: 'applied', operation_id: 'deploy', repo_id: WS, at: 1 }
    }
  };
  fs.mkdirSync(path.dirname(queueFilePath(WS)), { recursive: true });
  fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));
  store.__clearCacheForTest();
}

test('decorates a frozen queue with every collection populated', () => {
  const before = JSON.stringify(snapshot);

  const decorated = decorateQueue(WS, snapshot);

  expect(decorated.revision).toBe(snapshot.revision);
  expect(decorated.queue).toHaveLength(1);
  expect(JSON.stringify(snapshot)).toBe(before);
});

test('aggregates a populated frozen queue for the monitor', () => {
  const before = JSON.stringify(snapshot);

  const pipeline = buildMonitorPipeline({
    listWorkspaces: () => [{ path: WS }],
    listHidden: () => [],
    snapshotFor: () => decorateQueue(WS, snapshot),
    runnableFor: () => [],
    sessionActiveFor: () => [],
    titleCache: () => null
  });

  expect(pipeline).toHaveLength(1);
  expect(JSON.stringify(snapshot)).toBe(before);
});

test('reconciles scheduler observations from frozen queue records', async () => {
  const before = JSON.stringify(snapshot);
  const scheduler = createScheduler(
    /** @type {any} */ ({
      store,
      bd: { readStatus: async () => 'open' },
      interactiveLauncher: {
        listPanesExtended: async () => ({
          ok: true,
          rows: [
            {
              pane: '%1',
              key: 'SESSION',
              cwd: WS,
              dead: '0',
              agent_running: '1',
              agent_attention: null
            }
          ]
        }),
        readPaneOption: async () => ({ ok: true, value: null })
      },
      conditionWaitPolicy: () => null,
      now: () => 1000
    })
  );

  await scheduler.reconcile(WS);

  expect(
    store.snapshot(WS).interactive_sessions['SESSION:resolve'].turn_state
  ).toBe('running');
  expect(
    snapshot.interactive_sessions['SESSION:resolve'].turn_state
  ).toBeNull();
  expect(JSON.stringify(snapshot)).toBe(before);
});

test('reconciles repository operations from a populated frozen queue', async () => {
  const before = JSON.stringify(snapshot);
  const coordinator = createRepoOperationCoordinator({
    workspace: WS,
    repo: WS,
    store,
    locks: createLockManager(),
    gitRun: async () => ({ code: 1, stdout: '', stderr: '' })
  });

  await coordinator.reconcile(WS);

  expect(JSON.stringify(snapshot)).toBe(before);
  expect(store.snapshot(WS).repo_operations.deploy.state).toBe('succeeded');
});

test('scans merge entries from a populated frozen queue', async () => {
  const before = JSON.stringify(snapshot);
  const merge = vi.fn(async () => {
    store.moveToDone(WS, { bead_id: 'MERGE', attempt_id: 'merged' });
    return { ok: true, action: /** @type {const} */ ('merged'), reason: null };
  });
  const queue = createMergeQueue({
    workspace: WS,
    store,
    merge,
    observePr: async () => ({ state: 'OPEN', error: null }),
    headSha: () => SHA
  });

  try {
    await queue.kick();
  } finally {
    queue.stop();
  }

  expect(merge).toHaveBeenCalledOnce();
  expect(JSON.stringify(snapshot)).toBe(before);
});
