/**
 * Same-session conversation launcher for a stopped Worker attempt (UI-nuwy
 * §3.2, superseding the UI-gjp2 fork inquiry).
 *
 * Every string-valued `awaiting_user` park and every conversation-target
 * recovery wait (`session-stall.js`) reaches this module. `onParkedAttempt` is
 * the automatic trigger and obeys `worker_direction_inquiry.enabled`;
 * `launchForClick` is the user's explicit `[세션에서 해결]` action and
 * deliberately ignores that automatic-launch gate. Both reopen the attempt's
 * OWN runner session interactively in tmux — no fork — with the one dotfiles
 * entry block as its first input, at most one live conversation pane per Bead.
 *
 * Four properties are load-bearing:
 *
 *   - NO-THROW. `onParkedAttempt` is called fire-and-forget from a queue
 *     transition, so every path is wrapped and the returned promise ALWAYS
 *     resolves. Nothing here may fail an attempt settlement.
 *   - FAIL-CLOSED ON TMUX. A tmux that cannot be reached means liveness cannot
 *     be judged, and a duplicate nobody could rule out is worse than no
 *     session: the launch is skipped and the notification says why.
 *   - ONE PROCESS PER SESSION ID. The attempt's runner process must be proven
 *     gone before its session is reopened; an alive or unobservable runner
 *     refuses the launch instead of letting two processes write one session.
 *   - THE MARKER PRECEDES THE CLI. The pane's `@bdui_inquiry_bead` option is
 *     written by the wrapper BEFORE it execs the runner, so a marker-less live
 *     conversation cannot exist and pane liveness stays a sound duplicate
 *     guard across a server restart.
 */
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_INQUIRY_TMUX_SESSION } from '../config.js';
import { debug } from '../logging.js';
import {
  DEFAULT_START_TOLERANCE_MS,
  observeProcessIdentity
} from './process-controller.js';
import { qualifyAttemptSession } from './session-ref.js';
import { conversationStopLabel } from './session-stall.js';
// The tmux launch primitives are shared with the `[세션에서 해결]` resolve
// session (UI-jw27 §4). The marker option, the entry block, and the launch
// reason all stay this module's.
import {
  INQUIRY_PANE_MARKER,
  createTmuxLauncher,
  markerWrapper,
  shellQuote
} from './tmux-launcher.js';

const default_log = debug('worker:direction-inquiry');

/** The pane option that names the Bead a conversation window belongs to. */
const PANE_MARKER = INQUIRY_PANE_MARKER;

/** What a field with nothing behind it prints, rather than an empty slot. */
const ABSENT = '(없음)';

/**
 * The first input of a same-session conversation, quoted verbatim from dotfiles
 * `src/shared/skills/flow/workflow/references/execution-common.md`
 * (`## Worker 세션 대화`, commit `f031c9853f536c1478e9d1129b8c69628be27ef8`),
 * with no trailing newline. This is the TEMPLATE: beads-ui fills only the
 * stop label, the session's sentence, and the two paths; `<원문>`,
 * `<결정 한 줄>` and `<한 줄>` belong to the session. beads-ui adds no
 * procedure and no prohibition of its own.
 *
 * @type {string}
 */
export const CONVERSATION_ENTRY_BLOCK = [
  '이 세션은 방금까지 무인 Worker attempt였고 <멈춤 사유>로 멈춰, 지금 사용자와 대화하도록 다시 열렸다. 사용자는 이 tmux 창이나 Discord 스레드에서 답한다.',
  '- 멈춤 사유: <awaiting_user=<값> | recovery:<authority|no_progress> | recovery:<옛 사유> (옛 기록)>',
  '- 세션이 남긴 문장: <blocker 문장>',
  '- 구현 워크트리: <path>',
  '- target_base 체크아웃: <path>',
  '',
  '절차',
  '1. 무엇이 막혔고 사용자가 무엇을 정해야 하는지 한 문단으로 요약하고, 선택지와 권고를 붙여 묻는다. 질문 도구가 있으면 쓰고, 없으면 산문으로 묻고 턴을 끝낸다. 턴이 끝나면 사용자 차례다.',
  '2. 답이 결정을 주면 notes에 `대화 결정: <멈춤 사유> — 사용자 답: <원문>` 한 줄을 남긴다. 결정을 확인하는 데 필요한 읽기·진단·워크트리 안 로컬 수정·로컬 검증은 이 대화에서 해도 된다.',
  '3. 대화를 끝내는 턴의 마지막 메시지 첫 줄에 결과 줄 하나를 쓴다.',
  '   - `인계 · <결정 한 줄>`: Worker가 이 세션을 무인으로 이어받아 결정의 적용·영수증·해제·발행·push·보고를 한다.',
  '   - `인수 · <한 줄>`: 사용자가 이 대화에서 끝까지 가겠다고 명시했을 때만. 그 뒤 이 세션은 대화형 세션 규칙으로 finish까지 간다.',
  '   - `보류 · <한 줄>`: 사용자가 나중에 보겠다고 했을 때. 대화를 끝내고 attempt는 대기로 남는다.',
  '   결과 줄 없이 끝난 턴은 사용자 답을 기다리는 턴이다.',
  '',
  '금지(인수 전): push·PR·발행·배포·릴리스 · Bead 상태 변경 · metadata 영수증 쓰기와 `awaiting_user` 해제(예외: 사용자 답 턴에서만 쓸 수 있는 `plan_approval=user@<sha>`와, 그와 같은 쓰기로 하는 `awaiting_user` 해제) · 외부 리뷰어 dispatch · 공급자 세션 상태 파일 직접 수정 · 중첩 헤드리스 세션 기동.'
].join('\n');

