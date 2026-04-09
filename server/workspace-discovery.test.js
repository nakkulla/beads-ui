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
 * Create a fake .beads repo with metadata.json inside a parent directory.
 *
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
  test('returns empty array when config file does not exist', async () => {
    const mod = await import('./workspace-discovery.js');
    const result = mod.discoverWorkspaces('/nonexistent/config.conf');
    expect(result).toEqual([]);
  });

  test('returns empty array when config file is empty', async () => {
    const tmp = mkdtemp();
    const config_path = path.join(tmp, 'empty.conf');
    fs.writeFileSync(config_path, '');
    const mod = await import('./workspace-discovery.js');
    const result = mod.discoverWorkspaces(config_path);
    expect(result).toEqual([]);
  });

  test('ignores comments and blank lines in config', async () => {
    const tmp = mkdtemp();
    const scan_dir = path.join(tmp, 'projects');
    fs.mkdirSync(scan_dir);
    createBeadsRepo(scan_dir, 'repo-a');

    const config_path = path.join(tmp, 'test.conf');
    fs.writeFileSync(
      config_path,
      ['# This is a comment', '', '  # indented comment', scan_dir, '  '].join(
        '\n'
      )
    );

    const mod = await import('./workspace-discovery.js');
    const result = mod.discoverWorkspaces(config_path);
    expect(result).toHaveLength(1);
    expect(result[0].path).toBe(path.join(scan_dir, 'repo-a'));
  });

  test('discovers .beads repos at depth 1', async () => {
    const tmp = mkdtemp();
    const scan_dir = path.join(tmp, 'projects');
    fs.mkdirSync(scan_dir);
    const repo_a = createBeadsRepo(scan_dir, 'repo-a');
    const repo_b = createBeadsRepo(scan_dir, 'repo-b');

    const config_path = path.join(tmp, 'test.conf');
    fs.writeFileSync(config_path, scan_dir + '\n');

    const mod = await import('./workspace-discovery.js');
    const result = mod.discoverWorkspaces(config_path);
    const paths = result.map((w) => w.path).sort();
    expect(paths).toEqual([repo_a, repo_b].sort());
  });

  test('discovers .beads repos at depth 2', async () => {
    const tmp = mkdtemp();
    const scan_dir = path.join(tmp, 'projects');
    const org_dir = path.join(scan_dir, 'my-org');
    fs.mkdirSync(org_dir, { recursive: true });
    const deep_repo = createBeadsRepo(org_dir, 'deep-repo');

    const config_path = path.join(tmp, 'test.conf');
    fs.writeFileSync(config_path, scan_dir + '\n');

    const mod = await import('./workspace-discovery.js');
    const result = mod.discoverWorkspaces(config_path);
    expect(result).toHaveLength(1);
    expect(result[0].path).toBe(deep_repo);
  });

  test('does not discover repos beyond depth 2', async () => {
    const tmp = mkdtemp();
    const scan_dir = path.join(tmp, 'projects');
    const deep_path = path.join(scan_dir, 'a', 'b', 'c');
    fs.mkdirSync(deep_path, { recursive: true });
    const beads_dir = path.join(deep_path, '.beads');
    fs.mkdirSync(beads_dir);
    fs.writeFileSync(path.join(beads_dir, 'metadata.json'), '{}');

    const config_path = path.join(tmp, 'test.conf');
    fs.writeFileSync(config_path, scan_dir + '\n');

    const mod = await import('./workspace-discovery.js');
    const result = mod.discoverWorkspaces(config_path);
    expect(result).toEqual([]);
  });

  test('skips directories without .beads', async () => {
    const tmp = mkdtemp();
    const scan_dir = path.join(tmp, 'projects');
    fs.mkdirSync(scan_dir);
    fs.mkdirSync(path.join(scan_dir, 'not-a-beads-repo'));
    createBeadsRepo(scan_dir, 'real-repo');

    const config_path = path.join(tmp, 'test.conf');
    fs.writeFileSync(config_path, scan_dir + '\n');

    const mod = await import('./workspace-discovery.js');
    const result = mod.discoverWorkspaces(config_path);
    expect(result).toHaveLength(1);
    expect(result[0].path).toBe(path.join(scan_dir, 'real-repo'));
  });

  test('skips nonexistent scan directories', async () => {
    const tmp = mkdtemp();
    const config_path = path.join(tmp, 'test.conf');
    fs.writeFileSync(config_path, '/nonexistent/scan/dir\n');

    const mod = await import('./workspace-discovery.js');
    const result = mod.discoverWorkspaces(config_path);
    expect(result).toEqual([]);
  });

  test('each result has path and database fields', async () => {
    const tmp = mkdtemp();
    const scan_dir = path.join(tmp, 'projects');
    fs.mkdirSync(scan_dir);
    const repo = createBeadsRepo(scan_dir, 'my-repo');

    const config_path = path.join(tmp, 'test.conf');
    fs.writeFileSync(config_path, scan_dir + '\n');

    const mod = await import('./workspace-discovery.js');
    const result = mod.discoverWorkspaces(config_path);
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty('path', repo);
    expect(result[0]).toHaveProperty('database');
    expect(typeof result[0].database).toBe('string');
    expect(result[0].database.length).toBeGreaterThan(0);
  });

  test('uses BDUI_WORKSPACES_CONFIG env when no argument given', async () => {
    const tmp = mkdtemp();
    const scan_dir = path.join(tmp, 'projects');
    fs.mkdirSync(scan_dir);
    createBeadsRepo(scan_dir, 'env-repo');

    const config_path = path.join(tmp, 'env.conf');
    fs.writeFileSync(config_path, scan_dir + '\n');

    process.env.BDUI_WORKSPACES_CONFIG = config_path;
    try {
      const mod = await import('./workspace-discovery.js');
      const result = mod.discoverWorkspaces();
      expect(result).toHaveLength(1);
    } finally {
      delete process.env.BDUI_WORKSPACES_CONFIG;
    }
  });

  test('scans multiple directories from config', async () => {
    const tmp = mkdtemp();
    const dir_a = path.join(tmp, 'dir-a');
    const dir_b = path.join(tmp, 'dir-b');
    fs.mkdirSync(dir_a);
    fs.mkdirSync(dir_b);
    createBeadsRepo(dir_a, 'repo-1');
    createBeadsRepo(dir_b, 'repo-2');

    const config_path = path.join(tmp, 'multi.conf');
    fs.writeFileSync(config_path, [dir_a, dir_b].join('\n'));

    const mod = await import('./workspace-discovery.js');
    const result = mod.discoverWorkspaces(config_path);
    expect(result).toHaveLength(2);
  });
});

