import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  autoReviewHeadDrifted,
  createHeadReview,
  reviewAttemptId
} from './head-review.js';
import { createQueueStore } from './queue-store.js';

/** @type {string} */
let tmp_state;
const WS = '/tmp/example-workspace/project-a';

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-head-review-'));
  process.env.XDG_STATE_HOME = tmp_state;
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});
const OLD_HEAD = 'a'.repeat(40);
const NEW_HEAD = 'b'.repeat(40);
const REPAIR_HEAD = 'c'.repeat(40);
const PRIOR_HEAD = 'd'.repeat(40);

/**
 * One manual-authority queue entry plus a head-review driver whose effect
 * adapters are all recorded fakes. Every test overrides only what it needs.
 *
 * @param {Record<string, any>} [overrides]
 */
function harness(overrides = {}) {
  const ids = ['authority-1', 'authority-2'];
  const store = createQueueStore({
    now: () => 123,
    randomUUID: () => /** @type {string} */ (ids.shift())
  });
  store.appendAttempt(WS, {
    expected_revision: 0,
    attempt: { attempt_id: 'att-UI-1', bead_id: 'UI-1' }
  });
  store.moveToPrWait(WS, {
    bead_id: 'UI-1',
    attempt_id: 'att-UI-1',
    patch: { status: 'done', finished_at: 1 }
  });
  store.enqueueMergeManual(WS, {
    expected_revision: store.snapshot(WS).revision,
    entries: [{ bead_id: 'UI-1', head_sha: OLD_HEAD, target_base: 'main' }]
  });

  /** @type {Record<string, any[]>} */
  const calls = {
    select: [],
    read_receipt: [],
    lineage: [],
    review: [],
    write_receipt: [],
    observe: [],
    repair: []
  };
  const deps = {
    workspace: WS,
    store,
    selectReviewer: async (/** @type {string} */ bead_id) => {
      calls.select.push(bead_id);
      return { ok: true, reviewer: 'codex', effort: 'xhigh' };
    },
    readReceipt: async (/** @type {string} */ bead_id) => {
      calls.read_receipt.push(bead_id);
      return null;
    },
    lineage: async (
      /** @type {string} */ bead_id,
      /** @type {any} */ input
    ) => {
      calls.lineage.push({ bead_id, ...input });
      return { queue_owned: true };
    },
    runReview: async (/** @type {any} */ packet) => {
      calls.review.push(packet);
      return { ok: true, verdict: 'APPROVE' };
    },
    writeReceipt: async (
      /** @type {string} */ bead_id,
      /** @type {string} */ receipt
    ) => {
      calls.write_receipt.push({ bead_id, receipt });
      return { ok: true, readback: receipt };
    },
    observeHead: async (/** @type {string} */ bead_id) => {
      calls.observe.push(bead_id);
      return NEW_HEAD;
    },
    runRepair: async (/** @type {any} */ packet) => {
      calls.repair.push(packet);
      return { ok: true, head_sha: REPAIR_HEAD, self_review: 'APPROVE' };
    },
    ...overrides
  };
  const driver = createHeadReview(deps);
  return { store, driver, calls };
}

/**
 * @param {ReturnType<typeof createQueueStore>} store
 */
function journalOf(store) {
  return store.snapshot(WS).merge_queue[0]?.head_review ?? null;
}

