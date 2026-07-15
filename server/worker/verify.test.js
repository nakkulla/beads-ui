import { describe, expect, test, vi } from 'vitest';
import { createVerifier } from './verify.js';

/**
 * @param {{ ancestor?: boolean, status?: string|null }} opts
 */
function makeDeps(opts) {
  const gitRun = vi.fn(async (args) => {
    if (args[0] === 'merge-base' && args[1] === '--is-ancestor') {
      return { code: opts.ancestor ? 0 : 1, stdout: '', stderr: '' };
    }
    return { code: 0, stdout: '', stderr: '' };
  });
  const bdShow = vi.fn(async () =>
    opts.status === undefined ? { status: 'closed' } : { status: opts.status }
  );
  return { gitRun, bdShow };
}

const INPUT = {
  repo: '/repo',
  target_base: 'main',
  merge_sha: 'deadbeef',
  bead_id: 'UI-1'
};

describe('worker/verify independent completion check', () => {
  test('ok when base is an ancestor of the merge SHA AND bd reads Done', async () => {
    const deps = makeDeps({ ancestor: true, status: 'closed' });
    const v = await createVerifier(deps).verifyMerge(INPUT);
    expect(v.ok).toBe(true);
    expect(v.ancestry).toBe(true);
    expect(v.reason).toBe('ok');
    // Ancestry checked via git merge-base --is-ancestor base merge_sha.
    expect(deps.gitRun).toHaveBeenCalledWith(
      ['merge-base', '--is-ancestor', 'main', 'deadbeef'],
      { cwd: '/repo' }
    );
  });

  test('rejects a merge that does NOT contain the target base', async () => {
    const v = await createVerifier(
      makeDeps({ ancestor: false, status: 'closed' })
    ).verifyMerge(INPUT);
    expect(v.ok).toBe(false);
    expect(v.reason).toBe('base_not_ancestor');
  });

  test('rejects when bd readback is not Done (truth source = bd, not stdout)', async () => {
    const v = await createVerifier(
      makeDeps({ ancestor: true, status: 'in_progress' })
    ).verifyMerge(INPUT);
    expect(v.ok).toBe(false);
    expect(v.reason).toBe('bd_not_done');
    expect(v.bd_status).toBe('in_progress');
  });
});
