import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { registerWorkspace } from '../registry-watcher.js';
import {
  __registerWorkerAttachmentForTest,
  __resetWorkerAttachmentsForTest
} from '../worker/attach.js';
import {
  projectRepoOpsDisplay,
  recordRepoOpsDisplay
} from '../worker/repo-ops-display.js';
import { resolveRepoOps } from '../worker/repo-ops-resolver.js';
import { repoOpsScriptHandler } from './repo-ops-script.js';

/** @type {string} */
let workspace;
/** @type {Record<string, string>} */
const commits = {};

/**
 * @param {string[]} args
 * @param {{ cwd?: string }} [options]
 */
function git(args, options = {}) {
  return execFileSync('git', args, {
    cwd: options.cwd || workspace,
    encoding: 'utf8'
  }).trim();
}

/**
 * @param {string[]} args
 * @param {{ cwd?: string }} [options]
 */
async function gitRun(args, options = {}) {
  try {
    return {
      code: 0,
      stdout: execFileSync('git', args, {
        cwd: options.cwd || workspace,
        encoding: 'utf8'
      }),
      stderr: ''
    };
  } catch (error) {
    const failure = /** @type {any} */ (error);
    return {
      code: typeof failure.status === 'number' ? failure.status : 1,
      stdout: typeof failure.stdout === 'string' ? failure.stdout : '',
      stderr: typeof failure.stderr === 'string' ? failure.stderr : ''
    };
  }
}

/**
 * @param {string} name
 * @param {{ verify?: Buffer|string|null, deploy?: Buffer|string|null }} lanes
 */
function commitDeclaration(name, lanes) {
  const script_dir = path.join(workspace, 'repo-ops', 'script');
  fs.mkdirSync(script_dir, { recursive: true });
  /** @type {string[]} */
  const config_lines = ['base = "main"'];
  /** @type {Array<'verify'|'deploy'>} */
  const lane_names = ['verify', 'deploy'];
  for (const lane of lane_names) {
    const content = lanes[lane];
    const script_path = path.join(script_dir, lane);
    if (content === null || content === undefined) {
      fs.rmSync(script_path, { force: true });
      continue;
    }
    fs.writeFileSync(script_path, content);
    fs.chmodSync(script_path, 0o755);
    config_lines.push(
      '',
      `[${lane}]`,
      `script = "repo-ops/script/${lane}"`,
      `timeout_ms = ${lane === 'verify' ? 300_000 : 600_000}`
    );
  }
  fs.writeFileSync(
    path.join(workspace, 'repo-ops', 'config.toml'),
    `${config_lines.join('\n')}\n`
  );
  git(['add', '-A']);
  git(['commit', '-q', '-m', name]);
  commits[name] = git(['rev-parse', 'HEAD']);
}

/**
 * @param {string} sha
 * @param {Partial<ReturnType<typeof projectRepoOpsDisplay>>} [patch]
 */
async function publishDisplay(sha, patch = {}) {
  const resolution = await resolveRepoOps({
    repo: workspace,
    sha,
    gitRun
  });
  recordRepoOpsDisplay(workspace, {
    ...projectRepoOpsDisplay(resolution, sha),
    ...patch
  });
}

/**
 * @param {string} query
 * @returns {Promise<{ status: number, body: any, cache_control: string|null }>}
 */
async function requestScript(query) {
  const search = new URLSearchParams(query);
  const request = {
    query: Object.fromEntries(search.entries())
  };
  let status = 200;
  let body = null;
  /** @type {Map<string, string>} */
  const headers = new Map();
  const response = {
    /** @param {number} value */
    status(value) {
      status = value;
      return response;
    },
    /**
     * @param {string} name
     * @param {string} value
     */
    set(name, value) {
      headers.set(name.toLowerCase(), value);
      return response;
    },
    /** @param {any} value */
    json(value) {
      body = value;
      return response;
    }
  };

  await repoOpsScriptHandler(
    /** @type {any} */ (request),
    /** @type {any} */ (response)
  );

  return {
    status,
    body,
    cache_control: headers.get('cache-control') || null
  };
}

/**
 * @param {string} sha
 * @param {'verify'|'deploy'} lane
 * @param {string} [extra]
 */
function queryFor(sha, lane, extra = '') {
  return (
    `workspace=${encodeURIComponent(workspace)}` +
    `&lane=${lane}&base_sha=${sha}${extra}`
  );
}

beforeAll(() => {
  workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-repo-script-'));
  git(['init', '-q']);
  git(['config', 'user.name', 'Test']);
  git(['config', 'user.email', 'test@example.com']);
  commitDeclaration('valid', {
    verify: '#!/bin/sh\necho verify\n',
    deploy: '#!/bin/bash\necho committed\n'
  });
  commitDeclaration('deploy-only', {
    verify: null,
    deploy: '#!/bin/sh\necho deploy only\n'
  });
  commitDeclaration('large', {
    verify: null,
    deploy: Buffer.alloc(200_001, 0x61)
  });
  commitDeclaration('nul', {
    verify: null,
    deploy: Buffer.from('#!/bin/sh\u0000echo nope\n')
  });
  commitDeclaration('invalid-utf8', {
    verify: null,
    deploy: Buffer.from([
      0x23, 0x21, 0x2f, 0x62, 0x69, 0x6e, 0x2f, 0x73, 0x68, 0x0a, 0xc3, 0x28
    ])
  });
  registerWorkspace({
    path: workspace,
    database: path.join(workspace, '.beads')
  });
  __registerWorkerAttachmentForTest(
    workspace,
    /** @type {any} */ ({
      repo: workspace,
      resolveBase: async () => ({ ok: true }),
      gitRun
    })
  );
});

