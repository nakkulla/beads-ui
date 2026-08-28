import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
  normalizeBdDependencyRows,
  normalizeBdIssue,
  normalizeBdIssueList,
  normalizeBdReadyExplain,
  normalizeBdVersionCapability
} from './bd-json.js';
import { runBdJsonProjected } from './bd.js';
import {
  fetchListForSubscription,
  mapSubscriptionToBdArgs
} from './list-adapters.js';
import {
  cachedIssuePrefixFor,
  foreignBlockerClosedAtFor,
  visibleWorkspaceRoots
} from './worker/foreign-blocker-status.js';
import { enrichIssuesWorkflow } from './workflow-enrich.js';
import { createWorkspaceSnapshotCoordinator } from './workspace-snapshot-coordinator.js';
import {
  __resetWorkspaceSnapshotRuntimeForTest,
  __setWorkspaceSnapshotCoordinatorFactoryForTest
} from './workspace-snapshot-runtime.js';

vi.mock('./bd.js', () => ({ runBdJsonProjected: vi.fn() }));
vi.mock('./workflow-enrich.js', () => ({
  enrichIssuesWorkflow: vi.fn((items) => items)
}));
vi.mock('./worker/foreign-blocker-status.js', async (importOriginal) => {
  /** @type {any} */
  const actual = await importOriginal();
  return {
    ...actual,
    cachedIssuePrefixFor: vi.fn(() => null),
    foreignBlockerClosedAtFor: vi.fn(() => null),
    visibleWorkspaceRoots: vi.fn(() => [])
  };
});

/**
 * Infer which command family produced a transport-shaped fixture.
 *
 * @param {any} raw
 */
function inferFamily(raw) {
  const payload = raw && raw.stdoutJson;
  if (Array.isArray(payload)) {
    return 'list';
  }
  if (payload && typeof payload === 'object') {
    return Array.isArray(payload.blocked) ? 'ready-explain' : 'show';
  }
  return 'list';
}

/**
 * Adapt a transport-shaped `bd --json` response to the projected runner
 * contract, through the SAME projectors production uses.
 *
 * @param {any} raw
 * @returns {any}
 */
