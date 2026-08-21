import { describe, expect, test } from 'vitest';
import {
  RECEIPT_BASELINE_KEYS,
  blockingReceiptCodes,
  checkReceipts,
  receiptDefaultsFrom,
  receiptGateState,
  receiptLineageForAttempt,
  receiptProbeError,
  summarizeReceiptCheck
} from './receipt-check.js';

const SHA = 'a'.repeat(40);
const OTHER_SHA = 'b'.repeat(40);

/** Projection facts that make `main:quick_fix_default` decidable. */
const QUICK_FIX_MAIN = { supported: true, quick_fix_dispatch: 'main' };

/**
 * @param {Record<string, unknown>} metadata
 * @param {Record<string, unknown>} [extra]
 */
function run(metadata, extra = {}) {
  return checkReceipts({ metadata, baseline: null, ...extra });
}

/**
 * @param {{ violations: { code: string }[] }} result
 */
function codesOf(result) {
  return result.violations.map((violation) => violation.code);
}

describe('receipt-check exec_receipt form', () => {
  test('accepts a delegated receipt carrying model and effort', async () => {
    const result = await run({ exec_receipt: `delegated:sol:xhigh@${SHA}` });

    expect(result.ok).toBe(true);
  });

  test('accepts the historical delegated receipt with no effort segment', async () => {
    const result = await run({ exec_receipt: `delegated:sol@${SHA}` });

    expect(result.ok).toBe(true);
  });

  test('reports a delegated tail that is not an effort token', async () => {
    const result = await run({ exec_receipt: `delegated:sol:hgih@${SHA}` });

    expect(codesOf(result)).toEqual(['exec_receipt_malformed']);
  });

  test('reports a receipt whose sha is not forty hex', async () => {
    const result = await run({ exec_receipt: 'main:bead@deadbeef' });

    expect(codesOf(result)).toEqual(['exec_receipt_malformed']);
  });

  test('judges nothing when exec_receipt is absent', async () => {
    const result = await run({ route: 'quick_fix' });

    expect(result.ok).toBe(true);
    expect(result.checks.exec_receipt).toBe(null);
  });
});

