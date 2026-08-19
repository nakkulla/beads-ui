import { describe, expect, test, vi } from 'vitest';
import { validateAdmission } from './admission.js';

const SHA = 'a'.repeat(40);
const PLAN_SHA = 'b'.repeat(40);
const CURSOR_SHA = 'c'.repeat(40);
const BASE = 'base-oid-1234';
const SPEC_PATH = 'docs/specs/x.md';
const PLAN_PATH = 'docs/plans/x.md';

/**
 * @param {{
 *   base_code?: number,
 *   catfile_code?: number,
 *   plan_catfile_code?: number,
 *   sha_code?: number,
 *   plan_sha_code?: number,
 *   cursor_code?: number,
 *   ancestor_code?: number,
 *   show_code?: number,
 *   plan_show_code?: number,
 *   spec_content?: string,
 *   plan_content?: string,
 *   log_code?: number,
 *   plan_log_code?: number,
 *   log_out?: string,
 *   cursor_log_out?: string,
 *   plan_log_out?: string
 * }} [opts]
 */
function makeGitRun(opts = {}) {
  return vi.fn(async (args) => {
    if (args[0] === 'rev-parse') {
      const ref = args[args.length - 1];
      if (ref === `${BASE}^{commit}`) {
        return { code: opts.base_code ?? 0, stdout: '', stderr: '' };
      }
      if (ref === `${PLAN_SHA}^{commit}`) {
        return { code: opts.plan_sha_code ?? 0, stdout: '', stderr: '' };
      }
      if (ref === `${CURSOR_SHA}^{commit}`) {
        return { code: opts.cursor_code ?? 0, stdout: '', stderr: '' };
      }
      return { code: opts.sha_code ?? 0, stdout: '', stderr: '' };
    }
    if (args[0] === 'merge-base') {
      return { code: opts.ancestor_code ?? 0, stdout: '', stderr: '' };
    }
    if (args[0] === 'cat-file') {
      const is_plan = String(args[args.length - 1]).endsWith(`:${PLAN_PATH}`);
      return {
        code: is_plan
          ? (opts.plan_catfile_code ?? 0)
          : (opts.catfile_code ?? 0),
        stdout: '',
        stderr: ''
      };
    }
    if (args[0] === 'show') {
      const is_plan = String(args[args.length - 1]).endsWith(`:${PLAN_PATH}`);
      return {
        code: is_plan ? (opts.plan_show_code ?? 0) : (opts.show_code ?? 0),
        stdout: is_plan
          ? (opts.plan_content ?? '# plan\n')
          : (opts.spec_content ?? '# spec\n'),
        stderr: ''
      };
    }
    if (args[0] === '--literal-pathspecs' && args[1] === 'log') {
      const separator = args.indexOf('--');
      const is_plan = args[separator + 1] === PLAN_PATH;
      const range = args[4];
      return {
        code: is_plan ? (opts.plan_log_code ?? 0) : (opts.log_code ?? 0),
        stdout: is_plan
          ? (opts.plan_log_out ?? '')
          : range === `${CURSOR_SHA}..${BASE}`
            ? (opts.cursor_log_out ?? opts.log_out ?? '')
            : (opts.log_out ?? ''),
        stderr: ''
      };
    }
    return { code: 0, stdout: '', stderr: '' };
  });
}

/**
 * @param {Partial<{ route: string|null, spec_id: string|null, spec_id_conflict: boolean, spec_review: unknown, plan_path: unknown, plan_approval: unknown, last_checked_sha: unknown, labels: unknown }>} [bead]
 */
function makeBead(bead = {}) {
  /** @type {Record<string, unknown>} */
  const result = {
    route: Object.hasOwn(bead, 'route') ? bead.route : 'spec_backed',
    spec_id: Object.hasOwn(bead, 'spec_id') ? bead.spec_id : SPEC_PATH,
    spec_id_conflict: bead.spec_id_conflict === true,
    labels: Object.hasOwn(bead, 'labels') ? bead.labels : [],
    spec_review: Object.hasOwn(bead, 'spec_review')
      ? bead.spec_review
      : `codex@${SHA}`
  };
  if (Object.hasOwn(bead, 'plan_path')) {
    result.plan_path = bead.plan_path;
  }
  if (Object.hasOwn(bead, 'plan_approval')) {
    result.plan_approval = bead.plan_approval;
  }
  if (Object.hasOwn(bead, 'last_checked_sha')) {
    result.last_checked_sha = bead.last_checked_sha;
  }
  return result;
}

