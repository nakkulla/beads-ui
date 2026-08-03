import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  DECLARATION_PATH,
  UNDECLARED_BASE,
  baseUnresolvedReason,
  readDeclaredBase,
  resolveTargetBase
} from './target-base.js';

/** @type {string} */
let repo;

beforeEach(() => {
  repo = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-target-base-'));
});

afterEach(() => {
  try {
    fs.rmSync(repo, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

/**
 * @param {string} content
 */
function writeDeclaration(content) {
  const file = path.join(repo, DECLARATION_PATH);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

/**
 * A scripted git runner. Every key is the joined argv prefix it answers.
 *
 * @param {Record<string, { code?: number, stdout?: string, stderr?: string }>} script
 */
function gitRunner(script) {
  /** @type {string[][]} */
  const calls = [];
  /**
   * @param {string[]} args
   */
  const run = async (args) => {
    calls.push(args);
    for (const [prefix, result] of Object.entries(script)) {
      if (args.join(' ').startsWith(prefix)) {
        return {
          code: result.code ?? 0,
          stdout: result.stdout ?? '',
          stderr: result.stderr ?? ''
        };
      }
    }
    return { code: 0, stdout: '', stderr: '' };
  };
  return { run, calls };
}

const HEALTHY = {
  'check-ref-format': { code: 0 },
  remote: { code: 0, stdout: 'origin\n' },
  config: { code: 1 },
  fetch: { code: 0 },
  'rev-parse': { code: 0, stdout: 'a'.repeat(40) }
};

describe('resolveTargetBase declaration reading', () => {
  test('returns main when the declaration file is absent', async () => {
    const git = gitRunner(HEALTHY);

    const result = await resolveTargetBase({ repo, gitRun: git.run });

    expect(result).toMatchObject({ ok: true, base: 'main', declared: false });
  });

  test('returns main when the file exists without a base key', async () => {
    writeDeclaration('[verify]\ncmd = ["true"]\n');
    const git = gitRunner(HEALTHY);

    const result = await resolveTargetBase({ repo, gitRun: git.run });

    expect(result).toMatchObject({ ok: true, base: 'main', declared: false });
  });

  test('reads a declared base and marks it declared', async () => {
    writeDeclaration('base = "ilsun/dev"\n');
    const git = gitRunner(HEALTHY);

    const result = await resolveTargetBase({ repo, gitRun: git.run });

    expect(result).toMatchObject({
      ok: true,
      base: 'ilsun/dev',
      declared: true,
      remote: 'origin',
      remote_ref: 'refs/remotes/origin/ilsun/dev',
      base_oid: 'a'.repeat(40),
      local_only: false
    });
  });

  test('fails without falling back when the toml cannot be parsed', async () => {
    writeDeclaration('base = "unterminated\n');
    const git = gitRunner(HEALTHY);

    const result = await resolveTargetBase({ repo, gitRun: git.run });

    expect(result).toMatchObject({ ok: false, step: 'declaration' });
  });

  test('fails when the base key is present but empty', async () => {
    writeDeclaration('base = ""\n');
    const git = gitRunner(HEALTHY);

    const result = await resolveTargetBase({ repo, gitRun: git.run });

    expect(result).toMatchObject({ ok: false, step: 'declaration' });
  });
});

describe('resolveTargetBase five-step validation', () => {
  test('fails on a malformed branch name', async () => {
    writeDeclaration('base = "ilsun..dev"\n');
    const git = gitRunner({ ...HEALTHY, 'check-ref-format': { code: 1 } });

    const result = await resolveTargetBase({ repo, gitRun: git.run });

    expect(result).toMatchObject({
      ok: false,
      step: 'format',
      base: 'ilsun..dev'
    });
  });

  test('rejects a value that is a remote-tracking ref', async () => {
    writeDeclaration('base = "origin/main"\n');
    const git = gitRunner(HEALTHY);

    const result = await resolveTargetBase({ repo, gitRun: git.run });

    expect(result).toMatchObject({
      ok: false,
      step: 'remote_prefix',
      detail: 'remote:origin'
    });
  });

  test('keeps a branch that merely starts with a remote name', async () => {
    writeDeclaration('base = "originally-mine"\n');
    const git = gitRunner(HEALTHY);

    const result = await resolveTargetBase({ repo, gitRun: git.run });

    expect(result).toMatchObject({ ok: true, base: 'originally-mine' });
  });

  test('fails when two remotes exist and the branch has no upstream', async () => {
    writeDeclaration('base = "ilsun/dev"\n');
    const git = gitRunner({
      ...HEALTHY,
      remote: { code: 0, stdout: 'origin\nupstream\n' },
      config: { code: 1 }
    });

    const result = await resolveTargetBase({ repo, gitRun: git.run });

    expect(result).toMatchObject({ ok: false, step: 'remote' });
  });

  test('uses the branch upstream when several remotes exist', async () => {
    writeDeclaration('base = "ilsun/dev"\n');
    const git = gitRunner({
      ...HEALTHY,
      remote: { code: 0, stdout: 'origin\nupstream\n' },
      config: { code: 0, stdout: 'upstream\n' }
    });

    const result = await resolveTargetBase({ repo, gitRun: git.run });

    expect(result).toMatchObject({
      ok: true,
      remote: 'upstream',
      remote_ref: 'refs/remotes/upstream/ilsun/dev'
    });
  });

  test('fails when the fetch fails', async () => {
    writeDeclaration('base = "ilsun/dev"\n');
    const git = gitRunner({ ...HEALTHY, fetch: { code: 128 } });

    const result = await resolveTargetBase({ repo, gitRun: git.run });

    expect(result).toMatchObject({ ok: false, step: 'fetch' });
  });

  test('fails when the remote branch does not exist', async () => {
    writeDeclaration('base = "ilsun/dv"\n');
    const git = gitRunner({ ...HEALTHY, 'rev-parse': { code: 1, stdout: '' } });

    const result = await resolveTargetBase({ repo, gitRun: git.run });

    expect(result).toMatchObject({
      ok: false,
      step: 'ref',
      detail: 'refs/remotes/origin/ilsun/dv'
    });
  });

  test('fetches BEFORE reading the ref so a stale local ref cannot pass', async () => {
    writeDeclaration('base = "ilsun/dev"\n');
    const git = gitRunner(HEALTHY);

    await resolveTargetBase({ repo, gitRun: git.run });

    const order = git.calls.map((args) => args[0]);
    expect(order.indexOf('fetch')).toBeLessThan(order.lastIndexOf('rev-parse'));
  });

  test('reads the tip from the remote-tracking ref, not the local branch', async () => {
    writeDeclaration('base = "ilsun/dev"\n');
    const git = gitRunner(HEALTHY);

    await resolveTargetBase({ repo, gitRun: git.run });

    const rev_parse = git.calls.filter((args) => args[0] === 'rev-parse');
    expect(rev_parse.at(-1)).toEqual([
      'rev-parse',
      '--verify',
      '--quiet',
      'refs/remotes/origin/ilsun/dev^{commit}'
    ]);
  });

  test('records the local-only exception when the repo has no remote', async () => {
    writeDeclaration('base = "ilsun/dev"\n');
    const git = gitRunner({
      ...HEALTHY,
      remote: { code: 0, stdout: '' },
      'rev-parse': { code: 0, stdout: 'b'.repeat(40) }
    });

    const result = await resolveTargetBase({ repo, gitRun: git.run });

    expect(result).toMatchObject({
      ok: true,
      local_only: true,
      remote: null,
      remote_ref: null,
      base_oid: 'b'.repeat(40)
    });
  });

  test('fails when a local-only repo lacks the declared branch', async () => {
    writeDeclaration('base = "ilsun/dev"\n');
    const git = gitRunner({
      ...HEALTHY,
      remote: { code: 0, stdout: '' },
      'rev-parse': { code: 1, stdout: '' }
    });

    const result = await resolveTargetBase({ repo, gitRun: git.run });

    expect(result).toMatchObject({ ok: false, step: 'ref' });
  });

  test('treats a thrown git runner as git_error rather than a fallback', async () => {
    writeDeclaration('base = "ilsun/dev"\n');

    const result = await resolveTargetBase({
      repo,
      gitRun: async () => {
        throw new Error('spawn failed');
      }
    });

    expect(result).toMatchObject({ ok: false, step: 'git_error' });
  });
});

describe('baseUnresolvedReason', () => {
  test('renders the failing step as a prefix:detail string', () => {
    const reason = baseUnresolvedReason({
      ok: false,
      step: 'remote_prefix',
      base: 'origin/main',
      detail: 'remote:origin'
    });

    expect(reason).toBe('base_unresolved:remote_prefix');
  });
});

describe('resolveTargetBase gate findings (implementation review 2026-07-30)', () => {
  test('fails when the configured upstream no longer exists', async () => {
    writeDeclaration('base = "ilsun/dev"\n');
    const git = gitRunner({
      ...HEALTHY,
      remote: { code: 0, stdout: 'origin\n' },
      config: { code: 0, stdout: 'gone\n' }
    });

    const result = await resolveTargetBase({ repo, gitRun: git.run });

    expect(result).toMatchObject({
      ok: false,
      step: 'remote',
      detail: 'upstream_missing:gone'
    });
  });

  test('fails on a git config error rather than substituting a remote', async () => {
    writeDeclaration('base = "ilsun/dev"\n');
    const git = gitRunner({
      ...HEALTHY,
      remote: { code: 0, stdout: 'origin\n' },
      config: { code: 128 }
    });

    const result = await resolveTargetBase({ repo, gitRun: git.run });

    expect(result).toMatchObject({ ok: false, step: 'git_error' });
  });

  test('still treats exit 1 as "no upstream configured"', async () => {
    writeDeclaration('base = "ilsun/dev"\n');
    const git = gitRunner(HEALTHY);

    const result = await resolveTargetBase({ repo, gitRun: git.run });

    expect(result).toMatchObject({ ok: true, remote: 'origin' });
  });

  test('refuses a base carrying shell metacharacters', async () => {
    writeDeclaration('base = "main;rm -rf /"\n');
    const git = gitRunner(HEALTHY);

    const result = await resolveTargetBase({ repo, gitRun: git.run });

    expect(result).toMatchObject({ ok: false, step: 'format' });
    expect(result).toMatchObject({ detail: 'shell_unsafe' });
  });

  test('refuses a base carrying a command substitution', async () => {
    writeDeclaration('base = "main$(id)"\n');
    const git = gitRunner(HEALTHY);

    const result = await resolveTargetBase({ repo, gitRun: git.run });

    expect(result).toMatchObject({ ok: false, detail: 'shell_unsafe' });
  });

  test('keeps ordinary branch names with slashes, dots and dashes', async () => {
    writeDeclaration('base = "ilsun/dev-2.0_x"\n');
    const git = gitRunner(HEALTHY);

    const result = await resolveTargetBase({ repo, gitRun: git.run });

    expect(result).toMatchObject({ ok: true, base: 'ilsun/dev-2.0_x' });
  });
});

describe('readDeclaredBase (display-only projection, UI-j6wa §3)', () => {
  test('returns the declared base when the repo declares one', () => {
    writeDeclaration('base = "ilsun/dev"\n');

    expect(readDeclaredBase(repo)).toBe('ilsun/dev');
  });

  test('returns main when the declaration file is absent', () => {
    expect(readDeclaredBase(repo)).toBe(UNDECLARED_BASE);
  });

  test('returns main when the file declares no base key', () => {
    writeDeclaration('[worker]\nslots = 2\n');

    expect(readDeclaredBase(repo)).toBe(UNDECLARED_BASE);
  });

  test('returns null when the declaration fails to parse', () => {
    writeDeclaration('base = "unterminated\n');

    expect(readDeclaredBase(repo)).toBeNull();
  });

  test('returns null when the base value is empty', () => {
    writeDeclaration('base = ""\n');

    expect(readDeclaredBase(repo)).toBeNull();
  });

  test('returns null when the base value is not a string', () => {
    writeDeclaration('base = 3\n');

    expect(readDeclaredBase(repo)).toBeNull();
  });

  test('returns null when the base value carries shell metacharacters', () => {
    writeDeclaration('base = "main;rm -rf /"\n');

    expect(readDeclaredBase(repo)).toBeNull();
  });

  test('returns null for a base carrying a double dot', () => {
    writeDeclaration('base = "foo..bar"\n');

    expect(readDeclaredBase(repo)).toBeNull();
  });

  test('returns null for a base starting with a dash', () => {
    writeDeclaration('base = "-oops"\n');

    expect(readDeclaredBase(repo)).toBeNull();
  });

  test('returns null for a base with an empty path component', () => {
    writeDeclaration('base = "foo//bar"\n');

    expect(readDeclaredBase(repo)).toBeNull();
  });

  test('returns null for a base component starting with a dot', () => {
    writeDeclaration('base = "foo/.bar"\n');

    expect(readDeclaredBase(repo)).toBeNull();
  });

  test('returns null for a base component ending in .lock', () => {
    writeDeclaration('base = "foo/bar.lock"\n');

    expect(readDeclaredBase(repo)).toBeNull();
  });

  test('returns null for a base ending in a dot', () => {
    writeDeclaration('base = "foo."\n');

    expect(readDeclaredBase(repo)).toBeNull();
  });

  test('keeps an ordinary branch name with slashes, dots and dashes', () => {
    writeDeclaration('base = "ilsun/dev-2.0_x"\n');

    expect(readDeclaredBase(repo)).toBe('ilsun/dev-2.0_x');
  });
});
