import { describe, expect, test } from 'vitest';
import {
  CONVERSATION_RECOVERY_REASONS,
  conversationStopLabel,
  isSessionStalledRecovery
} from './session-stall.js';
import { loadWorkRecoveryPolicy } from './work-recovery-policy.js';

describe('session stall recovery', () => {
  test.each(['authority', 'no_progress'])(
    'identifies a current %s stall',
    (reason) => {
      const recovery = { reason, classification: 'session_recovery_wait' };

      const result = isSessionStalledRecovery(recovery, []);

      expect(result).toBe(true);
    }
  );

  test.each(['verification', 'reconcile', 'unclassified', 'prerequisite'])(
    'keeps a recorded legacy %s stall read-compatible',
    (reason) => {
      const recovery = { reason, classification: 'session_recovery_wait' };

      const result = isSessionStalledRecovery(recovery, []);

      expect(result).toBe(true);
    }
  );

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

  test('matches the pinned result-line reasons that need a person', () => {
    const pinned = loadWorkRecoveryPolicy().policy?.result_line_reasons || [];

    const expected = pinned.filter(
      (/** @type {string} */ reason) =>
        !['provider', 'credential', 'prerequisite'].includes(reason)
    );

    expect([...CONVERSATION_RECOVERY_REASONS].sort()).toEqual(expected.sort());
  });
});

describe('conversation stop label', () => {
  test('labels a park by its awaiting_user value', () => {
    const label = conversationStopLabel({
      awaiting_user: 'impl_review_conflict:design'
    });

    expect(label).toBe('awaiting_user=impl_review_conflict:design');
  });

  test('labels a current recovery by its reason', () => {
    const label = conversationStopLabel({
      recovery: { reason: 'no_progress' }
    });

    expect(label).toBe('recovery:no_progress');
  });

  test('marks a legacy recovery as an old record', () => {
    const label = conversationStopLabel({
      recovery: { reason: 'verification' }
    });

    expect(label).toBe('recovery:verification (옛 기록)');
  });

  test('returns null for a recovery that is no conversation target', () => {
    const label = conversationStopLabel({ recovery: { reason: 'provider' } });

    expect(label).toBeNull();
  });
});
