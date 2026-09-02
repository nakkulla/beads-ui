import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createLockManager } from './locks.js';
import { __resetQueueEventsForTest, onQueueChanged } from './queue-events.js';
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
const ADVANCED_HEAD = '8'.repeat(40);
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
  __resetQueueEventsForTest();
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(root, { recursive: true, force: true });
});

/**
 * Fake git that resolves the target tree's bootstrap policy and validates the
 * approved source against `known_shas`.
 *
 * @param {{ known_shas?: string[], config?: string, script_mode?: string, script_blob_sha?: string }} [options]
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
        ? { code: 0, stdout: options.config ?? CONFIG, stderr: '' }
        : { code: 128, stdout: '', stderr: 'missing' };
    }
    if (args[0] === 'ls-tree') {
      if (!String(args[1]).startsWith(TARGET)) {
        return { code: 0, stdout: '', stderr: '' };
      }
      const entry =
        args.at(-1) === 'repo-ops/config.toml'
          ? `100644 blob ${'c'.repeat(40)}\trepo-ops/config.toml`
          : `${options.script_mode ?? '100755'} blob ${options.script_blob_sha ?? 'd'.repeat(40)}\trepo-ops/script/deploy`;
      return { code: 0, stdout: entry, stderr: '' };
    }
    return { code: 1, stdout: '', stderr: 'unexpected' };
  };
}

/**
 * Wrap the bootstrap git fake with an explicit ancestry table. A pair absent
 * from the table answers `ancestor`, which is what every existing deploy test
 * already assumes.
 *
 * @param {Record<string, boolean|'error'>} pairs - `'<ancestor>-><descendant>'`.
 * @param {{ known_shas?: string[], config?: string, script_mode?: string, script_blob_sha?: string }} [options]
 */
function gitWithAncestry(pairs, options = {}) {
  const base_git = gitForBootstrap(options);
  /**
   * @param {string[]} args
   */
  return async (args) => {
    if (args[0] === 'merge-base' && args[1] === '--is-ancestor') {
      const key = `${args[2]}->${args[3]}`;
      const answer = Object.hasOwn(pairs, key) ? pairs[key] : true;
      if (answer === 'error') {
        return { code: 128, stdout: '', stderr: 'ancestry probe failed' };
      }
      return { code: answer ? 0 : 1, stdout: '', stderr: '' };
    }
    return base_git(args);
  };
}

/**
 * @param {{ gitRun?: (args: string[], options: object) => Promise<{ code: number, stdout: string, stderr: string }>, runner?: object, transition?: object, verifyCheckout?: object, autoAdvanceRestore?: { beforeReconcile: (workspace: string) => void, afterReconcileLocked: (workspace: string) => Promise<boolean>, restoreAll: () => Promise<void> }, locks?: ReturnType<typeof createLockManager>, policySupported?: () => boolean, notify?: any, timeline?: any, deployWorktree?: object, deployLock?: (input: any) => Promise<any>, resolveBase?: (options?: { force?: boolean }) => Promise<any>, now?: () => number, storeNow?: () => number, sleep?: (ms: number) => Promise<void> }} [overrides]
 */
function coordinatorFor(overrides = {}) {
  const store = createQueueStore({
    filePathFor: (workspace) => path.join(workspace, 'queue.json'),
    now: overrides.storeNow
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
    locks: overrides.locks ?? createLockManager(),
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
    deployWorktree: /** @type {never} */ (
      overrides.deployWorktree ?? {
        bindTarget: async () => ({ ok: true, target_sha: TARGET }),
        readState: async () => ({ ok: true, head: null, clean: true }),
        ensureAligned: async () => ({
          ok: true,
          path: path.join(root, '.worktrees', '.repo-ops-deploy'),
          target_sha: TARGET
        }),
        verifyCovered: async () => ({ ok: true }),
        verifyAligned: async () => ({ ok: true })
      }
    ),
    deployLock: overrides.deployLock,
    resolveBase: overrides.resolveBase,
    verifyCheckout: /** @type {never} */ (overrides.verifyCheckout),
    autoAdvanceRestore: overrides.autoAdvanceRestore,
    policySupported: overrides.policySupported,
    notify: overrides.notify,
    timeline: overrides.timeline,
    now: overrides.now,
    sleep: overrides.sleep
  });
  return { store, coordinator };
}

