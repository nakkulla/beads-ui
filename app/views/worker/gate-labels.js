/**
 * Provider-hold wording shared by the held tile badge and the waiting row's
 * gate chip (UI-01wh §3.2).
 *
 * The tile and the row say the same fact about the same `provider_hold` target,
 * so one function owns the sentence: a second copy would let `⚠️ 공급자 보류`
 * drift from what the tile says about the very same outage.
 *
 * Pure: it reads its argument and nothing else — no DOM, no clock beyond the
 * timestamps it is handed.
 *
 * @import { HoldTile } from './running-grid.js'
 */

/**
 * Format a provider timestamp as the local clock, or `''` when there is no
 * usable number (fail-quiet).
 *
 * @param {unknown} value
 * @returns {string}
 */
export function providerClock(value) {
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
  if (hold.kind === 'usage_limit') {
    const reset = providerClock(hold.resets_at);
    if (!reset) {
      return `⏳ 공급자 보류 · 리셋 미상`;
    }
    // 계정은 칩에서 빠지고 팝업에만 남는다 (UI-pw2g §3.3): 별명 없는 계정은
    // 이메일 전체가 들어와 칩 하나가 줄을 혼자 차지했다. `hold.target`은 그대로다.
    return `⏳ 공급자 보류 ${reset}`;
  }
  const next = providerClock(hold.next_probe_at);
  // 정상 글리프는 `⏳`다 (UI-8gem §5.2 정정): 프로브가 스스로 푸는 상태에
  // 지연·조치 글리프를 쓰지 않는다.
  return `⏳ 공급자 보류${next ? ` · 다음 프로브 ${next}` : ''}`;
}

/**
 * Explain the automatic recovery receipt without inventing absent state.
 *
 * @param {HoldTile['auto_resume']|undefined} value
 * @returns {string}
 */
export function autoResumeText(value) {
  if (value === 'pending') {
    return '회복 후 자동 재개 대기';
  }
  if (typeof value === 'string' && value.startsWith('refused:')) {
    return `자동 재개 거부 · ${value.slice('refused:'.length)}`;
  }
  return '';
}

/**
 * The slot-1 badge of a provider-held tile whose hold record is gone and whose
 * last automatic resume was refused (2026-10-01 stall-reconcile D5). It is the
 * same exclusive verdict badge with other words, not a new slot: a
 * `transient`/`wait` refusal is retried by the server on its own clock, so it
 * reads `⏳` with the next try for slot 7; a `closed`/`permanent` one is never
 * retried and asks for a person. `null` when the projection carries no refusal
 * record — an active hold, no refusal yet, or a record from before the field —
 * so the current badge stays (fail-quiet).
 *
 * @param {HoldTile|null|undefined} hold
 * @returns {{ text: string, verdict: 'action_required'|null, release: string, next_at: number|null }|null}
 */
export function autoResumeRefusalBadge(hold) {
  const refusal = hold ? hold.auto_resume_refusal : undefined;
  if (!refusal) {
    return null;
  }
  if (refusal.kind === 'transient' || refusal.kind === 'wait') {
    return {
      text: '⏳ 자동 재개 재시도',
      verdict: null,
      release:
        '거절된 자동 재개를 간격을 두고 다시 시도 — 5·15·30분, 이후 60분',
      next_at: typeof refusal.next_at === 'number' ? refusal.next_at : null
    };
  }
  return {
    text: ['⛔ 조치 필요 · 자동 재개 거부', refusal.reason]
      .filter((part) => part.length > 0)
      .join(' '),
    verdict: 'action_required',
    release:
      '자동 재개를 다시 시도하지 않음 — ↻ 이어하기로 직접 재개하거나 ✕로 내린다',
    next_at: null
  };
}

/**
 * Say why a limit hold stayed on its own account (UI-13o1 §3.4). The candidate
 * set is the user's per-runner allow list, so `none` says the list ran out
 * rather than the machine did. Retired cap markers render no text.
 *
 * @param {HoldTile['auto_switch']|undefined} value
 * @returns {string}
 */
export function autoSwitchText(value) {
  if (value === 'none') {
    return '허용 계정 중 사용 가능한 계정 없음';
  }
  if (value === 'unconfigured') {
    return '계정 전환 안 함 · 전환 허용 계정 미지정';
  }
  if (value === 'disabled') {
    return '계정 전환 안 함 · 기다림 모드';
  }
  return '';
}
