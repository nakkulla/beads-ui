import { describe, expect, test } from 'vitest';
import { deriveWorkerOverlaps, workerPlacementPlan } from './queue-overlaps.js';

/**
 * @param {Partial<import('./queue-overlaps.js').OverlapMember>} over
 * @returns {import('./queue-overlaps.js').OverlapMember}
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
   * @param {import('./queue-overlaps.js').OverlapMember[]} members
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

  test('answers a note for two running beads', () => {
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
      text: '둘 다 실행 중 — 순서를 만들 수 없습니다'
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
