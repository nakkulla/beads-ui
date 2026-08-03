import { describe, expect, test, vi } from 'vitest';
import { observeBaseDrift } from './base-drift.js';

const PINNED = 'a'.repeat(40);
const MOVED = 'b'.repeat(40);
const C1 = 'c'.repeat(40);
const C2 = 'd'.repeat(40);
const OTHER = 'e'.repeat(40);
const HEAD = 'f'.repeat(40);
const BRANCH_OLD = '1'.repeat(40);

const BRANCH_REF = 'refs/heads/UI-1';
const BASE_REF = 'refs/remotes/origin/main';
const REFLOG_ARGS = ['--date=unix', '--format=%H %gd'];

// Default acquisition times: the branch gets the shared commit BEFORE the base,
// which is the posture that excludes nothing.
const BASE_T = 200;
const BRANCH_T = 100;

/**
 * The two-entry reflog a ref carries by default: its current tip, then the
 * anchor (`pinned`) that stops the walk.
 *
 * @param {string} tip
 * @param {number} t
 * @returns {[string, number][]}
 */
function defaultEntries(tip, t) {
  return [
    [tip, t],
    [PINNED, 0]
  ];
}

/**
 * The observed tip a case declared, read off its base walk range — the only
 * `<pinned>..<sha>` key it has, since the branch walk is keyed by ref.
 *
 * @param {Record<string, unknown>} by_range
 */
function defaultBaseTip(by_range) {
  const found = Object.keys(by_range)
    .map((range) => range.slice(PINNED.length + 2))
    .find((tail) => /^[0-9a-f]{40}$/.test(tail));
  return found ?? MOVED;
}

/**
 * A `git` runner stub answering all four commands the observation spends:
 * the containment probe (`rev-parse` + `merge-base --is-ancestor`), the two
 * `rev-list` walks keyed by RANGE so a case declares only the walks it cares
 * about, and the precedence stage's `reflog show`.
 *
 * The containment defaults describe the NOT-contained posture — a branch head
 * distinct from the observed tip, and `--is-ancestor` answering "no" (exit 1) —
 * so a case that says nothing about containment reaches the walk.
 *
 * The reflog defaults describe the BRANCH-FIRST posture, so a case that says
 * nothing about precedence excludes nothing and keeps the verdict it was
 * written for. Their `rev-list` answers reuse the walk stubs: the anchor range
 * is empty, the branch tip aliases to the `refs/heads/UI-1` range, and the base
 * tip is read off the only non-ref range the case declared.
 *
 * @param {Record<string, { code?: number, stdout?: string }>} by_range
 * @param {{ head?: string, head_code?: number, is_ancestor?: number, base_tip?: string, reflog?: Record<string, [string, number][]>, reflog_code?: Record<string, number> }} [posture]
 */
