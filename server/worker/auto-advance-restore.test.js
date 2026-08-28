import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createAutoAdvanceRestoreController } from './auto-advance-restore.js';
import { createLockManager } from './locks.js';
import { createQueueStore } from './queue-store.js';

/** @typedef {ReturnType<typeof createQueueStore>} QueueStore */

const SOURCE_SHA = 'a'.repeat(40);
const ROOT_SHA = 'b'.repeat(40);
const OTHER_ROOT_SHA = 'c'.repeat(40);
const SCRIPT_SHA = 'd'.repeat(40);
const MERGE_SHA = 'e'.repeat(40);

/** @type {string} */
let tmp_root;

beforeEach(() => {
  tmp_root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-auto-restore-'));
});

afterEach(() => {
  fs.rmSync(tmp_root, { recursive: true, force: true });
});

/**
 * @param {string} workspace
 * @param {{ at: number }} clock
 */
function createStore(workspace, clock) {
  return createQueueStore({
    now: () => clock.at,
    filePathFor: () => path.join(workspace, 'queue.json')
  });
}

/**
 * @param {QueueStore} store
 * @param {string} workspace
 * @param {{ target_sha?: string }} [options]
 */
function seedRunningDeploy(store, workspace, options = {}) {
  store.ensureRepoOperation(workspace, {
    operation_id: 'self-deploy',
    repo_id: workspace,
    kind: 'deploy',
    subjects: [{ bead_id: 'UI-self', merged_sha: MERGE_SHA }],
    effective_base_sha: ROOT_SHA,
    target_base: 'main',
    script_mode: '100755',
    script_blob_sha: SCRIPT_SHA
  });
  const operation = store.snapshot(workspace).repo_operations['self-deploy'];
  store.startRepoOperation(workspace, {
    operation_id: 'self-deploy',
    attempt_id: operation.attempt_id,
    process_identity: { pid: 1, pgid: 1, started_at: 100 },
    log_path: path.join(workspace, 'deploy.log'),
    target_sha: options.target_sha ?? SOURCE_SHA
  });
}

/**
 * @param {QueueStore} store
 * @param {string} workspace
 */
function succeedDeploy(store, workspace) {
  const operation = store.snapshot(workspace).repo_operations['self-deploy'];
  store.settleRepoOperation(workspace, {
    operation_id: 'self-deploy',
    attempt_id: operation.attempt_id,
    exit_code: 0,
    signal: null
  });
}

/**
 * @param {QueueStore} store
 * @param {string} workspace
 */
function failDeploy(store, workspace) {
  const operation = store.snapshot(workspace).repo_operations['self-deploy'];
  store.settleRepoOperation(workspace, {
    operation_id: 'self-deploy',
    attempt_id: operation.attempt_id,
    exit_code: 1,
    signal: null,
    failure: {
      code: 'deploy_failed',
      fingerprint: 'f'.repeat(64),
      detail: 'test failure',
      interrupted: false
    }
  });
}

/**
 * @param {{ persisted_auto_advance?: boolean, target_sha?: string, workspace_root_sha?: string, source_root_sha?: string, operation_started_at?: number, process_started_at?: number, locks?: ReturnType<typeof createLockManager>, notifyChanged?: (workspace: string) => void, tick?: (workspace: string) => Promise<void>, judge?: () => Promise<{ verdict: string, evidence: string|null }> }} [options]
 */
function createHarness(options = {}) {
  const workspace = path.join(tmp_root, 'workspace');
  const source_repo = path.join(tmp_root, 'release');
  const clock = { at: options.operation_started_at ?? 100 };
  const previous_store = createStore(workspace, clock);
  if (options.persisted_auto_advance !== false) {
    previous_store.toggleAutoAdvance(workspace, {
      expected_revision: previous_store.snapshot(workspace).revision,
      on: true
    });
  } else {
    previous_store.toggleAutoMerge(workspace, {
      expected_revision: previous_store.snapshot(workspace).revision,
      on: true
    });
  }
  seedRunningDeploy(previous_store, workspace, {
    target_sha: options.target_sha
  });
  const store = createStore(workspace, clock);
  const notifyChanged = vi.fn(options.notifyChanged || (() => {}));
  const tick = vi.fn(options.tick || (async () => {}));
  const judge = vi.fn(
    options.judge || (async () => ({ verdict: 'unresolved', evidence: null }))
  );
  const gitRun = vi.fn(async (_args, run_options) => ({
    code: 0,
    stdout: `${
      run_options.cwd === source_repo
        ? (options.source_root_sha ?? ROOT_SHA)
        : (options.workspace_root_sha ?? ROOT_SHA)
    }\n`,
    stderr: ''
  }));
  const controller = createAutoAdvanceRestoreController({
    runtime_identity: {
      source_repo,
      source_sha: SOURCE_SHA,
      process_started_at: options.process_started_at ?? 200
    }
  });
  controller.register({
    workspace,
    repo: workspace,
    store,
    locks: options.locks ?? createLockManager(),
    gitRun,
    repairSession: { judge },
    notifyChanged,
    tick
  });
  return {
    controller,
    judge,
    notifyChanged,
    source_repo,
    store,
    tick,
    workspace
  };
}

