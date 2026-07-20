import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { __resetConfigWarningsForTest, getConfig } from './config.js';

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
 * @returns {string}
 */
function missingConfigPath() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-config-missing-'));
  temp_dirs.push(dir);
  return path.join(dir, 'config.toml');
}

beforeEach(() => {
  __resetConfigWarningsForTest();
});

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

    expect(config.workspace_config).toEqual({
      default_workspace: null,
      scan_roots: [],
      workspaces: []
    });
  });

  test('reads workspace config from global TOML config file', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
default_workspace = "/repo-a"
scan_roots = ["/scan-a", "", "relative/path"]
workspaces = ["/repo-b", "/repo-b"]
`);

    const config = getConfig();

    expect(config.workspace_config).toEqual({
      default_workspace: '/repo-a',
      scan_roots: ['/scan-a'],
      workspaces: ['/repo-b']
    });
  });

  test('ignores a legacy [labels] section without exposing label config', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
workspaces = ["/repo-a"]

[labels]
visible_prefixes = ["has:", "lane:"]
visible_exact = ["pr"]
`);
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const config = getConfig();

    expect('label_display_policy' in config).toBe(false);
    expect(config.workspace_config.workspaces).toEqual(['/repo-a']);
    warn.mockRestore();
  });

  test('warns about a legacy [labels] section', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
[labels]
visible_prefixes = ["has:"]
`);
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    getConfig();

    expect(warn).toHaveBeenCalledTimes(1);
    expect(String(warn.mock.calls[0][0])).toContain('[labels]');
    warn.mockRestore();
  });

  test('warns only once per process even across repeated reads', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
[labels]
visible_prefixes = ["has:"]
`);
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    getConfig();
    getConfig();

    expect(warn).toHaveBeenCalledTimes(1);
    warn.mockRestore();
  });

  test('does not warn when no [labels] section is present', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
workspaces = ["/repo-a"]
`);
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    getConfig();

    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  test('falls back when config TOML is invalid', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture('default_workspace = [');

    const config = getConfig();

    expect(config.workspace_config).toEqual({
      default_workspace: null,
      scan_roots: [],
      workspaces: []
    });
  });

  test('defaults poll_interval_seconds to 30 when config file is missing', () => {
    process.env.BDUI_CONFIG_PATH = missingConfigPath();

    const config = getConfig();

    expect(config.poll_interval_seconds).toBe(30);
  });

  test('defaults poll_interval_seconds to 30 when absent from TOML', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
workspaces = ["/repo-a"]
`);

    const config = getConfig();

    expect(config.poll_interval_seconds).toBe(30);
  });

  test('keeps an explicit poll_interval_seconds of 0 (polling off)', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
poll_interval_seconds = 0
`);

    const config = getConfig();

    expect(config.poll_interval_seconds).toBe(0);
  });

  test('passes a valid poll_interval_seconds through', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
poll_interval_seconds = 15
`);

    const config = getConfig();

    expect(config.poll_interval_seconds).toBe(15);
  });

  test('falls back to 30 for an invalid poll_interval_seconds', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
poll_interval_seconds = "soon"
`);

    const config = getConfig();

    expect(config.poll_interval_seconds).toBe(30);
  });

  test('falls back to 30 for a negative poll_interval_seconds', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
poll_interval_seconds = -10
`);

    const config = getConfig();

    expect(config.poll_interval_seconds).toBe(30);
  });
});

describe('obsolete [auth] section', () => {
  test('warns once and drops the section when [auth] is present', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
[auth]
token = "obsolete"
`);
    const warn_spy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const config = getConfig();

    expect(warn_spy).toHaveBeenCalledTimes(1);
    expect(String(warn_spy.mock.calls[0][0])).toContain('[auth]');
    expect('auth' in config).toBe(false);

    warn_spy.mockRestore();
  });

  test('does not warn when no [auth] section is present', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
poll_interval_seconds = 15
`);
    const warn_spy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const config = getConfig();

    expect(warn_spy).not.toHaveBeenCalled();
    expect('auth' in config).toBe(false);

    warn_spy.mockRestore();
  });
});
