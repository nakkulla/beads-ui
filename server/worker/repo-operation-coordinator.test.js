import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createLockManager } from './locks.js';
import { createQueueStore } from './queue-store.js';
import { createRepoOperationCoordinator } from './repo-operation-coordinator.js';
import {
  __resetRepoOpsDisplayForTest,
  repoOpsDisplayFor
} from './repo-ops-display.js';
import {
  repoOpsSpoolPendingDir,
  repoOpsSpoolProcessedDir
} from './state-paths.js';

const TARGET = 'b'.repeat(40);
const APPROVED = 'e'.repeat(40);
const BASE = '1'.repeat(40);
const HEAD = '2'.repeat(40);
const TREE = '3'.repeat(40);
const FINAL = '6'.repeat(40);
const FINAL_TREE = '7'.repeat(40);
const CONFIG = '[deploy]\nscript = "repo-ops/script/deploy"';
const VERIFY_CONFIG = '[verify]\nscript = "repo-ops/script/verify"';

/** @type {string} */
let root;

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'repo-operation-coord-'));
  process.env.XDG_STATE_HOME = path.join(root, 'state');
  __resetRepoOpsDisplayForTest();
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(root, { recursive: true, force: true });
});

/**
 * Fake git that resolves the target tree's bootstrap policy and validates the
 * approved source against `known_shas`.
 *
 * @param {{ known_shas?: string[] }} [options]
 */
function gitForBootstrap(options = {}) {
  const known = new Set(options.known_shas ?? [APPROVED]);
  /** @param {string[]} args - Git arguments. */
  return async (args) => {
    if (args[0] === 'cat-file') {
      const sha = String(args.at(-1)).split(/[:^]/)[0];
      return known.has(sha)
        ? { code: 0, stdout: '', stderr: '' }
        : { code: 1, stdout: '', stderr: 'missing' };
    }
    if (args[0] === 'merge-base') {
      return { code: 0, stdout: '', stderr: '' };
    }
    if (args[0] === 'show') {
      return String(args[1]).startsWith(TARGET)
        ? { code: 0, stdout: CONFIG, stderr: '' }
        : { code: 128, stdout: '', stderr: 'missing' };
    }
    if (args[0] === 'ls-tree') {
      if (!String(args[1]).startsWith(TARGET)) {
        return { code: 0, stdout: '', stderr: '' };
      }
      const entry =
        args.at(-1) === 'repo-ops/config.toml'
          ? `100644 blob ${'c'.repeat(40)}\trepo-ops/config.toml`
          : `100755 blob ${'d'.repeat(40)}\trepo-ops/script/deploy`;
      return { code: 0, stdout: entry, stderr: '' };
    }
    return { code: 1, stdout: '', stderr: 'unexpected' };
  };
}

/**
 * @param {{ gitRun?: (args: string[], options: object) => Promise<{ code: number, stdout: string, stderr: string }>, runner?: object, transition?: object, verifyCheckout?: object, repairSession?: object, policySupported?: () => boolean }} [overrides]
 */
function coordinatorFor(overrides = {}) {
  const store = createQueueStore({
    filePathFor: (workspace) => path.join(workspace, 'queue.json')
  });
  const runner = overrides.runner ?? {
    start: () => ({
      ok: true,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: path.join(root, 'operation.log'),
      marker_path: path.join(root, 'operation.marker.json')
    }),
    readMarker: () => null,
    readLaunchMarker: () => null,
    processController: { probe: () => ({ state: 'owned' }) }
  };
  const coordinator = createRepoOperationCoordinator({
    workspace: root,
    repo: root,
    store,
    locks: createLockManager(),
    gitRun: overrides.gitRun ?? gitForBootstrap(),
    runner: /** @type {never} */ (runner),
    transition: /** @type {never} */ (
      overrides.transition ?? {
        materialize: async () => ({
          ok: true,
          path: path.join(root, 'script')
        }),
        reclaim: () => {}
      }
    ),
    deployWorktree: /** @type {never} */ ({
      bindTarget: async () => ({ ok: true, target_sha: TARGET }),
      ensureAligned: async () => ({
        ok: true,
        path: path.join(root, '.worktrees', '.repo-ops-deploy'),
        target_sha: TARGET
      }),
      verifyAligned: async () => ({ ok: true })
    }),
    verifyCheckout: /** @type {never} */ (overrides.verifyCheckout),
    repairSession: /** @type {never} */ (overrides.repairSession),
    policySupported: overrides.policySupported
  });
  return { store, coordinator };
}

/**
 * @param {{ verify?: boolean }} [options]
 */
function gitForVerify(options = {}) {
  return vi.fn(async (args) => {
    if (args[0] === 'show') {
      return options.verify
        ? { code: 0, stdout: VERIFY_CONFIG, stderr: '' }
        : { code: 128, stdout: '', stderr: 'missing' };
    }
    if (args[0] === 'ls-tree') {
      const requested_path = args.at(-1);
      if (requested_path === 'repo-ops/config.toml') {
        return options.verify
          ? {
              code: 0,
              stdout: `100644 blob ${'4'.repeat(40)}\trepo-ops/config.toml`,
              stderr: ''
            }
          : { code: 0, stdout: '', stderr: '' };
      }
      return {
        code: 0,
        stdout: `100755 blob ${'5'.repeat(40)}\trepo-ops/script/verify`,
        stderr: ''
      };
    }
    return { code: 0, stdout: '', stderr: '' };
  });
}

/**
 * @param {object} [overrides]
 */
function verifyCandidate(overrides = {}) {
  return {
    repo: root,
    origin: 'origin',
    target_base: 'main',
    base_sha: BASE,
    head_sha: HEAD,
    bead_id: 'UI-1',
    pr_number: 7,
    script_path: 'repo-ops/script/verify',
    ...overrides
  };
}

/**
 * @param {object} request
 */
