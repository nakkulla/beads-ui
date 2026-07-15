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
