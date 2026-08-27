import { describe, expect, test } from 'vitest';
import {
  RANK_STEP,
  SORT_KEY_DEFAULT_DIR,
  cmpChain,
  cmpChildOrder,
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

describe('cmpChildOrder', () => {
  test('orders by metadata.task_order numerically (not lexicographically)', () => {
    const items = [
      { id: 'C', metadata: { task_order: '10' } },
      { id: 'A', metadata: { task_order: '2' } },
      { id: 'B', metadata: { task_order: '1' } }
    ];
    const sorted = items.slice().sort(cmpChildOrder);
    // Numeric: 1, 2, 10 (a string sort would put '10' before '2').
    expect(sorted.map((x) => x.id)).toEqual(['B', 'A', 'C']);
  });

  test('parses the title task number across the real title shapes', () => {
    const items = [
      { id: 'a', title: 'UI-l3c3 Task 10: z' }, // 10
      { id: 'b', title: 'Task 3: x' }, // 3
      { id: 'c', title: 'Phase 2: y' }, // 2
      { id: 'd', title: 'UI-gr7m T3: w' } // 3
    ];
    const sorted = items.slice().sort(cmpChildOrder);
    // Numbers 2, 3, 3, 10 → c, then the 3-tie (b<d by id), then a.
    expect(sorted.map((x) => x.id)).toEqual(['c', 'b', 'd', 'a']);
  });

  test('created_at ascending breaks ties when task_order/title-number absent', () => {
    const items = [
      { id: 'x', created_at: 300 },
      { id: 'y', created_at: 100 },
      { id: 'z', created_at: 200 }
    ];
    const sorted = items.slice().sort(cmpChildOrder);
    expect(sorted.map((x) => x.id)).toEqual(['y', 'z', 'x']);
  });

  test('task_order (present) sorts before an item missing it (mixed keys)', () => {
    const items = [
      { id: 'noorder', title: 'Task 1: a' }, // no task_order, title 1
      { id: 'ordered', metadata: { task_order: '5' }, title: 'Task 9: b' }
    ];
    const sorted = items.slice().sort(cmpChildOrder);
    // task_order is the primary key: 5 (finite) beats missing (Infinity).
    expect(sorted.map((x) => x.id)).toEqual(['ordered', 'noorder']);
  });

  test('a parseable title number sorts before an unparseable title (falls through)', () => {
    const items = [
      { id: 'plain', title: 'no marker here', created_at: 10 },
      { id: 'phase', title: 'Phase 4: q', created_at: 20 }
    ];
    const sorted = items.slice().sort(cmpChildOrder);
    // Neither has task_order; 'phase' has title-number 4, 'plain' has none.
    expect(sorted.map((x) => x.id)).toEqual(['phase', 'plain']);
  });

  test('an id-prefixed token is not mistaken for the task keyword', () => {
    // "UI-t5c2" has a "t5" inside the id; the number must come from "Task 3".
    const items = [
      { id: 'later', title: 'UI-t5c2 Task 3: keep number 3' },
      { id: 'first', title: 'UI-a9b1 Task 1: one' }
    ];
    const sorted = items.slice().sort(cmpChildOrder);
    expect(sorted.map((x) => x.id)).toEqual(['first', 'later']);
  });
});

describe('UX v3 sort comparators', () => {
  const items = () => [
    { id: 'A', priority: 2, created_at: 30_000, updated_at: 10_000 },
    { id: 'B', priority: 0, created_at: 20_000, updated_at: 40_000 },
    { id: 'C', priority: 1, created_at: 10_000, updated_at: 20_000 }
  ];

  test('cmpCreatedAscThenPriority orders oldest-created first', async () => {
    const { cmpCreatedAscThenPriority } = await import('./sort.js');
    const sorted = items().sort(cmpCreatedAscThenPriority);
    expect(sorted.map((x) => x.id)).toEqual(['C', 'B', 'A']);
  });

  test('cmpCreatedAscThenPriority ties on created_at fall to priority then id', async () => {
    const { cmpCreatedAscThenPriority } = await import('./sort.js');
    const sorted = [
      { id: 'Y', priority: 2, created_at: 5 },
      { id: 'X', priority: 2, created_at: 5 },
      { id: 'Z', priority: 0, created_at: 5 }
    ].sort(cmpCreatedAscThenPriority);
    expect(sorted.map((x) => x.id)).toEqual(['Z', 'X', 'Y']);
  });

  test('cmpUpdatedDesc orders most recently updated first', async () => {
    const { cmpUpdatedDesc } = await import('./sort.js');
    const sorted = items().sort(cmpUpdatedDesc);
    expect(sorted.map((x) => x.id)).toEqual(['B', 'C', 'A']);
  });

  test('cmpUpdatedDesc ties on updated_at fall to id asc', async () => {
    const { cmpUpdatedDesc } = await import('./sort.js');
    const sorted = [
      { id: 'N', updated_at: 7 },
      { id: 'M', updated_at: 7 }
    ].sort(cmpUpdatedDesc);
    expect(sorted.map((x) => x.id)).toEqual(['M', 'N']);
  });

  test('cmpPriorityThenCreatedDesc puts P0 first, newest first within a priority', async () => {
    const { cmpPriorityThenCreatedDesc } = await import('./sort.js');
    const sorted = [
      { id: 'A', priority: 1, created_at: 10 },
      { id: 'B', priority: 0, created_at: 5 },
      { id: 'C', priority: 1, created_at: 20 }
    ].sort(cmpPriorityThenCreatedDesc);
    expect(sorted.map((x) => x.id)).toEqual(['B', 'C', 'A']);
  });

  test('cmpPriorityThenCreatedDesc treats a missing priority as P2', async () => {
    const { cmpPriorityThenCreatedDesc } = await import('./sort.js');
    const sorted = [
      { id: 'none', created_at: 50 },
      { id: 'p3', priority: 3, created_at: 90 },
      { id: 'p1', priority: 1, created_at: 10 }
    ].sort(cmpPriorityThenCreatedDesc);
    expect(sorted.map((x) => x.id)).toEqual(['p1', 'none', 'p3']);
  });
});

describe('cmpChain (UI-d13v §4.1)', () => {
  const RECEIPT = 'codex@' + 'a'.repeat(40);

  /**
   * @param {string} id
   * @param {Record<string, any>} over
   */
  function row(id, over = {}) {
    return { id, ...over };
  }

  test('orders by priority ascending on a priority asc step', () => {
    const items = [row('B', { priority: 2 }), row('A', { priority: 0 })];

    const sorted = items
      .slice()
      .sort(cmpChain([{ key: 'priority', dir: 'asc' }]));

    expect(sorted.map((x) => x.id)).toEqual(['A', 'B']);
  });

  test('flips the same key when the step direction is desc', () => {
    const items = [row('A', { priority: 0 }), row('B', { priority: 2 })];

    const sorted = items
      .slice()
      .sort(cmpChain([{ key: 'priority', dir: 'desc' }]));

    expect(sorted.map((x) => x.id)).toEqual(['B', 'A']);
  });

  test('orders by dependents count descending', () => {
    const items = [
      row('few', { dependents_info: { count: 1 } }),
      row('many', { dependents_info: { count: 4 } })
    ];

    const sorted = items
      .slice()
      .sort(cmpChain([{ key: 'dependents', dir: 'desc' }]));

    expect(sorted.map((x) => x.id)).toEqual(['many', 'few']);
  });

  test('keeps a row without dependents_info last on a dependents asc step', () => {
    const items = [
      row('unknown', {}),
      row('two', { dependents_info: { count: 2 } }),
      row('one', { dependents_info: { count: 1 } })
    ];

    const sorted = items
      .slice()
      .sort(cmpChain([{ key: 'dependents', dir: 'asc' }]));

    expect(sorted.map((x) => x.id)).toEqual(['one', 'two', 'unknown']);
  });

  test('keeps a row without release_info last on a released desc step', () => {
    const items = [
      row('unknown', {}),
      row('released', { release_info: { last_released_at: 5 } })
    ];

    const sorted = items
      .slice()
      .sort(cmpChain([{ key: 'released', dir: 'desc' }]));

    expect(sorted.map((x) => x.id)).toEqual(['released', 'unknown']);
  });

  test('keeps a row without priority last on a priority desc step', () => {
    const items = [row('none', {}), row('p3', { priority: 3 })];

    const sorted = items
      .slice()
      .sort(cmpChain([{ key: 'priority', dir: 'desc' }]));

    expect(sorted.map((x) => x.id)).toEqual(['p3', 'none']);
  });

  test('puts a published spec first on a spec desc step', () => {
    const items = [
      row('draft', { metadata: { spec_id: 'docs/a.md' } }),
      row('published', {
        metadata: { spec_id: 'docs/b.md', spec_review: RECEIPT }
      })
    ];

    const sorted = items.slice().sort(cmpChain([{ key: 'spec', dir: 'desc' }]));

    expect(sorted.map((x) => x.id)).toEqual(['published', 'draft']);
  });

  test('falls through to the next step when the first ties', () => {
    const items = [
      row('late', { priority: 1, updated_at: 10 }),
      row('recent', { priority: 1, updated_at: 90 })
    ];

    const sorted = items.slice().sort(
      cmpChain([
        { key: 'priority', dir: 'asc' },
        { key: 'updated', dir: 'desc' }
      ])
    );

    expect(sorted.map((x) => x.id)).toEqual(['recent', 'late']);
  });

  test('breaks a chain-wide tie by created ascending', () => {
    const items = [
      row('new', { priority: 1, created_at: 300 }),
      row('old', { priority: 1, created_at: 100 })
    ];

    const sorted = items
      .slice()
      .sort(cmpChain([{ key: 'priority', dir: 'asc' }]));

    expect(sorted.map((x) => x.id)).toEqual(['old', 'new']);
  });

  test('breaks an identical-created tie by id ascending', () => {
    const items = [
      row('B', { created_at: 100 }),
      row('A', { created_at: 100 })
    ];

    const sorted = items
      .slice()
      .sort(cmpChain([{ key: 'updated', dir: 'desc' }]));

    expect(sorted.map((x) => x.id)).toEqual(['A', 'B']);
  });

  test('ignores an unknown step instead of throwing', () => {
    const items = [
      row('B', { created_at: 200 }),
      row('A', { created_at: 100 })
    ];

    const sorted = items
      .slice()
      .sort(cmpChain(/** @type {any} */ ([{ key: 'nonsense', dir: 'asc' }])));

    expect(sorted.map((x) => x.id)).toEqual(['A', 'B']);
  });

  test('names a default direction for every key', () => {
    expect(SORT_KEY_DEFAULT_DIR).toEqual({
      priority: 'asc',
      dependents: 'desc',
      released: 'desc',
      spec: 'desc',
      created: 'asc',
      updated: 'desc'
    });
  });
});
