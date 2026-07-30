/**
 * Token-usage projection shared by the Worker console and the issue detail
 * panel (UI-raqh §1, UI-d7pw §1).
 *
 * The headline is deliberately ONE number — input + output + cache read + cache
 * creation — because the question a badge answers at a glance is "how much did
 * this cost", not "how is it distributed". Cache belongs INSIDE that sum
 * (UI-tq13): a Claude session runs almost all of its context through cache
 * hits, so an input+output headline showed 2,674 of a measured 14,104,199
 * tokens — 0.02% of what the session actually consumed, which answers the
 * headline's own question wrongly. The distribution lives in the hover tooltip,
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
 * The summable token fields, in tally order — and the definition of the
 * headline total, which every surface that shows a τ number has to share. Cost
 * is deliberately outside: it is summed separately because a missing cost must
 * not become a reported zero.
 *
 * @type {Array<'input_tokens'|'output_tokens'|'cache_read_input_tokens'|'cache_creation_input_tokens'>}
 */
export const SUM_FIELDS = [
  'input_tokens',
  'output_tokens',
  'cache_read_input_tokens',
  'cache_creation_input_tokens'
];

/**
 * @param {UsageRecord|null|undefined} usage
 * @returns {number}
 */
function sumTokens(usage) {
  let total = 0;
  for (const field of SUM_FIELDS) {
    total += numeric(usage?.[field]);
  }
  return total;
}

/**
 * Whether a record carries at least one token count. A record with only a cost
 * says nothing about consumption, so it renders no badge. The test spans every
 * field the headline sums, so a record reporting only cache counts is usage —
 * anything the total can see, this predicate can see (UI-tq13 §2).
 *
 * @param {UsageRecord|null|undefined} usage
 * @returns {boolean}
 */
function hasTokens(usage) {
  if (!usage || typeof usage !== 'object') {
    return false;
  }
  return SUM_FIELDS.some((field) => Number.isFinite(usage[field]));
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
  return `τ ${abbreviate(sumTokens(usage))}`;
}

/**
 * The lane/tile badge: the headline total, with the cost appended when one is
 * known. Cost never REPLACES the token count (UI-tq13 §6) — a column whose
 * number changes scale with the row's state cannot be compared down the column.
 *
 * @param {UsageRecord|null|undefined} usage
 * @returns {string|null}
 */
export function formatUsageTotalWithCost(usage) {
  const label = formatUsageTotal(usage);
  if (!label) {
    return null;
  }
  const cost = usage?.total_cost_usd;
  return typeof cost === 'number' && Number.isFinite(cost)
    ? `${label} · $${cost.toFixed(2)}`
    : label;
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
  // The headline first, then the breakdown that explains it (UI-tq13 §3): the
  // badge shows an abbreviated `14.1M`, and the reader who hovers is the one who
  // wants the exact number the abbreviation came from.
  const lines = [
    `총 ${sumTokens(usage).toLocaleString('en-US')}`,
    parts.join(' · ')
  ];
  if (usage.replayed) {
    lines.push(REPLAYED_NOTE);
  }
  return lines.join('\n');
}

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
 * `total_cost_usd` is summed only when EVERY summed attempt reported one, and
 * omitted otherwise (UI-tq13 §7). A partial cost would split the populations
 * inside a single badge — tokens from three attempts beside money from two — and
 * a reader has no way to see that split. In practice this means money appears
 * only on a finished issue, since a running attempt has no `result` event to
 * carry a cost; an attempt that died before emitting one also suppresses it,
 * which is the honest rendering of a cost nobody knows.
 *
 * `replayed` propagates if ANY summed attempt carried it — a sum containing a
 * restart-recovered partial is itself a floor.
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
  let summed = 0;
  let cost = 0;
  let cost_reported = 0;
  let replayed = false;
  for (const attempt of Object.values(attempts || {})) {
    if (!attempt || attempt.bead_id !== bead_id) {
      continue;
    }
    const usage = attempt.usage;
    if (!hasTokens(usage)) {
      continue;
    }
    summed += 1;
    for (const field of SUM_FIELDS) {
      total[field] = numeric(total[field]) + numeric(usage[field]);
    }
    if (
      typeof usage.total_cost_usd === 'number' &&
      Number.isFinite(usage.total_cost_usd)
    ) {
      cost += usage.total_cost_usd;
      cost_reported += 1;
    }
    if (usage.replayed === true) {
      replayed = true;
    }
  }
  if (summed === 0) {
    return null;
  }
  if (cost_reported === summed) {
    total.total_cost_usd = cost;
  }
  if (replayed) {
    total.replayed = true;
  }
  return total;
}
