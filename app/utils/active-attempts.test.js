import { describe, expect, test } from 'vitest';
import { activeAttemptStates, activeBeadIds } from './active-attempts.js';

/**
 * @param {Array<Record<string, any>>} rows
 * @returns {Record<string, any>}
 */
function attemptsOf(rows) {
  /** @type {Record<string, any>} */
  const out = {};
  for (const row of rows) {
    out[row.attempt_id] = row;
  }
  return out;
}

describe('activeAttemptStates', () => {
  test('admits a running attempt', () => {
    const attempts = attemptsOf([
      { attempt_id: 'a1', bead_id: 'UI-1', status: 'running' }
    ]);

    const { winners } = activeAttemptStates(attempts, new Map());

    expect(winners.get('UI-1')?.run_state).toEqual('running');
  });

  test('admits a leaf paused attempt', () => {
    const attempts = attemptsOf([
      { attempt_id: 'a1', bead_id: 'UI-1', status: 'paused' }
    ]);

    const { winners } = activeAttemptStates(attempts, new Map());

    expect(winners.get('UI-1')?.run_state).toEqual('paused');
  });

  test('drops a paused attempt another attempt resumed from', () => {
    const attempts = attemptsOf([
      { attempt_id: 'a1', bead_id: 'UI-1', status: 'paused' },
      { attempt_id: 'a2', bead_id: 'UI-1', status: 'done', resumed_from: 'a1' }
    ]);

    const { winners } = activeAttemptStates(attempts, new Map());

    expect(winners.has('UI-1')).toEqual(false);
  });

  test('admits an unhandled failure on the latest attempt', () => {
    const attempts = attemptsOf([
      {
        attempt_id: 'a1',
        bead_id: 'UI-1',
        status: 'failed',
        finished_at: 1000
      }
    ]);

    const { winners } = activeAttemptStates(attempts, new Map());

    expect(winners.get('UI-1')?.run_state).toEqual('failed');
  });

  test('drops a failure the done lane already resolved', () => {
    const attempts = attemptsOf([
      { attempt_id: 'a1', bead_id: 'UI-1', status: 'failed', finished_at: 1000 }
    ]);

    const { winners } = activeAttemptStates(
      attempts,
      new Map([['UI-1', 2000]])
    );

    expect(winners.has('UI-1')).toEqual(false);
  });

  test('drops a dismissed failure', () => {
    const attempts = attemptsOf([
      {
        attempt_id: 'a1',
        bead_id: 'UI-1',
        status: 'failed',
        finished_at: 1000,
        dismissed_at: 1500
      }
    ]);

    const { winners } = activeAttemptStates(attempts, new Map());

    expect(winners.has('UI-1')).toEqual(false);
  });

  test('drops a source attempt stamped by discard completion', () => {
    const attempts = attemptsOf([
      {
        attempt_id: 'a1',
        bead_id: 'UI-1',
        status: 'discarded',
        finished_at: 1000,
        dismissed_at: 1500
      }
    ]);

    const { winners } = activeAttemptStates(attempts, new Map());

    expect(winners.has('UI-1')).toEqual(false);
  });

  test('folds several unfinished attempts of one bead onto the highest state', () => {
    const attempts = attemptsOf([
      { attempt_id: 'a1', bead_id: 'UI-1', status: 'paused' },
      { attempt_id: 'a2', bead_id: 'UI-1', status: 'running' }
    ]);

    const { winners } = activeAttemptStates(attempts, new Map());

    expect(winners.get('UI-1')?.attempt.attempt_id).toEqual('a2');
  });

  test('prefers the later start when two attempts share a state', () => {
    const attempts = attemptsOf([
      {
        attempt_id: 'a1',
        bead_id: 'UI-1',
        status: 'running',
        started_at: 1000
      },
      { attempt_id: 'a2', bead_id: 'UI-1', status: 'running', started_at: 2000 }
    ]);

    const { winners } = activeAttemptStates(attempts, new Map());

    expect(winners.get('UI-1')?.attempt.attempt_id).toEqual('a2');
  });
});

describe('activeBeadIds', () => {
  test('names each active bead exactly once', () => {
    const attempts = attemptsOf([
      { attempt_id: 'a1', bead_id: 'UI-1', status: 'running' },
      { attempt_id: 'a2', bead_id: 'UI-1', status: 'running' },
      { attempt_id: 'a3', bead_id: 'UI-2', status: 'paused' },
      { attempt_id: 'a4', bead_id: 'UI-3', status: 'done' }
    ]);

    const ids = activeBeadIds(attempts, new Map());

    expect([...ids].sort()).toEqual(['UI-1', 'UI-2']);
  });

  test('returns an empty set for a repo with no attempts', () => {
    const ids = activeBeadIds({}, new Map());

    expect(ids.size).toEqual(0);
  });
});

describe('review session attempts (UI-d7fy §5.5)', () => {
  test('leaves a running review session out of the running slot', () => {
    const attempts = attemptsOf([
      {
        attempt_id: 'r1',
        bead_id: 'UI-1',
        status: 'running',
        kind: 'review_session'
      }
    ]);

    const { winners } = activeAttemptStates(attempts, new Map());

    expect(winners.has('UI-1')).toBe(false);
  });

  test('leaves a running review session out of the counted bead ids', () => {
    const attempts = attemptsOf([
      {
        attempt_id: 'p1',
        bead_id: 'UI-1',
        status: 'running',
        kind: 'review_session'
      },
      { attempt_id: 'a1', bead_id: 'UI-2', status: 'running' }
    ]);

    const ids = activeBeadIds(attempts, new Map());

    expect([...ids]).toEqual(['UI-2']);
  });

  test('keeps an unhandled implementation failure that a later review follows', () => {
    const attempts = attemptsOf([
      { attempt_id: 'a1', bead_id: 'UI-1', status: 'failed' },
      {
        attempt_id: 'r1',
        bead_id: 'UI-1',
        status: 'done',
        kind: 'review_session'
      }
    ]);

    const { winners } = activeAttemptStates(attempts, new Map());

    expect(winners.get('UI-1')?.run_state).toEqual('failed');
  });

  test('admits an attempt whose record predates the kind field', () => {
    const attempts = attemptsOf([
      { attempt_id: 'a1', bead_id: 'UI-1', status: 'running' }
    ]);

    const { winners } = activeAttemptStates(attempts, new Map());

    expect(winners.has('UI-1')).toBe(true);
  });
});
