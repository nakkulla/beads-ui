import { describe, expect, test, vi } from 'vitest';
import { createVerifier } from './verify.js';

const PR_URL = 'https://github.com/o/r/pull/7';
const INPUT = { repo: '/repo', bead_id: 'UI-1' };

/**
 * A fake bd writer that records every write and answers readbacks from what it
 * actually stored (so a readback mismatch is expressible).
 *
 * @param {{ failOn?: 'setMetadata'|'setStatus', readsBack?: boolean }} [opts]
 */
function makeBd(opts = {}) {
  const reads_back = opts.readsBack ?? true;
  /** @type {Array<{ method: string, bead_id: string, key?: string, value?: string }>} */
  const calls = [];
  /** @type {Record<string, string>} */
  const metadata = {};
  /** @type {{ value: string|null }} */
  const status = { value: 'in_progress' };
  return {
    calls,
    metadata,
    status,
    async setMetadata(
      /** @type {string} */ bead_id,
      /** @type {string} */ key,
      /** @type {string} */ value
    ) {
      calls.push({ method: 'setMetadata', bead_id, key, value });
      if (opts.failOn === 'setMetadata') {
        throw new Error('bd down');
      }
      if (reads_back) {
        metadata[key] = value;
      }
    },
    async readMetadata(
      /** @type {string} */ _bead_id,
      /** @type {string} */ key
    ) {
      return metadata[key] ?? null;
    },
    async setStatus(
      /** @type {string} */ bead_id,
      /** @type {string} */ value
    ) {
      calls.push({ method: 'setStatus', bead_id, value });
      if (opts.failOn === 'setStatus') {
        throw new Error('bd down');
      }
      if (reads_back) {
        status.value = value;
      }
    },
    async readStatus() {
      return status.value;
    }
  };
}

/**
 * @param {any} openPrForBranch
 * @param {any} [bd]
 * @param {any} [extra]
 */
function makeVerifier(openPrForBranch, bd = makeBd(), extra = {}) {
  const verifier = createVerifier({
    gh: { openPrForBranch },
    bd,
    sleep: async () => {},
    ...extra
  });
  return { verifier, bd };
}

/**
 * @param {Partial<import('./gh.js').PrObservation>} [pr]
 */
function okObservation(pr = {}) {
  return {
    state: /** @type {const} */ ('ok'),
    data: {
      number: 7,
      url: PR_URL,
      head_ref: 'UI-1',
      head_sha: 'a'.repeat(40),
      state: 'OPEN',
      ...pr
    }
  };
}

/**
 * A verifier whose branch query always answers `empty`, so every call exercises
 * the `pr_url` fallback (UI-b8n8 §접근 B).
 *
 * @param {{
 *   recorded?: string|null,
 *   readThrows?: boolean,
 *   slug?: string|null,
 *   detail?: any,
 *   status?: string,
 *   bd?: any
 * }} [opts]
 */
function makeFallback(opts = {}) {
  const bd = opts.bd || makeBd();
  if (typeof opts.recorded === 'string') {
    bd.metadata.pr_url = opts.recorded;
  }
  if (typeof opts.status === 'string') {
    bd.status.value = opts.status;
  }
  if (opts.readThrows) {
    bd.readMetadata = async () => {
      throw new Error('bd show failed');
    };
  }
  const repoSlug = vi.fn(async () =>
    opts.slug === undefined ? 'o/r' : opts.slug
  );
  const prDetail = vi.fn(async () =>
    opts.detail === undefined
      ? {
          state: /** @type {const} */ ('ok'),
          data: {
            number: 7,
            url: PR_URL,
            state: 'OPEN',
            mergeable: 'MERGEABLE',
            merge_state_status: 'CLEAN',
            head_ref: 'UI-1-r2',
            base_ref: 'main',
            head_sha: 'a'.repeat(40)
          }
        }
      : opts.detail
  );
  const verifier = createVerifier({
    gh: {
      openPrForBranch: async () => ({ state: /** @type {const} */ ('empty') }),
      repoSlug,
      prDetail
    },
    bd,
    sleep: async () => {}
  });
  return { verifier, bd, repoSlug, prDetail };
}

