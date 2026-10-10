/**
 * The failure conversation launcher behind a 실패 row's `[세션에서 이어가기]`
 * (UI-jw27 §4, UI-18a5 §3.2).
 *
 * A terminal failure the Worker cannot retry away lands the bead on
 * `needs_human`, and ADR 0005 forbids dispatching an automatic repair session
 * for it. What this module starts is NOT that: it is the interactive session a
 * person would otherwise open by hand in a terminal, started by their own
 * CLICK, marked so the external `claude-discord-bridge` relays it. Its first
 * input is the dotfiles entry block (`direction-inquiry.js`), and its record
 * carries a `conversation` so the reconcile pass observes its result line like
 * every other Worker session conversation (UI-18a5 §3.4).
 *
 * Two properties are load-bearing:
 *
 *   - FORK, NOT RESUME. The recorded session is opened with
 *     `--resume … --fork-session`, so the original transcript stays immutable
 *     and the Worker's own later resume of that session cannot be interleaved
 *     with this one.
 *   - THE REFUSAL IS REPORTED. When the recorded session cannot be forked the
 *     launch still happens — as a FRESH session — and the reason travels in the
 *     reply. A fallback that looked identical to a fork would hide the fact
 *     that the new session has none of the bead's context.
 *
 * The duplicate guard is the pane marker, which is one truth for the whole
 * machine: at most one live resolution session per bead.
 */
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { isImplementationAttempt } from '../../app/utils/active-attempts.js';
import { DEFAULT_INQUIRY_TMUX_SESSION } from '../config.js';
import {
  conversationAutoLaunchEnabled,
  freshConversationRuntime,
  getConversationSettings
} from '../conversation-settings.js';
import { debug } from '../logging.js';
import { PRE_MERGE_HOLD_NOTIFY_LABEL } from './completion-intent.js';
import {
  failureConversationReason,
  fillConversationEntry
} from './direction-inquiry.js';
import { discardOperationActive } from './discard-phase.js';
import { holdsHandoffReservation } from './queue-store.js';
import { qualifyInteractiveForkSource } from './session-ref.js';
import {
  RESOLVE_PANE_MARKER,
  createTmuxLauncher,
  shellQuote
} from './tmux-launcher.js';

const default_log = debug('worker:resolve-session');

/**
 * The interactive fork argv for one provider (codex-orchestration-parity §4.2).
 *
 * The recorded session's OWN provider is what runs: forking a codex thread from
 * a claude CLI is not a fallback, it is a different session. Codex's measured
 * interactive form is `codex fork <SESSION_ID> [PROMPT]`, passed as argv and
 * never re-evaluated by a shell.
 *
 * @param {'claude'|'codex'} runner
 * @param {string} session_id
 * @param {string} prompt
 * @param {string|null} launch_session_id
 * @returns {string[]}
 */
function forkArgs(runner, session_id, prompt, launch_session_id) {
  return runner === 'codex'
    ? ['fork', session_id, prompt]
    : [
        '--resume',
        session_id,
        '--fork-session',
        '--session-id',
        /** @type {string} */ (launch_session_id),
        prompt
      ];
}

/**
 * The command line the reply reports for a fork, in the same provider's
 * spelling.
 *
 * @param {'claude'|'codex'} runner
 * @param {string} session_id
 * @param {string|null} launch_session_id
 * @returns {string}
 */
function forkCommand(runner, session_id, launch_session_id) {
  return runner === 'codex'
    ? `codex fork ${shellQuote(session_id)}`
    : `claude --resume ${shellQuote(session_id)} --fork-session --session-id ${shellQuote(/** @type {string} */ (launch_session_id))}`;
}

/**
 * Completion-terminal stage → the failure CLASS a resolution prompt states.
 * The same words the `needs_human` push uses (spec §1), because the person
 * reading the Discord line and the person reading the session's first input are
 * the same person looking at the same failure.
 *
 * A stage outside this map keeps the generic class rather than being refiled
 * into one it cannot prove.
 *
 * @type {Readonly<Record<string, string>>}
 */
const COMPLETION_STAGE_CLASSES = Object.freeze({
  post_merge_jobs: 'post-merge 잡 실패',
  repo_operations: '배포 실패',
  deploy: '배포 실패',
  deployment_request: '배포 실패'
});

/** The class a `needs_human` terminal gets when its stage names none. */
const COMPLETION_DEFAULT_CLASS = '완료 중단';

/**
 * The row key prefix of a Bead-less repo-operation conversation (UI-jbl1
 * §3.3): its interactive record stands under `repo-op:<operation_id>` where a
 * Bead row's stands under its Bead id, so the record key reads
 * `repo-op:<operation_id>:resolve`.
 *
 * @type {string}
 */
export const REPO_OPERATION_ROW_PREFIX = 'repo-op:';

/** The `클래스:` word of a manual deploy failure (UI-jw27 §2). */
export const MANUAL_DEPLOY_FAILURE_CLASS = '수동 배포 실패';

/**
 * The conversation row key of one repo operation.
 *
 * @param {string} operation_id
 * @returns {string}
 */
