/**
 * Merge-guard decision for a session's shell command (UI-2o4z).
 *
 * The guards used to be substring regexes run over the WHOLE command string,
 * which cannot tell a command position from a quoted argument: an `rg` search
 * for the literal text `gh pr merge` read as an attempt to merge (2026-07-27
 * dotfiles-h3z2). This module tokenizes the command instead and only ever
 * judges argv POSITIONS — argv[0] of a simple command and its subcommand.
 *
 * Fail-closed is preserved on the way out: an input the tokenizer cannot
 * resolve (unbalanced quotes, unterminated heredoc, a function definition) is
 * NOT a pass — it falls back to the original regexes, which live here now.
 */

/**
 * Landing work on the base itself — `gh pr merge`, or a `git push` aimed at
 * main/master. NEVER permitted, on any attempt: unattended merging is gone
 * (worker-phase2 §1/§13), so a session that reaches for the base is killed
 * fail-closed regardless of what it is trying to accomplish.
 *
 * FALLBACK ONLY: the argv scan below is the primary judgment. This regex is
 * what an UNPARSEABLE command is judged by, so "cannot decide" keeps the old
 * (over-eager) verdict instead of silently passing.
 *
 * @type {RegExp}
 */
export const BASE_LANDING_RE =
  /gh\s+pr\s+merge\b|git\s+push\b[\s\S]*?:?\b(main|master)\b/i;

/**
 * Merging the base INTO the session's own branch (`git merge origin/main`).
 * Blocked by default, but ALLOWED for a conflict-resolution attempt — that is
 * exactly the operation such an attempt exists to perform (worker-phase2 §6).
 * The distinction is the attempt's mode, not a lock: nothing about this command
 * touches the base, so a normal attempt is refused only because it has no
 * business merging at all.
 *
 * The negative lookahead is an explicit ALLOWLIST of the three `git merge-*`
 * subcommands that create no merge commit and update no ref — `merge-base`
 * (ancestry query), `merge-tree` (tree-level simulation), `merge-file` (3-way
 * file merge). Every other `merge-*` form stays blocked (`merge-index` and
 * friends can mutate the index/worktree), so the guard remains fail-closed
 * outside those three.
 *
 * FALLBACK ONLY — same role as {@link BASE_LANDING_RE}.
 *
 * @type {RegExp}
 */
export const BASE_INTO_BRANCH_RE = /git\s+merge(?!-(?:base|tree|file)\b)/i;

/**
 * A heredoc attached to one simple command. `body` is filled once the line's
 * newline is reached and the body lines have been consumed as DATA.
 *
 * @typedef {Object} HeredocSpec
 * @property {string} delim - The terminator word.
 * @property {boolean} strip - `<<-` form: leading tabs are stripped.
 * @property {string} body - The consumed body text.
 */

/**
 * One simple command: the words in argv order, plus the heredocs redirected
 * into it. Redirection operators and their targets are NOT words — dropping
 * them here is what makes the argv positions below meaningful.
 *
 * @typedef {Object} SimpleCommand
 * @property {string[]} words
 * @property {HeredocSpec[]} heredocs
 * @property {string} text - The original source slice, for the blocker message.
 */

/**
 * @typedef {Object} ParsedCommand
 * @property {SimpleCommand[]} commands
 * @property {string[]} nested - `$(…)` / backtick contents, to scan recursively.
 */

/**
 * @typedef {Object} MergeViolation
 * @property {'merge_to_base_blocked'|'base_merge_blocked'} reason
 * @property {string} command - The simple command that matched.
 */

/**
 * Shell reserved words that may precede a command word (`if true; then gh …`).
 *
 * @type {Set<string>}
 */
const RESERVED_WORDS = new Set([
  'if',
  'then',
  'else',
  'elif',
  'fi',
  'do',
  'done',
  'while',
  'until',
  'for',
  'case',
  'esac',
  '{',
  '}',
  '!'
]);

/**
 * Interpreters whose ARGUMENTS are commands again (`bash -c …`, heredoc stdin).
 *
 * @type {Set<string>}
 */
const INTERPRETERS = new Set(['bash', 'sh', 'zsh']);

/**
 * `xargs` short flags that take a separate value token.
 *
 * @type {Set<string>}
 */
const XARGS_VALUE_FLAGS = new Set([
  '-n',
  '-I',
  '-i',
  '-P',
  '-d',
  '-s',
  '-L',
  '-l',
  '-a',
  '-E'
]);

/**
 * `git push` options that consume the NEXT token as their value. `--x=y` forms
 * carry their value inside the token and are consumed alone.
 *
 * @type {Set<string>}
 */
