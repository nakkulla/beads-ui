/**
 * The `[세션에서 해결]` launcher (UI-jw27 §4).
 *
 * A terminal failure the Worker cannot retry away lands the bead on
 * `needs_human`, and ADR 0005 forbids dispatching an automatic repair session
 * for it. What this module starts is NOT that: it is the interactive session a
 * person would otherwise open by hand in a terminal, started by their own
 * CLICK, marked so the external `claude-discord-bridge` relays it. beads-ui
 * starts it, marks it, and reports what it did — nothing else.
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
import { DEFAULT_INQUIRY_TMUX_SESSION } from '../config.js';
import { debug } from '../logging.js';
import { discardOperationActive } from './discard-phase.js';
import { qualifySessionFork } from './session-ref.js';
import {
  RESOLVE_PANE_MARKER,
  createTmuxLauncher,
  shellQuote
} from './tmux-launcher.js';

const default_log = debug('worker:resolve-session');

/**
 * The only provider a recorded session may be forked from here. A `codex:`
 * item is a `provider_mismatch` rather than a `codex resume`: this lane's
 * prompt, its `--fork-session` flag and the bridge's relay are all Claude's.
 *
 * @type {string}
 */
const FORK_RUNNER = 'claude';

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
 */

/**
 * The terminal failure a `[세션에서 해결]` click is about, read off the queue
 * snapshot the click was validated against.
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
      detail: typeof terminal?.evidence === 'string' ? terminal.evidence : null
    };
  }
  const cleanup = queue?.cleanup_failed?.[bead_id];
  if (cleanup && typeof cleanup === 'object') {
    return {
      failure_class: '정리 중단',
      reason: typeof cleanup.reason === 'string' ? cleanup.reason : '원인 미상',
      stage: typeof cleanup.step === 'string' ? cleanup.step : null,
      detail: typeof cleanup.detail === 'string' ? cleanup.detail : null
    };
  }
  const operations = queue?.discard_operations;
  const discard = Object.values(
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
  if (discard) {
    return {
      failure_class: '폐기 실패',
      reason: /** @type {any} */ (discard).last_error,
      stage:
        typeof (/** @type {any} */ (discard).phase) === 'string'
          ? /** @type {any} */ (discard).phase
          : null,
      detail: null
    };
  }
  return null;
}

/**
 * The first input of a resolution session.
 *
 * It states the four things the spec names — class, cause code, Bead id,
 * candidate actions — and nothing else. The procedure is deliberately thin: a
 * forked session already carries the work's whole history, and a fresh one is
 * told where to read it rather than being handed a summary this server would
 * have to invent.
 *
 * @param {{ bead_id: string, failure: ResolveFailureContext, checkout: string, fallback_reason: string|null }} input
 * @returns {string}
 */
export function buildResolvePrompt(input) {
  const lines = [];
  lines.push(
    input.fallback_reason === null
      ? `이 세션이 맡았던 Bead ${input.bead_id}의 작업이 terminal 실패로 멈춰 사람 확인이 필요합니다.`
      : `Bead ${input.bead_id}의 작업이 terminal 실패로 멈춰 사람 확인이 필요합니다. 기록된 세션을 이어받지 못했습니다(${input.fallback_reason}) — 계보는 \`bd show ${input.bead_id} --json\`의 notes와 댓글에서 읽으세요.`
  );
  lines.push(`- 클래스: ${input.failure.failure_class}`);
  lines.push(`- 원인 코드: ${input.failure.reason}`);
  if (input.failure.stage) {
    lines.push(`- 단계: ${input.failure.stage}`);
  }
  if (input.failure.detail) {
    lines.push(`- 진단: ${input.failure.detail}`);
  }
  lines.push(`- 체크아웃: ${input.checkout}`);
  lines.push('');
  lines.push('후보 행동');
  lines.push(
    '1. 원인 코드와 로그를 읽고 무엇이 막혔는지 한 문단으로 확정한다.'
  );
  lines.push(
    '2. 고칠 수 있는 원인이면 고치고, 사용자에게 Worker 화면의 [정리 재시도]로 재개하라고 알린다.'
  );
  lines.push(
    '3. 판단이 필요하면 `AskUserQuestion`을 부른다 — 이 세션은 Discord로 중계된다.'
  );
  lines.push('4. 확인한 것과 바꾼 것을 Bead notes에 남긴다.');
  lines.push('');
  lines.push(
    '금지: 머지·폐기 실행 · Worker 큐 상태 직접 편집 · 실패 기록 삭제.'
  );
  return lines.join('\n') + '\n';
}

