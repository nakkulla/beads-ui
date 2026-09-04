import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { envFor, install, readPushLog } from './guard-hook.js';

// This file drives REAL child processes (git, a shell, node), so its wall time
// is process startup, not product work. Measured against the whole suite running
// in parallel, tests here reach ~4s — against a 5s default that is a coin flip,
// and the repo-ops verify gate is where the coin lands wrong. The assertions are
// unchanged; only the budget is sized for the load the suite actually creates.
vi.setConfig({ testTimeout: 30_000, hookTimeout: 30_000 });

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
 * `spawnSync`, not `execFileSync`: the exemption's PASSING push writes a line to
 * stderr (UI-7ufi §2.2), and the throw-based form only ever hands stderr back on
 * failure. A spawn that never started reads as exit 1, the same verdict a
 * refusal carries.
 *
 * @param {string} command
 * @param {string[]} args
 * @param {string} cwd
 * @returns {{ code: number, stdout: string, stderr: string }}
 */
function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    env: { ...process.env, ...hook_env }
  });
  return {
    code: typeof result.status === 'number' ? result.status : 1,
    stdout: String(result.stdout || ''),
    stderr: String(result.stderr || '')
  };
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

describe('guard hook — record mode (worker-failure-tiers §5.1)', () => {
  /**
   * Re-install this attempt's hook in record mode. Same attempt id, so the
   * `core.hooksPath` env the suite already exported keeps pointing at it and
   * the push log is truncated back to empty.
   */
  function installRecordMode() {
    const installed = install({
      workspace: repo,
      attempt_id: ATTEMPT,
      repo,
      target_base: BASE,
      mode: 'record'
    });
    expect(installed.ok).toBe(true);
  }

  /**
   * @returns {Record<string, unknown>[]}
   */
  function entries() {
    const read = readPushLog({ workspace: repo, attempt_id: ATTEMPT });
    return read.ok ? read.entries : [];
  }

  test('lets a base push through and records the ref and SHA it landed', () => {
    installRecordMode();
    commit(repo, 'record-mode-landing');
    const local = git(['rev-parse', 'HEAD'], repo).trim();
    const before = remoteTip(origin, BASE);

    const result = run('git', ['push', 'origin', `HEAD:${BASE}`], repo);

    expect(result.code).toBe(0);
    expect(remoteTip(origin, BASE)).toBe(local);
    expect(entries()).toEqual([
      {
        local_ref: 'HEAD',
        local_oid: local,
        remote_ref: `refs/heads/${BASE}`,
        remote_oid: before
      }
    ]);
  });

  test('announces the recorded base push on stderr', () => {
    installRecordMode();
    commit(repo, 'record-mode-note');

    const result = run('git', ['push', 'origin', `HEAD:${BASE}`], repo);

    expect(result.stderr).toContain('bdui guard: recording base push to');
    expect(result.stderr).toContain('record mode');
  });

  test('records a non-base push exactly as the guarded mode does', () => {
    installRecordMode();
    commit(worktree, 'record-mode-feature');

    const result = run(
      'git',
      ['push', 'origin', 'HEAD:refs/heads/UI-8mvc'],
      worktree
    );

    expect(result.code).toBe(0);
    expect(entries()).toEqual([
      {
        local_ref: 'HEAD',
        local_oid: git(['rev-parse', 'HEAD'], worktree).trim(),
        remote_ref: 'refs/heads/UI-8mvc',
        remote_oid: '0'.repeat(40)
      }
    ]);
  });

  test('records nothing for a base push in another repository', () => {
    installRecordMode();
    commit(other, 'record-mode-enclosed');

    const result = run('git', ['push', 'origin', `HEAD:${BASE}`], other);

    expect(result.code).toBe(0);
    expect(entries()).toEqual([]);
  });
});

