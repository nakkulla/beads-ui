import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, test, vi } from 'vitest';
import {
  claudeSpec,
  liftDelegation,
  liftUsage,
  spawnClaude
} from './claude.js';
import { makeFixtureSpawn } from './fixture-spawn.js';
import { defaultTaskPrompt } from './preamble.js';

const SUCCESS_FIXTURE = fileURLToPath(
  new URL('../__fixtures__/claude-success.jsonl', import.meta.url)
);
const TOOLS_FIXTURE = fileURLToPath(
  new URL('../__fixtures__/claude-tools.jsonl', import.meta.url)
);
const SUBAGENT_FIXTURE = fileURLToPath(
  new URL('../__fixtures__/claude-subagent.jsonl', import.meta.url)
);

const BACKGROUND_FIXTURE = fileURLToPath(
  new URL('../__fixtures__/claude-subagent-background.jsonl', import.meta.url)
);

const LAUNCH_A = 'toolu_01AgentAAAAAAAAAAAAAAAA';
const LAUNCH_B = 'toolu_01AgentBBBBBBBBBBBBBBBB';
const LAUNCH_BACKGROUND = 'toolu_01AgentBGBGBGBGBGBGBG';
const SHELL_TOOL_ID = 'toolu_01ShellCCCCCCCCCCCCCCCC';

/**
 * @param {string} file
 * @returns {any[]}
 */
function jsonlLines(file) {
  return readFileSync(file, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => JSON.parse(line));
}

/**
 * @returns {any[]}
 */
function subagentFixtureLines() {
  return jsonlLines(SUBAGENT_FIXTURE);
}

/**
 * @returns {any[]}
 */
function toolsFixtureLines() {
  return jsonlLines(TOOLS_FIXTURE);
}

/**
 * @returns {any[]}
 */
function backgroundFixtureLines() {
  return jsonlLines(BACKGROUND_FIXTURE);
}

/**
 * The fixture's `task_notification` line.
 *
 * @returns {any}
 */
function notificationLine() {
  return backgroundFixtureLines().find(
    (line) => line.subtype === 'task_notification'
  );
}

/**
 * The immediate parent `tool_result` a backgrounded `Agent` launch receives.
 *
 * @param {Record<string, unknown>} result
 * @returns {any}
 */
function asyncLaunchLine(result) {
  return {
    type: 'user',
    parent_tool_use_id: null,
    timestamp: '2026-08-25T02:51:40.000Z',
    message: {
      role: 'user',
      content: [
        {
          tool_use_id: LAUNCH_BACKGROUND,
          type: 'tool_result',
          content: 'Agent started in the background.'
        }
      ]
    },
    tool_use_result: result
  };
}

/**
 * The parent `user` line whose `tool_result` closes one tool id.
 *
 * @param {string} tool_use_id
 * @returns {any}
 */
function endLineFor(tool_use_id) {
  return subagentFixtureLines().find(
    (line) =>
      line.type === 'user' &&
      line.parent_tool_use_id === null &&
      (line.message.content || []).some(
        (/** @type {any} */ block) => block.tool_use_id === tool_use_id
      )
  );
}

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

