/**
 * The overlay the merge lane is judged from (UI-7agi §2) — and specifically
 * what it must NOT resurrect (UI-wwby §2).
 */
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { overlaidPrWait } from './merge-candidates.js';
import { getWorkerRuntime } from './runtime.js';

const WS = '/tmp/example-workspace/merge-candidates';

/**
 * @param {{ pr_wait?: any[], queue?: any[], done?: any[] }} lanes
 */
function queueOf(lanes) {
  return {
    pr_wait: lanes.pr_wait || [],
    queue: lanes.queue || [],
    done: lanes.done || []
  };
}

/**
 * @param {string[]} bead_ids
 */
function registry(bead_ids) {
  getWorkerRuntime().externalPrs.replace(
    WS,
    bead_ids.map((bead_id, i) => ({
      bead_id,
      pr_url: `https://github.com/o/r/pull/${i + 1}`,
      pr_number: i + 1
    }))
  );
}

beforeEach(() => {
  getWorkerRuntime().externalPrs.clear();
});

afterEach(() => {
  getWorkerRuntime().externalPrs.clear();
});

describe('worker/merge-candidates — overlaidPrWait', () => {
  test('lays an external row over an empty lane', () => {
    registry(['UI-9']);

    expect(overlaidPrWait(WS, queueOf({}))).toEqual([
      { bead_id: 'UI-9', external: true }
    ]);
  });

  test('yields to the durable pr_wait entry for the same bead', () => {
    registry(['UI-1']);

    expect(
      overlaidPrWait(WS, queueOf({ pr_wait: [{ bead_id: 'UI-1' }] }))
    ).toEqual([{ bead_id: 'UI-1', external: false }]);
  });

  // UI-wwby §2 — the registry is replaced whole every poller tick, so it stays
  // stale for up to one period after a bead merges out of `pr_wait`. Without
  // this the stale row put a `done` bead back in front of the merge queue.
  test('yields to a bead already in done', () => {
    registry(['UI-1']);

    expect(
      overlaidPrWait(WS, queueOf({ done: [{ bead_id: 'UI-1' }] }))
    ).toEqual([]);
  });

  test('yields to a bead already in the waiting queue', () => {
    registry(['UI-1']);

    expect(
      overlaidPrWait(WS, queueOf({ queue: [{ bead_id: 'UI-1' }] }))
    ).toEqual([]);
  });

  test('keeps external rows that belong to no lane at all', () => {
    registry(['UI-1', 'UI-9']);

    expect(
      overlaidPrWait(WS, queueOf({ done: [{ bead_id: 'UI-1' }] }))
    ).toEqual([{ bead_id: 'UI-9', external: true }]);
  });

  test('emits a pr_wait entry even when another lane also holds it', () => {
    // A corrupted snapshot must still render its lane: the overlay widened its
    // YIELD set, not the rule for what `pr_wait` itself contributes.
    expect(
      overlaidPrWait(
        WS,
        queueOf({ pr_wait: [{ bead_id: 'UI-1' }], done: [{ bead_id: 'UI-1' }] })
      )
    ).toEqual([{ bead_id: 'UI-1', external: false }]);
  });
});
