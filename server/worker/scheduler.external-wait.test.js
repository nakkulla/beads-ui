import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createExternalWaitStore } from './external-wait/store.js';
import { resolveExecSettings } from './policy.js';
import { createQueueStore } from './queue-store.js';
import { createScheduler } from './scheduler.js';

const WS = '/repo';
const WAIT = 'w-0123456789ab';
const AT = '2026-09-21T00:00:00.000Z';
/** @type {string} */
let root;

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'external-resume-'));
  vi.stubEnv('XDG_STATE_HOME', root);
});
afterEach(() => {
  vi.unstubAllEnvs();
  fs.rmSync(root, { recursive: true, force: true });
});

/** @param {Record<string, any>} [options] */
function fixture(options = {}) {
  const store = createQueueStore({ now: () => 0 });
  const externalWait = {
    ...createExternalWaitStore(),
    onCompletion: options.onCompletion
  };
  /** @type {Record<string, string>} */
  const metadata = { external_wait: WAIT };
  let status = options.status || 'open';
  const bd = {
    snapshotBead: vi.fn(async () => ({
      repo: WS,
      target_base: 'main',
      ready: true,
      blocked: false,
      model: options.model || 'opus',
      effort: 'high',
      route: 'spec_backed',
      labels: [],
      deps: [],
      status,
      workflow_mode: metadata.workflow_mode || null,
      workflow_mode_source: metadata.workflow_mode_source || null,
      ...metadata,
      ...options.snapshot
    })),
    setMetadata: vi.fn(
      async (
        /** @type {string} */ _id,
        /** @type {string} */ key,
        /** @type {string} */ value
      ) => {
        metadata[key] = value;
      }
    ),
    unsetMetadata: vi.fn(
      async (/** @type {string} */ _id, /** @type {string} */ key) => {
        delete metadata[key];
      }
    ),
    readMetadata: vi.fn(
      async (/** @type {string} */ _id, /** @type {string} */ key) =>
        metadata[key] ?? null
    ),
    setStatus: vi.fn(
      async (/** @type {string} */ _id, /** @type {string} */ value) => {
        status = value;
      }
    ),
    readStatus: vi.fn(async () => status)
  };
  const prior = {
    attempt_id: 'origin',
    bead_id: 'B1',
    repo: WS,
    target_base: 'main',
    runner: 'claude',
    model: 'opus',
    effort: 'high',
    speed: 'default',
    session_id: 'prior-session',
    head_oid: 'b'.repeat(40),
    base_oid: 'a'.repeat(40),
    status: 'waiting',
    cause: 'external_job',
    quickfix_lane: false,
    started_at: 1,
    finished_at: 2,
    pid: null,
    ...options.prior
  };
  if (options.seed_prior !== false) {
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: prior
    });
  }
  externalWait.insert(WS, {
    wait_id: WAIT,
    root_dir: WS,
    bead_id: 'B1',
    owner: { kind: 'worker', attempt_id: 'origin' },
    worktree: '/wt/B1',
    execution_sha: 'a'.repeat(40),
    stage: 'completing',
    jobs: [
      {
        adapter: 'process',
        pid: 1234,
        workdir: '/wt/B1',
        log_path: '/wt/B1/job.log',
        submitted_at: AT,
        state: 'COMPLETED',
        terminal: {
          exit_code: 0,
          evidence: 'rc=0',
          expected_results: [
            { path: 'result.txt', exists: true, size: 42, mtime: 1000 }
          ],
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
    ...options.record
  });
  /** @type {any[]} */
  const launches = [];
  const makeRunner = (/** @type {string} */ name) => ({
    name,
    spawn: vi.fn(
      (
        /** @type {any} */ bead,
        /** @type {string} */ cwd,
        /** @type {any} */ settings
      ) => {
        const events = new EventEmitter();
        /** @type {(value: any) => void} */
        let finish = () => {};
        const done = new Promise((resolve) => {
          finish = resolve;
        });
        launches.push({
          bead,
          cwd,
          settings,
          events,
          finish,
          reservation: externalWait.get(WS, WAIT)?.resume
        });
        return {
          pid: 4321,
          process_identity: { pid: 4321, pgid: 4321, started_at: 1 },
          events,
          done,
          kill: vi.fn()
        };
      }
    )
  });
  const worktree = {
    add: vi.fn(async () => ({
      path: '/wt/B1',
      branch: 'B1',
      base_oid: 'a'.repeat(40)
    })),
    remove: vi.fn(async () => ({})),
    pathFor: () => '/wt/B1',
    exists: () => options.worktree_present !== false,
    removeIfDiscardable: vi.fn(async () => ({
      ok: false,
      reason: 'dirty_unique',
      owned: true,
      present: true,
      state: 'unique',
      identity: {
        branch: 'B1',
        worktree_realpath: '/wt/B1',
        head_sha: 'b'.repeat(40),
        base_oid: 'a'.repeat(40)
      },
      ...options.observation
    }))
  };
  const admission = {
    validate: vi.fn(
      async (
        /** @type {any} */ snap,
        /** @type {any} */ _base,
        /** @type {any} */ opts
      ) =>
        Object.hasOwn(snap, 'external_wait') &&
        !opts?.allow_external_wait_resume
          ? { ok: false, reason: 'external_wait' }
          : { ok: true }
    )
  };
  const scheduler = createScheduler({
    store,
    externalWait,
    bd,
    worktree: /** @type {any} */ (worktree),
    makeRunner,
    admission,
    execPresetCoordinator: /** @type {any} */ ({
      resolveForDispatch: (
        /** @type {string} */ _ws,
        /** @type {any} */ snap
      ) => ({
        ok: true,
        preset_id: null,
        preset_revision: null,
        exec_preset: null,
        settings: {},
        exec: resolveExecSettings({ bead: snap, defaults: {} })
      })
    }),
    sessionLog: { attach: vi.fn(), ...options.sessionLog },
    verify: {
      verifyPrSubmitted: vi.fn(async () => ({ ok: false, reason: 'no_pr' }))
    },
    fs: { existsSync: () => options.worktree_present !== false },
    resolveSessionFile: () => ({
      locality: options.transcript_present === false ? 'missing' : 'local',
      file: '/transcript',
      last_event_at: 1
    }),
    homeDir: root,
    probePid: () => ({ alive: false }),
    gitRun: vi.fn(async (args) =>
      args.includes('--abbrev-ref')
        ? { code: 0, stdout: 'B1\n', stderr: '' }
        : { code: 1, stdout: '', stderr: '' }
    ),
    now: () => Date.parse(AT),
    ...options.deps
  });
  return {
    scheduler,
    store,
    externalWait,
    bd,
    metadata,
    launches,
    admission,
    worktree
  };
}

/** @param {ReturnType<typeof fixture>} env */
function recordOf(env) {
  return env.externalWait.get(WS, WAIT);
}

describe('external wait settlement', () => {
  test.each([true, false])(
    'uses the server record for a live exit with success=%s',
    async (success) => {
      const env = fixture();
      const resumed = await env.scheduler.resumeExternalWait(WS, WAIT, {
        mode: 'fork'
      });
      expect(resumed.ok).toBe(true);
      if (!resumed.ok) {
        return;
      }
      const previous = recordOf(env);
      env.externalWait.remove(WS, WAIT);
      env.externalWait.insert(
        WS,
        /** @type {any} */ ({
          ...previous,
          stage: 'detached',
          completion: null,
          resume: null,
          owner: { kind: 'worker', attempt_id: resumed.attempt_id }
        })
      );

      env.launches[0].finish({
        success,
        reason: success ? 'success' : 'no_result',
        summary: null,
        terminal_result: null,
        exit: success ? 0 : 1,
        blocked: false,
        blocked_detail: null,
        events: [],
        raw: []
      });
      await vi.waitFor(() =>
        expect(env.store.snapshot(WS).attempts[resumed.attempt_id].status).toBe(
          'waiting'
        )
      );

      expect(env.store.snapshot(WS).attempts[resumed.attempt_id]).toMatchObject(
        { cause: 'external_job', cause_detail: { wait_id: WAIT } }
      );
    }
  );

  test('proves a detached record without a result line after restart', async () => {
    const env = fixture({
      prior: { status: 'running', finished_at: null },
      record: { stage: 'detached', completion: null }
    });

    await env.scheduler.reconcile(WS);

    expect(env.store.snapshot(WS).attempts.origin).toMatchObject({
      status: 'waiting',
      cause: 'external_job',
      cause_detail: {
        wait_id: WAIT,
        jobs: [
          {
            adapter: 'process',
            pid: 1234,
            state: 'COMPLETED',
            terminal: { exit_code: 0 }
          }
        ]
      }
    });
    expect(env.launches).toHaveLength(0);
  });

  test.each(['missing', 'owner', 'stage'])(
    'fails an unproven result with %s record evidence',
    async (mismatch) => {
      const log_path = path.join(root, 'session.jsonl');
      fs.writeFileSync(log_path, '');
      const env = fixture({
        prior: { status: 'running', finished_at: null, log_path },
        sessionLog: {
          read: () => [
            {
              type: 'result',
              subtype: 'success',
              result: `대기 · external:${WAIT}`,
              is_error: false
            }
          ]
        },
        record:
          mismatch === 'owner'
            ? { owner: { kind: 'worker', attempt_id: 'different' } }
            : mismatch === 'stage'
              ? { stage: 'done' }
              : {}
      });
      if (mismatch === 'missing') {
        env.externalWait.remove(WS, WAIT);
      }

      await env.scheduler.reconcile(WS);

      expect(env.store.snapshot(WS).attempts.origin).toMatchObject({
        status: 'failed',
        cause: 'external_wait_unproven',
        cause_detail: { wait_id: WAIT }
      });
    }
  );
});

describe('external wait resume', () => {
  test('forks a Codex thread with the same paired launch arguments', async () => {
    const env = fixture({
      model: 'sol',
      prior: { runner: 'codex', model: 'sol' }
    });

    const result = await env.scheduler.resumeExternalWait(WS, WAIT, {
      mode: 'fork'
    });

    expect(result.ok).toBe(true);
    expect(env.launches[0].settings).toMatchObject({
      resume_session_id: 'prior-session',
      fork_session: true
    });
  });

  test('waits for the origin attempt to terminate', async () => {
    const env = fixture({ prior: { status: 'running', finished_at: null } });

    const result = await env.scheduler.resumeExternalWait(WS, WAIT, {
      mode: 'fork'
    });

    expect(result).toEqual({ ok: false, reason: 'origin_running' });
    expect(env.launches).toHaveLength(0);
    expect(recordOf(env)?.resume).toBeNull();
  });

  test('reserves before fork launch and settles the admission key', async () => {
    const env = fixture();

    const result = await env.scheduler.resumeExternalWait(WS, WAIT, {
      mode: 'fork'
    });

    expect(result.ok).toBe(true);
    expect(env.launches).toHaveLength(1);
    const launch = env.launches[0];
    expect(launch.reservation).toMatchObject({
      mode: 'fork',
      launched_at: null,
      reserved_at: AT
    });
    expect(result).toEqual({
      ok: true,
      attempt_id: launch.reservation.attempt_id
    });
    expect(launch.settings).toMatchObject({
      resume_session_id: 'prior-session',
      fork_session: true
    });
    expect(launch.bead.prompt).toContain('## 외부 작업 완료');
    expect(launch.bead.prompt).toContain(
      'result.txt exists=true size=42 mtime=1000'
    );
    expect(launch.bead.prompt).toContain('관찰 완료는 구현 완료가 아니다');
    expect(recordOf(env)).toMatchObject({
      stage: 'resumed',
      resume: {
        attempt_id: launch.reservation.attempt_id,
        launched_at: AT,
        session_id: null
      }
    });
    expect(env.metadata).not.toHaveProperty('external_wait');
    expect(
      env.store.snapshot(WS).attempts[launch.reservation.attempt_id]
    ).toMatchObject({
      resumed_from: 'origin',
      continuation_mode: 'session',
      forked_from_session_id: 'prior-session'
    });
  });

  test('gate-r1 #7 persists a late fork session ID on the resumed wait', async () => {
    const env = fixture();
    const result = await env.scheduler.resumeExternalWait(WS, WAIT, {
      mode: 'fork'
    });
    expect(result.ok).toBe(true);
    expect(recordOf(env)?.stage).toBe('resumed');
    const other = env.externalWait.insert(WS, {
      .../** @type {import('./external-wait/store.js').WaitRecord} */ (
        recordOf(env)
      ),
      wait_id: 'w-abcdef012345',
      bead_id: 'B2',
      resume: {
        .../** @type {import('./external-wait/store.js').Resume} */ (
          recordOf(env)?.resume
        ),
        attempt_id: 'other',
        session_id: 'unchanged'
      }
    });

    env.launches[0].events.emit('session_id', 'fork-session');

    expect(recordOf(env)).toMatchObject({
      stage: 'resumed',
      resume: { session_id: 'fork-session' }
    });
    expect(
      env.store.snapshot(WS).attempts[env.launches[0].reservation.attempt_id]
        .session_id
    ).toBe('fork-session');
    expect(env.externalWait.get(WS, other.wait_id)?.resume?.session_id).toBe(
      'unchanged'
    );
  });

  test.each([
    [{ prior: { session_id: null } }, 'no_session_id'],
    [{ transcript_present: false }, 'transcript_missing'],
    [{ worktree_present: false }, 'worktree_missing'],
    [{ model: 'sol' }, 'runner_mismatch']
  ])(
    'records qualification failure without launching (%s)',
    async (options, reason) => {
      const env = fixture(/** @type {any} */ (options));

      const result = await env.scheduler.resumeExternalWait(WS, WAIT, {
        mode: 'fork'
      });

      expect(result).toEqual({ ok: false, reason });
      expect(env.launches).toHaveLength(0);
      expect(recordOf(env)?.resume).toMatchObject({
        attempt_id: null,
        reserved_at: null,
        error: reason
      });
      expect(env.metadata.external_wait).toBe(WAIT);
    }
  );

  test('opens a requested fresh session without a prior transcript', async () => {
    const env = fixture({
      prior: { session_id: null },
      transcript_present: false
    });

    const result = await env.scheduler.resumeExternalWait(WS, WAIT, {
      mode: 'fresh'
    });

    expect(result.ok).toBe(true);
    expect(env.launches[0].settings).not.toHaveProperty('resume_session_id');
    expect(env.launches[0].settings).not.toHaveProperty('fork_session');
    expect(env.launches[0].bead.prompt).toContain('## 외부 작업 완료');
  });

  test('passes the admission exception only through the proven wait entry', async () => {
    const env = fixture({
      prior: { status: 'failed', cause: 'session_failed' }
    });

    await env.scheduler.resume(WS, 'origin');
    env.store.updateAttempt(WS, {
      attempt_id: 'origin',
      patch: { status: 'waiting', cause: 'external_job' }
    });
    await env.scheduler.resumeExternalWait(WS, WAIT, { mode: 'fork' });

    expect(env.admission.validate.mock.calls.map((call) => call[2])).toEqual([
      {},
      { allow_external_wait_resume: true }
    ]);
  });

  test('refuses an owner mismatch before granting the admission exception', async () => {
    const env = fixture({
      record: { owner: { kind: 'worker', attempt_id: 'other' } }
    });

    await env.scheduler.resumeExternalWait(WS, WAIT, { mode: 'fork' });

    expect(env.admission.validate).not.toHaveBeenCalled();
    expect(env.launches).toHaveLength(0);
  });

  test.each(['closed', 'deferred', 'in_progress'])(
    'stops a wait whose bead is %s',
    async (status) => {
      const env = fixture({ status });

      await env.scheduler.resumeExternalWait(WS, WAIT, { mode: 'fork' });

      expect(recordOf(env)).toMatchObject({
        stage: 'stopped',
        resume: { error: `bead_${status}` }
      });
      expect(env.metadata).not.toHaveProperty('external_wait');
      expect(env.launches).toHaveLength(0);
    }
  );

  test('stops a bead with an awaiting_user key even when its value is empty', async () => {
    const env = fixture({ snapshot: { awaiting_user: '' } });

    await env.scheduler.resumeExternalWait(WS, WAIT, { mode: 'fork' });

    expect(recordOf(env)).toMatchObject({
      stage: 'stopped',
      resume: { error: 'bead_awaiting_user' }
    });
    expect(env.launches).toHaveLength(0);
  });

  test('coalesces simultaneous completion and human resume requests', async () => {
    const env = fixture();

    const results = await Promise.all([
      env.scheduler.resumeExternalWait(WS, WAIT, { mode: 'fork' }),
      env.scheduler.resumeExternalWait(WS, WAIT, { mode: 'fresh' })
    ]);

    expect(results.filter((result) => result.ok)).toHaveLength(1);
    expect(env.launches).toHaveLength(1);
  });

  test('keeps launch evidence when key removal fails', async () => {
    const env = fixture();
    env.bd.unsetMetadata.mockImplementation(async () => {});

    await env.scheduler.resumeExternalWait(WS, WAIT, { mode: 'fork' });

    expect(recordOf(env)).toMatchObject({
      stage: 'completing',
      resume: { launched_at: AT, error: 'external_wait_unset_failed' }
    });
    expect(env.launches).toHaveLength(1);
  });

  test('records an unqualified user session without launching', async () => {
    const env = fixture({
      seed_prior: false,
      record: {
        owner: {
          kind: 'session',
          session_ref: 'missing',
          session_pid: 3333,
          session_start: AT
        }
      }
    });

    await env.scheduler.resumeExternalWait(WS, WAIT, { mode: 'fork' });

    expect(recordOf(env)?.resume?.error).toBe('no_session_ref');
    expect(env.launches).toHaveLength(0);
  });

  test('claims a user-owned wait before launching a fresh Worker attempt', async () => {
    const env = fixture({
      seed_prior: false,
      record: {
        owner: {
          kind: 'session',
          session_ref: 'missing',
          session_pid: 3333,
          session_start: AT
        }
      }
    });

    const result = await env.scheduler.resumeExternalWait(WS, WAIT, {
      mode: 'fresh'
    });

    expect(result.ok).toBe(true);
    expect(env.bd.setStatus).toHaveBeenCalledWith('B1', 'in_progress');
    expect(env.launches).toHaveLength(1);
    expect(recordOf(env)?.stage).toBe('resumed');
  });

  test('gate-r1 #4 acquires a missing user worktree for a fresh completion session', async () => {
    let prepared = false;
    const env = fixture({
      seed_prior: false,
      worktree_present: false,
      observation: { ok: true },
      record: {
        owner: {
          kind: 'session',
          session_ref: 'missing',
          session_pid: 3333,
          session_start: AT
        }
      },
      deps: {
        fs: {
          existsSync: (/** @type {string} */ file) =>
            prepared && file === '/wt/recovered'
        }
      }
    });
    env.worktree.add.mockImplementation(async () => {
      prepared = true;
      return { path: '/wt/recovered', branch: 'B1', base_oid: 'a'.repeat(40) };
    });

    const result = await env.scheduler.resumeExternalWait(WS, WAIT, {
      mode: 'fresh'
    });

    expect(result.ok).toBe(true);
    expect(env.worktree.removeIfDiscardable).toHaveBeenCalledWith({
      repo: WS,
      bead_id: 'B1',
      base: 'main'
    });
    expect(env.worktree.add).toHaveBeenCalledWith({
      repo: WS,
      bead_id: 'B1',
      base: 'main'
    });
    expect(env.launches[0].cwd).toBe('/wt/recovered');
    expect(env.launches[0].settings.base_oid).toBe('a'.repeat(40));
    expect(env.launches[0].settings).not.toHaveProperty('resume_session_id');
    expect(env.launches[0].bead.prompt).toContain('## 외부 작업 완료');
  });

  test('backs up residue while preserving the external completion reservation', async () => {
    let prepared = false;
    const backupFreshResidue = vi.fn(async () => ({
      ok: true,
      backup_path: '/backups/one'
    }));
    const append = vi.fn();
    const env = fixture({
      seed_prior: false,
      worktree_present: false,
      record: {
        owner: {
          kind: 'session',
          session_ref: 'missing',
          session_pid: 3333,
          session_start: AT
        }
      },
      observation: {
        identity: {
          branch: 'B1',
          worktree_realpath: null,
          head_sha: null,
          branch_head_sha: 'b'.repeat(40),
          base_oid: 'a'.repeat(40),
          status_digest: 'status'
        }
      },
      deps: {
        backupFreshResidue,
        timeline: { append },
        gitRun: async (/** @type {string[]} */ args) => ({
          code: 0,
          stdout: args[0] === 'ls-remote' ? '' : 'B1\n',
          stderr: ''
        }),
        fs: { existsSync: () => prepared }
      }
    });
    env.worktree.add.mockImplementation(async () => {
      prepared = true;
      return { path: '/wt/recovered', branch: 'B1', base_oid: 'a'.repeat(40) };
    });

    const result = await env.scheduler.resumeExternalWait(WS, WAIT, {
      mode: 'fresh'
    });

    expect(result.ok).toBe(true);
    expect(backupFreshResidue).toHaveBeenCalledOnce();
    expect(env.launches[0].bead.prompt).toContain('## 외부 작업 완료');
    expect(env.launches[0].reservation.attempt_id).toBe(
      recordOf(env)?.resume?.attempt_id
    );
    expect(env.launches[0].cwd).toBe('/wt/recovered');
    expect(append).toHaveBeenCalledWith(
      expect.objectContaining({
        kind: 'stale_work_auto',
        detail: '/backups/one'
      })
    );
    expect(env.store.snapshot(WS).admission.B1).toBeUndefined();
  });

  test('preserves stale work when fresh user worktree acquisition remains unresolved', async () => {
    const env = fixture({
      seed_prior: false,
      worktree_present: false,
      record: {
        owner: {
          kind: 'session',
          session_ref: 'missing',
          session_pid: 3333,
          session_start: AT
        }
      }
    });

    const result = await env.scheduler.resumeExternalWait(WS, WAIT, {
      mode: 'fresh'
    });

    expect(result).toEqual({ ok: false, reason: 'stale_work_unresolved' });
    expect(env.worktree.add).not.toHaveBeenCalled();
    expect(env.launches).toHaveLength(0);
    expect(env.metadata.external_wait).toBe(WAIT);
    expect(Object.values(env.store.snapshot(WS).attempts).at(-1)).toMatchObject(
      { status: 'failed', cause: 'stale_work_unresolved', dismissed_at: null }
    );
  });

  test('forks the local session_ref into a new Worker attempt', async () => {
    const transcript_dir = path.join(root, '.claude', 'projects', '-repo');
    fs.mkdirSync(transcript_dir, { recursive: true });
    fs.writeFileSync(path.join(transcript_dir, 'user-session.jsonl'), '{}\n');
    const env = fixture({
      seed_prior: false,
      snapshot: { session_ref: 'claude:user-session@host' },
      record: {
        owner: {
          kind: 'session',
          session_ref: 'claude:user-session@host',
          session_pid: 3333,
          session_start: AT
        }
      }
    });

    const result = await env.scheduler.resumeExternalWait(WS, WAIT, {
      mode: 'fork'
    });

    expect(result.ok).toBe(true);
    expect(env.launches[0].settings).toMatchObject({
      resume_session_id: 'user-session',
      fork_session: true
    });
    expect(env.launches[0].cwd).toBe('/wt/B1');
    expect(Object.values(env.store.snapshot(WS).attempts)).toHaveLength(1);
    expect(env.bd.setStatus).toHaveBeenCalledWith('B1', 'in_progress');
  });

  test('preserves a waiting external-job worktree during fresh dispatch preflight', async () => {
    const env = fixture({
      deps: {
        gitRun: async (/** @type {string[]} */ args) => ({
          code: 0,
          stdout: args[0] === 'ls-remote' ? '' : 'B1\n',
          stderr: ''
        })
      }
    });
    delete env.metadata.external_wait;
    env.store.place(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      bead_id: 'B1'
    });
    env.store.setAutoAdvance(WS, true);

    await env.scheduler.tick(WS);

    expect(env.worktree.removeIfDiscardable).toHaveBeenCalledWith(
      expect.objectContaining({ bead_id: 'B1', preserve: true })
    );
    expect(env.worktree.add).not.toHaveBeenCalled();
    expect(env.worktree.removeIfDiscardable).toHaveBeenCalledTimes(1);
    expect(env.store.snapshot(WS).admission.B1).toBeUndefined();
    expect(Object.values(env.store.snapshot(WS).attempts).at(-1)).toMatchObject(
      { status: 'running' }
    );
    expect(env.launches).toHaveLength(1);
  });
});

describe('external wait reservation recovery', () => {
  test.each([
    [true, true],
    [true, false],
    [false, true],
    [false, false]
  ])('settles launched=%s and recorded=%s', async (launched, recorded) => {
    const env = fixture({
      record: {
        resume: {
          mode: 'fork',
          attempt_id: 'reserved',
          reserved_at: AT,
          launched_at: launched ? AT : null,
          session_id: null,
          error: null
        }
      }
    });
    if (recorded) {
      env.store.appendAttempt(WS, {
        expected_revision: env.store.snapshot(WS).revision,
        attempt: {
          attempt_id: 'reserved',
          bead_id: 'B1',
          status: 'done',
          finished_at: 2
        }
      });
    }

    await env.scheduler.reconcile(WS);

    expect(recordOf(env)?.stage).toBe('resumed');
    expect(env.metadata).not.toHaveProperty('external_wait');
    expect(env.launches).toHaveLength(!launched && !recorded ? 1 : 0);
  });

  test('gate-r1 #1 resumes an unreserved worker completion after restart', async () => {
    const env = fixture();

    await env.scheduler.reconcile(WS);

    expect(recordOf(env)?.stage).toBe('resumed');
    expect(env.launches).toHaveLength(1);
  });

  test('gate-r1 #1 reconnects completion hooks while the origin is still running', async () => {
    const onCompletion = vi.fn();
    const env = fixture({
      prior: { status: 'running', pid: 3333, finished_at: null },
      deps: { probePid: () => ({ alive: true, started_at: 1 }) },
      onCompletion
    });

    await env.scheduler.reconcile(WS);

    expect(onCompletion).toHaveBeenCalledExactlyOnceWith(
      WS,
      expect.objectContaining({ wait_id: WAIT, resume: null })
    );
    expect(env.launches).toHaveLength(0);
  });

  test('gate-r1 #1 leaves unreserved session completion for manual resume without notifying again', async () => {
    const onCompletion = vi.fn();
    const env = fixture({
      onCompletion,
      seed_prior: false,
      record: {
        owner: {
          kind: 'session',
          session_ref: 'missing',
          session_pid: 3333,
          session_start: AT
        }
      }
    });

    await env.scheduler.reconcile(WS);

    expect(recordOf(env)?.stage).toBe('completing');
    expect(recordOf(env)?.resume).toBeNull();
    expect(env.launches).toHaveLength(0);
    expect(onCompletion).not.toHaveBeenCalled();
  });

  test.each(['reconcile', 'settleExternalWaitReservations'])(
    'gate-r1 #2 retries a %s prerecord without treating it as launch evidence',
    async (method) => {
      const env = fixture({
        record: {
          resume: {
            mode: 'fork',
            attempt_id: 'reserved',
            reserved_at: AT,
            launched_at: null,
            session_id: null,
            error: null
          }
        }
      });
      env.store.appendAttempt(WS, {
        expected_revision: env.store.snapshot(WS).revision,
        attempt: {
          attempt_id: 'reserved',
          bead_id: 'B1',
          repo: WS,
          target_base: 'main',
          runner: 'claude',
          status: 'running',
          started_at: null,
          pid: null
        }
      });

      await env.scheduler[
        /** @type {'reconcile'|'settleExternalWaitReservations'} */ (method)
      ](WS);

      expect(env.store.snapshot(WS).attempts.reserved.status).not.toBe(
        'running'
      );
      expect(env.launches).toHaveLength(1);
      expect(recordOf(env)).toMatchObject({
        stage: 'resumed',
        resume: { attempt_id: env.launches[0].reservation.attempt_id }
      });
      expect(env.launches[0].reservation.attempt_id).not.toBe('reserved');
    }
  );

  test.each([
    { started_at: 1, pid: null },
    { started_at: null, pid: 3333 }
  ])(
    'gate-r1 #2 settles actual run evidence %j without launching twice',
    async (evidence) => {
      const env = fixture({
        record: {
          resume: {
            mode: 'fork',
            attempt_id: 'reserved',
            reserved_at: AT,
            launched_at: null,
            session_id: null,
            error: null
          }
        }
      });
      env.store.appendAttempt(WS, {
        expected_revision: env.store.snapshot(WS).revision,
        attempt: {
          attempt_id: 'reserved',
          bead_id: 'B1',
          status: 'running',
          ...evidence
        }
      });

      await env.scheduler.settleExternalWaitReservations(WS);

      expect(recordOf(env)?.stage).toBe('resumed');
      expect(env.launches).toHaveLength(0);
    }
  );
});
