/**
 * Real-git coverage for the pinned declaration boundary. Neither a PR branch
 * nor the current working tree may replace the declaration at the selected
 * base commit.
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
 * @param {string} cmd_argv
 */
function writeDeclaration(cmd_argv) {
  const file = path.join(repo, 'docs', 'agents', 'repo-ops.toml');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `[verify]\ncmd = ${cmd_argv}\n`);
}

function head() {
  return execFileSync('git', ['rev-parse', 'HEAD'], {
    cwd: repo,
    encoding: 'utf8'
  }).trim();
}

/**
 * @param {string[]} args
 * @param {{ cwd?: string }} options
 */
async function gitRun(args, options) {
  try {
    const { stdout, stderr } = await execFileAsync('git', args, {
      cwd: options.cwd
    });
    return { code: 0, stdout, stderr };
  } catch (error) {
    const detail = /** @type {any} */ (error);
    return {
      code: detail.code ?? 1,
      stdout: detail.stdout || '',
      stderr: detail.stderr || ''
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
  git(['commit', '-q', '-m', 'PR declaration']);
  pr_sha = head();
  git(['checkout', '-q', 'main']);
});

afterEach(() => {
  fs.rmSync(repo, { recursive: true, force: true });
});

describe('worker/repo-ops pinned declaration', () => {
  test('reads the base declaration when the PR rewrote its own', async () => {
    const result = await resolveVerifyAt({
      gitRun,
      repo,
      sha: base_sha,
      config_map: null
    });

    expect(result).toMatchObject({ value: { cmd: ['base-verify'] } });
  });

  test('reads the PR declaration only when its commit is pinned', async () => {
    const result = await resolveVerifyAt({
      gitRun,
      repo,
      sha: pr_sha,
      config_map: null
    });

    expect(result).toMatchObject({ value: { cmd: ['true'] } });
  });

  test('ignores an uncommitted declaration edit', async () => {
    writeDeclaration('["dirty-verify"]');

    const result = await resolveVerifyAt({
      gitRun,
      repo,
      sha: base_sha,
      config_map: null
    });

    expect(result).toMatchObject({ value: { cmd: ['base-verify'] } });
  });

  test('ignores the branch checked out in the working tree', async () => {
    git(['checkout', '-q', 'pr-branch']);

    const result = await resolveVerifyAt({
      gitRun,
      repo,
      sha: base_sha,
      config_map: null
    });

    expect(result).toMatchObject({ value: { cmd: ['base-verify'] } });
  });
});
