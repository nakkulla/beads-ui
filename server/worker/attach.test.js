import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  normalizeBdIssue,
  normalizeBdIssueList,
  normalizeBdReadyRows
} from '../bd-json.js';
import {
  RECONCILE_INTERVAL_SECONDS,
  __registerWorkerAttachmentForTest,
  __resetWorkerAttachmentsForTest,
  createLiveBd,
  createWorkerAttachment,
  initWorkerRuntime,
  retryWorkerCleanup,
  stopWorkerAttempt,
  tickWorkerQueue
} from './attach.js';
import * as attachModule from './attach.js';
import { createAutoAdvanceRestoreController } from './auto-advance-restore.js';
import {
  pushLogPath as guardPushLogPath,
  install as installGuardHook
} from './guard-hook.js';
import { createQueueStore } from './queue-store.js';
import { makeFixtureSpawn } from './runner/fixture-spawn.js';
import { createWorkerRuntime } from './runtime.js';
import { sessionLogPath } from './state-paths.js';

// `beadFacts`는 attach가 repair 어댑터를 만들 때만 존재하는 클로저다. 실제
// 구현으로 위임하는 mock으로 그 deps만 붙잡아 다른 스위트의 동작은 그대로 둔다.
const repair_adapter_capture = vi.hoisted(() => ({
  /** @type {any} */
  deps: null
}));

vi.mock('./repair-session-adapter.js', async (importOriginal) => {
  const actual = /** @type {any} */ (await importOriginal());
  return {
    ...actual,
    createRepairSessionAdapter: (/** @type {any} */ deps) => {
      repair_adapter_capture.deps = deps;
      return actual.createRepairSessionAdapter(deps);
    }
  };
});

// 큐 deps는 attach 안에서만 조립된다. 같은 위임 mock으로 그 deps를 붙잡아,
// 생산 조립이 seam을 실제로 연결하는지 본다(UI-p49g §4.1).
const merge_queue_capture = vi.hoisted(() => ({
  /** @type {any} */
  deps: null
}));

vi.mock('./merge-queue.js', async (importOriginal) => {
  const actual = /** @type {any} */ (await importOriginal());
  return {
    ...actual,
    createMergeQueue: (/** @type {any} */ deps) => {
      merge_queue_capture.deps = deps;
      return actual.createMergeQueue(deps);
    }
  };
});

const FIXTURES = path.resolve(process.cwd(), 'server/worker/__fixtures__');

/**
 * A resolved-base stub for `createLiveBd` (worker-base-scope-alignment §1): the
 * resolver is the ONLY source of a snapshot's base now, so every snapshot test
 * injects one instead of pinning a plain string.
 *
 * @param {string} base
 * @param {string} [base_oid]
 */
function okBase(base, base_oid = 'a'.repeat(40)) {
  return async () => ({
    ok: /** @type {const} */ (true),
    base,
    declared: base !== 'main',
    remote: 'origin',
    remote_ref: `refs/remotes/origin/${base}`,
    base_oid,
    local_only: false
  });
}

/**
 * An UNRESOLVED base stub: a declaration whose step failed.
 *
 * @param {'declaration'|'format'|'remote_prefix'|'remote'|'fetch'|'ref'|'git_error'} step
 */
function failBase(step) {
  return async () => ({
    ok: /** @type {const} */ (false),
    step,
    base: 'ilsun/dv',
    detail: 'test'
  });
}
/**
 * Write a raw line the way the RUNNER now does — straight to the session-log
 * file through its own fd (UI-o2yt §3.1), with no server-side writer.
 *
 * @param {string} attempt_id
 * @param {unknown} event
 */
function writeRunnerLine(attempt_id, event) {
  const file = sessionLogPath(WS, attempt_id);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.appendFileSync(file, `${JSON.stringify(event)}\n`);
}

/** @type {string} */
let tmp_state;
/** @type {string} */
let WS;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-attach-'));
  process.env.XDG_STATE_HOME = tmp_state;
  WS = path.join(tmp_state, 'workspace');
  __resetWorkerAttachmentsForTest();
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  delete process.env.BDUI_CONFIG_PATH;
  __resetWorkerAttachmentsForTest();
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

/**
 * @param {() => boolean} pred
 * @param {number} [timeout_ms]
 */
async function waitFor(pred, timeout_ms = 1000) {
  const start = Date.now();
  while (Date.now() - start < timeout_ms) {
    if (pred()) {
      return;
    }
    await new Promise((r) => setTimeout(r, 5));
  }
  if (!pred()) {
    throw new Error('waitFor timed out');
  }
}

/**
 * @param {Record<string, any>} config
 */
function fakeBd(config = {}) {
  /** @type {any[]} */
  const calls = [];
  return {
    calls,
    async snapshotBead(/** @type {string} */ bead_id) {
      const c = config[bead_id] || {};
      return {
        ready: c.ready ?? true,
        blocked: c.blocked ?? false,
        repo: c.repo ?? '/repo',
        target_base: c.target_base ?? 'main',
        runner: c.runner ?? 'claude',
        model: c.model ?? 'opus',
        effort: c.effort ?? 'high',
        workflow_mode: null,
        route: c.route ?? null,
        status: c.status ?? '',
        deps: []
      };
    },
    async setMetadata(
      /** @type {string} */ id,
      /** @type {string} */ k,
      /** @type {string} */ v
    ) {
      calls.push(['set', id, k, v]);
    },
    async unsetMetadata(/** @type {string} */ id, /** @type {string} */ k) {
      calls.push(['unset', id, k]);
    },
    async readMetadata(/** @type {string} */ _id, /** @type {string} */ k) {
      if (k === 'workflow_mode') {
        return 'fast_track';
      }
      // The dispatch stamps the mode's AUTHORITY in the same write and confirms
      // it by readback (UI-bu6d §5), so the fake has to echo both or every
      // launch refuses itself.
      return k === 'workflow_mode_source' ? 'worker' : null;
    }
  };
}

const fakeWorktree = {
  add: async (/** @type {{ bead_id: string }} */ { bead_id }) => ({
    path: `/wt/${bead_id}`,
    branch: bead_id,
    base_oid: 'oid'
  }),
  remove: async () => ({ code: 0 }),
  removeByBranch: async () => ({ ok: true, removed: false, reason: null }),
  // The manager owns the repo topology lock and hands it to the modules that
  // run their own ref-mutating git commands, so the fake must offer it too.
  withTopologyLock: async (
    /** @type {string} */ _repo,
    /** @type {any} */ fn
  ) => fn()
};

const okVerify = {
  verifyPrSubmitted: async () => ({
    ok: true,
    reason: 'ok',
    pr_url: 'https://github.com/o/r/pull/1'
  })
};

/**
 * A repo with no exec account defaults. Every test that reaches dispatch needs
 * it for the same reason it needs `okBase`: the temp workspace has no bd rig,
 * so the real `bd kv get` fails and the launch refuses fail-closed.
 */
const noAccountDefaults = async () => ({ ok: true, value: undefined });

/**
 * Persist a `running` attempt the way a PRIOR process left it: the durable
 * record survives, the in-memory session handle does not.
 *
 * @param {any} store
 * @param {string} attempt_id
 * @param {string} bead_id
 */
function seedDetachedAttempt(store, attempt_id, bead_id) {
  store.appendAttempt(WS, {
    expected_revision: store.snapshot(WS).revision,
    attempt: { attempt_id, bead_id }
  });
  store.updateAttempt(WS, {
    attempt_id,
    patch: { status: 'running', pid: 999999, started_at: 1000, repo: '/repo' }
  });
}

/**
 * @param {any} store
 * @param {string} id
 */
function seedQueue(store, id) {
  const rev = store.snapshot(WS).revision;
  store.place(WS, { expected_revision: rev, bead_id: id });
  store.setAutoAdvance(WS, true);
}

/**
 * Adapt a transport-shaped `bd --json` fake to the projected runner contract.
 *
 * The fakes below describe what bd prints — including the single-item-array
 * `show` shape live bd emits — so they run through the SAME projectors
 * production uses instead of hand-rolling the post-projection value.
 *
 * @param {(args: string[], options?: any) => Promise<any>} fake
 * @returns {any}
 */
function asProjected(fake) {
  return async (
    /** @type {string} */ command_family,
    /** @type {string[]} */ args,
    /** @type {any} */ options = {}
  ) => {
    const raw = await fake(args, options);
    if (!raw || raw.code !== 0) {
      return {
        ok: false,
        error: {
          code: 'bd_exit_error',
          message: String((raw && raw.stderr) || 'bd failed')
        }
      };
    }
    const projected =
      command_family === 'show'
        ? normalizeBdIssue(raw.stdoutJson, { expected_id: options.expected_id })
        : command_family === 'ready'
          ? normalizeBdReadyRows(raw.stdoutJson)
          : normalizeBdIssueList(raw.stdoutJson);
    if (!projected.ok) {
      return projected;
    }
    return {
      ok: true,
      protocol: { format: 'bare', schema_version: null },
      data: projected.data
    };
  };
}

