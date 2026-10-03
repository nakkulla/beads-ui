/**
 * The external-wait `[세션에서 이어가기]` launcher (UI-r6xq §4.3, UI-18a5
 * §3.3).
 *
 * A session-owned wait that completed is continued by the person's own
 * preserved session: this module reopens that session with `--resume` (no
 * fork) in a tmux window on the wait's worktree, gives it the dotfiles entry
 * block (`외부 작업 완료 <wait_id>`, the completion block as its situation) as
 * its first prompt, and only after the window is confirmed removes the
 * `external_wait` key. Its record carries a `conversation`, so the reconcile
 * pass observes the result line like every other Worker session
 * conversation. It is a sibling of `resolve-session.js` and shares the same
 * launcher, but it creates no attempt, claims nothing, and runs no admission.
 *
 * Two properties are load-bearing:
 *
 *   - ONE PROCESS PER SESSION ID. When the original session is alive — judged
 *     from the Claude Code session registry, never from the record's
 *     `owner.session_pid` — or its liveness cannot be established, nothing is
 *     launched and nothing is written; the reply carries the resume command.
 *   - RESERVE, LAUNCH, THEN RELEASE. The reservation is written before the
 *     launch and `launched_at` before the key unset, so a restart at any point
 *     is settled from durable facts and a pane, never by launching again.
 *
 * @import { WaitRecord } from './store.js'
 */
import nodeFs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { runShell } from '../../bd.js';
import { debug } from '../../logging.js';
import {
  externalConversationReason,
  fillConversationEntry
} from '../direction-inquiry.js';
import { qualifySessionFork, sessionResumeCommand } from '../session-ref.js';
import { EXTERNAL_RESUME_PANE_MARKER } from '../tmux-launcher.js';
import { externalWaitCompletionPrompt } from './completion-prompt.js';

const default_log = debug('worker:external-wait-session-resume');

/**
 * The one line dotfiles `docs/contracts/external-wait.md` (Session resume)
 * puts before the `## 외부 작업 완료` block: the server unsets the key after
 * confirming this launch, the session opens as the 외부 작업 완료 Worker
 * session conversation, and after `인수` — before its first edit — it
 * confirms the key is absent and then claims the Bead. The retired lead
 * sentence's own wording is gone (UI-18a5 §3.3); this contract line is the
 * whole of beads-ui's addition to the entry block's `상황` slot.
 *
 * @type {string}
 */
export const EXTERNAL_CONVERSATION_LEAD =
  '대기 키는 서버가 이 창의 기동을 확인한 뒤 해제한다 · 이 세션은 외부 작업 완료 Worker 세션 대화로 열린다(`references/execution-common.md` `## Worker 세션 대화`) · `인수` 뒤 첫 편집 전에 `bd show --json`으로 `external_wait` 키가 없음을 확인한 뒤 Bead를 클레임한다';

/**
 * The first input of an 외부 작업 완료 conversation: the dotfiles entry block
 * with the `외부 작업 완료 <wait_id>` reason, the contract line and the
 * completion block as its situation, the record's worktree, and the
 * workspace checkout.
 *
 * @param {WaitRecord} record
 * @returns {string}
 */
export function externalConversationEntry(record) {
  return fillConversationEntry({
    reason: externalConversationReason(record.wait_id),
    situation: `${EXTERNAL_CONVERSATION_LEAD}\n${externalWaitCompletionPrompt(record)}`,
    worktree: record.worktree || null,
    checkout: record.root_dir || null
  });
}