export function repoOperationRowKey(operation_id) {
  return `${REPO_OPERATION_ROW_PREFIX}${operation_id}`;
}

/**
 * The repo-operation id a conversation row key names, or null for a Bead row.
 *
 * @param {unknown} row_key
 * @returns {string|null}
 */
export function repoOperationIdOf(row_key) {
  return typeof row_key === 'string' &&
    row_key.startsWith(REPO_OPERATION_ROW_PREFIX) &&
    row_key.length > REPO_OPERATION_ROW_PREFIX.length
    ? row_key.slice(REPO_OPERATION_ROW_PREFIX.length)
    : null;
}

/**
 * The failed MANUAL deploy a repo-operation row stands for, or null when the
 * record is gone, not a manual deploy, not failed, or already answered by a
 * successor (`superseded_by`) or a person (`dismissed`) — the same rule the
 * drawer's row actions draw by.
 *
 * @param {any} queue
 * @param {string} operation_id
 * @returns {any|null}
 */
export function failedManualDeploy(queue, operation_id) {
  const operation = queue?.repo_operations?.[operation_id];
  return operation &&
    typeof operation === 'object' &&
    operation.kind === 'deploy' &&
    operation.source === 'manual' &&
    operation.state === 'failed' &&
    !operation.superseded_by &&
    !operation.dismissed
    ? operation
    : null;
}

/**
 * The terminal failure a repo-operation row's conversation is about (UI-jbl1
 * §3.3, dotfiles `Worker 세션 대화` Bead-less row): the manual deploy failure
 * class and cause code, with the operation id, target SHA and deploy worktree
 * the situation adds.
 *
 * @param {any} queue
 * @param {string} operation_id
 * @returns {ResolveFailureContext|null}
 */
export function repoOperationFailureContext(queue, operation_id) {
  const operation = failedManualDeploy(queue, operation_id);
  if (!operation) {
    return null;
  }
  const failure = operation.failure || {};
  /**
   * @param {unknown} value
   * @returns {string|null}
   */
  const textOrNull = (value) =>
    typeof value === 'string' && value.length > 0 ? value : null;
  return {
    failure_class: MANUAL_DEPLOY_FAILURE_CLASS,
    reason: textOrNull(failure.code) ?? '원인 미상',
    stage: 'deploy',
    detail: textOrNull(failure.summary) ?? textOrNull(failure.detail),
    log_path: textOrNull(operation.log_path),
    operation_id,
    target_sha: textOrNull(operation.target_sha),
    deploy_worktree: textOrNull(operation.deploy_worktree)
  };
}

/**
 * @typedef {Object} ResolveFailureContext
 * @property {string} failure_class
 * @property {string} reason
 * @property {string|null} stage
 * @property {string|null} detail
 * @property {string|null} [log_path]
 * @property {'fix_commit_push'} [exit]
 * @property {string|null} [operation_id] - A repo-operation row's operation.
 * @property {string|null} [target_sha] - A repo-operation row's target.
 * @property {string|null} [deploy_worktree] - A repo-operation row's deploy
 * worktree.
 */

/**
 * The terminal failure a 실패 row's `[세션에서 이어가기]` click is about, read
 * off the queue snapshot the click was validated against.
 *
 * The order is most-terminal first. A ladder step's failure writes BOTH a
 * `cleanup_failed` record and — once the ladder is spent — a `needs_human`
 * completion terminal; the terminal is the wall the person actually hit, and
 * the cleanup record is the cursor position on the way there. A bead with
 * neither is not a failure row at all, and the caller refuses the click rather
 * than starting a session that could not say what it is for.
 *
 * @param {any} queue - Queue snapshot.
 * @param {string} bead_id
 * @returns {ResolveFailureContext|null}
 */
