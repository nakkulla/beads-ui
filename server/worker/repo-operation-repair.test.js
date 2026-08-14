import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createLockManager } from './locks.js';
import { createQueueStore } from './queue-store.js';
import { createRepoOperationCoordinator } from './repo-operation-coordinator.js';

const TARGET = 'b'.repeat(40);
const BASE = '1'.repeat(40);
const BLOB = 'd'.repeat(40);

/** @type {string} */
let root;

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'repo-operation-repair-'));
  process.env.XDG_STATE_HOME = path.join(root, 'state');
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(root, { recursive: true, force: true });
});

/**
 * @param {{ dispatch?: any, judge?: any, repairSession?: any }} [overrides]
 */
function repairFixture(overrides = {}) {
  const store = createQueueStore({
    filePathFor: (workspace) => path.join(workspace, 'queue.json')
  });
  const dispatch =
    overrides.dispatch ??
    vi.fn(async () => ({
      ok: true,
      attempt_id: 'att-1',
      session_id: 'sess-1'
    }));
  const judge =
    overrides.judge ??
    vi.fn(async () => ({ verdict: 'unresolved', evidence: null }));
  const coordinator = createRepoOperationCoordinator({
    workspace: root,
    repo: root,
    store,
    locks: createLockManager(),
    gitRun: async () => ({ code: 0, stdout: '', stderr: '' }),
    runner: /** @type {never} */ ({
      start: () => ({ ok: false, code: 'not_used' }),
      readMarker: () => null,
      readLaunchMarker: () => null,
      processController: { probe: () => ({ state: 'gone' }) }
    }),
    transition: /** @type {never} */ ({
      materialize: async () => ({ ok: false }),
      reclaim: () => {}
    }),
    deployWorktree: /** @type {never} */ ({
      bindTarget: async () => ({ ok: false, code: 'unused' }),
      ensureAligned: async () => ({ ok: false, code: 'unused' }),
      verifyAligned: async () => ({ ok: false })
    }),
    verifyCheckout: /** @type {never} */ ({
      materialize: async () => ({ ok: false }),
      verify: async () => ({ ok: false }),
      cleanup: async () => {}
    }),
    repairSession:
      overrides.repairSession ?? /** @type {never} */ ({ dispatch, judge })
  });
  return { store, coordinator, dispatch, judge };
}

/**
 * Prerecord and start ONE operation, leaving it running.
 *
 * @param {any} store
 * @param {{ operation_id: string, kind?: 'verify'|'deploy', subjects?: { bead_id: string, merged_sha: string }[], target_sha?: string, script_blob_sha?: string }} input
 * @returns {string} The attempt id the settle call must match.
 */
function seedRunning(store, input) {
  const operation_id = input.operation_id;
  store.ensureRepoOperation(root, {
    operation_id,
    repo_id: root,
    kind: input.kind || 'deploy',
    subjects: input.subjects || [
      { bead_id: 'UI-a', merged_sha: 'a'.repeat(40) }
    ],
    effective_base_sha: BASE,
    target_base: 'main',
    script_path: 'repo-ops/script/deploy',
    script_mode: '100755',
    script_blob_sha: input.script_blob_sha || BLOB
  });
  const attempt_id =
    store.snapshot(root).repo_operations[operation_id].attempt_id;
  store.startRepoOperation(root, {
    operation_id,
    attempt_id,
    process_identity: { pid: 1, pgid: 1, started_at: 1 },
    log_path: '',
    target_sha: input.target_sha || TARGET
  });
  return attempt_id;
}

/**
 * Seed ONE terminal failure the way the runner path leaves it.
 *
 * @param {any} store
 * @param {{ operation_id: string, kind?: 'verify'|'deploy', subjects?: { bead_id: string, merged_sha: string }[], code?: string, interrupted?: boolean, fingerprint?: string, target_sha?: string, script_blob_sha?: string }} input
 */
