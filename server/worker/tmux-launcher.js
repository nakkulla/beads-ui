/**
 * Interactive windows use the installed session-hub CLI for everything that
 * touches a terminal multiplexer: opening, marker lookup, liveness, screen
 * reads, focus and closing. The hub starts a missing server and writes each
 * caller's marker before executing its runner; its configuration picks the
 * multiplexer, so nothing here names one. beads-ui retains conversation
 * arguments, placement policy, bridge observation and reconciliation controls.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parse as parseToml } from 'smol-toml';
import { runShell } from '../bd.js';
import { conversationSettingsStore } from '../conversation-settings.js';
import { debug } from '../logging.js';
import {
  AGY_DEFAULT_MODEL,
  agyCredentialChangeActive,
  agyModelList
} from './agy-model-list.js';
import { SELECTABLE_RUNNERS } from './runner-catalog.js';
import { agyLauncherPath } from './runner/agy.js';
import { runtimeCatalog } from './runner/index.js';

const default_log = debug('worker:tmux-launcher');

/**
 * The pane option a DIRECTION INQUIRY window carries (UI-7uid §3.3).
 *
 * @type {string}
 */
export const INQUIRY_PANE_MARKER = '@bdui_inquiry_bead';

/** Fresh prerequisite spec-authoring windows, keyed by the blocker Bead. */
export const SPEC_AUTHORING_PANE_MARKER = '@bdui_spec_authoring_bead';

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
 * The pane option a Worker queue SESSION-LANE window carries (UI-lbm5 §4.3):
 * the queued Bead runs as this interactive window instead of a headless spawn,
 * and the reconcile pass judges the attempt's liveness by this pane.
 *
 * @type {string}
 */
export const SESSION_LANE_PANE_MARKER = '@bdui_session_lane_bead';

/**
 * How fresh the bridge heartbeat must be to read as active. Read-only
 * observation: a stale beat is reported, never a reason to skip a launch — the
 * session then waits for the user in its window.
 *
 * @type {number}
 */
export const BRIDGE_MAX_AGE_MS = 15_000;

/**
 * One marked window as the hub's `windows` lists it. `pane` is the hub's
 * window handle, any non-empty string; `window` is the name the launcher gave
 * the window when it opened it.
 *
 * @typedef {Object} PaneRow
 * @property {string} session
 * @property {string} window
 * @property {string} pane
 * @property {string} dead - '1' for an ended pane, else '0'.
 * @property {string} agent_running - '1' while a turn runs, else ''.
 * @property {string} agent_attention
 * @property {string} cwd
 * @property {string} agent_runtime
 * @property {string} key - Value of the marker this listing asked for.
 * @property {string|null} session_id - The agent session the window reports.
 * @property {string} mux - The hub's multiplexer name for this window.
 */

/**
 * The multiplexer a record or window names; one that names none reads as
 * `tmux`, which is what every record written before the field existed means.
 *
 * @param {unknown} value
 * @returns {string}
 */
export function muxOf(value) {
  return typeof value === 'string' && value.length > 0 ? value : 'tmux';
}

/**
 * Seconds the hub may wait for a Claude window's `/exit` before it closes the
 * window anyway.
 *
 * @type {number}
 */
const EXIT_WAIT_S = 10;

/**
 * Who asked for a window (UI-1fss §4.4, superseding UI-a119 §3.1's user
 * session first). Every NEW window opens in the configured inquiry session;
 * `user` is a person's click, which also selects that window as the session's
 * current window, while `inquiry` (every automatic launch) leaves it in the
 * background. A window already alive in a user's own session is found and
 * focused where it is, never moved. As an OUTCOME, the value names where the
 * window is: `inquiry` for the configured session, `user` for any other.
 *
 * @typedef {'user'|'inquiry'} LaunchPlacement
 */

