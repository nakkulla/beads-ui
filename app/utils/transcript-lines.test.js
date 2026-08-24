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

describe('claude subagent lines (UI-2mpn §6.4)', () => {
  const AGENT_EVENT = {
    type: 'assistant',
    parent_tool_use_id: null,
    message: {
      content: [
        {
          type: 'tool_use',
          id: 'toolu_agent_1',
          name: 'Agent',
          input: {
            description: '스펙 문서 조사',
            prompt: '읽어 줘',
            subagent_type: 'general-purpose'
          }
        }
      ]
    }
  };
  const CHILD_EVENT = {
    type: 'assistant',
    parent_tool_use_id: 'toolu_agent_1',
    message: {
      content: [{ type: 'text', text: '스펙을 읽었습니다.' }]
    }
  };

  test('carries the launch id and description on the Agent line', () => {
    const lines = parseTranscript([AGENT_EVENT]);

    expect(lines[0]).toMatchObject({
      kind: 'tool',
      tool: 'Agent',
      launch_id: 'toolu_agent_1',
      command: '스펙 문서 조사'
    });
  });

  test('tags a child line with the launch it belongs to', () => {
    const lines = parseTranscript([AGENT_EVENT, CHILD_EVENT]);

    expect(lines[1]).toMatchObject({
      kind: 'assistant',
      parent_tool_use_id: 'toolu_agent_1'
    });
  });

  test('leaves a parent line untagged', () => {
    const lines = parseTranscript([AGENT_EVENT]);

    expect(lines[0].parent_tool_use_id).toBeUndefined();
  });

  test('marks an Agent line whose result reported an error', () => {
    const lines = parseTranscript([
      AGENT_EVENT,
      {
        type: 'user',
        message: {
          content: [
            {
              type: 'tool_result',
              tool_use_id: 'toolu_agent_1',
              content: '중단됨',
              is_error: true
            }
          ]
        }
      }
    ]);

    expect(lines[0].is_error).toBe(true);
  });

  test('drops child events when the reducer skips delegated lines', () => {
    const reducer = createTranscriptReducer({ skip_delegated: true });

    const produced = [
      ...reducer.push(AGENT_EVENT),
      ...reducer.push(CHILD_EVENT)
    ];

    expect(produced.map((line) => line.tool || line.kind)).toEqual(['Agent']);
  });
});

describe('claude system progress lines (UI-bau6)', () => {
  /**
   * @param {number} estimated_tokens
   */
  function thinkingTokens(estimated_tokens) {
    return { type: 'system', subtype: 'thinking_tokens', estimated_tokens };
  }

  test('projects system/init as a session-start line carrying the model', () => {
    const lines = parseTranscript([
      { type: 'system', subtype: 'init', model: 'claude-opus-4-5' }
    ]);

    expect(lines).toEqual([
      { kind: 'thinking', text: '세션 시작 · claude-opus-4-5' }
    ]);
  });

  test('omits the model when init does not name one', () => {
    const lines = parseTranscript([{ type: 'system', subtype: 'init' }]);

    expect(lines).toEqual([{ kind: 'thinking', text: '세션 시작' }]);
  });

  test('collapses a thinking_tokens burst onto one updated line', () => {
    const lines = parseTranscript([
      thinkingTokens(9),
      thinkingTokens(37),
      thinkingTokens(380)
    ]);

    expect(lines).toEqual([{ kind: 'thinking', text: '생각 중… 380 토큰' }]);
  });

  test('opens a new progress line after another event produced a line', () => {
    const lines = parseTranscript([
      thinkingTokens(9),
      {
        type: 'assistant',
        message: { content: [{ type: 'text', text: '끝' }] }
      },
      thinkingTokens(12)
    ]);

    expect(lines.map((line) => line.text)).toEqual([
      '생각 중… 9 토큰',
      '끝',
      '생각 중… 12 토큰'
    ]);
  });

  test('drops system subtypes that carry no progress', () => {
    const lines = parseTranscript([
      { type: 'system', subtype: 'hook_started', hook_name: 'SessionStart' }
    ]);

    expect(lines).toEqual([]);
  });

  test('keeps every progress line out of the non-thinking activity feed', () => {
    const lines = parseTranscript([
      { type: 'system', subtype: 'init', model: 'claude-opus-4-5' },
      thinkingTokens(9)
    ]);

    expect(lines.filter((line) => line.kind !== 'thinking')).toEqual([]);
  });

  test('updates the progress line in place for a live reducer', () => {
    const reducer = createTranscriptReducer();

    const first = reducer.push(thinkingTokens(9));
    const again = reducer.push(thinkingTokens(37));

    expect(again).toEqual([]);
    expect(first[0].text).toBe('생각 중… 37 토큰');
  });
});
