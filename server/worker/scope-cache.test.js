import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  __resetScopeCacheForTest,
  createScopeCache,
  scopeCache
} from './scope-cache.js';

const WS = '/tmp/example/repo-a';
const SPEC = 'docs/specs/thing.md';
const PLAN = 'docs/plans/thing.md';
const BASE_A = 'a'.repeat(40);
const BASE_B = 'b'.repeat(40);

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
 * A worker analysis context whose `git cat-file` answers from a blob map. A
 * path absent from the map exits non-zero — the unreadable-artifact failure.
 *
 * @param {{ base?: string, blobs?: Record<string, string>, resolved?: boolean }} [options]
 */
function fakeContext(options = {}) {
  /** @type {{ base: string, blobs: Record<string, string>, resolved: boolean }} */
  const state = {
    base: options.base || BASE_A,
    blobs: { ...options.blobs },
    resolved: options.resolved !== false
  };
  const gitRun = vi.fn(async (/** @type {string[]} */ args) => {
    const target = String(args[2] || '');
    const content = state.blobs[target.slice(target.indexOf(':') + 1)];
    return typeof content === 'string'
      ? { code: 0, stdout: content }
      : { code: 128, stdout: '' };
  });
  const resolveBase = vi.fn(async () =>
    state.resolved
      ? /** @type {import('./target-base.js').TargetBaseResult} */ ({
          ok: true,
          base: 'main',
          declared: true,
          remote: 'origin',
          remote_ref: 'refs/remotes/origin/main',
          base_oid: state.base,
          local_only: false
        })
      : /** @type {import('./target-base.js').TargetBaseResult} */ ({
          ok: false,
          step: 'ref',
          base: 'main',
          detail: 'missing'
        })
  );
  return {
    state,
    gitRun,
    resolveBase,
    contextFor: () => ({ repo: WS, resolveBase, gitRun })
  };
}

afterEach(() => {
  __resetScopeCacheForTest();
});

describe('scope cache peek/fill (UI-qm12 §4.1)', () => {
  test('answers miss and schedules one fill for a cold key', async () => {
    const fake = fakeContext({ blobs: { [SPEC]: artifact(['server/']) } });
    const cache = createScopeCache({ contextFor: fake.contextFor });

    const first = cache.peek(WS, [SPEC]);
    const second = cache.peek(WS, [SPEC]);
    await cache.fill(WS, [SPEC]);

    expect([first, second]).toEqual([{ state: 'miss' }, { state: 'miss' }]);
    expect(fake.gitRun).toHaveBeenCalledTimes(1);
  });

  test('notifies onFilled listeners once the fill lands', async () => {
    const fake = fakeContext({ blobs: { [SPEC]: artifact(['server/']) } });
    const cache = createScopeCache({ contextFor: fake.contextFor });
    const filled = vi.fn();
    cache.onFilled(filled);

    cache.peek(WS, [SPEC]);
    await cache.fill(WS, [SPEC]);

    expect(filled).toHaveBeenCalledWith(WS);
  });

  test('answers hit with the union of every artifact after the fill', async () => {
    const fake = fakeContext({
      blobs: {
        [SPEC]: artifact(['server/worker/']),
        [PLAN]: artifact(['app/views/'])
      }
    });
    const cache = createScopeCache({ contextFor: fake.contextFor });

    await cache.fill(WS, [SPEC, PLAN]);

    expect(cache.peek(WS, [SPEC, PLAN])).toEqual({
      state: 'hit',
      scope: ['app/views/', 'server/worker/']
    });
  });

  test('answers hit with an empty scope when the artifacts declare none', async () => {
    const fake = fakeContext({ blobs: { [SPEC]: '---\ntitle: x\n---\n' } });
    const cache = createScopeCache({ contextFor: fake.contextFor });

    await cache.fill(WS, [SPEC]);

    expect(cache.peek(WS, [SPEC])).toEqual({ state: 'hit', scope: [] });
  });

  test('keeps artifact sets of the same workspace independent', async () => {
    const fake = fakeContext({
      blobs: { [SPEC]: artifact(['server/']), [PLAN]: artifact(['app/']) }
    });
    const cache = createScopeCache({ contextFor: fake.contextFor });

    await cache.fill(WS, [SPEC]);

    expect(cache.peek(WS, [SPEC, PLAN])).toEqual({ state: 'miss' });
  });
});

