import { describe, expect, test } from 'vitest';
import {
  RETRY_DELAYS_MS,
  dueRetries,
  earliestRetryAt,
  normalizeRetryState,
  reduceRetryState
} from './queue-hold.js';

/**
 * @param {string} bead_id
 * @param {number} at
 * @param {string} [cause]
 * @returns {import('./queue-hold.js').RetryScheduledEvent}
 */
function retryEvent(bead_id, at, cause = 'session_failed:is_error:api') {
  return {
    kind: 'retry_scheduled',
    bead_id,
    attempt_id: `att-${bead_id}-${at}`,
    cause,
    at
  };
}

describe('per-Bead retry lineages', () => {
  test('schedules the first retry without queue state', () => {
    const { state, effects } = reduceRetryState(
      null,
      retryEvent('UI-1', 1000),
      1000
    );

    expect(state).toEqual({
      lineages: [
        {
          bead_id: 'UI-1',
          origin_attempt_id: 'att-UI-1-1000',
          cause: 'session_failed:is_error:api',
          next_at: 121000,
          attempts: 1
        }
      ]
    });
    expect(effects).toMatchObject([
      { kind: 'retry_scheduled', attempts: 1, next_at: 121000 }
    ]);
  });

  test('leaves the input unchanged', () => {
    const before = normalizeRetryState(null);

    reduceRetryState(before, retryEvent('UI-1', 0), 0);

    expect(before).toEqual({ lineages: [] });
  });

  test('spends all three delays before exhausting the lineage', () => {
    let state = normalizeRetryState(null);
    for (const [index, delay] of RETRY_DELAYS_MS.entries()) {
      const next = reduceRetryState(state, retryEvent('UI-1', 1000), 1000);
      state = next.state;

      expect(state.lineages[0]).toMatchObject({
        attempts: index + 1,
        next_at: 1000 + delay
      });
    }

    const exhausted = reduceRetryState(state, retryEvent('UI-1', 2000), 2000);

    expect(exhausted.state.lineages[0]).toMatchObject({
      attempts: 4,
      next_at: null
    });
    expect(exhausted.effects).toEqual([
      { kind: 'attempt_failed', attempt_id: 'att-UI-1-2000' }
    ]);
  });

  test('keeps independent budgets when two Beads report the same cause', () => {
    const first = reduceRetryState(null, retryEvent('UI-1', 0), 0);

    const second = reduceRetryState(
      first.state,
      retryEvent('UI-2', 1000),
      1000
    );

    expect(second.state.lineages.map((entry) => entry.attempts)).toEqual([
      1, 1
    ]);
    expect(second.effects[0].kind).toBe('retry_scheduled');
  });

  test('preserves the budget when a failure changes cause', () => {
    const first = reduceRetryState(null, retryEvent('UI-1', 0), 0);

    const second = reduceRetryState(
      first.state,
      retryEvent('UI-1', 10, 'spawn_failed'),
      10
    );

    expect(second.state.lineages[0]).toMatchObject({
      origin_attempt_id: 'att-UI-1-0',
      attempts: 2,
      cause: 'spawn_failed'
    });
  });

  test('removes only the successful Bead lineage', () => {
    const first = reduceRetryState(null, retryEvent('UI-1', 0), 0);
    const second = reduceRetryState(first.state, retryEvent('UI-2', 0), 0);

    const next = reduceRetryState(
      second.state,
      { kind: 'retry_succeeded', bead_id: 'UI-1' },
      5
    );

    expect(next.state.lineages.map((entry) => entry.bead_id)).toEqual(['UI-2']);
  });

  test.each([
    ['retry_dispatched', null],
    ['retry_deferred', 121000],
    ['retry_now', 1000]
  ])('updates only the named lineage for %s', (kind, next_at) => {
    const first = reduceRetryState(null, retryEvent('UI-1', 0), 0);
    const second = reduceRetryState(first.state, retryEvent('UI-2', 0), 0);

    const next = reduceRetryState(
      second.state,
      {
        kind: /** @type {import('./queue-hold.js').RetryUpdateEvent['kind']} */ (
          kind
        ),
        bead_id: 'UI-1'
      },
      1000
    );

    expect(next.state.lineages[0]).toMatchObject({ attempts: 1, next_at });
    expect(next.state.lineages[1]).toEqual(second.state.lineages[1]);
  });

  test('selects due retries without including an in-flight lineage', () => {
    const first = reduceRetryState(null, retryEvent('UI-1', 0), 0);
    const second = reduceRetryState(first.state, retryEvent('UI-2', 10), 10);
    const running = reduceRetryState(
      second.state,
      { kind: 'retry_dispatched', bead_id: 'UI-1' },
      1
    );

    expect(earliestRetryAt(running.state)).toBe(120010);
    expect(
      dueRetries(running.state, 120010).map((entry) => entry.bead_id)
    ).toEqual(['UI-2']);
  });

  test('stops scheduling after the third base movement', () => {
    const first = reduceRetryState(
      null,
      retryEvent('UI-1', 0, 'base_moved'),
      0
    );
    const second = reduceRetryState(
      first.state,
      retryEvent('UI-1', 100, 'base_moved'),
      100
    );

    const third = reduceRetryState(
      second.state,
      retryEvent('UI-1', 200, 'base_moved'),
      200
    );

    expect(second.state.lineages[0].next_at).toBe(120100);
    expect(third.state.lineages[0]).toMatchObject({
      base_moved_count: 3,
      next_at: null
    });
  });

  test('drops retired fields and malformed lineage entries on load', () => {
    const state = normalizeRetryState({
      hold: { kind: 'systemic' },
      hold_history: [{}],
      lineages: [
        { bead_id: '' },
        { bead_id: 'UI-1', cause: 'api', attempts: 2 }
      ]
    });

    expect(state).toEqual({
      lineages: [
        {
          bead_id: 'UI-1',
          cause: 'api',
          attempts: 2,
          next_at: null,
          origin_attempt_id: null
        }
      ]
    });
  });
});
