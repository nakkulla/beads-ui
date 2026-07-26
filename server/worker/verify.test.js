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

  test('reports pr_missing on a SUCCESSFUL empty observation', async () => {
    const openPrForBranch = vi.fn(async () => ({
      state: /** @type {const} */ ('empty')
    }));
    const { verifier } = makeVerifier(openPrForBranch);

    const v = await verifier.verifyPrSubmitted(INPUT);

    expect(v.ok).toBe(false);
    expect(v.reason).toBe('pr_missing');
  });

  test('never retries a successful empty observation', async () => {
    const openPrForBranch = vi.fn(async () => ({
      state: /** @type {const} */ ('empty')
    }));
    const { verifier } = makeVerifier(openPrForBranch);

    await verifier.verifyPrSubmitted(INPUT);

    expect(openPrForBranch).toHaveBeenCalledTimes(1);
  });

  test('reports gh_observation_failed — NOT pr_missing — on an observation error', async () => {
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
