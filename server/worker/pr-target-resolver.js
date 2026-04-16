import { readIssuePullRequests } from './pr-reader.js';

/**
 * @param {{ issueId?: string | null, prNumber?: number | null, workspace: string, read_issue_pull_requests_impl?: typeof readIssuePullRequests }} input
 */
export async function resolvePrReviewTarget(input) {
  if (input.prNumber != null) {
    return { prNumber: input.prNumber };
  }
  if (!input.issueId) {
    throw Object.assign(new Error('Missing issueId for pr-review'), {
      code: 'invalid_request'
    });
  }

  const read_issue_pull_requests_impl =
    input.read_issue_pull_requests_impl || readIssuePullRequests;
  const payload = await read_issue_pull_requests_impl({
    issue_id: input.issueId,
    root_dir: input.workspace
  });
  const items = Array.isArray(payload?.items) ? payload.items : [];

  if (items.length === 0) {
    throw Object.assign(new Error('No open PR found for issue'), {
      code: 'unprocessable'
    });
  }
  if (items.length > 1) {
    throw Object.assign(new Error('Multiple open PRs found for issue'), {
      code: 'conflict'
    });
  }

  return { prNumber: items[0].number };
}
