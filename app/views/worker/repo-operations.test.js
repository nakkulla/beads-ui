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
    retry: {
      status: 'consumed',
      first_fingerprint: 'f'.repeat(64),
      blocked_reason: null,
      absorbed: false
    },
    superseded_by: null,
    ...patch
  };
}

const POLICY = {
  schema_version: 3,
  supported: true,
  source_commit: '739fb757a965622372b1cd152e4af26237587c8e',
  digest: '08811eb9bc5b0f88f0994be2a273457b9b23efdeed14a0bc9ee29e27210475cd',
  worker_automatic: [
    'owned_deploy_worktree_fetch_detached_alignment_recreate',
    'recovered_pre_execution_fetch_timeout_retry_once',
    'repo_serial_lock_wait',
    'restart_operation_adoption',
    'exact_input_exit_zero_evidence_adoption',
    'descendant_success_covers_ancestor_rows',
    'owned_verify_candidate_cleanup'
  ],
  resolution_ladder: [
    {
      id: 'script_retry',
      trigger: 'automatic',
      applies_when: 'script_identity_present',
      attempts_per_operation_attempt: 1
    }
  ],
  after_ladder:
    'terminal_failed_with_recorded_cause_then_user_manual_rerun_only',
  manual_human_fix: 'absent',
  never_automatic: [
    'bounded_single_script_retry_exceeded',
    'repair_session_dispatch',
    'baseline_failure_ignore',
    'config_or_script_deletion_to_bypass_gate',
    'credential_entry',
    'destructive_action',
    'history_rewrite',
    'agent_self_report_as_success'
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
 * @param {Record<string, any>} [view_options]
 */
function mountWorker(over = {}, transport = vi.fn(), view_options = {}) {
  const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
  const queueStore = createWorkerQueueStore();
  queueStore.set(/** @type {any} */ (queueOf(over)));
  const view = createWorkerView(mount, {
    issueStores: issueStores(),
    queueStore,
    transport,
    ...view_options
  });
  return { mount, queueStore, transport, view };
}

/**
 * The repo-operation settings now live INLINE on the Worker screen (spec
 * 비-목표), so there is no dialog to open — the section is simply there.
 *
 * @param {HTMLElement} mount
 */
function openSettings(mount) {
  return /** @type {HTMLElement} */ (
    mount.querySelector('.worker-repo-ops-settings')
  );
}

beforeEach(() => {
  vi.unstubAllGlobals();
  document.body.innerHTML = '<div id="m"></div>';
  window.localStorage.clear();
});

/**
 * Open the timeline the way a user does — the strip click (§4.1/§4.2).
 *
 * @param {HTMLElement} mount
 * @returns {HTMLElement}
 */
function openTimeline(mount) {
  /** @type {HTMLElement} */ (
    mount.querySelector('.worker-repo-strip')
  ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
  return /** @type {HTMLElement} */ (
    mount.querySelector('.worker-repo-drawer')
  );
}

describe('저장소 작업 상태 스트립 (UI-q0uy §4.1)', () => {
  test('renders nothing when the workspace has no operations', () => {
    const { mount } = mountWorker();

    expect(mount.querySelector('.worker-repo-strip')).toBeNull();
  });

  test('never forces itself open on a failure', () => {
    const { mount } = mountWorker({ repo_operations: [operationCard()] });

    expect(mount.querySelector('details.worker-repo-ops')).toBeNull();
  });

  test('reads the current deployment while collapsed', () => {
    const { mount } = mountWorker({
      repo_operations: [operationCard({ state: 'succeeded', failure: null })]
    });

    expect(mount.querySelector('.worker-repo-strip__sha')?.textContent).toBe(
      'c'.repeat(7)
    );
  });

  test('omits the deployment fact when no deploy has succeeded', () => {
    const { mount } = mountWorker({ repo_operations: [operationCard()] });

    expect(mount.querySelector('.worker-repo-strip__fact')).toBeNull();
  });

  test('counts an unresolved failure in the badge', () => {
    const { mount } = mountWorker({ repo_operations: [operationCard()] });

    expect(mount.querySelector('.worker-repo-strip__badge')?.textContent).toBe(
      '해결 필요 1'
    );
  });

  test('counts a stopped cleanup in the same badge', () => {
    const { mount } = mountWorker({
      repo_operations: [operationCard({ state: 'succeeded', failure: null })],
      cleanup_failed: { 'UI-a': { step: 'child_sweep', reason: 'x', at: 1 } }
    });

    expect(mount.querySelector('.worker-repo-strip__badge')?.textContent).toBe(
      '해결 필요 1'
    );
  });

  test('drops a dismissed failure from the tally', () => {
    const { mount } = mountWorker({
      repo_operations: [operationCard({ dismissed: { at: 5, by: 'user' } })]
    });

    expect(mount.querySelector('.worker-repo-strip__badge')?.textContent).toBe(
      '모두 정상'
    );
  });

  test('says 모두 정상 when nothing needs a human', () => {
    const { mount } = mountWorker({
      repo_operations: [operationCard({ state: 'succeeded', failure: null })]
    });

    expect(mount.querySelector('.worker-repo-strip__badge')?.textContent).toBe(
      '모두 정상'
    );
  });
});

describe('저장소 작업 타임라인 (UI-q0uy §4.2)', () => {
  test('opens on a strip click', () => {
    const { mount } = mountWorker({ repo_operations: [operationCard()] });

    expect(openTimeline(mount)).not.toBeNull();
  });

  test('renders one event per operation', () => {
    const { mount } = mountWorker({
      repo_operations: [
        operationCard(),
        operationCard({ operation_id: 'op-2' })
      ]
    });

    expect(openTimeline(mount).querySelectorAll('.worker-ev')).toHaveLength(2);
  });

  test('names the deploy lane in human words', () => {
    const { mount } = mountWorker({ repo_operations: [operationCard()] });

    expect(
      openTimeline(mount).querySelector('.worker-ev__what')?.textContent
    ).toBe('머지 후 배포');
  });

  test('says a known failure as a cause sentence', () => {
    const { mount } = mountWorker({
      repo_operations: [
        operationCard({
          failure: {
            code: 'repo_ops_worktree_unowned',
            fingerprint: 'f'.repeat(64),
            detail: '',
            interrupted: false
          },
          failure_kind: 'repo_ops_worktree_unowned'
        })
      ]
    });

    expect(
      openTimeline(mount).querySelector('.worker-ev__cause')?.textContent
    ).toBe(
      '배포 워크트리가 아직 Worker 소유가 아니어서 스크립트 실행 전에 중단됐습니다.'
    );
  });

  test('says a bare script failure by its server classification', () => {
    const { mount } = mountWorker({
      repo_operations: [
        operationCard({
          failure: {
            code: 'script_failed',
            fingerprint: 'f'.repeat(64),
            detail: '',
            interrupted: false
          },
          failure_kind: 'deploy_script_failure'
        })
      ]
    });

    expect(
      openTimeline(mount).querySelector('.worker-ev__cause')?.textContent
    ).toBe('배포 실패 — 배포 스크립트가 실패했습니다.');
  });

  test('keeps a classified failure code out of the visible body', () => {
    const { mount } = mountWorker({
      repo_operations: [
        operationCard({
          failure: {
            code: 'script_failed',
            fingerprint: 'f'.repeat(64),
            detail: '',
            interrupted: false
          },
          failure_kind: 'deploy_script_failure'
        })
      ]
    });
    const drawer = openTimeline(mount);
    /** @type {HTMLElement} */ (
      drawer.querySelector('.worker-ev__details')
    ).remove();

    expect(drawer.textContent).not.toContain('script_failed');
  });

  test('renders an unknown contract token verbatim', () => {
    const { mount } = mountWorker({
      repo_operations: [
        operationCard({
          failure: {
            code: 'a_future_failure_code',
            fingerprint: 'f'.repeat(64),
            detail: '',
            interrupted: false
          },
          failure_kind: 'a_future_failure_code'
        })
      ]
    });

    expect(
      openTimeline(mount).querySelector('.worker-ev__cause')?.textContent
    ).toBe('a_future_failure_code');
  });

  test('keeps the raw failure code inside the details block', () => {
    const { mount } = mountWorker({ repo_operations: [operationCard()] });

    expect(
      openTimeline(mount).querySelector('.worker-ev__kv dd')?.textContent
    ).toBe('script_failed');
  });

  test('keeps the script, blob and exit code in the details block', () => {
    const { mount } = mountWorker({ repo_operations: [operationCard()] });

    expect(
      openTimeline(mount).querySelector('.worker-ev__kv')?.textContent
    ).toContain(`repo-ops/script/deploy · blob ${'e'.repeat(7)} · exit 2`);
  });

  test('keeps the full log path in the details block', () => {
    const { mount } = mountWorker({ repo_operations: [operationCard()] });

    expect(
      openTimeline(mount).querySelector('.worker-ev__kv')?.textContent
    ).toContain('/logs/op-1.log');
  });

  test('keeps the sanitized output tail in the details block', () => {
    const { mount } = mountWorker({ repo_operations: [operationCard()] });

    expect(
      openTimeline(mount).querySelector('.worker-ev__kv')?.textContent
    ).toContain('npm run build exited with 2');
  });

  test('shows the elapsed time on the event line', () => {
    const { mount } = mountWorker({
      repo_operations: [operationCard({ elapsed_ms: 90_000 })]
    });

    expect(
      openTimeline(mount).querySelector('.worker-ev__meta')?.textContent
    ).toContain('1분 30초');
  });

  test('leaves 기록 닫기 as the only action on a failed card', () => {
    const { mount } = mountWorker({ repo_operations: [operationCard()] });

    const labels = Array.from(
      openTimeline(mount).querySelectorAll('.worker-ev__acts button')
    ).map((button) => button.textContent?.trim());

    expect(labels).toEqual(['기록 닫기']);
    expect(
      openTimeline(mount).querySelector('.worker-repo-op__resolve')
    ).toBeNull();
  });

  test('offers no generic retry control', () => {
    const { mount } = mountWorker({ repo_operations: [operationCard()] });

    const labels = Array.from(
      openTimeline(mount).querySelectorAll('.worker-ev button')
    ).map((button) => button.textContent?.trim());

    expect(labels).not.toContain('재시도');
  });

  test('offers no action buttons on an acknowledged failure', () => {
    const { mount } = mountWorker({
      repo_operations: [operationCard({ dismissed: { at: 5, by: 'user' } })]
    });

    expect(
      openTimeline(mount).querySelector('.worker-repo-op__dismiss')
    ).toBeNull();
  });

  test('marks an acknowledged failure as 접수됨', () => {
    const { mount } = mountWorker({
      repo_operations: [operationCard({ dismissed: { at: 5, by: 'user' } })]
    });

    expect(
      Array.from(openTimeline(mount).querySelectorAll('.worker-ev__st')).map(
        (el) => el.textContent
      )
    ).toContain('접수됨');
  });

  test('marks a superseded failure as 덮임 without action buttons', () => {
    const { mount } = mountWorker({
      repo_operations: [operationCard({ superseded_by: 'op-2' })]
    });

    const timeline = openTimeline(mount);
    expect(
      Array.from(timeline.querySelectorAll('.worker-ev__st')).map(
        (element) => element.textContent
      )
    ).toEqual(['실패', '덮임']);
    expect(timeline.querySelector('.worker-repo-op__dismiss')).toBeNull();
    expect(timeline.querySelector('.worker-ev__details')).not.toBeNull();
  });

  test('sends the dismiss click as its own mutation', () => {
    const transport = vi.fn(async () => ({ ok: true, queue: queueOf() }));
    const { mount } = mountWorker(
      { repo_operations: [operationCard()] },
      transport
    );

    /** @type {HTMLElement} */ (
      openTimeline(mount).querySelector('.worker-repo-op__dismiss')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(transport).toHaveBeenCalledWith('worker-repo-operation-dismiss', {
      operation_id: 'op-1'
    });
  });

  test('merges operations and stopped cleanups newest first', () => {
    const { mount } = mountWorker({
      repo_operations: [operationCard({ finished_at: 1000 })],
      cleanup_failed: { 'UI-b': { step: 'child_sweep', reason: 'x', at: 5000 } }
    });

    expect(
      Array.from(openTimeline(mount).querySelectorAll('.worker-ev')).map((el) =>
        el.getAttribute('data-state')
      )
    ).toEqual(['cleanup_stalled', 'failed']);
  });

  test('leaves 정리 재개 as the only action on a stopped cleanup', () => {
    const { mount } = mountWorker({
      cleanup_failed: {
        'UI-cleanup': {
          step: 'repo_operations',
          reason: 'verify_cmd_failed',
          at: 5000
        }
      }
    });
    const timeline = openTimeline(mount);

    expect(timeline.querySelector('.worker-cleanup__resume')).not.toBeNull();
    expect(timeline.querySelector('.worker-repo-op__resolve')).toBeNull();
  });

  test('renders retry pending with its dedicated chip', () => {
    const { mount } = mountWorker({
      repo_operations: [
        operationCard({
          state: 'retry_pending',
          failure: null,
          finished_at: null
        })
      ]
    });

    expect(
      openTimeline(mount).querySelector('.worker-ev__st')?.textContent
    ).toBe('재시도 중');
  });

  test('sorts an event with no time to the oldest end', () => {
    const { mount } = mountWorker({
      repo_operations: [
        operationCard({
          operation_id: 'op-timeless',
          finished_at: null,
          requested_at: null
        }),
        operationCard({ operation_id: 'op-timed', finished_at: 10 })
      ]
    });

    expect(
      Array.from(openTimeline(mount).querySelectorAll('.worker-ev')).map((el) =>
        el.getAttribute('data-operation-id')
      )
    ).toEqual(['op-timed', 'op-timeless']);
  });

  // UI-lsti §5: 평평한 20개 자르기는 「최근 5개 + 미해결 전부」로 바뀌었다.
  test('folds settled events down to the five newest', () => {
    const { mount } = mountWorker({
      repo_operations: Array.from({ length: 25 }, (_unused, index) =>
        operationCard({
          operation_id: `op-${index}`,
          finished_at: index,
          state: 'succeeded'
        })
      )
    });

    expect(openTimeline(mount).querySelectorAll('.worker-ev')).toHaveLength(5);
  });

  test('never folds an unresolved event away', () => {
    const { mount } = mountWorker({
      repo_operations: Array.from({ length: 25 }, (_unused, index) =>
        operationCard({ operation_id: `op-${index}`, finished_at: index })
      )
    });

    expect(openTimeline(mount).querySelectorAll('.worker-ev')).toHaveLength(25);
  });
});

describe('저장소 작업 자동 처리 기준 (UI-s582 §1)', () => {
  test('renders every worker-automatic entry the backend sent', () => {
    const { mount } = mountWorker();

    const dialog = openSettings(mount);

    expect(
      dialog.querySelectorAll(
        '[data-policy="worker-automatic"] .worker-repo-ops__policy-list li'
      )
    ).toHaveLength(7);
  });

  test('drops the retired eligible-failure list', () => {
    const { mount } = mountWorker();

    const dialog = openSettings(mount);

    expect(
      dialog.querySelector('[data-policy="auto-repair-eligible"]')
    ).toBeNull();
  });

  test('drops the retired 자동 해결 toggle and 해결 사다리 surfaces', () => {
    const { mount } = mountWorker();

    const dialog = openSettings(mount);

    expect(dialog.querySelector('.worker-repo-ops__repair-input')).toBeNull();
    expect(dialog.querySelector('[data-seam="auto-repair-value"]')).toBeNull();
    expect(dialog.querySelector('[data-seam="auto-repair-budget"]')).toBeNull();
    expect(
      dialog.querySelector('[data-seam="auto-repair-session"]')
    ).toBeNull();
    expect(
      dialog.querySelector('[data-policy="resolution-ladder"]')
    ).toBeNull();
    expect(dialog.textContent).not.toContain('해결 사다리');
  });

  test('says so when the pinned contract schema is not the one this build reads', () => {
    const { mount } = mountWorker({
      repo_operation_policy: {
        ...POLICY,
        schema_version: 2,
        supported: false
      }
    });
    const dialog = openSettings(mount);

    expect(dialog.textContent).toContain(
      '계약 스키마 불일치 — 자동 재시도가 정지되었습니다 (v2)'
    );
  });

  test('renders every never-automatic entry the backend sent', () => {
    const { mount } = mountWorker();

    const dialog = openSettings(mount);

    expect(
      dialog.querySelectorAll(
        '[data-policy="never-automatic"] .worker-repo-ops__policy-list li'
      )
    ).toHaveLength(8);
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
          '[data-policy="never-automatic"] .worker-repo-ops__policy-list li'
        )
        ?.textContent?.trim()
    ).toBe('a_future_contract_entry');
  });

  test('collapses the policy lists by default', () => {
    const { mount } = mountWorker();

    const dialog = openSettings(mount);

    expect(
      /** @type {HTMLDetailsElement} */ (
        dialog.querySelector('[data-seam="policy-lists"]')
      ).open
    ).toBe(false);
  });

  test('summarizes the two list sizes on the collapsed summary', () => {
    const { mount } = mountWorker();

    const dialog = openSettings(mount);

    expect(
      dialog
        .querySelector('.worker-repo-ops__policy-count')
        ?.textContent?.replace(/\s+/g, ' ')
        .trim()
    ).toBe('자동 7 · 금지 8');
  });

  test('omits the policy lists when the backend sent none', () => {
    const { mount } = mountWorker({ repo_operation_policy: null });

    const dialog = openSettings(mount);

    expect(dialog.querySelector('.worker-repo-ops__policy')).toBeNull();
  });
});

/**
 * @param {Record<string, any>} [over]
 */
function repoOps(over = {}) {
  return {
    status: 'resolved',
    source_path: 'repo-ops/config.toml',
    base_ref: 'main',
    base_sha: 'a'.repeat(40),
    repo_id: '/repo',
    verify: null,
    deploy: { script: 'repo-ops/script/deploy', timeout_ms: 600_000 },
    error_code: null,
    ...over
  };
}

describe('저장소 작업 선언 설정 (UI-q0uy §4.5)', () => {
  test('opens declared verify and deploy scripts at the pinned base SHA', () => {
    const fetchImpl = vi.fn(() => new Promise(() => {}));
    vi.stubGlobal('fetch', fetchImpl);
    const { mount, view } = mountWorker(
      {
        workspace_info: {
          verify_cmd: null,
          repo_ops: repoOps({
            verify: { script: 'repo-ops/script/verify', timeout_ms: 300_000 }
          })
        }
      },
      vi.fn(),
      { getWorkspacePath: () => '/repo' }
    );
    const verify_button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-lane="verify"] button.worker-repo-ops__vd-cmd')
    );
    const deploy_button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-lane="deploy"] button.worker-repo-ops__vd-cmd')
    );

    verify_button.click();
    deploy_button.click();

    expect(fetchImpl).toHaveBeenNthCalledWith(
      1,
      `/api/repo-ops-script?workspace=${encodeURIComponent('/repo')}&lane=verify&base_sha=${'a'.repeat(40)}`
    );
    expect(fetchImpl).toHaveBeenNthCalledWith(
      2,
      `/api/repo-ops-script?workspace=${encodeURIComponent('/repo')}&lane=deploy&base_sha=${'a'.repeat(40)}`
    );
    expect(
      document.querySelector('.repo-ops-script-viewer[role="dialog"]')
    ).not.toBeNull();
    view.destroy();
  });

  test('keeps an open script viewer through same-workspace queue renders', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise(() => {}))
    );
    const { mount, queueStore, view } = mountWorker(
      {
        workspace_info: { verify_cmd: null, repo_ops: repoOps() }
      },
      vi.fn(),
      { getWorkspacePath: () => '/repo' }
    );
    /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-lane="deploy"] button.worker-repo-ops__vd-cmd')
    ).click();

    queueStore.set(/** @type {any} */ ({ ...queueStore.get(), revision: 4 }));

    expect(document.querySelector('.repo-ops-script-viewer')).not.toBeNull();
    view.destroy();
  });

  test('clears script content when the Worker workspace changes', async () => {
    let workspace = '/repo-a';
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          ok: true,
          lane: 'deploy',
          path: 'repo-ops/script/deploy',
          base_ref: 'main',
          base_sha: 'a'.repeat(40),
          content: 'echo old workspace'
        })
      })
    );
    const { mount, queueStore, view } = mountWorker(
      {
        workspace_info: { verify_cmd: null, repo_ops: repoOps() }
      },
      vi.fn(),
      { getWorkspacePath: () => workspace }
    );
    /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-lane="deploy"] button.worker-repo-ops__vd-cmd')
    ).click();
    await vi.waitFor(() =>
      expect(document.body.textContent).toContain('echo old workspace')
    );

    workspace = '/repo-b';
    queueStore.set(/** @type {any} */ ({ ...queueStore.get(), revision: 4 }));

    expect(document.querySelector('.repo-ops-script-viewer')).toBeNull();
    expect(document.body.textContent).not.toContain('echo old workspace');
    view.destroy();
  });

  test('renders no click control for an undeclared lane', () => {
    const { mount } = mountWorker({
      workspace_info: { verify_cmd: null, repo_ops: repoOps() }
    });

    const dialog = openSettings(mount);

    expect(
      dialog.querySelector(
        '[data-lane="verify"] button.worker-repo-ops__vd-cmd'
      )
    ).toBeNull();
    expect(
      dialog.querySelector(
        '[data-lane="deploy"] button.worker-repo-ops__vd-cmd'
      )
    ).not.toBeNull();
  });

  test('names the declaration source with its pinned base', () => {
    const { mount } = mountWorker({
      workspace_info: { verify_cmd: null, repo_ops: repoOps() }
    });

    const dialog = openSettings(mount);

    expect(dialog.querySelector('.worker-repo-ops__vd-src')?.textContent).toBe(
      `repo-ops/config.toml @ main@${'a'.repeat(7)}`
    );
  });

  test('shows the deploy script this repo actually declares', () => {
    const { mount } = mountWorker({
      workspace_info: { verify_cmd: null, repo_ops: repoOps() }
    });

    const dialog = openSettings(mount);

    expect(
      dialog.querySelector('[data-lane="deploy"] .worker-repo-ops__vd-cmd')
        ?.textContent
    ).toBe('repo-ops/script/deploy');
  });

  test('shows the deploy timeout', () => {
    const { mount } = mountWorker({
      workspace_info: { verify_cmd: null, repo_ops: repoOps() }
    });

    const dialog = openSettings(mount);

    expect(
      dialog.querySelector('[data-lane="deploy"] .worker-repo-ops__vd-badge')
        ?.textContent
    ).toBe('timeout 10분');
  });

  test('names where the deploy script runs', () => {
    const { mount } = mountWorker({
      workspace_info: { verify_cmd: null, repo_ops: repoOps() }
    });

    const dialog = openSettings(mount);

    expect(
      dialog.querySelector('[data-lane="deploy"] .worker-repo-ops__lane-d')
        ?.textContent
    ).toContain('.worktrees/.repo-ops-deploy');
  });

  test('says an undeclared verify lane judges without verify', () => {
    const { mount } = mountWorker({
      workspace_info: { verify_cmd: null, repo_ops: repoOps() }
    });

    const dialog = openSettings(mount);

    expect(
      dialog
        .querySelector('[data-lane="verify"] .worker-repo-ops__lane-v')
        ?.textContent?.replace(/\s+/g, ' ')
        .trim()
    ).toBe('선언 없음verify 없이 판정');
  });

  test('shows a declared verify script', () => {
    const { mount } = mountWorker({
      workspace_info: {
        verify_cmd: null,
        repo_ops: repoOps({
          verify: { script: 'repo-ops/script/verify', timeout_ms: 300_000 }
        })
      }
    });

    const dialog = openSettings(mount);

    expect(
      dialog.querySelector('[data-lane="verify"] .worker-repo-ops__vd-cmd')
        ?.textContent
    ).toBe('repo-ops/script/verify');
  });

  test('renders both lanes as undeclared when the config declares neither', () => {
    const { mount } = mountWorker({
      workspace_info: {
        verify_cmd: null,
        repo_ops: repoOps({ verify: null, deploy: null })
      }
    });

    const dialog = openSettings(mount);

    expect(dialog.querySelectorAll('.worker-repo-ops__vd-cmd')).toHaveLength(0);
  });

  test('shows no legacy display on a proven absence', () => {
    const { mount } = mountWorker({
      workspace_info: {
        verify_cmd: null,
        repo_ops: repoOps({ status: 'absent', verify: null, deploy: null })
      }
    });

    const dialog = openSettings(mount);

    expect(
      dialog.querySelector('.worker-repo-ops__vd-group[data-vd="verify"]')
    ).toBeNull();
  });

  test('shows no legacy display on a snapshot without repo ops', () => {
    const { mount } = mountWorker({ workspace_info: { verify_cmd: null } });

    const dialog = openSettings(mount);

    expect(
      dialog.querySelector('.worker-repo-ops__vd-group[data-vd="verify"]')
    ).toBeNull();
  });

  test('says the declaration is still being read while pending', () => {
    const { mount } = mountWorker({
      workspace_info: {
        verify_cmd: null,
        repo_ops: repoOps({ status: 'pending' })
      }
    });

    const dialog = openSettings(mount);

    expect(
      dialog.querySelector('[data-seam="repo-ops-status"]')?.textContent?.trim()
    ).toBe('선언 확인 중');
  });

  test('says the declaration could not be read on an error', () => {
    const { mount } = mountWorker({
      workspace_info: {
        verify_cmd: null,
        repo_ops: repoOps({
          status: 'error',
          error_code: 'repo_ops_config_invalid'
        })
      }
    });

    const dialog = openSettings(mount);

    expect(
      dialog
        .querySelector('[data-seam="repo-ops-status"]')
        ?.textContent?.replace(/\s+/g, ' ')
        .trim()
    ).toContain('선언 읽기 실패');
  });

  test('never falls back to the legacy display while pending', () => {
    const { mount } = mountWorker({
      workspace_info: {
        verify_cmd: null,
        repo_ops: repoOps({ status: 'pending' })
      }
    });

    const dialog = openSettings(mount);

    expect(
      dialog.querySelector('.worker-repo-ops__vd-group[data-vd="verify"]')
    ).toBeNull();
  });
});

