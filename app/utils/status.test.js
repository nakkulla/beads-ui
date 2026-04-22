import { describe, expect, test } from 'vitest';
import { STATUSES, statusLabel } from './status.js';

describe('status utils', () => {
  test('includes deferred in canonical status order', () => {
    expect(STATUSES).toEqual([
      'open',
      'in_progress',
      'deferred',
      'resolved',
      'closed'
    ]);
  });

  test('maps resolved to display label', () => {
    expect(statusLabel('resolved')).toBe('Resolved');
  });

  test('maps deferred to display label', () => {
    expect(statusLabel('deferred')).toBe('Deferred');
  });
});
