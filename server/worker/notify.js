/**
 * Worker attempt lifecycle → Discord push (UI-2yoq).
 *
 * The worker had exactly one outward signal — the `emitQueueChanged` websocket
 * stream — so a queue nobody was looking at was a queue nobody heard from. This
 * module adds the three transitions worth interrupting a human for: an attempt
 * STARTS, an attempt FAILS (with its cause), and an attempt reaches `pr_wait`
 * (the point where the queue is waiting on a human's [머지] click).
 *
 * Two properties are load-bearing:
 *
 *   - FIRE-AND-FORGET. The child is spawned detached with `stdio: 'ignore'` and
 *     immediately unref'd; nothing waits on its exit code. A missing `discord`
 *     CLI (ENOENT) surfaces as an async `error` event, which is logged and
 *     dropped.
 *   - NO-THROW. Every method is wrapped end to end, so no input and no
 *     environment can turn a notification into a queue-transition failure.
 *
 * Config is read per call (`worker.notify`), matching `worker.verify` /
 * `worker.deploy`: toggling notifications does not need a server restart.
 */
import { spawn } from 'node:child_process';
import path from 'node:path';
import { debug } from '../logging.js';

const default_log = debug('worker:notify');

/**
 * @typedef {Object} NotifierDeps
 * @property {() => any} getConfig - Runtime config accessor (server/config.js).
 * @property {(command: string, args: string[], options: any) => any} [spawnImpl]
 * @property {(...args: any[]) => void} [log]
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
 * Build the attempt-lifecycle notifier the scheduler fires on dispatch, on
 * failure, and on `pr_wait` entry.
 *
 * @param {NotifierDeps} deps
 * @returns {{
 *   attemptStarted: (input: { bead_id: string, title?: string|null, model?: string|null, effort?: string|null, repo?: string|null, kind?: string|null }) => void,
 *   attemptFailed: (input: { bead_id: string, cause: string, repo?: string|null, cause_detail?: { reason: string, command: string|null }|null }) => void,
 *   prWaitEntered: (input: { bead_id: string, pr_url?: string|null, repo?: string|null }) => void
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
   * @param {string[]} flags - CLI flags ahead of the message argument.
   * @param {string} message
   */
  function send(flags, message) {
    const cmd = resolveCmd();
    if (!cmd) {
      return;
    }
    try {
      const child = spawnImpl(cmd[0], [...cmd.slice(1), ...flags, message], {
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
   * @param {string} kind
   * @returns {string|null}
   */
  function kindLabel(kind) {
    if (kind === 'resume') {
      return '재개';
    }
    if (kind === 'conflict') {
      return '충돌 해결';
    }
    return null;
  }

  return {
    attemptStarted(input) {
      try {
        const title = text(input.title);
        const label = kindLabel(String(input.kind ?? ''));
        const head = `${label ? `[${label}] ` : ''}${input.bead_id}${
          title ? ` — ${title}` : ''
        }`;
        const lines = [head];
        const repo = repoLabel(input.repo);
        if (repo) {
          lines.push(`리포: ${repo}`);
        }
        const exec = [text(input.model), text(input.effort)]
          .filter(Boolean)
          .join(' / ');
        if (exec.length > 0) {
          lines.push(`실행: ${exec}`);
        }
        // Informational: no mention (`-q`). Only the two transitions a human
        // must act on carry one.
        send(['-q', '-t', '워커 시작'], lines.join('\n'));
      } catch (err) {
        log('attemptStarted failed: %o', err);
      }
    },

    attemptFailed(input) {
      try {
        const lines = [String(input.bead_id)];
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
        send(['-c', 'red', '-t', '워커 실패'], lines.join('\n'));
      } catch (err) {
        log('attemptFailed failed: %o', err);
      }
    },

    prWaitEntered(input) {
      try {
        const lines = [String(input.bead_id)];
        const pr_url = text(input.pr_url);
        if (pr_url) {
          lines.push(pr_url);
        }
        const repo = repoLabel(input.repo);
        if (repo) {
          lines.push(`리포: ${repo}`);
        }
        send(['-c', 'green', '-t', 'PR 대기'], lines.join('\n'));
      } catch (err) {
        log('prWaitEntered failed: %o', err);
      }
    }
  };
}
