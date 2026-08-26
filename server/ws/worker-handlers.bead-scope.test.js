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
 * @param {string} [description]
 */
function seedBead(bead_id, spec_id, description = '') {
  getWorkerRuntime().titleCache.refreshFromIssue(WS, {
    id: bead_id,
    title: `${bead_id} 제목`,
    ...(spec_id.length > 0 ? { spec_id } : {}),
    ...(description.length > 0 ? { description } : {}),
    metadata: { route: spec_id.length > 0 ? 'spec_backed' : 'quick_fix' }
  });
}

/**
 * A description declaring `prefixes` under a `## scope` section.
 *
 * @param {string[]} prefixes
 * @returns {string}
 */
function describedScope(prefixes) {
  return ['빠른 수정', '', '## scope', ...prefixes.map((p) => `- ${p}`)].join(
    '\n'
  );
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

  test('carries the declared scope of the pr_wait bead (UI-anna §3.1)', async () => {
    seedBead('UI-3', SPEC_C);
    const cache = scopeCacheOver({ [SPEC_C]: artifact(['server/']) });
    await cache.fill(WS, [SPEC_C]);
    __setScopeCacheForTest(cache);

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_scope['UI-3']).toEqual({
      scope: ['server/'],
      artifacts: [SPEC_C]
    });
  });

  test('carries the declared scope of a paused running bead', async () => {
    seedBead('UI-5', SPEC_C);
    const cache = scopeCacheOver({ [SPEC_C]: artifact(['server/']) });
    await cache.fill(WS, [SPEC_C]);
    __setScopeCacheForTest(cache);
    const queue = laneQueue();
    /** @type {any} */ (queue).attempts['att-2'] = {
      attempt_id: 'att-2',
      bead_id: 'UI-5',
      status: 'paused'
    };

    const out = /** @type {any} */ (decorateQueue(WS, queue));

    expect(out.bead_scope['UI-5']).toEqual({
      scope: ['server/'],
      artifacts: [SPEC_C]
    });
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
      /** @type {any} */ ({
        bead_id: 'UI-9',
        scope_spec_id: SPEC_C,
        plan_path: null
      })
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
        scope_spec_id: SPEC_C,
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
      /** @type {any} */ ({
        bead_id: 'UI-1',
        scope_spec_id: SPEC_C,
        plan_path: null
      })
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
      /** @type {any} */ ({
        bead_id: 'UI-9',
        scope_spec_id: '',
        plan_path: null
      })
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

describe('decorateQueue bead_scope description fallback (UI-f1qy §4.3)', () => {
  test('reads the description of a lane member with no artifact', () => {
    seedBead('UI-1', '', describedScope(['server/worker/']));
    __setScopeCacheForTest(scopeCacheOver({}));

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_scope['UI-1']).toEqual({
      scope: ['server/worker/'],
      artifacts: []
    });
  });

  test('carries an empty description declaration as a read fact', () => {
    seedBead('UI-1', '', '## scope\n');
    __setScopeCacheForTest(scopeCacheOver({}));

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_scope['UI-1']).toEqual({ scope: [], artifacts: [] });
  });

  test('ignores the description of a bead that has an artifact', async () => {
    seedBead('UI-1', SPEC_A, describedScope(['app/views/']));
    const cache = scopeCacheOver({ [SPEC_A]: artifact(['server/']) });
    await cache.fill(WS, [SPEC_A]);
    __setScopeCacheForTest(cache);

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_scope['UI-1']).toEqual({
      scope: ['server/'],
      artifacts: [SPEC_A]
    });
  });

  test('leaves an artifact-bearing bead unread rather than reading its description', () => {
    seedBead('UI-1', SPEC_A, describedScope(['app/views/']));
    __setScopeCacheForTest(scopeCacheOver({ [SPEC_A]: artifact(['server/']) }));

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_scope).toEqual({});
  });

  test('keeps no entry for a bead that declares nothing anywhere', () => {
    seedBead('UI-1', '', '선언이 없는 설명');
    __setScopeCacheForTest(scopeCacheOver({}));

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_scope).toEqual({});
  });

  test('reads the description of a 후보 row with no artifact', () => {
    __setScopeCacheForTest(scopeCacheOver({}));
    vi.spyOn(getWorkerRuntime().runnableCache, 'runnablePeek').mockReturnValue([
      /** @type {any} */ ({
        bead_id: 'UI-9',
        scope_spec_id: '',
        plan_path: null,
        description_scope: ['app/utils/']
      })
    ]);

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_scope['UI-9']).toEqual({
      scope: ['app/utils/'],
      artifacts: []
    });
  });

  test('prefers the resolved artifact of a 후보 row over its description', async () => {
    const cache = scopeCacheOver({ [SPEC_C]: artifact(['docs/']) });
    await cache.fill(WS, [SPEC_C]);
    __setScopeCacheForTest(cache);
    vi.spyOn(getWorkerRuntime().runnableCache, 'runnablePeek').mockReturnValue([
      /** @type {any} */ ({
        bead_id: 'UI-9',
        spec_id: '',
        scope_spec_id: SPEC_C,
        plan_path: null,
        description_scope: ['app/utils/']
      })
    ]);

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_scope['UI-9']).toEqual({
      scope: ['docs/'],
      artifacts: [SPEC_C]
    });
  });

  test('reads the description of a conflicted bead in either lane', async () => {
    // 원천은 bead마다 하나여야 하므로, native와 metadata의 spec 포인터가
    // 어긋난 bead는 후보에서든 큐 레인에서든 똑같이 아티팩트를 포기하고
    // description으로 읽힌다 (UI-f1qy §4.4의 충돌 규칙).
    getWorkerRuntime().titleCache.refreshFromIssue(WS, {
      id: 'UI-1',
      title: 'UI-1 제목',
      spec_id: SPEC_A,
      description: describedScope(['app/utils/']),
      metadata: { route: 'quick_fix', spec_id: SPEC_B }
    });
    const cache = scopeCacheOver({ [SPEC_A]: artifact(['server/']) });
    await cache.fill(WS, [SPEC_A]);
    __setScopeCacheForTest(cache);
    vi.spyOn(getWorkerRuntime().runnableCache, 'runnablePeek').mockReturnValue([
      /** @type {any} */ ({
        bead_id: 'UI-9',
        scope_spec_id: '',
        plan_path: null,
        description_scope: ['app/utils/']
      })
    ]);

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_scope['UI-1']).toEqual({
      scope: ['app/utils/'],
      artifacts: []
    });
    expect(out.bead_scope['UI-9']).toEqual(out.bead_scope['UI-1']);
  });

  test('keeps no entry for a 후보 row that declares no section', () => {
    __setScopeCacheForTest(scopeCacheOver({}));
    vi.spyOn(getWorkerRuntime().runnableCache, 'runnablePeek').mockReturnValue([
      /** @type {any} */ ({
        bead_id: 'UI-9',
        scope_spec_id: '',
        plan_path: null,
        description_scope: null
      })
    ]);

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_scope).toEqual({});
  });
});

