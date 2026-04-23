/**
 * @import { Readable } from 'node:stream'
 * @import { SpawnOptions } from 'node:child_process'
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import { terminateProcess } from '../cli/daemon.js';

/**
 * @typedef {{
 *   pid?: number | null,
 *   stdout?: Readable | null,
 *   stderr?: Readable | null,
 *   on: (event_name: string, handler: (...args: any[]) => void) => unknown,
 *   unref?: () => void
 * }} WorkerChildProcess
 */

/**
 * @typedef {{ pid: number | null, child: WorkerChildProcess | null }} StartedWorkerProcess
 */

/**
 * @typedef {boolean | { ok: boolean, forced: boolean }} WorkerCancelResult
 */

/**
 * @typedef {(command: string, args: string[], options: SpawnOptions) => WorkerChildProcess} WorkerSpawn
 */

/**
 * @param {{ command: string, issueId?: string | null, prNumber?: number | null }} input
 * @returns {string}
 */
export function buildWorkerExecTarget(input) {
  if (input.command === 'bd-ralph') {
    if (!input.issueId) {
      throw Object.assign(new Error('Missing issueId for bd-ralph'), {
        code: 'invalid_request'
      });
    }
    return `$bd-ralph ${input.issueId}`;
  }

  const pr_target = input.prNumber ?? input.issueId;
  if (!pr_target) {
    throw Object.assign(new Error('Missing target for pr-review'), {
      code: 'invalid_request'
    });
  }
  return `$pr-review ${pr_target}`;
}

/**
 * @param {{ spawn_impl?: WorkerSpawn, terminate_process_impl?: (pid: number, timeout_ms: number) => Promise<WorkerCancelResult> | WorkerCancelResult }} [options]
 */
export function createWorkerProcessRunner(options = {}) {
  const spawn_impl = options.spawn_impl || /** @type {WorkerSpawn} */ (spawn);
  const terminate_process_impl =
    options.terminate_process_impl ||
    /** @type {(pid: number, timeout_ms: number) => Promise<WorkerCancelResult>} */ (
      terminateProcess
    );

  return {
    /**
     * @param {{ command: string, issueId?: string | null, prNumber?: number | null, workspace: string, log_path: string }} input
     * @returns {StartedWorkerProcess}
     */
    startJob(input) {
      const exec_target = buildWorkerExecTarget(input);
      const log_stream = fs.createWriteStream(input.log_path, { flags: 'a' });

      /** @type {SpawnOptions} */
      const spawn_options = {
        cwd: input.workspace,
        detached: true,
        stdio: ['ignore', 'pipe', 'pipe'],
        windowsHide: true
      };
      const child = spawn_impl('codex', ['exec', exec_target], spawn_options);

      child.stdout?.pipe(log_stream);
      child.stderr?.pipe(log_stream);
      child.on('close', () => {
        log_stream.end();
      });
      child.on('error', () => {
        log_stream.end();
      });
      child.unref?.();

      return {
        pid: typeof child.pid === 'number' ? child.pid : null,
        child
      };
    },

    /**
     * @param {number} pid
     * @param {{ grace_timeout_ms: number }} options
     * @returns {Promise<WorkerCancelResult> | WorkerCancelResult}
     */
    cancelJob(pid, options) {
      return terminate_process_impl(pid, options.grace_timeout_ms);
    }
  };
}
