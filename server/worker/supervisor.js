/**
 * @import { Response } from 'express'
 * @import { StartedWorkerProcess, WorkerCancelResult, CodexJsonlEvent } from './process-runner.js'
 */
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import {
  nextTailSortKey,
  rebalanceSortKeys,
  sortKeyBetween
} from '../../app/utils/queue-sort.js';
import { runShell } from '../bd.js';
import { createJobStore } from './job-store.js';
import { createWorkerProcessRunner } from './process-runner.js';
import { createQueueScheduler } from './queue-scheduler.js';
import { createQueueState } from './queue-state.js';

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
 *   startJob: (input: { command?: string, phase?: 'goal' | 'pr_finish', issueId?: string | null, prNumber?: number | null, workspace: string, log_path: string, model?: string, effort?: string, onCodexEvent?: (event: CodexJsonlEvent) => void }) => StartedWorkerProcess,
 *   cancelJob: (pid: number, options: { grace_timeout_ms: number }) => Promise<WorkerCancelResult> | WorkerCancelResult
 * }} WorkerRunner
 */

/**
 * @param {{ root_dir: string, store?: ReturnType<typeof createJobStore>, runner?: WorkerRunner, scheduler?: any, queue_state?: any, worker_config?: { default_model?: string, default_effort?: string, pr_review_wait_ms?: number, advance_delay_ms?: number }, broadcast?: (type: string, payload: Record<string, unknown>, event?: Record<string, unknown>) => void, find_prs_impl?: (issue_id: string, workspace: string) => Promise<Array<{ number: number, url: string }>>, pr_finish_available?: boolean, health_check_impl?: (record: OwnerRecord) => Promise<boolean>, is_process_running_impl?: (pid: number) => boolean, owner_pid?: number, now?: () => string }} options
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
  const worker_config = normalizeWorkerConfig(options.worker_config || {});
  const pr_finish_available = options.pr_finish_available !== false;
  const queue_state =
    options.queue_state || createQueueState({ cwd: options.root_dir });
  /** @type {Array<{ seq: number, type: string, payload: Record<string, unknown>, createdAt: string }>} */
  const live_events = [];
  let event_seq = 0;

  /**
   * @param {string} type
   * @param {Record<string, unknown>} payload
   */
  function broadcast(type, payload) {
    const event = {
      seq: ++event_seq,
      type,
      payload,
      createdAt: now()
    };
    live_events.push(event);
    if (live_events.length > 1000) {
      live_events.splice(0, live_events.length - 1000);
    }
    options.broadcast?.(type, payload, event);
  }

  const find_prs_impl =
    options.find_prs_impl ||
    ((issue_id, workspace) => findPrsWithGh(issue_id, workspace));
  const scheduler =
    options.scheduler ||
    createQueueScheduler({
      queue_state,
      pr_review_wait_ms: worker_config.pr_review_wait_ms,
      advance_delay_ms: worker_config.advance_delay_ms,
      now,
      spawn_phase: async (input) => {
        if (input.phase === 'pr_finish' && !pr_finish_available) {
          broadcast('queue.blocked', {
            reason: '$pr-finish skill unavailable',
            issueId: input.issueId || '',
            prNumber: input.prNumber ?? null
          });
          return { id: '' };
        }
        const job = await createJob({
          command: 'codex',
          phase: input.phase,
          issueId: input.issueId,
          prNumber: input.prNumber,
          workspace: options.root_dir,
          model: worker_config.default_model,
          effort: worker_config.default_effort,
          parallel: input.parallel
        });
        return { id: job.id };
      },
      find_prs: (issue_id) => find_prs_impl(issue_id, options.root_dir),
      broadcast
    });
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
   * @param {{ command?: string, phase?: 'goal' | 'pr_finish' | null, issueId?: string | null, prNumber?: number | null, workspace: string, model?: string | null, effort?: string | null, parallel?: boolean }} input
   */
  async function createJob(input) {
    const workspace = path.resolve(input.workspace);
    const command = input.command || 'codex';
    const phase = /** @type {'goal' | 'pr_finish'} */ (
      input.phase ?? (command === 'pr-review' ? 'pr_finish' : 'goal')
    );
    const model = input.model || worker_config.default_model;
    const effort = input.effort || worker_config.default_effort;
    const parallel = input.parallel === true;
    const resolved_pr = { prNumber: input.prNumber ?? null };
    const conflict = store.findActiveConflict({
      workspace,
      issueId: input.issueId,
      prNumber: resolved_pr.prNumber
    });
    if (conflict) {
      throw Object.assign(new Error('Conflict'), { code: 'conflict' });
    }

    const created_job = store.createJob({
      command,
      phase,
      issueId: input.issueId,
      prNumber: resolved_pr.prNumber,
      workspace,
      model,
      effort
    });
    const started_at = now();

    /**
     * @param {CodexJsonlEvent} event
     */
    function handleCodexEvent(event) {
      if (event.type === 'session_id') {
        store.updateJob(created_job.id, {
          session_id: event.sessionId
        });
        store.appendEvent(created_job.id, 'job.session_id', {
          phase,
          sessionId: event.sessionId
        });
        if (input.issueId) {
          ignoreAsync(
            scheduler.handleJobSession({
              jobId: created_job.id,
              issueId: input.issueId,
              phase,
              sessionId: event.sessionId
            })
          );
        }
        return;
      }

      if (event.type === 'log_line') {
        store.updateJob(created_job.id, {
          last_log_line: event.line
        });
        store.appendEvent(created_job.id, 'job.log_line', {
          phase,
          line: event.line,
          at: now()
        });
        return;
      }

      store.updateJob(created_job.id, {
        usage_json: JSON.stringify(event.usage)
      });
    }

    /** @type {StartedWorkerProcess} */
    let started;
    try {
      started = runner.startJob({
        command,
        phase,
        issueId: input.issueId,
        prNumber: resolved_pr.prNumber,
        workspace,
        log_path: path.join(store.paths.root_dir, created_job.log_path),
        model,
        effort,
        onCodexEvent: handleCodexEvent
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
      phase,
      startedAt: started_at
    });
    if (input.issueId) {
      ignoreAsync(
        scheduler.handleJobStart({
          jobId: created_job.id,
          issueId: input.issueId,
          phase,
          parallel,
          startedAt: started_at
        })
      );
    }

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

    const cancelled_job = requireJob(
      store.updateJob(job_id, {
        status: 'cancelled',
        finished_at: now()
      }),
      job_id
    );
    active_children.delete(job_id);
    notifyTerminalJob(cancelled_job, 'cancelled');
    return cancelled_job;
  }

  async function reconcileJobs() {
    const jobs = store.listJobs();
    for (const job of jobs) {
      if (!ACTIVE_JOB_STATUSES.has(job.status)) {
        continue;
      }
      if (!job.pid || !is_process_running_impl(job.pid)) {
        const status = job.cancel_requested_at ? 'cancelled' : 'failed';
        const updated_job = requireJob(
          store.updateJob(job.id, {
            status,
            finished_at: now(),
            error_summary:
              status === 'failed' ? 'Process missing during reconcile' : null
          }),
          job.id
        );
        store.appendEvent(
          job.id,
          job.cancel_requested_at ? 'job.reconciled' : 'job.failed',
          { status }
        );
        notifyTerminalJob(updated_job, status);
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
    const updated_job = requireJob(
      store.updateJob(job_id, {
        status: final_status,
        finished_at: now(),
        exit_code: typeof exit_code === 'number' ? exit_code : null,
        error_summary:
          final_status === 'failed' ? `Exit code ${String(exit_code)}` : null
      }),
      job_id
    );
    store.appendEvent(job_id, 'job.exited', {
      exitCode: exit_code ?? null,
      status: final_status
    });
    notifyTerminalJob(updated_job, final_status, {
      exitCode: exit_code ?? null
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

    const updated_job = requireJob(
      store.updateJob(job_id, {
        status: 'failed',
        finished_at: now(),
        error_summary: message
      }),
      job_id
    );
    store.appendEvent(job_id, 'job.failed', { message });
    notifyTerminalJob(updated_job, 'failed', { message });
    active_children.delete(job_id);
  }

  /**
   * @param {NonNullable<ReturnType<typeof getJob>>} job
   * @param {string} status
   * @param {Record<string, unknown>} [details]
   */
  function notifyTerminalJob(job, status, details = {}) {
    if (!job.issue_id || !job.phase) {
      return;
    }
    ignoreAsync(
      scheduler.handleJobExit({
        jobId: job.id,
        issueId: job.issue_id,
        phase: job.phase,
        status,
        ...details
      })
    );
  }

  /**
   * @param {{ workspace?: string }} [input]
   */
  function getQueueSnapshot(input = {}) {
    void input;
    return {
      ...scheduler.getSnapshot(),
      pr_finish_available
    };
  }

  /**
   * @param {{ workspace?: string, since?: number }} input
   */
  function listWorkerEvents(input = {}) {
    const since = typeof input.since === 'number' ? input.since : 0;
    return live_events.filter((event) => event.seq > since);
  }

  /**
   * @param {{ issueId?: unknown, fromLane?: unknown, toLane?: unknown, beforeId?: unknown, afterId?: unknown, workspace?: string }} input
   */
  async function moveCard(input) {
    const issue_id = requireString(input.issueId, 'issueId');
    const from_lane = requireString(input.fromLane, 'fromLane');
    const to_lane = requireString(input.toLane, 'toLane');
    const issue = await queue_state.getIssue(issue_id);
    if (!issue) {
      throw Object.assign(new Error('Worker issue not found'), {
        code: 'not_found'
      });
    }
    if (
      from_lane === 'progress' &&
      (to_lane === 'inbox' || to_lane === 'waiting')
    ) {
      throw Object.assign(new Error('Cancel first'), { code: 'conflict' });
    }
    if ((to_lane === 'waiting' || to_lane === 'progress') && !issue.spec_id) {
      throw Object.assign(new Error('Spec required to enter queue'), {
        code: 'conflict'
      });
    }
    if (to_lane === 'waiting') {
      const sort_key = await computeMoveSortKey(issue_id, input);
      await queue_state.moveToWaiting(issue_id, sort_key);
      return {
        ok: true,
        issueId: issue_id,
        lane: 'waiting',
        sortKey: sort_key
      };
    }
    if (to_lane === 'inbox') {
      await queue_state.moveToInbox(issue_id);
      return { ok: true, issueId: issue_id, lane: 'inbox' };
    }
    if (to_lane === 'progress') {
      const parallel = isIssueParallel(issue);
      if (!scheduler.canStart({ parallel })) {
        throw Object.assign(
          new Error('Serial slot busy. Mark as parallel or wait.'),
          {
            code: 'conflict'
          }
        );
      }
      return startGoal({
        issueId: issue_id,
        workspace: input.workspace || options.root_dir,
        parallel
      });
    }
    throw Object.assign(new Error('Invalid worker lane'), {
      code: 'unprocessable'
    });
  }

  /**
   * @param {{ issueId?: unknown, values?: Record<string, string | undefined | null> }} input
   */
  async function setWorkerOverrides(input) {
    const issue_id = requireString(input.issueId, 'issueId');
    await queue_state.setWorkerOverrides(issue_id, input.values || {});
    return { ok: true, issueId: issue_id };
  }

  /**
   * @param {{ paused?: boolean }} input
   */
  function setPaused(input) {
    scheduler.setPaused(input.paused === true);
    return getQueueSnapshot({});
  }

  /**
   * @param {{ issueId?: unknown, workspace?: string, model?: string, effort?: string, parallel?: boolean }} input
   */
  async function startGoal(input) {
    const issue_id = requireString(input.issueId, 'issueId');
    return createJob({
      command: 'codex',
      phase: 'goal',
      issueId: issue_id,
      workspace: input.workspace || options.root_dir,
      model: input.model || worker_config.default_model,
      effort: input.effort || worker_config.default_effort,
      parallel: input.parallel === true
    });
  }

  /** @param {{ issueId?: unknown }} input */
  async function finishNow(input) {
    const issue_id = requireString(input.issueId, 'issueId');
    return (await scheduler.finishNow(issue_id)) || { ok: true };
  }

  /** @param {{ issueId?: unknown }} input */
  async function cancelAutoPrFinish(input) {
    const issue_id = requireString(input.issueId, 'issueId');
    await scheduler.cancelAutoPrFinish(issue_id);
    return { ok: true };
  }

  /** @param {{ issueId?: unknown }} input */
  async function runPrFinish(input) {
    const issue_id = requireString(input.issueId, 'issueId');
    return (await scheduler.runPrFinish(issue_id)) || { ok: true };
  }

  async function skipAdvance() {
    return (await scheduler.skipAdvance()) || { ok: true };
  }

  function cancelAutoStart() {
    scheduler.cancelAutoStart();
    return { ok: true };
  }

  async function restoreQueueState() {
    await scheduler.restoreReviewWaits();
  }

  /**
   * @param {string} issue_id
   * @param {{ beforeId?: unknown, afterId?: unknown }} input
   */
  async function computeMoveSortKey(issue_id, input) {
    const raw_waiting_cards =
      /** @type {Array<{ id: string, sort_key?: number, metadata?: Record<string, string> }>} */ (
        await queue_state.listWaitingCards()
      );
    const waiting_cards = raw_waiting_cards.filter(
      (card) => card.id !== issue_id
    );
    const before_id =
      typeof input.beforeId === 'string' ? input.beforeId : null;
    const after_id = typeof input.afterId === 'string' ? input.afterId : null;
    const before_index = before_id
      ? waiting_cards.findIndex((card) => card.id === before_id)
      : -1;
    const after_index = after_id
      ? waiting_cards.findIndex((card) => card.id === after_id)
      : -1;
    const previous_card =
      after_index >= 0
        ? waiting_cards[after_index]
        : before_index > 0
          ? waiting_cards[before_index - 1]
          : null;
    const next_card = before_index >= 0 ? waiting_cards[before_index] : null;
    if (!previous_card && !next_card) {
      return nextTailSortKey(
        waiting_cards.map((card) => card.metadata?.worker_queue_sort_key)
      );
    }
    const result = sortKeyBetween(previous_card?.sort_key, next_card?.sort_key);
    if (!result.rebalance) {
      return result.sort_key;
    }
    const ids = waiting_cards.map((card) => card.id);
    const insert_index = before_index >= 0 ? before_index : ids.length;
    ids.splice(insert_index, 0, issue_id);
    const rebalanced = rebalanceSortKeys(ids);
    await queue_state.rebalanceWaiting(rebalanced);
    return rebalanced.find((entry) => entry.id === issue_id)?.sort_key || 1000;
  }

  return {
    acquireOwnership,
    cancelJob,
    close,
    createJob,
    getEvents,
    getJob,
    getJobLog,
    getQueueSnapshot,
    listJobs,
    listWorkerEvents,
    moveCard,
    reconcileJobs,
    releaseOwnership,
    restoreQueueState,
    setPaused,
    setWorkerOverrides,
    startGoal,
    finishNow,
    cancelAutoPrFinish,
    runPrFinish,
    skipAdvance,
    cancelAutoStart,
    store
  };
}

/**
 * @param {{ root_dir: string, host?: string, port?: number, supervisor?: ReturnType<typeof createWorkerSupervisor> | null, worker_config?: { default_model?: string, default_effort?: string, pr_review_wait_ms?: number, advance_delay_ms?: number }, pr_finish_available?: boolean }} options
 */
export function createWorkerSupervisorServer(options) {
  const supervisor =
    options.supervisor ||
    createWorkerSupervisor({
      root_dir: options.root_dir,
      worker_config: options.worker_config,
      pr_finish_available: options.pr_finish_available
    });
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

  app.get('/queue', (req, res) => {
    try {
      res.status(200).json(
        supervisor.getQueueSnapshot({
          workspace:
            typeof req.query.workspace === 'string'
              ? req.query.workspace
              : undefined
        })
      );
    } catch (error) {
      sendSupervisorError(res, error);
    }
  });

  app.get('/events', (req, res) => {
    try {
      const since =
        typeof req.query.since === 'string'
          ? Number.parseInt(req.query.since, 10)
          : 0;
      res.status(200).json({
        items: supervisor.listWorkerEvents({
          workspace:
            typeof req.query.workspace === 'string'
              ? req.query.workspace
              : undefined,
          since: Number.isFinite(since) ? since : 0
        })
      });
    } catch (error) {
      sendSupervisorError(res, error);
    }
  });

  app.post('/queue/move', async (req, res) => {
    await sendQueueResult(res, () => supervisor.moveCard(req.body || {}));
  });
  app.post('/queue/overrides', async (req, res) => {
    await sendQueueResult(res, () =>
      supervisor.setWorkerOverrides(req.body || {})
    );
  });
  app.post('/queue/pause', async (req, res) => {
    await sendQueueResult(res, () => supervisor.setPaused(req.body || {}));
  });
  app.post('/queue/start', async (req, res) => {
    await sendQueueResult(res, () => supervisor.startGoal(req.body || {}));
  });
  app.post('/queue/finish-now', async (req, res) => {
    await sendQueueResult(res, () => supervisor.finishNow(req.body || {}));
  });
  app.post('/queue/cancel-auto-pr-finish', async (req, res) => {
    await sendQueueResult(res, () =>
      supervisor.cancelAutoPrFinish(req.body || {})
    );
  });
  app.post('/queue/run-pr-finish', async (req, res) => {
    await sendQueueResult(res, () => supervisor.runPrFinish(req.body || {}));
  });
  app.post('/queue/skip-advance', async (_req, res) => {
    await sendQueueResult(res, () => supervisor.skipAdvance());
  });
  app.post('/queue/cancel-auto-start', async (_req, res) => {
    await sendQueueResult(res, () => supervisor.cancelAutoStart());
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
        if (typeof supervisor.restoreQueueState === 'function') {
          await supervisor.restoreQueueState();
        }
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
 * @param {Response} res
 * @param {() => Promise<unknown> | unknown} action
 */
async function sendQueueResult(res, action) {
  try {
    const result = await action();
    res.status(200).json(result ?? { ok: true });
  } catch (error) {
    sendSupervisorError(res, error);
  }
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
    phase: required_job.phase,
    issueId: required_job.issue_id,
    prNumber: required_job.pr_number,
    workspace: required_job.workspace_path,
    model: required_job.model,
    effort: required_job.effort,
    status: required_job.status,
    runnerKind: required_job.runner_kind,
    sessionId: required_job.session_id,
    lastLogLine: required_job.last_log_line,
    usage: parseUsageJson(required_job.usage_json),
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
 * @param {string | null | undefined} usage_json
 * @returns {Record<string, unknown> | null}
 */
function parseUsageJson(usage_json) {
  if (!usage_json) {
    return null;
  }
  try {
    const value = JSON.parse(usage_json);
    return value && typeof value === 'object' && !Array.isArray(value)
      ? /** @type {Record<string, unknown>} */ (value)
      : null;
  } catch {
    return null;
  }
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

/**
 * @param {{ default_model?: string, default_effort?: string, pr_review_wait_ms?: number, advance_delay_ms?: number }} input
 */
function normalizeWorkerConfig(input) {
  return {
    default_model:
      typeof input.default_model === 'string' && input.default_model.length > 0
        ? input.default_model
        : 'gpt-5.5',
    default_effort:
      typeof input.default_effort === 'string' &&
      input.default_effort.length > 0
        ? input.default_effort
        : 'high',
    pr_review_wait_ms:
      typeof input.pr_review_wait_ms === 'number' && input.pr_review_wait_ms > 0
        ? input.pr_review_wait_ms
        : 300000,
    advance_delay_ms:
      typeof input.advance_delay_ms === 'number' && input.advance_delay_ms > 0
        ? input.advance_delay_ms
        : 60000
  };
}

/**
 * @param {string} issue_id
 * @param {string} workspace
 */
async function findPrsWithGh(issue_id, workspace) {
  const result = await runShell(
    'gh',
    [
      'pr',
      'list',
      '--state',
      'open',
      '--search',
      issue_id,
      '--json',
      'number,url,title,state'
    ],
    { cwd: workspace, timeout_ms: 30000 }
  );
  if (result.code !== 0) {
    return [];
  }
  try {
    const parsed = JSON.parse(result.stdout);
    return Array.isArray(parsed)
      ? parsed
          .filter(
            (item) =>
              item &&
              typeof item === 'object' &&
              typeof item.number === 'number' &&
              typeof item.url === 'string'
          )
          .map((item) => ({ number: item.number, url: item.url }))
      : [];
  } catch {
    return [];
  }
}

/**
 * @param {Promise<unknown>} promise
 */
function ignoreAsync(promise) {
  void promise.catch(() => {});
}

/**
 * @param {unknown} value
 * @param {string} name
 */
function requireString(value, name) {
  if (typeof value !== 'string' || value.length === 0) {
    throw Object.assign(new Error(`Missing ${name}`), {
      code: 'invalid_request'
    });
  }
  return value;
}

/**
 * @param {any} issue
 */
function isIssueParallel(issue) {
  return (
    String(issue?.metadata?.worker_parallel || '').toLowerCase() === 'true'
  );
}