const PUSH_VALUE_OPTIONS = new Set([
  '-o',
  '--push-option',
  '--repo',
  '--receive-pack',
  '--exec'
]);

/**
 * A leading `VAR=value` assignment token.
 *
 * @type {RegExp}
 */
const ASSIGNMENT_RE = /^[A-Za-z_][A-Za-z0-9_]*=/;

/**
 * A refspec destination that lands on the base branch.
 *
 * @type {RegExp}
 */
const BASE_REF_RE = /(^|\/)(main|master)$/;

/**
 * How deep interpreter/substitution recursion may go before the input is
 * treated as unresolvable (and therefore falls back).
 *
 * @type {number}
 */
const MAX_DEPTH = 8;

/**
 * @param {string} word
 * @returns {string}
 */
function basename(word) {
  const parts = word.split('/');
  return parts[parts.length - 1];
}

/**
 * Read a `$(…)` substitution starting at `pos` (which points at the `$`),
 * balancing nested parentheses and skipping quoted regions.
 *
 * @param {string} src
 * @param {number} pos
 * @returns {{ body: string, next: number }|null}
 */
function readDollarParen(src, pos) {
  let i = pos + 2;
  let depth = 1;
  const n = src.length;
  while (i < n) {
    const c = src[i];
    if (c === '\\') {
      i += 2;
      continue;
    }
    if (c === "'") {
      const close = src.indexOf("'", i + 1);
      if (close < 0) {
        return null;
      }
      i = close + 1;
      continue;
    }
    if (c === '"') {
      i += 1;
      let closed = false;
      while (i < n) {
        if (src[i] === '\\') {
          i += 2;
          continue;
        }
        if (src[i] === '"') {
          i += 1;
          closed = true;
          break;
        }
        i += 1;
      }
      if (!closed) {
        return null;
      }
      continue;
    }
    if (c === '(') {
      depth += 1;
      i += 1;
      continue;
    }
    if (c === ')') {
      depth -= 1;
      if (depth === 0) {
        return { body: src.slice(pos + 2, i), next: i + 1 };
      }
      i += 1;
      continue;
    }
    i += 1;
  }
  return null;
}

/**
 * Read a backtick substitution starting at `pos` (which points at the opening
 * backtick).
 *
 * @param {string} src
 * @param {number} pos
 * @returns {{ body: string, next: number }|null}
 */
function readBacktick(src, pos) {
  let i = pos + 1;
  const n = src.length;
  while (i < n) {
    if (src[i] === '\\') {
      i += 2;
      continue;
    }
    if (src[i] === '`') {
      return { body: src.slice(pos + 1, i), next: i + 1 };
    }
    i += 1;
  }
  return null;
}

/**
 * Read a redirection TARGET word (a filename, an fd, or a heredoc delimiter).
 * Quotes are unwrapped so `<<'EOF'` and `<<EOF` yield the same delimiter.
 *
 * @param {string} src
 * @param {number} pos
 * @returns {{ value: string, next: number }|null}
 */
function readPlainWord(src, pos) {
  let i = pos;
  let out = '';
  const n = src.length;
  while (i < n) {
    const c = src[i];
    if (
      c === ' ' ||
      c === '\t' ||
      c === '\n' ||
      c === '\r' ||
      c === ';' ||
      c === '|' ||
      c === '&' ||
      c === '<' ||
      c === '>' ||
      c === ')'
    ) {
      break;
    }
    if (c === '\\') {
      if (i + 1 >= n) {
        return null;
      }
      out += src[i + 1];
      i += 2;
      continue;
    }
    if (c === "'") {
      const close = src.indexOf("'", i + 1);
      if (close < 0) {
        return null;
      }
      out += src.slice(i + 1, close);
      i = close + 1;
      continue;
    }
    if (c === '"') {
      i += 1;
      let closed = false;
      while (i < n) {
        if (src[i] === '\\') {
          if (i + 1 >= n) {
            return null;
          }
          out += src[i + 1];
          i += 2;
          continue;
        }
        if (src[i] === '"') {
          i += 1;
          closed = true;
          break;
        }
        out += src[i];
        i += 1;
      }
      if (!closed) {
        return null;
      }
      continue;
    }
    out += c;
    i += 1;
  }
  if (out.length === 0) {
    return null;
  }
  return { value: out, next: i };
}

/**
 * Consume the pending heredoc bodies starting at `pos` (the first character
 * after the redirecting line's newline), filling each spec's `body`.
 *
 * @param {string} src
 * @param {number} pos
 * @param {HeredocSpec[]} pending
 * @returns {number|null} Offset after the last body, or null if unterminated.
 */
