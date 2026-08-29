import { describe, expect, test } from 'vitest';
import {
  EXEC_RECEIPT_MERGE_GATE,
  RECEIPT_BASELINE_KEYS,
  badgeReceiptCodes,
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

/** A well-formed receipt needing no backing, for cases about another key. */
const DELEGATED_OK = `delegated:sol:high@${SHA}`;

/**
 * A dispatch snapshot in which none of the five keys was set.
 *
 * @type {Record<string, string|null>}
 */
const BLANK_BASELINE = {
  exec_receipt: null,
  impl_entry: null,
  plan_approval: null,
  workflow_mode_source: null,
  impl_dispatch: null
};

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

    expect(codesOf(result)).toEqual(['effort_unknown']);
  });

  test('reports the same effort defect inside a multi-unit receipt', async () => {
    const result = await run({
      exec_receipt: `core:delegated:sol:native-fixed-posture@${SHA}`
    });

    expect(codesOf(result)).toEqual(['effort_unknown']);
  });

  test('reports a receipt whose sha is not forty hex', async () => {
    const result = await run({ exec_receipt: 'main:bead@deadbeef' });

    expect(codesOf(result)).toEqual(['unparsable']);
  });

  test('reports a free-sentence receipt as unreadable', async () => {
    const result = await run({ exec_receipt: '이 유닛은 세션이 직접 했다' });

    expect(codesOf(result)).toEqual(['unparsable']);
  });

  test('reports an absent exec_receipt as accounting residue', async () => {
    const result = await run({ route: 'quick_fix' });

    expect(codesOf(result)).toEqual(['absent']);
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

  test('names an unobservable takeover lineage rather than failing the observation', async () => {
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

    expect(codesOf(result)).toEqual(['takeover_lineage_unobservable']);
    expect(result.probe_error).toBe(false);
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

  test('refuses an unprefixed receipt even for a single-unit plan', async () => {
    const result = await run({
      unit_plan: '한 유닛 | core:server/core.js',
      exec_receipt: `delegated:sol:high@${SHA}`
    });

    expect(codesOf(result)).toEqual(['unit_plan_mismatch']);
  });

  test('accepts a single-unit plan whose receipt names that unit', async () => {
    const result = await run({
      unit_plan: '한 유닛 | core:server/core.js',
      exec_receipt: `core:delegated:sol:high@${SHA}`
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
      { exec_receipt: DELEGATED_OK, impl_entry: `user@${SHA}` },
      { baseline: EMPTY_BASELINE }
    );

    expect(codesOf(result)).toEqual(['approval_forged']);
  });

  test('reports a plan_approval whose value changed under the attempt', async () => {
    const result = await run(
      { exec_receipt: DELEGATED_OK, plan_approval: `user@${OTHER_SHA}` },
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

  test('reports an impl_dispatch the attempt deleted', async () => {
    const result = await run(
      {
        route: 'quick_fix',
        exec_receipt: `main:quick_fix_default@${SHA}`
      },
      {
        baseline: { ...EMPTY_BASELINE, impl_dispatch: 'delegated' },
        defaults: QUICK_FIX_MAIN
      }
    );

    expect(codesOf(result)).toEqual(['dispatch_forged']);
  });

  test('reports an impl_entry the attempt deleted', async () => {
    const result = await run(
      { exec_receipt: DELEGATED_OK },
      { baseline: { ...EMPTY_BASELINE, impl_entry: `user@${SHA}` } }
    );

    expect(codesOf(result)).toEqual(['approval_forged']);
  });

  test('reports a plan_approval the attempt deleted', async () => {
    const result = await run(
      { exec_receipt: DELEGATED_OK },
      { baseline: { ...EMPTY_BASELINE, plan_approval: `user@${SHA}` } }
    );

    expect(codesOf(result)).toEqual(['approval_forged']);
  });

  test('reports a workflow_mode_source that became user', async () => {
    const result = await run(
      { exec_receipt: DELEGATED_OK, workflow_mode_source: 'user' },
      { baseline: EMPTY_BASELINE }
    );

    expect(codesOf(result)).toEqual(['mode_authority_forged']);
  });

  test("accepts the worker's own workflow_mode_source stamp", async () => {
    const result = await run(
      { exec_receipt: DELEGATED_OK, workflow_mode_source: 'worker' },
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
      { exec_receipt: DELEGATED_OK, verify_receipt: `beads-ui@${SHA}:0` },
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
      { exec_receipt: DELEGATED_OK, verify_receipt: `beads-ui@${SHA}:2` },
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
      { exec_receipt: DELEGATED_OK, verify_receipt: `beads-ui@${OTHER_SHA}:0` },
      { head: SHA, probeAncestry: async () => 'ancestor' }
    );

    expect(result.ok).toBe(true);
    expect(result.checks.verify_receipt).toMatchObject({ binding: 'ancestor' });
  });

  test('reports a verify receipt the head does not descend from', async () => {
    const result = await run(
      { exec_receipt: DELEGATED_OK, verify_receipt: `beads-ui@${OTHER_SHA}:0` },
      { head: SHA, probeAncestry: async () => 'non_ancestor' }
    );

    expect(codesOf(result)).toEqual(['verify_receipt_unbound']);
  });

  test('stays quiet when the ancestry probe cannot answer', async () => {
    const result = await run(
      { exec_receipt: DELEGATED_OK, verify_receipt: `beads-ui@${OTHER_SHA}:0` },
      { head: SHA, probeAncestry: async () => 'probe_error' }
    );

    expect(result.ok).toBe(true);
    expect(result.checks.verify_receipt).toMatchObject({
      binding: 'unproven'
    });
  });

  test('reports a verify receipt that does not parse', async () => {
    const result = await run(
      { exec_receipt: DELEGATED_OK, verify_receipt: 'beads-ui@nope' },
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

/**
 * Metadata that produces exactly one violation with the given code.
 *
 * @type {Record<string, { metadata: Record<string, unknown>, extra?: Record<string, unknown> }>}
 */
const ONE_CODE = {
  unit_plan_mismatch: {
    metadata: {
      unit_plan: '한 유닛 | core:server/core.js',
      exec_receipt: DELEGATED_OK
    }
  },
  approval_forged: {
    metadata: { exec_receipt: DELEGATED_OK, impl_entry: `user@${SHA}` },
    extra: { baseline: BLANK_BASELINE }
  },
  dispatch_forged: {
    metadata: { exec_receipt: DELEGATED_OK, impl_dispatch: 'delegated' },
    extra: { baseline: BLANK_BASELINE }
  },
  mode_authority_forged: {
    metadata: { exec_receipt: DELEGATED_OK, workflow_mode_source: 'user' },
    extra: { baseline: BLANK_BASELINE }
  },
  non_ancestor: {
    metadata: { exec_receipt: `delegated:sol:high@${OTHER_SHA}` },
    extra: { head: SHA, probeAncestry: async () => 'non_ancestor' }
  },
  ancestry_probe_error: {
    metadata: { exec_receipt: `delegated:sol:high@${OTHER_SHA}` },
    extra: { head: SHA, probeAncestry: async () => 'probe_error' }
  },
  absent: { metadata: { route: 'quick_fix' } },
  unparsable: { metadata: { exec_receipt: '세션이 직접 했다' } },
  effort_unknown: {
    metadata: { exec_receipt: `delegated:opus:native-fixed-posture@${SHA}` }
  },
  main_reason_retired: {
    metadata: { exec_receipt: `main:user_choice@${SHA}` }
  },
  main_receipt_unbacked: { metadata: { exec_receipt: `main:bead@${SHA}` } },
  takeover_lineage_missing: {
    metadata: { exec_receipt: `main:takeover@${SHA}` },
    extra: {
      lineage: { supported: true, sessions: [], resolved_impl_model: 'sol' }
    }
  },
  takeover_lineage_unobservable: {
    metadata: { exec_receipt: `main:takeover@${SHA}` },
    extra: {
      lineage: { supported: false, sessions: [], resolved_impl_model: null }
    }
  }
};

/**
 * @param {string} code
 */
function runOneCode(code) {
  const fixture = ONE_CODE[code];
  return run(fixture.metadata, fixture.extra || {});
}

describe('receipt-check merge-gate grades', () => {
  test('names the thirteen contract codes across two disjoint grades', () => {
    const hold = EXEC_RECEIPT_MERGE_GATE.hold;
    const badge = EXEC_RECEIPT_MERGE_GATE.badge;

    expect(hold.filter((code) => badge.includes(code))).toEqual([]);
    expect([...hold, ...badge].sort()).toEqual(
      [
        'absent',
        'ancestry_probe_error',
        'approval_forged',
        'dispatch_forged',
        'effort_unknown',
        'main_reason_retired',
        'main_receipt_unbacked',
        'mode_authority_forged',
        'non_ancestor',
        'takeover_lineage_missing',
        'takeover_lineage_unobservable',
        'unit_plan_mismatch',
        'unparsable'
      ].sort()
    );
  });

  test('fixes one reproduction per contract code', () => {
    expect(Object.keys(ONE_CODE).sort()).toEqual(
      [...EXEC_RECEIPT_MERGE_GATE.hold, ...EXEC_RECEIPT_MERGE_GATE.badge].sort()
    );
  });

  for (const code of EXEC_RECEIPT_MERGE_GATE.hold) {
    test(`holds the gate on ${code}`, async () => {
      const result = await runOneCode(code);

      expect(blockingReceiptCodes(result)).toEqual([code]);
      expect(badgeReceiptCodes(result)).toEqual([]);
      expect(receiptGateState(result).state).toBe('unbacked');
    });
  }

  for (const code of EXEC_RECEIPT_MERGE_GATE.badge) {
    test(`passes the gate on ${code}`, async () => {
      const result = await runOneCode(code);

      expect(badgeReceiptCodes(result)).toEqual([code]);
      expect(blockingReceiptCodes(result)).toEqual([]);
      expect(receiptGateState(result).state).toBe('ok');
    });
  }
});

describe('receipt-check exec_receipt ancestry', () => {
  test('judges nothing without a head to bind against', async () => {
    const result = await run({
      exec_receipt: `delegated:sol:high@${OTHER_SHA}`
    });

    expect(codesOf(result)).toEqual([]);
    expect(result.checks.exec_receipt).toMatchObject({ ancestry: 'unproven' });
  });

  test('judges nothing when the caller injected no probe', async () => {
    const result = await run(
      { exec_receipt: `delegated:sol:high@${OTHER_SHA}` },
      { head: SHA }
    );

    expect(codesOf(result)).toEqual([]);
    expect(result.checks.exec_receipt).toMatchObject({ ancestry: 'unproven' });
  });

  test('binds a receipt issued on the observed head', async () => {
    const result = await run(
      { exec_receipt: DELEGATED_OK },
      { head: SHA, probeAncestry: async () => 'non_ancestor' }
    );

    expect(codesOf(result)).toEqual([]);
    expect(result.checks.exec_receipt).toMatchObject({ ancestry: 'equal' });
  });

  test('binds a receipt the observed head descends from', async () => {
    const result = await run(
      { exec_receipt: `delegated:sol:high@${OTHER_SHA}` },
      { head: SHA, probeAncestry: async () => 'ancestor' }
    );

    expect(codesOf(result)).toEqual([]);
    expect(result.checks.exec_receipt).toMatchObject({ ancestry: 'ancestor' });
  });

  test('reports a receipt the observed head does not descend from', async () => {
    const result = await run(
      { exec_receipt: `delegated:sol:high@${OTHER_SHA}` },
      { head: SHA, probeAncestry: async () => 'non_ancestor' }
    );

    expect(codesOf(result)).toEqual(['non_ancestor']);
    expect(result.checks.exec_receipt).toMatchObject({
      ancestry: 'non_ancestor'
    });
  });

  test('reports a probe that threw as an ancestry probe error', async () => {
    const result = await run(
      { exec_receipt: `delegated:sol:high@${OTHER_SHA}` },
      {
        head: SHA,
        probeAncestry: async () => {
          throw new Error('git missing');
        }
      }
    );

    expect(codesOf(result)).toEqual(['ancestry_probe_error']);
  });

  test('judges every unit of a multi-unit receipt', async () => {
    const result = await run(
      {
        unit_plan: '두 유닛 | core:server/; display:app/',
        exec_receipt: `core:delegated:sol:high@${SHA}; display:delegated:sol:high@${OTHER_SHA}`
      },
      { head: SHA, probeAncestry: async () => 'non_ancestor' }
    );

    expect(result.violations).toEqual([
      { code: 'non_ancestor', detail: `display:${OTHER_SHA} not in ${SHA}` }
    ]);
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

  test('reports a hold violation to the gate as unbacked', async () => {
    const result = await run({
      unit_plan: '한 유닛 | core:server/core.js',
      exec_receipt: DELEGATED_OK
    });

    expect(receiptGateState(result)).toEqual({
      state: 'unbacked',
      codes: ['unit_plan_mismatch']
    });
  });

  test('clears the gate when only badge findings remain', async () => {
    const result = await run({ exec_receipt: `main:bead@${SHA}` });

    expect(receiptGateState(result)).toEqual({ state: 'ok', codes: [] });
  });

  test('clears the gate when only a verify_receipt finding remains', async () => {
    const result = await run(
      { verify_receipt: `beads-ui@${OTHER_SHA}:0` },
      { head: SHA, probeAncestry: async () => 'non_ancestor' }
    );

    expect(receiptGateState(result).state).toBe('ok');
  });

  test('summarizes the full, blocking and badge code lists', async () => {
    const result = await run(
      {
        unit_plan: '한 유닛 | core:server/core.js',
        exec_receipt: `main:bead@${SHA}`,
        verify_receipt: `beads-ui@${OTHER_SHA}:0`
      },
      { head: SHA, probeAncestry: async () => 'non_ancestor' }
    );

    expect(summarizeReceiptCheck(result)).toEqual({
      ok: false,
      probe_error: false,
      codes: [
        'main_receipt_unbacked',
        'unit_plan_mismatch',
        'verify_receipt_unbound'
      ],
      blocking_codes: ['unit_plan_mismatch'],
      badge_codes: ['main_receipt_unbacked']
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
