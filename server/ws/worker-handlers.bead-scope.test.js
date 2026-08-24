import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { getWorkerRuntime } from '../worker/runtime.js';
import {
  __resetScopeCacheForTest,
  __setScopeCacheForTest,
  createScopeCache
} from '../worker/scope-cache.js';
import { decorateQueue } from './worker-handlers.js';

const WS = '/tmp/example-workspace/project-scope';
const BASE = 'a'.repeat(40);
const SPEC_A = 'docs/specs/a.md';
const SPEC_B = 'docs/specs/b.md';
const SPEC_C = 'docs/specs/c.md';
const SPEC_D = 'docs/specs/d.md';

/**
 * An artifact whose front matter declares `prefixes`.
 *
 * @param {string[]} prefixes
 * @returns {string}
 */
function artifact(prefixes) {
  return ['---', 'scope:', ...prefixes.map((p) => `  - ${p}`), '---', ''].join(
    '\n'
  );
}

/**
 * A scope cache reading from a blob map at a fixed base. A path absent from the
 * map exits non-zero, which is the unreadable-artifact failure.
 *
 * @param {Record<string, string>} blobs
 */
function scopeCacheOver(blobs) {
  const gitRun = vi.fn(async (/** @type {string[]} */ args) => {
    const target = String(args[2] || '');
    const content = blobs[target.slice(target.indexOf(':') + 1)];
    return typeof content === 'string'
      ? { code: 0, stdout: content }
      : { code: 128, stdout: '' };
  });
  const resolveBase = vi.fn(
    async () =>
      /** @type {import('../worker/target-base.js').TargetBaseResult} */ ({
        ok: true,
        base: 'main',
        declared: true,
        remote: 'origin',
        remote_ref: 'refs/remotes/origin/main',
        base_oid: BASE,
        local_only: false
      })
  );
  return createScopeCache({
    contextFor: () => ({ repo: WS, resolveBase, gitRun })
  });
}

/**
 * A queue holding one bead in each member lane plus one in `pr_wait`, so a
 * single decoration exercises the whole target set and its one exclusion.
 *
 * @returns {Record<string, unknown>}
 */
function laneQueue() {
  return {
    revision: 1,
    auto_advance: false,
    auto_merge: false,
    queue: [{ bead_id: 'UI-1', added_at: 1 }],
    serial_lanes: [
      { id: 's1', entries: [{ bead_id: 'UI-4', added_at: 1 }] },
      { id: 's2', entries: [] }
    ],
    pr_wait: [{ bead_id: 'UI-3', added_at: 1 }],
    done: [],
    attempts: {
      'att-1': { attempt_id: 'att-1', bead_id: 'UI-2', status: 'running' }
    },
    exec_defaults: {}
  };
}

/**
 * Put one bead's spec pointer in the title cache without a `bd show`.
 *
 * @param {string} bead_id
 * @param {string} spec_id
 */
function seedBead(bead_id, spec_id) {
  getWorkerRuntime().titleCache.refreshFromIssue(WS, {
    id: bead_id,
    title: `${bead_id} 제목`,
    ...(spec_id.length > 0 ? { spec_id } : {}),
    metadata: { route: spec_id.length > 0 ? 'spec_backed' : 'quick_fix' }
  });
}

beforeEach(() => {
  getWorkerRuntime().titleCache.clear();
});

afterEach(() => {
  __resetScopeCacheForTest();
  vi.restoreAllMocks();
});

