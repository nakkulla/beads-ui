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
import { afterEach, describe, expect, test, vi } from 'vitest';
import { resolveRepoOps } from '../../server/worker/repo-ops-resolver.js';

// This file drives REAL child processes (git, a shell, node), so its wall time
// is process startup, not product work. Measured against the whole suite running
// in parallel, tests here reach ~4s — against a 5s default that is a coin flip,
// and the repo-ops verify gate is where the coin lands wrong. The assertions are
// unchanged; only the budget is sized for the load the suite actually creates.
vi.setConfig({ testTimeout: 30_000 });

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ADAPTER = path.join(HERE, 'verify');
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
 * The ADR index and citation gates read real files, so the candidate carries
 * this repository's `docs/adr` and `AGENTS.md` — the same bytes the coordinator
 * would squash into the throwaway checkout. A test that wants the gate red
 * mutates its own copy.
 *
 * @param {{ npm_body?: string }} [options]
 */
function fixture(options = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'repo-ops-verify-'));
  created_roots.push(root);
  const repo = path.join(root, 'candidate');
  fs.mkdirSync(repo);
  // The coordinator materializes a real checkout, and the citation gate refuses
  // a `--repo` without one, so the candidate is a git repository here too.
  spawnSync('git', ['init', '-q', repo]);
  fs.cpSync(
    path.join(REPO_ROOT, 'docs', 'adr'),
    path.join(repo, 'docs', 'adr'),
    {
      recursive: true
    }
  );
  fs.copyFileSync(
    path.join(REPO_ROOT, 'AGENTS.md'),
    path.join(repo, 'AGENTS.md')
  );

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

  test('fails on ADR index drift before paying the install cost', () => {
    const env = fixture();
    fs.writeFileSync(
      path.join(env.repo, 'docs', 'adr', '9999-index-drift.md'),
      '---\nid: 9999\ntitle: drift\nstatus: accepted\ndate: 2026-01-01\nsummary: drift\n---\n',
      'utf8'
    );

    const result = run(env);

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('ADR index drift check failed');
    expect(calls(env)).toEqual([]);
  });

  test('fails on guidance citing an ADR that does not exist', () => {
    const env = fixture();
    fs.appendFileSync(
      path.join(env.repo, 'AGENTS.md'),
      '\n- 없는 결정을 가리키는 문장이다(ADR 9998).\n',
      'utf8'
    );

    const result = run(env);

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('stale ADR guidance citation check failed');
    expect(calls(env)).toEqual([]);
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

/**
 * The Worker never reads `repo-ops/config.toml` from a working tree — it reads
 * the blob at a pinned SHA — so the declaration is asserted through the real
 * resolver at HEAD. An edit that is not committed yet is, to the Worker, not a
 * declaration at all, and this test says the same thing.
 */
describe('repo-ops/config.toml verify declaration', () => {
  /**
   * @param {string[]} args
   * @param {{ cwd: string }} options
   */
  const gitRun = async (args, options) => {
    const result = spawnSync('git', args, {
      cwd: options.cwd,
      encoding: 'utf8'
    });
    return {
      code: typeof result.status === 'number' ? result.status : 1,
      stdout: result.stdout || '',
      stderr: result.stderr || ''
    };
  };

  const headSha = () =>
    spawnSync('git', ['rev-parse', 'HEAD'], {
      cwd: REPO_ROOT,
      encoding: 'utf8'
    }).stdout.trim();

  test('resolves the verify declaration and script identity at HEAD', async () => {
    const resolved = await resolveRepoOps({
      repo: REPO_ROOT,
      sha: headSha(),
      gitRun
    });

    expect(resolved.ok).not.toBe(false);
    expect(resolved.verify).toMatchObject({
      script: 'repo-ops/script/verify',
      timeout_ms: 600000,
      mode: '100755',
      object_type: 'blob'
    });
  });

  test('keeps the deploy declaration alongside it', async () => {
    const resolved = await resolveRepoOps({
      repo: REPO_ROOT,
      sha: headSha(),
      gitRun
    });

    expect(resolved.base).toBe('main');
    expect(resolved.deploy).toMatchObject({
      script: 'repo-ops/script/deploy'
    });
  });

  test('states the eligibility rule the declaration now completes', () => {
    const agents = fs.readFileSync(path.join(REPO_ROOT, 'AGENTS.md'), 'utf8');

    expect(agents).not.toContain('저장소는 `[verify]`를 선언하지 않는다');
    expect(agents).toContain('ancestry');
  });
});
