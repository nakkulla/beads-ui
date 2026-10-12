/**
 * Interactive windows use the installed session-hub CLI for opening, marker
 * lookup and liveness. The hub starts a missing tmux server and writes each
 * caller's marker before executing its runner. beads-ui retains conversation
 * arguments, placement policy, bridge observation and reconciliation controls.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parse as parseToml } from 'smol-toml';
import { runShell } from '../bd.js';
import { conversationSettingsStore } from '../conversation-settings.js';
import { debug } from '../logging.js';
import { ACTIVE_RUNNERS } from './runner-catalog.js';
import { runtimeCatalog } from './runner/index.js';

const default_log = debug('worker:tmux-launcher');

/**
 * The pane option a DIRECTION INQUIRY window carries (UI-7uid §3.3).
 *
 * @type {string}
 */
export const INQUIRY_PANE_MARKER = '@bdui_inquiry_bead';

/**
 * The pane option a `[세션에서 해결]` window carries (UI-jw27 §4). Distinct
 * from {@link INQUIRY_PANE_MARKER} on purpose — see the module header.
 *
 * @type {string}
 */
export const RESOLVE_PANE_MARKER = '@bdui_resolve_bead';

/**
 * The pane option an external-wait `[세션에서 이어가기]` window carries
 * (UI-r6xq §4.3). Distinct from the other two markers — see the module header.
 *
 * @type {string}
 */
export const EXTERNAL_RESUME_PANE_MARKER = '@bdui_external_resume_bead';

/**
 * How fresh the bridge heartbeat must be to read as active. Read-only
 * observation: a stale beat is reported, never a reason to skip a launch — the
 * session then waits for the user in tmux.
 *
 * @type {number}
 */
export const BRIDGE_MAX_AGE_MS = 15_000;

/**
 * @typedef {Object} PaneRow
 * @property {string} session
 * @property {string} pane
 * @property {string} key - Value of the marker this listing asked for; '' when
 * the pane carries none.
 * @property {string} dead
 */

/**
 * Where a window opens (UI-a119 §3.1). `user` is a person's click: the most
 * recently attached user tmux session with an attached client, as its current window.
 * `inquiry` is the configured inquiry session, in the background — every
 * automatic launch, and the click's fallback when no user session qualifies.
 *
 * @typedef {'user'|'inquiry'} LaunchPlacement
 */

/**
 * @typedef {{ session: 'launched', placement: LaunchPlacement, tmux_session: string, tmux_window: string, pane_id: string }
 *   | { session: 'already_running', placement?: LaunchPlacement, tmux_session?: string, tmux_window?: string, pane_id?: string }
 *   | { session: 'not_launched', reason: string }} LaunchOutcome
 */

/**
 * @typedef {Object} LaunchInput
 * @property {string} marker
 * @property {string} key
 * @property {string} tmux_session - The configured inquiry session: the
 * `inquiry` placement's target, and the one name a `user` placement never picks.
 * @property {string} window_name
 * @property {string} cwd
 * @property {string[]} commandArgs - The arguments AFTER the resolved
 * executable.
 * @property {string} [runner] - Which executable (default `claude`).
 * @property {LaunchPlacement} [placement] - Default `inquiry`.
 */

/**
 * The pane listing format for one marker. Its three trailing fields are the
 * liveness triple; `session_name` leads so the SAME read also answers whether
 * the target session exists, rather than spending another tmux round trip.
 *
 * A colon is printable even in the C locale and is forbidden in session names.
 * Keep the marker last so colons within its value survive parsing.
 *
 * @param {string} marker
 * @returns {string}
 */
export function paneFormat(marker) {
  return `#{session_name}:#{pane_id}:#{pane_dead}:#{${marker}}`;
}

