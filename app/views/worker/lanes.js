/**
 * Lane + mini-row templates for the Worker console (spec §5.1).
 *
 * The lane row is the spec's four-column IA (worker-phase2 §7) — 대기 · 실행 중 ·
 * PR 대기 · 완료 — preceded by the candidate SOURCE pane (Board Ready/Blocked,
 * dashed `.worker-pane--src`), which is not a bead state but the feed a bead is
 * dragged out of. Styling mirrors `worker-final.html` (`.pane`/`.mini`/`⠿` grip)
 * via the `worker-*` class namespace.
 *
 * A pane normally renders `items` as rows; 실행 중 hands in its own `body`
 * instead (the running-tile grid), so all five columns share one pane shell
 * rather than growing a second one.
 */
import { html } from 'lit-html';
import {
  formatRelativeTime,
  formatTimestampLocal
} from '../../utils/relative-time.js';
import {
  formatUsageTotalWithCost,
  providerUsageBadges,
  usageTooltip
} from '../../utils/token-usage.js';
import { stepperTemplate } from '../board/stepper.js';

/**
 * State words for one RepoOperation card. Display only — the vocabulary is the
 * durable one, this map just says it in Korean.
 *
 * @type {Record<string, string>}
 */
const REPO_OPERATION_STATE_LABELS = {
  queued: '대기',
  running: '실행 중',
  succeeded: '성공',
  failed: '실패',
  repairing: '자동 해결 중'
};

/**
 * The resolve button's wording per failure kind (master spec §9.2). There is no
 * generic 재시도 entry here on purpose: every button names the failure it
 * resolves, and each one goes through the coordinator's repair path.
 *
 * @type {Record<string, string>}
 */
const REPO_OPERATION_RESOLVE_LABELS = {
  verify_script_failure: '검증 실패 해결',
  verify_script_failure_pre_merge: '검증 실패 해결 후 머지',
  deploy_script_failure: '배포 실패 해결',
  interrupted_without_terminal_exit: '중단된 작업 진단',
  other: '실패 해결'
};

/**
 * @param {unknown} sha
 * @returns {string}
 */
function shortSha(sha) {
  return typeof sha === 'string' && sha.length >= 7 ? sha.slice(0, 7) : '—';
}

/**
 * @param {unknown} elapsed_ms
 * @returns {string}
 */
function formatElapsed(elapsed_ms) {
  if (
    typeof elapsed_ms !== 'number' ||
    !Number.isFinite(elapsed_ms) ||
    elapsed_ms < 0
  ) {
    return '—';
  }
  if (elapsed_ms < 1000) {
    return `${Math.round(elapsed_ms)}ms`;
  }
  const seconds = elapsed_ms / 1000;
  if (seconds < 60) {
    return `${seconds.toFixed(1)}초`;
  }
  const minutes = Math.floor(seconds / 60);
  return `${minutes}분 ${Math.round(seconds - minutes * 60)}초`;
}

/**
 * One RepoOperation card (master spec §10): kind, target SHA and tree, script
 * path and blob, elapsed time, state, sanitized output tail, full log link,
 * exit code, and the repair session link — plus the resolve button for THIS
 * failure kind.
 *
 * @param {any} operation
 * @returns {import('lit-html').TemplateResult}
 */
