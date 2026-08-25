import { describe, expect, test } from 'vitest';
import { createSessionRefTranscript } from './session-ref-transcript.js';

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
