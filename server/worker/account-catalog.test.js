import { describe, expect, test, vi } from 'vitest';
import { createAccountCatalog } from './account-catalog.js';

/**
 * @param {any} claude_result
 * @param {any} codex_result
 */
function catalogWith(claude_result, codex_result) {
  return createAccountCatalog({
    listClaude: vi.fn().mockResolvedValue(claude_result),
    listCodex: vi.fn().mockResolvedValue(codex_result)
  });
}

describe('worker/account-catalog', () => {
  test('resolves one Claude email', async () => {
    const account = { key: 'a@example.com', email: 'a@example.com' };
    const catalog = catalogWith(
      { ok: true, accounts: [account], active_key: null },
      { ok: true, accounts: [], active_key: null }
    );

    const result = await catalog.resolveClaude('a@example.com');

    expect(result).toEqual({ ok: true, account });
  });

  test('rejects an unknown Claude email', async () => {
    const catalog = catalogWith(
      { ok: true, accounts: [], active_key: null },
      { ok: true, accounts: [], active_key: null }
    );

    const result = await catalog.resolveClaude('missing@example.com');

    expect(result).toEqual({
      ok: false,
      reason: 'claude_account_unknown'
    });
  });

  test('rejects an ambiguous Claude email', async () => {
    const duplicate = { key: 'same@example.com', email: 'same@example.com' };
    const catalog = catalogWith(
      { ok: true, accounts: [duplicate, duplicate], active_key: null },
      { ok: true, accounts: [], active_key: null }
    );

    const result = await catalog.resolveClaude('same@example.com');

    expect(result).toEqual({
      ok: false,
      reason: 'claude_account_ambiguous'
    });
  });

  test('rejects an unavailable Claude list', async () => {
    const catalog = catalogWith(
      { ok: false, error: 'offline' },
      { ok: true, accounts: [], active_key: null }
    );

    const result = await catalog.resolveClaude('a@example.com');

    expect(result).toEqual({
      ok: false,
      reason: 'claude_account_list_unavailable'
    });
  });

  test('reads the active Claude row with usage windows', async () => {
    const account = {
      key: 'active@example.com',
      email: 'active@example.com',
      status: 'ok',
      windows: [{ pct: 90, resetsAt: '2026-09-04T11:00:00Z' }]
    };
    const catalog = catalogWith(
      {
        ok: true,
        accounts: [account],
        active_key: 'active@example.com'
      },
      { ok: true, accounts: [], active_key: null }
    );

    const result = await catalog.activeClaude();

    expect(result).toEqual({ ok: true, account });
  });

  test('fails closed when the active Claude row is unavailable', async () => {
    const catalog = catalogWith(
      { ok: true, accounts: [], active_key: null },
      { ok: true, accounts: [], active_key: null }
    );

    const result = await catalog.activeClaude();

    expect(result).toEqual({
      ok: false,
      reason: 'claude_active_account_unavailable'
    });
  });

  test('resolves one Codex key', async () => {
    const account = { key: 'acct-1', email: 'a@example.com' };
    const catalog = catalogWith(
      { ok: true, accounts: [], active_key: null },
      { ok: true, accounts: [account], active_key: null }
    );

    const result = await catalog.resolveCodex('acct-1');

    expect(result).toEqual({ ok: true, account });
  });

  test('rejects an unknown Codex key', async () => {
    const catalog = catalogWith(
      { ok: true, accounts: [], active_key: null },
      { ok: true, accounts: [], active_key: null }
    );

    const result = await catalog.resolveCodex('missing');

    expect(result).toEqual({ ok: false, reason: 'codex_account_unknown' });
  });

  test('rejects an unavailable Codex list', async () => {
    const catalog = catalogWith(
      { ok: true, accounts: [], active_key: null },
      { ok: false, error: 'offline' }
    );

    const result = await catalog.resolveCodex('acct-1');

    expect(result).toEqual({
      ok: false,
      reason: 'codex_account_list_unavailable'
    });
  });
});
