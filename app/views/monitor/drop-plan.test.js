import { describe, expect, test } from 'vitest';
import {
  planDrop,
  planLaneConfirm,
  planLaneCreate,
  planLaneReapply,
  planLaneRemove
} from './drop-plan.js';

/**
 * @import { DropModel, LaneState } from './drop-plan.js'
 */

const WS_A = '/tmp/example/repo-a';
const WS_B = '/tmp/example/repo-b';

/**
 * @param {Partial<DropModel>} [patch]
 * @returns {DropModel}
 */
function dropModel(patch = {}) {
  return {
    blocked_by_map: new Map(),
    owner_of: new Map(),
    cross_lanes: new Map(),
    owner_lane_of: new Map(),
    fixed_members: new Set(),
    placed_members: new Set(),
    parallel_rows: [],
    parallel_raw_length: new Map(),
    queue_index_of: new Map(),
    ...patch
  };
}

/**
 * Build the 저장 레인 목록 and its 소속 역맵 together — 서버가 보장하는 "한
 * 버드는 레인 하나" 불변식을 픽스처가 깨지 않게 한 자리에서 짓는다 (§4.1).
 *
 * @param {Array<{ id: string, status?: 'draft'|'confirmed', entries: Array<[string, string?]> }>} spec
 * @returns {{ cross_lanes: Map<string, LaneState>, owner_lane_of: Map<string, string> }}
 */
function laneStore(spec) {
  /** @type {Map<string, LaneState>} */
  const cross_lanes = new Map();
  /** @type {Map<string, string>} */
  const owner_lane_of = new Map();
  for (const lane of spec) {
    const entries = lane.entries.map(([bead_id, root_dir]) => ({
      bead_id,
      root_dir: root_dir || WS_A
    }));
    cross_lanes.set(lane.id, { status: lane.status || 'draft', entries });
    for (const entry of entries) {
      owner_lane_of.set(entry.bead_id, lane.id);
    }
  }
  return { cross_lanes, owner_lane_of };
}

/**
 * Three 병렬 통합 큐 행: repo-a에 A-1·A-2, repo-b에 B-1.
 *
 * @param {Partial<DropModel>} [patch]
 * @returns {DropModel}
 */
function parallelModel(patch = {}) {
  return dropModel({
    owner_of: new Map([
      ['A-1', WS_A],
      ['A-2', WS_A],
      ['A-9', WS_A],
      ['B-1', WS_B]
    ]),
    parallel_rows: [
      { bead_id: 'A-1', root_dir: WS_A, queue_index: 0 },
      { bead_id: 'A-2', root_dir: WS_A, queue_index: 1 },
      { bead_id: 'B-1', root_dir: WS_B, queue_index: 0 }
    ],
    parallel_raw_length: new Map([
      [WS_A, 2],
      [WS_B, 1]
    ]),
    queue_index_of: new Map([
      ['A-1', 0],
      ['A-2', 1],
      ['B-1', 0]
    ]),
    ...patch
  });
}

/**
 * Target 확정 레인 `cl_c` = C-1 → C-2 (C-2가 C-1에 blocked). C-1은 repo-b
 * 소유다 — 의존 op의 root가 드래그한 레포가 아니라 blockee 소유 레포임을
 * 드러낸다.
 *
 * @param {Partial<DropModel>} [patch]
 * @returns {DropModel}
 */
function confirmedTargetModel(patch = {}) {
  return dropModel({
    blocked_by_map: new Map([['C-2', ['C-1']]]),
    owner_of: new Map([
      ['A-9', WS_A],
      ['C-1', WS_B],
      ['C-2', WS_A]
    ]),
    ...laneStore([
      {
        id: 'cl_c',
        status: 'confirmed',
        entries: [
          ['C-1', WS_B],
          ['C-2', WS_A]
        ]
      }
    ]),
    placed_members: new Set(['C-1', 'C-2']),
    parallel_raw_length: new Map([
      [WS_A, 2],
      [WS_B, 1]
    ]),
    ...patch
  });
}

/**
 * Source 확정 레인 `cl_s` = P → X → S, 모두 repo-a 병렬 큐.
 *
 * @param {Partial<DropModel>} [patch]
 * @returns {DropModel}
 */