function seedFailure(store, input) {
  const attempt_id = seedRunning(store, input);
  store.settleRepoOperation(root, {
    operation_id: input.operation_id,
    attempt_id,
    exit_code: 2,
    signal: null,
    failure: {
      code: input.code || 'script_failed',
      fingerprint: input.fingerprint || 'f'.repeat(64),
      detail: '',
      interrupted: input.interrupted === true
    }
  });
  return input.operation_id;
}

/**
 * Seed ONE terminal success.
 *
 * @param {any} store
 * @param {{ operation_id: string, target_sha?: string, script_blob_sha?: string }} input
 */
function seedSuccess(store, input) {
  const attempt_id = seedRunning(store, input);
  store.settleRepoOperation(root, {
    operation_id: input.operation_id,
    attempt_id,
    exit_code: 0,
    signal: null
  });
  return input.operation_id;
}

describe('auto repair defaults and durable toggle', () => {
  test('defaults a fresh workspace queue to automatic repair on', () => {
    const { store } = repairFixture();

    store.ensureRepoOperation(root, {
      operation_id: 'op-seed',
      repo_id: root,
      kind: 'deploy',
      subjects: [{ bead_id: 'UI-a', merged_sha: 'a'.repeat(40) }],
      effective_base_sha: BASE,
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: BLOB
    });

    expect(store.snapshot(root).auto_repair).toBe(true);
  });

  test('reads back a durable off after a reload', () => {
    const { store } = repairFixture();
    seedFailure(store, { operation_id: 'op-1' });

    store.toggleAutoRepair(root, {
      expected_revision: store.snapshot(root).revision,
      on: false
    });

    expect(store.snapshot(root).auto_repair).toBe(false);
  });

  test('refuses an automatic dispatch while the flag is off', async () => {
    const { store, coordinator, dispatch } = repairFixture();
    seedFailure(store, { operation_id: 'op-1' });
    store.toggleAutoRepair(root, {
      expected_revision: store.snapshot(root).revision,
      on: false
    });

    const result = await coordinator.startRepair('op-1', 'auto');

    expect([result.ok, result.code, dispatch.mock.calls.length]).toEqual([
      false,
      'auto_repair_disabled',
      0
    ]);
  });

  test('never stops a running repair when the flag goes off', async () => {
    const { store, coordinator } = repairFixture();
    seedFailure(store, { operation_id: 'op-1' });
    await coordinator.startRepair('op-1', 'auto');

    store.toggleAutoRepair(root, {
      expected_revision: store.snapshot(root).revision,
      on: false
    });

    expect(store.snapshot(root).repo_operations['op-1'].state).toBe(
      'repairing'
    );
  });

  test('reconciles eligible failures immediately after switching on', async () => {
    const { store, coordinator, dispatch } = repairFixture();
    store.toggleAutoRepair(root, {
      expected_revision: store.snapshot(root).revision,
      on: false
    });
    seedFailure(store, { operation_id: 'op-1' });
    await coordinator.reconcile(root);
    store.toggleAutoRepair(root, {
      expected_revision: store.snapshot(root).revision,
      on: true
    });

    await coordinator.reconcile(root);

    expect(dispatch.mock.calls.length).toBe(1);
  });

  test('opens a continuation only from fresh operation facts', async () => {
    const judge = vi.fn(async () => ({
      verdict: 'unresolved',
      evidence: null
    }));
    const { store, coordinator } = repairFixture({ judge });
    seedFailure(store, { operation_id: 'op-1' });
    await coordinator.startRepair('op-1', 'auto');

    await coordinator.reconcile(root);

    expect(store.snapshot(root).repo_operations['op-1'].state).toBe('failed');
  });

  test('keeps a repairing record while its session is still running', async () => {
    const judge = vi.fn(async () => ({
      verdict: 'session_running',
      evidence: 'att-1'
    }));
    const { store, coordinator } = repairFixture({ judge });
    seedFailure(store, { operation_id: 'op-1' });
    await coordinator.startRepair('op-1', 'auto');

    await coordinator.reconcile(root);

    expect(store.snapshot(root).repo_operations['op-1'].state).toBe(
      'repairing'
    );
  });
});

