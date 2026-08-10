import { fileURLToPath } from 'node:url';
import { describe, expect, test } from 'vitest';
import { codexSpec, spawnCodex } from './codex.js';
import { makeFixtureSpawn } from './fixture-spawn.js';
import { defaultTaskPrompt } from './preamble.js';

const SUCCESS_FIXTURE = fileURLToPath(
  new URL('../__fixtures__/codex-success.jsonl', import.meta.url)
);
const FAILURE_FIXTURE = fileURLToPath(
  new URL('../__fixtures__/codex-failure.jsonl', import.meta.url)
);
const RESUME_FIXTURE = fileURLToPath(
  new URL('../__fixtures__/codex-resume.jsonl', import.meta.url)
);

const BEAD = { id: 'UI-1' };
const WS = '/tmp/ws';

describe('runner/codex argv (measured against codex 0.147.0)', () => {
  test('expands a catalog short name into the full model id', () => {
    const spec = codexSpec();

    const built = spec.buildArgv(BEAD, WS, { model: 'sol' });

    expect(built.command).toBe('codex');
    expect(built.args.slice(0, 4)).toEqual([
      'exec',
      '--json',
      '-m',
      'gpt-5.6-sol'
    ]);
  });

  test('passes an unknown model name through verbatim', () => {
    const spec = codexSpec();

    const built = spec.buildArgv(BEAD, WS, { model: 'gpt-experimental' });

    expect(built.args[built.args.indexOf('-m') + 1]).toBe('gpt-experimental');
  });

  test('adds the reasoning effort as a -c config override', () => {
    const spec = codexSpec();

    const built = spec.buildArgv(BEAD, WS, { model: 'luna', effort: 'max' });

    const i = built.args.indexOf('-c');
    expect(i).toBeGreaterThanOrEqual(0);
    expect(built.args[i + 1]).toBe('model_reasoning_effort=max');
  });

  test('omits the config override when no effort is set', () => {
    const spec = codexSpec();

    const built = spec.buildArgv(BEAD, WS, { model: 'sol' });

    expect(built.args).not.toContain('-c');
  });

  test('takes the exec resume branch with the session id positionally', () => {
    const spec = codexSpec();

    const built = spec.buildArgv(BEAD, WS, {
      model: 'sol',
      resume_session_id: 'thread-1'
    });

    expect(built.args.slice(0, 6)).toEqual([
      'exec',
      'resume',
      'thread-1',
      '--json',
      '-m',
      'gpt-5.6-sol'
    ]);
  });

  test('keeps -m on resume so the recorded model is not questioned', () => {
    const spec = codexSpec();

    const built = spec.buildArgv(BEAD, WS, {
      model: 'luna',
      resume_session_id: 'thread-1'
    });

    expect(built.args[built.args.indexOf('-m') + 1]).toBe('gpt-5.6-luna');
  });

  test('carries the unattended bypass flag on both branches', () => {
    const spec = codexSpec();

    const first = spec.buildArgv(BEAD, WS, { model: 'sol' });
    const resumed = spec.buildArgv(BEAD, WS, {
      model: 'sol',
      resume_session_id: 'thread-1'
    });

    expect(first.args).toContain('--dangerously-bypass-approvals-and-sandbox');
    expect(resumed.args).toContain(
      '--dangerously-bypass-approvals-and-sandbox'
    );
  });

  test('disables the hooks feature', () => {
    const spec = codexSpec();

    const built = spec.buildArgv(BEAD, WS, { model: 'sol' });

    const i = built.args.indexOf('--disable');
    expect(i).toBeGreaterThanOrEqual(0);
    expect(built.args[i + 1]).toBe('hooks');
  });

  test('sends the contract and the task as one positional argument', () => {
    const spec = codexSpec();

    const built = spec.buildArgv({ id: 'UI-1', prompt: '작업하라' }, WS, {
      fast_track: true,
      target_base: 'main'
    });

    expect(built.args.at(-1)).toBe(
      `${built.system_prompt}\n\n${built.task_prompt}`
    );
  });

  test('exposes the same prompt pair the positional argument was built from', () => {
    const spec = codexSpec();

    const built = spec.buildArgv({ id: 'UI-1', prompt: '작업하라' }, WS, {
      fast_track: true,
      target_base: 'main'
    });

    expect(built.system_prompt).toContain('## 무인 모드');
    expect(built.system_prompt).toContain('## 가드 계약');
    expect(built.task_prompt).toBe('작업하라');
  });

  test('delivers completion repair evidence in the positional system prefix', () => {
    const spec = codexSpec();

    const built = spec.buildArgv({ id: 'UI-1', prompt: '복구하라' }, WS, {
      target_base: 'main',
      completion_repair: {
        mode: 'dispatch_repair',
        stage: 'post_merge_verify',
        reason: 'verify_cmd_failed',
        subject_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        result_digest: 'c'.repeat(64)
      }
    });

    expect(built.system_prompt).toContain('## completion repair');
    expect(built.args.at(-1)).toContain('dispatch_repair');
  });

  test('builds the default task prompt when the bead carries none', () => {
    const spec = codexSpec();

    const built = spec.buildArgv({ id: 'UI-9' }, WS, {});

    expect(built.task_prompt).toBe(defaultTaskPrompt('UI-9'));
  });

  test('drops the PR-submit directive for a disposition session', () => {
    const spec = codexSpec();

    const built = spec.buildArgv(BEAD, WS, {
      model: 'sol',
      disposition: 'revise_fix'
    });

    expect(built.system_prompt).not.toContain('PR 제출까지 수행하고');
  });

  test('spawns with CODEX_SILENT=1', () => {
    const spec = codexSpec();

    const built = spec.buildArgv(BEAD, WS, { model: 'sol' });

    expect(built.env?.CODEX_SILENT).toBe('1');
  });

  test('a routing env overriding the same key wins', () => {
    const spec = codexSpec(undefined, { env: { CODEX_SILENT: '0' } });

    const built = spec.buildArgv(BEAD, WS, { model: 'sol' });

    expect(built.env?.CODEX_SILENT).toBe('0');
  });
});

