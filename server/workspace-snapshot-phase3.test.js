import { afterEach, describe, expect, test, vi } from 'vitest';
import { fetchListForSubscription } from './list-adapters.js';
import { createBdMetadata } from './worker/bd-metadata.js';
import { createRunnableCache } from './worker/runnable-cache.js';
import { createWorkspaceSnapshotCoordinator } from './workspace-snapshot-coordinator.js';
import {
  __resetWorkspaceSnapshotRuntimeForTest,
  __setWorkspaceSnapshotCoordinatorFactoryForTest,
  requestWorkspaceSnapshot
} from './workspace-snapshot-runtime.js';

const WORKSPACE = '/tmp/example/phase3-shared-workspace';
const RECEIPT = `codex@${'a'.repeat(40)}`;

afterEach(() => {
  __resetWorkspaceSnapshotRuntimeForTest();
});

/**
 * Let the runnable cache's asynchronous fill settle after the coordinator
 * commits its generation.
 */
async function settle() {
  for (let i = 0; i < 10; i += 1) {
    await Promise.resolve();
  }
}

describe('workspace snapshot Phase 3 consumer reuse', () => {
  test('shares one supported generation across Board, Worker, and Monitor', async () => {
    const rows = [
      {
        id: 'UI-open',
        status: 'open',
        title: '실행 가능',
        dependencies: [],
        metadata: {
          route: 'spec_backed',
          spec_id: 'docs/spec.md',
          spec_review: RECEIPT
        }
      },
      {
        id: 'UI-pr',
        status: 'resolved',
        title: '외부 PR',
        dependencies: [],
        metadata: { pr_url: 'https://github.com/o/r/pull/7' }
      }
    ];
    const runBdJson = vi.fn(async (args) => {
      if (args[0] === 'list') {
        return { code: 0, stdoutJson: rows };
      }
      return { code: 0, stdoutJson: { ready: [], blocked: [] } };
    });
    const coordinator = createWorkspaceSnapshotCoordinator({ runBdJson });
    __setWorkspaceSnapshotCoordinatorFactoryForTest(() => coordinator);
    const cache = createRunnableCache();
    const metadata = createBdMetadata({
      cwd: WORKSPACE,
      requestSnapshot: requestWorkspaceSnapshot
    });

    const board = fetchListForSubscription(
      { type: 'all-issues' },
      { cwd: WORKSPACE, workspace_snapshot: true, snapshot_cause: 'poll' }
    );
    cache.runnableFor(WORKSPACE);
    const worker = metadata.scanBeads();

    const [board_result, worker_result] = await Promise.all([board, worker]);
    await coordinator.waitForIdle();
    await settle();

    expect(runBdJson).toHaveBeenCalledTimes(2);
    expect(board_result).toMatchObject({ ok: true });
    expect(worker_result).toMatchObject({
      pr_rows: [{ bead_id: 'UI-pr', pr_url: 'https://github.com/o/r/pull/7' }]
    });
    expect(cache.runnableFor(WORKSPACE).map((item) => item.bead_id)).toEqual([
      'UI-open'
    ]);
  });
});