describe('guard hook — deny mode (preset-compare §4.5-2)', () => {
  /**
   * Re-install this attempt's hook in deny mode. Same attempt id, so the
   * `core.hooksPath` env the suite already exported keeps pointing at it and
   * the push log is truncated back to empty.
   */
  function installDenyMode() {
    const installed = install({
      workspace: repo,
      attempt_id: ATTEMPT,
      repo,
      target_base: BASE,
      mode: 'deny'
    });
    expect(installed.ok).toBe(true);
  }

  /**
   * @returns {Record<string, unknown>[]}
   */
  function entries() {
    const read = readPushLog({ workspace: repo, attempt_id: ATTEMPT });
    return read.ok ? read.entries : [];
  }

  test('refuses a base push and leaves the remote tip where it was', () => {
    installDenyMode();
    commit(repo, 'deny-mode-landing');
    const before = remoteTip(origin, BASE);

    const result = run('git', ['push', 'origin', `HEAD:${BASE}`], repo);

    expect(result.code).not.toBe(0);
    expect(remoteTip(origin, BASE)).toBe(before);
  });

  test('refuses a non-base branch push too', () => {
    installDenyMode();
    commit(worktree, 'deny-mode-feature');

    const result = run(
      'git',
      ['push', 'origin', 'HEAD:refs/heads/UI-bench-cell'],
      worktree
    );

    expect(result.code).not.toBe(0);
    expect(result.stderr).toContain('must not push any ref');
  });

  test('records the refused base push the invariant reads', () => {
    installDenyMode();
    commit(repo, 'deny-mode-record');
    const local = git(['rev-parse', 'HEAD'], repo).trim();
    const before = remoteTip(origin, BASE);

    run('git', ['push', 'origin', `HEAD:${BASE}`], repo);

    expect(entries()).toEqual([
      {
        local_ref: 'HEAD',
        local_oid: local,
        remote_ref: `refs/heads/${BASE}`,
        remote_oid: before
      }
    ]);
  });

  test('records nothing for a push in another repository', () => {
    installDenyMode();
    commit(other, 'deny-mode-enclosed');

    const result = run('git', ['push', 'origin', `HEAD:${BASE}`], other);

    expect(result.code).toBe(0);
    expect(entries()).toEqual([]);
  });
});

