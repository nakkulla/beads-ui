import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const WS_A = path.resolve('/tmp/example/repo-a');
const WS_B = path.resolve('/tmp/example/repo-b');
const WS_HIDDEN = path.resolve('/tmp/example/repo-hidden');

/** @type {string[]} */
let workspaces = [];
/** @type {string[]} */
let hidden = [];

// 이 파일이 검증하는 것은 레인 op와 스냅샷 투영이므로, 워커 런타임·집계
// 파이프라인은 채널 테스트와 같은 방식으로 무력화한다.
vi.mock('./worker-handlers.js', () => ({
  /**
   * @param {string} key
   * @param {Record<string, unknown>} queue
   */
  decorateQueue: (key, queue) => ({ ...queue }),
  onWorkerSnapshotRefresh: () => () => {},
  workerQueueSubscriberCount: () => 0,
  workerQueueSubscriberTotal: () => 0,
  workerQueueSubscribedWorkspaces: () => [],
  fanout: () => {}
}));

vi.mock('../registry-watcher.js', () => ({
  getAvailableWorkspaces: () => workspaces.map((p) => ({ path: p }))
}));

vi.mock('./context.js', async (importOriginal) => {
  const actual = /** @type {any} */ (await importOriginal());
  return {
    ...actual,
    kvGetJsonAtRoot: async () => ({ ok: true, value: {} })
  };
});

vi.mock('../visible-workspaces-store.js', () => ({
  sharedVisibleWorkspacesStore: () => ({ listHidden: () => hidden })
}));

vi.mock('../worker/attach.js', () => ({
  refreshWorkerExternalPrs: async () => false
}));

vi.mock('../worker/runtime.js', () => ({
  getWorkerRuntime: () => ({
    queueStore: {
      snapshot: () => ({ queue: [], pr_wait: [], done: [] })
    },
    runnableCache: {
      runnableFor: () => [],
      refresh: () => {},
      invalidate: () => {},
      setOnFilled: () => {},
      setSubscriberCount: () => {}
    }
  })
}));

const {
  __resetMonitorPipelineForTest,
  handleMonitorLaneConfirm,
  handleMonitorLaneCreate,
  handleMonitorLaneProvenance,
  handleMonitorLaneRemove,
  handleMonitorLaneUpdate,
  handleSubscribeMonitorPipeline
} = await import('./monitor-handlers.js');
const { emitMonitorPipelineSnapshot } = await import('./context.js');
const {
  __resetCrossLanesStoreForTest,
  __setCrossLanesStoreForTest,
  createCrossLanesStore
} = await import('../worker/cross-lanes-store.js');

/** @type {string} */
let tmp_dir;
/** @type {string} */
let file_path;
/** @type {ReturnType<typeof createCrossLanesStore>} */
let store;
/** @type {number} */
let pushes;

/**
 * A fake socket recording every frame it was sent.
 */
function fakeWs() {
  /** @type {any[]} */
  const frames = [];
  return {
    /** @param {string} raw */
    send(raw) {
      frames.push(JSON.parse(raw));
    },
    frames,
    reply() {
      return frames[frames.length - 1];
    },
    snapshots() {
      return frames.filter(
        (/** @type {any} */ f) => f.type === 'monitor-pipeline-snapshot'
      );
    }
  };
}

/**
 * @param {string} type
 * @param {Record<string, unknown>} payload
 * @returns {any}
 */
function request(type, payload) {
  return { id: 'req-1', type, payload };
}

/**
 * The seams every lane op takes: the tmp-file store, the registered workspace
 * list, and the push the handler schedules on success.
 */
function seams() {
  return {
    crossLanesStore: () => store,
    listWorkspaces: () => workspaces.map((p) => ({ path: p })),
    onApplied: () => {
      pushes += 1;
    }
  };
}

/**
 * Seed the file with lanes at a known revision and drop the in-memory cache.
 *
 * @param {number} revision
 * @param {Array<Record<string, unknown>>} lanes
 */