function consumeHeredocs(src, pos, pending) {
  let i = pos;
  const n = src.length;
  for (const spec of pending) {
    /** @type {string[]} */
    const lines = [];
    let terminated = false;
    while (i <= n) {
      const nl = src.indexOf('\n', i);
      const at_end = nl < 0;
      const raw_line = at_end ? src.slice(i) : src.slice(i, nl);
      i = at_end ? n : nl + 1;
      const line = spec.strip ? raw_line.replace(/^\t+/, '') : raw_line;
      if (line === spec.delim) {
        terminated = true;
        break;
      }
      lines.push(line);
      if (at_end) {
        break;
      }
    }
    if (!terminated) {
      return null;
    }
    spec.body = lines.join('\n');
  }
  return i;
}

/**
 * Split a command string into simple commands plus the command substitutions
 * found inside it. Returns null when the input cannot be resolved — the caller
 * must then fall back rather than treat the command as clean.
 *
 * @param {string} src
 * @returns {ParsedCommand|null}
 */
export function tokenize(src) {
  if (typeof src !== 'string' || src.length === 0) {
    return null;
  }
  /** @type {SimpleCommand[]} */
  const commands = [];
  /** @type {string[]} */
  const nested = [];
  /** @type {HeredocSpec[]} */
  let pending = [];
  /** @type {string[]} */
  let words = [];
  /** @type {HeredocSpec[]} */
  let heredocs = [];
  let cur = '';
  let has_cur = false;
  let start = -1;
  let end = 0;
  let i = 0;
  const n = src.length;

  /**
   * @param {number} pos
   */
  function beginToken(pos) {
    if (!has_cur) {
      has_cur = true;
      if (start < 0) {
        start = pos;
      }
    }
  }

  function pushWord() {
    if (has_cur) {
      words.push(cur);
      cur = '';
      has_cur = false;
    }
  }

  function pushCommand() {
    pushWord();
    if (words.length > 0 || heredocs.length > 0) {
      commands.push({
        words,
        heredocs,
        text: start >= 0 ? src.slice(start, end).trim() : ''
      });
    }
    words = [];
    heredocs = [];
    start = -1;
  }

  while (i < n) {
    const ch = src[i];

    if (ch === '\n') {
      pushCommand();
      i += 1;
      if (pending.length > 0) {
        const after = consumeHeredocs(src, i, pending);
        if (after == null) {
          return null;
        }
        i = after;
        pending = [];
      }
      continue;
    }

    if (ch === ' ' || ch === '\t' || ch === '\r') {
      pushWord();
      i += 1;
      continue;
    }

    if (ch === '\\') {
      if (i + 1 >= n) {
        return null;
      }
      if (src[i + 1] === '\n') {
        i += 2;
        continue;
      }
      beginToken(i);
      cur += src[i + 1];
      i += 2;
      end = i;
      continue;
    }

    if (ch === "'") {
      const close = src.indexOf("'", i + 1);
      if (close < 0) {
        return null;
      }
      beginToken(i);
      cur += src.slice(i + 1, close);
      i = close + 1;
      end = i;
      continue;
    }

    if (ch === '"') {
      beginToken(i);
      i += 1;
      let closed = false;
      while (i < n) {
        const c = src[i];
        if (c === '\\') {
          if (i + 1 >= n) {
            return null;
          }
          cur += src[i + 1];
          i += 2;
          continue;
        }
        if (c === '"') {
          i += 1;
          closed = true;
          break;
        }
        if (c === '`') {
          const bt = readBacktick(src, i);
          if (!bt) {
            return null;
          }
          nested.push(bt.body);
          cur += src.slice(i, bt.next);
          i = bt.next;
          continue;
        }
        if (c === '$' && src[i + 1] === '(') {
          const sub = readDollarParen(src, i);
          if (!sub) {
            return null;
          }
          nested.push(sub.body);
          cur += src.slice(i, sub.next);
          i = sub.next;
          continue;
        }
        cur += c;
        i += 1;
      }
      if (!closed) {
        return null;
      }
      end = i;
      continue;
    }

    if (ch === '`') {
      const bt = readBacktick(src, i);
      if (!bt) {
        return null;
      }
      nested.push(bt.body);
      beginToken(i);
      cur += src.slice(i, bt.next);
      i = bt.next;
      end = i;
      continue;
    }

    if (ch === '$' && src[i + 1] === '(') {
      const sub = readDollarParen(src, i);
      if (!sub) {
        return null;
      }
      nested.push(sub.body);
      beginToken(i);
      cur += src.slice(i, sub.next);
      i = sub.next;
      end = i;
      continue;
    }

    if (ch === '#' && !has_cur) {
      const nl = src.indexOf('\n', i);
      i = nl < 0 ? n : nl;
      continue;
    }

    if (ch === '<' || ch === '>' || (ch === '&' && src[i + 1] === '>')) {
      const redir_start = i;
      // An fd number glued to the operator (`2>&1`) belongs to the redirection,
      // not to argv; anything else glued to it is a word that ends here.
      if (has_cur && /^[0-9]+$/.test(cur)) {
        cur = '';
        has_cur = false;
      } else {
        pushWord();
      }
      /** @type {string} */
      let op;
      if (ch === '&') {
        op = src.startsWith('&>>', i) ? '&>>' : '&>';
      } else if (src.startsWith('<<-', i)) {
        op = '<<-';
      } else if (src.startsWith('<<<', i)) {
        op = '<<<';
      } else if (src.startsWith('<<', i)) {
        op = '<<';
      } else if (src.startsWith('<&', i)) {
        op = '<&';
      } else if (src.startsWith('>>', i)) {
        op = '>>';
      } else if (src.startsWith('>&', i)) {
        op = '>&';
      } else if (src.startsWith('>|', i)) {
        op = '>|';
      } else {
        op = ch;
      }
      i += op.length;
      while (i < n && (src[i] === ' ' || src[i] === '\t')) {
        i += 1;
      }
      const target = readPlainWord(src, i);
      if (!target) {
        return null;
      }
      i = target.next;
      end = i;
      if (start < 0) {
        start = redir_start;
      }
      if (op === '<<' || op === '<<-') {
        /** @type {HeredocSpec} */
        const spec = { delim: target.value, strip: op === '<<-', body: '' };
        heredocs.push(spec);
        pending.push(spec);
      }
      continue;
    }

    if (ch === ';' || ch === '|' || ch === '&') {
      pushCommand();
      i += 1;
      if (src[i] === ch) {
        i += 1;
      }
      continue;
    }

    if (ch === '(') {
      // A `(` glued to a word is a function definition or an array assignment;
      // neither resolves to argv positions here.
      if (has_cur) {
        return null;
      }
      pushCommand();
      i += 1;
      continue;
    }

    if (ch === ')') {
      pushCommand();
      i += 1;
      continue;
    }

    beginToken(i);
    cur += ch;
    i += 1;
    end = i;
  }

  if (pending.length > 0) {
    return null;
  }
  pushCommand();
  return { commands, nested };
}

