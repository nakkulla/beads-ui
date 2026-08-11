import { execFile, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { releasePath } from './deployment-paths.js';
import { createDeploymentReconciler } from './deployment-reconciler.js';
import { createLockManager } from './locks.js';
import { createQueueStore } from './queue-store.js';

/** @type {string} */
let tmp;
/** @type {string|undefined} */
let prior_data_home;
/** @type {string|undefined} */
let prior_state_home;

beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-reconcile-git-'));
  prior_data_home = process.env.XDG_DATA_HOME;
  prior_state_home = process.env.XDG_STATE_HOME;
  process.env.XDG_DATA_HOME = path.join(tmp, 'data');
  process.env.XDG_STATE_HOME = path.join(tmp, 'state');
});

afterEach(() => {
  if (prior_data_home === undefined) {
    delete process.env.XDG_DATA_HOME;
  } else {
    process.env.XDG_DATA_HOME = prior_data_home;
  }
  if (prior_state_home === undefined) {
    delete process.env.XDG_STATE_HOME;
  } else {
    process.env.XDG_STATE_HOME = prior_state_home;
  }
  fs.rmSync(tmp, { recursive: true, force: true });
});

/**
 * @param {string} cwd
 * @param {string[]} args
 */
function git(cwd, args) {
  return execFileSync('git', args, { cwd, encoding: 'utf8' }).trim();
}

/**
 * @param {string[]} args
 * @param {{ cwd?: string }} options
 */
function gitRun(args, options) {
  return new Promise((resolve) => {
    execFile('git', args, { cwd: options.cwd }, (error, stdout, stderr) => {
      resolve({
        code: error && typeof error.code === 'number' ? error.code : 0,
        stdout: String(stdout),
        stderr: String(stderr)
      });
    });
  });
}

/**
 * @param {string} file
 */
function managedAdapterSource(file) {
  return `#!/usr/bin/env node
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const env = process.env;
const source_head = require('node:child_process')
  .execFileSync('git', ['rev-parse', 'HEAD'], { cwd: env.BDUI_DEPLOY_RELEASE_PATH, encoding: 'utf8' })
  .trim();
const action_outcomes = [{ action: 'candidate-local-adapter', outcome: 'success' }];
const receipt = {
  protocol_version: 1,
  repo: env.BDUI_DEPLOY_SOURCE_REPO,
  target_remote: env.BDUI_DEPLOY_TARGET_REMOTE,
  target_base: env.BDUI_DEPLOY_TARGET_BASE,
  attempt_id: env.BDUI_DEPLOY_ATTEMPT_ID,
  merged_floor_sha: env.BDUI_DEPLOY_MERGED_FLOOR_SHA,
  candidate_sha: env.BDUI_DEPLOY_CANDIDATE_SHA,
  verify: { candidate_sha: env.BDUI_DEPLOY_CANDIDATE_SHA, outcome: 'success' },
  previous_marker: null,
  deployed_marker: env.BDUI_DEPLOY_CANDIDATE_SHA,
  action_plan_digest: crypto.createHash('sha256').update(JSON.stringify(action_outcomes)).digest('hex'),
  action_outcomes,
  deployment_source: { path: env.BDUI_DEPLOY_RELEASE_PATH, head_sha: source_head },
  readback: {
    outcome: 'success',
    deployed_marker: env.BDUI_DEPLOY_CANDIDATE_SHA,
    source_path: env.BDUI_DEPLOY_RELEASE_PATH,
    source_head
  },
  outcome: 'success',
  completed_at: new Date().toISOString()
};
fs.mkdirSync(path.dirname(env.BDUI_DEPLOY_RECEIPT_PATH), { recursive: true });
fs.writeFileSync(env.BDUI_DEPLOY_RECEIPT_PATH + '.tmp', JSON.stringify(receipt));
fs.renameSync(env.BDUI_DEPLOY_RECEIPT_PATH + '.tmp', env.BDUI_DEPLOY_RECEIPT_PATH);
fs.writeFileSync(env.BDUI_DEPLOY_RECEIPT_PATH + '.marker', source_head);
// ${file}
`;
}

