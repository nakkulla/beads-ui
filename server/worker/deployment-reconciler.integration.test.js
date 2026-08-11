import { execFile, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  bindingFromEnv,
  publishAdapterFailure,
  runAdapter,
  runRestartHelper
} from '../../scripts/managed-self-deploy.js';
import { readRuntimeMarker, writeRuntimeMarker } from '../runtime-identity.js';
import {
  managedJournalPath,
  releasePath,
  runtimePointerPath
} from './deployment-paths.js';
import { createDeploymentReconciler } from './deployment-reconciler.js';
import { createLockManager } from './locks.js';
import { advanceManagedState, readManagedState } from './managed-state.js';
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

/**
 * @param {string} root
 */
function crashGitFixture(root) {
  const remote = path.join(root, 'remote.git');
  const seed = path.join(root, 'seed');
  const repo = path.join(root, 'shared');
  fs.mkdirSync(seed, { recursive: true });
  git(root, ['init', '--bare', '--initial-branch=main', remote]);
  git(seed, ['init', '-b', 'main']);
  git(seed, ['config', 'user.name', 'Test']);
  git(seed, ['config', 'user.email', 'test@example.test']);
  fs.writeFileSync(path.join(seed, 'base.txt'), 'merge floor\n');
  fs.writeFileSync(path.join(seed, 'package-lock.json'), '{}\n');
  git(seed, ['add', 'base.txt', 'package-lock.json']);
  git(seed, ['commit', '-m', 'floor']);
  const merged_floor_sha = git(seed, ['rev-parse', 'HEAD']);
  git(seed, ['remote', 'add', 'origin', remote]);
  git(seed, ['push', '-u', 'origin', 'main']);

  fs.writeFileSync(path.join(seed, 'candidate.txt'), 'candidate\n');
  git(seed, ['add', 'candidate.txt']);
  git(seed, ['commit', '-m', 'candidate']);
  const candidate_sha = git(seed, ['rev-parse', 'HEAD']);
  git(seed, ['push', 'origin', 'main']);

  git(root, ['clone', remote, repo]);
  git(repo, ['checkout', '-b', 'feature', merged_floor_sha]);
  fs.appendFileSync(path.join(repo, 'base.txt'), 'user tracked dirt\n');
  fs.writeFileSync(path.join(repo, 'user-dirty.txt'), 'preserve me\n');
  return {
    remote,
    seed,
    repo,
    merged_floor_sha,
    candidate_sha,
    shared_head: git(repo, ['rev-parse', 'HEAD']),
    shared_status: git(repo, ['status', '--porcelain'])
  };
}

/**
 * @param {{ source_repo: string, source_sha: string }} input
 */
