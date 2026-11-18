import { describe, expect, test } from 'vitest';
import { decorateQueue } from './worker-handlers.js';

const WS = '/tmp/example-workspace/project-a';

/**
 * A queue whose quick_fix landing of S1 stopped at the deploy step on the
 * failed run `dep-1`, patched by `operation_patch`.
 *
 * @param {Record<string, any>} [operation_patch]
 */
function landingQueue(operation_patch = {}) {
  return {
    revision: 1,
    auto_advance: false,
    auto_merge: false,
    queue: [],
    pr_wait: [],
    done: [],
    attempts: {
      'quickfix-land': {
        attempt_id: 'quickfix-land',
        bead_id: 'S1',
        status: 'failed',
        quickfix_lane: true,
        quickfix_landing: {
          cursor: 'repo_operations',
          head_sha: 'a'.repeat(40),
          reason: 'script_failed',
          deploy_operation_id: 'dep-1'
        }
      }
    },
    repo_operations: {
      'dep-1': {
        operation_id: 'dep-1',
        kind: 'deploy',
        state: 'failed',
        subjects: [{ bead_id: 'S1', merged_sha: 'a'.repeat(40) }],
        failure: { code: 'script_failed', summary: 'restart failed' },
        ...operation_patch
      }
    }
  };
}

describe('decorateQueue landing deploy failures (UI-1fss §4.2)', () => {
  test('projects the landing deploy failure the server judges by Bead', () => {
    const queue = landingQueue();

    const decorated = /** @type {any} */ (decorateQueue(WS, queue));

    expect(decorated.landing_deploy_failures).toEqual({ S1: 'dep-1' });
  });

  test('projects nothing once a rerun superseded the failed run', () => {
    const queue = landingQueue({ superseded_by: 'dep-2' });

    const decorated = /** @type {any} */ (decorateQueue(WS, queue));

    expect(decorated.landing_deploy_failures).toEqual({});
  });
});
