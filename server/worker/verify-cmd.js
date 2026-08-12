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
import os from 'node:os';
import path from 'node:path';
import { debug } from '../logging.js';
import { errorDetail } from './error-detail.js';
import { deployLogDir, verifyLogDir } from './state-paths.js';

export { errorDetail } from './error-detail.js';

const log = debug('worker:verify-cmd');

/**
 * Last-resort verify_cmd timeout, mirroring config.js's own
 * DEFAULT_VERIFY_TIMEOUT_MS. Normalization belongs to `normalizeWorkerVerify`
 * in config.js; this only guards a map injected past that contract.
 *
 * @type {number}
 */
const DEFAULT_VERIFY_TIMEOUT_MS = 600000;

/**
 * @typedef {Object} ResolvedVerifyCmd
 * @property {string[]} cmd - The verify argv (spawned WITHOUT a shell).
 * @property {number} timeout_ms - Deadline in ms.
 */

/**
 * Resolve a repo's verify command from the ONE place it can be defined: an
 * explicit `[worker.verify."<abs>"]` section in `config.toml` (UI-uk6d). The
 * repo-root toolchain probe of worker-attempt-resume-verify-autodetect §2.2 is
 * retired — a guessed command is not the repo's canonical verification
 * (`External/beads` had to override the probe's `go test ./...`, which fails on
 * the ICU cgo build, with `make test`), and a wrong guess buys either false
 * trust when green or a false block when red.
 *
 * A null return means the workspace has no local verification signal, which
 * drops the merge gate to its third tier ("검증 신호 없음") when the repo also
 * reports no CI (worker-phase2 §5) — an intended outcome, since the merge click
 * is then the human judgement.
 *
 * @param {string} repo - Absolute (or resolvable) target repo root.
 * @param {Record<string, { cmd: string[], timeout_ms: number }>|null|undefined} config_map
 * The normalized `[worker.verify]` config sections keyed by resolved path.
 * @returns {ResolvedVerifyCmd|null}
 */
export function resolveVerifyCmd(repo, config_map) {
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
          : DEFAULT_VERIFY_TIMEOUT_MS
    };
  }
  return null;
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
 * Hard per-file cap on a preserved run log (UI-0x54). Output past it is
 * dropped rather than truncating the FRONT: the tail already survives in
 * `queue.json`, so what the log file exists to keep is the beginning — the
 * failure summary a long runner prints before the rest of its output.
 *
 * @type {number}
 */
const LOG_MAX_BYTES = 10 * 1024 * 1024;

/**
 * How many run logs a workspace keeps PER KIND. Every run writes one (a passing
 * run is the comparison baseline for the next failure), so rotation — not
 * selective writing — is what bounds the directory.
 *
 * @type {number}
 */
const LOG_KEEP = 20;

/**
 * The one line appended when {@link LOG_MAX_BYTES} was hit, so a truncated log
 * cannot be misread as a complete one.
 *
 * @type {string}
 */
const LOG_TRUNCATED_MARKER = `\n[bdui] output truncated at ${LOG_MAX_BYTES} bytes — the rest of this run's output was dropped.\n`;

/**
 * How much of {@link LOG_MAX_BYTES} the command's OWN output may use. The
 * marker's room is reserved up front so the cap holds for the finished FILE —
 * appending the marker on top of a full budget would push every truncated log
 * past the bound it advertises.
 *
 * @type {number}
 */
const LOG_DATA_MAX_BYTES =
  LOG_MAX_BYTES - Buffer.byteLength(LOG_TRUNCATED_MARKER, 'utf8');

/**
 * Where a run's full output is preserved (UI-0x54). Explicit because
 * `runVerifyCmd`'s `cwd` may be a throwaway detached worktree that cannot name a
 * stable state directory; a caller that omits this writes no log at all.
 *
 * @typedef {Object} VerifyLogContext
 * @property {'verify'|'deploy'} kind - Which RUN this is, which picks the log
 * directory and the filename prefix (UI-l53x §1). REQUIRED with no default on
 * purpose: an implicit fallback would let a new caller write into the wrong
 * kind's rotation budget without saying so.
 * @property {string} workspace_root - The REPO root the log dir is keyed on
 * (never the detached worktree `cwd`).
 * @property {string} bead_id
 * @property {string} sha
 * @property {number} started_at_ms - Run start, which is also the filename's
 * timestamp component.
 * @property {number} [attempt] - Retry attempt ordinal, included in the
 * filename when bounded flake retry is enabled.
 */

