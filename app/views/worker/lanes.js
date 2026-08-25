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
 * @param {unknown} sha
 * @returns {string}
 */
export function shortSha(sha) {
  return typeof sha === 'string' && sha.length >= 7 ? sha.slice(0, 7) : '—';
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
 * Head review·repair 시도를 한 bead의 완료 행 배지로 요약한다 (UI-hk74 §7).
 *
 * 이 시도들은 이제 일반 attempt와 같은 이력 표면에 있다 — 토큰 합계와 작업
 * 시간은 `bead_id`만 보므로 이미 함께 세어진다. 배지는 그 합계 안에 무엇이
 * 섞여 있는지, 그리고 그것이 사람의 클릭이었는지 자동 dispatch였는지를
 * 구분하는 유일한 표시다. 모양이 어긋난 입력은 조용히 무시한다(fail-quiet).
 *
 * @param {unknown} attempts - 큐 스냅샷의 attempt_id → attempt record 맵.
 * @param {string} bead_id
 * @returns {string[]}
 */
export function headReviewAttemptBadges(attempts, bead_id) {
  if (typeof attempts !== 'object' || attempts === null) {
    return [];
  }
  /** @type {Map<string, boolean>} */
  const auto_by_kind = new Map();
  for (const attempt of Object.values(attempts)) {
    if (typeof attempt !== 'object' || attempt === null) {
      continue;
    }
    const a = /** @type {Record<string, unknown>} */ (attempt);
    if (a.bead_id !== bead_id) {
      continue;
    }
    if (a.kind !== 'head_review' && a.kind !== 'head_repair') {
      continue;
    }
    const kind = /** @type {string} */ (a.kind);
    auto_by_kind.set(
      kind,
      (auto_by_kind.get(kind) ?? false) || a.origin === 'auto'
    );
  }
  /** @type {string[]} */
  const badges = [];
  for (const [kind, label] of [
    ['head_review', '리뷰'],
    ['head_repair', '수리']
  ]) {
    const auto = auto_by_kind.get(kind);
    if (auto === undefined) {
      continue;
    }
    badges.push(auto ? `${label} · 자동` : label);
  }
  return badges;
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
 * @returns {{ deploy: { sha: string, at: number|null, elapsed_ms: number|null }|null, unresolved: number, repairing: boolean, badge: { tone: 'act'|'live'|'quiet', label: string } }|null}
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
  const repairing = cards.some(
    (/** @type {any} */ card) => card.state === 'repairing'
  );
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
    repairing,
    badge:
      unresolved > 0
        ? { tone: 'act', label: `해결 필요 ${unresolved}` }
        : repairing
          ? { tone: 'live', label: '자동 해결 중' }
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
 * @property {string} [badge] - 상대가 다른 레포일 때의 레포 배지 (UI-j92s §6.2).
 * 레포 간 관계는 모니터에만 있는 축이므로 Worker 행에는 이 값이 실리지 않는다.
 */

/**
 * One 겹침 상대 (UI-qm12 §5.2·§5.3). 선언 scope가 부딪히는 상대일 뿐, 순서를
 * 주장하지 않는다 — 배치는 사용자가 팝오버에서 한 번의 클릭으로 만든다.
 *
 * @typedef {Object} OverlapChip
 * @property {string} id - 상대 bead.
 * @property {string} title
 * @property {string} location_label - `실행중` · `#n` · `s1 #n` · `실행가능`.
 * @property {string[]} prefixes - 두 선언이 부딪힌 자리 — 각 쌍에서 더 긴
 * prefix를 채택한 사전순 목록.
 */

/**
 * One 겹침 팝오버 행 (UI-qm12 §5.3·§5.4). `action`은 클릭 시점의 최신 모델로
 * 판정한 결과이고, 판정 규칙은 모니터가 소유한다 — 템플릿은 그 결론만 그린다.
 *
 * @typedef {Object} OverlapPopoverRow
 * @property {string} id
 * @property {string} title
 * @property {string} location_label
 * @property {string[]} prefixes
 * @property {{ kind: 'place'|'disabled', label: string, title: string }|{ kind: 'note', text: string }} action
 */

/**
 * @typedef {Object} OverlapPopover
 * @property {OverlapPopoverRow[]} rows
 */

/**
 * @typedef {Object} DependencyChips
 * @property {DependencyChip[]} [predecessors] - `🔒 선행 …` — releasable (✕).
 * @property {DependencyChip[]} [successors] - `→ 후속 …` — reverse edges, so
 * they carry no ✕: releasing one belongs to the successor's own 선행 chip.
 * @property {string[]} [warnings] - Lines about a predecessor that is nowhere.
 * @property {OverlapChip[]} [overlaps] - `⧉ 겹침 …` (UI-qm12 §5.3).
 * @property {boolean} [scope_missing] - 선언 원천은 읽혔는데 scope 선언이
 * 비었다 — 겹침을 판정할 수 없다는 사실 자체를 드러낸다.
 * @property {OverlapPopover} [popover] - 이 행에서 열려 있으면 칩 아래에 그리는
 * `mon-overlap__popover`.
 * @property {{ lane_id: string, label: string }} [cross_lane] - `연결 n` /
 * `연결 n (draft)` 소속 칩 (UI-j92s §5.2a). 숨기지 않는 저장 레인 멤버가 자기
 * 소속을 말하는 자리이고, 클릭은 그 레인으로 스크롤한다.
 */

/**
 * The 겹침 팝오버 (UI-qm12 §5.3): 상대 id·제목·위치, 겹치는 경로, 그리고 순서를
 * 만드는 버튼 하나 또는 왜 만들 수 없는지 말하는 문장 하나. 겹침 칩은 상대
 * 수만큼 모두 그려지므로 한 팝오버에는 클릭한 상대 하나만 선다.
 *
 * @param {OverlapPopover} popover
 * @returns {import('lit-html').TemplateResult}
 */
function overlapPopoverTemplate(popover) {
  return html`<div
    class="mon-overlap__popover"
    role="dialog"
    aria-label="scope 겹침"
  >
    ${popover.rows.map(
      (row) =>
        html`<div class="mon-overlap__row">
          <div class="mon-overlap__hd">
            <span class="mon-overlap__rid">${row.id}</span>
            <span class="mon-overlap__rtitle">${row.title}</span>
            <span class="mon-overlap__rwhere">${row.location_label}</span>
          </div>
          <ul class="mon-overlap__paths">
            ${row.prefixes.map((prefix) => html`<li>${prefix}</li>`)}
          </ul>
          ${row.action.kind === 'note'
            ? html`<p class="mon-overlap__note">${row.action.text}</p>`
            : html`<button
                type="button"
                class="mon-overlap__place"
                data-counterpart-id=${row.id}
                ?disabled=${row.action.kind === 'disabled'}
                title=${row.action.title}
              >
                ${row.action.label}
              </button>`}
        </div>`
    )}
  </div>`;
}

/**
 * The 선행/후속 의존 칩 (UI-eey2 §5.1)과 겹침 칩 (UI-qm12 §5.3). Two named chips
 * rather than one coloured one, because "내가 막혔나 / 내가 막고 있나"는 색이
 * 아니라 이름으로 읽힌다. Drawn only when a projection supplies them, so Worker
 * rows are unchanged.
 *
 * `lane`은 `scope 없음` 칩 하나를 위해서만 쓴다: 실행 중 행에는 붙이지 않는다
 * (§5.3) — 이미 출발한 이슈에게 선언을 요구하는 문장이기 때문이다.
 *
 * @param {DependencyChips|null|undefined} chips
 * @param {{ lane?: string }} [options]
 * @returns {import('lit-html').TemplateResult|''}
 */
export function dependencyChipsTemplate(chips, options = {}) {
  if (!chips) {
    return '';
  }
  const predecessors = Array.isArray(chips.predecessors)
    ? chips.predecessors
    : [];
  const successors = Array.isArray(chips.successors) ? chips.successors : [];
  const warnings = Array.isArray(chips.warnings) ? chips.warnings : [];
  const overlaps = Array.isArray(chips.overlaps) ? chips.overlaps : [];
  const scope_missing =
    chips.scope_missing === true && options.lane !== 'running';
  const popover = chips.popover || null;
  const cross_lane = chips.cross_lane || null;
  if (
    predecessors.length === 0 &&
    successors.length === 0 &&
    warnings.length === 0 &&
    overlaps.length === 0 &&
    !scope_missing &&
    !cross_lane
  ) {
    return '';
  }
  return html`<div class="worker-deps">
    ${cross_lane
      ? html`<button
          type="button"
          class="worker-dep worker-dep--lane mon-lane__chip"
          data-lane-id=${cross_lane.lane_id}
          title="이 연결 레인으로 이동"
        >
          ${cross_lane.label}
        </button>`
      : ''}
    ${predecessors.map(
      (chip) =>
        html`<span class="worker-dep worker-dep--pred" title=${chip.title || ''}
          >${chip.badge
            ? html`<span class="worker-dep__badge">${chip.badge}</span>`
            : ''}<button
            type="button"
            class="worker-dep__label worker-dep__open"
            data-dep-id=${chip.id}
            data-dep-direction="predecessor"
          >
            ${chip.label}</button
          ><button
            type="button"
            class="worker-dep__remove"
            data-blocker-id=${chip.id}
            aria-label=${`선행 ${chip.id} 연결 해제`}
            title="선행 연결 해제"
          >
            ✕
          </button></span
        >`
    )}${overlaps.map(
      (chip) =>
        html`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${chip.id}
          aria-label=${`scope 겹침 ${chip.id} (${chip.location_label})`}
          title=${[
            `겹침 ${chip.id} (${chip.location_label})`,
            ...chip.prefixes
          ].join('\n')}
        >
          ⧉ ${chip.id}
        </button>`
    )}${scope_missing
      ? html`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`
      : ''}${successors.map(
      (chip) =>
        html`<span class="worker-dep worker-dep--succ" title=${chip.title || ''}
          >${chip.badge
            ? html`<span class="worker-dep__badge">${chip.badge}</span>`
            : ''}<button
            type="button"
            class="worker-dep__label worker-dep__open"
            data-dep-id=${chip.id}
            data-dep-direction="successor"
          >
            ${chip.label}
          </button></span
        >`
    )}${warnings.map(
      (warning) =>
        html`<span class="worker-dep worker-dep--warn">${warning}</span>`
    )}${popover ? overlapPopoverTemplate(popover) : ''}
  </div>`;
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
 * @property {boolean} draggable - Whether this row can be dragged.
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
 * @property {boolean} [timeline_action] - Render [저장소 작업 보기] (UI-q0uy
 * §4.4): the merge action is locked because a repo operation stopped, and the
 * timeline is where that reason and its resolve buttons actually live.
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
 * @property {(import('../board/stepper.js').WorkflowSummary & { route_source?: string, chips?: { route?: string, route_source?: string, exec_receipt?: import('../board/card.js').ExecReceipt|null } }) | null} [workflow] - Server-enriched workflow. 실행가능 카드는 stepper와 route
 * 칩을, 대기·PR 대기 행은 route 칩을 여기서 얻는다 (UI-yrzu §7.2). 완료 행은
 * 싣지 않는다.
 * @property {string} [status] - Issue status, for the stepper glow (candidate cards only).
 * @property {import('../../utils/token-usage.js').UsageRecord|import('../../utils/token-usage.js').UsageProjection|null} [usage] - Token usage
 * summed across the bead's attempts (UI-d7pw §1); absent/null renders nothing.
 * @property {number|null} [work_ms] - 완료 행의 attempt 실행 시간 합산;
 * absent/null renders nothing.
 * @property {number|string} [created_at] - Bead 생성 시각 (UI-d7pw §4).
 * @property {number|string} [updated_at] - Bead 수정 시각 (UI-d7pw §4).
 * @property {number} [done_at] - 완료 레인 진입 시각 = 완료 시각 (UI-rkly §3).
 * @property {boolean} [ghost] - Serial-lane occupancy row (UI-04vo §4): the
 * lineage holding the lane, drawn dimmed and never draggable.
 * @property {number} [seq] - 1-based execution order number in a serial lane.
 * @property {boolean} [worker_serial] - Legacy `worker-serial` label residue:
 * renders a display-only strikethrough chip. Never a scheduling input.
 * @property {import('../../utils/exec-settings-chip.js').ExecChips|null} [exec_chips] -
 * 실행 설정 칩 (worker-card-exec-chips §2.2): 대기 행과 후보 카드가 "이 설정으로
 * 돌아간다"를 적재 전에 미리 보여 준다. 완료 행·PR 대기 행은 싣지 않는다.
 * @property {DependencyChips|null} [dependency_chips] - 선행/후속 의존 칩
 * (UI-eey2 §5.1). Monitor-only; the Worker console never sets it.
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
 * @property {string} [from_id] - Origin bead of a `discovered-from` edge.
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
      ${done_at_label
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
            title="attempt 실행 시간 합산 (재개 세션 포함)"
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
 * @param {MiniItem} item
 * @returns {import('lit-html').TemplateResult}
 */
export function miniRow(item) {
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
  // 표시 전용 취소선 잔재 (UI-04vo §4): 라벨 정리는 사용자/워크플로 몫이고,
  // 스케줄링은 이 라벨을 더 이상 소비하지 않는다.
  const serial_el =
    item.worker_serial === true
      ? html`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
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
  // route 칩은 ID 다음, 제목 앞이다 (UI-yrzu §7.2) — 완료 행만 제외한다: 끝난
  // 일의 route는 더 이상 어떤 결정도 바꾸지 않는다.
  const route_el = item.lane === 'done' ? '' : routeChipTemplate(item.workflow);
  // 출처 칩도 완료 행에서는 빠진다 — route 칩과 같은 이유다. 끝난 일에서 남는
  // 질문은 "무엇이 끝났나"뿐이라 ID와 제목이면 충분하고, 좁은 화면에서 칩이
  // 가져가는 가로는 그대로 제목이 잃는 가로다.
  const from_el = item.lane === 'done' ? '' : fromChipTemplate(item.from_id);
  // 우선순위는 ID 바로 다음이다 — Board 카드와 같은 자리, 같은 문장.
  const pri_el = priorityBadgeTemplate(item.priority);
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
  // 저장소 작업 단계에서 머지 액션이 잠긴 카드 (UI-q0uy §4.4). 잠금 사유를
  // 여기서 다시 문장으로 쓰지 않고, 그 사유가 실제로 적혀 있는 타임라인으로
  // 보낸다 — 같은 사실을 두 곳에 쓰면 한쪽은 반드시 낡는다.
  const timeline_el = item.timeline_action
    ? html`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${item.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
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
  // 완료 행은 2줄 변형이라 실을 자리가 없다. 칩이 하나도 없으면 줄 자체를 그리지
  // 않는다 — 빈 div는 카드에 여백만 남긴다.
  const exec_el =
    item.lane !== 'pr_wait' &&
    !item.done &&
    item.exec_chips &&
    (item.exec_chips.orchestration || item.exec_chips.worker)
      ? html`<div class="worker-mini__exec">
          ${execChipsTemplate(item.exec_chips, {
            pin: item.exec_chips_pinned === true
          })}
        </div>`
      : '';
  const deps_el = dependencyChipsTemplate(item.dependency_chips, {
    lane: item.lane
  });
  const receipt_el = discardReceiptTemplate(item);
  const has_foot = !!(
    usage_label ||
    merging ||
    item.merge_action ||
    item.cancel_action ||
    item.timeline_action ||
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
            ${repo_el}${id_el}${pri_el}${from_el}${title_el}
          </div>
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
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${formatElapsed(item.work_ms)}</span
                >`
              : ''}${badge_els}${merge_step_el}
            <span class="worker-mini__actions"
              >${merge_el}${cancel_el}${timeline_el}${discard_el}</span
            >
            ${timesMeta(item)}
          </div>`
      : card
        ? html`<div class="worker-mini__head">
              ${grip}${seq_el}${repo_el}${id_el}${pri_el}${route_el}${from_el}${pr_el}${repair_pr_el}${badge_els}${serial_el}${reason_el}
            </div>
            <div class="worker-mini__body">${title_el}${stale_details}</div>
            ${deps_el}${exec_el}${has_foot
              ? html`<div class="worker-mini__foot">
                  ${usage_el}${merge_step_el}
                  <span class="worker-mini__actions"
                    >${merge_el}${cancel_el}${timeline_el}${discard_el}${revise_els}${stale_els}</span
                  >
                  ${discardReceiptTemplate(item)}
                </div>`
              : ''}
            ${timesMeta(item)}`
        : // 한 줄 변형은 본문을 `__line`으로 감싸고 메타 줄을 형제로 붙인다
          // (UI-d7pw §4.1). 드래그 계약은 바깥 `.worker-mini`의
          // `data-bead-id`/`data-lane`에 걸려 있어 내부 재구성에 영향받지 않는다.
          html`<div class="worker-mini__line">
              ${grip}${seq_el}${repo_el}${id_el}${pri_el}${route_el}${from_el}${title_el}${pr_el}${repair_pr_el}${badge_els}${serial_el}${reason_el}${usage_el}${merge_step_el}${merge_el}${cancel_el}${timeline_el}${discard_el}
            </div>
            ${deps_el}${exec_el}${receipt_el} ${timesMeta(item)}`}
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
 * One candidate `.worker-card` (spec §2, mockup 변형 B). Richer than
 * {@link miniRow}: a route chip + the Board's route-driven stepper. It keeps
 * miniRow's drag contract (`draggable` / `data-bead-id` / `data-lane`) so the
 * drag controller treats it identically. An issue without `workflow` (inactive
 * workspace) renders without the chip/stepper and never throws.
 *
 * `exec_chips_mode` (UI-eey2 §5) says what this card's exec chips MEAN.
 * `always` — the Worker console's contract, unchanged — draws the resolved
 * settings. `pinned_only` says the caller has already filtered them down to the
 * issue pins that differ from the repo default, so they are drawn in the pin
 * colour with the pin tooltip; the card never decides that itself, because only
 * the caller knows the repo's defaults.
 *
 * `dep_action` (UI-j92s §6.1) adds the `⛓ 의존성` button next to `대기로 ↴`.
 * 조작 버튼 묶음은 카드가 소유하므로 여기서만 그릴 수 있고, Worker 콘솔은 이
 * 옵션을 넘기지 않으므로 렌더가 그대로다.
 *
 * @param {MiniItem} item
 * @param {PlaceMenu|null} [place_menu]
 * @param {{ exec_chips_mode?: 'always'|'pinned_only', dep_action?: boolean, onOpenDoc?: import('../board/stepper.js').OpenDocHandler }} [options]
 * @returns {import('lit-html').TemplateResult}
 */
export function candidateCard(item, place_menu = null, options = {}) {
  // Observation-only rows (UI-8881) are refused here as well as by the
  // projection, so the card cannot become draggable through a caller that
  // forgot the conjunction.
  const worker_ineligible = item.worker_ineligible === true;
  const draggable = item.draggable && !item.done && !worker_ineligible;
  const menu_open = draggable && place_menu && place_menu.bead_id === item.id;
  const workflow = item.workflow;
  const missing_description =
    typeof item.reason === 'string' &&
    item.reason.split(' · ').includes('missing_description');
  const danger =
    typeof item.reason === 'string' && item.reason.startsWith('⛔');
  const deps_el = dependencyChipsTemplate(item.dependency_chips, {
    lane: item.lane
  });
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
      ${item.workspace_name
        ? html`<span class="worker-card__repo" title=${item.root_dir || ''}
            >${item.workspace_name}</span
          >`
        : ''}
      <span class="worker-card__id" title="클릭하면 ID 복사">${item.id}</span
      >${priorityBadgeTemplate(item.priority)}
      ${routeChipTemplate(workflow)}${worker_ineligible
        ? html`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`
        : ''}${fromChipTemplate(item.from_id)}
    </div>
    <div class="worker-card__title">${item.title}</div>
    ${workflow
      ? stepperTemplate(workflow, item.status, {
          onOpenDoc: options.onOpenDoc
        })
      : ''}${deps_el}
    ${item.exec_chips &&
    (item.exec_chips.orchestration || item.exec_chips.worker)
      ? html`<div class="worker-mini__exec">
          ${execChipsTemplate(item.exec_chips, {
            pin: options.exec_chips_mode === 'pinned_only'
          })}
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
                : worker_ineligible
                  ? 'worker-ineligible label로 워커에서 실행할 수 없습니다'
                  : missing_description
                    ? 'description이 없어 대기 큐에 넣을 수 없습니다'
                    : 'spec이 없어 대기 큐에 넣을 수 없습니다'}
            >
              대기로 ↴</button
            >${options.dep_action === true
              ? html`<button
                  type="button"
                  class="worker-card__dep mon-dep__btn"
                  data-bead-id=${item.id}
                  title="의존성"
                  aria-label="의존성"
                >
                  ⛓
                </button>`
              : ''}`}
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
 * @param {{ id: string, lane: 'candidate'|'queue'|'running'|'pr_wait'|'done'|'s1'|'s2'|'s3'|'s4'|'s5', title: string, items: MiniItem[], src?: boolean, empty?: string, body?: import('lit-html').TemplateResult, controls?: import('lit-html').TemplateResult, header_control?: import('lit-html').TemplateResult|string, live?: boolean, collapsible?: boolean, collapsed?: boolean, preview?: string, place_menu?: PlaceMenu|null, onOpenDoc?: import('../board/stepper.js').OpenDocHandler }} pane
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
                    pane.lane === 'candidate'
                      ? candidateCard(it, pane.place_menu, {
                          onOpenDoc: pane.onOpenDoc
                        })
                      : miniRow(it)
                  )}
          </div>`}
  </section>`;
}