function repoOperationCardTemplate(operation) {
  const failure = operation.failure || null;
  const repair = operation.repair || {};
  const resolve_key =
    operation.failure_kind === 'verify_script_failure' &&
    operation.verify_stage === 'pre_merge'
      ? 'verify_script_failure_pre_merge'
      : operation.failure_kind || 'other';
  return html`<article
    class="worker-repo-op"
    data-operation-id=${operation.operation_id}
    data-state=${operation.state}
    data-kind=${operation.kind}
  >
    <div class="worker-repo-op__head">
      <span class="worker-repo-op__kind">${operation.kind}</span>
      <span class="worker-repo-op__state"
        >${REPO_OPERATION_STATE_LABELS[operation.state] ||
        operation.state}</span
      >
      <code class="worker-repo-op__target" title=${operation.target_sha || ''}
        >${operation.target_base}@${shortSha(operation.target_sha)}</code
      >
      <code class="worker-repo-op__tree" title="target tree"
        >tree ${shortSha(operation.target_tree)}</code
      >
      <span class="worker-repo-op__elapsed"
        >${formatElapsed(operation.elapsed_ms)}</span
      >
    </div>
    <div class="worker-repo-op__meta">
      <code class="worker-repo-op__script"
        >${operation.script_path || '(경로 미기록)'}</code
      >
      <code class="worker-repo-op__blob"
        >blob ${shortSha(operation.script_blob_sha)}</code
      >
      ${Number.isInteger(operation.exit_code)
        ? html`<span class="worker-repo-op__exit"
            >exit ${operation.exit_code}</span
          >`
        : ''}
      ${operation.signal
        ? html`<span class="worker-repo-op__signal"
            >signal ${operation.signal}</span
          >`
        : ''}
    </div>
    ${failure
      ? html`<div class="worker-repo-op__failure">
          <code>${failure.code}</code>
          ${failure.detail
            ? html`<span class="worker-repo-op__detail"
                >${failure.detail}</span
              >`
            : ''}
        </div>`
      : ''}
    ${operation.output_tail
      ? html`<details class="worker-repo-op__output">
          <summary>출력 마지막 부분</summary>
          <pre>${operation.output_tail}</pre>
        </details>`
      : ''}
    ${operation.log_path
      ? html`<div class="worker-repo-op__log">
          전체 로그 <code>${operation.log_path}</code>
        </div>`
      : ''}
    <div class="worker-repo-op__actions">
      <span class="worker-repo-op__budget"
        >자동 해결 남음
        ${repair.remaining ?? 0}/${repair.auto_budget ?? 1}</span
      >
      ${repair.attempt_id
        ? html`<button
            type="button"
            class="worker-repo-op__session"
            data-attempt-id=${repair.attempt_id}
          >
            해결 세션 보기
          </button>`
        : ''}
      ${operation.state === 'failed'
        ? html`<button
            type="button"
            class="worker-repo-op__resolve"
            data-operation-id=${operation.operation_id}
            data-failure-kind=${operation.failure_kind || 'other'}
          >
            ${REPO_OPERATION_RESOLVE_LABELS[resolve_key] ||
            REPO_OPERATION_RESOLVE_LABELS.other}
          </button>`
        : ''}
    </div>
  </article>`;
}

/**
 * The RepoOperation strip: every verify/deploy operation the Worker owns for
 * this workspace, newest first. Empty projection renders nothing — a lane with
 * no operations is not a state worth a panel.
 *
 * @param {any} operations
 * @returns {import('lit-html').TemplateResult|string}
 */
export function repoOperationsDisclosureTemplate(operations) {
  const cards = Array.isArray(operations) ? operations : [];
  if (cards.length === 0) {
    return '';
  }
  const failing = cards.filter(
    (/** @type {any} */ card) =>
      card.state === 'failed' || card.state === 'repairing'
  ).length;
  return html`<details
    class="worker-repo-ops"
    aria-label="레포 오퍼레이션"
    ?open=${failing > 0}
  >
    <summary class="worker-repo-ops__summary">
      <b>레포 오퍼레이션</b>
      <span class="worker-repo-ops__count">${cards.length}건</span>
      ${failing > 0
        ? html`<span class="worker-repo-ops__failing"
            >해결 필요 ${failing}</span
          >`
        : ''}
    </summary>
    <div class="worker-repo-ops__list">
      ${cards.map((/** @type {any} */ card) => repoOperationCardTemplate(card))}
    </div>
  </details>`;
}

/**
 * The 생성·수정 시각 meta line (UI-d7pw §4.1). Board 카드의 `timesTemplate`과
 * 같은 표기·툴팁을 쓴다 — 같은 사실을 두 탭이 다르게 적으면 안 된다.
 *
 * 인라인이 아니라 별도 줄인 이유: 한 줄 변형 행은 이미 그립·ID·제목·PR·뱃지·
 * reason·usage·버튼을 싣고 있어 인라인으로 넣으면 제목이 먼저 잘린다.
 *
 * 두 시각이 모두 없으면 아무것도 그리지 않는다 (fail-quiet).
 *
 * @param {{ created_at?: number|string, updated_at?: number|string }} item
 * @returns {import('lit-html').TemplateResult|''}
 */
export function timesMeta(item) {
  const created = formatRelativeTime(item.created_at);
  const updated = formatRelativeTime(item.updated_at);
  if (!created && !updated) {
    return '';
  }
  return html`<div class="worker-mini__meta">
    ${created
      ? html`<span title=${`생성 ${formatTimestampLocal(item.created_at)}`}
          >생성 ${created}</span
        >`
      : ''}${created && updated ? html`<span>·</span>` : ''}${updated
      ? html`<span title=${`수정 ${formatTimestampLocal(item.updated_at)}`}
          >수정 ${updated}</span
        >`
      : ''}
  </div>`;
}

/**
 * Convert durable discard phases into the small, restart-safe vocabulary both
 * Worker and Monitor render. Unknown phases remain visible instead of being
 * misrepresented as completion.
 *
 * @param {string|null|undefined} phase
 * @returns {string}
 */
