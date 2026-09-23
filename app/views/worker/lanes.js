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
import { discardOperationActive } from '../../../server/worker/discard-phase.js';
import {
  AREA_LABELS,
  areaLabels,
  areaTooltip
} from '../../utils/area-judgement.js';
import { chipPresetBinding } from '../../utils/chip-preset-binding.js';
import {
  COMPLEX_CHIP_LABEL,
  complexReasonSentences,
  complexTooltip
} from '../../utils/complex-judgement.js';
import {
  formatClockLocal,
  formatElapsedSince,
  formatRelativeTime,
  formatTimestampLocal
} from '../../utils/relative-time.js';
import {
  formatUsageTotalWithCost,
  providerUsageBadges,
  usageTooltip
} from '../../utils/token-usage.js';
import { chipPopoverTemplate } from '../chip-popover.js';
import { stepperTemplate } from '../stepper.js';
import {
  autoResumeText,
  autoSwitchText,
  providerClock
} from './gate-labels.js';
import { QUEUE_GRACE_MS, routeChipValue } from './lane-model.js';
import { logPathTemplate } from './log-path.js';
import { placementTitle } from './placement.js';
import {
  SUMMARY_CHIPS,
  WAIT_KINDS,
  representativeWaitReason,
  waitBadgeText,
  waitKindRow,
  waitScopeOf
} from './wait-vocabulary.js';

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
  if (phase === 'abandoned') {
    return '폐기 포기됨';
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
 * Describe the non-destructive abandon outcome before sending its request.
 *
 * @param {string} bead_id
 * @param {{ kind?: string }} operation
 * @returns {string}
 */
export function discardAbandonConfirmationMessage(bead_id, operation) {
  return operation.kind === 'stale_work_backup_fresh'
    ? `${bead_id}: 실패한 백업 작업을 포기합니다. 백업은 만들어지지 않았고 기존 작업은 그대로 남습니다. 계속할까요?`
    : `${bead_id}: 실패한 폐기 작업을 포기합니다. 백업과 폐기는 수행되지 않았고 bead는 폐기 이전 상태로 돌아갑니다. 계속할까요?`;
}

/**
 * Preserve why a failed discard was abandoned after its active projection
 * disappears from the card.
 *
 * @param {{ kind?: string, last_error: string }} operation
 * @returns {string}
 */
export function discardAbandonCompletionMessage(operation) {
  return operation.kind === 'stale_work_backup_fresh'
    ? `백업 포기됨 · 기존 작업은 그대로 남습니다 (원인: ${operation.last_error})`
    : `폐기 포기됨 · 폐기는 수행되지 않았습니다 (원인: ${operation.last_error})`;
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
 * Add bounded recovery guidance for known discard failures. Unknown tokens
 * remain unmodified by callers (fail-quiet).
 *
 * @param {string|null|undefined} error
 * @returns {string|null}
 */
export function discardFailureGuidance(error) {
  if (error?.startsWith('orphan_gitlink_content:')) {
    const path = error.slice('orphan_gitlink_content:'.length);
    return `매핑 없는 gitlink 경로 ${path}에 내용이 있습니다 — 저장소에서 그 경로를 정리한 뒤 재시도하거나 포기하세요`;
  }
  if (error === 'dirty_submodule') {
    return '서브모듈에 미커밋 변경이나 미초기화 항목이 있습니다 — 정리 후 재시도하세요';
  }
  if (error === 'submodule_observation_failed') {
    return '서브모듈 상태를 읽지 못했습니다 (git 오류) — 워크트리에서 git 명령을 직접 확인하세요';
  }
  return null;
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
 * @returns {{ action: boolean, enabled: boolean, label: string, title: string, attempt_id: string|null, operation: any, progress: string|null, error: string|null, confirmation: 'merged'|'unmerged', abandon: { action: boolean, label: string, title: string } }}
 */
export function discardProjection(operations, bead_id, input = {}) {
  const list = operations && typeof operations === 'object' ? operations : {};
  const operation = Object.values(list)
    .filter(
      (/** @type {any} */ value) =>
        value && value.bead_id === bead_id && discardOperationActive(value)
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
  const guidance = discardFailureGuidance(error);
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
        ? guidance
          ? `폐기 실패: ${error} — ${guidance}`
          : stale_recovery
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
    confirmation,
    abandon: {
      action: !!operation && operation.phase === 'requested' && Boolean(error),
      label: stale_recovery ? '백업 포기' : '폐기 포기',
      title: stale_recovery
        ? '실패한 백업 작업을 포기합니다 — 원본은 그대로 남고 새로 시작하지 않습니다'
        : '실패한 폐기 작업을 포기합니다 — 백업·폐기는 수행되지 않았고 bead는 폐기 이전 상태로 돌아갑니다'
    }
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
  const guidance = discardFailureGuidance(discard.error);
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
    ${discard.error
      ? html`<span
          >폐기 실패: ${discard.error}${guidance ? ` — ${guidance}` : ''}</span
        >`
      : ''}
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
 * The 오케/워커 execution-settings chips (worker-card-exec-chips §4).
 *
 * The prefix label lives here rather than in the formatter: the formatter owns
 * the settings text, the template owns how that text is introduced.
 *
 * @typedef {import('../../utils/exec-settings-chip.js').ExecChip & { pinned?: boolean }} LaneExecChip
 * @typedef {{ orchestration: LaneExecChip|null, worker: LaneExecChip|null }} LaneExecChips
 */

/**
 * @param {LaneExecChips|null|undefined} chips
 * @param {{ pin?: boolean }} [options]
 * @returns {import('lit-html').TemplateResult|''}
 */
export function execChipsTemplate(chips, options = {}) {
  if (!chips || (!chips.orchestration && !chips.worker)) {
    return '';
  }
  const orchestration_pin =
    chips.orchestration?.pinned === true || options.pin === true
      ? ' exec-chip--pin'
      : '';
  const worker_pin =
    chips.worker?.pinned === true || options.pin === true
      ? ' exec-chip--pin'
      : '';
  const note = options.pin === true ? '\n이슈 핀 — 레포 기본값과 다름' : '';
  return html`${chips.orchestration
    ? html`<span
        class="exec-chip exec-chip--orch${orchestration_pin}"
        title=${`${chips.orchestration.title}${note}`}
        ><span class="exec-chip__k">오케</span
        ><span class="exec-chip__v">${chips.orchestration.text}</span></span
      >`
    : ''}${chips.worker
    ? html`<span
        class="exec-chip exec-chip--worker${worker_pin}"
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
 * 라벨은 owner workspace 이름을 문자로 싣고 색도 갈라진다.
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
 * Select the first readiness judgment defined by UI-ff10 §6.1.
 *
 * @param {MiniItem} item
 * @returns {{ label: string, title: string }|null}
 */
function readinessJudgement(item) {
  if (!Object.hasOwn(item, 'route_ok') || item.queue_placeable === true) {
    return null;
  }
  let label = '';
  if (item.route_ok === false) {
    label = '라우팅 필요';
  }
  if (
    label.length === 0 &&
    (item.worker_ineligible === true || item.awaiting_user === true)
  ) {
    return null;
  }
  if (label.length === 0 && item.missing_description === true) {
    label = '본문 필요';
  } else if (label.length === 0 && item.placement_spec === 'conflict') {
    label = '스펙 충돌';
  } else if (
    label.length === 0 &&
    Object.hasOwn(item, 'placement_spec') &&
    item.placement_spec !== 'published'
  ) {
    label = '스펙 미발행';
  }
  if (label.length === 0) {
    return null;
  }
  return {
    label,
    title: placementTitle({
      placeable: false,
      route_ok: item.route_ok,
      worker_ineligible: item.worker_ineligible === true,
      awaiting_user: item.awaiting_user === true,
      missing_description: item.missing_description === true,
      spec: item.placement_spec
    })
  };
}

/**
 * Readiness judgment chip for slot 4a (UI-ff10 §6.1).
 *
 * @param {{ label: string, title: string }|null} judgement
 * @param {boolean} open
 * @returns {import('lit-html').TemplateResult|''}
 */
function readinessChipTemplate(judgement, open) {
  if (!judgement) {
    return '';
  }
  return html`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__readiness"
    data-chip-key="readiness"
    aria-expanded=${open ? 'true' : 'false'}
    title=${judgement.title}
  >
    ${judgement.label}
  </button>`;
}

/**
 * The two lines of 슬롯 4 (UI-8x90 §4.1·§4.2). 상단은 "지금 갈 수 있나"를 바꾸는
 * 사실(`⛓` 선행 · `→` 후속), 하단은 판단 재료(`🔓` 해제 ·
 * `⧉` 겹침 · `scope 없음`)다. 재료가 없는 줄은 그리지 않으며 두 줄은 서로를
 * 기다리지 않는다.
 *
 * 레인 분기는 없다 (UI-anna §6): 모든 칩이 재료가 실린 카드에 선다. 어느 레인이
 * 그 재료를 받는가는 투영이 정하고, 이 템플릿은 받은 것을 그린다.
 *
 * @param {DependencyChips|null|undefined} chips
 * @param {import('lit-html').TemplateResult|''} [after_predecessors] - `⛓` 칩
 * 바로 뒤에 서는 조각 — 후보 카드의 `스펙 대기`·준비 판정 칩 (UI-svh6 §4.3).
 * 칩 하나를 위해 이 템플릿이 `MiniItem`을 통째로 읽게 만들지 않으려고 호출
 * 자리가 만들어 넘긴다. 값이 있으면 상단 줄은 선행 칩이 없어도 선다.
 * @param {import('lit-html').TemplateResult|''} [leading] - 의존 줄의 **맨 앞**에
 * 서는 조각 — 게이트 칩 (UI-01wh §3.2). "왜 못 가나"의 가장 바깥 사정이라
 * 칩보다도 먼저다. 값이 있으면 역시 상단 줄이 선다.
 * @param {import('lit-html').TemplateResult|''} [trailing] - 의존 줄의 **끝**에
 * 서는 조각 — 유예 `⏳` (UI-01wh §3.2 순서: 게이트 → 선행 → 후속 → 유예).
 * 값이 있으면 역시 상단 줄이 선다.
 * @returns {import('lit-html').TemplateResult|''}
 */
export function dependencyChipsTemplate(
  chips,
  after_predecessors = '',
  leading = '',
  trailing = ''
) {
  if (!chips) {
    return after_predecessors === '' && leading === '' && trailing === ''
      ? ''
      : html`<div class="worker-deps worker-deps--primary">
          ${leading}${after_predecessors}${trailing}
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
  const has_primary =
    predecessors.length > 0 ||
    dependents.length > 0 ||
    after_predecessors !== '' ||
    leading !== '' ||
    trailing !== '';
  const has_secondary =
    released.length > 0 || overlaps.length > 0 || scope_missing;
  if (!has_primary && !has_secondary) {
    return '';
  }
  return html`${has_primary
    ? html`<div class="worker-deps worker-deps--primary">
        ${leading}${predecessors.map((chip) =>
          openableChipTemplate(chip, 'pred')
        )}${after_predecessors}${dependents.map((chip) =>
          openableChipTemplate(chip, 'dependents')
        )}${trailing}
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
 * The route 칩 하나 (UI-yrzu §7.1). 실행가능·대기·PR 대기·실행중 카드와 완료
 * 행(UI-q1tg §3.4)이 모두 이 함수를 부르므로 route는 어디서나 같은 모양·같은
 * 파생 규칙으로 읽힌다 — 규칙이 카드마다 복제되면 한쪽은 반드시 낡는다. 재료가
 * 없으면 빈 문자열이다 (fail-quiet).
 *
 * @param {MiniItem['workflow']} workflow
 * @returns {import('lit-html').TemplateResult|''}
 */
export function routeChipTemplate(workflow) {
  // 판정은 route 필터와 공유한다 (UI-q1tg §3.2): `null`이면 재료가 안 온 것이라
  // 그리지 않고, `unset`이면 재료는 왔는데 route가 없거나 파생이다.
  const value = routeChipValue(workflow);
  if (value === null) {
    return '';
  }
  const derived = value === 'unset';
  // `data-route`는 칩의 색 토큰을 고르는 같은 분류다 (UI-kyky §3.2): 카드 배경과
  // 칩이 한 판정에서 나오므로 두 표면이 다른 종류를 말할 수 없다.
  return html`<span
    class="ctl-chip ctl-chip--route${derived ? ' is-derived' : ''}"
    data-route=${value}
    title=${derived ? 'route 미핀 (metadata unset)' : 'route'}
    >${value}</span
  >`;
}

/**
 * The 작업 종류(route) 색 one card carries (UI-kyky §3.1). 후보·대기·PR 대기·실행·
 * 완료 카드가 모두 이 함수 하나를 부르므로 세 공유 렌더러가 같은 분류를 같은
 * 방식으로 싣는다 — 판정 자체는 route 칩·route 필터와 같은
 * {@link routeChipValue}다.
 *
 * `tinted`가 배경을 켜는 유일한 조건이다: 실패·실행·머지·외부 세션·선택 같은
 * 기존 상태 표현이 있는 카드는 호출 자리가 `neutral=false`를 넘기므로 배경
 * 클래스 자체가 붙지 않는다 (§3.1 우선순위 1). 재료가 없으면 `route`가
 * `undefined`라 색 속성도 없다 (fail-quiet).
 *
 * @param {MiniItem['workflow']} workflow
 * @param {boolean} neutral - 이 카드에 기존 상태 표현(failed·merging·external
 * 등)이 하나도 없는지. `false`면 배경을 켜지 않는다.
 * @returns {{ route: string|undefined, tinted: boolean }}
 */
export function routeCardTone(workflow, neutral) {
  const value = routeChipValue(workflow);
  return {
    route: value === null ? undefined : value,
    tinted: value !== null && neutral === true
  };
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
 * Render immutable Worker creation provenance and the distinct relation origin.
 *
 * @param {{ worker_created_from?: string, worker_created_from_root_dir?: string, from_id?: string }} item
 * @param {{ include_from?: boolean }} [options]
 * @returns {import('lit-html').TemplateResult|''}
 */
export function creationSourceChipsTemplate(item, options = {}) {
  const source_id =
    typeof item.worker_created_from === 'string'
      ? item.worker_created_from
      : '';
  const source_root =
    typeof item.worker_created_from_root_dir === 'string'
      ? item.worker_created_from_root_dir
      : '';
  const include_from = options.include_from !== false;
  const relation =
    include_from && item.from_id !== source_id
      ? fromChipTemplate(item.from_id)
      : '';
  if (source_id.length === 0) {
    return relation;
  }
  return html`<span
      class="ctl-chip ctl-chip--worker-created"
      title=${`Worker가 ${source_id}에서 새로 만든 이슈입니다`}
      >워커 생성</span
    >${source_root.length > 0
      ? html`<button
          type="button"
          class="ctl-chip ctl-chip--from worker-created-source"
          data-source-id=${source_id}
          data-root-dir=${source_root}
          title=${`생성 원본 ${source_id} 열기`}
        >
          ↩ 생성 원본 ${source_id}
        </button>`
      : html`<span
          class="ctl-chip ctl-chip--from ctl-chip--disabled"
          title="원본 저장소를 확인할 수 없음"
          >↩ 생성 원본 ${source_id}</span
        >`}${relation}`;
}

/**
 * `복잡` chip (UI-7nhi §3): the workflow contract judged this bead complex,
 * carried by label `complex` + metadata `complex_reason`. 바인딩이 있고 이슈
 * route가 `quick_fix`가 아니면 클릭이 그 프리셋을 적용·복원하고 칩이 `data-state`를
 * 얻는다 (UI-wg68 §5). 그 밖에는 UI-8x90 §4.5 그대로 사유 팝업이다.
 *
 * One chip, never a model or runtime name: the judgement's WHY lives in the
 * tooltip, which every surface shares so one judgement never reads two ways.
 *
 * @param {string|null|undefined} reason - `complex_reason` signals joined by
 * `+`. Empty or absent means no judgement and no chip (fail-quiet).
 * @param {boolean} [open] - 사유 팝업이 지금 이 카드에서 이 칩 아래에 펼쳐져
 * 있는지. `aria-expanded`가 되는 값이다.
 * @param {MiniItem|null} [item] - 바인딩 판정의 재료를 실은 행 (`null`이면 팝업
 * 칩 그대로다).
 * @param {import('../../utils/chip-preset-binding.js').ChipPresetContext|null} [ctx]
 * - 프리셋 스냅샷 맥락. 없으면 상태도 클릭 의미도 바뀌지 않는다 (fail-quiet).
 * @returns {import('lit-html').TemplateResult|''}
 */
export function complexChipTemplate(
  reason,
  open = false,
  item = null,
  ctx = null
) {
  if (typeof reason !== 'string' || reason.length === 0) {
    return '';
  }
  return judgementChipTemplate({
    chip_key: 'complex',
    label: COMPLEX_CHIP_LABEL,
    title: complexTooltip(reason),
    extra_class: 'worker-card__complex',
    open,
    item,
    ctx
  });
}

/**
 * The preset-snapshot context every judgement chip reads (UI-wg68 §5.1).
 *
 * It is module state rather than a template argument because the bindings are
 * SERVER-GLOBAL: `복잡`·`frontend`·`backend` sit on candidate cards, waiting
 * rows, running tiles and pane bodies alike, and threading one identical
 * server-global map through every one of those call sites would put the same
 * value in a dozen signatures. Each tab sets it before it renders; the only
 * per-tab parts are `catalogOf` and `isBusy`.
 *
 * @type {import('../../utils/chip-preset-binding.js').ChipPresetContext|null}
 */
let chip_preset_ctx = null;

/**
 * Install the render-scoped preset context. `null` restores the pre-binding
 * behaviour — every judgement chip is a 사유 팝업 (fail-quiet).
 *
 * @param {import('../../utils/chip-preset-binding.js').ChipPresetContext|null} ctx
 */
export function setChipPresetContext(ctx) {
  chip_preset_ctx = ctx || null;
}

/**
 * One 판정 칩 — 바인딩이 있으면 프리셋을 적용·복원하는 버튼, 없으면 지금까지의
 * 사유 팝업 버튼 (UI-wg68 §5.2). 두 모양이 한 함수에 있는 이유는 같은 칩이
 * 이슈마다 다른 의미를 갖기 때문이다: `route=quick_fix` 이슈나 바인딩 없는 칩은
 * 언제나 팝업이다.
 *
 * @param {{ chip_key: string, label: string, title: string, extra_class: string, open: boolean, item: MiniItem|null, ctx: import('../../utils/chip-preset-binding.js').ChipPresetContext|null }} input
 * @returns {import('lit-html').TemplateResult}
 */
function judgementChipTemplate(input) {
  const { chip_key, label, title, extra_class, open, item } = input;
  const ctx = input.ctx || chip_preset_ctx;
  const binding = item
    ? chipPresetBinding(
        chip_key,
        item.chip_metadata,
        routeOf(item),
        ctx,
        item.id,
        item.root_dir || ''
      )
    : null;
  if (!binding) {
    return html`<button
      type="button"
      class="ctl-chip ctl-chip--label judgement-chip ${extra_class}"
      data-chip-key=${chip_key}
      aria-expanded=${open ? 'true' : 'false'}
      title=${title}
    >
      ${label}
    </button>`;
  }
  return html`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip judgement-chip--bound ${extra_class}"
    data-chip-key=${chip_key}
    data-bead-id=${item ? item.id : ''}
    data-root-dir=${item && item.root_dir ? item.root_dir : ''}
    data-state=${binding.state}
    aria-busy=${binding.busy ? 'true' : 'false'}
    title=${`${title}${binding.title_suffix}`}
  >
    ${label}
  </button>`;
}

/**
 * The route this row observed, the only material deciding whether a chip click
 * is refused as a quick fix issue (§5.2). Candidate rows carry `route`; overlay
 * rows carry it inside `workflow` (false when neither is known).
 *
 * @param {MiniItem} item
 * @returns {string}
 */
function routeOf(item) {
  if (typeof item.route === 'string' && item.route.length > 0) {
    return item.route;
  }
  const workflow = /** @type {any} */ (item.workflow);
  const route = workflow && workflow.route;
  return typeof route === 'string' ? route : '';
}

/**
 * `frontend`·`backend` 판정 칩 (UI-wg68 §5.4). 어휘는 dotfiles 계약이 소유하고
 * 칩 문구는 라벨 그대로다 — 사유 키가 없으므로 팝업도 없고, 바인딩이 있으면
 * `복잡`과 같은 클릭을 한다. 자리도 `복잡` 바로 뒤다.
 *
 * @param {MiniItem|null} item
 * @param {import('../../utils/chip-preset-binding.js').ChipPresetContext|null} [ctx]
 * @returns {import('lit-html').TemplateResult|''}
 */
export function areaChipsTemplate(item, ctx = null) {
  if (!item) {
    return '';
  }
  const labels = areaLabels(item.labels);
  if (labels.length === 0) {
    return '';
  }
  const chip_ctx = ctx || chip_preset_ctx;
  return html`${labels.map((label) =>
    judgementChipTemplate({
      chip_key: label,
      label,
      title: areaTooltip(label),
      extra_class: `worker-card__area worker-card__area--${label}`,
      open: chipOpen(item, label),
      item,
      ctx: chip_ctx
    })
  )}`;
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
 * Whether a PR reference is safe to render as a link: an absolute `http(s)`
 * URL and a positive integer number (UI-kyky §6.1). Both tabs build every PR
 * link through {@link prLinkTemplate}, so this is the one boundary where an
 * arbitrary-scheme string — the external-PR registry stores `metadata.pr_url`
 * as bd holds it — is refused instead of landing in an `href`.
 *
 * @param {unknown} pr_url
 * @param {unknown} pr_number
 */
function isWebPrLink(pr_url, pr_number) {
  if (typeof pr_url !== 'string' || pr_url.length === 0) {
    return false;
  }
  if (!Number.isInteger(pr_number) || /** @type {number} */ (pr_number) <= 0) {
    return false;
  }
  try {
    const protocol = new URL(pr_url).protocol;
    return protocol === 'https:' || protocol === 'http:';
  } catch {
    return false;
  }
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
  if (!isWebPrLink(pr_url, pr_number)) {
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

export const SERIAL_LANE_LABEL = '직렬';

/**
 * Shared dispatch origin chip for running tiles and PR rows.
 *
 * @param {import('./lane-model.js').LaneOrigin|undefined} origin
 * @returns {import('lit-html').TemplateResult|''}
 */
export function laneOriginChipTemplate(origin) {
  if (!origin) {
    return '';
  }
  const serial = origin.kind === 'serial';
  return html`<span
    class="ctl-chip ctl-chip--lane"
    title=${serial
      ? `직렬 레인 ${origin.index} — 이 레인은 이 일감이 끝날 때까지 다음 항목을 내보내지 않는다`
      : '병렬 큐 — 슬롯이 남는 한 다른 항목과 함께 실행된다'}
    >${serial ? `${SERIAL_LANE_LABEL} ${origin.index}` : '병렬'}</span
  >`;
}

/**
 * @param {import('./lane-model.js').InteractiveSessionView[]|undefined} views
 * @param {{ bead_id: string }} options
 */
export function interactiveSessionBadgesTemplate(views, options) {
  return (views || []).map((view) => {
    const mode =
      view.mode === 'fork'
        ? 'fork'
        : view.source === 'recovered'
          ? '복구'
          : '새 세션';
    const origin =
      mode === 'fork'
        ? view.source === 'attempt'
          ? `fork · attempt ${(view.attempt_id || '').slice(0, 8)}`
          : 'fork · session_ref'
        : mode === '복구'
          ? '복구'
          : `새 세션 · ${view.fallback_reason || ''}`;
    const title = `${origin} · ${view.tmux_session}:${view.tmux_window}`;
    const label = `▤ ${view.kind === 'resolve' ? '해결' : '문의'} 세션 · ${mode}`;
    return html`${view.session_id
      ? html`<button
          type="button"
          class="interactive-session-badge"
          data-session-provider=${view.provider}
          data-session-id=${view.session_id}
          data-bead-id=${options.bead_id}
          title=${title}
        >
          ${label}
        </button>`
      : html`<span class="interactive-session-badge" title=${title}
          >${label}</span
        >`}${view.discord_url
      ? html`<a
          class="interactive-session-discord"
          href=${view.discord_url}
          target="_blank"
          rel="noopener"
          >↗ Discord</a
        >`
      : ''}`;
  });
}

/**
 * @param {import('./lane-model.js').InteractiveSessionView[]|undefined} views
 */
export function interactiveSessionClosingTemplate(views) {
  return (views || []).some((view) => view.closing)
    ? html`<span class="interactive-session-closing">세션 닫는 중</span>`
    : '';
}

/**
 * @typedef {Object} MiniItem
 * @property {import('./lane-model.js').InteractiveSessionView[]} [interactive_sessions]
 * @property {import('./lane-model.js').LaneOrigin} [lane_origin]
 * @property {string} id - Bead id.
 * @property {string} title - Bead title (falls back to id).
 * @property {string|import('../../protocol.js').WaitReason} [reason] - Candidate reason chip or external wait judgment (missing_description /
 * spec 없음 / 🔒 target).
 * @property {boolean} draggable - Whether this row can be dragged. 후보 카드는
 * 언제나 `false`다 (UI-d13v §6): 후보 레인은 드래그 소스도 드롭 대상도 아니고,
 * 이 값은 DOM `draggable` 속성과 `worker-card--static`/grip 판정에만 남는다.
 * @property {boolean} [queue_placeable] - 후보 카드를 대기·직렬 레인에 넣을 수
 * 있다 (UI-d13v §6). 배치 메뉴 열림·`[대기로 ↴]` 자격이 읽는 값이며, 예전에
 * `draggable`이 지던 자격을 그대로 물려받는다 — 드래그가 사라져도 무엇을 막는지는
 * 같아야 한다. 후보 카드 외의 행은 싣지 않는다.
 * @property {boolean} [blocked] - Whether a dependency currently blocks it.
 * @property {boolean} [route_ok] - Placement route validity, when facts exist.
 * @property {boolean} [awaiting_user] - Placement waits for user input.
 * @property {boolean} [missing_description] - quick_fix description is absent.
 * @property {'published'|'draft'|'none'|'conflict'|'n/a'} [placement_spec] -
 * Placement spec judgment, when facts exist.
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
 * @property {'session'} [kind] - Session row kind.
 * @property {boolean} [done] - Rendered dimmed with no grip.
 * @property {boolean} [is_quick_fix] - Candidate route fallback when workflow
 * enrichment is unavailable.
 * @property {boolean} [external] - PR 대기 행이 외부 세션이 배달한 PR인지
 * (UI-w0hi §4). 좌측 액센트 보더 + 미세 배경 틴트로 구분만 하고 행동은 바꾸지
 * 않는다.
 * @property {number|null} [pr_number] - Observed PR number (`pr_wait` rows).
 * @property {string} [pr_url] - Observed PR URL; renders the `#N ↗` link.
 * @property {string} [foreign_repo] - `OWNER/REPO` of a PR that lives in ANOTHER
 * repository (UI-kyky §6.2). Only a row the server marked `foreign` carries it,
 * and only when the slug is known — the badge says this workspace does not
 * observe, merge or clean the PR up, so a guessed value would be a false
 * promise. 같은 저장소의 `external` 행은 이 필드를 얻지 않는다.
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
 * @property {(import('../stepper.js').WorkflowSummary & { route_source?: string, chips?: { route?: string, route_source?: string, exec_receipt?: import('../exec-format.js').ExecReceipt|null }, quick_fix_review?: { state: 'reviewed'|'stale'|'unreviewed'|'unknown', missing: string[], digest: string|null } }) | null} [workflow] - Server-enriched workflow. 실행가능 카드는 stepper와 route
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
 * @property {number} [added_at] - 대기 레인 진입 시각 (UI-q1tg §3.3). 유예 칩과
 * `[지금 시작]`의 유일한 판정 재료이고, 대기 행이 아니면 필드 자체가 없다.
 * @property {import('./lane-model.js').LaneGate} [gate] - 이 행의 자동 디스패치를
 * 막고 있는 게이트 (UI-01wh §3.1). 슬롯 4a 게이트 칩과 `▶ 재개`·`[지금 시작]`의
 * 유일한 재료이고, 막혀 있지 않으면 필드 자체가 없다 (fail-quiet).
 * @property {boolean} [manual_only] - 이 대기 행의 저장소가 자동 진행을 꺼 두었다
 * (UI-3pu9 §4.1). `true`면 유예 칩과 유예로 서는 `[지금 시작]`을 그리지 않는다 —
 * 스케줄러가 자동 출발을 하지 않아 "남은 시간 동안 미뤄진다"가 사실이 아니다.
 * 대기 행이 아니거나 워크스페이스 상태를 읽지 못하면 `false`다.
 * @property {boolean} [ghost] - Serial-lane occupancy row (UI-04vo §4): the
 * lineage holding the lane, drawn dimmed and never draggable.
 * @property {number} [seq] - 1-based execution order number in a serial lane.
 * @property {boolean} [rereview_required] - An admitted stale receipt needs re-review.
 * @property {LaneExecChips|null} [exec_chips] -
 * 실행 설정 칩 (worker-card-exec-chips §2.2): 대기 행과 후보 카드가 "이 설정으로
 * 돌아간다"를 적재 전에 미리 보여 준다. PR 대기 행은 싣지 않는다. 완료 행은
 * 시제가 다르다 (UI-q1tg §3.4 / UI-j10d): 마지막 구현 attempt의 기록을 표시한다.
 * @property {DependencyChips|null} [dependency_chips] - 슬롯 4 두 줄의 의존·
 * 정보 칩 (UI-eey2 §5.1, 두 줄은 UI-8x90 §4.1).
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
 * @property {import('../../protocol.js').ExternalWaitObservation} [external_wait] - Consumer wait record.
 * @property {import('../../protocol.js').WaitReason[]} [wait_reasons] - Server display judgments for this issue.
 * 대상을 함께 싣는 요약 칩 자료.
 * @property {boolean} [spec_after_blocker] - 선행의 결과가 이 bead의 설계
 * 전제라 spec까지 선행 뒤로 미룬다 (UI-svh6 §4.2). 투영이 `spec-after-blocker`
 * 라벨과 지금의 blocker를 함께 읽어 접은 값이며, 자격·drag·적재 어디에도 들어가지
 * 않는다.
 * @property {string} [complex_reason] -
 * 복잡 판정 (UI-7nhi §3): 라벨 `complex`와 metadata `complex_reason`이 함께
 * 성립할 때의 신호 문자열이다. 표시 전용이고 자격·drag·적재 어디에도 들어가지
 * 않는다. 생략·`''`는 판정 없음이다.
 * @property {string} [route] - 이 bead의 관측된 `metadata.route`. 칩 클릭이
 * quick fix 이슈에서 거부되는지의 유일한 재료다 (UI-wg68 §5.2).
 * @property {string[]} [labels] - 이 bead의 라벨. `frontend`·`backend` 판정 칩의
 * 재료이고, 계약 어휘 밖 라벨은 그리지 않는다 (UI-wg68 §5.4).
 * @property {Record<string, any>} [chip_metadata] - 칩 바인딩 판정의 재료
 * (UI-wg68 §5.1): 이 bead의 metadata 그대로다. `applied_exec_preset`·
 * `chip_preset_source`·17핀을 한 객체에서 읽어야 `data-state`가 선다. 오버레이가
 * 이 bead의 metadata를 모르면 필드도 없고, 그때 바인딩된 칩은 상태 없이 그려진다.
 * @property {{ codes: string[] }} [receipt_badge] - 실행 영수증 회계 잔여
 * (UI-h6t1 §4.3): dotfiles 계약이 `badge` 등급으로 확정한 코드들이다. 머지
 * 판정을 바꾸지 않으므로 슬롯 5 판정 칩 하나로만 선다. 코드가 없으면 필드도
 * 없다.
 * @property {string} [from_id] - Origin bead of a `discovered-from` edge.
 * @property {string} [worker_created_from] - Immutable Worker creation source.
 * @property {string} [worker_created_from_root_dir] - Confirmed source owner.
 * @property {string[]} [carried_to] - 이 bead에서 이월된 후속 ID들 (UI-btj6 §3).
 * 투영이 `carried_from` metadata와 이 bead를 가리키는 `blocks` 간선만으로 접은
 * 값이며, 완료 행만 싣는다. 칩은 {@link carryoverChipsTemplate}이 슬롯 4b에
 * 그리고, 재료가 없으면 필드도 없다.
 * @property {number} [priority] - Bead 우선순위 0..4. 숫자가 아니면 배지를
 * 그리지 않는다.
 * @property {boolean} [search_match] - 워커 탭 검색어와의 일치 (UI-6g3t §7).
 * `false`인 행만 `is-dimmed`로 흐려지고, 검색 중이 아니면 키 자체가 없어 지금
 * 그대로 그려진다 (fail-quiet). 숨김이 아니므로 순번·좌표·건수는 그대로다.
 * @property {boolean} [filter_match] - 우선순위·타입·라벨 필터와의 일치
 * (UI-p7s2 §6). 검색과 같은 자리·같은 흐림이다: 대기 행을 숨기면 직렬 순번과
 * 큐 위치가 어긋나므로 이 레인들은 숨기지 않는다.
 * @property {string} [issue_type] - bd `issue_type` (타입 필터의 재료).
 * @property {boolean} [deferred] - 보류 선반의 행 (UI-p7s2 §3).
 */

/**
 * The 완료 3줄 행 (UI-eey2 §8): 레포 배지 · ID · 완료 시각 / 제목 /
 * route · 오케 · 워커 · 토큰 · 작업.
 *
 * A separate builder rather than a branch inside {@link miniRow}: the monitor's
 * done row is the only row that needs it, and rebuilding miniRow's ternary
 * chain around it would rewrite the Worker console's rows for no reason.
 *
 * @param {MiniItem} item
 * @returns {import('lit-html').TemplateResult}
 */
function doneThreeLineRow(item) {
  // Slot 5 splits inside row3; completion and work times keep their positions.
  const badges = Array.isArray(item.badges) ? item.badges : [];
  const usage_options = { scope: undefined, direct_session: false };
  const provider_badges = providerUsageBadges(item.usage, usage_options);
  const usage_label = formatUsageTotalWithCost(item.usage);
  const done_at_label = formatRelativeTime(item.done_at);
  const route_el = routeChipTemplate(item.workflow);
  const from_el = creationSourceChipsTemplate(item, { include_from: false });
  const exec_el = execChipsTemplate(item.exec_chips);
  return html`<div
    class="worker-mini worker-mini--static worker-mini--done worker-mini--three-line${item.search_match ===
    false
      ? ' is-dimmed'
      : ''}"
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
      )}${interactiveSessionBadgesTemplate(item.interactive_sessions, {
        bead_id: item.id
      })}${interactiveSessionClosingTemplate(item.interactive_sessions)}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${item.title}</span>
    </div>
    ${carryoverChipsTemplate(item.carried_to, item.root_dir)}
    <div class="worker-mini__row3">
      ${route_el || from_el
        ? html`<div class="worker-chips worker-chips--coords">
            ${route_el}${from_el}
          </div>`
        : ''}
      ${exec_el || provider_badges.length > 0 || usage_label
        ? html`<div class="worker-chips worker-chips--run">
            ${exec_el}${provider_badges.length > 0
              ? provider_badges.map(
                  (badge) =>
                    html`<span class="worker-usage" title=${badge.tooltip}
                      >${badge.label}</span
                    >`
                )
              : usage_label
                ? html`<span
                    class="worker-usage"
                    title=${usageTooltip(item.usage, usage_options)}
                    >${usage_label}</span
                  >`
                : ''}
          </div>`
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
 * Remaining ms — 이 대기 행의 유예가 끝나기까지 (UI-q1tg §3.3). 판정 재료는 `added_at`
 * 하나다 — `grace_period` admission 레코드를 쓰지 않는 이유는, 슬롯이 없어 tick이
 * 다시 돌지 않으면 만료된 레코드가 남아 `0초`와 버튼이 계속 서기 때문이다.
 * 레코드는 서버가 왜 넘겼는지의 기록이고 화면의 진실은 시각 계산이다. 재료가
 * 없으면 0이다 (fail-quiet).
 *
 * @param {number|null|undefined} added_at
 * @param {number} now
 * @returns {number}
 */
export function graceRemainingMs(added_at, now) {
  return typeof added_at === 'number' ? added_at + QUEUE_GRACE_MS - now : 0;
}

/**
 * The 게이트 칩 — 슬롯 4a 판정 칩 (UI-01wh §3.2). 줄 맨 앞에 선다: "왜 못 가나"의
 * 가장 바깥 사정이 큐 전체의 사정이기 때문이다. 클릭은 사유 팝업이고 칩은 상태를
 * 쓰지 않는다 (칩 문법 §4.5). 재료가 없으면 그리지 않는다 (fail-quiet).
 *
 * @param {import('./lane-model.js').LaneGate|null|undefined} gate - 이 행을 막고
 * 있는 게이트 투영, 막혀 있지 않으면 null.
 * @param {string} bead_id - 이 행의 이슈 ID. 팝업 열림 키의 한 축이고 클릭
 * 핸들러가 `closest('[data-bead-id]')`로 읽는 좌표다.
 * @param {boolean} open
 * @returns {import('lit-html').TemplateResult|''}
 */
export function gateChipTemplate(gate, bead_id, open) {
  if (!gate) {
    return '';
  }
  return html`<button
    type="button"
    class="worker-dep worker-dep--gate worker-dep--gate-${gate.kind} judgement-chip"
    data-chip-key="gate"
    data-bead-id=${bead_id}
    aria-expanded=${open ? 'true' : 'false'}
    title=${gate.title}
  >
    ${gate.label}
  </button>`;
}

/**
 * The 유예 칩 `⏳ <n>초` — 슬롯 4a다 (UI-q1tg §3.3, 카드 문법 §5.1 정정): 답하는
 * 질문이 `⛓ 선행 대기`와 같은 "지금 갈 수 있나"다. `⛔` 접두를 쓰지 않는 것은
 * `prerequisite_unmet`과 같은 이유다 — 거절이 아니라 곧 스스로 풀리는 진단이므로
 * danger 스타일을 타서는 안 된다. 남은 초가 0 이하면 그리지 않는다.
 *
 * 자동 진행이 꺼진 저장소의 행(`manual_only === true`)에는 그리지 않는다
 * (UI-3pu9 §4.2): 스케줄러가 자동 출발 자체를 하지 않으므로 "남은 시간 동안
 * 자동 실행이 미뤄집니다"가 사실이 아니다.
 *
 * @param {{ added_at?: number|null, manual_only?: boolean }|null|undefined} item
 * @param {number} [now]
 * @returns {import('lit-html').TemplateResult|''}
 */
export function graceChipTemplate(item, now = Date.now()) {
  if (!item || item.manual_only === true) {
    return '';
  }
  const remaining_ms = graceRemainingMs(item.added_at, now);
  if (remaining_ms <= 0) {
    return '';
  }
  return html`<span
    class="worker-dep worker-dep--grace"
    title="대기에 막 들어온 항목입니다 — 남은 시간 동안 자동 실행이 미뤄집니다"
    >⏳ ${Math.ceil(remaining_ms / 1000)}초</span
  >`;
}

/**
 * `[지금 시작]` — 슬롯 1 조작이다 (UI-q1tg §3.3). 클릭은 WS op
 * `worker-queue-start-now`로 그 행 하나의 유예를 걷는다. 새 권한이 아니라
 * `▶ 진행`과 같은 명시적 실행 경로의 행 단위 진입점이며, `added_at`을 과거로
 * 내리지 않는다.
 *
 * 서는 조건은 둘이다 (UI-01wh §3.3): 유예 중이거나, 게이트에 막혀 있거나.
 * 게이트로 설 때는 이 행 하나가 공급자 보류를 무시하고 지금 도는
 * 결정이므로 title이 그것을 말한다. 둘 다 아니면 그리지 않는다 (fail-quiet).
 *
 * 자동 진행이 꺼진 저장소의 행(`manual_only === true`)에서는 유예 조건이
 * 성립하지 않는다 (UI-3pu9 §4.2). 게이트 조건은 그대로라 공급자 보류에
 * 막힌 행은 자동 진행이 꺼져 있어도 버튼을 유지한다.
 *
 * 직렬 레인은 순서대로 쌓이므로 (직렬 레인 순서 고정 스펙 §6.2·§8.3) 선두가
 * 아닌 직렬 행에는 어느 생성 경로에서도 버튼이 서지 않는다 — 눌러도 후보 수집이
 * `serial_lane_not_head`로 거절할 자리다. 순번을 모르면 지우지 않는다
 * (fail-closed). 유예 칩·게이트 칩 자체는 그대로 그린다.
 *
 * @param {{ id: string, added_at?: number, lane?: string, queue_index?: number, manual_only?: boolean, gate?: import('./lane-model.js').LaneGate }} item
 * @param {number} [now]
 * @returns {import('lit-html').TemplateResult|''}
 */
export function startNowButtonTemplate(item, now = Date.now()) {
  if (
    typeof item.lane === 'string' &&
    /^s[1-5]$/.test(item.lane) &&
    typeof item.queue_index === 'number' &&
    item.queue_index > 0
  ) {
    return '';
  }
  const gated = !!item.gate;
  const in_grace =
    item.manual_only !== true && graceRemainingMs(item.added_at, now) > 0;
  if (!in_grace && !gated) {
    return '';
  }
  return html`<button
    type="button"
    class="op-btn worker-mini__start-now"
    data-action="queue-start-now"
    data-bead-id=${item.id}
    title=${gated
      ? '공급자 보류를 이 행에 대해서만 무시하고 지금 실행합니다'
      : '대기 진입 유예를 이 항목에 대해서만 걷고 지금 실행합니다'}
  >
    지금 시작
  </button>`;
}

/**
 * `↻ 지금 프로브` 거부 사유의 한 줄 (UI-o5ll §3.4) — Worker·Monitor 두 탭이 같은
 * 문구를 쓴다. 모르는 토큰은 raw로 흘려보낸다.
 *
 * @param {unknown} reason
 * @returns {string}
 */
export function providerProbeRefusalText(reason) {
  if (reason === 'hold_changed') {
    return '공급자 상태가 바뀌었습니다 — 다시 확인하세요';
  }
  if (reason === 'probe_in_flight') {
    return '프로브가 이미 돌고 있습니다';
  }
  if (reason === 'probe_ineligible') {
    return '지금 찌를 수 있는 대상이 없습니다';
  }
  return typeof reason === 'string' ? reason : '';
}

/**
 * `↻ 지금 프로브` — 공급자 보류의 출구 (UI-o5ll §3.4). 클릭은
 * 그 러너의 회복 프로브를 지금 발화시키고 target은 지우지 않는다 — 판정자는
 * 여전히 프로브다. 재료(`since`·`runner`·`probe_ready`)가 하나라도 없으면 그리지
 * 않는다 (fail-quiet). 중복 클릭은 서버의 in-flight 술어가 흡수한다.
 *
 * 대기 행에서 이 버튼이 사는 자리는 슬롯 1 조작이 아니라 슬롯 4a 게이트 칩이
 * 여는 팝업의 출구 줄이다 (UI-pw2g §3.4). 실행 중 타일은 게이트 칩이 없으므로
 * `wait_reasons`의 `probe_now` 조작을 그대로 머리줄에 싣는다.
 *
 * @param {{ gate?: Pick<import('./lane-model.js').LaneGate, 'kind'|'since'|'runner'|'probe_ready'> }} item
 * @returns {import('lit-html').TemplateResult|''}
 */
export function providerProbeButtonTemplate(item) {
  const gate = item.gate;
  if (
    !gate ||
    (gate.kind !== 'provider_outage' && gate.kind !== 'provider_usage') ||
    typeof gate.since !== 'number' ||
    typeof gate.runner !== 'string' ||
    gate.probe_ready !== true
  ) {
    return '';
  }
  return html`<button
    type="button"
    class="op-btn worker-mini__provider-probe"
    data-action="provider-probe-now"
    data-since=${gate.since}
    data-runner=${gate.runner}
    title="공급자 회복 프로브를 지금 실행합니다 (러너 전체) — 통과하면 보류가 풀립니다"
  >
    ↻ 지금 프로브
  </button>`;
}

/**
 * Display the server verdict in the §5.1 shape — kind label plus verdict
 * glyph — without interpreting the server's thresholds. The vocabulary table
 * owns every word, so the 상세 패널 dependency section and the 막힘 popover read
 * the same badge the card draws.
 *
 * @param {import('../../protocol.js').WaitReason} reason
 * @param {{ now?: number, label?: string }} [clocks]
 * @returns {string}
 */
export function waitVerdictLabel(reason, clocks = {}) {
  const row = waitKindRow(reason);
  return waitBadgeText(row, reason.verdict, {
    since: reason.since,
    now: clocks.now,
    ...(clocks.label ? { label: clocks.label } : {})
  });
}

/**
 * The `범례 보기` link every wait popup ends with (§6.2). The click handler is
 * global (`[data-help-anchor]` delegation) so the card never owns the dialog.
 *
 * @param {string} anchor_id - The vocabulary row `id` this card drew.
 * @returns {import('lit-html').TemplateResult}
 */
function legendLinkTemplate(anchor_id) {
  return html`<button
    type="button"
    class="wait-verdict__legend"
    data-help-anchor=${anchor_id}
  >
    범례 보기
  </button>`;
}

/**
 * The wait badge's popup body (§6.2). It mirrors `chipPopoverTemplate` markup
 * so both popups share one stylesheet, and adds the legend link as the last
 * row — a plain string list cannot carry a button.
 *
 * @param {string} title
 * @param {string[]} lines
 * @param {string} anchor_id
 * @returns {import('lit-html').TemplateResult}
 */
function waitPopoverTemplate(title, lines, anchor_id) {
  return html`<div class="chip-popover" role="dialog" aria-label=${title}>
    <div class="chip-popover__title">${title}</div>
    <ul class="chip-popover__lines">
      ${lines.map((line) => html`<li>${line}</li>`)}
      <li>${legendLinkTemplate(anchor_id)}</li>
    </ul>
  </div>`;
}

/**
 * @typedef {Object} WaitBadgeMaterial
 * @property {'parked'|'retry_wait'|'waiting'|'provider_hold'|null} [held_kind] -
 * The held projection kind of a running tile; queue rows pass nothing.
 * @property {{ cause?: string|null, recovery?: { label?: string|null, sentence?: string|null }|null }|null} [held]
 * @property {Record<string, any>|null} [hold] - `HoldTile` for `provider_hold`.
 * @property {import('../../protocol.js').WaitReason[]} [wait_reasons]
 * @property {import('../../protocol.js').WaitReason|null} [reason] - An
 * explicit reason that bypasses the representative rule (외부 작업 행).
 * @property {string} [label] - A label the card knows better than the table
 * (`retry_wait`의 회차·예약 시각).
 * @property {number} [now]
 */

/**
 * Map one held projection onto its vocabulary row id (§6.2). `null` means the
 * tile carries no held kind, so the representative reason decides.
 *
 * @param {WaitBadgeMaterial} material
 * @returns {string|null}
 */
function heldRowId(material) {
  const kind = material.held_kind || null;
  if (kind === 'parked') {
    return 'awaiting_user';
  }
  if (kind === 'retry_wait') {
    return 'retry_wait';
  }
  if (kind === 'provider_hold') {
    return 'provider_hold';
  }
  if (kind !== 'waiting') {
    return null;
  }
  const wait = material.held || null;
  if (wait?.recovery) {
    return 'recovery';
  }
  return 'prerequisite';
}

/**
 * The ONE slot-1 wait badge of a card (§6.2). The kind label comes from the
 * held projection when there is one, and the verdict from the reason of that
 * same kind — a missing reason draws the kind alone, because absence is not
 * `normal` (§5.1 fail-quiet). No material draws nothing.
 *
 * @param {WaitBadgeMaterial} material
 * @returns {import('lit-html').TemplateResult|''}
 */
export function waitStatusBadge(material) {
  const now = typeof material.now === 'number' ? material.now : Date.now();
  const reasons = (material.wait_reasons || []).filter(
    (reason) => waitScopeOf(reason.kind) === 'bead'
  );
  // 외부 작업은 소비자 Bead의 record 사유를 직접 건네므로 대표 사유 규칙 밖이다.
  if (material.reason) {
    const forced_row = waitKindRow(material.reason);
    return forced_row
      ? waitBadgeTemplate(forced_row, material.reason, [], null, now)
      : '';
  }
  const held_row_id = heldRowId(material);
  const held_row = held_row_id ? waitKindRow({ kind: held_row_id }) : null;
  /** @type {import('../../protocol.js').WaitReason|null} */
  let reason = null;
  /** @type {import('./wait-vocabulary.js').WaitKindRow|null} */
  let badge_row = held_row;
  if (held_row) {
    const same_kind = reasons.filter(
      (entry) => waitKindRow(entry) === held_row
    );
    reason = /** @type {import('../../protocol.js').WaitReason|null} */ (
      representativeWaitReason(same_kind)
    );
  } else {
    reason = /** @type {import('../../protocol.js').WaitReason|null} */ (
      representativeWaitReason(reasons)
    );
    badge_row = waitKindRow(reason);
  }
  if (!badge_row) {
    return '';
  }
  return waitBadgeTemplate(
    badge_row,
    reason,
    reasons.filter((entry) => entry !== reason),
    material.hold || null,
    now,
    {
      label: material.label || badge_row.label
    }
  );
}

/**
 * The external-work guidance sentences UI-7341 drew in the card body — now
 * popup lines (§7.3), under the same verdict conditions.
 *
 * @param {import('../../protocol.js').WaitReason} reason
 * @returns {string[]}
 */
function externalGuidanceLines(reason) {
  if (reason.kind !== 'external_job') {
    return [];
  }
  return [
    reason.verdict === 'overdue'
      ? '[지금 확인]으로 관측기를 지금 실행하거나 관측기 상태를 점검하세요'
      : '',
    reason.verdict_reason?.code === 'job_failed'
      ? '원래 이슈가 재개되면 복구 판단이 필요합니다'
      : ''
  ].filter(Boolean);
}

/**
 * Draw one `.wait-verdict` badge and its popup from an already chosen row.
 *
 * @param {import('./wait-vocabulary.js').WaitKindRow} row
 * @param {import('../../protocol.js').WaitReason|null} reason - The verdict
 * source; `null` draws the kind alone with the 대기 종류 popup (§6.2).
 * @param {import('../../protocol.js').WaitReason[]} others - The other
 * bead-scope reasons this card carries, one popup line each.
 * @param {Record<string, any>|null} hold - `HoldTile` for provider holds.
 * @param {number} now
 * @param {{ label?: string, release?: string }} [overrides]
 * @returns {import('lit-html').TemplateResult|''}
 */
function waitBadgeTemplate(row, reason, others, hold, now, overrides = {}) {
  const label = overrides.label || row.label;
  if (!label) {
    return '';
  }
  const text = waitBadgeText(row, reason ? reason.verdict : null, {
    since: reason?.since,
    now,
    label
  });
  if (!text) {
    return '';
  }
  const other_lines = others
    .map((entry) => {
      const other_row = waitKindRow(entry);
      if (!other_row) {
        return '';
      }
      return `${[other_row.glyph, other_row.label].filter(Boolean).join(' ')} — ${entry.headline}`;
    })
    .filter(Boolean);
  // 공급자 보류의 상세는 배지에서 팝업으로 내려왔다 (§5.2 정정) — 종전 별도
  // 팝오버가 싣던 사실을 하나도 잃지 않는다.
  const provider_lines =
    row.kind === 'provider_hold' && hold
      ? [
          '작업 실패 아님',
          typeof hold.summary === 'string' ? hold.summary : '',
          typeof hold.message === 'string' ? hold.message : '',
          [
            hold.target?.model,
            hold.target?.account_alias || hold.target?.account
          ]
            .filter((value) => typeof value === 'string' && value.length > 0)
            .join(' · '),
          providerClock(hold.resets_at)
            ? `리셋 ${formatClockLocal(hold.resets_at, now)}`
            : '',
          providerClock(hold.next_probe_at)
            ? `다음 프로브 ${formatClockLocal(hold.next_probe_at, now)}`
            : '',
          autoResumeText(hold.auto_resume),
          autoSwitchText(hold.auto_switch),
          typeof hold.live_preempt_skipped_at === 'number'
            ? `전환 후보 없음 · ${formatRelativeTime(hold.live_preempt_skipped_at)}`
            : '',
          typeof hold.log_path === 'string' ? hold.log_path : ''
        ].filter(Boolean)
      : [];
  const lines = reason
    ? [
        reason.verdict === 'normal' ? '' : reason.verdict_reason?.message || '',
        reason.release || row.release,
        reason.since ? `대기 시작 ${formatClockLocal(reason.since, now)}` : '',
        reason.next_check_at
          ? `다음 확인 ${formatClockLocal(reason.next_check_at, now)}`
          : '',
        reason.resets_at
          ? `리셋 ${formatClockLocal(reason.resets_at, now)}`
          : '',
        ...provider_lines,
        ...externalGuidanceLines(reason),
        ...(other_lines.length > 0
          ? [`다른 사유 ${other_lines.length}`, ...other_lines]
          : [])
      ].filter(Boolean)
    : [overrides.release || row.release, ...provider_lines].filter(Boolean);
  return html`<details class="wait-verdict" @click=${stopWaitClick}>
    <summary
      class="worker-mini__badge"
      data-verdict=${ifDefined(reason ? reason.verdict : undefined)}
      title=${row.when}
    >
      ${text}
    </summary>
    ${waitPopoverTemplate(
      reason ? '대기 판정 근거' : '대기 종류',
      /** @type {string[]} */ (lines),
      row.id
    )}
  </details>`;
}

/**
 * Keep informational clicks inside their popup instead of opening the card.
 *
 * @param {Event} event
 */
function stopWaitClick(event) {
  event.stopPropagation();
}

/**
 * The 시각 줄 text (UI-0bvr §5.2): `<경과> <elapsed_word>[ · <다음 조각>]`.
 * 낱말은 어휘 표가 종류별로 소유하므로 범례와 카드가 갈라지지 않고, 재료가 없는
 * 조각은 그리지 않는다 (fail-quiet) — 두 조각이 다 비면 줄 자체가 서지 않는다.
 *
 * @param {import('../../protocol.js').WaitReason} reason
 * @param {number} now_ms
 * @returns {string}
 */
function waitTimesText(reason, now_ms) {
  const row = waitKindRow(reason);
  if (!row) {
    return '';
  }
  const elapsed = row.elapsed_word
    ? formatElapsedSince(reason.since, now_ms)
    : '';
  const reset = formatClockLocal(reason.resets_at, now_ms);
  const next = row.next_word
    ? formatClockLocal(reason.next_check_at, now_ms)
    : '';
  return [
    elapsed ? `${elapsed} ${row.elapsed_word}` : '',
    reset ? `리셋 ${reset}` : next ? `${row.next_word} ${next}` : ''
  ]
    .filter(Boolean)
    .join(' · ');
}

/**
 * Separate WaitReason fragments by the shared card slots. Existing operations
 * need their original projection; missing operation material stays absent.
 *
 * @param {import('../../protocol.js').WaitReason|null|undefined} reason
 * @param {{ item?: MiniItem, external_wait?: import('../../protocol.js').ExternalWaitObservation, now?: number, last_observed_at?: number|null, session_preferred?: boolean }} [options]
 */
export function waitReasonLines(reason, options = {}) {
  if (!reason) {
    return { badge: '', body: '', actions: '', times: '' };
  }
  const now_ms = options.now ?? Date.now();
  const external = reason.kind === 'external_job';
  const record = options.external_wait || options.item?.external_wait;
  const label = external
    ? externalWaitBadgeText(reason, record)
    : waitVerdictLabel(reason, { now: now_ms });
  const since = formatClockLocal(reason.since, now_ms);
  const next = formatClockLocal(reason.next_check_at, now_ms);
  const reset = formatClockLocal(reason.resets_at, now_ms);
  const observed =
    options.last_observed_at === undefined
      ? since
      : formatClockLocal(options.last_observed_at, now_ms);
  const countdown =
    reason.kind === 'provider_hold' &&
    reason.verdict === 'normal' &&
    typeof reason.resets_at === 'number' &&
    reason.resets_at > (options.now ?? Date.now())
      ? ` · 리셋까지 ${Math.ceil((reason.resets_at - (options.now ?? Date.now())) / 60000)}분`
      : '';
  const evidence = [
    reason.verdict_reason?.message,
    since ? `대기 시작 ${since}` : '',
    next ? `다음 확인 ${next}` : '',
    reset ? `리셋 ${reset}` : ''
  ].filter(Boolean);
  // 상세 패널만 `last_observed_at`을 넘긴다 (§11): 그 화면의 `확인`은 실제 마지막
  // 관측 시각이라 종류별 낱말 규칙(§5.2) 밖이다.
  const observed_line = options.last_observed_at !== undefined;
  const times_text =
    external && record
      ? externalWaitTimes(record, now_ms)
      : observed_line
        ? reset
          ? `리셋 ${reset}`
          : [observed ? `확인 ${observed}` : '', next ? `다음 ${next}` : '']
              .filter(Boolean)
              .join(' · ')
        : waitTimesText(reason, now_ms);
  const times_title =
    !observed_line && reason.since
      ? `대기 시작 ${formatTimestampLocal(reason.since)}`
      : '';
  const item = options.item;
  const actions = (reason.actions || []).map((action) => {
    const payload = action.payload;
    if (
      [
        'external_wait_check',
        'external_wait_stop',
        'external_wait_resume'
      ].includes(action.op) &&
      payload.wait_id &&
      payload.root_dir
    ) {
      // `session-preferred` Bead는 세션에서 잇는 쪽이 1순위다 (UI-l48z §4.3).
      const primary =
        action.op === 'external_wait_resume' &&
        payload.mode === 'fork' &&
        options.session_preferred !== true;
      return html`<button
        type="button"
        class="op-btn${primary ? ' op-btn--primary' : ''} external-wait__action"
        title=${ifDefined(action.title || undefined)}
        data-external-wait-op=${action.op}
        data-wait-id=${payload.wait_id}
        data-root-dir=${payload.root_dir}
        data-mode=${ifDefined(payload.mode)}
        data-bead-id=${ifDefined(payload.bead_id)}
      >
        ${action.label.replace(/^\[|\]$/g, '')}
      </button>`;
    }
    if (action.op === 'probe_now') {
      return providerProbeButtonTemplate(
        item?.gate &&
          ['provider_usage', 'provider_outage'].includes(item.gate.kind)
          ? item
          : {
              gate: {
                kind: 'provider_outage',
                since: reason.since ?? null,
                runner: payload.runner,
                probe_ready: true
              }
            }
      );
    }
    return '';
  });
  return {
    badge: label
      ? html`<details class="wait-verdict" @click=${stopWaitClick}>
          <summary class="worker-mini__badge" data-verdict=${reason.verdict}>
            ${label}${countdown}
          </summary>
          ${chipPopoverTemplate({
            title: '대기 판정 근거',
            lines: /** @type {string[]} */ (evidence)
          })}
        </details>`
      : '',
    // 슬롯 3은 headline 한 줄이다 (§6.3): `release`와 안내문은 배지 팝업이 싣는다.
    body:
      reason.headline || (external && (reason.release || reason.error))
        ? html`<div class="wait-reason__lines">
            ${reason.headline
              ? html`<div class="wait-reason__headline">
                  ${external && record?.jobs.length === 1
                    ? reason.headline.replace(/ · 경과 .*$/, '') +
                      externalElapsed(
                        record.jobs[0].submitted_at,
                        record.completion?.completed_at,
                        now_ms
                      )
                    : reason.headline}
                </div>`
              : ''}
            ${external && reason.release
              ? html`<div class="wait-reason__release">${reason.release}</div>`
              : ''}
            ${external && reason.error
              ? html`<div class="wait-reason__error">${reason.error}</div>`
              : ''}
          </div>`
        : '',
    actions: actions.some((action) => action !== '') ? html`${actions}` : '',
    times: times_text
      ? html`<div
          class="worker-mini__times wait-reason__times"
          title=${times_title}
        >
          ${times_text}
        </div>`
      : ''
  };
}

/** 선행 대기의 두 종류. 막힘 집계의 간접 선행 규칙이 읽는다 (UI-0bvr §6.2). */
const PREREQUISITE_KINDS = Object.freeze([
  'prerequisite',
  'prerequisite_foreign'
]);

/**
 * The nodes of a directed graph that sit on at least one cycle, in one
 * traversal (Tarjan): a strongly connected component larger than one node is a
 * cycle, and so is a self edge. `low`가 자기 `index`와 같아지는 자리에서 스택에
 * 남은 구간이 그 component다.
 *
 * @param {Map<string, string[]>} graph
 * @returns {Set<string>}
 */
function cyclicNodes(graph) {
  const nodes = [...graph.keys()];
  /** @type {Map<string, number>} */
  const id_of = new Map();
  nodes.forEach((node, id) => id_of.set(node, id));
  /** @type {number[][]} */
  const edges = nodes.map(() => []);
  nodes.forEach((node, id) => {
    for (const next of graph.get(node) || []) {
      const target = id_of.get(next);
      if (target !== undefined) {
        edges[id].push(target);
      }
    }
  });
  const index = nodes.map(() => -1);
  const low = nodes.map(() => 0);
  const on_stack = nodes.map(() => false);
  /** @type {number[]} */
  const stack = [];
  /** @type {Set<string>} */
  const cyclic = new Set();
  let next_index = 0;
  const enter = (/** @type {number} */ node) => {
    index[node] = next_index;
    low[node] = next_index;
    next_index += 1;
    stack.push(node);
    on_stack[node] = true;
  };
  for (let root = 0; root < nodes.length; root++) {
    if (index[root] >= 0) {
      continue;
    }
    enter(root);
    /** @type {Array<{ node: number, edge: number }>} */
    const frames = [{ node: root, edge: 0 }];
    while (frames.length > 0) {
      const frame = frames[frames.length - 1];
      if (frame.edge < edges[frame.node].length) {
        const next = edges[frame.node][frame.edge];
        frame.edge += 1;
        if (next === frame.node) {
          cyclic.add(nodes[next]);
        } else if (index[next] < 0) {
          enter(next);
          frames.push({ node: next, edge: 0 });
        } else if (on_stack[next]) {
          low[frame.node] = Math.min(low[frame.node], index[next]);
        }
        continue;
      }
      frames.pop();
      if (frames.length > 0) {
        const parent = frames[frames.length - 1].node;
        low[parent] = Math.min(low[parent], low[frame.node]);
      }
      if (low[frame.node] !== index[frame.node]) {
        continue;
      }
      /** @type {number[]} */
      const component = [];
      for (;;) {
        const member = stack.pop();
        if (member === undefined) {
          break;
        }
        on_stack[member] = false;
        component.push(member);
        if (member === frame.node) {
          break;
        }
      }
      if (component.length > 1) {
        for (const member of component) {
          cyclic.add(nodes[member]);
        }
      }
    }
  }
  return cyclic;
}

/**
 * The subjects an upstream row already represents (UI-0bvr §6.2). `막힘 N`이
 * 답하는 질문은 "지금 손댈 곳이 몇 군데인가"이므로, 열린 선행이 **전부** 같은
 * 워크스페이스의 다른 막힌 행이고 **어떤 순환에도 속하지 않는** 이슈는 그 선행
 * 사유를 집계와 요약 목록에서 잃는다 — 상류를 풀면 함께 풀리고 그 상류 행이 이미
 * 같은 막힘을 대표한다. 대표되는 것은 선행 사유뿐이라 다른 종류의 사유가 남은
 * 이슈는 그 사유로 계속 센다. 순환은 상류가 없어 그 자체가 손댈 곳이므로 순환에
 * 속한 행은 전부 남는다. 다른 저장소 선행은 이 집합에 들어올 수 없어 그 사유는
 * 언제나 셈에 남는다.
 *
 * @param {Map<string, { root_dir: string, reasons: import('../../protocol.js').WaitReason[] }>} subjects
 * @returns {Set<string>}
 */
function upstreamCoveredSubjects(subjects) {
  /** @type {Map<string, string[]>} */
  const open_prerequisites = new Map();
  for (const [key, entry] of subjects) {
    const prerequisites = entry.reasons.filter((reason) =>
      PREREQUISITE_KINDS.includes(reason.kind)
    );
    if (prerequisites.length === 0) {
      continue;
    }
    open_prerequisites.set(
      key,
      prerequisites.flatMap((reason) =>
        (reason.targets || [])
          .filter((target) => target.kind === 'issue')
          .map((target) => `${entry.root_dir}\u0000${target.id}`)
      )
    );
  }
  /** @type {Map<string, string[]>} */
  const graph = new Map();
  for (const [key, targets] of open_prerequisites) {
    graph.set(
      key,
      targets.filter((target) => open_prerequisites.has(target))
    );
  }
  const cyclic = cyclicNodes(graph);
  /** @type {Set<string>} */
  const covered = new Set();
  for (const [key, targets] of open_prerequisites) {
    if (
      targets.length > 0 &&
      !cyclic.has(key) &&
      targets.every((target) => open_prerequisites.has(target))
    ) {
      covered.add(key);
    }
  }
  return covered;
}

/**
 * Count original issues once, including within each displayed group.
 *
 * @param {Array<{ root_dir: string, name?: string, wait_reasons?: import('../../protocol.js').WaitReason[] }>} workspaces
 */
export function blockedSummary(workspaces) {
  /** @type {Map<string, { root_dir: string, id: string, name: string, reasons: import('../../protocol.js').WaitReason[] }>} */
  const subjects = new Map();
  for (const workspace of workspaces) {
    for (const reason of workspace.wait_reasons || []) {
      if (reason.subject.root_dir !== workspace.root_dir) {
        continue;
      }
      const key = `${workspace.root_dir}\u0000${reason.subject.bead_id}`;
      const entry = subjects.get(key) || {
        root_dir: workspace.root_dir,
        id: reason.subject.bead_id,
        name: workspace.name || workspace.root_dir,
        reasons: []
      };
      entry.reasons.push(reason);
      subjects.set(key, entry);
    }
  }
  const covered = upstreamCoveredSubjects(subjects);
  // 상류 행이 대표하는 것은 그 이슈의 선행 사유뿐이다 (§6.2). 선행 사유만 떨구고
  // 다른 종류가 남은 이슈는 건수와 그 그룹에 그대로 서며, `action_count`도 남은
  // 사유로만 판정한다 — 떨궈진 선행이 조치 필요였다고 세어지지 않는다.
  const entries = [...subjects]
    .map(([key, entry]) =>
      covered.has(key)
        ? {
            ...entry,
            reasons: entry.reasons.filter(
              (reason) => !PREREQUISITE_KINDS.includes(reason.kind)
            )
          }
        : entry
    )
    .filter((entry) => entry.reasons.length > 0);
  const groups = [
    { label: '외부 작업', kinds: ['external_job'] },
    { label: '선행', kinds: ['prerequisite', 'prerequisite_foreign'] },
    { label: '공급자', kinds: ['provider_hold'] },
    { label: '세션이 멈춤', kinds: ['awaiting_user', 'recovery'] },
    { label: '재시도', kinds: ['retry_wait'] }
  ]
    .map((group) => ({
      label: group.label,
      entries: entries
        .map((entry) => ({
          ...entry,
          reasons: entry.reasons.filter((reason) =>
            group.kinds.includes(reason.kind)
          )
        }))
        .filter((entry) => entry.reasons.length > 0)
    }))
    .filter((group) => group.entries.length > 0);
  return {
    count: entries.length,
    action_count: entries.filter((entry) =>
      entry.reasons.some((reason) => reason.verdict === 'action_required')
    ).length,
    groups,
    queue_line: []
  };
}

/**
 * The `<dialog>` a 막힘 요약 chip owns — its sibling inside `.wait-summary`.
 *
 * @param {EventTarget|null} node
 * @returns {HTMLDialogElement|null}
 */
function waitSummaryDialogOf(node) {
  const source = node instanceof Element ? node.closest('.wait-summary') : null;
  return /** @type {HTMLDialogElement|null} */ (
    source ? source.querySelector('dialog.wait-summary__dialog') : null
  );
}

/**
 * Open the 막힘 요약 in the browser's top layer (§8). `showModal`이 없는
 * 런타임(jsdom)에서는 보드 탭 팝업과 같은 `open` 속성 갈래로 떨어진다.
 *
 * @param {Event} event
 */
function openWaitSummary(event) {
  event.stopPropagation();
  const dialog = waitSummaryDialogOf(event.currentTarget);
  if (!dialog || dialog.open) {
    return;
  }
  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    dialog.setAttribute('open', '');
  }
}

/**
 * @param {HTMLDialogElement|null} dialog
 */
function closeWaitSummary(dialog) {
  if (!dialog) {
    return;
  }
  if (typeof dialog.close === 'function') {
    dialog.close();
  } else {
    dialog.removeAttribute('open');
  }
}

/**
 * ESC(`cancel`)와 배경 클릭이 이 다이얼로그의 닫기다 (§8). 배경 판정은 보드 탭과
 * 같다 — 이벤트 target이 dialog 자신일 때만 배경이고, 안에서 올라온 클릭은 닫지
 * 않는다.
 *
 * @param {Event} event
 */
function dismissWaitSummary(event) {
  if (event.type === 'click' && event.target !== event.currentTarget) {
    return;
  }
  closeWaitSummary(/** @type {HTMLDialogElement} */ (event.currentTarget));
}

/**
 * Reveal and highlight the exact workspace card without changing queue order.
 *
 * @param {Event} event
 * @param {string} root_dir
 * @param {string} bead_id
 * @param {import('../../protocol.js').WaitReason} reason
 * @param {((root_dir: string, bead_id: string) => void)|undefined} reveal
 */
function scrollToWaitCard(event, root_dir, bead_id, reason, reveal) {
  event.stopPropagation();
  const source = /** @type {HTMLElement} */ (event.currentTarget);
  const scope = source.closest('.worker-console, .mon') || source.ownerDocument;
  // 모달은 포커스를 가두므로 카드로 데려가기 전에 먼저 닫는다 (§8).
  closeWaitSummary(waitSummaryDialogOf(source));
  const target_ids = [bead_id];
  /** @type {Element|undefined} */
  let card;
  for (const target_id of target_ids) {
    if (reveal) {
      reveal(root_dir, target_id);
    }
    card = Array.from(
      scope.querySelectorAll('.worker-mini, .rtile, .worker-card')
    ).find(
      (entry) =>
        entry.getAttribute('data-bead-id') === target_id &&
        entry.closest('[data-root-dir]')?.getAttribute('data-root-dir') ===
          root_dir
    );
    if (card) {
      break;
    }
  }
  if (!(card instanceof HTMLElement)) {
    return;
  }
  for (let parent = card.parentElement; parent; parent = parent.parentElement) {
    if (parent instanceof HTMLDetailsElement) {
      parent.open = true;
    }
  }
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  card.classList.add('wait-reason--highlight');
  card.setAttribute('tabindex', '-1');
  card.focus({ preventScroll: true });
  setTimeout(() => card.classList.remove('wait-reason--highlight'), 2000);
}

/**
 * One 요약 팝오버 항목 줄의 사유 문장 (§4.2). `headline`이 있으면 그것이고, 선행
 * 대기처럼 비어 있으면 그 사유의 이슈 target으로 조립한다 — 첫 ID 하나와, 둘
 * 이상이면 남은 수. 재료가 없으면 빈 문자열이다 (fail-quiet).
 *
 * @param {import('../../protocol.js').WaitReason} reason
 * @returns {string}
 */
function waitSummaryItemLine(reason) {
  if (reason.headline) {
    return reason.headline;
  }
  const targets = (reason.targets || []).filter(
    (target) => target.kind === 'issue'
  );
  if (targets.length === 0) {
    return '';
  }
  const rest = targets.length - 1;
  return `선행 ${targets[0].id}${rest > 0 ? ` 외 ${rest}` : ''}`;
}

/**
 * Shared Worker/Monitor summary and its grouped navigation popup.
 *
 * @param {Parameters<typeof blockedSummary>[0]} workspaces
 * @param {(root_dir: string, bead_id: string) => void} [reveal]
 */
export function blockedSummaryTemplate(workspaces, reveal) {
  const summary = blockedSummary(workspaces);
  if (summary.count === 0) {
    return '';
  }
  return html`<span class="wait-summary" @click=${stopWaitClick}>
    <button
      type="button"
      class="worker-kpi__chip"
      aria-haspopup="dialog"
      @click=${openWaitSummary}
    >
      ${summaryChipPrefix('blocked')}
      ${summary.count}${summary.action_count > 0
        ? html` ·
            <span class="wait-summary__action"
              >⛔ ${summary.action_count}</span
            >`
        : ''}
    </button>
    <dialog
      class="wait-summary__dialog"
      aria-label="막힘 요약"
      @click=${dismissWaitSummary}
      @cancel=${dismissWaitSummary}
    >
      <div class="wait-summary__popover">
        ${summary.groups.map(
          (group) =>
            html`<section>
              <strong>${group.label} ${group.entries.length}</strong>
              ${group.entries.map((entry) =>
                entry.reasons.map(
                  (reason) =>
                    html`<button
                      type="button"
                      class="wait-summary__item"
                      @click=${(/** @type {Event} */ event) =>
                        scrollToWaitCard(
                          event,
                          entry.root_dir,
                          entry.id,
                          reason,
                          reveal
                        )}
                    >
                      ${waitVerdictLabel(reason)} ${entry.name} ${entry.id} —
                      ${waitSummaryItemLine(reason)}
                    </button>`
                )
              )}
            </section>`
        )}
        ${summary.queue_line.length > 0
          ? html`<div class="wait-summary__queue">
              큐: ${summary.queue_line.join(' · ')}
            </div>`
          : ''}
      </div>
    </dialog>
  </span>`;
}

/**
 * The word a summary chip draws before its count — the vocabulary table owns
 * it (§5), so the legend and the real chip cannot drift apart.
 *
 * @param {string} id - A `SUMMARY_CHIPS` row id.
 * @returns {string}
 */
function summaryChipPrefix(id) {
  const row = SUMMARY_CHIPS.find((entry) => entry.id === id);
  return row ? row.prefix : '';
}

/**
 * The four summary chips both tabs draw (§8). Worker keeps its `base` chip and
 * Monitor its `세션 N` after them, so the shared part is exactly the part that
 * answers the same question on both screens. `막힘` draws only when something
 * is blocked (fail-quiet), and the long range label stays in the `title`.
 *
 * @param {Object} options
 * @param {number} options.running
 * @param {number} options.pr_wait
 * @param {number} options.done
 * @param {string} options.range_label - The long form (`최근 7일`).
 * @param {string} options.range_short - The chip form (`7일`).
 * @param {Parameters<typeof blockedSummary>[0]} options.workspaces
 * @param {(root_dir: string, bead_id: string) => void} [options.reveal]
 * @param {number} [options.session] - 세션 N, drawn only above zero.
 * @returns {import('lit-html').TemplateResult}
 */
export function summaryChipsTemplate(options) {
  const short = options.range_short || options.range_label;
  const done_prefix = summaryChipPrefix('done');
  return html`<span class="worker-kpi__chip worker-kpi__chip--running"
      >${summaryChipPrefix('running')} <b>${options.running}</b></span
    ><span
      class="worker-kpi__chip worker-kpi__chip--pr"
      title="PR 머지를 기다리는 이슈"
      >${summaryChipPrefix('pr_wait')} <b>${options.pr_wait}</b></span
    ><span
      class="worker-kpi__chip worker-kpi__chip--done"
      title=${`${options.range_label} ${done_prefix}`}
      >${short} ${done_prefix} <b>${options.done}</b></span
    >${blockedSummaryTemplate(
      options.workspaces,
      options.reveal
    )}${typeof options.session === 'number' && options.session > 0
      ? html`<span class="worker-kpi__chip worker-kpi__chip--session"
          >세션 <b>${options.session}</b></span
        >`
      : ''}`;
}

/**
 * Split one token/cost badge label into the wide and narrow forms (§8). The
 * narrow form keeps the provider and the money; a label without a parseable
 * cost stays whole, because dropping half of an unknown shape says less than
 * repeating it.
 *
 * @param {string} label
 * @returns {string}
 */
export function tokenChipShortText(label) {
  const text = typeof label === 'string' ? label : '';
  const cost = text.match(/≈?\$[\d.,]+/);
  if (!cost) {
    return text;
  }
  const provider = text.split(' ')[0] || '';
  const partial = text.includes('부분') ? ' · 부분' : '';
  return `${provider} ${cost[0]}${partial}`;
}

/**
 * The two-form token/cost chip body (§8): the media query shows exactly one.
 *
 * @param {string} label - The wide form, shown above 640px.
 * @param {string} [narrow_source] - The label the short form is derived from;
 * the wide form itself when the caller has no narrower source.
 * @returns {import('lit-html').TemplateResult}
 */
export function tokenChipTemplate(label, narrow_source) {
  return html`<span class="tok__full">${label}</span
    ><span class="tok__short"
      >${tokenChipShortText(narrow_source || label)}</span
    >`;
}

/**
 * Expand only the lane and area containing a summary subject before rendering.
 *
 * @param {import('./lane-model.js').LaneModel} model
 * @param {ReturnType<import('./lane-collapse.js').createLaneCollapse>} collapse
 * @param {string} root_dir
 * @param {string} bead_id
 */
export function expandWaitSubject(model, collapse, root_dir, bead_id) {
  const item = [
    ...model.queue,
    ...model.running,
    ...model.pr_wait,
    ...model.runnable,
    ...model.done
  ].find((entry) => entry.root_dir === root_dir && entry.id === bead_id);
  if (!item) {
    return;
  }
  const serial = /^s[1-5]$/.test(item.lane);
  const lane = serial
    ? 'queue'
    : item.lane === 'runnable'
      ? 'candidate'
      : item.lane;
  if (
    lane === 'queue' ||
    lane === 'running' ||
    lane === 'pr_wait' ||
    lane === 'candidate'
  ) {
    if (collapse.isCollapsed(lane)) {
      collapse.toggle(lane);
    }
  }
  const area = serial ? 'serial' : 'parallel';
  if (lane === 'queue' && collapse.isAreaCollapsed(area)) {
    collapse.toggleArea(area);
  }
}

/**
 * The 대기 행 조작 묶음 — 행 1번 줄 끝의 조작 슬롯이다 (UI-6g3t §4). Worker
 * `queueRowActions`와 Monitor `rowActions`가 같은 조각을 따로 들고 있어 두 탭의
 * 조작 밀도가 갈렸다 — Monitor 직렬 행에는 `✕`가 아예 없었다. 여기 하나로 합친다.
 *
 * `✕`는 병렬·직렬, 두 탭의 **모든** 대기 행에 선다. 그리지 않는 조건은 이미
 * 출발한 행 하나뿐이다. `↑ ↓`는 `nudgeable === true`일 때만 마크업에 있고 실제
 * 표시 여부는 지금처럼 CSS(coarse pointer · 640px 이하)가 소유한다 — Worker 탭은
 * nudge 핸들러가 없으므로 넘기지 않는다. 순서는 `↑ ↓ ✕` 고정이고 묶음이
 * `margin-left: auto`로 오른쪽에 붙으므로 `↑↓`가 나타나도 `✕`의 자리는 폭과
 * 무관하게 그대로다.
 *
 * 클릭 핸들러는 두 탭이 각자 남는다: Worker는 `[data-action="queue-remove"]`로,
 * Monitor `runRowAction`은 클래스로 분기한다. 드래그 컨트롤러가 이미 그렇게
 * 나뉘어 있는 것과 같은 경계다.
 *
 * @param {any} item
 * @param {{ nudgeable?: boolean }} [options]
 * @returns {import('lit-html').TemplateResult|undefined}
 */
export function queueRowOps(item, options = {}) {
  if (item.draggable !== true || item.done === true) {
    return undefined;
  }
  /** @type {Set<string>} */
  const action_keys = new Set();
  const wait_actions = (item.wait_reasons || []).map(
    (/** @type {import('../../protocol.js').WaitReason} */ reason) =>
      waitReasonLines(
        {
          ...reason,
          actions: reason.actions.filter((action) => {
            // `probe_now`는 이 슬롯을 떠났다 (UI-pw2g §3.4): 대기 행의 출구는 슬롯
            // 4a 게이트 칩 팝업이고, 여기 남기면 같은 조작이 두 자리에 선다.
            if (action.op === 'probe_now') {
              return false;
            }
            const key = `${action.op}:${action.payload.wait_id || action.payload.runner || ''}:${action.payload.mode || ''}`;
            if (action_keys.has(key)) {
              return false;
            }
            action_keys.add(key);
            return true;
          })
        },
        { item }
      ).actions
  );
  // 순서는 넓은 것(큐 전체) → 좁은 것(이 행) → 자리 조작 → 빼기다 (UI-01wh §3.3).
  return html`<span class="worker-mini__rowops">
    ${startNowButtonTemplate(item)}${wait_actions}${options.nudgeable === true
      ? html`<button
            type="button"
            class="op-btn op-btn--icon op-btn--ghost worker-mini__rowops-up"
            data-bead-id=${item.id}
            title="같은 레포 안에서 한 칸 위로"
            aria-label="한 칸 위로"
          >
            ↑
          </button>
          <button
            type="button"
            class="op-btn op-btn--icon op-btn--ghost worker-mini__rowops-down"
            data-bead-id=${item.id}
            title="같은 레포 안에서 한 칸 아래로"
            aria-label="한 칸 아래로"
          >
            ↓
          </button>`
      : ''}
    <button
      type="button"
      class="op-btn op-btn--icon op-btn--ghost worker-mini__rowops-remove"
      data-action="queue-remove"
      data-bead-id=${item.id}
      title="대기에서 빼기"
      aria-label="대기에서 빼기"
    >
      ✕
    </button>
  </span>`;
}

/**
 * Slot 4a 선행 칩의 `title`에 blocker 상태를 싣는다 (UI-0bvr §4.2). 선행 대기
 * 사유가 headline을 버렸으므로 `open`·`blocked` 구분을 말하는 자리가 이 툴팁이고,
 * 재료는 그 사유의 `targets[].status`다. 상태를 모르는 blocker의 문장은 그대로다
 * (fail-quiet).
 *
 * @param {DependencyChips|null|undefined} chips
 * @param {import('../../protocol.js').WaitReason[]} wait_reasons
 * @returns {DependencyChips|null|undefined}
 */
function chipsWithBlockerStatus(chips, wait_reasons) {
  const predecessors = chips?.predecessors;
  if (!Array.isArray(predecessors) || predecessors.length === 0) {
    return chips;
  }
  /** @type {Map<string, string>} */
  const status_of = new Map();
  for (const reason of wait_reasons) {
    if (!PREREQUISITE_KINDS.includes(reason.kind)) {
      continue;
    }
    for (const target of reason.targets || []) {
      if (target.kind === 'issue' && target.status) {
        status_of.set(target.id, target.status);
      }
    }
  }
  if (status_of.size === 0) {
    return chips;
  }
  return {
    ...chips,
    predecessors: predecessors.map((chip) => {
      const status = status_of.get(chip.id);
      return status ? { ...chip, title: `${chip.title} · ${status}` } : chip;
    })
  };
}

/**
 * One `.mini` row.
 *
 * 대기 행은 폭과 무관하게 카드 변형 하나다 (UI-pw2g §3.1). 종전 한 줄 변형은
 * ID·제목·PR·뱃지·reason·usage·조작을 한 줄에 실어 제목이 몇 글자만 남았고, 그
 * 전환 판정이 뷰포트 폭(`options.card`)이라 레인이 컬럼으로 나뉜 넓은 화면에서는
 * 영영 걸리지 않았다. 남은 두 변형은 완료 레인의 것이고 둘 다 제목이 자기 줄을
 * 갖는다 (UI-fi5o §2) — `doneThreeLineRow`와 `done_row`. 세 변형 모두 같은
 * `.worker-mini` 껍데기를 쓰므로 드래그 계약 (`data-bead-id`/`data-lane`)과 머지
 * 진행 시각화는 변형과 무관하게 유지된다.
 *
 * `options.actions` (UI-5ksp §4.6)는 행 1번 줄 조작 슬롯 끝에 서는 호출 측
 * 조각이다 (Monitor의 ⛓ ↑ ↓ ✕). 행 밖 별도 줄이던 자리를 옮긴 것이므로 슬롯
 * 표(UI-251y §5.1)의 "조작은 1번 줄 오른쪽 끝" 규칙을 그대로 따른다. 넘기지
 * 않으면 렌더가 그대로다.
 *
 * @param {MiniItem} item
 * @param {{ actions?: import('lit-html').TemplateResult, chipPresets?: import('../../utils/chip-preset-binding.js').ChipPresetContext|null }} [options]
 * @returns {import('lit-html').TemplateResult}
 */
export function miniRow(item, options = {}) {
  const interactive_badges = interactiveSessionBadgesTemplate(
    item.interactive_sessions,
    { bead_id: item.id }
  );
  const interactive_closing = interactiveSessionClosingTemplate(
    item.interactive_sessions
  );
  if (
    item.lane === 'done' &&
    item.done_layout === 'three_line' &&
    !item.external_wait
  ) {
    return doneThreeLineRow(item);
  }
  const draggable = item.draggable && !item.done;
  const queue_row = item.lane === 'queue' || /^s[1-5]$/.test(item.lane);
  const wait_reasons = (item.wait_reasons || []).filter(
    (reason) =>
      !['prerequisite', 'prerequisite_foreign'].includes(reason.kind) ||
      queue_row
  );
  const prerequisite =
    queue_row &&
    wait_reasons.some((reason) =>
      ['prerequisite', 'prerequisite_foreign'].includes(reason.kind)
    );
  // 카드당 상태 배지 하나, 본문 한 줄, 시각 한 줄 (§6). 나머지 사유는 배지
  // 팝업의 `다른 사유` 목록에 남는다.
  const external = externalWaitCardParts(item);
  const wait_badge = external.badge || waitStatusBadge({ wait_reasons });
  const representative = representativeWaitReason(wait_reasons);
  const wait_lines = external.badge
    ? external
    : representative
      ? waitReasonLines(
          /** @type {import('../../protocol.js').WaitReason} */ (
            representative
          ),
          { item }
        )
      : { badge: '', body: '', actions: '', times: '' };
  const badges = Array.isArray(item.badges) ? item.badges : [];
  const usage_options = { scope: undefined, direct_session: false };
  const provider_badges = providerUsageBadges(item.usage, usage_options);
  const usage_label = formatUsageTotalWithCost(item.usage);
  const merging = item.merge_step || null;
  // 완료 행은 3줄이다 (UI-fi5o §2): 정체성·조작 1줄, 제목이 가로 전체를 쓰는
  // 2줄, 나머지 사실을 전부 받는 3줄. 제목이 ID와 같은 줄에 있으면 좁은 폭에서
  // 제목만 접히면서 ID가 세로 가운데에 떠 어느 bead인지 먼저 읽히지 않는다.
  // 완료 행이라도 외부 작업·REVISE 파킹·포기 조작을 실으면 그 재료가 이 세 줄에
  // 담기지 않는다.
  const done_row =
    item.lane === 'done' &&
    !item.external_wait &&
    !item.revise_action &&
    item.discard?.abandon.action !== true;
  // 대기 행은 폭과 무관하게 카드 변형 하나다 (UI-pw2g §3.1) — 남은 한 갈래가
  // 완료 레인의 3줄 행이므로 나머지 전부가 카드다.
  const card = !done_row;
  const done_at_label = done_row ? formatRelativeTime(item.done_at) : '';
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
  // route 칩은 좌표 칩 줄이 싣는다 (UI-251y §2). 완료 행도 얻는다 (UI-q1tg
  // §3.4): 끝난 일에 대해서도 사용자는 "무엇으로 돌았나"를 묻는다.
  const route_el = routeChipTemplate(item.workflow);
  const lane_el =
    item.lane === 'pr_wait' && !item.external
      ? laneOriginChipTemplate(item.lane_origin)
      : '';
  // 일반 discovered-from 출처는 완료 행에서 빠진다. Worker 생성 그룹은 immutable
  // 생성 원본을 설명하므로 완료 행에도 남는다 (UI-j10d §4).
  const from_el = creationSourceChipsTemplate(item, {
    include_from: item.lane !== 'done'
  });
  // 우선순위는 ID 바로 다음이다 — Board 카드와 같은 자리, 같은 문장.
  const pri_el = priorityBadgeTemplate(item.priority);
  const title_el = html`<span class="worker-mini__title">${item.title}</span>`;
  const pr_el = prLinkTemplate(item.pr_url, item.pr_number);
  // 외부 저장소 PR 대상 표시 (UI-kyky §6.2). 자리는 슬롯 1의 PR 링크 바로
  // 옆이다 — 이 워크스페이스의 머지·정리 대상이 아니라는 사실이 행동을 바꾸므로
  // 좌표 칩 줄로 보내지 않고, 조작 버튼 사이에도 넣지 않는다.
  const foreign_repo_el = item.foreign_repo
    ? html`<span
        class="worker-mini__foreign-pr"
        title="다른 저장소의 PR입니다. 이 워크스페이스에서는 상태를 관측·머지·정리하지 않습니다."
        >↗ ${item.foreign_repo}</span
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
  if (item.rereview_required === true) {
    badge_els.push(
      html`<span
        class="worker-mini__badge worker-mini__badge--rereview"
        title="stale 판정 — 디스패치가 세션 내 재리뷰를 요구합니다. 실행은 admit됐고 거절이 아닙니다"
        >♻ 재리뷰 필요</span
      >`
    );
  }
  const reason_el =
    typeof item.reason === 'string' && item.reason
      ? html`<span
          class="worker-mini__reason${item.reason.startsWith('⛔')
            ? ' worker-mini__reason--danger'
            : ''}"
          >${item.reason}</span
        >`
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
        ? html`<span
            class="worker-usage"
            title=${usageTooltip(item.usage, usage_options)}
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
  const abandon_el = discard?.abandon.action
    ? html`<button
        type="button"
        class="worker-mini__discard-abandon"
        data-bead-id=${item.id}
        data-operation-id=${discard.operation.operation_id}
        data-operation-kind=${discard.operation.kind || ''}
        data-last-error=${discard.error || ''}
        title=${discard.abandon.title}
      >
        ${discard.abandon.label}
      </button>`
    : '';
  // [세션에서 해결] (UI-jw27 §4). 평소에는 아무것도 되돌리지 않으므로 [폐기]
  // 앞에 선다. requested 실패에서는 더 약한 복구부터 읽히도록 재시도와 포기 뒤로
  // 이동한다 (discard-abandon §3.1).
  const resolve_el =
    item.resolve_action ||
    wait_reasons.some((reason) => reason.kind === 'recovery')
      ? html`<button
          type="button"
          class="op-btn worker-mini__resolve"
          data-bead-id=${item.id}
          ?disabled=${item.resolve_enabled === false}
          title=${item.resolve_title ||
          '실패한 작업을 이어받는 대화형 세션을 띄웁니다 (기록된 세션이 있으면 fork)'}
        >
          세션에서 해결
        </button>`
      : '';
  const discard_actions_el = discard?.abandon.action
    ? html`${discard_el}${abandon_el}${resolve_el}`
    : html`${resolve_el}${discard_el}`;
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
  // Waiting rows show effective settings; done rows show the last implementation
  // attempt's recorded facts in slot 5 (UI-q1tg §3.4 / UI-j10d).
  const has_exec_chips = !!(
    item.lane !== 'pr_wait' &&
    item.exec_chips &&
    (item.exec_chips.orchestration || item.exec_chips.worker)
  );
  const exec_chips_el = has_exec_chips
    ? execChipsTemplate(item.exec_chips, {
        pin: item.exec_chips_pinned === true
      })
    : '';
  // Slot 5a coordinates and 5b execution facts each fail quiet (UI-us7l).
  const complex_el = complexChipTemplate(
    item.complex_reason,
    chipOpen(item, 'complex'),
    item,
    options.chipPresets || null
  );
  // `frontend`·`backend`는 `복잡` 바로 뒤다 (UI-wg68 §5.4).
  const area_el = areaChipsTemplate(item, options.chipPresets || null);
  // 영수증 회계 잔여도 슬롯 5다 (UI-h6t1 §4.1): 같은 줄의 `exec_receipt`·실패
  // 로그 경로와 짝이라 "그 실행이 어디서 무엇으로 일어났고 그 기록이 얼마나
  // 성립하는지"를 한 줄이 답한다.
  // 게이트 칩은 4a 줄 맨 앞이다 (UI-01wh §3.2) — 유예 칩과 같은 질문에 답하지만
  // 가장 바깥 사정이므로 먼저 선다. 팝업은 그 칩이 선 줄이 싣는다 (UI-8x90 §5).
  const gate_open = chipOpen(item, 'gate');
  const gate_el = gateChipTemplate(item.gate, item.id, gate_open);
  const grace_el = graceChipTemplate(item);
  const receipt_badge_el = receiptBadgeChipTemplate(
    item,
    chipOpen(item, 'receipt')
  );
  // 소속 칩은 슬롯 5의 좌표 칩이다 (UI-8x90 §4.1): 레포 다음, route 앞.
  // 실패 로그 경로도 슬롯 5다 (UI-251y §5.1 정정, UI-8w4t §4): "어느 경로의
  // 것인가"는 이 줄이 답하는 질문이고, 복사 버튼은 값에 붙은 어포던스일 뿐
  // 카드의 처분을 바꾸지 않는다. 타임라인 `세부`와 같은 템플릿·같은 토스트를
  // 쓰므로 두 표면이 같은 값을 다르게 다루지 않는다. 재료가 없으면 없다.
  const log_path_el = logPathTemplate(item.log_path);
  const coords_el =
    lane_el || route_el || from_el
      ? html`<div class="worker-chips worker-chips--coords">
          ${lane_el}${route_el}${from_el}
        </div>`
      : '';
  const run_el =
    has_exec_chips ||
    complex_el ||
    area_el ||
    receipt_badge_el ||
    usage_el ||
    log_path_el
      ? html`<div class="worker-chips worker-chips--run">
          ${exec_chips_el}${complex_el}${area_el}${receipt_badge_el}${usage_el}${log_path_el}${gate_open
            ? ''
            : judgementPopover(item)}
        </div>`
      : '';
  // 유예 칩은 슬롯 4a다 (UI-q1tg §3.3) — `⛓` 선행 칩과 같은 질문에 답하므로 그
  // 줄 안에 서고, 자리는 줄의 끝이다 (§3.2 순서: 게이트 → 선행 → 후속 →
  // 유예). 게이트 칩은 같은 줄의 맨 앞이고 그 팝업은 칩 바로 뒤에 붙는다.
  const deps_el = dependencyChipsTemplate(
    chipsWithBlockerStatus(item.dependency_chips, wait_reasons),
    '',
    gate_el === ''
      ? ''
      : html`${gate_el}${gate_open ? judgementPopover(item) : ''}`,
    grace_el
  );
  // 외부 대기 조작은 슬롯 6이다 (UI-l48z §4.3): 카드 변형은 foot 줄에 둔다.
  const external_foot_el = card ? external.actions : '';
  const actions_el = options.actions
    ? options.actions
    : card
      ? ''
      : external.actions;
  const has_foot = !!(
    external_foot_el ||
    merging ||
    item.merge_action ||
    item.cancel_action ||
    item.resolve_action ||
    wait_reasons.some((reason) => reason.kind === 'recovery') ||
    item.discard_action ||
    discard?.operation ||
    item.revise_action
  );
  // 작업 종류 배경은 상태 표현이 없는 행에만 붙는다 (UI-kyky §3.1): 머지 진행·
  // 외부 세션·ghost 행은 이미 자기 배경·테두리로 상태를 말한다.
  const route_tone = routeCardTone(
    item.workflow,
    !merging && item.external !== true && item.ghost !== true
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
      : ''}${prerequisite
      ? ' worker-mini--prerequisite'
      : ''}${route_tone.tinted
      ? ' worker-mini--route-bg'
      : ''}${item.search_match === false || item.filter_match === false
      ? ' is-dimmed'
      : ''}"
    style=${merging ? `--progress: ${merging.percent}%` : ''}
    draggable=${draggable ? 'true' : 'false'}
    data-bead-id=${item.id}
    data-root-dir=${ifDefined(item.root_dir)}
    data-lane=${item.lane}
    data-route=${ifDefined(route_tone.route)}
  >
    ${done_row
      ? html`<div class="worker-mini__row1">
            ${repo_el}${id_el}${pri_el}${pr_el}${foreign_repo_el}${interactive_badges}${interactive_closing}${actions_el}
          </div>
          <div class="worker-mini__row2">${title_el}</div>
          ${carryoverChipsTemplate(item.carried_to, item.root_dir)}
          <div class="worker-mini__row3">
            ${coords_el}${exec_chips_el || usage_el
              ? html`<div class="worker-chips worker-chips--run">
                  ${exec_chips_el}${usage_el}
                </div>`
              : ''}${done_at_label
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
              >${merge_el}${cancel_el}${discard_actions_el}</span
            >
            ${timesMeta(item)}
          </div>`
      : html`<div class="worker-mini__head">
            ${grip}${seq_el}${repo_el}${id_el}${pri_el}${pr_el}${foreign_repo_el}${badge_els}${interactive_badges}${wait_badge}${interactive_closing}${actions_el}
          </div>
          ${reason_el
            ? html`<div class="worker-mini__reason-line">${reason_el}</div>`
            : ''}
          <div class="worker-mini__body">${title_el}</div>
          ${wait_lines.body}${deps_el}${coords_el}${run_el}${has_foot
            ? html`<div class="worker-mini__foot">
                ${merge_step_el}
                <span class="worker-mini__actions"
                  >${external_foot_el}${merge_el}${cancel_el}${discard_actions_el}${revise_els}</span
                >
                ${discardReceiptTemplate(item)}
              </div>`
            : ''}
          ${wait_lines.times}${timesMeta(item)}`}
  </div>`;
}

/**
 * Consumer-card slots shared by candidates, queue rows and running tiles.
 * 좌표(`ssh`·job·`log`)는 상세 패널 잡 표의 것이다 (UI-l48z §4.2).
 *
 * @param {{external_wait?: import('../../protocol.js').ExternalWaitObservation, wait_reasons?: import('../../protocol.js').WaitReason[], labels?: string[], session_preferred?: boolean}} item
 * @param {number} [now]
 */
export function externalWaitCardParts(item, now = Date.now()) {
  const record = item.external_wait;
  const reason = (item.wait_reasons || []).find(
    (entry) => entry.kind === 'external_job'
  );
  return waitReasonLines(reason, {
    now,
    external_wait: record,
    session_preferred:
      item.session_preferred === true ||
      (Array.isArray(item.labels) && item.labels.includes('session-preferred'))
  });
}
/**
 * @param {import('../../protocol.js').WaitReason} reason
 * @param {import('../../protocol.js').ExternalWaitObservation|undefined} record
 */
function externalWaitBadgeText(reason, record) {
  if (reason.verdict === 'action_required') {
    return `⛔ 조치 필요 · ${reason.verdict_reason?.message || '상태 확인 필요'}`;
  }
  if (reason.verdict === 'overdue') {
    return `⚠ 지연 · ${reason.verdict_reason?.message || '관찰 지연'}`;
  }
  if (record?.stage === 'completing') {
    return record.owner_kind === 'session'
      ? '✅ 완료 · 이어하기 대기'
      : '↻ 재개 중';
  }
  return '⏳ 외부 작업';
}

/**
 * @param {import('../../protocol.js').ExternalWaitObservation} record
 * @param {number} now
 */
function externalWaitTimes(record, now) {
  if (record.completion) {
    return `완료 ${formatClockLocal(Date.parse(record.completion.completed_at), now)}`;
  }
  const submitted = record.jobs
    .map((job) => Date.parse(job.submitted_at))
    .filter(Number.isFinite);
  const observed = record.jobs
    .map((job) => Date.parse(job.observed_at || ''))
    .filter(Number.isFinite);
  const next = formatClockLocal(Date.parse(record.next_observation_at), now);
  return [
    submitted.length
      ? `제출 ${formatClockLocal(Math.min(...submitted), now)}`
      : '',
    observed.length
      ? `마지막 확인 ${formatClockLocal(Math.max(...observed), now)}`
      : '',
    next ? `다음 ${next}` : ''
  ]
    .filter(Boolean)
    .join(' · ');
}

/**
 * @param {string} submitted_at
 * @param {string|undefined} completed_at
 * @param {number} now
 */
function externalElapsed(submitted_at, completed_at, now) {
  const start = Date.parse(submitted_at);
  const word = WAIT_KINDS.find(
    (row) => row.kind === 'external_job'
  )?.elapsed_word;
  if (!Number.isFinite(start) || !word) {
    return '';
  }
  const minutes = Math.max(
    0,
    Math.floor(
      ((completed_at ? Date.parse(completed_at) : now) - start) / 60000
    )
  );
  return ` · ${word} ${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, '0')}m`;
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
 * 있다.
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
export function placeMenuList(entries, bead_id) {
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
 * @typedef {'complex'|'frontend'|'backend'|'receipt'|'session_preferred'|'ineligible'|'qfr'|'spec_after_blocker'|'readiness'} JudgementChipKey
 */

/**
 * The last guidance line of a chip that still opens a 팝업 (UI-wg68 §5.2).
 * quick fix 이슈에서는 바인딩이 있어도 칩 클릭이 없으므로 다른 문장을 읽는다.
 *
 * @param {MiniItem} item
 * @returns {string}
 */
function chipBindingGuidance(item) {
  return routeOf(item) === 'quick_fix'
    ? 'quick fix 이슈에는 칩 적용이 없습니다 — 적용은 이슈 상세의 quick fix 프리셋에서'
    : '칩에 프리셋을 매려면 모니터 탭 ⚙ → 칩';
}

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
  if (chip_key === 'complex') {
    const reason = item.complex_reason;
    if (typeof reason !== 'string' || reason.length === 0) {
      return null;
    }
    return {
      title: '복잡한 작업으로 판정됨',
      lines: [...complexReasonSentences(reason), chipBindingGuidance(item)]
    };
  }
  if (AREA_LABELS.includes(chip_key)) {
    // 영역 칩에는 사유 키가 없다 — 라벨 자체가 판정이다 (UI-wg68 §5.4). 그래서
    // 팝업의 제목이 그 판정의 한 줄이고, 본문은 클릭이 무엇을 하는지(또는 왜
    // 아무것도 하지 않는지)만 남는다. 라벨이 없는 bead에는 팝업도 없다.
    if (!areaLabels(item.labels).includes(chip_key)) {
      return null;
    }
    return {
      title: areaTooltip(chip_key),
      lines: [chipBindingGuidance(item)]
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
  if (chip_key === 'gate') {
    const gate = item.gate;
    if (!gate) {
      return null;
    }
    // 출구 `↻ 지금 프로브`는 이 팝업 안이다 (UI-pw2g §3.4) — 보류의 사실을 말하는
    // 칩과 그 판정을 앞당기는 조작이 한자리에 모인다. 재료가 없으면 빈 문자열이라
    // 출구 줄 자체가 없다 (fail-quiet).
    const probe = providerProbeButtonTemplate(item);
    return {
      title: '자동 디스패치가 막혀 있다',
      lines: gate.lines,
      ...(probe === '' ? {} : { exit: probe })
    };
  }
  if (chip_key === 'readiness') {
    const judgement = readinessJudgement(item);
    if (!judgement) {
      return null;
    }
    return {
      title: judgement.title,
      lines: []
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
 * The keys, in the order a card would read them (UI-8x90 §4.5) — 4a의 게이트
 * 칩이 맨 앞(가장 바깥 사정), 그 뒤가 머리줄 넷이고 슬롯 4a의 `스펙 대기`가
 * 그 아래다. 한 카드에 두 팝업이 동시에 열리지
 * 않으므로 첫 열림 하나만 찾으면 된다.
 *
 * @type {ReadonlyArray<string>}
 */
export const JUDGEMENT_CHIP_KEYS = [
  'gate',
  'complex',
  'frontend',
  'backend',
  'receipt',
  'session_preferred',
  'ineligible',
  'qfr',
  'spec_after_blocker',
  'readiness'
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
export { AWAITING_USER_REASON_PREFIX } from '../../utils/awaiting-user-reason.js';

/**
 * One candidate `.worker-card` (spec §2, mockup 변형 B). Richer than
 * {@link miniRow}: a route chip + the Board's route-driven stepper. It keeps
 * miniRow's row contract (`draggable` / `data-bead-id` / `data-lane`), but the
 * Worker console's candidate projection pins `draggable` to false (UI-d13v §6)
 * and hands placement eligibility over in `queue_placeable`. An issue without
 * `workflow` (inactive workspace) renders without the chip/stepper and never
 * throws.
 *
 * 슬롯 1 조작(`.worker-card__head-actions`)은 지금 재료가 없어 그리지 않는다
 * (UI-lx45 §5): UI-j92s가 그 자리에 두었던 `⛓ 의존성` 버튼은 편집이 이슈 상세
 * `의존성` 절로 옮겨 가며 사라졌다.
 *
 * `options.variant: 'deferred'`는 보류 선반의 변형이다 (UI-p7s2 §3.2, ADR 0014):
 * 같은 슬롯 표를 쓰되 (1) foot의 `[↴ 대기로]`와 place 메뉴를 그리지 않고,
 * (2) 슬롯 4a 준비도 칩을 그리지 않으며 — 자격을 묻지 않는 선반이다 —,
 * (3) route tint 대신 `worker-card--deferred` 하나를 준다.
 *
 * @param {MiniItem} item
 * @param {PlaceMenu|null} [place_menu]
 * @param {{ onOpenDoc?: import('../stepper.js').OpenDocHandler, variant?: 'deferred', chipPresets?: import('../../utils/chip-preset-binding.js').ChipPresetContext|null }} [options]
 * @returns {import('lit-html').TemplateResult}
 */
export function candidateCard(item, place_menu = null, options = {}) {
  const is_deferred = options.variant === 'deferred';
  // Observation-only rows (UI-8881) are refused here as well as by the
  // projection, so the card cannot become placeable through a caller that
  // forgot the conjunction.
  const worker_ineligible = item.worker_ineligible === true;
  const draggable =
    !is_deferred && item.draggable && !item.done && !worker_ineligible;
  // 배치 자격은 드래그와 갈라졌다 (UI-d13v §6): 후보 카드는 드래그 소스가 아니게
  // 됐지만 대기 적재는 남으므로, 그 자격을 `draggable`에서 읽으면 주 경로가 통째로
  // 사라진다. 메뉴 열림과 `[대기로 ↴]`는 둘 다 이 값 하나를 읽는다.
  const queue_placeable =
    !is_deferred &&
    item.queue_placeable === true &&
    !item.done &&
    !worker_ineligible;
  const menu_open =
    queue_placeable && place_menu && place_menu.bead_id === item.id;
  // 계약상 `worker-ineligible`과 상호배타이므로 머리줄의 같은 자리 하나를 나눠
  // 쓴다 (UI-49mc §4.1). 우선순위는 투영이 이미 접었고, 이 라벨은 drag·적재·음영
  // 어디에도 입력되지 않는다.
  const session_preferred = item.session_preferred === true;
  const session_preferred_tooltip =
    SESSION_PREFERRED_TOOLTIP[item.session_preferred_reason || ''] || '';
  const workflow = item.workflow;
  // 판정은 구조화 필드만 읽는다 (§4). `reason`은 표시 문자열이므로 그것을 되읽어
  // 판정을 세우면 문구가 바뀌는 순간 툴팁과 판정 칩이 조용히 어긋난다.
  const missing_description = item.missing_description === true;
  const awaiting_user = item.awaiting_user === true;
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
  const readiness_judgement = readinessJudgement(item);
  // 보류 선반은 자격을 묻지 않으므로 슬롯 4a의 준비도 칩이 서지 않는다 (§3.2).
  const readiness_open = !is_deferred && chipOpen(item, 'readiness');
  const readiness_el = is_deferred
    ? ''
    : readinessChipTemplate(readiness_judgement, readiness_open);
  const external = externalWaitCardParts(item);
  const slot4_el = html`${spec_after_blocker_el}${spec_after_blocker_open
    ? judgementPopover(item)
    : ''}${readiness_el}${readiness_open ? judgementPopover(item) : ''}`;
  const deps_el = dependencyChipsTemplate(
    item.dependency_chips,
    spec_after_blocker_el === '' && readiness_el === '' ? '' : slot4_el
  );
  // Repo identity belongs in slot 1; coordinates and execution use 5a/5b.
  const repo_el = item.workspace_name
    ? html`<span class="worker-card__repo" title=${item.root_dir || ''}
        >${item.workspace_name}</span
      >`
    : '';
  const route_el = routeChipTemplate(workflow);
  const from_el = creationSourceChipsTemplate(item);
  const has_exec_chips = !!(
    item.exec_chips &&
    (item.exec_chips.orchestration || item.exec_chips.worker)
  );
  // 흐림은 "지금은 못 간다"는 하나의 사실이므로 한 번만 건다 (§6.3).
  // `worker-card--ineligible`은 root opacity 대신 배경·글자색으로 같은 사실을
  // 말하고 stepper에만 opacity를 걸므로, 여기서 root opacity를 겹쳐 걸면 그
  // stepper가 0.65 × 0.65로 두 번 흐려진다.
  const blocked_or_not_ready =
    !is_deferred &&
    !worker_ineligible &&
    (item.blocked === true || item.queue_placeable === false);
  // 작업 종류 배경 (UI-kyky §3.1). `worker-ineligible` 카드는 이미 자기 배경으로
  // "지금은 못 간다"를 말하므로 중립이 아니고, 보류 카드는 tint 없이
  // `worker-card--deferred` 하나로 선반임을 말한다 (§3.2).
  const route_tone = routeCardTone(
    workflow,
    !worker_ineligible && !is_deferred
  );
  return html`<div
    class="worker-card${draggable
      ? ''
      : ' worker-card--static'}${worker_ineligible
      ? ' worker-card--ineligible'
      : ''}${blocked_or_not_ready
      ? ' worker-card--blocked'
      : ''}${route_tone.tinted ? ' worker-card--route-bg' : ''}${is_deferred
      ? ' worker-card--deferred'
      : ''}${item.search_match === false ? ' is-dimmed' : ''}"
    draggable=${draggable ? 'true' : 'false'}
    data-bead-id=${item.id}
    data-lane=${item.lane}
    data-route=${ifDefined(route_tone.route)}
  >
    <div class="worker-card__head">
      ${draggable
        ? html`<span class="worker-card__grip" aria-hidden="true">⠿</span>`
        : ''}
      ${repo_el}
      <span class="worker-card__id" title="클릭하면 ID 복사">${item.id}</span
      >${priorityBadgeTemplate(item.priority)}${item.rereview_required === true
        ? html`<span
            class="worker-card__badge worker-card__badge--rereview"
            title="stale 판정 — 디스패치가 세션 내 재리뷰를 요구합니다. 실행은 admit됐고 거절이 아닙니다"
            >♻ 재리뷰 필요</span
          >`
        : ''}
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
          : ''}${complexChipTemplate(
        item.complex_reason,
        chipOpen(item, 'complex'),
        item,
        options.chipPresets || null
      )}${areaChipsTemplate(
        item,
        options.chipPresets || null
      )}${quickFixReviewChipTemplate(
        workflow,
        chipOpen(item, 'qfr')
      )}${interactiveSessionBadgesTemplate(item.interactive_sessions, {
        bead_id: item.id
      })}
      ${spec_after_blocker_open || readiness_open
        ? ''
        : judgementPopover(
            item
          )}${external.badge}${interactiveSessionClosingTemplate(
        item.interactive_sessions
      )}
    </div>
    <div class="worker-card__title">${item.title}</div>
    ${workflow
      ? stepperTemplate(workflow, item.status, {
          onOpenDoc: options.onOpenDoc
        })
      : ''}${external.body}${deps_el}
    ${route_el || from_el
      ? html`<div class="worker-chips worker-chips--coords">
          ${route_el}${from_el}
        </div>`
      : ''}
    ${has_exec_chips
      ? html`<div class="worker-chips worker-chips--run">
          ${execChipsTemplate(item.exec_chips)}
        </div>`
      : ''}
    ${is_deferred
      ? // 보류 변형에도 외부 대기 조작은 foot이다 (UI-l48z §4.3): 보류가 관찰을
        // 멈추지 않으므로 확인·중단·재개 출구가 카드에서 사라지면 안 된다.
        item.reason || external.badge
        ? html`<div
            class="worker-card__foot${item.reason
              ? ''
              : ' worker-card__foot--actions-only'}"
          >
            ${item.reason
              ? html`<span class="worker-card__reason">${item.reason}</span>`
              : ''}${external.badge ? external.actions : ''}
          </div>`
        : ''
      : html`<div
          class="worker-card__foot${item.reason
            ? ''
            : ' worker-card__foot--actions-only'}"
        >
          ${menu_open
            ? html`<div class="worker-card__place-menu">
                ${placeMenuList(place_menu.lanes, item.id)}
                <button
                  type="button"
                  class="op-btn op-btn--icon worker-card__place-cancel"
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
                : ''}${external.badge
                ? // 외부 대기 사유가 입장을 막으므로 `↴ 대기로`는 뜻이 없다 —
                  // 그 자리가 대기 처분 조작이다 (UI-l48z §4.3).
                  external.actions
                : html` <!-- 버튼식 큐 적재 (UI-58y2 §[대기로 ↴]): 후보 레인에서 대기로 가는
                 유일한 경로다 (UI-d13v §6). queue_placeable 하나가 준비도
                 세그먼트와 같은 자격을 말하며, blocked 자체는 막지 않는다.
                 포인터 종류로 감추지 않는다: 드래그라는 대체 경로가 없다. -->
                    <button
                      type="button"
                      class="op-btn op-btn--primary worker-card__place"
                      data-bead-id=${item.id}
                      ?disabled=${!queue_placeable}
                      title=${placementTitle({
                        placeable: queue_placeable,
                        route_ok: item.route_ok,
                        worker_ineligible,
                        awaiting_user,
                        missing_description,
                        spec: item.placement_spec
                      })}
                    >
                      ↴ 대기로
                    </button>`}`}
        </div>`}
    ${external.times}${timesMeta(item)}
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
 * `match_count`는 워커 탭 검색이 켜져 있을 때만 실리는 「일치 n」이다 (UI-6g3t
 * §7): `worker-pane__count` 뒤에 덧붙고, 키가 없으면 헤더는 지금 그대로다.
 *
 * `footer`는 본문 맨 아래, 행 목록 **뒤**에 서는 한 조각이다 (UI-p7s2 §3.2의
 * 보류 선반). 헤더 건수는 `items`만 세므로 이 조각의 내용은 pane 건수에 들지
 * 않고, 재료가 없으면 호출 측이 키를 넘기지 않아 아무것도 그려지지 않는다.
 *
 * @param {{ id: string, lane: 'candidate'|'queue'|'running'|'pr_wait'|'done'|'s1'|'s2'|'s3'|'s4'|'s5', title: string, items: MiniItem[], count?: number, src?: boolean, empty?: string, body?: import('lit-html').TemplateResult, controls?: import('lit-html').TemplateResult, header_control?: import('lit-html').TemplateResult|string, header_row?: import('lit-html').TemplateResult, footer?: import('lit-html').TemplateResult, live?: boolean, collapsible?: boolean, collapsed?: boolean, preview?: string, match_count?: number, place_menu?: PlaceMenu|null, onOpenDoc?: import('../stepper.js').OpenDocHandler }} pane
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
    <span class="worker-pane__count">${count}</span>
    ${typeof pane.match_count === 'number'
      ? html`<span class="worker-pane__match">일치 ${pane.match_count}</span>`
      : ''}`;
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
                  )}${pane.footer ? pane.footer : ''}
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
 * @property {number} [match_count] - 검색 중인 레인의 「일치 n」 (UI-6g3t §7).
 * 다른 pane과 같은 규칙으로, 검색 중이 아니면 키가 없어 헤더가 지금 그대로다.
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
 * @property {{ rows: import('lit-html').TemplateResult[], completed?: import('lit-html').TemplateResult[], count: number }} [external]
 * @property {{ rows: import('lit-html').TemplateResult[], count: number, collapsed: boolean, drop?: WaitDropAttrs, slots?: Array<{root_dir: string, name: string, live: number, cap: number, saturated: boolean}> }} parallel
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
 * **구조**만 소유한다 — 행, 레포 배지, pane,
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
    ${model.external &&
    (model.external.rows.length > 0 ||
      (model.external.completed?.length || 0) > 0)
      ? html`<details class="worker-wait__external" open>
          <summary>
            외부 작업·대기 조건
            <span class="worker-wait__area-count">${model.external.count}</span>
          </summary>
          <div class="worker-wait__external-body">${model.external.rows}</div>
          ${model.external.completed && model.external.completed.length > 0
            ? html`<details class="worker-wait__external-completed">
                <summary>종료 확인 ${model.external.completed.length}</summary>
                <div class="worker-wait__external-body">
                  ${model.external.completed}
                </div>
              </details>`
            : ''}
        </details>`
      : ''}
    <section
      class="worker-wait__area worker-wait__area--parallel${parallel.collapsed
        ? ' is-collapsed'
        : ''}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${areaToggle('parallel', '병렬 영역', parallel.collapsed)}
        <span class="worker-wait__area-count">${parallel.count}</span>
        ${(parallel.slots || []).map(
          (slot) =>
            html`<span
              class="worker-wait__slots${slot.saturated
                ? ' worker-wait__slots--warn'
                : ''}"
              data-root-dir=${slot.root_dir}
              title=${`실행 중 ${slot.live} / 슬롯 ${slot.cap} — 슬롯이 빌 때까지 이 레포의 병렬 항목은 나가지 않는다`}
              >${slot.name || '슬롯'}
              ${slot.live}/${slot.cap}${slot.saturated ? ' ⚠' : ''}</span
            >`
        )}
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
      match_count: lane.match_count,
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
