import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseToml } from 'smol-toml';
import { debug } from './logging.js';

const log = debug('config');
const DEFAULT_POLL_INTERVAL_SECONDS = 30;
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
 *   poll_interval_seconds: number
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
      )
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
      poll_interval_seconds: DEFAULT_POLL_INTERVAL_SECONDS
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
 *   poll_interval_seconds: number
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
