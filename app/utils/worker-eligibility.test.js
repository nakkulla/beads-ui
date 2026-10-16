import { describe, expect, test } from 'vitest';
import { execLaneOf, isWorkerIneligible } from './worker-eligibility.js';

const PREFERRED = { session_preferred_reason: 'external_roundtrip' };

describe('execLaneOf (UI-lbm5 §4.1)', () => {
  test('sends a worker-ineligible bead to the session lane', () => {
    expect(execLaneOf(['worker-ineligible'], {})).toBe('session');
  });

  test('sends a session-preferred bead with exec_lane=session to the session lane', () => {
    expect(
      execLaneOf(['session-preferred'], { ...PREFERRED, exec_lane: 'session' })
    ).toBe('session');
  });

  test('keeps a session-preferred bead without exec_lane on the Worker', () => {
    expect(execLaneOf(['session-preferred'], PREFERRED)).toBe('worker');
  });

  test('ignores exec_lane when the session-preferred label is missing', () => {
    expect(execLaneOf([], { ...PREFERRED, exec_lane: 'session' })).toBe(
      'worker'
    );
  });

  test('ignores exec_lane when the session-preferred reason is outside the enum', () => {
    expect(
      execLaneOf(['session-preferred'], {
        session_preferred_reason: 'whatever',
        exec_lane: 'session'
      })
    ).toBe('worker');
  });

  test('judges a payload without metadata from its labels alone', () => {
    expect(execLaneOf(['worker-ineligible'], null)).toBe('session');
  });

  test('keeps the label predicate it builds on', () => {
    expect(isWorkerIneligible(['x', 'worker-ineligible'])).toBe(true);
  });
});
