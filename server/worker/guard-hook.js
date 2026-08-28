/**
 * Prevention layer — the per-attempt `pre-push` hook (UI-8mvc §2).
 *
 * The text guard reads one command string and has to GUESS which repository a
 * push lands in; git does not have to guess. A `pre-push` hook is handed the
 * resolved destination refs on stdin, so the judgment is exact no matter what
 * the command looked like — a python `subprocess.run(['git','push',...])`, a
 * `node` child, or a `cd <repo> && git push` all arrive here identically.
 *
 * Two facts are baked into the script as shell LITERALS rather than passed as
 * environment variables: the attempt's repo and its target base. The session
 * owns its own environment, so a variable it can overwrite is a judgment it can
 * disable.
 *
 * The hook is delivered through `GIT_CONFIG_COUNT`/`GIT_CONFIG_KEY_<n>`/
 * `GIT_CONFIG_VALUE_<n>` (`core.hooksPath`), which — measured, spec §2 — applies
 * to EVERY repository the session touches, not just the bead worktree. That is
 * exactly why it closes the "cd to the repo's main checkout, then push" gap, and
 * exactly why the script's first step is to decide whether the repository it was
 * invoked in is the attempt's own. A cross-repo `enclosed` push is not
 * "tolerated" by an allowlist; it is structurally out of scope.
 *
 * Known limitation, kept deliberately: `git push --no-verify` skips the hook
 * (measured — the remote base really moves). The text guard's `hook_bypass` kill
 * covers the attempt; the hook does not pretend to.
 */
import nodeFs from 'node:fs';
import path from 'node:path';
import { debug } from '../logging.js';
import { guardHookDir } from './state-paths.js';

const log = debug('worker:guard-hook');

/**
 * Hook file mode. Git ignores a `core.hooksPath` entry that is not executable,
 * so the bit is part of the contract, not a nicety.
 *
 * @type {number}
 */
const HOOK_MODE = 0o755;

/**
 * The push record's filename, inside the attempt's own hook directory (UI-1xcd
 * §4.1). It lives there rather than beside the queue because its lifetime is
 * the hook's: {@link remove} takes both away together, and a leftover log
 * belonging to a retired attempt id could otherwise be read as this one's.
 *
 * @type {string}
 */
const PUSH_LOG_NAME = 'pushes.jsonl';

/**
 * Where one attempt's push record lives.
 *
 * @param {string} workspace
 * @param {string} attempt_id
 * @returns {string}
 */
export function pushLogPath(workspace, attempt_id) {
  return path.join(guardHookDir(workspace, attempt_id), PUSH_LOG_NAME);
}

/**
 * Quote an arbitrary string as a single POSIX shell literal. A base branch is a
 * ref name, which may hold `/` (`ilsun/dev`) and — for a malformed declaration —
 * anything else; the script must never let it become syntax.
 *
 * @param {string} value
 * @returns {string}
 */
function shellLiteral(value) {
  return `'${String(value).replace(/'/g, `'\\''`)}'`;
}

/**
 * The docs-only exemption machinery, rendered in GUARD mode only. Record mode
 * refuses nothing, so an exemption from a refusal would be dead code carrying a
 * verdict — and the reader could not tell which mode it belonged to.
 *
 * @type {string}
 */
const DOCS_ONLY_JUDGMENT = `# The same line plus the verdict that let it through (UI-7ufi §2.3). Only an
# EXEMPTED base line takes this shape; every other line keeps the one above,
# byte for byte, because the detection layer reads both.
guard_record_exempt() {
  {
    printf '{"local_ref":"%s","local_oid":"%s","remote_ref":"%s","remote_oid":"%s","exempt":"docs_only"}\\n' \\
      "$(guard_json "$1")" "$(guard_json "$2")" "$(guard_json "$3")" "$(guard_json "$4")" \\
      >> "$guard_push_log"
  } 2>/dev/null || :
}

# An all-zero oid: git's "no commit" on one side of a ref update. An empty
# field reads as zero too — absent evidence must not become an exemption.
guard_is_zero() {
  case "$1" in
    '') return 0 ;;
    *[!0]*) return 1 ;;
    *) return 0 ;;
  esac
}

