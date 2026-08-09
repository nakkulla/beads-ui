import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, test } from 'vitest';
import { replayUsage } from './usage-replay.js';
import { createUsageStore } from './usage-store.js';

const FIXTURE_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '__fixtures__'
);

/**
 * Raw stream-json lines of the tools fixture — the same file the usage-store
 * tests use, which repeats one `message.id` across several assistant events.
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

/**
 * A session log that hands back exactly the lines given (the read side is all
 * `replayUsage` touches).
 *
 * @param {unknown[]} lines
 */
function fakeSessionLog(lines) {
  return /** @type {any} */ ({
    read: () => lines
  });
}

describe('worker/usage-replay (UI-ediw)', () => {
  test('rebuilds the per-message tally from a persisted stream', () => {
    const usage_store = createUsageStore();
    const lines = toolsFixtureLines().filter((l) => l.type !== 'result');

    const replayed = replayUsage({
      session_log: fakeSessionLog(lines),
      usage_store,
      workspace: '/ws',
      attempt_id: 'a1'
    });

    expect(replayed).toBe(true);
    const tally = usage_store.get('/ws', 'a1');
    expect(tally?.output_tokens).toBeGreaterThan(0);
  });

  test('counts a repeated message id once', () => {
    const usage_store = createUsageStore();
    const lines = [
      {
        type: 'assistant',
        message: {
          id: 'm1',
          content: [{ type: 'text', text: 'hi' }],
          usage: { input_tokens: 10, output_tokens: 4 }
        }
      },
      {
        type: 'assistant',
        message: {
          id: 'm1',
          content: [{ type: 'text', text: 'hi there' }],
          usage: { input_tokens: 10, output_tokens: 9 }
        }
      }
    ];

    replayUsage({
      session_log: fakeSessionLog(lines),
      usage_store,
      workspace: '/ws',
      attempt_id: 'a1'
    });

    expect(usage_store.get('/ws', 'a1')).toMatchObject({
      input_tokens: 10,
      output_tokens: 9
    });
  });

  test('lets a logged result event supersede the per-message tally', () => {
    const usage_store = createUsageStore();
    const lines = [
      {
        type: 'assistant',
        message: {
          id: 'm1',
          content: [{ type: 'text', text: 'hi' }],
          usage: { input_tokens: 10, output_tokens: 4 }
        }
      },
      {
        type: 'result',
        usage: { input_tokens: 18, output_tokens: 1113 },
        total_cost_usd: 0.035
      }
    ];

    replayUsage({
      session_log: fakeSessionLog(lines),
      usage_store,
      workspace: '/ws',
      attempt_id: 'a1'
    });

    expect(usage_store.get('/ws', 'a1')).toMatchObject({
      input_tokens: 18,
      output_tokens: 1113,
      total_cost_usd: 0.035
    });
  });

  test('marks a recovered tally as replayed', () => {
    const usage_store = createUsageStore();

    replayUsage({
      session_log: fakeSessionLog([
        {
          type: 'assistant',
          message: {
            id: 'm1',
            content: [{ type: 'text', text: 'hi' }],
            usage: { input_tokens: 10, output_tokens: 4 }
          }
        }
      ]),
      usage_store,
      workspace: '/ws',
      attempt_id: 'a1'
    });

    expect(usage_store.get('/ws', 'a1')?.replayed).toBe(true);
  });

  test('records nothing for an absent log', () => {
    const usage_store = createUsageStore();

    const replayed = replayUsage({
      session_log: fakeSessionLog([]),
      usage_store,
      workspace: '/ws',
      attempt_id: 'a1'
    });

    expect(replayed).toBe(false);
    expect(usage_store.get('/ws', 'a1')).toBe(null);
  });

  test('records nothing for a log with no usage events', () => {
    const usage_store = createUsageStore();

    const replayed = replayUsage({
      session_log: fakeSessionLog([
        { type: 'system', subtype: 'init', session_id: 's1' },
        { type: 'user', message: { content: [] } }
      ]),
      usage_store,
      workspace: '/ws',
      attempt_id: 'a1'
    });

    expect(replayed).toBe(false);
    expect(usage_store.get('/ws', 'a1')).toBe(null);
  });

  test('lifts a codex turn total when the attempt ran on codex', () => {
    const usage_store = createUsageStore();

    const replayed = replayUsage({
      session_log: fakeSessionLog([
        {
          type: 'turn.completed',
          usage: {
            input_tokens: 34610,
            cached_input_tokens: 16128,
            cache_write_input_tokens: 0,
            output_tokens: 62
          }
        }
      ]),
      usage_store,
      workspace: '/ws',
      attempt_id: 'a1',
      runner: 'codex'
    });

    expect(replayed).toBe(true);
    expect(usage_store.get('/ws', 'a1')).toMatchObject({
      input_tokens: 34610,
      output_tokens: 62,
      cache_read_input_tokens: 16128
    });
  });

  // Characterization: an attempt with no recorded runner replays through claude,
  // which is what every pre-catalog attempt record needs.
  test('replays through claude when no runner is given', () => {
    const usage_store = createUsageStore();

    const replayed = replayUsage({
      session_log: fakeSessionLog([
        {
          type: 'result',
          usage: { input_tokens: 18, output_tokens: 1113 }
        }
      ]),
      usage_store,
      workspace: '/ws',
      attempt_id: 'a1'
    });

    expect(replayed).toBe(true);
    expect(usage_store.get('/ws', 'a1')).toMatchObject({
      input_tokens: 18,
      output_tokens: 1113
    });
  });

  test('returns false when the log read throws', () => {
    const usage_store = createUsageStore();
    const session_log = /** @type {any} */ ({
      read: () => {
        throw new Error('boom');
      }
    });

    const replayed = replayUsage({
      session_log,
      usage_store,
      workspace: '/ws',
      attempt_id: 'a1'
    });

    expect(replayed).toBe(false);
  });
});
