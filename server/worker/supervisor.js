/**
 * @import { Response } from 'express'
 * @import { StartedWorkerProcess, WorkerCancelResult } from './process-runner.js'
 */
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { createJobStore } from './job-store.js';
import { resolvePrReviewTarget } from './pr-target-resolver.js';
import { createWorkerProcessRunner } from './process-runner.js';

const ACTIVE_JOB_STATUSES = new Set([
  'queued',
  'starting',
  'running',
  'cancelling'
]);
const FINAL_JOB_STATUSES = new Set(['succeeded', 'failed', 'cancelled']);

/**
 * @typedef {{
 *   pid?: number,
 *   port?: number | null,
 *   acquired_at?: string
 * }} OwnerRecord
 */

/**
 * @typedef {{
 *   startJob: (input: { command: string, issueId?: string | null, prNumber?: number | null, workspace: string, log_path: string }) => StartedWorkerProcess,
 *   cancelJob: (pid: number, options: { grace_timeout_ms: number }) => Promise<WorkerCancelResult> | WorkerCancelResult
 * }} WorkerRunner
 */

/**
 * @param {{ root_dir: string, store?: ReturnType<typeof createJobStore>, runner?: WorkerRunner, health_check_impl?: (record: OwnerRecord) => Promise<boolean>, is_process_running_impl?: (pid: number) => boolean, resolve_pr_target_impl?: typeof resolvePrReviewTarget, owner_pid?: number, now?: () => string }} options
 */
