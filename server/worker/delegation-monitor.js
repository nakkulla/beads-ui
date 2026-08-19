/**
 * Attempt-scoped Codex delegation monitor stream intake.
 *
 * The producer env only delivers a directory. Every operation re-derives that
 * directory from workspace + attempt identity and validates private filesystem
 * ownership before reading untrusted append-only JSONL bytes.
 */
import fs from 'node:fs';
import path from 'node:path';
import { debug } from '../logging.js';
import { delegationMonitorDir } from './state-paths.js';

const log = debug('worker:delegation-monitor');
const MONITOR_SCHEMA = 'codex-delegation-monitor-v1';
const DIRECTORY_MODE = 0o700;
const FILE_MODE = 0o600;
const TOP_LEVEL_KEYS = new Set([
  'schema',
  'attempt_id',
  'launch_id',
  'provider',
  'role',
  'model',
  'thread_id',
  'turn_id',
  'recorded_at',
  'event'
]);
const SESSION_EVENT_KEYS = new Set(['type']);
const TERMINAL_EVENT_KEYS = new Set(['type', 'status']);
const FAILED_EVENT_KEYS = new Set(['type', 'status', 'error_code']);
const ITEM_EVENT_KEYS = new Set(['type', 'item']);
const STARTED_ACTIVITY_KEYS = new Set(['id', 'kind', 'activity']);
const COMPLETED_ACTIVITY_KEYS = new Set(['id', 'kind', 'activity', 'status']);
const TEXT_ITEM_KEYS = new Set(['id', 'kind', 'text']);
const ACTIVITIES = new Set([
  'command_execution',
  'file_change',
  'mcp_call',
  'web_search',
  'plan'
]);
const SESSION_STATUSES = new Set(['running', 'done', 'failed', 'interrupted']);

/**
 * @typedef {Object} ParsedMonitorLine
 * @property {'implementation'|'review-consult'} role
 * @property {string} model
 * @property {string} thread_id
 * @property {string|null} turn_id
 * @property {string} recorded_at
 * @property {Record<string, unknown>} event
 * @property {Record<string, unknown>} raw
 */

/**
 * One validated stream's incremental projection. `offset` is the byte position
 * just past the last COMPLETE line, and every entry in `events` carries the
 * byte offset its line starts at. A snapshot reader and a live tail therefore
 * share ONE ordering key: a subscriber that took its snapshot at `offset` can
 * drop every append below it without guessing from timestamps, which collide
 * at millisecond resolution.
 *
 * @typedef {Object} DelegationStreamProjection
 * @property {string} launch_id
 * @property {number} offset
 * @property {{ offset: number, event: Record<string, unknown> }[]} events
 */

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @param {Record<string, unknown>} value
 * @param {Set<string>} expected
 */
function hasExactKeys(value, expected) {
  const keys = Object.keys(value);
  return (
    keys.length === expected.size && keys.every((key) => expected.has(key))
  );
}

/**
 * @param {unknown} value
 * @returns {value is string}
 */
function nonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * @param {unknown} value
 * @returns {value is string}
 */
function isUtcMillisecond(value) {
  if (
    typeof value !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)
  ) {
    return false;
  }
  return (
    !Number.isNaN(Date.parse(value)) && new Date(value).toISOString() === value
  );
}

/**
 * @param {unknown} value
 * @returns {value is number}
 */
function isEpochMillisecond(value) {
  return (
    typeof value === 'number' &&
    Number.isFinite(value) &&
    Number.isInteger(value) &&
    value >= 0
  );
}

/**
 * @param {unknown} value
 * @returns {value is 'implementation'|'review-consult'}
 */
