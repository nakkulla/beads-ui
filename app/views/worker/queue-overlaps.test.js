import { describe, expect, test } from 'vitest';
import { deriveWorkerOverlaps, workerPlacementPlan } from './queue-overlaps.js';

/**
 * @param {Partial<import('./queue-overlaps.js').LaneMember>} over
 * @returns {import('./queue-overlaps.js').LaneMember}
 */
function member(over) {
  const id = over.id || 'A-1';
  return {
    id,
    title: id,
    location_label: '#1',
    kind: 'parallel',
    lane_id: null,
    ...over
  };
}

describe('deriveWorkerOverlaps', () => {
  test('derives pairwise chips in both directions with colliding prefixes', () => {
    const bead_scope = {
      'A-1': { scope: ['server/worker'], artifacts: ['a.md'] },
      'B-2': { scope: ['server/worker/queue-store.js'], artifacts: ['b.md'] }
    };

    const facts = deriveWorkerOverlaps(bead_scope, [
      member({ id: 'A-1' }),
      member({ id: 'B-2', location_label: '#2' })
    ]);

    expect(facts.get('A-1')?.overlaps).toEqual([
      {
        id: 'B-2',
        title: 'B-2',
        location_label: '#2',
        prefixes: ['server/worker/queue-store.js']
      }
    ]);
    expect(facts.get('B-2')?.overlaps).toEqual([
      {
        id: 'A-1',
        title: 'A-1',
        location_label: '#1',
        prefixes: ['server/worker/queue-store.js']
      }
    ]);
  });

  test('marks a declared-empty scope as scope_missing without comparing it', () => {
    const bead_scope = {
      'A-1': { scope: [], artifacts: ['a.md'] },
      'B-2': { scope: ['app'], artifacts: ['b.md'] }
    };

    const facts = deriveWorkerOverlaps(bead_scope, [
      member({ id: 'A-1' }),
      member({ id: 'B-2' })
    ]);

    expect(facts.get('A-1')).toEqual({ overlaps: [], scope_missing: true });
    expect(facts.get('B-2')?.overlaps).toEqual([]);
  });

  test('stays silent for absent entries, null entries, and old snapshots', () => {
    const facts_null = deriveWorkerOverlaps({ 'A-1': null }, [
      member({ id: 'A-1' }),
      member({ id: 'B-2' })
    ]);
    const facts_old = deriveWorkerOverlaps(undefined, [member({ id: 'A-1' })]);

    expect(facts_null.size).toBe(0);
    expect(facts_old.size).toBe(0);
  });

  test('keeps the first occurrence when the same bead appears twice', () => {
    const bead_scope = {
      'A-1': { scope: ['app'], artifacts: [] },
      'B-2': { scope: ['app/views'], artifacts: [] }
    };

    const facts = deriveWorkerOverlaps(bead_scope, [
      member({ id: 'A-1', kind: 'running', location_label: '실행중' }),
      member({ id: 'A-1', kind: 'parallel' }),
      member({ id: 'B-2' })
    ]);

    expect(facts.get('B-2')?.overlaps[0].location_label).toBe('실행중');
  });
});

