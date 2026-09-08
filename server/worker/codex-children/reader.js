/**
 * Bounded rollout reader for Codex native subagents (UI-mn5u §6.1, §6.3).
 *
 * The root's own rollout names no child thread — the measured grammar
 * (`docs/superpowers/specs/assets/codex-native-child-fixture-notes.md` §2) gives
 * the root only an `agent_path` and a nickname — so a child file can only be
 * FOUND, never computed. The scan is therefore deliberately narrow: the date
 * directories this attempt was actually active in, only files written after the
 * attempt began, and only those whose `session_meta.parent_thread_id` chain
 * reaches this attempt's root. A global sweep of `~/.codex/sessions` would
 * collect unrelated user transcripts, which §6.1 forbids — and the link test
 * reads only each candidate's FIRST lines, so an unrelated transcript is
 * neither fully parsed nor allowed to spend the child budget.
 *
 * @import { CodexChildRow } from './accumulate.js'
 */
import node_fs from 'node:fs';
import path from 'node:path';
import { debug } from '../../logging.js';
import {
  codexRolloutDateDirs,
  codexRolloutFilePath
} from '../codex-effort-observer.js';
import { uuidV7StartedAt } from '../session-ref.js';
import { codexSessionsRoot } from '../state-paths.js';
import { accumulateCodexChildren } from './accumulate.js';
import { parseRolloutText, rolloutHeadIdentity } from './rollout.js';

const log = debug('worker:codex-children');

/**
 * Upper bound on LINKED transcripts parsed in one scan. A day directory holds
 * one file per thread, and an attempt that spawned more children than this has
 * already told the reader that something other than a subagent tree is going
 * on, so the scan stops rather than reading an unbounded directory. Unrelated
 * files never count against it — that is the whole point of the head-only link
 * test.
 *
 * @type {number}
 */
export const MAX_CHILD_FILES = 64;

/**
 * Upper bound on candidate files whose HEAD is read for the link test. It
 * bounds a directory that holds a whole day of unrelated user sessions.
 *
 * @type {number}
 */
export const MAX_CHILD_CANDIDATES = 512;

/**
 * Upper bound on date directories one attempt's activity window may span. A
 * session that ran longer than this is not a subagent tree the display needs.
 *
 * @type {number}
 */
const MAX_WINDOW_DAYS = 14;

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * The sessions directory the attempt actually wrote to. Delegates to the ONE
 * derivation every codex reader shares (§6.1), so an account attempt is never
 * probed in the default home.
 *
 * @param {{ codex_account?: string|null }} attempt
 * @param {{ home_dir?: string, env?: Record<string, string|undefined> }} [options]
 * @returns {string}
 */
export function codexSessionsRootFor(attempt, options = {}) {
  return codexSessionsRoot({
    codex_account: attempt?.codex_account ?? null,
    ...(options.home_dir ? { home_dir: options.home_dir } : {}),
    ...(options.env ? { env: options.env } : {})
  });
}

/**
 * @param {unknown} value
 * @returns {number|null}
 */
