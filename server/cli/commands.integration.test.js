import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  test,
  vi
} from 'vitest';
import { handleRestart, handleStart, handleStop } from './commands.js';
import * as daemon from './daemon.js';

// Mock browser open + readiness wait to avoid external effects and flakiness
vi.mock('./open.js', () => ({
  openUrl: async () => true,
  waitForServer: async () => {},
  registerWorkspaceWithServer: async () => true
}));

// Mock db resolution to avoid file system dependencies
vi.mock('../db.js', () => ({
  resolveDbPath: () => ({
    path: '/mock/test.db',
    source: 'nearest',
    exists: true
  }),
  resolveWorkspaceDatabase: () => ({
    path: '/mock/test.db',
    source: 'nearest',
    exists: true
  })
}));

/** @type {string} */
let tmp_runtime_dir;
/** @type {string} */
let tmp_state_home;
/** @type {string} */
let tmp_config_home;
/** @type {string} */
let shared_sentinel;
/** @type {Record<string, string | undefined>} */
let prev_env;

beforeAll(() => {
  // Snapshot selected env vars to restore later
  prev_env = {
    BDUI_RUNTIME_DIR: process.env.BDUI_RUNTIME_DIR,
    XDG_STATE_HOME: process.env.XDG_STATE_HOME,
    XDG_CONFIG_HOME: process.env.XDG_CONFIG_HOME,
    PORT: process.env.PORT,
    BDUI_CONFIG_PATH: process.env.BDUI_CONFIG_PATH
  };

  tmp_runtime_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-it-'));
  tmp_state_home = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-it-state-'));
  tmp_config_home = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-it-config-'));
  const shared_root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-it-shared-'));
  shared_sentinel = path.join(shared_root, 'sentinel');
  fs.writeFileSync(shared_sentinel, 'shared-runtime-must-not-change');
  process.env.BDUI_RUNTIME_DIR = tmp_runtime_dir;
  process.env.XDG_STATE_HOME = tmp_state_home;
  process.env.XDG_CONFIG_HOME = tmp_config_home;
  // Use port 0 so OS assigns an ephemeral port; URL printing still occurs
  process.env.PORT = '0';
  // Point the spawned daemon at an isolated config (no auth; spec §8). The
  // child inherits process.env.
  const config_path = path.join(tmp_runtime_dir, 'config.toml');
  fs.writeFileSync(config_path, '# bdui integration test config (no auth)\n');
  process.env.BDUI_CONFIG_PATH = config_path;
  vi.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(async () => {
  // Ensure no stray daemon is left between tests
  const pid = daemon.readPidFile();
  if (pid && daemon.isProcessRunning(pid)) {
    await daemon.terminateProcess(pid, 2000);
  }
  daemon.removePidFile();
});

afterAll(() => {
  // Restore env
  if (prev_env.BDUI_RUNTIME_DIR === undefined) {
    delete process.env.BDUI_RUNTIME_DIR;
  } else {
    process.env.BDUI_RUNTIME_DIR = prev_env.BDUI_RUNTIME_DIR;
  }

  if (prev_env.XDG_STATE_HOME === undefined) {
    delete process.env.XDG_STATE_HOME;
  } else {
    process.env.XDG_STATE_HOME = prev_env.XDG_STATE_HOME;
  }
  if (prev_env.XDG_CONFIG_HOME === undefined) {
    delete process.env.XDG_CONFIG_HOME;
  } else {
    process.env.XDG_CONFIG_HOME = prev_env.XDG_CONFIG_HOME;
  }

  if (prev_env.PORT === undefined) {
    delete process.env.PORT;
  } else {
    process.env.PORT = prev_env.PORT;
  }

  if (prev_env.BDUI_CONFIG_PATH === undefined) {
    delete process.env.BDUI_CONFIG_PATH;
  } else {
    process.env.BDUI_CONFIG_PATH = prev_env.BDUI_CONFIG_PATH;
  }

  try {
    fs.rmSync(tmp_runtime_dir, { recursive: true, force: true });
    fs.rmSync(tmp_state_home, { recursive: true, force: true });
    fs.rmSync(tmp_config_home, { recursive: true, force: true });
  } catch {
    // ignore
  }
});

describe('commands integration', () => {
  test('start then stop returns 0 and manages PID file', async () => {
    // setup
    vi.spyOn(daemon, 'printServerUrl').mockImplementation(() => {});

    // execution
    const start_code = await handleStart({ open: false });

    // assertion
    expect(start_code).toBe(0);
    const pid_after_start = daemon.readPidFile();
    expect(typeof pid_after_start).toBe('number');
    expect(Number(pid_after_start)).toBeGreaterThan(0);

    // execution
    const stop_code = await handleStop();

    // assertion
    expect(stop_code).toBe(0);
    const pid_after_stop = daemon.readPidFile();
    expect(pid_after_stop).toBeNull();
  });

  test('stop returns 2 when not running', async () => {
    // execution
    const code = await handleStop();

    // assertion
    expect(code).toBe(2);
  });

  test('start is idempotent when already running', async () => {
    // setup
    await handleStart({ open: false });
    const start_spy = vi.spyOn(daemon, 'startDaemon');

    // execution
    const code = await handleStart({ open: false });

    // assertion
    expect(code).toBe(0);
    expect(start_spy).not.toHaveBeenCalled();

    // cleanup
    await handleStop();
  });

  test('restart stops (when needed) and starts', async () => {
    // setup
    vi.spyOn(daemon, 'printServerUrl').mockImplementation(() => {});

    // execution
    const code = await handleRestart();

    // assertion
    expect(code).toBe(0);
    const pid = daemon.readPidFile();
    expect(typeof pid).toBe('number');

    // cleanup
    await handleStop();
  });

  test('uses only the test-scoped runtime, state, config, and ephemeral port', async () => {
    const code = await handleRestart();

    expect(code).toBe(0);
    expect(daemon.getRuntimeDir()).toBe(tmp_runtime_dir);
    expect(process.env.XDG_STATE_HOME).toBe(tmp_state_home);
    expect(process.env.XDG_CONFIG_HOME).toBe(tmp_config_home);
    expect(process.env.PORT).toBe('0');
    expect(fs.readFileSync(shared_sentinel, 'utf8')).toBe(
      'shared-runtime-must-not-change'
    );

    await handleStop();
  });
});
