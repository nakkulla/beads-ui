/**
 * Format the immutable tuple recorded on an attempt. Current preset state is
 * intentionally not an input: historical cards must show what actually ran.
 *
 * @param {{ runner?: unknown, model?: unknown, effort?: unknown, speed?: unknown }} attempt
 * @returns {string}
 */
export function formatAttemptTuple(attempt) {
  return [
    typeof attempt.runner === 'string' ? attempt.runner : null,
    typeof attempt.model === 'string' ? attempt.model : null,
    typeof attempt.effort === 'string' ? attempt.effort : null,
    attempt.speed === 'fast' ? 'Fast' : null
  ]
    .filter(Boolean)
    .join(' · ');
}

/**
 * The FULL recorded execution tuple, for the one dialog that promises to reuse
 * it verbatim (UI-qce9 §3.1): provider·model·effort·speed·계정 이름. `speed` is
 * always shown here — unlike the card tuple, where only `Fast` is worth a chip —
 * because "same settings" is exactly what the user is confirming. Only the
 * account NAME travels; no token or credential is displayed.
 *
 * @param {{ runner?: unknown, model?: unknown, effort?: unknown, speed?: unknown, claude_account?: unknown, codex_account?: unknown }} attempt
 * @returns {string}
 */
export function formatExecutionTuple(attempt) {
  const account =
    attempt.runner === 'codex' ? attempt.codex_account : attempt.claude_account;
  return [
    typeof attempt.runner === 'string' ? attempt.runner : null,
    typeof attempt.model === 'string' ? attempt.model : null,
    typeof attempt.effort === 'string' ? attempt.effort : null,
    typeof attempt.speed === 'string' ? attempt.speed : 'default',
    typeof account === 'string' && account.length > 0 ? account : null
  ]
    .filter(Boolean)
    .join(' · ');
}

/**
 * Describe an attempt relation without treating legacy records as provider
 * session continuations.
 *
 * @param {{ resumed_from?: unknown, continuation_mode?: unknown }} attempt
 * @returns {string|null}
 */
export function formatContinuationLineage(attempt) {
  if (
    typeof attempt.resumed_from !== 'string' ||
    attempt.resumed_from.length === 0
  ) {
    return null;
  }
  const label =
    attempt.continuation_mode === 'session'
      ? 'session 이어받음'
      : attempt.continuation_mode === 'fresh'
        ? '새 session으로 이어받음'
        : '이전 attempt에서 이어받음';
  return `${label} (from ${attempt.resumed_from})`;
}
