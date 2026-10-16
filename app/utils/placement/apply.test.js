/** @vitest-environment node */
import { describe, expect, test, vi } from 'vitest';
import { sendPlacement, sendPlacementBatch } from './apply.js';

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
    warnings: [],
    only_unknown: false,
    judged_at: null,
    ...over
  };
}

/**
 * A recompute stub: every snapshot names the place each candidate gets on it.
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
    layout: {}
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
    const transport = vi
      .fn()
      .mockResolvedValue({
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

  test('stops on a second conflict', async () => {
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

    expect(transport).toHaveBeenCalledTimes(2);
    expect(result.status).toBe('moved');
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
    const transport = vi
      .fn()
      .mockResolvedValue({
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
    const transport = vi
      .fn()
      .mockResolvedValue({
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
