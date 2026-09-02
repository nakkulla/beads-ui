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
import { ifDefined } from 'lit-html/directives/if-defined.js';
import {
  REC_LABEL,
  REC_STATE_TEXT,
  recReasonSentences,
  recTooltip
} from '../../utils/rec-settings.js';
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
import { chipPopoverTemplate } from '../chip-popover.js';
import { logPathTemplate } from './log-path.js';

/**
 * @param {unknown} sha
 * @returns {string}
 */
export function shortSha(sha) {
  return typeof sha === 'string' && sha.length >= 7 ? sha.slice(0, 7) : '—';
}

/**
 * Both lanes label the chip `작업`, but they measure different spans. This is
 * the only place on screen that tells a reader which span they are reading.
 *
 * @param {'attempt'|'session'|undefined} work_kind
 * @returns {string}
 */
export function workTooltip(work_kind) {
  return work_kind === 'session'
    ? 'bead가 in_progress로 잡힌 뒤 닫히기까지의 경과'
    : 'attempt 실행 시간 합산 (재개 세션 포함)';
}

/**
 * @param {unknown} elapsed_ms
 * @returns {string}
 */
export function formatElapsed(elapsed_ms) {
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
  if (minutes < 60) {
    return `${minutes}분 ${Math.round(seconds - minutes * 60)}초`;
  }
  const hours = Math.floor(minutes / 60);
  const remaining_minutes = minutes % 60;
  return `${hours}시간 ${remaining_minutes}분`;
}

/**
 * `review_session` 시도를 한 bead의 완료 행 배지로 요약한다 (UI-d7fy §5.5).
 *
 * 이 시도들은 일반 attempt와 같은 이력 표면에 있다 — 토큰 합계와 작업 시간은
 * `bead_id`만 보므로 이미 함께 세어진다. 배지는 그 합계 안에 무엇이 섞여
 * 있는지를 구분하는 유일한 표시다. 모양이 어긋난 입력은 조용히
 * 무시한다(fail-quiet).
 *
 * @param {unknown} attempts - 큐 스냅샷의 attempt_id → attempt record 맵.
 * @param {string} bead_id
 * @returns {string[]}
 */
export function reviewSessionAttemptBadges(attempts, bead_id) {
  if (typeof attempts !== 'object' || attempts === null) {
    return [];
  }
  let seen = false;
  let auto = false;
  for (const attempt of Object.values(attempts)) {
    if (typeof attempt !== 'object' || attempt === null) {
      continue;
    }
    const a = /** @type {Record<string, unknown>} */ (attempt);
    if (a.bead_id !== bead_id || a.kind !== 'review_session') {
      continue;
    }
    seen = true;
    auto = auto || a.origin === 'auto';
  }
  if (!seen) {
    return [];
  }
  return [auto ? '리뷰 · 자동' : '리뷰'];
}

/**
 * `review_session` attempt를 띄운 트리거 — 계약 enum(`auto`·`click`) 밖의 값은
 * 없는 것으로 읽는다(fail-quiet).
 *
 * @param {unknown} origin
 * @returns {'auto'|'click'|null}
 */
function reviewSessionOrigin(origin) {
  return origin === 'auto' || origin === 'click' ? origin : null;
}

/**
 * `[리뷰 후 머지]` 세션의 행 상태 — 한 bead 기준 (UI-d7fy §5.4).
 *
 * PR 대기 행이 두 가지를 물어본다: 지금 리뷰 세션이 도는가(그러면 버튼을 잠근다),
 * 그리고 마지막 세션이 왜 끝났는가(그러면 게이트 뱃지 옆에 사유를 적는다).
 * 진행 중인 세션이 하나라도 있으면 그것이 답이고, 없으면 가장 최근에 끝난 실패가
 * 답이다 — 성공한 세션은 authority 재결속으로 이미 보류를 걷어냈으므로 남길 말이
 * 없다. 모양이 어긋난 입력은 조용히 무시한다(fail-quiet).
 *
 * `origin`은 그 답을 낸 attempt를 누가 띄웠는가다 (UI-qksl §7): 큐가 head당 1회
 * 자동 dispatch하므로, 실행 중·실패 어느 쪽이든 사람이 누른 세션과 기계가 띄운
 * 세션이 같은 자리에 온다.
 *
 * @param {unknown} attempts - 큐 스냅샷의 attempt_id → attempt record 맵.
 * @param {string} bead_id
 * @returns {{ active: boolean, failure: string|null, origin: 'auto'|'click'|null }}
 */
export function reviewSessionRowState(attempts, bead_id) {
  if (typeof attempts !== 'object' || attempts === null) {
    return { active: false, failure: null, origin: null };
  }
  let active = false;
  /** @type {'auto'|'click'|null} */
  let active_origin = null;
  let active_at = -1;
  /** @type {string|null} */
  let failure = null;
  /** @type {'auto'|'click'|null} */
  let failure_origin = null;
  let failure_at = -1;
  for (const attempt of Object.values(attempts)) {
    if (typeof attempt !== 'object' || attempt === null) {
      continue;
    }
    const a = /** @type {Record<string, unknown>} */ (attempt);
    if (a.bead_id !== bead_id || a.kind !== 'review_session') {
      continue;
    }
    if (a.status === 'pending' || a.status === 'running') {
      active = true;
      const started_at = typeof a.started_at === 'number' ? a.started_at : 0;
      if (started_at >= active_at) {
        active_at = started_at;
        active_origin = reviewSessionOrigin(a.origin);
      }
      continue;
    }
    if (a.status !== 'failed') {
      continue;
    }
    const at = typeof a.finished_at === 'number' ? a.finished_at : 0;
    if (at >= failure_at) {
      failure_at = at;
      failure =
        typeof a.cause === 'string' && a.cause.length > 0 ? a.cause : null;
      failure_origin = reviewSessionOrigin(a.origin);
    }
  }
  return active
    ? { active: true, failure: null, origin: active_origin }
    : { active: false, failure, origin: failure_origin };
}

/**
 * Resume 체인 포함 attempt별 실행 벽시계 시간의 합 — 완료 레인 행의 "작업
 * 시간"으로 쓴다. `attempts`는 큐 스냅샷의 attempt_id → attempt record 맵이며,
 * 모양이 어긋난 입력은 조용히 무시한다(fail-quiet).
 *
 * @param {unknown} attempts
 * @param {string} bead_id
 * @returns {number|null}
 */
export function sumAttemptWorkMs(attempts, bead_id) {
  if (typeof attempts !== 'object' || attempts === null) {
    return null;
  }
  let total_ms = 0;
  let found = false;
  for (const attempt of Object.values(attempts)) {
    if (typeof attempt !== 'object' || attempt === null) {
      continue;
    }
    const a = /** @type {Record<string, unknown>} */ (attempt);
    if (a.bead_id !== bead_id) {
      continue;
    }
    const started_at = a.started_at;
    const finished_at = a.finished_at;
    if (
      typeof started_at !== 'number' ||
      typeof finished_at !== 'number' ||
      !Number.isFinite(started_at) ||
      !Number.isFinite(finished_at) ||
      finished_at < started_at
    ) {
      continue;
    }
    total_ms += finished_at - started_at;
    found = true;
  }
  return found ? total_ms : null;
}

/**
 * Local wall-clock `HH:MM` for a timestamp, or '' when there is none. The strip
 * says WHEN the current deployment landed, and a date is noise for something
 * that happened today; the full timestamp lives in the title attribute.
 *
 * @param {unknown} at
 * @returns {string}
 */
export function formatClock(at) {
  if (typeof at !== 'number' || !Number.isFinite(at) || at <= 0) {
    return '';
  }
  const date = new Date(at);
  return `${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes()
  ).padStart(2, '0')}`;
}

/**
 * What the collapsed 저장소 작업 strip says (UI-q0uy §4.1). Pure derivation over
 * the projections the snapshot already carries, so a reader gets the current
 * deployment, its freshness and the outstanding count WITHOUT expanding
 * anything — and nothing here ever forces an expansion.
 *
 * 해결 필요 counts unresolved failures only: a `failed` row a human already
 * acknowledged (§4.6-2 `dismissed`) is out, and a stopped cleanup is in.
 *
 * Returns null when this workspace has neither operations nor a stopped
 * cleanup — there is no state there worth a strip.
 *
 * @param {any} operations - Projected `repo_operations` cards.
 * @param {any} cleanup_failures - Projected `cleanup_failed` entries.
 * @returns {{ deploy: { sha: string, at: number|null, elapsed_ms: number|null }|null, unresolved: number, badge: { tone: 'act'|'quiet', label: string } }|null}
 */
export function repoOpsStripModel(operations, cleanup_failures) {
  const cards = Array.isArray(operations) ? operations : [];
  const cleanup = Array.isArray(cleanup_failures) ? cleanup_failures : [];
  if (cards.length === 0 && cleanup.length === 0) {
    return null;
  }
  /** @type {any|null} */
  let latest = null;
  for (const card of cards) {
    if (
      card.kind !== 'deploy' ||
      card.state !== 'succeeded' ||
      typeof card.target_sha !== 'string'
    ) {
      continue;
    }
    if (
      !latest ||
      (typeof card.finished_at === 'number' ? card.finished_at : 0) >
        (typeof latest.finished_at === 'number' ? latest.finished_at : 0)
    ) {
      latest = card;
    }
  }
  const unresolved =
    cards.filter(
      (/** @type {any} */ card) =>
        card.state === 'failed' && !card.dismissed && !card.superseded_by
    ).length + cleanup.length;
  return {
    deploy: latest
      ? {
          sha: shortSha(latest.target_sha),
          at:
            typeof latest.finished_at === 'number' ? latest.finished_at : null,
          elapsed_ms:
            typeof latest.elapsed_ms === 'number' ? latest.elapsed_ms : null
        }
      : null,
    unresolved,
    badge:
      unresolved > 0
        ? { tone: 'act', label: `해결 필요 ${unresolved}` }
        : { tone: 'quiet', label: '모두 정상' }
  };
}

/**
 * The 저장소 작업 strip (UI-q0uy §4.1): one line that reads as a fact even while
 * collapsed, and a BUTTON rather than a `<details>` — the panel used to force
 * itself open on any failure, which is what buried everything else on the
 * screen. The badge calls; the click opens the timeline drawer.
 *
 * @param {any} operations
 * @param {any} cleanup_failures
 * @returns {import('lit-html').TemplateResult|string}
 */
