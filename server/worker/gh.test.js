import { describe, expect, test, vi } from 'vitest';
import { createGh } from './gh.js';

const PR = {
  number: 7,
  url: 'https://github.com/o/r/pull/7',
  headRefName: 'UI-1',
  headRefOid: 'a'.repeat(40),
  baseRefName: 'main',
  state: 'OPEN'
};

/**
 * @param {{ code?: number, stdout?: string, stderr?: string }} [result]
 */
function makeRun(result = {}) {
  return vi.fn(async () => ({
    code: result.code ?? 0,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? ''
  }));
}

/**
 * A `git` runner stub whose origin push url resolves to `o/r`.
 *
 * @param {string} [url]
 */
function makeGitRun(url = 'git@github.com:o/r.git') {
  return vi.fn(async () => ({ code: 0, stdout: `${url}\n`, stderr: '' }));
}

/**
 * The adapter with BOTH runners stubbed. Every PR operation resolves `--repo`
 * from origin first, so a gh-only stub would reach the real `git` binary.
 *
 * @param {(args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>} run
 * @param {(args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>} [git_run]
 */
function makeGh(run, git_run = makeGitRun()) {
  return createGh({ run, git_run });
}

describe('worker/gh — openPrForBranch', () => {
  test('returns ok with the first PR normalized', async () => {
    const run = makeRun({ stdout: JSON.stringify([PR]) });

    const r = await makeGh(run).openPrForBranch('/repo', 'UI-1');

    expect(r).toEqual({
      state: 'ok',
      data: {
        number: 7,
        url: PR.url,
        head_ref: 'UI-1',
        base_ref: 'main',
        head_sha: PR.headRefOid,
        state: 'OPEN'
      }
    });
  });

  test('queries the open PR for the head branch in the repo dir', async () => {
    const run = makeRun({ stdout: '[]' });

    await makeGh(run).openPrForBranch('/repo', 'UI-1');

    expect(run).toHaveBeenCalledWith(
      [
        'pr',
        'list',
        '--head',
        'UI-1',
        '--state',
        'open',
        '--json',
        'number,url,headRefName,headRefOid,baseRefName,state',
        '--repo',
        'o/r'
      ],
      { cwd: '/repo' }
    );
  });

  test('returns empty for a successful query with no open PR', async () => {
    const run = makeRun({ stdout: '[]' });

    const r = await makeGh(run).openPrForBranch('/repo', 'UI-1');

    expect(r).toEqual({ state: 'empty' });
  });

  test('returns error (not empty) on a non-zero exit', async () => {
    const run = makeRun({ code: 1, stderr: 'boom' });

    const r = await makeGh(run).openPrForBranch('/repo', 'UI-1');

    expect(r).toEqual({ state: 'error', reason: 'gh_failed' });
  });

  test('reports a missing gh binary distinctly', async () => {
    const run = makeRun({ code: 127 });

    const r = await makeGh(run).openPrForBranch('/repo', 'UI-1');

    expect(r).toEqual({ state: 'error', reason: 'gh_missing' });
  });

  test('returns error (not empty) on unparseable output', async () => {
    const run = makeRun({ stdout: 'not json' });

    const r = await makeGh(run).openPrForBranch('/repo', 'UI-1');

    expect(r).toEqual({ state: 'error', reason: 'gh_bad_json' });
  });

  test('returns error when the observed PR carries no url', async () => {
    const run = makeRun({ stdout: JSON.stringify([{ number: 7 }]) });

    const r = await makeGh(run).openPrForBranch('/repo', 'UI-1');

    expect(r).toEqual({ state: 'error', reason: 'gh_bad_json' });
  });

  test('returns error when the runner throws', async () => {
    const run = vi.fn(async () => {
      throw new Error('spawn failed');
    });

    const r = await makeGh(run).openPrForBranch('/repo', 'UI-1');

    expect(r).toEqual({ state: 'error', reason: 'gh_spawn_failed' });
  });
});