/**
 * Project the recovery facts with the marker last (UI-6pif §3.4). The hook
 * owned `@agent_running`/`@agent_attention` pair sits right after `pane_dead`
 * — both are colon-free flag words, so the fixed-position split still holds
 * and the colon-bearing cwd and marker keep their tail parsing (UI-ri8n).
 *
 * @param {string} marker
 */
export function paneFormatExtended(marker) {
  return `#{session_name}:#{window_name}:#{pane_id}:#{pane_dead}:#{@agent_running}:#{@agent_attention}:#{pane_current_path}:#{@agent_runtime}:#{${marker}}`;
}

/**
 * Quote one value for the `sh -c` tmux runs the wrapper under. Everything
 * inside `'…'` is literal to the shell, and an embedded quote is closed,
 * escaped and reopened — the only sequence a single-quoted string cannot carry
 * directly.
 *
 * @param {string} value
 * @returns {string}
 */
export function shellQuote(value) {
  return `'${String(value).split("'").join("'\\''")}'`;
}

/**
 * The one-line shell command a marked pane runs.
 *
 * `set-option` comes FIRST and the two commands are joined by `&&` — see the
 * module header for why that ordering is the duplicate guard.
 *
 * @param {{ marker: string, key: string, argv: string[] }} input - `argv[0]` is
 * the executable; the rest are its arguments, each quoted as one word.
 * @returns {string}
 */
export function markerWrapper(input) {
  return [
    `tmux set-option -p -t "$TMUX_PANE" ${input.marker} ${shellQuote(input.key)}`,
    `&& exec ${input.argv.map((word) => shellQuote(word)).join(' ')}`
  ].join(' ');
}

/**
 * One runner's executable, as an absolute path off the Worker's own PATH.
 * Absolute on purpose: the wrapper runs under `sh -c` inside a tmux pane whose
 * PATH is the tmux server's environment, not this process's.
 *
 * The COMMAND NAME comes from the runner catalog (codex-orchestration-parity
 * §4.2), the same resolution the headless dispatch argv is built from, so a
 * `[runner.codex] command` override reaches the interactive window too. An
 * unknown runner resolves nothing — it is never substituted with claude.
 *
 * @param {string} runner
 * @returns {string|null}
 */
export function defaultResolveRunner(runner) {
  if (!ACTIVE_RUNNERS.includes(runner)) {
    return null;
  }
  /** @type {string} */
  let command;
  try {
    const entry = runtimeCatalog().runners[runner];
    command = typeof entry?.command === 'string' ? entry.command : runner;
  } catch {
    command = runner;
  }
  // A catalog command that already names a path is not a PATH lookup: joining
  // it onto every PATH dir turned a perfectly good absolute `command` into
  // `codex_not_found` (codex-orchestration-parity §4.2).
  if (command.includes(path.sep)) {
    const absolute = path.resolve(command);
    try {
      fs.accessSync(absolute, fs.constants.X_OK);
      return absolute;
    } catch {
      return null;
    }
  }
  const raw = process.env.PATH;
  if (typeof raw !== 'string' || raw.length === 0) {
    return null;
  }
  for (const dir of raw.split(path.delimiter)) {
    if (dir.length === 0) {
      continue;
    }
    const candidate = path.join(dir, command);
    try {
      fs.accessSync(candidate, fs.constants.X_OK);
      return candidate;
    } catch {
      // Not here; keep walking the PATH.
    }
  }
  return null;
}

/**
 * `claude`'s absolute path, kept as the zero-argument shape the existing
 * `resolveClaude` dependency injection speaks.
 *
 * @returns {string|null}
 */
export function defaultResolveClaude() {
  return defaultResolveRunner('claude');
}

/**
 * Register a missing Codex project without rewriting existing config bytes or
 * overriding an explicit trust choice. Worktrees share the common Git root.
 *
 * @param {string} cwd
 * @returns {Promise<string>} Absolute config home for the new window's environment.
 */
