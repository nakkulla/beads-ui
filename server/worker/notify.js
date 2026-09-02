/**
 * Worker attempt lifecycle → Discord push (UI-2yoq, UI-9rrk).
 *
 * The worker had exactly one outward signal — the `emitQueueChanged` websocket
 * stream — so a queue nobody was looking at was a queue nobody heard from. This
 * module adds the transitions worth interrupting a human for: an attempt
 * STARTS, an attempt FAILS (with its cause), an attempt reaches `pr_wait` (the
 * point where the queue is waiting on a human's [머지] click), and the merge
 * that CLOSES the bead (UI-9rrk).
 *
 * Two properties are load-bearing:
 *
 *   - FIRE-AND-FORGET. The child is spawned detached with `stdio: 'ignore'` and
 *     immediately unref'd; nothing waits on its exit code. A missing `discord`
 *     CLI (ENOENT) surfaces as an async `error` event, which is logged and
 *     dropped.
 *   - NO-THROW. Every method is wrapped end to end, so no input and no
 *     environment can turn a notification into a queue-transition failure. The
 *     methods are `async`, and the returned promise ALWAYS resolves.
 *
 * The payload is PLAIN CONTENT, not an embed (UI-vb0t). Discord's push preview
 * carries a message's `content` and nothing else, so an embed — which is what
 * the CLI builds whenever a title flag is passed — reaches the notification
 * centre as the mention alone. Everything worth reading therefore goes in the
 * message body, starting with the transition and the bead on line one, and the
 * embed's colour bar is given up for it.
 *
 * Notification config is read per call, so toggling it does not need a server
 * restart.
 */
import { spawn } from 'node:child_process';
import path from 'node:path';
import { debug } from '../logging.js';

const default_log = debug('worker:notify');

/**
 * Headline prefixes: the sender mark, then the transition. WHO ran it used to
 * be spelled out as "beads worker", which spent the first characters of every
 * push preview on a constant and pushed the bead out of view; one emoji says
 * the same thing in two columns. The transition's own emoji is what
 * distinguishes it at a glance now that the embed colour is gone (UI-vb0t
 * §3.1).
 */
const SENDER = '🤖';

const TITLE = {
  started: `${SENDER} 🚀 시작`,
  resume: `${SENDER} 🚀 재개`,
  conflict: `${SENDER} 🚀 충돌 해결`,
  failed: `${SENDER} ❌ 실패`,
  pr_wait: `${SENDER} 📬 PR 제출`,
  merged: `${SENDER} ✅ 머지 완료`,
  awaiting_user: `${SENDER} ⏸️ 방향 질의`,
  // One transition for every user-initiated terminal failure (UI-jw27 §1). The
  // kinds are told apart by the body's `클래스:` line rather than by their own
  // titles: a push preview that says only which of five internal write paths
  // failed would not tell the reader anything the class line does not.
  needs_human: `${SENDER} 🚨 사람 필요`
};

/**
 * How much of a bead title the headline may spend. The first line is the whole
 * push preview budget, so a long title would push the transition and the id out
 * of view on a narrow notification.
 */
const TITLE_MAX = 60;

/**
 * One user-initiated terminal failure, as the four durable-write call sites
 * describe it (UI-jw27 §2). Only `bead_id` and `failure_class` are structural;
 * every other field is dropped from the body when absent.
 *
 * @typedef {Object} NeedsHumanInput
 * @property {string} bead_id
 * @property {string|null} [title]
 * @property {string} failure_class - The `클래스:` value, from the §2 vocabulary.
 * @property {string|null} [reason] - The failure's own cause code, unfolded.
 * @property {string|null} [reason_detail] - Human-readable tail for that code.
 * @property {string|null} [next_action] - The recommended next click, supplied
 * by the call site because only it knows which buttons that row draws.
 * @property {string|null} [pr_url]
 * @property {string|null} [repo]
 */

/**
 * @typedef {Object} NotifierDeps
 * @property {() => any} getConfig - Runtime config accessor (server/config.js).
 * @property {(command: string, args: string[], options: any) => any} [spawnImpl]
 * @property {(...args: any[]) => void} [log]
 * @property {(bead_id: string) => Promise<string|null>} [resolveTitle] - Bead title source for the headline. Optional: a notifier built without one sends id-only headlines rather than failing.
 */

/**
 * The repo's display label — its basename. One operator watches many
 * workspaces, so a bare bead id is not enough to place a notification.
 *
 * @param {unknown} repo
 * @returns {string|null}
 */
function repoLabel(repo) {
  if (typeof repo !== 'string' || repo.length === 0) {
    return null;
  }
  const name = path.basename(repo);
  return name.length > 0 ? name : null;
}

