/**
 * Claude provider-outage classifier (provider-outage-hold-resume §3).
 *
 * Only the final `result` event, or stderr when no result exists, may supply a
 * signal. This keeps quoted API errors in assistant/tool text from becoming
 * worker state.
 */
import { errorDetail } from '../error-detail.js';

/** @type {RegExp} */
export const LIMIT_RE =
  /\bhit your (?:session|usage|weekly|daily|monthly)?\s*limit\b|\busage limit\b|\blimit reached\b|\bout of (?:extra )?usage\b/i;

/** @type {RegExp} */
const API_529_RE = /\bAPI Error: 529\b/i;
/** @type {RegExp} */
const OVERLOADED_RE = /\boverloaded\b/i;
/** @type {RegExp} */
const API_5XX_RE = /\bAPI Error: (5(?!29)\d{2})\b/i;
/** @type {RegExp} */
const API_429_RE = /\bAPI Error: 429\b/i;
/** @type {RegExp} */
const RESET_RE =
  /\bresets?\s+(?:at\s+)?(?<when>[^()]+?)\s*(?:\((?<tz>[A-Za-z_]+\/[A-Za-z_]+)\))?\s*$/i;
/** @type {RegExp} */
const WHEN_RE =
  /^(?:(?<month>Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(?<day>\d{1,2}),?\s+)?(?<hour>\d{1,2})(?::(?<minute>\d{2}))?\s*(?<period>am|pm)$/i;

const HOUR_MS = 60 * 60 * 1000;

/** @type {Record<string, number>} */
const MONTHS = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12
};

/**
 * @typedef {Object} ProviderOutage
 * @property {string} detail
 * @property {string} message
 * @property {'provider'|'account'} scope
 * @property {number|null} resets_at
 */

/**
 * @typedef {Object} OutageMatch
 * @property {string} detail
 * @property {string} message
 * @property {'provider'|'account'} scope
 */

/**
 * @typedef {Object} AccountWindow
 * @property {number} pct
 * @property {string|null} resetsAt
 */

/**
 * @typedef {Object} AccountRow
 * @property {string} status
 * @property {AccountWindow[]} windows
 */

/**
 * Preserve non-empty source lines without interpreting other event fields.
 *
 * @param {unknown} value
 * @returns {string[]}
 */
function sourceLines(value) {
  if (typeof value !== 'string') {
    return [];
  }
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

/**
 * Return first original line matching `re`, else null.
 *
 * @param {string[]} lines
 * @param {RegExp} re
 * @returns {string|null}
 */
function matchingLine(lines, re) {
  for (const line of lines) {
    if (re.test(line)) {
      return line;
    }
  }
  return null;
}

/**
 * Build one capped classifier match from its source line.
 *
 * @param {string} detail
 * @param {'provider'|'account'} scope
 * @param {string|null} line
 * @returns {OutageMatch|null}
 */
function outageMatch(detail, scope, line) {
  if (line === null) {
    return null;
  }
  return { detail, scope, message: errorDetail(line) };
}

/**
 * Apply §3.2 in first-match order. A structured status bypasses conflicting
 * status strings; only `LIMIT_RE` still refines structured 429 into account
 * usage exhaustion.
 *
 * @param {string[]} lines
 * @param {number|null} structured_status
 * @param {boolean} allow_limit
 * @returns {OutageMatch|null}
 */
function classifyLines(lines, structured_status, allow_limit) {
  const first_line = lines[0] ?? null;
  if (structured_status !== null) {
    if (structured_status === 529) {
      return outageMatch('overloaded_529', 'provider', first_line);
    }
    if (structured_status >= 500 && structured_status <= 599) {
      return outageMatch(`http_${structured_status}`, 'provider', first_line);
    }
    if (structured_status === 429) {
      const limit_line = allow_limit ? matchingLine(lines, LIMIT_RE) : null;
      if (limit_line !== null) {
        return outageMatch('usage_limit', 'account', limit_line);
      }
      return outageMatch('rate_limited_429', 'provider', first_line);
    }
    return null;
  }

  const overloaded_line =
    matchingLine(lines, API_529_RE) ?? matchingLine(lines, OVERLOADED_RE);
  if (overloaded_line !== null) {
    return outageMatch('overloaded_529', 'provider', overloaded_line);
  }

  for (const line of lines) {
    const match = API_5XX_RE.exec(line);
    if (match) {
      return outageMatch(`http_${match[1]}`, 'provider', line);
    }
  }

  const rate_line = matchingLine(lines, API_429_RE);
  if (rate_line !== null) {
    const limit_line = allow_limit ? matchingLine(lines, LIMIT_RE) : null;
    if (limit_line !== null) {
      return outageMatch('usage_limit', 'account', limit_line);
    }
    return outageMatch('rate_limited_429', 'provider', rate_line);
  }

  if (allow_limit) {
    const limit_line = matchingLine(lines, LIMIT_RE);
    if (limit_line !== null) {
      return outageMatch('usage_limit', 'account', limit_line);
    }
  }
  return null;
}

/**
 * Read calendar fields for `epoch` in one IANA timezone.
 *
 * @param {number} epoch
 * @param {string} time_zone
 * @returns {{ year: number, month: number, day: number, hour: number, minute: number }|null}
 */
function calendarParts(epoch, time_zone) {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: time_zone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    }).formatToParts(epoch);
    /** @type {Record<string, number>} */
    const values = {};
    for (const part of parts) {
      if (part.type !== 'literal') {
        values[part.type] = Number(part.value);
      }
    }
    if (
      !Number.isInteger(values.year) ||
      !Number.isInteger(values.month) ||
      !Number.isInteger(values.day) ||
      !Number.isInteger(values.hour) ||
      !Number.isInteger(values.minute)
    ) {
      return null;
    }
    return {
      year: values.year,
      month: values.month,
      day: values.day,
      hour: values.hour,
      minute: values.minute
    };
  } catch {
    return null;
  }
}

