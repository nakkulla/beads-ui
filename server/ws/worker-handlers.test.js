import createDebug from 'debug';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { runBdJsonProjected } from '../bd.js';
import { createExecPresetStore } from '../exec-preset-store.js';
import { registerWorkspace } from '../registry-watcher.js';
import {
  __registerWorkerAttachmentForTest,
  __resetWorkerAttachmentsForTest
} from '../worker/attach.js';
import { createExecPresetCoordinator } from '../worker/exec-preset-coordinator.js';
import {
  __resetForeignBlockerCachesForTest,
  cachedIssuePrefixFor,
  prewarmIssuePrefix
} from '../worker/foreign-blocker-status.js';
import { getWorkerRuntime } from '../worker/runtime.js';
import {
  __resetScopeCacheForTest,
  __setScopeCacheForTest,
  createScopeCache
} from '../worker/scope-cache.js';
import {
  __resetWorkspaceSnapshotRuntimeForTest,
  __setWorkspaceSnapshotCoordinatorFactoryForTest,
  requestWorkspaceSnapshot
} from '../workspace-snapshot-runtime.js';
import { setConnWorkspace } from './context.js';
import {
  attemptsWithUsage,
  decorateQueue,
  handleWorkerAttemptResume,
  handleWorkerQueueSetOrchestrationDefaults,
  handleWorkerResolveInSession,
  onWorkerSnapshotRefresh
} from './worker-handlers.js';

vi.mock('../bd.js', async (importOriginal) => {
  /** @type {any} */
  const actual = await importOriginal();
  return { ...actual, runBdJsonProjected: vi.fn() };
});

// Neither `workspace-snapshot-runtime.js` nor `foreign-blocker-status.js` is
// module-mocked here: both sit in an import cycle with `list-adapters.js`, so a
// factory mock reaches only one of the two readers and the peer lookup silently
// keeps the real function. Their own seams — the coordinator factory and the
// workspace registry under a temporary `$HOME` — have no such split.

const TMP_ROOT = path.join(os.tmpdir(), 'bdui-bead-dependents');
const WS = path.join(TMP_ROOT, 'beads-ui');
const WS_PEER = path.join(TMP_ROOT, 'dotfiles');

/** @type {string|undefined} */
let original_home;
/** @type {string|undefined} */
let original_state_home;

/**
 * A workspace snapshot carrying only what the follow-up lookup reads: the id
 * index and the `blocks_in` edges. `waits_on` is the direction the generation
 * records — the issue waits on those ids, so it is THEIR follow-up.
 *
 * @param {Array<{ id: string, status?: string, waits_on?: string[] }>} issues
 * @returns {any}
 */
function snapshotOf(issues) {
  /** @type {Map<string, any>} */
  const id_index = new Map();
  /** @type {Map<string, string[]>} */
  const blocks_in = new Map();
  for (const issue of issues) {
    id_index.set(issue.id, {
      id: issue.id,
      status: issue.status ?? 'open',
      updated_at: 1,
      closed_at: null
    });
    for (const blocker_id of issue.waits_on ?? []) {
      const waiters = blocks_in.get(blocker_id) ?? [];
      waiters.push(issue.id);
      blocks_in.set(blocker_id, waiters);
    }
  }
  return {
    generation: 1,
    all: [...id_index.values()],
    id_index,
    ready_explain: { ready: [], blocked: [] },
    command_mode: 'embedded-dependencies',
    command_count: 1,
    dependency_edges: [],
    blocks_out: new Map(),
    blocks_in
  };
}

/**
 * Serve one snapshot per workspace root; a root absent from the map gets no
 * coordinator at all, which is what the partial contract turns on. A function
 * value stands for a coordinator whose read throws.
 *
 * @param {Record<string, any>} by_root
 */
function seedSnapshots(by_root) {
  __setWorkspaceSnapshotCoordinatorFactoryForTest(
    /** @type {any} */ (
      (/** @type {{ cwd?: string }} */ options) => {
        const root = String(options?.cwd ?? '');
        return {
          getSnapshot: () => {
            const seeded = by_root[root];
            return typeof seeded === 'function' ? seeded() : (seeded ?? null);
          },
          request: async () => ({ ok: false }),
          signalMutation: () => {},
          onFilled: () => {}
        };
      }
    )
  );
  for (const root of Object.keys(by_root)) {
    requestWorkspaceSnapshot(root, 'test');
  }
}

