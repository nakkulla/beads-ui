/** Ordered problem keys shared by the projection and compare view. */
export const PROBLEM_KEYS = [
  'failed',
  'retry',
  'review',
  'human',
  'verify',
  'duration',
  'cost',
  'pin'
];

/** @type {Record<string, string>} */
export const PROBLEM_LABELS = {
  failed: '실패·폐기',
  retry: '재시도',
  review: '리뷰 지적',
  human: '사람 개입',
  verify: 'verify 실패',
  duration: '시간 초과',
  cost: '비용 초과',
  pin: '핀 조정'
};

/** @type {Record<string, any>} */
export const DEFAULT_PROBLEM_CRITERIA = {
  failed: { on: true },
  retry: { on: true, include_env: false },
  review: {
    on: true,
    round_min: 2,
    blocking_min: 1,
    minor_min: null
  },
  human: { on: true, include_env_events: false },
  verify: { on: true },
  duration: { on: true, factor: 3 },
  cost: { on: true, factor: 3 },
  pin: { on: false }
};

/** Numeric limits accepted by normalizeProblemCriteria. */
export const PROBLEM_CRITERIA_LIMITS = {
  round_min: { min: 1, max: 9 },
  blocking_min: { min: 1, max: 99 },
  minor_min: { min: 1, max: 99 },
  factor: { min: 1.5, max: 10 }
};

/** Minimum rows required to activate a relative baseline. */
export const PROBLEM_BASELINE_MIN_SAMPLE = 5;

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @param {boolean} fallback
 */
function booleanOr(value, fallback) {
  return typeof value === 'boolean' ? value : fallback;
}

/**
 * Preserve explicit null or an in-range integer; otherwise use fallback.
 *
 * @param {unknown} value
 * @param {number|null} fallback
 * @param {{ min: number, max: number }} limits
 * @returns {number|null}
 */
function thresholdOr(value, fallback, limits) {
  if (value === null) {
    return null;
  }
  return typeof value === 'number' &&
    Number.isInteger(value) &&
    value >= limits.min &&
    value <= limits.max
    ? value
    : fallback;
}

/**
 * @param {unknown} value
 * @param {number} fallback
 */
function factorOr(value, fallback) {
  const limits = PROBLEM_CRITERIA_LIMITS.factor;
  return typeof value === 'number' &&
    Number.isFinite(value) &&
    value >= limits.min &&
    value <= limits.max
    ? value
    : fallback;
}

/**
 * Normalize any partial or malformed payload into the complete criteria shape.
 *
 * @param {unknown} raw
 * @returns {Record<string, any>}
 */
export function normalizeProblemCriteria(raw) {
  const input = isRecord(raw) ? raw : {};
  const failed = isRecord(input.failed) ? input.failed : {};
  const retry = isRecord(input.retry) ? input.retry : {};
  const review = isRecord(input.review) ? input.review : {};
  const human = isRecord(input.human) ? input.human : {};
  const verify = isRecord(input.verify) ? input.verify : {};
  const duration = isRecord(input.duration) ? input.duration : {};
  const cost = isRecord(input.cost) ? input.cost : {};
  const pin = isRecord(input.pin) ? input.pin : {};
  const normalized_review = {
    on: booleanOr(review.on, DEFAULT_PROBLEM_CRITERIA.review.on),
    round_min: thresholdOr(
      review.round_min,
      DEFAULT_PROBLEM_CRITERIA.review.round_min,
      PROBLEM_CRITERIA_LIMITS.round_min
    ),
    blocking_min: thresholdOr(
      review.blocking_min,
      DEFAULT_PROBLEM_CRITERIA.review.blocking_min,
      PROBLEM_CRITERIA_LIMITS.blocking_min
    ),
    minor_min: thresholdOr(
      review.minor_min,
      DEFAULT_PROBLEM_CRITERIA.review.minor_min,
      PROBLEM_CRITERIA_LIMITS.minor_min
    )
  };
  if (
    normalized_review.round_min === null &&
    normalized_review.blocking_min === null &&
    normalized_review.minor_min === null
  ) {
    normalized_review.on = false;
  }
  return {
    failed: { on: booleanOr(failed.on, DEFAULT_PROBLEM_CRITERIA.failed.on) },
    retry: {
      on: booleanOr(retry.on, DEFAULT_PROBLEM_CRITERIA.retry.on),
      include_env: booleanOr(
        retry.include_env,
        DEFAULT_PROBLEM_CRITERIA.retry.include_env
      )
    },
    review: normalized_review,
    human: {
      on: booleanOr(human.on, DEFAULT_PROBLEM_CRITERIA.human.on),
      include_env_events: booleanOr(
        human.include_env_events,
        DEFAULT_PROBLEM_CRITERIA.human.include_env_events
      )
    },
    verify: { on: booleanOr(verify.on, DEFAULT_PROBLEM_CRITERIA.verify.on) },
    duration: {
      on: booleanOr(duration.on, DEFAULT_PROBLEM_CRITERIA.duration.on),
      factor: factorOr(
        duration.factor,
        DEFAULT_PROBLEM_CRITERIA.duration.factor
      )
    },
    cost: {
      on: booleanOr(cost.on, DEFAULT_PROBLEM_CRITERIA.cost.on),
      factor: factorOr(cost.factor, DEFAULT_PROBLEM_CRITERIA.cost.factor)
    },
    pin: { on: booleanOr(pin.on, DEFAULT_PROBLEM_CRITERIA.pin.on) }
  };
}

/**
 * @param {unknown} criteria
 */
export function isDefaultProblemCriteria(criteria) {
  return (
    JSON.stringify(normalizeProblemCriteria(criteria)) ===
    JSON.stringify(DEFAULT_PROBLEM_CRITERIA)
  );
}
