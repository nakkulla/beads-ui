import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, test } from 'vitest';
import { classifyProviderOutage } from './codex-outage.js';

const FIXTURE_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '__fixtures__'
);

const FINISHED_AT = Date.parse('2026-09-08T09:00:00Z');
const WORKSPACE_CREDITS_MESSAGE =
  'Your workspace is out of credits. Ask your workspace owner to refill in order to continue.';

/**
 * Read one captured `codex exec --json` stream as parsed events.
 *
 * @param {string} name
 * @returns {any[]}
 */
function fixtureEvents(name) {
  return fs
    .readFileSync(path.join(FIXTURE_DIR, name), 'utf8')
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)
    .map((line) => JSON.parse(line));
}

/**
 * Build one codex error envelope in the shape the captured 400 fixture proves.
 * These 429/5xx payloads are SHAPE-DERIVED from that real capture, not captured
 * themselves — no rate-limited codex account was available to record.
 *
 * @param {number} status
 * @param {string} message
 * @param {{ error_type?: string, extra?: Record<string, any> }} [options]
 * @returns {any[]}
 */
function shapedEnvelope(status, message, options = {}) {
  const envelope = JSON.stringify({
    type: 'error',
    status,
    error: {
      type: options.error_type ?? 'invalid_request_error',
      message,
      ...(options.extra ?? {})
    }
  });
  return [
    { type: 'error', message: envelope },
    { type: 'turn.failed', error: { message: envelope } }
  ];
}