describe('worker/attach construction + live loop (F1)', () => {
  test('does not expose the retired cleanup diagnosis attachment action', () => {
    expect(
      /** @type {any} */ (attachModule).diagnoseWorkerCleanup
    ).toBeUndefined();
  });

  test('createWorkerAttachment builds a scheduler + reconcile timer over REAL deps', () => {
    const runtime = createWorkerRuntime();
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] })
    });
    expect(typeof att.scheduler.tick).toBe('function');
    expect(typeof att.scheduler.stop).toBe('function');
    expect(typeof att.scheduler.reconcile).toBe('function');
    expect(typeof att.reconciler.start).toBe('function');
    expect(typeof att.completionIntent.start).toBe('function');
    expect(typeof att.completionIntent.stop).toBe('function');
    // The runtime running-count seam now reflects THIS scheduler.
    expect(runtime.status(WS).running_count).toBe(0);
  });

  test('routes a bd issue-change event to the metadata re-check', async () => {
    /** @type {Array<() => void>} */
    const listeners = [];
    const onIssuesChanged = vi.fn(async () => {});
    const att = createWorkerAttachment(WS, {
      runtime: createWorkerRuntime(),
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      watchBeads: (
        /** @type {string} */ _root,
        /** @type {() => void} */ onChange
      ) => {
        listeners.push(onChange);
        return { close: () => {} };
      },
      completionActionDriver: /** @type {any} */ ({
        observe: vi.fn(),
        onAction: vi.fn(),
        adoptLegacyTimeout: vi.fn(),
        onAttemptSettled: vi.fn(),
        onMergeResult: vi.fn(),
        onIssuesChanged
      })
    });

    att.beadsChanges.start();
    listeners[0]();
    await Promise.resolve();

    expect(listeners).toHaveLength(1);
    expect(onIssuesChanged).toHaveBeenCalledTimes(1);
  });

  test('binds no bd issue-change watcher before the attachment starts', () => {
    const watchBeads = vi.fn(() => ({ close: () => {} }));
    createWorkerAttachment(WS, {
      runtime: createWorkerRuntime(),
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      watchBeads
    });

    expect(watchBeads).not.toHaveBeenCalled();
  });

  test('wires repo-operation passes to the process restore controller', async () => {
    const autoAdvanceRestore = {
      register: vi.fn(),
      beforeReconcile: vi.fn(),
      afterReconcileLocked: vi.fn(async () => false),
      restoreAll: vi.fn(async () => {})
    };
    const att = createWorkerAttachment(WS, {
      runtime: createWorkerRuntime(),
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      autoAdvanceRestore,
      spawn_impl: makeFixtureSpawn({ lines: [] })
    });

    await att.repoOperationCoordinator.reconcile(WS);

    expect(autoAdvanceRestore.beforeReconcile).toHaveBeenCalledWith(WS);
    expect(autoAdvanceRestore.afterReconcileLocked).toHaveBeenCalledWith(WS);
  });

  test('dispatches waiting work through scheduler handoff after restoration', async () => {
    const source_sha = 'a'.repeat(40);
    const root_sha = 'b'.repeat(40);
    const previous_store = createQueueStore({ now: () => 100 });
    previous_store.toggleAutoAdvance(WS, { expected_revision: 0, on: true });
    previous_store.place(WS, {
      expected_revision: previous_store.snapshot(WS).revision,
      bead_id: 'UI-next'
    });
    previous_store.ensureRepoOperation(WS, {
      operation_id: 'self-deploy',
      repo_id: WS,
      kind: 'deploy',
      subjects: [{ bead_id: 'UI-self', merged_sha: 'c'.repeat(40) }],
      effective_base_sha: 'd'.repeat(40),
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: 'e'.repeat(40)
    });
    const previous_operation =
      previous_store.snapshot(WS).repo_operations['self-deploy'];
    previous_store.startRepoOperation(WS, {
      operation_id: 'self-deploy',
      attempt_id: previous_operation.attempt_id,
      process_identity: { pid: 1, pgid: 1, started_at: 100 },
      log_path: path.join(WS, 'deploy.log'),
      target_sha: source_sha
    });
    const runtime = createWorkerRuntime();
    const spawn = vi.fn((/** @type {any} */ bead) => ({
      bead_id: bead.id,
      pid: 4321,
      process_identity: { pid: 4321, pgid: 4321, started_at: 201 },
      kill: vi.fn(),
      events: new EventEmitter(),
      done: new Promise(() => {})
    }));
    const controller = createAutoAdvanceRestoreController({
      runtime_identity: {
        source_repo: WS,
        source_sha,
        process_started_at: 200
      }
    });
    const repairSession = {
      dispatch: vi.fn(),
      judge: vi.fn(async () => ({ verdict: 'unresolved', evidence: null }))
    };
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: fakeBd({ 'UI-next': { status: 'open' } }),
      worktree: fakeWorktree,
      verify: okVerify,
      admission: { validate: async () => ({ ok: true }) },
      resolveBase: okBase('main'),
      kvGet: noAccountDefaults,
      gitRun: async (args) =>
        args[0] === 'rev-list'
          ? { code: 0, stdout: `${root_sha}\n`, stderr: '' }
          : { code: 1, stdout: '', stderr: '' },
      makeRunner: () => ({ name: 'codex', spawn }),
      repairSession,
      autoAdvanceRestore: controller
    });
    controller.register({
      workspace: WS,
      repo: WS,
      store: runtime.queueStore,
      locks: runtime.locks,
      gitRun: att.gitRun,
      repairSession,
      notifyChanged: vi.fn(),
      tick: (workspace) => att.scheduler.tick(workspace)
    });

    controller.beforeReconcile(WS);
    const operation =
      runtime.queueStore.snapshot(WS).repo_operations['self-deploy'];
    runtime.queueStore.settleRepoOperation(WS, {
      operation_id: 'self-deploy',
      attempt_id: operation.attempt_id,
      exit_code: 0,
      signal: null
    });
    const restore_ready = await controller.afterReconcileLocked(WS);
    if (restore_ready) {
      await controller.restoreAll();
    }

    expect(runtime.queueStore.snapshot(WS).auto_advance).toBe(true);
    expect(spawn).toHaveBeenCalledTimes(1);
    expect(spawn.mock.calls[0][0].id).toBe('UI-next');
  });

  test('hands a late moot repair to scheduler dispatch after reconciliation', async () => {
    const runtime = createWorkerRuntime();
    const spawn = vi.fn((/** @type {any} */ _bead) => ({
      bead_id: _bead.id,
      pid: 4321,
      process_identity: { pid: 4321, pgid: 4321, started_at: 1 },
      kill: vi.fn(),
      events: new EventEmitter(),
      done: new Promise(() => {})
    }));
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: fakeBd({ 'UI-next': { status: 'open' } }),
      worktree: fakeWorktree,
      verify: okVerify,
      admission: { validate: async () => ({ ok: true }) },
      resolveBase: okBase('main'),
      kvGet: noAccountDefaults,
      gitRun: async () => ({ code: 1, stdout: '', stderr: '' }),
      makeRunner: () => ({ name: 'claude', spawn }),
      repairSession: {
        dispatch: vi.fn(),
        judge: vi.fn(async () => ({
          verdict: 'chain_closed',
          evidence: null
        }))
      }
    });
    const store = runtime.queueStore;
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'repair-failure',
        bead_id: 'UI-repair',
        repo: WS,
        status: 'failed',
        finished_at: 10,
        repair_operation_id: 'cleanup:UI-repair',
        halted_auto_advance: true
      }
    });
    store.place(WS, {
      expected_revision: store.snapshot(WS).revision,
      bead_id: 'UI-next'
    });

    await att.repoOperationCoordinator.reconcile(WS);

    expect(store.snapshot(WS).auto_advance).toBe(true);
    expect(store.snapshot(WS).attempts['repair-failure'].dismissed_at).not.toBe(
      null
    );
    expect(store.snapshot(WS).admission).toEqual({});
    expect(spawn).toHaveBeenCalledTimes(1);
    expect(spawn.mock.calls[0][0].id).toBe('UI-next');
  });

  test('defaults the attachment git runner cwd to its repository', async () => {
    const gitRun = vi.fn(async () => ({ code: 0, stdout: '', stderr: '' }));
    const att = createWorkerAttachment(WS, {
      repo: '/repo',
      gitRun,
      runtime: createWorkerRuntime(),
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] })
    });

    await att.gitRun(['status'], { timeout_ms: 1000 });

    expect(gitRun).toHaveBeenCalledWith(['status'], {
      cwd: '/repo',
      timeout_ms: 1000
    });
  });

  test('preserves an explicit cwd for the attachment git runner', async () => {
    const gitRun = vi.fn(async () => ({ code: 0, stdout: '', stderr: '' }));
    const att = createWorkerAttachment(WS, {
      repo: '/repo',
      gitRun,
      runtime: createWorkerRuntime(),
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] })
    });

    await att.gitRun(['status'], { cwd: '/explicit-repo' });

    expect(gitRun).toHaveBeenCalledWith(['status'], { cwd: '/explicit-repo' });
  });

  test('routes a stranded cleanup retry through the real attachment to Done', async () => {
    const runtime = createWorkerRuntime();
    /** @type {Record<string, string>} */
    const statuses = { 'UI-root': 'resolved' };
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: {
        ...fakeBd(),
        listChildren: async () => [],
        setStatus: async (
          /** @type {string} */ id,
          /** @type {string} */ status
        ) => {
          statuses[id] = status;
        },
        readStatus: async (/** @type {string} */ id) => statuses[id]
      },
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] })
    });
    const store = runtime.queueStore;
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'att-root',
        bead_id: 'UI-root',
        repo: WS,
        target_base: 'main',
        base_oid: 'b'.repeat(40)
      }
    });
    store.moveToPrWait(WS, {
      bead_id: 'UI-root',
      attempt_id: 'att-root',
      patch: { status: 'done' }
    });
    store.enqueueCompletionIntent(WS, {
      root_bead_id: 'UI-root',
      source_attempt_id: 'att-root',
      target_base: 'main',
      subject: {
        role: 'root',
        bead_id: 'UI-root',
        pr_url: 'https://github.com/o/r/pull/1',
        head_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: 'c'.repeat(40)
      }
    });
    store.terminalizeCompletionIntent(WS, {
      root_bead_id: 'UI-root',
      terminal: {
        reason: 'parent_close_failed',
        stage: 'cleanup',
        failure_key: null,
        evidence: null,
        log_path: null,
        at: 1
      }
    });
    store.recordCleanupFailure(WS, {
      bead_id: 'UI-root',
      step: 'parent_close',
      reason: 'bd_close_failed'
    });
    __registerWorkerAttachmentForTest(WS, att);

    const result = await retryWorkerCleanup(WS, 'UI-root');

    expect(result).toMatchObject({ ok: true, step: null, reason: null });
    expect(store.snapshot(WS)).toMatchObject({
      pr_wait: [],
      cleanup_failed: {},
      done: [{ bead_id: 'UI-root' }],
      completion_intents: {
        'UI-root': { phase: 'completed', terminal_reason: null }
      }
    });
  });

  test('wires the completion action driver into the default coordinator', async () => {
    const runtime = createWorkerRuntime();
    const completionActionDriver = {
      observe: vi.fn(async () => ({ state: 'green' })),
      onAction: vi.fn(),
      onAttemptSettled: vi.fn(),
      onMergeResult: vi.fn()
    };
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      completionActionDriver,
      spawn_impl: makeFixtureSpawn({ lines: [] })
    });
    runtime.queueStore.appendAttempt(WS, {
      expected_revision: 0,
      attempt: {
        attempt_id: 'att-root',
        bead_id: 'UI-root',
        repo: WS,
        target_base: 'main',
        base_oid: 'b'.repeat(40),
        runner: 'claude'
      }
    });
    runtime.queueStore.moveToPrWait(WS, {
      bead_id: 'UI-root',
      attempt_id: 'att-root',
      patch: { status: 'done' }
    });
    runtime.queueStore.toggleAutoMerge(WS, {
      expected_revision: runtime.queueStore.snapshot(WS).revision,
      on: true
    });
    runtime.queueStore.enqueueCompletionIntent(WS, {
      root_bead_id: 'UI-root',
      source_attempt_id: 'att-root',
      target_base: 'main',
      subject: {
        role: 'root',
        bead_id: 'UI-root',
        pr_url: 'https://github.com/o/r/pull/1',
        head_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: null
      }
    });

    att.completionIntent.start();
    await att.completionIntent.idle();
    att.completionIntent.stop();

    expect(completionActionDriver.observe).toHaveBeenCalledTimes(1);
    expect(completionActionDriver.onAction).toHaveBeenCalledWith(
      'UI-root',
      { kind: 'merge_subject' },
      expect.objectContaining({ phase: 'gating' })
    );
  });

  test('returns completion merge results to the injected action driver', async () => {
    const runtime = createWorkerRuntime();
    const completionActionDriver = {
      observe: vi.fn(),
      onAction: vi.fn(),
      onAttemptSettled: vi.fn(),
      onMergeResult: vi.fn()
    };
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      resolveBase: okBase('main', 'b'.repeat(40)),
      completionActionDriver,
      gh: /** @type {any} */ ({
        prDetail: vi.fn(async () => ({ state: 'error', reason: 'unreadable' }))
      }),
      spawn_impl: makeFixtureSpawn({ lines: [] })
    });
    runtime.queueStore.appendAttempt(WS, {
      expected_revision: 0,
      attempt: {
        attempt_id: 'att-root',
        bead_id: 'UI-root',
        repo: WS,
        target_base: 'main',
        base_oid: 'b'.repeat(40),
        runner: 'claude',
        verify_result: {
          pr_url: 'https://github.com/o/r/pull/1',
          pr_number: 1
        }
      }
    });
    runtime.queueStore.moveToPrWait(WS, {
      bead_id: 'UI-root',
      attempt_id: 'att-root',
      patch: { status: 'done' }
    });
    runtime.queueStore.enqueueCompletionIntent(WS, {
      root_bead_id: 'UI-root',
      source_attempt_id: 'att-root',
      target_base: 'main',
      subject: {
        role: 'root',
        bead_id: 'UI-root',
        pr_url: 'https://github.com/o/r/pull/1',
        head_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: null
      }
    });
    runtime.queueStore.setCompletionSubject(WS, {
      root_bead_id: 'UI-root',
      phase: 'merging',
      subject: {
        role: 'root',
        bead_id: 'UI-root',
        pr_url: 'https://github.com/o/r/pull/1',
        head_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: null
      }
    });

    await att.mergeQueue.kick();

    expect(completionActionDriver.onMergeResult).toHaveBeenCalledWith(
      'UI-root',
      'UI-root',
      expect.objectContaining({ ok: false, action: 'refused' })
    );
  });

  test('initWorkerRuntime starts the completion-intent coordinator after recovery', async () => {
    const completionIntent = { start: vi.fn(), stop: vi.fn() };
    const att = createWorkerAttachment(WS, {
      runtime: createWorkerRuntime(),
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      completionIntent,
      spawn_impl: makeFixtureSpawn({ lines: [] })
    });
    __registerWorkerAttachmentForTest(WS, att);

    initWorkerRuntime({ workspaces: [WS] });

    await waitFor(() => completionIntent.start.mock.calls.length === 1);
    expect(completionIntent.start).toHaveBeenCalledTimes(1);
  });

  test('reset stops the completion-intent coordinator', () => {
    const completionIntent = { start: vi.fn(), stop: vi.fn() };
    const att = createWorkerAttachment(WS, {
      runtime: createWorkerRuntime(),
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      completionIntent,
      spawn_impl: makeFixtureSpawn({ lines: [] })
    });
    __registerWorkerAttachmentForTest(WS, att);

    __resetWorkerAttachmentsForTest();

    expect(completionIntent.stop).toHaveBeenCalledTimes(1);
  });

  test('builds a PR poller that stays silent without a subscriber provider', async () => {
    const runtime = createWorkerRuntime();
    const gh = {
      prDetail: vi.fn(),
      openPrForBranch: vi.fn(),
      checkAvailability: vi.fn(async () => ({ state: 'ok', data: true }))
    };
    const att = createWorkerAttachment(WS, {
      runtime,
      gh,
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] })
    });

    await att.prPoller.tick();

    expect(gh.prDetail).not.toHaveBeenCalled();
  });

  test('toggle→tick dispatches via the real runner with the PR-submit preamble injected (fake spawn)', async () => {
    const runtime = createWorkerRuntime();
    const spawn_impl = makeFixtureSpawn({
      file: path.join(FIXTURES, 'claude-success.jsonl')
    });
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: fakeBd({ S1: { runner: 'claude' } }),
      worktree: fakeWorktree,
      verify: okVerify,
      // This test probes the spawn/preamble wiring, not the admission gate.
      admission: { validate: async () => ({ ok: true }) },
      // …nor the base declaration: the temp workspace is not a git repo, so the
      // real resolver would refuse the dispatch before it reaches spawn.
      resolveBase: okBase('main'),
      kvGet: noAccountDefaults,
      spawn_impl
    });
    __registerWorkerAttachmentForTest(WS, att);

    seedQueue(runtime.queueStore, 'S1');
    // tickWorkerQueue is exactly what the worker-queue-toggle handler calls.
    await tickWorkerQueue(WS);

    await waitFor(() => spawn_impl.captured.calls.length > 0);
    const call = spawn_impl.captured.calls[0];
    expect(call.command).toBe('claude');
    // The always-on PR-submit directive reached the SYSTEM channel (UI-rxp3 §2)…
    const system_prompt =
      call.args[call.args.indexOf('--append-system-prompt') + 1];
    expect(system_prompt).toContain('PR 제출까지 수행하고 절대 머지하지 말 것');
    // … the positional argument carries the task and nothing else …
    expect(call.args[call.args.length - 1]).toBe(
      'Bead S1 작업을 계약 네이티브 흐름으로 완료하라.'
    );
    // … and the retired merge-lock protocol did not.
    expect(system_prompt).not.toContain('/api/worker/merge-lock');
    // No per-session worker token is issued any more.
    expect(call.options.env.BDUI_WORKER_TOKEN).toBe(undefined);
  });

  test('tickWorkerQueue is an inert no-op when no attachment is registered', async () => {
    const store = createQueueStore();
    seedQueue(store, 'S1');
    // No registration → no dispatch, no throw (keeps ws-only tests hermetic).
    await expect(tickWorkerQueue(WS)).resolves.toBeUndefined();
  });

  test('stopWorkerAttempt delegates to the registered scheduler.stop', async () => {
    const stop = vi.fn(async () => true);
    __registerWorkerAttachmentForTest(WS, {
      // @ts-expect-error minimal fake attachment
      scheduler: { tick: vi.fn(), stop }
    });
    const result = await stopWorkerAttempt(WS, 'att-9');
    expect(result).toBe(true);
    expect(stop).toHaveBeenCalledWith(path.resolve(WS), 'att-9');
  });

  test('stopWorkerAttempt returns false when no attachment is registered', async () => {
    expect(await stopWorkerAttempt(WS, 'att-9')).toBe(false);
  });

  test('initWorkerRuntime reconciles the attempts a prior run left running', async () => {
    const runtime = createWorkerRuntime();
    seedDetachedAttempt(runtime.queueStore, 'att-1', 'UI-1');
    // Register an attachment whose PID probe sees the recorded PID as dead.
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      probePid: () => ({ alive: false, started_at: null })
    });
    __registerWorkerAttachmentForTest(WS, att);

    runtime.queueStore.setAutoAdvance(WS, true);

    initWorkerRuntime({ workspaces: [WS] });
    await waitFor(
      () => runtime.queueStore.snapshot(WS).attempts['att-1'].status === 'done'
    );

    const snap = runtime.queueStore.snapshot(WS);
    // The server died with the session, but the PR was already open — the
    // startup pass recovers it instead of failing it.
    expect(snap.pr_wait.map((e) => e.bead_id)).toEqual(['UI-1']);
    expect(snap.auto_advance).toBe(true);
  });

  test('recovers durable control before monitor replay and ordinary reconcile', async () => {
    const runtime = createWorkerRuntime();
    seedDetachedAttempt(runtime.queueStore, 'pause-1', 'UI-pause');
    runtime.queueStore.updateAttempt(WS, {
      attempt_id: 'pause-1',
      patch: {
        session_id: 'sid-pause',
        process_identity: { pid: 4242, pgid: 4242, started_at: 1000 }
      }
    });
    runtime.queueStore.requestAttemptControl(WS, {
      attempt_id: 'pause-1',
      kind: 'pause'
    });
    seedDetachedAttempt(runtime.queueStore, 'orphan-1', 'UI-orphan');
    /** @type {string[]} */
    const order = [];
    const sessionMonitors = {
      start: vi.fn(() => {
        order.push('monitor');
        return true;
      }),
      stop: vi.fn(),
      stopAll: vi.fn()
    };
    const processController = {
      capture: vi.fn(),
      terminate: vi.fn(async () => {
        order.push('control');
        return {
          ok: true,
          state: /** @type {const} */ ('gone'),
          forced: false
        };
      }),
      probe: vi.fn(() => ({ state: /** @type {const} */ ('gone') })),
      signal: vi.fn()
    };
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      processController,
      sessionMonitors,
      probePid: () => {
        order.push('reconcile');
        return { alive: true, started_at: 1000 };
      }
    });
    __registerWorkerAttachmentForTest(WS, att);

    initWorkerRuntime({ workspaces: [WS] });
    await waitFor(() => order.includes('reconcile'));

    expect(order.indexOf('control')).toBeLessThan(order.indexOf('monitor'));
    expect(order.indexOf('monitor')).toBeLessThan(order.indexOf('reconcile'));
    expect(runtime.queueStore.snapshot(WS).attempts['pause-1']).toMatchObject({
      status: 'paused',
      control: { phase: 'done' }
    });
  });

  test('recovers discard fences before controls and resumes them after monitor replay', async () => {
    const runtime = createWorkerRuntime();
    seedDetachedAttempt(runtime.queueStore, 'att-1', 'UI-1');
    /** @type {string[]} */
    const order = [];
    const discardCoordinator = {
      recoverFences: vi.fn(() => order.push('discard-fence')),
      recover: vi.fn(async () => order.push('discard-drive'))
    };
    const sessionMonitors = {
      start: vi.fn(() => {
        order.push('monitor');
        return true;
      }),
      stop: vi.fn(),
      stopAll: vi.fn()
    };
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      discardCoordinator,
      sessionMonitors,
      probePid: () => {
        order.push('reconcile');
        return { alive: true, started_at: 1000 };
      }
    });
    vi.spyOn(att.scheduler, 'recoverControls').mockImplementation(async () => {
      order.push('control');
    });
    __registerWorkerAttachmentForTest(WS, att);

    initWorkerRuntime({ workspaces: [WS] });
    await waitFor(() => order.includes('reconcile'));

    expect(order).toEqual([
      'discard-fence',
      'control',
      'monitor',
      'discard-drive',
      'reconcile'
    ]);
  });

  test('initWorkerRuntime replays the session log of a running attempt into the usage store (UI-ediw)', async () => {
    const runtime = createWorkerRuntime();
    seedDetachedAttempt(runtime.queueStore, 'att-1', 'UI-1');
    // The raw stream the PRIOR server persisted before it died.
    writeRunnerLine('att-1', {
      type: 'assistant',
      message: {
        id: 'm1',
        content: [{ type: 'text', text: 'hi' }],
        usage: { input_tokens: 10, output_tokens: 4 }
      }
    });
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      // Alive orphan: reconcile leaves it running, so only the replay writes.
      probePid: () => ({ alive: true, started_at: 1000 })
    });
    __registerWorkerAttachmentForTest(WS, att);

    initWorkerRuntime({ workspaces: [WS] });

    await waitFor(() => runtime.usageStore.get(WS, 'att-1') !== null);
    expect(runtime.usageStore.get(WS, 'att-1')).toMatchObject({
      input_tokens: 10,
      output_tokens: 4,
      replayed: true
    });
    expect(runtime.queueStore.snapshot(WS).attempts['att-1'].status).toBe(
      'running'
    );
  });

  test('initWorkerRuntime reattaches a monitor that continues where the replay stopped (UI-o2yt §3.3)', async () => {
    const runtime = createWorkerRuntime();
    seedDetachedAttempt(runtime.queueStore, 'att-1', 'UI-1');
    writeRunnerLine('att-1', {
      type: 'assistant',
      message: {
        id: 'm1',
        content: [{ type: 'text', text: 'before' }],
        usage: { input_tokens: 10, output_tokens: 4 }
      }
    });
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      probePid: () => ({ alive: true, started_at: 1000 })
    });
    __registerWorkerAttachmentForTest(WS, att);

    initWorkerRuntime({ workspaces: [WS] });
    await waitFor(() => att.sessionMonitors.size() === 1);
    // The orphan keeps writing to the file the previous process could not read.
    /** @type {any[]} */
    const pushed = [];
    runtime.sessionLog.subscribe((a) => pushed.push(a));
    writeRunnerLine('att-1', {
      type: 'assistant',
      message: {
        id: 'm2',
        content: [{ type: 'text', text: 'after' }],
        usage: { input_tokens: 5, output_tokens: 1 }
      }
    });
    att.sessionMonitors.stop(WS, 'att-1');

    // The replay owns the past, the monitor the rest: counted once each.
    expect(runtime.usageStore.get(WS, 'att-1')).toMatchObject({
      input_tokens: 15,
      output_tokens: 5
    });
    expect(pushed).toHaveLength(1);
    expect(pushed[0].event.message.content[0].text).toBe('after');
  });

  test('initWorkerRuntime does not monitor an attempt the scheduler is running', async () => {
    const runtime = createWorkerRuntime();
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({
        file: path.join(FIXTURES, 'claude-success.jsonl')
      }),
      probePid: () => ({ alive: true, started_at: 1000 })
    });
    __registerWorkerAttachmentForTest(WS, att);
    runtime.queueStore.place(WS, {
      expected_revision: runtime.queueStore.snapshot(WS).revision,
      bead_id: 'UI-1'
    });
    runtime.queueStore.setAutoAdvance(WS, true);
    await tickWorkerQueue(WS);

    initWorkerRuntime({ workspaces: [WS] });

    // Its own engine already reads that log; a monitor would double-broadcast.
    expect(att.sessionMonitors.size()).toBe(0);
  });

  test('initWorkerRuntime leaves a live tally alone instead of replaying over it', async () => {
    const runtime = createWorkerRuntime();
    seedDetachedAttempt(runtime.queueStore, 'att-1', 'UI-1');
    writeRunnerLine('att-1', {
      type: 'assistant',
      message: {
        id: 'm1',
        content: [{ type: 'text', text: 'hi' }],
        usage: { input_tokens: 10, output_tokens: 4 }
      }
    });
    // A tally already in the store belongs to a session THIS process streams.
    runtime.usageStore.record(WS, 'att-1', {
      message_id: 'm1',
      input_tokens: 99,
      output_tokens: 1
    });
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      probePid: () => ({ alive: true, started_at: 1000 })
    });
    __registerWorkerAttachmentForTest(WS, att);

    initWorkerRuntime({ workspaces: [WS] });

    expect(runtime.usageStore.get(WS, 'att-1')).toMatchObject({
      input_tokens: 99
    });
    expect(runtime.usageStore.get(WS, 'att-1')?.replayed).toBe(undefined);
  });

  test('the periodic reconcile disposes a dead attempt with no subscribers and auto_advance off', async () => {
    vi.useFakeTimers();
    try {
      const runtime = createWorkerRuntime();
      const att = createWorkerAttachment(WS, {
        runtime,
        bd: fakeBd(),
        worktree: fakeWorktree,
        verify: okVerify,
        spawn_impl: makeFixtureSpawn({ lines: [] }),
        probePid: () => ({ alive: false, started_at: null }),
        getSubscriberCount: () => 0
      });
      __registerWorkerAttachmentForTest(WS, att);

      initWorkerRuntime({ workspaces: [WS], getSubscriberCount: () => 0 });
      await vi.advanceTimersByTimeAsync(0);

      // A detached session that outlived the startup pass and died afterwards:
      // nothing in this process holds its handle, so only the timer sees it.
      seedDetachedAttempt(runtime.queueStore, 'att-late', 'UI-late');
      runtime.queueStore.setAutoAdvance(WS, false);

      await vi.advanceTimersByTimeAsync(RECONCILE_INTERVAL_SECONDS * 1000);

      const snap = runtime.queueStore.snapshot(WS);
      expect(snap.attempts['att-late'].status).toBe('done');
      expect(snap.pr_wait.map((e) => e.bead_id)).toEqual(['UI-late']);
    } finally {
      vi.useRealTimers();
    }
  });

  test('wires the detection layer with the attachment git runner and push record (UI-8mvc §3, UI-1xcd §4)', async () => {
    const PINNED = 'a'.repeat(40);
    const MOVED = 'b'.repeat(40);
    const LANDED = 'c'.repeat(40);
    const runtime = createWorkerRuntime();
    // The two leaves the observation spends now: the attachment's own git
    // runner (the reachability query) and the attempt's own push record. If
    // `createWorkerAttachment` stops handing the runner to the scheduler,
    // nothing below is reached and no `base_drift` is written.
    const gitRun = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'merge-base') {
        // The recorded push IS reachable from the tip the base moved to.
        return { code: args[2] === LANDED ? 0 : 1, stdout: '', stderr: '' };
      }
      return { code: 128, stdout: '', stderr: 'unexpected' };
    });
    // The real prevention-layer artefacts: the hook the attempt installed, and
    // the base-destined push its own pre-push script recorded.
    installGuardHook({
      workspace: path.resolve(WS),
      attempt_id: 'att-1',
      repo: '/repo',
      target_base: 'main'
    });
    fs.appendFileSync(
      guardPushLogPath(path.resolve(WS), 'att-1'),
      `${JSON.stringify({
        local_ref: 'HEAD',
        local_oid: LANDED,
        remote_ref: 'refs/heads/main',
        remote_oid: PINNED
      })}\n`
    );
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      probePid: () => ({ alive: false, started_at: null }),
      resolveBase: okBase('main', MOVED),
      gitRun
    });
    seedDetachedAttempt(runtime.queueStore, 'att-1', 'UI-1');
    runtime.queueStore.updateAttempt(WS, {
      attempt_id: 'att-1',
      patch: { base_oid: PINNED }
    });

    await att.scheduler.reconcile(path.resolve(WS));

    const attempt = runtime.queueStore.snapshot(WS).attempts['att-1'];
    expect(gitRun).toHaveBeenCalledWith(
      ['merge-base', '--is-ancestor', LANDED, MOVED],
      { cwd: '/repo' }
    );
    expect(attempt.base_drift).toEqual({
      pinned: PINNED,
      observed: MOVED,
      landed: true,
      via: 'direct_push',
      pushed: [LANDED],
      shas: [LANDED]
    });
    expect(attempt.cause).toBe('base_landing_detected');
  });
});