/**
 * Return every epoch matching one local wall-clock minute. Sampling offsets
 * around the target preserves both occurrences of a DST fallback minute.
 *
 * @param {{ year: number, month: number, day: number, hour: number, minute: number }} target
 * @param {string} time_zone
 * @returns {number[]}
 */
function zonedEpochs(target, time_zone) {
  const naive = Date.UTC(
    target.year,
    target.month - 1,
    target.day,
    target.hour,
    target.minute
  );
  const normalized = new Date(naive);
  if (
    normalized.getUTCFullYear() !== target.year ||
    normalized.getUTCMonth() + 1 !== target.month ||
    normalized.getUTCDate() !== target.day ||
    normalized.getUTCHours() !== target.hour ||
    normalized.getUTCMinutes() !== target.minute
  ) {
    return [];
  }

  /** @type {Set<number>} */
  const offsets = new Set();
  for (const delta of [-36, -12, 0, 12, 36]) {
    const probe = naive + delta * HOUR_MS;
    const observed = calendarParts(probe, time_zone);
    if (observed === null) {
      return [];
    }
    const observed_utc = Date.UTC(
      observed.year,
      observed.month - 1,
      observed.day,
      observed.hour,
      observed.minute
    );
    offsets.add(observed_utc - probe);
  }

  /** @type {Set<number>} */
  const matches = new Set();
  for (const offset of offsets) {
    const candidate = naive - offset;
    const observed = calendarParts(candidate, time_zone);
    if (
      observed &&
      observed.year === target.year &&
      observed.month === target.month &&
      observed.day === target.day &&
      observed.hour === target.hour &&
      observed.minute === target.minute
    ) {
      matches.add(candidate);
    }
  }
  return [...matches].sort((a, b) => a - b);
}

/**
 * Shift a calendar date without applying the server timezone.
 *
 * @param {{ year: number, month: number, day: number }} date
 * @param {number} days
 * @returns {{ year: number, month: number, day: number }}
 */
function shiftDate(date, days) {
  const shifted = new Date(
    Date.UTC(date.year, date.month - 1, date.day + days)
  );
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate()
  };
}

/**
 * Find first matching wall-clock occurrence strictly after `finished_at`.
 *
 * @param {{ month: number|null, day: number|null, hour: number, minute: number }} parsed
 * @param {string} time_zone
 * @param {number} finished_at
 * @returns {number|null}
 */
