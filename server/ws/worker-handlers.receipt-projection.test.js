import { beforeEach, describe, expect, test } from 'vitest';
import { getWorkerRuntime } from '../worker/runtime.js';
import { decorateQueue } from './worker-handlers.js';

const WS = '/tmp/example-workspace/project-receipt';

/**
 * @param {Record<string, unknown>} [extra]
 */
function bareQueue(extra = {}) {
  return {
    revision: 1,
    auto_advance: false,
    auto_merge: true,
    queue: [],
    pr_wait: [],
    done: [],
    attempts: {},
    ...extra
  };
}

/**
 * A full receipt result carrying one violation, in the shape both the scan and
 * an attempt record it in.
 *
 * @param {string} code
 */
function violatingCheck(code) {
  return {
    ok: false,
    probe_error: false,
    checked_at: 5,
    violations: [{ code, detail: 'main:bead' }],
    checks: {}
  };
}

/**
 * @param {string} bead_id
 * @param {Record<string, unknown>|null} receipt_check
 */
function registerExternal(bead_id, receipt_check) {
  getWorkerRuntime().externalPrs.replace(WS, [
    {
      bead_id,
      pr_url: 'https://github.com/o/r/pull/7',
      pr_number: 7,
      receipt_check: /** @type {any} */ (receipt_check)
    }
  ]);
}

/**
 * @param {string} bead_id
 * @param {Record<string, unknown>} receipt_check
 */
function attemptsWithCheck(bead_id, receipt_check) {
  return { a1: { attempt_id: 'a1', bead_id, receipt_check } };
}

/**
 * @param {Record<string, unknown>} queue
 * @returns {Record<string, any>}
 */
function observationsOf(queue) {
  return /** @type {any} */ (decorateQueue(WS, queue)).pr_observations;
}

describe('pr_observations receipt_check source (UI-17mj §2.3)', () => {
  beforeEach(() => {
    getWorkerRuntime().externalPrs.replace(WS, []);
  });

  test('summarizes the registry observation for an external row', () => {
    registerExternal('UI-1', violatingCheck('unit_plan_mismatch'));

    const receipt_check = observationsOf(bareQueue())['UI-1'].receipt_check;

    expect(receipt_check).toMatchObject({
      ok: false,
      probe_error: false,
      codes: ['unit_plan_mismatch']
    });
  });

  // The regression UI-17mj §2.3 names: a conflict-resolution attempt leaves a
  // terminal verdict behind that outlives the metadata fix it complained about.
  test('ignores an attempt record for an external row the registry cleared', () => {
    registerExternal('UI-1', null);

    const receipt_check = observationsOf(
      bareQueue({
        attempts: attemptsWithCheck(
          'UI-1',
          violatingCheck('unit_plan_mismatch')
        )
      })
    )['UI-1'].receipt_check;

    expect(receipt_check).toBe(null);
  });

  test('reports nothing for a row synthesized from the merge queue alone', () => {
    const receipt_check = observationsOf(
      bareQueue({
        merge_queue: [{ bead_id: 'UI-1' }],
        attempts: attemptsWithCheck(
          'UI-1',
          violatingCheck('unit_plan_mismatch')
        )
      })
    )['UI-1'].receipt_check;

    expect(receipt_check).toBe(null);
  });

  test('keeps reading the attempt record for a durable row', () => {
    const receipt_check = observationsOf(
      bareQueue({
        pr_wait: [{ bead_id: 'UI-2', added_at: 1 }],
        attempts: attemptsWithCheck(
          'UI-2',
          violatingCheck('main_receipt_unbacked')
        )
      })
    )['UI-2'].receipt_check;

    expect(receipt_check).toMatchObject({
      ok: false,
      codes: ['main_receipt_unbacked']
    });
  });
});
