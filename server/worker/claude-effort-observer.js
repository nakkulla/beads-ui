/**
 * Fail-quiet observer for the execution effort Claude records in its own
 * project session JSONL.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { debug } from '../logging.js';

const log = debug('worker:claude-effort-observer');

/**
 * @param {string} cwd
 * @param {string} session_id
 * @param {{ home_dir?: string }} [options]
 */
export function claudeSessionFilePath(cwd, session_id, options = {}) {
  const home_dir = options.home_dir || os.homedir();
  const munged_cwd = cwd.replace(/[^a-zA-Z0-9]/g, '-');
  return path.join(
    home_dir,
    '.claude',
    'projects',
    munged_cwd,
    `${session_id}.jsonl`
  );
}

/**
 * @param {{ cwd: string, session_id: string, fs?: Pick<typeof fs, 'readFileSync'>, home_dir?: string }} input
 * @returns {string|null}
 */
export function observeClaudeEffort(input) {
  if (
    typeof input.cwd !== 'string' ||
    input.cwd.length === 0 ||
    typeof input.session_id !== 'string' ||
    input.session_id.length === 0
  ) {
    return null;
  }
  const file_system = input.fs || fs;
  const file = claudeSessionFilePath(input.cwd, input.session_id, {
    home_dir: input.home_dir
  });
  /** @type {string} */
  let contents;
  try {
    contents = file_system.readFileSync(file, 'utf8');
  } catch (err) {
    log('claude effort unavailable for session %s: %o', input.session_id, err);
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
    if (
      record.type === 'assistant' &&
      typeof record.effort === 'string' &&
      record.effort.trim().length > 0
    ) {
      return record.effort;
    }
  }
  log('claude effort absent for session %s', input.session_id);
  return null;
}
