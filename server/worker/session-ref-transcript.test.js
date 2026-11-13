import { describe, expect, test } from 'vitest';
import { parseTranscript } from '../../app/utils/transcript-lines.js';
import { createSessionRefTranscript } from './session-ref-transcript.js';

describe('Hermes message projection', () => {
  test('projects user text and assistant tool calls with their paired output', () => {
    const adapter = createSessionRefTranscript('hermes');
    const rows = [
      { id: 1, timestamp: 1, role: 'user', content: 'inspect this' },
      {
        id: 2,
        timestamp: 2,
        role: 'assistant',
        content: 'Checking',
        tool_calls: JSON.stringify([
          {
            id: 'call1',
            type: 'function',
            function: { name: 'terminal', arguments: '{"command":"pwd"}' }
          }
        ])
      },
      {
        id: 3,
        timestamp: 3,
        role: 'tool',
        tool_call_id: 'call1',
        content: '/repo'
      }
    ];

    const lines = parseTranscript(
      rows.flatMap((row) => adapter.project(JSON.stringify(row)))
    );

    expect(lines).toMatchObject([
      { kind: 'user', text: 'inspect this' },
      { kind: 'assistant', text: 'Checking' },
      {
        kind: 'tool',
        tool: 'terminal',
        input: { command: 'pwd' },
        output: '/repo'
      }
    ]);
  });

  test('decodes structured text content without rendering images', () => {
    const adapter = createSessionRefTranscript('hermes');
    const row = {
      role: 'user',
      content:
        '\u0000json:[{"type":"text","text":"hi"},{"type":"image_url","image_url":{"url":"private"}}]'
    };

    const lines = parseTranscript(adapter.project(JSON.stringify(row)));

    expect(lines).toEqual([{ kind: 'user', text: 'hi' }]);
  });

  test('drops copied handoff messages while retaining distinct repeated turns', () => {
    const adapter = createSessionRefTranscript('hermes');
    const original = {
      message_uid: 'u1',
      timestamp: 1,
      role: 'user',
      content: 'again'
    };

    const result = [
      original,
      { ...original, id: 9 },
      { ...original, message_uid: 'u2', timestamp: 2 }
    ].flatMap((row) => adapter.project(JSON.stringify(row)));

    expect(result).toHaveLength(2);
  });

  test.each([
    { role: 'system', content: 'system prompt' },
    { role: 'assistant', content: 'summary', _compressed_summary: 1 },
    { role: 'user', content: 'hidden input', display_kind: 'hidden' },
    { role: 'assistant', content: 'unpublished reply', display_kind: 'hidden' },
    {
      role: 'user',
      content: 'model context',
      display_metadata: '{"model_only":true}'
    },
    { role: 'assistant', content: null, tool_calls: 'invalid' }
  ])('omits non-display data %j', (row) => {
    expect(
      createSessionRefTranscript('hermes').project(JSON.stringify(row))
    ).toEqual([]);
  });
});

/**
 * @param {'claude'|'codex'} provider
 * @param {unknown} record
 */
function projectOne(provider, record) {
  return createSessionRefTranscript(provider).project(JSON.stringify(record));
}

/**
 * @param {string} type - `event_msg` or `response_item`.
 * @param {Record<string, unknown>} payload
 */
function rollout(type, payload) {
  return JSON.stringify({
    timestamp: '2026-08-25T00:00:00.000Z',
    type,
    payload
  });
}

describe('claude pass filter', () => {
  test('passes an assistant record through unchanged', () => {
    const record = {
      type: 'assistant',
      message: { content: [{ type: 'text', text: 'hi' }] }
    };

    const result = projectOne('claude', record);

    expect(result).toEqual([record]);
  });

  test('passes a user record through unchanged', () => {
    const record = { type: 'user', message: { content: 'run the tests' } };

    expect(projectOne('claude', record)).toEqual([record]);
  });

  test('drops a record marked isMeta', () => {
    const record = { type: 'user', isMeta: true, message: { content: 'x' } };

    expect(projectOne('claude', record)).toEqual([]);
  });

  test('drops a record marked isSidechain', () => {
    const record = {
      type: 'assistant',
      isSidechain: true,
      message: { content: [] }
    };

    expect(projectOne('claude', record)).toEqual([]);
  });

  test('drops record types the runner stream never carries', () => {
    for (const type of [
      'attachment',
      'ai-title',
      'file-history-snapshot',
      'mode',
      'system'
    ]) {
      expect(projectOne('claude', { type })).toEqual([]);
    }
  });

  test('drops an unparsable line', () => {
    const adapter = createSessionRefTranscript('claude');

    expect(adapter.project('{not json')).toEqual([]);
    expect(adapter.project('')).toEqual([]);
  });
});