describe('worker/attach createLiveBd bd show parsing', () => {
  test('snapshotBead normalizes string labels from the issue', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: {
            id: 'UI-1',
            status: 'open',
            labels: ['worker-ineligible', 3, 'frontend'],
            metadata: {}
          }
        };
      }
      return { code: 0, stdoutJson: [{ id: 'UI-1' }] };
    });
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('main'),
      runJson: asProjected(runJson)
    });

    const snap = await bd.snapshotBead('UI-1');

    expect(snap.labels).toEqual(['worker-ineligible', 'frontend']);
  });

  test('snapshotBead resolves native spec_id and carries a dual-value conflict', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: {
            id: 'UI-1',
            status: 'open',
            spec_id: ' docs/native.md ',
            metadata: {
              route: 'spec_backed',
              spec_id: 'docs/legacy.md',
              spec_review: 'codex@' + 'a'.repeat(40)
            }
          }
        };
      }
      return { code: 0, stdoutJson: [{ id: 'UI-1' }] };
    });
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('main'),
      runJson: asProjected(runJson)
    });

    const snap = await bd.snapshotBead('UI-1');

    expect(snap.spec_id).toBe('docs/native.md');
    expect(snap.spec_id_conflict).toBe(true);
  });

  test('snapshotBead unwraps the single-item-array show shape (live bd) — metadata must not be lost', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: [
            {
              id: 'UI-1',
              status: 'open',
              metadata: {
                route: 'spec_backed',
                spec_id: 'docs/spec.md',
                spec_review: 'codex@' + 'a'.repeat(40),
                plan_path: 42,
                plan_approval: null,
                last_checked_sha: 'malformed'
              }
            }
          ]
        };
      }
      return { code: 0, stdoutJson: [{ id: 'UI-1' }] };
    });
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('main'),
      runJson: asProjected(runJson)
    });
    const snap = await bd.snapshotBead('UI-1');
    expect(snap.route).toBe('spec_backed');
    expect(snap.spec_id).toBe('docs/spec.md');
    expect(snap.spec_review).toBe('codex@' + 'a'.repeat(40));
    expect(snap.plan_path).toBe(42);
    expect(snap.plan_approval).toBeNull();
    expect(snap.last_checked_sha).toBe('malformed');
    expect(snap.ready).toBe(true);
  });

  test('snapshotBead carries the issue title for the start notification', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: [
            { id: 'UI-1', status: 'open', title: '워커 알림', metadata: {} }
          ]
        };
      }
      return { code: 0, stdoutJson: [{ id: 'UI-1' }] };
    });
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('main'),
      runJson: asProjected(runJson)
    });

    const snap = await bd.snapshotBead('UI-1');

    expect(snap.title).toBe('워커 알림');
  });

  test('snapshotBead leaves the title null when the payload carries none', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: [{ id: 'UI-1', status: 'open', metadata: {} }]
        };
      }
      return { code: 0, stdoutJson: [{ id: 'UI-1' }] };
    });
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('main'),
      runJson: asProjected(runJson)
    });

    const snap = await bd.snapshotBead('UI-1');

    expect(snap.title).toBe(null);
  });

  test('snapshotBead extracts every per-step exec metadata key (dotfiles-mqcj)', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: [
            {
              id: 'UI-1',
              status: 'open',
              metadata: {
                orchestration_speed: 'fast',
                spec_review_model: 'codex',
                spec_review_effort: 'high',
                impl_review_model: 'self',
                impl_review_effort: 'low',
                plan_review_model: 'fable',
                plan_review_effort: 'xhigh',
                impl_model: 'luna',
                impl_effort: 'max',
                claude_account: 'user@example.com',
                codex_account: 'account-key'
              }
            }
          ]
        };
      }
      return { code: 0, stdoutJson: [{ id: 'UI-1' }] };
    });
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('main'),
      runJson: asProjected(runJson)
    });
    const snap = await bd.snapshotBead('UI-1');
    expect(snap).toMatchObject({
      orchestration_speed: 'fast',
      spec_review_model: 'codex',
      spec_review_effort: 'high',
      impl_review_model: 'self',
      impl_review_effort: 'low',
      plan_review_model: 'fable',
      plan_review_effort: 'xhigh',
      impl_model: 'luna',
      impl_effort: 'max',
      claude_account: 'user@example.com',
      codex_account: 'account-key'
    });
  });

  test('snapshotBead ignores non-string account pins', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: [
            {
              id: 'UI-1',
              status: 'open',
              metadata: { claude_account: 3, codex_account: false }
            }
          ]
        };
      }
      return { code: 0, stdoutJson: [{ id: 'UI-1' }] };
    });
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('main'),
      runJson: asProjected(runJson)
    });

    const snap = await bd.snapshotBead('UI-1');

    expect(snap.claude_account).toBeUndefined();
    expect(snap.codex_account).toBeUndefined();
  });

  test('snapshotBead no longer reads the retired review_model key', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: [
            {
              id: 'UI-2',
              status: 'open',
              metadata: { review_model: 'opus' }
            }
          ]
        };
      }
      return { code: 0, stdoutJson: [{ id: 'UI-2' }] };
    });
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('main'),
      runJson: asProjected(runJson)
    });
    const snap = await bd.snapshotBead('UI-2');
    expect(/** @type {any} */ (snap).review_model).toBeUndefined();
  });

  test('snapshotBead leaves the per-step exec fields undefined when absent', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: [{ id: 'UI-3', status: 'open', metadata: {} }]
        };
      }
      return { code: 0, stdoutJson: [] };
    });
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('main'),
      runJson: asProjected(runJson)
    });
    const snap = await bd.snapshotBead('UI-3');
    expect(snap.spec_review_model).toBeUndefined();
    expect(snap.spec_review_effort).toBeUndefined();
    expect(snap.impl_review_model).toBeUndefined();
    expect(snap.impl_review_effort).toBeUndefined();
    expect(snap.plan_review_model).toBeUndefined();
    expect(snap.plan_review_effort).toBeUndefined();
    expect(snap.impl_model).toBeUndefined();
    expect(snap.impl_effort).toBeUndefined();
  });

  test('snapshotBead carries the quick_fix self-review judgement inputs', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: [
            {
              id: 'UI-7',
              status: 'open',
              issue_type: 'bug',
              metadata: {
                route: 'quick_fix',
                quick_fix_review: `self@${'a'.repeat(12)}`
              }
            }
          ]
        };
      }
      return { code: 0, stdoutJson: [{ id: 'UI-7' }] };
    });
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('main'),
      runJson: asProjected(runJson)
    });

    const snap = await bd.snapshotBead('UI-7');

    expect(snap.issue_type).toBe('bug');
    expect(snap.quick_fix_review).toBe(`self@${'a'.repeat(12)}`);
  });

  test('snapshotBead leaves both quick_fix judgement inputs undefined when absent', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: [{ id: 'UI-7', status: 'open', metadata: {} }]
        };
      }
      return { code: 0, stdoutJson: [{ id: 'UI-7' }] };
    });
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('main'),
      runJson: asProjected(runJson)
    });

    const snap = await bd.snapshotBead('UI-7');

    expect(snap.issue_type).toBeUndefined();
    expect(snap.quick_fix_review).toBeUndefined();
  });

  test('snapshotBead delivers a malformed quick_fix_review as present-and-invalid', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: [
            {
              id: 'UI-7',
              status: 'open',
              issue_type: 42,
              metadata: { route: 'quick_fix', quick_fix_review: 42 }
            }
          ]
        };
      }
      return { code: 0, stdoutJson: [{ id: 'UI-7' }] };
    });
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('main'),
      runJson: asProjected(runJson)
    });

    const snap = await bd.snapshotBead('UI-7');

    expect(snap.quick_fix_review).toBe(42);
    expect(snap.issue_type).toBe(42);
  });

  test('snapshotBead keeps reading the bare-object show shape', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: {
            id: 'UI-2',
            status: 'open',
            metadata: { route: 'full_plan' }
          }
        };
      }
      return { code: 0, stdoutJson: [] };
    });
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('main'),
      runJson: asProjected(runJson)
    });
    const snap = await bd.snapshotBead('UI-2');
    expect(snap.route).toBe('full_plan');
    expect(snap.blocked).toBe(true);
  });

  test('snapshotBead ignores a bead target_base and uses the repo declaration', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: [
            {
              id: 'UI-3',
              status: 'open',
              metadata: { target_base: 'bead/base' }
            }
          ]
        };
      }
      return { code: 0, stdoutJson: [] };
    });
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('ilsun/dev'),
      runJson: asProjected(runJson)
    });

    const snap = await bd.snapshotBead('UI-3');

    expect(snap.target_base).toBe('ilsun/dev');
  });

  test('snapshotBead carries the resolved base_oid for the cut and the pin', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: [{ id: 'UI-4', status: 'open', metadata: {} }]
        };
      }
      return { code: 0, stdoutJson: [] };
    });
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('ilsun/dev', 'c'.repeat(40)),
      runJson: asProjected(runJson)
    });

    const snap = await bd.snapshotBead('UI-4');

    expect(snap.base_oid).toBe('c'.repeat(40));
    expect(snap.base_unresolved).toBe(null);
  });

  test('snapshotBead reports an unresolved base instead of throwing', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: [{ id: 'UI-5', status: 'open', metadata: {} }]
        };
      }
      return { code: 0, stdoutJson: [] };
    });
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: failBase('ref'),
      runJson: asProjected(runJson)
    });

    const snap = await bd.snapshotBead('UI-5');

    expect(snap.target_base).toBe('');
    expect(snap.base_unresolved).toBe('base_unresolved:ref');
  });

  test('snapshotBead re-reads the declaration on every snapshot', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: [{ id: 'UI-6', status: 'open', metadata: {} }]
        };
      }
      return { code: 0, stdoutJson: [] };
    });
    let calls = 0;
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: async () => {
        calls += 1;
        return {
          ok: /** @type {const} */ (true),
          base: calls === 1 ? 'main' : 'ilsun/dev',
          declared: calls !== 1,
          remote: 'origin',
          remote_ref: 'refs/remotes/origin/x',
          base_oid: 'd'.repeat(40),
          local_only: false
        };
      },
      runJson: asProjected(runJson)
    });

    const first = await bd.snapshotBead('UI-6');
    const second = await bd.snapshotBead('UI-6');

    expect([first.target_base, second.target_base]).toEqual([
      'main',
      'ilsun/dev'
    ]);
  });
});

