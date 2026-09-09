/**
 * PreToolUse guard-mirror probe (guard-hook-bypass-result-judgment §2).
 *
 * The Worker's text guard used to be the only layer that saw a one-shot hook
 * relocation. Since dotfiles PR #483 a Claude session also runs a PreToolUse
 * (Bash) hook that REFUSES the same four shapes without ending the session, and
 * §3 defers the Worker's verdict to that refusal's evidence. Deferring is only
 * safe on a session that provably has the hook, so this module answers exactly
 * one question about the environment a child is about to be spawned into: is
 * `destructive-guard-hook.sh` registered for Bash, executable, and not disabled?
 *
 * Static registration is all that can be proven here — a hook's runtime success
 * cannot be (spec residual risk 1) — and every failure resolves to `absent`,
 * which keeps the current immediate kill.
 */
import nodePath from 'node:path';
import { debug } from '../../logging.js';

const log = debug('worker:guard-mirror');

/**
 * The hook file the mirror is identified by. One filename is the whole coupling
 * to dotfiles: a rename there drops this probe to `absent`, i.e. back to the
 * current immediate kill (over-blocking, never under-blocking).
 *
 * @type {string}
 */
export const GUARD_HOOK_BASENAME = 'destructive-guard-hook.sh';

/**
 * Read one JSON file. Distinguishes "no file" (null) from "unreadable or not
 * JSON" (throws), because a missing project settings file passes condition 5
 * while a corrupt one fails it.
 *
 * @param {typeof import('node:fs')} fs
 * @param {string} file
 * @returns {any|null}
 */
function readJsonFile(fs, file) {
  /** @type {string} */
  let text;
  try {
    text = fs.readFileSync(file, 'utf8');
  } catch (err) {
    if (/** @type {any} */ (err)?.code === 'ENOENT') {
      return null;
    }
    throw err;
  }
  return JSON.parse(text);
}

/**
 * Does this `matcher` string cover the Bash tool? Token matching only, split on
 * `|`: no regex is evaluated, so a `Ba.*` style registration reads as absent
 * (fail-closed, spec §2 condition 2).
 *
 * @param {unknown} matcher
 * @returns {boolean} true when a token is exactly `Bash` or `*`.
 */
function matcherCoversBash(matcher) {
  if (typeof matcher !== 'string') {
    return false;
  }
  return matcher
    .split('|')
    .map((token) => token.trim())
    .some((token) => token === 'Bash' || token === '*');
}

/**
 * Expand a leading `${HOME}`/`$HOME`/`~` in a hook command path against the
 * environment the CHILD gets, not the server's own.
 *
 * @param {string} command
 * @param {string} home
 * @returns {string}
 */
function expandHome(command, home) {
  return command
    .replace(/^\$\{HOME\}/, home)
    .replace(/^\$HOME(?=\/|$)/, home)
    .replace(/^~(?=\/|$)/, home);
}

/**
 * Is `disableAllHooks: true` set in this settings object?
 *
 * @param {any} settings
 * @returns {boolean}
 */
function hooksDisabled(settings) {
  return Boolean(settings) && settings.disableAllHooks === true;
}

/**
 * Probe the session environment for a registered, executable, enabled
 * PreToolUse(Bash) guard mirror.
 *
 * Pure with respect to the process: everything it reads comes from the injected
 * `env`, `cwd` and `fs`, so the live runner and a test see the same function.
 *
 * @param {{ env: Record<string, string|undefined>, cwd: string, fs: typeof import('node:fs') }} input
 * @returns {'verified'|'absent'}
 */
