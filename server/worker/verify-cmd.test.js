import { EventEmitter } from 'node:events';
import { describe, expect, test, vi } from 'vitest';
import {
  detectVerifyCmd,
  resolveVerifyCmd,
  runVerifyAtSha,
  runVerifyCmd
} from './verify-cmd.js';

describe('worker/verify-cmd — independent post-merge verification runner (수용 기준 12)', () => {
  test('exit 0 → ok', async () => {
    const r = await runVerifyCmd({
      cwd: process.cwd(),
      cmd: [process.execPath, '-e', 'process.exit(0)'],
      timeout_ms: 10000
    });
    expect(r.ok).toBe(true);
    expect(r.reason).toBe('ok');
    expect(r.exit).toBe(0);
  });

  test('non-zero exit → verify_cmd_failed with the exit code', async () => {
    const r = await runVerifyCmd({
      cwd: process.cwd(),
      cmd: [process.execPath, '-e', 'process.exit(3)'],
      timeout_ms: 10000
    });
    expect(r.ok).toBe(false);
    expect(r.reason).toBe('verify_cmd_failed');
    expect(r.exit).toBe(3);
  });

  test('timeout → verify_cmd_timeout (NOT overloaded onto an exit code)', async () => {
    const r = await runVerifyCmd({
      cwd: process.cwd(),
      cmd: [process.execPath, '-e', 'setTimeout(() => {}, 60000)'],
      timeout_ms: 150
    });
    expect(r.ok).toBe(false);
    expect(r.reason).toBe('verify_cmd_timeout');
  });

  test('unspawnable binary → verify_cmd_spawn_error (NOT code-127 overload)', async () => {
    const r = await runVerifyCmd({
      cwd: process.cwd(),
      cmd: ['bdui-definitely-not-a-binary-xyz'],
      timeout_ms: 10000
    });
    expect(r.ok).toBe(false);
    expect(r.reason).toBe('verify_cmd_spawn_error');
  });

  test('an empty argv is a spawn error, never a silent pass', async () => {
    const r = await runVerifyCmd({
      cwd: process.cwd(),
      cmd: [],
      timeout_ms: 10000
    });
    expect(r.ok).toBe(false);
    expect(r.reason).toBe('verify_cmd_spawn_error');
  });
});

