import { spawn } from 'node:child_process';

const ACTIVE_STATUSES = new Set([
  'queued',
  'running',
  'capacity-wait',
  'needs-attention'
]);

/**
 * @typedef {{
 *   on: (
 *     event_name: 'error' | 'close',
 *     handler: (value?: unknown) => void
 *   ) => void
 * }} WorkerChildProcess
 */

/**
 * @typedef {(command: string, args: string[], options: { cwd: string }) => WorkerChildProcess} WorkerSpawn
 */

/**
 * @param {{
 *   spawn_impl?: WorkerSpawn
 * }} [options]
 */
export function createWorkerJobManager(options = {}) {
  const spawn_impl =
    options.spawn_impl ||
    /** @type {WorkerSpawn} */ (
      (command, args, spawn_options) => spawn(command, args, spawn_options)
    );
  /** @type {Array<any>} */
  const jobs = [];

  /**
   * @param {{ id: string, command: string, status: string, issueId?: string | null, workspace: string, prNumber?: number | null }} job
   */
  function sanitize(job) {
    return {
      id: job.id,
      command: job.command,
      status: job.status,
      issueId: job.issueId,
      workspace: job.workspace,
      prNumber: job.prNumber ?? null
    };
  }

  /**
   * @param {{ command: string, issueId?: string, workspace: string, prNumber?: number }} input
   */
  async function enqueueJob(input) {
    const conflict = jobs.find((job) => {
      if (!ACTIVE_STATUSES.has(job.status)) {
        return false;
      }
      if (job.workspace !== input.workspace) {
        return false;
      }
      if (input.issueId && job.issueId === input.issueId) {
        return true;
      }
      return input.prNumber !== undefined && job.prNumber === input.prNumber;
    });
    if (conflict) {
      throw Object.assign(new Error('Conflict'), { code: 'conflict' });
    }

    const job = {
      id: `job-${Date.now()}-${jobs.length + 1}`,
      command: input.command,
      status: 'queued',
      issueId: input.issueId || null,
      workspace: input.workspace,
      prNumber: input.prNumber ?? null
    };
    jobs.unshift(job);

    let exec_target = '';
    if (input.command === 'bd-ralph-v2') {
      exec_target = `$bd-ralph-v2 ${input.issueId || ''}`.trim();
    } else {
      exec_target =
        `$pr-review ${input.prNumber ?? input.issueId ?? ''}`.trim();
    }

    const child = spawn_impl('codex', ['exec', exec_target], {
      cwd: input.workspace
    });
    job.status = 'running';

    child.on('error', () => {
      job.status = 'failed';
    });
    child.on('close', (code) => {
      job.status = code === 0 ? 'done' : 'failed';
    });

    return sanitize(job);
  }

  /**
   * @param {{ workspace?: string }} [filters]
   */
  function listJobs(filters = {}) {
    return jobs
      .filter((job) =>
        filters.workspace ? job.workspace === filters.workspace : true
      )
      .map((job) => sanitize(job));
  }

  return {
    enqueueJob,
    listJobs
  };
}

/** @type {ReturnType<typeof createWorkerJobManager> | null} */
let worker_job_manager = null;

export function getWorkerJobManager() {
  if (!worker_job_manager) {
    worker_job_manager = createWorkerJobManager();
  }
  return worker_job_manager;
}
