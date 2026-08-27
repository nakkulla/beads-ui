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

  it('marks a failed row as acknowledged without changing its state', () => {
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
      exit_code: 2,
      signal: null
    });

    const result = store.dismissRepoOperation(workspace, {
      operation_id: 'deploy-a'
    });

    expect([
      result.ok,
      result.queue.repo_operations['deploy-a'].state,
      result.queue.repo_operations['deploy-a'].dismissed?.by
    ]).toEqual([true, 'failed', 'user']);
  });

  it('keeps the failed state and evidence when a row is acknowledged', () => {
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
      exit_code: 2,
      signal: null
    });

    const result = store.dismissRepoOperation(workspace, {
      operation_id: 'deploy-a'
    });

    expect(result.queue.repo_operations['deploy-a'].state).toBe('failed');
    expect(
      Object.hasOwn(result.queue.repo_operations['deploy-a'], 'repair')
    ).toBe(false);
  });

  it('refuses to acknowledge a row that is not failed', () => {
    const workspace = mkdtempSync(
      path.join(os.tmpdir(), 'repo-operation-store-')
    );
    const store = createQueueStore({
      filePathFor: (root) => path.join(root, 'queue.json')
    });
    prerecord(store, workspace, 'deploy-a');

    const result = store.dismissRepoOperation(workspace, {
      operation_id: 'deploy-a'
    });

    expect(result.ok).toBe(false);
  });

  it('refuses a second acknowledgement of the same row', () => {
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
      exit_code: 2,
      signal: null
    });
    store.dismissRepoOperation(workspace, { operation_id: 'deploy-a' });

    const result = store.dismissRepoOperation(workspace, {
      operation_id: 'deploy-a'
    });

    expect(result.ok).toBe(false);
  });

  it('survives a reload with its acknowledgement intact', () => {
    const workspace = mkdtempSync(
      path.join(os.tmpdir(), 'repo-operation-store-')
    );
    const filePathFor = (/** @type {string} */ root) =>
      path.join(root, 'queue.json');
    const store = createQueueStore({ filePathFor });
    prerecord(store, workspace, 'deploy-a');
    const attempt_id =
      store.snapshot(workspace).repo_operations['deploy-a'].attempt_id;
    store.settleRepoOperation(workspace, {
      operation_id: 'deploy-a',
      attempt_id,
      exit_code: 2,
      signal: null
    });
    store.dismissRepoOperation(workspace, { operation_id: 'deploy-a' });

    const reloaded = createQueueStore({ filePathFor });

    expect(
      reloaded.snapshot(workspace).repo_operations['deploy-a'].dismissed?.by
    ).toBe('user');
  });

  it('records retry pending without consuming the retry key', () => {
    const workspace = mkdtempSync(
      path.join(os.tmpdir(), 'repo-operation-store-')
    );
    const store = createQueueStore({
      filePathFor: (root) => path.join(root, 'queue.json')
    });
    prerecord(store, workspace, 'deploy-a');
    const attempt_id =
      store.snapshot(workspace).repo_operations['deploy-a'].attempt_id;
    store.startRepoOperation(workspace, {
      operation_id: 'deploy-a',
      attempt_id,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: '/tmp/retry.log',
      target_sha: sha('d')
    });

    store.deferRepoOperationRetry(workspace, {
      operation_id: 'deploy-a',
      attempt_id,
      exit_code: 2,
      signal: null,
      failure: {
        code: 'script_failed',
        fingerprint: sha('e') + sha('e').slice(0, 24),
        detail: '',
        interrupted: false
      }
    });

    expect(store.snapshot(workspace).repo_operations['deploy-a']).toMatchObject(
      {
        state: 'retry_pending',
        retry: {
          consumed_key: null,
          first_failure: { code: 'script_failed' }
        }
      }
    );
  });

  it('consumes the retry key before returning the operation to queued', () => {
    const workspace = mkdtempSync(
      path.join(os.tmpdir(), 'repo-operation-store-')
    );
    const store = createQueueStore({
      filePathFor: (root) => path.join(root, 'queue.json')
    });
    prerecord(store, workspace, 'deploy-a');
    const attempt_id =
      store.snapshot(workspace).repo_operations['deploy-a'].attempt_id;
    store.startRepoOperation(workspace, {
      operation_id: 'deploy-a',
      attempt_id,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: '/tmp/retry.log',
      target_sha: sha('d')
    });
    store.deferRepoOperationRetry(workspace, {
      operation_id: 'deploy-a',
      attempt_id,
      exit_code: 2,
      signal: null,
      failure: {
        code: 'script_failed',
        fingerprint: sha('e') + sha('e').slice(0, 24),
        detail: '',
        interrupted: false
      }
    });

    store.consumeRepoOperationRetry(workspace, {
      operation_id: 'deploy-a',
      attempt_id,
      consumed_key: [attempt_id, sha('d'), `${sha('c')}:100755`]
    });

    expect(store.snapshot(workspace).repo_operations['deploy-a']).toMatchObject(
      {
        state: 'queued',
        retry: {
          consumed_key: [attempt_id, sha('d'), `${sha('c')}:100755`]
        }
      }
    );
  });

  it('records flake absorption when the consumed retry succeeds', () => {
    const workspace = mkdtempSync(
      path.join(os.tmpdir(), 'repo-operation-store-')
    );
    const store = createQueueStore({
      filePathFor: (root) => path.join(root, 'queue.json')
    });
    prerecord(store, workspace, 'deploy-a');
    const attempt_id =
      store.snapshot(workspace).repo_operations['deploy-a'].attempt_id;
    store.startRepoOperation(workspace, {
      operation_id: 'deploy-a',
      attempt_id,
      process_identity: { pid: 1, pgid: 1, started_at: 1 },
      log_path: '/tmp/retry.log',
      target_sha: sha('d')
    });
    const first_fingerprint = sha('e') + sha('e').slice(0, 24);
    store.deferRepoOperationRetry(workspace, {
      operation_id: 'deploy-a',
      attempt_id,
      exit_code: 2,
      signal: null,
      failure: {
        code: 'script_failed',
        fingerprint: first_fingerprint,
        detail: '',
        interrupted: false
      }
    });
    store.consumeRepoOperationRetry(workspace, {
      operation_id: 'deploy-a',
      attempt_id,
      consumed_key: [attempt_id, sha('d'), `${sha('c')}:100755`]
    });
    store.startRepoOperation(workspace, {
      operation_id: 'deploy-a',
      attempt_id,
      process_identity: { pid: 2, pgid: 2, started_at: 2 },
      log_path: '/tmp/retry.log',
      target_sha: sha('d')
    });

    store.settleRepoOperation(workspace, {
      operation_id: 'deploy-a',
      attempt_id,
      exit_code: 0,
      signal: null
    });

    expect(store.snapshot(workspace).repo_operations['deploy-a']).toMatchObject(
      {
        state: 'succeeded',
        retry: {
          absorbed: {
            first_failure: { code: 'script_failed' },
            first_fingerprint
          }
        }
      }
    );
  });
});
