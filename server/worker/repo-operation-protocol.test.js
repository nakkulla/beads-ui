import { describe, expect, test } from 'vitest';
import { decorateQueue } from '../ws/worker-handlers.js';

/**
 * @param {Record<string, any>} [patch]
 */
function failedDeployOperation(patch = {}) {
  return {
    schema: 1,
    repo_id: '/repo',
    kind: 'deploy',
    subjects: [{ bead_id: 'UI-a', merged_sha: 'a'.repeat(40) }],
    effective_base_sha: 'b'.repeat(40),
    target_base: 'main',
    target_sha: 'c'.repeat(40),
    target_tree: 'd'.repeat(40),
    verify_head_sha: null,
    deploy_worktree: '/repo/.worktrees/.repo-ops-deploy',
    script_object_type: 'blob',
    script_path: 'repo-ops/script/deploy',
    script_mode: '100755',
    script_blob_sha: 'e'.repeat(40),
    state: 'failed',
    attempt_id: 'op-1:1',
    requested_at: 1000,
    started_at: 1100,
    finished_at: 1600,
    process_identity: null,
    log_path: null,
    log_digest: 'f'.repeat(64),
    exit_code: 2,
    signal: null,
    failure: {
      code: 'script_failed',
      fingerprint: 'ab'.repeat(32),
      detail: 'token=supersecretvalue',
      interrupted: false
    },
    repair: {
      chain_id: 'op-1',
      owner_bead: 'UI-a',
      auto_budget: 1,
      auto_used: 1,
      session_id: 'sess-9',
      attempt_id: 'att-9'
    },
    superseded_by: null,
    bootstrap_provenance: null,
    ...patch
  };
}

/**
 * @param {Record<string, any>} [operations]
 */
function decorateWith(operations = {}) {
  return decorateQueue('/workspace', {
    revision: 1,
    queue: [],
    pr_wait: [],
    done: [],
    attempts: { 'att-9': { attempt_id: 'att-9', status: 'running' } },
    auto_repair: true,
    repo_operations: operations
  });
}

