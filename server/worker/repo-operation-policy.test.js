import nodeCrypto from 'node:crypto';
import nodeFs from 'node:fs';
import { describe, expect, test } from 'vitest';
import {
  REPO_OPERATION_POLICY_PATH,
  classifyRepoOperationFailure,
  isRepairEligible,
  loadRepoOperationPolicy,
  projectRepoOperationPolicy,
  repairSessionProhibitions
} from './repo-operation-policy.js';

/**
 * The APPROVED dotfiles artifact this runtime copy is pinned to. Changing the
 * copy without re-pinning here (or re-pinning without the approved artifact)
 * fails the contract, which is the whole point of the pin.
 */
const APPROVED_SOURCE_COMMIT = '23dedc763575689b66ecc32429d1130d5f81b081';
const APPROVED_DIGEST =
  '003875ae7c87e10e30cc90cdbce8b75c85b5ca04ed3d2575bd9c4da468c5071a';

describe('pinned repo-operation policy contract', () => {
  test('matches the approved artifact digest', () => {
    const bytes = nodeFs.readFileSync(REPO_OPERATION_POLICY_PATH);

    const digest = nodeCrypto.createHash('sha256').update(bytes).digest('hex');

    expect(digest).toBe(APPROVED_DIGEST);
  });

  test('records the approved dotfiles source commit', () => {
    const { provenance } = loadRepoOperationPolicy();

    expect(provenance.source_commit).toBe(APPROVED_SOURCE_COMMIT);
  });

  test('records the same digest in the provenance file', () => {
    const { provenance, digest } = loadRepoOperationPolicy();

    expect(provenance.sha256).toBe(digest);
  });

  test('names the dotfiles artifact path it was rendered from', () => {
    const { provenance } = loadRepoOperationPolicy();

    expect(provenance.source_path).toBe(
      'generated/contracts/repo-operation-policy.json'
    );
  });

  test('projects the three policy lists from the pinned artifact', () => {
    const projected = projectRepoOperationPolicy();

    expect({
      worker_automatic: projected.worker_automatic.length,
      eligible: projected.auto_repair.eligible,
      never_automatic: projected.never_automatic.length
    }).toEqual({
      worker_automatic: 7,
      eligible: [
        'verify_script_failure',
        'deploy_script_failure',
        'interrupted_without_terminal_exit'
      ],
      never_automatic: 8
    });
  });

  test('projects the approved source commit and digest', () => {
    const projected = projectRepoOperationPolicy();

    expect([projected.source_commit, projected.digest]).toEqual([
      APPROVED_SOURCE_COMMIT,
      APPROVED_DIGEST
    ]);
  });

  test('defaults automatic repair on with one budget per chain', () => {
    const projected = projectRepoOperationPolicy();

    expect(projected.auto_repair).toMatchObject({
      default: true,
      budget_per_completion_chain: 1
    });
  });

  test('derives session prohibitions from the never-automatic enum', () => {
    const prohibitions = repairSessionProhibitions();

    expect(prohibitions).toContain('config_or_script_deletion_to_bypass_gate');
    expect(prohibitions).toContain('agent_self_report_as_success');
    expect(prohibitions).toContain('unbounded_repair_session_retry');
  });

  test('classifies a failed verify script as verify_script_failure', () => {
    const classified = classifyRepoOperationFailure({
      kind: 'verify',
      failure: { code: 'script_failed', interrupted: false }
    });

    expect(classified).toBe('verify_script_failure');
  });

  test('classifies a failed deploy script as deploy_script_failure', () => {
    const classified = classifyRepoOperationFailure({
      kind: 'deploy',
      failure: { code: 'script_failed', interrupted: false }
    });

    expect(classified).toBe('deploy_script_failure');
  });

  test('classifies a marker-less operation as interrupted', () => {
    const classified = classifyRepoOperationFailure({
      kind: 'deploy',
      failure: { code: 'interrupted', interrupted: true }
    });

    expect(classified).toBe('interrupted_without_terminal_exit');
  });

  test('leaves a pre-spawn alignment failure outside the eligible set', () => {
    const eligible = isRepairEligible({
      kind: 'deploy',
      failure: { code: 'repo_ops_worktree_align_failed', interrupted: false }
    });

    expect(eligible).toBe(false);
  });

  test('treats a script timeout as an eligible script failure', () => {
    const eligible = isRepairEligible({
      kind: 'deploy',
      failure: { code: 'timeout', interrupted: false }
    });

    expect(eligible).toBe(true);
  });
});
