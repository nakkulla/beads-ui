import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { createLockManager } from './locks.js';
import { createQueueStore } from './queue-store.js';
import { createRepoOperationCoordinator } from './repo-operation-coordinator.js';
import {
  repoOpsSpoolPendingDir,
  repoOpsSpoolProcessedDir
} from './state-paths.js';

const TARGET = 'b'.repeat(40);
const APPROVED = 'e'.repeat(40);
const CONFIG = '[deploy]\nscript = "repo-ops/script/deploy"';

/** @type {string} */
let root;

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'repo-operation-coord-'));
  process.env.XDG_STATE_HOME = path.join(root, 'state');
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
 * @param {{ gitRun?: (args: string[], options: object) => Promise<{ code: number, stdout: string, stderr: string }>, runner?: object }} [overrides]
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
    deployWorktree: /** @type {never} */ ({
      bindTarget: async () => ({ ok: true, target_sha: TARGET }),
      ensureAligned: async () => ({
        ok: true,
        path: path.join(root, '.worktrees', '.repo-ops-deploy'),
        target_sha: TARGET
      }),
      verifyAligned: async () => ({ ok: true })
    })
  });
  return { store, coordinator };
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
      state: 'failed',
      failure: { code: 'deploy_worktree_residue' }
    });
  });

  test('settles a marker-less dead process as interrupted with a fingerprint, without respawning', async () => {
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
      state: 'failed',
      failure: { code: 'interrupted', interrupted: true }
    });
    expect(settled.failure?.fingerprint).toMatch(/^[0-9a-f]{64}$/);
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
});
