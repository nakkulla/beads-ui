import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { resolveWorkspaceDatabase } from './db.js';
import { debug } from './logging.js';

const log = debug('workspace-discovery');

const DEFAULT_CONFIG_PATH = path.join(
  os.homedir(),
  '.config',
  'bdui-workspaces.conf'
);
const MAX_SCAN_DEPTH = 2;

/**
 * @param {string} config_path
 * @returns {string[]}
 */
function readConfigLines(config_path) {
  try {
    const content = fs.readFileSync(config_path, 'utf8');
    return content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && !line.startsWith('#'));
  } catch {
    return [];
  }
}

function defaultNoop() {}

/**
 * @param {string} dir
 * @returns {string}
 */
function findExistingAncestor(dir) {
  let current = path.resolve(dir);
  while (!fs.existsSync(current)) {
    const parent = path.dirname(current);
    if (parent === current) {
      break;
    }
    current = parent;
  }
  return current;
}

/**
 * @param {string} dir
 * @returns {string[]}
 */
function listWatchRoots(dir) {
  const roots = [dir];

  try {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        roots.push(path.join(dir, entry.name));
      }
    }
  } catch {
    // ignore listing errors; root watch is still useful
  }

  return roots;
}

/**
 * @param {string} dir
 * @returns {boolean}
 */
function hasBeadsDirectory(dir) {
  try {
    return fs.statSync(path.join(dir, '.beads')).isDirectory();
  } catch {
    return false;
  }
}

/**
 * @param {string} base_dir
 * @param {number} max_depth
 * @returns {string[]}
 */
function findBeadsRepos(base_dir, max_depth) {
  /** @type {string[]} */
  const results = [];

  if (hasBeadsDirectory(base_dir)) {
    results.push(base_dir);
  }

  /**
   * @param {string} dir
   * @param {number} depth
   */
  function walk(dir, depth) {
    if (depth > max_depth) {
      return;
    }

    /** @type {fs.Dirent[]} */
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name.startsWith('.')) {
        continue;
      }

      const child = path.join(dir, entry.name);
      if (hasBeadsDirectory(child)) {
        results.push(child);
        continue;
      }

      walk(child, depth + 1);
    }
  }

  walk(base_dir, 1);
  return results;
}

/**
 * @param {string} [config_path]
 * @returns {Array<{ path: string, database: string }>}
 */
export function discoverWorkspaces(config_path) {
  const resolved_config =
    config_path || process.env.BDUI_WORKSPACES_CONFIG || DEFAULT_CONFIG_PATH;
  const scan_dirs = readConfigLines(resolved_config);

  if (scan_dirs.length === 0) {
    log('no scan directories configured in %s', resolved_config);
    return [];
  }

  /** @type {Array<{ path: string, database: string }>} */
  const workspaces = [];

  for (const scan_dir of scan_dirs) {
    const repos = findBeadsRepos(scan_dir, MAX_SCAN_DEPTH);
    for (const repo_path of repos) {
      const db = resolveWorkspaceDatabase({ cwd: repo_path });
      if (db.source !== 'home-default' && db.exists) {
        log('discovered workspace: %s (db: %s)', repo_path, db.path);
        workspaces.push({ path: repo_path, database: db.path });
      }
    }
  }

  log('discovered %d workspace(s) from %s', workspaces.length, resolved_config);
  return workspaces;
}

/**
 * Watch workspace discovery inputs and rerun full discovery on change.
 *
 * @param {{
 *   config_path?: string,
 *   debounce_ms?: number,
 *   onChange?: (workspaces: Array<{ path: string, database: string }>) => void,
 *   onError?: (err: unknown) => void
 * }} [options]
 * @returns {{ close: () => void }}
 */
export function watchWorkspaceDiscovery({
  config_path,
  debounce_ms = 1000,
  onChange,
  onError = defaultNoop
} = {}) {
  const resolved_config =
    config_path || process.env.BDUI_WORKSPACES_CONFIG || DEFAULT_CONFIG_PATH;
  /** @type {Map<string, fs.FSWatcher>} */
  const dir_watchers = new Map();
  /** @type {fs.FSWatcher | null} */
  let config_watcher = null;
  /** @type {fs.FSWatcher | null} */
  let config_parent_watcher = null;
  /** @type {ReturnType<typeof setTimeout> | null} */
  let timer = null;

  const closeDirWatchers = () => {
    for (const watcher of dir_watchers.values()) {
      watcher.close();
    }
    dir_watchers.clear();
  };

  const emit = () => {
    try {
      onChange?.(discoverWorkspaces(resolved_config));
    } catch (err) {
      onError(err);
    }
  };

  const reconfigureDirWatchers = () => {
    closeDirWatchers();

    for (const configured_dir of new Set(readConfigLines(resolved_config))) {
      const watch_roots = fs.existsSync(configured_dir)
        ? listWatchRoots(configured_dir)
        : [findExistingAncestor(configured_dir)];

      for (const watch_root of watch_roots) {
        if (dir_watchers.has(watch_root)) {
          continue;
        }
        try {
          const watcher = fs.watch(watch_root, { persistent: true }, () => {
            schedule();
          });
          dir_watchers.set(watch_root, watcher);
        } catch (err) {
          onError(err);
        }
      }
    }
  };

  function schedule() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      reconfigureDirWatchers();
      emit();
    }, debounce_ms);
    timer.unref?.();
  }

  const attachConfigWatcher = () => {
    if (config_watcher !== null || !fs.existsSync(resolved_config)) {
      return;
    }
    try {
      config_watcher = fs.watch(resolved_config, { persistent: true }, () => {
        reattachConfigWatcher();
        schedule();
      });
    } catch (err) {
      onError(err);
    }
  };

  const reattachConfigWatcher = () => {
    config_watcher?.close();
    config_watcher = null;
    if (fs.existsSync(resolved_config)) {
      attachConfigWatcher();
    }
  };

  const refreshConfigWatcher = () => {
    if (!fs.existsSync(resolved_config)) {
      config_watcher?.close();
      config_watcher = null;
      return;
    }
    reattachConfigWatcher();
  };

  try {
    config_parent_watcher = fs.watch(
      path.dirname(resolved_config),
      { persistent: true },
      (_event_type, filename) => {
        if (!filename || String(filename) !== path.basename(resolved_config)) {
          return;
        }
        refreshConfigWatcher();
        schedule();
      }
    );
  } catch (err) {
    onError(err);
  }

  attachConfigWatcher();

  reconfigureDirWatchers();

  return {
    close() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      config_watcher?.close();
      config_watcher = null;
      config_parent_watcher?.close();
      config_parent_watcher = null;
      closeDirWatchers();
    }
  };
}
