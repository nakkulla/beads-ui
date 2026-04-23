import fs from 'node:fs';
import path from 'node:path';
import { resolveWorkspaceDatabase } from './db.js';
import { debug } from './logging.js';

const log = debug('workspace-discovery');
const MAX_SCAN_DEPTH = 2;

/**
 * @param {string} repo_path
 * @returns {{ path: string, database: string } | null}
 */
function toWorkspaceEntry(repo_path) {
  const resolved = path.resolve(repo_path);
  const db = resolveWorkspaceDatabase({ cwd: resolved });
  if (db.source === 'home-default' || !db.exists) {
    return null;
  }
  return {
    path: resolved,
    database: db.path
  };
}

/**
 * @param {string} repo_path
 * @returns {boolean}
 */
export function isWorkspacePath(repo_path) {
  return toWorkspaceEntry(repo_path) !== null;
}

/**
 * @param {string} base_dir
 * @param {number} max_depth
 * @returns {string[]}
 */
function findBeadsRepos(base_dir, max_depth) {
  /** @type {string[]} */
  const results = [];

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
      const beads_path = path.join(child, '.beads');
      try {
        if (fs.statSync(beads_path).isDirectory()) {
          results.push(child);
          continue;
        }
      } catch {
        // recurse below when there is no .beads directory
      }

      walk(child, depth + 1);
    }
  }

  walk(base_dir, 1);
  return results;
}

/**
 * @param {unknown} value
 * @returns {string[]}
 */
function normalizePathList(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  /** @type {string[]} */
  const paths = [];
  for (const entry of value) {
    if (typeof entry !== 'string' || entry.trim().length === 0) {
      continue;
    }
    if (!path.isAbsolute(entry)) {
      continue;
    }
    paths.push(path.resolve(entry));
  }
  return paths;
}

/**
 * @param {Array<{ path: string, database: string }>} workspaces
 * @returns {Array<{ path: string, database: string }>}
 */
function dedupeWorkspaces(workspaces) {
  /** @type {Array<{ path: string, database: string }>}
   */
  const deduped = [];
  const seen = new Set();

  for (const workspace of workspaces) {
    const resolved = path.resolve(workspace.path);
    if (seen.has(resolved)) {
      continue;
    }
    seen.add(resolved);
    deduped.push({
      path: resolved,
      database: workspace.database
    });
  }

  return deduped;
}

/**
 * @param {{ workspace_config?: { scan_roots?: unknown, workspaces?: unknown } }} [input]
 * @returns {Array<{ path: string, database: string }>}
 */
export function discoverWorkspaces(input = {}) {
  const workspace_config = input.workspace_config;
  if (!workspace_config) {
    return [];
  }

  /** @type {Array<{ path: string, database: string }>}
   */
  const workspaces = [];

  for (const repo_path of normalizePathList(workspace_config.workspaces)) {
    const workspace = toWorkspaceEntry(repo_path);
    if (!workspace) {
      continue;
    }
    workspaces.push(workspace);
  }

  for (const scan_dir of normalizePathList(workspace_config.scan_roots)) {
    for (const repo_path of findBeadsRepos(scan_dir, MAX_SCAN_DEPTH)) {
      const workspace = toWorkspaceEntry(repo_path);
      if (!workspace) {
        continue;
      }
      workspaces.push(workspace);
    }
  }

  const deduped = dedupeWorkspaces(workspaces);
  log('discovered %d workspace(s) from normalized config', deduped.length);
  return deduped;
}

/**
 * @param {{
 *   configured_workspaces: Array<{ path: string, database: string }>,
 *   default_workspace?: string | null,
 *   cwd?: string | null
 * }} input
 * @returns {string | null}
 */
export function resolveStartupWorkspace(input) {
  if (
    input.default_workspace &&
    input.configured_workspaces.some(
      (workspace) => workspace.path === path.resolve(input.default_workspace)
    )
  ) {
    return path.resolve(input.default_workspace);
  }

  if (input.cwd && isWorkspacePath(input.cwd)) {
    return path.resolve(input.cwd);
  }

  return input.configured_workspaces[0]?.path ?? null;
}
