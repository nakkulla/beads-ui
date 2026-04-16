import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, test, vi } from 'vitest';
import { resolveWorkspaceDatabase } from '../db.js';
import {
  createManagedRuntimePaths,
  printServerUrl,
  startManagedDaemon
} from './daemon.js';

vi.mock('../db.js', () => ({
  resolveWorkspaceDatabase: vi.fn(() => ({
    path: '/repo/.beads',
    source: 'metadata',
    exists: true
  }))
}));

vi.mock('../config.js', () => ({
  getConfig: () => ({ url: 'http://127.0.0.1:3000' })
}));

describe('printServerUrl', () => {
  test('prints workspace-aware database resolution', () => {
    const log_spy = vi.spyOn(console, 'log').mockImplementation(() => {});

    printServerUrl();

    expect(resolveWorkspaceDatabase).toHaveBeenCalledTimes(1);
    expect(log_spy).toHaveBeenCalledWith('beads db   /repo/.beads (metadata)');
    expect(log_spy).toHaveBeenCalledWith(
      'beads ui   listening on http://127.0.0.1:3000'
    );

    log_spy.mockRestore();
  });
});

describe('managed daemon helpers', () => {
  test('builds custom pid and log paths under runtime dir', () => {
    const runtime_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-daemon-'));

    const paths = createManagedRuntimePaths({
      runtime_dir,
      pid_file_name: 'supervisor.pid',
      log_file_name: 'supervisor.log'
    });

    expect(paths.pid_file_path).toBe(path.join(runtime_dir, 'supervisor.pid'));
    expect(paths.log_file_path).toBe(path.join(runtime_dir, 'supervisor.log'));
  });

  test('starts detached child and writes pid file to custom runtime dir', () => {
    const runtime_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-daemon-'));
    const unref = vi.fn();
    const spawn_impl = /** @type {any} */ (
      vi.fn(() => ({ pid: 6543, unref }))
    );

    const started = startManagedDaemon({
      entry_path: '/tmp/fake-entry.js',
      runtime_dir,
      pid_file_name: 'supervisor.pid',
      log_file_name: 'supervisor.log',
      spawn_impl
    });

    expect(started).toEqual({ pid: 6543 });
    expect(unref).toHaveBeenCalledTimes(1);
    expect(fs.readFileSync(path.join(runtime_dir, 'supervisor.pid'), 'utf8')).toContain('6543');
  });
});