function seed(revision, lanes) {
  fs.writeFileSync(file_path, JSON.stringify({ revision, lanes }, null, 2));
  store.__clearCacheForTest();
}

/**
 * @param {Partial<Record<string, any>>} [patch]
 * @returns {Record<string, any>}
 */
function lane(patch = {}) {
  return {
    id: 'cl_A',
    status: 'draft',
    created_at: '2026-08-25T00:00:00.000Z',
    entries: [],
    ...patch
  };
}

/**
 * @param {string} bead_id
 * @param {string} [root_dir]
 */
function entry(bead_id, root_dir = WS_A) {
  return { bead_id, root_dir };
}

beforeEach(() => {
  tmp_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-lane-ops-'));
  file_path = path.join(tmp_dir, 'cross-lanes.json');
  store = createCrossLanesStore({ filePath: file_path });
  __setCrossLanesStoreForTest(store);
  workspaces = [WS_A, WS_B, WS_HIDDEN];
  hidden = [WS_HIDDEN];
  pushes = 0;
  __resetMonitorPipelineForTest();
});

afterEach(() => {
  __resetMonitorPipelineForTest();
  __resetCrossLanesStoreForTest();
  fs.rmSync(tmp_dir, { recursive: true, force: true });
});

describe('monitor-lane-create (UI-j92s §4.3)', () => {
  test('answers with the issued lane id and the new revision', () => {
    const ws = fakeWs();

    handleMonitorLaneCreate(
      /** @type {any} */ (ws),
      request('monitor-lane-create', { expected_revision: 0 }),
      seams()
    );

    expect(ws.reply()).toMatchObject({
      ok: true,
      payload: {
        lane_id: expect.stringMatching(/^cl_/),
        revision: 1
      }
    });
  });

  test('schedules a push after a successful create', () => {
    const ws = fakeWs();

    handleMonitorLaneCreate(
      /** @type {any} */ (ws),
      request('monitor-lane-create', { expected_revision: 0 }),
      seams()
    );

    expect(pushes).toBe(1);
  });

  test('stores a seeded draft lane with its entries', () => {
    const ws = fakeWs();

    handleMonitorLaneCreate(
      /** @type {any} */ (ws),
      request('monitor-lane-create', {
        entries: [entry('UI-1'), entry('UI-2', WS_B)],
        expected_revision: 0
      }),
      seams()
    );

    expect(store.read()?.lanes).toEqual([
      {
        id: ws.reply().payload.lane_id,
        status: 'draft',
        created_at: expect.any(String),
        // 새로 생긴 인접 자리는 `false`로 저장된다 (UI-jaua §7.1 1단계) —
        // 이 시점에는 그 쌍의 `dep-add`가 성공할지 아무도 모른다.
        entries: [
          entry('UI-1'),
          { ...entry('UI-2', WS_B), dep_created_by_lane: false }
        ]
      }
    ]);
  });

  test('rejects a second empty draft with conflict_empty_lane', () => {
    seed(3, [lane({ status: 'draft', entries: [] })]);
    const ws = fakeWs();

    handleMonitorLaneCreate(
      /** @type {any} */ (ws),
      request('monitor-lane-create', { expected_revision: 3 }),
      seams()
    );

    expect(ws.reply().error).toMatchObject({
      code: 'conflict_empty_lane',
      message: '빈 연결 레인이 이미 있습니다'
    });
  });

  test('allows a seeded draft while an empty draft exists', () => {
    seed(3, [lane({ status: 'draft', entries: [] })]);
    const ws = fakeWs();

    handleMonitorLaneCreate(
      /** @type {any} */ (ws),
      request('monitor-lane-create', {
        entries: [entry('UI-1')],
        expected_revision: 3
      }),
      seams()
    );

    expect(ws.reply().ok).toBe(true);
  });

  test('accepts a member in a hidden but registered workspace', () => {
    const ws = fakeWs();

    handleMonitorLaneCreate(
      /** @type {any} */ (ws),
      request('monitor-lane-create', {
        entries: [entry('UI-1', WS_HIDDEN)],
        expected_revision: 0
      }),
      seams()
    );

    expect(ws.reply().ok).toBe(true);
  });

  test('rejects a member whose root_dir is not a registered workspace', () => {
    const ws = fakeWs();

    handleMonitorLaneCreate(
      /** @type {any} */ (ws),
      request('monitor-lane-create', {
        entries: [entry('UI-1', '/tmp/example/not-registered')],
        expected_revision: 0
      }),
      seams()
    );

    expect(ws.reply().error.code).toEqual('bad_request');
  });

  test('rejects a payload without an integer expected_revision', () => {
    const ws = fakeWs();

    handleMonitorLaneCreate(
      /** @type {any} */ (ws),
      request('monitor-lane-create', { expected_revision: '0' }),
      seams()
    );

    expect(ws.reply().error.code).toEqual('bad_request');
  });

  test('rejects an entry that names no bead', () => {
    const ws = fakeWs();

    handleMonitorLaneCreate(
      /** @type {any} */ (ws),
      request('monitor-lane-create', {
        entries: [{ root_dir: WS_A }],
        expected_revision: 0
      }),
      seams()
    );

    expect(ws.reply().error.code).toEqual('bad_request');
  });
});

