/**
 * Token-usage projection for the Worker console (UI-raqh §1).
 *
 * The headline is deliberately ONE number — input + output, cache excluded —
 * because the question a running tile answers at a glance is "how much is this
 * session consuming", not "how is it distributed". The distribution lives in
 * the hover tooltip, which is where a reader who wants the cache ratio or the
 * cost goes looking. A row with no usage renders nothing at all: absent usage
 * is an old attempt or a runner that reported none, never a zero.
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
 * The usage of the LAST attempt recorded for a bead (spec §1: aggregation is
 * per attempt, never summed across re-runs — a re-run REPLACES the display).
 * The attempts map is append-only, so its insertion order is time, exactly as
 * the failure-banner supersede rule reads it.
 *
 * A last attempt without usage yields null rather than falling back to an
 * older one: showing the previous run's number next to a fresh attempt would
 * be a lie about which session spent it.
 *
 * @param {Record<string, any>} attempts
 * @param {string} bead_id
 * @returns {UsageRecord|null}
 */
export function lastAttemptUsage(attempts, bead_id) {
  /** @type {UsageRecord|null} */
  let last = null;
  for (const attempt of Object.values(attempts || {})) {
    if (attempt && attempt.bead_id === bead_id) {
      last = attempt.usage || null;
    }
  }
  return last;
}