describe('watchWorkspaceDiscovery', () => {
  test('rescans when a new repo appears', async () => {
    const tmp = mkdtemp();
    const scan_dir = path.join(tmp, 'projects');
    fs.mkdirSync(scan_dir);
    const config_path = path.join(tmp, 'watch.conf');
    fs.writeFileSync(config_path, scan_dir + '\n');

    const mod = await import('./workspace-discovery.js');
    /** @type {string[][]} */
    const events = [];
    const watcher = mod.watchWorkspaceDiscovery({
      config_path,
      debounce_ms: 20,
      onChange(workspaces) {
        events.push(workspaces.map((ws) => ws.path).sort());
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 30));
    createBeadsRepo(scan_dir, 'repo-added');
    await new Promise((resolve) => setTimeout(resolve, 120));
    watcher.close();

    expect(
      events.some((paths) => paths.includes(path.join(scan_dir, 'repo-added')))
    ).toBe(true);
  });

  test('removes repo after deletion', async () => {
    const tmp = mkdtemp();
    const scan_dir = path.join(tmp, 'projects');
    fs.mkdirSync(scan_dir);
    const repo = createBeadsRepo(scan_dir, 'repo-gone');
    const config_path = path.join(tmp, 'watch.conf');
    fs.writeFileSync(config_path, scan_dir + '\n');

    const mod = await import('./workspace-discovery.js');
    /** @type {string[][]} */
    const events = [];
    const watcher = mod.watchWorkspaceDiscovery({
      config_path,
      debounce_ms: 20,
      onChange(workspaces) {
        events.push(workspaces.map((ws) => ws.path).sort());
      }
    });

    fs.rmSync(repo, { recursive: true, force: true });
    await new Promise((resolve) => setTimeout(resolve, 120));
    watcher.close();

    expect(events.at(-1)).toEqual([]);
  });

  test('reconfigures scan dirs after config change', async () => {
    const tmp = mkdtemp();
    const dir_a = path.join(tmp, 'dir-a');
    const dir_b = path.join(tmp, 'dir-b');
    fs.mkdirSync(dir_a);
    fs.mkdirSync(dir_b);
    createBeadsRepo(dir_b, 'repo-b');
    const config_path = path.join(tmp, 'watch.conf');
    fs.writeFileSync(config_path, dir_a + '\n');

    const mod = await import('./workspace-discovery.js');
    /** @type {string[][]} */
    const events = [];
    const watcher = mod.watchWorkspaceDiscovery({
      config_path,
      debounce_ms: 20,
      onChange(workspaces) {
        events.push(workspaces.map((ws) => ws.path).sort());
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 30));
    fs.writeFileSync(config_path, [dir_a, dir_b].join('\n'));
    await new Promise((resolve) => setTimeout(resolve, 120));
    watcher.close();

    expect(
      events.some((paths) => paths.includes(path.join(dir_b, 'repo-b')))
    ).toBe(true);
  });

  test('keeps watching after config file is atomically replaced', async () => {
    const tmp = mkdtemp();
    const scan_dir = path.join(tmp, 'projects');
    const dir_b = path.join(tmp, 'dir-b');
    fs.mkdirSync(scan_dir);
    fs.mkdirSync(dir_b);
    const config_path = path.join(tmp, 'watch.conf');
    fs.writeFileSync(config_path, scan_dir + '\n');

    const mod = await import('./workspace-discovery.js');
    /** @type {string[][]} */
    const events = [];
    const watcher = mod.watchWorkspaceDiscovery({
      config_path,
      debounce_ms: 20,
      onChange(workspaces) {
        events.push(workspaces.map((ws) => ws.path).sort());
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 30));
    const replaced_config = path.join(tmp, 'watch.next.conf');
    fs.writeFileSync(replaced_config, [scan_dir, dir_b].join('\n'));
    fs.renameSync(replaced_config, config_path);
    await new Promise((resolve) => setTimeout(resolve, 120));

    createBeadsRepo(dir_b, 'repo-b');
    await new Promise((resolve) => setTimeout(resolve, 120));
    watcher.close();

    expect(
      events.some((paths) => paths.includes(path.join(dir_b, 'repo-b')))
    ).toBe(true);
  });
});