function spoolRequest(request) {
  const pending = repoOpsSpoolPendingDir(root);
  fs.mkdirSync(pending, { recursive: true });
  const file = path.join(pending, 'req-1.json');
  fs.writeFileSync(file, JSON.stringify(request));
  return file;
}

/**
 * @param {object} [overrides]
 */
function validRequest(overrides = {}) {
  return {
    request_id: 'req-1',
    repo: root,
    target_base: 'main',
    approved_source_path: 'docs/spec.md',
    approved_source_sha: APPROVED,
    requested_by: 'operator',
    requested_at: 7,
    ...overrides
  };
}

describe('RepoOperation coordinator', () => {
  // The deploy-only declaration every caller must be able to tell apart from a
  // declared `[verify]`: `null` here is what lets the cleanup skip the verify
  // stage instead of demanding a verify candidate it can never build.
  test('reports a deploy-only base as present with no verify script', async () => {
    const { coordinator } = coordinatorFor({ gitRun: gitForBootstrap() });

    const result = await coordinator.hasConfig(TARGET);

    expect(result).toEqual({
      ok: true,
      present: true,
      verify_script_path: null
    });
  });

  test('creates no operation when verify is absent', async () => {
    const start = vi.fn();
    const { store, coordinator } = coordinatorFor({
      gitRun: gitForVerify(),
      runner: {
        start,
        readMarker: () => null,
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      },
      verifyCheckout: { materialize: vi.fn() }
    });

    const result = await coordinator.ensureVerify(verifyCandidate());

    expect(result).toEqual({ ok: true, inert: true });
    expect(start).not.toHaveBeenCalled();
    expect(store.snapshot(root).repo_operations).toEqual({});
  });

  test('rejects a verify candidate bound to another repository', async () => {
    const materialize = vi.fn();
    const { store, coordinator } = coordinatorFor({
      gitRun: gitForVerify({ verify: true }),
      verifyCheckout: { materialize }
    });

    const result = await coordinator.ensureVerify(
      verifyCandidate({ repo: path.join(root, 'foreign') })
    );

    expect(result).toMatchObject({
      ok: false,
      code: 'verify_candidate_mismatch'
    });
    expect(materialize).not.toHaveBeenCalled();
    expect(store.snapshot(root).repo_operations).toEqual({});
  });

  test.each([
    ['origin', { origin: 'upstream' }],
    ['target base', { target_base: 'develop' }],
    ['base SHA', { base_sha: 'not-a-sha' }],
    ['head SHA', { head_sha: 'not-a-sha' }],
    ['script path', { script_path: 'repo-ops/script/other' }]
  ])('rejects a verify candidate with mismatched %s', async (_axis, patch) => {
    const materialize = vi.fn();
    const { store, coordinator } = coordinatorFor({
      gitRun: gitForVerify({ verify: true }),
      verifyCheckout: { materialize }
    });

    const result = await coordinator.ensureVerify(verifyCandidate(patch));

    expect(result).toMatchObject({
      ok: false,
      code: 'verify_candidate_mismatch'
    });
    expect(materialize).not.toHaveBeenCalled();
    expect(store.snapshot(root).repo_operations).toEqual({});
  });

  test('prerecords candidate tree and script identity before one spawn', async () => {
    /** @type {string[]} */
    const calls = [];
    const runner = {
      start: vi.fn(async () => {
        calls.push('spawn');
        return {
          ok: true,
          process_identity: { pid: 1, pgid: 1, started_at: 1 },
          log_path: path.join(root, 'verify.log')
        };
      }),
      readMarker: () => null,
      readLaunchMarker: () => null,
      processController: { probe: () => ({ state: 'owned' }) }
    };
    const { store, coordinator } = coordinatorFor({
      gitRun: gitForVerify({ verify: true }),
      runner,
      verifyCheckout: {
        materialize: vi.fn(async () => {
          const operations = Object.values(
            store.snapshot(root).repo_operations
          );
          calls.push(operations.length === 0 ? 'materialize' : 'bad-prerecord');
          return { ok: true, path: root, tree_sha: TREE };
        }),
        verify: vi.fn(async () => ({ ok: true })),
        cleanup: vi.fn(async () => {})
      }
    });

    const result = await coordinator.ensureVerify(verifyCandidate());

    expect(result).toMatchObject({
      ok: true,
      operation_id: expect.any(String)
    });
    expect(calls).toEqual(['materialize', 'spawn']);
    expect(runner.start).toHaveBeenCalledTimes(1);
    expect(
      store.snapshot(root).repo_operations[result.operation_id]
    ).toMatchObject({
      kind: 'verify',
      effective_base_sha: BASE,
      target_tree: TREE,
      script_mode: '100755',
      script_blob_sha: '5'.repeat(40),
      state: 'running'
    });
  });

  test('inherits an exact candidate receipt and runs a different final tree once', async () => {
    /** @type {{ exit_code: number, signal: null }|null} */
    let marker = null;
    let tree_sha = TREE;
    const runner = {
      start: vi.fn(async () => ({
        ok: true,
        process_identity: { pid: 1, pgid: 1, started_at: 1 },
        log_path: path.join(root, 'verify.log')
      })),
      readMarker: () => marker,
      readLaunchMarker: () => null,
      processController: { probe: () => ({ state: 'owned' }) }
    };
    const verifyCheckout = {
      materialize: vi.fn(async () => ({
        ok: true,
        path: root,
        tree_sha
      })),
      verify: vi.fn(async () => ({ ok: true })),
      cleanup: vi.fn(async () => {})
    };
    const { coordinator } = coordinatorFor({
      gitRun: gitForVerify({ verify: true }),
      runner,
      verifyCheckout
    });
    const initial = await coordinator.ensureVerify(verifyCandidate());
    marker = { exit_code: 0, signal: null };
    await coordinator.reconcile(root);
    marker = null;

    const inherited = await coordinator.ensureVerify(
      verifyCandidate({
        final_sha: FINAL,
        receipt_operation_id: initial.operation_id
      })
    );
    tree_sha = FINAL_TREE;
    const rerun = await coordinator.ensureVerify(
      verifyCandidate({
        final_sha: FINAL,
        receipt_operation_id: initial.operation_id
      })
    );

    expect(inherited).toMatchObject({
      ok: true,
      inherited: true,
      operation_id: initial.operation_id
    });
    expect(rerun).toMatchObject({
      ok: true,
      operation_id: expect.not.stringMatching(initial.operation_id)
    });
    expect(runner.start).toHaveBeenCalledTimes(2);
  });

  test('lets a successful descendant cover an earlier failed deploy', async () => {
    const { store, coordinator } = coordinatorFor({
      gitRun: vi.fn(async (args) => ({
        code: args[0] === 'merge-base' ? 0 : 1,
        stdout: '',
        stderr: ''
      }))
    });
    for (const operation_id of ['failed-deploy', 'later-deploy']) {
      store.ensureRepoOperation(root, {
        operation_id,
        repo_id: root,
        kind: 'deploy',
        subjects: [{ bead_id: 'UI-1', merged_sha: HEAD }],
        effective_base_sha: BASE,
        target_base: 'main',
        script_mode: '100755',
        script_blob_sha: '5'.repeat(40)
      });
    }
    const failed = store.snapshot(root).repo_operations['failed-deploy'];
    store.settleRepoOperation(root, {
      operation_id: 'failed-deploy',
      attempt_id: failed.attempt_id,
      exit_code: 1,
      signal: null
    });
    const later = store.snapshot(root).repo_operations['later-deploy'];
    store.startRepoOperation(root, {
      operation_id: 'later-deploy',
      attempt_id: later.attempt_id,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: path.join(root, 'later.log'),
      target_sha: TARGET
    });
    store.settleRepoOperation(root, {
      operation_id: 'later-deploy',
      attempt_id: later.attempt_id,
      exit_code: 0,
      signal: null
    });

    const evidence = await coordinator.deploymentEvidence('failed-deploy', {
      target_base: 'main',
      merged_sha: HEAD
    });

    expect(evidence).toEqual({
      state: 'succeeded',
      operation_id: 'later-deploy',
      covered_operation_id: 'failed-deploy'
    });
  });

  test('supersedes an ancestor failed deploy when a descendant succeeds', async () => {
    const runner = {
      start: () => ({ ok: false, code: 'unused' }),
      readMarker: () => ({ exit_code: 0, signal: null }),
      readLaunchMarker: () => null,
      processController: { probe: () => ({ state: 'owned' }) }
    };
    const { store, coordinator } = coordinatorFor({
      runner,
      gitRun: vi.fn(async (args) => ({
        code: args[0] === 'merge-base' ? 0 : 1,
        stdout: '',
        stderr: ''
      }))
    });
    for (const operation_id of ['failed-deploy', 'descendant-deploy']) {
      store.ensureRepoOperation(root, {
        operation_id,
        repo_id: root,
        kind: 'deploy',
        subjects: [{ bead_id: 'UI-1', merged_sha: HEAD }],
        effective_base_sha: BASE,
        target_base: 'main',
        script_mode: '100755',
        script_blob_sha: '5'.repeat(40)
      });
    }
    const failed = store.snapshot(root).repo_operations['failed-deploy'];
    store.startRepoOperation(root, {
      operation_id: 'failed-deploy',
      attempt_id: failed.attempt_id,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: path.join(root, 'failed.log'),
      target_sha: HEAD
    });
    store.settleRepoOperation(root, {
      operation_id: 'failed-deploy',
      attempt_id: failed.attempt_id,
      exit_code: 1,
      signal: null
    });
    const descendant =
      store.snapshot(root).repo_operations['descendant-deploy'];
    store.startRepoOperation(root, {
      operation_id: 'descendant-deploy',
      attempt_id: descendant.attempt_id,
      process_identity: { pid: 2, pgid: 2, started_at: 1 },
      log_path: path.join(root, 'descendant.log'),
      target_sha: TARGET
    });

    await coordinator.reconcile(root);

    expect(
      store.snapshot(root).repo_operations['failed-deploy'].superseded_by
    ).toBe('descendant-deploy');
  });

  test('uses effective base sha to supersede a failed deploy without a target sha', async () => {
    const runner = {
      start: () => ({ ok: false, code: 'unused' }),
      readMarker: () => ({ exit_code: 0, signal: null }),
      readLaunchMarker: () => null,
      processController: { probe: () => ({ state: 'owned' }) }
    };
    const { store, coordinator } = coordinatorFor({
      runner,
      gitRun: vi.fn(async (args) => ({
        code: args[0] === 'merge-base' ? 0 : 1,
        stdout: '',
        stderr: ''
      }))
    });
    for (const operation_id of ['failed-deploy', 'descendant-deploy']) {
      store.ensureRepoOperation(root, {
        operation_id,
        repo_id: root,
        kind: 'deploy',
        subjects: [{ bead_id: 'UI-1', merged_sha: HEAD }],
        effective_base_sha: operation_id === 'failed-deploy' ? HEAD : BASE,
        target_base: 'main',
        script_mode: '100755',
        script_blob_sha: '5'.repeat(40)
      });
    }
    const failed = store.snapshot(root).repo_operations['failed-deploy'];
    store.settleRepoOperation(root, {
      operation_id: 'failed-deploy',
      attempt_id: failed.attempt_id,
      exit_code: 1,
      signal: null
    });
    const descendant =
      store.snapshot(root).repo_operations['descendant-deploy'];
    store.startRepoOperation(root, {
      operation_id: 'descendant-deploy',
      attempt_id: descendant.attempt_id,
      process_identity: { pid: 2, pgid: 2, started_at: 1 },
      log_path: path.join(root, 'descendant.log'),
      target_sha: TARGET
    });

    await coordinator.reconcile(root);

    expect(
      store.snapshot(root).repo_operations['failed-deploy'].superseded_by
    ).toBe('descendant-deploy');
  });

  test('keeps a late runner failure pending without changing repairing or covered rows', async () => {
    const runner = {
      start: () => ({ ok: false, code: 'unused' }),
      readMarker: () => ({ exit_code: 2, signal: null }),
      readLaunchMarker: () => null,
      processController: { probe: () => ({ state: 'owned' }) }
    };
    const { store, coordinator } = coordinatorFor({
      runner,
      gitRun: vi.fn(async (args) => ({
        code: args[0] === 'merge-base' ? 0 : 1,
        stdout: '',
        stderr: ''
      }))
    });
    for (const operation_id of [
      'descendant-deploy',
      'late-failed',
      'repairing-deploy',
      'covered-deploy'
    ]) {
      store.ensureRepoOperation(root, {
        operation_id,
        repo_id: root,
        kind: 'deploy',
        subjects: [{ bead_id: 'UI-1', merged_sha: HEAD }],
        effective_base_sha: BASE,
        target_base: 'main',
        script_mode: '100755',
        script_blob_sha: '5'.repeat(40)
      });
      const operation = store.snapshot(root).repo_operations[operation_id];
      store.startRepoOperation(root, {
        operation_id,
        attempt_id: operation.attempt_id,
        process_identity: { pid: 1, pgid: 1, started_at: 1 },
        log_path: path.join(root, `${operation_id}.log`),
        target_sha: operation_id === 'descendant-deploy' ? TARGET : HEAD
      });
    }
    const descendant =
      store.snapshot(root).repo_operations['descendant-deploy'];
    store.settleRepoOperation(root, {
      operation_id: 'descendant-deploy',
      attempt_id: descendant.attempt_id,
      exit_code: 0,
      signal: null
    });
    for (const operation_id of ['repairing-deploy', 'covered-deploy']) {
      const operation = store.snapshot(root).repo_operations[operation_id];
      store.settleRepoOperation(root, {
        operation_id,
        attempt_id: operation.attempt_id,
        exit_code: 1,
        signal: null
      });
    }
    store.startRepoOperationRepair(root, {
      operation_id: 'repairing-deploy',
      mode: 'manual'
    });
    store.supersedeRepoOperation(root, {
      operation_id: 'covered-deploy',
      successor_id: 'original-successor'
    });

    await coordinator.reconcile(root);

    const operations = store.snapshot(root).repo_operations;
    expect(operations['late-failed']).toMatchObject({
      state: 'retry_pending',
      superseded_by: null
    });
    expect(operations['repairing-deploy']).toMatchObject({
      state: 'repairing',
      superseded_by: null
    });
    expect(operations['covered-deploy'].superseded_by).toBe(
      'original-successor'
    );
  });

  test('refuses automatic and manual repair for a superseded failure', async () => {
    const dispatch = vi.fn(async () => ({
      ok: true,
      attempt_id: 'att-1',
      session_id: 'sess-1'
    }));
    const { store, coordinator } = coordinatorFor({
      repairSession: {
        dispatch,
        judge: vi.fn(async () => ({ verdict: 'unresolved', evidence: null }))
      }
    });
    store.ensureRepoOperation(root, {
      operation_id: 'failed-deploy',
      repo_id: root,
      kind: 'deploy',
      subjects: [{ bead_id: 'UI-1', merged_sha: HEAD }],
      effective_base_sha: BASE,
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: '5'.repeat(40)
    });
    const operation = store.snapshot(root).repo_operations['failed-deploy'];
    store.settleRepoOperation(root, {
      operation_id: 'failed-deploy',
      attempt_id: operation.attempt_id,
      exit_code: 1,
      signal: null,
      failure: {
        code: 'script_failed',
        fingerprint: 'f'.repeat(64),
        detail: '',
        interrupted: false
      }
    });
    store.supersedeRepoOperation(root, {
      operation_id: 'failed-deploy',
      successor_id: 'descendant-deploy'
    });

    const automatic = await coordinator.startRepair('failed-deploy', 'auto');
    const manual = await coordinator.startRepair('failed-deploy', 'manual');

    expect([automatic.code, manual.code, dispatch.mock.calls.length]).toEqual([
      'repo_operation_superseded',
      'repo_operation_superseded',
      0
    ]);
  });

  test('coalesces uncovered subjects into one queued deploy target', async () => {
    const gitRun = vi.fn(async (args) => {
      if (args[0] === 'merge-base') {
        return { code: 0, stdout: '', stderr: '' };
      }
      if (args[0] === 'show') {
        return { code: 0, stdout: CONFIG, stderr: '' };
      }
      if (args[0] === 'ls-tree') {
        const entry =
          args.at(-1) === 'repo-ops/config.toml'
            ? `100644 blob ${'c'.repeat(40)}\trepo-ops/config.toml`
            : `100755 blob ${'d'.repeat(40)}\trepo-ops/script/deploy`;
        return { code: 0, stdout: entry, stderr: '' };
      }
      return { code: 1, stdout: '', stderr: 'unexpected' };
    });
    const { store, coordinator } = coordinatorFor({ gitRun });
    store.ensureRepoOperation(root, {
      operation_id: 'previous',
      repo_id: root,
      kind: 'deploy',
      subjects: [{ bead_id: 'UI-old', merged_sha: APPROVED }],
      effective_base_sha: APPROVED,
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: 'd'.repeat(40)
    });
    const previous = store.snapshot(root).repo_operations.previous;
    store.startRepoOperation(root, {
      operation_id: 'previous',
      attempt_id: previous.attempt_id,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: path.join(root, 'previous.log'),
      target_sha: APPROVED
    });
    store.settleRepoOperation(root, {
      operation_id: 'previous',
      attempt_id: previous.attempt_id,
      exit_code: 0,
      signal: null
    });
    store.ensureRepoOperation(root, {
      operation_id: 'blocker',
      repo_id: root,
      kind: 'deploy',
      subjects: [{ bead_id: 'UI-blocker', merged_sha: APPROVED }],
      effective_base_sha: APPROVED,
      target_base: 'other',
      script_mode: '100755',
      script_blob_sha: 'd'.repeat(40)
    });
    const blocker = store.snapshot(root).repo_operations.blocker;
    store.startRepoOperation(root, {
      operation_id: 'blocker',
      attempt_id: blocker.attempt_id,
      process_identity: { pid: 2, pgid: 2, started_at: 1 },
      log_path: path.join(root, 'blocker.log'),
      target_sha: APPROVED
    });

    const first = await coordinator.ensureDeploy({
      target_base: 'main',
      subjects: [{ bead_id: 'UI-1', merged_sha: HEAD }]
    });
    const second = await coordinator.ensureDeploy({
      target_base: 'main',
      subjects: [{ bead_id: 'UI-2', merged_sha: FINAL }]
    });

    expect(second.operation_id).toBe(first.operation_id);
    expect(
      store.snapshot(root).repo_operations[first.operation_id].subjects
    ).toEqual([
      { bead_id: 'UI-1', merged_sha: HEAD },
      { bead_id: 'UI-2', merged_sha: FINAL }
    ]);
  });

  test('consumes a valid spool request into a provenance prerecord and receipt', async () => {
    const { store, coordinator } = coordinatorFor();
    spoolRequest(validRequest());

    await coordinator.reconcile(root);

    const operations = Object.values(store.snapshot(root).repo_operations);
    expect(operations).toHaveLength(1);
    expect(operations[0]).toMatchObject({
      state: 'running',
      target_sha: TARGET,
      bootstrap_provenance: {
        approved_source_path: 'docs/spec.md',
        approved_source_sha: APPROVED,
        requested_by: 'operator'
      }
    });
    const processed = repoOpsSpoolProcessedDir(root);
    const receipt = JSON.parse(
      fs.readFileSync(path.join(processed, 'req-1.receipt.json'), 'utf8')
    );
    expect(receipt.ok).toBe(true);
    expect(typeof receipt.operation_id).toBe('string');
    expect(fs.existsSync(path.join(processed, 'req-1.request.json'))).toBe(
      true
    );
    expect(fs.readdirSync(repoOpsSpoolPendingDir(root))).toHaveLength(0);
  });

  test('rejects an unknown approved source without creating any record', async () => {
    const { store, coordinator } = coordinatorFor({
      gitRun: gitForBootstrap({ known_shas: [] })
    });
    spoolRequest(validRequest());

    await coordinator.reconcile(root);

    expect(store.snapshot(root).repo_operations).toEqual({});
    const receipt = JSON.parse(
      fs.readFileSync(
        path.join(repoOpsSpoolProcessedDir(root), 'req-1.receipt.json'),
        'utf8'
      )
    );
    expect(receipt).toMatchObject({
      ok: false,
      code: 'bootstrap_provenance_invalid'
    });
  });

  test('rejects a spool request bound to a foreign repo path', async () => {
    const foreign = fs.mkdtempSync(path.join(os.tmpdir(), 'foreign-repo-'));
    const { store, coordinator } = coordinatorFor();
    spoolRequest(validRequest({ repo: foreign }));

    await coordinator.reconcile(root);

    expect(store.snapshot(root).repo_operations).toEqual({});
    const receipt = JSON.parse(
      fs.readFileSync(
        path.join(repoOpsSpoolProcessedDir(root), 'req-1.receipt.json'),
        'utf8'
      )
    );
    expect(receipt).toMatchObject({
      ok: false,
      code: 'bootstrap_provenance_invalid'
    });
    fs.rmSync(foreign, { recursive: true, force: true });
  });

  test('refuses a bootstrap-classified deploy without provenance', async () => {
    const { store, coordinator } = coordinatorFor();

    const result = await coordinator.ensureDeploy({
      target_base: 'main',
      subjects: [{ bead_id: 'UI-x', merged_sha: TARGET }]
    });

    expect(result).toMatchObject({ ok: false, code: 'bootstrap_not_approved' });
    expect(store.snapshot(root).repo_operations).toEqual({});
  });

  test('reopens a failed bootstrap operation on a fresh approved request', async () => {
    const { store, coordinator } = coordinatorFor();
    spoolRequest(validRequest());
    await coordinator.reconcile(root);
    const [operation_id] = Object.keys(store.snapshot(root).repo_operations);
    const attempt_id =
      store.snapshot(root).repo_operations[operation_id].attempt_id;
    store.settleRepoOperation(root, {
      operation_id,
      attempt_id,
      exit_code: 1,
      signal: null,
      failure: {
        code: 'repo_ops_worktree_unowned',
        fingerprint: 'f',
        detail: '',
        interrupted: false
      }
    });
    expect(store.snapshot(root).repo_operations[operation_id].state).toBe(
      'failed'
    );

    spoolRequest(validRequest({ request_id: 'req-2' }));
    await coordinator.reconcile(root);

    const operation = store.snapshot(root).repo_operations[operation_id];
    expect(operation.state).not.toBe('failed');
    expect(operation.failure).toBeNull();
  });

  test('settles a running operation from its terminal marker with digest evidence', async () => {
    const log_path = path.join(root, 'operation.log');
    fs.writeFileSync(log_path, 'deploy output\n');
    const { store, coordinator } = coordinatorFor({
      runner: {
        start: () => ({ ok: false, code: 'unused' }),
        readMarker: () => ({
          exit_code: 0,
          signal: null,
          started_at: 1,
          finished_at: 2
        }),
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    store.ensureRepoOperation(root, {
      operation_id: 'op-1',
      repo_id: root,
      kind: 'deploy',
      subjects: [{ bead_id: 'UI-x', merged_sha: TARGET }],
      effective_base_sha: TARGET,
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: 'd'.repeat(40)
    });
    const attempt_id = store.snapshot(root).repo_operations['op-1'].attempt_id;
    store.startRepoOperation(root, {
      operation_id: 'op-1',
      attempt_id,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path,
      target_sha: TARGET
    });

    await coordinator.reconcile(root);

    const settled = store.snapshot(root).repo_operations['op-1'];
    expect(settled).toMatchObject({ state: 'succeeded', exit_code: 0 });
    expect(settled.log_digest).toMatch(/^[0-9a-f]{64}$/);
  });

  test('fails a zero-exit deploy whose worktree readback is not aligned', async () => {
    const { store, coordinator } = coordinatorFor({
      runner: {
        start: () => ({ ok: false, code: 'unused' }),
        readMarker: () => ({
          exit_code: 0,
          signal: null,
          started_at: 1,
          finished_at: 2
        }),
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    const misaligned = createRepoOperationCoordinator({
      workspace: root,
      repo: root,
      store,
      locks: createLockManager(),
      gitRun: gitForBootstrap(),
      runner: /** @type {never} */ ({
        start: () => ({ ok: false, code: 'unused' }),
        readMarker: () => ({
          exit_code: 0,
          signal: null,
          started_at: 1,
          finished_at: 2
        }),
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }),
      deployWorktree: /** @type {never} */ ({
        bindTarget: async () => ({ ok: true, target_sha: TARGET }),
        ensureAligned: async () => ({ ok: true, path: root }),
        verifyAligned: async () => ({ ok: false })
      })
    });
    void coordinator;
    store.ensureRepoOperation(root, {
      operation_id: 'op-1',
      repo_id: root,
      kind: 'deploy',
      subjects: [{ bead_id: 'UI-x', merged_sha: TARGET }],
      effective_base_sha: TARGET,
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: 'd'.repeat(40)
    });
    const attempt_id = store.snapshot(root).repo_operations['op-1'].attempt_id;
    store.startRepoOperation(root, {
      operation_id: 'op-1',
      attempt_id,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: path.join(root, 'operation.log'),
      target_sha: TARGET
    });

    await misaligned.reconcile(root);

    expect(store.snapshot(root).repo_operations['op-1']).toMatchObject({
      state: 'retry_pending',
      retry: { first_failure: { code: 'deploy_worktree_residue' } }
    });
  });

  test('records a marker-less dead process for one script retry before respawning', async () => {
    /** @type {object[]} */
    const start_calls = [];
    const { store, coordinator } = coordinatorFor({
      runner: {
        start: (/** @type {object} */ input) => {
          start_calls.push(input);
          return { ok: false, code: 'unused' };
        },
        readMarker: () => null,
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'gone' }) }
      }
    });
    store.ensureRepoOperation(root, {
      operation_id: 'op-1',
      repo_id: root,
      kind: 'deploy',
      subjects: [{ bead_id: 'UI-x', merged_sha: TARGET }],
      effective_base_sha: TARGET,
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: 'd'.repeat(40)
    });
    const attempt_id = store.snapshot(root).repo_operations['op-1'].attempt_id;
    store.startRepoOperation(root, {
      operation_id: 'op-1',
      attempt_id,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: path.join(root, 'operation.log')
    });

    await coordinator.reconcile(root);

    const settled = store.snapshot(root).repo_operations['op-1'];
    expect(settled).toMatchObject({
      state: 'retry_pending',
      retry: { first_failure: { code: 'interrupted', interrupted: true } }
    });
    expect(settled.retry?.first_fingerprint).toMatch(/^[0-9a-f]{64}$/);
    expect(start_calls).toHaveLength(0);
  });

  test('adopts a queued record whose launch handshake process is still alive', async () => {
    /** @type {object[]} */
    const start_calls = [];
    const { store, coordinator } = coordinatorFor({
      runner: {
        start: (/** @type {object} */ input) => {
          start_calls.push(input);
          return { ok: false, code: 'unused' };
        },
        readMarker: () => null,
        readLaunchMarker: () => ({ pid: 42, pgid: 42, started_at: 1 }),
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    store.ensureRepoOperation(root, {
      operation_id: 'op-1',
      repo_id: root,
      kind: 'deploy',
      subjects: [{ bead_id: 'UI-x', merged_sha: TARGET }],
      effective_base_sha: TARGET,
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: 'd'.repeat(40)
    });

    await coordinator.reconcile(root);

    const adopted = store.snapshot(root).repo_operations['op-1'];
    expect(adopted).toMatchObject({
      state: 'running',
      process_identity: { pid: 42, pgid: 42 }
    });
    expect(start_calls).toHaveLength(0);
  });

  test('relaunches a stuck queued record and settles a pre-spawn failure durably', async () => {
    const { store, coordinator } = coordinatorFor({
      runner: {
        start: () => ({ ok: false, code: 'repo_operation_spawn_failed' }),
        readMarker: () => null,
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    store.ensureRepoOperation(root, {
      operation_id: 'op-1',
      repo_id: root,
      kind: 'deploy',
      subjects: [{ bead_id: 'UI-x', merged_sha: TARGET }],
      effective_base_sha: TARGET,
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: 'd'.repeat(40)
    });

    await coordinator.reconcile(root);

    const settled = store.snapshot(root).repo_operations['op-1'];
    expect(settled).toMatchObject({
      state: 'failed',
      failure: { code: 'repo_operation_spawn_failed' }
    });
    expect(settled.failure?.fingerprint).toMatch(/^[0-9a-f]{64}$/);
  });

  test('records retry pending before consuming the retry immediately before respawn', async () => {
    /** @type {string[]} */
    const order = [];
    const runner = {
      start: vi.fn(() => {
        order.push('spawn');
        return {
          ok: true,
          process_identity: { pid: 2, pgid: 2, started_at: 2 },
          log_path: path.join(root, 'operation.log')
        };
      }),
      readMarker: () => ({ exit_code: 2, signal: null }),
      readLaunchMarker: () => null,
      processController: { probe: () => ({ state: 'owned' }) }
    };
    const { store, coordinator } = coordinatorFor({ runner });
    store.ensureRepoOperation(root, {
      operation_id: 'op-1',
      repo_id: root,
      kind: 'deploy',
      subjects: [{ bead_id: 'UI-x', merged_sha: TARGET }],
      effective_base_sha: TARGET,
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: 'd'.repeat(40)
    });
    const attempt_id = store.snapshot(root).repo_operations['op-1'].attempt_id;
    store.startRepoOperation(root, {
      operation_id: 'op-1',
      attempt_id,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: path.join(root, 'operation.log'),
      target_sha: TARGET
    });

    await coordinator.reconcile(root);

    expect(store.snapshot(root).repo_operations['op-1']).toMatchObject({
      state: 'retry_pending',
      retry: { consumed_key: null }
    });

    const consume = store.consumeRepoOperationRetry.bind(store);
    store.consumeRepoOperationRetry = (workspace, input) => {
      order.push('consume');
      return consume(workspace, input);
    };
    runner.readMarker = /** @type {any} */ (() => null);
    await coordinator.reconcile(root);

    expect(order).toEqual(['consume', 'spawn']);
  });

  test('retries after restart between retry-pending and consumption', async () => {
    const runner = {
      start: vi.fn(() => ({
        ok: true,
        process_identity: { pid: 2, pgid: 2, started_at: 2 },
        log_path: path.join(root, 'operation.log')
      })),
      readMarker: () => ({ exit_code: 2, signal: null }),
      readLaunchMarker: () => null,
      processController: { probe: () => ({ state: 'owned' }) }
    };
    const { store, coordinator } = coordinatorFor({ runner });
    store.ensureRepoOperation(root, {
      operation_id: 'op-1',
      repo_id: root,
      kind: 'deploy',
      subjects: [{ bead_id: 'UI-x', merged_sha: TARGET }],
      effective_base_sha: TARGET,
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: 'd'.repeat(40)
    });
    const attempt_id = store.snapshot(root).repo_operations['op-1'].attempt_id;
    store.startRepoOperation(root, {
      operation_id: 'op-1',
      attempt_id,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: path.join(root, 'operation.log'),
      target_sha: TARGET
    });
    await coordinator.reconcile(root);
    runner.readMarker = /** @type {any} */ (() => null);

    await coordinator.reconcile(root);

    expect(runner.start).toHaveBeenCalledTimes(1);
    expect(store.snapshot(root).repo_operations['op-1'].state).toBe('running');
  });

  test('settles the first failure after restart between consumption and spawn', async () => {
    const runner = {
      start: vi.fn(),
      readMarker: () => null,
      readLaunchMarker: () => null,
      processController: { probe: () => ({ state: 'gone' }) }
    };
    const { store, coordinator } = coordinatorFor({ runner });
    store.ensureRepoOperation(root, {
      operation_id: 'op-1',
      repo_id: root,
      kind: 'deploy',
      subjects: [{ bead_id: 'UI-x', merged_sha: TARGET }],
      effective_base_sha: TARGET,
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: 'd'.repeat(40)
    });
    const attempt_id = store.snapshot(root).repo_operations['op-1'].attempt_id;
    store.startRepoOperation(root, {
      operation_id: 'op-1',
      attempt_id,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: path.join(root, 'operation.log'),
      target_sha: TARGET
    });
    store.deferRepoOperationRetry(root, {
      operation_id: 'op-1',
      attempt_id,
      exit_code: 2,
      signal: null,
      failure: {
        code: 'script_failed',
        fingerprint: 'f'.repeat(64),
        detail: '',
        interrupted: false
      }
    });
    store.consumeRepoOperationRetry(root, {
      operation_id: 'op-1',
      attempt_id,
      consumed_key: [attempt_id, TARGET, `${'d'.repeat(40)}:100755`]
    });

    await coordinator.reconcile(root);

    expect(store.snapshot(root).repo_operations['op-1']).toMatchObject({
      state: 'failed',
      failure: { code: 'script_failed' }
    });
    expect(runner.start).not.toHaveBeenCalled();
  });

  test('settles after restart between retry spawn and its terminal marker', async () => {
    const runner = {
      start: vi.fn(),
      readMarker: () => null,
      readLaunchMarker: () => null,
      processController: { probe: () => ({ state: 'gone' }) }
    };
    const { store, coordinator } = coordinatorFor({ runner });
    store.ensureRepoOperation(root, {
      operation_id: 'op-1',
      repo_id: root,
      kind: 'deploy',
      subjects: [{ bead_id: 'UI-x', merged_sha: TARGET }],
      effective_base_sha: TARGET,
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: 'd'.repeat(40)
    });
    const attempt_id = store.snapshot(root).repo_operations['op-1'].attempt_id;
    store.startRepoOperation(root, {
      operation_id: 'op-1',
      attempt_id,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: path.join(root, 'operation.log'),
      target_sha: TARGET
    });
    store.deferRepoOperationRetry(root, {
      operation_id: 'op-1',
      attempt_id,
      exit_code: 2,
      signal: null,
      failure: {
        code: 'script_failed',
        fingerprint: 'f'.repeat(64),
        detail: '',
        interrupted: false
      }
    });
    store.consumeRepoOperationRetry(root, {
      operation_id: 'op-1',
      attempt_id,
      consumed_key: [attempt_id, TARGET, `${'d'.repeat(40)}:100755`]
    });
    store.startRepoOperation(root, {
      operation_id: 'op-1',
      attempt_id,
      process_identity: { pid: 2, pgid: 2, started_at: 2 },
      log_path: path.join(root, 'operation.log'),
      target_sha: TARGET
    });

    await coordinator.reconcile(root);

    expect(store.snapshot(root).repo_operations['op-1'].state).toBe('failed');
    expect(runner.start).not.toHaveBeenCalled();
  });

  test.each([
    ['auto_repair_off', false, true],
    ['schema_unsupported', true, false]
  ])(
    'settles directly into the user stage when %s blocks automatic steps',
    async (reason, auto_repair, supported) => {
      const runner = {
        start: vi.fn(),
        readMarker: () => ({ exit_code: 2, signal: null }),
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      };
      const { store, coordinator } = coordinatorFor({
        runner,
        policySupported: () => supported
      });
      store.ensureRepoOperation(root, {
        operation_id: 'op-1',
        repo_id: root,
        kind: 'deploy',
        subjects: [{ bead_id: 'UI-x', merged_sha: TARGET }],
        effective_base_sha: TARGET,
        target_base: 'main',
        script_mode: '100755',
        script_blob_sha: 'd'.repeat(40)
      });
      const attempt_id =
        store.snapshot(root).repo_operations['op-1'].attempt_id;
      store.startRepoOperation(root, {
        operation_id: 'op-1',
        attempt_id,
        process_identity: { pid: 1, pgid: 1, started_at: 1 },
        log_path: path.join(root, 'operation.log'),
        target_sha: TARGET
      });
      if (!auto_repair) {
        store.toggleAutoRepair(root, {
          expected_revision: store.snapshot(root).revision,
          on: false
        });
      }

      await coordinator.reconcile(root);

      expect(store.snapshot(root).repo_operations['op-1']).toMatchObject({
        state: 'failed',
        repair: { ladder_stage: 'user_triggered_session' },
        retry: { blocked_reason: reason }
      });
    }
  );
});

describe('RepoOperation acknowledgement and display cache (UI-q0uy §4.6)', () => {
  test('acknowledges one failed row through the coordinator', async () => {
    const { store, coordinator } = coordinatorFor();
    spoolRequest(validRequest());
    await coordinator.reconcile(root);
    const [operation_id] = Object.keys(store.snapshot(root).repo_operations);
    const attempt_id =
      store.snapshot(root).repo_operations[operation_id].attempt_id;
    store.settleRepoOperation(root, {
      operation_id,
      attempt_id,
      exit_code: 1,
      signal: null,
      failure: {
        code: 'repo_ops_worktree_unowned',
        fingerprint: 'f'.repeat(64),
        detail: '',
        interrupted: false
      }
    });

    const result = await coordinator.dismiss(operation_id);

    expect([
      result.ok,
      store.snapshot(root).repo_operations[operation_id].state
    ]).toEqual([true, 'failed']);
  });

  test('refuses to acknowledge a row that is not failed', async () => {
    const { store, coordinator } = coordinatorFor();
    spoolRequest(validRequest());
    await coordinator.reconcile(root);
    const [operation_id] = Object.keys(store.snapshot(root).repo_operations);

    const result = await coordinator.dismiss(operation_id);

    expect(result).toMatchObject({
      ok: false,
      code: 'repo_operation_not_failed'
    });
  });

  test('refuses to acknowledge an operation it does not have', async () => {
    const { coordinator } = coordinatorFor();

    const result = await coordinator.dismiss('nope');

    expect(result).toMatchObject({
      ok: false,
      code: 'repo_operation_missing'
    });
  });

  test('fills the display cache from the resolve a launch already did', async () => {
    const { coordinator } = coordinatorFor();
    spoolRequest(validRequest());

    await coordinator.reconcile(root);

    // A bootstrap is the one classification where the TARGET tree is the policy.
    expect(repoOpsDisplayFor(root)).toMatchObject({
      status: 'resolved',
      base_sha: TARGET,
      deploy: { script: 'repo-ops/script/deploy' }
    });
  });

  test('fills the cache at attach time from the resolved base tip', async () => {
    const { coordinator } = coordinatorFor();

    await coordinator.refreshDisplay({ base: 'main', sha: TARGET });

    expect(repoOpsDisplayFor(root)).toMatchObject({
      status: 'resolved',
      base_sha: TARGET
    });
  });

  test('never records a PR head as the declaration base (verify lane)', async () => {
    const { coordinator } = coordinatorFor({
      gitRun: gitForVerify({ verify: true }),
      verifyCheckout: { materialize: vi.fn(async () => ({ ok: false })) }
    });

    await coordinator.ensureVerify(verifyCandidate());

    // `target_sha` on this lane is the PR head/final SHA. Recording it would let
    // an unmerged PR define what the settings surface claims this repo declares.
    expect(repoOpsDisplayFor(root).base_sha).not.toBe(HEAD);
  });

  test('records the pinned previous base as the declaration base', async () => {
    const { coordinator } = coordinatorFor({
      gitRun: gitForVerify({ verify: true }),
      verifyCheckout: { materialize: vi.fn(async () => ({ ok: false })) }
    });

    await coordinator.ensureVerify(verifyCandidate());

    expect(repoOpsDisplayFor(root).base_sha).toBe(BASE);
  });

  test('records a failed resolve without claiming a base SHA', async () => {
    const { coordinator } = coordinatorFor({
      gitRun: async () => ({ code: 128, stdout: '', stderr: 'boom' }),
      verifyCheckout: { materialize: vi.fn(async () => ({ ok: false })) }
    });

    await coordinator.ensureVerify(verifyCandidate());

    expect([
      repoOpsDisplayFor(root).status,
      repoOpsDisplayFor(root).base_sha
    ]).toEqual(['error', null]);
  });

  test('records an unresolvable base as an error, not an absence', async () => {
    const { coordinator } = coordinatorFor();

    await coordinator.refreshDisplay({ base: 'main', sha: null });

    expect(repoOpsDisplayFor(root)).toMatchObject({
      status: 'error',
      error_code: 'repo_ops_base_unresolved'
    });
  });
});
