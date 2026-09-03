/**
 * Shared headless-session engine for the runner adapters (spec §5.4).
 *
 * Both the claude and codex adapters differ only in argv construction, event
 * normalization, question/approval detection, and the terminal success verdict.
 * This module owns everything else — spawning the CLI as a detached process so a
 * process GROUP exists, reading its jsonl stream line-by-line, emitting a
 * normalized event stream, failing closed (blocker + process-group kill) on any
 * interactive request, and resolving a final verdict when the process closes.
 *
 * TRANSPORT (UI-o2yt §3.1): when a `log_path` is supplied the child's stdout is
 * an fd on the session-log FILE, opened here before the spawn and inherited by
 * the detached child — the kernel writes it, so the log keeps growing across a
 * server restart and no output is lost to a dead pipe. The server then READS
 * that file with a tail reader instead of owning the transport. stderr goes to
 * its own file so the jsonl stays pure and a full stderr pipe can no longer
 * block the child. Without a `log_path` the engine falls back to reading the
 * child's stdout pipe, which is the line source unit tests inject fixtures
 * through.
 *
 * Testability: the actual `child_process.spawn` and `process.kill` are injected
 * (`spawn_impl` / `kill_impl`) so unit tests replay a jsonl fixture through a
 * fake child and assert the group-kill call WITHOUT spawning a real CLI.
 *
 * @import { ChildProcessLike } from './fixture-spawn.js'
 */
import { EventEmitter } from 'node:events';
import nodeFs from 'node:fs';
import path from 'node:path';
import { guardKillMessage } from '../failure-class.js';
import {
  findMergeViolation,
  guardEffect,
  guardWarningMessage
} from './command-guard.js';
import { createTailReader } from './tail-reader.js';

const DIRECT_CHILD_TERM_GRACE_MS = 250;
const DIRECT_CHILD_KILL_GRACE_MS = 1_000;

/**
 * A normalized runner event. `raw` carries the original parsed jsonl object so
 * the session log persists the untransformed stream.
 *
 * @typedef {Object} RunnerEvent
 * @property {'text'|'tool'|'result'|'error'|'blocker'|'phase'|'other'} kind
 * @property {string} [text] - Assistant text (kind='text').
 * @property {string} [name] - Tool name (kind='tool').
 * @property {unknown} [input] - Tool input (kind='tool').
 * @property {string} [message] - Error/blocker/guard-warning message.
 * @property {string} [reason] - Fail-closed reason (kind='blocker'), or the
 * guard reason of a warning the session survived (kind='error').
 * @property {{ reason: string, command: string|null }} [guard_warning] - Present
 * ONLY on a guard verdict the session survived (UI-1xcd §1). It is what lets a
 * consumer recognize the event structurally instead of matching the `error`
 * kind against a reason vocabulary, and it carries the command the durable
 * record needs.
 * @property {{ message_id?: string, input_tokens?: number, output_tokens?: number, cache_read_input_tokens?: number, cache_creation_input_tokens?: number, total_cost_usd?: number }} [usage] -
 * Token usage the adapter lifted off this line (UI-raqh §1). Absent whenever
 * the runner reported none — the consumer's fail-quiet contract. `message_id`
 * identifies the assistant message a streaming snapshot belongs to, so a repeat
 * REPLACES instead of adding; a `result` event's usage carries no id and is the
 * session's authoritative total.
 * @property {unknown} raw - The original parsed jsonl object.
 */

/**
 * Final verdict resolved when a session closes.
 *
 * @typedef {Object} RunnerVerdict
 * @property {boolean} success - Whether the adapter's success criteria hold.
 * @property {string} reason - Machine-readable reason (e.g. 'ok', 'blocker').
 * @property {string|null} summary - The session's own last sentence, lifted by
 * the adapter off the terminal event (worker-failure-tiers §6): the first
 * non-empty line, trimmed, at most 200 characters. It is what the failure
 * classifier reads to tell an environment outage from a bead-specific error,
 * and what the attempt tile shows; null when the stream carried none.
 * @property {number|null} exit - Process exit code.
 * @property {boolean} blocked - True when fail-closed fired (question/approval).
 * @property {BlockedDetail|null} blocked_detail - What the fail-closed path
 * caught, for the attempt record + failure banner (UI-2o4z §2). Null when the
 * session was not blocked.
 * @property {RunnerEvent[]} events - Normalized event stream.
 * @property {unknown[]} raw - Raw parsed jsonl objects (for the session log).
 */

