import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  normalizeBdDependencyRows,
  normalizeBdIssueList,
  normalizeBdReadyExplain,
  normalizeBdVersionCapability
} from './bd-json.js';
import { runBdJsonProjected } from './bd.js';
import {
  __resetWorkspaceSnapshotRuntimeForTest,
  requestWorkspaceSnapshot
} from './workspace-snapshot-runtime.js';

vi.mock('./bd.js', () => ({ runBdJsonProjected: vi.fn() }));

const ALL_ARGS = ['list', '--json', '--tree=false', '--all', '--limit', '0'];
const READY_ARGS = ['ready', '--explain', '--limit', '0', '--json'];

beforeEach(() => {
  __resetWorkspaceSnapshotRuntimeForTest();
  /** @type {import('vitest').Mock} */ (runBdJsonProjected).mockReset();
});

afterEach(() => {
  __resetWorkspaceSnapshotRuntimeForTest();
});

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

describe('workspace snapshot runtime dependency capability', () => {
  test('uses embedded dependencies for any live bd build without probing version', async () => {
    /** @type {import('vitest').Mock} */ (
      runBdJsonProjected
    ).mockImplementation(async (command_family, args) => {
      if (args[0] === 'version') {
        return asProjectedResponse('version', {
          code: 0,
          stdoutJson: {
            version: '1.2.0-fork.1',
            commit: 'different-same-capability-build'
          }
        });
      }
      if (args[0] === 'list') {
        return asProjectedResponse('list', {
          code: 0,
          stdoutJson: [
            {
              id: 'A',
              dependencies: [
                {
                  issue_id: 'A',
                  depends_on_id: 'ROOT',
                  type: 'discovered-from'
                }
              ]
            }
          ]
        });
      }
      if (args[0] === 'dep') {
        return asProjectedResponse('dep', {
          code: 0,
          stdoutJson: [
            { issue_id: 'A', depends_on_id: 'ROOT', type: 'discovered-from' }
          ]
        });
      }
      return asProjectedResponse('ready-explain', {
        code: 0,
        stdoutJson: { ready: [], blocked: [] }
      });
    });

    const result = await requestWorkspaceSnapshot(
      '/workspace/supported',
      'poll'
    );

    expect(result.ok && result.snapshot).toMatchObject({
      command_mode: 'embedded-dependencies',
      command_count: 2
    });
    expect(result.ok && result.snapshot.all[0].dependencies).toEqual([
      { issue_id: 'A', depends_on_id: 'ROOT', type: 'discovered-from' }
    ]);
    expect(
      /** @type {import('vitest').Mock} */ (runBdJsonProjected).mock.calls.map(
        ([, args]) => args
      )
    ).toEqual([ALL_ARGS, READY_ARGS]);
  });

  test('shares embedded generations across concurrent and later workspace requests', async () => {
    /** @type {import('vitest').Mock} */ (
      runBdJsonProjected
    ).mockImplementation(async (command_family, args) => {
      if (args[0] === 'list') {
        return asProjectedResponse('list', { code: 0, stdoutJson: [] });
      }
      return asProjectedResponse('ready-explain', {
        code: 0,
        stdoutJson: { ready: [], blocked: [] }
      });
    });

    const first = requestWorkspaceSnapshot('/workspace/supported', 'poll');
    const second = requestWorkspaceSnapshot('/workspace/supported', 'watcher');
    const [first_result, second_result] = await Promise.all([first, second]);
    const later_result = await requestWorkspaceSnapshot(
      '/workspace/supported',
      'poll'
    );
    const other_result = await requestWorkspaceSnapshot(
      '/workspace/other',
      'poll'
    );

    expect(first_result.ok && first_result.snapshot.command_count).toBe(2);
    expect(second_result.ok && second_result.snapshot.command_count).toBe(2);
    expect(later_result.ok && later_result.snapshot.command_count).toBe(2);
    expect(other_result.ok && other_result.snapshot.command_count).toBe(2);
    expect(
      /** @type {import('vitest').Mock} */ (runBdJsonProjected).mock.calls.map(
        ([, args]) => args
      )
    ).toEqual([
      ALL_ARGS,
      READY_ARGS,
      ALL_ARGS,
      READY_ARGS,
      ALL_ARGS,
      READY_ARGS
    ]);
  });
});