function confirmedSourceModel(patch = {}) {
  return dropModel({
    blocked_by_map: new Map([
      ['X', ['P']],
      ['S', ['X']]
    ]),
    owner_of: new Map([
      ['P', WS_A],
      ['X', WS_A],
      ['S', WS_A]
    ]),
    ...laneStore([
      { id: 'cl_s', status: 'confirmed', entries: [['P'], ['X'], ['S']] }
    ]),
    placed_members: new Set(['P', 'X', 'S']),
    parallel_raw_length: new Map([[WS_A, 3]]),
    queue_index_of: new Map([
      ['P', 0],
      ['X', 1],
      ['S', 2]
    ]),
    ...patch
  });
}

describe('planDrop — draft 대상 (UI-j92s §5.4)', () => {
  test('inserts into a draft lane without any dep or queue op', () => {
    const model = parallelModel({
      ...laneStore([{ id: 'cl_d', entries: [['D-1']] }])
    });

    const plan = planDrop(
      { kind: 'candidate', bead_id: 'A-9', root_dir: WS_A },
      { kind: 'chain', lane_id: 'cl_d', marker_index: 1 },
      model
    );

    expect(plan).toEqual({
      lane_ops: [
        {
          type: 'monitor-lane-update',
          payload: {
            lane_id: 'cl_d',
            entries: [
              { bead_id: 'D-1', root_dir: WS_A },
              { bead_id: 'A-9', root_dir: WS_A }
            ]
          }
        }
      ],
      ops: [],
      lane_op_index: 0
    });
  });

  test('rejoins the confirmed source lane when its row moves into a draft lane', () => {
    const source = confirmedSourceModel();
    const draft = laneStore([
      { id: 'cl_s', status: 'confirmed', entries: [['P'], ['X'], ['S']] },
      { id: 'cl_d', entries: [] }
    ]);
    const model = dropModel({ ...source, ...draft });

    const plan = planDrop(
      { kind: 'chain', bead_id: 'X', root_dir: WS_A, lane_id: 'cl_s' },
      { kind: 'chain', lane_id: 'cl_d', marker_index: 0 },
      model
    );

    expect(plan).toEqual({
      lane_ops: [
        {
          type: 'monitor-lane-update',
          payload: {
            lane_id: 'cl_s',
            entries: [
              { bead_id: 'P', root_dir: WS_A },
              { bead_id: 'S', root_dir: WS_A }
            ]
          }
        },
        {
          type: 'monitor-lane-update',
          payload: {
            lane_id: 'cl_d',
            entries: [{ bead_id: 'X', root_dir: WS_A }]
          }
        }
      ],
      ops: [
        { type: 'dep-remove', a: 'X', b: 'P', root_dir: WS_A },
        { type: 'dep-remove', a: 'S', b: 'X', root_dir: WS_A },
        { type: 'dep-add', a: 'S', b: 'P', root_dir: WS_A }
      ],
      lane_op_index: 2
    });
  });

  test('reorders inside a draft lane with one update and no dep op', () => {
    const model = dropModel({
      owner_of: new Map([
        ['D-1', WS_A],
        ['D-2', WS_A]
      ]),
      ...laneStore([{ id: 'cl_d', entries: [['D-1'], ['D-2']] }])
    });

    const plan = planDrop(
      { kind: 'chain', bead_id: 'D-2', root_dir: WS_A, lane_id: 'cl_d' },
      { kind: 'chain', lane_id: 'cl_d', marker_index: 0 },
      model
    );

    expect(plan).toEqual({
      lane_ops: [
        {
          type: 'monitor-lane-update',
          payload: {
            lane_id: 'cl_d',
            entries: [
              { bead_id: 'D-2', root_dir: WS_A },
              { bead_id: 'D-1', root_dir: WS_A }
            ]
          }
        }
      ],
      ops: [],
      lane_op_index: 0
    });
  });

  test('leaves a draft row dependency untouched when the row is removed', () => {
    const model = dropModel({
      // 밖에서 생긴 의존이 draft 멤버 사이에 있어도 draft는 그것을 소유하지
      // 않는다 (§5.4) — 이어 붙이기를 하지 않는다.
      blocked_by_map: new Map([['D-2', ['D-1']]]),
      owner_of: new Map([
        ['D-1', WS_A],
        ['D-2', WS_A]
      ]),
      ...laneStore([{ id: 'cl_d', entries: [['D-1'], ['D-2']] }]),
      parallel_raw_length: new Map([[WS_A, 2]])
    });

    const plan = planDrop(
      { kind: 'chain', bead_id: 'D-1', root_dir: WS_A, lane_id: 'cl_d' },
      { kind: 'parallel', marker_index: 0 },
      model
    );

    expect(plan).toEqual({
      lane_ops: [
        {
          type: 'monitor-lane-update',
          payload: {
            lane_id: 'cl_d',
            entries: [{ bead_id: 'D-2', root_dir: WS_A }]
          }
        }
      ],
      ops: [],
      lane_op_index: 0
    });
  });

  test('keeps a candidate out of every queue when a draft lane takes it', () => {
    const model = parallelModel({
      ...laneStore([{ id: 'cl_d', entries: [] }])
    });

    const plan = planDrop(
      { kind: 'candidate', bead_id: 'A-9', root_dir: WS_A },
      { kind: 'chain', lane_id: 'cl_d', marker_index: 0 },
      model
    );

    expect('ops' in plan && plan.ops).toEqual([]);
  });
});

