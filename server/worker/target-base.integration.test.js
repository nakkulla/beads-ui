import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { createLockManager } from './locks.js';
import { resolveTargetBase } from './target-base.js';
import { createWorktreeManager } from './worktree.js';

/** @type {string} */
let tmp;
/** @type {string} */
let origin;
/** @type {string} */
let repo;

/**
 * @param {string[]} args
 * @param {string} cwd
 * @returns {string}
 */
function git(args, cwd) {
  return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: 'pipe' });
}

/**
 * @param {string[]} args
 * @param {{ cwd?: string }} options
 */
async function gitRun(args, options) {
  try {
    const stdout = execFileSync('git', args, {
      cwd: options.cwd,
      encoding: 'utf8',
      stdio: 'pipe'
    });
    return { code: 0, stdout, stderr: '' };
  } catch (err) {
    const e = /** @type {any} */ (err);
    return {
      code: typeof e.status === 'number' ? e.status : 1,
      stdout: String(e.stdout || ''),
      stderr: String(e.stderr || '')
    };
  }
}

/**
 * @param {string} cwd
 * @param {string} message
 */
function commit(cwd, message) {
  fs.writeFileSync(path.join(cwd, `${message}.txt`), `${message}\n`);
  git(['add', '.'], cwd);
  git(['commit', '-q', '-m', message], cwd);
}

/**
 * @param {string} cwd
 */
function identify(cwd) {
  git(['config', 'user.email', 'test@example.com'], cwd);
  git(['config', 'user.name', 'Test'], cwd);
  git(['config', 'commit.gpgsign', 'false'], cwd);
}

beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-base-int-'));
  const seed = path.join(tmp, 'seed');
  fs.mkdirSync(seed);
  git(['init', '-q', '-b', 'ilsun/dev'], seed);
  identify(seed);
  commit(seed, 'first');

  origin = path.join(tmp, 'origin.git');
  git(['clone', '-q', '--bare', seed, origin], tmp);

  repo = path.join(tmp, 'repo');
  git(['clone', '-q', origin, repo], tmp);
  identify(repo);
});

afterEach(() => {
  try {
    fs.rmSync(tmp, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

/**
 * Advance the remote branch WITHOUT touching this clone, leaving the local
 * `ilsun/dev` and `refs/remotes/origin/ilsun/dev` both stale.
 *
 * @returns {string} The new remote tip.
 */
function advanceRemote() {
  const other = path.join(tmp, 'other');
  git(['clone', '-q', origin, other], tmp);
  identify(other);
  commit(other, 'second');
  git(['push', '-q', 'origin', 'ilsun/dev'], other);
  return git(['rev-parse', 'HEAD'], other).trim();
}

describe('resolveTargetBase (real git)', () => {
  test('resolves the declared base to the FETCHED remote tip, not the stale local ref', async () => {
    fs.mkdirSync(path.join(repo, 'docs', 'agents'), { recursive: true });
    fs.writeFileSync(
      path.join(repo, 'docs', 'agents', 'repo-ops.toml'),
      'base = "ilsun/dev"\n'
    );
    const local_stale = git(['rev-parse', 'HEAD'], repo).trim();
    const remote_tip = advanceRemote();

    const resolved = await resolveTargetBase({ repo, gitRun });

    expect(remote_tip).not.toBe(local_stale);
    expect(resolved).toMatchObject({
      ok: true,
      base: 'ilsun/dev',
      remote: 'origin',
      remote_ref: 'refs/remotes/origin/ilsun/dev',
      base_oid: remote_tip
    });
  });

  test('a worktree cut from the resolved base_oid lands on the remote tip', async () => {
    fs.mkdirSync(path.join(repo, 'docs', 'agents'), { recursive: true });
    fs.writeFileSync(
      path.join(repo, 'docs', 'agents', 'repo-ops.toml'),
      'base = "ilsun/dev"\n'
    );
    const remote_tip = advanceRemote();
    const resolved = await resolveTargetBase({ repo, gitRun });
    if (!resolved.ok) {
      throw new Error(`resolution failed: ${resolved.step}`);
    }
    const wt = createWorktreeManager({ locks: createLockManager() });

    const added = await wt.add({
      repo,
      bead_id: 'UI-base',
      base: resolved.base_oid
    });

    expect(added.base_oid).toBe(remote_tip);
    // The bare branch name would have cut from the STALE local ref — the very
    // hole §1 pulled steps 4–5 into the resolver to close.
    const stale = git(['rev-parse', 'ilsun/dev'], repo).trim();
    expect(stale).not.toBe(remote_tip);
  });

  test('an undeclared repo still resolves to main', async () => {
    git(['branch', '-m', 'ilsun/dev', 'main'], repo);
    git(['push', '-q', 'origin', 'HEAD:main'], repo);
    git(['branch', '--set-upstream-to=origin/main', 'main'], repo);

    const resolved = await resolveTargetBase({ repo, gitRun });

    expect(resolved).toMatchObject({
      ok: true,
      base: 'main',
      declared: false
    });
  });

  test('a typo in the declaration fails instead of falling back to main', async () => {
    fs.mkdirSync(path.join(repo, 'docs', 'agents'), { recursive: true });
    fs.writeFileSync(
      path.join(repo, 'docs', 'agents', 'repo-ops.toml'),
      'base = "ilsun/dv"\n'
    );

    const resolved = await resolveTargetBase({ repo, gitRun });

    expect(resolved.ok).toBe(false);
    expect(resolved).toMatchObject({ base: 'ilsun/dv' });
  });
});
