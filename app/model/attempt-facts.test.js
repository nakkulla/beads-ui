import { describe, expect, test } from 'vitest';
import {
  formatElapsed,
  reviewSessionRowState,
  sumAttemptWorkMs
} from './attempt-facts.js';

// `formatElapsed` and `sumAttemptWorkMs` cases moved from the retired
// `views/worker/lanes.test.js` (UI-dbn6 Phase 4).

describe('formatElapsed hour tier', () => {
  test('renders hours and minutes past the 60-minute boundary', () => {
    const elapsed_ms = (2 * 60 + 5) * 60 * 1000;

    expect(formatElapsed(elapsed_ms)).toBe('2시간 5분');
  });
});

describe('sumAttemptWorkMs', () => {
  test('sums finished minus started across multiple attempts of the bead', () => {
    const attempts = {
      a1: { bead_id: 'UI-x1', started_at: 1000, finished_at: 4000 },
      a2: { bead_id: 'UI-x1', started_at: 5000, finished_at: 9000 }
    };

    const total = sumAttemptWorkMs(attempts, 'UI-x1');

    expect(total).toBe(7000);
  });

  test('skips attempts with null or missing timestamps', () => {
    const attempts = {
      a1: { bead_id: 'UI-x1', started_at: 1000, finished_at: 4000 },
      a2: { bead_id: 'UI-x1', started_at: null, finished_at: 9000 },
      a3: { bead_id: 'UI-x1', started_at: 1000 }
    };

    const total = sumAttemptWorkMs(attempts, 'UI-x1');

    expect(total).toBe(3000);
  });

  test("skips other beads' attempts", () => {
    const attempts = {
      a1: { bead_id: 'UI-x1', started_at: 1000, finished_at: 4000 },
      a2: { bead_id: 'UI-other', started_at: 0, finished_at: 100_000 }
    };

    const total = sumAttemptWorkMs(attempts, 'UI-x1');

    expect(total).toBe(3000);
  });

  test('returns null when nothing qualifies', () => {
    const attempts = {
      a1: { bead_id: 'UI-x1', started_at: null, finished_at: null },
      a2: { bead_id: 'UI-other', started_at: 0, finished_at: 100_000 }
    };

    const total = sumAttemptWorkMs(attempts, 'UI-x1');

    expect(total).toBeNull();
  });

  test('returns null for a missing or malformed attempts map', () => {
    expect(sumAttemptWorkMs(null, 'UI-x1')).toBeNull();
    expect(sumAttemptWorkMs(undefined, 'UI-x1')).toBeNull();
  });
});

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