describe('repo operation auto-advance restore handoff', () => {
  test('reports around the locked pass and restores after releasing the lock', async () => {
    /** @type {string[]} */
    const order = [];
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
    const autoAdvanceRestore = {
      beforeReconcile: vi.fn(() => {
        expect(locked).toBe(true);
        order.push('before');
      }),
      afterReconcileLocked: vi.fn(async () => {
        expect(locked).toBe(true);
        order.push('after');
        return true;
      }),
      restoreAll: vi.fn(async () => {
        expect(locked).toBe(false);
        order.push('restore');
      })
    };
    const { coordinator } = coordinatorFor({ locks, autoAdvanceRestore });

    await coordinator.reconcile(root);

    expect(order).toEqual(['before', 'after', 'restore']);
  });
});

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
  test('waits for a running deploy to reconcile terminal marker evidence', async () => {
    let now_ms = 0;
    /** @type {{ exit_code: number, signal: null }|null} */
    let marker = null;
    const sleep = vi.fn(async (ms) => {
      now_ms += ms;
      marker = { exit_code: 0, signal: null };
    });
    const { coordinator } = coordinatorFor({
      now: () => now_ms,
      sleep,
      runner: {
        start: vi.fn(async () => ({
          ok: true,
          process_identity: { pid: 1, pgid: 1, started_at: 1 },
          log_path: path.join(root, 'deploy.log')
        })),
        readMarker: () => marker,
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    const started = await coordinator.ensureDeploy({
      target_base: 'main',
      target_sha: TARGET,
      subjects: [{ bead_id: 'UI-1', merged_sha: HEAD }],
      bootstrap_provenance: {
        approved_source_path: 'docs/spec.md',
        approved_source_sha: APPROVED,
        requested_by: 'operator',
        requested_at: 1
      }
    });

    const evidence = await coordinator.waitForDeployTerminal(
      started.operation_id,
      {
        target_base: 'main',
        merged_sha: HEAD,
        timeout_ms: 100,
        poll_ms: 1
      }
    );

    expect(evidence).toMatchObject({
      state: 'succeeded',
      operation_id: started.operation_id
    });
    expect(sleep).toHaveBeenCalledOnce();
  });

  test('returns the last nonterminal deploy evidence at the bounded deadline', async () => {
    let now_ms = 0;
    const sleep = vi.fn(async (ms) => {
      now_ms += ms;
    });
    const { coordinator } = coordinatorFor({
      now: () => now_ms,
      sleep,
      runner: {
        start: vi.fn(async () => ({
          ok: true,
          process_identity: { pid: 1, pgid: 1, started_at: 1 },
          log_path: path.join(root, 'deploy.log')
        })),
        readMarker: () => null,
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    const started = await coordinator.ensureDeploy({
      target_base: 'main',
      target_sha: TARGET,
      subjects: [{ bead_id: 'UI-1', merged_sha: HEAD }],
      bootstrap_provenance: {
        approved_source_path: 'docs/spec.md',
        approved_source_sha: APPROVED,
        requested_by: 'operator',
        requested_at: 1
      }
    });

    const evidence = await coordinator.waitForDeployTerminal(
      started.operation_id,
      {
        target_base: 'main',
        merged_sha: HEAD,
        timeout_ms: 1,
        poll_ms: 10_000
      }
    );

    expect(evidence).toEqual({
      state: 'running',
      operation_id: started.operation_id
    });
    expect(sleep).toHaveBeenCalledWith(5001);
  });

  test('finds only the earliest exact deploy subject and restores its pinned timeout', async () => {
    let requested_at = 0;
    const { store, coordinator } = coordinatorFor({
      storeNow: () => requested_at,
      gitRun: gitForBootstrap({
        config: `${CONFIG}\ntimeout_ms = 4321`
      })
    });
    const candidates = [
      {
        operation_id: 'foreign-repo',
        repo_id: path.join(root, 'foreign'),
        bead_id: 'UI-1',
        merged_sha: HEAD
      },
      {
        operation_id: 'other-bead',
        repo_id: root,
        bead_id: 'UI-2',
        merged_sha: HEAD
      },
      {
        operation_id: 'other-merge',
        repo_id: root,
        bead_id: 'UI-1',
        merged_sha: FINAL
      },
      {
        operation_id: 'exact-origin',
        repo_id: root,
        bead_id: 'UI-1',
        merged_sha: HEAD
      },
      {
        operation_id: 'exact-later',
        repo_id: root,
        bead_id: 'UI-1',
        merged_sha: HEAD
      }
    ];
    for (const candidate of candidates) {
      requested_at += 1;
      store.ensureRepoOperation(root, {
        operation_id: candidate.operation_id,
        repo_id: candidate.repo_id,
        kind: 'deploy',
        subjects: [
          {
            bead_id: candidate.bead_id,
            merged_sha: candidate.merged_sha
          }
        ],
        effective_base_sha: TARGET,
        target_base: 'main',
        script_path: 'repo-ops/script/deploy',
        script_mode: '100755',
        script_blob_sha: 'd'.repeat(40)
      });
    }

    const found = await coordinator.findExactDeployOperation({
      target_base: 'main',
      bead_id: 'UI-1',
      merged_sha: HEAD
    });

    expect(found).toEqual({
      operation_id: 'exact-origin',
      timeout_ms: 4321
    });
  });

  test('keeps a superseded exact origin for descendant success evidence', async () => {
    let requested_at = 0;
    const { store, coordinator } = coordinatorFor({
      storeNow: () => requested_at,
      gitRun: gitForBootstrap({
        config: `${CONFIG}\ntimeout_ms = 4321`
      })
    });
    for (const operation_id of ['origin', 'successor']) {
      requested_at += 1;
      store.ensureRepoOperation(root, {
        operation_id,
        repo_id: root,
        kind: 'deploy',
        subjects: [{ bead_id: 'UI-1', merged_sha: HEAD }],
        effective_base_sha: TARGET,
        target_base: 'main',
        script_path: 'repo-ops/script/deploy',
        script_mode: '100755',
        script_blob_sha: 'd'.repeat(40)
      });
    }
    const origin = store.snapshot(root).repo_operations.origin;
    store.settleRepoOperation(root, {
      operation_id: 'origin',
      attempt_id: origin.attempt_id,
      exit_code: 1,
      signal: null
    });
    const successor = store.snapshot(root).repo_operations.successor;
    store.startRepoOperation(root, {
      operation_id: 'successor',
      attempt_id: successor.attempt_id,
      process_identity: { pid: 2, pgid: 2, started_at: 1 },
      log_path: path.join(root, 'successor.log'),
      target_sha: TARGET
    });
    store.settleRepoOperation(root, {
      operation_id: 'successor',
      attempt_id: successor.attempt_id,
      exit_code: 0,
      signal: null
    });
    store.supersedeRepoOperation(root, {
      operation_id: 'origin',
      successor_id: 'successor'
    });

    const found = await coordinator.findExactDeployOperation({
      target_base: 'main',
      bead_id: 'UI-1',
      merged_sha: HEAD
    });
    const evidence = await coordinator.deploymentEvidence(
      /** @type {any} */ (found).operation_id,
      { target_base: 'main', merged_sha: HEAD }
    );

    expect(found).toEqual({ operation_id: 'origin', timeout_ms: 4321 });
    expect(evidence).toEqual({
      state: 'succeeded',
      operation_id: 'successor',
      covered_operation_id: 'origin'
    });
  });

  test.each([
    [
      'missing pinned config',
      async (/** @type {string[]} */ args) =>
        args[0] === 'ls-tree'
          ? { code: 0, stdout: '', stderr: '' }
          : { code: 128, stdout: '', stderr: 'missing' }
    ],
    [
      'mismatched script identity',
      gitForBootstrap({ script_blob_sha: 'e'.repeat(40) })
    ],
    [
      'invalid pinned timeout',
      gitForBootstrap({ config: `${CONFIG}\ntimeout_ms = 0` })
    ]
  ])(
    'fails closed for %s during exact deploy lookup',
    async (_label, gitRun) => {
      const { store, coordinator } = coordinatorFor({ gitRun });
      store.ensureRepoOperation(root, {
        operation_id: 'origin',
        repo_id: root,
        kind: 'deploy',
        subjects: [{ bead_id: 'UI-1', merged_sha: HEAD }],
        effective_base_sha: TARGET,
        target_base: 'main',
        script_path: 'repo-ops/script/deploy',
        script_mode: '100755',
        script_blob_sha: 'd'.repeat(40)
      });

      const found = await coordinator.findExactDeployOperation({
        target_base: 'main',
        bead_id: 'UI-1',
        merged_sha: HEAD
      });

      expect(found).toEqual({
        operation_id: 'origin',
        code: 'repo_operation_timeout_unresolved'
      });
    }
  );

  // The deploy-only declaration every caller must be able to tell apart from a
  // declared `[verify]`: `null` here is what lets the cleanup skip the verify
  // stage instead of demanding a verify candidate it can never build.
  test('reports a deploy-only base as present with no verify script', async () => {
    const { coordinator } = coordinatorFor({ gitRun: gitForBootstrap() });

    const result = await coordinator.hasConfig(TARGET);

    expect(result).toEqual({
      ok: true,
      present: true,
      verify_script_path: null,
      verify_timeout_ms: null,
      verify_opted_out: false,
      deploy_opted_out: false
    });
  });

  test('keeps the latest-started hasConfig display after out-of-order completion', async () => {
    /** @type {(value?: void) => void} */
    let release = () => {};
    const blocked = new Promise((resolve) => {
      release = resolve;
    });
    const baseGit = gitForVerify({ verify: true });
    let first_call = true;
    const gitRun = vi.fn(async (args) => {
      if (first_call) {
        first_call = false;
        await blocked;
      }
      return baseGit(args);
    });
    const { coordinator } = coordinatorFor({ gitRun });
    /** @type {string[]} */
    const seen = [];
    onQueueChanged((workspace) => seen.push(workspace));

    const older = coordinator.hasConfig(BASE, { current_target_base: true });
    const newer = coordinator.hasConfig(HEAD, { current_target_base: true });
    await newer;
    release();
    await older;

    expect(repoOpsDisplayFor(root).base_sha).toBe(HEAD);
    expect(seen).toEqual([root]);
  });

  test('keeps an invalid current-base display through historical and effective lookups', async () => {
    const gitRun = vi.fn(async (args) => {
      const revision = String(args[1]).split(':')[0];
      if (args[0] === 'show' && revision === HEAD) {
        return { code: 0, stdout: '[verify', stderr: '' };
      }
      return { code: args[0] === 'ls-tree' ? 0 : 128, stdout: '', stderr: '' };
    });
    const { coordinator } = coordinatorFor({
      gitRun,
      verifyCheckout: { materialize: vi.fn() }
    });

    await coordinator.hasConfig(HEAD, { current_target_base: true });
    await coordinator.hasConfig(BASE);
    await coordinator.ensureVerify(verifyCandidate());

    expect(repoOpsDisplayFor(root)).toMatchObject({
      status: 'error',
      base_sha: HEAD,
      error_code: 'repo_ops_config_invalid'
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

  test('adopts one deterministic verify operation across concurrent callers', async () => {
    const runner = {
      start: vi.fn(async () => ({
        ok: true,
        process_identity: { pid: 1, pgid: 1, started_at: 1 },
        log_path: path.join(root, 'verify.log')
      })),
      readMarker: () => null,
      readLaunchMarker: () => null,
      processController: { probe: () => ({ state: 'owned' }) }
    };
    const { coordinator } = coordinatorFor({
      gitRun: gitForVerify({ verify: true }),
      runner,
      verifyCheckout: {
        materialize: vi.fn(async () => ({
          ok: true,
          path: root,
          tree_sha: TREE
        })),
        verify: vi.fn(async () => ({ ok: true })),
        cleanup: vi.fn(async () => {})
      }
    });

    const [poller_result, click_result] = await Promise.all([
      coordinator.ensureVerify(verifyCandidate()),
      coordinator.ensureVerify(verifyCandidate())
    ]);

    expect(poller_result).toMatchObject({ ok: true });
    expect(click_result).toMatchObject({ ok: true });
    expect(poller_result.operation_id).toBe(click_result.operation_id);
    expect(runner.start).toHaveBeenCalledTimes(1);
  });

  test('binds a same-tree head advance to an adopted verify operation', async () => {
    /** @type {{ exit_code: number, signal: null }|null} */
    let marker = null;
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
    const { store, coordinator } = coordinatorFor({
      gitRun: gitForVerify({ verify: true }),
      runner,
      verifyCheckout: {
        materialize: vi.fn(async () => ({
          ok: true,
          path: root,
          tree_sha: TREE
        })),
        verify: vi.fn(async () => ({ ok: true })),
        cleanup: vi.fn(async () => {})
      }
    });
    const initial = await coordinator.ensureVerify(verifyCandidate());

    const adopted = await coordinator.ensureVerify(
      verifyCandidate({ head_sha: ADVANCED_HEAD })
    );
    marker = { exit_code: 0, signal: null };
    await coordinator.reconcile(root);

    expect(adopted).toMatchObject({
      ok: true,
      adopted: true,
      operation_id: initial.operation_id
    });
    expect(
      store.snapshot(root).repo_operations[initial.operation_id]
        .verify_head_shas
    ).toEqual([HEAD, ADVANCED_HEAD]);
    expect(coordinator.verifyReceipt(initial.operation_id, HEAD)).toMatchObject(
      { state: 'succeeded', head_sha: HEAD }
    );
    expect(
      await coordinator.waitForTerminal(initial.operation_id, {
        head_sha: ADVANCED_HEAD,
        timeout_ms: 0
      })
    ).toMatchObject({ state: 'succeeded', head_sha: ADVANCED_HEAD });
    expect(
      coordinator.verifyReceipt(initial.operation_id, '9'.repeat(40))
    ).toBeNull();
    expect(
      await coordinator.waitForTerminal(initial.operation_id, {
        head_sha: '9'.repeat(40),
        timeout_ms: 0
      })
    ).toBeNull();
    expect(runner.start).toHaveBeenCalledTimes(1);
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

  test('returns the terminal deploy failure log path', async () => {
    const { store, coordinator } = coordinatorFor({
      gitRun: vi.fn(async () => ({ code: 1, stdout: '', stderr: '' }))
    });
    store.ensureRepoOperation(root, {
      operation_id: 'failed-deploy',
      repo_id: root,
      kind: 'deploy',
      subjects: [{ bead_id: 'UI-1', merged_sha: HEAD }],
      effective_base_sha: BASE,
      target_base: 'main',
      script_path: 'repo-ops/script/deploy',
      script_mode: '100755',
      script_blob_sha: '5'.repeat(40)
    });
    const operation = store.snapshot(root).repo_operations['failed-deploy'];
    store.startRepoOperation(root, {
      operation_id: 'failed-deploy',
      attempt_id: operation.attempt_id,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: path.join(root, 'failed.log'),
      target_sha: TARGET
    });
    store.settleRepoOperation(root, {
      operation_id: 'failed-deploy',
      attempt_id: operation.attempt_id,
      exit_code: 2,
      signal: null
    });

    const evidence = await coordinator.deploymentEvidence('failed-deploy', {
      target_base: 'main',
      merged_sha: HEAD
    });

    expect(evidence).toMatchObject({
      state: 'failed',
      code: 'runner_failed',
      log_path: path.join(root, 'failed.log')
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

  /**
   * Two stored verify rows for one PR line: `failed-verify` on HEAD and a
   * second row on ADVANCED_HEAD. The fake git answers ancestry only for
   * HEAD → ADVANCED_HEAD.
   *
   * @param {ReturnType<typeof coordinatorFor>['store']} store
   */
  function seedVerifyRows(store) {
    for (const [operation_id, head_sha] of [
      ['failed-verify', HEAD],
      ['descendant-verify', ADVANCED_HEAD]
    ]) {
      store.ensureRepoOperation(root, {
        operation_id,
        repo_id: root,
        kind: 'verify',
        subjects: [{ bead_id: 'UI-1', merged_sha: head_sha }],
        effective_base_sha: BASE,
        target_base: 'main',
        target_tree: operation_id === 'failed-verify' ? TREE : FINAL_TREE,
        verify_head_sha: head_sha,
        deploy_worktree: path.join(root, operation_id),
        script_path: 'repo-ops/script/verify',
        script_mode: '100755',
        script_blob_sha: '5'.repeat(40)
      });
    }
    const failed = store.snapshot(root).repo_operations['failed-verify'];
    store.startRepoOperation(root, {
      operation_id: 'failed-verify',
      attempt_id: failed.attempt_id,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: path.join(root, 'failed.log')
    });
    store.settleRepoOperation(root, {
      operation_id: 'failed-verify',
      attempt_id: failed.attempt_id,
      exit_code: 1,
      signal: null
    });
  }

  /** @param {string[]} ancestors - Head SHAs the fake git treats as ancestors of ADVANCED_HEAD. */
  function gitForVerifyAncestry(ancestors) {
    return vi.fn(async (/** @type {string[]} */ args) => ({
      code:
        args[0] === 'merge-base' &&
        ancestors.includes(String(args[2])) &&
        args[3] === ADVANCED_HEAD
          ? 0
          : 1,
      stdout: '',
      stderr: ''
    }));
  }

  test('supersedes an ancestor failed verify when a descendant head verifies green', async () => {
    const runner = {
      start: () => ({ ok: false, code: 'unused' }),
      readMarker: () => ({ exit_code: 0, signal: null }),
      readLaunchMarker: () => null,
      processController: { probe: () => ({ state: 'owned' }) }
    };
    const { store, coordinator } = coordinatorFor({
      runner,
      gitRun: gitForVerifyAncestry([HEAD]),
      verifyCheckout: {
        materialize: vi.fn(async () => ({
          ok: true,
          path: root,
          tree_sha: TREE
        })),
        verify: vi.fn(async () => ({ ok: true })),
        cleanup: vi.fn(async () => {})
      }
    });
    seedVerifyRows(store);
    const descendant =
      store.snapshot(root).repo_operations['descendant-verify'];
    store.startRepoOperation(root, {
      operation_id: 'descendant-verify',
      attempt_id: descendant.attempt_id,
      process_identity: { pid: 2, pgid: 2, started_at: 1 },
      log_path: path.join(root, 'descendant.log')
    });

    await coordinator.reconcile(root);

    const operations = store.snapshot(root).repo_operations;
    expect(operations['descendant-verify'].state).toBe('succeeded');
    expect(operations['failed-verify'].superseded_by).toBe('descendant-verify');
  });

  test('covers a stored failed verify against an existing success on first reconcile', async () => {
    const { store, coordinator } = coordinatorFor({
      gitRun: gitForVerifyAncestry([HEAD])
    });
    seedVerifyRows(store);
    const descendant =
      store.snapshot(root).repo_operations['descendant-verify'];
    store.startRepoOperation(root, {
      operation_id: 'descendant-verify',
      attempt_id: descendant.attempt_id,
      process_identity: { pid: 2, pgid: 2, started_at: 1 },
      log_path: path.join(root, 'descendant.log')
    });
    store.settleRepoOperation(root, {
      operation_id: 'descendant-verify',
      attempt_id: descendant.attempt_id,
      exit_code: 0,
      signal: null
    });
    expect(
      store.snapshot(root).repo_operations['failed-verify'].superseded_by
    ).toBeNull();

    await coordinator.reconcile(root);

    expect(
      store.snapshot(root).repo_operations['failed-verify'].superseded_by
    ).toBe('descendant-verify');
  });

  test('keeps a failed verify whose head is not an ancestor of the green head', async () => {
    const git = gitForVerifyAncestry([]);
    const { store, coordinator } = coordinatorFor({ gitRun: git });
    seedVerifyRows(store);
    const descendant =
      store.snapshot(root).repo_operations['descendant-verify'];
    store.startRepoOperation(root, {
      operation_id: 'descendant-verify',
      attempt_id: descendant.attempt_id,
      process_identity: { pid: 2, pgid: 2, started_at: 1 },
      log_path: path.join(root, 'descendant.log')
    });
    store.settleRepoOperation(root, {
      operation_id: 'descendant-verify',
      attempt_id: descendant.attempt_id,
      exit_code: 0,
      signal: null
    });

    await coordinator.reconcile(root);
    await coordinator.reconcile(root);

    expect(
      store.snapshot(root).repo_operations['failed-verify'].superseded_by
    ).toBeNull();
    expect(
      git.mock.calls.filter((call) => call[0][0] === 'merge-base')
    ).toHaveLength(1);
  });

  test('supersedes a failed deploy without a target sha when its subjects are carried', async () => {
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

  test('refuses to supersede a pre-bind failure a success only precedes', async () => {
    const runner = {
      start: () => ({ ok: false, code: 'unused' }),
      readMarker: () => ({ exit_code: 0, signal: null }),
      readLaunchMarker: () => null,
      processController: { probe: () => ({ state: 'owned' }) }
    };
    const { store, coordinator } = coordinatorFor({
      runner,
      gitRun: vi.fn(async (/** @type {string[]} */ args) => ({
        // Only a commit contains itself: the deployed base does not carry the
        // merge the failed record existed to deploy.
        code: args[0] === 'merge-base' && args[2] === args[3] ? 0 : 1,
        stdout: '',
        stderr: ''
      }))
    });
    for (const operation_id of ['failed-deploy', 'base-deploy']) {
      store.ensureRepoOperation(root, {
        operation_id,
        repo_id: root,
        kind: 'deploy',
        subjects: [
          {
            bead_id: 'UI-1',
            merged_sha: operation_id === 'failed-deploy' ? FINAL : HEAD
          }
        ],
        effective_base_sha: HEAD,
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
    const base = store.snapshot(root).repo_operations['base-deploy'];
    store.startRepoOperation(root, {
      operation_id: 'base-deploy',
      attempt_id: base.attempt_id,
      process_identity: { pid: 2, pgid: 2, started_at: 1 },
      log_path: path.join(root, 'base.log'),
      target_sha: HEAD
    });

    await coordinator.reconcile(root);

    expect(
      store.snapshot(root).repo_operations['failed-deploy'].superseded_by
    ).toBe(null);
  });

  test('keeps a late runner failure pending without changing covered rows', async () => {
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
    for (const operation_id of ['covered-deploy']) {
      const operation = store.snapshot(root).repo_operations[operation_id];
      store.settleRepoOperation(root, {
        operation_id,
        attempt_id: operation.attempt_id,
        exit_code: 1,
        signal: null
      });
    }
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
    expect(operations['covered-deploy'].superseded_by).toBe(
      'original-successor'
    );
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

    expect(first).toMatchObject({ queued: true, timeout_ms: 600_000 });
    expect(second).toMatchObject({ queued: true, timeout_ms: 600_000 });
    expect(second.operation_id).toBe(first.operation_id);
    expect(
      store.snapshot(root).repo_operations[first.operation_id].subjects
    ).toEqual([
      { bead_id: 'UI-1', merged_sha: HEAD },
      { bead_id: 'UI-2', merged_sha: FINAL }
    ]);
  });

  test('adopts a running deploy for the same synced target without another bind or spawn', async () => {
    const bindTarget = vi.fn(async () => ({ ok: true, target_sha: TARGET }));
    const start = vi.fn(() => ({
      ok: true,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: path.join(root, 'operation.log')
    }));
    const gitRun = vi.fn(async (args) => {
      if (args[0] === 'merge-base') {
        if (args[2] === FINAL && args[3] === APPROVED) {
          return { code: 1, stdout: '', stderr: '' };
        }
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
    const { store, coordinator } = coordinatorFor({
      gitRun,
      runner: {
        start,
        readMarker: () => null,
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      },
      deployWorktree: {
        bindTarget,
        readState: async () => ({ ok: true, head: null, clean: true }),
        ensureAligned: async () => ({
          ok: true,
          path: path.join(root, '.worktrees', '.repo-ops-deploy'),
          target_sha: TARGET
        }),
        verifyCovered: async () => ({ ok: true })
      }
    });
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
      process_identity: { pid: 9, pgid: 9, started_at: 1 },
      log_path: path.join(root, 'previous.log'),
      target_sha: APPROVED
    });
    store.settleRepoOperation(root, {
      operation_id: 'previous',
      attempt_id: previous.attempt_id,
      exit_code: 0,
      signal: null
    });

    const first = await coordinator.ensureDeploy({
      target_base: 'main',
      target_sha: TARGET,
      subjects: [{ bead_id: 'UI-1', merged_sha: HEAD }]
    });
    const second = await coordinator.ensureDeploy({
      target_base: 'main',
      target_sha: TARGET,
      subjects: [{ bead_id: 'UI-2', merged_sha: FINAL }]
    });
    const waiting = await coordinator.deploymentEvidence(second.operation_id, {
      target_base: 'main',
      merged_sha: FINAL
    });

    expect(second).toMatchObject({
      ok: true,
      operation_id: first.operation_id,
      adopted: true,
      timeout_ms: 600_000
    });
    expect(waiting).toMatchObject({ state: 'running' });
    expect(bindTarget).toHaveBeenCalledOnce();
    expect(start).toHaveBeenCalledOnce();

    const operation = store.snapshot(root).repo_operations[first.operation_id];
    store.settleRepoOperation(root, {
      operation_id: first.operation_id,
      attempt_id: operation.attempt_id,
      exit_code: 0,
      signal: null
    });

    await expect(
      coordinator.deploymentEvidence(second.operation_id, {
        target_base: 'main',
        merged_sha: FINAL
      })
    ).resolves.toMatchObject({ state: 'succeeded' });
    expect(start).toHaveBeenCalledOnce();
  });

  test('returns fetch diagnostics from the initial bind', async () => {
    const { coordinator } = coordinatorFor({
      deployWorktree: {
        bindTarget: async () => ({
          ok: false,
          code: 'repo_ops_fetch_failed',
          fetch_failure: 'timeout',
          elapsed_ms: 60_001
        })
      }
    });

    const result = await coordinator.ensureDeploy({
      target_base: 'main',
      subjects: [{ bead_id: 'UI-1', merged_sha: HEAD }]
    });

    expect(result).toMatchObject({
      ok: false,
      code: 'repo_ops_fetch_failed',
      fetch_failure: 'timeout',
      elapsed_ms: 60_001
    });
  });

  test('settles final rebind fetch diagnostics and returns them as deployment evidence', async () => {
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
    const { store, coordinator } = coordinatorFor({
      gitRun,
      deployWorktree: {
        bindTarget: async () => ({
          ok: false,
          code: 'repo_ops_fetch_failed',
          fetch_failure: 'nonzero',
          elapsed_ms: 28
        })
      }
    });

    const result = await coordinator.ensureDeploy({
      target_base: 'main',
      target_sha: TARGET,
      subjects: [{ bead_id: 'UI-1', merged_sha: HEAD }],
      bootstrap_provenance: {
        approved_source_path: 'docs/spec.md',
        approved_source_sha: APPROVED,
        requested_by: 'operator',
        requested_at: 1
      }
    });
    const operation = store.snapshot(root).repo_operations[result.operation_id];

    expect(result).toMatchObject({
      ok: false,
      code: 'repo_ops_fetch_failed',
      fetch_failure: 'nonzero',
      elapsed_ms: 28
    });
    expect(operation.failure).toMatchObject({
      code: 'repo_ops_fetch_failed',
      fetch_failure: 'nonzero',
      elapsed_ms: 28
    });
    await expect(
      coordinator.deploymentEvidence(result.operation_id, {
        target_base: 'main',
        merged_sha: HEAD
      })
    ).resolves.toMatchObject({
      state: 'failed',
      fetch_failure: 'nonzero',
      elapsed_ms: 28
    });
  });

  test('launches a first attempt on a local pinned target without re-fetching', async () => {
    const bindTarget = vi.fn(async () => ({
      ok: false,
      code: 'repo_ops_fetch_failed',
      fetch_failure: /** @type {const} */ ('nonzero'),
      elapsed_ms: 57_774
    }));
    const resolvable = gitForBootstrap();
    const gitRun = vi.fn(async (/** @type {string[]} */ args) =>
      args[0] === 'rev-parse'
        ? { code: 0, stdout: TARGET, stderr: '' }
        : resolvable(args)
    );
    const { store, coordinator } = coordinatorFor({
      gitRun,
      deployWorktree: {
        bindTarget,
        readState: async () => ({ ok: true, head: null, clean: true }),
        ensureAligned: async () => ({
          ok: true,
          path: path.join(root, '.worktrees', '.repo-ops-deploy'),
          target_sha: TARGET
        })
      }
    });

    const result = await coordinator.ensureDeploy({
      target_base: 'main',
      target_sha: TARGET,
      subjects: [{ bead_id: 'UI-1', merged_sha: HEAD }],
      bootstrap_provenance: {
        approved_source_path: 'docs/spec.md',
        approved_source_sha: APPROVED,
        requested_by: 'operator',
        requested_at: 1
      }
    });

    expect(bindTarget).not.toHaveBeenCalled();
    expect(result).toMatchObject({ ok: true });
    expect(
      store.snapshot(root).repo_operations[result.operation_id]
    ).toMatchObject({ state: 'running', target_sha: TARGET });
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

  test('releases the shared deploy lock before spawning the script', async () => {
    /** @type {string[]} */
    const order = [];
    const { coordinator } = coordinatorFor({
      deployLock: async () => {
        order.push('lock');
        return {
          ok: true,
          release: () => order.push('unlock')
        };
      },
      deployWorktree: {
        bindTarget: async () => {
          order.push('bind');
          return { ok: true, target_sha: TARGET };
        },
        readState: async () => ({ ok: true, head: null, clean: true }),
        ensureAligned: async () => ({
          ok: true,
          path: path.join(root, '.worktrees', '.repo-ops-deploy'),
          target_sha: TARGET
        }),
        verifyCovered: async () => ({ ok: true })
      },
      runner: {
        start: () => {
          order.push('spawn');
          return {
            ok: true,
            process_identity: { pid: 1, pgid: 1, started_at: 1 },
            log_path: path.join(root, 'operation.log')
          };
        },
        readMarker: () => null,
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    spoolRequest(validRequest());

    await coordinator.reconcile(root);

    expect(order).toEqual(['bind', 'lock', 'bind', 'unlock', 'spawn']);
  });

  test('settles a shared deploy lock timeout as a durable terminal failure', async () => {
    const { store, coordinator } = coordinatorFor({
      deployLock: async () => ({ ok: false, code: 'deploy_lock_timeout' })
    });
    spoolRequest(validRequest());

    await coordinator.reconcile(root);

    const [operation] = Object.values(store.snapshot(root).repo_operations);
    expect(operation).toMatchObject({
      state: 'failed',
      failure: { code: 'deploy_lock_timeout' }
    });
  });

  test('settles unowned deploy state without realigning it', async () => {
    const ensureAligned = vi.fn(async () => ({
      ok: true,
      path: path.join(root, '.worktrees', '.repo-ops-deploy')
    }));
    const start = vi.fn();
    const { store, coordinator } = coordinatorFor({
      deployWorktree: {
        bindTarget: async () => ({ ok: true, target_sha: TARGET }),
        readState: async () => ({
          ok: false,
          code: 'repo_ops_worktree_unowned'
        }),
        ensureAligned,
        verifyCovered: async () => ({ ok: true })
      },
      runner: {
        start,
        readMarker: () => null,
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    spoolRequest(validRequest());

    await coordinator.reconcile(root);

    const [operation] = Object.values(store.snapshot(root).repo_operations);
    expect(operation).toMatchObject({
      state: 'failed',
      failure: { code: 'repo_ops_worktree_unowned' }
    });
    expect(ensureAligned).not.toHaveBeenCalled();
    expect(start).not.toHaveBeenCalled();
  });

  test('settles a sibling deploy target without realigning it', async () => {
    const base_git = gitForBootstrap();
    const gitRun = vi.fn(async (args) => {
      const left = args[2];
      const right = args[3];
      if (
        args[0] === 'merge-base' &&
        ((left === TARGET && right === APPROVED) ||
          (left === APPROVED && right === TARGET))
      ) {
        return { code: 1, stdout: '', stderr: '' };
      }
      return base_git(args);
    });
    const ensureAligned = vi.fn(async () => ({
      ok: true,
      path: path.join(root, '.worktrees', '.repo-ops-deploy')
    }));
    const start = vi.fn();
    const { store, coordinator } = coordinatorFor({
      gitRun,
      deployWorktree: {
        bindTarget: async () => ({ ok: true, target_sha: TARGET }),
        readState: async () => ({
          ok: true,
          head: APPROVED,
          clean: true,
          path: path.join(root, '.worktrees', '.repo-ops-deploy')
        }),
        ensureAligned,
        verifyCovered: async () => ({ ok: true })
      },
      runner: {
        start,
        readMarker: () => null,
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    spoolRequest(validRequest());

    await coordinator.reconcile(root);

    const [operation] = Object.values(store.snapshot(root).repo_operations);
    expect(operation).toMatchObject({
      state: 'failed',
      failure: { code: 'remote_history_not_monotonic' }
    });
    expect(ensureAligned).not.toHaveBeenCalled();
    expect(start).not.toHaveBeenCalled();
  });

  test('settles a pinned target behind the last successful deploy as superseded', async () => {
    const base_git = gitForBootstrap();
    const gitRun = vi.fn(async (args) => {
      if (args[0] === 'rev-parse') {
        return { code: 0, stdout: `${TARGET}\n`, stderr: '' };
      }
      if (args[0] === 'merge-base') {
        // TARGET is an ancestor of APPROVED, never the other way round.
        return args[2] === APPROVED && args[3] === TARGET
          ? { code: 1, stdout: '', stderr: '' }
          : { code: 0, stdout: '', stderr: '' };
      }
      return base_git(args);
    });
    const ensureAligned = vi.fn();
    const start = vi.fn();
    const { store, coordinator } = coordinatorFor({
      gitRun,
      deployWorktree: {
        bindTarget: async () => ({ ok: true, target_sha: TARGET }),
        readState: async () => ({
          ok: true,
          head: APPROVED,
          clean: true,
          path: path.join(root, '.worktrees', '.repo-ops-deploy')
        }),
        ensureAligned,
        verifyCovered: async () => ({ ok: true })
      },
      runner: {
        start,
        readMarker: () => null,
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    store.ensureRepoOperation(root, {
      operation_id: 'newer-deploy',
      repo_id: root,
      kind: 'deploy',
      subjects: [{ bead_id: 'UI-newer', merged_sha: APPROVED }],
      effective_base_sha: BASE,
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: '5'.repeat(40)
    });
    const newer = store.snapshot(root).repo_operations['newer-deploy'];
    store.startRepoOperation(root, {
      operation_id: 'newer-deploy',
      attempt_id: newer.attempt_id,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: path.join(root, 'newer.log'),
      target_sha: APPROVED
    });
    store.settleRepoOperation(root, {
      operation_id: 'newer-deploy',
      attempt_id: newer.attempt_id,
      exit_code: 0,
      signal: null
    });

    // A zero-commit quick_fix landing pins the head it observed, which by now
    // sits behind what the newer deploy already shipped.
    const result = await coordinator.ensureDeploy({
      target_base: 'main',
      target_sha: TARGET,
      subjects: [{ bead_id: 'UI-1', merged_sha: TARGET }],
      bootstrap_provenance: {
        approved_source_path: 'docs/spec.md',
        approved_source_sha: APPROVED,
        requested_by: 'operator',
        requested_at: 1
      }
    });

    expect(result).toMatchObject({ ok: true });
    expect(result.code).toBeUndefined();
    expect(ensureAligned).not.toHaveBeenCalled();
    expect(start).not.toHaveBeenCalled();
  });

  test('settles a session-predeployed target as covered without spawning', async () => {
    const start = vi.fn();
    const ensureAligned = vi.fn();
    const { store, coordinator } = coordinatorFor({
      deployLock: async () => ({ ok: true, release: vi.fn() }),
      deployWorktree: {
        bindTarget: async () => ({ ok: true, target_sha: TARGET }),
        readState: async () => ({
          ok: true,
          head: TARGET,
          clean: true,
          path: path.join(root, '.worktrees', '.repo-ops-deploy')
        }),
        ensureAligned,
        verifyCovered: async () => ({ ok: true })
      },
      runner: {
        start,
        readMarker: () => null,
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    spoolRequest(validRequest());

    await coordinator.reconcile(root);

    const [operation] = Object.values(store.snapshot(root).repo_operations);
    expect(operation.state).toBe('succeeded');
    expect(ensureAligned).not.toHaveBeenCalled();
    expect(start).not.toHaveBeenCalled();
  });

  test('records the on-disk head on a covered settle', async () => {
    const { store, coordinator } = coordinatorFor({
      deployLock: async () => ({ ok: true, release: vi.fn() }),
      deployWorktree: {
        bindTarget: async () => ({ ok: true, target_sha: TARGET }),
        readState: async () => ({
          ok: true,
          head: TARGET,
          clean: true,
          path: path.join(root, '.worktrees', '.repo-ops-deploy')
        }),
        ensureAligned: vi.fn(),
        verifyCovered: async () => ({ ok: true })
      }
    });
    spoolRequest(validRequest());

    await coordinator.reconcile(root);

    const [operation] = Object.values(store.snapshot(root).repo_operations);
    expect([operation.target_sha, operation.deploy_worktree]).toEqual([
      TARGET,
      path.join(root, '.worktrees', '.repo-ops-deploy')
    ]);
  });

  test('covers an older failed deploy from a session-predeployed descendant', async () => {
    const { store, coordinator } = coordinatorFor({
      gitRun: gitWithAncestry({}),
      deployLock: async () => ({ ok: true, release: vi.fn() }),
      deployWorktree: {
        bindTarget: async () => ({ ok: true, target_sha: TARGET }),
        readState: async () => ({
          ok: true,
          head: ADVANCED_HEAD,
          clean: true
        }),
        ensureAligned: vi.fn(),
        verifyCovered: async () => ({ ok: true })
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
    spoolRequest(validRequest());

    await coordinator.reconcile(root);

    const operations = store.snapshot(root).repo_operations;
    const [covered_id, covered] = /** @type {[string, any]} */ (
      Object.entries(operations).find(([id]) => id !== 'failed-deploy')
    );
    expect([
      covered.state,
      covered.target_sha,
      operations['failed-deploy'].superseded_by
    ]).toEqual(['succeeded', ADVANCED_HEAD, covered_id]);
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

  test.each([
    {
      name: 'fails a zero-exit deploy whose worktree readback is not aligned',
      verification: { ok: false },
      expected_code: 'deploy_worktree_residue'
    },
    {
      name: 'surfaces unowned coverage evidence after a zero-exit deploy',
      verification: { ok: false, code: 'repo_ops_worktree_unowned' },
      expected_code: 'repo_ops_worktree_unowned'
    }
  ])('$name', async ({ verification, expected_code }) => {
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
        verifyCovered: async () => verification,
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
      retry: { first_failure: { code: expected_code } }
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

  test('grants the one script retry with no toggle and settles failed after it', async () => {
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

    // The queue carries no `auto_repair` key at all — the one automatic step
    // is the pinned contract's, not a workspace setting.
    expect(Object.hasOwn(store.snapshot(root), 'auto_repair')).toBe(false);

    await coordinator.reconcile(root);

    const pending = store.snapshot(root).repo_operations['op-1'];
    expect(pending).toMatchObject({
      state: 'retry_pending',
      retry: { consumed_key: null, blocked_reason: null }
    });
    expect(Object.hasOwn(pending, 'repair')).toBe(false);

    // Respawn (consumes the retry), then let the retry fail terminally too.
    await coordinator.reconcile(root);
    await coordinator.reconcile(root);

    const settled = store.snapshot(root).repo_operations['op-1'];
    expect(settled.state).toBe('failed');
    expect(settled.retry?.consumed_key).not.toBeNull();
    expect(runner.start).toHaveBeenCalledTimes(1);
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

  test('fresh-rebinds a retry and supersedes an older target without realigning it', async () => {
    const bindTarget = vi.fn(async () => ({ ok: true, target_sha: TARGET }));
    const ensureAligned = vi.fn();
    const start = vi.fn();
    const gitRun = vi.fn(async (args) => {
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
      if (args[0] === 'merge-base') {
        return { code: 0, stdout: '', stderr: '' };
      }
      return { code: 0, stdout: '', stderr: '' };
    });
    const { store, coordinator } = coordinatorFor({
      gitRun,
      deployLock: async () => ({ ok: true, release: vi.fn() }),
      deployWorktree: {
        bindTarget,
        readState: async () => ({
          ok: true,
          head: TARGET,
          clean: true,
          path: path.join(root, '.worktrees', '.repo-ops-deploy')
        }),
        ensureAligned,
        verifyCovered: async () => ({ ok: true })
      },
      runner: {
        start,
        readMarker: () => null,
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    store.ensureRepoOperation(root, {
      operation_id: 'old-target',
      repo_id: root,
      kind: 'deploy',
      subjects: [{ bead_id: 'UI-old', merged_sha: APPROVED }],
      effective_base_sha: APPROVED,
      target_base: 'main',
      script_path: 'repo-ops/script/deploy',
      script_mode: '100755',
      script_blob_sha: 'd'.repeat(40)
    });
    const operation = store.snapshot(root).repo_operations['old-target'];
    store.startRepoOperation(root, {
      operation_id: 'old-target',
      attempt_id: operation.attempt_id,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: path.join(root, 'old.log'),
      target_sha: APPROVED
    });
    store.deferRepoOperationRetry(root, {
      operation_id: 'old-target',
      attempt_id: operation.attempt_id,
      exit_code: 2,
      signal: null,
      failure: {
        code: 'script_failed',
        fingerprint: 'f'.repeat(64),
        detail: '',
        interrupted: false
      }
    });

    await coordinator.reconcile(root);

    expect(bindTarget).toHaveBeenCalledOnce();
    expect(store.snapshot(root).repo_operations['old-target'].state).toBe(
      'succeeded'
    );
    expect(ensureAligned).not.toHaveBeenCalled();
    expect(start).not.toHaveBeenCalled();
  });

  test('keeps the first failure when retry final rebind fetch fails', async () => {
    const bindTarget = vi.fn(async () => ({
      ok: false,
      code: 'repo_ops_fetch_failed',
      fetch_failure: 'timeout',
      elapsed_ms: 60_004
    }));
    const gitRun = vi.fn(async (args) => {
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
      return { code: 0, stdout: '', stderr: '' };
    });
    const { store, coordinator } = coordinatorFor({
      gitRun,
      deployLock: async () => ({ ok: true, release: vi.fn() }),
      deployWorktree: {
        bindTarget,
        readState: async () => ({ ok: true, head: null, clean: true }),
        ensureAligned: vi.fn(),
        verifyCovered: async () => ({ ok: true })
      },
      runner: {
        start: vi.fn(),
        readMarker: () => null,
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    store.ensureRepoOperation(root, {
      operation_id: 'retry-fetch',
      repo_id: root,
      kind: 'deploy',
      subjects: [{ bead_id: 'UI-old', merged_sha: APPROVED }],
      effective_base_sha: APPROVED,
      target_base: 'main',
      script_path: 'repo-ops/script/deploy',
      script_mode: '100755',
      script_blob_sha: 'd'.repeat(40)
    });
    const operation = store.snapshot(root).repo_operations['retry-fetch'];
    store.startRepoOperation(root, {
      operation_id: 'retry-fetch',
      attempt_id: operation.attempt_id,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: path.join(root, 'retry-fetch.log'),
      target_sha: APPROVED
    });
    store.deferRepoOperationRetry(root, {
      operation_id: 'retry-fetch',
      attempt_id: operation.attempt_id,
      exit_code: 2,
      signal: null,
      failure: {
        code: 'script_failed',
        fingerprint: 'f'.repeat(64),
        detail: 'original failure',
        interrupted: false
      }
    });

    await coordinator.reconcile(root);

    expect(bindTarget).toHaveBeenCalledOnce();
    expect(store.snapshot(root).repo_operations['retry-fetch']).toMatchObject({
      state: 'failed',
      failure: {
        code: 'script_failed',
        detail: 'original failure'
      },
      retry: {
        blocked_reason: 'repo_ops_fetch_failed'
      }
    });
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

  test('settles into a terminal failure when schema_unsupported blocks the retry', async () => {
    const runner = {
      start: vi.fn(),
      readMarker: () => ({ exit_code: 2, signal: null }),
      readLaunchMarker: () => null,
      processController: { probe: () => ({ state: 'owned' }) }
    };
    const { store, coordinator } = coordinatorFor({
      runner,
      policySupported: () => false
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
      log_path: path.join(root, 'operation.log'),
      target_sha: TARGET
    });

    await coordinator.reconcile(root);

    expect(store.snapshot(root).repo_operations['op-1']).toMatchObject({
      state: 'failed',
      retry: { blocked_reason: 'schema_unsupported' }
    });
  });

  /**
   * Settle `op-1` from a nonzero marker over a run log holding `output`
   * (UI-8wpb §6 row 2), and answer with the failure record that was persisted.
   *
   * @param {string|null} output - Run log contents, or null to leave no file.
   */
  async function failedOperationOver(output) {
    const log_path = path.join(root, 'operation.log');
    if (output !== null) {
      fs.writeFileSync(log_path, output);
    }
    const runner = {
      start: vi.fn(),
      readMarker: () => ({ exit_code: 1, signal: null }),
      readLaunchMarker: () => null,
      processController: { probe: () => ({ state: 'owned' }) }
    };
    const { store, coordinator } = coordinatorFor({
      runner,
      policySupported: () => false
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

    return store.snapshot(root).repo_operations['op-1'].failure;
  }

  test('records the failing line of the deploy script output', async () => {
    const failure = await failedOperationOver(
      ['+ npm ci', 'npm ERR! code ELIFECYCLE', 'exiting'].join('\n')
    );

    expect(failure?.summary).toEqual('npm ERR! code ELIFECYCLE');
  });

  test('records the last output line when nothing announces a failure', async () => {
    const failure = await failedOperationOver(
      ['+ npm ci', 'deploy interrupted', ''].join('\n')
    );

    expect(failure?.summary).toEqual('deploy interrupted');
  });

  test('records a failing line that fell outside the log tail', async () => {
    // §6 asks for the FIRST announcing line. A script that dies early and keeps
    // printing pushes it far past any tail window.
    const failure = await failedOperationOver(
      [
        '+ npm ci',
        'npm ERR! code ENOENT',
        ...Array.from(
          { length: 4000 },
          (_, i) => `progress line ${i} ${'x'.repeat(40)}`
        )
      ].join('\n')
    );

    expect(failure?.summary).toEqual('npm ERR! code ENOENT');
  });

  test('records no summary when the run log is empty', async () => {
    const failure = await failedOperationOver('   \n');

    expect(failure).not.toHaveProperty('summary');
  });

  test('records no summary when the run left no log at all', async () => {
    const failure = await failedOperationOver(null);

    expect(failure).not.toHaveProperty('summary');
  });
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

  test('does not publish a bootstrap operation lookup as current-base policy', async () => {
    const { coordinator } = coordinatorFor();
    spoolRequest(validRequest());

    await coordinator.reconcile(root);

    expect(repoOpsDisplayFor(root)).toMatchObject({
      status: 'pending',
      base_sha: null
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

  test('does not publish a historical previous-base lookup', async () => {
    const { coordinator } = coordinatorFor({
      gitRun: gitForVerify({ verify: true }),
      verifyCheckout: { materialize: vi.fn(async () => ({ ok: false })) }
    });

    await coordinator.ensureVerify(verifyCandidate());

    expect(repoOpsDisplayFor(root)).toMatchObject({
      status: 'pending',
      base_sha: null
    });
  });

  test('does not publish a failed effective lookup', async () => {
    const { coordinator } = coordinatorFor({
      gitRun: async () => ({ code: 128, stdout: '', stderr: 'boom' }),
      verifyCheckout: { materialize: vi.fn(async () => ({ ok: false })) }
    });

    await coordinator.ensureVerify(verifyCandidate());

    expect(repoOpsDisplayFor(root)).toMatchObject({
      status: 'pending',
      base_sha: null
    });
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

describe('repo-operation-coordinator workspace opt-out (UI-lsti §2)', () => {
  /**
   * @param {'verify'|'deploy'} kind
   * @param {any} store
   */
  function optOut(kind, store) {
    store.setRepoOpsOptOut(root, {
      expected_revision: store.snapshot(root).revision,
      kind,
      opted_out: true
    });
  }

  test('reports an opted-out verify lane as declared but with no script', async () => {
    const { store, coordinator } = coordinatorFor({
      gitRun: gitForVerify({ verify: true })
    });
    optOut('verify', store);

    const result = await coordinator.hasConfig(BASE);

    expect(result).toEqual({
      ok: true,
      present: true,
      verify_script_path: null,
      verify_timeout_ms: null,
      verify_opted_out: true,
      deploy_opted_out: false
    });
  });

  test('reports an opted-out deploy lane without hiding the verify script', async () => {
    const { store, coordinator } = coordinatorFor({
      gitRun: gitForVerify({ verify: true })
    });
    optOut('deploy', store);

    const result = await coordinator.hasConfig(BASE);

    expect(result).toMatchObject({
      present: true,
      verify_script_path: 'repo-ops/script/verify',
      verify_opted_out: false,
      deploy_opted_out: true
    });
  });

  test('makes ensureVerify inert without materializing a candidate', async () => {
    const materialize = vi.fn();
    const { store, coordinator } = coordinatorFor({
      gitRun: gitForVerify({ verify: true }),
      verifyCheckout: { materialize }
    });
    optOut('verify', store);

    const result = await coordinator.ensureVerify(verifyCandidate());

    expect(result).toEqual({ ok: true, inert: true, opted_out: true });
    expect(materialize).not.toHaveBeenCalled();
    expect(store.snapshot(root).repo_operations).toEqual({});
  });

  test('creates the verify operation again once the workspace opts back in', async () => {
    const materialize = vi.fn(async () => ({
      ok: true,
      path: root,
      tree_sha: TREE
    }));
    const { store, coordinator } = coordinatorFor({
      gitRun: gitForVerify({ verify: true }),
      verifyCheckout: { materialize, cleanup: vi.fn() }
    });
    optOut('verify', store);
    store.setRepoOpsOptOut(root, {
      expected_revision: store.snapshot(root).revision,
      kind: 'verify',
      opted_out: false
    });

    const result = await coordinator.ensureVerify(verifyCandidate());

    expect(result.inert).toBeUndefined();
    expect(materialize).toHaveBeenCalled();
  });

  test('stops a verify candidate opted out while the checkout materializes', async () => {
    const cleanup = vi.fn(async () => ({ ok: true }));
    /** @type {any} */
    let opened_store = null;
    const materialize = vi.fn(async () => {
      optOut('verify', opened_store);
      return { ok: true, path: root, tree_sha: TREE };
    });
    const { store, coordinator } = coordinatorFor({
      gitRun: gitForVerify({ verify: true }),
      verifyCheckout: { materialize, cleanup }
    });
    opened_store = store;

    const result = await coordinator.ensureVerify(verifyCandidate());

    expect(result).toEqual({ ok: true, inert: true, opted_out: true });
    expect(cleanup).toHaveBeenCalledWith({ repo: root, path: root });
    expect(store.snapshot(root).repo_operations).toEqual({});
  });

  test('stops a deploy operation opted out while subjects are checked', async () => {
    const start = vi.fn();
    /** @type {any} */
    let opened_store = null;
    const bootstrap_git = gitForBootstrap();
    const { store, coordinator } = coordinatorFor({
      gitRun: vi.fn(async (/** @type {string[]} */ args) => {
        if (args[0] === 'merge-base') {
          optOut('deploy', opened_store);
        }
        return bootstrap_git(args);
      }),
      runner: {
        start,
        readMarker: () => null,
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    opened_store = store;

    const result = await coordinator.ensureDeploy({
      target_base: 'main',
      target_sha: TARGET,
      subjects: [{ bead_id: 'UI-1', merged_sha: HEAD }],
      bootstrap_provenance: {
        approved_source_path: 'docs/spec.md',
        approved_source_sha: APPROVED,
        requested_by: 'operator',
        requested_at: 1
      }
    });

    expect(result).toEqual({ ok: true, inert: true, opted_out: true });
    expect(start).not.toHaveBeenCalled();
    expect(store.snapshot(root).repo_operations).toEqual({});
  });

  test('makes ensureDeploy inert without asking the runner to spawn', async () => {
    const start = vi.fn();
    const { store, coordinator } = coordinatorFor({
      runner: {
        start,
        readMarker: () => null,
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    optOut('deploy', store);

    const result = await coordinator.ensureDeploy({
      target_base: 'main',
      target_sha: TARGET,
      subjects: [{ bead_id: 'UI-1', merged_sha: HEAD }],
      bootstrap_provenance: {
        approved_source_path: 'docs/spec.md',
        approved_source_sha: APPROVED,
        requested_by: 'operator',
        requested_at: 1
      }
    });

    expect(result).toEqual({ ok: true, inert: true, opted_out: true });
    expect(start).not.toHaveBeenCalled();
    expect(store.snapshot(root).repo_operations).toEqual({});
  });

  test('leaves the deploy lane running when only verify is opted out', async () => {
    const { store, coordinator } = coordinatorFor();
    optOut('verify', store);

    const result = await coordinator.ensureDeploy({
      target_base: 'main',
      target_sha: TARGET,
      subjects: [{ bead_id: 'UI-1', merged_sha: HEAD }],
      bootstrap_provenance: {
        approved_source_path: 'docs/spec.md',
        approved_source_sha: APPROVED,
        requested_by: 'operator',
        requested_at: 1
      }
    });

    expect(result.inert).toBeUndefined();
    expect(typeof result.operation_id).toBe('string');
  });
});

describe('manual deploy run', () => {
  const RESOLVED_BASE = {
    ok: true,
    base: 'main',
    declared: true,
    remote: 'upstream',
    remote_ref: 'refs/remotes/upstream/main',
    base_oid: TARGET,
    local_only: false
  };

  /**
   * @param {any} [overrides]
   */
  function manualCoordinatorFor(overrides = {}) {
    return coordinatorFor({
      resolveBase: async () => RESOLVED_BASE,
      ...overrides
    });
  }

  /**
   * Seed one terminal deploy record so `latestSuccessfulDeploySha` has a
   * previous base to offer. Its target is deliberately NOT the tip: the git
   * fake only declares `[deploy]` at the tip, so a policy read that used this
   * SHA would classify as bootstrap and refuse.
   *
   * @param {any} store
   */
  function seedPreviousSuccess(store) {
    store.ensureRepoOperation(root, {
      operation_id: 'previous-deploy',
      repo_id: root,
      kind: 'deploy',
      subjects: [{ bead_id: 'UI-1', merged_sha: HEAD }],
      effective_base_sha: BASE,
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: '5'.repeat(40)
    });
    const seeded = store.snapshot(root).repo_operations['previous-deploy'];
    store.startRepoOperation(root, {
      operation_id: 'previous-deploy',
      attempt_id: seeded.attempt_id,
      process_identity: { pid: 9, pgid: 9, started_at: 1 },
      log_path: path.join(root, 'previous.log'),
      target_sha: HEAD
    });
    store.settleRepoOperation(root, {
      operation_id: 'previous-deploy',
      attempt_id: seeded.attempt_id,
      exit_code: 0,
      signal: null
    });
  }

  test('refuses when the fetched tip declares no deploy', async () => {
    const { coordinator } = manualCoordinatorFor({
      gitRun: gitForBootstrap({ config: 'base = "main"' })
    });

    expect(await coordinator.runManualDeploy()).toEqual({
      ok: false,
      reason: 'deploy_not_declared'
    });
  });

  test('refuses when this workspace opted out of deploy', async () => {
    const { store, coordinator } = manualCoordinatorFor();
    store.setRepoOpsOptOut(root, {
      expected_revision: store.snapshot(root).revision,
      kind: 'deploy',
      opted_out: true
    });

    expect(await coordinator.runManualDeploy()).toEqual({
      ok: false,
      reason: 'deploy_opted_out'
    });
  });

  test('refuses while a deploy for this repo is still in flight', async () => {
    const { store, coordinator } = manualCoordinatorFor();
    store.ensureRepoOperation(root, {
      operation_id: 'running-deploy',
      repo_id: root,
      kind: 'deploy',
      subjects: [{ bead_id: 'UI-1', merged_sha: HEAD }],
      effective_base_sha: BASE,
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: '5'.repeat(40)
    });
    const seeded = store.snapshot(root).repo_operations['running-deploy'];
    store.startRepoOperation(root, {
      operation_id: 'running-deploy',
      attempt_id: seeded.attempt_id,
      process_identity: { pid: 7, pgid: 7, started_at: 1 },
      log_path: path.join(root, 'running.log'),
      target_sha: TARGET
    });

    expect(await coordinator.runManualDeploy()).toEqual({
      ok: false,
      reason: 'deploy_in_flight'
    });
  });

  test('refuses when the base resolver cannot pin a tip', async () => {
    const { coordinator } = manualCoordinatorFor({
      resolveBase: async () => ({
        ok: false,
        step: 'fetch',
        base: 'main',
        detail: 'network'
      })
    });

    expect(await coordinator.runManualDeploy()).toEqual({
      ok: false,
      reason: 'target_unresolved'
    });
  });

  test('reads policy and script from the fetched tip, not the previous base', async () => {
    const { store, coordinator } = manualCoordinatorFor();
    seedPreviousSuccess(store);

    const result = /** @type {any} */ (await coordinator.runManualDeploy());

    expect(result.ok).toBe(true);
    const operation =
      store.snapshot(root).repo_operations[String(result.operation_id)];
    expect([
      operation.state,
      operation.script_blob_sha,
      operation.effective_base_sha,
      operation.target_sha
    ]).toEqual(['running', 'd'.repeat(40), HEAD, TARGET]);
  });

  test('records the run as manual with its issued run id', async () => {
    const { store, coordinator } = manualCoordinatorFor();

    const result = /** @type {any} */ (await coordinator.runManualDeploy());

    const operation =
      store.snapshot(root).repo_operations[String(result.operation_id)];
    expect([operation.source, operation.manual_run_id]).toEqual(['manual', 1]);
  });

  test('runs when the deploy worktree already sits exactly at the tip', async () => {
    const { store, coordinator } = manualCoordinatorFor({
      deployWorktree: {
        bindTarget: async () => ({ ok: true, target_sha: TARGET }),
        readState: async () => ({ ok: true, head: TARGET, clean: true }),
        ensureAligned: async () => ({
          ok: true,
          path: path.join(root, '.worktrees', '.repo-ops-deploy'),
          target_sha: TARGET
        }),
        verifyCovered: async () => ({ ok: true }),
        verifyAligned: async () => ({ ok: true })
      }
    });

    const result = /** @type {any} */ (await coordinator.runManualDeploy());

    expect(result.ok).toBe(true);
    expect(
      store.snapshot(root).repo_operations[String(result.operation_id)].state
    ).toBe('running');
  });

  test('runs when the worktree head already contains the tip', async () => {
    const { store, coordinator } = manualCoordinatorFor({
      gitRun: gitWithAncestry({ [`${TARGET}->${ADVANCED_HEAD}`]: true }),
      deployWorktree: {
        bindTarget: async () => ({ ok: true, target_sha: TARGET }),
        readState: async () => ({
          ok: true,
          head: ADVANCED_HEAD,
          clean: true
        }),
        ensureAligned: async () => ({
          ok: true,
          path: path.join(root, '.worktrees', '.repo-ops-deploy'),
          target_sha: TARGET
        }),
        verifyCovered: async () => ({ ok: true }),
        verifyAligned: async () => ({ ok: true })
      }
    });

    const result = /** @type {any} */ (await coordinator.runManualDeploy());

    expect(result.ok).toBe(true);
    expect(
      store.snapshot(root).repo_operations[String(result.operation_id)].state
    ).toBe('running');
  });

  test('runs when the worktree head is behind the tip', async () => {
    const { store, coordinator } = manualCoordinatorFor({
      gitRun: gitWithAncestry({
        [`${TARGET}->${BASE}`]: false,
        [`${BASE}->${TARGET}`]: true
      }),
      deployWorktree: {
        bindTarget: async () => ({ ok: true, target_sha: TARGET }),
        readState: async () => ({ ok: true, head: BASE, clean: true }),
        ensureAligned: async () => ({
          ok: true,
          path: path.join(root, '.worktrees', '.repo-ops-deploy'),
          target_sha: TARGET
        }),
        verifyCovered: async () => ({ ok: true }),
        verifyAligned: async () => ({ ok: true })
      }
    });

    const result = /** @type {any} */ (await coordinator.runManualDeploy());

    expect(result.ok).toBe(true);
    expect(
      store.snapshot(root).repo_operations[String(result.operation_id)].state
    ).toBe('running');
  });

  test('refuses when the worktree head and the tip have diverged', async () => {
    const { store, coordinator } = manualCoordinatorFor({
      gitRun: gitWithAncestry({
        [`${TARGET}->${ADVANCED_HEAD}`]: false,
        [`${ADVANCED_HEAD}->${TARGET}`]: false
      }),
      deployWorktree: {
        bindTarget: async () => ({ ok: true, target_sha: TARGET }),
        readState: async () => ({
          ok: true,
          head: ADVANCED_HEAD,
          clean: true
        }),
        ensureAligned: async () => ({ ok: true, path: root }),
        verifyCovered: async () => ({ ok: true }),
        verifyAligned: async () => ({ ok: true })
      }
    });

    const result = await coordinator.runManualDeploy();

    expect(result).toEqual({
      ok: false,
      reason: 'remote_history_not_monotonic'
    });
    expect(Object.keys(store.snapshot(root).repo_operations)).toEqual([]);
  });

  test('fails closed on the target when the ancestry probe errors', async () => {
    const { store, coordinator } = manualCoordinatorFor({
      gitRun: gitWithAncestry({ [`${TARGET}->${ADVANCED_HEAD}`]: 'error' }),
      deployWorktree: {
        bindTarget: async () => ({ ok: true, target_sha: TARGET }),
        readState: async () => ({
          ok: true,
          head: ADVANCED_HEAD,
          clean: true
        }),
        ensureAligned: async () => ({ ok: true, path: root }),
        verifyCovered: async () => ({ ok: true }),
        verifyAligned: async () => ({ ok: true })
      }
    });

    const result = await coordinator.runManualDeploy();

    expect(result).toEqual({ ok: false, reason: 'target_unresolved' });
    expect(Object.keys(store.snapshot(root).repo_operations)).toEqual([]);
  });

  test('makes every click at the same tip its own operation', async () => {
    const { store, coordinator } = manualCoordinatorFor();

    const first = /** @type {any} */ (await coordinator.runManualDeploy());
    const while_running = await coordinator.runManualDeploy();
    const settled =
      store.snapshot(root).repo_operations[String(first.operation_id)];
    store.settleRepoOperation(root, {
      operation_id: String(first.operation_id),
      attempt_id: settled.attempt_id,
      exit_code: 0,
      signal: null
    });
    const second = /** @type {any} */ (await coordinator.runManualDeploy());

    expect(while_running).toEqual({ ok: false, reason: 'deploy_in_flight' });
    expect(second.ok).toBe(true);
    expect(second.operation_id).not.toBe(first.operation_id);
    const operations = store.snapshot(root).repo_operations;
    expect([
      operations[String(first.operation_id)].manual_run_id,
      operations[String(second.operation_id)].manual_run_id,
      operations[String(first.operation_id)].superseded_by,
      operations[String(second.operation_id)].state
    ]).toEqual([1, 2, second.operation_id, 'running']);
  });

  test('launches a queued manual run at its pinned tip after the remote moved', async () => {
    const start = vi.fn(async () => ({
      ok: true,
      process_identity: { pid: 3, pgid: 3, started_at: 1 },
      log_path: path.join(root, 'manual.log')
    }));
    const { store, coordinator } = manualCoordinatorFor({
      runner: {
        start,
        readMarker: () => null,
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      },
      deployWorktree: {
        // The remote tip has MOVED by the time the queued record launches.
        bindTarget: async () => ({ ok: true, target_sha: ADVANCED_HEAD }),
        readState: async () => ({ ok: true, head: null, clean: true }),
        ensureAligned: async () => ({
          ok: true,
          path: path.join(root, '.worktrees', '.repo-ops-deploy'),
          target_sha: TARGET
        }),
        verifyCovered: async () => ({ ok: true }),
        verifyAligned: async () => ({ ok: true })
      }
    });
    // A running VERIFY holds the repo serial lane, so the manual record is
    // prerecorded as queued instead of launching inside the click.
    store.ensureRepoOperation(root, {
      operation_id: 'running-verify',
      repo_id: root,
      kind: 'verify',
      subjects: [{ bead_id: 'UI-1', merged_sha: HEAD }],
      effective_base_sha: BASE,
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: '5'.repeat(40)
    });
    const holding = store.snapshot(root).repo_operations['running-verify'];
    store.startRepoOperation(root, {
      operation_id: 'running-verify',
      attempt_id: holding.attempt_id,
      process_identity: { pid: 8, pgid: 8, started_at: 1 },
      log_path: path.join(root, 'verify.log'),
      target_sha: HEAD
    });

    const result = /** @type {any} */ (await coordinator.runManualDeploy());
    const queued =
      store.snapshot(root).repo_operations[String(result.operation_id)];
    store.settleRepoOperation(root, {
      operation_id: 'running-verify',
      attempt_id: holding.attempt_id,
      exit_code: 0,
      signal: null
    });
    await coordinator.reconcile(root);

    expect([queued.state, queued.target_sha]).toEqual(['queued', TARGET]);
    expect(start).toHaveBeenCalledWith(
      expect.objectContaining({ target_sha: TARGET })
    );
    expect(
      store.snapshot(root).repo_operations[String(result.operation_id)]
        .target_sha
    ).toBe(TARGET);
  });

  test('fails a manual record closed when its pinned tip is gone', async () => {
    const start = vi.fn();
    const { store, coordinator } = manualCoordinatorFor({
      runner: {
        start,
        readMarker: () => null,
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    store.ensureRepoOperation(root, {
      operation_id: 'manual-unpinned',
      repo_id: root,
      kind: 'deploy',
      subjects: [{ bead_id: 'manual', merged_sha: TARGET }],
      effective_base_sha: BASE,
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: 'd'.repeat(40),
      source: 'manual',
      manual_run_id: 1
    });

    await coordinator.reconcile(root);

    const operation = store.snapshot(root).repo_operations['manual-unpinned'];
    expect([operation.state, operation.failure?.code]).toEqual([
      'failed',
      'manual_target_missing'
    ]);
    expect(start).not.toHaveBeenCalled();
  });

  // UI-jw27 §2: a `[배포 실행]` click that ends terminally is the one deploy
  // failure `terminalize` does NOT own, because no completion intent tracks it.
  test('announces a manual run that settles terminally failed', async () => {
    /** @type {any[]} */
    const sent = [];
    const { store, coordinator } = manualCoordinatorFor({
      notify: {
        needsHuman: vi.fn(async (/** @type {any} */ input) => {
          sent.push(input);
        })
      },
      runner: {
        start: vi.fn(),
        readMarker: () => null,
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    store.ensureRepoOperation(root, {
      operation_id: 'manual-unpinned',
      repo_id: root,
      kind: 'deploy',
      subjects: [{ bead_id: 'manual', merged_sha: TARGET }],
      effective_base_sha: BASE,
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: 'd'.repeat(40),
      source: 'manual',
      manual_run_id: 1
    });

    await coordinator.reconcile(root);

    expect(sent).toEqual([
      expect.objectContaining({
        bead_id: 'manual',
        failure_class: '수동 배포 실패',
        next_action: '[배포 실행] 재클릭',
        reason: 'manual_target_missing',
        repo: root
      })
    ]);
  });

  test('does not announce the same manual failure on a later reconcile', async () => {
    /** @type {any[]} */
    const sent = [];
    const { store, coordinator } = manualCoordinatorFor({
      notify: {
        needsHuman: vi.fn(async (/** @type {any} */ input) => {
          sent.push(input);
        })
      },
      runner: {
        start: vi.fn(),
        readMarker: () => null,
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    store.ensureRepoOperation(root, {
      operation_id: 'manual-unpinned',
      repo_id: root,
      kind: 'deploy',
      subjects: [{ bead_id: 'manual', merged_sha: TARGET }],
      effective_base_sha: BASE,
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: 'd'.repeat(40),
      source: 'manual',
      manual_run_id: 1
    });

    await coordinator.reconcile(root);
    await coordinator.reconcile(root);

    expect(sent).toHaveLength(1);
  });

  test('settles the manual failure normally when the notifier throws', async () => {
    const { store, coordinator } = manualCoordinatorFor({
      notify: {
        needsHuman: vi.fn(() => {
          throw new Error('notifier broken');
        })
      },
      runner: {
        start: vi.fn(),
        readMarker: () => null,
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    store.ensureRepoOperation(root, {
      operation_id: 'manual-unpinned',
      repo_id: root,
      kind: 'deploy',
      subjects: [{ bead_id: 'manual', merged_sha: TARGET }],
      effective_base_sha: BASE,
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: 'd'.repeat(40),
      source: 'manual',
      manual_run_id: 1
    });

    await coordinator.reconcile(root);

    expect(store.snapshot(root).repo_operations['manual-unpinned'].state).toBe(
      'failed'
    );
  });

  test('says opted out when the opt-out lands mid-flight', async () => {
    /** @type {any} */
    let store_ref = null;
    const base_git = gitForBootstrap();
    const { store, coordinator } = manualCoordinatorFor({
      // The subject-containment probe is the last await before the coordinator
      // re-reads the opt-out, so flipping it there reproduces a workspace that
      // turned the deploy lane off while the click was still resolving.
      gitRun: /** @type {any} */ (
        async (/** @type {string[]} */ args) => {
          if (args[0] === 'merge-base' && store_ref) {
            store_ref.setRepoOpsOptOut(root, {
              expected_revision: store_ref.snapshot(root).revision,
              kind: 'deploy',
              opted_out: true
            });
          }
          return base_git(args);
        }
      )
    });
    store_ref = store;

    expect(await coordinator.runManualDeploy()).toEqual({
      ok: false,
      reason: 'deploy_opted_out'
    });
  });
});

describe('repo-operation bead timeline (record-timeline-retention §5)', () => {
  /**
   * A timeline that records what it was asked to append, standing in for the
   * one instance `attach.js` injects.
   */
  function recorder() {
    /** @type {any[]} */
    const events = [];
    return {
      events,
      /** @param {any} input */
      append: (input) => {
        events.push(input);
        return { ok: true };
      }
    };
  }

  /**
   * Seed one running deploy over `subjects` and let the runner report it dead
   * with a nonzero exit, which is the coordinator's terminal failure path.
   *
   * @param {{ bead_id: string, merged_sha: string }[]} subjects
   * @param {any} [timeline]
   */
  async function failOneDeploy(subjects, timeline) {
    const { store, coordinator } = coordinatorFor({
      timeline,
      policySupported: () => false,
      runner: {
        start: () => ({ ok: false, code: 'unused' }),
        readMarker: () => ({ exit_code: 2, signal: null }),
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    store.ensureRepoOperation(root, {
      operation_id: 'deploy-1',
      repo_id: root,
      kind: 'deploy',
      subjects,
      effective_base_sha: BASE,
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: '5'.repeat(40)
    });
    const operation = store.snapshot(root).repo_operations['deploy-1'];
    store.startRepoOperation(root, {
      operation_id: 'deploy-1',
      attempt_id: operation.attempt_id,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: path.join(root, 'deploy-1.log'),
      target_sha: HEAD
    });

    await coordinator.reconcile(root);

    return store;
  }

  test('records the failure on the timeline of the bead it deployed', async () => {
    const timeline = recorder();

    const store = await failOneDeploy(
      [{ bead_id: 'UI-1', merged_sha: HEAD }],
      timeline
    );

    expect(store.snapshot(root).repo_operations['deploy-1'].state).toBe(
      'failed'
    );
    expect(timeline.events).toMatchObject([
      {
        bead_id: 'UI-1',
        kind: 'operation_failed',
        seq: 'deploy-1'
      }
    ]);
    expect(timeline.events[0].summary).toContain('배포 실패 —');
  });

  test('records the failure once per bead a coalesced deploy carried', async () => {
    const timeline = recorder();

    await failOneDeploy(
      [
        { bead_id: 'UI-1', merged_sha: HEAD },
        { bead_id: 'UI-2', merged_sha: HEAD }
      ],
      timeline
    );

    expect(timeline.events.map((event) => event.bead_id)).toEqual([
      'UI-1',
      'UI-2'
    ]);
  });

  test('settles the failure when no timeline is injected', async () => {
    const store = await failOneDeploy([{ bead_id: 'UI-1', merged_sha: HEAD }]);

    expect(store.snapshot(root).repo_operations['deploy-1'].state).toBe(
      'failed'
    );
  });

  test('settles the failure when the timeline append fails', async () => {
    const store = await failOneDeploy([{ bead_id: 'UI-1', merged_sha: HEAD }], {
      append: () => ({ ok: false, reason: 'write_failed', detail: 'nope' })
    });

    expect(store.snapshot(root).repo_operations['deploy-1'].state).toBe(
      'failed'
    );
  });
});

describe('post-merge job operations (UI-i60a §2)', () => {
  const JOB_BLOB = '9'.repeat(40);
  const JOB_PATH = 'repo-ops/post-merge.d/10-reindex';
  const WORKTREE = path.join('/tmp', 'repo-ops-deploy');

  /**
   * The job the cleanup step hands the coordinator: the merged commit as the
   * target, and the file's own blob identity as the script.
   *
   * @param {object} [overrides]
   */
  function jobRequest(overrides = {}) {
    return {
      target_base: 'main',
      target_sha: TARGET,
      bead_id: 'UI-1',
      script_path: JOB_PATH,
      script_mode: '100755',
      script_blob_sha: JOB_BLOB,
      ...overrides
    };
  }

  /**
   * A deploy worktree whose readback answers can be steered per test.
   *
   * @param {{ head?: string|null, clean?: boolean, aligned?: boolean }} [state]
   */
  function worktreeAt(state = {}) {
    return {
      bindTarget: vi.fn(async () => ({ ok: true, target_sha: TARGET })),
      readState: vi.fn(async () => ({
        ok: true,
        head: state.head ?? null,
        clean: state.clean ?? true,
        path: WORKTREE
      })),
      ensureAligned: vi.fn(async () => ({
        ok: true,
        path: WORKTREE,
        target_sha: TARGET
      })),
      verifyCovered: vi.fn(async () => ({ ok: true })),
      verifyAligned: vi.fn(async () => ({ ok: state.aligned ?? true }))
    };
  }

  test('prerecords a queued job operation at the merged commit', async () => {
    const { store, coordinator } = coordinatorFor({
      deployWorktree: worktreeAt()
    });

    /** @type {any} */
    const prepared = await coordinator.prepareJob(jobRequest());

    expect(
      store.snapshot(root).repo_operations[prepared.operation_id]
    ).toMatchObject({
      kind: 'job',
      state: 'queued',
      target_sha: TARGET,
      script_path: JOB_PATH,
      script_blob_sha: JOB_BLOB
    });
  });

  test('resolves the job timeout from the deploy declaration', async () => {
    const { coordinator } = coordinatorFor({
      gitRun: gitForBootstrap({ config: `${CONFIG}\ntimeout_ms = 4321` }),
      deployWorktree: worktreeAt()
    });

    /** @type {any} */
    const prepared = await coordinator.prepareJob(jobRequest());

    expect(prepared.timeout_ms).toBe(4321);
  });

  test('falls back to the default timeout when no deploy is declared', async () => {
    const { coordinator } = coordinatorFor({
      gitRun: gitForVerify({ verify: true }),
      deployWorktree: worktreeAt()
    });

    /** @type {any} */
    const prepared = await coordinator.prepareJob(jobRequest());

    expect(prepared.timeout_ms).toBe(600_000);
  });

  test('aligns a worktree that is behind the merged commit', async () => {
    const worktree = worktreeAt({ head: BASE });
    const { coordinator } = coordinatorFor({
      gitRun: gitWithAncestry({
        [`${TARGET}->${BASE}`]: false,
        [`${BASE}->${TARGET}`]: true
      }),
      deployWorktree: worktree
    });

    /** @type {any} */
    const prepared = await coordinator.prepareJob(jobRequest());

    expect(prepared.ok).toBe(true);
    expect(worktree.ensureAligned).toHaveBeenCalledOnce();
  });

  test('refuses a job whose worktree already contains a newer commit', async () => {
    const worktree = worktreeAt({ head: ADVANCED_HEAD });
    const { coordinator } = coordinatorFor({
      gitRun: gitWithAncestry({ [`${TARGET}->${ADVANCED_HEAD}`]: true }),
      deployWorktree: worktree
    });

    /** @type {any} */
    const prepared = await coordinator.prepareJob(jobRequest());

    expect(prepared).toMatchObject({
      ok: false,
      code: 'post_merge_job_target_moved'
    });
    expect(worktree.ensureAligned).not.toHaveBeenCalled();
  });

  test('records no operation when the job target moved', async () => {
    const { store, coordinator } = coordinatorFor({
      gitRun: gitWithAncestry({ [`${TARGET}->${ADVANCED_HEAD}`]: true }),
      deployWorktree: worktreeAt({ head: ADVANCED_HEAD })
    });

    await coordinator.prepareJob(jobRequest());

    expect(store.snapshot(root).repo_operations).toEqual({});
  });

  test('refuses a job whose post-align readback is not the exact target', async () => {
    const { coordinator } = coordinatorFor({
      deployWorktree: worktreeAt({ aligned: false })
    });

    /** @type {any} */
    const prepared = await coordinator.prepareJob(jobRequest());

    expect(prepared).toMatchObject({
      ok: false,
      code: 'post_merge_job_target_moved'
    });
  });

  test('spawns the job script from the aligned worktree', async () => {
    const start = vi.fn(async () => ({
      ok: true,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: path.join(root, 'job.log')
    }));
    const { coordinator } = coordinatorFor({
      deployWorktree: worktreeAt(),
      runner: {
        start,
        readMarker: () => null,
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    /** @type {any} */
    const prepared = await coordinator.prepareJob(jobRequest());

    await coordinator.launchJob({ operation_id: prepared.operation_id });

    expect(start).toHaveBeenCalledWith(
      expect.objectContaining({
        script_path: path.join(WORKTREE, JOB_PATH),
        cwd: WORKTREE,
        target_sha: TARGET
      })
    );
  });

  test('spawns the job script while the deploy lock is still held', async () => {
    let held = false;
    /** @type {boolean|null} */
    let held_at_spawn = null;
    const { coordinator } = coordinatorFor({
      deployWorktree: worktreeAt(),
      deployLock: async () => {
        held = true;
        return {
          ok: true,
          release: async () => {
            held = false;
          }
        };
      },
      runner: {
        start: async () => {
          held_at_spawn = held;
          return {
            ok: true,
            process_identity: { pid: 1, pgid: 1, started_at: 1 },
            log_path: path.join(root, 'job.log')
          };
        },
        readMarker: () => null,
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    /** @type {any} */
    const prepared = await coordinator.prepareJob(jobRequest());

    await coordinator.launchJob({ operation_id: prepared.operation_id });

    expect(held_at_spawn).toBe(true);
  });

  test('terminalizes a queued job instead of launching it', async () => {
    const start = vi.fn();
    const { store, coordinator } = coordinatorFor({
      deployWorktree: worktreeAt(),
      runner: {
        start,
        readMarker: () => null,
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    /** @type {any} */
    const prepared = await coordinator.prepareJob(jobRequest());

    await coordinator.reconcile(root);

    expect(start).not.toHaveBeenCalled();
    expect(
      store.snapshot(root).repo_operations[prepared.operation_id]
    ).toMatchObject({
      state: 'failed',
      failure: { code: 'interrupted', detail: 'post_merge_job_launch_missing' }
    });
  });

  test('names a job failure 잡 on the subject timeline', async () => {
    /** @type {any[]} */
    const appended = [];
    const { coordinator } = coordinatorFor({
      deployWorktree: worktreeAt(),
      timeline: { append: (/** @type {any} */ line) => appended.push(line) }
    });
    await coordinator.prepareJob(jobRequest());

    await coordinator.reconcile(root);

    expect(appended[0]).toMatchObject({
      bead_id: 'UI-1',
      kind: 'operation_failed',
      summary: expect.stringContaining('잡 실패')
    });
  });

  test('fails a job whose worktree is not tracked-clean after exit', async () => {
    const worktree = worktreeAt();
    worktree.verifyAligned = vi
      .fn()
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValue({ ok: false });
    const { store, coordinator } = coordinatorFor({
      deployWorktree: worktree,
      runner: {
        start: async () => ({
          ok: true,
          process_identity: { pid: 1, pgid: 1, started_at: 1 },
          log_path: path.join(root, 'job.log')
        }),
        readMarker: () => ({ exit_code: 0, signal: null }),
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    /** @type {any} */
    const prepared = await coordinator.prepareJob(jobRequest());
    await coordinator.launchJob({ operation_id: prepared.operation_id });

    await coordinator.reconcile(root);

    expect(
      store.snapshot(root).repo_operations[prepared.operation_id]
    ).toMatchObject({ state: 'failed' });
  });

  test('judges a job readback by exact alignment, never by coverage', async () => {
    const worktree = worktreeAt();
    const { coordinator } = coordinatorFor({
      deployWorktree: worktree,
      runner: {
        start: async () => ({
          ok: true,
          process_identity: { pid: 1, pgid: 1, started_at: 1 },
          log_path: path.join(root, 'job.log')
        }),
        readMarker: () => ({ exit_code: 0, signal: null }),
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    /** @type {any} */
    const prepared = await coordinator.prepareJob(jobRequest());
    await coordinator.launchJob({ operation_id: prepared.operation_id });

    await coordinator.reconcile(root);

    expect(worktree.verifyCovered).not.toHaveBeenCalled();
  });

  test('leaves a failed deploy unsuperseded by a job success', async () => {
    const { store, coordinator } = coordinatorFor({
      deployWorktree: worktreeAt(),
      runner: {
        start: async () => ({
          ok: true,
          process_identity: { pid: 1, pgid: 1, started_at: 1 },
          log_path: path.join(root, 'job.log')
        }),
        readMarker: () => ({ exit_code: 0, signal: null }),
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    store.ensureRepoOperation(root, {
      operation_id: 'deploy-old',
      repo_id: root,
      kind: 'deploy',
      subjects: [{ bead_id: 'UI-0', merged_sha: HEAD }],
      effective_base_sha: BASE,
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: 'd'.repeat(40)
    });
    store.settleRepoOperation(root, {
      operation_id: 'deploy-old',
      attempt_id: store.snapshot(root).repo_operations['deploy-old'].attempt_id,
      exit_code: 1,
      signal: null,
      failure: {
        code: 'script_failed',
        fingerprint: 'f'.repeat(64),
        detail: '',
        interrupted: false
      }
    });
    /** @type {any} */
    const prepared = await coordinator.prepareJob(jobRequest());
    await coordinator.launchJob({ operation_id: prepared.operation_id });

    await coordinator.reconcile(root);

    expect(
      store.snapshot(root).repo_operations['deploy-old'].superseded_by
    ).toBe(null);
  });

  test('grants a failing job one script retry before terminal failure', async () => {
    /** @type {{ exit_code: number, signal: null }|null} */
    let marker = null;
    const start = vi.fn(async () => ({
      ok: true,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: path.join(root, 'job.log')
    }));
    const { store, coordinator } = coordinatorFor({
      deployWorktree: worktreeAt(),
      runner: {
        start,
        readMarker: () => marker,
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    /** @type {any} */
    const prepared = await coordinator.prepareJob(jobRequest());
    await coordinator.launchJob({ operation_id: prepared.operation_id });
    marker = { exit_code: 1, signal: null };

    await coordinator.reconcile(root);
    const after_first =
      store.snapshot(root).repo_operations[prepared.operation_id].state;
    await coordinator.reconcile(root);
    await coordinator.reconcile(root);

    expect(after_first).toBe('retry_pending');
    expect(start).toHaveBeenCalledTimes(2);
    expect(
      store.snapshot(root).repo_operations[prepared.operation_id].state
    ).toBe('failed');
  });

  test('reports a job with no record as unknown evidence', async () => {
    const { coordinator } = coordinatorFor({ deployWorktree: worktreeAt() });

    const evidence = await coordinator.reconcileJob('job-missing');

    expect(evidence).toMatchObject({ state: 'unknown' });
  });

  test('reports a succeeded job as terminal success evidence', async () => {
    const { coordinator } = coordinatorFor({
      deployWorktree: worktreeAt(),
      runner: {
        start: async () => ({
          ok: true,
          process_identity: { pid: 1, pgid: 1, started_at: 1 },
          log_path: path.join(root, 'job.log')
        }),
        readMarker: () => ({ exit_code: 0, signal: null }),
        readLaunchMarker: () => null,
        processController: { probe: () => ({ state: 'owned' }) }
      }
    });
    /** @type {any} */
    const prepared = await coordinator.prepareJob(jobRequest());
    await coordinator.launchJob({ operation_id: prepared.operation_id });

    const evidence = await coordinator.waitForJobTerminal(
      prepared.operation_id,
      { timeout_ms: 10, poll_ms: 1 }
    );

    expect(evidence).toMatchObject({
      state: 'succeeded',
      operation_id: prepared.operation_id
    });
  });

  test('issues a fresh operation id for a re-recorded run of the same job', async () => {
    const { coordinator } = coordinatorFor({ deployWorktree: worktreeAt() });
    /** @type {any} */
    const first = await coordinator.prepareJob(jobRequest());

    /** @type {any} */
    const second = await coordinator.prepareJob(
      jobRequest({ supersedes: first.operation_id })
    );

    expect(second.operation_id).not.toBe(first.operation_id);
  });

  // The supersede lineage itself is no longer written here: it belongs to the
  // one ledger mutation that also swaps the pointer, so a re-record cannot
  // leave a lineage naming an operation the ledger never adopted
  // (`queue-store.js recordPostMergeJobIntent`).
  test('prerecords a distinct operation for a re-recorded run', async () => {
    const { store, coordinator } = coordinatorFor({
      deployWorktree: worktreeAt()
    });
    /** @type {any} */
    const first = await coordinator.prepareJob(jobRequest());

    /** @type {any} */
    const second = await coordinator.prepareJob(jobRequest());

    expect(second.operation_id).not.toBe(first.operation_id);
    expect(
      store.snapshot(root).repo_operations[second.operation_id]
    ).toMatchObject({ kind: 'job', state: 'queued' });
  });
});

describe('automatic run failures stay unannounced here (UI-jw27 §2)', () => {
  test('announces nothing when an automatic run exhausts its script retry', async () => {
    /** @type {any[]} */
    const sent = [];
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
    const { store, coordinator } = coordinatorFor({
      runner,
      notify: {
        needsHuman: vi.fn(async (/** @type {any} */ input) => {
          sent.push(input);
        })
      }
    });
    store.ensureRepoOperation(root, {
      operation_id: 'op-auto',
      repo_id: root,
      kind: 'deploy',
      subjects: [{ bead_id: 'UI-x', merged_sha: TARGET }],
      effective_base_sha: TARGET,
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: 'd'.repeat(40)
    });
    const attempt_id =
      store.snapshot(root).repo_operations['op-auto'].attempt_id;
    store.startRepoOperation(root, {
      operation_id: 'op-auto',
      attempt_id,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: path.join(root, 'operation.log'),
      target_sha: TARGET
    });

    await coordinator.reconcile(root);
    await coordinator.reconcile(root);
    await coordinator.reconcile(root);

    expect(store.snapshot(root).repo_operations['op-auto'].state).toBe(
      'failed'
    );
    expect(sent).toEqual([]);
  });
});