describe('workspace verify/deploy opt-out (UI-lsti §4)', () => {
  /**
   * @param {Record<string, any>} [over]
   * @param {any} [transport]
   */
  function mountDeclared(over = {}, transport = vi.fn()) {
    return mountWorker(
      {
        workspace_info: {
          verify_cmd: null,
          repo_ops: repoOps({
            verify: { script: 'repo-ops/script/verify', timeout_ms: 300_000 }
          })
        },
        ...over
      },
      transport
    );
  }

  test('runs both declared lanes by default', () => {
    const { mount } = mountDeclared();

    const inputs = mount.querySelectorAll('.worker-repo-ops__lane-run input');

    expect(
      Array.from(inputs).map(
        (input) => /** @type {HTMLInputElement} */ (input).checked
      )
    ).toEqual([true, true]);
  });

  test('unchecks the lane this workspace opted out of', () => {
    const { mount } = mountDeclared({
      repo_ops_opt_out: { verify: true, deploy: false }
    });

    expect(
      /** @type {HTMLInputElement} */ (
        mount.querySelector(
          '[data-lane="verify"] .worker-repo-ops__lane-run input'
        )
      ).checked
    ).toBe(false);
  });

  test('sends the opt-out mutation when a lane is unchecked', () => {
    const transport = vi.fn(async () => ({ ok: true, queue: queueOf() }));
    const { mount } = mountDeclared({}, transport);

    const input = /** @type {HTMLInputElement} */ (
      mount.querySelector(
        '[data-lane="deploy"] .worker-repo-ops__lane-run input'
      )
    );
    input.checked = false;
    input.dispatchEvent(new Event('change', { bubbles: true }));

    expect(transport).toHaveBeenCalledWith('worker-repo-ops-opt-out-toggle', {
      kind: 'deploy',
      opted_out: true,
      expected_revision: 3
    });
  });

  test('sends the opt-in mutation when a lane is re-checked', () => {
    const transport = vi.fn(async () => ({ ok: true, queue: queueOf() }));
    const { mount } = mountDeclared(
      { repo_ops_opt_out: { verify: true, deploy: false } },
      transport
    );

    const input = /** @type {HTMLInputElement} */ (
      mount.querySelector(
        '[data-lane="verify"] .worker-repo-ops__lane-run input'
      )
    );
    input.checked = true;
    input.dispatchEvent(new Event('change', { bubbles: true }));

    expect(transport).toHaveBeenCalledWith('worker-repo-ops-opt-out-toggle', {
      kind: 'verify',
      opted_out: false,
      expected_revision: 3
    });
  });

  test('dims only the opted-out lane', () => {
    const { mount } = mountDeclared({
      repo_ops_opt_out: { verify: false, deploy: true }
    });

    expect(
      mount
        .querySelector('[data-lane="deploy"]')
        ?.classList.contains('worker-repo-ops__lane--skipped')
    ).toBe(true);
    expect(
      mount
        .querySelector('[data-lane="verify"]')
        ?.classList.contains('worker-repo-ops__lane--skipped')
    ).toBe(false);
  });

  test('badges the opted-out lane as skipped in this workspace', () => {
    const { mount } = mountDeclared({
      repo_ops_opt_out: { verify: true, deploy: false }
    });

    expect(
      mount.querySelector(
        '[data-lane="verify"] .worker-repo-ops__vd-badge--skipped'
      )?.textContent
    ).toBe('이 workspace에서 건너뜀');
  });

  test('keeps the declared script and timeout visible while opted out', () => {
    const { mount } = mountDeclared({
      repo_ops_opt_out: { verify: true, deploy: false }
    });

    expect(
      mount.querySelector('[data-lane="verify"] .worker-repo-ops__vd-cmd')
        ?.textContent
    ).toBe('repo-ops/script/verify');
    expect(
      mount.querySelector(
        '[data-lane="verify"] .worker-repo-ops__vd-badge--config'
      )?.textContent
    ).toBe('timeout 5분');
  });

  test('says an opted-out verify lane judges without verification', () => {
    const { mount } = mountDeclared({
      repo_ops_opt_out: { verify: true, deploy: false }
    });

    expect(
      mount.querySelector('[data-lane="verify"] .worker-repo-ops__lane-d')
        ?.textContent
    ).toBe('이 workspace에서는 검증 없이 판정합니다.');
  });

  test('says an opted-out deploy lane goes straight to cleanup', () => {
    const { mount } = mountDeclared({
      repo_ops_opt_out: { verify: false, deploy: true }
    });

    expect(
      mount.querySelector('[data-lane="deploy"] .worker-repo-ops__lane-d')
        ?.textContent
    ).toBe('이 workspace에서는 배포 없이 곧바로 정리로 넘어갑니다.');
  });

  test('offers no checkbox on an undeclared lane', () => {
    const { mount } = mountWorker({
      workspace_info: { verify_cmd: null, repo_ops: repoOps() }
    });

    expect(
      mount.querySelector('[data-lane="verify"] .worker-repo-ops__lane-run')
    ).toBeNull();
    expect(
      mount.querySelector('[data-lane="deploy"] .worker-repo-ops__lane-run')
    ).not.toBeNull();
  });

  test('retries once with the fresh revision after a CAS conflict', async () => {
    const transport = vi
      .fn()
      .mockResolvedValueOnce({
        conflict: true,
        queue: queueOf({ revision: 9 })
      })
      .mockResolvedValueOnce({ ok: true, queue: queueOf({ revision: 10 }) });
    const { mount } = mountDeclared({}, transport);

    const input = /** @type {HTMLInputElement} */ (
      mount.querySelector(
        '[data-lane="verify"] .worker-repo-ops__lane-run input'
      )
    );
    input.checked = false;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(transport).toHaveBeenNthCalledWith(
      2,
      'worker-repo-ops-opt-out-toggle',
      { kind: 'verify', opted_out: true, expected_revision: 9 }
    );
  });
});