describe('planLaneConfirm — 확정 (UI-j92s §5.4)', () => {
  test('links every adjacent pair and flips the lane', () => {
    const model = dropModel({
      owner_of: new Map([
        ['D-1', WS_A],
        ['D-2', WS_B]
      ]),
      ...laneStore([
        {
          id: 'cl_d',
          entries: [
            ['D-1', WS_A],
            ['D-2', WS_B]
          ]
        }
      ]),
      placed_members: new Set(['D-1', 'D-2'])
    });

    const plan = planLaneConfirm('cl_d', model);

    expect(plan).toEqual({
      lane_ops: [
        { type: 'monitor-lane-confirm', payload: { lane_id: 'cl_d' } }
      ],
      ops: [{ type: 'dep-add', a: 'D-2', b: 'D-1', root_dir: WS_B }],
      lane_op_index: 0
    });
  });

  test('skips an adjacent dependency the graph already carries', () => {
    const model = dropModel({
      blocked_by_map: new Map([['D-2', ['D-1']]]),
      owner_of: new Map([
        ['D-1', WS_A],
        ['D-2', WS_A],
        ['D-3', WS_A]
      ]),
      ...laneStore([{ id: 'cl_d', entries: [['D-1'], ['D-2'], ['D-3']] }]),
      placed_members: new Set(['D-1', 'D-2', 'D-3'])
    });

    const plan = planLaneConfirm('cl_d', model);

    expect('ops' in plan && plan.ops).toEqual([
      { type: 'dep-add', a: 'D-3', b: 'D-2', root_dir: WS_A }
    ]);
  });

  test('refuses the whole plan and sends no confirm when the order closes a cycle', () => {
    const model = dropModel({
      blocked_by_map: new Map([['D-1', ['D-2']]]),
      owner_of: new Map([
        ['D-1', WS_A],
        ['D-2', WS_A]
      ]),
      ...laneStore([{ id: 'cl_d', entries: [['D-1'], ['D-2']] }]),
      placed_members: new Set(['D-1', 'D-2'])
    });

    const plan = planLaneConfirm('cl_d', model);

    expect(plan).toEqual({
      refused: '의존 사이클이 생깁니다 — D-2가 이미 D-1를 막고 있습니다'
    });
  });

  test('places only the members no queue holds, in lane order', () => {
    const model = dropModel({
      blocked_by_map: new Map([
        ['D-2', ['D-1']],
        ['D-3', ['D-2']]
      ]),
      owner_of: new Map([
        ['D-1', WS_A],
        ['D-2', WS_A],
        ['D-3', WS_A]
      ]),
      ...laneStore([{ id: 'cl_d', entries: [['D-1'], ['D-2'], ['D-3']] }]),
      placed_members: new Set(['D-2']),
      parallel_raw_length: new Map([[WS_A, 4]])
    });

    const plan = planLaneConfirm('cl_d', model);

    expect('ops' in plan && plan.ops).toEqual([
      {
        type: 'worker-queue-place',
        payload: { bead_id: 'D-1', index: 4 },
        root_dir: WS_A
      },
      {
        type: 'worker-queue-place',
        payload: { bead_id: 'D-3', index: 5 },
        root_dir: WS_A
      }
    ]);
  });

  test('counts each repo tail separately when unplaced members span repos', () => {
    const model = dropModel({
      blocked_by_map: new Map([
        ['D-2', ['D-1']],
        ['D-3', ['D-2']]
      ]),
      owner_of: new Map([
        ['D-1', WS_A],
        ['D-2', WS_B],
        ['D-3', WS_A]
      ]),
      ...laneStore([
        {
          id: 'cl_d',
          entries: [
            ['D-1', WS_A],
            ['D-2', WS_B],
            ['D-3', WS_A]
          ]
        }
      ]),
      parallel_raw_length: new Map([
        [WS_A, 2],
        [WS_B, 5]
      ])
    });

    const plan = planLaneConfirm('cl_d', model);

    expect(
      'ops' in plan &&
        plan.ops.map((op) => [
          /** @type {any} */ (op).payload.bead_id,
          /** @type {any} */ (op).payload.index,
          op.root_dir
        ])
    ).toEqual([
      ['D-1', 2, WS_A],
      ['D-2', 5, WS_B],
      ['D-3', 3, WS_A]
    ]);
  });

  test('refuses a confirm of a lane holding fewer than two members', () => {
    const model = dropModel({
      owner_of: new Map([['D-1', WS_A]]),
      ...laneStore([{ id: 'cl_d', entries: [['D-1']] }])
    });

    const plan = planLaneConfirm('cl_d', model);

    expect(plan).toEqual({
      refused: '확정하려면 멤버가 2개 이상이어야 합니다'
    });
  });
});

