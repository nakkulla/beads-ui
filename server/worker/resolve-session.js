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
import { debug } from '../logging.js';
import { PRE_MERGE_HOLD_NOTIFY_LABEL } from './completion-intent.js';
import {
  failureConversationReason,
  fillConversationEntry
} from './direction-inquiry.js';
import { discardOperationActive } from './discard-phase.js';
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
 * @typedef {Object} ResolveFailureContext
 * @property {string} failure_class
 * @property {string} reason
 * @property {string|null} stage
 * @property {string|null} detail
 * @property {string|null} [log_path]
 * @property {'fix_commit_push'} [exit]
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
 * line. A field with nothing behind it is left out.
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
    flat(failure.log_path) && `로그 ${flat(failure.log_path)}`
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
 *
 * @param {any} queue - Queue snapshot.
 * @param {string} bead_id
 * @returns {{ kind: 'cleanup'|'discard'|'verify_hold'|'merge_gate', identity: string }|null}
 */
export function failureHandoffTarget(queue, bead_id) {
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
    log
  });

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
     * Start (or find) this bead's resolution session.
     *
     * @param {{ workspace: string, repo?: string|null, bead_id: string, failure: ResolveFailureContext, attempt?: any }} input
     * @returns {Promise<ResolveSessionOutcome>}
     */
    async resolve(input) {
      const checkout =
        typeof input.repo === 'string' && input.repo.length > 0
          ? input.repo
          : input.workspace;
      const { session_id, runner, source, fallback_reason } = await forkTarget(
        input.workspace,
        input.bead_id,
        input.attempt
      );
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
        placement: 'user'
      });
      if (outcome.session === 'launched') {
        try {
          const launched_at = deps.now ? deps.now() : Date.now();
          if (deps.store) {
            deps.store.recordInteractiveSession(input.workspace, {
              bead_id: input.bead_id,
              kind: 'resolve',
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
              launched_at,
              last_seen_alive_at: launched_at,
              settled_at: null,
              settled_by: null,
              state: 'live',
              exit_requested_at: null,
              defer_since: null,
              conversation: {
                stop: failureConversationReason(input.failure),
                wait_id: null,
                processed_message_at: null,
                message_excerpt: null,
                result: null,
                handoff: null,
                takeover_notified_at: null
              }
            });
          } else {
            log('interactive session store unavailable for %s', input.bead_id);
          }
        } catch (err) {
          log(
            'interactive session record failed for %s: %o',
            input.bead_id,
            err
          );
        }
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
    }
  };
}