describe('runner/codex catalog entry override (worker-multi-provider-runner §B)', () => {
  test('a config command reaches the spawn command', () => {
    const spec = codexSpec({
      command: '/opt/homebrew/bin/codex',
      models: { sol: { id: 'gpt-5.6-sol' } },
      efforts: []
    });

    const built = spec.buildArgv(BEAD, WS, { model: 'sol' });

    expect(built.command).toBe('/opt/homebrew/bin/codex');
  });

  test('a config model id reaches the argv', () => {
    const spec = codexSpec({
      command: 'codex',
      models: { sol: { id: 'gpt-9-preview' } },
      efforts: []
    });

    const built = spec.buildArgv(BEAD, WS, { model: 'sol' });

    expect(built.args[built.args.indexOf('-m') + 1]).toBe('gpt-9-preview');
  });
});

describe('runner/codex usage lift (UI-raqh §1 generalized)', () => {
  test('projects the codex usage names onto the tallied names', () => {
    const spec = codexSpec();

    const lifted = spec.liftUsage({
      type: 'turn.completed',
      usage: {
        input_tokens: 34610,
        cached_input_tokens: 16128,
        cache_write_input_tokens: 7,
        output_tokens: 62
      }
    });

    expect(lifted).toEqual({
      kind: 'result',
      usage: {
        input_tokens: 34610,
        output_tokens: 62,
        cache_read_input_tokens: 16128,
        cache_creation_input_tokens: 7
      }
    });
  });

  test('drops a codex field the tally has no name for', () => {
    const spec = codexSpec();

    const lifted = spec.liftUsage({
      type: 'turn.completed',
      usage: { input_tokens: 1, reasoning_output_tokens: 13 }
    });

    expect(lifted?.usage).toEqual({ input_tokens: 1 });
  });

  test('returns null when no field is a finite number', () => {
    const spec = codexSpec();

    const lifted = spec.liftUsage({
      type: 'turn.completed',
      usage: { input_tokens: 'lots' }
    });

    expect(lifted).toBeNull();
  });

  test('returns null for an event that carries no usage', () => {
    const spec = codexSpec();

    expect(spec.liftUsage({ type: 'turn.started' })).toBeNull();
    expect(spec.liftUsage({ type: 'turn.completed' })).toBeNull();
    expect(spec.liftUsage(null)).toBeNull();
  });
});

