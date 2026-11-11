/** @vitest-environment node */
import { describe, expect, test, vi } from 'vitest';
import { placementPairKey } from '../../../server/placement/wire.js';
import {
  placementSendNotice,
  sendPlacement,
  sendPlacementBatch
} from './apply.js';
import { computePlacement } from './compute.js';
import { orderLaneByBlocks } from './lane-order.js';

/**
 * @param {string} id
 * @param {Partial<import('./compute.js').PlannedPlacement>} [over]
 * @returns {import('./compute.js').PlannedPlacement}
 */
function placed(id, over = {}) {
  /** @type {import('./compute.js').PlannedPlacement} */
  const row = {
    id,
    number: 1,
    bundle: 0,
    lane: 's1',
    index: 1,
    final_index: 1,
    before: 'S-1',
    reasons: [],
    references: [],
    outside: [],
    pair_counts: {
      total: 0,
      conflict: 0,
      order: 0,
      independent: 0,
      unknown: 0
    },
    warnings: [],
    only_unknown: false,
    judged_at: null,
    bundle_steps: [],
    pulled: [],
    ...over
  };
  // A lone candidate's bundle is its own place.
  return over.bundle_steps
    ? row
    : {
        ...row,
        bundle_steps: [
          {
            kind: 'place',
            id,
            from_lane: null,
            from_index: null,
            from_state: null,
            index: row.index,
            final_index: row.final_index,
            before: row.before,
            number: row.number
          }
        ]
      };
}

/**
 * A recompute stub: every snapshot names the place each candidate gets on it
 * and, optionally, its configured and needed serial lane counts (default 2).
 *
 * @param {any} queue
 * @returns {import('./compute.js').PlacementPlan}
 */
function planFromQueue(queue) {
  const by_id = /** @type {Record<string, any>} */ (queue.places || {});
  return {
    revision: queue.revision,
    order: Object.values(by_id),
    bundles: [],
    by_id,
    layout: {},
    configured_lane_count: queue.configured_lane_count ?? 2,
    lane_count: queue.lane_count ?? 2
  };
}

describe('sendPlacement', () => {
  test('sends the preview revision, lane and index', async () => {
    const transport = vi
      .fn()
      .mockResolvedValue({ applied: true, conflict: false, queue: {} });

    await sendPlacement({
      transport,
      root_dir: '/repo',
      placement: placed('C-1'),
      revision: 4,
      recompute: planFromQueue,
      adopt: () => {}
    });

    expect(transport.mock.calls).toEqual([
      [
        'worker-queue-place',
        {
          bead_id: 'C-1',
          lane: 's1',
          index: 1,
          root_dir: '/repo',
          expected_revision: 4
        }
      ]
    ]);
  });

  test('resends once with the new revision when the place is unchanged after a conflict', async () => {
    const moved_queue = {
      revision: 9,
      places: { 'C-1': placed('C-1', { index: 2 }) }
    };
    const transport = vi
      .fn()
      .mockResolvedValueOnce({
        applied: false,
        conflict: true,
        queue: moved_queue
      })
      .mockResolvedValueOnce({ applied: true, conflict: false, queue: {} });

    const result = await sendPlacement({
      transport,
      root_dir: '',
      placement: placed('C-1'),
      revision: 4,
      recompute: planFromQueue,
      adopt: () => {}
    });

    expect(result.status).toBe('applied');
    expect(transport.mock.calls[1]).toEqual([
      'worker-queue-place',
      { bead_id: 'C-1', lane: 's1', index: 2, expected_revision: 9 }
    ]);
  });

  test('sends nothing more when the place changed after a conflict', async () => {
    const moved_queue = {
      revision: 9,
      places: { 'C-1': placed('C-1', { before: 'S-9' }) }
    };
    const transport = vi.fn().mockResolvedValue({
      applied: false,
      conflict: true,
      queue: moved_queue
    });

    const result = await sendPlacement({
      transport,
      root_dir: '',
      placement: placed('C-1'),
      revision: 4,
      recompute: planFromQueue,
      adopt: () => {}
    });

    expect(transport).toHaveBeenCalledTimes(1);
    expect(result).toMatchObject({
      status: 'moved',
      placement: { before: 'S-9' }
    });
  });

  test('stops as contended after five retries leave the place unchanged', async () => {
    const same_queue = { revision: 9, places: { 'C-1': placed('C-1') } };
    const transport = vi
      .fn()
      .mockResolvedValue({ applied: false, conflict: true, queue: same_queue });

    const result = await sendPlacement({
      transport,
      root_dir: '',
      placement: placed('C-1'),
      revision: 4,
      recompute: planFromQueue,
      adopt: () => {}
    });

    expect(transport).toHaveBeenCalledTimes(6);
    expect(result.status).toBe('contended');
    expect(placementSendNotice(result)).toBe('큐가 계속 바뀌어 멈췄습니다');
  });

  test('reports an admission refusal with its reason', async () => {
    const transport = vi.fn().mockResolvedValue({
      applied: false,
      conflict: false,
      admission_reason: 'spec_unpublished',
      queue: {}
    });

    const result = await sendPlacement({
      transport,
      root_dir: '',
      placement: placed('C-1'),
      revision: 4,
      recompute: planFromQueue,
      adopt: () => {}
    });

    expect(result).toEqual({ status: 'refused', reason: 'spec_unpublished' });
  });

  test('adopts the queue every reply carries', async () => {
    const adopt = vi.fn();
    const reply_queue = { revision: 5 };
    const transport = vi.fn().mockResolvedValue({
      applied: true,
      conflict: false,
      queue: reply_queue
    });

    await sendPlacement({
      transport,
      root_dir: '',
      placement: placed('C-1'),
      revision: 4,
      recompute: planFromQueue,
      adopt
    });

    expect(adopt).toHaveBeenCalledWith(reply_queue);
  });
});

