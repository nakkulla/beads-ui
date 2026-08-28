/**
 * `worker-queue-hold-resume` / `worker-queue-hold-retry-now` /
 * `worker-parked-retry` (2026-08-28 worker-failure-tiers spec §4): the three
 * CAS-guarded clicks the queue's stop banner and the parked tile send.
 *
 * The scheduler side is mocked — this file owns the ws contract: the payload
 * guard, the reply shape, the readback the reply carries, and the fanout that
 * gives every other subscriber the same one.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const state = vi.hoisted(() => ({
  /** @type {Array<{ fn: string, workspace: string, input: any }>} */
  calls: [],
  /** @type {Record<string, { ok: boolean, reason?: string }>} */
  results: {},
  /** @type {null | (() => void)} */
  onCall: null
}));

vi.mock('../registry-watcher.js', async (importOriginal) => {
  const actual = /** @type {any} */ (await importOriginal());
  return {
    ...actual,
    getAvailableWorkspaces: () => [{ path: WS }]
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
  /**
   * @param {string} workspace
   * @param {any} input
   */
  resumeWorkerQueueHold: (workspace, input) => {
    state.calls.push({ fn: 'resume', workspace, input });
    state.onCall?.();
    return Promise.resolve(state.results.resume ?? { ok: true });
  },
  retryWorkerCleanup: () => Promise.resolve({ ok: true }),
  /**
   * @param {string} workspace
   * @param {any} input
   */
  retryWorkerParkedAttempt: (workspace, input) => {
    state.calls.push({ fn: 'parked', workspace, input });
    state.onCall?.();
    return Promise.resolve(state.results.parked ?? { ok: true });
  },
  /**
   * @param {string} workspace
   * @param {any} input
   */
  retryWorkerQueueHoldNow: (workspace, input) => {
    state.calls.push({ fn: 'retry_now', workspace, input });
    state.onCall?.();
    return Promise.resolve(state.results.retry_now ?? { ok: true });
  },
  reviseApproveWorkerBead: () => Promise.resolve({ ok: true }),
  reviseFixWorkerBead: () => Promise.resolve({ ok: true }),
  startWorkerRepoOperationDeployRun: () => Promise.resolve({ ok: true }),
  workerRepoId: () => null,
  stopWorkerReviewSessionProcess: () => Promise.resolve(true),
  tickWorkerQueue: () => Promise.resolve(),
  workerMergeEffectInFlight: () => false,
  workerMergeQueueState: () => ({ active: null, failures: {} }),
  workerSlots: () => null,
  workerWorktreeExists: () => false
}));

const { setConnWorkspace } = await import('./context.js');
const { getWorkerRuntime } = await import('../worker/runtime.js');
const handlers = await import('./worker-handlers.js');

const WS = '/tmp/example/queue-hold-ws';

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
  setConnWorkspace(sock, { root_dir: WS, db_path: '' });
  await run(sock, { id: 'r1', type, payload });
  await new Promise((resolve) => setTimeout(resolve, 0));
  return {
    sock,
    reply: JSON.parse(/** @type {string[]} */ (sock.sent).at(-1) || 'null')
  };
}

/**
 * A second connection subscribed to this workspace, so the fanout is
 * observable as the message it actually pushes.
 *
 * @returns {any}
 */
