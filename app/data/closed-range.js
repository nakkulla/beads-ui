/**
 * Closed-column period ranges (Board spec §3.2). Each range maps to an
 * epoch-ms `since` lower bound for the server `closed-issues` subscription
 * filter (`applyClosedIssuesFilter` in server/ws/context.js), except 'all',
 * which drops the filter entirely.
 */

/**
 * @typedef {'today'|'7d'|'30d'|'all'} ClosedRange
 */

const DAY_MS = 864e5;

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
 * @param {unknown} value
 * @returns {value is ClosedRange}
 */
export function isClosedRange(value) {
  return (
    value === 'today' || value === '7d' || value === '30d' || value === 'all'
  );
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