describe('worker/gh — mergedPrForBranch', () => {
  test('queries the MERGED PR for the head branch in the repo dir', async () => {
    const run = makeRun({ stdout: '[]' });

    await makeGh(run).mergedPrForBranch('/repo', 'UI-1');

    expect(run).toHaveBeenCalledWith(
      [
        'pr',
        'list',
        '--head',
        'UI-1',
        '--state',
        'merged',
        '--json',
        'number,url,headRefName,headRefOid,baseRefName,state',
        '--repo',
        'o/r'
      ],
      { cwd: '/repo' }
    );
  });

  test('returns ok with the merged PR normalized', async () => {
    const run = makeRun({
      stdout: JSON.stringify([{ ...PR, state: 'MERGED' }])
    });

    const r = await makeGh(run).mergedPrForBranch('/repo', 'UI-1');

    expect(r).toEqual({
      state: 'ok',
      data: {
        number: 7,
        url: PR.url,
        head_ref: 'UI-1',
        base_ref: 'main',
        head_sha: PR.headRefOid,
        state: 'MERGED'
      }
    });
  });

  test('returns empty when no PR for the branch was ever merged', async () => {
    const run = makeRun({ stdout: '[]' });

    const r = await makeGh(run).mergedPrForBranch('/repo', 'UI-1');

    expect(r).toEqual({ state: 'empty' });
  });

  test('returns error (not empty) on a non-zero exit', async () => {
    const run = makeRun({ code: 1, stderr: 'boom' });

    const r = await makeGh(run).mergedPrForBranch('/repo', 'UI-1');

    expect(r).toEqual({ state: 'error', reason: 'gh_failed' });
  });

  test('returns error (not empty) on unparseable output', async () => {
    const run = makeRun({ stdout: 'not json' });

    const r = await makeGh(run).mergedPrForBranch('/repo', 'UI-1');

    expect(r).toEqual({ state: 'error', reason: 'gh_bad_json' });
  });

  test('returns error when origin cannot be resolved', async () => {
    const run = makeRun({ stdout: '[]' });
    const git_run = vi.fn(async () => ({ code: 1, stdout: '', stderr: '' }));

    const r = await createGh({ run, git_run }).mergedPrForBranch(
      '/repo',
      'UI-1'
    );

    expect(r).toEqual({ state: 'error', reason: 'origin_unresolvable' });
  });

  test('returns error when the runner throws', async () => {
    const run = vi.fn(async () => {
      throw new Error('spawn failed');
    });

    const r = await makeGh(run).mergedPrForBranch('/repo', 'UI-1');

    expect(r).toEqual({ state: 'error', reason: 'gh_spawn_failed' });
  });
});

describe('worker/gh — merged revert evidence', () => {
  test('reads immutable source evidence for a merged PR', async () => {
    const merge = 'c'.repeat(40);
    const base = 'd'.repeat(40);
    const head = 'e'.repeat(40);
    const run = makeRun({
      stdout: JSON.stringify({
        number: 7,
        url: PR.url,
        state: 'MERGED',
        baseRefName: 'main',
        baseRefOid: base,
        headRefName: 'UI-1',
        headRefOid: head,
        mergeCommit: { oid: merge },
        commits: [{ oid: head }],
        files: [{ path: 'file.js' }]
      })
    });

    const result = await makeGh(run).revertSource('/repo', 7);

    expect(result).toEqual({
      state: 'ok',
      data: {
        number: 7,
        url: PR.url,
        base_ref: 'main',
        base_sha: base,
        head_ref: 'UI-1',
        head_sha: head,
        merge_sha: merge,
        commits: [{ oid: head }],
        files: [{ path: 'file.js' }]
      }
    });
  });

  test('finds an existing exact revert PR before creating another', async () => {
    const run = makeRun({
      stdout: JSON.stringify([
        { ...PR, headRefName: 'revert-UI-1-op', state: 'OPEN' }
      ])
    });

    const result = await makeGh(run).createRevertPr('/repo', {
      base: 'main',
      head: 'revert-UI-1-op',
      head_sha: PR.headRefOid,
      title: 'Revert UI-1',
      body: 'human merge only'
    });

    expect(result).toMatchObject({ state: 'ok', data: { url: PR.url } });
    expect(run).toHaveBeenCalledTimes(1);
  });

  test('refuses an existing revert branch PR whose head sha drifted', async () => {
    const run = makeRun({
      stdout: JSON.stringify([
        {
          ...PR,
          headRefName: 'revert-UI-1-op',
          headRefOid: 'f'.repeat(40),
          state: 'OPEN'
        }
      ])
    });

    const result = await makeGh(run).createRevertPr('/repo', {
      base: 'main',
      head: 'revert-UI-1-op',
      head_sha: PR.headRefOid,
      title: 'Revert UI-1',
      body: 'human merge only'
    });

    expect(result).toEqual({
      state: 'error',
      reason: 'revert_pr_identity_changed'
    });
    expect(run).toHaveBeenCalledTimes(1);
  });

  test('creates a revert PR without an auto-merge option and confirms it is open', async () => {
    const responses = [
      { code: 0, stdout: '[]', stderr: '' },
      { code: 0, stdout: '', stderr: '' },
      {
        code: 0,
        stdout: JSON.stringify([
          { ...PR, headRefName: 'revert-UI-1-op', state: 'OPEN' }
        ]),
        stderr: ''
      }
    ];
    /** @type {string[][]} */
    const calls = [];
    const run = vi.fn(async (args) => {
      calls.push(args);
      const response = responses.shift();
      if (!response) {
        throw new Error('unexpected gh invocation');
      }
      return response;
    });

    const result = await makeGh(run).createRevertPr('/repo', {
      base: 'main',
      head: 'revert-UI-1-op',
      head_sha: PR.headRefOid,
      title: 'Revert UI-1',
      body: 'human merge only'
    });

    expect(result).toMatchObject({ state: 'ok', data: { url: PR.url } });
    expect(calls.at(1) || []).not.toContain('--auto');
    expect(calls.at(1) || []).not.toContain('--merge');
  });
});

