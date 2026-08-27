import { describe, expect, test } from 'vitest';
import {
  isSessionPreferred,
  sessionPreferredReason
} from './session-preferred.js';

describe('isSessionPreferred (UI-49mc §6.1)', () => {
  test('accepts the label paired with an enum reason', () => {
    const labels = ['session-preferred'];

    const result = isSessionPreferred(labels, {
      session_preferred_reason: 'exclusive_machine'
    });

    expect(result).toBe(true);
  });

  test('rejects the label without a paired reason', () => {
    const labels = ['session-preferred'];

    const result = isSessionPreferred(labels, {});

    expect(result).toBe(false);
  });

  test('accepts the iterative_user_judgment reason', () => {
    const labels = ['session-preferred'];

    const result = isSessionPreferred(labels, {
      session_preferred_reason: 'iterative_user_judgment'
    });

    expect(result).toBe(true);
  });

  test('accepts the visual_verification reason', () => {
    const labels = ['session-preferred'];

    const result = isSessionPreferred(labels, {
      session_preferred_reason: 'visual_verification'
    });

    expect(result).toBe(true);
  });

  test('rejects a reason outside the contract enum', () => {
    const labels = ['session-preferred'];

    const result = isSessionPreferred(labels, {
      session_preferred_reason: 'other'
    });

    expect(result).toBe(false);
  });

  test('ignores a reason carried without the label', () => {
    const labels = ['worker-serial'];

    const result = isSessionPreferred(labels, {
      session_preferred_reason: 'exclusive_machine'
    });

    expect(result).toBe(false);
  });

  test('rejects a non-array labels payload', () => {
    const labels = 'session-preferred';

    const result = isSessionPreferred(labels, {
      session_preferred_reason: 'exclusive_machine'
    });

    expect(result).toBe(false);
  });

  test('returns false on absent metadata', () => {
    const labels = ['session-preferred'];

    const result = isSessionPreferred(labels, undefined);

    expect(result).toBe(false);
  });

  test('returns false on a string metadata payload', () => {
    const labels = ['session-preferred'];

    const result = isSessionPreferred(labels, 'exclusive_machine');

    expect(result).toBe(false);
  });

  test('returns false on a numeric metadata payload', () => {
    const labels = ['session-preferred'];

    const result = isSessionPreferred(labels, 42);

    expect(result).toBe(false);
  });

  test('reads past non-string label entries', () => {
    const labels = [7, null, 'session-preferred'];

    const result = isSessionPreferred(labels, {
      session_preferred_reason: 'exclusive_machine'
    });

    expect(result).toBe(true);
  });
});

describe('sessionPreferredReason (UI-49mc §6.1)', () => {
  test('returns the contract reason for a valid attachment', () => {
    const labels = ['session-preferred'];

    const result = sessionPreferredReason(labels, {
      session_preferred_reason: 'exclusive_machine'
    });

    expect(result).toBe('exclusive_machine');
  });

  test('returns an empty string when the reason is missing', () => {
    const labels = ['session-preferred'];

    const result = sessionPreferredReason(labels, {});

    expect(result).toBe('');
  });

  test('returns the iterative_user_judgment reason', () => {
    const labels = ['session-preferred'];

    const result = sessionPreferredReason(labels, {
      session_preferred_reason: 'iterative_user_judgment'
    });

    expect(result).toBe('iterative_user_judgment');
  });

  test('returns the visual_verification reason', () => {
    const labels = ['session-preferred'];

    const result = sessionPreferredReason(labels, {
      session_preferred_reason: 'visual_verification'
    });

    expect(result).toBe('visual_verification');
  });

  test('returns an empty string for a reason outside the enum', () => {
    const labels = ['session-preferred'];

    const result = sessionPreferredReason(labels, {
      session_preferred_reason: 'other'
    });

    expect(result).toBe('');
  });

  test('returns an empty string when the label is absent', () => {
    const labels = ['worker-serial'];

    const result = sessionPreferredReason(labels, {
      session_preferred_reason: 'exclusive_machine'
    });

    expect(result).toBe('');
  });

  test('returns an empty string for a non-array labels payload', () => {
    const labels = 'session-preferred';

    const result = sessionPreferredReason(labels, {
      session_preferred_reason: 'exclusive_machine'
    });

    expect(result).toBe('');
  });

  test('returns an empty string on absent metadata', () => {
    const labels = ['session-preferred'];

    const result = sessionPreferredReason(labels, undefined);

    expect(result).toBe('');
  });

  test('returns an empty string on a non-object metadata payload', () => {
    const labels = ['session-preferred'];

    const results = [
      sessionPreferredReason(labels, 'exclusive_machine'),
      sessionPreferredReason(labels, 42)
    ];

    expect(results).toEqual(['', '']);
  });

  test('returns the reason past non-string label entries', () => {
    const labels = [7, null, 'session-preferred'];

    const result = sessionPreferredReason(labels, {
      session_preferred_reason: 'exclusive_machine'
    });

    expect(result).toBe('exclusive_machine');
  });
});
