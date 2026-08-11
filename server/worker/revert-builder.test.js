import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, test, vi } from 'vitest';
import { createRevertBuilder } from './revert-builder.js';

const SHA = 'a'.repeat(40);
const PARENT = 'b'.repeat(40);

/**
 * @param {(args: string[]) => { code: number, stdout?: string, stderr?: string }} handler
 */
function makeBuilder(handler) {
  const gitRun = vi.fn(async (args) => ({
    stdout: args[0] === 'write-tree' ? SHA : '',
    stderr: '',
    ...handler(args)
  }));

  return { builder: createRevertBuilder({ gitRun }), gitRun };
}

describe('worker/revert-builder', () => {
  test('rejects a merge commit that is not an ancestor of the pinned target tip', async () => {
    const { builder, gitRun } = makeBuilder((args) => {
      if (args[0] === 'fetch') {
        return { code: 0 };
      }
      if (args[0] === 'rev-parse') {
        return { code: 0, stdout: `${SHA}\n` };
      }
      if (args[0] === 'rev-list') {
        return { code: 0, stdout: `${SHA} ${PARENT} ${'c'.repeat(40)}\n` };
      }
      if (args[0] === 'merge-base') {
        return { code: 1 };
      }
      return { code: 0 };
    });

    const result = await builder.prepare({
      repo: '/repo',
      worktree: '/tmp/revert-worktree',
      branch: 'revert-UI-1-op',
      target_base: 'main',
      original: {
        merge_sha: SHA,
        head_sha: 'c'.repeat(40),
        commits: [],
        files: []
      }
    });

    expect(result).toEqual({ ok: false, reason: 'merge_not_on_target_base' });
    expect(gitRun).not.toHaveBeenCalledWith(
      expect.arrayContaining(['worktree', 'add']),
      expect.anything()
    );
  });

  test('reverse-applies a proven squash delta in a real git worktree', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-revert-squash-'));
    const remote = path.join(root, 'origin.git');
    const repo = path.join(root, 'repo');
    const worktree = path.join(root, 'revert-UI-2-op');
    /** @param {string} cwd - @param {string[]} args */
    const git = (cwd, args) =>
      execFileSync('git', args, { cwd, encoding: 'utf8' });
    git(root, ['init', '--bare', remote]);
    git(root, ['init', '-b', 'main', repo]);
    git(repo, ['config', 'user.email', 'test@example.com']);
    git(repo, ['config', 'user.name', 'Test']);
    fs.writeFileSync(path.join(repo, 'file.txt'), 'base\n');
    git(repo, ['add', 'file.txt']);
    git(repo, ['commit', '-m', 'base']);
    git(repo, ['remote', 'add', 'origin', remote]);
    git(repo, ['push', '-u', 'origin', 'main']);
    git(repo, ['checkout', '-b', 'topic']);
    fs.writeFileSync(path.join(repo, 'file.txt'), 'topic\n');
    git(repo, ['commit', '-am', 'topic']);
    const head_sha = git(repo, ['rev-parse', 'HEAD']).trim();
    git(repo, ['push', 'origin', 'topic']);
    git(repo, ['checkout', 'main']);
    git(repo, ['merge', '--squash', 'topic']);
    git(repo, ['commit', '-m', 'squash topic']);
    const merge_sha = git(repo, ['rev-parse', 'HEAD']).trim();
    git(repo, ['push', 'origin', 'main']);
    /** @param {string[]} args - @param {{ cwd: string }} options */
    const gitRun = async (args, options) => {
      try {
        return { code: 0, stdout: git(options.cwd, args), stderr: '' };
      } catch (error) {
        return {
          code: Number(/** @type {any} */ (error).status) || 1,
          stdout: '',
          stderr: String(/** @type {any} */ (error).stderr || '')
        };
      }
    };
    const result = await createRevertBuilder({ gitRun }).prepare({
      repo,
      worktree,
      branch: 'revert-UI-2-op',
      target_base: 'main',
      original: {
        merge_sha,
        head_sha,
        commits: [{ oid: head_sha }],
        files: [{ path: 'file.txt' }]
      }
    });
    expect(result).toMatchObject({ ok: true, proof: { method: 'squash' } });
    expect(fs.readFileSync(path.join(worktree, 'file.txt'), 'utf8')).toBe(
      'base\n'
    );
    fs.rmSync(root, { recursive: true, force: true });
  });

  test('rejects a same-path squash whose landed binary delta differs from the PR range', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-revert-drift-'));
    const remote = path.join(root, 'origin.git');
    const repo = path.join(root, 'repo');
    const worktree = path.join(root, 'revert-UI-2-drift');
    /** @param {string} cwd - @param {string[]} args */
    const git = (cwd, args) =>
      execFileSync('git', args, { cwd, encoding: 'utf8' });
    git(root, ['init', '--bare', remote]);
    git(root, ['init', '-b', 'main', repo]);
    git(repo, ['config', 'user.email', 'test@example.com']);
    git(repo, ['config', 'user.name', 'Test']);
    fs.writeFileSync(path.join(repo, 'file.txt'), 'base\n');
    git(repo, ['add', 'file.txt']);
    git(repo, ['commit', '-m', 'base']);
    git(repo, ['remote', 'add', 'origin', remote]);
    git(repo, ['push', '-u', 'origin', 'main']);
    git(repo, ['checkout', '-b', 'topic']);
    fs.writeFileSync(path.join(repo, 'file.txt'), 'topic\n');
    git(repo, ['commit', '-am', 'topic']);
    const head_sha = git(repo, ['rev-parse', 'HEAD']).trim();
    git(repo, ['checkout', 'main']);
    fs.writeFileSync(path.join(repo, 'file.txt'), 'altered during squash\n');
    git(repo, ['commit', '-am', 'altered squash']);
    const merge_sha = git(repo, ['rev-parse', 'HEAD']).trim();
    git(repo, ['push', 'origin', 'main']);
    /** @param {string[]} args - @param {{ cwd: string }} options */
    const gitRun = async (args, options) => {
      try {
        return { code: 0, stdout: git(options.cwd, args), stderr: '' };
      } catch (error) {
        return {
          code: Number(/** @type {any} */ (error).status) || 1,
          stdout: '',
          stderr: String(/** @type {any} */ (error).stderr || '')
        };
      }
    };

    const result = await createRevertBuilder({ gitRun }).prepare({
      repo,
      worktree,
      branch: 'revert-UI-2-drift',
      target_base: 'main',
      original: {
        merge_sha,
        head_sha,
        commits: [{ oid: head_sha }],
        files: [{ path: 'file.txt' }]
      }
    });

    expect(result).toEqual({ ok: false, reason: 'rebase_range_unproven' });
    expect(fs.existsSync(worktree)).toBe(false);
    fs.rmSync(root, { recursive: true, force: true });
  });

  test('fetches and verifies the pinned pull ref before raw source OID fallback', async () => {
    const head_sha = 'c'.repeat(40);
    const { builder, gitRun } = makeBuilder((args) => {
      if (
        args[0] === 'fetch' &&
        args[1] === 'origin' &&
        args[2] === 'refs/pull/304/head'
      ) {
        return { code: 0 };
      }
      if (args[0] === 'fetch') {
        return { code: 0 };
      }
      if (args[0] === 'rev-parse' && args[1] === 'FETCH_HEAD') {
        return { code: 0, stdout: `${head_sha}\n` };
      }
      if (args[0] === 'cat-file') {
        return { code: 0 };
      }
      if (args[0] === 'rev-list') {
        return { code: 0, stdout: `${SHA} ${PARENT} ${head_sha}\n` };
      }
      if (args[0] === 'merge-base') {
        return { code: 1 };
      }
      return { code: 0, stdout: `${SHA}\n` };
    });

    await builder.prepare({
      repo: '/repo',
      worktree: '/tmp/revert-worktree',
      branch: 'revert-UI-1-op',
      target_base: 'main',
      target_sha: SHA,
      original: {
        number: 304,
        merge_sha: SHA,
        head_sha,
        commits: [{ oid: head_sha }],
        files: [{ path: 'file.txt' }]
      }
    });

    expect(gitRun).toHaveBeenCalledWith(
      ['fetch', 'origin', 'refs/pull/304/head'],
      { cwd: '/repo' }
    );
    expect(gitRun).toHaveBeenCalledWith(['rev-parse', 'FETCH_HEAD'], {
      cwd: '/repo'
    });
    expect(
      gitRun.mock.calls.filter(
        ([args]) =>
          args[0] === 'fetch' &&
          args[2] !== 'refs/pull/304/head' &&
          args[2] !== SHA
      )
    ).toHaveLength(0);
  });

  test('fails closed when neither the pull ref nor pinned head SHA can be fetched', async () => {
    const head_sha = 'c'.repeat(40);
    const { builder, gitRun } = makeBuilder((args) => {
      if (args[0] === 'fetch' && args[2] === SHA) {
        return { code: 0 };
      }
      if (args[0] === 'fetch' || args[0] === 'cat-file') {
        return { code: 1 };
      }
      return { code: 0, stdout: `${SHA}\n` };
    });

    const result = await builder.prepare({
      repo: '/repo',
      worktree: '/tmp/revert-worktree',
      branch: 'revert-UI-1-op',
      target_base: 'main',
      target_sha: SHA,
      original: {
        number: 304,
        merge_sha: SHA,
        head_sha,
        commits: [{ oid: head_sha }],
        files: [{ path: 'file.txt' }]
      }
    });

    expect(result).toEqual({
      ok: false,
      reason: 'pull_ref_head_unavailable'
    });
    expect(gitRun).toHaveBeenCalledWith(
      ['fetch', 'origin', 'refs/pull/304/head'],
      { cwd: '/repo' }
    );
    expect(gitRun).toHaveBeenCalledWith(['fetch', 'origin', head_sha], {
      cwd: '/repo'
    });
  });

  test('proves a rebased contiguous patch-id range in a real git worktree', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-revert-rebase-'));
    const remote = path.join(root, 'origin.git');
    const repo = path.join(root, 'repo');
    const worktree = path.join(root, 'revert-UI-3-op');
    /** @param {string} cwd - @param {string[]} args */
    const git = (cwd, args) =>
      execFileSync('git', args, { cwd, encoding: 'utf8' });
    git(root, ['init', '--bare', remote]);
    git(root, ['init', '-b', 'main', repo]);
    git(repo, ['config', 'user.email', 'test@example.com']);
    git(repo, ['config', 'user.name', 'Test']);
    fs.writeFileSync(path.join(repo, 'base.txt'), 'base\n');
    git(repo, ['add', 'base.txt']);
    git(repo, ['commit', '-m', 'base']);
    git(repo, ['remote', 'add', 'origin', remote]);
    git(repo, ['push', '-u', 'origin', 'main']);
    git(repo, ['checkout', '-b', 'topic']);
    fs.writeFileSync(path.join(repo, 'one.txt'), 'one\n');
    git(repo, ['add', 'one.txt']);
    git(repo, ['commit', '-m', 'one']);
    const original_one = git(repo, ['rev-parse', 'HEAD']).trim();
    fs.writeFileSync(path.join(repo, 'two.txt'), 'two\n');
    git(repo, ['add', 'two.txt']);
    git(repo, ['commit', '-m', 'two']);
    const original_two = git(repo, ['rev-parse', 'HEAD']).trim();
    git(repo, ['push', 'origin', 'topic']);
    git(repo, ['checkout', 'main']);
    fs.writeFileSync(path.join(repo, 'main.txt'), 'main\n');
    git(repo, ['add', 'main.txt']);
    git(repo, ['commit', '-m', 'main advance']);
    git(repo, ['push', 'origin', 'main']);
    git(repo, ['checkout', 'topic']);
    git(repo, ['rebase', 'main']);
    const merge_sha = git(repo, ['rev-parse', 'HEAD']).trim();
    git(repo, ['checkout', 'main']);
    git(repo, ['merge', '--ff-only', 'topic']);
    git(repo, ['push', 'origin', 'main']);
    /** @param {string[]} args - @param {{ cwd: string }} options */
    const gitRun = async (args, options) => {
      try {
        return { code: 0, stdout: git(options.cwd, args), stderr: '' };
      } catch (error) {
        return {
          code: Number(/** @type {any} */ (error).status) || 1,
          stdout: '',
          stderr: String(/** @type {any} */ (error).stderr || '')
        };
      }
    };
    const result = await createRevertBuilder({ gitRun }).prepare({
      repo,
      worktree,
      branch: 'revert-UI-3-op',
      target_base: 'main',
      original: {
        merge_sha,
        head_sha: original_two,
        commits: [{ oid: original_one }, { oid: original_two }],
        files: [{ path: 'one.txt' }, { path: 'two.txt' }]
      }
    });
    expect(result).toMatchObject({ ok: true, proof: { method: 'rebase' } });
    expect(fs.existsSync(path.join(worktree, 'one.txt'))).toBe(false);
    expect(fs.readFileSync(path.join(worktree, 'main.txt'), 'utf8')).toBe(
      'main\n'
    );
    fs.rmSync(root, { recursive: true, force: true });
  });

  test('reverse-applies a proven merge delta in a real git worktree', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-revert-git-'));
    const remote = path.join(root, 'origin.git');
    const repo = path.join(root, 'repo');
    const worktree = path.join(root, 'revert-UI-1-op');
    /** @param {string} cwd - @param {string[]} args */
    const git = (cwd, args) =>
      execFileSync('git', args, { cwd, encoding: 'utf8' });
    git(root, ['init', '--bare', remote]);
    git(root, ['init', '-b', 'main', repo]);
    git(repo, ['config', 'user.email', 'test@example.com']);
    git(repo, ['config', 'user.name', 'Test']);
    fs.writeFileSync(path.join(repo, 'file.txt'), 'base\n');
    git(repo, ['add', 'file.txt']);
    git(repo, ['commit', '-m', 'base']);
    git(repo, ['remote', 'add', 'origin', remote]);
    git(repo, ['push', '-u', 'origin', 'main']);
    git(repo, ['checkout', '-b', 'topic']);
    fs.writeFileSync(path.join(repo, 'file.txt'), 'topic\n');
    git(repo, ['commit', '-am', 'topic']);
    const head_sha = git(repo, ['rev-parse', 'HEAD']).trim();
    git(repo, ['checkout', 'main']);
    git(repo, ['merge', '--no-ff', 'topic', '-m', 'merge topic']);
    const merge_sha = git(repo, ['rev-parse', 'HEAD']).trim();
    git(repo, ['push', 'origin', 'main']);
    /** @param {string[]} args - @param {{ cwd: string }} options */
    const gitRun = async (args, options) => {
      try {
        return { code: 0, stdout: git(options.cwd, args), stderr: '' };
      } catch (error) {
        return {
          code: Number(/** @type {any} */ (error).status) || 1,
          stdout: '',
          stderr: String(/** @type {any} */ (error).stderr || '')
        };
      }
    };

    const result = await createRevertBuilder({ gitRun }).prepare({
      repo,
      worktree,
      branch: 'revert-UI-1-op',
      target_base: 'main',
      original: {
        merge_sha,
        head_sha,
        commits: [{ oid: head_sha }],
        files: [{ path: 'file.txt' }]
      }
    });

    expect(result).toMatchObject({ ok: true, proof: { method: 'merge' } });
    expect(fs.readFileSync(path.join(worktree, 'file.txt'), 'utf8')).toBe(
      'base\n'
    );
    fs.rmSync(root, { recursive: true, force: true });
  });

  test('proves a merge commit first-parent delta and reverse-applies its binary patch', async () => {
    const { builder, gitRun } = makeBuilder((args) => {
      if (args[0] === 'fetch') {
        return { code: 0 };
      }
      if (args[0] === 'rev-parse') {
        return { code: 0, stdout: `${SHA}\n` };
      }
      if (args[0] === 'rev-list') {
        return { code: 0, stdout: `${SHA} ${PARENT} ${'c'.repeat(40)}\n` };
      }
      if (args[0] === 'diff' && args.includes('--quiet')) {
        return { code: 1 };
      }
      if (args[0] === 'diff' && args.includes('--raw')) {
        return { code: 0, stdout: ':100644 100644 x y M\tfile.js\n' };
      }
      return { code: 0 };
    });

    const result = await builder.prepare({
      repo: '/repo',
      worktree: '/tmp/revert-worktree',
      branch: 'revert-UI-1-op',
      target_base: 'main',
      original: {
        merge_sha: SHA,
        head_sha: 'c'.repeat(40),
        commits: [],
        files: []
      }
    });

    expect(result).toMatchObject({
      ok: true,
      proof: { method: 'merge', from: PARENT, to: SHA }
    });
    expect(gitRun).toHaveBeenCalledWith(
      expect.arrayContaining(['apply', '--reverse', '--3way']),
      expect.objectContaining({ cwd: '/tmp/revert-worktree' })
    );
  });

  test('rejects a rebase whose integrated range cannot be proved', async () => {
    const { builder, gitRun } = makeBuilder((args) => {
      if (args[0] === 'fetch') {
        return { code: 0 };
      }
      if (args[0] === 'rev-parse') {
        return { code: 0, stdout: `${SHA}\n` };
      }
      if (args[0] === 'log') {
        return { code: 0, stdout: `${SHA}\n` };
      }
      if (args[0] === 'rev-list') {
        return { code: 0, stdout: `${SHA} ${PARENT}\n` };
      }
      return { code: 0 };
    });

    const result = await builder.prepare({
      repo: '/repo',
      worktree: '/tmp/revert-worktree',
      branch: 'revert-UI-1-op',
      target_base: 'main',
      original: {
        merge_sha: SHA,
        head_sha: 'e'.repeat(40),
        commits: [{ oid: 'd'.repeat(40) }],
        files: [{ path: 'file.js' }]
      }
    });

    expect(result).toEqual({ ok: false, reason: 'rebase_range_unproven' });
    expect(gitRun).not.toHaveBeenCalledWith(
      expect.arrayContaining(['push']),
      expect.anything()
    );
  });
});
