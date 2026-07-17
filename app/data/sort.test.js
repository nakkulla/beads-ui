import { describe, expect, test } from 'vitest';
import {
  RANK_STEP,
  cmpEffectiveRank,
  computeDropRank,
  effectiveRank
} from './sort.js';

describe('effectiveRank', () => {
  test('uses order rank when present', () => {
    expect(effectiveRank({ id: 'A', created_at: 100 }, { A: 42 })).toBe(42);
  });

  test('falls back to -created_at_ms (newest-first) when unranked', () => {
    expect(effectiveRank({ id: 'A', created_at: 100 }, {})).toBe(-100);
    expect(effectiveRank({ id: 'A', created_at: 100 }, undefined)).toBe(-100);
  });

  test('parses ISO created_at strings for the fallback', () => {
    const iso = '2026-07-17T00:00:00.000Z';
    expect(effectiveRank({ id: 'A', created_at: iso }, {})).toBe(
      -Date.parse(iso)
    );
  });
});

describe('cmpEffectiveRank', () => {
  test('ranked and unranked mix: unranked fall back to newest-first', () => {
    const order = { B: 10, D: 5 };
    const items = [
      { id: 'A', created_at: 100 }, // unranked → -100
      { id: 'B', created_at: 200 }, // ranked 10
      { id: 'C', created_at: 300 }, // unranked → -300 (newest)
      { id: 'D', created_at: 50 } // ranked 5
    ];
    const sorted = items.slice().sort(cmpEffectiveRank(order));
    // effRanks ascending: C(-300), A(-100), D(5), B(10)
    expect(sorted.map((x) => x.id)).toEqual(['C', 'A', 'D', 'B']);
  });

  test('id ascending breaks ties on equal effective rank', () => {
    const order = { A: 5, B: 5, C: 5 };
    const items = [
      { id: 'C', created_at: 1 },
      { id: 'A', created_at: 2 },
      { id: 'B', created_at: 3 }
    ];
    const sorted = items.slice().sort(cmpEffectiveRank(order));
    expect(sorted.map((x) => x.id)).toEqual(['A', 'B', 'C']);
  });
});

describe('computeDropRank', () => {
  test('midpoint between neighbours when representable', () => {
    const order = { A: 0, B: 100 };
    // final list has the dropped bead X already spliced at index 1
    const final_list = [
      { id: 'A', created_at: 0 },
      { id: 'X', created_at: 0 },
      { id: 'B', created_at: 0 }
    ];
    const res = computeDropRank(final_list, 1, order);
    expect(res).toEqual({ rank: 50 });
  });

  test('top drop = first neighbour - STEP', () => {
    const order = { A: 0, B: 100 };
    const final_list = [
      { id: 'X', created_at: 0 },
      { id: 'A', created_at: 0 },
      { id: 'B', created_at: 0 }
    ];
    const res = computeDropRank(final_list, 0, order);
    expect(res).toEqual({ rank: 0 - RANK_STEP });
  });

  test('bottom drop = last neighbour + STEP', () => {
    const order = { A: 0, B: 100 };
    const final_list = [
      { id: 'A', created_at: 0 },
      { id: 'B', created_at: 0 },
      { id: 'X', created_at: 0 }
    ];
    const res = computeDropRank(final_list, 2, order);
    expect(res).toEqual({ rank: 100 + RANK_STEP });
  });

  test('drop into an otherwise empty column = rank 0', () => {
    const res = computeDropRank([{ id: 'X', created_at: 0 }], 0, {});
    expect(res).toEqual({ rank: 0 });
  });

  test('repeated insertion at the same slot renormalizes when the midpoint is not representable', () => {
    // Two anchors with epoch-scale (unranked) effective ranks. Repeatedly drop a
    // fresh bead between L (index 0) and the current second element; each drop
    // halves the gap above L until the midpoint collapses onto a neighbour.
    const L = { id: 'L', created_at: 1_750_000_000_000 }; // effRank -1.75e12
    const R = { id: 'R', created_at: 1_740_000_000_000 }; // effRank -1.74e12
    /** @type {Record<string, number>} */
    let order = {};
    let list = [L, R];
    /** @type {any} */
    let result = null;
    /** @type {any[]} */
    let renorm_final_list = [];
    for (let i = 0; i < 400; i++) {
      const dropped = { id: `X${i}`, created_at: 0 };
      const final_list = [list[0], dropped, ...list.slice(1)];
      result = computeDropRank(final_list, 1, order);
      if ('renormalize' in result) {
        renorm_final_list = final_list;
        break;
      }
      order = { ...order, [dropped.id]: result.rank };
      list = final_list;
    }

    expect(result && 'renormalize' in result).toBe(true);
    const entries = result.renormalize;
    // Entries cover the WHOLE visible list...
    expect(entries.length).toBe(renorm_final_list.length);
    // ...each re-ranked to index * STEP in the final visible order...
    for (let i = 0; i < entries.length; i++) {
      expect(entries[i]).toEqual({
        bead_id: renorm_final_list[i].id,
        rank: i * RANK_STEP
      });
    }
    // ...and the dropped bead sits at its target slot (index 1).
    expect(entries[1].bead_id).toBe(renorm_final_list[1].id);
    expect(renorm_final_list[1].id.startsWith('X')).toBe(true);
  });
});
