import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { envFor, install, readPushLog } from './guard-hook.js';

const ATTEMPT = 'UI-8mvc-1';
// A slash-bearing base is the realistic shape (`ilsun/dev`) AND the quoting
// case: the ref name is interpolated into a `/bin/sh` script.
const BASE = 'ilsun/dev';

/** @type {string} */
let tmp;
/** @type {string} */
let origin;
/** @type {string} */
let repo;
/** @type {string} */
let worktree;
/** @type {string} */
let other;
/** @type {string} */
let other_origin;
/** @type {Record<string, string>} */
let hook_env;

/**
 * @param {string[]} args
 * @param {string} cwd
 * @returns {string}
 */
function git(args, cwd) {
  return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: 'pipe' });
}

/**
 * Run a command and report its exit code instead of throwing — every case here
 * asserts on the verdict of a push, not on the absence of an exception.
 *
 * @param {string} command
 * @param {string[]} args
 * @param {string} cwd
 * @returns {{ code: number, stdout: string, stderr: string }}
 */
function run(command, args, cwd) {
  try {
    const stdout = execFileSync(command, args, {
      cwd,
      encoding: 'utf8',
      stdio: 'pipe',
      env: { ...process.env, ...hook_env }
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
 */
function identify(cwd) {
  git(['config', 'user.email', 'test@example.com'], cwd);
  git(['config', 'user.name', 'Test'], cwd);
  git(['config', 'commit.gpgsign', 'false'], cwd);
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
 * The remote's current tip for a branch, or null when the ref is gone.
 *
 * @param {string} bare
 * @param {string} branch
 * @returns {string|null}
 */
function remoteTip(bare, branch) {
  try {
    return git(['rev-parse', `refs/heads/${branch}`], bare).trim();
  } catch {
    return null;
  }
}

/**
 * @param {string} bin
 * @returns {boolean}
 */
function hasBinary(bin) {
  try {
    execFileSync(bin, ['--version'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

const HAS_PYTHON = hasBinary('python3');

beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-guard-hook-'));
  process.env.XDG_STATE_HOME = path.join(tmp, 'state');

  const seed = path.join(tmp, 'seed');
  fs.mkdirSync(seed);
  git(['init', '-q', '-b', 'main'], seed);
  identify(seed);
  commit(seed, 'first');
  // The base is NOT the remote's HEAD, so the deletion case exercises the hook
  // rather than git's own "refusing to delete the current branch".
  git(['branch', BASE], seed);

  origin = path.join(tmp, 'origin.git');
  git(['clone', '-q', '--bare', seed, origin], tmp);
  repo = path.join(tmp, 'repo');
  git(['clone', '-q', origin, repo], tmp);
  identify(repo);
  git(['checkout', '-q', BASE], repo);

  // The bead worktree the worker actually runs sessions in.
  worktree = path.join(tmp, 'wt');
  git(['worktree', 'add', '-q', worktree, '-b', 'UI-8mvc'], repo);
  identify(worktree);

  // A SECOND, unrelated repository — the cross-repo `enclosed` lane. Same
  // process env, so the same hook runs; the judgment must not apply.
  const other_seed = path.join(tmp, 'other-seed');
  fs.mkdirSync(other_seed);
  git(['init', '-q', '-b', 'main'], other_seed);
  identify(other_seed);
  commit(other_seed, 'other-first');
  git(['branch', BASE], other_seed);
  other_origin = path.join(tmp, 'other-origin.git');
  git(['clone', '-q', '--bare', other_seed, other_origin], tmp);
  other = path.join(tmp, 'other');
  git(['clone', '-q', other_origin, other], tmp);
  identify(other);
  git(['checkout', '-q', BASE], other);

  const installed = install({
    workspace: repo,
    attempt_id: ATTEMPT,
    repo,
    target_base: BASE
  });
  expect(installed.ok).toBe(true);
  hook_env = envFor({ workspace: repo, attempt_id: ATTEMPT });
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  try {
    fs.rmSync(tmp, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

describe('guard hook — prevention layer (UI-8mvc §2)', () => {
  test('installs an executable pre-push script', () => {
    const hook = path.join(
      String(process.env.XDG_STATE_HOME),
      'bdui',
      fs.readdirSync(path.join(String(process.env.XDG_STATE_HOME), 'bdui'))[0],
      'guard-hooks',
      ATTEMPT,
      'pre-push'
    );

    const stat = fs.statSync(hook);

    expect(stat.mode & 0o111).toBe(0o111);
  });

  test('refuses a push that lands on the attempt base', () => {
    commit(repo, 'base-landing');
    const before = remoteTip(origin, BASE);

    const result = run('git', ['push', 'origin', `HEAD:${BASE}`], repo);

    expect(result.code).not.toBe(0);
    expect(result.stderr).toContain('bdui guard');
    expect(remoteTip(origin, BASE)).toBe(before);
  });

  test('passes a push to a non-base branch', () => {
    commit(worktree, 'feature');

    const result = run(
      'git',
      ['push', 'origin', 'HEAD:refs/heads/UI-8mvc'],
      worktree
    );

    expect(result.code).toBe(0);
    expect(remoteTip(origin, 'UI-8mvc')).not.toBeNull();
  });

  test('passes a base push in a DIFFERENT repository under the same env', () => {
    commit(other, 'enclosed-change');

    const result = run('git', ['push', 'origin', `HEAD:${BASE}`], other);

    expect(result.code).toBe(0);
    expect(remoteTip(other_origin, BASE)).toBe(
      git(['rev-parse', 'HEAD'], other).trim()
    );
  });

  test('refuses a deletion of the attempt base', () => {
    const before = remoteTip(origin, BASE);

    const result = run('git', ['push', 'origin', '--delete', BASE], repo);

    expect(result.code).not.toBe(0);
    expect(result.stderr).toContain('bdui guard');
    expect(remoteTip(origin, BASE)).toBe(before);
  });

  test('refuses a base push made from the repo MAIN checkout, not the worktree', () => {
    // Undetected gap #3: the text guard's allowlist let a `cd <repo root>` win
    // over the push. `--git-common-dir` is the same value in both places.
    commit(repo, 'main-checkout-landing');
    const before = remoteTip(origin, BASE);

    const result = run('git', ['push', 'origin', `HEAD:${BASE}`], repo);

    expect(result.code).not.toBe(0);
    expect(result.stderr).toContain('bdui guard');
    expect(remoteTip(origin, BASE)).toBe(before);
  });

  test.skipIf(!HAS_PYTHON)(
    'refuses a base push performed by a python3 subprocess',
    () => {
      // Undetected gap #2: `subprocess.run(['git','push',...])` never matches
      // the fallback regex. The hook does not read the command at all.
      commit(worktree, 'python-landing');
      const before = remoteTip(origin, BASE);

      const result = run(
        'python3',
        [
          '-c',
          `import subprocess,sys; sys.exit(subprocess.run(['git','push','origin','HEAD:${BASE}']).returncode)`
        ],
        worktree
      );

      expect(result.code).not.toBe(0);
      expect(result.stderr).toContain('bdui guard');
      expect(remoteTip(origin, BASE)).toBe(before);
    }
  );

  test('refuses a base push performed by a non-INTERPRETERS child (node)', () => {
    // Undetected gap #1: the argv scanner only walks bash/sh/zsh.
    commit(worktree, 'node-landing');
    const before = remoteTip(origin, BASE);

    const result = run(
      'node',
      [
        '-e',
        `const { execFileSync } = require('node:child_process'); execFileSync('git', ['push', 'origin', 'HEAD:${BASE}'], { stdio: 'inherit' });`
      ],
      worktree
    );

    expect(result.code).not.toBe(0);
    expect(result.stderr).toContain('bdui guard');
    expect(remoteTip(origin, BASE)).toBe(before);
  });

  test('records a REFUSED base push in the push log (UI-1xcd §4.1)', () => {
    commit(repo, 'base-landing-recorded');
    const local = git(['rev-parse', 'HEAD'], repo).trim();

    run('git', ['push', 'origin', `HEAD:${BASE}`], repo);

    const read = readPushLog({ workspace: repo, attempt_id: ATTEMPT });
    expect(read.ok).toBe(true);
    expect(read.ok ? read.entries : []).toEqual([
      {
        local_ref: 'HEAD',
        local_oid: local,
        remote_ref: `refs/heads/${BASE}`,
        remote_oid: remoteTip(origin, BASE)
      }
    ]);
  });

  test('records a PASSING push to a non-base branch too', () => {
    commit(worktree, 'feature-recorded');

    run('git', ['push', 'origin', 'HEAD:refs/heads/UI-8mvc'], worktree);

    const read = readPushLog({ workspace: repo, attempt_id: ATTEMPT });
    expect((read.ok ? read.entries : []).map((e) => e.remote_ref)).toEqual([
      'refs/heads/UI-8mvc'
    ]);
  });

  test('records NOTHING for a push in another repository', () => {
    commit(other, 'enclosed-change');

    run('git', ['push', 'origin', `HEAD:${BASE}`], other);

    // Step 1 exits before the loop: a foreign repo is out of scope, and
    // recording it would make the detection layer judge someone else's push.
    expect(readPushLog({ workspace: repo, attempt_id: ATTEMPT })).toEqual({
      ok: true,
      entries: []
    });
  });

  test('records nothing for a --no-verify push, the documented blind spot', () => {
    commit(repo, 'bypass-unrecorded');

    run('git', ['push', '--no-verify', 'origin', `HEAD:${BASE}`], repo);

    expect(readPushLog({ workspace: repo, attempt_id: ATTEMPT })).toEqual({
      ok: true,
      entries: []
    });
  });

  test('passes --no-verify, and the remote base really moves', () => {
    // A DOCUMENTED limitation, pinned as behaviour rather than left as a RED:
    // a client-side hook cannot survive `--no-verify`. The text guard's
    // `hook_bypass` kill is what covers the attempt (§4).
    commit(repo, 'bypass');
    const local = git(['rev-parse', 'HEAD'], repo).trim();

    const result = run(
      'git',
      ['push', '--no-verify', 'origin', `HEAD:${BASE}`],
      repo
    );

    expect(result.code).toBe(0);
    expect(remoteTip(origin, BASE)).toBe(local);
  });
});
