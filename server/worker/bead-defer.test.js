import { describe, expect, test, vi } from 'vitest';
import {
  deferOriginRefusal,
  deferredUnblockedIds,
  hasBlocksEdge,
  revivalTargetOf
} from './bead-defer.js';

const PR_URL = 'https://github.com/o/r/pull/7';

describe('deferredUnblockedIds (UI-0d9i §3.3)', () => {
  test('reads each cut dependent once in first-seen order', () => {
    const notes = [
      '사유 한 줄',
      'deferred-unblocked: UI-2',
      '  deferred-unblocked: UI-3  ',
      'deferred-unblocked: UI-2'
    ].join('\n');

    const ids = deferredUnblockedIds(notes);

    expect(ids).toEqual(['UI-2', 'UI-3']);
  });

  test('ignores lines that only mention the prefix mid-sentence', () => {
    const ids = deferredUnblockedIds('see deferred-unblocked: UI-2');

    expect(ids).toEqual([]);
  });

  test('returns nothing for absent notes', () => {
    const ids = deferredUnblockedIds(undefined);

    expect(ids).toEqual([]);
  });
});

describe('deferOriginRefusal (UI-0d9i §3.3, §4)', () => {
  test.each([
    [{ status: 'open', metadata: { pr_url: PR_URL } }, 'not_resolved_with_pr'],
    [
      { status: 'in_progress', metadata: { pr_url: PR_URL } },
      'not_resolved_with_pr'
    ],
    [{ status: 'resolved', metadata: {} }, 'not_resolved_with_pr'],
    [{ status: 'deferred', metadata: { pr_url: PR_URL } }, 'already_deferred'],
    [{ status: 'resolved', metadata: { pr_url: PR_URL } }, null]
  ])('judges %o as %s', (issue, expected) => {
    const refusal = deferOriginRefusal(issue);

    expect(refusal).toBe(expected);
  });
});

describe('hasBlocksEdge', () => {
  test('reads an issue row carrying a blocks dependency_type', () => {
    const rows = [{ id: 'UI-1', dependency_type: 'blocks' }];

    expect(hasBlocksEdge(rows, 'UI-1')).toBe(true);
  });

  test('ignores a non-blocks edge to the same bead', () => {
    const rows = [{ id: 'UI-1', dependency_type: 'discovered-from' }];

    expect(hasBlocksEdge(rows, 'UI-1')).toBe(false);
  });

  test('reads an edge-format row', () => {
    const rows = [{ issue_id: 'UI-2', depends_on_id: 'UI-1', type: 'blocks' }];

    expect(hasBlocksEdge(rows, 'UI-1')).toBe(true);
  });
});

describe('revivalTargetOf (UI-0d9i §3.3)', () => {
  test.each([
    ['OPEN', 'resolved'],
    ['MERGED', 'resolved'],
    ['CLOSED', 'open']
  ])('maps a %s PR to %s', async (state, target) => {
    const read = /** @type {any} */ (vi.fn(async () => ({ ok: true, state })));

    const judged = await revivalTargetOf(
      { metadata: { pr_url: PR_URL } },
      read
    );

    expect(judged).toMatchObject({ ok: true, target, pr_state: state });
    expect(read).toHaveBeenCalledWith('o/r', 7);
  });

  test('maps a bead without pr_url to open without reading a PR', async () => {
    const read = vi.fn();

    const judged = await revivalTargetOf({ metadata: {} }, read);

    expect(judged).toMatchObject({ ok: true, target: 'open', pr_state: null });
    expect(read).not.toHaveBeenCalled();
  });

  test('fails with no target when the PR cannot be read', async () => {
    const read = /** @type {any} */ (
      vi.fn(async () => ({ ok: false, reason: 'gh_failed' }))
    );

    const judged = await revivalTargetOf(
      { metadata: { pr_url: PR_URL } },
      read
    );

    expect(judged).toEqual({
      ok: false,
      reason: 'pr_lookup_failed',
      message: 'gh_failed',
      pr_url: PR_URL
    });
  });

  test('fails when the reader throws', async () => {
    const read = /** @type {any} */ (
      vi.fn(async () => {
        throw new Error('spawn');
      })
    );

    const judged = await revivalTargetOf(
      { metadata: { pr_url: PR_URL } },
      read
    );

    expect(judged).toMatchObject({ ok: false, reason: 'pr_lookup_failed' });
  });

  test('fails when the pinned foreign target cannot be resolved', async () => {
    const read = vi.fn();

    const judged = await revivalTargetOf(
      {
        metadata: {
          pr_url: PR_URL,
          foreign_repo: 'https://github.com/other/target.git',
          foreign_path: '/tmp/other',
          foreign_base: 'main'
        }
      },
      read
    );

    expect(judged).toMatchObject({ ok: false, reason: 'pr_lookup_failed' });
    expect(read).not.toHaveBeenCalled();
  });

  test('reads a pinned foreign PR from its pinned slug', async () => {
    const read = /** @type {any} */ (
      vi.fn(async () => ({ ok: true, state: 'OPEN' }))
    );

    await revivalTargetOf(
      {
        metadata: {
          pr_url: 'https://github.com/other/target/pull/12',
          foreign_repo: 'git@github.com:other/target.git',
          foreign_path: '/tmp/other',
          foreign_base: 'main'
        }
      },
      read
    );

    expect(read).toHaveBeenCalledWith('other/target', 12);
  });

  test('fails on a PR state it does not know', async () => {
    const read = /** @type {any} */ (
      vi.fn(async () => ({ ok: true, state: 'DRAFTED' }))
    );

    const judged = await revivalTargetOf(
      { metadata: { pr_url: PR_URL } },
      read
    );

    expect(judged).toMatchObject({ ok: false, reason: 'pr_lookup_failed' });
  });
});
