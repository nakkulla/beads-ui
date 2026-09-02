/**
 * The tmux launch primitives beads-ui uses to start an INTERACTIVE `claude`
 * window a person can then reach through the external `claude-discord-bridge`
 * (UI-jw27 §4).
 *
 * This is the generalization of what `direction-inquiry.js` (UI-7uid) proved
 * out: pane-marker duplicate guard, `claude` resolution off the Worker's own
 * PATH, `tmux new-window` under a wrapper that writes the marker BEFORE it
 * execs, and a read-only bridge heartbeat judgment. Two callers now share it —
 * the direction-inquiry trigger and the `[세션에서 해결]` click — so every
 * property below is stated once instead of drifting between them.
 *
 * Three properties are load-bearing and belong to this module, not its callers:
 *
 *   - FAIL-CLOSED ON TMUX. A tmux that cannot be reached means liveness cannot
 *     be judged, and a duplicate nobody could rule out is worse than no
 *     session: the launch is skipped with `tmux_unavailable`.
 *   - THE MARKER PRECEDES THE EXEC. `set-option` and `exec` are joined by `&&`,
 *     so a marker that cannot be written never reaches the exec and the pane
 *     closes. That ordering is what makes "a live pane carrying this key" an
 *     exact test for "a session of this kind is running".
 *   - THE MARKER NAMES THE KIND. Each caller passes its OWN marker option name.
 *     Sharing one marker between two kinds of session would make each kind's
 *     duplicate guard swallow the other's pane: a Bead parked for a direction
 *     inquiry could never also get a resolution session, and vice versa.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { runShell } from '../bd.js';
import { debug } from '../logging.js';

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
 * @typedef {{ session: 'launched', tmux_session: string, tmux_window: string }
 *   | { session: 'already_running' }
 *   | { session: 'not_launched', reason: string }} LaunchOutcome
 */

/**
 * The pane listing format for one marker. Its three trailing fields are the
 * liveness triple; `session_name` leads so the SAME read also answers whether
 * the target session exists, rather than spending another tmux round trip.
 *
 * The separator is a real TAB in the argv: tmux is spawned without a shell and
 * does not expand a backslash escape inside a format.
 *
 * @param {string} marker
 * @returns {string}
 */
export function paneFormat(marker) {
  return `#{session_name}\t#{pane_id}\t#{${marker}}\t#{pane_dead}`;
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
    `tmux set-option -p ${input.marker} ${shellQuote(input.key)}`,
    `&& exec ${input.argv.map((word) => shellQuote(word)).join(' ')}`
  ].join(' ');
}

/**
 * `claude`'s absolute path off the Worker's own PATH. Absolute on purpose: the
 * wrapper runs under `sh -c` inside a tmux pane whose PATH is the tmux server's
 * environment, not this process's.
 *
 * @returns {string|null}
 */
