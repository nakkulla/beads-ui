/**
 * The repo-ops deploy adapter (master spec §6.4/§14.1) driven as the Worker
 * drives it: the real script, the three protocol variables, and fake `npm` /
 * `bdui-shared` / health responses on `PATH`.
 */
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import { afterEach, describe, expect, test } from 'vitest';

const ADAPTER = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'deploy'
);

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
 * @param {string} repo
 * @param {string[]} args
 */
function git(repo, ...args) {
  const result = spawnSync('git', ['-C', repo, ...args], {
    encoding: 'utf8'
  });
  if (result.status !== 0) {
    throw new Error(`git ${args.join(' ')}: ${result.stderr}`);
  }
  return String(result.stdout || '').trim();
}

/**
 * A repo whose HEAD is a real commit, plus a fake bin directory whose `npm`,
 * `bdui-shared` and `node` stand in for the real ones. `node` is only shadowed
 * for the health probe, so the fake forwards everything else to the real one.
 *
 * @param {{ health?: string, npm_body?: string, restart_body?: string }} [options]
 */
function fixture(options = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'repo-ops-deploy-'));
  created_roots.push(root);
  const repo = path.join(root, 'worktree');
  fs.mkdirSync(repo);
  git(repo, 'init', '-q', '--initial-branch=main');
  git(repo, 'config', 'user.email', 'test@example.com');
  git(repo, 'config', 'user.name', 'Test User');
  fs.writeFileSync(path.join(repo, 'package.json'), '{}\n', 'utf8');
  git(repo, 'add', '.');
  git(repo, 'commit', '-qm', 'fixture');
  const sha = git(repo, 'rev-parse', 'HEAD');

  const log = path.join(root, 'calls.log');
  const bin = path.join(root, 'bin');
  fs.mkdirSync(bin);
  fs.writeFileSync(
    path.join(bin, 'npm'),
    `#!/bin/sh\nprintf 'npm %s\\n' "$*" >> "$CALL_LOG"\n${options.npm_body || ''}\n`,
    'utf8'
  );
  fs.chmodSync(path.join(bin, 'npm'), 0o755);
  fs.writeFileSync(
    path.join(bin, 'bdui-shared'),
    `#!/bin/sh\nprintf 'bdui-shared %s\\n' "$*" >> "$CALL_LOG"\n${options.restart_body || ''}\n`,
    'utf8'
  );
  fs.chmodSync(path.join(bin, 'bdui-shared'), 0o755);
  // The health probe is the only `node` the script runs; the fake answers with
  // the canned verdict instead of doing a real fetch.
  const health = options.health ?? 'ok';
  fs.writeFileSync(
    path.join(bin, 'node'),
    `#!/bin/sh\nprintf 'node health\\n' >> "$CALL_LOG"\nprintf '%s' '${health}'\n`,
    'utf8'
  );
  fs.chmodSync(path.join(bin, 'node'), 0o755);

  return { root, repo, sha, bin, log };
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
      REPO_OPS_TARGET_SHA: overrides.sha || env.sha,
      REPO_OPS_TARGET_BASE: 'main',
      REPO_OPS_REPO_ROOT: overrides.root || env.repo,
      REPO_OPS_HEALTH_ATTEMPTS: '1',
      REPO_OPS_HEALTH_POLL_SECONDS: '0',
      BDUI_DEPLOY_HEALTH_URL: 'http://127.0.0.1:3000/healthz'
    }
  });
}

/**
 * @param {ReturnType<typeof fixture>} env
 * @param {Record<string, string>} [extra_env]
 */
function runAsync(env, extra_env = {}) {
  return spawn(ADAPTER, [], {
    cwd: env.repo,
    env: {
      ...process.env,
      PATH: `${env.bin}${path.delimiter}${process.env.PATH}`,
      CALL_LOG: env.log,
      REPO_OPS_TARGET_SHA: env.sha,
      REPO_OPS_TARGET_BASE: 'main',
      REPO_OPS_REPO_ROOT: env.repo,
      REPO_OPS_HEALTH_ATTEMPTS: '1',
      REPO_OPS_HEALTH_POLL_SECONDS: '0',
      BDUI_DEPLOY_HEALTH_URL: 'http://127.0.0.1:3000/healthz',
      ...extra_env
    },
    stdio: 'ignore'
  });
}