export function resolveFailureContext(queue, bead_id) {
  const operation_id = repoOperationIdOf(bead_id);
  if (operation_id !== null) {
    return repoOperationFailureContext(queue, operation_id);
  }
  const intent = queue?.completion_intents?.[bead_id];
  if (intent?.phase === 'holding' && intent.hold) {
    const hold = intent.hold;
    return {
      failure_class: PRE_MERGE_HOLD_NOTIFY_LABEL,
      reason: hold.reason,
      stage: 'verify',
      detail: typeof hold.summary === 'string' ? hold.summary || null : null,
      log_path:
        typeof hold.log_path === 'string' ? hold.log_path || null : null,
      exit: 'fix_commit_push'
    };
  }
  if (intent && intent.phase === 'needs_human') {
    const terminal = intent.terminal_reason || null;
    const stage =
      typeof terminal?.failure_key?.stage === 'string'
        ? terminal.failure_key.stage
        : typeof terminal?.stage === 'string'
          ? terminal.stage
          : null;
    return {
      failure_class:
        stage !== null && Object.hasOwn(COMPLETION_STAGE_CLASSES, stage)
          ? COMPLETION_STAGE_CLASSES[stage]
          : COMPLETION_DEFAULT_CLASS,
      reason:
        typeof terminal?.reason === 'string' ? terminal.reason : '원인 미상',
      stage,
      detail: typeof terminal?.evidence === 'string' ? terminal.evidence : null,
      log_path:
        typeof terminal?.log_path === 'string' && terminal.log_path.length > 0
          ? terminal.log_path
          : null
    };
  }
  // Match the deploy recovery row in wait-judgment, including a repair
  // handoff taking precedence over a later failure for the same subject.
  const deploy = Object.values(queue?.repo_operations || {}).find(
    (operation) =>
      operation?.kind === 'deploy' &&
      operation.state === 'failed' &&
      operation.recovery &&
      (operation.recovery.handoff?.handoff_bead_id ||
        ['wait', 'reconcile'].includes(operation.recovery.disposition) ||
        (operation.recovery.disposition === 'repair' &&
          operation.recovery.code_defect !== true)) &&
      !operation.superseded_by &&
      !operation.dismissed &&
      (operation.subjects || []).some(
        (/** @type {any} */ subject) => subject.bead_id === bead_id
      )
  );
  const recovery = deploy?.recovery;
  if (
    recovery &&
    !recovery.handoff?.handoff_bead_id &&
    !(queue?.done || []).some(
      (/** @type {any} */ row) => row.bead_id === bead_id
    )
  ) {
    return {
      failure_class: COMPLETION_STAGE_CLASSES.repo_operations,
      reason:
        typeof deploy.failure?.code === 'string'
          ? deploy.failure.code
          : '원인 미상',
      stage: 'repo_operations',
      detail:
        typeof deploy.failure?.summary === 'string'
          ? deploy.failure.summary
          : null,
      log_path:
        typeof deploy.log_path === 'string' && deploy.log_path.length > 0
          ? deploy.log_path
          : null
    };
  }
  const cleanup = queue?.cleanup_failed?.[bead_id];
  if (cleanup && typeof cleanup === 'object') {
    return {
      failure_class: '정리 중단',
      reason: typeof cleanup.reason === 'string' ? cleanup.reason : '원인 미상',
      stage: typeof cleanup.step === 'string' ? cleanup.step : null,
      detail: typeof cleanup.detail === 'string' ? cleanup.detail : null,
      log_path:
        typeof cleanup.log_path === 'string' && cleanup.log_path.length > 0
          ? cleanup.log_path
          : null
    };
  }
  const discard = failedDiscardOperation(queue, bead_id);
  if (discard) {
    return {
      failure_class: '폐기 실패',
      reason: discard.last_error,
      stage: typeof discard.phase === 'string' ? discard.phase : null,
      detail: null
    };
  }
  /** @type {any} */
  let latest = null;
  for (const attempt of Object.values(queue?.attempts || {})) {
    const record = /** @type {any} */ (attempt);
    if (record.bead_id === bead_id && isImplementationAttempt(record)) {
      latest = record;
    }
  }
  if (latest?.status === 'parked') {
    return {
      failure_class: '파킹',
      reason:
        typeof latest.cause_detail?.awaiting_user === 'string'
          ? latest.cause_detail.awaiting_user
          : '원인 미상',
      stage: null,
      detail:
        typeof latest.cause_detail?.summary === 'string'
          ? latest.cause_detail.summary
          : null
    };
  }
  return null;
}

/**
 * The `상황` slot of a failure conversation (dotfiles `Worker 세션 대화`):
 * class, cause code, stage, diagnosis and log path, in that order, on one
 * line; a repo-operation row adds its operation id, target SHA and deploy
 * worktree. A field with nothing behind it is left out.
 *
 * @param {ResolveFailureContext} failure
 * @returns {string}
 */
export function failureSituation(failure) {
  /**
   * @param {unknown} value
   * @returns {string}
   */
  const flat = (value) =>
    typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
  return [
    `클래스 ${flat(failure.failure_class)}`,
    `원인 코드 ${flat(failure.reason)}`,
    flat(failure.stage) && `단계 ${flat(failure.stage)}`,
    flat(failure.detail) && `진단 ${flat(failure.detail)}`,
    flat(failure.log_path) && `로그 ${flat(failure.log_path)}`,
    flat(failure.operation_id) && `작업 ${flat(failure.operation_id)}`,
    flat(failure.target_sha) && `대상 ${flat(failure.target_sha)}`,
    flat(failure.deploy_worktree) &&
      `배포 워크트리 ${flat(failure.deploy_worktree)}`
  ]
    .filter(Boolean)
    .join(' · ');
}

/**
 * The first input of a failure conversation: the dotfiles entry block with
 * the `실패 <클래스> · <원인 코드>` reason, the failure's situation line, the
 * row's worktree (`(없음)` when there is none) and the checkout. The retired
 * beads-ui prompt (`buildResolvePrompt`) said no more than the block does.
 *
 * @param {{ failure: ResolveFailureContext, worktree: string|null, checkout: string }} input
 * @returns {string}
 */
export function buildFailureEntry(input) {
  return fillConversationEntry({
    reason: failureConversationReason(input.failure),
    situation: failureSituation(input.failure),
    worktree: input.worktree,
    checkout: input.checkout
  });
}

