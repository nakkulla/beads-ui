/**
 * Pure reading of the provider usage endpoints (`GET /api/claude-usage`,
 * `/api/codex-usage`) for the header usage meter (UI-dbn6 §3.6): the payload
 * contract, the empty-vs-failed distinction, the held-snapshot aging, the
 * reset and age wording, and the 60/85 tone thresholds. Moved out of the old
 * `views/usage-meter.js` unchanged in meaning.
 *
 * @typedef {{ key: string, pct: number, resetsAt: string }} UsageWindow
 * @typedef {{ number: number, email: string, alias: string | null, plan: string | null, active: boolean, status: string, windows: UsageWindow[], fetchedAt: string | null, ageSeconds: number | null }} UsageAccount
 * @typedef {{ available: boolean, windows: UsageWindow[], ageSeconds: number | null, accounts: UsageAccount[], receivedAtMs: number, held: boolean }} ProviderSnapshot
 * @typedef {{ key: string, label: string, mark: string, endpoint: string, switch_endpoint: string, tool: string }} ProviderDescriptor
 * `mark` is the one-letter badge that tells the providers apart on a phone,
 * where the name is hidden (`Claude` and `Codex` share their initial).
 * @typedef {{ kind: 'ok', snapshot: ProviderSnapshot } | { kind: 'empty' } | { kind: 'error' }} ProviderRead
 */

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

/** A snapshot older than this is shown as stale. */
export const STALE_AGE_SECONDS = 600;

/** Account statuses that mean the provider tool needs a new login. */
export const RELOGIN_STATUSES = ['token_expired', 'relogin_required'];

/** @type {ProviderDescriptor[]} */
export const PROVIDERS = [
  {
    key: 'claude',
    label: 'Claude',
    mark: 'C',
    endpoint: '/api/claude-usage',
    switch_endpoint: '/api/claude-account/switch',
    tool: 'cswap'
  },
  {
    key: 'codex',
    label: 'Codex',
    mark: 'X',
    endpoint: '/api/codex-usage',
    switch_endpoint: '/api/codex-account/switch',
    tool: 'codex-auth'
  }
];

/**
 * @param {number} value
 * @returns {string}
 */
function pad(value) {
  return String(value).padStart(2, '0');
}

/**
 * Time remaining in cswap's compact day/hour/minute vocabulary.
 *
 * @param {number} reset_ms
 * @param {number} now_ms
 * @returns {string}
 */
function formatCountdown(reset_ms, now_ms) {
  const total_minutes = Math.max(0, Math.ceil((reset_ms - now_ms) / 60_000));
  const days = Math.floor(total_minutes / (24 * 60));
  const hours = Math.floor((total_minutes % (24 * 60)) / 60);
  const minutes = total_minutes % 60;
  if (days > 0) {
    return `${days}d${hours > 0 ? ` ${hours}h` : ''}`;
  }
  if (hours > 0) {
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
  }
  return `${minutes}m`;
}

/**
 * The local clock of a reset: `HH:MM` the same day, `Mon D HH:MM` otherwise;
 * empty for an unparsable instant.
 *
 * @param {string} resets_at
 * @param {number} [now_ms]
 * @returns {string}
 */
export function formatResetClock(resets_at, now_ms = Date.now()) {
  const reset_ms = Date.parse(resets_at);
  if (!Number.isFinite(reset_ms)) {
    return '';
  }
  const reset = new Date(reset_ms);
  const now = new Date(now_ms);
  const clock = `${pad(reset.getHours())}:${pad(reset.getMinutes())}`;
  const same_day =
    reset.getFullYear() === now.getFullYear() &&
    reset.getMonth() === now.getMonth() &&
    reset.getDate() === now.getDate();
  return same_day
    ? clock
    : `${MONTH_NAMES[reset.getMonth()]} ${reset.getDate()} ${clock}`;
}

/**
 * A reset as `countdown · local time` at render time.
 *
 * @param {string} resets_at
 * @param {number} [now_ms]
 * @returns {string}
 */
export function formatResetTime(resets_at, now_ms = Date.now()) {
  const reset_ms = Date.parse(resets_at);
  if (!Number.isFinite(reset_ms)) {
    return '';
  }
  return `${formatCountdown(reset_ms, now_ms)} · ${formatResetClock(resets_at, now_ms)}`;
}

/**
 * A snapshot age in the card's second/minute/hour vocabulary.
 *
 * @param {number} age_seconds
 * @returns {string}
 */
export function formatAge(age_seconds) {
  const seconds = Math.max(0, Math.floor(age_seconds));
  if (seconds < 60) {
    return `${seconds}초 전`;
  }
  if (seconds < 3_600) {
    return `${Math.floor(seconds / 60)}분 전`;
  }
  return `${Math.floor(seconds / 3_600)}시간 전`;
}

/**
 * The meter tone of a percentage: 85 and up danger, 60 and up warn.
 *
 * @param {number} pct
 * @returns {'success'|'warn'|'danger'}
 */
export function toneOf(pct) {
  if (pct >= 85) {
    return 'danger';
  }
  if (pct >= 60) {
    return 'warn';
  }
  return 'success';
}

/**
 * @param {unknown} pct
 * @returns {number} The percentage clamped to 0–100 (0 for a non-number).
 */
export function clampPct(pct) {
  const raw_pct = typeof pct === 'number' && Number.isFinite(pct) ? pct : 0;
  return Math.min(100, Math.max(0, raw_pct));
}