/**
 * A queue holding one bead in each member lane plus one in `pr_wait`, the same
 * shape the `bead_scope` suite uses so both decorations are read over one set.
 *
 * @returns {Record<string, unknown>}
 */
function laneQueue() {
  return {
    revision: 1,
    auto_advance: false,
    auto_merge: false,
    queue: [{ bead_id: 'UI-1', added_at: 1 }],
    serial_lanes: [
      { id: 's1', entries: [{ bead_id: 'UI-4', added_at: 1 }] },
      { id: 's2', entries: [] }
    ],
    pr_wait: [{ bead_id: 'UI-3', added_at: 1 }],
    done: [],
    attempts: {
      'att-1': { attempt_id: 'att-1', bead_id: 'UI-2', status: 'running' }
    },
    exec_defaults: {}
  };
}

/**
 * Fill both visible rigs' prefix caches.
 */
async function warmForeignPrefixes() {
  registerWorkspace({
    path: WS_PEER,
    database: path.join(WS_PEER, '.beads/db')
  });
  vi.mocked(runBdJsonProjected).mockImplementation(
    async (family, _args, options) =>
      /** @type {any} */ (
        family === 'config'
          ? {
              ok: true,
              data: {
                issue_prefix: options?.cwd === WS ? 'UI' : 'dotfiles'
              }
            }
          : { ok: false }
      )
  );
  prewarmIssuePrefix(WS);
  prewarmIssuePrefix(WS_PEER);
  await vi.waitFor(() => {
    expect(cachedIssuePrefixFor(WS)).toBe('UI');
    expect(cachedIssuePrefixFor(WS_PEER)).toBe('dotfiles');
  });
}

/**
 * Seed display-only title data so decoration needs no issue lookup.
 *
 * @param {string} bead_id
 */
function seedIssue(bead_id) {
  getWorkerRuntime().titleCache.refreshFromIssue(WS, {
    id: bead_id,
    title: `${bead_id} title`,
    dependencies: [],
    metadata: {}
  });
}

/**
 * @param {Array<{ id: string }>} blockers
 * @returns {Record<string, unknown>}
 */
function waitingQueue(blockers) {
  return {
    revision: 1,
    auto_advance: false,
    auto_merge: false,
    queue: [],
    serial_lanes: [],
    pr_wait: [],
    done: [],
    attempts: {
      'att-waiting': {
        attempt_id: 'att-waiting',
        bead_id: 'UI-20',
        status: 'waiting',
        cause_detail: { blockers }
      }
    },
    admission: {},
    exec_defaults: {}
  };
}

/**
 * @param {Array<Record<string, unknown>>} rows
 */
function mockRunnableRows(rows) {
  vi.spyOn(getWorkerRuntime().runnableCache, 'runnablePeek').mockReturnValue(
    /** @type {any} */ (rows)
  );
}

/**
 * @param {Array<Record<string, unknown>>} rows
 */
function mockSessionRows(rows) {
  vi.spyOn(
    getWorkerRuntime().runnableCache,
    'sessionActivePeek'
  ).mockReturnValue(/** @type {any} */ (rows));
}

