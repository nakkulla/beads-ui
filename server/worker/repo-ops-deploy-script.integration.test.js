/**
 * The restart marker the real `repo-ops/script/deploy` leaves behind, driven
 * end to end: stub `npm` and `bdui-shared` on `PATH`, and a real healthz server
 * whose runtime identity the script's own probe reads.
 */
import { execFileSync, spawn } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';

const DEPLOY_SCRIPT = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
  'repo-ops',
  'script',
  'deploy'
);
const INSTANCE_ID = '11111111-2222-4333-8444-555555555555';
const OTHER_INSTANCE_ID = '99999999-8888-4777-8666-555555555555';

/** @type {string} */
let root;
/** @type {string} */
let repo;
/** @type {string} */
let repo_realpath;
/** @type {string} */
let bin;
/** @type {string} */
let target_sha;
/** @type {string} */
let marker_path;
/** @type {string} */
let restart_snapshot_path;
/** @type {import('node:http').Server|null} */
let health_server;

/**
 * @param {string[]} args
 * @param {string} cwd
 */
function git(args, cwd) {
  return String(execFileSync('git', args, { cwd, encoding: 'utf8' })).trim();
}

/**
 * @param {string} name
 * @param {string} body
 */
function installStub(name, body) {
  const file = path.join(bin, name);
  fs.writeFileSync(file, `#!/bin/sh\n${body}\n`, 'utf8');
  fs.chmodSync(file, 0o755);
}

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'repo-ops-deploy-marker-'));
  repo = path.join(root, 'worktree');
  bin = path.join(root, 'bin');
  fs.mkdirSync(repo);
  fs.mkdirSync(bin);
  git(['init', '-q', '--initial-branch=main', '.'], repo);
  git(['config', 'user.email', 'test@example.com'], repo);
  git(['config', 'user.name', 'Test User'], repo);
  // The real repository ignores `.worktrees/`, which is why the marker the
  // script writes there never breaks its own tracked-clean readback.
  fs.writeFileSync(path.join(repo, '.gitignore'), '.worktrees/\n', 'utf8');
  git(['add', '.'], repo);
  git(['commit', '-qm', 'fixture'], repo);
  target_sha = git(['rev-parse', 'HEAD'], repo);
  repo_realpath = fs.realpathSync(repo);
  marker_path = path.join(repo, '.worktrees', '.repo-ops-deploy.restart.json');
  restart_snapshot_path = path.join(root, 'marker-at-restart.json');
  installStub('npm', 'exit 0');
  installStub(
    'bdui-shared',
    `cp "${marker_path}" "${restart_snapshot_path}" 2>/dev/null || true`
  );
  health_server = null;
});

afterEach(async () => {
  if (health_server) {
    await new Promise((resolve) => health_server?.close(() => resolve(null)));
    health_server = null;
  }
  fs.rmSync(root, { recursive: true, force: true });
});

/**
 * @param {string} instance_id
 * @param {boolean} [workspace_probe_ok]
 */
function healthyBody(instance_id, workspace_probe_ok = true) {
  return {
    ok: true,
    checks: { bd: true, db: true },
    runtime: {
      source_sha: target_sha,
      source_repo: repo_realpath,
      instance_id
    },
    diagnostics: {
      bd: {
        version: '1.2.0-fork.1',
        producer_observations: {
          default: { format: 'bare', schema_version: null },
          envelope_opt_in: { format: 'envelope', schema_version: 2 }
        },
        consumer_supported_formats: ['bare', 'envelope_v2'],
        workspace_probe: { ok: workspace_probe_ok },
        active_protocol_failures: { workspace_count: 0, families: [] },
        error: null
      }
    }
  };
}

/**
 * @param {(index: number) => unknown} responder - Null answers 503.
 * @returns {Promise<string>} The health URL to hand the script.
 */
async function startHealthServer(responder) {
  let index = 0;
  const server = http.createServer((_req, res) => {
    const body = responder(index);
    index += 1;
    if (body === null) {
      res.writeHead(503, { 'content-type': 'application/json' });
      res.end('{}');
      return;
    }
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(body));
  });
  await new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve(null));
  });
  const address = server.address();
  if (address === null || typeof address === 'string') {
    server.close();
    throw new Error('health fixture server did not bind');
  }
  health_server = server;
  return `http://127.0.0.1:${address.port}/healthz`;
}