describe('runner/claude 2-rule success (judged over the last result)', () => {
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

  test('resolves a versioned catalog model to its full CLI id', () => {
    const spec = claudeSpec({
      catalog_entry: {
        command: 'claude',
        models: {
          opus: { id: 'opus' },
          'opus-4.8': { id: 'claude-opus-4-8' },
          'opus-4.6': { id: 'claude-opus-4-6' }
        },
        efforts: ['low', 'medium', 'high', 'xhigh']
      }
    });

    const built = spec.buildArgv(BEAD, WS, { model: 'opus-4.6' });

    const model_idx = built.args.indexOf('--model');
    expect(model_idx).toBeGreaterThan(-1);
    expect(built.args[model_idx + 1]).toBe('claude-opus-4-6');
  });

  test('passes an unrecognized model name through verbatim', () => {
    const spec = claudeSpec();

    const built = spec.buildArgv(BEAD, WS, { model: 'claude-future-99' });

    const model_idx = built.args.indexOf('--model');
    expect(built.args[model_idx + 1]).toBe('claude-future-99');
  });

  test('resolves builtin opus to the alias id', () => {
    const spec = claudeSpec();

    const built = spec.buildArgv(BEAD, WS, { model: 'opus' });

    const model_idx = built.args.indexOf('--model');
    expect(built.args[model_idx + 1]).toBe('opus');
  });

  test('accepts only Standard speed and emits no speed argv', () => {
    const spec = claudeSpec();

    const built = spec.buildArgv(BEAD, WS, { speed: 'default' });

    expect(built.args.join(' ')).not.toContain('service_tier');
    expect(() => spec.buildArgv(BEAD, WS, { speed: 'fast' })).toThrow(
      'unknown orchestration speed'
    );
  });

  test('wraps pinned argv with cswap while preserving env', () => {
    const spec = claudeSpec({
      env: { ROUTING_TOKEN: 'route' },
      cswap_path: '/opt/bin/cswap'
    });
    const baseline = spec.buildArgv(BEAD, WS, { model: 'opus' });

    const built = spec.buildArgv(BEAD, WS, {
      model: 'opus',
      claude_account: 'user@example.com'
    });

    expect(built.command).toBe('/opt/bin/cswap');
    expect(built.args).toEqual([
      'run',
      'user@example.com',
      '--share-history',
      '--',
      ...baseline.args
    ]);
    expect(built.env).toEqual(baseline.env);
  });

  test('keeps the unpinned argv unchanged', () => {
    const spec = claudeSpec({ cswap_path: '/opt/bin/cswap' });

    const built = spec.buildArgv(BEAD, WS, { model: 'opus' });

    expect(built.command).toBe('claude');
    expect(built.args.slice(0, 6)).toEqual([
      '-p',
      '--output-format',
      'stream-json',
      '--verbose',
      '--model',
      'opus'
    ]);
  });

  test('exposes the verified detached process identity', () => {
    const spawn_impl = makeFixtureSpawn({
      pid: 5150,
      lines: [resultLine()],
      exit: 0
    });
    const process_controller = {
      capture: vi.fn(() => ({
        ok: /** @type {const} */ (true),
        identity: { pid: 5150, pgid: 5150, started_at: 1_000 }
      }))
    };

    const handle = spawnClaude(
      BEAD,
      WS,
      {},
      {
        spawn_impl,
        process_controller
      }
    );

    expect(handle.process_identity).toEqual({
      pid: 5150,
      pgid: 5150,
      started_at: 1_000
    });
  });

  test('refuses a spawn without signaling an unverified process group', async () => {
    const directKill = vi.fn(() => true);
    const spawn_impl = makeFixtureSpawn({
      pid: 5150,
      lines: [resultLine()],
      exit: 0,
      kill: directKill,
      closeOnKill: 'SIGTERM'
    });
    const kill_impl = vi.fn();
    const process_controller = {
      capture: vi.fn(() => ({
        ok: /** @type {const} */ (false),
        reason: 'not_group_leader'
      }))
    };

    /** @type {any} */
    let failure;
    try {
      spawnClaude(
        BEAD,
        WS,
        {},
        {
          spawn_impl,
          kill_impl,
          process_controller
        }
      );
    } catch (error) {
      failure = error;
    }

    expect(failure.message).toBe('process_identity:not_group_leader');
    await expect(failure.cleanup).resolves.toEqual({ ok: true });
    expect(directKill).toHaveBeenCalledWith('SIGTERM');
    expect(kill_impl).not.toHaveBeenCalled();
  });

  test('escalates an identity-refused direct child and confirms close', async () => {
    const directKill = vi.fn(() => true);
    const spawn_impl = makeFixtureSpawn({
      pid: 5150,
      lines: [resultLine()],
      exit: 0,
      kill: directKill,
      autoClose: false,
      closeOnKill: 'SIGKILL'
    });
    const process_controller = {
      capture: vi.fn(() => ({
        ok: /** @type {const} */ (false),
        reason: 'not_group_leader'
      }))
    };

    /** @type {any} */
    let failure;
    try {
      spawnClaude(
        BEAD,
        WS,
        {},
        {
          spawn_impl,
          process_controller,
          direct_child_term_grace_ms: 0,
          direct_child_kill_grace_ms: 10
        }
      );
    } catch (error) {
      failure = error;
    }

    await expect(failure.cleanup).resolves.toEqual({ ok: true });
    expect(directKill.mock.calls).toEqual([['SIGTERM'], ['SIGKILL']]);
  });

  test('reports an unconfirmed direct-child exit after bounded escalation', async () => {
    const spawn_impl = makeFixtureSpawn({
      pid: 5150,
      lines: [resultLine()],
      exit: 0,
      kill: () => true,
      autoClose: false
    });
    const process_controller = {
      capture: vi.fn(() => ({
        ok: /** @type {const} */ (false),
        reason: 'not_group_leader'
      }))
    };
    /** @type {any} */
    let failure;

    try {
      spawnClaude(
        BEAD,
        WS,
        {},
        {
          spawn_impl,
          process_controller,
          direct_child_term_grace_ms: 0,
          direct_child_kill_grace_ms: 0
        }
      );
    } catch (error) {
      failure = error;
    }

    await expect(failure.cleanup).resolves.toEqual({
      ok: false,
      reason: 'direct_child_exit_unconfirmed'
    });
  });

  test('succeeds when multiple results end on a clean last result', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [resultLine(), resultLine()],
      exit: 0
    });
    const v = await spawnClaude(BEAD, WS, {}, { spawn_impl }).done;
    expect(v.success).toBe(true);
    expect(v.reason).toBe('ok');
  });

  test('succeeds when only the last result is judged, ignoring an earlier violation', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [resultLine({ subtype: 'error_max_turns' }), resultLine()],
      exit: 0
    });

    const v = await spawnClaude(BEAD, WS, {}, { spawn_impl }).done;

    expect(v.success).toBe(true);
    expect(v.reason).toBe('ok');
  });

  test('fails on the last result subtype violation despite an earlier clean result', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [resultLine(), resultLine({ subtype: 'error_max_turns' })],
      exit: 0
    });

    const v = await spawnClaude(BEAD, WS, {}, { spawn_impl }).done;

    expect(v.success).toBe(false);
    expect(v.reason).toBe('subtype');
  });

  test('fails with no_result when zero result events occur', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [],
      exit: 0
    });

    const v = await spawnClaude(BEAD, WS, {}, { spawn_impl }).done;

    expect(v.success).toBe(false);
    expect(v.reason).toBe('no_result');
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

  test('succeeds on a clean last result despite non-empty permission_denials', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [resultLine({ permission_denials: [{ tool_name: 'Read' }] })],
      exit: 0
    });

    const v = await spawnClaude(BEAD, WS, {}, { spawn_impl }).done;

    expect(v.success).toBe(true);
    expect(v.blocked).toBe(false);
    expect(v.reason).toBe('ok');
  });
});