describe('worker/attach target base resolution wiring (worker-base-scope-alignment §1)', () => {
  /**
   * @param {Record<string, any>} [options]
   */
  function attach(options = {}) {
    return createWorkerAttachment(WS, {
      runtime: createWorkerRuntime(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      ...options
    });
  }

  test('reads the target repo declaration rather than the global config', async () => {
    const declaration = path.join(WS, 'docs', 'agents', 'repo-ops.toml');
    fs.mkdirSync(path.dirname(declaration), { recursive: true });
    fs.writeFileSync(declaration, 'base = "ilsun/dev"\n');
    const file_path = path.join(tmp_state, 'config.toml');
    fs.writeFileSync(file_path, '[worker.target_base]\n"/other" = "nope"\n');
    process.env.BDUI_CONFIG_PATH = file_path;
    const att = attach({
      bd: fakeBd(),
      gitRun: async (/** @type {string[]} */ args) => {
        if (args[0] === 'remote') {
          return { code: 0, stdout: 'origin\n', stderr: '' };
        }
        if (args[0] === 'config') {
          return { code: 1, stdout: '', stderr: '' };
        }
        if (args[0] === 'rev-parse') {
          return { code: 0, stdout: 'e'.repeat(40), stderr: '' };
        }
        return { code: 0, stdout: '', stderr: '' };
      }
    });

    const resolved = await att.resolveBase();

    expect(resolved).toMatchObject({ ok: true, base: 'ilsun/dev' });
  });

  test('memoizes the scan resolution but re-resolves on force', async () => {
    let calls = 0;
    const att = attach({
      bd: fakeBd(),
      gitRun: async (/** @type {string[]} */ args) => {
        if (args[0] === 'fetch') {
          calls += 1;
        }
        if (args[0] === 'remote') {
          return { code: 0, stdout: 'origin\n', stearr: '', stderr: '' };
        }
        if (args[0] === 'config') {
          return { code: 1, stdout: '', stderr: '' };
        }
        if (args[0] === 'rev-parse') {
          return { code: 0, stdout: 'f'.repeat(40), stderr: '' };
        }
        return { code: 0, stdout: '', stderr: '' };
      }
    });

    await att.resolveBase();
    await att.resolveBase();
    await att.resolveBase({ force: true });

    expect(calls).toBe(2);
  });

  test('shares one in-flight resolution across concurrent force calls', async () => {
    let fetch_calls = 0;
    let releaseFetch = () => {};
    const fetch_gate = new Promise((resolve) => {
      releaseFetch = () => resolve(undefined);
    });
    const att = attach({
      bd: fakeBd(),
      gitRun: async (/** @type {string[]} */ args) => {
        if (args[0] === 'fetch') {
          fetch_calls += 1;
          await fetch_gate;
        }
        if (args[0] === 'remote') {
          return { code: 0, stdout: 'origin\n', stderr: '' };
        }
        if (args[0] === 'config') {
          return { code: 1, stdout: '', stderr: '' };
        }
        if (args[0] === 'rev-parse') {
          return { code: 0, stdout: 'f'.repeat(40), stderr: '' };
        }
        return { code: 0, stdout: '', stderr: '' };
      }
    });

    const first = att.resolveBase({ force: true });
    const second = att.resolveBase({ force: true });
    releaseFetch();
    const results = await Promise.all([first, second]);

    expect(fetch_calls).toBe(1);
    expect(results[0]).toBe(results[1]);
  });

  test('clears a failed in-flight resolution so a later force call retries', async () => {
    let fetch_calls = 0;
    const att = attach({
      bd: fakeBd(),
      gitRun: async (/** @type {string[]} */ args) => {
        if (args[0] === 'fetch') {
          fetch_calls += 1;
          return {
            code: fetch_calls <= 3 ? 128 : 0,
            stdout: '',
            stderr: 'network unreachable'
          };
        }
        if (args[0] === 'remote') {
          return { code: 0, stdout: 'origin\n', stderr: '' };
        }
        if (args[0] === 'config') {
          return { code: 1, stdout: '', stderr: '' };
        }
        if (args[0] === 'rev-parse') {
          return { code: 0, stdout: 'f'.repeat(40), stderr: '' };
        }
        return { code: 0, stdout: '', stderr: '' };
      }
    });

    const first = await att.resolveBase({ force: true });
    const second = await att.resolveBase({ force: true });

    expect(first).toMatchObject({ ok: false, step: 'fetch' });
    expect(second).toMatchObject({ ok: true });
    expect(fetch_calls).toBe(4);
  });

  test('resolves different repositories independently while one fetch is in flight', async () => {
    const other_workspace = path.join(tmp_state, 'other-workspace');
    let release_first = () => {};
    const first_gate = new Promise((resolve) => {
      release_first = () => resolve(undefined);
    });
    /** @type {string[]} */
    const fetched = [];
    const gitRun = async (
      /** @type {string[]} */ args,
      /** @type {any} */ options
    ) => {
      if (args[0] === 'fetch') {
        fetched.push(String(options?.cwd));
        if (options?.cwd === WS) {
          await first_gate;
        }
      }
      if (args[0] === 'remote') {
        return { code: 0, stdout: 'origin\n', stderr: '' };
      }
      if (args[0] === 'config') {
        return { code: 1, stdout: '', stderr: '' };
      }
      if (args[0] === 'rev-parse') {
        return { code: 0, stdout: 'f'.repeat(40), stderr: '' };
      }
      return { code: 0, stdout: '', stderr: '' };
    };
    const first = attach({ bd: fakeBd(), gitRun });
    const second = createWorkerAttachment(other_workspace, {
      runtime: createWorkerRuntime(),
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      gitRun
    });

    const blocked = first.resolveBase({ force: true });
    const independent = second.resolveBase({ force: true });
    await expect(independent).resolves.toMatchObject({ ok: true });
    expect(fetched).toContain(other_workspace);
    release_first();
    await expect(blocked).resolves.toMatchObject({ ok: true });
  });

  test('refuses admission with the failing step when the base is unresolved', async () => {
    const att = attach({
      bd: fakeBd(),
      gh: { checkAvailability: async () => ({ state: 'ok' }) }
    });

    const result = await att.admission.validate(
      /** @type {any} */ ({
        repo: '/repo',
        target_base: '',
        base_oid: null,
        base_unresolved: 'base_unresolved:format',
        route: 'full_plan',
        spec_id: 'docs/spec.md',
        spec_review: `codex@${'a'.repeat(40)}`
      })
    );

    expect(result).toEqual({ ok: false, reason: 'base_unresolved:format' });
  });

  test('asks git about the fetched remote tip, not the branch name', async () => {
    /** @type {string[][]} */
    const git_calls = [];
    const att = attach({
      bd: fakeBd(),
      gh: { checkAvailability: async () => ({ state: 'ok' }) },
      gitRun: async (/** @type {string[]} */ args) => {
        git_calls.push(args);
        return { code: 0, stdout: '', stderr: '' };
      }
    });

    await att.admission.validate(
      /** @type {any} */ ({
        repo: '/repo',
        target_base: 'ilsun/dev',
        base_oid: 'a'.repeat(40),
        base_unresolved: null,
        route: 'full_plan',
        spec_id: 'docs/spec.md',
        spec_review: `codex@${'b'.repeat(40)}`
      })
    );

    expect(git_calls[0]).toEqual([
      'rev-parse',
      '--verify',
      '--quiet',
      `${'a'.repeat(40)}^{commit}`
    ]);
  });

  test('passes plan and cursor snapshot fields into admission', async () => {
    const spec_sha = 'b'.repeat(40);
    const plan_sha = 'c'.repeat(40);
    const cursor_sha = 'd'.repeat(40);
    /** @type {string[][]} */
    const git_calls = [];
    const att = attach({
      bd: fakeBd(),
      gh: { checkAvailability: async () => ({ state: 'ok' }) },
      gitRun: async (/** @type {string[]} */ args) => {
        git_calls.push(args);
        return {
          code: 0,
          stdout:
            args[0] === 'show' ? '---\nscope:\n  - server/worker/\n---\n' : '',
          stderr: ''
        };
      }
    });

    const result = await att.admission.validate(
      /** @type {any} */ ({
        repo: '/repo',
        target_base: 'main',
        base_oid: 'a'.repeat(40),
        base_unresolved: null,
        route: 'full_plan',
        spec_id: 'docs/spec.md',
        spec_review: `codex@${spec_sha}`,
        plan_path: 'docs/plan.md',
        plan_approval: `user@${plan_sha}`,
        last_checked_sha: cursor_sha
      })
    );

    expect(result).toEqual({ ok: true });
    expect(git_calls).toContainEqual([
      'rev-parse',
      '--verify',
      '--quiet',
      `${plan_sha}^{commit}`
    ]);
    expect(git_calls).toContainEqual([
      'rev-parse',
      '--verify',
      '--quiet',
      `${cursor_sha}^{commit}`
    ]);
    expect(git_calls).toContainEqual([
      'cat-file',
      '-e',
      `${'a'.repeat(40)}:docs/plan.md`
    ]);
    expect(
      git_calls.filter((args) => args[0] === '--literal-pathspecs')
    ).toEqual([
      [
        '--literal-pathspecs',
        'log',
        '--format=%H',
        '--name-only',
        `${cursor_sha}..${'a'.repeat(40)}`,
        '--',
        'docs/spec.md'
      ],
      [
        '--literal-pathspecs',
        'log',
        '--format=%H',
        '--name-only',
        `${cursor_sha}..${'a'.repeat(40)}`,
        '--',
        'docs/plan.md',
        'server/worker/'
      ]
    ]);
  });
});

describe('worker/attach createLiveBd fail-visible snapshots', () => {
  /**
   * @param {Record<string, any>} by_command - Keyed by the bd subcommand.
   */
  function runnerFor(by_command) {
    return vi.fn(async (/** @type {string[]} */ args) => by_command[args[0]]);
  }

  /**
   * @param {(args: string[], options?: any) => Promise<any>} runJson
   */
  function bdWith(runJson) {
    return createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('main'),
      runJson: asProjected(runJson)
    });
  }

  test('throws when bd show exits non-zero', async () => {
    const runJson = runnerFor({
      show: { code: 1, stderr: 'bd down' },
      ready: { code: 0, stdoutJson: [] }
    });

    await expect(bdWith(runJson).snapshotBead('UI-1')).rejects.toThrow(
      /bd show UI-1 failed \(bd_exit_error\)/
    );
  });

  test('throws when bd show returns an unreadable payload', async () => {
    const runJson = runnerFor({
      show: { code: 0, stdoutJson: 'nonsense' },
      ready: { code: 0, stdoutJson: [] }
    });

    await expect(bdWith(runJson).snapshotBead('UI-1')).rejects.toThrow(
      /bd show UI-1 failed \(bd_json_shape_invalid\)/
    );
  });

  test('throws when bd ready exits non-zero instead of reading as not-ready', async () => {
    const runJson = runnerFor({
      show: { code: 0, stdoutJson: [{ id: 'UI-1', status: 'open' }] },
      ready: { code: 1, stderr: 'bd down' }
    });

    // A bd outage must reach the scheduler as `bd_snapshot_failed`, never as a
    // bead that merely is not in the ready list.
    await expect(bdWith(runJson).snapshotBead('UI-1')).rejects.toThrow(
      /bd ready failed \(bd_exit_error\)/
    );
  });

  test('throws when bd ready returns an unreadable payload', async () => {
    const runJson = runnerFor({
      show: { code: 0, stdoutJson: [{ id: 'UI-1', status: 'open' }] },
      ready: { code: 0, stderr: 'Invalid JSON from bd' }
    });

    await expect(bdWith(runJson).snapshotBead('UI-1')).rejects.toThrow(
      /bd ready failed \(bd_json_shape_invalid\)/
    );
  });

  test('throws when bd ready returns an object with no row list', async () => {
    const runJson = runnerFor({
      show: { code: 0, stdoutJson: [{ id: 'UI-1', status: 'open' }] },
      ready: { code: 0, stdoutJson: { ready: 'not-an-array' } }
    });

    // An unknown shape read as an empty ready set would report a bd fault as a
    // queue full of not-ready beads.
    await expect(bdWith(runJson).snapshotBead('UI-1')).rejects.toThrow(
      /bd ready failed \(bd_json_shape_invalid\)/
    );
  });

  test('reads an empty ready array as nothing runnable', async () => {
    const runJson = runnerFor({
      show: { code: 0, stdoutJson: [{ id: 'UI-1', status: 'open' }] },
      ready: { code: 0, stdoutJson: [] }
    });

    const snap = await bdWith(runJson).snapshotBead('UI-1');

    expect(snap.ready).toBe(false);
  });
});

