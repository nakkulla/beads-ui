/**
 * The shared post-merge job runner over a REAL coordinator and queue store
 * (UI-1eag §3.2, §5 "앞선 트리 해석"). Only git, the deploy worktree and the
 * process runner are fakes, so the ledger CAS, the coordinator's exact
 * alignment and its prepare/launch refusals are the production code.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createLockManager } from './locks.js';
import { createPostMergeJobRunner } from './post-merge-job.js';
import { createQueueStore } from './queue-store.js';
import { createRepoOperationCoordinator } from './repo-operation-coordinator.js';

const BEAD = 'UI-row';
const OLDER = '0'.repeat(40);
const MERGED = 'a'.repeat(40);
const ADVANCED = 'b'.repeat(40);
const NEWER = 'c'.repeat(40);
const TIP = 'd'.repeat(40);
const FORK = 'e'.repeat(40);
const UNRELATED = 'f'.repeat(40);
const NAME = '10-reindex';
const BLOB_OLD = '1'.repeat(40);
const BLOB_REVISION = '2'.repeat(40);
const BLOB_OTHER = '3'.repeat(40);
const BLOB_FOREIGN = '4'.repeat(40);
const KEY_OLD = `${NAME}@${BLOB_OLD}`;
const KEY_REVISION = `${NAME}@${BLOB_REVISION}`;
const REVISION_SOURCE = `#!/bin/sh\n# repo-ops-replaces: ${KEY_OLD}\necho fixed\n`;

/**
 * First parents of this repository's history: OLDER → MERGED → ADVANCED →
 * NEWER → TIP is the base line, FORK descends from MERGED off the base, and
 * UNRELATED shares no history with any of them.
 *
 * @type {Record<string, string>}
 */
const PARENTS = {
  [MERGED]: OLDER,
  [ADVANCED]: MERGED,
  [NEWER]: ADVANCED,
  [TIP]: NEWER,
  [FORK]: MERGED
};

/** @type {string} */
let root;

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'post-merge-job-'));
  process.env.XDG_STATE_HOME = path.join(root, 'state');
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(root, { recursive: true, force: true });
});

/**
 * @param {string} ancestor
 * @param {string} descendant
 */
function isAncestor(ancestor, descendant) {
  /** @type {string|undefined} */
  let cursor = descendant;
  while (cursor !== undefined) {
    if (cursor === ancestor) {
      return true;
    }
    cursor = PARENTS[cursor];
  }
  return false;
}

/**
 * @typedef {{ name: string, sha: string, mode?: string, type?: string }} TreeEntry
 */

/**
 * @param {TreeEntry[]} entries
 */
function listing(entries) {
  return entries
    .map(
      (entry) =>
        `${entry.mode ?? '100755'} ${entry.type ?? 'blob'} ${entry.sha}\trepo-ops/post-merge.d/${entry.name}\0`
    )
    .join('');
}

/**
 * One repository world: the job trees per commit, the deploy worktree HEAD,
 * the fetched base tip, and every spawn the process runner was asked for.
 *
 * @param {{ head?: string|null, trees?: Record<string, TreeEntry[]>, sources?: Record<string, string> }} [options]
 */
