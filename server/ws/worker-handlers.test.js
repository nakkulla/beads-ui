import createDebug from 'debug';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { runBdJsonProjected } from '../bd.js';
import { registerWorkspace } from '../registry-watcher.js';
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
import { decorateQueue } from './worker-handlers.js';

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
  __resetScopeCacheForTest();
  __resetWorkspaceSnapshotRuntimeForTest();
  __resetForeignBlockerCachesForTest();
  process.env.HOME = original_home;
  process.env.XDG_STATE_HOME = original_state_home;
  vi.restoreAllMocks();
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