export function probeGuardMirror(input) {
  const env = input?.env || {};
  const fs = input?.fs;
  try {
    const home = typeof env.HOME === 'string' ? env.HOME : '';
    if (home.length === 0) {
      return 'absent';
    }
    const config_dir =
      typeof env.CLAUDE_CONFIG_DIR === 'string' &&
      env.CLAUDE_CONFIG_DIR.length > 0
        ? env.CLAUDE_CONFIG_DIR
        : nodePath.join(home, '.claude');
    const settings = readJsonFile(
      fs,
      nodePath.join(config_dir, 'settings.json')
    );
    if (!settings || typeof settings !== 'object') {
      return 'absent';
    }
    if (hooksDisabled(settings)) {
      return 'absent';
    }
    const pre_tool_use = settings.hooks?.PreToolUse;
    if (!Array.isArray(pre_tool_use)) {
      return 'absent';
    }
    /** @type {string|null} */
    let hook_path = null;
    for (const registration of pre_tool_use) {
      if (!registration || !matcherCoversBash(registration.matcher)) {
        continue;
      }
      const hooks = Array.isArray(registration.hooks) ? registration.hooks : [];
      for (const hook of hooks) {
        if (!hook || hook.type !== 'command') {
          continue;
        }
        const command =
          typeof hook.command === 'string' ? hook.command.trim() : '';
        if (command.length === 0) {
          continue;
        }
        const expanded = expandHome(command, home);
        if (nodePath.basename(expanded) === GUARD_HOOK_BASENAME) {
          hook_path = expanded;
          break;
        }
      }
      if (hook_path) {
        break;
      }
    }
    if (!hook_path) {
      return 'absent';
    }
    fs.accessSync(hook_path, fs.constants.X_OK);
    // The project's own settings can switch every hook off for this cwd, and
    // the local overlay is not committed — both are read.
    const cwd = typeof input.cwd === 'string' ? input.cwd : '';
    if (cwd.length > 0) {
      for (const name of ['settings.json', 'settings.local.json']) {
        const project = readJsonFile(fs, nodePath.join(cwd, '.claude', name));
        if (hooksDisabled(project)) {
          return 'absent';
        }
      }
    }
    return 'verified';
  } catch (err) {
    log('guard mirror probe failed: %o', err);
    return 'absent';
  }
}

/**
 * The prefix Claude Code puts on a PreToolUse refusal's `tool_result` content.
 * Not a version contract (spec residual risk 4): if the wording changes the
 * refusal reads as an execution and the session is killed — a regression to
 * today's behaviour, not a miss.
 *
 * @type {string}
 */
export const HOOK_REFUSAL_PREFIX = 'PreToolUse:Bash hook error:';

/**
 * Flatten a `tool_result` content payload to text: a string is itself, an array
 * is the concatenation of its `text` blocks.
 *
 * @param {unknown} content
 * @returns {string}
 */
function contentText(content) {
  if (typeof content === 'string') {
    return content;
  }
  if (!Array.isArray(content)) {
    return '';
  }
  return content
    .map((block) =>
      block &&
      typeof block === 'object' &&
      typeof (/** @type {any} */ (block).text) === 'string'
        ? /** @type {any} */ (block).text
        : ''
    )
    .join('');
}

/**
 * @typedef {Object} GuardPendingEntry
 * @property {string} tool_use_id - The `tool_use.id` the verdict waits on.
 * @property {string} command - The command the guard matched.
 * @property {number} at - When the deferral was recorded (epoch ms).
 * @property {number|null} log_offset - Byte offset at the END of the `tool_use`
 * line, so a re-attached monitor can backfill from there (spec §3).
 */

/**
 * Pair one raw stream line against the deferred verdicts (spec §3).
 *
 * `executed` false means the hook refused the command and there is nothing to
 * kill for; true means the command ran and the held verdict is now due.
 *
 * @param {any} raw - One parsed jsonl line.
 * @param {GuardPendingEntry[]} pending - The deferrals still open.
 * @returns {{ entry: GuardPendingEntry, executed: boolean }[]} One item per
 * matched `tool_result` block, in stream order.
 */
export function resolveGuardPending(raw, pending) {
  /** @type {{ entry: GuardPendingEntry, executed: boolean }[]} */
  const out = [];
  if (
    !raw ||
    typeof raw !== 'object' ||
    raw.type !== 'user' ||
    !Array.isArray(pending) ||
    pending.length === 0
  ) {
    return out;
  }
  const content = Array.isArray(raw.message?.content)
    ? raw.message.content
    : [];
  for (const block of content) {
    if (
      !block ||
      typeof block !== 'object' ||
      block.type !== 'tool_result' ||
      typeof block.tool_use_id !== 'string'
    ) {
      continue;
    }
    const entry = pending.find(
      (candidate) => candidate.tool_use_id === block.tool_use_id
    );
    if (!entry) {
      // A result for some other tool_use leaves the deferral untouched (§3).
      continue;
    }
    const refused =
      block.is_error === true &&
      contentText(block.content).startsWith(HOOK_REFUSAL_PREFIX);
    out.push({ entry, executed: !refused });
  }
  return out;
}
