import { describe, expect, test } from 'vitest';
import { STATUSES, statusLabel } from './status.js';

describe('status utils', () => {
  test('includes resolved in canonical status order', () => {
    expect(STATUSES).toEqual(['open', 'in_progress', 'resolved', 'closed']);
  });

  test('maps resolved to display label', () => {
    expect(statusLabel('resolved')).toBe('Resolved');
  });
});