describe('historical usage projection', () => {
  test.each([false, true])(
    'fans out only changed historical values (changed=%s)',
    async (changed) => {
      const runtime = getWorkerRuntime();
      const attempt = {
        attempt_id: 'history',
        runner: 'codex',
        status: 'done',
        usage: { input_tokens: 40, output_tokens: 4 },
        usage_segments: [
          { model: 'astra', usage: { input_tokens: 40, output_tokens: 4 } }
        ],
        codex_children: [
          { thread_id: 'child', usage: { input_tokens: 2, output_tokens: 1 } }
        ]
      };
      const queue = { attempts: { history: attempt } };
      const pending = Promise.resolve({
        usage: { output_tokens: changed ? 5 : 4, input_tokens: 40 },
        usage_segments: [
          { usage: { output_tokens: 4, input_tokens: 40 }, model: 'astra' }
        ],
        codex_children: [
          { usage: { output_tokens: 1, input_tokens: 2 }, thread_id: 'child' }
        ]
      });
      vi.spyOn(runtime.workerSessionObservations, 'prepareHistorical')
        .mockReturnValue(null)
        .mockReturnValueOnce(pending);
      vi.spyOn(runtime.queueStore, 'snapshot').mockReturnValue(
        /** @type {any} */ (queue)
      );
      const listener = vi.fn();
      const unsubscribe = onWorkerSnapshotRefresh(listener);

      try {
        attemptsWithUsage(queue, WS);
        await pending;

        expect(listener).toHaveBeenCalledTimes(changed ? 1 : 0);
      } finally {
        unsubscribe();
      }
    }
  );

  test.each([['history'], []])(
    'prunes historical observations using current queue ids (%j)',
    (...ids) => {
      const prune = vi.spyOn(
        getWorkerRuntime().workerSessionObservations,
        'pruneHistorical'
      );
      const attempts = Object.fromEntries(
        ids.map((id) => [id, { attempt_id: id, status: 'done' }])
      );

      attemptsWithUsage({ attempts }, WS);

      expect(prune).toHaveBeenCalledWith(WS, new Set(ids));
    }
  );
});

beforeEach(() => {
  original_home = process.env.HOME;
  original_state_home = process.env.XDG_STATE_HOME;
  // The registry lives under `$HOME/.beads`; an empty one keeps the visible set
  // to exactly the rigs registered below.
  const tmp_home = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-deps-home-'));
  process.env.HOME = tmp_home;
  process.env.XDG_STATE_HOME = tmp_home;
  __resetForeignBlockerCachesForTest();
  vi.mocked(runBdJsonProjected).mockReset();
  vi.mocked(runBdJsonProjected).mockResolvedValue(
    /** @type {any} */ ({ ok: false })
  );
  getWorkerRuntime().titleCache.clear();
  registerWorkspace({ path: WS, database: path.join(WS, '.beads/db') });
  seedSnapshots({});
  __setScopeCacheForTest(
    createScopeCache({
      contextFor: () => ({
        repo: WS,
        resolveBase: async () =>
          /** @type {any} */ ({ ok: false, reason: 'unresolved' }),
        gitRun: async () => ({ code: 128, stdout: '' })
      })
    })
  );
});

afterEach(() => {
  __resetWorkerAttachmentsForTest();
  __resetScopeCacheForTest();
  __resetWorkspaceSnapshotRuntimeForTest();
  __resetForeignBlockerCachesForTest();
  process.env.HOME = original_home;
  process.env.XDG_STATE_HOME = original_state_home;
  vi.restoreAllMocks();
});

describe('queue defaults preset identity', () => {
  test.each([
    ['declared', { orchestration_model: 'opus' }, true],
    ['same', { orchestration_model: 'sonnet' }, false],
    ['undeclared', { orchestration_effort: 'high' }, false],
    ['cleared', { orchestration_model: null }, true],
    ['missing', { orchestration_effort: 'high' }, true],
    ['unreadable', { orchestration_effort: 'high' }, true],
    ['missing-same', { orchestration_model: 'sonnet' }, false],
    ['invalid', { orchestration_model: 'invalid' }, false],
    ['conflict', { orchestration_model: 'opus' }, false]
  ])(
    'changes preset identity only with an owned value: %s',
    (kind, values, clears) => {
      const runtime = getWorkerRuntime();
      const created = runtime.execPresetCoordinator.create({
        expected_revision: runtime.execPresetCoordinator.snapshot().revision,
        name: `Profile ${kind}`,
        settings: { orchestration_model: 'sonnet' }
      });
      const preset = created.presets.find(
        (entry) => entry.name === `Profile ${kind}`
      );
      if (!preset) {
        throw new Error('Missing test preset');
      }
      const applied_exec_preset = {
        id: preset.id,
        name: preset.name,
        revision: created.revision,
        applied_at: 10
      };
      const seeded = runtime.queueStore.setOrchestrationDefaults(WS, {
        expected_revision: runtime.queueStore.snapshot(WS).revision,
        values: { orchestration_model: 'sonnet', orchestration_effort: null },
        applied_exec_preset
      });
      if (kind === 'missing' || kind === 'missing-same') {
        runtime.execPresetCoordinator.delete({
          expected_revision: created.revision,
          id: preset.id
        });
      } else if (kind === 'unreadable') {
        const presetStore = createExecPresetStore();
        vi.spyOn(presetStore, 'snapshot').mockImplementation(() => {
          throw new Error('unreadable');
        });
        const coordinator = createExecPresetCoordinator({
          queueStore: runtime.queueStore,
          presetStore
        });
        vi.spyOn(
          runtime.execPresetCoordinator,
          'changesAppliedExecPreset'
        ).mockImplementation(coordinator.changesAppliedExecPreset);
      }
      const socket = /** @type {any} */ ({ send: vi.fn() });
      setConnWorkspace(socket, /** @type {any} */ ({ root_dir: WS }));

      handleWorkerQueueSetOrchestrationDefaults(socket, {
        id: 'defaults',
        type: 'worker-queue-set-orchestration-defaults',
        payload: {
          expected_revision: kind === 'conflict' ? -1 : seeded.queue.revision,
          values
        }
      });

      expect(runtime.queueStore.snapshot(WS).applied_exec_preset).toEqual(
        clears ? null : applied_exec_preset
      );
    }
  );
});