describe('guard hook — docs-only base push exemption (UI-7ufi §2)', () => {
  /** Distinguishes the throwaway candidate worktrees within one test. */
  let candidate_seq = 0;

  /**
   * @param {string} cwd
   * @param {string} rel
   * @param {string} body
   */
  function writeAt(cwd, rel, body) {
    const full = path.join(cwd, rel);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, body);
  }

  /**
   * Stage everything (deletions included) and commit.
   *
   * @param {string} cwd
   * @param {string} message
   */
  function commitAll(cwd, message) {
    git(['add', '-A'], cwd);
    git(['commit', '-q', '-m', message], cwd);
  }

  /**
   * Build a candidate the way `land-reviewed-artifact.py` does: a DETACHED
   * worktree off the base tip, committed there and never merged into a branch.
   *
   * @param {(cwd: string) => void} build
   * @param {string} [start] - What the candidate is built on; the remote base
   * tip unless a case needs a stale one.
   */
  function candidateSha(build, start = `origin/${BASE}`) {
    candidate_seq += 1;
    const cand = path.join(tmp, `candidate-${candidate_seq}`);
    git(['worktree', 'add', '-q', '--detach', cand, start], repo);
    identify(cand);
    build(cand);
    return git(['rev-parse', 'HEAD'], cand).trim();
  }

  /**
   * The land script's push, from the repo ROOT and under the guard env:
   * `git push origin <sha>:refs/heads/<base>`.
   *
   * @param {string} sha
   * @param {{ force?: boolean }} [options]
   */
  function pushCandidate(sha, options = {}) {
    const args = ['push'];
    if (options.force === true) {
      args.push('--force');
    }
    args.push('origin', `${sha}:refs/heads/${BASE}`);
    return run('git', args, repo);
  }

  /**
   * Move the remote base as the FIXTURE, not as the subject: pushed without the
   * guard env, so it neither runs the hook nor writes to the push log.
   *
   * @param {(cwd: string) => void} build
   * @returns {string} The sha now on the remote base.
   */
  function seedBase(build) {
    const sha = candidateSha(build);
    git(['push', 'origin', `${sha}:refs/heads/${BASE}`], repo);
    return sha;
  }

  /**
   * @returns {Record<string, unknown>[]}
   */
  function entries() {
    const read = readPushLog({ workspace: repo, attempt_id: ATTEMPT });
    return read.ok ? read.entries : [];
  }

  test('passes a single-commit spec publication and records the exemption', () => {
    const sha = candidateSha((cwd) => {
      writeAt(cwd, 'docs/superpowers/specs/x.md', '# spec\n');
      commitAll(cwd, 'docs: publish spec');
    });

    const result = pushCandidate(sha);

    expect(result.code).toBe(0);
    expect(remoteTip(origin, BASE)).toBe(sha);
    expect(result.stderr).toContain(
      `bdui guard: passing docs-only push to refs/heads/${BASE}`
    );
    expect(result.stderr).toContain(`(attempt ${ATTEMPT}, 1 path(s))`);
    expect(entries()).toEqual([
      {
        local_ref: sha,
        local_oid: sha,
        remote_ref: `refs/heads/${BASE}`,
        remote_oid: expect.any(String),
        exempt: 'docs_only'
      }
    ]);
  });

  test('passes a modification of a doc already on the base', () => {
    seedBase((cwd) => {
      writeAt(cwd, 'docs/superpowers/specs/x.md', '# rev1\n');
      commitAll(cwd, 'docs: rev1');
    });
    const sha = candidateSha((cwd) => {
      writeAt(cwd, 'docs/superpowers/specs/x.md', '# rev2\n');
      commitAll(cwd, 'docs: rev2');
    });

    const result = pushCandidate(sha);

    expect(result.code).toBe(0);
    expect(remoteTip(origin, BASE)).toBe(sha);
  });

  test('passes a multi-commit fast-forward carrying a non-md asset', () => {
    // Neither the commit count nor the file type is part of the predicate: the
    // exemption is cut on the RESULT TREE.
    const sha = candidateSha((cwd) => {
      writeAt(cwd, 'docs/a.md', '# a\n');
      commitAll(cwd, 'docs: a');
      writeAt(cwd, 'docs/superpowers/specs/assets/b.png', 'PNG\n');
      commitAll(cwd, 'docs: asset');
    });

    const result = pushCandidate(sha);

    expect(result.code).toBe(0);
    expect(remoteTip(origin, BASE)).toBe(sha);
    expect(result.stderr).toContain(`(attempt ${ATTEMPT}, 2 path(s))`);
  });

  test('passes a deletion of a doc', () => {
    seedBase((cwd) => {
      writeAt(cwd, 'docs/superpowers/specs/x.md', '# spec\n');
      commitAll(cwd, 'docs: publish');
    });
    const sha = candidateSha((cwd) => {
      fs.rmSync(path.join(cwd, 'docs/superpowers/specs/x.md'));
      commitAll(cwd, 'docs: retire');
    });

    const result = pushCandidate(sha);

    expect(result.code).toBe(0);
    expect(remoteTip(origin, BASE)).toBe(sha);
  });

  test('refuses a commit mixing a doc with a source file', () => {
    const before = remoteTip(origin, BASE);
    const sha = candidateSha((cwd) => {
      writeAt(cwd, 'docs/superpowers/specs/x.md', '# spec\n');
      writeAt(cwd, 'server/x.js', '// code\n');
      commitAll(cwd, 'docs and code');
    });

    const result = pushCandidate(sha);

    expect(result.code).not.toBe(0);
    expect(result.stderr).toContain(
      'bdui guard: docs-only exemption not met: paths (server/x.js)'
    );
    expect(remoteTip(origin, BASE)).toBe(before);
  });

  test('refuses a source-only delta', () => {
    const before = remoteTip(origin, BASE);
    const sha = candidateSha((cwd) => {
      writeAt(cwd, 'server/x.js', '// code\n');
      commitAll(cwd, 'code only');
    });

    const result = pushCandidate(sha);

    expect(result.code).not.toBe(0);
    expect(result.stderr).toContain(
      'bdui guard: docs-only exemption not met: paths (server/x.js)'
    );
    expect(remoteTip(origin, BASE)).toBe(before);
  });

  test('refuses a root README.md — the boundary is a directory, not an extension', () => {
    const before = remoteTip(origin, BASE);
    const sha = candidateSha((cwd) => {
      writeAt(cwd, 'README.md', '# readme\n');
      commitAll(cwd, 'policy doc');
    });

    const result = pushCandidate(sha);

    expect(result.code).not.toBe(0);
    expect(result.stderr).toContain(
      'bdui guard: docs-only exemption not met: paths (README.md)'
    );
    expect(remoteTip(origin, BASE)).toBe(before);
  });

  test('refuses a rename OUT of a source directory into docs/', () => {
    // The `--no-renames` counterexample: with rename detection on, git prints
    // only `docs/x.js` and the deletion of a source file reads as docs-only.
    seedBase((cwd) => {
      writeAt(cwd, 'server/x.js', '// code\n');
      commitAll(cwd, 'seed code');
    });
    const before = remoteTip(origin, BASE);
    const sha = candidateSha((cwd) => {
      // `git mv` will not create the destination directory itself.
      fs.mkdirSync(path.join(cwd, 'docs'), { recursive: true });
      git(['mv', 'server/x.js', 'docs/x.js'], cwd);
      commitAll(cwd, 'move code under docs');
    });

    const result = pushCandidate(sha);

    expect(result.code).not.toBe(0);
    expect(result.stderr).toContain(
      'bdui guard: docs-only exemption not met: paths (server/x.js)'
    );
    expect(remoteTip(origin, BASE)).toBe(before);
  });

  test('refuses a code commit disguised by a local replace ref', () => {
    // The `--no-replace-objects` counterexample: `refs/replace/*` rewrites what
    // a local diff READS while the push TRANSMITS the original object.
    const before = String(remoteTip(origin, BASE));
    const docs_commit = candidateSha((cwd) => {
      writeAt(cwd, 'docs/replaced.md', '# decoy\n');
      commitAll(cwd, 'docs decoy');
    });
    const code_commit = candidateSha((cwd) => {
      writeAt(cwd, 'server/replaced.js', '// real payload\n');
      commitAll(cwd, 'code payload');
    });
    git(['replace', code_commit, docs_commit], repo);
    // The disguise really works on a replace-aware read: that is what makes
    // this a counterexample rather than a restatement of the source-only case.
    expect(
      git(
        ['diff', '--no-renames', '--name-only', before, code_commit],
        repo
      ).trim()
    ).toBe('docs/replaced.md');

    const result = pushCandidate(code_commit);

    expect(result.code).not.toBe(0);
    expect(result.stderr).toContain(
      'bdui guard: docs-only exemption not met: paths'
    );
    expect(remoteTip(origin, BASE)).toBe(before);
    expect(
      git(['ls-tree', '-r', '--name-only', `refs/heads/${BASE}`], origin)
    ).not.toContain('server/replaced.js');
  });

  test('refuses a gitlink hidden by diff.ignoreSubmodules', () => {
    // The `--ignore-submodules=none` counterexample, and the one that is REPO
    // CONFIG rather than a ref: `diff.ignoreSubmodules=all` is writable by the
    // very session being judged, and under it a gitlink outside `docs/` simply
    // does not appear in `--name-only`. A bare 160000 index entry is enough —
    // the elision is decided by the entry's mode, not by a real submodule.
    git(['config', 'diff.ignoreSubmodules', 'all'], repo);
    const before = String(remoteTip(origin, BASE));
    const sha = candidateSha((cwd) => {
      writeAt(cwd, 'docs/superpowers/specs/x.md', '# spec\n');
      git(['add', '-A'], cwd);
      git(
        ['update-index', '--add', '--cacheinfo', `160000,${before},server/x`],
        cwd
      );
      git(['commit', '-q', '-m', 'docs plus a gitlink'], cwd);
    });
    // The disguise really works on a config-aware read: that is what makes this
    // a counterexample rather than a restatement of the source-only case.
    expect(
      git(['diff', '--no-renames', '--name-only', before, sha], repo).trim()
    ).toBe('docs/superpowers/specs/x.md');

    const result = pushCandidate(sha);

    expect(result.code).not.toBe(0);
    expect(result.stderr).toContain(
      'bdui guard: docs-only exemption not met: paths (server/x)'
    );
    expect(remoteTip(origin, BASE)).toBe(before);
  });

  test('refuses a base deletion with the deletion reason', () => {
    const before = remoteTip(origin, BASE);

    const result = run('git', ['push', 'origin', '--delete', BASE], repo);

    expect(result.code).not.toBe(0);
    expect(result.stderr).toContain(
      'bdui guard: docs-only exemption not met: deletion'
    );
    expect(remoteTip(origin, BASE)).toBe(before);
  });

  test('refuses creating the base ref anew with the new_ref reason', () => {
    // Fixture, not subject: the base is removed WITHOUT the guard env.
    git(['push', 'origin', '--delete', BASE], repo);
    const sha = candidateSha((cwd) => {
      writeAt(cwd, 'docs/superpowers/specs/x.md', '# spec\n');
      commitAll(cwd, 'docs: publish');
    }, BASE);

    const result = pushCandidate(sha);

    expect(result.code).not.toBe(0);
    expect(result.stderr).toContain(
      'bdui guard: docs-only exemption not met: new_ref'
    );
    expect(remoteTip(origin, BASE)).toBeNull();
  });

  test('never sees a non-fast-forward push: git rejects it first', () => {
    const stale_start = String(remoteTip(origin, BASE));
    const stale = candidateSha((cwd) => {
      writeAt(cwd, 'docs/stale.md', '# stale\n');
      commitAll(cwd, 'docs: stale');
    }, stale_start);
    const advanced = seedBase((cwd) => {
      writeAt(cwd, 'docs/ahead.md', '# ahead\n');
      commitAll(cwd, 'docs: ahead');
    });

    const result = pushCandidate(stale);

    expect(result.code).not.toBe(0);
    expect(result.stderr).not.toContain('bdui guard');
    expect(remoteTip(origin, BASE)).toBe(advanced);
    // The ref never reached the hook, so there is nothing to record.
    expect(entries()).toEqual([]);
  });

  test('refuses a forced non-fast-forward push with the not_fast_forward reason', () => {
    const stale_start = String(remoteTip(origin, BASE));
    const stale = candidateSha((cwd) => {
      writeAt(cwd, 'docs/stale.md', '# stale\n');
      commitAll(cwd, 'docs: stale');
    }, stale_start);
    const advanced = seedBase((cwd) => {
      writeAt(cwd, 'docs/ahead.md', '# ahead\n');
      commitAll(cwd, 'docs: ahead');
    });

    const result = pushCandidate(stale, { force: true });

    expect(result.code).not.toBe(0);
    expect(result.stderr).toContain(
      'bdui guard: docs-only exemption not met: not_fast_forward'
    );
    expect(remoteTip(origin, BASE)).toBe(advanced);
  });

  test('records a passing non-base push without an exemption key', () => {
    commit(worktree, 'feature-unexempt');

    const result = run(
      'git',
      ['push', 'origin', 'HEAD:refs/heads/UI-8mvc'],
      worktree
    );

    expect(result.code).toBe(0);
    expect(entries()).toEqual([
      {
        local_ref: 'HEAD',
        local_oid: git(['rev-parse', 'HEAD'], worktree).trim(),
        remote_ref: 'refs/heads/UI-8mvc',
        remote_oid: '0'.repeat(40)
      }
    ]);
  });

  test('leaves a docs base push in ANOTHER repository alone and unrecorded', () => {
    const doc = path.join(other, 'docs/other.md');
    fs.mkdirSync(path.dirname(doc), { recursive: true });
    fs.writeFileSync(doc, '# other\n');
    git(['add', '-A'], other);
    git(['commit', '-q', '-m', 'docs: other repo'], other);

    const result = run('git', ['push', 'origin', `HEAD:${BASE}`], other);

    expect(result.code).toBe(0);
    expect(remoteTip(other_origin, BASE)).toBe(
      git(['rev-parse', 'HEAD'], other).trim()
    );
    expect(entries()).toEqual([]);
  });
});
