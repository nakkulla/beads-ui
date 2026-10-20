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
import * as registry from '../registry-watcher.js';
import { sharedVisibleWorkspacesStore } from '../visible-workspaces-store.js';
import { getWorkerRuntime } from '../worker/runtime.js';
import {
  __resetWorkspaceSnapshotRuntimeForTest,
  __setWorkspaceSnapshotCoordinatorFactoryForTest,
  requestWorkspaceSnapshot
} from '../workspace-snapshot-runtime.js';
import { setConnWorkspace } from './context.js';
import {
  __resetMonitorPipelineForTest,
  handleSubscribeMonitorPipeline
} from './monitor-handlers.js';
import {
  decorateQueue,
  handleWorkerPlacementRejudge
} from './worker-handlers.js';

vi.mock('../bd.js', async (importOriginal) => {
  /** @type {any} */
  const actual = await importOriginal();
  return {
    ...actual,
    runBdJsonProjected: vi.fn(async () => ({ ok: false }))
  };
});

/** @type {string} */
let dir;
/** @type {string} */
let WS_SHOWN;
/** @type {string} */
let WS_HIDDEN;
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
    description: `${id} 본문`,
    metadata: { route: 'quick_fix' },
    updated_at: 1,
    closed_at: null
  };
}

/**
 * Seed every workspace's snapshot with `ids` as `id_index` rows.
 *
 * @param {string[]} ids
 */
function seedSnapshots(ids) {
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
  requestWorkspaceSnapshot(WS_SHOWN, 'test');
  requestWorkspaceSnapshot(WS_HIDDEN, 'test');
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
  const service = createPlacementService({
    client: createJevClient({
      fetch: vi.fn(async () => {
        throw new Error('offline');
      }),
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
  return service;
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

function subscribeMonitor() {
  handleSubscribeMonitorPipeline(
    /** @type {any} */ ({ send: vi.fn(), readyState: 1, OPEN: 1 }),
    /** @type {any} */ ({
      id: 'mon-sub',
      type: 'subscribe-monitor-pipeline',
      payload: {}
    })
  );
}

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-placement-observe-'));
  WS_SHOWN = path.join(dir, 'shown');
  WS_HIDDEN = path.join(dir, 'hidden');
  getWorkerRuntime().titleCache.clear();
  vi.spyOn(registry, 'getAvailableWorkspaces').mockReturnValue(
    [WS_SHOWN, WS_HIDDEN].map((root) => ({
      path: root,
      database: path.join(root, '.beads'),
      pid: process.pid,
      version: 'test'
    }))
  );
  vi.spyOn(sharedVisibleWorkspacesStore(), 'listHidden').mockReturnValue([
    WS_HIDDEN
  ]);
  vi.spyOn(getWorkerRuntime().runnableCache, 'refresh').mockImplementation(
    () => {}
  );
  vi.spyOn(getWorkerRuntime().runnableCache, 'runnablePeek').mockReturnValue(
    /** @type {any} */ ([
      {
        bead_id: 'UI-1',
        title: 'UI-1 제목',
        route: 'quick_fix',
        spec_state: 'n/a',
        has_description: true,
        awaiting_user: false,
        worker_ineligible: false,
        blocked_by: []
      }
    ])
  );
  seedSnapshots(['UI-1', 'UI-2']);
});

afterEach(async () => {
  __resetMonitorPipelineForTest();
  await installed_cache?.flush();
  installed_cache = null;
  __setPlacementServiceForTest(null);
  __resetWorkspaceSnapshotRuntimeForTest();
  vi.restoreAllMocks();
  fs.rmSync(dir, { recursive: true, force: true });
});

describe('placement observe on monitor demand (UI-hf8v §3.1)', () => {
  test('observes a visible repo when only the monitor is subscribed', () => {
    subscribeMonitor();
    const project = vi.spyOn(installService(), 'project');

    decorateQueue(WS_SHOWN, queueWith(['UI-2']));

    expect(project).toHaveBeenLastCalledWith(WS_SHOWN, expect.anything(), {
      observe: true
    });
  });

  test('leaves a hidden repo unobserved while the monitor is subscribed', () => {
    subscribeMonitor();
    const project = vi.spyOn(installService(), 'project');

    decorateQueue(WS_HIDDEN, queueWith(['UI-2']));

    expect(project).toHaveBeenLastCalledWith(WS_HIDDEN, expect.anything(), {
      observe: false
    });
  });

  test('leaves a visible repo unobserved without any subscriber', () => {
    const project = vi.spyOn(installService(), 'project');

    decorateQueue(WS_SHOWN, queueWith(['UI-2']));

    expect(project).toHaveBeenLastCalledWith(WS_SHOWN, expect.anything(), {
      observe: false
    });
  });

  test('clears cached answers on rejudge of a repo the monitor alone observed', async () => {
    subscribeMonitor();
    installService([['UI-1', 'UI-2']]);
    decorateQueue(WS_SHOWN, queueWith(['UI-2']));
    const socket = /** @type {any} */ ({ send: vi.fn() });
    setConnWorkspace(socket, {
      root_dir: WS_SHOWN,
      db_path: path.join(WS_SHOWN, '.beads')
    });

    await handleWorkerPlacementRejudge(socket, {
      id: 'rejudge-monitor',
      type: 'worker-placement-rejudge',
      payload: {}
    });

    const reply = JSON.parse(socket.send.mock.calls[0][0]);
    expect(reply.ok).toBe(true);
    expect(reply.payload.cleared).toBeGreaterThan(0);
  });
});
