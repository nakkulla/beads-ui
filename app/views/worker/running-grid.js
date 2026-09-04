/**
 * Running grid templates for the Worker console (spec §5.2, §5.6).
 *
 * Phase 10: the running grid renders REAL attempt tiles derived from the queue
 * snapshot's `attempts` (status='running'), pushed via `worker-queue-snapshot`.
 * Failed/orphaned attempts render as compact decision tiles. The transcript
 * viewer (tile click →
 * drawer) is Phase 11 — here the tile just surfaces attempt data.
 *
 * Grid: `repeat(auto-fill, minmax(215px,1fr))` with its own internal scroll
 * (`worker-final.html`); one column on mobile.
 */
import { html } from 'lit-html';
import { formatContinuationLineage } from '../../utils/attempt-display.js';
import { resumeKindOf } from '../../utils/quickfix-resume-kind.js';
import { formatRelativeTime } from '../../utils/relative-time.js';
import { sessionRefLabel } from '../../utils/session-ref.js';
import {
  formatUsageTotalWithCost,
  providerUsageBadges,
  usageTooltip
} from '../../utils/token-usage.js';
import {
  childExecChips,
  execReceiptActor,
  formatExecReceipt
} from '../board/card.js';
import { childRollupTemplate } from '../child-rollup.js';
import { chipPopoverTemplate } from '../chip-popover.js';
import {
  failureCategory,
  failureSentence,
  failureText
} from './failure-labels.js';
import {
  crossLaneChipTemplate,
  dependencyChipsTemplate,
  discardReceiptTemplate,
  execChipsTemplate,
  priorityBadgeTemplate,
  recChipTemplate,
  routeChipTemplate,
  timesMeta
} from './lanes.js';
import { logPathTemplate } from './log-path.js';

/**
 * @import { SessionRefView } from '../../../server/worker/session-ref.js'
 */

/**
 * @typedef {Object} RunningTile
 * @property {string} bead_id
 * @property {string} attempt_id
 * @property {boolean} [search_match] - 워커 탭 검색어와의 일치 (UI-6g3t §7).
 * `false`인 타일만 `is-dimmed`로 흐려지고, 검색 중이 아니면 키가 없다.
 * @property {'session'} [kind] - 세션이 `in_progress`로 잡은 이슈의 타일
 * (UI-yrzu §6). attempt가 없으므로 운영 버튼·세션 드로어·위임 칩이 없고,
 * 경과는 bead의 `started_at`에서 온다. 생략(=Worker attempt 타일)이 기본이다.
 * @property {number} [priority] - Bead 우선순위 0..4 (배지 `P<n>`).
 * @property {import('./lanes.js').MiniItem['workflow']} [workflow] - route 칩과
 * (세션 타일의) exec_receipt 칩 재료 (UI-yrzu §7.2). 없으면 칩이 생략된다.
 * @property {SessionRefView[]} [session_refs] - 이 이슈를 잡은 세션들 (UI-4xzk
 * §6.4), 과거 → 현재 순. 마지막 유효 항목(`current`)이 `▤ 세션`·칩·활동 줄의
 * 재료다. 비어 있으면 세션 타일은 UI-yrzu §6 그대로다.
 * @property {string} title
 * @property {string|null} runner
 * @property {string|null} model
 * @property {string|null} [effort]
 * @property {string|null} [speed]
 * @property {number|null} started_at
 * @property {string|null} [resumed_from] - Prior attempt this one resumes (§1).
 * @property {'session'|'fresh'|null} [continuation_mode]
 * @property {boolean} [paused] - Leaf paused attempt: shows ▶ instead of ⏸ and
 * has no live elapsed clock (worker-phase1 §1.1/§2.1).
 * @property {boolean} [failed] - Unhandled failed/orphaned attempt. Failed
 * tiles stay visible for resume/discard actions and have no live controls.
 * @property {boolean} [parked] - 사용자 결정을 기다리며 정상 종료한 attempt
 * (UI-5ym8 §3.1). 실패가 아니므로 큐는 계속 가고, 타일은 `cause_detail.summary`
 * 한 줄과 `재시도`·`폐기`만 싣는다.
 * @property {boolean} [retry_wait] - 환경성 실패의 backoff를 기다리는 attempt
 * (§3.3). 배지가 상태를 말하므로 본문은 비고, 액션 foot에는 `폐기` 하나만 선다
 * (2026-08-29 held-tile-discard §5.1) — 재시도는 사다리가 스스로 한다.
 * @property {boolean} [waiting] - 선행 미충족으로 착수를 거부하고 정상 종료한
 * attempt (선행 대기 계층 §5.2). 실패도 파킹도 아니므로 `재시도`가 없다 — 선행이
 * 닫히면 보통 후보로 저절로 돌아온다.
 * @property {boolean} [provider_hold] - 공급자 회복을 기다리는 paused leaf.
 * 사용자 일시정지와 달리 슬롯 1 판정 뱃지와 슬롯 6 복구 액션을 얻는다.
 * @property {WaitTile|null} [wait] - 선행 대기 타일의 재료. 실패 투영과 따로인
 * 이유는 §5.1에 있다: 실패 팝오버가 묻는 질문에 이 결말이 답할 것이 없다.
 * @property {FailureTile|null} [failure] - Failed-tile decision material. The
 * renderer reads failure detail only through this explicit projection. A parked
 * tile carries the SAME projection — the question it answers ("무엇이 이 시도를
 * 끝냈나") is the same one.
 * @property {RetryTile|null} [retry] - backoff 사실 (§6). `retry_wait` 타일의
 * 배지 재료이며, 없으면 배지가 그려지지 않는다 (fail-quiet).
 * @property {HoldTile|null} [hold] - 슬롯 1 판정과 상세 팝오버에만 쓰는 hold 재료.
 * @property {'running'|'paused'|'failed'|'orphaned'|'parked'|'retry_wait'|'waiting'|'provider_hold'} [status] - Raw
 * attempt status, used to distinguish failure from orphan interruption.
 * @property {string} [status_label] - Terminal status label for a failed tile.
 * @property {boolean} [can_pause] - Running attempt whose session id is already
 * captured. Pausing before that would strand an unresumable attempt, so the ⏸
 * button renders disabled until it lands (§2.1).
 * @property {number|string} [created_at] - Bead 생성 시각 (UI-d7pw §4.1).
 * @property {number|string} [updated_at] - Bead 수정 시각 (UI-d7pw §4.1).
 * @property {import('../../utils/child-rollup.js').ChildRollup|null} [rollup] -
 * Child 진행도 (worker-card-exec-chips §3.3) — 큐 스냅샷에 페이즈명이 없으므로
 * `children N/M` + 현재 child 줄이 "지금 어디까지"에 답하는 유일한 사실이다.
 * child가 없는 bead는 null이고 블록 자체가 생략된다 (fail-quiet).
 * @property {boolean} [rollup_expanded] - 이 bead의 child 목록이 펼쳐져 있는지.
 * 기본은 접힘이고, 펼침 상태는 뷰가 소유한다.
 * @property {import('../../utils/exec-settings-chip.js').ExecChips|null} [exec_chips] -
 * 오케(이 attempt의 기록값) + 워커(현재 해석값) 실행 설정 칩 (§2.2); 둘 다
 * 없으면 null이고 meta 줄이 그만큼 짧아진다.
 * @property {import('../../utils/token-usage.js').UsageRecord|import('../../utils/token-usage.js').UsageProjection|null} [usage] - Live token usage
 * of this attempt (UI-raqh §1); absent/null renders nothing.
 * @property {boolean} [conflict_resolution] - Attempt dispatched to resolve a
 * PR conflict (worker-phase2 §6) rather than to do the bead's work; the tile
 * says so, because the two look identical otherwise (UI-dxgz §1).
 * @property {string|null} [base_exception] - `→ <target_base>` when this
 * attempt targets a base other than the workspace's declared one (UI-j6wa §3);
 * null on a match and on either side being unknown.
 * @property {{ step: string, label: string, index: number, total: number, percent: number, active: boolean, failed: boolean }} [landing] - Worker-owned
 * quick_fix landing progress projected by `prWaitProgress`; absent omits the
 * line (fail-quiet).
 * @property {any} [discard] - Shared durable discard UI projection.
 * @property {boolean} [resolve_action] - Render `[세션에서 해결]` (UI-jw27 §4).
 * 이 타일이 실패한 폐기 작업을 싣고 있을 때만 Worker 어댑터가 켠다 — Monitor는
 * 이 필드를 넘기지 않으므로 클릭을 배선하지 않은 탭에 죽은 버튼이 서지 않는다.
 * @property {boolean} [resolve_enabled] - false면 이 타일의 클릭이 아직 서버
 * 응답을 기다리는 중이라 버튼이 잠긴다.
 * @property {string} [resolve_title] - hover 문구: 이 클릭이 무엇을 띄우는지.
 * 없으면 렌더러의 기본 문장이 대신 선다.
 * @property {import('../../utils/rec-settings.js').RecSettings|null} [rec] -
 * 복잡 판정 (UI-sbum §3), 레인 행·후보 카드와 같은 칩·같은 툴팁. 표시 전용이다.
 * @property {{ at?: number|null, kind?: string, text?: string, tool?: string }|null} [last_activity] -
 * 이 attempt의 마지막 비-thinking 전사 한 줄 (UI-4tud §4.3). 타일이 직접 싣는다 —
 * 조립이 타일 밖 `Map`으로 같은 재료를 두 번 나르지 않는다.
 * @property {Array<{ label: string, state: 'live'|'done'|'failed', agent_type?: string|null }>} [legs] -
 * 위임 leg. 끝난 것은 접혀 한 칩이 된다.
 * @property {{ chip_key: string, content: import('../chip-popover.js').ChipPopoverContent }|null} [chip_popover] -
 * 이 타일에서 열려 있는 판정 칩 사유 팝업 (UI-8x90 §4.5). 슬롯 5 줄이 싣는다.
 * @property {import('./lanes.js').DependencyChips|null} [dependency_chips] -
 * 의존·겹침 칩 (슬롯 4). 재료가 없으면 줄이 통째로 빠진다 (fail-quiet).
 */

