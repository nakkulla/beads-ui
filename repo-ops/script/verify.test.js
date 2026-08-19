/**
 * The repo-ops verify adapter (UI-vzyh §4.4) driven as the Worker drives it:
 * the real script, the three protocol variables, and a fake `npm` on `PATH`.
 *
 * The declaration test guards the other half — a script the config does not
 * name, or names with an identity the resolver rejects, verifies nothing.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { afterEach, describe, expect, test } from 'vitest';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ADAPTER = path.join(HERE, 'verify');
const CONFIG = path.join(path.dirname(HERE), 'config.toml');
const REPO_ROOT = path.dirname(path.dirname(HERE));

/** @type {string[]} */
const created_roots = [];

afterEach(() => {
  while (created_roots.length > 0) {
    const root = created_roots.pop();
    if (root) {
      fs.rmSync(root, { recursive: true, force: true });
    }
  }
});

/**
 * A stand-in for the coordinator's candidate checkout plus a fake `npm` whose
 * per-subcommand exit code the test picks.
 *
 * @param {{ npm_body?: string }} [options]
 */
function fixture(options = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'repo-ops-verify-'));
  created_roots.push(root);
  const repo = path.join(root, 'candidate');
  fs.mkdirSync(repo);

  const log = path.join(root, 'calls.log');
  const bin = path.join(root, 'bin');
  fs.mkdirSync(bin);
  fs.writeFileSync(
    path.join(bin, 'npm'),
    `#!/bin/sh\nprintf 'npm %s\\n' "$*" >> "$CALL_LOG"\n${options.npm_body || ''}\n`,
    'utf8'
  );
  fs.chmodSync(path.join(bin, 'npm'), 0o755);

  return { root, repo, bin, log };
}

/**
 * @param {ReturnType<typeof fixture>} env
 * @param {{ sha?: string, root?: string, cwd?: string }} [overrides]
 */
function run(env, overrides = {}) {
  return spawnSync(ADAPTER, [], {
    cwd: overrides.cwd || env.repo,
    encoding: 'utf8',
    env: {
      ...process.env,
      PATH: `${env.bin}${path.delimiter}${process.env.PATH}`,
      CALL_LOG: env.log,
      REPO_OPS_TARGET_SHA: overrides.sha || 'a'.repeat(40),
      REPO_OPS_TARGET_BASE: 'main',
      REPO_OPS_REPO_ROOT: overrides.root || env.repo
    }
  });
}

/**
 * @param {ReturnType<typeof fixture>} env
 */
function calls(env) {
  if (!fs.existsSync(env.log)) {
    return [];
  }
  return fs.readFileSync(env.log, 'utf8').trim().split('\n').filter(Boolean);
}

describe('repo-ops/script/verify', () => {
  test('runs install, type check and tests in order', () => {
    const env = fixture();

    const result = run(env);

    expect(result.status).toBe(0);
    expect(calls(env)).toEqual(['npm ci', 'npm run tsc', 'npm test']);
  });

  test('never builds — the candidate tree must stay untouched', () => {
    const env = fixture();

    run(env);

    expect(calls(env).some((line) => line.includes('build'))).toBe(false);
  });

  test('fails on a red type check without running the suite', () => {
    const env = fixture({
      npm_body: 'if [ "$1" = run ] && [ "$2" = tsc ]; then exit 2; fi'
    });

    const result = run(env);

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('npm run tsc failed');
    expect(calls(env)).toEqual(['npm ci', 'npm run tsc']);
  });

  test('fails on a red suite', () => {
    const env = fixture({ npm_body: 'if [ "$1" = test ]; then exit 1; fi' });

    const result = run(env);

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('npm test failed');
  });

  test('refuses a cwd that is not the declared repo root', () => {
    const env = fixture();

    const result = run(env, { cwd: env.root });

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('cwd must equal REPO_OPS_REPO_ROOT');
    expect(calls(env)).toEqual([]);
  });

  test('refuses a target SHA that is not 40 lowercase hex', () => {
    const env = fixture();

    const result = run(env, { sha: 'HEAD' });

    expect(result.status).not.toBe(0);
    expect(calls(env)).toEqual([]);
  });

  test('is a tracked regular executable', () => {
    const stat = fs.lstatSync(ADAPTER);

    expect(stat.isFile() && !stat.isSymbolicLink()).toBe(true);
    expect(stat.mode & 0o111).toBeTruthy();
    expect(
      spawnSync('git', ['ls-files', '--stage', 'repo-ops/script/verify'], {
        cwd: REPO_ROOT,
        encoding: 'utf8'
      }).stdout.trim()
    ).toMatch(/^100755 /);
  });
});

describe('repo-ops/config.toml verify declaration', () => {
  test('declares the verify script the resolver accepts', () => {
    const text = fs.readFileSync(CONFIG, 'utf8');

    expect(text).toContain('[verify]');
    expect(text).toContain('script = "repo-ops/script/verify"');
    expect(text).toContain('timeout_ms = 600000');
  });

  test('states the eligibility rule the declaration now completes', () => {
    const agents = fs.readFileSync(path.join(REPO_ROOT, 'AGENTS.md'), 'utf8');

    expect(agents).not.toContain('저장소는 `[verify]`를 선언하지 않는다');
    expect(agents).toContain('ancestry');
  });
});
