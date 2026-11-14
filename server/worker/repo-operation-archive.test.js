import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createLockManager } from './locks.js';
import { createQueueStore } from './queue-store.js';
import { createRepoOperationArchive } from './repo-operation-archive.js';
import { createRepoOperationCoordinator } from './repo-operation-coordinator.js';
import {
  queueFilePath,
  repoOperationArchivePath,
  repoOperationLogDir,
  repoOperationMarkerDir
} from './state-paths.js';

/** @import { RepoOperation } from './queue-store.js' */

const DAY_MS = 86_400_000;
const NOW = 1_800_000_000_000;
const OLD = NOW - 31 * DAY_MS;
const HEAD = 'a'.repeat(40);
const DESCENDANT = 'b'.repeat(40);

/** @type {string} */
let root;
/** @type {string|undefined} */
let saved_state_home;

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'repo-operation-archive-'));
  saved_state_home = process.env.XDG_STATE_HOME;
  process.env.XDG_STATE_HOME = path.join(root, 'state');
});

afterEach(() => {
  if (saved_state_home === undefined) {
    delete process.env.XDG_STATE_HOME;
  } else {
    process.env.XDG_STATE_HOME = saved_state_home;
  }
  fs.rmSync(root, { recursive: true, force: true });
});

/**
 * @param {string} operation_id
 * @param {Partial<RepoOperation>} [overrides]
 * @returns {RepoOperation}
 */
function operation(operation_id, overrides = {}) {
  return {
    schema: 1,
    repo_id: 'repo-a',
    kind: 'deploy',
    subjects: [{ bead_id: `UI-${operation_id}`, merged_sha: HEAD }],
    effective_base_sha: HEAD,
    target_base: 'main',
    target_sha: DESCENDANT,
    target_tree: HEAD,
    verify_head_sha: HEAD,
    verify_head_shas: [HEAD],
    deploy_worktree: null,
    script_object_type: 'blob',
    script_path: 'repo-ops/script/deploy',
    script_mode: '100755',
    script_blob_sha: HEAD,
    state: 'succeeded',
    attempt_id: `${operation_id}-1`,
    requested_at: OLD - 1000,
    started_at: OLD - 500,
    finished_at: OLD,
    process_identity: null,
    log_path: null,
    log_digest: null,
    exit_code: 0,
    signal: null,
    failure: null,
    retry: null,
    superseded_by: null,
    source: 'automatic',
    manual_run_id: null,
    dismissed: null,
    ...overrides
  };
}

/**
 * @param {string} bead_id
 * @param {Record<string, any>} [extra]
 */
function fixWait(bead_id, extra = {}) {
  return {
    bead_id,
    rig: '/repo',
    entered_at: NOW,
    failure_identity: 'failure',
    state: 'waiting',
    ...extra
  };
}

/**
 * The recent rows keep old candidates outside the projection's latest twenty
 * and provide a newer automatic deploy for their repo/kind/source group.
 *
 * @param {Record<string, RepoOperation>} operations
 * @param {Record<string, any>} [extra]
 * @param {string} [name]
 */
function fixture(operations, extra = {}, name = 'workspace') {
  const workspace = path.join(root, name);
  const file = queueFilePath(workspace);
  const recent = Object.fromEntries(
    Array.from({ length: 20 }, (_, index) => {
      const operation_id = `recent-${index}`;
      return [
        operation_id,
        operation(operation_id, {
          requested_at: NOW - index,
          finished_at: NOW
        })
      ];
    })
  );
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(
    file,
    JSON.stringify({ repo_operations: { ...operations, ...recent }, ...extra })
  );
  const store = createQueueStore({ now: () => NOW });
  const archive = createRepoOperationArchive({
    workspace_root: workspace,
    store,
    now: () => NOW
  });
  return { workspace, store, archive, file };
}

/**
 * @param {string} workspace
 * @returns {Array<RepoOperation & { operation_id: string }>}
 */
function archivedRecords(workspace) {
  return fs
    .readFileSync(repoOperationArchivePath(workspace), 'utf8')
    .trimEnd()
    .split('\n')
    .map((line) => JSON.parse(line));
}

/**
 * @param {ReturnType<typeof fixture>} env
 * @param {boolean} [settle_failure]
 */
function coordinatorFor(env, settle_failure = false) {
  return createRepoOperationCoordinator({
    workspace: env.workspace,
    repo: 'coordinator-repo',
    store: env.store,
    locks: createLockManager(),
    now: () => NOW,
    policySupported: () => false,
    gitRun: async (args) => ({
      code: args[0] === 'merge-base' ? 0 : 1,
      stdout: '',
      stderr: ''
    }),
    runner: /** @type {any} */ ({
      readMarker: () =>
        settle_failure
          ? { exit_code: 1, signal: null, finished_at: NOW }
          : null,
      readLaunchMarker: () => null,
      processController: { probe: () => ({ state: 'owned' }) }
    }),
    transition: /** @type {any} */ ({ reclaim: () => {} }),
    verifyCheckout: {
      materialize: async () => ({ ok: false }),
      verify: async () => ({ ok: true }),
      cleanup: async () => {}
    }
  });
}