describe('planDrop — confirmed 대상 (UI-j92s §5.4)', () => {
  test('appends a candidate to a confirmed lane and loads its own parallel tail', () => {
    const model = confirmedTargetModel();

    const plan = planDrop(
      { kind: 'candidate', bead_id: 'A-9', root_dir: WS_A },
      { kind: 'chain', lane_id: 'cl_c', marker_index: 2 },
      model
    );

    expect(plan).toEqual({
      lane_ops: [
        {
          type: 'monitor-lane-update',
          payload: {
            lane_id: 'cl_c',
            entries: [
              { bead_id: 'C-1', root_dir: WS_B },
              { bead_id: 'C-2', root_dir: WS_A },
              { bead_id: 'A-9', root_dir: WS_A }
            ]
          }
        }
      ],
      ops: [
        { type: 'dep-add', a: 'A-9', b: 'C-2', root_dir: WS_A },
        {
          type: 'worker-queue-place',
          payload: { bead_id: 'A-9', index: 2 },
          root_dir: WS_A
        }
      ],
      lane_op_index: 0
    });
  });

  test('splits the existing edge when the marker lands between two confirmed rows', () => {
    const model = confirmedTargetModel({
      parallel_rows: [{ bead_id: 'A-9', root_dir: WS_A, queue_index: 0 }],
      queue_index_of: new Map([['A-9', 0]])
    });

    const plan = planDrop(
      { kind: 'parallel', bead_id: 'A-9', root_dir: WS_A, queue_index: 0 },
      { kind: 'chain', lane_id: 'cl_c', marker_index: 1 },
      model
    );

    expect(plan).toEqual({
      lane_ops: [
        {
          type: 'monitor-lane-update',
          payload: {
            lane_id: 'cl_c',
            entries: [
              { bead_id: 'C-1', root_dir: WS_B },
              { bead_id: 'A-9', root_dir: WS_A },
              { bead_id: 'C-2', root_dir: WS_A }
            ]
          }
        }
      ],
      ops: [
        { type: 'dep-remove', a: 'C-2', b: 'C-1', root_dir: WS_A },
        { type: 'dep-add', a: 'A-9', b: 'C-1', root_dir: WS_A },
        { type: 'dep-add', a: 'C-2', b: 'A-9', root_dir: WS_A }
      ],
      lane_op_index: 1
    });
  });

  test('rejoins then re-inserts when a confirmed row moves inside its lane', () => {
    const model = confirmedSourceModel();

    const plan = planDrop(
      {
        kind: 'chain',
        bead_id: 'X',
        root_dir: WS_A,
        lane_id: 'cl_s',
        queue_index: 1
      },
      { kind: 'chain', lane_id: 'cl_s', marker_index: 0 },
      model
    );

    expect(plan).toEqual({
      lane_ops: [
        {
          type: 'monitor-lane-update',
          payload: {
            lane_id: 'cl_s',
            entries: [
              { bead_id: 'X', root_dir: WS_A },
              { bead_id: 'P', root_dir: WS_A },
              { bead_id: 'S', root_dir: WS_A }
            ]
          }
        }
      ],
      ops: [
        { type: 'dep-remove', a: 'X', b: 'P', root_dir: WS_A },
        { type: 'dep-remove', a: 'S', b: 'X', root_dir: WS_A },
        { type: 'dep-add', a: 'S', b: 'P', root_dir: WS_A },
        { type: 'dep-add', a: 'P', b: 'X', root_dir: WS_A }
      ],
      lane_op_index: 2
    });
  });

  test('returns no op when a confirmed row lands back on its own slot', () => {
    const model = confirmedSourceModel();

    const plan = planDrop(
      {
        kind: 'chain',
        bead_id: 'X',
        root_dir: WS_A,
        lane_id: 'cl_s',
        queue_index: 1
      },
      { kind: 'chain', lane_id: 'cl_s', marker_index: 1 },
      model
    );

    expect(plan).toEqual({ lane_ops: [], ops: [], lane_op_index: 0 });
  });

  test('treats the marker just below the dragged row as the same slot', () => {
    const model = confirmedSourceModel();

    const plan = planDrop(
      {
        kind: 'chain',
        bead_id: 'X',
        root_dir: WS_A,
        lane_id: 'cl_s',
        queue_index: 1
      },
      { kind: 'chain', lane_id: 'cl_s', marker_index: 2 },
      model
    );

    expect(plan).toEqual({ lane_ops: [], ops: [], lane_op_index: 0 });
  });
});