export function discardPhaseLabel(phase) {
  if (!phase || phase === 'requested') {
    return '백업 중';
  }
  if (phase === 'backup_verified' || phase === 'signaled') {
    return 'runner 종료 중';
  }
  if (phase === 'merged_revert' || phase.startsWith('revert_')) {
    return 'revert PR 대기';
  }
  if (phase.startsWith('rollback_')) {
    return '원복 배포 중';
  }
  if (
    phase === 'runner_terminated' ||
    phase.startsWith('pr_') ||
    phase.includes('ref_') ||
    phase.includes('worktree') ||
    phase.startsWith('bead_')
  ) {
    return 'PR 정리 중';
  }
  return `폐기 처리 중 (${phase})`;
}

/**
 * State-specific confirmation shared verbatim by Worker and Monitor.
 *
 * @param {string} bead_id
 * @param {'merged'|'unmerged'} confirmation
 * @returns {string}
 */
export function discardConfirmationMessage(bead_id, confirmation) {
  return confirmation === 'merged'
    ? `${bead_id}: 이미 merge된 구현입니다. 복구 archive를 만든 뒤 revert PR을 생성하며, 실제 원복은 사람이 그 PR을 merge한 뒤 완료됩니다. 계속할까요?`
    : `${bead_id}: 복구 archive를 만든 뒤 runner/PR/branch/worktree를 정리하고 이슈를 후보로 되돌립니다. 계속할까요?`;
}

/**
 * Preserve the terminal recovery receipt in the success toast after the
 * completed operation leaves every queue lane and active snapshot projection.
 *
 * @param {{ operation_id?: string|null, receipt?: { archive_path?: string|null, original_pr?: { url?: string|null }|null, revert_pr?: { url?: string|null }|null }|null }} result
 * @returns {string}
 */
export function discardCompletionMessage(result) {
  const parts = ['폐기 완료'];
  if (result.operation_id) {
    parts.push(`작업 ${result.operation_id}`);
  }
  if (result.receipt?.archive_path) {
    parts.push(`백업 ${result.receipt.archive_path}`);
  }
  if (result.receipt?.original_pr?.url) {
    parts.push(`원본 PR ${result.receipt.original_pr.url}`);
  }
  if (result.receipt?.revert_pr?.url) {
    parts.push(`revert PR ${result.receipt.revert_pr.url}`);
  }
  return parts.join(' · ');
}

/**
 * One shared UI projection for Worker and Monitor discard affordances. The
 * server owns final admission; this only keeps both views from advertising a
 * knowingly conflicting action and keeps a failed operation retry bound to its
 * original durable operation id.
 *
 * @param {Record<string, any>|null|undefined} operations
 * @param {string} bead_id
 * @param {{ attempt_id?: string|null, external?: boolean, done?: boolean, merge_active?: boolean, merge_queued?: boolean, conflict_active?: boolean, cleanup_active?: boolean, merged?: boolean }} [input]
 * @returns {{ action: boolean, enabled: boolean, label: string, title: string, attempt_id: string|null, operation: any, progress: string|null, error: string|null, confirmation: 'merged'|'unmerged' }}
 */
export function discardProjection(operations, bead_id, input = {}) {
  const list = operations && typeof operations === 'object' ? operations : {};
  const operation = Object.values(list)
    .filter(
      (/** @type {any} */ value) =>
        value && value.bead_id === bead_id && value.phase !== 'done'
    )
    .sort(
      (/** @type {any} */ left, /** @type {any} */ right) =>
        (left.requested_at || 0) - (right.requested_at || 0)
    )
    .at(-1);
  const attempt_id =
    typeof input.attempt_id === 'string' && input.attempt_id.length > 0
      ? input.attempt_id
      : typeof operation?.attempt_id === 'string'
        ? operation.attempt_id
        : null;
  const blocked_reason = input.external
    ? '외부 PR은 Worker가 소유하지 않아 폐기할 수 없습니다'
    : input.done
      ? '완료된 작업은 폐기할 수 없습니다'
      : input.merge_active
        ? '머지 진행 중 — 폐기할 수 없습니다'
        : input.merge_queued
          ? '머지 큐에 있음 — 폐기하려면 먼저 [취소]하세요'
          : input.conflict_active
            ? '충돌 해소 세션 있음 — 폐기하려면 먼저 세션을 정리하세요'
            : input.cleanup_active
              ? '정리 진행 중 — 폐기할 수 없습니다'
              : null;
  const error =
    typeof operation?.last_error === 'string' ? operation.last_error : null;
  const progress = operation ? discardPhaseLabel(operation.phase) : null;
  const confirmation =
    input.merged || operation?.mode === 'merged_revert' ? 'merged' : 'unmerged';
  return {
    action: !input.external && !input.done,
    enabled: !blocked_reason && (!operation || !!error),
    label: error ? '재시도' : '폐기',
    title:
      blocked_reason ||
      (error
        ? `폐기 실패: ${error} — 같은 작업을 재시도합니다`
        : operation
          ? `${progress || '폐기 처리 중'} — 완료를 기다리세요`
          : confirmation === 'merged'
            ? '병합된 변경을 원복 PR로 되돌립니다'
            : '백업 후 runner·PR·워크트리·브랜치를 폐기합니다'),
    attempt_id,
    operation: operation || null,
    progress,
    error,
    confirmation
  };
}

