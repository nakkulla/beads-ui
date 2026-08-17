/**
 * The manual-merge head-review continuation (UI-58w8 §2–§4).
 *
 * A manual [머지] click is a durable per-item authority, and every queue-owned
 * head mutation after it (conflict resolver push, approved base update, the
 * one bounded repair) must re-acquire a CURRENT implementation review before
 * the final merge gate runs. This module owns exactly that state machine; the
 * effects it needs — reviewer selection, the review/repair transports, Beads
 * receipt write/readback, PR head observation, lineage proof — are injected,
 * so the machine's safety properties are testable without any of them.
 *
 * Safety properties, in the order the incident taught them (UI-wv97 PR #142):
 *
 * - Every transition goes through the queue store's authority/head/state CAS
 *   ({@link import('./queue-store.js')}), so a cancelled or superseded attempt
 *   reporting late is ALWAYS a no-op — stop-success is never a merge input.
 * - The reviewer is dispatched exactly once per (authority, head): the attempt
 *   id is deterministic and prerecorded in the journal BEFORE dispatch, so a
 *   restart adopts the recorded attempt instead of minting a duplicate.
 * - `REVISE` buys exactly one repair round per authority. The budget is
 *   carried across journal supersession and never reset by anything short of
 *   a fresh authority (a re-click).
 * - Approval requires the receipt to be WRITTEN and READ BACK for the exact
 *   journal head, with no head drift across the write. `skipped@<head>` and a
 *   journal-less `self@<head>` never approve, whatever SHA they carry.
 *
 * @import { HeadReview } from './queue-store.js'
 */
import nodeCrypto from 'node:crypto';

const SHA40_RE = /^[0-9a-f]{40}$/i;

/**
 * Harness implementation-gate defaults, projected here as a consumer. The
 * canonical owner is dotfiles `docs/contracts/harness.yaml`; background
 * continuation selection is exactly Bead `impl_review_model`/`impl_review_effort`
 * then this default — no other layer participates (workflow contract, manual
 * merge continuation).
 */
export const DEFAULT_REVIEWER = 'codex';
export const DEFAULT_REVIEW_EFFORT = 'xhigh';

/**
 * Deterministic review attempt identity for one (authority, head). Being a
 * pure function of the journal key is what makes prerecord-before-dispatch
 * and restart adoption possible at all.
 *
 * @param {string} authority_id
 * @param {string} head_sha
 */
export function reviewAttemptId(authority_id, head_sha) {
  return `review:${authority_id}:${head_sha.toLowerCase()}`;
}

/**
 * @param {string} authority_id
 * @param {string} head_sha
 */
export function repairAttemptId(authority_id, head_sha) {
  return `repair:${authority_id}:${head_sha.toLowerCase()}`;
}

/**
 * Canonical digest of a REVISE findings payload, durably prerecorded so the
 * repair session provably worked on the reviewer's exact findings.
 *
 * @param {unknown} findings
 */
export function findingsDigest(findings) {
  return nodeCrypto
    .createHash('sha256')
    .update(JSON.stringify(findings ?? null))
    .digest('hex');
}

/**
 * @typedef {Object} EnsureApprovedResult
 * @property {'approved'|'failed'|'gone'|'halted'} state - `approved` means the
 * journal is approved for the current head and the caller may re-gate;
 * `failed` is terminal needs-human (re-click issues a new authority); `gone`
 * means the entry/authority vanished mid-flight (cancel/dequeue) and every
 * late effect was a no-op; `halted` asks the caller to stop this drain and
 * retry on the next observation.
 * @property {string|null} reason
 */