export function repoOpsStripTemplate(operations, cleanup_failures) {
  const model = repoOpsStripModel(operations, cleanup_failures);
  if (!model) {
    return '';
  }
  return html`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${model.deploy
      ? html`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${model.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${model.deploy.at
              ? formatTimestampLocal(model.deploy.at)
              : ''}
            >${formatClock(model.deploy.at)}${model.deploy.elapsed_ms !== null
              ? ` · ${formatElapsed(model.deploy.elapsed_ms)}`
              : ''}</span
          >
        </span>`
      : ''}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${model.badge
        .tone}"
      >${model.badge.label}</span
    >
  </button>`;
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
  const stale_recovery = operation?.kind === 'stale_work_backup_fresh';
  const confirmation =
    input.merged || operation?.mode === 'merged_revert' ? 'merged' : 'unmerged';
  return {
    action: !input.external && !input.done,
    enabled: !blocked_reason && (!operation || !!error),
    label: stale_recovery
      ? error
        ? '백업 정리 재시도'
        : '백업 후 새로 시작'
      : error
        ? '재시도'
        : '폐기',
    title:
      blocked_reason ||
      (error
        ? stale_recovery
          ? `백업 뒤 정리 실패: ${error} — 원본과 검증 영수증을 보존한 채 재시도합니다`
          : `폐기 실패: ${error} — 같은 작업을 재시도합니다`
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
 * Whether a quick-fix attempt has crossed base containment and reached a
 * landing-owned cleanup step. Earlier or absent cursors do not prove landing.
 *
 * @param {Record<string, any>|null|undefined} attempt
 * @returns {boolean}
 */
export function quickFixLanded(attempt) {
  if (!attempt || attempt.quickfix_lane !== true) {
    return false;
  }
  const landing = attempt.quickfix_landing;
  if (!landing || typeof landing !== 'object') {
    return false;
  }
  return ['repo_operations', 'branch_cleanup', 'parent_close'].includes(
    landing.cursor
  );
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
  const archive =
    operation.kind === 'stale_work_backup_fresh' && !discard.error
      ? null
      : operation.backup?.path;
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
 * @typedef {Object} StaleWorkView
 * @property {'worktree'|'branch'} residue
 * @property {'unique'|'unknown'} state
 * @property {string} title
 * @property {string} cause
 * @property {string} summary
 * @property {string} action_id
 * @property {boolean} can_resume
 * @property {boolean} can_continue
 * @property {boolean} can_backup_fresh
 * @property {boolean} can_recheck
 * @property {boolean} locked
 */

const STALE_WORK_CAUSES = {
  dirty_unique: '최신 base에 없는 로컬 변경이 남아 있습니다',
  untracked_present: '추적되지 않은 파일이 남아 있습니다',
  branch_ahead: '로컬 branch에 고유 commit이 남아 있습니다',
  head_ahead: 'worktree HEAD에 고유 commit이 남아 있습니다',
  ahead_not_contained:
    '로컬 branch의 고유 commit이 최신 base에 포함됐음을 증명하지 못했습니다',
  ahead_merge_commit:
    '로컬 branch에 자동 정리할 수 없는 merge commit이 남아 있습니다',
  ahead_submodule_path:
    '로컬 branch의 고유 commit이 submodule 경로를 변경합니다',
  archive_failed: '고유 commit 백업을 안전하게 검증하지 못했습니다',
  ref_delete_failed: '확인된 local branch를 안전하게 삭제하지 못했습니다',
  resume_available: '이어갈 수 있는 이전 Worker session이 있습니다',
  observe_failed: 'Git 상태를 안전하게 확인하지 못했습니다',
  identity_changed: '확인 중 worktree 상태가 바뀌었습니다',
  ownership_unknown: 'Worker 소유 worktree인지 확인하지 못했습니다'
};

/**
 * @param {unknown} admission
 * @param {boolean} [locked]
 * @returns {StaleWorkView|null}
 */
export function staleWorkProjection(admission, locked = false) {
  if (!admission || typeof admission !== 'object') {
    return null;
  }
  const record = /** @type {Record<string, unknown>} */ (admission);
  if (
    record.reason !== 'worktree_stale_work' ||
    !record.stale_work ||
    typeof record.stale_work !== 'object'
  ) {
    return null;
  }
  const stale_work = /** @type {Record<string, unknown>} */ (record.stale_work);
  const residue = stale_work.residue === 'branch' ? 'branch' : 'worktree';
  const state = stale_work.state === 'unique' ? 'unique' : 'unknown';
  const summary =
    stale_work.summary && typeof stale_work.summary === 'object'
      ? /** @type {Record<string, unknown>} */ (stale_work.summary)
      : {};
  /**
   * @param {string} key
   */
  function count(key) {
    return Number.isInteger(summary[key]) ? Number(summary[key]) : 0;
  }
  const cause_key =
    typeof stale_work.cause === 'string' ? stale_work.cause : 'observe_failed';
  return {
    residue,
    state,
    title:
      residue === 'branch'
        ? '이전 브랜치 보존됨'
        : state === 'unique'
          ? '이전 작업 보존됨'
          : '이전 작업 상태 확인 실패',
    cause:
      STALE_WORK_CAUSES[
        /** @type {keyof typeof STALE_WORK_CAUSES} */ (cause_key)
      ] || '안전하게 자동 정리할 수 없는 이전 작업이 남아 있습니다',
    summary:
      residue === 'branch'
        ? `고유 commit ${count('branch_ahead')}`
        : [
            `staged ${count('staged_count')}`,
            `unstaged ${count('unstaged_count')}`,
            `untracked ${count('untracked_count')}`,
            `branch ahead ${count('branch_ahead')}`,
            `HEAD ahead ${count('head_ahead')}`
          ].join(' · '),
    action_id:
      typeof stale_work.action_id === 'string' ? stale_work.action_id : '',
    can_resume: stale_work.can_resume === true,
    can_continue: stale_work.can_continue === true,
    can_backup_fresh: stale_work.can_backup_fresh === true,
    can_recheck: stale_work.can_recheck === true,
    locked
  };
}

/**
 * The 오케/워커 execution-settings chips (worker-card-exec-chips §4).
 *
 * The prefix label lives here rather than in the formatter: the formatter owns
 * the settings text, the template owns how that text is introduced.
 *
 * `pin` marks the pair as an ISSUE PIN that differs from the repo default
 * (UI-eey2 §5): the monitor draws a card's exec chips only in that case, so the
 * chip must say why it is the one chip on the card. Omitted — every Worker
 * call — renders exactly as before.
 *
 * @param {import('../../utils/exec-settings-chip.js').ExecChips|null|undefined} chips
 * @param {{ pin?: boolean }} [options]
 * @returns {import('lit-html').TemplateResult|''}
 */
export function execChipsTemplate(chips, options = {}) {
  if (!chips || (!chips.orchestration && !chips.worker)) {
    return '';
  }
  const pin = options.pin === true ? ' exec-chip--pin' : '';
  const note = options.pin === true ? '\n이슈 핀 — 레포 기본값과 다름' : '';
  return html`${chips.orchestration
    ? html`<span
        class="exec-chip exec-chip--orch${pin}"
        title=${`${chips.orchestration.title}${note}`}
        ><span class="exec-chip__k">오케</span
        ><span class="exec-chip__v">${chips.orchestration.text}</span></span
      >`
    : ''}${chips.worker
    ? html`<span
        class="exec-chip exec-chip--worker${pin}"
        title=${`${chips.worker.title}${note}`}
        ><span class="exec-chip__k">워커</span
        ><span class="exec-chip__v">${chips.worker.text}</span></span
      >`
    : ''}`;
}

/**
 * @typedef {Object} DependencyChip
 * @property {string} id - The bead on the other end of the edge.
 * @property {string} label - Full chip text. The projection composes it because
 * only the projection knows the 위치 vocabulary; the template never invents it.
 * @property {string} [title] - Tooltip sentence.
 * @property {boolean} [foreign] - blocker가 이 이슈와 다른 레포의 rig에 있다.
 * 문구는 같고 색만 갈라진다 — 기다린다는 사실이 아니라 그것을 여기서 닫을 수
 * 없다는 사실만 다르기 때문이다.
 * @property {string} [root_dir] - blocker를 소유한 workspace. 같은 레포면 생략.
 * @property {boolean} [openable] - 이 칩을 눌러 blocker 이슈를 열 수 있다.
 */

/**
 * One `🔓 해제: X` 칩 (UI-d13v §5.2). 모양은 {@link DependencyChip}과 같다 —
 * 같은 슬롯에 같은 치수로 서고, 갈라지는 것은 색과 문장뿐이다.
 *
 * @typedef {DependencyChip} ReleasedChip
 */

/**
 * One `→ <ID>` 칩 (UI-8x90 §3). 선행 칩과 같은 마크업·같은 클릭이므로 모양도
 * {@link DependencyChip}과 같다 — 갈라지는 것은 색과 툴팁 첫 낱말뿐이다.
 *
 * @typedef {DependencyChip} DependentsChip
 */

/**
 * One 겹침 상대 (UI-qm12 §5.2·§5.3). 선언 scope가 부딪히는 상대일 뿐, 순서를
 * 주장하지 않는다 — 배치는 드래그와 `[대기로 ↴]` 배치 메뉴가 소유한다
 * (UI-8x90 §9).
 *
 * @typedef {Object} OverlapChip
 * @property {string} id - 상대 bead.
 * @property {string} title
 * @property {string} location_label - `실행중` · `#n` · `s1 #n` · `실행가능`.
 * @property {string[]} prefixes - 두 선언이 부딪힌 자리 — 각 쌍에서 더 긴
 * prefix를 채택한 사전순 목록. 팝오버가 보여 주던 목록이고 지금은 툴팁 재료다.
 * @property {string} [root_dir] - 상대를 소유한 workspace. 겹침은 레포 안에서만
 * 정의되지만 그 레포가 지금 활성 workspace라는 보장은 없다 (Monitor).
 */

/**
 * 슬롯 4 두 줄의 재료 (UI-8x90 §4.1). 상단(`--primary`)은 행동을 바꾸는 사실,
 * 하단(`--secondary`)은 정보다. 두 줄은 각자 재료로 판정한다 (fail-quiet).
 *
 * @typedef {Object} DependencyChips
 * @property {DependencyChip[]} [predecessors] - `⛓ <ID>`. 칩에 해제
 * 버튼은 없다: 끊는 일은 의존성 패널이 확인을 받고 처리한다. 누를 수 있는지는
 * 칩마다 갈린다 (`DependencyChip.openable`, UI-u6zf §5.1) — 같은 카드 안에서도
 * 열 수 있는 blocker와 owner를 모르는 blocker가 섞이므로 묶음 플래그로는 그것을
 * 표현할 수 없다. 그 값을 렌더러 인자가 아니라 투영이 싣는 이유는
 * `candidateCard`·`miniRow`를 두 탭이 함께 부르기 때문이다 — 호출 인자로 가르면
 * 같은 템플릿을 탭마다 다르게 부르는 자리가 새로 생긴다.
 * @property {ReleasedChip[]} [released] - `🔓 <ID>` (UI-d13v §5.2). 하단 줄에
 * 서고 `openable` 규칙은 선행 칩과 같다.
 * @property {DependentsChip[]} [dependents] - `→ <ID>` (UI-8x90 §3). ID마다 칩
 * 하나이며 상단 줄에서 선행 칩 다음에 선다.
 * @property {OverlapChip[]} [overlaps] - `⧉ <ID>` (UI-qm12 §5.3).
 * @property {boolean} [scope_missing] - 선언 원천은 읽혔는데 scope 선언이
 * 비었다 — 겹침을 판정할 수 없다는 사실 자체를 드러낸다.
 * @property {{ lane_id: string, label: string, orphan: boolean }} [armed_lane]
 * - `▶ 연결 n` 발차 칩 (UI-jaua §5.6). 그 행이 연결 레인의 발차 축으로 돌고
 * 있다는 사실이고, 소속 칩과 다른 질문에 답한다("이 레인 것이다"가 아니라 "지금
 * 이 레인이 이것을 굴리고 있다"). `orphan`이면 라벨이
 * `▶ 진행 중 · 레인 없음`이고 그 자리에 해제 버튼이 함께 선다 — 스케줄러는 계속
 * 발차하므로 조용히 두지 않는다 (fail-visible, §5.3 (2)). 발차는 행동 상태라
 * 상단 줄 맨 앞이다 (UI-8x90 §4.1).
 */

/**
 * One 열리는 칩 (UI-8x90 §4.2). 네 종(`⛓`·`→`·`🔓`·`⧉`)이 같은 마크업을 쓴다 —
 * 클릭 의미가 하나("그 이슈의 상세")이므로 클릭 표면도 하나여야 한다. 열 수
 * 없는 칩은 `<span>`이다: 누를 수 없는 버튼은 만들지 않는다 (UI-u6zf §5.1).
 *
 * @param {DependencyChip} chip
 * @param {string} kind - `pred` · `dependents` · `released` · `overlap`.
 * @returns {import('lit-html').TemplateResult}
 */
function openableChipTemplate(chip, kind) {
  const cls = `worker-dep worker-dep--${kind}${chip.foreign ? ' worker-dep--foreign' : ''}`;
  return chip.openable === true
    ? html`<button
        type="button"
        class=${`${cls} worker-dep__open`}
        data-dep-id=${chip.id}
        data-root-dir=${chip.root_dir || ''}
        title=${chip.title || ''}
      >
        ${chip.label}
      </button>`
    : html`<span class=${cls} title=${chip.title || ''}>${chip.label}</span>`;
}

/**
 * The 겹침 칩 as an openable one (UI-8x90 §4.2). 겹침은 레포 안에서만 정의되므로
 * 상대는 언제나 열 수 있고, 팝오버가 보여 주던 경로 목록은 툴팁으로 남는다.
 *
 * @param {OverlapChip} chip
 * @returns {DependencyChip}
 */
function overlapAsChip(chip) {
  return {
    id: chip.id,
    label: `⧉ ${chip.id}`,
    title: [`겹침 · ${chip.location_label}`, ...chip.prefixes].join('\n'),
    openable: true,
    ...(chip.root_dir ? { root_dir: chip.root_dir } : {})
  };
}

/**
 * One chip group in ID 사전순 (UI-8x90 §4.1). 복사본을 정렬하므로 투영이 실어
 * 준 배열은 그대로 남는다.
 *
 * @template {{ id: string }} T
 * @param {T[]|undefined} chips
 * @returns {T[]}
 */
function byId(chips) {
  return Array.isArray(chips)
    ? chips.slice().sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
    : [];
}

/**
 * The `스펙 대기` 판정 칩 (UI-svh6 §4.3). `⛓` 칩이 말하는 막힘이 실행뿐 아니라
 * **설계까지** 미친다는 사실 하나이므로 슬롯 1이 아니라 슬롯 4a에서 `⛓` 바로
 * 다음에 선다 — 답하는 질문이 "지금 갈 수 있나"라 머리줄의
 * `worker-ineligible`·`세션 권장`과 상호배제하지 않는다. 색은 기존
 * `ctl-chip--label` 그대로다 (§4.5). 재료가 없으면 빈 문자열이다 (fail-quiet).
 *
 * @param {boolean} active
 * @param {boolean} [open] - 사유 팝업이 지금 이 카드에서 이 칩 아래에 펼쳐져
 * 있는지. `aria-expanded`가 되는 값이다.
 * @returns {import('lit-html').TemplateResult|''}
 */
export function specAfterBlockerChipTemplate(active, open = false) {
  if (!active) {
    return '';
  }
  return html`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__spec-after-blocker"
    data-chip-key="spec_after_blocker"
    aria-expanded=${open ? 'true' : 'false'}
    title="선행의 결과가 설계 전제라 스펙도 선행 뒤에 씁니다"
  >
    스펙 대기
  </button>`;
}

/**
 * The two lines of 슬롯 4 (UI-8x90 §4.1·§4.2). 상단은 "지금 갈 수 있나"를 바꾸는
 * 사실(`▶ 연결` 발차 · `⛓` 선행 · `→` 후속), 하단은 판단 재료(`🔓` 해제 ·
 * `⧉` 겹침 · `scope 없음`)다. 재료가 없는 줄은 그리지 않으며 두 줄은 서로를
 * 기다리지 않는다.
 *
 * 레인 분기는 없다 (UI-anna §6): 모든 칩이 재료가 실린 카드에 선다. 어느 레인이
 * 그 재료를 받는가는 투영이 정하고, 이 템플릿은 받은 것을 그린다.
 *
 * @param {DependencyChips|null|undefined} chips
 * @param {import('lit-html').TemplateResult|''} [after_predecessors] - `⛓` 칩
 * 바로 뒤에 서는 조각 (UI-svh6 §4.3). 칩 하나를 위해 이 템플릿이 `MiniItem`을
 * 통째로 읽게 만들지 않으려고 호출 자리가 만들어 넘긴다. 값이 있으면 상단 줄은
 * 선행 칩이 없어도 선다.
 * @returns {import('lit-html').TemplateResult|''}
 */
export function dependencyChipsTemplate(chips, after_predecessors = '') {
  if (!chips) {
    return after_predecessors === ''
      ? ''
      : html`<div class="worker-deps worker-deps--primary">
          ${after_predecessors}
        </div>`;
  }
  // 각 묶음 안은 ID 사전순이다 (UI-8x90 §4.1). 투영이 실어 주는 순서는 서버
  // `blocked_by` 배열 순서·겹침 판정 순서라 카드마다 달라지므로, 같은 칩 집합이
  // 언제나 같은 자리에 서도록 여기서 한 번 정렬한다. `released`만 예외로 그
  // 스펙이 정한 `closed_at` 내림차순을 그대로 쓴다.
  const predecessors = byId(chips.predecessors);
  const released = Array.isArray(chips.released) ? chips.released : [];
  const dependents = byId(chips.dependents);
  const overlaps = byId(chips.overlaps);
  const scope_missing = chips.scope_missing === true;
  const armed_lane = chips.armed_lane || null;
  const has_primary =
    !!armed_lane ||
    predecessors.length > 0 ||
    dependents.length > 0 ||
    after_predecessors !== '';
  const has_secondary =
    released.length > 0 || overlaps.length > 0 || scope_missing;
  if (!has_primary && !has_secondary) {
    return '';
  }
  return html`${has_primary
    ? html`<div class="worker-deps worker-deps--primary">
        ${armed_lane
          ? html`<span
              class=${`worker-dep worker-dep--armed${armed_lane.orphan ? ' worker-dep--armed-orphan' : ''}`}
              title=${armed_lane.orphan
                ? '이 항목을 발차한 연결 레인이 없습니다 — 스케줄러는 계속 발차합니다'
                : '연결 레인이 이 항목을 발차했습니다 — 레포 자동 진행과 무관합니다'}
              >${armed_lane.orphan
                ? html`${armed_lane.label}<button
                      type="button"
                      class="worker-dep__label mon2-arm__release"
                      data-lane-id=${armed_lane.lane_id}
                    >
                      해제
                    </button>`
                : armed_lane.label}</span
            >`
          : ''}${predecessors.map((chip) =>
          openableChipTemplate(chip, 'pred')
        )}${after_predecessors}${dependents.map((chip) =>
          openableChipTemplate(chip, 'dependents')
        )}
      </div>`
    : ''}${has_secondary
    ? html`<div class="worker-deps worker-deps--secondary">
        ${released.map((chip) =>
          openableChipTemplate(chip, 'released')
        )}${overlaps.map((chip) =>
          openableChipTemplate(overlapAsChip(chip), 'overlap')
        )}${scope_missing
          ? html`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`
          : ''}
      </div>`
    : ''}`;
}

/**
 * The 이월 칩 줄 (UI-btj6 §3). 완료 카드의 bead에서 이월된 후속 하나마다 열리는
 * 칩 `이월 → <ID>` 하나이고, 클릭은 다른 열리는 칩 넷과 같은 이슈 상세 열기다
 * — 카드 위의 칩은 상태를 쓰지 않는다 (UI-8x90 §4.3).
 *
 * 자리는 슬롯 **4b 정보**다 (2026-08-25 카드 문법 §5.1 정정(UI-btj6)): 문답은
 * 4a `→ <ID>`와 같은 후속 관계지만, 완료 카드에서는 "지금 갈 수 있나"라는 행동에
 * 답하지 않는 관계 정보다. 색은 그래서 후속 칩(`--dependents`) 그대로 쓴다 —
 * 같은 관계에 새 색 토큰을 두면 어휘가 갈라진다. 재료가 없으면 줄 자체를 그리지
 * 않는다 (fail-quiet).
 *
 * `root_dir`는 그 행이 속한 저장소다. 후속은 원본 자식과 같은 rig에 만들어지므로
 * (이월 변환 스펙 §2) 완료 행의 저장소가 곧 후속의 저장소이고, 여러 레포를 한
 * 화면에 섞는 모니터에서 다른 레포의 상세를 열지 않게 하는 것이 그 값이다.
 *
 * @param {MiniItem['carried_to']} carried_to
 * @param {string} [root_dir]
 * @returns {import('lit-html').TemplateResult|''}
 */
export function carryoverChipsTemplate(carried_to, root_dir = '') {
  const ids = (Array.isArray(carried_to) ? carried_to : [])
    .filter((/** @type {unknown} */ id) => typeof id === 'string' && id !== '')
    .slice()
    .sort();
  if (ids.length === 0) {
    return '';
  }
  return html`<div class="worker-deps worker-deps--secondary">
    ${ids.map((id) =>
      openableChipTemplate(
        {
          id,
          label: `이월 → ${id}`,
          title: `이월된 후속 ${id} 열기`,
          openable: true,
          ...(root_dir ? { root_dir } : {})
        },
        'dependents'
      )
    )}
  </div>`;
}

/**
 * The `연결 n` 소속 칩 (UI-j92s §5.2a, 자리는 UI-8x90 §4.1). "어느 레인 소속인가"는
 * 레포·직렬 레인 칩과 같은 좌표이므로 슬롯 5 줄이 싣는다. 클릭은 그대로 그
 * 레인으로의 스크롤이다. 재료가 없으면 빈 문자열이다 (fail-quiet).
 *
 * @param {{ lane_id: string, label: string }|null|undefined} chip
 * @returns {import('lit-html').TemplateResult|''}
 */
export function crossLaneChipTemplate(chip) {
  if (!chip) {
    return '';
  }
  return html`<button
    type="button"
    class="worker-dep worker-dep--lane mon-lane__chip"
    data-lane-id=${chip.lane_id}
    title="이 연결 레인으로 이동"
  >
    ${chip.label}
  </button>`;
}

/**
 * The route 칩 하나 (UI-yrzu §7.1). 실행가능·대기·PR 대기·실행중 카드가 모두
 * 이 함수를 부르므로 route는 어디서나 같은 모양·같은 파생 규칙으로 읽힌다 —
 * 규칙이 카드마다 복제되면 한쪽은 반드시 낡는다. 재료가 없으면 빈 문자열이다
 * (fail-quiet).
 *
 * @param {MiniItem['workflow']} workflow
 * @returns {import('lit-html').TemplateResult|''}
 */
export function routeChipTemplate(workflow) {
  if (!workflow) {
    return '';
  }
  const chips = workflow.chips || {};
  const route = chips.route || workflow.route;
  const derived =
    chips.route_source === 'derived' || workflow.route_source === 'derived';
  if (!route) {
    return '';
  }
  return html`<span
    class="ctl-chip ctl-chip--route${derived ? ' is-derived' : ''}"
    title=${derived ? 'route 미핀 (metadata unset)' : 'route'}
    >${derived ? 'unset' : route}</span
  >`;
}

/**
 * The quick_fix self-review 칩 하나 (UI-r7or §5.1). 규칙은 하나다 — 영수증이
 * 있으면 칩이 있고, 칩의 상태가 그 영수증이 지금 본문과 맞는지를 말한다.
 * 부정(`리뷰 없음`)을 그리지 않는 이유는 실패 방향이다: 부정을 그리면 칩의
 * 부재가 "괜찮다"로 읽혀 판정 불가(`unknown`)가 그 안에 조용히 섞인다.
 * {@link routeChipTemplate}과 같이 카드마다 복제하지 않고 여기 하나를 부르므로
 * Worker 콘솔 후보와 모니터 실행가능이 같은 문장을 낸다. 근거는 `title`이
 * 말하되 상태 문장 하나와 `missing` 목록뿐이다 — 영수증 문자열은 모니터 행이
 * 싣지 않으므로 넣으면 두 레인이 갈린다 (§5.4). 판정이 없거나 표시 대상이
 * 아니면 빈 문자열이다 (fail-quiet).
 *
 * 칩은 버튼이다 (UI-8x90 §4.5): 클릭하면 판정 사유 팝업이 열린다. `title`
 * 툴팁은 그대로 남는다 — 마우스 사용자는 팝업 없이도 읽는다.
 *
 * @param {MiniItem['workflow']} workflow
 * @param {boolean} [open] - 사유 팝업이 지금 이 카드에서 이 칩 아래에 펼쳐져
 * 있는지. `aria-expanded`가 되는 값이다.
 * @returns {import('lit-html').TemplateResult|''}
 */
export function quickFixReviewChipTemplate(workflow, open = false) {
  const review = workflow ? workflow.quick_fix_review : null;
  if (!review) {
    return '';
  }
  const state = review.state;
  if (state !== 'reviewed' && state !== 'stale') {
    return '';
  }
  const missing = Array.isArray(review.missing) ? review.missing : [];
  const title = [
    state === 'reviewed'
      ? 'quick_fix self-review 영수증이 지금 본문과 일치합니다'
      : 'quick_fix self-review 영수증이 지금 본문과 다릅니다',
    ...missing
  ].join('\n');
  return html`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${state}"
    data-chip-key="qfr"
    aria-expanded=${open ? 'true' : 'false'}
    title=${title}
  >
    ${state === 'reviewed' ? '리뷰 ✓' : '리뷰 stale'}
  </button>`;
}

/**
 * The 출처 칩 하나 — `discovered-from` 간선의 원본 bead. Board 카드가 이미 같은
 * 문장(`↩ from <id>`)을 쓰므로 두 탭에서 같은 사실이 같은 모양으로 읽힌다.
 * {@link routeChipTemplate}과 같은 이유로 카드마다 복제하지 않고 여기 하나를
 * 부른다. 클릭은 위임 처리다: 워커 콘솔의 다른 칩들과 같이 `data-from-id`만
 * 싣고, 이동은 뷰의 click 핸들러가 소유한다. 재료가 없으면 빈 문자열이다
 * (fail-quiet).
 *
 * @param {MiniItem['from_id']} from_id
 * @returns {import('lit-html').TemplateResult|''}
 */
export function fromChipTemplate(from_id) {
  if (!from_id) {
    return '';
  }
  return html`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${from_id}
    title=${`출처 ${from_id} 열기`}
  >
    ↩ from ${from_id}
  </button>`;
}

/**
 * `복잡` chip (UI-sbum §3): the workflow judged this bead complex enough to
 * recommend a different execution setting. 클릭은 어디서나 사유 팝업이고, 적용은
 * 실행 설정 편집기에서 사용자가 수동으로 한다 (UI-8x90 §4.5) — 카드 위의 칩은
 * 상태를 쓰지 않는다.
 *
 * One chip, never a model or runtime name: the recommendation's WHY and whether
 * it is applied live in the tooltip, which every surface shares so one judgement
 * never reads two ways.
 *
 * @param {import('../../utils/rec-settings.js').RecSettings|null|undefined} rec
 * @param {boolean} [open] - 사유 팝업이 지금 이 카드에서 이 칩 아래에 펼쳐져
 * 있는지. `aria-expanded`가 되는 값이다.
 * @returns {import('lit-html').TemplateResult|''}
 */
export function recChipTemplate(rec, open = false) {
  if (!rec) {
    return '';
  }
  return html`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__rec"
    data-chip-key="rec"
    data-state=${rec.state}
    aria-expanded=${open ? 'true' : 'false'}
    title=${recTooltip(rec)}
  >
    ${REC_LABEL}
  </button>`;
}

/**
 * `badge` 등급 코드 하나가 무엇을 뜻하는지 (UI-h6t1 §4.3 표). 계약이 등급을
 * 소유하므로 여기 없는 코드는 코드 문자열 그대로 읽힌다 — 계약이 자란 코드를
 * 이 표가 삼키면 새 잔여가 화면에서 사라진다.
 *
 * @type {Record<string, string>}
 */
const RECEIPT_BADGE_TEXT = {
  absent: '실행 영수증이 기록되지 않았다 — 과거 Bead·외부 경로 PR은 원래 없다',
  unparsable:
    '영수증 값을 읽을 수 없다 — 40hex SHA나 `delegated:`/`main:` 형식이 아니다',
  effort_unknown:
    'effort 토큰이 harness 어휘 밖이다 — 모델·SHA·unit은 유효하다',
  main_reason_retired:
    '`main:` 사유가 고정 4토큰(bead·quick_fix_default·phase_line·takeover) 밖이다',
  main_receipt_unbacked:
    '`main:` 사유를 뒷받침하는 메타데이터(impl_dispatch·route·planned_execution·quick_fix 기본 dispatch)가 없다',
  takeover_lineage_missing:
    '`main:takeover`인데 resolved 모델과 일치하는 완료된 위임 세션이 없다',
  takeover_lineage_unobservable:
    '`main:takeover`인데 위임 계보를 모니터가 볼 수 없다(Codex 밖 런타임)'
};

/**
 * The 실행 영수증 회계 잔여 칩 하나 (UI-h6t1 §4.3). 슬롯 5(좌표·실행 사실)에
 * 서는 이유는 계약이 이 등급을 "행동을 바꾸지 않는 회계 잔여"로 못박았기
 * 때문이다 — 머지를 잠그는 `hold`는 그대로 슬롯 1 상태 뱃지다. 재료가 없으면 빈
 * 문자열이다 (fail-quiet).
 *
 * 라벨은 첫 코드 하나만 싣는다: 좁은 레인에서 코드 일곱을 늘어놓으면 이 줄이
 * 제목을 밀어내고, 나머지는 `title`과 사유 팝업이 전부 말한다.
 *
 * @param {MiniItem} item
 * @param {boolean} [open] - 사유 팝업이 지금 이 카드에서 이 칩 아래에 펼쳐져
 * 있는지. `aria-expanded`가 되는 값이다.
 * @returns {import('lit-html').TemplateResult|''}
 */
export function receiptBadgeChipTemplate(item, open = false) {
  const codes = receiptBadgeCodesOf(item);
  if (codes.length === 0) {
    return '';
  }
  const label =
    codes.length > 1
      ? `영수증 · ${codes[0]} +${codes.length - 1}`
      : `영수증 · ${codes[0]}`;
  return html`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__receipt"
    data-chip-key="receipt"
    data-bead-id=${item.id}
    aria-expanded=${open ? 'true' : 'false'}
    title=${codes.join(', ')}
  >
    ${label}
  </button>`;
}

/**
 * @param {MiniItem} item
 * @returns {string[]}
 */
function receiptBadgeCodesOf(item) {
  const codes = item.receipt_badge ? item.receipt_badge.codes : null;
  return Array.isArray(codes)
    ? codes.filter((code) => typeof code === 'string' && code.length > 0)
    : [];
}

/**
 * The PR 링크 하나 — `#<n> ↗`. PR 대기 행·카드형 행·완료 행이 모두 이것을
 * 부르므로, "이 bead가 어느 PR인가"는 어느 레인에서 읽어도 같은 모양이다
 * (스펙 §5.1 슬롯 1). 번호나 URL 중 하나라도 없으면 빈 문자열이다
 * (fail-quiet) — 링크 없는 `#?`는 열 곳이 없어 아무 질문에도 답하지 않는다.
 *
 * @param {string|undefined} pr_url
 * @param {number|null|undefined} pr_number
 * @returns {import('lit-html').TemplateResult|''}
 */
export function prLinkTemplate(pr_url, pr_number) {
  if (!pr_url || typeof pr_number !== 'number') {
    return '';
  }
  return html`<a
    class="worker-mini__pr"
    href=${pr_url}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${pr_number} ↗</a
  >`;
}

/**
 * The 우선순위 배지 하나 — Board 카드의 `P<n>`과 같은 문장, 같은 모양이다. 워커
 * 콘솔은 레인이 곧 순서라서 "먼저 볼 것"이 행 안에 적혀 있지 않으면 매번 Board로
 * 건너가 확인해야 했다. {@link routeChipTemplate}·{@link fromChipTemplate}과 같은
 * 이유로 카드마다 복제하지 않고 여기 하나를 부른다. 숫자가 아니면 빈 문자열이다
 * (fail-quiet).
 *
 * @param {MiniItem['priority']} priority
 * @returns {import('lit-html').TemplateResult|''}
 */
export function priorityBadgeTemplate(priority) {
  if (typeof priority !== 'number' || !Number.isFinite(priority)) {
    return '';
  }
  const level = Math.max(0, Math.min(4, Math.trunc(priority)));
  return html`<span class="worker-pri" title=${`우선순위 P${level}`}
    >P${level}</span
  >`;
}

/**
 * @typedef {Object} MiniItem
 * @property {string} id - Bead id.
 * @property {string} title - Bead title (falls back to id).
 * @property {string} [reason] - Candidate reason chip (missing_description /
 * spec 없음 / 🔒 target).
 * @property {boolean} draggable - Whether this row can be dragged. 후보 카드는
 * 언제나 `false`다 (UI-d13v §6): 후보 레인은 드래그 소스도 드롭 대상도 아니고,
 * 이 값은 DOM `draggable` 속성과 `worker-card--static`/grip 판정에만 남는다.
 * @property {boolean} [queue_placeable] - 후보 카드를 대기·직렬 레인에 넣을 수
 * 있다 (UI-d13v §6). 배치 메뉴 열림·`[대기로 ↴]` 자격이 읽는 값이며, 예전에
 * `draggable`이 지던 자격을 그대로 물려받는다 — 드래그가 사라져도 무엇을 막는지는
 * 같아야 한다. 후보 카드 외의 행은 싣지 않는다.
 * @property {'candidate'|'queue'|'running'|'runnable'|'pr_wait'|'done'|'s1'|'s2'|'s3'|'s4'|'s5'} lane -
 * Owning lane. `running`/`runnable` exist only for the monitor tab, which mixes
 * every repo into five lanes (UI-qrfo §8); the Worker console never sets them.
 * `s1`..`s5` are the fixed serial waiting lanes (UI-04vo §1).
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
 * @property {string|null} [log_path] - 완료 실패가 남긴 로그 파일의 절대 경로
 * (UI-8w4t §4). 슬롯 5 (좌표·실행 사실)에 `<code>` + 복사 버튼으로 서고, 실행 전
 * 실패라 로그가 없으면 요소 자체가 없다.
 * @property {string[]} [badges] - Gate / base-state badges (worker-phase2 §5).
 * @property {string|null} [live_badge] - Which of {@link MiniItem.badges}
 * reports live server activity rather than a settled state (UI-raqh §3); it is
 * drawn neutral with a breathing dot instead of the alert colour.
 * @property {boolean} [alert] - Whether the badges report a state needing a
 * human decision (PR closed, observation error) — rendered in the warn colour.
 * @property {boolean} [merge_action] - Render the [머지] action (`pr_wait` rows
 * only, worker-phase2 §6).
 * @property {boolean} [discard_action] - Render the [폐기] action.
 * @property {boolean} [resolve_action] - Render the [세션에서 해결] action
 * (UI-jw27 §4). 슬롯 6 액션 foot의 [정리 재시도] 옆에 서고, 재료(=기동 가능한
 * terminal 실패 행)가 없으면 필드도 없어 버튼 자체가 그려지지 않는다.
 * @property {boolean} [resolve_enabled] - Whether [세션에서 해결] may be
 * clicked; false while this row's own click is in flight.
 * @property {string} [resolve_title] - Tooltip: what the click starts.
 * @property {ReturnType<typeof discardProjection>} [discard] - Shared durable
 * discard eligibility, phase, error, archive, and PR-receipt projection.
 * @property {StaleWorkView|null} [stale_work] - Optional stale worktree action card.
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
 * @property {{ step?: string, label: string, index: number, total: number, percent: number, active?: boolean, failed?: boolean }|null} [merge_step] -
 * The merge's current step, when one is running (UI-raqh §4).
 * @property {string} [merge_title] - Tooltip: what the click is based on, or
 * why it is refused.
 * @property {(import('../board/stepper.js').WorkflowSummary & { route_source?: string, chips?: { route?: string, route_source?: string, exec_receipt?: import('../board/card.js').ExecReceipt|null }, quick_fix_review?: { state: 'reviewed'|'stale'|'unreviewed'|'unknown', missing: string[], digest: string|null } }) | null} [workflow] - Server-enriched workflow. 실행가능 카드는 stepper와 route
 * 칩을, 대기·PR 대기 행은 route 칩을 여기서 얻는다 (UI-yrzu §7.2).
 * `quick_fix_review`는 서버가 route pin이 `quick_fix`일 때만 붙이는 판정이며
 * (UI-r7or §4) 클라이언트는 읽어 그리기만 한다. 완료 행은 싣지 않는다.
 * @property {string} [status] - Issue status, for the stepper glow (candidate cards only).
 * @property {import('../../utils/token-usage.js').UsageRecord|import('../../utils/token-usage.js').UsageProjection|null} [usage] - Token usage
 * summed across the bead's attempts (UI-d7pw §1); absent/null renders nothing.
 * @property {number|null} [work_ms] - 완료 행의 작업 시간; absent/null renders
 * nothing. 무엇을 잰 값인지는 `work_kind`가 말한다.
 * @property {'attempt'|'session'} [work_kind] - `work_ms`가 잰 구간. 기본은
 * attempt 실행 시간 합산이고, 세션 작업 행만 `session`(in_progress~close 경과)이다.
 * @property {number|string} [created_at] - Bead 생성 시각 (UI-d7pw §4).
 * @property {number|string} [updated_at] - Bead 수정 시각 (UI-d7pw §4).
 * @property {number} [done_at] - 완료 레인 진입 시각 = 완료 시각 (UI-rkly §3).
 * @property {boolean} [ghost] - Serial-lane occupancy row (UI-04vo §4): the
 * lineage holding the lane, drawn dimmed and never draggable.
 * @property {number} [seq] - 1-based execution order number in a serial lane.
 * @property {import('../../utils/exec-settings-chip.js').ExecChips|null} [exec_chips] -
 * 실행 설정 칩 (worker-card-exec-chips §2.2): 대기 행과 후보 카드가 "이 설정으로
 * 돌아간다"를 적재 전에 미리 보여 준다. 완료 행·PR 대기 행은 싣지 않는다.
 * @property {DependencyChips|null} [dependency_chips] - 슬롯 4 두 줄의 의존·
 * 정보 칩 (UI-eey2 §5.1, 두 줄은 UI-8x90 §4.1).
 * @property {{ lane_id: string, label: string }|null} [cross_lane_chip] -
 * `연결 n` 소속 칩 (UI-j92s §5.2a). 슬롯 5 재료이므로 다른 좌표 칩
 * (`route`·`from_id`·`exec_chips`)과 같이 항목 최상위 필드다 (UI-8x90 §4.2).
 * @property {{ chip_key: string, content: import('../chip-popover.js').ChipPopoverContent }|null} [chip_popover] -
 * 이 카드에서 열려 있는 판정 칩 사유 팝업 (UI-8x90 §4.5). 열림 상태는 뷰가
 * 소유하고 (`app/views/chip-popover.js`), 템플릿은 어느 칩 아래에 무엇을 그릴지만
 * 읽는다.
 * @property {'three_line'} [done_layout] - 완료 행 변형 (UI-eey2 §8). The
 * monitor's done row carries a repo badge as well, which squeezes the two-line
 * variant's title down to a few characters, so the title moves onto its own
 * line. Absent keeps the two-line variant.
 * @property {boolean} [exec_chips_pinned] - Whether {@link MiniItem.exec_chips}
 * are ISSUE PINS differing from the repo default (UI-eey2 §5) rather than the
 * resolved settings — drawn in the pin colour.
 * @property {boolean} [worker_ineligible] - Candidate carries the
 * `worker-ineligible` label (UI-8881). Observation-only: the card is shaded,
 * wears the ⛔ chip, and refuses drag and queue placement. The candidate
 * projection computes it once; the template never re-reads label strings.
 * @property {boolean} [session_preferred] - Candidate carries a VALID
 * `session-preferred` attachment (UI-49mc §4.4): 워커로 돌릴 수는 있지만 세션이
 * 낫다는 advisory. 투영이 `worker_ineligible` 우선순위를 이미 접었으므로 템플릿은
 * 다시 판정하지 않고, 실행 자격·drag·적재는 건드리지 않는다.
 * @property {string} [session_preferred_reason] - 계약 enum 안의 사유. 칩 툴팁
 * 문구의 키이며, enum 밖 값은 투영에 도달하기 전에 걸러진다.
 * @property {string[]} [blocked_by] - 지금 이 bead를 막는 선행 ID들. 칩은
 * `dependency_chips.predecessors`가 그리고, 여기 배열은 판정 팝업의 문장이
 * 읽는다.
 * @property {boolean} [spec_after_blocker] - 선행의 결과가 이 bead의 설계
 * 전제라 spec까지 선행 뒤로 미룬다 (UI-svh6 §4.2). 투영이 `spec-after-blocker`
 * 라벨과 지금의 blocker를 함께 읽어 접은 값이며, 자격·drag·적재 어디에도 들어가지
 * 않는다.
 * @property {import('../../utils/rec-settings.js').RecSettings|null} [rec] -
 * 복잡 판정 (UI-sbum §3): 워크플로가 이 bead에 다른 실행 설정을 추천했다는 사실
 * 하나. 표시 전용이고 자격·drag·적재 어디에도 들어가지 않는다. `null`/생략은
 * 추천 없음이다.
 * @property {{ codes: string[] }} [receipt_badge] - 실행 영수증 회계 잔여
 * (UI-h6t1 §4.3): dotfiles 계약이 `badge` 등급으로 확정한 코드들이다. 머지
 * 판정을 바꾸지 않으므로 슬롯 5 판정 칩 하나로만 선다. 코드가 없으면 필드도
 * 없다.
 * @property {string} [from_id] - Origin bead of a `discovered-from` edge.
 * @property {string[]} [carried_to] - 이 bead에서 이월된 후속 ID들 (UI-btj6 §3).
 * 투영이 `carried_from` metadata와 이 bead를 가리키는 `blocks` 간선만으로 접은
 * 값이며, 완료 행만 싣는다. 칩은 {@link carryoverChipsTemplate}이 슬롯 4b에
 * 그리고, 재료가 없으면 필드도 없다.
 * @property {number} [priority] - Bead 우선순위 0..4. 숫자가 아니면 배지를
 * 그리지 않는다.
 */

/**
 * The 완료 3줄 행 (UI-eey2 §8): 레포 배지 · ID · 완료 시각 / 제목 / 토큰 · 작업.
 *
 * A separate builder rather than a branch inside {@link miniRow}: the monitor's
 * done row is the only row that needs it, and rebuilding miniRow's ternary
 * chain around it would rewrite the Worker console's rows for no reason.
 *
 * @param {MiniItem} item
 * @returns {import('lit-html').TemplateResult}
 */
function doneThreeLineRow(item) {
  const badges = Array.isArray(item.badges) ? item.badges : [];
  const provider_badges = providerUsageBadges(item.usage);
  const usage_label = formatUsageTotalWithCost(item.usage);
  const done_at_label = formatRelativeTime(item.done_at);
  return html`<div
    class="worker-mini worker-mini--static worker-mini--done worker-mini--three-line"
    draggable="false"
    data-bead-id=${item.id}
    data-lane=${item.lane}
  >
    <div class="worker-mini__row1">
      ${item.workspace_name
        ? html`<span class="worker-mini__repo" title=${item.root_dir || ''}
            >${item.workspace_name}</span
          >`
        : ''}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${item.id}</span>
      ${prLinkTemplate(item.pr_url, item.pr_number)}${done_at_label
        ? html`<span
            class="worker-mini__done-at"
            title=${`완료 ${formatTimestampLocal(item.done_at)}`}
            >완료 ${done_at_label}</span
          >`
        : ''}
      ${badges.map(
        (b) =>
          html`<span
            class="worker-mini__badge${item.alert
              ? ' worker-mini__badge--alert'
              : ''}"
            >${b}</span
          >`
      )}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${item.title}</span>
    </div>
    ${carryoverChipsTemplate(item.carried_to, item.root_dir)}
    <div class="worker-mini__row3">
      ${provider_badges.length > 0
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
          : ''}
      ${typeof item.work_ms === 'number'
        ? html`<span
            class="worker-mini__work"
            title=${workTooltip(item.work_kind)}
            >작업 ${formatElapsed(item.work_ms)}</span
          >`
        : ''}
    </div>
  </div>`;
}

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
 * `options.actions` (UI-5ksp §4.6)는 행 1번 줄 조작 슬롯 끝에 서는 호출 측
 * 조각이다 (Monitor의 ⛓ ↑ ↓ ✕). 행 밖 별도 줄이던 자리를 옮긴 것이므로 슬롯
 * 표(UI-251y §5.1)의 "조작은 1번 줄 오른쪽 끝" 규칙을 그대로 따른다. 넘기지
 * 않으면 렌더가 그대로다.
 *
 * @param {MiniItem} item
 * @param {{ actions?: import('lit-html').TemplateResult }} [options]
 * @returns {import('lit-html').TemplateResult}
 */
export function miniRow(item, options = {}) {
  if (item.lane === 'done' && item.done_layout === 'three_line') {
    return doneThreeLineRow(item);
  }
  const draggable = item.draggable && !item.done;
  const badges = Array.isArray(item.badges) ? item.badges : [];
  const provider_badges = providerUsageBadges(item.usage);
  const usage_label = formatUsageTotalWithCost(item.usage);
  const merging = item.merge_step || null;
  const card =
    item.lane === 'pr_wait' || !!item.revise_action || !!item.stale_work;
  // 완료 행은 2줄이다 (UI-rkly §3): 제목이 가로 전체를 쓰는 1줄과, 나머지 사실을
  // 전부 받는 2줄. 한 줄에 usage까지 실으면 제목이 먼저 잘린다.
  const two_line = item.lane === 'done' && !card;
  const done_at_label = two_line ? formatRelativeTime(item.done_at) : '';
  // 장식 핸들이다: 드래그는 행 전체(`.worker-mini[draggable="true"]`)에서
  // 시작하고, 인터랙티브 자식 제외는 드래그 컨트롤러가 판정한다.
  const grip = draggable
    ? html`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`
    : '';
  // 직렬 레인 실행 순번 (UI-04vo §4).
  const seq_el =
    typeof item.seq === 'number'
      ? html`<span class="worker-mini__seq" aria-hidden="true"
          >${item.seq}</span
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
  // route 칩은 좌표 칩 줄이 싣는다 (UI-251y §2) — 완료 행만 제외한다: 끝난
  // 일의 route는 더 이상 어떤 결정도 바꾸지 않는다.
  const route_el = item.lane === 'done' ? '' : routeChipTemplate(item.workflow);
  // 출처 칩도 완료 행에서는 빠진다 — route 칩과 같은 이유다. 끝난 일에서 남는
  // 질문은 "무엇이 끝났나"뿐이라 ID와 제목이면 충분하고, 좁은 화면에서 칩이
  // 가져가는 가로는 그대로 제목이 잃는 가로다.
  const from_el = item.lane === 'done' ? '' : fromChipTemplate(item.from_id);
  // 우선순위는 ID 바로 다음이다 — Board 카드와 같은 자리, 같은 문장.
  const pri_el = priorityBadgeTemplate(item.priority);
  const title_el = html`<span class="worker-mini__title">${item.title}</span>`;
  const pr_el = prLinkTemplate(item.pr_url, item.pr_number);
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
      html`<span
        class="merge-step${merging.failed ? ' merge-step--failed' : ''}"
        style=${`--progress: ${merging.percent}%`}
        >${merging.label}${merging.index > 0
          ? html`<span class="merge-step__n"
              >${merging.index}/${merging.total}</span
            >`
          : ''}</span
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
  // [세션에서 해결] (UI-jw27 §4). 같은 액션 foot의 [정리 재시도] 다음 자리다 —
  // 둘은 같은 실패 행이 내는 두 출구이고, 재시도가 먼저 읽혀야 한다. 이 버튼은
  // 아무것도 되돌리지 않으므로 [폐기]보다 앞에 선다.
  const resolve_el = item.resolve_action
    ? html`<button
        type="button"
        class="worker-mini__resolve"
        data-bead-id=${item.id}
        ?disabled=${item.resolve_enabled === false}
        title=${item.resolve_title ||
        '실패한 작업을 이어받는 대화형 세션을 띄웁니다 (기록된 세션이 있으면 fork)'}
      >
        세션에서 해결
      </button>`
    : '';
  const stale_work = item.stale_work || null;
  const stale_els = stale_work
    ? html`${stale_work.can_resume || stale_work.can_continue
        ? html`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${item.id}
            data-action-id=${stale_work.action_id}
            ?disabled=${stale_work.locked}
          >
            기존 작업 이어가기
          </button>`
        : ''}${stale_work.can_backup_fresh
        ? html`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${item.id}
            data-action-id=${stale_work.action_id}
            ?disabled=${stale_work.locked}
          >
            백업 후 새로 시작
          </button>`
        : ''}${stale_work.can_recheck
        ? html`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${item.id}
            data-action-id=${stale_work.action_id}
            ?disabled=${stale_work.locked}
          >
            다시 확인
          </button>`
        : ''}`
    : '';
  const stale_details = stale_work
    ? html`<div class="worker-mini__stale">
        <strong>${stale_work.title}</strong>
        <span>${stale_work.summary}</span>
        <span>${stale_work.cause}</span>
        ${stale_work.can_backup_fresh
          ? html`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`
          : ''}
      </div>`
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
  // 실행 설정 칩은 대기 행만 얻는다 (§4): PR 대기 행은 이미 실행이 끝났고
  // 완료 행은 2줄 변형이라 실을 자리가 없다.
  const has_exec_chips = !!(
    item.lane !== 'pr_wait' &&
    !item.done &&
    item.exec_chips &&
    (item.exec_chips.orchestration || item.exec_chips.worker)
  );
  // 슬롯 5 줄 (UI-251y §2·§3.5): 좌표 칩 → exec 칩 → usage 하나를 공유한다.
  // 판정은 그 줄의 재료 전부로 한다 — 좌표·exec만 세면 usage만 있는 행에서
  // 지금 보이는 정보가 사라진다. 재료가 하나도 없으면 줄 자체를 그리지 않는다
  // (빈 div는 행에 여백만 남긴다).
  const rec_el = recChipTemplate(item.rec, chipOpen(item, 'rec'));
  // 영수증 회계 잔여도 슬롯 5다 (UI-h6t1 §4.1): 같은 줄의 `exec_receipt`·실패
  // 로그 경로와 짝이라 "그 실행이 어디서 무엇으로 일어났고 그 기록이 얼마나
  // 성립하는지"를 한 줄이 답한다.
  const receipt_badge_el = receiptBadgeChipTemplate(
    item,
    chipOpen(item, 'receipt')
  );
  // 소속 칩은 슬롯 5의 좌표 칩이다 (UI-8x90 §4.1): 레포 다음, route 앞.
  const cross_lane_el = crossLaneChipTemplate(item.cross_lane_chip);
  // 실패 로그 경로도 슬롯 5다 (UI-251y §5.1 정정, UI-8w4t §4): "어느 경로의
  // 것인가"는 이 줄이 답하는 질문이고, 복사 버튼은 값에 붙은 어포던스일 뿐
  // 카드의 처분을 바꾸지 않는다. 타임라인 `세부`와 같은 템플릿·같은 토스트를
  // 쓰므로 두 표면이 같은 값을 다르게 다루지 않는다. 재료가 없으면 없다.
  const log_path_el = logPathTemplate(item.log_path);
  const chips_el =
    repo_el ||
    cross_lane_el ||
    route_el ||
    from_el ||
    has_exec_chips ||
    rec_el ||
    receipt_badge_el ||
    usage_el ||
    log_path_el
      ? html`<div class="worker-chips">
          ${repo_el}${cross_lane_el}${route_el}${from_el}${has_exec_chips
            ? execChipsTemplate(item.exec_chips, {
                pin: item.exec_chips_pinned === true
              })
            : ''}${rec_el}${receipt_badge_el}${usage_el}${log_path_el}${judgementPopover(
            item
          )}
        </div>`
      : '';
  const deps_el = dependencyChipsTemplate(item.dependency_chips);
  const receipt_el = discardReceiptTemplate(item);
  const actions_el = options.actions ? options.actions : '';
  const has_foot = !!(
    merging ||
    item.merge_action ||
    item.cancel_action ||
    item.resolve_action ||
    item.discard_action ||
    discard?.operation ||
    item.revise_action ||
    stale_work
  );
  return html`<div
    class="worker-mini${card ? ' worker-mini--card' : ''}${draggable
      ? ''
      : ' worker-mini--static'}${item.done
      ? ' worker-mini--done'
      : ''}${item.ghost ? ' worker-mini--ghost' : ''}${merging
      ? ' worker-mini--merging'
      : ''}${merging?.failed ? ' worker-mini--merge-failed' : ''}${item.external
      ? ' worker-mini--external'
      : ''}"
    style=${merging ? `--progress: ${merging.percent}%` : ''}
    draggable=${draggable ? 'true' : 'false'}
    data-bead-id=${item.id}
    data-lane=${item.lane}
  >
    ${two_line
      ? html`<div class="worker-mini__row1">
            ${repo_el}${id_el}${pri_el}${from_el}${pr_el}${title_el}${actions_el}
          </div>
          ${carryoverChipsTemplate(item.carried_to, item.root_dir)}
          <div class="worker-mini__row2">
            ${usage_el}${done_at_label
              ? html`<span
                  class="worker-mini__done-at"
                  title=${`완료 ${formatTimestampLocal(item.done_at)}`}
                  >완료 ${done_at_label}</span
                >`
              : ''}${typeof item.work_ms === 'number'
              ? html`<span
                  class="worker-mini__work"
                  title=${workTooltip(item.work_kind)}
                  >작업 ${formatElapsed(item.work_ms)}</span
                >`
              : ''}${badge_els}${merge_step_el}
            <span class="worker-mini__actions"
              >${merge_el}${cancel_el}${resolve_el}${discard_el}</span
            >
            ${timesMeta(item)}
          </div>`
      : card
        ? html`<div class="worker-mini__head">
              ${grip}${seq_el}${id_el}${pri_el}${pr_el}${badge_els}${reason_el}${actions_el}
            </div>
            <div class="worker-mini__body">${title_el}${stale_details}</div>
            ${deps_el}${chips_el}${has_foot
              ? html`<div class="worker-mini__foot">
                  ${merge_step_el}
                  <span class="worker-mini__actions"
                    >${merge_el}${cancel_el}${resolve_el}${discard_el}${revise_els}${stale_els}</span
                  >
                  ${discardReceiptTemplate(item)}
                </div>`
              : ''}
            ${timesMeta(item)}`
        : // 한 줄 변형은 본문을 `__line`으로 감싸고 메타 줄을 형제로 붙인다
          // (UI-d7pw §4.1). 드래그 계약은 바깥 `.worker-mini`의
          // `data-bead-id`/`data-lane`에 걸려 있어 내부 재구성에 영향받지 않는다.
          html`<div class="worker-mini__line">
              ${grip}${seq_el}${id_el}${pri_el}${title_el}${pr_el}${badge_els}${reason_el}${merge_step_el}${merge_el}${cancel_el}${resolve_el}${discard_el}${actions_el}
            </div>
            ${deps_el}${chips_el}${receipt_el} ${timesMeta(item)}`}
  </div>`;
}

/**
 * One `[대기로 ↴]` menu entry (UI-j92s §6.4). `id`는 뷰가 해석하는 좌표 문자열
 * 이므로 여기서 어휘를 좁히지 않는다 — 모니터는 `lane:<lane_id>`처럼 서버 id를
 * 싣고, Worker 콘솔은 `parallel`·`s1`..`s5`를 싣는다.
 *
 * @typedef {Object} PlaceMenuEntry
 * @property {string} id - The coordinate a click hands back to the view.
 * @property {string} label - Text on the left of the row.
 * @property {number|null} [count] - Tally on the right. 없으면 자리 자체가 비어
 * 있다 (`+ 새 연결 레인`처럼 셀 것이 없는 항목).
 * @property {string} [group] - Group this entry belongs to. 앞 항목과 다르면 그
 * 자리에 그룹 헤더가 선다. 값이 없으면 헤더 없이 그린다 — Worker 콘솔은 그룹을
 * 쓰지 않는다 (§6.4).
 * @property {boolean} [disabled] - Refused entry: 레인 저장소를 읽을 수 없을 때의
 * 연결 항목 (§7).
 * @property {string} [title] - Tooltip sentence.
 */

/**
 * @typedef {{ bead_id: string, lanes: PlaceMenuEntry[] }} PlaceMenu
 */

/**
 * The `[대기로 ↴]` 메뉴 본문 (UI-j92s §6.4): 한 줄에 하나, 라벨 왼쪽·건수
 * 오른쪽인 **세로** 목록. 가로 스크롤 알약이던 예전 모양은 항목이 늘어날수록
 * 화면 밖으로 밀려나 모바일에서 유일한 적재 경로를 감췄다.
 *
 * @param {PlaceMenuEntry[]} entries
 * @param {string} bead_id
 * @returns {import('lit-html').TemplateResult}
 */
function placeMenuList(entries, bead_id) {
  /** @type {string|undefined} */
  let current_group = undefined;
  /** @type {Array<import('lit-html').TemplateResult>} */
  const rows = [];
  for (const entry of entries) {
    const group = entry.group || '';
    if (group.length > 0 && group !== current_group) {
      rows.push(html`<div class="worker-card__place-group">${group}</div>`);
    }
    current_group = group;
    rows.push(
      html`<button
        type="button"
        class="worker-card__place-lane${group.length > 0
          ? ' worker-card__place-lane--nested'
          : ''}"
        data-bead-id=${bead_id}
        data-lane=${entry.id}
        ?disabled=${entry.disabled === true}
        title=${entry.title || `${entry.label} 대기 맨 뒤에 추가`}
      >
        <span>${entry.label}</span>
        ${typeof entry.count === 'number'
          ? html`<span class="worker-card__place-count">${entry.count}</span>`
          : ''}
      </button>`
    );
  }
  return html`${rows}`;
}

/**
 * `session_preferred_reason` → 칩 툴팁 문구 (UI-49mc §4.2). enum 밖 사유는 투영
 * 술어가 이미 걸러내므로 여기 닿지 않고, 매핑이 비면 툴팁 없이 칩만 그린다.
 *
 * @type {Record<string, string>}
 */
const SESSION_PREFERRED_TOOLTIP = {
  external_roundtrip:
    '하네스 밖 상대와 예측 불가 왕복 반복 — 다른 rig 세션·사람·외부 시스템',
  user_feedback_loop:
    '진행 중 사용자 피드백 없이는 품질이 낮음 — 문안·설계 세부·방향 선택'
};

/**
 * The 판정 칩 keys (UI-8x90 §4.5, UI-svh6 §4.3). `data-chip-key` carries them
 * into the DOM so one click handler per tab covers every surface.
 *
 * @typedef {'rec'|'receipt'|'session_preferred'|'ineligible'|'qfr'|'spec_after_blocker'} JudgementChipKey
 */

/**
 * One 판정 칩's 사유 팝업 내용 (UI-8x90 §4.5 표). 두 탭과 이슈 상세가 같은
 * 함수를 부르므로 같은 판정이 어디서나 같은 문장으로 읽힌다. 재료가 없으면
 * `null`이고 그 칩에는 팝업이 열리지 않는다 (fail-quiet).
 *
 * @param {MiniItem} item
 * @param {string} chip_key
 * @returns {import('../chip-popover.js').ChipPopoverContent|null}
 */
export function judgementPopoverContent(item, chip_key) {
  if (chip_key === 'rec') {
    const rec = item.rec;
    if (!rec) {
      return null;
    }
    const state_text = REC_STATE_TEXT[rec.state] || '';
    return {
      title: '복잡한 작업으로 판정됨',
      lines: [
        ...recReasonSentences(rec),
        ...(state_text.length > 0 ? [`상태: ${state_text}`] : []),
        '적용은 이슈 상세의 실행 설정 편집기에서'
      ]
    };
  }
  if (chip_key === 'session_preferred') {
    if (item.session_preferred !== true) {
      return null;
    }
    const reason =
      SESSION_PREFERRED_TOOLTIP[item.session_preferred_reason || ''] || '';
    return {
      title: '워커로 돌릴 수 있지만 세션이 낫다',
      lines: reason.length > 0 ? [reason] : []
    };
  }
  if (chip_key === 'ineligible') {
    if (item.worker_ineligible !== true) {
      return null;
    }
    return {
      title: '워커 실행 대상이 아니다',
      lines: [
        'worker-ineligible 라벨이 붙어 있다 — 라벨은 이슈 상세의 라벨 절에서 뗀다'
      ]
    };
  }
  if (chip_key === 'spec_after_blocker') {
    if (item.spec_after_blocker !== true) {
      return null;
    }
    const blockers = Array.isArray(item.blocked_by) ? item.blocked_by : [];
    return {
      title: '선행 결과가 설계 전제 — 스펙도 선행 뒤에',
      lines: [
        `선행: ${blockers.join(' · ')}`,
        '선행이 닫히면 이 표시는 저절로 사라진다 — 라벨은 이슈 상세의 라벨 절에서 뗀다'
      ]
    };
  }
  if (chip_key === 'receipt') {
    const codes = receiptBadgeCodesOf(item);
    if (codes.length === 0) {
      return null;
    }
    return {
      title: '실행 영수증 회계 잔여 — 머지는 진행',
      lines: [
        ...codes.map((code) => RECEIPT_BADGE_TEXT[code] || code),
        '자동 머지 판정에는 영향이 없다 — 정정은 bd update --set-metadata exec_receipt=… 로'
      ]
    };
  }
  if (chip_key === 'qfr') {
    const review = item.workflow ? item.workflow.quick_fix_review : null;
    if (!review || (review.state !== 'reviewed' && review.state !== 'stale')) {
      return null;
    }
    const missing = Array.isArray(review.missing) ? review.missing : [];
    return {
      title:
        review.state === 'reviewed'
          ? 'quick_fix self-review 영수증이 지금 본문과 일치합니다'
          : 'quick_fix self-review 영수증이 지금 본문과 다릅니다',
      lines: missing.length > 0 ? missing : ['빠진 항목 없음']
    };
  }
  return null;
}

/**
 * The keys, in the order a card would read them (UI-8x90 §4.5) — 머리줄 넷이
 * 먼저고 슬롯 4a의 `스펙 대기`가 그 아래다. 한 카드에 두 팝업이 동시에 열리지
 * 않으므로 첫 열림 하나만 찾으면 된다.
 *
 * @type {ReadonlyArray<string>}
 */
export const JUDGEMENT_CHIP_KEYS = [
  'rec',
  'receipt',
  'session_preferred',
  'ineligible',
  'qfr',
  'spec_after_blocker'
];

/**
 * The 판정 팝업 material open on this card, or `null` (UI-8x90 §4.5). 두 탭이
 * 같은 함수를 부르므로 열림 판정만 넘겨받는다 — 열림 상태는 뷰의
 * `createChipPopover`가 소유한다.
 *
 * @param {MiniItem} item
 * @param {(chip_key: string) => boolean} isOpen
 * @returns {{ chip_key: string, content: import('../chip-popover.js').ChipPopoverContent }|null}
 */
export function judgementPopoverOf(item, isOpen) {
  for (const chip_key of JUDGEMENT_CHIP_KEYS) {
    if (!isOpen(chip_key)) {
      continue;
    }
    const content = judgementPopoverContent(item, chip_key);
    return content ? { chip_key, content } : null;
  }
  return null;
}

/**
 * The 판정 팝업 open on one card, or an empty string (UI-8x90 §5). 위치는 그
 * 칩이 선 줄이므로 호출 자리가 그 줄 안에 둔다.
 *
 * @param {MiniItem} item
 * @returns {import('lit-html').TemplateResult|''}
 */
function judgementPopover(item) {
  return item.chip_popover
    ? chipPopoverTemplate(item.chip_popover.content)
    : '';
}

/**
 * Whether that 판정 칩 is the one open on this card (UI-8x90 §4.5).
 *
 * @param {MiniItem} item
 * @param {string} chip_key
 * @returns {boolean}
 */
function chipOpen(item, chip_key) {
  return !!item.chip_popover && item.chip_popover.chip_key === chip_key;
}

/**
 * 사용자 결정 대기 파킹의 사유 파트 접두사 (UI-dqg9 §2.2). 투영(`worker/index.js`)이
 * 뒤에 계약 값을 붙여 `item.reason`에 싣고, 여기 place 버튼 title이 그 파트를
 * 접두사로 되읽는다 — `missing_description`과 같은 관용이되, 값이 가변이라
 * 완전일치 대신 접두사로 맞춘다.
 *
 * @type {string}
 */
export const AWAITING_USER_REASON_PREFIX = '사용자 리뷰 필요';

/**
 * One candidate `.worker-card` (spec §2, mockup 변형 B). Richer than
 * {@link miniRow}: a route chip + the Board's route-driven stepper. It keeps
 * miniRow's row contract (`draggable` / `data-bead-id` / `data-lane`), but the
 * Worker console's candidate projection pins `draggable` to false (UI-d13v §6)
 * and hands placement eligibility over in `queue_placeable`. An issue without
 * `workflow` (inactive workspace) renders without the chip/stepper and never
 * throws.
 *
 * `exec_chips_mode` (UI-eey2 §5) says what this card's exec chips MEAN.
 * `always` — the Worker console's contract, unchanged — draws the resolved
 * settings. `pinned_only` says the caller has already filtered them down to the
 * issue pins that differ from the repo default, so they are drawn in the pin
 * colour with the pin tooltip; the card never decides that itself, because only
 * the caller knows the repo's defaults.
 *
 * 슬롯 1 조작(`.worker-card__head-actions`)은 지금 재료가 없어 그리지 않는다
 * (UI-lx45 §5): UI-j92s가 그 자리에 두었던 `⛓ 의존성` 버튼은 편집이 이슈 상세
 * `의존성` 절로 옮겨 가며 사라졌다.
 *
 * @param {MiniItem} item
 * @param {PlaceMenu|null} [place_menu]
 * @param {{ exec_chips_mode?: 'always'|'pinned_only', onOpenDoc?: import('../board/stepper.js').OpenDocHandler }} [options]
 * @returns {import('lit-html').TemplateResult}
 */
export function candidateCard(item, place_menu = null, options = {}) {
  // Observation-only rows (UI-8881) are refused here as well as by the
  // projection, so the card cannot become placeable through a caller that
  // forgot the conjunction.
  const worker_ineligible = item.worker_ineligible === true;
  const draggable = item.draggable && !item.done && !worker_ineligible;
  // 배치 자격은 드래그와 갈라졌다 (UI-d13v §6): 후보 카드는 드래그 소스가 아니게
  // 됐지만 대기 적재는 남으므로, 그 자격을 `draggable`에서 읽으면 주 경로가 통째로
  // 사라진다. 메뉴 열림과 `[대기로 ↴]`는 둘 다 이 값 하나를 읽는다.
  const queue_placeable =
    item.queue_placeable === true && !item.done && !worker_ineligible;
  const menu_open =
    queue_placeable && place_menu && place_menu.bead_id === item.id;
  // 계약상 `worker-ineligible`과 상호배타이므로 머리줄의 같은 자리 하나를 나눠
  // 쓴다 (UI-49mc §4.1). 우선순위는 투영이 이미 접었고, 이 라벨은 drag·적재·음영
  // 어디에도 입력되지 않는다.
  const session_preferred = item.session_preferred === true;
  const session_preferred_tooltip =
    SESSION_PREFERRED_TOOLTIP[item.session_preferred_reason || ''] || '';
  const workflow = item.workflow;
  const reason_parts =
    typeof item.reason === 'string' ? item.reason.split(' · ') : [];
  const missing_description = reason_parts.includes('missing_description');
  const awaiting_user = reason_parts.some((part) =>
    part.startsWith(AWAITING_USER_REASON_PREFIX)
  );
  const danger =
    typeof item.reason === 'string' && item.reason.startsWith('⛔');
  // 슬롯 4a의 판정 칩 (UI-svh6 §4.3). 팝업은 그 칩이 선 줄 아래에 열리므로
  // (UI-8x90 §5) 머리줄이 아니라 이 줄이 싣는다 — `.worker-deps`가 그 기준
  // 상자다.
  const spec_after_blocker_open = chipOpen(item, 'spec_after_blocker');
  const spec_after_blocker_el = specAfterBlockerChipTemplate(
    item.spec_after_blocker === true,
    spec_after_blocker_open
  );
  const deps_el = dependencyChipsTemplate(
    item.dependency_chips,
    spec_after_blocker_el === ''
      ? ''
      : html`${spec_after_blocker_el}${spec_after_blocker_open
          ? judgementPopover(item)
          : ''}`
  );
  // 좌표 칩은 정체성 줄이 아니라 슬롯 5 줄이다 (UI-251y §2·§3.2): 헤더에 서면
  // 폭에 따라 조작 버튼을 다음 줄로 밀어내 사용자가 버튼을 찾는 자리가
  // 달라진다. 순서는 레포 → route → from → exec 칩 하나다.
  const repo_el = item.workspace_name
    ? html`<span class="worker-card__repo" title=${item.root_dir || ''}
        >${item.workspace_name}</span
      >`
    : '';
  const cross_lane_el = crossLaneChipTemplate(item.cross_lane_chip);
  const route_el = routeChipTemplate(workflow);
  const from_el = fromChipTemplate(item.from_id);
  const has_exec_chips = !!(
    item.exec_chips &&
    (item.exec_chips.orchestration || item.exec_chips.worker)
  );
  return html`<div
    class="worker-card${draggable
      ? ''
      : ' worker-card--static'}${worker_ineligible
      ? ' worker-card--ineligible'
      : ''}"
    draggable=${draggable ? 'true' : 'false'}
    data-bead-id=${item.id}
    data-lane=${item.lane}
  >
    <div class="worker-card__head">
      ${draggable
        ? html`<span class="worker-card__grip" aria-hidden="true">⠿</span>`
        : ''}
      <span class="worker-card__id" title="클릭하면 ID 복사">${item.id}</span
      >${priorityBadgeTemplate(item.priority)}
      ${worker_ineligible
        ? html`<button
            type="button"
            class="ctl-chip ctl-chip--label judgement-chip worker-card__ineligible"
            data-chip-key="ineligible"
            aria-expanded=${chipOpen(item, 'ineligible') ? 'true' : 'false'}
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
          >
            worker-ineligible
          </button>`
        : session_preferred
          ? html`<button
              type="button"
              class="ctl-chip ctl-chip--label judgement-chip worker-card__session-preferred"
              data-chip-key="session_preferred"
              aria-expanded=${chipOpen(item, 'session_preferred')
                ? 'true'
                : 'false'}
              title=${session_preferred_tooltip}
            >
              세션 권장
            </button>`
          : ''}${recChipTemplate(
        item.rec,
        chipOpen(item, 'rec')
      )}${quickFixReviewChipTemplate(workflow, chipOpen(item, 'qfr'))}
      ${spec_after_blocker_open ? '' : judgementPopover(item)}
    </div>
    <div class="worker-card__title">${item.title}</div>
    ${workflow
      ? stepperTemplate(workflow, item.status, {
          onOpenDoc: options.onOpenDoc
        })
      : ''}${deps_el}
    ${repo_el || cross_lane_el || route_el || from_el || has_exec_chips
      ? html`<div class="worker-chips">
          ${repo_el}${cross_lane_el}${route_el}${from_el}${execChipsTemplate(
            item.exec_chips,
            {
              pin: options.exec_chips_mode === 'pinned_only'
            }
          )}
        </div>`
      : ''}
    <div
      class="worker-card__foot${item.reason
        ? ''
        : ' worker-card__foot--actions-only'}"
    >
      ${menu_open
        ? html`<div class="worker-card__place-menu">
            ${placeMenuList(place_menu.lanes, item.id)}
            <button
              type="button"
              class="worker-card__place-cancel"
              data-bead-id=${item.id}
              title="레인 선택 취소"
              aria-label="레인 선택 취소"
            >
              ✕
            </button>
          </div>`
        : html`${item.reason
              ? html`<span
                  class="worker-card__reason${danger
                    ? ' worker-card__reason--danger'
                    : ''}"
                  >${item.reason}</span
                >`
              : ''}
            <!-- 버튼식 큐 적재 (UI-58y2 §[대기로 ↴]): 후보 레인에서 대기로 가는
                 유일한 경로다 (UI-d13v §6). 막는 것은 예전 드래그와 같다 — spec
                 없는 후보만 막고, blocked-with-spec은 적재할 수 있다. 포인터
                 종류로 감추지 않는다: 드래그라는 대체 경로가 없다. -->
            <button
              type="button"
              class="worker-card__place"
              data-bead-id=${item.id}
              ?disabled=${!queue_placeable}
              title=${queue_placeable
                ? '대기 큐 맨 뒤에 추가'
                : worker_ineligible
                  ? 'worker-ineligible label로 워커에서 실행할 수 없습니다'
                  : awaiting_user
                    ? '사용자 리뷰를 기다리는 중이라 대기 큐에 넣을 수 없습니다'
                    : missing_description
                      ? 'description이 없어 대기 큐에 넣을 수 없습니다'
                      : 'spec이 없어 대기 큐에 넣을 수 없습니다'}
            >
              대기로 ↴
            </button>`}
    </div>
    ${timesMeta(item)}
  </div>`;
}

/**
 * One lane pane. `body` overrides the row rendering for a column whose contents
 * are not mini rows (실행 중); `items` still supplies the header count so every
 * column counts its members the same way — a pane whose rows live in its own
 * `body` passes `count` instead (UI-5ksp §4.2). `controls` is an optional strip
 * under the header (candidate display filters, UI-ki09) and `header_control` an
 * optional trailing element INSIDE it (the candidate sort select, UI-raqh §2) —
 * a pane that passes neither renders exactly as before. `header_row` is one full
 * line directly BELOW the header, before `controls` (the candidate sort chain
 * editor, UI-d13v §4.4): the header line is a nowrap flex row, so an element
 * that needs its own width cannot ride inside it.
 *
 * `collapsible` makes the header carry an accordion toggle (UI-58y2, 데스크톱
 * 세로 띠는 UI-5ksp §4.4): 토글은 헤더 전체가 아니라 별도
 * `.worker-pane__toggle` 버튼이고 `header_control`은 그 형제로 오른쪽에 선다.
 * 그래서 펼친 상태에서 `<select>` 변경·버튼 클릭이 접힘을 건드리지 않는다.
 * 접힌 pane은 `header_control`·`controls`·`body`를 그리지 않되 `data-lane`은
 * 그대로 두므로 후보→대기 드롭이 띠 위에서도 성립한다. `live`는 실제로 일이
 * 도는 레인 하나를 표시한다 — 헤더 점이 숨쉬는 유일한 레인이다.
 *
 * @param {{ id: string, lane: 'candidate'|'queue'|'running'|'pr_wait'|'done'|'s1'|'s2'|'s3'|'s4'|'s5', title: string, items: MiniItem[], count?: number, src?: boolean, empty?: string, body?: import('lit-html').TemplateResult, controls?: import('lit-html').TemplateResult, header_control?: import('lit-html').TemplateResult|string, header_row?: import('lit-html').TemplateResult, live?: boolean, collapsible?: boolean, collapsed?: boolean, preview?: string, place_menu?: PlaceMenu|null, onOpenDoc?: import('../board/stepper.js').OpenDocHandler }} pane
 * @returns {import('lit-html').TemplateResult}
 */
export function paneTemplate(pane) {
  const collapsed = !!pane.collapsible && !!pane.collapsed;
  const count = typeof pane.count === 'number' ? pane.count : pane.items.length;
  const head_inner = html`<span
      class="worker-pane__dot worker-pane__dot--${pane.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${pane.title}</span>
    ${collapsed && pane.preview
      ? html`<span class="worker-pane__preview">${pane.preview}</span>`
      : ''}
    <span class="worker-pane__count">${count}</span>`;
  return html`<section
    class="worker-pane worker-pane--lane-${pane.lane}${pane.src
      ? ' worker-pane--src'
      : ''}${pane.live ? ' worker-pane--live' : ''}${pane.collapsible
      ? ' worker-pane--collapsible'
      : ''}${collapsed ? ' worker-pane--collapsed' : ''}"
    id=${ifDefined(pane.id || undefined)}
    data-lane=${pane.lane}
  >
    ${pane.collapsible
      ? html`<header class="worker-pane__hd">
          <button
            type="button"
            class="worker-pane__toggle"
            data-lane=${pane.lane}
            aria-expanded=${collapsed ? 'false' : 'true'}
          >
            <span class="worker-pane__caret" aria-hidden="true"
              >${collapsed ? '▸' : '▾'}</span
            >
            ${head_inner}
          </button>
          ${collapsed || !pane.header_control ? '' : pane.header_control}
        </header>`
      : html`<header class="worker-pane__hd">
          ${head_inner}${pane.header_control ? pane.header_control : ''}
        </header>`}
    ${collapsed
      ? ''
      : html`${pane.header_row ? pane.header_row : ''}${pane.controls
            ? pane.controls
            : ''}
          <div class="worker-pane__body">
            ${pane.body
              ? pane.body
              : pane.items.length === 0
                ? html`<div class="worker-pane__empty">
                    ${pane.empty || ''}
                  </div>`
                : pane.items.map((it) =>
                    pane.lane === 'candidate'
                      ? candidateCard(it, pane.place_menu, {
                          onOpenDoc: pane.onOpenDoc
                        })
                      : miniRow(it)
                  )}
          </div>`}
  </section>`;
}

/**
 * 대기 본문의 드롭 좌표. 값이 문자열일 때만 속성이 붙는다 (§6) — Worker는 pane
 * `data-lane`으로 드롭을 받으므로 이 묶음을 아예 넘기지 않는다.
 *
 * @typedef {{ drop?: string, root_dir?: string, lane_id?: string, lane_length?: string }} WaitDropAttrs
 */

/**
 * @typedef {Object} WaitSerialLane
 * @property {string} id - `s1`.. 또는 서버 lane id. pane `lane`·`data-lane`이 된다.
 * @property {string} [pane_id] - pane 요소 `id`. 생략하면 `worker-pane-lane-<id>`;
 * 빈 문자열이면 `id` 속성을 붙이지 않는다 — 레포마다 같은 `s1`을 가진 Monitor가
 * 문서 안 중복 id를 만들지 않으려고 쓴다.
 * @property {string} title - `직렬 1` · `dotfiles · 직렬 1`.
 * @property {import('lit-html').TemplateResult[]} rows - 호출 측이 이미 그려
 * 넘긴 행 목록 (`miniRow` 등). 본문은 구조만 소유하므로 행 렌더링에 관여하지
 * 않는다.
 * @property {number} count - 헤더가 쓰는 건수. `rows`와 다를 수 있다 (점유자).
 * @property {boolean} empty - `rows`도 점유자도 없어 힌트 한 줄로 접히는 상태.
 * @property {import('lit-html').TemplateResult|string} [badge] - 누가 잡고
 * 있는지 말하는 점유 표시 (Worker 점유자 id). 재료가 없으면 그리지 않는다.
 * @property {boolean} [held] - 점유 중이라 뱃지에 warn accent를 켤지 여부.
 * @property {boolean} [cycle] - 순환 의존을 알리는 경고 줄(`worker-lane__cycle`)을
 * 붙일지 여부.
 * @property {import('lit-html').TemplateResult} [after] - pane 아래에 호출
 * 측이 직접 그리는 조각 (Monitor 상호 정지 경고).
 * @property {import('lit-html').TemplateResult} [header_control] - 점유 표시
 * 오른쪽에 서는 탭 고유 컨트롤 (Monitor `Worker ↗`).
 * @property {WaitDropAttrs} [drop] - `worker-wait__rows`에 실을 드롭 좌표.
 */

/**
 * @typedef {Object} WaitBodyModel
 * @property {{ rows: import('lit-html').TemplateResult[], count: number, collapsed: boolean, drop?: WaitDropAttrs }} parallel
 * @property {{ lanes: WaitSerialLane[], collapsed: boolean, extra_panes?: import('lit-html').TemplateResult[], header_control?: import('lit-html').TemplateResult, notice?: import('lit-html').TemplateResult }} serial
 */

/**
 * One 영역 접기 토글 (§4.2). 클릭 처리는 두 탭의 index.js가 `lane-collapse`
 * 스토어로 위임한다 — 여기서는 좌표(`data-area`)와 상태(`aria-expanded`)만
 * 싣는다.
 *
 * @param {'parallel'|'serial'} area
 * @param {string} name
 * @param {boolean} collapsed
 * @returns {import('lit-html').TemplateResult}
 */
function areaToggle(area, name, collapsed) {
  return html`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${area}
      aria-expanded=${collapsed ? 'false' : 'true'}
      aria-label=${`${name} ${collapsed ? '펼치기' : '접기'}`}
    >
      ${collapsed ? '▸' : '▾'}
    </button>
    <span class="worker-wait__area-name">${name}</span>`;
}

/**
 * One 대기 본문 (UI-5ksp §4.2): 병렬 영역 하나 + 직렬 영역 하나. 본문은
 * **구조**만 소유한다 — 행, 레포 배지, 연결 레인 pane, `+ 연결 레인` 버튼,
 * 레포 간 상호 정지 경고는 호출 측이 만들어 슬롯으로 넘긴다. 재료가 없는
 * 자리는 그리지 않는다(fail-quiet).
 *
 * @param {WaitBodyModel} model
 * @returns {import('lit-html').TemplateResult}
 */
export function waitBody(model) {
  const parallel = model.parallel;
  const serial = model.serial;
  const parallel_drop = parallel.drop || {};
  return html`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${parallel.collapsed
        ? ' is-collapsed'
        : ''}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${areaToggle('parallel', '병렬 영역', parallel.collapsed)}
        <span class="worker-wait__area-count">${parallel.count}</span>
      </header>
      ${parallel.collapsed
        ? ''
        : html`<div
            class="worker-wait__area-body"
            data-drop=${ifDefined(parallel_drop.drop)}
            data-root-dir=${ifDefined(parallel_drop.root_dir)}
            data-lane-id=${ifDefined(parallel_drop.lane_id)}
            data-lane-length=${ifDefined(parallel_drop.lane_length)}
          >
            ${parallel.rows.length === 0
              ? html`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`
              : parallel.rows}
          </div>`}
    </section>
    <section
      class="worker-wait__area worker-wait__area--serial${serial.collapsed
        ? ' is-collapsed'
        : ''}"
      data-area="serial"
    >
      <header class="worker-wait__area-hd">
        ${areaToggle('serial', '직렬 영역', serial.collapsed)}
        ${serial.header_control ? serial.header_control : ''}
      </header>
      ${serial.collapsed
        ? ''
        : html`<div class="worker-wait__area-body">
            ${serial.notice ? serial.notice : ''}
            ${serial.extra_panes ? serial.extra_panes : ''}
            ${serial.lanes.map((lane) => serialLaneTemplate(lane))}
          </div>`}
    </section>
  </div>`;
}

/**
 * One 직렬 레인 wrapper (§4.2·§4.3): pane + 빈 레인 힌트 + 순환 경고 +
 * 호출 측 `after`. pane/힌트의 표시 조건은 `app/styles.css` 한 곳이 소유한다.
 *
 * @param {WaitSerialLane} lane
 * @returns {import('lit-html').TemplateResult}
 */
function serialLaneTemplate(lane) {
  const drop = lane.drop || {};
  const badge_el = lane.badge
    ? html`<span
        class="worker-lane__badge${lane.held
          ? ' worker-lane__badge--held'
          : ''}"
        >${lane.badge}</span
      >`
    : '';
  return html`<div
    class="worker-wait__lane${lane.empty ? ' worker-wait__lane--empty' : ''}"
  >
    ${paneTemplate({
      id:
        typeof lane.pane_id === 'string'
          ? lane.pane_id
          : `worker-pane-lane-${lane.id}`,
      lane: /** @type {any} */ (lane.id),
      title: lane.title,
      items: [],
      count: lane.count,
      empty: '비어 있음 — 행을 여기로 드래그',
      header_control: html`${badge_el}${lane.header_control
        ? lane.header_control
        : ''}`,
      body: html`<div
        class="worker-wait__rows"
        data-drop=${ifDefined(drop.drop)}
        data-root-dir=${ifDefined(drop.root_dir)}
        data-lane-id=${ifDefined(drop.lane_id)}
        data-lane-length=${ifDefined(drop.lane_length)}
      >
        ${lane.rows.length === 0
          ? html`<div class="worker-pane__empty">
              비어 있음 — 행을 여기로 드래그
            </div>`
          : lane.rows}
      </div>`
    })}
    ${lane.empty
      ? html`<div class="worker-wait__hint">${lane.title} · 비어 있음</div>`
      : ''}
    ${lane.cycle
      ? html`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`
      : ''}
    ${lane.after ? lane.after : ''}
  </div>`;
}

/**
 * The 모바일 `지금` 패널 (UI-58y2 §모바일 2, 두 탭 공유는 UI-5ksp §4.7): 실행 중
 * 타일과 PR 대기 행을 한 패널로 묶어 리본 바로 아래에 둔다. `count`가 0이면
 * 패널 자체를 그리지 않는다 — 빈 관제 패널은 화면만 먹고 아무것도 말하지
 * 않는다.
 *
 * @param {{ live?: boolean, running_body?: import('lit-html').TemplateResult|string, pr_wait_rows?: import('lit-html').TemplateResult[], count: number }} model
 * @returns {import('lit-html').TemplateResult|string}
 */
export function nowPanel(model) {
  if (!model.count) {
    return '';
  }
  return html`<section
    class="worker-now${model.live ? ' worker-pane--live' : ''}"
    id="worker-now"
  >
    <header class="worker-now__hd">
      <span
        class="worker-pane__dot worker-pane__dot--running"
        aria-hidden="true"
      ></span>
      <span class="worker-now__title">지금</span>
      <span class="worker-now__count">${model.count}</span>
    </header>
    ${model.running_body ? model.running_body : ''}
    ${model.pr_wait_rows ? model.pr_wait_rows : ''}
  </section>`;
}
