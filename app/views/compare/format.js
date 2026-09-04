/**
 * Display formatting for the comparison table (preset-compare §3.6). Kept apart
 * from the view so every cell rule is testable without a DOM.
 */
import { formatCost } from '../../utils/token-usage.js';

/** The cell text of a column whose row carries no material (§3.2). */
export const EMPTY_CELL = '—';

/**
 * @param {unknown} value
 * @returns {number|null}
 */
function num(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

/**
 * Elapsed wall time, coarsened to the unit a person compares presets in. Below
 * a minute the seconds are the answer; above an hour the minutes still are.
 *
 * @param {unknown} ms
 * @returns {string}
 */
export function formatDuration(ms) {
  const value = num(ms);
  if (value === null || value < 0) {
    return EMPTY_CELL;
  }
  const seconds = Math.round(value / 1000);
  if (seconds < 60) {
    return `${seconds}초`;
  }
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}분`;
  }
  return `${Math.floor(minutes / 60)}시간 ${minutes % 60}분`;
}

/**
 * @param {unknown} tokens
 * @returns {string}
 */
export function formatTokens(tokens) {
  const value = num(tokens);
  if (value === null || value <= 0) {
    return EMPTY_CELL;
  }
  if (value >= 1_000_000) {
    return `τ ${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `τ ${(value / 1000).toFixed(1)}k`;
  }
  return `τ ${value}`;
}

/**
 * The 가격 cell. Delegates to the shared formatter so the partial-sum notation
 * `$1.23 (+2 leg 단가 없음)` is written in exactly one place (§1.3).
 *
 * @param {{ total_cost_usd?: number|null, unpriced_leg_count?: number, cost_estimated?: boolean }|null|undefined} usage
 * @returns {string}
 */
export function formatPrice(usage) {
  if (!usage || num(usage.total_cost_usd) === null) {
    return EMPTY_CELL;
  }
  return (
    formatCost(
      /** @type {any} */ ({
        total_cost_usd: usage.total_cost_usd,
        unpriced_leg_count: usage.unpriced_leg_count
      })
    ) ?? EMPTY_CELL
  );
}

/**
 * @param {number|null|undefined} median
 * @returns {string}
 */
export function formatCostMedian(median) {
  const value = num(median);
  return value === null ? EMPTY_CELL : `$${value.toFixed(2)}`;
}

/**
 * The `n=3/5` suffix a median carries when some rows had nothing to contribute
 * (§3.4). A column every row answered needs no suffix.
 *
 * @param {{ sample?: number, total?: number }|null|undefined} stat
 * @returns {string}
 */
export function sampleNote(stat) {
  const sample = num(stat?.sample) ?? 0;
  const total = num(stat?.total) ?? 0;
  if (sample === 0 || sample === total) {
    return '';
  }
  return `n=${sample}/${total}`;
}

/**
 * @param {number|null|undefined} rate
 * @returns {string}
 */
export function formatRate(rate) {
  const value = num(rate);
  return value === null ? EMPTY_CELL : `${Math.round(value * 100)}%`;
}

/**
 * The 검증 cell. `null` is 미상 — never a failure, and never counted as a pass.
 *
 * @param {unknown} verify
 * @returns {string}
 */
export function formatVerify(verify) {
  if (verify === 'pass') {
    return '통과';
  }
  if (verify === 'fail') {
    return '실패';
  }
  return '미상';
}

/**
 * The 실패·재시도 cell: the cause of a failure, the retry mark, or both.
 *
 * @param {{ failed?: boolean, cause?: string|null, is_retry?: boolean }} row
 * @returns {string}
 */
export function formatOutcome(row) {
  /** @type {string[]} */
  const parts = [];
  if (row.failed === true) {
    parts.push(
      typeof row.cause === 'string' && row.cause.length > 0
        ? `실패 · ${row.cause}`
        : '실패'
    );
  }
  if (row.is_retry === true) {
    parts.push('재시도');
  }
  return parts.length === 0 ? EMPTY_CELL : parts.join(' · ');
}

/**
 * The 리뷰 지적·라운드 cell, `b0/m3 · r2`.
 *
 * @param {{ blocking?: number|null, minor?: number|null, round?: number|null }|null|undefined} review
 * @returns {string}
 */
export function formatReview(review) {
  if (!review) {
    return EMPTY_CELL;
  }
  const blocking = num(review.blocking);
  const minor = num(review.minor);
  const round = num(review.round);
  if (blocking === null && minor === null && round === null) {
    return EMPTY_CELL;
  }
  const counts =
    blocking === null && minor === null
      ? null
      : `b${blocking ?? 0}/m${minor ?? 0}`;
  const rounds = round === null ? null : `r${round}`;
  return [counts, rounds].filter((part) => part !== null).join(' · ');
}
