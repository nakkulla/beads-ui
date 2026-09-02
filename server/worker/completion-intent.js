/**
 * Durable completion-intent coordinator kernel.
 *
 * This module decides the next owner/action from durable state. It does not
 * spawn sessions, create Beads, merge PRs, or run cleanup. Those effects stay
 * behind injected owners and must prerecord their operation in queue-store
 * before executing.
 */
import { createHash } from 'node:crypto';
import path from 'node:path';
// The one shared cause vocabulary (UI-8w4t §4): a dependency-free leaf both
// this comment and the client card read, so one failure never gets two
// sentences. `attach.js` already imports `app/utils` the same way.
import { FAILURE_SENTENCES } from '../../app/utils/failure-sentences.js';
import { scriptSummary } from './failure-class.js';
import { commentHeading, logRow, summaryRow } from './failure-comment.js';
import { RESOLUTION_ROUND_CAP, RESOLUTION_WAIT_MS } from './merge-queue.js';
import {
  COMPLETION_AUTO_RESOLUTION_PHASE,
  COMPLETION_RETRY_MAX
} from './queue-store.js';
import { isCleanupResolutionFailure } from './resolution-ladder.js';

const OUTPUT_TAIL_MAX = 4_000;
const REASON_MAX = 500;
const LOG_SUFFIX = '.log';
const CONFLICT_RESOLUTION_FAILURES = new Set([
  'resolution_wait_invalid',
  'resolution_attempt_missing',
  'resolution_lineage_ambiguous',
  'resolution_subject_mismatch',
  'resolution_attempt_not_conflict',
  'resolution_attempt_status_invalid',
  'resolution_ready_lineage_active'
]);

/**
 * The only five causes a completion saga is allowed to stop a human with
 * (UI-5ym8 §7). The kernel used to name 25 terminal tokens, none of which ever
 * fired, and roughly ten of which said the same thing — "a durable write did
 * not land" — in ten different words. A surface cannot build a sentence, a hold
 * decision, or an operator habit on a vocabulary that wide, so every raw cause
 * folds into one of these and carries its original token as detail.
 *
 * @type {readonly string[]}
 */
export const NEEDS_HUMAN_FAMILIES = Object.freeze([
  'verify_red',
  'cleanup_failed',
  'retry_exhausted',
  'conflict_unresolved',
  'internal_record_failed'
]);

/**
 * Post-merge cleanup causes that used to be their own terminal token. Each one
 * answers "why did cleanup stop", not "which lane stopped", so they become the
 * detail of `cleanup_failed` rather than siblings of it.
 *
 * @type {Set<string>}
 */
const CLEANUP_FAILURE_TOKENS = new Set([
  'cleanup_incomplete',
  'cleanup_journal_conflict',
  'cleanup_completion_unrecorded',
  'cleanup_replay_unavailable'
]);

/**
 * The two retired-lane residues (UI-d7fy §3.5, UI-8w4t §2). Nothing running
 * produces them any more, but a saga persisted before those upgrades can still
 * name one, so the fold keeps a `migration:` infix: a record read later has to
 * say it stopped because its owner was removed, not because a write failed.
 *
 * @type {Set<string>}
 */
const RETIRED_LANE_TOKENS = new Set([
  'auto_review_retired',
  'repair_lane_retired'
]);

/**
 * Fold one raw terminal cause into its §7 family.
 *
 * Pure and IDEMPOTENT by design: a reason already in a family is returned
 * unchanged, which is what lets the fold sit at the producer (`decide*`) and
 * again at the persistence boundary (`terminalize`) without building
 * `cleanup_failed:cleanup_failed:...` on the second pass.
 *
 * The residual default is `internal_record_failed` and that is deliberate: the
 * tokens that fall through are the ones a durable write or a state check
 * produced, and folding them anywhere else would claim knowledge about the
 * merge, the cleanup, or the conflict that the failure never had.
 *
 * @param {unknown} raw
 * @returns {string}
 */
export function foldNeedsHumanReason(raw) {
  const text = typeof raw === 'string' ? raw.trim() : '';
  if (text.length === 0) {
    return 'internal_record_failed:reason_missing';
  }
  if (NEEDS_HUMAN_FAMILIES.includes(text.split(':', 1)[0])) {
    return text;
  }
  if (CLEANUP_FAILURE_TOKENS.has(text)) {
    return `cleanup_failed:${text}`;
  }
  // Membership, NOT a `resolution_` prefix. `resolution_timeout` shares the
  // prefix but is not a conflict verdict at all — it is the retired time-only
  // terminal that `adoptLegacyTimeout` still matches EXACTLY to decide whether
  // an old saga may resume. A prefix rule would rename that key and silently
  // strand every record it is the only handle for.
  if (
    CONFLICT_RESOLUTION_FAILURES.has(text) ||
    text === 'resolution_round_cap'
  ) {
    return `conflict_unresolved:${text}`;
  }
  if (RETIRED_LANE_TOKENS.has(text)) {
    return `internal_record_failed:migration:${text}`;
  }
  return `internal_record_failed:${text}`;
}

/**
 * The cold-load read of a terminal cause persisted before UI-5ym8 §7.
 *
 * Only the two retired-lane residues are rewritten, and that is the whole
 * migration the spec asks for: they are the only stored causes with no owner
 * left, and §1 counted ZERO real occurrences of the other 23 tokens. Folding
 * every stored cause instead would rename live durable keys — `resolution_
 * timeout` is matched exactly by `adoptLegacyTimeout` and by the store's own
 * resume guard — so a migration that "just normalizes everything" would strand
 * exactly the sagas it was meant to carry forward.
 *
 * @param {unknown} raw
 * @returns {string} The raw cause unchanged, unless it is a retired-lane
 * residue.
 */
export function migrateStoredNeedsHumanReason(raw) {
  return typeof raw === 'string' && RETIRED_LANE_TOKENS.has(raw)
    ? foldNeedsHumanReason(raw)
    : /** @type {string} */ (raw);
}

/**
 * Which queue hold — if any — a folded `needs_human` cause earns (UI-5ym8 §7).
 *
 * `verify_red` and `cleanup_failed` are the two that recur on the NEXT bead:
 * post-merge verification and post-merge cleanup run against the shared base
 * and the shared deploy worktree, so a red one stays red until a human acts.
 * The other three are bounded to the saga that produced them and must not stop
 * the queue.
 *
 * @param {unknown} reason
 * @returns {'systemic'|null}
 */
export function needsHumanHoldKind(reason) {
  const family = foldNeedsHumanReason(reason).split(':', 1)[0];
  return family === 'verify_red' || family === 'cleanup_failed'
    ? 'systemic'
    : null;
}

/**
 * Build the stable identity of one failure observed at pinned subject/base
 * SHAs. The digest input is bounded and normalized so line endings cannot
 * manufacture distinct completion operations for the same result.
 *
 * @param {{
 *   stage: string,
 *   reason: string,
 *   subject_sha: string,
 *   base_sha: string,
 *   evidence?: { output_tail?: unknown }
 * }} input
 */
export function createCompletionFailureKey(input) {
  const evidence = input.evidence || {};
  const output_tail =
    typeof evidence.output_tail === 'string'
      ? evidence.output_tail.replace(/\r\n?/g, '\n').slice(-OUTPUT_TAIL_MAX)
      : '';
  const normalized = JSON.stringify({
    reason: String(input.reason || '').slice(0, REASON_MAX),
    output_tail
  });
  return {
    stage: input.stage,
    reason: input.reason,
    subject_sha: input.subject_sha,
    base_sha: input.base_sha,
    result_digest: createHash('sha256').update(normalized).digest('hex')
  };
}

/**
 * How long a failed operation waits before each delayed re-run (UI-hk74 §3).
 * The ladder widens because the failures it covers are environmental: a second
 * immediate attempt would land in the same broken minute the first one did.
 *
 * @type {number[]}
 */
export const COMPLETION_RETRY_DELAYS_MS = [60_000, 300_000, 900_000];

/**
 * The §3 policy table: which class of automatic resolution — if any — owns a
 * terminal reason. Matching is on the token before the first `:`, so a reason
 * that carries detail (`receipt_unbacked:unit_plan_mismatch`) classifies by its
 * family. Every `human` entry is listed explicitly even though it is also the
 * default: the table is the contract, and a reader must be able to see that
 * `reconciliation_ambiguous` is a deliberate human case rather than an
 * oversight that happened to fall through.
 *
 * All THREE review reasons are `metadata_watch` and NOT terminal (UI-d7fy
 * §3.3/§3.5). The automatic-review lane that used to own them is gone, and the
 * reason they are not simply `human` instead is that the exit really is a
 * metadata write: the `[리뷰 후 머지]` session writes an `impl_review` receipt
 * to the Bead, the bd issue-change trigger re-runs the gate on it, and the row
 * resumes. Ending the saga on `needs_human` would take that resume away for a
 * state that is a pre-merge hold, not a completion failure.
 *
 * `review_receipt_undetermined` is the same class for a stricter reason: it is
 * not a verdict at all but an ancestry probe that could not be taken, so the
 * next observation re-takes it. Hardening a saga to `needs_human` on a probe
 * error would make a transient `git` failure terminal.
 *
 * @type {Readonly<Record<string, 'metadata_watch'|'retry'|'human'>>}
 */
export const COMPLETION_FAILURE_POLICY = Object.freeze({
  receipt_unbacked: 'metadata_watch',
  spec_id_missing: 'metadata_watch',
  review_receipt_missing: 'metadata_watch',
  review_receipt_stale: 'metadata_watch',
  // A malformed receipt joins the other three (2026-08-28 auto-review-dispatch
  // spec §4 1번): the queue HOLDS on it now instead of refusing, and a hold
  // that terminalized as `needs_human` would take the row out of the very
  // judgment the automatic review lineage exists to re-run.
  review_receipt_invalid: 'metadata_watch',
  review_receipt_undetermined: 'metadata_watch',
  continuation_persist_failed: 'retry',
  cleanup_prerecord_failed: 'retry',
  cleanup_settlement_record_failed: 'retry',
  completion_gate_spawn_failed: 'retry',
  verify_cmd_failed: 'retry',
  reconciliation_ambiguous: 'human',
  resolution_lineage_ambiguous: 'human',
  cleanup_journal_conflict: 'human',
  cleanup_completion_unrecorded: 'human',
  intent_state_invalid: 'human'
});

