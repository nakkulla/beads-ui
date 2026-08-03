import { beforeEach, describe, expect, test, vi } from 'vitest';
import { runBdJson } from './bd.js';
import {
  fetchListForSubscription,
  mapSubscriptionToBdArgs
} from './list-adapters.js';
import { enrichIssuesWorkflow } from './workflow-enrich.js';

vi.mock('./bd.js', () => ({ runBdJson: vi.fn() }));
vi.mock('./workflow-enrich.js', () => ({
  enrichIssuesWorkflow: vi.fn((items) => items)
}));

describe('list adapters for subscription types', () => {
  beforeEach(() => {
    /** @type {import('vitest').Mock} */ (runBdJson).mockReset();
  });

  test('mapSubscriptionToBdArgs returns args for all-issues', () => {
    const args = mapSubscriptionToBdArgs({ type: 'all-issues' });
    expect(args).toEqual(['list', '--json', '--tree=false']);
  });

  test('mapSubscriptionToBdArgs returns args for blocked-issues', () => {
    const args = mapSubscriptionToBdArgs({ type: 'blocked-issues' });
    expect(args).toEqual([
      'list',
      '--json',
      '--tree=false',
      '--status',
      'blocked',
      '--limit',
      '1000'
    ]);
  });

  test('mapSubscriptionToBdArgs returns args for ready-issues', () => {
    const args = mapSubscriptionToBdArgs({ type: 'ready-issues' });
    expect(args).toEqual(['ready', '--limit', '1000', '--json']);
  });

  test('mapSubscriptionToBdArgs returns args for in-progress-issues', () => {
    const args = mapSubscriptionToBdArgs({ type: 'in-progress-issues' });
    expect(args).toEqual([
      'list',
      '--json',
      '--tree=false',
      '--status',
      'in_progress'
    ]);
  });

  test('mapSubscriptionToBdArgs returns args for closed-issues', () => {
    const args = mapSubscriptionToBdArgs({ type: 'closed-issues' });
    expect(args).toEqual([
      'list',
      '--json',
      '--tree=false',
      '--status',
      'closed',
      '--limit',
      '0'
    ]);
  });

  test('mapSubscriptionToBdArgs pushes a since range down as --closed-after', () => {
    const since = Date.parse('2026-08-03T00:00:00.000Z');

    const args = mapSubscriptionToBdArgs({
      type: 'closed-issues',
      params: { since }
    });

    expect(args).toEqual([
      'list',
      '--json',
      '--tree=false',
      '--status',
      'closed',
      '--limit',
      '0',
      '--closed-after',
      new Date(since - 1000).toISOString()
    ]);
  });

  test('mapSubscriptionToBdArgs ignores a non-positive since', () => {
    const args = mapSubscriptionToBdArgs({
      type: 'closed-issues',
      params: { since: 0 }
    });

    expect(args).toEqual([
      'list',
      '--json',
      '--tree=false',
      '--status',
      'closed',
      '--limit',
      '0'
    ]);
  });

  test('mapSubscriptionToBdArgs returns args for resolved-issues', () => {
    const args = mapSubscriptionToBdArgs({ type: 'resolved-issues' });
    expect(args).toEqual([
      'list',
      '--json',
      '--tree=false',
      '--status',
      'resolved',
      '--limit',
      '1000'
    ]);
  });

  test('mapSubscriptionToBdArgs returns args for deferred-issues', () => {
    const args = mapSubscriptionToBdArgs({ type: 'deferred-issues' });
    expect(args).toEqual([
      'list',
      '--json',
      '--tree=false',
      '--status',
      'deferred',
      '--limit',
      '1000'
    ]);
  });

  test('mapSubscriptionToBdArgs returns args for issue-detail', () => {
    const args = mapSubscriptionToBdArgs({
      type: 'issue-detail',
      params: { id: 'UI-123' }
    });
    expect(args).toEqual(['show', 'UI-123', '--json']);
  });

  test('fetchListForSubscription returns normalized items (Date.parse)', async () => {
    /** @type {import('vitest').Mock} */ (runBdJson).mockResolvedValue({
      code: 0,
      stdoutJson: [
        {
          id: 'A-1',
          updated_at: '2024-01-01T00:00:00.000Z',
          closed_at: null,
          extra: 'x'
        },
        {
          id: 'A-2',
          updated_at: '2024-01-01T00:00:01.000Z',
          closed_at: '2024-01-01T00:00:05.000Z'
        },
        { id: 3, updated_at: 'not-a-date' }
      ]
    });
    const res = await fetchListForSubscription({ type: 'all-issues' });
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.items.length).toBe(3);
      expect(res.items[0]).toMatchObject({
        id: 'A-1',
        updated_at: Date.parse('2024-01-01T00:00:00.000Z'),
        closed_at: null
      });
      expect(res.items[1]).toMatchObject({
        id: 'A-2',
        updated_at: Date.parse('2024-01-01T00:00:01.000Z'),
        closed_at: Date.parse('2024-01-01T00:00:05.000Z')
      });
      // id coerced to string, closed_at defaults to null
      expect(res.items[2]).toMatchObject({
        id: '3',
        updated_at: 0,
        closed_at: null
      });
    }
  });

  test('returns stored and dependency-blocked issues for blocked subscription', async () => {
    /** @type {import('vitest').Mock} */ (runBdJson)
      .mockResolvedValueOnce({
        code: 0,
        stdoutJson: [
          {
            id: 'S-1',
            title: 'stored blocked',
            status: 'blocked',
            updated_at: '2024-01-01T00:00:00.000Z'
          }
        ]
      })
      .mockResolvedValueOnce({
        code: 0,
        stdoutJson: {
          ready: [],
          blocked: [
            {
              id: 'D-1',
              title: 'dependency blocked',
              status: 'open',
              updated_at: '2024-01-01T00:00:01.000Z',
              blocked_by: [{ id: 'D-0', status: 'in_progress' }]
            }
          ],
          summary: { total_ready: 0, total_blocked: 1 }
        }
      });

    const res = await fetchListForSubscription({ type: 'blocked-issues' });

    // stored list + dependency explain + the provenance batch dep list.
    expect(runBdJson).toHaveBeenCalledTimes(3);
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.items.map((it) => it.id)).toEqual(['S-1', 'D-1']);
      expect(res.items[1]).toMatchObject({
        id: 'D-1',
        status: 'open',
        blocked_by: [{ id: 'D-0', status: 'in_progress' }]
      });
    }
  });

  test('fetchListForSubscription surfaces bd error', async () => {
    /** @type {import('vitest').Mock} */ (runBdJson).mockResolvedValue({
      code: 2,
      stderr: 'boom'
    });
    const res = await fetchListForSubscription({ type: 'all-issues' });
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.error.code).toBe('bd_error');
      expect(res.error.message).toContain('boom');
      expect(res.error.details && res.error.details.exit_code).toBe(2);
    }
  });

  test('fetchListForSubscription treats unsupported resolved status as empty', async () => {
    /** @type {import('vitest').Mock} */ (runBdJson).mockResolvedValue({
      code: 1,
      stderr:
        'invalid status "resolved" (valid: open, in_progress, blocked, deferred, closed)'
    });

    const res = await fetchListForSubscription({ type: 'resolved-issues' });

    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.items).toEqual([]);
    }
  });

  test('fetchListForSubscription returns error for unknown type', async () => {
    const res = await fetchListForSubscription(
      /** @type {any} */ ({ type: 'unknown' })
    );
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.error.code).toBe('bad_request');
      expect(res.error.message).toMatch(/Unknown subscription type/);
    }
  });
});

