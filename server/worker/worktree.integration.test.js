import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createLockManager } from './locks.js';
import { createRecoveryArchive } from './recovery-archive.js';
import { createWorktreeManager } from './worktree.js';

// Waits on REAL child processes (git, node, python), so wall time here is
// process startup under the load the parallel suite creates, not product work.
// Assertions are unchanged; only the waiting budget is sized for that load.
vi.setConfig({ testTimeout: 30_000, hookTimeout: 30_000 });

/** @type {string} */
let repo;
/** @type {string} */
let state_home;

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

/**
 * @param {(args: string[], cwd: string) => void} [before]
 */
function gitRunner(before) {
  return async (/** @type {string[]} */ args, /** @type {any} */ options) => {
    before?.(args, options.cwd);
    const result = spawnSync('git', args, {
      cwd: options.cwd,
      encoding: 'utf8'
    });
    return {
      code: result.status ?? 1,
      stdout: result.stdout || '',
      stderr: result.stderr || ''
    };
  };
}

beforeEach(() => {
  repo = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-wt-'));
  state_home = `${repo}-state`;
  process.env.XDG_STATE_HOME = state_home;
  git(['init', '-q'], repo);
  git(['config', 'user.email', 'test@example.com'], repo);
  git(['config', 'user.name', 'Test'], repo);
  git(['config', 'commit.gpgsign', 'false'], repo);
  fs.writeFileSync(path.join(repo, 'README.md'), '# base\n');
  git(['add', '.'], repo);
  git(['commit', '-q', '-m', 'base'], repo);
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  try {
    fs.rmSync(repo, { recursive: true, force: true });
    fs.rmSync(state_home, { recursive: true, force: true });
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

    expect(result).toMatchObject({
      ok: true,
      state: 'discardable',
      removed: true,
      reason: null
    });
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

    expect(result).toMatchObject({
      ok: true,
      state: 'absent',
      removed: false,
      reason: null
    });
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

    expect(result).toMatchObject({
      ok: true,
      state: 'discardable',
      removed: false,
      reason: null
    });
    expect(headOf(repo, 'UI-1')).toBe(base);
  });

  test('removeIfDiscardable preserves an untracked worktree', async () => {
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

    expect(result).toMatchObject({
      ok: false,
      state: 'unique',
      removed: false,
      reason: 'untracked_present',
      summary: { untracked_count: 1 }
    });
    expect(fs.existsSync(created.path)).toBe(true);
  });

  test('removeIfDiscardable reclaims an unstaged tracked blob already contained by base', async () => {
    const wt = createWorktreeManager({ locks: createLockManager() });
    const old_base = headOf(repo);
    const created = await wt.add({ repo, bead_id: 'UI-1', base: old_base });
    fs.writeFileSync(path.join(repo, 'README.md'), '# published\n');
    git(['add', 'README.md'], repo);
    git(['commit', '-q', '-m', 'publish'], repo);
    const pinned_base = headOf(repo);
    fs.writeFileSync(path.join(created.path, 'README.md'), '# published\n');

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base: pinned_base
    });

    expect(result).toMatchObject({
      ok: true,
      state: 'base_contained',
      removed: true,
      reason: null,
      summary: { staged_count: 0, unstaged_count: 1, untracked_count: 0 }
    });
    expect(result.identity.status_digest).toMatch(/^[0-9a-f]{64}$/);
    expect(fs.existsSync(created.path)).toBe(false);
  });

  test('removeIfDiscardable reclaims a staged binary blob already contained by base', async () => {
    const initial = Buffer.from([0, 1, 2, 3]);
    const published = Buffer.from([0, 255, 9, 4]);
    fs.writeFileSync(path.join(repo, 'asset.bin'), initial);
    git(['add', 'asset.bin'], repo);
    git(['commit', '-q', '-m', 'binary base'], repo);
    const wt = createWorktreeManager({ locks: createLockManager() });
    const created = await wt.add({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });
    fs.writeFileSync(path.join(repo, 'asset.bin'), published);
    git(['add', 'asset.bin'], repo);
    git(['commit', '-q', '-m', 'publish binary'], repo);
    const pinned_base = headOf(repo);
    fs.writeFileSync(path.join(created.path, 'asset.bin'), published);
    git(['add', 'asset.bin'], created.path);

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base: pinned_base
    });

    expect(result).toMatchObject({
      ok: true,
      state: 'base_contained',
      removed: true,
      summary: { staged_count: 1, unstaged_count: 0 }
    });
  });

  test('removeIfDiscardable preserves a staged blob that differs from base', async () => {
    const wt = createWorktreeManager({ locks: createLockManager() });
    const created = await wt.add({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });
    fs.writeFileSync(path.join(created.path, 'README.md'), '# unique\n');
    git(['add', 'README.md'], created.path);

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });

    expect(result).toMatchObject({
      ok: false,
      state: 'unique',
      removed: false,
      reason: 'dirty_unique'
    });
    expect(fs.readFileSync(path.join(created.path, 'README.md'), 'utf8')).toBe(
      '# unique\n'
    );
  });

  test('removeIfDiscardable reclaims a symlink target already contained by base', async () => {
    fs.symlinkSync('old-target', path.join(repo, 'current'));
    git(['add', 'current'], repo);
    git(['commit', '-q', '-m', 'symlink base'], repo);
    const wt = createWorktreeManager({ locks: createLockManager() });
    const created = await wt.add({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });
    fs.unlinkSync(path.join(repo, 'current'));
    fs.symlinkSync('published-target', path.join(repo, 'current'));
    git(['add', 'current'], repo);
    git(['commit', '-q', '-m', 'publish symlink'], repo);
    fs.unlinkSync(path.join(created.path, 'current'));
    fs.symlinkSync('published-target', path.join(created.path, 'current'));

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });

    expect(result).toMatchObject({
      ok: true,
      state: 'base_contained',
      removed: true
    });
  });

  test('removeIfDiscardable reclaims a deletion already contained by base', async () => {
    const wt = createWorktreeManager({ locks: createLockManager() });
    const created = await wt.add({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });
    git(['rm', '-q', 'README.md'], repo);
    git(['commit', '-q', '-m', 'publish deletion'], repo);
    fs.unlinkSync(path.join(created.path, 'README.md'));

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });

    expect(result).toMatchObject({
      ok: true,
      state: 'base_contained',
      removed: true
    });
  });

  test('removeIfDiscardable preserves a mixed path whose worktree state differs from base', async () => {
    const wt = createWorktreeManager({ locks: createLockManager() });
    const created = await wt.add({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });
    fs.writeFileSync(path.join(repo, 'README.md'), '# published\n');
    git(['add', 'README.md'], repo);
    git(['commit', '-q', '-m', 'publish'], repo);
    fs.writeFileSync(path.join(created.path, 'README.md'), '# published\n');
    git(['add', 'README.md'], created.path);
    fs.writeFileSync(path.join(created.path, 'README.md'), '# unique\n');

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });

    expect(result).toMatchObject({
      ok: false,
      state: 'unique',
      reason: 'dirty_unique',
      summary: { staged_count: 1, unstaged_count: 1 }
    });
    expect(fs.readFileSync(path.join(created.path, 'README.md'), 'utf8')).toBe(
      '# unique\n'
    );
  });

  test('removeIfDiscardable preserves rename and typechange states', async () => {
    const wt = createWorktreeManager({ locks: createLockManager() });
    const renamed = await wt.add({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });
    git(['mv', 'README.md', 'RENAMED.md'], renamed.path);

    const rename_result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });

    expect(rename_result).toMatchObject({
      ok: false,
      state: 'unique',
      reason: 'rename_or_copy'
    });
    await wt.remove({ repo, bead_id: 'UI-1' });
    const changed = await wt.add({
      repo,
      bead_id: 'UI-2',
      base: headOf(repo)
    });
    fs.unlinkSync(path.join(changed.path, 'README.md'));
    fs.symlinkSync('target', path.join(changed.path, 'README.md'));

    const type_result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-2',
      base: headOf(repo)
    });

    expect(type_result).toMatchObject({
      ok: false,
      state: 'unique',
      reason: 'typechange_state'
    });
  });

  test('removeIfDiscardable preserves a dirty submodule', async () => {
    const child = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-submodule-'));
    git(['init', '-q'], child);
    git(['config', 'user.email', 'test@example.com'], child);
    git(['config', 'user.name', 'Test'], child);
    fs.writeFileSync(path.join(child, 'child.txt'), 'base\n');
    git(['add', 'child.txt'], child);
    git(['commit', '-q', '-m', 'child base'], child);
    git(
      [
        '-c',
        'protocol.file.allow=always',
        'submodule',
        'add',
        '-q',
        child,
        'sub'
      ],
      repo
    );
    git(['commit', '-q', '-m', 'add submodule'], repo);
    const wt = createWorktreeManager({ locks: createLockManager() });
    const created = await wt.add({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });
    git(
      ['-c', 'protocol.file.allow=always', 'submodule', 'update', '--init'],
      created.path
    );
    fs.writeFileSync(path.join(created.path, 'sub', 'child.txt'), 'dirty\n');

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });

    expect(result).toMatchObject({
      ok: false,
      state: 'unique',
      reason: 'submodule_state'
    });
    expect(fs.existsSync(created.path)).toBe(true);
    fs.rmSync(child, { recursive: true, force: true });
  });

  test('removeIfDiscardable preserves an unsupported special file', async () => {
    const wt = createWorktreeManager({ locks: createLockManager() });
    const created = await wt.add({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });
    fs.unlinkSync(path.join(created.path, 'README.md'));
    execFileSync('mkfifo', [path.join(created.path, 'README.md')]);

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });

    expect(result).toMatchObject({
      ok: false,
      state: 'unique',
      reason: 'special_file'
    });
    expect(fs.lstatSync(path.join(created.path, 'README.md')).isFIFO()).toBe(
      true
    );
  });

  test('removeIfDiscardable preserves residue when identity drifts before restore', async () => {
    const old_base = headOf(repo);
    /** @type {string|null} */
    let worktree_path = null;
    let status_reads = 0;
    const run = gitRunner((args) => {
      if (args[0] === 'status') {
        status_reads += 1;
        if (status_reads === 2 && worktree_path !== null) {
          fs.writeFileSync(path.join(worktree_path, 'README.md'), '# drift\n');
        }
      }
    });
    const wt = createWorktreeManager({ locks: createLockManager(), run });
    const created = await wt.add({ repo, bead_id: 'UI-1', base: old_base });
    worktree_path = created.path;
    fs.writeFileSync(path.join(repo, 'README.md'), '# published\n');
    git(['add', 'README.md'], repo);
    git(['commit', '-q', '-m', 'publish'], repo);
    fs.writeFileSync(path.join(created.path, 'README.md'), '# published\n');

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });

    expect(result).toMatchObject({
      ok: false,
      state: 'unknown',
      reason: 'identity_changed'
    });
    expect(fs.readFileSync(path.join(created.path, 'README.md'), 'utf8')).toBe(
      '# drift\n'
    );
  });

  test('removeIfDiscardable preserves base-contained residue when restore fails', async () => {
    const old_base = headOf(repo);
    let failed = false;
    const real_run = gitRunner();
    const run = async (
      /** @type {string[]} */ args,
      /** @type {any} */ options
    ) => {
      if (args[0] === 'restore' && args.includes('--source=HEAD') && !failed) {
        failed = true;
        return { code: 1, stdout: '', stderr: 'injected' };
      }
      return real_run(args, options);
    };
    const wt = createWorktreeManager({ locks: createLockManager(), run });
    const created = await wt.add({ repo, bead_id: 'UI-1', base: old_base });
    fs.writeFileSync(path.join(repo, 'README.md'), '# published\n');
    git(['add', 'README.md'], repo);
    git(['commit', '-q', '-m', 'publish'], repo);
    fs.writeFileSync(path.join(created.path, 'README.md'), '# published\n');

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });

    expect(result).toMatchObject({
      ok: false,
      state: 'unknown',
      reason: 'restore_failed'
    });
    expect(fs.readFileSync(path.join(created.path, 'README.md'), 'utf8')).toBe(
      '# published\n'
    );
  });

  test('removeIfDiscardable changes the digest when unique tracked contents change', async () => {
    const wt = createWorktreeManager({ locks: createLockManager() });
    const created = await wt.add({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });
    fs.writeFileSync(path.join(created.path, 'README.md'), '# unique one\n');
    const first = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo),
      preserve: true
    });
    fs.writeFileSync(path.join(created.path, 'README.md'), '# unique two\n');

    const second = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo),
      preserve: true
    });

    expect(first.state).toBe('unique');
    expect(second.state).toBe('unique');
    expect(second.identity.status_digest).not.toBe(
      first.identity.status_digest
    );
  });

  test('removeIfDiscardable restores base-contained residue when remove fails', async () => {
    const wt = createWorktreeManager({ locks: createLockManager() });
    const created = await wt.add({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });
    fs.writeFileSync(path.join(repo, 'README.md'), '# published\n');
    git(['add', 'README.md'], repo);
    git(['commit', '-q', '-m', 'publish'], repo);
    fs.writeFileSync(path.join(created.path, 'README.md'), '# published\n');
    git(['worktree', 'lock', created.path], repo);

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });

    expect(result).toMatchObject({
      ok: false,
      state: 'unknown',
      reason: 'remove_failed'
    });
    expect(fs.readFileSync(path.join(created.path, 'README.md'), 'utf8')).toBe(
      '# published\n'
    );
    expect(
      execFileSync('git', ['status', '--porcelain'], {
        cwd: created.path,
        encoding: 'utf8'
      })
    ).not.toBe('');
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

    expect(result).toMatchObject({
      ok: false,
      state: 'unique',
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

    expect(result).toMatchObject({
      ok: false,
      state: 'unique',
      removed: false,
      reason: 'branch_ahead'
    });
    expect(headOf(repo, 'UI-1')).not.toBe(base);
  });

  test('reclaims a contained ahead branch after archiving recoverable intermediate history', async () => {
    const base = headOf(repo);
    const archive = createRecoveryArchive({ now: () => 5000 });
    /** @type {string|null} */
    let archive_path = null;
    const wt = createWorktreeManager({
      locks: createLockManager(),
      createBranchArchive(input) {
        const result = archive.createBranch({ workspace: repo, ...input });
        if (result.ok) {
          archive_path = result.receipt.path;
        }
        return result;
      }
    });
    const created = await wt.add({ repo, bead_id: 'UI-1', base });
    commit(created.path, 'transient.txt', 'recover-transient');
    commit(created.path, 'history.txt', 'recover-intermediate');
    fs.rmSync(path.join(created.path, 'transient.txt'));
    fs.writeFileSync(path.join(created.path, 'history.txt'), 'published\n');
    git(['add', '-A'], created.path);
    git(['commit', '-q', '-m', 'published'], created.path);
    fs.writeFileSync(path.join(repo, 'history.txt'), 'published\n');
    git(['add', 'history.txt'], repo);
    git(['commit', '-q', '-m', 'publish independently'], repo);

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });

    expect(result).toMatchObject({
      ok: true,
      state: 'discardable',
      removed: true,
      reason: null,
      summary: { branch_ahead: 3 }
    });
    expect(fs.existsSync(created.path)).toBe(false);
    expect(() => headOf(repo, 'UI-1')).toThrow();
    expect(archive_path).not.toBeNull();
    if (archive_path === null) {
      throw new Error('archive path missing');
    }
    const recovery = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-recovery-'));
    try {
      git(['init', '-q'], recovery);
      git(['remote', 'add', 'source', repo], recovery);
      git(['fetch', '-q', 'source', base], recovery);
      git(
        [
          'fetch',
          '-q',
          path.join(archive_path, 'commits.bundle'),
          'refs/heads/UI-1:refs/heads/recovered'
        ],
        recovery
      );
      expect(
        execFileSync('git', ['show', 'recovered~2:transient.txt'], {
          cwd: recovery,
          encoding: 'utf8'
        })
      ).toBe('recover-transient\n');
      expect(
        execFileSync('git', ['show', 'recovered~1:history.txt'], {
          cwd: recovery,
          encoding: 'utf8'
        })
      ).toBe('recover-intermediate\n');
    } finally {
      fs.rmSync(recovery, { recursive: true, force: true });
    }
  });

  test('reclaims a branch-only contained ahead residue with CAS deletion', async () => {
    const base = headOf(repo);
    /** @type {any[]} */
    const archive_inputs = [];
    const wt = createWorktreeManager({
      locks: createLockManager(),
      createBranchArchive(input) {
        archive_inputs.push(input);
        return {
          ok: true,
          receipt: {
            path: '/archive',
            manifest_sha256: 'a'.repeat(64),
            verified_at: 1
          }
        };
      }
    });
    const created = await wt.add({ repo, bead_id: 'UI-1', base });
    commit(created.path, 'published.txt', 'published');
    const branch_head_sha = headOf(created.path);
    fs.writeFileSync(path.join(repo, 'published.txt'), 'published\n');
    git(['add', 'published.txt'], repo);
    git(['commit', '-q', '-m', 'publish independently'], repo);
    await wt.remove({ repo, bead_id: 'UI-1' });

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });

    expect(result).toMatchObject({
      ok: true,
      state: 'discardable',
      removed: true,
      identity: { branch_head_sha },
      summary: { branch_ahead: 1 }
    });
    expect(archive_inputs).toHaveLength(1);
    expect(() => headOf(repo, 'UI-1')).toThrow();
  });

  test('reclaims dirty base-contained work after proving its ahead branch contained', async () => {
    const base = headOf(repo);
    const wt = createWorktreeManager({
      locks: createLockManager(),
      createBranchArchive: () => ({
        ok: true,
        receipt: {
          path: '/archive',
          manifest_sha256: 'a'.repeat(64),
          verified_at: 1
        }
      })
    });
    const created = await wt.add({ repo, bead_id: 'UI-1', base });
    commit(created.path, 'published.txt', 'published');
    fs.writeFileSync(path.join(repo, 'published.txt'), 'published\n');
    fs.writeFileSync(path.join(repo, 'README.md'), '# published\n');
    git(['add', '.'], repo);
    git(['commit', '-q', '-m', 'publish independently'], repo);
    fs.writeFileSync(path.join(created.path, 'README.md'), '# published\n');

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });

    expect(result).toMatchObject({
      ok: true,
      state: 'base_contained',
      removed: true,
      summary: { branch_ahead: 1 }
    });
    expect(fs.existsSync(created.path)).toBe(false);
    expect(() => headOf(repo, 'UI-1')).toThrow();
  });

  test('preserves a pure ahead branch as ahead_not_contained', async () => {
    let archive_calls = 0;
    const base = headOf(repo);
    const wt = createWorktreeManager({
      locks: createLockManager(),
      createBranchArchive: () => {
        archive_calls += 1;
        return { ok: false, reason: 'unexpected' };
      }
    });
    const created = await wt.add({ repo, bead_id: 'UI-1', base });
    commit(created.path, 'unique.txt', 'unique');

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base
    });

    expect(result).toMatchObject({
      ok: false,
      state: 'unique',
      removed: false,
      reason: 'ahead_not_contained'
    });
    expect(archive_calls).toBe(0);
    expect(fs.existsSync(created.path)).toBe(true);
  });

  test('preserves a behind branch when one contributed path differs from base', async () => {
    const base = headOf(repo);
    const wt = createWorktreeManager({
      locks: createLockManager(),
      createBranchArchive: () => ({ ok: true })
    });
    const created = await wt.add({ repo, bead_id: 'UI-1', base });
    commit(created.path, 'shared.txt', 'branch-value');
    commit(repo, 'shared.txt', 'base-value');

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });

    expect(result).toMatchObject({
      ok: false,
      state: 'unique',
      reason: 'ahead_not_contained'
    });
    expect(fs.existsSync(created.path)).toBe(true);
  });

  test('preserves a behind branch when a contributed path mode differs from base', async () => {
    const base = headOf(repo);
    const wt = createWorktreeManager({
      locks: createLockManager(),
      createBranchArchive: () => ({ ok: true })
    });
    const created = await wt.add({ repo, bead_id: 'UI-1', base });
    fs.writeFileSync(path.join(created.path, 'shared.txt'), 'shared\n', {
      mode: 0o755
    });
    git(['add', 'shared.txt'], created.path);
    git(['commit', '-q', '-m', 'executable branch path'], created.path);
    fs.writeFileSync(path.join(repo, 'shared.txt'), 'shared\n', {
      mode: 0o644
    });
    git(['add', 'shared.txt'], repo);
    git(['commit', '-q', '-m', 'plain base path'], repo);

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });

    expect(result).toMatchObject({
      ok: false,
      state: 'unique',
      reason: 'ahead_not_contained'
    });
    expect(fs.existsSync(created.path)).toBe(true);
  });

  test('compares both sides of a rename with no rename detection', async () => {
    commit(repo, 'old.txt', 'old');
    const base = headOf(repo);
    /** @type {string[][]} */
    const calls = [];
    const real_run = gitRunner((args) => calls.push(args));
    const wt = createWorktreeManager({
      locks: createLockManager(),
      run: real_run,
      createBranchArchive: () => ({ ok: true })
    });
    const created = await wt.add({ repo, bead_id: 'UI-1', base });
    git(['mv', 'old.txt', 'new.txt'], created.path);
    git(['commit', '-q', '-m', 'rename'], created.path);
    git(['mv', 'old.txt', 'new.txt'], repo);
    git(['commit', '-q', '-m', 'publish rename independently'], repo);

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });

    expect(result.ok).toBe(true);
    expect(
      calls.some((args) => args[0] === 'diff' && args.includes('--no-renames'))
    ).toBe(true);
    expect(() => headOf(repo, 'UI-1')).toThrow();
  });

  test('preserves an ahead range containing a merge commit', async () => {
    const base = headOf(repo);
    const wt = createWorktreeManager({
      locks: createLockManager(),
      createBranchArchive: () => ({ ok: true })
    });
    const created = await wt.add({ repo, bead_id: 'UI-1', base });
    commit(created.path, 'branch.txt', 'branch');
    commit(repo, 'main.txt', 'main');
    git(
      ['merge', '--no-ff', '-q', '-m', 'merge main', headOf(repo)],
      created.path
    );

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });

    expect(result).toMatchObject({
      ok: false,
      state: 'unique',
      reason: 'ahead_merge_commit'
    });
    expect(fs.existsSync(created.path)).toBe(true);
  });

  test('rejects a gitlink present only at the merge base', async () => {
    const gitlink_oid = headOf(repo);
    git(
      [
        'update-index',
        '--add',
        '--cacheinfo',
        '160000',
        gitlink_oid,
        'vendor/child'
      ],
      repo
    );
    git(['commit', '-q', '-m', 'gitlink base'], repo);
    const base = headOf(repo);
    const wt = createWorktreeManager({
      locks: createLockManager(),
      createBranchArchive: () => ({ ok: true })
    });
    const created = await wt.add({ repo, bead_id: 'UI-1', base });
    git(['rm', '-q', '--cached', 'vendor/child'], created.path);
    fs.rmSync(path.join(created.path, 'vendor/child'), {
      recursive: true,
      force: true
    });
    fs.mkdirSync(path.join(created.path, 'vendor'), { recursive: true });
    fs.writeFileSync(path.join(created.path, 'vendor/child'), 'plain\n');
    git(['add', 'vendor/child'], created.path);
    git(['commit', '-q', '-m', 'replace gitlink'], created.path);
    git(['rm', '-q', '--cached', 'vendor/child'], repo);
    fs.rmSync(path.join(repo, 'vendor/child'), {
      recursive: true,
      force: true
    });
    fs.mkdirSync(path.join(repo, 'vendor'), { recursive: true });
    fs.writeFileSync(path.join(repo, 'vendor/child'), 'plain\n');
    git(['add', 'vendor/child'], repo);
    git(['commit', '-q', '-m', 'publish replacement independently'], repo);

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });

    expect(result).toMatchObject({
      ok: false,
      state: 'unique',
      reason: 'ahead_submodule_path'
    });
    expect(fs.existsSync(created.path)).toBe(true);
  });

  test('preserves every git object when branch archive creation fails', async () => {
    const base = headOf(repo);
    const wt = createWorktreeManager({
      locks: createLockManager(),
      createBranchArchive: () => ({ ok: false, reason: 'disk_full' })
    });
    const created = await wt.add({ repo, bead_id: 'UI-1', base });
    commit(created.path, 'published.txt', 'published');
    const branch_head = headOf(created.path);
    commit(repo, 'published.txt', 'published');

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });

    expect(result).toMatchObject({
      ok: false,
      state: 'unknown',
      reason: 'archive_failed'
    });
    expect(fs.existsSync(created.path)).toBe(true);
    expect(headOf(repo, 'UI-1')).toBe(branch_head);
  });

  test('preserves the ref when CAS deletion fails', async () => {
    const base = headOf(repo);
    const real_run = gitRunner();
    /** @type {string|null} */
    let moved_head = null;
    const run = async (
      /** @type {string[]} */ args,
      /** @type {any} */ options
    ) => {
      if (args[0] === 'update-ref' && args[1] === '-d' && moved_head !== null) {
        await real_run(['update-ref', 'refs/heads/UI-1', moved_head], options);
      }
      return real_run(args, options);
    };
    const wt = createWorktreeManager({
      locks: createLockManager(),
      run,
      createBranchArchive: () => ({ ok: true })
    });
    const created = await wt.add({ repo, bead_id: 'UI-1', base });
    commit(created.path, 'published.txt', 'published');
    commit(repo, 'published.txt', 'published');
    moved_head = headOf(repo);

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });

    expect(result).toMatchObject({
      ok: false,
      state: 'unknown',
      reason: 'ref_delete_failed'
    });
    expect(fs.existsSync(created.path)).toBe(false);
    expect(headOf(repo, 'UI-1')).toBe(moved_head);
  });

  test('rejects an identity change after archive without removing residue', async () => {
    const base = headOf(repo);
    const wt = createWorktreeManager({
      locks: createLockManager(),
      createBranchArchive: () => {
        git(['update-ref', 'refs/heads/UI-1', base], repo);
        return { ok: true };
      }
    });
    const created = await wt.add({ repo, bead_id: 'UI-1', base });
    commit(created.path, 'published.txt', 'published');
    commit(repo, 'published.txt', 'published');

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });

    expect(result).toMatchObject({
      ok: false,
      state: 'unknown',
      reason: 'identity_changed'
    });
    expect(fs.existsSync(created.path)).toBe(true);
    expect(headOf(repo, 'UI-1')).toBe(base);
  });

  test('fails closed when ahead containment observation fails', async () => {
    const base = headOf(repo);
    const real_run = gitRunner();
    const run = async (
      /** @type {string[]} */ args,
      /** @type {any} */ options
    ) => {
      if (args[0] === 'merge-base') {
        return { code: 1, stdout: '', stderr: 'injected' };
      }
      return real_run(args, options);
    };
    const wt = createWorktreeManager({
      locks: createLockManager(),
      run,
      createBranchArchive: () => ({ ok: true })
    });
    const created = await wt.add({ repo, bead_id: 'UI-1', base });
    commit(created.path, 'published.txt', 'published');
    const branch_head = headOf(created.path);
    commit(repo, 'published.txt', 'published');

    const result = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base: headOf(repo)
    });

    expect(result).toMatchObject({
      ok: false,
      state: 'unknown',
      reason: 'observe_failed'
    });
    expect(fs.existsSync(created.path)).toBe(true);
    expect(headOf(repo, 'UI-1')).toBe(branch_head);
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
    expect(result).toMatchObject({
      ok: false,
      state: 'unique',
      removed: false,
      reason: 'head_ahead'
    });
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

    expect(result).toMatchObject({
      ok: false,
      state: 'unknown',
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

    expect(result).toMatchObject({
      ok: false,
      state: 'unknown',
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

  test('removeByBranch preserves a worktree whose archived status changed', async () => {
    const wt = createWorktreeManager({ locks: createLockManager() });
    const base = headOf(repo);
    const created = await wt.add({ repo, bead_id: 'UI-1', base });
    fs.writeFileSync(path.join(created.path, 'saved.txt'), 'archived');
    const observed = await wt.removeIfDiscardable({
      repo,
      bead_id: 'UI-1',
      base,
      preserve: true
    });
    fs.writeFileSync(path.join(created.path, 'saved.txt'), 'changed later');

    const result = await wt.removeByBranch({
      repo,
      branch: 'UI-1',
      expected_path: fs.realpathSync(created.path),
      expected_head: observed.identity.head_sha,
      expected_base_oid: observed.identity.base_oid,
      expected_status_digest: observed.identity.status_digest
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

describe('worker/worktree restore (real git)', () => {
  /** @type {string} */
  let origin;

  /**
   * Publish `UI-1` on an `origin` this repo can fetch from, then leave the
   * local checkout the way a deleted worktree leaves it.
   *
   * @param {{ keep_local_branch?: boolean, diverge?: boolean }} [options]
   */
  function publishHeadBranch(options = {}) {
    origin = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-wt-origin-'));
    git(['init', '-q', '--bare'], origin);
    git(['remote', 'add', 'origin', origin], repo);
    git(['checkout', '-q', '-b', 'UI-1'], repo);
    commit(repo, 'work.txt', 'resolved');
    const published = headOf(repo);
    git(['push', '-q', 'origin', 'UI-1'], repo);
    git(['checkout', '-q', '-'], repo);
    if (options.diverge) {
      git(['checkout', '-q', 'UI-1'], repo);
      commit(repo, 'work.txt', 'unpushed');
      git(['checkout', '-q', '-'], repo);
    } else if (!options.keep_local_branch) {
      git(['branch', '-q', '-D', 'UI-1'], repo);
    }
    return published;
  }

  afterEach(() => {
    try {
      fs.rmSync(origin, { recursive: true, force: true });
    } catch {
      /* ignore */
    }
  });

  test('checks out a tracking branch when only origin has the head', async () => {
    const wt = createWorktreeManager({ locks: createLockManager() });
    const published = publishHeadBranch();

    const restored = await wt.restore({
      repo,
      bead_id: 'UI-1',
      head_ref: 'UI-1'
    });

    expect(restored).toEqual({
      ok: true,
      path: path.join(repo, '.worktrees', 'UI-1')
    });
    expect(headOf(path.join(repo, '.worktrees', 'UI-1'))).toBe(published);
  });

  test('reuses the local head branch when its tip already matches origin', async () => {
    const wt = createWorktreeManager({ locks: createLockManager() });
    const published = publishHeadBranch({ keep_local_branch: true });

    const restored = await wt.restore({
      repo,
      bead_id: 'UI-1',
      head_ref: 'UI-1'
    });

    expect(restored.ok).toBe(true);
    expect(headOf(path.join(repo, '.worktrees', 'UI-1'))).toBe(published);
  });

  test("refuses a head branch that is not the bead's own", async () => {
    const wt = createWorktreeManager({ locks: createLockManager() });
    publishHeadBranch();

    const restored = await wt.restore({
      repo,
      bead_id: 'UI-1',
      head_ref: 'someone-elses-branch'
    });

    expect(restored).toEqual({
      ok: false,
      reason: 'worktree_restore_branch_mismatch'
    });
  });

  test('refuses when the worktree path reappeared under the lock', async () => {
    const wt = createWorktreeManager({ locks: createLockManager() });
    publishHeadBranch({ keep_local_branch: true });
    await wt.add({ repo, bead_id: 'UI-1', base: headOf(repo) });

    const restored = await wt.restore({
      repo,
      bead_id: 'UI-1',
      head_ref: 'UI-1'
    });

    expect(restored).toEqual({
      ok: false,
      reason: 'worktree_restore_path_exists'
    });
  });

  test('refuses when origin does not carry the head branch', async () => {
    const wt = createWorktreeManager({ locks: createLockManager() });
    publishHeadBranch();
    git(['push', '-q', 'origin', '--delete', 'UI-1'], repo);
    git(['fetch', '-q', '--prune', 'origin'], repo);

    const restored = await wt.restore({
      repo,
      bead_id: 'UI-1',
      head_ref: 'UI-1'
    });

    expect(restored).toEqual({
      ok: false,
      reason: 'worktree_restore_branch_missing'
    });
  });

  test('leaves an unpushed local head branch alone', async () => {
    const wt = createWorktreeManager({ locks: createLockManager() });
    publishHeadBranch({ diverge: true });

    const restored = await wt.restore({
      repo,
      bead_id: 'UI-1',
      head_ref: 'UI-1'
    });

    expect(restored).toEqual({
      ok: false,
      reason: 'worktree_restore_branch_diverged'
    });
    expect(fs.existsSync(path.join(repo, '.worktrees', 'UI-1'))).toBe(false);
  });
});
