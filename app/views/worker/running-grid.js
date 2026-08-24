/**
 * Running grid + banner templates for the Worker console (spec §5.2, §5.6).
 *
 * Phase 10: the running grid renders REAL attempt tiles derived from the queue
 * snapshot's `attempts` (status='running'), pushed via `worker-queue-snapshot`.
 * The banners area carries the Failed banner (derived from the latest
 * failed/orphaned attempt); the auto-advance state shows only in the ▶/⏸
 * toggle button. The transcript viewer (tile click →
 * drawer) is Phase 11 — here the tile just surfaces attempt data.
 *
 * Grid: `repeat(auto-fill, minmax(215px,1fr))` with its own internal scroll
 * (`worker-final.html`); one column on mobile.
 */
import { html } from 'lit-html';
import { formatContinuationLineage } from '../../utils/attempt-display.js';
import { formatRelativeTime } from '../../utils/relative-time.js';
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
import { failureText } from './failure-labels.js';
import {
  dependencyChipsTemplate,
  discardReceiptTemplate,
  execChipsTemplate,
  routeChipTemplate,
  timesMeta
} from './lanes.js';

/**
 * @typedef {Object} RunningTile
 * @property {string} bead_id
 * @property {string} attempt_id
 * @property {'session'} [kind] - 세션이 `in_progress`로 잡은 이슈의 타일
 * (UI-yrzu §6). attempt가 없으므로 운영 버튼·세션 드로어·위임 칩이 없고,
 * 경과는 bead의 `started_at`에서 온다. 생략(=Worker attempt 타일)이 기본이다.
 * @property {import('./lanes.js').MiniItem['workflow']} [workflow] - route 칩과
 * (세션 타일의) exec_receipt 칩 재료 (UI-yrzu §7.2). 없으면 칩이 생략된다.
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
 * tiles stay visible for resume/dismiss actions and have no live controls.
 * @property {'running'|'paused'|'failed'|'orphaned'} [status] - Raw attempt
 * status, used to distinguish failure from orphan interruption.
 * @property {string} [status_label] - Terminal status label for a failed tile.
 * @property {boolean} [resume_eligible] - Whether a failed attempt can resume.
 * @property {string|null} [resume_reason] - Why a failed attempt cannot resume.
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
 */

/**
 * @typedef {Object} FailureBanner
 * @property {string} repo
 * @property {string} reason
 * @property {{ reason: string, command: string|null }|null} [cause_detail] -
 * What the fail-closed path caught (UI-2o4z §2). `loud_fail_blocker` alone
 * cannot say WHICH command tripped WHICH guard, which is exactly the question
 * a false positive raises; absent/null on every other failure cause.
 * @property {string|null} [resume_attempt_id] - The banner's own (latest
 * unhandled failed) attempt — the ONLY ↻ target, never an older substitute
 * (§1), and the attempt ✕ dismisses.
 * @property {boolean} [resume_eligible] - Whether that attempt can be resumed
 * (session_id present, not already resumed); ineligible renders disabled.
 * @property {string|null} [resume_reason] - Ineligibility reason for the
 * disabled button's title.
 * @property {string} bead_id - Bead targeted by the banner actions.
 * @property {any} discard - Shared durable discard UI projection.
 */

/**
 * @typedef {Object} CleanupFailure
 * @property {string} bead_id - The merged bead whose cleanup stopped.
 * @property {string} step - Which pr-finish step stopped (worker-phase2 §6).
 * @property {string} reason - Machine-readable cause.
 * @property {string|null} [detail] - The step's own diagnostic text (git stderr
 * etc., UI-2o4z §3); absent on records written before it was preserved.
 * @property {string} [output_tail] - The failing command's own trailing output
 * (UI-qult §1); absent when the step ran no command or printed nothing.
 * @property {string} [log_path] - Absolute path to that command's FULL
 * preserved output (UI-0x54), which the capped tail above cannot hold; absent
 * on a record whose run left no complete log file.
 * @property {number} [retry_count] - Durable retries actually consumed before
 * this failure. Zero/absent never renders retry wording.
 */

/**
 * How much of a diagnostic string a banner shows before eliding it.
 *
 * @type {number}
 */
const BANNER_DETAIL_MAX = 160;

/**
 * Keep a diagnostic string to one banner line.
 *
 * @param {string} text
 * @returns {string}
 */
function truncateDetail(text) {
  return text.length > BANNER_DETAIL_MAX
    ? `${text.slice(0, BANNER_DETAIL_MAX)}…`
    : text;
}

/**
 * The guard/command line under a fail-closed failure banner. Text bindings, so
 * lit-html escapes the command — it is session-authored input.
 *
 * @param {{ reason: string, command: string|null }|null|undefined} detail
 * @returns {import('lit-html').TemplateResult|string}
 */
