import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test } from 'vitest';
import {
  cleanupForeignResidue,
  foreignCandidateCommonDir,
  foreignTargetFromMetadata,
  judgeForeignPinShape,
  repositorySlugOf,
  resolveForeignRemote,
  sameRepository
} from './foreign-target.js';

const PINS = {
  foreign_repo: 'git@github.com:acme/research-repo-template.git',
  foreign_path: '/tmp/example/research-repo-template',
  foreign_base: 'main'
};
const PR_URL = 'https://github.com/acme/research-repo-template/pull/4';

/**
 * A fake git for one checkout whose remotes map name → URL.
 *
 * @param {Record<string, string>} remotes
 */
function fakeGit(remotes) {
  return async (/** @type {string[]} */ args) => {
    if (args[0] === 'rev-parse') {
      return { code: 0, stdout: '/tmp/example\n', stderr: '' };
    }
    if (args[0] === 'remote' && args.length === 1) {
      return {
        code: 0,
        stdout: `${Object.keys(remotes).join('\n')}\n`,
        stderr: ''
      };
    }
    if (args[0] === 'remote' && args[1] === 'get-url') {
      return { code: 0, stdout: `${remotes[args[2]]}\n`, stderr: '' };
    }
    return { code: 1, stdout: '', stderr: '' };
  };
}

describe('foreign-target — repository normalization', () => {
  test.each([
    ['scp form', 'git@github.com:Acme/Repo.git', 'Acme/Repo'],
    ['https form', 'https://github.com/acme/repo', 'acme/repo'],
    ['https form with .git', 'https://github.com/acme/repo.git', 'acme/repo'],
    ['ssh form', 'ssh://git@github.com/acme/repo.git', 'acme/repo'],
    ['pull request url', 'https://github.com/acme/repo/pull/12', 'acme/repo'],
    [
      'enterprise host',
      'git@ghe.example.com:acme/repo.git',
      'ghe.example.com/acme/repo'
    ]
  ])('derives the slug from the %s', (_label, raw, slug) => {
    const result = repositorySlugOf(raw);

    expect(result).toBe(slug);
  });

  test('treats the scp remote and the PR url of one repository as the same', () => {
    const same = sameRepository(
      'git@github.com:ACME/Research-Repo-Template.git',
      PR_URL
    );

    expect(same).toBe(true);
  });

  test('tells two hosts with the same owner/repo apart', () => {
    const same = sameRepository(
      'git@ghe.example.com:acme/research-repo-template.git',
      PR_URL
    );

    expect(same).toBe(false);
  });

  test('returns null for a url that names no repository', () => {
    const result = repositorySlugOf('not a url');

    expect(result).toBe(null);
  });
});

describe('foreign-target — pin judgment', () => {
  test('reports no foreign landing when every pin is absent', () => {
    const result = judgeForeignPinShape({});

    expect(result).toEqual({ ok: true, foreign: null });
  });

  test('names the first missing pin', () => {
    const result = judgeForeignPinShape({
      foreign_repo: PINS.foreign_repo,
      foreign_path: PINS.foreign_path
    });

    expect(result).toEqual({
      ok: false,
      reason: 'foreign_landing_unpinned:foreign_base'
    });
  });

  test('builds a PR target when pr_url belongs to the pinned repository', () => {
    const result = foreignTargetFromMetadata(PINS, PR_URL);

    expect(result).toEqual({
      state: 'ok',
      target: {
        repo_url: PINS.foreign_repo,
        path: PINS.foreign_path,
        base: 'main',
        slug: 'acme/research-repo-template',
        repo_name: 'research-repo-template',
        pr_number: 4,
        pr_url: PR_URL
      }
    });
  });

  test('reports foreign_pr_repo_mismatch when pr_url names another repository', () => {
    const result = foreignTargetFromMetadata(
      PINS,
      'https://github.com/acme/other/pull/4'
    );

    expect(result).toEqual({
      state: 'invalid',
      reason: 'foreign_pr_repo_mismatch'
    });
  });
});

