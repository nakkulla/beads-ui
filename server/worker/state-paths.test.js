import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test } from 'vitest';
import { createWorkerStatePaths, ensureWorkerStateDirs } from './state-paths.js';

/** @type {string[]} */
const tmps = [];

function mkdtemp() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-worker-state-'));
  tmps.push(dir);
  return dir;
}

afterEach(() => {
  for (const dir of tmps.splice(0)) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      // ignore cleanup errors
    }
  }
});

describe('worker state paths', () => {
  test('builds repo-local worker state paths under .bdui/worker-jobs', () => {
    const root_dir = mkdtemp();

    const paths = createWorkerStatePaths(root_dir);

    expect(paths.state_root).toBe(path.join(root_dir, '.bdui', 'worker-jobs'));
    expect(paths.database_path).toBe(
      path.join(root_dir, '.bdui', 'worker-jobs', 'jobs.sqlite')
    );
    expect(paths.logs_dir).toBe(
      path.join(root_dir, '.bdui', 'worker-jobs', 'logs')
    );
    expect(paths.runtime_dir).toBe(
      path.join(root_dir, '.bdui', 'worker-jobs', 'runtime')
    );
    expect(paths.lock_path).toBe(
      path.join(root_dir, '.bdui', 'worker-jobs', 'runtime', 'supervisor.lock')
    );
    expect(paths.pid_file_path).toBe(
      path.join(root_dir, '.bdui', 'worker-jobs', 'runtime', 'supervisor.pid')
    );
    expect(paths.supervisor_log_path).toBe(
      path.join(root_dir, '.bdui', 'worker-jobs', 'runtime', 'supervisor.log')
    );
  });

  test('creates logs and runtime directories on demand', () => {
    const root_dir = mkdtemp();
    const paths = createWorkerStatePaths(root_dir);

    ensureWorkerStateDirs(paths);

    expect(fs.statSync(paths.logs_dir).isDirectory()).toBe(true);
    expect(fs.statSync(paths.runtime_dir).isDirectory()).toBe(true);
  });
});
