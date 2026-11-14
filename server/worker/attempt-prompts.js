import fs from 'node:fs';
import path from 'node:path';
import { debug } from '../logging.js';
import { attemptPromptPath, beadsRootDir } from './state-paths.js';

const log = debug('worker:attempt-prompts');

/**
 * @typedef {object} AttemptPrompt
 * @property {string} attempt_id
 * @property {string|null} system_prompt
 * @property {string|null} task_prompt
 * @property {number|null} recorded_at
 */

/**
 * Persist the actual send atomically. Failure never prevents a launch.
 * Existing files win during migration, including across interrupted starts.
 *
 * @param {string} workspace
 * @param {{ bead_id: string, attempt_id: string, started_at?: number|null, system_prompt?: string|null, task_prompt?: string|null }} attempt
 * @param {{ if_missing?: boolean }} [options]
 * @returns {boolean}
 */
export function writeAttemptPrompts(workspace, attempt, options = {}) {
  const file = attemptPromptPath(
    workspace,
    attempt.bead_id,
    attempt.attempt_id
  );
  const tmp = `${file}.tmp`;
  try {
    if (options.if_missing && fs.existsSync(file)) {
      return true;
    }
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(
      tmp,
      JSON.stringify({
        attempt_id: attempt.attempt_id,
        system_prompt: attempt.system_prompt ?? null,
        task_prompt: attempt.task_prompt ?? null,
        recorded_at: attempt.started_at ?? null
      })
    );
    fs.renameSync(tmp, file);
    return true;
  } catch (err) {
    log('prompt write failed for %s: %o', file, err);
    try {
      fs.rmSync(tmp, { force: true });
    } catch {
      // An abandoned temp file is never read as a prompt record.
    }
    return false;
  }
}

/**
 * Missing, corrupt, and unreadable files all allow the legacy fallback.
 *
 * @param {string} workspace
 * @param {string} bead_id
 * @param {string} attempt_id
 * @returns {AttemptPrompt|null}
 */
export function readAttemptPrompts(workspace, bead_id, attempt_id) {
  try {
    const record = JSON.parse(
      fs.readFileSync(attemptPromptPath(workspace, bead_id, attempt_id), 'utf8')
    );
    if (
      !record ||
      record.attempt_id !== attempt_id ||
      !(
        typeof record.system_prompt === 'string' ||
        record.system_prompt === null
      ) ||
      !(typeof record.task_prompt === 'string' || record.task_prompt === null)
    ) {
      return null;
    }
    return {
      attempt_id,
      system_prompt: record.system_prompt,
      task_prompt: record.task_prompt,
      recorded_at:
        typeof record.recorded_at === 'number' ? record.recorded_at : null
    };
  } catch {
    return null;
  }
}

/**
 * Resolve an id without assuming that it embeds its bead id. This cold lookup
 * also works when only the prompt file survives outside the live queue.
 *
 * @param {string} workspace
 * @param {string} attempt_id
 * @returns {AttemptPrompt|null}
 */
export function findAttemptPrompts(workspace, attempt_id) {
  try {
    for (const entry of fs.readdirSync(beadsRootDir(workspace), {
      withFileTypes: true
    })) {
      if (!entry.isDirectory()) {
        continue;
      }
      const record = readAttemptPrompts(workspace, entry.name, attempt_id);
      if (record) {
        return record;
      }
    }
  } catch {
    return null;
  }
  return null;
}