/**
 * @param {Record<string, any>} [patch]
 * @returns {Record<string, any>}
 */
function heldQueue(patch = {}) {
  return {
    ...laneQueue(),
    completion_intents: {
      'UI-3': {
        target_base: 'main',
        phase: 'holding',
        subject: {
          role: 'root',
          bead_id: 'UI-3',
          head_sha: 'a'.repeat(40),
          base_sha: 'b'.repeat(40),
          merged_sha: null
        },
        hold: {
          cause: 'verify_failure',
          reason: 'script_failed',
          summary: 'build failed',
          operation_id: 'verify-one',
          log_path: '/logs/verify.log',
          head_sha: 'a'.repeat(40),
          at: 100
        },
        ...patch
      }
    }
  };
}

describe('completion hold projection', () => {
  test('projects bounded hold evidence only while holding', () => {
    const queue = heldQueue();
    queue.completion_intents['UI-3'].hold = {
      cause: 'c'.repeat(300),
      reason: 'r'.repeat(600),
      summary: 's'.repeat(5000),
      operation_id: 'o'.repeat(300),
      log_path: 'p'.repeat(1100),
      head_sha: 'a'.repeat(70),
      at: 100
    };

    const out = /** @type {any} */ (decorateQueue(WS, queue));

    expect(out.completion_status['UI-3']).toMatchObject({
      phase: 'holding',
      failure_stage: 'verify',
      failure_reason: 'r'.repeat(500),
      log_path: 'p'.repeat(1000),
      hold: {
        cause: 'c'.repeat(200),
        reason: 'r'.repeat(500),
        summary: 's'.repeat(4000),
        operation_id: 'o'.repeat(200),
        log_path: 'p'.repeat(1000),
        head_sha: 'a'.repeat(64),
        at: 100
      }
    });
  });

  test('projects terminal evidence over a leftover hold', () => {
    const queue = heldQueue({
      phase: 'needs_human',
      terminal_reason: {
        reason: 'receipt_unresolvable:approval_forged',
        stage: 'merge_gate',
        evidence: 'forged approval',
        log_path: '/logs/terminal.log'
      }
    });

    const out = /** @type {any} */ (decorateQueue(WS, queue));

    expect(out.completion_status['UI-3']).toMatchObject({
      phase: 'needs_human',
      hold: null,
      failure_stage: 'merge_gate',
      failure_reason: 'receipt_unresolvable:approval_forged',
      log_path: '/logs/terminal.log'
    });
  });

  test('omits the hold from legacy intent projection', () => {
    const queue = heldQueue({ phase: 'gating', hold: undefined });

    const out = /** @type {any} */ (decorateQueue(WS, queue));

    expect(out.completion_status['UI-3']).toMatchObject({
      phase: 'gating',
      hold: null
    });
  });

  test('launches a resolution session for a holding row', async () => {
    const runtime = getWorkerRuntime();
    const queue = heldQueue();
    vi.spyOn(runtime.queueStore, 'snapshot').mockReturnValue(
      /** @type {any} */ (queue)
    );
    const resolve = vi
      .spyOn(runtime.resolveSession, 'resolve')
      .mockResolvedValue(
        /** @type {any} */ ({
          launched: true,
          session: 'launched',
          mode: 'fork',
          reason: null
        })
      );
    const socket = /** @type {any} */ ({ send: vi.fn() });
    setConnWorkspace(socket, { root_dir: WS, db_path: '/tmp/db' });

    await handleWorkerResolveInSession(socket, {
      id: 'resolve-hold',
      type: 'worker-resolve-in-session',
      payload: { bead_id: 'UI-3', expected_revision: queue.revision }
    });

    expect(resolve).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        bead_id: 'UI-3',
        failure: {
          failure_class: '머지 전 검증 실패',
          reason: 'script_failed',
          stage: 'verify',
          detail: 'build failed · 로그 /logs/verify.log',
          exit: 'fix_commit_push'
        }
      })
    );
    expect(JSON.parse(socket.send.mock.calls[0][0]).payload.launched).toBe(
      true
    );
  });
});