/** The server-owned slots; every other `<…>` belongs to the session. */
const SLOT_STOP_LINE =
  '<awaiting_user=<값> | recovery:<authority|no_progress> | recovery:<옛 사유> (옛 기록)>';
const SLOT_STOP = '<멈춤 사유>';
const SLOT_SENTENCE = '<blocker 문장>';
const SLOT_WORKTREE = '- 구현 워크트리: <path>';
const SLOT_CHECKOUT = '- target_base 체크아웃: <path>';

/**
 * Fill the entry block's server-owned slots in ONE pass, so an inserted value
 * that quotes a slot is never rescanned. The two `<path>` slots are told
 * apart by their line prefix.
 *
 * @param {{ stop: string|null, sentence: string|null, worktree: string|null, checkout: string|null }} input
 * @returns {string}
 */
export function fillConversationEntry(input) {
  const stop = input.stop || ABSENT;
  /** @type {Map<string, string>} */
  const values = new Map([
    [SLOT_STOP_LINE, stop],
    [SLOT_STOP, stop],
    [SLOT_SENTENCE, input.sentence || ABSENT],
    [SLOT_WORKTREE, `- 구현 워크트리: ${input.worktree || ABSENT}`],
    [SLOT_CHECKOUT, `- target_base 체크아웃: ${input.checkout || ABSENT}`]
  ]);
  const pattern = new RegExp(
    [...values.keys()]
      .map((slot) => slot.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|'),
    'g'
  );
  return CONVERSATION_ENTRY_BLOCK.replace(
    pattern,
    (slot) => values.get(slot) ?? slot
  );
}

/**
 * The sentence a park left: the last notes line naming this park's value,
 * else the last `park:` line, printed as-is.
 *
 * @param {unknown} notes
 * @param {string} awaiting_user
 * @returns {string|null}
 */
export function parkSentence(notes, awaiting_user) {
  if (typeof notes !== 'string' || notes.length === 0) {
    return null;
  }
  const lines = notes.split('\n').map((line) => line.trim());
  const own = lines.filter((line) => line.startsWith(`park: ${awaiting_user}`));
  if (own.length > 0) {
    return own[own.length - 1];
  }
  const any = lines.filter((line) => line.startsWith('park:'));
  return any.length > 0 ? any[any.length - 1] : null;
}

/**
 * The blocker sentence a recovery wait left: the summary's first line without
 * its leading `blocker:`.
 *
 * @param {unknown} summary
 * @returns {string|null}
 */
export function recoverySentence(summary) {
  if (typeof summary !== 'string') {
    return null;
  }
  const first = summary
    .split('\n')[0]
    .replace(/^blocker:\s*/, '')
    .trim();
  return first.length > 0 ? first : null;
}

/**
 * @typedef {Object} InquiryOutcome
 * @property {boolean} launched
 * @property {'launched'|'already_running'|'not_launched'} session
 * @property {string|null} reason
 * @property {'resume'|'fresh'} mode
 * @property {'attempt'|'fresh'} [source]
 * @property {string|null} fallback_reason
 * @property {string|null} session_id
 * @property {'claude'|'codex'} runner - The provider the window actually runs.
 * The attempt's own runner for a same-session conversation; a fresh fallback
 * keeps the same provider.
 * @property {string|null} command
 * @property {boolean} bridge_active
 * @property {string|null} tmux_session
 * @property {string|null} tmux_window
 * @property {string|null} [stop] - The stop label the entry block printed.
 * @property {string|null} [sentence] - The session's own sentence.
 */

// Re-exported rather than re-implemented: the wrapper's quoting is the shared
// launcher's, and this module's own tests still assert it here.
export { shellQuote };

/**
 * The one-line shell command the conversation pane runs.
 *
 * `set-option` comes FIRST and the two commands are joined by `&&`: a marker
 * that cannot be written never reaches the `exec`, so the runner does not
 * start and the pane closes.
 *
 * @param {{ bead_id: string, claude: string, prompt: string }} input
 * @returns {string}
 */
export function inquiryWrapper(input) {
  return markerWrapper({
    marker: PANE_MARKER,
    key: input.bead_id,
    argv: [input.claude, input.prompt]
  });
}

/**
 * @typedef {Object} DirectionInquiryDeps
 * @property {() => any} getConfig - Runtime config accessor (server/config.js).
 * @property {{ readIssue: (workspace: string, bead_id: string) => Promise<any> }} bd
 * @property {{ conversationConfirm?: (input: any) => Promise<unknown>|unknown }} notifier
 * @property {(args: string[]) => Promise<{ code: number, stdout: string, stderr: string }>} [runTmux]
 * @property {() => string|null} [resolveClaude]
 * @property {(runner: string) => string|null} [resolveRunner]
 * @property {(workspace: string, issue: any) => 'claude'|'codex'|null} [currentRunner]
 * @property {(file_path: string) => { mtimeMs: number }} [statFile]
 * @property {() => number} [now]
 * @property {{ recordInteractiveSession: (workspace: string, record: any) => void }} [store]
 * @property {(...args: any[]) => void} [log]
 * @property {string} [heartbeatPath]
 * @property {{ home_dir?: string, hostname?: string, fs?: any, now?: () => number }} [sessionRefOptions]
 * @property {(workspace: string, attempt_id: string) => any|Promise<any>} [readAttempt] - Injected queue-store lookup; omission reads as unavailable rather than importing the runtime back through a cycle.
 * @property {(pid: number) => { ok: true, identity: { pid: number, process_started_at: number } }|{ ok: false, reason: string }} [observeProcess]
 * @property {(file_path: string) => boolean} [existsSync]
 */

/**
 * Build the conversation launcher.
 *
 * @param {DirectionInquiryDeps} deps
 */
export function createDirectionInquiry(deps) {
  const log = deps.log || default_log;
  const observeProcess = deps.observeProcess || observeProcessIdentity;
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
  // Reserve a bead synchronously before either public entry reaches its first
  // `await`. Otherwise two calls in one tick both observe no owner and launch
  // duplicate panes before either can publish its marker.
  /** @type {Set<string>} */
  const in_flight = new Set();

  /** Read automatic enablement and the shared tmux session name. */
  function readInquiryConfig() {
    /** @type {any} */
    let section;
    try {
      section = deps.getConfig()?.worker_direction_inquiry;
    } catch (err) {
      // Broken config cannot prove automatic launch was authorized. Read it as
      // disabled while retaining the default socket name for click responses.
      log('config read failed: %o', err);
      return { enabled: false, tmux_session: DEFAULT_INQUIRY_TMUX_SESSION };
    }
    const name = section?.tmux_session;
    return {
      enabled: section?.enabled === true,
      tmux_session:
        typeof name === 'string' && name.length > 0
          ? name
          : DEFAULT_INQUIRY_TMUX_SESSION
    };
  }

  /**
   * Read an attempt through the injected queue-store seam.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   */
  async function readAttempt(workspace, attempt_id) {
    try {
      if (!deps.readAttempt) {
        return null;
      }
      return await deps.readAttempt(workspace, attempt_id);
    } catch (err) {
      log('attempt read failed for %s: %o', attempt_id, err);
      return null;
    }
  }

  /**
   * Choose the attempt's own session, else a fresh session of the same
   * provider. The worktree must exist too: Claude resolves `--resume` by the
   * cwd's project, so the session cannot be reopened anywhere else.
   *
   * @param {string} workspace
   * @param {any} issue
   * @param {any} attempt
   * @param {boolean} worktree_present
   * @returns {{ session_id: string|null, runner: 'claude'|'codex', source: 'attempt'|'fresh', fallback_reason: string|null }}
   */
  function conversationTarget(workspace, issue, attempt, worktree_present) {
    const own = qualifyAttemptSession({
      attempt,
      options: deps.sessionRefOptions || {}
    });
    const runner =
      own.provider ?? deps.currentRunner?.(workspace, issue) ?? 'claude';
    if (own.ok && worktree_present) {
      return {
        session_id: own.session_id,
        runner,
        source: 'attempt',
        fallback_reason: null
      };
    }
    return {
      session_id: null,
      runner,
      source: 'fresh',
      fallback_reason: own.ok ? 'worktree_missing' : own.reason
    };
  }

  /**
   * One process per session id: the attempt's runner must be proven gone.
   * A recycled pid (different start time) is gone too.
   *
   * @param {any} attempt
   * @returns {string|null} The refusal reason, or null when the launch may go.
   */
  function runnerLivenessRefusal(attempt) {
    const identity = attempt?.process_identity;
    if (!identity || typeof identity.pid !== 'number') {
      return null;
    }
    /** @type {ReturnType<typeof observeProcessIdentity>} */
    let observed;
    try {
      observed = observeProcess(identity.pid);
    } catch (err) {
      log('runner observation failed for %s: %o', attempt.attempt_id, err);
      return 'runner_liveness_unknown';
    }
    if (!observed.ok) {
      return observed.reason === 'process_gone'
        ? null
        : 'runner_liveness_unknown';
    }
    const started_at = identity.started_at;
    if (
      typeof started_at === 'number' &&
      Math.abs(observed.identity.process_started_at - started_at) >
        DEFAULT_START_TOLERANCE_MS
    ) {
      return null;
    }
    return 'runner_alive';
  }

  /**
   * Create a uniform not-launched response.
   *
   * @param {string} reason
   * @param {{ stop?: string|null, sentence?: string|null, runner?: 'claude'|'codex' }} [facts]
   * @returns {InquiryOutcome}
   */
  function refusal(reason, facts = {}) {
    return {
      launched: false,
      session: 'not_launched',
      reason,
      mode: 'fresh',
      fallback_reason: null,
      session_id: null,
      runner: facts.runner ?? 'claude',
      command: null,
      bridge_active: launcher.bridgeActive(),
      tmux_session: null,
      tmux_window: null,
      stop: facts.stop ?? null,
      sentence: facts.sentence ?? null
    };
  }

  /**
   * Map the shared launcher result to the click response contract.
   *
   * @param {any} outcome
   * @param {{ session_id: string|null, runner: 'claude'|'codex', source: 'attempt'|'fresh', fallback_reason: string|null }} target
   * @param {{ tmux_session: string, bead_id: string, stop: string, sentence: string|null }} place
   * @param {string|null} launch_session_id
   * @returns {InquiryOutcome}
   */
  function inquiryOutcome(outcome, target, place, launch_session_id) {
    const same = target.session_id !== null;
    return {
      launched: outcome.session === 'launched',
      session: outcome.session,
      reason: outcome.session === 'not_launched' ? outcome.reason : null,
      mode: same ? 'resume' : 'fresh',
      source: target.source,
      fallback_reason: target.fallback_reason,
      session_id: same ? target.session_id : launch_session_id,
      runner: target.runner,
      command: same
        ? target.runner === 'codex'
          ? `codex resume ${shellQuote(/** @type {string} */ (target.session_id))}`
          : `claude --resume ${shellQuote(/** @type {string} */ (target.session_id))}`
        : target.runner === 'claude'
          ? `claude --session-id ${shellQuote(/** @type {string} */ (launch_session_id))}`
          : target.runner,
      bridge_active: launcher.bridgeActive(),
      tmux_session:
        outcome.session === 'not_launched' ? null : place.tmux_session,
      tmux_window: outcome.session === 'not_launched' ? null : place.bead_id,
      stop: place.stop,
      sentence: place.sentence
    };
  }

  /**
   * Build and launch one conversation.
   *
   * @param {any} input
   * @param {boolean} automatic
   * @returns {Promise<{ outcome: InquiryOutcome, title: string|null, repo: string, stop: string|null }>}
   */
  async function dispose(input, automatic) {
    const workspace = String(input.workspace ?? '');
    const bead_id = String(input.bead_id ?? '');
    const attempt_id = String(input.attempt_id ?? '');
    const awaiting_user = String(input.awaiting_user ?? '');
    const repo =
      typeof input.repo === 'string' && input.repo.length > 0
        ? input.repo
        : workspace;
    const attempt = await readAttempt(workspace, attempt_id);
    const recovery = input.recovery ?? attempt?.cause_detail?.recovery ?? null;
    const stop =
      conversationStopLabel({
        awaiting_user,
        recovery,
        blockers: attempt?.cause_detail?.blockers || []
      }) ??
      // A click may open any recovery wait; its label names the reason as is.
      (typeof recovery?.reason === 'string'
        ? `recovery:${recovery.reason}`
        : null);
    /** @type {any} */
    let issue = null;
    try {
      issue = await deps.bd.readIssue(workspace, bead_id);
    } catch (err) {
      log('bd read failed for %s: %o', bead_id, err);
    }
    const sentence = awaiting_user
      ? parkSentence(issue?.notes, awaiting_user)
      : recoverySentence(attempt?.cause_detail?.summary);
    const facts = { stop, sentence };
    if (!issue || typeof issue !== 'object') {
      return {
        outcome: refusal('bd_unavailable', facts),
        title: null,
        repo,
        stop
      };
    }
    const title = typeof issue.title === 'string' ? issue.title : null;
    const attempt_repo =
      typeof attempt?.repo === 'string' && attempt.repo.length > 0
        ? attempt.repo
        : null;
    if (!attempt || attempt_repo === null) {
      return {
        outcome: refusal('attempt_unavailable', facts),
        title,
        repo,
        stop
      };
    }
    const worktree = path.join(attempt_repo, '.worktrees', bead_id);
    const checkout = attempt_repo;
    const config = readInquiryConfig();
    if (automatic && !config.enabled) {
      return { outcome: refusal('disabled', facts), title, repo, stop };
    }
    const worktree_present = existsSync(worktree);
    const target = conversationTarget(
      workspace,
      issue,
      attempt,
      worktree_present
    );
    if (target.session_id !== null) {
      const refused = runnerLivenessRefusal(attempt);
      if (refused !== null) {
        return {
          outcome: refusal(refused, { ...facts, runner: target.runner }),
          title,
          repo,
          stop
        };
      }
    }
    const block = fillConversationEntry({
      stop,
      sentence,
      worktree,
      checkout
    });
    const launch_session_id =
      target.session_id === null && target.runner === 'claude'
        ? randomUUID()
        : null;
    const command_args =
      target.session_id !== null
        ? target.runner === 'codex'
          ? ['resume', target.session_id, block]
          : ['--resume', target.session_id, block]
        : target.runner === 'claude'
          ? ['--session-id', /** @type {string} */ (launch_session_id), block]
          : [block];
    const cwd = worktree_present ? worktree : checkout;
    const launched = await launcher.launch({
      marker: PANE_MARKER,
      key: bead_id,
      tmux_session: config.tmux_session,
      window_name: bead_id,
      cwd,
      commandArgs: command_args,
      runner: target.runner
    });
    if (launched.session === 'launched') {
      try {
        const launched_at = deps.now ? deps.now() : Date.now();
        const session_id = target.session_id ?? launch_session_id;
        if (deps.store) {
          deps.store.recordInteractiveSession(workspace, {
            bead_id,
            kind: 'inquiry',
            provider: target.runner,
            session_id,
            session_id_source: session_id === null ? null : 'launch',
            mode: target.session_id === null ? 'fresh' : 'resume',
            source: target.source,
            forked_from: null,
            fallback_reason: target.fallback_reason,
            attempt_id: attempt_id || null,
            failure_class: null,
            tmux_session: launched.tmux_session,
            tmux_window: launched.tmux_window,
            pane_id: launched.pane_id,
            cwd,
            launched_at,
            last_seen_alive_at: launched_at,
            settled_at: null,
            settled_by: null,
            state: 'live',
            exit_requested_at: null,
            defer_since: null,
            conversation: {
              stop: stop ?? ABSENT,
              processed_message_at: null,
              message_excerpt: null,
              result: null,
              handoff: null,
              takeover_notified_at: null
            }
          });
        } else {
          log('interactive session store unavailable for %s', bead_id);
        }
      } catch (err) {
        log('interactive session record failed for %s: %o', bead_id, err);
      }
    }
    return {
      outcome: inquiryOutcome(
        launched,
        target,
        {
          tmux_session: config.tmux_session,
          bead_id,
          stop: stop ?? ABSENT,
          sentence
        },
        launch_session_id
      ),
      title,
      repo,
      stop
    };
  }

  /**
   * Send the one `🙋 확인 필요` notification, no-throw.
   *
   * @param {Record<string, unknown>} input
   */
  async function announce(input) {
    try {
      await deps.notifier.conversationConfirm?.(input);
    } catch (err) {
      // Production notifier is no-throw; injected test/embedding fakes are not
      // bound by that contract and still must not fail attempt settlement.
      log('conversation confirm notify failed: %o', err);
    }
  }

  return {
    /**
     * Launch automatically after the stopped record is durable, then send the
     * `🙋 확인 필요` notification unless the caller already spent it for this
     * attempt (`confirm: false`).
     *
     * @param {{ workspace: string, bead_id: string, attempt_id: string, repo: string|null, target_base: string|null, awaiting_user: string|null, recovery?: { reason: string }, confirm?: boolean }} input
     * @returns {Promise<InquiryOutcome|undefined>}
     */
    async onParkedAttempt(input) {
      const bead_id =
        input && typeof input.bead_id === 'string' ? input.bead_id : '';
      const awaiting_user =
        input && typeof input.awaiting_user === 'string'
          ? input.awaiting_user
          : '';
      if (
        bead_id.length === 0 ||
        (awaiting_user.length === 0 && !input.recovery?.reason)
      ) {
        return undefined;
      }
      if (in_flight.has(bead_id)) {
        return refusal('inquiry_in_flight');
      }
      in_flight.add(bead_id);
      try {
        const result = await dispose(input, true);
        if (input.confirm !== false) {
          await announce({
            bead_id,
            title: result.title,
            awaiting_user: awaiting_user || null,
            repo: result.repo,
            ...result.outcome,
            stop: result.stop
          });
        }
        return result.outcome;
      } catch (err) {
        log('conversation launch failed for %s: %o', bead_id, err);
        return refusal('error');
      } finally {
        in_flight.delete(bead_id);
      }
    },

    /**
     * Launch from the stopped tile without consulting `enabled`.
     *
     * The liveness question is answered by the pane marker BEFORE any Bead or
     * attempt read: a `bd` that cannot be reached must not hide a session
     * that is already up, and the module reservation is not that evidence —
     * it is held while the launch is still being built, and that can still
     * end in a refusal, so answering `already_running` from it would name a
     * window nobody opened.
     *
     * @param {{ workspace: string, bead_id: string, attempt_id: string, repo: string|null, awaiting_user: string|null, recovery?: { reason: string } }} input
     * @returns {Promise<InquiryOutcome>}
     */
    async launchForClick(input) {
      const bead_id =
        input && typeof input.bead_id === 'string' ? input.bead_id : '';
      const awaiting_user =
        input && typeof input.awaiting_user === 'string'
          ? input.awaiting_user
          : '';
      if (
        bead_id.length === 0 ||
        (awaiting_user.length === 0 && !input.recovery?.reason)
      ) {
        return refusal('invalid_park');
      }
      const listed = await launcher.listPanes(PANE_MARKER);
      if (!listed.ok) {
        return refusal('tmux_unavailable');
      }
      const live = listed.rows.find(
        (row) => row.key === bead_id && row.dead === '0'
      );
      if (live) {
        return {
          ...refusal('already_running'),
          session: 'already_running',
          reason: null,
          tmux_session: live.session,
          tmux_window: bead_id
        };
      }
      if (in_flight.has(bead_id)) {
        // A launch is mid-flight and its pane has not appeared yet. Saying
        // `already_running` would point at nothing; the honest answer lets the
        // next click read the settled state.
        return refusal('inquiry_in_flight');
      }
      in_flight.add(bead_id);
      try {
        return (await dispose(input, false)).outcome;
      } catch (err) {
        log('conversation click failed for %s: %o', bead_id, err);
        return refusal('error');
      } finally {
        in_flight.delete(bead_id);
      }
    },

    /** Probe the configured tmux socket at startup. */
    async probeTmux() {
      if (!readInquiryConfig().enabled) {
        return;
      }
      const listed = await launcher.listPanes(PANE_MARKER);
      // Daemons normally run without `--debug`; startup reachability must use
      // console output or this operational failure disappears entirely.
      if (!listed.ok) {
        console.warn(`direction_inquiry: tmux unreachable: ${listed.error}`);
        return;
      }
      console.log(
        `direction_inquiry: tmux reachable (${listed.rows.length} panes)`
      );
    }
  };
}
