import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { ensureDelegationMonitorDir } from '../worker/delegation-monitor.js';
import {
  attemptRecordPath,
  delegationMonitorDir
} from '../worker/state-paths.js';

const WS = '/tmp/example-workspace/project-a';
const WS_OTHER = '/tmp/example-workspace/project-b';

const state = vi.hoisted(() => ({
  /** @type {Record<string, any>} */
  attempts: {},
  /** @type {Record<string, Record<string, any>>} */
  attempts_by_workspace: {},
  /** @type {string[]} */
  snapshot_calls: [],
  /** @type {any[]} */
  listeners: [],
  read: vi.fn(() => []),
  readAttempt: vi.fn(/** @returns {any} */ () => null),
  resolveLog: vi.fn(
    /** @returns {any} */ () => ({
      status: 'ok',
      path: '/tmp/example.jsonl',
      gzipped: false
    })
  ),
  readDelegation: vi.fn(
    /** @returns {{ lines: unknown[], last_event_at: number|null, offset: number }} */ () => ({
      lines: [],
      last_event_at: null,
      offset: 0
    })
  )
}));

vi.mock('../registry-watcher.js', async (importOriginal) => {
  const actual = /** @type {any} */ (await importOriginal());
  return {
    ...actual,
    getAvailableWorkspaces: () => [
      { path: '/tmp/example-workspace/project-a' },
      { path: '/tmp/example-workspace/project-b' }
    ]
  };
});

vi.mock('../worker/runtime.js', () => ({
  getWorkerRuntime: () => ({
    queueStore: {
      /** @param {string} workspace_key */
      snapshot: (workspace_key) => {
        state.snapshot_calls.push(String(workspace_key));
        return {
          attempts:
            state.attempts_by_workspace[String(workspace_key)] || state.attempts
        };
      },
      readAttempt: state.readAttempt,
      readAttemptsForBead: () => []
    },
    usageStore: { get: () => null },
    sessionLog: {
      read: state.read,
      readDelegation: state.readDelegation,
      resolveLog: state.resolveLog,
      lastEventAt: () => null,
      lastEventAtOf: () => null,
      /**
       * @param {(append: any) => void} fn
       * @param {string} [launch_id]
       */
      subscribe(fn, launch_id) {
        const entry = { fn, launch_id: launch_id || null };
        state.listeners.push(entry);
        return () => {
          const index = state.listeners.indexOf(entry);
          if (index >= 0) {
            state.listeners.splice(index, 1);
          }
        };
      }
    }
  })
}));

const { setConnWorkspace } = await import('./context.js');
const { detachSessionLog, handleGetAttemptPrompt, handleSubscribeSessionLog } =
  await import('./worker-handlers.js');

/**
 * @returns {any}
 */
function fakeSocket() {
  const socket = {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    /** @param {string} message */
    send(message) {
      this.sent.push(String(message));
    }
  };
  setConnWorkspace(/** @type {any} */ (socket), {
    root_dir: WS,
    db_path: ''
  });
  return socket;
}

/**
 * @param {string} [status]
 * @returns {any}
 */
function attempt(status = 'done') {
  return {
    attempt_id: 'att-1',
    bead_id: 'UI-1',
    status,
    delegation_sessions: [
      {
        launch_id: 'launch-1',
        provider: 'codex',
        role: 'implementation',
        model: 'gpt-5.6-sol',
        session_id: 'thread-1',
        turn_id: 'turn-1',
        status: 'done',
        started_at: 1,
        completed_at: '2026-08-18T04:27:02.000Z',
        last_event_at: 2
      }
    ]
  };
}

afterEach(() => {
  state.attempts = {};
  state.attempts_by_workspace = {};
  state.snapshot_calls.length = 0;
  state.listeners.length = 0;
  state.read.mockReset();
  state.read.mockReturnValue([]);
  state.readDelegation.mockReset();
  state.readDelegation.mockReturnValue({
    lines: [],
    last_event_at: null,
    offset: 0
  });
  state.readAttempt.mockReset();
  state.readAttempt.mockReturnValue(null);
  state.resolveLog.mockReset();
  state.resolveLog.mockReturnValue({
    status: 'ok',
    path: '/tmp/example.jsonl',
    gzipped: false
  });
});

