import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, expect, test, vi } from 'vitest';

// Waits on REAL child processes (git, node, python), so wall time here is
// process startup under the load the parallel suite creates, not product work.
// Assertions are unchanged; only the waiting budget is sized for that load.
vi.setConfig({ testTimeout: 30_000 });

/** @type {string[]} */
const temporary_repos = [];
const CHECKER_NAME = ['check', 'managed' + '-deploy', 'retired.js'].join('-');

afterEach(() => {
  for (const repo of temporary_repos.splice(0)) {
    fs.rmSync(repo, { recursive: true, force: true });
  }
});

/**
 * @param {string} name
 * @param {string} source
 */
function createTree(name, source) {
  const repo = fs.mkdtempSync(path.join(os.tmpdir(), `bdui-check-${name}-`));
  temporary_repos.push(repo);
  const scripts = path.join(repo, 'scripts');
  fs.mkdirSync(scripts, { recursive: true });
  fs.copyFileSync(
    path.join(process.cwd(), 'scripts', CHECKER_NAME),
    path.join(scripts, CHECKER_NAME)
  );
  fs.chmodSync(path.join(scripts, CHECKER_NAME), 0o755);
  fs.mkdirSync(path.join(repo, 'server'), { recursive: true });
  fs.writeFileSync(path.join(repo, 'server', 'fixture.js'), source);
  execFileSync('git', ['init', '--quiet'], { cwd: repo });
  execFileSync('git', ['config', 'user.email', 'test@example.invalid'], {
    cwd: repo
  });
  execFileSync('git', ['config', 'user.name', 'test'], { cwd: repo });
  execFileSync('git', ['add', '.'], { cwd: repo });
  execFileSync('git', ['commit', '--quiet', '-m', 'fixture'], { cwd: repo });
  return repo;
}

/**
 * @param {string[]} args
 */
function runChecker(args) {
  return spawnSync('node', [`scripts/${CHECKER_NAME}`, ...args], {
    cwd: process.cwd(),
    encoding: 'utf8'
  });
}

test('accepts a clean current checkout', () => {
  const result = runChecker([]);

  expect(result.status).toBe(0);
});

test('checks a pinned repository tree reference', () => {
  const repo = createTree('clean', 'export const value = 1;\n');
  const result = runChecker(['--repo', repo, '--ref', 'HEAD']);

  expect(result.status).toBe(0);
});

test.each([
  ['retired module', ['managed', 'state'].join('-')],
  ['runtime marker writer', ['write', 'Runtime', 'Marker'].join('')],
  ['runtime marker reader', ['read', 'Runtime', 'Marker'].join('')],
  ['runtime marker path', ['bdui', 'runtime', 'beads-ui'].join('/')]
])('rejects a forbidden %s in a pinned repository tree', (_, token) => {
  const repo = createTree('forbidden', `export const value = '${token}';\n`);
  const result = runChecker(['--repo', repo, '--ref', 'HEAD']);

  expect(result.status).toBe(1);
  expect(result.stderr).toContain(`server/fixture.js: ${token}`);
});
