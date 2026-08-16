/**
 * Worker-screen operational settings: the read-only repo-operation declaration
 * (verify / deploy) and the `auto_repair` switch.
 *
 * These are OPERATIONAL controls, not preferences, so the spec keeps them
 * inline on the Worker screen rather than moving them into the unified settings
 * dialog (spec 비-목표). They were extracted verbatim from the retired
 * exec-defaults dialog when its preference half moved to the settings dialog.
 *
 * @typedef {{ get: () => any, set: (q: any) => void, subscribe?: (fn: () => void) => () => void }} QueueStore
 */
import { html } from 'lit-html';

/**
 * Render a timeout in the unit the dialog shows it in (minutes above a minute,
 * seconds below it). An unusable value renders as '' so the caller drops it.
 *
 * @param {unknown} timeout_ms
 * @returns {string}
 */
function formatTimeout(timeout_ms) {
  if (typeof timeout_ms !== 'number' || !Number.isFinite(timeout_ms)) {
    return '';
  }
  if (timeout_ms <= 0) {
    return '';
  }
  if (timeout_ms < 60000) {
    return `${Math.round(timeout_ms / 1000)}초`;
  }
  const minutes = timeout_ms / 60000;
  return `${Number.isInteger(minutes) ? minutes : Math.round(minutes * 10) / 10}분`;
}

/**
 * Join an argv array the way the dialog displays it. A non-argv value (a legacy
 * or malformed record) renders as '' so the row falls back to its absent form.
 *
 * @param {unknown} cmd
 * @returns {string}
 */
function formatCmd(cmd) {
  if (!Array.isArray(cmd)) {
    return '';
  }
  return cmd.filter((part) => typeof part === 'string').join(' ');
}

/**
 * Build the Worker screen's repo-operation settings section.
 *
 * @param {{ queueStore: QueueStore, transport?: (type: any, payload?: unknown) => Promise<any>, getWorkspacePath?: () => (string|undefined), onChanged?: () => void }} options
 */