describe('monitor-lane-update (UI-j92s §4.3)', () => {
  test('replaces membership and order in one write', () => {
    seed(1, [lane({ entries: [entry('UI-1'), entry('UI-2')] })]);
    const ws = fakeWs();

    handleMonitorLaneUpdate(
      /** @type {any} */ (ws),
      request('monitor-lane-update', {
        lane_id: 'cl_A',
        entries: [entry('UI-2'), entry('UI-3', WS_B)],
        expected_revision: 1
      }),
      seams()
    );

    expect(store.read()?.lanes[0].entries).toEqual([
      entry('UI-2'),
      { ...entry('UI-3', WS_B), dep_created_by_lane: false }
    ]);
  });

  test('answers with the lane id and the new revision', () => {
    seed(1, [lane({ entries: [entry('UI-1')] })]);
    const ws = fakeWs();

    handleMonitorLaneUpdate(
      /** @type {any} */ (ws),
      request('monitor-lane-update', {
        lane_id: 'cl_A',
        entries: [],
        expected_revision: 1
      }),
      seams()
    );

    expect(ws.reply()).toMatchObject({
      ok: true,
      payload: { lane_id: 'cl_A', revision: 2 }
    });
  });

  test('schedules a push after a successful update', () => {
    seed(1, [lane({ entries: [] })]);
    const ws = fakeWs();

    handleMonitorLaneUpdate(
      /** @type {any} */ (ws),
      request('monitor-lane-update', {
        lane_id: 'cl_A',
        entries: [entry('UI-1')],
        expected_revision: 1
      }),
      seams()
    );

    expect(pushes).toBe(1);
  });

  test('rejects an unknown lane with not_found', () => {
    seed(1, [lane()]);
    const ws = fakeWs();

    handleMonitorLaneUpdate(
      /** @type {any} */ (ws),
      request('monitor-lane-update', {
        lane_id: 'cl_MISSING',
        entries: [],
        expected_revision: 1
      }),
      seams()
    );

    expect(ws.reply().error.code).toEqual('not_found');
  });

  test('rejects a bead another lane already owns', () => {
    seed(1, [
      lane({ id: 'cl_A', entries: [entry('UI-1')] }),
      lane({ id: 'cl_B', entries: [] })
    ]);
    const ws = fakeWs();

    handleMonitorLaneUpdate(
      /** @type {any} */ (ws),
      request('monitor-lane-update', {
        lane_id: 'cl_B',
        entries: [entry('UI-1')],
        expected_revision: 1
      }),
      seams()
    );

    expect(ws.reply().error).toMatchObject({
      code: 'conflict_membership',
      message: '이미 연결 1에 있습니다'
    });
  });

  test('does not schedule a push for a rejected update', () => {
    seed(1, [lane()]);
    const ws = fakeWs();

    handleMonitorLaneUpdate(
      /** @type {any} */ (ws),
      request('monitor-lane-update', {
        lane_id: 'cl_MISSING',
        entries: [],
        expected_revision: 1
      }),
      seams()
    );

    expect(pushes).toBe(0);
  });

  test('rejects entries that repeat one bead inside the same lane', () => {
    seed(1, [lane()]);
    const ws = fakeWs();

    handleMonitorLaneUpdate(
      /** @type {any} */ (ws),
      request('monitor-lane-update', {
        lane_id: 'cl_A',
        entries: [entry('UI-1'), entry('UI-1')],
        expected_revision: 1
      }),
      seams()
    );

    expect(ws.reply().error.code).toEqual('bad_request');
  });
});