function rigFor(options = {}) {
  const store = createQueueStore({
    filePathFor: (workspace) => path.join(workspace, 'queue.json')
  });
  const world = {
    head: options.head ?? null,
    tip: TIP,
    /** @type {{ blob: string, target_sha: string }[]} */
    spawns: [],
    /** @type {Map<string, { exit_code: number, signal: null }>} */
    markers: new Map()
  };
  const trees = options.trees ?? {};
  const sources = options.sources ?? {};
  /** @param {string[]} args */
  const gitRun = async (args) => {
    if (args[0] === 'merge-base' && args[1] === '--is-ancestor') {
      return {
        code: isAncestor(args[2], args[3]) ? 0 : 1,
        stdout: '',
        stderr: ''
      };
    }
    if (args[0] === 'ls-tree' && args[1] === '-z') {
      return { code: 0, stdout: listing(trees[args[2]] ?? []), stderr: '' };
    }
    if (args[0] === 'ls-tree') {
      // No `repo-ops/config.toml` at any commit: the default job timeout.
      return { code: 0, stdout: '', stderr: '' };
    }
    if (args[0] === 'show') {
      return { code: 128, stdout: '', stderr: 'missing' };
    }
    if (args[0] === 'cat-file' && args[1] === 'blob') {
      return {
        code: 0,
        stdout: sources[args[2]] ?? '#!/bin/sh\n',
        stderr: ''
      };
    }
    return { code: 1, stdout: '', stderr: 'unexpected' };
  };
  const deploy_worktree = {
    bindTarget: vi.fn(async () => ({ ok: true, target_sha: world.tip })),
    readState: vi.fn(async () => ({
      ok: true,
      head: world.head,
      clean: true,
      path: path.join(root, 'deploy')
    })),
    ensureAligned: vi.fn(async (/** @type {any} */ input) => {
      world.head = input.target_sha;
      return {
        ok: true,
        path: path.join(root, 'deploy'),
        target_sha: input.target_sha
      };
    }),
    verifyAligned: vi.fn(async (/** @type {any} */ input) => ({
      ok: world.head === input.target_sha
    })),
    verifyCovered: vi.fn(async () => ({ ok: true }))
  };
  const coordinator = createRepoOperationCoordinator({
    workspace: root,
    repo: root,
    store,
    locks: createLockManager(),
    gitRun,
    runner: /** @type {never} */ ({
      start: vi.fn(async (/** @type {any} */ input) => {
        const operation =
          store.snapshot(root).repo_operations[input.operation_id];
        world.spawns.push({
          blob: operation.script_blob_sha,
          target_sha: input.target_sha
        });
        world.markers.set(input.operation_id, { exit_code: 0, signal: null });
        return {
          ok: true,
          process_identity: { pid: 1, pgid: 1, started_at: 1 },
          log_path: path.join(root, `${input.operation_id}.log`)
        };
      }),
      readMarker: (
        /** @type {string} */ _workspace,
        /** @type {string} */ operation_id
      ) => world.markers.get(operation_id) ?? null,
      readLaunchMarker: () => null,
      processController: { probe: () => ({ state: 'owned' }) }
    }),
    transition: /** @type {never} */ ({
      materialize: async () => ({ ok: true, path: path.join(root, 'script') }),
      reclaim: () => {}
    }),
    deployWorktree: /** @type {never} */ (deploy_worktree),
    deployLock: /** @type {never} */ (
      async () => ({ ok: true, release: async () => {} })
    ),
    sleep: async () => {}
  });
  return { store, world, gitRun, coordinator, deploy_worktree };
}

/**
 * Run the step once for the row landed at MERGED.
 *
 * @param {ReturnType<typeof rigFor>} rig
 * @param {{ job_retry?: boolean, operations?: any }} [options]
 */
function runJobs(rig, options = {}) {
  const runner = createPostMergeJobRunner({
    workspace: root,
    repo: root,
    store: rig.store,
    gitRun: rig.gitRun,
    repoOperations: options.operations ?? rig.coordinator
  });
  /** @type {import('./post-merge-job.js').PostMergeJobRunInput<{ stopped?: string, log_path?: string|null, pending?: boolean }>} */
  const input = {
    bead_id: BEAD,
    merge_sha: MERGED,
    job_retry: options.job_retry === true,
    resolveTargetBase: async () => ({ ok: true, base: 'main' }),
    onFailure: async (reason, evidence) => ({
      stopped: reason,
      log_path: evidence.log_path ?? null
    }),
    onPending: async () => ({ pending: true })
  };
  return runner.run(input);
}

/**
 * The coordinator with the deploy HEAD moved to `next` right after one of its
 * phases ran — another executor's deploy landing in between.
 *
 * @param {ReturnType<typeof rigFor>} rig
 * @param {'eligibleJobHead'|'prepareJob'} phase
 * @param {string} next
 */
