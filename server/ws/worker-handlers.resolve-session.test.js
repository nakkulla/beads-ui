/**
 * `worker-resolve-in-session` (UI-jw27 §4, UI-18a5 §3.2): the
 * `[세션에서 이어가기]` click.
 *
 * The launcher itself is mocked — `server/worker/resolve-session.test.js` owns
 * the tmux and fork behaviour. This file owns the ws contract: the payload
 * guard, the revision CAS ahead of every side effect, the refusal on a row with
 * no terminal failure, and the reply that carries the fallback reason rather
 * than folding it away.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const WS = '/tmp/example/resolve-session-ws';
const BEAD = 'UI-jw27';

vi.mock('../registry-watcher.js', async (importOriginal) => {
  const actual = /** @type {any} */ (await importOriginal());
  return {
    ...actual,
    getAvailableWorkspaces: () => [{ path: WS }]
  };
});

const { setConnWorkspace } = await import('./context.js');
const { getWorkerRuntime } = await import('../worker/runtime.js');
const handlers = await import('./worker-handlers.js');

/** @type {string} */
let tmp_state;
/** @type {any[]} */
let launches;
/** @type {any} */
let launch_result;
/** @type {any} */
let original_resolve_session;

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
 * @param {Record<string, unknown>} payload
 */
async function click(payload) {
  const sock = fakeSocket();
  setConnWorkspace(sock, { root_dir: WS, db_path: '' });
  await handlers.handleWorkerResolveInSession(sock, {
    id: 'r1',
    type: 'worker-resolve-in-session',
    payload
  });
  await new Promise((resolve) => setTimeout(resolve, 0));
  return JSON.parse(/** @type {string[]} */ (sock.sent).at(-1) || 'null');
}

/**
 * @returns {number}
 */
function revision() {
  return getWorkerRuntime().queueStore.snapshot(WS).revision;
}

/**
 * Put one stopped post-merge cleanup on the bead, which is the cheapest of the
 * three failure kinds to write and the one the timeline row is built from.
 */