/** @param {import('node:child_process').ChildProcess} child */
function exited(child) {
  return new Promise((resolve) => child.once('exit', resolve));
}

/** @param {() => boolean} predicate */
async function waitFor(predicate) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (predicate()) {
      return;
    }
    await delay(10);
  }
  throw new Error('condition_not_observed');
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

describe('repo-ops/script/deploy', () => {
  test('runs install, build, restart and health readback in order', () => {
    const env = fixture();

    const result = run(env);

    expect(result.status).toBe(0);
    expect(calls(env)).toEqual([
      'npm ci',
      'npm run build',
      'bdui-shared restart',
      'node health'
    ]);
    expect(result.stdout).toContain('repo-ops deploy ok');
  });

  test('replays the same SHA idempotently', () => {
    const env = fixture();

    const first = run(env);
    const second = run(env);

    expect(first.status).toBe(0);
    expect(second.status).toBe(0);
    expect(git(env.repo, 'status', '--porcelain')).toBe('');
  });

  test('holds the shared flock for the whole deploy execution', async () => {
    const release_file = path.join(os.tmpdir(), `deploy-release-${Date.now()}`);
    const env = fixture({
      npm_body:
        'if [ "$1" = "ci" ]; then while [ ! -f "$RELEASE_FILE" ]; do sleep 0.01; done; fi'
    });
    const first = runAsync(env, { RELEASE_FILE: release_file });
    await waitFor(
      () => calls(env).filter((line) => line === 'npm ci').length === 1
    );

    const second = runAsync(env, { RELEASE_FILE: release_file });
    await delay(75);

    expect(calls(env).filter((line) => line === 'npm ci')).toHaveLength(1);
    fs.writeFileSync(release_file, 'release');
    await Promise.all([exited(first), exited(second)]);
    expect(calls(env).filter((line) => line === 'npm ci')).toHaveLength(2);
    fs.rmSync(release_file, { force: true });
  });

  test('refuses a target SHA that is not the local HEAD', () => {
    const env = fixture();

    const result = run(env, { sha: 'b'.repeat(40) });

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('start HEAD differs');
    expect(calls(env)).toEqual([]);
  });

  test('refuses a cwd that is not the declared repo root', () => {
    const env = fixture();

    const result = run(env, { cwd: env.root });

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('cwd must equal REPO_OPS_REPO_ROOT');
  });

  test('fails when the live runtime reports another source SHA', () => {
    const env = fixture({ health: 'source_sha_mismatch' });

    const result = run(env);

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('source_sha_mismatch');
  });

  test('fails when the live runtime reports another source repo', () => {
    const env = fixture({ health: 'source_repo_mismatch' });

    const result = run(env);

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('source_repo_mismatch');
  });

  test('fails when execution leaves the deploy worktree dirty', () => {
    const env = fixture({
      restart_body: 'printf dirty > "$REPO_OPS_REPO_ROOT/untracked.txt"'
    });

    const result = run(env);

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('worktree is not tracked-clean');
  });

  test('fails when execution changes the deploy worktree HEAD', () => {
    const env = fixture({
      restart_body:
        'printf changed > "$REPO_OPS_REPO_ROOT/package.json"; git -C "$REPO_OPS_REPO_ROOT" add package.json; git -C "$REPO_OPS_REPO_ROOT" commit -qm changed'
    });

    const result = run(env);

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('end HEAD differs');
  });

  test('keeps a failure message free of credential-shaped values', () => {
    const env = fixture({ health: 'source_sha_mismatch' });

    const result = run(env, {});

    expect(result.stderr).not.toMatch(/gh[pousr]_[A-Za-z0-9]{16,}/);
    expect(result.stderr).not.toMatch(/Authorization|Bearer|password|secret/i);
  });

  test('is a tracked regular executable with no provider protocol', () => {
    const text = fs.readFileSync(ADAPTER, 'utf8');
    const stat = fs.lstatSync(ADAPTER);

    expect(stat.isFile() && !stat.isSymbolicLink()).toBe(true);
    expect(stat.mode & 0o111).toBeTruthy();
    for (const retired of [
      'repo-deployctl',
      'deploy.json',
      'desired.json',
      'status.json',
      'generation'
    ]) {
      expect(text).not.toContain(retired);
    }
  });
});