function asProjectedResponse(raw, command_family = inferFamily(raw)) {
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
          : command_family === 'show'
            ? normalizeBdIssue(raw.stdoutJson)
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

describe('list adapters for subscription types', () => {
  beforeEach(() => {
    /** @type {import('vitest').Mock} */ (runBdJsonProjected).mockReset();
    __resetWorkspaceSnapshotRuntimeForTest();
  });

  test('mapSubscriptionToBdArgs returns args for all-issues', () => {
    const args = mapSubscriptionToBdArgs({ type: 'all-issues' });
    expect(args).toEqual(['list', '--json', '--tree=false']);
  });

  test('rejects blocked-issues as an unmapped bd command', () => {
    expect(() => mapSubscriptionToBdArgs({ type: 'blocked-issues' })).toThrow();
  });

  test('mapSubscriptionToBdArgs returns args for ready-issues', () => {
    const args = mapSubscriptionToBdArgs({ type: 'ready-issues' });
    expect(args).toEqual(['ready', '--limit', '1000', '--json']);
  });

  test('mapSubscriptionToBdArgs returns args for in-progress-issues', () => {
    const args = mapSubscriptionToBdArgs({ type: 'in-progress-issues' });
    expect(args).toEqual([
      'list',
      '--json',
      '--tree=false',
      '--status',
      'in_progress'
    ]);
  });

  test('mapSubscriptionToBdArgs returns args for closed-issues', () => {
    const args = mapSubscriptionToBdArgs({ type: 'closed-issues' });
    expect(args).toEqual([
      'list',
      '--json',
      '--tree=false',
      '--status',
      'closed',
      '--limit',
      '0'
    ]);
  });

  test('mapSubscriptionToBdArgs pushes a since range down as --closed-after', () => {
    const since = Date.parse('2026-08-03T00:00:00.000Z');

    const args = mapSubscriptionToBdArgs({
      type: 'closed-issues',
      params: { since }
    });

    expect(args).toEqual([
      'list',
      '--json',
      '--tree=false',
      '--status',
      'closed',
      '--limit',
      '0',
      '--closed-after',
      new Date(since - 1000).toISOString()
    ]);
  });

  test('mapSubscriptionToBdArgs ignores a non-positive since', () => {
    const args = mapSubscriptionToBdArgs({
      type: 'closed-issues',
      params: { since: 0 }
    });

    expect(args).toEqual([
      'list',
      '--json',
      '--tree=false',
      '--status',
      'closed',
      '--limit',
      '0'
    ]);
  });

  test('mapSubscriptionToBdArgs returns args for resolved-issues', () => {
    const args = mapSubscriptionToBdArgs({ type: 'resolved-issues' });
    expect(args).toEqual([
      'list',
      '--json',
      '--tree=false',
      '--status',
      'resolved',
      '--limit',
      '1000'
    ]);
  });

  test('mapSubscriptionToBdArgs returns args for deferred-issues', () => {
    const args = mapSubscriptionToBdArgs({ type: 'deferred-issues' });
    expect(args).toEqual([
      'list',
      '--json',
      '--tree=false',
      '--status',
      'deferred',
      '--limit',
      '1000'
    ]);
  });

  test('mapSubscriptionToBdArgs returns args for issue-detail', () => {
    const args = mapSubscriptionToBdArgs({
      type: 'issue-detail',
      params: { id: 'UI-123' }
    });
    expect(args).toEqual(['show', 'UI-123', '--include-dependents', '--json']);
  });

  test('fetchListForSubscription returns normalized items (Date.parse)', async () => {
    /** @type {import('vitest').Mock} */ (runBdJsonProjected).mockResolvedValue(
      asProjectedResponse({
        code: 0,
        stdoutJson: [
          {
            id: 'A-1',
            updated_at: '2024-01-01T00:00:00.000Z',
            closed_at: null,
            extra: 'x'
          },
          {
            id: 'A-2',
            updated_at: '2024-01-01T00:00:01.000Z',
            closed_at: '2024-01-01T00:00:05.000Z'
          },
          { id: '3', updated_at: 'not-a-date' }
        ]
      })
    );
    const res = await fetchListForSubscription({ type: 'all-issues' });
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.items.length).toBe(3);
      expect(res.items[0]).toMatchObject({
        id: 'A-1',
        updated_at: Date.parse('2024-01-01T00:00:00.000Z'),
        closed_at: null
      });
      expect(res.items[1]).toMatchObject({
        id: 'A-2',
        updated_at: Date.parse('2024-01-01T00:00:01.000Z'),
        closed_at: Date.parse('2024-01-01T00:00:05.000Z')
      });
      // An unparsable timestamp becomes 0 and closed_at defaults to null.
      expect(res.items[2]).toMatchObject({
        id: '3',
        updated_at: 0,
        closed_at: null
      });
    }
  });

  test('fails closed when bd returns a row without a string id', async () => {
    /** @type {import('vitest').Mock} */ (runBdJsonProjected).mockResolvedValue(
      asProjectedResponse({
        code: 0,
        stdoutJson: [{ id: 'A-1' }, { id: 3 }]
      })
    );

    const res = await fetchListForSubscription({ type: 'all-issues' });

    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.error.details?.reason).toBe('bd_json_shape_invalid');
    }
  });

  test('returns only dependency-blocked issues for blocked subscription', async () => {
    /** @type {import('vitest').Mock} */ (
      runBdJsonProjected
    ).mockResolvedValueOnce(
      asProjectedResponse({
        code: 0,
        stdoutJson: {
          ready: [],
          blocked: [
            {
              id: 'D-1',
              title: 'dependency blocked',
              status: 'open',
              updated_at: '2024-01-01T00:00:01.000Z',
              blocked_by: [{ id: 'D-0', status: 'in_progress' }]
            }
          ],
          summary: { total_ready: 0, total_blocked: 1 }
        }
      })
    );

    const res = await fetchListForSubscription({ type: 'blocked-issues' });

    // dependency explain + the provenance batch dep list — no stored query.
    expect(runBdJsonProjected).toHaveBeenCalledTimes(2);
    expect(
      /** @type {import('vitest').Mock} */ (runBdJsonProjected).mock.calls.some(
        (call) => call[1] && call[1].includes('--status')
      )
    ).toBe(false);
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.items.map((it) => it.id)).toEqual(['D-1']);
      expect(res.items[0]).toMatchObject({
        id: 'D-1',
        status: 'open',
        blocked_by: [{ id: 'D-0', status: 'in_progress' }]
      });
    }
  });

  test('fetchListForSubscription surfaces bd error', async () => {
    /** @type {import('vitest').Mock} */ (runBdJsonProjected).mockResolvedValue(
      asProjectedResponse({
        code: 2,
        stderr: 'boom'
      })
    );
    const res = await fetchListForSubscription({ type: 'all-issues' });
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.error.code).toBe('bd_error');
      expect(res.error.message).toContain('boom');
      expect(res.error.details && res.error.details.exit_code).toBe(2);
    }
  });

  test('fetchListForSubscription treats unsupported resolved status as empty', async () => {
    /** @type {import('vitest').Mock} */ (runBdJsonProjected).mockResolvedValue(
      asProjectedResponse({
        code: 1,
        stderr:
          'invalid status "resolved" (valid: open, in_progress, blocked, deferred, closed)'
      })
    );

    const res = await fetchListForSubscription({ type: 'resolved-issues' });

    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.items).toEqual([]);
    }
  });

  test('fetchListForSubscription returns error for unknown type', async () => {
    const res = await fetchListForSubscription(
      /** @type {any} */ ({ type: 'unknown' })
    );
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.error.code).toBe('bad_request');
      expect(res.error.message).toMatch(/Unknown subscription type/);
    }
  });

  test('projects concurrent list specs from one workspace snapshot generation', async () => {
    /** @type {import('vitest').Mock} */ (
      runBdJsonProjected
    ).mockImplementation(async (command_family, args) => {
      if (args[0] === 'version') {
        return supportedVersion();
      }
      if (args[0] === 'list') {
        return asProjectedResponse({
          code: 0,
          stdoutJson: [
            {
              id: 'OPEN-1',
              status: 'open',
              dependencies: [
                { type: 'discovered-from', depends_on_id: 'ROOT-1' }
              ]
            },
            {
              id: 'BLOCKED-1',
              status: 'blocked',
              dependencies: []
            },
            {
              id: 'CLOSED-1',
              status: 'closed',
              closed_at: '2026-08-03T00:00:00.000Z',
              dependencies: []
            }
          ]
        });
      }
      if (args[0] === 'ready') {
        return asProjectedResponse({
          code: 0,
          stdoutJson: {
            ready: [{ id: 'OPEN-1' }],
            blocked: [
              {
                id: 'OPEN-1',
                blocked_by: [{ id: 'UPSTREAM-1' }]
              }
            ]
          }
        });
      }
      throw new Error(`unexpected command: ${args.join(' ')}`);
    });

    const options = { cwd: '/workspace-a', workspace_snapshot: true };
    const [all, ready, blocked] = await Promise.all([
      fetchListForSubscription({ type: 'all-issues' }, options),
      fetchListForSubscription({ type: 'ready-issues' }, options),
      fetchListForSubscription({ type: 'blocked-issues' }, options)
    ]);

    expect(
      snapshotCommandCalls(/** @type {any} */ (runBdJsonProjected))
    ).toHaveLength(2);
    expect(all.ok && all.items.map((item) => item.id)).toEqual([
      'OPEN-1',
      'BLOCKED-1'
    ]);
    expect(all.ok && all.items[0].from_id).toBe('ROOT-1');
    expect(ready.ok && ready.items.map((item) => item.id)).toEqual(['OPEN-1']);
    expect(blocked.ok && blocked.items).toEqual([
      expect.objectContaining({
        id: 'OPEN-1',
        blocked_info: { blockers: ['UPSTREAM-1'] }
      })
    ]);
  });

  test('preserves normalized projection parity across all snapshot list specs', async () => {
    const since = Date.parse('2026-08-03T00:00:00.000Z');
    /** @type {import('vitest').Mock} */ (
      runBdJsonProjected
    ).mockImplementation(async (command_family, args) => {
      if (args[0] === 'version') {
        return supportedVersion();
      }
      if (args[0] === 'list') {
        return asProjectedResponse({
          code: 0,
          stdoutJson: [
            { id: 'OPEN-1', status: 'open', dependencies: [] },
            {
              id: 'BLOCKED-1',
              status: 'blocked',
              dependencies: []
            },
            { id: 'RUNNING-1', status: 'in_progress', dependencies: [] },
            { id: 'RESOLVED-1', status: 'resolved', dependencies: [] },
            { id: 'DEFERRED-1', status: 'deferred', dependencies: [] },
            {
              id: 'CLOSED-OLD',
              status: 'closed',
              closed_at: '2026-08-02T23:59:59.000Z',
              dependencies: []
            },
            {
              id: 'CLOSED-BOUNDARY',
              status: 'closed',
              closed_at: '2026-08-03T00:00:00.000Z',
              dependencies: []
            },
            {
              id: 'CLOSED-NEW',
              status: 'closed',
              closed_at: '2026-08-04T00:00:00.000Z',
              dependencies: []
            }
          ]
        });
      }
      if (args[0] === 'ready') {
        return asProjectedResponse({
          code: 0,
          stdoutJson: {
            ready: [
              {
                id: 'OPEN-1',
                updated_at: '2026-08-03T00:00:01.000Z',
                created_at: '2026-08-01T00:00:00.000Z',
                ready_extra: true
              }
            ],
            blocked: [
              {
                id: 'OPEN-1',
                updated_at: '2026-08-03T00:00:02.000Z',
                created_at: '2026-08-01T00:00:00.000Z',
                blocked_by: [{ id: 'EXTERNAL-1' }],
                blocked_extra: true
              }
            ]
          }
        });
      }
      throw new Error(`unexpected command: ${args.join(' ')}`);
    });

    const options = { cwd: '/workspace-parity', workspace_snapshot: true };
    const [all, ready, blocked, running, resolved, deferred, closed] =
      await Promise.all([
        fetchListForSubscription({ type: 'all-issues' }, options),
        fetchListForSubscription({ type: 'ready-issues' }, options),
        fetchListForSubscription({ type: 'blocked-issues' }, options),
        fetchListForSubscription({ type: 'in-progress-issues' }, options),
        fetchListForSubscription({ type: 'resolved-issues' }, options),
        fetchListForSubscription({ type: 'deferred-issues' }, options),
        fetchListForSubscription(
          { type: 'closed-issues', params: { since } },
          options
        )
      ]);

    expect(
      snapshotCommandCalls(/** @type {any} */ (runBdJsonProjected))
    ).toHaveLength(2);
    expect(all.ok && all.items.map((item) => item.id)).toEqual([
      'OPEN-1',
      'BLOCKED-1',
      'RUNNING-1',
      'RESOLVED-1',
      'DEFERRED-1'
    ]);
    expect(ready.ok && ready.items[0]).toMatchObject({
      id: 'OPEN-1',
      ready_extra: true
    });
    expect(typeof (ready.ok && ready.items[0].created_at)).toBe('number');
    expect(typeof (ready.ok && ready.items[0].updated_at)).toBe('number');
    expect(blocked.ok && blocked.items).toEqual([
      expect.objectContaining({
        id: 'OPEN-1',
        blocked_extra: true,
        blocked_info: { blockers: ['EXTERNAL-1'] }
      })
    ]);
    expect(typeof (blocked.ok && blocked.items[0].created_at)).toBe('number');
    expect(typeof (blocked.ok && blocked.items[0].updated_at)).toBe('number');
    expect(running.ok && running.items.map((item) => item.id)).toEqual([
      'RUNNING-1'
    ]);
    expect(resolved.ok && resolved.items.map((item) => item.id)).toEqual([
      'RESOLVED-1'
    ]);
    expect(deferred.ok && deferred.items.map((item) => item.id)).toEqual([
      'DEFERRED-1'
    ]);
    expect(closed.ok && closed.items.map((item) => item.id)).toEqual([
      'CLOSED-BOUNDARY',
      'CLOSED-NEW'
    ]);
  });

  test('uses one legacy dependency fallback generation with provenance parity', async () => {
    const coordinator = createWorkspaceSnapshotCoordinator({
      runBdJsonProjected: /** @type {any} */ (runBdJsonProjected),
      dependency_mode: 'legacy-dependency-fallback'
    });
    __setWorkspaceSnapshotCoordinatorFactoryForTest(() => coordinator);
    /** @type {import('vitest').Mock} */ (
      runBdJsonProjected
    ).mockImplementation(async (command_family, args) => {
      if (args[0] === 'version') {
        return supportedVersion();
      }
      if (args[0] === 'list') {
        return asProjectedResponse({
          code: 0,
          stdoutJson: [{ id: 'FOLLOWUP-1', status: 'open' }]
        });
      }
      if (args[0] === 'ready') {
        return asProjectedResponse({
          code: 0,
          stdoutJson: { ready: [], blocked: [] }
        });
      }
      if (args[0] === 'dep') {
        return asProjectedResponse(
          {
            code: 0,
            stdoutJson: [
              {
                issue_id: 'FOLLOWUP-1',
                depends_on_id: 'ROOT-1',
                type: 'discovered-from'
              }
            ]
          },
          'dep'
        );
      }
      throw new Error(`unexpected command: ${args.join(' ')}`);
    });

    const result = await fetchListForSubscription(
      { type: 'all-issues' },
      { cwd: '/workspace-legacy', workspace_snapshot: true }
    );

    expect(runBdJsonProjected).toHaveBeenCalledTimes(3);
    expect(result.ok && result.items).toEqual([
      expect.objectContaining({ id: 'FOLLOWUP-1', from_id: 'ROOT-1' })
    ]);
  });

  test('omits malformed embedded provenance ids without fabricating a value', async () => {
    /** @type {import('vitest').Mock} */ (
      runBdJsonProjected
    ).mockImplementation(async (command_family, args) => {
      if (args[0] === 'version') {
        return supportedVersion();
      }
      if (args[0] === 'list') {
        return asProjectedResponse({
          code: 0,
          stdoutJson: [
            {
              id: 'FOLLOWUP-1',
              status: 'open',
              dependencies: [
                {
                  type: 'discovered-from',
                  depends_on_id: { id: 'ROOT-1' }
                }
              ]
            }
          ]
        });
      }
      return asProjectedResponse({
        code: 0,
        stdoutJson: { ready: [], blocked: [] }
      });
    });

    const result = await fetchListForSubscription(
      { type: 'all-issues' },
      { cwd: '/workspace-embedded-malformed', workspace_snapshot: true }
    );

    expect(result.ok && 'from_id' in result.items[0]).toBe(false);
  });

  test('restores legacy subscription caps after snapshot projection', async () => {
    const rows = [
      ...Array.from({ length: 51 }, (_, index) => ({
        id: `ALL-${index + 1}`,
        status: 'open'
      })),
      ...Array.from({ length: 51 }, (_, index) => ({
        id: `RUN-${index + 1}`,
        status: 'in_progress'
      })),
      ...Array.from({ length: 1001 }, (_, index) => ({
        id: `READY-${index + 1}`,
        status: 'open'
      })),
      ...Array.from({ length: 1001 }, (_, index) => ({
        id: `STORED-${index + 1}`,
        status: 'blocked'
      })),
      ...Array.from({ length: 1001 }, (_, index) => ({
        id: `RESOLVED-${index + 1}`,
        status: 'resolved'
      })),
      ...Array.from({ length: 1001 }, (_, index) => ({
        id: `DEFERRED-${index + 1}`,
        status: 'deferred'
      })),
      ...Array.from({ length: 1001 }, (_, index) => ({
        id: `CLOSED-${index + 1}`,
        status: 'closed',
        closed_at: '2026-08-03T00:00:00.000Z'
      }))
    ];
    const ready = Array.from({ length: 1001 }, (_, index) => ({
      id: `READY-${index + 1}`
    }));
    const blocked = Array.from({ length: 1001 }, (_, index) => ({
      id: `READY-${index + 1}`,
      blocked_by: []
    }));
    /** @type {import('vitest').Mock} */ (
      runBdJsonProjected
    ).mockImplementation(async (command_family, args) => {
      if (args[0] === 'version') {
        return supportedVersion();
      }
      if (args[0] === 'list') {
        return asProjectedResponse({ code: 0, stdoutJson: rows });
      }
      return asProjectedResponse({
        code: 0,
        stdoutJson: { ready, blocked }
      });
    });
    const options = { cwd: '/workspace-caps', workspace_snapshot: true };
    const [
      all,
      running,
      ready_result,
      blocked_result,
      resolved,
      deferred,
      closed
    ] = await Promise.all([
      fetchListForSubscription({ type: 'all-issues' }, options),
      fetchListForSubscription({ type: 'in-progress-issues' }, options),
      fetchListForSubscription({ type: 'ready-issues' }, options),
      fetchListForSubscription({ type: 'blocked-issues' }, options),
      fetchListForSubscription({ type: 'resolved-issues' }, options),
      fetchListForSubscription({ type: 'deferred-issues' }, options),
      fetchListForSubscription({ type: 'closed-issues' }, options)
    ]);

    expect(all.ok && all.items.map((item) => item.id)).toEqual(
      Array.from({ length: 50 }, (_, index) => `ALL-${index + 1}`)
    );
    expect(running.ok && running.items).toHaveLength(50);
    expect(ready_result.ok && ready_result.items).toHaveLength(1000);
    expect(blocked_result.ok && blocked_result.items).toHaveLength(1000);
    expect(blocked_result.ok && blocked_result.items[0].id).toBe('READY-1');
    expect(resolved.ok && resolved.items).toHaveLength(1000);
    expect(deferred.ok && deferred.items).toHaveLength(1000);
    expect(closed.ok && closed.items).toHaveLength(1001);
  });
});

