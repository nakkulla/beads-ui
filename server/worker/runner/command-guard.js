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
 *
 * The SUBJECT of the base-landing judgment is the attempt's own repo
 * (worker-base-scope-alignment §6): a push is judged against the base the
 * attempt's repo DECLARES, and a push that provably leaves that repo first is
 * exempt by a narrow allowlist. Both subjects arrive as options; absent, the
 * legacy `main|master` name match stands and the allowlist never applies, so a
 * caller that plumbs neither gets exactly today's verdict.
 */
import os from 'node:os';
import path from 'node:path';

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
 * This is the NO-DECLARED-BASE shape. {@link baseLandingRegex} builds the
 * declared-base variant; this one stays exported and unchanged because it is
 * the verdict a caller without a resolved base still gets.
 *
 * @type {RegExp}
 */
export const BASE_LANDING_RE =
  /gh\s+pr\s+merge\b|git\s+push\b[\s\S]*?:?\b(main|master)\b/i;

/**
 * The fallback landing regex for a KNOWN declared base. Same shape as
 * {@link BASE_LANDING_RE} with the `main|master` alternation replaced by the
 * declared base name.
 *
 * The fallback path judges input the tokenizer refused, where none of the
 * allowlist's four conditions can be PROVEN — so it is effectively always
 * fail-closed. The invariant between the two layers is not "same verdict" but
 * "the fallback is never more permissive than the argv path".
 *
 * @param {string|null} [target_base] - Absent ⇒ {@link BASE_LANDING_RE}.
 * @returns {RegExp}
 */