describe('worker/gh — mergedPrsForCommit', () => {
  const SHA = 'c'.repeat(40);

  /**
   * One item of the `repos/{slug}/commits/{sha}/pulls` REST payload. The REST
   * shape has no `MERGED` state — `merged_at` is the only merge signal.
   *
   * @param {Partial<Record<string, unknown>>} [over]
   */
  function commitPr(over = {}) {
    return {
      number: 81,
      html_url: 'https://github.com/o/r/pull/81',
      state: 'closed',
      merged_at: '2026-08-03T02:56:25Z',
      base: { ref: 'main' },
      ...over
    };
  }

  test('queries the origin slug commit-pulls endpoint with pagination', async () => {
    const run = makeRun({ stdout: '[]' });

    await makeGh(run).mergedPrsForCommit('/repo', SHA, 'main');

    expect(run).toHaveBeenCalledWith(
      ['api', '--paginate', `repos/o/r/commits/${SHA}/pulls`],
      { cwd: '/repo' }
    );
  });

  test('returns ok with the merged PR that targeted the base', async () => {
    const run = makeRun({ stdout: JSON.stringify([commitPr()]) });

    const r = await makeGh(run).mergedPrsForCommit('/repo', SHA, 'main');

    expect(r).toEqual({
      state: 'ok',
      data: {
        number: 81,
        url: 'https://github.com/o/r/pull/81',
        base_ref: 'main',
        merged_at: '2026-08-03T02:56:25Z'
      }
    });
  });

  test('returns empty when the commit only has an open PR', async () => {
    const run = makeRun({
      stdout: JSON.stringify([commitPr({ merged_at: null, state: 'open' })])
    });

    const r = await makeGh(run).mergedPrsForCommit('/repo', SHA, 'main');

    expect(r).toEqual({ state: 'empty' });
  });

  test('returns empty when the merged PR targeted another base', async () => {
    const run = makeRun({
      stdout: JSON.stringify([commitPr({ base: { ref: 'release' } })])
    });

    const r = await makeGh(run).mergedPrsForCommit('/repo', SHA, 'main');

    expect(r).toEqual({ state: 'empty' });
  });

  test('finds a match on a later page of the flattened pagination', async () => {
    const run = makeRun({
      stdout: JSON.stringify([
        commitPr({ number: 79, merged_at: null }),
        commitPr({ number: 81 })
      ])
    });

    const r = await makeGh(run).mergedPrsForCommit('/repo', SHA, 'main');

    expect(r).toEqual({
      state: 'ok',
      data: {
        number: 81,
        url: 'https://github.com/o/r/pull/81',
        base_ref: 'main',
        merged_at: '2026-08-03T02:56:25Z'
      }
    });
  });

  test('returns error (not empty) on a malformed payload', async () => {
    const run = makeRun({ stdout: JSON.stringify([{ number: 81 }]) });

    const r = await makeGh(run).mergedPrsForCommit('/repo', SHA, 'main');

    expect(r).toEqual({ state: 'error', reason: 'gh_bad_json' });
  });

  test('returns error (not empty) on a blank merged_at', async () => {
    // Blank is not "unmerged" — the API writes null for that — so reading it as
    // a non-match would hand `empty` back, and `empty` permits a violation.
    const run = makeRun({
      stdout: JSON.stringify([commitPr({ merged_at: '' })])
    });

    const r = await makeGh(run).mergedPrsForCommit('/repo', SHA, 'main');

    expect(r).toEqual({ state: 'error', reason: 'gh_bad_json' });
  });

  test('returns error (not empty) on a blank base ref', async () => {
    const run = makeRun({
      stdout: JSON.stringify([commitPr({ base: { ref: '' } })])
    });

    const r = await makeGh(run).mergedPrsForCommit('/repo', SHA, 'main');

    expect(r).toEqual({ state: 'error', reason: 'gh_bad_json' });
  });

  test('returns error when a LATER item is malformed even though an earlier one matched', async () => {
    // The whole payload is validated before any item is judged: a match found
    // before an unreadable item must not answer for a payload we cannot read.
    const run = makeRun({
      stdout: JSON.stringify([commitPr(), { number: 82 }])
    });

    const r = await makeGh(run).mergedPrsForCommit('/repo', SHA, 'main');

    expect(r).toEqual({ state: 'error', reason: 'gh_bad_json' });
  });

  test('returns error (not empty) when the payload is not an array', async () => {
    const run = makeRun({ stdout: JSON.stringify({ message: 'Not Found' }) });

    const r = await makeGh(run).mergedPrsForCommit('/repo', SHA, 'main');

    expect(r).toEqual({ state: 'error', reason: 'gh_bad_json' });
  });

  test('returns error when origin cannot be resolved', async () => {
    const run = makeRun({ stdout: '[]' });
    const git_run = vi.fn(async () => ({ code: 1, stdout: '', stderr: '' }));

    const r = await createGh({ run, git_run }).mergedPrsForCommit(
      '/repo',
      SHA,
      'main'
    );

    expect(r).toEqual({ state: 'error', reason: 'origin_unresolvable' });
    expect(run).not.toHaveBeenCalled();
  });

  test('returns error when the target base is missing', async () => {
    const run = makeRun({ stdout: '[]' });

    const r = await makeGh(run).mergedPrsForCommit('/repo', SHA, '');

    expect(r).toEqual({ state: 'error', reason: 'target_base_required' });
    expect(run).not.toHaveBeenCalled();
  });
});