export function createWorkerSupervisor(options) {
  const store = options.store || createJobStore({ root_dir: options.root_dir });
  const runner = options.runner || createWorkerProcessRunner();
  const owner_pid = options.owner_pid || process.pid;
  const now = options.now || (() => new Date().toISOString());
  const health_check_impl =
    options.health_check_impl ||
    (async (record) => {
      if (!record.port) {
        return true;
      }
      try {
        const response = await fetch(`http://127.0.0.1:${record.port}/healthz`);
        return response.ok;
      } catch {
        return false;
      }
    });
  const is_process_running_impl =
    options.is_process_running_impl ||
    ((pid) => {
      try {
        process.kill(pid, 0);
        return true;
      } catch {
        return false;
      }
    });
  const resolve_pr_target_impl =
    options.resolve_pr_target_impl || resolvePrReviewTarget;
  /** @type {Map<string, StartedWorkerProcess['child']>} */
  const active_children = new Map();

  /**
   * @param {{ port?: number | null }} [details]
   */
  async function acquireOwnership(details = {}) {
    /** @type {OwnerRecord} */
    const record = {
      pid: owner_pid,
      port: details.port ?? null,
      acquired_at: now()
    };
    fs.mkdirSync(path.dirname(store.paths.lock_path), {
      recursive: true,
      mode: 0o700
    });

    try {
      const fd = fs.openSync(store.paths.lock_path, 'wx', 0o600);
      fs.writeFileSync(fd, JSON.stringify(record), 'utf8');
      fs.closeSync(fd);
      return { took_over: false, already_owned: false };
    } catch (error) {
      const code = /** @type {{ code?: string }} */ (error).code;
      if (code !== 'EEXIST') {
        throw error;
      }
    }

    const existing_record = readOwnerRecord(store.paths.lock_path);
    if (existing_record?.pid === owner_pid) {
      fs.writeFileSync(store.paths.lock_path, JSON.stringify(record), 'utf8');
      return { took_over: false, already_owned: true };
    }

    const existing_pid =
      existing_record && typeof existing_record.pid === 'number'
        ? existing_record.pid
        : null;
    const existing_running = existing_pid
      ? is_process_running_impl(existing_pid)
      : false;
    const existing_healthy = existing_running
      ? await health_check_impl(existing_record || {})
      : false;

    if (existing_running && existing_healthy) {
      throw Object.assign(new Error('Worker supervisor already active'), {
        code: 'conflict'
      });
    }

    fs.writeFileSync(store.paths.lock_path, JSON.stringify(record), 'utf8');
    return { took_over: Boolean(existing_record), already_owned: false };
  }

  function releaseOwnership() {
    const existing_record = readOwnerRecord(store.paths.lock_path);
    if (existing_record?.pid === owner_pid) {
      fs.rmSync(store.paths.lock_path, { force: true });
    }
  }

  /**
   * @param {{ command: string, issueId?: string | null, prNumber?: number | null, workspace: string }} input
   */
  async function createJob(input) {
    const workspace = path.resolve(input.workspace);
    const resolved_pr =
      input.command === 'pr-review'
        ? await resolve_pr_target_impl({
            issueId: input.issueId,
            prNumber: input.prNumber,
            workspace
          })
        : { prNumber: input.prNumber ?? null };
    const conflict = store.findActiveConflict({
      workspace,
      issueId: input.issueId,
      prNumber: resolved_pr.prNumber
    });
    if (conflict) {
      throw Object.assign(new Error('Conflict'), { code: 'conflict' });
    }

    const created_job = store.createJob({
      command: input.command,
      issueId: input.issueId,
      prNumber: resolved_pr.prNumber,
      workspace
    });
    const started_at = now();
    /** @type {StartedWorkerProcess} */
    let started;
    try {
      started = runner.startJob({
        command: input.command,
        issueId: input.issueId,
        prNumber: resolved_pr.prNumber,
        workspace,
        log_path: path.join(store.paths.root_dir, created_job.log_path)
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      store.updateJob(created_job.id, {
        status: 'failed',
        finished_at: now(),
        error_summary: message
      });
      store.appendEvent(created_job.id, 'job.failed', {
        message,
        stage: 'start'
      });
      throw Object.assign(new Error(message), { code: 'start_failed' });
    }
    const running_job = store.updateJob(created_job.id, {
      status: 'running',
      pid: started.pid,
      started_at,
      last_heartbeat_at: started_at,
      pr_number: resolved_pr.prNumber
    });
    store.appendEvent(created_job.id, 'job.started', {
      pid: started.pid,
      startedAt: started_at
    });

    if (started.child) {
      active_children.set(created_job.id, started.child);
      started.child.on('close', (exit_code) => {
        finalizeFromChildClose(created_job.id, exit_code);
      });
      started.child.on('error', (error) => {
        finalizeFailure(
          created_job.id,
          error instanceof Error ? error.message : String(error)
        );
      });
    }

    return requireJob(running_job, created_job.id);
  }

  /**
   * @param {string} job_id
   * @param {{ grace_timeout_ms?: number }} [options]
   */
  async function cancelJob(job_id, options = {}) {
    const job = requireJob(getJob(job_id), job_id);
    if (!ACTIVE_JOB_STATUSES.has(job.status) || job.pid == null) {
      throw Object.assign(new Error('Job is not cancellable'), {
        code: 'conflict'
      });
    }

    const cancel_requested_at = now();
    const grace_timeout_ms = options.grace_timeout_ms ?? 30000;
    const grace_deadline_at = new Date(
      Date.parse(cancel_requested_at) + grace_timeout_ms
    ).toISOString();
    store.updateJob(job_id, {
      status: 'cancelling',
      cancel_requested_at,
      grace_deadline_at
    });
    store.appendEvent(job_id, 'job.cancel_requested', {
      cancelRequestedAt: cancel_requested_at,
      graceDeadlineAt: grace_deadline_at
    });

    const cancel_result = await runner.cancelJob(job.pid, { grace_timeout_ms });
    const cancelled = isCancelSuccessful(cancel_result);
    const forced = isForcedCancel(cancel_result);

    if (forced) {
      store.appendEvent(job_id, 'job.killed', { at: now() });
    }

    if (!cancelled) {
      const active_job = store.updateJob(job_id, {
        status: 'running',
        cancel_requested_at: null,
        grace_deadline_at: null,
        error_summary: 'Cancel failed'
      });
      store.appendEvent(job_id, 'job.cancel_failed', {
        reason: 'cancel_failed'
      });
      return requireJob(active_job, job_id);
    }

    const cancelled_job = store.updateJob(job_id, {
      status: 'cancelled',
      finished_at: now()
    });
    active_children.delete(job_id);
    return requireJob(cancelled_job, job_id);
  }

  async function reconcileJobs() {
    const jobs = store.listJobs();
    for (const job of jobs) {
      if (!ACTIVE_JOB_STATUSES.has(job.status)) {
        continue;
      }
      if (!job.pid || !is_process_running_impl(job.pid)) {
        const status = job.cancel_requested_at ? 'cancelled' : 'failed';
        store.updateJob(job.id, {
          status,
          finished_at: now(),
          error_summary:
            status === 'failed' ? 'Process missing during reconcile' : null
        });
        store.appendEvent(
          job.id,
          job.cancel_requested_at ? 'job.reconciled' : 'job.failed',
          { status }
        );
        continue;
      }
      store.updateJob(job.id, {
        last_heartbeat_at: now()
      });
    }
  }

  /**
   * @param {string} job_id
   */
  function getJob(job_id) {
    return store.getJob(job_id);
  }

  /**
   * @param {{ workspace?: string }} [filters]
   */
  function listJobs(filters = {}) {
    return store.listJobs({
      workspace_path: filters.workspace ? path.resolve(filters.workspace) : null
    });
  }

  /**
   * @param {string} job_id
   */
  function getEvents(job_id) {
    return store.listEvents(job_id);
  }

  /**
   * @param {string} job_id
   * @param {{ tail?: number }} [options]
   */
  function getJobLog(job_id, options = {}) {
    const job = requireJob(getJob(job_id), job_id);
    const tail = options.tail ?? 200;
    const absolute_log_path = path.join(store.paths.root_dir, job.log_path);
    const text = fs.existsSync(absolute_log_path)
      ? fs.readFileSync(absolute_log_path, 'utf8')
      : '';
    const lines = text.length > 0 ? text.trimEnd().split(/\r?\n/) : [];
    const sliced = lines.slice(-tail);
    return {
      path: job.log_path,
      tail: sliced,
      truncated: lines.length > sliced.length
    };
  }

  async function close() {
    releaseOwnership();
    store.close();
  }

  /**
   * @param {string} job_id
   * @param {number | null | undefined} exit_code
   */
  function finalizeFromChildClose(job_id, exit_code) {
    const job = getJob(job_id);
    if (!job || FINAL_JOB_STATUSES.has(job.status)) {
      active_children.delete(job_id);
      return;
    }

    const final_status = job.cancel_requested_at
      ? 'cancelled'
      : exit_code === 0
        ? 'succeeded'
        : 'failed';
    store.updateJob(job_id, {
      status: final_status,
      finished_at: now(),
      exit_code: typeof exit_code === 'number' ? exit_code : null,
      error_summary:
        final_status === 'failed' ? `Exit code ${String(exit_code)}` : null
    });
    store.appendEvent(job_id, 'job.exited', {
      exitCode: exit_code ?? null,
      status: final_status
    });
    active_children.delete(job_id);
  }

  /**
   * @param {string} job_id
   * @param {string} message
   */
  function finalizeFailure(job_id, message) {
    const job = getJob(job_id);
    if (!job || FINAL_JOB_STATUSES.has(job.status)) {
      active_children.delete(job_id);
      return;
    }

    store.updateJob(job_id, {
      status: 'failed',
      finished_at: now(),
      error_summary: message
    });
    store.appendEvent(job_id, 'job.failed', { message });
    active_children.delete(job_id);
  }

  return {
    acquireOwnership,
    cancelJob,
    close,
    createJob,
    getEvents,
    getJob,
    getJobLog,
    listJobs,
    reconcileJobs,
    releaseOwnership,
    store
  };
}

/**
 * @param {{ root_dir: string, host?: string, port?: number, supervisor?: ReturnType<typeof createWorkerSupervisor> | null }} options
 */
export function createWorkerSupervisorServer(options) {
  const supervisor =
    options.supervisor ||
    createWorkerSupervisor({ root_dir: options.root_dir });
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json());

  app.get('/healthz', (_req, res) => {
    res.status(200).json({ ok: true, pid: process.pid });
  });

  app.get('/jobs', async (req, res) => {
    await supervisor.reconcileJobs();
    res.status(200).json({
      items: supervisor
        .listJobs({
          workspace:
            typeof req.query.workspace === 'string'
              ? req.query.workspace
              : undefined
        })
        .map((job) =>
          serializeJob(job, (job_id) => supervisor.getEvents(job_id))
        )
    });
  });

  app.get('/jobs/:jobId', async (req, res) => {
    await supervisor.reconcileJobs();
    const job = supervisor.getJob(req.params.jobId);
    if (!job) {
      res.status(404).json({ error: 'Worker job not found' });
      return;
    }
    res.status(200).json({
      item: {
        ...serializeJob(job, (job_id) => supervisor.getEvents(job_id)),
        events: supervisor.getEvents(job.id),
        logPreview: supervisor.getJobLog(job.id, { tail: 200 })
      }
    });
  });

  app.post('/jobs', async (req, res) => {
    try {
      const job = await supervisor.createJob(req.body || {});
      res
        .status(202)
        .json(serializeJob(job, (job_id) => supervisor.getEvents(job_id)));
    } catch (error) {
      sendSupervisorError(res, error);
    }
  });

  app.post('/jobs/:jobId/cancel', async (req, res) => {
    try {
      const job = await supervisor.cancelJob(req.params.jobId, req.body || {});
      res.status(200).json({
        item: serializeJob(job, (job_id) => supervisor.getEvents(job_id))
      });
    } catch (error) {
      sendSupervisorError(res, error);
    }
  });

  app.get('/jobs/:jobId/log', (req, res) => {
    try {
      const tail =
        typeof req.query.tail === 'string'
          ? Number.parseInt(req.query.tail, 10)
          : undefined;
      res.status(200).json(supervisor.getJobLog(req.params.jobId, { tail }));
    } catch (error) {
      sendSupervisorError(res, error);
    }
  });

  return {
    app,
    supervisor,
    async start() {
      const host = options.host || '127.0.0.1';
      const port = options.port ?? 0;
      const server = await new Promise((resolve, reject) => {
        const listening = app.listen({ host, port }, () => resolve(listening));
        listening.on('error', reject);
      });
      const address = server.address();
      const actual_port =
        address && typeof address === 'object' && 'port' in address
          ? address.port
          : null;
      try {
        await supervisor.acquireOwnership({ port: actual_port });
        await supervisor.reconcileJobs();
        return { server, port: actual_port };
      } catch (error) {
        await new Promise((resolve, reject) => {
          /** @type {(close_error?: Error | null) => void} */
          const handle_close = (close_error) => {
            if (close_error) {
              reject(close_error);
              return;
            }
            resolve(undefined);
          };
          server.close(handle_close);
        });
        throw error;
      }
    }
  };
}

/**
 * @param {WorkerCancelResult} cancel_result
 */
function isCancelSuccessful(cancel_result) {
  return typeof cancel_result === 'object'
    ? Boolean(cancel_result.ok)
    : Boolean(cancel_result);
}

/**
 * @param {WorkerCancelResult} cancel_result
 */
function isForcedCancel(cancel_result) {
  return typeof cancel_result === 'object'
    ? Boolean(cancel_result.forced)
    : false;
}

/**
 * @param {Response} res
 * @param {unknown} error
 */
function sendSupervisorError(res, error) {
  const code =
    error && typeof error === 'object' && 'code' in error ? error.code : '';
  const status =
    code === 'not_found'
      ? 404
      : code === 'unprocessable'
        ? 422
        : code === 'conflict'
          ? 409
          : code === 'invalid_request'
            ? 400
            : 500;
  res.status(status).json({
    error:
      error instanceof Error
        ? error.message
        : 'Worker supervisor request failed'
  });
}

/**
 * @param {string} lock_path
 * @returns {OwnerRecord | null}
 */
function readOwnerRecord(lock_path) {
  try {
    const text = fs.readFileSync(lock_path, 'utf8');
    const value = JSON.parse(text);
    return value && typeof value === 'object'
      ? /** @type {OwnerRecord} */ (value)
      : null;
  } catch {
    return null;
  }
}

/**
 * @param {ReturnType<ReturnType<typeof createWorkerSupervisor>['getJob']>} job
 * @param {string} job_id
 */
function requireJob(job, job_id) {
  if (!job) {
    throw Object.assign(new Error(`Worker job not found: ${job_id}`), {
      code: 'not_found'
    });
  }
  return job;
}

/**
 * @param {ReturnType<ReturnType<typeof createWorkerSupervisor>['getJob']>} job
 * @param {(job_id: string) => Array<{ event_type?: string }>} get_events
 */
function serializeJob(job, get_events) {
  const required_job = requireJob(job, 'unknown');
  const was_force_killed = get_events(required_job.id).some(
    (event) => event.event_type === 'job.killed'
  );
  return {
    id: required_job.id,
    command: required_job.command,
    issueId: required_job.issue_id,
    prNumber: required_job.pr_number,
    workspace: required_job.workspace_path,
    status: required_job.status,
    runnerKind: required_job.runner_kind,
    startedAt: required_job.started_at,
    finishedAt: required_job.finished_at,
    cancelRequestedAt: required_job.cancel_requested_at,
    graceDeadlineAt: required_job.grace_deadline_at,
    elapsedMs: computeElapsedMs(required_job),
    isCancellable:
      ACTIVE_JOB_STATUSES.has(required_job.status) && required_job.pid != null,
    finalResult: FINAL_JOB_STATUSES.has(required_job.status)
      ? required_job.status
      : null,
    errorSummary: required_job.error_summary,
    createdAt: required_job.created_at,
    wasForceKilled: was_force_killed
  };
}

/**
 * @param {NonNullable<ReturnType<ReturnType<typeof createWorkerSupervisor>['getJob']>>} job
 */
function computeElapsedMs(job) {
  const now_ms = Date.now();
  if (job.finished_at && job.started_at) {
    return Date.parse(job.finished_at) - Date.parse(job.started_at);
  }
  if (ACTIVE_JOB_STATUSES.has(job.status) && job.started_at) {
    return now_ms - Date.parse(job.started_at);
  }
  return now_ms - Date.parse(job.created_at);
}