/**
 * 공급자 장애가 실패가 아니라는 판단과 복구 선택에 필요한 hold 표시 재료.
 *
 * @typedef {Object} HoldTile
 * @property {'outage'|'usage_limit'} kind
 * @property {string} detail
 * @property {string} [message]
 * @property {string} [summary]
 * @property {{ model?: string, account?: string, account_alias?: string }} [target]
 * @property {'pending'|'disarmed'|`refused:${string}`} [auto_resume]
 * @property {'none'|'cap'|'disabled'} [auto_switch] - Why the limit hold did not
 * move to another account (§8.3). Absent when it did switch.
 * @property {number} [resets_at]
 * @property {number} [next_probe_at]
 * @property {string} [log_path]
 * @property {boolean} [open]
 */

/**
 * One attempt's backoff record (UI-5ym8 §6). `attempts` counts the tries the
 * lineage has spent INCLUDING this one, so `n/max` reads the way a person
 * counts. `next_at` is absent when the retry is already due.
 *
 * @typedef {Object} RetryTile
 * @property {string|null} cause
 * @property {number} attempts
 * @property {number} max
 * @property {number|null} next_at
 */

/**
 * 선행 대기 attempt의 결정 재료 (선행 대기 계층 §5.1).
 *
 * `blockers`는 서버가 판정 시점에 증명한 미해결 `blocks` 엣지이며 세션 결과줄이
 * 아니다 (§4.2). `summary`는 세션의 마지막 문장이고, 없으면 본문 줄을 그리지
 * 않는다 (fail-quiet).
 *
 * @typedef {Object} WaitTile
 * @property {string|null} summary
 * @property {Array<{ id: string, rig: string|null, status: string }>} blockers
 * @property {number|null} since - 이 attempt가 대기로 마감된 시각.
 * @property {boolean} [returning]
 */

/**
 * @typedef {Object} FailureTile
 * @property {string|null} cause
 * @property {{ reason?: string|null, command?: string|null, summary?: string|null, message?: string|null, resets_at?: number|null }|null} cause_detail
 * @property {string|null} [summary] - 세션의 마지막 오류/보고 한 줄 (UI-5ym8
 * §6), `cause_detail`에서 끌어올린 값. 타일 본문과 팝오버 첫 줄이 같은 것을
 * 읽는다. 옛 기록에는 없다 (fail-quiet).
 * @property {string} [bead_id] - 이 시도가 속한 bead. Worker 액션이 CAS 명령의
 * `bead_id`로 사용하므로 투영이 실어 나른다.
 * @property {RetryTile|null} [retry] - 이 실패 앞에 있었던 backoff 이력 (§6).
 * @property {number|null} finished_at
 * @property {string|null} runner
 * @property {string|null} model
 * @property {string|null} effort
 * @property {string|null} observed_effort
 * @property {string|null} speed
 * @property {string} attempt_id
 * @property {import('../../utils/token-usage.js').UsageRecord|import('../../utils/token-usage.js').UsageProjection|null} usage
 * @property {boolean} halted_auto_advance
 * @property {boolean} quickfix_lane
 * @property {{ cursor?: string|null, head_sha?: string|null, reason?: string|null }|null} quickfix_landing
 * @property {boolean} resume_eligible
 * @property {string|null} resume_reason
 * @property {boolean} landed
 * @property {'merged'|'unmerged'} confirmation
 * @property {TimelineRow[]} [timeline] - 이 bead의 최근 이력, 최신순
 * (record-timeline-retention §9). `lane-model.js`가 스냅샷의 `bead_timelines`
 * 에서 실어 나른 것이며, 이력이 없는 bead는 키 자체가 없다 (fail-quiet).
 * @property {string} [log_path] - §4 해석 순서가 실제로 찾아낸 위치이므로
 * 아카이브(`.gz`)일 수도 있고, 기록된 값과 다를 수도 있다. 없으면 줄이 빠진다.
 * @property {boolean} [log_expired] - 보존 정책이 로그를 지웠다 (§4). 경로가
 * 없다는 것과 다른 대답이므로 자기 키를 갖는다.
 * @property {boolean} [log_unreadable] - 해석 사다리가 저장소 오류를 만났다
 * (§4). 삭제된 것이 아니므로 만료됨과 다른 문구를 쓴다.
 * @property {boolean} [open] - Ephemeral view state for this attempt's detail.
 */

/**
 * One line of a bead's Worker history (record-timeline-retention §5), already
 * projected: the renderer never sees a raw event, only what it draws.
 *
 * @typedef {Object} TimelineRow
 * @property {string} event_id - lit-html의 반복 키.
 * @property {string} kind
 * @property {string} summary
 * @property {number|null} at
 */

/**
 * Format an elapsed duration (ms) as `MmSSs` / `SSs`. Exported so the monitor
 * tab writes a running attempt's elapsed the same way this tile does (UI-53es
 * §1) — the same fact must not read differently on two tabs.
 *
 * @param {number} ms
 * @returns {string}
 */
export function formatElapsed(ms) {
  if (!Number.isFinite(ms) || ms < 0) {
    return '0s';
  }
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return m > 0 ? `${m}m ${String(s).padStart(2, '0')}s` : `${s}s`;
}