describe('blocked-issues blocked_info derivation', () => {
  beforeEach(() => {
    /** @type {import('vitest').Mock} */ (runBdJson).mockReset();
  });

  /**
   * @param {unknown[]} stored
   * @param {unknown[]} dependency_blocked
   */
  function mockBlockedSources(stored, dependency_blocked) {
    /** @type {import('vitest').Mock} */ (runBdJson)
      .mockResolvedValueOnce({ code: 0, stdoutJson: stored })
      .mockResolvedValueOnce({
        code: 0,
        stdoutJson: { ready: [], blocked: dependency_blocked }
      })
      .mockResolvedValueOnce({ code: 0, stdoutJson: [] });
  }

  /**
   * @param {Awaited<ReturnType<typeof fetchListForSubscription>>} res
   * @param {string} id
   * @returns {any}
   */
  function blockedInfoOf(res, id) {
    if (!res.ok) {
      throw new Error('expected a successful fetch');
    }
    const item = res.items.find((it) => it.id === id);
    return item && /** @type {any} */ (item).blocked_info;
  }

  test('marks a stored-only blocked issue as external with no blockers', async () => {
    mockBlockedSources([{ id: 'S-1', status: 'blocked' }], []);

    const res = await fetchListForSubscription({ type: 'blocked-issues' });

    expect(blockedInfoOf(res, 'S-1')).toEqual({
      external: true,
      reason: null,
      blockers: []
    });
  });

  test('carries metadata.blocked_reason on a stored blocked issue', async () => {
    mockBlockedSources(
      [
        {
          id: 'S-1',
          status: 'blocked',
          metadata: { blocked_reason: 'upstream 릴리스 대기' }
        }
      ],
      []
    );

    const res = await fetchListForSubscription({ type: 'blocked-issues' });

    expect(blockedInfoOf(res, 'S-1').reason).toBe('upstream 릴리스 대기');
  });

  test('marks a dependency-only blocked issue as non-external with blockers', async () => {
    mockBlockedSources(
      [],
      [
        {
          id: 'D-1',
          status: 'open',
          blocked_by: [{ id: 'D-0' }, { id: 'D-9' }]
        }
      ]
    );

    const res = await fetchListForSubscription({ type: 'blocked-issues' });

    expect(blockedInfoOf(res, 'D-1')).toEqual({
      external: false,
      reason: null,
      blockers: ['D-0', 'D-9']
    });
  });

  test('preserves both sources when an issue is blocked in both ways', async () => {
    mockBlockedSources(
      [
        {
          id: 'B-1',
          status: 'blocked',
          metadata: { blocked_reason: '보안 검토 대기' }
        }
      ],
      [{ id: 'B-1', status: 'blocked', blocked_by: [{ id: 'B-0' }] }]
    );

    const res = await fetchListForSubscription({ type: 'blocked-issues' });

    expect(blockedInfoOf(res, 'B-1')).toEqual({
      external: true,
      reason: '보안 검토 대기',
      blockers: ['B-0']
    });
  });

  test('ignores blocked_reason on a dependency-only blocked issue', async () => {
    mockBlockedSources(
      [],
      [
        {
          id: 'D-1',
          status: 'open',
          metadata: { blocked_reason: '남은 값' },
          blocked_by: [{ id: 'D-0' }]
        }
      ]
    );

    const res = await fetchListForSubscription({ type: 'blocked-issues' });

    expect(blockedInfoOf(res, 'D-1').reason).toBeNull();
  });

  test('treats a blank blocked_reason as absent', async () => {
    mockBlockedSources(
      [{ id: 'S-1', status: 'blocked', metadata: { blocked_reason: '   ' } }],
      []
    );

    const res = await fetchListForSubscription({ type: 'blocked-issues' });

    expect(blockedInfoOf(res, 'S-1').reason).toBeNull();
  });
});