describe('foreign-target — remote binding', () => {
  test('matches a remote whose URL spells the pinned repository differently', async () => {
    const gitRun = fakeGit({
      origin: 'git@github.com:me/fork.git',
      upstream: 'https://github.com/Acme/research-repo-template'
    });

    const bound = await resolveForeignRemote(
      { repo: PINS.foreign_repo, path: PINS.foreign_path },
      gitRun,
      { match: 'repository' }
    );

    expect(bound).toEqual({ ok: true, remote: 'upstream' });
  });

  test('keeps the verbatim URL rule for the push delivery', async () => {
    const gitRun = fakeGit({
      upstream: 'https://github.com/Acme/research-repo-template'
    });

    const bound = await resolveForeignRemote(
      { repo: PINS.foreign_repo, path: PINS.foreign_path },
      gitRun,
      { match: 'exact' }
    );

    expect(bound).toEqual({
      ok: false,
      reason: 'foreign_checkout_unavailable'
    });
  });
});

describe('foreign-target — candidate ownership', () => {
  test('recognizes a candidate directly under bdui-verify', () => {
    const common = foreignCandidateCommonDir('/x/repo/.git/bdui-verify/op-1');

    expect(common).toBe('/x/repo/.git');
  });

  test('refuses any path outside bdui-verify', () => {
    const common = foreignCandidateCommonDir('/x/repo/.worktrees/UI-1');

    expect(common).toBe(null);
  });
});

/** @type {string[]} */
const temp_dirs = [];

afterEach(() => {
  for (const dir of temp_dirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

/**
 * @param {string} cwd
 * @param {string[]} args
 */
function git(cwd, args) {
  return execFileSync('git', args, {
    cwd,
    encoding: 'utf8',
    env: {
      ...process.env,
      GIT_AUTHOR_NAME: 't',
      GIT_AUTHOR_EMAIL: 't@example.com',
      GIT_COMMITTER_NAME: 't',
      GIT_COMMITTER_EMAIL: 't@example.com'
    }
  }).trim();
}

/** @type {(args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>} */
async function realGit(args, options) {
  try {
    const stdout = execFileSync('git', args, {
      cwd: options.cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe']
    });
    return { code: 0, stdout, stderr: '' };
  } catch (err) {
    const error = /** @type {any} */ (err);
    return {
      code: typeof error.status === 'number' ? error.status : 1,
      stdout: String(error.stdout || ''),
      stderr: String(error.stderr || '')
    };
  }
}

/**
 * A target checkout with a bare remote, a `.worktrees/<bead>` worktree on the
 * bead branch, and that branch pushed.
 */
function makeTargetRepo() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'foreign-target-'));
  temp_dirs.push(root);
  const remote = path.join(root, 'remote.git');
  const repo = path.join(root, 'repo');
  git(root, ['init', '--bare', '-b', 'main', remote]);
  git(root, ['init', '-b', 'main', repo]);
  fs.writeFileSync(path.join(repo, 'a.txt'), 'a\n');
  git(repo, ['add', '.']);
  git(repo, ['commit', '-m', 'base']);
  git(repo, ['remote', 'add', 'upstream', remote]);
  git(repo, ['push', 'upstream', 'main']);
  const wt = path.join(repo, '.worktrees', 'UI-9');
  git(repo, ['worktree', 'add', '-b', 'UI-9', wt, 'main']);
  fs.writeFileSync(path.join(wt, 'b.txt'), 'b\n');
  git(wt, ['add', '.']);
  git(wt, ['commit', '-m', 'work']);
  git(wt, ['push', 'upstream', 'UI-9']);
  const head = git(wt, ['rev-parse', 'HEAD']);
  return { repo, remote, wt, head };
}