describe('worker/gh — checkAvailability', () => {
  test('returns ok when gh auth status exits zero', async () => {
    const run = makeRun();

    const r = await createGh({ run }).checkAvailability();

    expect(r).toEqual({ state: 'ok', data: true });
    expect(run).toHaveBeenCalledWith(['auth', 'status'], {});
  });

  test('returns error when gh is unauthenticated', async () => {
    const run = makeRun({ code: 1 });

    const r = await createGh({ run }).checkAvailability();

    expect(r).toEqual({ state: 'error', reason: 'gh_failed' });
  });

  test('reuses a fresh successful probe instead of spawning again', async () => {
    const run = makeRun();
    let clock = 1000;
    const gh = createGh({ run, now: () => clock });

    await gh.checkAvailability();
    clock += 59_000;
    await gh.checkAvailability();

    expect(run).toHaveBeenCalledTimes(1);
  });

  test('re-probes after the success TTL so a revoked token is noticed', async () => {
    let code = 0;
    const run = vi.fn(async () => ({ code, stdout: '', stderr: '' }));
    let clock = 1000;
    const gh = createGh({ run, now: () => clock });

    await gh.checkAvailability();
    clock += 60_000;
    code = 1;
    const r = await gh.checkAvailability();

    expect(run).toHaveBeenCalledTimes(2);
    expect(r).toEqual({ state: 'error', reason: 'gh_failed' });
  });

  test('does not re-probe within 30s of a failure', async () => {
    const run = makeRun({ code: 1 });
    let clock = 1000;
    const gh = createGh({ run, now: () => clock });

    await gh.checkAvailability();
    clock += 29_000;
    const r = await gh.checkAvailability();

    expect(run).toHaveBeenCalledTimes(1);
    expect(r).toEqual({ state: 'error', reason: 'gh_failed' });
  });

  test('re-probes after 30s and recovers once gh becomes usable', async () => {
    let code = 1;
    const run = vi.fn(async () => ({ code, stdout: '', stderr: '' }));
    let clock = 1000;
    const gh = createGh({ run, now: () => clock });

    await gh.checkAvailability();
    clock += 30_000;
    code = 0;
    const r = await gh.checkAvailability();

    expect(run).toHaveBeenCalledTimes(2);
    expect(r).toEqual({ state: 'ok', data: true });
  });
});

