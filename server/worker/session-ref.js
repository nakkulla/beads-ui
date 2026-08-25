/**
 * Reader for the `session_ref` bead metadata key (UI-4xzk §3).
 *
 * The key is owned by the dotfiles workflow contract: an interactive session
 * appends `<provider>:<session-id>@<host>` to it when it claims an issue, and
 * the LAST valid item is the current session. beads-ui is a CONSUMER — it never
 * writes the key, and every malformed piece is dropped rather than rejected, so
 * a partially broken value still shows the items it can explain.
 *
 * The module answers three questions: what does the value say, where is that
 * session's transcript on THIS machine, and what would resume it.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { debug } from '../logging.js';
import { findClaudeSessionFile } from './claude-effort-observer.js';
import {
  codexRolloutDateDirs,
  codexRolloutFilePath
} from './codex-effort-observer.js';

const log = debug('worker:session-ref');

/**
 * One item of the contract value, as written by the session that claimed the
 * bead. `index` is the position in the ORIGINAL value, preserved across dropped
 * items because the history order is a fact.
 *
 * @typedef {Object} SessionRefEntry
 * @property {number} index
 * @property {'claude'|'codex'} provider
 * @property {string} session_id
 * @property {string} host
 */

/**
 * One item projected for display, plus what this server could learn about it.
 *
 * @typedef {Object} SessionRefView
 * @property {number} index
 * @property {'claude'|'codex'} provider
 * @property {string} session_id
 * @property {string} host
 * @property {boolean} current - Last valid item of the value.
 * @property {'local'|'remote'|'missing'} locality
 * @property {number|null} last_event_at - Transcript mtime in epoch ms; only
 * when the file was found on this machine.
 * @property {string|null} resume_command - Shell-safe resume command, or null
 * when the session id cannot be a safe single argument.
 */

/**
 * Result of locating one session's transcript on this machine.
 *
 * @typedef {Object} SessionRefLocation
 * @property {'local'|'remote'|'missing'} locality
 * @property {string|null} file
 * @property {number|null} last_event_at
 */

/**
 * Item grammar of the contract value (dotfiles-sdqo §7).
 *
 * @type {RegExp}
 */
const ITEM_RE = /^(claude|codex):([^:@;\s]+)@(\S+)$/;

/**
 * Narrower id grammar for anything that leaves this process as a path segment
 * or a shell argument. The contract grammar admits path separators, `..`, and
 * shell metacharacters; this one does not.
 *
 * @type {RegExp}
 */
const SAFE_SESSION_ID_RE = /^[A-Za-z0-9._-]+$/;

/**
 * Whether a session id may be used as a path segment and as a shell argument.
 *
 * @param {unknown} session_id
 * @returns {boolean}
 */
export function isSafeSessionId(session_id) {
  return typeof session_id === 'string' && SAFE_SESSION_ID_RE.test(session_id);
}

/**
 * How many day directories back a NON-UUIDv7 codex session id is searched for.
 * A v7 id carries its own timestamp and never reaches this scan.
 *
 * @type {number}
 */
export const CODEX_SCAN_DAYS = 30;

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Parse the contract value into its valid items, preserving original indexes.
 *
 * @param {unknown} value
 * @returns {SessionRefEntry[]}
 */
export function parseSessionRef(value) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return [];
  }
  /** @type {SessionRefEntry[]} */
  const entries = [];
  // EXACTLY the contract separator `'; '`. Splitting on a bare `;` would be
  // beads-ui redefining the grammar it only consumes: a value written without
  // the space is malformed, and admitting it would promote its tail to a valid
  // item — which then becomes `current` and gains transcript authorization
  // (§4.3) on the strength of a separator the contract never wrote.
  const items = value.split('; ');
  for (let index = 0; index < items.length; index += 1) {
    const match = ITEM_RE.exec(items[index].trim());
    if (match === null) {
      continue;
    }
    entries.push({
      index,
      provider: /** @type {'claude'|'codex'} */ (match[1]),
      session_id: match[2],
      host: match[3]
    });
  }
  return entries;
}

/**
 * First DNS label of a host name, lower-cased. `os.hostname()` reports
 * `isy-macstudioui-MacStudio-2.local` where `hostname -s` (what a session
 * records) reports `isy-macstudioui-MacStudio-2`, so only the first label can
 * be compared.
 *
 * @param {string} host
 */
function firstLabel(host) {
  return host.split('.')[0].toLowerCase();
}

/**
 * Epoch ms a UUIDv7 encodes in its first 48 bits, or null for any other id
 * shape. Version nibble is the 15th character of the canonical form.
 *
 * @param {string} session_id
 * @returns {number|null}
 */