describe('completion chain budget', () => {
  test('spends exactly one automatic dispatch per chain', async () => {
    const { store, coordinator, dispatch } = repairFixture();
    seedFailure(store, { operation_id: 'op-1' });

    await coordinator.startRepair('op-1', 'auto');
    store.releaseRepoOperationRepair(root, { operation_id: 'op-1' });
    const second = await coordinator.startRepair('op-1', 'auto');

    expect([second.ok, second.code, dispatch.mock.calls.length]).toEqual([
      false,
      'repair_budget_exhausted',
      1
    ]);
  });

  test('blocks a successor operation from buying a second automatic dispatch', async () => {
    const { store, coordinator, dispatch } = repairFixture();
    seedFailure(store, { operation_id: 'op-1' });
    await coordinator.startRepair('op-1', 'auto');
    store.releaseRepoOperationRepair(root, { operation_id: 'op-1' });
    const attempt_id = seedRunning(store, {
      operation_id: 'op-2',
      target_sha: 'c'.repeat(40)
    });
    store.inheritRepoOperationChain(root, {
      from_operation_id: 'op-1',
      to_operation_id: 'op-2'
    });
    store.settleRepoOperation(root, {
      operation_id: 'op-2',
      attempt_id,
      exit_code: 2,
      signal: null,
      failure: {
        code: 'script_failed',
        fingerprint: 'e'.repeat(64),
        detail: '',
        interrupted: false
      }
    });

    const successor = await coordinator.startRepair('op-2', 'auto');

    expect([successor.ok, successor.code, dispatch.mock.calls.length]).toEqual([
      false,
      'repair_budget_exhausted',
      1
    ]);
  });

  test('inherits the chain id and spent budget onto the successor operation', () => {
    const { store } = repairFixture();
    seedFailure(store, { operation_id: 'op-1' });
    store.startRepoOperationRepair(root, {
      operation_id: 'op-1',
      mode: 'auto'
    });
    seedRunning(store, { operation_id: 'op-2', target_sha: 'c'.repeat(40) });

    store.inheritRepoOperationChain(root, {
      from_operation_id: 'op-1',
      to_operation_id: 'op-2'
    });

    expect(store.snapshot(root).repo_operations['op-2'].repair).toMatchObject({
      chain_id: 'op-1',
      auto_used: 1
    });
  });

  test('blocks the same fingerprint reproducing with no new evidence', async () => {
    const { store, coordinator, dispatch } = repairFixture();
    seedFailure(store, { operation_id: 'op-1' });
    await coordinator.startRepair('op-1', 'auto');
    store.releaseRepoOperationRepair(root, { operation_id: 'op-1' });
    seedFailure(store, { operation_id: 'op-2' });

    const repeated = await coordinator.startRepair('op-2', 'auto');

    expect([repeated.ok, repeated.code, dispatch.mock.calls.length]).toEqual([
      false,
      'repair_fingerprint_repeated',
      1
    ]);
  });

  test('allows a new chain when the failing evidence changed', async () => {
    const { store, coordinator, dispatch } = repairFixture();
    seedFailure(store, { operation_id: 'op-1' });
    await coordinator.startRepair('op-1', 'auto');
    store.releaseRepoOperationRepair(root, { operation_id: 'op-1' });
    seedFailure(store, {
      operation_id: 'op-2',
      script_blob_sha: '9'.repeat(40)
    });

    const fresh = await coordinator.startRepair('op-2', 'auto');

    expect([fresh.ok, dispatch.mock.calls.length]).toEqual([true, 2]);
  });

  test('closes a chain on a terminal success of one of its operations', async () => {
    const { store, coordinator } = repairFixture();
    seedFailure(store, { operation_id: 'op-1' });
    seedRunning(store, { operation_id: 'op-2', target_sha: 'c'.repeat(40) });
    store.inheritRepoOperationChain(root, {
      from_operation_id: 'op-1',
      to_operation_id: 'op-2'
    });
    store.settleRepoOperation(root, {
      operation_id: 'op-2',
      attempt_id: store.snapshot(root).repo_operations['op-2'].attempt_id,
      exit_code: 0,
      signal: null
    });

    const result = await coordinator.startRepair('op-1', 'auto');

    expect(result.code).toBe('repair_chain_closed');
  });

  test('leaves an independent later failure to open its own chain', async () => {
    const { store, coordinator, dispatch } = repairFixture();
    seedSuccess(store, { operation_id: 'op-0' });
    seedFailure(store, {
      operation_id: 'op-1',
      target_sha: 'c'.repeat(40),
      script_blob_sha: '8'.repeat(40)
    });

    const result = await coordinator.startRepair('op-1', 'auto');

    expect([result.ok, dispatch.mock.calls.length]).toEqual([true, 1]);
  });
});

