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
    expect(off.manual_merge_continuation).toEqual(
      on.manual_merge_continuation
    );
  });
});