/**
 * @typedef {'gate'|'verify'|'retry_cleanup'} CompletionRetryEffect
 */
/**
 * @typedef {Object} CompletionRetryPolicy
 * @property {string} return_phase - Where a confirmed success returns the saga.
 * @property {CompletionRetryEffect} effect - Which existing owner re-runs.
 * @property {string[]} inputs - Durable `auto_resolution.op` keys the re-run
 * reads. A key listed here and absent at re-run time is not fatal on its own —
 * the effect owner decides — but it is what the record exists to carry.
 * @property {string[]} optional_inputs
 * @property {string} success - The readback that ends the resolution.
 */
/**
 * The §3 second table: what each retryable reason actually re-runs, on which
 * durable inputs, and what counts as success. Kept as data because the
 * families differ in all three and a single "just try again" would declare
 * success on a spawn that never ran.
 *
 * @type {Readonly<Record<string, CompletionRetryPolicy>>}
 */
export const COMPLETION_RETRY_POLICY = Object.freeze({
  completion_gate_spawn_failed: {
    return_phase: 'gating',
    effect: 'gate',
    inputs: ['head_sha', 'base_sha'],
    optional_inputs: [],
    success: 'verify_operation_created'
  },
  verify_cmd_failed: {
    return_phase: 'gating',
    effect: 'verify',
    inputs: ['operation_id', 'head_sha', 'base_sha'],
    optional_inputs: [],
    success: 'verify_settled'
  },
  cleanup_prerecord_failed: {
    return_phase: 'cleaning',
    effect: 'retry_cleanup',
    inputs: ['merged_sha', 'cleanup_cursor'],
    optional_inputs: [],
    success: 'cleanup_step_recorded'
  },
  cleanup_settlement_record_failed: {
    return_phase: 'cleaning',
    effect: 'retry_cleanup',
    inputs: ['merged_sha', 'cleanup_cursor'],
    optional_inputs: [],
    success: 'cleanup_step_recorded'
  }
});

/**
 * @typedef {Object} CompletionFailureClass
 * @property {'metadata_watch'|'retry'|'human'} class
 * @property {string|null} phase - Non-terminal phase that owns the resolution.
 * @property {string} return_phase
 * @property {CompletionRetryPolicy|null} retry
 */
/**
 * Classify one terminal reason against the §3 tables. Anything the tables do
 * not name is `human` — the fail-closed default this Bead exists to make
 * narrower, not to remove.
 *
 * @param {unknown} reason
 * @returns {CompletionFailureClass}
 */
export function classifyCompletionFailure(reason) {
  const text = typeof reason === 'string' ? reason : '';
  const token = text.split(':', 1)[0];
  const resolution_class = Object.hasOwn(COMPLETION_FAILURE_POLICY, token)
    ? COMPLETION_FAILURE_POLICY[token]
    : 'human';
  if (resolution_class === 'human') {
    return { class: 'human', phase: null, return_phase: 'gating', retry: null };
  }
  const retry =
    resolution_class === 'retry' &&
    Object.hasOwn(COMPLETION_RETRY_POLICY, token)
      ? COMPLETION_RETRY_POLICY[token]
      : null;
  if (resolution_class === 'retry' && !retry) {
    return { class: 'human', phase: null, return_phase: 'gating', retry: null };
  }
  return {
    class: resolution_class,
    phase: COMPLETION_AUTO_RESOLUTION_PHASE[resolution_class],
    return_phase: retry ? retry.return_phase : 'gating',
    retry
  };
}

/**
 * @typedef {'green'|'conflict'|'verify_red'|'cleanup_repairable'|'cleanup_pending'|'completed'|'stale'|'undecidable'|'waiting'} CompletionFactState
 */
/**
 * @typedef {{ state: CompletionFactState, reason?: string }} CompletionFact
 */
/**
 * @typedef {CompletionFact & { gated?: any, source?: string, failure_key?: any, evidence?: any, op_id?: string|null }} ObservedCompletionFact
 */
/**
 * `terminal` marks a `needs_human` the KERNEL itself judged terminal (UI-8w4t
 * §1) rather than a refusal code handed up from the gate. Only the former
 * bypasses the §3 policy tables; a gate refusal still classifies, because
 * `receipt_unbacked`/`review_receipt_missing` are exactly how the surviving
 * metadata-watch and automatic-review lanes are entered.
 *
 * @typedef {{ kind: 'gate'|'enter_cleanup'|'resume_intent'|'merge_subject'|'retry_cleanup'|'reconcile_op'|'resume_metadata_check'|'retry_failed_op'|'pause'|'needs_human'|'complete', reason?: string, terminal?: boolean }} CompletionAction
 */

/**
 * The ONE constructor for a `needs_human` decision (UI-5ym8 §7).
 *
 * A `terminal` decision is the kernel's own judgment and stops the saga, so its
 * cause is folded here, at the point it is decided. A NON-terminal one is only
 * a proposal: `settleFailure` still offers it to the §3 policy tables, whose
 * keys are the RAW codes (`review_receipt_undetermined`, `verify_cmd_failed`,
 * …). Folding those at the producer would hide the key behind a family prefix
 * and turn every metadata watch and every retry into an immediate stop. What
 * survives the tables is folded by `terminalize`, which is where it actually
 * becomes a terminal.
 *
 * @param {string} reason
 * @param {boolean} [terminal]
 * @returns {CompletionAction}
 */
function needsHuman(reason, terminal = false) {
  return terminal
    ? {
        kind: 'needs_human',
        reason: foldNeedsHumanReason(reason),
        terminal: true
      }
    : { kind: 'needs_human', reason };
}

/**
 * Decide the next action for an intent parked in one of the three
 * auto-resolution phases (UI-hk74 §4).
 *
 * @param {any} intent
 * @param {number} now
 * @returns {CompletionAction|null}
 */
function decideAutoResolution(intent, now) {
  const resolution = intent.auto_resolution;
  if (
    !resolution ||
    !Object.hasOwn(COMPLETION_AUTO_RESOLUTION_PHASE, resolution.class) ||
    COMPLETION_AUTO_RESOLUTION_PHASE[
      /** @type {'metadata_watch'|'retry'} */ (resolution.class)
    ] !== intent.phase
  ) {
    return needsHuman('auto_resolution_invalid');
  }
  if (intent.phase === 'retrying') {
    // Waiting out a LIVE operation IS the first step of the retry, and deciding
    // it before the generic reconcile is what keeps the delay and the 3-attempt
    // cap on the path.
    //
    // "Live" is exactly "not the operation this record was opened on" (review
    // F1). `settleFailure` deliberately preserves the failing op, so treating
    // every `active_op` as live sent the retry straight back through the
    // generic reconcile — which RE-RUNS the failing effect (`retry_cleanup`
    // replays) immediately, before `next_at` and
    // without spending an attempt. That is the bypass the ordering was
    // supposed to close. The retried op is retired by the same write that
    // spends the budget, so anything found here afterwards is genuinely new.
    if (
      intent.active_op &&
      intent.active_op.op_id !== resolution.op.completion_op_id
    ) {
      return { kind: 'reconcile_op' };
    }
    if (resolution.attempts >= COMPLETION_RETRY_MAX) {
      return needsHuman(`retry_exhausted:${resolution.origin_reason}`);
    }
    if (typeof resolution.next_at === 'number' && now < resolution.next_at) {
      return null;
    }
    return { kind: 'retry_failed_op' };
  }
  if (intent.phase === 'waiting_metadata') {
    return { kind: 'resume_metadata_check' };
  }
  // `reviewing` is a RETIRED phase (UI-d7fy §3.5): nothing creates one any
  // more, and the lane that used to drive it — the automatic reviewer and its
  // bounded repair — is gone. A record still parked here survived the upgrade,
  // and there is no owner left to re-drive it, so it stops for a human with
  // the retirement as its cause rather than waiting on a dispatch that will
  // never come. This is a migration terminal, not a review verdict: a review
  // reason never terminalizes an intent this deploy created.
  return needsHuman('auto_review_retired', true);
}

/**
 * The cause a terminal `needs_human` records for an observed failure (UI-8w4t
 * §1). The order is what the RECORDS actually carry: a cleanup entry names its
 * contract token in `failure_code`, falls back to its own raw `reason`, and
 * only then to the reason the failure key was built from. Reading `failure.code`
 * — the RepoOperation card's field — would have found nothing on any of them.
 *
 * The winner is carried as the DETAIL of `cleanup_failed` (UI-5ym8 §7) instead
 * of standing alone: `verify_cmd_failed` observed here means "cleanup stopped
 * on a failed verify", and read bare it is indistinguishable from the gate's
 * own retryable `verify_cmd_failed`.
 *
 * @param {any} fact
 * @returns {string}
 */
function completionFailureReason(fact) {
  const evidence = fact?.evidence;
  const candidates = [
    evidence?.failure_code,
    evidence?.reason,
    fact?.failure_key?.reason
  ];
  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.length > 0) {
      return foldNeedsHumanReason(`cleanup_failed:${candidate}`);
    }
  }
  return 'cleanup_failed:unrecorded';
}

/**
 * Decide one next action from an already-normalized durable intent and one
 * authoritative fact. The function is pure so reconciliation and live paths
 * share the same judgment.
 *
 * @param {{ auto_merge: boolean, intent: any, fact?: ObservedCompletionFact|null, now?: number }} input
 * @returns {CompletionAction|null}
 */