function uuidV7StartedAt(session_id) {
  if (session_id.length < 15 || session_id[14] !== '7') {
    return null;
  }
  const hex = session_id.slice(0, 8) + session_id.slice(9, 13);
  if (!/^[0-9a-fA-F]{12}$/.test(hex)) {
    return null;
  }
  const started_at = Number.parseInt(hex, 16);
  return Number.isFinite(started_at) ? started_at : null;
}

/**
 * Newest-first scan of the codex rollout day directories for a session id whose
 * own shape carries no timestamp.
 *
 * @param {string} session_id
 * @param {{ fs: Pick<typeof fs, 'readdirSync'>, home_dir: string, now: () => number }} input
 * @returns {string|null}
 */
function scanCodexRollout(session_id, input) {
  const sessions_root = path.join(input.home_dir, '.codex', 'sessions');
  const suffix = `-${session_id}.jsonl`;
  const base = input.now();
  for (let back = 0; back < CODEX_SCAN_DAYS; back += 1) {
    const dir = path.join(
      sessions_root,
      codexRolloutDateDirs(base - back * DAY_MS)[0]
    );
    /** @type {string[]} */
    let names;
    try {
      names = input.fs.readdirSync(dir);
    } catch {
      continue;
    }
    const match = names.find(
      (name) => name.startsWith('rollout-') && name.endsWith(suffix)
    );
    if (match !== undefined) {
      return path.join(dir, match);
    }
  }
  return null;
}

/**
 * Locate one item's transcript file on this machine.
 *
 * @param {SessionRefEntry} entry
 * @param {{ home_dir?: string, hostname?: string, fs?: Pick<typeof fs, 'readdirSync' | 'statSync'>, now?: () => number }} [options]
 * @returns {SessionRefLocation}
 */
export function resolveSessionFile(entry, options = {}) {
  /** @type {SessionRefLocation} */
  const absent = { locality: 'missing', file: null, last_event_at: null };
  if (!SAFE_SESSION_ID_RE.test(entry.session_id)) {
    return absent;
  }
  const hostname = options.hostname || os.hostname();
  if (firstLabel(entry.host) !== firstLabel(hostname)) {
    return { locality: 'remote', file: null, last_event_at: null };
  }
  const file_system = options.fs || fs;
  const home_dir = options.home_dir || os.homedir();
  /** @type {string|null} */
  let file;
  if (entry.provider === 'claude') {
    file = findClaudeSessionFile(entry.session_id, {
      home_dir,
      fs: file_system
    });
  } else {
    const started_at = uuidV7StartedAt(entry.session_id);
    const now = options.now || (() => Date.now());
    file =
      started_at === null
        ? scanCodexRollout(entry.session_id, {
            fs: file_system,
            home_dir,
            now
          })
        : codexRolloutFilePath({
            session_id: entry.session_id,
            started_at,
            fs: file_system,
            home_dir,
            now
          });
  }
  if (file === null) {
    return absent;
  }
  /** @type {number|null} */
  let last_event_at = null;
  try {
    const stat = file_system.statSync(file);
    last_event_at =
      typeof stat.mtimeMs === 'number' && Number.isFinite(stat.mtimeMs)
        ? stat.mtimeMs
        : null;
  } catch (err) {
    log('session transcript stat failed for %s: %o', entry.session_id, err);
  }
  return { locality: 'local', file, last_event_at };
}

/**
 * The command that reattaches a terminal to one session, or null when the id
 * cannot be a safe single argument.
 *
 * The contract grammar admits `$()`, backticks and spaces; those ids get no
 * command rather than a quoted-but-surprising one. A LEADING `-` passes the
 * narrow grammar but both CLIs would read it as an option, so it is refused
 * too. The narrow grammar excludes the single quote, so the quoting below
 * always closes.
 *
 * @param {SessionRefEntry} entry
 * @returns {string|null}
 */
export function sessionResumeCommand(entry) {
  if (
    !SAFE_SESSION_ID_RE.test(entry.session_id) ||
    entry.session_id.startsWith('-')
  ) {
    return null;
  }
  return entry.provider === 'claude'
    ? `claude --resume '${entry.session_id}'`
    : `codex resume '${entry.session_id}'`;
}

/**
 * Verdict of the fork qualification (UI-p206 §3): the session to fork, or the
 * reason this bead gets today's fresh dispatch instead.
 *
 * @typedef {{ ok: true, provider: 'claude'|'codex', session_id: string }
 *   | { ok: false, reason: 'no_session_ref'|'unsafe_session_id'|'provider_mismatch'|'not_local' }} SessionForkQualification
 */