describe('decorateQueue bead_scope (UI-qm12 §4.3)', () => {
  test('carries the declared scope of the parallel, serial and running beads', async () => {
    seedBead('UI-1', SPEC_A);
    seedBead('UI-2', SPEC_B);
    seedBead('UI-4', SPEC_D);
    const cache = scopeCacheOver({
      [SPEC_A]: artifact(['server/']),
      [SPEC_B]: artifact(['app/views/']),
      [SPEC_D]: artifact(['docs/'])
    });
    await cache.fill(WS, [SPEC_A]);
    await cache.fill(WS, [SPEC_B]);
    await cache.fill(WS, [SPEC_D]);
    __setScopeCacheForTest(cache);

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_scope).toEqual({
      'UI-1': { scope: ['server/'], artifacts: [SPEC_A] },
      'UI-2': { scope: ['app/views/'], artifacts: [SPEC_B] },
      'UI-4': { scope: ['docs/'], artifacts: [SPEC_D] }
    });
  });

  test('leaves the pr_wait bead out of the target set', async () => {
    seedBead('UI-3', SPEC_C);
    const cache = scopeCacheOver({ [SPEC_C]: artifact(['server/']) });
    await cache.fill(WS, [SPEC_C]);
    __setScopeCacheForTest(cache);

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(Object.hasOwn(out.bead_scope, 'UI-3')).toBe(false);
  });

  test('carries null for a bead whose artifacts cannot be read', async () => {
    seedBead('UI-1', SPEC_A);
    const cache = scopeCacheOver({});
    await cache.fill(WS, [SPEC_A]);
    __setScopeCacheForTest(cache);

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_scope['UI-1']).toBeNull();
  });

  test('omits a bead whose scope has not been read yet', () => {
    seedBead('UI-1', SPEC_A);
    __setScopeCacheForTest(scopeCacheOver({ [SPEC_A]: artifact(['server/']) }));

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_scope).toEqual({});
  });

  test('omits a bead that declares no spec', async () => {
    seedBead('UI-1', '');
    const cache = scopeCacheOver({});
    await cache.fill(WS, [SPEC_A]);
    __setScopeCacheForTest(cache);

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_scope).toEqual({});
  });

  test('carries the declared scope of a 후보 bead that is in no lane', async () => {
    const cache = scopeCacheOver({ [SPEC_C]: artifact(['app/utils/']) });
    await cache.fill(WS, [SPEC_C]);
    __setScopeCacheForTest(cache);
    vi.spyOn(getWorkerRuntime().runnableCache, 'runnablePeek').mockReturnValue([
      /** @type {any} */ ({ bead_id: 'UI-9', spec_id: SPEC_C, plan_path: null })
    ]);

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_scope['UI-9']).toEqual({
      scope: ['app/utils/'],
      artifacts: [SPEC_C]
    });
  });

  test('reads a 후보 bead from the same artifact set a queued bead would use', async () => {
    const cache = scopeCacheOver({
      [SPEC_C]: artifact(['app/']),
      [SPEC_D]: artifact(['docs/'])
    });
    await cache.fill(WS, [SPEC_C, SPEC_D]);
    __setScopeCacheForTest(cache);
    vi.spyOn(getWorkerRuntime().runnableCache, 'runnablePeek').mockReturnValue([
      /** @type {any} */ ({
        bead_id: 'UI-9',
        spec_id: SPEC_C,
        plan_path: SPEC_D
      })
    ]);

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_scope['UI-9'].artifacts).toEqual([SPEC_C, SPEC_D]);
  });

  test('never lets a 후보 row overwrite the lane reading of the same bead', async () => {
    seedBead('UI-1', SPEC_A);
    const cache = scopeCacheOver({
      [SPEC_A]: artifact(['server/']),
      [SPEC_C]: artifact(['app/'])
    });
    await cache.fill(WS, [SPEC_A]);
    await cache.fill(WS, [SPEC_C]);
    __setScopeCacheForTest(cache);
    vi.spyOn(getWorkerRuntime().runnableCache, 'runnablePeek').mockReturnValue([
      /** @type {any} */ ({ bead_id: 'UI-1', spec_id: SPEC_C, plan_path: null })
    ]);

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_scope['UI-1']).toEqual({
      scope: ['server/'],
      artifacts: [SPEC_A]
    });
  });

  test('omits a 후보 bead with no spec', () => {
    __setScopeCacheForTest(scopeCacheOver({}));
    vi.spyOn(getWorkerRuntime().runnableCache, 'runnablePeek').mockReturnValue([
      /** @type {any} */ ({ bead_id: 'UI-9', spec_id: '', plan_path: null })
    ]);

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_scope).toEqual({});
  });

  test('keeps the lane readings when the runnable lookup throws', async () => {
    seedBead('UI-1', SPEC_A);
    const cache = scopeCacheOver({ [SPEC_A]: artifact(['server/']) });
    await cache.fill(WS, [SPEC_A]);
    __setScopeCacheForTest(cache);
    vi.spyOn(
      getWorkerRuntime().runnableCache,
      'runnablePeek'
    ).mockImplementation(() => {
      throw new Error('runnable unavailable');
    });

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_scope['UI-1']).toEqual({
      scope: ['server/'],
      artifacts: [SPEC_A]
    });
  });

  test('carries an empty scope as a read fact, not as a failure', async () => {
    seedBead('UI-1', SPEC_A);
    const cache = scopeCacheOver({ [SPEC_A]: '---\ntitle: x\n---\n' });
    await cache.fill(WS, [SPEC_A]);
    __setScopeCacheForTest(cache);

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_scope['UI-1']).toEqual({ scope: [], artifacts: [SPEC_A] });
  });
});
