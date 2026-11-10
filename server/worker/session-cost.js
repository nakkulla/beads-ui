/**
 * Per-attempt cost for a Claude session continued across attempts.
 *
 * Claude's `result` event reports `total_cost_usd` for the whole SESSION, and a
 * `--resume` restores the cost the session had already spent. An attempt that
 * resumes the same `session_id` would therefore record its predecessors' cost
 * again (UI-ksi6: 61.27 then a one-minute resume at 63.65). Token counts are
 * per process run and are left alone.
 *
 * The attempt keeps the session's raw cumulative cost in `session_cost_usd`
 * and its own increment in `usage.total_cost_usd`. The raw value lives OUTSIDE
 * `usage` because usage summation adds every numeric field it finds.
 */

/**
 * @param {unknown} value
 * @returns {value is number}
 */
function isCost(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

/**
 * The session's cumulative cost already counted by earlier attempts of the
 * same Claude session, or null when nothing is to be deducted. The earlier
 * attempts are every other record carrying the same `session_id` that
 * finished before this one started — a manual resume (`resumed_from`) and a
 * review session resuming the implementation session alike. A fresh or forked
 * session carries a new id, so its cost starts at zero. The latest such
 * attempt that reported a cost holds the running total: `session_cost_usd`,
 * or `usage.total_cost_usd` on a record written before that field existed.
 *
 * @param {Record<string, any>|null|undefined} attempts - Attempt id → record.
 * @param {Record<string, any>|null|undefined} attempt
 * @returns {number|null}
 */
export function sessionCostBaseline(attempts, attempt) {
  if (
    !attempts ||
    !attempt ||
    attempt.runner !== 'claude' ||
    typeof attempt.session_id !== 'string' ||
    attempt.session_id.length === 0
  ) {
    return null;
  }
  const started_at = Number.isFinite(attempt.started_at)
    ? attempt.started_at
    : Infinity;
  /** @type {{ finished_at: number, cost: number }|null} */
  let latest = null;
  for (const other of Object.values(attempts)) {
    if (
      !other ||
      other.attempt_id === attempt.attempt_id ||
      other.session_id !== attempt.session_id ||
      !Number.isFinite(other.finished_at) ||
      other.finished_at > started_at
    ) {
      continue;
    }
    const cost = isCost(other.session_cost_usd)
      ? other.session_cost_usd
      : other.usage?.total_cost_usd;
    if (!isCost(cost)) {
      continue;
    }
    if (latest === null || other.finished_at > latest.finished_at) {
      latest = { finished_at: other.finished_at, cost };
    }
  }
  return latest === null ? null : latest.cost;
}

/**
 * Turn a Claude attempt's reported session-cumulative cost into its own
 * increment. Returns the usage unchanged (and no `session_cost_usd`) when the
 * attempt is not Claude or reported no cost. A baseline larger than the
 * reported total means the session did not carry its cost over, so the
 * reported value already is the increment.
 *
 * @template {Record<string, any>} U
 * @param {Record<string, any>|null|undefined} attempts
 * @param {Record<string, any>|null|undefined} attempt
 * @param {U|null} usage
 * @returns {{ usage: U|null, session_cost_usd?: number }}
 */
export function attemptCostUsage(attempts, attempt, usage) {
  if (!usage || attempt?.runner !== 'claude' || !isCost(usage.total_cost_usd)) {
    return { usage };
  }
  const session_cost_usd = usage.total_cost_usd;
  const baseline = sessionCostBaseline(attempts, attempt);
  if (baseline === null || baseline > session_cost_usd) {
    return { usage, session_cost_usd };
  }
  return {
    usage: { ...usage, total_cost_usd: session_cost_usd - baseline },
    session_cost_usd
  };
}