function firstOccurrence(parsed, time_zone, finished_at) {
  const finished_parts = calendarParts(finished_at, time_zone);
  if (finished_parts === null) {
    return null;
  }

  if (parsed.month === null || parsed.day === null) {
    const base = {
      year: finished_parts.year,
      month: finished_parts.month,
      day: finished_parts.day
    };
    for (let days = 0; days <= 3; days += 1) {
      const date = shiftDate(base, days);
      const candidates = zonedEpochs(
        { ...date, hour: parsed.hour, minute: parsed.minute },
        time_zone
      );
      const candidate = candidates.find((value) => value > finished_at);
      if (candidate !== undefined) {
        return candidate;
      }
    }
    return null;
  }

  for (let years = 0; years <= 8; years += 1) {
    const candidates = zonedEpochs(
      {
        year: finished_parts.year + years,
        month: parsed.month,
        day: parsed.day,
        hour: parsed.hour,
        minute: parsed.minute
      },
      time_zone
    );
    const candidate = candidates.find((value) => value > finished_at);
    if (candidate !== undefined) {
      return candidate;
    }
  }
  return null;
}

/**
 * Parse the two reset-time forms approved by §3.3.
 *
 * @param {string[]} lines
 * @param {number|null|undefined} finished_at
 * @returns {number|null}
 */
function resultResetAt(lines, finished_at) {
  if (typeof finished_at !== 'number' || !Number.isFinite(finished_at)) {
    return null;
  }
  for (const line of lines) {
    const reset_match = RESET_RE.exec(line);
    if (!reset_match?.groups) {
      continue;
    }
    const when_match = WHEN_RE.exec(reset_match.groups.when.trim());
    if (!when_match?.groups) {
      continue;
    }
    const raw_hour = Number(when_match.groups.hour);
    const minute = Number(when_match.groups.minute ?? '0');
    if (raw_hour < 1 || raw_hour > 12 || minute < 0 || minute > 59) {
      continue;
    }
    const period = when_match.groups.period.toLowerCase();
    const hour = (raw_hour % 12) + (period === 'pm' ? 12 : 0);
    const month_name = when_match.groups.month;
    const month = month_name ? MONTHS[month_name.toLowerCase()] : null;
    const day = when_match.groups.day ? Number(when_match.groups.day) : null;
    const time_zone =
      reset_match.groups.tz || Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (typeof time_zone !== 'string' || time_zone.length === 0) {
      continue;
    }
    const candidate = firstOccurrence(
      { month, day, hour, minute },
      time_zone,
      finished_at
    );
    if (candidate !== null) {
      return candidate;
    }
  }
  return null;
}

/**
 * Read the highest-percentage account window supplied by a later catalog
 * integration. This module never performs the catalog lookup itself.
 *
 * @param {AccountRow|null|undefined} account_row
 * @returns {number|null}
 */
function catalogResetAt(account_row) {
  if (account_row?.status !== 'ok' || !Array.isArray(account_row.windows)) {
    return null;
  }
  /** @type {AccountWindow|null} */
  let selected = null;
  for (const window of account_row.windows) {
    if (
      !window ||
      typeof window.pct !== 'number' ||
      !Number.isFinite(window.pct)
    ) {
      continue;
    }
    if (selected === null || window.pct > selected.pct) {
      selected = window;
    }
  }
  if (selected === null || typeof selected.resetsAt !== 'string') {
    return null;
  }
  const parsed = Date.parse(selected.resetsAt);
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * Classify one closed Claude stream without reading queue or account state.
 * `account_row` is an optional injection seam for the later catalog-wiring
 * unit; absence keeps an unparseable `usage_limit` reset at null.
 *
 * @param {{ raw: any[], stderr_tail: string|null, finished_at?: number|null, account_row?: AccountRow|null }} ctx
 * @returns {ProviderOutage|null}
 */
export function classifyProviderOutage(ctx) {
  const raw = Array.isArray(ctx.raw) ? ctx.raw : [];
  const results = raw.filter(
    (event) => event && typeof event === 'object' && event.type === 'result'
  );
  if (results.length > 0) {
    const result = results[results.length - 1];
    if (result.is_error !== true) {
      return null;
    }
    const lines = sourceLines(result.result);
    if (lines.length === 0) {
      lines.push(...sourceLines(result.error));
    }
    const structured_status = Number.isInteger(result.api_error_status)
      ? result.api_error_status
      : null;
    const match = classifyLines(lines, structured_status, true);
    if (match === null) {
      return null;
    }
    const resets_at =
      match.detail === 'usage_limit'
        ? (resultResetAt(lines, ctx.finished_at) ??
          catalogResetAt(ctx.account_row))
        : null;
    return { ...match, resets_at };
  }

  const lines = sourceLines(ctx.stderr_tail);
  const match = classifyLines(lines, null, false);
  return match === null ? null : { ...match, resets_at: null };
}