/**
 * Durable discard progress, error, archive, and PR receipts. This same
 * template is used by Worker rows, running tiles, and Monitor cards.
 *
 * @param {{ discard?: ReturnType<typeof discardProjection> }} item
 * @returns {import('lit-html').TemplateResult|''}
 */
export function discardReceiptTemplate(item) {
  const discard = item.discard;
  if (!discard || !discard.operation) {
    return '';
  }
  const operation = discard.operation;
  const archive = operation.backup?.path;
  const original = operation.original_pr;
  const revert = operation.revert_pr;
  return html`<div
    class="worker-discard-receipt"
    role=${discard.error ? 'alert' : 'status'}
  >
    <span>${discard.progress}</span>
    ${discard.error ? html`<span>폐기 실패: ${discard.error}</span>` : ''}
    <code>작업: ${operation.operation_id}</code>
    ${archive
      ? html`<code>백업: ${archive}</code>`
      : discard.error
        ? html`<span>아직 아무것도 삭제하지 않음</span>`
        : ''}
    ${original?.url
      ? html`<a href=${original.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${original.number || '?'}</a
        >`
      : ''}
    ${revert?.url
      ? html`<a href=${revert.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${revert.number || '?'} ·
          ${revert.state || '상태 미확인'}</a
        >`
      : ''}
  </div>`;
}

/**
 * @typedef {Object} MiniItem
 * @property {string} id - Bead id.
 * @property {string} title - Bead title (falls back to id).
 * @property {string} [reason] - Candidate reason chip (spec 없음 / 🔒 target).
 * @property {boolean} draggable - Whether this row can be dragged.
 * @property {'candidate'|'queue'|'running'|'runnable'|'pr_wait'|'done'} lane -
 * Owning lane. `running`/`runnable` exist only for the monitor tab, which mixes
 * every repo into five lanes (UI-qrfo §8); the Worker console never sets them.
 * @property {string} [workspace_name] - Owning workspace name. Present only on
 * the monitor tab, where a card's repo is a coordinate rather than context
 * (UI-qrfo §8) — absent, no badge is drawn and the Worker console renders
 * exactly as before.
 * @property {string} [root_dir] - Owning workspace root; the repo badge's
 * tooltip.
 * @property {boolean} [done] - Rendered dimmed with no grip.
 * @property {boolean} [is_quick_fix] - Candidate route fallback when workflow
 * enrichment is unavailable.
 * @property {boolean} [external] - PR 대기 행이 외부 세션이 배달한 PR인지
 * (UI-w0hi §4). 좌측 액센트 보더 + 미세 배경 틴트로 구분만 하고 행동은 바꾸지
 * 않는다.
 * @property {number|null} [pr_number] - Observed PR number (`pr_wait` rows).
 * @property {string} [pr_url] - Observed PR URL; renders the `#N ↗` link.
 * @property {string|null} [completion_badge] - Root completion status badge.
 * @property {string} [completion_title] - Bounded completion evidence tooltip.
 * @property {number|null} [completion_repair_pr_number] - Linked repair PR.
 * @property {string} [completion_repair_pr_url] - Linked repair PR URL.
 * @property {string[]} [badges] - Gate / base-state badges (worker-phase2 §5).
 * @property {string|null} [live_badge] - Which of {@link MiniItem.badges}
 * reports live server activity rather than a settled state (UI-raqh §3); it is
 * drawn neutral with a breathing dot instead of the alert colour.
 * @property {boolean} [alert] - Whether the badges report a state needing a
 * human decision (PR closed, observation error) — rendered in the warn colour.
 * @property {boolean} [merge_action] - Render the [머지] action (`pr_wait` rows
 * only, worker-phase2 §6).
 * @property {boolean} [discard_action] - Render the [폐기] action.
 * @property {ReturnType<typeof discardProjection>} [discard] - Shared durable
 * discard eligibility, phase, error, archive, and PR-receipt projection.
 * @property {boolean} [merge_enabled] - Whether the gate lets [머지] be clicked.
 * @property {boolean} [discard_enabled] - Whether [폐기] may be clicked; false
 * while a merge is in flight (UI-raqh §4) or a conflict-resolution session owns
 * the bead (UI-dxgz §1).
 * @property {string} [discard_title] - Tooltip for a refused [폐기]; absent
 * keeps the merge-in-flight wording (UI-dxgz §1).
 * @property {string} [merge_label] - Text of the [머지] button; absent renders
 * 머지. A conflicting gate dispatches a resolution session instead of merging,
 * so its button says so (UI-dxgz §2).
 * @property {boolean} [cancel_action] - Render [취소] INSTEAD of [머지]
 * (UI-5v7d §4): the row is already waiting its turn in the merge queue, so the
 * only thing left to click is giving that turn up.
 * @property {boolean} [cancel_enabled] - Whether [취소] may be clicked; false on
 * the item the driver is actively merging.
 * @property {string} [cancel_title] - Tooltip for [취소].
 * @property {boolean} [revise_action] - Render the REVISE-disposition actions
 * (`queue` rows parked at `spec_review_stale:revise`, UI-hs11 §3.5).
 * @property {boolean} [revise_enabled] - Whether the two disposition buttons
 * may be clicked; false while a disposition click of this row is in flight.
 * @property {string} [revise_title] - Tooltip carrying the findings summary.
 * @property {{ label: string, index: number, total: number, percent: number }|null} [merge_step] -
 * The merge's current step, when one is running (UI-raqh §4).
 * @property {string} [merge_title] - Tooltip: what the click is based on, or
 * why it is refused.
 * @property {(import('../board/stepper.js').WorkflowSummary & { route_source?: string, chips?: { route?: string, route_source?: string } }) | null} [workflow] - Server-enriched workflow (candidate cards only).
 * @property {string} [status] - Issue status, for the stepper glow (candidate cards only).
 * @property {import('../../utils/token-usage.js').UsageRecord|import('../../utils/token-usage.js').UsageProjection|null} [usage] - Token usage
 * summed across the bead's attempts (UI-d7pw §1); absent/null renders nothing.
 * @property {number|string} [created_at] - Bead 생성 시각 (UI-d7pw §4).
 * @property {number|string} [updated_at] - Bead 수정 시각 (UI-d7pw §4).
 * @property {number} [done_at] - 완료 레인 진입 시각 = 완료 시각 (UI-rkly §3).
 * @property {boolean} [selectable] - Waiting queue row exposes a bulk checkbox.
 * @property {boolean} [selected] - Browser-local bulk selection state.
 * @property {boolean|null} [worker_serial] - Projected execution mode; null is unknown.
 */

/**
 * One `.mini` row.
 *
 * PR 대기 레인과 REVISE 파킹 행만 다단 카드로 그린다 (UI-k59y §1, UI-yp64 §3):
 * 한 줄에 ID·제목·PR·뱃지·reason·usage·행동 버튼을 전부 실으면 제목이 몇 글자만
 * 남기 때문이다. 파킹 행은 부속 요소 수가 PR 대기와 사실상 같다. 부속 요소가
 * 적은 나머지 대기/완료 행은 한 줄 그대로 둔다 — 거기서는 카드화가 과하다.
 * 두 변형 모두 같은 `.worker-mini` 껍데기를 쓰므로 드래그 계약
 * (`data-bead-id`/`data-lane`)과 머지 진행 시각화는 변형과 무관하게 유지된다.
 *
 * @param {MiniItem} item
 * @returns {import('lit-html').TemplateResult}
 */
export function miniRow(item) {
  const draggable = item.draggable && !item.done;
  const queue_reorderable = draggable && item.lane === 'queue';
  const badges = Array.isArray(item.badges) ? item.badges : [];
  const provider_badges = providerUsageBadges(item.usage);
  const usage_label = formatUsageTotalWithCost(item.usage);
  const merging = item.merge_step || null;
  const card = item.lane === 'pr_wait' || !!item.revise_action;
  // 완료 행은 2줄이다 (UI-rkly §3): 제목이 가로 전체를 쓰는 1줄과, 나머지 사실을
  // 전부 받는 2줄. 한 줄에 usage까지 실으면 제목이 먼저 잘린다.
  const two_line = item.lane === 'done' && !card;
  const done_at_label = two_line ? formatRelativeTime(item.done_at) : '';
  const select_el = item.selectable
    ? html`<input
        class="worker-mini__select"
        type="checkbox"
        data-bead-id=${item.id}
        aria-label=${`${item.id} 선택`}
        .checked=${item.selected === true}
      />`
    : '';
  const grip = queue_reorderable
    ? html`<button
        type="button"
        class="worker-mini__grip"
        draggable="true"
        data-bead-id=${item.id}
        aria-label=${`${item.id} 순서 변경`}
        title="순서 변경"
      >
        ⠿
      </button>`
    : draggable
      ? html`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`
      : '';
  const serial_el =
    item.worker_serial === true
      ? html`<span class="worker-mini__serial">머지까지 단독</span>`
      : item.worker_serial === null
        ? html`<span class="worker-mini__serial worker-mini__serial--unknown"
            >실행 방식 확인 중</span
          >`
        : '';
  // 레포 뱃지는 값이 있을 때만 그린다 (UI-qrfo §8) — Worker 탭 행은 이 필드를
  // 싣지 않으므로 렌더가 그대로다.
  const repo_el = item.workspace_name
    ? html`<span class="worker-mini__repo" title=${item.root_dir || ''}
        >${item.workspace_name}</span
      >`
    : '';
  const id_el = html`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${item.id}</span
  >`;
  const title_el = html`<span class="worker-mini__title">${item.title}</span>`;
  const pr_el =
    item.pr_url && item.pr_number
      ? html`<a
          class="worker-mini__pr"
          href=${item.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${item.pr_number} ↗</a
        >`
      : '';
  const repair_pr_el =
    item.completion_repair_pr_url && item.completion_repair_pr_number
      ? html`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${item.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${item.completion_repair_pr_number} ↗</a
        >`
      : '';
  const badge_els = badges.map((b) =>
    b === item.live_badge
      ? // Live server activity (UI-raqh §3): neutral, never the warn colour —
        // nothing here asks the reader to act, it only says work is running.
        // The breathing dot carries the aliveness a colour would overstate.
        html`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${b}</span
        >`
      : html`<span
          class="worker-mini__badge${item.alert
            ? ' worker-mini__badge--alert'
            : ''}"
          title=${b === item.completion_badge
            ? item.completion_title || ''
            : ''}
          >${b}</span
        >`
  );
  const reason_el = item.reason
    ? html`<span class="worker-mini__reason">${item.reason}</span>`
    : '';
  const usage_el =
    provider_badges.length > 0
      ? provider_badges.map(
          (badge) =>
            html`<span class="worker-usage" title=${badge.tooltip}
              >${badge.label}</span
            >`
        )
      : usage_label
        ? html`<span class="worker-usage" title=${usageTooltip(item.usage)}
            >${usage_label}</span
          >`
        : '';
  const merge_step_el = merging
    ? // The one place this board raises its voice (UI-raqh §4): a merge is
      // irreversible and minutes long, so the row itself becomes the gauge —
      // side rail, bottom progress line, step name and n/total. No spinner: the
      // stage counter says more than a spinner can. The total comes from the
      // current merge-progress projection.
      html`<span class="merge-step"
        >${merging.label}<span class="merge-step__n"
          >${merging.index}/${merging.total}</span
        ></span
      >`
    : '';
  const merge_el = item.merge_action
    ? html`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${item.id}
        ?disabled=${item.merge_enabled === false}
        title=${item.merge_title || ''}
      >
        ${item.merge_label || '머지'}
      </button>`
    : '';
  // [취소] takes [머지]'s place while the row waits its turn (UI-5v7d §4). It
  // is drawn quiet like [폐기]: giving up a place in line is cheap and
  // reversible (re-click 머지), so it must not compete with the action button.
  const cancel_el = item.cancel_action
    ? html`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${item.id}
        ?disabled=${item.cancel_enabled === false}
        title=${item.cancel_title || ''}
      >
        취소
      </button>`
    : '';
  const discard = item.discard;
  const discard_el =
    discard?.action || item.discard_action
      ? html`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${item.id}
          data-attempt-id=${discard?.attempt_id || ''}
          data-operation-id=${discard?.operation?.operation_id || ''}
          data-discard-mode=${discard?.confirmation || 'unmerged'}
          ?disabled=${discard
            ? !discard.enabled
            : item.discard_enabled === false}
          title=${discard
            ? discard.title
            : item.discard_enabled === false
              ? item.discard_title || '머지 진행 중 — 폐기할 수 없습니다'
              : 'PR을 닫고 워크트리/브랜치를 폐기합니다 (되돌릴 수 없음). 다시 실행하려면 후보 레인에서 대기 레인으로 옮기세요'}
        >
          ${discard?.label || '폐기'}
        </button>`
      : '';
  // 파킹 처분 두 버튼 (UI-hs11 §3.5). 대기 레인 행에만 붙고, 머지/폐기와 같은
  // 클릭 위임·CAS 재시도 계약을 쓴다. findings 상세는 카드 클릭 → 이슈 상세
  // (notes 섹션, UI-yp64 §4)로 가고 여기서는 툴팁 요약만 싣는다.
  const revise_els = item.revise_action
    ? html`<button
          type="button"
          class="worker-mini__revise-fix"
          data-bead-id=${item.id}
          ?disabled=${item.revise_enabled === false}
          title=${item.revise_title ||
          'notes의 REVISE finding을 스펙에 반영하는 처분 세션을 띄웁니다'}
        >
          finding 수용·수정
        </button>
        <button
          type="button"
          class="worker-mini__revise-approve"
          data-bead-id=${item.id}
          ?disabled=${item.revise_enabled === false}
          title="델타를 사용자 권한으로 승인해 영수증을 갱신하고 파킹을 해제합니다 (세션 없음)"
        >
          승인하고 진행
        </button>`
    : '';
  const has_foot = !!(
    usage_label ||
    merging ||
    item.merge_action ||
    item.cancel_action ||
    item.discard_action ||
    discard?.operation ||
    item.revise_action
  );
  return html`<div
    class="worker-mini${card ? ' worker-mini--card' : ''}${item.selected
      ? ' worker-mini--selected'
      : ''}${draggable ? '' : ' worker-mini--static'}${item.done
      ? ' worker-mini--done'
      : ''}${merging ? ' worker-mini--merging' : ''}${item.external
      ? ' worker-mini--external'
      : ''}"
    style=${merging ? `--progress: ${merging.percent}%` : ''}
    draggable=${draggable && !queue_reorderable ? 'true' : 'false'}
    data-bead-id=${item.id}
    data-lane=${item.lane}
  >
    ${two_line
      ? html`<div class="worker-mini__row1">${repo_el}${id_el}${title_el}</div>
          <div class="worker-mini__row2">
            ${usage_el}${done_at_label
              ? html`<span
                  class="worker-mini__done-at"
                  title=${`완료 ${formatTimestampLocal(item.done_at)}`}
                  >완료 ${done_at_label}</span
                >`
              : ''}${badge_els}${merge_step_el}
            <span class="worker-mini__actions"
              >${merge_el}${cancel_el}${discard_el}</span
            >
            ${timesMeta(item)}
          </div>`
      : card
        ? html`<div class="worker-mini__head">
              ${select_el}${grip}${repo_el}${id_el}${pr_el}${repair_pr_el}${badge_els}${serial_el}${reason_el}
            </div>
            <div class="worker-mini__body">${title_el}</div>
            ${has_foot
              ? html`<div class="worker-mini__foot">
                  ${usage_el}${merge_step_el}
                  <span class="worker-mini__actions"
                    >${merge_el}${cancel_el}${discard_el}${revise_els}</span
                  >
                  ${discardReceiptTemplate(item)}
                </div>`
              : ''}
            ${timesMeta(item)}`
        : // 한 줄 변형은 본문을 `__line`으로 감싸고 메타 줄을 형제로 붙인다
          // (UI-d7pw §4.1). 드래그 계약은 바깥 `.worker-mini`의
          // `data-bead-id`/`data-lane`에 걸려 있어 내부 재구성에 영향받지 않는다.
          html`<div class="worker-mini__line">
              ${select_el}${grip}${repo_el}${id_el}${title_el}${pr_el}${repair_pr_el}${badge_els}${serial_el}${reason_el}${usage_el}${merge_step_el}${merge_el}${cancel_el}${discard_el}
            </div>
            ${discardReceiptTemplate(item)} ${timesMeta(item)}`}
  </div>`;
}

/**
 * One candidate `.worker-card` (spec §2, mockup 변형 B). Richer than
 * {@link miniRow}: a route chip + the Board's route-driven stepper. It keeps
 * miniRow's drag contract (`draggable` / `data-bead-id` / `data-lane`) so the
 * drag controller treats it identically. An issue without `workflow` (inactive
 * workspace) renders without the chip/stepper and never throws.
 *
 * @param {MiniItem} item
 * @returns {import('lit-html').TemplateResult}
 */
export function candidateCard(item) {
  const draggable = item.draggable && !item.done;
  const workflow = item.workflow;
  const chips = (workflow && workflow.chips) || {};
  const route = chips.route || (workflow && workflow.route);
  const derived =
    chips.route_source === 'derived' ||
    !!(workflow && workflow.route_source === 'derived');
  const is_quick_fix =
    item.is_quick_fix === true ||
    (!!workflow && workflow.route === 'quick_fix');
  const danger =
    typeof item.reason === 'string' && item.reason.startsWith('⛔');
  return html`<div
    class="worker-card${draggable ? '' : ' worker-card--static'}"
    draggable=${draggable ? 'true' : 'false'}
    data-bead-id=${item.id}
    data-lane=${item.lane}
  >
    <div class="worker-card__head">
      ${draggable
        ? html`<span class="worker-card__grip" aria-hidden="true">⠿</span>`
        : ''}
      ${item.workspace_name
        ? html`<span class="worker-card__repo" title=${item.root_dir || ''}
            >${item.workspace_name}</span
          >`
        : ''}
      <span class="worker-card__id" title="클릭하면 ID 복사">${item.id}</span>
      ${workflow && route
        ? html`<span
            class="ctl-chip ctl-chip--route${derived ? ' is-derived' : ''}"
            title=${derived ? 'route 미핀 (metadata unset)' : 'route'}
            >${derived ? 'unset' : route}</span
          >`
        : ''}
    </div>
    <div class="worker-card__title">${item.title}</div>
    ${workflow ? stepperTemplate(workflow, item.status) : ''}
    <div
      class="worker-card__foot${item.reason
        ? ''
        : ' worker-card__foot--actions-only'}"
    >
      ${item.reason
        ? html`<span
            class="worker-card__reason${danger
              ? ' worker-card__reason--danger'
              : ''}"
            >${item.reason}</span
          >`
        : ''}
      <!-- 버튼식 큐 적재 (UI-58y2 §[대기로 ↴]): 드래그의 보완재이지 대체재가
           아니므로 자격 조건은 드래그와 완전히 같다 — spec 없는 후보만 막고,
           blocked-with-spec은 드래그와 마찬가지로 적재할 수 있다. 표시 조건
           (coarse pointer / 좁은 화면)은 CSS가 소유한다. -->
      <button
        type="button"
        class="worker-card__place"
        data-bead-id=${item.id}
        ?disabled=${!draggable}
        title=${draggable
          ? '대기 큐 맨 뒤에 추가'
          : is_quick_fix
            ? 'quick_fix route는 워커 실행 대상이 아닙니다'
            : 'spec이 없어 대기 큐에 넣을 수 없습니다'}
      >
        대기로 ↴
      </button>
    </div>
    ${timesMeta(item)}
  </div>`;
}

/**
 * One lane pane. `body` overrides the row rendering for a column whose contents
 * are not mini rows (실행 중); `items` still supplies the header count so every
 * column counts its members the same way. `controls` is an optional strip under
 * the header (candidate display filters, UI-ki09) and `header_control` an
 * optional trailing element INSIDE it (the candidate sort select, UI-raqh §2) —
 * a pane that passes neither renders exactly as before.
 *
 * `collapsible` turns the header into the accordion toggle used by the mobile
 * layout (UI-58y2): a collapsed pane renders no body but keeps its `data-lane`,
 * so 후보→대기 still drops onto the strip. `live` marks the lane whose work is
 * actually running, which is the only lane whose header dot breathes.
 *
 * @param {{ id: string, lane: 'candidate'|'queue'|'running'|'pr_wait'|'done', title: string, items: MiniItem[], src?: boolean, empty?: string, body?: import('lit-html').TemplateResult, controls?: import('lit-html').TemplateResult, header_control?: import('lit-html').TemplateResult|string, live?: boolean, collapsible?: boolean, collapsed?: boolean, preview?: string }} pane
 * @returns {import('lit-html').TemplateResult}
 */
export function paneTemplate(pane) {
  const collapsed = !!pane.collapsible && !!pane.collapsed;
  const head_inner = html`<span
      class="worker-pane__dot worker-pane__dot--${pane.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${pane.title}</span>
    ${collapsed && pane.preview
      ? html`<span class="worker-pane__preview">${pane.preview}</span>`
      : ''}
    <span class="worker-pane__count">${pane.items.length}</span>`;
  return html`<section
    class="worker-pane worker-pane--lane-${pane.lane}${pane.src
      ? ' worker-pane--src'
      : ''}${pane.live ? ' worker-pane--live' : ''}${pane.collapsible
      ? ' worker-pane--collapsible'
      : ''}${collapsed ? ' worker-pane--collapsed' : ''}"
    id=${pane.id}
    data-lane=${pane.lane}
  >
    ${pane.collapsible
      ? html`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${pane.lane}
          aria-expanded=${collapsed ? 'false' : 'true'}
        >
          ${head_inner}
          <span class="worker-pane__caret" aria-hidden="true"
            >${collapsed ? '▸' : '▾'}</span
          >
        </button>`
      : html`<header class="worker-pane__hd">
          ${head_inner}${pane.header_control ? pane.header_control : ''}
        </header>`}
    ${collapsed
      ? ''
      : html`${pane.controls ? pane.controls : ''}
          <div class="worker-pane__body">
            ${pane.body
              ? pane.body
              : pane.items.length === 0
                ? html`<div class="worker-pane__empty">
                    ${pane.empty || ''}
                  </div>`
                : pane.items.map((it) =>
                    pane.lane === 'candidate' ? candidateCard(it) : miniRow(it)
                  )}
          </div>`}
  </section>`;
}
