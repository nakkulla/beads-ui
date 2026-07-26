import { describe, expect, test } from 'vitest';
import { createPrObservationStore } from './pr-observations.js';

const SHA = 'a'.repeat(40);

/**
 * @param {Partial<import('./gh.js').PrDetail>} [pr]
 * @returns {import('./gh.js').PrDetail}
 */
function prOf(pr = {}) {
  return {
    number: 304,
    url: 'https://github.com/o/r/pull/304',
    state: 'OPEN',
    mergeable: 'MERGEABLE',
    merge_state_status: 'CLEAN',
    head_ref: 'UI-1',
    head_sha: SHA,
    ...pr
  };
}

describe('worker/pr-observations', () => {
  test('returns null for a bead that was never observed', () => {
    const store = createPrObservationStore();

    expect(store.get('/ws', 'UI-1')).toBe(null);
  });

  test('records an observation with its timestamp', () => {
    const store = createPrObservationStore({ now: () => 7000 });

    const entry = store.record('/ws', 'UI-1', { error: null, pr: prOf() });

    expect(entry).toMatchObject({ bead_id: 'UI-1', observed_at: 7000 });
  });

  test('keeps the local verification across a fresh observation pass', () => {
    const store = createPrObservationStore();
    store.recordVerify('/ws', 'UI-1', {
      head_sha: SHA,
      ok: true,
      reason: 'ok',
      at: 1
    });

    store.record('/ws', 'UI-1', { error: null, pr: prOf() });

    expect(store.get('/ws', 'UI-1')?.verify).toMatchObject({ ok: true });
  });

  test('keeps observations of different workspaces apart', () => {
    const store = createPrObservationStore();

    store.record('/a', 'UI-1', { error: 'gh_failed' });

    expect(store.get('/b', 'UI-1')).toBe(null);
  });

  test('resolves workspace keys so writer and reader share one lane', () => {
    const store = createPrObservationStore();

    store.record('/ws/', 'UI-1', { error: 'gh_failed' });

    expect(store.get('/ws', 'UI-1')?.error).toBe('gh_failed');
  });

  test('prune drops beads that left the lane and keeps the rest', () => {
    const store = createPrObservationStore();
    store.record('/ws', 'UI-1', { error: null, pr: prOf() });
    store.record('/ws', 'UI-2', { error: null, pr: prOf() });

    store.prune('/ws', ['UI-2']);

    expect(store.get('/ws', 'UI-1')).toBe(null);
    expect(store.get('/ws', 'UI-2')).not.toBe(null);
  });

  test('snapshot returns every observation of a workspace by bead id', () => {
    const store = createPrObservationStore();
    store.record('/ws', 'UI-1', { error: null, pr: prOf() });

    expect(Object.keys(store.snapshot('/ws'))).toEqual(['UI-1']);
  });

  test('clear loses everything, the way a server restart does', () => {
    const store = createPrObservationStore();
    store.record('/ws', 'UI-1', { error: null, pr: prOf() });

    store.clear();

    expect(store.get('/ws', 'UI-1')).toBe(null);
  });
});
