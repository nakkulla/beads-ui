import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  normalizeBdDependencyRows,
  normalizeBdIssueList,
  normalizeBdReadyExplain,
  normalizeBdVersionCapability
} from './bd-json.js';
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

/**
 * Adapt a transport-shaped `bd --json` response to the projected runner
 * contract, through the SAME projectors production uses.
 *
 * @param {string} command_family
 * @param {any} raw
 * @returns {any}
 */
function asProjectedResponse(command_family, raw) {
  if (!raw || raw.code !== 0) {
    return {
      ok: false,
      error: {
        code: 'bd_exit_error',
        message: String((raw && raw.stderr) || 'bd failed'),
        details: { exit_code: raw ? raw.code : null }
      }
    };
  }
  const projected =
    command_family === 'ready-explain'
      ? normalizeBdReadyExplain(raw.stdoutJson)
      : command_family === 'dep'
        ? normalizeBdDependencyRows(raw.stdoutJson)
        : command_family === 'version'
          ? normalizeBdVersionCapability(raw.stdoutJson)
          : normalizeBdIssueList(raw.stdoutJson);
  if (!projected.ok) {
    return projected;
  }
  return {
    ok: true,
    protocol: { format: 'bare', schema_version: null },
    data: projected.data
  };
}

describe('workspace snapshot Phase 3 consumer reuse', () => {
  test('shares one supported generation across Board, Worker, and Monitor', async () => {
    const rows = [
      {
        id: 'UI-open',
        status: 'open',
        title: '실행 가능',
        dependencies: [],
        spec_id: 'docs/spec.md',
        metadata: {
          route: 'spec_backed',
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
    const runBdJson = vi.fn(async (command_family, args) => {
      if (args[0] === 'list') {
        return asProjectedResponse('list', { code: 0, stdoutJson: rows });
      }
      return asProjectedResponse('ready-explain', {
        code: 0,
        stdoutJson: { ready: [], blocked: [] }
      });
    });
    const coordinator = createWorkspaceSnapshotCoordinator({
      runBdJsonProjected: runBdJson
    });
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
