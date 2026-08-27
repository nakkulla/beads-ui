/**
 * Worker-screen operational settings: the read-only repo-operation declaration
 * (verify / deploy) and the pinned automation policy it runs under.
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
 * Build the Worker screen's repo-operation settings section.
 *
 * @param {{ queueStore: QueueStore, transport?: (type: any, payload?: unknown) => Promise<any>, onChanged?: () => void, onOpenScript?: (input: { lane: 'verify'|'deploy', base_sha: string, path: string, base_ref: string }, trigger_element: HTMLElement) => void }} options
 */
export function createRepoOpsSettings(options) {
  const queueStore = options.queueStore;
  const transport = options.transport;
  const doRender = options.onChanged || (() => {});
  const onOpenScript = options.onOpenScript;

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
   * @param {'verify'|'deploy'} lane
   * @param {any} repo_ops
   * @param {{ script: string, timeout_ms: number }} declaration
   * @returns {import('lit-html').TemplateResult}
   */
  function laneScriptButton(lane, repo_ops, declaration) {
    return html`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${declaration.script}
      @click=${(/** @type {MouseEvent} */ event) => {
        if (!onOpenScript) {
          return;
        }
        onOpenScript(
          {
            lane,
            base_sha: repo_ops.base_sha,
            path: declaration.script,
            base_ref: repo_ops.base_ref
          },
          /** @type {HTMLElement} */ (event.currentTarget)
        );
      }}
    ></button>`;
  }

  /**
   * @returns {{ verify: boolean, deploy: boolean }} This workspace's per-kind
   * opt-out from the declared operations. A snapshot without the key is a
   * workspace that runs both.
   */
  function currentOptOut() {
    const stored = currentQueue().repo_ops_opt_out;
    return {
      verify: stored?.verify === true,
      deploy: stored?.deploy === true
    };
  }

  /**
   * The per-lane 「이 workspace에서 실행」 checkbox (UI-lsti §4). Drawn only on a
   * DECLARED lane: there is nothing to skip where nothing is declared.
   *
   * @param {'verify'|'deploy'} lane
   * @param {boolean} opted_out
   * @returns {import('lit-html').TemplateResult}
   */
  function laneRunToggle(lane, opted_out) {
    return html`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!opted_out}
        @change=${(/** @type {Event} */ ev) =>
          void saveRepoOpsOptOut(
            lane,
            !(/** @type {HTMLInputElement} */ (ev.target).checked)
          )}
      />
      이 workspace에서 실행
    </label>`;
  }

  /**
   * The 저장소 작업 선언 card (UI-q0uy §4.5): `repo-ops/config.toml` read from
   * the pinned base SHA consumed by the Worker.
   *
   * @param {any} repo_ops
   * @returns {import('lit-html').TemplateResult}
   */
  function repoOpsDeclarationSection(repo_ops) {
    const sha = typeof repo_ops.base_sha === 'string' ? repo_ops.base_sha : '';
    const source = `${repo_ops.source_path || 'repo-ops/config.toml'} @ ${
      repo_ops.base_ref || '?'
    }${sha ? `@${sha.slice(0, 7)}` : ''}`;
    const opt_out = currentOptOut();
    // 선언이 없으면 opt-out 값은 무해한 잔여물이다 — 건너뛸 대상이 없으므로
    // 흐림·배지·체크박스 어느 것도 그리지 않는다.
    const verify_skipped = Boolean(repo_ops.verify) && opt_out.verify;
    const deploy_skipped = Boolean(repo_ops.deploy) && opt_out.deploy;
    return html`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${source}</span>
      </p>
      <div
        class="worker-repo-ops__lane${verify_skipped
          ? ' worker-repo-ops__lane--skipped'
          : ''}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${repo_ops.verify
            ? html`${laneScriptButton('verify', repo_ops, repo_ops.verify)}
              ${laneTimeoutBadge(repo_ops.verify.timeout_ms)}
              ${verify_skipped
                ? badge('skipped', '이 workspace에서 건너뜀')
                : ''}`
            : html`선언 없음${badge('absent', 'verify 없이 판정')}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${verify_skipped
            ? '이 workspace에서는 검증 없이 판정합니다.'
            : repo_ops.verify
              ? '머지 전에 이 스크립트가 통과해야 자격을 얻습니다.'
              : '머지 자격은 PR/base/head 신선도·mergeability·리뷰 영수증으로만 판정합니다.'}</span
        >
        ${repo_ops.verify ? laneRunToggle('verify', opt_out.verify) : ''}
      </div>
      <div
        class="worker-repo-ops__lane${deploy_skipped
          ? ' worker-repo-ops__lane--skipped'
          : ''}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${repo_ops.deploy
            ? html`${laneScriptButton('deploy', repo_ops, repo_ops.deploy)}
              ${laneTimeoutBadge(repo_ops.deploy.timeout_ms)}
              ${deploy_skipped
                ? badge('skipped', '이 workspace에서 건너뜀')
                : ''}`
            : html`선언 없음${badge('absent', '배포 없음')}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${deploy_skipped
            ? '이 workspace에서는 배포 없이 곧바로 정리로 넘어갑니다.'
            : repo_ops.deploy
              ? html`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`
              : '머지 후 배포 단계 없이 곧바로 정리로 넘어갑니다.'}</span
        >
        ${repo_ops.deploy ? laneRunToggle('deploy', opt_out.deploy) : ''}
      </div>
    </section>`;
  }

  /**
   * The repository declaration surface and its explicit resolution state
   * (UI-wv97: the legacy verify fallback row is retired).
   *
   * @param {any} info
   * @returns {import('lit-html').TemplateResult}
   */
  function verifyDeploySection(info) {
    const repo_ops =
      info.repo_ops && typeof info.repo_ops === 'object' ? info.repo_ops : null;
    if (
      repo_ops &&
      (repo_ops.status === 'resolved' || repo_ops.status === 'absent')
    ) {
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
    // 선언 상태를 아직 모르는 스냅샷: repo-ops 확인 중으로만 말한다 — legacy
    // verify fallback은 UI-wv97에서 폐기됐다.
    return html`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`;
  }

  /**
   * Send the per-kind workspace opt-out (UI-lsti §4). CAS-and-retry: the click
   * that lost a race is re-applied once against the revision the server just
   * returned, rather than silently dropping the user's decision.
   *
   * @param {'verify'|'deploy'} kind
   * @param {boolean} opted_out
   */
  async function saveRepoOpsOptOut(kind, opted_out) {
    if (!transport) {
      return;
    }
    const res = await transport(
      /** @type {any} */ ('worker-repo-ops-opt-out-toggle'),
      { kind, opted_out, expected_revision: currentRevision() }
    );
    adopt(res);
    if (res && res.conflict) {
      const retried = await transport(
        /** @type {any} */ ('worker-repo-ops-opt-out-toggle'),
        { kind, opted_out, expected_revision: currentRevision() }
      );
      adopt(retried);
    }
    doRender();
  }

  /**
   * The two §10 lists. Their MEMBERSHIP comes entirely from the pinned policy
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
    bounded_single_script_retry_exceeded: '단일 스크립트 재시도 한도 초과',
    repair_session_dispatch: '실패 해결 세션 자동 실행',
    baseline_failure_ignore: '기존 실패 무시',
    config_or_script_deletion_to_bypass_gate:
      '설정·스크립트 삭제로 게이트 우회',
    credential_entry: '자격증명 입력·출력',
    destructive_action: '파괴적 작업',
    history_rewrite: '히스토리 재작성',
    agent_self_report_as_success: '세션 자기보고를 성공 처리'
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
   * The pinned automation policy (schema 3): what the Worker does by itself and
   * what it never does. There is no ladder surface any more — the one automatic
   * step left (`script_retry`) is always on and shows its outcome on the failure
   * card, so the reference the reader still needs here is the two §10 lists.
   *
   * @returns {import('lit-html').TemplateResult|string}
   */
  function policySection() {
    const q = currentQueue();
    const policy =
      q.repo_operation_policy && typeof q.repo_operation_policy === 'object'
        ? q.repo_operation_policy
        : null;
    if (!policy) {
      return '';
    }
    return html`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(policy.worker_automatic || []).length} · 금지
            ${(policy.never_automatic || []).length}</span
          >
        </summary>
        ${policy.supported === false
          ? html`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`계약 스키마 불일치 — 자동 재시도가 정지되었습니다 (v${policy.schema_version})`}
            </div>`
          : ''}
        ${policyList(
          'Worker가 자동 처리',
          policy.worker_automatic || [],
          'worker-automatic'
        )}
        ${policyList(
          '자동으로 하지 않음',
          policy.never_automatic || [],
          'never-automatic'
        )}
      </details>
    </section>`;
  }

  return {
    /** @returns {import('lit-html').TemplateResult} */
    template() {
      // Operational reference, not a daily control — collapsed until needed.
      return html`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${verifyDeploySection(currentWorkspaceInfo())} ${policySection()}
      </details>`;
    }
  };
}
