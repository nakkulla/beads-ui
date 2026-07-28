import { describe, expect, test } from 'vitest';
import { evaluateMergeGate } from './merge-gate.js';

const SHA = 'a'.repeat(40);
const OLD_SHA = 'b'.repeat(40);

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
    ci: null,
    verify: null,
    ...entry
  };
}

/**
 * @param {Partial<import('./pr-observations.js').CiObservation>} [ci]
 * @returns {import('./pr-observations.js').CiObservation}
 */
function ciOf(ci = {}) {
  return {
    state: 'ok',
    head_sha: SHA,
    checks: [],
    conclusion: 'pass',
    reason: null,
    ...ci
  };
}

const NO_VERIFY = { verify_cmd_present: false };
const WITH_VERIFY = { verify_cmd_present: true };

describe('worker/merge-gate — tier 1: the repo has CI', () => {
  test('enables the gate on green checks', () => {
    const entry = entryOf({ ci: ciOf({ conclusion: 'pass' }) });

    const g = evaluateMergeGate(entry, WITH_VERIFY);

    expect(g).toMatchObject({ enabled: true, tier: 'ci', gate_badge: 'CI ✓' });
  });

  test('disables the gate on a failed check', () => {
    const entry = entryOf({ ci: ciOf({ conclusion: 'fail' }) });

    const g = evaluateMergeGate(entry, NO_VERIFY);

    expect(g).toMatchObject({ enabled: false, tier: 'ci', gate_badge: 'CI ✗' });
  });

  test('disables the gate while checks are pending', () => {
    const entry = entryOf({ ci: ciOf({ conclusion: 'pending' }) });

    const g = evaluateMergeGate(entry, NO_VERIFY);

    expect(g).toMatchObject({ enabled: false, gate_badge: 'CI 대기' });
  });

  test('CI green outranks a missing local verification', () => {
    const entry = entryOf({ ci: ciOf({ conclusion: 'pass' }), verify: null });

    const g = evaluateMergeGate(entry, WITH_VERIFY);

    expect(g.enabled).toBe(true);
  });
});

describe('worker/merge-gate — tier 2: no CI + verify_cmd', () => {
  test('enables the gate on a local green bound to the current head', () => {
    const entry = entryOf({
      ci: ciOf({ state: 'empty', conclusion: null }),
      verify: { head_sha: SHA, ok: true, reason: 'ok', at: 2000 }
    });

    const g = evaluateMergeGate(entry, WITH_VERIFY);

    expect(g).toMatchObject({
      enabled: true,
      tier: 'local_verify',
      gate_badge: '로컬검증 ✓'
    });
  });

  test('disables the gate when the local verification failed', () => {
    const entry = entryOf({
      ci: ciOf({ state: 'empty', conclusion: null }),
      verify: {
        head_sha: SHA,
        ok: false,
        reason: 'verify_cmd_failed',
        at: 2000
      }
    });

    const g = evaluateMergeGate(entry, WITH_VERIFY);

    expect(g).toMatchObject({ enabled: false, gate_badge: '로컬검증 ✗' });
  });

  test('rejects a green bound to a SUPERSEDED head sha', () => {
    const entry = entryOf({
      ci: ciOf({ state: 'empty', conclusion: null }),
      verify: { head_sha: OLD_SHA, ok: true, reason: 'ok', at: 2000 }
    });

    const g = evaluateMergeGate(entry, WITH_VERIFY);

    expect(g).toMatchObject({
      enabled: false,
      gate_badge: '로컬검증 대기',
      reason: 'verify_sha_stale'
    });
  });

  test('a restart cache miss waits for a fresh run instead of passing', () => {
    const entry = entryOf({
      ci: ciOf({ state: 'empty', conclusion: null }),
      verify: null
    });

    const g = evaluateMergeGate(entry, WITH_VERIFY);

    expect(g).toMatchObject({ enabled: false, reason: 'verify_missing' });
  });
});