describe('planDrop — confirmed 행 ✕ 와 다른 대상 (UI-j92s §5.4)', () => {
  test('drops the row from its lane and unloads it on the candidate pane', () => {
    const model = confirmedSourceModel();

    const plan = planDrop(
      {
        kind: 'chain',
        bead_id: 'X',
        root_dir: WS_A,
        lane_id: 'cl_s',
        queue_index: 1
      },
      { kind: 'candidate' },
      model
    );

    expect(plan).toEqual({
      lane_ops: [
        {
          type: 'monitor-lane-update',
          payload: {
            lane_id: 'cl_s',
            entries: [
              { bead_id: 'P', root_dir: WS_A },
              { bead_id: 'S', root_dir: WS_A }
            ]
          }
        }
      ],
      ops: [
        { type: 'dep-remove', a: 'X', b: 'P', root_dir: WS_A },
        { type: 'dep-remove', a: 'S', b: 'X', root_dir: WS_A },
        { type: 'dep-add', a: 'S', b: 'P', root_dir: WS_A },
        {
          type: 'worker-queue-remove',
          payload: { bead_id: 'X' },
          root_dir: WS_A
        }
      ],
      lane_op_index: 2
    });
  });

  test('plans no queue op when a confirmed row is detached to the parallel area', () => {
    const model = confirmedSourceModel();

    const plan = planDrop(
      {
        kind: 'chain',
        bead_id: 'X',
        root_dir: WS_A,
        lane_id: 'cl_s',
        queue_index: 1
      },
      { kind: 'parallel', marker_index: 0 },
      model
    );

    expect(plan).toEqual({
      lane_ops: [
        {
          type: 'monitor-lane-update',
          payload: {
            lane_id: 'cl_s',
            entries: [
              { bead_id: 'P', root_dir: WS_A },
              { bead_id: 'S', root_dir: WS_A }
            ]
          }
        }
      ],
      ops: [
        { type: 'dep-remove', a: 'X', b: 'P', root_dir: WS_A },
        { type: 'dep-remove', a: 'S', b: 'X', root_dir: WS_A },
        { type: 'dep-add', a: 'S', b: 'P', root_dir: WS_A }
      ],
      lane_op_index: 2
    });
  });

  test('splices then places when a confirmed row goes to a serial lane', () => {
    const model = confirmedSourceModel();

    const plan = planDrop(
      {
        kind: 'chain',
        bead_id: 'X',
        root_dir: WS_A,
        lane_id: 'cl_s',
        queue_index: 1
      },
      { kind: 'repo-serial', root_dir: WS_A, lane_id: 's1', index: 2 },
      model
    );

    expect('ops' in plan && plan.ops[plan.ops.length - 1]).toEqual({
      type: 'worker-queue-place',
      payload: { bead_id: 'X', lane: 's1', index: 2 },
      root_dir: WS_A
    });
  });
});

