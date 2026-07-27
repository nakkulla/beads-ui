import { describe, expect, test, vi } from 'vitest';
import { createGh } from './gh.js';

const PR = {
  number: 7,
  url: 'https://github.com/o/r/pull/7',
  headRefName: 'UI-1',
  headRefOid: 'a'.repeat(40),
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
        'number,url,headRefName,headRefOid,state',
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
    headRefOid: 'b'.repeat(40)
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
        head_sha: DETAIL.headRefOid
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
        'number,url,state,mergeable,mergeStateStatus,headRefName,headRefOid',
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
    const run = makeRun({
      stdout: JSON.stringify({ ...DETAIL, state: 'MERGED' })
    });

    const r = await makeGh(run).prDetail('/repo', 304);

    expect(r).toMatchObject({ state: 'ok', data: { state: 'MERGED' } });
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
