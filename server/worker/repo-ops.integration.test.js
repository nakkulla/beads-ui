/**
 * The two invariants that only a REAL git repository can demonstrate (UI-kfl4
 * §4.1): the declaration comes from the pinned commit's blob, so a PR cannot
 * define its own verification command, and an uncommitted working-tree edit —
 * the `fetch_only:dirty` state `syncBase` legitimately succeeds in — cannot
 * change what the worker runs.
 */
import { execFile, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { resetRepoOpsCache, resolveVerifyAt } from './repo-ops.js';

const execFileAsync = promisify(execFile);

/** @type {string} */
let repo;
/** @type {string} */
let base_sha;
/** @type {string} */
let pr_sha;

/**
 * @param {string[]} args
 */
function git(args) {
  execFileSync('git', args, { cwd: repo, stdio: 'pipe' });
}

/**
 * @param {string} cmd_argv - TOML argv literal for the declaration's `cmd`.
 */
function writeDeclaration(cmd_argv) {
  const file = path.join(repo, 'docs', 'agents', 'repo-ops.toml');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `[verify]\ncmd = ${cmd_argv}\n`);
}

/**
 * @returns {string}
 */
function head() {
  return execFileSync('git', ['rev-parse', 'HEAD'], {
    cwd: repo,
    encoding: 'utf8'
  }).trim();
}

/**
 * The real git adapter, shaped like the worker's own `gitRun`.
 *
 * @param {string[]} args
 * @param {{ cwd?: string }} options
 */
async function gitRun(args, options) {
  try {
    const { stdout, stderr } = await execFileAsync('git', args, {
      cwd: options.cwd
    });
    return { code: 0, stdout, stderr };
  } catch (err) {
    const e = /** @type {any} */ (err);
    return {
      code: e.code ?? 1,
      stdout: e.stdout || '',
      stderr: e.stderr || ''
    };
  }
}

beforeEach(() => {
  resetRepoOpsCache();
  repo = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-repo-ops-'));
  git(['init', '-q', '-b', 'main']);
  git(['config', 'user.email', 'test@example.com']);
  git(['config', 'user.name', 'Test']);
  writeDeclaration('["base-verify"]');
  git(['add', '.']);
  git(['commit', '-q', '-m', 'base declaration']);
  base_sha = head();
  git(['checkout', '-q', '-b', 'pr-branch']);
  writeDeclaration('["true"]');
  git(['add', '.']);
  git(['commit', '-q', '-m', 'PR redefines its own verification']);
  pr_sha = head();
  git(['checkout', '-q', 'main']);
});

afterEach(() => {
  fs.rmSync(repo, { recursive: true, force: true });
});

describe('worker/repo-ops — self-attestation is structurally impossible', () => {
  test('resolves the BASE declaration for a PR that rewrote its own', async () => {
    const r = await resolveVerifyAt({
      gitRun,
      repo,
      sha: base_sha,
      config_map: null
    });

    expect(r).toMatchObject({
      state: 'resolved',
      source: 'declaration',
      value: { cmd: ['base-verify'] }
    });
  });

  test('reads the PR pin only when the PR sha is what was pinned', async () => {
    const r = await resolveVerifyAt({
      gitRun,
      repo,
      sha: pr_sha,
      config_map: null
    });

    // The pin is the whole mechanism: nothing about the PR branch is special,
    // so the post-merge context (which pins the SYNCED base) is what makes the
    // declaration reviewed before it runs.
    expect(r).toMatchObject({ value: { cmd: ['true'] } });
  });
});

describe('worker/repo-ops — the working tree never decides', () => {
  test('ignores an uncommitted declaration edit (the fetch_only:dirty state)', async () => {
    writeDeclaration('["dirty-verify"]');

    const r = await resolveVerifyAt({
      gitRun,
      repo,
      sha: base_sha,
      config_map: null
    });

    expect(r).toMatchObject({ value: { cmd: ['base-verify'] } });
  });

  test('ignores a checkout parked on another branch (fetch_only:not_on_base)', async () => {
    git(['checkout', '-q', 'pr-branch']);

    const r = await resolveVerifyAt({
      gitRun,
      repo,
      sha: base_sha,
      config_map: null
    });

    expect(r).toMatchObject({ value: { cmd: ['base-verify'] } });
  });
});