/**
 * Whether the bead's CURRENT `session_ref` item may be forked to open the first
 * EXTERNAL conflict-resolution session (UI-p206 §3).
 *
 * Only the LAST valid item is a candidate: an earlier one is a session this
 * bead has already moved on from, so inheriting its context would be inheriting
 * a superseded understanding of the work.
 *
 * The four rejection reasons are judged IN THIS ORDER, and `unsafe_session_id`
 * comes before `not_local` on purpose: `resolveSessionFile` folds a narrow-
 * grammar failure into `locality: 'missing'`, so leaving it to that call would
 * merge two different facts — "the id is not usable as an argument" and "no
 * transcript is here" — into one reason. The unsafe check is also WIDER than
 * `isSafeSessionId` alone: that grammar admits a leading `-`, which both CLIs
 * would read as an option rather than a session id. `sessionResumeCommand`
 * refuses it for exactly the same reason, and this argv path has the same
 * exposure.
 *
 * The original session's liveness is deliberately NOT judged. A fork writes
 * nothing to the original transcript (§1.2), so there is nothing to be safe
 * from, and a transcript mtime cannot tell an idle open session from a closed
 * one anyway.
 *
 * @param {Record<string, unknown>|null|undefined} metadata
 * @param {string} runner_name - The runner this dispatch resolved to
 * (`resolved.exec.runner`); a different CLI cannot fork this session at all.
 * @param {{ home_dir?: string, hostname?: string, fs?: Pick<typeof fs, 'readdirSync' | 'statSync'>, now?: () => number }} [options]
 * @returns {SessionForkQualification}
 */
export function qualifySessionFork(metadata, runner_name, options = {}) {
  const entries = parseSessionRef(
    metadata && typeof metadata === 'object' ? metadata.session_ref : null
  );
  const current = entries[entries.length - 1];
  if (current === undefined) {
    return { ok: false, reason: 'no_session_ref' };
  }
  if (
    !isSafeSessionId(current.session_id) ||
    current.session_id.startsWith('-')
  ) {
    return { ok: false, reason: 'unsafe_session_id' };
  }
  if (current.provider !== runner_name) {
    return { ok: false, reason: 'provider_mismatch' };
  }
  // `local` already means BOTH the host label matched and the transcript file
  // was found, so no separate existence probe follows.
  if (resolveSessionFile(current, options).locality !== 'local') {
    return { ok: false, reason: 'not_local' };
  }
  return {
    ok: true,
    provider: current.provider,
    session_id: current.session_id
  };
}

/**
 * Project one bead's metadata bag onto the display items (§3.3).
 *
 * The transcript PATH is deliberately not carried: it is a fact about this
 * server's HOME, and no client needs it to open the drawer.
 *
 * @param {Record<string, unknown>|null|undefined} metadata
 * @param {{ home_dir?: string, hostname?: string, fs?: Pick<typeof fs, 'readdirSync' | 'statSync'>, now?: () => number }} [options]
 * @returns {SessionRefView[]}
 */
export function sessionRefViews(metadata, options = {}) {
  const entries = parseSessionRef(
    metadata && typeof metadata === 'object' ? metadata.session_ref : null
  );
  const last_index = entries.length - 1;
  return entries.map((entry, position) => {
    const located = resolveSessionFile(entry, options);
    return {
      index: entry.index,
      provider: entry.provider,
      session_id: entry.session_id,
      host: entry.host,
      current: position === last_index,
      locality: located.locality,
      last_event_at: located.last_event_at,
      resume_command: sessionResumeCommand(entry)
    };
  });
}

/**
 * Read a transcript snapshot up to its last COMPLETE record.
 *
 * Bytes after the final newline may be a record still being written, so they
 * are excluded from the snapshot and their offset becomes the tail reader's
 * start — which is what makes the half-written record arrive exactly once, as
 * an append, when its writer finishes it.
 *
 * @param {string} file
 * @param {{ fs?: Pick<typeof fs, 'readFileSync'> }} [options]
 * @returns {{ text: string, boundary: number }|null}
 */
export function readSessionSnapshot(file, options = {}) {
  const file_system = options.fs || fs;
  /** @type {Buffer} */
  let contents;
  try {
    contents = /** @type {Buffer} */ (file_system.readFileSync(file));
  } catch (err) {
    log('session transcript unreadable at %s: %o', file, err);
    return null;
  }
  const newline = contents.lastIndexOf(0x0a);
  const boundary = newline >= 0 ? newline + 1 : 0;
  return { text: contents.subarray(0, boundary).toString('utf8'), boundary };
}