/**
 * The row a failure conversation's `인계` acts on, fingerprinted as it stands
 * now (UI-18a5 §3.4 한 번 규칙). The kind picks the exit; the identity
 * changes once that exit settles the row, which is how a restarted pass tells
 * a run exit from one that never started.
 *
 *   - `verify_hold`: a pre-merge verify hold — the exit is the `[머지]`
 *     merge-queue re-enqueue, which issues a new authority.
 *   - `cleanup`: a stopped post-merge cleanup (a needs-human post-merge
 *     terminal keeps its cleanup record) — the exit is the cleanup retry.
 *   - `merge_gate`: any other needs-human terminal, the merge gate's forged
 *     receipts above all (`receipt_hold`) — no exit; only a person's `[머지]`
 *     waives it.
 *   - `discard`: a failed discard operation — the exit is its retry.
 *   - `repo_operation`: a Bead-less manual deploy failure (UI-jbl1 §3.3) —
 *     the exit is one manual deploy rerun; a rerun on the same target
 *     supersedes the record, which changes the identity.
 *
 * @param {any} queue - Queue snapshot.
 * @param {string} bead_id - The row key: a Bead id, or `repo-op:<id>`.
 * @returns {{ kind: 'cleanup'|'discard'|'verify_hold'|'merge_gate'|'repo_operation', identity: string }|null}
 */
export function failureHandoffTarget(queue, bead_id) {
  const operation_id = repoOperationIdOf(bead_id);
  if (operation_id !== null) {
    const operation = failedManualDeploy(queue, operation_id);
    return operation
      ? {
          kind: 'repo_operation',
          identity: `repo_operation:${operation_id}:${operation.failure?.fingerprint || ''}`
        }
      : null;
  }
  const intent = queue?.completion_intents?.[bead_id];
  const cleanup = queue?.cleanup_failed?.[bead_id];
  if (intent?.phase === 'holding' && intent.hold) {
    const entry = (Array.isArray(queue?.merge_queue) ? queue.merge_queue : [])
      .filter((/** @type {any} */ item) => item?.bead_id === bead_id)
      .at(-1);
    return {
      kind: 'verify_hold',
      identity: `verify_hold:${intent.hold.head_sha || intent.subject?.head_sha || ''}:${entry?.authority?.id || 'none'}`
    };
  }
  if (cleanup && typeof cleanup === 'object') {
    return {
      kind: 'cleanup',
      identity: `cleanup:${cleanup.step}:${cleanup.at}`
    };
  }
  if (intent?.phase === 'needs_human') {
    return {
      kind: 'merge_gate',
      identity: `merge_gate:${intent.subject?.head_sha || ''}`
    };
  }
  const discard = failedDiscardOperation(queue, bead_id);
  if (discard) {
    return {
      kind: 'discard',
      identity: `discard:${discard.operation_id}:${discard.phase}:${discard.last_error}`
    };
  }
  return null;
}

/**
 * The Bead's newest active discard operation that stopped on an error — the
 * one a 폐기 실패 row retries.
 *
 * @param {any} queue
 * @param {string} bead_id
 * @returns {{ operation_id: string, phase: string, last_error: string }|null}
 */
export function failedDiscardOperation(queue, bead_id) {
  const operations = queue?.discard_operations;
  const found = Object.values(
    operations && typeof operations === 'object' ? operations : {}
  )
    .filter(
      (/** @type {any} */ value) =>
        value &&
        value.bead_id === bead_id &&
        discardOperationActive(value) &&
        typeof value.last_error === 'string' &&
        value.last_error.length > 0
    )
    .sort(
      (/** @type {any} */ left, /** @type {any} */ right) =>
        (left.requested_at || 0) - (right.requested_at || 0)
    )
    .at(-1);
  return found ? /** @type {any} */ (found) : null;
}

/**
 * @typedef {Object} ResolveSessionDeps
 * @property {() => any} getConfig - Runtime config accessor (server/config.js).
 * @property {{ readIssue: (workspace: string, bead_id: string) => Promise<any> }} bd
 * @property {(args: string[]) => Promise<{ code: number, stdout: string, stderr: string }>} [runTmux]
 * @property {() => string|null} [resolveClaude]
 * @property {(runner: string) => string|null} [resolveRunner]
 * @property {(file_path: string) => { mtimeMs: number }} [statFile]
 * @property {() => number} [now]
 * @property {{ recordInteractiveSession: (workspace: string, record: any) => void }} [store]
 * @property {(...args: any[]) => void} [log]
 * @property {string} [heartbeatPath]
 * @property {{ home_dir?: string, hostname?: string, fs?: any, now?: () => number }} [sessionRefOptions]
 * @property {(workspace: string, issue: any) => 'claude'|'codex'|null} [currentRunner] -
 * The provider CURRENT execution settings resolve to. Consulted ONLY when the
 * bead names no session at all (codex-orchestration-parity §4.1): a recorded
 * source that merely cannot be forked keeps its own provider, so a tool error
 * never moves the work between CLIs.
 * @property {(file_path: string) => boolean} [existsSync] - Whether the row's
 * worktree is there, for the entry block's `구현 워크트리` slot.
 * @property {() => import('../conversation-settings.js').ConversationSettingValues} [conversationSettings] -
 * The server-global conversation settings (UI-jbl1 §3.4), read per launch:
 * the fresh runtime here, the model/effort flags in the launcher.
 * @property {(runner: string) => string[]} [launchFlags] - Passed to the
 * launcher; defaults to the stored settings.
 */

