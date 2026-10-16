import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  createJevClient,
  createJevKeySource
} from '../placement/jev-client.js';
import { issueMaterial } from '../placement/material.js';
import { createPairCache } from '../placement/pair-cache.js';
import {
  __setPlacementServiceForTest,
  createPlacementService
} from '../placement/service.js';
import { getWorkerRuntime } from '../worker/runtime.js';
import {
  __resetWorkspaceSnapshotRuntimeForTest,
  __setWorkspaceSnapshotCoordinatorFactoryForTest,
  requestWorkspaceSnapshot
} from '../workspace-snapshot-runtime.js';
import { setConnWorkspace } from './context.js';
import {
  decorateQueue,
  handleWorkerPlacementRejudge
} from './worker-handlers.js';

vi.mock('../bd.js', async (importOriginal) => {
  /** @type {any} */
  const actual = await importOriginal();
  return { ...actual, runBdJsonProjected: vi.fn() };
});

const WS = '/tmp/example-workspace/project-placement';
const SECRET_BODY = '공개하지 않는 본문';

/** @type {string} */
let dir;
/** @type {ReturnType<typeof createPairCache>|null} */
let installed_cache = null;

/**
 * @param {string} id
 */
function issueRow(id) {
  return {
    id,
    title: `${id} 제목`,
    issue_type: 'task',
    status: 'open',
    description: `${SECRET_BODY} ${id}`,
    metadata: { route: 'quick_fix' },
    updated_at: 1,
    closed_at: null
  };
}

/**
 * Seed this workspace's snapshot with `ids` as `id_index` rows.
 *
 * @param {string[]} ids
 */
function seedSnapshot(ids) {
  const all = ids.map(issueRow);
  const snapshot = {
    generation: 1,
    all,
    id_index: new Map(all.map((row) => [row.id, row])),
    ready_explain: { ready: [], blocked: [] },
    command_mode: 'embedded-dependencies',
    command_count: 1,
    dependency_edges: [],
    blocks_out: new Map(),
    blocks_in: new Map(),
    edges_in: new Map()
  };
  __setWorkspaceSnapshotCoordinatorFactoryForTest(
    /** @type {any} */ (
      () => ({
        getSnapshot: () => snapshot,
        request: async () => ({ ok: false }),
        signalMutation: () => {},
        onFilled: () => {}
      })
    )
  );
  requestWorkspaceSnapshot(WS, 'test');
}

/**
 * A placeable quick_fix 후보 row as the runnable projection carries it.
 *
 * @param {string} bead_id
 * @param {Record<string, unknown>} [overrides]
 */
function candidateRow(bead_id, overrides = {}) {
  return {
    bead_id,
    title: `${bead_id} 제목`,
    route: 'quick_fix',
    spec_state: 'n/a',
    has_description: true,
    awaiting_user: false,
    worker_ineligible: false,
    blocked_by: [],
    ...overrides
  };
}

/**
 * @param {Array<Record<string, unknown>>} rows
 */
function mockCandidates(rows) {
  vi.spyOn(getWorkerRuntime().runnableCache, 'runnablePeek').mockReturnValue(
    /** @type {any} */ (rows)
  );
}

/**
 * A queue with `waiting` in the parallel lane.
 *
 * @param {string[]} waiting
 * @returns {Record<string, unknown>}
 */
function queueWith(waiting) {
  return {
    revision: 1,
    auto_advance: false,
    auto_merge: false,
    queue: waiting.map((bead_id) => ({ bead_id, added_at: 1 })),
    serial_lanes: [{ id: 's1', entries: [] }],
    pr_wait: [],
    done: [],
    attempts: {},
    exec_defaults: {}
  };
}

/**
 * Install a placement service whose pair cache already answers `pairs`.
 *
 * @param {Array<[string, string]>} [pairs]
 */
