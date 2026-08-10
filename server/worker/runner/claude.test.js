import { fileURLToPath } from 'node:url';
import { describe, expect, test, vi } from 'vitest';
import { claudeSpec, liftUsage, spawnClaude } from './claude.js';
import { makeFixtureSpawn } from './fixture-spawn.js';
import { defaultTaskPrompt } from './preamble.js';

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

  test('uses the ordinary guard contract for a cleanup diagnosis without PR delivery', () => {
    const spec = claudeSpec();

    const { args } = spec.buildArgv(
      { id: 'UI-1', prompt: '분류하라' },
      '/repo',
      { fast_track: true, cleanup_diagnosis: true }
    );

    expect(systemPromptOf(args)).not.toContain('PR 제출까지 수행하고');
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
