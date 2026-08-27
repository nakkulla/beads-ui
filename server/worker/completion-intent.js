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
import {
  UNRESOLVED_REVIEWER,
  UNRESOLVED_REVIEW_EFFORT
} from './head-review.js';
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
 * @type {Readonly<Record<string, 'metadata_watch'|'auto_review'|'retry'|'human'>>}
 */
export const COMPLETION_FAILURE_POLICY = Object.freeze({
  receipt_unbacked: 'metadata_watch',
  spec_id_missing: 'metadata_watch',
  review_receipt_missing: 'auto_review',
  review_receipt_stale: 'auto_review',
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
 * @typedef {{ kind: 'gate'|'enter_cleanup'|'resume_intent'|'merge_subject'|'retry_cleanup'|'reconcile_op'|'resume_metadata_check'|'dispatch_auto_review'|'retry_failed_op'|'pause'|'needs_human'|'complete', reason?: string, terminal?: boolean }} CompletionAction
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
 * The cause a terminal `needs_human` records for an observed failure (UI-8w4t
 * §1). The order is what the RECORDS actually carry: a cleanup entry names its
 * contract token in `failure_code`, falls back to its own raw `reason`, and
 * only then to the reason the failure key was built from. Reading `failure.code`
 * — the RepoOperation card's field — would have found nothing on any of them.
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
      return candidate;
    }
  }
  return 'cleanup_failed';
}

/**
 * Decide one next action from an already-normalized durable intent and one
 * authoritative fact. The function is pure so reconciliation and live paths
 * share the same judgment.
 *
 * @param {{ auto_merge: boolean, intent: any, fact?: ObservedCompletionFact|null, head_review?: any, now?: number }} input
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
      // The one automatic step (`script_retry`) is already spent by the time a
      // cleanup failure reaches here, and the failure card already carries the
      // cause and the retry outcome. Waiting longer buys nothing, so the saga
      // stops with the cause a human can act on (UI-8w4t §1).
      return {
        kind: 'needs_human',
        reason: completionFailureReason(fact),
        terminal: true
      };
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
    return { kind: 'needs_human', reason: 'intent_state_invalid' };
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
    return { kind: 'needs_human', reason: 'verify_red', terminal: true };
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
 * The failure hand-off comment (UI-8w4t §4). The log is POINTED at, never
 * inlined: a verify log is large and can carry secrets, and the path is what a
 * human opens anyway.
 *
 * @param {any} intent
 * @param {any} queue
 * @param {any} terminal
 * @returns {string}
 */
export function completionFailureComment(intent, queue, terminal) {
  const sentence = Object.hasOwn(FAILURE_SENTENCES, terminal.reason)
    ? FAILURE_SENTENCES[terminal.reason]
    : null;
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
  return [
    '## 🤖 완료 실패 기록',
    `- 단계: ${publicFailureStage(terminal)}`,
    `- 원인: ${terminal.reason}${sentence ? ` — ${sentence}` : ''}`,
    `- 대상: ${target_sha} (base ${target_base})`,
    `- 로그: ${terminal.log_path || '(없음)'}`,
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
      reason
    );
    const at = now();
    const terminal = {
      reason,
      stage,
      failure_key,
      evidence: typeof text === 'string' ? text.slice(-4000) : null,
      log_path,
      op_id: resolved_op_id,
      comment_at: commented_at === null ? at : commented_at,
      at
    };
    const written = deps.store.terminalizeCompletionIntent(deps.workspace, {
      root_bead_id,
      terminal
    });
    notify();
    if (written.ok && commented_at === null) {
      postFailureComment(root_bead_id, intent, queue, terminal);
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
   */
  function postFailureComment(root_bead_id, intent, queue, terminal) {
    if (typeof deps.bd?.comment !== 'function') {
      return;
    }
    const comment = deps.bd.comment;
    const text = completionFailureComment(intent, queue, terminal);
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
      const reason = action.reason || 'completion_needs_human';
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