describe('worker/head-review — reviewer continuation (UI-58w8 seam 2)', () => {
  test('stamps no carry receipt for a base update (UI-vzyh §2)', async () => {
    const { driver, calls } = harness({
      readReceipt: async () => ({
        actor: 'codex',
        head_sha: OLD_HEAD,
        raw: `codex@${OLD_HEAD}`
      })
    });

    const starting_approval = await driver.captureStartingApproval(
      'UI-1',
      'UI-1'
    );
    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main',
      mutation: 'base_update',
      mutation_result_sha: NEW_HEAD,
      starting_approval
    });

    // Ancestry already carries the receipt at the merge gate, so this machine
    // is only entered on the abnormal path — and there it reviews the observed
    // head instead of re-vouching for it with a retired receipt form.
    expect(result.state).toBe('approved');
    expect(
      calls.write_receipt.filter((call) => call.receipt.startsWith('carry:'))
    ).toEqual([]);
    expect(calls.review).toHaveLength(1);
  });

  test('carries the starting approval onto a descendant head with no dispatch', async () => {
    const receipt = `codex@${OLD_HEAD}`;
    const { store, driver, calls } = harness({
      readReceipt: async () => ({
        actor: 'codex',
        head_sha: OLD_HEAD,
        raw: receipt
      }),
      probeAncestry: async () => 'ancestor'
    });

    const starting_approval = await driver.captureStartingApproval(
      'UI-1',
      'UI-1'
    );
    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main',
      mutation: null,
      mutation_result_sha: null,
      starting_approval
    });

    expect(result.state).toBe('approved');
    expect(calls.select).toHaveLength(0);
    expect(calls.review).toHaveLength(0);
    expect(calls.write_receipt).toEqual([]);
    expect(journalOf(store)).toMatchObject({
      state: 'approved',
      approval_source: 'existing_current',
      receipt
    });
  });

  test('keeps a carried approval approved when the same head is re-checked', async () => {
    const receipt = `codex@${OLD_HEAD}`;
    const { driver, calls } = harness({
      readReceipt: async () => ({
        actor: 'codex',
        head_sha: OLD_HEAD,
        raw: receipt
      }),
      probeAncestry: async () => 'ancestor'
    });
    const starting_approval = await driver.captureStartingApproval(
      'UI-1',
      'UI-1'
    );
    const observed = {
      head_sha: NEW_HEAD,
      base_ref: 'main',
      starting_approval
    };
    await driver.ensureApproved('UI-1', 'UI-1', observed);

    // A retried merge re-enters the machine on the SAME head: the journal is
    // already approved and its receipt is bound to the head the approval was
    // granted on, not the moved one.
    const again = await driver.ensureApproved('UI-1', 'UI-1', observed);

    expect(again).toEqual({ state: 'approved', reason: null });
    expect(calls.review).toHaveLength(0);
  });

  test('reviews the observed head when it is not a descendant', async () => {
    const { driver, calls } = harness({
      readReceipt: async () => ({
        actor: 'codex',
        head_sha: OLD_HEAD,
        raw: `codex@${OLD_HEAD}`
      }),
      probeAncestry: async () => 'non_ancestor'
    });

    const starting_approval = await driver.captureStartingApproval(
      'UI-1',
      'UI-1'
    );
    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main',
      starting_approval
    });

    expect(result.state).toBe('approved');
    expect(calls.review).toHaveLength(1);
  });

  test('reviews the observed head when the ancestry probe cannot answer', async () => {
    const { driver, calls } = harness({
      readReceipt: async () => ({
        actor: 'codex',
        head_sha: OLD_HEAD,
        raw: `codex@${OLD_HEAD}`
      }),
      probeAncestry: async () => 'probe_error'
    });

    const starting_approval = await driver.captureStartingApproval(
      'UI-1',
      'UI-1'
    );
    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main',
      starting_approval
    });

    expect(result.state).toBe('approved');
    expect(calls.review).toHaveLength(1);
  });

  test('refuses to carry an approval the receipt no longer reads back', async () => {
    let receipt_reads = 0;
    const { driver, calls } = harness({
      readReceipt: async () => {
        receipt_reads += 1;
        return receipt_reads === 1
          ? { actor: 'codex', head_sha: OLD_HEAD, raw: `codex@${OLD_HEAD}` }
          : { actor: 'self', head_sha: OLD_HEAD, raw: `self@${OLD_HEAD}` };
      },
      probeAncestry: async () => 'ancestor'
    });

    const starting_approval = await driver.captureStartingApproval(
      'UI-1',
      'UI-1'
    );
    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main',
      starting_approval
    });

    expect(result).toEqual({
      state: 'failed',
      reason: 'receipt_readback_mismatch'
    });
    expect(calls.write_receipt).toEqual([]);
  });

  test('never carries a resolver-produced head on ancestry alone', async () => {
    const { driver, calls } = harness({
      readReceipt: async () => ({
        actor: 'codex',
        head_sha: OLD_HEAD,
        raw: `codex@${OLD_HEAD}`
      }),
      // A resolver merge commit always descends from the reviewed head, so
      // ancestry would silently swallow the conflict resolution (UI-vzyh §2).
      probeAncestry: async () => 'ancestor'
    });

    const starting_approval = await driver.captureStartingApproval(
      'UI-1',
      'UI-1'
    );
    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main',
      mutation: 'resolver:res-1',
      mutation_result_sha: null,
      starting_approval
    });

    expect(result.state).toBe('approved');
    expect(calls.review).toHaveLength(1);
  });

  test('reads a historical carry receipt as a valid starting approval', async () => {
    const prior_receipt = `carry:codex:${PRIOR_HEAD}@${OLD_HEAD}`;
    const receipt = `resolver-self:res-0:${OLD_HEAD}@${NEW_HEAD}`;
    let receipt_reads = 0;
    const { store, driver, calls } = harness({
      readReceipt: async () => {
        receipt_reads += 1;
        return receipt_reads === 1
          ? { actor: 'codex', head_sha: OLD_HEAD, raw: prior_receipt }
          : { actor: 'self', head_sha: NEW_HEAD, raw: receipt };
      }
    });

    const starting_approval = await driver.captureStartingApproval(
      'UI-1',
      'UI-1'
    );
    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main',
      mutation: 'resolver:res-0',
      mutation_result_sha: NEW_HEAD,
      starting_approval
    });

    expect(result.state).toBe('approved');
    expect(calls.review).toHaveLength(0);
    expect(journalOf(store)).toMatchObject({ state: 'approved', receipt });
  });

  test('reads a prior resolver self-review as a valid starting approval', async () => {
    const prior_receipt = `resolver-self:res-0:${PRIOR_HEAD}@${OLD_HEAD}`;
    const receipt = `resolver-self:res-1:${OLD_HEAD}@${NEW_HEAD}`;
    let receipt_reads = 0;
    const { store, driver, calls } = harness({
      readReceipt: async () => {
        receipt_reads += 1;
        return receipt_reads === 1
          ? { actor: 'self', head_sha: OLD_HEAD, raw: prior_receipt }
          : { actor: 'self', head_sha: NEW_HEAD, raw: receipt };
      }
    });

    const starting_approval = await driver.captureStartingApproval(
      'UI-1',
      'UI-1'
    );
    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main',
      mutation: 'resolver:res-1',
      mutation_result_sha: NEW_HEAD,
      starting_approval
    });

    expect(result.state).toBe('approved');
    expect(calls.review).toHaveLength(0);
    expect(journalOf(store)).toMatchObject({ state: 'approved', receipt });
  });

  test('binds the resolver session self-review verdict', async () => {
    const receipt = `resolver-self:res-1:${OLD_HEAD}@${NEW_HEAD}`;
    let receipt_reads = 0;
    const { store, driver, calls } = harness({
      readReceipt: async () => {
        receipt_reads += 1;
        return receipt_reads === 1
          ? {
              actor: 'codex',
              head_sha: OLD_HEAD,
              raw: `codex@${OLD_HEAD}`
            }
          : {
              actor: 'self',
              head_sha: NEW_HEAD,
              raw: receipt
            };
      }
    });

    const starting_approval = await driver.captureStartingApproval(
      'UI-1',
      'UI-1'
    );
    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main',
      mutation: 'resolver:res-1',
      mutation_result_sha: NEW_HEAD,
      starting_approval
    });

    expect(result.state).toBe('approved');
    expect(calls.select).toHaveLength(0);
    expect(calls.review).toHaveLength(0);
    expect(calls.write_receipt).toHaveLength(0);
    expect(journalOf(store)).toMatchObject({ state: 'approved', receipt });
  });

  test('dispatches externally when the approval was missing at authority grant', async () => {
    const { store, driver, calls } = harness({ readReceipt: async () => null });

    const starting_approval = await driver.captureStartingApproval(
      'UI-1',
      'UI-1'
    );
    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main',
      mutation: 'base_update',
      mutation_result_sha: NEW_HEAD,
      starting_approval
    });

    expect(result.state).toBe('approved');
    expect(calls.review).toHaveLength(1);
    expect(journalOf(store)).toMatchObject({
      approval_source: 'external_review',
      receipt: `codex@${NEW_HEAD}`
    });
  });

  test('dispatches externally when the starting approval is stale', async () => {
    const { store, driver, calls } = harness({
      readReceipt: async () => ({
        actor: 'codex',
        head_sha: REPAIR_HEAD,
        raw: `codex@${REPAIR_HEAD}`
      })
    });

    const starting_approval = await driver.captureStartingApproval(
      'UI-1',
      'UI-1'
    );
    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main',
      mutation: 'base_update',
      mutation_result_sha: NEW_HEAD,
      starting_approval
    });

    expect(result.state).toBe('approved');
    expect(calls.review).toHaveLength(1);
    expect(journalOf(store)?.approval_source).toBe('external_review');
  });

  test('reviews the full observed head when the mutation result mismatches', async () => {
    const { store, driver, calls } = harness({
      readReceipt: async () => ({
        actor: 'codex',
        head_sha: OLD_HEAD,
        raw: `codex@${OLD_HEAD}`
      }),
      observeHead: async () => REPAIR_HEAD
    });

    const starting_approval = await driver.captureStartingApproval(
      'UI-1',
      'UI-1'
    );
    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: REPAIR_HEAD,
      base_ref: 'main',
      mutation: 'base_update',
      mutation_result_sha: NEW_HEAD,
      starting_approval
    });

    expect(result.state).toBe('approved');
    expect(calls.review).toHaveLength(1);
    expect(calls.review[0].head_sha).toBe(REPAIR_HEAD);
    expect(journalOf(store)).toMatchObject({
      approval_source: 'external_review',
      receipt: `codex@${REPAIR_HEAD}`
    });
  });

  test('dispatches the reviewer exactly once and approves with a bound receipt', async () => {
    const { store, driver, calls } = harness();

    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main'
    });

    expect(result.state).toBe('approved');
    expect(calls.review).toHaveLength(1);
    expect(calls.review[0].attempt_id).toBe(
      reviewAttemptId('authority-1', NEW_HEAD)
    );
    expect(calls.write_receipt).toEqual([
      { bead_id: 'UI-1', receipt: `codex@${NEW_HEAD}` }
    ]);
    expect(journalOf(store)).toMatchObject({
      state: 'approved',
      head_sha: NEW_HEAD,
      approval_source: 'external_review',
      receipt: `codex@${NEW_HEAD}`
    });
  });

  test('adopts an existing current non-self receipt without dispatching', async () => {
    const { store, driver, calls } = harness({
      readReceipt: async () => ({
        actor: 'codex',
        head_sha: OLD_HEAD,
        raw: `codex@${OLD_HEAD}`
      })
    });

    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: OLD_HEAD,
      base_ref: 'main'
    });

    expect(result.state).toBe('approved');
    expect(calls.review).toHaveLength(0);
    expect(journalOf(store)).toMatchObject({
      state: 'approved',
      approval_source: 'existing_current',
      receipt: `codex@${OLD_HEAD}`
    });
  });

  test('records the enqueue-time binding as the receipt actor, not a selection', async () => {
    const { store, driver, calls } = harness({
      readReceipt: async () => ({
        actor: 'codex',
        head_sha: OLD_HEAD,
        raw: `codex@${OLD_HEAD}`
      })
    });

    await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: OLD_HEAD,
      base_ref: 'main'
    });

    expect(calls.select).toHaveLength(0);
    expect(journalOf(store)).toMatchObject({ reviewer: 'codex' });
  });

  test('settles the enqueue-time binding in one persist, never through pending', async () => {
    const { store, driver } = harness({
      readReceipt: async () => ({
        actor: 'codex',
        head_sha: OLD_HEAD,
        raw: `codex@${OLD_HEAD}`
      })
    });
    const before = store.snapshot(WS).revision;

    await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: OLD_HEAD,
      base_ref: 'main'
    });

    expect(store.snapshot(WS).revision).toBe(before + 1);
  });

  test('approves the enqueue-time binding even when reviewer selection is self', async () => {
    const { store, driver, calls } = harness({
      readReceipt: async () => ({
        actor: 'codex',
        head_sha: OLD_HEAD,
        raw: `codex@${OLD_HEAD}`
      }),
      selectReviewer: async () => ({
        ok: false,
        reviewer: 'self',
        effort: 'xhigh',
        reason: 'reviewer_selection_self'
      })
    });

    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: OLD_HEAD,
      base_ref: 'main'
    });

    // No reviewer is ever asked to honour the selection on this path, so a
    // `self`/`skip` record must not refuse a merge that needs no review.
    expect(result.state).toBe('approved');
    expect(calls.review).toHaveLength(0);
    expect(journalOf(store)).toMatchObject({
      state: 'approved',
      approval_source: 'existing_current'
    });
  });

  test('binds an ordinary self receipt current for the clicked head', async () => {
    const { store, driver, calls } = harness({
      readReceipt: async () => ({
        actor: 'self',
        head_sha: OLD_HEAD,
        raw: `self@${OLD_HEAD}`
      }),
      observeHead: async () => OLD_HEAD
    });

    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: OLD_HEAD,
      base_ref: 'main'
    });

    // The ordinary workflow's controller self-review IS the receipt the
    // ordinary merge gate trusts; binding it costs no external review.
    expect(result.state).toBe('approved');
    expect(calls.review).toHaveLength(0);
    expect(journalOf(store)).toMatchObject({
      approval_source: 'existing_current',
      receipt: `self@${OLD_HEAD}`
    });
  });

  test('refuses a self receipt that only appeared after a head mutation', async () => {
    const { store, driver, calls } = harness({
      // The head moved to NEW_HEAD, and a `self@NEW_HEAD` receipt exists that
      // no recorded review attempt produced.
      readReceipt: async () => ({
        actor: 'self',
        head_sha: NEW_HEAD,
        raw: `self@${NEW_HEAD}`
      })
    });

    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main',
      mutation: 'resolver:res-1'
    });

    expect(result.state).toBe('approved');
    // It did NOT ride the independent receipt in — a real review ran and its
    // own receipt is what the journal binds.
    expect(calls.review).toHaveLength(1);
    expect(journalOf(store)).toMatchObject({
      approval_source: 'external_review',
      receipt: `codex@${NEW_HEAD}`
    });
  });

  test('refuses a skipped receipt and reviews instead', async () => {
    const { driver, calls } = harness({
      readReceipt: async () => ({
        actor: 'skipped',
        head_sha: OLD_HEAD,
        raw: `skipped@${OLD_HEAD}`
      }),
      observeHead: async () => OLD_HEAD
    });

    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: OLD_HEAD,
      base_ref: 'main'
    });

    expect(result.state).toBe('approved');
    expect(calls.review).toHaveLength(1);
  });

  test('fails terminally on self reviewer selection without dispatching', async () => {
    const { store, driver, calls } = harness({
      selectReviewer: async () => ({
        ok: false,
        reviewer: 'self',
        effort: 'xhigh',
        reason: 'reviewer_selection_self'
      })
    });

    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main'
    });

    expect(result).toMatchObject({
      state: 'failed',
      reason: 'reviewer_selection_self'
    });
    expect(calls.review).toHaveLength(0);
    expect(journalOf(store)).toMatchObject({
      state: 'failed',
      failure_reason: 'reviewer_selection_self'
    });
  });

  test('fails terminally when the selected transport is unavailable', async () => {
    const { store, driver } = harness({
      runReview: async () => ({ ok: false, reason: 'transport_unavailable' })
    });

    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main'
    });

    expect(result.state).toBe('failed');
    expect(journalOf(store)).toMatchObject({
      state: 'failed',
      failure_reason: 'transport_unavailable'
    });
  });

  test('fails terminally on an external head drift', async () => {
    const { store, driver, calls } = harness({
      lineage: async () => ({
        queue_owned: false,
        reason: 'external_head_drift'
      })
    });

    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main'
    });

    expect(result.state).toBe('failed');
    expect(calls.review).toHaveLength(0);
    expect(journalOf(store)).toMatchObject({
      state: 'failed',
      failure_reason: 'external_head_drift'
    });
  });

  test('does not approve on a receipt readback mismatch', async () => {
    const { store, driver } = harness({
      writeReceipt: async () => ({ ok: true, readback: `codex@${OLD_HEAD}` })
    });

    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main'
    });

    expect(result.state).toBe('failed');
    expect(journalOf(store)).toMatchObject({
      state: 'failed',
      failure_reason: 'receipt_readback_mismatch'
    });
  });

  test('does not approve when the head drifts across the receipt write', async () => {
    const { store, driver } = harness({
      observeHead: async () => REPAIR_HEAD
    });

    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main'
    });

    expect(result.state).toBe('failed');
    expect(journalOf(store)).toMatchObject({
      state: 'failed',
      failure_reason: 'head_drift_during_receipt'
    });
  });

  test('adopts a prerecorded reviewing attempt instead of re-dispatching', async () => {
    const { store, driver, calls } = harness();
    store.beginHeadReview(WS, {
      bead_id: 'UI-1',
      authority_id: 'authority-1',
      head_sha: NEW_HEAD,
      reviewer: 'codex',
      effort: 'xhigh'
    });
    store.setHeadReviewState(WS, {
      bead_id: 'UI-1',
      authority_id: 'authority-1',
      head_sha: NEW_HEAD,
      expected_state: 'pending',
      patch: {
        state: 'reviewing',
        review_attempt_id: reviewAttemptId('authority-1', NEW_HEAD)
      }
    });

    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main'
    });

    expect(result.state).toBe('approved');
    expect(calls.review).toHaveLength(1);
    expect(calls.review[0].attempt_id).toBe(
      reviewAttemptId('authority-1', NEW_HEAD)
    );
    expect(calls.lineage).toHaveLength(0);
  });

  test('re-verifies the Beads receipt behind an already approved journal', async () => {
    let receipt = /** @type {any} */ (null);
    const { store, driver } = harness({
      readReceipt: async () => receipt,
      writeReceipt: async (
        /** @type {string} */ _bead_id,
        /** @type {string} */ written
      ) => {
        receipt = {
          actor: 'codex',
          head_sha: NEW_HEAD,
          raw: written
        };
        return { ok: true, readback: written };
      }
    });
    await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main',
      mutation: 'resolver:res-1'
    });
    expect(journalOf(store)?.state).toBe('approved');

    // Something rewrote the receipt after the approval landed.
    receipt = { actor: 'self', head_sha: NEW_HEAD, raw: `self@${NEW_HEAD}` };
    const again = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main'
    });

    expect(again).toMatchObject({
      state: 'failed',
      reason: 'receipt_readback_mismatch'
    });
    expect(journalOf(store)).toMatchObject({ state: 'failed' });
  });

  test('passes the caller-vouched mutation evidence into the lineage probe', async () => {
    const { driver, calls } = harness();

    await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main',
      head_ref: 'UI-1',
      mutation: 'resolver:res-1'
    });

    expect(calls.lineage).toHaveLength(1);
    expect(calls.lineage[0]).toMatchObject({
      prior_head_sha: OLD_HEAD,
      head_sha: NEW_HEAD,
      head_ref: 'UI-1',
      mutation: 'resolver:res-1'
    });
  });

  test('returns gone without a receipt write when cancelled mid-review', async () => {
    /** @type {any} */
    let harness_ref = null;
    const { store, driver, calls } = harness({
      runReview: async (/** @type {any} */ packet) => {
        harness_ref.calls.review.push(packet);
        store.cancelMerge(WS, {
          expected_revision: store.snapshot(WS).revision,
          bead_id: 'UI-1'
        });
        return { ok: true, verdict: 'APPROVE' };
      }
    });
    harness_ref = { calls };

    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main'
    });

    expect(result.state).toBe('gone');
    expect(calls.write_receipt).toHaveLength(0);
  });
});