function installService(pairs = []) {
  const pairCache = createPairCache({ file: path.join(dir, 'cache.json') });
  pairCache.load();
  installed_cache = pairCache;
  for (const [a, b] of pairs) {
    pairCache.set(
      a,
      b,
      /** @type {any} */ (issueMaterial(issueRow(a), '', null)).digest,
      /** @type {any} */ (issueMaterial(issueRow(b), '', null)).digest,
      { choice: 'independent', confidence: 0.93, judged_at: 1_234 }
    );
  }
  const fetch = vi.fn();
  const service = createPlacementService({
    client: createJevClient({
      fetch,
      keys: createJevKeySource({
        env: { TYPESAFE_API_KEY: 'fixture-key-not-real' },
        resolveDotfilesRoot: async () => null
      })
    }),
    pairCache,
    specSections: /** @type {any} */ ({
      peek: () => ({ state: 'miss' }),
      fill: async () => {},
      onFilled: () => () => {}
    }),
    callLog: /** @type {any} */ ({ append: async () => {} })
  });
  __setPlacementServiceForTest(service);
  return { service, fetch };
}

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-placement-wire-'));
  getWorkerRuntime().titleCache.clear();
});

afterEach(async () => {
  await installed_cache?.flush();
  installed_cache = null;
  __setPlacementServiceForTest(null);
  __resetWorkspaceSnapshotRuntimeForTest();
  fs.rmSync(dir, { recursive: true, force: true });
  vi.restoreAllMocks();
});

describe('decorateQueue placement fields (UI-izba §4.5)', () => {
  test('omits both fields when no placement service is installed', () => {
    seedSnapshot(['UI-1', 'UI-2']);
    mockCandidates([candidateRow('UI-1')]);

    const out = /** @type {any} */ (decorateQueue(WS, queueWith(['UI-2'])));

    expect(out).not.toHaveProperty('placement_relations');
    expect(out).not.toHaveProperty('placement_status');
  });

  test('ships a cached jev relation and a ready state', () => {
    installService([['UI-1', 'UI-2']]);
    seedSnapshot(['UI-1', 'UI-2']);
    mockCandidates([candidateRow('UI-1')]);

    const out = /** @type {any} */ (decorateQueue(WS, queueWith(['UI-2'])));

    expect(out.placement_relations).toEqual({
      'UI-1|UI-2': {
        a: 'UI-1',
        b: 'UI-2',
        relation: 'independent',
        source: 'jev',
        confidence: 0.93,
        jev_choice: 'independent',
        judged_at: 1_234
      }
    });
    expect(out.placement_status).toEqual({
      'UI-1': { state: 'ready', done: 1, total: 1 }
    });
  });

  test('reads pending for a pair jev has not answered yet', () => {
    installService();
    seedSnapshot(['UI-1', 'UI-2']);
    mockCandidates([candidateRow('UI-1')]);

    const out = /** @type {any} */ (decorateQueue(WS, queueWith(['UI-2'])));

    expect(out.placement_status['UI-1']).toEqual({
      state: 'pending',
      reason: 'judging',
      done: 0,
      total: 1
    });
  });

  test('reads fixed_only for a candidate blocked by the waiting bead', () => {
    installService();
    seedSnapshot(['UI-1', 'UI-2']);
    mockCandidates([candidateRow('UI-1', { blocked_by: ['UI-2'] })]);

    const out = /** @type {any} */ (decorateQueue(WS, queueWith(['UI-2'])));

    expect(out.placement_relations['UI-1|UI-2']).toMatchObject({
      relation: 'b_first',
      source: 'fixed',
      basis: 'blocks'
    });
    expect(out.placement_status['UI-1']).toEqual({ state: 'fixed_only' });
  });

  test('reads no_counterpart for a lone candidate on an empty queue', () => {
    installService();
    seedSnapshot(['UI-1']);
    mockCandidates([candidateRow('UI-1')]);

    const out = /** @type {any} */ (decorateQueue(WS, queueWith([])));

    expect(out.placement_status).toEqual({
      'UI-1': { state: 'no_counterpart' }
    });
  });

  test('reads pending with material_missing when the snapshot lacks the row', () => {
    installService();
    seedSnapshot(['UI-1']);
    mockCandidates([candidateRow('UI-1')]);

    const out = /** @type {any} */ (decorateQueue(WS, queueWith(['UI-9'])));

    expect(out.placement_status['UI-1']).toMatchObject({
      state: 'pending',
      reason: 'material_missing'
    });
  });

  test('gives no state to a candidate that cannot be placed', () => {
    installService();
    seedSnapshot(['UI-1', 'UI-2']);
    mockCandidates([candidateRow('UI-1', { awaiting_user: true })]);

    const out = /** @type {any} */ (decorateQueue(WS, queueWith(['UI-2'])));

    expect(out.placement_status).toEqual({});
  });

  test('compares a candidate with an unshelved PR 대기 entry', () => {
    installService();
    seedSnapshot(['UI-1', 'UI-2']);
    mockCandidates([candidateRow('UI-1')]);
    const queue = { ...queueWith([]), pr_wait: [{ bead_id: 'UI-2' }] };

    const out = /** @type {any} */ (decorateQueue(WS, queue));

    expect(out.placement_status['UI-1']).toMatchObject({
      state: 'pending',
      total: 1
    });
  });

  test('leaves a shelved PR 대기 entry out of the comparison', () => {
    installService();
    seedSnapshot(['UI-1', 'UI-2']);
    mockCandidates([candidateRow('UI-1')]);
    const queue = {
      ...queueWith([]),
      pr_wait: [{ bead_id: 'UI-2' }],
      merge_shelved: { 'UI-2': { at: 1 } }
    };

    const out = /** @type {any} */ (decorateQueue(WS, queue));

    expect(out.placement_relations).toEqual({});
    expect(out.placement_status).toEqual({
      'UI-1': { state: 'no_counterpart' }
    });
  });

  test('judges a worker-ineligible candidate like any other', () => {
    installService();
    seedSnapshot(['UI-1', 'UI-2']);
    mockCandidates([candidateRow('UI-1', { worker_ineligible: true })]);

    const out = /** @type {any} */ (decorateQueue(WS, queueWith(['UI-2'])));

    expect(out.placement_status['UI-1']).toMatchObject({ state: 'pending' });
  });

  test('counts each pair once in the workspace progress', () => {
    installService([['UI-1', 'UI-2']]);
    seedSnapshot(['UI-1', 'UI-2', 'UI-3']);
    mockCandidates([candidateRow('UI-1'), candidateRow('UI-2')]);

    const out = /** @type {any} */ (decorateQueue(WS, queueWith(['UI-3'])));

    expect(out.placement_progress).toEqual({ done: 1, total: 3 });
  });

  test('carries no issue text on the wire', () => {
    installService([['UI-1', 'UI-2']]);
    seedSnapshot(['UI-1', 'UI-2']);
    mockCandidates([candidateRow('UI-1')]);

    const out = /** @type {any} */ (decorateQueue(WS, queueWith(['UI-2'])));

    const wire = JSON.stringify([
      out.placement_relations,
      out.placement_status
    ]);
    expect(wire).not.toContain(SECRET_BODY);
    expect(wire).not.toContain('fixture-key-not-real');
  });
});