describe('runner/claude verdict summary (worker-failure-tiers §6)', () => {
  /**
   * @param {Record<string, unknown>} result
   * @returns {{ success: boolean, reason: string, summary: string|null }}
   */
  function judge(result) {
    return claudeSpec().verdict({
      raw: [{ type: 'result', subtype: 'success', is_error: false, ...result }],
      exit: 0,
      blocked: false
    });
  }

  test('lifts the last result text as the summary', () => {
    const v = judge({ result: 'PR를 열었습니다.' });

    expect(v.summary).toBe('PR를 열었습니다.');
  });

  test('keeps only the first non-empty line', () => {
    const v = judge({ result: '\n  \n첫 줄 보고\n둘째 줄\n' });

    expect(v.summary).toBe('첫 줄 보고');
  });

  test('cuts the summary at 200 characters', () => {
    const v = judge({ result: 'x'.repeat(400) });

    expect(v.summary).toBe('x'.repeat(200));
  });

  test('reads the error text when the result is an error', () => {
    const v = judge({
      subtype: 'success',
      is_error: true,
      error: 'API Error: 529 Overloaded'
    });

    expect(v).toEqual({
      success: false,
      reason: 'is_error',
      summary: 'API Error: 529 Overloaded'
    });
  });

  test('prefers the result text over the error text on an errored result', () => {
    const v = judge({
      is_error: true,
      result: 'API Error: 429 rate limited',
      error: 'unused'
    });

    expect(v.summary).toBe('API Error: 429 rate limited');
  });

  test('reports a null summary for a non-string result', () => {
    const v = judge({ result: { text: 'not a string' } });

    expect(v.summary).toBeNull();
  });

  test('reports a null summary when the stream carried no result', () => {
    const v = claudeSpec().verdict({ raw: [], exit: 0, blocked: false });

    expect(v).toEqual({ success: false, reason: 'no_result', summary: null });
  });

  test('carries the summary out of the session engine', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [
        JSON.stringify({
          type: 'result',
          subtype: 'success',
          is_error: false,
          result: '세션이 사용자 결정을 기다립니다.'
        })
      ],
      exit: 0
    });

    const v = await spawnClaude(BEAD, WS, {}, { spawn_impl }).done;

    expect(v.summary).toBe('세션이 사용자 결정을 기다립니다.');
  });

  test('resolves a null summary when the adapter found none', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()], exit: 0 });

    const v = await spawnClaude(BEAD, WS, {}, { spawn_impl }).done;

    expect(v.summary).toBeNull();
  });
});