/**
 * `codex_project_untrusted` is on every codex launch and on no claude launch:
 * `true` when the folder had an existing non-trusted project entry, `false`
 * when it had none (UI-e5cq §3.2).
 *
 * @typedef {{ session: 'launched', placement: LaunchPlacement, tmux_session: string, tmux_window: string, pane_id: string, mux: string, codex_project_untrusted?: boolean }
 *   | { session: 'already_running', placement?: LaunchPlacement, tmux_session?: string, tmux_window?: string, pane_id?: string, mux?: string }
 *   | { session: 'not_launched', reason: string }} LaunchOutcome
 */

/**
 * The startup screen a marked Worker window shows before its first turn, as
 * the hub's read-only `startup-screen` answered it (UI-e5cq §3.1). `screen`
 * is null when the pane is not alive, has started, or shows no selection
 * screen; `auto` names the row the hub policy would pick. The hub owns the
 * classification and the policy table (ADR UI-jlov).
 *
 * @typedef {Object} StartupScreen
 * @property {'startup'|'trust'|'unknown_screen'} dialog
 * @property {string|null} startup_kind - Only for `dialog=startup`.
 * @property {string} fingerprint
 * @property {string} heading - The masked heading, at most 80 characters.
 * @property {{ choice: string }|null} auto
 */

/**
 * @typedef {{ ok: true, alive: 'alive'|'dead'|'unknown', started: boolean, screen: StartupScreen|null }
 *   | { ok: false, error: string }} StartupScreenResult
 */

/**
 * The hub's `startup-advance` answer (UI-e5cq §3.1). `key_sent` is true when
 * Enter went in, confirmed (`advanced`) or not (`not_confirmed`).
 *
 * @typedef {{ ok: true, advanced: true, key_sent: true, dialog: 'startup'|'trust', startup_kind: string|null, choice: string, heading: string }
 *   | { ok: true, advanced: false, key_sent: boolean, reason: 'screen_changed'|'not_auto'|'already_answered'|'busy'|'not_alive'|'started'|'not_confirmed' }
 *   | { ok: false, error: string }} StartupAdvanceResult
 */

/**
 * @typedef {Object} LaunchInput
 * @property {string} marker
 * @property {string} key
 * @property {string} tmux_session - The configured inquiry session, where
 * every new window opens.
 * @property {string} window_name
 * @property {string} cwd
 * @property {string[]} commandArgs - The arguments AFTER the resolved
 * executable.
 * @property {string} [runner] - Which executable (default `claude`).
 * @property {LaunchPlacement} [placement] - Default `inquiry`.
 * @property {boolean} [conversation_flags] - Default true; `false` launches
 * without the conversation settings' model/effort flags, for a resume whose
 * session keeps its own.
 * @property {Record<string, string>} [env] - Extra variables the window
 * starts with, passed as `session-hub open --env K=V` (UI-lbm5 §4.3). A
 * `CODEX_HOME` here is also the home the codex project trust is written to.
 * @property {{ executable: string, args: string[] }} [wrapper] - Run the
 * runner THROUGH this executable (the claude account's `cswap run <account>
 * --share-history --`): the wrapper starts the runner, so its args are
 * followed directly by the runner's own arguments without its executable.
 */

/**
 * Quote one value for the shell line a window command is shown as. Everything
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
 * One runner's executable, as an absolute path off the Worker's own PATH.
 * Absolute on purpose: the window's shell gets the multiplexer server's PATH,
 * not this process's.
 *
 * The COMMAND NAME comes from the runner catalog (codex-orchestration-parity
 * §4.2), the same resolution the headless dispatch argv is built from, so a
 * `[runner.codex] command` override reaches the interactive window too. An
 * unknown runner resolves nothing — it is never substituted with claude. agy
 * always runs its launcher `~/.local/bin/agy`, the same one the headless agy
 * runner uses, and is never looked up on PATH (agy-runtime §3.6).
 *
 * @param {string} runner
 * @returns {string|null}
 */
