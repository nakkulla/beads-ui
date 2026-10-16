/** @vitest-environment node */
import { describe, expect, test } from 'vitest';
import { placementPairKey } from '../../../server/placement/wire.js';
import { computePlacement, samePlace } from './compute.js';

/**
 * A wire relation built from the candidate's side: `kind` is how `c` relates
 * to `x` (`c_first`, `x_first`, `conflict`, `independent`, `unknown`).
 *
 * @param {string} c
 * @param {string} x
 * @param {'c_first'|'x_first'|'conflict'|'independent'|'unknown'} kind
 * @param {Record<string, any>} [extra]
 * @returns {[string, any]}
 */
function rel(c, x, kind, extra = {}) {
  const [a, b] = c < x ? [c, x] : [x, c];
  /** @param {string|null} k */
  const toWire = (k) =>
    k === 'c_first'
      ? c === a
        ? 'a_first'
        : 'b_first'
      : k === 'x_first'
        ? c === a
          ? 'b_first'
          : 'a_first'
        : k;
  const source = extra.source || 'jev';
  return [
    placementPairKey(a, b),
    {
      a,
      b,
      relation: toWire(kind),
      source,
      ...(extra.basis ? { basis: extra.basis } : {}),
      ...(extra.in_lane ? { in_lane: true } : {}),
      confidence: source === 'jev' ? (extra.confidence ?? 0.9) : null,
      jev_choice:
        source === 'jev'
          ? toWire(extra.jev_choice ?? (kind === 'unknown' ? null : kind))
          : null,
      judged_at: source === 'jev' ? (extra.judged_at ?? 1000) : null
    }
  ];
}

/**
 * @param {Partial<any>} [over]
 * @returns {any}
 */
function queueOf(over = {}) {
  return {
    revision: 7,
    queue: [],
    serial_lane_count: 2,
    serial_lanes: [
      { id: 's1', entries: [] },
      { id: 's2', entries: [] }
    ],
    lane_states: {},
    pr_wait: [],
    done: [],
    attempts: {},
    ...over
  };
}

/**
 * @param {string[]} ids
 * @returns {Array<{ bead_id: string, added_at: number }>}
 */
function entries(ids) {
  return ids.map((bead_id, index) => ({ bead_id, added_at: index + 1 }));
}

/**
 * @param {Partial<import('./compute.js').PlacementInput> & { pairs?: Array<[string, any]> }} input
 */
function plan(input) {
  return computePlacement({
    queue: input.queue || queueOf(),
    relations: Object.fromEntries(input.pairs || []),
    display_order: input.display_order || ['C-1', 'C-2', 'C-3'],
    chosen: input.chosen || ['C-1'],
    candidates: input.candidates || input.chosen || ['C-1']
  });
}

