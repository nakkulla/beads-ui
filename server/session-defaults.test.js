import { describe, expect, test } from 'vitest';
import {
  isHttpOriginValue,
  normalizeSessionDefaults,
  validateSessionDefaultsPatch
} from './session-defaults.js';
import { resolveCatalog } from './worker/runner-catalog.js';

const CATALOG = resolveCatalog({ warn: () => {} });

/** @param {unknown} raw */
function normalize(raw) {
  return normalizeSessionDefaults(raw, { catalog: CATALOG });
}

/** @param {unknown} raw */
function validate(raw) {
  return validateSessionDefaultsPatch(raw, { catalog: CATALOG });
}

describe('isHttpOriginValue', () => {
  test('accepts an absolute http origin with a port', () => {
    expect(isHttpOriginValue('http://100.64.0.1:3000')).toBe(true);
  });

  test('accepts an https origin without a port', () => {
    expect(isHttpOriginValue('https://beads.example')).toBe(true);
  });

  test('rejects a trailing slash, which would concatenate into //api', () => {
    expect(isHttpOriginValue('http://100.64.0.1:3000/')).toBe(false);
  });

  test('rejects a path, query, fragment, or userinfo', () => {
    expect(isHttpOriginValue('http://host:3000/api')).toBe(false);
    expect(isHttpOriginValue('http://host:3000?a=1')).toBe(false);
    expect(isHttpOriginValue('http://host:3000#x')).toBe(false);
    expect(isHttpOriginValue('http://user:pw@host:3000')).toBe(false);
  });

  test('rejects a scheme-less host and a non-http scheme', () => {
    expect(isHttpOriginValue('100.64.0.1:3000')).toBe(false);
    expect(isHttpOriginValue('ftp://host')).toBe(false);
    expect(isHttpOriginValue('')).toBe(false);
  });
});

describe('normalizeSessionDefaults bdui_url', () => {
  test('keeps a well-formed origin without warning', () => {
    const layer = normalize({ schema: 1, bdui_url: 'http://100.64.0.1:3000' });

    expect(layer.values).toEqual({ bdui_url: 'http://100.64.0.1:3000' });
    expect(layer.warnings).toEqual([]);
  });

  test('no longer reports the contract key as unknown', () => {
    const layer = normalize({ bdui_url: 'https://beads.example' });

    expect(layer.warnings).not.toContain('unknown_key:bdui_url');
  });

  test('drops a malformed origin with the ordinary invalid_value warning', () => {
    const layer = normalize({ bdui_url: 'beads.example:3000' });

    expect(layer.values).toEqual({});
    expect(layer.warnings).toEqual(['invalid_value:bdui_url']);
  });

  test('drops a non-string value like any other key', () => {
    const layer = normalize({ bdui_url: 3000 });

    expect(layer.values).toEqual({});
    expect(layer.warnings).toEqual(['invalid_value:bdui_url']);
  });

  test('keeps the enum keys alongside it on their own rule', () => {
    const layer = normalize({
      bdui_url: 'http://host:3000',
      impl_speed: 'fast',
      workflow_mode: 'nonsense'
    });

    expect(layer.values).toEqual({
      bdui_url: 'http://host:3000',
      impl_speed: 'fast'
    });
    expect(layer.warnings).toEqual(['invalid_value:workflow_mode']);
  });
});

describe('normalizeSessionDefaults quick_fix profile', () => {
  test('keeps all five valid quick_fix values', () => {
    const layer = normalize({
      schema: 1,
      quick_fix_impl_dispatch: 'delegated',
      quick_fix_impl_runtime: 'codex',
      quick_fix_impl_model: 'sol',
      quick_fix_impl_effort: 'auto',
      quick_fix_impl_speed: 'fast'
    });

    expect(layer).toEqual({
      values: {
        quick_fix_impl_dispatch: 'delegated',
        quick_fix_impl_runtime: 'codex',
        quick_fix_impl_model: 'sol',
        quick_fix_impl_effort: 'auto',
        quick_fix_impl_speed: 'fast'
      },
      warnings: []
    });
  });

  test('drops invalid quick_fix values with per-key warnings', () => {
    const layer = normalize({
      quick_fix_impl_dispatch: 'later',
      quick_fix_impl_runtime: 'inherit',
      quick_fix_impl_model: 'auto',
      quick_fix_impl_effort: 'impossible',
      quick_fix_impl_speed: 'turbo'
    });

    expect(layer.values).toEqual({});
    expect(layer.warnings).toEqual([
      'invalid_value:quick_fix_impl_dispatch',
      'invalid_value:quick_fix_impl_runtime',
      'invalid_value:quick_fix_impl_model',
      'invalid_value:quick_fix_impl_effort',
      'invalid_value:quick_fix_impl_speed'
    ]);
  });
});

