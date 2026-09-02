import { describe, expect, test } from 'vitest';
import { createSubscriptionIssueStore } from '../../data/subscription-issue-store.js';
import { createWorkerQueueStore } from '../../data/worker-queue-store.js';
import { normalizeCandidateSort } from './candidate-sort.js';
import {
  candidatePlacement,
  placeMenuLanes,
  placementTitle
} from './placement.js';
import { createWorkspaceAdapter } from './workspace-adapter.js';

/** A format-valid spec review receipt (`<reviewer>@<40-hex>`). */
const RECEIPT = 'codex@' + 'a'.repeat(40);

const SORT = normalizeCandidateSort(null);

/**
 * @param {Partial<any>} [over]
 * @returns {any}
 */
function queueOf(over = {}) {
  return {
    revision: 3,
    auto_advance: false,
    auto_merge: false,
    slots: 2,
    queue: [],
    serial_lanes: [],
    serial_lane_count: 0,
    pr_wait: [],
    done: [],
    attempts: {},
    ...over
  };
}

/**
 * The candidate row the Worker adapter builds for one issue, so the table can
 * compare `eligible` against `candidatePlacement`.
 *
 * @param {any} issue
 * @param {any} queue
 * @returns {any}
 */
function adapterRowFor(issue, queue) {
  const ready = createSubscriptionIssueStore('tab:worker:ready');
  ready.applyPush({
    type: 'snapshot',
    id: 'tab:worker:ready',
    revision: 1,
    issues: [issue]
  });
  /** @type {Map<string, any>} */
  const stores = new Map([['tab:worker:ready', ready]]);
  const queue_store = createWorkerQueueStore();
  queue_store.set(queue);
  const adapter = createWorkspaceAdapter({
    queueStore: queue_store,
    issueStores: {
      /** @param {string} id */
      getStore: (id) => stores.get(id) || createSubscriptionIssueStore(id),
      /** @param {string} id */
      snapshotFor: (id) => (stores.get(id)?.snapshot() || []).slice(),
      subscribe: () => () => {}
    },
    getWorkspacePath: () => '/repos/beads-ui'
  });
  return adapter.read({ candidate_sort: SORT }).workspaces[0].runnable[0];
}

/**
 * @type {Array<{ name: string, issue: any, placeable: boolean, spec: string }>}
 */
const ELIGIBILITY_TABLE = [
  {
    name: 'published spec',
    issue: {
      id: 'PUB',
      title: 'published',
      spec_id: 'docs/specs/x.md',
      metadata: { spec_review: RECEIPT }
    },
    placeable: true,
    spec: 'published'
  },
  {
    name: 'worker-ineligible label',
    issue: {
      id: 'INEL',
      title: 'ineligible',
      labels: ['worker-ineligible'],
      spec_id: 'docs/specs/x.md',
      metadata: { spec_review: RECEIPT }
    },
    placeable: false,
    spec: 'published'
  },
  {
    name: 'awaiting_user parking',
    issue: {
      id: 'PARK',
      title: 'parked',
      spec_id: 'docs/specs/x.md',
      metadata: { spec_review: RECEIPT, awaiting_user: 'spec_review_stale' }
    },
    placeable: false,
    spec: 'published'
  },
  {
    name: 'quick_fix without a description',
    issue: {
      id: 'QF',
      title: 'quick fix',
      description: '   ',
      workflow: { route: 'quick_fix' },
      metadata: {}
    },
    placeable: false,
    spec: 'n/a'
  },
  {
    name: 'spec_backed with a draft spec',
    issue: {
      id: 'DRAFT',
      title: 'draft',
      spec_id: 'docs/specs/x.md',
      metadata: {}
    },
    placeable: false,
    spec: 'draft'
  },
  {
    // 계약상 충돌은 더 이상 생기지 않는다 (`server/spec-id.js`: 정본 키는 native
    // `spec_id` 하나이고 `conflict`는 항상 false). 낡은 `metadata.spec_id`가
    // 남아 있어도 두 표면이 함께 native 값을 읽는다는 사실을 이 행이 지킨다.
    name: 'legacy metadata.spec_id no longer conflicts',
    issue: {
      id: 'LEGACY',
      title: 'legacy',
      spec_id: 'docs/specs/x.md',
      metadata: { spec_id: 'docs/specs/other.md', spec_review: RECEIPT }
    },
    placeable: true,
    spec: 'published'
  }
];