describe('runner/codex event normalization', () => {
  test('maps a completed agent_message to a text event', () => {
    const spec = codexSpec();

    const out = spec.normalize({
      type: 'item.completed',
      item: { id: 'item_2', type: 'agent_message', text: 'DONE' }
    });

    expect(out).toMatchObject({ kind: 'text', text: 'DONE' });
  });

  test('maps a started command_execution to a shell tool event', () => {
    const spec = codexSpec();

    const out = spec.normalize({
      type: 'item.started',
      item: { id: 'item_1', type: 'command_execution', command: 'ls -al' }
    });

    expect(out).toMatchObject({
      kind: 'tool',
      name: 'shell',
      input: { command: 'ls -al' }
    });
  });

  test('drops the completed command_execution so one execution is one event', () => {
    const spec = codexSpec();

    const out = spec.normalize({
      type: 'item.completed',
      item: {
        id: 'item_1',
        type: 'command_execution',
        command: 'ls -al',
        exit_code: 0,
        status: 'completed'
      }
    });

    expect(out).toBeNull();
  });

  test('maps a completed error item to an error event', () => {
    const spec = codexSpec();

    const out = spec.normalize({
      type: 'item.completed',
      item: { id: 'item_0', type: 'error', message: '모델 불일치' }
    });

    expect(out).toMatchObject({ kind: 'error', message: '모델 불일치' });
  });

  test('maps a top-level error to an error event', () => {
    const spec = codexSpec();

    const out = spec.normalize({ type: 'error', message: '400' });

    expect(out).toMatchObject({ kind: 'error', message: '400' });
  });

  test('maps turn.failed to an error event carrying the nested message', () => {
    const spec = codexSpec();

    const out = spec.normalize({
      type: 'turn.failed',
      error: { message: 'invalid effort' }
    });

    expect(out).toMatchObject({ kind: 'error', message: 'invalid effort' });
  });

  test('maps turn.completed to a result event carrying the usage', () => {
    const spec = codexSpec();

    const out = spec.normalize({
      type: 'turn.completed',
      usage: { input_tokens: 5, output_tokens: 2 }
    });

    expect(out).toMatchObject({
      kind: 'result',
      usage: { input_tokens: 5, output_tokens: 2 }
    });
  });

  test('drops reasoning, turn.started and thread.started', () => {
    const spec = codexSpec();

    expect(
      spec.normalize({
        type: 'item.completed',
        item: { id: 'item_0', type: 'reasoning', text: '**Thinking**' }
      })
    ).toBeNull();
    expect(spec.normalize({ type: 'turn.started' })).toBeNull();
    expect(
      spec.normalize({ type: 'thread.started', thread_id: 'x' })
    ).toBeNull();
  });
});

describe('runner/codex session id (spec §2)', () => {
  test('reads thread_id off thread.started', () => {
    const spec = codexSpec();

    expect(
      spec.extractSessionId?.({ type: 'thread.started', thread_id: 'th-1' })
    ).toBe('th-1');
  });

  test('returns null for any other line or an empty id', () => {
    const spec = codexSpec();

    expect(spec.extractSessionId?.({ type: 'turn.started' })).toBeNull();
    expect(
      spec.extractSessionId?.({ type: 'thread.started', thread_id: '' })
    ).toBeNull();
  });
});

describe('runner/codex fail-closed approval safety net', () => {
  test('flags an approval-shaped event type', () => {
    const spec = codexSpec();

    expect(spec.detectQuestion({ type: 'turn.approval_requested' })).toContain(
      'approval'
    );
  });

  test('flags an approval-shaped item type', () => {
    const spec = codexSpec();

    expect(
      spec.detectQuestion({
        type: 'item.started',
        item: { id: 'i', type: 'command_approval' }
      })
    ).toContain('approval');
  });

  test('passes an ordinary command execution', () => {
    const spec = codexSpec();

    expect(
      spec.detectQuestion({
        type: 'item.started',
        item: { id: 'i', type: 'command_execution', command: 'ls' }
      })
    ).toBeNull();
  });
});

describe('runner/codex shell command extraction (merge guard seam)', () => {
  test('returns the command of a started command_execution', () => {
    const spec = codexSpec();

    expect(
      spec.extractShellCommand?.({
        type: 'item.started',
        item: { id: 'i', type: 'command_execution', command: 'git push' }
      })
    ).toBe('git push');
  });

  test('returns null for the completed twin so the guard judges once', () => {
    const spec = codexSpec();

    expect(
      spec.extractShellCommand?.({
        type: 'item.completed',
        item: { id: 'i', type: 'command_execution', command: 'git push' }
      })
    ).toBeNull();
  });
});

