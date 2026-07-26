import { describe, expect, test, vi } from 'vitest';
import { validateAdmission } from './admission.js';

const SHA = 'a'.repeat(40);
const BASE = 'base-oid-1234';

/**
 * Configurable fake gitRun routed by subcommand: `rev-parse` on the base →
 * base_code, `cat-file -e` → catfile_code, `rev-parse` on the receipt sha →
 * sha_code, `log` → log_code / log_out.
 *
 * @param {{ base_code?: number, catfile_code?: number, sha_code?: number, log_code?: number, log_out?: string }} [opts]
 */
function makeGitRun(opts = {}) {
  return vi.fn(async (args) => {
    if (args[0] === 'rev-parse') {
      const ref = args[args.length - 1];
      if (ref === `${BASE}^{commit}`) {
        return { code: opts.base_code ?? 0, stdout: '', stderr: '' };
      }
      return { code: opts.sha_code ?? 0, stdout: '', stderr: '' };
    }
    if (args[0] === 'cat-file') {
      return { code: opts.catfile_code ?? 0, stdout: '', stderr: '' };
    }
    if (args[0] === 'log') {
      return {
        code: opts.log_code ?? 0,
        stdout: opts.log_out ?? '',
        stderr: ''
      };
    }
    return { code: 0, stdout: '', stderr: '' };
  });
}

/**
 * @param {Partial<{ route: string|null, spec_id: string|null, spec_review: unknown }>} [bead]
 */
function makeBead(bead = {}) {
  return {
    route: Object.hasOwn(bead, 'route') ? bead.route : 'spec_backed',
    spec_id: Object.hasOwn(bead, 'spec_id') ? bead.spec_id : 'docs/specs/x.md',
    spec_review: Object.hasOwn(bead, 'spec_review')
      ? bead.spec_review
      : `codex@${SHA}`
  };
}

/**
 * @param {ReturnType<typeof makeGitRun>} gitRun
 * @param {ReturnType<typeof makeBead>} bead
 */
function run(gitRun, bead) {
  return validateAdmission({ gitRun, repo: '/repo', base: BASE, bead });
}

describe('worker/admission fail-closed validator', () => {
  test('passes a fresh spec_backed bead with a reviewer receipt', async () => {
    const gitRun = makeGitRun();
    const r = await run(gitRun, makeBead());
    expect(r).toEqual({ ok: true });
    // Freshness probe ran against the pinned base, scoped to the spec path.
    expect(gitRun).toHaveBeenCalledWith(
      ['log', `${SHA}..${BASE}`, '--', 'docs/specs/x.md'],
      { cwd: '/repo' }
    );
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

  test('rejects a post-receipt spec change as spec_review_stale', async () => {
    const r = await run(
      makeGitRun({ log_out: 'commit deadbeef\n' }),
      makeBead()
    );
    expect(r).toEqual({ ok: false, reason: 'spec_review_stale' });
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
    // Freshness probe errored → NOT fresh-by-default.
    expect(await run(makeGitRun({ log_code: 128 }), makeBead())).toEqual({
      ok: false,
      reason: 'git_error'
    });
    // gitRun rejecting entirely is still a rejection, not a throw.
    const throwing = vi.fn(async () => {
      throw new Error('spawn EPERM');
    });
    expect(await run(throwing, makeBead())).toEqual({
      ok: false,
      reason: 'git_error'
    });
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