describe('scope cache freshness (UI-qm12 §4.1)', () => {
  test('serves the expired value and refills behind it', async () => {
    let clock = 1000;
    const fake = fakeContext({ blobs: { [SPEC]: artifact(['server/']) } });
    const cache = createScopeCache({
      contextFor: fake.contextFor,
      now: () => clock,
      positive_ttl_ms: 100
    });
    await cache.fill(WS, [SPEC]);

    clock += 500;
    const stale = cache.peek(WS, [SPEC]);
    await cache.fill(WS, [SPEC]);

    expect(stale).toEqual({ state: 'hit', scope: ['server/'] });
  });

  test('skips the artifact read when the refill resolves the same base', async () => {
    let clock = 1000;
    const fake = fakeContext({ blobs: { [SPEC]: artifact(['server/']) } });
    const cache = createScopeCache({
      contextFor: fake.contextFor,
      now: () => clock,
      positive_ttl_ms: 100
    });
    await cache.fill(WS, [SPEC]);

    clock += 500;
    await cache.fill(WS, [SPEC]);

    expect(fake.gitRun).toHaveBeenCalledTimes(1);
  });

  test('re-reads the artifacts when the refill resolves a moved base', async () => {
    let clock = 1000;
    const fake = fakeContext({ blobs: { [SPEC]: artifact(['server/']) } });
    const cache = createScopeCache({
      contextFor: fake.contextFor,
      now: () => clock,
      positive_ttl_ms: 100
    });
    await cache.fill(WS, [SPEC]);

    clock += 500;
    fake.state.base = BASE_B;
    fake.state.blobs[SPEC] = artifact(['app/']);
    await cache.fill(WS, [SPEC]);

    expect(cache.peek(WS, [SPEC])).toEqual({ state: 'hit', scope: ['app/'] });
  });
});

describe('scope cache failures (UI-qm12 §4.1)', () => {
  test('reports failed, not an empty scope, when an artifact is absent at the base', async () => {
    const fake = fakeContext({ blobs: { [SPEC]: artifact(['server/']) } });
    const cache = createScopeCache({ contextFor: fake.contextFor });

    await cache.fill(WS, [SPEC, PLAN]);

    expect(cache.peek(WS, [SPEC, PLAN])).toEqual({ state: 'failed' });
  });

  test('reports failed when the git read errors', async () => {
    const fake = fakeContext();
    const cache = createScopeCache({ contextFor: fake.contextFor });
    fake.gitRun.mockRejectedValue(new Error('git exploded'));

    await cache.fill(WS, [SPEC]);

    expect(cache.peek(WS, [SPEC])).toEqual({ state: 'failed' });
  });

  test('reports failed when the workspace has no analysis context', async () => {
    const cache = createScopeCache({ contextFor: () => null });

    await cache.fill(WS, [SPEC]);

    expect(cache.peek(WS, [SPEC])).toEqual({ state: 'failed' });
  });

  test('reports failed when the base cannot be resolved', async () => {
    const fake = fakeContext({ resolved: false });
    const cache = createScopeCache({ contextFor: fake.contextFor });

    await cache.fill(WS, [SPEC]);

    expect(cache.peek(WS, [SPEC])).toEqual({ state: 'failed' });
    expect(fake.gitRun).not.toHaveBeenCalled();
  });

  test('retries a failed read once its negative window expires', async () => {
    let clock = 1000;
    const fake = fakeContext();
    const cache = createScopeCache({
      contextFor: fake.contextFor,
      now: () => clock,
      negative_ttl_ms: 100
    });
    await cache.fill(WS, [SPEC]);

    clock += 500;
    fake.state.blobs[SPEC] = artifact(['server/']);
    await cache.fill(WS, [SPEC]);

    expect(cache.peek(WS, [SPEC])).toEqual({
      state: 'hit',
      scope: ['server/']
    });
  });
});

describe('scope cache instances (UI-qm12 §4.1)', () => {
  test('keeps a factory instance out of the process singleton', async () => {
    const fake = fakeContext({ blobs: { [SPEC]: artifact(['server/']) } });
    const cache = createScopeCache({ contextFor: fake.contextFor });

    await cache.fill(WS, [SPEC]);

    expect(scopeCache().peek(WS, [SPEC])).toEqual({ state: 'miss' });
  });

  test('returns the same singleton to every caller', () => {
    const first = scopeCache();

    const second = scopeCache();

    expect(second).toBe(first);
  });
});
