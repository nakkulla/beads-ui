/**
 * @import { DatabaseSync as DatabaseSyncType, SQLInputValue, SQLOutputValue } from 'node:sqlite'
 */
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import {
  buildWorkerLogRelativePath,
  createWorkerStatePaths,
  ensureWorkerStateDirs
} from './state-paths.js';

const ACTIVE_JOB_STATUSES = ['queued', 'starting', 'running', 'cancelling'];

/**
 * @typedef {{
 *   id: string,
 *   command: string,
 *   issue_id: string | null,
 *   pr_number: number | null,
 *   workspace_path: string,
 *   status: string,
 *   runner_kind: string,
 *   pid: number | null,
 *   created_at: string,
 *   started_at: string | null,
 *   finished_at: string | null,
 *   cancel_requested_at: string | null,
 *   grace_deadline_at: string | null,
 *   exit_code: number | null,
 *   log_path: string,
 *   last_heartbeat_at: string | null,
 *   created_by: string | null,
 *   error_summary: string | null
 * }} JobRow
 */

/**
 * @typedef {{
 *   id: number,
 *   job_id: string,
 *   event_type: string,
 *   created_at: string,
 *   payload_json: string,
 *   payload: unknown
 * }} JobEventRow
 */

/**
 * @param {{ root_dir: string, now?: () => string }} options
 */
