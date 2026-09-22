import { describe, expect, test, vi } from 'vitest';
import { createSubscriptionIssueStore } from '../../data/subscription-issue-store.js';
import { createWorkerQueueStore } from '../../data/worker-queue-store.js';
import { normalizeCandidateSort } from './candidate-sort.js';
import { createWorkspaceAdapter } from './workspace-adapter.js';

/** A format-valid spec review receipt (`<reviewer>@<40-hex>`). */
const RECEIPT = 'codex@' + 'a'.repeat(40);

/** A contract-shaped session-lane work report comment (UI-ucq6 §변경 1). */
const SESSION_REPORT = [
  '## 🤖 작업 보고서',
  '> session · sid abcd1234 · 2026-08-28T00:00:00Z',
  '',
  '**결론** — 끝났다'
].join('\n');

const SORT = normalizeCandidateSort(null);

function createTestIssueStores() {
  /** @type {Map<string, any>} */
  const stores = new Map();
  /** @type {Set<(client_id: string) => void>} */
  const listeners = new Set();
  /** @param {string} id */
  function getStore(id) {
    let s = stores.get(id);
    if (!s) {
      s = createSubscriptionIssueStore(id);
      stores.set(id, s);
      s.subscribe(() => {
        for (const fn of Array.from(listeners)) {
          fn(id);
        }
      });
    }
    return s;
  }
  return {
    getStore,
    /** @param {string} id */
    snapshotFor(id) {
      return getStore(id).snapshot().slice();
    },
    /** @param {(client_id: string) => void} fn */
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
}

/**
 * @param {any} stores
 * @param {string} key
 * @param {any[]} issues
 */
function seed(stores, key, issues) {
  stores
    .getStore(key)
    .applyPush({ type: 'snapshot', id: key, revision: 1, issues });
}

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
    pr_wait: [],
    done: [],
    attempts: {},
    ...over
  };
}

/**
 * @param {Partial<any>} [over]
 */
function adapterOf(over = {}) {
  const queue_store = createWorkerQueueStore();
  queue_store.set(queueOf(over.queue || {}));
  return createWorkspaceAdapter({
    queueStore: queue_store,
    issueStores: over.stores,
    transport: over.transport,
    getWorkspacePath: over.getWorkspacePath || (() => '/repos/beads-ui'),
    onInvalidate: over.onInvalidate
  });
}

async function flush() {
  for (let i = 0; i < 5; i++) {
    await Promise.resolve();
  }
}

