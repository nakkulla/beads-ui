import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const HOLDER_SOURCE = String.raw`
import fcntl
import os
import sys

fd = os.open(sys.argv[1], os.O_CREAT | os.O_RDWR, 0o600)
fcntl.flock(fd, fcntl.LOCK_EX)
sys.stdout.write("acquired\n")
sys.stdout.flush()
sys.stdin.buffer.read()
`;

/**
 * Acquire the repository's cross-process deploy lock through a small Python
 * holder. Closing the holder's stdin releases the lock; process death provides
 * the same guarantee through normal file-descriptor cleanup.
 *
 * @param {{ repo: string, timeout_ms: number, spawn?: typeof spawn, fs?: typeof import('node:fs') }} input
 * @returns {Promise<{ ok: true, release: () => Promise<void>, child: import('node:child_process').ChildProcess }|{ ok: false, code: 'deploy_lock_timeout'|'deploy_lock_unavailable' }>}
 */
export async function acquireDeployLock(input) {
  const fs_impl = input.fs || fs;
  const spawn_impl = input.spawn || spawn;
  const lock_path = path.resolve(
    input.repo,
    '.worktrees',
    '.repo-ops-deploy.lock'
  );
  fs_impl.mkdirSync(path.dirname(lock_path), { recursive: true });
  const timeout_ms = Math.max(1, Math.floor(input.timeout_ms));

  return await new Promise((resolve) => {
    const child = spawn_impl('python3', ['-c', HOLDER_SOURCE, lock_path], {
      cwd: input.repo,
      shell: false,
      stdio: ['pipe', 'pipe', 'pipe']
    });
    let settled = false;
    let stdout = '';

    /** @param {'deploy_lock_timeout'|'deploy_lock_unavailable'} code */
    function fail(code) {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timer);
      child.kill('SIGKILL');
      resolve({ ok: false, code });
    }

    /** Release the holder and wait until the OS has closed its lock fd. */
    function release() {
      if (child.exitCode !== null || child.signalCode !== null) {
        return Promise.resolve();
      }
      return new Promise((resolve_release) => {
        child.once('exit', () => resolve_release(undefined));
        if (child.stdin) {
          child.stdin.end();
        } else {
          child.kill('SIGKILL');
        }
      });
    }

    const timer = setTimeout(() => fail('deploy_lock_timeout'), timeout_ms);
    child.once('error', () => fail('deploy_lock_unavailable'));
    child.once('exit', () => {
      if (!settled) {
        fail('deploy_lock_unavailable');
      }
    });
    child.stdout?.on('data', (chunk) => {
      if (settled) {
        return;
      }
      stdout += String(chunk);
      if (!stdout.includes('\n')) {
        return;
      }
      if (stdout.split('\n', 1)[0] !== 'acquired') {
        fail('deploy_lock_unavailable');
        return;
      }
      settled = true;
      clearTimeout(timer);
      resolve({ ok: true, release, child });
    });
  });
}