describe('RepoOperation protocol projection', () => {
  test('carries the durable auto_repair value', () => {
    const decorated = decorateWith();

    expect(decorated.auto_repair).toBe(true);
  });

  test('reads an absent auto_repair key as on', () => {
    const decorated = decorateQueue('/workspace', {
      revision: 1,
      queue: [],
      pr_wait: [],
      done: [],
      attempts: {}
    });

    expect(decorated.auto_repair).toBe(true);
  });

  test('carries a stored auto_repair off', () => {
    const decorated = decorateQueue('/workspace', {
      revision: 1,
      queue: [],
      pr_wait: [],
      done: [],
      attempts: {},
      auto_repair: false
    });

    expect(decorated.auto_repair).toBe(false);
  });

  test('projects operations as an ordered card list', () => {
    const decorated = decorateWith({ 'op-1': failedDeployOperation() });

    expect(
      /** @type {any[]} */ (decorated.repo_operations).map(
        (card) => card.operation_id
      )
    ).toEqual(['op-1']);
  });

  test('shows kind, target sha and tree on the card', () => {
    const decorated = decorateWith({ 'op-1': failedDeployOperation() });

    const card = /** @type {any[]} */ (decorated.repo_operations)[0];

    expect([card.kind, card.target_sha, card.target_tree]).toEqual([
      'deploy',
      'c'.repeat(40),
      'd'.repeat(40)
    ]);
  });

  test('shows the script path and pinned blob on the card', () => {
    const decorated = decorateWith({ 'op-1': failedDeployOperation() });

    const card = /** @type {any[]} */ (decorated.repo_operations)[0];

    expect([card.script_path, card.script_blob_sha]).toEqual([
      'repo-ops/script/deploy',
      'e'.repeat(40)
    ]);
  });

  test('computes elapsed time from the recorded timestamps', () => {
    const decorated = decorateWith({ 'op-1': failedDeployOperation() });

    const card = /** @type {any[]} */ (decorated.repo_operations)[0];

    expect(card.elapsed_ms).toBe(500);
  });

  test('carries the exit code and the full log path', () => {
    const decorated = decorateWith({
      'op-1': failedDeployOperation({ log_path: '/logs/op-1.log' })
    });

    const card = /** @type {any[]} */ (decorated.repo_operations)[0];

    expect([card.exit_code, card.log_path]).toEqual([2, '/logs/op-1.log']);
  });

  test('redacts credential-shaped text from the failure detail', () => {
    const decorated = decorateWith({ 'op-1': failedDeployOperation() });

    const card = /** @type {any[]} */ (decorated.repo_operations)[0];

    expect(card.failure.detail).toBe('[redacted]');
  });

  test('classifies a failed deploy script with the pinned contract vocabulary', () => {
    const decorated = decorateWith({ 'op-1': failedDeployOperation() });

    const card = /** @type {any[]} */ (decorated.repo_operations)[0];

    expect([card.failure_kind, card.repair_eligible]).toEqual([
      'deploy_script_failure',
      true
    ]);
  });

  test('projects a superseded failure as ineligible for repair', () => {
    const decorated = decorateWith({
      'op-1': failedDeployOperation({ superseded_by: 'op-2' })
    });

    const card = /** @type {any[]} */ (decorated.repo_operations)[0];

    expect(card.repair_eligible).toBe(false);
  });

  test('links the repair session and its live attempt status', () => {
    const decorated = decorateWith({ 'op-1': failedDeployOperation() });

    const card = /** @type {any[]} */ (decorated.repo_operations)[0];

    expect([
      card.repair.session_id,
      card.repair.attempt_id,
      card.repair.attempt_status
    ]).toEqual(['sess-9', 'att-9', 'running']);
  });

  test('reports the remaining automatic budget for the chain', () => {
    const decorated = decorateWith({ 'op-1': failedDeployOperation() });

    const card = /** @type {any[]} */ (decorated.repo_operations)[0];

    expect(card.repair.remaining).toBe(0);
  });

  test('projects the three policy lists from the pinned contract', () => {
    const decorated = decorateWith();

    const policy = /** @type {any} */ (decorated.repo_operation_policy);

    expect([
      policy.worker_automatic.length,
      policy.auto_repair.eligible.length,
      policy.never_automatic.length
    ]).toEqual([7, 3, 8]);
  });

  test('names the dotfiles commit the policy copy is pinned to', () => {
    const decorated = decorateWith();

    const policy = /** @type {any} */ (decorated.repo_operation_policy);

    expect(policy.source_commit).toBe(
      '23dedc763575689b66ecc32429d1130d5f81b081'
    );
  });

  test('drops an unreadable operation record instead of projecting it', () => {
    const decorated = decorateWith({ 'op-bad': { state: 'running' } });

    expect(decorated.repo_operations).toEqual([]);
  });

  test('projects the acknowledgement mark on a dismissed row (UI-q0uy §4.6-2)', () => {
    const decorated = decorateWith({
      'op-1': failedDeployOperation({ dismissed: { at: 42, by: 'user' } })
    });

    expect(
      /** @type {any[]} */ (decorated.repo_operations)[0].dismissed
    ).toEqual({ at: 42, by: 'user' });
  });

  test('leaves an unacknowledged row null rather than absent', () => {
    const decorated = decorateWith({ 'op-1': failedDeployOperation() });

    expect(
      /** @type {any[]} */ (decorated.repo_operations)[0].dismissed
    ).toBeNull();
  });
});

describe('workspace_info.repo_ops projection (UI-q0uy §4.6-1)', () => {
  test('reports an unfilled cache as pending rather than absent', () => {
    const decorated = decorateWith();

    expect(/** @type {any} */ (decorated.workspace_info).repo_ops.status).toBe(
      'pending'
    );
  });

  test('keeps the legacy verify_cmd decoration alongside it', () => {
    const decorated = decorateWith();

    expect('verify_cmd' in /** @type {any} */ (decorated.workspace_info)).toBe(
      true
    );
  });
});