describe('codex rollout projection', () => {
  test.each(['commentary', 'final_answer'])(
    'projects an AgentMessage in phase %s',
    (phase) => {
      const adapter = createSessionRefTranscript('codex');

      const result = adapter.project(
        rollout('event_msg', {
          type: 'item_completed',
          item: {
            type: 'AgentMessage',
            phase,
            content: [
              { type: 'Text', text: '인계 · ' },
              { type: 'Text', text: '계속 진행' }
            ]
          }
        })
      );

      expect(result).toEqual([
        {
          type: 'item.completed',
          item: { type: 'agent_message', text: '인계 · 계속 진행' }
        }
      ]);
    }
  );

  test('projects UserMessage text parts regardless of their type casing', () => {
    const adapter = createSessionRefTranscript('codex');

    const result = adapter.project(
      rollout('event_msg', {
        type: 'item_completed',
        item: {
          type: 'UserMessage',
          content: [
            { type: 'text', text: '이어' },
            { type: 'Text', text: '가자' },
            { type: 'image', url: 'image.png' },
            { text: 42 },
            null
          ]
        }
      })
    );

    expect(result).toEqual([
      {
        type: 'item.completed',
        item: { type: 'user_message', text: '이어가자' }
      }
    ]);
  });

  test('projects Reasoning summary strings onto a reasoning item', () => {
    const adapter = createSessionRefTranscript('codex');

    const result = adapter.project(
      rollout('event_msg', {
        type: 'item_completed',
        item: {
          type: 'Reasoning',
          summary_text: ['첫 요약', '둘째 요약'],
          raw_content: ['private reasoning']
        }
      })
    );

    expect(result).toEqual([
      {
        type: 'item.completed',
        item: { type: 'reasoning', text: '첫 요약\n둘째 요약' }
      }
    ]);
  });

  test.each([
    null,
    {},
    { type: 'AgentMessage', content: [] },
    { type: 'UserMessage', content: null },
    { type: 'Reasoning', summary_text: [] },
    { type: 'Reasoning', summary_text: ['', ' '] },
    { type: 'Reasoning', summary_text: [null, { text: 'unknown' }] },
    { type: 'Reasoning', raw_content: ['private reasoning'] },
    { type: 'CommandExecution', content: [{ text: 'duplicate command' }] },
    { type: 'FileChange', content: [{ text: 'untracked event' }] }
  ])('drops an unsupported or empty completed item %j', (item) => {
    const adapter = createSessionRefTranscript('codex');

    const result = adapter.project(
      rollout('event_msg', { type: 'item_completed', item })
    );

    expect(result).toEqual([]);
  });

  test('projects user_message onto the extension item', () => {
    const adapter = createSessionRefTranscript('codex');

    const result = adapter.project(
      rollout('event_msg', { type: 'user_message', message: 'do it' })
    );

    expect(result).toEqual([
      { type: 'item.completed', item: { type: 'user_message', text: 'do it' } }
    ]);
  });

  test('projects agent_message onto an agent_message item', () => {
    const adapter = createSessionRefTranscript('codex');

    const result = adapter.project(
      rollout('event_msg', { type: 'agent_message', message: 'done' })
    );

    expect(result).toEqual([
      { type: 'item.completed', item: { type: 'agent_message', text: 'done' } }
    ]);
  });

  test('projects agent_reasoning onto a reasoning item', () => {
    const adapter = createSessionRefTranscript('codex');

    const result = adapter.project(
      rollout('event_msg', { type: 'agent_reasoning', text: '**Thinking**' })
    );

    expect(result).toEqual([
      {
        type: 'item.completed',
        item: { type: 'reasoning', text: '**Thinking**' }
      }
    ]);
  });

  test('projects task_complete onto turn.completed', () => {
    const adapter = createSessionRefTranscript('codex');

    const result = adapter.project(
      rollout('event_msg', { type: 'task_complete', turn_id: 't1' })
    );

    expect(result).toEqual([{ type: 'turn.completed' }]);
  });

  test('projects error onto an error event', () => {
    const adapter = createSessionRefTranscript('codex');

    const result = adapter.project(
      rollout('event_msg', { type: 'error', message: 'stream broke' })
    );

    expect(result).toEqual([{ type: 'error', message: 'stream broke' }]);
  });

  test('emits nothing for a custom_tool_call and pairs its output', () => {
    const adapter = createSessionRefTranscript('codex');

    const call = adapter.project(
      rollout('response_item', {
        type: 'custom_tool_call',
        call_id: 'c1',
        name: 'exec',
        input: 'ls -al'
      })
    );
    const output = adapter.project(
      rollout('response_item', {
        type: 'custom_tool_call_output',
        call_id: 'c1',
        output: [
          { type: 'input_text', text: 'a\n' },
          { type: 'input_text', text: 'b\n' }
        ]
      })
    );

    expect(call).toEqual([]);
    expect(output).toEqual([
      {
        type: 'item.completed',
        item: {
          type: 'command_execution',
          command: 'ls -al',
          aggregated_output: 'a\nb\n',
          status: 'completed'
        }
      }
    ]);
  });

  test('accepts a string output', () => {
    const adapter = createSessionRefTranscript('codex');
    adapter.project(
      rollout('response_item', {
        type: 'custom_tool_call',
        call_id: 'c1',
        name: 'exec',
        input: 'pwd'
      })
    );

    const result = adapter.project(
      rollout('response_item', {
        type: 'function_call_output',
        call_id: 'c1',
        output: '/repo\n'
      })
    );

    expect(result[0]).toEqual({
      type: 'item.completed',
      item: {
        type: 'command_execution',
        command: 'pwd',
        aggregated_output: '/repo\n',
        status: 'completed'
      }
    });
  });

  test('extracts the command from a function_call arguments payload', () => {
    const adapter = createSessionRefTranscript('codex');
    adapter.project(
      rollout('response_item', {
        type: 'function_call',
        call_id: 'f1',
        name: 'shell',
        arguments: JSON.stringify({ cmd: 'npm test', workdir: '/repo' })
      })
    );

    const result = adapter.project(
      rollout('response_item', {
        type: 'function_call_output',
        call_id: 'f1',
        output: 'ok'
      })
    );

    expect(/** @type {any} */ (result[0]).item.command).toBe('npm test');
  });

  test('drops an output whose call was never paired', () => {
    const adapter = createSessionRefTranscript('codex');

    const result = adapter.project(
      rollout('response_item', {
        type: 'custom_tool_call_output',
        call_id: 'orphan',
        output: 'x'
      })
    );

    expect(result).toEqual([]);
  });

  test('drops a function_call that names no command', () => {
    const adapter = createSessionRefTranscript('codex');
    adapter.project(
      rollout('response_item', {
        type: 'function_call',
        call_id: 'f2',
        name: 'apply_patch',
        arguments: JSON.stringify({ patch: '---' })
      })
    );

    const result = adapter.project(
      rollout('response_item', {
        type: 'function_call_output',
        call_id: 'f2',
        output: 'applied'
      })
    );

    expect(result).toEqual([]);
  });

  test('drops the record kinds the drawer has no line for', () => {
    const adapter = createSessionRefTranscript('codex');

    const dropped = [
      JSON.stringify({ type: 'session_meta', payload: { session_id: 's' } }),
      JSON.stringify({ type: 'turn_context', payload: { effort: 'high' } }),
      JSON.stringify({ type: 'world_state', payload: {} }),
      rollout('event_msg', { type: 'token_count', info: {} }),
      rollout('event_msg', { type: 'task_started' }),
      rollout('event_msg', { type: 'patch_apply_end', success: true }),
      rollout('response_item', { type: 'message', role: 'user', content: [] }),
      rollout('response_item', { type: 'reasoning', encrypted_content: 'x' })
    ];

    expect(dropped.flatMap((line) => adapter.project(line))).toEqual([]);
  });
});

describe('pairing state across snapshot and append', () => {
  test('pairs an output appended after the snapshot with its earlier call', () => {
    const adapter = createSessionRefTranscript('codex');
    const snapshot_lines = [
      rollout('event_msg', { type: 'agent_message', message: 'starting' }),
      rollout('response_item', {
        type: 'custom_tool_call',
        call_id: 'c9',
        name: 'exec',
        input: 'make build'
      })
    ];

    const snapshot = snapshot_lines.flatMap((line) => adapter.project(line));
    const append = adapter.project(
      rollout('response_item', {
        type: 'custom_tool_call_output',
        call_id: 'c9',
        output: [{ text: 'built' }]
      })
    );

    expect(snapshot).toHaveLength(1);
    expect(/** @type {any} */ (append[0]).item).toEqual({
      type: 'command_execution',
      command: 'make build',
      aggregated_output: 'built',
      status: 'completed'
    });
  });
});
