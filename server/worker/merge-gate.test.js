import { describe, expect, test } from 'vitest';
import {
  evaluateMergeGate,
  observedReviewReceiptState,
  reviewReceiptState,
  verifyReceiptMatches
} from './merge-gate.js';

const SHA = 'a'.repeat(40);
const OLD_SHA = 'b'.repeat(40);
const TREE = 'c'.repeat(40);
const BLOB = 'd'.repeat(40);

function verifyKey(overrides = {}) {
  return {
    effective_base_sha: OLD_SHA,
    head_sha: SHA,
    candidate_tree_sha: TREE,
    script_object_type: 'blob',
    script_mode: '100755',
    script_blob_sha: BLOB,
    ...overrides
  };
}

/**
 * @param {Partial<import('./gh.js').PrDetail>} [pr]
 * @returns {import('./gh.js').PrDetail}
 */
function prOf(pr = {}) {
  return {
    number: 304,
    url: 'https://github.com/o/r/pull/304',
    state: 'OPEN',
    mergeable: 'MERGEABLE',
    merge_state_status: 'CLEAN',
    head_ref: 'UI-1',
    base_ref: 'main',
    head_sha: SHA,
    ...pr
  };
}

/**
 * @param {Partial<import('./pr-observations.js').PrObservationEntry>} [entry]
 * @returns {import('./pr-observations.js').PrObservationEntry}
 */
function entryOf(entry = {}) {
  return {
    bead_id: 'UI-1',
    observed_at: 1000,
    error: null,
    pr: prOf(),
    review_receipt: null,
    verify: null,
    ...entry
  };
}

/**
 * @param {Partial<import('./merge-gate.js').MergeGateInput>} [input]
 * @returns {import('./merge-gate.js').MergeGateInput}
 */
function inputOf(input = {}) {
  return {
    review_receipt_state: 'current',
    verify_receipt_state: {
      declaration_state: 'absent',
      receipt: null
    },
    ...input
  };
}

describe('worker/merge-gate — no-CI eligibility', () => {
  test('enables a clean reviewed PR when verify is absent', () => {
    const gate = evaluateMergeGate(entryOf(), inputOf());

    expect(gate).toMatchObject({
      enabled: true,
      tier: 'eligible',
      gate_badge: '머지 가능',
      reason: null
    });
  });

  test('rejects a conflicting PR', () => {
    const entry = entryOf({
      pr: prOf({ mergeable: 'CONFLICTING', merge_state_status: 'DIRTY' })
    });

    const gate = evaluateMergeGate(entry, inputOf());

    expect(gate).toMatchObject({
      enabled: false,
      tier: 'mergeability',
      base_badge: '충돌',
      reason: 'merge_conflicting'
    });
  });

  test('rejects a behind PR', () => {
    const entry = entryOf({ pr: prOf({ merge_state_status: 'BEHIND' }) });

    const gate = evaluateMergeGate(entry, inputOf());

    expect(gate).toMatchObject({
      enabled: false,
      base_badge: 'base 뒤처짐',
      reason: 'base_behind'
    });
  });

  test('rejects unknown mergeability', () => {
    const entry = entryOf({ pr: prOf({ mergeable: 'UNKNOWN' }) });

    const gate = evaluateMergeGate(entry, inputOf());

    expect(gate).toMatchObject({
      enabled: false,
      reason: 'mergeability_unknown'
    });
  });

  test('rejects missing review receipts', () => {
    const gate = evaluateMergeGate(
      entryOf(),
      inputOf({ review_receipt_state: 'missing' })
    );

    expect(gate).toMatchObject({
      enabled: false,
      tier: 'review',
      gate_badge: '리뷰 확인 필요',
      reason: 'review_receipt_missing'
    });
  });

  test('requires a current green receipt when verify is declared', () => {
    const gate = evaluateMergeGate(
      entryOf(),
      inputOf({
        verify_receipt_state: {
          declaration_state: 'present',
          receipt: { head_sha: SHA, ok: true, reason: 'ok', at: 2000 }
        }
      })
    );

    expect(gate).toMatchObject({
      enabled: true,
      tier: 'eligible',
      gate_badge: '검증 완료'
    });
  });

  test('rejects a missing declared verify receipt', () => {
    const gate = evaluateMergeGate(
      entryOf(),
      inputOf({
        verify_receipt_state: {
          declaration_state: 'present',
          receipt: null
        }
      })
    );

    expect(gate).toMatchObject({
      enabled: false,
      tier: 'verify',
      reason: 'verify_missing'
    });
  });

  test('rejects a verify receipt bound to an old head', () => {
    const gate = evaluateMergeGate(
      entryOf(),
      inputOf({
        verify_receipt_state: {
          declaration_state: 'present',
          receipt: { head_sha: OLD_SHA, ok: true, reason: 'ok', at: 2000 }
        }
      })
    );

    expect(gate).toMatchObject({
      enabled: false,
      reason: 'verify_sha_stale'
    });
  });

  test('rejects a failed verify receipt', () => {
    const gate = evaluateMergeGate(
      entryOf(),
      inputOf({
        verify_receipt_state: {
          declaration_state: 'present',
          receipt: {
            head_sha: SHA,
            ok: false,
            reason: 'verify_cmd_failed',
            at: 2000
          }
        }
      })
    );

    expect(gate).toMatchObject({
      enabled: false,
      gate_badge: '검증 실패',
      reason: 'verify_cmd_failed'
    });
  });

  test('rejects an invalid verify declaration', () => {
    const gate = evaluateMergeGate(
      entryOf(),
      inputOf({
        verify_receipt_state: {
          declaration_state: 'invalid',
          receipt: null
        }
      })
    );

    expect(gate).toMatchObject({
      enabled: false,
      tier: 'undecidable',
      reason: 'verify_config_invalid'
    });
  });
});

