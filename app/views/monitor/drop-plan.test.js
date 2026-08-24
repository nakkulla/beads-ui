import { describe, expect, test } from 'vitest';
import { planDrop } from './drop-plan.js';

/**
 * @import { DropModel } from './drop-plan.js'
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
    lane_order: new Map(),
    parallel_rows: [],
    parallel_raw_length: new Map(),
    queue_index_of: new Map(),
    ...patch
  };
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
 * Target 연결 레인 `chain:c` = C-1 → C-2 (C-2가 C-1에 blocked). C-1은 repo-b 소유다 —
 * 의존 op의 root가 드래그한 레포가 아니라 blockee 소유 레포임을 드러낸다.
 *
 * @param {Partial<DropModel>} [patch]
 * @returns {DropModel}
 */
function chainTargetModel(patch = {}) {
  return dropModel({
    blocked_by_map: new Map([['C-2', ['C-1']]]),
    owner_of: new Map([
      ['A-9', WS_A],
      ['C-1', WS_B],
      ['C-2', WS_A]
    ]),
    lane_order: new Map([['chain:c', ['C-1', 'C-2']]]),
    parallel_raw_length: new Map([
      [WS_A, 2],
      [WS_B, 1]
    ]),
    ...patch
  });
}

/**
 * Source 연결 레인 `chain:s` = P → X → S, 모두 repo-a 병렬 큐.
 *
 * @param {Partial<DropModel>} [patch]
 * @returns {DropModel}
 */
function chainSourceModel(patch = {}) {
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
    lane_order: new Map([['chain:s', ['P', 'X', 'S']]]),
    parallel_raw_length: new Map([[WS_A, 3]]),
    queue_index_of: new Map([
      ['P', 0],
      ['X', 1],
      ['S', 2]
    ]),
    ...patch
  });
}

