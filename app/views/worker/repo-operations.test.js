import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createSubscriptionIssueStore } from '../../data/subscription-issue-store.js';
import { createWorkerQueueStore } from '../../data/worker-queue-store.js';
import { createWorkerView } from './index.js';

function issueStores() {
  /** @type {Map<string, any>} */
  const stores = new Map();
  return {
    /** @param {string} id */
    getStore(id) {
      let store = stores.get(id);
      if (!store) {
        store = createSubscriptionIssueStore(id);
        stores.set(id, store);
      }
      return store;
    },
    /** @param {string} id */
    snapshotFor(id) {
      return this.getStore(id).snapshot().slice();
    },
    subscribe() {
      return () => {};
    }
  };
}

/**
 * @param {Record<string, any>} [patch]
 */
function operationCard(patch = {}) {
  return {
    operation_id: 'op-1',
    kind: 'deploy',
    repo_id: '/repo',
    target_base: 'main',
    target_sha: 'c'.repeat(40),
    target_tree: 'd'.repeat(40),
    effective_base_sha: 'b'.repeat(40),
    script_path: 'repo-ops/script/deploy',
    script_blob_sha: 'e'.repeat(40),
    script_mode: '100755',
    state: 'failed',
    requested_at: 1000,
    started_at: 1100,
    finished_at: 1600,
    elapsed_ms: 500,
    exit_code: 2,
    signal: null,
    log_path: '/logs/op-1.log',
    log_digest: 'a'.repeat(64),
    output_tail: 'npm run build exited with 2',
    subjects: [{ bead_id: 'UI-a', merged_sha: 'a'.repeat(40) }],
    failure: {
      code: 'script_failed',
      fingerprint: 'f'.repeat(64),
      detail: 'deploy failed',
      interrupted: false
    },
    failure_kind: 'deploy_script_failure',
    verify_stage: null,
    repair_eligible: true,
    repair: {
      chain_id: 'op-1',
      owner_bead: 'UI-a',
      auto_budget: 1,
      auto_used: 1,
      remaining: 0,
      session_id: 'sess-1',
      attempt_id: 'att-1',
      attempt_status: 'running'
    },
    superseded_by: null,
    ...patch
  };
}

const POLICY = {
  schema_version: 1,
  source_commit: '23dedc763575689b66ecc32429d1130d5f81b081',
  digest: '003875ae7c87e10e30cc90cdbce8b75c85b5ca04ed3d2575bd9c4da468c5071a',
  worker_automatic: [
    'owned_deploy_worktree_fetch_detached_alignment_recreate',
    'recovered_pre_execution_fetch_timeout_retry_once',
    'repo_serial_lock_wait',
    'restart_operation_adoption',
    'exact_input_exit_zero_evidence_adoption',
    'descendant_success_covers_ancestor_rows',
    'owned_verify_candidate_cleanup'
  ],
  auto_repair: {
    default: true,
    eligible: [
      'verify_script_failure',
      'deploy_script_failure',
      'interrupted_without_terminal_exit'
    ],
    budget_per_completion_chain: 1
  },
  completion_chain: {},
  never_automatic: [
    'whole_command_retry',
    'baseline_failure_ignore',
    'config_or_script_deletion_to_bypass_gate',
    'credential_entry',
    'destructive_action',
    'history_rewrite',
    'agent_self_report_as_success',
    'unbounded_repair_session_retry'
  ]
};

/**
 * @param {Record<string, any>} [over]
 */
function queueOf(over = {}) {
  return {
    revision: 3,
    auto_advance: false,
    auto_merge: false,
    auto_repair: true,
    slots: 2,
    queue: [],
    pr_wait: [],
    done: [],
    attempts: {},
    repo_operations: [],
    repo_operation_policy: POLICY,
    ...over
  };
}

/**
 * @param {Record<string, any>} [over]
 * @param {any} [transport]
 */
function mountWorker(over = {}, transport = vi.fn()) {
  const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
  const queueStore = createWorkerQueueStore();
  queueStore.set(/** @type {any} */ (queueOf(over)));
  createWorkerView(mount, {
    issueStores: issueStores(),
    queueStore,
    transport
  });
  return { mount, queueStore, transport };
}

/**
 * @param {HTMLElement} mount
 */