describe('monitor-lane-confirm (UI-j92s §4.3)', () => {
  test('flips the lane status to confirmed', () => {
    seed(1, [lane({ entries: [entry('UI-1'), entry('UI-2', WS_B)] })]);
    const ws = fakeWs();

    handleMonitorLaneConfirm(
      /** @type {any} */ (ws),
      request('monitor-lane-confirm', {
        lane_id: 'cl_A',
        expected_revision: 1
      }),
      seams()
    );

    expect(store.read()?.lanes[0].status).toEqual('confirmed');
  });

  test('answers with the new revision and schedules a push', () => {
    seed(1, [lane({ entries: [entry('UI-1'), entry('UI-2', WS_B)] })]);
    const ws = fakeWs();

    handleMonitorLaneConfirm(
      /** @type {any} */ (ws),
      request('monitor-lane-confirm', {
        lane_id: 'cl_A',
        expected_revision: 1
      }),
      seams()
    );

    expect([ws.reply().payload.revision, pushes]).toEqual([2, 1]);
  });

  test('leaves the entries untouched', () => {
    seed(1, [lane({ entries: [entry('UI-1'), entry('UI-2', WS_B)] })]);
    const ws = fakeWs();

    handleMonitorLaneConfirm(
      /** @type {any} */ (ws),
      request('monitor-lane-confirm', {
        lane_id: 'cl_A',
        expected_revision: 1
      }),
      seams()
    );

    expect(store.read()?.lanes[0].entries).toEqual([
      entry('UI-1'),
      entry('UI-2', WS_B)
    ]);
  });

  test('rejects a lane with fewer than two members', () => {
    seed(1, [lane({ entries: [entry('UI-1')] })]);
    const ws = fakeWs();

    handleMonitorLaneConfirm(
      /** @type {any} */ (ws),
      request('monitor-lane-confirm', {
        lane_id: 'cl_A',
        expected_revision: 1
      }),
      seams()
    );

    expect(ws.reply().error).toMatchObject({
      code: 'bad_request',
      message: '확정하려면 멤버가 2개 이상이어야 합니다'
    });
  });

  test('rejects an unknown lane with not_found', () => {
    seed(1, [lane()]);
    const ws = fakeWs();

    handleMonitorLaneConfirm(
      /** @type {any} */ (ws),
      request('monitor-lane-confirm', {
        lane_id: 'cl_MISSING',
        expected_revision: 1
      }),
      seams()
    );

    expect(ws.reply().error.code).toEqual('not_found');
  });
});

