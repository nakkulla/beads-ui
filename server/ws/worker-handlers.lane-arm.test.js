/**
 * `worker-queue-arm` / `worker-queue-disarm` (UI-jaua §5.3): the Monitor cross
 * lane's own dispatch axis, driven through the real queue store so the reply,
 * the durable rows, and the follow-up tick are all observed at once.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const state = vi.hoisted(() => ({
  /** @type {string[]} */
  tick_calls: [],
  /** @type {string[]} */
  workspaces: []
}));

vi.mock('../registry-watcher.js', async (importOriginal) => {
  const actual = /** @type {any} */ (await importOriginal());
  return {
    ...actual,
    getAvailableWorkspaces: () =>
      state.workspaces.map((workspace_path) => ({ path: workspace_path }))
  };
});

vi.mock('../worker/attach.js', () => ({
  backupFreshWorkerStaleWork: () => Promise.resolve({ ok: true }),
  checkWorkerQueueAdmission: () => Promise.resolve({ ok: true }),
  continueWorkerStaleWork: () => Promise.resolve({ ok: true }),
  discardWorkerBead: () => Promise.resolve({ ok: true }),
  dismissWorkerRepoOperation: () => Promise.resolve({ ok: true }),
  enqueueWorkerManualMerge: () =>
    Promise.resolve({ ok: false, conflict: false, reason: 'no_attachment' }),
  enrollWorkerMergeCandidates: () => ({ applied: false, conflict: false }),
  kickWorkerMergeQueue: () => Promise.resolve(),
  observeWorkerPrs: () => Promise.resolve(),
  pauseWorkerAttempt: () => Promise.resolve({ ok: true }),
  recheckWorkerStaleWork: () => Promise.resolve({ ok: true }),
  reconcileWorkerRepoOperations: () => Promise.resolve(),
  refreshWorkerExternalPrs: () => Promise.resolve(false),
  resumeWorkerAttempt: () => Promise.resolve({ ok: true }),
  retryWorkerCleanup: () => Promise.resolve({ ok: true }),
  reviseApproveWorkerBead: () => Promise.resolve({ ok: true }),
  reviseFixWorkerBead: () => Promise.resolve({ ok: true }),
  startWorkerRepoOperationDeployRun: () => Promise.resolve({ ok: true }),
  stopWorkerHeadReviewAttempts: () => Promise.resolve(),
  /** @param {string} workspace_key */
  tickWorkerQueue: (workspace_key) => {
    state.tick_calls.push(String(workspace_key));
    return Promise.resolve();
  },
  workerMergeEffectInFlight: () => false,
  workerMergeQueueState: () => ({ active: null, failures: {} }),
  workerSlots: () => null,
  workerWorktreeExists: () => false
}));

const { setConnWorkspace } = await import('./context.js');
const { getWorkerRuntime } = await import('../worker/runtime.js');
const handlers = await import('./worker-handlers.js');

const WS_CONN = '/tmp/example/lane-arm-conn';
const WS_TARGET = '/tmp/example/lane-arm-target';

/** @type {string} */
let tmp_state;

/**
 * @returns {any}
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
 * @param {(ws: any, req: any) => unknown} run
 * @param {string} type
 * @param {Record<string, unknown>} payload
 */
async function dispatch(run, type, payload) {
  const sock = fakeSocket();
  setConnWorkspace(sock, { root_dir: WS_CONN, db_path: '' });
  await run(sock, { id: 'r1', type, payload });
  await new Promise((resolve) => setTimeout(resolve, 0));
  return JSON.parse(/** @type {string[]} */ (sock.sent).at(-1) || 'null');
}

/**
 * @param {string} workspace
 * @param {string[]} bead_ids
 */
