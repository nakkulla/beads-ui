import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { EXTERNAL_RESUME_PANE_MARKER } from '../tmux-launcher.js';
import {
  SESSION_RESUME_PROMPT_LEAD,
  createExternalWaitSessionResume
} from './session-resume.js';

const WS = '/repo';
const WAIT = 'w-0123456789ab';
const AT = '2026-09-23T00:00:00.000Z';
const SESSION = 'user-session';
const PROC_START = 'Tue Sep 22 20:45:09 2026';

/** @type {string} */
let root;

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'session-resume-'));
  const transcript_dir = path.join(root, '.claude', 'projects', '-repo');
  fs.mkdirSync(transcript_dir, { recursive: true });
  fs.writeFileSync(path.join(transcript_dir, `${SESSION}.jsonl`), '{}\n');
  fs.mkdirSync(path.join(root, '.claude', 'sessions'), { recursive: true });
  fs.mkdirSync(path.join(root, 'wt'), { recursive: true });
});
afterEach(() => {
  fs.rmSync(root, { recursive: true, force: true });
});

/**
 * @param {string} name
 * @param {unknown} entry
 */
function writeRegistry(name, entry) {
  fs.writeFileSync(
    path.join(root, '.claude', 'sessions', name),
    typeof entry === 'string' ? entry : JSON.stringify(entry)
  );
}

/**
 * @param {{ record?: Record<string, any>, launch?: any, panes?: any, run?: any, unset?: any, sessionsDir?: string }} [options]
 */
function fixture(options = {}) {
  /** @type {any} */
  let record = {
    wait_id: WAIT,
    root_dir: WS,
    bead_id: 'B1',
    owner: {
      kind: 'session',
      session_ref: `claude:${SESSION}@host`,
      session_pid: 3333,
      session_start: AT
    },
    worktree: path.join(root, 'wt'),
    execution_sha: 'a'.repeat(40),
    stage: 'completing',
    jobs: [
      {
        adapter: 'process',
        pid: 1234,
        workdir: '/wt',
        log_path: '/wt/job.log',
        submitted_at: AT,
        state: 'COMPLETED',
        terminal: {
          exit_code: 0,
          evidence: 'rc=0',
          expected_results: [],
          recovery_needed: false,
          completed_at: AT
        }
      }
    ],
    completion: {
      digest: 'c'.repeat(64),
      completed_at: AT,
      recovery_needed: false
    },
    resume: null,
    ...options.record
  };
  /** @type {any[]} */
  const resume_writes = [];
  const externalWait = {
    get: () => structuredClone(record),
    update: (
      /** @type {string} */ _ws,
      /** @type {string} */ _id,
      /** @type {(record: any) => void} */ mutate
    ) => {
      const next = structuredClone(record);
      mutate(next);
      record = next;
      resume_writes.push(structuredClone(next.resume));
    }
  };
  const launcher = {
    launch: vi.fn(
      async () =>
        options.launch || {
          session: 'launched',
          tmux_session: 'bdui-inquiry',
          tmux_window: 'B1',
          pane_id: '%7'
        }
    ),
    listPanesExtended: vi.fn(
      async () => options.panes || { ok: true, rows: [] }
    ),
    bridgeActive: vi.fn(() => true)
  };
  const recordInteractiveSession = vi.fn();
  const unsetExternalWait = vi.fn(
    /** @type {(bead_id: string) => Promise<void>} */ (
      options.unset || (async () => {})
    )
  );
  const notifyChanged = vi.fn();
  const run = vi.fn(
    /** @type {import('./session-resume.js').Run} */ (
      options.run || (async () => ({ code: 1, stdout: '', stderr: '' }))
    )
  );
  const resumer = createExternalWaitSessionResume({
    launcher,
    externalWait,
    recordInteractiveSession,
    unsetExternalWait,
    notifyChanged,
    tmuxSession: () => 'bdui-inquiry',
    run,
    sessionsDir: options.sessionsDir || path.join(root, '.claude', 'sessions'),
    sessionRefOptions: { home_dir: root },
    now: () => Date.parse(AT)
  });
  return {
    resumer,
    launcher,
    recordInteractiveSession,
    unsetExternalWait,
    run,
    resume_writes,
    recordOf: () => record,
    /** @param {string} [session_ref] */
    resume: (session_ref = `claude:${SESSION}@host`) =>
      resumer.resume({
        workspace: WS,
        record: structuredClone(record),
        bead_metadata: { session_ref }
      })
  };
}

