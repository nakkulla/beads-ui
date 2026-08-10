import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, test } from 'vitest';
import { createUsageStore } from './usage-store.js';

const FIXTURE_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '__fixtures__'
);

/**
 * Raw stream-json lines of the tools fixture, which repeats the SAME
 * `message.id` across several assistant events — the shape that makes
 * event-wise summation double-count.
 *
 * @returns {any[]}
 */
function toolsFixtureLines() {
  const text = readFileSync(
    path.join(FIXTURE_DIR, 'claude-tools.jsonl'),
    'utf8'
  );
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .map((l) => JSON.parse(l));
}

describe('worker/usage-store', () => {
  test('returns null for an attempt that recorded nothing', () => {
    const store = createUsageStore();

    expect(store.get('/ws', 'a1')).toBe(null);
  });

  test('sums one usage per message id', () => {
    const store = createUsageStore();

    store.record('/ws', 'a1', {
      message_id: 'm1',
      input_tokens: 10,
      output_tokens: 5
    });
    store.record('/ws', 'a1', {
      message_id: 'm2',
      input_tokens: 8,
      output_tokens: 3
    });

    expect(store.get('/ws', 'a1')).toMatchObject({
      input_tokens: 18,
      output_tokens: 8
    });
  });

  test('replaces rather than adds a repeated message id', () => {
    const store = createUsageStore();

    store.record('/ws', 'a1', {
      message_id: 'm1',
      input_tokens: 10,
      output_tokens: 2
    });
    store.record('/ws', 'a1', {
      message_id: 'm1',
      input_tokens: 10,
      output_tokens: 9
    });

    expect(store.get('/ws', 'a1')).toMatchObject({
      input_tokens: 10,
      output_tokens: 9
    });
  });

  test('counts each repeated fixture message exactly once', () => {
    const store = createUsageStore();

    for (const raw of toolsFixtureLines()) {
      if (raw.type === 'assistant' && raw.message && raw.message.usage) {
        store.record('/ws', 'a1', {
          message_id: raw.message.id,
          ...raw.message.usage
        });
      }
    }

    // The fixture repeats msg_…v8JR 4× (input 10) and msg_…THfX 2× (input 8).
    expect(store.get('/ws', 'a1')?.input_tokens).toBe(18);
  });

  test('replaces the whole tally with the authoritative result usage', () => {
    const store = createUsageStore();
    store.record('/ws', 'a1', {
      message_id: 'm1',
      input_tokens: 10,
      output_tokens: 2
    });

    store.recordResult('/ws', 'a1', {
      input_tokens: 18,
      output_tokens: 1113,
      total_cost_usd: 0.0353
    });

    expect(store.get('/ws', 'a1')).toMatchObject({
      input_tokens: 18,
      output_tokens: 1113,
      total_cost_usd: 0.0353
    });
  });

  test('preserves reasoning output on an authoritative tally', () => {
    const store = createUsageStore();

    store.recordResult('/ws', 'a1', {
      input_tokens: 18,
      reasoning_output_tokens: 7
    });

    expect(store.get('/ws', 'a1')?.reasoning_output_tokens).toBe(7);
  });

  test('keeps a later message out of an already authoritative tally', () => {
    const store = createUsageStore();
    store.recordResult('/ws', 'a1', { input_tokens: 18, output_tokens: 1113 });

    store.record('/ws', 'a1', {
      message_id: 'm1',
      input_tokens: 10,
      output_tokens: 2
    });

    expect(store.get('/ws', 'a1')).toMatchObject({
      input_tokens: 18,
      output_tokens: 1113
    });
  });

  test('sums the cache fields alongside the token counts', () => {
    const store = createUsageStore();

    store.record('/ws', 'a1', {
      message_id: 'm1',
      input_tokens: 1,
      output_tokens: 1,
      cache_read_input_tokens: 100,
      cache_creation_input_tokens: 20
    });
    store.record('/ws', 'a1', {
      message_id: 'm2',
      input_tokens: 1,
      output_tokens: 1,
      cache_read_input_tokens: 5,
      cache_creation_input_tokens: 2
    });

    expect(store.get('/ws', 'a1')).toMatchObject({
      cache_read_input_tokens: 105,
      cache_creation_input_tokens: 22
    });
  });

  test('keeps attempts of different workspaces apart', () => {
    const store = createUsageStore();

    store.record('/a', 'a1', { message_id: 'm1', input_tokens: 10 });

    expect(store.get('/b', 'a1')).toBe(null);
  });

  test('resolves workspace keys so writer and reader share one lane', () => {
    const store = createUsageStore();

    store.record('/ws/sub/..', 'a1', { message_id: 'm1', input_tokens: 10 });

    expect(store.get('/ws', 'a1')?.input_tokens).toBe(10);
  });

  test('drops an attempt on clear', () => {
    const store = createUsageStore();
    store.record('/ws', 'a1', { message_id: 'm1', input_tokens: 10 });

    store.clearAttempt('/ws', 'a1');

    expect(store.get('/ws', 'a1')).toBe(null);
  });

  test('ignores a usage payload carrying no numeric field', () => {
    const store = createUsageStore();

    store.record('/ws', 'a1', { message_id: 'm1' });

    expect(store.get('/ws', 'a1')).toBe(null);
  });

  test('flags a summed tally marked replayed', () => {
    const store = createUsageStore();
    store.record('/ws', 'a1', { message_id: 'm1', input_tokens: 10 });

    store.markReplayed('/ws', 'a1');

    expect(store.get('/ws', 'a1')?.replayed).toBe(true);
  });

  test('flags an authoritative tally marked replayed', () => {
    const store = createUsageStore();
    store.recordResult('/ws', 'a1', { input_tokens: 18, output_tokens: 1113 });

    store.markReplayed('/ws', 'a1');

    expect(store.get('/ws', 'a1')?.replayed).toBe(true);
  });

  test('leaves a live tally without the replayed flag', () => {
    const store = createUsageStore();

    store.record('/ws', 'a1', { message_id: 'm1', input_tokens: 10 });

    expect(store.get('/ws', 'a1')?.replayed).toBe(undefined);
  });

  test('drops the replayed flag with the attempt', () => {
    const store = createUsageStore();
    store.record('/ws', 'a1', { message_id: 'm1', input_tokens: 10 });
    store.markReplayed('/ws', 'a1');

    store.clearAttempt('/ws', 'a1');

    expect(store.get('/ws', 'a1')).toBe(null);
  });
});
