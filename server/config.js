import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseToml } from 'smol-toml';
import { debug } from './logging.js';

const log = debug('config');
const DEFAULT_VISIBLE_PREFIXES = ['has:', 'reviewed:'];
/** @type {string[]} */
const DEFAULT_VISIBLE_EXACT = [];
const HEX_COLOR_RE = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const DEFAULT_WORKSPACE_CONFIG = {
  default_workspace: null,
  scan_roots: [],
  workspaces: []
};
/**
 * @param {unknown} value
 * @returns {string[]}
 */
function normalizeVisiblePrefixes(value) {
  if (!Array.isArray(value)) {
    return DEFAULT_VISIBLE_PREFIXES.slice();
  }

  if (value.length === 0) {
    return [];
  }

  const normalized = value.filter(
    (entry) => typeof entry === 'string' && entry.length > 0
  );

  if (normalized.length === 0) {
    return DEFAULT_VISIBLE_PREFIXES.slice();
  }

  return normalized;
}

/**
 * @param {unknown} value
 * @returns {string[]}
 */
function normalizeVisibleExact(value) {
  if (!Array.isArray(value)) {
    return DEFAULT_VISIBLE_EXACT.slice();
  }

  return value.filter((entry) => typeof entry === 'string' && entry.length > 0);
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isObjectTable(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @returns {value is string}
 */
function isHexColor(value) {
  return typeof value === 'string' && HEX_COLOR_RE.test(value);
}

/**
 * @param {unknown} value
 * @returns {Record<string, { fg: string }>}
 */
function normalizeLabelColorTable(value) {
  if (!isObjectTable(value)) {
    return {};
  }

  /** @type {Record<string, { fg: string }>} */
  const normalized = {};
  for (const [key, rule] of Object.entries(value)) {
    if (key.length === 0 || !isObjectTable(rule) || !isHexColor(rule.fg)) {
      continue;
    }
    normalized[key] = { fg: rule.fg };
  }

  return normalized;
}

/**
 * @param {unknown} value
 * @returns {{ prefix: Record<string, { fg: string }>, exact: Record<string, { fg: string }> }}
 */
function normalizeLabelColorPolicy(value) {
  if (!isObjectTable(value)) {
    return { prefix: {}, exact: {} };
  }

  return {
    prefix: normalizeLabelColorTable(value.prefix),
    exact: normalizeLabelColorTable(value.exact)
  };
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
 * @param {string} config_path
 * @returns {{
 *   label_display_policy: {
 *     visible_prefixes: string[],
 *     visible_exact: string[],
 *     colors: {
 *       prefix: Record<string, { fg: string }>,
 *       exact: Record<string, { fg: string }>
 *     }
 *   },
 *   workspace_config: {
 *     default_workspace: string | null,
 *     scan_roots: string[],
 *     workspaces: string[]
 *   }
 * }}
 */
function readRuntimeConfig(config_path) {
  try {
    const raw = fs.readFileSync(config_path, 'utf8');
    /** @type {any} */
    const parsed = parseToml(raw);

    return {
      label_display_policy: {
        visible_prefixes: normalizeVisiblePrefixes(
          parsed?.labels?.visible_prefixes
        ),
        visible_exact: normalizeVisibleExact(parsed?.labels?.visible_exact),
        colors: normalizeLabelColorPolicy(parsed?.labels?.colors)
      },
      workspace_config: normalizeWorkspaceConfig(parsed)
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
      label_display_policy: {
        visible_prefixes: DEFAULT_VISIBLE_PREFIXES.slice(),
        visible_exact: DEFAULT_VISIBLE_EXACT.slice(),
        colors: { prefix: {}, exact: {} }
      },
      workspace_config: {
        default_workspace: DEFAULT_WORKSPACE_CONFIG.default_workspace,
        scan_roots: DEFAULT_WORKSPACE_CONFIG.scan_roots.slice(),
        workspaces: DEFAULT_WORKSPACE_CONFIG.workspaces.slice()
      }
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
 *   label_display_policy: {
 *     visible_prefixes: string[],
 *     visible_exact: string[],
 *     colors: {
 *       prefix: Record<string, { fg: string }>,
 *       exact: Record<string, { fg: string }>
 *     }
 *   },
 *   workspace_config: {
 *     default_workspace: string | null,
 *     scan_roots: string[],
 *     workspaces: string[]
 *   }
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