describe('worker/head-review — bounded repair (UI-58w8 seam 3)', () => {
  /**
   * @param {Record<string, any>} [overrides]
   */
  function reviseHarness(overrides = {}) {
    return harness({
      runReview: async () => ({
        ok: true,
        verdict: 'REVISE',
        findings: [{ title: 'finding-1' }]
      }),
      readReceipt: async () => null,
      ...overrides
    });
  }

  test('prerecords findings and repairs exactly once before approving', async () => {
    /** @type {any[]} */
    const repair_receipts = [];
    const { store, driver, calls } = reviseHarness({
      readReceipt: async () => {
        // After the repair pushed, the controller receipt reads back for the
        // repair head; before that there is none.
        return repair_receipts.length > 0
          ? { actor: 'self', head_sha: REPAIR_HEAD, raw: `self@${REPAIR_HEAD}` }
          : null;
      },
      runRepair: async (/** @type {any} */ packet) => {
        repair_receipts.push(packet);
        return { ok: true, head_sha: REPAIR_HEAD, self_review: 'APPROVE' };
      }
    });

    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main'
    });

    expect(result.state).toBe('approved');
    expect(calls.repair).toHaveLength(0); // reviseHarness overrides runRepair
    expect(repair_receipts).toHaveLength(1);
    expect(repair_receipts[0].findings).toEqual([{ title: 'finding-1' }]);
    expect(journalOf(store)).toMatchObject({
      state: 'approved',
      head_sha: REPAIR_HEAD,
      approval_source: 'bounded_repair',
      repair_rounds: 1,
      receipt: `self@${REPAIR_HEAD}`
    });
    expect(journalOf(store)?.findings_digest).toEqual(expect.any(String));
  });

  test('fails without a second repair when the budget is already consumed', async () => {
    const { store, driver } = reviseHarness();
    store.beginHeadReview(WS, {
      bead_id: 'UI-1',
      authority_id: 'authority-1',
      head_sha: OLD_HEAD,
      reviewer: 'codex',
      effort: 'xhigh'
    });
    store.setHeadReviewState(WS, {
      bead_id: 'UI-1',
      authority_id: 'authority-1',
      head_sha: OLD_HEAD,
      expected_state: 'pending',
      patch: { state: 'reviewing', repair_rounds: 1 }
    });
    store.setHeadReviewState(WS, {
      bead_id: 'UI-1',
      authority_id: 'authority-1',
      head_sha: OLD_HEAD,
      expected_state: 'reviewing',
      patch: {
        state: 'approved',
        approval_source: 'bounded_repair',
        receipt: `self@${OLD_HEAD}`
      }
    });
    // A later queue-owned head supersedes the approved journal; its fresh
    // review then comes back REVISE with the budget already spent.
    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main'
    });

    expect(result).toMatchObject({
      state: 'failed',
      reason: 'repair_budget_exhausted'
    });
    expect(journalOf(store)).toMatchObject({
      state: 'failed',
      repair_rounds: 1
    });
  });

  test('fails when the repair leaves the head unchanged', async () => {
    const { store, driver } = reviseHarness({
      runRepair: async () => ({
        ok: true,
        head_sha: NEW_HEAD,
        self_review: 'APPROVE'
      })
    });

    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main'
    });

    expect(result.state).toBe('failed');
    expect(journalOf(store)).toMatchObject({
      state: 'failed',
      failure_reason: 'repair_head_unchanged'
    });
  });

  test('fails when the repair head is not queue-owned', async () => {
    /** @type {any[]} */
    const lineage_calls = [];
    const { store, driver } = reviseHarness({
      lineage: async (
        /** @type {string} */ _bead,
        /** @type {any} */ input
      ) => {
        lineage_calls.push(input);
        // The review-head lineage passes; the repair-head lineage fails.
        return input.head_sha === REPAIR_HEAD
          ? { queue_owned: false, reason: 'external_head_drift' }
          : { queue_owned: true };
      },
      runRepair: async () => ({
        ok: true,
        head_sha: REPAIR_HEAD,
        self_review: 'APPROVE'
      })
    });

    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main'
    });

    expect(result.state).toBe('failed');
    expect(journalOf(store)).toMatchObject({
      state: 'failed',
      failure_reason: 'external_head_drift'
    });
  });

  test('fails when the repair returns no structured self-review', async () => {
    const { store, driver } = reviseHarness({
      runRepair: async () => ({ ok: true, head_sha: REPAIR_HEAD })
    });

    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main'
    });

    expect(result.state).toBe('failed');
    expect(journalOf(store)).toMatchObject({
      state: 'failed',
      failure_reason: 'repair_self_review_missing'
    });
  });

  test('fails when the repair receipt does not read back', async () => {
    const { store, driver } = reviseHarness({
      runRepair: async () => ({
        ok: true,
        head_sha: REPAIR_HEAD,
        self_review: 'APPROVE'
      }),
      readReceipt: async () => null
    });

    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main'
    });

    expect(result.state).toBe('failed');
    expect(journalOf(store)).toMatchObject({
      state: 'failed',
      failure_reason: 'repair_receipt_readback_mismatch'
    });
  });

  test('fails when the repair session itself fails', async () => {
    const { store, driver } = reviseHarness({
      runRepair: async () => ({ ok: false, reason: 'repair_failed' })
    });

    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main'
    });

    expect(result.state).toBe('failed');
    expect(journalOf(store)).toMatchObject({
      state: 'failed',
      failure_reason: 'repair_failed'
    });
  });
});

