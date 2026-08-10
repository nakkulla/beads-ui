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
 * @typedef {CompletionFact & { gated?: any, source?: string, failure_key?: any, evidence?: any }} ObservedCompletionFact
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

const REPAIR_SESSION_CAP = 2;

/**
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
 *   prActions: { completionGate: (bead_id: string, role?: 'root'|'repair') => Promise<any> },
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
      /** @type {ObservedCompletionFact} */
      const fact = { state: 'waiting', reason: 'cleanup_in_flight' };
      facts.set(root_bead_id, fact);
      return fact;
    }
    const role = intent.subject?.role === 'repair' ? 'repair' : 'root';
    let gated;
    try {
      gated = await deps.prActions.completionGate(intent.subject.bead_id, role);
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
      if (current.subject.role !== 'root') {
        terminalize(
          root_bead_id,
          'repair_subject_red',
          'repair_dispatch',
          failure_key,
          fact.evidence
        );
        return;
      }
      const op_id = operationIdentity(root_bead_id, kind, failure_key);
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
          log_path: fact.evidence?.log_path ?? null
        }
      );
      if (!result.ok) {
        terminalize(
          root_bead_id,
          result.reason || 'repair_dispatch_failed',
          'repair_dispatch',
          failure_key,
          fact.evidence
        );
      }
      return;
    }

    const create_op_id = operationIdentity(
      root_bead_id,
      'create_repair',
      failure_key
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
    let linked;
    try {
      linked = await deps.completionRepair.ensureLinkedBead({
        root_bead_id,
        op_id: create_op_id,
        failure_key
      });
    } catch (err) {
      terminalize(
        root_bead_id,
        'repair_bead_create_failed',
        'repair_create',
        failure_key,
        String(err)
      );
      return;
    }
    const recorded = deps.store.recordCompletionRepairBead(deps.workspace, {
      root_bead_id,
      op_id: create_op_id,
      repair_bead_id: linked.bead_id
    });
    if (!recorded.ok) {
      terminalize(
        root_bead_id,
        'repair_bead_record_failed',
        'repair_create',
        failure_key
      );
      return;
    }
    const consumed = deps.store.advanceCompletionOp(deps.workspace, {
      root_bead_id,
      op_id: create_op_id,
      status: 'consumed',
      next_phase: 'repairing',
      clear: true
    });
    if (!consumed.ok) {
      terminalize(
        root_bead_id,
        'repair_create_consume_failed',
        'repair_create',
        failure_key
      );
      return;
    }
    notify();
    const dispatch_op_id = operationIdentity(
      root_bead_id,
      'dispatch_repair',
      failure_key
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
        log_path: fact.evidence?.log_path ?? null
      }
    );
    if (!result.ok) {
      terminalize(
        root_bead_id,
        result.reason || 'repair_dispatch_failed',
        'repair_dispatch',
        failure_key,
        fact.evidence
      );
    }
  }

  /**
   * @param {string} root_bead_id
   * @param {CompletionAction} action
   * @param {any} intent
   */
  async function onAction(root_bead_id, action, intent) {
    const fact = facts.get(root_bead_id) || { state: 'waiting' };
    if (action.kind === 'gate') {
      if (fact.gated?.subject) {
        deps.store.setCompletionSubject(deps.workspace, {
          root_bead_id,
          phase: 'gating',
          subject: fact.gated.subject
        });
        notify();
      }
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
      if (intent.phase !== 'merging') {
        deps.store.setCompletionSubject(deps.workspace, {
          root_bead_id,
          phase: 'merging',
          subject: fact.gated?.subject || intent.subject
        });
        notify();
      }
      if (typeof deps.kickMerge === 'function') {
        await deps.kickMerge();
      }
      return;
    }
    if (action.kind === 'pause') {
      deps.store.pauseCompletionIntent(deps.workspace, { root_bead_id });
      notify();
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
    const next_phase = queue.auto_merge === true ? 'gating' : 'paused';
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
    const intent = deps.store.snapshot(deps.workspace).completion_intents?.[
      root_bead_id
    ];
    if (!intent) {
      return;
    }
    const merged =
      result &&
      (result.action === 'merged' ||
        result.action === 'updated_and_merged' ||
        result.action === 'already_merged');
    if (merged && result.ok === true && subject_bead_id === root_bead_id) {
      return;
    }
    if (merged && result.ok === true && subject_bead_id !== root_bead_id) {
      let root_gate;
      try {
        root_gate = await deps.prActions.completionGate(root_bead_id, 'root');
      } catch {
        root_gate = null;
      }
      if (root_gate?.ok === true) {
        deps.store.setCompletionSubject(deps.workspace, {
          root_bead_id,
          phase: 'gating',
          subject: root_gate.subject
        });
        notify();
        return;
      }
      terminalize(
        root_bead_id,
        root_gate?.reason || 'root_regate_failed',
        'root_regate'
      );
      return;
    }
    if (
      result?.reason === 'resolution_round_cap' ||
      result?.reason === 'resolution_timeout'
    ) {
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

  return { observe, onAction, onAttemptSettled, onMergeResult };
}