describe('worker-placement-rejudge', () => {
  test('replies placement_unavailable without an installed service', async () => {
    const socket = /** @type {any} */ ({ send: vi.fn() });
    setConnWorkspace(socket, { root_dir: WS, db_path: '/tmp/db' });

    await handleWorkerPlacementRejudge(socket, {
      id: 'rejudge-1',
      type: 'worker-placement-rejudge',
      payload: {}
    });

    const reply = JSON.parse(socket.send.mock.calls[0][0]);
    expect(reply.ok).toBe(false);
    expect(reply.error.code).toBe('placement_unavailable');
  });

  test('replies how many cached answers it dropped', async () => {
    const { service } = installService();
    vi.spyOn(service, 'rejudge').mockResolvedValue({ cleared: 3 });
    const socket = /** @type {any} */ ({ send: vi.fn() });
    setConnWorkspace(socket, { root_dir: WS, db_path: '/tmp/db' });

    await handleWorkerPlacementRejudge(socket, {
      id: 'rejudge-2',
      type: 'worker-placement-rejudge',
      payload: {}
    });

    const reply = JSON.parse(socket.send.mock.calls[0][0]);
    expect(reply.ok).toBe(true);
    expect(reply.payload).toEqual({ cleared: 3 });
    expect(service.rejudge).toHaveBeenCalledWith(WS);
  });
});
