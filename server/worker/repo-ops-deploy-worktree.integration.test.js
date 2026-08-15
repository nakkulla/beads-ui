import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createLockManager } from './locks.js';
import { repoOpsDeployWorktreeJournalPath } from './state-paths.js';
import { createRepoOpsDeployWorktreeManager } from './worktree.js';

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
      run
    });
    const result = await manager.ensure({ repo, base: 'main' });
    expect(result).toMatchObject({ ok: false, code: 'repo_ops_fetch_failed' });
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

  test('refuses a registered worktree whose ownership journal is missing', async () => {
    const manager = createRepoOpsDeployWorktreeManager({
      locks: createLockManager()
    });
    const created = await manager.ensure({
      repo,
      workspace: repo,
      base: 'main'
    });
    expect(created.ok).toBe(true);
    fs.rmSync(repoOpsDeployWorktreeJournalPath(repo));

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

  test('refuses a remote tip that rewinds behind the last successful deploy', async () => {
    const manager = createRepoOpsDeployWorktreeManager({
      locks: createLockManager()
    });
    fs.writeFileSync(path.join(repo, 'README'), 'ahead\n');
    git(['add', '.'], repo);
    git(['commit', '-qm', 'ahead of remote'], repo);
    const unpushed_sha = git(['rev-parse', 'HEAD'], repo).trim();

    const result = await manager.ensure({
      repo,
      workspace: repo,
      base: 'main',
      last_successful_sha: unpushed_sha
    });

    expect(result).toMatchObject({
      ok: false,
      code: 'remote_history_not_monotonic'
    });
  });
});
