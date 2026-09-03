/**
 * `worker-queue-hold-resume` / `worker-queue-hold-retry-now` and the parked
 * tile's `worker-resolve-in-session` exit.
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
  readBeadTimeline: () => [],
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
/** @type {any} */
let original_direction_inquiry;
/** @type {any[]} */
let inquiry_calls;

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
  inquiry_calls = [];
  original_direction_inquiry = getWorkerRuntime().directionInquiry;
  getWorkerRuntime().directionInquiry = {
    ...original_direction_inquiry,
    /** @param {any} input */
    launchForClick: async (input) => {
      inquiry_calls.push(input);
      return {
        launched: false,
        session: 'already_running',
        reason: null,
        mode: 'fork',
        fallback_reason: null,
        session_id: 'sid',
        command: "claude --resume 'sid' --fork-session",
        bridge_active: true,
        tmux_session: 'bdui-inquiry',
        tmux_window: 'UI-1'
      };
    }
  };
  getWorkerRuntime().queueStore.place(WS, {
    expected_revision: getWorkerRuntime().queueStore.snapshot(WS).revision,
    bead_id: 'UI-1'
  });
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  getWorkerRuntime().directionInquiry = original_direction_inquiry;
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

describe('parked tile resolution (UI-gjp2 §3.3)', () => {
  test('routes the parked tile click to worker-resolve-in-session', async () => {
    const store = getWorkerRuntime().queueStore;
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'att-1',
        bead_id: 'UI-1',
        status: 'parked',
        repo: '/repo',
        cause_detail: {
          awaiting_user: 'impl_review_conflict:design',
          summary: '설계 충돌'
        }
      }
    });

    const { reply } = await dispatch(
      handlers.handleWorkerResolveInSession,
      'worker-resolve-in-session',
      {
        bead_id: 'UI-1',
        expected_revision: store.snapshot(WS).revision
      }
    );

    expect(inquiry_calls).toEqual([
      {
        workspace: WS,
        bead_id: 'UI-1',
        attempt_id: 'att-1',
        repo: '/repo',
        awaiting_user: 'impl_review_conflict:design'
      }
    ]);
    expect(reply.payload).toMatchObject({
      session: 'already_running',
      tmux_window: 'UI-1'
    });
  });
});