describe('sendPlacementBatch', () => {
  test('continues the batch after two conflicts leave the shown place unchanged', async () => {
    const first = placed('C-1', { before: null, index: 0 });
    const second = placed('C-2', { before: 'C-1', index: 1, bundle: 1 });
    const third = placed('C-3', { before: 'C-2', index: 2, bundle: 2 });
    const places = { 'C-1': first, 'C-2': second, 'C-3': third };
    const transport = vi
      .fn()
      .mockResolvedValueOnce({ applied: true, queue: { revision: 4, places } })
      .mockResolvedValueOnce({ conflict: true, queue: { revision: 5, places } })
      .mockResolvedValueOnce({ conflict: true, queue: { revision: 6, places } })
      .mockResolvedValueOnce({ applied: true, queue: { revision: 7, places } })
      .mockResolvedValueOnce({ applied: true, queue: { revision: 8, places } });

    const result = await sendPlacementBatch({
      transport,
      root_dir: '',
      shown: [first, second, third],
      queue: { revision: 3, places },
      recompute: planFromQueue,
      adopt: () => {},
      snapshot: () => ({})
    });

    expect(result).toEqual({ placed: ['C-1', 'C-2', 'C-3'], stopped: null });
    expect(
      transport.mock.calls.map((call) => [
        call[1].bead_id,
        call[1].expected_revision
      ])
    ).toEqual([
      ['C-1', 3],
      ['C-2', 4],
      ['C-2', 5],
      ['C-2', 6],
      ['C-3', 7]
    ]);
  });

  test('sends the shown rows one at a time with each reply revision', async () => {
    const first = placed('C-1', { before: null, index: 0 });
    const second = placed('C-2', { before: 'C-1', index: 1, bundle: 1 });
    const start = { revision: 3, places: { 'C-1': first, 'C-2': second } };
    const after_first = { revision: 4, places: { 'C-2': second } };
    const transport = vi
      .fn()
      .mockResolvedValueOnce({
        applied: true,
        conflict: false,
        queue: after_first
      })
      .mockResolvedValueOnce({ applied: true, conflict: false, queue: {} });

    const result = await sendPlacementBatch({
      transport,
      root_dir: '',
      shown: [first, second],
      queue: start,
      recompute: planFromQueue,
      adopt: () => {},
      snapshot: () => ({})
    });

    expect(result).toEqual({ placed: ['C-1', 'C-2'], stopped: null });
    expect(
      transport.mock.calls.map((call) => [
        call[1].bead_id,
        call[1].expected_revision
      ])
    ).toEqual([
      ['C-1', 3],
      ['C-2', 4]
    ]);
  });

  test('stops before a row whose recomputed place differs from the table', async () => {
    const first = placed('C-1', { before: null, index: 0 });
    const second = placed('C-2', { before: 'C-1', index: 1, bundle: 1 });
    const start = { revision: 3, places: { 'C-1': first, 'C-2': second } };
    const after_first = {
      revision: 4,
      places: { 'C-2': placed('C-2', { before: 'X-1', bundle: 1 }) }
    };
    const transport = vi.fn().mockResolvedValue({
      applied: true,
      conflict: false,
      queue: after_first
    });

    const result = await sendPlacementBatch({
      transport,
      root_dir: '',
      shown: [first, second],
      queue: start,
      recompute: planFromQueue,
      adopt: () => {},
      snapshot: () => ({})
    });

    expect(transport).toHaveBeenCalledTimes(1);
    expect(result.placed).toEqual(['C-1']);
    expect(result.stopped).toMatchObject({ id: 'C-2', cause: 'moved' });
  });

  test('stops on a refusal and keeps the count of what went in', async () => {
    const first = placed('C-1', { before: null, index: 0 });
    const start = { revision: 3, places: { 'C-1': first } };
    const transport = vi.fn().mockResolvedValue({
      applied: false,
      conflict: false,
      admission_reason: 'awaiting_user',
      queue: {}
    });

    const result = await sendPlacementBatch({
      transport,
      root_dir: '',
      shown: [first],
      queue: start,
      recompute: planFromQueue,
      adopt: () => {},
      snapshot: () => ({})
    });

    expect(result.placed).toEqual([]);
    expect(result.stopped).toMatchObject({ id: 'C-1', cause: 'refused' });
  });
});