/**
 * @returns {{ code: number, stdoutJson: { version: string, commit: string } }}
 */
function supportedVersion() {
  return asProjectedResponse(
    {
      code: 0,
      stdoutJson: {
        version: '1.2.0-fork.1',
        commit: '6da490c1b54ed410150422380bb91fcf6f910bfa'
      }
    },
    'version'
  );
}

/**
 * @param {{ mock: { calls: Array<[string, string[]]> } }} runner
 */
function snapshotCommandCalls(runner) {
  return runner.mock.calls.filter(([, args]) => args[0] !== 'version');
}

describe('blocked-issues blocked_info derivation', () => {
  beforeEach(() => {
    /** @type {import('vitest').Mock} */ (runBdJsonProjected).mockReset();
  });

  /**
   * @param {unknown[]} dependency_blocked
   */
  function mockBlockedSources(dependency_blocked) {
    /** @type {import('vitest').Mock} */ (runBdJsonProjected)
      .mockResolvedValueOnce(
        asProjectedResponse({
          code: 0,
          stdoutJson: { ready: [], blocked: dependency_blocked }
        })
      )
      .mockResolvedValueOnce(asProjectedResponse({ code: 0, stdoutJson: [] }));
  }

  /**
   * @param {Awaited<ReturnType<typeof fetchListForSubscription>>} res
   * @param {string} id
   * @returns {any}
   */
  function blockedInfoOf(res, id) {
    if (!res.ok) {
      throw new Error('expected a successful fetch');
    }
    const item = res.items.find((it) => it.id === id);
    return item && /** @type {any} */ (item).blocked_info;
  }

  test('carries only the blocker ids', async () => {
    mockBlockedSources([
      {
        id: 'D-1',
        status: 'open',
        blocked_by: [{ id: 'D-0' }, { id: 'D-9' }]
      }
    ]);

    const res = await fetchListForSubscription({ type: 'blocked-issues' });

    expect(blockedInfoOf(res, 'D-1')).toEqual({ blockers: ['D-0', 'D-9'] });
  });

  test('carries an empty blockers list when the entry names none', async () => {
    mockBlockedSources([{ id: 'D-1', status: 'open' }]);

    const res = await fetchListForSubscription({ type: 'blocked-issues' });

    expect(blockedInfoOf(res, 'D-1')).toEqual({ blockers: [] });
  });

  test('ignores metadata.awaiting_user when deriving blocked_info', async () => {
    mockBlockedSources([
      {
        id: 'D-1',
        status: 'open',
        metadata: { awaiting_user: 'spec_review_stale:revise' },
        blocked_by: [{ id: 'D-0' }]
      }
    ]);

    const res = await fetchListForSubscription({ type: 'blocked-issues' });

    expect(blockedInfoOf(res, 'D-1')).toEqual({ blockers: ['D-0'] });
  });

  test('queries no stored status list for the blocked subscription', async () => {
    mockBlockedSources([{ id: 'D-1', status: 'open', blocked_by: [] }]);

    await fetchListForSubscription({ type: 'blocked-issues' });

    const calls = /** @type {import('vitest').Mock} */ (runBdJsonProjected).mock
      .calls;
    expect(calls.some((call) => call[1] && call[1].includes('--status'))).toBe(
      false
    );
  });
});