function causeDetailLine(detail) {
  if (!detail || !detail.reason) {
    return '';
  }
  return html`<div class="worker-banner__detail">
    가드:
    ${detail.reason}${detail.command
      ? html` · <code>${truncateDetail(detail.command)}</code>`
      : ''}
  </div>`;
}

/**
 * The banner's 세부 block: the RAW contract token behind the sentence above
 * (UI-q0uy §4.3). It exists on every mapped failure precisely because the body
 * no longer shows the code — the debugging path must not be translated away.
 *
 * `open` is deliberately NOT bound, which leaves it DOM state, so an expanded
 * block survives every queue-snapshot re-render.
 *
 * @param {string|null|undefined} code
 * @returns {import('lit-html').TemplateResult|string}
 */
function rawFailureBlock(code) {
  if (!code) {
    return '';
  }
  return html`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${code}</dd>
      </div>
    </dl>
  </details>`;
}

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
 * Banners area above the running grid.
 *
 * The stopped-cleanup banners moved into the repo-ops timeline (UI-q0uy §4.2),
 * which absorbs their whole content — stepper, cause, log path and output tail —
 * next to the button that resumes them. What is left here is the session-failure
 * banner, now speaking the shared failure vocabulary (§4.3) with the raw
 * contract token preserved in its 세부 disclosure.
 *
 * @param {{ failure?: FailureBanner|null }} state
 * @returns {import('lit-html').TemplateResult}
 */
