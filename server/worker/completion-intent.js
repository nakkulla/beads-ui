/**
 * Durable completion-intent coordinator kernel.
 *
 * This module decides the next owner/action from durable state. It does not
 * spawn sessions, create Beads, merge PRs, or run cleanup. Those effects stay
 * behind injected owners and must prerecord their operation in queue-store
 * before executing.
 */
import { createHash } from 'node:crypto';

const OUTPUT_TAIL_MAX = 4_000;
const CHECKS_MAX = 100;
const CHECK_FIELD_MAX = 200;
const REASON_MAX = 500;

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
 * @typedef {'green'|'conflict'|'verify_red'|'ci_red'|'pr_owned'|'base_owned'|'repair_created'|'cleanup_red'|'repair_pr_open'|'repair_pr_merged'|'completed'|'stale'|'undecidable'|'waiting'} CompletionFactState
 */
/**
 * @typedef {{ state: CompletionFactState, reason?: string }} CompletionFact
 */
/**
 * @typedef {{ kind: 'gate'|'probe'|'resume_root'|'create_repair'|'dispatch_repair'|'merge_subject'|'retry_cleanup'|'pause'|'needs_human'|'complete', reason?: string }} CompletionAction
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
    return intent.active_op ? null : { kind: 'pause' };
  }
  if (intent.active_op) {
    return null;
  }
  if (intent.phase === 'paused') {
    return { kind: 'gate' };
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
  if (intent.phase === 'cleaning' || fact.state === 'cleanup_red') {
    return fact.state === 'cleanup_red' ? { kind: 'retry_cleanup' } : null;
  }
  if (intent.phase === 'waiting_repair_pr') {
    if (fact.state === 'repair_pr_open') {
      return { kind: 'merge_subject' };
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
 *   onAttemptSettled?: (input: any) => Promise<void>|void,
 *   log?: (...args: any[]) => void
 * }} deps
 */
export function createCompletionIntentCoordinator(deps) {
  const workspace = deps.workspace;
  const observe = deps.observe || (() => ({ state: 'waiting' }));
  const onAction = deps.onAction || (() => {});
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
    const head = Array.isArray(queue.merge_queue) ? queue.merge_queue[0] : null;
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
