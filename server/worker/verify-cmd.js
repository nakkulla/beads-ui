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
import nodeFs from 'node:fs';
import path from 'node:path';

/**
 * Default verify_cmd timeout for an AUTO-DETECTED command (worker-attempt-
 * resume-verify-autodetect §2.2). Mirrors config.js's DEFAULT_VERIFY_TIMEOUT_MS
 * so a detected command runs on the same 10-minute budget as a configured one.
 *
 * @type {number}
 */
const DEFAULT_VERIFY_TIMEOUT_MS = 600000;

/**
 * @typedef {Object} ResolvedVerifyCmd
 * @property {string[]} cmd - The verify argv (spawned WITHOUT a shell).
 * @property {number} timeout_ms - Deadline in ms.
 * @property {'config'|'detected'} source - Where the command came from:
 * `config` = an explicit `[worker.verify."<abs>"]` section, `detected` = the
 * conservative repo-root toolchain probe below.
 */

/**
 * Conservatively auto-detect a repo's verify command from marker files at the
 * repo root (worker-attempt-resume-verify-autodetect §2.2). This is a FILE
 * existence/content probe only — nothing is executed. The order is fixed:
 *
 *   - `package.json` with a non-empty `scripts.test` → `["npm", "test"]`
 *   - `Cargo.toml`                                   → `["cargo", "test"]`
 *   - `go.mod`                                       → `["go", "test", "./..."]`
 *   - anything else (python etc., ambiguous toolchain/venv) → null (no detection;
 *     an explicit config section is required).
 *
 * @param {string} repo - Absolute (or resolvable) target repo root.
 * @param {{ fs?: typeof import('node:fs') }} [deps]
 * @returns {string[]|null}
 */
export function detectVerifyCmd(repo, deps = {}) {
  const fs = deps.fs || nodeFs;
  const root = path.resolve(String(repo || ''));
  const pkg_path = path.join(root, 'package.json');
  try {
    if (fs.existsSync(pkg_path)) {
      const pkg = JSON.parse(fs.readFileSync(pkg_path, 'utf8'));
      const test_script =
        pkg && pkg.scripts && typeof pkg.scripts === 'object'
          ? pkg.scripts.test
          : undefined;
      if (typeof test_script === 'string' && test_script.length > 0) {
        return ['npm', 'test'];
      }
    }
  } catch {
    // A malformed package.json is not a detection — fall through.
  }
  try {
    if (fs.existsSync(path.join(root, 'Cargo.toml'))) {
      return ['cargo', 'test'];
    }
    if (fs.existsSync(path.join(root, 'go.mod'))) {
      return ['go', 'test', './...'];
    }
  } catch {
    // Probe error → no detection.
  }
  return null;
}

/**
 * Resolve a repo's verify command with the fixed precedence
 * (worker-attempt-resume-verify-autodetect §2.1): an explicit config section
 * ALWAYS wins, then auto-detection, then none. The return carries `source` so
 * the queue `workspace_info` + the ctrl bar can flag a detected command
 * (`(자동 감지)`); a null return keeps the existing auto_merge→pr_stop demotion.
 *
 * @param {string} repo - Absolute (or resolvable) target repo root.
 * @param {Record<string, { cmd: string[], timeout_ms: number }>|null|undefined} config_map
 * The normalized `[worker.verify]` config sections keyed by resolved path.
 * @param {{ fs?: typeof import('node:fs') }} [deps]
 * @returns {ResolvedVerifyCmd|null}
 */
export function resolveVerifyCmd(repo, config_map, deps = {}) {
  const key = path.resolve(String(repo || ''));
  const configured = config_map ? config_map[key] : null;
  if (
    configured &&
    Array.isArray(configured.cmd) &&
    configured.cmd.length > 0
  ) {
    return {
      cmd: configured.cmd.slice(),
      timeout_ms:
        typeof configured.timeout_ms === 'number' && configured.timeout_ms > 0
          ? configured.timeout_ms
          : DEFAULT_VERIFY_TIMEOUT_MS,
      source: 'config'
    };
  }
  const detected = detectVerifyCmd(repo, deps);
  if (detected) {
    return {
      cmd: detected,
      timeout_ms: DEFAULT_VERIFY_TIMEOUT_MS,
      source: 'detected'
    };
  }
  return null;
}

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