# The docs-only base-push exemption (UI-7ufi §2.1), which exists so the workflow
# contract's only artifact publication path — a detached candidate pushed
# straight at the base by land-reviewed-artifact.py — can complete inside a
# Worker attempt. Nothing a session can set feeds the judgment: the materials are
# the oids git put on stdin and the output of two read-only git commands.
#
# Both judgment commands carry --no-replace-objects because local
# refs/replace/* rewrites what a local diff READS but not what the push
# TRANSMITS: without it, a code-bearing commit swapped for a docs-only one would
# be judged on the swap while the original reached the remote. --no-renames is
# mandatory for the mirror reason: rename detection prints only the NEW path, so
# server/x.js -> docs/x.js would read as docs-only while deleting a source
# file. --ignore-submodules=none closes the third: diff.ignoreSubmodules=all is
# session-writable repo config, and under it a gitlink change outside docs/ is
# simply absent from --name-only, so a docs file plus a moved submodule pointer
# would read as docs-only while the tree change reached the base.
#
# All three defeat the same shape of attack — local state that changes what the
# judgment READS without changing what the push TRANSMITS — so the judgment is
# pinned to explicit flags rather than to whatever the repo config says.
#
# Conditions are asked in order and the FIRST failure is the reported reason.
guard_docs_only() {
  guard_reason=git_error
  guard_bad_path=''
  guard_count=0
  if guard_is_zero "$1"; then
    guard_reason=deletion
    return 1
  fi
  if guard_is_zero "$2"; then
    guard_reason=new_ref
    return 1
  fi
  # Every git call here reads /dev/null: the loop's stdin is the ref list git
  # handed the hook, and a child that consumed it would silently drop refs.
  git --no-replace-objects merge-base --is-ancestor "$2" "$1" >/dev/null 2>&1 </dev/null
  guard_rc=$?
  # Exit 1 is the command's NEGATIVE ANSWER, not a failed observation; anything
  # above it means the question could not be asked.
  if [ "$guard_rc" -eq 1 ]; then
    guard_reason=not_fast_forward
    return 1
  fi
  if [ "$guard_rc" -ne 0 ]; then
    guard_reason=git_error
    return 1
  fi
  guard_delta=$(git --no-replace-objects diff --no-renames --ignore-submodules=none --name-only "$2" "$1" 2>/dev/null </dev/null)
  guard_rc=$?
  if [ "$guard_rc" -ne 0 ]; then
    guard_reason=git_error
    return 1
  fi
  # An empty delta is not an exemption: a publication with nothing to publish is
  # not a shape the land script produces.
  if [ -z "$guard_delta" ]; then
    guard_reason=paths
    return 1
  fi
  # Split on newline with globbing OFF, so a path holding a shell metacharacter
  # stays one field and is never expanded against the worktree. A path git chose
  # to quote ("docs/…) starts with a quote, fails the prefix test, and is
  # refused — deliberately fail-closed rather than turning core.quotePath off.
  guard_ifs=$IFS
  set -f
  IFS='
'
  for guard_path in $guard_delta; do
    guard_count=$((guard_count + 1))
    case "$guard_path" in
      docs/*) ;;
      *)
        guard_bad_path=$guard_path
        break
        ;;
    esac
  done
  IFS=$guard_ifs
  set +f
  if [ -n "$guard_bad_path" ]; then
    guard_reason=paths
    return 1
  fi
  guard_reason=''
  return 0
}

`;

/**
 * The guard-mode ref loop: record every line, judge the base-destined ones, and
 * refuse the ones the exemption does not cover.
 *
 * @type {string}
 */
const GUARD_LOOP = `# 2) Record every ref of this push, THEN ask whether any lands on the base.
status=0
while read -r local_ref local_oid remote_ref remote_oid; do
  [ -n "$remote_ref" ] || continue
  if [ "$remote_ref" != "$guard_ref" ]; then
    guard_record "$local_ref" "$local_oid" "$remote_ref" "$remote_oid"
    continue
  fi
  # A base-destined line is JUDGED and then recorded, so the record can carry
  # the verdict (UI-7ufi §2.3). The judgment spends read-only git commands, so
  # the reordering adds no side effect to lose if the record fails.
  if guard_docs_only "$local_oid" "$remote_oid"; then
    guard_record_exempt "$local_ref" "$local_oid" "$remote_ref" "$remote_oid"
    printf '%s\\n' "bdui guard: passing docs-only push to $remote_ref in $mine (attempt $guard_attempt, $guard_count path(s))" >&2
    continue
  fi
  guard_record "$local_ref" "$local_oid" "$remote_ref" "$remote_oid"
  guard_detail=$guard_reason
  if [ "$guard_reason" = paths ] && [ -n "$guard_bad_path" ]; then
    guard_detail="$guard_reason ($guard_bad_path)"
  fi
  printf '%s\\n' "bdui guard: refusing push to $remote_ref in $mine — attempt $guard_attempt must not land on its own base (local ref: $local_ref)" >&2
  printf '%s\\n' "bdui guard: docs-only exemption not met: $guard_detail" >&2
  status=1
done
exit $status
`;

/**
 * The record-mode ref loop (worker-failure-tiers §5.1): the same record, the
 * same line shape, and no refusal — `status` never leaves 0.
 *
 * @type {string}
 */
const RECORD_LOOP = `# 2) Record every ref of this push and pass (worker-failure-tiers §5.1). The
#    quick_fix lane's errand IS the base push, so no line is refused here; the
#    record is the whole point, and the landing judgment reads it.
status=0
while read -r local_ref local_oid remote_ref remote_oid; do
  [ -n "$remote_ref" ] || continue
  guard_record "$local_ref" "$local_oid" "$remote_ref" "$remote_oid"
  if [ "$remote_ref" = "$guard_ref" ]; then
    printf '%s\\n' "bdui guard: recording base push to $remote_ref (attempt $guard_attempt, record mode)" >&2
  fi
done
exit $status
`;

/**
 * Render the `/bin/sh` pre-push script for one attempt.
 *
 * Step 1 asks whether this push belongs to the attempt's repository, comparing
 * `--git-common-dir` (identical for a main checkout and every linked worktree,
 * which is what makes the `cd`-then-push path judgeable) on both sides. Both
 * sides are produced by git itself and then normalized with `pwd -P`, so a
 * symlinked path cannot make a repo look foreign. An unresolvable side passes:
 * the hook judges what git tells it and nothing else.
 *
 * Step 2 RECORDS every ref of this push and then asks whether any of them lands
 * on the attempt's base. The record comes first and covers the refused pushes
 * too (UI-1xcd §4.1): git computed these destinations, so the line is a FACT
 * about what this attempt tried, and the post-hoc detection layer is built on
 * it instead of guessing provenance from the commit graph. An append failure is
 * swallowed — a lost diagnostic must never turn into a failed push.
 *
 * The REMOTE NAME is never consulted — `refs/heads/<base>` on any remote is the
 * protected destination — and a deletion (all-zero local oid) counts as a
 * landing, because deleting the base is at least as destructive as moving it.
 *
 * A push judged FOREIGN by step 1 is never recorded: it exits before the loop,
 * and logging it would hand the detection layer someone else's push.
 *
 * ONE structural exemption sits inside that judgment (UI-7ufi §2.1): a
 * fast-forward whose whole delta lives under `docs/` passes and is recorded with
 * `"exempt":"docs_only"`. Without it the workflow contract's only artifact
 * publication path — `land-reviewed-artifact.py`, which pushes a detached
 * candidate straight at the base — is unreachable from inside a Worker attempt,
 * so a spec the Worker itself reviewed can never be revised. The exemption is
 * cut on the RESULT TREE rather than the commit shape, and nothing a session can
 * write (env, allowlist file, commit message) takes part in it. Because a base
 * line's verdict now belongs in its record, base lines are judged and then
 * recorded; every other line is recorded exactly as before.
 *
 * RECORD MODE (worker-failure-tiers §5.1) keeps every one of those decisions
 * except the refusal. The quick_fix lane's whole errand IS the base push, so it
 * runs today with no hook at all and therefore leaves no evidence of what it
 * landed; a hook that records and passes gives the landing judgment the same
 * ref/oid facts the guarded lanes already produce. The record line is
 * byte-identical to the guarded one — the detection layer reads one shape — and
 * the docs-only judgment is not rendered at all, because an exemption from a
 * refusal that cannot happen would only be dead code with a verdict.
 *
 * @param {{ repo: string, target_base: string, attempt_id: string, push_log: string, mode?: 'guard'|'record' }} input
 * @returns {string}
 */
export function renderHookScript(input) {
  const repo_literal = shellLiteral(input.repo);
  const ref_literal = shellLiteral(`refs/heads/${input.target_base}`);
  const attempt_literal = shellLiteral(input.attempt_id);
  const push_log_literal = shellLiteral(input.push_log);
  const mode = input.mode === 'record' ? 'record' : 'guard';
  const judgment_block = mode === 'record' ? '' : DOCS_ONLY_JUDGMENT;
  const loop_block = mode === 'record' ? RECORD_LOOP : GUARD_LOOP;
  return `#!/bin/sh
# bdui worker base guard (UI-8mvc §2, UI-1xcd §4.1) — generated, do not edit.
# attempt: ${input.attempt_id}
# mode: ${mode}
set -u

guard_attempt=${attempt_literal}
guard_repo=${repo_literal}
guard_ref=${ref_literal}
guard_push_log=${push_log_literal}

# JSON-escape one value. Ref names may legally hold a backslash-free set, but
# the oids and refs arrive from git unchecked, so the two characters that could
# break the line are escaped rather than assumed away.
guard_json() {
  printf '%s' "$1" | sed -e 's/\\\\/\\\\\\\\/g' -e 's/"/\\\\"/g'
}

guard_record() {
  {
    printf '{"local_ref":"%s","local_oid":"%s","remote_ref":"%s","remote_oid":"%s"}\\n' \\
      "$(guard_json "$1")" "$(guard_json "$2")" "$(guard_json "$3")" "$(guard_json "$4")" \\
      >> "$guard_push_log"
  } 2>/dev/null || :
}

${judgment_block}# 1) Is this push happening in the attempt's OWN repository? core.hooksPath is
#    injected process-wide, so every repository the session pushes from lands
#    here; only this one is judged.
here=$(git rev-parse --path-format=absolute --git-common-dir 2>/dev/null) || exit 0
mine=$(git -C "$guard_repo" rev-parse --path-format=absolute --git-common-dir 2>/dev/null) || exit 0
[ -n "$here" ] || exit 0
[ -n "$mine" ] || exit 0
here=$(CDPATH= cd -- "$here" 2>/dev/null && pwd -P) || exit 0
mine=$(CDPATH= cd -- "$mine" 2>/dev/null && pwd -P) || exit 0
[ "$here" = "$mine" ] || exit 0

${loop_block}`;
}

/**
 * Parse an inherited `GIT_CONFIG_COUNT`. Anything that is not a non-negative
 * decimal integer reads as 0: git itself rejects such a value, so there is no
 * inherited entry to preserve and index 0 is free.
 *
 * @param {string|number|null|undefined} raw
 * @returns {number}
 */
function inheritedCount(raw) {
  if (typeof raw === 'number' && Number.isInteger(raw) && raw >= 0) {
    return raw;
  }
  if (typeof raw !== 'string' || !/^\d+$/.test(raw.trim())) {
    return 0;
  }
  const n = Number.parseInt(raw.trim(), 10);
  return Number.isSafeInteger(n) && n >= 0 ? n : 0;
}

/**
 * The three env keys that point a session's git at this attempt's hook.
 *
 * Delivering is NOT installing: this creates no state, so it may run inside
 * `launchSession` while {@link install} may not (spec §2, "설치 시점").
 *
 * An inherited `GIT_CONFIG_COUNT` is EXTENDED, never overwritten — writing
 * `COUNT=1` over an inherited `COUNT=2` would silently drop the parent's
 * `KEY_1`/`VALUE_1` pair.
 *
 * @param {{ workspace: string, attempt_id: string }} input
 * @param {{ inherited_count?: string|number|null, env?: Record<string, string|undefined> }} [options]
 * `inherited_count` is the seam tests drive; absent, the count is read from
 * `options.env` (default `process.env`) — the same environment
 * `runner/session.js` spreads under `settings.env`.
 * @returns {Record<string, string>}
 */
export function envFor(input, options = {}) {
  const raw =
    options.inherited_count !== undefined
      ? options.inherited_count
      : (options.env || process.env).GIT_CONFIG_COUNT;
  const n = inheritedCount(raw);
  return {
    GIT_CONFIG_COUNT: String(n + 1),
    [`GIT_CONFIG_KEY_${n}`]: 'core.hooksPath',
    [`GIT_CONFIG_VALUE_${n}`]: guardHookDir(input.workspace, input.attempt_id)
  };
}

/**
 * Create the attempt's hook directory and executable `pre-push` script.
 *
 * Reports rather than throws, because the caller's answer to a failure is a
 * visible dispatch refusal (`guard_hook_install_failed`), not an exception. A
 * PARTIAL failure — directory created, script unwritable — cleans up after
 * itself: a hook dir with no `pre-push` in it would still be pointed at by
 * `core.hooksPath`, silently disabling every hook the repo has while protecting
 * nothing.
 *
 * The empty PUSH LOG written here is the migration boundary (UI-1xcd §4.1). Its
 * presence is what lets the detection layer tell "this attempt pushed nothing"
 * from "this attempt predates the record" — so a failure to create it is a
 * dispatch refusal like any other, not a silent downgrade to guessing.
 *
 * `mode` picks which script is written (worker-failure-tiers §5.1). It is an
 * input rather than an option because it is a property of the ATTEMPT — the
 * quick_fix lane installs `record`, every other lane `guard` — and defaults to
 * `guard`, so an unset value fails closed on the refusing script.
 *
 * @param {{ workspace: string, attempt_id: string, repo: string, target_base: string, mode?: 'guard'|'record' }} input
 * @param {{ fs?: typeof import('node:fs') }} [options]
 * @returns {{ ok: boolean, dir?: string, hook_path?: string, reason?: string }}
 */
export function install(input, options = {}) {
  const fs = options.fs || nodeFs;
  const dir = guardHookDir(input.workspace, input.attempt_id);
  const hook_path = path.join(dir, 'pre-push');
  const push_log = path.join(dir, PUSH_LOG_NAME);
  const repo = typeof input.repo === 'string' ? input.repo : '';
  const target_base =
    typeof input.target_base === 'string' ? input.target_base : '';
  // Without either subject the script could only judge everything or nothing;
  // both are wrong answers, so the dispatch is refused instead.
  if (repo.length === 0 || target_base.length === 0) {
    return { ok: false, reason: 'guard_hook_subject_missing' };
  }
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (err) {
    log('guard hook mkdir failed for %s: %o', input.attempt_id, err);
    return { ok: false, reason: 'guard_hook_mkdir_failed' };
  }
  try {
    fs.writeFileSync(
      hook_path,
      renderHookScript({
        repo,
        target_base,
        attempt_id: input.attempt_id,
        push_log,
        mode: input.mode === 'record' ? 'record' : 'guard'
      }),
      { mode: HOOK_MODE }
    );
    // `writeFileSync`'s mode applies only when it CREATES the file; a leftover
    // path from an earlier attempt id keeps its old bits, so the chmod is not
    // redundant.
    fs.chmodSync(hook_path, HOOK_MODE);
  } catch (err) {
    log('guard hook write failed for %s: %o', input.attempt_id, err);
    remove(input, options);
    return { ok: false, reason: 'guard_hook_write_failed' };
  }
  try {
    // Truncating, not appending: a leftover file under a reused attempt id
    // would otherwise hand this attempt the previous one's pushes.
    fs.writeFileSync(push_log, '');
  } catch (err) {
    log('guard hook push-log init failed for %s: %o', input.attempt_id, err);
    remove(input, options);
    return { ok: false, reason: 'guard_hook_push_log_failed' };
  }
  return { ok: true, dir, hook_path };
}

/**
 * Read one attempt's push record (UI-1xcd §4.1).
 *
 * The `absent` answer is load-bearing and is NOT the same as an empty log: an
 * initialized-but-empty file proves the hook ran and pushed nothing, while a
 * missing one means the attempt was dispatched before the record existed (or
 * its state directory is unreadable) and cannot be judged at all.
 *
 * A malformed line is skipped rather than failing the read: the log is
 * append-only evidence written by a shell, and one truncated tail must not
 * discard the lines before it.
 *
 * @param {{ workspace: string, attempt_id: string }} input
 * @param {{ fs?: typeof import('node:fs') }} [options]
 * @returns {{ ok: true, entries: Record<string, unknown>[] } | { ok: false, reason: 'absent' }}
 */
export function readPushLog(input, options = {}) {
  const fs = options.fs || nodeFs;
  /** @type {string} */
  let raw;
  try {
    raw = String(
      fs.readFileSync(pushLogPath(input.workspace, input.attempt_id), 'utf8')
    );
  } catch (err) {
    log('guard hook push-log unreadable for %s: %o', input.attempt_id, err);
    return { ok: false, reason: 'absent' };
  }
  /** @type {Record<string, unknown>[]} */
  const entries = [];
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.length === 0) {
      continue;
    }
    try {
      const parsed = JSON.parse(trimmed);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        entries.push(parsed);
      }
    } catch {
      // A partially written tail line: skip it, keep the rest.
    }
  }
  return { ok: true, entries };
}

/**
 * Best-effort removal of an attempt's hook directory. Failure is logged and
 * nothing else: the next attempt writes under a NEW attempt id, so a leftover
 * tree cannot pollute a later judgment.
 *
 * @param {{ workspace: string, attempt_id: string }} input
 * @param {{ fs?: typeof import('node:fs') }} [options]
 * @returns {boolean} Whether the directory is known to be gone.
 */
export function remove(input, options = {}) {
  const fs = options.fs || nodeFs;
  const dir = guardHookDir(input.workspace, input.attempt_id);
  try {
    fs.rmSync(dir, { recursive: true, force: true });
    return true;
  } catch (err) {
    log('guard hook cleanup failed for %s: %o', input.attempt_id, err);
    return false;
  }
}