/**
 * Drop the leading tokens that are not the command word: assignments, reserved
 * words, and the fixed wrapper list. Wrappers outside the list are NOT skipped.
 *
 * @param {string[]} words
 * @returns {string[]}
 */
function normalizeArgv(words) {
  let argv = words.slice();
  let guard = 0;
  while (argv.length > 0 && guard < 64) {
    guard += 1;
    const head = argv[0];
    if (ASSIGNMENT_RE.test(head)) {
      argv = argv.slice(1);
      continue;
    }
    const name = basename(head).toLowerCase();
    if (RESERVED_WORDS.has(name)) {
      argv = argv.slice(1);
      continue;
    }
    if (name === 'env') {
      argv = argv.slice(1);
      while (argv.length > 0 && ASSIGNMENT_RE.test(argv[0])) {
        argv = argv.slice(1);
      }
      continue;
    }
    if (name === 'command' || name === 'nohup' || name === 'time') {
      argv = argv.slice(1);
      continue;
    }
    if (name === 'timeout') {
      argv = argv.slice(1);
      if (argv.length > 0 && !argv[0].startsWith('-')) {
        argv = argv.slice(1);
      }
      continue;
    }
    if (name === 'xargs') {
      argv = argv.slice(1);
      while (argv.length > 0 && argv[0].startsWith('-')) {
        const flag = argv[0];
        argv = argv.slice(1);
        if (XARGS_VALUE_FLAGS.has(flag) && argv.length > 0) {
          argv = argv.slice(1);
        }
      }
      continue;
    }
    break;
  }
  return argv;
}

/**
 * Does a `git push` argv land on the base branch? Options are consumed first,
 * then the FIRST positional is the repository (never a landing target) and any
 * later token is a refspec whose destination decides.
 *
 * @param {string[]} argv - Tokens after `git push`.
 * @returns {boolean}
 */
