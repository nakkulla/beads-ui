/**
 * Durable provider-hold probes and recovery sequencing.
 *
 * ONE controller serves the whole process (UI-3v1h §5.4): provider holds are
 * server-global, so each global target has one timer and one probe however
 * many workspaces wait on it. Workspaces register their own collaborators
 * (auto-resume consumer, switch reevaluation, tick, timeline, notifier); a
 * release deletes the global target once, settles every attached workspace's
 * memberships, and reports at most one recovery.
 *
 * @import { ChildProcess } from 'node:child_process'
 * @import { Account } from './account-catalog.js'
 * @import { GlobalProviderTarget } from './provider-holds.js'
 */
import debug from 'debug';
import { spawn } from 'node:child_process';
import nodeFs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { resolveCswapPath as defaultResolveCswapPath } from '../routes/claude-usage.js';
import { timingLadder, timingSeconds } from '../timing-settings.js';
import {
  codexAccountAuthFile,
  prepareCodexAccountHome as defaultPrepareCodexAccountHome
} from './codex-account-home.js';
import { providerTargetScope } from './provider-holds.js';
import { acquireClaudeLaunch } from './runner/claude.js';
import { adapterSpec, runtimeCatalog } from './runner/index.js';
import {
  codexAccountHomeDir as defaultCodexAccountHomeDir,
  stateRootDir
} from './state-paths.js';

const PROBE_TIMEOUT_MS = 120_000;
// Defaults of the server-global timing settings `provider_outage_backoff_seconds`,
// `provider_usage_unknown_reset_seconds`, `provider_usage_reset_grace_seconds`
// (UI-ny0h); the values in effect come from the accessors below.
const OUTAGE_BACKOFF_MS = Object.freeze([
  60_000, 120_000, 240_000, 480_000, 900_000, 3_600_000
]);
const log = debug('beads-ui:provider-health');

/**
 * @typedef {import('./queue-store.js').ProviderTarget} ProviderTarget
 */

/**
 * The outage backoff ladder in effect right now, in ms. Read when a probe is
 * scheduled, so a settings change reaches the next scheduling only.
 *
 * @returns {number[]}
 */
export function outageBackoffMs() {
  return timingLadder('provider_outage_backoff_seconds').map(
    (seconds) => seconds * 1000
  );
}

/**
 * Wait before re-probing a usage limit whose reset time is unknown, in ms.
 *
 * @returns {number}
 */
export function usageUnknownResetMs() {
  return timingSeconds('provider_usage_unknown_reset_seconds') * 1000;
}

/**
 * Wait after a usage limit's reset time before the probe, in ms.
 *
 * @returns {number}
 */
export function usageResetGraceMs() {
  return timingSeconds('provider_usage_reset_grace_seconds') * 1000;
}

/**
 * Compose an in-memory timer key from one global target identity. No
 * workspace: a target has one probe for the whole process (UI-3v1h §5.4).
 *
 * @param {string} runner
 * @param {number} generation
 * @param {string} target_id
 */
function targetKey(runner, generation, target_id) {
  return JSON.stringify([runner, generation, target_id]);
}

/**
 * @typedef {Object} WorkspaceHooks
 * @property {string} [repo]
 * @property {any} [timeline]
 * @property {any} [notify]
 * @property {(workspace: string) => Promise<any>} [onPending]
 * @property {(workspace: string, accounts?: Account[]) => Promise<void>} [onSwitchReady]
 * @property {(workspace: string) => Promise<any>|any} [tick]
 */

/**
 * Parse the probe's stream-json lines without accepting noise. `events` keeps
 * the whole stream so the classifier sees the CLI's `rate_limit_event`
 * beside the final `result`.
 *
 * @param {string} output
 * @returns {{ result: Record<string, any>, events: Record<string, any>[] }|null}
 */
function parseProbeOutput(output) {
  /** @type {Record<string, any>[]} */
  const events = [];
  for (const line of output.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed.length === 0) {
      continue;
    }
    /** @type {unknown} */
    let parsed;
    try {
      parsed = JSON.parse(trimmed);
    } catch {
      return null;
    }
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return null;
    }
    events.push(/** @type {Record<string, any>} */ (parsed));
  }
  const result = events.filter((event) => event.type === 'result').at(-1);
  return result ? { result, events } : null;
}

/**
 * Run one lightweight process with a hard timeout.
 *
 * @param {(command: string, args: string[], options: any) => any} spawn_impl
 * @param {string} command
 * @param {string[]} args
 * @param {string} cwd
 * @param {Record<string, string>} env
 * @param {(fn: () => void, delay: number) => any} set_timeout
 * @param {(handle: any) => void} clear_timeout
 * @returns {Promise<{ code: number|null, stdout: string, stderr: string }>}
 */
