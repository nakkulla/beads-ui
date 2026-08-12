import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, test, vi } from 'vitest';
import { deploySelf } from './deploy-self.js';

const SHA = 'a'.repeat(40);
const DEPLOY_SELF_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'deploy-self.js'
);

function fixture() {
  /** @type {string[][]} */
  const calls = [];
  const fs = {
    existsSync: vi.fn(() => false),
    mkdirSync: vi.fn(),
    realpathSync: vi.fn((value) => value),
    renameSync: vi.fn(),
    rmSync: vi.fn(),
    symlinkSync: vi.fn()
  };
  const run = vi.fn((bin, args) => {
    calls.push([bin, ...args]);
    if (bin === 'git' && args[0] === 'rev-parse') {
      return { status: 0, stdout: `${SHA}\n`, stderr: '' };
    }
    if (bin === 'git' && args[0] === 'status') {
      return { status: 0, stdout: '', stderr: '' };
    }
    return { status: 0, stdout: '', stderr: '' };
  });
  return { calls, fs, run };
}

describe('deploy-self', () => {
  test('keeps the checked-out entrypoint executable with a node shebang', () => {
    const mode = fs.statSync(DEPLOY_SELF_PATH).mode;
    const source = fs.readFileSync(DEPLOY_SELF_PATH, 'utf8');

    expect(mode & 0o111).not.toBe(0);
    expect(source.startsWith('#!/usr/bin/env node\n')).toBe(true);
  });

  test('installs, atomically publishes, restarts, and verifies the exact candidate', async () => {
    const f = fixture();
    const result = await deploySelf({
      cwd: '/release',
      env: {
        BDUI_DEPLOY_TARGET_SHA: SHA,
        BDUI_DEPLOY_RUNTIME_CURRENT: '/runtime/current',
        BDUI_DEPLOY_HEALTH_URL: 'http://127.0.0.1:3000/healthz'
      },
      fs_impl: f.fs,
      run_sync: f.run,
      fetch_impl: vi.fn(async () => ({
        ok: true,
        json: async () => ({
          ok: true,
          runtime: { source_sha: SHA, source_repo: '/release' }
        })
      })),
      sleep: async () => {}
    });

    expect(result).toEqual({ ok: true, sha: SHA, release_path: '/release' });
    expect(f.calls).toEqual([
      ['git', 'rev-parse', 'HEAD'],
      ['git', 'status', '--porcelain', '--untracked-files=no'],
      ['npm', 'ci'],
      ['npm', 'run', 'build'],
      ['bdui-shared', 'restart']
    ]);
    expect(f.fs.symlinkSync).toHaveBeenCalledWith(
      '/release',
      '/runtime/.current.new',
      'junction'
    );
    expect(f.fs.renameSync).toHaveBeenCalledWith(
      '/runtime/.current.new',
      '/runtime/current'
    );
  });

  test('replays the same SHA without requiring pointer state', async () => {
    const f = fixture();
    const input = {
      cwd: '/release',
      env: {
        BDUI_DEPLOY_TARGET_SHA: SHA,
        BDUI_DEPLOY_RUNTIME_CURRENT: '/runtime/current',
        BDUI_DEPLOY_HEALTH_URL: 'http://127.0.0.1:3000/healthz'
      },
      fs_impl: f.fs,
      run_sync: f.run,
      fetch_impl: async () => ({
        ok: true,
        json: async () => ({
          ok: true,
          runtime: { source_sha: SHA, source_repo: '/release' }
        })
      }),
      sleep: async () => {}
    };

    await expect(deploySelf(input)).resolves.toMatchObject({ ok: true });
    await expect(deploySelf(input)).resolves.toMatchObject({ ok: true });

    expect(f.calls.filter((call) => call[0] === 'bdui-shared')).toHaveLength(2);
  });

  test('rejects a mismatched candidate before publishing', async () => {
    const f = fixture();
    f.run.mockImplementation((bin, args) => {
      if (bin === 'git' && args[0] === 'rev-parse') {
        return { status: 0, stdout: `${'b'.repeat(40)}\n`, stderr: '' };
      }
      return { status: 0, stdout: '', stderr: '' };
    });

    const result = await deploySelf({
      cwd: '/release',
      env: { BDUI_DEPLOY_TARGET_SHA: SHA },
      fs_impl: f.fs,
      run_sync: f.run
    });

    expect(result).toEqual({ ok: false, reason: 'candidate_sha_mismatch' });
    expect(f.fs.renameSync).not.toHaveBeenCalled();
  });

  test('rejects a dirty candidate before installing', async () => {
    const f = fixture();
    f.run.mockImplementation((bin, args) => {
      if (bin === 'git' && args[0] === 'rev-parse') {
        return { status: 0, stdout: `${SHA}\n`, stderr: '' };
      }
      if (bin === 'git' && args[0] === 'status') {
        return { status: 0, stdout: ' M server/index.js\n', stderr: '' };
      }
      return { status: 0, stdout: '', stderr: '' };
    });

    const result = await deploySelf({
      cwd: '/release',
      env: { BDUI_DEPLOY_TARGET_SHA: SHA },
      fs_impl: f.fs,
      run_sync: f.run
    });

    expect(result).toEqual({ ok: false, reason: 'candidate_dirty' });
    expect(f.calls.some((call) => call[0] === 'npm')).toBe(false);
  });

  test.each([
    ['install', 'npm', 'ci', 'dependency_install_failed'],
    ['build', 'npm', 'run', 'build_failed'],
    ['restart', 'bdui-shared', 'restart', 'runtime_restart_failed']
  ])('returns a precise %s failure', async (_name, bin, first_arg, reason) => {
    const f = fixture();
    f.run.mockImplementation((command, args) => {
      if (command === bin && args[0] === first_arg) {
        return { status: 1, stdout: '', stderr: 'failed' };
      }
      if (command === 'git' && args[0] === 'rev-parse') {
        return { status: 0, stdout: `${SHA}\n`, stderr: '' };
      }
      return { status: 0, stdout: '', stderr: '' };
    });

    const result = await deploySelf({
      cwd: '/release',
      env: {
        BDUI_DEPLOY_TARGET_SHA: SHA,
        BDUI_DEPLOY_RUNTIME_CURRENT: '/runtime/current'
      },
      fs_impl: f.fs,
      run_sync: f.run,
      fetch_impl: async () => ({ ok: false }),
      sleep: async () => {}
    });

    expect(result).toEqual({ ok: false, reason });
  });

  test('returns a pointer publish failure', async () => {
    const f = fixture();
    f.fs.renameSync.mockImplementation(() => {
      throw new Error('rename denied');
    });

    const result = await deploySelf({
      cwd: '/release',
      env: {
        BDUI_DEPLOY_TARGET_SHA: SHA,
        BDUI_DEPLOY_RUNTIME_CURRENT: '/runtime/current'
      },
      fs_impl: f.fs,
      run_sync: f.run
    });

    expect(result).toEqual({
      ok: false,
      reason: 'runtime_pointer_publish_failed'
    });
  });

  test('rejects a health source that only lexically matches the release', async () => {
    const f = fixture();
    f.fs.realpathSync.mockImplementation((value) =>
      value === '/release' ? '/real/release' : '/other/release'
    );
    const fetch_impl = vi.fn(async () => ({
      ok: true,
      json: async () => ({
        ok: true,
        runtime: { source_sha: SHA, source_repo: '/release/.' }
      })
    }));

    const result = await deploySelf({
      cwd: '/release',
      env: {
        BDUI_DEPLOY_TARGET_SHA: SHA,
        BDUI_DEPLOY_RUNTIME_CURRENT: '/runtime/current'
      },
      fs_impl: f.fs,
      run_sync: f.run,
      fetch_impl,
      sleep: async () => {}
    });

    expect(result).toEqual({ ok: false, reason: 'runtime_health_mismatch' });
    expect(fetch_impl).toHaveBeenCalledTimes(50);
  });
});