describe('worker/deployment-reconciler real git integration', () => {
  test('deploys a fixed candidate from an independent release while remote and shared checkout drift', async () => {
    const remote = path.join(tmp, 'remote.git');
    const seed = path.join(tmp, 'seed');
    const repo = path.join(tmp, 'shared');
    fs.mkdirSync(seed, { recursive: true });
    git(tmp, ['init', '--bare', remote]);
    git(seed, ['init', '-b', 'main']);
    git(seed, ['config', 'user.name', 'Test']);
    git(seed, ['config', 'user.email', 'test@example.test']);
    fs.writeFileSync(path.join(seed, 'base.txt'), 'merge floor\n');
    git(seed, ['add', 'base.txt']);
    git(seed, ['commit', '-m', 'floor']);
    const merged_floor_sha = git(seed, ['rev-parse', 'HEAD']);
    git(seed, ['remote', 'add', 'origin', remote]);
    git(seed, ['push', '-u', 'origin', 'main']);

    const adapter_file = path.join(seed, 'deploy.cjs');
    fs.writeFileSync(adapter_file, managedAdapterSource(adapter_file), {
      mode: 0o755
    });
    git(seed, ['add', 'deploy.cjs']);
    git(seed, ['commit', '-m', 'candidate adapter']);
    const candidate_sha = git(seed, ['rev-parse', 'HEAD']);
    git(seed, ['push', 'origin', 'main']);

    git(tmp, ['clone', remote, repo]);
    git(repo, ['checkout', '-b', 'feature', merged_floor_sha]);
    fs.writeFileSync(path.join(repo, 'user-dirty.txt'), 'preserve me\n');
    const shared_head_before = git(repo, ['rev-parse', 'HEAD']);
    const shared_status_before = git(repo, ['status', '--porcelain']);
    const store = createQueueStore();
    const run_verify = vi.fn(async (input) => {
      expect(git(input.source_path, ['rev-parse', 'HEAD'])).toBe(candidate_sha);
      expect(input.candidate_sha).toBe(candidate_sha);
      fs.appendFileSync(path.join(seed, 'base.txt'), 'remote advanced\n');
      git(seed, ['add', 'base.txt']);
      git(seed, ['commit', '-m', 'advance after pin']);
      git(seed, ['push', 'origin', 'main']);
      return { ok: true };
    });
    const reconciler = createDeploymentReconciler({
      workspace: repo,
      repo,
      store,
      locks: createLockManager(),
      gitRun,
      resolveBase: async () => {
        const fetched = await gitRun(['fetch', '--no-tags', 'origin', 'main'], {
          cwd: repo
        });
        const base = await gitRun(['rev-parse', 'origin/main'], { cwd: repo });
        return {
          ok: fetched.code === 0 && base.code === 0,
          base: 'main',
          declared: true,
          remote: 'origin',
          remote_ref: 'refs/remotes/origin/main',
          base_oid: base.stdout.trim(),
          local_only: false
        };
      },
      resolveDeploy: async () => ({
        state: 'resolved',
        source: 'declaration',
        value: {
          cmd: ['./deploy.cjs'],
          timeout_ms: 5000,
          detached: false,
          adapter: 'managed'
        }
      }),
      verifyCandidate: run_verify,
      runWorkspaceAdapter: async () => ({ ok: false })
    });

    const first = await reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha
    });
    const second = await reconciler.reconcile({
      bead_id: 'UI-2',
      target_base: 'main',
      merged_floor_sha: candidate_sha
    });

    expect(first).toMatchObject({
      ok: true,
      status: 'complete',
      candidate_sha
    });
    if (
      !first.ok ||
      !('receipt_path' in first) ||
      typeof first.receipt_path !== 'string' ||
      !('receipt_digest' in first) ||
      typeof first.receipt_digest !== 'string'
    ) {
      throw new Error('first reconcile did not return receipt evidence');
    }
    expect(second).toMatchObject({
      ok: true,
      status: 'reused',
      candidate_sha,
      receipt_digest: first.receipt_digest
    });
    expect(run_verify).toHaveBeenCalledTimes(1);
    expect(git(releasePath(repo, candidate_sha), ['rev-parse', 'HEAD'])).toBe(
      candidate_sha
    );
    expect(fs.readFileSync(`${first.receipt_path}.marker`, 'utf8')).toBe(
      candidate_sha
    );
    expect(git(repo, ['rev-parse', 'HEAD'])).toBe(shared_head_before);
    expect(git(repo, ['status', '--porcelain'])).toBe(shared_status_before);
    expect(git(seed, ['rev-parse', 'HEAD'])).not.toBe(candidate_sha);
  }, 15_000);
});