describe('receipt-check main token backing', () => {
  test('accepts main:bead backed by impl_dispatch=main', async () => {
    const result = await run({
      exec_receipt: `main:bead@${SHA}`,
      impl_dispatch: 'main'
    });

    expect(result.ok).toBe(true);
  });

  test('reports main:bead without impl_dispatch=main', async () => {
    const result = await run({ exec_receipt: `main:bead@${SHA}` });

    expect(codesOf(result)).toEqual(['main_receipt_unbacked']);
  });

  test('accepts main:quick_fix_default on a quick_fix route with a main default', async () => {
    const result = await run(
      { exec_receipt: `main:quick_fix_default@${SHA}`, route: 'quick_fix' },
      { defaults: QUICK_FIX_MAIN }
    );

    expect(result.ok).toBe(true);
  });

  test('reports main:quick_fix_default outside the quick_fix route', async () => {
    const result = await run(
      { exec_receipt: `main:quick_fix_default@${SHA}`, route: 'spec_backed' },
      { defaults: QUICK_FIX_MAIN }
    );

    expect(codesOf(result)).toEqual(['main_receipt_unbacked']);
  });

  test('reports main:quick_fix_default when impl_dispatch is present', async () => {
    const result = await run(
      {
        exec_receipt: `main:quick_fix_default@${SHA}`,
        route: 'quick_fix',
        impl_dispatch: 'main'
      },
      { defaults: QUICK_FIX_MAIN }
    );

    expect(codesOf(result)).toEqual(['main_receipt_unbacked']);
  });

  test('reports main:quick_fix_default when the route default is not main', async () => {
    const result = await run(
      { exec_receipt: `main:quick_fix_default@${SHA}`, route: 'quick_fix' },
      { defaults: { supported: true, quick_fix_dispatch: 'delegated' } }
    );

    expect(codesOf(result)).toEqual(['main_receipt_unbacked']);
  });

  test('records an unsupported projection instead of judging the route default', async () => {
    const result = await run(
      { exec_receipt: `main:quick_fix_default@${SHA}`, route: 'quick_fix' },
      { defaults: { supported: false, quick_fix_dispatch: null } }
    );

    expect(result.ok).toBe(true);
    expect(result.checks.exec_receipt).toMatchObject({
      quick_fix_default_dispatch: 'unsupported'
    });
  });

  test('accepts main:phase_line backed by planned_execution=main', async () => {
    const result = await run({
      exec_receipt: `main:phase_line@${SHA}`,
      planned_execution: 'main'
    });

    expect(result.ok).toBe(true);
  });

  test('reports main:phase_line without planned_execution=main', async () => {
    const result = await run({
      exec_receipt: `main:phase_line@${SHA}`,
      planned_execution: 'delegated'
    });

    expect(codesOf(result)).toEqual(['main_receipt_unbacked']);
  });

  test('accepts main:takeover backed by a finished delegation of the same model', async () => {
    const result = await run(
      { exec_receipt: `main:takeover@${SHA}` },
      {
        lineage: {
          supported: true,
          sessions: [
            { role: 'implementation', status: 'done', model: 'sol' },
            { role: 'review-consult', status: 'done', model: 'sol' }
          ],
          resolved_impl_model: 'sol'
        }
      }
    );

    expect(result.ok).toBe(true);
  });

  test('reports main:takeover when no implementation delegation finished', async () => {
    const result = await run(
      { exec_receipt: `main:takeover@${SHA}` },
      {
        lineage: {
          supported: true,
          sessions: [
            { role: 'implementation', status: 'running', model: 'sol' }
          ],
          resolved_impl_model: 'sol'
        }
      }
    );

    expect(codesOf(result)).toEqual(['takeover_lineage_missing']);
  });

  test('reports main:takeover when the delegation model is not the resolved one', async () => {
    const result = await run(
      { exec_receipt: `main:takeover@${SHA}` },
      {
        lineage: {
          supported: true,
          sessions: [
            { role: 'implementation', status: 'done', model: 'terra' }
          ],
          resolved_impl_model: 'sol'
        }
      }
    );

    expect(codesOf(result)).toEqual(['takeover_lineage_missing']);
  });

  test('skips the takeover lineage where the monitor cannot see it', async () => {
    const result = await run(
      { exec_receipt: `main:takeover@${SHA}` },
      {
        lineage: {
          supported: false,
          sessions: [],
          resolved_impl_model: 'opus'
        }
      }
    );

    expect(result.ok).toBe(true);
    expect(result.checks.exec_receipt).toMatchObject({
      takeover_lineage: 'undecidable'
    });
  });

  test('retires every main reason outside the fixed four tokens', async () => {
    const result = await run({
      exec_receipt: `main:user_choice@${SHA}`,
      impl_dispatch: 'main'
    });

    expect(codesOf(result)).toEqual(['main_reason_retired']);
  });
});

describe('receipt-check unit_plan agreement', () => {
  test('accepts a multi-unit receipt whose unit set matches the plan', async () => {
    const result = await run({
      unit_plan: '두 유닛으로 분할 | core:server/core.js; display:app/views/',
      exec_receipt: `core:delegated:sol:high@${SHA}; display:main:bead@${SHA}`,
      impl_dispatch: 'main'
    });

    expect(result.ok).toBe(true);
  });

  test('reports a unit the receipt never accounted for', async () => {
    const result = await run({
      unit_plan: '두 유닛으로 분할 | core:server/core.js; display:app/views/',
      exec_receipt: `core:delegated:sol:high@${SHA}`
    });

    expect(codesOf(result)).toEqual(['unit_plan_mismatch']);
  });

  test('reports a receipt unit the plan never named', async () => {
    const result = await run({
      unit_plan: '한 유닛 | core:server/core.js',
      exec_receipt: `core:delegated:sol@${SHA}; extra:delegated:sol@${SHA}`
    });

    expect(codesOf(result)).toEqual(['unit_plan_mismatch']);
  });

  test('judges each unit receipt by the same single predicate', async () => {
    const result = await run({
      unit_plan: '두 유닛으로 분할 | core:server/core.js; display:app/views/',
      exec_receipt: `core:main:bead@${SHA}; display:delegated:sol@${SHA}`
    });

    expect(codesOf(result)).toEqual(['main_receipt_unbacked']);
  });

  test('reports one undifferentiated receipt for a multi-unit plan', async () => {
    const result = await run({
      unit_plan: '두 유닛으로 분할 | core:server/core.js; display:app/views/',
      exec_receipt: `delegated:sol:high@${SHA}`
    });

    expect(codesOf(result)).toEqual(['unit_plan_mismatch']);
  });

  test('reads unit names past the plan reason rather than from it', async () => {
    const result = await run({
      unit_plan: 'core; display 두 축을 분리한다 | core:server/; display:app/',
      exec_receipt: `core:delegated:sol:high@${SHA}; display:delegated:sol:high@${SHA}`
    });

    expect(result.ok).toBe(true);
  });

  test('leaves a single-unit plan with a plain receipt alone', async () => {
    const result = await run({
      unit_plan: '한 유닛 | core:server/core.js',
      exec_receipt: `delegated:sol:high@${SHA}`
    });

    expect(result.ok).toBe(true);
  });
});

