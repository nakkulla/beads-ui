import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { spawnClaude } from './claude.js';
import { makeFixtureSpawn } from './fixture-spawn.js';
import { createRunner } from './index.js';

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
const COLLIDE = 'BDUI_ENV_COLLIDE_TEST';

/** @type {string | undefined} */
let saved_collide;

beforeEach(() => {
  saved_collide = process.env[COLLIDE];
  process.env[COLLIDE] = 'from-process-env';
});

afterEach(() => {
  delete process.env.WORKFLOW_REPO_ROOT;
  delete process.env.WORKFLOW_BEAD_ID;
  delete process.env.CLAUDE_READ_GUARD_MAX_BYTES;
  if (saved_collide === undefined) {
    delete process.env[COLLIDE];
  } else {
    process.env[COLLIDE] = saved_collide;
  }
});

describe('runner/session spawn env inheritance (F2)', () => {
  test('child env = { ...process.env, ...settings.env, ...routing_env }', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()] });
    // The adapter layers a routing env over the inherited process env; the
    // registry passes an empty one, so drive spawnClaude directly to cover the
    // precedence rule the engine implements.
    await spawnClaude(
      { id: 'UI-1' },
      WS,
      { env: { BDUI_WORKER_TOKEN: 'tok-123' } },
      { spawn_impl, routing_env: { [COLLIDE]: 'from-routing' } }
    ).done;

    const env = spawn_impl.captured.calls[0].options.env;
    // process.env is inherited so PATH reaches the spawned CLI.
    expect(env.PATH).toBe(process.env.PATH);
    // The per-session settings env is layered in.
    expect(env.BDUI_WORKER_TOKEN).toBe('tok-123');
    // Routing env WINS on a collision with the inherited process env.
    expect(env[COLLIDE]).toBe('from-routing');
  });

  test('without routing overrides, the inherited process value survives', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()] });
    const runner = createRunner('claude', { spawn_impl });
    await runner.spawn({ id: 'UI-2' }, WS, {}).done;
    const env = spawn_impl.captured.calls[0].options.env;
    expect(env.PATH).toBe(process.env.PATH);
    expect(env[COLLIDE]).toBe('from-process-env');
  });

  test('strips an inherited WORKFLOW_ locator from the child env', async () => {
    process.env.WORKFLOW_REPO_ROOT = '/other/repo';
    process.env.WORKFLOW_BEAD_ID = 'OTHER-1';
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()] });
    const runner = createRunner('claude', { spawn_impl });

    await runner.spawn({ id: 'UI-4' }, WS, {}).done;

    const env = spawn_impl.captured.calls[0].options.env;
    expect(env.WORKFLOW_REPO_ROOT).toBeUndefined();
    expect(env.WORKFLOW_BEAD_ID).toBeUndefined();
  });

  test('carries the attempt locator pair over the inherited one', async () => {
    process.env.WORKFLOW_REPO_ROOT = '/other/repo';
    process.env.WORKFLOW_BEAD_ID = 'OTHER-1';
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()] });
    const runner = createRunner('claude', { spawn_impl });

    await runner.spawn({ id: 'UI-5' }, WS, {
      env: { WORKFLOW_REPO_ROOT: '/repo', WORKFLOW_BEAD_ID: 'UI-5' }
    }).done;

    const env = spawn_impl.captured.calls[0].options.env;
    expect(env.WORKFLOW_REPO_ROOT).toBe('/repo');
    expect(env.WORKFLOW_BEAD_ID).toBe('UI-5');
  });

  test('carries the worker read-guard ceiling into the child env', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()] });
    const runner = createRunner('claude', { spawn_impl });

    await runner.spawn({ id: 'UI-6' }, WS, {}).done;

    const env = spawn_impl.captured.calls[0].options.env;
    expect(env.CLAUDE_READ_GUARD_MAX_BYTES).toBe('65536');
    expect(env.CLAUDE_HOOK_SUPPRESS).toBe('1');
  });

  test('lets the adapter env win over an inherited read-guard value', async () => {
    process.env.CLAUDE_READ_GUARD_MAX_BYTES = '40000';
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()] });
    const runner = createRunner('claude', { spawn_impl });

    await runner.spawn({ id: 'UI-7' }, WS, {}).done;

    expect(
      spawn_impl.captured.calls[0].options.env.CLAUDE_READ_GUARD_MAX_BYTES
    ).toBe('65536');
  });

  test('passes an account-isolated CODEX_HOME to the child', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()] });
    const runner = createRunner('claude', { spawn_impl });

    await runner.spawn({ id: 'UI-3' }, WS, {
      env: { CODEX_HOME: '/state/bdui/codex-homes/account' }
    }).done;

    expect(spawn_impl.captured.calls[0].options.env.CODEX_HOME).toBe(
      '/state/bdui/codex-homes/account'
    );
  });
});
