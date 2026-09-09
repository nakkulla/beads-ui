/**
 * Provider-hold wording shared by the held tile badge and the waiting row's
 * gate chip (UI-01wh §3.2).
 *
 * The tile and the row say the same fact about the same `provider_hold` target,
 * so one function owns the sentence: a second copy would let `⚠️ 공급자 장애`
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
 * Explain the automatic recovery receipt without inventing absent state.
 *
 * @param {HoldTile['auto_resume']|undefined} value
 * @returns {string}
 */
export function autoResumeText(value) {
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
export function autoSwitchText(value) {
  if (value === 'none') {
    return '계정 전환 안 함 · 조건을 만족하는 다른 계정 없음';
  }
  if (value === 'disabled') {
    return '계정 전환 안 함 · 자동 전환 꺼짐';
  }
  return '';
}