describe('serial lane growth (UI-lsr4 §3.3)', () => {
  test('grows the serial lane count before the first place', async () => {
    const first = placed('C-1', { lane: 's3', before: null, index: 0 });
    const start = {
      revision: 3,
      configured_lane_count: 2,
      lane_count: 3,
      places: { 'C-1': first }
    };
    const grown = {
      revision: 4,
      configured_lane_count: 3,
      lane_count: 3,
      places: { 'C-1': first }
    };
    const transport = vi
      .fn()
      .mockResolvedValueOnce({ applied: true, conflict: false, queue: grown })
      .mockResolvedValueOnce({ applied: true, conflict: false, queue: {} });

    const result = await sendPlacementBatch({
      transport,
      root_dir: '/repo',
      shown: [first],
      queue: start,
      recompute: planFromQueue,
      adopt: () => {},
      snapshot: () => ({})
    });

    expect(result).toEqual({ placed: ['C-1'], stopped: null });
    expect(transport.mock.calls).toEqual([
      [
        'worker-queue-set-serial-lane-count',
        { count: 3, root_dir: '/repo', expected_revision: 3 }
      ],
      [
        'worker-queue-place',
        {
          bead_id: 'C-1',
          lane: 's3',
          index: 0,
          root_dir: '/repo',
          expected_revision: 4
        }
      ]
    ]);
  });

  test('stops without a place when growing is refused', async () => {
    const first = placed('C-1', { lane: 's3', before: null, index: 0 });
    const start = {
      revision: 3,
      configured_lane_count: 2,
      lane_count: 3,
      places: { 'C-1': first }
    };
    const transport = vi
      .fn()
      .mockResolvedValue({ applied: false, conflict: false, queue: start });

    const result = await sendPlacementBatch({
      transport,
      root_dir: '',
      shown: [first],
      queue: start,
      recompute: planFromQueue,
      adopt: () => {},
      snapshot: () => ({})
    });

    expect(transport).toHaveBeenCalledTimes(1);
    expect(result.placed).toEqual([]);
    expect(result.stopped).toMatchObject({ id: 'C-1', cause: 'grow_refused' });
    expect(
      placementSendNotice(/** @type {any} */ (result.stopped).result)
    ).toBe('직렬 레인을 늘리지 못했습니다');
  });

  test('stops a single apply when the place moved after growing', async () => {
    const shown = placed('C-1', { lane: 's3', before: null, index: 0 });
    const grown = {
      revision: 4,
      configured_lane_count: 3,
      lane_count: 3,
      places: { 'C-1': placed('C-1', { lane: 's3', before: 'X-9' }) }
    };
    const transport = vi
      .fn()
      .mockResolvedValue({ applied: true, conflict: false, queue: grown });

    const result = await sendPlacement({
      transport,
      root_dir: '',
      placement: shown,
      revision: 3,
      configured_lane_count: 2,
      lane_count: 3,
      recompute: planFromQueue,
      adopt: () => {}
    });

    expect(transport).toHaveBeenCalledTimes(1);
    expect(result).toMatchObject({
      status: 'moved',
      placement: { before: 'X-9' }
    });
  });

  test('grows on the fifth retry when every conflict still needs the same place and count', async () => {
    const shown = placed('C-1', { lane: 's3', before: null, index: 0 });
    const raced = {
      revision: 5,
      configured_lane_count: 2,
      lane_count: 3,
      places: { 'C-1': shown }
    };
    const grown = {
      revision: 10,
      configured_lane_count: 3,
      lane_count: 3,
      places: { 'C-1': shown }
    };
    const transport = vi
      .fn()
      .mockResolvedValueOnce({ applied: false, conflict: true, queue: raced })
      .mockResolvedValueOnce({
        conflict: true,
        queue: { ...raced, revision: 6 }
      })
      .mockResolvedValueOnce({
        conflict: true,
        queue: { ...raced, revision: 7 }
      })
      .mockResolvedValueOnce({
        conflict: true,
        queue: { ...raced, revision: 8 }
      })
      .mockResolvedValueOnce({
        conflict: true,
        queue: { ...raced, revision: 9 }
      })
      .mockResolvedValueOnce({ applied: true, conflict: false, queue: grown })
      .mockResolvedValueOnce({ applied: true, conflict: false, queue: {} });

    const result = await sendPlacement({
      transport,
      root_dir: '',
      placement: shown,
      revision: 3,
      configured_lane_count: 2,
      lane_count: 3,
      recompute: planFromQueue,
      adopt: () => {}
    });

    expect(result.status).toBe('applied');
    expect(
      transport.mock.calls.map((call) => [call[0], call[1].expected_revision])
    ).toEqual([
      ['worker-queue-set-serial-lane-count', 3],
      ['worker-queue-set-serial-lane-count', 5],
      ['worker-queue-set-serial-lane-count', 6],
      ['worker-queue-set-serial-lane-count', 7],
      ['worker-queue-set-serial-lane-count', 8],
      ['worker-queue-set-serial-lane-count', 9],
      ['worker-queue-place', 10]
    ]);
  });

  test('stops before placing when growth exhausts five retries', async () => {
    const shown = placed('C-1', { lane: 's3', before: null, index: 0 });
    const raced = {
      revision: 5,
      configured_lane_count: 2,
      lane_count: 3,
      places: { 'C-1': shown }
    };
    const transport = vi
      .fn()
      .mockResolvedValue({ conflict: true, queue: raced });

    const result = await sendPlacement({
      transport,
      root_dir: '',
      placement: shown,
      revision: 3,
      configured_lane_count: 2,
      lane_count: 3,
      recompute: planFromQueue,
      adopt: () => {}
    });

    expect(result).toEqual({ status: 'contended', queue: raced });
    expect(transport).toHaveBeenCalledTimes(6);
    expect(
      transport.mock.calls.every(
        (call) => call[0] === 'worker-queue-set-serial-lane-count'
      )
    ).toBe(true);
  });

  test('stops as moved when a growth conflict changes the needed count', async () => {
    const shown = placed('C-1', { lane: 's3', before: null, index: 0 });
    const raced = {
      revision: 5,
      configured_lane_count: 2,
      lane_count: 4,
      places: { 'C-1': shown }
    };
    const transport = vi
      .fn()
      .mockResolvedValue({ applied: false, conflict: true, queue: raced });

    const result = await sendPlacement({
      transport,
      root_dir: '',
      placement: shown,
      revision: 3,
      configured_lane_count: 2,
      lane_count: 3,
      recompute: planFromQueue,
      adopt: () => {}
    });

    expect(transport).toHaveBeenCalledTimes(1);
    expect(result.status).toBe('moved');
  });
});