describe('closed-issues range filtering before enrichment', () => {
  const SINCE = Date.parse('2026-08-03T00:00:00.000Z');

  beforeEach(() => {
    /** @type {import('vitest').Mock} */ (runBdJson).mockReset();
    /** @type {import('vitest').Mock} */ (enrichIssuesWorkflow).mockClear();
  });

  /**
   * Two closed issues, one inside the `since` range and one outside it.
   */
  function mockClosedListThenDeps() {
    /** @type {import('vitest').Mock} */ (runBdJson)
      .mockResolvedValueOnce({
        code: 0,
        stdoutJson: [
          { id: 'C-1', closed_at: '2026-08-03T01:00:00.000Z' },
          { id: 'C-2', closed_at: '2026-08-01T01:00:00.000Z' }
        ]
      })
      .mockResolvedValueOnce({ code: 0, stdoutJson: [] });
  }

  test('keeps out-of-range issues out of workflow enrichment', async () => {
    mockClosedListThenDeps();

    await fetchListForSubscription({
      type: 'closed-issues',
      params: { since: SINCE }
    });

    const enriched = /** @type {import('vitest').Mock} */ (enrichIssuesWorkflow)
      .mock.calls[0][0];
    expect(enriched.map((/** @type {any} */ it) => it.id)).toEqual(['C-1']);
  });

  test('keeps out-of-range issues out of the provenance dep list', async () => {
    mockClosedListThenDeps();

    await fetchListForSubscription({
      type: 'closed-issues',
      params: { since: SINCE }
    });

    expect(
      /** @type {import('vitest').Mock} */ (runBdJson).mock.calls[1][0]
    ).toEqual(['dep', 'list', 'C-1', '--json']);
  });

  test('returns only the in-range issues', async () => {
    mockClosedListThenDeps();

    const res = await fetchListForSubscription({
      type: 'closed-issues',
      params: { since: SINCE }
    });

    expect(res.ok && res.items.map((it) => it.id)).toEqual(['C-1']);
  });

  test('leaves other subscription types unfiltered', async () => {
    mockClosedListThenDeps();

    const res = await fetchListForSubscription({ type: 'all-issues' });

    expect(res.ok && res.items.map((it) => it.id)).toEqual(['C-1', 'C-2']);
  });
});