export function baseLandingRegex(target_base) {
  if (typeof target_base !== 'string' || target_base.length === 0) {
    return BASE_LANDING_RE;
  }
  const escaped = target_base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Explicit boundaries instead of `\b`: a base may legally end in a non-word
  // character (`foo-`), where a trailing `\b` never matches and the fallback
  // would silently pass (implementation review 2026-07-30). `/` is allowed BEFORE
  // the name so `refs/heads/<base>` still matches, and forbidden AFTER it so a
  // base of `ilsun` does not match the branch `ilsun/dev`.
  return new RegExp(
    `gh\\s+pr\\s+merge\\b|git\\s+push\\b[\\s\\S]*?(?<![\\w.-])(${escaped})(?![\\w/.-])`,
    'i'
  );
}

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
 * @property {{ sq: boolean, q: boolean }[]} word_flags - Per-word quote
 * provenance, positionally parallel to {@link words}: `sq` = some part came from
 * single quotes, `q` = some part was quoted or escaped at all. A shell expands
 * `~` only in a wholly unquoted word and `$HOME` only outside single quotes, so
 * an expansion decided without these flags can be one the shell never performs.
 * @property {HeredocSpec[]} heredocs
 * @property {string} text - The original source slice, for the blocker message.
 * @property {'&&'|'||'|';'|'|'|'&'|'\n'|null} op - The operator that PRECEDES
 * this command, or null when it is the first command of its scope. This is what
 * makes "the move dominates the push" decidable.
 * @property {string} scope - Ancestor-path scope id: `"0"` at top level, `"0/1"`
 * for the first subshell inside it, `"0/2"` for the next SIBLING subshell,
 * `"0/1/1"` for a nested one. Depth alone is not enough —
 * `( cd /foreign ) && ( git push … )` has both subshells at the same depth and
 * they share no cwd, so only an identical id means "same shell scope".
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
 * The judgment's subject, resolved once per {@link findMergeViolation} call.
 *
 * @typedef {Object} GuardContext
 * @property {boolean} conflict_resolution
 * @property {string|null} repo - The attempt's repo root. Null ⇒ condition 4 of
 * the allowlist is unprovable, so the allowlist never fires.
 * @property {string|null} target_base - The repo's declared base. Null ⇒ the
 * legacy `main|master` name match stands (fail-closed, and no regression for a
 * caller that plumbs no base).
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
  // Quote provenance per word (implementation review 2026-07-30). A shell does
  // NOT expand `~` inside any quotes, and does not expand `$HOME` inside single
  // quotes; the tokenizer strips quoting, so without these flags an expansion
  // the shell never performs would be read as a resolved destination.
  let cur_single_quoted = false;
  let cur_quoted = false;
  /** @type {{ sq: boolean, q: boolean }[]} */
  let word_flags = [];
  let start = -1;
  let end = 0;
  let i = 0;
  const n = src.length;
  // The scope stack carries a per-frame SIBLING counter, so two subshells at the
  // same depth get different ids (`0/1` vs `0/2`). `emitted` keeps the first
  // command of a scope at `op: null` even when an operator preceded the group.
  /** @type {{ id: string, child_count: number, emitted: boolean }[]} */
  const scope_stack = [{ id: '0', child_count: 0, emitted: false }];
  /** @type {'&&'|'||'|';'|'|'|'&'|'\n'|null} */
  let pending_op = null;

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
      word_flags.push({ sq: cur_single_quoted, q: cur_quoted });
      cur = '';
      has_cur = false;
      cur_single_quoted = false;
      cur_quoted = false;
    }
  }

  function pushCommand() {
    pushWord();
    if (words.length > 0 || heredocs.length > 0) {
      const frame = scope_stack[scope_stack.length - 1];
      commands.push({
        words,
        word_flags,
        heredocs,
        text: start >= 0 ? src.slice(start, end).trim() : '',
        op: frame.emitted ? pending_op : null,
        scope: frame.id
      });
      frame.emitted = true;
      pending_op = null;
    }
    words = [];
    word_flags = [];
    heredocs = [];
    start = -1;
  }

  while (i < n) {
    const ch = src[i];

    if (ch === '\n') {
      pushCommand();
      pending_op = '\n';
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
      cur_quoted = true;
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
      cur_single_quoted = true;
      cur_quoted = true;
      cur += src.slice(i + 1, close);
      i = close + 1;
      end = i;
      continue;
    }

    if (ch === '"') {
      beginToken(i);
      cur_quoted = true;
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
      /** @type {'&&'|'||'|';'|'|'|'&'} */
      let op_text = ch;
      if (src[i] === ch) {
        i += 1;
        if (ch === '&' || ch === '|') {
          op_text = ch === '&' ? '&&' : '||';
        }
      }
      pending_op = op_text;
      continue;
    }

    if (ch === '(') {
      // A `(` glued to a word is a function definition or an array assignment;
      // neither resolves to argv positions here.
      if (has_cur) {
        return null;
      }
      pushCommand();
      const parent = scope_stack[scope_stack.length - 1];
      parent.child_count += 1;
      scope_stack.push({
        id: `${parent.id}/${parent.child_count}`,
        child_count: 0,
        emitted: false
      });
      pending_op = null;
      i += 1;
      continue;
    }

    if (ch === ')') {
      pushCommand();
      if (scope_stack.length > 1) {
        scope_stack.pop();
      }
      pending_op = null;
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
 * The destination is compared against the repo's DECLARED base when one is
 * known, not against the names `main`/`master` — that name match is what killed
 * a push to another repo's `main` while letting a real `ilsun/dev` landing
 * through (worker-base-scope-alignment §6). With no declared base the legacy
 * name match stands.
 *
 * @param {string} dest - A refspec destination.
 * @param {string|null} target_base
 * @returns {boolean}
 */
function landsOnBaseRef(dest, target_base) {
  if (typeof target_base === 'string' && target_base.length > 0) {
    // EXACT forms only: a refspec destination is either a branch name or a full
    // ref. `endsWith('/' + base)` also matched a distinct branch that merely ends
    // in the base's name (`feature/ilsun/dev` under base `ilsun/dev`), which is
    // an over-block, not a safety margin (implementation review 2026-07-30).
    return (
      dest === target_base ||
      dest === `refs/heads/${target_base}` ||
      dest === `heads/${target_base}`
    );
  }
  return BASE_REF_RE.test(dest);
}

/**
 * @param {string[]} argv - Tokens after `git push`.
 * @param {string|null} target_base
 * @returns {boolean}
 */
function pushLandsOnBase(argv, target_base) {
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
    if (landsOnBaseRef(dest, target_base)) {
      return true;
    }
    i += 1;
  }
  return false;
}

/**
 * Split a `VAR=value` token at its FIRST `=`.
 *
 * @param {string} token
 * @returns {{ name: string, value: string }}
 */
function splitAssignment(token) {
  const eq = token.indexOf('=');
  return { name: token.slice(0, eq), value: token.slice(eq + 1) };
}

/**
 * A word that is EXACTLY one variable reference (`$H`, `${H}`).
 *
 * @type {RegExp}
 */
const SINGLE_VAR_RE =
  /^\$(?:\{([A-Za-z_][A-Za-z0-9_]*)\}|([A-Za-z_][A-Za-z0-9_]*))$/;

/**
 * Expand a word to a path ONLY when the expansion is deterministic: a literal,
 * a `~` prefix, or a `$HOME`/`${HOME}` prefix. `$HOME` sits at `~`'s grade
 * because it is a value the worker process owns and does not depend on shell
 * state — refusing it while accepting `~` would judge two spellings of the same
 * path differently (spec §6 condition 3).
 *
 * Anything still carrying a `$` or a backtick after that (arbitrary variables,
 * `$(…)`, multi-stage expansion) is NOT resolved — the tokenizer leaves the raw
 * source slice of a substitution inside the word, so this check catches it.
 *
 * A shell performs neither expansion inside single quotes, and performs no `~`
 * expansion inside ANY quotes, so the word's quote provenance gates them: a
 * `~`/`$HOME` the shell would leave literal must not be read as a resolved path
 * (implementation review 2026-07-30).
 *
 * @param {string} word
 * @param {{ sq: boolean, q: boolean }} [flags] - Quote provenance. Absent is
 * treated as fully quoted, i.e. no expansion — the fail-closed default.
 * @returns {string|null} The expanded path, or null when undecidable.
 */
function expandDeterministic(word, flags) {
  if (word.length === 0) {
    return null;
  }
  const single_quoted = flags ? flags.sq : true;
  const quoted = flags ? flags.q : true;
  const tilde_ok = !quoted;
  const home_ok = !single_quoted;
  let out = word;
  if (out === '~') {
    return tilde_ok ? os.homedir() : null;
  }
  if (out === '$HOME' || out === '${HOME}') {
    return home_ok ? os.homedir() : null;
  }
  if (out.startsWith('~/')) {
    if (!tilde_ok) {
      return null;
    }
    out = os.homedir() + out.slice(1);
  } else if (out.startsWith('~')) {
    // `~user` needs the passwd database; not decidable here.
    return null;
  } else if (out.startsWith('$HOME/')) {
    if (!home_ok) {
      return null;
    }
    out = os.homedir() + out.slice('$HOME'.length);
  } else if (out.startsWith('${HOME}/')) {
    if (!home_ok) {
      return null;
    }
    out = os.homedir() + out.slice('${HOME}'.length);
  }
  if (out.includes('$') || out.includes('`')) {
    return null;
  }
  return out;
}

/**
 * Does any same-scope command ahead of `cd_idx` rebind `HOME`?
 *
 * `$HOME` and `~` are read off the WORKER's environment, which is only valid
 * while the session has not reassigned `HOME` — `HOME=<repo>; cd "$HOME" && git
 * push origin main` would otherwise resolve to the worker's home, look like a
 * move out of the repo, and exempt a real base landing (implementation review
 * 2026-07-30). Any sighting of a `HOME` rebind refuses the expansion outright.
 *
 * @param {SimpleCommand[]} commands
 * @param {number} cd_idx
 * @returns {boolean}
 */
function homeRebound(commands, cd_idx) {
  const scope = commands[cd_idx].scope;
  for (let i = 0; i < cd_idx; i += 1) {
    const c = commands[i];
    if (c.scope !== scope) {
      continue;
    }
    for (const w of c.words) {
      if (w === 'HOME' || w.startsWith('HOME=')) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Pick the directory operand of a `cd`. `cd -` is the previous directory, which
 * this module cannot know, so it is reported unresolvable rather than guessed.
 *
 * @param {string[]} argv - The `cd` command's normalized argv.
 * @returns {{ resolvable: boolean, token: string|null }} `token` null with
 * `resolvable` true means bare `cd` — the home directory.
 */
function cdTargetToken(argv) {
  for (let i = 1; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--') {
      return {
        resolvable: true,
        token: i + 1 < argv.length ? argv[i + 1] : null
      };
    }
    if (token === '-') {
      return { resolvable: false, token: null };
    }
    if (token.startsWith('-')) {
      continue;
    }
    return { resolvable: true, token };
  }
  return { resolvable: true, token: null };
}

/**
 * The quote provenance of a word, looked up by its VALUE in the raw word list —
 * `normalizeArgv` drops leading tokens, so the argv index and the `word_flags`
 * index are not the same. A value appearing more than once resolves to the most
 * conservative (most-quoted) sighting.
 *
 * @param {SimpleCommand} cmd
 * @param {string} value
 * @returns {{ sq: boolean, q: boolean }|undefined}
 */
function flagsForWord(cmd, value) {
  /** @type {{ sq: boolean, q: boolean }|undefined} */
  let found;
  for (let i = 0; i < cmd.words.length; i += 1) {
    if (cmd.words[i] !== value) {
      continue;
    }
    const f = cmd.word_flags ? cmd.word_flags[i] : undefined;
    if (!f) {
      return undefined;
    }
    found = found
      ? { sq: found.sq || f.sq, q: found.q || f.q }
      : { sq: f.sq, q: f.q };
  }
  return found;
}

/**
 * Operators after which the following command runs whatever the previous one
 * returned. `&&`/`||` are conditional and therefore absent: a command behind one
 * of them may be SKIPPED, and an assignment that may not have run proves
 * nothing about where a later `cd` goes.
 *
 * @type {Set<string|null>}
 */
const UNCONDITIONAL_OPS = new Set([null, ';', '\n']);

/**
 * The ONE literal assignment a `cd` may be resolved through: the assignment-only
 * command IMMEDIATELY preceding it in the same scope, reached unconditionally.
 *
 * Three restrictions, each closing a false proof:
 *
 *   - The `cd`'s OWN assignment prefix is not one. POSIX 2.9.1 expands a simple
 *     command's words BEFORE performing that command's assignments, so
 *     `H=/elsewhere cd "$H"` runs `cd ""` — it stays put and pushes from the repo
 *     after all.
 *   - The assignment must be reached UNCONDITIONALLY. In
 *     `true || H=/foreign; cd "$H" && git push origin main` the assignment is
 *     skipped, so `$H` keeps whatever it already held — possibly the repo itself.
 *     Reading the skipped `/foreign` as the destination exempts a real base
 *     landing (spec-delta review 2026-07-30).
 *   - It must be the IMMEDIATE predecessor. Anything in between can rebind the
 *     variable in a way no static read can see (`eval`, `read`, `export`,
 *     a sourced file), and an intervening rebind makes the visible assignment a
 *     stale premise.
 *
 * @param {SimpleCommand[]} commands
 * @param {number} cd_idx
 * @returns {{ name: string, value: string, flags: { sq: boolean, q: boolean }|undefined }|null}
 */
function precedingAssignment(commands, cd_idx) {
  const scope = commands[cd_idx].scope;
  let prev = -1;
  for (let i = cd_idx - 1; i >= 0; i -= 1) {
    if (commands[i].scope === scope) {
      prev = i;
      break;
    }
  }
  if (prev < 0) {
    return null;
  }
  const c = commands[prev];
  if (!UNCONDITIONAL_OPS.has(c.op)) {
    return null;
  }
  if (c.words.length !== 1 || !ASSIGNMENT_RE.test(c.words[0])) {
    return null;
  }
  return { ...splitAssignment(c.words[0]), flags: c.word_flags[0] };
}

/**
 * A word that resolves with NO expansion at all — used when `HOME` was rebound,
 * so `~`/`$HOME` are no longer knowable but a plain literal still is.
 *
 * @param {string} word
 * @param {{ sq: boolean, q: boolean }} [flags]
 * @returns {string|null}
 */
function literalOnly(word, flags) {
  if (word.length === 0) {
    return null;
  }
  if (word.startsWith('~') || word.includes('$') || word.includes('`')) {
    return null;
  }
  void flags;
  return word;
}

/**
 * Resolve where a `cd` goes, or null when it is not decidable. Variable
 * expansion is ONE stage off the single unconditional assignment immediately
 * ahead of the move ({@link precedingAssignment}); anything else refuses, which
 * is what keeps the allowlist an allowlist.
 *
 * @param {SimpleCommand[]} commands
 * @param {number} cd_idx
 * @returns {string|null}
 */
function resolveCdTarget(commands, cd_idx) {
  const cmd = commands[cd_idx];
  const argv = normalizeArgv(cmd.words);
  const picked = cdTargetToken(argv);
  if (!picked.resolvable) {
    return null;
  }
  const home_ok = !homeRebound(commands, cd_idx);
  if (picked.token == null) {
    // Bare `cd` goes to `$HOME`, so a rebound HOME makes even that undecidable.
    return home_ok ? os.homedir() : null;
  }
  const token_flags = flagsForWord(cmd, picked.token);
  const direct = home_ok
    ? expandDeterministic(picked.token, token_flags)
    : literalOnly(picked.token, token_flags);
  if (direct != null) {
    return direct;
  }
  // A single-quoted `$H` is a literal filename, not a variable reference.
  if (token_flags && token_flags.sq) {
    return null;
  }
  const ref = SINGLE_VAR_RE.exec(picked.token);
  if (!ref) {
    return null;
  }
  const var_name = ref[1] ?? ref[2];
  const assignment = precedingAssignment(commands, cd_idx);
  if (!assignment || assignment.name !== var_name) {
    return null;
  }
  return home_ok
    ? expandDeterministic(assignment.value, assignment.flags)
    : literalOnly(assignment.value, assignment.flags);
}

/**
 * Is a resolved `cd` target provably outside the attempt's repo?
 *
 * A RELATIVE target is refused: the session's cwd is the worktree, not the repo
 * root, so resolving it would be a guess — and an unproven condition is
 * fail-closed by construction.
 *
 * @param {string|null} target
 * @param {string} repo
 * @returns {boolean}
 */
function resolvesOutsideRepo(target, repo) {
  if (target == null || !path.isAbsolute(target)) {
    return false;
  }
  const repo_abs = path.resolve(repo);
  const resolved = path.resolve(target);
  return resolved !== repo_abs && !resolved.startsWith(repo_abs + path.sep);
}

/**
 * Builtins that change the CURRENT shell's working directory, or can run a
 * command that does so in the current shell. A child process cannot move its
 * parent, which is why the interpreters are absent.
 *
 * @type {Set<string>}
 */
const CWD_MUTATORS = new Set(['cd', 'pushd', 'popd', 'eval', 'source', '.']);

/**
 * The command word of a simple command, after the wrapper/assignment/reserved
 * prefixes are dropped. Empty string when there is none.
 *
 * @param {SimpleCommand} cmd
 * @returns {string}
 */
function commandName(cmd) {
  const argv = normalizeArgv(cmd.words);
  return argv.length > 0 ? basename(argv[0]).toLowerCase() : '';
}

/**
 * @param {SimpleCommand} cmd
 * @returns {boolean}
 */
function isCdCommand(cmd) {
  return commandName(cmd) === 'cd';
}

/**
 * The narrow allowlist for a push that only LOOKS like a base landing because
 * the argv names the attempt repo's base — the 2026-07-29/07-30 incidents,
 * where a Cortex bead published another repository's `main` and the guard killed
 * the session twice (spec §6).
 *
 * All FOUR conditions must be proven; the mere presence of a move token is not
 * a reason, because "a move precedes it" passes every one of the three real
 * base landings the design rejected.
 *
 *   1. same shell scope — an identical scope id, so a move inside a subshell or
 *      in a SIBLING subshell does not count;
 *   2. domination — the move itself is reached unconditionally (its own operator
 *      is `;`, a newline, or the scope start, so an assignment ahead of it is
 *      fine but `true || cd /foreign` is not), it is not negated, and every
 *      same-scope command from the move up to and including the push is joined by
 *      `&&` and cannot itself move the shell;
 *   3. static resolution of the move target ({@link resolveCdTarget}) — one
 *      stage off the single unconditional assignment immediately ahead of it, so
 *      a skipped or rebindable assignment never becomes a proof;
 *   4. the resolved path lies outside the attempt repo.
 *
 * The LAST move before the push decides, so `cd /foreign && cd "$repo" && push`
 * is judged on the move that actually holds at push time.
 *
 * @param {SimpleCommand[]} commands
 * @param {number} push_idx
 * @param {GuardContext} ctx
 * @returns {boolean}
 */
function isExemptCrossRepoPush(commands, push_idx, ctx) {
  if (ctx.repo == null) {
    return false;
  }
  const scope = commands[push_idx].scope;
  let cd_idx = -1;
  for (let i = push_idx - 1; i >= 0; i -= 1) {
    if (commands[i].scope !== scope) {
      continue;
    }
    if (isCdCommand(commands[i])) {
      cd_idx = i;
      break;
    }
  }
  if (cd_idx < 0) {
    return false;
  }
  const move = commands[cd_idx];
  // The MOVE must itself run unconditionally. `true || cd /foreign && git push
  // origin main` skips the move (the `||` short-circuits) and then runs the push
  // from the repo — the `&&` between move and push says nothing about whether the
  // move happened (implementation review 2026-07-30).
  if (!UNCONDITIONAL_OPS.has(move.op)) {
    return false;
  }
  // A NEGATED move inverts its status, so `! cd /missing && git push origin main`
  // runs the push precisely when the move FAILED.
  if (move.words[0] === '!') {
    return false;
  }
  for (let i = cd_idx + 1; i <= push_idx; i += 1) {
    if (commands[i].scope !== scope) {
      continue;
    }
    if (commands[i].op !== '&&') {
      return false;
    }
    // Anything between the move and the push that can change the CURRENT shell's
    // cwd invalidates the move as a proof. Only builtins can: a child process
    // cannot move its parent, so an interpreter (`bash -c 'cd …'`) is harmless
    // while `eval`/`source`/`.`/`pushd`/`popd` are not. A shell FUNCTION could
    // too, but its definition makes the tokenizer refuse the whole input.
    if (i < push_idx && CWD_MUTATORS.has(commandName(commands[i]))) {
      return false;
    }
  }
  return resolvesOutsideRepo(resolveCdTarget(commands, cd_idx), ctx.repo);
}

/**
 * The pre-argv regex judgment, used when (and only when) tokenization failed.
 *
 * @param {string} src
 * @param {GuardContext} ctx
 * @returns {MergeViolation|null}
 */
function fallbackViolation(src, ctx) {
  if (baseLandingRegex(ctx.target_base).test(src)) {
    return { reason: 'merge_to_base_blocked', command: src };
  }
  if (!ctx.conflict_resolution && BASE_INTO_BRANCH_RE.test(src)) {
    return { reason: 'base_merge_blocked', command: src };
  }
  return null;
}

/**
 * Judge one simple command, recursing into interpreter arguments. The sibling
 * list and this command's index are passed because the base-landing allowlist is
 * a property of the command's NEIGHBOURS (the move that precedes it), not of the
 * command alone.
 *
 * @param {SimpleCommand} cmd
 * @param {GuardContext} ctx
 * @param {number} depth
 * @param {SimpleCommand[]} siblings - Every command parsed from the same source.
 * @param {number} index - `cmd`'s position in `siblings`.
 * @returns {MergeViolation|null}
 */
function checkSimpleCommand(cmd, ctx, depth, siblings, index) {
  const argv = normalizeArgv(cmd.words);
  if (argv.length === 0) {
    return null;
  }
  const name = basename(argv[0]).toLowerCase();

  if (name === 'gh' && argv[1] === 'pr' && argv[2] === 'merge') {
    return { reason: 'merge_to_base_blocked', command: cmd.text };
  }

  if (
    name === 'git' &&
    argv[1] === 'push' &&
    pushLandsOnBase(argv.slice(2), ctx.target_base) &&
    !isExemptCrossRepoPush(siblings, index, ctx)
  ) {
    return { reason: 'merge_to_base_blocked', command: cmd.text };
  }

  if (
    name === 'git' &&
    typeof argv[1] === 'string' &&
    /^merge(-|$)/.test(argv[1]) &&
    !['merge-base', 'merge-tree', 'merge-file'].includes(argv[1]) &&
    !ctx.conflict_resolution
  ) {
    return { reason: 'base_merge_blocked', command: cmd.text };
  }

  if (name === 'eval' && argv.length > 1) {
    const joined = argv.slice(1).join(' ');
    const inner = scanCommand(joined, ctx, depth + 1);
    if (inner) {
      return inner;
    }
  }

  if (INTERPRETERS.has(name)) {
    for (let i = 1; i < argv.length; i += 1) {
      if (/^-[a-z]*c$/.test(argv[i]) && i + 1 < argv.length) {
        const inner = scanCommand(argv[i + 1], ctx, depth + 1);
        if (inner) {
          return inner;
        }
        break;
      }
    }
    // A heredoc feeding an interpreter's stdin is a script, not data.
    for (const doc of cmd.heredocs) {
      const inner = scanCommand(doc.body, ctx, depth + 1);
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
 * @param {GuardContext} ctx
 * @param {number} depth
 * @returns {MergeViolation|null}
 */
function scanCommand(src, ctx, depth) {
  if (typeof src !== 'string' || src.trim().length === 0) {
    return null;
  }
  if (depth > MAX_DEPTH) {
    return fallbackViolation(src, ctx);
  }
  const parsed = tokenize(src);
  if (!parsed) {
    return fallbackViolation(src, ctx);
  }
  for (let idx = 0; idx < parsed.commands.length; idx += 1) {
    const violation = checkSimpleCommand(
      parsed.commands[idx],
      ctx,
      depth,
      parsed.commands,
      idx
    );
    if (violation) {
      return violation;
    }
  }
  for (const inner_src of parsed.nested) {
    const violation = scanCommand(inner_src, ctx, depth + 1);
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
 * @param {{ conflict_resolution?: boolean, repo?: string|null,
 * target_base?: string|null }} [options] - `conflict_resolution` true relaxes
 * the base-into-branch guard ONLY (worker-phase2 §6); absent or non-true fails
 * closed. `repo`/`target_base` are the attempt's subject
 * (worker-base-scope-alignment §6): absent `target_base` keeps the legacy
 * `main|master` match, absent `repo` disables the cross-repo allowlist. Either
 * absence therefore reproduces today's verdict exactly.
 * @returns {MergeViolation|null} The first violation found, else null.
 */
export function findMergeViolation(cmd, options) {
  /** @type {GuardContext} */
  const ctx = {
    conflict_resolution: options?.conflict_resolution === true,
    repo:
      typeof options?.repo === 'string' && options.repo.length > 0
        ? options.repo
        : null,
    target_base:
      typeof options?.target_base === 'string' && options.target_base.length > 0
        ? options.target_base
        : null
  };
  return scanCommand(cmd, ctx, 0);
}
