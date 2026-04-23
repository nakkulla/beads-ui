import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test } from 'vitest';
import { getConfig } from './config.js';

/** @type {string[]} */
const temp_dirs = [];

/**
 * @param {string} content
 * @returns {string}
 */
function writeTomlFixture(content) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-config-'));
  const file_path = path.join(dir, 'config.toml');
  temp_dirs.push(dir);
  fs.writeFileSync(file_path, content);
  return file_path;
}

/**
 * @param {string} content
 * @returns {string}
 */
function writeBrokenTomlFixture(content) {
  return writeTomlFixture(content);
}

/**
 * @returns {string}
 */
function missingConfigPath() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-config-missing-'));
  temp_dirs.push(dir);
  return path.join(dir, 'config.toml');
}

afterEach(() => {
  delete process.env.BDUI_FRONTEND_MODE;
  delete process.env.BDUI_CONFIG_PATH;
  for (const dir of temp_dirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe('getConfig', () => {
  test('returns live frontend_mode when env is live', () => {
    process.env.BDUI_FRONTEND_MODE = 'live';

    const config = getConfig();

    expect(config.frontend_mode).toBe('live');
  });

  test('returns static frontend_mode when env is not live', () => {
    process.env.BDUI_FRONTEND_MODE = 'unexpected';

    const config = getConfig();

    expect(config.frontend_mode).toBe('static');
  });

  test('returns default config when config file is missing', () => {
    process.env.BDUI_CONFIG_PATH = missingConfigPath();

    const config = getConfig();

    expect(config.label_display_policy.visible_prefixes).toEqual([
      'has:',
      'reviewed:'
    ]);
    expect(config.workspace_config).toEqual({
      default_workspace: null,
      scan_roots: [],
      workspaces: []
    });
  });

  test('reads label policy and workspace config from global TOML config file', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
default_workspace = "/repo-a"
scan_roots = ["/scan-a", "", "relative/path"]
workspaces = ["/repo-b", "/repo-b"]

[labels]
visible_prefixes = ["has:", "reviewed:", "area:", "component:"]
`);

    const config = getConfig();

    expect(config.label_display_policy.visible_prefixes).toEqual([
      'has:',
      'reviewed:',
      'area:',
      'component:'
    ]);
    expect(config.workspace_config).toEqual({
      default_workspace: '/repo-a',
      scan_roots: ['/scan-a'],
      workspaces: ['/repo-b']
    });
  });

  test('falls back when config TOML is invalid', () => {
    process.env.BDUI_CONFIG_PATH = writeBrokenTomlFixture(
      'default_workspace = ['
    );

    const config = getConfig();

    expect(config.label_display_policy.visible_prefixes).toEqual([
      'has:',
      'reviewed:'
    ]);
    expect(config.workspace_config).toEqual({
      default_workspace: null,
      scan_roots: [],
      workspaces: []
    });
  });

  test('falls back when config has no valid prefixes', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
scan_roots = ["/scan-a"]

[labels]
visible_prefixes = [1, true, ""]
`);

    const config = getConfig();

    expect(config.label_display_policy.visible_prefixes).toEqual([
      'has:',
      'reviewed:'
    ]);
    expect(config.workspace_config).toEqual({
      default_workspace: null,
      scan_roots: ['/scan-a'],
      workspaces: []
    });
  });

  test('preserves explicit empty array to hide summary labels', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
workspaces = ["/repo-a"]

[labels]
visible_prefixes = []
`);

    const config = getConfig();

    expect(config.label_display_policy.visible_prefixes).toEqual([]);
    expect(config.workspace_config).toEqual({
      default_workspace: null,
      scan_roots: [],
      workspaces: ['/repo-a']
    });
  });
});