function finiteOrNull(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

/**
 * Every date directory the attempt's activity window touches, nearest date
 * first, deduplicated. A child spawned after midnight lands in the NEXT day's
 * directory, which a single start-date probe never opens.
 *
 * @param {number|null} from - Epoch ms the window opens at.
 * @param {number} to - Epoch ms the window closes at.
 * @returns {string[]}
 */
function windowDateDirs(from, to) {
  /** @type {string[]} */
  const dirs = [];
  /** @type {Set<string>} */
  const seen = new Set();
  const start = from === null ? to : Math.min(from, to);
  const days = Math.min(
    MAX_WINDOW_DAYS,
    Math.max(0, Math.floor((to - start) / DAY_MS)) + 1
  );
  for (let day = 0; day < days; day += 1) {
    for (const dir of codexRolloutDateDirs(start + day * DAY_MS)) {
      if (!seen.has(dir)) {
        seen.add(dir);
        dirs.push(dir);
      }
    }
  }
  return dirs;
}

/**
 * Read the root rollout and every rollout file in the attempt's activity window
 * whose parent chain reaches the root, as records tagged with the thread that
 * wrote them.
 *
 * Fail-quiet throughout: an unreadable directory, a missing root file or a
 * torn line yields fewer records, never a throw — a display observation must
 * not be able to interrupt a session's settlement.
 *
 * @param {{
 *   root_thread_id: string,
 *   sessions_root: string,
 *   started_at?: number|null,
 *   ended_at?: number|null,
 *   fs?: Pick<typeof node_fs, 'readdirSync'|'readFileSync'|'statSync'>,
 *   now?: () => number
 * }} input
 * @returns {{ root_file: string|null, files: string[], records: Array<{ thread_id: string, ordinal: number, record: Record<string, unknown> }> }}
 */
export function readCodexChildRecords(input) {
  const file_system = input.fs || node_fs;
  const now = input.now || (() => Date.now());
  /** @type {Array<{ thread_id: string, ordinal: number, record: Record<string, unknown> }>} */
  const records = [];
  if (
    typeof input.root_thread_id !== 'string' ||
    input.root_thread_id.length === 0
  ) {
    return { root_file: null, files: [], records };
  }
  const attempt_started_at = finiteOrNull(input.started_at);
  // The rollout DIRECTORY is named by the thread's own creation date, which the
  // v7 uuid states: an attempt that resumed that thread days later would look
  // for the file under the resume date and never find it (§6.1).
  const thread_started_at =
    uuidV7StartedAt(input.root_thread_id) ?? attempt_started_at;
  /** @type {string|null} */
  let root_file = null;
  try {
    root_file = codexRolloutFilePath({
      session_id: input.root_thread_id,
      started_at: thread_started_at,
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
   * @returns {string|null}
   */
  function textOf(file) {
    try {
      return file_system.readFileSync(file, 'utf8');
    } catch (err) {
      log('rollout read failed for %s: %o', file, err);
      return null;
    }
  }

  const root_text = textOf(root_file);
  for (const entry of parseRolloutText(root_text ?? '')) {
    records.push({
      thread_id: input.root_thread_id,
      ordinal: entry.ordinal,
      record: entry.record
    });
  }

  // Children are created THROUGH the attempt's activity, so the window is the
  // attempt's own — the root thread's directory alone misses a child spawned
  // after midnight.
  const window_start = attempt_started_at ?? thread_started_at;
  const window_end = finiteOrNull(input.ended_at) ?? now();
  /** @type {Set<string>} */
  const dirs = new Set([path.dirname(root_file)]);
  for (const date_dir of windowDateDirs(window_start, window_end)) {
    dirs.add(path.join(input.sessions_root, date_dir));
  }

  const floor = window_start;
  /** @type {Array<{ file: string, mtime: number }>} */
  const candidates = [];
  for (const dir of dirs) {
    /** @type {string[]} */
    let names = [];
    try {
      names = file_system.readdirSync(dir);
    } catch (err) {
      log('rollout directory unreadable (%s): %o', dir, err);
      continue;
    }
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
  }
  candidates.sort((left, right) => left.mtime - right.mtime);

  /** @type {Map<string, { parent_thread_id: string|null, file: string }>} */
  const by_thread = new Map();
  for (const candidate of candidates.slice(0, MAX_CHILD_CANDIDATES)) {
    const text = textOf(candidate.file);
    if (text === null) {
      continue;
    }
    // HEAD ONLY: the link lives in `session_meta`, so an unrelated transcript
    // costs a few lines and is never parsed further (§6.1).
    const identity = rolloutHeadIdentity(text);
    if (identity === null || !identity.subagent) {
      continue;
    }
    by_thread.set(identity.thread_id, {
      parent_thread_id: identity.parent_thread_id,
      file: candidate.file
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
  let linked = 0;
  for (const [thread_id, held] of by_thread) {
    if (!reachesRoot(thread_id) || linked >= MAX_CHILD_FILES) {
      continue;
    }
    linked += 1;
    files.push(held.file);
    const text = textOf(held.file);
    if (text === null) {
      continue;
    }
    for (const entry of parseRolloutText(text)) {
      records.push({ thread_id, ordinal: entry.ordinal, record: entry.record });
    }
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
      ended_at: finiteOrNull(attempt.finished_at),
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