describe('worker workspace adapter', () => {
  test('returns an empty input without a queue store', () => {
    const adapter = createWorkspaceAdapter({});

    const input = adapter.read({ candidate_sort: SORT });

    expect(input).toEqual({ workspaces: [], workspaces_state: [] });
  });

  test('names the workspace item after the root directory basename', () => {
    const adapter = adapterOf({ stores: createTestIssueStores() });

    const input = adapter.read({ candidate_sort: SORT });

    expect(input.workspaces[0].root_dir).toBe('/repos/beads-ui');
    expect(input.workspaces[0].name).toBe('beads-ui');
  });

  test('excludes queue, serial, pr_wait and done members from the candidates', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      { id: 'FREE', title: 'free', metadata: {} },
      { id: 'QUEUED', title: 'queued', metadata: {} },
      { id: 'SERIAL', title: 'serial', metadata: {} },
      { id: 'PR', title: 'pr', metadata: {} },
      { id: 'DONE', title: 'done', metadata: {} }
    ]);
    const adapter = adapterOf({
      stores,
      queue: {
        queue: [{ bead_id: 'QUEUED' }],
        serial_lanes: [{ id: 's1', entries: [{ bead_id: 'SERIAL' }] }],
        pr_wait: [{ bead_id: 'PR' }],
        done: [{ bead_id: 'DONE' }]
      }
    });

    const rows = adapter.read({ candidate_sort: SORT }).workspaces[0].runnable;

    expect(rows.map((/** @type {any} */ r) => r.bead_id)).toEqual(['FREE']);
  });

  test('excludes a full_plan phase child from the candidates', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      { id: 'UI-abcd', title: 'parent', metadata: {} },
      { id: 'UI-abcd.1', title: 'phase 1', metadata: {} }
    ]);
    const adapter = adapterOf({ stores });

    const rows = adapter.read({ candidate_sort: SORT }).workspaces[0].runnable;

    expect(rows.map((/** @type {any} */ r) => r.bead_id)).toEqual(['UI-abcd']);
  });

  test('carries published spec facts without placement or reason fragments', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'OK',
        title: 'ok',
        spec_id: 'SPEC-1',
        // route는 자격 식의 첫 조건이다 (UI-ff10 §4.1).
        metadata: { route: 'spec_backed', spec_review: RECEIPT }
      }
    ]);
    const adapter = adapterOf({ stores });

    const row = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .runnable[0];

    expect(row.observation).toBe(true);
    expect(row.spec_state).toBe('published');
    for (const key of [
      'eligible',
      'reason',
      'route_ok',
      'missing_description',
      'placement_spec',
      'session_preferred',
      'awaiting_user_reason'
    ]) {
      expect(row).not.toHaveProperty(key);
    }
    expect(row.published).toBe(true);
  });

  test('carries the none spec state', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      { id: 'NONE', title: 'none', metadata: {} }
    ]);
    const adapter = adapterOf({ stores });

    const row = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .runnable[0];

    expect(row.spec_state).toBe('none');
    expect(row).not.toHaveProperty('reason');
  });

  test('carries the placement judgement material for the readiness chip', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      { id: 'DRAFT', title: 'draft', spec_id: 'SPEC-1', metadata: {} },
      {
        id: 'QF',
        title: 'quick fix',
        description: '',
        metadata: { route: 'quick_fix' }
      }
    ]);
    const adapter = adapterOf({ stores });

    const rows = adapter.read({ candidate_sort: SORT }).workspaces[0].runnable;

    expect(rows[0]).toMatchObject({
      route: '',
      awaiting_user: false,
      has_description: true,
      spec_state: 'draft'
    });
    expect(rows[1]).toMatchObject({
      route: 'quick_fix',
      has_description: false,
      spec_state: 'n/a'
    });
  });

  test('carries the draft spec state', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      { id: 'DRAFT', title: 'draft', spec_id: 'SPEC-1', metadata: {} }
    ]);
    const adapter = adapterOf({ stores });

    const row = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .runnable[0];

    expect(row.spec_state).toBe('draft');
    expect(row).not.toHaveProperty('reason');
  });

  test('names a quick_fix candidate with an empty description missing_description', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'QF',
        title: 'quick fix',
        description: '   ',
        metadata: { route: 'quick_fix' }
      }
    ]);
    const adapter = adapterOf({ stores });

    const row = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .runnable[0];

    expect(row.has_description).toBe(false);
    expect(row).not.toHaveProperty('reason');
  });

  test('keeps the id-less lock sentence for a blocked candidate with no known blocker', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:blocked', [
      {
        id: 'BL',
        title: 'blocked',
        spec_id: 'SPEC-1',
        metadata: { spec_review: RECEIPT },
        blocked_info: { blockers: [] }
      }
    ]);
    const adapter = adapterOf({ stores });

    const row = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .runnable[0];

    expect(row.blocked).toBe(true);
    expect(row.blocked_without_ids).toBe(true);
    expect(row).not.toHaveProperty('reason');
  });

  test('carries the blocker ids of a blocked candidate instead of the lock sentence', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:blocked', [
      {
        id: 'BL',
        title: 'blocked',
        spec_id: 'SPEC-1',
        metadata: { spec_review: RECEIPT },
        blocked_info: { blockers: ['DEP-9'] }
      }
    ]);
    const adapter = adapterOf({ stores });

    const row = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .runnable[0];

    expect(row.blocked_by).toEqual(['DEP-9']);
    expect(row).not.toHaveProperty('blocked_without_ids');
  });

  test('marks a worker-ineligible candidate as an observation row', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'INEL',
        title: 'ineligible',
        labels: ['worker-ineligible'],
        spec_id: 'SPEC-1',
        metadata: { spec_review: RECEIPT }
      }
    ]);
    const adapter = adapterOf({ stores });

    const row = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .runnable[0];

    expect(row.worker_ineligible).toBe(true);
    expect(row.observation).toBe(true);
  });

  test('refuses an awaiting_user candidate and names the parking reason', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'PARKED',
        title: 'parked',
        spec_id: 'SPEC-1',
        metadata: { spec_review: RECEIPT, awaiting_user: 'spec_review_stale' }
      }
    ]);
    const adapter = adapterOf({ stores });

    const row = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .runnable[0];

    expect(row.awaiting_user).toBe(true);
    expect(row.awaiting_user_reason).toBe(
      '사용자 리뷰 필요: spec_review_stale'
    );
  });

  test('carries the session-preferred advisory apart from eligibility', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'PREF',
        title: 'preferred',
        labels: ['session-preferred'],
        spec_id: 'SPEC-1',
        metadata: {
          route: 'spec_backed',
          spec_review: RECEIPT,
          session_preferred_reason: 'user_feedback_loop'
        }
      }
    ]);
    const adapter = adapterOf({ stores });

    const row = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .runnable[0];

    expect(row.session_preferred_reason).toBe('user_feedback_loop');
    expect(row).not.toHaveProperty('session_preferred');
  });

  test('carries the 스펙 대기 judgement on a blocked candidate', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:blocked', [
      {
        id: 'WAIT',
        title: 'spec waits',
        labels: ['spec-after-blocker'],
        spec_id: 'SPEC-1',
        metadata: { spec_review: RECEIPT },
        blocked_info: { blockers: ['DEP-9'] }
      }
    ]);
    const adapter = adapterOf({ stores });

    const row = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .runnable[0];

    expect(row.spec_after_blocker).toBe(true);
  });

  test('drops the 스펙 대기 judgement once the candidate is ready', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'WAIT',
        title: 'spec waits',
        labels: ['spec-after-blocker'],
        spec_id: 'SPEC-1',
        metadata: { spec_review: RECEIPT }
      }
    ]);
    const adapter = adapterOf({ stores });

    const row = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .runnable[0];

    expect(row.spec_after_blocker).toBe(false);
  });

  test('extracts only the execution pin keys from the issue metadata', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'PIN',
        title: 'pinned',
        spec_id: 'SPEC-1',
        metadata: {
          spec_review: RECEIPT,
          impl_runtime: 'codex',
          claude_account: 'work',
          plan_path: 'docs/plan.md',
          impl_effort: 42
        }
      }
    ]);
    const adapter = adapterOf({ stores });

    const row = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .runnable[0];

    expect(row.exec_pins).toEqual({
      impl_runtime: 'codex',
      claude_account: 'work'
    });
  });

  test('carries the chip identity keys beside the pins (UI-wg68 §5.1)', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'CHIP',
        title: 'bound',
        spec_id: 'SPEC-1',
        metadata: {
          spec_review: RECEIPT,
          impl_runtime: 'claude',
          applied_exec_preset: 'p1',
          chip_preset_source: 'complex'
        }
      }
    ]);
    const adapter = adapterOf({ stores });

    const row = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .runnable[0];

    expect(row.exec_pins).toEqual({
      impl_runtime: 'claude',
      applied_exec_preset: 'p1',
      chip_preset_source: 'complex'
    });
  });

  test('omits the chip identity keys when the issue carries none', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'PLAIN',
        title: 'unbound',
        spec_id: 'SPEC-1',
        metadata: { spec_review: RECEIPT, impl_runtime: 'claude' }
      }
    ]);
    const adapter = adapterOf({ stores });

    const row = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .runnable[0];

    expect(Object.keys(row.exec_pins)).toEqual(['impl_runtime']);
  });

  test('passes the release and dependents decorations through untouched', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'REL',
        title: 'released',
        spec_id: 'SPEC-1',
        metadata: { spec_review: RECEIPT },
        release_info: { released_by: [{ id: 'DEP-1', closed_at: 1 }] },
        dependents_info: { count: 3 }
      }
    ]);
    const adapter = adapterOf({ stores });

    const row = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .runnable[0];

    expect(row.release_info).toEqual({
      released_by: [{ id: 'DEP-1', closed_at: 1 }]
    });
    expect(row.dependents_info).toEqual({ count: 3 });
  });

  test('carries the declared scope of a candidate from the snapshot decoration', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      { id: 'SC', title: 'scoped', metadata: {} }
    ]);
    const adapter = adapterOf({
      stores,
      queue: { bead_scope: { SC: { scope: ['app/'], artifacts: [] } } }
    });

    const row = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .runnable[0];

    expect(row.scope).toEqual(['app/']);
  });

  test('collects priority and from_id from all five issue columns', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [{ id: 'R', priority: 1, metadata: {} }]);
    seed(stores, 'tab:worker:blocked', [
      { id: 'B', priority: 2, metadata: {} }
    ]);
    seed(stores, 'tab:worker:in-progress', [
      { id: 'P', priority: 3, metadata: {} }
    ]);
    seed(stores, 'tab:worker:resolved', [
      {
        id: 'V',
        priority: 4,
        from_id: 'SRC',
        workflow: { worker_created_from: 'ORIGIN' },
        worker_created_from_root_dir: '/repo/origin'
      }
    ]);
    seed(stores, 'tab:worker:closed', [{ id: 'C', priority: 0 }]);
    const adapter = adapterOf({ stores });

    const overlay = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .bead_overlay;

    expect(Object.keys(overlay).sort()).toEqual(['B', 'C', 'P', 'R', 'V']);
    expect(overlay.V).toEqual({
      priority: 4,
      from_id: 'SRC',
      worker_created_from: 'ORIGIN',
      worker_created_from_root_dir: '/repo/origin'
    });
  });

  test('carries metadata only for the subscribed ready, blocked and in_progress columns', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [{ id: 'R', metadata: { route: 'x' } }]);
    seed(stores, 'tab:worker:closed', [{ id: 'C', metadata: { route: 'x' } }]);
    const adapter = adapterOf({ stores });

    const overlay = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .bead_overlay;

    expect(Object.hasOwn(overlay.R, 'metadata')).toBe(true);
    expect(Object.hasOwn(overlay.C, 'metadata')).toBe(false);
  });

  test('carries the enriched workflow route into the overlay', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'QF',
        metadata: {},
        workflow: { route: 'quick_fix', route_source: 'derived' }
      }
    ]);
    const adapter = adapterOf({ stores });

    const overlay = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .bead_overlay;

    expect(overlay.QF.route).toBe('quick_fix');
  });

  test('carries a child rollup for a parent that is in no subscribed column', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:in-progress', [
      { id: 'S1.1', parent: 'S1', status: 'in_progress' }
    ]);
    seed(stores, 'tab:worker:closed', [{ id: 'S1.2', parent: 'S1' }]);
    const adapter = adapterOf({ stores });

    const overlay = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .bead_overlay;

    expect(overlay.S1.rollup.total).toBe(2);
  });

  test('derives one carryover successor per blocked bead (UI-btj6 §3)', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:blocked', [
      {
        id: 'UI-s1',
        metadata: { carried_from: 'UI-p1.1' },
        dependencies: [{ depends_on_id: 'UI-p1', type: 'blocks' }],
        blocked_info: { blockers: ['UI-p1'] }
      },
      {
        id: 'UI-s2',
        metadata: { carried_from: 'UI-p1.2' },
        dependencies: [{ depends_on_id: 'UI-p1', type: 'blocks' }],
        blocked_info: { blockers: ['UI-p1'] }
      }
    ]);
    const adapter = adapterOf({ stores });

    const overlay = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .bead_overlay;

    expect(overlay['UI-p1'].carried_to).toEqual(['UI-s1', 'UI-s2']);
  });

  test('reads the carryover blocks edge off an unblocked successor', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'UI-s1',
        metadata: { carried_from: 'UI-p1.1' },
        dependencies: [{ depends_on_id: 'UI-p1', type: 'blocks' }]
      }
    ]);
    const adapter = adapterOf({ stores });

    const overlay = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .bead_overlay;

    expect(overlay['UI-p1'].carried_to).toEqual(['UI-s1']);
  });

  test('reads the raw blocks edge when blocked_info lists no blocker', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:blocked', [
      {
        id: 'UI-s1',
        metadata: { carried_from: 'UI-p1.1' },
        dependencies: [{ depends_on_id: 'UI-p1', type: 'blocks' }],
        blocked_info: { blockers: [] }
      }
    ]);
    const adapter = adapterOf({ stores });

    const overlay = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .bead_overlay;

    expect(overlay['UI-p1'].carried_to).toEqual(['UI-s1']);
  });

  test('omits a carryover successor that blocks on another bead', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:blocked', [
      {
        id: 'UI-s1',
        metadata: { carried_from: 'UI-p2.1' },
        dependencies: [{ depends_on_id: 'UI-p2', type: 'blocks' }],
        blocked_info: { blockers: ['UI-p2'] }
      }
    ]);
    const adapter = adapterOf({ stores });

    const overlay = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .bead_overlay;

    expect(overlay['UI-p1']).toBeUndefined();
    expect(overlay['UI-p2'].carried_to).toEqual(['UI-s1']);
  });

  test('omits a successor without the carried_from metadata', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:blocked', [
      { id: 'UI-s1', metadata: {}, blocked_info: { blockers: ['UI-p1'] } }
    ]);
    const adapter = adapterOf({ stores });

    const overlay = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .bead_overlay;

    expect(Object.hasOwn(overlay['UI-p1'] || {}, 'carried_to')).toBe(false);
  });

  test('derives a carryover successor still sitting in resolved', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:resolved', [
      {
        id: 'UI-s1',
        metadata: { carried_from: 'UI-p1.1' },
        dependencies: [{ depends_on_id: 'UI-p1', type: 'blocks' }]
      }
    ]);
    const adapter = adapterOf({ stores });

    const overlay = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .bead_overlay;

    expect(overlay['UI-p1'].carried_to).toEqual(['UI-s1']);
  });

  test('omits a carryover successor that is already closed', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:closed', [
      {
        id: 'UI-s1',
        metadata: { carried_from: 'UI-p1.1' },
        dependencies: [{ depends_on_id: 'UI-p1', type: 'blocks' }]
      }
    ]);
    const adapter = adapterOf({ stores });

    const overlay = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .bead_overlay;

    expect(overlay['UI-p1']).toBeUndefined();
  });

  test('prefers the live issue title over the server decoration', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      { id: 'RD', title: 'live', metadata: {} }
    ]);
    const adapter = adapterOf({
      stores,
      queue: { bead_titles: { RD: 'stale', OTHER: 'kept' } }
    });

    const titles = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .bead_titles;

    expect(titles).toEqual({ RD: 'live', OTHER: 'kept' });
  });

  test('projects the workspace state row the lane model reads', () => {
    const adapter = adapterOf({
      stores: createTestIssueStores(),
      queue: {
        revision: 9,
        slots: 3,
        runner_catalog: { runners: {} },
        execution_defaults: { impl_runtime: 'claude' }
      }
    });

    const row = adapter.read({ candidate_sort: SORT }).workspaces_state[0];

    expect(row.revision).toBe(9);
    expect(row.slots).toBe(3);
    expect(row.runner_catalog).toEqual({ runners: {} });
    expect(row.execution_defaults).toEqual({ impl_runtime: 'claude' });
  });

  test('carries both orchestration triples onto the workspace state row', () => {
    const adapter = adapterOf({
      stores: createTestIssueStores(),
      queue: {
        orchestration_model: 'sonnet',
        quick_fix_orchestration_model: 'opus'
      }
    });

    const row = adapter.read({ candidate_sort: SORT }).workspaces_state[0];

    expect(row.orchestration_model).toBe('sonnet');
    expect(row.quick_fix_orchestration_model).toBe('opus');
  });

  test('prefers the workspace declaration slot cap over the snapshot value', () => {
    const adapter = adapterOf({
      stores: createTestIssueStores(),
      queue: { slots: 2, workspace_info: { slots: 4 } }
    });

    const row = adapter.read({ candidate_sort: SORT }).workspaces_state[0];

    expect(row.slots).toBe(4);
  });

  test('fetches the session defaults once per workspace', async () => {
    const transport = vi.fn(async () => ({
      values: { impl_runtime: 'codex' }
    }));
    const adapter = adapterOf({ stores: createTestIssueStores(), transport });

    adapter.ensureSessionDefaults();
    adapter.ensureSessionDefaults();
    await flush();
    adapter.ensureSessionDefaults();
    await flush();

    expect(transport).toHaveBeenCalledTimes(1);
    expect(
      adapter.read({ candidate_sort: SORT }).workspaces_state[0]
        .session_defaults
    ).toEqual({ impl_runtime: 'codex' });
  });

  test('refreshSessionDefaults drops the cache and asks again', async () => {
    const transport = vi.fn(async () => ({
      values: { impl_runtime: 'codex' }
    }));
    const adapter = adapterOf({ stores: createTestIssueStores(), transport });

    adapter.ensureSessionDefaults();
    await flush();
    adapter.refreshSessionDefaults();
    await flush();

    expect(transport).toHaveBeenCalledTimes(2);
  });

  test('keeps another workspace kv out of this workspace session defaults', async () => {
    let path = '/repos/a';
    const transport = vi.fn(async () => ({
      values: { impl_runtime: 'codex' }
    }));
    const adapter = adapterOf({
      stores: createTestIssueStores(),
      transport,
      getWorkspacePath: () => path
    });

    adapter.ensureSessionDefaults();
    await flush();
    path = '/repos/b';

    expect(
      adapter.read({ candidate_sort: SORT }).workspaces_state[0]
        .session_defaults
    ).toEqual({});
  });

  test('invalidates once when the session defaults arrive', async () => {
    const onInvalidate = vi.fn();
    const transport = vi.fn(async () => ({ values: {} }));
    const adapter = adapterOf({
      stores: createTestIssueStores(),
      transport,
      onInvalidate
    });

    adapter.ensureSessionDefaults();
    await flush();

    expect(onInvalidate).toHaveBeenCalledTimes(1);
  });

  test('drops the session defaults to empty when the request fails', async () => {
    const transport = vi.fn(async () => {
      throw new Error('nope');
    });
    const adapter = adapterOf({ stores: createTestIssueStores(), transport });

    adapter.ensureSessionDefaults();
    await flush();

    expect(
      adapter.read({ candidate_sort: SORT }).workspaces_state[0]
        .session_defaults
    ).toEqual({});
  });

  test('emits a session done row once the comment lookup reports a session lane', async () => {
    const stores = createTestIssueStores();
    const closed_at = Date.now();
    seed(stores, 'tab:worker:closed', [
      {
        id: 'SESSION',
        title: 'session work',
        closed_at,
        started_at: closed_at - 1000,
        updated_at: closed_at,
        comment_count: 1
      }
    ]);
    const onInvalidate = vi.fn();
    const transport = vi.fn(async () => [{ text: SESSION_REPORT }]);
    const adapter = adapterOf({ stores, transport, onInvalidate });

    const pending = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .session_done;
    await flush();
    const rows = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .session_done;

    expect(pending[0].badges).toEqual([]);
    expect(rows.map((/** @type {any} */ r) => r.id)).toEqual(['SESSION']);
    expect(rows[0].badges).toEqual(['세션 작업']);
    expect(rows[0].work_ms).toBe(1000);
    expect(onInvalidate).toHaveBeenCalledTimes(1);
    expect(transport).toHaveBeenCalledTimes(1);
  });

  test('stands a 닫힘 행 when the comments carry no session report', async () => {
    const stores = createTestIssueStores();
    const closed_at = Date.now();
    seed(stores, 'tab:worker:closed', [
      { id: 'PLAIN', title: 'plain', closed_at, comment_count: 2 }
    ]);
    const transport = vi.fn(async () => [{ text: '그냥 댓글' }]);
    const adapter = adapterOf({ stores, transport });

    adapter.read({ candidate_sort: SORT });
    await flush();
    const rows = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .session_done;

    expect(rows.map((/** @type {any} */ r) => r.id)).toEqual(['PLAIN']);
    expect(rows[0].badges).toEqual([]);
    expect(rows[0].work_ms).toBe(null);
  });

  test('keeps a failed comment lookup out of the retry loop until the store emits', async () => {
    const stores = createTestIssueStores();
    const closed_at = Date.now();
    seed(stores, 'tab:worker:closed', [
      { id: 'BOOM', title: 'boom', closed_at, comment_count: 1 }
    ]);
    const transport = vi.fn(async () => {
      throw new Error('nope');
    });
    const adapter = adapterOf({ stores, transport });

    adapter.read({ candidate_sort: SORT });
    await flush();
    adapter.read({ candidate_sort: SORT });
    await flush();

    expect(transport).toHaveBeenCalledTimes(1);

    adapter.notifyIssuesChanged();
    adapter.read({ candidate_sort: SORT });
    await flush();

    expect(transport).toHaveBeenCalledTimes(2);
  });

  test('drops a session done row closed before the period start', async () => {
    const stores = createTestIssueStores();
    const closed_at = Date.now();
    seed(stores, 'tab:worker:closed', [
      { id: 'OLD', title: 'old', closed_at, comment_count: 1 }
    ]);
    const transport = vi.fn(async () => [{ text: SESSION_REPORT }]);
    const adapter = adapterOf({ stores, transport });

    adapter.read({ candidate_sort: SORT, done_since: closed_at + 1 });
    await flush();

    expect(transport).not.toHaveBeenCalled();
  });

  test('keeps a bead the worker done lane already carries out of the session rows', async () => {
    const stores = createTestIssueStores();
    const closed_at = Date.now();
    seed(stores, 'tab:worker:closed', [
      { id: 'DUP', title: 'dup', closed_at, comment_count: 1 }
    ]);
    const transport = vi.fn(async () => [{ text: SESSION_REPORT }]);
    const adapter = adapterOf({
      stores,
      transport,
      queue: { done: [{ bead_id: 'DUP', added_at: closed_at }] }
    });

    adapter.read({ candidate_sort: SORT });
    await flush();

    expect(transport).not.toHaveBeenCalled();
  });

  test('stands a deferred issue in the shelf and not in the candidates', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [{ id: 'READY', title: 'ready' }]);
    seed(stores, 'tab:worker:deferred', [
      { id: 'HELD', title: '보류된 일', updated_at: 5, labels: ['ops'] }
    ]);
    const adapter = adapterOf({ stores });

    const workspace = adapter.read({ candidate_sort: SORT }).workspaces[0];

    expect(workspace.deferred.map((/** @type {any} */ r) => r.bead_id)).toEqual(
      ['HELD']
    );
    expect(workspace.runnable.map((/** @type {any} */ r) => r.bead_id)).toEqual(
      ['READY']
    );
  });

  test('orders the deferred shelf by updated_at descending', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:deferred', [
      { id: 'OLD', title: 'old', updated_at: 100 },
      { id: 'NEW', title: 'new', updated_at: 900 }
    ]);
    const adapter = adapterOf({ stores });

    const rows = adapter.read({ candidate_sort: SORT }).workspaces[0].deferred;

    expect(rows.map((/** @type {any} */ r) => r.bead_id)).toEqual([
      'NEW',
      'OLD'
    ]);
  });

  test('stands a closed issue with no comments as a 닫힘 행', () => {
    const stores = createTestIssueStores();
    const closed_at = Date.now();
    seed(stores, 'tab:worker:closed', [
      { id: 'NOCOMMENT', title: '댓글 없음', closed_at, comment_count: 0 }
    ]);
    const transport = vi.fn(async () => []);
    const adapter = adapterOf({ stores, transport });

    const rows = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .session_done;

    expect(rows.map((/** @type {any} */ r) => r.id)).toEqual(['NOCOMMENT']);
    expect(rows[0].badges).toEqual([]);
    expect(rows[0].work_ms).toBe(null);
    expect(transport).not.toHaveBeenCalled();
  });

  test('carries the server workflow onto a 닫힘 행 for its route chip', () => {
    const stores = createTestIssueStores();
    const closed_at = Date.now();
    seed(stores, 'tab:worker:closed', [
      {
        id: 'ROUTED',
        title: 'route 있음',
        closed_at,
        comment_count: 0,
        workflow: { route: 'quick_fix', chips: { route: 'quick_fix' } }
      }
    ]);
    const adapter = adapterOf({ stores, transport: vi.fn(async () => []) });

    const rows = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .session_done;

    expect(rows[0].workflow?.route).toBe('quick_fix');
  });

  test('carries blocker ids and dependency decorations onto a deferred row', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:deferred', [
      {
        id: 'HELD',
        title: '보류',
        updated_at: 5,
        dependencies: [{ id: 'PRE-1', dependency_type: 'blocks' }],
        release_info: { released_by: [] },
        dependents_info: { dependents: [] }
      }
    ]);
    const adapter = adapterOf({ stores });

    const row = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .deferred[0];

    expect(row.blocked_by).toEqual(['PRE-1']);
    expect(row.release_info).toEqual({ released_by: [] });
    expect(row.dependents_info).toEqual({ dependents: [] });
  });

  test('stands an old worker-lane report as a 닫힘 행 without the session badge', async () => {
    const stores = createTestIssueStores();
    const closed_at = Date.now();
    seed(stores, 'tab:worker:closed', [
      {
        id: 'OLDWORKER',
        title: '보존 창 밖 워커 완료',
        closed_at,
        updated_at: closed_at,
        comment_count: 1
      }
    ]);
    const transport = vi.fn(async () => [
      {
        text: [
          '## 🤖 작업 보고서',
          '> worker · attempt attempt-9 · 2026-08-12T00:00:00Z'
        ].join('\n')
      }
    ]);
    const adapter = adapterOf({ stores, transport });

    adapter.read({ candidate_sort: SORT });
    await flush();
    const rows = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .session_done;

    expect(rows.map((/** @type {any} */ r) => r.id)).toEqual(['OLDWORKER']);
    expect(rows[0].badges).toEqual([]);
  });

  test('makes no closed row for an id the worker snapshot already reports done', () => {
    const stores = createTestIssueStores();
    const closed_at = Date.now();
    seed(stores, 'tab:worker:closed', [
      { id: 'DUP', title: 'duplicate', closed_at, comment_count: 0 }
    ]);
    const adapter = adapterOf({
      stores,
      queue: { done: [{ bead_id: 'DUP', added_at: closed_at }] }
    });

    const rows = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .session_done;

    expect(rows).toEqual([]);
  });

  test('carries an empty label list into the bead overlay', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:in-progress', [
      { id: 'RUN', title: 'running', labels: [] }
    ]);
    const adapter = adapterOf({ stores });

    const overlay = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .bead_overlay;

    expect(overlay.RUN.labels).toEqual([]);
  });

  test('carries issue_type and labels into the bead overlay', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:in-progress', [
      { id: 'RUN', title: 'running', issue_type: 'bug', labels: ['infra'] }
    ]);
    const adapter = adapterOf({ stores });

    const overlay = adapter.read({ candidate_sort: SORT }).workspaces[0]
      .bead_overlay;

    expect(overlay.RUN.issue_type).toBe('bug');
    expect(overlay.RUN.labels).toEqual(['infra']);
  });

  test('destroy stops a late session-defaults reply from invalidating the view', async () => {
    const onInvalidate = vi.fn();
    const transport = vi.fn(async () => ({ values: {} }));
    const adapter = adapterOf({
      stores: createTestIssueStores(),
      transport,
      onInvalidate
    });

    adapter.ensureSessionDefaults();
    adapter.destroy();
    await flush();

    expect(onInvalidate).not.toHaveBeenCalled();
  });
});
