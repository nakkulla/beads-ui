import { describe, expect, test } from 'vitest';
import { classifyProviderOutage } from './provider-outage.js';

/**
 * Build one terminal Claude result event with safe defaults.
 *
 * @param {Record<string, unknown>} [overrides]
 * @returns {Record<string, unknown>}
 */
function resultEvent(overrides = {}) {
  return {
    type: 'result',
    subtype: 'success',
    is_error: true,
    ...overrides
  };
}

describe('runner/provider-outage result classification', () => {
  test('classifies the observed 529 result as overloaded', () => {
    const raw = [
      resultEvent({
        result:
          'API Error: 529 Overloaded. This is a server-side issue, usually temporary.'
      })
    ];

    const result = classifyProviderOutage({ raw, stderr_tail: null });

    expect(result).toEqual({
      detail: 'overloaded_529',
      message:
        'API Error: 529 Overloaded. This is a server-side issue, usually temporary.',
      scope: 'provider',
      resets_at: null
    });
  });

  test('maps a structured 503 status to http_503', () => {
    const raw = [
      resultEvent({ api_error_status: 503, result: 'Service unavailable' })
    ];

    const result = classifyProviderOutage({ raw, stderr_tail: null });

    expect(result?.detail).toBe('http_503');
  });

  test('maps a legacy 500 line to http_500', () => {
    const raw = [resultEvent({ result: 'API Error: 500 Internal error' })];

    const result = classifyProviderOutage({ raw, stderr_tail: null });

    expect(result?.detail).toBe('http_500');
  });

  test('lets a structured status override conflicting result text', () => {
    const raw = [
      resultEvent({
        api_error_status: 500,
        result: 'API Error: 529 Overloaded'
      })
    ];

    const result = classifyProviderOutage({ raw, stderr_tail: null });

    expect(result?.detail).toBe('http_500');
  });

  test('classifies the observed account limit result', () => {
    const finished_at = Date.parse('2026-09-01T05:39:00Z');
    const raw = [
      resultEvent({
        terminal_reason: 'api_error',
        api_error_status: 429,
        result: "You've hit your session limit · resets 6pm (Asia/Seoul)"
      })
    ];

    const result = classifyProviderOutage({
      raw,
      stderr_tail: null,
      finished_at
    });

    expect(result).toEqual({
      detail: 'usage_limit',
      message: "You've hit your session limit · resets 6pm (Asia/Seoul)",
      scope: 'account',
      resets_at: Date.parse('2026-09-01T09:00:00Z')
    });
  });

  test('moves a passed reset time to the next day', () => {
    const finished_at = Date.parse('2026-09-01T09:01:00Z');
    const raw = [
      resultEvent({
        api_error_status: 429,
        result: "You've hit your session limit · resets 6pm (Asia/Seoul)"
      })
    ];

    const result = classifyProviderOutage({
      raw,
      stderr_tail: null,
      finished_at
    });

    expect(result?.resets_at).toBe(Date.parse('2026-09-02T09:00:00Z'));
  });

  test('classifies a legacy 429 limit result as account usage', () => {
    const raw = [
      resultEvent({
        result: "API Error: 429 You've hit your weekly limit"
      })
    ];

    const result = classifyProviderOutage({ raw, stderr_tail: null });

    expect({ detail: result?.detail, scope: result?.scope }).toEqual({
      detail: 'usage_limit',
      scope: 'account'
    });
  });

  test('classifies a general structured 429 as rate limited', () => {
    const raw = [
      resultEvent({
        api_error_status: 429,
        result: 'Too many requests; retry later'
      })
    ];

    const result = classifyProviderOutage({ raw, stderr_tail: null });

    expect(result?.detail).toBe('rate_limited_429');
  });

  test('ignores assistant text that only quotes a session limit', () => {
    const raw = [
      {
        type: 'assistant',
        message: {
          content: [{ type: 'text', text: 'The log says session limit.' }]
        }
      }
    ];

    const result = classifyProviderOutage({ raw, stderr_tail: null });

    expect(result).toBeNull();
  });

  test('ignores an intermediate error result', () => {
    const raw = [
      resultEvent({ result: 'API Error: 529 Overloaded' }),
      resultEvent({ is_error: false, result: 'Recovered' })
    ];

    const result = classifyProviderOutage({ raw, stderr_tail: null });

    expect(result).toBeNull();
  });

  test('ignores outage text in a successful final result', () => {
    const raw = [
      resultEvent({ is_error: false, result: 'API Error: 529 Overloaded' })
    ];

    const result = classifyProviderOutage({ raw, stderr_tail: null });

    expect(result).toBeNull();
  });

  test('caps the matched source line at 512 characters', () => {
    const raw = [resultEvent({ result: `API Error: 529 ${'x'.repeat(600)}` })];

    const result = classifyProviderOutage({ raw, stderr_tail: null });

    expect(result?.message).toHaveLength(512);
  });
});