describe('computePlacement bundles', () => {
  test('joins candidates linked by a constraint into one bundle', () => {
    const result = plan({
      chosen: ['C-1', 'C-2', 'C-3'],
      pairs: [
        rel('C-1', 'C-2', 'conflict'),
        rel('C-1', 'C-3', 'independent'),
        rel('C-2', 'C-3', 'independent')
      ]
    });

    expect(result.order.map((item) => [item.id, item.bundle])).toEqual([
      ['C-1', 0],
      ['C-2', 0],
      ['C-3', 1]
    ]);
  });

  test('orders a bundle by c_first and x_first before display order', () => {
    const result = plan({
      chosen: ['C-1', 'C-2'],
      pairs: [rel('C-2', 'C-1', 'c_first')]
    });

    expect(result.order.map((item) => item.id)).toEqual(['C-2', 'C-1']);
  });

  test('keeps display order and warns order_cycle on a cycle in a bundle', () => {
    const result = plan({
      chosen: ['C-1', 'C-2', 'C-3'],
      pairs: [
        rel('C-1', 'C-2', 'c_first'),
        rel('C-2', 'C-3', 'c_first'),
        rel('C-3', 'C-1', 'c_first')
      ]
    });

    expect(result.order.map((item) => item.id)).toEqual(['C-1', 'C-2', 'C-3']);
    expect(
      result.order.map((item) => item.warnings.map((warning) => warning.code))
    ).toEqual([['order_cycle'], ['order_cycle'], ['order_cycle']]);
  });

  test('puts two conflicting candidates of an empty queue in one serial lane in apply order', () => {
    const result = plan({
      chosen: ['C-1', 'C-2'],
      pairs: [rel('C-1', 'C-2', 'conflict')]
    });

    expect(
      result.order.map((item) => [item.id, item.lane, item.index, item.before])
    ).toEqual([
      ['C-1', 's1', 0, null],
      ['C-2', 's1', 1, 'C-1']
    ]);
  });

  test('puts a lone candidate without constraints at the parallel tail', () => {
    const queue = queueOf({ queue: entries(['P-1']) });

    const result = plan({ queue, pairs: [rel('C-1', 'P-1', 'independent')] });

    expect(result.by_id['C-1']).toMatchObject({
      lane: 'parallel',
      index: 1,
      before: 'P-1'
    });
  });

  test('appends a bundle with an empty K at the lane tail in bundle order', () => {
    const result = plan({
      chosen: ['C-1', 'C-2', 'C-3'],
      pairs: [
        rel('C-1', 'C-2', 'conflict'),
        rel('C-1', 'C-3', 'conflict'),
        rel('C-2', 'C-3', 'independent')
      ]
    });

    expect(result.layout.s1).toEqual(['C-1', 'C-2', 'C-3']);
    expect(result.order.map((item) => [item.id, item.before])).toEqual([
      ['C-1', null],
      ['C-2', 'C-1'],
      ['C-3', 'C-2']
    ]);
  });

  test('gives the remaining candidates the same places once the first is in', () => {
    const pairs = [
      rel('C-1', 'C-2', 'conflict'),
      rel('C-1', 'C-3', 'conflict'),
      rel('C-2', 'C-3', 'independent')
    ];
    const after_first = queueOf({
      serial_lanes: [
        { id: 's1', entries: entries(['C-1']) },
        { id: 's2', entries: [] }
      ]
    });

    const result = plan({
      queue: after_first,
      chosen: ['C-2', 'C-3'],
      pairs
    });

    expect(
      result.order.map((item) => [item.id, item.lane, item.before])
    ).toEqual([
      ['C-2', 's1', 'C-1'],
      ['C-3', 's1', 'C-2']
    ]);
  });

  test('recounts the serial lanes before placing the next bundle', () => {
    const result = plan({
      chosen: ['C-1', 'C-2', 'C-3', 'C-4'],
      display_order: ['C-1', 'C-2', 'C-3', 'C-4'],
      pairs: [rel('C-1', 'C-2', 'conflict'), rel('C-3', 'C-4', 'conflict')]
    });

    expect(result.order.map((item) => [item.id, item.lane])).toEqual([
      ['C-1', 's1'],
      ['C-2', 's1'],
      ['C-3', 's2'],
      ['C-4', 's2']
    ]);
  });
});

