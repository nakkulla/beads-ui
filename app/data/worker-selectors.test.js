import { describe, expect, test } from 'vitest';
import {
  buildWorkerParentViewModel,
  buildWorkerParents,
  computeProgressFromStatuses,
  filterWorkerParents,
  formatElapsedMs,
  isRunnableParent
} from './worker-selectors.js';

describe('worker-selectors', () => {
  test('computes progression from child weights', () => {
    expect(
      computeProgressFromStatuses(['open', 'in_progress', 'resolved', 'closed'])
    ).toBe(59);
  });

  test('formats elapsed milliseconds into readable labels', () => {
    expect(formatElapsedMs(65000)).toBe('1m 5s');
    expect(formatElapsedMs(4000)).toBe('4s');
  });

  test('builds parent view model with closed children hidden by default', () => {
    const parent = {
      id: 'UI-62lm',
      title: 'Worker 탭 추가',
      status: 'open',
      priority: 1,
      issue_type: 'feature',
      spec_id: 'docs/spec.md',
      updated_at: '2026-04-16T09:20:04Z'
    };
    const children = [
      { id: 'UI-62lm.1', parent: 'UI-62lm', status: 'open' },
      { id: 'UI-62lm.2', parent: 'UI-62lm', status: 'resolved' },
      { id: 'UI-62lm.3', parent: 'UI-62lm', status: 'closed' }
    ];

    const item = buildWorkerParentViewModel(parent, children, {
      workspace_is_valid: true
    });

    expect(item.progress_percent).toBe(62);
    expect(item.visible_children.map((child) => child.id)).toEqual([
      'UI-62lm.1',
      'UI-62lm.2'
    ]);
    expect(item.hidden_closed_count).toBe(1);
  });

  test('treats resolved parent as runnable when other conditions pass', () => {
    expect(
      isRunnableParent(
        {
          id: 'UI-88',
          status: 'resolved',
          spec_id: 'docs/spec.md'
        },
        {
          is_parent: true,
          has_active_job: false,
          workspace_is_valid: true
        }
      )
    ).toBe(true);
  });

  test('attaches current and recent jobs using camelCase worker fields', () => {
    const item = buildWorkerParentViewModel(
      {
        id: 'UI-A',
        title: 'Running parent',
        status: 'resolved',
        priority: 2,
        issue_type: 'feature',
        spec_id: 'docs/a.md',
        updated_at: '2026-04-16T09:00:00Z'
      },
      [],
      {
        workspace_is_valid: true,
        jobs: [
          {
            id: 'job-2',
            issueId: 'UI-A',
            status: 'running',
            elapsedMs: 65000,
            isCancellable: true
          },
          {
            id: 'job-1',
            issueId: 'UI-A',
            status: 'failed',
            elapsedMs: 5000,
            errorSummary: 'boom'
          }
        ]
      }
    );

    expect(item.current_job?.id).toBe('job-2');
    expect(item.current_job_elapsed_label).toBe('1m 5s');
    expect(item.recent_jobs).toHaveLength(1);
    expect(item.has_active_job).toBe(true);
    expect(item.runnable).toBe(false);
  });

  test('sorts active job first, then runnable, then status, priority, time, and id', () => {
    const items = buildWorkerParents(
      [
        {
          id: 'UI-A',
          title: 'Running parent',
          status: 'resolved',
          priority: 3,
          issue_type: 'feature',
          spec_id: 'docs/a.md',
          updated_at: '2026-04-16T09:00:00Z'
        },
        {
          id: 'UI-B',
          title: 'Runnable parent',
          status: 'open',
          priority: 2,
          issue_type: 'feature',
          spec_id: 'docs/b.md',
          updated_at: '2026-04-16T08:00:00Z'
        },
        {
          id: 'UI-C',
          title: 'Blocked by spec',
          status: 'in_progress',
          priority: 0,
          issue_type: 'feature',
          total_children: 1,
          updated_at: '2026-04-16T10:00:00Z'
        }
      ],
      {
        workspace_is_valid: true,
        jobs: [{ issue_id: 'UI-A', status: 'running' }]
      }
    );

    expect(items.map((item) => item.id)).toEqual(['UI-A', 'UI-B', 'UI-C']);
  });

  test('applies runnable, open pr, search, and status filters with AND semantics', () => {
    const items = buildWorkerParents(
      [
        {
          id: 'UI-1',
          title: 'Worker tab polish',
          status: 'resolved',
          priority: 1,
          issue_type: 'feature',
          spec_id: 'docs/worker.md',
          updated_at: '2026-04-16T09:00:00Z'
        },
        {
          id: 'UI-2',
          title: 'Worker docs',
          status: 'resolved',
          priority: 1,
          issue_type: 'feature',
          spec_id: 'docs/worker-docs.md',
          updated_at: '2026-04-16T08:00:00Z'
        },
        {
          id: 'UI-3',
          title: 'Other feature',
          status: 'open',
          priority: 1,
          issue_type: 'feature',
          spec_id: 'docs/other.md',
          updated_at: '2026-04-16T07:00:00Z'
        }
      ],
      {
        workspace_is_valid: true,
        open_pr_ids_by_parent: {
          'UI-1': ['https://github.com/acme/repo/pull/1'],
          'UI-3': ['https://github.com/acme/repo/pull/3']
        },
        jobs: [{ issue_id: 'UI-3', status: 'running' }]
      }
    );

    const filtered = filterWorkerParents(items, {
      search: 'worker',
      status: 'resolved',
      runnable_only: true,
      has_open_pr_only: true
    });

    expect(filtered.map((item) => item.id)).toEqual(['UI-1']);
  });
});
