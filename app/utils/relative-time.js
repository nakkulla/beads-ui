/**
 * Coerce a timestamp input into epoch milliseconds.
 *
 * @param {number | string | null | undefined} timestamp_value
 * @returns {number | null}
 */
export function coerceTimestampMs(timestamp_value) {
  if (!timestamp_value) {
    return null;
  }
  if (typeof timestamp_value === 'number') {
    return Number.isFinite(timestamp_value) ? timestamp_value : null;
  }

  const parsed_ms = Date.parse(timestamp_value);
  return Number.isFinite(parsed_ms) ? parsed_ms : null;
}

/**
 * Format a timestamp as an ISO string for tooltip display.
 *
 * @param {number | string | null | undefined} timestamp_value
 * @returns {string}
 */
export function formatTimestampTitle(timestamp_value) {
  const event_ms = coerceTimestampMs(timestamp_value);
  if (event_ms === null) {
    return '';
  }

  return new Date(event_ms).toISOString();
}

/**
 * Format a timestamp as a Korean relative time string.
 *
 * @param {number | string | null | undefined} timestamp_value
 * @param {number} [now_ms]
 * @returns {string}
 */
export function formatRelativeTime(timestamp_value, now_ms) {
  const event_ms = coerceTimestampMs(timestamp_value);
  if (event_ms === null) {
    return '';
  }

  const reference_ms = typeof now_ms === 'number' ? now_ms : Date.now();
  const diff_ms = reference_ms - event_ms;
  if (diff_ms < 60_000) {
    return '방금';
  }

  const minutes = Math.floor(diff_ms / 60_000);
  if (minutes < 60) {
    return `${minutes}분 전`;
  }

  const hours = Math.floor(diff_ms / 3_600_000);
  if (hours < 24) {
    return `${hours}시간 전`;
  }

  const days = Math.floor(diff_ms / 86_400_000);
  if (days < 7) {
    return `${days}일 전`;
  }

  const weeks = Math.floor(days / 7);
  if (days < 30) {
    return `${weeks}주 전`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months}개월 전`;
  }

  const years = Math.floor(days / 365);
  return `${years}년 전`;
}