describe('worker/gh — prDetail (worker-phase2 §4)', () => {
  const DETAIL = {
    number: 304,
    url: 'https://github.com/o/r/pull/304',
    state: 'OPEN',
    mergeable: 'MERGEABLE',
    mergeStateStatus: 'CLEAN',
    headRefName: 'UI-1',
    headRefOid: 'b'.repeat(40),
    baseRefName: 'main',
    mergeCommit: null
  };

  test('returns ok with the PR detail normalized', async () => {
    const run = makeRun({ stdout: JSON.stringify(DETAIL) });

    const r = await makeGh(run).prDetail('/repo', 304);

    expect(r).toEqual({
      state: 'ok',
      data: {
        number: 304,
        url: DETAIL.url,
        state: 'OPEN',
        mergeable: 'MERGEABLE',
        merge_state_status: 'CLEAN',
        head_ref: 'UI-1',
        base_ref: 'main',
        head_sha: DETAIL.headRefOid,
        merged_sha: null
      }
    });
  });

  test('queries gh pr view for the number in the repo dir', async () => {
    const run = makeRun({ stdout: JSON.stringify(DETAIL) });

    await makeGh(run).prDetail('/repo', 304);

    expect(run).toHaveBeenCalledWith(
      [
        'pr',
        'view',
        '304',
        '--json',
        'number,url,state,mergeable,mergeStateStatus,headRefName,headRefOid,baseRefName,mergeCommit',
        '--repo',
        'o/r'
      ],
      { cwd: '/repo' }
    );
  });

  test('passes an UNKNOWN mergeable through verbatim', async () => {
    const run = makeRun({
      stdout: JSON.stringify({
        ...DETAIL,
        mergeable: 'UNKNOWN',
        mergeStateStatus: 'UNKNOWN'
      })
    });

    const r = await makeGh(run).prDetail('/repo', 304);

    expect(r).toMatchObject({ state: 'ok', data: { mergeable: 'UNKNOWN' } });
  });

  test('reports a MERGED PR as ok with its state', async () => {
    const merge_sha = 'c'.repeat(40);
    const run = makeRun({
      stdout: JSON.stringify({
        ...DETAIL,
        state: 'MERGED',
        mergeCommit: { oid: merge_sha }
      })
    });

    const r = await makeGh(run).prDetail('/repo', 304);

    expect(r).toMatchObject({
      state: 'ok',
      data: { state: 'MERGED', merged_sha: merge_sha }
    });
  });

  test('fails closed when a MERGED PR has no merge commit SHA', async () => {
    const run = makeRun({
      stdout: JSON.stringify({ ...DETAIL, state: 'MERGED' })
    });

    const r = await makeGh(run).prDetail('/repo', 304);

    expect(r).toEqual({ state: 'error', reason: 'gh_bad_json' });
  });

  test('returns error when the PR cannot be resolved', async () => {
    const run = makeRun({ code: 1, stderr: 'Could not resolve' });

    const r = await makeGh(run).prDetail('/repo', 999999);

    expect(r).toEqual({ state: 'error', reason: 'gh_failed' });
  });

  test('returns error on a payload without a state', async () => {
    const run = makeRun({ stdout: JSON.stringify({ url: DETAIL.url }) });

    const r = await makeGh(run).prDetail('/repo', 304);

    expect(r).toEqual({ state: 'error', reason: 'gh_bad_json' });
  });

  test('returns error (never ok with an empty sha) when headRefOid is missing', async () => {
    const without_oid = { ...DETAIL };
    delete (/** @type {any} */ (without_oid).headRefOid);
    const run = makeRun({ stdout: JSON.stringify(without_oid) });

    const r = await makeGh(run).prDetail('/repo', 304);

    // Every gate verdict binds to this sha and the merge pins itself to it, so
    // an observation without one is not a successful observation.
    expect(r).toEqual({ state: 'error', reason: 'gh_bad_json' });
  });

  test('returns error on an empty headRefOid', async () => {
    const run = makeRun({
      stdout: JSON.stringify({ ...DETAIL, headRefOid: '' })
    });

    const r = await makeGh(run).prDetail('/repo', 304);

    expect(r).toEqual({ state: 'error', reason: 'gh_bad_json' });
  });
});

describe('worker/gh — prChecks 3-state (worker-phase2 §5)', () => {
  test('returns ok with normalized check conclusions', async () => {
    const run = makeRun({
      stdout: JSON.stringify({
        statusCheckRollup: [
          {
            __typename: 'CheckRun',
            name: 'build',
            status: 'COMPLETED',
            conclusion: 'SUCCESS'
          },
          {
            __typename: 'CheckRun',
            name: 'lint',
            status: 'IN_PROGRESS',
            conclusion: null
          }
        ]
      })
    });

    const r = await makeGh(run).prChecks('/repo', 304);

    expect(r).toEqual({
      state: 'ok',
      data: [
        { name: 'build', conclusion: 'pass' },
        { name: 'lint', conclusion: 'pending' }
      ]
    });
  });

  test('queries the status-check rollup, not gh pr checks', async () => {
    const run = makeRun({ stdout: JSON.stringify({ statusCheckRollup: [] }) });

    await makeGh(run).prChecks('/repo', 304);

    expect(run).toHaveBeenCalledWith(
      ['pr', 'view', '304', '--json', 'statusCheckRollup', '--repo', 'o/r'],
      { cwd: '/repo' }
    );
  });

  test('returns empty for a SUCCESSFUL query on a repo with no checks', async () => {
    const run = makeRun({ stdout: JSON.stringify({ statusCheckRollup: [] }) });

    const r = await makeGh(run).prChecks('/repo', 304);

    expect(r).toEqual({ state: 'empty' });
  });

  test('returns error (never empty) when the query itself fails', async () => {
    const run = makeRun({ code: 1, stderr: 'GraphQL: Could not resolve' });

    const r = await makeGh(run).prChecks('/repo', 999999);

    expect(r).toEqual({ state: 'error', reason: 'gh_failed' });
  });

  test('returns error (never empty) when the rollup key is absent', async () => {
    const run = makeRun({ stdout: JSON.stringify({ number: 304 }) });

    const r = await makeGh(run).prChecks('/repo', 304);

    expect(r).toEqual({ state: 'error', reason: 'gh_bad_json' });
  });

  test('maps a failed check run to fail', async () => {
    const run = makeRun({
      stdout: JSON.stringify({
        statusCheckRollup: [
          { name: 'test', status: 'COMPLETED', conclusion: 'FAILURE' }
        ]
      })
    });

    const r = await makeGh(run).prChecks('/repo', 304);

    expect(r).toEqual({
      state: 'ok',
      data: [{ name: 'test', conclusion: 'fail' }]
    });
  });

  test('maps a legacy StatusContext by its state field', async () => {
    const run = makeRun({
      stdout: JSON.stringify({
        statusCheckRollup: [
          {
            __typename: 'StatusContext',
            context: 'ci/legacy',
            state: 'PENDING'
          }
        ]
      })
    });

    const r = await makeGh(run).prChecks('/repo', 304);

    expect(r).toEqual({
      state: 'ok',
      data: [{ name: 'ci/legacy', conclusion: 'pending' }]
    });
  });

  test('returns error on an unclassifiable rollup item', async () => {
    const run = makeRun({
      stdout: JSON.stringify({ statusCheckRollup: [{ name: 'mystery' }] })
    });

    const r = await makeGh(run).prChecks('/repo', 304);

    expect(r).toEqual({ state: 'error', reason: 'gh_bad_json' });
  });
});