describe('runner/claude provider outage hook', () => {
  test('delegates final result classification to the provider module', () => {
    const spec = claudeSpec();
    const raw = [
      {
        type: 'result',
        subtype: 'success',
        is_error: true,
        result: 'API Error: 529 Overloaded'
      }
    ];

    const result = spec.classifyProviderOutage?.({ raw, stderr_tail: null });

    expect(result?.detail).toBe('overloaded_529');
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

describe('runner/claude usage extraction (UI-raqh §1)', () => {
  test('carries assistant message usage and id onto every event of that message', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [
        JSON.stringify({
          type: 'assistant',
          message: {
            id: 'msg_1',
            usage: { input_tokens: 10, output_tokens: 4 },
            content: [
              { type: 'text', text: 'hi' },
              { type: 'tool_use', name: 'Read', input: {} }
            ]
          }
        }),
        resultLine()
      ],
      exit: 0
    });
    const handle = spawnClaude(BEAD, WS, {}, { spawn_impl });

    const v = await handle.done;

    const carried = v.events
      .filter((e) => e.kind === 'text' || e.kind === 'tool')
      .map((e) => e.usage);
    expect(carried).toEqual([
      { message_id: 'msg_1', input_tokens: 10, output_tokens: 4 },
      { message_id: 'msg_1', input_tokens: 10, output_tokens: 4 }
    ]);
  });

  test('carries result usage and cost onto the result event', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [
        JSON.stringify({
          type: 'result',
          subtype: 'success',
          is_error: false,
          usage: { input_tokens: 18, output_tokens: 1113 },
          total_cost_usd: 0.0353
        })
      ],
      exit: 0
    });
    const handle = spawnClaude(BEAD, WS, {}, { spawn_impl });

    const v = await handle.done;

    expect(v.events.find((e) => e.kind === 'result')?.usage).toEqual({
      input_tokens: 18,
      output_tokens: 1113,
      total_cost_usd: 0.0353
    });
  });

  test('omits usage when the event carries none', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [
        JSON.stringify({
          type: 'assistant',
          message: { id: 'msg_1', content: [{ type: 'text', text: 'hi' }] }
        }),
        resultLine()
      ],
      exit: 0
    });
    const handle = spawnClaude(BEAD, WS, {}, { spawn_impl });

    const v = await handle.done;

    expect(v.events.find((e) => e.kind === 'text')?.usage).toBe(undefined);
  });

  test('exposes the same liftUsage on the spec as the named export', () => {
    const spec = claudeSpec();
    const raw = {
      type: 'result',
      subtype: 'success',
      is_error: false,
      usage: { input_tokens: 18, output_tokens: 3 }
    };

    expect(spec.liftUsage(raw)).toEqual(liftUsage(raw));
  });

  test('lifts a result usage off the spec member', () => {
    const spec = claudeSpec();

    const lifted = spec.liftUsage({
      type: 'result',
      usage: { input_tokens: 7, output_tokens: 2 }
    });

    expect(lifted).toEqual({
      kind: 'result',
      usage: { input_tokens: 7, output_tokens: 2 }
    });
  });

  test('omits usage when the payload is not an object', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [
        JSON.stringify({
          type: 'result',
          subtype: 'success',
          is_error: false,
          usage: 'lots'
        })
      ],
      exit: 0
    });
    const handle = spawnClaude(BEAD, WS, {}, { spawn_impl });

    const v = await handle.done;

    expect(v.events.find((e) => e.kind === 'result')?.usage).toBe(undefined);
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

describe('runner/claude routing env', () => {
  test('a routing env is forwarded to the claude command', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()], exit: 0 });
    await spawnClaude(
      BEAD,
      WS,
      {},
      {
        spawn_impl,
        routing_env: { ANTHROPIC_BASE_URL: 'http://127.0.0.1:8787' }
      }
    ).done;
    const call = spawn_impl.captured.calls[0];
    expect(call.command).toBe('claude');
    expect(call.options.env.ANTHROPIC_BASE_URL).toBe('http://127.0.0.1:8787');
  });
});

describe('runner/claude hook suppression (UI-ljcu)', () => {
  test('spawns with CLAUDE_HOOK_SUPPRESS=1 so the user Stop hook stays silent', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()], exit: 0 });

    await spawnClaude(BEAD, WS, {}, { spawn_impl }).done;

    expect(spawn_impl.captured.calls[0].options.env.CLAUDE_HOOK_SUPPRESS).toBe(
      '1'
    );
  });

  test('a routing env overriding the same key wins', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()], exit: 0 });

    await spawnClaude(
      BEAD,
      WS,
      {},
      { spawn_impl, routing_env: { CLAUDE_HOOK_SUPPRESS: '0' } }
    ).done;

    expect(spawn_impl.captured.calls[0].options.env.CLAUDE_HOOK_SUPPRESS).toBe(
      '0'
    );
  });
});