/**
 * `kind` → where its logs live and what their filenames start with. Owned HERE
 * so callers pass an intent and know nothing about naming or rotation policy.
 *
 * @type {Record<string, { dir: (workspace_root: string) => string, prefix: string }>}
 */
const RUN_LOG_KINDS = {
  verify: { dir: verifyLogDir, prefix: 'verify' },
  deploy: { dir: deployLogDir, prefix: 'deploy' }
};

/**
 * Delete the oldest logs so the directory holds at most {@link LOG_KEEP} files
 * of this prefix once the run about to start has added its own. Best-effort
 * throughout: a directory that cannot be listed or a file that cannot be removed
 * only means this run skips the pruning.
 *
 * @param {typeof import('node:fs')} fs
 * @param {string} dir
 * @param {string} prefix
 */
function rotateRunLogs(fs, dir, prefix) {
  /** @type {{ file: string, mtime_ms: number }[]} */
  const entries = [];
  /** @type {string[]} */
  let names;
  try {
    names = fs.readdirSync(dir);
  } catch {
    return;
  }
  for (const name of names) {
    if (!name.startsWith(`${prefix}-`) || !name.endsWith('.log')) {
      continue;
    }
    const file = path.join(dir, name);
    try {
      entries.push({ file, mtime_ms: fs.statSync(file).mtimeMs });
    } catch {
      // Vanished or unreadable — nothing to rotate.
    }
  }
  const excess = entries.length - (LOG_KEEP - 1);
  if (excess <= 0) {
    return;
  }
  entries.sort((a, b) => a.mtime_ms - b.mtime_ms);
  for (const entry of entries.slice(0, excess)) {
    try {
      fs.rmSync(entry.file, { force: true });
    } catch {
      // Best-effort rotation.
    }
  }
}

/**
 * Write a whole buffer, however many syscalls that takes.
 *
 * `writeSync` is allowed to write FEWER bytes than it was given and report the
 * count; taking the call's return for granted would silently drop the middle of
 * a log while still reporting a complete file. A call that makes no progress at
 * all is a failure — retrying it forever would hang the verify run.
 *
 * @param {typeof import('node:fs')} fs
 * @param {number} fd
 * @param {Buffer} buf
 */
function writeFully(fs, fd, buf) {
  let offset = 0;
  while (offset < buf.length) {
    const n = fs.writeSync(fd, buf, offset, buf.length - offset);
    if (!(n > 0)) {
      throw new Error(`short write: no progress at offset ${offset}`);
    }
    offset += n;
  }
}

/**
 * Open the full-output log for one verify or deploy run.
 *
 * Fail-quiet by construction: a null return (an unknown `kind`, or a failed
 * open) means the run simply goes unlogged, and a failure at any later stage
 * clears the path so the result never points at a file that may be incomplete.
 *
 * @param {VerifyLogContext} log_context
 * @param {typeof import('node:fs')} fs
 * @returns {{ write: (chunk: string) => void, finish: () => string|null }|null}
 */
function openRunLog(log_context, fs) {
  const spec = RUN_LOG_KINDS[String(log_context.kind)];
  if (!spec) {
    log('run log skipped for unknown kind %o', log_context.kind);
    return null;
  }
  const dir = spec.dir(log_context.workspace_root);
  const safe_bead = String(log_context.bead_id || 'bead').replace(
    /[^A-Za-z0-9._-]/g,
    '_'
  );
  const sha7 = String(log_context.sha || '').slice(0, 7);
  const attempt = log_context.attempt;
  const attempt_suffix =
    typeof attempt === 'number' && Number.isInteger(attempt) && attempt > 0
      ? `-r${attempt}`
      : '';
  const file = path.join(
    dir,
    `${spec.prefix}-${safe_bead}-${sha7}-${log_context.started_at_ms}${attempt_suffix}.log`
  );
  /** @type {number} */
  let fd;
  try {
    fs.mkdirSync(dir, { recursive: true });
    rotateRunLogs(fs, dir, spec.prefix);
    fd = fs.openSync(file, 'w');
  } catch (err) {
    log('run log open failed for %s: %s', file, errorDetail(err));
    return null;
  }
  let written = 0;
  let truncated = false;
  let failed = false;
  let closed = false;
  return {
    /**
     * @param {string} chunk
     */
    write(chunk) {
      if (failed || closed) {
        return;
      }
      const buf = Buffer.from(chunk, 'utf8');
      const room = LOG_DATA_MAX_BYTES - written;
      if (buf.length > room) {
        truncated = true;
      }
      if (room <= 0) {
        return;
      }
      const slice = buf.length > room ? buf.subarray(0, room) : buf;
      try {
        writeFully(fs, fd, slice);
        written += slice.length;
      } catch (err) {
        failed = true;
        log('run log write failed for %s: %s', file, errorDetail(err));
      }
    },

    /**
     * Flush the truncation marker and close. Returns the log path ONLY when
     * every stage succeeded.
     *
     * @returns {string|null}
     */
    finish() {
      if (closed) {
        return null;
      }
      closed = true;
      if (truncated && !failed) {
        try {
          writeFully(fs, fd, Buffer.from(LOG_TRUNCATED_MARKER, 'utf8'));
        } catch (err) {
          failed = true;
          log('run log write failed for %s: %s', file, errorDetail(err));
        }
      }
      try {
        fs.closeSync(fd);
      } catch (err) {
        failed = true;
        log('run log close failed for %s: %s', file, errorDetail(err));
      }
      return failed ? null : file;
    }
  };
}

