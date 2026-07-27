import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseToml } from 'smol-toml';
import { debug } from './logging.js';

const log = debug('config');
const DEFAULT_POLL_INTERVAL_SECONDS = 30;
/** Argv of the notification command when `[worker.notify]` pins none. */
const DEFAULT_NOTIFY_CMD = ['discord'];
const DEFAULT_WORKSPACE_CONFIG = {
  default_workspace: null,
  scan_roots: [],
  workspaces: []
};

/** Latch so the `[labels]` deprecation stays one line per process. */
let labels_deprecation_warned = false;

/**
 * Test-only: clear the deprecation latch so each case can observe the warning.
 */
export function __resetConfigWarningsForTest() {
  labels_deprecation_warned = false;
}

/**
 * @param {unknown} value
 * @returns {string | null}
 */
function normalizeWorkspacePath(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  if (trimmed.length === 0 || !path.isAbsolute(trimmed)) {
    return null;
  }

  return path.resolve(trimmed);
}

/**
 * @param {unknown} value
 * @returns {string[]}
 */
function normalizeWorkspacePathList(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  /** @type {string[]} */
  const normalized = [];
  const seen = new Set();

  for (const entry of value) {
    const resolved = normalizeWorkspacePath(entry);
    if (!resolved || seen.has(resolved)) {
      continue;
    }
    seen.add(resolved);
    normalized.push(resolved);
  }

  return normalized;
}

/**
 * @param {any} parsed
 */
function normalizeWorkspaceConfig(parsed) {
  return {
    default_workspace: normalizeWorkspacePath(parsed?.default_workspace),
    scan_roots: normalizeWorkspacePathList(parsed?.scan_roots),
    workspaces: normalizeWorkspacePathList(parsed?.workspaces)
  };
}

/** Default verify_cmd timeout (worker-phase2 §5). */
const DEFAULT_VERIFY_TIMEOUT_MS = 600000;

/**
 * Normalize the `[worker.verify."<absolute workspace path>"]` sections
 * (worker-phase2 §5) into `{ <resolved path>: { cmd, timeout_ms } }`.
 *
 * The command is the worker's PRE-MERGE verification: on a repo with no GitHub
 * CI it stands in for CI as the middle tier of the merge gate, so `[머지]` stays
 * disabled until it passes. A workspace with neither CI nor a `verify_cmd` falls
 * through to the "검증 신호 없음" tier — the button is enabled and the human
 * click is the decision.
 *
 * `cmd` MUST be an argv string array — the worker spawns it WITHOUT a shell,
 * so a shell one-liner string is rejected (section ignored → the workspace
 * counts as verify_cmd-unset).
 *
 * Toolchain constraint: the command runs in a CLEAN detached worktree pinned to
 * the PR's head SHA, which has no untracked toolchain (`.venv` etc.). Configure
 * either a self-contained command or absolute interpreter paths into the
 * canonical checkout, e.g.:
 *
 *   [worker.verify."/Users/me/GitHub/beads-ui"]
 *   cmd = ["npm", "run", "all"]        # self-contained (npm resolves per-tree)
 *   timeout_ms = 600000                # optional, default 600000
 *
 * Sections with a non-absolute key or an invalid `cmd` are ignored.
 *
 * @param {any} parsed
 * @returns {Record<string, { cmd: string[], timeout_ms: number }>}
 */
function normalizeWorkerVerify(parsed) {
  /** @type {Record<string, { cmd: string[], timeout_ms: number }>} */
  const out = {};
  const section = parsed?.worker?.verify;
  if (!section || typeof section !== 'object' || Array.isArray(section)) {
    return out;
  }
  for (const [key, value] of Object.entries(section)) {
    const workspace = normalizeWorkspacePath(key);
    if (!workspace || !value || typeof value !== 'object') {
      continue;
    }
    const raw_cmd = /** @type {any} */ (value).cmd;
    const cmd =
      Array.isArray(raw_cmd) &&
      raw_cmd.length > 0 &&
      raw_cmd.every((a) => typeof a === 'string' && a.length > 0)
        ? raw_cmd.slice()
        : null;
    if (!cmd) {
      log('worker.verify %s ignored: cmd must be a non-empty argv array', key);
      continue;
    }
    const raw_timeout = /** @type {any} */ (value).timeout_ms;
    const timeout_ms =
      typeof raw_timeout === 'number' &&
      Number.isFinite(raw_timeout) &&
      raw_timeout > 0
        ? Math.floor(raw_timeout)
        : DEFAULT_VERIFY_TIMEOUT_MS;
    out[workspace] = { cmd, timeout_ms };
  }
  return out;
}

