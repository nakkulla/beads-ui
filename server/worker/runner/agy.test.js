import { fileURLToPath } from 'node:url';
import { describe, expect, test, vi } from 'vitest';
import { agyLauncherPath, agySpec, liftUsage, spawnAgy } from './agy.js';
import { makeFixtureSpawn } from './fixture-spawn.js';

const STREAM_FIXTURE = fileURLToPath(
  new URL('../__fixtures__/agy-stream-subagent.jsonl', import.meta.url)
);

const BEAD = { id: 'UI-1', prompt: 'do the task' };
const WS = '/tmp/ws';
const LAUNCHER = '/home/test/.local/bin/agy';

/**
 * @param {string} conversation_id
 * @returns {string}
 */
function initLine(conversation_id) {
  return JSON.stringify({
    event: 'init',
    conversation_id,
    init: { model: 'gemini-4-neon-high' }
  });
}

/**
 * @param {string} status
 * @param {Record<string, unknown>} [extra]
 * @returns {string}
 */
function resultLine(status, extra = {}) {
  return JSON.stringify({
    event: 'result',
    result: { conversation_id: 'c-1', status, response: 'done', ...extra }
  });
}

/**
 * @param {number} step_index
 * @param {string} state
 * @param {string} text_delta
 * @returns {string}
 */
function responseLine(step_index, state, text_delta) {
  return JSON.stringify({
    event: 'step_update',
    step_update: {
      conversation_id: 'c-1',
      step_index,
      state,
      step_type: 'agent_response',
      text_delta
    }
  });
}

/**
 * @param {string} command
 * @param {string} state
 * @returns {string}
 */
function commandLine(command, state) {
  return JSON.stringify({
    event: 'step_update',
    step_update: {
      conversation_id: 'c-1',
      step_index: 3,
      state,
      step_type: 'tool',
      tool_name: 'run_command',
      tool_info: { name: 'run_command', parameters: { CommandLine: command } }
    }
  });
}

describe('runner/agy argv', () => {
  test('launches the launcher with the stream-json argv', () => {
    const spec = agySpec(undefined, { launcher: LAUNCHER });

    const built = spec.buildArgv(BEAD, WS, { model: 'gemini-4-neon-high' });

    expect(built.command).toBe(LAUNCHER);
    expect(built.args[0]).toBe('-p');
    expect(built.args.slice(2)).toEqual([
      '--output-format',
      'stream-json',
      '--model',
      'gemini-4-neon-high',
      '--dangerously-skip-permissions'
    ]);
  });

  test('resolves the builtin command to the home launcher', () => {
    const spec = agySpec();

    const built = spec.buildArgv(BEAD, WS, { model: 'gemini-4-neon-high' });

    expect(built.command).toBe(agyLauncherPath());
    expect(agyLauncherPath('/home/u')).toBe('/home/u/.local/bin/agy');
  });

  test('keeps a configured command override verbatim', () => {
    const spec = agySpec(
      { command: '/opt/agy', models: {}, efforts: [] },
      { launcher: LAUNCHER }
    );

    const built = spec.buildArgv(BEAD, WS, { model: 'gemini-4-neon-high' });

    expect(built.command).toBe('/opt/agy');
  });

  test('appends the conversation id on resume', () => {
    const spec = agySpec(undefined, { launcher: LAUNCHER });

    const built = spec.buildArgv(BEAD, WS, {
      model: 'gemini-4-neon-high',
      resume_session_id: 'conv-1'
    });

    expect(built.args.slice(-2)).toEqual(['--conversation', 'conv-1']);
  });

  test('prepends the system prompt to the task prompt', () => {
    const spec = agySpec(undefined, { launcher: LAUNCHER });

    const built = spec.buildArgv(BEAD, WS, { model: 'gemini-4-neon-high' });

    expect(built.task_prompt).toBe('do the task');
    expect(built.system_prompt?.length).toBeGreaterThan(0);
    expect(built.args[1]).toBe(
      `${built.system_prompt}\n\n${built.task_prompt}`
    );
  });

  test('refuses a fork request', () => {
    const spec = agySpec(undefined, { launcher: LAUNCHER });

    const build = () =>
      spec.buildArgv(BEAD, WS, {
        model: 'gemini-4-neon-high',
        resume_session_id: 'conv-1',
        fork_session: true
      });

    expect(build).toThrow('fork');
  });

  test('refuses the fast speed', () => {
    const spec = agySpec(undefined, { launcher: LAUNCHER });

    const build = () =>
      spec.buildArgv(BEAD, WS, { model: 'gemini-4-neon-high', speed: 'fast' });

    expect(build).toThrow('fast');
  });

  test('sets AGY_SILENT and the guard hook path in the environment', () => {
    const spec = agySpec(undefined, { launcher: LAUNCHER });

    const built = spec.buildArgv(BEAD, WS, {
      model: 'gemini-4-neon-high',
      guard_hook_path: '/state/attempt-1/pre-tool-hook'
    });

    expect(built.env).toMatchObject({
      AGY_SILENT: '1',
      BDUI_PRETOOL_HOOK: '/state/attempt-1/pre-tool-hook'
    });
  });

  test('falls back to the catalog default model', () => {
    const spec = agySpec(
      {
        command: 'agy',
        models: {},
        efforts: [],
        default_model: 'gemini-4-neon-high'
      },
      { launcher: LAUNCHER }
    );

    const built = spec.buildArgv(BEAD, WS, {});

    expect(built.args).toContain('gemini-4-neon-high');
  });
});

