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