function isRole(value) {
  return value === 'implementation' || value === 'review-consult';
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isEvent(value) {
  if (!isRecord(value) || !nonEmptyString(value.type)) {
    return false;
  }
  if (value.type === 'session.started' || value.type === 'turn.started') {
    return hasExactKeys(value, SESSION_EVENT_KEYS);
  }
  if (value.type === 'turn.completed') {
    return (
      hasExactKeys(value, TERMINAL_EVENT_KEYS) && value.status === 'completed'
    );
  }
  if (value.type === 'turn.failed') {
    if (!hasExactKeys(value, FAILED_EVENT_KEYS)) {
      return false;
    }
    return (
      (value.status === 'failed' && value.error_code === 'turn_failed') ||
      (value.status === 'interrupted' && value.error_code === 'interrupted')
    );
  }
  if (value.type !== 'item.started' && value.type !== 'item.completed') {
    return false;
  }
  if (!hasExactKeys(value, ITEM_EVENT_KEYS) || !isRecord(value.item)) {
    return false;
  }
  const item = value.item;
  if (value.type === 'item.started') {
    return (
      hasExactKeys(item, STARTED_ACTIVITY_KEYS) &&
      nonEmptyString(item.id) &&
      item.kind === 'activity' &&
      ACTIVITIES.has(String(item.activity))
    );
  }
  if (item.kind === 'activity') {
    return (
      hasExactKeys(item, COMPLETED_ACTIVITY_KEYS) &&
      nonEmptyString(item.id) &&
      ACTIVITIES.has(String(item.activity)) &&
      (item.status === 'completed' || item.status === 'failed')
    );
  }
  if (item.kind === 'agent_message' || item.kind === 'reasoning') {
    return (
      hasExactKeys(item, TEXT_ITEM_KEYS) &&
      nonEmptyString(item.id) &&
      typeof item.text === 'string'
    );
  }
  return false;
}

/**
 * @param {unknown} raw
 * @returns {ParsedMonitorLine|null}
 */
function parseMonitorLine(raw) {
  if (!isRecord(raw) || !hasExactKeys(raw, TOP_LEVEL_KEYS)) {
    return null;
  }
  if (
    raw.schema !== MONITOR_SCHEMA ||
    !nonEmptyString(raw.attempt_id) ||
    !nonEmptyString(raw.launch_id) ||
    raw.provider !== 'codex' ||
    !isRole(raw.role) ||
    !nonEmptyString(raw.model) ||
    !nonEmptyString(raw.thread_id) ||
    (raw.turn_id !== null && !nonEmptyString(raw.turn_id)) ||
    !isUtcMillisecond(raw.recorded_at) ||
    !isEvent(raw.event)
  ) {
    return null;
  }
  return {
    role: raw.role,
    model: raw.model,
    thread_id: raw.thread_id,
    turn_id: /** @type {string|null} */ (raw.turn_id),
    recorded_at: raw.recorded_at,
    event: raw.event,
    raw
  };
}

/**
 * @param {unknown} raw
 * @param {string} attempt_id
 * @param {string} launch_id
 * @param {ParsedMonitorLine|null} identity
 * @param {string|null} turn_id
 */
function hasRawIdentityConflict(raw, attempt_id, launch_id, identity, turn_id) {
  if (!isRecord(raw) || !hasExactKeys(raw, TOP_LEVEL_KEYS)) {
    return false;
  }
  if (
    raw.attempt_id !== attempt_id ||
    raw.launch_id !== launch_id ||
    raw.provider !== 'codex'
  ) {
    return true;
  }
  if (!identity) {
    return false;
  }
  return (
    raw.schema !== MONITOR_SCHEMA ||
    raw.role !== identity.role ||
    raw.model !== identity.model ||
    raw.thread_id !== identity.thread_id ||
    (turn_id !== null && raw.turn_id !== turn_id)
  );
}

/**
 * @param {string} dir
 * @param {typeof import('node:fs')} file_system
 * @returns {{ ok: true }|{ ok: false, reason: string }}
 */
function validateDirectory(dir, file_system) {
  try {
    const stat = file_system.lstatSync(dir);
    const uid = typeof process.getuid === 'function' ? process.getuid() : null;
    if (!stat.isDirectory() || stat.isSymbolicLink()) {
      return { ok: false, reason: 'directory_type' };
    }
    if ((stat.mode & 0o777) !== DIRECTORY_MODE) {
      return { ok: false, reason: 'directory_mode' };
    }
    if (uid !== null && stat.uid !== uid) {
      return { ok: false, reason: 'directory_owner' };
    }
    return { ok: true };
  } catch {
    return { ok: false, reason: 'directory_unreadable' };
  }
}

/**
 * @param {string} file
 * @param {typeof import('node:fs')} file_system
 * @returns {{ ok: boolean, size: number }}
 */
function validateFile(file, file_system) {
  try {
    const stat = file_system.lstatSync(file);
    const uid = typeof process.getuid === 'function' ? process.getuid() : null;
    const ok =
      stat.isFile() &&
      !stat.isSymbolicLink() &&
      (stat.mode & 0o777) === FILE_MODE &&
      (uid === null || stat.uid === uid);
    return { ok, size: typeof stat.size === 'number' ? stat.size : 0 };
  } catch {
    return { ok: false, size: 0 };
  }
}

/**
 * @param {unknown} value
 * @returns {value is import('./queue-store.js').DelegationSession}
 */
export function isDelegationSession(value) {
  if (!isRecord(value)) {
    return false;
  }
  if (
    !hasExactKeys(
      value,
      new Set([
        'launch_id',
        'provider',
        'role',
        'model',
        'session_id',
        'turn_id',
        'status',
        'started_at',
        'completed_at',
        'last_event_at'
      ])
    ) ||
    !nonEmptyString(value.launch_id) ||
    value.provider !== 'codex' ||
    !isRole(value.role) ||
    !nonEmptyString(value.model) ||
    !nonEmptyString(value.session_id) ||
    (value.turn_id !== null && !nonEmptyString(value.turn_id)) ||
    !SESSION_STATUSES.has(String(value.status)) ||
    !isEpochMillisecond(value.started_at) ||
    !isEpochMillisecond(value.last_event_at) ||
    value.last_event_at < value.started_at ||
    (value.completed_at !== null && !isUtcMillisecond(value.completed_at))
  ) {
    return false;
  }
  if (value.status === 'running' && value.completed_at !== null) {
    return false;
  }
  if (
    (value.status === 'done' || value.status === 'failed') &&
    value.completed_at === null
  ) {
    return false;
  }
  return true;
}

/**
 * @param {unknown} raw
 * @returns {import('./queue-store.js').DelegationSession[]}
 */
export function normalizeDelegationSessions(raw) {
  if (!Array.isArray(raw)) {
    return [];
  }
  /** @type {import('./queue-store.js').DelegationSession[]} */
  const out = [];
  /** @type {Set<string>} */
  const ids = new Set();
  for (const value of raw) {
    if (!isDelegationSession(value) || ids.has(value.launch_id)) {
      continue;
    }
    ids.add(value.launch_id);
    out.push({
      launch_id: value.launch_id,
      provider: 'codex',
      role: value.role,
      model: value.model,
      session_id: value.session_id,
      turn_id: value.turn_id,
      status: value.status,
      started_at: value.started_at,
      completed_at: value.completed_at,
      last_event_at: value.last_event_at
    });
  }
  return out;
}

/**
 * @param {unknown} raw
 * @param {boolean} outer_terminal
 * @returns {import('./queue-store.js').DelegationSession[]}
 */
export function finalizeDelegationSessions(raw, outer_terminal) {
  return normalizeDelegationSessions(raw).map((session) =>
    outer_terminal && session.status === 'running'
      ? { ...session, status: 'interrupted' }
      : session
  );
}

/**
 * @param {string} workspace
 * @param {string} attempt_id
 * @param {{ fs?: typeof import('node:fs') }} [options]
 * @returns {{ ok: boolean, dir?: string, reason?: string }}
 */
export function ensureDelegationMonitorDir(
  workspace,
  attempt_id,
  options = {}
) {
  const file_system = options.fs || fs;
  const dir = delegationMonitorDir(workspace, attempt_id);
  try {
    file_system.lstatSync(dir);
    const checked = validateDirectory(dir, file_system);
    return checked.ok ? { ok: true, dir } : checked;
  } catch (err) {
    if (err && /** @type {NodeJS.ErrnoException} */ (err).code !== 'ENOENT') {
      log(
        'monitor directory rejected for attempt %s: directory_unreadable',
        attempt_id
      );
      return { ok: false, reason: 'directory_unreadable' };
    }
  }
  try {
    file_system.mkdirSync(path.dirname(dir), { recursive: true });
    file_system.mkdirSync(dir, { mode: DIRECTORY_MODE });
  } catch (err) {
    if (err && /** @type {NodeJS.ErrnoException} */ (err).code === 'EEXIST') {
      const checked = validateDirectory(dir, file_system);
      return checked.ok ? { ok: true, dir } : checked;
    }
    log('monitor directory rejected for attempt %s: mkdir_failed', attempt_id);
    return { ok: false, reason: 'mkdir_failed' };
  }
  const checked = validateDirectory(dir, file_system);
  return checked.ok ? { ok: true, dir } : checked;
}

/**
 * @param {import('./queue-store.js').DelegationSession} left
 * @param {import('./queue-store.js').DelegationSession} right
 */
function hasIdentityConflict(left, right) {
  return (
    left.launch_id !== right.launch_id ||
    left.provider !== right.provider ||
    left.role !== right.role ||
    left.model !== right.model ||
    left.session_id !== right.session_id ||
    (left.turn_id !== null &&
      right.turn_id !== null &&
      left.turn_id !== right.turn_id)
  );
}

/**
 * @param {Buffer} bytes
 * @param {string} attempt_id
 * @param {string} launch_id
 * @param {number} from_offset
 * @returns {{ session: import('./queue-store.js').DelegationSession|null, stream: DelegationStreamProjection|null, warnings: string[], conflict: boolean }}
 */
function parseStream(bytes, attempt_id, launch_id, from_offset) {
  const boundary = bytes.lastIndexOf(0x0a) + 1;
  const warnings = [];
  /** @type {ParsedMonitorLine[]} */
  const accepted = [];
  /** @type {{ line: ParsedMonitorLine, start: number }[]} */
  const positioned = [];
  /** @type {ParsedMonitorLine|null} */
  let identity = null;
  /** @type {string|null} */
  let turn_id = null;
  let line_start = 0;
  // The producer contract binds the FIRST complete line, not the first line
  // that happens to parse: skipping a malformed opener and adopting a later
  // `session.started` would accept a stream whose head was rewritten.
  let first_complete_seen = false;
  while (line_start < boundary) {
    const newline = bytes.indexOf(0x0a, line_start);
    const line_bytes = bytes.subarray(line_start, newline);
    const text = line_bytes.toString('utf8').trim();
    const current_start = line_start;
    line_start = newline + 1;
    if (text.length === 0) {
      warnings.push('line_schema');
      continue;
    }
    const is_first_complete = !first_complete_seen;
    first_complete_seen = true;
    /** @type {unknown} */
    let raw;
    try {
      raw = JSON.parse(text);
    } catch {
      if (is_first_complete) {
        return { session: null, stream: null, warnings, conflict: true };
      }
      warnings.push('line_schema');
      continue;
    }
    if (hasRawIdentityConflict(raw, attempt_id, launch_id, identity, turn_id)) {
      return { session: null, stream: null, warnings, conflict: true };
    }
    const line = parseMonitorLine(raw);
    if (!line) {
      if (is_first_complete) {
        return { session: null, stream: null, warnings, conflict: true };
      }
      warnings.push('line_schema');
      continue;
    }
    if (
      line.raw.attempt_id !== attempt_id ||
      line.raw.launch_id !== launch_id ||
      (is_first_complete && line.event.type !== 'session.started')
    ) {
      return { session: null, stream: null, warnings, conflict: true };
    }
    if (
      identity &&
      (line.role !== identity.role ||
        line.model !== identity.model ||
        line.thread_id !== identity.thread_id)
    ) {
      return { session: null, stream: null, warnings, conflict: true };
    }
    if (line.event.type !== 'session.started' && line.turn_id === null) {
      warnings.push('line_schema');
      continue;
    }
    if (line.turn_id !== null) {
      if (turn_id !== null && turn_id !== line.turn_id) {
        return { session: null, stream: null, warnings, conflict: true };
      }
      turn_id = line.turn_id;
    }
    identity = identity || line;
    accepted.push(line);
    positioned.push({ line, start: current_start });
  }
  if (!identity || accepted.length === 0) {
    return { session: null, stream: null, warnings, conflict: false };
  }
  let status = /** @type {'running'|'done'|'failed'|'interrupted'} */ (
    'running'
  );
  /** @type {string|null} */
  let completed_at = null;
  for (const line of accepted) {
    if (line.event.type === 'turn.completed') {
      status = 'done';
      completed_at = line.recorded_at;
    } else if (line.event.type === 'turn.failed') {
      status = line.event.status === 'failed' ? 'failed' : 'interrupted';
      completed_at = line.recorded_at;
    }
  }
  const last = accepted[accepted.length - 1];
  const session = {
    launch_id,
    provider: /** @type {'codex'} */ ('codex'),
    role: identity.role,
    model: identity.model,
    session_id: identity.thread_id,
    turn_id,
    status,
    started_at: Date.parse(identity.recorded_at),
    completed_at,
    last_event_at: Date.parse(last.recorded_at)
  };
  return {
    session,
    stream: {
      launch_id,
      offset: boundary,
      events: positioned
        .filter((entry) => entry.start >= from_offset)
        .map((entry) => ({ offset: entry.start, event: entry.line.raw }))
    },
    warnings,
    conflict: false
  };
}

/**
 * @param {string} workspace
 * @param {string} attempt_id
 * @param {{ fs?: typeof import('node:fs'), known_sessions?: unknown, from_offsets?: unknown }} [options]
 * @returns {{ sessions: import('./queue-store.js').DelegationSession[], streams: DelegationStreamProjection[], warnings: string[] }}
 */
export function readAttemptDelegationStreams(
  workspace,
  attempt_id,
  options = {}
) {
  const file_system = options.fs || fs;
  const dir = delegationMonitorDir(workspace, attempt_id);
  const directory = validateDirectory(dir, file_system);
  if (!directory.ok) {
    if (directory.reason !== 'directory_unreadable') {
      log(
        'delegation monitor ignored for attempt %s: %s',
        attempt_id,
        directory.reason
      );
    }
    return { sessions: [], streams: [], warnings: [directory.reason] };
  }
  /** @type {string[]} */
  let names;
  try {
    names = file_system.readdirSync(dir);
  } catch {
    return { sessions: [], streams: [], warnings: ['directory_unreadable'] };
  }
  const known = normalizeDelegationSessions(options.known_sessions);
  /** @type {Map<string, import('./queue-store.js').DelegationSession>} */
  const known_by_id = new Map(
    known.map((session) => [session.launch_id, session])
  );
  const offsets = isRecord(options.from_offsets) ? options.from_offsets : {};
  /** @type {import('./queue-store.js').DelegationSession[]} */
  const sessions = [];
  /** @type {DelegationStreamProjection[]} */
  const streams = [];
  /** @type {string[]} */
  const warnings = [];
  for (const name of names.sort()) {
    if (!name.endsWith('.jsonl') || name.length <= '.jsonl'.length) {
      warnings.push('filename');
      continue;
    }
    const launch_id = name.slice(0, -'.jsonl'.length);
    const file = path.join(dir, name);
    const checked_file = validateFile(file, file_system);
    if (!checked_file.ok) {
      warnings.push('file_security');
      continue;
    }
    const raw_offset = offsets[launch_id];
    const from_offset =
      typeof raw_offset === 'number' &&
      Number.isInteger(raw_offset) &&
      raw_offset >= 0
        ? raw_offset
        : 0;
    // An incremental caller that already consumed the file up to its current
    // size has nothing to learn from re-parsing it. Skipping the read keeps an
    // idle tail at one stat per tick instead of one full parse.
    if (from_offset > 0 && checked_file.size === from_offset) {
      continue;
    }
    /** @type {Buffer} */
    let bytes;
    try {
      bytes = file_system.readFileSync(file);
    } catch {
      warnings.push('file_unreadable');
      continue;
    }
    const parsed = parseStream(bytes, attempt_id, launch_id, from_offset);
    warnings.push(...parsed.warnings);
    if (parsed.conflict) {
      warnings.push('identity_conflict');
      continue;
    }
    if (!parsed.session || !parsed.stream) {
      continue;
    }
    const prior = known_by_id.get(launch_id);
    if (prior && hasIdentityConflict(prior, parsed.session)) {
      warnings.push('identity_conflict');
      continue;
    }
    sessions.push(parsed.session);
    streams.push(parsed.stream);
  }
  const unique_warnings = [...new Set(warnings)];
  for (const warning of unique_warnings) {
    log('delegation monitor ignored for attempt %s: %s', attempt_id, warning);
  }
  return {
    sessions: normalizeDelegationSessions(sessions),
    streams,
    warnings: unique_warnings
  };
}

/**
 * @param {string} workspace
 * @param {string} attempt_id
 * @param {{ fs?: typeof import('node:fs') }} [options]
 */
export function removeEmptyDelegationMonitorDir(
  workspace,
  attempt_id,
  options = {}
) {
  const file_system = options.fs || fs;
  const dir = delegationMonitorDir(workspace, attempt_id);
  const checked = validateDirectory(dir, file_system);
  if (!checked.ok) {
    return;
  }
  try {
    file_system.rmdirSync(dir);
  } catch (err) {
    if (
      err &&
      /** @type {NodeJS.ErrnoException} */ (err).code === 'ENOTEMPTY'
    ) {
      return;
    }
    log(
      'monitor directory rollback failed for attempt %s: rmdir_failed',
      attempt_id
    );
  }
}