/**
 * 세션이 남긴 한 줄의 표시 길이 (UI-5ym8 §6). 기록 쪽 규칙과 같은 200자다 —
 * 서버가 이미 자른 값이 대부분이지만, 옛 기록과 다른 경로로 들어온 값까지
 * 타일 높이를 좌우하게 두지 않는다.
 */
const SUMMARY_MAX = 200;

/**
 * @param {unknown} summary
 * @returns {string}
 */
function summaryText(summary) {
  if (typeof summary !== 'string' || summary.length === 0) {
    return '';
  }
  return summary.length > SUMMARY_MAX
    ? `${summary.slice(0, SUMMARY_MAX)}…`
    : summary;
}

/**
 * The 재시도 대기 badge: how many tries of how many, and when the next one is
 * due (UI-5ym8 §8). Each half is dropped on its own when the record does not
 * carry it, so an older or partial `retry` still says the one thing it knows.
 *
 * @param {RetryTile|null|undefined} retry
 * @returns {string}
 */
function retryWaitBadgeText(retry) {
  const count =
    retry && retry.attempts > 0 && retry.max > 0
      ? ` ${retry.attempts}/${retry.max}`
      : '';
  const next =
    retry && typeof retry.next_at === 'number'
      ? ` · ${new Date(retry.next_at).toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit'
        })}`
      : '';
  return `↻ 재시도 대기${count}${next}`;
}

/**
 * Format a provider timestamp as the local clock.
 *
 * @param {unknown} value
 * @returns {string}
 */
function providerClock(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return '';
  }
  return new Date(value).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Compose the exclusive slot-1 provider-hold verdict badge.
 *
 * @param {HoldTile|null|undefined} hold
 * @returns {string}
 */
export function providerHoldBadgeText(hold) {
  if (!hold) {
    return '';
  }
  const manual = hold.auto_resume === 'disarmed' ? ' · 수동 조치' : '';
  if (hold.kind === 'usage_limit') {
    const reset = providerClock(hold.resets_at);
    if (!reset) {
      return `⏳ 한도 대기 · 리셋 미상${manual}`;
    }
    const account = hold.target?.account_alias || hold.target?.account || '';
    return `⏳ 한도 대기 ${reset}${account ? ` · ${account}` : ''}${manual}`;
  }
  const next = providerClock(hold.next_probe_at);
  return `⚠️ 공급자 장애${next ? ` · 다음 프로브 ${next}` : ''}${manual}`;
}

/**
 * The §9 history block: the bead's most recent timeline lines, newest first,
 * with the log path LAST.
 *
 * Two surfaces draw it — the failure popover and the parked tile — so it is
 * written once. The materials come entirely from the projection; this reads
 * nothing and fetches nothing (ADR 14).
 *
 * Every part is conditional on its own material, so a bead with events but no
 * log draws only the list, a bead whose log the retention policy deleted draws
 * only 만료됨, a bead whose log could not be read draws 읽기 실패 instead — a
 * fault is not a deletion — and a bead with neither draws NOTHING.
 *
 * @param {FailureTile|null|undefined} tile
 * @returns {import('lit-html').TemplateResult|''}
 */
function historyBlockTemplate(tile) {
  if (!tile) {
    return '';
  }
  const rows = Array.isArray(tile.timeline) ? tile.timeline : [];
  const log_path = typeof tile.log_path === 'string' ? tile.log_path : '';
  const expired = tile.log_expired === true;
  const unreadable = tile.log_unreadable === true;
  if (rows.length === 0 && log_path.length === 0 && !expired && !unreadable) {
    return '';
  }
  return html`${rows.length > 0
    ? html`<ol class="rtile__history" data-seam="tile-timeline">
        ${rows.map(
          (row) =>
            html`<li class="rtile__history-row">
              ${historyTimeText(row.at)
                ? html`<span class="rtile__history-at"
                    >${historyTimeText(row.at)}</span
                  >`
                : ''}<span class="rtile__history-summary">${row.summary}</span>
            </li>`
        )}
      </ol>`
    : ''}${unreadable
    ? html`<p
        class="rtile__history-log"
        data-seam="tile-log-path"
        title="로그 파일을 읽을 수 없습니다 — 삭제된 것이 아닙니다"
      >
        읽기 실패
      </p>`
    : expired
      ? html`<p
          class="rtile__history-log"
          data-seam="tile-log-path"
          title="180일 보존 정책으로 삭제됨"
        >
          만료됨
        </p>`
      : log_path.length > 0
        ? html`<p class="rtile__history-log" data-seam="tile-log-path">
            ${logPathTemplate(log_path)}
          </p>`
        : ''}`;
}

/**
 * `HH:MM` for one history line, or `''` when the event carries no time — an
 * event written before the field existed still says what happened.
 *
 * @param {number|null|undefined} at
 * @returns {string}
 */