describe('workerPlacementPlan', () => {
  /**
   * @param {import('./queue-overlaps.js').LaneMember[]} members
   * @param {Partial<{ serial_raw_lengths: Record<string, number>, serial_lane_count: number, occupied_lanes: Set<string> }>} over
   */
  function factsOf(members, over = {}) {
    return {
      members_by_id: new Map(members.map((m) => [m.id, m])),
      serial_raw_lengths: {},
      serial_lane_count: 2,
      occupied_lanes: new Set(),
      ...over
    };
  }

  test('refuses to plan for a candidate that is not queue_placeable (UI-d13v §6)', () => {
    const plan = workerPlacementPlan(
      'A-1',
      'B-2',
      factsOf([
        member({ id: 'A-1', kind: 'candidate', queue_placeable: false }),
        member({ id: 'B-2', kind: 'serial', lane_id: 's1' })
      ])
    );

    expect(plan).toEqual({
      kind: 'disabled',
      title:
        'A-1는 대기 큐에 넣을 수 없습니다 (spec 없음 또는 worker-ineligible)'
    });
  });

  test('makes no two-op plan when the counterpart candidate is not queue_placeable', () => {
    const plan = workerPlacementPlan(
      'A-1',
      'B-2',
      factsOf([
        member({ id: 'A-1', kind: 'candidate', queue_placeable: true }),
        member({ id: 'B-2', kind: 'candidate' })
      ])
    );

    expect(plan.kind).toBe('disabled');
  });

  test('plans for a queue_placeable candidate', () => {
    const plan = workerPlacementPlan(
      'A-1',
      'B-2',
      factsOf([
        member({ id: 'A-1', kind: 'candidate', queue_placeable: true }),
        member({ id: 'B-2', kind: 'serial', lane_id: 's1' })
      ])
    );

    expect(plan.kind).toBe('ops');
  });

  test('appends me to the counterpart serial lane end with one op', () => {
    const plan = workerPlacementPlan(
      'A-1',
      'B-2',
      factsOf(
        [
          member({ id: 'A-1' }),
          member({ id: 'B-2', kind: 'serial', lane_id: 's1' })
        ],
        { serial_raw_lengths: { s1: 3 } }
      )
    );

    expect(plan).toEqual({
      kind: 'ops',
      title: 's1 끝에 A-1를 넣습니다',
      ops: [{ bead_id: 'A-1', lane: 's1', index: 3 }]
    });
  });

  test('fills the first empty serial lane counterpart-first with two ops', () => {
    const plan = workerPlacementPlan(
      'A-1',
      'B-2',
      factsOf([member({ id: 'A-1' }), member({ id: 'B-2' })], {
        serial_raw_lengths: { s1: 1 },
        occupied_lanes: new Set()
      })
    );

    expect(plan).toEqual({
      kind: 'ops',
      title: 's2 레인에 B-2 → A-1 순서로 넣습니다',
      ops: [
        { bead_id: 'B-2', lane: 's2', index: 0 },
        { bead_id: 'A-1', lane: 's2', index: 1 }
      ]
    });
  });

  test('disables the button when no serial lane is empty', () => {
    const plan = workerPlacementPlan(
      'A-1',
      'B-2',
      factsOf([member({ id: 'A-1' }), member({ id: 'B-2' })], {
        serial_raw_lengths: { s1: 1 },
        serial_lane_count: 1
      })
    );

    expect(plan.kind).toBe('disabled');
  });

  test('treats an occupied empty lane as unavailable', () => {
    const plan = workerPlacementPlan(
      'A-1',
      'B-2',
      factsOf([member({ id: 'A-1' }), member({ id: 'B-2' })], {
        serial_lane_count: 1,
        occupied_lanes: new Set(['s1'])
      })
    );

    expect(plan.kind).toBe('disabled');
  });

  test('answers a note for two beads that already departed', () => {
    const plan = workerPlacementPlan(
      'A-1',
      'B-2',
      factsOf([
        member({ id: 'A-1', kind: 'running' }),
        member({ id: 'B-2', kind: 'running' })
      ])
    );

    expect(plan).toEqual({
      kind: 'note',
      text: '둘 다 이미 출발 — 순서를 만들 수 없습니다'
    });
  });

  test('refuses to move a PR 대기 counterpart', () => {
    const plan = workerPlacementPlan(
      'A-1',
      'B-2',
      factsOf([
        member({ id: 'A-1' }),
        member({ id: 'B-2', kind: 'pr_wait', location_label: 'PR 대기' })
      ])
    );

    expect(plan).toEqual({
      kind: 'note',
      text: 'PR 대기 — 종료 후 출발하려면 직렬 레인에 두세요'
    });
  });

  test('names its own lane when the PR 대기 bead owns the chip', () => {
    const plan = workerPlacementPlan(
      'A-1',
      'B-2',
      factsOf([
        member({ id: 'A-1', kind: 'pr_wait', location_label: 'PR 대기' }),
        member({ id: 'B-2' })
      ])
    );

    expect(plan).toEqual({
      kind: 'note',
      text: 'PR 대기 — 순서를 만들려면 상대를 직렬 레인에 두세요'
    });
  });

  test('answers a note when both already share one serial lane', () => {
    const plan = workerPlacementPlan(
      'A-1',
      'B-2',
      factsOf([
        member({ id: 'A-1', kind: 'serial', lane_id: 's1' }),
        member({ id: 'B-2', kind: 'serial', lane_id: 's1' })
      ])
    );

    expect(plan).toEqual({
      kind: 'note',
      text: '이미 같은 직렬 레인 — 순서가 있습니다'
    });
  });

  test('sends a waiting bead behind a running occupant of a serial lane', () => {
    const plan = workerPlacementPlan(
      'A-1',
      'B-2',
      factsOf(
        [
          member({ id: 'A-1' }),
          member({ id: 'B-2', kind: 'running', lane_id: 's2' })
        ],
        { serial_raw_lengths: { s2: 0 } }
      )
    );

    expect(plan).toEqual({
      kind: 'ops',
      title: 's2 끝에 A-1를 넣습니다',
      ops: [{ bead_id: 'A-1', lane: 's2', index: 0 }]
    });
  });
});