describe('repair eligibility', () => {
  test('dispatches for an interrupted operation with no terminal exit', async () => {
    const { store, coordinator, dispatch } = repairFixture();
    seedFailure(store, {
      operation_id: 'op-1',
      code: 'interrupted',
      interrupted: true
    });

    await coordinator.startRepair('op-1', 'auto');

    expect(dispatch.mock.calls.length).toBe(1);
  });

  test('refuses an automatic dispatch for a pre-spawn alignment failure', async () => {
    const { store, coordinator, dispatch } = repairFixture();
    seedFailure(store, {
      operation_id: 'op-1',
      code: 'repo_ops_worktree_align_failed'
    });

    const result = await coordinator.startRepair('op-1', 'auto');

    expect([result.code, dispatch.mock.calls.length]).toEqual([
      'repair_not_eligible',
      0
    ]);
  });

  test('leaves legacy cleanup failures outside the repair lane', async () => {
    const { store, coordinator, dispatch } = repairFixture();
    seedFailure(store, { operation_id: 'op-seed', code: 'unused_seed' });
    const queue = store.snapshot(root);

    await coordinator.reconcile(root);

    expect([
      Object.keys(queue.cleanup_failed).length,
      dispatch.mock.calls.length
    ]).toEqual([0, 0]);
  });
});

describe('manual resolve', () => {
  test('dispatches a repair session even while the flag is off', async () => {
    const { store, coordinator, dispatch } = repairFixture();
    seedFailure(store, { operation_id: 'op-1' });
    store.toggleAutoRepair(root, {
      expected_revision: store.snapshot(root).revision,
      on: false
    });

    const result = await coordinator.startRepair('op-1', 'manual');

    expect([result.ok, dispatch.mock.calls.length]).toEqual([true, 1]);
  });

  test('spends no automatic budget', async () => {
    const { store, coordinator } = repairFixture();
    seedFailure(store, { operation_id: 'op-1' });

    await coordinator.startRepair('op-1', 'manual');

    expect(store.snapshot(root).repo_operations['op-1'].repair.auto_used).toBe(
      0
    );
  });

  test('records the dispatched session on the operation', async () => {
    const { store, coordinator } = repairFixture();
    seedFailure(store, { operation_id: 'op-1' });

    await coordinator.startRepair('op-1', 'manual');

    expect(store.snapshot(root).repo_operations['op-1'].repair).toMatchObject({
      session_id: 'sess-1',
      attempt_id: 'att-1'
    });
  });

  test('returns the record to failed when the session cannot be dispatched', async () => {
    const dispatch = vi.fn(async () => ({
      ok: false,
      reason: 'worktree_missing'
    }));
    const { store, coordinator } = repairFixture({ dispatch });
    seedFailure(store, { operation_id: 'op-1' });

    const result = await coordinator.startRepair('op-1', 'manual');

    expect([
      result.code,
      store.snapshot(root).repo_operations['op-1'].state
    ]).toEqual(['worktree_missing', 'failed']);
  });

  test('does not refund the automatic budget after a dispatch refusal', async () => {
    const dispatch = vi.fn(async () => ({ ok: false, reason: 'bead_running' }));
    const { store, coordinator } = repairFixture({ dispatch });
    seedFailure(store, { operation_id: 'op-1' });

    await coordinator.startRepair('op-1', 'auto');

    expect(store.snapshot(root).repo_operations['op-1'].repair.auto_used).toBe(
      1
    );
  });
});