/**
 * @typedef {Object} ResolveSessionDeps
 * @property {() => any} getConfig - Runtime config accessor (server/config.js).
 * @property {{ readIssue: (workspace: string, bead_id: string) => Promise<any> }} bd
 * @property {(args: string[]) => Promise<{ code: number, stdout: string, stderr: string }>} [runTmux]
 * @property {() => string|null} [resolveClaude]
 * @property {(file_path: string) => { mtimeMs: number }} [statFile]
 * @property {() => number} [now]
 * @property {(...args: any[]) => void} [log]
 * @property {string} [heartbeatPath]
 * @property {{ home_dir?: string, hostname?: string, fs?: any, now?: () => number }} [sessionRefOptions]
 */

/**
 * @typedef {Object} ResolveSessionOutcome
 * @property {boolean} launched
 * @property {'launched'|'already_running'|'not_launched'} session
 * @property {string|null} reason - Why nothing was launched; null otherwise.
 * @property {'fork'|'fresh'} mode
 * @property {string|null} fallback_reason - Why the recorded session was not
 * forked; null on a fork.
 * @property {string|null} session_id
 * @property {string|null} command
 * @property {boolean} bridge_active
 * @property {string|null} tmux_session
 * @property {string|null} tmux_window
 */

/**
 * Build the resolution-session launcher.
 *
 * @param {ResolveSessionDeps} deps
 */
export function createResolveSession(deps) {
  const log = deps.log || default_log;
  const launcher = createTmuxLauncher({
    ...(deps.runTmux ? { runTmux: deps.runTmux } : {}),
    ...(deps.resolveClaude ? { resolveClaude: deps.resolveClaude } : {}),
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
    /** @type {any} */
    let section;
    try {
      section = deps.getConfig()?.worker_direction_inquiry;
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
   * Which recorded session, if any, this bead's resolution may fork.
   *
   * A bd read that fails is its OWN reason rather than `no_session_ref`: the
   * bead may well carry a forkable session and this server just could not see
   * it, and reporting the two as one fact would send the operator looking for a
   * missing metadata key that is not missing.
   *
   * @param {string} workspace
   * @param {string} bead_id
   * @returns {Promise<{ session_id: string|null, fallback_reason: string|null }>}
   */
  async function forkTarget(workspace, bead_id) {
    /** @type {any} */
    let issue = null;
    try {
      issue = await deps.bd.readIssue(workspace, bead_id);
    } catch (err) {
      log('bd read failed for %s: %o', bead_id, err);
      return { session_id: null, fallback_reason: 'bd_unavailable' };
    }
    if (!issue || typeof issue !== 'object') {
      return { session_id: null, fallback_reason: 'bd_unavailable' };
    }
    const qualified = qualifySessionFork(
      issue.metadata,
      FORK_RUNNER,
      deps.sessionRefOptions || {}
    );
    return qualified.ok
      ? { session_id: qualified.session_id, fallback_reason: null }
      : { session_id: null, fallback_reason: qualified.reason };
  }

  return {
    /**
     * Start (or find) this bead's resolution session.
     *
     * @param {{ workspace: string, repo?: string|null, bead_id: string, failure: ResolveFailureContext }} input
     * @returns {Promise<ResolveSessionOutcome>}
     */
    async resolve(input) {
      const checkout =
        typeof input.repo === 'string' && input.repo.length > 0
          ? input.repo
          : input.workspace;
      const { session_id, fallback_reason } = await forkTarget(
        input.workspace,
        input.bead_id
      );
      const prompt = buildResolvePrompt({
        bead_id: input.bead_id,
        failure: input.failure,
        checkout,
        fallback_reason
      });
      const command_args =
        session_id === null
          ? [prompt]
          : ['--resume', session_id, '--fork-session', prompt];
      const outcome = await launcher.launch({
        marker: RESOLVE_PANE_MARKER,
        key: input.bead_id,
        tmux_session: tmuxSessionName(),
        window_name: `resolve-${input.bead_id}`,
        cwd: checkout,
        commandArgs: command_args
      });
      return {
        launched: outcome.session === 'launched',
        session: outcome.session,
        reason: outcome.session === 'not_launched' ? outcome.reason : null,
        mode: session_id === null ? 'fresh' : 'fork',
        fallback_reason,
        session_id,
        command:
          session_id === null
            ? 'claude'
            : `claude --resume ${shellQuote(session_id)} --fork-session`,
        bridge_active: launcher.bridgeActive(),
        tmux_session:
          outcome.session === 'launched' ? outcome.tmux_session : null,
        tmux_window: outcome.session === 'launched' ? outcome.tmux_window : null
      };
    }
  };
}