function pushLandsOnBase(argv) {
  let i = 0;
  let seen_repository = false;
  while (i < argv.length) {
    const token = argv[i];
    if (token === '--') {
      i += 1;
      continue;
    }
    if (token.startsWith('-')) {
      i += 1;
      if (PUSH_VALUE_OPTIONS.has(token)) {
        i += 1;
      }
      continue;
    }
    if (!seen_repository) {
      seen_repository = true;
      i += 1;
      continue;
    }
    // `+` is the refspec's force marker, not part of the destination name.
    const refspec = token.startsWith('+') ? token.slice(1) : token;
    const colon = refspec.indexOf(':');
    const dest = colon >= 0 ? refspec.slice(colon + 1) : refspec;
    if (BASE_REF_RE.test(dest)) {
      return true;
    }
    i += 1;
  }
  return false;
}

/**
 * The pre-argv regex judgment, used when (and only when) tokenization failed.
 *
 * @param {string} src
 * @param {boolean} conflict_resolution
 * @returns {MergeViolation|null}
 */
function fallbackViolation(src, conflict_resolution) {
  if (BASE_LANDING_RE.test(src)) {
    return { reason: 'merge_to_base_blocked', command: src };
  }
  if (!conflict_resolution && BASE_INTO_BRANCH_RE.test(src)) {
    return { reason: 'base_merge_blocked', command: src };
  }
  return null;
}

/**
 * Judge one simple command, recursing into interpreter arguments.
 *
 * @param {SimpleCommand} cmd
 * @param {boolean} conflict_resolution
 * @param {number} depth
 * @returns {MergeViolation|null}
 */
function checkSimpleCommand(cmd, conflict_resolution, depth) {
  const argv = normalizeArgv(cmd.words);
  if (argv.length === 0) {
    return null;
  }
  const name = basename(argv[0]).toLowerCase();

  if (name === 'gh' && argv[1] === 'pr' && argv[2] === 'merge') {
    return { reason: 'merge_to_base_blocked', command: cmd.text };
  }

  if (name === 'git' && argv[1] === 'push' && pushLandsOnBase(argv.slice(2))) {
    return { reason: 'merge_to_base_blocked', command: cmd.text };
  }

  if (
    name === 'git' &&
    typeof argv[1] === 'string' &&
    /^merge(-|$)/.test(argv[1]) &&
    !['merge-base', 'merge-tree', 'merge-file'].includes(argv[1]) &&
    !conflict_resolution
  ) {
    return { reason: 'base_merge_blocked', command: cmd.text };
  }

  if (name === 'eval' && argv.length > 1) {
    const joined = argv.slice(1).join(' ');
    const inner = scanCommand(joined, conflict_resolution, depth + 1);
    if (inner) {
      return inner;
    }
  }

  if (INTERPRETERS.has(name)) {
    for (let i = 1; i < argv.length; i += 1) {
      if (/^-[a-z]*c$/.test(argv[i]) && i + 1 < argv.length) {
        const inner = scanCommand(argv[i + 1], conflict_resolution, depth + 1);
        if (inner) {
          return inner;
        }
        break;
      }
    }
    // A heredoc feeding an interpreter's stdin is a script, not data.
    for (const doc of cmd.heredocs) {
      const inner = scanCommand(doc.body, conflict_resolution, depth + 1);
      if (inner) {
        return inner;
      }
    }
  }

  return null;
}

/**
 * Scan a command string (or a nested one) for a merge violation.
 *
 * @param {string} src
 * @param {boolean} conflict_resolution
 * @param {number} depth
 * @returns {MergeViolation|null}
 */
function scanCommand(src, conflict_resolution, depth) {
  if (typeof src !== 'string' || src.trim().length === 0) {
    return null;
  }
  if (depth > MAX_DEPTH) {
    return fallbackViolation(src, conflict_resolution);
  }
  const parsed = tokenize(src);
  if (!parsed) {
    return fallbackViolation(src, conflict_resolution);
  }
  for (const cmd of parsed.commands) {
    const violation = checkSimpleCommand(cmd, conflict_resolution, depth);
    if (violation) {
      return violation;
    }
  }
  for (const inner_src of parsed.nested) {
    const violation = scanCommand(inner_src, conflict_resolution, depth + 1);
    if (violation) {
      return violation;
    }
  }
  return null;
}

/**
 * Judge a session's shell command against the two merge guards.
 *
 * @param {string} cmd - The command the session asked to run.
 * @param {{ conflict_resolution?: boolean }} [options] - `conflict_resolution`
 * true relaxes the base-into-branch guard ONLY (worker-phase2 §6); absent or
 * non-true fails closed.
 * @returns {MergeViolation|null} The first violation found, else null.
 */
export function findMergeViolation(cmd, options) {
  const conflict_resolution = options?.conflict_resolution === true;
  return scanCommand(cmd, conflict_resolution, 0);
}
