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

describe('사람 입력 턴 (UI-4xzk §5.3)', () => {
  test('returns a user line for a claude user turn carrying a string', () => {
    const lines = parseTranscript([
      { type: 'user', message: { content: '테스트를 먼저 붙여 줘' } }
    ]);

    expect(lines).toEqual([{ kind: 'user', text: '테스트를 먼저 붙여 줘' }]);
  });

  test('joins the text blocks of a claude user turn', () => {
    const lines = parseTranscript([
      {
        type: 'user',
        message: {
          content: [
            { type: 'text', text: '스펙 §6.4를 보고' },
            { type: 'text', text: '칩 자리를 맞춰 줘' }
          ]
        }
      }
    ]);

    expect(lines).toEqual([
      { kind: 'user', text: '스펙 §6.4를 보고\n칩 자리를 맞춰 줘' }
    ]);
  });

  test('strips injected system-reminder blocks from the human text', () => {
    const lines = parseTranscript([
      {
        type: 'user',
        message: {
          content: [
            {
              type: 'text',
              text: '<system-reminder>\ncontext\n</system-reminder>빌드해 줘'
            }
          ]
        }
      }
    ]);

    expect(lines).toEqual([{ kind: 'user', text: '빌드해 줘' }]);
  });

  test('omits a user turn whose text is empty once the reminder is stripped', () => {
    const lines = parseTranscript([
      {
        type: 'user',
        message: {
          content: [
            {
              type: 'text',
              text: '  <system-reminder>only context</system-reminder>  '
            }
          ]
        }
      }
    ]);

    expect(lines).toEqual([]);
  });

  test('leaves a tool_result-only user turn exactly as it was', () => {
    const lines = parseTranscript([
      {
        type: 'assistant',
        message: {
          content: [
            {
              type: 'tool_use',
              id: 't1',
              name: 'Read',
              input: { file_path: '/repo/a.js' }
            }
          ]
        }
      },
      {
        type: 'user',
        message: {
          content: [
            { type: 'tool_result', tool_use_id: 't1', content: 'ok\nmore' }
          ]
        }
      }
    ]);

    expect(lines.map((line) => line.kind)).toEqual(['tool']);
    expect(lines[0].result).toBe('ok');
  });

  test('returns a user line for the codex user_message extension item', () => {
    const lines = parseTranscript([
      {
        type: 'item.completed',
        item: { type: 'user_message', text: '재개 명령도 붙여 줘' }
      }
    ]);

    expect(lines).toEqual([{ kind: 'user', text: '재개 명령도 붙여 줘' }]);
  });

  test('omits a codex user_message with no text', () => {
    const lines = parseTranscript([
      { type: 'item.completed', item: { type: 'user_message', text: '   ' } }
    ]);

    expect(lines).toEqual([]);
  });
});

/**
 * A canonical delegation-monitor activity envelope (dotfiles D4).
 *
 * @param {Record<string, unknown>} item
 * @param {string} [schema]
 * @returns {Record<string, unknown>}
 */
function monitorActivity(item, schema = 'codex-delegation-monitor-v2') {
  return {
    schema,
    attempt_id: 'UI-y9hl-1',
    launch_id: 'launch-1',
    provider: 'codex',
    role: 'implementation',
    model: 'gpt-5.6-sol',
    thread_id: 'thread-1',
    turn_id: 'turn-1',
    recorded_at: '2026-09-08T04:27:00.000Z',
    event: { type: 'item.completed', item }
  };
}

/**
 * The single tool line one monitor envelope renders to.
 *
 * @param {Record<string, unknown>} raw
 */
function monitorLineOf(raw) {
  const lines = parseTranscript([raw]);
  expect(lines).toHaveLength(1);
  return lines[0];
}

