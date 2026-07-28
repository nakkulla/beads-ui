import { describe, expect, test, vi } from 'vitest';
import { createLockManager } from './locks.js';
import { createReviseDisposition } from './revise-disposition.js';

const OLD_SHA = 'a'.repeat(40);
const TIP_SHA = 'b'.repeat(40);
const FIX_SHA = 'c'.repeat(40);

/**
 * @param {Partial<Record<string, any>>} [over]
 */
function harness(over = {}) {
  /** @type {any} */
  const observation = {
    attempt_id: 'a1',
    repo: '/repo',
    target_base: 'main',
    session_id: 'sess-1',
    receipt: `codex@${OLD_SHA}`,
    notes_tail: 'findings',
    at: 0
  };
  const parked = {
    verify: vi.fn(async () => ({ ok: true, observation })),
    invalidate: vi.fn(),
    observeFor: vi.fn(() => ({})),
    setOnFilled: vi.fn(),
    clear: vi.fn()
  };
  const store = {
    snapshot: vi.fn(() => ({ revision: 0, queue: [], attempts: {} })),
    setAutoAdvance: vi.fn()
  };
  /** @type {any[]} */
  const bd_writes = [];
  let issue = {
    status: 'blocked',
    metadata: {
      spec_review: `codex@${OLD_SHA}`,
      blocked_reason: 'spec_review_stale:revise'
    }
  };
  const bd = {
    readIssue: vi.fn(async () => issue),
    updateFields: vi.fn(
      async (/** @type {string} */ id, /** @type {any} */ f) => {
        bd_writes.push({ id, ...f });
        issue = {
          status: f.status || issue.status,
          metadata: {
            ...issue.metadata,
            ...(f.set || {})
          }
        };
        for (const key of f.unset || []) {
          delete /** @type {any} */ (issue.metadata)[key];
        }
      }
    )
  };
  const scheduler = {
    dispatchReviseFix: vi.fn(async () => ({ ok: true, attempt_id: 'a2' }))
  };
  const gitRun = vi.fn(async (/** @type {string[]} */ args) => {
    if (args[0] === 'rev-parse') {
      return { code: 0, stdout: `${TIP_SHA}\n`, stderr: '' };
    }
    if (args[0] === 'fetch') {
      return { code: 0, stdout: '', stderr: '' };
    }
    if (args[0] === 'merge-base') {
      return { code: 0, stdout: '', stderr: '' };
    }
    return { code: 1, stdout: '', stderr: 'unexpected' };
  });
  const deps = {
    workspace: '/ws',
    repo: '/repo',
    store,
    bd,
    parked,
    scheduler,
    locks: createLockManager(),
    gitRun,
    notifyChanged: vi.fn(),
    now: () => 0,
    ...over
  };
  return {
    deps,
    parked,
    store,
    bd,
    bd_writes,
    scheduler,
    gitRun,
    observation,
    /** @param {Record<string, any>} next */
    setIssue(next) {
      issue = /** @type {any} */ (next);
    },
    disposition: createReviseDisposition(/** @type {any} */ (deps))
  };
}

describe('revise disposition — fix', () => {
  test('dispatches the repair session for a verified park', async () => {
    const h = harness();

    const result = await h.disposition.fix('UI-1');

    expect(result).toMatchObject({ ok: true, attempt_id: 'a2' });
    expect(h.scheduler.dispatchReviseFix).toHaveBeenCalledWith('/ws', {
      bead_id: 'UI-1',
      attempt_id: 'a1',
      prompt: expect.stringContaining('finding 수용')
    });
  });

  test('refuses a bead the click-time re-verification no longer finds parked', async () => {
    const h = harness();
    h.parked.verify.mockResolvedValueOnce(
      /** @type {any} */ ({ ok: false, reason: 'not_parked' })
    );

    const result = await h.disposition.fix('UI-1');

    expect(result).toEqual({ ok: false, reason: 'not_parked' });
    expect(h.scheduler.dispatchReviseFix).not.toHaveBeenCalled();
  });

  test('a second click while a fix is in flight is refused', async () => {
    const h = harness();

    await h.disposition.fix('UI-1');
    const second = await h.disposition.fix('UI-1');

    expect(second).toEqual({ ok: false, reason: 'action_in_flight' });
    expect(h.scheduler.dispatchReviseFix).toHaveBeenCalledTimes(1);
  });

  test('an approve click while a fix holds the bead is refused too', async () => {
    const h = harness();

    await h.disposition.fix('UI-1');
    const approve = await h.disposition.approve('UI-1');

    expect(approve).toEqual({ ok: false, reason: 'action_in_flight' });
    expect(h.bd.updateFields).not.toHaveBeenCalled();
  });

  test('a fix for another bead is refused while the repo lease is held', async () => {
    const h = harness();

    await h.disposition.fix('UI-1');
    const other = await h.disposition.fix('UI-2');

    expect(other).toEqual({ ok: false, reason: 'lease_busy' });
    expect(h.scheduler.dispatchReviseFix).toHaveBeenCalledTimes(1);
  });

  test('a failed dispatch releases the lease so the next click can run', async () => {
    const h = harness();
    h.scheduler.dispatchReviseFix.mockResolvedValueOnce(
      /** @type {any} */ ({ ok: false, reason: 'bead_running' })
    );

    const first = await h.disposition.fix('UI-1');
    const second = await h.disposition.fix('UI-1');

    expect(first).toEqual({ ok: false, reason: 'bead_running' });
    expect(second).toMatchObject({ ok: true });
  });
});