describe('computePlacement lane rules', () => {
  test('places the candidate at the lane tail after its x_first item when K stands in one serial lane', () => {
    const queue = queueOf({
      serial_lanes: [
        { id: 's1', entries: [] },
        { id: 's2', entries: entries(['S-1', 'S-2']) }
      ]
    });

    const result = plan({ queue, pairs: [rel('C-1', 'S-1', 'x_first')] });

    expect(result.by_id['C-1']).toMatchObject({
      lane: 's2',
      index: 2,
      final_index: 2,
      before: 'S-2'
    });
  });

  test('places the candidate before its c_first item in that lane', () => {
    const queue = queueOf({
      serial_lanes: [
        { id: 's1', entries: entries(['S-1', 'S-2']) },
        { id: 's2', entries: [] }
      ]
    });

    const result = plan({ queue, pairs: [rel('C-1', 'S-2', 'c_first')] });

    expect(result.by_id['C-1']).toMatchObject({
      lane: 's1',
      index: 1,
      before: 'S-1'
    });
  });

  test('picks the serial lane covering most of a scattered K and warns uncovered for the rest', () => {
    const queue = queueOf({
      serial_lanes: [
        { id: 's1', entries: entries(['S-1']) },
        { id: 's2', entries: entries(['T-1', 'T-2']) }
      ]
    });

    const result = plan({
      queue,
      pairs: [
        rel('C-1', 'S-1', 'conflict'),
        rel('C-1', 'T-1', 'conflict'),
        rel('C-1', 'T-2', 'conflict')
      ]
    });

    expect(result.by_id['C-1'].lane).toBe('s2');
    expect(result.by_id['C-1'].warnings).toEqual([
      { code: 'uncovered', other: 'S-1', other_lane: 's1' }
    ]);
  });

  test('keeps a lone candidate whose K is parallel-only in the parallel lane with uncovered', () => {
    const queue = queueOf({ queue: entries(['P-1']) });

    const result = plan({ queue, pairs: [rel('C-1', 'P-1', 'conflict')] });

    expect(result.by_id['C-1'].lane).toBe('parallel');
    expect(result.by_id['C-1'].warnings).toEqual([
      { code: 'uncovered', other: 'P-1', other_lane: 'parallel' }
    ]);
  });

  test('puts the candidate at the tail with order_unsatisfiable when its in-lane bounds cross', () => {
    const queue = queueOf({
      serial_lanes: [
        { id: 's1', entries: entries(['S-1', 'S-2']) },
        { id: 's2', entries: [] }
      ]
    });

    const result = plan({
      queue,
      pairs: [rel('C-1', 'S-1', 'c_first'), rel('C-1', 'S-2', 'x_first')]
    });

    expect(result.by_id['C-1']).toMatchObject({ lane: 's1', index: 2 });
    expect(result.by_id['C-1'].warnings).toEqual([
      { code: 'order_unsatisfiable' }
    ]);
  });

  test('warns blocks_reordered when the blocks correction moves past a constraint', () => {
    const queue = queueOf({
      serial_lanes: [
        { id: 's1', entries: entries(['S-1', 'S-2', 'S-3']) },
        { id: 's2', entries: [] }
      ]
    });

    const result = plan({
      queue,
      pairs: [
        rel('C-1', 'S-1', 'conflict'),
        rel('C-1', 'S-3', 'c_first'),
        // An in-lane edge the lane order does not satisfy yet: S-3 blocks S-1.
        rel('S-3', 'S-1', 'c_first', {
          source: 'fixed',
          basis: 'blocks',
          in_lane: true
        })
      ]
    });

    expect(result.by_id['C-1']).toMatchObject({
      index: 2,
      final_index: 1,
      before: 'S-2'
    });
    expect(result.by_id['C-1'].warnings).toEqual([
      { code: 'blocks_reordered' }
    ]);
  });

  test('reads an occupying lineage from lane_states as standing in its serial lane', () => {
    const queue = queueOf({
      serial_lanes: [
        { id: 's1', entries: [] },
        { id: 's2', entries: entries(['S-1']) }
      ],
      lane_states: { s2: { occupied_by: ['R-1'] } },
      pr_wait: [{ bead_id: 'R-1' }]
    });

    const result = plan({ queue, pairs: [rel('C-1', 'R-1', 'x_first')] });

    expect(result.by_id['C-1']).toMatchObject({
      lane: 's2',
      index: 1,
      before: 'S-1'
    });
  });

  test('keeps a lane whose in-lane blocks edges form a cycle in its order', () => {
    const queue = queueOf({
      serial_lanes: [
        { id: 's1', entries: entries(['S-2', 'S-1']) },
        { id: 's2', entries: [] }
      ]
    });

    const result = plan({
      queue,
      pairs: [
        rel('C-1', 'S-1', 'conflict'),
        // The server ships a two-way in-lane blocks pair as `conflict`.
        rel('S-1', 'S-2', 'conflict', {
          source: 'fixed',
          basis: 'blocks',
          in_lane: true
        })
      ]
    });

    expect(result.layout.s1).toEqual(['S-2', 'S-1', 'C-1']);
  });

  test('reads an occupant without a serial lane as standing in the parallel lane', () => {
    const queue = queueOf({ pr_wait: [{ bead_id: 'R-1' }] });

    const result = plan({ queue, pairs: [rel('C-1', 'R-1', 'conflict')] });

    expect(result.by_id['C-1'].warnings).toEqual([
      { code: 'uncovered', other: 'R-1', other_lane: 'parallel' }
    ]);
  });

  test('skips a shelved pr_wait entry as an occupant', () => {
    const queue = queueOf({
      pr_wait: [{ bead_id: 'R-1' }],
      merge_shelved: { 'R-1': { at: 1 } }
    });

    const result = plan({ queue, pairs: [rel('C-1', 'R-1', 'conflict')] });

    expect(result.by_id['C-1'].warnings).toEqual([]);
    expect(result.by_id['C-1'].reasons).toEqual([]);
  });
});

