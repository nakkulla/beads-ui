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

  test('observes the exact worker-owned branch path and head for discard', async () => {
    const wt = createWorktreeManager({ locks: createLockManager() });
    const head = headOf(repo);
    const created = await wt.add({ repo, bead_id: 'UI-1', base: head });

    const observed = await wt.observeOwnedByBead({
      repo,
      bead_id: 'UI-1'
    });

    expect(observed).toEqual({
      ok: true,
      present: true,
      path: fs.realpathSync(created.path),
      branch: 'UI-1',
      head_sha: head,
      reason: null
    });
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
    expect(created.path).toBe(
      path.join(repo, '.worktrees', '.verify', 'verify-UI-1')
    );
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

  test('addDetached reclaims a live worktree left under the same name', async () => {
    const locks = createLockManager();
    const wt = createWorktreeManager({ locks });
    const head = headOf(repo);
    const first = await wt.addDetached({
      repo,
      name: 'verify-UI-1',
      sha: head
    });
    // Residue of a previous run that was never torn down.
    fs.writeFileSync(path.join(first.path, 'stale.txt'), 'stale\n');

    const second = await wt.addDetached({
      repo,
      name: 'verify-UI-1',
      sha: head
    });

    expect(second.path).toBe(first.path);
    expect(headOf(second.path)).toBe(head);
    expect(fs.existsSync(path.join(second.path, 'stale.txt'))).toBe(false);
  });

  test('addDetached reclaims a stale registration whose directory is gone', async () => {
    const locks = createLockManager();
    const wt = createWorktreeManager({ locks });
    const head = headOf(repo);
    const first = await wt.addDetached({
      repo,
      name: 'verify-UI-1',
      sha: head
    });
    // Directory removed behind git's back: the registration survives.
    fs.rmSync(first.path, { recursive: true, force: true });

    const second = await wt.addDetached({
      repo,
      name: 'verify-UI-1',
      sha: head
    });

    expect(fs.existsSync(path.join(second.path, 'README.md'))).toBe(true);
    expect(headOf(second.path)).toBe(head);
  });

  test('addDetached reclaims a locked stale worktree', async () => {
    const locks = createLockManager();
    const wt = createWorktreeManager({ locks });
    const head = headOf(repo);
    const first = await wt.addDetached({
      repo,
      name: 'verify-UI-1',
      sha: head
    });
    // A lock left by a process that died mid-add — `remove --force` alone
    // refuses this one.
    git(['worktree', 'lock', first.path], repo);

    const second = await wt.addDetached({
      repo,
      name: 'verify-UI-1',
      sha: head
    });

    expect(headOf(second.path)).toBe(head);
  });

  test('addDetached reclaims an unregistered leftover directory', async () => {
    const locks = createLockManager();
    const wt = createWorktreeManager({ locks });
    const head = headOf(repo);
    const leftover = path.join(repo, '.worktrees', '.verify', 'verify-UI-1');
    fs.mkdirSync(leftover, { recursive: true });
    fs.writeFileSync(path.join(leftover, 'junk.txt'), 'junk\n');

    const created = await wt.addDetached({
      repo,
      name: 'verify-UI-1',
      sha: head
    });

    expect(created.path).toBe(leftover);
    expect(fs.existsSync(path.join(created.path, 'junk.txt'))).toBe(false);
    expect(headOf(created.path)).toBe(head);
  });

  test('addDetached never touches a session worktree of the same name', async () => {
    const locks = createLockManager();
    const wt = createWorktreeManager({ locks });
    const base = headOf(repo);
    const session = await wt.add({ repo, bead_id: 'UI-1', base });
    fs.writeFileSync(path.join(session.path, 'session.txt'), 'session\n');

    const detached = await wt.addDetached({ repo, name: 'UI-1', sha: base });

    // Separate namespace: the reclaim ladder cannot reach `.worktrees/UI-1`.
    expect(detached.path).toBe(
      path.join(repo, '.worktrees', '.verify', 'UI-1')
    );
    expect(fs.existsSync(session.path)).toBe(true);
    expect(fs.existsSync(path.join(session.path, 'session.txt'))).toBe(true);
    expect(headOf(session.path, 'UI-1')).toBe(base);
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

    expect(result).toEqual({ ok: true, removed: true, reason: null });
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

    expect(result).toEqual({ ok: true, removed: false, reason: null });
  });

  test('removeIfDiscardable reports no removal when only a spent branch is left', async () => {
    const locks = createLockManager();
    const wt = createWorktreeManager({ locks });
    const base = headOf(repo);
    await wt.add({ repo, bead_id: 'UI-1', base });
    await wt.remove({ repo, bead_id: 'UI-1' });

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base
    });

    expect(result).toEqual({ ok: true, removed: false, reason: null });
    expect(headOf(repo, 'UI-1')).toBe(base);
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

    expect(result).toEqual({ ok: false, removed: false, reason: 'dirty' });
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

    expect(result).toEqual({
      ok: false,
      removed: false,
      reason: 'branch_ahead'
    });
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

    expect(result).toEqual({
      ok: false,
      removed: false,
      reason: 'branch_ahead'
    });
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
    expect(result).toEqual({ ok: false, removed: false, reason: 'head_ahead' });
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

    expect(result).toEqual({
      ok: false,
      removed: false,
      reason: 'remove_failed'
    });
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

    expect(result).toEqual({
      ok: false,
      removed: false,
      reason: 'observe_failed'
    });
    expect(fs.existsSync(created.path)).toBe(true);
  });

  test('removeByBranch clears a worktree whose name is the collision fallback', async () => {
    const locks = createLockManager();
    const wt = createWorktreeManager({ locks });
    const base = headOf(repo);
    // What the contract's collision ladder produces: worktree and branch both
    // named `<bead-id>-<YYYYMMDD>`, which no bead-id computation can reach.
    const created = await wt.add({ repo, bead_id: 'UI-1-20260804', base });

    const result = await wt.removeByBranch({
      repo,
      branch: 'UI-1-20260804'
    });

    expect(result).toEqual({ ok: true, removed: true, reason: null });
    expect(fs.existsSync(created.path)).toBe(false);
    // The whole point: the branch is now deletable.
    git(['branch', '-D', 'UI-1-20260804'], repo);
  });

  test('removeByBranch preserves a worktree at a different captured path', async () => {
    const wt = createWorktreeManager({ locks: createLockManager() });
    const created = await wt.add({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });

    const result = await wt.removeByBranch({
      repo,
      branch: 'UI-1',
      expected_path: path.join(repo, '.worktrees', 'UI-old')
    });

    expect(result).toEqual({
      ok: false,
      removed: false,
      reason: 'identity_changed'
    });
    expect(fs.existsSync(created.path)).toBe(true);
  });

  test('removeByBranch preserves a worktree whose head moved after capture', async () => {
    const wt = createWorktreeManager({ locks: createLockManager() });
    const captured_head = headOf(repo);
    const created = await wt.add({
      repo,
      bead_id: 'UI-1',
      base: captured_head
    });
    commit(created.path, 'changed.txt', 'changed after capture');

    const result = await wt.removeByBranch({
      repo,
      branch: 'UI-1',
      expected_path: fs.realpathSync(created.path),
      expected_head: captured_head
    });

    expect(result).toEqual({
      ok: false,
      removed: false,
      reason: 'identity_changed'
    });
    expect(fs.existsSync(created.path)).toBe(true);
  });

  test('removeByBranch reports no removal when no worktree holds the branch', async () => {
    const locks = createLockManager();
    const wt = createWorktreeManager({ locks });

    const result = await wt.removeByBranch({ repo, branch: 'UI-none' });

    expect(result).toEqual({ ok: true, removed: false, reason: null });
  });

  test('removeByBranch matches the branch exactly, never by prefix', async () => {
    const locks = createLockManager();
    const wt = createWorktreeManager({ locks });
    const created = await wt.add({
      repo,
      bead_id: 'UI-abcd',
      base: headOf(repo)
    });

    const result = await wt.removeByBranch({ repo, branch: 'UI-abc' });

    expect(result).toEqual({ ok: true, removed: false, reason: null });
    expect(fs.existsSync(created.path)).toBe(true);
  });

  test('removeByBranch never matches a detached worktree', async () => {
    const locks = createLockManager();
    const wt = createWorktreeManager({ locks });
    const base = headOf(repo);
    // The worker's own verify worktree: detached, so its record carries no
    // `branch` line at all.
    const created = await wt.addDetached({
      repo,
      name: 'verify-UI-1',
      sha: base
    });

    const result = await wt.removeByBranch({ repo, branch: 'verify-UI-1' });

    expect(result).toEqual({ ok: true, removed: false, reason: null });
    expect(fs.existsSync(created.path)).toBe(true);
  });

  test('removeByBranch clears a prunable record whose directory is gone', async () => {
    const locks = createLockManager();
    const wt = createWorktreeManager({ locks });
    const created = await wt.add({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });
    // The registration outlives the directory and keeps holding the branch —
    // the state `fs.existsSync` reports as "already cleaned up".
    fs.rmSync(created.path, { recursive: true, force: true });

    const result = await wt.removeByBranch({ repo, branch: 'UI-1' });

    expect(result).toEqual({ ok: true, removed: true, reason: null });
    git(['branch', '-D', 'UI-1'], repo);
  });

  test('removeByBranch refuses a worktree outside .worktrees/ and leaves it on disk', async () => {
    const locks = createLockManager();
    const wt = createWorktreeManager({ locks });
    // A worktree a person made for their own work — exactly what the removed
    // name computation could never reach, and what `--force` cannot undo.
    const outside = path.join(repo, 'mine');
    git(['worktree', 'add', '-q', '-B', 'feat', outside, 'HEAD'], repo);

    const result = await wt.removeByBranch({ repo, branch: 'feat' });

    expect(result).toEqual({
      ok: false,
      removed: false,
      reason: 'foreign_worktree'
    });
    expect(fs.existsSync(path.join(outside, 'README.md'))).toBe(true);
  });

  test('removeByBranch refuses a sibling directory that only shares the prefix', async () => {
    const locks = createLockManager();
    const wt = createWorktreeManager({ locks });
    // `.worktrees-backup/` satisfies a `startsWith` test on `.worktrees` — the
    // reason the boundary is decided by `path.relative`.
    const sibling = path.join(repo, '.worktrees-backup', 'feat');
    git(['worktree', 'add', '-q', '-B', 'feat', sibling, 'HEAD'], repo);

    const result = await wt.removeByBranch({ repo, branch: 'feat' });

    expect(result).toEqual({
      ok: false,
      removed: false,
      reason: 'foreign_worktree'
    });
    expect(fs.existsSync(path.join(sibling, 'README.md'))).toBe(true);
  });

  test('removeByBranch refuses a worktree whose basename is not the branch', async () => {
    const locks = createLockManager();
    const wt = createWorktreeManager({ locks });
    const odd = path.join(repo, '.worktrees', 'not-the-branch');
    git(['worktree', 'add', '-q', '-B', 'UI-2', odd, 'HEAD'], repo);

    const result = await wt.removeByBranch({ repo, branch: 'UI-2' });

    expect(result).toEqual({
      ok: false,
      removed: false,
      reason: 'foreign_worktree'
    });
    expect(fs.existsSync(path.join(odd, 'README.md'))).toBe(true);
  });

  test('removeByBranch fails closed when the listing itself fails', async () => {
    const locks = createLockManager();
    const wt = createWorktreeManager({
      locks,
      run: async () => ({ code: 128, stdout: '', stderr: 'boom' })
    });

    const result = await wt.removeByBranch({ repo, branch: 'UI-1' });

    // A failed observation is not an absence — the misreading this replaces.
    expect(result).toEqual({
      ok: false,
      removed: false,
      reason: 'observe_failed'
    });
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