describe('runner/claude print bg-wait ceiling (UI-q2fa, UI-3wkt)', () => {
  test('spawns with CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS=7200000 so a live subagent holds the session at most the codex hard-timeout after its last completion', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()], exit: 0 });

    await spawnClaude(BEAD, WS, {}, { spawn_impl }).done;

    expect(
      spawn_impl.captured.calls[0].options.env
        .CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS
    ).toBe('7200000');
  });

  test('a routing env overriding the ceiling wins', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()], exit: 0 });

    await spawnClaude(
      BEAD,
      WS,
      {},
      {
        spawn_impl,
        routing_env: { CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS: '0' }
      }
    ).done;

    expect(
      spawn_impl.captured.calls[0].options.env
        .CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS
    ).toBe('0');
  });
});

describe('runner/claude resume argv (spec §1.4)', () => {
  test('resume_session_id adds --resume <id> ahead of the permission mode', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()], exit: 0 });
    await spawnClaude(
      BEAD,
      WS,
      { model: 'opus', resume_session_id: 'sid-xyz' },
      { spawn_impl }
    ).done;
    const call = spawn_impl.captured.calls[0];
    expect(call.command).toBe('claude');
    const i = call.args.indexOf('--resume');
    expect(i).toBeGreaterThanOrEqual(0);
    expect(call.args[i + 1]).toBe('sid-xyz');
    // Still an unattended bypass-permissions run.
    expect(call.args).toContain('bypassPermissions');
  });

  test('no --resume without a resume_session_id (first launch)', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()], exit: 0 });
    await spawnClaude(BEAD, WS, { model: 'opus' }, { spawn_impl }).done;
    expect(spawn_impl.captured.calls[0].args).not.toContain('--resume');
  });
});

describe('runner/claude fork argv (UI-p206 §4)', () => {
  test('adds --fork-session directly after the resumed session id', () => {
    const spec = claudeSpec();

    const built = spec.buildArgv(BEAD, WS, {
      model: 'opus',
      resume_session_id: 'sid-xyz',
      fork_session: true
    });

    const i = built.args.indexOf('--resume');
    expect(built.args[i + 1]).toBe('sid-xyz');
    expect(built.args[i + 2]).toBe('--fork-session');
  });

  test('leaves the plain resume argv untouched when fork_session is false', () => {
    const spec = claudeSpec();

    const forkless = spec.buildArgv(BEAD, WS, {
      model: 'opus',
      resume_session_id: 'sid-xyz',
      fork_session: false
    });

    expect(forkless.args).toEqual(
      spec.buildArgv(BEAD, WS, { model: 'opus', resume_session_id: 'sid-xyz' })
        .args
    );
  });

  test('resolves the same model id on the fork and resume branches', () => {
    const spec = claudeSpec();

    const forked = spec.buildArgv(BEAD, WS, {
      model: 'opus',
      resume_session_id: 'sid-xyz',
      fork_session: true
    });
    const resumed = spec.buildArgv(BEAD, WS, {
      model: 'opus',
      resume_session_id: 'sid-xyz'
    });

    expect(forked.args[forked.args.indexOf('--model') + 1]).toBe(
      resumed.args[resumed.args.indexOf('--model') + 1]
    );
  });

  test('ignores fork_session when no session id is being resumed', () => {
    const spec = claudeSpec();

    const built = spec.buildArgv(BEAD, WS, {
      model: 'opus',
      fork_session: true
    });

    expect(built.args).toEqual(
      spec.buildArgv(BEAD, WS, { model: 'opus' }).args
    );
  });
});

/**
 * The `--append-system-prompt` value carried by an argv (UI-rxp3 §2).
 *
 * @param {string[]} args
 * @returns {string}
 */
function systemPromptOf(args) {
  const i = args.indexOf('--append-system-prompt');
  return i >= 0 ? args[i + 1] : '';
}

