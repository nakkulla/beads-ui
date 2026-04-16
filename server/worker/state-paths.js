import fs from 'node:fs';
import path from 'node:path';

const WORKER_STATE_SEGMENTS = ['.bdui', 'worker-jobs'];

/**
 * @param {string} root_dir
 */
export function createWorkerStatePaths(root_dir) {
  const resolved_root = path.resolve(root_dir);
  const state_root = path.join(resolved_root, ...WORKER_STATE_SEGMENTS);
  const runtime_dir = path.join(state_root, 'runtime');

  return {
    root_dir: resolved_root,
    state_root,
    database_path: path.join(state_root, 'jobs.sqlite'),
    logs_dir: path.join(state_root, 'logs'),
    runtime_dir,
    lock_path: path.join(runtime_dir, 'supervisor.lock'),
    pid_file_path: path.join(runtime_dir, 'supervisor.pid'),
    supervisor_log_path: path.join(runtime_dir, 'supervisor.log')
  };
}

/**
 * @param {{ state_root: string, logs_dir: string, runtime_dir: string }} paths
 */
export function ensureWorkerStateDirs(paths) {
  fs.mkdirSync(paths.state_root, { recursive: true, mode: 0o700 });
  fs.mkdirSync(paths.logs_dir, { recursive: true, mode: 0o700 });
  fs.mkdirSync(paths.runtime_dir, { recursive: true, mode: 0o700 });
}

/**
 * @param {string} job_id
 */
export function buildWorkerLogRelativePath(job_id) {
  return path.join('.bdui', 'worker-jobs', 'logs', `${job_id}.log`);
}