/**
 * @typedef {Object} HeadReviewDeps
 * @property {string} workspace
 * @property {ReturnType<typeof import('./queue-store.js').createQueueStore>} store
 * @property {(bead_id: string) => Promise<{ ok: boolean, reviewer?: string, effort?: string, reason?: string }>} selectReviewer -
 * Resolve the background reviewer. On `ok:false` the raw selected labels are
 * still returned so the failure journal names what was selected.
 * @property {(bead_id: string) => Promise<{ actor: string, head_sha: string, raw: string }|null>} readReceipt -
 * Authoritative current `impl_review` receipt (Beads read), parsed.
 * @property {(bead_id: string, input: { prior_head_sha: string, head_sha: string, target_base: string, head_ref?: string|null, mutation?: string|null }) => Promise<{ queue_owned: boolean, reason?: string }>} lineage -
 * Prove the head mutation is queue-owned: prior head ancestry, target base,
 * remote containment. Anything unprovable returns `queue_owned:false`.
 * @property {(packet: Record<string, unknown>) => Promise<{ ok: boolean, verdict?: string, findings?: unknown[], reason?: string }>} runReview -
 * Run (or adopt, keyed by `attempt_id`) one read-only review attempt to its
 * terminal structured verdict. Anything malformed returns `ok:false`.
 * @property {(bead_id: string, receipt: string) => Promise<{ ok: boolean, readback: string|null, reason?: string }>} writeReceipt -
 * Write `impl_review` and read it back from the same authority.
 * @property {(bead_id: string) => Promise<string|null>} observeHead - Fresh
 * authoritative PR head observation (post-write drift check).
 * @property {(packet: Record<string, unknown>) => Promise<{ ok: boolean, head_sha?: string, self_review?: string, reason?: string }>} runRepair -
 * Run the single bounded repair-controller attempt: apply the findings batch,
 * validate, push, self-review the exact delta, record the receipt. Returns
 * the pushed head; the driver independently verifies lineage and readback.
 * @property {(...args: any[]) => void} [log]
 */

/**
 * @param {HeadReviewDeps} deps
 */