describe('planDrop — 레인 거부 (UI-j92s §5.3·§5.4)', () => {
  test('refuses a repo-serial source dropped on a lane', () => {
    const model = confirmedTargetModel();

    const plan = planDrop(
      {
        kind: 'repo-serial',
        bead_id: 'A-9',
        root_dir: WS_A,
        lane_id: 's1',
        queue_index: 0
      },
      { kind: 'chain', lane_id: 'cl_c', marker_index: 0 },
      model
    );

    expect(plan).toEqual({ refused: 'Worker 탭 직렬 레인에서 먼저 빼 주세요' });
  });

  test('refuses a bead that already belongs to another lane', () => {
    const model = dropModel({
      owner_of: new Map([['D-1', WS_A]]),
      ...laneStore([
        { id: 'cl_1', entries: [['D-1']] },
        { id: 'cl_2', entries: [] }
      ]),
      parallel_rows: [{ bead_id: 'D-1', root_dir: WS_A, queue_index: 0 }],
      queue_index_of: new Map([['D-1', 0]])
    });

    const plan = planDrop(
      { kind: 'parallel', bead_id: 'D-1', root_dir: WS_A, queue_index: 0 },
      { kind: 'chain', lane_id: 'cl_2', marker_index: 0 },
      model
    );

    expect(plan).toEqual({ refused: '이미 연결 1에 있습니다' });
  });

  test('refuses an insertion before a fixed row', () => {
    const model = confirmedTargetModel({
      fixed_members: new Set(['C-1'])
    });

    const plan = planDrop(
      { kind: 'candidate', bead_id: 'A-9', root_dir: WS_A },
      { kind: 'chain', lane_id: 'cl_c', marker_index: 0 },
      model
    );

    expect(plan).toEqual({
      refused: '이미 진행 중인 이슈 앞에는 넣을 수 없습니다'
    });
  });

  test('allows an insertion right after the last fixed row', () => {
    const model = confirmedTargetModel({
      fixed_members: new Set(['C-1'])
    });

    const plan = planDrop(
      { kind: 'candidate', bead_id: 'A-9', root_dir: WS_A },
      { kind: 'chain', lane_id: 'cl_c', marker_index: 1 },
      model
    );

    expect('lane_ops' in plan && plan.lane_ops[0].payload).toEqual({
      lane_id: 'cl_c',
      entries: [
        { bead_id: 'C-1', root_dir: WS_B },
        { bead_id: 'A-9', root_dir: WS_A },
        { bead_id: 'C-2', root_dir: WS_A }
      ]
    });
  });

  test('refuses the whole plan when the blockee has no resolvable repo', () => {
    const model = confirmedTargetModel({
      owner_of: new Map([['C-1', WS_B]])
    });

    const plan = planDrop(
      { kind: 'candidate', bead_id: 'A-9', root_dir: WS_A },
      { kind: 'chain', lane_id: 'cl_c', marker_index: 2 },
      model
    );

    expect(plan).toEqual({
      refused: 'A-9의 레포를 알 수 없어 의존을 바꿀 수 없습니다'
    });
  });

  test('refuses a drop that would close a dependency cycle', () => {
    const model = confirmedTargetModel({
      blocked_by_map: new Map([
        ['C-2', ['C-1']],
        ['C-1', ['A-9']]
      ])
    });

    const plan = planDrop(
      { kind: 'candidate', bead_id: 'A-9', root_dir: WS_A },
      { kind: 'chain', lane_id: 'cl_c', marker_index: 2 },
      model
    );

    expect(plan).toEqual({
      refused: '의존 사이클이 생깁니다 — A-9가 이미 C-2를 막고 있습니다'
    });
  });

  test('refuses a drop onto a lane the snapshot no longer holds', () => {
    const model = confirmedTargetModel();

    const plan = planDrop(
      { kind: 'candidate', bead_id: 'A-9', root_dir: WS_A },
      { kind: 'chain', lane_id: 'cl_gone', marker_index: 0 },
      model
    );

    expect(plan).toEqual({ refused: '연결 레인이 없습니다' });
  });
});

describe('planDrop — 전송 순서 (UI-j92s §5.5)', () => {
  test('orders the result dep-remove, lane op, dep-add, queue op', () => {
    const model = confirmedSourceModel();

    const plan = planDrop(
      {
        kind: 'chain',
        bead_id: 'X',
        root_dir: WS_A,
        lane_id: 'cl_s',
        queue_index: 1
      },
      { kind: 'candidate' },
      model
    );

    expect('ops' in plan && plan.ops.map((op) => op.type)).toEqual([
      'dep-remove',
      'dep-remove',
      'dep-add',
      'worker-queue-remove'
    ]);
    expect('lane_op_index' in plan && plan.lane_op_index).toBe(2);
  });
});

