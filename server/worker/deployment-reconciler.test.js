import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  managedFailurePath,
  managedJournalPath,
  releasePath,
  releaseRoot,
  runtimePointerPath
} from './deployment-paths.js';
import {
  createDeploymentReconciler,
  managedAdapterEnvironment
} from './deployment-reconciler.js';
import { createLockManager } from './locks.js';
import {
  writeManagedFailure,
  writePrivateJsonAtomic
} from './managed-state.js';
import { createQueueStore } from './queue-store.js';

const FLOOR = 'a'.repeat(40);
const SECOND_FLOOR = 'b'.repeat(40);
const CANDIDATE = 'c'.repeat(40);

/** @type {string} */
let tmp;
/** @type {string} */
let repo;

beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-reconciler-'));
  repo = path.join(tmp, 'repo');
  fs.mkdirSync(repo, { recursive: true });
  process.env.XDG_DATA_HOME = path.join(tmp, 'data');
  process.env.XDG_STATE_HOME = path.join(tmp, 'state');
});

afterEach(() => {
  delete process.env.XDG_DATA_HOME;
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(tmp, { recursive: true, force: true });
});

/**
 * @param {{ attempt_id: string, merged_floor_sha: string, release: string }} input
 */
function receipt(input) {
  const action_outcomes = [{ action: 'apply', outcome: 'success' }];
  return {
    protocol_version: 1,
    repo: path.resolve(repo),
    target_remote: 'git@example.test:owner/repo.git',
    target_base: 'main',
    attempt_id: input.attempt_id,
    merged_floor_sha: input.merged_floor_sha,
    candidate_sha: CANDIDATE,
    verify: { candidate_sha: CANDIDATE, outcome: 'success' },
    previous_marker: null,
    deployed_marker: CANDIDATE,
    action_plan_digest: crypto
      .createHash('sha256')
      .update(JSON.stringify(action_outcomes))
      .digest('hex'),
    action_outcomes,
    deployment_source: { path: input.release, head_sha: CANDIDATE },
    readback: {
      outcome: 'success',
      deployed_marker: CANDIDATE,
      source_path: input.release,
      source_head: CANDIDATE
    },
    outcome: 'success',
    completed_at: '2026-08-11T00:00:00.000Z'
  };
}

/**
 * @param {any} input
 */
function managedBinding(input) {
  return {
    protocol_version: 1,
    repo: path.resolve(repo),
    target_remote: input.env.BDUI_DEPLOY_TARGET_REMOTE,
    target_base: input.env.BDUI_DEPLOY_TARGET_BASE,
    merged_floor_sha: input.merged_floor_sha,
    attempt_id: input.attempt_id,
    candidate_sha: input.candidate_sha,
    release_path: input.release_path,
    receipt_path: input.receipt_path,
    pointer_path: runtimePointerPath(),
    pointer_target: input.release_path
  };
}

/**
 * @param {{
 *   ancestor?: boolean,
 *   adapter?: 'managed'|'workspace',
 *   now?: () => number,
 *   runManagedAdapter?: (input: any) => Promise<any>,
 *   runWorkspaceAdapter?: (input: any) => Promise<any>,
 *   prepareCandidate?: (input: any) => Promise<any>,
 *   deployResolution?: any,
 *   remoteUrl?: string,
 *   useDefaultMaterialize?: boolean,
 *   store?: ReturnType<typeof createQueueStore>,
 *   locks?: ReturnType<typeof createLockManager>
 * }} [options]
 */
