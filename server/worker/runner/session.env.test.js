import { afterEach, beforeEach, describe, expect, test } from 'vitest';
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
  if (saved_collide === undefined) {
    delete process.env[COLLIDE];
  } else {
    process.env[COLLIDE] = saved_collide;
  }
});

describe('runner/session spawn env inheritance (F2)', () => {
  test('child env = { ...process.env, ...settings.env, ...routing_env }', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()] });
    // ccx supplies routing env; settings carries the per-session worker token.
    const runner = createRunner('ccx', {
      spawn_impl,
      ccx_env: { [COLLIDE]: 'from-routing' }
    });
    await runner.spawn({ id: 'UI-1' }, WS, {
      env: { BDUI_WORKER_TOKEN: 'tok-123' }
    }).done;

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
});
