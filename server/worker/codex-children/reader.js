/**
 * Bounded rollout reader for Codex native subagents (UI-mn5u §6.1, §6.3).
 *
 * The root's own rollout names no child thread — the measured grammar
 * (`docs/superpowers/specs/assets/codex-native-child-fixture-notes.md` §2) gives
 * the root only an `agent_path` and a nickname — so a child file can only be
 * FOUND, never computed. The scan is therefore deliberately narrow: the one
 * directory the attempt's own root rollout sits in, only files written after
 * the attempt began, and only those whose `session_meta.parent_thread_id` chain
 * reaches this attempt's root. A global sweep of `~/.codex/sessions` would
 * collect unrelated user transcripts, which §6.1 forbids.
 *
 * @import { CodexChildRow } from './accumulate.js'
 */
import node_fs from 'node:fs';
import node_os from 'node:os';
import path from 'node:path';
import { debug } from '../../logging.js';
import { codexRolloutFilePath } from '../codex-effort-observer.js';
import { uuidV7StartedAt } from '../session-ref.js';
import { codexAccountHomeDir } from '../state-paths.js';
import { accumulateCodexChildren } from './accumulate.js';
import { parseRolloutText, rolloutThreadIdentity } from './rollout.js';

const log = debug('worker:codex-children');

/**
 * Upper bound on candidate files parsed in one scan. A day directory holds one
 * file per thread, and an attempt that spawned more children than this has
 * already told the reader that something other than a subagent tree is going
 * on, so the scan stops rather than reading an unbounded directory.
 *
 * @type {number}
 */
export const MAX_CHILD_FILES = 64;

/**
 * The sessions directory the attempt actually wrote to. An attempt launched
 * with a per-account `CODEX_HOME` mirror writes under that mirror; only an
 * attempt with no account falls back to the default home.
 *
 * @param {{ codex_account?: string|null }} attempt
 * @param {{ home_dir?: string }} [options]
 * @returns {string}
 */
export function codexSessionsRootFor(attempt, options = {}) {
  const key = attempt?.codex_account;
  if (typeof key === 'string' && key.length > 0) {
    return path.join(codexAccountHomeDir(key), 'sessions');
  }
  return path.join(options.home_dir || node_os.homedir(), '.codex', 'sessions');
}

/**
 * @param {unknown} value
 * @returns {number|null}
 */
