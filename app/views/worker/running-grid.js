/**
 * Running grid + banner templates for the Worker console.
 *
 * Phase 9 has NO execution, so the running grid is an empty container (the
 * `repeat(auto-fill, minmax(215px,1fr))` grid with its own internal scroll per
 * `worker-final.html`) and the banners area carries the auto-advance / breaker
 * slots. Running tiles (`.rtile`) land in Phase 10.
 *
 * Banner copy/colors follow the controller design-gap decision (mockup lacks
 * these): OFF banner = amber warn; the exec-disabled variant notes execution
 * lands in Phase 10; the breaker slot is reserved (no breaker state yet).
 */
import { html } from 'lit-html';

/**
 * Banners area above the running grid.
 *
 * @param {{ autoAdvance: boolean, breaker?: { repo?: string, reason?: string }|null }} state
 * @returns {import('lit-html').TemplateResult}
 */
export function bannersTemplate(state) {
  return html`<div class="worker-banners">
    ${state.autoAdvance
      ? html`<div
          class="worker-banner worker-banner--exec-disabled"
          role="status"
        >
          ▶ 자동 진행 켜짐 — 실행 엔진은 Phase 10에서 활성화됩니다. 현재 새
          세션을 시작하지 않습니다.
        </div>`
      : html`<div class="worker-banner worker-banner--off" role="status">
          ⏸ 자동 진행 꺼짐 — 새 세션을 시작하지 않습니다. ▶로 재개.
        </div>`}
    ${state.breaker
      ? html`<div class="worker-banner worker-banner--breaker" role="alert">
          ⛔ ${state.breaker.repo || 'repo'} 세션 실패로 차단 —
          ${state.breaker.reason || ''}. 신규 launch·머지 진입 차단, 수동 ▶
          필요.
        </div>`
      : ''}
  </div>`;
}

/**
 * Empty running grid (Phase 9). The lanes stay always-visible below; only this
 * region scrolls once tiles exist.
 *
 * @returns {import('lit-html').TemplateResult}
 */
export function runningGridTemplate() {
  return html`<div class="worker-rungrid" id="worker-rungrid">
    <div class="worker-rungrid__empty">
      실행 세션 없음 — 실행 엔진은 Phase 10에서 활성화됩니다.
    </div>
  </div>`;
}