/**
 * The diagnosis of a fail-closed stop. A merge guard fills both fields; an
 * interactive-question blocker has no command to name, so `command` is null.
 *
 * @typedef {Object} BlockedDetail
 * @property {string} reason - The blocker reason (guard name / question kind).
 * @property {string|null} command - The simple command the guard matched.
 */

/**
 * A live session handle. Consumers await {@link RunnerHandle.done}; the session
 * log subscribes to the `raw` event; the scheduler may call `kill()` to stop the
 * process group (pause / stop).
 *
 * @typedef {Object} RunnerHandle
 * @property {number|null} pid - OS pid of the spawned process (null on failure).
 * @property {{ pid: number, pgid: number, started_at: number }|null} process_identity -
 * Verified detached group identity. Null only for legacy/test callers that did
 * not provide a process controller.
 * @property {(signal?: NodeJS.Signals|number) => void} kill - Group-kill helper.
 * @property {EventEmitter} events - Emits 'event'(RunnerEvent), 'raw'(object), 'session_id'(string, once).
 * @property {Promise<RunnerVerdict>} done - Resolves with the terminal verdict.
 * @property {{ system_prompt: string|null, task_prompt: string|null }} prompts -
 * What this spawn sent, lifted off the SAME `buildArgv` result the argv came
 * from (UI-rxp3 §3). Recording it from anywhere else would re-assemble the
 * prompt, and a re-assembly can drift from what the process actually received.
 */

/**
 * @typedef {Object} AdapterSpec
 * @property {string} name - Adapter name (claude/codex/ccx).
 * @property {(bead: any, workspace: string, settings: any) => { command: string, args: string[], env?: Record<string, string|undefined>, system_prompt?: string, task_prompt?: string }} buildArgv -
 * Build the spawn argv. `system_prompt`/`task_prompt` are the assembled prompts
 * the argv carries (UI-rxp3 §3), exposed so the spawn path can record what was
 * sent without rebuilding it; an adapter that omits them records nothing.
 * @property {(raw: any) => RunnerEvent|RunnerEvent[]|null} normalize - Map a raw line to normalized event(s) (or null to drop).
 * @property {(raw: any) => ({ kind: 'message'|'result', usage: Record<string, number|string> }|null)} liftUsage -
 * Lift the token usage off ONE raw line, tagged with the recording rule it obeys
 * (`message` usage is keyed by id and a repeat REPLACES; `result` usage is the
 * session's authoritative total). Null when the line carries none. REQUIRED of
 * every adapter, and required to be the same function `normalize` uses: the live
 * stream and the session-log replay both tally through it, so a
 * restart-recovered total cannot drift from the one the live path produced. An
 * adapter that lifted usage inline in `normalize` and left replay to a second
 * implementation is exactly the drift this member forecloses.
 * @property {(raw: any) => (import('./claude.js').DelegationSignal|null)} [liftDelegation] -
 * Lift the subagent delegation signal off ONE raw line (UI-2mpn §5.1). OPTIONAL,
 * unlike `liftUsage`: only a runner whose stream carries child sessions defines
 * it, and its absence is what makes the delegation pass a no-op for the others.
 * @property {(raw: any) => (string|null)} detectQuestion - Return a reason string when a raw line is an interactive request, else null.
 * @property {(raw: any) => (string|null)} [extractShellCommand] - Return the shell command of a Bash/exec tool_use, else null (feeds the merge guards).
 * @property {(raw: any) => (string|null)} [extractSessionId] - Return the runner's session identifier from a raw line, else null. The engine emits the FIRST non-null result once on the `session_id` event so the attempt record can persist it for `--resume`/transcript tracking (spec §2).
 * @property {(ctx: { raw: any[], stderr_tail: string|null, finished_at?: number|null, account_row?: { status: string, windows: Array<{ pct: number, resetsAt: string|null }> }|null }) => ({ detail: string, message: string, scope: 'provider'|'account', resets_at: number|null }|null)} [classifyProviderOutage] - Classify runner-specific provider failures without changing the terminal verdict. Optional so existing adapters remain valid.
 * @property {(ctx: { raw: any[], exit: number|null, blocked: boolean }) => { success: boolean, reason: string, summary: string|null }} verdict -
 * Judge the closed stream. `summary` is the session's own last sentence
 * (worker-failure-tiers §6) — the runner owns the extraction because only it
 * knows which event carries the report, and the classifier downstream reads one
 * field instead of two stream shapes.
 */