/**
 * @param {ReturnType<typeof makeGitRun>} gitRun
 * @param {ReturnType<typeof makeBead>} bead
 */
function run(gitRun, bead) {
  return validateAdmission({ gitRun, repo: '/repo', base: BASE, bead });
}

/**
 * @param {string[]} scope
 */
function artifactContent(scope) {
  return ['---', 'scope:', ...scope.map((item) => `  - ${item}`), '---'].join(
    '\n'
  );
}

describe('worker/admission fail-closed validator', () => {
  test('rejects worker-ineligible before environment and git probes', async () => {
    const gitRun = makeGitRun();
    const ghAvailable = vi.fn(async () => true);

    const r = await validateAdmission({
      gitRun,
      ghAvailable,
      repo: '/repo',
      base: BASE,
      bead: makeBead({ labels: ['worker-ineligible'] })
    });

    expect(r).toEqual({ ok: false, reason: 'worker_ineligible' });
    expect(ghAvailable).not.toHaveBeenCalled();
    expect(gitRun).not.toHaveBeenCalled();
  });

  test('passes a fresh spec_backed bead with a reviewer receipt', async () => {
    const gitRun = makeGitRun();
    const r = await run(gitRun, makeBead());
    expect(r).toEqual({ ok: true });
    // Freshness probe ran against the pinned base, scoped to the spec path.
    expect(gitRun).toHaveBeenCalledWith(
      [
        '--literal-pathspecs',
        'log',
        '--format=%H',
        '--name-only',
        `${SHA}..${BASE}`,
        '--',
        SPEC_PATH
      ],
      { cwd: '/repo' }
    );
  });

  test('falls back to spec scope when plan approval is absent', async () => {
    const gitRun = makeGitRun();
    const r = await validateAdmission({
      gitRun,
      repo: '/repo',
      base: BASE,
      bead: {
        ...makeBead({ route: 'full_plan' }),
        plan_path: PLAN_PATH,
        plan_approval: null
      }
    });

    expect(r).toEqual({ ok: true });
    expect(
      gitRun.mock.calls.some(
        ([args]) => args[0] === 'cat-file' && args[2] === `${BASE}:${PLAN_PATH}`
      )
    ).toBe(false);
  });

  test('accepts a skipped@<40hex> receipt (skip is explicit user authority)', async () => {
    const r = await run(
      makeGitRun(),
      makeBead({ spec_review: `skipped@${SHA}` })
    );
    expect(r).toEqual({ ok: true });
  });

  test('rejects a non-enum route as invalid_route without any git call', async () => {
    for (const route of [null, '', 'quick_fix', 'fullplan']) {
      const gitRun = makeGitRun();
      const r = await run(gitRun, makeBead({ route }));
      expect(r).toEqual({ ok: false, reason: 'invalid_route' });
      expect(gitRun).not.toHaveBeenCalled();
    }
  });

  test('rejects a missing spec_id as spec_missing without any git call', async () => {
    const gitRun = makeGitRun();
    const r = await run(gitRun, makeBead({ spec_id: null }));
    expect(r).toEqual({ ok: false, reason: 'spec_missing' });
    expect(gitRun).not.toHaveBeenCalled();
  });

  test('rejects conflicting dual spec_id before any git path probe', async () => {
    const gitRun = makeGitRun();
    const r = await run(gitRun, makeBead({ spec_id_conflict: true }));
    expect(r).toEqual({ ok: false, reason: 'spec_id_conflict' });
    expect(gitRun).not.toHaveBeenCalled();
  });

  test('names the base when the spec path is absent from it (cat-file 128)', async () => {
    const r = await run(makeGitRun({ catfile_code: 128 }), makeBead());
    expect(r).toEqual({
      ok: false,
      reason: `spec_missing_at_base:${BASE}`
    });
  });

  test('reports base_label instead of the pinned base it checked', async () => {
    const r = await validateAdmission({
      gitRun: makeGitRun({ catfile_code: 128 }),
      repo: '/repo',
      base: BASE,
      base_label: 'ilsun/dev',
      bead: makeBead()
    });

    expect(r).toEqual({ ok: false, reason: 'spec_missing_at_base:ilsun/dev' });
  });

  test('keeps the bare spec_missing distinct from the at-base refusal', async () => {
    const absent_spec = await run(makeGitRun(), makeBead({ spec_id: null }));
    const absent_at_base = await run(
      makeGitRun({ catfile_code: 128 }),
      makeBead()
    );

    expect(absent_spec.reason).toBe('spec_missing');
    expect(absent_at_base.reason).not.toBe('spec_missing');
  });

  test('rejects malformed receipts as receipt_missing_or_malformed', async () => {
    for (const spec_review of [
      undefined,
      null,
      42,
      'codex',
      `codex@${'a'.repeat(7)}`, // short sha — 40 hex is mandatory
      `codex@${'z'.repeat(40)}` // non-hex
    ]) {
      const r = await run(makeGitRun(), makeBead({ spec_review }));
      expect(r).toEqual({
        ok: false,
        reason: 'receipt_missing_or_malformed'
      });
    }
  });

  test('rejects an unreachable receipt SHA as receipt_unreachable', async () => {
    const r = await run(makeGitRun({ sha_code: 1 }), makeBead());
    expect(r).toEqual({ ok: false, reason: 'receipt_unreachable' });
  });

  test('admits a post-receipt spec change with a stale payload (UI-dlim §3.1)', async () => {
    const delta_a = 'b'.repeat(40);
    const delta_b = 'c'.repeat(40);

    const r = await run(
      makeGitRun({ log_out: `${delta_a}\n${delta_b}\n` }),
      makeBead()
    );

    expect(r).toEqual({
      ok: true,
      stale: {
        receipt_sha: SHA,
        delta_shas: [delta_a, delta_b],
        changed_paths: []
      }
    });
  });

  test('admits a stale skipped@ receipt exactly like a reviewed one', async () => {
    const delta = 'd'.repeat(40);

    const r = await run(
      makeGitRun({ log_out: `${delta}\n` }),
      makeBead({ spec_review: `skipped@${SHA}` })
    );

    expect(r).toEqual({
      ok: true,
      stale: { receipt_sha: SHA, delta_shas: [delta], changed_paths: [] }
    });
  });

  test('carries no stale payload when the receipt is fresh', async () => {
    const r = await run(makeGitRun({ log_out: '  \n' }), makeBead());

    expect(r).toEqual({ ok: true });
  });

  test('probes declared spec scope with literal pathspecs', async () => {
    const gitRun = makeGitRun({
      spec_content: artifactContent(['server/worker/', 'app/exact.js'])
    });

    const r = await run(gitRun, makeBead());

    expect(r).toEqual({ ok: true });
    expect(gitRun).toHaveBeenCalledWith(
      [
        '--literal-pathspecs',
        'log',
        '--format=%H',
        '--name-only',
        `${SHA}..${BASE}`,
        '--',
        SPEC_PATH,
        'server/worker/',
        'app/exact.js'
      ],
      { cwd: '/repo' }
    );
  });

  test('keeps pathspec magic inert and excludes invalid scope entries', async () => {
    const gitRun = makeGitRun({
      spec_content: artifactContent([
        ':(exclude)server/',
        'server/[ab].js',
        'server/safe/'
      ])
    });

    await run(gitRun, makeBead());

    const log_call = gitRun.mock.calls.find(
      ([args]) => args[0] === '--literal-pathspecs'
    );
    expect(log_call?.[0]).toEqual([
      '--literal-pathspecs',
      'log',
      '--format=%H',
      '--name-only',
      `${SHA}..${BASE}`,
      '--',
      SPEC_PATH,
      'server/safe/'
    ]);
  });

  test('probes full-plan spec file and plan scope independently', async () => {
    const gitRun = makeGitRun({
      plan_content: artifactContent(['server/worker/', 'app/exact.js'])
    });

    const r = await run(
      gitRun,
      makeBead({
        route: 'full_plan',
        plan_path: PLAN_PATH,
        plan_approval: `user@${PLAN_SHA}`
      })
    );

    expect(r).toEqual({ ok: true });
    const log_calls = gitRun.mock.calls
      .filter(([args]) => args[0] === '--literal-pathspecs')
      .map(([args]) => args);
    expect(log_calls).toEqual([
      [
        '--literal-pathspecs',
        'log',
        '--format=%H',
        '--name-only',
        `${SHA}..${BASE}`,
        '--',
        SPEC_PATH
      ],
      [
        '--literal-pathspecs',
        'log',
        '--format=%H',
        '--name-only',
        `${PLAN_SHA}..${BASE}`,
        '--',
        PLAN_PATH,
        'server/worker/',
        'app/exact.js'
      ]
    ]);
  });

  test('falls back for every unusable plan_path form', async () => {
    for (const plan_path of [undefined, '', '  ', 42]) {
      const gitRun = makeGitRun({
        spec_content: artifactContent(['server/spec-scope/'])
      });

      const r = await run(
        gitRun,
        makeBead({
          route: 'full_plan',
          plan_path,
          plan_approval: `user@${PLAN_SHA}`
        })
      );

      expect(r).toEqual({ ok: true });
      expect(gitRun).toHaveBeenCalledWith(
        expect.arrayContaining([SPEC_PATH, 'server/spec-scope/']),
        { cwd: '/repo' }
      );
    }
  });

  test('falls back for absent malformed and unreachable plan approvals', async () => {
    const cases = [
      { approval: undefined, opts: {} },
      { approval: 'codex@not-a-receipt', opts: {} },
      { approval: `user@${PLAN_SHA}`, opts: { plan_sha_code: 1 } }
    ];
    for (const item of cases) {
      const gitRun = makeGitRun({
        ...item.opts,
        spec_content: artifactContent(['server/spec-scope/'])
      });

      const r = await run(
        gitRun,
        makeBead({
          route: 'full_plan',
          plan_path: PLAN_PATH,
          plan_approval: item.approval
        })
      );

      expect(r).toEqual({ ok: true });
      expect(
        gitRun.mock.calls.some(
          ([args]) =>
            args[0] === '--literal-pathspecs' && args.includes(PLAN_PATH)
        )
      ).toBe(false);
    }
  });

  test('falls back when the plan file is absent at base', async () => {
    const gitRun = makeGitRun({
      plan_catfile_code: 128,
      spec_content: artifactContent(['server/spec-scope/'])
    });

    const r = await run(
      gitRun,
      makeBead({
        route: 'full_plan',
        plan_path: PLAN_PATH,
        plan_approval: `user@${PLAN_SHA}`
      })
    );

    expect(r).toEqual({ ok: true });
    expect(gitRun).not.toHaveBeenCalledWith(['show', `${BASE}:${PLAN_PATH}`], {
      cwd: '/repo'
    });
  });

  test('falls back when the plan declares no valid scope', async () => {
    const gitRun = makeGitRun({
      plan_content: artifactContent(['../outside', 'server/*.js']),
      spec_content: artifactContent(['server/spec-scope/'])
    });

    const r = await run(
      gitRun,
      makeBead({
        route: 'full_plan',
        plan_path: PLAN_PATH,
        plan_approval: `user@${PLAN_SHA}`
      })
    );

    expect(r).toEqual({ ok: true });
    expect(
      gitRun.mock.calls.some(
        ([args]) =>
          args[0] === '--literal-pathspecs' && args.includes(PLAN_PATH)
      )
    ).toBe(false);
  });

  test('uses a parsed reachable ancestor cursor as the actual anchor', async () => {
    const delta = 'd'.repeat(40);
    const gitRun = makeGitRun({
      cursor_log_out: `${delta}\nserver/worker/admission.js\n`
    });

    const r = await run(gitRun, makeBead({ last_checked_sha: CURSOR_SHA }));

    expect(r).toEqual({
      ok: true,
      stale: {
        receipt_sha: CURSOR_SHA,
        delta_shas: [delta],
        changed_paths: ['server/worker/admission.js']
      }
    });
    expect(gitRun).toHaveBeenCalledWith(
      ['merge-base', '--is-ancestor', CURSOR_SHA, BASE],
      { cwd: '/repo' }
    );
  });

  test('falls back from malformed and unreachable cursors', async () => {
    for (const item of [
      { cursor: 'short', opts: {} },
      { cursor: CURSOR_SHA, opts: { cursor_code: 1 } }
    ]) {
      const gitRun = makeGitRun(item.opts);

      const r = await run(gitRun, makeBead({ last_checked_sha: item.cursor }));

      expect(r).toEqual({ ok: true });
      expect(gitRun).toHaveBeenCalledWith(
        expect.arrayContaining([`${SHA}..${BASE}`]),
        { cwd: '/repo' }
      );
    }
  });

  test('blocks a descendant cursor from producing false freshness', async () => {
    const delta = 'd'.repeat(40);
    const gitRun = makeGitRun({
      ancestor_code: 1,
      log_out: `${delta}\n${SPEC_PATH}\n`,
      cursor_log_out: ''
    });

    const r = await run(gitRun, makeBead({ last_checked_sha: CURSOR_SHA }));

    expect(r).toMatchObject({
      ok: true,
      stale: { receipt_sha: SHA, delta_shas: [delta] }
    });
  });

  test('falls back from an unrelated reachable cursor', async () => {
    const unrelated = 'e'.repeat(40);
    const delta = 'd'.repeat(40);
    const gitRun = makeGitRun({
      ancestor_code: 1,
      log_out: `${delta}\n${SPEC_PATH}\n`
    });

    const r = await run(gitRun, makeBead({ last_checked_sha: unrelated }));

    expect(r).toMatchObject({
      ok: true,
      stale: { receipt_sha: SHA, delta_shas: [delta] }
    });
  });

  test('does not reuse a fallback cursor after plan authority unsets it', async () => {
    const fallback_git = makeGitRun();
    await run(
      fallback_git,
      makeBead({
        route: 'full_plan',
        plan_path: PLAN_PATH,
        plan_approval: null,
        last_checked_sha: CURSOR_SHA
      })
    );
    const plan_git = makeGitRun({
      plan_content: artifactContent(['server/worker/'])
    });

    await run(
      plan_git,
      makeBead({
        route: 'full_plan',
        plan_path: PLAN_PATH,
        plan_approval: `user@${PLAN_SHA}`
      })
    );

    const ranges = plan_git.mock.calls
      .filter(([args]) => args[0] === '--literal-pathspecs')
      .map(([args]) => args[4]);
    expect(ranges).toEqual([`${SHA}..${BASE}`, `${PLAN_SHA}..${BASE}`]);
    expect(
      plan_git.mock.calls.some(([args]) =>
        args.includes(`${CURSOR_SHA}^{commit}`)
      )
    ).toBe(false);
  });

  test('returns additive spec and plan stale blocks with changed paths', async () => {
    const spec_delta = 'd'.repeat(40);
    const plan_delta = 'e'.repeat(40);
    const gitRun = makeGitRun({
      plan_content: artifactContent(['server/worker/']),
      log_out: `${spec_delta}\n${SPEC_PATH}\n`,
      plan_log_out: `${plan_delta}\nserver/worker/scheduler.js\n`
    });

    const r = await run(
      gitRun,
      makeBead({
        route: 'full_plan',
        plan_path: PLAN_PATH,
        plan_approval: `user@${PLAN_SHA}`
      })
    );

    expect(r).toEqual({
      ok: true,
      stale: {
        receipt_sha: SHA,
        delta_shas: [spec_delta],
        changed_paths: [SPEC_PATH],
        plan: {
          receipt_sha: PLAN_SHA,
          delta_shas: [plan_delta],
          changed_paths: ['server/worker/scheduler.js']
        }
      }
    });
  });

  test('returns only the plan block when the spec is fresh', async () => {
    const plan_delta = 'e'.repeat(40);
    const gitRun = makeGitRun({
      plan_content: artifactContent(['server/worker/']),
      plan_log_out: `${plan_delta}\nserver/worker/scheduler.js\n`
    });

    const r = await run(
      gitRun,
      makeBead({
        route: 'full_plan',
        plan_path: PLAN_PATH,
        plan_approval: `user@${PLAN_SHA}`
      })
    );

    expect(r).toEqual({
      ok: true,
      stale: {
        plan: {
          receipt_sha: PLAN_SHA,
          delta_shas: [plan_delta],
          changed_paths: ['server/worker/scheduler.js']
        }
      }
    });
  });

  test('maps every git command failure to git_error (fail-closed, no fail-quiet)', async () => {
    // Base tip unresolvable.
    expect(await run(makeGitRun({ base_code: 1 }), makeBead())).toEqual({
      ok: false,
      reason: 'git_error'
    });
    // Spawn failure (code 127) on the spec-existence probe.
    expect(await run(makeGitRun({ catfile_code: 127 }), makeBead())).toEqual({
      ok: false,
      reason: 'git_error'
    });
    // An existing spec whose content cannot be read cannot produce a scope.
    expect(await run(makeGitRun({ show_code: 128 }), makeBead())).toEqual({
      ok: false,
      reason: 'git_error'
    });
    // Freshness probe errored → refused, never admitted-with-a-stale-flag: a
    // staleness verdict that could not be computed is not an admission.
    expect(await run(makeGitRun({ log_code: 128 }), makeBead())).toEqual({
      ok: false,
      reason: 'git_error'
    });
    expect(
      await run(
        makeGitRun({ log_code: 128, log_out: `${'e'.repeat(40)}\n` }),
        makeBead()
      )
    ).toEqual({ ok: false, reason: 'git_error' });
    // gitRun rejecting entirely is still a rejection, not a throw.
    const throwing = vi.fn(async () => {
      throw new Error('spawn EPERM');
    });
    expect(await run(throwing, makeBead())).toEqual({
      ok: false,
      reason: 'git_error'
    });
  });

  test('rejects plan process failures but falls back from ordinary misses', async () => {
    const bead = makeBead({
      route: 'full_plan',
      plan_path: PLAN_PATH,
      plan_approval: `user@${PLAN_SHA}`
    });

    const spawn_failure = await run(makeGitRun({ plan_sha_code: 127 }), bead);
    const unreachable = await run(makeGitRun({ plan_sha_code: 1 }), bead);

    expect(spawn_failure).toEqual({ ok: false, reason: 'git_error' });
    expect(unreachable).toEqual({ ok: true });
  });

  test('rejects cursor process failures and plan probe failures', async () => {
    const cursor_failure = await run(
      makeGitRun({ cursor_code: 127 }),
      makeBead({ last_checked_sha: CURSOR_SHA })
    );
    const plan_failure = await run(
      makeGitRun({
        plan_content: artifactContent(['server/worker/']),
        plan_log_code: 128
      }),
      makeBead({
        route: 'full_plan',
        plan_path: PLAN_PATH,
        plan_approval: `user@${PLAN_SHA}`
      })
    );

    expect(cursor_failure).toEqual({ ok: false, reason: 'git_error' });
    expect(plan_failure).toEqual({ ok: false, reason: 'git_error' });
  });
});