describe('worker placement', () => {
  for (const row of ELIGIBILITY_TABLE) {
    test(`agrees with the adapter eligibility for ${row.name}`, () => {
      const queue = queueOf();

      const placement = candidatePlacement(row.issue, queue);
      const adapter_row = adapterRowFor(row.issue, queue);

      expect(placement.placeable).toBe(row.placeable);
      expect(placement.spec).toBe(row.spec);
      expect(adapter_row.eligible).toBe(placement.placeable);
    });
  }

  test('reports no location for an issue outside every lane', () => {
    const placement = candidatePlacement({ id: 'FREE' }, queueOf());

    expect(placement.location).toBeNull();
  });

  test('locates a bead waiting in the parallel lane', () => {
    const queue = queueOf({
      queue: [{ bead_id: 'A' }, { bead_id: 'B' }]
    });

    const placement = candidatePlacement({ id: 'B' }, queue);

    expect(placement.location).toEqual({ lane: 'parallel', index: 1 });
  });

  test('locates a bead waiting in a serial lane', () => {
    const queue = queueOf({
      serial_lanes: [
        { id: 's1', entries: [] },
        { id: 's2', entries: [{ bead_id: 'X' }, { bead_id: 'C' }] }
      ]
    });

    const placement = candidatePlacement({ id: 'C' }, queue);

    expect(placement.location).toEqual({ lane: 's2', index: 1 });
  });

  test('locates a bead with a running attempt', () => {
    const queue = queueOf({
      attempts: {
        a1: {
          attempt_id: 'a1',
          bead_id: 'R',
          status: 'running',
          started_at: 1000
        }
      }
    });

    const placement = candidatePlacement({ id: 'R' }, queue);

    expect(placement.location).toEqual({ lane: 'running' });
  });

  test('locates a bead in the pr_wait lane', () => {
    const queue = queueOf({ pr_wait: [{ bead_id: 'P' }] });

    const placement = candidatePlacement({ id: 'P' }, queue);

    expect(placement.location).toEqual({ lane: 'pr_wait' });
  });

  test('locates a bead still sitting in the done lane', () => {
    const queue = queueOf({ done: [{ bead_id: 'D', added_at: 10 }] });

    const placement = candidatePlacement({ id: 'D' }, queue);

    expect(placement.location).toEqual({ lane: 'done' });
  });

  test('refuses a placeable bead that already has a lane', () => {
    const queue = queueOf({ queue: [{ bead_id: 'PUB' }] });

    const placement = candidatePlacement(
      {
        id: 'PUB',
        spec_id: 'docs/specs/x.md',
        metadata: { spec_review: RECEIPT }
      },
      queue
    );

    expect(placement.placeable).toBe(false);
  });

  test('titles a placeable bead with the append sentence', () => {
    expect(placementTitle({ placeable: true, location: null })).toBe(
      '대기 큐 맨 뒤에 추가'
    );
  });

  test('titles a worker-ineligible bead with its label sentence', () => {
    expect(placementTitle({ placeable: false, worker_ineligible: true })).toBe(
      'worker-ineligible label로 워커에서 실행할 수 없습니다'
    );
  });

  test('titles an awaiting_user bead with the review sentence', () => {
    expect(placementTitle({ placeable: false, awaiting_user: true })).toBe(
      '사용자 리뷰를 기다리는 중이라 대기 큐에 넣을 수 없습니다'
    );
  });

  test('titles a quick_fix without a description', () => {
    expect(
      placementTitle({ placeable: false, missing_description: true })
    ).toBe('description이 없어 대기 큐에 넣을 수 없습니다');
  });

  test('titles a bead without a published spec', () => {
    expect(placementTitle({ placeable: false, spec: 'draft' })).toBe(
      'spec이 없어 대기 큐에 넣을 수 없습니다'
    );
  });

  test('titles a bead already waiting in the parallel lane', () => {
    expect(placementTitle({ location: { lane: 'parallel', index: 1 } })).toBe(
      '이미 대기 중 · 병렬 #2'
    );
  });

  test('titles a bead already waiting in a serial lane', () => {
    expect(placementTitle({ location: { lane: 's3', index: 0 } })).toBe(
      '이미 대기 중 · 직렬 3 #1'
    );
  });

  test('titles a running bead', () => {
    expect(placementTitle({ location: { lane: 'running' } })).toBe(
      '실행 중이라 대기 큐에 넣을 수 없습니다'
    );
  });

  test('titles a bead waiting on its PR', () => {
    expect(placementTitle({ location: { lane: 'pr_wait' } })).toBe(
      'PR 대기 중이라 대기 큐에 넣을 수 없습니다'
    );
  });

  test('titles a bead left in the done lane', () => {
    expect(placementTitle({ location: { lane: 'done' } })).toBe(
      '완료 레인에 있어 대기 큐에 넣을 수 없습니다'
    );
  });

  test('returns null lane choices when only the parallel lane exists', () => {
    expect(placeMenuLanes(queueOf())).toBeNull();
  });

  test('lists the parallel lane first with each serial lane tally', () => {
    const queue = queueOf({
      serial_lane_count: 2,
      serial_lanes: [
        { id: 's1', entries: [{ bead_id: 'A' }] },
        { id: 's2', entries: [] }
      ],
      queue: [{ bead_id: 'B' }, { bead_id: 'C' }]
    });

    expect(placeMenuLanes(queue)).toEqual([
      { id: 'parallel', label: '병렬', count: 2 },
      { id: 's1', label: '직렬 1', count: 1 },
      { id: 's2', label: '직렬 2', count: 0 }
    ]);
  });
});
