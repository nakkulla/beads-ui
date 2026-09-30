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
 * @property {'none'|'cap'|'unconfigured'|'disabled'} [auto_switch] - Why the
 * limit hold did not move to another account (UI-13o1 §3.4). Absent when it did
 * switch; `cap` is retired vocabulary that old queue files may still carry.
 * @property {number} [resets_at]
 * @property {number} [next_probe_at]
 * @property {number} [live_preempt_skipped_at] - When the last live preempt
 * pass found no switch candidate for this attempt (UI-inge §3.6).
 * @property {string} [log_path]
 * @property {boolean} [open]
 */

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
