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
 * @param {{ store?: any, metadata?: Record<string, unknown>, dispatch?: any, observe?: any, kick?: any }} [overrides]
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
  test('claims the two review-hold reasons', () => {
    expect(isReviewAfterMergeReason('review_receipt_missing')).toBe(true);
    expect(isReviewAfterMergeReason('review_receipt_stale')).toBe(true);
  });

  test('refuses spec_id_missing and undetermined', () => {
    expect(isReviewAfterMergeReason('spec_id_missing')).toBe(false);
    expect(isReviewAfterMergeReason('review_receipt_undetermined')).toBe(false);
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

  test('records an abnormal exit without re-judging the receipt', async () => {
    const { review, store, observeReviewReceipt } = coordinator();
    await click(review, store);

    await review.complete({
      attempt_id: 'review:1',
      bead_id: 'UI-1',
      session_ok: false,
      reason: 'killed'
    });

    expect(observeReviewReceipt).not.toHaveBeenCalled();
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
