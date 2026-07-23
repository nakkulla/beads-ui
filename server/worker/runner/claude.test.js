import { fileURLToPath } from 'node:url';
import { describe, expect, test, vi } from 'vitest';
import { claudeSpec, spawnClaude } from './claude.js';
import { makeFixtureSpawn } from './fixture-spawn.js';

const SUCCESS_FIXTURE = fileURLToPath(
  new URL('../__fixtures__/claude-success.jsonl', import.meta.url)
);
const TOOLS_FIXTURE = fileURLToPath(
  new URL('../__fixtures__/claude-tools.jsonl', import.meta.url)
);

/**
 * @param {Partial<{ subtype: string, is_error: boolean, permission_denials: any[] }>} [over]
 * @returns {string}
 */
function resultLine(over = {}) {
  return JSON.stringify({
    type: 'result',
    subtype: over.subtype ?? 'success',
    is_error: over.is_error ?? false,
    permission_denials: over.permission_denials ?? []
  });
}

const BEAD = { id: 'UI-1' };
const WS = '/tmp/ws';

describe('runner/claude 4-rule success', () => {
  test('passes on the real success fixture (one result, subtype success)', async () => {
    const spawn_impl = makeFixtureSpawn({ file: SUCCESS_FIXTURE, exit: 0 });
    const handle = spawnClaude(BEAD, WS, { model: 'opus' }, { spawn_impl });
    const v = await handle.done;
    expect(v.success).toBe(true);
    expect(v.reason).toBe('ok');
  });

  test('builds the exact claude argv incl. bypassPermissions', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()], exit: 0 });
    await spawnClaude(
      BEAD,
      WS,
      { model: 'opus', effort: 'high' },
      { spawn_impl }
    ).done;
    const call = spawn_impl.captured.calls[0];
    expect(call.command).toBe('claude');
    expect(call.args.slice(0, 6)).toEqual([
      '-p',
      '--output-format',
      'stream-json',
      '--verbose',
      '--model',
      'opus'
    ]);
    expect(call.args).toContain('--effort');
    expect(call.args).toContain('bypassPermissions');
    // Detached so a process group exists for group-kill.
    expect(call.options.detached).toBe(true);
  });

  test('fails rule 1: two result events', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [resultLine(), resultLine()],
      exit: 0
    });
    const v = await spawnClaude(BEAD, WS, {}, { spawn_impl }).done;
    expect(v.success).toBe(false);
    expect(v.reason).toBe('result_count');
  });

  test('fails rule 2: subtype !== success', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [resultLine({ subtype: 'error_max_turns' })],
      exit: 0
    });
    const v = await spawnClaude(BEAD, WS, {}, { spawn_impl }).done;
    expect(v.success).toBe(false);
    expect(v.reason).toBe('subtype');
  });

  test('fails rule 3: is_error true', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [resultLine({ is_error: true })],
      exit: 0
    });
    const v = await spawnClaude(BEAD, WS, {}, { spawn_impl }).done;
    expect(v.success).toBe(false);
    expect(v.reason).toBe('is_error');
  });

  test('fails rule 4: permission_denials non-empty (also blocks)', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [resultLine({ permission_denials: [{ tool_name: 'Bash' }] })],
      exit: 0
    });
    const v = await spawnClaude(BEAD, WS, {}, { spawn_impl }).done;
    expect(v.success).toBe(false);
    // permission_denials non-empty is a fail-closed blocker signal.
    expect(v.blocked).toBe(true);
    expect(v.reason).toBe('blocker');
  });
});

describe('runner/claude event normalization', () => {
  test('maps assistant tool_use to normalized tool events', async () => {
    const spawn_impl = makeFixtureSpawn({ file: TOOLS_FIXTURE, exit: 0 });
    const handle = spawnClaude(BEAD, WS, {}, { spawn_impl });
    const v = await handle.done;
    const tools = v.events.filter((e) => e.kind === 'tool').map((e) => e.name);
    expect(tools).toContain('Read');
    expect(tools).toContain('Bash');
    expect(v.success).toBe(true);
  });
});

describe('runner/claude fail-closed (question → blocker + group kill)', () => {
  test('question tool_use emits blocker and group-kills via negative pid', async () => {
    const spawn_impl = makeFixtureSpawn({
      pid: 5150,
      lines: [
        JSON.stringify({
          type: 'assistant',
          message: {
            content: [
              { type: 'tool_use', name: 'AskUserQuestion', input: { q: '?' } }
            ]
          }
        }),
        resultLine()
      ],
      exit: 0
    });
    const kill_impl = vi.fn();
    const handle = spawnClaude(BEAD, WS, {}, { spawn_impl, kill_impl });
    const v = await handle.done;
    expect(v.blocked).toBe(true);
    expect(v.success).toBe(false);
    // Group kill: NEGATIVE pid targets the whole process group.
    expect(kill_impl).toHaveBeenCalledWith(-5150, 'SIGTERM');
    const blocker = v.events.find((e) => e.kind === 'blocker');
    expect(blocker).toBeTruthy();
  });
});

describe('runner/claude session id (spec §2)', () => {
  test('extractSessionId reads session_id from a system/init line only', () => {
    const spec = claudeSpec();
    expect(
      spec.extractSessionId?.({
        type: 'system',
        subtype: 'init',
        session_id: 'a39855e0'
      })
    ).toBe('a39855e0');
    // hook_started ALSO carries session_id but predates the real session.
    expect(
      spec.extractSessionId?.({
        type: 'system',
        subtype: 'hook_started',
        session_id: 'a39855e0'
      })
    ).toBeNull();
    expect(spec.extractSessionId?.({ type: 'assistant' })).toBeNull();
    expect(
      spec.extractSessionId?.({ type: 'system', subtype: 'init' })
    ).toBeNull();
  });

  test('the engine emits session_id exactly once (first init line wins)', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [
        JSON.stringify({
          type: 'system',
          subtype: 'init',
          session_id: 'sid-A'
        }),
        JSON.stringify({
          type: 'system',
          subtype: 'init',
          session_id: 'sid-B'
        }),
        resultLine()
      ],
      exit: 0
    });
    /** @type {string[]} */
    const ids = [];
    const handle = spawnClaude(BEAD, WS, {}, { spawn_impl });
    handle.events.on('session_id', (id) => ids.push(id));
    await handle.done;
    expect(ids).toEqual(['sid-A']);
  });
});

describe('runner/ccx = claude impl + env routing', () => {
  test('ccx runs the claude command with forwarded routing env', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()], exit: 0 });
    await spawnClaude(
      BEAD,
      WS,
      {},
      {
        spawn_impl,
        name: 'ccx',
        routing_env: { ANTHROPIC_BASE_URL: 'http://127.0.0.1:8787' }
      }
    ).done;
    const call = spawn_impl.captured.calls[0];
    expect(call.command).toBe('claude');
    expect(call.options.env.ANTHROPIC_BASE_URL).toBe('http://127.0.0.1:8787');
  });
});