describe('delegation monitor v2 details (UI-y9hl U1)', () => {
  test('renders a v1 activity with no detail text', () => {
    const line = monitorLineOf(
      monitorActivity(
        {
          id: 'i1',
          kind: 'activity',
          activity: 'command_execution',
          status: 'completed'
        },
        'codex-delegation-monitor-v1'
      )
    );

    expect(line).toEqual({
      kind: 'tool',
      tool: '명령 실행 · 완료',
      icon: '✓',
      expandable: false,
      result: ''
    });
  });

  test('appends command kind, relative path and exit code', () => {
    const line = monitorLineOf(
      monitorActivity({
        id: 'i1',
        kind: 'activity',
        activity: 'command_execution',
        status: 'completed',
        parsed_cmd: [{ type: 'read', path: 'server/worker/attach.js' }],
        exit_code: 0
      })
    );

    expect(line.result).toBe('read server/worker/attach.js · exit 0');
  });

  test('keeps the structured name next to the path', () => {
    const line = monitorLineOf(
      monitorActivity({
        id: 'i1',
        kind: 'activity',
        activity: 'command_execution',
        status: 'completed',
        parsed_cmd: [{ type: 'search', path: 'app', name: 'planStage' }]
      })
    );

    expect(line.result).toBe('search app planStage');
  });

  test('renders file changes as kind and relative path', () => {
    const line = monitorLineOf(
      monitorActivity({
        id: 'i1',
        kind: 'activity',
        activity: 'file_change',
        status: 'completed',
        changes: [
          { path: 'app/a.js', kind: 'add' },
          { path: 'app/b.js', kind: 'modify' },
          { path: 'app/c.js', kind: 'delete' }
        ]
      })
    );

    expect(line.result).toBe('추가 app/a.js · 수정 app/b.js · 삭제 app/c.js');
  });

  test('renders a v2 activity carrying no optional detail as before', () => {
    const line = monitorLineOf(
      monitorActivity({
        id: 'i1',
        kind: 'activity',
        activity: 'file_change',
        status: 'failed'
      })
    );

    expect(line).toEqual({
      kind: 'tool',
      tool: '파일 변경 · 실패',
      icon: '✗',
      expandable: false,
      result: ''
    });
  });

  test('drops a malformed exit code but keeps the command kind', () => {
    const line = monitorLineOf(
      monitorActivity({
        id: 'i1',
        kind: 'activity',
        activity: 'command_execution',
        status: 'completed',
        parsed_cmd: [{ type: 'list_files' }],
        exit_code: '0'
      })
    );

    expect(line.result).toBe('list_files');
  });

  test('drops an out-of-allowlist command type entirely', () => {
    const line = monitorLineOf(
      monitorActivity({
        id: 'i1',
        kind: 'activity',
        activity: 'command_execution',
        status: 'completed',
        parsed_cmd: [{ type: 'write' }]
      })
    );

    expect(line.result).toBe('');
  });

  test('drops an unknown detail field without expanding it', () => {
    const line = monitorLineOf(
      monitorActivity({
        id: 'i1',
        kind: 'activity',
        activity: 'command_execution',
        status: 'completed',
        parsed_cmd: [{ type: 'read', path: 'a.js', cmd: 'cat a.js' }]
      })
    );

    expect(line.result).toBe('');
  });

  test('drops an escaping path but keeps the command kind', () => {
    const line = monitorLineOf(
      monitorActivity({
        id: 'i1',
        kind: 'activity',
        activity: 'command_execution',
        status: 'completed',
        parsed_cmd: [{ type: 'read', path: '../secrets/id_rsa' }]
      })
    );

    expect(line.result).toBe('read');
  });

  test('drops an absolute path', () => {
    const line = monitorLineOf(
      monitorActivity({
        id: 'i1',
        kind: 'activity',
        activity: 'command_execution',
        status: 'completed',
        parsed_cmd: [{ type: 'read', path: '/etc/passwd' }]
      })
    );

    expect(line.result).toBe('read');
  });

  test('drops a path carrying control characters', () => {
    const line = monitorLineOf(
      monitorActivity({
        id: 'i1',
        kind: 'activity',
        activity: 'command_execution',
        status: 'completed',
        parsed_cmd: [{ type: 'read', path: 'app/a\u0001.js' }]
      })
    );

    expect(line.result).toBe('read');
  });

  test('drops a path longer than 256 characters', () => {
    const line = monitorLineOf(
      monitorActivity({
        id: 'i1',
        kind: 'activity',
        activity: 'command_execution',
        status: 'completed',
        parsed_cmd: [{ type: 'read', path: `${'a'.repeat(257)}.js` }]
      })
    );

    expect(line.result).toBe('read');
  });

  test('drops a name longer than 128 characters', () => {
    const line = monitorLineOf(
      monitorActivity({
        id: 'i1',
        kind: 'activity',
        activity: 'command_execution',
        status: 'completed',
        parsed_cmd: [{ type: 'search', name: 'n'.repeat(129) }]
      })
    );

    expect(line.result).toBe('search');
  });

  test('drops a detail array longer than twenty items', () => {
    const line = monitorLineOf(
      monitorActivity({
        id: 'i1',
        kind: 'activity',
        activity: 'file_change',
        status: 'completed',
        changes: Array.from({ length: 21 }, (_unused, index) => ({
          path: `app/f${index}.js`,
          kind: 'modify'
        })),
        details_truncated: true
      })
    );

    expect(line.result).toBe('');
  });

  test('marks a truncated detail array with an ellipsis', () => {
    const line = monitorLineOf(
      monitorActivity({
        id: 'i1',
        kind: 'activity',
        activity: 'file_change',
        status: 'completed',
        changes: [{ path: 'app/a.js', kind: 'add' }],
        details_truncated: true
      })
    );

    expect(line.result).toBe('추가 app/a.js · …');
  });

  test('drops file changes carried by a command_execution activity', () => {
    const line = monitorLineOf(
      monitorActivity({
        id: 'i1',
        kind: 'activity',
        activity: 'command_execution',
        status: 'completed',
        changes: [{ path: 'app/a.js', kind: 'add' }]
      })
    );

    expect(line.result).toBe('');
  });

  test('drops command details carried by an mcp_call activity', () => {
    const line = monitorLineOf(
      monitorActivity({
        id: 'i1',
        kind: 'activity',
        activity: 'mcp_call',
        status: 'completed',
        parsed_cmd: [{ type: 'read', path: 'app/a.js' }],
        exit_code: 0
      })
    );

    expect(line.result).toBe('');
  });

  test('drops an exit code carried by a file_change activity', () => {
    const line = monitorLineOf(
      monitorActivity({
        id: 'i1',
        kind: 'activity',
        activity: 'file_change',
        status: 'completed',
        changes: [{ path: 'app/a.js', kind: 'add' }],
        exit_code: 0
      })
    );

    expect(line.result).toBe('추가 app/a.js');
  });

  test('never surfaces a raw command, query or output payload', () => {
    const line = monitorLineOf(
      monitorActivity({
        id: 'i1',
        kind: 'activity',
        activity: 'command_execution',
        status: 'completed',
        parsed_cmd: [{ type: 'read', path: 'app/a.js' }],
        cmd: 'curl -H "authorization: SENTINEL-TOKEN" https://x',
        aggregated_output: 'SENTINEL-OUTPUT'
      })
    );

    expect(JSON.stringify(line)).not.toContain('SENTINEL');
  });
});