describe('worker session-log delegation subscription', () => {
  test('accepts an authorized launch id and echoes it in the snapshot', () => {
    state.attempts = { 'att-1': attempt() };
    state.readDelegation.mockReturnValue({
      lines: [{ event: { type: 'session.started' } }],
      last_event_at: 2,
      offset: 64
    });
    const socket = fakeSocket();

    handleSubscribeSessionLog(socket, {
      id: 'request-1',
      type: 'subscribe-session-log',
      payload: {
        id: 'subscription-1',
        attempt_id: 'att-1',
        launch_id: 'launch-1'
      }
    });

    const snapshot = JSON.parse(socket.sent[1]).payload;
    expect(snapshot).toEqual({
      type: 'session-log-snapshot',
      id: 'subscription-1',
      attempt_id: 'att-1',
      launch_id: 'launch-1',
      lines: [{ event: { type: 'session.started' } }],
      last_event_at: 2
    });
    expect(state.readDelegation).toHaveBeenCalledWith(
      WS,
      'att-1',
      'launch-1',
      expect.objectContaining({ launch_id: 'launch-1' }),
      { bead_id: 'UI-1', log_path: null }
    );
    detachSessionLog(socket);
  });

  test('returns an empty snapshot for an unknown launch without reading it', () => {
    state.attempts = { 'att-1': attempt() };
    const socket = fakeSocket();

    handleSubscribeSessionLog(socket, {
      id: 'request-1',
      type: 'subscribe-session-log',
      payload: {
        id: 'subscription-1',
        attempt_id: 'att-1',
        launch_id: 'unknown-launch'
      }
    });

    expect(JSON.parse(socket.sent[1]).payload).toMatchObject({
      launch_id: 'unknown-launch',
      lines: [],
      last_event_at: null
    });
    expect(state.readDelegation).not.toHaveBeenCalled();
    expect(state.listeners).toEqual([]);
  });

  test('authorizes a running launch from the live delegation projection', () => {
    const tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-ws-slog-'));
    process.env.XDG_STATE_HOME = tmp_state;
    try {
      state.attempts = {
        'att-1': {
          attempt_id: 'att-1',
          bead_id: 'UI-1',
          status: 'running',
          delegation_sessions: []
        }
      };
      ensureDelegationMonitorDir(WS, 'att-1');
      fs.writeFileSync(
        path.join(delegationMonitorDir(WS, 'att-1'), 'launch-live.jsonl'),
        `${JSON.stringify({
          schema: 'codex-delegation-monitor-v1',
          attempt_id: 'att-1',
          launch_id: 'launch-live',
          provider: 'codex',
          role: 'implementation',
          model: 'gpt-5.6-sol',
          thread_id: 'thread-live',
          turn_id: null,
          recorded_at: '2026-08-18T04:27:00.000Z',
          event: { type: 'session.started' }
        })}\n`,
        { mode: 0o600 }
      );
      const socket = fakeSocket();

      handleSubscribeSessionLog(socket, {
        id: 'request-1',
        type: 'subscribe-session-log',
        payload: {
          id: 'subscription-1',
          attempt_id: 'att-1',
          launch_id: 'launch-live'
        }
      });

      expect(state.readDelegation).toHaveBeenCalledWith(
        WS,
        'att-1',
        'launch-live',
        expect.objectContaining({
          launch_id: 'launch-live',
          session_id: 'thread-live'
        }),
        { bead_id: 'UI-1', log_path: null }
      );
      detachSessionLog(socket);
    } finally {
      delete process.env.XDG_STATE_HOME;
      fs.rmSync(tmp_state, { recursive: true, force: true });
    }
  });

  test('returns an empty snapshot for an attempt outside the workspace', () => {
    state.attempts = {};
    const socket = fakeSocket();

    handleSubscribeSessionLog(socket, {
      id: 'request-1',
      type: 'subscribe-session-log',
      payload: {
        id: 'subscription-1',
        attempt_id: 'elsewhere',
        launch_id: 'launch-1'
      }
    });

    expect(JSON.parse(socket.sent[1]).payload).toMatchObject({
      attempt_id: 'elsewhere',
      launch_id: 'launch-1',
      lines: [],
      last_event_at: null
    });
    expect(state.readDelegation).not.toHaveBeenCalled();
  });

  test('keeps main and delegation appends in their own subscriptions', () => {
    state.attempts = { 'att-1': attempt('running') };
    const main_socket = fakeSocket();
    const delegation_socket = fakeSocket();
    handleSubscribeSessionLog(main_socket, {
      id: 'request-main',
      type: 'subscribe-session-log',
      payload: { id: 'main', attempt_id: 'att-1' }
    });
    handleSubscribeSessionLog(delegation_socket, {
      id: 'request-delegation',
      type: 'subscribe-session-log',
      payload: {
        id: 'delegation',
        attempt_id: 'att-1',
        launch_id: 'launch-1'
      }
    });
    main_socket.sent.length = 0;
    delegation_socket.sent.length = 0;

    for (const listener of state.listeners) {
      listener.fn({
        workspace: WS,
        attempt_id: 'att-1',
        event: { type: 'main' }
      });
      listener.fn({
        workspace: WS,
        attempt_id: 'att-1',
        event: { type: 'delegation' },
        launch_id: 'launch-1'
      });
    }

    expect(main_socket.sent).toHaveLength(1);
    expect(JSON.parse(main_socket.sent[0]).payload.event).toEqual({
      type: 'main'
    });
    expect(JSON.parse(main_socket.sent[0]).payload).not.toHaveProperty(
      'launch_id'
    );
    expect(delegation_socket.sent).toHaveLength(1);
    expect(JSON.parse(delegation_socket.sent[0]).payload.event).toEqual({
      type: 'delegation'
    });
    expect(JSON.parse(delegation_socket.sent[0]).payload.launch_id).toBe(
      'launch-1'
    );
    detachSessionLog(main_socket);
    detachSessionLog(delegation_socket);
  });

  test('drops a delegation append its snapshot already carried', () => {
    state.attempts = { 'att-1': attempt() };
    state.readDelegation.mockReturnValue({
      lines: [{ event: { type: 'session.started' } }],
      last_event_at: 2,
      offset: 128
    });
    const socket = fakeSocket();
    handleSubscribeSessionLog(socket, {
      id: 'request-1',
      type: 'subscribe-session-log',
      payload: {
        id: 'subscription-1',
        attempt_id: 'att-1',
        launch_id: 'launch-1'
      }
    });
    socket.sent.length = 0;

    for (const listener of state.listeners) {
      listener.fn({
        workspace: WS,
        attempt_id: 'att-1',
        launch_id: 'launch-1',
        offset: 64,
        event: { type: 'already-in-snapshot' }
      });
      listener.fn({
        workspace: WS,
        attempt_id: 'att-1',
        launch_id: 'launch-1',
        offset: 128,
        event: { type: 'past-the-boundary' }
      });
    }

    expect(socket.sent).toHaveLength(1);
    expect(JSON.parse(socket.sent[0]).payload.event).toEqual({
      type: 'past-the-boundary'
    });
    detachSessionLog(socket);
  });
});