describe('monitor-lane-remove (UI-j92s §4.3)', () => {
  test('drops the lane and keeps the others in order', () => {
    seed(1, [lane({ id: 'cl_A' }), lane({ id: 'cl_B' }), lane({ id: 'cl_C' })]);
    const ws = fakeWs();

    handleMonitorLaneRemove(
      /** @type {any} */ (ws),
      request('monitor-lane-remove', {
        lane_id: 'cl_B',
        expected_revision: 1
      }),
      seams()
    );

    expect(store.read()?.lanes.map((l) => l.id)).toEqual(['cl_A', 'cl_C']);
  });

  test('answers with the new revision and schedules a push', () => {
    seed(1, [lane()]);
    const ws = fakeWs();

    handleMonitorLaneRemove(
      /** @type {any} */ (ws),
      request('monitor-lane-remove', {
        lane_id: 'cl_A',
        expected_revision: 1
      }),
      seams()
    );

    expect([ws.reply().payload.revision, pushes]).toEqual([2, 1]);
  });

  test('rejects an unknown lane with not_found', () => {
    seed(1, [lane()]);
    const ws = fakeWs();

    handleMonitorLaneRemove(
      /** @type {any} */ (ws),
      request('monitor-lane-remove', {
        lane_id: 'cl_MISSING',
        expected_revision: 1
      }),
      seams()
    );

    expect(ws.reply().error.code).toEqual('not_found');
  });

  test('frees the removed lane members for another lane', () => {
    seed(1, [
      lane({ id: 'cl_A', entries: [entry('UI-1')] }),
      lane({ id: 'cl_B', entries: [] })
    ]);
    const ws = fakeWs();
    handleMonitorLaneRemove(
      /** @type {any} */ (ws),
      request('monitor-lane-remove', {
        lane_id: 'cl_A',
        expected_revision: 1
      }),
      seams()
    );

    handleMonitorLaneUpdate(
      /** @type {any} */ (ws),
      request('monitor-lane-update', {
        lane_id: 'cl_B',
        entries: [entry('UI-1')],
        expected_revision: 2
      }),
      seams()
    );

    expect(ws.reply().ok).toBe(true);
  });
});

describe('lane op CAS conflicts (UI-j92s §4.3/§5.5)', () => {
  test('answers a stale revision with the latest cross_lanes', () => {
    seed(1, [lane({ id: 'cl_A', entries: [entry('UI-1')] })]);
    const ws = fakeWs();

    handleMonitorLaneUpdate(
      /** @type {any} */ (ws),
      request('monitor-lane-update', {
        lane_id: 'cl_A',
        entries: [],
        expected_revision: 0
      }),
      seams()
    );

    expect(ws.reply().error).toMatchObject({
      code: 'conflict',
      details: {
        cross_lanes: {
          revision: 1,
          lanes: [
            {
              id: 'cl_A',
              status: 'draft',
              created_at: '2026-08-25T00:00:00.000Z',
              entries: [entry('UI-1')]
            }
          ]
        }
      }
    });
  });

  test('does not schedule a push for a conflicted op', () => {
    seed(1, [lane()]);
    const ws = fakeWs();

    handleMonitorLaneRemove(
      /** @type {any} */ (ws),
      request('monitor-lane-remove', {
        lane_id: 'cl_A',
        expected_revision: 0
      }),
      seams()
    );

    expect(pushes).toBe(0);
  });

  test('applies the first of two concurrent updates and conflicts the second', () => {
    seed(1, [lane({ entries: [] })]);
    const first = fakeWs();
    const second = fakeWs();

    handleMonitorLaneUpdate(
      /** @type {any} */ (first),
      request('monitor-lane-update', {
        lane_id: 'cl_A',
        entries: [entry('UI-1')],
        expected_revision: 1
      }),
      seams()
    );
    handleMonitorLaneUpdate(
      /** @type {any} */ (second),
      request('monitor-lane-update', {
        lane_id: 'cl_A',
        entries: [entry('UI-2')],
        expected_revision: 1
      }),
      seams()
    );

    expect([first.reply().ok, second.reply().error.code]).toEqual([
      true,
      'conflict'
    ]);
  });

  test('conflicts a confirm racing an update on the same lane', () => {
    seed(1, [lane({ entries: [entry('UI-1'), entry('UI-2', WS_B)] })]);
    const ws = fakeWs();

    handleMonitorLaneUpdate(
      /** @type {any} */ (ws),
      request('monitor-lane-update', {
        lane_id: 'cl_A',
        entries: [entry('UI-2', WS_B), entry('UI-1')],
        expected_revision: 1
      }),
      seams()
    );
    handleMonitorLaneConfirm(
      /** @type {any} */ (ws),
      request('monitor-lane-confirm', {
        lane_id: 'cl_A',
        expected_revision: 1
      }),
      seams()
    );

    expect(ws.reply().error.code).toEqual('conflict');
  });

  test('conflicts a remove racing a confirm on the same lane', () => {
    seed(1, [lane({ entries: [entry('UI-1'), entry('UI-2', WS_B)] })]);
    const ws = fakeWs();

    handleMonitorLaneConfirm(
      /** @type {any} */ (ws),
      request('monitor-lane-confirm', {
        lane_id: 'cl_A',
        expected_revision: 1
      }),
      seams()
    );
    handleMonitorLaneRemove(
      /** @type {any} */ (ws),
      request('monitor-lane-remove', {
        lane_id: 'cl_A',
        expected_revision: 1
      }),
      seams()
    );

    expect([ws.reply().error.code, store.read()?.lanes]).toEqual([
      'conflict',
      [
        {
          id: 'cl_A',
          status: 'confirmed',
          created_at: '2026-08-25T00:00:00.000Z',
          entries: [entry('UI-1'), entry('UI-2', WS_B)]
        }
      ]
    ]);
  });
});

