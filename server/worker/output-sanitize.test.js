import { describe, expect, test } from 'vitest';
import { sanitizeOutput } from './output-sanitize.js';

describe('sanitizeOutput', () => {
  test('redacts a github token shape', () => {
    const sanitized = sanitizeOutput('using ghp_0123456789abcdefghij now');

    expect(sanitized).toBe('using [redacted] now');
  });

  test('redacts a bearer header value', () => {
    const sanitized = sanitizeOutput('Authorization: Bearer abcdef0123456789');

    expect(sanitized).toBe('Authorization: [redacted]');
  });

  test('redacts a key-value secret assignment', () => {
    const sanitized = sanitizeOutput('password=hunter2 remains');

    expect(sanitized).toBe('[redacted] remains');
  });

  test('keeps ordinary diagnostic text intact', () => {
    const sanitized = sanitizeOutput('npm run build exited with 2');

    expect(sanitized).toBe('npm run build exited with 2');
  });
});