/**
 * @typedef {Object} ResolveSessionOutcome
 * @property {boolean} launched
 * @property {'launched'|'already_running'|'not_launched'} session
 * @property {string|null} reason - Why nothing was launched; null otherwise.
 * @property {'fork'|'fresh'} mode
 * @property {'attempt'|'session_ref'|'fresh'} source
 * @property {string|null} fallback_reason - Why the recorded session was not
 * forked; null on a fork.
 * @property {string|null} session_id
 * @property {'claude'|'codex'} runner - The provider the window actually runs.
 * A fork keeps the RECORDED session's provider, and so does the fresh fallback
 * a missing or unusable transcript forces (§4.1). Only a bead with no recorded
 * session at all follows current execution settings.
 * @property {string|null} command
 * @property {boolean} bridge_active
 * @property {import('./tmux-launcher.js').LaunchPlacement|null} placement -
 * Where the launcher opened or found the window; null when not launched.
 * @property {string|null} tmux_session
 * @property {string|null} tmux_window
 */

/**
 * The configured inquiry tmux session: the
 * `worker_direction_inquiry.tmux_session` config value, else the default. A
 * click-started window opens in the user's own session and falls back to this
 * one (UI-a119 §3.1); the resolution launcher and the external-wait session
 * resume share the name.
 *
 * @param {() => any} getConfig
 * @param {(...args: any[]) => void} log
 * @returns {string}
 */
export function interactiveTmuxSessionName(getConfig, log) {
  /** @type {any} */
  let section;
  try {
    section = getConfig()?.worker_direction_inquiry;
  } catch (err) {
    log('config read failed: %o', err);
    return DEFAULT_INQUIRY_TMUX_SESSION;
  }
  const name = section?.tmux_session;
  return typeof name === 'string' && name.length > 0
    ? name
    : DEFAULT_INQUIRY_TMUX_SESSION;
}

/**
 * Build the resolution-session launcher.
 *
 * @param {ResolveSessionDeps} deps
 */
