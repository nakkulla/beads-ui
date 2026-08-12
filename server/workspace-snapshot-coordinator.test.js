import { afterEach, describe, expect, test, vi } from 'vitest';
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
  return /** @type {typeof import('./bd.js').runBdJson} */ (
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
  afterEach(() => {
    vi.useRealTimers();
  });

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

  test('emits safe telemetry for a joined two-command generation', async () => {
    const telemetry = vi.fn();
    const secret_body = 'issue body must never reach telemetry';
    const secret_metadata = 'Bearer credential must never reach telemetry';
    const runBdJson = createRunner(
      successfulGeneration([
        {
          id: 'A',
          body: secret_body,
          dependencies: [],
          metadata: { authorization: secret_metadata }
        }
      ])
    );
    const coordinator = createWorkspaceSnapshotCoordinator({
      cwd: '/workspace/telemetry',
      runBdJson,
      telemetry
    });

    const first = coordinator.request('cold-subscribe');
    const second = coordinator.request('poll');

    await first;

    expect(second).toBe(first);
    expect(telemetry).toHaveBeenCalledWith(
      expect.objectContaining({
        event: 'generation-complete',
        workspace: '/workspace/telemetry',
        cause: 'cold-subscribe',
        generation: 1,
        join: false,
        trailing: false,
        retry_attempt: 0,
        backoff_ms: 0,
        command_duration_ms: expect.any(Number),
        command_exit: 0,
        projection_count: 2,
        command_count: 2,
        command_mode: 'embedded-dependencies'
      })
    );
    expect(telemetry).toHaveBeenCalledWith(
      expect.objectContaining({
        event: 'generation-join',
        cause: 'poll',
        join: true,
        projection_count: 2
      })
    );
    expect(JSON.stringify(telemetry.mock.calls)).not.toContain(secret_body);
    expect(JSON.stringify(telemetry.mock.calls)).not.toContain(secret_metadata);
  });

  test('joins concurrent watcher consumers without creating mutation evidence', async () => {
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

    const first = coordinator.request('watcher');
    const second = coordinator.request('watcher');
    const third = coordinator.request('watcher');

    expect(runBdJson).toHaveBeenCalledTimes(2);
    expect(first).toBe(second);
    expect(first).toBe(third);

    resolvers[0]({ code: 0, stdoutJson: [{ id: 'A', dependencies: [] }] });
    resolvers[1]({ code: 0, stdoutJson: { ready: [], blocked: [] } });

    await first;
    await Promise.resolve();

    expect(runBdJson).toHaveBeenCalledTimes(2);
    expect(coordinator.getState()).toMatchObject({
      generation: 1,
      mutation_epoch: 0,
      pending_mutation: false
    });
  });

  test('runs one trailing generation for a mutation burst', async () => {
    const telemetry = vi.fn();
    const runBdJson = createRunner([
      ...successfulGeneration([{ id: 'A', dependencies: [] }]),
      ...successfulGeneration([{ id: 'A', dependencies: [] }])
    ]);
    const coordinator = createWorkspaceSnapshotCoordinator({
      runBdJson,
      telemetry
    });

    const first = coordinator.request('cold-subscribe');
    coordinator.signalMutation();
    coordinator.signalMutation();
    await first;
    await coordinator.waitForIdle();

    expect(runBdJson).toHaveBeenCalledTimes(4);
    expect(coordinator.getSnapshot()?.generation).toBe(2);
    expect(telemetry).toHaveBeenCalledWith(
      expect.objectContaining({
        event: 'generation-complete',
        cause: 'mutation-trailing',
        generation: 2,
        trailing: true,
        command_count: 2,
        command_mode: 'embedded-dependencies'
      })
    );
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
    const telemetry = vi.fn();
    const runBdJson = createRunner([
      ...successfulGeneration([{ id: 'A', dependencies: [] }]),
      { code: 2, stderr: 'list failed' },
      { code: 0, stdoutJson: { ready: [], blocked: [] } },
      ...successfulGeneration([{ id: 'B', dependencies: [] }])
    ]);
    const coordinator = createWorkspaceSnapshotCoordinator({
      runBdJson,
      now: () => now,
      retry_base_ms: 100,
      telemetry
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
    expect(telemetry).toHaveBeenCalledWith(
      expect.objectContaining({
        event: 'generation-failure',
        retry_attempt: 1,
        backoff_ms: 100,
        command_exit: 2
      })
    );
    expect(telemetry).toHaveBeenCalledWith(
      expect.objectContaining({
        event: 'generation-backoff',
        cause: 'poll',
        retry_attempt: 1,
        backoff_ms: 100
      })
    );
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

  test('retries a warm failure at its deadline without another request', async () => {
    vi.useFakeTimers();
    const set_timeout = vi.fn(globalThis.setTimeout);
    const clear_timeout = vi.fn(globalThis.clearTimeout);
    const runBdJson = createRunner([
      ...successfulGeneration([{ id: 'A', dependencies: [] }]),
      { code: 2, stderr: 'list failed' },
      { code: 0, stdoutJson: { ready: [], blocked: [] } },
      ...successfulGeneration([{ id: 'B', dependencies: [] }])
    ]);
    const coordinator = createWorkspaceSnapshotCoordinator({
      runBdJson,
      retry_base_ms: 100,
      setTimeout: /** @type {typeof globalThis.setTimeout} */ (
        /** @type {unknown} */ (set_timeout)
      ),
      clearTimeout: /** @type {typeof globalThis.clearTimeout} */ (
        /** @type {unknown} */ (clear_timeout)
      )
    });

    await coordinator.request('cold-subscribe');
    await coordinator.request('poll');
    coordinator.signalMutation();
    coordinator.signalMutation();
    coordinator.signalMutation();

    expect(set_timeout).toHaveBeenCalledTimes(1);
    expect(runBdJson).toHaveBeenCalledTimes(4);

    await vi.advanceTimersByTimeAsync(100);
    await coordinator.waitForIdle();

    expect(runBdJson).toHaveBeenCalledTimes(6);
    expect(coordinator.getSnapshot()?.all.map((issue) => issue.id)).toEqual([
      'B'
    ]);
  });

  test('retries an in-flight mutation after a failed generation without another request', async () => {
    vi.useFakeTimers();
    const set_timeout = vi.fn(globalThis.setTimeout);
    const runBdJson = createRunner([
      ...successfulGeneration([{ id: 'A', dependencies: [] }]),
      { code: 2, stderr: 'list failed' },
      { code: 0, stdoutJson: { ready: [], blocked: [] } },
      ...successfulGeneration([{ id: 'B', dependencies: [] }])
    ]);
    const coordinator = createWorkspaceSnapshotCoordinator({
      runBdJson,
      retry_base_ms: 100,
      setTimeout: /** @type {typeof globalThis.setTimeout} */ (
        /** @type {unknown} */ (set_timeout)
      )
    });

    await coordinator.request('cold-subscribe');
    const failed = coordinator.request('poll');
    coordinator.signalMutation();
    coordinator.signalMutation();
    await failed;
    await Promise.resolve();

    expect(set_timeout).toHaveBeenCalledTimes(1);
    expect(runBdJson).toHaveBeenCalledTimes(4);

    await vi.advanceTimersByTimeAsync(100);
    await coordinator.waitForIdle();

    expect(runBdJson).toHaveBeenCalledTimes(6);
    expect(coordinator.getSnapshot()?.all.map((issue) => issue.id)).toEqual([
      'B'
    ]);
  });

  test('cancels a scheduled retry when an earlier request starts it', async () => {
    vi.useFakeTimers();
    const clear_timeout = vi.fn(globalThis.clearTimeout);
    const runBdJson = createRunner([
      ...successfulGeneration([{ id: 'A', dependencies: [] }]),
      { code: 2, stderr: 'list failed' },
      { code: 0, stdoutJson: { ready: [], blocked: [] } },
      ...successfulGeneration([{ id: 'B', dependencies: [] }])
    ]);
    const coordinator = createWorkspaceSnapshotCoordinator({
      runBdJson,
      retry_base_ms: 100,
      clearTimeout: /** @type {typeof globalThis.clearTimeout} */ (
        /** @type {unknown} */ (clear_timeout)
      )
    });

    await coordinator.request('cold-subscribe');
    await coordinator.request('poll');
    coordinator.signalMutation();
    vi.setSystemTime(Date.now() + 100);
    await coordinator.request('poll');

    expect(clear_timeout).toHaveBeenCalledTimes(1);
    expect(runBdJson).toHaveBeenCalledTimes(6);

    await vi.advanceTimersByTimeAsync(100);

    expect(runBdJson).toHaveBeenCalledTimes(6);
  });

  test('returns the one trailing fresh generation to consumers after an in-flight mutation', async () => {
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

    const request = coordinator.request('poll');
    coordinator.signalMutation();
    coordinator.signalMutation();
    resolvers[0]({ code: 0, stdoutJson: [{ id: 'PRE', dependencies: [] }] });
    resolvers[1]({ code: 0, stdoutJson: { ready: [], blocked: [] } });
    for (let attempt = 0; attempt < 10 && resolvers.length < 4; attempt += 1) {
      await Promise.resolve();
    }

    expect(runBdJson).toHaveBeenCalledTimes(4);

    resolvers[2]({ code: 0, stdoutJson: [{ id: 'POST', dependencies: [] }] });
    resolvers[3]({ code: 0, stdoutJson: { ready: [], blocked: [] } });

    const result = await request;

    expect(result).toMatchObject({ ok: true, fresh: true });
    expect(result.ok && result.snapshot.all.map((issue) => issue.id)).toEqual([
      'POST'
    ]);
    expect(coordinator.getSnapshot()?.generation).toBe(2);
    expect(runBdJson).toHaveBeenCalledTimes(4);
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

  test('uses one batched dependency fallback when legacy capability is explicit', async () => {
    const runBdJson = createRunner([
      ...successfulGeneration([{ id: 'A' }, { id: 'B' }]),
      {
        code: 0,
        stdoutJson: [
          { issue_id: 'A', depends_on_id: 'ROOT', type: 'discovered-from' }
        ]
      }
    ]);
    const coordinator = createWorkspaceSnapshotCoordinator({
      runBdJson,
      dependency_mode: 'legacy-dependency-fallback'
    });

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

  test('uses two commands for supported zero-edge rows that omit dependencies', async () => {
    const runBdJson = createRunner(
      successfulGeneration([{ id: 'A' }, { id: 'B' }])
    );
    const coordinator = createWorkspaceSnapshotCoordinator({ runBdJson });

    const result = await coordinator.request('cold-subscribe');

    expect(result).toMatchObject({ ok: true, fresh: true });
    expect(result.ok && result.snapshot).toMatchObject({
      command_mode: 'embedded-dependencies',
      command_count: 2
    });
    expect(runBdJson).toHaveBeenCalledTimes(2);
  });

  test('uses embedded dependencies for a discovered-from edge from the live bd boundary', async () => {
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