export function createJobStore(options) {
  const now = options.now || (() => new Date().toISOString());
  const paths = createWorkerStatePaths(options.root_dir);
  ensureWorkerStateDirs(paths);

  /** @type {DatabaseSyncType} */
  const db = new DatabaseSync(paths.database_path);
  let job_counter = 0;

  db.exec(`
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS jobs (
      id TEXT PRIMARY KEY,
      command TEXT NOT NULL,
      issue_id TEXT,
      pr_number INTEGER,
      workspace_path TEXT NOT NULL,
      status TEXT NOT NULL,
      runner_kind TEXT NOT NULL DEFAULT 'process',
      pid INTEGER,
      created_at TEXT NOT NULL,
      started_at TEXT,
      finished_at TEXT,
      cancel_requested_at TEXT,
      grace_deadline_at TEXT,
      exit_code INTEGER,
      log_path TEXT NOT NULL,
      last_heartbeat_at TEXT,
      created_by TEXT,
      error_summary TEXT
    );
    CREATE TABLE IF NOT EXISTS job_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      job_id TEXT NOT NULL,
      event_type TEXT NOT NULL,
      created_at TEXT NOT NULL,
      payload_json TEXT NOT NULL,
      FOREIGN KEY(job_id) REFERENCES jobs(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS jobs_workspace_status_idx
      ON jobs (workspace_path, status, created_at DESC);
    CREATE INDEX IF NOT EXISTS jobs_issue_idx
      ON jobs (workspace_path, issue_id, status);
    CREATE INDEX IF NOT EXISTS jobs_pr_idx
      ON jobs (workspace_path, pr_number, status);
    CREATE INDEX IF NOT EXISTS job_events_job_idx
      ON job_events (job_id, id);
  `);

  const select_job_stmt = db.prepare(`
    SELECT id, command, issue_id, pr_number, workspace_path, status, runner_kind,
           pid, created_at, started_at, finished_at, cancel_requested_at,
           grace_deadline_at, exit_code, log_path, last_heartbeat_at, created_by,
           error_summary
      FROM jobs
     WHERE id = ?
  `);
  const list_jobs_stmt = db.prepare(`
    SELECT id, command, issue_id, pr_number, workspace_path, status, runner_kind,
           pid, created_at, started_at, finished_at, cancel_requested_at,
           grace_deadline_at, exit_code, log_path, last_heartbeat_at, created_by,
           error_summary
      FROM jobs
     WHERE (?1 IS NULL OR workspace_path = ?1)
     ORDER BY created_at DESC, id DESC
  `);
  const list_events_stmt = db.prepare(`
    SELECT id, job_id, event_type, created_at, payload_json
      FROM job_events
     WHERE job_id = ?
     ORDER BY id ASC
  `);
  const insert_job_stmt = db.prepare(`
    INSERT INTO jobs (
      id, command, issue_id, pr_number, workspace_path, status, runner_kind,
      pid, created_at, started_at, finished_at, cancel_requested_at,
      grace_deadline_at, exit_code, log_path, last_heartbeat_at, created_by,
      error_summary
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insert_event_stmt = db.prepare(`
    INSERT INTO job_events (job_id, event_type, created_at, payload_json)
    VALUES (?, ?, ?, ?)
  `);

  /**
   * @param {string} job_id
   * @param {string} event_type
   * @param {Record<string, unknown>} [payload]
   * @returns {JobEventRow | null}
   */
  function appendEvent(job_id, event_type, payload = {}) {
    const created_at = now();
    insert_event_stmt.run(
      job_id,
      event_type,
      created_at,
      JSON.stringify(payload)
    );
    return listEvents(job_id).at(-1) ?? null;
  }

  /**
   * @param {{ command: string, issueId?: string | null, prNumber?: number | null, workspace: string, createdBy?: string | null, runnerKind?: string }} input
   * @returns {JobRow}
   */
  function createJob(input) {
    const created_at = now();
    const job_id = createJobId(created_at);
    const log_path = buildWorkerLogRelativePath(job_id);
    const absolute_log_path = path.join(paths.root_dir, log_path);
    const workspace_path = path.resolve(input.workspace);

    fs.mkdirSync(path.dirname(absolute_log_path), {
      recursive: true,
      mode: 0o700
    });
    fs.writeFileSync(absolute_log_path, '', { encoding: 'utf8', flag: 'a' });

    insert_job_stmt.run(
      job_id,
      input.command,
      input.issueId ?? null,
      input.prNumber ?? null,
      workspace_path,
      'queued',
      input.runnerKind ?? 'process',
      null,
      created_at,
      null,
      null,
      null,
      null,
      null,
      log_path,
      null,
      input.createdBy ?? null,
      null
    );

    appendEvent(job_id, 'job.created', {
      command: input.command,
      issueId: input.issueId ?? null,
      prNumber: input.prNumber ?? null,
      workspace: workspace_path
    });

    const created_job = getJob(job_id);
    if (!created_job) {
      throw new Error(`Created worker job is missing: ${job_id}`);
    }
    return created_job;
  }

  /**
   * @param {string} created_at
   */
  function createJobId(created_at) {
    job_counter += 1;
    const created_value = Date.parse(created_at);
    const stable_value = Number.isFinite(created_value)
      ? created_value
      : Date.now();
    return `job-${stable_value}-${job_counter}`;
  }

  /**
   * @param {string} job_id
   * @returns {JobRow | null}
   */
  function getJob(job_id) {
    const row = select_job_stmt.get(job_id);
    return row ? /** @type {JobRow} */ ({ ...row }) : null;
  }

  /**
   * @param {{ workspace_path?: string | null }} [filters]
   * @returns {JobRow[]}
   */
  function listJobs(filters = {}) {
    return list_jobs_stmt
      .all(filters.workspace_path ?? null)
      .map((row) => /** @type {JobRow} */ ({ ...row }));
  }

  /**
   * @param {string} job_id
   * @returns {JobEventRow[]}
   */
  function listEvents(job_id) {
    return list_events_stmt.all(job_id).map(
      (row) =>
        /** @type {JobEventRow} */ ({
          ...row,
          payload_json: /** @type {string} */ (row.payload_json),
          payload: parseJson(row.payload_json)
        })
    );
  }

  /**
   * @param {{ workspace: string, issueId?: string | null, prNumber?: number | null }} input
   */
  function findActiveConflict(input) {
    const workspace_path = path.resolve(input.workspace);
    return (
      listJobs({ workspace_path }).find((job) => {
        if (!ACTIVE_JOB_STATUSES.includes(job.status)) {
          return false;
        }
        if (input.issueId && job.issue_id === input.issueId) {
          return true;
        }
        return input.prNumber != null && job.pr_number === input.prNumber;
      }) ?? null
    );
  }

  /**
   * @param {string} job_id
   * @param {Record<string, unknown>} patch
   */
  function updateJob(job_id, patch) {
    const entries = Object.entries(patch).filter(
      ([, value]) => value !== undefined
    );
    if (entries.length === 0) {
      return getJob(job_id);
    }

    const assignments = entries.map(([field]) => `${field} = ?`).join(', ');
    /** @type {SQLInputValue[]} */
    const values = entries.map(
      ([, value]) => /** @type {SQLInputValue} */ (value)
    );
    db.prepare(`UPDATE jobs SET ${assignments} WHERE id = ?`).run(
      ...values,
      job_id
    );
    return getJob(job_id);
  }

  function close() {
    db.close();
  }

  return {
    appendEvent,
    close,
    createJob,
    findActiveConflict,
    getJob,
    listEvents,
    listJobs,
    paths,
    updateJob
  };
}

/**
 * @param {SQLOutputValue} payload_json
 */
function parseJson(payload_json) {
  if (typeof payload_json !== 'string') {
    return null;
  }
  try {
    return JSON.parse(payload_json);
  } catch {
    return null;
  }
}