export function createResolveSession(deps) {
  const log = deps.log || default_log;
  const existsSync =
    deps.existsSync || ((/** @type {string} */ p) => fs.existsSync(p));
  const launcher = createTmuxLauncher({
    ...(deps.runTmux ? { runTmux: deps.runTmux } : {}),
    ...(deps.resolveClaude ? { resolveClaude: deps.resolveClaude } : {}),
    ...(deps.resolveRunner ? { resolveRunner: deps.resolveRunner } : {}),
    ...(deps.statFile ? { statFile: deps.statFile } : {}),
    ...(deps.now ? { now: deps.now } : {}),
    ...(deps.heartbeatPath ? { heartbeatPath: deps.heartbeatPath } : {}),
    ...(deps.launchFlags ? { launchFlags: deps.launchFlags } : {}),
    log
  });

  /**
   * The runtime a FRESH conversation runs (UI-jbl1 §3.4): the setting, else
   * the provider this launch would have inherited.
   *
   * @param {'claude'|'codex'} inherited
   * @returns {'claude'|'codex'}
   */
  function freshRunner(inherited) {
    try {
      return freshConversationRuntime(
        (deps.conversationSettings || getConversationSettings)(),
        inherited
      );
    } catch (err) {
      log('conversation settings read failed: %o', err);
      return inherited;
    }
  }

  /**
   * Record one launched failure conversation (UI-18a5 §3.4), no-throw.
   *
   * @param {string} workspace
   * @param {string} row_key - The Bead id, or `repo-op:<id>`.
   * @param {Record<string, any>} record
   */
  function recordLaunch(workspace, row_key, record) {
    try {
      const launched_at = deps.now ? deps.now() : Date.now();
      if (!deps.store) {
        log('interactive session store unavailable for %s', row_key);
        return;
      }
      deps.store.recordInteractiveSession(workspace, {
        bead_id: row_key,
        kind: 'resolve',
        ...record,
        launched_at,
        last_seen_alive_at: launched_at,
        settled_at: null,
        settled_by: null,
        state: 'live',
        exit_requested_at: null,
        defer_since: null
      });
    } catch (err) {
      log('interactive session record failed for %s: %o', row_key, err);
    }
  }

  /**
   * The tmux session resolution windows open in. It is the direction-inquiry
   * section's name because both are the same kind of window — a bdui-started
   * interactive session the bridge relays — and one session keeps the startup
   * reachability probe meaningful for both. The section's `enabled` flag is NOT
   * read: that flag gates an AUTOMATIC launch, and this launch is a click.
   *
   * @returns {string}
   */
  function tmuxSessionName() {
    return interactiveTmuxSessionName(deps.getConfig, log);
  }

  /**
   * Which recorded session, if any, this bead's resolution may fork.
   *
   * A bd read that fails is its OWN reason rather than `no_session_ref`: the
   * bead may well carry a forkable session and this server just could not see
   * it, and reporting the two as one fact would send the operator looking for a
   * missing metadata key that is not missing.
   *
   * @param {string} workspace
   * @param {string} bead_id
   * @param {any} attempt
   * @returns {Promise<{ session_id: string|null, runner: 'claude'|'codex', source: 'attempt'|'session_ref'|'fresh', fallback_reason: string|null }>}
   */
  async function forkTarget(workspace, bead_id, attempt) {
    /**
     * The provider a launch with no usable source runs on: current execution
     * settings when they resolve, and otherwise this lane's own default tool.
     *
     * @param {any} issue
     * @returns {'claude'|'codex'}
     */
    function currentRunner(issue) {
      if (typeof deps.currentRunner !== 'function') {
        return 'claude';
      }
      try {
        const runner = deps.currentRunner(workspace, issue);
        return runner === 'codex' || runner === 'claude' ? runner : 'claude';
      } catch (err) {
        log('current runner resolution failed for %s: %o', bead_id, err);
        return 'claude';
      }
    }
    /** @type {any} */
    let issue = null;
    try {
      issue = await deps.bd.readIssue(workspace, bead_id);
    } catch (err) {
      log('bd read failed for %s: %o', bead_id, err);
    }
    if (!issue || typeof issue !== 'object') {
      issue = null;
    }
    const source = qualifyInteractiveForkSource({
      attempt,
      metadata: issue?.metadata,
      options: deps.sessionRefOptions || {}
    });
    return {
      session_id: source.session_id,
      runner: source.provider ?? currentRunner(issue),
      source: source.source,
      fallback_reason:
        !issue &&
        source.source === 'fresh' &&
        source.fallback_reason === 'no_session_ref'
          ? 'bd_unavailable'
          : source.fallback_reason
    };
  }

  return {
    /**
     * Start (or find) this bead's resolution session. A click opens it in the
     * person's own tmux session; the automatic failure launch passes
     * `placement: 'inquiry'` for the detached conversation session (UI-jbl1
     * §3.1).
     *
     * @param {{ workspace: string, repo?: string|null, bead_id: string, failure: ResolveFailureContext, attempt?: any, placement?: import('./tmux-launcher.js').LaunchPlacement }} input
     * @returns {Promise<ResolveSessionOutcome>}
     */
    async resolve(input) {
      const checkout =
        typeof input.repo === 'string' && input.repo.length > 0
          ? input.repo
          : input.workspace;
      const target = await forkTarget(
        input.workspace,
        input.bead_id,
        input.attempt
      );
      const { session_id, source, fallback_reason } = target;
      // A fork keeps the recorded session's runtime; only a fresh session
      // takes the configured one (UI-jbl1 §3.4).
      const runner =
        session_id === null ? freshRunner(target.runner) : target.runner;
      const row_worktree = path.join(checkout, '.worktrees', input.bead_id);
      const prompt = buildFailureEntry({
        failure: input.failure,
        worktree: existsSync(row_worktree) ? row_worktree : null,
        checkout
      });
      const launch_session_id = runner === 'claude' ? randomUUID() : null;
      const command_args =
        session_id === null
          ? runner === 'claude'
            ? [
                '--session-id',
                /** @type {string} */ (launch_session_id),
                prompt
              ]
            : [prompt]
          : forkArgs(runner, session_id, prompt, launch_session_id);
      const outcome = await launcher.launch({
        marker: RESOLVE_PANE_MARKER,
        key: input.bead_id,
        tmux_session: tmuxSessionName(),
        window_name: `resolve-${input.bead_id}`,
        cwd: checkout,
        commandArgs: command_args,
        runner,
        placement: input.placement === 'inquiry' ? 'inquiry' : 'user'
      });
      if (outcome.session === 'launched') {
        recordLaunch(input.workspace, input.bead_id, {
          provider: runner,
          session_id: launch_session_id,
          session_id_source: launch_session_id === null ? null : 'launch',
          mode: session_id === null ? 'fresh' : 'fork',
          source,
          forked_from: session_id,
          fallback_reason,
          attempt_id: input.attempt?.attempt_id ?? null,
          failure_class: input.failure.failure_class,
          tmux_session: outcome.tmux_session,
          tmux_window: outcome.tmux_window,
          pane_id: outcome.pane_id,
          cwd: checkout,
          conversation: newConversation(input.failure)
        });
      }
      return {
        launched: outcome.session === 'launched',
        session: outcome.session,
        reason: outcome.session === 'not_launched' ? outcome.reason : null,
        mode: session_id === null ? 'fresh' : 'fork',
        source,
        fallback_reason,
        session_id,
        runner,
        command:
          session_id === null
            ? runner === 'claude'
              ? `claude --session-id ${shellQuote(/** @type {string} */ (launch_session_id))}`
              : runner
            : forkCommand(runner, session_id, launch_session_id),
        bridge_active: launcher.bridgeActive(),
        placement:
          outcome.session === 'not_launched'
            ? null
            : (outcome.placement ?? null),
        tmux_session:
          outcome.session === 'not_launched'
            ? null
            : (outcome.tmux_session ?? null),
        tmux_window:
          outcome.session === 'not_launched'
            ? null
            : (outcome.tmux_window ?? null)
      };
    },

    /**
     * Start (or find) a Bead-less repo-operation row's failure conversation
     * (UI-jbl1 §3.3, dotfiles `Worker 세션 대화`): no Bead is read, the row
     * records no session so it is always fresh, the implementation worktree
     * is `(없음)` and the checkout is the repository root.
     *
     * @param {{ workspace: string, repo?: string|null, operation_id: string, failure: ResolveFailureContext, placement?: import('./tmux-launcher.js').LaunchPlacement }} input
     * @returns {Promise<ResolveSessionOutcome>}
     */
    async resolveRepoOperation(input) {
      const checkout =
        typeof input.repo === 'string' && input.repo.length > 0
          ? input.repo
          : input.workspace;
      const row_key = repoOperationRowKey(input.operation_id);
      /** @type {'claude'|'codex'} */
      let inherited = 'claude';
      if (typeof deps.currentRunner === 'function') {
        try {
          const current = deps.currentRunner(input.workspace, null);
          inherited = current === 'codex' ? 'codex' : 'claude';
        } catch (err) {
          log('current runner resolution failed for %s: %o', row_key, err);
        }
      }
      const runner = freshRunner(inherited);
      const prompt = buildFailureEntry({
        failure: input.failure,
        worktree: null,
        checkout
      });
      const launch_session_id = runner === 'claude' ? randomUUID() : null;
      const outcome = await launcher.launch({
        marker: RESOLVE_PANE_MARKER,
        key: row_key,
        tmux_session: tmuxSessionName(),
        // A colon would split the window target (`session:window`) and the
        // pane listing's fixed fields, so the window name uses a dash.
        window_name: `resolve-repo-op-${input.operation_id.slice(0, 12)}`,
        cwd: checkout,
        commandArgs:
          runner === 'claude'
            ? [
                '--session-id',
                /** @type {string} */ (launch_session_id),
                prompt
              ]
            : [prompt],
        runner,
        placement: input.placement === 'inquiry' ? 'inquiry' : 'user'
      });
      if (outcome.session === 'launched') {
        recordLaunch(input.workspace, row_key, {
          provider: runner,
          session_id: launch_session_id,
          session_id_source: launch_session_id === null ? null : 'launch',
          mode: 'fresh',
          source: 'fresh',
          forked_from: null,
          fallback_reason: 'repo_operation',
          attempt_id: null,
          failure_class: input.failure.failure_class,
          tmux_session: outcome.tmux_session,
          tmux_window: outcome.tmux_window,
          pane_id: outcome.pane_id,
          cwd: checkout,
          conversation: newConversation(input.failure)
        });
      }
      return {
        launched: outcome.session === 'launched',
        session: outcome.session,
        reason: outcome.session === 'not_launched' ? outcome.reason : null,
        mode: 'fresh',
        source: 'fresh',
        fallback_reason: 'repo_operation',
        session_id: launch_session_id,
        runner,
        command:
          runner === 'claude'
            ? `claude --session-id ${shellQuote(/** @type {string} */ (launch_session_id))}`
            : runner,
        bridge_active: launcher.bridgeActive(),
        placement:
          outcome.session === 'not_launched'
            ? null
            : (outcome.placement ?? null),
        tmux_session:
          outcome.session === 'not_launched'
            ? null
            : (outcome.tmux_session ?? null),
        tmux_window:
          outcome.session === 'not_launched'
            ? null
            : (outcome.tmux_window ?? null)
      };
    }
  };
}

