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
import {
  failureCategory,
  failureSentence,
  failureText
} from './failure-labels.js';
import {
  dependencyChipsTemplate,
  discardReceiptTemplate,
  execChipsTemplate,
  priorityBadgeTemplate,
  recChipTemplate,
  routeChipTemplate,
  timesMeta
} from './lanes.js';

/**
 * @import { SessionRefView } from '../../../server/worker/session-ref.js'
 */

/**
 * @typedef {Object} RunningTile
 * @property {string} bead_id
 * @property {string} attempt_id
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
 * @property {FailureTile|null} [failure] - Failed-tile decision material. The
 * renderer reads failure detail only through this explicit projection.
 * @property {'running'|'paused'|'failed'|'orphaned'} [status] - Raw attempt
 * status, used to distinguish failure from orphan interruption.
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
 * @property {import('../../utils/rec-settings.js').RecSettings|null} [rec] -
 * 복잡 판정 (UI-sbum §3), 레인 행·후보 카드와 같은 칩·같은 툴팁. 표시 전용이다.
 */

/**
 * @typedef {Object} FailureTile
 * @property {string|null} cause
 * @property {{ reason?: string|null, command?: string|null }|null} cause_detail
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
 * @property {boolean} [open] - Ephemeral view state for this attempt's detail.
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
    failureSentence(failure.cause) || failureText(failure.cause);
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
  return html`<div
    class="rtile__failure-pop"
    role="dialog"
    aria-label="실패 상세"
  >
    <dl class="rtile__failure-kv">
      ${cause_text
        ? html`<div>
            <dt>원인</dt>
            <dd>${cause_text}</dd>
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
 * @typedef {Object} MonitorTileOverlay
 * @property {string} [repo] - Owning workspace name; the badge is a coordinate
 * on the monitor and clicking it goes to that repo's Worker tab (UI-eey2 §7).
 * @property {string} [root_dir] - The badge's tooltip.
 * @property {'s1'|'s2'|'s3'|'s4'|'s5'} [serial_lane_id] - Serial lane chip.
 * @property {{ at?: number|null, kind?: string, text?: string, tool?: string }|null} [last_activity] -
 * The attempt's last non-thinking transcript line (§9.3).
 * @property {Array<{ label: string, state: 'live'|'done'|'failed', agent_type?: string|null }>} [legs] -
 * Delegation legs; only the unfinished ones are spelled out.
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
  const paused = !!tile.paused;
  const elapsed = failed
    ? tile.status_label || (tile.status === 'orphaned' ? '중단됨' : '실패')
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
  const rec_chip = recChipTemplate(tile.rec);
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
    route_chip ||
    session_ref_chip ||
    session_receipt_chip ||
    rec_chip
      ? html`<div class="rtile__meta">
          ${monitor_chips}${route_chip}${session_ref_chip}${session_receipt_chip}${rec_chip}
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
  const status_badges = html`${conflict_badge
    ? html`<span class="worker-mini__badge">${conflict_badge}</span>`
    : ''}${base_badge
    ? html`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${base_badge}</span
      >`
    : ''}${failure_badges}`;
  // 세션 타일의 수정 시각은 활동 줄이 "갱신 n 전"으로 이미 말한다 (§6) —
  // 같은 사실을 두 줄로 쓰지 않는다.
  const times_el = session ? '' : timesMeta(tile);
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
  return html`<div
    class="rtile${sel ? ' rtile--sel' : ''}${paused
      ? ' rtile--paused'
      : ''}${failed ? ' rtile--failed rtile--compact' : ''}${session
      ? ' rtile--session'
      : ''}"
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
        ${session
          ? ''
          : failed
            ? html`<button
                  type="button"
                  class="rtile__resume"
                  ?disabled=${failure?.resume_eligible === false}
                  title=${failure?.resume_eligible === false
                    ? failure.resume_reason || '이어하기 불가'
                    : '같은 세션으로 이어서 진행'}
                  aria-label="이어하기"
                >
                  ↻ 이어하기
                </button>
                ${discard_button}`
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
                      class="rtile__resume"
                      title="같은 세션으로 이어서 재개"
                      aria-label="재개"
                    >
                      ▶
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
                ${discard_button}`}
      </div>
    </div>
    <div class="rtile__title">${tile.title}</div>
    ${failed
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
                route_chip ||
                exec_chips ||
                rec_chip ||
                provider_badges.length > 0 ||
                usage_label
              ? html`<div class="rtile__meta">
                  ${monitor_chips}${route_chip}${execChipsTemplate(
                    tile.exec_chips
                  )}${rec_chip}
                  ${provider_badges.length > 0
                    ? provider_badges.map(
                        (badge) =>
                          html`<span class="worker-usage" title=${badge.tooltip}
                            >${badge.label}</span
                          >`
                      )
                    : usage_label
                      ? html`<span
                          class="worker-usage"
                          title=${usageTooltip(tile.usage)}
                          >${usage_label}</span
                        >`
                      : ''}
                </div>`
              : ''}
          ${discardReceiptTemplate(tile)} ${times_el}
          <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
          ${failed || paused
            ? ''
            : html`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${failurePopoverTemplate(failure, now)}
  </div>`;
}

/**
 * Running grid. Renders one tile per running attempt; empty message otherwise.
 *
 * `overlays`는 Worker 탭이 자기 타일에 얹는 tile-overlay 재료다 (UI-jbao) —
 * 지금은 겹침 칩(`dependency_chips`)만 싣는다. 생략하면 종전과 동일하다.
 *
 * @param {RunningTile[]} tiles
 * @param {number} [now]
 * @param {string|null} [selected_attempt]
 * @param {Map<string, MonitorTileOverlay>|null} [overlays]
 * @returns {import('lit-html').TemplateResult}
 */
export function runningGridTemplate(
  tiles,
  now = Date.now(),
  selected_attempt = null,
  overlays = null
) {
  const list = Array.isArray(tiles) ? tiles : [];
  return html`<div class="worker-rungrid" id="worker-rungrid">
    ${list.length === 0
      ? html`<div class="worker-rungrid__empty">실행 세션 없음</div>`
      : list.map((t) =>
          runningTile(t, now, selected_attempt, {
            monitor: overlays ? overlays.get(t.bead_id) || null : null
          })
        )}
  </div>`;
}
