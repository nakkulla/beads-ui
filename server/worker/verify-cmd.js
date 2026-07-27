/**
 * Independent PRE-MERGE verification runner (worker-phase2 §5).
 *
 * Runs the workspace-configured `verify_cmd` (argv array, NO shell) inside a
 * clean detached worktree pinned to an exact commit. The MECHANISM is unchanged
 * from the retired post-merge runner (worker-autorun-policy §4); only the pin
 * moved: it used to be the observed merge SHA AFTER an unattended merge, and is
 * now the PR's head SHA BEFORE a human merge click, so the command stands in
 * for CI on repos that have none. Owned by the WORKER process — the session
 * cannot influence it — and returns THREE distinct failure reasons so the
 * observation record can tell them apart:
 *
 *   - `verify_cmd_timeout`     — the deadline hit (tracked by a flag here;
 *     `runShell` overloads a timeout kill onto the exit code, so this module
 *     spawns directly instead of reusing it),
 *   - `verify_cmd_failed`      — spawned, exited non-zero,
 *   - `verify_cmd_spawn_error` — never spawned (missing binary, empty argv) —
 *     runShell's code-127 overload cannot distinguish this from an exit 127.
 *
 * {@link runVerifyAtSha} adds the two SETUP outcomes that only exist now that
 * the pin is a remote PR head rather than a commit the worker just produced
 * (`verify_sha_unavailable` / `verify_worktree_failed`); the three run outcomes
 * above are untouched, as is the `[worker.verify."<abs>"]` config schema.
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
 * (`(자동 감지)`). A null return means the workspace has no local verification
 * signal, which drops the merge gate to its third tier ("검증 신호 없음") when
 * the repo also reports no CI (worker-phase2 §5) — the retired auto_merge
 * demotion is gone with the merge axis.
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
 * Upper bound on a preserved diagnostic string — enough to name a git failure,
 * not enough to bloat `queue.json`.
 *
 * @type {number}
 */
const DETAIL_MAX = 512;

/**
 * Reduce a thrown value to the diagnostic text worth persisting.
 *
 * @param {unknown} err
 * @returns {string}
 */
function errorDetail(err) {
  const text =
    err instanceof Error
      ? err.message
      : typeof err === 'string'
        ? err
        : String(err);
  return text.trim().slice(0, DETAIL_MAX);
}

/**
 * Rolling capture window for the verify command's own output (UI-qult §1). The
 * process may print megabytes; only the END is diagnostic, so the buffer is
 * trimmed from the front to keep memory bounded. 16KB comfortably covers both
 * caps below, so neither the line cap nor the char cap can lose a line the
 * other would have kept.
 *
 * @type {number}
 */
const TAIL_WINDOW = 16384;

/**
 * How many trailing lines of the captured output survive into the result.
 *
 * @type {number}
 */
const TAIL_MAX_LINES = 100;

/**
 * Hard character cap on the preserved tail — a `queue.json` bound, applied
 * after the line cap.
 *
 * @type {number}
 */
const TAIL_MAX_CHARS = 8192;

/**
 * @typedef {Object} VerifyCmdResult
 * @property {boolean} ok - Exit 0 within the deadline.
 * @property {'ok'|'verify_cmd_failed'|'verify_cmd_timeout'|'verify_cmd_spawn_error'|'verify_sha_unavailable'|'verify_worktree_failed'} reason
 * @property {number|null} exit - Exit code when the process ran to completion.
 * @property {string} [detail] - Diagnostic text for a failure whose reason
 * alone cannot be acted on (today: the git stderr behind
 * `verify_worktree_failed`, UI-2o4z §3). Absent when there is nothing to add.
 * @property {string} [output_tail] - The tail of the command's own stdout+stderr
 * (UI-qult §1), interleaved in ARRIVAL order because that is the order a human
 * reading a terminal would have seen. Present only on `verify_cmd_failed` /
 * `verify_cmd_timeout` with non-empty output; absent on success, on a spawn
 * error (nothing ran), and on a run that printed nothing.
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
        // Piped so the failure's own output can be preserved (UI-qult §1). Both
        // pipes are drained below — an unread pipe would stall the child once
        // its buffer fills.
        stdio: ['ignore', 'pipe', 'pipe'],
        windowsHide: true
      });
    } catch {
      resolve({ ok: false, reason: 'verify_cmd_spawn_error', exit: null });
      return;
    }

    // ONE shared buffer for both streams: a verify failure is read as a
    // terminal transcript, and collecting the two streams separately would
    // reorder the stderr line against the stdout line that explains it.
    let captured = '';
    /**
     * @param {import('node:stream').Readable|null|undefined} stream
     */
    const capture = (stream) => {
      if (!stream) {
        return;
      }
      stream.setEncoding('utf8');
      stream.on('data', (/** @type {string} */ chunk) => {
        captured += chunk;
        if (captured.length > TAIL_WINDOW) {
          captured = captured.slice(captured.length - TAIL_WINDOW);
        }
      });
      // Capture is best-effort: a broken pipe must never change the verdict.
      stream.on('error', () => {});
    };
    capture(child.stdout);
    capture(child.stderr);

    /**
     * @returns {string}
     */
    const outputTail = () => {
      const lines = captured.split('\n');
      // A normal trailing newline leaves an empty last element; counting it as
      // a line would drop a real one from the far end of the window.
      if (lines.length > 0 && lines[lines.length - 1] === '') {
        lines.pop();
      }
      const text = lines.slice(-TAIL_MAX_LINES).join('\n');
      return (
        text.length > TAIL_MAX_CHARS
          ? text.slice(text.length - TAIL_MAX_CHARS)
          : text
      ).trim();
    };

    /**
     * @param {VerifyCmdResult} result
     * @returns {VerifyCmdResult}
     */
    const withTail = (result) => {
      const tail = outputTail();
      return tail.length > 0 ? { ...result, output_tail: tail } : result;
    };

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
        // Partial output is the most diagnostic thing a timeout leaves behind —
        // it says WHERE the command stopped making progress.
        finish(
          withTail({ ok: false, reason: 'verify_cmd_timeout', exit: null })
        );
        return;
      }
      const exit = typeof code === 'number' ? code : null;
      if (exit === 0) {
        finish({ ok: true, reason: 'ok', exit });
      } else {
        finish(withTail({ ok: false, reason: 'verify_cmd_failed', exit }));
      }
    });
  });
}

