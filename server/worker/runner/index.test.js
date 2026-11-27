import { afterEach, describe, expect, test } from 'vitest';
import { __setAgyModelListForTest } from '../agy-model-list.js';
import { makeFixtureSpawn } from './fixture-spawn.js';
import {
  RUNNERS,
  UNKNOWN_RUNNER,
  __resetRuntimeCatalogForTest,
  adapterSpec,
  createRunner,
  dispatchCatalog,
  runtimeCatalog
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
      },
      agy: {
        command: '/opt/agy',
        models: { 'gemini-4-neon-high': { id: 'gemini-4-neon-high' } },
        efforts: [],
        default_model: 'gemini-4-neon-high'
      }
    },
    model_index: {
      opus: 'claude',
      sol: 'codex',
      'gemini-4-neon-high': 'agy'
    }
  };
}

/**
 * @returns {string[]}
 */
function agyLines() {
  return [
    JSON.stringify({ event: 'init', conversation_id: 'conv-1' }),
    JSON.stringify({
      event: 'result',
      result: { conversation_id: 'conv-1', status: 'SUCCESS' }
    })
  ];
}

/**
 * A stand-in process-wide agy list that reports `names` as read.
 *
 * @param {string[]} names
 */
function stubAgyList(names) {
  return /** @type {any} */ ({
    names: () => names,
    revision: () => names.length,
    stop: () => {}
  });
}

afterEach(() => {
  __setAgyModelListForTest(null);
  __resetRuntimeCatalogForTest();
});

const WS = '/tmp/ws';

describe('runner/index registry (worker-multi-provider-runner §B)', () => {
  test('exposes the catalog active runners as the adapter vocabulary', () => {
    expect([...RUNNERS]).toEqual(['claude', 'codex', 'agy']);
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

  test.each(['ccx', 'nope', 'gemini', undefined])(
    'refuses the unregistered runner name %s with unknown_runner',
    (name) => {
      const spawn_impl = makeFixtureSpawn({ lines: [resultLine()], exit: 0 });

      const create = () =>
        createRunner(/** @type {any} */ (name), {
          spawn_impl,
          catalog: testCatalog()
        });

      expect(create).toThrow(expect.objectContaining({ code: UNKNOWN_RUNNER }));
      expect(spawn_impl.captured.calls).toHaveLength(0);
    }
  );

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

  test('refuses codex with unknown_runner when the catalog drops the codex entry', () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()], exit: 0 });
    const catalog = testCatalog();
    delete catalog.runners.codex;

    const create = () => createRunner('codex', { spawn_impl, catalog });

    expect(create).toThrow(expect.objectContaining({ code: UNKNOWN_RUNNER }));
    expect(spawn_impl.captured.calls).toHaveLength(0);
  });

  test('resolves agy to the agy adapter', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: agyLines(), exit: 0 });
    const runner = createRunner('agy', {
      spawn_impl,
      catalog: testCatalog()
    });

    const v = await runner.spawn({ id: 'UI-1', prompt: 'task' }, WS, {
      model: 'gemini-4-neon-high'
    }).done;

    expect(runner.name).toBe('agy');
    expect(spawn_impl.captured.calls[0].command).toBe('/opt/agy');
    expect(v.success).toBe(true);
  });

  test('refuses agy with unknown_runner when the catalog drops the agy entry', () => {
    const spawn_impl = makeFixtureSpawn({ lines: agyLines(), exit: 0 });
    const catalog = testCatalog();
    delete catalog.runners.agy;

    const create = () => createRunner('agy', { spawn_impl, catalog });

    expect(create).toThrow(expect.objectContaining({ code: UNKNOWN_RUNNER }));
    expect(spawn_impl.captured.calls).toHaveLength(0);
  });

  test('parses agy output with the agy adapter spec', () => {
    const spec = adapterSpec('agy', { catalog: testCatalog() });

    const session_id = spec.extractSessionId?.({
      event: 'init',
      conversation_id: 'conv-9'
    });

    expect(session_id).toBe('conv-9');
  });

  test('refuses claude with unknown_runner when the catalog drops the claude entry', () => {
    const spawn_impl = makeFixtureSpawn({ lines: [resultLine()], exit: 0 });
    const catalog = testCatalog();
    delete catalog.runners.claude;

    const create = () => createRunner('claude', { spawn_impl, catalog });

    expect(create).toThrow(expect.objectContaining({ code: UNKNOWN_RUNNER }));
    expect(spawn_impl.captured.calls).toHaveLength(0);
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

describe('runner/index agy catalog boundary (UI-h0hwo Phase 2)', () => {
  test('keeps agy out of the runtime catalog', () => {
    __setAgyModelListForTest(stubAgyList(['gemini-4-neon-high']));
    __resetRuntimeCatalogForTest();

    const catalog = runtimeCatalog();

    expect(Object.keys(catalog.runners)).not.toContain('agy');
    expect(Object.values(catalog.model_index)).not.toContain('agy');
  });

  test('carries the listed agy ids in the dispatch catalog', () => {
    __setAgyModelListForTest(stubAgyList(['gemini-4-neon-high']));
    __resetRuntimeCatalogForTest();

    const catalog = dispatchCatalog();

    expect(catalog.model_index['gemini-4-neon-high']).toBe('agy');
    expect(catalog.runners.agy.default_model).toBe('gemini-4-neon-high');
  });

  test('swaps the dispatch catalog when the agy list changes', () => {
    /** @type {string[]} */
    let names = [];
    __setAgyModelListForTest(
      /** @type {any} */ ({
        names: () => names,
        revision: () => names.length,
        stop: () => {}
      })
    );
    __resetRuntimeCatalogForTest();
    const before = dispatchCatalog();

    names = ['gemini-4-carbon-high'];
    const after = dispatchCatalog();

    expect(before.model_index['gemini-4-carbon-high']).toBeUndefined();
    expect(after.model_index['gemini-4-carbon-high']).toBe('agy');
  });
});
