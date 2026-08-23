/**
 * The repo-ops deploy adapter (master spec §6.4/§14.1) driven as the Worker
 * drives it: the real script, the three protocol variables, and fake `npm` /
 * `bdui-shared` / health responses on `PATH`.
 */
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
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
const STUB_INSTANCE_ID = '11111111-1111-4111-8111-111111111111';

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
  // The real repository ignores `.worktrees/`, which is why the shared lockfile
  // the script creates there never shows up in its tracked-clean readback.
  fs.writeFileSync(path.join(repo, '.gitignore'), '.worktrees/\n', 'utf8');
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
  const health = options.health ?? `ok ${STUB_INSTANCE_ID}`;
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

  test('spells the lockfile path as the literal the activation gate scans for (UI-ffeu)', () => {
    const text = fs.readFileSync(ADAPTER, 'utf8');

    expect(text).toContain('.worktrees/.repo-ops-deploy.lock');
  });

  test('locks under the main repository root, where the Worker locks', () => {
    const env = fixture();

    run(env);

    expect(
      fs.existsSync(path.join(env.repo, '.worktrees', '.repo-ops-deploy.lock'))
    ).toBe(true);
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

/**
 * Extract the health probe the adapter really runs.
 *
 * The other tests shadow `node` with a fake that prints a canned verdict, which
 * proves the script reacts to a verdict but never that the probe reaches the
 * right one. These tests run the embedded program itself.
 *
 * @returns {string}
 */
function embeddedHealthProbe() {
  const text = fs.readFileSync(ADAPTER, 'utf8');
  const start = text.indexOf("node --input-type=module -e '");
  if (start < 0) {
    throw new Error('the adapter no longer embeds a node health probe');
  }
  const body_start = text.indexOf(
    "'",
    start + 'node --input-type=module -e'.length
  );
  const body_end = text.indexOf("\n'", body_start);
  if (body_end < 0) {
    throw new Error('the embedded health probe is not single-quoted');
  }
  return text.slice(body_start + 1, body_end + 1);
}

/**
 * Serve one health body and run the real probe against it.
 *
 * @param {unknown} body - Parsed JSON body, or null to answer 503.
 * @param {{ expect_sha?: string, expect_root?: string }} [options]
 * @returns {Promise<string>}
 */
async function runHealthProbe(body, options = {}) {
  const probe_source = embeddedHealthProbe();
  const root = fs.realpathSync(
    fs.mkdtempSync(path.join(os.tmpdir(), 'repo-ops-probe-'))
  );
  created_roots.push(root);
  const expect_root = options.expect_root ?? root;

  const server = http.createServer((_req, res) => {
    if (body === null) {
      res.writeHead(503, { 'content-type': 'application/json' });
      res.end('{}');
      return;
    }
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(body));
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  if (address === null || typeof address === 'string') {
    server.close();
    throw new Error('probe fixture server did not bind');
  }

  try {
    // The probe must run asynchronously: `spawnSync` would block this process's
    // event loop, leaving the fixture server unable to answer its own fetch.
    return await new Promise((resolve, reject) => {
      const child = spawn(
        process.execPath,
        ['--input-type=module', '-e', probe_source],
        {
          env: {
            ...process.env,
            REPO_OPS_HEALTH_URL: `http://127.0.0.1:${address.port}/healthz`,
            REPO_OPS_EXPECT_SHA: options.expect_sha ?? 'a'.repeat(40),
            REPO_OPS_EXPECT_ROOT: expect_root
          }
        }
      );
      /** @type {string[]} */
      const out = [];
      /** @type {string[]} */
      const err = [];
      child.stdout.setEncoding('utf8');
      child.stdout.on('data', (chunk) => out.push(String(chunk)));
      child.stderr.setEncoding('utf8');
      child.stderr.on('data', (chunk) => err.push(String(chunk)));
      child.on('error', reject);
      child.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`health probe exited ${code}: ${err.join('')}`));
          return;
        }
        resolve(out.join(''));
      });
    });
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

/**
 * A health body whose runtime identity matches and whose bd diagnostics are
 * green.
 *
 * @param {string} root
 * @param {Record<string, unknown>} [diagnostics_bd]
 */
function healthyBody(root, diagnostics_bd) {
  return {
    ok: true,
    checks: { bd: true, db: true },
    runtime: {
      source_sha: 'a'.repeat(40),
      source_repo: root,
      instance_id: STUB_INSTANCE_ID
    },
    diagnostics: {
      bd: diagnostics_bd ?? {
        version: '1.2.0-fork.1',
        producer_observations: {
          default: { format: 'bare', schema_version: null },
          envelope_opt_in: { format: 'envelope', schema_version: 2 }
        },
        producer_capabilities: ['envelope_v2', 'legacy_bare'],
        consumer_supported_formats: ['bare', 'envelope_v2'],
        workspace_probe: { ok: true },
        active_protocol_failures: { workspace_count: 0, families: [] },
        error: null
      }
    }
  };
}