function movingAfter(rig, phase, next) {
  /** @type {any} */
  const coordinator = rig.coordinator;
  return {
    ...coordinator,
    [phase]: async (/** @type {any} */ input) => {
      const result = await coordinator[phase](input);
      rig.world.head = next;
      return result;
    }
  };
}

/**
 * Seed one job operation that already failed, with or without a spawn.
 *
 * @param {any} store
 * @param {{ operation_id: string, blob: string, target_sha: string, started: boolean }} input
 */
function seedFailedOperation(store, input) {
  seedQueuedOperation(store, input);
  settleSeeded(store, input);
}

/**
 * @param {any} store
 * @param {{ operation_id: string, blob: string, target_sha: string }} input
 */
function seedQueuedOperation(store, input) {
  store.ensureRepoOperation(root, {
    operation_id: input.operation_id,
    repo_id: root,
    kind: 'job',
    subjects: [{ bead_id: BEAD, merged_sha: input.target_sha }],
    effective_base_sha: input.target_sha,
    target_base: 'main',
    target_sha: input.target_sha,
    script_path: `repo-ops/post-merge.d/${NAME}`,
    script_mode: '100755',
    script_blob_sha: input.blob
  });
}

/**
 * @param {any} store
 * @param {{ operation_id: string, started: boolean }} input
 */
function settleSeeded(store, input) {
  const operation = store.snapshot(root).repo_operations[input.operation_id];
  if (input.started) {
    store.startRepoOperation(root, {
      operation_id: input.operation_id,
      attempt_id: operation.attempt_id,
      process_identity: { pid: 7, pgid: 7, started_at: 1 },
      log_path: path.join(root, `${input.operation_id}.log`)
    });
  }
  store.settleRepoOperation(root, {
    operation_id: input.operation_id,
    attempt_id: operation.attempt_id,
    exit_code: input.started ? 1 : null,
    signal: null,
    failure: {
      code: input.started ? 'script_failed' : 'post_merge_job_target_moved',
      fingerprint: 'f'.repeat(64),
      detail: '',
      interrupted: false
    }
  });
}

/**
 * The landed key's own run already failed (`started`), the shape a row
 * reaches when its job broke at its own merged commit.
 *
 * @param {any} store
 */
function seedFailedOldKey(store) {
  seedFailedOperation(store, {
    operation_id: 'job-old',
    blob: BLOB_OLD,
    target_sha: MERGED,
    started: true
  });
  store.recordPostMergeJobIntent(root, {
    key: KEY_OLD,
    operation_id: 'job-old',
    repo_id: root
  });
}

/**
 * The landed key reserved a revision run at ADVANCED that then ended failed.
 *
 * @param {any} store
 * @param {{ started: boolean }} input
 */
function seedReservedRevision(store, input) {
  seedFailedOldKey(store);
  seedQueuedOperation(store, {
    operation_id: 'job-revision',
    blob: BLOB_REVISION,
    target_sha: ADVANCED
  });
  store.recordPostMergeJobIntent(root, {
    key: KEY_REVISION,
    operation_id: 'job-revision',
    repo_id: root,
    replaces: { key: KEY_OLD, operation_id: 'job-old' }
  });
  settleSeeded(store, {
    operation_id: 'job-revision',
    started: input.started
  });
}

/** The landed tree and an advanced tree that both carry the old blob. */
const SAME_BLOB_TREES = {
  [MERGED]: [{ name: NAME, sha: BLOB_OLD }],
  [ADVANCED]: [{ name: NAME, sha: BLOB_OLD }],
  [NEWER]: [{ name: NAME, sha: BLOB_OLD }]
};

/** The landed tree carries the old blob; the advanced trees its revision. */
const REVISION_TREES = {
  [MERGED]: [{ name: NAME, sha: BLOB_OLD }],
  [ADVANCED]: [{ name: NAME, sha: BLOB_REVISION }],
  [NEWER]: [{ name: NAME, sha: BLOB_REVISION }]
};

