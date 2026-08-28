import { describe, expect, test } from 'vitest';
import { deriveWorkerOverlaps } from './queue-overlaps.js';

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
