import { describe, expect, test } from 'vitest';
import {
  activeBeadIds,
  sessionOwnershipMaterial
} from '../../app/utils/active-attempts.js';
import {
  doneAtByBead,
  sessionExcludedBeadIds,
  sessionOwnershipOf
} from './lane-membership.js';

/**
 * A decorated snapshot of one failed seat on `UI-1` that a newer session
 * took over through a session-owned external wait (UI-68r5 §3.4), with the
 * `session_ownership` decoration the worker channel ships.
 *
 * @param {Record<string, any>} [patch] - Lane fields laid over the snapshot.
 * @returns {Record<string, any>}
 */
function yieldedSnapshot(patch = {}) {
  const attempts = {
    a1: {
      attempt_id: 'a1',
      bead_id: 'UI-1',
      status: 'failed',
      cause: 'stale_work_unresolved',
      finished_at: Date.parse('2026-11-07T01:42:25.000Z'),
      bead_session_ref: ''
    }
  };
  return {
    queue: [],
    pr_wait: [],
    done: [],
    serial_lanes: [],
    attempts,
    session_ownership: sessionOwnershipMaterial({
      attempts,
      external_waits: [
        {
          wait_id: 'w-0123456789ab',
          bead_id: 'UI-1',
          owner: { kind: 'session', session_ref: 'claude:successor@host' },
          stage: 'hold',
          registered_at: '2026-11-07T01:50:00.000Z'
        }
      ]
    }),
    ...patch
  };
}

describe('session exclusion of a yielded failure (UI-68r5 §3.4)', () => {
  test('drops the yielded bead from the session exclusion set and running count', () => {
    const snapshot = yieldedSnapshot();

    const excluded = sessionExcludedBeadIds(snapshot);
    const running = activeBeadIds(
      snapshot.attempts,
      doneAtByBead(snapshot),
      sessionOwnershipOf(snapshot)
    );

    expect([[...excluded], [...running]]).toEqual([[], []]);
  });

  test('drops a yielded bead that still sits in the queue lane from the session exclusion set', () => {
    const snapshot = yieldedSnapshot({
      queue: [{ bead_id: 'UI-1', added_at: 1 }]
    });

    const excluded = sessionExcludedBeadIds(snapshot);

    expect(excluded.has('UI-1')).toBe(false);
  });

  test('drops a yielded bead that still sits in a serial lane from the session exclusion set', () => {
    const snapshot = yieldedSnapshot({
      serial_lanes: [{ id: 's1', entries: [{ bead_id: 'UI-1', added_at: 1 }] }]
    });

    const excluded = sessionExcludedBeadIds(snapshot);

    expect(excluded.has('UI-1')).toBe(false);
  });

  test('keeps the lane membership of a yielded bead', () => {
    const snapshot = yieldedSnapshot({
      queue: [{ bead_id: 'UI-1', added_at: 1 }]
    });

    sessionExcludedBeadIds(snapshot);

    expect(snapshot.queue).toEqual([{ bead_id: 'UI-1', added_at: 1 }]);
  });

  test('excludes the failed bead of a snapshot without ownership material', () => {
    const snapshot = yieldedSnapshot({ session_ownership: undefined });

    const excluded = sessionExcludedBeadIds(snapshot);

    expect([...excluded]).toEqual(['UI-1']);
  });
});