describe('decorateQueue bead_scope 세션 항목 (UI-anna §3.1)', () => {
  test('carries the declared scope of a session-held bead in no lane', async () => {
    const cache = scopeCacheOver({ [SPEC_C]: artifact(['app/utils/']) });
    await cache.fill(WS, [SPEC_C]);
    __setScopeCacheForTest(cache);
    vi.spyOn(
      getWorkerRuntime().runnableCache,
      'sessionActivePeek'
    ).mockReturnValue([
      /** @type {any} */ ({ bead_id: 'UI-8', spec_id: SPEC_C, plan_path: null })
    ]);

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_scope['UI-8']).toEqual({
      scope: ['app/utils/'],
      artifacts: [SPEC_C]
    });
  });

  test('reads a session row from the same artifact set a queued bead would use', async () => {
    const cache = scopeCacheOver({
      [SPEC_C]: artifact(['app/']),
      [SPEC_D]: artifact(['docs/'])
    });
    await cache.fill(WS, [SPEC_C, SPEC_D]);
    __setScopeCacheForTest(cache);
    vi.spyOn(
      getWorkerRuntime().runnableCache,
      'sessionActivePeek'
    ).mockReturnValue([
      /** @type {any} */ ({
        bead_id: 'UI-8',
        spec_id: SPEC_C,
        plan_path: SPEC_D
      })
    ]);

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_scope['UI-8'].artifacts).toEqual([SPEC_C, SPEC_D]);
  });

  test('judges the same bead alike whether a session or the queue holds it', async () => {
    seedBead('UI-8', SPEC_C);
    const cache = scopeCacheOver({ [SPEC_C]: artifact(['app/utils/']) });
    await cache.fill(WS, [SPEC_C]);
    __setScopeCacheForTest(cache);
    vi.spyOn(
      getWorkerRuntime().runnableCache,
      'sessionActivePeek'
    ).mockReturnValue([
      /** @type {any} */ ({ bead_id: 'UI-8', spec_id: SPEC_C, plan_path: null })
    ]);
    const queued = laneQueue();
    /** @type {any} */ (queued).queue.push({ bead_id: 'UI-8', added_at: 2 });

    const as_session = /** @type {any} */ (decorateQueue(WS, laneQueue()));
    const as_queued = /** @type {any} */ (decorateQueue(WS, queued));

    expect(as_session.bead_scope['UI-8']).toEqual(as_queued.bead_scope['UI-8']);
  });

  test('omits a session row that resolves no spec', () => {
    __setScopeCacheForTest(scopeCacheOver({}));
    vi.spyOn(
      getWorkerRuntime().runnableCache,
      'sessionActivePeek'
    ).mockReturnValue([
      /** @type {any} */ ({ bead_id: 'UI-8', spec_id: '', plan_path: null })
    ]);

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_scope).toEqual({});
  });

  test('keeps the lane readings when the session lookup throws', async () => {
    seedBead('UI-1', SPEC_A);
    const cache = scopeCacheOver({ [SPEC_A]: artifact(['server/']) });
    await cache.fill(WS, [SPEC_A]);
    __setScopeCacheForTest(cache);
    vi.spyOn(
      getWorkerRuntime().runnableCache,
      'sessionActivePeek'
    ).mockImplementation(() => {
      throw new Error('session cache unavailable');
    });

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_scope['UI-1']).toEqual({
      scope: ['server/'],
      artifacts: [SPEC_A]
    });
  });

  test('attaches the same scope to the session_active row itself', async () => {
    const cache = scopeCacheOver({ [SPEC_C]: artifact(['app/utils/']) });
    await cache.fill(WS, [SPEC_C]);
    __setScopeCacheForTest(cache);
    vi.spyOn(
      getWorkerRuntime().runnableCache,
      'sessionActivePeek'
    ).mockReturnValue([
      /** @type {any} */ ({ bead_id: 'UI-8', spec_id: SPEC_C, plan_path: null })
    ]);

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.session_active[0].scope).toEqual(out.bead_scope['UI-8'].scope);
  });

  test('leaves scope off a session_active row with no cache hit', () => {
    __setScopeCacheForTest(scopeCacheOver({}));
    vi.spyOn(
      getWorkerRuntime().runnableCache,
      'sessionActivePeek'
    ).mockReturnValue([
      /** @type {any} */ ({ bead_id: 'UI-8', spec_id: SPEC_C, plan_path: null })
    ]);

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(Object.hasOwn(out.session_active[0], 'scope')).toBe(false);
  });
});