describe('worker/gh — write operations (worker-phase2 §6)', () => {
  test('squash-merges without deleting the branch', async () => {
    const run = makeRun();

    const r = await makeGh(run).mergeSquash('/repo', 304, 'a'.repeat(40));

    expect(r).toEqual({ state: 'ok', data: true });
    // Branch removal is a LATER cleanup step, so the merge must not fold it in.
    expect(/** @type {any} */ (run).mock.calls[0][0]).not.toContain(
      '--delete-branch'
    );
  });

  test('pins the merge to the head sha the gate approved', async () => {
    const run = makeRun();

    await makeGh(run).mergeSquash('/repo', 304, 'a'.repeat(40));

    expect(run).toHaveBeenCalledWith(
      [
        'pr',
        'merge',
        '304',
        '--squash',
        '--match-head-commit',
        'a'.repeat(40),
        '--repo',
        'o/r'
      ],
      { cwd: '/repo' }
    );
  });

  test('refuses to merge unpinned when no head sha is given', async () => {
    const run = makeRun();

    const r = await makeGh(run).mergeSquash(
      '/repo',
      304,
      /** @type {any} */ (undefined)
    );

    expect(r).toEqual({ state: 'error', reason: 'head_sha_required' });
    // Nothing was spawned: an unpinned merge is refused, not attempted.
    expect(run).not.toHaveBeenCalled();
  });

  test('refuses to merge unpinned on an empty head sha', async () => {
    const run = makeRun();

    const r = await makeGh(run).mergeSquash('/repo', 304, '');

    expect(r).toEqual({ state: 'error', reason: 'head_sha_required' });
    expect(run).not.toHaveBeenCalled();
  });

  test('reports a refused merge as an error, never as a merge', async () => {
    const run = makeRun({ code: 1, stderr: 'not mergeable' });

    const r = await makeGh(run).mergeSquash('/repo', 304, 'a'.repeat(40));

    expect(r).toEqual({ state: 'error', reason: 'gh_failed' });
  });

  test('updates the branch from its base', async () => {
    const run = makeRun();

    const r = await makeGh(run).updateBranch('/repo', 304);

    expect(r).toEqual({ state: 'ok', data: true });
    expect(run).toHaveBeenCalledWith(
      ['pr', 'update-branch', '304', '--repo', 'o/r'],
      { cwd: '/repo' }
    );
  });

  test('closes a pull request without merging it', async () => {
    const run = makeRun();

    const r = await makeGh(run).closePr('/repo', 304);

    expect(r).toEqual({ state: 'ok', data: true });
    expect(run).toHaveBeenCalledWith(['pr', 'close', '304', '--repo', 'o/r'], {
      cwd: '/repo'
    });
  });

  test('reports a spawn failure on the write path too', async () => {
    const run = vi.fn(async () => {
      throw new Error('ENOENT');
    });

    const r = await makeGh(run).mergeSquash('/repo', 304, 'a'.repeat(40));

    expect(r).toEqual({ state: 'error', reason: 'gh_spawn_failed' });
  });
});

