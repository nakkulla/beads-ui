import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { runBdJson } from './bd.js';
import {
  __resetWorkspaceSnapshotRuntimeForTest,
  requestWorkspaceSnapshot
} from './workspace-snapshot-runtime.js';

vi.mock('./bd.js', () => ({ runBdJson: vi.fn() }));

const ALL_ARGS = ['list', '--json', '--tree=false', '--all', '--limit', '0'];
const READY_ARGS = ['ready', '--explain', '--limit', '0', '--json'];

beforeEach(() => {
  __resetWorkspaceSnapshotRuntimeForTest();
  /** @type {import('vitest').Mock} */ (runBdJson).mockReset();
});

afterEach(() => {
  __resetWorkspaceSnapshotRuntimeForTest();
});

describe('workspace snapshot runtime dependency capability', () => {
  test('uses embedded dependencies for any live bd build without probing version', async () => {
    /** @type {import('vitest').Mock} */ (runBdJson).mockImplementation(
      async (args) => {
        if (args[0] === 'version') {
          return {
            code: 0,
            stdoutJson: {
              version: '1.2.0-fork.1',
              commit: 'different-same-capability-build'
            }
          };
        }
        if (args[0] === 'list') {
          return {
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
          };
        }
        if (args[0] === 'dep') {
          return {
            code: 0,
            stdoutJson: [
              { issue_id: 'A', depends_on_id: 'ROOT', type: 'discovered-from' }
            ]
          };
        }
        return { code: 0, stdoutJson: { ready: [], blocked: [] } };
      }
    );

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
      /** @type {import('vitest').Mock} */ (runBdJson).mock.calls.map(
        ([args]) => args
      )
    ).toEqual([ALL_ARGS, READY_ARGS]);
  });

  test('shares embedded generations across concurrent and later workspace requests', async () => {
    /** @type {import('vitest').Mock} */ (runBdJson).mockImplementation(
      async (args) => {
        if (args[0] === 'list') {
          return { code: 0, stdoutJson: [] };
        }
        return { code: 0, stdoutJson: { ready: [], blocked: [] } };
      }
    );

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
      /** @type {import('vitest').Mock} */ (runBdJson).mock.calls.map(
        ([args]) => args
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
