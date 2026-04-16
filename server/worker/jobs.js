import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { startManagedDaemon } from '../cli/daemon.js';
import { createWorkerStatePaths } from './state-paths.js';

/** @type {Map<string, ReturnType<typeof createWorkerJobManager>>} */
const worker_job_managers = new Map();

/**
 * @param {{ root_dir: string, client?: any }} options
 */
export function createWorkerJobManager(options) {
  const client =
    options.client ||
    createWorkerSupervisorClient({ root_dir: options.root_dir });

  return {
    /**
     * @param {{ command: string, issueId?: string, workspace: string, prNumber?: number }} input
     */
    enqueueJob(input) {
      return client.createJob(input);
    },
    /**
     * @param {{ workspace?: string }} [filters]
     */
    listJobs(filters = {}) {
      return client.listJobs(filters);
    },
    /**
     * @param {{ jobId: string }} input
     */
    getJob(input) {
      return client.getJob(input);
    },
    /**
     * @param {{ jobId: string }} input
     */
    cancelJob(input) {
      return client.cancelJob(input);
    },
    /**
     * @param {{ jobId: string, tail?: number }} input
     */
    getJobLog(input) {
      return client.getJobLog(input);
    }
  };
}

/**
 * @param {{ root_dir?: string }} [options]
 */
export function getWorkerJobManager(options = {}) {
  const root_dir = path.resolve(options.root_dir || process.cwd());
  const existing = worker_job_managers.get(root_dir);
  if (existing) {
    return existing;
  }

  const manager = createWorkerJobManager({ root_dir });
  worker_job_managers.set(root_dir, manager);
  return manager;
}

/**
 * @param {{ root_dir: string, fetch_impl?: typeof fetch, start_daemon_impl?: typeof startManagedDaemon }} options
 */
function createWorkerSupervisorClient(options) {
  const fetch_impl = options.fetch_impl || fetch;
  const start_daemon_impl = options.start_daemon_impl || startManagedDaemon;
  const paths = createWorkerStatePaths(options.root_dir);
  const entry_path = fileURLToPath(
    new URL('./supervisor-entry.js', import.meta.url)
  );
  /** @type {string | null} */
  let base_url = null;

  return {
    /**
     * @param {{ workspace?: string }} [filters]
     */
    async listJobs(filters = {}) {
      const url = await ensureBaseUrl();
      const query = filters.workspace
        ? `?workspace=${encodeURIComponent(filters.workspace)}`
        : '';
      const response = await fetchJson(fetch_impl, `${url}/jobs${query}`);
      return Array.isArray(response.items) ? response.items : [];
    },

    /**
     * @param {{ jobId: string }} input
     */
    async getJob(input) {
      const url = await ensureBaseUrl();
      const response = await fetchJson(
        fetch_impl,
        `${url}/jobs/${encodeURIComponent(input.jobId)}`
      );
      return response.item || null;
    },

    /**
     * @param {{ command: string, issueId?: string, workspace: string, prNumber?: number }} input
     */
    async createJob(input) {
      const url = await ensureBaseUrl();
      return fetchJson(fetch_impl, `${url}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });
    },

    /**
     * @param {{ jobId: string }} input
     */
    async cancelJob(input) {
      const url = await ensureBaseUrl();
      const response = await fetchJson(
        fetch_impl,
        `${url}/jobs/${encodeURIComponent(input.jobId)}/cancel`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({})
        }
      );
      return response.item || null;
    },

    /**
     * @param {{ jobId: string, tail?: number }} input
     */
    async getJobLog(input) {
      const url = await ensureBaseUrl();
      const query = input.tail != null ? `?tail=${input.tail}` : '';
      return fetchJson(
        fetch_impl,
        `${url}/jobs/${encodeURIComponent(input.jobId)}/log${query}`
      );
    }
  };

  async function ensureBaseUrl() {
    if (base_url && (await isHealthy(base_url))) {
      return base_url;
    }

    const owner_record = readOwnerRecord(paths.lock_path);
    if (owner_record?.port) {
      const candidate = `http://127.0.0.1:${owner_record.port}`;
      if (await isHealthy(candidate)) {
        base_url = candidate;
        return base_url;
      }
    }

    start_daemon_impl({
      entry_path,
      runtime_dir: paths.runtime_dir,
      pid_file_name: 'supervisor.pid',
      log_file_name: 'supervisor.log',
      cwd: options.root_dir,
      env: {
        BDUI_WORKER_SUPERVISOR_HOST: '127.0.0.1',
        BDUI_WORKER_SUPERVISOR_PORT: '0'
      }
    });

    const started_url = await waitForSupervisorUrl();
    base_url = started_url;
    return base_url;
  }

  async function waitForSupervisorUrl() {
    const started_at = Date.now();
    while (Date.now() - started_at < 5000) {
      const owner_record = readOwnerRecord(paths.lock_path);
      if (owner_record?.port) {
        const candidate = `http://127.0.0.1:${owner_record.port}`;
        if (await isHealthy(candidate)) {
          return candidate;
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    throw Object.assign(new Error('Worker supervisor unavailable'), {
      code: 'unavailable'
    });
  }

  /**
   * @param {string} url
   */
  async function isHealthy(url) {
    try {
      const response = await fetch_impl(`${url}/healthz`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

/**
 * @param {typeof fetch} fetch_impl
 * @param {string} url
 * @param {RequestInit} [init]
 */
async function fetchJson(fetch_impl, url, init) {
  const response = await fetch_impl(url, init);
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const code =
      response.status === 404
        ? 'not_found'
        : response.status === 409
          ? 'conflict'
          : response.status === 422
            ? 'unprocessable'
            : response.status >= 500
              ? 'unavailable'
              : 'invalid_request';
    throw Object.assign(
      new Error(body.error || 'Worker supervisor request failed'),
      {
        code,
        status: response.status
      }
    );
  }
  return body;
}

/**
 * @param {string} lock_path
 */
function readOwnerRecord(lock_path) {
  try {
    return JSON.parse(fs.readFileSync(lock_path, 'utf8'));
  } catch {
    return null;
  }
}
