import { describe, expect, test, vi } from 'vitest';
import { observeBaseDrift } from './base-drift.js';

const PINNED = 'a'.repeat(40);
const MOVED = 'b'.repeat(40);
const C1 = 'c'.repeat(40);
const C2 = 'd'.repeat(40);
const OTHER = 'e'.repeat(40);

/**
 * A `git` runner stub keyed by the rev-list RANGE argument, so a case declares
 * only the two walks it cares about.
 *
 * @param {Record<string, { code?: number, stdout?: string }>} by_range
 */
function makeGit(by_range) {
  return vi.fn(async (/** @type {string[]} */ args) => {
    const range = args[1];
    const hit = by_range[range];
    if (!hit) {
      return { code: 128, stdout: '', stderr: `no stub for ${range}` };
    }
    return { code: hit.code ?? 0, stdout: hit.stdout ?? '', stderr: '' };
  });
}

/**
 * The `{ force: true }` base seam `pr-actions.js` uses, resolved to `tip`.
 *
 * @param {string} tip
 */
function makeResolveBase(tip) {
  return vi.fn(async () => ({
    ok: /** @type {const} */ (true),
    base: 'main',
    declared: false,
    remote: 'origin',
    remote_ref: 'refs/remotes/origin/main',
    base_oid: tip,
    local_only: false
  }));
}

/**
 * @param {{ state: string, data?: unknown, reason?: string }} result
 */
function makeGh(result) {
  return { mergedPrForBranch: vi.fn(async () => result) };
}

/**
 * @param {Partial<Record<string, unknown>>} [over]
 */
function makeAttemptRecord(over = {}) {
  return {
    attempt_id: 'att-1',
    bead_id: 'UI-1',
    repo: '/repo',
    base_oid: PINNED,
    disposition: null,
    ...over
  };
}