/**
 * The fresh `conversation` of a failure conversation record (UI-18a5 §3.4).
 *
 * @param {ResolveFailureContext} failure
 */
function newConversation(failure) {
  return {
    stop: failureConversationReason(failure),
    wait_id: null,
    processed_message_at: null,
    message_excerpt: null,
    result: null,
    handoff: null,
    takeover_notified_at: null
  };
}

/**
 * @typedef {Pick<ResolveSessionOutcome, 'session'|'reason'|'tmux_session'|'tmux_window'>} AutoLaunchOutcome
 */

/**
 * Build the automatic failure-conversation launch (UI-jbl1 §3.1): the SAME
 * resolution launcher a `[세션에서 이어가기]` click reaches, called once per
 * terminal failure by the coordinator that wrote it, in the detached
 * conversation session (`placement: 'inquiry'`).
 *
 * It is not repair dispatch (ADR 0005 stays): the session it opens does
 * read-only diagnosis and asks before anything changes (dotfiles
 * `Worker 세션 대화`). Three gates stand before the launch:
 *
 *   - the shared switch (`conversation-settings.js` stored value, else
 *     config.toml `[worker.direction_inquiry] enabled`) — off means the
 *     caller only notifies;
 *   - at most one live conversation per row — a live record of ANY kind on
 *     the row answers instead of a second window;
 *   - a handoff reservation on the row belongs to the pass that settles it.
 *
 * NO-THROW: every path resolves to an outcome the notification can print.
 *
 * @param {{
 *   resolveSession: Pick<ReturnType<typeof createResolveSession>, 'resolve'|'resolveRepoOperation'>,
 *   snapshot: (workspace: string) => any,
 *   getConfig: () => any,
 *   autoLaunchEnabled?: (config_enabled: boolean) => boolean,
 *   log?: (...args: any[]) => void
 * }} deps
 */