export function defaultResolveClaude() {
  const raw = process.env.PATH;
  if (typeof raw !== 'string' || raw.length === 0) {
    return null;
  }
  for (const dir of raw.split(path.delimiter)) {
    if (dir.length === 0) {
      continue;
    }
    const candidate = path.join(dir, 'claude');
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
 * @typedef {Object} TmuxLauncherDeps
 * @property {(args: string[]) => Promise<{ code: number, stdout: string, stderr: string }>} [runTmux]
 * @property {() => string|null} [resolveClaude]
 * @property {(file_path: string) => { mtimeMs: number }} [statFile]
 * @property {() => number} [now]
 * @property {(...args: any[]) => void} [log]
 * @property {string} [heartbeatPath]
 */

/**
 * Build the shared launcher.
 *
 * @param {TmuxLauncherDeps} [deps]
 */
export function createTmuxLauncher(deps = {}) {
  const log = deps.log || default_log;
  const now = deps.now || (() => Date.now());
  const resolveClaude = deps.resolveClaude || defaultResolveClaude;
  const statFile =
    deps.statFile || ((/** @type {string} */ p) => fs.statSync(p));
  const runTmux =
    deps.runTmux || ((/** @type {string[]} */ args) => runShell('tmux', args));
  const heartbeat_path =
    deps.heartbeatPath ||
    path.join(
      os.homedir(),
      'tmp',
      'claude-discord-bridge',
      'state',
      'heartbeat'
    );

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
      const [session, pane, key, dead] = line.split('\t');
      rows.push({
        session: session ?? '',
        pane: pane ?? '',
        key: key ?? '',
        dead: dead ?? ''
      });
    }
    return { ok: true, rows };
  }

  /**
   * Start one marked interactive window, unless one is already alive for this
   * marker/key pair.
   *
   * The window is confirmed by re-reading the pane list: a pane that is already
   * gone means the marker write failed or the CLI exited at once, and both are
   * the same fact — there is no session. A pane that is alive but not yet
   * marked is a LAUNCH: the wrapper writes the marker before it execs, so the
   * mark is in flight, and the pane could not be running the CLI without it.
   *
   * @param {{ marker: string, key: string, tmux_session: string, window_name: string, cwd: string, commandArgs: string[] }} input
   * `commandArgs` are the arguments AFTER the resolved `claude` path.
   * @returns {Promise<LaunchOutcome>}
   */
  async function launch(input) {
    const listed = await listPanes(input.marker);
    if (!listed.ok) {
      log('tmux list failed for %s: %s', input.key, listed.error);
      return { session: 'not_launched', reason: 'tmux_unavailable' };
    }
    if (listed.rows.some((row) => row.key === input.key && row.dead === '0')) {
      return { session: 'already_running' };
    }
    const claude = resolveClaude();
    if (typeof claude !== 'string' || claude.length === 0) {
      return {
        session: 'not_launched',
        reason: 'launch_failed:claude_not_found'
      };
    }
    if (!listed.rows.some((row) => row.session === input.tmux_session)) {
      /** @type {{ code: number }} */
      let created;
      try {
        created = await runTmux([
          'new-session',
          '-d',
          '-s',
          input.tmux_session
        ]);
      } catch (err) {
        log('tmux new-session threw for %s: %o', input.key, err);
        return { session: 'not_launched', reason: 'tmux_unavailable' };
      }
      if (!created || created.code !== 0) {
        // Another trigger may have created the session between our read and
        // this call: two launches landing together both see it missing and only
        // one `new-session` can win. The session existing is the whole
        // requirement, whoever made it, so re-read before calling this a
        // failure.
        const recheck = await listPanes(input.marker);
        if (
          !recheck.ok ||
          !recheck.rows.some((row) => row.session === input.tmux_session)
        ) {
          return {
            session: 'not_launched',
            reason: 'launch_failed:new_session'
          };
        }
      }
    }
    const wrapper = markerWrapper({
      marker: input.marker,
      key: input.key,
      argv: [claude, ...input.commandArgs]
    });
    /** @type {{ code: number, stdout: string }} */
    let opened;
    try {
      opened = await runTmux([
        'new-window',
        '-d',
        '-P',
        '-F',
        '#{pane_id}',
        '-t',
        input.tmux_session,
        '-n',
        input.window_name,
        '-c',
        input.cwd,
        '--',
        wrapper
      ]);
    } catch (err) {
      log('tmux new-window threw for %s: %o', input.key, err);
      return { session: 'not_launched', reason: 'tmux_unavailable' };
    }
    const pane_id = (opened?.stdout || '').trim();
    if (!opened || opened.code !== 0 || pane_id.length === 0) {
      return { session: 'not_launched', reason: 'launch_failed:new_window' };
    }
    const confirmed = await listPanes(input.marker);
    if (!confirmed.ok) {
      return { session: 'not_launched', reason: 'tmux_unavailable' };
    }
    const row = confirmed.rows.find((r) => r.pane === pane_id);
    if (!row || row.dead !== '0') {
      return { session: 'not_launched', reason: 'launch_failed:exited' };
    }
    return {
      session: 'launched',
      tmux_session: input.tmux_session,
      tmux_window: input.window_name
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

  return { listPanes, launch, bridgeActive };
}