export function bannersTemplate(state) {
  const failure_text = state.failure ? failureText(state.failure.reason) : '';
  return html`<div class="worker-banners">
    ${state.failure
      ? html`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${state.failure.repo || 'repo'} 세션 실패 —
          ${failure_text}${failure_text && !failure_text.endsWith('.')
            ? '.'
            : ''}
          자동 진행을 껐습니다, 수동 ▶ 필요.
          ${state.failure.resume_attempt_id
            ? html`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${state.failure.resume_attempt_id}
                ?disabled=${!state.failure.resume_eligible}
                title=${state.failure.resume_eligible
                  ? '최근 실패 세션을 같은 워크트리에서 이어서 진행'
                  : state.failure.resume_reason || '이어하기 불가'}
              >
                ↻ 이어하기
              </button>`
            : ''}
          ${state.failure.discard?.action
            ? html`<button
                type="button"
                class="worker-banner__discard"
                data-bead-id=${state.failure.bead_id}
                data-attempt-id=${state.failure.resume_attempt_id || ''}
                data-operation-id=${state.failure.discard.operation
                  ?.operation_id || ''}
                data-confirmation=${state.failure.discard.confirmation}
                ?disabled=${!state.failure.discard.enabled}
                title=${state.failure.discard.title}
              >
                ${state.failure.discard.label}
              </button>`
            : ''}
          ${state.failure.resume_attempt_id
            ? html`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${state.failure.resume_attempt_id}
                title="실패 알림 닫기 — 레인에는 남습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`
            : ''}
          ${causeDetailLine(state.failure.cause_detail)}
          ${rawFailureBlock(state.failure.reason)}
          ${discardReceiptTemplate({ discard: state.failure.discard })}
        </div>`
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
 * `→ 후속` chips (§5.1); the running tile shows no 선행 (it already started).
 */

/**
 * Monitor-only header pieces of a running tile (UI-eey2 §7): 레포 배지 ·
 * 직렬 레인 칩.
 *
 * @param {MonitorTileOverlay|null} monitor
 * @returns {import('lit-html').TemplateResult|''}
 */
function monitorTileHead(monitor) {
  if (!monitor) {
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
 * Monitor-only body of a running tile (UI-eey2 §7): 최근 활동 · 위임 칩 ·
 * 후속 칩. 실행중 타일은 stepper를 그리지 않는다 — 활동 줄과 위임 칩이 이미
 * 진행을 말하고, stepper는 높이만 차지했다. 끝난 위임은 `위임 완료 n` 한
 * 칩으로 접고 목록은 툴팁으로 물러난다 ("기본은 접고 중요한 것만", 스펙 §2).
 * 재료가 없는 줄은 통째로 생략한다.
 *
 * 세션 타일은 전사도 위임 로그도 없다 (UI-yrzu §6): 활동 줄이 답할 수 있는
 * 유일한 사실이 bead의 마지막 갱신 시각이고, 위임 칩은 그릴 근거가 없다.
 * `session`이 그 두 규칙을 함께 켠다.
 *
 * @param {MonitorTileOverlay|null} monitor
 * @param {number} now
 * @param {boolean} paused
 * @param {{ updated_at: number|string|null }|null} [session]
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
  const deps = dependencyChipsTemplate(monitor.dependency_chips, {
    lane: 'running'
  });
  const session_age = session
    ? formatRelativeTime(session.updated_at, now)
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
    : session_age
      ? // 전사 한 줄이 아니라 bead 갱신 시각이므로 점은 살아있음을 주장하지
        // 않는다 (§6) — 초록 점은 라이브 전사만 얻는다.
        html`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">갱신 ${session_age}</span>
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
    : ''}${deps}`;
}

/**
 * One running-session tile. A click opens the bead detail like every other lane
 * surface (UI-k59y §3) — the live transcript is the tile's own [▤ 세션] button,
 * so the tile is not the one place on this board where the default click means
 * something else. The drawer's tile keeps its `.rtile--sel` ring.
 *
 * `options.monitor` adds the monitor tab's extra lines (UI-eey2 §7) —
 * 레포 배지 · 활동 · 위임/후속 칩. Omitted — every Worker call —
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
  const failed = tile.failed === true;
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
  const monitor_head = monitorTileHead(monitor);
  const monitor_body = monitorTileBody(
    monitor,
    now,
    paused,
    session ? { updated_at: tile.updated_at ?? null } : null
  );
  // 세션 타일의 meta 줄은 exec_receipt 칩 하나다 (§6): 계정·토큰은 attempt가
  // 있어야 아는 사실이고, 이 타일에는 attempt가 없다. 라벨은 SHA를 뺀
  // `<kind>:<actor[:effort]>`이고 전체 값은 툴팁이 싣는다.
  const session_receipt = session
    ? tile.workflow?.chips?.exec_receipt || null
    : null;
  const session_meta = session_receipt
    ? html`<div class="rtile__meta">
        <span
          class="ctl-chip ctl-chip--exec-receipt"
          title=${`exec_receipt ${formatExecReceipt(session_receipt)}`}
          >${`${session_receipt.kind}:${execReceiptActor(session_receipt)}`}</span
        >
      </div>`
    : '';
  // 세션 타일의 수정 시각은 활동 줄이 "갱신 n 전"으로 이미 말한다 (§6) —
  // 같은 사실을 두 줄로 쓰지 않는다.
  const times_el = session ? '' : timesMeta(tile);
  const discard_button = tile.discard?.action
    ? html`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${tile.discard.operation?.operation_id || ''}
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
      : ''}${failed ? ' rtile--failed' : ''}${session ? ' rtile--session' : ''}"
    data-bead-id=${tile.bead_id}
    data-attempt-id=${tile.attempt_id || ''}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${session ? ' rtile__dot--session' : ''}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${tile.bead_id}</span>
      ${routeChipTemplate(tile.workflow)}${monitor_head}${lineage
        ? html`<span class="rtile__resumed" title=${lineage}>↻</span>`
        : ''}
      ${session
        ? html`${typeof tile.started_at === 'number'
              ? html`<span class="rtile__elapsed">${elapsed}</span>`
              : ''}<span
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
                ?disabled=${tile.resume_eligible === false}
                title=${tile.resume_eligible === false
                  ? tile.resume_reason || '이어하기 불가'
                  : '같은 세션으로 이어서 진행'}
                aria-label="이어하기"
              >
                ↻ 이어하기
              </button>
              ${discard_button}
              <button
                type="button"
                class="rtile__dismiss"
                title="실패 알림 닫기 — 레인에는 남습니다"
                aria-label="실패 기록 닫기"
              >
                ✕
              </button>`
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
    <div class="rtile__title">${tile.title}</div>
    ${monitor_body}${tile.rollup
      ? childRollupTemplate(tile.rollup, {
          parent_id: tile.bead_id,
          expanded: tile.rollup_expanded === true,
          childChips: childExecChips
        })
      : ''}
    ${landing
      ? html`<div class="rtile__landing">
          <span
            class="merge-step${landing.failed ? ' merge-step--failed' : ''}"
            style=${`--progress: ${landing.percent}%`}
            >${landing.label}${landing.index > 0
              ? html`<span class="merge-step__n"
                  >${landing.index}/${landing.total}</span
                >`
              : ''}</span
          >
        </div>`
      : ''}
    ${session
      ? session_meta
      : exec_chips ||
          provider_badges.length > 0 ||
          usage_label ||
          conflict_badge ||
          base_badge
        ? html`<div class="rtile__meta">
            ${conflict_badge
              ? html`<span class="worker-mini__badge">${conflict_badge}</span>`
              : ''}
            ${base_badge
              ? html`<span
                  class="worker-mini__badge"
                  title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                  >${base_badge}</span
                >`
              : ''}
            ${execChipsTemplate(tile.exec_chips)}
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
    ${times_el} ${discardReceiptTemplate(tile)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${failed || paused
      ? ''
      : html`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`;
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
      : list.map((t) => runningTile(t, now, selected_attempt))}
  </div>`;
}
