/**
 * Period vocabularies for three screens: the Board Closed column owns
 * {@link CLOSED_RANGE_OPTIONS}, the 완료 lane owns {@link DONE_RANGE_OPTIONS},
 * and the comparison tab owns {@link COMPARE_RANGE_OPTIONS}.
 */

/**
 * @typedef {'today'|'7d'|'30d'|'all'} ClosedRange
 */

const DAY_MS = 864e5;

/**
 * @typedef {'today'|'2d'|'3d'|'7d'|'30d'|'all'|'custom'} CompareRange
 */

/** @type {ClosedRange} */
export const DEFAULT_CLOSED_RANGE = 'today';

/**
 * Ordered period options for the Closed column header dropdown.
 *
 * @type {ReadonlyArray<{ value: ClosedRange, label: string }>}
 */
export const CLOSED_RANGE_OPTIONS = [
  { value: 'today', label: '오늘' },
  { value: '7d', label: '최근 7일' },
  { value: '30d', label: '최근 30일' },
  { value: 'all', label: '전체' }
];

/**
 * Ordered period options for the comparison tab.
 *
 * @type {ReadonlyArray<{ value: CompareRange, label: string }>}
 */
export const COMPARE_RANGE_OPTIONS = [
  { value: 'today', label: '오늘' },
  { value: '2d', label: '최근 2일' },
  { value: '3d', label: '최근 3일' },
  { value: '7d', label: '최근 7일' },
  { value: '30d', label: '최근 30일' },
  { value: 'all', label: '전체' },
  { value: 'custom', label: '직접 지정' }
];

/**
 * The 완료 레인's period vocabulary (UI-p7s2 §5) — now the SAME four values as
 * {@link ClosedRange}. The lane used to stop at `7d` because its only source
 * was the retained worker snapshot; it now merges the `closed-issues`
 * subscription on top of that snapshot, so `30d`/`all` have data to answer with.
 *
 * @typedef {ClosedRange} DoneRange
 */

/**
 * Ordered period options for the 완료 레인 dropdown. Same four values as
 * {@link CLOSED_RANGE_OPTIONS}, plus the narrow-viewport `short` label
 * (UI-8gem §8); `label` stays the long form the dropdown and the chip `title`
 * keep.
 *
 * @type {ReadonlyArray<{ value: DoneRange, label: string, short: string }>}
 */
export const DONE_RANGE_OPTIONS = [
  { value: 'today', label: '오늘', short: '오늘' },
  { value: '7d', label: '최근 7일', short: '7일' },
  { value: '30d', label: '최근 30일', short: '30일' },
  { value: 'all', label: '전체', short: '전체' }
];

/**
 * Read any stored 완료 레인 period. Only a value outside the vocabulary folds
 * to `7d` — a stored `30d`/`all` is now kept as chosen (UI-p7s2 §5).
 *
 * @param {unknown} value
 * @returns {DoneRange}
 */
export function normalizeDoneRange(value) {
  return isClosedRange(value) ? value : '7d';
}

/**
 * @param {unknown} value
 * @returns {value is ClosedRange}
 */
export function isClosedRange(value) {
  return (
    value === 'today' || value === '7d' || value === '30d' || value === 'all'
  );
}

/**
 * @param {unknown} value
 * @returns {value is CompareRange}
 */
export function isCompareRange(value) {
  return COMPARE_RANGE_OPTIONS.some((option) => option.value === value);
}

/**
 * Compute the `since` lower bound for a comparison period. `all`, `custom`,
 * and unknown values have no server-computed lower bound.
 *
 * @param {unknown} range
 * @param {number} [now]
 * @returns {number|null}
 */
export function compareRangeSince(range, now = Date.now()) {
  switch (range) {
    case 'today': {
      const date = new Date(now);
      date.setHours(0, 0, 0, 0);
      return date.getTime();
    }
    case '2d':
      return now - 2 * DAY_MS;
    case '3d':
      return now - 3 * DAY_MS;
    case '7d':
      return now - 7 * DAY_MS;
    case '30d':
      return now - 30 * DAY_MS;
    case 'all':
    case 'custom':
    default:
      return null;
  }
}

/**
 * Convert one `YYYY-MM-DD` value to the matching LOCAL midnight.
 *
 * @param {string} date_string
 * @returns {number|null}
 */
export function localDayStartMs(date_string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(date_string);
  if (match === null) {
    return null;
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(0);
  date.setHours(0, 0, 0, 0);
  date.setFullYear(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date.getTime();
}

/**
 * Compute the `since` epoch-ms lower bound for a Closed period range. 'today'
 * is the start of the current LOCAL day; '7d'/'30d' are N days before `now`;
 * 'all' yields undefined (no filter). `now` is injectable for testability.
 *
 * @param {ClosedRange} range
 * @param {number} [now]
 * @returns {number | undefined}
 */
export function closedRangeSince(range, now = Date.now()) {
  switch (range) {
    case 'today': {
      const d = new Date(now);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    }
    case '7d':
      return now - 7 * DAY_MS;
    case '30d':
      return now - 30 * DAY_MS;
    case 'all':
    default:
      return undefined;
  }
}