describe('worker/base-drift — observeBaseDrift', () => {
  test('records nothing when the remote base never moved', async () => {
    const git = makeGit({});

    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(PINNED),
      git,
      gh: makeGh({ state: 'empty' })
    });

    expect(r).toEqual({ violation: false, record: null });
    expect(git).not.toHaveBeenCalled();
  });

  test('records an observation without a violation when someone else moved the base', async () => {
    const gh = makeGh({ state: 'empty' });

    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git: makeGit({
        [`${PINNED}..refs/heads/UI-1`]: { stdout: `${C1}\n${C2}\n` },
        [`${PINNED}..${MOVED}`]: { stdout: `${OTHER}\n` }
      }),
      gh
    });

    expect(r).toEqual({
      violation: false,
      record: { pinned: PINNED, observed: MOVED, landed: false }
    });
    // No intersection ⇒ nothing to exclude, so the PR is never queried.
    expect(gh.mergedPrForBranch).not.toHaveBeenCalled();
  });

  test('reports a violation when attempt commits landed on base with no merged PR', async () => {
    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git: makeGit({
        [`${PINNED}..refs/heads/UI-1`]: { stdout: `${C2}\n${C1}\n` },
        [`${PINNED}..${MOVED}`]: { stdout: `${OTHER}\n${C1}\n` }
      }),
      gh: makeGh({ state: 'empty' })
    });

    expect(r).toEqual({
      violation: true,
      record: {
        pinned: PINNED,
        observed: MOVED,
        landed: true,
        via: 'direct_push',
        shas: [C1]
      }
    });
  });

  test('excludes a landing whose PR is MERGED', async () => {
    const gh = makeGh({ state: 'ok', data: { number: 7, state: 'MERGED' } });

    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git: makeGit({
        [`${PINNED}..refs/heads/UI-1`]: { stdout: `${C1}\n` },
        [`${PINNED}..${MOVED}`]: { stdout: `${C1}\n${OTHER}\n` }
      }),
      gh
    });

    expect(r).toEqual({
      violation: false,
      record: {
        pinned: PINNED,
        observed: MOVED,
        landed: true,
        via: 'pr_merge',
        shas: [C1]
      }
    });
    expect(gh.mergedPrForBranch).toHaveBeenCalledWith('/repo', 'UI-1');
  });

  test('excludes a human fast-forward push of the attempt branch onto base', async () => {
    // The ff case: base tip IS the branch tip, so every attempt commit is in
    // both walks. GitHub marks the PR merged, which is the same exclusion.
    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(C2),
      git: makeGit({
        [`${PINNED}..refs/heads/UI-1`]: { stdout: `${C2}\n${C1}\n` },
        [`${PINNED}..${C2}`]: { stdout: `${C2}\n${C1}\n` }
      }),
      gh: makeGh({ state: 'ok', data: { number: 7, state: 'MERGED' } })
    });

    expect(r).toEqual({
      violation: false,
      record: {
        pinned: PINNED,
        observed: C2,
        landed: true,
        via: 'pr_merge',
        shas: [C2, C1]
      }
    });
  });

  test('misses a base push made from outside the attempt branch (documented limit)', async () => {
    const gh = makeGh({ state: 'empty' });

    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git: makeGit({
        // The session committed on main/detached HEAD: the branch holds nothing.
        [`${PINNED}..refs/heads/UI-1`]: { stdout: '' },
        [`${PINNED}..${MOVED}`]: { stdout: `${C1}\n` }
      }),
      gh
    });

    expect(r).toEqual({
      violation: false,
      record: { pinned: PINNED, observed: MOVED, landed: false }
    });
    expect(gh.mergedPrForBranch).not.toHaveBeenCalled();
  });

  test('records a base re-resolution failure without a violation', async () => {
    const git = makeGit({});

    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: async () => ({
        ok: /** @type {const} */ (false),
        step: /** @type {const} */ ('fetch'),
        base: 'main',
        detail: 'network'
      }),
      git,
      gh: makeGh({ state: 'empty' })
    });

    expect(r).toEqual({
      violation: false,
      record: { pinned: PINNED, error: 'base_resolve:fetch' }
    });
    expect(git).not.toHaveBeenCalled();
  });

  test('records a rev-list failure without a violation', async () => {
    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git: makeGit({
        [`${PINNED}..refs/heads/UI-1`]: { code: 128 },
        [`${PINNED}..${MOVED}`]: { stdout: `${C1}\n` }
      }),
      gh: makeGh({ state: 'empty' })
    });

    expect(r).toEqual({
      violation: false,
      record: { pinned: PINNED, observed: MOVED, error: 'rev_list_branch' }
    });
  });

  test('records a PR observation failure without a violation', async () => {
    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git: makeGit({
        [`${PINNED}..refs/heads/UI-1`]: { stdout: `${C1}\n` },
        [`${PINNED}..${MOVED}`]: { stdout: `${C1}\n` }
      }),
      gh: makeGh({ state: 'error', reason: 'gh_failed' })
    });

    expect(r).toEqual({
      violation: false,
      record: {
        pinned: PINNED,
        observed: MOVED,
        shas: [C1],
        error: 'pr_observe:gh_failed'
      }
    });
  });

  test('records the exclusion of a disposition attempt', async () => {
    const resolveBase = makeResolveBase(MOVED);

    const r = await observeBaseDrift({
      attempt: makeAttemptRecord({ disposition: 'revise_fix' }),
      resolveBase,
      git: makeGit({}),
      gh: makeGh({ state: 'empty' })
    });

    expect(r).toEqual({ violation: false, record: { skipped: 'disposition' } });
    expect(resolveBase).not.toHaveBeenCalled();
  });

  test('records the exclusion of an attempt dispatched without a pinned base', async () => {
    const resolveBase = makeResolveBase(MOVED);

    const r = await observeBaseDrift({
      attempt: makeAttemptRecord({ base_oid: null }),
      resolveBase,
      git: makeGit({}),
      gh: makeGh({ state: 'empty' })
    });

    expect(r).toEqual({ violation: false, record: { skipped: 'no_base_oid' } });
    expect(resolveBase).not.toHaveBeenCalled();
  });

  test('re-resolves the base with force so the memo cannot hide a moved tip', async () => {
    const resolveBase = makeResolveBase(PINNED);

    await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase,
      git: makeGit({}),
      gh: makeGh({ state: 'empty' })
    });

    expect(resolveBase).toHaveBeenCalledWith({ force: true });
  });

  test('records an unobservable attempt instead of judging it', async () => {
    const r = await observeBaseDrift({
      attempt: makeAttemptRecord({ repo: null }),
      resolveBase: makeResolveBase(MOVED),
      git: makeGit({}),
      gh: makeGh({ state: 'empty' })
    });

    expect(r).toEqual({
      violation: false,
      record: { pinned: PINNED, error: 'no_repo' }
    });
  });

  test('records missing observation deps instead of judging the attempt', async () => {
    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: undefined,
      git: undefined,
      gh: undefined
    });

    expect(r).toEqual({
      violation: false,
      record: { pinned: PINNED, error: 'no_observer_deps' }
    });
  });

  test('records a throwing rev-list as an observation failure', async () => {
    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git: async () => {
        throw new Error('spawn failed');
      },
      gh: makeGh({ state: 'empty' })
    });

    expect(r).toEqual({
      violation: false,
      record: { pinned: PINNED, observed: MOVED, error: 'rev_list_branch' }
    });
  });
});