describe('foreign-target — owned residue cleanup', () => {
  test('removes the clean worktree, the local branch and the remote head at the pinned head', async () => {
    const t = makeTargetRepo();

    const result = await cleanupForeignResidue({
      target: {
        repo_url: 'git@github.com:acme/repo.git',
        path: t.repo,
        base: 'main',
        slug: 'acme/repo',
        repo_name: 'repo',
        remote: 'upstream'
      },
      bead_id: 'UI-9',
      head_sha: t.head,
      head_ref: 'UI-9',
      gitRun: realGit
    });

    expect(result.kept).toEqual([]);
    expect(fs.existsSync(t.wt)).toBe(false);
    expect(git(t.repo, ['branch', '--list', 'UI-9'])).toBe('');
    expect(git(t.repo, ['ls-remote', '--heads', 'upstream', 'UI-9'])).toBe('');
  });

  test('keeps a dirty worktree and its branch', async () => {
    const t = makeTargetRepo();
    fs.writeFileSync(path.join(t.wt, 'dirty.txt'), 'x\n');

    const result = await cleanupForeignResidue({
      target: {
        repo_url: 'git@github.com:acme/repo.git',
        path: t.repo,
        base: 'main',
        slug: 'acme/repo',
        repo_name: 'repo',
        remote: 'upstream'
      },
      bead_id: 'UI-9',
      head_sha: t.head,
      head_ref: 'UI-9',
      gitRun: realGit
    });

    expect(fs.existsSync(t.wt)).toBe(true);
    expect(result.kept).toEqual(
      expect.arrayContaining([`worktree:${t.wt}`, 'branch:UI-9'])
    );
  });

  test('keeps a remote head branch that moved past the pinned head', async () => {
    const t = makeTargetRepo();
    fs.writeFileSync(path.join(t.wt, 'c.txt'), 'c\n');
    git(t.wt, ['add', '.']);
    git(t.wt, ['commit', '-m', 'more']);
    git(t.wt, ['push', 'upstream', 'UI-9']);

    const result = await cleanupForeignResidue({
      target: {
        repo_url: 'git@github.com:acme/repo.git',
        path: t.repo,
        base: 'main',
        slug: 'acme/repo',
        repo_name: 'repo',
        remote: 'upstream'
      },
      bead_id: 'UI-9',
      head_sha: t.head,
      head_ref: 'UI-9',
      gitRun: realGit
    });

    expect(result.kept).toContain('remote:UI-9');
    expect(
      git(t.repo, ['ls-remote', '--heads', 'upstream', 'UI-9']).length
    ).toBeGreaterThan(0);
  });

  test('keeps a remote head branch pushed between the head check and the delete', async () => {
    const t = makeTargetRepo();
    const other = path.join(path.dirname(t.repo), 'other');
    git(path.dirname(t.repo), ['clone', '-b', 'UI-9', t.remote, other]);
    fs.writeFileSync(path.join(other, 'late.txt'), 'late\n');
    git(other, ['add', '.']);
    git(other, ['commit', '-m', 'late']);
    const late_head = git(other, ['rev-parse', 'HEAD']);
    /** @type {typeof realGit} */
    const racingGit = async (args, options) => {
      const result = await realGit(args, options);
      if (args[0] === 'ls-remote') {
        git(other, ['push', 'origin', 'UI-9']);
      }
      return result;
    };

    const result = await cleanupForeignResidue({
      target: {
        repo_url: 'git@github.com:acme/repo.git',
        path: t.repo,
        base: 'main',
        slug: 'acme/repo',
        repo_name: 'repo',
        remote: 'upstream'
      },
      bead_id: 'UI-9',
      head_sha: t.head,
      head_ref: 'UI-9',
      gitRun: racingGit
    });

    expect(result.kept).toContain('remote:UI-9');
    expect(
      git(t.repo, ['ls-remote', '--heads', 'upstream', 'UI-9']).split(/\s+/)[0]
    ).toBe(late_head);
  });
});