async function startFakeRuntime(input) {
  /** @type {any} */
  let identity = null;
  const server = http.createServer((request, response) => {
    if (request.url !== '/healthz') {
      response.writeHead(404).end();
      return;
    }
    response.writeHead(200, { 'content-type': 'application/json' });
    response.end(JSON.stringify({ ok: true, runtime: identity }));
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => resolve(undefined));
  });
  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('fake_runtime_address_missing');
  }
  identity = {
    protocol_version: 1,
    pid: 77,
    process_started_at: 1000,
    started_at: '2026-08-11T00:00:00.000Z',
    instance_id: '11111111-2222-4333-8444-555555555555',
    source_repo: input.source_repo,
    source_sha: input.source_sha,
    host: '127.0.0.1',
    port: address.port,
    health_path: '/healthz'
  };
  return {
    identity,
    close: () =>
      new Promise((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve(undefined)));
      })
  };
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

  test.each([
    ['before helper spawn', 'spawn_before', 1],
    ['after helper spawn and before prerecord', 'spawn_after', 1],
    ['after prerecord and before commit', 'prerecord', 1],
    ['after restart and before receipt rename', 'postcommit', 0]
  ])(
    'recovers %s without duplicate restart or candidate drift',
    async (_label, crash_window, expected_retry_count) => {
      const root = path.join(tmp, crash_window);
      fs.mkdirSync(root, { recursive: true });
      const fixture = crashGitFixture(root);
      const data_home = path.join(root, 'data');
      const state_home = path.join(root, 'state');
      process.env.XDG_DATA_HOME = data_home;
      process.env.XDG_STATE_HOME = state_home;
      const fake_bin = path.join(root, 'bin');
      const fake_shared = path.join(fake_bin, 'bdui-shared');
      const restart_log = path.join(root, 'restart.log');
      fs.mkdirSync(fake_bin, { recursive: true });
      fs.writeFileSync(
        fake_shared,
        '#!/bin/sh\nset -eu\ntest "$1" = restart\nprintf "restart\\n" >> "$BDUI_FAKE_RESTART_LOG"\n',
        { mode: 0o755 }
      );

      let clock = 1000;
      let mode = crash_window;
      let attempt_index = 0;
      let token_index = 0;
      let remote_advanced = false;
      /** @type {string|null} */
      let latest_release = null;
      /** @type {Awaited<ReturnType<typeof startFakeRuntime>>|null} */
      let runtime = null;
      const verify_candidate = vi.fn(async (input) => {
        expect(git(input.source_path, ['rev-parse', 'HEAD'])).toBe(
          fixture.candidate_sha
        );
        if (!remote_advanced) {
          remote_advanced = true;
          fs.appendFileSync(
            path.join(fixture.seed, 'base.txt'),
            'remote drift\n'
          );
          git(fixture.seed, ['add', 'base.txt']);
          git(fixture.seed, ['commit', '-m', 'advance after pin']);
          git(fixture.seed, ['push', 'origin', 'main']);
        }
        return { ok: true };
      });
      const run_managed_adapter = vi.fn(async (input) => {
        latest_release = input.release_path;
        /** @type {any} */
        const adapter_input = {
          env: input.env,
          runGit: gitRun,
          runInstall: async (/** @type {{ cwd: string }} */ command) => {
            fs.mkdirSync(path.join(command.cwd, 'node_modules'), {
              recursive: true
            });
          },
          randomToken: () => `token-${++token_index}-00000000`,
          processController: {
            probe: () => ({ state: 'gone' })
          }
        };
        if (mode === 'spawn_before') {
          adapter_input.spawnHelper = () => {
            throw new Error('helper_spawn_crash');
          };
        } else {
          adapter_input.spawnHelper = () => ({ pid: 42, unref() {} });
        }
        if (mode === 'spawn_after') {
          adapter_input.waitForAck = async () => null;
        } else if (mode === 'prerecord') {
          /** @type {any} */
          let prerecorded = null;
          adapter_input.waitForAck = async (/** @type {any} */ ack_input) => {
            const parsed = bindingFromEnv(input.env, runtimePointerPath());
            if (!parsed.ok) {
              throw new Error(parsed.reason);
            }
            const journal_path = managedJournalPath(
              parsed.binding.repo,
              parsed.binding.attempt_id
            );
            const current = readManagedState({
              journal_path,
              binding: parsed.binding
            });
            if (!current.ok) {
              throw new Error(current.reason);
            }
            prerecorded = advanceManagedState({
              journal_path,
              expected_revision: current.revision,
              expected_digest: current.digest,
              state: {
                ...current.state,
                stage: 'restart_prerecorded',
                helper: {
                  pid: ack_input.helper_pid,
                  pgid: ack_input.helper_pid,
                  started_at: 1
                }
              }
            });
            if (!prerecorded.ok) {
              throw new Error(prerecorded.reason);
            }
            return prerecorded.state;
          };
          adapter_input.waitForHandoff = async () => ({
            state: 'precommit_gone',
            current: prerecorded?.state
          });
        } else if (mode === 'restart' || mode === 'postcommit') {
          adapter_input.waitForAck = async (/** @type {any} */ ack_input) => {
            const parsed = bindingFromEnv(input.env, runtimePointerPath());
            if (!parsed.ok) {
              throw new Error(parsed.reason);
            }
            const helper = await runRestartHelper({
              journal_path: managedJournalPath(
                parsed.binding.repo,
                parsed.binding.attempt_id
              ),
              binding: parsed.binding,
              expected_generation: ack_input.generation,
              expected_launch_token: ack_input.launch_token,
              identity: { pid: 42, pgid: 42, started_at: 1 },
              restart: async () => {
                execFileSync(fake_shared, ['restart'], {
                  env: {
                    ...process.env,
                    BDUI_FAKE_RESTART_LOG: restart_log
                  }
                });
              }
            });
            if (!helper.ok) {
              throw new Error(helper.reason);
            }
            return helper.state;
          };
          adapter_input.waitForParentExit = async () => {};
        }

        const result = await runAdapter(adapter_input);
        if (mode === 'restart' || mode === 'postcommit') {
          if (result.ok || result.reason !== 'restart_handoff_pending') {
            throw new Error(`unexpected_restart_result:${result.reason}`);
          }
          throw new Error('old_server_terminated');
        }
        if (result.ok) {
          return { ok: true };
        }
        const published = publishAdapterFailure(input.env, result);
        if (!published.ok) {
          throw new Error(published.reason);
        }
        return {
          ok: false,
          reason: 'adapter_exit_nonzero',
          retryable: false
        };
      });
      const createReconciler = (/** @type {any} */ store) =>
        createDeploymentReconciler({
          workspace: fixture.repo,
          repo: fixture.repo,
          store,
          locks: createLockManager(),
          gitRun,
          resolveBase: async () => {
            const fetched = await gitRun(
              ['fetch', '--no-tags', 'origin', 'main'],
              { cwd: fixture.repo }
            );
            const base = await gitRun(['rev-parse', 'origin/main'], {
              cwd: fixture.repo
            });
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
              cmd: ['scripts/managed-self-deploy.js'],
              timeout_ms: 5000,
              detached: false,
              adapter: 'managed'
            }
          }),
          verifyCandidate: verify_candidate,
          runManagedAdapter: run_managed_adapter,
          runWorkspaceAdapter: async () => ({ ok: false }),
          attemptId: () => `deploy-${++attempt_index}`,
          now: () => clock
        });

      try {
        let store = createQueueStore();
        let reconciler = createReconciler(store);
        if (crash_window === 'postcommit') {
          await expect(
            reconciler.reconcile({
              bead_id: 'UI-crash',
              target_base: 'main',
              merged_floor_sha: fixture.merged_floor_sha
            })
          ).rejects.toThrow('old_server_terminated');
        } else {
          const first = await reconciler.reconcile({
            bead_id: 'UI-crash',
            target_base: 'main',
            merged_floor_sha: fixture.merged_floor_sha
          });
          expect(first).toMatchObject({
            ok: false,
            pending: true,
            failure_code: 'helper_spawn_timeout',
            retry_count: 1
          });
          if (!('retry_at' in first) || typeof first.retry_at !== 'number') {
            throw new Error('retry_schedule_missing');
          }
          expect(fs.existsSync(restart_log)).toBe(false);
          clock = first.retry_at + 1;
          mode = 'restart';
          store = createQueueStore();
          reconciler = createReconciler(store);
          await expect(
            reconciler.reconcile({
              bead_id: 'UI-crash',
              target_base: 'main',
              merged_floor_sha: fixture.merged_floor_sha
            })
          ).rejects.toThrow('old_server_terminated');
        }

        store = createQueueStore();
        const crashed = store.snapshot(fixture.repo).reconcile['UI-crash'];
        expect(crashed).toMatchObject({
          attempt_id: 'deploy-1',
          candidate_sha: fixture.candidate_sha,
          adapter: 'managed',
          stage: 'restarting',
          retry_count: expected_retry_count
        });
        expect(attempt_index).toBe(1);
        expect(latest_release).not.toBeNull();
        if (latest_release === null) {
          throw new Error('managed_release_missing');
        }
        runtime = await startFakeRuntime({
          source_repo: fs.realpathSync(latest_release),
          source_sha: fixture.candidate_sha
        });
        expect(writeRuntimeMarker({ identity: runtime.identity })).toEqual({
          ok: true
        });
        expect(readRuntimeMarker()).toEqual({
          ok: true,
          identity: runtime.identity
        });

        mode = 'recover';
        reconciler = createReconciler(store);
        const recovered = await reconciler.reconcile({
          bead_id: 'UI-crash',
          target_base: 'main',
          merged_floor_sha: fixture.merged_floor_sha
        });
        expect(recovered).toMatchObject({
          ok: true,
          status: 'complete',
          candidate_sha: fixture.candidate_sha
        });
        if (
          !recovered.ok ||
          !('receipt_path' in recovered) ||
          typeof recovered.receipt_path !== 'string' ||
          !('receipt_digest' in recovered) ||
          typeof recovered.receipt_digest !== 'string'
        ) {
          throw new Error('recovery_receipt_missing');
        }
        const receipt_before = fs.readFileSync(recovered.receipt_path);
        const adapter_calls = run_managed_adapter.mock.calls.length;
        const reused = await reconciler.reconcile({
          bead_id: 'UI-crash',
          target_base: 'main',
          merged_floor_sha: fixture.merged_floor_sha
        });
        const health_response = await fetch(
          `http://${runtime.identity.host}:${runtime.identity.port}/healthz`
        );
        const health = await health_response.json();
        const final_record = store.snapshot(fixture.repo).reconcile['UI-crash'];

        expect(reused).toMatchObject({
          ok: true,
          status: 'reused',
          receipt_digest: recovered.receipt_digest
        });
        expect(run_managed_adapter).toHaveBeenCalledTimes(adapter_calls);
        expect(fs.readFileSync(recovered.receipt_path)).toEqual(receipt_before);
        expect(fs.readFileSync(restart_log, 'utf8').trim().split('\n')).toEqual(
          ['restart']
        );
        expect(final_record).toMatchObject({
          attempt_id: 'deploy-1',
          candidate_sha: fixture.candidate_sha,
          stage: 'complete',
          retry_count: expected_retry_count,
          receipt_digest: recovered.receipt_digest
        });
        expect(fs.realpathSync(runtimePointerPath())).toBe(
          fs.realpathSync(releasePath(fixture.repo, fixture.candidate_sha))
        );
        expect(health_response.status).toBe(200);
        expect(health).toEqual({ ok: true, runtime: runtime.identity });
        expect(
          git(releasePath(fixture.repo, fixture.candidate_sha), [
            'rev-parse',
            'HEAD'
          ])
        ).toBe(fixture.candidate_sha);
        expect(git(fixture.repo, ['rev-parse', 'HEAD'])).toBe(
          fixture.shared_head
        );
        expect(git(fixture.repo, ['status', '--porcelain'])).toBe(
          fixture.shared_status
        );
        expect(git(fixture.seed, ['rev-parse', 'HEAD'])).not.toBe(
          fixture.candidate_sha
        );
      } finally {
        await runtime?.close();
      }
    },
    30_000
  );
});