export function decideCompletionAction(input) {
  const intent = input.intent;
  const fact = input.fact || { state: 'waiting' };
  if (!intent || typeof intent !== 'object') {
    return needsHuman('intent_state_invalid');
  }
  if (intent.phase === 'needs_human' || intent.phase === 'completed') {
    return null;
  }
  if (input.auto_merge !== true) {
    return intent.active_op || intent.phase === 'paused'
      ? null
      : { kind: 'pause' };
  }
  if (
    intent.phase === 'retrying' ||
    intent.phase === 'waiting_metadata' ||
    intent.phase === 'reviewing'
  ) {
    return decideAutoResolution(
      intent,
      typeof input.now === 'number' ? input.now : 0
    );
  }
  if (intent.active_op) {
    return { kind: 'reconcile_op' };
  }
  if (intent.phase === 'paused') {
    return { kind: 'resume_intent' };
  }
  if (fact.state === 'undecidable') {
    return needsHuman(fact.reason || 'ownership_undecidable');
  }
  if (fact.state === 'completed') {
    return { kind: 'complete' };
  }
  if (intent.phase === 'cleaning') {
    if (fact.state === 'cleanup_repairable') {
      // The one automatic step (`script_retry`) is already spent by the time a
      // cleanup failure reaches here, and the failure card already carries the
      // cause and the retry outcome. Waiting longer buys nothing, so the saga
      // stops with the cause a human can act on (UI-8w4t §1).
      return needsHuman(completionFailureReason(fact), true);
    }
    if (fact.state === 'cleanup_pending') {
      return { kind: 'retry_cleanup' };
    }
    return null;
  }
  if (intent.phase === 'merging') {
    return { kind: 'merge_subject' };
  }
  if (intent.phase !== 'gating') {
    return needsHuman('intent_state_invalid');
  }
  if (fact.state === 'cleanup_repairable' || fact.state === 'cleanup_pending') {
    return { kind: 'enter_cleanup' };
  }
  if (fact.state === 'green' || fact.state === 'conflict') {
    return { kind: 'merge_subject' };
  }
  if (fact.state === 'verify_red') {
    // Post-merge verification red is a code question, and code questions go
    // through an ordinary Bead/PR (UI-8w4t §1). No ownership probe, no
    // automatic session.
    return needsHuman('verify_red', true);
  }
  return { kind: 'gate' };
}

/**
 * Build a lifecycle wrapper that coalesces queue events and invokes injected
 * effect owners with a pure decision. One pass re-reads the full queue snapshot;
 * an event arriving mid-pass schedules exactly one additional pass.
 *
 * @param {{
 *   workspace: string,
 *   store: { snapshot: (workspace: string) => any },
 *   subscribeQueueChanged?: (fn: (workspace: string) => void) => (() => void),
 *   observe?: (root_bead_id: string, intent: any, queue: any) => Promise<CompletionFact>|CompletionFact,
 *   onAction?: (root_bead_id: string, action: CompletionAction, intent: any) => Promise<void>|void,
 *   adoptLegacy?: (root_bead_id: string, intent: any, queue: any) => Promise<boolean>|boolean,
 *   onAttemptSettled?: (input: any) => Promise<void>|void,
 *   now?: () => number,
 *   retryWakeMs?: number,
 *   log?: (...args: any[]) => void
 * }} deps
 */
export function createCompletionIntentCoordinator(deps) {
  const workspace = deps.workspace;
  const observe = deps.observe || (() => ({ state: 'waiting' }));
  const onAction = deps.onAction || (() => {});
  const adoptLegacy = deps.adoptLegacy || (() => false);
  const now = deps.now || (() => Date.now());
  const log = deps.log || (() => {});
  // A delayed retry is the one transition no queue event announces: its due
  // time passes in silence. One coarse timer covers every waiting row, which is
  // why the ladder's shortest step is a minute (UI-hk74 §5).
  const retry_wake_ms =
    typeof deps.retryWakeMs === 'number' ? deps.retryWakeMs : 60_000;
  let stopped = true;
  let pending = false;
  let running = false;
  /** @type {Promise<void>} */
  let current = Promise.resolve();
  /** @type {(() => void)|null} */
  let unsubscribe = null;
  /** @type {ReturnType<typeof setInterval>|null} */
  let retry_timer = null;

  /**
   * @returns {Promise<void>}
   */
  async function reconcile() {
    const queue = deps.store.snapshot(workspace);
    const intents =
      queue.completion_intents && typeof queue.completion_intents === 'object'
        ? queue.completion_intents
        : {};
    if (queue.auto_merge !== true) {
      for (const [root_bead_id, intent] of Object.entries(intents)) {
        const action = decideCompletionAction({
          auto_merge: false,
          intent,
          fact: { state: 'waiting' }
        });
        if (action) {
          await onAction(root_bead_id, action, intent);
        }
      }
      return;
    }
    for (const [root_bead_id, intent] of Object.entries(intents)) {
      if (
        intent?.phase === 'needs_human' &&
        (await adoptLegacy(root_bead_id, intent, queue))
      ) {
        return;
      }
    }
    const head = Array.isArray(queue.merge_queue)
      ? queue.merge_queue.find(
          (/** @type {any} */ entry) => entry?.resolution?.state !== 'yielded'
        )
      : null;
    const root_bead_id =
      head && typeof head.bead_id === 'string' ? head.bead_id : null;
    if (!root_bead_id || !Object.hasOwn(intents, root_bead_id)) {
      return;
    }
    const intent = intents[root_bead_id];
    // A row parked on metadata or a retry delay decides from its own durable
    // record alone, so observing it would spend a `gh` round trip on a fact the
    // judgment discards.
    const fact =
      intent?.phase === 'waiting_metadata' || intent?.phase === 'retrying'
        ? /** @type {CompletionFact} */ ({ state: 'waiting' })
        : await observe(root_bead_id, intent, queue);
    const action = decideCompletionAction({
      auto_merge: queue.auto_merge === true,
      intent,
      fact,
      now: now()
    });
    if (action) {
      await onAction(root_bead_id, action, intent);
    }
  }

  /**
   * Coalesce one or more wakeups onto a serial reconciliation loop.
   */
  function wake() {
    if (stopped) {
      return;
    }
    pending = true;
    if (running) {
      return;
    }
    running = true;
    current = Promise.resolve()
      .then(async () => {
        while (pending && !stopped) {
          pending = false;
          try {
            await reconcile();
          } catch (err) {
            log(
              'completion-intent reconcile failed for %s: %o',
              workspace,
              err
            );
          }
        }
      })
      .finally(() => {
        running = false;
      });
  }

  return {
    reconcile,
    wake,

    /**
     * Scheduler handoff after its ordinary attempt settlement is durable.
     * The optional consumer may validate the SHA/digest immediately; every
     * settlement also wakes a full reconciliation from persisted state.
     *
     * @param {any} input
     */
    async attemptSettled(input) {
      if (typeof deps.onAttemptSettled === 'function') {
        await deps.onAttemptSettled(input);
      }
      wake();
    },

    start() {
      stopped = false;
      if (
        unsubscribe === null &&
        typeof deps.subscribeQueueChanged === 'function'
      ) {
        unsubscribe = deps.subscribeQueueChanged((ws_key) => {
          if (ws_key === workspace) {
            wake();
          }
        });
      }
      if (retry_timer === null && retry_wake_ms > 0) {
        retry_timer = setInterval(() => {
          wake();
        }, retry_wake_ms);
        if (typeof retry_timer.unref === 'function') {
          retry_timer.unref();
        }
      }
      wake();
    },

    stop() {
      stopped = true;
      pending = false;
      if (retry_timer !== null) {
        clearInterval(retry_timer);
        retry_timer = null;
      }
      if (unsubscribe) {
        try {
          unsubscribe();
        } catch {
          // ignore
        }
        unsubscribe = null;
      }
    },

    /**
     * Test and shutdown seam: wait for the currently coalesced pass.
     */
    idle() {
      return current;
    }
  };
}

/**
 * The RepoOperation a preserved log belongs to. `repo-operation-runner` writes
 * exactly one log per operation at `repoOperationLogDir(workspace)/<id>.log`,
 * and that name is the only operation identity the verify observation and the
 * `cleanup_failed` record both carry — neither keeps the id in a field of its
 * own. A failure that stopped BEFORE any script ran has no log and therefore no
 * operation, which is the null this returns.
 *
 * @param {unknown} log_path
 * @returns {string|null}
 */
function operationIdFromLogPath(log_path) {
  if (typeof log_path !== 'string' || log_path.length === 0) {
    return null;
  }
  const name = path.basename(log_path);
  return name.length > LOG_SUFFIX.length && name.endsWith(LOG_SUFFIX)
    ? name.slice(0, -LOG_SUFFIX.length)
    : null;
}

/**
 * Internal stage token → the three public stage words the comment format fixes
 * (UI-8w4t §4). The internal tokens are coordinates of THIS server's saga
 * (`merge_gate`, the cleanup cursor steps); the comment is read by a person who
 * only needs to know which of the three things failed.
 *
 * `repo_operations` folds into `cleanup` because it IS a cleanup-cursor step
 * (AGENTS.md 정리 cursor); which repo operation ran inside it is what the 원인
 * line below says.
 *
 * A token in none of the three travels through RAW (`merge_subject`,
 * `coordinator`, `state`, and anything a later contract adds): losing the
 * coordinate is worse than stepping outside the format, and the raw token is
 * still greppable in this server's own records.
 *
 * @type {Readonly<Record<string, string>>}
 */
const PUBLIC_FAILURE_STAGES = Object.freeze({
  merge_gate: 'verify',
  post_merge_verify: 'verify',
  verify: 'verify',
  deploy: 'deploy',
  deployment_request: 'deploy',
  post_merge_cleanup: 'cleanup',
  base_containment: 'cleanup',
  base_sync: 'cleanup',
  repo_operations: 'cleanup',
  post_merge_jobs: 'cleanup',
  child_sweep: 'cleanup',
  branch_cleanup: 'cleanup',
  parent_close: 'cleanup',
  cleanup: 'cleanup'
});

/**
 * The public stage word for one terminal, or the raw token when it maps to none.
 *
 * @param {any} terminal
 * @returns {string}
 */
function publicFailureStage(terminal) {
  const token = terminal.failure_key?.stage || terminal.stage;
  return Object.hasOwn(PUBLIC_FAILURE_STAGES, token)
    ? PUBLIC_FAILURE_STAGES[token]
    : token;
}

/**
 * The 재시도 line of the failure comment: what the ONE automatic step
 * (`script_retry`) did for this operation, read from the durable record.
 *
 * @param {any} operation
 * @returns {string}
 */
function retryOutcomeText(operation) {
  const retry = operation?.retry;
  if (!retry || typeof retry !== 'object') {
    return '없음';
  }
  if (typeof retry.blocked_reason === 'string' && retry.blocked_reason) {
    return `자동 재시도 못 함 — ${retry.blocked_reason}`;
  }
  if (retry.outcome === 'absorbed') {
    return '자동 재시도로 해소됨';
  }
  if (retry.outcome === 'not_applicable') {
    return '재시도 대상 아님 — 스크립트 실행 전 실패';
  }
  return retry.outcome === 'consumed' ? '자동 재시도 1회' : '없음';
}

