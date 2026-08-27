import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createQueueStore } from './queue-store.js';
import {
  REPO_OPERATION_MIGRATION_VERSION,
  createRepoOperationMigration
} from './repo-operation-migration.js';
import { queueFilePath } from './state-paths.js';

const WS = '/tmp/example-workspace/legacy-migration';
const REPO = '/tmp/example-workspace/legacy-migration';
const FIXTURES = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '__fixtures__'
);

const TIP = 'a'.repeat(40);
const MERGED = 'e3b3b22411263aa37649215ca1a9adb8e27f24dc';
const HEAD = 'a324170326f0236e1a6220506293562a5e02d1dd';
const P0MQ_MERGED = '74f0b0c531798431b8a45e227079c503a077a2e6';
const F17C_MERGED = 'eee3b741f5055d9da7736fac6008a39317544dbf';

/** @type {string} */
let tmp_state;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-legacy-migration-'));
  process.env.XDG_STATE_HOME = tmp_state;
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

/**
 * @param {string} name
 */
function fixture(name) {
  return JSON.parse(fs.readFileSync(path.join(FIXTURES, name), 'utf8'));
}

/**
 * @param {any} queue
 */
function storeWith(queue) {
  const file = queueFilePath(WS);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(queue, null, 2));
  return createQueueStore();
}

/**
 * Fake git whose containment answer is a caller-supplied predicate, so a test
 * can state exactly which subject the remote tip covers.
 *
 * @param {{ tip?: string|null, covers?: (ancestor: string, descendant: string) => boolean }} [options]
 */
function gitFor(options = {}) {
  const tip = options.tip === undefined ? TIP : options.tip;
  const covers = options.covers || (() => true);
  /**
   * @param {string[]} args
   */
  return async (args) => {
    if (args[0] === 'fetch') {
      return { code: 0, stdout: '', stderr: '' };
    }
    if (args[0] === 'rev-parse') {
      return tip === null
        ? { code: 128, stdout: '', stderr: 'unknown revision' }
        : { code: 0, stdout: `${tip}\n`, stderr: '' };
    }
    if (args[0] === 'merge-base') {
      return covers(args[2], args[3])
        ? { code: 0, stdout: '', stderr: '' }
        : { code: 1, stdout: '', stderr: '' };
    }
    return { code: 0, stdout: '', stderr: '' };
  };
}

/**
 * @param {Record<string, { merge_sha?: string|null, head_sha?: string|null, base?: string|null }>} table
 */
function factsFor(table) {
  /**
   * @param {string} bead_id
   */
  return async (bead_id) => {
    const entry = table[bead_id] || {};
    return {
      base: entry.base === undefined ? 'main' : entry.base,
      base_reason: null,
      merge_sha: entry.merge_sha || null,
      head_sha: entry.head_sha || null,
      head_ref: bead_id,
      pr_url: `https://example.test/pull/${bead_id}`
    };
  };
}

/**
 * @param {{ present?: boolean, verify_script_path?: string|null, ok?: boolean, code?: string }} [config]
 */
function repoOperationsFor(config = {}) {
  return {
    hasConfig: async () => ({
      ok: config.ok !== false,
      present: config.present === true,
      verify_script_path: config.verify_script_path || null,
      ...(config.code ? { code: config.code } : {})
    })
  };
}

/**
 * @param {any} overrides
 */
function migrationWith(overrides) {
  return createRepoOperationMigration({
    workspace: WS,
    repo: REPO,
    gitRun: gitFor(),
    repoOperations: repoOperationsFor(),
    resumeClosure: null,
    now: () => 1_800_000_000_000,
    ...overrides
  });
}