describe('from_id provenance derivation', () => {
  beforeEach(() => {
    /** @type {import('vitest').Mock} */ (runBdJson).mockReset();
  });

  /**
   * @param {unknown[]} issues
   * @param {unknown} dep_result
   */
  function mockListThenDeps(issues, dep_result) {
    /** @type {import('vitest').Mock} */ (runBdJson)
      .mockResolvedValueOnce({ code: 0, stdoutJson: issues })
      .mockResolvedValueOnce(dep_result);
  }

  test('attaches the discovered-from origin from a batch payload', async () => {
    mockListThenDeps([{ id: 'A-1' }, { id: 'A-2' }], {
      code: 0,
      stdoutJson: [
        { issue_id: 'A-2', depends_on_id: 'A-0', type: 'discovered-from' }
      ]
    });

    const res = await fetchListForSubscription({ type: 'all-issues' });

    expect(res.ok && res.items[1].from_id).toBe('A-0');
  });

  test('attaches the origin from the single-id payload shape', async () => {
    // bd answers a one-id request with the full TARGET issue plus a
    // `dependency_type`, not a bare edge — a one-card column hits this shape.
    mockListThenDeps([{ id: 'A-1' }], {
      code: 0,
      stdoutJson: [
        { id: 'A-0', title: 'origin', dependency_type: 'discovered-from' }
      ]
    });

    const res = await fetchListForSubscription({ type: 'all-issues' });

    expect(res.ok && res.items[0].from_id).toBe('A-0');
  });

  test('ignores non-provenance edges in the single-id payload shape', async () => {
    mockListThenDeps([{ id: 'A-1' }], {
      code: 0,
      stdoutJson: [
        { id: 'A-9', title: 'parent', dependency_type: 'parent-child' },
        { id: 'A-8', title: 'blocker', dependency_type: 'blocks' }
      ]
    });

    const res = await fetchListForSubscription({ type: 'all-issues' });

    expect(res.ok && 'from_id' in res.items[0]).toBe(false);
  });

  test('queries every listed id in one batch dep list call', async () => {
    mockListThenDeps([{ id: 'A-1' }, { id: 'A-2' }], {
      code: 0,
      stdoutJson: []
    });

    await fetchListForSubscription({ type: 'all-issues' });

    expect(
      /** @type {import('vitest').Mock} */ (runBdJson).mock.calls[1][0]
    ).toEqual(['dep', 'list', 'A-1', 'A-2', '--json']);
  });

  test('reads the origin from depends_on_id, not issue_id', async () => {
    mockListThenDeps([{ id: 'A-1' }, { id: 'A-2' }], {
      code: 0,
      stdoutJson: [
        { issue_id: 'A-1', depends_on_id: 'A-0', type: 'discovered-from' }
      ]
    });

    const res = await fetchListForSubscription({ type: 'all-issues' });

    expect(res.ok && res.items[0].from_id).toBe('A-0');
  });

  test('ignores non-discovered-from edges in a batch payload', async () => {
    mockListThenDeps([{ id: 'A-1' }, { id: 'A-2' }], {
      code: 0,
      stdoutJson: [
        { issue_id: 'A-1', depends_on_id: 'A-0', type: 'blocks' },
        { issue_id: 'A-1', depends_on_id: 'A-9', type: 'parent-child' }
      ]
    });

    const res = await fetchListForSubscription({ type: 'all-issues' });

    expect(res.ok && 'from_id' in res.items[0]).toBe(false);
  });

  test('keeps the first origin when an issue has several', async () => {
    mockListThenDeps([{ id: 'A-1' }, { id: 'A-2' }], {
      code: 0,
      stdoutJson: [
        { issue_id: 'A-1', depends_on_id: 'A-0', type: 'discovered-from' },
        { issue_id: 'A-1', depends_on_id: 'A-7', type: 'discovered-from' }
      ]
    });

    const res = await fetchListForSubscription({ type: 'all-issues' });

    expect(res.ok && res.items[0].from_id).toBe('A-0');
  });

  test('leaves issues untouched when the dep list call fails', async () => {
    mockListThenDeps([{ id: 'A-1' }], { code: 2, stderr: 'boom' });

    const res = await fetchListForSubscription({ type: 'all-issues' });

    expect(res.ok).toBe(true);
    expect(res.ok && 'from_id' in res.items[0]).toBe(false);
  });

  test('leaves issues untouched when the dep list call throws', async () => {
    /** @type {import('vitest').Mock} */ (runBdJson)
      .mockResolvedValueOnce({ code: 0, stdoutJson: [{ id: 'A-1' }] })
      .mockRejectedValueOnce(new Error('spawn failed'));

    const res = await fetchListForSubscription({ type: 'all-issues' });

    expect(res.ok).toBe(true);
    expect(res.ok && 'from_id' in res.items[0]).toBe(false);
  });

  test('skips the dep list call for an empty list', async () => {
    /** @type {import('vitest').Mock} */ (runBdJson).mockResolvedValueOnce({
      code: 0,
      stdoutJson: []
    });

    await fetchListForSubscription({ type: 'all-issues' });

    expect(runBdJson).toHaveBeenCalledTimes(1);
  });
});