afterAll(() => {
  __resetWorkerAttachmentsForTest();
  fs.rmSync(workspace, { recursive: true, force: true });
});

describe('GET /api/repo-ops-script', () => {
  test('returns exact deploy blob from registered workspace', async () => {
    await publishDisplay(commits.valid);

    const result = await requestScript(queryFor(commits.valid, 'deploy'));

    expect(result.status).toBe(200);
    expect(result.cache_control).toBe('no-store');
    expect(result.body).toMatchObject({
      ok: true,
      lane: 'deploy',
      path: 'repo-ops/script/deploy',
      base_ref: 'main',
      base_sha: commits.valid,
      mode: '100755',
      timeout_ms: 600_000,
      content: '#!/bin/bash\necho committed\n'
    });
    expect(result.body.blob_sha).toMatch(/^[0-9a-f]{40}$/);
  });

  test('returns exact verify blob from registered workspace', async () => {
    await publishDisplay(commits.valid);

    const result = await requestScript(queryFor(commits.valid, 'verify'));

    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({
      lane: 'verify',
      path: 'repo-ops/script/verify',
      timeout_ms: 300_000,
      content: '#!/bin/sh\necho verify\n'
    });
  });

  test('ignores changed working tree content', async () => {
    await publishDisplay(commits.valid);
    fs.writeFileSync(
      path.join(workspace, 'repo-ops', 'script', 'deploy'),
      '#!/bin/sh\necho working tree\n'
    );

    const result = await requestScript(queryFor(commits.valid, 'deploy'));

    expect(result.body.content).toBe('#!/bin/bash\necho committed\n');
  });

  test('ignores client path and reads declared lane path', async () => {
    await publishDisplay(commits.valid);

    const result = await requestScript(
      queryFor(commits.valid, 'deploy', '&path=.git/config')
    );

    expect(result.status).toBe(200);
    expect(result.body.path).toBe('repo-ops/script/deploy');
    expect(result.body.content).toBe('#!/bin/bash\necho committed\n');
  });

  test('rejects unregistered workspace', async () => {
    const other = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-unregistered-'));
    try {
      const result = await requestScript(
        `workspace=${encodeURIComponent(other)}&lane=deploy&base_sha=${commits.valid}`
      );

      expect(result).toMatchObject({
        status: 403,
        body: { ok: false, error: 'forbidden' }
      });
    } finally {
      fs.rmSync(other, { recursive: true, force: true });
    }
  });

  test('rejects invalid lane', async () => {
    const result = await requestScript(
      `workspace=${encodeURIComponent(workspace)}&lane=other&base_sha=${commits.valid}`
    );

    expect(result).toMatchObject({
      status: 400,
      body: { ok: false, error: 'bad_request' }
    });
  });

  test('rejects invalid base SHA', async () => {
    const result = await requestScript(queryFor('not-a-sha', 'deploy'));

    expect(result).toMatchObject({
      status: 400,
      body: { ok: false, error: 'bad_request' }
    });
  });

  test('rejects stale declaration display', async () => {
    await publishDisplay(commits.valid, { base_sha: commits['deploy-only'] });

    const result = await requestScript(queryFor(commits.valid, 'deploy'));

    expect(result).toMatchObject({
      status: 409,
      body: { ok: false, error: 'stale_declaration' }
    });
  });

  test('rejects undeclared lane', async () => {
    await publishDisplay(commits['deploy-only']);

    const result = await requestScript(
      queryFor(commits['deploy-only'], 'verify')
    );

    expect(result).toMatchObject({
      status: 404,
      body: { ok: false, error: 'lane_not_declared' }
    });
  });

  test('rejects oversized blob', async () => {
    await publishDisplay(commits.large);

    const result = await requestScript(queryFor(commits.large, 'deploy'));

    expect(result).toMatchObject({
      status: 413,
      body: { ok: false, error: 'too_large' }
    });
  });

  test('rejects NUL content', async () => {
    await publishDisplay(commits.nul);

    const result = await requestScript(queryFor(commits.nul, 'deploy'));

    expect(result).toMatchObject({
      status: 415,
      body: { ok: false, error: 'unsupported_content' }
    });
  });

  test('rejects invalid UTF-8 blob', async () => {
    await publishDisplay(commits['invalid-utf8']);

    const result = await requestScript(
      queryFor(commits['invalid-utf8'], 'deploy')
    );

    expect(result).toMatchObject({
      status: 415,
      body: { ok: false, error: 'unsupported_content' }
    });
  });
});