describe('planLaneRemove — 레인 삭제 (UI-j92s §5.1)', () => {
  test('drops every adjacent dependency before removing a confirmed lane', () => {
    const model = confirmedSourceModel();

    const plan = planLaneRemove('cl_s', model);

    expect(plan).toEqual({
      lane_ops: [{ type: 'monitor-lane-remove', payload: { lane_id: 'cl_s' } }],
      ops: [
        { type: 'dep-remove', a: 'X', b: 'P', root_dir: WS_A },
        { type: 'dep-remove', a: 'S', b: 'X', root_dir: WS_A }
      ],
      lane_op_index: 2
    });
  });

  test('removes a draft lane with no dependency op', () => {
    const model = dropModel({
      blocked_by_map: new Map([['D-2', ['D-1']]]),
      owner_of: new Map([
        ['D-1', WS_A],
        ['D-2', WS_A]
      ]),
      ...laneStore([{ id: 'cl_d', entries: [['D-1'], ['D-2']] }])
    });

    const plan = planLaneRemove('cl_d', model);

    expect(plan).toEqual({
      lane_ops: [{ type: 'monitor-lane-remove', payload: { lane_id: 'cl_d' } }],
      ops: [],
      lane_op_index: 0
    });
  });

  test('skips an adjacent dependency the graph no longer carries', () => {
    const model = confirmedSourceModel({
      blocked_by_map: new Map([['S', ['X']]])
    });

    const plan = planLaneRemove('cl_s', model);

    expect('ops' in plan && plan.ops).toEqual([
      { type: 'dep-remove', a: 'S', b: 'X', root_dir: WS_A }
    ]);
  });
});

describe('planLaneReapply — 재적용 (UI-j92s §5.2)', () => {
  test('adds the missing adjacent dependency and re-places the unplaced member', () => {
    const model = confirmedSourceModel({
      blocked_by_map: new Map([['X', ['P']]]),
      placed_members: new Set(['P', 'X'])
    });

    const plan = planLaneReapply('cl_s', model);

    expect(plan).toEqual({
      lane_ops: [],
      ops: [
        { type: 'dep-add', a: 'S', b: 'X', root_dir: WS_A },
        {
          type: 'worker-queue-place',
          payload: { bead_id: 'S', index: 3 },
          root_dir: WS_A
        }
      ],
      lane_op_index: 0
    });
  });
});

describe('planLaneCreate — 새 연결 레인 (UI-j92s §5.4)', () => {
  test('creates a draft lane seeded with one bead', () => {
    const model = parallelModel();

    const plan = planLaneCreate({ bead_id: 'A-9', root_dir: WS_A }, model);

    expect(plan).toEqual({
      lane_ops: [
        {
          type: 'monitor-lane-create',
          payload: { entries: [{ bead_id: 'A-9', root_dir: WS_A }] }
        }
      ],
      ops: [],
      lane_op_index: 0
    });
  });

  test('creates an empty draft lane when there is no seed', () => {
    const model = parallelModel();

    const plan = planLaneCreate(null, model);

    expect('lane_ops' in plan && plan.lane_ops[0].payload).toEqual({
      entries: []
    });
  });

  test('refuses a seed that already belongs to a lane', () => {
    const model = parallelModel({
      ...laneStore([
        { id: 'cl_1', entries: [] },
        { id: 'cl_2', entries: [['A-9']] }
      ])
    });

    const plan = planLaneCreate({ bead_id: 'A-9', root_dir: WS_A }, model);

    expect(plan).toEqual({ refused: '이미 연결 2에 있습니다' });
  });
});

