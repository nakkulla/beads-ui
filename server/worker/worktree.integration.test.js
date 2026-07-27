import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { createLockManager } from './locks.js';
import { createWorktreeManager } from './worktree.js';

/** @type {string} */
let repo;

/**
 * @param {string[]} args
 * @param {string} cwd
 */
function git(args, cwd) {
  execFileSync('git', args, { cwd, stdio: 'pipe' });
}

/**
 * @param {string} cwd
 * @param {string} rev
 * @returns {string}
 */
function headOf(cwd, rev = 'HEAD') {
  return execFileSync('git', ['rev-parse', rev], {
    cwd,
    encoding: 'utf8'
  }).trim();
}

/**
 * @param {string} cwd
 * @param {string} file
 * @param {string} message
 */
function commit(cwd, file, message) {
  fs.writeFileSync(path.join(cwd, file), `${message}\n`);
  git(['add', '.'], cwd);
  git(['commit', '-q', '-m', message], cwd);
}

beforeEach(() => {
  repo = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-wt-'));
  git(['init', '-q'], repo);
  git(['config', 'user.email', 'test@example.com'], repo);
  git(['config', 'user.name', 'Test'], repo);
  git(['config', 'commit.gpgsign', 'false'], repo);
  fs.writeFileSync(path.join(repo, 'README.md'), '# base\n');
  git(['add', '.'], repo);
  git(['commit', '-q', '-m', 'base'], repo);
});

