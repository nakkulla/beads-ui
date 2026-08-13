/**
 * Detached one-shot executor for a pinned RepoOperation script.
 */
import { spawn } from 'node:child_process';
import nodeFs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createProcessController } from './process-controller.js';
import { repoOperationLogDir, repoOperationMarkerPath } from './state-paths.js';

const CHILD_PATH = fileURLToPath(
  new URL('./repo-operation-runner-child.js', import.meta.url)
);

/**
 * @param {{ fs?: typeof import('node:fs'), spawn?: typeof spawn, processController?: ReturnType<typeof createProcessController>, logDir?: typeof repoOperationLogDir, markerPath?: typeof repoOperationMarkerPath }} [deps]
 */
export function createRepoOperationRunner(deps = {}) {
  const fs = deps.fs || nodeFs;
  const spawn_impl = deps.spawn || spawn;
  const controller = deps.processController || createProcessController();
  const logDir = deps.logDir || repoOperationLogDir;
  const markerPath = deps.markerPath || repoOperationMarkerPath;

  /**
   * @param {{ workspace: string, operation_id: string, attempt_id: string, script_path: string, cwd: string, target_sha: string, target_base: string, timeout_ms: number }} input
   */
  function start(input) {
    const log_path = path.join(
      logDir(input.workspace),
      `${input.operation_id}.log`
    );
    const marker_path = markerPath(
      input.workspace,
      input.operation_id,
      input.attempt_id
    );
    fs.mkdirSync(path.dirname(log_path), { recursive: true });
    try {
      fs.unlinkSync(marker_path);
    } catch {
      // A missing prior marker is the normal first-attempt case.
    }
    const protocol_env = {
      REPO_OPS_TARGET_SHA: input.target_sha,
      REPO_OPS_TARGET_BASE: input.target_base,
      REPO_OPS_REPO_ROOT: input.cwd
    };
    const child = spawn_impl(
      process.execPath,
      [
        CHILD_PATH,
        JSON.stringify({
          script_path: input.script_path,
          cwd: input.cwd,
          env: protocol_env,
          log_path,
          marker_path,
          timeout_ms: input.timeout_ms
        })
      ],
      {
        cwd: input.cwd,
        env: {
          PATH: process.env.PATH || '',
          HOME: process.env.HOME || '',
          ...protocol_env
        },
        shell: false,
        detached: process.platform !== 'win32',
        stdio: 'ignore'
      }
    );
    child.unref();
    if (typeof child.pid !== 'number') {
      return { ok: false, code: 'repo_operation_spawn_failed' };
    }
    const captured = controller.capture(child.pid);
    if (!captured.ok) {
      return { ok: false, code: 'repo_operation_identity_failed' };
    }
    return {
      ok: true,
      process_identity: captured.identity,
      log_path,
      marker_path
    };
  }

  /**
   * @param {string} workspace
   * @param {string} operation_id
   * @param {string} attempt_id
   */
  function readMarker(workspace, operation_id, attempt_id) {
    try {
      const marker = JSON.parse(
        fs.readFileSync(markerPath(workspace, operation_id, attempt_id), 'utf8')
      );
      if (
        !marker ||
        typeof marker !== 'object' ||
        typeof marker.started_at !== 'number' ||
        typeof marker.finished_at !== 'number'
      )
        return null;
      return {
        exit_code: Number.isInteger(marker.exit_code) ? marker.exit_code : null,
        signal: typeof marker.signal === 'string' ? marker.signal : null,
        started_at: marker.started_at,
        finished_at: marker.finished_at
      };
    } catch {
      return null;
    }
  }

  return { start, readMarker, processController: controller };
}