export function createRepoOpsSettings(options) {
  const queueStore = options.queueStore;
  const transport = options.transport;
  const getWorkspacePath = options.getWorkspacePath;
  const doRender = options.onChanged || (() => {});

  /** @returns {any} */
  function currentQueue() {
    return (queueStore && queueStore.get()) || {};
  }

  /** @returns {number} */
  function currentRevision() {
    const q = currentQueue();
    return typeof q.revision === 'number' ? q.revision : 0;
  }

  /** @param {any} res */
  function adopt(res) {
    if (queueStore && res && res.queue && typeof res.queue === 'object') {
      queueStore.set(res.queue);
    }
  }

  /**
   * @returns {any} The snapshot's `workspace_info` decoration (or an empty
   * shape: a pre-snapshot or legacy queue simply has nothing to show).
   */
  function currentWorkspaceInfo() {
    const info = currentQueue().workspace_info;
    return info && typeof info === 'object' ? info : {};
  }

  /**
   * @param {string} modifier
   * @param {string} label
   * @returns {import('lit-html').TemplateResult}
   */
  function badge(modifier, label) {
    return html`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${modifier}"
      >${label}</span
    >`;
  }

  /**
   * The verify row: what the merge gate runs before merging. The command can
   * only come from config (UI-uk6d), so unset it names the section a user has
   * to write.
   *
   * @param {any} verify_cmd
   * @returns {import('lit-html').TemplateResult}
   */
  function verifyGroup(verify_cmd) {
    const cmd_text = verify_cmd ? formatCmd(verify_cmd.cmd) : '';
    const timeout_text = verify_cmd ? formatTimeout(verify_cmd.timeout_ms) : '';
    const workspace_path =
      (getWorkspacePath && getWorkspacePath()) || '<workspace 경로>';
    return html`<div class="worker-repo-ops__vd-group" data-vd="verify">
      <div class="worker-repo-ops__vd-label">머지 전 검증 (verify)</div>
      ${cmd_text
        ? html`<div class="worker-repo-ops__vd-line">
            <span class="worker-repo-ops__vd-cmd">${cmd_text}</span>
            ${badge('config', 'config')}
            ${timeout_text
              ? html`<span class="worker-repo-ops__vd-meta"
                  >timeout ${timeout_text}</span
                >`
              : ''}
          </div>`
        : html`<div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
            ${badge('absent', '안 함')} 검증 없음 —
            <span class="worker-repo-ops__vd-cmd"
              >[worker.verify."${workspace_path}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`;
  }

  /**
   * Format a timeout for display. `10분` reads; `600000` does not.
   *
   * @param {unknown} timeout_ms
   * @returns {string}
   */
  function formatLaneTimeout(timeout_ms) {
    if (typeof timeout_ms !== 'number' || !Number.isFinite(timeout_ms)) {
      return '';
    }
    const minutes = timeout_ms / 60000;
    return Number.isInteger(minutes)
      ? `timeout ${minutes}분`
      : `timeout ${Math.round(timeout_ms / 1000)}초`;
  }

  /**
   * The 저장소 작업 선언 card (UI-q0uy §4.5): what the WORKER actually consumes —
   * `repo-ops/config.toml` read from a pinned base SHA — rather than the legacy
   * path the old rows read, which is why this repo's `[deploy]` was invisible.
   *
   * @param {any} repo_ops
   * @returns {import('lit-html').TemplateResult}
   */
  /**
   * The timeout badge for one declared lane, or nothing when the declaration
   * carries no readable timeout — an empty badge is a shape with no fact in it.
   *
   * @param {unknown} timeout_ms
   * @returns {import('lit-html').TemplateResult|string}
   */
  function laneTimeoutBadge(timeout_ms) {
    const text = formatLaneTimeout(timeout_ms);
    return text ? badge('config', text) : '';
  }

  /**
   * @param {any} repo_ops
   * @returns {import('lit-html').TemplateResult}
   */
  function repoOpsDeclarationSection(repo_ops) {
    const sha = typeof repo_ops.base_sha === 'string' ? repo_ops.base_sha : '';
    const source = `${repo_ops.source_path || 'repo-ops/config.toml'} @ ${
      repo_ops.base_ref || '?'
    }${sha ? `@${sha.slice(0, 7)}` : ''}`;
    return html`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${source}</span>
      </p>
      <div class="worker-repo-ops__lane" data-lane="verify">
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${repo_ops.verify
            ? html`<code class="worker-repo-ops__vd-cmd"
                  >${repo_ops.verify.script}</code
                >${laneTimeoutBadge(repo_ops.verify.timeout_ms)}`
            : html`선언 없음${badge('absent', 'verify 없이 판정')}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${repo_ops.verify
            ? '머지 전에 이 스크립트가 통과해야 자격을 얻습니다.'
            : '머지 자격은 PR/base/head 신선도·mergeability·리뷰 영수증으로만 판정합니다.'}</span
        >
      </div>
      <div class="worker-repo-ops__lane" data-lane="deploy">
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${repo_ops.deploy
            ? html`<code class="worker-repo-ops__vd-cmd"
                  >${repo_ops.deploy.script}</code
                >${laneTimeoutBadge(repo_ops.deploy.timeout_ms)}`
            : html`선언 없음${badge('absent', '배포 없음')}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${repo_ops.deploy
            ? html`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`
            : '머지 후 배포 단계 없이 곧바로 정리로 넘어갑니다.'}</span
        >
      </div>
    </section>`;
  }

  /**
   * The declaration surface. Only a PROVEN absence (`absent`, or a snapshot from
   * a server that predates the field) falls back to the legacy verify row —
   * `pending` and `error` say what they are, so a repo that HAS a declaration
   * never quietly reads as one that does not (§4.5/§4.6-1).
   *
   * @param {any} info
   * @returns {import('lit-html').TemplateResult}
   */
  function verifyDeploySection(info) {
    const repo_ops =
      info.repo_ops && typeof info.repo_ops === 'object' ? info.repo_ops : null;
    if (repo_ops && repo_ops.status === 'resolved') {
      return repoOpsDeclarationSection(repo_ops);
    }
    if (
      repo_ops &&
      (repo_ops.status === 'pending' || repo_ops.status === 'error')
    ) {
      return html`<section class="worker-repo-ops__vd" data-seam="repo-ops">
        <p class="worker-repo-ops__vd-title">
          저장소 작업 선언
          <span class="worker-repo-ops__vd-ro"
            >읽기 전용 — config에서 정의</span
          >
        </p>
        <div
          class="worker-repo-ops__vd-line worker-repo-ops__vd-absent"
          data-seam="repo-ops-status"
        >
          ${repo_ops.status === 'pending'
            ? '선언 확인 중'
            : html`선언 읽기
              실패${repo_ops.error_code
                ? html` — <code>${repo_ops.error_code}</code>`
                : ''}`}
        </div>
      </section>`;
    }
    return html`<section class="worker-repo-ops__vd">
      <p class="worker-repo-ops__vd-title">
        검증 설정
        <span class="worker-repo-ops__vd-ro">읽기 전용 — config에서 정의</span>
      </p>
      ${verifyGroup(info.verify_cmd)}
    </section>`;
  }

  /**
   * Send the INDEPENDENT `자동 해결` mutation (master spec §9.3). It carries only
   * the queue revision and its own boolean: this switch never reads or writes
   * 자동화 (`auto_advance`/`auto_merge`), and 자동화 never writes this one.
   *
   * @param {boolean} on
   */
  async function saveAutoRepair(on) {
    if (!transport) {
      return;
    }
    const res = await transport(
      /** @type {any} */ ('worker-auto-repair-toggle'),
      { on, expected_revision: currentRevision() }
    );
    adopt(res);
    if (res && res.conflict) {
      const retried = await transport(
        /** @type {any} */ ('worker-auto-repair-toggle'),
        { on, expected_revision: currentRevision() }
      );
      adopt(retried);
    }
    doRender();
  }

  /**
   * The three §10 lists. Their MEMBERSHIP comes entirely from the pinned policy
   * the server projects — this map only says each contract token in Korean and
   * falls back to the token itself, so a contract that gains an entry shows up
   * here without anyone editing a sentence into the client.
   *
   * @type {Record<string, string>}
   */
  const POLICY_TOKEN_LABELS = {
    owned_deploy_worktree_fetch_detached_alignment_recreate:
      '전용 배포 워크트리 정렬·복구',
    recovered_pre_execution_fetch_timeout_retry_once: 'fetch 타임아웃 1회 복구',
    repo_serial_lock_wait: '저장소 순차 실행 대기',
    restart_operation_adoption: '재시작 후 작업 인계',
    exact_input_exit_zero_evidence_adoption: '동일 입력 성공 증거 인계',
    descendant_success_covers_ancestor_rows: '최신 SHA 성공이 이전 행 커버',
    owned_verify_candidate_cleanup: '검증 임시 체크아웃 정리',
    script_retry: '스크립트 재시도',
    auto_repair_session: '자동 해결 세션',
    user_triggered_session: '사용자 해결 세션',
    automatic: '자동',
    user_action_only: '사용자 클릭',
    script_identity_present: '스크립트가 있을 때만',
    per_completion_chain: '완료 체인당',
    unbounded: '횟수 제한 없음',
    bounded_single_script_retry_exceeded: '단일 스크립트 재시도 한도 초과',
    baseline_failure_ignore: '기존 실패 무시',
    config_or_script_deletion_to_bypass_gate:
      '설정·스크립트 삭제로 게이트 우회',
    credential_entry: '자격증명 입력·출력',
    destructive_action: '파괴적 작업',
    history_rewrite: '히스토리 재작성',
    agent_self_report_as_success: '세션 자기보고를 성공 처리',
    unbounded_repair_session_retry: '무한 해결 세션 반복'
  };

  /**
   * @param {string} title
   * @param {string[]} tokens
   * @param {string} seam
   * @returns {import('lit-html').TemplateResult}
   */
  function policyList(title, tokens, seam) {
    return html`<div class="worker-repo-ops__policy-group" data-policy=${seam}>
      <div class="worker-repo-ops__policy-label">${title}</div>
      <ul class="worker-repo-ops__policy-list">
        ${tokens.map(
          (token) =>
            html`<li data-token=${token}>
              ${POLICY_TOKEN_LABELS[token] || token}
            </li>`
        )}
      </ul>
    </div>`;
  }

  /**
   * Render the ordered ladder from artifact fields. Unknown ids, triggers, and
   * limit tokens stay visible verbatim instead of being dropped by the client.
   *
   * @param {Record<string, any>[]} entries
   * @returns {import('lit-html').TemplateResult}
   */
  function resolutionLadder(entries) {
    return html`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${entries.map((entry) => {
          /** @type {string[]} */
          const details = [POLICY_TOKEN_LABELS[entry.trigger] || entry.trigger];
          if (Number.isInteger(entry.attempts_per_operation_attempt)) {
            details.push(
              `operation당 ${entry.attempts_per_operation_attempt}회`
            );
          } else if (Number.isInteger(entry.attempts)) {
            details.push(
              `${POLICY_TOKEN_LABELS[entry.budget] || entry.budget} ${entry.attempts}회`
            );
          } else if (Number.isInteger(entry.sessions_per_user_action)) {
            details.push(
              `${entry.sessions_per_user_action}회`,
              POLICY_TOKEN_LABELS[entry.user_actions] || entry.user_actions
            );
          }
          if (entry.applies_when) {
            details.push(
              POLICY_TOKEN_LABELS[entry.applies_when] || entry.applies_when
            );
          }
          return html`<li data-token=${entry.id}>
            <strong>${POLICY_TOKEN_LABELS[entry.id] || entry.id}</strong>
            <span>${details.filter(Boolean).join(' · ')}</span>
          </li>`;
        })}
      </ol>
    </div>`;
  }

  /**
   * The `자동 해결` section: the durable toggle, the remaining automatic budget,
   * the active repair session, and the three policy lists the backend sends.
   *
   * @returns {import('lit-html').TemplateResult}
   */
  function autoRepairSection() {
    const q = currentQueue();
    const on = q.auto_repair !== false;
    const policy =
      q.repo_operation_policy && typeof q.repo_operation_policy === 'object'
        ? q.repo_operation_policy
        : null;
    const operations = Array.isArray(q.repo_operations)
      ? q.repo_operations
      : [];
    const active = operations.find(
      (/** @type {any} */ card) => card.state === 'repairing'
    );
    // The remaining budget the reader cares about is the one closest to being
    // spent: the smallest remaining count across the operations that still
    // have a live repair chain.
    const open_chains = operations.filter(
      (/** @type {any} */ card) =>
        card.state === 'failed' || card.state === 'repairing'
    );
    const remaining = open_chains.length
      ? Math.min(
          ...open_chains.map((/** @type {any} */ card) =>
            typeof card.repair?.remaining === 'number'
              ? card.repair.remaining
              : 0
          )
        )
      : (policy?.auto_repair?.resolution_ladder?.find(
          (/** @type {any} */ entry) => entry.id === 'auto_repair_session'
        )?.attempts ?? 1);
    const ladder = Array.isArray(policy?.auto_repair?.resolution_ladder)
      ? policy.auto_repair.resolution_ladder
      : [];
    return html`<section
      class="worker-repo-ops__repair"
      data-seam="auto-repair"
    >
      <p class="worker-repo-ops__vd-title">
        자동 해결
        <span class="worker-repo-ops__vd-ro"
          >자동화(대기열·머지)와 독립된 스위치</span
        >
      </p>
      <label class="worker-repo-ops__repair-toggle">
        <input
          type="checkbox"
          class="worker-repo-ops__repair-input"
          .checked=${on}
          @change=${(/** @type {Event} */ ev) =>
            void saveAutoRepair(
              /** @type {HTMLInputElement} */ (ev.target).checked
            )}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${on ? '켜짐' : '꺼짐'}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${remaining}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${active
            ? `해결 세션 실행 중 · ${active.repair?.owner_bead || active.operation_id}`
            : '실행 중인 해결 세션 없음'}</span
        >
      </div>
      ${policy
        ? html`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(policy.worker_automatic || []).length} · 해결 사다리
                ${ladder.length} · 금지
                ${(policy.never_automatic || []).length}</span
              >
            </summary>
            ${policyList(
              'Worker가 자동 처리',
              policy.worker_automatic || [],
              'worker-automatic'
            )}
            ${policy.supported === false || policy.schema_version !== 2
              ? html`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`계약 스키마 불일치 — 자동 해결이 정지되었습니다 (v${policy.schema_version})`}
                </div>`
              : resolutionLadder(ladder)}
            ${policyList(
              '자동으로 하지 않음',
              policy.never_automatic || [],
              'never-automatic'
            )}
          </details>`
        : ''}
    </section>`;
  }

  return {
    /** @returns {import('lit-html').TemplateResult} */
    template() {
      // Operational reference, not a daily control — collapsed until needed.
      return html`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${verifyDeploySection(currentWorkspaceInfo())} ${autoRepairSection()}
      </details>`;
    }
  };
}