/**
 * Keep only the windows the meter can actually draw.
 *
 * @param {unknown[]} input
 * @returns {UsageWindow[]}
 */
function normalizeWindows(input) {
  /** @type {UsageWindow[]} */
  const windows = [];
  for (const candidate of input) {
    if (!candidate || typeof candidate !== 'object') {
      continue;
    }
    const window = /** @type {any} */ (candidate);
    if (typeof window.key !== 'string' || window.key.length === 0) {
      continue;
    }
    if (typeof window.pct !== 'number' || !Number.isFinite(window.pct)) {
      continue;
    }
    windows.push({
      key: window.key,
      pct: window.pct,
      resetsAt: typeof window.resetsAt === 'string' ? window.resetsAt : ''
    });
  }
  return windows;
}

/**
 * One `accounts[]` row; a row that does not match the contract is dropped so
 * a malformed row never removes the rest of the card.
 *
 * @param {unknown} input
 * @returns {UsageAccount | null}
 */
function normalizeAccountRow(input) {
  if (!input || typeof input !== 'object') {
    return null;
  }
  const row = /** @type {any} */ (input);
  if (!Number.isInteger(row.number) || row.number <= 0) {
    return null;
  }
  if (typeof row.email !== 'string' || row.email.length === 0) {
    return null;
  }
  if (typeof row.status !== 'string' || row.status.length === 0) {
    return null;
  }
  if (typeof row.active !== 'boolean' || !Array.isArray(row.windows)) {
    return null;
  }
  return {
    number: row.number,
    email: row.email,
    alias:
      typeof row.alias === 'string' && row.alias.length > 0 ? row.alias : null,
    plan: typeof row.plan === 'string' && row.plan.length > 0 ? row.plan : null,
    active: row.active,
    status: row.status,
    windows: normalizeWindows(row.windows),
    fetchedAt: typeof row.fetchedAt === 'string' ? row.fetchedAt : null,
    ageSeconds:
      typeof row.ageSeconds === 'number' && Number.isFinite(row.ageSeconds)
        ? row.ageSeconds
        : null
  };
}

/**
 * Collapse one usage response into what the header and the card render. A
 * provider stays visible when either the active account or at least one
 * account row is usable.
 *
 * @param {unknown} input
 * @param {number} received_at_ms
 * @returns {ProviderSnapshot | null}
 */
function normalizeSnapshot(input, received_at_ms) {
  if (!input || typeof input !== 'object') {
    return null;
  }
  const payload = /** @type {any} */ (input);
  /** @type {UsageAccount[]} */
  const accounts = [];
  if (Array.isArray(payload.accounts)) {
    for (const row of payload.accounts) {
      const account = normalizeAccountRow(row);
      if (account) {
        accounts.push(account);
      }
    }
  }
  const available =
    payload.available === true && Array.isArray(payload.windows);
  if (!available && accounts.length === 0) {
    return null;
  }
  return {
    available,
    windows: available ? normalizeWindows(payload.windows) : [],
    ageSeconds:
      typeof payload.ageSeconds === 'number' &&
      Number.isFinite(payload.ageSeconds)
        ? payload.ageSeconds
        : null,
    accounts,
    receivedAtMs: received_at_ms,
    held: false
  };
}

/**
 * Separate an empty-but-successful provider response from a failed lookup.
 *
 * The two collapse to the same `available: false` shape on the wire, but only
 * a failure may keep the previous snapshot on screen: the server attaches
 * `accounts[]` to every payload it could parse, so a missing array is the tool
 * itself failing (`cswap`/`codex-auth` non-zero, killed at the route timeout,
 * unparsable stdout), while an empty array is a provider that genuinely
 * manages no account.
 *
 * @param {unknown} input
 * @param {number} received_at_ms
 * @returns {ProviderRead}
 */
export function readPayload(input, received_at_ms) {
  if (!input || typeof input !== 'object') {
    return { kind: 'error' };
  }
  const snapshot = normalizeSnapshot(input, received_at_ms);
  if (snapshot) {
    return { kind: 'ok', snapshot };
  }
  return Array.isArray(/** @type {any} */ (input).accounts)
    ? { kind: 'empty' }
    : { kind: 'error' };
}

/**
 * Seconds since the snapshot's measurement, counting the time it has been
 * held on screen. The server's `ageSeconds` is fixed at fetch time, so
 * without this a held snapshot would keep claiming the age it had when it
 * arrived.
 *
 * @param {ProviderSnapshot} snapshot
 * @param {number} now_ms
 * @returns {number}
 */
export function effectiveAgeSeconds(snapshot, now_ms) {
  const measured = snapshot.ageSeconds === null ? 0 : snapshot.ageSeconds;
  return measured + Math.max(0, now_ms - snapshot.receivedAtMs) / 1_000;
}

/**
 * What a snapshot renders as right now. A held snapshot keeps its numbers
 * only while they are fresh enough to act on; past the stale bound it
 * degrades to the provider's empty state, so the header group keeps its place
 * without presenting a long-dead measurement as current.
 *
 * @param {ProviderSnapshot} snapshot
 * @param {number} now_ms
 * @returns {ProviderSnapshot}
 */
export function displaySnapshot(snapshot, now_ms) {
  if (!snapshot.held) {
    return snapshot;
  }
  if (effectiveAgeSeconds(snapshot, now_ms) <= STALE_AGE_SECONDS) {
    return snapshot;
  }
  return { ...snapshot, available: false, windows: [], accounts: [] };
}