describe('session-log + prompt ops target a root_dir (UI-eey2 §9.5)', () => {
  test('reads the named workspace attempt for subscribe-session-log', () => {
    state.attempts_by_workspace = { [WS_OTHER]: { 'att-9': attempt() } };
    state.read.mockReturnValue(
      /** @type {any} */ ([{ type: 'turn.completed' }])
    );
    const socket = fakeSocket();

    handleSubscribeSessionLog(socket, {
      id: 'request-1',
      type: 'subscribe-session-log',
      payload: {
        id: 'subscription-1',
        attempt_id: 'att-9',
        root_dir: WS_OTHER
      }
    });

    expect(state.read).toHaveBeenCalledWith(WS_OTHER, 'att-9', {
      bead_id: 'UI-1',
      log_path: null
    });
    detachSessionLog(socket);
  });

  test('keeps the connection workspace when no root_dir is named', () => {
    const socket = fakeSocket();

    handleSubscribeSessionLog(socket, {
      id: 'request-1',
      type: 'subscribe-session-log',
      payload: { id: 'subscription-1', attempt_id: 'att-1' }
    });

    expect(state.read).toHaveBeenCalledWith(WS, 'att-1', {
      bead_id: null,
      log_path: null
    });
    detachSessionLog(socket);
  });

  test('refuses an unregistered root_dir for subscribe-session-log', () => {
    const socket = fakeSocket();

    handleSubscribeSessionLog(socket, {
      id: 'request-1',
      type: 'subscribe-session-log',
      payload: {
        id: 'subscription-1',
        attempt_id: 'att-1',
        root_dir: '/tmp/not-registered'
      }
    });

    expect(JSON.parse(socket.sent[0]).error.code).toBe('bad_request');
    expect(state.read).not.toHaveBeenCalled();
    expect(state.listeners).toEqual([]);
  });

  test('reads the named workspace attempt for get-attempt-prompt', () => {
    state.attempts_by_workspace = {
      [WS_OTHER]: {
        'att-9': { attempt_id: 'att-9', system_prompt: 'S', task_prompt: 'T' }
      }
    };
    const socket = fakeSocket();

    handleGetAttemptPrompt(socket, {
      id: 'request-1',
      type: 'get-attempt-prompt',
      payload: { attempt_id: 'att-9', root_dir: WS_OTHER }
    });

    expect(state.snapshot_calls).toEqual([WS_OTHER]);
    expect(JSON.parse(socket.sent[0]).payload).toMatchObject({
      attempt_id: 'att-9',
      system_prompt: 'S',
      task_prompt: 'T'
    });
  });

  test('refuses an unregistered root_dir for get-attempt-prompt', () => {
    const socket = fakeSocket();

    handleGetAttemptPrompt(socket, {
      id: 'request-1',
      type: 'get-attempt-prompt',
      payload: { attempt_id: 'att-1', root_dir: '/tmp/not-registered' }
    });

    expect(JSON.parse(socket.sent[0]).error.code).toBe('bad_request');
    expect(state.snapshot_calls).toEqual([]);
  });
});

