import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  __resetRepoOpsDisplayForTest,
  recordRepoOpsDisplay,
  repoOpsVerifyReceiptState
} from '../worker/repo-ops-display.js';
import { decorateQueue, effectiveVerifyPolicy } from './worker-handlers.js';

const WS = '/tmp/example-workspace/project-a';
const BASE_SHA = 'a'.repeat(40);

/**
 * @param {Record<string, any>} [patch]
 * @returns {import('../worker/repo-ops-display.js').RepoOpsDisplay}
 */
function declaredRepoOps(patch = {}) {
  return {
    status: /** @type {const} */ ('resolved'),
    source_path: 'repo-ops/config.toml',
    base_ref: 'main',
    base_sha: BASE_SHA,
    verify: { script: 'repo-ops/script/verify', timeout_ms: 300_000 },
    deploy: { script: 'repo-ops/script/deploy', timeout_ms: 600_000 },
    error_code: null,
    ...patch
  };
}

/**
 * @param {Record<string, unknown>} [extra]
 */
function bareQueue(extra = {}) {
  return {
    revision: 1,
    auto_advance: false,
    auto_merge: false,
    queue: [],
    pr_wait: [],
    done: [],
    attempts: {},
    ...extra
  };
}

beforeEach(() => {
  __resetRepoOpsDisplayForTest();
  recordRepoOpsDisplay(WS, /** @type {any} */ (declaredRepoOps()));
});

afterEach(() => {
  __resetRepoOpsDisplayForTest();
});

describe('effectiveVerifyPolicy (UI-lsti §3)', () => {
  test('reports a declared verify lane as present', () => {
    const policy = effectiveVerifyPolicy(declaredRepoOps(), bareQueue());

    expect(policy).toEqual({
      declaration_state: 'present',
      base_sha: BASE_SHA
    });
  });

  test('reports an opted-out verify lane as absent', () => {
    const policy = effectiveVerifyPolicy(
      declaredRepoOps(),
      bareQueue({ repo_ops_opt_out: { verify: true, deploy: false } })
    );

    expect(policy).toEqual({ declaration_state: 'absent', base_sha: BASE_SHA });
  });

  test('leaves the verify lane present when only deploy is opted out', () => {
    const policy = effectiveVerifyPolicy(
      declaredRepoOps(),
      bareQueue({ repo_ops_opt_out: { verify: false, deploy: true } })
    );

    expect(policy.declaration_state).toBe('present');
  });

  test('reads a queue with no opt-out key as nothing opted out', () => {
    const policy = effectiveVerifyPolicy(declaredRepoOps(), bareQueue());

    expect(policy.declaration_state).toBe('present');
  });

  test('keeps an invalid declaration invalid rather than absent', () => {
    const policy = effectiveVerifyPolicy(
      declaredRepoOps({
        status: 'error',
        error_code: 'repo_ops_config_invalid'
      }),
      bareQueue({ repo_ops_opt_out: { verify: false, deploy: false } })
    );

    expect(policy.declaration_state).toBe('invalid');
  });

  test('drops a matching verify receipt so no verify badge survives the opt-out', () => {
    const receipt = { effective_base_sha: BASE_SHA, ok: true };
    const policy = effectiveVerifyPolicy(
      declaredRepoOps(),
      bareQueue({ repo_ops_opt_out: { verify: true, deploy: false } })
    );

    expect(repoOpsVerifyReceiptState(policy, receipt)).toEqual({
      declaration_state: 'absent',
      receipt: null
    });
  });
});

describe('decorateQueue repo_ops_opt_out projection (UI-lsti §3)', () => {
  test('carries the durable opt-out setting to the client', () => {
    const out = /** @type {any} */ (
      decorateQueue(
        WS,
        bareQueue({ repo_ops_opt_out: { verify: true, deploy: false } })
      )
    );

    expect(out.repo_ops_opt_out).toEqual({ verify: true, deploy: false });
  });

  test('reads a legacy queue with no key as both kinds running', () => {
    const out = /** @type {any} */ (decorateQueue(WS, bareQueue()));

    expect(out.repo_ops_opt_out).toEqual({ verify: false, deploy: false });
  });

  test('keeps showing the declared scripts while a kind is opted out', () => {
    const out = /** @type {any} */ (
      decorateQueue(
        WS,
        bareQueue({ repo_ops_opt_out: { verify: true, deploy: true } })
      )
    );

    expect(out.workspace_info.repo_ops.verify).toEqual({
      script: 'repo-ops/script/verify',
      timeout_ms: 300_000
    });
    expect(out.workspace_info.repo_ops.deploy).toEqual({
      script: 'repo-ops/script/deploy',
      timeout_ms: 600_000
    });
  });
});