describe('closed-issues range filtering before enrichment', () => {
  const SINCE = Date.parse('2026-08-03T00:00:00.000Z');

  beforeEach(() => {
    /** @type {import('vitest').Mock} */ (runBdJsonProjected).mockReset();
    /** @type {import('vitest').Mock} */ (enrichIssuesWorkflow).mockClear();
  });

  /**
   * Two closed issues, one inside the `since` range and one outside it.
   */
  function mockClosedListThenDeps() {
    /** @type {import('vitest').Mock} */ (runBdJsonProjected)
      .mockResolvedValueOnce(
        asProjectedResponse({
          code: 0,
          stdoutJson: [
            { id: 'C-1', closed_at: '2026-08-03T01:00:00.000Z' },
            { id: 'C-2', closed_at: '2026-08-01T01:00:00.000Z' }
          ]
        })
      )
      .mockResolvedValueOnce(asProjectedResponse({ code: 0, stdoutJson: [] }));
  }

  test('keeps out-of-range issues out of workflow enrichment', async () => {
    mockClosedListThenDeps();

    await fetchListForSubscription({
      type: 'closed-issues',
      params: { since: SINCE }
    });

    const enriched = /** @type {import('vitest').Mock} */ (enrichIssuesWorkflow)
      .mock.calls[0][0];
    expect(enriched.map((/** @type {any} */ it) => it.id)).toEqual(['C-1']);
  });

  test('keeps out-of-range issues out of the provenance dep list', async () => {
    mockClosedListThenDeps();

    await fetchListForSubscription({
      type: 'closed-issues',
      params: { since: SINCE }
    });

    expect(
      /** @type {import('vitest').Mock} */ (runBdJsonProjected).mock.calls[1][1]
    ).toEqual(['dep', 'list', 'C-1', '--json']);
  });

  test('returns only the in-range issues', async () => {
    mockClosedListThenDeps();

    const res = await fetchListForSubscription({
      type: 'closed-issues',
      params: { since: SINCE }
    });

    expect(res.ok && res.items.map((it) => it.id)).toEqual(['C-1']);
  });

  test('leaves other subscription types unfiltered', async () => {
    mockClosedListThenDeps();

    const res = await fetchListForSubscription({ type: 'all-issues' });

    expect(res.ok && res.items.map((it) => it.id)).toEqual(['C-1', 'C-2']);
  });
});

