/** @vitest-environment node */
import { describe, expect, test } from 'vitest';
import { placementPairKey } from '../../../server/placement/wire.js';
import { computePlacement, sameBundle, samePlace } from './compute.js';

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

/**
 * The bundle steps of a candidate as `[kind, id, index, before]`.
 *
 * @param {import('./compute.js').PlacementPlan} result
 * @param {string} id
 * @returns {Array<[string, string, number|null, string|null]>}
 */
function steps(result, id) {
  return result.by_id[id].bundle_steps.map((step) => [
    step.kind,
    step.id,
    step.index,
    step.before
  ]);
}

/**
 * An implementation attempt record as the snapshot carries it.
 *
 * @param {string} bead_id
 * @param {string} status
 * @param {Record<string, any>} [extra]
 * @returns {[string, any]}
 */
function attempt(bead_id, status, extra = {}) {
  const attempt_id = `att-${bead_id}-${status}`;
  return [
    attempt_id,
    {
      attempt_id,
      bead_id,
      kind: 'implementation',
      status,
      started_at: 100,
      serial_lane_id: null,
      ...extra
    }
  ];
}

/**
 * A fixed `blocks` relation between two queued beads: `blocker` lands first.
 *
 * @param {string} blocker
 * @param {string} blockee
 * @returns {[string, any]}
 */