function openSettings(mount) {
  /** @type {HTMLElement} */ (
    mount.querySelector('.worker-exec-defaults-btn')
  ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
  return /** @type {HTMLElement} */ (
    mount.querySelector('#worker-exec-defaults-dialog')
  );
}

beforeEach(() => {
  document.body.innerHTML = '<div id="m"></div>';
  window.localStorage.clear();
});

describe('repo operation cards', () => {
  test('renders nothing when the workspace has no operations', () => {
    const { mount } = mountWorker();

    expect(mount.querySelector('.worker-repo-ops')).toBeNull();
  });

  test('renders one card per projected operation', () => {
    const { mount } = mountWorker({ repo_operations: [operationCard()] });

    expect(mount.querySelectorAll('.worker-repo-op')).toHaveLength(1);
  });

  test('shows the kind and the bound target sha', () => {
    const { mount } = mountWorker({ repo_operations: [operationCard()] });

    const card = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-repo-op')
    );

    expect([
      card.querySelector('.worker-repo-op__kind')?.textContent,
      card.querySelector('.worker-repo-op__target')?.textContent
    ]).toEqual(['deploy', `main@${'c'.repeat(7)}`]);
  });

  test('shows the target tree', () => {
    const { mount } = mountWorker({ repo_operations: [operationCard()] });

    expect(mount.querySelector('.worker-repo-op__tree')?.textContent).toBe(
      `tree ${'d'.repeat(7)}`
    );
  });

  test('shows the declared script path and pinned blob', () => {
    const { mount } = mountWorker({ repo_operations: [operationCard()] });

    expect([
      mount.querySelector('.worker-repo-op__script')?.textContent,
      mount.querySelector('.worker-repo-op__blob')?.textContent
    ]).toEqual(['repo-ops/script/deploy', `blob ${'e'.repeat(7)}`]);
  });

  test('shows the elapsed time', () => {
    const { mount } = mountWorker({
      repo_operations: [operationCard({ elapsed_ms: 90_000 })]
    });

    expect(mount.querySelector('.worker-repo-op__elapsed')?.textContent).toBe(
      '1분 30초'
    );
  });

  test('shows the exit code', () => {
    const { mount } = mountWorker({ repo_operations: [operationCard()] });

    expect(mount.querySelector('.worker-repo-op__exit')?.textContent).toBe(
      'exit 2'
    );
  });

  test('shows the sanitized output tail behind a disclosure', () => {
    const { mount } = mountWorker({ repo_operations: [operationCard()] });

    expect(
      mount.querySelector('.worker-repo-op__output pre')?.textContent
    ).toBe('npm run build exited with 2');
  });

  test('shows the full log path', () => {
    const { mount } = mountWorker({ repo_operations: [operationCard()] });

    expect(mount.querySelector('.worker-repo-op__log code')?.textContent).toBe(
      '/logs/op-1.log'
    );
  });

  test('links the repair session attempt', () => {
    const { mount } = mountWorker({ repo_operations: [operationCard()] });

    expect(
      /** @type {HTMLElement} */ (
        mount.querySelector('.worker-repo-op__session')
      ).dataset.attemptId
    ).toBe('att-1');
  });

  test('shows the remaining automatic budget', () => {
    const { mount } = mountWorker({ repo_operations: [operationCard()] });

    expect(
      mount
        .querySelector('.worker-repo-op__budget')
        ?.textContent?.replace(/\s+/g, ' ')
        .trim()
    ).toBe('자동 해결 남음 0/1');
  });

  test('names the deploy failure on its resolve button', () => {
    const { mount } = mountWorker({ repo_operations: [operationCard()] });

    expect(
      mount.querySelector('.worker-repo-op__resolve')?.textContent?.trim()
    ).toBe('배포 실패 해결');
  });

  test('names a pre-merge verify failure on its resolve button', () => {
    const { mount } = mountWorker({
      repo_operations: [
        operationCard({
          kind: 'verify',
          failure_kind: 'verify_script_failure',
          verify_stage: 'pre_merge'
        })
      ]
    });

    expect(
      mount.querySelector('.worker-repo-op__resolve')?.textContent?.trim()
    ).toBe('검증 실패 해결 후 머지');
  });

  test('names a post-merge verify failure on its resolve button', () => {
    const { mount } = mountWorker({
      repo_operations: [
        operationCard({
          kind: 'verify',
          failure_kind: 'verify_script_failure',
          verify_stage: 'post_merge'
        })
      ]
    });

    expect(
      mount.querySelector('.worker-repo-op__resolve')?.textContent?.trim()
    ).toBe('검증 실패 해결');
  });

  test('names an interrupted operation on its resolve button', () => {
    const { mount } = mountWorker({
      repo_operations: [
        operationCard({ failure_kind: 'interrupted_without_terminal_exit' })
      ]
    });

    expect(
      mount.querySelector('.worker-repo-op__resolve')?.textContent?.trim()
    ).toBe('중단된 작업 진단');
  });

  test('offers no generic retry control', () => {
    const { mount } = mountWorker({ repo_operations: [operationCard()] });

    const labels = Array.from(
      mount.querySelectorAll('.worker-repo-op button')
    ).map((button) => button.textContent?.trim());

    expect(labels).not.toContain('재시도');
  });

  test('shows an automatically repairing operation as such', () => {
    const { mount } = mountWorker({
      repo_operations: [operationCard({ state: 'repairing' })]
    });

    expect(mount.querySelector('.worker-repo-op__state')?.textContent).toBe(
      '자동 해결 중'
    );
  });

  test('offers no resolve button while a repair is running', () => {
    const { mount } = mountWorker({
      repo_operations: [operationCard({ state: 'repairing' })]
    });

    expect(mount.querySelector('.worker-repo-op__resolve')).toBeNull();
  });

  test('sends the resolve click through the coordinator mutation', () => {
    const transport = vi.fn(async () => ({ ok: true, queue: queueOf() }));
    const { mount } = mountWorker(
      { repo_operations: [operationCard()] },
      transport
    );

    /** @type {HTMLElement} */ (
      mount.querySelector('.worker-repo-op__resolve')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(transport).toHaveBeenCalledWith('worker-repo-operation-repair', {
      operation_id: 'op-1'
    });
  });
});

describe('자동 해결 workspace setting', () => {
  test('shows the current auto_repair value', () => {
    const { mount } = mountWorker();

    const dialog = openSettings(mount);

    expect(
      dialog.querySelector('[data-seam="auto-repair-value"]')?.textContent
    ).toBe('켜짐');
  });

  test('defaults the toggle on', () => {
    const { mount } = mountWorker();

    const dialog = openSettings(mount);

    expect(
      /** @type {HTMLInputElement} */ (
        dialog.querySelector('.exec-defaults__repair-input')
      ).checked
    ).toBe(true);
  });

  test('reflects a durable off', () => {
    const { mount } = mountWorker({ auto_repair: false });

    const dialog = openSettings(mount);

    expect(
      dialog.querySelector('[data-seam="auto-repair-value"]')?.textContent
    ).toBe('꺼짐');
  });

  test('sends its own mutation without touching the automation toggles', () => {
    const transport = vi.fn(async () => ({ ok: true, queue: queueOf() }));
    const { mount } = mountWorker({}, transport);
    const dialog = openSettings(mount);

    const input = /** @type {HTMLInputElement} */ (
      dialog.querySelector('.exec-defaults__repair-input')
    );
    input.checked = false;
    input.dispatchEvent(new Event('change', { bubbles: true }));

    expect(transport).toHaveBeenCalledWith('worker-auto-repair-toggle', {
      on: false,
      expected_revision: 3
    });
  });

  test('leaves auto_advance untouched when the repair axis is toggled', () => {
    const transport = vi.fn(async () => ({ ok: true, queue: queueOf() }));
    const { mount, queueStore } = mountWorker({}, transport);
    const dialog = openSettings(mount);

    const input = /** @type {HTMLInputElement} */ (
      dialog.querySelector('.exec-defaults__repair-input')
    );
    input.checked = false;
    input.dispatchEvent(new Event('change', { bubbles: true }));

    expect(/** @type {any} */ (queueStore.get()).auto_advance).toBe(false);
  });

  test('does not change auto_repair when the automation toggle is clicked', () => {
    const transport = vi.fn(async () => ({ ok: true, queue: queueOf() }));
    const { mount, queueStore } = mountWorker({}, transport);

    /** @type {HTMLElement} */ (
      mount.querySelector('.worker-play')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect([
      /** @type {any} */ (queueStore.get()).auto_repair,
      /** @type {any[]} */ (transport.mock.calls)[0]?.[0]
    ]).toEqual([true, 'worker-automation-toggle']);
  });

  test('shows the remaining automatic budget', () => {
    const { mount } = mountWorker({ repo_operations: [operationCard()] });

    const dialog = openSettings(mount);

    expect(
      dialog.querySelector('[data-seam="auto-repair-budget"]')?.textContent
    ).toBe('남은 자동 해결 0회');
  });

  test('names the active repair session', () => {
    const { mount } = mountWorker({
      repo_operations: [operationCard({ state: 'repairing' })]
    });

    const dialog = openSettings(mount);

    expect(
      dialog.querySelector('[data-seam="auto-repair-session"]')?.textContent
    ).toBe('해결 세션 실행 중 · UI-a');
  });

  test('says so when no repair session is running', () => {
    const { mount } = mountWorker();

    const dialog = openSettings(mount);

    expect(
      dialog.querySelector('[data-seam="auto-repair-session"]')?.textContent
    ).toBe('실행 중인 해결 세션 없음');
  });

  test('renders every worker-automatic entry the backend sent', () => {
    const { mount } = mountWorker();

    const dialog = openSettings(mount);

    expect(
      dialog.querySelectorAll(
        '[data-policy="worker-automatic"] .exec-defaults__policy-list li'
      )
    ).toHaveLength(7);
  });

  test('renders every eligible auto-repair failure the backend sent', () => {
    const { mount } = mountWorker();

    const dialog = openSettings(mount);

    expect(
      dialog.querySelectorAll(
        '[data-policy="auto-repair-eligible"] .exec-defaults__policy-list li'
      )
    ).toHaveLength(3);
  });

  test('renders every never-automatic entry the backend sent', () => {
    const { mount } = mountWorker();

    const dialog = openSettings(mount);

    expect(
      dialog.querySelectorAll(
        '[data-policy="never-automatic"] .exec-defaults__policy-list li'
      )
    ).toHaveLength(8);
  });

  test('keeps each list item bound to its contract token', () => {
    const { mount } = mountWorker();

    const dialog = openSettings(mount);

    expect(
      Array.from(
        dialog.querySelectorAll(
          '[data-policy="auto-repair-eligible"] .exec-defaults__policy-list li'
        )
      ).map((item) => /** @type {HTMLElement} */ (item).dataset.token)
    ).toEqual([
      'verify_script_failure',
      'deploy_script_failure',
      'interrupted_without_terminal_exit'
    ]);
  });

  test('renders an unknown contract token verbatim rather than dropping it', () => {
    const { mount } = mountWorker({
      repo_operation_policy: {
        ...POLICY,
        never_automatic: ['a_future_contract_entry']
      }
    });

    const dialog = openSettings(mount);

    expect(
      dialog
        .querySelector(
          '[data-policy="never-automatic"] .exec-defaults__policy-list li'
        )
        ?.textContent?.trim()
    ).toBe('a_future_contract_entry');
  });

  test('names the completion-chain budget on the eligible list', () => {
    const { mount } = mountWorker();

    const dialog = openSettings(mount);

    expect(
      dialog.querySelector(
        '[data-policy="auto-repair-eligible"] .exec-defaults__policy-label'
      )?.textContent
    ).toBe('자동 해결 세션 (완료 체인당 최대 1회)');
  });

  test('marks an absent verify stage as 안 함 with no error badge', () => {
    const { mount } = mountWorker({ workspace_info: { verify_cmd: null } });

    const dialog = openSettings(mount);
    const group = /** @type {HTMLElement} */ (
      dialog.querySelector('.exec-defaults__vd-group[data-vd="verify"]')
    );

    expect([
      group.querySelector('.exec-defaults__vd-badge--absent')?.textContent,
      group.querySelector('.exec-defaults__vd-badge--error')
    ]).toEqual(['안 함', null]);
  });

  test('marks an absent deploy stage as 안 함 with no error badge', () => {
    const { mount } = mountWorker({ workspace_info: { deploy_cmd: null } });

    const dialog = openSettings(mount);
    const group = /** @type {HTMLElement} */ (
      dialog.querySelector('.exec-defaults__vd-group[data-vd="deploy"]')
    );

    expect([
      group.querySelector('.exec-defaults__vd-badge--absent')?.textContent,
      group.querySelector('.exec-defaults__vd-badge--error')
    ]).toEqual(['안 함', null]);
  });

  test('omits the policy lists when the backend sent none', () => {
    const { mount } = mountWorker({ repo_operation_policy: null });

    const dialog = openSettings(mount);

    expect(dialog.querySelector('.exec-defaults__policy')).toBeNull();
  });
});
