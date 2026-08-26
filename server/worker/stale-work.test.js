import { describe, expect, test } from 'vitest';
import { staleResidueIntact } from './stale-work.js';

const IDENTITY = {
  worktree_realpath: '/repo/.worktrees/UI-1',
  branch: 'UI-1',
  head_sha: 'a'.repeat(40),
  branch_head_sha: 'a'.repeat(40),
  base_oid: 'b'.repeat(40),
  status_digest: 'status-1'
};

/**
 * @param {Record<string, unknown>} overrides
 */
function observation(overrides = {}) {
  return { state: 'unique', owned: true, identity: IDENTITY, ...overrides };
}

describe('staleResidueIntact', () => {
  test('accepts a matching residue with unique content', () => {
    expect(staleResidueIntact(IDENTITY, observation())).toBe(true);
  });

  test('accepts a clean residue promoted by a resumable session', () => {
    expect(
      staleResidueIntact(IDENTITY, observation({ state: 'discardable' }))
    ).toBe(true);
    expect(
      staleResidueIntact(IDENTITY, observation({ state: 'base_contained' }))
    ).toBe(true);
  });

  test('refuses a residue whose observation failed', () => {
    expect(
      staleResidueIntact(IDENTITY, observation({ state: 'unknown' }))
    ).toBe(false);
  });

  test('refuses a residue that is gone', () => {
    expect(staleResidueIntact(IDENTITY, observation({ state: 'absent' }))).toBe(
      false
    );
  });

  test('refuses a residue we do not own', () => {
    expect(staleResidueIntact(IDENTITY, observation({ owned: false }))).toBe(
      false
    );
  });

  test('refuses a residue whose working content moved', () => {
    const moved = { ...IDENTITY, status_digest: 'status-2' };

    expect(staleResidueIntact(IDENTITY, observation({ identity: moved }))).toBe(
      false
    );
  });

  test('refuses an observation carrying no identity', () => {
    expect(staleResidueIntact(IDENTITY, observation({ identity: null }))).toBe(
      false
    );
  });
});
