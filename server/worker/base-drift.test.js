import { describe, expect, test, vi } from 'vitest';
import { observeBaseDrift } from './base-drift.js';

const PINNED = 'a'.repeat(40);
const MOVED = 'b'.repeat(40);
const C1 = 'c'.repeat(40);
const C2 = 'd'.repeat(40);
const OTHER = 'e'.repeat(40);
const HEAD = 'f'.repeat(40);

/**
 * A `git` runner stub answering all three commands the observation spends:
 * the containment probe (`rev-parse` + `merge-base --is-ancestor`) and the two
 * `rev-list` walks, the latter keyed by RANGE so a case declares only the walks
 * it cares about.
 *
 * The containment defaults describe the NOT-contained posture — a branch head
 * distinct from the observed tip, and `--is-ancestor` answering "no" (exit 1) —
 * so a case that says nothing about containment reaches the walk.
 *
 * @param {Record<string, { code?: number, stdout?: string }>} by_range
 * @param {{ head?: string, head_code?: number, is_ancestor?: number }} [posture]
 */
function makeGit(by_range, posture = {}) {
  const head = posture.head ?? HEAD;
  const head_code = posture.head_code ?? 0;
  const is_ancestor = posture.is_ancestor ?? 1;
  return vi.fn(async (/** @type {string[]} */ args) => {
    if (args[0] === 'rev-parse') {
      return { code: head_code, stdout: `${head}\n`, stderr: '' };
    }
    if (args[0] === 'merge-base') {
      return { code: is_ancestor, stdout: '', stderr: '' };
    }
    const range = args[1];
    const hit = by_range[range];
    if (!hit) {
      return { code: 128, stdout: '', stderr: `no stub for ${range}` };
    }
    return { code: hit.code ?? 0, stdout: hit.stdout ?? '', stderr: '' };
  });
}

/**
 * Whether the stub was asked to run one git subcommand.
 *
 * @param {{ mock: { calls: unknown[][] } }} git
 * @param {string} subcommand
 */
