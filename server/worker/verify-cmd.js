/**
 * Independent post-merge verification runner (worker-autorun-policy §4).
 *
 * Runs the workspace-configured `verify_cmd` (argv array, NO shell) inside a
 * clean detached worktree pinned to the observed merge SHA. Owned by the
 * WORKER process — the session cannot influence it — and returns THREE
 * distinct failure reasons so the attempt record can tell them apart:
 *
 *   - `verify_cmd_timeout`     — the deadline hit (tracked by a flag here;
 *     `runShell` overloads a timeout kill onto the exit code, so this module
 *     spawns directly instead of reusing it),
 *   - `verify_cmd_failed`      — spawned, exited non-zero,
 *   - `verify_cmd_spawn_error` — never spawned (missing binary, empty argv) —
 *     runShell's code-127 overload cannot distinguish this from an exit 127.
 */
import { spawn } from 'node:child_process';

/**
 * @typedef {Object} VerifyCmdResult
 * @property {boolean} ok - Exit 0 within the deadline.
 * @property {'ok'|'verify_cmd_failed'|'verify_cmd_timeout'|'verify_cmd_spawn_error'} reason
 * @property {number|null} exit - Exit code when the process ran to completion.
 */

/**
 * Run a verify_cmd argv to completion.
 *
 * @param {{
 *   cwd: string,
 *   cmd: string[],
 *   timeout_ms: number,
 *   spawn_impl?: typeof spawn
 * }} input
 * @returns {Promise<VerifyCmdResult>}
 */
export function runVerifyCmd(input) {
  const spawn_impl = input.spawn_impl || spawn;
  if (
    !Array.isArray(input.cmd) ||
    input.cmd.length === 0 ||
    input.cmd.some((a) => typeof a !== 'string' || a.length === 0)
  ) {
    return Promise.resolve({
      ok: false,
      reason: 'verify_cmd_spawn_error',
      exit: null
    });
  }

  return new Promise((resolve) => {
    /** @type {import('node:child_process').ChildProcess} */
    let child;
    try {
      child = spawn_impl(input.cmd[0], input.cmd.slice(1), {
        cwd: input.cwd,
        shell: false,
        stdio: 'ignore',
        windowsHide: true
      });
    } catch {
      resolve({ ok: false, reason: 'verify_cmd_spawn_error', exit: null });
      return;
    }

    let settled = false;
    let timed_out = false;
    /** @type {ReturnType<typeof setTimeout> | undefined} */
    let timer;
    if (input.timeout_ms > 0) {
      timer = setTimeout(() => {
        timed_out = true;
        try {
          child.kill('SIGKILL');
        } catch {
          // Best-effort; close still fires.
        }
      }, input.timeout_ms);
      timer.unref?.();
    }

    /**
     * @param {VerifyCmdResult} result
     */
    const finish = (result) => {
      if (settled) {
        return;
      }
      settled = true;
      if (timer) {
        clearTimeout(timer);
      }
      resolve(result);
    };

    child.on('error', () => {
      finish({ ok: false, reason: 'verify_cmd_spawn_error', exit: null });
    });
    child.on('close', (code) => {
      if (timed_out) {
        finish({ ok: false, reason: 'verify_cmd_timeout', exit: null });
        return;
      }
      const exit = typeof code === 'number' ? code : null;
      if (exit === 0) {
        finish({ ok: true, reason: 'ok', exit });
      } else {
        finish({ ok: false, reason: 'verify_cmd_failed', exit });
      }
    });
  });
}
