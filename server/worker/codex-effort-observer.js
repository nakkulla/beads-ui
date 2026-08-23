/**
 * Fail-quiet observer for the execution effort Codex records in its own
 * rollout JSONL (`~/.codex/sessions/<YYYY/MM/DD>/rollout-<ts>-<session_id>.jsonl`).
 *
 * The rollout schema is an unofficial Codex CLI surface, so this reads it
 * leniently: the first `turn_context` record carrying a non-empty string
 * `payload.effort` wins, and any missing or malformed piece yields null.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { debug } from '../logging.js';

const log = debug('worker:codex-effort-observer');

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Local-date rollout directories to probe for an attempt. Codex names the
 * directory by the local date of session start, and the attempt's
 * `started_at` may sit on either side of a midnight or timezone boundary,
 * so the day before and after are included.
 *
 * @param {number|null} started_at - Epoch ms; a non-finite value falls back to `now`.
 * @param {{ now?: () => number }} [options]
 * @returns {string[]} Relative `YYYY/MM/DD` segments, nearest date first.
 */
export function codexRolloutDateDirs(started_at, options = {}) {
  const now = options.now || (() => Date.now());
  const base =
    typeof started_at === 'number' && Number.isFinite(started_at)
      ? started_at
      : now();
  return [0, -1, 1].map((offset) => {
    const date = new Date(base + offset * DAY_MS);
    const year = String(date.getFullYear()).padStart(4, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return path.join(year, month, day);
  });
}

/**
 * Locate the rollout file for a session under the probed date directories.
 *
 * @param {{ session_id: string, started_at: number|null, fs: Pick<typeof fs, 'readdirSync'>, home_dir: string, now?: () => number }} input
 * @returns {string|null}
 */
export function codexRolloutFilePath(input) {
  const sessions_root = path.join(input.home_dir, '.codex', 'sessions');
  const suffix = `-${input.session_id}.jsonl`;
  for (const date_dir of codexRolloutDateDirs(input.started_at, {
    now: input.now
  })) {
    const dir = path.join(sessions_root, date_dir);
    /** @type {string[]} */
    let entries;
    try {
      entries = input.fs.readdirSync(dir);
    } catch {
      continue;
    }
    const match = entries.find(
      (name) => name.startsWith('rollout-') && name.endsWith(suffix)
    );
    if (match !== undefined) {
      return path.join(dir, match);
    }
  }
  return null;
}

/**
 * @param {{ session_id: string, started_at?: number|null, fs?: Pick<typeof fs, 'readFileSync' | 'readdirSync'>, home_dir?: string, now?: () => number }} input
 * @returns {string|null}
 */
export function observeCodexEffort(input) {
  if (typeof input.session_id !== 'string' || input.session_id.length === 0) {
    return null;
  }
  const file_system = input.fs || fs;
  const file = codexRolloutFilePath({
    session_id: input.session_id,
    started_at: input.started_at ?? null,
    fs: file_system,
    home_dir: input.home_dir || os.homedir(),
    now: input.now
  });
  if (file === null) {
    log('codex rollout not found for session %s', input.session_id);
    return null;
  }
  /** @type {string} */
  let contents;
  try {
    contents = file_system.readFileSync(file, 'utf8');
  } catch (err) {
    log('codex effort unavailable for session %s: %o', input.session_id, err);
    return null;
  }
  for (const line of contents.split(/\r?\n/)) {
    if (line.trim().length === 0) {
      continue;
    }
    /** @type {unknown} */
    let raw;
    try {
      raw = JSON.parse(line);
    } catch {
      continue;
    }
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      continue;
    }
    const record = /** @type {Record<string, unknown>} */ (raw);
    if (record.type !== 'turn_context') {
      continue;
    }
    const payload = record.payload;
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      continue;
    }
    const effort = /** @type {Record<string, unknown>} */ (payload).effort;
    if (typeof effort === 'string' && effort.trim().length > 0) {
      return effort;
    }
  }
  log('codex effort absent for session %s', input.session_id);
  return null;
}