describe('worker attempt route refusal', () => {
  test.each([
    [
      'route_changed',
      { prior_lane: 'quick_fix', current_route: 'spec_backed' }
    ],
    ['worktree_missing', undefined]
  ])(
    'serializes %s without absent route details or fanout',
    async (reason, route_change) => {
      const socket = /** @type {any} */ ({ send: vi.fn() });
      const resume = vi.fn(async () => ({
        ok: false,
        reason,
        route_change
      }));
      setConnWorkspace(socket, { root_dir: WS, db_path: '/tmp/db' });
      __registerWorkerAttachmentForTest(
        WS,
        /** @type {any} */ ({ scheduler: { resume } })
      );
      const store = getWorkerRuntime().queueStore;
      const revision = store.snapshot(WS).revision;
      const snapshot = vi.spyOn(store, 'snapshot');

      await handleWorkerAttemptResume(socket, {
        id: 'resume-route',
        type: 'worker-attempt-resume',
        payload: { attempt_id: 'route-prior', expected_revision: revision }
      });

      const payload = JSON.parse(socket.send.mock.calls[0][0]).payload;
      expect(payload).toMatchObject({
        resumed: false,
        reason
      });
      if (route_change) {
        expect(payload.route_change).toEqual(route_change);
      } else {
        expect(payload).not.toHaveProperty('route_change');
      }
      expect(resume).toHaveBeenCalledOnce();
      expect(socket.send).toHaveBeenCalledOnce();
      expect(snapshot).toHaveBeenCalledOnce();
    }
  );
});