describe('worker/attach external scan excludes worker-owned beads (UI-b8n8)', () => {
  const PR_URL = 'https://github.com/o/r/pull/9';

  /**
   * @param {any} runtime
   * @param {string[]} bead_ids
   */
  function attachScanning(runtime, bead_ids) {
    return createWorkerAttachment(WS, {
      runtime,
      bd: {
        ...fakeBd(),
        scanBeads: async () => ({
          pr_rows: bead_ids.map((bead_id) => ({ bead_id, pr_url: PR_URL })),
          statuses: Object.fromEntries(bead_ids.map((id) => [id, 'resolved']))
        })
      },
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] })
    });
  }

  /**
   * Record a live (non-terminal) attempt — the durable shape a session in PR
   * Delivery leaves behind while it is still running.
   *
   * @param {any} store
   * @param {string} bead_id
   * @param {string} status
   */
  function seedAttempt(store, bead_id, status) {
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id: `att-${bead_id}`, bead_id }
    });
    store.updateAttempt(WS, {
      attempt_id: `att-${bead_id}`,
      patch: { status, repo: '/repo' }
    });
  }

  test('skips a bead whose attempt is still live', async () => {
    const runtime = createWorkerRuntime();
    const att = attachScanning(runtime, ['S1']);
    seedAttempt(runtime.queueStore, 'S1', 'running');

    await att.refreshExternalPrs();

    expect(runtime.externalPrs.list(WS)).toEqual([]);
  });

  test('registers the bead once its attempt is terminal', async () => {
    const runtime = createWorkerRuntime();
    const att = attachScanning(runtime, ['S1']);
    seedAttempt(runtime.queueStore, 'S1', 'done');

    await att.refreshExternalPrs();

    expect(runtime.externalPrs.list(WS).map((r) => r.bead_id)).toEqual(['S1']);
  });

  test('keeps registering the beads the worker does not own', async () => {
    const runtime = createWorkerRuntime();
    const att = attachScanning(runtime, ['S1', 'X1']);
    seedAttempt(runtime.queueStore, 'S1', 'running');

    await att.refreshExternalPrs();

    expect(runtime.externalPrs.list(WS).map((r) => r.bead_id)).toEqual(['X1']);
  });

  test('keeps the previous rows when the protection set cannot be read', async () => {
    const runtime = createWorkerRuntime();
    const att = attachScanning(runtime, ['X1']);
    await att.refreshExternalPrs();
    expect(runtime.externalPrs.list(WS).map((r) => r.bead_id)).toEqual(['X1']);
    vi.spyOn(att.scheduler, 'externalProtectedBeadIds').mockImplementation(
      () => {
        throw new Error('snapshot unreadable');
      }
    );

    await att.refreshExternalPrs();

    // Fail-closed: registering the whole scan is the unsafe side, so the stale
    // rows stay for one pass rather than being replaced blind.
    expect(runtime.externalPrs.list(WS).map((r) => r.bead_id)).toEqual(['X1']);
  });

  test('still sweeps the closed queue when the protection set is unreadable', async () => {
    const runtime = createWorkerRuntime();
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: {
        ...fakeBd(),
        scanBeads: async () => ({ pr_rows: [], statuses: { S1: 'closed' } })
      },
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] })
    });
    seedQueue(runtime.queueStore, 'S1');
    vi.spyOn(att.scheduler, 'externalProtectedBeadIds').mockImplementation(
      () => {
        throw new Error('snapshot unreadable');
      }
    );

    await att.refreshExternalPrs();

    // The sweep reads the caller's own `statuses`; it does not depend on the
    // registry the exclusion guards.
    expect(runtime.queueStore.snapshot(WS).done.map((e) => e.bead_id)).toEqual([
      'S1'
    ]);
  });
});