describe('worker/gh — explicit --repo from origin', () => {
  /**
   * Every PR operation, invoked once with the arguments it needs.
   *
   * @param {ReturnType<typeof createGh>} gh
   * @param {string} repo_dir
   */
  async function callEveryPrOperation(gh, repo_dir) {
    await gh.openPrForBranch(repo_dir, 'UI-1');
    await gh.prDetail(repo_dir, 304);
    await gh.prChecks(repo_dir, 304);
    await gh.mergeSquash(repo_dir, 304, 'a'.repeat(40));
    await gh.updateBranch(repo_dir, 304);
    await gh.closePr(repo_dir, 304);
  }

  test('passes --repo to every PR operation', async () => {
    const run = makeRun();

    await callEveryPrOperation(makeGh(run), '/repo');

    const calls = /** @type {any} */ (run).mock.calls;
    expect(calls).toHaveLength(6);
    for (const [args] of calls) {
      expect(args.slice(-2)).toEqual(['--repo', 'o/r']);
    }
  });

  test('leaves checkAvailability repo-agnostic', async () => {
    const run = makeRun();
    const git_run = makeGitRun();

    await makeGh(run, git_run).checkAvailability();

    expect(run).toHaveBeenCalledWith(['auth', 'status'], {});
    expect(git_run).not.toHaveBeenCalled();
  });

  test('resolves a scp-like origin url', async () => {
    const run = makeRun();

    const gh = makeGh(run, makeGitRun('git@github.com:nakkulla/beads-ui.git'));

    await gh.closePr('/repo', 304);

    expect(run).toHaveBeenCalledWith(
      ['pr', 'close', '304', '--repo', 'nakkulla/beads-ui'],
      { cwd: '/repo' }
    );
  });

  test('resolves an ssh:// origin url', async () => {
    const run = makeRun();

    await makeGh(
      run,
      makeGitRun('ssh://git@github.com/nakkulla/beads-ui.git')
    ).closePr('/repo', 304);

    expect(run).toHaveBeenCalledWith(
      ['pr', 'close', '304', '--repo', 'nakkulla/beads-ui'],
      { cwd: '/repo' }
    );
  });

  test('resolves an https origin url', async () => {
    const run = makeRun();

    await makeGh(
      run,
      makeGitRun('https://github.com/nakkulla/beads-ui')
    ).closePr('/repo', 304);

    expect(run).toHaveBeenCalledWith(
      ['pr', 'close', '304', '--repo', 'nakkulla/beads-ui'],
      { cwd: '/repo' }
    );
  });

  test('keeps the host prefix for a non-github.com origin', async () => {
    const run = makeRun();

    await makeGh(run, makeGitRun('git@ghe.example.com:org/tool.git')).closePr(
      '/repo',
      304
    );

    expect(run).toHaveBeenCalledWith(
      ['pr', 'close', '304', '--repo', 'ghe.example.com/org/tool'],
      { cwd: '/repo' }
    );
  });

  test('returns origin_unresolvable when the repo has no origin', async () => {
    const run = makeRun();
    const git_run = vi.fn(async () => ({
      code: 1,
      stdout: '',
      stderr: 'error: No such remote'
    }));

    const r = await makeGh(run, git_run).openPrForBranch('/repo', 'UI-1');

    expect(r).toEqual({ state: 'error', reason: 'origin_unresolvable' });
    // No silent fallback: an argv without --repo is what queried the upstream.
    expect(run).not.toHaveBeenCalled();
  });

  test('returns origin_unresolvable on an unparseable origin url', async () => {
    const run = makeRun();

    const r = await makeGh(run, makeGitRun('not a url')).prDetail('/repo', 304);

    expect(r).toEqual({ state: 'error', reason: 'origin_unresolvable' });
  });

  test('returns origin_unresolvable when the git runner throws', async () => {
    const run = makeRun();
    const git_run = vi.fn(async () => {
      throw new Error('ENOENT');
    });

    const r = await makeGh(run, git_run).mergeSquash(
      '/repo',
      304,
      'a'.repeat(40)
    );

    expect(r).toEqual({ state: 'error', reason: 'origin_unresolvable' });
  });

  test('spawns git once for repeated operations on the same repo dir', async () => {
    const run = makeRun();
    const git_run = makeGitRun();
    let clock = 1000;
    const gh = createGh({ run, git_run, now: () => clock });

    await gh.openPrForBranch('/repo', 'UI-1');
    clock += 59_000;
    await gh.closePr('/repo', 304);

    expect(git_run).toHaveBeenCalledTimes(1);
  });

  test('resolves each repo dir independently', async () => {
    const run = makeRun();
    const git_run = vi.fn(
      /**
       * @param {string[]} _args
       * @param {{ cwd?: string }} options
       */
      async (_args, options) => ({
        code: 0,
        stdout:
          options.cwd === '/one'
            ? 'git@github.com:o/one.git\n'
            : 'git@github.com:o/two.git\n',
        stderr: ''
      })
    );
    const gh = createGh({ run, git_run });

    await gh.closePr('/one', 1);
    await gh.closePr('/two', 2);

    expect(run).toHaveBeenNthCalledWith(
      1,
      ['pr', 'close', '1', '--repo', 'o/one'],
      { cwd: '/one' }
    );
    expect(run).toHaveBeenNthCalledWith(
      2,
      ['pr', 'close', '2', '--repo', 'o/two'],
      { cwd: '/two' }
    );
  });

  test('re-resolves a repointed origin after the TTL', async () => {
    const run = makeRun();
    let url = 'git@github.com:o/before.git';
    const git_run = vi.fn(async () => ({
      code: 0,
      stdout: `${url}\n`,
      stderr: ''
    }));
    let clock = 1000;
    const gh = createGh({ run, git_run, now: () => clock });

    await gh.closePr('/repo', 1);
    clock += 60_000;
    url = 'git@github.com:o/after.git';
    await gh.closePr('/repo', 2);

    expect(git_run).toHaveBeenCalledTimes(2);
    expect(run).toHaveBeenLastCalledWith(
      ['pr', 'close', '2', '--repo', 'o/after'],
      { cwd: '/repo' }
    );
  });

  test('looks up origin in the repo dir the operation targets', async () => {
    const run = makeRun();
    const git_run = makeGitRun();

    await makeGh(run, git_run).closePr('/some/repo', 304);

    expect(git_run).toHaveBeenCalledWith(
      ['remote', 'get-url', '--push', 'origin'],
      { cwd: '/some/repo' }
    );
  });
});

