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
 *   journal-less `self@<head>` never approve, whatever SHA they carry. The
 *   UI-vkk8 §4 exception binds only a same-authority mutation whose separately
 *   recorded result SHA matches the re-probe exactly.
 *
 * @import { HeadReview } from './queue-store.js'
 */
import nodeCrypto from 'node:crypto';

const SHA40_RE = /^[0-9a-f]{40}$/i;
const ORDINARY_RECEIPT_RE = /^([A-Za-z0-9][A-Za-z0-9._-]*)@([0-9a-f]{40})$/i;
const CARRY_RECEIPT_RE =
  /^carry:([A-Za-z0-9][A-Za-z0-9._-]*):([0-9a-f]{40})@([0-9a-f]{40})$/i;
const RESOLVER_RECEIPT_RE =
  /^resolver-self:([A-Za-z0-9][A-Za-z0-9._-]*):([0-9a-f]{40})@([0-9a-f]{40})$/i;

/**
 * Parse the workflow contract's implementation-review receipt forms and
 * collapse derived forms to the reviewer identity behind them. `carry:` is
 * HISTORICAL-READ only (UI-vzyh §2): the contract retired the format, so
 * nothing mints one any more, but a receipt written before the retirement is
 * still a real approval and must keep parsing. Reserved prefixes never fall
 * through to the ordinary grammar, so a malformed or nested derived receipt
 * fails closed (UI-vkk8 §4).
 *
 * @param {unknown} raw
 * @returns {{ actor: string, head_sha: string, raw: string }|null}
 */
export function parseReviewReceipt(raw) {
  if (typeof raw !== 'string') {
    return null;
  }
  const carry = CARRY_RECEIPT_RE.exec(raw);
  if (carry) {
    return { actor: carry[1], head_sha: carry[3].toLowerCase(), raw };
  }
  const resolver = RESOLVER_RECEIPT_RE.exec(raw);
  if (resolver) {
    return { actor: 'self', head_sha: resolver[3].toLowerCase(), raw };
  }
  if (raw.startsWith('carry:') || raw.startsWith('resolver-self:')) {
    return null;
  }
  const ordinary = ORDINARY_RECEIPT_RE.exec(raw);
  if (!ordinary) {
    return null;
  }
  return {
    actor: ordinary[1],
    head_sha: ordinary[2].toLowerCase(),
    raw
  };
}

/**
 * The journal placeholder for a reviewer that has not been resolved yet
 * (UI-hk74 §6). Two journals carry it: the one an AUTOMATIC enrolment
 * prerecords in the same revision as the `reviewing` phase — the ladder is a
 * bd read and that revision must not depend on one — and the one a failed
 * selection opens only to record its own failure.
 *
 * It is deliberately not a runnable reviewer name: nothing may dispatch on it,
 * and {@link createHeadReview} resolves the ladder into the journal before any
 * attempt is minted.
 */
export const UNRESOLVED_REVIEWER = 'unresolved';
export const UNRESOLVED_REVIEW_EFFORT = 'unresolved';

/**
 * Whether the head an AUTOMATIC dispatch just observed still is the head the
 * enrolment bound its authority to (UI-hk74 §6.1).
 *
 * The automatic lane has no vouched queue-owned mutation to offer, so a head
 * that moved between enrolment and dispatch cannot be reviewed under this
 * journal: `ensureApproved` would supersede it and fail with a lineage reason
 * that describes the wrong thing. The caller stops instead, leaving the journal
 * `pending` so a [머지] click promotes this exact authority and the manual lane
 * re-drives it with real mutation evidence.
 *
 * A row with no authority at all cannot have drifted — there is nothing to
 * compare against, and the caller's own authority check owns that case.
 *
 * @param {{ requested_head_sha?: unknown }|null|undefined} authority
 * @param {string} head_sha
 */