/**
 * The AUTOMATIC review lane: a completion root enrolled by the coordinator's
 * one-revision write, driven by the same machine a click drives.
 *
 * @param {Record<string, any>} [overrides]
 */
function autoHarness(overrides = {}) {
  const ids = ['authority-1', 'authority-2'];
  const store = createQueueStore({
    now: () => 123,
    randomUUID: () => /** @type {string} */ (ids.shift())
  });
  store.appendAttempt(WS, {
    expected_revision: 0,
    attempt: {
      attempt_id: 'att-UI-1',
      bead_id: 'UI-1',
      repo: '/repo',
      target_base: 'main',
      base_oid: 'e'.repeat(40),
      runner: 'claude'
    }
  });
  store.moveToPrWait(WS, {
    bead_id: 'UI-1',
    attempt_id: 'att-UI-1',
    patch: { status: 'done', finished_at: 1 }
  });
  store.toggleAutoMerge(WS, {
    expected_revision: store.snapshot(WS).revision,
    on: true
  });
  store.enqueueCompletionIntent(WS, {
    expected_revision: store.snapshot(WS).revision,
    root_bead_id: 'UI-1',
    source_attempt_id: 'att-UI-1',
    target_base: 'main',
    subject: {
      role: 'root',
      bead_id: 'UI-1',
      pr_url: 'https://github.com/o/r/pull/1',
      head_sha: NEW_HEAD,
      base_sha: 'e'.repeat(40),
      merged_sha: null
    }
  });
  const enrolled = store.enrolAutoReview(WS, {
    root_bead_id: 'UI-1',
    resolution: /** @type {any} */ ({
      class: 'auto_review',
      origin_reason: 'review_receipt_missing',
      origin_stage: 'gate',
      return_phase: 'gating',
      attempts: 1,
      next_at: null,
      last_error: null
    }),
    head_sha: NEW_HEAD,
    target_base: 'main',
    reviewer: 'unresolved',
    effort: 'unresolved'
  });

  /** @type {Record<string, any[]>} */
  const calls = { review: [], repair: [] };
  const driver = createHeadReview({
    workspace: WS,
    store,
    selectReviewer: async () => ({
      ok: true,
      reviewer: 'codex',
      effort: 'xhigh',
      source: 'harness'
    }),
    readReceipt: async () => null,
    lineage: async () => ({ queue_owned: true }),
    runReview: async (/** @type {any} */ packet) => {
      calls.review.push(packet);
      return { ok: true, verdict: 'APPROVE' };
    },
    writeReceipt: async (
      /** @type {string} */ _bead_id,
      /** @type {string} */ receipt
    ) => ({ ok: true, readback: receipt }),
    observeHead: async () => NEW_HEAD,
    runRepair: async (/** @type {any} */ packet) => {
      calls.repair.push(packet);
      return { ok: true, head_sha: REPAIR_HEAD, self_review: 'APPROVE' };
    },
    ...overrides
  });
  return { store, driver, calls, enrolled };
}