describe('worker/admission gh availability (worker-phase2 §10)', () => {
  test('refuses with gh_unavailable when gh cannot be used', async () => {
    const gitRun = makeGitRun();

    const r = await validateAdmission({
      gitRun,
      ghAvailable: async () => false,
      repo: '/repo',
      base: BASE,
      bead: makeBead()
    });

    expect(r).toEqual({ ok: false, reason: 'gh_unavailable' });
  });

  test('refuses before spending any git probe on the bead', async () => {
    const gitRun = makeGitRun();

    await validateAdmission({
      gitRun,
      ghAvailable: async () => false,
      repo: '/repo',
      base: BASE,
      bead: makeBead()
    });

    expect(gitRun).not.toHaveBeenCalled();
  });

  test('treats a throwing availability probe as a refusal', async () => {
    const r = await validateAdmission({
      gitRun: makeGitRun(),
      ghAvailable: async () => {
        throw new Error('spawn EPERM');
      },
      repo: '/repo',
      base: BASE,
      bead: makeBead()
    });

    expect(r).toEqual({ ok: false, reason: 'gh_unavailable' });
  });

  test('lets the existing conditions decide when gh is available', async () => {
    const available = { gitRun: makeGitRun(), ghAvailable: async () => true };

    const pass = await validateAdmission({
      ...available,
      repo: '/repo',
      base: BASE,
      bead: makeBead()
    });
    const fail = await validateAdmission({
      ...available,
      repo: '/repo',
      base: BASE,
      bead: makeBead({ route: 'quick_fix' })
    });

    expect(pass).toEqual({ ok: true });
    expect(fail).toEqual({ ok: false, reason: 'invalid_route' });
  });

  test('passes the gh condition when no availability dep is wired', async () => {
    const r = await run(makeGitRun(), makeBead());

    expect(r).toEqual({ ok: true });
  });
});