describe('worker/merge-gate — tier 3: no signal at all', () => {
  test('enables the gate with an honest badge when neither signal exists', () => {
    const entry = entryOf({ ci: ciOf({ state: 'empty', conclusion: null }) });

    const g = evaluateMergeGate(entry, NO_VERIFY);

    expect(g).toMatchObject({
      enabled: true,
      tier: 'none',
      gate_badge: '검증 신호 없음'
    });
  });
});

describe('worker/merge-gate — fail-closed on an observation error (§5)', () => {
  test('an observation error is undecidable, NOT the no-signal tier', () => {
    const entry = entryOf({ error: 'gh_failed' });

    const g = evaluateMergeGate(entry, NO_VERIFY);

    expect(g).toMatchObject({
      enabled: false,
      tier: 'undecidable',
      gate_badge: '관측 오류'
    });
    expect(g.tier).not.toBe('none');
  });

  test('a failed CHECKS query is undecidable, NOT "no CI"', () => {
    const entry = entryOf({
      ci: ciOf({ state: 'error', conclusion: null, reason: 'gh_bad_json' })
    });

    const g = evaluateMergeGate(entry, NO_VERIFY);

    expect(g).toMatchObject({
      enabled: false,
      tier: 'undecidable',
      reason: 'gh_bad_json'
    });
  });

  test('an unresolvable PR reference disables the gate', () => {
    const entry = entryOf({ error: 'pr_ref_unknown', pr: null });

    const g = evaluateMergeGate(entry, NO_VERIFY);

    expect(g.enabled).toBe(false);
  });

  test('a bead the poller has not reached yet is disabled, not enabled', () => {
    const g = evaluateMergeGate(null, NO_VERIFY);

    expect(g).toMatchObject({
      enabled: false,
      tier: 'unobserved',
      gate_badge: '관측 대기'
    });
  });

  test('a CI observation taken at another sha does not decide this head', () => {
    const entry = entryOf({
      ci: ciOf({ head_sha: OLD_SHA, conclusion: 'pass' })
    });

    const g = evaluateMergeGate(entry, NO_VERIFY);

    expect(g).toMatchObject({ enabled: false, reason: 'ci_sha_stale' });
  });
});

describe('worker/merge-gate — terminal PR states (§4)', () => {
  test('a merged PR reports merged and offers no gate', () => {
    const entry = entryOf({ pr: prOf({ state: 'MERGED' }) });

    const g = evaluateMergeGate(entry, NO_VERIFY);

    expect(g).toMatchObject({
      enabled: false,
      tier: 'merged',
      gate_badge: '머지됨'
    });
  });

  test('a closed-unmerged PR reports PR closed and is never a completion', () => {
    const entry = entryOf({ pr: prOf({ state: 'CLOSED' }) });

    const g = evaluateMergeGate(entry, NO_VERIFY);

    expect(g).toMatchObject({
      enabled: false,
      tier: 'closed_unmerged',
      gate_badge: 'PR closed'
    });
  });
});

describe('worker/merge-gate — base state badge', () => {
  test('reports a conflict', () => {
    const entry = entryOf({
      pr: prOf({ mergeable: 'CONFLICTING', merge_state_status: 'DIRTY' }),
      ci: ciOf({ state: 'empty', conclusion: null })
    });

    expect(evaluateMergeGate(entry, NO_VERIFY).base_badge).toBe('충돌');
  });

  test('reports a behind base', () => {
    const entry = entryOf({
      pr: prOf({ merge_state_status: 'BEHIND' }),
      ci: ciOf({ state: 'empty', conclusion: null })
    });

    expect(evaluateMergeGate(entry, NO_VERIFY).base_badge).toBe('base 뒤처짐');
  });

  test('reports a clean base', () => {
    const entry = entryOf({ ci: ciOf({ state: 'empty', conclusion: null }) });

    expect(evaluateMergeGate(entry, NO_VERIFY).base_badge).toBe('최신');
  });
});
