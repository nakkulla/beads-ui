import { readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { describe, expect, test } from 'vitest';
import {
  createTranscriptReducer,
  parseTranscript
} from './transcript-lines.js';

/**
 * Load a real runner fixture as an array of raw parsed jsonl objects.
 *
 * @param {string} name
 * @returns {unknown[]}
 */
function loadFixture(name) {
  const file = path.resolve(process.cwd(), 'server/worker/__fixtures__', name);
  return readFileSync(file, 'utf8')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .map((l) => JSON.parse(l));
}

/**
 * Accumulate a whole event list through the incremental reducer.
 *
 * @param {unknown[]} events
 */
function reduceAll(events) {
  const reducer = createTranscriptReducer();
  /** @type {import('./transcript-lines.js').DisplayLine[]} */
  const lines = [];
  for (const event of events) {
    for (const line of reducer.push(event)) {
      lines.push(line);
    }
  }
  return lines;
}

const FIXTURES = [
  'claude-success.jsonl',
  'claude-tools.jsonl',
  'codex-success.jsonl',
  'codex-failure.jsonl',
  'codex-resume.jsonl'
];

describe('createTranscriptReducer — equivalence with parseTranscript', () => {
  test.each(FIXTURES)('accumulates %s identically', (name) => {
    const events = loadFixture(name);

    const reduced = reduceAll(events);

    expect(reduced).toEqual(parseTranscript(events));
  });

  test('pairs a tool_result onto a tool line pushed in an earlier event', () => {
    const reducer = createTranscriptReducer();

    const tool_lines = reducer.push({
      type: 'assistant',
      message: {
        content: [
          {
            type: 'tool_use',
            id: 't1',
            name: 'Bash',
            input: { command: 'npm test' }
          }
        ]
      }
    });
    const paired = reducer.push({
      type: 'user',
      message: {
        content: [
          { type: 'tool_result', tool_use_id: 't1', content: '통과 41\n...' }
        ]
      }
    });

    expect(paired).toEqual([]);
    expect(tool_lines[0].result).toBe('통과 41');
  });

  test('parses jsonl strings and skips malformed entries', () => {
    const reducer = createTranscriptReducer();

    const first = reducer.push('{"type":"turn.completed"}');
    const second = reducer.push('{ not json');
    const third = reducer.push('   ');

    expect(first).toEqual([{ kind: 'result', success: true, text: 'DONE' }]);
    expect(second).toEqual([]);
    expect(third).toEqual([]);
  });

  test('keeps pairing state independent per reducer instance', () => {
    const a = createTranscriptReducer();
    const b = createTranscriptReducer();

    const a_tool = a.push({
      type: 'assistant',
      message: {
        content: [
          { type: 'tool_use', id: 't1', name: 'Read', input: { path: '/a' } }
        ]
      }
    });
    b.push({
      type: 'user',
      message: {
        content: [{ type: 'tool_result', tool_use_id: 't1', content: 'other' }]
      }
    });

    expect(a_tool[0].result).toBeUndefined();
  });
});

describe('parseCodex — main-session command_execution (UI-eey2 §9.3)', () => {
  test('projects a completed command_execution as a tool line', () => {
    const lines = parseTranscript([
      {
        type: 'item.completed',
        item: {
          id: 'i1',
          type: 'command_execution',
          command: 'npm test',
          exit_code: 0,
          status: 'completed',
          aggregated_output: 'Tests  6555 passed\ntrailing noise'
        }
      }
    ]);

    expect(lines).toHaveLength(1);
    expect(lines[0]).toMatchObject({
      kind: 'tool',
      tool: 'shell',
      icon: '⚡',
      command: 'npm test',
      result: 'exit 0 · Tests  6555 passed'
    });
  });

  test('falls back to the item status when no exit code is carried', () => {
    const lines = parseTranscript([
      {
        type: 'item.completed',
        item: {
          id: 'i1',
          type: 'command_execution',
          command: 'git push',
          status: 'failed'
        }
      }
    ]);

    expect(lines[0].result).toBe('failed');
  });

  test('drops the started twin so one execution is one line', () => {
    const lines = parseTranscript([
      {
        type: 'item.started',
        item: { id: 'i1', type: 'command_execution', command: 'ls' }
      }
    ]);

    expect(lines).toEqual([]);
  });
});