/**
 * @param {string} state
 * @param {Partial<import('./gh.js').PrDetail>} [over]
 */
function detailOf(state, over = {}) {
  return {
    state: /** @type {const} */ ('ok'),
    data: {
      number: 7,
      url: PR_URL,
      state,
      mergeable: 'MERGEABLE',
      merge_state_status: 'CLEAN',
      head_ref: 'UI-1-r2',
      base_ref: 'main',
      head_sha: 'a'.repeat(40),
      ...over
    }
  };
}

describe('worker/verify — three-state PR observation', () => {
  test('passes when an open PR is observed for the bead branch', async () => {
    const openPrForBranch = vi.fn(async () => okObservation());
    const { verifier } = makeVerifier(openPrForBranch);

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.ok).toBe(true);
    expect(v.reason).toBe('ok');
    expect(v.pr_url).toBe(PR_URL);
  });

  test('observes the branch named after the bead, in the repo dir', async () => {
    const openPrForBranch = vi.fn(async () => okObservation());
    const { verifier } = makeVerifier(openPrForBranch);

    await verifier.verifyPrSubmitted(INPUT);

    expect(openPrForBranch).toHaveBeenCalledWith('/repo', 'UI-1');
  });

  test('reports no_pr on a SUCCESSFUL empty observation', async () => {
    const openPrForBranch = vi.fn(async () => ({
      state: /** @type {const} */ ('empty')
    }));
    const { verifier } = makeVerifier(openPrForBranch);

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.ok).toBe(false);
    expect(v.reason).toBe('no_pr');
  });

  test('never retries a successful empty observation', async () => {
    const openPrForBranch = vi.fn(async () => ({
      state: /** @type {const} */ ('empty')
    }));
    const { verifier } = makeVerifier(openPrForBranch);

    await verifier.verifyPrSubmitted(INPUT);

    expect(openPrForBranch).toHaveBeenCalledTimes(1);
  });

  test('reports gh_observation_failed — NOT no_pr — on an observation error', async () => {
    const openPrForBranch = vi.fn(async () => ({
      state: /** @type {const} */ ('error'),
      reason: 'gh_failed'
    }));
    const { verifier } = makeVerifier(openPrForBranch);

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.ok).toBe(false);
    expect(v.reason).toBe('gh_observation_failed');
    expect(v.gh_reason).toBe('gh_failed');
  });

  test('retries an observation error twice before giving up', async () => {
    const openPrForBranch = vi.fn(async () => ({
      state: /** @type {const} */ ('error'),
      reason: 'gh_failed'
    }));
    const { verifier } = makeVerifier(openPrForBranch);

    await verifier.verifyPrSubmitted(INPUT);

    expect(openPrForBranch).toHaveBeenCalledTimes(3);
  });

  test('accepts a PR observed on a retry after a transient error', async () => {
    let n = 0;
    const openPrForBranch = vi.fn(async () => {
      n += 1;
      return n === 1
        ? { state: /** @type {const} */ ('error'), reason: 'gh_failed' }
        : okObservation();
    });
    const { verifier } = makeVerifier(openPrForBranch);

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.ok).toBe(true);
    expect(openPrForBranch).toHaveBeenCalledTimes(2);
  });

  test('treats a throwing adapter as an observation error, never a crash', async () => {
    const openPrForBranch = vi.fn(async () => {
      throw new Error('spawn exploded');
    });
    const { verifier } = makeVerifier(openPrForBranch);

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.reason).toBe('gh_observation_failed');
  });
});

