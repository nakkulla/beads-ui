import { describe, expect, test, vi } from 'vitest';
import * as executionDefaults from '../worker/execution-defaults.js';
import { decorateQueue } from './worker-handlers.js';

const WS = '/tmp/example-workspace/project-a';

/**
 * @returns {Record<string, unknown>}
 */
function bareQueue() {
  return {
    revision: 1,
    auto_advance: false,
    queue: [],
    pr_wait: [],
    done: [],
    attempts: {},
    exec_defaults: {}
  };
}

describe('decorateQueue runner_catalog decoration (UI-jrb3 §7)', () => {
  test('ships the resolved catalog at the snapshot top level', () => {
    const out = /** @type {any} */ (decorateQueue(WS, bareQueue()));

    expect(out.runner_catalog).toBeTruthy();
    expect(typeof out.runner_catalog.runners).toBe('object');
    expect(typeof out.runner_catalog.model_index).toBe('object');
  });

  test('the catalog carries the runner→models grouping the selectors render from', () => {
    const catalog = /** @type {any} */ (decorateQueue(WS, bareQueue()))
      .runner_catalog;

    expect(Object.keys(catalog.runners)).toEqual(['claude', 'codex']);
    expect(Object.keys(catalog.runners.claude.models)).toContain('opus');
    expect(Object.keys(catalog.runners.codex.models)).toContain('sol');
    expect(catalog.model_index.sol).toBe('codex');
    expect(catalog.model_index.opus).toBe('claude');
    expect(catalog.runners.codex.models.luna.efforts).toContain('max');
  });

  test('preserves nested outer effort and speed capabilities additively', () => {
    const catalog = /** @type {any} */ (decorateQueue(WS, bareQueue()))
      .runner_catalog;

    expect(catalog.runners.codex.models.sol).toMatchObject({
      orchestration_efforts: ['low', 'medium', 'high', 'xhigh', 'max', 'ultra'],
      speed_tiers: ['default', 'fast']
    });
    expect(catalog.runners.codex.models.sol.efforts).toEqual([
      'low',
      'medium',
      'high',
      'xhigh'
    ]);
    const wire_catalog = JSON.parse(JSON.stringify(catalog));
    expect(wire_catalog.runners.codex.models.sol).toMatchObject({
      orchestration_efforts: ['low', 'medium', 'high', 'xhigh', 'max', 'ultra'],
      speed_tiers: ['default', 'fast']
    });
  });

  test('the decoration is additive — it does not disturb the persisted queue', () => {
    const out = /** @type {any} */ (decorateQueue(WS, bareQueue()));

    expect(out.revision).toBe(1);
    expect(out.exec_defaults).toEqual({});
  });
});

describe('decorateQueue execution_defaults decoration', () => {
  test('ships supported defaults without changing persisted queue fields', () => {
    const out = /** @type {any} */ (decorateQueue(WS, bareQueue()));

    expect(out.execution_defaults).toMatchObject({
      supported: true,
      schema_version: 1,
      session: { workflow_mode_default: 'standard' },
      orchestration: { model: 'opus', runtime: 'claude' }
    });
    expect(out.revision).toBe(1);
    expect(out.exec_defaults).toEqual({});
  });

  test('keeps the queue snapshot when defaults are unsupported', () => {
    vi.spyOn(executionDefaults, 'projectExecutionDefaults').mockReturnValueOnce(
      /** @type {any} */ ({
        supported: false,
        schema_version: 2,
        source_commit: 'future',
        digest: 'abc',
        session: null,
        orchestration: null
      })
    );

    const out = /** @type {any} */ (decorateQueue(WS, bareQueue()));

    expect(out.execution_defaults.supported).toBe(false);
    expect(out.queue).toEqual([]);
    expect(out.revision).toBe(1);
  });
});