describe('lane ops on an unreadable store (UI-j92s §7)', () => {
  beforeEach(() => {
    fs.writeFileSync(file_path, '{ not json');
    store.__clearCacheForTest();
  });

  test('rejects a create with state_unreadable', () => {
    const ws = fakeWs();

    handleMonitorLaneCreate(
      /** @type {any} */ (ws),
      request('monitor-lane-create', { expected_revision: 0 }),
      seams()
    );

    expect(ws.reply().error.code).toEqual('state_unreadable');
  });

  test('rejects a confirm with state_unreadable', () => {
    const ws = fakeWs();

    handleMonitorLaneConfirm(
      /** @type {any} */ (ws),
      request('monitor-lane-confirm', {
        lane_id: 'cl_A',
        expected_revision: 0
      }),
      seams()
    );

    expect(ws.reply().error.code).toEqual('state_unreadable');
  });

  test('leaves the unreadable file untouched', () => {
    const ws = fakeWs();

    handleMonitorLaneRemove(
      /** @type {any} */ (ws),
      request('monitor-lane-remove', {
        lane_id: 'cl_A',
        expected_revision: 0
      }),
      seams()
    );

    expect(fs.readFileSync(file_path, 'utf8')).toEqual('{ not json');
  });
});

describe('cross_lanes snapshot projection (UI-j92s §4.4)', () => {
  test('carries the stored lanes on the pipeline snapshot', () => {
    seed(4, [lane({ id: 'cl_A', entries: [entry('UI-1')] })]);
    const ws = fakeWs();

    handleSubscribeMonitorPipeline(
      /** @type {any} */ (ws),
      request('subscribe-monitor-pipeline', { id: 'm1' })
    );

    expect(ws.snapshots()[0].payload.cross_lanes).toEqual({
      revision: 4,
      lanes: [
        {
          id: 'cl_A',
          status: 'draft',
          created_at: '2026-08-25T00:00:00.000Z',
          entries: [entry('UI-1')]
        }
      ]
    });
  });

  test('carries null when the lane store cannot be read', () => {
    fs.writeFileSync(file_path, 'not json');
    store.__clearCacheForTest();
    const ws = fakeWs();

    handleSubscribeMonitorPipeline(
      /** @type {any} */ (ws),
      request('subscribe-monitor-pipeline', { id: 'm1' })
    );

    expect(ws.snapshots()[0].payload.cross_lanes).toBeNull();
  });

  test('carries an empty lane list when nothing is stored', () => {
    const ws = fakeWs();

    handleSubscribeMonitorPipeline(
      /** @type {any} */ (ws),
      request('subscribe-monitor-pipeline', { id: 'm1' })
    );

    expect(ws.snapshots()[0].payload.cross_lanes).toEqual({
      revision: 0,
      lanes: []
    });
  });

  test('defaults to null when the emitter is given no cross_lanes', () => {
    const ws = fakeWs();

    emitMonitorPipelineSnapshot(/** @type {any} */ (ws), 'm1', []);

    expect(ws.frames[0].payload.cross_lanes).toBeNull();
  });
});