describe('decorateQueue bead_dependents (UI-8x90 §6.2)', () => {
  test('answers for the same beads bead_scope targets', () => {
    seedSnapshots({
      [WS]: snapshotOf([
        { id: 'UI-1' },
        { id: 'UI-2' },
        { id: 'UI-3' },
        { id: 'UI-4' },
        { id: 'UI-8' },
        { id: 'UI-9' },
        { id: 'UI-20', waits_on: ['UI-1', 'UI-9'] }
      ])
    });
    mockRunnableRows([
      { bead_id: 'UI-9', scope_spec_id: '', description_scope: ['app/'] }
    ]);
    mockSessionRows([{ bead_id: 'UI-8', spec_id: '' }]);

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(Object.keys(out.bead_dependents).sort()).toEqual([
      'UI-1',
      'UI-2',
      'UI-3',
      'UI-4',
      'UI-8',
      'UI-9'
    ]);
    expect(
      Object.keys(out.bead_scope).every((id) => id in out.bead_dependents)
    ).toBe(true);
    expect(out.bead_dependents['UI-1']).toEqual({ ids: ['UI-20'] });
    expect(out.bead_dependents['UI-9']).toEqual({ ids: ['UI-20'] });
  });

  test('leaves closed follow-ups out', () => {
    seedSnapshots({
      [WS]: snapshotOf([
        { id: 'UI-1' },
        { id: 'UI-20', status: 'closed', waits_on: ['UI-1'] },
        { id: 'UI-21', status: 'in_progress', waits_on: ['UI-1'] }
      ])
    });

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_dependents['UI-1']).toEqual({ ids: ['UI-21'] });
  });

  test('carries an empty array for a bead nothing visible waits on', () => {
    seedSnapshots({ [WS]: snapshotOf([{ id: 'UI-1' }]) });

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_dependents['UI-1']).toEqual({ ids: [] });
  });

  test('omits the key when this workspace has no snapshot yet', () => {
    seedSnapshots({});

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(Object.hasOwn(out, 'bead_dependents')).toBe(false);
  });

  test('carries the owning workspace of a peer-held follow-up', () => {
    registerWorkspace({
      path: WS_PEER,
      database: path.join(WS_PEER, '.beads/db')
    });
    seedSnapshots({
      [WS]: snapshotOf([{ id: 'UI-1' }, { id: 'UI-20', waits_on: ['UI-1'] }]),
      [WS_PEER]: snapshotOf([{ id: 'dotfiles-5', waits_on: ['UI-1'] }])
    });

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_dependents['UI-1']).toEqual({
      ids: ['UI-20', 'dotfiles-5'],
      root_dirs: { 'dotfiles-5': WS_PEER }
    });
  });

  test('computes from the peers it has when one has no snapshot yet', () => {
    registerWorkspace({
      path: WS_PEER,
      database: path.join(WS_PEER, '.beads/db')
    });
    seedSnapshots({
      [WS]: snapshotOf([{ id: 'UI-1' }, { id: 'UI-20', waits_on: ['UI-1'] }])
    });

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_dependents['UI-1']).toEqual({ ids: ['UI-20'] });
  });

  test('omits the key and logs when the decoration context throws', () => {
    seedSnapshots({
      [WS]: () => {
        throw new Error('coordinator gone');
      }
    });
    createDebug.enable('beads-ui:ws');
    const written = vi
      .spyOn(process.stderr, 'write')
      .mockImplementation(() => true);

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    createDebug.disable();
    expect(Object.hasOwn(out, 'bead_dependents')).toBe(false);
    expect(
      written.mock.calls.some(([line]) =>
        String(line).includes('bead dependents context failed')
      )
    ).toBe(true);
  });
});

describe('decorateQueue persisted blocker owners (UI-yue8 §6.2)', () => {
  test('carries a foreign blocker from a waiting attempt', async () => {
    await warmForeignPrefixes();
    seedIssue('UI-20');

    const out = /** @type {any} */ (
      decorateQueue(WS, waitingQueue([{ id: 'dotfiles-7' }]))
    );

    expect(out.blocker_workspaces).toEqual({ 'dotfiles-7': WS_PEER });
  });

  test('carries a foreign blocker from prerequisite_unmet admission', async () => {
    await warmForeignPrefixes();
    seedIssue('UI-20');
    const queue = {
      ...waitingQueue([]),
      attempts: {},
      queue: [{ bead_id: 'UI-20', added_at: 1 }],
      admission: {
        'UI-20': {
          reason: 'prerequisite_unmet',
          at: 1,
          blockers: [{ id: 'dotfiles-8' }]
        }
      }
    };

    const out = /** @type {any} */ (decorateQueue(WS, queue));

    expect(out.blocker_workspaces).toEqual({ 'dotfiles-8': WS_PEER });
  });

  test('omits same-rig and unowned blocker ids', async () => {
    await warmForeignPrefixes();
    seedIssue('UI-20');

    const out = /** @type {any} */ (
      decorateQueue(WS, waitingQueue([{ id: 'UI-9' }, { id: 'ext-1' }]))
    );

    expect(Object.hasOwn(out, 'blocker_workspaces')).toBe(false);
  });

  test('resolves persisted blocker owners without a bd call', async () => {
    await warmForeignPrefixes();
    seedIssue('UI-20');
    vi.mocked(runBdJsonProjected).mockClear();

    const out = /** @type {any} */ (
      decorateQueue(WS, waitingQueue([{ id: 'dotfiles-9' }]))
    );

    expect(out.blocker_workspaces).toEqual({ 'dotfiles-9': WS_PEER });
    expect(runBdJsonProjected).not.toHaveBeenCalled();
  });
});