function recordCleanupStop() {
  getWorkerRuntime().queueStore.recordCleanupFailure(WS, {
    bead_id: BEAD,
    step: 'branch_cleanup',
    reason: 'local_branch_delete_failed'
  });
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-resolve-session-'));
  process.env.XDG_STATE_HOME = tmp_state;
  launches = [];
  launch_result = {
    launched: true,
    session: 'launched',
    reason: null,
    mode: 'fork',
    fallback_reason: null,
    session_id: 'abc',
    command: "claude --resume 'abc' --fork-session",
    bridge_active: true,
    tmux_session: 'bdui-inquiry',
    tmux_window: `resolve-${BEAD}`
  };
  handlers.__resetWorkerQueueForTest();
  const runtime = getWorkerRuntime();
  original_resolve_session = runtime.resolveSession;
  runtime.resolveSession = {
    /** @param {any} input */
    resolve: async (input) => {
      launches.push(input);
      return launch_result;
    }
  };
  // A cleanup stop describes a `pr_wait` member (UI-a9ky), so the row sits
  // there rather than in the waiting lane.
  runtime.queueStore.appendAttempt(WS, {
    expected_revision: revision(),
    attempt: { attempt_id: 'a-jw27', bead_id: BEAD }
  });
  runtime.queueStore.moveToPrWait(WS, {
    bead_id: BEAD,
    attempt_id: 'a-jw27',
    patch: { status: 'done' }
  });
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  getWorkerRuntime().resolveSession = original_resolve_session;
  handlers.__resetWorkerQueueForTest();
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

describe('worker-resolve-in-session (UI-jw27 §4)', () => {
  test('refuses a payload with no bead_id', async () => {
    const reply = await click({ expected_revision: revision() });

    expect([reply.ok, reply.error?.code, launches]).toEqual([
      false,
      'bad_request',
      []
    ]);
  });

  test('launches nothing on a stale revision click', async () => {
    recordCleanupStop();

    const reply = await click({ bead_id: BEAD, expected_revision: 0 });

    expect(reply.payload).toMatchObject({ conflict: true, launched: false });
    expect(launches).toEqual([]);
  });

  test('launches nothing when the row carries no terminal failure', async () => {
    const reply = await click({
      bead_id: BEAD,
      expected_revision: revision()
    });

    expect(reply.payload).toMatchObject({
      launched: false,
      conflict: false,
      reason: 'no_terminal_failure'
    });
    expect(launches).toEqual([]);
  });

  test('hands the launcher the failure the row was refused for', async () => {
    recordCleanupStop();

    await click({ bead_id: BEAD, expected_revision: revision() });

    expect(launches).toEqual([
      {
        workspace: WS,
        repo: WS,
        bead_id: BEAD,
        attempt: expect.objectContaining({
          attempt_id: 'a-jw27',
          bead_id: BEAD
        }),
        failure: {
          failure_class: '정리 중단',
          reason: 'local_branch_delete_failed',
          stage: 'branch_cleanup',
          detail: null,
          log_path: null
        }
      }
    ]);
  });

  test('replies with the forked resume command', async () => {
    recordCleanupStop();

    const reply = await click({
      bead_id: BEAD,
      expected_revision: revision()
    });

    expect(reply.payload).toMatchObject({
      launched: true,
      mode: 'fork',
      command: "claude --resume 'abc' --fork-session",
      fallback_reason: null,
      failure_class: '정리 중단'
    });
  });

  test('returns the recorded fork source in the response', async () => {
    recordCleanupStop();
    launch_result.source = 'attempt';

    const reply = await click({ bead_id: BEAD, expected_revision: revision() });

    expect(reply.payload.source).toBe('attempt');
  });

  test('carries the fallback reason of a fresh session into the reply', async () => {
    recordCleanupStop();
    launch_result = {
      ...launch_result,
      mode: 'fresh',
      fallback_reason: 'not_local',
      session_id: null,
      command: 'claude'
    };

    const reply = await click({
      bead_id: BEAD,
      expected_revision: revision()
    });

    expect(reply.payload).toMatchObject({
      launched: true,
      mode: 'fresh',
      fallback_reason: 'not_local'
    });
  });

  test('reports a launch that did not happen', async () => {
    recordCleanupStop();
    launch_result = {
      ...launch_result,
      launched: false,
      session: 'not_launched',
      reason: 'tmux_unavailable'
    };

    const reply = await click({
      bead_id: BEAD,
      expected_revision: revision()
    });

    expect(reply.payload).toMatchObject({
      launched: false,
      conflict: false,
      reason: 'tmux_unavailable'
    });
  });

  test('replies with the queue readback the click was decided against', async () => {
    recordCleanupStop();

    const reply = await click({
      bead_id: BEAD,
      expected_revision: revision()
    });

    expect(reply.payload.queue.revision).toBe(revision());
  });
});

describe('worker-resolve-in-session picks the launcher by row (UI-18a5 §3.2)', () => {
  /** @type {any} */
  let original_inquiry;
  /** @type {any} */
  let original_external_wait;
  /** @type {any} */
  let original_external_store;
  /** @type {any[]} */
  let inquiry_launches;
  /** @type {any[]} */
  let session_resumes;
  /** @type {any} */
  let completing;

  beforeEach(() => {
    const runtime = getWorkerRuntime();
    original_inquiry = runtime.directionInquiry;
    original_external_wait = runtime.externalWait;
    original_external_store = runtime.externalWaitStore;
    inquiry_launches = [];
    session_resumes = [];
    completing = null;
    runtime.directionInquiry = /** @type {any} */ ({
      /** @param {any} input */
      launchForClick: async (input) => {
        inquiry_launches.push(input);
        return { launched: true, session: 'launched', mode: 'resume' };
      }
    });
    runtime.externalWaitStore = /** @type {any} */ ({
      ...original_external_store,
      findByBead: () => completing
    });
    runtime.externalWait = /** @type {any} */ ({
      ...original_external_wait,
      /**
       * @param {string} workspace
       * @param {string} wait_id
       * @param {string} mode
       */
      resume: async (workspace, wait_id, mode) => {
        session_resumes.push({ workspace, wait_id, mode });
        return {
          ok: true,
          mode: 'session',
          session: 'not_launched',
          reason: 'owner_alive',
          command: "claude --resume 'user-session'",
          owner_tmux: 'dev:3',
          placement: null,
          tmux_session: null,
          tmux_window: null,
          pane_id: null,
          bridge_active: false
        };
      }
    });
  });

  afterEach(() => {
    const runtime = getWorkerRuntime();
    runtime.directionInquiry = original_inquiry;
    runtime.externalWait = original_external_wait;
    runtime.externalWaitStore = original_external_store;
  });

  test('opens the same-session conversation for a recovery wait', async () => {
    getWorkerRuntime().queueStore.appendAttempt(WS, {
      expected_revision: revision(),
      attempt: {
        attempt_id: 'a-stop',
        bead_id: BEAD,
        status: 'waiting',
        cause_detail: { recovery: { reason: 'authority' } }
      }
    });

    const reply = await click({ bead_id: BEAD, expected_revision: revision() });

    expect(inquiry_launches).toHaveLength(1);
    expect(launches).toEqual([]);
    expect(reply.payload.row).toBe('stop');
  });

  test('opens the failure conversation for a stopped cleanup', async () => {
    recordCleanupStop();

    const reply = await click({ bead_id: BEAD, expected_revision: revision() });

    expect(launches).toHaveLength(1);
    expect(inquiry_launches).toEqual([]);
    expect(reply.payload.row).toBe('failure');
  });

  test('accepts a session-owned completing wait and resumes its session', async () => {
    completing = {
      wait_id: 'w-0123456789ab',
      bead_id: BEAD,
      stage: 'completing',
      owner: { kind: 'session' }
    };

    const reply = await click({ bead_id: BEAD, expected_revision: revision() });

    expect(session_resumes).toEqual([
      { workspace: WS, wait_id: 'w-0123456789ab', mode: 'session' }
    ]);
    expect(launches).toEqual([]);
    expect(reply.payload).toMatchObject({
      row: 'external',
      mode: 'session',
      reason: 'owner_alive',
      command: "claude --resume 'user-session'",
      owner_tmux: 'dev:3'
    });
  });

  test('refuses a click while a handoff reservation holds the Bead', async () => {
    recordCleanupStop();
    getWorkerRuntime().queueStore.recordInteractiveSession(WS, {
      bead_id: BEAD,
      kind: 'resolve',
      provider: 'claude',
      pane_id: '%4',
      tmux_session: 'dev',
      tmux_window: `resolve-${BEAD}`,
      launched_at: 10,
      state: 'exiting',
      conversation: {
        stop: '실패 정리 중단 · x',
        handoff: {
          line: '인계 · 다시',
          source: 'result_line',
          message_at: 1,
          reserved_at: 2
        }
      }
    });

    const reply = await click({ bead_id: BEAD, expected_revision: revision() });

    expect(reply.payload).toMatchObject({
      launched: false,
      reason: 'handoff_pending'
    });
    expect(launches).toEqual([]);
  });
});
