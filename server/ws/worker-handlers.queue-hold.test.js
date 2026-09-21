/**
 * The parked tile's `worker-resolve-in-session` exit and retired queue operations.
 *
 * The scheduler side is mocked — this file owns the ws contract: the payload
 * guard, the reply shape, the readback the reply carries, and the fanout that
 * gives every other subscriber the same one.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createKeyedFrameNormalizer } from './keyed-frames-fixture.js';

vi.mock('../registry-watcher.js', async (importOriginal) => {
  const actual = /** @type {any} */ (await importOriginal());
  return {
    ...actual,
    getAvailableWorkspaces: () => [{ path: WS }]
  };
});

vi.mock('../worker/attach.js', () => ({
  // Keep unrelated wait rows out of the parked-tile contract.
  workerWaitState: () => ({ wait_reasons: [], external_waits: [] }),
  checkWorkerQueueAdmission: () => Promise.resolve({ ok: true }),
  discardWorkerBead: () => Promise.resolve({ ok: true }),
  dismissWorkerRepoOperation: () => Promise.resolve({ ok: true }),
  enqueueWorkerManualMerge: () =>
    Promise.resolve({ ok: false, conflict: false, reason: 'no_attachment' }),
  enrollWorkerMergeCandidates: () => ({ applied: false, conflict: false }),
  kickWorkerMergeQueue: () => Promise.resolve(),
  observeWorkerPrs: () => Promise.resolve(),
  pauseWorkerAttempt: () => Promise.resolve({ ok: true }),
  readBeadTimeline: () => [],
  reconcileWorkerRepoOperations: () => Promise.resolve(),
  refreshWorkerExternalPrs: () => Promise.resolve(false),
  resumeWorkerAttempt: () => Promise.resolve({ ok: true }),
  retryWorkerCleanup: () => Promise.resolve({ ok: true }),
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
  const normalize = createKeyedFrameNormalizer();
  /** @type {any} */
  const sock = {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    /** @param {string} msg */
    send(msg) {
      sock.sent.push(normalize(String(msg)));
    }
  };
  return sock;
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

test('removes the retired queue operation handlers and routes', () => {
  const connection = fs.readFileSync(
    new URL('./connection.js', import.meta.url),
    'utf8'
  );

  expect(handlers).not.toHaveProperty('handleWorkerQueueHoldResume');
  expect(handlers).not.toHaveProperty('handleWorkerQueueHoldRetryNow');
  expect(connection).not.toMatch(/worker-queue-hold-(?:resume|retry-now)/);
});

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-queue-hold-'));
  process.env.XDG_STATE_HOME = tmp_state;
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

describe('parked tile resolution (UI-gjp2 §3.3)', () => {
  test('routes a stalled recovery click to its inquiry pane', async () => {
    const store = getWorkerRuntime().queueStore;
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'recovery',
        bead_id: 'UI-1',
        status: 'waiting',
        repo: '/repo',
        cause_detail: {
          recovery: {
            reason: 'authority',
            classification: 'session_recovery_wait'
          }
        }
      }
    });

    const { reply } = await dispatch(
      handlers.handleWorkerResolveInSession,
      'worker-resolve-in-session',
      { bead_id: 'UI-1', expected_revision: store.snapshot(WS).revision }
    );

    expect(inquiry_calls).toEqual([
      expect.objectContaining({
        awaiting_user: null,
        recovery: {
          reason: 'authority',
          classification: 'session_recovery_wait'
        }
      })
    ]);
    expect(reply.payload.session).toBe('already_running');
  });

  test('refuses Worker resume requests for recovery attempts', async () => {
    const store = getWorkerRuntime().queueStore;
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'recovery',
        bead_id: 'UI-1',
        status: 'waiting',
        repo: '/repo',
        cause_detail: { recovery: { reason: 'authority' } }
      }
    });

    const { reply } = await dispatch(
      handlers.handleWorkerAttemptResume,
      'worker-attempt-resume',
      { attempt_id: 'recovery', expected_revision: store.snapshot(WS).revision }
    );

    expect(reply.payload).toMatchObject({
      resumed: false,
      reason: 'recovery_requires_inquiry'
    });
    expect(inquiry_calls).toEqual([]);
  });
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