describe('worker/gh — repoSlug (UI-b8n8)', () => {
  test('returns the same --repo value the PR operations pass', async () => {
    const run = makeRun();
    const gh = makeGh(run, makeGitRun('git@github.com:nakkulla/beads-ui.git'));

    const slug = await gh.repoSlug('/repo');

    expect(slug).toBe('nakkulla/beads-ui');
  });

  test('keeps the host prefix for a non-github.com origin', async () => {
    const gh = makeGh(
      makeRun(),
      makeGitRun('git@ghe.example.com:org/tool.git')
    );

    const slug = await gh.repoSlug('/repo');

    expect(slug).toBe('ghe.example.com/org/tool');
  });

  test('returns null when origin is unresolvable', async () => {
    const gh = makeGh(makeRun(), makeGitRun('not a url'));

    const slug = await gh.repoSlug('/repo');

    expect(slug).toBeNull();
  });

  test('shares the memoized resolution with the PR operations', async () => {
    const run = makeRun();
    const git_run = makeGitRun();
    const gh = makeGh(run, git_run);

    await gh.closePr('/repo', 1);
    await gh.repoSlug('/repo');

    expect(git_run).toHaveBeenCalledTimes(1);
  });

  test('spawns no gh process of its own', async () => {
    const run = makeRun();

    await makeGh(run).repoSlug('/repo');

    expect(run).not.toHaveBeenCalled();
  });
});

describe('worker/gh — commitChecks', () => {
  test('combines check runs and commit statuses bound to the exact SHA', async () => {
    const sha = 'b'.repeat(40);
    const run = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[3].endsWith('/check-runs?per_page=100')) {
        return {
          code: 0,
          stdout: JSON.stringify({
            total_count: 1,
            check_runs: [
              { name: 'Build', status: 'completed', conclusion: 'failure' }
            ]
          }),
          stderr: ''
        };
      }
      return {
        code: 0,
        stdout: JSON.stringify({
          total_count: 1,
          statuses: [{ context: 'legacy', state: 'success' }]
        }),
        stderr: ''
      };
    });

    const result = await makeGh(run).commitChecks('/repo', sha);

    expect(result).toEqual({
      state: 'ok',
      data: [
        { name: 'Build', conclusion: 'fail' },
        { name: 'legacy', conclusion: 'pass' }
      ]
    });
    expect(run).toHaveBeenNthCalledWith(
      1,
      [
        'api',
        '--method',
        'GET',
        `repos/o/r/commits/${sha}/check-runs?per_page=100`
      ],
      { cwd: '/repo' }
    );
    expect(run).toHaveBeenNthCalledWith(
      2,
      [
        'api',
        '--method',
        'GET',
        `repos/o/r/commits/${sha}/status?per_page=100`
      ],
      { cwd: '/repo' }
    );
  });

  test('returns empty only when both exact-SHA sources are structurally empty', async () => {
    const run = vi
      .fn()
      .mockResolvedValueOnce({
        code: 0,
        stdout: JSON.stringify({ total_count: 0, check_runs: [] }),
        stderr: ''
      })
      .mockResolvedValueOnce({
        code: 0,
        stdout: JSON.stringify({ total_count: 0, statuses: [] }),
        stderr: ''
      });

    const result = await makeGh(run).commitChecks('/repo', 'b'.repeat(40));

    expect(result).toEqual({ state: 'empty' });
  });

  test('fails closed when a source exceeds the bounded response', async () => {
    const run = vi
      .fn()
      .mockResolvedValueOnce({
        code: 0,
        stdout: JSON.stringify({ total_count: 101, check_runs: [] }),
        stderr: ''
      })
      .mockResolvedValueOnce({
        code: 0,
        stdout: JSON.stringify({ total_count: 0, statuses: [] }),
        stderr: ''
      });

    const result = await makeGh(run).commitChecks('/repo', 'b'.repeat(40));

    expect(result).toEqual({ state: 'error', reason: 'gh_checks_truncated' });
  });
});
