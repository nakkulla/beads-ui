/**
 * Durable completion-intent coordinator kernel.
 *
 * This module decides the next owner/action from durable state. It does not
 * spawn sessions, create Beads, merge PRs, or run cleanup. Those effects stay
 * behind injected owners and must prerecord their operation in queue-store
 * before executing.
 */
import { createHash } from 'node:crypto';
import { isRepairableCleanupFailure } from './completion-repair-policy.js';
import { RESOLUTION_ROUND_CAP, RESOLUTION_WAIT_MS } from './merge-queue.js';

const OUTPUT_TAIL_MAX = 4_000;
const CHECKS_MAX = 100;
const CHECK_FIELD_MAX = 200;
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
 * SHAs. The digest input is bounded and normalized so check ordering and line
 * endings cannot manufacture distinct repair operations for the same result.
 *
 * @param {{
 *   stage: string,
 *   reason: string,
 *   subject_sha: string,
 *   base_sha: string,
 *   evidence?: { output_tail?: unknown, checks?: unknown }
 * }} input
 */
export function createCompletionFailureKey(input) {
  const evidence = input.evidence || {};
  const output_tail =
    typeof evidence.output_tail === 'string'
      ? evidence.output_tail.replace(/\r\n?/g, '\n').slice(-OUTPUT_TAIL_MAX)
      : '';
  /** @type {{ name: string, conclusion: string }[]} */
  const checks = [];
  if (Array.isArray(evidence.checks)) {
    for (const raw of evidence.checks) {
      if (
        !raw ||
        typeof raw !== 'object' ||
        Array.isArray(raw) ||
        typeof raw.name !== 'string' ||
        typeof raw.conclusion !== 'string'
      ) {
        continue;
      }
      checks.push({
        name: raw.name.slice(0, CHECK_FIELD_MAX),
        conclusion: raw.conclusion.slice(0, CHECK_FIELD_MAX)
      });
    }
  }
  checks.sort((left, right) => {
    const by_name = left.name.localeCompare(right.name);
    return by_name || left.conclusion.localeCompare(right.conclusion);
  });
  const normalized = JSON.stringify({
    reason: String(input.reason || '').slice(0, REASON_MAX),
    output_tail,
    checks: checks.slice(0, CHECKS_MAX)
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
 * @typedef {'green'|'conflict'|'verify_red'|'ci_red'|'pr_owned'|'base_owned'|'repair_created'|'cleanup_repairable'|'cleanup_pending'|'cleanup_red'|'repair_pr_open'|'repair_pr_merged'|'completed'|'stale'|'undecidable'|'waiting'} CompletionFactState
 */
/**
 * @typedef {{ state: CompletionFactState, reason?: string }} CompletionFact
 */
/**
 * @typedef {CompletionFact & { gated?: any, source?: string, failure_key?: any, evidence?: any }} ObservedCompletionFact
 */
/**
 * @typedef {{ kind: 'gate'|'probe'|'enter_cleanup'|'resume_intent'|'resume_root'|'create_repair'|'dispatch_repair'|'merge_subject'|'retry_cleanup'|'reconcile_op'|'pause'|'needs_human'|'complete', reason?: string }} CompletionAction
 */

/**
 * Decide one next action from an already-normalized durable intent and one
 * authoritative fact. The function is pure so reconciliation and live paths
 * share the same judgment.
 *
 * @param {{ auto_merge: boolean, intent: any, fact?: CompletionFact|null }} input
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
      return { kind: 'create_repair' };
    }
    if (fact.state === 'cleanup_pending') {
      return { kind: 'retry_cleanup' };
    }
    if (fact.state === 'cleanup_red') {
      return {
        kind: 'needs_human',
        reason: fact.reason || 'cleanup_not_repairable'
      };
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
  if (
    fact.state === 'cleanup_repairable' ||
    fact.state === 'cleanup_pending' ||
    fact.state === 'cleanup_red'
  ) {
    return { kind: 'enter_cleanup' };
  }
  if (
    fact.state === 'green' ||
    fact.state === 'conflict' ||
    fact.state === 'repair_pr_merged'
  ) {
    return { kind: 'merge_subject' };
  }
  if (fact.state === 'verify_red' || fact.state === 'ci_red') {
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
 *   log?: (...args: any[]) => void
 * }} deps
 */
export function createCompletionIntentCoordinator(deps) {
  const workspace = deps.workspace;
  const observe = deps.observe || (() => ({ state: 'waiting' }));
  const onAction = deps.onAction || (() => {});
  const adoptLegacy = deps.adoptLegacy || (() => false);
  const log = deps.log || (() => {});
  let stopped = true;
  let pending = false;
  let running = false;
  /** @type {Promise<void>} */
  let current = Promise.resolve();
  /** @type {(() => void)|null} */
  let unsubscribe = null;

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
    const fact = await observe(root_bead_id, intent, queue);
    const action = decideCompletionAction({
      auto_merge: queue.auto_merge === true,
      intent,
      fact
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
      wake();
    },

    stop() {
      stopped = true;
      pending = false;
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
 *   now?: () => number,
 *   log?: (...args: any[]) => void
 * }} deps
 */
export function createCompletionActionDriver(deps) {
  const facts = new Map();
  const now = deps.now || (() => Date.now());
  const log = deps.log || (() => {});

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
      terminalize(
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
        terminalize(
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
        terminalize(
          root_bead_id,
          'repair_bead_readback_failed',
          'repair_create',
          create_op.failure_key
        );
        return;
      }
      const recorded = deps.store.recordCompletionRepairBead(deps.workspace, {
        root_bead_id,
        op_id: create_op.op_id,
        repair_bead_id: linked.bead_id
      });
      if (!recorded.ok) {
        terminalize(
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
      terminalize(
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
        terminalize(
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
   * Strictly re-adopt the one historical post-merge repair terminal caused by
   * the retired head-SHA dispatch guard. The store owns the complete atomic
   * predicate; this layer additionally verifies the deterministic create-op
   * identity it can derive from the preserved journal.
   *
   * @param {string} root_bead_id
   * @param {any} intent
   * @returns {Promise<boolean>}
   */
  async function adoptHistoricalStaleRepair(root_bead_id, intent) {
    const terminal = intent?.terminal_reason;
    const active_op = intent?.active_op;
    if (
      intent?.phase !== 'needs_human' ||
      terminal?.reason !== 'completion_subject_sha_stale' ||
      terminal.stage !== 'repair_dispatch' ||
      active_op?.kind !== 'create_repair' ||
      active_op.status !== 'observed' ||
      active_op.attempt_id !== null ||
      !active_op.failure_key ||
      active_op.op_id !==
        operationIdentity(
          root_bead_id,
          'create_repair',
          active_op.failure_key,
          intent.repair_sessions_used + 1
        ) ||
      typeof deps.store.adoptHistoricalStaleRepair !== 'function'
    ) {
      return false;
    }
    const adopted = deps.store.adoptHistoricalStaleRepair(deps.workspace, {
      root_bead_id
    });
    if (!adopted.ok) {
      return false;
    }
    notify();
    return true;
  }

  /**
   * Re-enter only a recognized historical terminal shape. The stale repair
   * record is checked first; all other historical records retain the retired
   * resolution-timeout adoption path.
   *
   * @param {string} root_bead_id
   * @param {any} intent
   * @param {any} queue
   * @returns {Promise<boolean>}
   */
  async function adoptHistoricalTerminal(root_bead_id, intent, queue) {
    if (await adoptHistoricalStaleRepair(root_bead_id, intent)) {
      return true;
    }
    return adoptLegacyTimeout(root_bead_id, intent, queue);
  }

  /**
   * @param {string} root_bead_id
   * @param {any} fact
   */
  async function startCleanupReplay(root_bead_id, fact) {
    if (typeof deps.prActions.resumeCompletionCleanup !== 'function') {
      terminalize(
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
        terminalize(
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
      terminalize(
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
        terminalize(
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
      terminalize(
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
    if (reason === 'verify_cmd_failed' || reason === 'ci_failed') {
      const verify = gated.evidence?.verify;
      const ci = gated.evidence?.ci;
      const failure_key = createCompletionFailureKey({
        stage: 'merge_gate',
        reason,
        subject_sha: gated.subject.head_sha,
        base_sha: gated.base_sha,
        evidence: {
          output_tail: verify?.output_tail,
          checks: ci?.checks
        }
      });
      return {
        state: reason === 'ci_failed' ? 'ci_red' : 'verify_red',
        source: reason === 'ci_failed' ? 'ci' : 'local_verify',
        failure_key,
        evidence: reason === 'ci_failed' ? ci : verify,
        gated
      };
    }
    if (
      reason === 'ci_pending' ||
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
    if (isRepairableCleanupFailure(failure)) {
      return {
        state: 'cleanup_repairable',
        source: 'local_verify',
        failure_key,
        evidence: failure
      };
    }
    return {
      state: 'cleanup_red',
      reason: `${failure.step || 'cleanup'}:${failure.reason}`,
      failure_key,
      evidence: failure
    };
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
   */
  async function startRepair(root_bead_id, kind, fact) {
    const current = deps.store.snapshot(deps.workspace).completion_intents?.[
      root_bead_id
    ];
    const failure_key = fact?.failure_key;
    if (!current || !failure_key) {
      terminalize(root_bead_id, 'repair_evidence_missing', 'repair_dispatch');
      return;
    }
    if (current.repair_sessions_used >= REPAIR_SESSION_CAP) {
      terminalize(
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
      const continuation =
        continuation_action?.subject_bead_id === current.subject.bead_id &&
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
          terminalize(
            root_bead_id,
            'continuation_persist_failed',
            'repair_dispatch',
            failure_key,
            fact.evidence
          );
        }
        notify();
        return;
      }
      if (!result.ok) {
        terminalize(
          root_bead_id,
          result.reason || 'repair_dispatch_failed',
          'repair_dispatch',
          failure_key,
          fact.evidence
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
        repair_bead_id: null,
        status: 'prepared'
      }
    });
    if (!prepared.ok) {
      terminalize(
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
          terminalize(
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
              terminalize(
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
      terminalize(
        root_bead_id,
        'reconciliation_ambiguous',
        'reconciliation',
        op.failure_key
      );
      return;
    }
    if (action.kind === 'gate') {
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
        terminalize(
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
        terminalize(
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
      if (ownership.state === 'pr_owned') {
        await startRepair(root_bead_id, 'resume_root', fact);
      } else if (ownership.state === 'base_owned') {
        await startRepair(root_bead_id, 'create_repair', {
          ...fact,
          evidence: ownership.evidence || fact.evidence
        });
      } else {
        terminalize(
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
          terminalize(
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
          terminalize(
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
      terminalize(
        root_bead_id,
        action.reason || 'completion_needs_human',
        'coordinator',
        fact.failure_key,
        fact.evidence
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
      terminalize(
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
      terminalize(
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
        terminalize(
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
        terminalize(
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
        terminalize(
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
        terminalize(root_bead_id, 'repair_lineage_missing', 'subject_restore');
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
          terminalize(
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
      terminalize(
        root_bead_id,
        prior_gate?.reason || 'subject_restore_failed',
        'subject_restore'
      );
      return;
    }
    if (merged && subject_bead_id !== root_bead_id) {
      terminalize(
        root_bead_id,
        result?.reason || 'repair_cleanup_failed',
        result?.cleanup_step || 'repair_cleanup',
        null,
        result
      );
      return;
    }
    if (result?.reason === 'resolution_round_cap') {
      terminalize(root_bead_id, result.reason, 'conflict_resolution');
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
    terminalize(
      root_bead_id,
      result?.reason || gated?.reason || 'completion_merge_failed',
      'merge_subject'
    );
  }

  return {
    observe,
    onAction,
    adoptHistoricalTerminal,
    adoptLegacyTimeout,
    onAttemptSettled,
    onMergeResult
  };
}