function runProbeProcess(
  spawn_impl,
  command,
  args,
  cwd,
  env,
  set_timeout,
  clear_timeout
) {
  return new Promise((resolve) => {
    /** @type {any} */
    let child;
    try {
      child = spawn_impl(command, args, {
        cwd,
        env: { ...process.env, ...env },
        shell: false,
        stdio: ['ignore', 'pipe', 'pipe'],
        windowsHide: true
      });
    } catch (err) {
      resolve({ code: null, stdout: '', stderr: String(err) });
      return;
    }
    let stdout = '';
    let stderr = '';
    let settled = false;
    const timer = set_timeout(() => {
      if (settled) {
        return;
      }
      settled = true;
      try {
        child.kill('SIGKILL');
      } catch {
        // A process that already exited needs no further action.
      }
      resolve({ code: null, stdout, stderr: `${stderr}\nprobe_timeout` });
    }, PROBE_TIMEOUT_MS);
    child.stdout?.on('data', (/** @type {unknown} */ chunk) => {
      stdout += String(chunk);
    });
    child.stderr?.on('data', (/** @type {unknown} */ chunk) => {
      stderr += String(chunk);
    });
    child.on('error', (/** @type {unknown} */ err) => {
      if (settled) {
        return;
      }
      settled = true;
      clear_timeout(timer);
      resolve({ code: null, stdout, stderr: `${stderr}\n${String(err)}` });
    });
    child.on('close', (/** @type {unknown} */ code) => {
      if (settled) {
        return;
      }
      settled = true;
      clear_timeout(timer);
      resolve({ code: typeof code === 'number' ? code : null, stdout, stderr });
    });
  });
}

/**
 * Read one `codex exec --json` probe stdout as JSONL (codex-orchestration-parity
 * §5.2). Claude's single-JSON `is_error` reading would call every healthy codex
 * stream a failure, so the two decoders stay separate.
 *
 * `malformed` is true for any non-empty line that is not one JSON object: that
 * is a probe that did not report, never evidence about the provider.
 *
 * @param {string} stdout
 * @returns {{ completed: boolean, failed: boolean, malformed: boolean, events: any[] }}
 */
function decodeCodexProbe(stdout) {
  /** @type {any[]} */
  const events = [];
  let completed = false;
  let failed = false;
  let malformed = false;
  for (const line of String(stdout).split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed.length === 0) {
      continue;
    }
    /** @type {any} */
    let parsed;
    try {
      parsed = JSON.parse(trimmed);
    } catch {
      malformed = true;
      continue;
    }
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      malformed = true;
      continue;
    }
    events.push(parsed);
    if (parsed.type === 'turn.completed') {
      completed = true;
    }
    if (parsed.type === 'turn.failed' || parsed.type === 'error') {
      failed = true;
    }
  }
  return { completed, failed, malformed, events };
}

/**
 * Create the process-wide provider health controller.
 *
 * `store` is the queue store; the global holds are its `providerHolds` unless
 * `holds` is given. `notify`, `timeline`, `repo`, `onPending`, `onSwitchReady`
 * and `tick` are the collaborators of a workspace that never called
 * {@link register} — the single-workspace shorthand.
 *
 * @param {{
 *   store: any,
 *   holds?: ReturnType<typeof import('./provider-holds.js').createProviderHoldStore>,
 *   accountCatalog: any,
 *   notify?: any,
 *   timeline?: any,
 *   onPending?: (workspace: string) => Promise<any>,
 *   onSwitchReady?: (workspace: string, accounts?: Account[]) => Promise<void>,
 *   tick?: (workspace: string) => Promise<any>|any,
 *   repo?: string,
 *   stateDir?: () => string,
 *   spawnImpl?: (command: string, args: string[], options: any) => any,
 *   acquireClaudeLaunch?: typeof acquireClaudeLaunch,
 *   resolveCswapPath?: () => string|null,
 *   prepareCodexAccountHome?: typeof defaultPrepareCodexAccountHome,
 *   codexAccountHomeDir?: (key: string) => string,
 *   codexRoot?: string,
 *   homeDir?: string,
 *   catalog?: ReturnType<typeof runtimeCatalog>,
 *   now?: () => number,
 *   setTimeoutImpl?: (fn: () => void, delay: number) => any,
 *   clearTimeoutImpl?: (handle: any) => void
 * }} deps
 */