describe('receipt-check baseline deltas', () => {
  /** @type {Record<string, string|null>} */
  const EMPTY_BASELINE = {
    exec_receipt: null,
    impl_entry: null,
    plan_approval: null,
    workflow_mode_source: null,
    impl_dispatch: null
  };

  test('names the five keys a dispatch snapshots', () => {
    expect(RECEIPT_BASELINE_KEYS).toEqual([
      'exec_receipt',
      'impl_entry',
      'plan_approval',
      'workflow_mode_source',
      'impl_dispatch'
    ]);
  });

  test('reports an impl_entry that appeared during an unattended attempt', async () => {
    const result = await run(
      { impl_entry: `user@${SHA}` },
      { baseline: EMPTY_BASELINE }
    );

    expect(codesOf(result)).toEqual(['approval_forged']);
  });

  test('reports a plan_approval whose value changed under the attempt', async () => {
    const result = await run(
      { plan_approval: `user@${OTHER_SHA}` },
      { baseline: { ...EMPTY_BASELINE, plan_approval: `user@${SHA}` } }
    );

    expect(codesOf(result)).toEqual(['approval_forged']);
  });

  test('reports an impl_dispatch written after the dispatch snapshot', async () => {
    const result = await run(
      { impl_dispatch: 'main', exec_receipt: `main:bead@${SHA}` },
      { baseline: EMPTY_BASELINE }
    );

    expect(codesOf(result)).toEqual(['dispatch_forged']);
  });

  test('reports a workflow_mode_source that became user', async () => {
    const result = await run(
      { workflow_mode_source: 'user' },
      { baseline: EMPTY_BASELINE }
    );

    expect(codesOf(result)).toEqual(['mode_authority_forged']);
  });

  test("accepts the worker's own workflow_mode_source stamp", async () => {
    const result = await run(
      { workflow_mode_source: 'worker' },
      { baseline: EMPTY_BASELINE }
    );

    expect(result.ok).toBe(true);
  });

  test('claims no appearance without a baseline to compare against', async () => {
    const result = await run({
      impl_entry: `user@${SHA}`,
      impl_dispatch: 'main',
      workflow_mode_source: 'user',
      exec_receipt: `main:bead@${SHA}`
    });

    expect(result.ok).toBe(true);
    expect(result.checks.baseline_present).toBe(false);
  });
});

describe('receipt-check verify_receipt binding', () => {
  test('binds a verify receipt on the attempt head', async () => {
    const result = await run(
      { verify_receipt: `beads-ui@${SHA}:0` },
      { head: SHA }
    );

    expect(result.ok).toBe(true);
    expect(result.checks.verify_receipt).toMatchObject({
      bundle: 'beads-ui',
      exit: 0,
      exit_ok: true,
      binding: 'equal'
    });
  });

  test('records a non-zero exit without calling the receipt unbound', async () => {
    const result = await run(
      { verify_receipt: `beads-ui@${SHA}:2` },
      { head: SHA }
    );

    expect(result.ok).toBe(true);
    expect(result.checks.verify_receipt).toMatchObject({
      exit: 2,
      exit_ok: false
    });
  });

  test('binds a verify receipt that is an ancestor of the head', async () => {
    const result = await run(
      { verify_receipt: `beads-ui@${OTHER_SHA}:0` },
      { head: SHA, probeAncestry: async () => 'ancestor' }
    );

    expect(result.ok).toBe(true);
    expect(result.checks.verify_receipt).toMatchObject({ binding: 'ancestor' });
  });

  test('reports a verify receipt the head does not descend from', async () => {
    const result = await run(
      { verify_receipt: `beads-ui@${OTHER_SHA}:0` },
      { head: SHA, probeAncestry: async () => 'non_ancestor' }
    );

    expect(codesOf(result)).toEqual(['verify_receipt_unbound']);
  });

  test('stays quiet when the ancestry probe cannot answer', async () => {
    const result = await run(
      { verify_receipt: `beads-ui@${OTHER_SHA}:0` },
      { head: SHA, probeAncestry: async () => 'probe_error' }
    );

    expect(result.ok).toBe(true);
    expect(result.checks.verify_receipt).toMatchObject({
      binding: 'unproven'
    });
  });

  test('reports a verify receipt that does not parse', async () => {
    const result = await run(
      { verify_receipt: 'beads-ui@nope' },
      { head: SHA }
    );

    expect(codesOf(result)).toEqual(['verify_receipt_malformed']);
  });

  test('keeps verify_receipt findings out of the blocking set', async () => {
    const result = await run(
      { verify_receipt: `beads-ui@${OTHER_SHA}:0` },
      { head: SHA, probeAncestry: async () => 'non_ancestor' }
    );

    expect(blockingReceiptCodes(result)).toEqual([]);
  });
});