function historyTimeText(at) {
  if (typeof at !== 'number' || !Number.isFinite(at)) {
    return '';
  }
  return new Date(at).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Failure detail shown from the cause badge. Every row is conditional so an
 * older attempt record never produces placeholder facts.
 *
 * @param {FailureTile|null} failure
 * @param {number} now
 * @returns {import('lit-html').TemplateResult|''}
 */
function failurePopoverTemplate(failure, now) {
  if (!failure || failure.open !== true) {
    return '';
  }
  const cause_text =
    failureSentence(failure.cause) ||
    failureText(failure.cause, failure.cause_detail);
  // 이 실패가 처음이 아니었다는 사실 (UI-5ym8 §8). 재시도 lineage는 같은 원인을
  // 몇 번 다시 시도했는지만 말한다 — 다른 원인이었다면 그 attempt는 이 lineage에
  // 속하지 않았을 것이므로, 문장은 "같은 오류"로 고정이다.
  const retry_history =
    failure.retry && failure.retry.attempts > 0
      ? `자동 재시도 ${failure.retry.attempts}회 — 같은 오류`
      : '';
  const detail = failure.cause_detail;
  const landing =
    failure.quickfix_lane && failure.quickfix_landing
      ? failure.quickfix_landing
      : null;
  const landing_text = landing
    ? [
        landing.cursor || null,
        typeof landing.head_sha === 'string'
          ? landing.head_sha.slice(0, 7)
          : null,
        landing.reason || null
      ]
        .filter(Boolean)
        .join(' · ')
    : '';
  const finished_text =
    typeof failure.finished_at === 'number'
      ? `${new Date(failure.finished_at).toLocaleString('ko-KR')} · ${formatRelativeTime(
          failure.finished_at,
          now
        )}`
      : '';
  const execution_text = [
    failure.runner,
    failure.model,
    failure.observed_effort ?? failure.effort,
    failure.speed
  ]
    .filter((value) => typeof value === 'string' && value.length > 0)
    .join(' · ');
  const cost = failure.usage?.total_cost_usd;
  const cost_text =
    typeof cost === 'number' && Number.isFinite(cost)
      ? `$${cost.toFixed(2)}`
      : '';
  // 최근 이력 5줄 + 로그 경로 (§9). 보고 바로 아래에 붙는다 — 그 한 줄이
  // 무엇이 끝냈는지를 말하면 이 블록은 어떻게 거기까지 왔는지를 말한다.
  const history = historyBlockTemplate(failure);
  return html`<div
    class="rtile__failure-pop"
    role="dialog"
    aria-label="실패 상세"
  >
    <dl class="rtile__failure-kv">
      ${failure.summary
        ? html`<div>
            <dt>보고</dt>
            <dd>${failure.summary}</dd>
          </div>`
        : ''}
      ${history
        ? html`<div>
            <dt>이력</dt>
            <dd>${history}</dd>
          </div>`
        : ''}
      ${cause_text
        ? html`<div>
            <dt>원인</dt>
            <dd>${cause_text}</dd>
          </div>`
        : ''}
      ${retry_history
        ? html`<div>
            <dt>재시도 이력</dt>
            <dd>${retry_history}</dd>
          </div>`
        : ''}
      ${failure.cause
        ? html`<div>
            <dt>실패 코드</dt>
            <dd><code>${failure.cause}</code></dd>
          </div>`
        : ''}
      ${detail?.reason
        ? html`<div>
            <dt>가드/원인</dt>
            <dd>${detail.reason}</dd>
          </div>`
        : ''}
      ${detail?.command
        ? html`<div>
            <dt>명령</dt>
            <dd><code>${detail.command}</code></dd>
          </div>`
        : ''}
      ${landing_text
        ? html`<div>
            <dt>착지 단계</dt>
            <dd>${landing_text}</dd>
          </div>`
        : ''}
      ${finished_text
        ? html`<div>
            <dt>실패 시각</dt>
            <dd>${finished_text}</dd>
          </div>`
        : ''}
      ${execution_text
        ? html`<div>
            <dt>실행</dt>
            <dd>${execution_text}</dd>
          </div>`
        : ''}
      ${failure.attempt_id
        ? html`<div>
            <dt>attempt id</dt>
            <dd>
              <code>${failure.attempt_id}</code>
              <button
                type="button"
                class="rtile__attempt-copy"
                data-attempt-id=${failure.attempt_id}
                title="attempt id 복사"
                aria-label="attempt id 복사"
              >
                ⧉
              </button>
            </dd>
          </div>`
        : ''}
      ${cost_text
        ? html`<div>
            <dt>비용</dt>
            <dd>${cost_text}</dd>
          </div>`
        : ''}
      <div>
        <dt>재개</dt>
        <dd>
          ${failure.resume_eligible
            ? '이어하기 가능'
            : failure.resume_reason || '이어하기 불가'}
        </dd>
      </div>
    </dl>
    ${failure.attempt_id
      ? html`<button
          type="button"
          class="rtile__session"
          title="실패 세션 열기"
          aria-label="실패 세션 열기"
        >
          ▤ 세션
        </button>`
      : ''}
    ${failure.landed
      ? html`<p class="rtile__failure-landed">
          이미 base에 착지됨 — 이어하기로 배포·정리를 재개
        </p>`
      : ''}
  </div>`;
}

/**
 * Explain the automatic recovery receipt without inventing absent state.
 *
 * @param {HoldTile['auto_resume']|undefined} value
 * @returns {string}
 */
function autoResumeText(value) {
  if (value === 'pending') {
    return '회복 후 자동 재개 대기';
  }
  if (value === 'disarmed') {
    return '자동 재개 소진 · 수동 조치 필요';
  }
  if (typeof value === 'string' && value.startsWith('refused:')) {
    return `자동 재개 거부 · ${value.slice('refused:'.length)}`;
  }
  return '';
}

/**
 * Say why a limit hold stayed on its own account (§8.3). `cap` is already told
 * by `auto_resume`, so only the two reasons nothing else reports are worded.
 *
 * @param {HoldTile['auto_switch']|undefined} value
 * @returns {string}
 */
function autoSwitchText(value) {
  if (value === 'none') {
    return '계정 전환 안 함 · 조건을 만족하는 다른 계정 없음';
  }
  if (value === 'disabled') {
    return '계정 전환 안 함 · 자동 전환 꺼짐';
  }
  return '';
}

/**
 * Provider-hold detail in the same decision-popover frame as failures.
 *
 * @param {HoldTile|null} hold
 * @returns {import('lit-html').TemplateResult|''}
 */
function providerHoldPopoverTemplate(hold) {
  if (!hold || hold.open !== true) {
    return '';
  }
  const target = [
    hold.target?.model,
    hold.target?.account_alias || hold.target?.account
  ]
    .filter((value) => typeof value === 'string' && value.length > 0)
    .join(' · ');
  const reset = providerClock(hold.resets_at);
  const auto_resume = autoResumeText(hold.auto_resume);
  const auto_switch = autoSwitchText(hold.auto_switch);
  return html`<div
    class="rtile__failure-pop rtile__provider-hold-pop"
    role="dialog"
    aria-label="공급자 보류 상세"
  >
    <strong class="rtile__provider-hold-note">작업 실패 아님</strong>
    <dl class="rtile__failure-kv">
      ${hold.summary
        ? html`<div>
            <dt>보고</dt>
            <dd>${hold.summary}</dd>
          </div>`
        : ''}
      ${hold.message
        ? html`<div>
            <dt>원문</dt>
            <dd>${hold.message}</dd>
          </div>`
        : ''}
      ${target
        ? html`<div>
            <dt>타깃</dt>
            <dd>${target}</dd>
          </div>`
        : ''}
      ${reset
        ? html`<div>
            <dt>리셋</dt>
            <dd>${reset}</dd>
          </div>`
        : ''}
      ${auto_resume
        ? html`<div>
            <dt>자동 재개</dt>
            <dd>${auto_resume}</dd>
          </div>`
        : ''}
      ${auto_switch
        ? html`<div>
            <dt>계정 전환</dt>
            <dd>${auto_switch}</dd>
          </div>`
        : ''}
      ${hold.log_path
        ? html`<div>
            <dt>로그</dt>
            <dd>${logPathTemplate(hold.log_path)}</dd>
          </div>`
        : ''}
    </dl>
  </div>`;
}

/**
 * @typedef {Object} MonitorTileOverlay
 * @property {string} [repo] - Owning workspace name; the badge is a coordinate
 * on the monitor and clicking it goes to that repo's Worker tab (UI-eey2 §7).
 * @property {string} [root_dir] - The badge's tooltip.
 * @property {'s1'|'s2'|'s3'|'s4'|'s5'} [serial_lane_id] - Serial lane chip.
 * @property {{ at?: number|null, kind?: string, text?: string, tool?: string }|null} [last_activity] -
 * The attempt's last non-thinking transcript line (§9.3).
 * @property {Array<{ label: string, state: 'live'|'done'|'failed', agent_type?: string|null }>} [legs] -
 * Delegation legs; only the unfinished ones are spelled out.
 * @property {{ lane_id: string, label: string }|null} [cross_lane_chip] -
 * `연결 n` 소속 칩 (UI-8x90 §4.1): 슬롯 5 좌표 칩이므로 직렬 레인 칩 다음이다.
 * @property {import('./lanes.js').DependencyChips|null} [dependency_chips] -
 * 의존·겹침 칩 (§5.1). 실행중 타일도 `⛓ blocked` · `⧉ 겹침` · `scope 없음`을
 * 모두 받는다 (UI-anna §4·§5.3): 이미 출발한 레인에서 blocked는 "선행이 아직
 * 닫히지 않았다"를 말하고, 그것은 사용자가 보고 판단할 사실이다.
 */

/**
 * Monitor-only 좌표 칩 of a running tile (UI-eey2 §7): 레포 배지 · 직렬 레인
 * 칩. 두 칩은 슬롯 5(좌표·실행 사실)이므로 헤더가 아니라 `.rtile__meta`가
 * 싣는다 (UI-251y §3.1). 재료가 없으면 빈 문자열이다 — 호출 자리가 이 값의
 * 유무로 줄을 그릴지 판정하므로 빈 조각을 돌려주면 빈 줄이 남는다.
 *
 * @param {MonitorTileOverlay|null} monitor
 * @returns {import('lit-html').TemplateResult|''}
 */
function monitorTileChips(monitor) {
  if (!monitor || (!monitor.repo && !monitor.serial_lane_id)) {
    return '';
  }
  return html`${monitor.repo
    ? html`<span
        class="worker-card__repo rtile__repo"
        title=${monitor.root_dir || ''}
        >${monitor.repo}</span
      >`
    : ''}${monitor.serial_lane_id
    ? html`<span class="rtile__lane">${monitor.serial_lane_id}</span>`
    : ''}`;
}

/**
 * Claude 서브에이전트 중 Codex 세션을 띄우기만 하는 전달자의 `agent_type`
 * (dotfiles `codex-runner`). 그 세션의 실제 작업은 따로 `codex` runtime leg로
 * 잡히므로, 타일에서는 전달자 leg를 숨겨 같은 위임이 두 칩·두 건으로 보이지
 * 않게 한다. 이름이 바뀌어 안 잡히면 그냥 두 칩이 보인다 (fail-quiet).
 */
const FORWARDER_AGENT_TYPES = new Set(['codex-runner']);

/**
 * Monitor-only 진행 줄 of a running tile (UI-eey2 §7): 최근 활동 · 위임 칩.
 * 실행중 타일은 stepper를 그리지 않는다 — 활동 줄과 위임 칩이 이미 진행을
 * 말하고, stepper는 높이만 차지했다. 끝난 위임은 `위임 완료 n` 한 칩으로 접고
 * 목록은 툴팁으로 물러난다 ("기본은 접고 중요한 것만", 스펙 §2). 재료가 없는
 * 줄은 통째로 생략한다.
 *
 * 의존 칩은 슬롯 4라 이 함수가 싣지 않는다 (UI-251y §2). 자식 롤업과 landing
 * 진행도 같은 슬롯 3이고 이 줄 뒤에 오므로, 의존 칩을 여기 붙이면 슬롯 4가
 * 슬롯 3보다 앞선다.
 *
 * 세션 타일은 전사도 위임 로그도 없다 (UI-yrzu §6): 활동 줄이 답할 수 있는
 * 유일한 사실이 bead의 마지막 갱신 시각이고, 위임 칩은 그릴 근거가 없다.
 * `session`이 그 두 규칙을 함께 켠다.
 *
 * 세션 타일이 `session_ref`로 자기 transcript 파일을 알면 (UI-4xzk §6.4) 그
 * 파일의 마지막 이벤트 시각이 활동 줄을 대신한다 — bead 갱신 시각보다 "언제
 * 마지막으로 움직였나"에 가까운 사실이다. 그것이 없을 때만 `갱신 n 전`이다.
 *
 * @param {MonitorTileOverlay|null} monitor
 * @param {number} now
 * @param {boolean} paused
 * @param {{ updated_at: number|string|null, last_event_at?: number|null }|null} [session]
 * @returns {import('lit-html').TemplateResult|''}
 */
function monitorTileBody(monitor, now, paused, session = null) {
  if (!monitor) {
    return '';
  }
  const activity = monitor.last_activity || null;
  const activity_text =
    activity && typeof activity.text === 'string' ? activity.text : '';
  const activity_at =
    activity && typeof activity.at === 'number' ? activity.at : null;
  // 세션 타일에는 위임 leg가 없다 (UI-yrzu §6) — attempt가 없으므로 그릴
  // 근거가 없다. Worker 타일은 전달자 leg만 걸러 낸다.
  const legs = (
    session || !Array.isArray(monitor.legs) ? [] : monitor.legs
  ).filter(
    (leg) =>
      leg &&
      !(
        typeof leg.agent_type === 'string' &&
        FORWARDER_AGENT_TYPES.has(leg.agent_type)
      )
  );
  const live_legs = legs.filter((leg) => leg && leg.state === 'live');
  const ended_legs = legs.filter((leg) => leg && leg.state !== 'live');
  const session_event_age =
    session && typeof session.last_event_at === 'number'
      ? formatRelativeTime(session.last_event_at, now)
      : '';
  const session_update_age = session
    ? formatRelativeTime(session.updated_at, now)
    : '';
  const session_activity = session_event_age
    ? `최근 활동 ${session_event_age}`
    : session_update_age
      ? `갱신 ${session_update_age}`
      : '';
  return html`${activity_text
    ? html`<div class="rtile__activity${paused ? ' is-paused' : ''}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${activity_text}</span>
        ${activity_at !== null
          ? html`<span class="rtile__activity-age"
              >${formatRelativeTime(activity_at, now)}</span
            >`
          : ''}
      </div>`
    : session_activity
      ? // 전사 한 줄이 아니라 파일 mtime·bead 갱신 시각이므로 점은 살아있음을
        // 주장하지 않는다 (§6) — 초록 점은 라이브 전사만 얻는다.
        html`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${session_activity}</span>
        </div>`
      : ''}${live_legs.length > 0 || ended_legs.length > 0
    ? html`<div class="rtile__legs">
        ${live_legs.map(
          (leg) =>
            html`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${leg.label}</span
            >`
        )}${ended_legs.length > 0
          ? html`<span
              class="rtile__leg rtile__leg--done"
              title=${`완료된 위임: ${ended_legs
                .map((leg) => leg.label)
                .join(', ')}`}
              >위임 완료 ${ended_legs.length}</span
            >`
          : ''}
      </div>`
    : ''}`;
}

/**
 * Why a session's transcript cannot be opened from this server, by locality.
 *
 * @type {Record<string, string>}
 */
const SESSION_OPEN_BLOCKED = {
  remote: '다른 머신 세션 — 이 서버에 transcript 없음',
  missing: 'transcript 파일 없음'
};

/**
 * `▤ 세션` — 세션 타일의 transcript 열기 버튼 (UI-4xzk §6.4). Worker 타일과 같은
 * 클래스·같은 자리(경과 뒤, `세션` 배지 앞)다 — 같은 조작이 타일 종류마다 다른
 * 곳에 있으면 사용자가 버튼을 찾는 자리가 폭이 아니라 종류에 따라 달라진다.
 *
 * 다른 머신이거나 파일이 없으면 열 것이 없으므로 `disabled`다. 버튼을 지우지
 * 않는 것은, 세션이 있다는 사실 자체는 참이고 그 이유를 title이 말하기 때문이다.
 *
 * @param {SessionRefView|null} current
 * @returns {import('lit-html').TemplateResult|''}
 */
function sessionOpenButton(current) {
  if (!current) {
    return '';
  }
  const blocked = SESSION_OPEN_BLOCKED[current.locality] || '';
  return html`<button
    type="button"
    class="rtile__session"
    ?disabled=${blocked.length > 0}
    title=${blocked || '라이브 세션 열기'}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`;
}

/**
 * The body of a tile that is WAITING rather than running (UI-5ym8 §8, 선행 대기
 * 계층 §5.2).
 *
 * A `retry_wait` tile carries the action foot and nothing else, and not even
 * that when the projection withholds the button (2026-08-29 held-tile-discard
 * §5.1): its badge already says how many tries are left and
 * when the next one fires, so a summary line would only make the grid taller
 * while the queue works. `재시도` is not there — the ladder retries by itself
 * and `지금 재시도` is the queue header's operation.
 *
 * A `parked` tile has exactly two things to say: the one line the session left
 * behind, and the two exits. The buttons sit in an action foot rather than in
 * the header, because the header's right end already carries 상태 (카드 문법
 * §5.1) and two more buttons there push it onto a second line at narrow widths.
 *
 * A `waiting` tile says the same one line, then the slot-4a 의존 칩, then `폐기`
 * ONLY. That order is the card grammar's line order (제목 → 진행 → 의존 칩 4a →
 * 액션 foot). The chips have to be drawn HERE because the non-held branch below
 * is the only other place that emits them, so a held tile would otherwise lose
 * the one fact this ending is about — which bead it is waiting on (§2·§5.1·§6).
 *
 * No `재시도`, because the blocker closing re-dispatches the bead by itself
 * (§3 D3) and a button that races that would spend a session on a bead that is
 * still blocked. No 이력 block either: this ending has no attempt history to
 * explain — the session never started.
 *
 * `parked` and `retry_wait` carry no 4a chip: no spec puts one on either, and
 * widening the change would alter tiles this design never judged.
 *
 * @param {'parked'|'retry_wait'|'waiting'|'provider_hold'} kind
 * @param {FailureTile|WaitTile|HoldTile|null} held - 대기 중인 attempt의 투영.
 * @param {import('lit-html').TemplateResult|''} discard_actions - 실패 타일이 쓰는
 * `.rtile__discard`와, 그 작업이 아카이브 단계에서 실패했을 때 뒤따르는
 * `.rtile__discard-abandon` 그대로. 같은 정리이므로 두 번째 조작을 만들지 않는다.
 * 폐기 버튼이 없으면 `''`이라 foot 자체가 재료 없는 줄이 된다.
 * @param {import('lit-html').TemplateResult|''} [dependency_chips] - 슬롯 4a 칩,
 * 이미 계산된 것 그대로. 재료가 없으면 `''`이라 줄이 통째로 빠진다 (fail-quiet).
 * @param {import('lit-html').TemplateResult|''} [resolve_action] - parked 출구.
 * @param {boolean} [discard_failed] - `true`면 같은 실패를 다루는 폐기 조작을
 * 문의 세션 조작보다 먼저 그린다.
 * @returns {import('lit-html').TemplateResult|''}
 */
function heldBodyTemplate(
  kind,
  held,
  discard_actions,
  dependency_chips = '',
  resolve_action = '',
  discard_failed = false
) {
  if (kind === 'provider_hold') {
    return html`<div class="rtile__foot">
      <button
        type="button"
        class="op-btn rtile__resume"
        title="같은 세션으로 이어서 진행"
        aria-label="이어하기"
      >
        ↻ 이어하기
      </button>
      <button
        type="button"
        class="op-btn rtile__resume-alternate"
        title="러너·모델·계정을 바꾸거나 새 세션으로 이어갑니다"
        aria-label="다른 방법으로"
      >
        ⋯ 다른 방법으로
      </button>
      ${discard_actions}
    </div>`;
  }
  if (kind === 'retry_wait') {
    // 스펙 §5.1: 뱃지 `↻ 재시도 대기 n/3 · HH:MM`이 이미 상태를 말하므로 본문은
    // 비운다 (fail-quiet). foot에는 `폐기` 하나뿐이고, 투영이 그 버튼을 주지
    // 않으면 재료 없는 줄이므로 foot 자체를 그리지 않는다.
    if (!discard_actions) {
      return '';
    }
    return html`<div class="rtile__foot">${discard_actions}</div>`;
  }
  const summary = summaryText(held?.summary);
  if (kind === 'waiting') {
    return html`${summary
        ? html`<p class="rtile__held-summary">${summary}</p>`
        : ''}${dependency_chips}
      <div class="rtile__foot">${discard_actions}</div>`;
  }
  // 파킹 타일도 같은 블록을 싣는다 (§9): 팝오버가 없는 타일이므로 이력이
  // 보일 자리가 본문뿐이다.
  const history = historyBlockTemplate(/** @type {FailureTile|null} */ (held));
  return html`${summary
      ? html`<p class="rtile__held-summary">${summary}</p>`
      : ''}${history}
    <div class="rtile__foot">
      ${discard_failed
        ? html`${discard_actions}${resolve_action}`
        : html`${resolve_action}${discard_actions}`}
    </div>`;
}

/**
 * One running-session tile. A click opens the bead detail like every other lane
 * surface (UI-k59y §3) — the live transcript is the tile's own [▤ 세션] button,
 * so the tile is not the one place on this board where the default click means
 * something else. The drawer's tile keeps its `.rtile--sel` ring.
 *
 * `options.monitor` adds the monitor tab's extra lines (UI-eey2 §7) —
 * 레포 배지 · 활동 · 위임/의존 칩. Omitted — every Worker call —
 * renders exactly as before. Exported since UI-eey2 so the monitor renders the
 * SAME tile rather than a second one that drifts.
 *
 * @param {RunningTile} tile
 * @param {number} now
 * @param {string|null} [selected_attempt]
 * @param {{ monitor?: MonitorTileOverlay|null }} [options]
 * @returns {import('lit-html').TemplateResult}
 */
export function runningTile(tile, now, selected_attempt = null, options = {}) {
  // 세션이 잡은 이슈 (UI-yrzu §6): attempt가 없으므로 운영할 것도 열 로그도
  // 없다. 껍데기와 클릭 계약은 Worker 타일과 같다 — 같은 사실은 같은 모양.
  const session = tile.kind === 'session';
  // 계약 값의 마지막 유효 항목이 현재 세션이다 (UI-4xzk §3.1). 없으면 이 타일은
  // 자기 정체를 모르므로 UI-yrzu §6 그대로 그린다 (fail-quiet).
  const session_current =
    session && Array.isArray(tile.session_refs)
      ? tile.session_refs.find((view) => view && view.current === true) || null
      : null;
  const failed = tile.failed === true;
  const failure = failed ? tile.failure || null : null;
  // 파킹·backoff 대기는 실패가 아니다 (UI-5ym8 §2): 같은 투영을 읽지만 실패
  // 뱃지도 팝오버도 얻지 않고, 큐가 계속 간다는 사실이 색으로도 보여야 한다.
  const parked = tile.parked === true && !failed;
  const retry_wait = tile.retry_wait === true && !failed && !parked;
  // 선행 대기는 셋째 held 상태다 (선행 대기 계층 §5.2). 앞의 둘과 배타로 판정해
  // 하나의 배타 자리(상태 뱃지)를 두 상태가 동시에 차지하지 못하게 한다.
  const waiting = tile.waiting === true && !failed && !parked && !retry_wait;
  const provider_hold =
    tile.provider_hold === true &&
    !failed &&
    !parked &&
    !retry_wait &&
    !waiting;
  const park = parked ? tile.failure || null : null;
  const wait = waiting ? tile.wait || null : null;
  const hold = provider_hold ? tile.hold || null : null;
  const held = parked || retry_wait || waiting || provider_hold;
  const paused = !!tile.paused;
  // 대기 중인 타일에 시계를 돌리면 멈춰 있는 것이 일하는 것처럼 읽힌다.
  const elapsed =
    failed || held
      ? tile.status_label ||
        (parked
          ? '세션 대기'
          : retry_wait
            ? '재시도 대기'
            : waiting
              ? '선행 대기'
              : provider_hold
                ? '공급자 보류'
                : tile.status === 'orphaned'
                  ? '중단됨'
                  : '실패')
      : paused
        ? '일시정지'
        : typeof tile.started_at === 'number'
          ? formatElapsed(now - tile.started_at)
          : '—';
  // 오케 칩이 종전 `formatAttemptTuple` 줄을 대신한다 (§4); 워커 칩만 있어도
  // meta 줄은 그려져야 하므로 표시 조건은 두 칩의 존재로 판정한다.
  const exec_chips =
    tile.exec_chips && (tile.exec_chips.orchestration || tile.exec_chips.worker)
      ? tile.exec_chips
      : null;
  const lineage = formatContinuationLineage(tile);
  const provider_badges = providerUsageBadges(tile.usage);
  const usage_label = formatUsageTotalWithCost(tile.usage);
  // Same badge style the lane rows use — a resolution session is a different
  // KIND of run, not a louder one.
  const conflict_badge = tile.conflict_resolution
    ? paused
      ? '충돌 해소 일시정지'
      : '충돌 해소'
    : null;
  // 이 세션이 선언 base가 아닌 곳을 향해 일하고 있다 (UI-j6wa §3). 툴바 칩이
  // 워크스페이스의 base를 상시 말하므로, 타일은 그와 다를 때만 입을 연다.
  const base_badge = tile.base_exception || null;
  const landing = tile.landing;
  const sel = tile.attempt_id && tile.attempt_id === selected_attempt;
  const monitor = options.monitor || null;
  const monitor_chips = monitorTileChips(monitor);
  // 소속 칩은 좌표(레포·직렬 레인) 다음이다 (UI-8x90 §4.1). 재료가 없으면 빈
  // 문자열이라 줄 판정에 영향이 없다.
  const cross_lane_chip = crossLaneChipTemplate(monitor?.cross_lane_chip);
  // 의존·겹침 칩은 슬롯 4다 (UI-251y §2): 활동·위임 줄과 자식 롤업·landing
  // 진행이 모두 슬롯 3이므로 그 뒤에 선다.
  const monitor_deps = monitor
    ? dependencyChipsTemplate(monitor.dependency_chips)
    : '';
  const monitor_body = monitorTileBody(
    monitor,
    now,
    paused,
    session
      ? {
          updated_at: tile.updated_at ?? null,
          last_event_at:
            session_current && session_current.locality === 'local'
              ? session_current.last_event_at
              : null
        }
      : null
  );
  // 세션 타일의 meta 줄은 exec_receipt 칩 하나다 (§6): 계정·토큰은 attempt가
  // 있어야 아는 사실이고, 이 타일에는 attempt가 없다. 라벨은 SHA를 뺀
  // `<kind>:<actor[:effort]>`이고 전체 값은 툴팁이 싣는다.
  const session_receipt = session
    ? tile.workflow?.chips?.exec_receipt || null
    : null;
  // route 칩은 헤더가 아니라 meta 줄이 싣는다: 분류 사실은 슬롯 5고, 헤더에
  // 끼면 좁은 타일에서 조작 버튼이 통째로 다음 줄로 밀린다 (UI-251y §2).
  const route_chip = routeChipTemplate(tile.workflow);
  const rec_chip = recChipTemplate(
    tile.rec,
    tile.chip_popover?.chip_key === 'rec'
  );
  const chip_popover = tile.chip_popover
    ? chipPopoverTemplate(tile.chip_popover.content)
    : '';
  const session_receipt_chip = session_receipt
    ? html`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${formatExecReceipt(session_receipt)}`}
        >${`${session_receipt.kind}:${execReceiptActor(session_receipt)}`}</span
      >`
    : '';
  // 세션 정체 칩은 exec_receipt 앞이다 (UI-4xzk §6.4): 슬롯 5 안에서도 "누가"가
  // "무엇으로 실행했나"보다 앞선다. 이력이 둘 이상일 때만 개수를 덧붙인다 —
  // 하나뿐인 이력은 셀 것이 없다.
  const session_ref_chip = session_current
    ? html`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${session_current.provider}:${session_current.session_id}@${session_current.host}${
          (tile.session_refs || []).length >= 2
            ? ` · 이력 ${(tile.session_refs || []).length}`
            : ''
        }`}
        >${sessionRefLabel(session_current)}</span
      >`
    : '';
  const session_meta =
    monitor_chips ||
    cross_lane_chip ||
    route_chip ||
    session_ref_chip ||
    session_receipt_chip ||
    rec_chip
      ? html`<div class="rtile__meta">
          ${monitor_chips}${cross_lane_chip}${route_chip}${session_ref_chip}${session_receipt_chip}${rec_chip}${chip_popover}
        </div>`
      : '';
  // 상태 뱃지는 슬롯 1이다 (UI-251y §3.1): 다른 카드가 이미 정체성 줄에서
  // 말하는 종류의 사실이라 타일만 제목 아래에 두면 같은 사실이 두 자리에서
  // 읽힌다. 둘 다 드물게만 서므로 헤더 폭에 상시 부담을 주지 않는다.
  const failure_badges = failure
    ? html`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${failure.attempt_id}
          aria-expanded=${failure.open === true ? 'true' : 'false'}
          aria-label="실패 상세"
        >
          ⛔ ${failureCategory(failure.cause) || '실패'}
        </button>
        ${failure.halted_auto_advance
          ? html`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`
          : ''}`
    : '';
  // 판정 칩 슬롯은 하나다 (카드 문법 §5.1): 실패 뱃지가 서는 그 자리에 파킹과
  // backoff·선행·공급자 대기가 선다. 다섯은 배타적이라 폭이 늘지 않는다.
  const held_badge = parked
    ? html`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`
    : retry_wait
      ? html`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${retryWaitBadgeText(tile.retry)}</span
        >`
      : waiting
        ? tile.wait?.returning
          ? html`<span
              class="rtile__held-badge"
              title="막고 있던 선행이 남지 않았습니다 — 다음 pass에서 후보로 돌아갑니다 (슬롯·레인 순서 대기)"
              >⛓ 복귀 대기</span
            >`
          : html`<span
              class="rtile__held-badge"
              title="세션이 선행 미충족으로 착수를 거부했습니다 — 선행이 닫히면 저절로 다시 돕니다"
              >⛓ 선행 대기</span
            >`
        : provider_hold && hold
          ? html`<button
              type="button"
              class="rtile__held-badge rtile__provider-hold-badge"
              data-attempt-id=${tile.attempt_id}
              aria-expanded=${hold.open === true ? 'true' : 'false'}
              aria-label="공급자 보류 상세"
            >
              ${providerHoldBadgeText(hold)}
            </button>`
          : '';
  const status_badges = html`${conflict_badge
    ? html`<span class="worker-mini__badge">${conflict_badge}</span>`
    : ''}${base_badge
    ? html`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${base_badge}</span
      >`
    : ''}${failure_badges}${held_badge}`;
  // 세션 타일의 수정 시각은 활동 줄이 "갱신 n 전"으로 이미 말한다 (§6) —
  // 같은 사실을 두 줄로 쓰지 않는다.
  const times_el = session ? '' : timesMeta(tile);
  // 실패 타일의 재개 버튼이 무엇을 하는지는 착지 실패 사유가 정한다 (UI-8h1x
  // §3.3a). 보이는 문구만 바꾸면 보조기술과 툴팁이 계속 "같은 세션"이라고 잘못
  // 안내하므로 셋을 함께 분기한다.
  const resume_kind = resumeKindOf(failure?.quickfix_landing);
  const resume_label = resume_kind === 'settlement' ? '정산 재개' : '이어하기';
  const resume_title =
    resume_kind === 'settlement'
      ? '착지 정산을 다시 실행'
      : '같은 세션으로 이어서 진행';
  // 실패한 폐기 작업의 두 번째 출구 (UI-jw27 §4). 폐기 실패는 실행 중·held·
  // 파킹 타일 어디서나 날 수 있으므로 상태 분기 밖에서 한 번만 만들고, 자리는
  // `[폐기]`와 같은 슬롯 1 오른쪽 끝이다 — 같은 실패가 내는 두 조작이다.
  const resolve_button = tile.resolve_action
    ? html`<button
        type="button"
        class="rtile__resolve"
        ?disabled=${tile.resolve_enabled === false}
        title=${tile.resolve_title ||
        '이 실패를 사람이 이어받는 대화형 세션을 띄웁니다'}
        aria-label="세션에서 해결"
      >
        세션에서 해결
      </button>`
    : '';
  const discard_button =
    tile.discard?.action && !(failed && failure?.landed === true)
      ? html`<button
          type="button"
          class="rtile__discard"
          data-operation-id=${tile.discard.operation?.operation_id || ''}
          data-confirmation=${failure?.confirmation || 'unmerged'}
          ?disabled=${!tile.discard.enabled}
          title=${tile.discard.title}
          aria-label=${tile.discard.label}
        >
          ${tile.discard.label}
        </button>`
      : '';
  // 아카이브 단계에서 영구 실패한 폐기의 세 번째 출구 (discard-abandon §3.1).
  // 폐기 실패는 실행 중·held·파킹 타일 어디서나 나므로 이 버튼도 `[폐기]`와
  // 같은 자리에서 같은 재료로 만들고, 순서는 `[재시도] → [폐기 포기] →
  // [세션에서 해결]`이다 — 되돌리는 정도가 약한 것부터 읽힌다. `[재시도]`가
  // 없는 타일에서는 이 출구도 없다: 같은 실패 하나가 내는 두 조작이다.
  const abandon_button =
    discard_button && tile.discard?.abandon?.action === true
      ? html`<button
          type="button"
          class="rtile__discard-abandon"
          data-operation-id=${tile.discard.operation?.operation_id || ''}
          data-operation-kind=${tile.discard.operation?.kind || ''}
          data-last-error=${tile.discard.error || ''}
          title=${tile.discard.abandon.title}
          aria-label=${tile.discard.abandon.label}
        >
          ${tile.discard.abandon.label}
        </button>`
      : '';
  const discard_actions = abandon_button
    ? html`${discard_button}${abandon_button}`
    : discard_button;
  return html`<div
    class="rtile${sel ? ' rtile--sel' : ''}${paused
      ? ' rtile--paused'
      : ''}${failed ? ' rtile--failed rtile--compact' : ''}${held
      ? ' rtile--held rtile--compact'
      : ''}${parked ? ' rtile--parked' : ''}${retry_wait
      ? ' rtile--retry-wait'
      : ''}${waiting ? ' rtile--waiting' : ''}${session
      ? ' rtile--session'
      : ''}${provider_hold
      ? ' rtile--provider-hold'
      : ''}${tile.search_match === false ? ' is-dimmed' : ''}"
    data-bead-id=${tile.bead_id}
    data-attempt-id=${tile.attempt_id || ''}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${session ? ' rtile__dot--session' : ''}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${tile.bead_id}</span>
      ${priorityBadgeTemplate(tile.priority)}${lineage
        ? html`<span class="rtile__resumed" title=${lineage}>↻</span>`
        : ''}${status_badges}
      <div class="rtile__hd-actions">
        ${session
          ? html`${typeof tile.started_at === 'number'
                ? html`<span class="rtile__elapsed">${elapsed}</span>`
                : ''}${sessionOpenButton(session_current)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`
          : html`<span class="rtile__elapsed">${elapsed}</span>`}
        ${session || held
          ? ''
          : failed
            ? html`<button
                  type="button"
                  class="op-btn rtile__resume"
                  data-resume-kind=${resume_kind}
                  ?disabled=${failure?.resume_eligible === false}
                  title=${failure?.resume_eligible === false
                    ? failure.resume_reason || `${resume_label} 불가`
                    : resume_title}
                  aria-label=${resume_label}
                >
                  ↻ ${resume_label}
                </button>
                ${discard_actions}`
            : html`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${paused
                  ? html`<button
                      type="button"
                      class="op-btn rtile__resume"
                      title="같은 세션으로 이어서 재개"
                      aria-label="재개"
                    >
                      ▶ 재개
                    </button>`
                  : html`<button
                      type="button"
                      class="rtile__pause"
                      ?disabled=${tile.can_pause === false}
                      title=${tile.can_pause === false
                        ? '세션 ID 기록 전 — 일시정지 불가'
                        : '일시정지 (같은 세션으로 재개 가능)'}
                      aria-label="일시정지"
                    >
                      ⏸
                    </button>`}
                ${discard_actions}`}${parked ? '' : resolve_button}
      </div>
    </div>
    <div class="rtile__title">${tile.title}</div>
    ${held
      ? heldBodyTemplate(
          parked
            ? 'parked'
            : retry_wait
              ? 'retry_wait'
              : waiting
                ? 'waiting'
                : 'provider_hold',
          parked ? park : waiting ? wait : hold,
          discard_actions,
          waiting ? monitor_deps : '',
          parked ? resolve_button : '',
          parked && !!tile.discard?.error
        )
      : failed
        ? ''
        : html`${monitor_body}${tile.rollup
              ? childRollupTemplate(tile.rollup, {
                  parent_id: tile.bead_id,
                  expanded: tile.rollup_expanded === true,
                  childChips: childExecChips
                })
              : ''}
            ${landing
              ? html`<div class="rtile__landing">
                  <span
                    class="merge-step${landing.failed
                      ? ' merge-step--failed'
                      : ''}"
                    style=${`--progress: ${landing.percent}%`}
                    >${landing.label}${landing.index > 0
                      ? html`<span class="merge-step__n"
                          >${landing.index}/${landing.total}</span
                        >`
                      : ''}</span
                  >
                </div>`
              : ''}
            ${monitor_deps}
            ${session
              ? session_meta
              : monitor_chips ||
                  cross_lane_chip ||
                  route_chip ||
                  exec_chips ||
                  rec_chip ||
                  provider_badges.length > 0 ||
                  usage_label
                ? html`<div class="rtile__meta">
                    ${monitor_chips}${cross_lane_chip}${route_chip}${execChipsTemplate(
                      tile.exec_chips
                    )}${rec_chip}
                    ${provider_badges.length > 0
                      ? provider_badges.map(
                          (badge) =>
                            html`<span
                              class="worker-usage"
                              title=${badge.tooltip}
                              >${badge.label}</span
                            >`
                        )
                      : usage_label
                        ? html`<span
                            class="worker-usage"
                            title=${usageTooltip(tile.usage)}
                            >${usage_label}</span
                          >`
                        : ''}${chip_popover}
                  </div>`
                : ''}
            ${discardReceiptTemplate(tile)} ${times_el}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${failed || paused
              ? ''
              : html`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${failurePopoverTemplate(failure, now)}${providerHoldPopoverTemplate(hold)}
  </div>`;
}

/**
 * The tile-overlay a Worker tile builds from its OWN fields (UI-4tud §4.3).
 * 종전에는 조립이 타일 밖 `Map`으로 같은 재료를 두 번 날랐다 — 그 두 번째
 * 경로가 없어지면서 판정만 여기로 옮겨 왔고 규칙은 그대로다.
 *
 * 세션 타일은 재료가 하나도 없어도 오버레이를 얻는다: 그래야 템플릿이 bead
 * 갱신 시각으로 물러선 활동 줄을 그린다 (UI-yrzu §6).
 *
 * @param {RunningTile} tile
 * @returns {MonitorTileOverlay|null}
 */
function tileOverlay(tile) {
  const last_activity =
    tile.last_activity && typeof tile.last_activity === 'object'
      ? tile.last_activity
      : null;
  const legs = Array.isArray(tile.legs) ? tile.legs : [];
  const chips = tile.dependency_chips || null;
  if (
    !last_activity &&
    legs.length === 0 &&
    !chips &&
    tile.kind !== 'session'
  ) {
    return null;
  }
  return {
    ...(last_activity ? { last_activity } : {}),
    ...(legs.length > 0 ? { legs } : {}),
    ...(chips ? { dependency_chips: chips } : {})
  };
}

/**
 * Running grid. Renders one tile per running attempt; empty message otherwise.
 *
 * @param {RunningTile[]} tiles
 * @param {number} [now]
 * @param {string|null} [selected_attempt]
 * @returns {import('lit-html').TemplateResult}
 */
export function runningGridTemplate(
  tiles,
  now = Date.now(),
  selected_attempt = null
) {
  const list = Array.isArray(tiles) ? tiles : [];
  return html`<div class="worker-rungrid" id="worker-rungrid">
    ${list.length === 0
      ? html`<div class="worker-rungrid__empty">실행 세션 없음</div>`
      : list.map((t) =>
          runningTile(t, now, selected_attempt, { monitor: tileOverlay(t) })
        )}
  </div>`;
}
