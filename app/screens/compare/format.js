/**
 * Display formatting for the comparison table (preset-compare §3.6). Kept apart
 * from the view so every cell rule is testable without a DOM.
 */
import { PROBLEM_KEYS } from '../../utils/compare-problem-criteria.js';
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
 * @param {{ total_cost_usd?: number|null, unpriced_leg_count?: number, cost_estimated?: boolean, partial?: boolean }|null|undefined} usage
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
        unpriced_leg_count: usage.unpriced_leg_count,
        partial: usage.partial
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
 * Format a row-to-baseline ratio for problem chips.
 *
 * @param {unknown} value
 * @param {unknown} baseline
 * @returns {string}
 */
export function formatFactorChip(value, baseline) {
  const numerator = num(value);
  const denominator = num(baseline);
  if (numerator === null || denominator === null || denominator === 0) {
    return '';
  }
  return `×${(numerator / denominator).toFixed(1)}`;
}

/**
 * Describe exactly the criteria and baselines used by the server projection.
 *
 * @param {Record<string, any>} effective
 * @param {Record<string, any>} baselines
 * @returns {string}
 */
export function formatCriteriaLegend(effective, baselines) {
  /** @type {Record<string, string>} */
  const labels = {
    failed: '실패·폐기',
    retry: `재시도·재개(환경 ${effective.retry?.include_env ? '포함' : '제외'})`,
    review: '',
    human: `사람 개입(환경 이벤트 ${effective.human?.include_env_events ? '포함' : '제외'})`,
    verify: 'verify 실패',
    duration: '',
    cost: '',
    pin: '핀 조정'
  };
  const review_parts = [
    effective.review?.round_min === null
      ? null
      : `r≥${effective.review?.round_min}`,
    effective.review?.blocking_min === null
      ? null
      : `b≥${effective.review?.blocking_min}`,
    effective.review?.minor_min === null
      ? null
      : `m≥${effective.review?.minor_min}`
  ].filter(Boolean);
  labels.review = `리뷰 ${review_parts.join(' 또는 ')}`;
  labels.duration = baselines.duration_ms?.active
    ? `시간 > 중앙값 ${formatDuration(baselines.duration_ms.median)} ×${effective.duration?.factor}`
    : '시간 초과(표본 5건 미만으로 비활성)';
  labels.cost = baselines.cost_usd?.active
    ? `비용 > 중앙값 ${formatCostMedian(baselines.cost_usd.median)} ×${effective.cost?.factor}${baselines.cost_usd.partial_count > 0 ? ` · 부분 집계 표본 ${baselines.cost_usd.partial_count}건` : ''}`
    : '비용 초과(표본 5건 미만으로 비활성)';
  const enabled = PROBLEM_KEYS.filter((key) => effective[key]?.on).map(
    (key) => labels[key]
  );
  const problem_sentence =
    enabled.length === 0
      ? '문제 세션 = 기준 없음(문제율 —).'
      : `문제 세션 = 다음 중 하나라도 해당: ${enabled.join(' · ')}.`;
  return `착지율 = 착지(PR 머지·quick_fix push·무변경 close 관측) ÷ 판정된 세션(착지·실패·폐기). ${problem_sentence} 평균은 값이 있는 세션만(n 표기), 비용은 API 환산 단가 기준.`;
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
 * Describe the server's outcome, with verification as supporting evidence.
 *
 * @param {Record<string, any>} row
 */
export function formatOutcomeText(row) {
  const outcome = row.outcome;
  const kind = outcome?.kind;
  const evidence = outcome?.evidence;
  let text = '미상';
  if (kind === 'landed') {
    text = '착지';
    if (evidence === 'closed' && outcome.pr_url) {
      const number = String(outcome.pr_url).match(/(\d+)\/?$/)?.[1];
      text += number ? ` · PR #${number}` : ' · PR';
    } else if (evidence === 'push') {
      text += ` · push${outcome.head_sha ? ` ${String(outcome.head_sha).slice(0, 7)}` : ''}`;
    } else if (evidence === 'no_change') {
      text += ' · 무변경';
    }
  } else if (kind === 'failed') {
    text = evidence ? `실패 · ${evidence}` : '실패';
  } else if (kind === 'aborted') {
    text = evidence === 'stopped' ? '중지' : '폐기';
  } else if (kind === 'parked') {
    text = '파킹';
  } else if (kind === 'waiting') {
    text = '대기';
  } else if (kind === 'superseded') {
    text = '대체됨';
  } else if (kind === 'in_flight') {
    text = evidence === 'pr_open' ? '진행 중 · PR open' : '진행 중';
  }
  if (row.verify === 'pass' || row.verify === 'fail') {
    text += ` · verify ${row.verify === 'pass' ? '통과' : '실패'}`;
  }
  return text;
}

/** @param {Record<string, any>} row */
export function outcomeDotKind(row) {
  const kind = row.outcome?.kind;
  if (kind === 'landed') {
    return 'landed';
  }
  if (kind === 'failed' || kind === 'aborted') {
    return 'failed';
  }
  return PROBLEM_KEYS.some((key) => row.problems?.[key] === true)
    ? 'problem'
    : 'muted';
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