afterEach(() => {
  try {
    fs.rmSync(repo, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

describe('worker/worktree (real git)', () => {
  test('add creates .worktrees/<bead-id> from base; remove tears it down', async () => {
    const locks = createLockManager();
    const wt = createWorktreeManager({ locks });

    const head = execFileSync('git', ['rev-parse', 'HEAD'], {
      cwd: repo,
      encoding: 'utf8'
    }).trim();

    const created = await wt.add({ repo, bead_id: 'UI-1', base: head });
    expect(created.path).toBe(path.join(repo, '.worktrees', 'UI-1'));
    expect(created.branch).toBe('UI-1');
    expect(created.base_oid).toBe(head);
    // The worktree really exists and carries the base tree.
    expect(fs.existsSync(path.join(created.path, 'README.md'))).toBe(true);
    // git registered it as a worktree.
    const list = execFileSync('git', ['worktree', 'list'], {
      cwd: repo,
      encoding: 'utf8'
    });
    expect(list).toContain(path.join('.worktrees', 'UI-1'));

    const removed = await wt.remove({ repo, bead_id: 'UI-1' });
    expect(removed.code).toBe(0);
    expect(fs.existsSync(created.path)).toBe(false);
  });

  test('addDetached pins the exact sha with a detached HEAD; removeDetached tears it down', async () => {
    const locks = createLockManager();
    const wt = createWorktreeManager({ locks });

    const first = execFileSync('git', ['rev-parse', 'HEAD'], {
      cwd: repo,
      encoding: 'utf8'
    }).trim();
    // Advance the base so the pinned sha is NOT the moving tip.
    fs.writeFileSync(path.join(repo, 'next.txt'), 'next\n');
    git(['add', '.'], repo);
    git(['commit', '-q', '-m', 'next'], repo);

    const created = await wt.addDetached({
      repo,
      name: 'verify-UI-1',
      sha: first
    });
    expect(created.path).toBe(path.join(repo, '.worktrees', 'verify-UI-1'));
    // Pinned to the exact sha, detached (no branch ref created).
    const head = execFileSync('git', ['rev-parse', 'HEAD'], {
      cwd: created.path,
      encoding: 'utf8'
    }).trim();
    expect(head).toBe(first);
    const sym = execFileSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {
      cwd: created.path,
      encoding: 'utf8'
    }).trim();
    expect(sym).toBe('HEAD');

    const removed = await wt.removeDetached({ repo, name: 'verify-UI-1' });
    expect(removed.code).toBe(0);
    expect(fs.existsSync(created.path)).toBe(false);
  });

  test('removeIfDiscardable clears a clean residue whose branch and HEAD carry nothing', async () => {
    const locks = createLockManager();
    const wt = createWorktreeManager({ locks });
    const base = headOf(repo);
    const created = await wt.add({ repo, bead_id: 'UI-1', base });

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base
    });

    expect(result).toEqual({ ok: true, reason: null });
    expect(fs.existsSync(created.path)).toBe(false);
  });

  test('removeIfDiscardable reports ok when there is no residue at all', async () => {
    const locks = createLockManager();
    const wt = createWorktreeManager({ locks });

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-none',
      base: headOf(repo)
    });

    expect(result).toEqual({ ok: true, reason: null });
  });

  test('removeIfDiscardable preserves a dirty worktree', async () => {
    const locks = createLockManager();
    const wt = createWorktreeManager({ locks });
    const base = headOf(repo);
    const created = await wt.add({ repo, bead_id: 'UI-1', base });
    fs.writeFileSync(path.join(created.path, 'scratch.txt'), 'work\n');

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base
    });

    expect(result).toEqual({ ok: false, reason: 'dirty' });
    expect(fs.existsSync(created.path)).toBe(true);
  });

  test('removeIfDiscardable preserves a branch carrying its own commits', async () => {
    const locks = createLockManager();
    const wt = createWorktreeManager({ locks });
    const base = headOf(repo);
    const created = await wt.add({ repo, bead_id: 'UI-1', base });
    commit(created.path, 'work.txt', 'work');

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base
    });

    expect(result).toEqual({ ok: false, reason: 'branch_ahead' });
    expect(fs.existsSync(created.path)).toBe(true);
  });

  test('removeIfDiscardable preserves an ahead branch whose worktree is already gone', async () => {
    const locks = createLockManager();
    const wt = createWorktreeManager({ locks });
    const base = headOf(repo);
    const created = await wt.add({ repo, bead_id: 'UI-1', base });
    commit(created.path, 'work.txt', 'work');
    await wt.remove({ repo, bead_id: 'UI-1' });

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base
    });

    expect(result).toEqual({ ok: false, reason: 'branch_ahead' });
    expect(headOf(repo, 'UI-1')).not.toBe(base);
  });

  test('removeIfDiscardable preserves a detached HEAD commit the branch cannot show', async () => {
    const locks = createLockManager();
    const wt = createWorktreeManager({ locks });
    const base = headOf(repo);
    const created = await wt.add({ repo, bead_id: 'UI-1', base });
    // Detach first, so the commit lands on HEAD only: the branch stays at base.
    git(['checkout', '-q', '--detach'], created.path);
    commit(created.path, 'work.txt', 'work');

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base
    });

    expect(headOf(repo, 'UI-1')).toBe(base);
    expect(result).toEqual({ ok: false, reason: 'head_ahead' });
    expect(fs.existsSync(created.path)).toBe(true);
  });

  test('removeIfDiscardable preserves the worktree when the non-forced remove is refused', async () => {
    const locks = createLockManager();
    const wt = createWorktreeManager({ locks });
    const base = headOf(repo);
    const created = await wt.add({ repo, bead_id: 'UI-1', base });
    // A locked worktree is exactly what `--force` would override — and does not.
    git(['worktree', 'lock', created.path], repo);

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base
    });

    expect(result).toEqual({ ok: false, reason: 'remove_failed' });
    expect(fs.existsSync(created.path)).toBe(true);
  });

  test('removeIfDiscardable fails closed when the base cannot be resolved', async () => {
    const locks = createLockManager();
    const wt = createWorktreeManager({ locks });
    const created = await wt.add({ repo, bead_id: 'UI-1', base: headOf(repo) });

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base: 'no-such-base'
    });

    expect(result).toEqual({ ok: false, reason: 'observe_failed' });
    expect(fs.existsSync(created.path)).toBe(true);
  });

  test('add is serialized by the topology lock (no ref-db race)', async () => {
    const locks = createLockManager();
    const wt = createWorktreeManager({ locks });
    const head = execFileSync('git', ['rev-parse', 'HEAD'], {
      cwd: repo,
      encoding: 'utf8'
    }).trim();

    // Two concurrent adds on the same repo must both succeed (serialized).
    const [a, b] = await Promise.all([
      wt.add({ repo, bead_id: 'UI-A', base: head }),
      wt.add({ repo, bead_id: 'UI-B', base: head })
    ]);
    expect(fs.existsSync(a.path)).toBe(true);
    expect(fs.existsSync(b.path)).toBe(true);
  });
});