/**
 * @typedef {'alive'|'dead'|'unverified'} OwnerLivenessState
 * @typedef {{ state: OwnerLivenessState, owner_tmux: string|null }} OwnerLiveness
 * @typedef {(argv: string[], options: { timeout_ms: number }) => Promise<{ code: number, stdout: string, stderr: string }>} Run
 * @typedef {{ session: string, window: string, pane: string, dead: string, agent_running?: string, agent_attention?: string, cwd: string, agent_runtime: string, key: string }} ExtendedPaneRow
 * @typedef {Object} SessionResumeResult
 * @property {true} ok
 * @property {'session'} mode
 * @property {'launched'|'already_running'|'not_launched'} session
 * @property {string|null} reason
 * @property {string|null} command
 * @property {string|null} owner_tmux
 * @property {import('../tmux-launcher.js').LaunchPlacement|null} placement -
 * Where the launcher actually opened (or found) the window; null when unknown.
 * @property {string|null} tmux_session
 * @property {string|null} tmux_window
 * @property {string|null} pane_id
 * @property {boolean} bridge_active
 */

/**
 * @typedef {Object} SessionResumeDeps
 * @property {Pick<ReturnType<typeof import('../tmux-launcher.js').createTmuxLauncher>, 'launch'|'focusRunning'|'listPanesExtended'|'bridgeActive'>} launcher
 * @property {{ get: (workspace: string, wait_id: string) => WaitRecord|null, update: (workspace: string, wait_id: string, mutate: (record: WaitRecord) => void) => unknown }} externalWait
 * @property {(workspace: string, record: Record<string, unknown>) => unknown} recordInteractiveSession
 * @property {(bead_id: string) => Promise<void>} unsetExternalWait - Unset the
 * key and read it back; throws when the key survives.
 * @property {(workspace: string) => void} notifyChanged
 * @property {() => string} tmuxSession
 * @property {Run} [run] - Probe runner (default `runShell`), injected so
 * tests never spawn `ps`.
 * @property {string} [sessionsDir] - Claude Code session registry directory
 * (default `<home>/.claude/sessions`).
 * @property {Pick<typeof nodeFs, 'readdirSync'|'readFileSync'|'statSync'>} [fs]
 * @property {Parameters<typeof qualifySessionFork>[2]} [sessionRefOptions]
 * @property {() => number} [now]
 * @property {(...args: any[]) => void} [log]
 */

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Build the session resume launcher.
 *
 * @param {SessionResumeDeps} deps
 */