export function createHeadReview(deps) {
  const workspace = deps.workspace;
  const log = deps.log || (() => {});

  /**
   * @param {string} queue_bead_id
   */
  function queuedEntry(queue_bead_id) {
    const q = /** @type {any} */ (deps.store.snapshot(workspace));
    const lane = Array.isArray(q?.merge_queue) ? q.merge_queue : [];
    return (
      lane.find((/** @type {any} */ e) => e.bead_id === queue_bead_id) || null
    );
  }

  /**
   * CAS one journal transition; `false` means the authority/head/state moved
   * under us and the caller must treat its own result as late.
   *
   * @param {string} queue_bead_id
   * @param {string} authority_id
   * @param {string} head_sha
   * @param {HeadReview['state']} expected_state
   * @param {Record<string, unknown>} patch
   */
  function transition(
    queue_bead_id,
    authority_id,
    head_sha,
    expected_state,
    patch
  ) {
    try {
      return deps.store.setHeadReviewState(workspace, {
        bead_id: queue_bead_id,
        authority_id,
        head_sha,
        expected_state,
        patch
      }).ok;
    } catch (err) {
      log('head-review transition failed for %s: %o', queue_bead_id, err);
      return false;
    }
  }

  /**
   * Terminalize the journal and shape the caller result in one place.
   *
   * @param {string} queue_bead_id
   * @param {string} authority_id
   * @param {string} head_sha
   * @param {HeadReview['state']} expected_state
   * @param {string} reason
   * @returns {EnsureApprovedResult}
   */
  function failJournal(
    queue_bead_id,
    authority_id,
    head_sha,
    expected_state,
    reason
  ) {
    const ok = transition(
      queue_bead_id,
      authority_id,
      head_sha,
      expected_state,
      {
        state: 'failed',
        failure_reason: reason
      }
    );
    return { state: ok ? 'failed' : 'gone', reason };
  }

  /**
   * Drive one manual-authority queue item's head-review journal to `approved`
   * or a terminal disposition for the CURRENT observed head.
   *
   * @param {string} queue_bead_id
   * @param {string} subject_bead_id
   * @param {{ head_sha: string, base_ref: string|null, head_ref?: string|null, mutation?: string|null }} observed - The
   * head identity the caller's authoritative probe just returned — never
   * a cached one — plus the queue-owned mutation evidence the caller can
   * vouch for (`resolver:<attempt_id>` after a consumed ready resolution,
   * `base_update` after the driver's own branch update). A moved head with no
   * vouched mutation is treated as external (fail closed).
   * @returns {Promise<EnsureApprovedResult>}
   */
  async function ensureApproved(queue_bead_id, subject_bead_id, observed) {
    const entry = queuedEntry(queue_bead_id);
    if (!entry) {
      return { state: 'gone', reason: null };
    }
    const authority = entry.authority;
    if (!authority || authority.source !== 'manual') {
      return { state: 'halted', reason: 'no_manual_authority' };
    }
    if (
      typeof observed?.head_sha !== 'string' ||
      !SHA40_RE.test(observed.head_sha)
    ) {
      return { state: 'halted', reason: 'head_unobservable' };
    }
    const head_sha = observed.head_sha.toLowerCase();
    /** @type {HeadReview|null} */
    let journal = entry.head_review ?? null;

    if (journal && journal.state === 'failed') {
      return { state: 'failed', reason: journal.failure_reason };
    }
    if (journal && journal.state === 'approved') {
      if (journal.head_sha === head_sha) {
        // The journal alone is not enough: the Beads receipt must STILL read
        // back as the exact approved value — an independently rewritten
        // receipt after approval must not ride an old journal into a merge.
        const current = await deps.readReceipt(subject_bead_id);
        if (
          current === null ||
          current.raw !== journal.receipt ||
          current.head_sha.toLowerCase() !== head_sha
        ) {
          return failJournal(
            queue_bead_id,
            authority.id,
            head_sha,
            'approved',
            'receipt_readback_mismatch'
          );
        }
        return { state: 'approved', reason: null };
      }
      // A queue-owned mutation moved past an approved head — the approval is
      // consumed and a fresh journal takes over below.
    }

    const selection = await deps.selectReviewer(subject_bead_id);
    const reviewer =
      typeof selection.reviewer === 'string' && selection.reviewer.length > 0
        ? selection.reviewer
        : DEFAULT_REVIEWER;
    const effort =
      typeof selection.effort === 'string' && selection.effort.length > 0
        ? selection.effort
        : DEFAULT_REVIEW_EFFORT;

    if (journal && journal.head_sha !== head_sha) {
      // Supersession: prove the move from the journal's head is queue-owned
      // before abandoning that journal.
      const lin = await deps.lineage(subject_bead_id, {
        prior_head_sha: journal.head_sha,
        head_sha,
        target_base: authority.target_base,
        head_ref: observed.head_ref ?? null,
        mutation: observed.mutation ?? null
      });
      if (!lin.queue_owned) {
        return failJournal(
          queue_bead_id,
          authority.id,
          journal.head_sha,
          journal.state,
          lin.reason || 'external_head_drift'
        );
      }
      journal = null;
    }

    if (!journal) {
      const receipt = await deps.readReceipt(subject_bead_id);
      const receipt_head =
        receipt && SHA40_RE.test(receipt.head_sha)
          ? receipt.head_sha.toLowerCase()
          : null;

      if (
        !deps.store.beginHeadReview(workspace, {
          bead_id: queue_bead_id,
          authority_id: authority.id,
          head_sha,
          reviewer,
          effort
        }).ok
      ) {
        // Either the entry moved under us or a same-head journal appeared —
        // re-read and adopt it on the next pass.
        const current = queuedEntry(queue_bead_id)?.head_review ?? null;
        if (!current || current.head_sha !== head_sha) {
          return { state: 'gone', reason: null };
        }
        journal = /** @type {HeadReview} */ (current);
      } else {
        journal = /** @type {HeadReview} */ (
          queuedEntry(queue_bead_id)?.head_review ?? null
        );
        if (!journal) {
          return { state: 'gone', reason: null };
        }
      }

      if (!selection.ok) {
        return failJournal(
          queue_bead_id,
          authority.id,
          head_sha,
          journal.state,
          selection.reason || 'reviewer_selection_invalid'
        );
      }

      // Enqueue-time binding (§2): the ordinary workflow receipt that is
      // ALREADY current for the head this click pinned binds as
      // `existing_current` — the same receipt the ordinary merge gate trusts,
      // now recorded in the journal rather than consumed bare. Only `skipped`
      // is refused: it is authority to proceed, never review evidence.
      //
      // This binding is available ONLY before any queue-owned head mutation
      // (`head_sha === authority.requested_head_sha`). After a mutation the
      // receipt must come from a review attempt this journal recorded, which
      // is what stops an independently written `self@<current-head>` from
      // reaching the merge gate (§5).
      if (
        journal.state === 'pending' &&
        head_sha === authority.requested_head_sha &&
        receipt_head === head_sha &&
        receipt !== null &&
        receipt.actor !== 'skipped'
      ) {
        const ok = transition(
          queue_bead_id,
          authority.id,
          head_sha,
          'pending',
          {
            state: 'approved',
            approval_source: 'existing_current',
            receipt: receipt.raw
          }
        );
        return ok
          ? { state: 'approved', reason: null }
          : { state: 'gone', reason: null };
      }

      // Queue-owned proof for the move from the last reviewed head (the
      // current receipt's sha, else the head the click itself pinned).
      const prior_head =
        receipt_head ?? authority.requested_head_sha.toLowerCase();
      if (journal.state === 'pending' && head_sha !== prior_head) {
        const lin = await deps.lineage(subject_bead_id, {
          prior_head_sha: prior_head,
          head_sha,
          target_base: authority.target_base,
          head_ref: observed.head_ref ?? null,
          mutation: observed.mutation ?? null
        });
        if (!lin.queue_owned) {
          return failJournal(
            queue_bead_id,
            authority.id,
            head_sha,
            'pending',
            lin.reason || 'external_head_drift'
          );
        }
      }
    }

    if (journal === null) {
      return { state: 'gone', reason: null };
    }
    const attempt_id = reviewAttemptId(authority.id, head_sha);

    if (journal.state === 'pending') {
      if (
        !transition(queue_bead_id, authority.id, head_sha, 'pending', {
          state: 'reviewing',
          review_attempt_id: attempt_id
        })
      ) {
        return { state: 'gone', reason: null };
      }
      journal = /** @type {HeadReview} */ (
        queuedEntry(queue_bead_id)?.head_review ?? null
      );
      if (!journal) {
        return { state: 'gone', reason: null };
      }
    }

    if (journal.state === 'reviewing') {
      if (journal.review_attempt_id !== attempt_id) {
        return failJournal(
          queue_bead_id,
          authority.id,
          head_sha,
          'reviewing',
          'review_attempt_mismatch'
        );
      }
      const result = await deps.runReview({
        workspace,
        bead_id: subject_bead_id,
        authority_id: authority.id,
        attempt_id,
        head_sha,
        target_base: authority.target_base,
        reviewer: journal.reviewer,
        effort: journal.effort
      });
      // Anything the review reported is late unless the exact journal slot is
      // still ours.
      const live = queuedEntry(queue_bead_id)?.head_review ?? null;
      if (
        !live ||
        live.authority_id !== authority.id ||
        live.head_sha !== head_sha ||
        live.state !== 'reviewing'
      ) {
        return { state: 'gone', reason: null };
      }
      if (!result.ok) {
        return failJournal(
          queue_bead_id,
          authority.id,
          head_sha,
          'reviewing',
          result.reason || 'review_failed'
        );
      }
      if (result.verdict === 'APPROVE') {
        return approveExternal(
          queue_bead_id,
          subject_bead_id,
          authority,
          journal,
          head_sha
        );
      }
      if (result.verdict !== 'REVISE') {
        return failJournal(
          queue_bead_id,
          authority.id,
          head_sha,
          'reviewing',
          'review_verdict_malformed'
        );
      }
      if (journal.repair_rounds >= 1) {
        return failJournal(
          queue_bead_id,
          authority.id,
          head_sha,
          'reviewing',
          'repair_budget_exhausted'
        );
      }
      const digest = findingsDigest(result.findings ?? []);
      if (
        !transition(queue_bead_id, authority.id, head_sha, 'reviewing', {
          state: 'revising',
          findings_digest: digest,
          repair_attempt_id: repairAttemptId(authority.id, head_sha),
          repair_rounds: 1
        })
      ) {
        return { state: 'gone', reason: null };
      }
      journal = /** @type {HeadReview} */ (
        queuedEntry(queue_bead_id)?.head_review ?? null
      );
      if (!journal) {
        return { state: 'gone', reason: null };
      }
      return runBoundedRepair(
        queue_bead_id,
        subject_bead_id,
        authority,
        journal,
        head_sha,
        result.findings ?? []
      );
    }

    if (journal.state === 'revising') {
      // Restart adoption of a prerecorded repair. The findings payload is not
      // durable — only its digest is — so the adopted repair attempt is keyed
      // by the recorded id and the transport owns its own resume.
      return runBoundedRepair(
        queue_bead_id,
        subject_bead_id,
        authority,
        journal,
        head_sha,
        null
      );
    }

    return { state: 'halted', reason: 'head_review_state_unknown' };
  }

  /**
   * APPROVE settlement: receipt write + readback + no-drift proof, then the
   * one CAS that makes it durable.
   *
   * @param {string} queue_bead_id
   * @param {string} subject_bead_id
   * @param {{ id: string, target_base: string }} authority
   * @param {HeadReview} journal
   * @param {string} head_sha
   * @returns {Promise<EnsureApprovedResult>}
   */
  async function approveExternal(
    queue_bead_id,
    subject_bead_id,
    authority,
    journal,
    head_sha
  ) {
    const receipt = `${journal.reviewer}@${head_sha}`;
    /** @type {{ ok: boolean, readback: string|null, reason?: string }} */
    let written = { ok: false, readback: null };
    try {
      written = await deps.writeReceipt(subject_bead_id, receipt);
    } catch (err) {
      log('head-review receipt write threw for %s: %o', subject_bead_id, err);
    }
    if (!written.ok || written.readback !== receipt) {
      return failJournal(
        queue_bead_id,
        authority.id,
        head_sha,
        'reviewing',
        'receipt_readback_mismatch'
      );
    }
    /** @type {string|null} */
    let post_head = null;
    try {
      post_head = await deps.observeHead(subject_bead_id);
    } catch (err) {
      log('head-review post-write observation threw: %o', err);
    }
    if (typeof post_head !== 'string' || post_head.toLowerCase() !== head_sha) {
      return failJournal(
        queue_bead_id,
        authority.id,
        head_sha,
        'reviewing',
        'head_drift_during_receipt'
      );
    }
    const ok = transition(queue_bead_id, authority.id, head_sha, 'reviewing', {
      state: 'approved',
      approval_source: 'external_review',
      receipt
    });
    return ok
      ? { state: 'approved', reason: null }
      : { state: 'gone', reason: null };
  }

  /**
   * The single bounded repair round (§4). The repair-controller transport owns
   * apply→validate→push→self-review→receipt; this machine independently
   * verifies head change, queue-owned lineage, and receipt readback before the
   * approving CAS — a repair session's own "done" is never evidence.
   *
   * @param {string} queue_bead_id
   * @param {string} subject_bead_id
   * @param {{ id: string, target_base: string }} authority
   * @param {HeadReview} journal
   * @param {string} head_sha - The reviewed head the findings bind to.
   * @param {unknown[]|null} findings - Fresh findings, or null on restart
   * adoption (the transport resumes from its own durable record).
   * @returns {Promise<EnsureApprovedResult>}
   */
  async function runBoundedRepair(
    queue_bead_id,
    subject_bead_id,
    authority,
    journal,
    head_sha,
    findings
  ) {
    /** @type {{ ok: boolean, head_sha?: string, self_review?: string, reason?: string }} */
    let repaired = { ok: false, reason: 'repair_failed' };
    try {
      repaired = await deps.runRepair({
        workspace,
        bead_id: subject_bead_id,
        authority_id: authority.id,
        attempt_id: journal.repair_attempt_id,
        reviewed_head_sha: head_sha,
        target_base: authority.target_base,
        findings,
        findings_digest: journal.findings_digest
      });
    } catch (err) {
      log('head-review repair threw for %s: %o', subject_bead_id, err);
    }
    const live = queuedEntry(queue_bead_id)?.head_review ?? null;
    if (
      !live ||
      live.authority_id !== authority.id ||
      live.head_sha !== head_sha ||
      live.state !== 'revising'
    ) {
      return { state: 'gone', reason: null };
    }
    if (!repaired.ok) {
      return failJournal(
        queue_bead_id,
        authority.id,
        head_sha,
        'revising',
        repaired.reason || 'repair_failed'
      );
    }
    const new_head =
      typeof repaired.head_sha === 'string' && SHA40_RE.test(repaired.head_sha)
        ? repaired.head_sha.toLowerCase()
        : null;
    if (new_head === null || new_head === head_sha) {
      return failJournal(
        queue_bead_id,
        authority.id,
        head_sha,
        'revising',
        'repair_head_unchanged'
      );
    }
    if (repaired.self_review !== 'APPROVE') {
      // A repair session's plain completion is not evidence (§4): the
      // structured exact-delta self-review verdict must come back APPROVE.
      return failJournal(
        queue_bead_id,
        authority.id,
        head_sha,
        'revising',
        'repair_self_review_missing'
      );
    }
    const lin = await deps.lineage(subject_bead_id, {
      prior_head_sha: head_sha,
      head_sha: new_head,
      target_base: authority.target_base,
      head_ref: null,
      mutation: `repair:${journal.repair_attempt_id}`
    });
    if (!lin.queue_owned) {
      return failJournal(
        queue_bead_id,
        authority.id,
        head_sha,
        'revising',
        lin.reason || 'external_head_drift'
      );
    }
    const receipt = await deps.readReceipt(subject_bead_id);
    const expected = `self@${new_head}`;
    if (
      !receipt ||
      receipt.actor !== 'self' ||
      receipt.head_sha.toLowerCase() !== new_head ||
      receipt.raw !== expected
    ) {
      return failJournal(
        queue_bead_id,
        authority.id,
        head_sha,
        'revising',
        'repair_receipt_readback_mismatch'
      );
    }
    const ok = transition(queue_bead_id, authority.id, head_sha, 'revising', {
      state: 'approved',
      head_sha: new_head,
      approval_source: 'bounded_repair',
      receipt: expected
    });
    return ok
      ? { state: 'approved', reason: null }
      : { state: 'gone', reason: null };
  }

  return { ensureApproved };
}