describe('worker/merge-gate — candidate-tree verify receipt', () => {
  test('inherits a receipt only for the exact candidate key', () => {
    const matches = verifyReceiptMatches(verifyKey(), verifyKey());

    expect(matches).toBe(true);
  });

  test.each([
    ['base', { effective_base_sha: 'e'.repeat(40) }],
    ['head', { head_sha: 'f'.repeat(40) }],
    ['tree', { candidate_tree_sha: '1'.repeat(40) }],
    ['script type', { script_object_type: 'commit' }],
    ['script mode', { script_mode: '100644' }],
    ['script bytes', { script_blob_sha: '2'.repeat(40) }]
  ])('marks a %s change stale', (_label, changed) => {
    const matches = verifyReceiptMatches(verifyKey(), verifyKey(changed));

    expect(matches).toBe(false);
  });
});

describe('worker/merge-gate — shared review receipt state', () => {
  test('accepts a spec-backed receipt bound to the current head', () => {
    const state = reviewReceiptState(
      {
        spec_id: 'docs/spec.md',
        metadata: {
          route: 'spec_backed',
          spec_review: `codex@${OLD_SHA}`,
          impl_review: `self@${SHA}`
        }
      },
      SHA
    );

    expect(state).toBe('current');
  });

  test('marks a cached review stale when the observed head moves', () => {
    const state = observedReviewReceiptState(
      entryOf({
        review_receipt: { state: 'current', head_sha: OLD_SHA }
      })
    );

    expect(state).toBe('stale');
  });

  test('fails closed on an unreadable issue', () => {
    const state = reviewReceiptState(null, SHA);

    expect(state).toBe('invalid');
  });
});

describe('worker/merge-gate — fail-closed observations', () => {
  test('rejects an observation error', () => {
    const gate = evaluateMergeGate(entryOf({ error: 'gh_failed' }), inputOf());

    expect(gate).toMatchObject({
      enabled: false,
      tier: 'undecidable',
      reason: 'gh_failed'
    });
  });

  test('rejects an unobserved PR', () => {
    const gate = evaluateMergeGate(null, inputOf());

    expect(gate).toMatchObject({
      enabled: false,
      tier: 'unobserved',
      reason: 'not_observed'
    });
  });
});

describe('worker/merge-gate — terminal PR states', () => {
  test('reports a merged PR', () => {
    const gate = evaluateMergeGate(
      entryOf({ pr: prOf({ state: 'MERGED' }) }),
      inputOf({ review_receipt_state: 'missing' })
    );

    expect(gate).toMatchObject({ enabled: false, tier: 'merged' });
  });

  test('reports a closed unmerged PR', () => {
    const gate = evaluateMergeGate(
      entryOf({ pr: prOf({ state: 'CLOSED' }) }),
      inputOf()
    );

    expect(gate).toMatchObject({
      enabled: false,
      tier: 'closed_unmerged',
      reason: 'pr_closed_unmerged'
    });
  });
});