describe('worker/verify — worker bd back-fill', () => {
  test('writes pr_url and resolved with a readback on success', async () => {
    const { verifier, bd } = makeVerifier(vi.fn(async () => okObservation()));

    await verifier.verifyPrSubmitted(INPUT);

    expect(bd.calls).toEqual([
      {
        method: 'setMetadata',
        bead_id: 'UI-1',
        key: 'pr_url',
        value: PR_URL
      },
      { method: 'setStatus', bead_id: 'UI-1', value: 'resolved' }
    ]);
    expect(bd.metadata.pr_url).toBe(PR_URL);
    expect(bd.status.value).toBe('resolved');
  });

  test('passes through when the session already recorded both keys', async () => {
    const bd = makeBd();
    bd.metadata.pr_url = PR_URL;
    bd.status.value = 'resolved';
    const { verifier } = makeVerifier(
      vi.fn(async () => okObservation()),
      bd
    );

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.ok).toBe(true);
    expect(v.reason).toBe('ok');
  });

  test('surfaces bd_record_failed when the pr_url write throws', async () => {
    const bd = makeBd({ failOn: 'setMetadata' });
    const { verifier } = makeVerifier(
      vi.fn(async () => okObservation()),
      bd
    );

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.ok).toBe(false);
    expect(v.reason).toBe('bd_record_failed');
  });

  test('surfaces bd_record_failed when the status write throws', async () => {
    const bd = makeBd({ failOn: 'setStatus' });
    const { verifier } = makeVerifier(
      vi.fn(async () => okObservation()),
      bd
    );

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.reason).toBe('bd_record_failed');
  });

  test('surfaces bd_record_failed when a write does not read back', async () => {
    const bd = makeBd({ readsBack: false });
    const { verifier } = makeVerifier(
      vi.fn(async () => okObservation()),
      bd
    );

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.reason).toBe('bd_record_failed');
    expect(v.pr_url).toBe(PR_URL);
  });

  test('never writes bd when no PR was observed', async () => {
    const bd = makeBd();
    const { verifier } = makeVerifier(
      vi.fn(async () => ({ state: /** @type {const} */ ('empty') })),
      bd
    );

    await verifier.verifyPrSubmitted(INPUT);

    expect(bd.calls).toEqual([]);
  });
});