/**
 * Normalize the `[worker.deploy."<absolute workspace path>"]` sections
 * (worker-deploy-hook §1) into `{ <resolved path>: { cmd, timeout_ms, detached } }`.
 *
 * The command is the repo's POST-MERGE deployment, run as step 3 of the merge
 * cleanup — right after the post-merge verification, exactly where the pr-finish
 * contract puts `install`. It exists because a merge is not a delivery: the
 * shared service keeps serving the pre-merge build until something restarts it.
 *
 * Deliberately symmetric with `[worker.verify]` but with NO auto-detection:
 * guessing a deploy command would run an arbitrary side-effecting process
 * against a live service. A workspace with no section simply has no deployment,
 * and the cleanup's deploy step passes through:
 *
 *   [worker.deploy."/Users/me/GitHub/beads-ui"]
 *   cmd = ["bdui-shared", "restart"]   # required: non-empty argv (NO shell)
 *   timeout_ms = 600000                # optional, default 600000
 *   detached = true                    # optional, default false
 *
 * `detached = true` is for a SELF-RESTARTING deploy (this server's own
 * `bdui-shared restart`): the process is launched unattended after the cleanup
 * has been durably recorded, because waiting on a command that kills the waiter
 * would strand the remaining steps.
 *
 * The command MUST be re-run safe (idempotent): a cleanup that stopped part-way
 * is retried by re-clicking [머지], which always replays the sequence from step
 * 1 — so an already-successful deploy can run again.
 *
 * Sections with a non-absolute key or an invalid `cmd` are ignored.
 *
 * @param {any} parsed
 * @returns {Record<string, { cmd: string[], timeout_ms: number, detached: boolean }>}
 */
function normalizeWorkerDeploy(parsed) {
  /** @type {Record<string, { cmd: string[], timeout_ms: number, detached: boolean }>} */
  const out = {};
  const section = parsed?.worker?.deploy;
  if (!section || typeof section !== 'object' || Array.isArray(section)) {
    return out;
  }
  for (const [key, value] of Object.entries(section)) {
    const workspace = normalizeWorkspacePath(key);
    if (!workspace || !value || typeof value !== 'object') {
      continue;
    }
    const raw_cmd = /** @type {any} */ (value).cmd;
    const cmd =
      Array.isArray(raw_cmd) &&
      raw_cmd.length > 0 &&
      raw_cmd.every((a) => typeof a === 'string' && a.length > 0)
        ? raw_cmd.slice()
        : null;
    if (!cmd) {
      log('worker.deploy %s ignored: cmd must be a non-empty argv array', key);
      continue;
    }
    const raw_timeout = /** @type {any} */ (value).timeout_ms;
    const timeout_ms =
      typeof raw_timeout === 'number' &&
      Number.isFinite(raw_timeout) &&
      raw_timeout > 0
        ? Math.floor(raw_timeout)
        : DEFAULT_VERIFY_TIMEOUT_MS;
    out[workspace] = {
      cmd,
      timeout_ms,
      detached: /** @type {any} */ (value).detached === true
    };
  }
  return out;
}

/**
 * Normalize the `[worker.target_base]` section (worker-target-base §1) into
 * `{ <resolved path>: <branch> }`.
 *
 * The merge target base is a property of the REPO's workflow, not of a bead —
 * every bead in a repo lands on the same branch. Repos whose integration branch
 * is not `main` pin it once here instead of repeating it in each bead's
 * `target_base` metadata (a bead that does pin one still wins):
 *
 *   [worker.target_base]
 *   "/Users/me/GitHub/TRACE-ICI" = "ilsun/dev"
 *
 * A flat path→branch map, keyed like `[worker.verify]`. Entries with a
 * non-absolute key or a non-string / empty value are ignored (one log line).
 *
 * @param {any} parsed
 * @returns {Record<string, string>}
 */
