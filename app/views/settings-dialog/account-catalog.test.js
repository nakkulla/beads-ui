import { afterEach, describe, expect, test, vi } from 'vitest';
import { accountRowLabel, loadAccountCatalog } from './account-catalog.js';

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

describe('agy account catalog (UI-qlxsw)', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('labels an agy slot by its account and usage windows', () => {
    const row = {
      key: 'main',
      email: 'main@gmail.test',
      alias: 'main',
      plan: null,
      windows: [
        { key: '5h', pct: 25 },
        { key: 'Claude·GPT 7d', pct: 0 }
      ]
    };

    const label = accountRowLabel('agy', row);

    expect(label).toBe('main@gmail.test (5h 25% · Claude·GPT 7d 0%)');
  });

  test('reads the agy slots from the agy usage endpoint', async () => {
    const rows = [
      { key: 'main', email: 'main@gmail.test', active: true, windows: [] }
    ];
    vi.stubGlobal(
      'fetch',
      vi.fn(async (/** @type {string} */ url) => ({
        ok: true,
        json: async () =>
          url === '/api/agy-usage'
            ? { available: true, windows: [], accounts: rows }
            : { available: false }
      }))
    );

    const catalog = await loadAccountCatalog();

    expect(catalog.agy).toEqual({ accounts: rows, active: rows[0] });
  });
});
