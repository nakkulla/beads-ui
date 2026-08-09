import { describe, expect, test } from 'vitest';
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

  test('the decoration is additive — it does not disturb the persisted queue', () => {
    const out = /** @type {any} */ (decorateQueue(WS, bareQueue()));

    expect(out.revision).toBe(1);
    expect(out.exec_defaults).toEqual({});
  });
});
