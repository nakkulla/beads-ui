import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { ensureDelegationMonitorDir } from '../worker/delegation-monitor.js';
import { delegationMonitorDir } from '../worker/state-paths.js';

const WS = '/tmp/example-workspace/project-a';

const state = vi.hoisted(() => ({
  /** @type {Record<string, any>} */
  attempts: {},
  /** @type {any[]} */
  listeners: [],
  read: vi.fn(() => []),
  readDelegation: vi.fn(
    /** @returns {{ lines: unknown[], last_event_at: number|null }} */ () => ({
      lines: [],
      last_event_at: null
    })
  )
}));

vi.mock('../worker/runtime.js', () => ({
  getWorkerRuntime: () => ({
    queueStore: {
      snapshot: () => ({ attempts: state.attempts })
    },
    usageStore: { get: () => null },
    sessionLog: {
      read: state.read,
      readDelegation: state.readDelegation,
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
const { detachSessionLog, handleSubscribeSessionLog } =
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
  state.listeners.length = 0;
  state.read.mockReset();
  state.read.mockReturnValue([]);
  state.readDelegation.mockReset();
  state.readDelegation.mockReturnValue({ lines: [], last_event_at: null });
});

describe('worker session-log delegation subscription', () => {
  test('accepts an authorized launch id and echoes it in the snapshot', () => {
    state.attempts = { 'att-1': attempt() };
    state.readDelegation.mockReturnValue({
      lines: [{ event: { type: 'session.started' } }],
      last_event_at: 2
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
    expect(state.readDelegation).toHaveBeenCalledWith(WS, 'att-1', 'launch-1');
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
        'launch-live'
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
});
