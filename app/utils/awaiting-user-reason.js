export const AWAITING_USER_REASON_PREFIX = '사용자 리뷰 필요';

/**
 * Format an awaiting_user observation from the complete metadata object.
 *
 * @param {unknown} metadata
 * @returns {string}
 */
export function awaitingUserReason(metadata) {
  if (
    !metadata ||
    typeof metadata !== 'object' ||
    !Object.hasOwn(metadata, 'awaiting_user')
  ) {
    return '';
  }
  const value = /** @type {Record<string, unknown>} */ (metadata).awaiting_user;
  const text = typeof value === 'string' ? value.trim() : '';
  return text.length > 0
    ? `${AWAITING_USER_REASON_PREFIX}: ${text}`
    : AWAITING_USER_REASON_PREFIX;
}