describe('repo-operation archive', () => {
  test('archives only successes finished more than thirty days ago', () => {
    const env = fixture({
      old: operation('old'),
      boundary: operation('boundary', { finished_at: NOW - 30 * DAY_MS }),
      recent: operation('recent', { finished_at: NOW - DAY_MS }),
      unknown: operation('unknown', { finished_at: null }),
      failed: operation('failed', { state: 'failed', repo_id: 'other' }),
      queued: operation('queued', { state: 'queued' }),
      running: operation('running', { state: 'running' }),
      pending: operation('pending', {
        state: 'retry_pending',
        repo_id: 'other'
      })
    });

    const result = env.archive.sweep();

    expect(result).toEqual({ archived: 1 });
    expect(
      archivedRecords(env.workspace).map((row) => row.operation_id)
    ).toEqual(['old']);
    expect(
      env.store.snapshot(env.workspace).repo_operations
    ).not.toHaveProperty('old');
  });

  test('keeps records retained by the screen projection', () => {
    const env = fixture(
      { retained: operation('retained'), unused: operation('unused') },
      { done: [{ bead_id: 'UI-retained', added_at: NOW - DAY_MS }] }
    );

    env.archive.sweep();

    expect(env.store.snapshot(env.workspace).repo_operations).toHaveProperty(
      'retained'
    );
    expect(archivedRecords(env.workspace)[0].operation_id).toBe('unused');
  });

  test('keeps operation ids stored as nested values in another collection', () => {
    const env = fixture(
      { referenced: operation('referenced'), unused: operation('unused') },
      {
        fix_waits: {
          origin: fixWait('UI-other', { rerun_operation_id: 'referenced' })
        }
      }
    );

    env.archive.sweep();

    expect(env.store.snapshot(env.workspace).repo_operations).toHaveProperty(
      'referenced'
    );
  });

  test('keeps landing evidence for a subject referenced by a fix wait', () => {
    const env = fixture(
      { fix: operation('fix'), unused: operation('unused') },
      {
        fix_waits: { origin: fixWait('UI-fix') },
        done: [{ bead_id: 'UI-fix', added_at: OLD }]
      }
    );
    const done = env.store.snapshot(env.workspace).done;

    env.archive.sweep();

    expect(env.store.snapshot(env.workspace).repo_operations).toHaveProperty(
      'fix'
    );
    expect(env.store.snapshot(env.workspace).done).toEqual(done);
  });

  test('keeps subjects referenced by dictionary keys', () => {
    const env = fixture(
      { keyed: operation('keyed'), unused: operation('unused') },
      { fix_waits: { 'UI-keyed': fixWait('UI-other') } }
    );

    env.archive.sweep();

    expect(env.store.snapshot(env.workspace).repo_operations).toHaveProperty(
      'keyed'
    );
  });

  test('keeps the latest record of every repo kind and source group', () => {
    const groups = [
      {
        repo_id: 'repo-a',
        kind: /** @type {const} */ ('deploy'),
        source: /** @type {const} */ ('manual')
      },
      {
        repo_id: 'repo-b',
        kind: /** @type {const} */ ('deploy'),
        source: /** @type {const} */ ('automatic')
      },
      {
        repo_id: 'repo-a',
        kind: /** @type {const} */ ('verify'),
        source: /** @type {const} */ ('automatic')
      }
    ];
    /** @type {Record<string, RepoOperation>} */
    const operations = {};
    for (const [index, group] of groups.entries()) {
      operations[`older-${index}`] = operation(`older-${index}`, group);
      operations[`latest-${index}`] = operation(`latest-${index}`, {
        ...group,
        requested_at: OLD
      });
    }
    const env = fixture(operations);

    env.archive.sweep();

    expect(
      archivedRecords(env.workspace).map((row) => row.operation_id)
    ).toEqual(['older-0', 'older-1', 'older-2']);
  });

  test('keeps the last inserted manual run when its clock moved backwards', () => {
    const env = fixture({
      newest: operation('newest', { source: 'manual', requested_at: OLD }),
      last: operation('last', { source: 'manual', requested_at: OLD - DAY_MS }),
      unused: operation('unused')
    });

    env.archive.sweep();

    expect(env.store.snapshot(env.workspace).repo_operations).toHaveProperty(
      'newest'
    );
    expect(env.store.snapshot(env.workspace).repo_operations).toHaveProperty(
      'last'
    );
  });

  test('keeps records carrying recovery evidence', () => {
    const env = fixture({
      recovery: operation('recovery', {
        recovery: {
          classification: 'condition_wait',
          disposition: 'wait',
          reason: null,
          code_defect: false,
          prover: null,
          handoff: null
        }
      }),
      unused: operation('unused')
    });

    env.archive.sweep();

    expect(env.store.snapshot(env.workspace).repo_operations).toHaveProperty(
      'recovery'
    );
  });

  test('keeps every success that coverage may use for an unsuperseded failure', () => {
    const env = fixture({
      first: operation('first'),
      second: operation('second'),
      failed: operation('failed', {
        state: 'failed',
        dismissed: { at: OLD, by: 'user' }
      }),
      unrelated: operation('unrelated', { kind: 'job' }),
      latest_job: operation('latest_job', { kind: 'job', requested_at: NOW })
    });

    env.archive.sweep();

    expect(
      archivedRecords(env.workspace).map((row) => row.operation_id)
    ).toEqual(['unrelated']);
  });

  test('retains a retry chain connected to a superseded dismissed failure', () => {
    const env = fixture({
      tip: operation('tip', { retry_of: 'middle' }),
      middle: operation('middle', { retry_of: 'failed' }),
      failed: operation('failed', {
        state: 'failed',
        dismissed: { at: OLD, by: 'user' },
        superseded_by: 'recent-0'
      }),
      unused: operation('unused')
    });

    env.archive.sweep();

    expect(
      archivedRecords(env.workspace).map((row) => row.operation_id)
    ).toEqual(['unused']);
  });

  test('retains supersede links in both directions through a fixed point', () => {
    const env = fixture({
      tail: operation('tail'),
      middle: operation('middle', { superseded_by: 'tail' }),
      anchor: operation('anchor', {
        finished_at: NOW,
        superseded_by: 'middle'
      }),
      predecessor: operation('predecessor', { superseded_by: 'anchor' }),
      unused: operation('unused')
    });

    env.archive.sweep();

    expect(
      archivedRecords(env.workspace).map((row) => row.operation_id)
    ).toEqual(['unused']);
  });

  test('moves an unreferenced succeeded component together', () => {
    const env = fixture({
      first: operation('first', { superseded_by: 'second' }),
      second: operation('second', { retry_of: 'first' })
    });

    env.archive.sweep();

    expect(
      archivedRecords(env.workspace).map((row) => row.operation_id)
    ).toEqual(['first', 'second']);
  });

  test('leaves the queue unchanged when appending fails and retries later', () => {
    const env = fixture({ old: operation('old') });
    const before = env.store.snapshot(env.workspace);
    const persisted = fs.readFileSync(env.file, 'utf8');
    const archive = createRepoOperationArchive({
      workspace_root: env.workspace,
      store: env.store,
      now: () => NOW,
      fs: {
        mkdirSync: fs.mkdirSync,
        appendFileSync: () => {
          throw new Error('EACCES');
        }
      }
    });

    const failed = archive.sweep();
    const unchanged = env.store.snapshot(env.workspace);
    const unchanged_file = fs.readFileSync(env.file, 'utf8');
    const retried = env.archive.sweep();

    expect(failed).toEqual({ archived: 0 });
    expect(unchanged).toBe(before);
    expect(unchanged_file).toBe(persisted);
    expect(retried).toEqual({ archived: 1 });
  });

  test('appends complete records before removing them in one queue mutation', () => {
    const env = fixture({
      first: operation('first'),
      second: operation('second')
    });
    const before = env.store.snapshot(env.workspace);
    const remove = env.store.removeArchivedRepoOperations;
    const mutation = vi
      .spyOn(env.store, 'removeArchivedRepoOperations')
      .mockImplementation((workspace, input) => {
        expect(archivedRecords(workspace)).toEqual(
          ['first', 'second'].map((operation_id) => ({
            operation_id,
            ...before.repo_operations[operation_id]
          }))
        );
        return remove(workspace, input);
      });

    env.archive.sweep();

    expect(mutation).toHaveBeenCalledTimes(1);
    expect(env.store.snapshot(env.workspace).revision).toBe(
      before.revision + 1
    );
    const reloaded = createQueueStore().snapshot(env.workspace);
    expect(reloaded.repo_operations).not.toHaveProperty('first');
    expect(reloaded.repo_operations).not.toHaveProperty('second');
    expect(before.repo_operations).toHaveProperty('first');
  });

  test('keeps the queue after persist failure and tolerates duplicate archive lines', () => {
    const env = fixture({ old: operation('old') });
    const before = env.store.snapshot(env.workspace);
    const persisted = fs.readFileSync(env.file, 'utf8');
    const rename = vi.spyOn(fs, 'renameSync').mockImplementation(() => {
      throw new Error('EACCES');
    });

    const failed = env.archive.sweep();
    const unchanged = env.store.snapshot(env.workspace);
    const unchanged_file = fs.readFileSync(env.file, 'utf8');
    rename.mockRestore();
    const retried = env.archive.sweep();

    expect(failed).toEqual({ archived: 0 });
    expect(unchanged).toBe(before);
    expect(unchanged_file).toBe(persisted);
    expect(retried).toEqual({ archived: 1 });
    const rows = archivedRecords(env.workspace);
    expect(rows).toHaveLength(2);
    expect(rows[0]).toEqual(rows[1]);
  });

  test('does not append or mutate again on a second pass', () => {
    const env = fixture({ old: operation('old') });
    env.archive.sweep();
    const archived = fs.readFileSync(
      repoOperationArchivePath(env.workspace),
      'utf8'
    );
    const before = env.store.snapshot(env.workspace);

    const result = env.archive.sweep();

    expect(result).toEqual({ archived: 0 });
    expect(env.store.snapshot(env.workspace)).toBe(before);
    expect(
      fs.readFileSync(repoOperationArchivePath(env.workspace), 'utf8')
    ).toBe(archived);
  });

  test('preserves old done rows and never touches operation logs or markers', () => {
    const env = fixture(
      { old: operation('old') },
      { done: [{ bead_id: 'UI-old', added_at: OLD }] }
    );
    const done = env.store.snapshot(env.workspace).done;
    const files = [
      repoOperationLogDir(env.workspace),
      repoOperationMarkerDir(env.workspace)
    ].map((directory) => {
      fs.mkdirSync(directory, { recursive: true });
      const file = path.join(directory, 'old');
      fs.writeFileSync(file, 'evidence');
      return file;
    });

    env.archive.sweep();

    expect(env.store.snapshot(env.workspace).done).toEqual(done);
    expect(archivedRecords(env.workspace)[0].operation_id).toBe('old');
    for (const file of files) {
      expect(fs.readFileSync(file, 'utf8')).toBe('evidence');
    }
  });
});

