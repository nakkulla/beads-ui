import { describe, expect, test } from 'vitest';
import {
  HOLD_HISTORY_WINDOW_MS,
  RETRY_DELAYS_MS,
  dueRetries,
  earliestRetryAt,
  normalizeHoldState,
  reduceQueueHold
} from './queue-hold.js';

const API_CAUSE = 'session_failed:is_error:api';
const SPAWN_CAUSE = 'verify_cmd_spawn_error';

/**
 * @param {string} bead_id
 * @param {number} at
 * @param {Object} [overrides]
 * @returns {any}
 */
function envFailure(bead_id, at, overrides) {
  return {
    kind: 'env_failure',
    bead_id,
    attempt_id: `att-${bead_id}-${at}`,
    cause: API_CAUSE,
    at,
    ...overrides
  };
}

describe('queue hold env ladder', () => {
  test('holds the queue on the first env failure', () => {
    const { state, effects } = reduceQueueHold(
      normalizeHoldState(null),
      envFailure('UI-1', 1000),
      1000
    );

    expect(state.hold).toEqual({
      kind: 'env',
      cause: API_CAUSE,
      since: 1000,
      bead_ids: ['UI-1'],
      halted_by_attempt_id: null
    });
    expect(effects).toEqual([
      {
        kind: 'retry_scheduled',
        bead_id: 'UI-1',
        origin_attempt_id: 'att-UI-1-1000',
        next_at: 1000 + RETRY_DELAYS_MS[0],
        attempts: 1
      }
    ]);
  });

  test('does not mutate the state it was given', () => {
    const before = normalizeHoldState(null);

    reduceQueueHold(before, envFailure('UI-1', 1000), 1000);

    expect(before).toEqual({ hold: null, lineages: [], hold_history: [] });
  });

  test('carries the origin attempt through a retry failure', () => {
    const first = reduceQueueHold(
      normalizeHoldState(null),
      envFailure('UI-1', 0),
      0
    );

    const second = reduceQueueHold(
      first.state,
      envFailure('UI-1', 200000, {
        attempt_id: 'att-retry-1',
        origin_attempt_id: 'att-UI-1-0'
      }),
      200000
    );

    expect(second.state.lineages).toEqual([
      {
        bead_id: 'UI-1',
        origin_attempt_id: 'att-UI-1-0',
        cause: API_CAUSE,
        next_at: 200000 + RETRY_DELAYS_MS[1],
        attempts: 2
      }
    ]);
  });

  test('removes only the recovered lineage', () => {
    const first = reduceQueueHold(
      normalizeHoldState(null),
      envFailure('UI-1', 0),
      0
    );
    const second = reduceQueueHold(
      first.state,
      envFailure('UI-2', 1000, { cause: SPAWN_CAUSE }),
      1000
    );

    const { state } = reduceQueueHold(
      second.state,
      { kind: 'retry_succeeded', bead_id: 'UI-1', at: 2000 },
      2000
    );

    expect(state.lineages.map((lineage) => lineage.bead_id)).toEqual(['UI-2']);
  });

  test('keeps the hold while another cause lineage is still open', () => {
    const first = reduceQueueHold(
      normalizeHoldState(null),
      envFailure('UI-1', 0),
      0
    );
    const second = reduceQueueHold(
      first.state,
      envFailure('UI-2', 1000, { cause: SPAWN_CAUSE }),
      1000
    );

    const { state } = reduceQueueHold(
      second.state,
      { kind: 'retry_succeeded', bead_id: 'UI-1', at: 2000 },
      2000
    );

    expect(state.hold).toMatchObject({ kind: 'env', bead_ids: ['UI-2'] });
  });

  test('releases the hold when the last lineage recovers', () => {
    const first = reduceQueueHold(
      normalizeHoldState(null),
      envFailure('UI-1', 0),
      0
    );

    const { state } = reduceQueueHold(
      first.state,
      { kind: 'retry_succeeded', bead_id: 'UI-1', at: 2000 },
      2000
    );

    expect({ hold: state.hold, lineages: state.lineages }).toEqual({
      hold: null,
      lineages: []
    });
  });

  test('keeps the failure history after a recovery', () => {
    const first = reduceQueueHold(
      normalizeHoldState(null),
      envFailure('UI-1', 0),
      0
    );

    const { state } = reduceQueueHold(
      first.state,
      { kind: 'retry_succeeded', bead_id: 'UI-1', at: 2000 },
      2000
    );

    expect(state.hold_history).toEqual([
      { bead_id: 'UI-1', cause: API_CAUSE, at: 0 }
    ]);
  });
});

