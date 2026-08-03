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
 * Render the `/bin/sh` pre-push script for one attempt.
 *
 * Step 1 asks whether this push belongs to the attempt's repository, comparing
 * `--git-common-dir` (identical for a main checkout and every linked worktree,
 * which is what makes the `cd`-then-push path judgeable) on both sides. Both
 * sides are produced by git itself and then normalized with `pwd -P`, so a
 * symlinked path cannot make a repo look foreign. An unresolvable side passes:
 * the hook judges what git tells it and nothing else.
 *
 * Step 2 asks whether any ref in this push lands on the attempt's base. The
 * REMOTE NAME is never consulted — `refs/heads/<base>` on any remote is the
 * protected destination — and a deletion (all-zero local oid) counts as a
 * landing, because deleting the base is at least as destructive as moving it.
 *
 * @param {{ repo: string, target_base: string, attempt_id: string }} input
 * @returns {string}
 */
export function renderHookScript(input) {
  const repo_literal = shellLiteral(input.repo);
  const ref_literal = shellLiteral(`refs/heads/${input.target_base}`);
  const attempt_literal = shellLiteral(input.attempt_id);
  return `#!/bin/sh
# bdui worker base guard (UI-8mvc §2) — generated, do not edit.
# attempt: ${input.attempt_id}
set -u

guard_attempt=${attempt_literal}
guard_repo=${repo_literal}
guard_ref=${ref_literal}

# 1) Is this push happening in the attempt's OWN repository? core.hooksPath is
#    injected process-wide, so every repository the session pushes from lands
#    here; only this one is judged.
here=$(git rev-parse --path-format=absolute --git-common-dir 2>/dev/null) || exit 0
mine=$(git -C "$guard_repo" rev-parse --path-format=absolute --git-common-dir 2>/dev/null) || exit 0
[ -n "$here" ] || exit 0
[ -n "$mine" ] || exit 0
here=$(CDPATH= cd -- "$here" 2>/dev/null && pwd -P) || exit 0
mine=$(CDPATH= cd -- "$mine" 2>/dev/null && pwd -P) || exit 0
[ "$here" = "$mine" ] || exit 0

# 2) Does any ref of this push land on the attempt's base?
status=0
while read -r local_ref local_oid remote_ref remote_oid; do
  [ -n "$remote_ref" ] || continue
  if [ "$remote_ref" = "$guard_ref" ]; then
    printf '%s\\n' "bdui guard: refusing push to $remote_ref in $mine — attempt $guard_attempt must not land on its own base (local ref: $local_ref)" >&2
    status=1
  fi
done
exit $status
`;
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
 * @param {{ workspace: string, attempt_id: string, repo: string, target_base: string }} input
 * @param {{ fs?: typeof import('node:fs') }} [options]
 * @returns {{ ok: boolean, dir?: string, hook_path?: string, reason?: string }}
 */
export function install(input, options = {}) {
  const fs = options.fs || nodeFs;
  const dir = guardHookDir(input.workspace, input.attempt_id);
  const hook_path = path.join(dir, 'pre-push');
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
      renderHookScript({ repo, target_base, attempt_id: input.attempt_id }),
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
  return { ok: true, dir, hook_path };
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
