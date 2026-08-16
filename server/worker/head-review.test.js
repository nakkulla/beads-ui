import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { createHeadReview, reviewAttemptId } from './head-review.js';
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
      return { ok: true, head_sha: REPAIR_HEAD };
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

  test('refuses a journal-less self receipt and reviews instead', async () => {
    const { driver, calls } = harness({
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

    expect(result.state).toBe('approved');
    expect(calls.review).toHaveLength(1);
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
        return { ok: true, head_sha: REPAIR_HEAD };
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
      runRepair: async () => ({ ok: true, head_sha: NEW_HEAD })
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
      runRepair: async () => ({ ok: true, head_sha: REPAIR_HEAD })
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

  test('fails when the repair receipt does not read back', async () => {
    const { store, driver } = reviseHarness({
      runRepair: async () => ({ ok: true, head_sha: REPAIR_HEAD }),
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
