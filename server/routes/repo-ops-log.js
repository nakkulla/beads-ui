/**
 * GET /api/repo-ops-log — one repository-operation log, split into attempts
 * (UI-i8cy §5.3).
 *
 * The request never names a file. It names a registered workspace, a record
 * source and the record's id; the server looks the record up in its own queue
 * and reads the `log_path` stored there. That path must then resolve, after
 * symlinks, inside one of the workspace's own log directories — a record whose
 * stored path points anywhere else is refused, not read.
 *
 * @import { Request, Response } from 'express'
 */
import fs from 'node:fs';
import path from 'node:path';
import { getAvailableWorkspaces } from '../registry-watcher.js';
import {
  COMPLETION_TERMINAL_PHASES,
  completionLogPath,
  validCompletionIntent
} from '../worker/completion-log-path.js';
import { sanitizeOutput } from '../worker/output-sanitize.js';
import { parseRepoOperationLog } from '../worker/repo-operation-log.js';
import { getWorkerRuntime } from '../worker/runtime.js';
import {
  deployLogDir,
  repoOperationLogDir,
  verifyLogDir
} from '../worker/state-paths.js';

const SOURCES = new Set(['operation', 'cleanup', 'completion']);
const MAX_ID_LENGTH = 400;

/**
 * Operation states that still run, or will run again: a retry passes through
 * `retry_pending` and then `queued` again before the runner restarts.
 *
 * @type {Set<string>}
 */
const RUNNING_OPERATION_STATES = new Set([
  'queued',
  'running',
  'retry_pending'
]);

/**
 * @typedef {Object} RepoOpsLogDeps
 * @property {() => string[]} [workspaces] - Registered workspace paths.
 * @property {(workspace: string) => Record<string, any>} [snapshot] - The
 * workspace's queue record.
 * @property {(workspace: string, bead_id: string) => any} [observation] - The
 * PR poller's observation of one bead.
 */

/**
 * @param {Response} response
 * @param {400|403|404} status
 * @param {'bad_request'|'forbidden'|'not_found'|'unreadable'} error
 */
function sendError(response, status, error) {
  response.status(status).json({ ok: false, error });
}

/**
 * @param {unknown} value
 * @returns {Record<string, any>|null}
 */
function plainObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? /** @type {Record<string, any>} */ (value)
    : null;
}

/**
 * @param {Record<string, any>} queue
 * @param {string} key
 * @param {string} id
 * @returns {Record<string, any>|null}
 */
function recordOf(queue, key, id) {
  const table = plainObject(queue[key]);
  if (!table || !Object.hasOwn(table, id)) {
    return null;
  }
  return plainObject(table[id]);
}

/**
 * The stored log path, liveness and failure summary of the named record, or
 * null when the record (or its path) does not exist.
 *
 * @param {Record<string, any>} queue
 * @param {'operation'|'cleanup'|'completion'} source
 * @param {string} id
 * @param {() => any} observe
 * @returns {{ log_path: string, running: boolean, summary: string|null }|null}
 */
function locateLog(queue, source, id, observe) {
  if (source === 'operation') {
    const operation = recordOf(queue, 'repo_operations', id);
    if (!operation || typeof operation.log_path !== 'string') {
      return null;
    }
    const summary = plainObject(operation.failure)?.summary;
    return {
      log_path: operation.log_path,
      running: RUNNING_OPERATION_STATES.has(operation.state),
      summary: typeof summary === 'string' && summary ? summary : null
    };
  }
  if (source === 'cleanup') {
    const cleanup = recordOf(queue, 'cleanup_failed', id);
    if (!cleanup || typeof cleanup.log_path !== 'string') {
      return null;
    }
    return { log_path: cleanup.log_path, running: false, summary: null };
  }
  const log_path = completionLogPath(queue, id, observe);
  if (log_path === null) {
    return null;
  }
  const intent = validCompletionIntent(queue, id);
  return {
    log_path,
    running: intent !== null && !COMPLETION_TERMINAL_PHASES.has(intent.phase),
    summary: null
  };
}

/**
 * Whether `file` (already resolved) lies inside one of `dirs`, each resolved
 * through its own symlinks first. A directory that does not exist yet cannot
 * contain anything and is skipped.
 *
 * @param {string} file
 * @param {string[]} dirs
 */