describe('worker/attach closed-queue sweep trigger (UI-m6bg)', () => {
  /**
   * An attachment whose only bd surface is the whole-list scan the poller pass
   * already makes — the seam the sweep rides.
   *
   * @param {any} runtime
   * @param {() => Promise<any>} scanBeads
   */
  function attachWithScan(runtime, scanBeads) {
    return createWorkerAttachment(WS, {
      runtime,
      bd: { ...fakeBd(), scanBeads },
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] })
    });
  }

  test('one scan moves a closed queue row into the done lane', async () => {
    const runtime = createWorkerRuntime();
    const scanBeads = vi.fn(async () => ({
      pr_rows: [],
      statuses: { S1: 'closed' }
    }));
    const att = attachWithScan(runtime, scanBeads);
    seedQueue(runtime.queueStore, 'S1');

    await att.refreshExternalPrs();

    const snap = runtime.queueStore.snapshot(WS);
    expect(snap.queue.map((e) => e.bead_id)).toEqual([]);
    expect(snap.done.map((e) => e.bead_id)).toEqual(['S1']);
    expect(scanBeads).toHaveBeenCalledTimes(1);
  });

  test('cleans up with auto_advance off, where no tick pass ever runs', async () => {
    const runtime = createWorkerRuntime();
    const att = attachWithScan(runtime, async () => ({
      pr_rows: [],
      statuses: { S1: 'closed' }
    }));
    seedQueue(runtime.queueStore, 'S1');
    runtime.queueStore.setAutoAdvance(WS, false);
    await tickWorkerQueue(WS);
    expect(runtime.queueStore.snapshot(WS).queue.map((e) => e.bead_id)).toEqual(
      ['S1']
    );

    await att.refreshExternalPrs();

    expect(runtime.queueStore.snapshot(WS).done.map((e) => e.bead_id)).toEqual([
      'S1'
    ]);
  });

  test('spends no bd process per queued bead — the scan IS the read', async () => {
    const runtime = createWorkerRuntime();
    const scanBeads = vi.fn(async () => ({
      pr_rows: [],
      statuses: { S1: 'closed', S2: 'closed', S3: 'closed' }
    }));
    const att = attachWithScan(runtime, scanBeads);
    for (const id of ['S1', 'S2', 'S3']) {
      seedQueue(runtime.queueStore, id);
    }

    await att.refreshExternalPrs();

    expect(scanBeads).toHaveBeenCalledTimes(1);
    expect(runtime.queueStore.snapshot(WS).done.map((e) => e.bead_id)).toEqual([
      'S1',
      'S2',
      'S3'
    ]);
  });

  test('a failed scan mutates nothing', async () => {
    const runtime = createWorkerRuntime();
    const att = attachWithScan(runtime, async () => {
      throw new Error('bd down');
    });
    seedQueue(runtime.queueStore, 'S1');
    const revision = runtime.queueStore.snapshot(WS).revision;

    await expect(att.refreshExternalPrs()).rejects.toThrow(/bd down/);

    expect(runtime.queueStore.snapshot(WS).revision).toBe(revision);
    expect(runtime.queueStore.snapshot(WS).queue.map((e) => e.bead_id)).toEqual(
      ['S1']
    );
  });

  test('does not apply statuses from a generation fenced by a newer mutation', async () => {
    const runtime = createWorkerRuntime();
    const att = attachWithScan(runtime, async () => ({
      generation: 3,
      fresh: false,
      pr_rows: [],
      statuses: { S1: 'closed' }
    }));
    seedQueue(runtime.queueStore, 'S1');

    await att.refreshExternalPrs();

    expect(runtime.queueStore.snapshot(WS).queue.map((e) => e.bead_id)).toEqual(
      ['S1']
    );
    expect(runtime.queueStore.snapshot(WS).done).toEqual([]);
  });

  test('registers an external row for a bead the worker never ran', async () => {
    const runtime = createWorkerRuntime();
    const att = attachWithScan(runtime, async () => ({
      pr_rows: [{ bead_id: 'X1', pr_url: 'https://github.com/o/r/pull/9' }],
      statuses: { X1: 'resolved' }
    }));

    await att.refreshExternalPrs();

    expect(runtime.externalPrs.list(WS).map((r) => r.bead_id)).toEqual(['X1']);
  });

  test('an older scan settling last never applies its stale status', async () => {
    const runtime = createWorkerRuntime();
    /** @type {((value: any) => void)[]} */
    const gate = [];
    const att = attachWithScan(
      runtime,
      () =>
        new Promise((resolve) => {
          gate.push(resolve);
        })
    );
    seedQueue(runtime.queueStore, 'S1');

    const stale = att.refreshExternalPrs();
    const fresh = att.refreshExternalPrs();
    await waitFor(() => gate.length === 2);
    // Newest first: the reopened reading wins and the older `closed` one, which
    // settles after it, must not move the row.
    gate[1]({ pr_rows: [], statuses: { S1: 'open' } });
    await fresh;
    gate[0]({ pr_rows: [], statuses: { S1: 'closed' } });
    await stale;

    const snap = runtime.queueStore.snapshot(WS);
    expect(snap.queue.map((e) => e.bead_id)).toEqual(['S1']);
    expect(snap.done).toEqual([]);
  });
});

