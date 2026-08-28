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

  test('ignores legacy worker verify config', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
[worker.verify."/repo-a"]
cmd = ["npm", "test"]
timeout_ms = 900
`);

    const config = getConfig();

    expect('worker_verify' in config).toBe(false);
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

describe('[worker.target_base] retirement (worker-base-scope-alignment §3)', () => {
  test('exposes no worker_target_base key at all', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
workspaces = ["/repo-a"]
`);

    const config = getConfig();

    expect('worker_target_base' in config).toBe(false);
  });

  test('ignores a legacy section instead of reading it', () => {
    // The base is a property of the REPO now, declared in its own
    // `docs/agents/repo-ops.toml`. A machine that still carries the retired
    // section must not have it silently honoured — nor must it break startup.
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
[worker.target_base]
"/repo-a" = "ilsun/dev"
`);

    const config = getConfig();

    expect('worker_target_base' in config).toBe(false);
    expect(config.workspace_config).toBeDefined();
  });
});

describe('[worker.notify] section (UI-2yoq)', () => {
  test('reads an enabled section with the default command', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
[worker.notify]
enabled = true
`);

    const config = getConfig();

    expect(config.worker_notify).toEqual({ enabled: true, cmd: ['discord'] });
  });

  test('reads an explicit command argv', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
[worker.notify]
enabled = true
cmd = ["/opt/bin/notify", "--to", "ops"]
`);

    const config = getConfig();

    expect(config.worker_notify).toEqual({
      enabled: true,
      cmd: ['/opt/bin/notify', '--to', 'ops']
    });
  });

  test('disables on a shell one-liner string instead of an argv array', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
[worker.notify]
enabled = true
cmd = "discord -q"
`);

    const config = getConfig();

    expect(config.worker_notify).toEqual({ enabled: false, cmd: ['discord'] });
  });

  test('disables on an empty argv array', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
[worker.notify]
enabled = true
cmd = []
`);

    const config = getConfig();

    expect(config.worker_notify).toEqual({ enabled: false, cmd: ['discord'] });
  });

  test('disables when enabled is not exactly true', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
[worker.notify]
enabled = "yes"
`);

    const config = getConfig();

    expect(config.worker_notify.enabled).toBe(false);
  });

  test('disables when the section is absent', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
workspaces = ["/repo-a"]
`);

    const config = getConfig();

    expect(config.worker_notify).toEqual({ enabled: false, cmd: ['discord'] });
  });

  test('disables when the config file is missing', () => {
    process.env.BDUI_CONFIG_PATH = missingConfigPath();

    const config = getConfig();

    expect(config.worker_notify).toEqual({ enabled: false, cmd: ['discord'] });
  });
});

describe('[worker.direction_inquiry] section (UI-7uid §3.6)', () => {
  test('reads an enabled section with the default tmux session', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
[worker.direction_inquiry]
enabled = true
`);

    const config = getConfig();

    expect(config.worker_direction_inquiry).toEqual({
      enabled: true,
      tmux_session: 'bdui-inquiry'
    });
  });

  test('reads an explicit tmux session name', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
[worker.direction_inquiry]
enabled = true
tmux_session = "inquiry-lane"
`);

    const config = getConfig();

    expect(config.worker_direction_inquiry).toEqual({
      enabled: true,
      tmux_session: 'inquiry-lane'
    });
  });

  test('falls back to the default session on a non-string name', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
[worker.direction_inquiry]
enabled = true
tmux_session = 7
`);

    const config = getConfig();

    expect(config.worker_direction_inquiry).toEqual({
      enabled: true,
      tmux_session: 'bdui-inquiry'
    });
  });

  test('disables when enabled is not exactly true', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
[worker.direction_inquiry]
enabled = "yes"
`);

    const config = getConfig();

    expect(config.worker_direction_inquiry).toEqual({
      enabled: false,
      tmux_session: 'bdui-inquiry'
    });
  });

  test('disables when the section is absent', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
workspaces = ["/repo-a"]
`);

    const config = getConfig();

    expect(config.worker_direction_inquiry).toEqual({
      enabled: false,
      tmux_session: 'bdui-inquiry'
    });
  });

  test('disables when the config file is missing', () => {
    process.env.BDUI_CONFIG_PATH = missingConfigPath();

    const config = getConfig();

    expect(config.worker_direction_inquiry).toEqual({
      enabled: false,
      tmux_session: 'bdui-inquiry'
    });
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
