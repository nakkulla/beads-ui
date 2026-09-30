import { describe, expect, test } from 'vitest';
import { repoOpsStripModel } from './repo-ops-strip.js';

// Moved from the retired `views/worker/lanes.test.js` (UI-dbn6 Phase 4).

describe('repoOpsStripModel (UI-q0uy §4.1)', () => {
  /**
   * @param {Record<string, any>} [patch]
   */
  function card(patch = {}) {
    return {
      operation_id: 'op-1',
      kind: 'deploy',
      state: 'succeeded',
      target_sha: 'c'.repeat(40),
      finished_at: 1000,
      elapsed_ms: 64_000,
      ...patch
    };
  }

  test('renders nothing for a workspace with no repo work at all', () => {
    expect(repoOpsStripModel([], [])).toBeNull();
  });

  test('renders for a workspace whose only state is a stopped cleanup', () => {
    expect(
      repoOpsStripModel([], [{ bead_id: 'UI-a', step: 'child_sweep' }])
    ).not.toBeNull();
  });

  test('takes the newest successful deploy as the current one', () => {
    const model = repoOpsStripModel(
      [
        card({
          operation_id: 'old',
          target_sha: 'a'.repeat(40),
          finished_at: 1
        }),
        card()
      ],
      []
    );

    expect(model?.deploy?.sha).toBe('c'.repeat(7));
  });

  test('ignores a failed deploy when naming the current one', () => {
    const model = repoOpsStripModel(
      [card({ state: 'failed', finished_at: 9999 })],
      []
    );

    expect(model?.deploy).toBeNull();
  });

  test('ignores a verify operation when naming the current deployment', () => {
    const model = repoOpsStripModel([card({ kind: 'verify' })], []);

    expect(model?.deploy).toBeNull();
  });

  test('ignores a post-merge job when naming the current deployment', () => {
    const model = repoOpsStripModel(
      [
        card({
          kind: 'job',
          script_path: 'repo-ops/post-merge.d/010-reindex'
        })
      ],
      []
    );

    expect(model?.deploy).toBeNull();
  });

  test('counts a failed post-merge job into 해결 필요', () => {
    const model = repoOpsStripModel(
      [
        card({
          kind: 'job',
          state: 'failed',
          script_path: 'repo-ops/post-merge.d/010-reindex'
        })
      ],
      []
    );

    expect(model?.badge).toEqual({ tone: 'act', label: '해결 필요 1' });
  });

  test('opens the strip for a cleanup stopped at post_merge_jobs', () => {
    expect(
      repoOpsStripModel([], [{ bead_id: 'UI-a', step: 'post_merge_jobs' }])
    ).not.toBeNull();
  });

  test('counts an unresolved failure and a stopped cleanup together', () => {
    const model = repoOpsStripModel(
      [card({ state: 'failed' })],
      [{ bead_id: 'UI-a', step: 'child_sweep' }]
    );

    expect(model?.unresolved).toBe(2);
  });

  test('drops an acknowledged failure from the tally', () => {
    const model = repoOpsStripModel(
      [card({ state: 'failed', dismissed: { at: 1, by: 'user' } })],
      []
    );

    expect(model?.badge).toEqual({ tone: 'quiet', label: '모두 정상' });
  });

  test('drops a superseded failure from the tally', () => {
    const model = repoOpsStripModel(
      [card({ state: 'failed', superseded_by: 'op-2' })],
      []
    );

    expect(model?.badge).toEqual({ tone: 'quiet', label: '모두 정상' });
  });
});