describe('session resume qualification', () => {
  test.each([
    ['', 'no_session_ref'],
    ['claude:-bad@host', 'unsafe_session_id'],
    ['claude:elsewhere@host', 'not_local']
  ])('records %j as resume.error %s', async (session_ref, reason) => {
    const env = fixture();

    const result = await env.resume(session_ref);

    expect(result).toMatchObject({ session: 'not_launched', reason });
    expect(env.recordOf().resume).toMatchObject({
      mode: 'session',
      error: reason
    });
    expect(env.launcher.launch).not.toHaveBeenCalled();
  });
});

describe('session resume owner liveness', () => {
  test('returns the command without launching when the owner is alive', async () => {
    writeRegistry('61128.json', {
      pid: 61128,
      sessionId: SESSION,
      procStart: PROC_START,
      tmux: 'main:1.0'
    });
    const env = fixture({
      run: async () => ({ code: 0, stdout: `${PROC_START}\n`, stderr: '' })
    });

    const result = await env.resume();

    expect(result).toMatchObject({
      session: 'not_launched',
      reason: 'owner_alive',
      command: `claude --resume '${SESSION}'`,
      owner_tmux: 'main:1.0'
    });
    expect(env.launcher.launch).not.toHaveBeenCalled();
    expect(env.resume_writes).toEqual([]);
  });

  test('probes the registry pid in UTC and the C locale', async () => {
    writeRegistry('61128.json', {
      pid: 61128,
      sessionId: SESSION,
      procStart: PROC_START
    });
    const env = fixture();

    await env.resume();

    expect(env.run).toHaveBeenCalledWith(
      ['env', 'TZ=UTC', 'LC_ALL=C', 'ps', '-p', '61128', '-o', 'lstart='],
      { timeout_ms: 5000 }
    );
  });

  test('launches when ps no longer finds the registry pid', async () => {
    writeRegistry('61128.json', {
      pid: 61128,
      sessionId: SESSION,
      procStart: PROC_START
    });
    const env = fixture();

    const result = await env.resume();

    expect(result.session).toBe('launched');
  });

  test('launches when the pid was reused by another process', async () => {
    writeRegistry('61128.json', {
      pid: 61128,
      sessionId: SESSION,
      procStart: PROC_START
    });
    const env = fixture({
      run: async () => ({
        code: 0,
        stdout: 'Wed Sep 23 01:00:00 2026\n',
        stderr: ''
      })
    });

    const result = await env.resume();

    expect(result.session).toBe('launched');
  });

  test('ignores registry entries of other sessions', async () => {
    writeRegistry('1.json', {
      pid: 1,
      sessionId: 'other',
      procStart: PROC_START
    });
    const env = fixture({
      run: async () => ({ code: 0, stdout: PROC_START, stderr: '' })
    });

    const result = await env.resume();

    expect(result.session).toBe('launched');
    expect(env.run).not.toHaveBeenCalled();
  });

  test.each([
    ['a missing registry directory', { sessionsDir: '/nonexistent/sessions' }],
    [
      'a broken matching entry',
      { entry: `{"sessionId":"${SESSION}", "pid": ` }
    ],
    [
      'a matching entry without procStart',
      { entry: { pid: 5, sessionId: SESSION } }
    ],
    [
      'a failed ps execution',
      {
        entry: { pid: 5, sessionId: SESSION, procStart: PROC_START },
        run: async () => {
          throw new Error('spawn ps ENOENT');
        }
      }
    ]
  ])('leaves the record untouched on %s', async (_name, input) => {
    /** @type {any} */
    const options = input;
    if (options.entry) {
      writeRegistry('5.json', options.entry);
    }
    const env = fixture({ sessionsDir: options.sessionsDir, run: options.run });

    const result = await env.resume();

    expect(result).toMatchObject({
      session: 'not_launched',
      reason: 'owner_unverified',
      command: `claude --resume '${SESSION}'`
    });
    expect(env.launcher.launch).not.toHaveBeenCalled();
    expect(env.resume_writes).toEqual([]);
  });

  test('never verifies a codex session', async () => {
    const env = fixture();

    const liveness = await env.resumer.ownerLiveness('codex', SESSION);

    expect(liveness).toEqual({ state: 'unverified', owner_tmux: null });
  });
});