/**
 * A line source: whatever delivers the session's jsonl lines to the engine.
 * `drain` is called once at close — read whatever is left, flush a trailing
 * partial line — and `stop` releases the source's resources.
 *
 * @typedef {Object} LineSource
 * @property {() => void} start
 * @property {() => void} drain
 * @property {() => void} stop
 */

/**
 * @typedef {Object} EngineDeps
 * @property {(command: string, args: string[], options: any) => ChildProcessLike} [spawn_impl]
 * @property {(pid: number, signal?: NodeJS.Signals|number) => void} [kill_impl]
 * @property {{ capture: (pid: number) => ({ ok: true, identity: { pid: number, pgid: number, started_at: number }}|{ ok: false, reason: string }) }} [process_controller]
 * @property {typeof import('node:fs')} [fs]
 * @property {number} [direct_child_term_grace_ms]
 * @property {number} [direct_child_kill_grace_ms]
 * @property {(input: { child: ChildProcessLike, log_path: string|null, fs: typeof import('node:fs'), onLine: (line: string) => void }) => LineSource} [makeLineSource] -
 * Line-source seam (UI-o2yt §5). Production leaves it unset: a `log_path` picks
 * the file tail reader and its absence picks the stdout reader. Tests inject
 * their own source to drive the engine without a file or a real child.
 */

/**
 * Split accumulated stdout into complete lines, returning `[lines, remainder]`.
 *
 * @param {string} buffer
 * @returns {[string[], string]}
 */
function splitLines(buffer) {
  const parts = buffer.split(/\r?\n/);
  const remainder = parts.pop() ?? '';
  return [parts, remainder];
}

/**
 * Read lines off the child's stdout PIPE. The pre-UI-o2yt transport, kept as the
 * fallback for a spawn with no session-log path (every fixture-driven test).
 *
 * @param {{ child: ChildProcessLike, onLine: (line: string) => void }} input
 * @returns {LineSource}
 */
function createStdoutSource(input) {
  let buffer = '';
  return {
    start() {
      const stdout = input.child.stdout;
      if (!stdout) {
        return;
      }
      stdout.setEncoding?.('utf8');
      stdout.on('data', (chunk) => {
        buffer += String(chunk);
        const [lines, remainder] = splitLines(buffer);
        buffer = remainder;
        for (const line of lines) {
          input.onLine(line);
        }
      });
    },
    drain() {
      if (buffer.length > 0) {
        const rest = buffer;
        buffer = '';
        input.onLine(rest);
      }
    },
    stop() {}
  };
}

/**
 * Read lines off the session-log FILE the child writes through its inherited fd
 * (UI-o2yt §3.1).
 *
 * @param {{ file: string, fs: typeof import('node:fs'), onLine: (line: string) => void }} input
 * @returns {LineSource}
 */
function createFileSource(input) {
  const reader = createTailReader({
    file: input.file,
    fs: input.fs,
    onLine: input.onLine
  });
  return {
    start: () => reader.start(),
    drain: () => reader.drain(),
    stop: () => reader.stop()
  };
}

/**
 * Open the session-log + stderr files the child will inherit as its stdout and
 * stderr. Both are append-mode so a resumed/relaunched write never truncates a
 * transcript. A failure to open EITHER closes whatever was opened and throws —
 * the caller's spawn-failure path (fail-visible dispatch failure, §4).
 *
 * @param {typeof import('node:fs')} fs
 * @param {string} log_path
 * @param {string|null} stderr_path
 * @returns {{ out_fd: number, err_fd: number|null }}
 */
function openOutputFds(fs, log_path, stderr_path) {
  fs.mkdirSync(path.dirname(log_path), { recursive: true });
  const out_fd = fs.openSync(log_path, 'a');
  if (!stderr_path) {
    return { out_fd, err_fd: null };
  }
  try {
    fs.mkdirSync(path.dirname(stderr_path), { recursive: true });
    return { out_fd, err_fd: fs.openSync(stderr_path, 'a') };
  } catch (err) {
    try {
      fs.closeSync(out_fd);
    } catch {
      /* ignore */
    }
    throw err;
  }
}

/**
 * Run a headless session for an adapter spec, returning a live handle.
 *
 * @param {AdapterSpec} spec
 * @param {any} bead - Bead being executed (source of route/plan_path/etc.).
 * @param {string} workspace - Absolute cwd for the session (the worktree).
 * @param {any} settings - Launch settings (model, effort, speed, fast_track, env).
 * @param {EngineDeps} deps
 * @returns {RunnerHandle}
 */