/**
 * A fixed relation between two beads, `first` landing before `second`.
 *
 * @param {string} first
 * @param {string} second
 * @param {'blocks'|'file'} basis
 * @returns {[string, Record<string, any>]}
 */
function fixed(first, second, basis) {
  const [a, b] = first < second ? [first, second] : [second, first];
  return [
    placementPairKey(a, b),
    {
      a,
      b,
      relation:
        basis === 'file' ? 'conflict' : first === a ? 'a_first' : 'b_first',
      source: 'fixed',
      basis,
      confidence: null,
      jev_choice: null,
      judged_at: null
    }
  ];
}

/**
 * A stand-in for the store's three writes, in the store's own order
 * (`queue-store.js` `place`, `placeBundle`, `setSerialLaneCount`) — not the
 * plan's simulation, so a disagreement between the two shows up as `moved`.
 * `place`: leave every lane, splice at the clamped index, blocks correction.
 * `place-bundle`: stamp the bind's lane on its live attempts and `pr_wait`
 * row and take its waiting row out; each step leaves every lane and is spliced
 * at its index; one blocks correction; the bound row goes to the lane head.
 * A placed bead leaves the candidates; the bound lineage occupies the lane.
 *
 * @param {Record<string, any>} relations - The `blocks` edges come from here,
 * as the store reads them from `blocked_by`.
 * @returns {(queue: any, type: string, payload: any) => any}
 */
function storeStandIn(relations) {
  /**
   * @param {string[]} ids
   * @returns {{ blocker: string, blockee: string }[]}
   */
  const edgesAmong = (ids) =>
    Object.values(relations).flatMap((raw) =>
      raw.source === 'fixed' &&
      raw.basis === 'blocks' &&
      ids.includes(raw.a) &&
      ids.includes(raw.b)
        ? [
            ...(raw.relation !== 'b_first'
              ? [{ blocker: raw.a, blockee: raw.b }]
              : []),
            ...(raw.relation !== 'a_first'
              ? [{ blocker: raw.b, blockee: raw.a }]
              : [])
          ]
        : []
    );
  return (queue, type, payload) => {
    const next = structuredClone(queue);
    /** @param {string} lane */
    const laneOf = (lane) =>
      lane === 'parallel'
        ? next.queue
        : next.serial_lanes.find((/** @type {any} */ l) => l.id === lane)
            .entries;
    /** @param {string} bead_id */
    const removeFromLanes = (bead_id) => {
      next.queue = next.queue.filter(
        (/** @type {any} */ e) => e.bead_id !== bead_id
      );
      for (const lane of next.serial_lanes) {
        lane.entries = lane.entries.filter(
          (/** @type {any} */ e) => e.bead_id !== bead_id
        );
      }
      next.pr_wait = next.pr_wait.filter(
        (/** @type {any} */ e) => e.bead_id !== bead_id
      );
    };
    /**
     * @param {string} bead_id
     * @param {string} lane
     * @param {number} index
     */
    const splice = (bead_id, lane, index) => {
      removeFromLanes(bead_id);
      const entries = laneOf(lane);
      entries.splice(Math.min(index, entries.length), 0, {
        bead_id,
        added_at: next.revision
      });
      delete next.placement_status[bead_id];
    };
    /** @param {string} lane */
    const correct = (lane) => {
      if (lane === 'parallel') {
        return;
      }
      const target = next.serial_lanes.find(
        (/** @type {any} */ l) => l.id === lane
      );
      const ids = target.entries.map((/** @type {any} */ e) => e.bead_id);
      const topo = orderLaneByBlocks(ids, edgesAmong(ids));
      if (!topo.cycle) {
        target.entries = topo.order.map((id) =>
          target.entries.find((/** @type {any} */ e) => e.bead_id === id)
        );
      }
    };
    if (type === 'worker-queue-set-serial-lane-count') {
      next.serial_lane_count = payload.count;
      while (next.serial_lanes.length < payload.count) {
        next.serial_lanes.push({
          id: `s${next.serial_lanes.length + 1}`,
          entries: []
        });
      }
    } else if (type === 'worker-queue-place') {
      splice(payload.bead_id, payload.lane, payload.index);
      correct(payload.lane);
    } else {
      const [bind] = payload.binds;
      /** @type {any} */
      let bound_row = null;
      if (bind) {
        for (const attempt of Object.values(next.attempts)) {
          if (
            /** @type {any} */ (attempt).bead_id === bind &&
            !['done', 'stopped', 'discarded', 'waiting'].includes(
              /** @type {any} */ (attempt).status
            )
          ) {
            /** @type {any} */ (attempt).serial_lane_id = payload.lane;
          }
        }
        for (const entry of next.pr_wait) {
          if (entry.bead_id === bind) {
            entry.serial_lane_id = payload.lane;
          }
        }
        bound_row =
          [
            next.queue,
            ...next.serial_lanes.map((/** @type {any} */ l) => l.entries)
          ]
            .flat()
            .find((/** @type {any} */ e) => e.bead_id === bind) || null;
        next.queue = next.queue.filter(
          (/** @type {any} */ e) => e.bead_id !== bind
        );
        for (const lane of next.serial_lanes) {
          lane.entries = lane.entries.filter(
            (/** @type {any} */ e) => e.bead_id !== bind
          );
        }
        next.lane_states = {
          ...next.lane_states,
          [payload.lane]: {
            occupied_by: [
              ...(next.lane_states[payload.lane]?.occupied_by || []),
              bind
            ]
          }
        };
      }
      for (const step of payload.steps) {
        splice(step.bead_id, payload.lane, step.index);
      }
      correct(payload.lane);
      if (bound_row) {
        laneOf(payload.lane).unshift(bound_row);
      }
    }
    next.revision += 1;
    return next;
  };
}

