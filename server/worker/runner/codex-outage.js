/**
 * Codex provider-outage classifier (codex-orchestration-parity §5.1).
 *
 * Only STRUCTURED evidence may create a hold: a `turn.failed` error message or
 * a top-level `{"type":"error"}` line whose message either parses as the JSON
 * envelope codex forwards from the API (`{"type":"error","status":<n>,…}`) or
 * carries codex's own transport line `unexpected status <NNN> <Reason>`. An
 * `agent_message` that merely quotes "429" is model text, never worker state,
 * and an `item.completed` error item is a warning the turn survived.
 *
 * Auth (401/403), request (400) and local execution failures stay general
 * failures: holding the whole provider on them would park a queue on a problem
 * only this attempt has. Claude's 529 reading is not ported — codex has no
 * observed counterpart.
 */
import { errorDetail } from '../error-detail.js';

/**
 * Codex's own reconnect/transport line, the one non-JSON shape that still
 * names a real HTTP status.
 *
 * @type {RegExp}
 */
const TRANSPORT_STATUS_RE = /\bunexpected status (\d{3})\b/i;

/**
 * An `error.type` that names rate or usage limiting rather than a request
 * defect.
 *
 * @type {RegExp}
 */
const LIMIT_TYPE_RE = /rate[_\s-]?limit|usage[_\s-]?limit|quota/i;

/**
 * Wording that puts a limit on the ACCOUNT's plan quota instead of the shared
 * request rate.
 *
 * @type {RegExp}
 */
const ACCOUNT_QUOTA_RE =
  /\busage limit\b|\bquota\b|\bplan limit\b|\baccount limit\b|\bcredits?\b|\bplan\b/i;

/**
 * Reset-bearing field names, in the order a payload is searched.
 *
 * @type {readonly string[]}
 */
const RESET_FIELDS = ['resets_at', 'reset_at', 'resetsAt', 'retry_after'];

/**
 * @typedef {Object} ProviderOutage
 * @property {string} detail
 * @property {string} message
 * @property {'provider'|'account'} scope
 * @property {number|null} resets_at
 */

/**
 * @typedef {Object} CodexEnvelope
 * @property {number} status
 * @property {string|null} error_type
 * @property {string} text
 * @property {Record<string, any>|null} payload
 */

/**
 * The message strings of the two structured failure shapes, in stream order.
 *
 * @param {any[]} raw
 * @returns {string[]}
 */
function structuredMessages(raw) {
  /** @type {string[]} */
  const messages = [];
  for (const event of raw) {
    if (!event || typeof event !== 'object') {
      continue;
    }
    if (event.type === 'error' && typeof event.message === 'string') {
      messages.push(event.message);
      continue;
    }
    if (event.type === 'turn.failed') {
      const error = event.error;
      if (
        error &&
        typeof error === 'object' &&
        typeof error.message === 'string'
      ) {
        messages.push(error.message);
      }
    }
  }
  return messages;
}

/**
 * Read one structured message into a status-bearing envelope, else null.
 *
 * @param {string} message
 * @returns {CodexEnvelope|null}
 */
function envelopeOf(message) {
  /** @type {any} */
  let parsed = null;
  try {
    parsed = JSON.parse(message);
  } catch {
    parsed = null;
  }
  if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
    const status = parsed.status;
    if (Number.isInteger(status)) {
      const inner =
        parsed.error && typeof parsed.error === 'object' ? parsed.error : null;
      return {
        status,
        error_type: typeof inner?.type === 'string' ? inner.type : null,
        text: typeof inner?.message === 'string' ? inner.message : message,
        payload: parsed
      };
    }
    return null;
  }
  const transport = TRANSPORT_STATUS_RE.exec(message);
  if (!transport) {
    return null;
  }
  return {
    status: Number(transport[1]),
    error_type: null,
    text: message,
    payload: null
  };
}

/**
 * Turn one carried reset value into an epoch, without inventing one.
 *
 * @param {unknown} value
 * @param {number|null} finished_at
 * @returns {number|null}
 */
function resetEpoch(value, finished_at) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    if (value > 1e12) {
      return value;
    }
    if (value > 1e9) {
      return value * 1000;
    }
    // A small number is a Retry-After style delay, meaningless without the
    // moment the stream ended.
    return typeof finished_at === 'number' && Number.isFinite(finished_at)
      ? finished_at + value * 1000
      : null;
  }
  if (typeof value === 'string' && value.length > 0) {
    const parsed = Date.parse(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
    const seconds = Number(value);
    return Number.isFinite(seconds) ? resetEpoch(seconds, finished_at) : null;
  }
  return null;
}

/**
 * The reset the payload itself carries, at the envelope root or inside `error`.
 *
 * @param {Record<string, any>|null} payload
 * @param {number|null} finished_at
 * @returns {number|null}
 */
function payloadResetAt(payload, finished_at) {
  if (!payload) {
    return null;
  }
  const sources = [payload];
  if (payload.error && typeof payload.error === 'object') {
    sources.push(payload.error);
  }
  for (const source of sources) {
    for (const field of RESET_FIELDS) {
      const epoch = resetEpoch(source[field], finished_at);
      if (epoch !== null) {
        return epoch;
      }
    }
  }
  return null;
}

/**
 * Map one envelope onto the shared classifier vocabulary, else null.
 *
 * @param {CodexEnvelope} envelope
 * @param {number|null} finished_at
 * @returns {ProviderOutage|null}
 */
function classifyEnvelope(envelope, finished_at) {
  const message = errorDetail(envelope.text);
  const resets_at = payloadResetAt(envelope.payload, finished_at);
  if (envelope.status >= 500 && envelope.status <= 599) {
    return {
      detail: `http_${envelope.status}`,
      message,
      scope: 'provider',
      resets_at
    };
  }
  const limited =
    envelope.status === 429 ||
    (typeof envelope.error_type === 'string' &&
      LIMIT_TYPE_RE.test(envelope.error_type));
  if (!limited) {
    return null;
  }
  const account_quota =
    ACCOUNT_QUOTA_RE.test(envelope.text) ||
    (typeof envelope.error_type === 'string' &&
      /usage[_\s-]?limit|quota/i.test(envelope.error_type));
  return account_quota
    ? { detail: 'usage_limit', message, scope: 'account', resets_at }
    : { detail: 'rate_limited_429', message, scope: 'provider', resets_at };
}

/**
 * Classify one closed codex stream. Returns the first structured line that maps
 * to a hold, or null — including when structured evidence exists but says
 * "auth" or "bad request".
 *
 * @param {{ raw: any[], stderr_tail?: string|null, finished_at?: number|null }} ctx
 * @returns {ProviderOutage|null}
 */
export function classifyProviderOutage(ctx) {
  const raw = Array.isArray(ctx.raw) ? ctx.raw : [];
  const finished_at =
    typeof ctx.finished_at === 'number' && Number.isFinite(ctx.finished_at)
      ? ctx.finished_at
      : null;
  for (const message of structuredMessages(raw)) {
    const envelope = envelopeOf(message);
    if (!envelope) {
      continue;
    }
    const outage = classifyEnvelope(envelope, finished_at);
    if (outage) {
      return outage;
    }
  }
  // stderr and exit codes describe THIS process, not the provider: a local
  // launch failure must stay a general failure.
  return null;
}