describe('runner/claude system-prompt channel (UI-rxp3 §2)', () => {
  test('sends the contract on --append-system-prompt and the task positionally', () => {
    const spec = claudeSpec();

    const built = spec.buildArgv({ id: 'UI-1', prompt: '작업하라' }, '/repo', {
      fast_track: true,
      target_base: 'main'
    });

    expect(systemPromptOf(built.args)).toContain('## 무인 모드');
    expect(systemPromptOf(built.args)).toContain('## 가드 계약');
    expect(built.args.at(-1)).toBe('작업하라');
  });

  test('leaves no contract text in the positional argument', () => {
    const spec = claudeSpec();

    const { args } = spec.buildArgv(
      { id: 'UI-1', prompt: '작업하라' },
      '/repo',
      {
        fast_track: true,
        target_base: 'main'
      }
    );

    expect(args.at(-1)).not.toContain('무인 모드');
    expect(args.at(-1)).not.toContain('가드 계약');
    expect(args.at(-1)).not.toContain('PR 제출까지 수행하고');
  });

  test('applies the same channel split on the resume branch', () => {
    const spec = claudeSpec();

    const built = spec.buildArgv({ id: 'UI-1', prompt: '이어하라' }, '/repo', {
      resume_session_id: 'sess-1',
      fast_track: true,
      target_base: 'main'
    });

    expect(built.args).toContain('--resume');
    expect(systemPromptOf(built.args)).toContain('## 가드 계약');
    expect(built.args.at(-1)).toBe('이어하라');
  });

  test('exposes the assembled prompts alongside the argv they were built into', () => {
    const spec = claudeSpec();

    const built = spec.buildArgv({ id: 'UI-1', prompt: '작업하라' }, '/repo', {
      fast_track: true,
      target_base: 'main'
    });

    expect(built.system_prompt).toBe(systemPromptOf(built.args));
    expect(built.task_prompt).toBe(built.args.at(-1));
  });

  test('exposes the same pair on a disposition build', () => {
    const spec = claudeSpec();

    const built = spec.buildArgv({ id: 'UI-1', prompt: '처분하라' }, '/repo', {
      disposition: 'revise_fix'
    });

    expect(built.system_prompt).toBe(systemPromptOf(built.args));
    expect(built.task_prompt).toBe('처분하라');
  });

  test('builds the default task prompt when the bead carries none', () => {
    const spec = claudeSpec();

    const built = spec.buildArgv({ id: 'UI-9' }, '/repo', {});

    expect(built.task_prompt).toBe(defaultTaskPrompt('UI-9'));
  });
});

describe('runner/claude disposition argv (UI-hs11 §3.3)', () => {
  test('omits the PR-submit directive for a disposition session', () => {
    const spec = claudeSpec();

    const { args } = spec.buildArgv(
      { id: 'UI-1', prompt: '처분하라' },
      '/repo',
      { fast_track: true, disposition: 'revise_fix' }
    );

    expect(systemPromptOf(args)).not.toContain('PR 제출까지 수행하고');
    expect(args.at(-1)).toBe('처분하라');
  });

  test('keeps it for an ordinary dispatch', () => {
    const spec = claudeSpec();

    const { args } = spec.buildArgv({ id: 'UI-1' }, '/repo', {
      fast_track: true
    });

    expect(systemPromptOf(args)).toContain('PR 제출까지 수행하고');
  });

  test('does not suppress PR delivery for retired cleanup diagnosis settings', () => {
    const spec = claudeSpec();

    const { args } = spec.buildArgv(
      { id: 'UI-1', prompt: '분류하라' },
      '/repo',
      { fast_track: true, cleanup_diagnosis: true }
    );

    expect(systemPromptOf(args)).toContain('PR 제출까지 수행하고');
    expect(systemPromptOf(args)).toContain('base 로 향하는 `git push`');
    expect(systemPromptOf(args)).not.toContain('REVISE 처분 세션');
  });
});

describe('runner/claude PR base wiring (worker-base-scope-alignment §3/§4)', () => {
  test('carries the settings target_base into the system prompt', () => {
    const spec = claudeSpec();

    const { args } = spec.buildArgv({ id: 'UI-1' }, '/wt/UI-1', {
      fast_track: true,
      repo: '/repo',
      target_base: 'ilsun/dev'
    });

    expect(systemPromptOf(args)).toContain('gh pr create --base ilsun/dev');
  });

  test('injects no base directive when the settings carry none', () => {
    const spec = claudeSpec();

    const { args } = spec.buildArgv({ id: 'UI-1' }, '/wt/UI-1', {
      fast_track: true
    });

    expect(systemPromptOf(args)).not.toContain('## PR base');
  });

  test('omits the base directive for a disposition session with a base', () => {
    const spec = claudeSpec();

    const { args } = spec.buildArgv({ id: 'UI-1' }, '/wt/UI-1', {
      fast_track: true,
      disposition: 'revise_fix',
      target_base: 'ilsun/dev'
    });

    expect(systemPromptOf(args)).not.toContain('## PR base');
  });
});