describe('worker/verify — pr_url fallback (UI-b8n8)', () => {
  test('reports no_pr when bd holds no pr_url to fall back to', async () => {
    const { verifier, prDetail } = makeFallback({ recorded: null });

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.reason).toBe('no_pr');
    expect(prDetail).not.toHaveBeenCalled();
  });

  test('reports bd_read_failed — NOT no_pr — when the bd query throws', async () => {
    const { verifier, prDetail } = makeFallback({ readThrows: true });

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.ok).toBe(false);
    expect(v.reason).toBe('bd_read_failed');
    expect(prDetail).not.toHaveBeenCalled();
  });

  test('accepts an OPEN PR on a ref the branch query cannot see', async () => {
    const { verifier, prDetail } = makeFallback({ recorded: PR_URL });

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.ok).toBe(true);
    expect(v.reason).toBe('ok');
    expect(v.pr_state).toBe('OPEN');
    expect(prDetail).toHaveBeenCalledWith('/repo', 7);
  });

  test('accepts a MERGED PR as completion evidence', async () => {
    const { verifier } = makeFallback({
      recorded: PR_URL,
      detail: detailOf('MERGED')
    });

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.ok).toBe(true);
    expect(v.pr_state).toBe('MERGED');
    expect(v.pr_url).toBe(PR_URL);
  });

  test('reports no_pr for a CLOSED-unmerged PR', async () => {
    const { verifier, bd } = makeFallback({
      recorded: PR_URL,
      detail: detailOf('CLOSED')
    });

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.reason).toBe('no_pr');
    expect(bd.calls).toEqual([]);
  });

  test('reports gh_observation_failed when the detail query errors', async () => {
    const { verifier } = makeFallback({
      recorded: PR_URL,
      detail: { state: 'error', reason: 'gh_failed' }
    });

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.reason).toBe('gh_observation_failed');
    expect(v.gh_reason).toBe('gh_failed');
  });

  test('reports gh_observation_failed when origin is unresolvable', async () => {
    const { verifier, prDetail } = makeFallback({
      recorded: PR_URL,
      slug: null
    });

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.reason).toBe('gh_observation_failed');
    expect(v.gh_reason).toBe('origin_unresolvable');
    expect(prDetail).not.toHaveBeenCalled();
  });

  test('refuses a PR whose returned url is not the recorded one', async () => {
    const { verifier } = makeFallback({
      recorded: PR_URL,
      detail: detailOf('MERGED', { url: 'https://github.com/o/r/pull/8' })
    });

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.reason).toBe('no_pr');
  });

  test('refuses a pr_url pointing at another repository when the bead has no foreign pins', async () => {
    const { verifier, prDetail } = makeFallback({
      recorded: 'https://github.com/other/repo/pull/7'
    });

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.reason).toBe('no_pr');
    expect(prDetail).not.toHaveBeenCalled();
  });

  test.each([
    ['an issue link', 'https://github.com/o/r/issues/7'],
    ['a bare hash ref', '#7'],
    ['a trailing number on a non-PR path', 'https://github.com/o/r/commits/7'],
    ['a PR path with extra segments', 'https://github.com/o/r/pull/7/files'],
    ['a non-numeric PR ref', 'https://github.com/o/r/pull/seven'],
    ['a plain http url', 'http://github.com/o/r/pull/7'],
    ['a merge-request path', 'https://gitlab.com/o/r/merge_requests/7']
  ])('refuses %s as a fallback target', async (_label, recorded) => {
    const { verifier, prDetail } = makeFallback({ recorded });

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.reason).toBe('no_pr');
    expect(prDetail).not.toHaveBeenCalled();
  });

  test('back-fills bd normally for an OPEN fallback PR', async () => {
    const { verifier, bd } = makeFallback({ recorded: PR_URL });

    await verifier.verifyPrSubmitted(INPUT);

    expect(bd.calls).toEqual([
      { method: 'setMetadata', bead_id: 'UI-1', key: 'pr_url', value: PR_URL },
      { method: 'setStatus', bead_id: 'UI-1', value: 'resolved' }
    ]);
  });

  test('never reopens a bead bd already holds as closed', async () => {
    const { verifier, bd } = makeFallback({
      recorded: PR_URL,
      status: 'closed',
      detail: detailOf('MERGED')
    });

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.ok).toBe(true);
    expect(v.already_finished).toBe(true);
    expect(bd.calls).toEqual([]);
    expect(bd.status.value).toBe('closed');
  });

  test('does not flag already_finished for a merged PR on an open bead', async () => {
    const { verifier, bd } = makeFallback({
      recorded: PR_URL,
      status: 'in_progress',
      detail: detailOf('MERGED')
    });

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.already_finished).toBe(false);
    expect(bd.status.value).toBe('resolved');
  });

  test('reports bd_read_failed when the merged-path status read throws', async () => {
    const bd = makeBd();
    bd.readStatus = async () => {
      throw new Error('bd down');
    };
    const { verifier } = makeFallback({
      recorded: PR_URL,
      detail: detailOf('MERGED'),
      bd
    });

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.ok).toBe(false);
    expect(v.reason).toBe('bd_read_failed');
  });

  test('still reports bd_record_failed when the merged-path back-fill fails', async () => {
    const bd = makeBd({ failOn: 'setStatus' });
    const { verifier } = makeFallback({
      recorded: PR_URL,
      detail: detailOf('MERGED'),
      bd
    });

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.ok).toBe(false);
    expect(v.reason).toBe('bd_record_failed');
  });
});

describe('worker/verify — no_pr readback (UI-5ym8)', () => {
  test('carries the bd status and awaiting_user of a no_pr observation', async () => {
    const bd = makeBd();
    bd.status.value = 'in_progress';
    bd.metadata.awaiting_user = '스펙 승인 대기';
    const { verifier } = makeFallback({ bd });

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.reason).toBe('no_pr');
    expect(v.bead_status).toBe('in_progress');
    expect(v.awaiting_user).toBe('스펙 승인 대기');
  });

  test('reports an absent awaiting_user as null, not as a failed read', async () => {
    const { verifier } = makeFallback({ recorded: null });

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.reason).toBe('no_pr');
    expect(v.awaiting_user).toBe(null);
  });

  test('reports bd_read_failed when the status readback throws', async () => {
    const bd = makeBd();
    bd.readStatus = async () => {
      throw new Error('bd down');
    };
    const { verifier } = makeFallback({ bd });

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.reason).toBe('bd_read_failed');
  });

  test('does not read awaiting_user when a PR was observed', async () => {
    const bd = makeBd();
    const readMetadata = vi.fn(bd.readMetadata);
    bd.readMetadata = readMetadata;
    const { verifier } = makeVerifier(
      vi.fn(async () => okObservation()),
      bd
    );

    await verifier.verifyPrSubmitted(INPUT);

    expect(
      readMetadata.mock.calls.some((call) => call[1] === 'awaiting_user')
    ).toBe(false);
  });
});

