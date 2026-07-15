import { describe, expect, test } from 'vitest';
import { createBreaker } from './breaker.js';

describe('worker/breaker', () => {
  test('trip records a per-repo banner and blocks only that repo', () => {
    let t = 1000;
    const breaker = createBreaker({ now: () => t });
    expect(breaker.isTripped('/a')).toBe(false);
    t = 1234;
    const banner = breaker.trip('/a', {
      bead_id: 'UI-1',
      cause: 'verify_failed'
    });
    expect(banner).toEqual({
      repo: '/a',
      bead_id: 'UI-1',
      cause: 'verify_failed',
      at: 1234
    });
    expect(breaker.isTripped('/a')).toBe(true);
    expect(breaker.isTripped('/b')).toBe(false);
    expect(breaker.anyTripped()).toBe(true);
    expect(breaker.banner('/a')?.cause).toBe('verify_failed');
  });

  test('reset clears the breaker (manual resume)', () => {
    const breaker = createBreaker();
    breaker.trip('/a', { bead_id: 'UI-1', cause: 'abnormal_exit' });
    breaker.reset('/a');
    expect(breaker.isTripped('/a')).toBe(false);
    expect(breaker.anyTripped()).toBe(false);
    expect(breaker.banner('/a')).toBe(null);
  });
});