describe('post-merge job runner — where a landed job runs (UI-1eag §3.2)', () => {
  test('runs the job at the merged commit when the deploy HEAD is that commit', async () => {
    const rig = rigFor({ head: MERGED, trees: SAME_BLOB_TREES });

    await runJobs(rig);

    expect(rig.world.spawns).toEqual([{ blob: BLOB_OLD, target_sha: MERGED }]);
  });

  test('runs the job at the merged commit when the deploy HEAD is older', async () => {
    const rig = rigFor({ head: OLDER, trees: SAME_BLOB_TREES });

    await runJobs(rig);

    expect(rig.world.spawns).toEqual([{ blob: BLOB_OLD, target_sha: MERGED }]);
  });

  test('runs the same blob at the advanced deploy HEAD under the landed key', async () => {
    const rig = rigFor({ head: ADVANCED, trees: SAME_BLOB_TREES });

    const result = await runJobs(rig);

    expect(result).toBeNull();
    expect(rig.world.spawns).toEqual([
      { blob: BLOB_OLD, target_sha: ADVANCED }
    ]);
    expect(rig.store.snapshot(root).post_merge_jobs[KEY_OLD]).toMatchObject({
      state: 'applied'
    });
  });

  test('never rewinds the advanced deploy HEAD to the merged commit', async () => {
    const rig = rigFor({ head: ADVANCED, trees: SAME_BLOB_TREES });

    await runJobs(rig);

    expect(rig.deploy_worktree.ensureAligned.mock.calls).toEqual([
      [expect.objectContaining({ target_sha: ADVANCED })],
      [expect.objectContaining({ target_sha: ADVANCED })]
    ]);
    expect(rig.world.head).toBe(ADVANCED);
  });

  test('runs the declared revision at the advanced HEAD instead of the old blob', async () => {
    const rig = rigFor({
      head: ADVANCED,
      trees: REVISION_TREES,
      sources: { [BLOB_REVISION]: REVISION_SOURCE }
    });
    seedFailedOldKey(rig.store);

    await runJobs(rig);

    expect(rig.world.spawns).toEqual([
      { blob: BLOB_REVISION, target_sha: ADVANCED }
    ]);
  });

  test('supersedes the failed landed key once its revision succeeds at the advanced HEAD', async () => {
    const rig = rigFor({
      head: ADVANCED,
      trees: REVISION_TREES,
      sources: { [BLOB_REVISION]: REVISION_SOURCE }
    });
    seedFailedOldKey(rig.store);

    const result = await runJobs(rig);

    const ledger = rig.store.snapshot(root).post_merge_jobs;
    expect(result).toBeNull();
    expect(ledger[KEY_OLD]).toMatchObject({
      state: 'superseded',
      operation_id: 'job-old',
      repair: {
        key: KEY_REVISION,
        operation_id: ledger[KEY_REVISION].operation_id
      }
    });
    expect(ledger[KEY_REVISION]).toMatchObject({
      state: 'applied',
      replaces: { key: KEY_OLD, operation_id: 'job-old' }
    });
  });

  test.each([
    ['no file under the name', [], {}],
    [
      'a changed blob without a declaration',
      [{ name: NAME, sha: BLOB_OTHER }],
      { [BLOB_OTHER]: '#!/bin/sh\necho changed\n' }
    ],
    [
      'a declaration naming another key',
      [{ name: NAME, sha: BLOB_OTHER }],
      {
        [BLOB_OTHER]: `#!/bin/sh\n# repo-ops-replaces: ${NAME}@${BLOB_FOREIGN}\n`
      }
    ],
    [
      'a symlink under the name',
      [{ name: NAME, sha: BLOB_OLD, mode: '120000' }],
      {}
    ]
  ])(
    'stops on the moved target without effect when the advanced HEAD carries %s',
    async (_label, advanced_tree, sources) => {
      const rig = rigFor({
        head: ADVANCED,
        trees: {
          [MERGED]: [{ name: NAME, sha: BLOB_OLD }],
          [ADVANCED]: advanced_tree
        },
        sources
      });

      const result = await runJobs(rig);

      expect(result).toEqual({
        stopped: `post_merge_job_target_moved:${KEY_OLD}`,
        log_path: null
      });
      expect({
        spawns: rig.world.spawns,
        ledger: rig.store.snapshot(root).post_merge_jobs,
        operations: rig.store.snapshot(root).repo_operations
      }).toEqual({ spawns: [], ledger: {}, operations: {} });
    }
  );

  test.each([
    ['unrelated to the merged commit', UNRELATED],
    ['outside the fetched target base', FORK]
  ])('refuses a deploy HEAD %s without effect', async (_label, deploy_head) => {
    const rig = rigFor({
      head: deploy_head,
      trees: {
        [MERGED]: [{ name: NAME, sha: BLOB_OLD }],
        [deploy_head]: [{ name: NAME, sha: BLOB_OLD }]
      }
    });

    const result = await runJobs(rig);

    expect(result).toEqual({
      stopped: `post_merge_job_target_moved:${KEY_OLD}`,
      log_path: null
    });
    expect({
      spawns: rig.world.spawns,
      ledger: rig.store.snapshot(root).post_merge_jobs,
      operations: rig.store.snapshot(root).repo_operations
    }).toEqual({ spawns: [], ledger: {}, operations: {} });
  });

  test('judges an applied key without observing the deploy HEAD', async () => {
    const rig = rigFor({ head: ADVANCED, trees: SAME_BLOB_TREES });
    rig.store.recordPostMergeJobIntent(root, {
      key: KEY_OLD,
      operation_id: 'job-old',
      repo_id: root
    });
    rig.store.applyPostMergeJob(root, {
      key: KEY_OLD,
      operation_id: 'job-old'
    });

    await runJobs(rig);

    expect(rig.deploy_worktree.readState).not.toHaveBeenCalled();
  });
});