/**
 * The cause sentence for a folded terminal reason, matched the way the client
 * card matches (`app/views/worker/failure-labels.js failureSentence`): by colon
 * segment, LAST match wins. Exact-key lookup stopped being enough once every
 * cause carries a family prefix — `cleanup_failed:cleanup_journal_conflict`
 * would otherwise render no sentence at all, and the comment and the card would
 * disagree about the same record.
 *
 * @param {unknown} reason
 * @returns {string|null}
 */
function completionFailureSentence(reason) {
  if (typeof reason !== 'string') {
    return null;
  }
  /** @type {string|null} */
  let found = null;
  for (const segment of reason.split(':')) {
    if (segment.length > 0 && Object.hasOwn(FAILURE_SENTENCES, segment)) {
      found = FAILURE_SENTENCES[segment];
    }
  }
  return found;
}

/**
 * The one line a completion failure is summarized by (2026-08-28
 * worker-record-timeline spec §6 row 2). The evidence a `verify_red` or a
 * repairable cleanup carries is the verify/deploy run itself, so its
 * `output_tail` — the SAME tail {@link createCompletionFailureKey} digests — is
 * what says why the script failed.
 *
 * Extracted ONCE, here, so the hand-off comment quotes the same string the
 * record was settled on rather than re-deriving its own. Null when the failure
 * ran no command at all, which is fail-quiet: the comment then carries only the
 * cause sentence it already had.
 *
 * @param {unknown} evidence - The fact's own evidence object, when it has one.
 * @returns {string | null}
 */
export function completionFailureSummary(evidence) {
  if (evidence === null || typeof evidence !== 'object') {
    return null;
  }
  return scriptSummary(
    /** @type {{ output_tail?: unknown }} */ (evidence).output_tail
  );
}

/**
 * The failure hand-off comment (UI-8w4t §4). The log is POINTED at, never
 * inlined: a verify log is large and can carry secrets, and the path is what a
 * human opens anyway.
 *
 * @param {any} intent
 * @param {any} queue
 * @param {any} terminal
 * @param {string|null} [summary] - The failing script's own line (spec §6 row
 * 2), extracted once by the caller. Omitted from the comment when the failure
 * ran no command, so the reader is never shown an empty field.
 * @returns {string}
 */
export function completionFailureComment(
  intent,
  queue,
  terminal,
  summary = null
) {
  const sentence = completionFailureSentence(terminal.reason);
  const subject = intent?.subject || {};
  const target_sha =
    terminal.failure_key?.subject_sha ||
    subject.merged_sha ||
    subject.head_sha ||
    '(없음)';
  const target_base =
    intent?.target_base || terminal.failure_key?.base_sha || '(없음)';
  const operation =
    typeof terminal.op_id === 'string'
      ? queue?.repo_operations?.[terminal.op_id]
      : null;
  // 헤딩·요약·로그 세 행은 `failure-comment.js`가 소유한다
  // (record-timeline-retention §9): 세션 실패·파킹 댓글이 같은 형식을 써야
  // 하므로, 형식은 한 곳에 있고 이 함수는 완료 saga 고유의 행만 더한다.
  return [
    commentHeading('완료 실패 기록'),
    `- 단계: ${publicFailureStage(terminal)}`,
    `- 원인: ${terminal.reason}${sentence ? ` — ${sentence}` : ''}`,
    ...summaryRow(summary),
    `- 대상: ${target_sha} (base ${target_base})`,
    logRow(terminal.log_path),
    `- 재시도: ${retryOutcomeText(operation)}`,
    '- 다음: [머지] 재클릭 · 설정 카드 배포 실행 · 코드 수정은 새 Bead'
  ].join('\n');
}

/**
 * The stable identity of one completion operation. The retired repair round
 * survives ONLY as the `null` placeholder in the digest input: the surviving
 * kinds always passed `null`, so keeping the key keeps every operation id a
 * live intent already journaled equal to the one recomputed after this change.
 *
 * @param {string} root_bead_id
 * @param {string} kind
 * @param {any} failure_key
 */
function operationIdentity(root_bead_id, kind, failure_key) {
  const digest = createHash('sha256')
    .update(
      JSON.stringify({
        root_bead_id,
        kind,
        repair_round: null,
        stage: failure_key.stage,
        reason: failure_key.reason,
        subject_sha: failure_key.subject_sha,
        base_sha: failure_key.base_sha,
        result_digest: failure_key.result_digest
      })
    )
    .digest('hex')
    .slice(0, 24);
  return `completion-${digest}`;
}

/**
 * Live effect owner for the coordinator kernel. The kernel decides one action;
 * this adapter pins gate evidence, journals external effects, and returns every
 * merge/session result to the same durable root intent.
 *
 * @param {{
 *   workspace: string,
 *   store: any,
 *   prActions: { completionGate: (bead_id: string, role?: 'root') => Promise<any>, resumeCompletionCleanup?: (root_bead_id: string) => Promise<any> },
 *   bd?: { comment?: (bead_id: string, text: string) => Promise<unknown> },
 *   timeline?: { append: (input: any) => unknown },
 *   notifyChanged?: (workspace: string) => void,
 *   kickMerge?: () => Promise<unknown>|unknown,
 *   now?: () => number,
 *   log?: (...args: any[]) => void
 * }} deps
 */