describe('session-log viewer read resolution (record-timeline-retention §4)', () => {
  test('surfaces the retention notice for a settled attempt whose log expired', () => {
    state.attempts = { 'att-1': attempt('done') };
    state.resolveLog.mockReturnValue({
      status: 'expired',
      path: null,
      gzipped: false
    });
    const socket = fakeSocket();

    handleSubscribeSessionLog(socket, {
      id: 'request-1',
      type: 'subscribe-session-log',
      payload: { id: 'subscription-1', attempt_id: 'att-1' }
    });

    expect(JSON.parse(socket.sent[1]).payload).toMatchObject({
      expired: true,
      notice: '만료됨(180일 보존 정책)'
    });
    detachSessionLog(socket);
  });

  test('leaves a running attempt unexpired while its log has not appeared', () => {
    state.attempts = { 'att-1': attempt('running') };
    state.resolveLog.mockReturnValue({
      status: 'expired',
      path: null,
      gzipped: false
    });
    const socket = fakeSocket();

    handleSubscribeSessionLog(socket, {
      id: 'request-1',
      type: 'subscribe-session-log',
      payload: { id: 'subscription-1', attempt_id: 'att-1' }
    });

    expect(JSON.parse(socket.sent[1]).payload.expired).toBe(undefined);
    detachSessionLog(socket);
  });

  test('reads a transferred attempt through the log_path its record stores', () => {
    const tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-ws-xfer-'));
    process.env.XDG_STATE_HOME = tmp_state;
    try {
      const record = attemptRecordPath(WS, 'UI-9', 'att-9');
      fs.mkdirSync(path.dirname(record), { recursive: true });
      fs.writeFileSync(record, JSON.stringify({ attempt_id: 'att-9' }));
      state.attempts = {};
      state.readAttempt.mockReturnValue({
        attempt_id: 'att-9',
        bead_id: 'UI-9',
        status: 'done',
        log_path: '/tmp/stored/att-9.jsonl'
      });
      const socket = fakeSocket();

      handleSubscribeSessionLog(socket, {
        id: 'request-1',
        type: 'subscribe-session-log',
        payload: { id: 'subscription-1', attempt_id: 'att-9' }
      });

      expect(state.read).toHaveBeenCalledWith(WS, 'att-9', {
        bead_id: 'UI-9',
        log_path: '/tmp/stored/att-9.jsonl'
      });
      detachSessionLog(socket);
    } finally {
      delete process.env.XDG_STATE_HOME;
      fs.rmSync(tmp_state, { recursive: true, force: true });
    }
  });
});
