import { describe, expect, test } from 'vitest';
import {
  buildWorkerBoard,
  canMoveWorkerCard
} from './worker-board-selectors.js';

const base_parent = {
  id: 'UI-A',
  title: 'Parent A',
  status: 'open',
  priority: 2,
  issue_type: 'epic',
  spec_id: 'docs/spec.md',
  metadata: {},
  updated_at: '2026-05-14T00:00:00Z'
};

describe('worker-board-selectors', () => {
  test('puts metadata waiting cards into sort-key order', () => {
    const board = buildWorkerBoard(
      [
        {
          ...base_parent,
          id: 'UI-B',
          metadata: {
            worker_lane: 'waiting',
            worker_queue_sort_key: '3000'
          }
        },
        {
          ...base_parent,
          id: 'UI-A',
          metadata: {
            worker_lane: 'waiting',
            worker_queue_sort_key: '1000'
          }
        }
      ],
      {
        jobs: [],
        done_filter: 'today',
        now: new Date('2026-05-14T12:00:00Z')
      }
    );

    expect(board.waiting.map((card) => card.id)).toEqual(['UI-A', 'UI-B']);
  });

  test('derives progress before waiting metadata', () => {
    const board = buildWorkerBoard(
      [
        {
          ...base_parent,
          metadata: { worker_lane: 'waiting', worker_queue_sort_key: '1000' }
        }
      ],
      {
        jobs: [
          { id: 'job-1', issueId: 'UI-A', status: 'running', phase: 'goal' }
        ],
        done_filter: 'today',
        now: new Date('2026-05-14T12:00:00Z')
      }
    );

    expect(board.progress.map((card) => card.id)).toEqual(['UI-A']);
    expect(board.waiting).toEqual([]);
  });

  test('derives done from resolved status inside local-day filter', () => {
    const board = buildWorkerBoard(
      [
        {
          ...base_parent,
          status: 'resolved',
          updated_at: '2026-05-14T01:00:00Z'
        }
      ],
      {
        jobs: [],
        done_filter: 'today',
        now: new Date('2026-05-14T12:00:00Z')
      }
    );

    expect(board.done.map((card) => card.id)).toEqual(['UI-A']);
  });

  test('derives done from terminal killed job using job finished time', () => {
    const board = buildWorkerBoard(
      [
        {
          ...base_parent,
          metadata: { worker_lane: 'progress' },
          updated_at: '2026-05-01T01:00:00Z'
        }
      ],
      {
        jobs: [
          {
            id: 'job-1',
            issueId: 'UI-A',
            status: 'cancelled',
            wasForceKilled: true,
            finishedAt: '2026-05-14T02:00:00Z'
          }
        ],
        done_filter: 'today',
        now: new Date('2026-05-14T12:00:00Z')
      }
    );

    expect(board.done.map((card) => card.id)).toEqual(['UI-A']);
    expect(board.progress).toEqual([]);
  });

  test('lets done to inbox metadata override remove done classification', () => {
    const board = buildWorkerBoard(
      [
        { ...base_parent, status: 'closed', metadata: { worker_lane: 'inbox' } }
      ],
      {
        jobs: [],
        done_filter: '7',
        now: new Date('2026-05-14T12:00:00Z')
      }
    );

    expect(board.inbox.map((card) => card.id)).toEqual(['UI-A']);
    expect(board.done).toEqual([]);
  });

  test('derives cancelled review wait sub-state before active wait display', () => {
    const board = buildWorkerBoard(
      [
        {
          ...base_parent,
          metadata: {
            worker_pr_review_wait_started_at: '2026-05-14T00:00:00Z',
            worker_pr_review_wait_cancelled: 'true'
          }
        }
      ],
      {
        jobs: [],
        done_filter: 'today',
        now: new Date('2026-05-14T12:00:00Z')
      }
    );

    expect(board.progress[0].sub_state).toBe('pr_review_cancelled');
  });

  test('blocks queue moves for cards without spec', () => {
    const result = canMoveWorkerCard(
      { ...base_parent, spec_id: '', metadata: {} },
      'inbox',
      'waiting',
      { serial_busy: false }
    );

    expect(result).toEqual({
      ok: false,
      reason: 'Spec required to enter queue'
    });
  });

  test('blocks non-parallel progress move when serial slot is busy', () => {
    const result = canMoveWorkerCard(base_parent, 'waiting', 'progress', {
      serial_busy: true
    });

    expect(result).toEqual({
      ok: false,
      reason: 'Serial slot busy. Mark as parallel or wait.'
    });
  });
});
