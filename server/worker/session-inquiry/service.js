/**
 * The session-inquiry row's observation and resume (UI-gske §3.2, §3.3).
 *
 * One instance per Worker attachment. The 30 s conversation reconcile pass
 * calls {@link reconcile} for its workspace; a `[세션에서 이어가기]` click calls
 * {@link click}. Both reopen the SAME registered session with `--resume` (no
 * fork, no new id) through the shared tmux launcher, under the same marker as
 * the 외부 작업 완료 session resume, whose semantics this is.
 *
 * Three properties are load-bearing:
 *
 *   - ONE PROCESS PER SESSION ID. Nothing launches unless the registered
 *     session is judged `dead` by the Claude Code session registry; an
 *     `unverified` judgment is never read as dead.
 *   - ONCE PER (id, session_id). The consumed session id is appended to
 *     `auto_resume_consumed` BEFORE the automatic launch, so a restart or a
 *     failed launch never becomes a second automatic resume. A click does not
 *     write it.
 *   - QUIET WHEN UNCHANGED. The ref and liveness observations write only when
 *     they change something, so a steady row never moves the queue revision.
 */
import { debug } from '../../logging.js';
import { EXTERNAL_RESUME_PANE_MARKER } from '../tmux-launcher.js';
import {
  REF_ABSENT_REASON,
  REOPENED_LINE,
  hasInquiryConversation,
  isOpenInquiry,
  refTail,
  sessionInquiryRowKey
} from './contract.js';

const default_log = debug('worker:session-inquiry');

/** How long one `git show-ref` probe may take. */
const REF_PROBE_TIMEOUT_MS = 10_000;

/** The click answer when the registered session still runs elsewhere. */
export const OWNER_ALIVE_MESSAGE =
  '등록 세션이 살아 있습니다 — 그 세션(Discord 스레드)에서 답하세요';

/** The click answer when the registered session's liveness is unknown. */
export const OWNER_UNVERIFIED_MESSAGE =
  '등록 세션이 살아 있는지 확인하지 못해 열지 않았습니다 — 같은 세션을 두 프로세스가 잇지 않도록 막았습니다';

/**
 * @typedef {import('./contract.js').SessionInquiry} SessionInquiry
 * @typedef {(argv: string[], options: { timeout_ms: number }) => Promise<{ code: number, stdout?: string, stderr?: string }>} Run
 * @typedef {import('../external-wait/session-resume.js').OwnerLiveness} OwnerLiveness
 */

/**
 * @typedef {Object} SessionInquiryDeps
 * @property {string} workspace
 * @property {{
 *   snapshot: (workspace: string) => any,
 *   patchSessionInquiry: (workspace: string, id: string, mutate: (row: SessionInquiry) => boolean) => { ok: boolean },
 *   transitionSessionInquiry: (workspace: string, id: string, input: { state: string, closed_reason?: string|null, at: number }) => { outcome: string },
 *   recordInteractiveSession: (workspace: string, record: Record<string, unknown>) => unknown
 * }} store
 * @property {Pick<ReturnType<typeof import('../tmux-launcher.js').createTmuxLauncher>, 'launch'|'focusRegistryPane'|'bridgeActive'>} launcher
 * @property {(provider: 'claude'|'codex', session_id: string) => Promise<OwnerLiveness>} ownerLiveness
 * @property {() => boolean} autoLaunchEnabled - The shared conversation switch.
 * @property {() => string} tmuxSession - The detached conversation session name.
 * @property {Run} run - Command runner for the `git show-ref` probe.
 * @property {(workspace: string) => void} notifyChanged
 * @property {{ sessionInquiryCreated: (input: import('../notify.js').SessionInquiryCreatedInput) => Promise<boolean> }} [notify]
 * @property {(session_id: string) => string|null} [discordUrlOf]
 * @property {() => number} [now]
 * @property {(...args: any[]) => void} [log]
 */

