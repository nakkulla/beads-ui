import { describe, expect, test } from 'vitest';
import { createStatusBadge } from './status-badge.js';

describe('status badge', () => {
  test('renders resolved label and class', () => {
    const el = createStatusBadge('resolved');
    expect(el.classList.contains('is-resolved')).toBe(true);
    expect(el.textContent).toBe('Resolved');
    expect(el.getAttribute('aria-label')).toBe('Status: Resolved');
  });
});