describe('codex provider outage classifier', () => {
  test('returns null for the captured 400 invalid-request failure', () => {
    const raw = fixtureEvents('codex-turn-failed-400.jsonl');

    const outage = classifyProviderOutage({
      raw,
      stderr_tail: '',
      finished_at: FINISHED_AT
    });

    expect(outage).toBeNull();
  });

  test('returns null for the captured 401 authentication failure', () => {
    const raw = fixtureEvents('codex-turn-failed-401.jsonl');

    const outage = classifyProviderOutage({
      raw,
      stderr_tail: '',
      finished_at: FINISHED_AT
    });

    expect(outage).toBeNull();
  });

  test('returns null for a healthy stream', () => {
    const raw = fixtureEvents('codex-probe-ok.jsonl');

    const outage = classifyProviderOutage({
      raw,
      stderr_tail: '',
      finished_at: FINISHED_AT
    });

    expect(outage).toBeNull();
  });

  test('classifies a 429 without quota wording as a provider rate limit', () => {
    const raw = shapedEnvelope(429, 'Too many requests. Please slow down.', {
      error_type: 'rate_limit_error'
    });

    const outage = classifyProviderOutage({
      raw,
      stderr_tail: '',
      finished_at: FINISHED_AT
    });

    expect(outage).toMatchObject({
      detail: 'rate_limited_429',
      scope: 'provider',
      resets_at: null
    });
  });

  test('classifies a 429 naming the plan quota as an account usage limit', () => {
    const raw = shapedEnvelope(
      429,
      'You have hit your usage limit for this plan.',
      { error_type: 'usage_limit_reached' }
    );

    const outage = classifyProviderOutage({
      raw,
      stderr_tail: '',
      finished_at: FINISHED_AT
    });

    expect(outage).toMatchObject({
      detail: 'usage_limit',
      scope: 'account'
    });
  });

  test('keeps the reset the payload carries', () => {
    const raw = shapedEnvelope(429, 'usage limit reached', {
      error_type: 'usage_limit_reached',
      extra: { resets_at: '2026-09-08T12:00:00Z' }
    });

    const outage = classifyProviderOutage({
      raw,
      stderr_tail: '',
      finished_at: FINISHED_AT
    });

    expect(outage?.resets_at).toEqual(Date.parse('2026-09-08T12:00:00Z'));
  });

  test.each([
    [
      'turn.failed',
      { type: 'turn.failed', error: { message: WORKSPACE_CREDITS_MESSAGE } }
    ],
    ['top-level error', { type: 'error', message: WORKSPACE_CREDITS_MESSAGE }]
  ])(
    'classifies workspace-credit exhaustion in %s as an account usage limit',
    (_name, event) => {
      const raw = [event];

      const outage = classifyProviderOutage({ raw, finished_at: FINISHED_AT });

      expect(outage).toEqual({
        detail: 'usage_limit',
        message: WORKSPACE_CREDITS_MESSAGE,
        scope: 'account',
        resets_at: null
      });
    }
  );

  test.each([
    [
      'agent message',
      { type: 'agent_message', text: WORKSPACE_CREDITS_MESSAGE }
    ],
    [
      'warning error item',
      { type: 'error', message: WORKSPACE_CREDITS_MESSAGE }
    ]
  ])('ignores workspace-credit exhaustion quoted in an %s', (_name, item) => {
    const raw = [
      { type: 'item.completed', item },
      { type: 'turn.completed', usage: { input_tokens: 1 } }
    ];

    const outage = classifyProviderOutage({ raw, finished_at: FINISHED_AT });

    expect(outage).toBeNull();
  });

  test('ignores workspace-credit exhaustion in stderr without structured evidence', () => {
    /** @type {any[]} */
    const raw = [];

    const outage = classifyProviderOutage({
      raw,
      stderr_tail: WORKSPACE_CREDITS_MESSAGE,
      finished_at: FINISHED_AT
    });

    expect(outage).toBeNull();
  });

  test('ignores a structured failure that merely mentions credits', () => {
    const raw = [
      { type: 'error', message: 'Failed to fetch workspace credits.' }
    ];

    const outage = classifyProviderOutage({ raw, finished_at: FINISHED_AT });

    expect(outage).toBeNull();
  });

  test.each([400, 401, 403])(
    'preserves a %s envelope that quotes the workspace-credit message',
    (status) => {
      const raw = shapedEnvelope(status, WORKSPACE_CREDITS_MESSAGE);

      const outage = classifyProviderOutage({ raw, finished_at: FINISHED_AT });

      expect(outage).toBeNull();
    }
  );

  test('preserves the first outage before a workspace-credit failure', () => {
    const raw = [
      ...shapedEnvelope(503, 'The service is temporarily unavailable.'),
      { type: 'turn.failed', error: { message: WORKSPACE_CREDITS_MESSAGE } }
    ];

    const outage = classifyProviderOutage({ raw, finished_at: FINISHED_AT });

    expect(outage).toMatchObject({ detail: 'http_503', scope: 'provider' });
  });

  test('leaves resets_at null when the payload carries none', () => {
    const raw = shapedEnvelope(429, 'usage limit reached', {
      error_type: 'usage_limit_reached'
    });

    const outage = classifyProviderOutage({
      raw,
      stderr_tail: '',
      finished_at: FINISHED_AT
    });

    expect(outage?.resets_at).toBeNull();
  });

  test('classifies a 5xx envelope as a provider service outage', () => {
    const raw = shapedEnvelope(503, 'The service is temporarily unavailable.', {
      error_type: 'server_error'
    });

    const outage = classifyProviderOutage({
      raw,
      stderr_tail: '',
      finished_at: FINISHED_AT
    });

    expect(outage).toMatchObject({ detail: 'http_503', scope: 'provider' });
  });

  test('classifies the transport line naming a 503 status', () => {
    const raw = [
      {
        type: 'turn.failed',
        error: {
          message:
            'unexpected status 503 Service Unavailable: upstream connect error, url: https://api.openai.com/v1/responses'
        }
      }
    ];

    const outage = classifyProviderOutage({
      raw,
      stderr_tail: '',
      finished_at: FINISHED_AT
    });

    expect(outage).toMatchObject({ detail: 'http_503', scope: 'provider' });
  });

  test('ignores a 429 quoted inside an agent message', () => {
    const raw = [
      {
        type: 'item.completed',
        item: {
          id: 'item_0',
          type: 'agent_message',
          text: 'The API replied 429 usage limit reached for your plan.'
        }
      },
      { type: 'turn.completed', usage: { input_tokens: 1 } }
    ];

    const outage = classifyProviderOutage({
      raw,
      stderr_tail: '',
      finished_at: FINISHED_AT
    });

    expect(outage).toBeNull();
  });

  test('ignores a warning error item the turn survived', () => {
    const raw = [
      {
        type: 'item.completed',
        item: {
          id: 'item_0',
          type: 'error',
          message: '{"type":"error","status":429,"error":{"type":"rate_limit"}}'
        }
      },
      { type: 'turn.completed', usage: { input_tokens: 1 } }
    ];

    const outage = classifyProviderOutage({
      raw,
      stderr_tail: '',
      finished_at: FINISHED_AT
    });

    expect(outage).toBeNull();
  });

  test('returns null for a local execution failure with no structured event', () => {
    const outage = classifyProviderOutage({
      raw: [],
      stderr_tail:
        'Not inside a trusted directory and --skip-git-repo-check was not specified.',
      finished_at: FINISHED_AT
    });

    expect(outage).toBeNull();
  });
});