/**
 * @param {ReturnType<typeof createHarness>} harness
 * @param {() => void} [mutate]
 */
async function runPass(harness, mutate) {
  harness.controller.beforeReconcile(harness.workspace);
  mutate?.();
  const restore_ready = await harness.controller.afterReconcileLocked(
    harness.workspace
  );
  if (restore_ready) {
    await harness.controller.restoreAll();
  }
}

describe('worker/auto-advance-restore success', () => {
  test('restores a captured lane after its self deploy succeeds', async () => {
    const harness = createHarness();

    await runPass(harness, () =>
      succeedDeploy(harness.store, harness.workspace)
    );

    expect(harness.store.snapshot(harness.workspace).auto_advance).toBe(true);
    expect(harness.notifyChanged).toHaveBeenCalledTimes(1);
    expect(harness.tick).toHaveBeenCalledTimes(1);
  });

  test('keeps direct success independent from repair-chain judgment', async () => {
    const harness = createHarness({
      judge: async () => {
        throw new Error('direct success must not judge a missing chain');
      }
    });

    await runPass(harness, () =>
      succeedDeploy(harness.store, harness.workspace)
    );

    expect(harness.store.snapshot(harness.workspace).auto_advance).toBe(true);
    expect(harness.judge).not.toHaveBeenCalled();
  });

  test('hands restored work off after releasing its serialization lock', async () => {
    let locked = false;
    const locks = {
      ...createLockManager(),
      async repoOperationLock() {
        locked = true;
        return () => {
          locked = false;
        };
      }
    };
    const harness = createHarness({
      locks,
      notifyChanged: () => {
        expect(locked).toBe(false);
      },
      tick: async () => {
        expect(locked).toBe(false);
      }
    });

    await runPass(harness, () =>
      succeedDeploy(harness.store, harness.workspace)
    );

    expect(harness.notifyChanged).toHaveBeenCalledTimes(1);
    expect(harness.tick).toHaveBeenCalledTimes(1);
  });
});

describe('worker/auto-advance-restore persisted snapshot guard', () => {
  test('restores the positive control with persisted auto advance on', async () => {
    const harness = createHarness();

    await runPass(harness, () =>
      succeedDeploy(harness.store, harness.workspace)
    );

    expect(harness.store.snapshot(harness.workspace).auto_advance).toBe(true);
  });

  test('does not restore persisted pause while auto merge stays on', async () => {
    const harness = createHarness({ persisted_auto_advance: false });

    await runPass(harness, () =>
      succeedDeploy(harness.store, harness.workspace)
    );

    const queue = harness.store.snapshot(harness.workspace);
    expect(queue.auto_advance).toBe(false);
    expect(queue.auto_merge).toBe(true);
  });
});

describe('worker/auto-advance-restore user intervention guard', () => {
  test('restores the positive control without a post-boot toggle', async () => {
    const harness = createHarness();

    await runPass(harness, () =>
      succeedDeploy(harness.store, harness.workspace)
    );

    expect(harness.store.snapshot(harness.workspace).auto_advance).toBe(true);
  });

  test('does not restore after a post-boot play-pause toggle', async () => {
    const harness = createHarness();

    await runPass(harness, () => {
      harness.store.toggleAutoAdvance(harness.workspace, {
        expected_revision: harness.store.snapshot(harness.workspace).revision,
        on: true
      });
      harness.store.toggleAutoAdvance(harness.workspace, {
        expected_revision: harness.store.snapshot(harness.workspace).revision,
        on: false
      });
      succeedDeploy(harness.store, harness.workspace);
    });

    expect(harness.store.snapshot(harness.workspace).auto_advance).toBe(false);
    expect(harness.notifyChanged).not.toHaveBeenCalled();
  });
});

