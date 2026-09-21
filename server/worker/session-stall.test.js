import { describe, expect, test } from 'vitest';
import { isSessionStalledRecovery } from './session-stall.js';

describe('session stall recovery', () => {
  test.each([
    'authority',
    'verification',
    'no_progress',
    'reconcile',
    'unclassified',
    'prerequisite'
  ])('identifies a session-declared %s stall', (reason) => {
    const recovery = { reason, classification: 'session_recovery_wait' };

    const result = isSessionStalledRecovery(recovery, []);

    expect(result).toBe(true);
  });

  test('excludes a policy-classified unknown failure', () => {
    const recovery = {
      reason: 'unclassified',
      classification: 'unknown_error'
    };

    expect(isSessionStalledRecovery(recovery, [])).toBe(false);
  });

  test('excludes a prerequisite with blockers', () => {
    const recovery = {
      reason: 'prerequisite',
      classification: 'session_recovery_wait'
    };

    expect(isSessionStalledRecovery(recovery, ['UI-blocker'])).toBe(false);
  });

  test.each(['provider', 'credential'])('excludes %s recovery', (reason) => {
    expect(isSessionStalledRecovery({ reason }, [])).toBe(false);
  });
});