describe('from_id provenance derivation', () => {
  beforeEach(() => {
    /** @type {import('vitest').Mock} */ (runBdJsonProjected).mockReset();
  });

  /**
   * @param {unknown[]} issues
   * @param {unknown} dep_result
   */
  function mockListThenDeps(issues, dep_result) {
    /** @type {import('vitest').Mock} */ (runBdJsonProjected)
      .mockResolvedValueOnce(
        asProjectedResponse({ code: 0, stdoutJson: issues })
      )
      .mockResolvedValueOnce(asProjectedResponse(dep_result, 'dep'));
  }

  test('attaches the discovered-from origin from a batch payload', async () => {
    mockListThenDeps([{ id: 'A-1' }, { id: 'A-2' }], {
      code: 0,
      stdoutJson: [
        { issue_id: 'A-2', depends_on_id: 'A-0', type: 'discovered-from' }
      ]
    });

    const res = await fetchListForSubscription({ type: 'all-issues' });

    expect(res.ok && res.items[1].from_id).toBe('A-0');
  });

  test('attaches the origin from the single-id payload shape', async () => {
    // bd answers a one-id request with the full TARGET issue plus a
    // `dependency_type`, not a bare edge — a one-card column hits this shape.
    mockListThenDeps([{ id: 'A-1' }], {
      code: 0,
      stdoutJson: [
        { id: 'A-0', title: 'origin', dependency_type: 'discovered-from' }
      ]
    });

    const res = await fetchListForSubscription({ type: 'all-issues' });

    expect(res.ok && res.items[0].from_id).toBe('A-0');
  });

  test('ignores non-provenance edges in the single-id payload shape', async () => {
    mockListThenDeps([{ id: 'A-1' }], {
      code: 0,
      stdoutJson: [
        { id: 'A-9', title: 'parent', dependency_type: 'parent-child' },
        { id: 'A-8', title: 'blocker', dependency_type: 'blocks' }
      ]
    });

    const res = await fetchListForSubscription({ type: 'all-issues' });

    expect(res.ok && 'from_id' in res.items[0]).toBe(false);
  });

  test('queries every listed id in one batch dep list call', async () => {
    mockListThenDeps([{ id: 'A-1' }, { id: 'A-2' }], {
      code: 0,
      stdoutJson: []
    });

    await fetchListForSubscription({ type: 'all-issues' });

    expect(
      /** @type {import('vitest').Mock} */ (runBdJsonProjected).mock.calls[1][1]
    ).toEqual(['dep', 'list', 'A-1', 'A-2', '--json']);
  });

  test('reads the origin from depends_on_id, not issue_id', async () => {
    mockListThenDeps([{ id: 'A-1' }, { id: 'A-2' }], {
      code: 0,
      stdoutJson: [
        { issue_id: 'A-1', depends_on_id: 'A-0', type: 'discovered-from' }
      ]
    });

    const res = await fetchListForSubscription({ type: 'all-issues' });

    expect(res.ok && res.items[0].from_id).toBe('A-0');
  });

  test('ignores non-discovered-from edges in a batch payload', async () => {
    mockListThenDeps([{ id: 'A-1' }, { id: 'A-2' }], {
      code: 0,
      stdoutJson: [
        { issue_id: 'A-1', depends_on_id: 'A-0', type: 'blocks' },
        { issue_id: 'A-1', depends_on_id: 'A-9', type: 'parent-child' }
      ]
    });

    const res = await fetchListForSubscription({ type: 'all-issues' });

    expect(res.ok && 'from_id' in res.items[0]).toBe(false);
  });

  test('keeps the first origin when an issue has several', async () => {
    mockListThenDeps([{ id: 'A-1' }, { id: 'A-2' }], {
      code: 0,
      stdoutJson: [
        { issue_id: 'A-1', depends_on_id: 'A-0', type: 'discovered-from' },
        { issue_id: 'A-1', depends_on_id: 'A-7', type: 'discovered-from' }
      ]
    });

    const res = await fetchListForSubscription({ type: 'all-issues' });

    expect(res.ok && res.items[0].from_id).toBe('A-0');
  });

  test('ignores malformed non-string provenance ids', async () => {
    mockListThenDeps([{ id: 'A-1' }, { id: 'A-2' }], {
      code: 0,
      stdoutJson: [
        {
          issue_id: 'A-1',
          depends_on_id: { id: 'A-0' },
          type: 'discovered-from'
        },
        { issue_id: 7, depends_on_id: 'A-0', type: 'discovered-from' }
      ]
    });

    const res = await fetchListForSubscription({ type: 'all-issues' });

    expect(res.ok && res.items.some((item) => 'from_id' in item)).toBe(false);
  });

  test('leaves issues untouched when the dep list call fails', async () => {
    mockListThenDeps([{ id: 'A-1' }], { code: 2, stderr: 'boom' });

    const res = await fetchListForSubscription({ type: 'all-issues' });

    expect(res.ok).toBe(true);
    expect(res.ok && 'from_id' in res.items[0]).toBe(false);
  });

  test('leaves issues untouched when the dep list call throws', async () => {
    /** @type {import('vitest').Mock} */ (runBdJsonProjected)
      .mockResolvedValueOnce(
        asProjectedResponse({ code: 0, stdoutJson: [{ id: 'A-1' }] })
      )
      .mockRejectedValueOnce(new Error('spawn failed'));

    const res = await fetchListForSubscription({ type: 'all-issues' });

    expect(res.ok).toBe(true);
    expect(res.ok && 'from_id' in res.items[0]).toBe(false);
  });

  test('skips the dep list call for an empty list', async () => {
    /** @type {import('vitest').Mock} */ (
      runBdJsonProjected
    ).mockResolvedValueOnce(
      asProjectedResponse({
        code: 0,
        stdoutJson: []
      })
    );

    await fetchListForSubscription({ type: 'all-issues' });

    expect(runBdJsonProjected).toHaveBeenCalledTimes(1);
  });
});