describe('sendPlacementBatch over the real computation (UI-ey6v §3.4)', () => {
  /**
   * Run `[전체 적용]` against the store stand-in, so each recompute reads the
   * placed beads as members the way the next snapshot does.
   *
   * @param {string[]} display_order
   * @param {Array<[string, Record<string, any>]>} pairs
   * @param {Record<string, any>} [queue_patch]
   */
  async function applyAll(display_order, pairs, queue_patch = {}) {
    const relations = /** @type {Record<string, any>} */ (
      Object.fromEntries(pairs)
    );
    /**
     * @param {any} queue
     * @param {string[]} chosen
     */
    const recompute = (queue, chosen) =>
      computePlacement({
        queue,
        relations,
        display_order,
        chosen
      });
    const start = {
      revision: 1,
      queue: [],
      serial_lane_count: 2,
      serial_lanes: [
        { id: 's1', entries: [{ bead_id: 'S-1', added_at: 1 }] },
        { id: 's2', entries: [] }
      ],
      lane_states: {},
      pr_wait: [],
      done: [],
      attempts: {},
      placement_status: Object.fromEntries(
        display_order.map((id) => [id, { state: 'ready' }])
      ),
      ...queue_patch
    };
    const store = storeStandIn(relations);
    /** @type {any} */
    let latest = start;
    const transport = vi.fn(async (type, payload) => {
      latest = store(latest, type, payload);
      return { applied: true, conflict: false, queue: latest };
    });
    const shown = recompute(start, display_order).order;
    const result = await sendPlacementBatch({
      transport,
      root_dir: '',
      shown,
      queue: start,
      recompute,
      adopt: () => {},
      snapshot: () => latest
    });
    return { result, shown, latest };
  }

  test('finishes a batch apply of a predecessor and its bundle partner without moved', async () => {
    const { result } = await applyAll(
      ['C-1', 'C-2'],
      [fixed('C-1', 'S-1', 'blocks'), fixed('C-1', 'C-2', 'file')]
    );

    expect(result).toEqual({ placed: ['C-2', 'C-1'], stopped: null });
  });

  test('finishes a batch apply of a predecessor and a bundle in a serial lane without moved', async () => {
    const { result, latest } = await applyAll(
      ['C-1', 'C-2', 'C-3'],
      [
        fixed('C-1', 'S-1', 'blocks'),
        fixed('C-1', 'C-2', 'file'),
        fixed('C-2', 'C-3', 'file')
      ]
    );

    expect(result.stopped).toBeNull();
    expect({
      parallel: latest.queue.map((/** @type {any} */ e) => e.bead_id),
      s2: latest.serial_lanes[1].entries.map(
        (/** @type {any} */ e) => e.bead_id
      )
    }).toEqual({ parallel: ['C-1'], s2: ['C-2', 'C-3'] });
  });

  test('finishes a batch apply when a chosen candidate blocks the predecessor', async () => {
    const { result, latest } = await applyAll(
      ['C-1', 'C-2'],
      [
        fixed('C-1', 'S-1', 'blocks'),
        fixed('C-2', 'C-1', 'blocks'),
        fixed('C-2', 'S-1', 'file')
      ]
    );

    expect(result.stopped).toBeNull();
    expect({
      parallel: latest.queue.map((/** @type {any} */ e) => e.bead_id),
      s1: latest.serial_lanes[0].entries.map(
        (/** @type {any} */ e) => e.bead_id
      )
    }).toEqual({ parallel: ['C-1'], s1: ['S-1', 'C-2'] });
  });
});