describe('decorateQueue bead_blocked_by 실행중 레인 (UI-anna §3.2)', () => {
  /**
   * Seed a bead whose only fact is one open `blocks` predecessor.
   *
   * @param {string} bead_id
   * @param {string} blocker_id
   */
  function seedBlocked(bead_id, blocker_id) {
    getWorkerRuntime().titleCache.refreshFromIssue(WS, {
      id: bead_id,
      title: `${bead_id} 제목`,
      dependencies: [{ id: blocker_id, dependency_type: 'blocks' }]
    });
  }

  test('carries the blockers of a running bead that holds no queue entry', () => {
    seedBlocked('UI-2', 'UI-7');

    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(out.bead_blocked_by['UI-2']).toEqual(['UI-7']);
  });

  test('carries the blockers of a bead whose only attempt is paused', () => {
    seedBlocked('UI-5', 'UI-7');
    const queue = laneQueue();
    /** @type {any} */ (queue).attempts['att-2'] = {
      attempt_id: 'att-2',
      bead_id: 'UI-5',
      status: 'paused'
    };

    const out = /** @type {any} */ (decorateQueue(WS, queue));

    expect(out.bead_blocked_by['UI-5']).toEqual(['UI-7']);
  });

  test('leaves out a bead whose record has not been read', () => {
    const out = /** @type {any} */ (decorateQueue(WS, laneQueue()));

    expect(Object.hasOwn(out.bead_blocked_by, 'UI-2')).toBe(false);
  });
});