/**
 * The script must run asynchronously: a synchronous spawn would block this
 * process's event loop, leaving the fixture server unable to answer.
 *
 * @param {string} health_url
 * @param {{ attempts?: string }} [options]
 * @returns {Promise<{ status: number|null, stdout: string, stderr: string }>}
 */
function runDeploy(health_url, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(DEPLOY_SCRIPT, [], {
      cwd: repo,
      env: {
        ...process.env,
        PATH: `${bin}${path.delimiter}${process.env.PATH}`,
        REPO_OPS_TARGET_SHA: target_sha,
        REPO_OPS_TARGET_BASE: 'main',
        REPO_OPS_REPO_ROOT: repo,
        REPO_OPS_HEALTH_ATTEMPTS: options.attempts ?? '3',
        REPO_OPS_HEALTH_POLL_SECONDS: '0',
        BDUI_DEPLOY_HEALTH_URL: health_url
      }
    });
    /** @type {string[]} */
    const out = [];
    /** @type {string[]} */
    const err = [];
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (chunk) => out.push(String(chunk)));
    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (chunk) => err.push(String(chunk)));
    child.on('error', reject);
    child.on('close', (status) => {
      resolve({ status, stdout: out.join(''), stderr: err.join('') });
    });
  });
}

/**
 * @param {string} file
 */
function readMarker(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

describe('repo-ops/script/deploy restart marker', () => {
  test('writes the start marker before the restart returns', async () => {
    const health_url = await startHealthServer(() => healthyBody(INSTANCE_ID));

    const result = await runDeploy(health_url);

    expect(result.status).toBe(0);
    expect(readMarker(restart_snapshot_path)).toEqual({
      schema: 1,
      target_sha,
      target_base: 'main',
      started_at: expect.any(Number)
    });
  });

  test('records the observed instance on the success path', async () => {
    const health_url = await startHealthServer(() => healthyBody(INSTANCE_ID));

    const result = await runDeploy(health_url);

    expect(result.status).toBe(0);
    expect(readMarker(marker_path)).toMatchObject({
      schema: 1,
      target_sha,
      result: 'ok',
      instance_id: INSTANCE_ID
    });
  });

  test('records a failed health readback without an instance', async () => {
    const health_url = await startHealthServer(() => null);

    const result = await runDeploy(health_url, { attempts: '1' });

    expect(result.status).not.toBe(0);
    const marker = readMarker(marker_path);
    expect(marker.result).toBe('failed');
    expect(marker.instance_id).toBeUndefined();
  });

  test('records a failed marker when a runtime reports no instance id', async () => {
    const health_url = await startHealthServer(() => {
      const { runtime, ...rest } = healthyBody(INSTANCE_ID);
      return {
        ...rest,
        runtime: {
          source_sha: runtime.source_sha,
          source_repo: runtime.source_repo
        }
      };
    });

    const result = await runDeploy(health_url, { attempts: '1' });

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('runtime_identity_missing');
    const marker = readMarker(marker_path);
    expect(marker.result).toBe('failed');
    expect(marker.instance_id).toBeUndefined();
  });

  test('records a failed marker when a check after the certified health fails', async () => {
    const health_url = await startHealthServer(() => healthyBody(INSTANCE_ID));
    installStub('npm', `touch "${path.join(repo, 'leftover.txt')}"`);

    const result = await runDeploy(health_url);

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('tracked-clean');
    const marker = readMarker(marker_path);
    expect(marker.result).toBe('failed');
    expect(marker.instance_id).toBeUndefined();
  });

  test('fails when the runtime identity changes mid poll', async () => {
    const health_url = await startHealthServer((index) =>
      index === 0
        ? healthyBody(INSTANCE_ID, false)
        : healthyBody(OTHER_INSTANCE_ID)
    );

    const result = await runDeploy(health_url);

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('runtime_identity_changed');
    const marker = readMarker(marker_path);
    expect(marker.result).toBe('failed');
    expect(marker.instance_id).toBeUndefined();
  });
});
