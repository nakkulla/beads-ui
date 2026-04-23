import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { debug } from './logging.js';

const log = debug('config');
const DEFAULT_VISIBLE_PREFIXES = ['has:', 'reviewed:'];

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
 * @param {string} config_path
 * @returns {{ visible_prefixes: string[] }}
 */
function readLabelDisplayPolicy(config_path) {
  try {
    const raw = fs.readFileSync(config_path, 'utf8');
    const parsed = JSON.parse(raw);

    return {
      visible_prefixes: normalizeVisiblePrefixes(
        parsed?.labels?.visible_prefixes
      )
    };
  } catch (error) {
    log('invalid label display policy config %s: %o', config_path, error);
    return {
      visible_prefixes: DEFAULT_VISIBLE_PREFIXES.slice()
    };
  }
}

/**
 * Resolve runtime configuration for the server.
 * Notes:
 * - `app_dir` is resolved relative to the installed package location.
 * - `root_dir` represents the directory where the process was invoked
 * (i.e., the current working directory) so DB resolution follows the
 * caller's context rather than the install location.
 *
 * @returns {{ host: string, port: number, app_dir: string, root_dir: string, frontend_mode: 'live' | 'static', url: string, label_display_policy: { visible_prefixes: string[] } }}
 */
export function getConfig() {
  const this_file = fileURLToPath(new URL(import.meta.url));
  const server_dir = path.dirname(this_file);
  const package_root = path.resolve(server_dir, '..');
  // Always reflect the directory from which the process was started
  const root_dir = process.cwd();
  const config_path =
    process.env.BDUI_CONFIG_PATH ||
    path.join(os.homedir(), '.config', 'bdui', 'config.json');

  let port_value = Number.parseInt(process.env.PORT || '', 10);
  if (!Number.isFinite(port_value)) {
    port_value = 3000;
  }

  const host_env = process.env.HOST;
  const host_value = host_env && host_env.length > 0 ? host_env : '127.0.0.1';
  const frontend_mode_env = process.env.BDUI_FRONTEND_MODE;
  const frontend_mode = frontend_mode_env === 'live' ? 'live' : 'static';

  return {
    host: host_value,
    port: port_value,
    app_dir: path.resolve(package_root, 'app'),
    root_dir,
    frontend_mode,
    url: `http://${host_value}:${port_value}`,
    label_display_policy: readLabelDisplayPolicy(config_path)
  };
}