function memberBlocks(blocker, blockee) {
  return rel(blocker, blockee, 'c_first', { source: 'fixed', basis: 'blocks' });
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

  test('moves a partner waiting in another serial lane into the lane where most of K waits', () => {
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

    expect(steps(result, 'C-1')).toEqual([
      ['move', 'S-1', 2, 'T-2'],
      ['place', 'C-1', 3, 'S-1']
    ]);
    expect(result.by_id['C-1']).toMatchObject({ lane: 's2', warnings: [] });
    expect(result.layout.s1).toEqual([]);
  });

  test('pulls a lone candidate and its parallel conflict partner into the emptiest serial lane, partner first', () => {
    const queue = queueOf({ queue: entries(['P-1']) });

    const result = plan({ queue, pairs: [rel('C-1', 'P-1', 'conflict')] });

    expect(result.by_id['C-1']).toMatchObject({ lane: 's1', warnings: [] });
    expect(steps(result, 'C-1')).toEqual([
      ['move', 'P-1', 0, null],
      ['place', 'C-1', 1, 'P-1']
    ]);
    expect(result.layout).toMatchObject({ parallel: [], s1: ['P-1', 'C-1'] });
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

  test('binds an unshelved PR-waiting partner without a serial lane to the emptiest lane', () => {
    const queue = queueOf({ pr_wait: [{ bead_id: 'R-1' }] });

    const result = plan({ queue, pairs: [rel('C-1', 'R-1', 'conflict')] });

    expect(result.by_id['C-1']).toMatchObject({ lane: 's1', warnings: [] });
    expect(result.by_id['C-1'].bundle_steps[0]).toMatchObject({
      kind: 'bind',
      id: 'R-1',
      from_state: 'pr_wait'
    });
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

/**
 * A two-lane snapshot whose both serial lanes are held by a running lineage.
 *
 * @param {Partial<any>} [over]
 * @returns {any}
 */
function busyLanes(over = {}) {
  return queueOf({
    lane_states: {
      s1: { occupied_by: ['R-1'] },
      s2: { occupied_by: ['R-2'] }
    },
    ...over
  });
}

describe('computePlacement new serial lanes (UI-lsr4)', () => {
  test('opens a new serial lane when every lane is occupied', () => {
    const queue = busyLanes();

    const result = plan({
      queue,
      chosen: ['C-1', 'C-2'],
      pairs: [rel('C-1', 'C-2', 'conflict')]
    });

    expect(result.order.map((item) => [item.id, item.lane])).toEqual([
      ['C-1', 's3'],
      ['C-2', 's3']
    ]);
    expect(result.lane_count).toBe(3);
    expect(result.configured_lane_count).toBe(2);
  });

  test('prefers an empty existing lane over a new one', () => {
    const queue = queueOf({ lane_states: { s1: { occupied_by: ['R-1'] } } });

    const result = plan({
      queue,
      chosen: ['C-1', 'C-2'],
      pairs: [rel('C-1', 'C-2', 'conflict')]
    });

    expect(result.by_id['C-1'].lane).toBe('s2');
    expect(result.lane_count).toBe(2);
  });

  test('stays within five lanes', () => {
    const queue = queueOf({
      serial_lane_count: 5,
      serial_lanes: [
        { id: 's1', entries: entries(['S-1', 'S-2']) },
        { id: 's2', entries: entries(['S-3']) },
        { id: 's3', entries: [] },
        { id: 's4', entries: entries(['S-4']) },
        { id: 's5', entries: entries(['S-5']) }
      ],
      lane_states: {
        s1: { occupied_by: [] },
        s2: { occupied_by: ['R-2'] },
        s3: { occupied_by: ['R-3'] },
        s4: { occupied_by: ['R-4'] },
        s5: { occupied_by: ['R-5'] }
      }
    });

    const result = plan({
      queue,
      chosen: ['C-1', 'C-2'],
      pairs: [rel('C-1', 'C-2', 'conflict')]
    });

    expect(result.by_id['C-1'].lane).toBe('s3');
    expect(result.lane_count).toBe(5);
  });

  test('reproduces every place after the lane count grows', () => {
    const chosen = ['C-1', 'C-2', 'C-3', 'C-4', 'C-5'];
    const display_order = chosen;
    const pairs = [
      rel('C-1', 'C-2', 'conflict'),
      rel('C-3', 'C-4', 'conflict')
    ];
    const before = plan({ queue: busyLanes(), chosen, display_order, pairs });
    const grown = busyLanes({
      serial_lane_count: before.lane_count,
      serial_lanes: [
        { id: 's1', entries: [] },
        { id: 's2', entries: [] },
        { id: 's3', entries: [] },
        { id: 's4', entries: [] }
      ]
    });

    const after = plan({ queue: grown, chosen, display_order, pairs });

    expect(before.lane_count).toBe(4);
    expect(after.lane_count).toBe(4);
    for (const id of chosen) {
      expect(samePlace(before.by_id[id], after.by_id[id])).toBe(true);
    }
  });

  test('skips a hidden occupied lane when opening a new one', () => {
    const queue = busyLanes({
      lane_states: {
        s1: { occupied_by: ['R-1'] },
        s2: { occupied_by: ['R-2'] },
        s3: { hidden: true, occupied_by: ['R-3'] }
      }
    });

    const result = plan({
      queue,
      chosen: ['C-1', 'C-2'],
      pairs: [rel('C-1', 'C-2', 'conflict')]
    });

    expect(result.by_id['C-1'].lane).toBe('s4');
    expect(result.lane_count).toBe(4);
  });

  test('keeps a hidden occupant out of the configured lanes', () => {
    const queue = queueOf({
      lane_states: { s3: { hidden: true, occupied_by: ['R-3'] } }
    });

    const result = plan({
      queue,
      chosen: ['C-1', 'C-2'],
      pairs: [rel('C-1', 'C-2', 'conflict')]
    });

    expect(result.by_id['C-1'].lane).toBe('s1');
    expect(result.lane_count).toBe(2);
  });
});

describe('computePlacement pair counts (UI-lsr4)', () => {
  test('counts every compared pair by kind', () => {
    const queue = queueOf({ queue: entries(['P-1', 'P-2', 'P-3', 'P-4']) });

    const result = plan({
      queue,
      chosen: ['C-1'],
      candidates: ['C-1', 'C-2'],
      pairs: [
        rel('C-1', 'P-1', 'independent'),
        rel('C-1', 'P-2', 'independent'),
        rel('C-1', 'P-3', 'x_first'),
        rel('C-1', 'P-4', 'unknown', { confidence: 0.4 }),
        rel('C-1', 'C-2', 'c_first')
      ]
    });

    expect(result.by_id['C-1'].pair_counts).toEqual({
      total: 5,
      conflict: 1,
      order: 1,
      independent: 2,
      unknown: 1
    });
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

    expect(both.by_id['C-2'].before).toBe('C-1');
    expect(alone.by_id['C-2'].before).toBeNull();
  });

  test('shows a constraint with an unchosen candidate only as an outside line', () => {
    const result = plan({
      chosen: ['C-1'],
      candidates: ['C-1', 'C-2'],
      pairs: [rel('C-1', 'C-2', 'conflict')]
    });

    expect(result.by_id['C-1'].reasons).toEqual([]);
    expect(result.by_id['C-1'].outside.map((line) => line.other)).toEqual([
      'C-2'
    ]);
  });

  test('puts a single candidate with an unplaced same-file partner in a serial lane', () => {
    const pairs = [
      rel('C-1', 'C-2', 'conflict', { source: 'fixed', basis: 'file' })
    ];

    const result = plan({ chosen: ['C-1'], candidates: ['C-1', 'C-2'], pairs });

    expect(result.by_id['C-1']).toMatchObject({ lane: 's1', before: null });
  });

  test('sends the same-file partner after the first once it is queued', () => {
    const pairs = [
      rel('C-1', 'C-2', 'conflict', { source: 'fixed', basis: 'file' })
    ];
    const queue = queueOf({
      serial_lanes: [
        { id: 's1', entries: entries(['C-1']) },
        { id: 's2', entries: [] }
      ]
    });

    const result = plan({ queue, chosen: ['C-2'], candidates: ['C-2'], pairs });

    expect(result.by_id['C-2']).toMatchObject({ lane: 's1', before: 'C-1' });
  });

  test('keeps a lone candidate without an outside constraint parallel', () => {
    const result = plan({
      chosen: ['C-1'],
      candidates: ['C-1', 'C-2'],
      pairs: [rel('C-1', 'C-2', 'independent')]
    });

    expect(result.by_id['C-1'].lane).toBe('parallel');
  });

  test('keeps the revision the plan was computed on', () => {
    const result = plan({ queue: queueOf({ revision: 42 }) });

    expect(result.revision).toBe(42);
  });
});

describe('computePlacement predecessors (UI-ey6v §3.4)', () => {
  /**
   * A direct `blocks` relation: the candidate must land before the other.
   *
   * @param {string} c
   * @param {string} x
   */
  function blocks(c, x) {
    return rel(c, x, 'c_first', { source: 'fixed', basis: 'blocks' });
  }

  /**
   * A same-file relation.
   *
   * @param {string} c
   * @param {string} x
   */
  function fileConflict(c, x) {
    return rel(c, x, 'conflict', { source: 'fixed', basis: 'file' });
  }

  /** S-1 waits in s1, and R-1 occupies s2. */
  function busyQueue() {
    return queueOf({
      serial_lanes: [
        { id: 's1', entries: entries(['S-1']) },
        { id: 's2', entries: [] }
      ],
      lane_states: { s2: { occupied_by: ['R-1'] } },
      pr_wait: [{ bead_id: 'R-1' }]
    });
  }

  test('places a direct blocks predecessor of a waiting member in the parallel lane', () => {
    const result = plan({ queue: busyQueue(), pairs: [blocks('C-1', 'S-1')] });

    expect(result.by_id['C-1']).toMatchObject({
      lane: 'parallel',
      before: null
    });
  });

  test('places a direct blocks predecessor of a lane occupant in the parallel lane', () => {
    const result = plan({ queue: busyQueue(), pairs: [blocks('C-1', 'R-1')] });

    expect(result.by_id['C-1'].lane).toBe('parallel');
  });

  test('places the predecessor in the parallel lane despite a file conflict in a serial lane', () => {
    const result = plan({
      queue: busyQueue(),
      pairs: [blocks('C-1', 'R-1'), fileConflict('C-1', 'S-1')]
    });

    expect(result.by_id['C-1'].lane).toBe('parallel');
  });

  test('warns predecessor_parallel for the file conflict and nothing for the blocks line', () => {
    const result = plan({
      queue: busyQueue(),
      pairs: [blocks('C-1', 'R-1'), fileConflict('C-1', 'S-1')]
    });

    expect(result.by_id['C-1'].warnings).toEqual([
      { code: 'predecessor_parallel', other: 'S-1', other_lane: 's1' }
    ]);
  });

  test('warns predecessor_parallel for a conflict with a chosen candidate', () => {
    const result = plan({
      queue: busyQueue(),
      chosen: ['C-1', 'C-2'],
      pairs: [blocks('C-1', 'S-1'), fileConflict('C-1', 'C-2')]
    });

    expect(result.by_id['C-1'].warnings).toEqual([
      { code: 'predecessor_parallel', other: 'C-2' }
    ]);
  });

  test('keeps a successor of a member in that member lane without a warning', () => {
    const result = plan({
      queue: busyQueue(),
      pairs: [
        rel('C-1', 'S-1', 'x_first', { source: 'fixed', basis: 'blocks' })
      ]
    });

    expect(result.by_id['C-1']).toMatchObject({ lane: 's1', warnings: [] });
  });

  test('emits no uncovered warning for any blocks line', () => {
    const queue = queueOf({
      queue: entries(['P-1', 'P-2']),
      serial_lanes: [
        { id: 's1', entries: entries(['S-1']) },
        { id: 's2', entries: entries(['S-2']) }
      ]
    });

    const result = plan({
      queue,
      pairs: [
        // Followed into s1 by covering it.
        rel('C-1', 'S-1', 'conflict', { source: 'fixed', basis: 'file' }),
        rel('C-1', 'S-2', 'x_first', { source: 'fixed', basis: 'blocks' }),
        rel('C-1', 'P-1', 'x_first', { source: 'fixed', basis: 'blocks' }),
        rel('C-1', 'P-2', 'conflict', { source: 'fixed', basis: 'blocks' })
      ]
    });

    expect(result.by_id['C-1'].warnings).toEqual([]);
  });

  test('takes the predecessor out of its bundle and lanes the rest without it', () => {
    const result = plan({
      queue: busyQueue(),
      display_order: ['C-1', 'C-2', 'C-3'],
      chosen: ['C-1', 'C-2', 'C-3'],
      pairs: [
        blocks('C-1', 'S-1'),
        fileConflict('C-1', 'C-2'),
        fileConflict('C-2', 'C-3')
      ]
    });

    expect(
      result.order.map((item) => [item.id, item.lane, item.bundle])
    ).toEqual([
      ['C-2', 's3', 0],
      ['C-3', 's3', 0],
      ['C-1', 'parallel', 1]
    ]);
  });

  test('leaves a lone partner of a predecessor in the parallel lane without a warning', () => {
    const result = plan({
      queue: busyQueue(),
      chosen: ['C-1', 'C-2'],
      pairs: [blocks('C-1', 'S-1'), fileConflict('C-1', 'C-2')]
    });

    expect(result.by_id['C-2']).toMatchObject({
      lane: 'parallel',
      warnings: []
    });
  });

  test('keeps a chosen bundle ordered by blocks in its serial lane', () => {
    const result = plan({
      display_order: ['C-2', 'C-1'],
      chosen: ['C-1', 'C-2'],
      pairs: [blocks('C-1', 'C-2')]
    });

    expect(result.order.map((item) => [item.id, item.lane])).toEqual([
      ['C-1', 's1'],
      ['C-2', 's1']
    ]);
  });

  test('keeps a lone candidate that only blocks an unplaced candidate in a serial lane', () => {
    const result = plan({
      chosen: ['C-1'],
      candidates: ['C-1', 'C-2'],
      pairs: [blocks('C-1', 'C-2')]
    });

    expect(result.by_id['C-1'].lane).toBe('s1');
  });
});

describe('computePlacement conflicting partners (UI-blx2 §3)', () => {
  test('puts the candidate before a c_first partner it moves', () => {
    const queue = queueOf({ queue: entries(['P-1']) });

    const result = plan({ queue, pairs: [rel('C-1', 'P-1', 'c_first')] });

    expect(steps(result, 'C-1')).toEqual([
      ['place', 'C-1', 0, null],
      ['move', 'P-1', 1, 'C-1']
    ]);
  });

  test('binds a running partner without a serial lane before the candidate', () => {
    const queue = queueOf({
      attempts: Object.fromEntries([attempt('R-1', 'running')])
    });

    const result = plan({ queue, pairs: [rel('C-1', 'R-1', 'conflict')] });

    expect(steps(result, 'C-1')).toEqual([
      ['bind', 'R-1', null, null],
      ['place', 'C-1', 0, null]
    ]);
    expect(result.by_id['C-1']).toMatchObject({ lane: 's1', warnings: [] });
  });

  test('binds a running partner that kept its waiting row and seats that row at the lane head', () => {
    const queue = queueOf({
      queue: entries(['R-1']),
      attempts: Object.fromEntries([attempt('R-1', 'running')])
    });

    const result = plan({ queue, pairs: [rel('C-1', 'R-1', 'conflict')] });

    expect(steps(result, 'C-1')).toEqual([
      ['bind', 'R-1', null, null],
      ['place', 'C-1', 0, 'R-1']
    ]);
    expect(result.layout).toMatchObject({ parallel: [], s1: ['R-1', 'C-1'] });
  });

  test('binds rather than moves a waiting partner whose latest attempt waits to retry', () => {
    const queue = queueOf({
      queue: entries(['R-1']),
      attempts: Object.fromEntries([
        attempt('R-1', 'retry_wait', { finished_at: 120 })
      ])
    });

    const result = plan({ queue, pairs: [rel('C-1', 'R-1', 'conflict')] });

    expect(result.by_id['C-1'].bundle_steps[0]).toMatchObject({
      kind: 'bind',
      id: 'R-1',
      from_state: 'retry_wait'
    });
  });

  test('binds one of two lane-less partners and leaves the other lane_occupied', () => {
    const queue = queueOf({
      attempts: Object.fromEntries([
        attempt('R-1', 'running'),
        attempt('R-2', 'running')
      ])
    });

    const result = plan({
      queue,
      pairs: [rel('C-1', 'R-1', 'conflict'), rel('C-1', 'R-2', 'conflict')]
    });

    expect(steps(result, 'C-1')[0]).toEqual(['bind', 'R-1', null, null]);
    expect(result.by_id['C-1'].warnings).toEqual([
      {
        code: 'uncovered',
        other: 'R-2',
        other_lane: 'parallel',
        reason: 'lane_occupied'
      }
    ]);
  });

  test('binds nothing into a chosen lane another bead occupies', () => {
    const queue = queueOf({
      lane_states: { s2: { occupied_by: ['F-1'] } },
      attempts: Object.fromEntries([attempt('R-1', 'running')])
    });

    const result = plan({
      queue,
      pairs: [rel('C-1', 'F-1', 'conflict'), rel('C-1', 'R-1', 'conflict')]
    });

    expect(steps(result, 'C-1')).toEqual([['place', 'C-1', 0, null]]);
    expect(result.by_id['C-1']).toMatchObject({
      lane: 's2',
      warnings: [
        {
          code: 'uncovered',
          other: 'R-1',
          other_lane: 'parallel',
          reason: 'lane_occupied'
        }
      ]
    });
  });

  test('picks the occupied lane holding more of K and warns occupied_other_lane for the other', () => {
    const queue = queueOf({
      serial_lanes: [
        { id: 's1', entries: [] },
        { id: 's2', entries: entries(['T-1']) }
      ],
      lane_states: {
        s1: { occupied_by: ['F-1'] },
        s2: { occupied_by: ['F-2'] }
      }
    });

    const result = plan({
      queue,
      pairs: [
        rel('C-1', 'F-1', 'conflict'),
        rel('C-1', 'F-2', 'conflict'),
        rel('C-1', 'T-1', 'conflict')
      ]
    });

    expect(result.by_id['C-1']).toMatchObject({
      lane: 's2',
      before: 'T-1',
      warnings: [
        {
          code: 'uncovered',
          other: 'F-1',
          other_lane: 's1',
          reason: 'occupied_other_lane'
        }
      ]
    });
  });

  test('leaves a partner that blocks another waiting item in place with uncovered predecessor', () => {
    const queue = queueOf({ queue: entries(['P-1', 'P-2']) });

    const result = plan({
      queue,
      pairs: [rel('C-1', 'P-1', 'conflict'), memberBlocks('P-1', 'P-2')]
    });

    expect(steps(result, 'C-1')).toEqual([['place', 'C-1', 2, 'P-2']]);
    expect(result.by_id['C-1'].warnings).toEqual([
      {
        code: 'uncovered',
        other: 'P-1',
        other_lane: 'parallel',
        reason: 'predecessor'
      }
    ]);
  });

  test('binds no partner that waits on an item waiting in the chosen lane', () => {
    const queue = queueOf({
      serial_lanes: [
        { id: 's1', entries: entries(['W-1']) },
        { id: 's2', entries: [] }
      ],
      attempts: Object.fromEntries([attempt('R-1', 'running')])
    });

    const result = plan({
      queue,
      pairs: [
        rel('C-1', 'W-1', 'conflict'),
        rel('C-1', 'R-1', 'conflict'),
        memberBlocks('W-1', 'R-1')
      ]
    });

    expect(steps(result, 'C-1')).toEqual([['place', 'C-1', 1, 'W-1']]);
    expect(result.by_id['C-1']).toMatchObject({
      lane: 's1',
      warnings: [
        {
          code: 'uncovered',
          other: 'R-1',
          other_lane: 'parallel',
          reason: 'waits_in_lane'
        }
      ]
    });
  });

  test('leaves a lane-less partner with a discard in flight in place with uncovered discard_active', () => {
    const queue = queueOf({
      attempts: Object.fromEntries([attempt('R-1', 'running')]),
      discard_operations: { 'op-1': { bead_id: 'R-1', phase: 'requested' } }
    });

    const result = plan({ queue, pairs: [rel('C-1', 'R-1', 'conflict')] });

    expect(steps(result, 'C-1')).toEqual([['place', 'C-1', 0, null]]);
    expect(result.by_id['C-1'].warnings).toEqual([
      {
        code: 'uncovered',
        other: 'R-1',
        other_lane: 'parallel',
        reason: 'discard_active'
      }
    ]);
  });

  test('leaves a waiting partner whose review session runs in place with uncovered not_holdable', () => {
    const queue = queueOf({
      queue: entries(['R-1']),
      attempts: Object.fromEntries([
        attempt('R-1', 'running', { kind: 'review_session' })
      ])
    });

    const result = plan({ queue, pairs: [rel('C-1', 'R-1', 'conflict')] });

    expect(result.by_id['C-1'].warnings).toEqual([
      {
        code: 'uncovered',
        other: 'R-1',
        other_lane: 'parallel',
        reason: 'not_holdable'
      }
    ]);
  });

  test('leaves a session-delivered PR-waiting partner in place with uncovered not_holdable', () => {
    const queue = queueOf({ pr_wait: [{ bead_id: 'R-1', external: true }] });

    const result = plan({ queue, pairs: [rel('C-1', 'R-1', 'conflict')] });

    expect(result.by_id['C-1'].warnings).toEqual([
      {
        code: 'uncovered',
        other: 'R-1',
        other_lane: 'parallel',
        reason: 'not_holdable'
      }
    ]);
  });

  test('warns no_serial_lane for a partner a snapshot without serial lanes cannot take', () => {
    const queue = queueOf({
      serial_lane_count: 0,
      serial_lanes: [],
      queue: entries(['P-1'])
    });

    const result = plan({ queue, pairs: [rel('C-1', 'P-1', 'conflict')] });

    expect(result.by_id['C-1']).toMatchObject({
      lane: 'parallel',
      warnings: [
        {
          code: 'uncovered',
          other: 'P-1',
          other_lane: 'parallel',
          reason: 'no_serial_lane'
        }
      ]
    });
  });

  test('joins two candidates that pull the same partner into one bundle', () => {
    const queue = queueOf({ queue: entries(['P-1']) });

    const result = plan({
      queue,
      chosen: ['C-1', 'C-2'],
      pairs: [
        rel('C-1', 'P-1', 'conflict'),
        rel('C-2', 'P-1', 'conflict'),
        rel('C-1', 'C-2', 'independent')
      ]
    });

    expect(result.bundles).toHaveLength(1);
    expect(steps(result, 'C-2')).toEqual([
      ['move', 'P-1', 0, null],
      ['place', 'C-1', 1, 'P-1'],
      ['place', 'C-2', 2, 'C-1']
    ]);
    expect(result.by_id['C-1'].pulled.map((step) => step.id)).toEqual(['P-1']);
    expect(result.by_id['C-2'].pulled).toEqual([]);
  });

  test('keeps a predecessor alone in the parallel lane without pulling its partner', () => {
    const queue = queueOf({
      queue: entries(['P-1']),
      serial_lanes: [
        { id: 's1', entries: entries(['S-1']) },
        { id: 's2', entries: [] }
      ]
    });

    const result = plan({
      queue,
      pairs: [
        rel('C-1', 'S-1', 'c_first', { source: 'fixed', basis: 'blocks' }),
        rel('C-1', 'P-1', 'conflict')
      ]
    });

    expect(steps(result, 'C-1')).toEqual([['place', 'C-1', 1, 'P-1']]);
    expect(result.by_id['C-1']).toMatchObject({ lane: 'parallel' });
  });

  test('numbers a moved partner and the candidate in apply order', () => {
    const queue = queueOf({ queue: entries(['P-1']) });

    const result = plan({ queue, pairs: [rel('C-1', 'P-1', 'conflict')] });

    expect(
      result.by_id['C-1'].bundle_steps.map((step) => [step.id, step.number])
    ).toEqual([
      ['P-1', 1],
      ['C-1', 2]
    ]);
    expect(result.by_id['C-1'].number).toBe(2);
  });
});

describe('sameBundle', () => {
  test('tells a bundle whose partner turned from a move into a bind apart', () => {
    const waiting = plan({
      queue: queueOf({ queue: entries(['P-1']) }),
      pairs: [rel('C-1', 'P-1', 'conflict')]
    });
    const started = plan({
      queue: queueOf({
        queue: entries(['P-1']),
        attempts: Object.fromEntries([attempt('P-1', 'running')])
      }),
      pairs: [rel('C-1', 'P-1', 'conflict')]
    });

    expect(sameBundle(waiting.by_id['C-1'], started.by_id['C-1'])).toBe(false);
  });
});

describe('samePlace', () => {
  test('compares the lane and the entry right before', () => {
    const shown = { lane: /** @type {'s1'} */ ('s1'), before: 'S-1' };

    expect(samePlace(shown, { lane: 's1', before: 'S-1' })).toBe(true);
    expect(samePlace(shown, { lane: 's1', before: 'S-2' })).toBe(false);
  });
});
