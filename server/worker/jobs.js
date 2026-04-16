import { spawn } from 'node:child_process';

const ACTIVE_STATUSES = new Set([
  'queued',
  'running',
  'capacity-wait',
  'needs-attention'
]);

/**
 * @param {{
 *   spawn_impl?: typeof spawn
 * }} [options]
 */
export function createWorkerJobManager(options = {}) {
  const spawn_impl = options.spawn_impl || spawn;
  /** @type {Array<any>} */
  const jobs = [];

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

    let shell_command = '';
    if (input.command === 'bd-ralph-v2') {
      shell_command = `codex exec '$bd-ralph-v2 ${input.issueId || ''}'`;
    } else {
      shell_command = `codex exec '$pr-review ${input.prNumber ?? input.issueId ?? ''}'`;
    }

    const child = spawn_impl('bash', ['-lc', shell_command], {
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

let worker_job_manager = null;

export function getWorkerJobManager() {
  if (!worker_job_manager) {
    worker_job_manager = createWorkerJobManager();
  }
  return worker_job_manager;
}