describe('worker/attach external registry wiring (UI-wwby)', () => {
  const PR_URL = 'https://github.com/o/r/pull/9';

  /**
   * A real attachment whose bd scan registers ONE external row — so the driver
   * and the cleanup both see the registry `attach.js` actually wired, not a
   * stub the test handed them.
   *
   * @param {any} runtime
   * @param {string} bead_id
   */
  function attachWithExternalRow(runtime, bead_id) {
    return createWorkerAttachment(WS, {
      runtime,
      bd: {
        ...fakeBd(),
        scanBeads: async () => ({
          pr_rows: [{ bead_id, pr_url: PR_URL }],
          statuses: { [bead_id]: 'resolved' }
        })
      },
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      gh: /** @type {any} */ ({
        checkAvailability: async () => ({ state: 'ok', data: true })
      })
    });
  }

  test('gives the merge driver a repo-backed base containment probe', async () => {
    const runtime = createWorkerRuntime();
    merge_queue_capture.deps = null;

    attachWithExternalRow(runtime, 'X1');

    // 연결을 빠뜨리면 모든 재충돌이 세션 라운드로 과금된다(UI-p49g §4.1).
    expect(typeof merge_queue_capture.deps.baseContained).toBe('function');
  });

  test('gives the merge driver a registry-backed isExternalRow', async () => {
    const runtime = createWorkerRuntime();
    const att = attachWithExternalRow(runtime, 'X1');
    runtime.queueStore.enqueueMerge(WS, {
      expected_revision: runtime.queueStore.snapshot(WS).revision,
      entries: [{ bead_id: 'X1', external: true }]
    });

    // The merge refuses (no real PR behind the fakes) and no observation exists,
    // so the head SHA is unreadable — the branch `isExternalRow` decides.
    await att.mergeQueue.kick();

    // HALTED, not dequeued: the poller does observe a live registry row, so the
    // halt has an end. Drop the dep in `attach.js` and this becomes a dequeue.
    expect(
      runtime.queueStore
        .snapshot(WS)
        .merge_queue.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual(['X1']);
  });

  test('dequeues instead once the registry row is gone', async () => {
    const runtime = createWorkerRuntime();
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: {
        ...fakeBd(),
        scanBeads: async () => ({ pr_rows: [], statuses: {} })
      },
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      gh: /** @type {any} */ ({
        checkAvailability: async () => ({ state: 'ok', data: true })
      })
    });
    runtime.queueStore.enqueueMerge(WS, {
      expected_revision: runtime.queueStore.snapshot(WS).revision,
      entries: [{ bead_id: 'X1', external: true }]
    });

    await att.mergeQueue.kick();

    // Nothing observes it, so halting would be permanent — the head leaves.
    expect(runtime.queueStore.snapshot(WS).merge_queue).toEqual([]);
  });

  test('gives the PR actions a registry-backed drop', async () => {
    const runtime = createWorkerRuntime();
    /** @type {Record<string, string>} */
    const bd_status = { X1: 'resolved' };
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: {
        ...fakeBd(),
        scanBeads: async () => ({
          pr_rows: [{ bead_id: 'X1', pr_url: PR_URL }],
          statuses: { X1: 'resolved' }
        }),
        listChildren: async () => [],
        setStatus: async (
          /** @type {string} */ id,
          /** @type {string} */ status
        ) => {
          bd_status[id] = status;
        },
        readStatus: async (/** @type {string} */ id) => bd_status[id],
        readIssue: async (/** @type {string} */ id) => ({
          id,
          labels: [],
          metadata: { pr_url: PR_URL }
        })
      },
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      gitRun: async (/** @type {string[]} */ args) => {
        if (args[0] === 'show' && args[1]?.endsWith(':repo-ops/config.toml')) {
          return { code: 128, stdout: '', stderr: 'missing' };
        }
        return {
          code: 0,
          stdout:
            args.join(' ') === 'remote get-url origin'
              ? 'git@example.test:o/r.git\n'
              : args[0] === 'rev-parse'
                ? `${'b'.repeat(40)}\n`
                : '',
          stderr: ''
        };
      },
      resolveBase: okBase('main', 'b'.repeat(40)),
      gh: /** @type {any} */ ({
        checkAvailability: async () => ({ state: 'ok', data: true })
      })
    });
    // The incident's own state: a bead the worker really owns in `pr_wait`,
    // whose registry row the last scan also produced.
    runtime.queueStore.appendAttempt(WS, {
      expected_revision: runtime.queueStore.snapshot(WS).revision,
      attempt: { attempt_id: 'att-X1', bead_id: 'X1' }
    });
    runtime.queueStore.moveToPrWait(WS, {
      bead_id: 'X1',
      attempt_id: 'att-X1',
      patch: { status: 'done', finished_at: 1, repo: '/repo' }
    });
    await att.refreshExternalPrs();
    expect(runtime.externalPrs.list(WS).map((r) => r.bead_id)).toEqual(['X1']);

    // The whole cleanup, through the attachment's own `prActions` — nothing
    // about the registry is stubbed, so a missing `drop` in `attach.js` leaves
    // the row behind for the next enroller pass to trip over.
    const r = await att.prActions.cleanupObservedMerge('X1', 'a'.repeat(40));

    expect(r).toMatchObject({ ok: true, reason: null });
    expect(runtime.externalPrs.list(WS)).toEqual([]);
  });
});