async function ensureCodexProjectTrust(cwd) {
  const common = await runShell(
    'git',
    ['rev-parse', '--path-format=absolute', '--git-common-dir'],
    { cwd }
  );
  const root =
    common.code === 0 && common.stdout.trim().length > 0
      ? path.dirname(common.stdout.trim())
      : path.resolve(cwd);
  const codex_home = path.resolve(
    process.env.CODEX_HOME || path.join(os.homedir(), '.codex')
  );
  const config_path = path.join(codex_home, 'config.toml');
  let contents = '';
  try {
    contents = fs.readFileSync(config_path, 'utf8');
  } catch (err) {
    if (/** @type {NodeJS.ErrnoException} */ (err).code !== 'ENOENT') {
      throw err;
    }
  }
  const config = parseToml(contents);
  if (
    config.projects &&
    typeof config.projects === 'object' &&
    Object.hasOwn(config.projects, root)
  ) {
    return codex_home;
  }
  const addition = `\n[projects.${JSON.stringify(root)}]\ntrust_level = "trusted"\n`;
  // Inline or malformed project tables cannot be extended by appending a table.
  parseToml(contents + addition);
  fs.mkdirSync(codex_home, { recursive: true, mode: 0o700 });
  fs.appendFileSync(config_path, addition, { mode: 0o600 });
  return codex_home;
}

/**
 * Put the conversation model/effort flags (UI-jbl1 §3.4) into one launch's
 * argument list. A claude launch takes them up front; a codex launch takes
 * them right after its `fork`/`resume` subcommand, before the session id and
 * the prompt — the order the headless codex runner uses.
 *
 * @param {string} runner
 * @param {string[]} args - The arguments AFTER the resolved executable.
 * @param {string[]} flags
 * @returns {string[]}
 */
export function withLaunchFlags(runner, args, flags) {
  if (flags.length === 0) {
    return [...args];
  }
  if (runner === 'codex' && (args[0] === 'fork' || args[0] === 'resume')) {
    return [args[0], ...flags, ...args.slice(1)];
  }
  return [...flags, ...args];
}

/**
 * The stored model/effort flags for one runner; a store that cannot be read
 * adds none (the launch then keeps the CLI's own default).
 *
 * @param {string} runner
 * @returns {string[]}
 */
function defaultLaunchFlags(runner) {
  try {
    return conversationSettingsStore().launchFlags(runner);
  } catch {
    return [];
  }
}

/**
 * @typedef {Object} TmuxLauncherDeps
 * @property {(args: string[]) => Promise<{ code: number, stdout: string, stderr: string }>} [runTmux]
 * @property {(args: string[]) => Promise<{ code: number, stdout: string, stderr: string }>} [runSessionHub]
 * @property {() => string|null} [resolveClaude] - Legacy claude-only seam; it
 * still answers for a claude launch when `resolveRunner` is absent.
 * @property {(runner: string) => string|null} [resolveRunner]
 * @property {(file_path: string) => { mtimeMs: number }} [statFile]
 * @property {() => number} [now]
 * @property {(...args: any[]) => void} [log]
 * @property {string} [heartbeatPath]
 * @property {string} [bridgeStateDir]
 * @property {(runner: string) => string[]} [launchFlags] - The conversation
 * settings' model/effort flags for a runner, read per launch.
 */

/**
 * Build the shared launcher.
 *
 * @param {TmuxLauncherDeps} [deps]
 */