describe('normalizeSessionDefaults base_sync_accept_local_commits', () => {
  test('keeps a JSON boolean true without warning', () => {
    const layer = normalize({
      schema: 1,
      base_sync_accept_local_commits: true
    });

    expect(layer).toEqual({
      values: { base_sync_accept_local_commits: true },
      warnings: []
    });
  });

  test('keeps a JSON boolean false, which the consumer reads as off', () => {
    const layer = normalize({ base_sync_accept_local_commits: false });

    expect(layer.values).toEqual({ base_sync_accept_local_commits: false });
    expect(layer.warnings).toEqual([]);
  });

  test('no longer reports the contract key as unknown', () => {
    const layer = normalize({ base_sync_accept_local_commits: true });

    expect(layer.warnings).not.toContain(
      'unknown_key:base_sync_accept_local_commits'
    );
  });

  test('drops the string "true" with the ordinary invalid_value warning', () => {
    const layer = normalize({ base_sync_accept_local_commits: 'true' });

    expect(layer.values).toEqual({});
    expect(layer.warnings).toEqual([
      'invalid_value:base_sync_accept_local_commits'
    ]);
  });

  test('drops a non-boolean like 1 the same way', () => {
    const layer = normalize({ base_sync_accept_local_commits: 1 });

    expect(layer.values).toEqual({});
    expect(layer.warnings).toEqual([
      'invalid_value:base_sync_accept_local_commits'
    ]);
  });

  test('keeps the enum and format keys alongside it on their own rules', () => {
    const layer = normalize({
      base_sync_accept_local_commits: true,
      bdui_url: 'http://host:3000',
      workflow_mode: 'fast_track'
    });

    expect(layer.values).toEqual({
      base_sync_accept_local_commits: true,
      bdui_url: 'http://host:3000',
      workflow_mode: 'fast_track'
    });
    expect(layer.warnings).toEqual([]);
  });

  test('refuses a boolean on an enum key, which stays string-typed', () => {
    const layer = normalize({ workflow_mode: true });

    expect(layer.values).toEqual({});
    expect(layer.warnings).toEqual(['invalid_value:workflow_mode']);
  });
});

describe('validateSessionDefaultsPatch base_sync_accept_local_commits', () => {
  test('accepts the boolean the toggle sends when it is on', () => {
    const result = validate({ base_sync_accept_local_commits: true });

    expect(result).toEqual({
      ok: true,
      patch: { base_sync_accept_local_commits: true }
    });
  });

  test('accepts an explicit false, which means the same as absence', () => {
    const result = validate({ base_sync_accept_local_commits: false });

    expect(result).toEqual({
      ok: true,
      patch: { base_sync_accept_local_commits: false }
    });
  });

  test('reads null as the deletion request the off position sends', () => {
    const result = validate({ base_sync_accept_local_commits: null });

    expect(result).toEqual({
      ok: true,
      patch: { base_sync_accept_local_commits: null }
    });
  });

  test('refuses a string, which the bool contract has no room for', () => {
    const result = validate({ base_sync_accept_local_commits: 'true' });

    expect(result).toEqual({
      ok: false,
      reason: 'invalid value for base_sync_accept_local_commits: true'
    });
  });
});

describe('validateSessionDefaultsPatch bdui_url', () => {
  test('accepts a well-formed origin', () => {
    const result = validate({ bdui_url: 'http://100.64.0.1:3000' });

    expect(result).toEqual({
      ok: true,
      patch: { bdui_url: 'http://100.64.0.1:3000' }
    });
  });

  test('refuses a malformed origin by the same format rule as the read path', () => {
    const result = validate({ bdui_url: 'http://host:3000/' });

    expect(result).toEqual({
      ok: false,
      reason: 'invalid value for bdui_url: http://host:3000/'
    });
  });

  test('reads an empty value as the deletion request', () => {
    const result = validate({ bdui_url: '' });

    expect(result).toEqual({ ok: true, patch: { bdui_url: null } });
  });

  test('still refuses a key outside the contract vocabulary', () => {
    const result = validate({ bdui_urls: 'http://host:3000' });

    expect(result).toEqual({
      ok: false,
      reason: 'unknown session-default key: bdui_urls'
    });
  });
});

describe('validateSessionDefaultsPatch quick_fix profile', () => {
  test('accepts valid values and unsets empty values', () => {
    const result = validate({
      quick_fix_impl_dispatch: 'main',
      quick_fix_impl_runtime: 'claude',
      quick_fix_impl_model: '',
      quick_fix_impl_effort: 'high',
      quick_fix_impl_speed: null
    });

    expect(result).toEqual({
      ok: true,
      patch: {
        quick_fix_impl_dispatch: 'main',
        quick_fix_impl_runtime: 'claude',
        quick_fix_impl_model: null,
        quick_fix_impl_effort: 'high',
        quick_fix_impl_speed: null
      }
    });
  });

  test('rejects inherit for the quick_fix workspace runtime', () => {
    const result = validate({ quick_fix_impl_runtime: 'inherit' });

    expect(result).toEqual({
      ok: false,
      reason: 'invalid value for quick_fix_impl_runtime: inherit'
    });
  });
});
