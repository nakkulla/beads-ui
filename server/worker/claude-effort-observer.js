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
 * Filename one session's project JSONL always has, whichever project directory
 * it landed in. The two lookups below share it: one knows the cwd, the other
 * only the id.
 *
 * @param {string} session_id
 */
function sessionFileName(session_id) {
  return `${session_id}.jsonl`;
}

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
    sessionFileName(session_id)
  );
}

/**
 * Locate a session's project JSONL by ID ALONE (UI-4xzk §3.2).
 *
 * A `session_ref` item records the session id and nothing about the directory
 * it ran in, so the cwd-munged path above cannot be built. Session ids are
 * UUIDs, so the first project directory holding `<id>.jsonl` is THE session,
 * and scanning is exact rather than a guess.
 *
 * @param {string} session_id
 * @param {{ home_dir?: string, fs?: Pick<typeof fs, 'readdirSync' | 'statSync'> }} [options]
 * @returns {string|null}
 */
export function findClaudeSessionFile(session_id, options = {}) {
  if (typeof session_id !== 'string' || session_id.length === 0) {
    return null;
  }
  const file_system = options.fs || fs;
  const projects_dir = path.join(
    options.home_dir || os.homedir(),
    '.claude',
    'projects'
  );
  /** @type {string[]} */
  let names;
  try {
    names = file_system.readdirSync(projects_dir).map((name) => String(name));
  } catch (err) {
    log('claude projects dir unreadable: %o', err);
    return null;
  }
  for (const name of names) {
    const candidate = path.join(
      projects_dir,
      name,
      sessionFileName(session_id)
    );
    try {
      file_system.statSync(candidate);
      return candidate;
    } catch {
      continue;
    }
  }
  log('claude session file absent for %s', session_id);
  return null;
}

/**
 * Path of one subagent's own JSONL under the parent session's directory. The
 * `agentId` only arrives with the subagent's terminal `tool_use_result`, so
 * this is readable exactly when the receipt is written.
 *
 * @param {string} cwd
 * @param {string} session_id
 * @param {string} agent_id
 * @param {{ home_dir?: string }} [options]
 */
export function claudeSubagentFilePath(
  cwd,
  session_id,
  agent_id,
  options = {}
) {
  const session_file = claudeSessionFilePath(cwd, session_id, options);
  return path.join(
    path.dirname(session_file),
    session_id,
    'subagents',
    `agent-${agent_id}.jsonl`
  );
}

/**
 * First non-empty `effort` on an `assistant` record of one project JSONL;
 * null when the file is unreadable or has no such record yet.
 *
 * @param {string} file
 * @param {Pick<typeof fs, 'readFileSync'>} file_system
 * @param {string} label - Log subject (session or agent id).
 * @returns {string|null}
 */
function firstAssistantEffort(file, file_system, label) {
  /** @type {string} */
  let contents;
  try {
    contents = file_system.readFileSync(file, 'utf8');
  } catch (err) {
    log('claude effort unavailable for %s: %o', label, err);
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
  log('claude effort absent for %s', label);
  return null;
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
  const file = claudeSessionFilePath(input.cwd, input.session_id, {
    home_dir: input.home_dir
  });
  return firstAssistantEffort(
    file,
    input.fs || fs,
    `session ${input.session_id}`
  );
}

/**
 * Effort a Claude subagent ran at, read from its own JSONL (UI-2mpn follow-up).
 * The parent stream never carries it, so this file is the only source.
 *
 * @param {{ cwd: string, session_id: string, agent_id: string, fs?: Pick<typeof fs, 'readFileSync'>, home_dir?: string }} input
 * @returns {string|null}
 */
export function observeClaudeSubagentEffort(input) {
  if (
    typeof input.cwd !== 'string' ||
    input.cwd.length === 0 ||
    typeof input.session_id !== 'string' ||
    input.session_id.length === 0 ||
    typeof input.agent_id !== 'string' ||
    input.agent_id.length === 0
  ) {
    return null;
  }
  const file = claudeSubagentFilePath(
    input.cwd,
    input.session_id,
    input.agent_id,
    { home_dir: input.home_dir }
  );
  return firstAssistantEffort(
    file,
    input.fs || fs,
    `subagent ${input.agent_id}`
  );
}
