import { describe, expect, test, vi } from 'vitest';
import { resolvePrReviewTarget } from './pr-target-resolver.js';

describe('resolvePrReviewTarget', () => {
  test('returns explicit pr number without lookup', async () => {
    const read_issue_pull_requests_impl = vi.fn();

    const target = await resolvePrReviewTarget({
      issueId: 'UI-qclw',
      prNumber: 42,
      workspace: '/repo',
      read_issue_pull_requests_impl
    });

    expect(target.prNumber).toBe(42);
    expect(read_issue_pull_requests_impl).not.toHaveBeenCalled();
  });

  test('rejects issue-only pr-review when no open PR exists', async () => {
    await expect(
      resolvePrReviewTarget({
        issueId: 'UI-qclw',
        workspace: '/repo',
        read_issue_pull_requests_impl: async () => ({ items: [] })
      })
    ).rejects.toMatchObject({ code: 'unprocessable' });
  });

  test('rejects issue-only pr-review when multiple open PRs exist', async () => {
    await expect(
      resolvePrReviewTarget({
        issueId: 'UI-qclw',
        workspace: '/repo',
        read_issue_pull_requests_impl: async () => ({
          items: [{ number: 1 }, { number: 2 }]
        })
      })
    ).rejects.toMatchObject({ code: 'conflict' });
  });

  test('resolves issue-only pr-review when exactly one open PR exists', async () => {
    const target = await resolvePrReviewTarget({
      issueId: 'UI-qclw',
      workspace: '/repo',
      read_issue_pull_requests_impl: async () => ({
        items: [{ number: 42, state: 'OPEN' }]
      })
    });

    expect(target.prNumber).toBe(42);
  });
});