export function createProviderHealth(deps) {
  const now = deps.now || (() => Date.now());
  const spawnImpl =
    deps.spawnImpl ||
    ((command, args, options) => spawn(command, args, options));
  const resolveCswapPath = deps.resolveCswapPath || defaultResolveCswapPath;
  const catalog = deps.catalog || runtimeCatalog();
  const setTimeoutImpl = deps.setTimeoutImpl || setTimeout;
  const clearTimeoutImpl = deps.clearTimeoutImpl || clearTimeout;
  const holds = deps.holds || deps.store.providerHolds;
  const stateDir = deps.stateDir || stateRootDir;
  /** @type {Map<string, { timer: any, failures: number, next_probe_at: number }> } */
  const timers = new Map();
  // Switch timers stay per workspace: the switch state is that workspace's
  // policy verdict on its own memberships (UI-3v1h §5.1).
  /** @type {Map<string, { timer: any, ready_at: number }>} */
  const switch_timers = new Map();
  /** @type {Map<string, string>} */
  const catalog_hints = new Map();
  /** @type {(() => void)|null} */
  let unsubscribe_catalog = null;
  // The one predicate the timer path, `sync()` and the manual `↻ 지금 프로브`
  // share: a target whose probe is running now is neither re-armed nor fired a
  // second time. The timer callback drops its key BEFORE the probe starts, so
  // `timers` alone cannot answer this (release spec §3.3).
  /** @type {Set<string>} */
  const in_flight = new Set();
  /** @type {Set<string>} */
  const active_workspaces = new Set();
  /** @type {Map<string, WorkspaceHooks>} */
  const registered = new Map();

  /**
   * One workspace's collaborators, falling back to the controller's own.
   *
   * @param {string} workspace
   * @returns {WorkspaceHooks}
   */
  function hooksFor(workspace) {
    return (
      registered.get(workspace) || {
        repo: deps.repo,
        timeline: deps.timeline,
        notify: deps.notify,
        onPending: deps.onPending,
        onSwitchReady: deps.onSwitchReady,
        tick: deps.tick
      }
    );
  }

  /**
   * Patch one global target; a failed write is logged and the probe keeps
   * its schedule, exactly as a missed persist always did.
   *
   * @param {string} target_id
   * @param {Parameters<typeof holds.update>[1]} patch
   */
  function updateTarget(target_id, patch) {
    try {
      holds.update(target_id, patch);
    } catch (err) {
      log('provider target %s update failed: %o', target_id, err);
    }
  }

  /**
   * Reevaluate without releasing the source target or launching a probe.
   *
   * @param {string} workspace
   * @param {Account[]} [accounts]
   */
  async function reevaluateSwitches(workspace, accounts) {
    const onSwitchReady = hooksFor(workspace).onSwitchReady;
    if (!active_workspaces.has(workspace) || !onSwitchReady) {
      return;
    }
    try {
      if (accounts) {
        await onSwitchReady(workspace, accounts);
      } else {
        await onSwitchReady(workspace);
      }
      sync(workspace);
    } catch (err) {
      log('account switch reevaluation failed for %s: %o', workspace, err);
    }
  }

  /**
   * Advance usage probes from catalog evidence; only the probe releases a hold.
   *
   * @param {Account[]} accounts
   */
  function refreshUsageTargets(accounts) {
    for (const workspace of active_workspaces) {
      void reevaluateSwitches(workspace, accounts);
    }
    if (active_workspaces.size === 0) {
      return;
    }
    const hold = holds.holds().claude;
    if (!hold) {
      return;
    }
    for (const target of hold.targets) {
      if (target.kind !== 'usage_limit' || target.account === null) {
        continue;
      }
      const matches = accounts.filter((row) => row.email === target.account);
      if (matches.length !== 1) {
        continue;
      }
      const account = matches[0];
      if (account.status !== 'ok' || !Array.isArray(account.windows)) {
        continue;
      }
      const scoped = account.windows.filter(
        (window) => window.key?.toLowerCase() === target.model.toLowerCase()
      );
      const windows = scoped.length
        ? scoped
        : account.windows.filter(
            (window) => window.key === '5h' || window.key === '7d'
          );
      if (windows.length === 0) {
        continue;
      }
      const available = windows.every(
        (window) =>
          Number.isFinite(window.pct) && window.pct >= 0 && window.pct < 100
      );
      const resets = windows
        .map((window) =>
          window.resetsAt === null ? NaN : Date.parse(window.resetsAt)
        )
        .filter(Number.isFinite);
      if (!available && resets.length === 0) {
        continue;
      }
      const reset_at = resets.length ? Math.min(...resets) : null;
      const hint = JSON.stringify([available, reset_at]);
      const key = targetKey('claude', hold.generation, target.target_id);
      if (catalog_hints.get(key) === hint) {
        continue;
      }
      const entry = timers.get(key);
      if (!entry && !in_flight.has(key)) {
        continue;
      }
      // Consume an observation even during a probe: a rejected probe must keep
      // its CLI deadline until the catalog supplies a different recovery hint.
      catalog_hints.set(key, hint);
      if (!entry || in_flight.has(key) || entry.failures > 0) {
        continue;
      }
      const deadline = available
        ? now()
        : Math.max(
            now(),
            /** @type {number} */ (reset_at) + usageResetGraceMs()
          );
      if (deadline >= entry.next_probe_at) {
        continue;
      }
      clearTimeoutImpl(entry.timer);
      timers.delete(key);
      scheduleTarget(
        'claude',
        hold.generation,
        hold.since,
        target,
        0,
        deadline
      );
    }
  }

  /** Subscribe only while a workspace is attached. */
  function observeCatalog() {
    if (
      !unsubscribe_catalog &&
      typeof deps.accountCatalog.subscribeClaude === 'function'
    ) {
      unsubscribe_catalog =
        deps.accountCatalog.subscribeClaude(refreshUsageTargets);
    }
  }

  /**
   * Resolve the probe command, argv and env from the same catalog and account
   * route as launch. Codex probes non-interactively in a read-only sandbox and
   * carries the SAME per-account `CODEX_HOME` mirror a real launch prepares —
   * probing the default home would report on a pool nothing is held on
   * (codex-orchestration-parity §5.2). `--skip-git-repo-check` is required
   * because a held workspace need not be a trusted git repo.
   *
   * @param {string} runner
   * @param {{ model: string, account: string|null, [key: string]: unknown }} target
   * @returns {Promise<{ command: string, args: string[], env: Record<string, string> }|null>}
   */
  async function probeArgv(runner, target) {
    const entry = catalog.runners[runner];
    const model = entry?.models?.[target.model];
    if (!entry || !model || typeof model.id !== 'string') {
      return null;
    }
    if (runner === 'codex') {
      const args = [
        'exec',
        '--json',
        '--sandbox',
        'read-only',
        '--skip-git-repo-check',
        '-m',
        model.id,
        'ok'
      ];
      /** @type {Record<string, string>} */
      const env = { CODEX_SILENT: '1' };
      if (target.account !== null) {
        const home_dir = deps.homeDir || os.homedir();
        const process_codex_root = process.env.CODEX_HOME;
        const codex_root =
          deps.codexRoot ||
          (typeof process_codex_root === 'string' &&
          process_codex_root.length > 0
            ? process_codex_root
            : path.join(home_dir, '.codex'));
        const account_home_dir = (
          deps.codexAccountHomeDir || defaultCodexAccountHomeDir
        )(target.account);
        const prepared = await (
          deps.prepareCodexAccountHome || defaultPrepareCodexAccountHome
        )({
          key: target.account,
          auth_file: codexAccountAuthFile(codex_root, target.account),
          codex_root,
          home_dir: account_home_dir
        });
        if (!prepared.ok) {
          return null;
        }
        env.CODEX_HOME = prepared.home_dir;
      }
      return { command: entry.command, args, env };
    }
    const args = [
      '-p',
      'ok',
      '--model',
      model.id,
      '--output-format',
      'stream-json',
      '--verbose'
    ];
    if (runner === 'claude' && target.account !== null) {
      const cswap_path = resolveCswapPath();
      if (!cswap_path) {
        return null;
      }
      return {
        command: cswap_path,
        args: [
          'run',
          target.account,
          '--share-history',
          '--',
          entry.command,
          ...args
        ],
        env: {}
      };
    }
    return { command: entry.command, args, env: {} };
  }

  /**
   * Probe one target and classify a failed response with its runner adapter.
   *
   * @param {string} cwd - Where the probe process runs.
   * @param {string} runner
   * @param {{ model: string, account: string|null, [key: string]: unknown }} target
   * @returns {Promise<{ ok: boolean, outage: { detail: string, message: string, scope: 'provider'|'account', resets_at: number|null }|null, error: string }>}
   */
  async function probeTarget(cwd, runner, target) {
    const argv = await probeArgv(runner, target);
    if (!argv) {
      return { ok: false, outage: null, error: 'probe_route_unavailable' };
    }
    const release =
      runner === 'claude' && target.account !== null
        ? await (deps.acquireClaudeLaunch || acquireClaudeLaunch)(
            target.account
          )
        : () => {};
    const result = await runProbeProcess(
      spawnImpl,
      argv.command,
      argv.args,
      cwd,
      argv.env,
      setTimeoutImpl,
      clearTimeoutImpl
    ).finally(release);
    const classifier = adapterSpec(runner, { catalog }).classifyProviderOutage;
    if (runner === 'codex') {
      const decoded = decodeCodexProbe(result.stdout);
      if (decoded.completed && !decoded.failed && !decoded.malformed) {
        return { ok: true, outage: null, error: '' };
      }
      if (!decoded.failed) {
        // No terminal event, or output this decoder could not read: the probe
        // itself failed. The hold stays and is retried, but nothing here is
        // evidence of a provider outage.
        return {
          ok: false,
          outage: null,
          error: result.stderr.trim() || 'probe_decode_failed'
        };
      }
      const outage = classifier
        ? classifier({
            raw: decoded.events,
            stderr_tail: result.stderr,
            finished_at: now(),
            account_row: null
          })
        : null;
      return {
        ok: false,
        outage,
        error: outage?.message || result.stderr || 'probe_failed'
      };
    }
    const parsed = parseProbeOutput(result.stdout);
    if (result.code === 0 && parsed && parsed.result.is_error === false) {
      return { ok: true, outage: null, error: '' };
    }
    let account_row = null;
    if (runner === 'claude') {
      const account_result = target.account
        ? await deps.accountCatalog.readClaude(target.account)
        : await deps.accountCatalog.activeClaude();
      account_row = account_result.ok ? account_result.account : null;
    }
    const outage = classifier
      ? classifier({
          raw: parsed ? parsed.events : [],
          stderr_tail: result.stderr,
          finished_at: now(),
          account_row
        })
      : null;
    return {
      ok: false,
      outage,
      error: outage?.message || result.stderr || 'probe_failed'
    };
  }

  /**
   * Where a target's probe runs: its origin workspace while that workspace is
   * attached, else the server state directory (UI-3v1h §5.4).
   *
   * @param {GlobalProviderTarget} target
   * @returns {string}
   */
  function probeCwd(target) {
    if (active_workspaces.has(target.origin)) {
      return target.origin;
    }
    const dir = stateDir();
    try {
      nodeFs.mkdirSync(dir, { recursive: true });
    } catch (err) {
      log('probe cwd %s unavailable: %o', dir, err);
    }
    return dir;
  }

  /**
   * Schedule a target only when its exact durable generation still exists.
   *
   * @param {string} runner
   * @param {number} generation
   * @param {number} since
   * @param {GlobalProviderTarget} target
   * @param {number} failures
   * @param {number} [deadline]
   */
  function scheduleTarget(
    runner,
    generation,
    since,
    target,
    failures,
    deadline
  ) {
    if (providerTargetScope(target) === 'unresolved') {
      return;
    }
    const key = targetKey(runner, generation, target.target_id);
    if (timers.has(key) || in_flight.has(key)) {
      return;
    }
    const backoff = outageBackoffMs();
    const default_delay =
      target.kind === 'usage_limit' && failures === 0
        ? target.resets_at === null
          ? usageUnknownResetMs()
          : Math.max(0, target.resets_at + usageResetGraceMs() - now())
        : backoff[Math.min(failures, backoff.length - 1)];
    const next_probe_at =
      deadline === undefined ? now() + default_delay : deadline;
    const delay = Math.max(0, next_probe_at - now());
    // The held tile names the next probe clock, so the deadline is written
    // before the timer is armed: a timer alone dies with the process and the
    // badge would read `리셋 미상` after every restart.
    updateTarget(target.target_id, { next_probe_at });
    const timer = setTimeoutImpl(() => {
      timers.delete(key);
      void runTarget(runner, generation, since, target, failures);
    }, delay);
    timer?.unref?.();
    timers.set(key, { timer, failures, next_probe_at });
  }

  /**
   * Require a successful catalog read before declaring an account absent.
   *
   * @param {string} runner
   * @param {string|null} account
   */
  async function accountAbsent(runner, account) {
    if (account === null || (runner !== 'claude' && runner !== 'codex')) {
      return false;
    }
    try {
      const listed =
        runner === 'claude'
          ? await deps.accountCatalog.listClaude()
          : await deps.accountCatalog.listCodex();
      return (
        listed.ok &&
        !listed.accounts.some(
          (/** @type {{ key: string }} */ row) => row.key === account
        )
      );
    } catch {
      return false;
    }
  }

  /**
   * The account catalog's keys for one runner, or null when it cannot be read
   * — settlement then keeps each membership's own account (UI-3v1h §6).
   *
   * @param {string} runner
   * @returns {Promise<string[]|null>}
   */
  async function listedKeys(runner) {
    if (runner !== 'claude' && runner !== 'codex') {
      return null;
    }
    try {
      const listed =
        runner === 'claude'
          ? await deps.accountCatalog.listClaude()
          : await deps.accountCatalog.listCodex();
      return listed?.ok && Array.isArray(listed.accounts)
        ? listed.accounts.map((/** @type {{ key: string }} */ row) => row.key)
        : null;
    } catch {
      return null;
    }
  }

  /**
   * Membership settlement for one workspace (UI-3v1h §5.4). The catalog is
   * read only for the runners whose released memberships name an account.
   *
   * @param {string} workspace
   * @param {string[]} [released_runners] - Runners a release just emptied.
   */
  async function settleWorkspace(workspace, released_runners = []) {
    const members = deps.store.snapshot(workspace).provider_hold_members || {};
    /** @type {Set<string>} */
    const runners = new Set();
    for (const member of Object.values(members)) {
      const bound =
        /** @type {{ runner: string, target_id: string, account: string|null }} */ (
          member
        );
      if (bound.account !== null && !holds.has(bound.target_id)) {
        runners.add(bound.runner);
      }
    }
    /** @type {Record<string, string[]|null>} */
    const listed = {};
    for (const runner of runners) {
      listed[runner] = await listedKeys(runner);
    }
    return deps.store.settleProviderMembers(workspace, {
      listed,
      runners: released_runners
    });
  }

  /**
   * Release one global target (UI-3v1h §5.4): delete it once, settle every
   * attached workspace's memberships, run each workspace's own auto-resume and
   * switch reevaluation, report ONE recovery when any attempt became eligible
   * anywhere, and tick every workspace. A failed delete leaves the target
   * standing for the next probe.
   *
   * A release because the account left the catalog is not a recovery: as
   * before, it writes `provider_hold_released` history for each attempt and
   * sends no recovery or disarm notification.
   *
   * @param {string} runner
   * @param {number} generation
   * @param {number} since
   * @param {GlobalProviderTarget} live_target
   * @param {'recovered'|'account_absent'} reason
   */
  async function releaseTarget(runner, generation, since, live_target, reason) {
    /** @type {ReturnType<typeof holds.remove>} */
    let removed = null;
    try {
      removed = holds.remove(live_target.target_id);
    } catch (err) {
      log('provider target %s release failed: %o', live_target.target_id, err);
    }
    if (!removed) {
      sync();
      return;
    }
    const workspaces = [...active_workspaces];
    /** @type {Array<{ workspace: string, settled: any }>} */
    const settlements = [];
    for (const workspace of workspaces) {
      try {
        settlements.push({
          workspace,
          settled: await settleWorkspace(workspace, [runner])
        });
      } catch (err) {
        log('membership settlement failed for %s: %o', workspace, err);
      }
    }
    /** @type {string[]} */
    const resumed_beads = [];
    /** @type {string[]} */
    const refusals = [];
    /** @type {{ workspace: string, bead_id: string }|null} */
    let first = null;
    for (const { workspace, settled } of settlements) {
      const hooks = hooksFor(workspace);
      const recovered_ids = settled.recovered_attempt_ids || [];
      if (reason === 'recovered') {
        for (const attempt_id of settled.disarmed_attempt_ids || []) {
          const attempt = settled.queue.attempts[attempt_id];
          if (attempt) {
            void hooks.notify?.providerAutoResumeDisarmed?.({
              bead_id: attempt.bead_id,
              runner,
              reason: 'auto_resume_cap',
              repo: hooks.repo
            });
          }
        }
      } else {
        for (const attempt_id of recovered_ids) {
          const attempt = settled.queue.attempts[attempt_id];
          if (attempt) {
            hooks.timeline?.append({
              bead_id: attempt.bead_id,
              attempt_id,
              kind: 'provider_hold_released',
              seq: generation,
              summary: `${runner} 보류 해제 · account_absent`
            });
          }
        }
      }
      const outcome = await hooks.onPending?.(workspace);
      resumed_beads.push(...(outcome?.resumed_beads || []));
      refusals.push(...(outcome?.refusals || []));
      await reevaluateSwitches(workspace);
      const recovered_attempt = recovered_ids[0]
        ? settled.queue.attempts[recovered_ids[0]]
        : null;
      if (!recovered_attempt || reason !== 'recovered') {
        continue;
      }
      // The receipt's account is what the resume actually launches on.
      const recovered_account =
        (settled.pending || []).find(
          (
            /** @type {{ attempt_id: string, account: string|null }} */ receipt
          ) => receipt.attempt_id === recovered_attempt.attempt_id
        )?.account ?? live_target.account;
      hooks.timeline?.append({
        bead_id: recovered_attempt.bead_id,
        attempt_id: recovered_attempt.attempt_id,
        kind: 'provider_recovered',
        seq: generation,
        summary: `${runner} 공급자 회복`,
        ...(recovered_account ? { account: recovered_account } : {})
      });
      if (!first) {
        first = { workspace, bead_id: recovered_attempt.bead_id };
      }
    }
    if (first) {
      void hooksFor(first.workspace).notify?.providerRecovered?.({
        bead_id: first.bead_id,
        runner,
        duration_ms: Math.max(0, now() - since),
        resumed_beads,
        refusal: refusals.join(', ') || null,
        repo: live_target.origin
      });
    }
    for (const workspace of workspaces) {
      await hooksFor(workspace).tick?.(workspace);
    }
    sync();
  }

  /**
   * Tick every attached workspace after a gate narrowed.
   */
  async function tickAll() {
    for (const workspace of [...active_workspaces]) {
      await hooksFor(workspace).tick?.(workspace);
    }
  }

  /**
   * Execute one scheduled target transition and then resynchronize timers.
   *
   * @param {string} runner
   * @param {number} generation
   * @param {number} since
   * @param {GlobalProviderTarget} target
   * @param {number} failures
   */
  async function runTarget(runner, generation, since, target, failures) {
    const located = holds.find(target.target_id);
    if (
      !located ||
      located.runner !== runner ||
      located.generation !== generation
    ) {
      sync();
      return;
    }
    const live_target = located.target;
    const probe_key = targetKey(runner, generation, live_target.target_id);
    in_flight.add(probe_key);
    /** @type {Awaited<ReturnType<typeof probeTarget>>} */
    let result;
    try {
      if (await accountAbsent(runner, live_target.account)) {
        await releaseTarget(
          runner,
          generation,
          since,
          live_target,
          'account_absent'
        );
        return;
      }
      result = await probeTarget(probeCwd(live_target), runner, live_target);
    } finally {
      in_flight.delete(probe_key);
    }
    if (result.ok) {
      await releaseTarget(runner, generation, since, live_target, 'recovered');
      return;
    }
    // The mirror of the provider-only promotion below: when the classifier
    // now reads a standing outage as an account failure, the target follows
    // it down to an account-scoped gate. `rearm_count` and the hold's
    // `since` are untouched and remain display observations. An
    // `account === null` target is NOT demoted: it would become a target that
    // neither probes nor auto-resumes (outage spec §6 F3).
    if (
      live_target.kind === 'outage' &&
      live_target.account !== null &&
      result.outage?.scope === 'account'
    ) {
      updateTarget(live_target.target_id, {
        kind: 'usage_limit',
        resets_at: result.outage.resets_at,
        last_error: result.error
      });
      // The gate just narrowed from the whole runner to one account, so the
      // waiting rows another account can serve are dispatchable NOW — in every
      // workspace. Nothing else re-selects them in an unattended Worker — the
      // same reason the recovery path above ticks before it re-syncs (impl
      // review r1).
      await tickAll();
      sync();
      return;
    }
    if (live_target.kind === 'usage_limit') {
      if (result.outage?.detail === 'usage_limit') {
        updateTarget(live_target.target_id, {
          resets_at: result.outage.resets_at,
          rearm_count: live_target.rearm_count + 1,
          last_error: result.error
        });
      } else if (result.outage?.scope === 'provider') {
        updateTarget(live_target.target_id, { kind: 'outage' });
      } else {
        updateTarget(live_target.target_id, {
          last_error: result.error,
          rearm_count: live_target.rearm_count + 1
        });
        // An expired usage reset is not a retry deadline for an unclassified
        // or account failure; carry the probe backoff without widening its gate.
        scheduleTarget(runner, generation, since, live_target, failures + 1);
        return;
      }
      sync();
      return;
    }
    scheduleTarget(runner, generation, since, live_target, failures + 1);
  }

  /**
   * Pull one runner's recovery probes forward to now (`↻ 지금 프로브`, release
   * spec §3.3). Every eligible target of that runner is fired immediately, its
   * armed timer dropped first; a target whose probe is already running is
   * skipped. `failures` is carried over so
   * repeated clicks cannot reset the backoff into a probe storm.
   *
   * Nothing is awaited: a probe runs up to 120s and the caller only learns that
   * it was armed. The outcome flows through the existing recovery path. The
   * global hold is the one fired: no workspace argument, because one probe
   * serves every workspace waiting on the target (UI-3v1h §5.4).
   *
   * @param {string} runner
   * @returns {{ armed: number, eligible: number }}
   */
  function probeNow(runner) {
    const hold = holds.holds()[runner];
    if (!hold) {
      return { armed: 0, eligible: 0 };
    }
    let armed = 0;
    let eligible = 0;
    for (const target of hold.targets) {
      if (providerTargetScope(target) === 'unresolved') {
        continue;
      }
      eligible += 1;
      const key = targetKey(runner, hold.generation, target.target_id);
      if (in_flight.has(key)) {
        continue;
      }
      const entry = timers.get(key);
      const failures = entry?.failures || 0;
      if (entry) {
        clearTimeoutImpl(entry.timer);
        timers.delete(key);
      }
      armed += 1;
      void runTarget(runner, hold.generation, hold.since, target, failures);
    }
    return { armed, eligible };
  }

  /**
   * Arm one workspace's switch-ready timers from its own projection: the
   * switch verdict is that workspace's, so the timer reevaluates it alone.
   *
   * @param {string} workspace
   */
  function syncSwitches(workspace) {
    /** @type {Set<string>} */
    const wanted_switches = new Set();
    const can_switch = Boolean(hooksFor(workspace).onSwitchReady);
    const queue = deps.store.snapshot(workspace);
    for (const [runner, hold] of Object.entries(queue.provider_hold)) {
      for (const target of /** @type {any} */ (hold).targets) {
        if (
          !can_switch ||
          target.kind !== 'usage_limit' ||
          target.auto_switch !== 'none' ||
          typeof target.switch_ready_at !== 'number' ||
          !Number.isFinite(target.switch_ready_at)
        ) {
          continue;
        }
        const key = JSON.stringify([
          workspace,
          runner,
          target.target_id ?? `${target.model}:${target.account}`
        ]);
        wanted_switches.add(key);
        const previous = switch_timers.get(key);
        if (previous?.ready_at === target.switch_ready_at) {
          continue;
        }
        if (previous) {
          clearTimeoutImpl(previous.timer);
        }
        const timer = setTimeoutImpl(
          () => {
            switch_timers.delete(key);
            void reevaluateSwitches(workspace);
          },
          Math.min(2_147_483_647, Math.max(0, target.switch_ready_at - now()))
        );
        timer?.unref?.();
        switch_timers.set(key, {
          timer,
          ready_at: target.switch_ready_at
        });
      }
    }
    for (const [key, entry] of switch_timers) {
      if (key.startsWith(`${JSON.stringify([workspace]).slice(0, -1)},`)) {
        if (!wanted_switches.has(key)) {
          clearTimeoutImpl(entry.timer);
          switch_timers.delete(key);
        }
      }
    }
  }

  /**
   * Reconcile probe timers against the global hold set, and the switch timers
   * of one workspace (every attached one when none is named). Nothing is
   * armed while no workspace is attached.
   *
   * @param {string} [workspace]
   */
  function sync(workspace) {
    if (active_workspaces.size === 0) {
      return;
    }
    /** @type {Set<string>} */
    const wanted = new Set();
    for (const [runner, hold] of Object.entries(holds.holds())) {
      for (const target of hold.targets) {
        const key = targetKey(runner, hold.generation, target.target_id);
        wanted.add(key);
        const failures = timers.get(key)?.failures || 0;
        scheduleTarget(runner, hold.generation, hold.since, target, failures);
      }
    }
    for (const [key, entry] of timers) {
      if (!wanted.has(key)) {
        clearTimeoutImpl(entry.timer);
        timers.delete(key);
      }
    }
    for (const key of catalog_hints.keys()) {
      if (!wanted.has(key)) {
        catalog_hints.delete(key);
      }
    }
    const targets =
      workspace === undefined
        ? [...active_workspaces]
        : active_workspaces.has(workspace)
          ? [workspace]
          : [];
    for (const target_workspace of targets) {
      syncSwitches(target_workspace);
    }
  }

  return {
    /**
     * Bind one workspace's own collaborators: its auto-resume consumer,
     * switch reevaluation, tick, timeline and notifier.
     *
     * @param {string} workspace
     * @param {WorkspaceHooks} hooks
     */
    register(workspace, hooks) {
      registered.set(workspace, hooks);
    },

    /**
     * Attach one workspace: settle the memberships a restart may have left
     * released (§5.4), drop receipts whose attempt is held again, restore
     * pending recovery work, then schedule the global holds.
     *
     * @param {string} workspace
     */
    async start(workspace) {
      active_workspaces.add(workspace);
      observeCatalog();
      await settleWorkspace(workspace);
      deps.store.discardStaleAutoResumePending(workspace);
      await hooksFor(workspace).onPending?.(workspace);
      await reevaluateSwitches(workspace);
      sync(workspace);
    },

    /**
     * Start or refresh one workspace after a hold mutation.
     *
     * @param {string} workspace
     */
    sync(workspace) {
      active_workspaces.add(workspace);
      observeCatalog();
      sync(workspace);
    },

    /**
     * Detach one workspace. Its switch timers go with it; the probe timers
     * stay while any workspace remains attached, since they serve all of them.
     *
     * @param {string} workspace
     */
    stop(workspace) {
      active_workspaces.delete(workspace);
      const prefix = `${JSON.stringify([workspace]).slice(0, -1)},`;
      for (const [key, entry] of switch_timers) {
        if (key.startsWith(prefix)) {
          clearTimeoutImpl(entry.timer);
          switch_timers.delete(key);
        }
      }
      if (active_workspaces.size > 0) {
        return;
      }
      if (unsubscribe_catalog) {
        unsubscribe_catalog();
        unsubscribe_catalog = null;
      }
      for (const entry of timers.values()) {
        clearTimeoutImpl(entry.timer);
      }
      timers.clear();
      catalog_hints.clear();
    },

    probeNow,
    probeArgv,
    probeTarget
  };
}

export { OUTAGE_BACKOFF_MS };