/**
 * @typedef {Object} VerifyCmdResult
 * @property {boolean} ok - Exit 0 within the deadline.
 * @property {'ok'|'verify_cmd_failed'|'verify_cmd_timeout'|'verify_cmd_spawn_error'|'verify_sha_unavailable'|'verify_worktree_failed'} reason
 * @property {number|null} exit - Exit code when the process ran to completion.
 * @property {string} [detail] - Diagnostic text for a failure whose reason
 * alone cannot be acted on: the git stderr behind `verify_worktree_failed`
 * (UI-2o4z §3), and the thrown/emitted error behind a `verify_cmd_spawn_error`
 * that Node reported — ENOENT and EACCES are the same reason word otherwise
 * (UI-l53x §1). Absent when there is nothing to add, which includes the argv
 * validation failure below: nothing was thrown there.
 * @property {string} [output_tail] - The tail of the command's own stdout+stderr
 * (UI-qult §1), interleaved in ARRIVAL order because that is the order a human
 * reading a terminal would have seen. Present only on `verify_cmd_failed` /
 * `verify_cmd_timeout` with non-empty output; absent on success, on a spawn
 * error (nothing ran), and on a run that printed nothing.
 * @property {string} [log_path] - Absolute path to the run's FULL preserved
 * output (UI-0x54). Present only when a `log_context` was given AND every log
 * stage — open, writes, close — succeeded; a path to a possibly incomplete file
 * is worse than none.
 * @property {{ reason: VerifyCmdResult['reason'], log_path?: string }[]} [attempts]
 * The bounded retry history. Present only when `retry_flaky` was enabled.
 */

/**
 * The `verify_cmd_spawn_error` result, carrying whatever Node reported as
 * `detail` (UI-l53x §1). Both spawn-failure paths — the synchronous throw and
 * the asynchronous `error` event — used to drop it, which left the shared deploy
 * path unable to tell a missing binary from an unexecutable one.
 *
 * @param {unknown} err
 * @returns {VerifyCmdResult}
 */
function spawnErrorResult(err) {
  /** @type {VerifyCmdResult} */
  const result = { ok: false, reason: 'verify_cmd_spawn_error', exit: null };
  if (err === null || err === undefined) {
    return result;
  }
  return { ...result, detail: errorDetail(err) };
}