function subscriber() {
  const sock = fakeSocket();
  setConnWorkspace(sock, { root_dir: WS, db_path: '' });
  handlers.handleSubscribeWorkerQueue(sock, {
    id: 'sub',
    type: 'subscribe-worker-queue',
    payload: { id: 'client-1' }
  });
  sock.sent.length = 0;
  return sock;
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-queue-hold-'));
  process.env.XDG_STATE_HOME = tmp_state;
  state.calls = [];
  state.results = {};
  // The fanout only pushes a CHANGED snapshot, so the tests that observe it
  // make the mocked scheduler leg move the queue the way the real one does.
  state.onCall = null;
  handlers.__resetWorkerQueueForTest();
  getWorkerRuntime().queueStore.place(WS, {
    expected_revision: getWorkerRuntime().queueStore.snapshot(WS).revision,
    bead_id: 'UI-1'
  });
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

describe('worker-queue-hold-resume (UI-5ym8 §3.4)', () => {
  test('forwards the since CAS and replies with the queue readback', async () => {
    const { reply } = await dispatch(
      handlers.handleWorkerQueueHoldResume,
      'worker-queue-hold-resume',
      { since: 1700 }
    );

    expect(state.calls).toEqual([
      { fn: 'resume', workspace: WS, input: { since: 1700 } }
    ]);
    expect(reply.payload.ok).toBe(true);
    expect(reply.payload.queue.revision).toBeGreaterThan(0);
  });

  test('reports a CAS mismatch as a no-op reason', async () => {
    state.results.resume = { ok: false, reason: 'hold_changed' };

    const { reply } = await dispatch(
      handlers.handleWorkerQueueHoldResume,
      'worker-queue-hold-resume',
      { since: 1 }
    );

    expect(reply.payload).toMatchObject({
      ok: false,
      reason: 'hold_changed'
    });
  });

  test('a duplicate click is idempotent — the second one just misses', async () => {
    await dispatch(
      handlers.handleWorkerQueueHoldResume,
      'worker-queue-hold-resume',
      { since: 1700 }
    );
    state.results.resume = { ok: false, reason: 'hold_changed' };
    const { reply } = await dispatch(
      handlers.handleWorkerQueueHoldResume,
      'worker-queue-hold-resume',
      { since: 1700 }
    );

    expect(state.calls.map((call) => call.input.since)).toEqual([1700, 1700]);
    expect(reply.payload).toMatchObject({ ok: false, reason: 'hold_changed' });
  });

  test('refuses a payload with no since', async () => {
    const { reply } = await dispatch(
      handlers.handleWorkerQueueHoldResume,
      'worker-queue-hold-resume',
      {}
    );

    expect(reply.ok).toBe(false);
    expect(reply.error.code).toBe('bad_request');
    expect(state.calls).toEqual([]);
  });

  test('fans the readback out to every other subscriber', async () => {
    const watcher = subscriber();
    state.onCall = () => {
      const store = getWorkerRuntime().queueStore;
      store.place(WS, {
        expected_revision: store.snapshot(WS).revision,
        bead_id: 'UI-2'
      });
    };

    await dispatch(
      handlers.handleWorkerQueueHoldResume,
      'worker-queue-hold-resume',
      { since: 1700 }
    );

    const pushed = watcher.sent.map((/** @type {string} */ raw) =>
      JSON.parse(String(raw))
    );
    expect(
      pushed.some(
        (/** @type {any} */ msg) => msg.type === 'worker-queue-snapshot'
      )
    ).toBe(true);
  });
});

describe('worker-queue-hold-retry-now (UI-5ym8 §4)', () => {
  test('forwards the since CAS', async () => {
    const { reply } = await dispatch(
      handlers.handleWorkerQueueHoldRetryNow,
      'worker-queue-hold-retry-now',
      { since: 2400 }
    );

    expect(state.calls).toEqual([
      { fn: 'retry_now', workspace: WS, input: { since: 2400 } }
    ]);
    expect(reply.payload.ok).toBe(true);
  });

  test('reports a CAS mismatch without touching the queue', async () => {
    state.results.retry_now = { ok: false, reason: 'hold_changed' };
    const before = getWorkerRuntime().queueStore.snapshot(WS).revision;

    const { reply } = await dispatch(
      handlers.handleWorkerQueueHoldRetryNow,
      'worker-queue-hold-retry-now',
      { since: 1 }
    );

    expect(reply.payload).toMatchObject({ ok: false, reason: 'hold_changed' });
    expect(getWorkerRuntime().queueStore.snapshot(WS).revision).toBe(before);
  });

  test('refuses a non-numeric since', async () => {
    const { reply } = await dispatch(
      handlers.handleWorkerQueueHoldRetryNow,
      'worker-queue-hold-retry-now',
      { since: 'now' }
    );

    expect(reply.ok).toBe(false);
    expect(reply.error.code).toBe('bad_request');
    expect(state.calls).toEqual([]);
  });
});

describe('worker-parked-retry (UI-5ym8 §3.1)', () => {
  test('forwards the bead and attempt the tile named', async () => {
    const { reply } = await dispatch(
      handlers.handleWorkerParkedRetry,
      'worker-parked-retry',
      { bead_id: 'UI-1', attempt_id: 'att-1' }
    );

    expect(state.calls).toEqual([
      {
        fn: 'parked',
        workspace: WS,
        input: { bead_id: 'UI-1', attempt_id: 'att-1' }
      }
    ]);
    expect(reply.payload.ok).toBe(true);
  });

  test('reports not_latest as a no-op reason', async () => {
    state.results.parked = { ok: false, reason: 'not_latest' };

    const { reply } = await dispatch(
      handlers.handleWorkerParkedRetry,
      'worker-parked-retry',
      { bead_id: 'UI-1', attempt_id: 'att-1' }
    );

    expect(reply.payload).toMatchObject({ ok: false, reason: 'not_latest' });
  });

  test('refuses a payload missing the attempt id', async () => {
    const { reply } = await dispatch(
      handlers.handleWorkerParkedRetry,
      'worker-parked-retry',
      { bead_id: 'UI-1' }
    );

    expect(reply.ok).toBe(false);
    expect(reply.error.code).toBe('bad_request');
    expect(state.calls).toEqual([]);
  });

  test('fans the readback out after the reply', async () => {
    const watcher = subscriber();
    state.onCall = () => {
      const store = getWorkerRuntime().queueStore;
      store.place(WS, {
        expected_revision: store.snapshot(WS).revision,
        bead_id: 'UI-2'
      });
    };

    const { sock } = await dispatch(
      handlers.handleWorkerParkedRetry,
      'worker-parked-retry',
      { bead_id: 'UI-1', attempt_id: 'att-1' }
    );

    expect(JSON.parse(sock.sent[0]).payload.ok).toBe(true);
    expect(
      watcher.sent
        .map((/** @type {string} */ raw) => JSON.parse(String(raw)))
        .some((/** @type {any} */ msg) => msg.type === 'worker-queue-snapshot')
    ).toBe(true);
  });
});

describe('worker queue hold snapshot projection (UI-5ym8 §4)', () => {
  test('carries hold and lineages on the wire and withholds hold_history', () => {
    const store = getWorkerRuntime().queueStore;
    store.applyQueueHold(WS, {
      event: {
        kind: 'env_failure',
        bead_id: 'UI-1',
        attempt_id: 'att-1',
        cause: 'verify_cmd_spawn_error',
        at: 1000
      },
      now: 1000
    });

    const projected = handlers.decorateQueue(WS, store.snapshot(WS));

    expect(projected.hold).toMatchObject({
      kind: 'env',
      cause: 'verify_cmd_spawn_error',
      since: 1000
    });
    expect(projected.lineages).toHaveLength(1);
    expect(projected.hold_history).toBeUndefined();
  });
});

/**
 * §5's `user_action` producer. The handler holds no `deps` object, so it asks
 * the writer the workspace registered with the queue store — the same instance
 * `attach.js` builds — instead of opening the timeline file itself.
 *
 * The registration is process-wide and has no unregister, so the order here is
 * load-bearing: the unregistered case runs FIRST, and this block sits last in
 * the file so nothing after it inherits a fake writer.
 */
describe('worker-parked-retry timeline (record-timeline-retention §5)', () => {
  /**
   * @param {(input: any) => any} append
   */
  function useTimeline(append) {
    /** @type {any[]} */
    const events = [];
    getWorkerRuntime().queueStore.useTimeline(WS, {
      /** @param {any} input */
      append: (input) => {
        events.push(input);
        return append(input);
      },
      readTimeline: () => []
    });
    return events;
  }

  test('replies to the click when no timeline is registered', async () => {
    const { reply } = await dispatch(
      handlers.handleWorkerParkedRetry,
      'worker-parked-retry',
      { bead_id: 'UI-1', attempt_id: 'att-1' }
    );

    expect(reply.payload.ok).toBe(true);
  });

  test('records the click on the bead the tile named', async () => {
    const events = useTimeline(() => ({ ok: true }));

    await dispatch(handlers.handleWorkerParkedRetry, 'worker-parked-retry', {
      bead_id: 'UI-1',
      attempt_id: 'att-1'
    });

    const revision = getWorkerRuntime().queueStore.snapshot(WS).revision;
    expect(events).toEqual([
      {
        bead_id: 'UI-1',
        kind: 'user_action',
        seq: `parked_retry:${revision}`,
        summary: '[재시도] 클릭 · 파킹 해제'
      }
    ]);
  });

  test('replies to the click when the timeline append fails', async () => {
    useTimeline(() => ({ ok: false, reason: 'write_failed', detail: 'nope' }));

    const { reply } = await dispatch(
      handlers.handleWorkerParkedRetry,
      'worker-parked-retry',
      { bead_id: 'UI-1', attempt_id: 'att-1' }
    );

    expect(reply.payload.ok).toBe(true);
  });
});