/**
 * The reply fields of one resume or click, in the shape the
 * `worker-resolve-in-session` reply already carries.
 *
 * @typedef {Object} InquiryResumeOutcome
 * @property {boolean} launched
 * @property {'launched'|'already_running'|'not_launched'} session
 * @property {string|null} reason
 * @property {string|null} message - A sentence for the person when nothing
 * opened on purpose.
 * @property {'resume'} mode
 * @property {string|null} session_id
 * @property {'claude'} runner
 * @property {string|null} command
 * @property {string|null} placement
 * @property {string|null} tmux_session
 * @property {string|null} tmux_window
 * @property {boolean} bridge_active
 */

/**
 * The first input of a resumed row's session (contract
 * `auto_resume.first_input: [summary, reopened_line]`): no entry block and no
 * Worker conversation block.
 *
 * @param {Pick<SessionInquiry, 'summary'|'ref'>} row
 * @returns {string}
 */
export function sessionInquiryFirstInput(row) {
  return `${row.summary}\n${REOPENED_LINE} — ${row.ref}`;
}

/**
 * Build the session-inquiry runtime of one workspace.
 *
 * @param {SessionInquiryDeps} deps
 */
export function createSessionInquiryRuntime(deps) {
  const now = deps.now || Date.now;
  const log = deps.log || default_log;

  /**
   * @param {string} id
   * @returns {SessionInquiry|null}
   */
  function rowOf(id) {
    return deps.store.snapshot(deps.workspace).session_inquiries?.[id] ?? null;
  }

  /**
   * Whether the row's set-aside ref still exists. Only `git show-ref`'s exit 1
   * proves absence; any other failure or a timeout proves nothing.
   *
   * @param {SessionInquiry} row
   * @returns {Promise<'present'|'absent'|'unknown'>}
   */
  async function probeRef(row) {
    try {
      const result = await deps.run(
        ['git', '-C', row.repo, 'show-ref', '--verify', '--quiet', row.ref],
        { timeout_ms: REF_PROBE_TIMEOUT_MS }
      );
      if (result.code === 0) {
        return 'present';
      }
      return result.code === 1 ? 'absent' : 'unknown';
    } catch (err) {
      log('ref probe failed for %s: %o', row.id, err);
      return 'unknown';
    }
  }

  /**
   * Write the observed liveness when it differs from the stored one.
   *
   * @param {SessionInquiry} row
   * @param {OwnerLiveness} liveness
   */
  function recordLiveness(row, liveness) {
    const at = now();
    const result = deps.store.patchSessionInquiry(
      deps.workspace,
      row.id,
      (current) => {
        if (
          current.session_id !== row.session_id ||
          (current.liveness?.state === liveness.state &&
            current.liveness.tmux === liveness.owner_tmux)
        ) {
          return false;
        }
        current.liveness = {
          state: liveness.state,
          at,
          tmux: liveness.owner_tmux
        };
        return true;
      }
    );
    if (result.ok) {
      deps.notifyChanged(deps.workspace);
    }
  }

  /**
   * Reopen the registered session in a tmux window at the registered cwd and
   * record the window as the row's one conversation.
   *
   * @param {SessionInquiry} row
   * @param {'inquiry'|'user'} placement
   * @returns {Promise<InquiryResumeOutcome>}
   */
  async function resume(row, placement) {
    const row_key = sessionInquiryRowKey(row.id);
    const outcome = await deps.launcher.launch({
      marker: EXTERNAL_RESUME_PANE_MARKER,
      key: row_key,
      tmux_session: deps.tmuxSession(),
      window_name: `inquiry-${row.id.slice(3, 11)}`,
      cwd: row.cwd,
      commandArgs: ['--resume', row.session_id, sessionInquiryFirstInput(row)],
      runner: 'claude',
      placement,
      // The resumed session keeps its own model and effort (UI-gske §3.2).
      conversation_flags: false
    });
    if (outcome.session === 'launched') {
      const at = now();
      try {
        deps.store.recordInteractiveSession(deps.workspace, {
          bead_id: row_key,
          kind: 'external_resume',
          provider: 'claude',
          session_id: row.session_id,
          session_id_source: 'launch',
          mode: 'resume',
          source: 'session_ref',
          forked_from: null,
          fallback_reason: null,
          attempt_id: null,
          failure_class: null,
          tmux_session: outcome.tmux_session,
          tmux_window: outcome.tmux_window,
          pane_id: outcome.pane_id,
          cwd: row.cwd,
          launched_at: at,
          last_seen_alive_at: at,
          settled_at: null,
          settled_by: null,
          state: 'live',
          exit_requested_at: null,
          defer_since: null
        });
      } catch (err) {
        log('interactive session record failed for %s: %o', row_key, err);
      }
      deps.notifyChanged(deps.workspace);
    }
    return {
      launched: outcome.session === 'launched',
      session: outcome.session,
      reason: outcome.session === 'not_launched' ? outcome.reason : null,
      message: null,
      mode: 'resume',
      session_id: row.session_id,
      runner: 'claude',
      command: `claude --resume ${row.session_id}`,
      placement:
        outcome.session === 'not_launched' ? null : (outcome.placement ?? null),
      tmux_session:
        outcome.session === 'not_launched'
          ? null
          : (outcome.tmux_session ?? null),
      tmux_window:
        outcome.session === 'not_launched'
          ? null
          : (outcome.tmux_window ?? null),
      bridge_active: deps.launcher.bridgeActive()
    };
  }

  /**
   * Whether the shared switch is on; a read that throws is off.
   *
   * @returns {boolean}
   */
  function switchOn() {
    try {
      return deps.autoLaunchEnabled() === true;
    } catch (err) {
      log('conversation switch read failed: %o', err);
      return false;
    }
  }

  /**
   * One open row's pass: ref observation, liveness observation, then the
   * automatic resume when all five conditions hold (UI-gske §3.2).
   *
   * @param {SessionInquiry} row
   */
  async function reconcileRow(row) {
    const ref = await probeRef(row);
    // An observation error proves nothing: this pass changes nothing and the
    // next one looks again (UI-gske §3.2).
    if (ref === 'unknown') {
      return;
    }
    if (ref === 'absent') {
      const moved = deps.store.transitionSessionInquiry(
        deps.workspace,
        row.id,
        { state: 'closed', closed_reason: REF_ABSENT_REASON, at: now() }
      );
      if (moved.outcome === 'moved') {
        deps.notifyChanged(deps.workspace);
      }
      return;
    }
    const liveness = await deps.ownerLiveness('claude', row.session_id);
    recordLiveness(row, liveness);
    const current = rowOf(row.id);
    const session_id = row.session_id;
    if (
      !current ||
      current.state !== 'waiting' ||
      current.session_id !== session_id ||
      liveness.state !== 'dead' ||
      !switchOn() ||
      hasInquiryConversation(deps.store.snapshot(deps.workspace), row.id) ||
      current.auto_resume_consumed.includes(session_id)
    ) {
      return;
    }
    // Consumed BEFORE the launch: a restart or a failed launch must not turn
    // into a second automatic resume of the same (id, session_id).
    const consumed = deps.store.patchSessionInquiry(
      deps.workspace,
      row.id,
      (latest) => {
        if (
          latest.state !== 'waiting' ||
          latest.session_id !== session_id ||
          latest.auto_resume_consumed.includes(session_id)
        ) {
          return false;
        }
        latest.auto_resume_consumed.push(session_id);
        return true;
      }
    );
    if (!consumed.ok) {
      return;
    }
    deps.notifyChanged(deps.workspace);
    try {
      const outcome = await resume(current, 'inquiry');
      if (outcome.session === 'not_launched') {
        log(
          'automatic session-inquiry resume not launched for %s: %s',
          row.id,
          outcome.reason
        );
      }
    } catch (err) {
      log('automatic session-inquiry resume failed for %s: %o', row.id, err);
    }
  }

  return {
    /**
     * Observe every open row of the workspace once. No-throw: one row's
     * failure leaves the others observed.
     *
     * @returns {Promise<void>}
     */
    async reconcile() {
      /** @type {SessionInquiry[]} */
      let rows = [];
      try {
        rows = Object.values(
          deps.store.snapshot(deps.workspace).session_inquiries || {}
        ).filter(isOpenInquiry);
      } catch (err) {
        log('session-inquiry read failed for %s: %o', deps.workspace, err);
        return;
      }
      for (const row of rows) {
        try {
          await reconcileRow(row);
        } catch (err) {
          log('session-inquiry reconcile failed for %s: %o', row.id, err);
        }
      }
    },

    /**
     * The `[세션에서 이어가기]` of one row, after the caller found no live
     * conversation window to focus (UI-gske §3.3): a live registered session
     * is brought forward or named, an unverified one is refused, a dead one
     * is resumed. The click writes no `auto_resume_consumed`.
     *
     * @param {string} id
     * @returns {Promise<InquiryResumeOutcome>}
     */
    async click(id) {
      /**
       * @param {string} reason
       * @param {string|null} message
       * @param {Partial<InquiryResumeOutcome>} [extra]
       * @returns {InquiryResumeOutcome}
       */
      const answer = (reason, message, extra = {}) => ({
        launched: false,
        session: 'not_launched',
        reason,
        message,
        mode: 'resume',
        session_id: null,
        runner: 'claude',
        command: null,
        placement: null,
        tmux_session: null,
        tmux_window: null,
        bridge_active: deps.launcher.bridgeActive(),
        ...extra
      });
      const row = rowOf(id);
      if (!row) {
        return answer('unknown_inquiry', null);
      }
      if (!isOpenInquiry(row)) {
        return answer('inquiry_closed', null);
      }
      const command = `claude --resume ${row.session_id}`;
      const liveness = await deps.ownerLiveness('claude', row.session_id);
      // The liveness verdict is about the session id checked; a row closed or
      // re-registered meanwhile is not the row this verdict may act on.
      const latest = rowOf(id);
      if (!latest || !isOpenInquiry(latest)) {
        return answer('inquiry_closed', null);
      }
      if (latest.session_id !== row.session_id) {
        return answer('session_replaced', null);
      }
      recordLiveness(row, liveness);
      if (liveness.state === 'alive') {
        if (liveness.owner_tmux) {
          const focused = await deps.launcher.focusRegistryPane(
            liveness.owner_tmux
          );
          if (focused.ok) {
            return answer('owner_alive', null, {
              session: 'already_running',
              reason: null,
              session_id: row.session_id,
              command,
              placement: 'user',
              tmux_session: focused.tmux_session,
              tmux_window: focused.tmux_window
            });
          }
          log('owner pane focus failed for %s: %s', id, focused.error);
        }
        return answer('owner_alive', OWNER_ALIVE_MESSAGE, {
          session_id: row.session_id,
          command
        });
      }
      if (liveness.state === 'unverified') {
        return answer('owner_unverified', OWNER_UNVERIFIED_MESSAGE, {
          session_id: row.session_id,
          command
        });
      }
      return resume(latest, 'user');
    },

    /**
     * The once-only creation push (UI-gske §3.3). The caller stamped
     * `notified_at` before calling. No-throw.
     *
     * @param {SessionInquiry} row
     * @returns {Promise<void>}
     */
    async announce(row) {
      if (!deps.notify) {
        return;
      }
      try {
        /** @type {string|null} */
        let link = null;
        try {
          link = deps.discordUrlOf?.(row.session_id) ?? null;
        } catch (err) {
          log('bridge thread read failed for %s: %o', row.id, err);
        }
        await deps.notify.sessionInquiryCreated({
          repo: deps.workspace,
          ref_tail: refTail(row.ref),
          summary: row.summary,
          link
        });
      } catch (err) {
        log('session-inquiry notification failed for %s: %o', row.id, err);
      }
    }
  };
}
