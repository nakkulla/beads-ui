/**
 * The active-login departure record's shape and wording (UI-32oq §4.2, §4.4)
 * — the copy the server notices and the app status lines both read.
 *
 * It lives in `app/utils/` with no imports, like `account-display-name.js`:
 * pure data shared by both runtimes, so a notice and a status line never word
 * the same return two ways.
 *
 * @typedef {Object} DepartureRecord
 * @property {string} default_account - The default account the switch left.
 * @property {string} to_account - The account the active login moved to.
 * @property {string|null} until - ISO time after which the default may
 * return, or null when only its usage decides.
 */

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @returns {value is string}
 */
function isAccountKey(value) {
  return (
    typeof value === 'string' &&
    value.length > 0 &&
    value.length <= 256 &&
    !/\s/.test(value)
  );
}

/**
 * One departure record, or null when any field is outside the shape.
 *
 * @param {unknown} raw
 * @returns {DepartureRecord|null}
 */
export function parseDepartureRecord(raw) {
  if (
    !isRecord(raw) ||
    !isAccountKey(raw.default_account) ||
    !isAccountKey(raw.to_account) ||
    raw.default_account === raw.to_account
  ) {
    return null;
  }
  if (
    raw.until !== null &&
    !(typeof raw.until === 'string' && Number.isFinite(Date.parse(raw.until)))
  ) {
    return null;
  }
  return {
    default_account: raw.default_account,
    to_account: raw.to_account,
    until: raw.until
  };
}

/**
 * Local `HH:MM` of an ISO time — the return time a notice names.
 *
 * @param {string} iso
 * @returns {string}
 */
export function clockOf(iso) {
  const date = new Date(iso);
  return `${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes()
  ).padStart(2, '0')}`;
}

/**
 * When a standing record returns, without naming the default: `리셋 <HH:MM> 뒤
 * 복귀`, or `사용량 회복 확인 뒤 복귀` while `until` is null.
 *
 * @param {DepartureRecord} record
 * @returns {string}
 */
export function returnWhenOf(record) {
  return record.until === null
    ? '사용량 회복 확인 뒤 복귀'
    : `리셋 ${clockOf(record.until)} 뒤 복귀`;
}

/**
 * The return hint a departure notice and a status line carry while a record
 * stands. A notice names no default (its line already names both accounts);
 * a status line passes the default's display name.
 *
 * @param {DepartureRecord} record
 * @param {string} [default_name]
 * @returns {string}
 */
export function returnHintOf(record, default_name) {
  const who =
    typeof default_name === 'string' && default_name.length > 0
      ? `default ${default_name}`
      : 'default';
  return `${who} ${returnWhenOf(record)}`;
}
