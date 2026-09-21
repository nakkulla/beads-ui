import { describe, expect, test } from 'vitest';
import { accountRowLabel } from './account-catalog.js';

describe('accountRowLabel usage windows (UI-e1ta §6.1)', () => {
  test('appends every window as a usage percentage', () => {
    const row = {
      key: 'work@example.com',
      email: 'work@example.com',
      status: 'ok',
      windows: [
        { key: '5h', pct: 62.4 },
        { key: '7d', pct: 41 }
      ]
    };

    const label = accountRowLabel('claude', row);

    expect(label).toBe('work@example.com (5h 62% · 7d 41%)');
  });

  test('keeps the account line when the row carries no windows', () => {
    const row = { key: 'work@example.com', email: 'work@example.com' };

    const label = accountRowLabel('claude', row);

    expect(label).toBe('work@example.com');
  });

  test('drops only the windows whose percentage is not a number', () => {
    const row = {
      key: 'codex@example.com',
      email: 'codex@example.com',
      plan: 'pro',
      windows: [
        { key: '5h', pct: null },
        { key: '7d', pct: 12 }
      ]
    };

    const label = accountRowLabel('codex', row);

    expect(label).toBe('codex@example.com · pro (7d 12%)');
  });
});
