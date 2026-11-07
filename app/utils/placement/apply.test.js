/** @vitest-environment node */
import { describe, expect, test, vi } from 'vitest';
import { placementPairKey } from '../../../server/placement/wire.js';
import {
  placementSendNotice,
  sendPlacement,
  sendPlacementBatch
} from './apply.js';
import { computePlacement } from './compute.js';

/**
 * @param {string} id
 * @param {Partial<import('./compute.js').PlannedPlacement>} [over]
 * @returns {import('./compute.js').PlannedPlacement}
 */
function placed(id, over = {}) {
  return {
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
    ...over
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
    const second = placed('C-2', { before: 'C-1', index: 1 });
    const third = placed('C-3', { before: 'C-2', index: 2 });
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
    const second = placed('C-2', { before: 'C-1', index: 1 });
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
    const second = placed('C-2', { before: 'C-1', index: 1 });
    const start = { revision: 3, places: { 'C-1': first, 'C-2': second } };
    const after_first = {
      revision: 4,
      places: { 'C-2': placed('C-2', { before: 'X-1' }) }
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

describe('sendPlacementBatch over the real computation (UI-ey6v §3.4)', () => {
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
   * Run `[전체 적용]` against a stand-in for the store's `place`: it splices at
   * the sent index and takes the bead off the candidates, so each recompute reads
   * the bead as a member the way the next snapshot does.
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
    /** @type {any} */
    let latest = start;
    const transport = vi.fn(async (_type, payload) => {
      const next = structuredClone(latest);
      const entries =
        payload.lane === 'parallel'
          ? next.queue
          : next.serial_lanes.find(
              (/** @type {any} */ lane) => lane.id === payload.lane
            ).entries;
      entries.splice(payload.index, 0, {
        bead_id: payload.bead_id,
        added_at: next.revision
      });
      delete next.placement_status[payload.bead_id];
      next.revision += 1;
      latest = next;
      return { applied: true, conflict: false, queue: next };
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