describe('worker/attach base-update result wiring (UI-vzyh §2)', () => {
  test('passes no vouched mutation for a base update', async () => {
    const original_head = 'a'.repeat(40);
    const result_head = 'b'.repeat(40);
    const raced_head = 'c'.repeat(40);
    const base_sha = 'd'.repeat(40);
    const runtime = createWorkerRuntime();
    const prDetail = vi
      .fn()
      .mockResolvedValueOnce({
        state: 'ok',
        data: {
          number: 304,
          url: 'https://github.com/o/r/pull/304',
          state: 'OPEN',
          mergeable: 'MERGEABLE',
          merge_state_status: 'BEHIND',
          head_ref: 'UI-1',
          head_sha: original_head,
          base_ref: 'main',
          merged_sha: null
        }
      })
      .mockResolvedValue({
        state: 'ok',
        data: {
          number: 304,
          url: 'https://github.com/o/r/pull/304',
          state: 'OPEN',
          mergeable: 'MERGEABLE',
          merge_state_status: 'CLEAN',
          head_ref: 'UI-1',
          head_sha: raced_head,
          base_ref: 'main',
          merged_sha: null
        }
      });
    const updateBranch = vi.fn(async () => ({
      state: 'ok',
      data: result_head
    }));
    const ensureApproved = vi.fn(async () => ({
      state: /** @type {const} */ ('failed'),
      reason: 'external_review_required'
    }));
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: {
        ...fakeBd(),
        readIssue: async () => ({
          id: 'UI-1',
          metadata: { route: 'quick_fix' }
        })
      },
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      resolveBase: okBase('main', base_sha),
      gitRun: async (/** @type {string[]} */ args) =>
        args[0] === 'show' && args[1]?.endsWith(':repo-ops/config.toml')
          ? { code: 128, stdout: '', stderr: 'missing' }
          : { code: 0, stdout: '', stderr: '' },
      gh: /** @type {any} */ ({
        checkAvailability: async () => ({ state: 'ok', data: true }),
        prDetail,
        updateBranch,
        mergeSquash: vi.fn(),
        closePr: vi.fn()
      }),
      headReview: {
        captureStartingApproval: async () => ({
          actor: 'codex',
          head_sha: original_head,
          raw: `codex@${original_head}`
        }),
        ensureApproved
      }
    });
    runtime.queueStore.appendAttempt(WS, {
      expected_revision: runtime.queueStore.snapshot(WS).revision,
      attempt: {
        attempt_id: 'att-UI-1',
        bead_id: 'UI-1',
        repo: WS,
        target_base: 'main',
        base_oid: base_sha,
        runner: 'codex',
        verify_result: {
          pr_url: 'https://github.com/o/r/pull/304',
          pr_number: 304
        }
      }
    });
    runtime.queueStore.moveToPrWait(WS, {
      bead_id: 'UI-1',
      attempt_id: 'att-UI-1',
      patch: { status: 'done', finished_at: 1 }
    });
    runtime.queueStore.enqueueMergeManual(WS, {
      expected_revision: runtime.queueStore.snapshot(WS).revision,
      entries: [
        {
          bead_id: 'UI-1',
          head_sha: original_head,
          target_base: 'main'
        }
      ]
    });

    await att.mergeQueue.kick();

    expect(updateBranch).toHaveBeenCalledWith(WS, 304);
    // The retired carry stamp was the only consumer of the mutation result SHA
    // (UI-vzyh §2): ancestry keeps the receipt current across the moved head,
    // so head review sees the raced observation unvouched and reviews it.
    expect(ensureApproved).toHaveBeenCalledWith(
      'UI-1',
      'UI-1',
      expect.objectContaining({
        head_sha: raced_head,
        mutation: null,
        mutation_result_sha: null
      })
    );
    expect(runtime.queueStore.snapshot(WS).merge_queue).toHaveLength(1);
  });
});

describe('worker/attach — legacy state migration (master spec §11)', () => {
  test('reconciles repo operations before migration, cleanup resume, and poller start', async () => {
    /** @type {string[]} */
    const order = [];
    const [att] = initWorkerRuntime({
      workspaces: [WS],
      getSubscriberCount: () => 1
    });
    att.scheduler.recoverControls = vi.fn(async () => {});
    att.scheduler.reconcile = vi.fn(async () => {});
    att.discardCoordinator.recover = vi.fn(async () => {});
    att.repoOperationCoordinator.reconcile = vi.fn(async () => {
      order.push('reconcile');
    });
    att.repoOperationCoordinator.refreshDisplay = /** @type {any} */ (
      vi.fn(async () => {})
    );
    att.resolveBase = okBase('main');
    att.repoOperationMigration.run = vi.fn(async () => {
      order.push('migration');
      return { ok: true };
    });
    att.prActions.resumeRepoOperations = vi.fn(async () => {
      order.push('resume');
      return [];
    });
    att.prPoller.start = vi.fn(() => {
      order.push('poller');
    });
    att.reconciler.start = vi.fn();
    att.mergeQueue.start = vi.fn();
    att.autoMerge.start = vi.fn();
    att.completionIntent.start = vi.fn();

    await waitFor(() => order.includes('poller'));

    expect(order).toEqual(['reconcile', 'migration', 'resume', 'poller']);
  });

  test('runs the one-shot migration before the cleanup lane resumes', async () => {
    /** @type {string[]} */
    const order = [];
    const att = createWorkerAttachment(WS, {
      runtime: createWorkerRuntime(),
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      repoOperationMigration: {
        run: vi.fn(async () => {
          order.push('migration');
          return { ok: true };
        })
      }
    });
    att.prActions.resumeRepoOperations = vi.fn(async () => {
      order.push('resume');
      return [];
    });
    __registerWorkerAttachmentForTest(WS, att);

    initWorkerRuntime({ workspaces: [WS] });

    await waitFor(() => order.length === 2);
    expect(order).toEqual(['migration', 'resume']);
  });

  test('resumes the cleanup lane even when the migration throws', async () => {
    const resumeRepoOperations = vi.fn(async () => []);
    const att = createWorkerAttachment(WS, {
      runtime: createWorkerRuntime(),
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      repoOperationMigration: {
        run: vi.fn(async () => {
          throw new Error('migration exploded');
        })
      }
    });
    att.prActions.resumeRepoOperations = resumeRepoOperations;
    __registerWorkerAttachmentForTest(WS, att);

    initWorkerRuntime({ workspaces: [WS] });

    await waitFor(() => resumeRepoOperations.mock.calls.length === 1);
    expect(resumeRepoOperations).toHaveBeenCalledTimes(1);
  });

  test('builds a migration bound to this attachment by default', () => {
    const att = createWorkerAttachment(WS, {
      runtime: createWorkerRuntime(),
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] })
    });

    expect(typeof att.repoOperationMigration.run).toBe('function');
  });
});

describe('worker/attach blocks edge 수집 (UI-04vo seam C)', () => {
  test('snapshotBead collects direct blocks blockers into deps and blocked_by', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: {
            id: 'UI-1',
            status: 'open',
            metadata: {},
            dependencies: [
              { id: 'UI-blocker', dependency_type: 'blocks' },
              { id: 'UI-soft', dependency_type: 'related' },
              { id: 'UI-parent', dependency_type: 'parent-child' },
              { dependency_type: 'blocks' }
            ]
          }
        };
      }
      return { code: 0, stdoutJson: [{ id: 'UI-1' }] };
    });
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('main'),
      runJson: asProjected(runJson)
    });

    const snap = await bd.snapshotBead('UI-1');

    expect(snap.deps).toEqual(['UI-blocker']);
    expect(snap.blocked_by).toEqual(['UI-blocker']);
  });

  test('snapshotBead leaves deps and blocked_by empty without dependencies', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: { id: 'UI-1', status: 'open', metadata: {} }
        };
      }
      return { code: 0, stdoutJson: [{ id: 'UI-1' }] };
    });
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('main'),
      runJson: asProjected(runJson)
    });

    const snap = await bd.snapshotBead('UI-1');

    expect(snap.deps).toEqual([]);
    expect(snap.blocked_by).toEqual([]);
  });
});

describe('worker/attach title-cache readback wiring (UI-eey2 §9.2)', () => {
  test('createLiveBd hands a readMetadata readback to onReadback', async () => {
    const onReadback = vi.fn();
    const runJson = vi.fn(async () => ({
      code: 0,
      stdoutJson: { id: 'UI-1', status: 'open', metadata: { pr_url: 'u' } }
    }));
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('main'),
      runJson: asProjected(runJson),
      onReadback
    });

    await bd.readMetadata('UI-1', 'pr_url');

    expect(onReadback).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'UI-1' })
    );
  });

  test('never lets a throwing onReadback fail the readback', async () => {
    const runJson = vi.fn(async () => ({
      code: 0,
      stdoutJson: { id: 'UI-1', status: 'resolved', metadata: {} }
    }));
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('main'),
      runJson: asProjected(runJson),
      onReadback: () => {
        throw new Error('cache boom');
      }
    });

    await expect(bd.readStatus('UI-1')).resolves.toBe('resolved');
  });

  test('the attachment routes its bd readbacks into the title cache', async () => {
    const runtime = createWorkerRuntime();
    const refreshFromIssue = vi.spyOn(runtime.titleCache, 'refreshFromIssue');
    const runJson = vi.fn(async () => ({
      code: 0,
      stdoutJson: { id: 'UI-1', status: 'open', metadata: {} }
    }));
    const att = createWorkerAttachment(WS, {
      runtime,
      repo: '/repo',
      resolveBase: okBase('main'),
      runJson: asProjected(runJson)
    });

    await att.bd.readIssue('UI-1');

    expect(refreshFromIssue).toHaveBeenCalledWith(
      WS,
      expect.objectContaining({ id: 'UI-1' })
    );
  });
});

describe('beadFacts spec_id 판독 (UI-vb7u §3)', () => {
  /**
   * Build an attachment with NO injected `repairSession`, so attach builds the
   * real adapter and the capture above sees its `beadFacts`.
   *
   * @param {any} bd
   */
  function beadFactsOf(bd) {
    repair_adapter_capture.deps = null;
    createWorkerAttachment(WS, {
      runtime: createWorkerRuntime(),
      bd,
      worktree: fakeWorktree,
      verify: okVerify,
      admission: { validate: async () => ({ ok: true }) },
      resolveBase: okBase('main'),
      kvGet: noAccountDefaults,
      gitRun: async () => ({ code: 1, stdout: '', stderr: '' }),
      makeRunner: () => ({ name: 'claude', spawn: vi.fn() })
    });
    return repair_adapter_capture.deps.beadFacts;
  }

  // sweep 후 native-only Bead는 `metadata.spec_id`가 없다: 그 조회만 보면
  // repair 세션의 `Test scope` 경로가 통째로 사라진다.
  test('resolves a Test scope path for a native-only bead with no metadata spec_id', async () => {
    const bd = {
      ...fakeBd(),
      readIssue: async () => ({
        id: 'UI-1',
        spec_id: 'docs/specs/native.md',
        metadata: {}
      })
    };

    const facts = await beadFactsOf(bd)('UI-1');

    expect(facts.test_scope).toEqual({
      path: 'docs/specs/native.md',
      section: 'Test scope'
    });
  });

  test('falls back to the metadata read when bd offers no readIssue', async () => {
    const bd = {
      ...fakeBd(),
      async readMetadata(/** @type {string} */ _id, /** @type {string} */ k) {
        return k === 'spec_id' ? 'docs/specs/legacy.md' : null;
      }
    };

    const facts = await beadFactsOf(bd)('UI-1');

    expect(facts.test_scope).toEqual({
      path: 'docs/specs/legacy.md',
      section: 'Test scope'
    });
  });

  test('falls back to the metadata read when readIssue throws', async () => {
    const bd = {
      ...fakeBd(),
      async readMetadata(/** @type {string} */ _id, /** @type {string} */ k) {
        return k === 'spec_id' ? 'docs/specs/legacy.md' : null;
      },
      readIssue: async () => {
        throw new Error('bd unavailable');
      }
    };

    const facts = await beadFactsOf(bd)('UI-1');

    expect(facts.test_scope).toEqual({
      path: 'docs/specs/legacy.md',
      section: 'Test scope'
    });
  });
});
