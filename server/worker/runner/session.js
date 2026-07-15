/**
 * Shared headless-session engine for the runner adapters (spec §5.4).
 *
 * Both the claude and codex adapters differ only in argv construction, event
 * normalization, question/approval detection, and the terminal success verdict.
 * This module owns everything else — spawning the CLI as a detached process so a
 * process GROUP exists, streaming its stdout jsonl line-by-line, emitting a
 * normalized event stream, persisting the raw stream for the transcript viewer,
 * failing closed (blocker + process-group kill) on any interactive request, and
 * resolving a final verdict when the process closes.
 *
 * Testability: the actual `child_process.spawn` and `process.kill` are injected
 * (`spawn_impl` / `kill_impl`) so unit tests replay a jsonl fixture through a
 * fake child and assert the group-kill call WITHOUT spawning a real CLI.
 *
 * @import { ChildProcessLike } from './fixture-spawn.js'
 */
import { EventEmitter } from 'node:events';

/**
 * A normalized runner event. `raw` carries the original parsed jsonl object so
 * the session log persists the untransformed stream.
 *
 * @typedef {Object} RunnerEvent
 * @property {'text'|'tool'|'result'|'error'|'blocker'|'phase'|'other'} kind
 * @property {string} [text] - Assistant text (kind='text').
 * @property {string} [name] - Tool name (kind='tool').
 * @property {unknown} [input] - Tool input (kind='tool').
 * @property {string} [message] - Error/blocker message.
 * @property {string} [reason] - Fail-closed reason (kind='blocker').
 * @property {unknown} raw - The original parsed jsonl object.
 */

/**
 * Final verdict resolved when a session closes.
 *
 * @typedef {Object} RunnerVerdict
 * @property {boolean} success - Whether the adapter's success criteria hold.
 * @property {string} reason - Machine-readable reason (e.g. 'ok', 'blocker').
 * @property {number|null} exit - Process exit code.
 * @property {boolean} blocked - True when fail-closed fired (question/approval).
 * @property {RunnerEvent[]} events - Normalized event stream.
 * @property {unknown[]} raw - Raw parsed jsonl objects (for the session log).
 */

/**
 * A live session handle. Consumers await {@link RunnerHandle.done}; the session
 * log subscribes to the `raw` event; the scheduler may call `kill()` to stop the
 * process group (breaker / pause / orphan reap).
 *
 * @typedef {Object} RunnerHandle
 * @property {number|null} pid - OS pid of the spawned process (null on failure).
 * @property {(signal?: NodeJS.Signals|number) => void} kill - Group-kill helper.
 * @property {EventEmitter} events - Emits 'event'(RunnerEvent), 'raw'(object).
 * @property {Promise<RunnerVerdict>} done - Resolves with the terminal verdict.
 */

/**
 * @typedef {Object} AdapterSpec
 * @property {string} name - Adapter name (claude/codex/ccx).
 * @property {(bead: any, workspace: string, settings: any) => { command: string, args: string[], env?: Record<string, string|undefined> }} buildArgv
 * @property {(raw: any) => RunnerEvent|RunnerEvent[]|null} normalize - Map a raw line to normalized event(s) (or null to drop).
 * @property {(raw: any) => (string|null)} detectQuestion - Return a reason string when a raw line is an interactive request, else null.
 * @property {(raw: any) => (string|null)} [extractShellCommand] - Return the shell command of a Bash/exec tool_use, else null (feeds the merge-lock guard).
 * @property {(ctx: { raw: any[], exit: number|null, blocked: boolean }) => { success: boolean, reason: string }} verdict
 */

/**
 * @typedef {Object} EngineDeps
 * @property {(command: string, args: string[], options: any) => ChildProcessLike} [spawn_impl]
 * @property {(pid: number, signal?: NodeJS.Signals|number) => void} [kill_impl]
 * @property {{ isHeldBy: (token: string|undefined) => boolean }} [lock_state] - Merge-lock ledger; when present, an unlocked merge attempt fails closed.
 */

/**
 * Best-effort signature of a merge INTO a base branch. A session must hold the
 * (repo, target_base) merge lock before running any of these; an unlocked match
 * fails closed (blocker + group-kill). Best-effort: a determined session could
 * obfuscate the command, but the server-side merge-lock serialization remains
 * the hard invariant — this is defense-in-depth (spec §5.2).
 *
 * @type {RegExp}
 */