function makeGit(by_range, posture = {}) {
  const head = posture.head ?? HEAD;
  const head_code = posture.head_code ?? 0;
  const is_ancestor = posture.is_ancestor ?? 1;
  const base_tip = posture.base_tip ?? defaultBaseTip(by_range);
  const reflog = posture.reflog ?? {};
  const reflog_code = posture.reflog_code ?? {};
  return vi.fn(async (/** @type {string[]} */ args) => {
    if (args[0] === 'rev-parse') {
      return { code: head_code, stdout: `${head}\n`, stderr: '' };
    }
    if (args[0] === 'merge-base') {
      return { code: is_ancestor, stdout: '', stderr: '' };
    }
    if (args[0] === 'reflog') {
      const ref = args[2];
      const code = reflog_code[ref] ?? 0;
      if (code !== 0) {
        return { code, stdout: '', stderr: `no reflog for ${ref}` };
      }
      const entries =
        reflog[ref] ??
        (ref === BRANCH_REF
          ? defaultEntries(head, BRANCH_T)
          : defaultEntries(base_tip, BASE_T));
      return {
        code: 0,
        stdout: entries.map(([sha, t]) => `${sha} ${ref}@{${t}}\n`).join(''),
        stderr: ''
      };
    }
    const range = args[1];
    if (range === `${PINNED}..${PINNED}`) {
      return { code: 0, stdout: '', stderr: '' };
    }
    const hit =
      by_range[range] ??
      (range === `${PINNED}..${head}`
        ? by_range[`${PINNED}..${BRANCH_REF}`]
        : undefined);
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
 * @param {Partial<{ base: string, remote: string|null, remote_ref: string|null, local_only: boolean }>} [over]
 */
function makeResolveBase(tip, over = {}) {
  return vi.fn(async () => ({
    ok: /** @type {const} */ (true),
    base: 'main',
    declared: false,
    remote: 'origin',
    remote_ref: 'refs/remotes/origin/main',
    base_oid: tip,
    local_only: false,
    ...over
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
        shas: [C1],
        inherited: []
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
        shas: [C1],
        inherited: []
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
        shas: [C2, C1],
        inherited: []
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
        inherited: [],
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
        shas: [C1],
        inherited: []
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
        shas: [C1, C2],
        inherited: []
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
        shas: [C2],
        inherited: []
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
        inherited: [],
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
        inherited: [],
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
        inherited: [],
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

  test('excludes a shared commit the base acquired before the branch', async () => {
    // UI-nprg 실측 재현: a spec commit went straight to base (no PR can ever
    // exist for it), the attempt rebased onto it, and the base then moved
    // again — so the containment posture had expired too.
    const gh = makeGh({ state: 'empty' });

    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git: makeGit(
        {
          [`${PINNED}..${BRANCH_REF}`]: { stdout: `${C1}\n${OTHER}\n` },
          [`${PINNED}..${MOVED}`]: { stdout: `${OTHER}\n` }
        },
        {
          reflog: {
            [BASE_REF]: defaultEntries(MOVED, 10),
            [BRANCH_REF]: defaultEntries(HEAD, 20)
          }
        }
      ),
      gh
    });

    expect(r).toEqual({
      violation: false,
      record: {
        pinned: PINNED,
        observed: MOVED,
        landed: false,
        inherited: [OTHER]
      }
    });
    // Nothing is left to explain, so no `gh` call is spent.
    expect(gh.mergedPrForBranch).not.toHaveBeenCalled();
  });

  test('keeps the violation when the branch acquired the shared commit first', async () => {
    const git = makeGit({
      [`${PINNED}..${BRANCH_REF}`]: { stdout: `${C1}\n` },
      [`${PINNED}..${MOVED}`]: { stdout: `${C1}\n` }
    });
    const gh = makeGh({ state: 'empty' });

    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git,
      gh
    });

    expect(r).toEqual({
      violation: true,
      record: {
        pinned: PINNED,
        observed: MOVED,
        landed: true,
        via: 'direct_push',
        shas: [C1],
        inherited: []
      }
    });
    // The verdict alone cannot show the stage ran, so the command path is the
    // assertion: both refs are dated, and the PR provenance still follows.
    expect(git).toHaveBeenCalledWith(
      ['reflog', 'show', BASE_REF, ...REFLOG_ARGS],
      { cwd: '/repo' }
    );
    expect(git).toHaveBeenCalledWith(
      ['reflog', 'show', BRANCH_REF, ...REFLOG_ARGS],
      { cwd: '/repo' }
    );
    expect(gh.mergedPrsForCommit).toHaveBeenCalledWith('/repo', C1, 'main');
  });

  test('keeps the violation for a rebase-rewritten commit pushed to base', async () => {
    // A rewritten SHA is born on the branch at rebase time and reaches the base
    // only by the later push, so the branch is still the source.
    const git = makeGit(
      {
        [`${PINNED}..${BRANCH_REF}`]: { stdout: `${C1}\n` },
        [`${PINNED}..${MOVED}`]: { stdout: `${C1}\n` }
      },
      {
        reflog: {
          [BASE_REF]: defaultEntries(MOVED, 900),
          [BRANCH_REF]: defaultEntries(HEAD, 500)
        }
      }
    );

    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git,
      gh: makeGh({ state: 'empty' })
    });

    expect(r).toEqual({
      violation: true,
      record: {
        pinned: PINNED,
        observed: MOVED,
        landed: true,
        via: 'direct_push',
        shas: [C1],
        inherited: []
      }
    });
    expect(git).toHaveBeenCalledWith(
      ['reflog', 'show', BRANCH_REF, ...REFLOG_ARGS],
      { cwd: '/repo' }
    );
  });

  test('declines to exclude a shared commit both refs acquired in the same second', async () => {
    // Reflog resolution is one second, so a commit pushed to base in the very
    // second it was made reads as a tie. Excluding a tie would let the defeat
    // push this guard exists for slip through.
    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git: makeGit(
        {
          [`${PINNED}..${BRANCH_REF}`]: { stdout: `${C1}\n` },
          [`${PINNED}..${MOVED}`]: { stdout: `${C1}\n` }
        },
        {
          reflog: {
            [BASE_REF]: defaultEntries(MOVED, 50),
            [BRANCH_REF]: defaultEntries(HEAD, 50)
          }
        }
      ),
      gh: makeGh({ state: 'empty' })
    });

    expect(r).toEqual({
      violation: true,
      record: {
        pinned: PINNED,
        observed: MOVED,
        landed: true,
        via: 'direct_push',
        shas: [C1],
        inherited: []
      }
    });
  });

  test('excludes only the base-first commit and judges the rest', async () => {
    const gh = makeGh({ state: 'empty' });

    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git: makeGit(
        {
          [`${PINNED}..${BRANCH_REF}`]: { stdout: `${C1}\n${C2}\n` },
          [`${PINNED}..${MOVED}`]: { stdout: `${C1}\n${C2}\n` },
          [`${PINNED}..${OTHER}`]: { stdout: `${C1}\n` }
        },
        {
          reflog: {
            // An older base entry already held C1, so C1's acquisition is the
            // older time while C2 only appears at the tip.
            [BASE_REF]: [
              [MOVED, 200],
              [OTHER, 50],
              [PINNED, 0]
            ],
            [BRANCH_REF]: defaultEntries(HEAD, 100)
          }
        }
      ),
      gh
    });

    expect(r).toEqual({
      violation: true,
      record: {
        pinned: PINNED,
        observed: MOVED,
        landed: true,
        via: 'direct_push',
        shas: [C2],
        inherited: [C1]
      }
    });
    expect(gh.mergedPrsForCommit).toHaveBeenCalledTimes(1);
    expect(gh.mergedPrsForCommit).toHaveBeenCalledWith('/repo', C2, 'main');
  });

  test('ends the observation when the base reflog cannot be read', async () => {
    const gh = makeGh({ state: 'empty' });

    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git: makeGit(
        {
          [`${PINNED}..${BRANCH_REF}`]: { stdout: `${C1}\n` },
          [`${PINNED}..${MOVED}`]: { stdout: `${C1}\n` }
        },
        { reflog_code: { [BASE_REF]: 128 } }
      ),
      gh
    });

    expect(r).toEqual({
      violation: false,
      record: {
        pinned: PINNED,
        observed: MOVED,
        shas: [C1],
        error: 'precedence_observe:reflog'
      }
    });
    // An unfinished stage is an end, not a fallback into the PR path.
    expect(gh.mergedPrForBranch).not.toHaveBeenCalled();
  });

  test('ends the observation when the branch reflog cannot be read', async () => {
    const gh = makeGh({ state: 'empty' });

    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git: makeGit(
        {
          [`${PINNED}..${BRANCH_REF}`]: { stdout: `${C1}\n` },
          [`${PINNED}..${MOVED}`]: { stdout: `${C1}\n` }
        },
        { reflog_code: { [BRANCH_REF]: 128 } }
      ),
      gh
    });

    expect(r).toEqual({
      violation: false,
      record: {
        pinned: PINNED,
        observed: MOVED,
        shas: [C1],
        error: 'precedence_observe:reflog'
      }
    });
    expect(gh.mergedPrForBranch).not.toHaveBeenCalled();
  });

  test('ends the observation when a reflog entry cannot be walked', async () => {
    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git: makeGit(
        {
          [`${PINNED}..${BRANCH_REF}`]: { stdout: `${C1}\n` },
          [`${PINNED}..${MOVED}`]: { stdout: `${C1}\n` }
        },
        // The tip entry's walk has no stub, so `rev-list` fails on it.
        { reflog: { [BASE_REF]: defaultEntries(OTHER, 200) } }
      ),
      gh: makeGh({ state: 'empty' })
    });

    expect(r).toEqual({
      violation: false,
      record: {
        pinned: PINNED,
        observed: MOVED,
        shas: [C1],
        error: 'precedence_observe:rev_list'
      }
    });
  });

  test('ends the observation when the reflog runs out before the anchor', async () => {
    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git: makeGit(
        {
          [`${PINNED}..${BRANCH_REF}`]: { stdout: `${C1}\n` },
          [`${PINNED}..${MOVED}`]: { stdout: `${C1}\n` },
          [`${PINNED}..${OTHER}`]: { stdout: `${C1}\n` }
        },
        {
          reflog: {
            [BASE_REF]: [
              [MOVED, 200],
              [OTHER, 100]
            ]
          }
        }
      ),
      gh: makeGh({ state: 'empty' })
    });

    expect(r).toEqual({
      violation: false,
      record: {
        pinned: PINNED,
        observed: MOVED,
        shas: [C1],
        error: 'precedence_observe:no_anchor'
      }
    });
  });

  test('ends the observation at the reflog cap instead of keeping a partial result', async () => {
    /** @type {[string, number][]} */
    const entries = Array.from({ length: 201 }, (_unused, i) => [
      String(i).padStart(40, '0'),
      1000 - i
    ]);
    /** @type {Record<string, { code?: number, stdout?: string }>} */
    const by_range = {
      [`${PINNED}..${BRANCH_REF}`]: { stdout: `${C1}\n` },
      [`${PINNED}..${MOVED}`]: { stdout: `${C1}\n` }
    };
    for (const [sha] of entries) {
      by_range[`${PINNED}..${sha}`] = { stdout: `${C1}\n` };
    }
    const git = makeGit(by_range, { reflog: { [BASE_REF]: entries } });

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
        shas: [C1],
        error: 'precedence_observe:no_anchor'
      }
    });
    // The two intersection walks plus REFLOG_CAP entry walks and no more.
    expect(
      git.mock.calls.filter(
        (call) => /** @type {string[]} */ (call[0])[0] === 'rev-list'
      ).length
    ).toBe(202);
  });

  test('stops at the anchor entry instead of walking the whole reflog', async () => {
    const git = makeGit(
      {
        [`${PINNED}..${BRANCH_REF}`]: { stdout: `${C1}\n` },
        [`${PINNED}..${MOVED}`]: { stdout: `${C1}\n` }
      },
      {
        reflog: {
          [BASE_REF]: [
            [MOVED, 200],
            [PINNED, 0],
            [OTHER, 50]
          ]
        }
      }
    );

    await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git,
      gh: makeGh({ state: 'empty' })
    });

    // Everything below the anchor predates the pin and cannot hold a shared
    // commit, so it is never walked.
    expect(git).not.toHaveBeenCalledWith(['rev-list', `${PINNED}..${OTHER}`], {
      cwd: '/repo'
    });
    expect(
      git.mock.calls.filter(
        (call) => /** @type {string[]} */ (call[0])[0] === 'rev-list'
      ).length
    ).toBe(6);
  });

  test('keeps walking past a reflog entry that does not hold the shared commit', async () => {
    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git: makeGit(
        {
          [`${PINNED}..${BRANCH_REF}`]: { stdout: `${C1}\n` },
          [`${PINNED}..${MOVED}`]: { stdout: `${C1}\n` },
          [`${PINNED}..${OTHER}`]: { stdout: `${C2}\n` },
          [`${PINNED}..${BRANCH_OLD}`]: { stdout: `${C1}\n` }
        },
        {
          reflog: {
            [BASE_REF]: defaultEntries(MOVED, 150),
            // The commit left the branch and came back. Stopping at that gap
            // would date the branch at 300 and read the base as first, which
            // would swallow a real violation.
            [BRANCH_REF]: [
              [HEAD, 300],
              [OTHER, 200],
              [BRANCH_OLD, 100],
              [PINNED, 0]
            ]
          }
        }
      ),
      gh: makeGh({ state: 'empty' })
    });

    expect(r).toEqual({
      violation: true,
      record: {
        pinned: PINNED,
        observed: MOVED,
        landed: true,
        via: 'direct_push',
        shas: [C1],
        inherited: []
      }
    });
  });

  test('ends the observation when a shared commit has no recorded acquisition', async () => {
    // The base reflog reached its anchor without ever holding C1: the walk
    // finished but the answer is missing, which is not the same as innocence.
    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git: makeGit(
        {
          [`${PINNED}..${BRANCH_REF}`]: { stdout: `${C1}\n` },
          [`${PINNED}..${MOVED}`]: { stdout: `${C1}\n` },
          [`${PINNED}..${OTHER}`]: { stdout: `${C2}\n` }
        },
        { reflog: { [BASE_REF]: defaultEntries(OTHER, 200) } }
      ),
      gh: makeGh({ state: 'empty' })
    });

    expect(r).toEqual({
      violation: false,
      record: {
        pinned: PINNED,
        observed: MOVED,
        shas: [C1],
        error: 'precedence_observe:reflog'
      }
    });
  });

  test('keeps the violation when the branch was reset to the pin between acquisitions', async () => {
    // The branch made C1, pushed it to base, was reset back onto the pin, then
    // took C1 back off the rebase. That reset entry is an ANCHOR by graph but
    // not by time: stopping there dates the branch at 40 and reads the base
    // (20) as first, excluding a violation that really happened.
    const r = await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED),
      git: makeGit(
        {
          [`${PINNED}..${BRANCH_REF}`]: { stdout: `${C1}\n` },
          [`${PINNED}..${MOVED}`]: { stdout: `${C1}\n` },
          [`${PINNED}..${BRANCH_OLD}`]: { stdout: `${C1}\n` }
        },
        {
          reflog: {
            [BASE_REF]: defaultEntries(MOVED, 20),
            [BRANCH_REF]: [
              [HEAD, 40],
              [PINNED, 30],
              [BRANCH_OLD, 10],
              [PINNED, 0]
            ]
          }
        }
      ),
      gh: makeGh({ state: 'empty' })
    });

    expect(r).toEqual({
      violation: true,
      record: {
        pinned: PINNED,
        observed: MOVED,
        landed: true,
        via: 'direct_push',
        shas: [C1],
        inherited: []
      }
    });
  });

  test('reads the local base ref when the repo has no remote', async () => {
    const git = makeGit({
      [`${PINNED}..${BRANCH_REF}`]: { stdout: `${C1}\n` },
      [`${PINNED}..${MOVED}`]: { stdout: `${C1}\n` }
    });

    await observeBaseDrift({
      attempt: makeAttemptRecord(),
      resolveBase: makeResolveBase(MOVED, {
        remote: null,
        remote_ref: null,
        local_only: true
      }),
      git,
      gh: makeGh({ state: 'empty' })
    });

    expect(git).toHaveBeenCalledWith(
      ['reflog', 'show', 'refs/heads/main', ...REFLOG_ARGS],
      { cwd: '/repo' }
    );
  });
});