function normalizeWorkerTargetBase(parsed) {
  /** @type {Record<string, string>} */
  const out = {};
  const section = parsed?.worker?.target_base;
  if (!section || typeof section !== 'object' || Array.isArray(section)) {
    return out;
  }
  for (const [key, value] of Object.entries(section)) {
    const workspace = normalizeWorkspacePath(key);
    if (!workspace) {
      log('worker.target_base %s ignored: key must be an absolute path', key);
      continue;
    }
    const base = typeof value === 'string' ? value.trim() : '';
    if (base.length === 0) {
      log(
        'worker.target_base %s ignored: value must be a non-empty branch name',
        key
      );
      continue;
    }
    out[workspace] = base;
  }
  return out;
}

/**
 * Normalize the `[worker.notify]` section (UI-2yoq) into
 * `{ enabled, cmd }`.
 *
 * Worker attempt lifecycle pushes are a MACHINE-level concern, not a per-repo
 * one — a single operator watches every workspace's queue from one Discord
 * channel — so this is one global section instead of the workspace-keyed map
 * `[worker.verify]`/`[worker.deploy]` use:
 *
 *   [worker.notify]
 *   enabled = true
 *   # cmd = ["discord"]   # optional: argv array (spawned WITHOUT a shell)
 *
 * Fail-quiet by default: an absent section, `enabled != true`, or an invalid
 * `cmd` all yield disabled, so a machine that never opted in simply pushes
 * nothing. Retargeting the channel means swapping `cmd` for another
 * command/wrapper — the `discord` CLI itself has a single webhook.
 *
 * @param {any} parsed
 * @returns {{ enabled: boolean, cmd: string[] }}
 */
function normalizeWorkerNotify(parsed) {
  const disabled = { enabled: false, cmd: DEFAULT_NOTIFY_CMD.slice() };
  const section = parsed?.worker?.notify;
  if (!section || typeof section !== 'object' || Array.isArray(section)) {
    return disabled;
  }
  if (/** @type {any} */ (section).enabled !== true) {
    return disabled;
  }
  const raw_cmd = /** @type {any} */ (section).cmd;
  if (raw_cmd === undefined) {
    return { enabled: true, cmd: DEFAULT_NOTIFY_CMD.slice() };
  }
  const cmd =
    Array.isArray(raw_cmd) &&
    raw_cmd.length > 0 &&
    raw_cmd.every((a) => typeof a === 'string' && a.length > 0)
      ? raw_cmd.slice()
      : null;
  if (!cmd) {
    log('worker.notify ignored: cmd must be a non-empty argv array');
    return disabled;
  }
  return { enabled: true, cmd };
}

/**
 * Normalize the top-level `poll_interval_seconds` setting (spec §7). Governs the
 * server-side periodic list-refresh poller: default 30, an explicit `0` disables
 * polling, and any missing / non-numeric / negative value falls back to the
 * default.
 *
 * @param {unknown} value
 * @returns {number}
 */
function normalizePollIntervalSeconds(value) {
  if (typeof value === 'number' && Number.isFinite(value) && value >= 0) {
    return Math.floor(value);
  }
  return DEFAULT_POLL_INTERVAL_SECONDS;
}

/**
 * @param {string} config_path
 * @returns {{
 *   workspace_config: {
 *     default_workspace: string | null,
 *     scan_roots: string[],
 *     workspaces: string[]
 *   },
 *   poll_interval_seconds: number,
 *   worker_verify: Record<string, { cmd: string[], timeout_ms: number }>,
 *   worker_deploy: Record<string, { cmd: string[], timeout_ms: number, detached: boolean }>,
 *   worker_target_base: Record<string, string>,
 *   worker_notify: { enabled: boolean, cmd: string[] }
 * }}
 */
