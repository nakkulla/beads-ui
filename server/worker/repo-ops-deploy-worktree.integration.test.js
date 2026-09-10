import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createLockManager } from './locks.js';
import { createRepoOpsDeployWorktreeManager } from './worktree.js';

// This file drives REAL child processes (git, a shell, node), so its wall time
// is process startup, not product work. Measured against the whole suite running
// in parallel, tests here reach ~4s — against a 5s default that is a coin flip,
// and the repo-ops verify gate is where the coin lands wrong. The assertions are
// unchanged; only the budget is sized for the load the suite actually creates.
vi.setConfig({ testTimeout: 30_000, hookTimeout: 30_000 });

/** @type {string} */
let root;
/** @type {string} */
let remote;
/** @type {string} */
let repo;

/** @param {string[]} args - Git arguments. @param {string} cwd - Checkout. */
function git(args, cwd) {
  return execFileSync('git', args, { cwd, encoding: 'utf8' });
}

/**
 * @param {string} cwd
 * @returns {string[]}
 */
function registeredWorktreePaths(cwd) {
  return git(['worktree', 'list', '--porcelain', '-z'], cwd)
    .split('\0')
    .filter((line) => line.startsWith('worktree '))
    .map((line) => path.resolve(line.slice('worktree '.length)));
}

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'repo-ops-wt-'));
  process.env.XDG_STATE_HOME = path.join(root, 'state');
  remote = path.join(root, 'remote.git');
  repo = path.join(root, 'repo');
  git(['init', '--bare', '-q', remote], root);
  git(['clone', '-q', remote, repo], root);
  git(['config', 'user.email', 'test@example.com'], repo);
  git(['config', 'user.name', 'Test'], repo);
  fs.writeFileSync(path.join(repo, 'README'), 'base\n');
  git(['add', '.'], repo);
  git(['commit', '-qm', 'base'], repo);
  git(['push', '-qu', 'origin', 'HEAD:main'], repo);
  git(['branch', '-M', 'main'], repo);
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(root, { recursive: true, force: true });
});