describe('worker/verify-cmd — failure output tail (UI-qult §1)', () => {
  /**
   * A fake `spawn_impl` whose stdout/stderr are real event emitters, so the
   * capture path runs against arbitrary scripted output without a real process.
   *
   * @param {(child: any) => void} run - Emits the run's output and its end.
   * @returns {any}
   */
  function fakeSpawn(run) {
    return () => {
      const child = /** @type {any} */ (new EventEmitter());
      child.stdout = Object.assign(new EventEmitter(), { setEncoding() {} });
      child.stderr = Object.assign(new EventEmitter(), { setEncoding() {} });
      child.kill = () => {
        child.emit('close', null);
      };
      setTimeout(() => run(child), 0);
      return child;
    };
  }

  /**
   * @param {(child: any) => void} run
   * @param {number} [timeout_ms]
   */
  function runFake(run, timeout_ms = 10000) {
    return runVerifyCmd({
      cwd: '/repo',
      cmd: ['npm', 'test'],
      timeout_ms,
      spawn_impl: fakeSpawn(run)
    });
  }

  test('preserves the command output tail on a non-zero exit', async () => {
    const r = await runFake((child) => {
      child.stdout.emit('data', 'rg: command not found\n');
      child.emit('close', 1);
    });

    expect(r.reason).toBe('verify_cmd_failed');
    expect(r.output_tail).toBe('rg: command not found');
  });

  test('omits the output tail on a successful run', async () => {
    const r = await runFake((child) => {
      child.stdout.emit('data', 'all tests passed\n');
      child.emit('close', 0);
    });

    expect(r.ok).toBe(true);
    expect(r.output_tail).toBeUndefined();
  });

  test('omits the output tail when the run printed nothing', async () => {
    const r = await runFake((child) => {
      child.emit('close', 2);
    });

    expect(r.reason).toBe('verify_cmd_failed');
    expect(r.output_tail).toBeUndefined();
  });

  test('keeps the last 100 CONTENT lines of a newline-terminated output', async () => {
    const output = `${Array.from(
      { length: 101 },
      (_unused, i) => `line-${i + 1}`
    ).join('\n')}\n`;

    const r = await runFake((child) => {
      child.stdout.emit('data', output);
      child.emit('close', 1);
    });

    const lines = String(r.output_tail).split('\n');
    expect(lines).toHaveLength(100);
    expect(lines[0]).toBe('line-2');
    expect(lines[99]).toBe('line-101');
  });

  test('joins stdout and stderr into one buffer in arrival order', async () => {
    const r = await runFake((child) => {
      child.stdout.emit('data', 'running x\n');
      child.stderr.emit('data', 'warn: y\n');
      child.stdout.emit('data', 'done x\n');
      child.emit('close', 1);
    });

    expect(r.output_tail).toBe('running x\nwarn: y\ndone x');
  });

  test('caps the output tail at 8192 characters', async () => {
    const r = await runFake((child) => {
      child.stdout.emit('data', 'x'.repeat(20000));
      child.emit('close', 1);
    });

    expect(r.output_tail).toHaveLength(8192);
  });

  test('includes the partial output captured before a timeout', async () => {
    const r = await runFake((child) => {
      // Never closes on its own — the deadline's SIGKILL is what ends it.
      child.stdout.emit('data', 'step 3/9 building…\n');
    }, 25);

    expect(r.reason).toBe('verify_cmd_timeout');
    expect(r.output_tail).toBe('step 3/9 building…');
  });

  test('omits the output tail on a spawn error', async () => {
    const r = await runFake((child) => {
      child.stdout.emit('data', 'partial\n');
      child.emit('error', new Error('ENOENT'));
    });

    expect(r.reason).toBe('verify_cmd_spawn_error');
    expect(r.output_tail).toBeUndefined();
  });
});

describe('worker/verify-cmd auto-detection + resolution (§2)', () => {
  /**
   * @param {Record<string, string>} files - Absolute path → file contents.
   */
  function fakeFs(files) {
    return /** @type {any} */ ({
      existsSync: (/** @type {string} */ p) => Object.hasOwn(files, p),
      readFileSync: (/** @type {string} */ p) => {
        if (!Object.hasOwn(files, p)) {
          const err = new Error('ENOENT');
          /** @type {any} */ (err).code = 'ENOENT';
          throw err;
        }
        return files[p];
      }
    });
  }

  test('package.json with scripts.test → npm test', () => {
    const fs = fakeFs({
      '/repo/package.json': JSON.stringify({ scripts: { test: 'vitest' } })
    });
    expect(detectVerifyCmd('/repo', { fs })).toEqual(['npm', 'test']);
  });

  test('package.json WITHOUT scripts.test → no detection', () => {
    const fs = fakeFs({
      '/repo/package.json': JSON.stringify({ scripts: {} })
    });
    expect(detectVerifyCmd('/repo', { fs })).toBeNull();
  });

  test('Cargo.toml → cargo test', () => {
    const fs = fakeFs({ '/repo/Cargo.toml': '[package]' });
    expect(detectVerifyCmd('/repo', { fs })).toEqual(['cargo', 'test']);
  });

  test('go.mod → go test ./...', () => {
    const fs = fakeFs({ '/repo/go.mod': 'module x' });
    expect(detectVerifyCmd('/repo', { fs })).toEqual(['go', 'test', './...']);
  });

  test('ambiguous toolchain (python etc.) → no detection', () => {
    const fs = fakeFs({ '/repo/requirements.txt': 'pytest' });
    expect(detectVerifyCmd('/repo', { fs })).toBeNull();
  });

  test('resolve: explicit config ALWAYS wins over detection (source=config)', () => {
    const fs = fakeFs({
      '/repo/package.json': JSON.stringify({ scripts: { test: 'vitest' } })
    });
    const config = { '/repo': { cmd: ['npm', 'run', 'all'], timeout_ms: 900 } };
    const r = resolveVerifyCmd('/repo', config, { fs });
    expect(r).toEqual({
      cmd: ['npm', 'run', 'all'],
      timeout_ms: 900,
      source: 'config'
    });
  });

  test('resolve: no config → detected command with source=detected + default timeout', () => {
    const fs = fakeFs({ '/repo/go.mod': 'module x' });
    const r = resolveVerifyCmd('/repo', {}, { fs });
    expect(r).toEqual({
      cmd: ['go', 'test', './...'],
      timeout_ms: 600000,
      source: 'detected'
    });
  });

  test('resolve: neither config nor detection → null (no local verify signal)', () => {
    const fs = fakeFs({ '/repo/requirements.txt': 'pytest' });
    expect(resolveVerifyCmd('/repo', {}, { fs })).toBeNull();
  });
});

