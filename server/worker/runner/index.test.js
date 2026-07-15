import { describe, expect, test } from 'vitest';
import { makeFixtureSpawn } from './fixture-spawn.js';
import {
  RunnerBlockedError,
  assertRunnerAllowed,
  createRunner
} from './index.js';

/**
 * @returns {string}
 */
function resultLine() {
  return JSON.stringify({
    type: 'result',
    subtype: 'success',
    is_error: false,
    permission_denials: []
  });
}

const WS = '/tmp/ws';

describe('runner/index full_plan guard', () => {
  test('full_plan + no plan_path + codex is refused', () => {
    const bead = { id: 'UI-3', route: 'full_plan' };
    expect(() => assertRunnerAllowed(bead, 'codex')).toThrow(
      RunnerBlockedError
    );
    expect(() => assertRunnerAllowed(bead, 'ccx')).toThrow(/plan-save hook/);
  });

  test('full_plan + no plan_path + claude is allowed', () => {
    const bead = { id: 'UI-3', route: 'full_plan' };
    expect(() => assertRunnerAllowed(bead, 'claude')).not.toThrow();
  });

  test('full_plan WITH plan_path allows codex/ccx', () => {
    const bead = { id: 'UI-3', route: 'full_plan', plan_path: 'docs/plan.md' };
    expect(() => assertRunnerAllowed(bead, 'codex')).not.toThrow();
    expect(() => assertRunnerAllowed(bead, 'ccx')).not.toThrow();
  });

  test('spawn() enforces the guard for codex', () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()] });
    const runner = createRunner('codex', { spawn_impl });
    expect(() =>
      runner.spawn({ id: 'UI-3', route: 'full_plan' }, WS, {})
    ).toThrow(RunnerBlockedError);
  });
});

describe('runner/index selection', () => {
  test('unknown runner name defaults to claude', () => {
    expect(createRunner('nope', {}).name).toBe('claude');
  });

  test('ccx spawns the claude command with routing env', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()], exit: 0 });
    const runner = createRunner('ccx', {
      spawn_impl,
      ccx_env: { ANTHROPIC_BASE_URL: 'http://127.0.0.1:9099' }
    });
    expect(runner.name).toBe('ccx');
    await runner.spawn({ id: 'UI-4' }, WS, {}).done;
    const call = spawn_impl.captured.calls[0];
    expect(call.command).toBe('claude');
    expect(call.options.env.ANTHROPIC_BASE_URL).toBe('http://127.0.0.1:9099');
  });

  test('codex runner spawns the codex command', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [JSON.stringify({ type: 'turn.completed', usage: {} })],
      exit: 0
    });
    const runner = createRunner('codex', { spawn_impl });
    const v = await runner.spawn({ id: 'UI-5' }, WS, {}).done;
    expect(spawn_impl.captured.calls[0].command).toBe('codex');
    expect(v.success).toBe(true);
  });
});
