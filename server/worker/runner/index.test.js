import { describe, expect, test } from 'vitest';
import { makeFixtureSpawn } from './fixture-spawn.js';
import { RUNNERS, createRunner } from './index.js';

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

describe('runner/index registry (worker-phase1 §4)', () => {
  test('claude is the only runner', () => {
    expect([...RUNNERS]).toEqual(['claude']);
  });

  test('any runner name resolves to the claude adapter', async () => {
    for (const name of ['claude', 'codex', 'ccx', 'nope', undefined]) {
      const spawn_impl = makeFixtureSpawn({ lines: [resultLine()], exit: 0 });
      const runner = createRunner(/** @type {any} */ (name), { spawn_impl });
      expect(runner.name).toBe('claude');
      const v = await runner.spawn({ id: 'UI-1' }, WS, {}).done;
      expect(spawn_impl.captured.calls[0].command).toBe('claude');
      expect(v.success).toBe(true);
    }
  });

  test('a full_plan bead spawns without a runner guard', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()], exit: 0 });
    const runner = createRunner('claude', { spawn_impl });
    const v = await runner.spawn(
      { id: 'UI-3', route: 'full_plan', plan_path: 'docs/plan.md' },
      WS,
      {}
    ).done;
    expect(v.success).toBe(true);
  });
});