const MERGE_RE =
  /git\s+merge\b|gh\s+pr\s+merge\b|git\s+push\b[\s\S]*?:?\b(main|master)\b/i;

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
 * Run a headless session for an adapter spec, returning a live handle.
 *
 * @param {AdapterSpec} spec
 * @param {any} bead - Bead being executed (source of route/plan_path/etc.).
 * @param {string} workspace - Absolute cwd for the session (the worktree).
 * @param {any} settings - Launch settings (model, effort, fast_track, env).
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

  // Merge-lock fail-closed inputs: the per-session worker token identifies this
  // session to the merge-lock ledger; `lock_state.isHeldBy(token)` reports
  // whether it currently holds a (repo, base) merge lock (spec §5.2).
  const lock_state = deps.lock_state;
  const worker_token =
    settings && settings.env ? settings.env.BDUI_WORKER_TOKEN : undefined;

  const { command, args, env } = spec.buildArgv(bead, workspace, settings);
  const child = spawn_impl(command, args, {
    cwd: workspace,
    // Detached so the child leads its own process group; a group kill via
    // process.kill(-pid) then reaps the whole session tree (spec §5.4).
    detached: true,
    stdio: ['ignore', 'pipe', 'pipe'],
    // Inherit the parent environment (PATH etc.) so the spawned CLI resolves its
    // binary and toolchain; then layer the per-session settings env (the worker
    // token) and finally the adapter routing env, which WINS on any key collision
    // (e.g. ccx's ANTHROPIC_BASE_URL overriding an inherited value) (spec §5.4).
    env: { ...process.env, ...(settings?.env || {}), ...(env || {}) }
  });

  const pid = typeof child.pid === 'number' ? child.pid : null;
  let blocked = false;
  let killed = false;

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

    // Fail-closed: any interactive request → blocker + process-group kill.
    const question_reason = spec.detectQuestion(obj);
    if (question_reason) {
      blocked = true;
      /** @type {RunnerEvent} */
      const blocker = {
        kind: 'blocker',
        reason: question_reason,
        message: question_reason,
        raw: obj
      };
      norm_events.push(blocker);
      events.emit('event', blocker);
      kill('SIGTERM');
      return;
    }

    // Fail-closed: a merge INTO base attempted WITHOUT holding the merge lock →
    // blocker + process-group kill (the same path as a question) (spec §5.2).
    if (lock_state && typeof spec.extractShellCommand === 'function') {
      const cmd = spec.extractShellCommand(obj);
      if (cmd && MERGE_RE.test(cmd) && !lock_state.isHeldBy(worker_token)) {
        blocked = true;
        /** @type {RunnerEvent} */
        const merge_blocker = {
          kind: 'blocker',
          reason: 'merge_without_lock',
          message: `merge attempt without holding the merge lock: ${cmd}`,
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

  const done = new Promise((resolve) => {
    let buffer = '';
    let settled = false;

    const stdout = child.stdout;
    if (stdout) {
      stdout.setEncoding?.('utf8');
      stdout.on('data', (chunk) => {
        buffer += String(chunk);
        const [lines, remainder] = splitLines(buffer);
        buffer = remainder;
        for (const line of lines) {
          onLine(line);
        }
      });
    }

    /**
     * @param {number|null} exit
     */
    const finish = (exit) => {
      if (settled) {
        return;
      }
      settled = true;
      // Flush any trailing partial line.
      if (buffer.length > 0) {
        onLine(buffer);
        buffer = '';
      }
      const { success, reason } = spec.verdict({
        raw: raw_events,
        exit,
        blocked
      });
      /** @type {RunnerVerdict} */
      const verdict = {
        success: blocked ? false : success,
        reason: blocked ? 'blocker' : reason,
        exit,
        blocked,
        events: norm_events,
        raw: raw_events
      };
      events.emit('done', verdict);
      resolve(verdict);
    };

    child.on('error', () => finish(null));
    child.on('close', (code) => finish(typeof code === 'number' ? code : null));
  });

  return { pid, kill, events, done };
}