describe('RepoOps deploy worktree', () => {
  test('pins fetched origin tip in a clean detached owned worktree and reuses it', async () => {
    const manager = createRepoOpsDeployWorktreeManager({
      locks: createLockManager()
    });
    const result = await manager.ensure({
      repo,
      workspace: repo,
      base: 'main'
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    if (
      typeof result.path !== 'string' ||
      typeof result.target_sha !== 'string'
    )
      return;
    expect(git(['rev-parse', 'HEAD'], result.path).trim()).toBe(
      result.target_sha
    );
    expect(git(['rev-parse', '--abbrev-ref', 'HEAD'], result.path).trim()).toBe(
      'HEAD'
    );
    expect(git(['status', '--porcelain'], result.path)).toBe('');
    expect(
      fs.existsSync(path.join(repo, '.worktrees', '.repo-ops-deploy'))
    ).toBe(true);

    const again = await manager.ensure({ repo, workspace: repo, base: 'main' });
    expect(again).toMatchObject({
      ok: true,
      path: result.path,
      target_sha: result.target_sha
    });
  });

  test('creates and reuses the registered deploy worktree in prepared nosync', async () => {
    const nosync = path.join(repo, '.worktrees.nosync');
    fs.mkdirSync(nosync);
    const manager = createRepoOpsDeployWorktreeManager({
      locks: createLockManager()
    });

    const created = await manager.ensure({
      repo,
      workspace: repo,
      base: 'main'
    });

    expect(created.ok).toBe(true);
    if (!created.ok || typeof created.path !== 'string') {
      return;
    }
    expect(fs.readlinkSync(path.join(repo, '.worktrees'))).toBe(
      '.worktrees.nosync'
    );
    expect(fs.realpathSync(created.path)).toBe(
      path.join(fs.realpathSync(nosync), '.repo-ops-deploy')
    );
    expect(registeredWorktreePaths(repo)).toContain(
      path.join(fs.realpathSync(nosync), '.repo-ops-deploy')
    );

    const reused = await manager.ensure({
      repo,
      workspace: repo,
      base: 'main'
    });

    expect(reused).toMatchObject({
      ok: true,
      path: created.path,
      target_sha: created.target_sha
    });
  });

  test('preserves an invalid container before deploy worktree creation', async () => {
    const container = path.join(repo, '.worktrees');
    fs.mkdirSync(path.join(repo, '.worktrees.nosync'));
    fs.mkdirSync(container);
    fs.writeFileSync(path.join(container, 'keep'), 'human data\n');
    const registrations = registeredWorktreePaths(repo);
    const manager = createRepoOpsDeployWorktreeManager({
      locks: createLockManager()
    });

    const result = await manager.ensureAligned({
      repo,
      workspace: repo,
      target_sha: git(['rev-parse', 'HEAD'], repo).trim()
    });

    expect(result).toEqual({
      ok: false,
      code: 'repo_ops_worktree_create_failed'
    });
    expect(fs.readFileSync(path.join(container, 'keep'), 'utf8')).toBe(
      'human data\n'
    );
    expect(registeredWorktreePaths(repo)).toEqual(registrations);
  });

  test('retries exactly once only after a reclaimed fetch timeout', async () => {
    const run = vi.fn(async (args) => {
      if (args[0] === 'fetch')
        return {
          code: run.mock.calls.length === 1 ? 124 : 1,
          stdout: '',
          stderr: ''
        };
      return { code: 1, stdout: '', stderr: '' };
    });
    const manager = createRepoOpsDeployWorktreeManager({
      locks: createLockManager(),
      run,
      now: vi
        .fn()
        .mockReturnValueOnce(100)
        .mockReturnValueOnce(400)
        .mockReturnValueOnce(500)
        .mockReturnValueOnce(900)
    });
    const result = await manager.ensure({ repo, base: 'main' });
    expect(result).toMatchObject({
      ok: false,
      code: 'repo_ops_fetch_failed',
      fetch_failure: 'nonzero',
      elapsed_ms: 700
    });
    expect(run.mock.calls.filter(([args]) => args[0] === 'fetch')).toHaveLength(
      2
    );
  });

  test('does not retry an ordinary fetch failure', async () => {
    const run = vi.fn(async () => ({ code: 1, stdout: '', stderr: '' }));
    const manager = createRepoOpsDeployWorktreeManager({
      locks: createLockManager(),
      run
    });
    await manager.ensure({ repo, base: 'main' });
    expect(run).toHaveBeenCalledTimes(1);
  });

  test('classifies a final fetch timeout and records both attempt durations', async () => {
    const run = vi.fn(async () => ({ code: 124, stdout: '', stderr: '' }));
    const manager = createRepoOpsDeployWorktreeManager({
      locks: createLockManager(),
      run,
      now: vi
        .fn()
        .mockReturnValueOnce(10)
        .mockReturnValueOnce(60)
        .mockReturnValueOnce(80)
        .mockReturnValueOnce(150)
    });

    const result = await manager.bindTarget({ repo, base: 'main' });

    expect(result).toMatchObject({
      ok: false,
      code: 'repo_ops_fetch_failed',
      fetch_failure: 'timeout',
      elapsed_ms: 120
    });
  });

  test('serializes fetch and remote ref resolution under the topology lock', async () => {
    /** @type {() => void} */
    let release_first_fetch = () => {};
    /** @type {Promise<void>} */
    const first_fetch = new Promise((resolve) => {
      release_first_fetch = () => resolve();
    });
    let fetch_count = 0;
    const run = vi.fn(async (args) => {
      if (args[0] === 'fetch') {
        fetch_count += 1;
        if (fetch_count === 1) {
          await first_fetch;
        }
        return { code: 0, stdout: '', stderr: '' };
      }
      return { code: 0, stdout: 'a'.repeat(40), stderr: '' };
    });
    const manager = createRepoOpsDeployWorktreeManager({
      locks: createLockManager(),
      run
    });

    const first = manager.bindTarget({ repo, base: 'main' });
    await vi.waitFor(() => expect(fetch_count).toBe(1));
    const second = manager.bindTarget({ repo, base: 'main' });
    await Promise.resolve();

    expect(fetch_count).toBe(1);
    release_first_fetch();
    await expect(Promise.all([first, second])).resolves.toEqual([
      { ok: true, target_sha: 'a'.repeat(40) },
      { ok: true, target_sha: 'a'.repeat(40) }
    ]);
    expect(run.mock.calls.map(([args]) => args[0])).toEqual([
      'fetch',
      'rev-parse',
      'fetch',
      'rev-parse'
    ]);
  });

  test('refuses an unregistered directory at the deploy path without deleting it', async () => {
    const manager = createRepoOpsDeployWorktreeManager({
      locks: createLockManager()
    });
    const squatter = path.join(repo, '.worktrees', '.repo-ops-deploy');
    fs.mkdirSync(squatter, { recursive: true });
    fs.writeFileSync(path.join(squatter, 'keep'), 'human file\n');

    const result = await manager.ensure({
      repo,
      workspace: repo,
      base: 'main'
    });

    expect(result).toMatchObject({
      ok: false,
      code: 'repo_ops_worktree_unowned'
    });
    expect(fs.readFileSync(path.join(squatter, 'keep'), 'utf8')).toBe(
      'human file\n'
    );
  });

  test('rejects a foreign clean checkout as deploy state', async () => {
    const manager = createRepoOpsDeployWorktreeManager({
      locks: createLockManager()
    });
    const foreign_path = path.join(repo, '.worktrees', '.repo-ops-deploy');
    fs.mkdirSync(path.dirname(foreign_path), { recursive: true });
    git(['clone', '-q', '-b', 'main', remote, foreign_path], root);

    const state = await manager.readState({ repo });

    expect(state).toMatchObject({
      ok: false,
      code: 'repo_ops_worktree_unowned'
    });
  });

  test('rejects a foreign clean checkout as coverage evidence', async () => {
    const manager = createRepoOpsDeployWorktreeManager({
      locks: createLockManager()
    });
    const foreign_path = path.join(repo, '.worktrees', '.repo-ops-deploy');
    fs.mkdirSync(path.dirname(foreign_path), { recursive: true });
    git(['clone', '-q', '-b', 'main', remote, foreign_path], root);
    const target_sha = git(['rev-parse', 'HEAD'], foreign_path).trim();

    const covered = await manager.verifyCovered({ repo, target_sha });

    expect(covered).toMatchObject({
      ok: false,
      code: 'repo_ops_worktree_unowned'
    });
  });

  test('reads a registered detached worktree created outside the Worker', async () => {
    const manager = createRepoOpsDeployWorktreeManager({
      locks: createLockManager()
    });
    const deploy_path = manager.pathFor(fs.realpathSync(repo));
    const target_sha = git(['rev-parse', 'HEAD'], repo).trim();
    git(['worktree', 'add', '--detach', deploy_path, target_sha], repo);

    const state = await manager.readState({ repo });

    expect(state).toMatchObject({
      ok: true,
      path: deploy_path,
      head: target_sha,
      clean: true
    });
  });

  test('aligns a registered detached worktree created outside the Worker', async () => {
    const manager = createRepoOpsDeployWorktreeManager({
      locks: createLockManager()
    });
    const deploy_path = manager.pathFor(fs.realpathSync(repo));
    git(['worktree', 'add', '--detach', deploy_path, 'HEAD'], repo);
    fs.writeFileSync(path.join(repo, 'README'), 'new base\n');
    git(['commit', '-am', 'advance base'], repo);
    const target_sha = git(['rev-parse', 'HEAD'], repo).trim();

    const result = await manager.ensureAligned({ repo, target_sha });

    expect(result).toMatchObject({ ok: true, path: deploy_path, target_sha });
    expect(git(['rev-parse', 'HEAD'], deploy_path).trim()).toBe(target_sha);
  });

  test('refuses a deploy worktree that left detached HEAD', async () => {
    const manager = createRepoOpsDeployWorktreeManager({
      locks: createLockManager()
    });
    const created = await manager.ensure({
      repo,
      workspace: repo,
      base: 'main'
    });
    expect(created.ok).toBe(true);
    if (!created.ok || typeof created.path !== 'string') return;
    git(['checkout', '-q', '-b', 'squatter-branch'], created.path);

    const result = await manager.ensure({
      repo,
      workspace: repo,
      base: 'main'
    });

    expect(result).toMatchObject({
      ok: false,
      code: 'repo_ops_worktree_unowned'
    });
  });

  test('binds the fetched remote tip without judging it against local history', async () => {
    const manager = createRepoOpsDeployWorktreeManager({
      locks: createLockManager()
    });
    fs.writeFileSync(path.join(repo, 'README'), 'ahead\n');
    git(['add', '.'], repo);
    git(['commit', '-qm', 'ahead of remote'], repo);
    const remote_sha = git(['rev-parse', 'origin/main'], repo).trim();

    const result = await manager.ensure({
      repo,
      workspace: repo,
      base: 'main'
    });

    expect(result).toMatchObject({ ok: true, target_sha: remote_sha });
  });
});
