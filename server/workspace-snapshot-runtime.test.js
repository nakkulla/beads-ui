import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { runBdJson } from './bd.js';
import {
  __resetWorkspaceSnapshotRuntimeForTest,
  requestWorkspaceSnapshot
} from './workspace-snapshot-runtime.js';

vi.mock('./bd.js', () => ({ runBdJson: vi.fn() }));

const ALL_ARGS = ['list', '--json', '--tree=false', '--all', '--limit', '0'];
const READY_ARGS = ['ready', '--explain', '--limit', '0', '--json'];
const VERSION_ARGS = ['version', '--json'];
const SUPPORTED_IDENTITY = {
  version: '1.2.0-fork.1',
  commit: '6da490c1b54ed410150422380bb91fcf6f910bfa'
};

beforeEach(() => {
  __resetWorkspaceSnapshotRuntimeForTest();
  /** @type {import('vitest').Mock} */ (runBdJson).mockReset();
});

afterEach(() => {
  __resetWorkspaceSnapshotRuntimeForTest();
});

/**
 * @param {Array<Record<string, unknown>>} all
 */
function successfulGeneration(all) {
  return [
    { code: 0, stdoutJson: all },
    { code: 0, stdoutJson: { ready: [], blocked: [] } }
  ];
}

describe('workspace snapshot runtime dependency capability', () => {
  test('caches the supported live identity across concurrent and later workspace requests', async () => {
    /** @type {Array<(value: unknown) => void>} */
    const version_resolvers = [];
    let version_calls = 0;
    /** @type {import('vitest').Mock} */ (runBdJson).mockImplementation(
      (args) => {
        if (args[0] === 'version') {
          version_calls += 1;
          if (version_calls > 1) {
            return Promise.resolve({ code: 0, stdoutJson: SUPPORTED_IDENTITY });
          }
          return new Promise((resolve) => version_resolvers.push(resolve));
        }
        if (args[0] === 'list') {
          return Promise.resolve({ code: 0, stdoutJson: [] });
        }
        return Promise.resolve({
          code: 0,
          stdoutJson: { ready: [], blocked: [] }
        });
      }
    );

    const first = requestWorkspaceSnapshot('/workspace/supported', 'poll');
    const second = requestWorkspaceSnapshot('/workspace/supported', 'watcher');
    await Promise.resolve();
    version_resolvers[0]({ code: 0, stdoutJson: SUPPORTED_IDENTITY });

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
      /** @type {import('vitest').Mock} */ (runBdJson).mock.calls.filter(
        ([args]) => args[0] === 'version'
      )
    ).toHaveLength(2);
    expect(
      /** @type {import('vitest').Mock} */ (runBdJson).mock.calls.map(
        ([args]) => args
      )
    ).toEqual([
      VERSION_ARGS,
      ALL_ARGS,
      READY_ARGS,
      ALL_ARGS,
      READY_ARGS,
      VERSION_ARGS,
      ALL_ARGS,
      READY_ARGS
    ]);
  });

  test.each([
    [
      'unknown',
      { code: 0, stdoutJson: { version: '1.2.0', commit: 'unknown' } }
    ],
    ['malformed', { code: 0, stdoutJson: { version: '1.2.0-fork.1' } }],
    ['failed', { code: 2, stderr: 'version failed' }],
    ['throws', new Error('version spawn failed')]
  ])(
    'uses the legacy fallback for a %s live identity',
    async (_kind, version_result) => {
      /** @type {Array<unknown>} */
      const responses = [
        version_result,
        ...successfulGeneration([{ id: 'A' }]),
        {
          code: 0,
          stdoutJson: [
            { issue_id: 'A', depends_on_id: 'ROOT', type: 'discovered-from' }
          ]
        }
      ];
      /** @type {import('vitest').Mock} */ (runBdJson).mockImplementation(
        async () => {
          const response = responses.shift();
          if (response instanceof Error) {
            throw response;
          }
          return response;
        }
      );

      const result = await requestWorkspaceSnapshot(
        '/workspace/legacy',
        'poll'
      );

      expect(result.ok && result.snapshot).toMatchObject({
        command_mode: 'legacy-dependency-fallback',
        command_count: 3,
        dependency_edges: [
          { issue_id: 'A', depends_on_id: 'ROOT', type: 'discovered-from' }
        ]
      });
      expect(
        /** @type {import('vitest').Mock} */ (runBdJson).mock.calls.map(
          ([args]) => args
        )
      ).toEqual([
        VERSION_ARGS,
        ALL_ARGS,
        READY_ARGS,
        ['dep', 'list', 'A', '--json']
      ]);
    }
  );
});