describe('monitor-lane-provenance (UI-jaua §7.1)', () => {
  test('raises only the named pairs to true', () => {
    seed(1, [
      lane({
        entries: [
          entry('UI-1'),
          { ...entry('UI-2'), dep_created_by_lane: false },
          { ...entry('UI-3'), dep_created_by_lane: false }
        ]
      })
    ]);
    const ws = fakeWs();

    handleMonitorLaneProvenance(
      /** @type {any} */ (ws),
      request('monitor-lane-provenance', {
        lane_id: 'cl_A',
        pairs: [{ bead_id: 'UI-2', after: 'UI-1', value: true }],
        expected_revision: 1
      }),
      seams()
    );

    expect(
      store.read()?.lanes[0].entries.map((e) => e.dep_created_by_lane)
    ).toEqual([undefined, true, false]);
  });

  test('ignores a pair whose after is no longer the entry before it', () => {
    seed(1, [
      lane({
        entries: [
          entry('UI-1'),
          { ...entry('UI-2'), dep_created_by_lane: false },
          { ...entry('UI-3'), dep_created_by_lane: false }
        ]
      })
    ]);
    const ws = fakeWs();

    handleMonitorLaneProvenance(
      /** @type {any} */ (ws),
      request('monitor-lane-provenance', {
        lane_id: 'cl_A',
        pairs: [{ bead_id: 'UI-3', after: 'UI-1', value: true }],
        expected_revision: 1
      }),
      seams()
    );

    expect(
      store.read()?.lanes[0].entries.map((e) => e.dep_created_by_lane)
    ).toEqual([undefined, false, false]);
  });

  test('ignores a pair that names no predecessor', () => {
    seed(1, [
      lane({
        entries: [
          entry('UI-1'),
          { ...entry('UI-2'), dep_created_by_lane: false }
        ]
      })
    ]);
    const ws = fakeWs();

    handleMonitorLaneProvenance(
      /** @type {any} */ (ws),
      request('monitor-lane-provenance', {
        lane_id: 'cl_A',
        pairs: [{ bead_id: 'UI-2', value: true }],
        expected_revision: 1
      }),
      seams()
    );

    expect(
      store.read()?.lanes[0].entries.map((e) => e.dep_created_by_lane)
    ).toEqual([undefined, false]);
  });

  test('ignores a pair naming the first entry', () => {
    seed(1, [
      lane({
        entries: [
          entry('UI-1'),
          { ...entry('UI-2'), dep_created_by_lane: false }
        ]
      })
    ]);
    const ws = fakeWs();

    handleMonitorLaneProvenance(
      /** @type {any} */ (ws),
      request('monitor-lane-provenance', {
        lane_id: 'cl_A',
        pairs: [{ bead_id: 'UI-1', after: 'UI-0', value: true }],
        expected_revision: 1
      }),
      seams()
    );

    expect(
      store.read()?.lanes[0].entries[0].dep_created_by_lane
    ).toBeUndefined();
  });

  test('ignores a bead the lane no longer holds', () => {
    seed(1, [
      lane({
        entries: [
          entry('UI-1'),
          { ...entry('UI-2'), dep_created_by_lane: false }
        ]
      })
    ]);
    const ws = fakeWs();

    handleMonitorLaneProvenance(
      /** @type {any} */ (ws),
      request('monitor-lane-provenance', {
        lane_id: 'cl_A',
        pairs: [{ bead_id: 'UI-9', after: 'UI-1', value: true }],
        expected_revision: 1
      }),
      seams()
    );

    expect(ws.reply().payload).toMatchObject({ lane_id: 'cl_A', revision: 2 });
  });

  test('never lowers a pair through this op', () => {
    seed(1, [
      lane({
        entries: [
          entry('UI-1'),
          { ...entry('UI-2'), dep_created_by_lane: true }
        ]
      })
    ]);
    const ws = fakeWs();

    handleMonitorLaneProvenance(
      /** @type {any} */ (ws),
      request('monitor-lane-provenance', {
        lane_id: 'cl_A',
        pairs: [{ bead_id: 'UI-2', after: 'UI-1', value: false }],
        expected_revision: 1
      }),
      seams()
    );

    expect(store.read()?.lanes[0].entries[1].dep_created_by_lane).toBe(true);
  });

  test('answers conflict with the current lanes on a stale revision', () => {
    seed(4, [lane({ entries: [entry('UI-1'), entry('UI-2')] })]);
    const ws = fakeWs();

    handleMonitorLaneProvenance(
      /** @type {any} */ (ws),
      request('monitor-lane-provenance', {
        lane_id: 'cl_A',
        pairs: [{ bead_id: 'UI-2', after: 'UI-1', value: true }],
        expected_revision: 1
      }),
      seams()
    );

    expect(ws.reply().error).toMatchObject({ code: 'conflict' });
  });

  test('rejects a payload with no pairs array', () => {
    const ws = fakeWs();

    handleMonitorLaneProvenance(
      /** @type {any} */ (ws),
      request('monitor-lane-provenance', {
        lane_id: 'cl_A',
        expected_revision: 0
      }),
      seams()
    );

    expect(ws.reply().error).toMatchObject({ code: 'bad_request' });
  });
});

