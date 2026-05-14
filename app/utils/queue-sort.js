const SORT_STEP = 1000;
const MAX_SORT_KEY = 1_000_000_000;

/**
 * @param {string | number | undefined | null} value
 */
export function parseSortKey(value) {
  const parsed =
    typeof value === 'number'
      ? value
      : Number.parseInt(String(value || ''), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

/**
 * @param {Array<string | number | undefined | null>} existing_keys
 */
export function nextTailSortKey(existing_keys) {
  let max_key = 0;
  for (const key of existing_keys) {
    max_key = Math.max(max_key, parseSortKey(key));
  }
  return max_key >= MAX_SORT_KEY ? SORT_STEP : max_key + SORT_STEP;
}

/**
 * @param {number | null | undefined} previous_key
 * @param {number | null | undefined} next_key
 */
export function sortKeyBetween(previous_key, next_key) {
  const prev = parseSortKey(previous_key);
  const next = parseSortKey(next_key);
  if (prev === 0 && next === 0) {
    return { sort_key: SORT_STEP, rebalance: false };
  }
  if (prev === 0) {
    const candidate = Math.floor(next / 2);
    return candidate > 0
      ? { sort_key: candidate, rebalance: false }
      : { sort_key: 0, rebalance: true };
  }
  if (next === 0) {
    const candidate = prev + SORT_STEP;
    return candidate <= MAX_SORT_KEY
      ? { sort_key: candidate, rebalance: false }
      : { sort_key: 0, rebalance: true };
  }
  const candidate = Math.floor((prev + next) / 2);
  if (candidate <= prev || candidate >= next) {
    return { sort_key: 0, rebalance: true };
  }
  return { sort_key: candidate, rebalance: false };
}

/**
 * @param {string[]} ids
 */
export function rebalanceSortKeys(ids) {
  return ids.map((id, index) => ({ id, sort_key: (index + 1) * SORT_STEP }));
}