describe('worker/auto-advance-restore unresolved failures', () => {
  test('restores on a later pass after moot reconciliation dismisses the blocker', async () => {
    const harness = createHarness();
    harness.store.appendAttempt(harness.workspace, {
      expected_revision: harness.store.snapshot(harness.workspace).revision,
      attempt: {
        attempt_id: 'blocking-failure',
        bead_id: 'UI-blocked',
        status: 'failed',
        finished_at: 120,
        // The LEGACY halt is the only thing that blocks a restore now
        // (2026-08-28 worker-failure-tiers spec §4).
        halted_auto_advance: true
      }
    });

    await runPass(harness, () =>
      succeedDeploy(harness.store, harness.workspace)
    );
    const blocked = harness.store.snapshot(harness.workspace).auto_advance;
    harness.store.settleMootRepairFailures(harness.workspace, {
      attempt_ids: ['blocking-failure']
    });
    await runPass(harness);

    expect(blocked).toBe(false);
    expect(harness.store.snapshot(harness.workspace).auto_advance).toBe(true);
  });

  test('restores despite an undismissed individual failure', async () => {
    const harness = createHarness();
    harness.store.appendAttempt(harness.workspace, {
      expected_revision: harness.store.snapshot(harness.workspace).revision,
      attempt: {
        attempt_id: 'individual-failure',
        bead_id: 'UI-individual',
        status: 'failed',
        cause: 'session_ended_unresolved',
        finished_at: 120,
        halted_auto_advance: false
      }
    });

    await runPass(harness, () =>
      succeedDeploy(harness.store, harness.workspace)
    );

    expect(harness.store.snapshot(harness.workspace).auto_advance).toBe(true);
  });
});

describe('worker/auto-advance-restore boot candidate guard', () => {
  test('restores the positive control captured while non-terminal', async () => {
    const harness = createHarness();

    await runPass(harness, () =>
      succeedDeploy(harness.store, harness.workspace)
    );

    expect(harness.store.snapshot(harness.workspace).auto_advance).toBe(true);
  });

  test('does not adopt a success that was terminal before boot', async () => {
    const workspace = path.join(tmp_root, 'workspace');
    const source_repo = path.join(tmp_root, 'release');
    const clock = { at: 100 };
    const previous_store = createStore(workspace, clock);
    previous_store.toggleAutoAdvance(workspace, {
      expected_revision: 0,
      on: true
    });
    seedRunningDeploy(previous_store, workspace);
    succeedDeploy(previous_store, workspace);
    const store = createStore(workspace, clock);
    const controller = createAutoAdvanceRestoreController({
      runtime_identity: {
        source_repo,
        source_sha: SOURCE_SHA,
        process_started_at: 200
      }
    });
    controller.register({
      workspace,
      repo: workspace,
      store,
      locks: createLockManager(),
      gitRun: async () => ({ code: 0, stdout: `${ROOT_SHA}\n`, stderr: '' }),
      repairSession: {
        judge: async () => ({ verdict: 'chain_closed', evidence: null })
      },
      notifyChanged: vi.fn(),
      tick: vi.fn(async () => {})
    });

    controller.beforeReconcile(workspace);
    const restore_ready = await controller.afterReconcileLocked(workspace);
    if (restore_ready) {
      await controller.restoreAll();
    }

    expect(store.snapshot(workspace).auto_advance).toBe(false);
  });
});

describe('worker/auto-advance-restore identity guards', () => {
  test('restores the positive control with matching SHA and root commit', async () => {
    const harness = createHarness();

    await runPass(harness, () =>
      succeedDeploy(harness.store, harness.workspace)
    );

    expect(harness.store.snapshot(harness.workspace).auto_advance).toBe(true);
  });

  test('does not restore a target SHA mismatch', async () => {
    const harness = createHarness({ target_sha: '1'.repeat(40) });

    await runPass(harness, () =>
      succeedDeploy(harness.store, harness.workspace)
    );

    expect(harness.store.snapshot(harness.workspace).auto_advance).toBe(false);
  });

  test('does not restore a root commit mismatch', async () => {
    const harness = createHarness({ source_root_sha: OTHER_ROOT_SHA });

    await runPass(harness, () =>
      succeedDeploy(harness.store, harness.workspace)
    );

    expect(harness.store.snapshot(harness.workspace).auto_advance).toBe(false);
  });

  test('does not restore an operation that started after this process', async () => {
    const harness = createHarness({
      operation_started_at: 300,
      process_started_at: 200
    });

    await runPass(harness, () =>
      succeedDeploy(harness.store, harness.workspace)
    );

    expect(harness.store.snapshot(harness.workspace).auto_advance).toBe(false);
  });
});

describe('worker/auto-advance-restore terminal chain', () => {
  test('waits through failure and restores after judge reports late chain success', async () => {
    const harness = createHarness();

    await runPass(harness, () => failDeploy(harness.store, harness.workspace));
    const failed = harness.store.snapshot(harness.workspace).auto_advance;
    harness.judge.mockResolvedValue({
      verdict: 'chain_closed',
      evidence: 'successor'
    });
    await runPass(harness);

    expect(failed).toBe(false);
    expect(harness.store.snapshot(harness.workspace).auto_advance).toBe(true);
  });
});