export function createCompletionActionDriver(deps) {
  const facts = new Map();
  const now = deps.now || (() => Date.now());
  const log = deps.log || (() => {});

  /**
   * Put one completion-saga fact on the root bead's permanent history
   * (record-timeline-retention §5).
   *
   * The writer is the workspace's ONE instance, injected by `attach.js`; a
   * driver built without it — every existing unit test — records nothing and
   * behaves identically. The result is ignored, because the saga's next step
   * must never depend on whether its history line survived.
   *
   * @param {string} bead_id
   * @param {'merge_step'|'needs_human'} kind
   * @param {string|number} seq
   * @param {string} summary
   */
  function recordTimeline(bead_id, kind, seq, summary) {
    if (!deps.timeline || typeof bead_id !== 'string' || bead_id.length === 0) {
      return;
    }
    deps.timeline.append({ bead_id, kind, seq, summary });
  }
  /**
   * Serialized best-effort Bead comments. Terminalization is synchronous and
   * durable on its own; the chain only keeps two terminals from interleaving
   * their comments and gives shutdown and tests one thing to wait on.
   *
   * @type {Promise<void>}
   */
  let comment_chain = Promise.resolve();
  /**
   * Roots whose metadata re-check is running. The check is driven by bd issue
   * events and by every reconciliation pass, both of which can arrive while a
   * `gh`-backed gate is still in flight.
   *
   * @type {Set<string>}
   */
  const metadata_checks = new Set();
  /**
   * Roots a COORDINATOR PASS has already re-checked since this process started
   * (UI-hk74 §5). The re-observation trigger is the bd issue-change event; a
   * pass covers only the restart case, where an event may have been missed
   * while nothing was listening. Without this set every pass — and the retry
   * lane's 1-minute wake is enough to produce one a minute — would spend a
   * `gh`-backed completion gate on a row that is waiting for a human edit.
   *
   * A root leaves the set when it leaves `waiting_metadata`, so a later
   * re-entry gets its own single reconcile check.
   *
   * @type {Set<string>}
   */
  const metadata_pass_checked = new Set();

  function notify() {
    if (typeof deps.notifyChanged === 'function') {
      try {
        deps.notifyChanged(deps.workspace);
      } catch {
        // Durable state is authoritative even when fanout fails.
      }
    }
  }

  /**
   * @param {any} left
   * @param {any} right
   */
  function sameFailure(left, right) {
    return (
      left &&
      right &&
      left.stage === right.stage &&
      left.reason === right.reason &&
      left.subject_sha === right.subject_sha &&
      left.base_sha === right.base_sha &&
      left.result_digest === right.result_digest
    );
  }

  /**
   * @param {string} root_bead_id
   * @param {any} intent
   * @param {any} fact
   */
  function mergeFailureKey(root_bead_id, intent, fact) {
    const subject = fact?.gated?.subject || intent.subject;
    return createCompletionFailureKey({
      stage: 'merge_subject',
      reason: 'merge_ready',
      subject_sha: subject.head_sha,
      base_sha: subject.base_sha,
      evidence: { output_tail: root_bead_id }
    });
  }

  /**
   * Find the only live conflict-resolution leaf for a historical subject. A
   * fork anywhere on that leaf's resume chain is ambiguous even when only one
   * child remains running.
   *
   * @param {any} queue
   * @param {string} subject_bead_id
   * @returns {{ attempt_id: string|null, reason: string|null }}
   */
  function legacyResolutionLeaf(queue, subject_bead_id) {
    const attempts = Object.values(queue.attempts || {});
    const live = attempts.filter(
      (/** @type {any} */ attempt) =>
        attempt?.bead_id === subject_bead_id &&
        attempt.conflict_resolution === true &&
        (attempt.status === 'running' || attempt.status === 'paused') &&
        !attempts.some(
          (/** @type {any} */ child) =>
            child?.resumed_from === attempt.attempt_id
        )
    );
    if (live.length !== 1) {
      return { attempt_id: null, reason: 'resolution_lineage_ambiguous' };
    }
    let current = live[0];
    const visited = new Set();
    while (typeof current.resumed_from === 'string') {
      if (visited.has(current.attempt_id)) {
        return { attempt_id: null, reason: 'resolution_lineage_ambiguous' };
      }
      visited.add(current.attempt_id);
      const siblings = attempts.filter(
        (/** @type {any} */ attempt) =>
          attempt?.resumed_from === current.resumed_from
      );
      const parent = queue.attempts?.[current.resumed_from];
      if (
        siblings.length !== 1 ||
        !parent ||
        parent.bead_id !== subject_bead_id ||
        parent.conflict_resolution !== true
      ) {
        return { attempt_id: null, reason: 'resolution_lineage_ambiguous' };
      }
      current = parent;
    }
    return { attempt_id: current.attempt_id, reason: null };
  }

  /**
   * Strict one-time startup adoption for the retired time-only resolution
   * terminal. Current authoritative mergeability decides whether the old saga
   * can safely resume; a DIRTY PR receives no fresh budget without one exact
   * live resolver leaf.
   *
   * @param {string} root_bead_id
   * @param {any} intent
   * @param {any} queue
   * @returns {Promise<boolean>}
   */
  async function adoptLegacyTimeout(root_bead_id, intent, queue) {
    if (
      intent?.phase !== 'needs_human' ||
      intent.terminal_reason?.reason !== 'resolution_timeout' ||
      intent.terminal_reason.stage !== 'conflict_resolution'
    ) {
      return false;
    }
    const active_failure = intent.active_op?.failure_key;
    if (
      intent.active_op !== null &&
      (intent.active_op?.kind !== 'merge_subject' ||
        intent.active_op.attempt_id !== null ||
        intent.active_op.status === 'consumed' ||
        active_failure?.stage !== 'merge_subject' ||
        active_failure.subject_sha !== intent.subject.head_sha ||
        active_failure.base_sha !== intent.subject.base_sha ||
        intent.active_op.op_id !==
          operationIdentity(root_bead_id, 'merge_subject', active_failure))
    ) {
      return false;
    }
    let gated;
    try {
      gated = await deps.prActions.completionGate(
        intent.subject.bead_id,
        intent.subject.role
      );
    } catch {
      return false;
    }
    if (gated?.ok !== true) {
      return false;
    }
    const verdict = gated.verdict || {};
    const merged = typeof gated.subject?.merged_sha === 'string';
    const clean = verdict.enabled === true;
    const behind = verdict.base_badge === 'base 뒤처짐';
    const dirty = verdict.base_badge === '충돌';
    if (!merged && !clean && !behind && !dirty) {
      return false;
    }
    const failure_key = mergeFailureKey(root_bead_id, intent, { gated });
    const op = {
      op_id: operationIdentity(root_bead_id, 'merge_subject', failure_key),
      kind: 'merge_subject',
      failure_key,
      attempt_id: null,
      status: 'prepared'
    };
    let resolution_attempt_id = null;
    let resolution_rounds = 0;
    if (dirty) {
      const leaf = legacyResolutionLeaf(queue, intent.subject.bead_id);
      if (!leaf.attempt_id) {
        settleFailure(
          root_bead_id,
          leaf.reason || 'resolution_lineage_ambiguous',
          'conflict_resolution',
          failure_key,
          gated
        );
        return true;
      }
      resolution_attempt_id = leaf.attempt_id;
      resolution_rounds = Math.max(0, RESOLUTION_ROUND_CAP - 1);
    }
    if (typeof deps.store.adoptLegacyResolutionTimeout !== 'function') {
      return false;
    }
    const adopted = deps.store.adoptLegacyResolutionTimeout(deps.workspace, {
      root_bead_id,
      subject: gated.subject,
      op,
      resolution_attempt_id,
      resolution_rounds,
      wait_ms: RESOLUTION_WAIT_MS
    });
    if (!adopted.ok) {
      return false;
    }
    notify();
    return true;
  }

  /**
   * @param {string} root_bead_id
   * @param {any} fact
   */
  async function startCleanupReplay(root_bead_id, fact) {
    if (typeof deps.prActions.resumeCompletionCleanup !== 'function') {
      settleFailure(
        root_bead_id,
        'cleanup_replay_unavailable',
        'post_merge_cleanup',
        fact?.failure_key,
        fact?.evidence
      );
      return;
    }
    let current = deps.store.snapshot(deps.workspace).completion_intents?.[
      root_bead_id
    ];
    if (!current) {
      return;
    }
    const failure_key =
      fact?.failure_key ||
      createCompletionFailureKey({
        stage: 'post_merge_cleanup',
        reason: 'cleanup_incomplete',
        subject_sha: current.subject.merged_sha || current.subject.head_sha,
        base_sha: current.subject.base_sha,
        evidence: {}
      });
    if (current.active_op === null) {
      const op_id = operationIdentity(
        root_bead_id,
        'retry_cleanup',
        failure_key
      );
      const prepared = deps.store.prepareCompletionOp(deps.workspace, {
        root_bead_id,
        phase: 'cleaning',
        op: {
          op_id,
          kind: 'retry_cleanup',
          failure_key,
          attempt_id: null,
          status: 'prepared'
        }
      });
      if (!prepared.ok) {
        settleFailure(
          root_bead_id,
          'cleanup_prerecord_failed',
          'post_merge_cleanup',
          failure_key
        );
        return;
      }
      current = prepared.queue.completion_intents[root_bead_id];
      notify();
    }
    const op = current.active_op;
    if (op?.kind !== 'retry_cleanup') {
      settleFailure(
        root_bead_id,
        'cleanup_journal_conflict',
        'post_merge_cleanup',
        failure_key
      );
      return;
    }
    const result = await deps.prActions.resumeCompletionCleanup(root_bead_id);
    const after = deps.store.snapshot(deps.workspace);
    if (result?.ok === true) {
      if (
        after.completion_intents?.[root_bead_id]?.phase !== 'completed' &&
        !after.done.some(
          (/** @type {any} */ entry) => entry.bead_id === root_bead_id
        )
      ) {
        settleFailure(
          root_bead_id,
          'cleanup_completion_unrecorded',
          'post_merge_cleanup',
          failure_key
        );
      }
      notify();
      return;
    }
    const advanced = deps.store.advanceCompletionOp(deps.workspace, {
      root_bead_id,
      op_id: op.op_id,
      status: 'consumed',
      next_phase: 'cleaning',
      clear: true
    });
    if (!advanced.ok) {
      settleFailure(
        root_bead_id,
        'cleanup_settlement_record_failed',
        'post_merge_cleanup',
        failure_key,
        result
      );
      return;
    }
    notify();
  }

  /**
   * The `human` branch of {@link settleFailure} (UI-hk74 §4) and the kernel's
   * own terminal judgment (UI-8w4t §1). Reaching it means no automatic owner
   * is left for this failure, so `needs_human` again means what it says.
   *
   * The Bead comment rides the SAME write (UI-8w4t §4): `comment_at` is durable
   * before the call goes out, so a comment lost to a crash is never rewritten —
   * zero comments is a gap the card already covers, a duplicate is not.
   *
   * @param {string} root_bead_id
   * @param {string} reason
   * @param {string} stage
   * @param {any} [failure_key]
   * @param {any} [evidence]
   * @param {string|null} [op_id] - The RepoOperation this failure belongs to,
   * when one ran at all.
   */
  function terminalize(
    root_bead_id,
    reason,
    stage,
    failure_key = null,
    evidence = null,
    op_id = null
  ) {
    // The single persistence boundary for a `needs_human` cause (UI-5ym8 §7).
    // `settleFailure` deliberately classifies the RAW token against the §3
    // policy tables first — those keys are the retryable/metadata contract and
    // must not see a family prefix — and only what actually stops here is
    // folded. Folding at the write also means the de-dup below compares folded
    // to folded, so a re-observation of the same failure still finds its
    // earlier comment.
    const folded = foldNeedsHumanReason(reason);
    const text =
      evidence === null
        ? null
        : typeof evidence === 'string'
          ? evidence
          : JSON.stringify(evidence);
    const log_path =
      typeof evidence?.log_path === 'string' ? evidence.log_path : null;
    const resolved_op_id =
      typeof op_id === 'string' && op_id.length > 0
        ? op_id
        : operationIdFromLogPath(log_path);
    const queue = deps.store.snapshot(deps.workspace);
    const intent = queue.completion_intents?.[root_bead_id] || null;
    const commented_at = priorCommentAt(
      intent,
      resolved_op_id,
      failure_key,
      folded
    );
    const at = now();
    const terminal = {
      reason: folded,
      stage,
      failure_key,
      evidence: typeof text === 'string' ? text.slice(-4000) : null,
      log_path,
      op_id: resolved_op_id,
      comment_at: commented_at === null ? at : commented_at,
      at
    };
    // A post-merge pipeline failure is a wall every later bead hits too (spec
    // §3.4/§7): `verify_red` and `cleanup_failed:*` raise the SYSTEMIC hold in
    // the SAME durable write as the terminal, so the board can never show
    // `확인 필요` on a queue that is still dispatching. Other families stay
    // bead-local and pass no event at all.
    const hold_event =
      needsHumanHoldKind(folded) === 'systemic'
        ? {
            kind: /** @type {const} */ ('systemic_failure'),
            bead_id: root_bead_id,
            cause: folded,
            at
          }
        : null;
    const written = deps.store.terminalizeCompletionIntent(deps.workspace, {
      root_bead_id,
      terminal,
      hold_event,
      now: at
    });
    // §5: the same folded reason the terminal and the `bd comment` carry, never
    // a second sentence for the same fact.
    recordTimeline(
      root_bead_id,
      'needs_human',
      // The FOLDED family. One `확인 필요` per cause per bead: a re-settlement
      // of the same wall is the same fact, and a different wall is a new line.
      folded,
      `확인 필요 — ${folded}`
    );
    notify();
    if (written.ok && commented_at === null) {
      // Extracted from the evidence this terminal was settled on, not
      // re-derived inside the comment builder (spec §6: one extraction, one
      // string).
      postFailureComment(
        root_bead_id,
        intent,
        queue,
        terminal,
        completionFailureSummary(evidence)
      );
    }
  }

  /**
   * Whether this exact failure — same operation, same failure identity — was
   * already commented on. Both terminals are read: a `[머지]` re-click moves the
   * previous `terminal_reason` to `resumed_terminal`, and reading only the
   * current one would comment the same failure again on every re-click.
   *
   * The reason joins the `(op_id, failure_key)` pair the spec names because a
   * stop BEFORE any operation ran has neither of them: without it, the first
   * such terminal would silently swallow the comment of every later one.
   *
   * @param {any} intent
   * @param {string|null} op_id
   * @param {any} failure_key
   * @param {string} reason
   * @returns {number|null}
   */
  function priorCommentAt(intent, op_id, failure_key, reason) {
    for (const terminal of [
      intent?.terminal_reason,
      intent?.resumed_terminal
    ]) {
      if (!terminal || typeof terminal.comment_at !== 'number') {
        continue;
      }
      if (
        (terminal.op_id ?? null) !== (op_id ?? null) ||
        terminal.reason !== reason
      ) {
        continue;
      }
      const both_absent = !terminal.failure_key && !failure_key;
      if (both_absent || sameFailure(terminal.failure_key, failure_key)) {
        return terminal.comment_at;
      }
    }
    return null;
  }

  /**
   * Hand the failure to the Bead a human will open (UI-8w4t §4). Best-effort by
   * contract: the terminal is already durable, so a refused or absent `bd`
   * adapter is a log line, never a blocked completion.
   *
   * @param {string} root_bead_id
   * @param {any} intent
   * @param {any} queue
   * @param {any} terminal
   * @param {string|null} summary - The failing script's own line (spec §6),
   * already extracted by the caller from the evidence this terminal settled on.
   */
  function postFailureComment(root_bead_id, intent, queue, terminal, summary) {
    if (typeof deps.bd?.comment !== 'function') {
      return;
    }
    const comment = deps.bd.comment;
    const text = completionFailureComment(intent, queue, terminal, summary);
    comment_chain = comment_chain
      .then(() => comment(root_bead_id, text))
      .then(
        () => undefined,
        (err) => {
          log(
            'completion failure comment failed for %s: %o',
            root_bead_id,
            err
          );
        }
      );
  }

  /**
   * Snapshot the durable inputs a re-run of the failed effect needs (UI-hk74
   * §3/§4). Read from the failing operation and the pinned subject rather than
   * from the caller, so a re-run after a restart works from the same evidence
   * the first run had.
   *
   * @param {any} intent
   * @param {any} queue
   * @param {{ failure_key?: any, continuation?: any, continuation_mismatch?: unknown, operation_id?: unknown }} extras
   */
  function autoResolutionOp(intent, queue, extras) {
    const op = intent?.active_op || null;
    const subject = intent?.subject || {};
    const cleanup = queue?.cleanup_failed?.[subject.bead_id] || null;
    return {
      completion_op_id: op?.op_id ?? null,
      failure_key: op?.failure_key ?? extras.failure_key ?? null,
      continuation: extras.continuation ?? null,
      continuation_mismatch:
        typeof extras.continuation_mismatch === 'string'
          ? extras.continuation_mismatch
          : null,
      operation_id:
        typeof extras.operation_id === 'string' ? extras.operation_id : null,
      head_sha: subject.head_sha ?? null,
      base_sha: subject.base_sha ?? null,
      merged_sha: subject.merged_sha ?? null,
      cleanup_cursor: typeof cleanup?.step === 'string' ? cleanup.step : null
    };
  }

  /**
   * The single entry point for "this completion effect failed" (UI-hk74 §4).
   * The §3 tables decide whether the saga stops for a human or parks in a
   * non-terminal phase that tries to resolve itself; `terminalize` is now only
   * this function's `human` branch.
   *
   * @param {string} root_bead_id
   * @param {string} reason
   * @param {string} stage
   * @param {any} [failure_key]
   * @param {any} [evidence]
   * @param {{ continuation?: any, continuation_mismatch?: unknown, operation_id?: unknown, observed_head_sha?: unknown }} [extras] - Re-run
   * inputs, plus `observed_head_sha`: the head THIS observation just read. The
   * automatic review lane binds its authority to that head (UI-hk74 §6.1), not
   * to the intent's pinned subject, which an undecidable gate never updates.
   */
  function settleFailure(
    root_bead_id,
    reason,
    stage,
    failure_key = null,
    evidence = null,
    extras = {}
  ) {
    const policy = classifyCompletionFailure(reason);
    if (policy.class === 'human') {
      terminalize(root_bead_id, reason, stage, failure_key, evidence);
      return;
    }
    const queue = deps.store.snapshot(deps.workspace);
    const intent = queue.completion_intents?.[root_bead_id];
    if (!intent) {
      terminalize(root_bead_id, reason, stage, failure_key, evidence);
      return;
    }
    const existing = intent.auto_resolution;
    if (policy.class === 'retry') {
      // A re-run that fails again continues the SAME ladder. Reading the count
      // back from the record is what makes the cap survive the re-run leaving
      // `retrying` while its operation is in flight.
      const carried = existing?.class === 'retry' ? existing : null;
      const attempts = carried ? carried.attempts : 0;
      if (attempts >= COMPLETION_RETRY_MAX) {
        terminalize(
          root_bead_id,
          `retry_exhausted:${carried ? carried.origin_reason : reason}`,
          stage,
          failure_key,
          evidence
        );
        return;
      }
      const started = deps.store.startCompletionAutoResolution(deps.workspace, {
        root_bead_id,
        resolution: {
          class: 'retry',
          origin_reason: carried ? carried.origin_reason : reason,
          origin_stage: carried ? carried.origin_stage : stage,
          return_phase: policy.return_phase,
          attempts,
          next_at: now() + COMPLETION_RETRY_DELAYS_MS[attempts],
          last_error: reason,
          op: carried
            ? carried.op
            : autoResolutionOp(intent, queue, { ...extras, failure_key })
        }
      });
      if (!started.ok) {
        terminalize(root_bead_id, reason, stage, failure_key, evidence);
        return;
      }
      notify();
      return;
    }
    const started = deps.store.startCompletionAutoResolution(deps.workspace, {
      root_bead_id,
      resolution: {
        class: policy.class,
        origin_reason: reason,
        origin_stage: stage,
        return_phase: policy.return_phase,
        attempts: 0,
        next_at: null,
        last_error: null,
        op: autoResolutionOp(intent, queue, { ...extras, failure_key })
      }
    });
    if (!started.ok) {
      terminalize(root_bead_id, reason, stage, failure_key, evidence);
      return;
    }
    notify();
  }

  /**
   * @param {any} gated
   * @returns {ObservedCompletionFact}
   */
  function factFromGate(gated) {
    if (!gated || gated.ok !== true) {
      const reason = gated?.reason || 'completion_gate_unreadable';
      return reason === 'pr_ref_unknown'
        ? { state: 'waiting', reason }
        : { state: 'undecidable', reason };
    }
    const verdict = gated.verdict || {};
    if (verdict.tier === 'merged') {
      return { state: 'completed', gated };
    }
    if (verdict.enabled === true) {
      return { state: 'green', gated };
    }
    if (verdict.base_badge === '충돌') {
      return { state: 'conflict', gated };
    }
    const reason = verdict.reason;
    if (reason === 'verify_cmd_failed') {
      const verify = gated.evidence?.verify;
      const failure_key = createCompletionFailureKey({
        stage: 'merge_gate',
        reason,
        subject_sha: gated.subject.head_sha,
        base_sha: gated.base_sha,
        evidence: { output_tail: verify?.output_tail }
      });
      return {
        state: 'verify_red',
        source: 'verify',
        failure_key,
        evidence: verify,
        op_id: operationIdFromLogPath(verify?.log_path),
        gated
      };
    }
    if (
      reason === 'verify_missing' ||
      reason === 'verify_sha_stale' ||
      reason === 'not_observed'
    ) {
      return { state: 'waiting', reason, gated };
    }
    return {
      state: 'undecidable',
      reason: reason || 'completion_gate_refused',
      gated
    };
  }

  /**
   * @param {string} root_bead_id
   * @param {any} intent
   * @param {any} queue
   * @returns {ObservedCompletionFact}
   */
  function cleanupFact(root_bead_id, intent, queue) {
    if (
      Array.isArray(queue.done) &&
      queue.done.some(
        (/** @type {any} */ entry) => entry?.bead_id === root_bead_id
      )
    ) {
      return { state: 'completed' };
    }
    const failure = queue.cleanup_failed?.[root_bead_id];
    if (!failure) {
      return { state: 'cleanup_pending', reason: 'cleanup_incomplete' };
    }
    const subject_sha = intent.subject.merged_sha || intent.subject.head_sha;
    const failure_key = createCompletionFailureKey({
      stage: failure.step || 'post_merge_cleanup',
      reason: failure.reason,
      subject_sha,
      base_sha: intent.subject.base_sha,
      evidence: { output_tail: failure.output_tail }
    });
    if (isCleanupResolutionFailure(failure)) {
      return {
        state: 'cleanup_repairable',
        source: 'verify',
        failure_key,
        evidence: failure,
        op_id: operationIdFromLogPath(failure.log_path)
      };
    }
    return { state: 'cleanup_pending', reason: 'cleanup_incomplete' };
  }

  /**
   * @param {string} root_bead_id
   * @param {any} intent
   * @returns {Promise<ObservedCompletionFact>}
   */
  async function observe(root_bead_id, intent) {
    if (intent.active_op) {
      /** @type {ObservedCompletionFact} */
      const fact = { state: 'waiting', reason: 'completion_op_in_flight' };
      facts.set(root_bead_id, fact);
      return fact;
    }
    if (intent.phase === 'cleaning') {
      const fact = cleanupFact(
        root_bead_id,
        intent,
        deps.store.snapshot(deps.workspace)
      );
      facts.set(root_bead_id, fact);
      return fact;
    }
    const subject_bead_id = intent.subject.bead_id;
    if (typeof subject_bead_id !== 'string' || subject_bead_id.length === 0) {
      const fact = {
        state: /** @type {const} */ ('undecidable'),
        reason: 'completion_subject_missing'
      };
      facts.set(root_bead_id, fact);
      return fact;
    }
    let gated;
    try {
      gated = await deps.prActions.completionGate(subject_bead_id, 'root');
    } catch (err) {
      log('completion gate failed for %s: %o', root_bead_id, err);
      gated = { ok: false, reason: 'completion_gate_spawn_failed' };
    }
    let fact = factFromGate(gated);
    if (
      gated.ok === true &&
      (intent.subject.head_sha !== gated.subject.head_sha ||
        intent.subject.base_sha !== gated.subject.base_sha ||
        intent.subject.pr_url !== gated.subject.pr_url)
    ) {
      fact = { state: 'stale', gated };
    }
    if (
      fact.state === 'completed' &&
      !deps.store
        .snapshot(deps.workspace)
        .done.some((/** @type {any} */ entry) => entry.bead_id === root_bead_id)
    ) {
      fact = cleanupFact(
        root_bead_id,
        { ...intent, subject: gated.subject },
        deps.store.snapshot(deps.workspace)
      );
      fact.gated = gated;
    }
    facts.set(root_bead_id, fact);
    return fact;
  }

  /**
   * Re-read the gate for a root whose metadata was said to be corrected
   * (UI-hk74 §3/§5). The completion gate re-runs `checkReceipts` and the native
   * `spec_id` read, so "did the human fix it" needs no second reader.
   *
   * An unreadable gate — the bd read failing, most of all — leaves the phase
   * exactly where it is (§10). The wait is unbounded by design: nothing is
   * being consumed while it holds.
   *
   * @param {string} root_bead_id
   * @param {'pass'|'event'} source - `event` is the bd issue-change trigger
   * §5 names; `pass` is the coordinator's own reconciliation, capped at one
   * check per root per process.
   */
  async function runMetadataCheck(root_bead_id, source) {
    if (metadata_checks.has(root_bead_id)) {
      return;
    }
    if (source === 'pass') {
      if (metadata_pass_checked.has(root_bead_id)) {
        return;
      }
      metadata_pass_checked.add(root_bead_id);
    }
    metadata_checks.add(root_bead_id);
    try {
      const intent = deps.store.snapshot(deps.workspace).completion_intents?.[
        root_bead_id
      ];
      const resolution = intent?.auto_resolution;
      if (
        !intent ||
        intent.phase !== 'waiting_metadata' ||
        resolution?.class !== 'metadata_watch'
      ) {
        return;
      }
      let gated;
      try {
        gated = await deps.prActions.completionGate(
          intent.subject.bead_id,
          intent.subject.role
        );
      } catch (err) {
        log('metadata check failed for %s: %o', root_bead_id, err);
        recordResolutionError(root_bead_id, 'metadata_check_unreadable');
        return;
      }
      // §10: a gate that could not READ the Bead is not a verdict about it.
      // Without this, an unreachable `bd` turned every `waiting_metadata` row
      // into `needs_human` through `review_receipt_invalid`, which the policy
      // table classifies as human — the exact opposite of "keep the phase and
      // wait for the next event".
      if (gated?.authority_unreadable === true) {
        recordResolutionError(root_bead_id, 'metadata_check_unreadable');
        return;
      }
      const fact = factFromGate(gated);
      if (fact.state === 'undecidable') {
        const again = classifyCompletionFailure(fact.reason);
        if (again.class === 'metadata_watch') {
          recordResolutionError(root_bead_id, fact.reason || 'unknown');
          return;
        }
        metadata_pass_checked.delete(root_bead_id);
        settleFailure(
          root_bead_id,
          fact.reason || 'ownership_undecidable',
          resolution.origin_stage,
          fact.failure_key,
          fact.evidence
        );
        return;
      }
      if (gated?.ok !== true) {
        recordResolutionError(root_bead_id, gated?.reason || 'gate_unreadable');
        return;
      }
      const cleared = deps.store.clearCompletionAutoResolution(deps.workspace, {
        root_bead_id,
        phase: 'gating'
      });
      if (cleared.ok) {
        metadata_pass_checked.delete(root_bead_id);
        notify();
      }
    } finally {
      metadata_checks.delete(root_bead_id);
    }
  }

  /**
   * @param {string} root_bead_id
   * @param {string} last_error
   */
  function recordResolutionError(root_bead_id, last_error) {
    const updated = deps.store.updateCompletionAutoResolution(deps.workspace, {
      root_bead_id,
      patch: { last_error }
    });
    if (updated.ok) {
      notify();
    }
  }

  /**
   * Re-run the gate for a retry whose original failure was a gate/verify spawn.
   *
   * The §3 durable inputs for this family are `head_sha` and `base_sha`, and
   * the gate re-runs on the subject they were copied from. A subject that has
   * MOVED since makes the pinned spawn moot — there is nothing left to re-run
   * for that commit — and the answer for it is the same `gating` the retry
   * would return to anyway, so it settles as success rather than burning the
   * remaining budget on a failure about a commit nobody is merging.
   *
   * @param {string} root_bead_id
   * @param {any} op - The pinned `auto_resolution.op`.
   * @returns {Promise<boolean>} Whether the gate produced a verdict at all.
   */
  async function retryGate(root_bead_id, op) {
    const intent = deps.store.snapshot(deps.workspace).completion_intents?.[
      root_bead_id
    ];
    if (!intent) {
      return false;
    }
    if (
      (typeof op?.head_sha === 'string' &&
        intent.subject.head_sha !== op.head_sha) ||
      (typeof op?.base_sha === 'string' &&
        intent.subject.base_sha !== op.base_sha)
    ) {
      return true;
    }
    try {
      const gated = await deps.prActions.completionGate(
        intent.subject.bead_id,
        intent.subject.role
      );
      return gated?.ok === true;
    } catch (err) {
      log('retry gate failed for %s: %o', root_bead_id, err);
      return false;
    }
  }

  /**
   * Read back the §3 success condition of one retry family. Each family names
   * a different durable record, so "it did not throw" is never the test.
   *
   * @param {CompletionRetryPolicy} policy
   * @param {any} before - Intent as it stood before the re-run.
   * @param {any} after_queue
   * @param {string} root_bead_id
   * @param {boolean} gate_ok
   */
  function retrySucceeded(policy, before, after_queue, root_bead_id, gate_ok) {
    const after = after_queue.completion_intents?.[root_bead_id];
    if (!after) {
      return false;
    }
    if (policy.effect === 'retry_cleanup') {
      return (
        after.active_op?.kind === 'retry_cleanup' ||
        after.phase === 'completed' ||
        (Array.isArray(after_queue.done) &&
          after_queue.done.some(
            (/** @type {any} */ entry) => entry?.bead_id === root_bead_id
          ))
      );
    }
    return gate_ok;
  }

  /**
   * Spend one delayed retry (UI-hk74 §3/§4). The budget is consumed BEFORE the
   * effect runs: a crash between the two must cost an attempt, or a re-run that
   * kills the process would loop forever at no charge.
   *
   * @param {string} root_bead_id
   */
  async function runRetry(root_bead_id) {
    const before_queue = deps.store.snapshot(deps.workspace);
    const before = before_queue.completion_intents?.[root_bead_id];
    const resolution = before?.auto_resolution;
    if (
      !before ||
      before.phase !== 'retrying' ||
      resolution?.class !== 'retry'
    ) {
      return;
    }
    // The failing operation is still journaled — `settleFailure` preserves it —
    // and retiring it is part of spending the attempt (review F1). Only the
    // exact op the record names may go; anything else is a live operation this
    // retry has no claim on, and the caller waits for it instead.
    const stale_op_id = before.active_op ? before.active_op.op_id : null;
    if (
      stale_op_id !== null &&
      stale_op_id !== resolution.op.completion_op_id
    ) {
      return;
    }
    const policy = classifyCompletionFailure(resolution.origin_reason).retry;
    if (!policy || policy.return_phase !== resolution.return_phase) {
      terminalize(
        root_bead_id,
        'auto_resolution_invalid',
        resolution.origin_stage,
        resolution.op.failure_key
      );
      return;
    }
    const attempts = resolution.attempts + 1;
    const bumped = deps.store.updateCompletionAutoResolution(deps.workspace, {
      root_bead_id,
      patch: {
        attempts,
        next_at:
          attempts < COMPLETION_RETRY_MAX
            ? now() + COMPLETION_RETRY_DELAYS_MS[attempts]
            : null,
        last_error: null
      },
      supersede_op_id: stale_op_id
    });
    if (!bumped.ok) {
      terminalize(
        root_bead_id,
        'auto_resolution_invalid',
        resolution.origin_stage,
        resolution.op.failure_key
      );
      return;
    }
    notify();
    // Every re-run reads the §3 durable inputs, never a fresh observation: the
    // record is what makes a retry after a restart repeat the SAME effect.
    const fact = { failure_key: resolution.op.failure_key, evidence: null };
    let gate_ok = false;
    if (policy.effect === 'retry_cleanup') {
      await startCleanupReplay(root_bead_id, fact);
    } else {
      gate_ok = await retryGate(root_bead_id, resolution.op);
    }
    const after_queue = deps.store.snapshot(deps.workspace);
    const after = after_queue.completion_intents?.[root_bead_id];
    if (!after || after.auto_resolution === null) {
      return;
    }
    if (
      retrySucceeded(policy, before, after_queue, root_bead_id, gate_ok) &&
      deps.store.clearCompletionAutoResolution(deps.workspace, {
        root_bead_id,
        phase: policy.return_phase
      }).ok
    ) {
      notify();
    }
  }

  /**
   * @param {string} root_bead_id
   * @param {CompletionAction} action
   * @param {any} intent
   */
  async function onAction(root_bead_id, action, intent) {
    const fact = facts.get(root_bead_id) || { state: 'waiting' };
    if (action.kind === 'reconcile_op') {
      const current = deps.store.snapshot(deps.workspace).completion_intents?.[
        root_bead_id
      ];
      const op = current?.active_op;
      if (!current || !op) {
        return;
      }
      if (op.kind === 'merge_subject') {
        if (typeof deps.kickMerge === 'function') {
          await deps.kickMerge();
        }
        return;
      }
      if (op.kind === 'retry_cleanup') {
        await startCleanupReplay(root_bead_id, {
          failure_key: op.failure_key,
          evidence: fact.evidence
        });
        return;
      }
      settleFailure(
        root_bead_id,
        'reconciliation_ambiguous',
        'reconciliation',
        op.failure_key
      );
      return;
    }
    if (action.kind === 'gate') {
      const parked = deps.store.snapshot(deps.workspace).completion_intents?.[
        root_bead_id
      ]?.auto_resolution;
      if (
        parked &&
        deps.store.clearCompletionAutoResolution(deps.workspace, {
          root_bead_id,
          phase: 'gating'
        }).ok
      ) {
        notify();
      }
      if (fact.gated?.subject) {
        const recorded = deps.store.setCompletionSubject(deps.workspace, {
          root_bead_id,
          phase: 'gating',
          subject: fact.gated.subject
        });
        if (recorded.ok) {
          recordTimeline(
            root_bead_id,
            'merge_step',
            // The PHASE, per gated subject: a saga that re-gates the same
            // subject records one line, a new subject records its own.
            `gating:${fact.gated.subject.bead_id}`,
            `머지 게이트 통과 · ${fact.gated.subject.bead_id}`
          );
          notify();
        }
      }
      return;
    }
    if (action.kind === 'resume_intent') {
      const resumed = deps.store.resumeCompletionIntent(deps.workspace, {
        root_bead_id
      });
      if (resumed.ok) {
        notify();
      }
      return;
    }
    if (action.kind === 'enter_cleanup') {
      if (
        !fact.gated?.subject ||
        typeof fact.gated.subject.merged_sha !== 'string'
      ) {
        settleFailure(
          root_bead_id,
          'root_cleanup_pin_missing',
          'post_merge_cleanup',
          fact.failure_key,
          fact.evidence
        );
        return;
      }
      const cleaning = deps.store.setCompletionSubject(deps.workspace, {
        root_bead_id,
        phase: 'cleaning',
        subject: fact.gated.subject
      });
      if (cleaning.ok) {
        recordTimeline(
          root_bead_id,
          'merge_step',
          // The phase. One entry into cleanup per saga.
          'cleaning',
          '머지 후 정리 시작'
        );
      }
      if (!cleaning.ok) {
        settleFailure(
          root_bead_id,
          'root_cleanup_transition_failed',
          'post_merge_cleanup',
          fact.failure_key,
          fact.evidence
        );
        return;
      }
      notify();
      return;
    }
    if (action.kind === 'merge_subject') {
      const subject = fact.gated?.subject || intent.subject;
      if (
        intent.subject.head_sha !== subject.head_sha ||
        intent.subject.base_sha !== subject.base_sha ||
        intent.subject.pr_url !== subject.pr_url
      ) {
        const pinned = deps.store.setCompletionSubject(deps.workspace, {
          root_bead_id,
          phase: 'gating',
          subject
        });
        if (!pinned.ok) {
          settleFailure(
            root_bead_id,
            'merge_subject_pin_failed',
            'merge_subject'
          );
          return;
        }
        notify();
      }
      const current = deps.store.snapshot(deps.workspace).completion_intents?.[
        root_bead_id
      ];
      if (!current) {
        return;
      }
      if (current.active_op === null) {
        const failure_key = mergeFailureKey(root_bead_id, current, fact);
        const op_id = operationIdentity(
          root_bead_id,
          'merge_subject',
          failure_key
        );
        const prepared = deps.store.prepareCompletionOp(deps.workspace, {
          root_bead_id,
          phase: 'merging',
          op: {
            op_id,
            kind: 'merge_subject',
            failure_key,
            attempt_id: null,
            status: 'prepared'
          }
        });
        if (!prepared.ok) {
          settleFailure(
            root_bead_id,
            'merge_prerecord_failed',
            'merge_subject',
            failure_key
          );
          return;
        }
        recordTimeline(
          root_bead_id,
          'merge_step',
          // The prepared operation's own id: one line per merge operation, and
          // a replayed prepare re-appends the same id.
          `merging:${op_id}`,
          'squash 머지 시작'
        );
        notify();
      }
      if (typeof deps.kickMerge === 'function') {
        await deps.kickMerge();
      }
      return;
    }
    if (action.kind === 'retry_cleanup') {
      await startCleanupReplay(root_bead_id, fact);
      return;
    }
    if (action.kind === 'resume_metadata_check') {
      await runMetadataCheck(root_bead_id, 'pass');
      return;
    }
    if (action.kind === 'retry_failed_op') {
      await runRetry(root_bead_id);
      return;
    }
    if (action.kind === 'pause') {
      const paused = deps.store.pauseCompletionIntent(deps.workspace, {
        root_bead_id
      });
      if (paused.ok) {
        notify();
      }
      return;
    }
    if (action.kind === 'needs_human') {
      // A missing reason is a kernel bug, not a state: it becomes
      // `internal_record_failed:reason_missing` rather than a sixth token that
      // says only "a human is needed" (UI-5ym8 §7). Anything present is passed
      // on RAW — `terminalize` folds, and `settleFailure` must still see the
      // policy-table key.
      const reason =
        typeof action.reason === 'string' && action.reason.length > 0
          ? action.reason
          : 'internal_record_failed:reason_missing';
      if (action.terminal === true) {
        // A kernel-judged terminal does NOT consult the §3 tables (UI-8w4t
        // §1). A cleanup cause is often `verify_cmd_failed`, which the surviving
        // retry policy would have parked in `retrying` and re-run automatically
        // — the exact automation this lane exists to stop.
        terminalize(
          root_bead_id,
          reason,
          'coordinator',
          fact.failure_key,
          fact.evidence,
          fact.op_id ?? null
        );
        return;
      }
      settleFailure(
        root_bead_id,
        reason,
        'coordinator',
        fact.failure_key,
        fact.evidence,
        { observed_head_sha: fact.gated?.subject?.head_sha }
      );
    }
  }

  /**
   * @param {any} input
   */
  async function onAttemptSettled(input) {
    const queue = deps.store.snapshot(deps.workspace);
    const intent = queue.completion_intents?.[input.root_bead_id];
    const op = intent?.active_op;
    if (
      !intent ||
      !op ||
      op.op_id !== input.op_id ||
      op.attempt_id !== input.attempt?.attempt_id ||
      !sameFailure(op.failure_key, input.failure_key) ||
      input.attempt?.status === 'running' ||
      input.attempt?.status === 'paused'
    ) {
      return;
    }
    let gated;
    try {
      gated = await deps.prActions.completionGate(
        input.attempt?.bead_id,
        'root'
      );
    } catch {
      gated = null;
    }
    const advanced = deps.store.advanceCompletionOp(deps.workspace, {
      root_bead_id: input.root_bead_id,
      op_id: input.op_id,
      status: 'consumed',
      next_phase: queue.auto_merge === true ? 'gating' : 'paused',
      ...(gated?.ok === true ? { subject: gated.subject } : {}),
      clear: true
    });
    if (!advanced.ok) {
      settleFailure(
        input.root_bead_id,
        'completion_settlement_record_failed',
        'completion_settlement',
        input.failure_key
      );
      return;
    }
    notify();
  }

  /**
   * @param {string} root_bead_id
   * @param {string} subject_bead_id
   * @param {any} result
   */
  async function onMergeResult(root_bead_id, subject_bead_id, result) {
    let queue = deps.store.snapshot(deps.workspace);
    let intent = queue.completion_intents?.[root_bead_id];
    if (!intent) {
      return;
    }
    if (intent.subject.bead_id !== subject_bead_id) {
      return;
    }
    if (result?.reason === 'resolution_timeout') {
      return;
    }
    if (CONFLICT_RESOLUTION_FAILURES.has(result?.reason)) {
      settleFailure(
        root_bead_id,
        result.reason,
        'conflict_resolution',
        intent.active_op?.failure_key ?? null,
        result
      );
      return;
    }
    const merged =
      result &&
      (result.action === 'merged' ||
        result.action === 'updated_and_merged' ||
        result.action === 'already_merged');
    if (
      merged &&
      result.ok === true &&
      subject_bead_id === root_bead_id &&
      intent.phase === 'completed'
    ) {
      return;
    }
    if (intent.active_op?.kind === 'merge_subject') {
      const consumed = deps.store.advanceCompletionOp(deps.workspace, {
        root_bead_id,
        op_id: intent.active_op.op_id,
        status: 'consumed',
        next_phase: 'gating',
        clear: true
      });
      if (!consumed.ok) {
        settleFailure(
          root_bead_id,
          'merge_settlement_record_failed',
          'merge_subject',
          intent.active_op.failure_key,
          result
        );
        return;
      }
      queue = consumed.queue;
      intent = queue.completion_intents[root_bead_id];
    }
    if (merged && subject_bead_id === root_bead_id) {
      let root_gate;
      try {
        root_gate = await deps.prActions.completionGate(root_bead_id, 'root');
      } catch {
        root_gate = null;
      }
      if (root_gate?.ok !== true) {
        settleFailure(
          root_bead_id,
          root_gate?.reason || 'root_cleanup_pin_failed',
          'post_merge_cleanup'
        );
        return;
      }
      const cleaning = deps.store.setCompletionSubject(deps.workspace, {
        root_bead_id,
        phase: 'cleaning',
        subject: root_gate.subject
      });
      if (!cleaning.ok) {
        settleFailure(
          root_bead_id,
          'root_cleanup_transition_failed',
          'post_merge_cleanup'
        );
        return;
      }
      notify();
      return;
    }
    if (result?.reason === 'resolution_round_cap') {
      settleFailure(root_bead_id, result.reason, 'conflict_resolution');
      return;
    }
    let gated;
    try {
      gated = await deps.prActions.completionGate(subject_bead_id, 'root');
    } catch {
      gated = null;
    }
    if (gated?.ok === true) {
      deps.store.setCompletionSubject(deps.workspace, {
        root_bead_id,
        phase: 'gating',
        subject: gated.subject
      });
      notify();
      return;
    }
    settleFailure(
      root_bead_id,
      result?.reason || gated?.reason || 'completion_merge_failed',
      'merge_subject',
      null,
      null,
      { observed_head_sha: result?.head_sha }
    );
  }

  /**
   * The bd issue-change trigger (UI-hk74 §5). Every `waiting_metadata` root is
   * re-checked when — and only when — the beads database actually changed;
   * there is no timer behind this, which is what keeps a row that is waiting
   * for a human edit from spending a completion gate on a cadence.
   *
   * Fail-quiet per root: an unreadable gate leaves the phase alone and waits
   * for the next event (§10).
   */
  async function onIssuesChanged() {
    /** @type {Record<string, any>} */
    let intents;
    try {
      intents = deps.store.snapshot(deps.workspace).completion_intents || {};
    } catch (err) {
      log('issue-change metadata scan failed for %s: %o', deps.workspace, err);
      return;
    }
    for (const [root_bead_id, intent] of Object.entries(intents)) {
      if (
        intent?.phase !== 'waiting_metadata' ||
        intent.auto_resolution?.class !== 'metadata_watch'
      ) {
        continue;
      }
      await runMetadataCheck(root_bead_id, 'event');
    }
  }

  return {
    observe,
    onAction,
    adoptLegacyTimeout,
    onAttemptSettled,
    onIssuesChanged,
    onMergeResult,

    /**
     * Test and shutdown seam: wait for the best-effort failure comments this
     * driver has already handed to `bd`.
     */
    commentsIdle() {
      return comment_chain;
    }
  };
}