describe('runner/claude 능력 축소 플래그 부재 가드 (UI-ucq6 §변경 4)', () => {
  // 회귀 가드: worker 세션이 전역 지시와 `workflow` 스킬을 그대로 로드한다는
  // 판단은 "launch argv에 축소 플래그가 없다"는 관측 하나에 기댄다. 축소 플래그가
  // 도입되면 여기서 빨간불이 나고, 그것이 보고서 의무를 preamble로 옮길지 판단할
  // 신호가 된다.
  const NARROWING_FLAGS = [
    '--setting-sources',
    '--tools',
    '--strict-mcp-config',
    '--allowedTools'
  ];

  test('carries no capability-narrowing flag on an ordinary dispatch', () => {
    const spec = claudeSpec();

    const { args } = spec.buildArgv({ id: 'UI-1' }, '/wt/UI-1', {
      fast_track: true,
      target_base: 'main'
    });

    for (const flag of NARROWING_FLAGS) {
      expect(args).not.toContain(flag);
    }
  });

  test('carries no capability-narrowing flag on a resumed dispatch', () => {
    const spec = claudeSpec();

    const { args } = spec.buildArgv({ id: 'UI-1' }, '/wt/UI-1', {
      resume_session_id: 'sess-1',
      model: 'opus',
      effort: 'high'
    });

    for (const flag of NARROWING_FLAGS) {
      expect(args).not.toContain(flag);
    }
  });
});

describe('runner/claude liftDelegation (UI-2mpn §5.1)', () => {
  test('lifts a start off an Agent tool_use', () => {
    const raw = subagentFixtureLines().find(
      (line) =>
        line.type === 'assistant' &&
        (line.message.content || []).some(
          (/** @type {any} */ block) => block.name === 'Agent'
        )
    );

    const lifted = liftDelegation(raw);

    expect(lifted).toEqual({
      kind: 'start',
      launch_id: LAUNCH_A,
      agent_type: 'general-purpose',
      model_alias: 'sonnet',
      at: null
    });
  });

  test('lifts a progress with the model off a child assistant line', () => {
    const raw = subagentFixtureLines().find(
      (line) =>
        line.type === 'assistant' && line.parent_tool_use_id === LAUNCH_A
    );

    const lifted = liftDelegation(raw);

    expect(lifted).toEqual({
      kind: 'progress',
      launch_id: LAUNCH_A,
      model: 'claude-sonnet-4-5-20250929',
      proves_session: true,
      at: null
    });
  });

  test('lifts a progress with a null model off a child user line', () => {
    const raw = subagentFixtureLines().find(
      (line) => line.type === 'user' && line.parent_tool_use_id === LAUNCH_A
    );

    const lifted = liftDelegation(raw);

    expect(lifted).toEqual({
      kind: 'progress',
      launch_id: LAUNCH_A,
      model: null,
      proves_session: true,
      at: Date.parse('2026-08-24T01:00:05.000Z')
    });
  });

  test('lifts a progress off a tool_progress line with no timestamp', () => {
    const raw = subagentFixtureLines().find(
      (line) => line.type === 'tool_progress'
    );

    const lifted = liftDelegation(raw);

    expect(lifted).toEqual({
      kind: 'progress',
      launch_id: LAUNCH_A,
      model: null,
      proves_session: false,
      at: null
    });
  });

  test('lifts an end with the four usage fields off a tool_use_result', () => {
    const raw = endLineFor(LAUNCH_A);

    const lifted = liftDelegation(raw);

    expect(lifted).toEqual({
      kind: 'end',
      source: 'tool_result',
      launch_id: LAUNCH_A,
      is_error: false,
      result_status: 'completed',
      agent_id: 'agt_9f3c21d4c0',
      agent_type: 'general-purpose',
      model: 'claude-sonnet-4-5-20250929',
      usage: {
        input_tokens: 30,
        output_tokens: 200,
        cache_read_input_tokens: 1000,
        cache_creation_input_tokens: 100
      },
      total_tokens: 1330,
      at: Date.parse('2026-08-24T01:00:09.000Z')
    });
  });

  test('lifts an errored end with a null usage', () => {
    const raw = endLineFor(LAUNCH_B);

    const lifted = liftDelegation(raw);

    expect(lifted).toMatchObject({
      kind: 'end',
      launch_id: LAUNCH_B,
      is_error: true,
      result_status: 'failed',
      usage: null,
      total_tokens: null
    });
  });

  test('returns an end candidate for a tool_result of another tool', () => {
    const raw = endLineFor(SHELL_TOOL_ID);

    const lifted = liftDelegation(raw);

    expect(lifted).toMatchObject({
      kind: 'end',
      launch_id: SHELL_TOOL_ID,
      agent_id: null,
      usage: null
    });
  });

  test('dates a start from the line own timestamp when it carries one', () => {
    const raw = {
      type: 'assistant',
      timestamp: '2026-08-24T02:03:04.000Z',
      parent_tool_use_id: null,
      message: {
        content: [{ type: 'tool_use', id: 'toolu_x', name: 'Agent', input: {} }]
      }
    };

    const lifted = liftDelegation(raw);

    expect(lifted).toEqual({
      kind: 'start',
      launch_id: 'toolu_x',
      agent_type: null,
      model_alias: null,
      at: Date.parse('2026-08-24T02:03:04.000Z')
    });
  });

  test('lifts no start or progress from a stream with no subagent', () => {
    const kinds = toolsFixtureLines()
      .map((line) => liftDelegation(line))
      .filter((lifted) => lifted !== null)
      .map((lifted) => /** @type {any} */ (lifted).kind);

    expect(kinds).toEqual(['end', 'end']);
  });

  test('returns a launch_ack for an async_launched tool_result', () => {
    const raw = asyncLaunchLine({ status: 'async_launched' });

    const lifted = liftDelegation(raw);

    expect(lifted).toEqual({
      kind: 'launch_ack',
      launch_id: LAUNCH_BACKGROUND,
      at: Date.parse('2026-08-25T02:51:40.000Z')
    });
  });

  test('returns a launch_ack for an isAsync result carrying no status', () => {
    const raw = asyncLaunchLine({ isAsync: true });

    const lifted = liftDelegation(raw);

    expect(lifted).toMatchObject({
      kind: 'launch_ack',
      launch_id: LAUNCH_BACKGROUND
    });
  });

  test('lifts an undated notification end naming the agent id', () => {
    const raw = backgroundFixtureLines().find(
      (line) => line.subtype === 'task_notification'
    );

    const lifted = liftDelegation(raw);

    expect(lifted).toEqual({
      kind: 'end',
      source: 'notification',
      launch_id: LAUNCH_BACKGROUND,
      is_error: false,
      result_status: 'completed',
      agent_id: 'agt_7d21ba90ff',
      agent_type: null,
      model: null,
      usage: null,
      total_tokens: 219570,
      at: null
    });
  });

  test('lifts a null total from a notification reporting no usage', () => {
    const raw = { ...notificationLine(), usage: undefined };

    const lifted = liftDelegation(raw);

    expect(lifted).toMatchObject({ kind: 'end', total_tokens: null });
  });

  test('returns null for a task_notification with no tool_use_id', () => {
    const raw = { ...notificationLine(), tool_use_id: '' };

    expect(liftDelegation(raw)).toBe(null);
  });

  test('returns null for a task_updated line', () => {
    const raw = {
      type: 'system',
      subtype: 'task_updated',
      task_id: 'agt_7d21ba90ff',
      patch: { status: 'completed', end_time: 1787626311813 },
      uuid: 'u-updated'
    };

    expect(liftDelegation(raw)).toBe(null);
  });

  test('returns null for a non-object line', () => {
    expect(liftDelegation('nope')).toBe(null);
  });
});

