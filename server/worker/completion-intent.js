/**
 * Durable completion-intent coordinator kernel.
 *
 * This module decides the next owner/action from durable state. It does not
 * spawn sessions, create Beads, merge PRs, or run cleanup. Those effects stay
 * behind injected owners and must prerecord their operation in queue-store
 * before executing.
 */
import { createHash } from 'node:crypto';
import {
  UNRESOLVED_REVIEWER,
  UNRESOLVED_REVIEW_EFFORT
} from './head-review.js';
import { RESOLUTION_ROUND_CAP, RESOLUTION_WAIT_MS } from './merge-queue.js';
import {
  COMPLETION_AUTO_RESOLUTION_PHASE,
  COMPLETION_RETRY_MAX
} from './queue-store.js';
import { repoOperationPolicySupported } from './repo-operation-policy.js';
import { isCleanupResolutionFailure } from './resolution-ladder.js';

const OUTPUT_TAIL_MAX = 4_000;
const REASON_MAX = 500;
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
 * Build the stable identity of one failure observed at pinned subject/base
 * SHAs. The digest input is bounded and normalized so line endings cannot
 * manufacture distinct repair operations for the same result.
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
 * @type {Readonly<Record<string, 'metadata_watch'|'auto_review'|'retry'|'human'>>}
 */
export const COMPLETION_FAILURE_POLICY = Object.freeze({
  receipt_unbacked: 'metadata_watch',
  spec_id_missing: 'metadata_watch',
  review_receipt_missing: 'auto_review',
  review_receipt_stale: 'auto_review',
  repair_bead_create_failed: 'retry',
  repair_bead_readback_failed: 'retry',
  repair_bead_record_failed: 'retry',
  repair_dispatch_failed: 'retry',
  continuation_persist_failed: 'retry',
  cleanup_prerecord_failed: 'retry',
  cleanup_settlement_record_failed: 'retry',
  completion_gate_spawn_failed: 'retry',
  verify_cmd_failed: 'retry',
  reconciliation_ambiguous: 'human',
  resolution_lineage_ambiguous: 'human',
  repair_resume_lineage_ambiguous: 'human',
  repair_attempt_missing: 'human',
  cleanup_journal_conflict: 'human',
  cleanup_completion_unrecorded: 'human',
  repair_session_budget_exhausted: 'human',
  intent_state_invalid: 'human',
  ownership_undecidable: 'human'
});

/**
 * @typedef {'create_repair'|'dispatch_repair'|'gate'|'verify'|'retry_cleanup'} CompletionRetryEffect
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
 * durable inputs, and what counts as success. Kept as data because the five
 * families differ in all three and a single "just try again" would either
 * duplicate a repair Bead or declare success on a spawn that never ran.
 *
 * @type {Readonly<Record<string, CompletionRetryPolicy>>}
 */
