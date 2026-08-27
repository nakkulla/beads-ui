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
    repo_operations: operations
  });
}

describe('RepoOperation protocol projection', () => {
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

  test('projects fetch failure classification and elapsed time', () => {
    const operation = /** @type {any} */ (failedDeployOperation());
    operation.failure = {
      ...operation.failure,
      code: 'repo_ops_fetch_failed',
      fetch_failure: 'nonzero',
      elapsed_ms: 42
    };
    const decorated = decorateWith({ 'op-1': operation });

    const card = /** @type {any[]} */ (decorated.repo_operations)[0];

    expect(card.failure).toMatchObject({
      fetch_failure: 'nonzero',
      elapsed_ms: 42
    });
  });

  test('classifies a failed deploy script with the pinned contract vocabulary', () => {
    const decorated = decorateWith({ 'op-1': failedDeployOperation() });

    const card = /** @type {any[]} */ (decorated.repo_operations)[0];

    expect(card.failure_kind).toBe('deploy_script_failure');
  });

  test('carries no repair surface on the card', () => {
    const decorated = decorateWith({ 'op-1': failedDeployOperation() });

    const card = /** @type {any[]} */ (decorated.repo_operations)[0];

    expect([
      Object.hasOwn(card, 'repair'),
      Object.hasOwn(card, 'repair_eligible')
    ]).toEqual([false, false]);
  });

  test('projects the script retry status the record carries', () => {
    const decorated = decorateWith({ 'op-1': failedDeployOperation() });

    const card = /** @type {any[]} */ (decorated.repo_operations)[0];

    expect(card.retry).toEqual({
      status: 'consumed',
      first_fingerprint: null,
      blocked_reason: null,
      absorbed: null
    });
  });

  test('projects the policy lists from the pinned contract', () => {
    const decorated = decorateWith();

    const policy = /** @type {any} */ (decorated.repo_operation_policy);

    expect([
      policy.schema_version,
      policy.worker_automatic.length,
      policy.resolution_ladder.map((/** @type {any} */ step) => step.id),
      policy.never_automatic.length
    ]).toEqual([3, 7, ['script_retry'], 8]);
  });

  test('names the dotfiles commit the policy copy is pinned to', () => {
    const decorated = decorateWith();

    const policy = /** @type {any} */ (decorated.repo_operation_policy);

    expect(policy.source_commit).toBe(
      '3c27264271c86b1bc07bc9eb293881068aca9776'
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

  test('omits the legacy verify_cmd decoration', () => {
    const decorated = decorateWith();

    expect('verify_cmd' in /** @type {any} */ (decorated.workspace_info)).toBe(
      false
    );
  });
});
