/**
 * Validation of the optional `codex_children` attempt field (UI-mn5u §6.2).
 *
 * The stored array is a UI-owned OBSERVATION, so its normalization is strict in
 * one direction only: a row that cannot be explained is dropped, and an attempt
 * that carries no field at all — every record written before this existed —
 * reads as the empty observation. Nothing here fills a missing value with a
 * default, a current setting or a clock reading; an unknown timestamp stays
 * null so the display can say "not observed" instead of inventing a fact.
 *
 * @import { CodexChildRow } from './accumulate.js'
 */
import { normalizeCodexChildUsage } from './rollout.js';

/**
 * @type {ReadonlySet<string>}
 */
const CHILD_STATUSES = Object.freeze(
  new Set(['running', 'done', 'failed', 'interrupted'])
);

/**
 * @param {unknown} value
 * @returns {string|null}
 */
function stringOrNull(value) {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

/**
 * @param {unknown} value
 * @returns {number|null}
 */
function epochOrNull(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
    ? value
    : null;
}

/**
 * Validate one stored row.
 *
 * @param {unknown} raw
 * @returns {CodexChildRow|null}
 */
export function normalizeCodexChildRow(raw) {
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    return null;
  }
  const row = /** @type {Record<string, unknown>} */ (raw);
  const thread_id = stringOrNull(row.thread_id);
  const parent_thread_id = stringOrNull(row.parent_thread_id);
  if (thread_id === null || parent_thread_id === null) {
    return null;
  }
  const status =
    typeof row.status === 'string' && CHILD_STATUSES.has(row.status)
      ? /** @type {CodexChildRow['status']} */ (row.status)
      : null;
  if (status === null) {
    return null;
  }
  return {
    thread_id,
    parent_thread_id,
    launch_id: stringOrNull(row.launch_id),
    agent_path: stringOrNull(row.agent_path),
    model: stringOrNull(row.model),
    effort: stringOrNull(row.effort),
    status,
    started_at: epochOrNull(row.started_at),
    completed_at: epochOrNull(row.completed_at),
    last_event_at: epochOrNull(row.last_event_at),
    usage: normalizeCodexChildUsage(row.usage)
  };
}

/**
 * Validate the whole field. One row per `thread_id`: a repeated id is the same
 * child observed twice, and the FIRST row wins so a merge that leads with the
 * fresher observation keeps it.
 *
 * @param {unknown} raw
 * @returns {CodexChildRow[]}
 */
export function normalizeCodexChildren(raw) {
  if (!Array.isArray(raw)) {
    return [];
  }
  /** @type {CodexChildRow[]} */
  const rows = [];
  /** @type {Set<string>} */
  const seen = new Set();
  for (const candidate of raw) {
    const row = normalizeCodexChildRow(candidate);
    if (row === null || seen.has(row.thread_id)) {
      continue;
    }
    seen.add(row.thread_id);
    rows.push(row);
  }
  return rows;
}