const FOREIGN_PR_URL = 'https://github.com/acme/research-repo-template/pull/4';
const FOREIGN_PINS = {
  foreign_repo: 'git@github.com:acme/research-repo-template.git',
  foreign_path: '/tmp/example/research-repo-template',
  foreign_base: 'main'
};

/**
 * A verifier for a Bead pinned to a foreign target. The branch query and the
 * workspace `prDetail` are spies that must stay unused; the slug-bound adapter
 * answers the foreign read.
 *
 * @param {{ pins?: Record<string, string>, recorded?: string|null, detail?: any }} [opts]
 */
function makeForeign(opts = {}) {
  const bd = makeBd();
  Object.assign(bd.metadata, opts.pins ?? FOREIGN_PINS);
  if (opts.recorded !== null) {
    bd.metadata.pr_url = opts.recorded ?? FOREIGN_PR_URL;
  }
  const openPrForBranch = vi.fn(async () => ({
    state: /** @type {const} */ ('empty')
  }));
  const prDetail = vi.fn(async () => detailOf('OPEN'));
  const foreignDetail = vi.fn(async () =>
    opts.detail === undefined
      ? detailOf('OPEN', { number: 4, url: FOREIGN_PR_URL })
      : opts.detail
  );
  const forSlug = vi.fn(() => ({ prDetail: foreignDetail }));
  const verifier = createVerifier({
    gh: {
      openPrForBranch,
      repoSlug: async () => 'o/r',
      prDetail,
      forSlug
    },
    bd,
    gitRun: async () => ({ code: 0, stdout: '', stderr: '' }),
    sleep: async () => {}
  });
  return { verifier, bd, openPrForBranch, prDetail, forSlug, foreignDetail };
}

describe('worker/verify — enclosed foreign PR delivery (UI-k467)', () => {
  test('accepts an OPEN PR recorded in the pinned target repository', async () => {
    const { verifier, bd } = makeForeign();

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v).toMatchObject({
      ok: true,
      reason: 'ok',
      pr_url: FOREIGN_PR_URL,
      pr_number: 4,
      pr_state: 'OPEN'
    });
    expect(bd.status.value).toBe('resolved');
  });

  test('reads the foreign PR through the pinned slug, never the workspace origin', async () => {
    const { verifier, forSlug, foreignDetail, prDetail } = makeForeign();

    await verifier.verifyPrSubmitted(INPUT);

    expect(forSlug).toHaveBeenCalledWith('acme/research-repo-template');
    expect(foreignDetail).toHaveBeenCalledWith('/repo', 4);
    expect(prDetail).not.toHaveBeenCalled();
  });

  test('skips the rig branch search for a pinned bead', async () => {
    const { verifier, openPrForBranch } = makeForeign();

    await verifier.verifyPrSubmitted(INPUT);

    expect(openPrForBranch).not.toHaveBeenCalled();
  });

  test('fails with foreign_pr_repo_mismatch when pr_url names another repository', async () => {
    const { verifier, foreignDetail } = makeForeign({
      recorded: 'https://github.com/o/r/pull/9'
    });

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.ok).toBe(false);
    expect(v.reason).toBe('foreign_pr_repo_mismatch');
    expect(foreignDetail).not.toHaveBeenCalled();
  });

  test('fails naming the missing pin when the pins are partial', async () => {
    const { verifier, openPrForBranch } = makeForeign({
      pins: {
        foreign_repo: FOREIGN_PINS.foreign_repo,
        foreign_base: 'main'
      }
    });

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.ok).toBe(false);
    expect(v.reason).toBe('foreign_landing_unpinned:foreign_path');
    expect(openPrForBranch).not.toHaveBeenCalled();
  });

  test('compares the target repository case-insensitively and without .git', async () => {
    const { verifier } = makeForeign({
      pins: {
        ...FOREIGN_PINS,
        foreign_repo: 'https://GitHub.com/ACME/Research-Repo-Template.git'
      }
    });

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.ok).toBe(true);
  });
});