describe('bundle sends (UI-blx2 §3.7)', () => {
  /**
   * A jev conflict between two beads.
   *
   * @param {string} x
   * @param {string} y
   * @returns {[string, Record<string, any>]}
   */
  function conflict(x, y) {
    const [a, b] = x < y ? [x, y] : [y, x];
    return [
      placementPairKey(a, b),
      {
        a,
        b,
        relation: 'conflict',
        source: 'jev',
        confidence: 0.9,
        jev_choice: 'conflict',
        judged_at: 1
      }
    ];
  }

  /**
   * A running implementation attempt without a serial lane.
   *
   * @param {string} bead_id
   * @returns {[string, Record<string, any>]}
   */
  function running(bead_id) {
    return [
      `att-${bead_id}`,
      {
        attempt_id: `att-${bead_id}`,
        bead_id,
        kind: 'implementation',
        status: 'running',
        started_at: 10,
        serial_lane_id: null
      }
    ];
  }

  /**
   * @param {string[]} display_order
   * @param {Record<string, any>} [over]
   * @returns {any}
   */
  function startQueue(display_order, over = {}) {
    return {
      revision: 1,
      queue: [],
      serial_lane_count: 3,
      serial_lanes: [
        { id: 's1', entries: [{ bead_id: 'S-1', added_at: 1 }] },
        { id: 's2', entries: [] },
        { id: 's3', entries: [] }
      ],
      lane_states: {},
      pr_wait: [],
      done: [],
      attempts: {},
      placement_status: Object.fromEntries(
        display_order.map((id) => [id, { state: 'ready' }])
      ),
      ...over
    };
  }

  /**
   * @param {Record<string, any>} relations
   * @param {string[]} display_order
   * @returns {(queue: any, chosen: string[]) => import('./compute.js').PlacementPlan}
   */
  function recomputeWith(relations, display_order) {
    return (queue, chosen) =>
      computePlacement({ queue, relations, display_order, chosen });
  }

  test('sends a bundle as one worker-queue-place-bundle with its bind and steps', async () => {
    const relations = Object.fromEntries([
      conflict('C-1', 'P-1'),
      conflict('C-1', 'R-1')
    ]);
    const recompute = recomputeWith(relations, ['C-1']);
    const start = startQueue(['C-1'], {
      queue: [{ bead_id: 'P-1', added_at: 1 }],
      attempts: Object.fromEntries([running('R-1')])
    });
    const transport = vi
      .fn()
      .mockResolvedValue({ applied: true, conflict: false, queue: null });

    await sendPlacementBatch({
      transport,
      root_dir: '/repo',
      shown: recompute(start, ['C-1']).order,
      queue: start,
      recompute,
      adopt: () => {},
      snapshot: () => start
    });

    expect(transport.mock.calls).toEqual([
      [
        'worker-queue-place-bundle',
        {
          lane: 's2',
          binds: ['R-1'],
          steps: [
            { bead_id: 'P-1', index: 0 },
            { bead_id: 'C-1', index: 1 }
          ],
          root_dir: '/repo',
          expected_revision: 1
        }
      ]
    ]);
  });

  test('finishes [전체 적용] of a move bundle, a bind bundle and a lone place over the reply snapshots', async () => {
    const display_order = ['C-1', 'C-2', 'C-3'];
    const relations = Object.fromEntries([
      conflict('C-1', 'P-1'),
      conflict('C-2', 'R-1')
    ]);
    const recompute = recomputeWith(relations, display_order);
    const start = startQueue(display_order, {
      queue: [
        { bead_id: 'P-1', added_at: 1 },
        { bead_id: 'R-1', added_at: 2 }
      ],
      attempts: Object.fromEntries([running('R-1')])
    });
    const store = storeStandIn(relations);
    /** @type {any} */
    let latest = start;
    const transport = vi.fn(async (type, payload) => {
      latest = store(latest, type, payload);
      return { applied: true, conflict: false, queue: latest };
    });

    const result = await sendPlacementBatch({
      transport,
      root_dir: '',
      shown: recompute(start, display_order).order,
      queue: start,
      recompute,
      adopt: () => {},
      snapshot: () => latest
    });

    expect(result).toEqual({ placed: ['C-1', 'C-2', 'C-3'], stopped: null });
    expect({
      types: transport.mock.calls.map((call) => call[0]),
      parallel: latest.queue.map((/** @type {any} */ e) => e.bead_id),
      s2: latest.serial_lanes[1].entries.map(
        (/** @type {any} */ e) => e.bead_id
      ),
      s3: latest.serial_lanes[2].entries.map(
        (/** @type {any} */ e) => e.bead_id
      )
    }).toEqual({
      types: [
        'worker-queue-place-bundle',
        'worker-queue-place-bundle',
        'worker-queue-place'
      ],
      parallel: ['C-3'],
      s2: ['P-1', 'C-1'],
      s3: ['R-1', 'C-2']
    });
  });

  test('stops as moved without sending when the partner started before its bundle', async () => {
    const relations = Object.fromEntries([conflict('C-1', 'P-1')]);
    const recompute = recomputeWith(relations, ['C-1']);
    const start = startQueue(['C-1'], {
      queue: [{ bead_id: 'P-1', added_at: 1 }]
    });
    const started = {
      ...start,
      revision: 2,
      attempts: Object.fromEntries([running('P-1')])
    };
    const transport = vi.fn();

    const result = await sendPlacementBatch({
      transport,
      root_dir: '',
      shown: recompute(start, ['C-1']).order,
      queue: started,
      recompute,
      adopt: () => {},
      snapshot: () => started
    });

    expect(transport).not.toHaveBeenCalled();
    expect(result.stopped).toMatchObject({ id: 'C-1', cause: 'moved' });
  });

  test('stops on a refused bundle with the store reason and the bundles already in', async () => {
    const display_order = ['C-1', 'C-2'];
    const relations = Object.fromEntries([conflict('C-2', 'P-1')]);
    const recompute = recomputeWith(relations, display_order);
    const start = startQueue(display_order, {
      queue: [{ bead_id: 'P-1', added_at: 1 }]
    });
    const store = storeStandIn(relations);
    /** @type {any} */
    let latest = start;
    const transport = vi.fn(async (type, payload) => {
      if (type === 'worker-queue-place-bundle') {
        return {
          applied: false,
          conflict: false,
          reason: 'member_occupant',
          queue: latest
        };
      }
      latest = store(latest, type, payload);
      return { applied: true, conflict: false, queue: latest };
    });

    const result = await sendPlacementBatch({
      transport,
      root_dir: '',
      shown: recompute(start, display_order).order,
      queue: start,
      recompute,
      adopt: () => {},
      snapshot: () => latest
    });

    expect(result.placed).toEqual(['C-1']);
    expect(result.stopped).toMatchObject({ id: 'C-2', cause: 'refused' });
    expect(
      placementSendNotice(/** @type {any} */ (result.stopped).result)
    ).toBe('큐 적재 거부: member_occupant');
  });

  test('stops with the unsupported-server notice when the server answers unknown_type', async () => {
    const relations = Object.fromEntries([conflict('C-1', 'P-1')]);
    const recompute = recomputeWith(relations, ['C-1']);
    const start = startQueue(['C-1'], {
      queue: [{ bead_id: 'P-1', added_at: 1 }]
    });
    const transport = vi.fn().mockRejectedValue({
      code: 'unknown_type',
      message: 'Unknown message type: worker-queue-place-bundle'
    });

    const result = await sendPlacementBatch({
      transport,
      root_dir: '',
      shown: recompute(start, ['C-1']).order,
      queue: start,
      recompute,
      adopt: () => {},
      snapshot: () => start
    });

    expect(result).toMatchObject({
      placed: [],
      stopped: { id: 'C-1', cause: 'unsupported' }
    });
    expect(
      placementSendNotice(/** @type {any} */ (result.stopped).result)
    ).toBe('서버가 묶음 배치를 지원하지 않음');
  });

  test('grows the serial lanes once before a single bundle into a new lane', async () => {
    const relations = Object.fromEntries([conflict('C-1', 'P-1')]);
    const recompute = recomputeWith(relations, ['C-1']);
    const start = startQueue(['C-1'], {
      queue: [{ bead_id: 'P-1', added_at: 1 }],
      serial_lane_count: 1,
      serial_lanes: [{ id: 's1', entries: [{ bead_id: 'S-1', added_at: 1 }] }]
    });
    const store = storeStandIn(relations);
    /** @type {any} */
    let latest = start;
    const transport = vi.fn(async (type, payload) => {
      latest = store(latest, type, payload);
      return { applied: true, conflict: false, queue: latest };
    });

    const result = await sendPlacementBatch({
      transport,
      root_dir: '',
      shown: recompute(start, ['C-1']).order,
      queue: start,
      recompute,
      adopt: () => {},
      snapshot: () => latest
    });

    expect(result.stopped).toBeNull();
    expect(transport.mock.calls).toEqual([
      [
        'worker-queue-set-serial-lane-count',
        { count: 2, expected_revision: 1 }
      ],
      [
        'worker-queue-place-bundle',
        {
          lane: 's2',
          binds: [],
          steps: [
            { bead_id: 'P-1', index: 0 },
            { bead_id: 'C-1', index: 1 }
          ],
          expected_revision: 2
        }
      ]
    ]);
  });
});