describe('session resume launch', () => {
  test('records worktree_missing without launching', async () => {
    const env = fixture({ record: { worktree: path.join(root, 'gone') } });

    const result = await env.resume();

    expect(result).toMatchObject({ reason: 'worktree_missing' });
    expect(env.recordOf().resume.error).toBe('worktree_missing');
    expect(env.launcher.launch).not.toHaveBeenCalled();
  });

  test('writes the reservation before launching', async () => {
    const env = fixture();
    /** @type {any} */
    let reservation = null;
    env.launcher.launch.mockImplementation(async () => {
      reservation = env.recordOf().resume;
      return { session: 'not_launched', reason: 'tmux_unavailable' };
    });

    await env.resume();

    expect(reservation).toEqual({
      mode: 'session',
      attempt_id: null,
      reserved_at: AT,
      launched_at: null,
      session_id: SESSION,
      error: null
    });
  });

  test('launches claude --resume under the external resume marker', async () => {
    const env = fixture();

    await env.resume();

    /** @type {any} */
    const input = /** @type {any[][]} */ (env.launcher.launch.mock.calls)[0][0];
    expect(input).toMatchObject({
      marker: EXTERNAL_RESUME_PANE_MARKER,
      key: 'B1',
      tmux_session: 'bdui-inquiry',
      window_name: 'B1',
      cwd: path.join(root, 'wt'),
      runner: 'claude'
    });
    expect(input.commandArgs.slice(0, 2)).toEqual(['--resume', SESSION]);
    expect(input.commandArgs).toHaveLength(3);
    expect(input.commandArgs[2].split('\n')[0]).toBe(
      SESSION_RESUME_PROMPT_LEAD
    );
    expect(input.commandArgs[2]).toContain('## 외부 작업 완료');
  });

  test('turns the reservation into a failure record when the launcher refuses', async () => {
    const env = fixture({
      launch: { session: 'not_launched', reason: 'tmux_unavailable' }
    });

    const result = await env.resume();

    expect(result).toMatchObject({
      session: 'not_launched',
      reason: 'tmux_unavailable'
    });
    expect(env.recordOf()).toMatchObject({
      stage: 'completing',
      resume: { mode: 'session', error: 'tmux_unavailable', launched_at: null }
    });
    expect(env.unsetExternalWait).not.toHaveBeenCalled();
  });

  test('settles a launched session and releases the key', async () => {
    const env = fixture();

    const result = await env.resume();

    expect(result).toEqual({
      ok: true,
      mode: 'session',
      session: 'launched',
      reason: null,
      command: `claude --resume '${SESSION}'`,
      owner_tmux: null,
      tmux_session: 'bdui-inquiry',
      tmux_window: 'B1',
      pane_id: '%7',
      bridge_active: true
    });
    expect(env.recordOf()).toMatchObject({
      stage: 'resumed',
      resume: { launched_at: AT, error: null }
    });
    expect(env.recordInteractiveSession).toHaveBeenCalledWith(
      WS,
      expect.objectContaining({
        kind: 'external_resume',
        mode: 'resume',
        session_id: SESSION,
        session_id_source: 'launch',
        source: 'session_ref',
        forked_from: null,
        attempt_id: null,
        pane_id: '%7'
      })
    );
    expect(env.unsetExternalWait).toHaveBeenCalledWith('B1');
  });

  test('settles an already running resume pane', async () => {
    const env = fixture({
      launch: { session: 'already_running' },
      panes: {
        ok: true,
        rows: [
          {
            session: 'bdui-inquiry',
            window: 'B1',
            pane: '%3',
            dead: '0',
            cwd: '/wt',
            agent_runtime: 'claude',
            key: 'B1'
          }
        ]
      }
    });

    const result = await env.resume();

    expect(result).toMatchObject({ session: 'already_running', pane_id: '%3' });
    expect(env.recordOf().stage).toBe('resumed');
    expect(env.launcher.listPanesExtended).toHaveBeenCalledWith(
      EXTERNAL_RESUME_PANE_MARKER
    );
  });

  test('retries only the key settlement when launch evidence exists', async () => {
    const env = fixture({
      record: {
        resume: {
          mode: 'session',
          attempt_id: null,
          reserved_at: AT,
          launched_at: AT,
          session_id: SESSION,
          error: null
        }
      },
      panes: {
        ok: true,
        rows: [
          {
            session: 'bdui-inquiry',
            window: 'B1',
            pane: '%9',
            dead: '0',
            cwd: '/wt',
            agent_runtime: 'claude',
            key: 'B1'
          }
        ]
      }
    });
    writeRegistry('4242.json', {
      pid: 4242,
      sessionId: SESSION,
      procStart: PROC_START,
      tmux: 'dev:@1.%1'
    });

    const result = await env.resume();

    expect(result).toMatchObject({ session: 'already_running', pane_id: '%9' });
    expect(env.launcher.launch).not.toHaveBeenCalled();
    expect(env.run).not.toHaveBeenCalled();
    expect(env.unsetExternalWait).toHaveBeenCalledWith('B1');
    expect(env.recordOf()).toMatchObject({
      stage: 'resumed',
      resume: { launched_at: AT, error: null }
    });
  });

  test('keeps launch evidence when the settlement retry fails again', async () => {
    const env = fixture({
      record: {
        resume: {
          mode: 'session',
          attempt_id: null,
          reserved_at: AT,
          launched_at: AT,
          session_id: SESSION,
          error: null
        }
      },
      unset: async () => {
        throw new Error('external_wait_unset_failed');
      }
    });

    const result = await env.resume();

    expect(result.session).toBe('already_running');
    expect(env.launcher.launch).not.toHaveBeenCalled();
    expect(env.recordOf()).toMatchObject({
      stage: 'completing',
      resume: { launched_at: AT, error: null }
    });
  });

  test('does not launch when a registry entry cannot be read', async () => {
    const env = fixture();
    const entry = path.join(root, '.claude', 'sessions', '5151.json');
    fs.mkdirSync(entry);

    const result = await env.resume();

    expect(result).toMatchObject({
      session: 'not_launched',
      reason: 'owner_unverified',
      command: `claude --resume '${SESSION}'`
    });
    expect(env.launcher.launch).not.toHaveBeenCalled();
    expect(env.recordOf().resume).toBeNull();
  });

  test('keeps a launched completing record when the key unset fails', async () => {
    const env = fixture({
      unset: async () => {
        throw new Error('external_wait_unset_failed');
      }
    });

    const result = await env.resume();

    expect(result.session).toBe('launched');
    expect(env.recordOf()).toMatchObject({
      stage: 'completing',
      resume: { launched_at: AT, error: null }
    });
  });
});
