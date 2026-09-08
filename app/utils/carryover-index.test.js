import { describe, expect, test } from 'vitest';
import { buildCarryoverIndex } from './carryover-index.js';

/**
 * A carryover successor row: `carried_from` plus a raw `blocks` edge to the
 * parent it was carried out of.
 *
 * @param {string} id
 * @param {string} parent_id
 * @param {Record<string, any>} [patch]
 * @returns {Record<string, any>}
 */
function successor(id, parent_id, patch = {}) {
  return {
    id,
    metadata: { carried_from: `${parent_id}.1` },
    dependencies: [{ depends_on_id: parent_id, type: 'blocks' }],
    ...patch
  };
}

describe('buildCarryoverIndex (UI-ys18 §3.1)', () => {
  test('indexes a successor under the parent its blocks edge names', () => {
    const issues = [successor('UI-s1', 'UI-p1')];

    const index = buildCarryoverIndex(issues);

    expect(index.get('UI-p1')).toEqual(['UI-s1']);
  });

  test('indexes a successor whose carried_from names a phase child', () => {
    const issues = [
      {
        id: 'UI-s1',
        metadata: { carried_from: 'UI-p1.3' },
        dependencies: [{ depends_on_id: 'UI-p1', type: 'blocks' }]
      }
    ];

    const index = buildCarryoverIndex(issues);

    expect(index.get('UI-p1')).toEqual(['UI-s1']);
  });

  test('reads the raw blocks edge when blocked_info lists no blocker', () => {
    const issues = [
      successor('UI-s1', 'UI-p1', { blocked_info: { blockers: [] } })
    ];

    const index = buildCarryoverIndex(issues);

    expect(index.get('UI-p1')).toEqual(['UI-s1']);
  });

  test('sorts and dedupes the successors of one parent', () => {
    const issues = [
      successor('UI-s2', 'UI-p1'),
      {
        ...successor('UI-s1', 'UI-p1'),
        dependencies: [
          { depends_on_id: 'UI-p1', type: 'blocks' },
          { depends_on_id: 'UI-p1', type: 'blocks' }
        ]
      }
    ];

    const index = buildCarryoverIndex(issues);

    expect(index.get('UI-p1')).toEqual(['UI-s1', 'UI-s2']);
  });

  test('omits a successor without carried_from metadata', () => {
    const issues = [
      {
        id: 'UI-s1',
        metadata: {},
        dependencies: [{ depends_on_id: 'UI-p1', type: 'blocks' }]
      }
    ];

    const index = buildCarryoverIndex(issues);

    expect(index.has('UI-p1')).toBe(false);
  });

  test('omits a successor with no blocks edge', () => {
    const issues = [
      {
        id: 'UI-s1',
        metadata: { carried_from: 'UI-p1.1' },
        dependencies: [{ depends_on_id: 'UI-p1', type: 'related' }]
      }
    ];

    const index = buildCarryoverIndex(issues);

    expect(index.size).toBe(0);
  });

  test('returns an empty index for a non-array input', () => {
    const index = buildCarryoverIndex(/** @type {any} */ (null));

    expect(index.size).toBe(0);
  });
});
