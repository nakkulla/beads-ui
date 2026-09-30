import { describe, expect, test } from 'vitest';
import { reviewSessionRowState } from './attempt-facts.js';

describe('reviewSessionRowState', () => {
  test('reports the running attempt’s origin (UI-qksl §7)', () => {
    const attempts = {
      r1: {
        bead_id: 'UI-x1',
        kind: 'review_session',
        status: 'running',
        origin: 'auto'
      }
    };

    const state = reviewSessionRowState(attempts, 'UI-x1');

    expect(state).toEqual({ active: true, failure: null, origin: 'auto' });
  });

  test('reports the last failed attempt’s origin when none is running', () => {
    const attempts = {
      r1: {
        bead_id: 'UI-x1',
        kind: 'review_session',
        status: 'failed',
        origin: 'auto',
        cause: 'launch_failed:bead_running',
        finished_at: 5
      },
      r2: {
        bead_id: 'UI-x1',
        kind: 'review_session',
        status: 'failed',
        origin: 'click',
        cause: 'receipt_not_current',
        finished_at: 9
      }
    };

    const state = reviewSessionRowState(attempts, 'UI-x1');

    expect(state).toEqual({
      active: false,
      failure: 'receipt_not_current',
      origin: 'click'
    });
  });

  test('prefers the running attempt over an earlier failure', () => {
    const attempts = {
      r1: {
        bead_id: 'UI-x1',
        kind: 'review_session',
        status: 'failed',
        origin: 'click',
        cause: 'receipt_not_current',
        finished_at: 9
      },
      r2: {
        bead_id: 'UI-x1',
        kind: 'review_session',
        status: 'pending',
        origin: 'auto'
      }
    };

    const state = reviewSessionRowState(attempts, 'UI-x1');

    expect(state).toEqual({ active: true, failure: null, origin: 'auto' });
  });

  test('reads an origin outside the enum as none', () => {
    const attempts = {
      r1: {
        bead_id: 'UI-x1',
        kind: 'review_session',
        status: 'running',
        origin: 'queue'
      }
    };

    const state = reviewSessionRowState(attempts, 'UI-x1');

    expect(state).toEqual({ active: true, failure: null, origin: null });
  });

  test('returns no origin for a missing or malformed attempts map', () => {
    expect(reviewSessionRowState(null, 'UI-x1')).toEqual({
      active: false,
      failure: null,
      origin: null
    });
    expect(reviewSessionRowState({ r1: null }, 'UI-x1')).toEqual({
      active: false,
      failure: null,
      origin: null
    });
  });
});