describe('runner/claude liftUsage subagent exclusion (UI-2mpn §2.3)', () => {
  test('lifts no usage from a subagent assistant message', () => {
    const raw = {
      type: 'assistant',
      parent_tool_use_id: 'toolu_01AgentAAAAAAAAAAAAAAAA',
      message: {
        id: 'msg_child',
        model: 'claude-sonnet-4-5',
        usage: { input_tokens: 900, output_tokens: 40 }
      }
    };

    expect(liftUsage(raw)).toBe(null);
  });

  test('lifts usage from the parent assistant message on the same stream', () => {
    const raw = {
      type: 'assistant',
      message: {
        id: 'msg_parent',
        model: 'claude-opus-4-5',
        usage: { input_tokens: 12, output_tokens: 3 }
      }
    };

    const lifted = liftUsage(raw);

    expect(lifted).toEqual({
      kind: 'message',
      usage: { message_id: 'msg_parent', input_tokens: 12, output_tokens: 3 }
    });
  });

  test('keeps every subagent message of the fixture out of the tally', () => {
    const message_ids = subagentFixtureLines()
      .map((line) => liftUsage(line))
      .filter((lifted) => lifted !== null)
      .map((lifted) => /** @type {any} */ (lifted).usage.message_id)
      .filter((id) => typeof id === 'string');

    expect(message_ids).toEqual([
      'msg_parent_1',
      'msg_parent_2',
      'msg_parent_3',
      'msg_parent_4'
    ]);
  });
});