describe('worker/head-review — automatic review lane', () => {
  test('enrols the root with an automatic authority and a pending journal', () => {
    const { store, enrolled } = autoHarness();

    const entry = /** @type {any} */ (store.snapshot(WS).merge_queue[0]);

    expect(enrolled.ok).toBe(true);
    expect(entry.authority.source).toBe('automatic');
    expect(entry.head_review).toMatchObject({
      state: 'pending',
      reviewer: 'unresolved'
    });
    expect(store.snapshot(WS).completion_intents['UI-1'].phase).toBe(
      'reviewing'
    );
  });

  test('progresses the journal for an automatic authority in the review phase', async () => {
    const { driver, calls, store } = autoHarness();

    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main'
    });

    expect(result.state).toBe('approved');
    expect(calls.review[0]).toMatchObject({
      origin: 'auto',
      reviewer: 'codex',
      effort: 'xhigh',
      reviewer_source: 'harness'
    });
    expect(
      /** @type {any} */ (store.snapshot(WS).merge_queue[0]).head_review
        .reviewer
    ).toBe('codex');
  });

  test('halts an automatic authority whose intent is not in the review phase', async () => {
    const { driver, calls, store } = autoHarness();
    store.clearCompletionAutoResolution(WS, {
      root_bead_id: 'UI-1',
      phase: 'gating'
    });

    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main'
    });

    expect(result).toEqual({ state: 'halted', reason: 'no_manual_authority' });
    expect(calls.review).toHaveLength(0);
  });

  test('fails the prerecorded journal closed when the ladder answers self', async () => {
    const { driver, calls, store } = autoHarness({
      selectReviewer: async () => ({
        ok: false,
        reviewer: 'self',
        effort: 'xhigh',
        source: 'bead',
        reason: 'reviewer_selection_self'
      })
    });

    const result = await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main'
    });

    expect(result).toEqual({
      state: 'failed',
      reason: 'reviewer_selection_self'
    });
    expect(calls.review).toHaveLength(0);
    expect(
      /** @type {any} */ (store.snapshot(WS).merge_queue[0]).head_review.state
    ).toBe('failed');
  });

  test('keeps the running journal when a click promotes the authority', () => {
    const { store } = autoHarness();
    const before = /** @type {any} */ (store.snapshot(WS).merge_queue[0])
      .authority.id;

    store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1', head_sha: NEW_HEAD, target_base: 'main' }]
    });

    const entry = /** @type {any} */ (store.snapshot(WS).merge_queue[0]);
    expect(entry.authority).toMatchObject({ id: before, source: 'manual' });
    expect(entry.head_review).toMatchObject({
      authority_id: before,
      state: 'pending'
    });
  });

  test('records the click origin once the authority is promoted', async () => {
    const { store, driver, calls } = autoHarness();
    store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1', head_sha: NEW_HEAD, target_base: 'main' }]
    });

    await driver.ensureApproved('UI-1', 'UI-1', {
      head_sha: NEW_HEAD,
      base_ref: 'main'
    });

    expect(calls.review[0]).toMatchObject({ origin: 'click' });
  });
});

describe('worker/head-review — automatic dispatch head binding (UI-hk74 §6.1)', () => {
  test('accepts the head the enrolled authority named', () => {
    const drifted = autoReviewHeadDrifted(
      { requested_head_sha: NEW_HEAD },
      NEW_HEAD.toUpperCase()
    );

    expect(drifted).toBe(false);
  });

  test('refuses a head that moved after enrolment', () => {
    const drifted = autoReviewHeadDrifted(
      { requested_head_sha: OLD_HEAD },
      NEW_HEAD
    );

    expect(drifted).toBe(true);
  });

  test('reports no drift for a row that carries no authority', () => {
    const drifted = autoReviewHeadDrifted(null, NEW_HEAD);

    expect(drifted).toBe(false);
  });
});
