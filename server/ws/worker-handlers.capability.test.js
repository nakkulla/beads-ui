import { describe, expect, test } from 'vitest';
import { MANUAL_MERGE_CONTINUATION } from '../worker/queue-store.js';
import { decorateQueue } from './worker-handlers.js';

const WS = '/tmp/example-workspace/project-a';

/**
 * @param {Record<string, unknown>} [extra]
 * @returns {Record<string, unknown>}
 */
function bareQueue(extra = {}) {
  return {
    revision: 1,
    auto_advance: false,
    auto_merge: false,
    queue: [],
    pr_wait: [],
    done: [],
    attempts: {},
    exec_defaults: {},
    ...extra
  };
}

describe('decorateQueue manual continuation capability (UI-58w8 §8)', () => {
  test('projects the queue-schema capability constant read-only', () => {
    const out = /** @type {any} */ (decorateQueue(WS, bareQueue()));

    expect(out.manual_merge_continuation).toEqual({
      schema_version: 1,
      head_review_projection: true
    });
    expect(out.manual_merge_continuation).toEqual(MANUAL_MERGE_CONTINUATION);
  });

  test('keeps auto_merge and the capability as independent fields', () => {
    const off = /** @type {any} */ (decorateQueue(WS, bareQueue()));
    const on = /** @type {any} */ (
      decorateQueue(WS, bareQueue({ auto_merge: true }))
    );

    expect(off.auto_merge).toBe(false);
    expect(on.auto_merge).toBe(true);
    expect(off.manual_merge_continuation).toEqual(on.manual_merge_continuation);
  });
});

describe('decorateQueue stale-work residue capability', () => {
  test('projects branch residue without server-only identity', () => {
    const out = /** @type {any} */ (
      decorateQueue(
        WS,
        bareQueue({
          admission: {
            'UI-1': {
              reason: 'worktree_stale_work',
              at: 1,
              stale_work: {
                schema: 1,
                residue: 'branch',
                state: 'unique',
                cause: 'ahead_not_contained',
                summary: {
                  staged_count: 0,
                  unstaged_count: 0,
                  untracked_count: 0,
                  branch_ahead: 2,
                  head_ahead: 0
                },
                identity_digest: 'identity-1',
                action_id: 'action-1',
                can_resume: false,
                can_continue: false,
                can_backup_fresh: true,
                can_recheck: true,
                identity: {
                  worktree_realpath: '/private/repo/.worktrees/UI-1',
                  branch: 'UI-1',
                  branch_head_sha: 'a'.repeat(40),
                  raw_stderr: 'secret path',
                  file_contents: 'secret contents'
                }
              }
            }
          }
        })
      )
    );

    expect(out.admission['UI-1'].stale_work).toMatchObject({
      residue: 'branch',
      can_resume: false,
      can_continue: false,
      can_backup_fresh: true,
      can_recheck: true
    });
    expect(out.admission['UI-1'].stale_work).not.toHaveProperty('identity');
  });

  test('defaults legacy residue projection to worktree', () => {
    const out = /** @type {any} */ (
      decorateQueue(
        WS,
        bareQueue({
          admission: {
            'UI-1': {
              reason: 'worktree_stale_work',
              at: 1,
              stale_work: {
                schema: 1,
                state: 'unknown',
                cause: 'observe_failed',
                summary: {
                  staged_count: 0,
                  unstaged_count: 0,
                  untracked_count: 0,
                  branch_ahead: 0,
                  head_ahead: 0
                },
                identity_digest: 'identity-1',
                action_id: 'action-1',
                can_resume: false,
                can_continue: false,
                can_backup_fresh: false,
                can_recheck: true
              }
            }
          }
        })
      )
    );

    expect(out.admission['UI-1'].stale_work.residue).toBe('worktree');
  });
});