describe('queue hold promotion', () => {
  test('promotes to systemic when a lineage exhausts its attempts', () => {
    const first = reduceQueueHold(
      normalizeHoldState(null),
      envFailure('UI-1', 0),
      0
    );
    const second = reduceQueueHold(
      first.state,
      envFailure('UI-1', 200000),
      200000
    );

    const third = reduceQueueHold(
      second.state,
      envFailure('UI-1', 600000, { attempt_id: 'att-last' }),
      600000
    );

    expect(third.state.hold).toEqual({
      kind: 'systemic',
      cause: API_CAUSE,
      since: 600000,
      bead_ids: ['UI-1'],
      halted_by_attempt_id: 'att-last'
    });
    expect(third.effects).toEqual([
      { kind: 'attempt_failed', attempt_id: 'att-last' },
      { kind: 'promoted', cause: API_CAUSE }
    ]);
  });

  test('promotes when another bead fails on the same cause', () => {
    const first = reduceQueueHold(
      normalizeHoldState(null),
      envFailure('UI-1', 0),
      0
    );

    const second = reduceQueueHold(
      first.state,
      envFailure('UI-2', 60000, { attempt_id: 'att-2' }),
      60000
    );

    expect(second.state.hold).toMatchObject({
      kind: 'systemic',
      cause: API_CAUSE,
      bead_ids: ['UI-1', 'UI-2'],
      halted_by_attempt_id: 'att-2'
    });
    expect(second.effects.map((effect) => effect.kind)).toEqual([
      'attempt_failed',
      'promoted'
    ]);
  });

  test('promotes on a repeat 29 minutes after a cleared history entry', () => {
    const at = 29 * 60 * 1000;
    const state = normalizeHoldState({
      hold: null,
      lineages: [],
      hold_history: [{ bead_id: 'UI-1', cause: API_CAUSE, at: 0 }]
    });

    const { state: next } = reduceQueueHold(state, envFailure('UI-2', at), at);

    expect(next.hold).toMatchObject({
      kind: 'systemic',
      bead_ids: ['UI-1', 'UI-2']
    });
  });

  test('starts a fresh env hold 31 minutes after a cleared history entry', () => {
    const at = 31 * 60 * 1000;
    const state = normalizeHoldState({
      hold: null,
      lineages: [],
      hold_history: [{ bead_id: 'UI-1', cause: API_CAUSE, at: 0 }]
    });

    const { state: next } = reduceQueueHold(state, envFailure('UI-2', at), at);

    expect(next.hold).toMatchObject({ kind: 'env', bead_ids: ['UI-2'] });
  });

  test('fails an attempt without a new lineage while systemic', () => {
    const first = reduceQueueHold(
      normalizeHoldState(null),
      envFailure('UI-1', 0),
      0
    );
    const promoted = reduceQueueHold(
      first.state,
      envFailure('UI-2', 60000),
      60000
    );

    const later = reduceQueueHold(
      promoted.state,
      envFailure('UI-3', 70000, { attempt_id: 'att-3' }),
      70000
    );

    expect(later.effects).toEqual([
      { kind: 'attempt_failed', attempt_id: 'att-3' }
    ]);
    expect(later.state.hold?.bead_ids).toEqual(['UI-1', 'UI-2', 'UI-3']);
  });
});

