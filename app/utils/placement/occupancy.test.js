/** @vitest-environment node */
import { describe, expect, test } from 'vitest';
import {
  LANE_RELEASING_ATTEMPT_STATUSES as STORE_RELEASING,
  TERMINAL_ATTEMPT_STATUSES as STORE_TERMINAL,
  attemptHoldsSerialLane,
  laneHoldFacts
} from '../../../server/worker/queue-store.js';
import {
  LANE_RELEASING_ATTEMPT_STATUSES,
  TERMINAL_ATTEMPT_STATUSES,
  occupancyReader
} from './occupancy.js';

/**
 * Implementation attempts of one bead, oldest first.
 *
 * @param {string[]} statuses
 * @returns {Record<string, any>}
 */
function history(statuses) {
  return Object.fromEntries(
    statuses.map((status, at) => [
      `att-${at}`,
      {
        attempt_id: `att-${at}`,
        bead_id: 'X-1',
        kind: 'implementation',
        status,
        started_at: 100 + at,
        finished_at: status === 'running' ? null : 110 + at,
        serial_lane_id: null
      }
    ])
  );
}

describe('occupancy status sets', () => {
  test('copies the store terminal statuses', () => {
    expect([...TERMINAL_ATTEMPT_STATUSES].sort()).toEqual(
      [...STORE_TERMINAL].sort()
    );
  });

  test('copies the store lane-releasing statuses', () => {
    expect([...LANE_RELEASING_ATTEMPT_STATUSES].sort()).toEqual(
      [...STORE_RELEASING].sort()
    );
  });
});

describe('occupancyReader', () => {
  test.each([
    [['running']],
    [['paused']],
    [['failed']],
    [['parked']],
    [['retry_wait']],
    [['waiting']],
    [['done']],
    [['failed', 'done']],
    [['done', 'failed']]
  ])(
    'agrees with the store on whether %j would bind',
    (/** @type {string[]} */ statuses) => {
      const attempts = history(statuses);
      const facts = laneHoldFacts({ attempts });
      const store_holds = Object.values(attempts).some((attempt) =>
        attemptHoldsSerialLane(attempt, facts)
      );

      const read = occupancyReader({ attempts }, new Map())('X-1');

      expect(read.bindable).toBe(store_holds);
    }
  );

  test('reads a dismissed latest failure as still holding', () => {
    const attempts = history(['failed']);
    attempts['att-0'].dismissed_at = 200;

    const read = occupancyReader({ attempts }, new Map())('X-1');

    expect(read).toMatchObject({ occupant: true, bindable: true });
  });

  test('reads a shelved PR wait as an occupant it cannot bind', () => {
    const queue = {
      attempts: history(['done']),
      pr_wait: [{ bead_id: 'X-1' }],
      merge_shelved: { 'X-1': { at: 1 } }
    };

    const read = occupancyReader(queue, new Map())('X-1');

    expect(read).toMatchObject({ occupant: true, bindable: false });
  });

  test('reads the serial lane a stamped attempt holds', () => {
    const attempts = history(['running']);
    attempts['att-0'].serial_lane_id = 's2';

    const read = occupancyReader({ attempts }, new Map())('X-1');

    expect(read).toMatchObject({ held_lane: 's2', bindable: false });
  });
});
