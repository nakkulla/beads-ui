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
const { TAKEOVER_SETTLE_MS } =
  await import('../worker/external-wait/takeover.js');
const {
  EXTERNAL_RESUME_PANE_MARKER,
  INQUIRY_PANE_MARKER,
  RESOLVE_PANE_MARKER,
  SESSION_LANE_PANE_MARKER
} = await import('../worker/tmux-launcher.js');
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
/** @type {any[]} */
let repo_launches;

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

/**
 * Record a failed deploy operation after a failed implementation attempt.
 *
 * @param {string} [operation_id]
 * @param {'repair'|'fatal'} [disposition]
 */
function recordDeployFailure(
  operation_id = 'op-deploy',
  disposition = 'repair'
) {
  const store = getWorkerRuntime().queueStore;
  store.appendAttempt(WS, {
    expected_revision: revision(),
    attempt: {
      attempt_id: 'a-deploy',
      bead_id: BEAD,
      status: 'failed',
      cause: 'quickfix_landing_failed'
    }
  });
  store.ensureRepoOperation(WS, {
    operation_id,
    attempt_id: `${operation_id}:1`,
    repo_id: WS,
    kind: 'deploy',
    subjects: [{ bead_id: BEAD, merged_sha: 'a'.repeat(40) }],
    effective_base_sha: 'b'.repeat(40),
    target_base: 'main',
    target_sha: 'a'.repeat(40),
    script_mode: '100755',
    script_blob_sha: 'c'.repeat(40)
  });
  store.startRepoOperation(WS, {
    operation_id,
    attempt_id: `${operation_id}:1`,
    process_identity: { pid: 123, pgid: 123, started_at: 1 },
    log_path: '/tmp/deploy.log'
  });
  store.settleRepoOperation(WS, {
    operation_id,
    attempt_id: `${operation_id}:1`,
    exit_code: 2,
    signal: null,
    failure: {
      code: 'script_failed',
      summary: 'deploy verification failed',
      fingerprint: 'deploy-failure',
      detail: '',
      interrupted: false
    }
  });
  store.recordRepoOperationRecovery(WS, {
    operation_id,
    recovery: {
      classification: 'verification_failure',
      disposition,
      reason: null,
      code_defect: false,
      prover: null,
      handoff: null
    }
  });
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-resolve-session-'));
  process.env.XDG_STATE_HOME = tmp_state;
  launches = [];
  repo_launches = [];
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
    },
    /** @param {any} input */
    resolveRepoOperation: async (input) => {
      repo_launches.push(input);
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

  test('opens the failure conversation for a failed deploy operation', async () => {
    recordDeployFailure();
    expect(
      getWorkerRuntime().queueStore.snapshot(WS).repo_operations['op-deploy']
    ).toMatchObject({
      state: 'failed',
      log_path: '/tmp/deploy.log',
      recovery: { disposition: 'repair', code_defect: false }
    });

    const reply = await click({ bead_id: BEAD, expected_revision: revision() });

    expect(launches).toEqual([
      expect.objectContaining({
        bead_id: BEAD,
        attempt: expect.objectContaining({
          attempt_id: 'a-deploy',
          status: 'failed'
        }),
        failure: {
          failure_class: '배포 실패',
          reason: 'script_failed',
          stage: 'repo_operations',
          detail: 'deploy verification failed',
          log_path: '/tmp/deploy.log'
        }
      })
    ]);
    expect(reply.payload).toMatchObject({
      launched: true,
      row: 'failure',
      failure_class: '배포 실패'
    });
  });

  test('refuses a superseded failed deploy operation', async () => {
    recordDeployFailure();
    getWorkerRuntime().queueStore.supersedeRepoOperation(WS, {
      operation_id: 'op-deploy',
      successor_id: 'op-successor'
    });

    const reply = await click({ bead_id: BEAD, expected_revision: revision() });

    expect(reply.payload).toMatchObject({
      launched: false,
      reason: 'no_terminal_failure'
    });
    expect(launches).toEqual([]);
  });

  test('refuses a dismissed failed deploy operation', async () => {
    recordDeployFailure();
    getWorkerRuntime().queueStore.dismissRepoOperation(WS, {
      operation_id: 'op-deploy'
    });

    const reply = await click({ bead_id: BEAD, expected_revision: revision() });

    expect(reply.payload).toMatchObject({
      launched: false,
      reason: 'no_terminal_failure'
    });
    expect(launches).toEqual([]);
  });

  test('skips an earlier failed deploy operation without a recovery row', async () => {
    recordDeployFailure('op-earlier', 'fatal');
    recordDeployFailure();

    const reply = await click({ bead_id: BEAD, expected_revision: revision() });

    expect(reply.payload).toMatchObject({
      launched: true,
      row: 'failure',
      failure_class: '배포 실패'
    });
    expect(launches).toHaveLength(1);
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

  test('opens a resolve session for an unresolved takeover', async () => {
    const requested_at = new Date(
      Date.now() - TAKEOVER_SETTLE_MS - 60_000
    ).toISOString();
    completing = {
      wait_id: 'w-0123456789ab',
      bead_id: BEAD,
      stage: 'hold',
      owner: { kind: 'worker', attempt_id: 'a-jw27' },
      jobs: [
        {
          adapter: 'slurm',
          ssh_host: 'wallace',
          job_id: '249043',
          state: 'PENDING',
          takeover: { state: 'unknown', requested_at, cpus: 16, mem_gb: 64 }
        }
      ]
    };

    const reply = await click({ bead_id: BEAD, expected_revision: revision() });

    expect(launches).toHaveLength(1);
    expect(launches[0].failure).toMatchObject({
      failure_class: '확인 필요',
      reason: 'takeover_unresolved'
    });
    expect(launches[0].failure.detail).toContain('249043');
    expect(launches[0].failure.detail).toContain('wallace');
    expect(launches[0].failure.detail).toContain(requested_at);
    expect(session_resumes).toEqual([]);
    expect(reply.payload).toMatchObject({ row: 'takeover', launched: true });
  });

  test('keeps a takeover marker inside the settle window off the takeover row', async () => {
    completing = {
      wait_id: 'w-0123456789ab',
      bead_id: BEAD,
      stage: 'hold',
      owner: { kind: 'worker', attempt_id: 'a-jw27' },
      jobs: [
        {
          adapter: 'slurm',
          ssh_host: 'wallace',
          job_id: '249043',
          takeover: {
            state: 'pending',
            requested_at: new Date().toISOString(),
            cpus: 16,
            mem_gb: 64
          }
        }
      ]
    };

    const reply = await click({ bead_id: BEAD, expected_revision: revision() });

    expect(launches).toEqual([]);
    expect(reply.payload.reason).toBe('no_terminal_failure');
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

describe('worker-resolve-in-session focuses a live conversation (UI-9w5l §3.5)', () => {
  /** @type {any} */
  let original_launcher;
  /** @type {any} */
  let original_inquiry;
  /** @type {any} */
  let original_external_wait;
  /** @type {any[]} */
  let focuses;
  /** @type {any} */
  let focus_outcome;
  /** @type {any[]} */
  let inquiry_launches;
  /** @type {any[]} */
  let session_resumes;

  beforeEach(() => {
    const runtime = getWorkerRuntime();
    original_launcher = runtime.interactiveLauncher;
    original_inquiry = runtime.directionInquiry;
    original_external_wait = runtime.externalWait;
    focuses = [];
    inquiry_launches = [];
    session_resumes = [];
    focus_outcome = null;
    runtime.interactiveLauncher = /** @type {any} */ ({
      ...original_launcher,
      readBridgeThreads: () => new Map(),
      /** @param {any} input */
      focusRunning: async (input) => {
        focuses.push(input);
        return { ok: true, outcome: focus_outcome };
      }
    });
    runtime.directionInquiry = /** @type {any} */ ({
      /** @param {any} input */
      launchForClick: async (input) => {
        inquiry_launches.push(input);
        return { launched: true, session: 'launched', mode: 'resume' };
      }
    });
    runtime.externalWait = /** @type {any} */ ({
      ...original_external_wait,
      /** @param {any[]} args */
      resume: async (...args) => {
        session_resumes.push(args);
        return { ok: true, session: 'launched' };
      }
    });
  });

  afterEach(() => {
    const runtime = getWorkerRuntime();
    runtime.interactiveLauncher = original_launcher;
    runtime.directionInquiry = original_inquiry;
    runtime.externalWait = original_external_wait;
  });

  /**
   * @param {'inquiry'|'resolve'|'external_resume'|'session_lane'} kind
   */
  function recordLiveConversation(kind) {
    getWorkerRuntime().queueStore.recordInteractiveSession(WS, {
      bead_id: BEAD,
      kind,
      provider: 'claude',
      pane_id: '%7',
      tmux_session: 'dev',
      tmux_window: `${kind}-${BEAD}`,
      launched_at: 10,
      state: 'live',
      turn_state: 'question'
    });
  }

  test.each([
    ['inquiry', INQUIRY_PANE_MARKER],
    ['resolve', RESOLVE_PANE_MARKER],
    ['external_resume', EXTERNAL_RESUME_PANE_MARKER],
    ['session_lane', SESSION_LANE_PANE_MARKER]
  ])(
    'focuses the live window of each conversation kind without launching (%s)',
    async (kind, marker) => {
      recordCleanupStop();
      recordLiveConversation(
        /** @type {'inquiry'|'resolve'|'external_resume'|'session_lane'} */ (
          kind
        )
      );
      focus_outcome = {
        session: 'already_running',
        placement: 'user',
        tmux_session: 'dev',
        tmux_window: `${kind}-${BEAD}`,
        pane_id: '%7'
      };
      const before = structuredClone(
        getWorkerRuntime().queueStore.snapshot(WS).interactive_sessions
      );
      const revision_before = revision();

      const reply = await click({
        bead_id: BEAD,
        expected_revision: revision_before
      });

      expect(focuses).toEqual([
        {
          marker,
          key: BEAD,
          tmux_session: 'dev',
          window_name: `${kind}-${BEAD}`,
          placement: 'user'
        }
      ]);
      expect(reply.payload).toMatchObject({
        launched: false,
        session: 'already_running',
        tmux_window: `${kind}-${BEAD}`
      });
      expect([launches, inquiry_launches, session_resumes]).toEqual([
        [],
        [],
        []
      ]);
      expect(
        getWorkerRuntime().queueStore.snapshot(WS).interactive_sessions
      ).toEqual(before);
      expect(revision()).toBe(revision_before);
    }
  );

  test('falls back to the row launcher when the live record has no window', async () => {
    recordCleanupStop();
    recordLiveConversation('resolve');
    focus_outcome = null;

    const reply = await click({ bead_id: BEAD, expected_revision: revision() });

    expect(focuses).toHaveLength(1);
    expect(launches).toHaveLength(1);
    expect(reply.payload.row).toBe('failure');
  });

  test.each(['inquiry', 'resolve', 'external_resume'])(
    'focuses the live window of a Bead with no failure row (%s)',
    async (kind) => {
      recordLiveConversation(
        /** @type {'inquiry'|'resolve'|'external_resume'} */ (kind)
      );
      focus_outcome = {
        session: 'already_running',
        placement: 'user',
        tmux_session: 'dev',
        tmux_window: `${kind}-${BEAD}`
      };
      const before = structuredClone(
        getWorkerRuntime().queueStore.snapshot(WS).interactive_sessions
      );
      const revision_before = revision();

      const reply = await click({
        bead_id: BEAD,
        expected_revision: revision_before
      });

      expect(focuses).toHaveLength(1);
      expect(reply.payload).toMatchObject({
        launched: false,
        session: 'already_running',
        row: 'conversation'
      });
      expect([launches, inquiry_launches, session_resumes]).toEqual([
        [],
        [],
        []
      ]);
      expect(
        getWorkerRuntime().queueStore.snapshot(WS).interactive_sessions
      ).toEqual(before);
      expect(revision()).toBe(revision_before);
    }
  );

  /**
   * Record a live conversation on the failed manual deploy row.
   */
  function recordLiveRepoOperationConversation() {
    getWorkerRuntime().queueStore.recordInteractiveSession(WS, {
      bead_id: 'repo-op:op-manual',
      kind: 'resolve',
      provider: 'claude',
      pane_id: '%5',
      tmux_session: 'bdui-inquiry',
      tmux_window: 'resolve-repo-op-op-manual',
      launched_at: 10,
      state: 'live',
      settled_at: null
    });
  }

  test('focuses the live repo-operation conversation without launching', async () => {
    recordManualDeployFailure();
    recordLiveRepoOperationConversation();
    focus_outcome = {
      session: 'already_running',
      placement: 'user',
      tmux_session: 'bdui-inquiry',
      tmux_window: 'resolve-repo-op-op-manual'
    };
    const before = structuredClone(
      getWorkerRuntime().queueStore.snapshot(WS).interactive_sessions
    );
    const revision_before = revision();

    const reply = await click({
      operation_id: 'op-manual',
      expected_revision: revision_before
    });

    expect(focuses).toEqual([
      {
        marker: RESOLVE_PANE_MARKER,
        key: 'repo-op:op-manual',
        tmux_session: 'bdui-inquiry',
        window_name: 'resolve-repo-op-op-manual',
        placement: 'user'
      }
    ]);
    expect(reply.payload).toMatchObject({
      operation_id: 'op-manual',
      launched: false,
      session: 'already_running',
      row: 'conversation',
      tmux_window: 'resolve-repo-op-op-manual'
    });
    expect(repo_launches).toEqual([]);
    expect(
      getWorkerRuntime().queueStore.snapshot(WS).interactive_sessions
    ).toEqual(before);
    expect(revision()).toBe(revision_before);
  });

  test('falls back to the repo-operation launcher when the live record has no window', async () => {
    recordManualDeployFailure();
    recordLiveRepoOperationConversation();
    focus_outcome = null;

    const reply = await click({
      operation_id: 'op-manual',
      expected_revision: revision()
    });

    expect(focuses).toHaveLength(1);
    expect(repo_launches).toHaveLength(1);
    expect(reply.payload.row).toBe('failure');
  });
});

/**
 * Put one failed MANUAL deploy on the workspace — the Bead-less row the
 * drawer's `[세션에서 이어가기]` stands on (UI-jbl1 §3.3).
 *
 * @param {string} [operation_id]
 */
function recordManualDeployFailure(operation_id = 'op-manual') {
  const store = getWorkerRuntime().queueStore;
  store.ensureRepoOperation(WS, {
    operation_id,
    attempt_id: `${operation_id}:1`,
    repo_id: WS,
    kind: 'deploy',
    subjects: [{ bead_id: 'manual', merged_sha: 'a'.repeat(40) }],
    effective_base_sha: 'b'.repeat(40),
    target_base: 'main',
    target_sha: 'a'.repeat(40),
    script_mode: '100755',
    script_blob_sha: 'c'.repeat(40),
    source: 'manual',
    manual_run_id: 1
  });
  store.settleRepoOperation(WS, {
    operation_id,
    attempt_id: `${operation_id}:1`,
    exit_code: 2,
    signal: null,
    failure: {
      code: 'script_failed',
      fingerprint: 'f1',
      detail: '',
      interrupted: false
    }
  });
}

describe('worker-resolve-in-session repo-operation row (UI-jbl1 §3.3)', () => {
  test('opens the manual deploy failure conversation by operation id', async () => {
    recordManualDeployFailure();

    const reply = await click({
      operation_id: 'op-manual',
      expected_revision: revision()
    });

    expect(launches).toEqual([]);
    expect(repo_launches).toEqual([
      expect.objectContaining({
        workspace: WS,
        repo: WS,
        operation_id: 'op-manual',
        failure: expect.objectContaining({
          failure_class: '수동 배포 실패',
          reason: 'script_failed',
          operation_id: 'op-manual'
        })
      })
    ]);
    expect(reply.payload).toMatchObject({
      operation_id: 'op-manual',
      launched: true,
      row: 'failure',
      failure_class: '수동 배포 실패'
    });
  });

  test('refuses an operation that is not a failed manual deploy', async () => {
    const reply = await click({
      operation_id: 'op-missing',
      expected_revision: revision()
    });

    expect(reply.payload).toMatchObject({
      launched: false,
      reason: 'no_terminal_failure'
    });
    expect(repo_launches).toEqual([]);
  });

  test('launches nothing on a stale revision click', async () => {
    recordManualDeployFailure();

    const reply = await click({
      operation_id: 'op-manual',
      expected_revision: 0
    });

    expect(reply.payload).toMatchObject({ conflict: true, launched: false });
    expect(repo_launches).toEqual([]);
  });

  test('projects the resolve material and the row conversation on the card', () => {
    recordManualDeployFailure();
    getWorkerRuntime().queueStore.recordInteractiveSession(WS, {
      bead_id: 'repo-op:op-manual',
      kind: 'resolve',
      provider: 'claude',
      pane_id: '%5',
      tmux_session: 'bdui-inquiry',
      tmux_window: 'resolve-repo-op-op-manual',
      launched_at: 10,
      state: 'live',
      settled_at: null
    });

    const decorated = /** @type {any} */ (
      handlers.decorateQueue(
        WS,
        /** @type {any} */ (getWorkerRuntime().queueStore.snapshot(WS))
      )
    );

    const card = decorated.repo_operations.find(
      (/** @type {any} */ entry) => entry.operation_id === 'op-manual'
    );
    expect(card.resolve).toMatchObject({
      terminal_failure: true,
      interactive_sessions: [
        expect.objectContaining({
          key: 'repo-op:op-manual:resolve',
          state: 'live',
          closing: false,
          tmux_window: 'resolve-repo-op-op-manual'
        })
      ]
    });
  });
});
