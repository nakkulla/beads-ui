import { describe, expect, test, vi } from 'vitest';
import { createVerifier } from './verify.js';

/**
 * @param {{ workTip?: string|null, baseTip?: string|null, ancestor?: boolean, status?: string|null }} opts
 */
function makeDeps(opts) {
  const workTip = opts.workTip === undefined ? 'work0000' : opts.workTip;
  const baseTip = opts.baseTip === undefined ? 'base0000' : opts.baseTip;
  const gitRun = vi.fn(async (args) => {
    if (args[0] === 'rev-parse') {
      const ref = args[args.length - 1];
      if (ref.startsWith('refs/heads/')) {
        return workTip
          ? { code: 0, stdout: `${workTip}\n`, stderr: '' }
          : { code: 1, stdout: '', stderr: '' };
      }
      return baseTip
        ? { code: 0, stdout: `${baseTip}\n`, stderr: '' }
        : { code: 1, stdout: '', stderr: '' };
    }
    if (args[0] === 'merge-base' && args[1] === '--is-ancestor') {
      return { code: opts.ancestor ? 0 : 1, stdout: '', stderr: '' };
    }
    return { code: 0, stdout: '', stderr: '' };
  });
  const bdShow = vi.fn(async () => ({ status: opts.status ?? 'closed' }));
  return { gitRun, bdShow };
}

const INPUT = { repo: '/repo', target_base: 'main', bead_id: 'UI-1' };

describe('worker/verify independent completion check (F5)', () => {
  test('passes when the work branch merged into base AND bd reads closed', async () => {
    const deps = makeDeps({
      workTip: 'aaaa111',
      baseTip: 'bbbb222',
      ancestor: true,
      status: 'closed'
    });
    const v = await createVerifier(deps).verifyMerge(INPUT);
    expect(v.ok).toBe(true);
    expect(v.ancestry).toBe(true);
    expect(v.work_tip).toBe('aaaa111');
    expect(v.reason).toBe('ok');
    // Ancestry is checked WORK-tip vs BASE-tip (not the vacuous base-vs-base).
    expect(deps.gitRun).toHaveBeenCalledWith(
      ['merge-base', '--is-ancestor', 'aaaa111', 'bbbb222'],
      { cwd: '/repo' }
    );
  });

  test('fails (closed) when the work branch is NOT an ancestor of base (unmerged)', async () => {
    const v = await createVerifier(
      makeDeps({ ancestor: false, status: 'closed' })
    ).verifyMerge(INPUT);
    expect(v.ok).toBe(false);
    expect(v.reason).toBe('work_not_in_base');
  });

  test('fails (closed) when the work-branch ref is missing/unresolvable', async () => {
    const deps = makeDeps({ workTip: null, ancestor: true, status: 'closed' });
    const r = await createVerifier(deps).verifyMerge(INPUT);
    expect(r.ok).toBe(false);
    expect(r.work_tip).toBe(null);
    expect(r.reason).toBe('work_tip_unresolved');
    // Ancestry is never even attempted once the work tip is missing.
    expect(deps.gitRun).not.toHaveBeenCalledWith(
      expect.arrayContaining(['merge-base']),
      expect.anything()
    );
  });

  test('fails when bd reads back resolved (resolved is NOT merge proof)', async () => {
    const v = await createVerifier(
      makeDeps({ ancestor: true, status: 'resolved' })
    ).verifyMerge(INPUT);
    expect(v.ok).toBe(false);
    expect(v.reason).toBe('bd_not_closed');
    expect(v.bd_status).toBe('resolved');
  });
});
