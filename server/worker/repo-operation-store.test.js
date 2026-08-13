import { mkdtempSync, readFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { createQueueStore } from './queue-store.js';

describe('RepoOperation store', () => {
  /** @param {string} value - One hexadecimal digit. */
  const sha = (value) => value.repeat(40);

  /**
   * @param {ReturnType<typeof createQueueStore>} store - Queue store.
   * @param {string} workspace - Test workspace.
   * @param {string} operation_id - Operation identity.
   * @param {string} [bead_id] - Subject bead.
   */
  function prerecord(store, workspace, operation_id, bead_id = 'UI-a') {
    return store.ensureRepoOperation(workspace, {
      operation_id,
      repo_id: 'repo-a',
      kind: 'deploy',
      subjects: [{ bead_id, merged_sha: sha('a') }],
      effective_base_sha: sha('b'),
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: sha('c')
    });
  }

  it('prerecords a deploy operation before a runner can spawn', () => {
    const workspace = mkdtempSync(
      path.join(os.tmpdir(), 'repo-operation-store-')
    );
    const store = createQueueStore({
      filePathFor: (root) => path.join(root, 'queue.json')
    });

    const result = store.ensureRepoOperation(workspace, {
      operation_id: 'deploy-a',
      repo_id: 'repo-a',
      kind: 'deploy',
      subjects: [{ bead_id: 'UI-a', merged_sha: 'a'.repeat(40) }],
      effective_base_sha: 'b'.repeat(40),
      target_base: 'main',
      script_mode: '100755',
      script_blob_sha: 'c'.repeat(40)
    });

    expect(result.ok).toBe(true);
    expect(result.queue.repo_operations['deploy-a'].state).toBe('queued');
  });

  it('adopts exact input, coalesces only queued subjects, and persists it', () => {
    const workspace = mkdtempSync(
      path.join(os.tmpdir(), 'repo-operation-store-')
    );
    const store = createQueueStore({
      filePathFor: (root) => path.join(root, 'queue.json')
    });
    prerecord(store, workspace, 'deploy-a');

    prerecord(store, workspace, 'deploy-a', 'UI-b');
    expect(
      store.snapshot(workspace).repo_operations['deploy-a'].subjects
    ).toHaveLength(2);

    store.startRepoOperation(workspace, {
      operation_id: 'deploy-a',
      attempt_id:
        store.snapshot(workspace).repo_operations['deploy-a'].attempt_id,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: '/tmp/log'
    });
    prerecord(store, workspace, 'deploy-a', 'UI-c');
    expect(
      store.snapshot(workspace).repo_operations['deploy-a'].subjects
    ).toHaveLength(2);
    expect(
      JSON.parse(readFileSync(path.join(workspace, 'queue.json'), 'utf8'))
        .repo_operations['deploy-a']
    ).toBeTruthy();
  });

  it('settles with a valid requested owner and carries a repair chain to a successor', () => {
    const workspace = mkdtempSync(
      path.join(os.tmpdir(), 'repo-operation-store-')
    );
    const store = createQueueStore({
      filePathFor: (root) => path.join(root, 'queue.json')
    });
    prerecord(store, workspace, 'from', 'UI-z');
    prerecord(store, workspace, 'from', 'UI-a');
    const attempt_id =
      store.snapshot(workspace).repo_operations.from.attempt_id;
    store.settleRepoOperation(workspace, {
      operation_id: 'from',
      attempt_id,
      exit_code: 1,
      signal: null,
      owner_bead: 'UI-z'
    });
    prerecord(store, workspace, 'to');

    const inherited = store.inheritRepoOperationChain(workspace, {
      from_operation_id: 'from',
      to_operation_id: 'to'
    });
    const queue = store.snapshot(workspace);
    expect(inherited.ok).toBe(true);
    expect(queue.repo_operations.to.repair).toMatchObject({
      chain_id: 'from',
      owner_bead: 'UI-z',
      auto_budget: 1,
      auto_used: 0
    });
    expect(queue.repo_operations.from.superseded_by).toBe('to');
  });

  it('reapproves only a failed provenance-less operation with a fresh attempt', () => {
    const workspace = mkdtempSync(
      path.join(os.tmpdir(), 'repo-operation-store-')
    );
    const store = createQueueStore({
      filePathFor: (root) => path.join(root, 'queue.json')
    });
    prerecord(store, workspace, 'deploy-a');
    const attempt_id =
      store.snapshot(workspace).repo_operations['deploy-a'].attempt_id;
    store.settleRepoOperation(workspace, {
      operation_id: 'deploy-a',
      attempt_id,
      exit_code: 1,
      signal: null
    });
    const result = store.attachRepoOperationBootstrap(workspace, {
      operation_id: 'deploy-a',
      attempt_id: 'fresh',
      provenance: {
        approved_source_path: 'repo-ops/config.toml',
        approved_source_sha: sha('d'),
        requested_by: 'operator',
        requested_at: 1
      }
    });
    expect(result.ok).toBe(true);
    expect(store.snapshot(workspace).repo_operations['deploy-a']).toMatchObject(
      { state: 'queued', attempt_id: 'fresh' }
    );
  });
});
