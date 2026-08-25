import { describe, expect, test } from 'vitest';
import {
  WORKSPACE_ACCOUNTS_SCHEMA,
  mergeWorkspaceAccounts,
  normalizeWorkspaceAccounts,
  validateWorkspaceAccountsPatch
} from './workspace-accounts.js';

describe('normalizeWorkspaceAccounts state', () => {
  test('reads an absent key as absent', () => {
    const read = { ok: true, value: undefined };

    const layer = normalizeWorkspaceAccounts(read);

    expect(layer).toEqual({ state: 'absent', values: {}, warnings: [] });
  });

  test('reads a corrupt value as unusable, not absent', () => {
    const read = {
      ok: true,
      value: undefined,
      warning: 'kv_value_unparsable'
    };

    const layer = normalizeWorkspaceAccounts(read);

    expect(layer).toEqual({
      state: 'unusable',
      values: {},
      warnings: ['kv_value_unparsable']
    });
  });

  test('reads a bd failure as unusable', () => {
    const read = { ok: false, error: 'db locked' };

    const layer = normalizeWorkspaceAccounts(read);

    expect(layer.state).toBe('unusable');
  });

  test('reads an unsupported schema as unusable', () => {
    const read = {
      ok: true,
      value: { schema: 2, claude_account: 'a@example.com' }
    };

    const layer = normalizeWorkspaceAccounts(read);

    expect(layer.state).toBe('unusable');
    expect(layer.warnings).toEqual(['unsupported_schema:2']);
  });

  test('reads an object with no schema field as usable', () => {
    const read = { ok: true, value: { claude_account: 'a@example.com' } };

    const layer = normalizeWorkspaceAccounts(read);

    expect(layer.state).toBe('usable');
    expect(layer.values).toEqual({ claude_account: 'a@example.com' });
  });

  test('reads an illegal account value as unusable', () => {
    const read = {
      ok: true,
      value: { schema: 1, claude_account: 'has space', codex_account: 'key' }
    };

    const layer = normalizeWorkspaceAccounts(read);

    expect(layer.state).toBe('unusable');
    expect(layer.warnings).toEqual(['invalid_value:claude_account']);
  });

  test('condemns the whole layer when only one provider is illegal', () => {
    const read = {
      ok: true,
      value: { schema: 1, claude_account: '', codex_account: 'good-key' }
    };

    const layer = normalizeWorkspaceAccounts(read);

    expect(layer.state).toBe('unusable');
    expect(layer.values).toEqual({ codex_account: 'good-key' });
  });

  test('keeps an unknown neighbour key usable with a warning', () => {
    const read = {
      ok: true,
      value: { schema: 1, claude_account: 'a@example.com', stray: 'x' }
    };

    const layer = normalizeWorkspaceAccounts(read);

    expect(layer.state).toBe('usable');
    expect(layer.values).toEqual({ claude_account: 'a@example.com' });
    expect(layer.warnings).toEqual(['unknown_key:stray']);
  });

  test('reads both providers when both are legal', () => {
    const read = {
      ok: true,
      value: {
        schema: 1,
        claude_account: 'a@example.com',
        codex_account: 'codex-key'
      }
    };

    const layer = normalizeWorkspaceAccounts(read);

    expect(layer).toEqual({
      state: 'usable',
      values: {
        claude_account: 'a@example.com',
        codex_account: 'codex-key'
      },
      warnings: []
    });
  });
});

describe('validateWorkspaceAccountsPatch', () => {
  test('accepts both account keys', () => {
    const invalid = validateWorkspaceAccountsPatch({
      claude_account: 'a@example.com',
      codex_account: 'codex-key'
    });

    expect(invalid).toBeNull();
  });

  test('accepts null as a deletion request', () => {
    const invalid = validateWorkspaceAccountsPatch({ claude_account: null });

    expect(invalid).toBeNull();
  });

  test('refuses an unknown key', () => {
    const invalid = validateWorkspaceAccountsPatch({ impl_runtime: 'codex' });

    expect(invalid).toBe('unknown workspace account key: impl_runtime');
  });

  test('refuses a value over 256 characters', () => {
    const invalid = validateWorkspaceAccountsPatch({
      codex_account: 'k'.repeat(257)
    });

    expect(invalid).toContain('invalid value for codex_account');
  });

  test('refuses a value containing whitespace', () => {
    const invalid = validateWorkspaceAccountsPatch({
      claude_account: 'a b@example.com'
    });

    expect(invalid).toContain('invalid value for claude_account');
  });

  test('refuses a non-object patch', () => {
    const invalid = validateWorkspaceAccountsPatch('claude_account');

    expect(invalid).toBe('values must be an object');
  });
});

describe('mergeWorkspaceAccounts', () => {
  test('rewrites the schema to the current number', () => {
    const next = mergeWorkspaceAccounts(
      { schema: 99, claude_account: 'old@example.com' },
      { claude_account: 'new@example.com' }
    );

    expect(next).toEqual({
      schema: WORKSPACE_ACCOUNTS_SCHEMA,
      claude_account: 'new@example.com'
    });
  });

  test('writes a schema onto an absent object', () => {
    const next = mergeWorkspaceAccounts(undefined, {
      codex_account: 'codex-key'
    });

    expect(next).toEqual({
      schema: WORKSPACE_ACCOUNTS_SCHEMA,
      codex_account: 'codex-key'
    });
  });

  test('deletes the key a null patch names', () => {
    const next = mergeWorkspaceAccounts(
      { schema: 1, claude_account: 'a@example.com', codex_account: 'k' },
      { claude_account: null }
    );

    expect(next).toEqual({ schema: 1, codex_account: 'k' });
  });

  test('leaves an untouched provider in place', () => {
    const next = mergeWorkspaceAccounts(
      { schema: 1, codex_account: 'k' },
      { claude_account: 'a@example.com' }
    );

    expect(next).toEqual({
      schema: 1,
      codex_account: 'k',
      claude_account: 'a@example.com'
    });
  });
});