function ranGit(git, subcommand) {
  return git.mock.calls.some(
    (call) => /** @type {string[]} */ (call[0])[0] === subcommand
  );
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
 * The PR adapter seam: the branch-level exclusion plus the per-SHA provenance
 * query. The per-SHA default is `empty` — "this commit is explained by no
 * merged PR" — because that is the only answer that lets a landing still be
 * called a violation.
 *
 * @param {{ state: string, data?: unknown, reason?: string }} result
 * @param {(sha: string) => { state: string, data?: unknown, reason?: string }} [per_sha]
 */
function makeGh(result, per_sha = () => ({ state: 'empty' })) {
  return {
    mergedPrForBranch: vi.fn(async () => result),
    mergedPrsForCommit: vi.fn(
      async (/** @type {string} */ _repo_dir, /** @type {string} */ sha) =>
        per_sha(sha)
    )
  };
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
      git: makeGit(
        {
          [`${PINNED}..refs/heads/UI-1`]: { stdout: `${C2}\n${C1}\n` },
          [`${PINNED}..${C2}`]: { stdout: `${C2}\n${C1}\n` }
        },
        // base tip IS the branch tip, so the strict containment probe declines
        // to exclude and the walk still runs.
        { head: C2 }
      ),
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

  test('excludes an attempt whose branch contains the observed base (rebase posture)', async () => {
    // UI-53es 실측 재현: the base moved by another unit's merge and the attempt
    // rebased onto it, so that foreign commit is an ancestor of the branch and
    // lands in the walk. The branch sitting ON TOP of the observed tip is what
    // says "inherited", not "pushed".
    const git = makeGit(
      {
        [`${PINNED}..refs/heads/UI-1`]: { stdout: `${C1}\n${OTHER}\n` },
        [`${PINNED}..${MOVED}`]: { stdout: `${OTHER}\n` }
      },
      { head: HEAD, is_ancestor: 0 }
    );
    const gh = makeGh({ state: 'empty' });

    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git,
      gh
    });

    expect(r).toEqual({
      violation: false,
      record: {
        pinned: PINNED,
        observed: MOVED,
        excluded: 'branch_contains_observed'
      }
    });
    // The exclusion runs BEFORE the walk, so no intersection is computed and
    // the record carries no `landed`/`shas`.
    expect(ranGit(git, 'rev-list')).toBe(false);
    expect(gh.mergedPrForBranch).not.toHaveBeenCalled();
  });

  test('keeps a landing whose observed tip IS the branch head out of the containment exclusion', async () => {
    // The miss boundary: an attempt that pushed its own tip to base has the
    // branch containing observed too, and only `observed != head` separates it
    // from the rebase posture above.
    const git = makeGit(
      {
        [`${PINNED}..refs/heads/UI-1`]: { stdout: `${C1}\n` },
        [`${PINNED}..${C1}`]: { stdout: `${C1}\n` }
      },
      { head: C1, is_ancestor: 0 }
    );

    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(C1),
      git,
      gh: makeGh({ state: 'empty' })
    });

    expect(r).toEqual({
      violation: true,
      record: {
        pinned: PINNED,
        observed: C1,
        landed: true,
        via: 'direct_push',
        shas: [C1]
      }
    });
    expect(git).toHaveBeenCalledWith(['rev-parse', 'refs/heads/UI-1'], {
      cwd: '/repo'
    });
    // Short-circuited by the strict condition: the ancestry question is not
    // even asked, so an `--is-ancestor` that would answer "yes" cannot exclude.
    expect(ranGit(git, 'merge-base')).toBe(false);
  });

  test('treats an is-ancestor exit 1 as a negative answer and walks on', async () => {
    const git = makeGit(
      {
        [`${PINNED}..refs/heads/UI-1`]: { stdout: `${C1}\n` },
        [`${PINNED}..${MOVED}`]: { stdout: `${OTHER}\n` }
      },
      { is_ancestor: 1 }
    );

    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git,
      gh: makeGh({ state: 'empty' })
    });

    expect(r).toEqual({
      violation: false,
      record: { pinned: PINNED, observed: MOVED, landed: false }
    });
    expect(git).toHaveBeenCalledWith(
      ['merge-base', '--is-ancestor', MOVED, 'refs/heads/UI-1'],
      { cwd: '/repo' }
    );
    expect(ranGit(git, 'rev-list')).toBe(true);
  });

  test('records an is-ancestor failure exit as an observation failure', async () => {
    const git = makeGit(
      {
        [`${PINNED}..refs/heads/UI-1`]: { stdout: `${C1}\n` },
        [`${PINNED}..${MOVED}`]: { stdout: `${C1}\n` }
      },
      { is_ancestor: 128 }
    );

    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git,
      gh: makeGh({ state: 'empty' })
    });

    expect(r).toEqual({
      violation: false,
      record: {
        pinned: PINNED,
        observed: MOVED,
        error: 'containment:merge_base'
      }
    });
    expect(ranGit(git, 'rev-list')).toBe(false);
  });

  test('records a failed branch head lookup as an observation failure', async () => {
    const git = makeGit(
      { [`${PINNED}..refs/heads/UI-1`]: { stdout: `${C1}\n` } },
      { head_code: 128 }
    );

    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git,
      gh: makeGh({ state: 'empty' })
    });

    expect(r).toEqual({
      violation: false,
      record: {
        pinned: PINNED,
        observed: MOVED,
        error: 'containment:rev_parse'
      }
    });
  });

  test('excludes a landing whose every commit belongs to another merged PR', async () => {
    const gh = makeGh({ state: 'empty' }, () => ({
      state: 'ok',
      data: { number: 81, base_ref: 'main' }
    }));

    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git: makeGit({
        [`${PINNED}..refs/heads/UI-1`]: { stdout: `${C1}\n${C2}\n` },
        [`${PINNED}..${MOVED}`]: { stdout: `${C1}\n${C2}\n${OTHER}\n` }
      }),
      gh
    });

    expect(r).toEqual({
      violation: false,
      record: {
        pinned: PINNED,
        observed: MOVED,
        landed: true,
        via: 'other_pr_merge',
        shas: [C1, C2]
      }
    });
    expect(gh.mergedPrsForCommit).toHaveBeenCalledWith('/repo', C1, 'main');
    expect(gh.mergedPrsForCommit).toHaveBeenCalledWith('/repo', C2, 'main');
  });

  test('reports a violation on the commits no merged PR explains', async () => {
    const gh = makeGh({ state: 'empty' }, (sha) =>
      sha === C1 ? { state: 'ok', data: { number: 81 } } : { state: 'empty' }
    );

    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git: makeGit({
        [`${PINNED}..refs/heads/UI-1`]: { stdout: `${C1}\n${C2}\n` },
        [`${PINNED}..${MOVED}`]: { stdout: `${C1}\n${C2}\n` }
      }),
      gh
    });

    expect(r).toEqual({
      violation: true,
      record: {
        pinned: PINNED,
        observed: MOVED,
        landed: true,
        via: 'direct_push',
        // Only the unexplained SHA: the evidence a violation stands on must not
        // include a commit another PR already accounts for.
        shas: [C2]
      }
    });
  });

  test('records a per-SHA provenance failure without a violation', async () => {
    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git: makeGit({
        [`${PINNED}..refs/heads/UI-1`]: { stdout: `${C1}\n` },
        [`${PINNED}..${MOVED}`]: { stdout: `${C1}\n` }
      }),
      gh: makeGh({ state: 'empty' }, () => ({
        state: 'error',
        reason: 'gh_failed'
      }))
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

  test('refuses to query provenance for an intersection over the cap', async () => {
    const many = Array.from({ length: 21 }, (_unused, i) =>
      String(i).padStart(40, '0')
    );
    const gh = makeGh({ state: 'empty' });

    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git: makeGit({
        [`${PINNED}..refs/heads/UI-1`]: { stdout: `${many.join('\n')}\n` },
        [`${PINNED}..${MOVED}`]: { stdout: `${many.join('\n')}\n` }
      }),
      gh
    });

    expect(r).toEqual({
      violation: false,
      record: {
        pinned: PINNED,
        observed: MOVED,
        shas: many,
        error: 'pr_observe:sha_cap'
      }
    });
    // An observation left undone is not evidence of guilt.
    expect(gh.mergedPrsForCommit).not.toHaveBeenCalled();
  });

  test('records a missing per-SHA provenance seam instead of judging the attempt', async () => {
    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git: makeGit({
        [`${PINNED}..refs/heads/UI-1`]: { stdout: `${C1}\n` },
        [`${PINNED}..${MOVED}`]: { stdout: `${C1}\n` }
      }),
      gh: { mergedPrForBranch: vi.fn(async () => ({ state: 'empty' })) }
    });

    expect(r).toEqual({
      violation: false,
      record: {
        pinned: PINNED,
        observed: MOVED,
        shas: [C1],
        error: 'pr_observe:no_gh'
      }
    });
  });

  test('records a throwing rev-list as an observation failure', async () => {
    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git: async (/** @type {string[]} */ args) => {
        if (args[0] === 'rev-list') {
          throw new Error('spawn failed');
        }
        return {
          code: args[0] === 'merge-base' ? 1 : 0,
          stdout: HEAD,
          stderr: ''
        };
      },
      gh: makeGh({ state: 'empty' })
    });

    expect(r).toEqual({
      violation: false,
      record: { pinned: PINNED, observed: MOVED, error: 'rev_list_branch' }
    });
  });
});