describe('post-merge job runner — a deploy HEAD that moves mid-run (UI-1eag §3.2)', () => {
  test('records nothing when the HEAD moves before prepare', async () => {
    const rig = rigFor({ head: ADVANCED, trees: SAME_BLOB_TREES });

    const result = await runJobs(rig, {
      operations: movingAfter(rig, 'eligibleJobHead', NEWER)
    });

    expect(result).toMatchObject({
      stopped: `post_merge_job_target_moved:${KEY_OLD}`
    });
    expect({
      spawns: rig.world.spawns,
      ledger: rig.store.snapshot(root).post_merge_jobs,
      operations: rig.store.snapshot(root).repo_operations
    }).toEqual({ spawns: [], ledger: {}, operations: {} });
  });

  test('re-resolves at the new HEAD on the judgment after a prepare refusal', async () => {
    const rig = rigFor({ head: ADVANCED, trees: SAME_BLOB_TREES });
    await runJobs(rig, {
      operations: movingAfter(rig, 'eligibleJobHead', NEWER)
    });

    await runJobs(rig);

    expect(rig.world.spawns).toEqual([{ blob: BLOB_OLD, target_sha: NEWER }]);
  });

  test('ends a launch refusal as an operation that never started', async () => {
    const rig = rigFor({ head: ADVANCED, trees: SAME_BLOB_TREES });

    await runJobs(rig, { operations: movingAfter(rig, 'prepareJob', NEWER) });

    const ledger = rig.store.snapshot(root).post_merge_jobs[KEY_OLD];
    expect(
      rig.store.snapshot(root).repo_operations[ledger.operation_id]
    ).toMatchObject({
      state: 'failed',
      started_at: null,
      target_sha: ADVANCED,
      failure: { code: 'post_merge_job_target_moved' }
    });
  });

  test('re-records the same key at the new HEAD after a launch refusal', async () => {
    const rig = rigFor({ head: ADVANCED, trees: SAME_BLOB_TREES });
    await runJobs(rig, { operations: movingAfter(rig, 'prepareJob', NEWER) });

    const result = await runJobs(rig);

    expect(result).toBeNull();
    expect(rig.world.spawns).toEqual([{ blob: BLOB_OLD, target_sha: NEWER }]);
    expect(rig.store.snapshot(root).post_merge_jobs[KEY_OLD]).toMatchObject({
      state: 'applied'
    });
  });

  /**
   * A reserved revision whose launch was refused because the HEAD moved on,
   * followed by the next judgment of the landed row.
   */
  async function revisionRefusedAtLaunchThenRejudged() {
    const rig = rigFor({
      head: ADVANCED,
      trees: REVISION_TREES,
      sources: { [BLOB_REVISION]: REVISION_SOURCE }
    });
    seedFailedOldKey(rig.store);
    await runJobs(rig, { operations: movingAfter(rig, 'prepareJob', NEWER) });
    const refused =
      rig.store.snapshot(root).post_merge_jobs[KEY_REVISION].operation_id;
    const result = await runJobs(rig);
    return { rig, refused, result };
  }

  test('replaces the revision intent and the repair pointer together at the new HEAD', async () => {
    const { rig, refused, result } =
      await revisionRefusedAtLaunchThenRejudged();

    const ledger = rig.store.snapshot(root).post_merge_jobs;
    const rerun = ledger[KEY_REVISION].operation_id;
    expect(result).toBeNull();
    expect(rerun).not.toBe(refused);
    expect(ledger[KEY_OLD]).toMatchObject({
      state: 'superseded',
      repair: { key: KEY_REVISION, operation_id: rerun }
    });
    expect(rig.store.snapshot(root).repo_operations[refused]).toMatchObject({
      state: 'failed',
      superseded_by: rerun
    });
  });

  test('never spawns the old blob across a refused revision launch', async () => {
    const { rig } = await revisionRefusedAtLaunchThenRejudged();

    expect(rig.world.spawns).toEqual([
      { blob: BLOB_REVISION, target_sha: NEWER }
    ]);
  });
});

