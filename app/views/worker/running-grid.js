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
import {
  formatUsageTotalWithCost,
  usageTooltip
} from '../../utils/token-usage.js';
import { timesMeta } from './lanes.js';

/**
 * @typedef {Object} RunningTile
 * @property {string} bead_id
 * @property {string} attempt_id
 * @property {string} title
 * @property {string|null} runner
 * @property {string|null} model
 * @property {number|null} started_at
 * @property {string|null} [resumed_from] - Prior attempt this one resumes (§1).
 * @property {boolean} [paused] - Leaf paused attempt: shows ▶ instead of ⏸ and
 * has no live elapsed clock (worker-phase1 §1.1/§2.1).
 * @property {boolean} [can_pause] - Running attempt whose session id is already
 * captured. Pausing before that would strand an unresumable attempt, so the ⏸
 * button renders disabled until it lands (§2.1).
 * @property {number|string} [created_at] - Bead 생성 시각 (UI-d7pw §4.1).
 * @property {number|string} [updated_at] - Bead 수정 시각 (UI-d7pw §4.1).
 * @property {import('../../utils/token-usage.js').UsageRecord|null} [usage] - Live token usage
 * of this attempt (UI-raqh §1); absent/null renders nothing.
 * @property {boolean} [conflict_resolution] - Attempt dispatched to resolve a
 * PR conflict (worker-phase2 §6) rather than to do the bead's work; the tile
 * says so, because the two look identical otherwise (UI-dxgz §1).
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
 */

/**
 * @typedef {Object} ShipFailure
 * @property {string} bead_id - The merged bead whose capability ship stopped.
 * @property {string} reason - Machine-readable cause (`ship_failed:<cap>` etc.).
 * @property {string|null} [detail] - The remaining work, as
 * `pending=<cap,…> [unread=<id,…>]`.
 * @property {string|null} [pr_url] - The PR that was merged.
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
 * The collapsed verify-output block under a cleanup banner (UI-qult §3). `open`
 * is deliberately NOT bound, which leaves it DOM state — a user's expanded tail
 * then survives every queue-snapshot re-render. The tail is a text binding, so
 * lit-html escapes it: command output is untrusted input.
 *
 * @param {string|null|undefined} tail
 * @returns {import('lit-html').TemplateResult|string}
 */
function outputTailBlock(tail) {
  if (!tail) {
    return '';
  }
  return html`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${tail}</pre>
  </details>`;
}

/**
 * The full-log path line under a cleanup banner (UI-0x54). The tail above is
 * capped, so this is what a human opens when the capped end does not name the
 * failure. A text binding — lit-html escapes it.
 *
 * @param {string|null|undefined} log_path
 * @returns {import('lit-html').TemplateResult|string}
 */
function logPathLine(log_path) {
  if (!log_path) {
    return '';
  }
  return html`<div class="worker-banner__log-path">
    전체 로그: <code>${log_path}</code>
  </div>`;
}

/**
 * Format an elapsed duration (ms) as `MmSSs` / `SSs`.
 *
 * @param {number} ms
 * @returns {string}
 */
function formatElapsed(ms) {
  if (!Number.isFinite(ms) || ms < 0) {
    return '0s';
  }
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return m > 0 ? `${m}m ${String(s).padStart(2, '0')}s` : `${s}s`;
}

/**
 * The workspace-level capability-ship failure banner (UI-4ii4).
 *
 * It exists separately from the cleanup banner because it must outlive the row
 * it is about: the ship step runs after the parent close, and an external PR row
 * disappears the moment its bead stops being `resolved`. So this banner carries
 * no `[정리]` retry — there is nothing left to click — and names the manual
 * recovery instead. The merge itself succeeded; what is missing is the
 * `provides:` label that unblocks whatever depends on the capability.
 *
 * @param {ShipFailure|null|undefined} ship
 * @returns {import('lit-html').TemplateResult|string}
 */
function shipFailureBanner(ship) {
  if (!ship || !ship.reason) {
    return '';
  }
  // The recovery is NOT one command for every reason. `export_removal_failed`
  // is a canceled/out-of-scope descendant whose `export:` label would not come
  // off — telling a human to `bd ship` it would publish exactly the capability
  // the disposition filter exists to withhold.
  const removal_failed = ship.reason.startsWith('export_removal_failed:');
  return html`<div
    class="worker-banner worker-banner--ship"
    role="alert"
    data-bead-id=${ship.bead_id || ''}
  >
    ⚠ ${ship.bead_id || '(bead 미상)'} 머지 완료 — capability 발행이
    실패했습니다 (${ship.reason}). bead는 closed지만
    ${removal_failed
      ? html`취소 처분된 자손의 <code>export:</code> 라벨이 남아 있어 다음
          스윕이 이를 다시 발행 대상으로 읽습니다.`
      : html`<code>provides:</code> 라벨이 없어 이 capability에 걸린 external
          의존은 계속 막혀 있습니다.`}
    ${ship.detail
      ? html`<div class="worker-banner__detail">
          남은 작업: <code>${truncateDetail(ship.detail)}</code>
        </div>`
      : ''}
    <div class="worker-banner__detail">
      ${removal_failed
        ? html`수동 복구:
            <code
              >bd -C &lt;워크스페이스&gt; label remove &lt;id&gt;
              export:&lt;capability&gt;</code
            >
            실행 후 <code>bd show &lt;id&gt; --json</code>으로 라벨이 사라졌는지
            확인하세요 — 이 자손은 ship하지 마세요.`
        : html`수동 복구:
            <code>bd -C &lt;워크스페이스&gt; ship &lt;capability&gt;</code> 실행
            후 <code>bd show &lt;id&gt; --json</code>으로
            <code>provides:</code> 라벨을 확인하세요.`}
    </div>
    ${ship.pr_url
      ? html`<div class="worker-banner__detail">
          <code>${ship.pr_url}</code>
        </div>`
      : ''}
  </div>`;
}