describe('runner/codex verdict (last turn terminal event)', () => {
  test('succeeds on a turn.completed', () => {
    const spec = codexSpec();

    expect(
      spec.verdict({
        raw: [{ type: 'turn.started' }, { type: 'turn.completed' }],
        exit: 0,
        blocked: false
      })
    ).toEqual({ success: true, reason: 'ok' });
  });

  test('fails on a turn.failed', () => {
    const spec = codexSpec();

    expect(
      spec.verdict({
        raw: [{ type: 'turn.completed' }, { type: 'turn.failed' }],
        exit: 1,
        blocked: false
      })
    ).toEqual({ success: false, reason: 'turn_failed' });
  });

  test('fails with no_result on a stream with no terminal turn event', () => {
    const spec = codexSpec();

    expect(
      spec.verdict({
        raw: [{ type: 'thread.started', thread_id: 'x' }],
        exit: 0,
        blocked: false
      })
    ).toEqual({ success: false, reason: 'no_result' });
  });
});

describe('runner/codex fixture replay through the session engine', () => {
  test('replays the success fixture to an ok verdict', async () => {
    const spawn_impl = makeFixtureSpawn({ file: SUCCESS_FIXTURE, exit: 0 });

    const v = await spawnCodex(BEAD, WS, { model: 'sol' }, { spawn_impl }).done;

    expect(v.success).toBe(true);
    expect(v.reason).toBe('ok');
  });

  test('emits the thread id once on the success fixture', async () => {
    const spawn_impl = makeFixtureSpawn({ file: SUCCESS_FIXTURE, exit: 0 });
    const handle = spawnCodex(BEAD, WS, { model: 'sol' }, { spawn_impl });
    /** @type {string[]} */
    const ids = [];
    handle.events.on('session_id', (id) => ids.push(id));

    await handle.done;

    expect(ids).toEqual(['019fe700-4fd3-7990-89a9-3b9896824273']);
  });

  test('carries the fixture usage onto the result event', async () => {
    const spawn_impl = makeFixtureSpawn({ file: SUCCESS_FIXTURE, exit: 0 });

    const v = await spawnCodex(BEAD, WS, { model: 'sol' }, { spawn_impl }).done;

    expect(v.events.find((e) => e.kind === 'result')?.usage).toEqual({
      input_tokens: 34610,
      output_tokens: 62,
      cache_read_input_tokens: 16128,
      cache_creation_input_tokens: 0
    });
  });

  test('emits one shell tool event for the fixture command execution', async () => {
    const spawn_impl = makeFixtureSpawn({ file: SUCCESS_FIXTURE, exit: 0 });

    const v = await spawnCodex(BEAD, WS, { model: 'sol' }, { spawn_impl }).done;

    expect(v.events.filter((e) => e.kind === 'tool')).toHaveLength(1);
  });

  test('replays the failure fixture to a turn_failed verdict', async () => {
    const spawn_impl = makeFixtureSpawn({ file: FAILURE_FIXTURE, exit: 1 });

    const v = await spawnCodex(BEAD, WS, { model: 'sol' }, { spawn_impl }).done;

    expect(v.success).toBe(false);
    expect(v.reason).toBe('turn_failed');
  });

  test('survives the resume fixture model-mismatch warning', async () => {
    const spawn_impl = makeFixtureSpawn({ file: RESUME_FIXTURE, exit: 0 });

    const v = await spawnCodex(
      BEAD,
      WS,
      {
        model: 'sol',
        resume_session_id: '019fe700-4fd3-7990-89a9-3b9896824273'
      },
      { spawn_impl }
    ).done;

    expect(v.success).toBe(true);
    expect(v.events.filter((e) => e.kind === 'error')).toHaveLength(1);
  });

  test('forwards the routing env to the codex command', async () => {
    const spawn_impl = makeFixtureSpawn({ file: SUCCESS_FIXTURE, exit: 0 });

    await spawnCodex(
      BEAD,
      WS,
      { model: 'sol' },
      { spawn_impl, routing_env: { OPENAI_BASE_URL: 'http://127.0.0.1:9' } }
    ).done;

    expect(spawn_impl.captured.calls[0].options.env.OPENAI_BASE_URL).toBe(
      'http://127.0.0.1:9'
    );
  });

  test('spawns the catalog entry command handed in through deps', async () => {
    const spawn_impl = makeFixtureSpawn({ file: SUCCESS_FIXTURE, exit: 0 });

    await spawnCodex(
      BEAD,
      WS,
      { model: 'sol' },
      {
        spawn_impl,
        catalog_entry: {
          command: '/opt/codex',
          models: { sol: { id: 'gpt-5.6-sol' } },
          efforts: []
        }
      }
    ).done;

    expect(spawn_impl.captured.calls[0].command).toBe('/opt/codex');
  });
});
