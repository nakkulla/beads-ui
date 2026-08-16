import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { deployLogDir, verifyLogDir } from './state-paths.js';
import { runVerifyAtSha, runVerifyCmd } from './verify-cmd.js';

/**
 * Every run through `runVerifyAtSha` writes a full-output log (UI-0x54), so the
 * whole file runs against a throwaway state home.
 *
 * @type {string}
 */
let tmp_state;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-vlog-'));
  process.env.XDG_STATE_HOME = tmp_state;
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

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

  /**
   * Create a command script whose exit code changes after the first run.
   *
   * @param {number} first_exit
   * @param {number} second_exit
   * @returns {{ cmd: string[], state_file: string }}
   */
  function makeStatefulCommand(first_exit, second_exit) {
    const state_file = path.join(
      tmp_state,
      `retry-state-${Date.now()}-${Math.random()}`
    );
    const script_file = path.join(
      tmp_state,
      `retry-command-${Date.now()}-${Math.random()}.js`
    );
    fs.writeFileSync(state_file, '0');
    fs.writeFileSync(
      script_file,
      [
        "import fs from 'node:fs';",
        `const state_file = ${JSON.stringify(state_file)};`,
        `const first_exit = ${first_exit};`,
        `const second_exit = ${second_exit};`,
        "const count = Number(fs.readFileSync(state_file, 'utf8')) + 1;",
        'fs.writeFileSync(state_file, String(count));',
        'const exit_code = count === 1 ? first_exit : second_exit;',
        'process.exit(exit_code);'
      ].join('\n')
    );
    return { cmd: [process.execPath, script_file], state_file };
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

  test('runs each detached verify with isolated state, runtime, config, and port', async () => {
    const { git } = fakeGit({ present: true });
    const worktree = fakeWorktree();
    /** @type {any} */
    let spawn_options;
    const spawn_impl = /** @type {any} */ (
      (
        /** @type {string} */ _bin,
        /** @type {string[]} */ _args,
        /** @type {any} */ options
      ) => {
        spawn_options = options;
        const child = /** @type {any} */ (new EventEmitter());
        child.stdout = Object.assign(new EventEmitter(), { setEncoding() {} });
        child.stderr = Object.assign(new EventEmitter(), { setEncoding() {} });
        child.kill = () => {};
        queueMicrotask(() => child.emit('close', 0));
        return child;
      }
    );
    const original_state = process.env.XDG_STATE_HOME;
    const original_runtime = process.env.BDUI_RUNTIME_DIR;
    const original_config = process.env.BDUI_CONFIG_PATH;
    process.env.XDG_STATE_HOME = '/shared/state';
    process.env.BDUI_RUNTIME_DIR = '/shared/runtime';
    process.env.BDUI_CONFIG_PATH = '/shared/config.toml';

    try {
      const result = await runVerifyAtSha({
        repo: '/repo',
        bead_id: 'UI-isolated',
        sha: SHA,
        cmd: ['true'],
        timeout_ms: 10_000,
        worktree,
        git,
        spawn_impl
      });

      expect(result.ok).toBe(true);
      expect(spawn_options.env.XDG_STATE_HOME).not.toBe('/shared/state');
      expect(spawn_options.env.BDUI_RUNTIME_DIR).not.toBe('/shared/runtime');
      expect(spawn_options.env.BDUI_CONFIG_PATH).not.toBe(
        '/shared/config.toml'
      );
      expect(spawn_options.env.XDG_CONFIG_HOME).toContain('bdui-verify-');
      expect(spawn_options.env.PORT).toBe('0');
    } finally {
      if (original_state === undefined) delete process.env.XDG_STATE_HOME;
      else process.env.XDG_STATE_HOME = original_state;
      if (original_runtime === undefined) delete process.env.BDUI_RUNTIME_DIR;
      else process.env.BDUI_RUNTIME_DIR = original_runtime;
      if (original_config === undefined) delete process.env.BDUI_CONFIG_PATH;
      else process.env.BDUI_CONFIG_PATH = original_config;
    }
  });

  test('removes a partial isolation root when config setup fails', async () => {
    const { git } = fakeGit({ present: true });
    const worktree = fakeWorktree();
    const isolated_root = path.join(tmp_state, 'partial-isolation');
    const isolation_fs = {
      mkdtempSync: vi.fn(() => isolated_root),
      mkdirSync: vi.fn(() => {
        throw new Error('config directory denied');
      }),
      writeFileSync: vi.fn(),
      rmSync: vi.fn()
    };

    const result = await runVerifyAtSha({
      repo: '/repo',
      bead_id: 'UI-isolation-failure',
      sha: SHA,
      cmd: ['true'],
      timeout_ms: 10_000,
      worktree,
      git,
      isolation_fs
    });

    expect(result).toMatchObject({
      ok: false,
      reason: 'verify_cmd_spawn_error',
      detail: 'verify_isolation_unavailable'
    });
    expect(isolation_fs.rmSync).toHaveBeenCalledWith(isolated_root, {
      recursive: true,
      force: true
    });
    expect(worktree.removeDetached).toHaveBeenCalledOnce();
  });

  test('retries one command failure and returns the successful final attempt', async () => {
    const { git } = fakeGit({ present: true });
    const worktree = fakeWorktree();
    const command = makeStatefulCommand(3, 0);

    const r = await runVerifyAtSha({
      repo: '/repo',
      bead_id: 'UI-retry',
      sha: SHA,
      pr_number: 304,
      cmd: command.cmd,
      timeout_ms: 10000,
      retry_flaky: true,
      worktree,
      git
    });

    expect(r).toMatchObject({ ok: true, reason: 'ok', exit: 0 });
    expect(r.attempts).toHaveLength(2);
    expect(r.attempts?.map((attempt) => attempt.reason)).toEqual([
      'verify_cmd_failed',
      'ok'
    ]);
    expect(r.attempts?.[0].log_path).not.toBe(r.attempts?.[1].log_path);
    expect(path.basename(String(r.attempts?.[0].log_path))).toContain(
      '-r1.log'
    );
    expect(path.basename(String(r.attempts?.[1].log_path))).toContain(
      '-r2.log'
    );
    expect(worktree.addDetached).toHaveBeenCalledTimes(2);
    expect(worktree.removeDetached).toHaveBeenCalledTimes(2);
    expect(fs.readFileSync(command.state_file, 'utf8')).toBe('2');
  });

  test('retries one command failure and returns the second failure', async () => {
    const { git } = fakeGit({ present: true });
    const worktree = fakeWorktree();
    const command = makeStatefulCommand(3, 4);

    const r = await runVerifyAtSha({
      repo: '/repo',
      bead_id: 'UI-retry-red',
      sha: SHA,
      pr_number: 304,
      cmd: command.cmd,
      timeout_ms: 10000,
      retry_flaky: true,
      worktree,
      git
    });

    expect(r).toMatchObject({
      ok: false,
      reason: 'verify_cmd_failed',
      exit: 4
    });
    expect(r.attempts).toHaveLength(2);
    expect(r.attempts?.map((attempt) => attempt.reason)).toEqual([
      'verify_cmd_failed',
      'verify_cmd_failed'
    ]);
    expect(r.log_path).toBe(r.attempts?.[1].log_path);
    expect(worktree.addDetached).toHaveBeenCalledTimes(2);
    expect(worktree.removeDetached).toHaveBeenCalledTimes(2);
  });

  test('returns one timeout attempt without retrying', async () => {
    const { git } = fakeGit({ present: true });
    const worktree = fakeWorktree();

    const r = await runVerifyAtSha({
      repo: '/repo',
      bead_id: 'UI-retry-timeout',
      sha: SHA,
      pr_number: 304,
      cmd: [process.execPath, '-e', 'setTimeout(() => {}, 60000)'],
      timeout_ms: 25,
      retry_flaky: true,
      worktree,
      git
    });

    expect(r.reason).toBe('verify_cmd_timeout');
    expect(r.attempts).toHaveLength(1);
    expect(worktree.addDetached).toHaveBeenCalledTimes(1);
    expect(worktree.removeDetached).toHaveBeenCalledTimes(1);
  });

  test('returns one spawn-error attempt without retrying', async () => {
    const { git } = fakeGit({ present: true });
    const worktree = fakeWorktree();

    const r = await runVerifyAtSha({
      repo: '/repo',
      bead_id: 'UI-retry-spawn',
      sha: SHA,
      pr_number: 304,
      cmd: ['bdui-definitely-not-a-binary-xyz'],
      timeout_ms: 10000,
      retry_flaky: true,
      worktree,
      git
    });

    expect(r.reason).toBe('verify_cmd_spawn_error');
    expect(r.attempts).toHaveLength(1);
    expect(worktree.addDetached).toHaveBeenCalledTimes(1);
    expect(worktree.removeDetached).toHaveBeenCalledTimes(1);
  });

  test('keeps the legacy result shape when retry is disabled', async () => {
    const { git } = fakeGit({ present: true });
    const worktree = fakeWorktree();

    const r = await runVerifyAtSha({
      repo: '/repo',
      bead_id: 'UI-no-retry',
      sha: SHA,
      pr_number: 304,
      cmd: [process.execPath, '-e', 'process.exit(3)'],
      timeout_ms: 10000,
      worktree,
      git
    });

    expect(r.reason).toBe('verify_cmd_failed');
    expect(r.attempts).toBeUndefined();
    expect(path.basename(String(r.log_path))).not.toContain('-r1.log');
    expect(worktree.addDetached).toHaveBeenCalledTimes(1);
    expect(worktree.removeDetached).toHaveBeenCalledTimes(1);
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

  test('serializes two concurrent runs of the same (repo, name) lifecycle', async () => {
    const { git } = fakeGit({ present: true });
    const worktree = fakeWorktree();
    /** @type {string[]} */
    const order = [];
    worktree.addDetached = vi.fn(async () => {
      order.push('add');
      // A real add is not instantaneous; without the mutex the second add would
      // start inside this window and the order would interleave.
      await new Promise((resolve) => setTimeout(resolve, 10));
      return { path: process.cwd() };
    });
    worktree.removeDetached = vi.fn(async () => {
      order.push('remove');
      return { code: 0, stderr: '' };
    });
    const runOnce = () =>
      runVerifyAtSha({
        repo: '/repo-concurrent',
        bead_id: 'UI-1',
        sha: SHA,
        pr_number: 304,
        cmd: [process.execPath, '-e', 'process.exit(0)'],
        timeout_ms: 10000,
        worktree,
        git
      });

    const [first, second] = await Promise.all([runOnce(), runOnce()]);

    expect(order).toEqual(['add', 'remove', 'add', 'remove']);
    expect(first.ok).toBe(true);
    expect(second.ok).toBe(true);
  });

  test('keeps the verdict when the teardown exits non-zero', async () => {
    const { git } = fakeGit({ present: true });
    const worktree = fakeWorktree();
    worktree.removeDetached = vi.fn(async () => ({
      code: 1,
      stderr: "fatal: '.worktrees/.verify/verify-UI-1-aaaaaaa' is locked"
    }));

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

    expect(r).toMatchObject({ ok: true, reason: 'ok', exit: 0 });
  });

  test('keeps the verdict when the teardown throws', async () => {
    const { git } = fakeGit({ present: true });
    const worktree = fakeWorktree();
    worktree.removeDetached = vi.fn(async () => {
      throw new Error('teardown exploded');
    });

    const r = await runVerifyAtSha({
      repo: '/repo',
      bead_id: 'UI-1',
      sha: SHA,
      pr_number: 304,
      cmd: [process.execPath, '-e', 'process.exit(5)'],
      timeout_ms: 10000,
      worktree,
      git
    });

    expect(r.reason).toBe('verify_cmd_failed');
    expect(r.exit).toBe(5);
  });
});

describe('worker/verify-cmd — full output log (UI-0x54)', () => {
  const WS = '/tmp/example-workspace/project-log';
  const SHA = 'b'.repeat(40);

  /**
   * A fake `spawn_impl` whose stdout/stderr are real event emitters, so the
   * log-tee path runs against arbitrary scripted output without a real process.
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
   * @param {{ log?: boolean, fs_impl?: any, kind?: 'verify'|'deploy', started_at_ms?: number }} [options]
   */
  function runFake(run, options = {}) {
    return runVerifyCmd({
      cwd: '/detached-worktree',
      cmd: ['npm', 'test'],
      timeout_ms: 10000,
      spawn_impl: fakeSpawn(run),
      log_context:
        options.log === false
          ? null
          : {
              kind: options.kind || 'verify',
              workspace_root: WS,
              bead_id: 'UI-1',
              sha: SHA,
              started_at_ms: options.started_at_ms ?? 1700000000000
            },
      fs_impl: options.fs_impl
    });
  }

  test('preserves output the tail cap dropped', async () => {
    const r = await runFake((child) => {
      child.stdout.emit('data', 'FAIL shell/first-case\n');
      child.stdout.emit('data', `${'x'.repeat(40000)}\n`);
      child.emit('close', 1);
    });

    expect(r.output_tail).not.toContain('FAIL shell/first-case');
    expect(fs.readFileSync(String(r.log_path), 'utf8')).toContain(
      'FAIL shell/first-case'
    );
  });

  test('names the log file after the bead, sha7 and start timestamp', async () => {
    const r = await runFake((child) => {
      child.emit('close', 0);
    });

    expect(r.log_path).toBe(
      path.join(
        verifyLogDir(WS),
        `verify-UI-1-${SHA.slice(0, 7)}-1700000000000.log`
      )
    );
  });

  test('writes a log for a successful run too', async () => {
    const r = await runFake((child) => {
      child.stdout.emit('data', 'all tests passed\n');
      child.emit('close', 0);
    });

    expect(r.ok).toBe(true);
    expect(fs.readFileSync(String(r.log_path), 'utf8')).toBe(
      'all tests passed\n'
    );
  });

  test('appends a truncation marker once past the 10MB cap', async () => {
    const r = await runFake((child) => {
      for (let i = 0; i < 11; i += 1) {
        child.stdout.emit('data', 'y'.repeat(1024 * 1024));
      }
      child.emit('close', 1);
    });

    const written = fs.readFileSync(String(r.log_path), 'utf8');
    expect(written).toContain('[bdui] output truncated at 10485760 bytes');
    expect(written.match(/\[bdui] output truncated/g)).toHaveLength(1);
  });

  test('drops output past the 10MB cap instead of the beginning', async () => {
    const r = await runFake((child) => {
      child.stdout.emit('data', 'FIRST LINE\n');
      for (let i = 0; i < 11; i += 1) {
        child.stdout.emit('data', 'y'.repeat(1024 * 1024));
      }
      child.emit('close', 1);
    });

    const written = fs.readFileSync(String(r.log_path), 'utf8');
    expect(written.startsWith('FIRST LINE\n')).toBe(true);
  });

  test('keeps a truncated file within the 10MB cap, marker included', async () => {
    const r = await runFake((child) => {
      for (let i = 0; i < 11; i += 1) {
        child.stdout.emit('data', 'y'.repeat(1024 * 1024));
      }
      child.emit('close', 1);
    });

    expect(fs.statSync(String(r.log_path)).size).toBeLessThanOrEqual(
      10 * 1024 * 1024
    );
  });

  test('writes the whole chunk when writeSync only writes part of it', async () => {
    const fs_impl = /** @type {any} */ ({
      ...fs,
      writeSync: (
        /** @type {number} */ fd,
        /** @type {Buffer} */ buf,
        /** @type {number} */ offset,
        /** @type {number} */ length
      ) => fs.writeSync(fd, buf, offset, Math.min(length, 5))
    });

    const r = await runFake(
      (child) => {
        child.stdout.emit(
          'data',
          'a long line the kernel only takes in bits\n'
        );
        child.emit('close', 1);
      },
      { fs_impl }
    );

    expect(fs.readFileSync(String(r.log_path), 'utf8')).toBe(
      'a long line the kernel only takes in bits\n'
    );
  });

  test('keeps the verdict and omits log_path when a write makes no progress', async () => {
    const fs_impl = /** @type {any} */ ({ ...fs, writeSync: () => 0 });

    const r = await runFake(
      (child) => {
        child.stdout.emit('data', 'never lands\n');
        child.emit('close', 3);
      },
      { fs_impl }
    );

    expect(r).toMatchObject({
      ok: false,
      reason: 'verify_cmd_failed',
      exit: 3
    });
    expect(r.log_path).toBeUndefined();
  });

  test('prunes the log directory to 20 files', async () => {
    const dir = verifyLogDir(WS);
    fs.mkdirSync(dir, { recursive: true });
    for (let i = 0; i < 25; i += 1) {
      const file = path.join(dir, `verify-UI-old-abc1234-${1000 + i}.log`);
      fs.writeFileSync(file, 'old\n');
      fs.utimesSync(file, new Date(1000 + i), new Date(1000 + i));
    }

    await runFake((child) => {
      child.emit('close', 0);
    });

    expect(fs.readdirSync(dir)).toHaveLength(20);
  });

  test('deletes the OLDEST logs when it prunes', async () => {
    const dir = verifyLogDir(WS);
    fs.mkdirSync(dir, { recursive: true });
    for (let i = 0; i < 25; i += 1) {
      const file = path.join(dir, `verify-UI-old-abc1234-${1000 + i}.log`);
      fs.writeFileSync(file, 'old\n');
      fs.utimesSync(file, new Date(1000 + i), new Date(1000 + i));
    }

    await runFake((child) => {
      child.emit('close', 0);
    });

    const kept = fs
      .readdirSync(dir)
      .filter((name) => name.includes('UI-old'))
      .sort();
    expect(kept[0]).toBe('verify-UI-old-abc1234-1006.log');
  });

  test('writes no log file without a log_context', async () => {
    const r = await runFake(
      (child) => {
        child.stdout.emit('data', 'deploying\n');
        child.emit('close', 0);
      },
      { log: false }
    );

    expect(r.log_path).toBeUndefined();
    expect(fs.existsSync(verifyLogDir(WS))).toBe(false);
  });

  test('keeps the verdict and omits log_path when the log cannot be opened', async () => {
    const fs_impl = /** @type {any} */ ({
      ...fs,
      openSync: () => {
        throw new Error('EACCES: permission denied');
      }
    });

    const r = await runFake(
      (child) => {
        child.stdout.emit('data', '1 test failed\n');
        child.emit('close', 3);
      },
      { fs_impl }
    );

    expect(r).toMatchObject({
      ok: false,
      reason: 'verify_cmd_failed',
      exit: 3
    });
    expect(r.log_path).toBeUndefined();
  });

  test('keeps the verdict and omits log_path when a write fails mid-run', async () => {
    let writes = 0;
    const fs_impl = /** @type {any} */ ({
      ...fs,
      writeSync: (/** @type {any[]} */ ...args) => {
        writes += 1;
        if (writes === 2) {
          throw new Error('ENOSPC: no space left on device');
        }
        return /** @type {any} */ (fs.writeSync)(...args);
      }
    });

    const r = await runFake(
      (child) => {
        child.stdout.emit('data', 'chunk one\n');
        child.stdout.emit('data', 'chunk two\n');
        child.emit('close', 3);
      },
      { fs_impl }
    );

    expect(r).toMatchObject({
      ok: false,
      reason: 'verify_cmd_failed',
      exit: 3
    });
    expect(r.log_path).toBeUndefined();
  });

  test('keeps the verdict and omits log_path when the close fails', async () => {
    const fs_impl = /** @type {any} */ ({
      ...fs,
      closeSync: () => {
        throw new Error('EIO');
      }
    });

    const r = await runFake(
      (child) => {
        child.stdout.emit('data', 'done\n');
        child.emit('close', 0);
      },
      { fs_impl }
    );

    expect(r).toMatchObject({ ok: true, reason: 'ok', exit: 0 });
    expect(r.log_path).toBeUndefined();
  });

  test('runVerifyAtSha logs under the REPO state dir, not the detached worktree', async () => {
    const git = vi.fn(async () => ({ code: 0, stdout: '', stderr: '' }));
    const worktree = {
      addDetached: vi.fn(async () => ({ path: process.cwd() })),
      removeDetached: vi.fn(async () => ({ code: 0, stderr: '' })),
      withTopologyLock: vi.fn(
        async (/** @type {string} */ _repo, /** @type {any} */ fn) => fn()
      )
    };

    const r = await runVerifyAtSha({
      repo: WS,
      bead_id: 'UI-9',
      sha: SHA,
      pr_number: 304,
      cmd: [process.execPath, '-e', 'console.log("hello from verify")'],
      timeout_ms: 10000,
      worktree,
      git
    });

    expect(String(r.log_path).startsWith(verifyLogDir(WS))).toBe(true);
    expect(fs.readFileSync(String(r.log_path), 'utf8')).toContain(
      'hello from verify'
    );
  });

  test('runVerifyAtSha still writes under verify-logs, not the deploy dir', async () => {
    const git = vi.fn(async () => ({ code: 0, stdout: '', stderr: '' }));
    const worktree = {
      addDetached: vi.fn(async () => ({ path: process.cwd() })),
      removeDetached: vi.fn(async () => ({ code: 0, stderr: '' })),
      withTopologyLock: vi.fn(
        async (/** @type {string} */ _repo, /** @type {any} */ fn) => fn()
      )
    };

    const r = await runVerifyAtSha({
      repo: WS,
      bead_id: 'UI-9',
      sha: SHA,
      pr_number: 304,
      cmd: [process.execPath, '-e', 'console.log("still verify")'],
      timeout_ms: 10000,
      worktree,
      git
    });

    expect(path.basename(String(r.log_path)).startsWith('verify-')).toBe(true);
    expect(fs.existsSync(deployLogDir(WS))).toBe(false);
  });
});

describe('worker/verify-cmd — the deploy log kind (UI-l53x §1)', () => {
  const WS = '/tmp/example-workspace/project-deploy-log';
  const SHA = 'c'.repeat(40);

  /**
   * @param {(child: any) => void} run
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
   * @param {{ kind?: 'verify'|'deploy', started_at_ms?: number, fs_impl?: any }} [options]
   */
  function runFake(run, options = {}) {
    return runVerifyCmd({
      cwd: '/repo',
      cmd: ['bdui-shared', 'restart'],
      timeout_ms: 10000,
      spawn_impl: fakeSpawn(run),
      log_context: {
        kind: options.kind || 'deploy',
        workspace_root: WS,
        bead_id: 'UI-l53x',
        sha: SHA,
        started_at_ms: options.started_at_ms ?? 1700000000000
      },
      fs_impl: options.fs_impl
    });
  }

  test("names the file after the kind's own prefix and directory", async () => {
    const r = await runFake((child) => {
      child.emit('close', 1);
    });

    expect(r.log_path).toBe(
      path.join(
        deployLogDir(WS),
        `deploy-UI-l53x-${SHA.slice(0, 7)}-1700000000000.log`
      )
    );
  });

  test('preserves deploy output the tail cap dropped', async () => {
    const r = await runFake((child) => {
      child.stdout.emit('data', 'render failed: codex config.toml\n');
      child.stdout.emit('data', `${'x'.repeat(40000)}\n`);
      child.emit('close', 1);
    });

    expect(r.output_tail).not.toContain('render failed');
    expect(fs.readFileSync(String(r.log_path), 'utf8')).toContain(
      'render failed: codex config.toml'
    );
  });

  test('rotates deploy logs independently of the verify budget', async () => {
    const deploy = await runFake((child) => {
      child.stdout.emit('data', 'the deploy under diagnosis\n');
      child.emit('close', 1);
    });
    for (let i = 0; i < 21; i += 1) {
      await runFake(
        (child) => {
          child.emit('close', 0);
        },
        { kind: 'verify', started_at_ms: 1700000001000 + i }
      );
    }

    expect(fs.readFileSync(String(deploy.log_path), 'utf8')).toContain(
      'the deploy under diagnosis'
    );
  });

  test('prunes the OLDEST deploy log once its own 20 are full', async () => {
    /** @type {(string|undefined)[]} */
    const paths = [];
    for (let i = 0; i < 21; i += 1) {
      const r = await runFake(
        (child) => {
          child.emit('close', 0);
        },
        { started_at_ms: 1700000000000 + i }
      );
      paths.push(r.log_path);
    }

    expect(fs.existsSync(String(paths[0]))).toBe(false);
    expect(fs.existsSync(String(paths[20]))).toBe(true);
    expect(fs.readdirSync(deployLogDir(WS))).toHaveLength(20);
  });

  test('keeps the verdict and omits log_path when the deploy log cannot be opened', async () => {
    const fs_impl = /** @type {any} */ ({
      ...fs,
      openSync: () => {
        throw new Error('EACCES: permission denied');
      }
    });

    const r = await runFake(
      (child) => {
        child.stdout.emit('data', 'deploy output\n');
        child.emit('close', 1);
      },
      { fs_impl }
    );

    expect(r).toMatchObject({ ok: false, reason: 'verify_cmd_failed' });
    expect(r.log_path).toBeUndefined();
  });

  test('keeps the verdict and omits log_path when a deploy log write fails mid-run', async () => {
    let writes = 0;
    const fs_impl = /** @type {any} */ ({
      ...fs,
      writeSync: (/** @type {any[]} */ ...args) => {
        writes += 1;
        if (writes === 2) {
          throw new Error('ENOSPC: no space left on device');
        }
        return /** @type {any} */ (fs.writeSync)(...args);
      }
    });

    const r = await runFake(
      (child) => {
        child.stdout.emit('data', 'chunk one\n');
        child.stdout.emit('data', 'chunk two\n');
        child.emit('close', 1);
      },
      { fs_impl }
    );

    expect(r).toMatchObject({ ok: false, reason: 'verify_cmd_failed' });
    expect(r.log_path).toBeUndefined();
  });

  test('keeps the verdict and omits log_path when the deploy log close fails', async () => {
    const fs_impl = /** @type {any} */ ({
      ...fs,
      closeSync: () => {
        throw new Error('EIO');
      }
    });

    const r = await runFake(
      (child) => {
        child.emit('close', 0);
      },
      { fs_impl }
    );

    expect(r).toMatchObject({ ok: true, reason: 'ok' });
    expect(r.log_path).toBeUndefined();
  });
});

describe('worker/verify-cmd — spawn failures keep their error (UI-l53x §1)', () => {
  test('preserves a SYNCHRONOUS spawn throw as detail', async () => {
    const r = await runVerifyCmd({
      cwd: process.cwd(),
      cmd: ['bdui-shared', 'restart'],
      timeout_ms: 10000,
      spawn_impl: /** @type {any} */ (
        () => {
          throw new Error('spawn EACCES');
        }
      )
    });

    expect(r).toMatchObject({
      ok: false,
      reason: 'verify_cmd_spawn_error',
      detail: 'spawn EACCES'
    });
  });

  test("preserves the child's ASYNCHRONOUS error event as detail", async () => {
    const r = await runVerifyCmd({
      cwd: process.cwd(),
      cmd: ['bdui-definitely-not-a-binary-xyz'],
      timeout_ms: 10000
    });

    expect(r.reason).toBe('verify_cmd_spawn_error');
    expect(String(r.detail)).toContain('ENOENT');
  });

  test('caps an oversized spawn error detail at 512 characters', async () => {
    const r = await runVerifyCmd({
      cwd: process.cwd(),
      cmd: ['x'],
      timeout_ms: 10000,
      spawn_impl: /** @type {any} */ (
        () => {
          throw new Error('e'.repeat(900));
        }
      )
    });

    expect(String(r.detail)).toHaveLength(512);
  });

  test('adds NO detail to an argv validation failure — nothing was thrown', async () => {
    const r = await runVerifyCmd({
      cwd: process.cwd(),
      cmd: [],
      timeout_ms: 10000
    });

    expect(r.reason).toBe('verify_cmd_spawn_error');
    expect(r.detail).toBeUndefined();
  });

  test('a synchronous throw leaves no log file — it resolves before the open', async () => {
    const r = await runVerifyCmd({
      cwd: process.cwd(),
      cmd: ['bdui-shared', 'restart'],
      timeout_ms: 10000,
      spawn_impl: /** @type {any} */ (
        () => {
          throw new Error('spawn ENOENT');
        }
      ),
      log_context: {
        kind: 'deploy',
        workspace_root: '/tmp/example-workspace/project-spawn',
        bead_id: 'UI-l53x',
        sha: 'd'.repeat(40),
        started_at_ms: 1700000000000
      }
    });

    expect(r.log_path).toBeUndefined();
    expect(
      fs.existsSync(deployLogDir('/tmp/example-workspace/project-spawn'))
    ).toBe(false);
  });

  test('an asynchronous error event DOES carry the empty log file it opened', async () => {
    const ws = '/tmp/example-workspace/project-spawn-async';
    const child = /** @type {any} */ (new EventEmitter());
    child.stdout = Object.assign(new EventEmitter(), { setEncoding() {} });
    child.stderr = Object.assign(new EventEmitter(), { setEncoding() {} });
    child.kill = () => {};

    const promise = runVerifyCmd({
      cwd: '/repo',
      cmd: ['bdui-shared', 'restart'],
      timeout_ms: 10000,
      spawn_impl: /** @type {any} */ (() => child),
      log_context: {
        kind: 'deploy',
        workspace_root: ws,
        bead_id: 'UI-l53x',
        sha: 'e'.repeat(40),
        started_at_ms: 1700000000000
      }
    });
    child.emit('error', new Error('nope'));
    const r = await promise;

    expect(r).toMatchObject({
      reason: 'verify_cmd_spawn_error',
      detail: 'nope'
    });
    expect(fs.readFileSync(String(r.log_path), 'utf8')).toBe('');
  });
});
