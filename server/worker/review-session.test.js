import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createQueueStore } from './queue-store.js';
import {
  createReviewSession,
  isReviewAfterMergeReason,
  reviewSessionPrompt,
  selectReviewSession
} from './review-session.js';

/** @type {string} */
let tmp_state;
/** @type {string} */
let tmp_home;
const WS = '/tmp/example-workspace/project-a';
const CLICK_HEAD = 'a'.repeat(40);
const MOVED_HEAD = 'b'.repeat(40);

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-review-'));
  tmp_home = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-review-home-'));
  process.env.XDG_STATE_HOME = tmp_state;
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  for (const dir of [tmp_state, tmp_home]) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      /* ignore */
    }
  }
});

/**
 * Plant a claude transcript where `resolveSessionFile` looks for it.
 *
 * @param {string} session_id
 */
function plantClaudeTranscript(session_id) {
  const dir = path.join(tmp_home, '.claude', 'projects', 'proj');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${session_id}.jsonl`), '{}\n');
}

/**
 * A store with `UI-1` sitting in `pr_wait`, ready for a merge click.
 */
function prWaitStore() {
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
  return store;
}

/**
 * @param {{ store?: any, metadata?: Record<string, unknown>, dispatch?: any, observe?: any, kick?: any, guardHook?: any }} [overrides]
 */
function coordinator(overrides = {}) {
  const store = overrides.store || prWaitStore();
  const dispatchReviewSession =
    overrides.dispatch || vi.fn(async () => ({ ok: true }));
  const observeReviewReceipt =
    overrides.observe ||
    vi.fn(async () => ({
      ok: true,
      head_sha: CLICK_HEAD,
      head_ref: 'UI-1',
      state: 'current'
    }));
  const kick = overrides.kick || vi.fn(async () => {});
  const review = createReviewSession({
    workspace: WS,
    store,
    bd: {
      readIssue: async () => ({ metadata: overrides.metadata || {} })
    },
    scheduler: { dispatchReviewSession },
    observeReviewReceipt,
    kick,
    ...(overrides.guardHook ? { guardHook: overrides.guardHook } : {}),
    homeDir: tmp_home,
    makeAttemptId: () => 'review:1',
    now: () => 500
  });
  return { review, store, dispatchReviewSession, observeReviewReceipt, kick };
}

/**
 * @param {any} review
 * @param {any} store
 * @param {number} [expected_revision]
 */
function click(review, store, expected_revision) {
  return review.start({
    bead_id: 'UI-1',
    expected_revision:
      expected_revision === undefined
        ? store.snapshot(WS).revision
        : expected_revision,
    probe: {
      head_sha: CLICK_HEAD,
      target_base: 'main',
      head_ref: 'UI-1',
      pr_url: 'https://example.test/pr/9',
      reason: 'review_receipt_missing'
    }
  });
}

describe('review-session — display condition (UI-d7fy §5.1)', () => {
  test('claims all four review-hold reasons', () => {
    expect(isReviewAfterMergeReason('review_receipt_missing')).toBe(true);
    expect(isReviewAfterMergeReason('review_receipt_stale')).toBe(true);
    expect(isReviewAfterMergeReason('review_receipt_invalid')).toBe(true);
    expect(isReviewAfterMergeReason('review_receipt_undetermined')).toBe(true);
  });

  test('refuses spec_id_missing', () => {
    expect(isReviewAfterMergeReason('spec_id_missing')).toBe(false);
  });
});

describe('review-session — session selection (UI-d7fy §5.2)', () => {
  test('resumes the last claude entry whose transcript is here', () => {
    plantClaudeTranscript('sess-claude');

    const selected = selectReviewSession(
      { session_ref: `claude:sess-claude@${os.hostname()}` },
      { home_dir: tmp_home }
    );

    expect(selected).toEqual({
      resume_session_id: 'sess-claude',
      session_source: 'resume',
      reason: null
    });
  });

  test('opens a replacement session when the transcript is missing', () => {
    const selected = selectReviewSession(
      { session_ref: `claude:sess-gone@${os.hostname()}` },
      { home_dir: tmp_home }
    );

    expect(selected).toMatchObject({
      resume_session_id: null,
      session_source: 'fresh',
      reason: 'not_local'
    });
  });

  test('opens a replacement session when the last entry is codex', () => {
    plantClaudeTranscript('sess-claude');

    const selected = selectReviewSession(
      {
        session_ref: `claude:sess-claude@${os.hostname()}; codex:sess-codex@${os.hostname()}`
      },
      { home_dir: tmp_home }
    );

    expect(selected).toMatchObject({
      resume_session_id: null,
      session_source: 'fresh',
      reason: 'provider_mismatch'
    });
  });

  test('opens a replacement session when there are no entries', () => {
    const selected = selectReviewSession({}, { home_dir: tmp_home });

    expect(selected).toMatchObject({
      resume_session_id: null,
      session_source: 'fresh',
      reason: 'no_session_ref'
    });
  });
});

describe('review-session — prompt (UI-d7fy §5.3)', () => {
  test('carries the observed facts and the four prohibitions', () => {
    const prompt = reviewSessionPrompt({
      bead_id: 'UI-1',
      trigger: 'click',
      pr_url: 'https://example.test/pr/9',
      head_ref: 'UI-1',
      head_sha: CLICK_HEAD,
      impl_review: `codex@${'c'.repeat(40)}`,
      gate_reason: 'review_receipt_stale',
      attempt_id: 'review:1'
    });

    expect(prompt).toContain('https://example.test/pr/9');
    expect(prompt).toContain(CLICK_HEAD);
    expect(prompt).toContain(`codex@${'c'.repeat(40)}`);
    expect(prompt).toContain('review_receipt_stale');
    expect(prompt).toContain('review:1');
    expect(prompt).toContain('머지는 beads-ui 큐가 소유한다');
    expect(prompt).toContain('base ref push');
    expect(prompt).toContain('큐 상태 파일 편집');
  });

  test('says the receipt is absent rather than printing nothing', () => {
    const prompt = reviewSessionPrompt({
      bead_id: 'UI-1',
      trigger: 'click',
      pr_url: null,
      head_ref: null,
      head_sha: CLICK_HEAD,
      impl_review: null,
      gate_reason: 'review_receipt_missing',
      attempt_id: 'review:1'
    });

    expect(prompt).toContain('현재 impl_review: (없음)');
  });
});

describe('review-session — the click (UI-d7fy §5.2)', () => {
  test('commits the authority and the attempt as one write', () => {
    const { review, store, dispatchReviewSession } = coordinator();
    const before = store.snapshot(WS).revision;

    return click(review, store).then(() => {
      const q = store.snapshot(WS);

      expect(q.revision).toBe(before + 1);
      expect(q.merge_queue[0].authority).toMatchObject({
        id: 'authority-1',
        source: 'manual',
        requested_head_sha: CLICK_HEAD
      });
      // `pending` is what the CAS commits: the session has not spawned yet,
      // and the launch happens only after this write succeeded.
      expect(q.attempts['review:1']).toMatchObject({
        kind: 'review_session',
        status: 'pending',
        authority_id: 'authority-1',
        head_sha: CLICK_HEAD
      });
      expect(dispatchReviewSession).toHaveBeenCalledTimes(1);
    });
  });

  test('hands the PR head branch to the dispatch, not only to the prompt', async () => {
    const { review, store, dispatchReviewSession } = coordinator();

    await click(review, store);

    expect(dispatchReviewSession).toHaveBeenCalledWith(
      WS,
      expect.objectContaining({ head_ref: 'UI-1' })
    );
  });

  test('dispatches nothing when the write fails', async () => {
    const { review, store, dispatchReviewSession } = coordinator();

    const result = await click(review, store, store.snapshot(WS).revision - 1);

    expect(result.ok).toBe(false);
    expect(store.snapshot(WS).attempts['review:1']).toBeUndefined();
    expect(dispatchReviewSession).not.toHaveBeenCalled();
  });

  test('records launch_failed when the session cannot start', async () => {
    const { review, store } = coordinator({
      dispatch: vi.fn(async () => ({ ok: false, reason: 'worktree_missing' }))
    });

    await click(review, store);

    expect(store.snapshot(WS).attempts['review:1']).toMatchObject({
      status: 'failed',
      cause: 'launch_failed:worktree_missing'
    });
    expect(store.snapshot(WS).merge_queue[0].hold).toMatchObject({
      reason: 'review_receipt_missing'
    });
  });

  test('relabels a spawn abort the launcher already terminalized', async () => {
    const store = prWaitStore();
    const { review } = coordinator({
      store,
      dispatch: vi.fn(async () => {
        store.updateAttempt(WS, {
          attempt_id: 'review:1',
          patch: { status: 'failed', cause: 'spawn_failed', finished_at: 400 }
        });
        return { ok: false, reason: 'spawn_failed' };
      })
    });

    await click(review, store);

    expect(store.snapshot(WS).attempts['review:1']).toMatchObject({
      status: 'failed',
      cause: 'launch_failed:spawn_failed'
    });
  });

  test('re-clicking while one is in flight creates no second attempt', async () => {
    const { review, store, dispatchReviewSession } = coordinator();
    await click(review, store);

    const again = await review.start({
      bead_id: 'UI-1',
      expected_revision: store.snapshot(WS).revision,
      probe: {
        head_sha: CLICK_HEAD,
        target_base: 'main',
        head_ref: 'UI-1',
        reason: 'review_receipt_missing'
      }
    });

    expect(again.review_session_registered).not.toBe(true);
    expect(dispatchReviewSession).toHaveBeenCalledTimes(1);
    expect(store.snapshot(WS).merge_queue[0].authority?.id).toBe('authority-1');
  });
});

describe('review-session — completion verdict (UI-d7fy §5.4)', () => {
  test('rebinds the authority to the head a REVISE fix pushed', async () => {
    const { review, store, kick } = coordinator({
      observe: vi.fn(async () => ({
        ok: true,
        head_sha: MOVED_HEAD,
        head_ref: 'UI-1',
        state: 'current'
      }))
    });
    await click(review, store);
    store.setMergeHold(WS, {
      bead_id: 'UI-1',
      hold: { reason: 'review_receipt_missing', head_sha: CLICK_HEAD },
      at: 200
    });

    await review.complete({
      attempt_id: 'review:1',
      bead_id: 'UI-1',
      session_ok: true
    });

    const entry = store.snapshot(WS).merge_queue[0];
    // The waiver a manual authority grants follows the head it is bound to, so
    // leaving it on the click head would hold a `receipt_unbacked` row forever.
    expect(entry.authority?.requested_head_sha).toBe(MOVED_HEAD);
    expect(entry.hold).toBeUndefined();
    expect(store.snapshot(WS).attempts['review:1'].status).toBe('done');
    expect(kick).toHaveBeenCalledTimes(1);
  });

  test('holds again with the fresh reason when the receipt is still not current', async () => {
    const { review, store, kick } = coordinator({
      observe: vi.fn(async () => ({
        ok: true,
        head_sha: MOVED_HEAD,
        head_ref: 'UI-1',
        state: 'stale'
      }))
    });
    await click(review, store);

    await review.complete({
      attempt_id: 'review:1',
      bead_id: 'UI-1',
      session_ok: true
    });

    const q = store.snapshot(WS);
    expect(q.attempts['review:1']).toMatchObject({
      status: 'failed',
      cause: 'receipt_not_current'
    });
    // The authority stays on the click head; only the hold moves.
    expect(q.merge_queue[0].authority?.requested_head_sha).toBe(CLICK_HEAD);
    expect(q.merge_queue[0].hold).toMatchObject({
      reason: 'review_receipt_stale',
      head_sha: MOVED_HEAD
    });
    expect(kick).not.toHaveBeenCalled();
  });

  test('records an abnormal exit as a failure, whatever the receipt says', async () => {
    const observe = vi.fn(async () => ({
      ok: true,
      head_sha: CLICK_HEAD,
      head_ref: 'UI-1',
      state: 'current'
    }));
    const { review, store } = coordinator({ observe });
    await click(review, store);

    await review.complete({
      attempt_id: 'review:1',
      bead_id: 'UI-1',
      session_ok: false,
      reason: 'killed'
    });

    // The head IS re-observed now (2026-08-28 auto-review-dispatch spec §5.2)
    // — the claim's next head depends on it — but the receipt is still not
    // re-judged: a session that died is a failure whatever the Bead now says.
    expect(observe).toHaveBeenCalledWith('UI-1');
    expect(store.snapshot(WS).attempts['review:1']).toMatchObject({
      status: 'failed',
      cause: 'session_failed:killed'
    });
  });

  test('holds as undetermined when the re-observation cannot answer', async () => {
    const { review, store } = coordinator({
      observe: vi.fn(async () => ({ ok: false, reason: 'gh_empty' }))
    });
    await click(review, store);

    await review.complete({
      attempt_id: 'review:1',
      bead_id: 'UI-1',
      session_ok: true
    });

    expect(store.snapshot(WS).merge_queue[0].hold).toMatchObject({
      reason: 'review_receipt_undetermined'
    });
  });

  test('writes nothing at all when the cancel already took the binding', async () => {
    const { review, store, observeReviewReceipt } = coordinator();
    await click(review, store);
    store.cancelMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      bead_id: 'UI-1'
    });
    const revision = store.snapshot(WS).revision;

    const verdict = await review.complete({
      attempt_id: 'review:1',
      bead_id: 'UI-1',
      session_ok: true
    });

    expect(verdict).toEqual({ ok: false, reason: 'binding_gone' });
    expect(observeReviewReceipt).not.toHaveBeenCalled();
    expect(store.snapshot(WS).revision).toBe(revision);
    expect(store.snapshot(WS).attempts['review:1']).toMatchObject({
      status: 'failed',
      cause: 'cancelled'
    });
  });

  test('writes nothing when the authority was reissued under the session', async () => {
    const { review, store } = coordinator();
    await click(review, store);
    store.cancelMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      bead_id: 'UI-1'
    });
    store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1', head_sha: MOVED_HEAD, target_base: 'main' }]
    });
    // Revive the attempt so the AUTHORITY mismatch is the only thing left that
    // can refuse this verdict.
    store.updateAttempt(WS, {
      attempt_id: 'review:1',
      patch: { status: 'running', cause: null, finished_at: null }
    });

    const verdict = await review.complete({
      attempt_id: 'review:1',
      bead_id: 'UI-1',
      session_ok: true
    });

    expect(verdict).toEqual({ ok: false, reason: 'binding_gone' });
    expect(store.snapshot(WS).merge_queue[0].authority?.id).toBe('authority-2');
  });
});

describe('review-session — the automatic dispatch (2026-08-28 §4.1)', () => {
  /**
   * A row already holding on a review verdict, with the manual authority a
   * `[머지]` click minted and no lineage spent yet.
   *
   * @param {string} [head_sha]
   * @param {string} [reason]
   */
  function heldStore(head_sha = CLICK_HEAD, reason = 'review_receipt_missing') {
    const store = prWaitStore();
    store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1', head_sha, target_base: 'main' }]
    });
    store.setMergeHold(WS, {
      bead_id: 'UI-1',
      hold: { reason, head_sha },
      at: 1
    });
    return store;
  }

  /**
   * @param {any} review
   * @param {{ head_sha?: string, reason?: string }} [overrides]
   */
  function auto(review, overrides = {}) {
    return review.startAuto({
      bead_id: 'UI-1',
      head_sha: overrides.head_sha || CLICK_HEAD,
      head_ref: 'UI-1',
      reason: overrides.reason || 'review_receipt_missing'
    });
  }

  test('registers the attempt on the row existing authority', async () => {
    const store = heldStore();
    const { review, dispatchReviewSession } = coordinator({ store });
    const authority_before = /** @type {any} */ (
      store.snapshot(WS).merge_queue[0].authority
    );

    await auto(review);

    const q = store.snapshot(WS);
    expect(q.merge_queue[0].authority).toEqual(authority_before);
    expect(q.attempts['review:1']).toMatchObject({
      kind: 'review_session',
      origin: 'auto',
      authority_id: authority_before.id,
      head_sha: CLICK_HEAD
    });
    expect(q.merge_queue[0].review_dispatch).toMatchObject({
      head_sha: CLICK_HEAD,
      attempt_id: 'review:1',
      state: 'active'
    });
    expect(dispatchReviewSession).toHaveBeenCalledTimes(1);
  });

  test('launches nothing when the claim write is refused', async () => {
    const store = heldStore();
    const { review, dispatchReviewSession } = coordinator({ store });

    // The hold the judgment saw is not the hold on the row any more.
    const result = await auto(review, { reason: 'review_receipt_stale' });

    expect(result).toMatchObject({ ok: false, reason: 'claim_input_stale' });
    expect(dispatchReviewSession).not.toHaveBeenCalled();
    expect(store.snapshot(WS).attempts['review:1']).toBeUndefined();
    expect(store.snapshot(WS).merge_queue[0].review_dispatch).toBeUndefined();
  });

  test('refuses without an authority to ride', async () => {
    const store = prWaitStore();
    const { review, dispatchReviewSession } = coordinator({ store });

    const result = await auto(review);

    expect(result).toMatchObject({ ok: false, reason: 'authority_missing' });
    expect(dispatchReviewSession).not.toHaveBeenCalled();
  });

  test('exhausts the claim at its own head when the launch is refused', async () => {
    const store = heldStore();
    const { review } = coordinator({
      store,
      dispatch: vi.fn(async () => ({ ok: false, reason: 'bead_running' }))
    });

    await auto(review);

    const q = store.snapshot(WS);
    expect(q.attempts['review:1']).toMatchObject({
      status: 'failed',
      cause: 'launch_failed:bead_running'
    });
    // No session ran, so the head cannot have moved under one (§5.2).
    expect(q.merge_queue[0].review_dispatch).toMatchObject({
      head_sha: CLICK_HEAD,
      state: 'exhausted'
    });
    expect(q.merge_queue[0].hold).toMatchObject({
      reason: 'review_receipt_missing'
    });
  });

  test('resumes the recorded session exactly as the click does', async () => {
    plantClaudeTranscript('sess-claude');
    const store = heldStore();
    const { review, dispatchReviewSession } = coordinator({
      store,
      metadata: { session_ref: `claude:sess-claude@${os.hostname()}` }
    });

    await auto(review);

    expect(dispatchReviewSession).toHaveBeenCalledWith(
      WS,
      expect.objectContaining({
        bead_id: 'UI-1',
        attempt_id: 'review:1',
        resume_session_id: 'sess-claude',
        head_ref: 'UI-1'
      })
    );
  });

  test('tells the session the queue authorized it, not a person', async () => {
    const store = heldStore();
    const { review, dispatchReviewSession } = coordinator({ store });

    await auto(review);

    const prompt = dispatchReviewSession.mock.calls[0][1].prompt;
    expect(prompt).toContain('머지 큐가 durable `review_dispatch` claim으로');
    expect(prompt).toContain('사람의 클릭은 없었다');
    expect(prompt).not.toContain('`[리뷰 후 머지]` 클릭이 이 세션을 인가했다');
    // Everything else is the shared prompt.
    expect(prompt).toContain('머지는 beads-ui 큐가 소유한다');
    expect(prompt).toContain('review_receipt_missing');
  });
});

describe('review-session — the head a receipt-less ending left (2026-08-28 §5.2)', () => {
  /**
   * @param {{ observe?: any, guardHook?: any }} [overrides]
   */
  async function clicked(overrides = {}) {
    const built = coordinator(overrides);
    await click(built.review, built.store);
    return built;
  }

  test('follows the head this session pushed', async () => {
    const readPushLog = vi.fn(() => ({
      ok: /** @type {const} */ (true),
      entries: [{ local_oid: MOVED_HEAD }]
    }));
    const { review, store } = await clicked({
      observe: vi.fn(async () => ({
        ok: true,
        head_sha: MOVED_HEAD,
        head_ref: 'UI-1',
        state: 'missing'
      })),
      guardHook: { readPushLog }
    });

    await review.complete({
      attempt_id: 'review:1',
      bead_id: 'UI-1',
      session_ok: false,
      reason: 'turn_limit'
    });

    // A REVISE fix that was pushed and never receipted: leaving the claim at
    // the click head would let the next kick read the new head as a lineage of
    // its own and send a second external review into this one.
    expect(readPushLog).toHaveBeenCalledWith({
      workspace: WS,
      attempt_id: 'review:1'
    });
    expect(store.snapshot(WS).merge_queue[0].review_dispatch).toMatchObject({
      head_sha: MOVED_HEAD,
      state: 'exhausted'
    });
  });

  test('keeps its own head when something else moved the branch', async () => {
    const { review, store } = await clicked({
      observe: vi.fn(async () => ({
        ok: true,
        head_sha: MOVED_HEAD,
        head_ref: 'UI-1',
        state: 'missing'
      })),
      guardHook: {
        readPushLog: () => ({ ok: /** @type {const} */ (true), entries: [] })
      }
    });

    await review.complete({
      attempt_id: 'review:1',
      bead_id: 'UI-1',
      session_ok: false,
      reason: 'turn_limit'
    });

    // An external force-push or a base sync is a NEW lineage, which the next
    // kick opens its own claim on.
    expect(store.snapshot(WS).merge_queue[0].review_dispatch).toMatchObject({
      head_sha: CLICK_HEAD,
      state: 'exhausted'
    });
  });

  test('fails closed when the push record cannot be read', async () => {
    const { review, store } = await clicked({
      observe: vi.fn(async () => ({
        ok: true,
        head_sha: MOVED_HEAD,
        head_ref: 'UI-1',
        state: 'missing'
      })),
      guardHook: {
        readPushLog: () => ({
          ok: /** @type {const} */ (false),
          reason: 'absent'
        })
      }
    });

    await review.complete({
      attempt_id: 'review:1',
      bead_id: 'UI-1',
      session_ok: false,
      reason: 'turn_limit'
    });

    // `head_sha: null` is read by §4 as "no automatic dispatch at ANY head";
    // the button is the exit and its click writes a fresh claim.
    expect(store.snapshot(WS).merge_queue[0].review_dispatch).toMatchObject({
      head_sha: null,
      state: 'exhausted'
    });
  });

  test('re-observes the head even when the session died', async () => {
    const observe = vi.fn(async () => ({
      ok: true,
      head_sha: MOVED_HEAD,
      head_ref: 'UI-1',
      state: 'missing'
    }));
    const { review, store } = await clicked({
      observe,
      guardHook: {
        readPushLog: () => ({
          ok: /** @type {const} */ (true),
          entries: [{ local_oid: MOVED_HEAD }]
        })
      }
    });

    await review.complete({
      attempt_id: 'review:1',
      bead_id: 'UI-1',
      session_ok: false,
      reason: 'process_gone'
    });

    // The old path settled a dead session without asking where the head ended
    // up, which made every park and turn limit a fail-closed claim.
    expect(observe).toHaveBeenCalledWith('UI-1');
    expect(store.snapshot(WS).attempts['review:1']).toMatchObject({
      status: 'failed',
      cause: 'session_failed:process_gone'
    });
    expect(store.snapshot(WS).merge_queue[0].hold?.head_sha).toBe(MOVED_HEAD);
  });

  test('carries the same two facts out of a receipt that is not current', async () => {
    const { review, store } = await clicked({
      observe: vi.fn(async () => ({
        ok: true,
        head_sha: MOVED_HEAD,
        head_ref: 'UI-1',
        state: 'stale'
      })),
      guardHook: {
        readPushLog: () => ({
          ok: /** @type {const} */ (true),
          entries: [{ local_oid: MOVED_HEAD }]
        })
      }
    });

    await review.complete({
      attempt_id: 'review:1',
      bead_id: 'UI-1',
      session_ok: true,
      reason: null
    });

    expect(store.snapshot(WS).merge_queue[0].review_dispatch).toMatchObject({
      head_sha: MOVED_HEAD,
      state: 'exhausted'
    });
  });
});