export function createTmuxLauncher(deps = {}) {
  const log = deps.log || default_log;
  /**
   * Launches this process has started but not yet finished, keyed by marker and
   * key. The pane marker is written by the wrapper and is therefore not
   * readable until the window is already open, so two concurrent launches for
   * one key would BOTH read "no live pane" and both open a window. This
   * reservation closes exactly that window; it does not replace the marker,
   * which remains the cross-process truth.
   *
   * @type {Set<string>}
   */
  const in_flight = new Set();
  const now = deps.now || (() => Date.now());
  const injected_claude = deps.resolveClaude;
  /** @type {(runner: string) => string|null} */
  const resolveRunner =
    deps.resolveRunner ||
    ((/** @type {string} */ runner) =>
      runner === 'claude' && injected_claude
        ? injected_claude()
        : defaultResolveRunner(runner));
  const statFile =
    deps.statFile || ((/** @type {string} */ p) => fs.statSync(p));
  const runTmux =
    deps.runTmux || ((/** @type {string[]} */ args) => runShell('tmux', args));
  const runSessionHub =
    deps.runSessionHub ||
    ((/** @type {string[]} */ args) =>
      runShell(path.join(os.homedir(), 'bin', 'session-hub'), args));
  const launchFlags = deps.launchFlags || defaultLaunchFlags;
  const bridge_state_dir =
    deps.bridgeStateDir ||
    path.join(os.homedir(), 'tmp', 'claude-discord-bridge', 'state');
  const heartbeat_path =
    deps.heartbeatPath || path.join(bridge_state_dir, 'heartbeat');
  /** @type {number|null} */
  let threads_mtime = null;
  /** @type {Map<string, { thread_id: string|number, url: string|null, guild_id: string|number|null }>} */
  let threads_cache = new Map();

  /** Read bridge-owned thread records, reusing the last mtime's projection. */
  function readBridgeThreads() {
    try {
      const file = path.join(bridge_state_dir, 'threads.json');
      const mtime = statFile(file).mtimeMs;
      if (threads_mtime === mtime) {
        return threads_cache;
      }
      threads_cache = new Map();
      threads_mtime = mtime;
      const records = JSON.parse(fs.readFileSync(file, 'utf8'));
      if (records && typeof records === 'object' && !Array.isArray(records)) {
        for (const [session_id, record] of Object.entries(records)) {
          if (
            !record ||
            (typeof record.thread_id !== 'string' &&
              typeof record.thread_id !== 'number')
          ) {
            continue;
          }
          threads_cache.set(session_id, {
            thread_id: record.thread_id,
            url:
              typeof record.url === 'string' && record.url.length > 0
                ? record.url
                : null,
            guild_id:
              typeof record.guild_id === 'string' ||
              typeof record.guild_id === 'number'
                ? record.guild_id
                : null
          });
        }
      }
    } catch {
      threads_mtime = null;
      threads_cache = new Map();
    }
    return threads_cache;
  }

  /**
   * Run a tmux operation without throwing across the reconciliation boundary.
   *
   * @param {string[]} args
   * @returns {Promise<{ ok: true, stdout: string }|{ ok: false, error: string }>}
   */
  async function runChecked(args) {
    try {
      const result = await runTmux(args);
      if (!result || result.code !== 0) {
        return {
          ok: false,
          error: (result?.stderr || '').trim() || `exit ${result?.code}`
        };
      }
      return { ok: true, stdout: result.stdout || '' };
    } catch (err) {
      return { ok: false, error: String(err) };
    }
  }

  /**
   * List recovery facts, preserving colons in paths and marker keys.
   *
   * @param {string} marker
   */
  async function listPanesExtended(marker) {
    const result = await runChecked([
      'list-panes',
      '-a',
      '-F',
      paneFormatExtended(marker)
    ]);
    if (!result.ok) {
      return result;
    }
    /** @type {{ session: string, window: string, pane: string, dead: string, agent_running: string, agent_attention: string, cwd: string, agent_runtime: string, key: string }[]} */
    const rows = [];
    for (const line of result.stdout.split('\n')) {
      if (!line) {
        continue;
      }
      const [
        session,
        window,
        pane,
        dead,
        agent_running = '',
        agent_attention = '',
        ...tail
      ] = line.split(':');
      // Runtime is a closed vocabulary; splitting six fields would truncate
      // a colon-bearing cwd. The final runtime boundary leaves the marker
      // intact; this format assumes marker keys contain no runtime delimiter.
      const match = tail.join(':').match(/^(.*):(claude|codex|):(.*)$/);
      if (!match || !session || !window || !pane || !dead) {
        continue;
      }
      rows.push({
        session,
        window,
        pane,
        dead,
        agent_running,
        agent_attention,
        cwd: match[1],
        agent_runtime: match[2],
        key: match[3]
      });
    }
    return { ok: /** @type {const} */ (true), rows };
  }

  /**
   * Read one optional pane fact without treating a failed read as empty.
   *
   * @param {string} pane_id
   * @param {string} name
   */
  async function readPaneOption(pane_id, name) {
    const result = await runChecked([
      'show-options',
      '-pqv',
      '-t',
      pane_id,
      name
    ]);
    return result.ok
      ? { ok: /** @type {const} */ (true), value: result.stdout.trim() || null }
      : result;
  }

  /**
   * Submit the caller-authorized Claude exit command.
   *
   * @param {string} pane_id
   */
  async function sendExit(pane_id) {
    const typed = await runChecked(['send-keys', '-t', pane_id, '-l', '/exit']);
    if (!typed.ok) {
      return typed;
    }
    const submitted = await runChecked(['send-keys', '-t', pane_id, 'Enter']);
    return submitted.ok ? { ok: /** @type {const} */ (true) } : submitted;
  }

  /**
   * Close the window selected by the reconciliation owner.
   *
   * @param {string} tmux_session
   * @param {string} tmux_window
   */
  async function killWindow(tmux_session, tmux_window) {
    const result = await runChecked([
      'kill-window',
      '-t',
      `${tmux_session}:${tmux_window}`
    ]);
    return result.ok ? { ok: /** @type {const} */ (true) } : result;
  }

  /**
   * Capture the last nonblank pane line for the caller's idle judgment.
   *
   * @param {string} pane_id
   */
  async function capturePaneTail(pane_id) {
    const result = await runChecked(['capture-pane', '-p', '-t', pane_id]);
    if (!result.ok) {
      return result;
    }
    return {
      ok: /** @type {const} */ (true),
      line:
        result.stdout
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean)
          .at(-1) ?? null
    };
  }

  /**
   * Every pane the tmux server knows about, projected onto ONE marker.
   * `ok: false` covers an absent server, a non-zero tmux, and a runner that
   * threw — all one fact: liveness could not be judged.
   *
   * @param {string} marker
   * @returns {Promise<{ ok: true, rows: PaneRow[] }|{ ok: false, error: string }>}
   */
  async function listPanes(marker) {
    /** @type {{ code: number, stdout: string, stderr: string }} */
    let result;
    try {
      result = await runTmux(['list-panes', '-a', '-F', paneFormat(marker)]);
    } catch (err) {
      return { ok: false, error: String(err) };
    }
    if (!result || result.code !== 0) {
      return {
        ok: false,
        error: (result?.stderr || '').trim() || `exit ${result?.code}`
      };
    }
    /** @type {PaneRow[]} */
    const rows = [];
    for (const line of (result.stdout || '').split('\n')) {
      if (line.length === 0) {
        continue;
      }
      const [session, pane, dead, ...key_parts] = line.split(':');
      rows.push({
        session: session ?? '',
        pane: pane ?? '',
        key: key_parts.join(':'),
        dead: dead ?? ''
      });
    }
    return { ok: true, rows };
  }

  /**
   * Decode the hub's single JSON result, including refusals on nonzero exits.
   *
   * @param {string[]} args
   * @returns {Promise<{ ok: true, value: Record<string, any> }|{ ok: false, error: string }>}
   */
  async function hubChecked(args) {
    try {
      const result = await runSessionHub(args);
      /** @type {any} */
      let value;
      try {
        value = JSON.parse(result.stdout);
      } catch {
        return {
          ok: false,
          error: 'launch_failed:session_hub_invalid_response'
        };
      }
      if (!value || typeof value !== 'object' || Array.isArray(value)) {
        return {
          ok: false,
          error: 'launch_failed:session_hub_invalid_response'
        };
      }
      if (value.ok === false && typeof value.code === 'string') {
        const error =
          value.code === 'tmux_unavailable'
            ? 'tmux_unavailable'
            : value.code === 'start_failed'
              ? 'launch_failed:exited'
              : `launch_failed:${value.code}`;
        return { ok: false, error };
      }
      if (result.code !== 0 || value.ok !== true) {
        return {
          ok: false,
          error: 'launch_failed:session_hub_invalid_response'
        };
      }
      return { ok: true, value };
    } catch (err) {
      log('session-hub %s failed: %o', args[0], err);
      return { ok: false, error: 'launch_failed:session_hub_unavailable' };
    }
  }

  /**
   * Validate the location shared by the hub's open and found results.
   *
   * @param {Record<string, any>} value
   * @returns {boolean}
   */
  function hasHubLocation(value) {
    return (
      typeof value.pane === 'string' &&
      /^%\d+$/.test(value.pane) &&
      typeof value.tmux_session === 'string' &&
      value.tmux_session.length > 0 &&
      typeof value.window === 'string' &&
      value.window.length > 0
    );
  }

  /**
   * A failed focus does not change the hub's evidence that a window is alive.
   *
   * @param {string} pane
   * @param {string} key
   */
  async function focusPane(pane, key) {
    const selected = await runChecked(['select-window', '-t', pane]);
    if (!selected.ok) {
      log('tmux select-window failed for %s: %s', key, selected.error);
    }
  }

  /**
   * The live window of one marker/key pair, focused the way {@link launch}
   * focuses it, for a caller that must answer a click before building one.
   *
   * @param {Pick<LaunchInput, 'marker'|'key'|'tmux_session'|'window_name'|'placement'>} input
   * @returns {Promise<{ ok: true, outcome: LaunchOutcome|null }|{ ok: false, error: string }>}
   */
  async function focusRunning(input) {
    const found = await hubChecked([
      'find',
      '--marker-option',
      input.marker,
      '--marker-value',
      input.key
    ]);
    if (!found.ok) {
      return found;
    }
    const value = found.value;
    if (value.found === false) {
      return { ok: true, outcome: null };
    }
    if (value.found !== true || !hasHubLocation(value)) {
      return { ok: false, error: 'launch_failed:session_hub_invalid_response' };
    }
    if (input.placement === 'user') {
      await focusPane(value.pane, input.key);
    }
    return {
      ok: true,
      outcome: {
        session: 'already_running',
        placement:
          value.tmux_session === input.tmux_session ? 'inquiry' : 'user',
        tmux_session: value.tmux_session,
        // The hub returns an @N window id; callers retain the displayed name.
        tmux_window: input.window_name,
        pane_id: value.pane
      }
    };
  }

  /**
   * Start one marked interactive window, unless one is already alive for this
   * marker/key pair.
   *
   * The hub owns the cross-process marker lock and starts a missing server.
   * Its alive result keeps an unobservable pane distinct from an exited runner.
   *
   * @param {LaunchInput} input
   * @returns {Promise<LaunchOutcome>}
   */
  async function launch(input) {
    const reservation = `${input.marker}\u0000${input.key}`;
    if (in_flight.has(reservation)) {
      // A launch for this key is already underway in this process. Its window
      // is coming up, so the answer is the same one a live pane gives.
      return { session: 'already_running' };
    }
    in_flight.add(reservation);
    try {
      return await launchLocked(input);
    } finally {
      in_flight.delete(reservation);
    }
  }

  /**
   * The launch itself, run under the reservation above.
   *
   * @param {LaunchInput} input
   * @returns {Promise<LaunchOutcome>}
   */
  async function launchLocked(input) {
    const found = await focusRunning(input);
    if (!found.ok) {
      return { session: 'not_launched', reason: found.error };
    }
    if (found.outcome !== null) {
      return found.outcome;
    }
    // An unknown runner is refused by its OWN name rather than run as claude
    // (§4.2): substituting a provider would start a session on a transcript and
    // an account the click never asked for.
    const runner =
      typeof input.runner === 'string' && input.runner.length > 0
        ? input.runner
        : 'claude';
    const executable = resolveRunner(runner);
    if (typeof executable !== 'string' || executable.length === 0) {
      return {
        session: 'not_launched',
        reason: `launch_failed:${runner}_not_found`
      };
    }
    /** @type {string|null} */
    let codex_home = null;
    if (runner === 'codex') {
      try {
        codex_home = await ensureCodexProjectTrust(input.cwd);
      } catch {
        log('codex project trust setup failed for %s', input.key);
        return {
          session: 'not_launched',
          reason: 'launch_failed:codex_trust_setup'
        };
      }
    }
    const opened = await hubChecked([
      'open',
      '--cwd',
      input.cwd,
      '--window-name',
      input.window_name,
      '--marker-option',
      input.marker,
      '--marker-value',
      input.key,
      ...(input.placement === 'user'
        ? [
            '--attached',
            '--exclude-session',
            input.tmux_session,
            '--fallback-session',
            input.tmux_session
          ]
        : ['--session', input.tmux_session]),
      ...(codex_home === null ? [] : ['--env', `CODEX_HOME=${codex_home}`]),
      '--',
      executable,
      ...withLaunchFlags(runner, input.commandArgs, launchFlags(runner))
    ]);
    if (!opened.ok) {
      return { session: 'not_launched', reason: opened.error };
    }
    const value = opened.value;
    if (
      !hasHubLocation(value) ||
      (value.status !== 'launched' && value.status !== 'exists')
    ) {
      return {
        session: 'not_launched',
        reason: 'launch_failed:session_hub_invalid_response'
      };
    }
    const confirmed = await hubChecked([
      'alive',
      '--pane',
      value.pane,
      '--marker-option',
      input.marker,
      '--marker-value',
      input.key
    ]);
    if (!confirmed.ok) {
      return { session: 'not_launched', reason: confirmed.error };
    }
    if (confirmed.value.alive === 'dead') {
      return { session: 'not_launched', reason: 'launch_failed:exited' };
    }
    if (confirmed.value.alive !== 'alive') {
      return { session: 'not_launched', reason: 'tmux_unavailable' };
    }
    /** @type {LaunchPlacement} */
    const placement =
      value.tmux_session === input.tmux_session ? 'inquiry' : 'user';
    // Focus only after the hub reports placement: --focus on open would also
    // select a fallback inquiry window, which must stay in the background.
    if (
      input.placement === 'user' &&
      (placement === 'user' || value.status === 'exists')
    ) {
      await focusPane(value.pane, input.key);
    }
    return {
      session: value.status === 'exists' ? 'already_running' : 'launched',
      placement,
      tmux_session: value.tmux_session,
      tmux_window: input.window_name,
      pane_id: value.pane
    };
  }

  /**
   * Whether the Discord bridge beat recently enough to relay this session's
   * questions. A stat that fails reads as inactive — the caller then tells the
   * user to answer in tmux directly.
   *
   * @returns {boolean}
   */
  function bridgeActive() {
    try {
      const stat = statFile(heartbeat_path);
      const mtime =
        stat && typeof stat.mtimeMs === 'number' ? stat.mtimeMs : null;
      return mtime !== null && now() - mtime <= BRIDGE_MAX_AGE_MS;
    } catch {
      return false;
    }
  }

  return {
    listPanes,
    listPanesExtended,
    readPaneOption,
    sendExit,
    killWindow,
    capturePaneTail,
    readBridgeThreads,
    launch,
    focusRunning,
    bridgeActive
  };
}
