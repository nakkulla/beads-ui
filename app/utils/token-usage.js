/**
 * Token-usage projection shared by the Worker console and the issue detail
 * panel (UI-raqh §1, UI-d7pw §1).
 *
 * The headline is deliberately ONE number — input + output, cache excluded —
 * because the question a badge answers at a glance is "how much did this cost",
 * not "how is it distributed". The distribution lives in the hover tooltip,
 * which is where a reader who wants the cache ratio or the cost goes looking. A
 * row with no usage renders nothing at all: absent usage is an old attempt or a
 * runner that reported none, never a zero.
 *
 * This module lives in `app/utils` rather than `app/views/worker` because it
 * has two consumers: the worker lanes/tiles and the detail panel's session
 * history (UI-d7pw §1.3).
 */

/**
 * @typedef {{ input_tokens?: number, output_tokens?: number, cache_read_input_tokens?: number, cache_creation_input_tokens?: number, total_cost_usd?: number, replayed?: boolean }} UsageRecord
 */

/**
 * The tooltip line a restart-recovered tally carries (UI-ediw): the events lost
 * with the old server's pipe can never be recovered, so the number below is a
 * floor, not the session's total.
 *
 * @type {string}
 */
const REPLAYED_NOTE = '서버 재시작 복구 — 부분 집계';

/**
 * @param {unknown} value
 * @returns {number}
 */
function numeric(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

/**
 * Whether a record carries at least one token count. A record with only a cost
 * says nothing about consumption, so it renders no badge.
 *
 * @param {UsageRecord|null|undefined} usage
 * @returns {boolean}
 */
function hasTokens(usage) {
  if (!usage || typeof usage !== 'object') {
    return false;
  }
  return (
    typeof usage.input_tokens === 'number' ||
    typeof usage.output_tokens === 'number'
  );
}

/**
 * Abbreviate a token count: plain under 1k, one decimal in k, then in M.
 *
 * @param {number} n
 * @returns {string}
 */
function abbreviate(n) {
  if (n >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(1)}M`;
  }
  if (n >= 1000) {
    return `${(n / 1000).toFixed(1)}k`;
  }
  return String(n);
}

/**
 * The badge label for one usage record, or null when there is nothing to show.
 *
 * @param {UsageRecord|null|undefined} usage
 * @returns {string|null}
 */
export function formatUsageTotal(usage) {
  if (!hasTokens(usage)) {
    return null;
  }
  const total = numeric(usage?.input_tokens) + numeric(usage?.output_tokens);
  return `τ ${abbreviate(total)}`;
}

/**
 * The hover breakdown behind the badge.
 *
 * @param {UsageRecord|null|undefined} usage
 * @returns {string}
 */
export function usageTooltip(usage) {
  if (!usage || typeof usage !== 'object') {
    return '';
  }
  const parts = [
    `입력 ${numeric(usage.input_tokens).toLocaleString('en-US')}`,
    `출력 ${numeric(usage.output_tokens).toLocaleString('en-US')}`,
    `캐시읽기 ${numeric(usage.cache_read_input_tokens).toLocaleString('en-US')}`,
    `캐시생성 ${numeric(usage.cache_creation_input_tokens).toLocaleString('en-US')}`
  ];
  if (
    typeof usage.total_cost_usd === 'number' &&
    Number.isFinite(usage.total_cost_usd)
  ) {
    parts.push(`$${usage.total_cost_usd.toFixed(2)}`);
  }
  const line = parts.join(' · ');
  return usage.replayed ? `${line}\n${REPLAYED_NOTE}` : line;
}

/**
 * The summable token fields, in tally order. Cost is deliberately outside: it
 * is summed separately because a missing cost must not become a reported zero.
 *
 * @type {Array<'input_tokens'|'output_tokens'|'cache_read_input_tokens'|'cache_creation_input_tokens'>}
 */
const SUM_FIELDS = [
  'input_tokens',
  'output_tokens',
  'cache_read_input_tokens',
  'cache_creation_input_tokens'
];

/**
 * The usage of EVERY attempt recorded for a bead, summed (UI-d7pw §1).
 *
 * This deliberately reverses the earlier per-attempt rule (UI-raqh §1), which
 * showed only the last attempt so the badge would answer "how much is this
 * session consuming". The badge now answers a different question — "how much
 * did this ISSUE cost" — and that one has to include the failed re-runs,
 * because the tokens a failed attempt spent are still tokens the issue spent.
 * The detail panel's total (UI-d7pw §2.2) uses this same function, so the two
 * surfaces can never show different numbers for the same bead.
 *
 * An attempt without usage is SKIPPED rather than zeroing the sum: it reported
 * nothing, which is not the same fact as reporting zero. A bead whose attempts
 * all reported nothing yields null, so the caller renders no badge at all.
 *
 * `total_cost_usd` is summed only over the attempts that reported one, and is
 * omitted entirely when none did. `replayed` propagates if ANY summed attempt
 * carried it — a sum containing a restart-recovered partial is itself a floor.
 *
 * @param {Record<string, any>} attempts
 * @param {string} bead_id
 * @returns {UsageRecord|null}
 */
export function sumAttemptUsage(attempts, bead_id) {
  /** @type {UsageRecord} */
  const total = {
    input_tokens: 0,
    output_tokens: 0,
    cache_read_input_tokens: 0,
    cache_creation_input_tokens: 0
  };
  let any_tokens = false;
  let cost = 0;
  let any_cost = false;
  let replayed = false;
  for (const attempt of Object.values(attempts || {})) {
    if (!attempt || attempt.bead_id !== bead_id) {
      continue;
    }
    const usage = attempt.usage;
    if (!hasTokens(usage)) {
      continue;
    }
    any_tokens = true;
    for (const field of SUM_FIELDS) {
      total[field] = numeric(total[field]) + numeric(usage[field]);
    }
    if (
      typeof usage.total_cost_usd === 'number' &&
      Number.isFinite(usage.total_cost_usd)
    ) {
      cost += usage.total_cost_usd;
      any_cost = true;
    }
    if (usage.replayed === true) {
      replayed = true;
    }
  }
  if (!any_tokens) {
    return null;
  }
  if (any_cost) {
    total.total_cost_usd = cost;
  }
  if (replayed) {
    total.replayed = true;
  }
  return total;
}