/**
 * A non-empty trimmed string, or null. Every notification field is optional in
 * practice (a resumed attempt has no bead title, a failure has no PR), so the
 * message builders drop absent fields instead of printing `null`.
 *
 * @param {unknown} value
 * @returns {string|null}
 */
function text(value) {
  if (typeof value !== 'string') {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * The first line of a multi-line diagnostic, trimmed. A failure tail is quoted
 * as ONE line (UI-jw27 §1): a script's output pasted whole would push the class
 * and the next action out of the notification preview it exists to fill.
 *
 * @param {unknown} value
 * @returns {string|null}
 */
function firstLine(value) {
  const trimmed = text(value);
  return trimmed === null ? null : (text(trimmed.split('\n')[0]) ?? null);
}

/**
 * The push preview's first line: the transition, then the bead it is about.
 * Without the id and title here a notification says only that SOMETHING moved,
 * which is the whole failure this format exists to fix (UI-vb0t §3.2).
 *
 * @param {string} transition
 * @param {unknown} bead_id
 * @param {string|null} bead_title
 * @returns {string}
 */
function headline(transition, bead_id, bead_title) {
  const id = String(bead_id);
  if (!bead_title) {
    return `${transition} — ${id}`;
  }
  // Counted in code POINTS, not UTF-16 units: slicing a title mid-surrogate
  // would put a broken character in the preview.
  const chars = Array.from(bead_title);
  const title =
    chars.length > TITLE_MAX
      ? `${chars.slice(0, TITLE_MAX).join('')}…`
      : bead_title;
  return `${transition} — ${id} ${title}`;
}

/**
 * Build the attempt-lifecycle notifier the scheduler fires on dispatch, on
 * failure, and on `pr_wait` entry, and the PR actions fire on merge cleanup.
 *
 * @param {NotifierDeps} deps
 * @returns {{
 *   attemptStarted: (input: { bead_id: string, title?: string|null, runner?: string|null, model?: string|null, effort?: string|null, speed?: string|null, repo?: string|null, kind?: string|null }) => Promise<void>,
 *   attemptFailed: (input: { bead_id: string, cause: string, repo?: string|null, cause_detail?: { reason: string, command: string|null }|null }) => Promise<void>,
 *   prWaitEntered: (input: { bead_id: string, pr_url?: string|null, repo?: string|null }) => Promise<void>,
 *   mergeCompleted: (input: { bead_id: string, pr_url?: string|null, repo?: string|null }) => Promise<void>,
 *   awaitingUser: (input: { bead_id: string, title?: string|null, awaiting_user?: string|null, stale_kind?: string|null, session?: string|null, reason?: string|null, tmux_session?: string|null, tmux_window?: string|null, bridge_active?: boolean, repo?: string|null }) => Promise<void>,
 *   needsHuman: (input: NeedsHumanInput) => Promise<void>
 * }}
 */
export function createNotifier(deps) {
  const spawnImpl =
    deps.spawnImpl ||
    ((
      /** @type {string} */ c,
      /** @type {string[]} */ a,
      /** @type {any} */ o
    ) => spawn(c, a, o));
  const log = deps.log || default_log;

  /**
   * The configured argv, or null when notifications are off. A config read that
   * throws counts as off — a broken config must not push, and must not throw
   * into the scheduler either.
   *
   * @returns {string[]|null}
   */
  function resolveCmd() {
    /** @type {any} */
    let section;
    try {
      section = deps.getConfig()?.worker_notify;
    } catch (err) {
      log('config read failed: %o', err);
      return null;
    }
    if (!section || section.enabled !== true) {
      return null;
    }
    const cmd = section.cmd;
    if (
      !Array.isArray(cmd) ||
      cmd.length === 0 ||
      !cmd.every(
        (/** @type {unknown} */ a) => typeof a === 'string' && a.length > 0
      )
    ) {
      return null;
    }
    return cmd.slice();
  }

  /**
   * Spawn the notification command without a shell and forget it.
   *
   * The message is the ONLY argument: no title flag (which would make the CLI
   * build an embed the push preview drops), no colour flag (embed-only), and no
   * quiet flag — a message with no mention does not reach the notification
   * centre at all under a mention-only channel setting (UI-vb0t §3.1).
   *
   * The argv is passed IN, not resolved here: the caller has to know whether
   * notifications are on before it does any work, so it reads the config first
   * and hands the result down.
   *
   * @param {string[]} cmd
   * @param {string} message
   */
  function send(cmd, message) {
    try {
      const child = spawnImpl(cmd[0], [...cmd.slice(1), message], {
        stdio: 'ignore',
        detached: true
      });
      if (child && typeof child.on === 'function') {
        // ENOENT (no `discord` on PATH) arrives here, not as a spawn throw.
        child.on('error', (/** @type {any} */ err) => {
          log('notify spawn error: %o', err);
        });
      }
      if (child && typeof child.unref === 'function') {
        child.unref();
      }
    } catch (err) {
      log('notify spawn failed: %o', err);
    }
  }

  /**
   * The bead title for a headline, or null. A lookup that is absent, fails, or
   * answers nothing is fail-quiet: the push goes out with the id alone rather
   * than waiting on or failing over a decoration.
   *
   * @param {unknown} bead_id
   * @returns {Promise<string|null>}
   */
  async function lookupTitle(bead_id) {
    if (typeof deps.resolveTitle !== 'function') {
      return null;
    }
    try {
      return text(await deps.resolveTitle(String(bead_id)));
    } catch (err) {
      log('title lookup failed: %o', err);
      return null;
    }
  }

  /**
   * The body the two PR-side notifications share: the headline, the PR url when
   * one was observed, and the repo label. Everything but the headline is
   * dropped when absent rather than printed empty.
   *
   * @param {string} transition
   * @param {{ bead_id: string, pr_url?: string|null, repo?: string|null }} input
   * @param {string|null} bead_title
   */
  function prBody(transition, input, bead_title) {
    const lines = [headline(transition, input.bead_id, bead_title)];
    const pr_url = text(input.pr_url);
    if (pr_url) {
      lines.push(pr_url);
    }
    const repo = repoLabel(input.repo);
    if (repo) {
      lines.push(`리포: ${repo}`);
    }
    return lines.join('\n');
  }

  /**
   * The launch kinds are transitions of their own, not a prefix on a shared
   * one, so that the first thing read is what actually happened (UI-vb0t §3.2).
   *
   * @param {string} kind
   * @returns {string}
   */
  function startedTitle(kind) {
    if (kind === 'resume') {
      return TITLE.resume;
    }
    if (kind === 'conflict') {
      return TITLE.conflict;
    }
    return TITLE.started;
  }

  /**
   * The `질의 세션:` value (UI-7uid §3.5). One vocabulary, three outcomes: the
   * session was started here, one was already running, or none was started and
   * the reason says which of the refusals it was.
   *
   * @param {{ session?: string|null, reason?: string|null, tmux_session?: string|null, tmux_window?: string|null }} input
   * @returns {string}
   */
  function inquirySessionLine(input) {
    if (input.session === 'already_running') {
      return '이미 실행 중';
    }
    if (input.session === 'launched') {
      return `기동 — tmux ${text(input.tmux_session) ?? '?'}:${text(input.tmux_window) ?? '?'}`;
    }
    return `미기동 — ${text(input.reason) ?? 'unknown'}`;
  }

  return {
    async attemptStarted(input) {
      try {
        // Config FIRST, before any lookup: notifications being off has to stay
        // a pure no-op, not a `bd show` whose result is thrown away.
        const cmd = resolveCmd();
        if (!cmd) {
          return;
        }
        // The dispatch snapshot already carries the title; only the resumed and
        // conflict launches have to go and read it.
        const bead_title =
          text(input.title) ?? (await lookupTitle(input.bead_id));
        const lines = [
          headline(
            startedTitle(String(input.kind ?? '')),
            input.bead_id,
            bead_title
          )
        ];
        const repo = repoLabel(input.repo);
        if (repo) {
          lines.push(`리포: ${repo}`);
        }
        // `<runner> <model> / <effort> / <speed>`: the runner leads because a model name
        // alone no longer says which CLI ran (`sol` is codex, `opus` claude),
        // and it is the only part that is always resolved. Every piece is
        // omitted when absent, so a legacy caller still reads `model / effort`.
        const exec = [
          [text(input.runner), text(input.model)].filter(Boolean).join(' '),
          text(input.effort),
          text(input.speed)
        ]
          .filter(Boolean)
          .join(' / ');
        if (exec.length > 0) {
          lines.push(`실행: ${exec}`);
        }
        send(cmd, lines.join('\n'));
      } catch (err) {
        log('attemptStarted failed: %o', err);
      }
    },

    async attemptFailed(input) {
      try {
        const cmd = resolveCmd();
        if (!cmd) {
          return;
        }
        const bead_title = await lookupTitle(input.bead_id);
        const lines = [headline(TITLE.failed, input.bead_id, bead_title)];
        const cause = text(input.cause);
        lines.push(`사유: ${cause ?? 'unknown'}`);
        const repo = repoLabel(input.repo);
        if (repo) {
          lines.push(`리포: ${repo}`);
        }
        // The blocker path's evidence (UI-2o4z): the guard that fired and the
        // command it matched, so the push says what the banner says.
        const detail = input.cause_detail;
        if (detail) {
          const reason = text(detail.reason);
          if (reason) {
            lines.push(`가드: ${reason}`);
          }
          const command = text(detail.command);
          if (command) {
            lines.push(`명령: ${command}`);
          }
        }
        send(cmd, lines.join('\n'));
      } catch (err) {
        log('attemptFailed failed: %o', err);
      }
    },

    async prWaitEntered(input) {
      try {
        const cmd = resolveCmd();
        if (!cmd) {
          return;
        }
        const bead_title = await lookupTitle(input.bead_id);
        send(cmd, prBody(TITLE.pr_wait, input, bead_title));
      } catch (err) {
        log('prWaitEntered failed: %o', err);
      }
    },

    // The park itself is announced whether or not an inquiry session came up
    // (UI-7uid §3.5): a `worker_notify` that is on says the bead stopped and
    // what is waiting on the user, and the session line is one of its fields —
    // never its precondition.
    async awaitingUser(input) {
      try {
        const cmd = resolveCmd();
        if (!cmd) {
          return;
        }
        // The trigger already read the bead to fill the prompt, so the title
        // rides the input; the lookup is only the fallback.
        const bead_title =
          text(input.title) ?? (await lookupTitle(input.bead_id));
        const lines = [
          headline(TITLE.awaiting_user, input.bead_id, bead_title)
        ];
        const stale_kind = text(input.stale_kind);
        lines.push(
          `파킹: ${text(input.awaiting_user) ?? 'unknown'}${
            stale_kind ? ` (${stale_kind})` : ''
          }`
        );
        lines.push(`질의 세션: ${inquirySessionLine(input)}`);
        if (
          input.session !== 'launched' &&
          input.session !== 'already_running'
        ) {
          // The manual escape hatch stays the answer whenever no session came
          // up, so the push names it instead of leaving a dead end.
          lines.push('처분: Worker 탭 fix/approve');
        }
        lines.push(
          `브리지: ${
            input.bridge_active === true
              ? '활성'
              : '비활성 — 질문은 tmux에서 직접 답'
          }`
        );
        const repo = repoLabel(input.repo);
        if (repo) {
          lines.push(`리포: ${repo}`);
        }
        send(cmd, lines.join('\n'));
      } catch (err) {
        log('awaitingUser failed: %o', err);
      }
    },

    // Deploy state is deliberately NOT reported: `runCleanup` returns success
    // with the deploy absent, done synchronously, or merely launched, and no
    // single one of those can be read off the success path (UI-9rrk spec).
    //
    // The caller AWAITS this one — the detached deploy may restart the process,
    // and the spawn has to have happened by then (UI-vb0t §3.4).
    async mergeCompleted(input) {
      try {
        // Config first here above all: this is the one path a caller awaits, so
        // a disabled notifier must not make the cleanup wait on a `bd show`.
        const cmd = resolveCmd();
        if (!cmd) {
          return;
        }
        const bead_title = await lookupTitle(input.bead_id);
        send(cmd, prBody(TITLE.merged, input, bead_title));
      } catch (err) {
        log('mergeCompleted failed: %o', err);
      }
    },

    // Every user-initiated terminal failure (UI-jw27 §1·§2). The call sites are
    // the four durable terminal WRITES, so a re-observation pass that finds an
    // existing record sends nothing and a restart cannot produce a burst.
    async needsHuman(input) {
      try {
        const cmd = resolveCmd();
        if (!cmd) {
          return;
        }
        const bead_title =
          text(input.title) ?? (await lookupTitle(input.bead_id));
        const lines = [headline(TITLE.needs_human, input.bead_id, bead_title)];
        const failure_class = text(input.failure_class);
        if (failure_class) {
          lines.push(`클래스: ${failure_class}`);
        }
        const reason = text(input.reason);
        if (reason) {
          const detail = firstLine(input.reason_detail);
          lines.push(`사유: ${reason}${detail ? ` — ${detail}` : ''}`);
        }
        // Supplied by the caller, never derived here: which buttons the failing
        // row actually draws is the call site's knowledge (§2).
        const next_action = text(input.next_action);
        if (next_action) {
          lines.push(`다음: ${next_action}`);
        }
        const pr_url = text(input.pr_url);
        if (pr_url) {
          lines.push(pr_url);
        }
        const repo = repoLabel(input.repo);
        if (repo) {
          lines.push(`리포: ${repo}`);
        }
        send(cmd, lines.join('\n'));
      } catch (err) {
        log('needsHuman failed: %o', err);
      }
    }
  };
}
