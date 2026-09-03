import { describe, expect, test } from 'vitest';
import { makeFixtureSpawn } from './fixture-spawn.js';
import { RUNNERS, adapterSpec, createRunner } from './index.js';

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

/**
 * @returns {string[]}
 */
function codexLines() {
  return [
    JSON.stringify({ type: 'thread.started', thread_id: 'th-1' }),
    JSON.stringify({
      type: 'turn.completed',
      usage: { input_tokens: 1, output_tokens: 1 }
    })
  ];
}

/**
 * A catalog with both adapters, injected so the registry tests never depend on
 * the machine's `~/.config/bdui/config.toml`.
 *
 * @returns {import('../runner-catalog.js').ResolvedCatalog}
 */
function testCatalog() {
  return {
    runners: {
      claude: {
        command: 'claude',
        models: { opus: { id: 'opus' } },
        efforts: []
      },
      codex: {
        command: 'codex',
        models: { sol: { id: 'gpt-5.6-sol' } },
        efforts: []
      }
    },
    model_index: { opus: 'claude', sol: 'codex' }
  };
}

const WS = '/tmp/ws';

describe('runner/index registry (worker-multi-provider-runner §B)', () => {
  test('exposes the catalog active runners as the adapter vocabulary', () => {
    expect([...RUNNERS]).toEqual(['claude', 'codex']);
  });

  test('resolves codex to the codex adapter', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: codexLines(), exit: 0 });
    const runner = createRunner('codex', {
      spawn_impl,
      catalog: testCatalog()
    });

    const v = await runner.spawn({ id: 'UI-1' }, WS, { model: 'sol' }).done;

    expect(runner.name).toBe('codex');
    expect(spawn_impl.captured.calls[0].command).toBe('codex');
    expect(v.success).toBe(true);
  });

  test('carries a config catalog command into the codex spawn', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: codexLines(), exit: 0 });
    const catalog = testCatalog();
    catalog.runners.codex.command = '/opt/codex';
    const runner = createRunner('codex', { spawn_impl, catalog });

    await runner.spawn({ id: 'UI-1' }, WS, { model: 'sol' }).done;

    expect(spawn_impl.captured.calls[0].command).toBe('/opt/codex');
  });

  test('falls back to claude for an unknown runner name', async () => {
    for (const name of ['ccx', 'nope', undefined]) {
      const spawn_impl = makeFixtureSpawn({ lines: [resultLine()], exit: 0 });
      const runner = createRunner(/** @type {any} */ (name), {
        spawn_impl,
        catalog: testCatalog()
      });

      const v = await runner.spawn({ id: 'UI-1' }, WS, {}).done;

      expect(runner.name).toBe('claude');
      expect(spawn_impl.captured.calls[0].command).toBe('claude');
      expect(v.success).toBe(true);
    }
  });

  test('resolves claude to the claude adapter', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()], exit: 0 });
    const runner = createRunner('claude', {
      spawn_impl,
      catalog: testCatalog()
    });

    const v = await runner.spawn({ id: 'UI-1' }, WS, {}).done;

    expect(runner.name).toBe('claude');
    expect(v.success).toBe(true);
  });

  test('falls back to claude when the catalog drops the codex entry', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()], exit: 0 });
    const catalog = testCatalog();
    delete catalog.runners.codex;
    const runner = createRunner('codex', { spawn_impl, catalog });

    const v = await runner.spawn({ id: 'UI-1' }, WS, {}).done;

    expect(runner.name).toBe('claude');
    expect(v.success).toBe(true);
  });

  test('exposes claude outage classification through the registry', () => {
    const spec = adapterSpec('claude', { catalog: testCatalog() });
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

  test('exposes the null codex outage hook through the registry', () => {
    const spec = adapterSpec('codex', { catalog: testCatalog() });
    const raw = [
      { type: 'turn.failed', error: { message: 'API Error: 529 Overloaded' } }
    ];

    const result = spec.classifyProviderOutage?.({ raw, stderr_tail: null });

    expect(result).toBeNull();
  });

  test('a full_plan bead spawns without a runner guard', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()], exit: 0 });
    const runner = createRunner('claude', {
      spawn_impl,
      catalog: testCatalog()
    });
    const v = await runner.spawn(
      { id: 'UI-3', route: 'full_plan', plan_path: 'docs/plan.md' },
      WS,
      {}
    ).done;
    expect(v.success).toBe(true);
  });
});
