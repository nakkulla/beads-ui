/**
 * `worker-resolve-in-session` (UI-jw27 §4): the `[세션에서 해결]` click.
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
    step: 'child_sweep',
    reason: 'child_close_failed'
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
  runtime.queueStore.place(WS, {
    expected_revision: revision(),
    bead_id: BEAD
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
        failure: {
          failure_class: '정리 중단',
          reason: 'child_close_failed',
          stage: 'child_sweep',
          detail: null
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
