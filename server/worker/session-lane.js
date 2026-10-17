/**
 * Pure pieces of the Worker queue SESSION LANE (UI-lbm5 §4.3-§4.5): a queued
 * Bead whose exec lane is `session` runs as an interactive session-hub window
 * instead of a headless spawn. The scheduler owns the lifecycle; this module
 * only assembles the launch argv and env, reads a window's last message as a
 * verdict, and judges liveness and the answer wait from observed facts. No I/O.
 */
import { conversationLaunchFlags } from '../conversation-settings.js';
import { terminalResultOf } from './runner/session.js';

/** The interactive-record kind of a session-lane window. */
export const SESSION_LANE_KIND = 'session_lane';

/**
 * The `대화 사유` a session-lane conversation record carries. The record shape
 * requires one, and the card's conversation renderer reads the record.
 */
export const SESSION_LANE_STOP = '세션 레인';

/**
 * Worker markers and print-mode keys a session-lane window must NOT inherit
 * (UI-lbm5 §4.3): with them the dotfiles side would classify the person's
 * interactive window as an unattended runner, and the print-mode ceiling means
 * nothing to an interactive process.
 *
 * @type {ReadonlySet<string>}
 */
export const SESSION_LANE_FORBIDDEN_ENV = new Set([
  'BDUI_ATTEMPT_ID',
  'CLAUDE_HOOK_SUPPRESS',
  'CODEX_SILENT',
  'CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS'
]);

/**
 * The window env: the keys a headless dispatch layers onto `settings.env` —
 * the policy-hook locator pair, the work-recovery readiness env, the attempt
 * guard hook's three `GIT_CONFIG_*` keys and the account env — minus every
 * Worker marker (UI-lbm5 §4.3 결정). Later layers win, as in the headless
 * assembly.
 *
 * @param {{ repo: string, bead_id: string, recovery_env?: Record<string, string>|null, guard_env?: Record<string, string>|null, account_env?: Record<string, string>|null }} input
 * @returns {Record<string, string>}
 */
export function sessionLaneEnv(input) {
  /** @type {Record<string, string>} */
  const env = {};
  if (input.repo.length > 0 && input.bead_id.length > 0) {
    env.WORKFLOW_REPO_ROOT = input.repo;
    env.WORKFLOW_BEAD_ID = input.bead_id;
  }
  for (const layer of [
    input.recovery_env,
    input.guard_env,
    input.account_env
  ]) {
    for (const [name, value] of Object.entries(layer || {})) {
      if (typeof value === 'string') {
        env[name] = value;
      }
    }
  }
  for (const name of SESSION_LANE_FORBIDDEN_ENV) {
    delete env[name];
  }
  return env;
}

/**
 * The arguments AFTER the runner executable for one session-lane window. The
 * preset's model/effort ride the same flag shapes the conversation settings
 * use; claude gets the contract on `--append-system-prompt` and the task as
 * its first input, codex (which has no system-prompt channel) gets the
 * contract prefixed to that first input (UI-lbm5 §4.3).
 *
 * @param {{ runner: 'claude'|'codex', model?: string|null, effort?: string|null, session_id?: string|null, resume_session_id?: string|null, system_prompt: string, task_prompt: string, catalog?: any }} input
 * @returns {string[]}
 */
export function sessionLaneCommandArgs(input) {
  const model = input.model ?? '';
  const effort = input.effort ?? '';
  const flags = conversationLaunchFlags(
    input.runner,
    /** @type {any} */ ({
      claude_model: input.runner === 'claude' ? model : '',
      claude_effort: input.runner === 'claude' ? effort : '',
      codex_model: input.runner === 'codex' ? model : '',
      codex_effort: input.runner === 'codex' ? effort : ''
    }),
    input.catalog ?? null
  );
  const resume =
    typeof input.resume_session_id === 'string' &&
    input.resume_session_id.length > 0
      ? input.resume_session_id
      : null;
  if (input.runner === 'codex') {
    const first_input = `${input.system_prompt}\n\n${input.task_prompt}`;
    return resume
      ? ['resume', ...flags, resume, first_input]
      : [...flags, first_input];
  }
  return [
    ...(resume
      ? ['--resume', resume]
      : typeof input.session_id === 'string' && input.session_id.length > 0
        ? ['--session-id', input.session_id]
        : []),
    ...flags,
    '--append-system-prompt',
    input.system_prompt,
    input.task_prompt
  ];
}

/**
 * The verdict of a session-lane window whose last assistant message opens
 * with a terminal result line, in the headless `RunnerVerdict` shape so the
 * SAME `onSessionDone` branch judges it (UI-lbm5 §4.5). Null when the first
 * line is not a terminal result line — that message is an answer wait.
 *
 * @param {{ first_line?: string|null, text?: string|null }|null|undefined} message
 * @returns {import('./runner/session.js').RunnerVerdict|null}
 */
export function sessionLaneVerdict(message) {
  const line =
    typeof message?.first_line === 'string' && message.first_line.length > 0
      ? message.first_line
      : typeof message?.text === 'string'
        ? message.text
        : '';
  const terminal_result = terminalResultOf(line);
  if (terminal_result === null) {
    return null;
  }
  return {
    success: true,
    reason: 'ok',
    summary: line.trim().slice(0, 200),
    terminal_result,
    exit: null,
    blocked: false,
    blocked_detail: null,
    events: [],
    raw: []
  };
}

/**
 * Whether a terminal result line asks for a person's answer, so a live
 * session-lane window keeps its window, claim and slot instead of settling
 * (UI-mcth §4.1): the `parked`, `failure`, `environment` and `recovery_wait`
 * kinds. Every other kind, and no result line at all, is false.
 *
 * @param {{ kind?: string|null }|null|undefined} terminal_result
 * @returns {boolean}
 */
export function sessionLaneHoldsWindow(terminal_result) {
  const kind = terminal_result?.kind;
  return (
    kind === 'parked' ||
    kind === 'failure' ||
    kind === 'environment' ||
    kind === 'recovery_wait'
  );
}

/**
 * Whether a live session-lane window waits for the person (UI-lbm5 §4.4,
 * UI-mcth §4.2): a question prompt, or an idle turn whose last assistant
 * message is not a settling result line — either no result line, or one of
 * the kinds {@link sessionLaneHoldsWindow} keeps the window for.
 *
 * @param {'running'|'question'|'limit'|'idle'|null|undefined} turn_state
 * @param {{ first_line?: string|null, text?: string|null }|null|undefined} last_message
 * @returns {boolean}
 */
export function sessionLaneAwaitsAnswer(turn_state, last_message) {
  if (turn_state === 'question') {
    return true;
  }
  if (turn_state !== 'idle' || !last_message) {
    return false;
  }
  const verdict = sessionLaneVerdict(last_message);
  return verdict === null || sessionLaneHoldsWindow(verdict.terminal_result);
}

/**
 * Whether ONE successful marker listing shows the attempt's window alive: a
 * live pane keyed by the Bead, and — once the launch recorded it — the same
 * pane id. Only a successful listing may answer `false` (UI-lbm5 §4.4).
 *
 * @param {Array<{ pane: string, key: string, dead: string }>} rows
 * @param {{ bead_id: string, interactive?: { pane_id?: string|null }|null }} attempt
 * @returns {boolean}
 */
export function sessionLanePaneAlive(rows, attempt) {
  const pane_id = attempt.interactive?.pane_id ?? null;
  return rows.some(
    (row) =>
      row.key === attempt.bead_id &&
      row.dead === '0' &&
      (pane_id === null || row.pane === pane_id)
  );
}