export function createFailureConversationLauncher(deps) {
  const log = deps.log || default_log;
  const autoLaunchEnabled =
    deps.autoLaunchEnabled || conversationAutoLaunchEnabled;

  /** @returns {boolean} */
  function enabled() {
    /** @type {boolean} */
    let config_enabled = false;
    try {
      config_enabled =
        deps.getConfig()?.worker_direction_inquiry?.enabled === true;
    } catch (err) {
      log('config read failed: %o', err);
    }
    try {
      return autoLaunchEnabled(config_enabled) === true;
    } catch (err) {
      log('conversation switch read failed: %o', err);
      return false;
    }
  }

  /**
   * @param {string} reason
   * @returns {AutoLaunchOutcome}
   */
  function notLaunched(reason) {
    return {
      session: 'not_launched',
      reason,
      tmux_session: null,
      tmux_window: null
    };
  }

  /**
   * The gate a row's existing records put before a launch, or null.
   *
   * @param {any} queue
   * @param {string} row_key
   * @returns {AutoLaunchOutcome|null}
   */
  function rowGate(queue, row_key) {
    const records = Object.values(queue?.interactive_sessions || {}).filter(
      (/** @type {any} */ record) =>
        record?.bead_id === row_key && record.settled_at === null
    );
    if (records.some((record) => holdsHandoffReservation(record))) {
      return notLaunched('handoff_pending');
    }
    const live = records.find(
      (/** @type {any} */ record) => record.state === 'live'
    );
    return live
      ? {
          session: 'already_running',
          reason: null,
          tmux_session: live.tmux_session ?? null,
          tmux_window: live.tmux_window ?? null
        }
      : null;
  }

  /**
   * @param {() => Promise<ResolveSessionOutcome>} launch
   * @param {string} row_key
   * @returns {Promise<AutoLaunchOutcome>}
   */
  async function guarded(launch, row_key) {
    try {
      const outcome = await launch();
      return {
        session: outcome.session,
        reason: outcome.reason ?? null,
        tmux_session: outcome.tmux_session ?? null,
        tmux_window: outcome.tmux_window ?? null
      };
    } catch (err) {
      log('automatic failure conversation failed for %s: %o', row_key, err);
      return notLaunched('error');
    }
  }

  return {
    /**
     * One Bead row's terminal failure: a deploy or post-merge job failure,
     * a merge-gate hold, or a discard failure.
     *
     * @param {{ workspace: string, repo?: string|null, bead_id: string }} input
     * @returns {Promise<AutoLaunchOutcome>}
     */
    async launchForBead(input) {
      if (!enabled()) {
        return notLaunched('disabled');
      }
      /** @type {any} */
      let queue;
      try {
        queue = deps.snapshot(input.workspace);
      } catch (err) {
        log('queue read failed for %s: %o', input.bead_id, err);
        return notLaunched('error');
      }
      const gate = rowGate(queue, input.bead_id);
      if (gate) {
        return gate;
      }
      const failure = resolveFailureContext(queue, input.bead_id);
      if (!failure) {
        return notLaunched('no_terminal_failure');
      }
      /** @type {any} */
      let attempt = null;
      for (const value of Object.values(queue?.attempts || {})) {
        const record = /** @type {any} */ (value);
        if (
          record.bead_id === input.bead_id &&
          isImplementationAttempt(record)
        ) {
          attempt = record;
        }
      }
      return guarded(
        () =>
          deps.resolveSession.resolve({
            workspace: input.workspace,
            repo: input.repo ?? input.workspace,
            bead_id: input.bead_id,
            failure,
            attempt,
            placement: 'inquiry'
          }),
        input.bead_id
      );
    },

    /**
     * One repo-operation row's terminal failure (a manual deploy failure).
     *
     * @param {{ workspace: string, repo?: string|null, operation_id: string }} input
     * @returns {Promise<AutoLaunchOutcome>}
     */
    async launchForRepoOperation(input) {
      if (!enabled()) {
        return notLaunched('disabled');
      }
      const row_key = repoOperationRowKey(input.operation_id);
      /** @type {any} */
      let queue;
      try {
        queue = deps.snapshot(input.workspace);
      } catch (err) {
        log('queue read failed for %s: %o', row_key, err);
        return notLaunched('error');
      }
      const gate = rowGate(queue, row_key);
      if (gate) {
        return gate;
      }
      const failure = repoOperationFailureContext(queue, input.operation_id);
      if (!failure) {
        return notLaunched('no_terminal_failure');
      }
      return guarded(
        () =>
          deps.resolveSession.resolveRepoOperation({
            workspace: input.workspace,
            repo: input.repo ?? input.workspace,
            operation_id: input.operation_id,
            failure,
            placement: 'inquiry'
          }),
        row_key
      );
    }
  };
}