export const COMPLETION_RETRY_POLICY = Object.freeze({
  repair_bead_create_failed: {
    return_phase: 'repairing',
    effect: 'create_repair',
    inputs: ['failure_key'],
    optional_inputs: ['repair_bead_id'],
    success: 'repair_bead_recorded'
  },
  repair_bead_readback_failed: {
    return_phase: 'repairing',
    effect: 'create_repair',
    inputs: ['failure_key'],
    optional_inputs: ['repair_bead_id'],
    success: 'repair_bead_recorded'
  },
  repair_bead_record_failed: {
    return_phase: 'repairing',
    effect: 'create_repair',
    inputs: ['failure_key'],
    optional_inputs: ['repair_bead_id'],
    success: 'repair_bead_recorded'
  },
  repair_dispatch_failed: {
    return_phase: 'repairing',
    effect: 'dispatch_repair',
    inputs: ['repair_bead_id'],
    optional_inputs: ['continuation'],
    success: 'repair_attempt_dispatched'
  },
  continuation_persist_failed: {
    return_phase: 'repairing',
    effect: 'dispatch_repair',
    inputs: ['repair_bead_id'],
    optional_inputs: ['continuation'],
    success: 'repair_attempt_dispatched'
  },
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
 * @property {'metadata_watch'|'auto_review'|'retry'|'human'} class
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
 * @typedef {'green'|'conflict'|'verify_red'|'pr_owned'|'base_owned'|'repair_created'|'cleanup_repairable'|'cleanup_pending'|'repair_pr_open'|'repair_pr_merged'|'completed'|'stale'|'undecidable'|'waiting'} CompletionFactState
 */
/**
 * @typedef {{ state: CompletionFactState, reason?: string }} CompletionFact
 */
/**
 * @typedef {CompletionFact & { gated?: any, source?: string, failure_key?: any, evidence?: any }} ObservedCompletionFact
 */
/**
 * @typedef {{ kind: 'gate'|'probe'|'enter_cleanup'|'resume_intent'|'resume_root'|'create_repair'|'dispatch_repair'|'merge_subject'|'retry_cleanup'|'reconcile_op'|'resume_metadata_check'|'dispatch_auto_review'|'retry_failed_op'|'pause'|'needs_human'|'complete', reason?: string }} CompletionAction
 */

/**
 * Decide the next action for an intent parked in one of the three
 * auto-resolution phases (UI-hk74 §4).
 *
 * @param {any} intent
 * @param {any} head_review - The `merge_queue[].head_review` journal for this
 * root, which is the ONLY truth about a `reviewing` intent.
 * @param {number} now
 * @returns {CompletionAction|null}
 */
function decideAutoResolution(intent, head_review, now) {
  const resolution = intent.auto_resolution;
  if (
    !resolution ||
    !Object.hasOwn(COMPLETION_AUTO_RESOLUTION_PHASE, resolution.class) ||
    COMPLETION_AUTO_RESOLUTION_PHASE[
      /** @type {'metadata_watch'|'auto_review'|'retry'} */ (resolution.class)
    ] !== intent.phase
  ) {
    return { kind: 'needs_human', reason: 'auto_resolution_invalid' };
  }
  if (intent.phase === 'retrying') {
    // Waiting out a LIVE operation IS the first step of the retry, and deciding
    // it before the generic reconcile is what keeps the delay and the 3-attempt
    // cap on the path.
    //
    // "Live" is exactly "not the operation this record was opened on" (review
    // F1). `settleFailure` deliberately preserves the failing op, so treating
    // every `active_op` as live sent the retry straight back through the
    // generic reconcile — which RE-RUNS the failing effect (`create_repair`
    // re-creates, `retry_cleanup` replays) immediately, before `next_at` and
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
      return {
        kind: 'needs_human',
        reason: `retry_exhausted:${resolution.origin_reason}`
      };
    }
    if (typeof resolution.next_at === 'number' && now < resolution.next_at) {
      return null;
    }
    return { kind: 'retry_failed_op' };
  }
  if (intent.phase === 'waiting_metadata') {
    return { kind: 'resume_metadata_check' };
  }
  if (!head_review) {
    // Enrolment writes the journal in the same revision that sets `reviewing`,
    // so a missing journal is never "not yet" — it is a torn write, and a second
    // dispatch on top of an unknown first one is the lineage risk §10 refuses.
    return { kind: 'needs_human', reason: 'auto_review_journal_missing' };
  }
  if (head_review.state === 'approved') {
    return { kind: 'gate' };
  }
  if (head_review.state === 'failed') {
    return {
      kind: 'needs_human',
      reason: head_review.failure_reason || 'auto_review_failed'
    };
  }
  // An in-progress journal is RE-DRIVEN, never left alone (UI-hk74 review F2).
  // The drive is idempotent on the attempt marker: a terminal marker settles
  // the attempt, a live one is adopted by its recorded pid, and only a journal
  // with no marker at all spawns. Returning null on a journal that had already
  // minted `review_attempt_id` stranded every restart in the middle of a
  // review — including the marker-only crash window §7 asks reconcile to adopt.
  // The opposite window (attempt recorded, marker lost) is closed before this
  // ever runs: the transport's own startup reconcile fails that journal, and a
  // failed journal is answered above.
  return { kind: 'dispatch_auto_review' };
}

/**
 * Decide one next action from an already-normalized durable intent and one
 * authoritative fact. The function is pure so reconciliation and live paths
 * share the same judgment.
 *
 * @param {{ auto_merge: boolean, intent: any, fact?: CompletionFact|null, head_review?: any, now?: number }} input
 * @returns {CompletionAction|null}
 */
export function decideCompletionAction(input) {
  const intent = input.intent;
  const fact = input.fact || { state: 'waiting' };
  if (!intent || typeof intent !== 'object') {
    return { kind: 'needs_human', reason: 'intent_state_invalid' };
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
      input.head_review || null,
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
    return {
      kind: 'needs_human',
      reason: fact.reason || 'ownership_undecidable'
    };
  }
  if (fact.state === 'completed') {
    return { kind: 'complete' };
  }
  if (intent.phase === 'cleaning') {
    if (fact.state === 'cleanup_repairable') {
      // The RepoOperation resolution ladder owns cleanup failures. Wait for
      // that durable subject instead of creating a second repair Bead.
      return null;
    }
    if (fact.state === 'cleanup_pending') {
      return { kind: 'retry_cleanup' };
    }
    return null;
  }
  if (intent.phase === 'waiting_repair_pr') {
    if (fact.state === 'repair_pr_open') {
      return { kind: 'gate' };
    }
    return fact.state === 'repair_pr_merged' || fact.state === 'stale'
      ? { kind: 'gate' }
      : null;
  }
  if (intent.phase === 'repairing') {
    if (fact.state === 'repair_created') {
      return { kind: 'dispatch_repair' };
    }
    return null;
  }
  if (intent.phase === 'merging') {
    return { kind: 'merge_subject' };
  }
  if (intent.phase !== 'gating') {
    return { kind: 'needs_human', reason: 'intent_state_invalid' };
  }
  if (fact.state === 'cleanup_repairable' || fact.state === 'cleanup_pending') {
    return { kind: 'enter_cleanup' };
  }
  if (
    fact.state === 'green' ||
    fact.state === 'conflict' ||
    fact.state === 'repair_pr_merged'
  ) {
    return { kind: 'merge_subject' };
  }
  if (fact.state === 'verify_red') {
    return { kind: 'probe' };
  }
  if (fact.state === 'pr_owned') {
    return { kind: 'resume_root' };
  }
  if (fact.state === 'base_owned') {
    return { kind: 'create_repair' };
  }
  if (fact.state === 'repair_created') {
    return { kind: 'dispatch_repair' };
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
    // judgment discards. `reviewing` still observes: an approved journal hands
    // straight back to the gate, which needs the pinned subject.
    const fact =
      intent?.phase === 'waiting_metadata' || intent?.phase === 'retrying'
        ? /** @type {CompletionFact} */ ({ state: 'waiting' })
        : await observe(root_bead_id, intent, queue);
    const action = decideCompletionAction({
      auto_merge: queue.auto_merge === true,
      intent,
      fact,
      head_review: head?.head_review || null,
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

const REPAIR_SESSION_CAP = 2;

/**
 * @param {string} root_bead_id
 * @param {string} kind
 * @param {any} failure_key
 * @param {number|null} [repair_round]
 */
function operationIdentity(
  root_bead_id,
  kind,
  failure_key,
  repair_round = null
) {
  const digest = createHash('sha256')
    .update(
      JSON.stringify({
        root_bead_id,
        kind,
        repair_round,
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
 *   prActions: { completionGate: (bead_id: string, role?: 'root'|'repair') => Promise<any>, resumeCompletionCleanup?: (root_bead_id: string) => Promise<any> },
 *   completionRepair: { probeOwnership: (input: any) => Promise<any>, ensureLinkedBead: (input: any) => Promise<any> },
 *   scheduler: { dispatchCompletionRepair: (workspace: string, input: any) => Promise<any> },
 *   notifyChanged?: (workspace: string) => void,
 *   kickMerge?: () => Promise<unknown>|unknown,
 *   dispatchAutoReview?: (root_bead_id: string) => Promise<unknown>|unknown,
 *   now?: () => number,
 *   log?: (...args: any[]) => void
 * }} deps
 */
export function createCompletionActionDriver(deps) {
  const facts = new Map();
  const now = deps.now || (() => Date.now());
  const log = deps.log || (() => {});
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
   * Finish or adopt one journaled linked-Bead creation, then hand its observed
   * operation directly to the scheduler. The scheduler replaces the create op
   * with its session op and attempt in one store mutation, leaving no
   * create-consumed/dispatch-missing crash window.
   *
   * @param {string} root_bead_id
   * @param {any} fact
   */
  async function continueCreateRepair(root_bead_id, fact) {
    let current = deps.store.snapshot(deps.workspace).completion_intents?.[
      root_bead_id
    ];
    let create_op = current?.active_op;
    if (!current || create_op?.kind !== 'create_repair') {
      settleFailure(
        root_bead_id,
        'repair_create_journal_missing',
        'repair_create',
        fact?.failure_key
      );
      return;
    }
    let linked =
      typeof create_op.repair_bead_id === 'string'
        ? { bead_id: create_op.repair_bead_id }
        : null;
    if (!linked) {
      try {
        linked = await deps.completionRepair.ensureLinkedBead({
          root_bead_id,
          op_id: create_op.op_id,
          failure_key: create_op.failure_key
        });
      } catch (err) {
        settleFailure(
          root_bead_id,
          'repair_bead_create_failed',
          'repair_create',
          create_op.failure_key,
          String(err)
        );
        return;
      }
      if (
        !linked ||
        typeof linked.bead_id !== 'string' ||
        linked.bead_id.length === 0
      ) {
        settleFailure(
          root_bead_id,
          'repair_bead_readback_failed',
          'repair_create',
          create_op.failure_key
        );
        return;
      }
    }
    // Membership, not creation, is the §3 success condition for this family, so
    // it is checked whether the Bead was just created or carried in from the
    // retry record — a `repair_bead_record_failed` re-run has the id already and
    // must still get it into the intent.
    if (!current.repair_bead_ids.includes(linked.bead_id)) {
      const recorded = deps.store.recordCompletionRepairBead(deps.workspace, {
        root_bead_id,
        op_id: create_op.op_id,
        repair_bead_id: linked.bead_id
      });
      if (!recorded.ok) {
        settleFailure(
          root_bead_id,
          'repair_bead_record_failed',
          'repair_create',
          create_op.failure_key
        );
        return;
      }
      notify();
      current = recorded.queue.completion_intents[root_bead_id];
      create_op = current.active_op;
    }
    const failure_key = create_op.failure_key;
    const dispatch_op_id = operationIdentity(
      root_bead_id,
      'dispatch_repair',
      failure_key,
      current.repair_sessions_used + 1
    );
    const result = await deps.scheduler.dispatchCompletionRepair(
      deps.workspace,
      {
        root_bead_id,
        op: {
          op_id: dispatch_op_id,
          kind: 'dispatch_repair',
          failure_key,
          attempt_id: `${dispatch_op_id}-attempt`,
          repair_bead_id: linked.bead_id,
          status: 'prepared'
        },
        log_path: fact?.evidence?.log_path ?? null
      }
    );
    if (!result.ok) {
      settleFailure(
        root_bead_id,
        result.reason || 'repair_dispatch_failed',
        'repair_dispatch',
        failure_key,
        fact?.evidence
      );
    }
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
    const expected_repair =
      intent.subject?.role === 'repair' ? intent.subject.bead_id : null;
    const active_failure = intent.active_op?.failure_key;
    if (
      intent.active_op !== null &&
      (intent.active_op?.kind !== 'merge_subject' ||
        intent.active_op.attempt_id !== null ||
        intent.active_op.repair_bead_id !== expected_repair ||
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
      repair_bead_id: expected_repair,
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
          repair_bead_id: null,
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
   * The `human` branch of {@link settleFailure} (UI-hk74 §4) — nothing else
   * calls it. Reaching it means the §3 tables have no automatic answer for this
   * reason, so `needs_human` again means what it says.
   *
   * @param {string} root_bead_id
   * @param {string} reason
   * @param {string} stage
   * @param {any} [failure_key]
   * @param {any} [evidence]
   */
  function terminalize(
    root_bead_id,
    reason,
    stage,
    failure_key = null,
    evidence = null
  ) {
    const text =
      evidence === null
        ? null
        : typeof evidence === 'string'
          ? evidence
          : JSON.stringify(evidence);
    deps.store.terminalizeCompletionIntent(deps.workspace, {
      root_bead_id,
      terminal: {
        reason,
        stage,
        failure_key,
        evidence: typeof text === 'string' ? text.slice(-4000) : null,
        log_path:
          typeof evidence?.log_path === 'string' ? evidence.log_path : null,
        at: now()
      }
    });
    notify();
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
      repair_bead_id: op?.repair_bead_id ?? null,
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
    if (policy.class === 'auto_review') {
      const entry = Array.isArray(queue.merge_queue)
        ? queue.merge_queue.find(
            (/** @type {any} */ item) => item?.bead_id === root_bead_id
          )
        : null;
      // One automatic review per root. A gate that asks for a receipt again
      // after one has already been produced is saying the automatic lane cannot
      // satisfy it, which is a human question.
      if (existing?.class === 'auto_review' || entry?.head_review) {
        terminalize(
          root_bead_id,
          `auto_review_exhausted:${reason}`,
          stage,
          failure_key,
          evidence
        );
        return;
      }
      // Enrolment is ONE revision (UI-hk74 §6.2): the `reviewing` phase, the
      // merge-queue authority, and the prerecorded journal. Anything less is
      // not a dispatchable state — reconcile reads a `reviewing` intent with no
      // journal as a torn write and stops for a human — so a refused write
      // stops here instead of leaving a half-enrolled row behind.
      const enrolled = deps.store.enrolAutoReview(deps.workspace, {
        root_bead_id,
        resolution: {
          class: 'auto_review',
          origin_reason: reason,
          origin_stage: stage,
          return_phase: policy.return_phase,
          attempts: 1,
          next_at: null,
          last_error: null,
          op: autoResolutionOp(intent, queue, { ...extras, failure_key })
        },
        // §6.1: the authority names the head this observation READ. Falling
        // back to the pinned subject keeps a caller that has no fresh reading
        // enrolable, and the dispatch-time equality check below is what makes
        // that fallback safe — a pin that no longer matches the live head stops
        // for a human instead of reviewing the wrong commit.
        head_sha:
          typeof extras.observed_head_sha === 'string' &&
          extras.observed_head_sha.length > 0
            ? extras.observed_head_sha
            : intent.subject?.head_sha,
        target_base: intent.target_base,
        reviewer: UNRESOLVED_REVIEWER,
        effort: UNRESOLVED_REVIEW_EFFORT
      });
      if (!enrolled.ok) {
        terminalize(
          root_bead_id,
          'auto_review_enrol_failed',
          stage,
          failure_key,
          evidence
        );
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
      return {
        state:
          gated.subject?.role === 'repair' ? 'repair_pr_merged' : 'completed',
        gated
      };
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
        evidence: failure
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
    const waiting_repair = intent.phase === 'waiting_repair_pr';
    const repair_bead_id = waiting_repair
      ? intent.repair_bead_ids[intent.repair_bead_ids.length - 1]
      : null;
    const role =
      waiting_repair || intent.subject?.role === 'repair' ? 'repair' : 'root';
    const subject_bead_id = waiting_repair
      ? repair_bead_id
      : intent.subject.bead_id;
    if (typeof subject_bead_id !== 'string' || subject_bead_id.length === 0) {
      const fact = {
        state: /** @type {const} */ ('undecidable'),
        reason: 'repair_subject_missing'
      };
      facts.set(root_bead_id, fact);
      return fact;
    }
    let gated;
    try {
      gated = await deps.prActions.completionGate(subject_bead_id, role);
    } catch (err) {
      log('completion gate failed for %s: %o', root_bead_id, err);
      gated = { ok: false, reason: 'completion_gate_spawn_failed' };
    }
    let fact = factFromGate(gated);
    if (waiting_repair && gated.ok === true) {
      fact = { state: 'repair_pr_open', gated };
    }
    if (
      gated.ok === true &&
      !waiting_repair &&
      (intent.subject.head_sha !== gated.subject.head_sha ||
        intent.subject.base_sha !== gated.subject.base_sha ||
        intent.subject.pr_url !== gated.subject.pr_url)
    ) {
      fact = { state: 'stale', gated };
    }
    if (
      fact.state === 'completed' &&
      intent.subject.role === 'root' &&
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
   * @param {string} root_bead_id
   * @param {'resume_root'|'create_repair'} kind
   * @param {any} fact
   * @param {{ repair_bead_id?: string|null, continuation?: { continuation: 'prior_session'|'fresh_current', decision_token: string }|null }|null} [pinned] - The
   * §3 durable inputs a RETRY re-runs on. Absent on a first dispatch, which
   * has nothing pinned yet and reads the live record instead.
   */
  async function startRepair(root_bead_id, kind, fact, pinned = null) {
    const queue = deps.store.snapshot(deps.workspace);
    const current = queue.completion_intents?.[root_bead_id];
    const failure_key = fact?.failure_key;
    if (!current || !failure_key) {
      settleFailure(root_bead_id, 'repair_evidence_missing', 'repair_dispatch');
      return;
    }
    // This is an AUTOMATIC dispatch, so it answers to the pinned policy's
    // decoder guard. Without it a consumer that cannot read the pinned contract
    // would still open sessions from this lane. The workspace `auto_repair`
    // toggle is gone with the RepoOperation repair lane (UI-s582 §1), so this
    // is the only remaining gate. It does not terminalize the intent — the
    // failure stays exactly where it is, waiting for a re-pinned contract.
    if (!repoOperationPolicySupported()) {
      return;
    }
    if (current.repair_sessions_used >= REPAIR_SESSION_CAP) {
      settleFailure(
        root_bead_id,
        'repair_session_budget_exhausted',
        'repair_dispatch',
        failure_key,
        fact.evidence
      );
      return;
    }
    if (kind === 'resume_root') {
      const op_id = operationIdentity(
        root_bead_id,
        kind,
        failure_key,
        current.repair_sessions_used + 1
      );
      const queue = deps.store.snapshot(deps.workspace);
      const continuation_action = queue.merge_queue?.find(
        (/** @type {any} */ entry) => entry.bead_id === root_bead_id
      )?.continuation_action;
      // A retry re-dispatches on the SAME continuation decision the failed run
      // carried (§3): re-reading the live record would let a decision the user
      // has since changed — or one the failure itself never persisted — silently
      // become a different dispatch.
      const continuation = pinned?.continuation
        ? {
            continuation: pinned.continuation.continuation,
            decision_token: pinned.continuation.decision_token
          }
        : continuation_action?.subject_bead_id === current.subject.bead_id &&
            (continuation_action.continuation === 'prior_session' ||
              continuation_action.continuation === 'fresh_current') &&
            continuation_action.decision_token
          ? {
              continuation: continuation_action.continuation,
              decision_token: continuation_action.decision_token
            }
          : {};
      const result = await deps.scheduler.dispatchCompletionRepair(
        deps.workspace,
        {
          root_bead_id,
          op: {
            op_id,
            kind,
            failure_key,
            attempt_id: `${op_id}-attempt`,
            repair_bead_id: null,
            status: 'prepared'
          },
          log_path: fact.evidence?.log_path ?? null,
          ...continuation
        }
      );
      if (result.continuation_mismatch) {
        const persisted = deps.store.requireMergeContinuation(deps.workspace, {
          bead_id: root_bead_id,
          subject_bead_id: current.subject.bead_id,
          mismatch: result.continuation_mismatch
        });
        if (!persisted.ok) {
          settleFailure(
            root_bead_id,
            'continuation_persist_failed',
            'repair_dispatch',
            failure_key,
            fact.evidence,
            {
              continuation: continuation.continuation ? continuation : null,
              continuation_mismatch: String(result.continuation_mismatch)
            }
          );
        }
        notify();
        return;
      }
      if (!result.ok) {
        settleFailure(
          root_bead_id,
          result.reason || 'repair_dispatch_failed',
          'repair_dispatch',
          failure_key,
          fact.evidence,
          { continuation: continuation.continuation ? continuation : null }
        );
      } else if (continuation_action) {
        deps.store.clearMergeContinuation(deps.workspace, {
          bead_id: root_bead_id,
          subject_bead_id: current.subject.bead_id
        });
        notify();
      }
      return;
    }

    const create_op_id = operationIdentity(
      root_bead_id,
      'create_repair',
      failure_key,
      current.repair_sessions_used + 1
    );
    const prepared = deps.store.prepareCompletionOp(deps.workspace, {
      root_bead_id,
      phase: 'repairing',
      op: {
        op_id: create_op_id,
        kind: 'create_repair',
        failure_key,
        attempt_id: null,
        // §3: a repair Bead already created by the failed run is carried into
        // the re-run, so it reads back and records instead of creating a
        // second linked Bead for the same failure.
        repair_bead_id:
          typeof pinned?.repair_bead_id === 'string'
            ? pinned.repair_bead_id
            : null,
        status: 'prepared'
      }
    });
    if (!prepared.ok) {
      settleFailure(
        root_bead_id,
        'repair_create_prerecord_failed',
        'repair_create',
        failure_key
      );
      return;
    }
    notify();
    await continueCreateRepair(root_bead_id, fact);
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
    if (policy.effect === 'create_repair') {
      return (
        after.repair_bead_ids.length > before.repair_bead_ids.length ||
        after.active_op?.kind === 'dispatch_repair'
      );
    }
    if (policy.effect === 'dispatch_repair') {
      return typeof after.active_op?.attempt_id === 'string';
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
    // record is what makes a retry after a restart repeat the SAME effect
    // rather than open a second repair Bead or ask the continuation question
    // again.
    const fact = { failure_key: resolution.op.failure_key, evidence: null };
    const pinned = {
      repair_bead_id: resolution.op.repair_bead_id,
      continuation: resolution.op.continuation
    };
    let gate_ok = false;
    if (policy.effect === 'create_repair') {
      await startRepair(root_bead_id, 'create_repair', fact, pinned);
    } else if (policy.effect === 'dispatch_repair') {
      // A repair Bead in the record means the create half already landed, so the
      // re-run is the linked-repair dispatch; without one the failure belonged to
      // the root's own resume.
      await startRepair(
        root_bead_id,
        resolution.op.repair_bead_id ? 'create_repair' : 'resume_root',
        fact,
        pinned
      );
    } else if (policy.effect === 'retry_cleanup') {
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
      if (op.kind === 'create_repair') {
        await continueCreateRepair(root_bead_id, {
          failure_key: op.failure_key,
          evidence: fact.evidence
        });
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
      if (op.kind === 'resume_root' || op.kind === 'dispatch_repair') {
        let attempt = deps.store.snapshot(deps.workspace).attempts?.[
          op.attempt_id
        ];
        if (!attempt) {
          settleFailure(
            root_bead_id,
            'repair_attempt_missing',
            'reconciliation',
            op.failure_key
          );
          return;
        }
        if (attempt.status === 'paused') {
          if (typeof deps.store.adoptLegacyCompletionAttempt === 'function') {
            const adopted = deps.store.adoptLegacyCompletionAttempt(
              deps.workspace,
              { root_bead_id }
            );
            if (adopted.ok) {
              attempt =
                adopted.queue.attempts?.[
                  adopted.queue.completion_intents?.[root_bead_id]?.active_op
                    ?.attempt_id
                ] || attempt;
              notify();
            } else if (
              adopted.reason !== 'legacy_descendant_missing' &&
              adopted.reason !== 'legacy_adoption_not_applicable'
            ) {
              settleFailure(
                root_bead_id,
                'repair_resume_lineage_ambiguous',
                'reconciliation',
                op.failure_key,
                adopted.reason || 'legacy_lineage_ambiguous'
              );
              return;
            }
          }
        }
        if (attempt.status === 'running' || attempt.status === 'paused') {
          if (op.status === 'prepared') {
            deps.store.advanceCompletionOp(deps.workspace, {
              root_bead_id,
              op_id: op.op_id,
              status: 'dispatched'
            });
            notify();
          }
          return;
        }
        await onAttemptSettled({
          root_bead_id,
          op_id: op.op_id,
          failure_key: op.failure_key,
          attempt
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
    if (action.kind === 'probe') {
      const ownership = await deps.completionRepair.probeOwnership({
        root_bead_id,
        source: fact.source,
        failure_key: fact.failure_key
      });
      if (ownership.state === 'repo_operation') {
        return;
      }
      if (ownership.state === 'pr_owned') {
        await startRepair(root_bead_id, 'resume_root', fact);
      } else if (ownership.state === 'base_owned') {
        await startRepair(root_bead_id, 'create_repair', {
          ...fact,
          evidence: ownership.evidence || fact.evidence
        });
      } else {
        settleFailure(
          root_bead_id,
          ownership.reason || 'ownership_undecidable',
          'base_probe',
          fact.failure_key,
          ownership.evidence || fact.evidence
        );
      }
      return;
    }
    if (action.kind === 'resume_root' || action.kind === 'create_repair') {
      await startRepair(root_bead_id, action.kind, fact);
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
            repair_bead_id:
              current.subject.role === 'repair'
                ? current.subject.bead_id
                : null,
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
    if (action.kind === 'dispatch_auto_review') {
      // The reviewer transport owns this effect. Without one the row waits in
      // `reviewing` on its prerecorded journal, which is the one state a second
      // dispatch could not corrupt.
      if (typeof deps.dispatchAutoReview !== 'function') {
        return;
      }
      /** @type {{ state?: string, reason?: string|null }} */
      let dispatched;
      try {
        dispatched = (await deps.dispatchAutoReview(root_bead_id)) || {};
      } catch (err) {
        log('auto review dispatch threw for %s: %o', root_bead_id, err);
        dispatched = { state: 'halted', reason: 'dispatch_threw' };
      }
      if (dispatched.state === 'halted') {
        // §10: a dispatch that could not even start is NOT a retry candidate.
        // Retrying it means risking a second reviewer against the same head,
        // and duplicate review lineage is worse than a human question.
        settleFailure(
          root_bead_id,
          'auto_review_dispatch_failed',
          'auto_review',
          fact.failure_key,
          dispatched.reason ?? null
        );
        return;
      }
      notify();
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
      settleFailure(
        root_bead_id,
        action.reason || 'completion_needs_human',
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
    const bead_id = input.attempt?.bead_id;
    const role = bead_id === input.root_bead_id ? 'root' : 'repair';
    let gated;
    try {
      gated = await deps.prActions.completionGate(bead_id, role);
    } catch {
      gated = null;
    }
    const is_repair = role === 'repair';
    const next_phase =
      queue.auto_merge === true
        ? is_repair && gated?.ok !== true
          ? 'waiting_repair_pr'
          : 'gating'
        : 'paused';
    const advanced = deps.store.advanceCompletionOp(deps.workspace, {
      root_bead_id: input.root_bead_id,
      op_id: input.op_id,
      status: 'consumed',
      next_phase,
      ...(gated?.ok === true ? { subject: gated.subject } : {}),
      clear: true
    });
    if (!advanced.ok) {
      settleFailure(
        input.root_bead_id,
        'repair_settlement_record_failed',
        'repair_settlement',
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
    if (merged && result.ok === true && subject_bead_id !== root_bead_id) {
      const prior_subject =
        intent.subject_stack?.[intent.subject_stack.length - 1];
      if (!prior_subject) {
        settleFailure(
          root_bead_id,
          'repair_lineage_missing',
          'subject_restore'
        );
        return;
      }
      let prior_gate;
      try {
        prior_gate = await deps.prActions.completionGate(
          prior_subject.bead_id,
          prior_subject.role
        );
      } catch {
        prior_gate = null;
      }
      if (prior_gate?.ok === true) {
        const cleanup_pending =
          prior_gate.subject.role === 'root' &&
          prior_gate.subject.merged_sha !== null;
        const transitioned = deps.store.restoreCompletionSubject(
          deps.workspace,
          {
            root_bead_id,
            phase: cleanup_pending ? 'cleaning' : 'gating',
            subject: prior_gate.subject
          }
        );
        if (!transitioned.ok) {
          settleFailure(
            root_bead_id,
            'subject_restore_record_failed',
            'subject_restore'
          );
          return;
        }
        notify();
        if (cleanup_pending) {
          const fact = cleanupFact(
            root_bead_id,
            transitioned.queue.completion_intents[root_bead_id],
            transitioned.queue
          );
          await startCleanupReplay(root_bead_id, fact);
        }
        return;
      }
      settleFailure(
        root_bead_id,
        prior_gate?.reason || 'subject_restore_failed',
        'subject_restore'
      );
      return;
    }
    if (merged && subject_bead_id !== root_bead_id) {
      settleFailure(
        root_bead_id,
        result?.reason || 'repair_cleanup_failed',
        result?.cleanup_step || 'repair_cleanup',
        null,
        result
      );
      return;
    }
    if (result?.reason === 'resolution_round_cap') {
      settleFailure(root_bead_id, result.reason, 'conflict_resolution');
      return;
    }
    let gated;
    try {
      gated = await deps.prActions.completionGate(
        subject_bead_id,
        subject_bead_id === root_bead_id ? 'root' : 'repair'
      );
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
    onMergeResult
  };
}