function seedQueue(workspace, bead_ids) {
  const store = getWorkerRuntime().queueStore;
  for (const bead_id of bead_ids) {
    store.place(workspace, {
      expected_revision: store.snapshot(workspace).revision,
      bead_id
    });
  }
  return store;
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-lane-arm-'));
  process.env.XDG_STATE_HOME = tmp_state;
  state.tick_calls = [];
  state.workspaces = [WS_CONN, WS_TARGET];
  handlers.__resetWorkerQueueForTest();
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  handlers.__resetWorkerQueueForTest();
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

describe('worker-queue-arm (UI-jaua §5.3)', () => {
  test('arms the named rows of the workspace the payload targets', async () => {
    const store = seedQueue(WS_TARGET, ['UI-1', 'UI-2']);

    const reply = await dispatch(
      handlers.handleWorkerQueueArm,
      'worker-queue-arm',
      {
        bead_ids: ['UI-1'],
        lane_id: 'cl_1',
        root_dir: WS_TARGET,
        expected_revision: store.snapshot(WS_TARGET).revision
      }
    );

    expect(reply.payload.applied).toBe(true);
    expect(
      store.snapshot(WS_TARGET).queue.map((entry) => entry.armed_by_lane)
    ).toEqual(['cl_1', undefined]);
  });

  test('leaves the connection workspace untouched when root_dir names another', async () => {
    const store = seedQueue(WS_CONN, ['UI-1']);
    seedQueue(WS_TARGET, ['UI-1']);

    await dispatch(handlers.handleWorkerQueueArm, 'worker-queue-arm', {
      bead_ids: ['UI-1'],
      lane_id: 'cl_1',
      root_dir: WS_TARGET,
      expected_revision: store.snapshot(WS_TARGET).revision
    });

    expect(store.snapshot(WS_CONN).queue[0].armed_by_lane).toBeUndefined();
  });

  test('reports a conflict without arming when the revision is stale', async () => {
    const store = seedQueue(WS_TARGET, ['UI-1']);

    const reply = await dispatch(
      handlers.handleWorkerQueueArm,
      'worker-queue-arm',
      {
        bead_ids: ['UI-1'],
        lane_id: 'cl_1',
        root_dir: WS_TARGET,
        expected_revision: 0
      }
    );

    expect(reply.payload).toMatchObject({ applied: false, conflict: true });
    expect(store.snapshot(WS_TARGET).queue[0].armed_by_lane).toBeUndefined();
  });

  test('ignores a bead id this workspace does not hold', async () => {
    const store = seedQueue(WS_TARGET, ['UI-1']);

    const reply = await dispatch(
      handlers.handleWorkerQueueArm,
      'worker-queue-arm',
      {
        bead_ids: ['UI-1', 'OTHER-9'],
        lane_id: 'cl_1',
        root_dir: WS_TARGET,
        expected_revision: store.snapshot(WS_TARGET).revision
      }
    );

    expect(reply.payload.applied).toBe(true);
    expect(
      store.snapshot(WS_TARGET).queue.map((entry) => entry.bead_id)
    ).toEqual(['UI-1']);
  });

  test('accepts a lane id no lane store knows', async () => {
    const store = seedQueue(WS_TARGET, ['UI-1']);

    const reply = await dispatch(
      handlers.handleWorkerQueueArm,
      'worker-queue-arm',
      {
        bead_ids: ['UI-1'],
        lane_id: 'cl_never_stored',
        root_dir: WS_TARGET,
        expected_revision: store.snapshot(WS_TARGET).revision
      }
    );

    expect(reply.payload.applied).toBe(true);
    expect(store.snapshot(WS_TARGET).queue[0].armed_by_lane).toBe(
      'cl_never_stored'
    );
  });

  test('kicks the dispatch loop of the armed workspace', async () => {
    const store = seedQueue(WS_TARGET, ['UI-1']);

    await dispatch(handlers.handleWorkerQueueArm, 'worker-queue-arm', {
      bead_ids: ['UI-1'],
      lane_id: 'cl_1',
      root_dir: WS_TARGET,
      expected_revision: store.snapshot(WS_TARGET).revision
    });

    expect(state.tick_calls).toEqual([WS_TARGET]);
  });

  test('rejects a payload that names no lane', async () => {
    seedQueue(WS_TARGET, ['UI-1']);

    const reply = await dispatch(
      handlers.handleWorkerQueueArm,
      'worker-queue-arm',
      { bead_ids: ['UI-1'], root_dir: WS_TARGET, expected_revision: 1 }
    );

    expect(reply).toMatchObject({
      ok: false,
      error: { code: 'bad_request' }
    });
    expect(state.tick_calls).toEqual([]);
  });
});

describe('worker-queue-disarm (UI-jaua §5.3)', () => {
  test('clears the arm of the named rows', async () => {
    const store = seedQueue(WS_TARGET, ['UI-1', 'UI-2']);
    store.arm(WS_TARGET, {
      expected_revision: store.snapshot(WS_TARGET).revision,
      bead_ids: ['UI-1', 'UI-2'],
      lane_id: 'cl_1'
    });

    const reply = await dispatch(
      handlers.handleWorkerQueueDisarm,
      'worker-queue-disarm',
      {
        bead_ids: ['UI-1'],
        root_dir: WS_TARGET,
        expected_revision: store.snapshot(WS_TARGET).revision
      }
    );

    expect(reply.payload.applied).toBe(true);
    expect(
      store.snapshot(WS_TARGET).queue.map((entry) => entry.armed_by_lane)
    ).toEqual([undefined, 'cl_1']);
  });

  test('clears every row of this workspace armed to the named lane', async () => {
    const store = seedQueue(WS_TARGET, ['UI-1', 'UI-2']);
    store.arm(WS_TARGET, {
      expected_revision: store.snapshot(WS_TARGET).revision,
      bead_ids: ['UI-1', 'UI-2'],
      lane_id: 'cl_1'
    });

    await dispatch(handlers.handleWorkerQueueDisarm, 'worker-queue-disarm', {
      lane_id: 'cl_1',
      root_dir: WS_TARGET,
      expected_revision: store.snapshot(WS_TARGET).revision
    });

    expect(
      store.snapshot(WS_TARGET).queue.map((entry) => entry.armed_by_lane)
    ).toEqual([undefined, undefined]);
  });

  test('reports a conflict without disarming when the revision is stale', async () => {
    const store = seedQueue(WS_TARGET, ['UI-1']);
    store.arm(WS_TARGET, {
      expected_revision: store.snapshot(WS_TARGET).revision,
      bead_ids: ['UI-1'],
      lane_id: 'cl_1'
    });

    const reply = await dispatch(
      handlers.handleWorkerQueueDisarm,
      'worker-queue-disarm',
      { lane_id: 'cl_1', root_dir: WS_TARGET, expected_revision: 0 }
    );

    expect(reply.payload).toMatchObject({ applied: false, conflict: true });
    expect(store.snapshot(WS_TARGET).queue[0].armed_by_lane).toBe('cl_1');
  });

  test('ignores a bead id this workspace does not hold', async () => {
    const store = seedQueue(WS_TARGET, ['UI-1']);
    store.arm(WS_TARGET, {
      expected_revision: store.snapshot(WS_TARGET).revision,
      bead_ids: ['UI-1'],
      lane_id: 'cl_1'
    });

    const reply = await dispatch(
      handlers.handleWorkerQueueDisarm,
      'worker-queue-disarm',
      {
        bead_ids: ['OTHER-9'],
        root_dir: WS_TARGET,
        expected_revision: store.snapshot(WS_TARGET).revision
      }
    );

    expect(reply.payload.applied).toBe(true);
    expect(store.snapshot(WS_TARGET).queue[0].armed_by_lane).toBe('cl_1');
  });

  test('kicks no dispatch loop', async () => {
    const store = seedQueue(WS_TARGET, ['UI-1']);
    store.arm(WS_TARGET, {
      expected_revision: store.snapshot(WS_TARGET).revision,
      bead_ids: ['UI-1'],
      lane_id: 'cl_1'
    });

    await dispatch(handlers.handleWorkerQueueDisarm, 'worker-queue-disarm', {
      lane_id: 'cl_1',
      root_dir: WS_TARGET,
      expected_revision: store.snapshot(WS_TARGET).revision
    });

    expect(state.tick_calls).toEqual([]);
  });

  test('rejects a payload that names neither rows nor a lane', async () => {
    seedQueue(WS_TARGET, ['UI-1']);

    const reply = await dispatch(
      handlers.handleWorkerQueueDisarm,
      'worker-queue-disarm',
      { root_dir: WS_TARGET, expected_revision: 1 }
    );

    expect(reply).toMatchObject({
      ok: false,
      error: { code: 'bad_request' }
    });
  });
});
