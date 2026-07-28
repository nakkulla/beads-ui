import { describe, expect, test, vi } from 'vitest';
import {
  createReviseParkedStore,
  reviseParkedCandidates
} from './revise-parked.js';

/**
 * @param {Partial<Record<string, any>>} [over]
 * @returns {Record<string, any>}
 */
function parkedQueue(over = {}) {
  return {
    queue: [{ bead_id: 'UI-1' }],
    attempts: {
      a1: {
        attempt_id: 'a1',
        bead_id: 'UI-1',
        status: 'failed',
        spec_review_stale: true,
        repo: '/repo',
        target_base: 'main',
        session_id: 'sess-1'
      }
    },
    ...over
  };
}

/**
 * @param {Record<string, any>} issue
 * @returns {(args: string[], options?: any) => Promise<any>}
 */
function bdReturning(issue) {
  return vi.fn(async () => ({ code: 0, stdoutJson: issue }));
}

const PARKED_ISSUE = {
  id: 'UI-1',
  status: 'blocked',
  notes: 'findings: 스펙 §3 누락',
  metadata: {
    blocked_reason: 'spec_review_stale:revise',
    spec_review: 'codex@' + 'a'.repeat(40)
  }
};

describe('reviseParkedCandidates', () => {
  test('selects a queued bead whose latest leaf attempt failed stale', () => {
    const found = reviseParkedCandidates(parkedQueue());

    expect(found.map((c) => c.bead_id)).toEqual(['UI-1']);
  });

  test('ignores a bead that left the waiting lane', () => {
    const found = reviseParkedCandidates(parkedQueue({ queue: [] }));

    expect(found).toEqual([]);
  });

  test('ignores a failed attempt without the stale flag', () => {
    const q = parkedQueue();
    q.attempts.a1.spec_review_stale = false;

    expect(reviseParkedCandidates(q)).toEqual([]);
  });

  test('ignores an attempt that was already resumed', () => {
    const q = parkedQueue();
    q.attempts.a2 = {
      attempt_id: 'a2',
      bead_id: 'UI-1',
      status: 'running',
      resumed_from: 'a1'
    };

    expect(reviseParkedCandidates(q)).toEqual([]);
  });
});

describe('createReviseParkedStore', () => {
  test('observeFor returns nothing on the first pass and fills asynchronously', async () => {
    const runJson = bdReturning(PARKED_ISSUE);
    const store = createReviseParkedStore({ runJson });
    const filled = vi.fn();
    store.setOnFilled(filled);

    const first = store.observeFor('/ws', parkedQueue());
    await vi.waitFor(() => expect(filled).toHaveBeenCalled());
    const second = store.observeFor('/ws', parkedQueue());

    expect(first).toEqual({});
    expect(second['UI-1']).toMatchObject({
      attempt_id: 'a1',
      repo: '/repo',
      target_base: 'main',
      session_id: 'sess-1',
      receipt: 'codex@' + 'a'.repeat(40)
    });
  });

  test('caches a non-parked verdict so the next snapshot re-queries nothing', async () => {
    const runJson = bdReturning({ id: 'UI-1', status: 'open', metadata: {} });
    const store = createReviseParkedStore({ runJson });

    store.observeFor('/ws', parkedQueue());
    await vi.waitFor(() => expect(runJson).toHaveBeenCalledTimes(1));
    const second = store.observeFor('/ws', parkedQueue());

    expect(second).toEqual({});
    expect(runJson).toHaveBeenCalledTimes(1);
  });

  test('verify re-runs the whole judgment and reports the observation', async () => {
    const store = createReviseParkedStore({
      runJson: bdReturning(PARKED_ISSUE)
    });

    const result = await store.verify('/ws', parkedQueue(), 'UI-1');

    expect(result).toMatchObject({ ok: true });
    expect(/** @type {any} */ (result).observation.notes_tail).toContain(
      'findings'
    );
  });

  test('verify refuses a bead bd no longer reports as parked', async () => {
    const store = createReviseParkedStore({
      runJson: bdReturning({
        id: 'UI-1',
        status: 'open',
        metadata: { spec_review: 'codex@' + 'b'.repeat(40) }
      })
    });

    const result = await store.verify('/ws', parkedQueue(), 'UI-1');

    expect(result).toEqual({ ok: false, reason: 'not_parked' });
  });

  test('verify refuses a bead that fails conditions 1-2 without querying bd', async () => {
    const runJson = bdReturning(PARKED_ISSUE);
    const store = createReviseParkedStore({ runJson });

    const result = await store.verify(
      '/ws',
      parkedQueue({ queue: [] }),
      'UI-1'
    );

    expect(result).toEqual({ ok: false, reason: 'not_parked' });
    expect(runJson).not.toHaveBeenCalled();
  });

  test('verify reports a bd failure as a refusal, never as a pass', async () => {
    const store = createReviseParkedStore({
      runJson: vi.fn(async () => ({ code: 1, stderr: 'bd down' }))
    });

    const result = await store.verify('/ws', parkedQueue(), 'UI-1');

    expect(result).toEqual({ ok: false, reason: 'bd_error' });
  });

  test('invalidate drops the cached verdict so the next pass re-observes', async () => {
    const runJson = bdReturning(PARKED_ISSUE);
    const store = createReviseParkedStore({ runJson });
    const filled = vi.fn();
    store.setOnFilled(filled);

    store.observeFor('/ws', parkedQueue());
    await vi.waitFor(() => expect(filled).toHaveBeenCalledTimes(1));
    store.invalidate('/ws', 'UI-1');
    store.observeFor('/ws', parkedQueue());

    await vi.waitFor(() => expect(runJson).toHaveBeenCalledTimes(2));
  });
});