describe('revise disposition — completion verdict', () => {
  test('accepts a refreshed receipt that is unblocked and published', async () => {
    const h = harness();
    await h.disposition.fix('UI-1');
    h.setIssue({
      status: 'open',
      metadata: { spec_review: `skipped@${FIX_SHA}` }
    });

    const result = await h.disposition.complete({ bead_id: 'UI-1' });

    expect(result).toEqual({ ok: true });
    expect(h.store.setAutoAdvance).toHaveBeenCalledWith('/ws', true);
  });

  test('rejects a session that never refreshed the receipt', async () => {
    const h = harness();
    await h.disposition.fix('UI-1');
    h.setIssue({
      status: 'open',
      metadata: { spec_review: `codex@${OLD_SHA}` }
    });

    const result = await h.disposition.complete({ bead_id: 'UI-1' });

    expect(result).toEqual({ ok: false, reason: 'receipt_not_refreshed' });
    expect(h.store.setAutoAdvance).not.toHaveBeenCalled();
  });

  test('rejects a bead still carrying the park', async () => {
    const h = harness();
    await h.disposition.fix('UI-1');
    h.setIssue({
      status: 'blocked',
      metadata: {
        spec_review: `skipped@${FIX_SHA}`,
        blocked_reason: 'spec_review_stale:revise'
      }
    });

    const result = await h.disposition.complete({ bead_id: 'UI-1' });

    expect(result).toEqual({ ok: false, reason: 'still_blocked' });
  });

  test('rejects a receipt commit that is not published on the base upstream', async () => {
    const h = harness();
    h.gitRun.mockImplementation(async (/** @type {string[]} */ args) =>
      args[0] === 'merge-base'
        ? { code: 1, stdout: '', stderr: '' }
        : { code: 0, stdout: `${TIP_SHA}\n`, stderr: '' }
    );
    await h.disposition.fix('UI-1');
    h.setIssue({
      status: 'open',
      metadata: { spec_review: `skipped@${FIX_SHA}` }
    });

    const result = await h.disposition.complete({ bead_id: 'UI-1' });

    expect(result).toEqual({ ok: false, reason: 'receipt_not_published' });
  });

  test('releases the lease whatever the verdict', async () => {
    const h = harness();
    await h.disposition.fix('UI-1');
    h.setIssue({
      status: 'open',
      metadata: { spec_review: `codex@${OLD_SHA}` }
    });

    await h.disposition.complete({ bead_id: 'UI-1' });
    const again = await h.disposition.fix('UI-1');

    expect(again).toMatchObject({ ok: true });
  });
});

describe('revise disposition — approve', () => {
  test('writes the receipt, lineage, status and unblock in ONE bd update', async () => {
    const h = harness();

    const result = await h.disposition.approve('UI-1');

    expect(result).toMatchObject({ ok: true, sha: TIP_SHA });
    expect(h.bd.updateFields).toHaveBeenCalledTimes(1);
    expect(h.bd_writes[0]).toMatchObject({
      id: 'UI-1',
      set: { spec_review: `skipped@${TIP_SHA}` },
      unset: ['blocked_reason'],
      status: 'open'
    });
    expect(h.bd_writes[0].append_notes).toContain(`codex@${OLD_SHA}`);
  });

  test('resumes auto_advance on success', async () => {
    const h = harness();

    await h.disposition.approve('UI-1');

    expect(h.store.setAutoAdvance).toHaveBeenCalledWith('/ws', true);
  });

  test('dispatches no session at all', async () => {
    const h = harness();

    await h.disposition.approve('UI-1');

    expect(h.scheduler.dispatchReviseFix).not.toHaveBeenCalled();
  });

  test('refuses when the target base tip cannot be resolved', async () => {
    const h = harness();
    h.gitRun.mockResolvedValue(
      /** @type {any} */ ({ code: 1, stdout: '', stderr: '' })
    );

    const result = await h.disposition.approve('UI-1');

    expect(result).toEqual({ ok: false, reason: 'base_rev_unavailable' });
    expect(h.bd.updateFields).not.toHaveBeenCalled();
  });

  test('reports a bd write failure without claiming success', async () => {
    const h = harness();
    h.bd.updateFields.mockRejectedValueOnce(new Error('bd down'));

    const result = await h.disposition.approve('UI-1');

    expect(result).toEqual({ ok: false, reason: 'bd_error' });
    expect(h.store.setAutoAdvance).not.toHaveBeenCalled();
  });

  test('refuses a readback that does not echo the new receipt', async () => {
    const h = harness();
    h.bd.updateFields.mockImplementation(async () => {});

    const result = await h.disposition.approve('UI-1');

    expect(result).toEqual({ ok: false, reason: 'receipt_not_refreshed' });
  });

  test('a second approve click after the first finished is allowed to run', async () => {
    const h = harness();

    await h.disposition.approve('UI-1');
    h.parked.verify.mockResolvedValueOnce(
      /** @type {any} */ ({ ok: false, reason: 'not_parked' })
    );
    const second = await h.disposition.approve('UI-1');

    expect(second).toEqual({ ok: false, reason: 'not_parked' });
  });
});