describe('worker/repo-operation-migration', () => {
  test('retires a legacy verify failure when the new config declares no verify', async () => {
    const store = storeWith(fixture('legacy-cleanup-beads-ui.json'));
    const migration = migrationWith({
      store,
      cleanupFacts: factsFor({ 'UI-f17c': { merge_sha: F17C_MERGED } })
    });

    const run = await migration.run();

    expect(run.results['UI-f17c'].disposition).toBe('verify_retired');
    expect(store.snapshot(WS).cleanup_failed['UI-f17c']).toBeUndefined();
  });

  test('converts a legacy verify failure into a verify operation when verify is declared', async () => {
    const store = storeWith(fixture('legacy-cleanup-beads-ui.json'));
    const migration = migrationWith({
      store,
      repoOperations: repoOperationsFor({
        present: true,
        verify_script_path: 'repo-ops/script/verify'
      }),
      cleanupFacts: factsFor({ 'UI-f17c': { merge_sha: F17C_MERGED } })
    });

    const run = await migration.run();

    expect(run.results['UI-f17c'].disposition).toBe('verify_operation');
  });

  test('hands a converted row to the coordinator lane with its canonical subject pinned', async () => {
    const store = storeWith(fixture('legacy-cleanup-dotfiles.json'));
    const migration = migrationWith({
      store,
      cleanupFacts: factsFor({ 'dotfiles-3vb8': { merge_sha: MERGED } })
    });

    await migration.run();

    const row = store
      .snapshot(WS)
      .pr_wait.find((entry) => entry.bead_id === 'dotfiles-3vb8');
    expect(row).toMatchObject({
      merge_sha: MERGED,
      cleanup_cursor: 'base_containment'
    });
  });

  test('prefers the observed merge SHA over the current head SHA as the subject', async () => {
    const store = storeWith(fixture('legacy-cleanup-dotfiles.json'));
    const migration = migrationWith({
      store,
      cleanupFacts: factsFor({
        'dotfiles-3vb8': { merge_sha: MERGED, head_sha: HEAD }
      })
    });

    const run = await migration.run();

    expect(run.results['dotfiles-3vb8']).toMatchObject({
      subject_sha: MERGED,
      subject_source: 'merge_sha'
    });
  });

  test('falls back to the current head SHA when no merge SHA is observed', async () => {
    const store = storeWith(fixture('legacy-cleanup-dotfiles.json'));
    const migration = migrationWith({
      store,
      cleanupFacts: factsFor({ 'dotfiles-3vb8': { head_sha: HEAD } })
    });

    const run = await migration.run();

    expect(run.results['dotfiles-3vb8']).toMatchObject({
      subject_sha: HEAD,
      subject_source: 'head_sha'
    });
  });

  test('preserves a legacy record when its subject is not contained in the fetched tip', async () => {
    const store = storeWith(fixture('legacy-cleanup-dotfiles.json'));
    const migration = migrationWith({
      store,
      gitRun: gitFor({ covers: () => false }),
      cleanupFacts: factsFor({ 'dotfiles-3vb8': { merge_sha: MERGED } })
    });

    const run = await migration.run();

    expect(run.results['dotfiles-3vb8']).toMatchObject({
      disposition: 'legacy_manual',
      reason: 'subject_not_contained'
    });
    expect(store.snapshot(WS).cleanup_failed['dotfiles-3vb8']).toMatchObject({
      step: 'deploy',
      reason: 'deploy_base_not_synced'
    });
  });

  test('preserves a legacy record whose subject SHA is unobservable', async () => {
    const store = storeWith(fixture('legacy-cleanup-dotfiles.json'));
    const migration = migrationWith({
      store,
      cleanupFacts: factsFor({})
    });

    const run = await migration.run();

    expect(run.results['dotfiles-y3qv']).toMatchObject({
      disposition: 'legacy_manual',
      reason: 'subject_missing'
    });
    expect(store.snapshot(WS).cleanup_failed['dotfiles-y3qv']).toBeDefined();
  });

  test('preserves a legacy record when the target base cannot be resolved', async () => {
    const store = storeWith(fixture('legacy-cleanup-dotfiles.json'));
    const migration = migrationWith({
      store,
      cleanupFacts: async () => ({
        base: null,
        base_reason: 'base_unresolved:no_resolver',
        merge_sha: MERGED,
        head_sha: null,
        head_ref: null,
        pr_url: null
      })
    });

    const run = await migration.run();

    expect(run.results['dotfiles-p0mq']).toMatchObject({
      disposition: 'legacy_manual',
      reason: 'base_unresolved:no_resolver'
    });
  });

  test('resumes the idempotent closure for a legacy closure-step failure', async () => {
    const queue = fixture('legacy-cleanup-beads-ui.json');
    queue.cleanup_failed['UI-f17c'] = {
      step: 'child_sweep',
      reason: 'child_sweep_failed',
      bd_restore: null,
      at: 1786581584471,
      detail: null
    };
    queue.pr_wait[0].cleanup_cursor = 'child_sweep';
    const store = storeWith(queue);
    const resumeClosure = vi.fn(async () => ({ ok: true }));
    const migration = migrationWith({
      store,
      resumeClosure,
      cleanupFacts: factsFor({ 'UI-f17c': { merge_sha: F17C_MERGED } })
    });

    const run = await migration.run();

    expect(run.results['UI-f17c'].disposition).toBe('closure_resumed');
    expect(resumeClosure).toHaveBeenCalledWith('UI-f17c');
  });

  test('keeps a mid-lane cursor when it resumes a closure row', async () => {
    const queue = fixture('legacy-cleanup-beads-ui.json');
    queue.cleanup_failed['UI-f17c'] = {
      step: 'branch_cleanup',
      reason: 'branch_cleanup_failed',
      bd_restore: null,
      at: 1786581584471,
      detail: null
    };
    queue.pr_wait[0].cleanup_cursor = 'branch_cleanup';
    const store = storeWith(queue);
    const migration = migrationWith({
      store,
      resumeClosure: async () => ({ ok: true }),
      cleanupFacts: factsFor({ 'UI-f17c': { merge_sha: F17C_MERGED } })
    });

    await migration.run();

    expect(store.snapshot(WS).pr_wait[0].cleanup_cursor).toBe('branch_cleanup');
  });

  test('never converts a failure the new lane itself recorded', async () => {
    const queue = fixture('legacy-cleanup-beads-ui.json');
    queue.cleanup_failed['UI-f17c'] = {
      step: 'repo_operations',
      reason: 'repo_operation_failed',
      bd_restore: null,
      at: 1786581584471,
      detail: null
    };
    const store = storeWith(queue);
    const migration = migrationWith({
      store,
      cleanupFacts: factsFor({ 'UI-f17c': { merge_sha: F17C_MERGED } })
    });

    const run = await migration.run();

    expect(run.results).toEqual({});
    expect(store.snapshot(WS).cleanup_failed['UI-f17c']).toBeDefined();
  });

  test('preserves a legacy record whose bead left the PR-wait lane', async () => {
    const queue = fixture('legacy-cleanup-beads-ui.json');
    queue.pr_wait = [];
    const store = storeWith(queue);
    const migration = migrationWith({
      store,
      cleanupFacts: factsFor({ 'UI-f17c': { merge_sha: F17C_MERGED } })
    });

    const run = await migration.run();

    expect(run.results['UI-f17c']).toMatchObject({
      disposition: 'legacy_manual',
      reason: 'row_not_in_pr_wait'
    });
  });

  test('drops the retired repair keys from an existing operation record', async () => {
    const queue = fixture('legacy-cleanup-dotfiles.json');
    queue.auto_repair = true;
    queue.repo_operations = {
      op1: {
        schema: 1,
        repo_id: REPO,
        kind: 'deploy',
        subjects: [{ bead_id: 'dotfiles-3vb8', merged_sha: MERGED }],
        effective_base_sha: TIP,
        target_base: 'main',
        script_mode: '100755',
        script_blob_sha: 'f'.repeat(40),
        state: 'failed',
        attempt_id: 'op1:1',
        repair: {
          chain_id: 'op1',
          owner_bead: 'dotfiles-3vb8',
          auto_budget: 1,
          auto_used: 0,
          session_id: null,
          attempt_id: null
        }
      }
    };
    const store = storeWith(queue);
    const migration = migrationWith({
      store,
      cleanupFacts: factsFor({ 'dotfiles-3vb8': { merge_sha: MERGED } })
    });

    await migration.run();

    const after = store.snapshot(WS);
    expect(after.repo_operations.op1.state).toBe('failed');
    expect(Object.hasOwn(after.repo_operations.op1, 'repair')).toBe(false);
    expect(Object.hasOwn(after, 'auto_repair')).toBe(false);
  });

  test('stores the result and its schema version in one atomic write', async () => {
    const store = storeWith(fixture('legacy-cleanup-beads-ui.json'));
    const migration = migrationWith({
      store,
      cleanupFacts: factsFor({ 'UI-f17c': { merge_sha: F17C_MERGED } })
    });

    await migration.run();

    const persisted = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    expect(persisted.repo_operation_migration.version).toBe(
      REPO_OPERATION_MIGRATION_VERSION
    );
    expect(
      persisted.repo_operation_migration.results['UI-f17c'].disposition
    ).toBe('verify_retired');
    expect(persisted.cleanup_failed['UI-f17c']).toBeUndefined();
  });

  test('stamps the schema version for a workspace with no legacy record', async () => {
    const queue = fixture('legacy-cleanup-beads-ui.json');
    queue.cleanup_failed = {};
    const store = storeWith(queue);
    const migration = migrationWith({ store, cleanupFacts: factsFor({}) });

    const run = await migration.run();

    expect(run.adopted).toBe(false);
    expect(store.snapshot(WS).repo_operation_migration).toMatchObject({
      version: REPO_OPERATION_MIGRATION_VERSION,
      results: {}
    });
  });

  test('adopts the stored result on a second run instead of migrating again', async () => {
    const store = storeWith(fixture('legacy-cleanup-dotfiles.json'));
    const cleanupFacts = vi.fn(
      factsFor({ 'dotfiles-p0mq': { merge_sha: P0MQ_MERGED } })
    );
    const first = await migrationWith({ store, cleanupFacts }).run();
    const revision_after_first = store.snapshot(WS).revision;

    const second = await migrationWith({ store, cleanupFacts }).run();

    expect(second).toMatchObject({ adopted: true, results: first.results });
    expect(cleanupFacts).toHaveBeenCalledTimes(3);
    expect(store.snapshot(WS).revision).toBe(revision_after_first);
  });

  test('adopts a stored result written by an already-restarted runtime', async () => {
    const store = storeWith(fixture('legacy-cleanup-beads-ui.json'));
    const resumeClosure = vi.fn(async () => ({ ok: true }));
    await migrationWith({
      store,
      resumeClosure,
      cleanupFacts: factsFor({ 'UI-f17c': { merge_sha: F17C_MERGED } })
    }).run();
    const reloaded = createQueueStore();

    const run = await migrationWith({
      store: reloaded,
      resumeClosure,
      cleanupFacts: factsFor({ 'UI-f17c': { merge_sha: F17C_MERGED } })
    }).run();

    expect(run).toMatchObject({
      adopted: true,
      version: REPO_OPERATION_MIGRATION_VERSION
    });
  });

  test('refuses to migrate without a cleanup fact resolver', async () => {
    const store = storeWith(fixture('legacy-cleanup-beads-ui.json'));
    const migration = createRepoOperationMigration({
      workspace: WS,
      repo: REPO,
      store,
      gitRun: gitFor(),
      cleanupFacts: /** @type {any} */ (null)
    });

    const run = await migration.run();

    expect(run).toMatchObject({
      ok: false,
      code: 'migration_facts_unavailable'
    });
    expect(store.snapshot(WS).repo_operation_migration).toBeNull();
  });

  test('preserves a legacy record when the remote base tip is unresolvable', async () => {
    const store = storeWith(fixture('legacy-cleanup-beads-ui.json'));
    const migration = migrationWith({
      store,
      gitRun: gitFor({ tip: null }),
      cleanupFacts: factsFor({ 'UI-f17c': { merge_sha: F17C_MERGED } })
    });

    const run = await migration.run();

    expect(run.results['UI-f17c']).toMatchObject({
      disposition: 'legacy_manual',
      reason: 'remote_base_unresolved'
    });
  });

  test('preserves a legacy record when the new repo-ops config is invalid', async () => {
    const store = storeWith(fixture('legacy-cleanup-beads-ui.json'));
    const migration = migrationWith({
      store,
      repoOperations: repoOperationsFor({
        ok: false,
        code: 'repo_ops_config_invalid'
      }),
      cleanupFacts: factsFor({ 'UI-f17c': { merge_sha: F17C_MERGED } })
    });

    const run = await migration.run();

    expect(run.results['UI-f17c']).toMatchObject({
      disposition: 'legacy_manual',
      reason: 'repo_ops_config_invalid'
    });
  });

  test('fetches the remote base once for several legacy rows', async () => {
    const store = storeWith(fixture('legacy-cleanup-dotfiles.json'));
    const git = vi.fn(gitFor());
    const migration = migrationWith({
      store,
      gitRun: git,
      cleanupFacts: factsFor({
        'dotfiles-3vb8': { merge_sha: MERGED },
        'dotfiles-p0mq': { merge_sha: P0MQ_MERGED },
        'dotfiles-y3qv': { merge_sha: 'd'.repeat(40) }
      })
    });

    await migration.run();

    expect(git.mock.calls.filter(([args]) => args[0] === 'fetch')).toHaveLength(
      1
    );
  });
});