describe('repo-ops/script/deploy health probe', () => {
  test('accepts matching identity with green bd diagnostics', async () => {
    const root = fs.realpathSync(
      fs.mkdtempSync(path.join(os.tmpdir(), 'repo-ops-probe-root-'))
    );
    created_roots.push(root);

    const verdict = await runHealthProbe(healthyBody(root), {
      expect_root: root
    });

    expect(verdict).toBe(`ok ${STUB_INSTANCE_ID}`);
  });

  test('rejects a runtime that reports no usable instance id', async () => {
    const root = fs.realpathSync(
      fs.mkdtempSync(path.join(os.tmpdir(), 'repo-ops-probe-root-'))
    );
    created_roots.push(root);
    const body = healthyBody(root);
    delete body.runtime.instance_id;

    const verdict = await runHealthProbe(body, { expect_root: root });

    expect(verdict).toBe('runtime_identity_missing');
  });

  test('rejects an instance id the single-token verdict cannot carry', async () => {
    const root = fs.realpathSync(
      fs.mkdtempSync(path.join(os.tmpdir(), 'repo-ops-probe-root-'))
    );
    created_roots.push(root);
    const body = healthyBody(root);
    body.runtime.instance_id = 'has a space';

    const verdict = await runHealthProbe(body, { expect_root: root });

    expect(verdict).toBe('runtime_identity_missing');
  });

  test('rejects a body whose bd diagnostics are missing', async () => {
    const root = fs.realpathSync(
      fs.mkdtempSync(path.join(os.tmpdir(), 'repo-ops-probe-root-'))
    );
    created_roots.push(root);
    const body = healthyBody(root);
    delete body.diagnostics;

    const verdict = await runHealthProbe(body, { expect_root: root });

    expect(verdict).not.toBe('ok');
    expect(verdict).toContain('bd_diagnostics');
  });

  test('rejects an active bd protocol failure', async () => {
    const root = fs.realpathSync(
      fs.mkdtempSync(path.join(os.tmpdir(), 'repo-ops-probe-root-'))
    );
    created_roots.push(root);
    const body = healthyBody(root, {
      version: '1.2.0-fork.1',
      producer_observations: {
        default: { format: 'bare', schema_version: null },
        envelope_opt_in: { format: 'envelope', schema_version: 2 }
      },
      producer_capabilities: ['envelope_v2', 'legacy_bare'],
      consumer_supported_formats: ['bare', 'envelope_v2'],
      workspace_probe: { ok: true },
      active_protocol_failures: { workspace_count: 1, families: ['list'] },
      error: 'bd_protocol_failure_active'
    });

    const verdict = await runHealthProbe(body, { expect_root: root });

    expect(verdict).not.toBe('ok');
  });

  test('rejects a red workspace probe', async () => {
    const root = fs.realpathSync(
      fs.mkdtempSync(path.join(os.tmpdir(), 'repo-ops-probe-root-'))
    );
    created_roots.push(root);
    const body = healthyBody(root, {
      version: '1.2.0-fork.1',
      producer_observations: {
        default: { format: 'bare', schema_version: null },
        envelope_opt_in: { format: 'envelope', schema_version: 2 }
      },
      producer_capabilities: ['envelope_v2', 'legacy_bare'],
      consumer_supported_formats: ['bare', 'envelope_v2'],
      workspace_probe: { ok: false },
      active_protocol_failures: { workspace_count: 0, families: [] },
      error: null
    });

    const verdict = await runHealthProbe(body, { expect_root: root });

    expect(verdict).not.toBe('ok');
  });

  test('rejects a body missing envelope_v2 consumer support', async () => {
    const root = fs.realpathSync(
      fs.mkdtempSync(path.join(os.tmpdir(), 'repo-ops-probe-root-'))
    );
    created_roots.push(root);
    const body = healthyBody(root, {
      version: '1.2.0-fork.1',
      producer_observations: {
        default: { format: 'bare', schema_version: null },
        envelope_opt_in: { format: 'envelope', schema_version: 2 }
      },
      producer_capabilities: ['legacy_bare'],
      consumer_supported_formats: ['bare'],
      workspace_probe: { ok: true },
      active_protocol_failures: { workspace_count: 0, families: [] },
      error: null
    });

    const verdict = await runHealthProbe(body, { expect_root: root });

    expect(verdict).not.toBe('ok');
  });

  test('rejects an empty bd version', async () => {
    const root = fs.realpathSync(
      fs.mkdtempSync(path.join(os.tmpdir(), 'repo-ops-probe-root-'))
    );
    created_roots.push(root);
    const body = healthyBody(root, {
      version: '',
      producer_observations: {
        default: { format: 'bare', schema_version: null },
        envelope_opt_in: { format: 'envelope', schema_version: 2 }
      },
      producer_capabilities: ['envelope_v2', 'legacy_bare'],
      consumer_supported_formats: ['bare', 'envelope_v2'],
      workspace_probe: { ok: true },
      active_protocol_failures: { workspace_count: 0, families: [] },
      error: null
    });

    const verdict = await runHealthProbe(body, { expect_root: root });

    expect(verdict).not.toBe('ok');
  });

  test('still rejects a source_sha mismatch', async () => {
    const root = fs.realpathSync(
      fs.mkdtempSync(path.join(os.tmpdir(), 'repo-ops-probe-root-'))
    );
    created_roots.push(root);
    const body = healthyBody(root);
    body.runtime.source_sha = 'b'.repeat(40);

    const verdict = await runHealthProbe(body, { expect_root: root });

    expect(verdict).toBe('source_sha_mismatch');
  });

  test('still reports an unreachable endpoint', async () => {
    const verdict = await runHealthProbe(null);

    expect(verdict).toBe('unreachable');
  });
});