export function runSession(spec, bead, workspace, settings, deps) {
  const spawn_impl = deps.spawn_impl;
  const kill_impl =
    deps.kill_impl || ((pid, signal) => process.kill(pid, signal));
  if (typeof spawn_impl !== 'function') {
    throw new Error('runSession requires deps.spawn_impl');
  }

  const events = new EventEmitter();
  // Avoid MaxListeners warnings when many raw lines are consumed.
  events.setMaxListeners(0);

  // The base-landing guard's SUBJECT (worker-base-scope-alignment §6): the repo
  // this attempt owns and the base that repo DECLARES. Absent either one the
  // guard keeps its legacy `main|master` name match and applies no cross-repo
  // allowlist, so a caller that plumbs neither gets the pre-§6 verdict.
  const guard_repo =
    typeof settings?.repo === 'string' && settings.repo.length > 0
      ? settings.repo
      : null;
  const guard_target_base =
    typeof settings?.target_base === 'string' && settings.target_base.length > 0
      ? settings.target_base
      : null;
  // A REVISE-disposition session publishes the resolved base as its JOB
  // (`revise-disposition.js`), so the base-push and hook-bypass judgments do not
  // apply to it. The scheduler carries the disposition KIND here (the string
  // `'revise_fix'`), not a boolean, and null for every other attempt.
  const disposition =
    typeof settings?.disposition === 'string'
      ? settings.disposition.length > 0
      : settings?.disposition === true;
  const quickfix_lane = settings?.quickfix_lane === true;

  const fs = deps.fs || nodeFs;
  // The session-log file the child writes DIRECTLY (UI-o2yt §3.1). Absent ⇒ the
  // legacy stdout-pipe transport, which is what fixture-driven tests use.
  const log_path =
    typeof settings?.log_path === 'string' && settings.log_path.length > 0
      ? settings.log_path
      : null;
  const stderr_path =
    typeof settings?.stderr_path === 'string' && settings.stderr_path.length > 0
      ? settings.stderr_path
      : null;

  const built = spec.buildArgv(bead, workspace, settings);
  const { command, args, env } = built;
  // Opened BEFORE the spawn so the fds exist to be inherited; an open failure
  // throws out of runSession, which the dispatcher records as a spawn failure.
  const fds = log_path ? openOutputFds(fs, log_path, stderr_path) : null;
  /** @type {ChildProcessLike} */
  let child;
  try {
    child = spawn_impl(command, args, {
      cwd: workspace,
      // Detached so the child leads its own process group; a group kill via
      // process.kill(-pid) then reaps the whole session tree (spec §5.4).
      detached: true,
      stdio: fds
        ? ['ignore', fds.out_fd, fds.err_fd ?? 'ignore']
        : ['ignore', 'pipe', 'pipe'],
      // Inherit the parent environment (PATH etc.) so the spawned CLI resolves its
      // binary and toolchain; then layer the per-session settings env (the worker
      // token) and finally the adapter routing env, which WINS on any key collision
      // (e.g. ccx's ANTHROPIC_BASE_URL overriding an inherited value) (spec §5.4).
      env: { ...process.env, ...(settings?.env || {}), ...(env || {}) }
    });
  } finally {
    // The child owns its own copies now; leaving the server's open would leak
    // one fd per session and hold the file open long past the session.
    if (fds) {
      for (const fd of [fds.out_fd, fds.err_fd]) {
        if (fd == null) {
          continue;
        }
        try {
          fs.closeSync(fd);
        } catch {
          /* ignore */
        }
      }
    }
  }

  const pid = typeof child.pid === 'number' ? child.pid : null;
  /** @type {{ pid: number, pgid: number, started_at: number }|null} */
  let process_identity = null;
  if (deps.process_controller) {
    /**
     * Refuse a launch without targeting an unverified process group. The child
     * handle is authoritative only for the direct process that was just
     * spawned; a false return or exception is surfaced in the launch failure.
     *
     * @param {string} reason
     * @returns {never}
     */
    function refuseUnverifiedLaunch(reason) {
      const term_grace_ms =
        deps.direct_child_term_grace_ms ?? DIRECT_CHILD_TERM_GRACE_MS;
      const kill_grace_ms =
        deps.direct_child_kill_grace_ms ?? DIRECT_CHILD_KILL_GRACE_MS;
      const cleanup = new Promise((resolve) => {
        let settled = false;
        /** @type {ReturnType<typeof setTimeout>|null} */
        let term_timer = null;
        /** @type {ReturnType<typeof setTimeout>|null} */
        let kill_timer = null;

        /** @param {{ ok: boolean, reason?: string }} result */
        function finish(result) {
          if (settled) {
            return;
          }
          settled = true;
          if (term_timer) {
            clearTimeout(term_timer);
          }
          if (kill_timer) {
            clearTimeout(kill_timer);
          }
          resolve(result);
        }

        child.on('close', () => finish({ ok: true }));

        /** Escalate only against the same direct child handle. */
        function forceDirectChild() {
          let signal_failed = false;
          try {
            signal_failed = child.kill('SIGKILL') === false;
          } catch {
            signal_failed = true;
          }
          if (settled) {
            return;
          }
          kill_timer = setTimeout(
            () =>
              finish({
                ok: false,
                reason: signal_failed
                  ? 'direct_child_sigkill_failed'
                  : 'direct_child_exit_unconfirmed'
              }),
            kill_grace_ms
          );
          kill_timer.unref?.();
        }

        let term_failed = false;
        try {
          term_failed = child.kill('SIGTERM') === false;
        } catch {
          term_failed = true;
        }
        if (settled) {
          return;
        }
        if (term_failed) {
          forceDirectChild();
          return;
        }
        term_timer = setTimeout(forceDirectChild, term_grace_ms);
        term_timer.unref?.();
      });
      const error = /** @type {Error & { cleanup: Promise<any> }} */ (
        new Error(`process_identity:${reason}`)
      );
      error.cleanup = cleanup;
      throw error;
    }
    if (pid == null) {
      refuseUnverifiedLaunch('pid_missing');
    }
    const captured = deps.process_controller.capture(pid);
    if (!captured.ok) {
      refuseUnverifiedLaunch(captured.reason);
    }
    process_identity = captured.identity;
  }
  let blocked = false;
  /** @type {BlockedDetail|null} */
  let blocked_detail = null;
  let killed = false;
  // The session identifier arrives on the first stream event and is emitted
  // exactly once; later lines that also carry it are ignored (spec §2).
  let session_id_emitted = false;

  /**
   * Group-kill the session. Uses a NEGATIVE pid so the whole process group is
   * signalled (the child was spawned detached).
   *
   * @param {NodeJS.Signals|number} [signal]
   */
  function kill(signal = 'SIGTERM') {
    if (killed || pid == null) {
      return;
    }
    killed = true;
    try {
      kill_impl(-pid, signal);
    } catch {
      // Best-effort; the process may already be gone.
    }
  }

  /** @type {any[]} */
  const raw_events = [];
  /** @type {RunnerEvent[]} */
  const norm_events = [];

  /**
   * Process one complete jsonl line.
   *
   * @param {string} line
   */
  function onLine(line) {
    const trimmed = line.trim();
    if (trimmed.length === 0) {
      return;
    }
    /** @type {any} */
    let obj;
    try {
      obj = JSON.parse(trimmed);
    } catch {
      return;
    }
    raw_events.push(obj);
    events.emit('raw', obj);

    // Session id: emit the adapter's first non-null extraction once so the
    // scheduler can persist it onto the attempt record (spec §2).
    if (!session_id_emitted && typeof spec.extractSessionId === 'function') {
      const session_id = spec.extractSessionId(obj);
      if (session_id != null) {
        session_id_emitted = true;
        events.emit('session_id', session_id);
      }
    }

    // Fail-closed: any interactive request → blocker + process-group kill.
    const question_reason = spec.detectQuestion(obj);
    if (question_reason) {
      blocked = true;
      blocked_detail = { reason: question_reason, command: null };
      /** @type {RunnerEvent} */
      const blocker = {
        kind: 'blocker',
        reason: question_reason,
        message: guardKillMessage(blocked_detail),
        raw: obj
      };
      norm_events.push(blocker);
      events.emit('event', blocker);
      kill('SIGTERM');
      return;
    }

    // Merge guards, gated on the ATTEMPT rather than on any lock (worker-phase2
    // §1). The judgment is argv-position based (command-guard.js); an
    // unparseable command falls back to the old regexes there rather than
    // passing. What a violation COSTS is the violation's kind
    // (guard-enforcement-layer-replacement §4): a base push is judged from a
    // command string with no cwd in it, so it only warns and the session runs
    // on; the kinds decided by argv alone still fail closed.
    if (typeof spec.extractShellCommand === 'function') {
      const cmd = spec.extractShellCommand(obj);
      const violation = cmd
        ? findMergeViolation(cmd, {
            disposition,
            quickfix_lane,
            repo: guard_repo,
            target_base: guard_target_base
          })
        : null;
      if (violation && guardEffect(violation) === 'warn') {
        // `error` is the only enum member that carries a message without
        // claiming the session stopped (`blocker` means fail-closed), and
        // `reason` is what tells a consumer which guard spoke. `guard_warning`
        // is what makes it durable: the scheduler recognizes the event by that
        // key and appends it to the attempt record (UI-1xcd §1).
        /** @type {RunnerEvent} */
        const guard_warning = {
          kind: 'error',
          reason: violation.reason,
          message: guardWarningMessage(violation),
          guard_warning: {
            reason: violation.reason,
            command: violation.command
          },
          raw: obj
        };
        norm_events.push(guard_warning);
        events.emit('event', guard_warning);
        // No `return`: the line is normalized like any other.
      } else if (violation) {
        blocked = true;
        blocked_detail = {
          reason: violation.reason,
          command: violation.command
        };
        // One copy of the sentence, in `failure-class.js`, because the restart
        // monitor's kill reaches the same durable record through the
        // scheduler's `blockerCauseDetail` (spec §6 row 3).
        const message = guardKillMessage(blocked_detail);
        /** @type {RunnerEvent} */
        const merge_blocker = {
          kind: 'blocker',
          reason: violation.reason,
          message,
          raw: obj
        };
        norm_events.push(merge_blocker);
        events.emit('event', merge_blocker);
        kill('SIGTERM');
        return;
      }
    }

    const normalized = spec.normalize(obj);
    const list = Array.isArray(normalized)
      ? normalized
      : normalized
        ? [normalized]
        : [];
    for (const ev of list) {
      norm_events.push(ev);
      events.emit('event', ev);
    }
  }

  const makeLineSource =
    deps.makeLineSource ||
    ((input) =>
      input.log_path
        ? createFileSource({
            file: input.log_path,
            fs: input.fs,
            onLine: input.onLine
          })
        : createStdoutSource({ child: input.child, onLine: input.onLine }));
  const source = makeLineSource({ child, log_path, fs, onLine });

  const done = new Promise((resolve) => {
    let settled = false;

    // Deferred by one microtask on purpose: a FILE source has lines available
    // synchronously (the child may already have written, and a relaunch reads an
    // existing log), so starting it here would emit `raw`/`session_id`/`event`
    // before the caller — which only gets this handle when runSession returns —
    // has attached its listeners. `session_id` is emitted exactly once, so those
    // lost lines would cost the attempt its resume identity.
    queueMicrotask(() => {
      if (!settled) {
        source.start();
      }
    });

    /**
     * @param {number|null} exit
     */
    const finish = (exit) => {
      if (settled) {
        return;
      }
      settled = true;
      // Read to EOF and flush any trailing partial line before the verdict: the
      // last lines of a file-backed session land after the process is gone.
      try {
        source.drain();
      } catch {
        // A drain fault must not swallow the verdict.
      }
      try {
        source.stop();
      } catch {
        /* ignore */
      }
      const { success, reason, summary } = spec.verdict({
        raw: raw_events,
        exit,
        blocked
      });
      /** @type {RunnerVerdict} */
      const verdict = {
        success: blocked ? false : success,
        reason: blocked ? 'blocker' : reason,
        // Carried through even for a blocked session: the kill replaces the
        // REASON, not what the session had last reported about itself.
        summary:
          typeof summary === 'string' && summary.length > 0 ? summary : null,
        exit,
        blocked,
        blocked_detail: blocked ? blocked_detail : null,
        events: norm_events,
        raw: raw_events
      };
      events.emit('done', verdict);
      resolve(verdict);
    };

    child.on('error', () => finish(null));
    child.on('close', (code) => finish(typeof code === 'number' ? code : null));
  });

  return {
    pid,
    process_identity,
    kill,
    events,
    done,
    // What this spawn ACTUALLY sent, straight off the build that produced the
    // argv above (UI-rxp3 §3). An adapter that exposes neither yields null, and
    // the recording path writes nothing rather than a guess.
    prompts: {
      system_prompt:
        typeof built.system_prompt === 'string' ? built.system_prompt : null,
      task_prompt:
        typeof built.task_prompt === 'string' ? built.task_prompt : null
    }
  };
}