/**
 * Banners area above the running grid.
 *
 * @param {{ failure?: FailureBanner|null, cleanupFailures?: CleanupFailure[], shipFailure?: ShipFailure|null }} state
 * @returns {import('lit-html').TemplateResult}
 */
export function bannersTemplate(state) {
  const cleanup = Array.isArray(state.cleanupFailures)
    ? state.cleanupFailures
    : [];
  return html`<div class="worker-banners">
    ${state.failure
      ? html`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${state.failure.repo || 'repo'} 세션 실패 —
          ${state.failure.reason || ''}. 자동 진행을 껐습니다, 수동 ▶ 필요.
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
          ${state.failure.resume_attempt_id
            ? html`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${state.failure.resume_attempt_id}
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`
            : ''}
          ${causeDetailLine(state.failure.cause_detail)}
        </div>`
      : ''}
    ${cleanup.map(
      (c) =>
        html`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${c.bead_id}
        >
          ⚠ ${c.bead_id} 머지 완료 — 머지 후 정리가 <b>${c.step}</b> 단계에서
          멈췄습니다 (${c.reason}).
          <!-- capability 발행은 close 뒤에 오는 유일한 단계라 실패해도 close를
               롤백하지 않는다 (UI-4ii4). "resolved로 남아 있다"는 다른 모든
               단계에만 참이므로 여기서만 문안을 바꾼다. -->
          ${c.step === 'ship_exported_capabilities'
            ? 'bead는 closed로 남아 있고(close는 롤백하지 않습니다)'
            : 'bead는 resolved로 남아 있고'}
          자동 재시도는 하지 않습니다 — 정리를 사람이 마무리하세요.
          ${c.detail
            ? html`<div class="worker-banner__detail">
                <code>${truncateDetail(c.detail)}</code>
              </div>`
            : ''}
          ${logPathLine(c.log_path)} ${outputTailBlock(c.output_tail)}
        </div>`
    )}
    ${shipFailureBanner(state.shipFailure)}
  </div>`;
}

/**
 * One running-session tile. A click opens the bead detail like every other lane
 * surface (UI-k59y §3) — the live transcript is the tile's own [▤ 세션] button,
 * so the tile is not the one place on this board where the default click means
 * something else. The drawer's tile keeps its `.rtile--sel` ring.
 *
 * @param {RunningTile} tile
 * @param {number} now
 * @param {string|null} [selected_attempt]
 * @returns {import('lit-html').TemplateResult}
 */
function runningTile(tile, now, selected_attempt = null) {
  const paused = !!tile.paused;
  const elapsed = paused
    ? '일시정지'
    : typeof tile.started_at === 'number'
      ? formatElapsed(now - tile.started_at)
      : '—';
  const meta = [tile.runner, tile.model].filter(Boolean).join(' · ');
  const usage_label = formatUsageTotalWithCost(tile.usage);
  // Same badge style the lane rows use — a resolution session is a different
  // KIND of run, not a louder one.
  const conflict_badge = tile.conflict_resolution
    ? paused
      ? '충돌 해소 일시정지'
      : '충돌 해소'
    : null;
  const sel = tile.attempt_id && tile.attempt_id === selected_attempt;
  return html`<div
    class="rtile${sel ? ' rtile--sel' : ''}${paused ? ' rtile--paused' : ''}"
    data-bead-id=${tile.bead_id}
    data-attempt-id=${tile.attempt_id || ''}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${tile.bead_id}</span>
      ${tile.resumed_from
        ? html`<span
            class="rtile__resumed"
            title=${`이어받은 세션 (from ${tile.resumed_from})`}
            >↻</span
          >`
        : ''}
      <span class="rtile__elapsed">${elapsed}</span>
      <button
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
      <button type="button" class="rtile__stop" title="폐기" aria-label="폐기">
        ■
      </button>
    </div>
    <div class="rtile__title">${tile.title}</div>
    ${meta || usage_label || conflict_badge
      ? html`<div class="rtile__meta">
          ${conflict_badge
            ? html`<span class="worker-mini__badge">${conflict_badge}</span>`
            : ''}
          ${meta ? html`<span class="rtile__runner">${meta}</span>` : ''}
          ${usage_label
            ? html`<span class="worker-usage" title=${usageTooltip(tile.usage)}
                >${usage_label}</span
              >`
            : ''}
        </div>`
      : ''}
    ${timesMeta(tile)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${paused ? '' : html`<div class="rtile__accent" aria-hidden="true"></div>`}
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