describe('planDrop — 원천 candidate (UI-e6hw §5.2)', () => {
  test('returns no op when a candidate lands back on the candidate pane', () => {
    const model = parallelModel();

    const plan = planDrop(
      { kind: 'candidate', bead_id: 'A-9', root_dir: WS_A },
      { kind: 'candidate' },
      model
    );

    expect(plan).toEqual({ ops: [] });
  });

  test('places a candidate at the raw index of the row the marker sits above', () => {
    const model = parallelModel();

    const plan = planDrop(
      { kind: 'candidate', bead_id: 'A-9', root_dir: WS_A },
      { kind: 'parallel', marker_index: 1 },
      model
    );

    expect(plan).toEqual({
      ops: [
        {
          type: 'worker-queue-place',
          payload: { bead_id: 'A-9', index: 1 },
          root_dir: WS_A
        }
      ]
    });
  });

  test('falls back to parallel_raw_length when the repo has no visible row', () => {
    const model = parallelModel({
      parallel_rows: [{ bead_id: 'A-1', root_dir: WS_A, queue_index: 0 }],
      parallel_raw_length: new Map([
        [WS_A, 1],
        [WS_B, 3]
      ])
    });

    const plan = planDrop(
      { kind: 'candidate', bead_id: 'B-9', root_dir: WS_B },
      { kind: 'parallel', marker_index: 0 },
      model
    );

    expect(plan).toEqual({
      ops: [
        {
          type: 'worker-queue-place',
          payload: { bead_id: 'B-9', index: 3 },
          root_dir: WS_B
        }
      ]
    });
  });

  test('appends a candidate to a chain lane and loads its own parallel queue last', () => {
    const model = chainTargetModel();

    const plan = planDrop(
      { kind: 'candidate', bead_id: 'A-9', root_dir: WS_A },
      { kind: 'chain', lane_id: 'chain:c', marker_index: 2 },
      model
    );

    expect(plan).toEqual({
      ops: [
        { type: 'dep-add', a: 'A-9', b: 'C-2', root_dir: WS_A },
        {
          type: 'worker-queue-place',
          payload: { bead_id: 'A-9', index: 2 },
          root_dir: WS_A
        }
      ]
    });
  });

  test('places a candidate into a serial lane of its own repo', () => {
    const model = parallelModel();

    const plan = planDrop(
      { kind: 'candidate', bead_id: 'A-9', root_dir: WS_A },
      { kind: 'repo-serial', root_dir: WS_A, lane_id: 's2', index: 1 },
      model
    );

    expect(plan).toEqual({
      ops: [
        {
          type: 'worker-queue-place',
          payload: { bead_id: 'A-9', lane: 's2', index: 1 },
          root_dir: WS_A
        }
      ]
    });
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
});

describe('planDrop — 원천 parallel (UI-e6hw §5.2)', () => {
  test('removes a parallel row dragged onto the candidate pane', () => {
    const model = parallelModel();

    const plan = planDrop(
      { kind: 'parallel', bead_id: 'A-1', root_dir: WS_A, queue_index: 0 },
      { kind: 'candidate' },
      model
    );

    expect(plan).toEqual({
      ops: [
        {
          type: 'worker-queue-remove',
          payload: { bead_id: 'A-1' },
          root_dir: WS_A
        }
      ]
    });
  });

  test('reorders inside its own repo with the remove-then-insert correction', () => {
    const model = parallelModel();

    const plan = planDrop(
      { kind: 'parallel', bead_id: 'A-1', root_dir: WS_A, queue_index: 0 },
      { kind: 'parallel', marker_index: 2 },
      model
    );

    expect(plan).toEqual({
      ops: [
        {
          type: 'worker-queue-reorder',
          payload: { bead_id: 'A-1', to_index: 1 },
          root_dir: WS_A
        }
      ]
    });
  });

  test('returns no op when a parallel row lands on its own position', () => {
    const model = parallelModel();

    const plan = planDrop(
      { kind: 'parallel', bead_id: 'A-1', root_dir: WS_A, queue_index: 0 },
      { kind: 'parallel', marker_index: 0 },
      model
    );

    expect(plan).toEqual({ ops: [] });
  });

  test('links a parallel row into a chain lane without touching the queue', () => {
    const model = chainTargetModel({
      owner_of: new Map([
        ['A-1', WS_A],
        ['C-1', WS_B],
        ['C-2', WS_A]
      ])
    });

    const plan = planDrop(
      { kind: 'parallel', bead_id: 'A-1', root_dir: WS_A, queue_index: 0 },
      { kind: 'chain', lane_id: 'chain:c', marker_index: 2 },
      model
    );

    expect(plan).toEqual({
      ops: [{ type: 'dep-add', a: 'A-1', b: 'C-2', root_dir: WS_A }]
    });
  });

  test('moves a parallel row into a serial lane of the same repo', () => {
    const model = parallelModel();

    const plan = planDrop(
      { kind: 'parallel', bead_id: 'A-1', root_dir: WS_A, queue_index: 0 },
      { kind: 'repo-serial', root_dir: WS_A, lane_id: 's1', index: 0 },
      model
    );

    expect(plan).toEqual({
      ops: [
        {
          type: 'worker-queue-place',
          payload: { bead_id: 'A-1', lane: 's1', index: 0 },
          root_dir: WS_A
        }
      ]
    });
  });

  test('refuses a parallel row dropped on another repo serial lane', () => {
    const model = parallelModel();

    const plan = planDrop(
      { kind: 'parallel', bead_id: 'A-1', root_dir: WS_A, queue_index: 0 },
      { kind: 'repo-serial', root_dir: WS_B, lane_id: 's1', index: 0 },
      model
    );

    expect(plan).toEqual({
      refused: '다른 레포 이슈는 이 직렬 레인에 넣을 수 없습니다'
    });
  });
});

describe('planDrop — 원천 chain (UI-e6hw §5.2)', () => {
  test('splices the row out and removes it from the queue on the candidate pane', () => {
    const model = chainSourceModel();

    const plan = planDrop(
      {
        kind: 'chain',
        bead_id: 'X',
        root_dir: WS_A,
        lane_id: 'chain:s',
        queue_index: 1
      },
      { kind: 'candidate' },
      model
    );

    expect(plan).toEqual({
      ops: [
        { type: 'dep-remove', a: 'X', b: 'P', root_dir: WS_A },
        { type: 'dep-remove', a: 'S', b: 'X', root_dir: WS_A },
        { type: 'dep-add', a: 'S', b: 'P', root_dir: WS_A },
        {
          type: 'worker-queue-remove',
          payload: { bead_id: 'X' },
          root_dir: WS_A
        }
      ]
    });
  });

  test('splices only when a chain row is dropped on the parallel area', () => {
    const model = chainSourceModel();

    const plan = planDrop(
      {
        kind: 'chain',
        bead_id: 'X',
        root_dir: WS_A,
        lane_id: 'chain:s',
        queue_index: 1
      },
      { kind: 'parallel', marker_index: 0 },
      model
    );

    expect(plan).toEqual({
      ops: [
        { type: 'dep-remove', a: 'X', b: 'P', root_dir: WS_A },
        { type: 'dep-remove', a: 'S', b: 'X', root_dir: WS_A },
        { type: 'dep-add', a: 'S', b: 'P', root_dir: WS_A }
      ]
    });
  });

  test('rejoins every (P, S) pair when a branching row leaves the lane', () => {
    const model = dropModel({
      blocked_by_map: new Map([
        ['X', ['P1', 'P2']],
        ['S1', ['X']],
        ['S2', ['X']]
      ]),
      owner_of: new Map([
        ['P1', WS_A],
        ['P2', WS_A],
        ['X', WS_A],
        ['S1', WS_A],
        ['S2', WS_A]
      ]),
      lane_order: new Map([['chain:s', ['P1', 'P2', 'X', 'S1', 'S2']]]),
      parallel_raw_length: new Map([[WS_A, 5]])
    });

    const plan = planDrop(
      {
        kind: 'chain',
        bead_id: 'X',
        root_dir: WS_A,
        lane_id: 'chain:s',
        queue_index: 2
      },
      { kind: 'parallel', marker_index: 0 },
      model
    );

    expect(plan).toEqual({
      ops: [
        { type: 'dep-remove', a: 'X', b: 'P1', root_dir: WS_A },
        { type: 'dep-remove', a: 'X', b: 'P2', root_dir: WS_A },
        { type: 'dep-remove', a: 'S1', b: 'X', root_dir: WS_A },
        { type: 'dep-remove', a: 'S2', b: 'X', root_dir: WS_A },
        { type: 'dep-add', a: 'S1', b: 'P1', root_dir: WS_A },
        { type: 'dep-add', a: 'S2', b: 'P1', root_dir: WS_A },
        { type: 'dep-add', a: 'S1', b: 'P2', root_dir: WS_A },
        { type: 'dep-add', a: 'S2', b: 'P2', root_dir: WS_A }
      ]
    });
  });

  test('skips the p === s pair a two node cycle would produce', () => {
    const model = dropModel({
      blocked_by_map: new Map([
        ['X', ['Y']],
        ['Y', ['X']]
      ]),
      owner_of: new Map([
        ['X', WS_A],
        ['Y', WS_A]
      ]),
      lane_order: new Map([['chain:s', ['X', 'Y']]]),
      parallel_raw_length: new Map([[WS_A, 2]])
    });

    const plan = planDrop(
      {
        kind: 'chain',
        bead_id: 'X',
        root_dir: WS_A,
        lane_id: 'chain:s',
        queue_index: 0
      },
      { kind: 'parallel', marker_index: 0 },
      model
    );

    expect(plan).toEqual({
      ops: [
        { type: 'dep-remove', a: 'X', b: 'Y', root_dir: WS_A },
        { type: 'dep-remove', a: 'Y', b: 'X', root_dir: WS_A }
      ]
    });
  });

  test('omits a rejoin edge the graph already carries', () => {
    const model = chainSourceModel({
      blocked_by_map: new Map([
        ['X', ['P']],
        ['S', ['X', 'P']]
      ])
    });

    const plan = planDrop(
      {
        kind: 'chain',
        bead_id: 'X',
        root_dir: WS_A,
        lane_id: 'chain:s',
        queue_index: 1
      },
      { kind: 'parallel', marker_index: 0 },
      model
    );

    expect(plan).toEqual({
      ops: [
        { type: 'dep-remove', a: 'X', b: 'P', root_dir: WS_A },
        { type: 'dep-remove', a: 'S', b: 'X', root_dir: WS_A }
      ]
    });
  });

  test('returns no op when a chain row is dropped back on its own slot', () => {
    const model = chainSourceModel();

    const plan = planDrop(
      {
        kind: 'chain',
        bead_id: 'X',
        root_dir: WS_A,
        lane_id: 'chain:s',
        queue_index: 1
      },
      { kind: 'chain', lane_id: 'chain:s', marker_index: 1 },
      model
    );

    expect(plan).toEqual({ ops: [] });
  });

  test('treats the marker just below the dragged row as the same slot', () => {
    const model = chainSourceModel();

    const plan = planDrop(
      {
        kind: 'chain',
        bead_id: 'X',
        root_dir: WS_A,
        lane_id: 'chain:s',
        queue_index: 1
      },
      { kind: 'chain', lane_id: 'chain:s', marker_index: 2 },
      model
    );

    expect(plan).toEqual({ ops: [] });
  });

  test('rewires both ends when a chain row moves to another lane', () => {
    const model = dropModel({
      blocked_by_map: new Map([
        ['B', ['A']],
        ['C', ['B']],
        ['E', ['D']]
      ]),
      owner_of: new Map([
        ['A', WS_A],
        ['B', WS_A],
        ['C', WS_A],
        ['D', WS_B],
        ['E', WS_B]
      ]),
      lane_order: new Map([
        ['chain:1', ['A', 'B', 'C']],
        ['chain:2', ['D', 'E']]
      ]),
      parallel_raw_length: new Map([
        [WS_A, 3],
        [WS_B, 2]
      ])
    });

    const plan = planDrop(
      {
        kind: 'chain',
        bead_id: 'B',
        root_dir: WS_A,
        lane_id: 'chain:1',
        queue_index: 1
      },
      { kind: 'chain', lane_id: 'chain:2', marker_index: 1 },
      model
    );

    expect(plan).toEqual({
      ops: [
        { type: 'dep-remove', a: 'B', b: 'A', root_dir: WS_A },
        { type: 'dep-remove', a: 'C', b: 'B', root_dir: WS_A },
        { type: 'dep-add', a: 'C', b: 'A', root_dir: WS_A },
        { type: 'dep-add', a: 'B', b: 'D', root_dir: WS_A },
        { type: 'dep-remove', a: 'E', b: 'D', root_dir: WS_B },
        { type: 'dep-add', a: 'E', b: 'B', root_dir: WS_B }
      ]
    });
  });

  test('splices then places when a chain row goes to a serial lane', () => {
    const model = chainSourceModel();

    const plan = planDrop(
      {
        kind: 'chain',
        bead_id: 'X',
        root_dir: WS_A,
        lane_id: 'chain:s',
        queue_index: 1
      },
      { kind: 'repo-serial', root_dir: WS_A, lane_id: 's1', index: 0 },
      model
    );

    expect(plan).toEqual({
      ops: [
        { type: 'dep-remove', a: 'X', b: 'P', root_dir: WS_A },
        { type: 'dep-remove', a: 'S', b: 'X', root_dir: WS_A },
        { type: 'dep-add', a: 'S', b: 'P', root_dir: WS_A },
        {
          type: 'worker-queue-place',
          payload: { bead_id: 'X', lane: 's1', index: 0 },
          root_dir: WS_A
        }
      ]
    });
  });

  test('refuses a chain row dropped on another repo serial lane', () => {
    const model = chainSourceModel();

    const plan = planDrop(
      {
        kind: 'chain',
        bead_id: 'X',
        root_dir: WS_A,
        lane_id: 'chain:s',
        queue_index: 1
      },
      { kind: 'repo-serial', root_dir: WS_B, lane_id: 's1', index: 0 },
      model
    );

    expect(plan).toEqual({
      refused: '다른 레포 이슈는 이 직렬 레인에 넣을 수 없습니다'
    });
  });
});

describe('planDrop — 원천 repo-serial (UI-e6hw §5.2)', () => {
  test('removes a serial row dragged onto the candidate pane', () => {
    const model = parallelModel();

    const plan = planDrop(
      {
        kind: 'repo-serial',
        bead_id: 'A-5',
        root_dir: WS_A,
        lane_id: 's1',
        queue_index: 0
      },
      { kind: 'candidate' },
      model
    );

    expect(plan).toEqual({
      ops: [
        {
          type: 'worker-queue-remove',
          payload: { bead_id: 'A-5' },
          root_dir: WS_A
        }
      ]
    });
  });

  test('places a serial row into the parallel queue without a lane key', () => {
    const model = parallelModel();

    const plan = planDrop(
      {
        kind: 'repo-serial',
        bead_id: 'A-5',
        root_dir: WS_A,
        lane_id: 's1',
        queue_index: 0
      },
      { kind: 'parallel', marker_index: 3 },
      model
    );

    expect(plan).toEqual({
      ops: [
        {
          type: 'worker-queue-place',
          payload: { bead_id: 'A-5', index: 2 },
          root_dir: WS_A
        }
      ]
    });
  });

  test('refuses a serial row dropped on a chain lane', () => {
    const model = chainTargetModel();

    const plan = planDrop(
      {
        kind: 'repo-serial',
        bead_id: 'A-5',
        root_dir: WS_A,
        lane_id: 's1',
        queue_index: 0
      },
      { kind: 'chain', lane_id: 'chain:c', marker_index: 2 },
      model
    );

    expect(plan).toEqual({
      refused: 'Worker 탭 직렬 레인에서 먼저 빼 주세요'
    });
  });

  test('reorders inside the same serial lane', () => {
    const model = parallelModel();

    const plan = planDrop(
      {
        kind: 'repo-serial',
        bead_id: 'A-5',
        root_dir: WS_A,
        lane_id: 's1',
        queue_index: 0
      },
      { kind: 'repo-serial', root_dir: WS_A, lane_id: 's1', index: 2 },
      model
    );

    expect(plan).toEqual({
      ops: [
        {
          type: 'worker-queue-reorder',
          payload: { bead_id: 'A-5', lane: 's1', to_index: 1 },
          root_dir: WS_A
        }
      ]
    });
  });

  test('places into a different serial lane of the same repo', () => {
    const model = parallelModel();

    const plan = planDrop(
      {
        kind: 'repo-serial',
        bead_id: 'A-5',
        root_dir: WS_A,
        lane_id: 's1',
        queue_index: 0
      },
      { kind: 'repo-serial', root_dir: WS_A, lane_id: 's3', index: 1 },
      model
    );

    expect(plan).toEqual({
      ops: [
        {
          type: 'worker-queue-place',
          payload: { bead_id: 'A-5', lane: 's3', index: 1 },
          root_dir: WS_A
        }
      ]
    });
  });

  test('refuses a serial row dropped on another repo serial lane', () => {
    const model = parallelModel();

    const plan = planDrop(
      {
        kind: 'repo-serial',
        bead_id: 'A-5',
        root_dir: WS_A,
        lane_id: 's1',
        queue_index: 0
      },
      { kind: 'repo-serial', root_dir: WS_B, lane_id: 's1', index: 0 },
      model
    );

    expect(plan).toEqual({
      refused: '다른 레포 이슈는 이 직렬 레인에 넣을 수 없습니다'
    });
  });
});

describe('planDrop — 삽입 규칙과 거부 (UI-e6hw §5.2·§5.3)', () => {
  test('rewires the row below when the marker splits a direct edge', () => {
    const model = chainTargetModel();

    const plan = planDrop(
      { kind: 'candidate', bead_id: 'A-9', root_dir: WS_A },
      { kind: 'chain', lane_id: 'chain:c', marker_index: 1 },
      model
    );

    expect(plan).toEqual({
      ops: [
        { type: 'dep-add', a: 'A-9', b: 'C-1', root_dir: WS_A },
        { type: 'dep-remove', a: 'C-2', b: 'C-1', root_dir: WS_A },
        { type: 'dep-add', a: 'C-2', b: 'A-9', root_dir: WS_A },
        {
          type: 'worker-queue-place',
          payload: { bead_id: 'A-9', index: 2 },
          root_dir: WS_A
        }
      ]
    });
  });

  test('sends a top insertion dep op to the repo that owns the blockee', () => {
    const model = chainTargetModel();

    const plan = planDrop(
      { kind: 'candidate', bead_id: 'A-9', root_dir: WS_A },
      { kind: 'chain', lane_id: 'chain:c', marker_index: 0 },
      model
    );

    expect(plan).toEqual({
      ops: [
        { type: 'dep-add', a: 'C-1', b: 'A-9', root_dir: WS_B },
        {
          type: 'worker-queue-place',
          payload: { bead_id: 'A-9', index: 2 },
          root_dir: WS_A
        }
      ]
    });
  });

  test('refuses the whole plan when the blockee has no resolvable repo', () => {
    const model = chainTargetModel({
      owner_of: new Map([
        ['A-9', WS_A],
        ['C-2', WS_A]
      ])
    });

    const plan = planDrop(
      { kind: 'candidate', bead_id: 'A-9', root_dir: WS_A },
      { kind: 'chain', lane_id: 'chain:c', marker_index: 0 },
      model
    );

    expect(plan).toEqual({
      refused: 'C-1의 레포를 알 수 없어 의존을 바꿀 수 없습니다'
    });
  });

  test('refuses a drop that would close a dependency cycle', () => {
    const model = dropModel({
      blocked_by_map: new Map([['G-1', ['A-9']]]),
      owner_of: new Map([
        ['A-9', WS_A],
        ['G-1', WS_A]
      ]),
      lane_order: new Map([['chain:c', ['G-1']]]),
      parallel_raw_length: new Map([[WS_A, 1]])
    });

    const plan = planDrop(
      { kind: 'candidate', bead_id: 'A-9', root_dir: WS_A },
      { kind: 'chain', lane_id: 'chain:c', marker_index: 1 },
      model
    );

    expect(plan).toEqual({
      refused: '의존 사이클이 생깁니다 — A-9가 이미 G-1를 막고 있습니다'
    });
  });

  test('seeds an empty pending lane without any dep op', () => {
    const model = dropModel({
      owner_of: new Map([['A-9', WS_A]]),
      lane_order: new Map([['pending:0', []]]),
      parallel_raw_length: new Map([[WS_A, 4]])
    });

    const plan = planDrop(
      { kind: 'candidate', bead_id: 'A-9', root_dir: WS_A },
      { kind: 'chain', lane_id: 'pending:0', marker_index: 0 },
      model
    );

    expect(plan).toEqual({
      ops: [
        {
          type: 'worker-queue-place',
          payload: { bead_id: 'A-9', index: 4 },
          root_dir: WS_A
        }
      ]
    });
  });

  test('appends behind the seed of a pending lane whatever the marker says', () => {
    const model = dropModel({
      owner_of: new Map([
        ['A-9', WS_A],
        ['SEED', WS_B]
      ]),
      lane_order: new Map([['pending:0', ['SEED']]]),
      parallel_raw_length: new Map([[WS_A, 4]])
    });

    const plan = planDrop(
      { kind: 'parallel', bead_id: 'A-9', root_dir: WS_A, queue_index: 0 },
      { kind: 'chain', lane_id: 'pending:0', marker_index: 0 },
      model
    );

    expect(plan).toEqual({
      ops: [{ type: 'dep-add', a: 'A-9', b: 'SEED', root_dir: WS_A }]
    });
  });
});

describe('planDrop — 제자리 드롭과 분기 레인 (UI-e6hw 리뷰 1·2)', () => {
  test('returns no op when a parallel row is dropped on itself', () => {
    const model = parallelModel();

    const plan = planDrop(
      { kind: 'parallel', bead_id: 'A-2', root_dir: WS_A, queue_index: 1 },
      { kind: 'parallel', marker_index: 1 },
      model
    );

    expect(plan).toEqual({ ops: [] });
  });

  test('returns no op when a repo serial row is dropped on itself', () => {
    const model = dropModel({
      owner_of: new Map([['A-2', WS_A]]),
      queue_index_of: new Map([['A-2', 1]])
    });

    const plan = planDrop(
      {
        kind: 'repo-serial',
        bead_id: 'A-2',
        root_dir: WS_A,
        lane_id: 's1',
        queue_index: 1
      },
      { kind: 'repo-serial', root_dir: WS_A, lane_id: 's1', index: 1 },
      model
    );

    expect(plan).toEqual({ ops: [] });
  });

  test('takes up and down from the temp graph order, not the rendered order', () => {
    // 표시 순서가 그래프와 어긋나 있어도 (스냅샷과 렌더 사이의 낡은 행 배열)
    // 삽입 규칙은 임시 그래프의 위상 순서에서만 `up`/`down`을 잡는다 (§5.2).
    const model = dropModel({
      blocked_by_map: new Map([
        ['B', ['A']],
        ['C', ['B']]
      ]),
      owner_of: new Map([
        ['A', WS_A],
        ['B', WS_A],
        ['C', WS_A],
        ['A-9', WS_A]
      ]),
      lane_order: new Map([['chain:c', ['C', 'B', 'A']]]),
      parallel_raw_length: new Map([[WS_A, 0]])
    });

    const plan = planDrop(
      { kind: 'parallel', bead_id: 'A-9', root_dir: WS_A, queue_index: 0 },
      { kind: 'chain', lane_id: 'chain:c', marker_index: 3 },
      model
    );

    expect(plan).toEqual({
      ops: [{ type: 'dep-add', a: 'A-9', b: 'C', root_dir: WS_A }]
    });
  });
});

describe('planDrop — 실행중 타일은 원천도 대상도 아니다 (UI-yrzu §9)', () => {
  // 드래그 원천 열거는 `candidate|parallel|chain|repo-serial`뿐이고 실행중
  // 타일(Worker·세션)은 거기 없다. DOM 쪽 절반 — 세션 타일이 `data-drag-kind`
  // 홀더 밖에 있고 실행중 레인에 `data-drop` 구역이 없다 — 은
  // `index.test.js`의 「세션 타일」 describe가 고정한다.
  test('plans no queue op for a drag source outside the four lane kinds', () => {
    const plan = planDrop(
      /** @type {any} */ ({ kind: 'running', bead_id: 'A-9', root_dir: WS_A }),
      { kind: 'parallel', marker_index: 0 },
      parallelModel()
    );

    expect(plan).toEqual({ ops: [] });
  });
});