export function autoReviewHeadDrifted(authority, head_sha) {
  if (!authority || typeof authority.requested_head_sha !== 'string') {
    return false;
  }
  return (
    authority.requested_head_sha.toLowerCase() !==
    String(head_sha).toLowerCase()
  );
}

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
 * @property {(bead_id: string) => Promise<{ ok: boolean, reviewer?: string|null, effort?: string|null, source?: 'bead'|'harness'|null, reason?: string }>} selectReviewer -
 * Resolve the background reviewer through the contract's manual-continuation
 * ladder. On `ok:false` the raw selected labels are still returned so the
 * failure journal names what was selected; `source` records WHICH rung
 * answered (UI-hk74 §6).
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
 * @property {import('./merge-gate.js').AncestryProbe} [probeAncestry] -
 * The shared receipt/head ancestry judgement (UI-vzyh §2). Absent is
 * fail-closed: the carry-forward below refuses and the caller reviews the
 * observed head.
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
   * Whether an AUTOMATIC authority is allowed to open/progress a journal
   * (UI-hk74 §6.2). Exactly one automatic case qualifies: the root the
   * completion coordinator enrolled into the automatic review lane, which is
   * durably visible as a `reviewing` intent whose resolution class is
   * `auto_review`. A row enrolled by the ordinary auto-merge enroller answers
   * false and keeps its pre-UI-hk74 behaviour of never opening a journal.
   *
   * @param {string} queue_bead_id
   */
  function autoReviewAuthorized(queue_bead_id) {
    try {
      const intent = /** @type {any} */ (deps.store.snapshot(workspace))
        .completion_intents?.[queue_bead_id];
      return (
        intent?.phase === 'reviewing' &&
        intent.auto_resolution?.class === 'auto_review'
      );
    } catch (err) {
      log(
        'auto-review authorization read failed for %s: %o',
        queue_bead_id,
        err
      );
      return false;
    }
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
   * @param {{ actor: string, head_sha: string, raw: string }|null} receipt
   * @param {string} head_sha
   */
  function validApproval(receipt, head_sha) {
    const parsed = receipt ? parseReviewReceipt(receipt.raw) : null;
    return (
      receipt !== null &&
      parsed !== null &&
      parsed.actor !== 'skipped' &&
      parsed.actor !== 'skip' &&
      receipt.actor === parsed.actor &&
      receipt.head_sha.toLowerCase() === parsed.head_sha &&
      parsed.head_sha === head_sha
    );
  }

  /**
   * Whether an approved receipt still covers the observed head (UI-vzyh §2).
   * Equality needs no git; anything the shared probe cannot prove an ancestor
   * is refused, which keeps this fail-closed when the probe is absent.
   *
   * @param {string} receipt_head_sha
   * @param {string} head_sha
   */
  async function coversHead(receipt_head_sha, head_sha) {
    if (receipt_head_sha === head_sha) {
      return true;
    }
    if (typeof deps.probeAncestry !== 'function') {
      return false;
    }
    try {
      const ancestry = await deps.probeAncestry(receipt_head_sha, head_sha);
      return ancestry === 'equal' || ancestry === 'ancestor';
    } catch (err) {
      log('head-review ancestry probe threw: %o', err);
      return false;
    }
  }

  /**
   * Snapshot the approval that exists when a manual queue item first enters
   * its authority-owned drain. The snapshot is deliberately caller-local: a
   * restart or later item entry cannot recreate grant-time evidence and must
   * fall back to external review (UI-vkk8 §4).
   *
   * @param {string} queue_bead_id
   * @param {string} subject_bead_id
   * @returns {Promise<{ actor: string, head_sha: string, raw: string }|null>}
   */
  async function captureStartingApproval(queue_bead_id, subject_bead_id) {
    const authority = queuedEntry(queue_bead_id)?.authority ?? null;
    if (!authority || authority.source !== 'manual') {
      return null;
    }
    const authority_id = authority.id;
    const requested_head_sha = authority.requested_head_sha.toLowerCase();
    const receipt = await deps.readReceipt(subject_bead_id);
    const current = queuedEntry(queue_bead_id)?.authority ?? null;
    if (
      !current ||
      current.id !== authority_id ||
      current.requested_head_sha.toLowerCase() !== requested_head_sha ||
      !validApproval(receipt, requested_head_sha)
    ) {
      return null;
    }
    return receipt;
  }

  /**
   * Open or adopt the pending journal slot used by a no-dispatch relaxation.
   * `reviewer` records the prior approval actor; it is not background reviewer
   * selection (UI-vkk8 §4).
   *
   * @param {string} queue_bead_id
   * @param {{ id: string }} authority
   * @param {string} head_sha
   * @param {string} reviewer
   * @returns {HeadReview|null}
   */
  function relaxedJournal(queue_bead_id, authority, head_sha, reviewer) {
    const current = queuedEntry(queue_bead_id)?.head_review ?? null;
    if (current && current.head_sha === head_sha) {
      return /** @type {HeadReview} */ (current);
    }
    deps.store.beginHeadReview(workspace, {
      bead_id: queue_bead_id,
      authority_id: authority.id,
      head_sha,
      reviewer,
      effort: UNRESOLVED_REVIEW_EFFORT
    });
    const opened = queuedEntry(queue_bead_id)?.head_review ?? null;
    return opened && opened.head_sha === head_sha
      ? /** @type {HeadReview} */ (opened)
      : null;
  }

  /**
   * Try the contract's same-authority no-dispatch paths (UI-vzyh §2). `null`
   * means no path applied, so the caller continues into external full-head
   * review — the fail-closed side, which is where every unprovable case lands.
   *
   * Two paths, and the resolver one takes precedence over ancestry:
   *
   * - `resolver:<attempt>`: the resolving session's exact-delta self-review is
   *   a MERGE PRECONDITION, so a resolver-produced head is deliberately NOT
   *   carried by ancestry. Its prior/result binding and `resolver-self:`
   *   readback are unchanged; without the bound result SHA it returns `null`
   *   and the observed head is reviewed, which is strictly stronger.
   * - anything else: the approval captured at authority grant is carried
   *   forward while the observed head DESCENDS from the head it was bound to.
   *   That is what makes a base-sync merge or a queue-owned base update pass
   *   with no dispatch, no session, and no receipt rewrite — the retired
   *   `carry:` stamp existed only to re-vouch for exactly this.
   *
   * @param {string} queue_bead_id
   * @param {string} subject_bead_id
   * @param {{ id: string, requested_head_sha: string, target_base: string }} authority
   * @param {string} head_sha
   * @param {{ head_ref?: string|null, mutation?: string|null, mutation_result_sha?: string|null, starting_approval?: { actor: string, head_sha: string, raw: string }|null }} observed
   * @returns {Promise<EnsureApprovedResult|null>}
   */
  async function relaxQueueMutation(
    queue_bead_id,
    subject_bead_id,
    authority,
    head_sha,
    observed
  ) {
    const prior_head_sha = authority.requested_head_sha.toLowerCase();
    const mutation =
      typeof observed.mutation === 'string' ? observed.mutation : null;
    const result_head_sha =
      typeof observed.mutation_result_sha === 'string' &&
      SHA40_RE.test(observed.mutation_result_sha)
        ? observed.mutation_result_sha.toLowerCase()
        : null;
    const resolver_attempt = mutation?.startsWith('resolver:')
      ? mutation.slice('resolver:'.length)
      : null;
    if (head_sha === prior_head_sha) {
      return null;
    }
    const starting_approval = observed.starting_approval ?? null;
    if (!validApproval(starting_approval, prior_head_sha)) {
      return null;
    }
    const reviewer =
      /** @type {NonNullable<ReturnType<typeof parseReviewReceipt>>} */ (
        parseReviewReceipt(starting_approval?.raw)
      ).actor;

    if (resolver_attempt) {
      if (result_head_sha === null || head_sha !== result_head_sha) {
        return null;
      }
      const receipt = await deps.readReceipt(subject_bead_id);
      const resolver_receipt = `resolver-self:${resolver_attempt}:${prior_head_sha}@${result_head_sha}`;
      const lin = await deps.lineage(subject_bead_id, {
        prior_head_sha,
        head_sha,
        target_base: authority.target_base,
        head_ref: observed.head_ref ?? null,
        mutation
      });
      if (!lin.queue_owned) {
        return null;
      }
      const journal = relaxedJournal(
        queue_bead_id,
        authority,
        head_sha,
        reviewer
      );
      if (!journal || journal.state !== 'pending') {
        return { state: 'gone', reason: null };
      }
      if (receipt?.raw !== resolver_receipt) {
        return failJournal(
          queue_bead_id,
          authority.id,
          head_sha,
          'pending',
          'resolver_self_review_not_approved'
        );
      }
      const post_head = await deps.observeHead(subject_bead_id);
      if (
        typeof post_head !== 'string' ||
        post_head.toLowerCase() !== result_head_sha
      ) {
        return failJournal(
          queue_bead_id,
          authority.id,
          head_sha,
          'pending',
          'head_drift_during_receipt'
        );
      }
      const ok = transition(queue_bead_id, authority.id, head_sha, 'pending', {
        state: 'approved',
        approval_source: 'existing_current',
        receipt: resolver_receipt
      });
      return ok
        ? { state: 'approved', reason: null }
        : { state: 'gone', reason: null };
    }

    if (!(await coversHead(prior_head_sha, head_sha))) {
      return null;
    }
    const journal = relaxedJournal(
      queue_bead_id,
      authority,
      head_sha,
      reviewer
    );
    if (!journal || journal.state !== 'pending') {
      return { state: 'gone', reason: null };
    }
    // The snapshot alone is not authority: the receipt must STILL read back as
    // the exact value that was captured, so a rewrite after the grant cannot
    // ride the snapshot into a merge.
    const receipt = await deps.readReceipt(subject_bead_id);
    if (
      !validApproval(receipt, prior_head_sha) ||
      receipt?.raw !== starting_approval?.raw
    ) {
      return failJournal(
        queue_bead_id,
        authority.id,
        head_sha,
        'pending',
        'receipt_readback_mismatch'
      );
    }
    const ok = transition(queue_bead_id, authority.id, head_sha, 'pending', {
      state: 'approved',
      approval_source: 'existing_current',
      receipt: /** @type {{ raw: string }} */ (receipt).raw
    });
    return ok
      ? { state: 'approved', reason: null }
      : { state: 'gone', reason: null };
  }

  /**
   * Drive one manual-authority queue item's head-review journal to `approved`
   * or a terminal disposition for the CURRENT observed head.
   *
   * @param {string} queue_bead_id
   * @param {string} subject_bead_id
   * @param {{ head_sha: string, base_ref: string|null, head_ref?: string|null, mutation?: string|null, mutation_result_sha?: string|null, starting_approval?: { actor: string, head_sha: string, raw: string }|null }} observed - The
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
    if (!authority) {
      return { state: 'halted', reason: 'no_manual_authority' };
    }
    if (authority.source !== 'manual' && !autoReviewAuthorized(queue_bead_id)) {
      // Every OTHER automatic authority keeps its pre-UI-hk74 behaviour: the
      // enroller queues rows it does not review, and opening a journal for one
      // of those would dispatch a reviewer nobody asked for (§6.2).
      return { state: 'halted', reason: 'no_manual_authority' };
    }
    const origin = authority.source === 'manual' ? 'click' : 'auto';
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
        // The receipt's own head is where it is bound; the observed head only
        // has to DESCEND from it, because a carried approval (UI-vzyh §2) is
        // recorded at the head it was granted on, not at the moved one.
        const current = await deps.readReceipt(subject_bead_id);
        const current_head = current ? current.head_sha.toLowerCase() : null;
        if (
          current === null ||
          current_head === null ||
          current.raw !== journal.receipt ||
          !validApproval(current, current_head) ||
          !(await coversHead(current_head, head_sha))
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

    const relaxed = await relaxQueueMutation(
      queue_bead_id,
      subject_bead_id,
      authority,
      head_sha,
      observed
    );
    if (relaxed !== null) {
      return relaxed;
    }

    /**
     * @type {Promise<{ ok: boolean, reason: string|null, reviewer: string, effort: string, reviewer_source: 'bead'|'harness'|null }>|null}
     */
    let selection_promise = null;
    /**
     * Background reviewer selection (§3), read at most once per call and ONLY
     * where a reviewer could actually be dispatched.
     *
     * The no-dispatch approvals ask a reviewer for nothing: they record the
     * actor of a receipt that is already current (§2, UI-vkk8 §4). Resolving
     * the ladder for them spent a Bead read on every ordinary merge — and an
     * `impl_review_model=self|skip` record failed the journal on a path where
     * no reviewer would ever have been asked to honour it, refusing a merge
     * that needed no review at all.
     */
    function resolveSelection() {
      if (selection_promise === null) {
        selection_promise = deps
          .selectReviewer(subject_bead_id)
          .then((selected) => ({
            ok: selected.ok,
            reason:
              typeof selected.reason === 'string' ? selected.reason : null,
            reviewer:
              typeof selected.reviewer === 'string' &&
              selected.reviewer.length > 0
                ? selected.reviewer
                : UNRESOLVED_REVIEWER,
            effort:
              typeof selected.effort === 'string' && selected.effort.length > 0
                ? selected.effort
                : UNRESOLVED_REVIEW_EFFORT,
            reviewer_source: /** @type {'bead'|'harness'|null} */ (
              selected.source === 'bead' || selected.source === 'harness'
                ? selected.source
                : null
            )
          }));
      }
      return selection_promise;
    }

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
      const parsed_receipt = receipt ? parseReviewReceipt(receipt.raw) : null;
      const receipt_head =
        receipt &&
        parsed_receipt &&
        receipt.actor === parsed_receipt.actor &&
        receipt.head_sha.toLowerCase() === parsed_receipt.head_sha
          ? parsed_receipt.head_sha
          : null;

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
      //
      // It is decided BEFORE any journal exists, and settles in one persist:
      // nothing here dispatches, so the `pending` slot this used to pass
      // through carried no attempt, cost a second persist and fanout, and told
      // every watching row that a review was pending when none would run. The
      // reviewer recorded is the receipt's own actor, exactly as the other
      // no-dispatch approvals do (UI-vkk8 §4) — there is no selection ladder
      // to consult for a review nobody performs.
      const enqueue_binding =
        head_sha === authority.requested_head_sha &&
        receipt !== null &&
        validApproval(receipt, head_sha);
      if (enqueue_binding) {
        const bound = /** @type {{ actor: string, raw: string }} */ (receipt);
        if (
          deps.store.openApprovedHeadReview(workspace, {
            bead_id: queue_bead_id,
            authority_id: authority.id,
            head_sha,
            reviewer: bound.actor,
            effort: UNRESOLVED_REVIEW_EFFORT,
            approval_source: 'existing_current',
            receipt: bound.raw
          }).ok
        ) {
          return { state: 'approved', reason: null };
        }
        // A same-head journal appeared under us; adopt it below rather than
        // overwriting a slot another pass owns.
      }

      const selection = await resolveSelection();
      if (
        !deps.store.beginHeadReview(workspace, {
          bead_id: queue_bead_id,
          authority_id: authority.id,
          head_sha,
          reviewer: selection.reviewer,
          effort: selection.effort,
          reviewer_source: selection.reviewer_source
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

      // The adopted-journal case of the binding above: the slot is not ours to
      // open, but the receipt is just as current, so it still approves without
      // a reviewer — and therefore before the selection ladder can refuse it.
      if (enqueue_binding && journal.state === 'pending') {
        const bound = /** @type {{ raw: string }} */ (receipt);
        const ok = transition(
          queue_bead_id,
          authority.id,
          head_sha,
          'pending',
          {
            state: 'approved',
            approval_source: 'existing_current',
            receipt: bound.raw
          }
        );
        return ok
          ? { state: 'approved', reason: null }
          : { state: 'gone', reason: null };
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
      // A journal this call did not open — the one an automatic enrolment
      // prerecorded (§6.2) — reaches the dispatch step carrying the
      // placeholder reviewer. The ladder is read HERE, in the same function
      // the click goes through, so a `self`/`skip` or an unreadable record
      // fails closed for both origins and the journal names who was chosen.
      const selection = await resolveSelection();
      if (!selection.ok) {
        return failJournal(
          queue_bead_id,
          authority.id,
          head_sha,
          'pending',
          selection.reason || 'reviewer_selection_invalid'
        );
      }
      if (
        !transition(queue_bead_id, authority.id, head_sha, 'pending', {
          state: 'reviewing',
          reviewer: selection.reviewer,
          effort: selection.effort,
          reviewer_source: selection.reviewer_source,
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
        effort: journal.effort,
        reviewer_source: journal.reviewer_source ?? null,
        origin
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
        result.findings ?? [],
        origin
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
        null,
        origin
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
   * @param {'click'|'auto'} origin - Which authority asked for this round,
   * recorded on the attempt (UI-hk74 §7).
   * @returns {Promise<EnsureApprovedResult>}
   */
  async function runBoundedRepair(
    queue_bead_id,
    subject_bead_id,
    authority,
    journal,
    head_sha,
    findings,
    origin
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
        findings_digest: journal.findings_digest,
        reviewer_source: journal.reviewer_source ?? null,
        origin
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

  return { captureStartingApproval, ensureApproved };
}