function harness(options = {}) {
  let attempt = 0;
  const store = options.store || createQueueStore();
  const locks = options.locks || createLockManager();
  const gitRun = vi.fn(async (/** @type {string[]} */ args) => {
    if (args[0] === 'merge-base') {
      return {
        code: options.ancestor === false ? 1 : 0,
        stdout: '',
        stderr: ''
      };
    }
    if (args.join(' ') === 'remote get-url origin') {
      return {
        code: 0,
        stdout: `${options.remoteUrl || 'git@example.test:owner/repo.git'}\n`,
        stderr: ''
      };
    }
    return { code: 0, stdout: '', stderr: '' };
  });
  const materializeManaged = vi.fn(async () => {
    const release = releasePath(repo, CANDIDATE);
    fs.mkdirSync(release, { recursive: true });
    return { ok: /** @type {const} */ (true), release_path: release };
  });
  const runManagedAdapter =
    options.runManagedAdapter ||
    vi.fn(async (input) => {
      fs.mkdirSync(path.dirname(input.receipt_path), { recursive: true });
      fs.writeFileSync(
        input.receipt_path,
        JSON.stringify(
          receipt({
            attempt_id: input.attempt_id,
            merged_floor_sha: input.merged_floor_sha,
            release: input.release_path
          })
        )
      );
      return { ok: true };
    });
  const runWorkspaceAdapter =
    options.runWorkspaceAdapter || vi.fn(async () => ({ ok: true }));
  const verifyCandidate = vi.fn(async () => ({ ok: true }));
  const reconciler = createDeploymentReconciler({
    workspace: repo,
    repo,
    store,
    locks,
    gitRun,
    resolveBase: async () => ({
      ok: true,
      base: 'main',
      declared: false,
      remote: 'origin',
      remote_ref: 'refs/remotes/origin/main',
      base_oid: CANDIDATE,
      local_only: false
    }),
    resolveDeploy: async () =>
      options.deployResolution || {
        state: 'resolved',
        source: 'declaration',
        value: {
          cmd: ['./deploy.sh'],
          timeout_ms: 1000,
          detached: false,
          adapter: options.adapter || 'managed'
        }
      },
    prepareCandidate: options.prepareCandidate,
    verifyCandidate,
    ...(options.useDefaultMaterialize ? {} : { materializeManaged }),
    runManagedAdapter,
    runWorkspaceAdapter,
    attemptId: () => `deploy-${++attempt}`,
    now: options.now || (() => 1000)
  });
  return {
    reconciler,
    store,
    locks,
    gitRun,
    materializeManaged,
    verifyCandidate,
    runManagedAdapter,
    runWorkspaceAdapter
  };
}