/**
 * Run a verify_cmd argv to completion.
 *
 * @param {{
 *   cwd: string,
 *   cmd: string[],
 *   timeout_ms: number,
 *   spawn_impl?: typeof spawn,
 *   log_context?: VerifyLogContext|null,
 *   fs_impl?: typeof import('node:fs')
 *   env?: NodeJS.ProcessEnv
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
        env: input.env || process.env,
        shell: false,
        // Piped so the failure's own output can be preserved (UI-qult §1). Both
        // pipes are drained below — an unread pipe would stall the child once
        // its buffer fills.
        stdio: ['ignore', 'pipe', 'pipe'],
        windowsHide: true
      });
    } catch (err) {
      // Resolved BEFORE the log is opened below, so this branch never has a
      // file — the reason already says nothing ran, and `detail` is the only
      // thing that can name WHY (UI-l53x §1/§2).
      resolve(spawnErrorResult(err));
      return;
    }

    // The full-output log runs ALONGSIDE the rolling tail window (UI-0x54):
    // the window keeps the end for `queue.json`, the file keeps everything for
    // a human. Absent `log_context` there is no file.
    const log_writer = input.log_context
      ? openRunLog(input.log_context, input.fs_impl || nodeFs)
      : null;

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
        if (log_writer) {
          log_writer.write(chunk);
        }
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
      // The path is only attached once the file is fully flushed and closed —
      // and never at the cost of the verdict, which is already decided here.
      const log_path = log_writer ? log_writer.finish() : null;
      resolve(log_path ? { ...result, log_path } : result);
    };

    // Unlike the synchronous throw above, this fires AFTER the log was opened,
    // so `finish` attaches the path of an EMPTY file. Left as is deliberately:
    // the reason already says nothing ran, so an empty log does not contradict
    // it, and suppressing it here would change verify's own behaviour.
    child.on('error', (/** @type {unknown} */ err) => {
      finish(spawnErrorResult(err));
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
 * Tail of the pending verify lifecycle chain per `<repo>\0<name>` key (UI-egj7
 * §2). Entries are deleted once their own chain is the last one, so the map
 * never grows past the runs actually in flight.
 *
 * @type {Map<string, Promise<void>>}
 */
const lifecycle_chains = new Map();

/**
 * Serialize the WHOLE add→verify→remove lifecycle of one detached verify
 * worktree name (UI-egj7 §2).
 *
 * The same `(repo, bead_id, sha)` verify really can run twice at once: the
 * poller's `verifying` set guards only the poller, and a click-time re-verify
 * (`pr-actions`'s `gateNow`) shares no guard with it. Before §1 the loser's
 * `worktree add` merely failed; with the reclaim ladder in place the loser
 * would instead DESTROY the winner's live worktree mid-run. Serializing here is
 * what keeps that ladder safe to be unconditional.
 *
 * The second run reclaims and re-runs rather than reusing the first verdict —
 * duplicated work is accepted because the caller-level result cache
 * (`recordVerify`) already absorbs most of it, and correctness comes first.
 *
 * LOCK ORDER: this mutex is always taken OUTSIDE the repo topology lock (which
 * only ever wraps raw git calls inside `worktree`), so the two cannot deadlock.
 *
 * @template T
 * @param {string} key
 * @param {() => Promise<T>} fn
 * @returns {Promise<T>}
 */
function withLifecycleMutex(key, fn) {
  const prior = lifecycle_chains.get(key) ?? Promise.resolve();
  const run = prior.then(fn);
  // The stored tail never rejects: a failed run must not poison the next one.
  const chain = run.then(
    () => {},
    () => {}
  );
  lifecycle_chains.set(key, chain);
  chain.then(() => {
    if (lifecycle_chains.get(key) === chain) {
      lifecycle_chains.delete(key);
    }
  });
  return run;
}

/**
 * Run the resolved `verify_cmd` against an exact PR head SHA (worker-phase2
 * §5): fetch the commit if the repo does not have it, add a DETACHED worktree
 * pinned to it, run the command there, and tear the worktree down whatever
 * happens. The caller binds the returned result to `sha` — a result is only
 * ever valid for the commit it ran on.
 *
 * The run's FULL output is preserved under the repo's own state dir and
 * returned as `log_path` (UI-0x54): the worktree it ran in is gone by the time
 * anyone reads the failure, and the tail in `queue.json` is capped.
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
 *   spawn_impl?: typeof spawn,
 *   fs_impl?: typeof import('node:fs'),
 *   isolation_fs?: any,
 *   retry_flaky?: boolean
 * }} input
 * @returns {Promise<VerifyCmdResult>}
 */
export async function runVerifyAtSha(input) {
  const retry_flaky = input.retry_flaky === true;
  const isolation_fs = input.isolation_fs || nodeFs;
  /**
   * @param {VerifyCmdResult[]} results
   * @returns {VerifyCmdResult}
   */
  const with_attempts = (results) => {
    const final_result = results[results.length - 1];
    return {
      ...final_result,
      attempts: results.map((result) => ({
        reason: result.reason,
        log_path: result.log_path
      }))
    };
  };

  if (typeof input.sha !== 'string' || input.sha.length === 0) {
    const result = /** @type {VerifyCmdResult} */ ({
      ok: false,
      reason: 'verify_sha_unavailable',
      exit: null
    });
    return retry_flaky ? with_attempts([result]) : result;
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
    const result = /** @type {VerifyCmdResult} */ ({
      ok: false,
      reason: 'verify_sha_unavailable',
      exit: null
    });
    return retry_flaky ? with_attempts([result]) : result;
  }
  // Distinct from the bead's own `.worktrees/<bead_id>` (which a resume still
  // owns) and distinct per SHA, so a concurrent verification of an older head
  // cannot collide with this one.
  const name = `verify-${input.bead_id}-${input.sha.slice(0, 7)}`;
  // The whole lifecycle — reclaim + add, run, teardown — is one critical
  // section per worktree name (UI-egj7 §2); `ensureCommitPresent` above is
  // name-independent and stays outside it.
  return withLifecycleMutex(`${input.repo}\0${name}`, async () => {
    /**
     * @param {number|undefined} attempt
     * @returns {Promise<VerifyCmdResult>}
     */
    const run_attempt = async (attempt) => {
      /** @type {{ path: string }} */
      let wt;
      try {
        wt = await input.worktree.addDetached({
          repo: input.repo,
          name,
          sha: input.sha
        });
      } catch (err) {
        // The thrown message carries git's own stderr, which is the only thing
        // that says WHY the detached worktree could not be created — dropping it
        // left an unfalsifiable "transient?" guess behind (UI-2o4z §3).
        return {
          ok: false,
          reason: 'verify_worktree_failed',
          exit: null,
          detail: errorDetail(err)
        };
      }
      /** @type {string|null} */
      let isolated_root = null;
      try {
        const created_root = isolation_fs.mkdtempSync(
          path.join(os.tmpdir(), 'bdui-verify-')
        );
        isolated_root = created_root;
        isolation_fs.mkdirSync(path.join(created_root, 'config'), {
          recursive: true
        });
        isolation_fs.writeFileSync(
          path.join(created_root, 'config', 'config.toml'),
          ''
        );
      } catch {
        if (isolated_root) {
          try {
            isolation_fs.rmSync(isolated_root, {
              recursive: true,
              force: true
            });
          } catch {
            // Isolation setup failure remains the actionable verdict.
          }
        }
        try {
          await input.worktree.removeDetached({ repo: input.repo, name });
        } catch {
          // Isolation failure remains the actionable verdict.
        }
        return {
          ok: false,
          reason: 'verify_cmd_spawn_error',
          exit: null,
          detail: 'verify_isolation_unavailable'
        };
      }
      if (isolated_root === null) {
        return {
          ok: false,
          reason: 'verify_cmd_spawn_error',
          exit: null,
          detail: 'verify_isolation_unavailable'
        };
      }
      try {
        return await runVerifyCmd({
          cwd: wt.path,
          cmd: input.cmd,
          timeout_ms: input.timeout_ms,
          spawn_impl: input.spawn_impl,
          env: {
            ...process.env,
            XDG_STATE_HOME: path.join(isolated_root, 'state'),
            XDG_CONFIG_HOME: path.join(isolated_root, 'config'),
            BDUI_RUNTIME_DIR: path.join(isolated_root, 'runtime'),
            BDUI_CONFIG_PATH: path.join(isolated_root, 'config', 'config.toml'),
            PORT: '0',
            HOST: '127.0.0.1'
          },
          // `cwd` is the detached worktree, which is deleted in the `finally`
          // below — the log has to be keyed on the REPO instead (UI-0x54).
          log_context: {
            kind: 'verify',
            workspace_root: input.repo,
            bead_id: input.bead_id,
            sha: input.sha,
            started_at_ms: Date.now(),
            ...(attempt === undefined ? {} : { attempt })
          },
          fs_impl: input.fs_impl
        });
      } finally {
        // Best-effort teardown that must NEVER mask the verdict (UI-egj7 §3):
        // the failure is only recorded, never returned. The next run's reclaim
        // ladder (§1) is what actually clears the residue.
        try {
          const removed = await input.worktree.removeDetached({
            repo: input.repo,
            name
          });
          if (removed && removed.code !== 0) {
            log(
              'verify worktree teardown failed for %s: %s',
              name,
              String(removed.stderr || '').trim()
            );
          }
        } catch (err) {
          log(
            'verify worktree teardown failed for %s: %s',
            name,
            errorDetail(err)
          );
        }
        try {
          isolation_fs.rmSync(isolated_root, { recursive: true, force: true });
        } catch {
          // The verifier verdict remains authoritative if temp cleanup fails.
        }
      }
    };

    const first_result = await run_attempt(retry_flaky ? 1 : undefined);
    if (!retry_flaky) {
      return first_result;
    }
    const results = [first_result];
    if (first_result.reason === 'verify_cmd_failed') {
      results.push(await run_attempt(2));
    }
    return with_attempts(results);
  });
}