describe('배포 실행 버튼 (UI-s582 §3)', () => {
  /**
   * @param {Record<string, any>} [over]
   * @param {any} [transport]
   */
  function mountDeployLane(over = {}, transport = vi.fn()) {
    return mountWorker(
      { workspace_info: { verify_cmd: null, repo_ops: repoOps() }, ...over },
      transport
    );
  }

  /** @param {HTMLElement} mount */
  function runButton(mount) {
    return /** @type {HTMLButtonElement|null} */ (
      mount.querySelector('[data-lane="deploy"] .worker-repo-ops__deploy-run')
    );
  }

  test('offers the run button on a declared deploy lane', () => {
    const { mount } = mountDeployLane();

    expect(runButton(mount)?.textContent?.trim()).toBe('배포 실행');
  });

  test('draws no run button where nothing declares a deploy', () => {
    const { mount } = mountDeployLane({
      workspace_info: { verify_cmd: null, repo_ops: repoOps({ deploy: null }) }
    });

    expect(runButton(mount)).toBeNull();
  });

  test('draws no run button where this workspace opted out', () => {
    const { mount } = mountDeployLane({
      repo_ops_opt_out: { verify: false, deploy: true }
    });

    expect(runButton(mount)).toBeNull();
  });

  test('disables the button when the snapshot cannot name the repository', () => {
    const transport = vi.fn();
    const { mount } = mountDeployLane(
      {
        workspace_info: {
          verify_cmd: null,
          repo_ops: repoOps({ repo_id: null })
        }
      },
      transport
    );

    const button = runButton(mount);
    expect([button?.disabled, button?.getAttribute('title')]).toEqual([
      true,
      '저장소를 확인할 수 없음'
    ]);
    /** @type {HTMLButtonElement} */ (button).dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );
    expect(transport).not.toHaveBeenCalled();
  });

  test('disables the button while a deploy is in flight', () => {
    const { mount } = mountDeployLane({
      repo_operations: [
        operationCard({ state: 'running', failure: null, finished_at: null })
      ]
    });

    const button = runButton(mount);
    expect([button?.disabled, button?.getAttribute('title')]).toEqual([
      true,
      '배포 진행 중'
    ]);
  });

  test('sends the click as its own message with no target input', () => {
    const transport = vi.fn(async () => ({
      ok: true,
      operation_id: 'op-9',
      queue: queueOf()
    }));
    const { mount } = mountDeployLane({}, transport);

    /** @type {HTMLButtonElement} */ (runButton(mount)).dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );

    expect(transport).toHaveBeenCalledWith('worker-repo-operation-deploy-run', {
      repo_id: '/repo'
    });
  });

  test('says each refusal reason in the operator vocabulary', async () => {
    /** @type {string[]} */
    const said = [];
    const refusals = [
      ['deploy_not_declared', '선언 없음'],
      ['deploy_opted_out', '이 workspace에서 배포 실행이 꺼져 있음'],
      ['deploy_in_flight', '배포 진행 중'],
      ['target_unresolved', '대상 tip을 확정하지 못함'],
      ['remote_history_not_monotonic', '배포 워크트리와 원격 이력이 갈라짐']
    ];
    for (const [reason, sentence] of refusals) {
      document.body.innerHTML = '<div id="m"></div>';
      const transport = vi.fn(async () => ({
        ok: false,
        reason,
        queue: queueOf()
      }));
      const { mount } = mountDeployLane({}, transport);

      /** @type {HTMLButtonElement} */ (runButton(mount)).dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      );
      await Promise.resolve();
      await Promise.resolve();

      const toast = document.querySelector('.toast');
      said.push([toast?.textContent, sentence].join(' | '));
    }

    expect(said).toEqual(
      refusals.map(
        ([, sentence]) => `배포 실행 거부 — ${sentence} | ${sentence}`
      )
    );
  });

  test('marks a manual operation on its timeline card', () => {
    const { mount } = mountWorker({
      repo_operations: [operationCard({ source: 'manual' })]
    });

    expect(
      openTimeline(mount).querySelector('.worker-ev__st--manual')?.textContent
    ).toBe('수동');
  });

  test('leaves an automatic operation unbadged', () => {
    const { mount } = mountWorker({
      repo_operations: [operationCard({ source: 'automatic' })]
    });

    expect(
      openTimeline(mount).querySelector('.worker-ev__st--manual')
    ).toBeNull();
  });

  test('names the declared timeout on a timed-out deploy card', () => {
    const { mount } = mountWorker({
      workspace_info: { verify_cmd: null, repo_ops: repoOps() },
      repo_operations: [
        operationCard({
          exit_code: null,
          failure: {
            code: 'timeout',
            fingerprint: 'f'.repeat(64),
            detail: '',
            interrupted: false
          },
          failure_kind: 'timeout'
        })
      ]
    });

    expect(
      Array.from(openTimeline(mount).querySelectorAll('.worker-ev__why-line'))
        .map((line) => line.textContent)
        .filter(Boolean)
    ).toContain('타임아웃 600초 초과');
  });
});
