import { describe, expect, test, vi } from 'vitest';
import { createVerifier } from './verify.js';

const SHA = 'b'.repeat(40);

/**
 * @param {{ status?: string|null, metadata?: Record<string, unknown> }} [bead]
 */
function makeDeps(bead = {}) {
  const bdShow = vi.fn(async () => ({
    status: bead.status ?? 'closed',
    metadata: bead.metadata ?? {}
  }));
  return { bdShow };
}

const BASE_INPUT = { repo: '/repo', target_base: 'main', bead_id: 'UI-1' };

describe('worker/verify — auto_merge lane (server-observed merge_sha + closed)', () => {
  test('passes when a 40-hex observed merge_sha exists AND bd reads closed', async () => {
    const v = await createVerifier(makeDeps({ status: 'closed' })).verifyMerge({
      ...BASE_INPUT,
      merge_policy: 'auto_merge',
      merge_sha: SHA
    });
    expect(v.ok).toBe(true);
    expect(v.reason).toBe('ok');
    expect(v.bd_status).toBe('closed');
  });

  test('fails closed when the observed merge_sha is missing (no lock-observed merge)', async () => {
    const v = await createVerifier(makeDeps({ status: 'closed' })).verifyMerge({
      ...BASE_INPUT,
      merge_policy: 'auto_merge',
      merge_sha: null
    });
    expect(v.ok).toBe(false);
    expect(v.reason).toBe('merge_sha_missing');
  });

  test('rejects a short/non-40-hex merge_sha (hex coercion precedent)', async () => {
    for (const merge_sha of ['abc123', 'z'.repeat(40)]) {
      const v = await createVerifier(
        makeDeps({ status: 'closed' })
      ).verifyMerge({
        ...BASE_INPUT,
        merge_policy: 'auto_merge',
        merge_sha
      });
      expect(v.ok).toBe(false);
      expect(v.reason).toBe('merge_sha_missing');
    }
  });

  test('a session that never acquired the lock keeps the bd_not_closed reason', async () => {
    // No merge → bd never reached closed. Status check comes FIRST so the
    // legacy reason survives for the no-lock exit.
    const v = await createVerifier(
      makeDeps({ status: 'in_progress' })
    ).verifyMerge({
      ...BASE_INPUT,
      merge_policy: 'auto_merge',
      merge_sha: null
    });
    expect(v.ok).toBe(false);
    expect(v.reason).toBe('bd_not_closed');
    expect(v.bd_status).toBe('in_progress');
  });

  test('resolved is NOT merge proof for auto_merge', async () => {
    const v = await createVerifier(
      makeDeps({ status: 'resolved' })
    ).verifyMerge({
      ...BASE_INPUT,
      merge_policy: 'auto_merge',
      merge_sha: SHA
    });
    expect(v.ok).toBe(false);
    expect(v.reason).toBe('bd_not_closed');
  });
});

describe('worker/verify — pr_stop lane (resolved + pr_url)', () => {
  test('passes on bd resolved with a pr_url metadata (no merge_sha needed)', async () => {
    const v = await createVerifier(
      makeDeps({
        status: 'resolved',
        metadata: { pr_url: 'https://github.com/o/r/pull/7' }
      })
    ).verifyMerge({
      ...BASE_INPUT,
      merge_policy: 'pr_stop',
      merge_sha: null
    });
    expect(v.ok).toBe(true);
    expect(v.reason).toBe('ok');
  });

  test('fails when bd is not resolved', async () => {
    for (const status of ['open', 'in_progress', 'closed']) {
      const v = await createVerifier(
        makeDeps({
          status,
          metadata: { pr_url: 'https://github.com/o/r/pull/7' }
        })
      ).verifyMerge({
        ...BASE_INPUT,
        merge_policy: 'pr_stop',
        merge_sha: null
      });
      expect(v.ok).toBe(false);
      expect(v.reason).toBe('bd_not_resolved');
    }
  });

  test('fails when pr_url metadata is missing/empty', async () => {
    for (const metadata of [{}, { pr_url: '' }, { pr_url: 42 }]) {
      const v = await createVerifier(
        makeDeps({ status: 'resolved', metadata })
      ).verifyMerge({
        ...BASE_INPUT,
        merge_policy: 'pr_stop',
        merge_sha: null
      });
      expect(v.ok).toBe(false);
      expect(v.reason).toBe('pr_url_missing');
    }
  });
});

describe('worker/verify — fail-closed plumbing', () => {
  test('a null bdShow result fails closed', async () => {
    const v = await createVerifier({ bdShow: async () => null }).verifyMerge({
      ...BASE_INPUT,
      merge_policy: 'auto_merge',
      merge_sha: SHA
    });
    expect(v.ok).toBe(false);
    expect(v.bd_status).toBe(null);
  });

  test('an unknown merge_policy fails closed instead of picking a lane', async () => {
    const v = await createVerifier(makeDeps({ status: 'closed' })).verifyMerge(
      /** @type {any} */ ({
        ...BASE_INPUT,
        merge_policy: 'yolo',
        merge_sha: SHA
      })
    );
    expect(v.ok).toBe(false);
    expect(v.reason).toBe('invalid_merge_policy');
  });
});
