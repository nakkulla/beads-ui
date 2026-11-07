import { describe, expect, test } from 'vitest';
import {
  activeAttemptStates,
  activeBeadIds,
  latestImplementationAttempts,
  sessionOwnerRefusal,
  sessionOwnershipMap,
  sessionOwnershipMaterial
} from './active-attempts.js';

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
  test('lets a later pre-spawn failure supersede a started attempt', () => {
    const attempts = attemptsOf([
      {
        attempt_id: 'new',
        bead_id: 'UI-1',
        status: 'failed',
        started_at: null,
        finished_at: 300
      },
      {
        attempt_id: 'old',
        bead_id: 'UI-1',
        status: 'discarded',
        started_at: 100,
        finished_at: 200
      }
    ]);

    const { winners } = activeAttemptStates(attempts, new Map());

    expect(winners.get('UI-1')?.attempt.attempt_id).toBe('new');
  });

  test.each([false, true])(
    'breaks equal-time ties by attempt id (reverse=%s)',
    (reverse) => {
      const rows = [
        { attempt_id: 'a2', bead_id: 'UI-1', started_at: 100 },
        { attempt_id: 'a1', bead_id: 'UI-1', started_at: 100 }
      ];

      const latest = latestImplementationAttempts(
        attemptsOf(reverse ? rows.reverse() : rows)
      );

      expect(latest.get('UI-1').attempt_id).toBe('a2');
    }
  );

  test.each([false, true])(
    'keeps the latest failure after an older discard (reverse=%s)',
    (reverse) => {
      const rows = [
        {
          attempt_id: 'new',
          bead_id: 'UI-1',
          status: 'failed',
          started_at: 200,
          finished_at: 300
        },
        {
          attempt_id: 'old',
          bead_id: 'UI-1',
          status: 'discarded',
          started_at: 100,
          finished_at: 150,
          dismissed_at: 160
        }
      ];

      const { winners } = activeAttemptStates(
        attemptsOf(reverse ? rows.reverse() : rows),
        new Map()
      );

      expect(winners.get('UI-1')?.attempt.attempt_id).toBe('new');
    }
  );

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

  test('drops a paused attempt a person withdrew with ✕', () => {
    const attempts = attemptsOf([
      {
        attempt_id: 'a1',
        bead_id: 'UI-1',
        status: 'paused',
        cause: 'withdrawn',
        withdrawn: { at: 5, from_status: 'running', from_cause: null }
      }
    ]);

    const { winners } = activeAttemptStates(attempts, new Map());

    expect(winners.has('UI-1')).toEqual(false);
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

describe('session ownership of a failed seat (UI-68r5 §3.4)', () => {
  /** When the residue disposition failure of `UI-1` was written. */
  const FAILED_AT = Date.parse('2026-11-07T01:42:25.000Z');

  /**
   * The bead's failed attempt, with the `session_ref` its dispatch saw.
   *
   * @param {Record<string, any>} [patch]
   */
  function failedAttempt(patch = {}) {
    return {
      attempt_id: 'a1',
      bead_id: 'UI-1',
      status: 'failed',
      cause: 'stale_work_unresolved',
      finished_at: FAILED_AT,
      bead_session_ref: 'claude:earlier@host',
      ...patch
    };
  }

  /**
   * One external wait record on `UI-1`, as the store keeps it.
   *
   * @param {Record<string, any>} [patch]
   */
  function sessionWait(patch = {}) {
    return {
      wait_id: 'w-0123456789ab',
      bead_id: 'UI-1',
      owner: {
        kind: 'session',
        session_ref: 'claude:successor@host',
        session_pid: 4242,
        session_start: 'x'
      },
      stage: 'hold',
      registered_at: '2026-11-07T01:50:00.000Z',
      ...patch
    };
  }

  /**
   * The bead's session row, with the given `session_ref` entries (the last
   * is current).
   *
   * @param {string[]} session_ids
   * @param {string} [status]
   */
  function sessionRow(session_ids, status = 'in_progress') {
    return {
      bead_id: 'UI-1',
      status,
      session_refs: session_ids.map((session_id, index) => ({
        provider: 'claude',
        session_id,
        host: 'host',
        current: index === session_ids.length - 1
      }))
    };
  }

  /**
   * Judge the seat of `UI-1` from one material input.
   *
   * @param {any[]} rows - Attempt records.
   * @param {{ external_waits?: any[], session_rows?: any[], interactive_sessions?: Record<string, any> }} input
   */
  function seatOf(rows, input) {
    const attempts = attemptsOf(rows);
    const ownership = sessionOwnershipMap(
      sessionOwnershipMaterial({ attempts, ...input })
    );
    return activeAttemptStates(attempts, new Map(), ownership);
  }

  test('yields the failed seat to a session external wait registered after the failure', () => {
    const rows = [failedAttempt()];

    const { winners, yielded_bead_ids } = seatOf(rows, {
      external_waits: [sessionWait()]
    });

    expect([winners.has('UI-1'), [...yielded_bead_ids]]).toEqual([
      false,
      ['UI-1']
    ]);
  });

  test('keeps the failed seat for a session wait registered before the failure', () => {
    const rows = [failedAttempt()];

    const { winners } = seatOf(rows, {
      external_waits: [
        sessionWait({ registered_at: '2026-11-07T00:18:50.000Z' })
      ]
    });

    expect(winners.get('UI-1')?.run_state).toBe('failed');
  });

  test.each(['done', 'resumed', 'stopped'])(
    'keeps the failed seat once the session wait reaches %s',
    (stage) => {
      const rows = [failedAttempt()];

      const { winners } = seatOf(rows, {
        external_waits: [sessionWait({ stage })]
      });

      expect(winners.get('UI-1')?.run_state).toBe('failed');
    }
  );

  test('keeps the failed seat for a worker-owned external wait', () => {
    const rows = [failedAttempt()];

    const { winners } = seatOf(rows, {
      external_waits: [
        sessionWait({ owner: { kind: 'worker', attempt_id: 'a0' } })
      ]
    });

    expect(winners.get('UI-1')?.run_state).toBe('failed');
  });

  test('yields the failed seat to a session_ref entry absent from the attempt record', () => {
    const rows = [failedAttempt()];

    const { winners } = seatOf(rows, {
      session_rows: [sessionRow(['earlier', 'successor'])]
    });

    expect(winners.has('UI-1')).toBe(false);
  });

  test('keeps the failed seat for a session_ref entry the attempt recorded', () => {
    const rows = [failedAttempt()];

    const { winners } = seatOf(rows, {
      session_rows: [sessionRow(['earlier'])]
    });

    expect(winners.get('UI-1')?.run_state).toBe('failed');
  });

  test('keeps the failed seat for an attempt without a recorded session_ref', () => {
    const rows = [failedAttempt({ bead_session_ref: undefined })];

    const { winners } = seatOf(rows, {
      session_rows: [sessionRow(['earlier', 'successor'])]
    });

    expect(winners.get('UI-1')?.run_state).toBe('failed');
  });

  test('keeps the failed seat for a session_ref entry of the bead implementation attempt', () => {
    const rows = [
      {
        attempt_id: 'a0',
        bead_id: 'UI-1',
        status: 'done',
        started_at: 1,
        session_id: 'successor'
      },
      failedAttempt()
    ];

    const { winners } = seatOf(rows, {
      session_rows: [sessionRow(['earlier', 'successor'])]
    });

    expect(winners.get('UI-1')?.run_state).toBe('failed');
  });

  test('keeps the failed seat for a bead a session no longer holds in_progress', () => {
    const rows = [failedAttempt()];

    const { winners } = seatOf(rows, {
      session_rows: [sessionRow(['earlier', 'successor'], 'open')]
    });

    expect(winners.get('UI-1')?.run_state).toBe('failed');
  });

  test.each([
    [
      'its external wait',
      {
        external_waits: [
          sessionWait({
            owner: { kind: 'session', session_ref: 'claude:conversation@host' }
          })
        ]
      }
    ],
    [
      'its session claim',
      { session_rows: [sessionRow(['earlier', 'conversation'])] }
    ]
  ])(
    "keeps the failed seat for the bead's own Worker conversation session after 인수 through %s",
    (_label, input) => {
      const rows = [failedAttempt()];

      const { winners } = seatOf(rows, {
        ...input,
        interactive_sessions: {
          'UI-1:resolve': {
            bead_id: 'UI-1',
            kind: 'resolve',
            session_id: 'conversation'
          }
        }
      });

      expect(winners.get('UI-1')?.run_state).toBe('failed');
    }
  );

  test('keeps every seat without ownership material', () => {
    const attempts = attemptsOf([failedAttempt()]);

    const ids = activeBeadIds(attempts, new Map());

    expect([...ids]).toEqual(['UI-1']);
  });

  test('builds no material for a bead without a failed seat', () => {
    const attempts = attemptsOf([failedAttempt({ status: 'running' })]);

    const material = sessionOwnershipMaterial({
      attempts,
      external_waits: [sessionWait()]
    });

    expect(material).toEqual({});
  });

  test('refuses a Worker operation with session_owned while the evidence holds', () => {
    const attempts = attemptsOf([failedAttempt()]);
    const material = sessionOwnershipMaterial({
      attempts,
      external_waits: [sessionWait()]
    })['UI-1'];

    const refusal = sessionOwnerRefusal(attempts, 'UI-1', material, false);

    expect(refusal).toBe('session_owned');
  });

  test('refuses a Worker operation with session_owner_unobservable when unread material proves nothing', () => {
    const attempts = attemptsOf([failedAttempt()]);

    const refusal = sessionOwnerRefusal(attempts, 'UI-1', undefined, true);

    expect(refusal).toBe('session_owner_unobservable');
  });

  test('allows a Worker operation on a bead with no failed seat', () => {
    const attempts = attemptsOf([failedAttempt({ dismissed_at: 5 })]);

    const refusal = sessionOwnerRefusal(attempts, 'UI-1', undefined, true);

    expect(refusal).toBeNull();
  });
});