describe('planDrop — 레인 밖 대상 (UI-e6hw §5.2)', () => {
  test('returns no op when a candidate lands back on the candidate pane', () => {
    const model = parallelModel();

    const plan = planDrop(
      { kind: 'candidate', bead_id: 'A-9', root_dir: WS_A },
      { kind: 'candidate' },
      model
    );

    expect(plan).toEqual({ lane_ops: [], ops: [], lane_op_index: 0 });
  });

  test('places a candidate at the raw index of the row the marker sits above', () => {
    const model = parallelModel();

    const plan = planDrop(
      { kind: 'candidate', bead_id: 'A-9', root_dir: WS_A },
      { kind: 'parallel', marker_index: 1 },
      model
    );

    expect('ops' in plan && plan.ops).toEqual([
      {
        type: 'worker-queue-place',
        payload: { bead_id: 'A-9', index: 1 },
        root_dir: WS_A
      }
    ]);
  });

  test('falls back to parallel_raw_length when the repo has no visible row', () => {
    const model = parallelModel({
      owner_of: new Map([['B-9', WS_B]]),
      parallel_rows: [{ bead_id: 'A-1', root_dir: WS_A, queue_index: 0 }],
      parallel_raw_length: new Map([
        [WS_A, 1],
        [WS_B, 3]
      ])
    });

    const plan = planDrop(
      { kind: 'candidate', bead_id: 'B-9', root_dir: WS_B },
      { kind: 'parallel', marker_index: 1 },
      model
    );

    expect('ops' in plan && plan.ops).toEqual([
      {
        type: 'worker-queue-place',
        payload: { bead_id: 'B-9', index: 3 },
        root_dir: WS_B
      }
    ]);
  });

  test('removes a parallel row dragged onto the candidate pane', () => {
    const model = parallelModel();

    const plan = planDrop(
      { kind: 'parallel', bead_id: 'A-1', root_dir: WS_A, queue_index: 0 },
      { kind: 'candidate' },
      model
    );

    expect('ops' in plan && plan.ops).toEqual([
      {
        type: 'worker-queue-remove',
        payload: { bead_id: 'A-1' },
        root_dir: WS_A
      }
    ]);
  });

  test('reorders inside its own repo with the remove-then-insert correction', () => {
    const model = parallelModel();

    const plan = planDrop(
      { kind: 'parallel', bead_id: 'A-1', root_dir: WS_A, queue_index: 0 },
      { kind: 'parallel', marker_index: 2 },
      model
    );

    expect('ops' in plan && plan.ops).toEqual([
      {
        type: 'worker-queue-reorder',
        payload: { bead_id: 'A-1', to_index: 1 },
        root_dir: WS_A
      }
    ]);
  });

  test('returns no op when a parallel row lands on its own position', () => {
    const model = parallelModel();

    const plan = planDrop(
      { kind: 'parallel', bead_id: 'A-1', root_dir: WS_A, queue_index: 0 },
      { kind: 'parallel', marker_index: 0 },
      model
    );

    expect('ops' in plan && plan.ops).toEqual([]);
  });

  test('refuses a candidate dropped on another repo serial lane', () => {
    const model = parallelModel();

    const plan = planDrop(
      { kind: 'candidate', bead_id: 'A-9', root_dir: WS_A },
      { kind: 'repo-serial', root_dir: WS_B, lane_id: 's1', index: 0 },
      model
    );

    expect(plan).toEqual({
      refused: '다른 레포 이슈는 이 직렬 레인에 넣을 수 없습니다'
    });
  });

  test('reorders inside the same serial lane', () => {
    const model = parallelModel({
      queue_index_of: new Map([['A-1', 2]])
    });

    const plan = planDrop(
      {
        kind: 'repo-serial',
        bead_id: 'A-1',
        root_dir: WS_A,
        lane_id: 's1',
        queue_index: 2
      },
      { kind: 'repo-serial', root_dir: WS_A, lane_id: 's1', index: 0 },
      model
    );

    expect('ops' in plan && plan.ops).toEqual([
      {
        type: 'worker-queue-reorder',
        payload: { bead_id: 'A-1', lane: 's1', to_index: 0 },
        root_dir: WS_A
      }
    ]);
  });

  test('places into a different serial lane of the same repo', () => {
    const model = parallelModel();

    const plan = planDrop(
      {
        kind: 'repo-serial',
        bead_id: 'A-1',
        root_dir: WS_A,
        lane_id: 's1',
        queue_index: 0
      },
      { kind: 'repo-serial', root_dir: WS_A, lane_id: 's2', index: 1 },
      model
    );

    expect('ops' in plan && plan.ops).toEqual([
      {
        type: 'worker-queue-place',
        payload: { bead_id: 'A-1', lane: 's2', index: 1 },
        root_dir: WS_A
      }
    ]);
  });
});