describe('[전체 적용] with preferences (UI-unf5 §3.8)', () => {
  /**
   * A jev relation between two beads; `prefer_first`, when given, is the
   * bead an adopted preference lands first.
   *
   * @param {string} x
   * @param {string} y
   * @param {'independent'|'conflict'} relation
   * @param {string} [prefer_first]
   * @returns {[string, Record<string, any>]}
   */
  function jev(x, y, relation, prefer_first) {
    const [a, b] = x < y ? [x, y] : [y, x];
    return [
      placementPairKey(a, b),
      {
        a,
        b,
        relation,
        source: 'jev',
        confidence: 0.9,
        jev_choice: relation,
        judged_at: 1,
        ...(prefer_first
          ? { prefer: prefer_first === a ? 'a' : 'b', prefer_confidence: 0.8 }
          : {})
      }
    ];
  }

  /**
   * @param {string[]} display_order
   * @param {Record<string, any>} relations
   * @returns {any}
   */
  function startQueue(display_order, relations) {
    return {
      revision: 1,
      queue: [],
      serial_lane_count: 2,
      serial_lanes: [
        { id: 's1', entries: [{ bead_id: 'S-1', added_at: 1 }] },
        { id: 's2', entries: [] }
      ],
      lane_states: {},
      pr_wait: [],
      done: [],
      attempts: {},
      placement_relations: relations,
      placement_status: Object.fromEntries(
        display_order.map((id) => [id, { state: 'ready' }])
      )
    };
  }

  /**
   * The tabs' recompute: the reply snapshot's own relations, with the
   * display order and priorities the table was computed with.
   *
   * @param {string[]} display_order
   * @param {Record<string, number>} priority
   * @returns {(queue: any, chosen: string[]) => import('./compute.js').PlacementPlan}
   */
  function recomputeWith(display_order, priority) {
    return (queue, chosen) =>
      computePlacement({
        queue,
        relations: queue.placement_relations,
        display_order,
        priority,
        chosen
      });
  }

  test('lands every bundle of a plan with preferences on its table place without moved', async () => {
    // Lone parallel D = C-1, A = C-2, B = C-3, C = C-4 with preferences
    // A→B→C→A and A→D; the C-5/C-6 bundle goes first by priority and its
    // steps follow C-6's preference against that priority.
    const display_order = ['C-1', 'C-2', 'C-3', 'C-4', 'C-5', 'C-6'];
    const priority = { 'C-5': 1, 'C-6': 2 };
    const relations = Object.fromEntries([
      jev('C-2', 'C-3', 'independent', 'C-2'),
      jev('C-3', 'C-4', 'independent', 'C-3'),
      jev('C-4', 'C-2', 'independent', 'C-4'),
      jev('C-2', 'C-1', 'independent', 'C-2'),
      jev('C-1', 'C-3', 'independent'),
      jev('C-1', 'C-4', 'independent'),
      jev('C-5', 'C-6', 'conflict', 'C-6')
    ]);
    const start = startQueue(display_order, relations);
    const recompute = recomputeWith(display_order, priority);
    const shown = recompute(start, display_order).order;
    const store = storeStandIn(relations);
    /** @type {any} */
    let latest = start;
    const transport = vi.fn(async (type, payload) => {
      latest = store(latest, type, payload);
      return { applied: true, conflict: false, queue: latest };
    });

    const result = await sendPlacementBatch({
      transport,
      root_dir: '',
      shown,
      queue: start,
      recompute,
      adopt: () => {},
      snapshot: () => latest
    });

    expect(shown.map((item) => [item.id, item.lane, item.before])).toEqual([
      ['C-6', 's2', null],
      ['C-5', 's2', 'C-6'],
      ['C-2', 'parallel', null],
      ['C-1', 'parallel', 'C-2'],
      ['C-3', 'parallel', 'C-1'],
      ['C-4', 'parallel', 'C-3']
    ]);
    expect(result).toEqual({
      placed: ['C-6', 'C-5', 'C-2', 'C-1', 'C-3', 'C-4'],
      stopped: null
    });
    expect({
      parallel: latest.queue.map((/** @type {any} */ e) => e.bead_id),
      s2: latest.serial_lanes[1].entries.map(
        (/** @type {any} */ e) => e.bead_id
      )
    }).toEqual({ parallel: ['C-2', 'C-1', 'C-3', 'C-4'], s2: ['C-6', 'C-5'] });
  });

  test('stops as moved when a reply snapshot carries a new preference that changes the plan', async () => {
    const display_order = ['C-1', 'C-2', 'C-3'];
    const relations = Object.fromEntries([
      jev('C-1', 'C-2', 'independent'),
      jev('C-1', 'C-3', 'independent'),
      jev('C-2', 'C-3', 'independent')
    ]);
    const start = startQueue(display_order, relations);
    const recompute = recomputeWith(display_order, {});
    const shown = recompute(start, display_order).order;
    const store = storeStandIn(relations);
    /** @type {any} */
    let latest = start;
    const transport = vi.fn(async (type, payload) => {
      latest = {
        ...store(latest, type, payload),
        placement_relations: Object.fromEntries([
          jev('C-1', 'C-2', 'independent'),
          jev('C-1', 'C-3', 'independent'),
          jev('C-2', 'C-3', 'independent', 'C-3')
        ])
      };
      return { applied: true, conflict: false, queue: latest };
    });

    const result = await sendPlacementBatch({
      transport,
      root_dir: '',
      shown,
      queue: start,
      recompute,
      adopt: () => {},
      snapshot: () => latest
    });

    expect(shown.map((item) => item.id)).toEqual(['C-1', 'C-2', 'C-3']);
    expect(result.placed).toEqual(['C-1']);
    expect(result.stopped).toMatchObject({ id: 'C-2', cause: 'moved' });
    expect(transport).toHaveBeenCalledOnce();
  });
});