describe('ready/blocked candidate decorations (UI-d13v §3.3·§3.5·§3.7)', () => {
  const WS_MAIN = '/repos/main';
  const WS_PEER = '/repos/peer';
  const OLD_CLOSE_ISO = '2026-08-10T00:00:00.000Z';
  const NEW_CLOSE_ISO = '2026-08-20T00:00:00.000Z';

  beforeEach(() => {
    /** @type {import('vitest').Mock} */ (runBdJsonProjected).mockReset();
    __resetWorkspaceSnapshotRuntimeForTest();
    vi.mocked(visibleWorkspaceRoots).mockReturnValue([WS_MAIN]);
    vi.mocked(cachedIssuePrefixFor).mockReturnValue(null);
    vi.mocked(foreignBlockerClosedAtFor).mockReset();
    vi.mocked(foreignBlockerClosedAtFor).mockReturnValue(null);
  });

  /**
   * @param {string} issue_id
   * @param {string} depends_on_id
   */
  function blocksEdge(issue_id, depends_on_id) {
    return { issue_id, depends_on_id, type: 'blocks' };
  }

  /**
   * Serve one raw generation per workspace root, so a projection in one
   * workspace can peek what another one already fetched.
   *
   * @param {Record<string, { all: Array<Record<string, unknown>>, ready?: string[], blocked?: string[] }>} by_workspace
   */
  function mockWorkspaces(by_workspace) {
    /** @type {import('vitest').Mock} */ (
      runBdJsonProjected
    ).mockImplementation(async (command_family, args, options) => {
      if (args[0] === 'version') {
        return supportedVersion();
      }
      const cwd = String(options?.cwd ?? '');
      const workspace = by_workspace[cwd];
      if (!workspace) {
        throw new Error(`unexpected workspace: ${cwd}`);
      }
      if (args[0] === 'list') {
        return asProjectedResponse({ code: 0, stdoutJson: workspace.all });
      }
      if (args[0] === 'ready') {
        return asProjectedResponse({
          code: 0,
          stdoutJson: {
            ready: (workspace.ready || []).map((id) => ({ id })),
            blocked: (workspace.blocked || []).map((id) => ({
              id,
              blocked_by: []
            }))
          }
        });
      }
      throw new Error(`unexpected command: ${args.join(' ')}`);
    });
  }

  /**
   * @param {string} root_dir
   * @param {'ready-issues'|'blocked-issues'} type
   */
  async function projectIn(root_dir, type = 'ready-issues') {
    const result = await fetchListForSubscription(
      { type },
      { cwd: root_dir, workspace_snapshot: true }
    );
    if (!result.ok) {
      throw new Error(`projection failed: ${result.error.message}`);
    }
    return result.items;
  }

  test('carries a closed same-repo blocker with its close time', async () => {
    mockWorkspaces({
      [WS_MAIN]: {
        all: [
          {
            id: 'UI-1',
            status: 'open',
            dependencies: [blocksEdge('UI-1', 'UI-9')]
          },
          { id: 'UI-9', status: 'closed', closed_at: NEW_CLOSE_ISO }
        ],
        ready: ['UI-1']
      }
    });

    const items = await projectIn(WS_MAIN);

    expect(items[0].release_info).toEqual({
      released_by: [
        { id: 'UI-9', closed_at: Date.parse(NEW_CLOSE_ISO), foreign: false }
      ],
      last_released_at: Date.parse(NEW_CLOSE_ISO)
    });
  });

  test('leaves an open blocker to blocked_info', async () => {
    mockWorkspaces({
      [WS_MAIN]: {
        all: [
          {
            id: 'UI-1',
            status: 'open',
            dependencies: [blocksEdge('UI-1', 'UI-9')]
          },
          { id: 'UI-9', status: 'open' }
        ],
        ready: ['UI-1']
      }
    });

    const items = await projectIn(WS_MAIN);

    expect(Object.hasOwn(items[0], 'release_info')).toBe(false);
  });

  test('orders released blockers newest close first', async () => {
    mockWorkspaces({
      [WS_MAIN]: {
        all: [
          {
            id: 'UI-1',
            status: 'open',
            dependencies: [
              blocksEdge('UI-1', 'UI-8'),
              blocksEdge('UI-1', 'UI-9')
            ]
          },
          { id: 'UI-8', status: 'closed', closed_at: OLD_CLOSE_ISO },
          { id: 'UI-9', status: 'closed', closed_at: NEW_CLOSE_ISO }
        ],
        ready: ['UI-1']
      }
    });

    const items = await projectIn(WS_MAIN);

    expect(
      /** @type {any} */ (items[0].release_info).released_by.map(
        (/** @type {any} */ entry) => entry.id
      )
    ).toEqual(['UI-9', 'UI-8']);
  });

  test('carries every open follow-up id in sort order', async () => {
    const waiters = ['UI-2', 'UI-3', 'UI-4', 'UI-5', 'UI-6', 'UI-7'].map(
      (id) => ({
        id,
        status: 'open',
        dependencies: [blocksEdge(id, 'UI-1')]
      })
    );
    mockWorkspaces({
      [WS_MAIN]: {
        all: [
          { id: 'UI-1', status: 'open' },
          ...waiters,
          {
            id: 'UI-8',
            status: 'closed',
            closed_at: OLD_CLOSE_ISO,
            dependencies: [blocksEdge('UI-8', 'UI-1')]
          }
        ],
        ready: ['UI-1']
      }
    });

    const items = await projectIn(WS_MAIN);

    expect(items[0].dependents_info).toEqual({
      count: 6,
      ids: ['UI-2', 'UI-3', 'UI-4', 'UI-5', 'UI-6', 'UI-7']
    });
  });

  test('omits dependents_info when every follow-up is closed', async () => {
    mockWorkspaces({
      [WS_MAIN]: {
        all: [
          { id: 'UI-1', status: 'open' },
          {
            id: 'UI-2',
            status: 'closed',
            closed_at: OLD_CLOSE_ISO,
            dependencies: [blocksEdge('UI-2', 'UI-1')]
          }
        ],
        ready: ['UI-1']
      }
    });

    const items = await projectIn(WS_MAIN);

    expect(Object.hasOwn(items[0], 'dependents_info')).toBe(false);
  });

  test('adds the follow-ups another workspace already snapshotted', async () => {
    vi.mocked(visibleWorkspaceRoots).mockReturnValue([WS_MAIN, WS_PEER]);
    mockWorkspaces({
      [WS_MAIN]: {
        all: [
          { id: 'UI-1', status: 'open' },
          {
            id: 'UI-2',
            status: 'open',
            dependencies: [blocksEdge('UI-2', 'UI-1')]
          }
        ],
        ready: ['UI-1']
      },
      [WS_PEER]: {
        all: [
          {
            id: 'dotfiles-5',
            status: 'open',
            dependencies: [blocksEdge('dotfiles-5', 'UI-1')]
          }
        ],
        ready: ['dotfiles-5']
      }
    });
    await projectIn(WS_PEER);

    const items = await projectIn(WS_MAIN);

    expect(items[0].dependents_info).toEqual({
      count: 2,
      ids: ['UI-2', 'dotfiles-5'],
      root_dirs: { 'dotfiles-5': WS_PEER }
    });
  });

  test('changes decoration_rev when only the owning repo changed', async () => {
    vi.mocked(visibleWorkspaceRoots).mockReturnValue([WS_MAIN, WS_PEER]);
    mockWorkspaces({
      [WS_MAIN]: {
        all: [
          { id: 'UI-1', status: 'open' },
          {
            id: 'dotfiles-5',
            status: 'open',
            dependencies: [blocksEdge('dotfiles-5', 'UI-1')]
          }
        ],
        ready: ['UI-1']
      }
    });
    const same_repo = await projectIn(WS_MAIN);
    __resetWorkspaceSnapshotRuntimeForTest();
    mockWorkspaces({
      [WS_MAIN]: { all: [{ id: 'UI-1', status: 'open' }], ready: ['UI-1'] },
      [WS_PEER]: {
        all: [
          {
            id: 'dotfiles-5',
            status: 'open',
            dependencies: [blocksEdge('dotfiles-5', 'UI-1')]
          }
        ],
        ready: ['dotfiles-5']
      }
    });
    await projectIn(WS_PEER);

    const peer_owned = await projectIn(WS_MAIN);

    expect(/** @type {any} */ (same_repo[0].dependents_info).ids).toEqual([
      'dotfiles-5'
    ]);
    expect(peer_owned[0].dependents_info).toEqual({
      count: 1,
      ids: ['dotfiles-5'],
      root_dirs: { 'dotfiles-5': WS_PEER }
    });
    expect(peer_owned[0].decoration_rev).not.toBe(same_repo[0].decoration_rev);
  });

  test('never asks a workspace it has no snapshot of for one', async () => {
    vi.mocked(visibleWorkspaceRoots).mockReturnValue([WS_MAIN, WS_PEER]);
    mockWorkspaces({
      [WS_MAIN]: {
        all: [
          { id: 'UI-1', status: 'open' },
          {
            id: 'UI-2',
            status: 'open',
            dependencies: [blocksEdge('UI-2', 'UI-1')]
          }
        ],
        ready: ['UI-1']
      }
    });

    const items = await projectIn(WS_MAIN);

    expect(items[0].dependents_info).toEqual({ count: 1, ids: ['UI-2'] });
    expect(
      /** @type {import('vitest').Mock} */ (runBdJsonProjected).mock.calls.some(
        ([, , options]) => options?.cwd === WS_PEER
      )
    ).toBe(false);
  });

  test('carries a foreign release with the owning workspace', async () => {
    vi.mocked(visibleWorkspaceRoots).mockReturnValue([WS_MAIN, WS_PEER]);
    vi.mocked(cachedIssuePrefixFor).mockImplementation((root_dir) =>
      root_dir === WS_PEER ? 'dotfiles' : 'UI'
    );
    vi.mocked(foreignBlockerClosedAtFor).mockReturnValue(
      Date.parse(NEW_CLOSE_ISO)
    );
    mockWorkspaces({
      [WS_MAIN]: {
        all: [
          {
            id: 'UI-1',
            status: 'open',
            dependencies: [blocksEdge('UI-1', 'dotfiles-9')]
          }
        ],
        ready: ['UI-1']
      }
    });

    const items = await projectIn(WS_MAIN);

    expect(items[0].release_info).toEqual({
      released_by: [
        {
          id: 'dotfiles-9',
          closed_at: Date.parse(NEW_CLOSE_ISO),
          foreign: true,
          root_dir: WS_PEER
        }
      ],
      last_released_at: Date.parse(NEW_CLOSE_ISO)
    });
    expect(foreignBlockerClosedAtFor).toHaveBeenCalledWith(
      'dotfiles-9',
      WS_PEER,
      WS_MAIN
    );
  });

  test('omits a foreign blocker whose lookup has not landed', async () => {
    vi.mocked(visibleWorkspaceRoots).mockReturnValue([WS_MAIN, WS_PEER]);
    vi.mocked(cachedIssuePrefixFor).mockImplementation((root_dir) =>
      root_dir === WS_PEER ? 'dotfiles' : 'UI'
    );
    mockWorkspaces({
      [WS_MAIN]: {
        all: [
          {
            id: 'UI-1',
            status: 'open',
            dependencies: [blocksEdge('UI-1', 'dotfiles-9')]
          }
        ],
        ready: ['UI-1']
      }
    });

    const items = await projectIn(WS_MAIN);

    expect(Object.hasOwn(items[0], 'release_info')).toBe(false);
  });

  test('omits a foreign blocker no visible rig prefix owns', async () => {
    vi.mocked(visibleWorkspaceRoots).mockReturnValue([WS_MAIN, WS_PEER]);
    vi.mocked(cachedIssuePrefixFor).mockImplementation((root_dir) =>
      root_dir === WS_MAIN ? 'UI' : null
    );
    mockWorkspaces({
      [WS_MAIN]: {
        all: [
          {
            id: 'UI-1',
            status: 'open',
            dependencies: [blocksEdge('UI-1', 'dotfiles-9')]
          }
        ],
        ready: ['UI-1']
      }
    });

    const items = await projectIn(WS_MAIN);

    expect(Object.hasOwn(items[0], 'release_info')).toBe(false);
    expect(foreignBlockerClosedAtFor).not.toHaveBeenCalled();
  });

  test('decorates the blocked projection with the same keys', async () => {
    mockWorkspaces({
      [WS_MAIN]: {
        all: [
          {
            id: 'UI-1',
            status: 'open',
            dependencies: [blocksEdge('UI-1', 'UI-9')]
          },
          { id: 'UI-9', status: 'closed', closed_at: NEW_CLOSE_ISO },
          {
            id: 'UI-2',
            status: 'open',
            dependencies: [blocksEdge('UI-2', 'UI-1')]
          }
        ],
        blocked: ['UI-1']
      }
    });

    const items = await projectIn(WS_MAIN, 'blocked-issues');

    expect(items[0]).toMatchObject({
      id: 'UI-1',
      release_info: { last_released_at: Date.parse(NEW_CLOSE_ISO) },
      dependents_info: { count: 1, ids: ['UI-2'] }
    });
  });

  test('fingerprints both decorations in decoration_rev', async () => {
    mockWorkspaces({
      [WS_MAIN]: {
        all: [
          {
            id: 'UI-1',
            status: 'open',
            dependencies: [blocksEdge('UI-1', 'UI-9')]
          },
          { id: 'UI-9', status: 'closed', closed_at: NEW_CLOSE_ISO },
          {
            id: 'UI-2',
            status: 'open',
            dependencies: [blocksEdge('UI-2', 'UI-1')]
          }
        ],
        ready: ['UI-1']
      }
    });

    const items = await projectIn(WS_MAIN);

    expect(items[0].decoration_rev).toBe(
      [
        'dependents_info=1:UI-2:',
        `release_info=UI-9:${Date.parse(NEW_CLOSE_ISO)}:0:`
      ].join('\u001e')
    );
  });

  test('carries an empty decoration_rev when neither decoration applies', async () => {
    mockWorkspaces({
      [WS_MAIN]: { all: [{ id: 'UI-1', status: 'open' }], ready: ['UI-1'] }
    });

    const items = await projectIn(WS_MAIN);

    expect(items[0].decoration_rev).toBe('');
  });
});