describe('worker/auto-advance-restore judgment error guard', () => {
  test('restores the positive control when chain judgment succeeds', async () => {
    const harness = createHarness({
      judge: async () => ({ verdict: 'chain_closed', evidence: 'successor' })
    });

    await runPass(harness, () => failDeploy(harness.store, harness.workspace));

    expect(harness.store.snapshot(harness.workspace).auto_advance).toBe(true);
  });

  test('stays off on judgment error and retries the next pass', async () => {
    const harness = createHarness({
      judge: async () => {
        throw new Error('judge unavailable');
      }
    });

    await runPass(harness, () => failDeploy(harness.store, harness.workspace));
    const after_error = harness.store.snapshot(harness.workspace).auto_advance;
    harness.judge.mockResolvedValue({
      verdict: 'chain_closed',
      evidence: 'successor'
    });
    await runPass(harness);

    expect(after_error).toBe(false);
    expect(harness.store.snapshot(harness.workspace).auto_advance).toBe(true);
  });
});

describe('worker/auto-advance-restore idempotence', () => {
  test('consumes one restore without repeating handoff', async () => {
    const harness = createHarness();

    await runPass(harness, () =>
      succeedDeploy(harness.store, harness.workspace)
    );
    await runPass(harness);

    expect(harness.notifyChanged).toHaveBeenCalledTimes(1);
    expect(harness.tick).toHaveBeenCalledTimes(1);
    expect(harness.store.autoAdvanceAtShutdown(harness.workspace)).toBe(false);
  });
});

describe('worker/auto-advance-restore candidate ordering', () => {
  test('keeps candidate eligibility when the first pass settles it immediately', async () => {
    const harness = createHarness();

    harness.controller.beforeReconcile(harness.workspace);
    succeedDeploy(harness.store, harness.workspace);
    const restore_ready = await harness.controller.afterReconcileLocked(
      harness.workspace
    );
    if (restore_ready) {
      await harness.controller.restoreAll();
    }

    expect(harness.store.snapshot(harness.workspace).auto_advance).toBe(true);
  });
});

describe('worker/auto-advance-restore fan-out', () => {
  test('dispatches captured workspaces and leaves a paused workspace unchanged', async () => {
    const harness = createHarness();
    const captured_workspace = path.join(tmp_root, 'captured');
    const paused_workspace = path.join(tmp_root, 'paused');
    const clock = { at: 100 };
    const captured_previous = createStore(captured_workspace, clock);
    captured_previous.toggleAutoAdvance(captured_workspace, {
      expected_revision: 0,
      on: true
    });
    captured_previous.place(captured_workspace, {
      expected_revision:
        captured_previous.snapshot(captured_workspace).revision,
      bead_id: 'UI-next'
    });
    const captured_store = createStore(captured_workspace, clock);
    const paused_previous = createStore(paused_workspace, clock);
    paused_previous.toggleAutoMerge(paused_workspace, {
      expected_revision: 0,
      on: true
    });
    const paused_store = createStore(paused_workspace, clock);
    /** @type {string[]} */
    const dispatched = [];
    const captured_tick = vi.fn(async () => {
      const queue = captured_store.snapshot(captured_workspace);
      if (queue.auto_advance && queue.queue.length > 0) {
        dispatched.push(queue.queue[0].bead_id);
      }
    });
    const paused_tick = vi.fn(async () => {});
    const common = {
      locks: createLockManager(),
      gitRun: async () => ({ code: 0, stdout: `${ROOT_SHA}\n`, stderr: '' }),
      repairSession: {
        judge: async () => ({ verdict: 'unresolved', evidence: null })
      },
      notifyChanged: vi.fn()
    };
    harness.controller.register({
      ...common,
      workspace: captured_workspace,
      repo: captured_workspace,
      store: captured_store,
      tick: captured_tick
    });
    harness.controller.register({
      ...common,
      workspace: paused_workspace,
      repo: paused_workspace,
      store: paused_store,
      tick: paused_tick
    });

    await runPass(harness, () =>
      succeedDeploy(harness.store, harness.workspace)
    );

    expect(dispatched).toEqual(['UI-next']);
    expect(captured_tick).toHaveBeenCalledTimes(1);
    expect(paused_store.snapshot(paused_workspace).auto_advance).toBe(false);
    expect(paused_tick).not.toHaveBeenCalled();
  });
});