/**
 * Make a commit available in the local object database.
 *
 * The PR head is NOT guaranteed to exist locally: the branch may have been
 * pushed from another clone, the session's `.worktrees/<bead>` may already be
 * gone, a conflict-resolution push may have advanced the head, or the server
 * may have been restarted onto a fresh checkout. Verifying a SHA the repo has
 * never heard of would fail at `git worktree add`, so the head is fetched first.
 *
 * `refs/pull/<N>/head` is GitHub's guaranteed handle for a PR head and is
 * fetched by REF (always allowed), unlike a bare-SHA fetch which only works
 * when the server enables `uploadpack.allowReachableSHA1InWant`. The bare-SHA
 * fetch is kept as a last resort for the no-number case. Nothing is merged,
 * checked out, or written to any local ref — this only populates objects.
 *
 * @param {(args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>} git
 * @param {string} repo
 * @param {string} sha
 * @param {number|null} pr_number
 * @returns {Promise<boolean>}
 */
async function ensureCommitPresent(git, repo, sha, pr_number) {
  /**
   * @returns {Promise<boolean>}
   */
  const present = async () => {
    try {
      const r = await git(['cat-file', '-e', `${sha}^{commit}`], { cwd: repo });
      return r.code === 0;
    } catch {
      return false;
    }
  };
  if (await present()) {
    return true;
  }
  if (typeof pr_number === 'number' && Number.isInteger(pr_number)) {
    try {
      await git(
        ['fetch', '--no-tags', 'origin', `refs/pull/${pr_number}/head`],
        { cwd: repo }
      );
    } catch {
      // Fall through to the bare-SHA attempt below.
    }
    if (await present()) {
      return true;
    }
  }
  try {
    await git(['fetch', '--no-tags', 'origin', sha], { cwd: repo });
  } catch {
    return false;
  }
  return present();
}

/**
 * Run the resolved `verify_cmd` against an exact PR head SHA (worker-phase2
 * §5): fetch the commit if the repo does not have it, add a DETACHED worktree
 * pinned to it, run the command there, and tear the worktree down whatever
 * happens. The caller binds the returned result to `sha` — a result is only
 * ever valid for the commit it ran on.
 *
 * @param {{
 *   repo: string,
 *   bead_id: string,
 *   sha: string,
 *   pr_number?: number|null,
 *   cmd: string[],
 *   timeout_ms: number,
 *   worktree: {
 *     addDetached: (input: { repo: string, name: string, sha: string }) => Promise<{ path: string }>,
 *     removeDetached: (input: { repo: string, name: string }) => Promise<{ code: number, stderr: string }>,
 *     withTopologyLock: <T>(repo: string, fn: () => Promise<T>) => Promise<T>
 *   },
 *   git: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   spawn_impl?: typeof spawn
 * }} input
 * @returns {Promise<VerifyCmdResult>}
 */
export async function runVerifyAtSha(input) {
  if (typeof input.sha !== 'string' || input.sha.length === 0) {
    return { ok: false, reason: 'verify_sha_unavailable', exit: null };
  }
  // The fetch writes this repo's object/ref database, so it runs under the same
  // topology lock the worktree operations take (worker-phase2 §8). The lock is
  // released BEFORE `addDetached`, which takes it itself — holding it across
  // that call would deadlock on a non-reentrant mutex.
  const available = await input.worktree.withTopologyLock(input.repo, () =>
    ensureCommitPresent(
      input.git,
      input.repo,
      input.sha,
      input.pr_number ?? null
    )
  );
  if (!available) {
    return { ok: false, reason: 'verify_sha_unavailable', exit: null };
  }
  // Distinct from the bead's own `.worktrees/<bead_id>` (which a resume still
  // owns) and distinct per SHA, so a concurrent verification of an older head
  // cannot collide with this one.
  const name = `verify-${input.bead_id}-${input.sha.slice(0, 7)}`;
  /** @type {{ path: string }} */
  let wt;
  try {
    wt = await input.worktree.addDetached({
      repo: input.repo,
      name,
      sha: input.sha
    });
  } catch (err) {
    // The thrown message carries git's own stderr, which is the only thing that
    // says WHY the detached worktree could not be created — dropping it left an
    // unfalsifiable "transient?" guess behind (UI-2o4z §3).
    return {
      ok: false,
      reason: 'verify_worktree_failed',
      exit: null,
      detail: errorDetail(err)
    };
  }
  try {
    return await runVerifyCmd({
      cwd: wt.path,
      cmd: input.cmd,
      timeout_ms: input.timeout_ms,
      spawn_impl: input.spawn_impl
    });
  } finally {
    try {
      await input.worktree.removeDetached({ repo: input.repo, name });
    } catch {
      // Best-effort teardown; a leftover detached worktree is reaped by the
      // next `git worktree prune` and must never mask the verdict.
    }
  }
}