export function defaultResolveRunner(runner) {
  if (!SELECTABLE_RUNNERS.includes(runner)) {
    return null;
  }
  if (runner === 'agy') {
    const launcher = agyLauncherPath();
    try {
      fs.accessSync(launcher, fs.constants.X_OK);
      return launcher;
    } catch {
      return null;
    }
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
 * @param {string|null} [home] - The account `CODEX_HOME` the window will run
 * under, when the launch names one; the trust must land in THAT config.
 * @returns {Promise<{ codex_home: string, untrusted: boolean }>} Absolute
 * config home for the new window's environment, and whether an existing
 * entry for the folder is not `trusted`.
 */
async function ensureCodexProjectTrust(cwd, home = null) {
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
    home || process.env.CODEX_HOME || path.join(os.homedir(), '.codex')
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
    const entry = /** @type {Record<string, unknown>} */ (config.projects)[
      root
    ];
    const trusted =
      Boolean(entry) &&
      typeof entry === 'object' &&
      /** @type {Record<string, unknown>} */ (entry).trust_level === 'trusted';
    return { codex_home, untrusted: !trusted };
  }
  const addition = `\n[projects.${JSON.stringify(root)}]\ntrust_level = "trusted"\n`;
  // Inline or malformed project tables cannot be extended by appending a table.
  parseToml(contents + addition);
  fs.mkdirSync(codex_home, { recursive: true, mode: 0o700 });
  fs.appendFileSync(config_path, addition, { mode: 0o600 });
  return { codex_home, untrusted: false };
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
 * Put `--dangerously-skip-permissions` into an agy argv right after its
 * leading `--model <id>`, the order `session-hub open … -- <launcher> --model
 * <id> --dangerously-skip-permissions [--conversation <id>]` names.
 *
 * @param {string[]} args - The arguments AFTER the agy launcher.
 * @returns {string[]}
 */
function withAgyPermissionFlag(args) {
  const head = args[0] === '--model' && args.length >= 2 ? 2 : 0;
  return [
    ...args.slice(0, head),
    '--dangerously-skip-permissions',
    ...args.slice(head)
  ];
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
 * @property {{ checkCredentials: () => boolean, ready: () => boolean, names: () => string[] }} [agyModels] -
 * The current account's agy model list an agy conversation is checked
 * against; defaults to the process-wide list.
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
   * One hub `windows` read for every marker that asked in the same tick. The
   * reconcile pass asks for five markers at once; one call answers all of
   * them, and a failure fails every asker the same way.
   *
   * @param {string[]} markers - Empty only for the reachability probe.
   * @returns {Promise<{ ok: true, windows: Record<string, any>[] }|{ ok: false, error: string }>}
   */
  async function hubWindows(markers) {
    const listed = await hubChecked([
      'windows',
      ...markers.flatMap((marker) => ['--marker', marker])
    ]);
    if (!listed.ok) {
      return listed;
    }
    if (!Array.isArray(listed.value.windows)) {
      return { ok: false, error: 'launch_failed:session_hub_invalid_response' };
    }
    return { ok: true, windows: listed.value.windows };
  }

  /** @type {{ markers: Set<string>, waiters: Array<(result: Awaited<ReturnType<typeof hubWindows>>) => void> }|null} */
  let window_batch = null;

  /**
   * Ask the shared `windows` batch for one marker's windows.
   *
   * @param {string} marker
   * @returns {Promise<Awaited<ReturnType<typeof hubWindows>>>}
   */
  function batchedWindows(marker) {
    return new Promise((resolve) => {
      if (window_batch === null) {
        const batch = {
          markers: new Set(),
          waiters: /** @type {Array<(result: any) => void>} */ ([])
        };
        window_batch = batch;
        queueMicrotask(() => {
          window_batch = null;
          hubWindows([...batch.markers]).then((result) => {
            for (const waiter of batch.waiters) {
              waiter(result);
            }
          });
        });
      }
      window_batch.markers.add(marker);
      window_batch.waiters.push(resolve);
    });
  }

  /**
   * The windows of one marker, with the facts the reconcile pass reads. A row
   * the hub could not fully place is no proof of absence, so it fails the
   * whole listing.
   *
   * @param {string} marker
   * @returns {Promise<{ ok: true, rows: PaneRow[] }|{ ok: false, error: string }>}
   */
  async function listPanesExtended(marker) {
    const listed = await batchedWindows(marker);
    if (!listed.ok) {
      return listed;
    }
    /** @type {PaneRow[]} */
    const rows = [];
    for (const row of listed.windows) {
      const key = row?.markers?.[marker];
      if (typeof key !== 'string' || key.length === 0) {
        continue;
      }
      if (
        typeof row.pane !== 'string' ||
        row.pane.length === 0 ||
        typeof row.tmux_session !== 'string' ||
        row.tmux_session.length === 0
      ) {
        return { ok: false, error: `unparsed window row: ${row.pane}` };
      }
      rows.push({
        session: row.tmux_session,
        window:
          typeof row.window_name === 'string' && row.window_name.length > 0
            ? row.window_name
            : key,
        pane: row.pane,
        dead: row.dead === true ? '1' : '0',
        agent_running: row.running === true ? '1' : '',
        agent_attention: typeof row.attention === 'string' ? row.attention : '',
        cwd: typeof row.cwd === 'string' ? row.cwd : '',
        agent_runtime: typeof row.runtime === 'string' ? row.runtime : '',
        key,
        session_id:
          typeof row.session_id === 'string' && row.session_id.length > 0
            ? row.session_id
            : null,
        mux: muxOf(row.mux)
      });
    }
    return { ok: true, rows };
  }

  /**
   * The windows of one marker without the recovery facts.
   * `ok: false` covers an unreachable hub, a refusal and an unreadable
   * answer — one fact: liveness could not be judged. A reachable hub with no
   * marked window is `ok: true` and an empty list.
   *
   * @param {string} marker
   * @returns {Promise<{ ok: true, rows: Array<{ session: string, pane: string, key: string, dead: string, mux: string }> }|{ ok: false, error: string }>}
   */
  async function listPanes(marker) {
    const listed = await listPanesExtended(marker);
    if (!listed.ok) {
      return listed;
    }
    return {
      ok: true,
      rows: listed.rows.map((row) => ({
        session: row.session,
        pane: row.pane,
        key: row.key,
        dead: row.dead,
        mux: row.mux
      }))
    };
  }

  /**
   * Whether one marked pane is still alive, asked of the backend that owns the
   * pane. A missing row in a `windows` listing is no proof of death: the hub
   * reads an unreadable secondary backend as no rows, so a caller confirms
   * here before it ends anything. Any hub error, missing input or other answer
   * is `unknown`.
   *
   * @param {string|null|undefined} pane_id
   * @param {{ marker: string, key: string }|null|undefined} target
   * @returns {Promise<'alive'|'dead'|'unknown'>}
   */
  async function paneAlive(pane_id, target) {
    if (
      typeof pane_id !== 'string' ||
      pane_id.length === 0 ||
      !target ||
      typeof target.marker !== 'string' ||
      typeof target.key !== 'string'
    ) {
      return 'unknown';
    }
    const read = await hubChecked([
      'alive',
      '--pane',
      pane_id,
      '--marker-option',
      target.marker,
      '--marker-value',
      target.key
    ]);
    if (!read.ok) {
      return 'unknown';
    }
    const alive = read.value.alive;
    return alive === 'alive' || alive === 'dead' ? alive : 'unknown';
  }

  /**
   * Whether a hub answers at all (a `windows` call that names no marker).
   *
   * @returns {Promise<{ ok: true }|{ ok: false, error: string }>}
   */
  async function probe() {
    const listed = await hubWindows([]);
    return listed.ok ? { ok: true } : listed;
  }

  /**
   * Close the window a marker names. A Claude window with `wait` > 0 gets
   * `/exit` first (the hub types it only where it is safe) and closes after
   * the wait; `wait` 0 closes it at once.
   *
   * @param {{ marker: string, key: string }|undefined} target
   * @param {number} wait - Seconds the hub may wait for `/exit`.
   * @returns {Promise<{ ok: true }|{ ok: false, error: string }>}
   */
  async function closeMarked(target, wait) {
    if (!target?.marker || !target.key) {
      return { ok: false, error: 'window_target_missing' };
    }
    const closed = await hubChecked([
      'close',
      '--marker-option',
      target.marker,
      '--marker-value',
      target.key,
      '--wait',
      String(wait)
    ]);
    if (!closed.ok) {
      return closed;
    }
    if (closed.value.found !== true) {
      return { ok: false, error: 'window_not_found' };
    }
    return { ok: true };
  }

  /**
   * Ask the Claude window to exit: the hub types `/exit` where that is safe,
   * waits for the window to end, and closes it.
   *
   * @param {string} pane_id
   * @param {{ marker: string, key: string }} [target]
   */
  async function sendExit(pane_id, target) {
    void pane_id;
    return closeMarked(target, EXIT_WAIT_S);
  }

  /**
   * Close the window selected by the reconciliation owner.
   *
   * @param {string} tmux_session
   * @param {string} tmux_window
   * @param {{ marker: string, key: string }} [target]
   */
  async function killWindow(tmux_session, tmux_window, target) {
    void tmux_session;
    void tmux_window;
    return closeMarked(target, 0);
  }

  /**
   * The whole visible screen of the window a marker names.
   *
   * @param {{ marker: string, key: string }|undefined} target
   * @returns {Promise<{ ok: true, screen: string }|{ ok: false, error: string }>}
   */
  async function windowScreen(target) {
    if (!target?.marker || !target.key) {
      return { ok: false, error: 'window_target_missing' };
    }
    const read = await hubChecked([
      'window-screen',
      '--marker-option',
      target.marker,
      '--marker-value',
      target.key
    ]);
    if (!read.ok) {
      return read;
    }
    if (read.value.found !== true || typeof read.value.screen !== 'string') {
      return { ok: false, error: 'window_not_found' };
    }
    return { ok: true, screen: read.value.screen };
  }

  /**
   * Capture the last Claude prompt, ignoring the status lines below it.
   *
   * @param {string} pane_id
   * @param {{ marker: string, key: string }} [target]
   */
  async function capturePaneTail(pane_id, target) {
    void pane_id;
    const result = await windowScreen(target);
    if (!result.ok) {
      return result;
    }
    return {
      ok: /** @type {const} */ (true),
      line:
        result.screen
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line.startsWith('❯'))
          .at(-1) ?? null
    };
  }

  /**
   * The visible screen of a marked window, as `stdout` text.
   *
   * @param {string} pane_id
   * @param {{ marker: string, key: string }} [target]
   * @returns {Promise<{ ok: true, stdout: string }|{ ok: false, error: string }>}
   */
  async function capturePaneText(pane_id, target) {
    void pane_id;
    const result = await windowScreen(target);
    return result.ok ? { ok: true, stdout: result.screen } : result;
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
      value.pane.length > 0 &&
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
    const selected = await hubChecked(['focus', '--pane', pane]);
    if (!selected.ok) {
      log('session-hub focus failed for %s: %s', key, selected.error);
    }
  }

  /**
   * Where a session this server may not have launched runs, as the hub's
   * `locate` answers it.
   *
   * @param {string} session_id
   * @returns {Promise<{ ok: true, found: true, tmux_session: string, pane: string, mux: string }|{ ok: true, found: false }|{ ok: false, error: string }>}
   */
  async function locateSession(session_id) {
    const located = await hubChecked(['locate', '--session-id', session_id]);
    if (!located.ok) {
      return located;
    }
    const value = located.value;
    if (value.found === false) {
      return { ok: true, found: false };
    }
    if (
      value.found !== true ||
      typeof value.pane !== 'string' ||
      value.pane.length === 0 ||
      typeof value.tmux_session !== 'string' ||
      value.tmux_session.length === 0
    ) {
      return { ok: false, error: 'launch_failed:session_hub_invalid_response' };
    }
    return {
      ok: true,
      found: true,
      tmux_session: value.tmux_session,
      pane: value.pane,
      mux: muxOf(value.mux)
    };
  }

  /**
   * Bring forward the window a confirmed session id runs in, for a session
   * this server did not launch and so holds no marker for (UI-gske §3.3). The
   * hub finds the window; no location string is read or parsed here.
   *
   * @param {string} session_id
   * @returns {Promise<{ ok: true, tmux_session: string, tmux_window: string|null }|{ ok: false, error: string }>}
   */
  async function focusSession(session_id) {
    const located = await locateSession(session_id);
    if (!located.ok) {
      return located;
    }
    if (!located.found) {
      return { ok: false, error: 'unknown_location' };
    }
    const focused = await hubChecked(['focus', '--session-id', session_id]);
    if (!focused.ok) {
      return focused;
    }
    return { ok: true, tmux_session: located.tmux_session, tmux_window: null };
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
        pane_id: value.pane,
        mux: muxOf(value.mux)
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
    const runner_args = runnerArgs(runner, input);
    // A session-lane window (`conversation_flags: false`) carries the model
    // its dispatch gate already checked against the list.
    if (runner === 'agy' && input.conversation_flags !== false) {
      const refused = agyConversationRefusal(runner_args);
      if (refused !== null) {
        log('agy conversation refused for %s: %s', input.key, refused);
        return { session: 'not_launched', reason: `launch_failed:${refused}` };
      }
    }
    const extra_env = input.env || {};
    /** @type {string|null} */
    let codex_home = null;
    let codex_project_untrusted = false;
    if (runner === 'codex') {
      try {
        ({ codex_home, untrusted: codex_project_untrusted } =
          await ensureCodexProjectTrust(
            input.cwd,
            typeof extra_env.CODEX_HOME === 'string' &&
              extra_env.CODEX_HOME.length > 0
              ? extra_env.CODEX_HOME
              : null
          ));
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
      '--session',
      input.tmux_session,
      ...Object.entries(extra_env)
        .filter(([name]) => name !== 'CODEX_HOME' || codex_home === null)
        .flatMap(([name, value]) => ['--env', `${name}=${value}`]),
      ...(codex_home === null ? [] : ['--env', `CODEX_HOME=${codex_home}`]),
      '--',
      ...(input.wrapper
        ? [input.wrapper.executable, ...input.wrapper.args]
        : [executable]),
      // `--no-chrome` keeps the Chrome auto-enable dialog from holding the
      // window before its first turn on an account that never answered it.
      // `--permission-mode bypassPermissions` matches the headless runner so
      // no permission or auto-mode prompt waits for a human in the window.
      ...(runner === 'claude'
        ? [
            '--allow-dangerously-skip-permissions',
            '--permission-mode',
            'bypassPermissions',
            '--no-chrome'
          ]
        : []),
      ...runner_args
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
    // Where the window opens and whether it is selected are independent
    // (§4.4): only a click selects, and only after the hub confirmed the pane.
    if (input.placement === 'user') {
      await focusPane(value.pane, input.key);
    }
    return {
      session: value.status === 'exists' ? 'already_running' : 'launched',
      placement,
      tmux_session: value.tmux_session,
      tmux_window: input.window_name,
      pane_id: value.pane,
      mux: muxOf(value.mux),
      ...(runner === 'codex' ? { codex_project_untrusted } : {})
    };
  }

  /**
   * The runner's own arguments after its executable (or wrapper).
   *
   * @param {string} runner
   * @param {LaunchInput} input
   * @returns {string[]}
   */
  function runnerArgs(runner, input) {
    const args = withLaunchFlags(
      runner,
      input.commandArgs,
      input.conversation_flags === false ? [] : launchFlags(runner)
    );
    if (runner !== 'agy') {
      return args;
    }
    // A conversation with no agy model set opens on the default one
    // (agy-runtime §3.3).
    return withAgyPermissionFlag(
      input.conversation_flags === false || args.includes('--model')
        ? args
        : ['--model', AGY_DEFAULT_MODEL, ...args]
    );
  }

  /**
   * Why an agy conversation may not open now, the same reasons the Worker
   * dispatch refuses with (agy-runtime §3.3): a credential change runs, no
   * list stands for the current account, or the model is not on it.
   *
   * @param {string[]} args - The agy argv after its launcher.
   * @returns {'agy_credential_change'|'agy_model_list_unavailable'|'agy_model_unlisted'|null}
   */
  function agyConversationRefusal(args) {
    if (agyCredentialChangeActive()) {
      return 'agy_credential_change';
    }
    const models = deps.agyModels || agyModelList();
    models.checkCredentials();
    if (!models.ready()) {
      return 'agy_model_list_unavailable';
    }
    const at = args.indexOf('--model');
    const id = at >= 0 ? args[at + 1] : undefined;
    if (typeof id !== 'string' || !models.names().includes(id)) {
      return 'agy_model_unlisted';
    }
    return null;
  }

  /**
   * The agy conversation id of one pane. agy never sets `@agent_session`, so
   * the id is read later from the hub's `list`, which names each agy session
   * with its pane (agy-runtime §3.6). `--all` is required: a window opened
   * with no `--conversation` has no hub record, and the hub lists its live
   * manifest only with `--all`. `session_id` is null until the hub lists an
   * agy session on that pane.
   *
   * @param {string} pane
   * @returns {Promise<{ ok: true, session_id: string|null }|{ ok: false, error: string }>}
   */
  async function agySessionId(pane) {
    const listed = await hubChecked(['list', '--all']);
    if (!listed.ok) {
      return listed;
    }
    const sessions = listed.value.sessions;
    if (!Array.isArray(sessions)) {
      return { ok: false, error: 'launch_failed:session_hub_invalid_response' };
    }
    const found = sessions.find(
      (row) =>
        row &&
        row.agent === 'agy' &&
        row.pane === pane &&
        typeof row.session_id === 'string' &&
        row.session_id.length > 0
    );
    return { ok: true, session_id: found ? found.session_id : null };
  }

  /**
   * The hub arguments that name one marked pane of a runner.
   *
   * @param {string} command
   * @param {{ runner: 'claude'|'codex'|'agy', pane: string, marker: string, key: string }} input
   */
  function startupArgs(command, input) {
    return [
      command,
      '--runner',
      input.runner,
      '--pane',
      input.pane,
      '--marker-option',
      input.marker,
      '--marker-value',
      input.key
    ];
  }

  /**
   * The startup screen of one marked Worker window (UI-e5cq §3.1), read
   * through the hub's read-only `startup-screen`. Nothing is sent to the
   * pane. A refusal, an unreachable hub, or a reply outside the documented
   * shape is a failure the caller only logs.
   *
   * @param {{ runner: 'claude'|'codex'|'agy', pane: string, marker: string, key: string }} input
   * @returns {Promise<StartupScreenResult>}
   */
  async function startupScreen(input) {
    const read = await hubChecked(startupArgs('startup-screen', input));
    if (!read.ok) {
      return read;
    }
    const value = read.value;
    const invalid = {
      ok: /** @type {const} */ (false),
      error: 'launch_failed:session_hub_invalid_response'
    };
    if (
      (value.alive !== 'alive' &&
        value.alive !== 'dead' &&
        value.alive !== 'unknown') ||
      typeof value.started !== 'boolean'
    ) {
      return invalid;
    }
    if (value.screen === null) {
      return {
        ok: true,
        alive: value.alive,
        started: value.alive === 'alive' && value.started,
        screen: null
      };
    }
    const screen = value.screen;
    const auto = screen?.auto;
    if (
      value.alive !== 'alive' ||
      value.started ||
      !screen ||
      typeof screen !== 'object' ||
      (screen.dialog !== 'startup' &&
        screen.dialog !== 'trust' &&
        screen.dialog !== 'unknown_screen') ||
      typeof screen.fingerprint !== 'string' ||
      !/^[0-9a-f]{24}$/.test(screen.fingerprint) ||
      typeof screen.heading !== 'string' ||
      (screen.dialog === 'startup'
        ? typeof screen.startup_kind !== 'string' ||
          screen.startup_kind.length === 0
        : screen.startup_kind !== null) ||
      (auto !== null &&
        (screen.dialog === 'unknown_screen' ||
          !auto ||
          typeof auto !== 'object' ||
          typeof auto.choice !== 'string' ||
          auto.choice.length === 0))
    ) {
      return invalid;
    }
    // Only a `startup` dialog names its kind.
    const startup_kind =
      screen.dialog === 'startup' ? String(screen.startup_kind) : null;
    return {
      ok: true,
      alive: 'alive',
      started: false,
      screen: {
        dialog: screen.dialog,
        startup_kind,
        fingerprint: screen.fingerprint,
        heading: screen.heading,
        auto: auto === null ? null : { choice: auto.choice }
      }
    };
  }

  /**
   * Ask the hub to answer one startup screen of a marked Worker window with
   * its policy row (UI-e5cq §3.1). The hub re-reads the screen, compares the
   * fingerprint and sends the keys; this side never types into the pane.
   *
   * @param {{ runner: 'claude'|'codex'|'agy', pane: string, marker: string, key: string, fingerprint: string }} input
   * @returns {Promise<StartupAdvanceResult>}
   */
  async function startupAdvance(input) {
    const sent = await hubChecked([
      ...startupArgs('startup-advance', input),
      '--fingerprint',
      input.fingerprint
    ]);
    if (!sent.ok) {
      return sent;
    }
    const value = sent.value;
    const invalid = {
      ok: /** @type {const} */ (false),
      error: 'launch_failed:session_hub_invalid_response'
    };
    if (value.advanced === true) {
      if (
        (value.key_sent !== undefined && value.key_sent !== true) ||
        (value.dialog !== 'startup' && value.dialog !== 'trust') ||
        typeof value.choice !== 'string' ||
        value.choice.length === 0 ||
        typeof value.heading !== 'string' ||
        (value.dialog === 'startup'
          ? typeof value.startup_kind !== 'string' ||
            value.startup_kind.length === 0
          : value.startup_kind !== null)
      ) {
        return invalid;
      }
      return {
        ok: true,
        advanced: true,
        key_sent: true,
        dialog: value.dialog,
        startup_kind:
          value.dialog === 'startup' ? String(value.startup_kind) : null,
        choice: value.choice,
        heading: value.heading
      };
    }
    const reasons = [
      'screen_changed',
      'not_auto',
      'already_answered',
      'busy',
      'not_alive',
      'started'
    ];
    if (
      value.advanced !== false ||
      !(value.key_sent === true
        ? value.reason === 'not_confirmed'
        : value.key_sent === false && reasons.includes(value.reason))
    ) {
      return invalid;
    }
    return {
      ok: true,
      advanced: false,
      key_sent: value.key_sent,
      reason: value.reason
    };
  }

  /**
   * Whether the Discord bridge beat recently enough to relay this session's
   * questions. A stat that fails reads as inactive — the caller then tells the
   * user to answer in the window directly.
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
    paneAlive,
    probe,
    sendExit,
    killWindow,
    capturePaneTail,
    capturePaneText,
    readBridgeThreads,
    launch,
    focusRunning,
    locateSession,
    focusSession,
    startupScreen,
    startupAdvance,
    agySessionId,
    bridgeActive
  };
}