describe('repo-operation judgments across archiving', () => {
  for (const scenario of ['retry', 'coverage', 'superseded']) {
    test(`preserves retry tips receipts and stored coverage for ${scenario}`, async () => {
      const operations = {
        failed: operation('failed', {
          kind: 'verify',
          state: 'failed',
          dismissed: { at: OLD, by: 'user' },
          superseded_by: scenario === 'superseded' ? 'success' : null
        }),
        success: operation('success', {
          kind: 'verify',
          verify_head_sha: DESCENDANT,
          verify_head_shas: [HEAD, DESCENDANT],
          ...(scenario === 'retry' ? { retry_of: 'failed' } : {})
        }),
        newer: operation('newer', {
          kind: 'verify',
          requested_at: NOW,
          verify_head_sha: 'c'.repeat(40),
          verify_head_shas: ['c'.repeat(40)]
        }),
        unused: operation('unused')
      };
      const before = fixture(operations, {}, 'before');
      const after = fixture(operations, {}, 'after');
      const baseline = coordinatorFor(before);
      const archived = coordinatorFor(after);
      const receipt = baseline.verifyReceipt('failed', HEAD);

      const result = after.archive.sweep();
      const archived_receipt = archived.verifyReceipt('failed', HEAD);
      await baseline.reconcile(before.workspace);
      await archived.reconcile(after.workspace);

      expect(result.archived).toBe(1);
      expect(archived_receipt).toEqual(receipt);
      expect(archived_receipt?.operation_id).toBe(
        scenario === 'retry' ? 'success' : 'failed'
      );
      expect(
        after.store.snapshot(after.workspace).repo_operations.failed
          .superseded_by
      ).toBe(
        before.store.snapshot(before.workspace).repo_operations.failed
          .superseded_by
      );
      expect(
        after.store.snapshot(after.workspace).repo_operations.failed
          .superseded_by
      ).toBe('success');
    });
  }

  test('preserves deploy coverage when a running failure settles after archiving', async () => {
    const operations = {
      failed: operation('failed', { state: 'failed' }),
      settling: operation('settling', { state: 'running' }),
      success: operation('success'),
      unused: operation('unused', { kind: 'job' }),
      latest_job: operation('latest_job', { kind: 'job', requested_at: NOW })
    };
    const before = fixture(operations, {}, 'before');
    const after = fixture(operations, {}, 'after');
    const baseline = coordinatorFor(before, true);
    const archived = coordinatorFor(after, true);
    after.archive.sweep();
    await baseline.reconcile(before.workspace);
    await archived.reconcile(after.workspace);

    expect(
      after.store.snapshot(after.workspace).repo_operations.settling
        .superseded_by
    ).toBe(
      before.store.snapshot(before.workspace).repo_operations.settling
        .superseded_by
    );
    expect(
      after.store.snapshot(after.workspace).repo_operations.settling
        .superseded_by
    ).toBe('success');
  });
});