function insideAny(file, dirs) {
  for (const dir of dirs) {
    let real_dir;
    try {
      real_dir = fs.realpathSync(dir);
    } catch {
      continue;
    }
    const relative = path.relative(real_dir, file);
    if (
      relative.length > 0 &&
      !relative.startsWith('..') &&
      !path.isAbsolute(relative)
    ) {
      return true;
    }
  }
  return false;
}

/**
 * Build the handler. Production uses the registry and the Worker runtime; the
 * seams exist so a test can hand in a queue record without a running Worker.
 *
 * @param {RepoOpsLogDeps} [deps]
 * @returns {(request: Request, response: Response) => void}
 */
export function createRepoOpsLogHandler(deps = {}) {
  const workspaces =
    deps.workspaces ||
    (() => getAvailableWorkspaces().map((entry) => entry.path));
  const snapshot =
    deps.snapshot ||
    ((/** @type {string} */ workspace) =>
      getWorkerRuntime().queueStore.snapshot(workspace));
  const observation =
    deps.observation ||
    ((/** @type {string} */ workspace, /** @type {string} */ bead_id) =>
      getWorkerRuntime().prObservations.get(workspace, bead_id));

  return function repoOpsLogHandler(request, response) {
    response.set('Cache-Control', 'no-store');
    const workspace =
      typeof request.query.workspace === 'string'
        ? request.query.workspace
        : '';
    const source = request.query.source;
    const id = request.query.id;
    if (
      !workspace ||
      !path.isAbsolute(workspace) ||
      typeof source !== 'string' ||
      !SOURCES.has(source) ||
      typeof id !== 'string' ||
      id.length === 0 ||
      id.length > MAX_ID_LENGTH
    ) {
      sendError(response, 400, 'bad_request');
      return;
    }

    const resolved_workspace = path.resolve(workspace);
    /** @type {Set<string>} */
    let allowed;
    try {
      allowed = new Set(workspaces().map((entry) => path.resolve(entry)));
    } catch {
      // An unreadable registry vouches for nothing; fail closed.
      allowed = new Set();
    }
    if (!allowed.has(resolved_workspace)) {
      sendError(response, 403, 'forbidden');
      return;
    }

    let queue;
    try {
      queue = plainObject(snapshot(resolved_workspace));
    } catch {
      queue = null;
    }
    if (!queue) {
      sendError(response, 404, 'not_found');
      return;
    }
    const located = locateLog(
      queue,
      /** @type {'operation'|'cleanup'|'completion'} */ (source),
      id,
      () => observation(resolved_workspace, id)
    );
    if (!located || !path.isAbsolute(located.log_path)) {
      sendError(response, 404, 'not_found');
      return;
    }

    let real_path;
    try {
      real_path = fs.realpathSync(located.log_path);
    } catch {
      sendError(response, 404, 'not_found');
      return;
    }
    if (
      !insideAny(real_path, [
        repoOperationLogDir(resolved_workspace),
        verifyLogDir(resolved_workspace),
        deployLogDir(resolved_workspace)
      ])
    ) {
      sendError(response, 403, 'forbidden');
      return;
    }

    /** @type {Buffer} */
    let bytes;
    try {
      if (!fs.statSync(real_path).isFile()) {
        sendError(response, 404, 'unreadable');
        return;
      }
      bytes = fs.readFileSync(real_path);
    } catch {
      sendError(response, 404, 'unreadable');
      return;
    }

    // Redaction is the rule for everything that leaves a run log
    // (`output-sanitize.js`); it runs over each decoded run of output before it
    // is split, so a multi-line key block is still caught whole.
    const parsed = parseRepoOperationLog(bytes, { transform: sanitizeOutput });
    response.status(200).json({
      ok: true,
      path: located.log_path,
      total_bytes: parsed.total_bytes,
      truncated_bytes: parsed.truncated_bytes,
      running: located.running,
      summary:
        located.summary === null ? null : sanitizeOutput(located.summary),
      preamble: parsed.preamble,
      attempts: parsed.attempts
    });
  };
}

/** The production handler for GET /api/repo-ops-log. */
export const repoOpsLogHandler = createRepoOpsLogHandler();