describe('runner/agy stream', () => {
  test('emits the init conversation id once', async () => {
    const spawn_impl = makeFixtureSpawn({ file: STREAM_FIXTURE, exit: 0 });
    const handle = spawnAgy(BEAD, WS, {}, { spawn_impl, launcher: LAUNCHER });
    /** @type {string[]} */
    const ids = [];
    handle.events.on('session_id', (id) => ids.push(id));

    await handle.done;

    expect(ids).toEqual(['efb3b87f-520e-4a15-8326-e1414261ad29']);
  });

  test('passes a SUCCESS result', async () => {
    const spawn_impl = makeFixtureSpawn({ file: STREAM_FIXTURE, exit: 0 });

    const v = await spawnAgy(BEAD, WS, {}, { spawn_impl, launcher: LAUNCHER })
      .done;

    expect(v.success).toBe(true);
    expect(v.reason).toBe('ok');
  });

  test('fails a non-SUCCESS result even on exit 0', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [initLine('c-1'), resultLine('ERROR')],
      exit: 0
    });

    const v = await spawnAgy(BEAD, WS, {}, { spawn_impl, launcher: LAUNCHER })
      .done;

    expect(v.success).toBe(false);
    expect(v.reason).toBe('turn_failed');
  });

  test('fails a stream without a result line', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [initLine('c-1'), responseLine(2, 'DONE', 'hello\n')],
      exit: 0
    });

    const v = await spawnAgy(BEAD, WS, {}, { spawn_impl, launcher: LAUNCHER })
      .done;

    expect(v.success).toBe(false);
    expect(v.reason).toBe('no_result');
  });

  test('judges the last result line', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [initLine('c-1'), resultLine('SUCCESS'), resultLine('ERROR')],
      exit: 0
    });

    const v = await spawnAgy(BEAD, WS, {}, { spawn_impl, launcher: LAUNCHER })
      .done;

    expect(v.success).toBe(false);
  });

  test('maps the result usage onto the worker tally names', async () => {
    const spawn_impl = makeFixtureSpawn({ file: STREAM_FIXTURE, exit: 0 });

    const v = await spawnAgy(BEAD, WS, {}, { spawn_impl, launcher: LAUNCHER })
      .done;

    expect(v.events.find((e) => e.kind === 'result')?.usage).toEqual({
      input_tokens: 25672,
      output_tokens: 966,
      cache_read_input_tokens: 50414,
      reasoning_output_tokens: 789
    });
  });

  test('lifts no usage from a non-result line', () => {
    const raw = JSON.parse(responseLine(2, 'DONE', 'x'));

    const lifted = liftUsage(raw);

    expect(lifted).toBeNull();
  });

  test('ignores broken JSON lines', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [initLine('c-1'), '{"event": "step_upd', resultLine('SUCCESS')],
      exit: 0
    });

    const v = await spawnAgy(BEAD, WS, {}, { spawn_impl, launcher: LAUNCHER })
      .done;

    expect(v.success).toBe(true);
  });

  test('emits one shell tool event per run_command step', async () => {
    const spawn_impl = makeFixtureSpawn({ file: STREAM_FIXTURE, exit: 0 });

    const v = await spawnAgy(BEAD, WS, {}, { spawn_impl, launcher: LAUNCHER })
      .done;

    expect(
      v.events.filter((e) => e.kind === 'tool' && e.name === 'shell')
    ).toEqual([expect.objectContaining({ input: { command: 'ls' } })]);
  });

  test('extracts the run_command line for the merge guard', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [
        initLine('c-1'),
        commandLine('gh pr merge 42', 'ACTIVE'),
        resultLine('SUCCESS')
      ]
    });
    const kill_impl = vi.fn();

    const v = await spawnAgy(
      BEAD,
      WS,
      {},
      { spawn_impl, kill_impl, launcher: LAUNCHER }
    ).done;

    expect(
      v.events.some((e) => e.guard_warning?.command === 'gh pr merge 42')
    ).toBe(true);
  });

  test('summarizes with the first line of the last response', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [
        initLine('c-1'),
        responseLine(2, 'DONE', 'working on it\n'),
        responseLine(4, 'ACTIVE', '성공 · PR 열림\n'),
        responseLine(4, 'DONE', `details ${'x'.repeat(300)}\n`),
        resultLine('SUCCESS')
      ]
    });

    const v = await spawnAgy(BEAD, WS, {}, { spawn_impl, launcher: LAUNCHER })
      .done;

    expect(v.summary).toBe('성공 · PR 열림');
    expect(v.terminal_result).toEqual({ kind: 'success' });
  });

  test('caps the summary at 200 characters', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [initLine('c-1'), responseLine(2, 'DONE', 'y'.repeat(300))],
      exit: 0
    });

    const v = await spawnAgy(BEAD, WS, {}, { spawn_impl, launcher: LAUNCHER })
      .done;

    expect(v.summary).toBe('y'.repeat(200));
  });

  test('joins response fragments into one text event', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [
        initLine('c-1'),
        responseLine(2, 'ACTIVE', 'hel'),
        responseLine(2, 'DONE', 'lo'),
        resultLine('SUCCESS')
      ]
    });

    const v = await spawnAgy(BEAD, WS, {}, { spawn_impl, launcher: LAUNCHER })
      .done;

    expect(v.events.filter((e) => e.kind === 'text')).toEqual([
      expect.objectContaining({ text: 'hello' })
    ]);
  });

  test('blocks on a question tool', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [
        initLine('c-1'),
        JSON.stringify({
          event: 'step_update',
          step_update: {
            step_index: 3,
            state: 'ACTIVE',
            step_type: 'tool',
            tool_name: 'ask_question',
            tool_info: { name: 'ask_question', parameters: {} }
          }
        }),
        resultLine('SUCCESS')
      ]
    });
    const kill_impl = vi.fn();

    const v = await spawnAgy(
      BEAD,
      WS,
      {},
      { spawn_impl, kill_impl, launcher: LAUNCHER }
    ).done;

    expect(v.blocked).toBe(true);
  });
});