export function createExternalWaitSessionResume(deps) {
  const fs = deps.fs || nodeFs;
  const now = deps.now || (() => Date.now());
  const log = deps.log || default_log;
  /** @type {Run} */
  const run =
    deps.run || ((argv, options) => runShell(argv[0], argv.slice(1), options));
  const sessions_dir =
    deps.sessionsDir || path.join(os.homedir(), '.claude', 'sessions');

  /**
   * Whether the original session still runs somewhere, from the Claude Code
   * session registry and an exact `procStart` match (UI-r6xq §4.3-2).
   *
   * @param {'claude'|'codex'} provider
   * @param {string} session_id
   * @returns {Promise<OwnerLiveness>}
   */
  async function ownerLiveness(provider, session_id) {
    const unverified = {
      state: /** @type {const} */ ('unverified'),
      owner_tmux: null
    };
    if (provider !== 'claude') {
      return unverified;
    }
    /** @type {string[]} */
    let names;
    try {
      names = fs
        .readdirSync(sessions_dir)
        .map(String)
        .filter((name) => name.endsWith('.json'))
        .sort();
    } catch (err) {
      log('session registry unreadable %s: %o', sessions_dir, err);
      return unverified;
    }
    /** @type {{ pid: number, proc_start: string, tmux: string|null }[]} */
    const entries = [];
    for (const name of names) {
      /** @type {string} */
      let text;
      try {
        text = String(fs.readFileSync(path.join(sessions_dir, name), 'utf8'));
      } catch (err) {
        // An unreadable entry may be the live owner's; liveness stays unknown.
        log('session registry entry unreadable %s: %o', name, err);
        return unverified;
      }
      /** @type {unknown} */
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        // A broken entry can only be ruled out when it cannot name this id.
        if (text.includes(session_id)) {
          return unverified;
        }
        continue;
      }
      if (!isRecord(parsed) || parsed.sessionId !== session_id) {
        continue;
      }
      if (
        !Number.isInteger(parsed.pid) ||
        /** @type {number} */ (parsed.pid) <= 0 ||
        typeof parsed.procStart !== 'string' ||
        parsed.procStart.length === 0
      ) {
        return unverified;
      }
      entries.push({
        pid: /** @type {number} */ (parsed.pid),
        proc_start: parsed.procStart,
        tmux:
          typeof parsed.tmux === 'string' && parsed.tmux.length > 0
            ? parsed.tmux
            : null
      });
    }
    for (const entry of entries) {
      /** @type {{ code: number, stdout: string, stderr: string }} */
      let probe;
      try {
        probe = await run(
          [
            'env',
            'TZ=UTC',
            'LC_ALL=C',
            'ps',
            '-p',
            String(entry.pid),
            '-o',
            'lstart='
          ],
          { timeout_ms: 5000 }
        );
      } catch (err) {
        log('ps probe failed for %d: %o', entry.pid, err);
        return unverified;
      }
      const actual = probe.stdout.trim();
      if (probe.code === 1 && actual === '') {
        continue;
      }
      if (probe.code !== 0 || actual === '') {
        return unverified;
      }
      if (actual === entry.proc_start) {
        return { state: 'alive', owner_tmux: entry.tmux };
      }
    }
    return { state: 'dead', owner_tmux: null };
  }

  /**
   * Write the failure record and keep the key (UI-r6xq §4.2).
   *
   * @param {string} workspace
   * @param {WaitRecord} record
   * @param {string} reason
   * @param {string|null} session_id
   */
  function recordFailure(workspace, record, reason, session_id) {
    deps.externalWait.update(workspace, record.wait_id, (current) => {
      current.resume = {
        mode: 'session',
        attempt_id: null,
        reserved_at: current.resume?.reserved_at ?? null,
        launched_at: null,
        session_id: session_id ?? current.resume?.session_id ?? null,
        error: reason
      };
    });
    deps.notifyChanged(workspace);
  }

  /**
   * Record the reopened window, then release the key and close the wait.
   * A failed unset leaves `launched_at` on a `completing` record, which the
   * restart settlement finishes without launching again.
   *
   * @param {string} workspace
   * @param {WaitRecord} record
   * @param {{ source: 'session_ref'|'recovered', pane: { tmux_session: string, tmux_window: string, pane_id: string }|null }} evidence
   */
  async function settleLaunch(workspace, record, evidence) {
    const at = now();
    deps.externalWait.update(workspace, record.wait_id, (current) => {
      if (current.resume) {
        current.resume.launched_at ||= new Date(at).toISOString();
      }
    });
    const session_id = record.resume?.session_id ?? null;
    if (evidence.pane) {
      try {
        deps.recordInteractiveSession(workspace, {
          bead_id: record.bead_id,
          kind: 'external_resume',
          provider: 'claude',
          session_id,
          session_id_source: 'launch',
          mode: 'resume',
          source: evidence.source,
          forked_from: null,
          fallback_reason: null,
          attempt_id: null,
          failure_class: null,
          tmux_session: evidence.pane.tmux_session,
          tmux_window: evidence.pane.tmux_window,
          pane_id: evidence.pane.pane_id,
          cwd: record.worktree,
          launched_at: at,
          last_seen_alive_at: at,
          settled_at: null,
          settled_by: null,
          state: 'live',
          exit_requested_at: null,
          defer_since: null,
          conversation: {
            stop: externalConversationReason(record.wait_id),
            wait_id: record.wait_id,
            processed_message_at: null,
            message_excerpt: null,
            result: null,
            handoff: null,
            takeover_notified_at: null
          }
        });
      } catch (err) {
        log(
          'interactive session record failed for %s: %o',
          record.bead_id,
          err
        );
      }
    }
    await deps.unsetExternalWait(record.bead_id);
    deps.externalWait.update(workspace, record.wait_id, (current) => {
      current.stage = 'resumed';
    });
    deps.notifyChanged(workspace);
  }

  /**
   * The live resume pane for this bead, or null when none is observed.
   *
   * @param {string} bead_id
   * @returns {Promise<{ ok: true, pane: ExtendedPaneRow|null }|{ ok: false }>}
   */
  async function findPane(bead_id) {
    const listed = await deps.launcher.listPanesExtended(
      EXTERNAL_RESUME_PANE_MARKER
    );
    if (!listed.ok) {
      return { ok: false };
    }
    return {
      ok: true,
      pane:
        listed.rows.find((row) => row.key === bead_id && row.dead === '0') ??
        null
    };
  }

  /**
   * Resume the preserved session of one completed session-owned wait.
   *
   * @param {{ workspace: string, record: WaitRecord, bead_metadata: Record<string, unknown>|null }} input
   * @returns {Promise<SessionResumeResult>}
   */
  async function resume({ workspace, record, bead_metadata }) {
    /**
     * @param {string} reason
     * @param {{ command?: string|null, owner_tmux?: string|null }} [extra]
     * @returns {SessionResumeResult}
     */
    const notLaunched = (reason, extra = {}) => ({
      ok: true,
      mode: 'session',
      session: 'not_launched',
      reason,
      command: extra.command ?? null,
      owner_tmux: extra.owner_tmux ?? null,
      placement: null,
      tmux_session: null,
      tmux_window: null,
      pane_id: null,
      bridge_active: deps.launcher.bridgeActive()
    });
    const prior = record.resume;
    if (
      prior !== null &&
      prior.mode === 'session' &&
      prior.launched_at !== null &&
      prior.error === null
    ) {
      // Launch evidence already exists and only the key settlement failed
      // (UI-r6xq §5): retry that settlement alone. Re-entering the launch path
      // would read the window this launch opened as the live owner.
      // The click still makes that open window current (UI-a119 §3.1); a
      // focus that fails or finds no window changes nothing else.
      const focused = await deps.launcher.focusRunning({
        marker: EXTERNAL_RESUME_PANE_MARKER,
        key: record.bead_id,
        tmux_session: deps.tmuxSession(),
        window_name: record.bead_id,
        placement: 'user'
      });
      /** @type {Extract<import('../tmux-launcher.js').LaunchOutcome, { session: 'already_running' }>|null} */
      let live = null;
      if (!focused.ok) {
        log(
          'external wait resume window focus failed for %s: %s',
          record.bead_id,
          focused.error
        );
      } else if (focused.outcome?.session === 'already_running') {
        live = focused.outcome;
      } else {
        log('external wait resume window not found for %s', record.bead_id);
      }
      /** @type {{ placement: import('../tmux-launcher.js').LaunchPlacement|null, tmux_session: string|null, tmux_window: string|null, pane_id: string|null }} */
      let where = {
        placement: null,
        tmux_session: null,
        tmux_window: null,
        pane_id: null
      };
      if (live) {
        where = {
          placement: live.placement ?? null,
          tmux_session: live.tmux_session ?? null,
          tmux_window: live.tmux_window ?? null,
          pane_id: live.pane_id ?? null
        };
      } else {
        const found = await findPane(record.bead_id);
        if (found.ok && found.pane) {
          where = {
            placement: null,
            tmux_session: found.pane.session,
            tmux_window: found.pane.window,
            pane_id: found.pane.pane
          };
        }
      }
      try {
        await settleLaunch(workspace, record, {
          source: 'session_ref',
          pane: null
        });
      } catch (err) {
        log(
          'external wait key settlement retry failed for %s: %o',
          record.bead_id,
          err
        );
        deps.notifyChanged(workspace);
      }
      return {
        ok: true,
        mode: 'session',
        session: 'already_running',
        reason: null,
        command: null,
        owner_tmux: null,
        ...where,
        bridge_active: deps.launcher.bridgeActive()
      };
    }
    const qualified = qualifySessionFork(
      bead_metadata,
      null,
      deps.sessionRefOptions || {}
    );
    if (!qualified.ok) {
      recordFailure(workspace, record, qualified.reason, null);
      return notLaunched(qualified.reason);
    }
    const { provider, session_id } = qualified;
    const command = sessionResumeCommand({
      index: 0,
      provider,
      session_id,
      host: ''
    });
    const liveness = await ownerLiveness(provider, session_id);
    if (liveness.state === 'alive') {
      return notLaunched('owner_alive', {
        command,
        owner_tmux: liveness.owner_tmux
      });
    }
    if (liveness.state === 'unverified') {
      return notLaunched('owner_unverified', { command });
    }
    let worktree_present = false;
    try {
      worktree_present = fs.statSync(record.worktree).isDirectory();
    } catch {
      worktree_present = false;
    }
    if (!worktree_present) {
      recordFailure(workspace, record, 'worktree_missing', session_id);
      return notLaunched('worktree_missing');
    }
    const prompt = externalConversationEntry(record);
    deps.externalWait.update(workspace, record.wait_id, (current) => {
      current.resume = {
        mode: 'session',
        attempt_id: null,
        reserved_at: new Date(now()).toISOString(),
        launched_at: null,
        session_id,
        error: null
      };
    });
    const tmux_session = deps.tmuxSession();
    const outcome = await deps.launcher.launch({
      marker: EXTERNAL_RESUME_PANE_MARKER,
      key: record.bead_id,
      tmux_session,
      window_name: record.bead_id,
      cwd: record.worktree,
      commandArgs: ['--resume', session_id, prompt],
      runner: 'claude',
      placement: 'user'
    });
    if (outcome.session === 'not_launched') {
      recordFailure(workspace, record, outcome.reason, session_id);
      return notLaunched(outcome.reason, { command });
    }
    /** @type {{ tmux_session: string, tmux_window: string, pane_id: string }|null} */
    let pane = null;
    if (outcome.session === 'launched') {
      pane = {
        tmux_session: outcome.tmux_session,
        tmux_window: outcome.tmux_window,
        pane_id: outcome.pane_id
      };
    } else {
      // The launcher found this bead's window already open; read its pane.
      const found = await findPane(record.bead_id);
      if (found.ok && found.pane) {
        pane = {
          tmux_session: found.pane.session,
          tmux_window: found.pane.window,
          pane_id: found.pane.pane
        };
      }
    }
    const current = deps.externalWait.get(workspace, record.wait_id);
    try {
      await settleLaunch(workspace, current || record, {
        source: 'session_ref',
        pane
      });
    } catch (err) {
      log(
        'external wait key settlement failed for %s: %o',
        record.bead_id,
        err
      );
      deps.notifyChanged(workspace);
    }
    return {
      ok: true,
      mode: 'session',
      session: outcome.session,
      reason: null,
      command,
      owner_tmux: null,
      placement: outcome.placement ?? null,
      tmux_session: pane?.tmux_session ?? null,
      tmux_window: pane?.tmux_window ?? null,
      pane_id: pane?.pane_id ?? null,
      bridge_active: deps.launcher.bridgeActive()
    };
  }

  /**
   * Settle one session reservation after a restart (UI-r6xq §4.3): a failure
   * record stays, a launched one releases the key, and an unfinished one is
   * settled only on pane evidence — it is never relaunched.
   *
   * @param {string} workspace
   * @param {WaitRecord} record
   */
  async function settleReservation(workspace, record) {
    const resume_state = record.resume;
    if (!resume_state || resume_state.mode !== 'session') {
      return;
    }
    if (resume_state.error !== null) {
      return;
    }
    if (resume_state.launched_at !== null) {
      await settleLaunch(workspace, record, {
        source: 'recovered',
        pane: null
      });
      return;
    }
    const found = await findPane(record.bead_id);
    if (!found.ok) {
      return;
    }
    if (!found.pane) {
      deps.externalWait.update(workspace, record.wait_id, (current) => {
        current.resume = null;
      });
      deps.notifyChanged(workspace);
      return;
    }
    await settleLaunch(workspace, record, {
      source: 'recovered',
      pane: {
        tmux_session: found.pane.session,
        tmux_window: found.pane.window,
        pane_id: found.pane.pane
      }
    });
  }

  return { resume, ownerLiveness, settleReservation };
}