describe('레인 op의 provenance 1단계 (UI-jaua §7.1)', () => {
  test('preserves the value of a position whose neighbour is unchanged', () => {
    seed(1, [
      lane({
        entries: [
          entry('UI-1'),
          { ...entry('UI-2'), dep_created_by_lane: true },
          { ...entry('UI-3'), dep_created_by_lane: true }
        ]
      })
    ]);
    const ws = fakeWs();

    handleMonitorLaneUpdate(
      /** @type {any} */ (ws),
      request('monitor-lane-update', {
        lane_id: 'cl_A',
        entries: [entry('UI-1'), entry('UI-2'), entry('UI-3'), entry('UI-4')],
        expected_revision: 1
      }),
      seams()
    );

    expect(
      store.read()?.lanes[0].entries.map((e) => e.dep_created_by_lane)
    ).toEqual([undefined, true, true, false]);
  });

  test('resets a position whose neighbour changed back to false', () => {
    seed(1, [
      lane({
        entries: [
          entry('UI-1'),
          { ...entry('UI-2'), dep_created_by_lane: true },
          { ...entry('UI-3'), dep_created_by_lane: true }
        ]
      })
    ]);
    const ws = fakeWs();

    handleMonitorLaneUpdate(
      /** @type {any} */ (ws),
      request('monitor-lane-update', {
        lane_id: 'cl_A',
        entries: [entry('UI-1'), entry('UI-3'), entry('UI-2')],
        expected_revision: 1
      }),
      seams()
    );

    expect(
      store.read()?.lanes[0].entries.map((e) => e.dep_created_by_lane)
    ).toEqual([undefined, false, false]);
  });

  test('never trusts a client-supplied true', () => {
    seed(1, [lane({ entries: [entry('UI-1')] })]);
    const ws = fakeWs();

    handleMonitorLaneUpdate(
      /** @type {any} */ (ws),
      request('monitor-lane-update', {
        lane_id: 'cl_A',
        entries: [
          entry('UI-1'),
          { ...entry('UI-2'), dep_created_by_lane: true }
        ],
        expected_revision: 1
      }),
      seams()
    );

    expect(store.read()?.lanes[0].entries[1].dep_created_by_lane).toBe(false);
  });
});