function finiteOrNull(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

/**
 * Read the root rollout and every rollout file in its directory whose parent
 * chain reaches the root, as records tagged with the thread that wrote them.
 *
 * Fail-quiet throughout: an unreadable directory, a missing root file or a
 * torn line yields fewer records, never a throw — a display observation must
 * not be able to interrupt a session's settlement.
 *
 * @param {{
 *   root_thread_id: string,
 *   sessions_root: string,
 *   started_at?: number|null,
 *   fs?: Pick<typeof node_fs, 'readdirSync'|'readFileSync'|'statSync'>,
 *   now?: () => number
 * }} input
 * @returns {{ root_file: string|null, files: string[], records: Array<{ thread_id: string, ordinal: number, record: Record<string, unknown> }> }}
 */
export function readCodexChildRecords(input) {
  const file_system = input.fs || node_fs;
  /** @type {Array<{ thread_id: string, ordinal: number, record: Record<string, unknown> }>} */
  const records = [];
  if (
    typeof input.root_thread_id !== 'string' ||
    input.root_thread_id.length === 0
  ) {
    return { root_file: null, files: [], records };
  }
  const started_at =
    finiteOrNull(input.started_at) ?? uuidV7StartedAt(input.root_thread_id);
  /** @type {string|null} */
  let root_file = null;
  try {
    root_file = codexRolloutFilePath({
      session_id: input.root_thread_id,
      started_at,
      fs: file_system,
      home_dir: '',
      sessions_root: input.sessions_root,
      now: input.now
    });
  } catch (err) {
    log('root rollout lookup failed for %s: %o', input.root_thread_id, err);
    return { root_file: null, files: [], records };
  }
  if (root_file === null) {
    return { root_file: null, files: [], records };
  }

  /**
   * @param {string} file
   * @returns {Array<{ ordinal: number, record: Record<string, unknown> }>}
   */
  function recordsOf(file) {
    try {
      return parseRolloutText(file_system.readFileSync(file, 'utf8'));
    } catch (err) {
      log('rollout read failed for %s: %o', file, err);
      return [];
    }
  }

  for (const entry of recordsOf(root_file)) {
    records.push({
      thread_id: input.root_thread_id,
      ordinal: entry.ordinal,
      record: entry.record
    });
  }

  const dir = path.dirname(root_file);
  /** @type {string[]} */
  let names = [];
  try {
    names = file_system.readdirSync(dir);
  } catch (err) {
    log('rollout directory unreadable (%s): %o', dir, err);
    return { root_file, files: [root_file], records };
  }
  const floor = started_at;
  /** @type {Array<{ file: string, mtime: number }>} */
  const candidates = [];
  for (const name of names) {
    if (!name.startsWith('rollout-') || !name.endsWith('.jsonl')) {
      continue;
    }
    const file = path.join(dir, name);
    if (file === root_file) {
      continue;
    }
    /** @type {number} */
    let mtime;
    try {
      mtime = file_system.statSync(file).mtimeMs;
    } catch {
      continue;
    }
    // Written before this attempt began ⇒ another root turn's transcript.
    if (floor !== null && Number.isFinite(mtime) && mtime < floor) {
      continue;
    }
    candidates.push({ file, mtime: Number.isFinite(mtime) ? mtime : 0 });
  }
  candidates.sort((left, right) => left.mtime - right.mtime);

  /** @type {Map<string, { parent_thread_id: string|null, entries: Array<{ ordinal: number, record: Record<string, unknown> }> }>} */
  const by_thread = new Map();
  for (const candidate of candidates.slice(0, MAX_CHILD_FILES)) {
    const entries = recordsOf(candidate.file);
    /** @type {ReturnType<typeof rolloutThreadIdentity>} */
    let identity = null;
    for (const entry of entries) {
      identity = rolloutThreadIdentity(entry.record);
      if (identity !== null) {
        break;
      }
    }
    if (identity === null || !identity.subagent) {
      continue;
    }
    by_thread.set(identity.thread_id, {
      parent_thread_id: identity.parent_thread_id,
      entries
    });
  }

  /**
   * @param {string} thread_id
   * @returns {boolean}
   */
  function reachesRoot(thread_id) {
    /** @type {Set<string>} */
    const seen = new Set();
    let cursor = thread_id;
    for (let hop = 0; hop < MAX_CHILD_FILES; hop += 1) {
      if (seen.has(cursor)) {
        return false;
      }
      seen.add(cursor);
      const held = by_thread.get(cursor);
      const parent = held ? held.parent_thread_id : null;
      if (parent === null) {
        return false;
      }
      if (parent === input.root_thread_id) {
        return true;
      }
      cursor = parent;
    }
    return false;
  }

  /** @type {string[]} */
  const files = [root_file];
  for (const [thread_id, held] of by_thread) {
    if (!reachesRoot(thread_id)) {
      continue;
    }
    for (const entry of held.entries) {
      records.push({ thread_id, ordinal: entry.ordinal, record: entry.record });
    }
  }
  for (const candidate of candidates.slice(0, MAX_CHILD_FILES)) {
    files.push(candidate.file);
  }
  return { root_file, files, records };
}

/**
 * One attempt's normalized native-child observation, from its rollout files.
 *
 * The SAME call serves the live monitor, a post-restart re-read and the
 * terminal settlement (§6.3), so the three can never disagree. An attempt that
 * is not a codex attempt, has no recorded thread id, or has no readable
 * rollout observes nothing — which reads as the empty observation, never as
 * zero usage.
 *
 * @param {{
 *   attempt: { runner?: string|null, session_id?: string|null, started_at?: number|null, finished_at?: number|null, codex_account?: string|null },
 *   parent_terminated?: boolean,
 *   home_dir?: string,
 *   sessions_root?: string,
 *   fs?: Pick<typeof node_fs, 'readdirSync'|'readFileSync'|'statSync'>,
 *   now?: () => number
 * }} input
 * @returns {CodexChildRow[]}
 */
export function observeCodexChildren(input) {
  const attempt = input.attempt;
  if (!attempt || attempt.runner !== 'codex') {
    return [];
  }
  const root_thread_id =
    typeof attempt.session_id === 'string' && attempt.session_id.length > 0
      ? attempt.session_id
      : null;
  if (root_thread_id === null) {
    return [];
  }
  const sessions_root =
    typeof input.sessions_root === 'string' && input.sessions_root.length > 0
      ? input.sessions_root
      : codexSessionsRootFor(attempt, { home_dir: input.home_dir });
  try {
    const { records } = readCodexChildRecords({
      root_thread_id,
      sessions_root,
      started_at: finiteOrNull(attempt.started_at),
      fs: input.fs,
      now: input.now
    });
    if (records.length === 0) {
      return [];
    }
    return accumulateCodexChildren({
      root_thread_id,
      records,
      attempt_started_at: finiteOrNull(attempt.started_at),
      attempt_ended_at: finiteOrNull(attempt.finished_at),
      parent_terminated: input.parent_terminated === true
    });
  } catch (err) {
    log('native child observation failed for %s: %o', root_thread_id, err);
    return [];
  }
}