describe('worker/verify-cmd — pre-merge run pinned to a PR head sha (§5)', () => {
  const SHA = 'a'.repeat(40);

  /**
   * @param {{ present?: boolean, present_after_fetch?: boolean }} [input]
   */
  function fakeGit(input = {}) {
    let present = input.present ?? false;
    const calls = /** @type {string[][]} */ ([]);
    const git = vi.fn(async (/** @type {string[]} */ args) => {
      calls.push(args);
      if (args[0] === 'cat-file') {
        return { code: present ? 0 : 1, stdout: '', stderr: '' };
      }
      if (args[0] === 'fetch') {
        present = input.present_after_fetch ?? true;
        return { code: 0, stdout: '', stderr: '' };
      }
      return { code: 0, stdout: '', stderr: '' };
    });
    return { git, calls };
  }

  function fakeWorktree() {
    /** @type {string[]} */
    const lock_log = [];
    return {
      // The command really is spawned, so the pinned worktree path must be a
      // directory that exists — the repo root stands in for it here.
      addDetached: vi.fn(async () => {
        lock_log.push('addDetached');
        return { path: process.cwd() };
      }),
      removeDetached: vi.fn(async () => ({ code: 0, stderr: '' })),
      lock_log,
      withTopologyLock: vi.fn(
        async (/** @type {string} */ _repo, /** @type {any} */ fn) => {
          lock_log.push('lock:acquire');
          try {
            return await fn();
          } finally {
            lock_log.push('lock:release');
          }
        }
      )
    };
  }

  test('runs the command in a detached worktree pinned to the head sha', async () => {
    const { git } = fakeGit({ present: true });
    const worktree = fakeWorktree();

    const r = await runVerifyAtSha({
      repo: '/repo',
      bead_id: 'UI-1',
      sha: SHA,
      pr_number: 304,
      cmd: [process.execPath, '-e', 'process.exit(0)'],
      timeout_ms: 10000,
      worktree,
      git
    });

    expect(worktree.addDetached).toHaveBeenCalledWith({
      repo: '/repo',
      name: `verify-UI-1-${SHA.slice(0, 7)}`,
      sha: SHA
    });
    expect(r.ok).toBe(true);
  });

  test('skips the fetch when the repo already has the commit', async () => {
    const { git, calls } = fakeGit({ present: true });

    await runVerifyAtSha({
      repo: '/repo',
      bead_id: 'UI-1',
      sha: SHA,
      pr_number: 304,
      cmd: [process.execPath, '-e', 'process.exit(0)'],
      timeout_ms: 10000,
      worktree: fakeWorktree(),
      git
    });

    expect(calls.some((a) => a[0] === 'fetch')).toBe(false);
  });

  test('fetches the PR head ref when the commit is not local', async () => {
    const { git, calls } = fakeGit({ present: false });

    await runVerifyAtSha({
      repo: '/repo',
      bead_id: 'UI-1',
      sha: SHA,
      pr_number: 304,
      cmd: [process.execPath, '-e', 'process.exit(0)'],
      timeout_ms: 10000,
      worktree: fakeWorktree(),
      git
    });

    expect(calls).toContainEqual([
      'fetch',
      '--no-tags',
      'origin',
      'refs/pull/304/head'
    ]);
  });

  test('reports verify_sha_unavailable when the commit cannot be fetched', async () => {
    const { git } = fakeGit({ present: false, present_after_fetch: false });
    const worktree = fakeWorktree();

    const r = await runVerifyAtSha({
      repo: '/repo',
      bead_id: 'UI-1',
      sha: SHA,
      pr_number: 304,
      cmd: [process.execPath, '-e', 'process.exit(0)'],
      timeout_ms: 10000,
      worktree,
      git
    });

    expect(r).toEqual({
      ok: false,
      reason: 'verify_sha_unavailable',
      exit: null
    });
    expect(worktree.addDetached).not.toHaveBeenCalled();
  });

  test('tears the detached worktree down after a failing run', async () => {
    const { git } = fakeGit({ present: true });
    const worktree = fakeWorktree();

    const r = await runVerifyAtSha({
      repo: '/repo',
      bead_id: 'UI-1',
      sha: SHA,
      pr_number: 304,
      cmd: [process.execPath, '-e', 'process.exit(4)'],
      timeout_ms: 10000,
      worktree,
      git
    });

    expect(r.reason).toBe('verify_cmd_failed');
    expect(worktree.removeDetached).toHaveBeenCalledWith({
      repo: '/repo',
      name: `verify-UI-1-${SHA.slice(0, 7)}`
    });
  });

  test('fetches the PR head under the repo topology lock, releasing it before the worktree add', async () => {
    const { git } = fakeGit({ present: false });
    const worktree = fakeWorktree();

    await runVerifyAtSha({
      repo: '/repo',
      bead_id: 'UI-1',
      sha: SHA,
      pr_number: 304,
      cmd: [process.execPath, '-e', 'process.exit(0)'],
      timeout_ms: 10000,
      worktree,
      git
    });

    // The lock is HELD across the fetch and RELEASED before `addDetached`,
    // which takes the same non-reentrant lock itself.
    expect(worktree.withTopologyLock).toHaveBeenCalledWith(
      '/repo',
      expect.any(Function)
    );
    expect(worktree.lock_log).toEqual([
      'lock:acquire',
      'lock:release',
      'addDetached'
    ]);
  });

  test('reports verify_worktree_failed when the worktree cannot be created', async () => {
    const { git } = fakeGit({ present: true });
    const worktree = fakeWorktree();
    worktree.addDetached = vi.fn(async () => {
      throw new Error('worktree add failed');
    });

    const r = await runVerifyAtSha({
      repo: '/repo',
      bead_id: 'UI-1',
      sha: SHA,
      pr_number: 304,
      cmd: [process.execPath, '-e', 'process.exit(0)'],
      timeout_ms: 10000,
      worktree,
      git
    });

    expect(r.reason).toBe('verify_worktree_failed');
  });

  test('preserves the git stderr as detail on a worktree failure', async () => {
    const { git } = fakeGit({ present: true });
    const worktree = fakeWorktree();
    worktree.addDetached = vi.fn(async () => {
      throw new Error(
        "fatal: '.worktrees/verify-UI-1-abc1234' already exists\n"
      );
    });

    const r = await runVerifyAtSha({
      repo: '/repo',
      bead_id: 'UI-1',
      sha: SHA,
      pr_number: 304,
      cmd: [process.execPath, '-e', 'process.exit(0)'],
      timeout_ms: 10000,
      worktree,
      git
    });

    expect(r.detail).toBe(
      "fatal: '.worktrees/verify-UI-1-abc1234' already exists"
    );
  });

  test('truncates an oversized worktree failure detail', async () => {
    const { git } = fakeGit({ present: true });
    const worktree = fakeWorktree();
    worktree.addDetached = vi.fn(async () => {
      throw new Error('e'.repeat(900));
    });

    const r = await runVerifyAtSha({
      repo: '/repo',
      bead_id: 'UI-1',
      sha: SHA,
      pr_number: 304,
      cmd: [process.execPath, '-e', 'process.exit(0)'],
      timeout_ms: 10000,
      worktree,
      git
    });

    expect(r.detail).toHaveLength(512);
  });
});