describe('receipt-check projections', () => {
  test('treats unreadable metadata as a probe error', async () => {
    const result = await checkReceipts({ metadata: null, baseline: null });

    expect(result.probe_error).toBe(true);
  });

  test('holds the gate on a probe error', () => {
    expect(receiptGateState(receiptProbeError('bd_down'))).toEqual({
      state: 'probe_error',
      codes: []
    });
  });

  test('creates no gate verdict without an observation', () => {
    expect(receiptGateState(null)).toEqual({
      state: 'undecidable',
      codes: []
    });
  });

  test('reports a blocking violation to the gate as unbacked', async () => {
    const result = await run({ exec_receipt: `main:bead@${SHA}` });

    expect(receiptGateState(result)).toEqual({
      state: 'unbacked',
      codes: ['main_receipt_unbacked']
    });
  });

  test('clears the gate when only a verify_receipt finding remains', async () => {
    const result = await run(
      { verify_receipt: `beads-ui@${OTHER_SHA}:0` },
      { head: SHA, probeAncestry: async () => 'non_ancestor' }
    );

    expect(receiptGateState(result).state).toBe('ok');
  });

  test('summarizes both the full and the blocking code lists', async () => {
    const result = await run(
      {
        exec_receipt: `main:bead@${SHA}`,
        verify_receipt: `beads-ui@${OTHER_SHA}:0`
      },
      { head: SHA, probeAncestry: async () => 'non_ancestor' }
    );

    expect(summarizeReceiptCheck(result)).toEqual({
      ok: false,
      probe_error: false,
      codes: ['main_receipt_unbacked', 'verify_receipt_unbound'],
      blocking_codes: ['main_receipt_unbacked']
    });
  });

  test('summarizes an absent observation to null', () => {
    expect(summarizeReceiptCheck(null)).toBe(null);
  });

  test('reads the quick_fix dispatch default off the pinned projection', () => {
    const defaults = receiptDefaultsFrom({
      supported: true,
      session: {
        implementation: {
          default: { dispatch: 'delegated' },
          route_defaults: { quick_fix: { dispatch: 'main' } }
        }
      }
    });

    expect(defaults).toEqual({ supported: true, quick_fix_dispatch: 'main' });
  });

  test('falls back to the global dispatch default without a route entry', () => {
    const defaults = receiptDefaultsFrom({
      supported: true,
      session: { implementation: { default: { dispatch: 'delegated' } } }
    });

    expect(defaults).toEqual({
      supported: true,
      quick_fix_dispatch: 'delegated'
    });
  });

  test('marks an unusable projection unsupported', () => {
    expect(receiptDefaultsFrom({ supported: false, session: null })).toEqual({
      supported: false,
      quick_fix_dispatch: null
    });
  });

  test('reads lineage off a codex attempt record', () => {
    const lineage = receiptLineageForAttempt({
      exec_values: { impl_runtime: 'codex', impl_model: 'sol' },
      delegation_sessions: [{ role: 'implementation', status: 'done' }]
    });

    expect(lineage).toEqual({
      supported: true,
      sessions: [{ role: 'implementation', status: 'done' }],
      resolved_impl_model: 'sol'
    });
  });

  test('treats an auto model as no model constraint', () => {
    const lineage = receiptLineageForAttempt({
      exec_values: { impl_runtime: 'codex', impl_model: 'auto' }
    });

    expect(lineage.resolved_impl_model).toBe(null);
  });

  test('marks a non-codex attempt outside the monitor reach', () => {
    const lineage = receiptLineageForAttempt({
      exec_values: { impl_runtime: 'claude', impl_model: 'opus' }
    });

    expect(lineage.supported).toBe(false);
  });
});
