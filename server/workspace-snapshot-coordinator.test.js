/**
 * @import { runBdJson } from './bd.js'
 */
import { describe, expect, test, vi } from 'vitest';
import { createWorkspaceSnapshotCoordinator } from './workspace-snapshot-coordinator.js';

const ALL_ARGS = ['list', '--json', '--tree=false', '--all', '--limit', '0'];
const READY_ARGS = ['ready', '--explain', '--limit', '0', '--json'];

/**
 * @param {Array<Record<string, unknown>>} all
 * @param {{ ready?: Array<Record<string, unknown>>, blocked?: Array<Record<string, unknown>> }} [explain]
 */
function successfulGeneration(all, explain = {}) {
  return [
    { code: 0, stdoutJson: all },
    {
      code: 0,
      stdoutJson: {
        ready: explain.ready || [],
        blocked: explain.blocked || []
      }
    }
  ];
}

/**
 * @param {Array<unknown>} responses
 */
function createRunner(responses) {
  return /** @type {typeof runBdJson} */ (
    vi.fn(async () => {
      const response = responses.shift();
      if (response instanceof Error) {
        throw response;
      }
      return /** @type {any} */ (response);
    })
  );
}

describe('workspace snapshot coordinator', () => {
  test('joins concurrent requests for one workspace generation', async () => {
    /** @type {Array<(value: unknown) => void>} */
    const resolvers = [];
    const runBdJson = vi.fn(
      () =>
        new Promise((resolve) => {
          resolvers.push(resolve);
        })
    );
    const coordinator = createWorkspaceSnapshotCoordinator({
      cwd: '/workspace/a',
      runBdJson: /** @type {typeof runBdJson} */ (runBdJson)
    });

    const cold_request = coordinator.request('cold-subscribe');
    const poll_request = coordinator.request('poll');
    const background_request = coordinator.request('background-subscribe');

    expect(runBdJson).toHaveBeenCalledTimes(2);
    expect(cold_request).toBe(poll_request);
    expect(cold_request).toBe(background_request);

    resolvers[0]({ code: 0, stdoutJson: [{ id: 'A', dependencies: [] }] });
    resolvers[1]({
      code: 0,
      stdoutJson: { ready: [{ id: 'A' }], blocked: [] }
    });

    const result = await cold_request;

    expect(result).toMatchObject({ ok: true, fresh: true });
    if (result.ok) {
      expect(result.snapshot.generation).toBe(1);
    }
    expect(
      /** @type {any} */ (runBdJson).mock.calls.map(
        (/** @type {any} */ call) => call[0]
      )
    ).toEqual([ALL_ARGS, READY_ARGS]);
  });

  test('runs one trailing generation for a mutation burst', async () => {
    const runBdJson = createRunner([
      ...successfulGeneration([{ id: 'A', dependencies: [] }]),
      ...successfulGeneration([{ id: 'A', dependencies: [] }])
    ]);
    const coordinator = createWorkspaceSnapshotCoordinator({ runBdJson });

    const first = coordinator.request('cold-subscribe');
    coordinator.signalMutation();
    coordinator.signalMutation();
    await first;
    await coordinator.waitForIdle();

    expect(runBdJson).toHaveBeenCalledTimes(4);
    expect(coordinator.getSnapshot()?.generation).toBe(2);
  });

  test('keeps workspace generations independent', async () => {
    const first_runner = createRunner(
      successfulGeneration([{ id: 'A', dependencies: [] }])
    );
    const second_runner = createRunner(
      successfulGeneration([{ id: 'B', dependencies: [] }])
    );
    const first = createWorkspaceSnapshotCoordinator({
      runBdJson: first_runner
    });
    const second = createWorkspaceSnapshotCoordinator({
      runBdJson: second_runner
    });

    await Promise.all([
      first.request('cold-subscribe'),
      second.request('cold-subscribe')
    ]);

    expect(first.getSnapshot()?.all.map((issue) => issue.id)).toEqual(['A']);
    expect(second.getSnapshot()?.all.map((issue) => issue.id)).toEqual(['B']);
    expect(first_runner).toHaveBeenCalledTimes(2);
    expect(second_runner).toHaveBeenCalledTimes(2);
  });

  test('commits all and ready data atomically after both commands succeed', async () => {
    const runBdJson = createRunner([
      ...successfulGeneration([{ id: 'A', dependencies: [] }]),
      { code: 0, stdoutJson: [{ id: 'B', dependencies: [] }] },
      { code: 2, stderr: 'ready failed' }
    ]);
    const coordinator = createWorkspaceSnapshotCoordinator({ runBdJson });

    await coordinator.request('cold-subscribe');
    const refresh = await coordinator.request('poll');

    expect(refresh).toMatchObject({ ok: true, stale: true });
    expect(coordinator.getSnapshot()?.all.map((issue) => issue.id)).toEqual([
      'A'
    ]);
    expect(coordinator.getSnapshot()?.generation).toBe(1);
  });

  test('returns a structured error before any snapshot exists', async () => {
    const runBdJson = createRunner([{ code: 2, stderr: 'list failed' }]);
    const coordinator = createWorkspaceSnapshotCoordinator({ runBdJson });

    const result = await coordinator.request('cold-subscribe');

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'workspace_snapshot_error', stage: 'all' }
    });
  });

  test('keeps a warm snapshot during retry backoff and retries one mutation at the deadline', async () => {
    let now = 0;
    const runBdJson = createRunner([
      ...successfulGeneration([{ id: 'A', dependencies: [] }]),
      { code: 2, stderr: 'list failed' },
      { code: 0, stdoutJson: { ready: [], blocked: [] } },
      ...successfulGeneration([{ id: 'B', dependencies: [] }])
    ]);
    const coordinator = createWorkspaceSnapshotCoordinator({
      runBdJson,
      now: () => now,
      retry_base_ms: 100
    });

    await coordinator.request('cold-subscribe');
    await coordinator.request('poll');
    coordinator.signalMutation();

    const backoff = await coordinator.request('poll');

    expect(backoff).toMatchObject({ ok: true, stale: true });
    expect(runBdJson).toHaveBeenCalledTimes(4);

    now = 100;
    await coordinator.request('poll');

    expect(runBdJson).toHaveBeenCalledTimes(6);
    expect(coordinator.getSnapshot()?.all.map((issue) => issue.id)).toEqual([
      'B'
    ]);
    expect(coordinator.getState().retry_attempt).toBe(0);
  });

  test('defers an in-flight mutation after a failed generation until retry deadline', async () => {
    let now = 0;
    const runBdJson = createRunner([
      ...successfulGeneration([{ id: 'A', dependencies: [] }]),
      { code: 2, stderr: 'list failed' },
      { code: 0, stdoutJson: { ready: [], blocked: [] } },
      ...successfulGeneration([{ id: 'B', dependencies: [] }])
    ]);
    const coordinator = createWorkspaceSnapshotCoordinator({
      runBdJson,
      now: () => now,
      retry_base_ms: 100
    });

    await coordinator.request('cold-subscribe');
    const failed = coordinator.request('poll');
    coordinator.signalMutation();
    await failed;
    await Promise.resolve();

    expect(runBdJson).toHaveBeenCalledTimes(4);
    expect(coordinator.getState().pending_mutation).toBe(true);

    now = 100;
    await coordinator.request('poll');

    expect(runBdJson).toHaveBeenCalledTimes(6);
    expect(coordinator.getSnapshot()?.all.map((issue) => issue.id)).toEqual([
      'B'
    ]);
  });

  test('marks a generation stale when a newer mutation arrives before completion', async () => {
    /** @type {Array<(value: unknown) => void>} */
    const resolvers = [];
    const runBdJson = vi.fn(
      () =>
        new Promise((resolve) => {
          resolvers.push(resolve);
        })
    );
    const coordinator = createWorkspaceSnapshotCoordinator({
      runBdJson: /** @type {typeof runBdJson} */ (runBdJson)
    });

    const request = coordinator.request('cold-subscribe');
    coordinator.signalMutation();
    resolvers[0]({ code: 0, stdoutJson: [{ id: 'A', dependencies: [] }] });
    resolvers[1]({ code: 0, stdoutJson: { ready: [], blocked: [] } });

    const result = await request;

    expect(result).toMatchObject({ ok: true, fresh: false });
  });

  test('allows external blockers that are absent from the workspace rows', async () => {
    const runBdJson = createRunner(
      successfulGeneration([{ id: 'A', dependencies: [] }], {
        blocked: [
          { id: 'A', blocked_by: [{ id: 'EXTERNAL-9', reason: 'wait' }] }
        ]
      })
    );
    const coordinator = createWorkspaceSnapshotCoordinator({ runBdJson });

    const result = await coordinator.request('cold-subscribe');

    expect(result).toMatchObject({ ok: true });
    if (result.ok) {
      expect(result.snapshot.ready_explain.blocked[0]).toMatchObject({
        blocked_by: [{ id: 'EXTERNAL-9', reason: 'wait' }]
      });
    }
  });

  test('rejects a ready subject missing from the all snapshot', async () => {
    const runBdJson = createRunner(
      successfulGeneration([{ id: 'A', dependencies: [] }], {
        ready: [{ id: 'MISSING' }]
      })
    );
    const coordinator = createWorkspaceSnapshotCoordinator({ runBdJson });

    const result = await coordinator.request('cold-subscribe');

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'workspace_snapshot_error', stage: 'validation' }
    });
  });

  test('uses two commands when the real list payload exposes dependencies', async () => {
    const runBdJson = createRunner(
      successfulGeneration([
        {
          id: 'A',
          dependencies: [{ type: 'discovered-from', depends_on_id: 'ROOT' }]
        }
      ])
    );
    const coordinator = createWorkspaceSnapshotCoordinator({ runBdJson });

    const result = await coordinator.request('cold-subscribe');

    if (result.ok) {
      expect(result.snapshot.command_mode).toBe('embedded-dependencies');
      expect(result.snapshot.command_count).toBe(2);
    }
    expect(runBdJson).toHaveBeenCalledTimes(2);
  });

  test('uses one batched dependency fallback when the list payload lacks dependencies', async () => {
    const runBdJson = createRunner([
      ...successfulGeneration([{ id: 'A' }, { id: 'B' }]),
      {
        code: 0,
        stdoutJson: [
          { issue_id: 'A', depends_on_id: 'ROOT', type: 'discovered-from' }
        ]
      }
    ]);
    const coordinator = createWorkspaceSnapshotCoordinator({ runBdJson });

    const result = await coordinator.request('cold-subscribe');

    if (result.ok) {
      expect(result.snapshot).toMatchObject({
        command_mode: 'legacy-dependency-fallback',
        command_count: 3,
        dependency_edges: [
          { issue_id: 'A', depends_on_id: 'ROOT', type: 'discovered-from' }
        ]
      });
    }
    expect(/** @type {any} */ (runBdJson).mock.calls[2][0]).toEqual([
      'dep',
      'list',
      'A',
      'B',
      '--json'
    ]);
  });

  test('probes installed bd for an embedded discovered-from edge', async () => {
    const coordinator = createWorkspaceSnapshotCoordinator();

    const result = await coordinator.request('cold-subscribe');

    expect(result).toMatchObject({ ok: true, fresh: true });
    if (result.ok) {
      expect(result.snapshot.command_mode).toBe('embedded-dependencies');
      expect(result.snapshot.command_count).toBe(2);
      expect(
        result.snapshot.all.some(
          (issue) =>
            Array.isArray(issue.dependencies) &&
            issue.dependencies.some(
              (edge) =>
                edge &&
                typeof edge === 'object' &&
                /** @type {Record<string, unknown>} */ (edge).type ===
                  'discovered-from'
            )
        )
      ).toBe(true);
    }
  });
});