describe('post-merge job runner — a reserved revision that failed after starting (UI-1eag §3.2)', () => {
  test('stops on the repair failure without human retry authority', async () => {
    const rig = rigFor({
      head: ADVANCED,
      trees: REVISION_TREES,
      sources: { [BLOB_REVISION]: REVISION_SOURCE }
    });
    seedReservedRevision(rig.store, { started: true });

    const result = await runJobs(rig);

    expect(result).toEqual({
      stopped: `post_merge_job_repair_failed:${KEY_REVISION}:script_failed`,
      log_path: path.join(root, 'job-revision.log')
    });
    expect(rig.world.spawns).toEqual([]);
  });

  test('re-runs the reserved revision at the advanced HEAD under human retry', async () => {
    const rig = rigFor({
      head: ADVANCED,
      trees: REVISION_TREES,
      sources: { [BLOB_REVISION]: REVISION_SOURCE }
    });
    seedReservedRevision(rig.store, { started: true });

    await runJobs(rig, { job_retry: true });

    expect(rig.world.spawns).toEqual([
      { blob: BLOB_REVISION, target_sha: ADVANCED }
    ]);
    expect(rig.store.snapshot(root).post_merge_jobs[KEY_OLD]).toMatchObject({
      state: 'superseded'
    });
  });

  test('stops on the repair failure when the advanced HEAD no longer carries the reserved revision', async () => {
    const rig = rigFor({
      head: NEWER,
      trees: {
        ...REVISION_TREES,
        [NEWER]: [{ name: NAME, sha: BLOB_OTHER }]
      },
      sources: {
        [BLOB_REVISION]: REVISION_SOURCE,
        [BLOB_OTHER]: `#!/bin/sh\n# repo-ops-replaces: ${KEY_OLD}\n`
      }
    });
    seedReservedRevision(rig.store, { started: false });

    const result = await runJobs(rig);

    expect(result).toMatchObject({
      stopped: `post_merge_job_repair_failed:${KEY_REVISION}:post_merge_job_target_moved`
    });
    expect(rig.world.spawns).toEqual([]);
  });
});
