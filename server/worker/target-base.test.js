import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  DECLARATION_PATH,
  baseUnresolvedReason,
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