function readRuntimeConfig(config_path) {
  try {
    const raw = fs.readFileSync(config_path, 'utf8');
    /** @type {any} */
    const parsed = parseToml(raw);

    // The `[auth]` section is obsolete (spec §8: full no-auth over the trusted
    // tailnet bind). If a legacy config still carries one, ignore it after a
    // single loud startup warning so operators know to remove it.
    if (parsed?.auth !== undefined) {
      console.warn(
        'config.toml 의 [auth] 섹션은 더 이상 사용되지 않습니다(무인증 전환). 무시하고 계속합니다.'
      );
    }

    // The `[labels]` section is obsolete: label visibility now lives in the
    // per-workspace display-policy store, editable from the UI settings panel
    // and pushed over the `display-policy` channel. `getConfig()` runs more than
    // once per process (CLI entry + server entry), so the warning is latched to
    // stay a single startup line.
    if (parsed?.labels !== undefined && !labels_deprecation_warned) {
      labels_deprecation_warned = true;
      console.warn(
        'config.toml 의 [labels] 섹션은 더 이상 사용되지 않습니다(표시 정책은 UI 설정 패널에서 관리). 무시하고 계속합니다.'
      );
    }

    return {
      workspace_config: normalizeWorkspaceConfig(parsed),
      poll_interval_seconds: normalizePollIntervalSeconds(
        parsed?.poll_interval_seconds
      ),
      worker_verify: normalizeWorkerVerify(parsed),
      worker_deploy: normalizeWorkerDeploy(parsed),
      worker_target_base: normalizeWorkerTargetBase(parsed),
      worker_notify: normalizeWorkerNotify(parsed)
    };
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'ENOENT'
    ) {
      log('missing bdui config %s', config_path);
    } else {
      log('invalid bdui config %s: %o', config_path, error);
    }
    return {
      workspace_config: {
        default_workspace: DEFAULT_WORKSPACE_CONFIG.default_workspace,
        scan_roots: DEFAULT_WORKSPACE_CONFIG.scan_roots.slice(),
        workspaces: DEFAULT_WORKSPACE_CONFIG.workspaces.slice()
      },
      poll_interval_seconds: DEFAULT_POLL_INTERVAL_SECONDS,
      worker_verify: {},
      worker_deploy: {},
      worker_target_base: {},
      worker_notify: { enabled: false, cmd: DEFAULT_NOTIFY_CMD.slice() }
    };
  }
}

export const readRuntimeConfigForTest = readRuntimeConfig;

/**
 * Resolve runtime configuration for the server.
 * Notes:
 * - `app_dir` is resolved relative to the installed package location.
 * - `root_dir` represents the directory where the process was invoked
 * (i.e., the current working directory) so DB resolution follows the
 * caller's context rather than the install location.
 *
 * @returns {{
 *   host: string,
 *   port: number,
 *   app_dir: string,
 *   root_dir: string,
 *   frontend_mode: 'live' | 'static',
 *   url: string,
 *   config_path: string,
 *   workspace_config: {
 *     default_workspace: string | null,
 *     scan_roots: string[],
 *     workspaces: string[]
 *   },
 *   poll_interval_seconds: number,
 *   worker_verify: Record<string, { cmd: string[], timeout_ms: number }>,
 *   worker_deploy: Record<string, { cmd: string[], timeout_ms: number, detached: boolean }>,
 *   worker_target_base: Record<string, string>,
 *   worker_notify: { enabled: boolean, cmd: string[] }
 * }}
 */
export function getConfig() {
  const this_file = fileURLToPath(new URL(import.meta.url));
  const server_dir = path.dirname(this_file);
  const package_root = path.resolve(server_dir, '..');
  const root_dir = process.cwd();
  const config_path =
    process.env.BDUI_CONFIG_PATH ||
    path.join(os.homedir(), '.config', 'bdui', 'config.toml');

  let port_value = Number.parseInt(process.env.PORT || '', 10);
  if (!Number.isFinite(port_value)) {
    port_value = 3000;
  }

  const host_env = process.env.HOST;
  const host_value = host_env && host_env.length > 0 ? host_env : '127.0.0.1';
  const frontend_mode_env = process.env.BDUI_FRONTEND_MODE;
  const frontend_mode = frontend_mode_env === 'live' ? 'live' : 'static';
  const runtime_config = readRuntimeConfig(config_path);

  return {
    host: host_value,
    port: port_value,
    app_dir: path.resolve(package_root, 'app'),
    root_dir,
    frontend_mode,
    url: `http://${host_value}:${port_value}`,
    config_path,
    ...runtime_config
  };
}
