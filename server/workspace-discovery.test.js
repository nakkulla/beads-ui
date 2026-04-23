import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

/** @type {string[]} */
const tmps = [];

function mkdtemp() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-discovery-'));
  tmps.push(dir);
  return dir;
}

/**
 * @param {string} parent_dir
 * @param {string} repo_name
 * @returns {string}
 */
function createBeadsRepo(parent_dir, repo_name) {
  const repo_path = path.join(parent_dir, repo_name);
  const beads_dir = path.join(repo_path, '.beads');
  fs.mkdirSync(beads_dir, { recursive: true });
  fs.writeFileSync(path.join(beads_dir, 'metadata.json'), '{}');
  return repo_path;
}

beforeEach(() => {
  vi.resetModules();
  delete process.env.BDUI_WORKSPACES_CONFIG;
});

afterEach(() => {
  for (const d of tmps.splice(0)) {
    try {
      fs.rmSync(d, { recursive: true, force: true });
    } catch {
      // ignore cleanup errors
    }
  }
});

describe('discoverWorkspaces', () => {
  test('returns empty array when no workspace_config is present', async () => {
    const mod = await import('./workspace-discovery.js');
    const result = mod.discoverWorkspaces({ workspace_config: undefined });
    expect(result).toEqual([]);
  });

  test('merges explicit workspaces before scan_roots and dedupes by path', async () => {
    const tmp = mkdtemp();
    const explicit = createBeadsRepo(tmp, 'repo-a');
    const scan_dir = path.join(tmp, 'projects');
    fs.mkdirSync(scan_dir);
    const scanned = createBeadsRepo(scan_dir, 'repo-b');

    const mod = await import('./workspace-discovery.js');
    const result = mod.discoverWorkspaces({
      workspace_config: {
        default_workspace: scanned,
        scan_roots: [scan_dir],
        workspaces: [explicit, explicit, 'relative-rejected']
      }
    });

    expect(result.map((workspace) => workspace.path)).toEqual([
      explicit,
      scanned
    ]);
  });

  test('discovers .beads repos at depth 2 from scan_roots', async () => {
    const tmp = mkdtemp();
    const scan_dir = path.join(tmp, 'projects');
    const org_dir = path.join(scan_dir, 'my-org');
    fs.mkdirSync(org_dir, { recursive: true });
    const deep_repo = createBeadsRepo(org_dir, 'deep-repo');

    const mod = await import('./workspace-discovery.js');
    const result = mod.discoverWorkspaces({
      workspace_config: {
        default_workspace: null,
        scan_roots: [scan_dir],
        workspaces: []
      }
    });

    expect(result).toHaveLength(1);
    expect(result[0].path).toBe(deep_repo);
  });

  test('prefers a valid default_workspace even when it is not in configured lists', async () => {
    const tmp = mkdtemp();
    const default_repo = createBeadsRepo(tmp, 'default-repo');

    const mod = await import('./workspace-discovery.js');
    const result = mod.resolveStartupWorkspace({
      configured_workspaces: [],
      default_workspace: default_repo,
      cwd: null
    });

    expect(result).toBe(default_repo);
  });

  test('skips explicit paths that are not usable workspaces', async () => {
    const tmp = mkdtemp();
    const scan_dir = path.join(tmp, 'projects');
    fs.mkdirSync(scan_dir);
    createBeadsRepo(scan_dir, 'repo-a');

    const mod = await import('./workspace-discovery.js');
    const result = mod.discoverWorkspaces({
      workspace_config: {
        default_workspace: null,
        scan_roots: [scan_dir],
        workspaces: ['/not/a/workspace']
      }
    });

    expect(result).toHaveLength(1);
    expect(result[0].path).toBe(path.join(scan_dir, 'repo-a'));
  });
});