describe('worker/deployment-reconciler', () => {
  test('passes only allowlisted process values and explicit Adapter bindings', () => {
    const result = managedAdapterEnvironment(
      { BDUI_DEPLOY_CANDIDATE_SHA: CANDIDATE },
      {
        PATH: '/bin',
        LANG: 'ko_KR.UTF-8',
        GITHUB_TOKEN: 'secret',
        GH_TOKEN: 'secret-too',
        SSH_AUTH_SOCK: '/private/agent.sock'
      }
    );

    expect(result).toEqual({
      PATH: '/bin',
      LANG: 'ko_KR.UTF-8',
      BDUI_DEPLOY_CANDIDATE_SHA: CANDIDATE
    });
  });

  test('rejects credential-bearing HTTP remote identity before Adapter spawn', async () => {
    const h = harness({
      remoteUrl: 'https://token@example.test/owner/repo.git'
    });

    const result = await h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });

    expect(result).toMatchObject({
      ok: false,
      pending: true,
      reason: 'remote_url_unavailable'
    });
    expect(h.runManagedAdapter).not.toHaveBeenCalled();
  });

  test('pins, verifies, deploys, validates readback, and completes a managed candidate', async () => {
    const h = harness();

    const result = await h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });

    expect(result).toMatchObject({
      ok: true,
      status: 'complete',
      candidate_sha: CANDIDATE
    });
    expect(h.store.snapshot(repo).reconcile['UI-1']).toMatchObject({
      stage: 'complete',
      candidate_sha: CANDIDATE,
      adapter: 'managed'
    });
  });

  test('projects a bound Adapter regression as repair-owned deploy failure', async () => {
    const h = harness({
      runManagedAdapter: vi.fn(async (input) => {
        expect(
          writeManagedFailure({
            binding: managedBinding(input),
            failure: {
              failure_code: 'adapter_regression',
              retryable: false,
              detail: 'install_failed'
            }
          })
        ).toMatchObject({ ok: true });
        return {
          ok: false,
          reason: 'adapter_exit_nonzero',
          retryable: false
        };
      })
    });

    const result = await h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });

    expect(result).toMatchObject({
      ok: false,
      pending: false,
      reason: 'deploy_failed',
      failure_code: 'adapter_regression',
      retryable: false,
      detail: 'install_failed'
    });
    expect(h.store.snapshot(repo).reconcile['UI-1']).toMatchObject({
      stage: 'failed',
      terminal_failure: {
        reason: 'deploy_failed',
        failure_code: 'adapter_regression',
        retryable: false,
        detail: 'install_failed'
      }
    });
  });

  test('uses the existing attempt budget for a retryable managed failure', async () => {
    const h = harness({
      runManagedAdapter: vi.fn(async (input) => {
        writeManagedFailure({
          binding: managedBinding(input),
          failure: {
            failure_code: 'pointer_transient',
            retryable: true,
            detail: 'pointer_publish_failed'
          }
        });
        return {
          ok: false,
          reason: 'adapter_exit_nonzero',
          retryable: false
        };
      })
    });

    const result = await h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });

    expect(result).toMatchObject({
      ok: false,
      pending: true,
      reason: 'managed_pointer_transient',
      failure_code: 'pointer_transient',
      retryable: true,
      retry_count: 1
    });
    expect(h.store.snapshot(repo).reconcile['UI-1']).toMatchObject({
      attempt_id: 'deploy-1',
      candidate_sha: CANDIDATE,
      stage: 'restarting',
      retry_count: 1,
      last_retryable_reason: 'managed_pointer_transient'
    });
  });

  test('clears a stale failure record before a same-attempt retry', async () => {
    let clock = 1000;
    let calls = 0;
    const h = harness({
      now: () => clock,
      runManagedAdapter: vi.fn(async (input) => {
        calls += 1;
        if (calls === 1) {
          expect(
            writeManagedFailure({
              binding: managedBinding(input),
              failure: {
                failure_code: 'pointer_transient',
                retryable: true,
                detail: 'pointer_publish_failed'
              }
            })
          ).toMatchObject({ ok: true });
        }
        return {
          ok: false,
          reason: 'adapter_exit_nonzero',
          retryable: false
        };
      })
    });

    const first = await h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });
    if (!('retry_at' in first) || typeof first.retry_at !== 'number') {
      throw new Error('expected_retry_schedule');
    }
    clock = first.retry_at + 1;
    const second = await h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });

    expect(first).toMatchObject({
      pending: true,
      failure_code: 'pointer_transient',
      retry_count: 1
    });
    expect(second).toMatchObject({
      pending: false,
      reason: 'managed_failure_record_invalid',
      detail: 'failure_absent',
      retry_count: 1
    });
    expect(h.runManagedAdapter).toHaveBeenCalledTimes(2);
    expect(h.store.snapshot(repo).reconcile['UI-1']).toMatchObject({
      attempt_id: 'deploy-1',
      candidate_sha: CANDIDATE,
      stage: 'failed',
      retry_count: 1
    });
  });

  test('fails closed when a nonzero Adapter exit has no failure record', async () => {
    const h = harness({
      runManagedAdapter: vi.fn(async () => ({
        ok: false,
        reason: 'adapter_exit_nonzero',
        retryable: false
      }))
    });

    const result = await h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });

    expect(result).toMatchObject({
      ok: false,
      pending: false,
      reason: 'managed_failure_record_invalid',
      detail: 'failure_absent',
      retryable: false,
      retry_count: 0
    });
    expect(h.store.snapshot(repo).reconcile['UI-1']).toMatchObject({
      stage: 'failed',
      terminal_failure: {
        reason: 'managed_failure_record_invalid',
        retryable: false
      }
    });
  });

  test('fails closed on an unknown bound failure code', async () => {
    const h = harness({
      runManagedAdapter: vi.fn(async (input) => {
        const binding = managedBinding(input);
        writePrivateJsonAtomic(
          managedFailurePath(binding.repo, binding.attempt_id),
          {
            ...binding,
            journal_path: managedJournalPath(binding.repo, binding.attempt_id),
            failure_code: 'unknown_failure',
            retryable: false
          }
        );
        return {
          ok: false,
          reason: 'adapter_exit_nonzero',
          retryable: false
        };
      })
    });

    const result = await h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });

    expect(result).toMatchObject({
      ok: false,
      pending: false,
      reason: 'managed_failure_record_invalid',
      detail: 'failure_record_invalid',
      retryable: false
    });
  });

  test('persists restart progress before invoking the managed Adapter', async () => {
    const store = createQueueStore();
    const h = harness({
      store,
      runManagedAdapter: vi.fn(async (input) => {
        expect(store.snapshot(repo).reconcile['UI-1'].stage).toBe('restarting');
        fs.mkdirSync(path.dirname(input.receipt_path), { recursive: true });
        fs.writeFileSync(
          input.receipt_path,
          JSON.stringify(
            receipt({
              attempt_id: input.attempt_id,
              merged_floor_sha: input.merged_floor_sha,
              release: input.release_path
            })
          )
        );
        return { ok: true };
      })
    });

    const result = await h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });

    expect(result).toMatchObject({ ok: true, status: 'complete' });
  });

  test('fails terminally when the merge floor is not in the candidate history', async () => {
    const h = harness({ ancestor: false });

    const result = await h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });

    expect(result).toMatchObject({
      ok: false,
      pending: false,
      reason: 'merged_floor_not_ancestor'
    });
    expect(h.store.snapshot(repo).reconcile['UI-1'].stage).toBe('failed');
  });

  test('rejects a receipt bound to another attempt', async () => {
    const h = harness({
      runManagedAdapter: vi.fn(async (input) => {
        fs.mkdirSync(path.dirname(input.receipt_path), { recursive: true });
        fs.writeFileSync(
          input.receipt_path,
          JSON.stringify(
            receipt({
              attempt_id: 'wrong-attempt',
              merged_floor_sha: input.merged_floor_sha,
              release: input.release_path
            })
          )
        );
        return { ok: true };
      })
    });

    const result = await h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });

    expect(result).toMatchObject({
      ok: false,
      pending: false,
      reason: 'receipt_binding_invalid'
    });
  });

  test('rejects a receipt whose action plan digest does not bind its outcomes', async () => {
    const h = harness({
      runManagedAdapter: vi.fn(async (input) => {
        const invalid_receipt = receipt({
          attempt_id: input.attempt_id,
          merged_floor_sha: input.merged_floor_sha,
          release: input.release_path
        });
        invalid_receipt.action_outcomes = [];
        fs.mkdirSync(path.dirname(input.receipt_path), { recursive: true });
        fs.writeFileSync(input.receipt_path, JSON.stringify(invalid_receipt));
        return { ok: true };
      })
    });

    const result = await h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });

    expect(result).toMatchObject({
      ok: false,
      pending: false,
      reason: 'receipt_outcome_invalid'
    });
  });

  test('reuses one successful candidate receipt for another included floor', async () => {
    const h = harness();
    await h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });

    const result = await h.reconciler.reconcile({
      bead_id: 'UI-2',
      target_base: 'main',
      merged_floor_sha: SECOND_FLOOR
    });

    expect(result).toMatchObject({ ok: true, status: 'reused' });
    expect(h.runManagedAdapter).toHaveBeenCalledTimes(1);
    expect(h.store.snapshot(repo).reconcile['UI-2'].stage).toBe('complete');
  });

  test('serializes concurrent floors and lets the follower reuse the receipt', async () => {
    /** @type {() => void} */
    let unblock = () => {};
    const gate = new Promise((resolve) => {
      unblock = () => resolve(undefined);
    });
    const runManagedAdapter = vi.fn(async (input) => {
      await gate;
      fs.mkdirSync(path.dirname(input.receipt_path), { recursive: true });
      fs.writeFileSync(
        input.receipt_path,
        JSON.stringify(
          receipt({
            attempt_id: input.attempt_id,
            merged_floor_sha: input.merged_floor_sha,
            release: input.release_path
          })
        )
      );
      return { ok: true };
    });
    const h = harness({ runManagedAdapter });

    const first = h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });
    const second = h.reconciler.reconcile({
      bead_id: 'UI-2',
      target_base: 'main',
      merged_floor_sha: SECOND_FLOOR
    });

    expect(h.store.snapshot(repo).reconcile['UI-2']).toMatchObject({
      stage: 'queued',
      merged_floor_sha: SECOND_FLOOR
    });
    unblock();

    expect(await first).toMatchObject({ ok: true, status: 'complete' });
    expect(await second).toMatchObject({ ok: true, status: 'reused' });
    expect(runManagedAdapter).toHaveBeenCalledTimes(1);
  });

  test('resumes the same candidate and attempt after a persisted spawn failure', async () => {
    let calls = 0;
    let clock = 1000;
    const now = vi.fn(() => clock);
    const store = createQueueStore();
    const runManagedAdapter = vi.fn(async (input) => {
      calls += 1;
      if (calls === 1) {
        return { ok: false, reason: 'adapter_spawn_error', retryable: true };
      }
      fs.mkdirSync(path.dirname(input.receipt_path), { recursive: true });
      fs.writeFileSync(
        input.receipt_path,
        JSON.stringify(
          receipt({
            attempt_id: input.attempt_id,
            merged_floor_sha: input.merged_floor_sha,
            release: input.release_path
          })
        )
      );
      return { ok: true };
    });
    const first = harness({ store, runManagedAdapter, now });

    const pending = await first.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });
    const original = store.snapshot(repo).reconcile['UI-1'];
    clock = 5000;
    const resumed = harness({
      store: createQueueStore(),
      runManagedAdapter,
      now
    });
    const complete = await resumed.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });

    expect(pending).toMatchObject({ ok: false, pending: true });
    expect(complete).toMatchObject({ ok: true, status: 'complete' });
    expect(resumed.store.snapshot(repo).reconcile['UI-1']).toMatchObject({
      attempt_id: original.attempt_id,
      candidate_sha: original.candidate_sha
    });
  });

  test('completes from a terminal receipt after restart without rerunning verify or deploy', async () => {
    let clock = 0;
    const runManagedAdapter = vi.fn(async (input) => {
      fs.mkdirSync(path.dirname(input.receipt_path), { recursive: true });
      fs.writeFileSync(
        input.receipt_path,
        JSON.stringify(
          receipt({
            attempt_id: input.attempt_id,
            merged_floor_sha: input.merged_floor_sha,
            release: input.release_path
          })
        )
      );
      return {
        ok: false,
        reason: 'adapter_spawn_error',
        retryable: true
      };
    });
    const h = harness({ now: () => clock, runManagedAdapter });

    const pending = await h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });
    clock = 2000;
    const recovered = await h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });

    expect(pending).toMatchObject({ ok: false, pending: true });
    expect(recovered).toMatchObject({ ok: true, status: 'recovered' });
    expect(h.verifyCandidate).toHaveBeenCalledTimes(1);
    expect(runManagedAdapter).toHaveBeenCalledTimes(1);
  });

  test('turns the third retryable adapter failure into a terminal failure', async () => {
    let clock = 0;
    const h = harness({
      now: () => (clock += 10000),
      runManagedAdapter: vi.fn(async () => ({
        ok: false,
        reason: 'adapter_spawn_error',
        retryable: true
      }))
    });

    await h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });
    await h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });
    const result = await h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });

    expect(result).toMatchObject({
      ok: false,
      pending: false,
      reason: 'adapter_spawn_error',
      step: 'deploy'
    });
    expect(h.store.snapshot(repo).reconcile['UI-1']).toMatchObject({
      stage: 'failed',
      retry_count: 3
    });
  });

  test('starts a fresh attempt only for an explicitly authorized terminal retry', async () => {
    let calls = 0;
    let clock = 0;
    const runManagedAdapter = vi.fn(async (input) => {
      calls += 1;
      if (calls <= 3) {
        return {
          ok: false,
          reason: 'adapter_spawn_error',
          retryable: true
        };
      }
      fs.mkdirSync(path.dirname(input.receipt_path), { recursive: true });
      fs.writeFileSync(
        input.receipt_path,
        JSON.stringify(
          receipt({
            attempt_id: input.attempt_id,
            merged_floor_sha: input.merged_floor_sha,
            release: input.release_path
          })
        )
      );
      return { ok: true };
    });
    const h = harness({
      now: () => (clock += 10000),
      runManagedAdapter
    });
    await h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });
    await h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });
    await h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });
    const failed_attempt = h.store.snapshot(repo).reconcile['UI-1'].attempt_id;

    const result = await h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR,
      restart: true
    });

    expect(result).toMatchObject({ ok: true, status: 'complete' });
    expect(h.store.snapshot(repo).reconcile['UI-1'].attempt_id).not.toBe(
      failed_attempt
    );
  });

  test('rejects a symlinked release before running a git mutation', async () => {
    const outside = path.join(tmp, 'outside');
    fs.mkdirSync(releaseRoot(repo), { recursive: true });
    fs.mkdirSync(outside, { recursive: true });
    fs.symlinkSync(outside, releasePath(repo, CANDIDATE), 'dir');
    const h = harness({ useDefaultMaterialize: true });

    const result = await h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });

    expect(result).toMatchObject({
      ok: false,
      pending: false,
      reason: 'release_path_escape',
      step: 'deploy'
    });
    expect(h.gitRun).not.toHaveBeenCalledWith(['init'], {
      cwd: releasePath(repo, CANDIDATE)
    });
  });

  test('attributes an invalid deploy declaration to the deploy cleanup step', async () => {
    const h = harness({
      deployResolution: {
        state: 'invalid',
        source: 'declaration',
        detail: 'deploy.adapter must be managed or workspace'
      }
    });

    const result = await h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });

    expect(result).toMatchObject({
      ok: false,
      pending: false,
      reason: 'deploy_config_invalid',
      detail: 'deploy.adapter must be managed or workspace',
      step: 'deploy'
    });
  });

  test('keeps the legacy workspace adapter behind the same interface', async () => {
    const h = harness({ adapter: 'workspace' });

    const result = await h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });

    expect(result).toMatchObject({ ok: true, status: 'complete' });
    expect(h.runWorkspaceAdapter).toHaveBeenCalledTimes(1);
    expect(h.materializeManaged).not.toHaveBeenCalled();
  });

  test('keeps an absent workspace deploy as a successful no-op without replacing last_deploy', async () => {
    const store = createQueueStore();
    store.recordLastDeploy(repo, {
      outcome: 'deployed',
      reason: null,
      bead_id: 'UI-old',
      base_sha: FLOOR
    });
    const h = harness({
      store,
      deployResolution: { state: 'absent' },
      runWorkspaceAdapter: vi.fn(async () => ({
        ok: true,
        deployed: false
      }))
    });

    const result = await h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });

    expect(result).toMatchObject({ ok: true, status: 'complete' });
    expect(store.snapshot(repo).last_deploy).toMatchObject({
      bead_id: 'UI-old',
      base_sha: FLOOR
    });
  });

  test('returns workspace preparation evidence with the reconcile result', async () => {
    const h = harness({
      adapter: 'workspace',
      prepareCandidate: vi.fn(async () => ({
        ok: true,
        base_sync: 'fetch_only:dirty'
      }))
    });

    const result = await h.reconciler.reconcile({
      bead_id: 'UI-1',
      target_base: 'main',
      merged_floor_sha: FLOOR
    });

    expect(result).toMatchObject({
      ok: true,
      status: 'complete',
      base_sync: 'fetch_only:dirty'
    });
  });
});