describe('runner/provider-outage stderr classification', () => {
  test('classifies a stderr-only 529 line as overloaded', () => {
    const stderr_tail = 'retrying\nAPI Error: 529';

    const result = classifyProviderOutage({ raw: [], stderr_tail });

    expect(result?.detail).toBe('overloaded_529');
  });

  test('classifies a stderr-only 502 line as http_502', () => {
    const stderr_tail = 'API Error: 502 Bad gateway';

    const result = classifyProviderOutage({ raw: [], stderr_tail });

    expect(result?.detail).toBe('http_502');
  });

  test('classifies a stderr-only 429 line as rate limited', () => {
    const stderr_tail = 'API Error: 429 Too many requests';

    const result = classifyProviderOutage({ raw: [], stderr_tail });

    expect(result?.detail).toBe('rate_limited_429');
  });

  test('ignores a stderr-only usage limit sentence', () => {
    const stderr_tail = "You've hit your session limit · resets 6pm";

    const result = classifyProviderOutage({ raw: [], stderr_tail });

    expect(result).toBeNull();
  });

  test('does not fall back to stderr after a final result', () => {
    const raw = [resultEvent({ result: 'permission denied' })];

    const result = classifyProviderOutage({
      raw,
      stderr_tail: 'API Error: 529'
    });

    expect(result).toBeNull();
  });
});

describe('runner/provider-outage reset extraction', () => {
  test('parses the approved month and day form', () => {
    const finished_at = Date.parse('2026-09-03T08:00:00Z');
    const raw = [
      resultEvent({
        api_error_status: 429,
        result: "You've hit your session limit · resets Sep 3, 6pm (Asia/Seoul)"
      })
    ];

    const result = classifyProviderOutage({
      raw,
      stderr_tail: null,
      finished_at
    });

    expect(result?.resets_at).toBe(Date.parse('2026-09-03T09:00:00Z'));
  });

  test('returns a null reset when result parsing fails', () => {
    const finished_at = Date.parse('2026-09-03T08:00:00Z');
    const raw = [
      resultEvent({
        api_error_status: 429,
        result: "You've hit your session limit · resets tomorrow evening"
      })
    ];

    const result = classifyProviderOutage({
      raw,
      stderr_tail: null,
      finished_at
    });

    expect(result?.resets_at).toBeNull();
  });

  test('falls back to the highest-percentage injected account window', () => {
    const finished_at = Date.parse('2026-09-03T08:00:00Z');
    const raw = [
      resultEvent({
        api_error_status: 429,
        result: "You've hit your session limit · resets tomorrow evening"
      })
    ];
    const account_row = {
      status: 'ok',
      windows: [
        { pct: 40, resetsAt: '2026-09-03T10:00:00Z' },
        { pct: 90, resetsAt: '2026-09-04T11:00:00Z' }
      ]
    };

    const result = classifyProviderOutage({
      raw,
      stderr_tail: null,
      finished_at,
      account_row
    });

    expect(result?.resets_at).toBe(Date.parse('2026-09-04T11:00:00Z'));
  });
});