describe('queue hold user actions', () => {
  test('resume clears the hold and lists every held bead', () => {
    const first = reduceQueueHold(
      normalizeHoldState(null),
      envFailure('UI-1', 0),
      0
    );
    const promoted = reduceQueueHold(
      first.state,
      envFailure('UI-2', 60000),
      60000
    );

    const resumed = reduceQueueHold(
      promoted.state,
      { kind: 'resume', at: 70000 },
      70000
    );

    expect(resumed.effects).toEqual([
      { kind: 'redispatch', bead_ids: ['UI-1', 'UI-2'] }
    ]);
    expect(resumed.state).toEqual({
      hold: null,
      lineages: [],
      hold_history: []
    });
  });

  test('resume without a hold is a no-op', () => {
    const state = normalizeHoldState(null);

    const resumed = reduceQueueHold(state, { kind: 'resume', at: 10 }, 10);

    expect(resumed.effects).toEqual([]);
  });

  test('retry_now makes every env lineage due immediately', () => {
    const first = reduceQueueHold(
      normalizeHoldState(null),
      envFailure('UI-1', 0),
      0
    );

    const { state } = reduceQueueHold(
      first.state,
      { kind: 'retry_now', at: 5000 },
      5000
    );

    expect(dueRetries(state, 5000).map((lineage) => lineage.bead_id)).toEqual([
      'UI-1'
    ]);
  });

  test('retry_now leaves a systemic stop alone', () => {
    const first = reduceQueueHold(
      normalizeHoldState(null),
      envFailure('UI-1', 0),
      0
    );
    const promoted = reduceQueueHold(
      first.state,
      envFailure('UI-2', 60000),
      60000
    );

    const { state } = reduceQueueHold(
      promoted.state,
      { kind: 'retry_now', at: 70000 },
      70000
    );

    expect(state.lineages).toEqual(promoted.state.lineages);
  });

  test('retry_dispatched marks the lineage in flight', () => {
    const first = reduceQueueHold(
      normalizeHoldState(null),
      envFailure('UI-1', 0),
      0
    );

    const { state } = reduceQueueHold(
      first.state,
      { kind: 'retry_dispatched', bead_id: 'UI-1', attempt_id: 'att-2', at: 1 },
      1
    );

    expect(state.lineages[0].next_at).toBeNull();
    expect(earliestRetryAt(state)).toBeNull();
  });

  test('reports the earliest pending retry', () => {
    const first = reduceQueueHold(
      normalizeHoldState(null),
      envFailure('UI-1', 0),
      0
    );
    const second = reduceQueueHold(
      first.state,
      envFailure('UI-2', 1000, { cause: SPAWN_CAUSE }),
      1000
    );

    expect(earliestRetryAt(second.state)).toEqual(RETRY_DELAYS_MS[0]);
  });

  test('ignores an unknown event kind', () => {
    const state = normalizeHoldState(null);

    const result = reduceQueueHold(
      state,
      /** @type {any} */ ({ kind: '?' }),
      5
    );

    expect(result).toEqual({ state, effects: [] });
  });
});

describe('queue hold state normalization', () => {
  test('returns an empty state for missing durable fields', () => {
    expect(normalizeHoldState(undefined)).toEqual({
      hold: null,
      lineages: [],
      hold_history: []
    });
  });

  test('drops a malformed hold and malformed entries', () => {
    const state = normalizeHoldState({
      hold: { kind: 'paused', cause: 'x', since: 1 },
      lineages: [
        { bead_id: 'UI-1', cause: API_CAUSE },
        { cause: API_CAUSE },
        null
      ],
      hold_history: [{ bead_id: 'UI-1', cause: API_CAUSE, at: 'soon' }]
    });

    expect(state).toEqual({
      hold: null,
      lineages: [
        {
          bead_id: 'UI-1',
          origin_attempt_id: null,
          cause: API_CAUSE,
          next_at: null,
          attempts: 1
        }
      ],
      hold_history: []
    });
  });

  test('prunes history older than the repetition window', () => {
    const now = HOLD_HISTORY_WINDOW_MS + 10;

    const state = normalizeHoldState(
      {
        hold_history: [
          { bead_id: 'UI-1', cause: API_CAUSE, at: 0 },
          { bead_id: 'UI-2', cause: API_CAUSE, at: 20 }
        ]
      },
      now
    );

    expect(state.hold_history.map((entry) => entry.bead_id)).toEqual(['UI-2']);
  });
});