describe('computePlacement relations', () => {
  test('places by the fixed relation and cites it as 고정', () => {
    const queue = queueOf({
      serial_lanes: [
        { id: 's1', entries: [] },
        { id: 's2', entries: entries(['S-1']) }
      ]
    });

    const result = plan({
      queue,
      pairs: [
        rel('C-1', 'S-1', 'x_first', {
          source: 'fixed',
          basis: 'blocks',
          jev_choice: 'independent'
        })
      ]
    });

    expect(result.by_id['C-1'].lane).toBe('s2');
    expect(result.by_id['C-1'].reasons[0]).toMatchObject({
      other: 'S-1',
      relation: 'x_first',
      source: 'fixed',
      basis: 'blocks'
    });
  });

  test('ignores a jev answer below 0.8 for placement and lists it as 참고', () => {
    const queue = queueOf({
      serial_lanes: [
        { id: 's1', entries: entries(['S-1']) },
        { id: 's2', entries: [] }
      ]
    });

    const result = plan({
      queue,
      pairs: [
        rel('C-1', 'S-1', 'unknown', {
          jev_choice: 'conflict',
          confidence: 0.79
        })
      ]
    });

    expect(result.by_id['C-1'].lane).toBe('parallel');
    expect(result.by_id['C-1'].references.map((line) => line.other)).toEqual([
      'S-1'
    ]);
  });

  test('leaves a jev answer below 0.5 out of the 참고 lines', () => {
    const queue = queueOf({ queue: entries(['P-1']) });

    const result = plan({
      queue,
      pairs: [
        rel('C-1', 'P-1', 'unknown', {
          jev_choice: 'conflict',
          confidence: 0.4
        })
      ]
    });

    expect(result.by_id['C-1'].references).toEqual([]);
  });

  test('marks a candidate whose every relation is unknown as only_unknown', () => {
    const queue = queueOf({ queue: entries(['P-1']) });

    const result = plan({
      queue,
      pairs: [
        rel('C-1', 'P-1', 'unknown', {
          jev_choice: 'conflict',
          confidence: 0.6
        })
      ]
    });

    expect(result.by_id['C-1'].only_unknown).toBe(true);
  });

  test('adds one representative adopted independent to the reasons', () => {
    const queue = queueOf({ queue: entries(['P-1', 'P-2']) });

    const result = plan({
      queue,
      pairs: [
        rel('C-1', 'P-1', 'independent', { confidence: 0.85 }),
        rel('C-1', 'P-2', 'independent', { confidence: 0.95 })
      ]
    });

    expect(result.by_id['C-1'].reasons.map((line) => line.other)).toEqual([
      'P-2'
    ]);
  });
});

describe('computePlacement chosen set', () => {
  test('recomputes the remaining candidate when the chosen set shrinks', () => {
    const pairs = [rel('C-1', 'C-2', 'conflict')];

    const both = plan({ chosen: ['C-1', 'C-2'], pairs });
    const alone = plan({
      chosen: ['C-2'],
      candidates: ['C-1', 'C-2'],
      pairs
    });

    expect(both.by_id['C-2'].lane).toBe('s1');
    expect(alone.by_id['C-2'].lane).toBe('parallel');
  });

  test('shows a constraint with an unchosen candidate only as an outside line', () => {
    const result = plan({
      chosen: ['C-1'],
      candidates: ['C-1', 'C-2'],
      pairs: [rel('C-1', 'C-2', 'conflict')]
    });

    expect(result.by_id['C-1'].lane).toBe('parallel');
    expect(result.by_id['C-1'].outside.map((line) => line.other)).toEqual([
      'C-2'
    ]);
  });

  test('keeps the revision the plan was computed on', () => {
    const result = plan({ queue: queueOf({ revision: 42 }) });

    expect(result.revision).toBe(42);
  });
});

describe('samePlace', () => {
  test('compares the lane and the entry right before', () => {
    const shown = { lane: /** @type {'s1'} */ ('s1'), before: 'S-1' };

    expect(samePlace(shown, { lane: 's1', before: 'S-1' })).toBe(true);
    expect(samePlace(shown, { lane: 's1', before: 'S-2' })).toBe(false);
  });
});
