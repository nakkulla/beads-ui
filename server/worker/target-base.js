/**
 * The ONE target-base resolver every worker consumer reads through
 * (worker-base-scope-alignment §1).
 *
 * The base of a repo is declared by that repo, in its own working tree, at
 * `docs/agents/repo-ops.toml`'s top-level `base` key — the dotfiles contract
 * `docs/contracts/workflow.md` `## Target base` owns the definition and this
 * module is its consumer. An absent file or absent key means `main`, so a repo
 * that never declares one behaves exactly as before; a declared-but-wrong base
 * is a DIFFERENT event and never falls back.
 *
 * All five contract steps run HERE rather than at each use site, because no use
 * site reaches them (measured): `worktree.js`'s `add` runs only
 * `git worktree add -B <branch> <wt> <base>` and never fetches, `admission.js`
 * verifies `<base>^{commit}` against LOCAL refs only, and the merge gate never
 * touches a worktree at all. A resolver that returned a bare branch name would
 * therefore leave a stale local ref and a missing remote branch permanently
 * unverified — which is why the result is a RECORD carrying the fetched remote
 * tip (`base_oid`), not a name.
 *
 * Why this lives in its own module rather than in `attach.js`: `attach.js`
 * imports `pr-actions.js`, and `pr-actions.js` is one of the consumers (the
 * merge gate, §5). Declaring the resolver in `attach.js` would make that a
 * cycle.
 */
import nodeFs from 'node:fs';
import path from 'node:path';
import { parse as parseToml } from 'smol-toml';

/**
 * The declaration's path inside the target repo's working tree. Read from the
 * WORKING TREE and not from the base ref: reading it from the base would
 * require knowing the base in order to learn the base.
 *
 * @type {string}
 */
export const DECLARATION_PATH = path.join('docs', 'agents', 'repo-ops.toml');

/**
 * The base of a repo that declares none. This is the ONLY fallback in this
 * module — every other outcome is either a resolved declaration or a failure.
 *
 * @type {string}
 */
export const UNDECLARED_BASE = 'main';

/**
 * A successfully resolved base.
 *
 * @typedef {Object} ResolvedBase
 * @property {true} ok
 * @property {string} base - The branch name.
 * @property {boolean} declared - Whether the repo declared it (false = `main`
 * by absence).
 * @property {string|null} remote - The upstream remote, null in a local-only
 * repo.
 * @property {string|null} remote_ref - `refs/remotes/<remote>/<base>`, null in
 * a local-only repo.
 * @property {string} base_oid - 40-hex tip: the FETCHED remote tip, or the
 * local branch tip in a local-only repo.
 * @property {boolean} local_only - The recorded zero-remote exception.
 */

/**
 * A resolution failure. `step` names the contract step that failed, so a badge
 * or a log line can tell an operator WHICH part of the declaration is wrong.
 *
 * @typedef {Object} UnresolvedBase
 * @property {false} ok
 * @property {'declaration'|'format'|'remote_prefix'|'remote'|'fetch'|'ref'|'git_error'} step
 * @property {string|null} base - The declared value, when there was one.
 * @property {string} detail - Short machine-readable cause.
 */

/**
 * @typedef {ResolvedBase|UnresolvedBase} TargetBaseResult
 */

/**
 * The single-string refusal reason a consumer records for an unresolved base,
 * following this repo's existing `prefix:detail` convention
 * (`verify_failed:<reason>`, `spec_missing_at_base:<base>`).
 *
 * @param {UnresolvedBase} failure
 * @returns {string}
 */
export function baseUnresolvedReason(failure) {
  return `base_unresolved:${failure.step}`;
}

/**
 * Read the repo's declaration. Absent file OR absent key resolves to
 * `{ declared: false }`; a parse failure, an unreadable file, or a present but
 * non-string / empty `base` is a failure.
 *
 * A PRESENT-but-empty key is deliberately not treated as absence: the contract
 * gives `main` to a repo that never declares one, and swallowing `base = ""` as
 * `main` is the same silent-typo failure the no-fallback rule exists to stop.
 *
 * @param {string} repo
 * @param {typeof import('node:fs')} fs
 * @returns {{ ok: true, base: string|null }|{ ok: false, detail: string }}
 */
function readDeclaration(repo, fs) {
  const file = path.join(repo, DECLARATION_PATH);
  /** @type {string} */
  let raw;
  try {
    raw = fs.readFileSync(file, 'utf8');
  } catch (err) {
    const code =
      err && typeof err === 'object' ? /** @type {any} */ (err).code : null;
    if (code === 'ENOENT' || code === 'ENOTDIR') {
      return { ok: true, base: null };
    }
    return { ok: false, detail: `unreadable:${code || 'error'}` };
  }
  /** @type {any} */
  let parsed;
  try {
    parsed = parseToml(raw);
  } catch {
    return { ok: false, detail: 'toml_parse_failed' };
  }
  if (!parsed || typeof parsed !== 'object' || !Object.hasOwn(parsed, 'base')) {
    return { ok: true, base: null };
  }
  const declared = typeof parsed.base === 'string' ? parsed.base.trim() : '';
  if (declared.length === 0) {
    return { ok: false, detail: 'base_key_empty_or_not_a_string' };
  }
  return { ok: true, base: declared };
}

/**
 * Resolve the target base of `repo`, running every contract step.
 *
 * @param {{
 *   repo: string,
 *   gitRun: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   fs?: typeof import('node:fs')
 * }} input
 * @returns {Promise<TargetBaseResult>}
 */
export async function resolveTargetBase(input) {
  const repo = String(input.repo || '');
  const fs = input.fs || nodeFs;
  /**
   * @param {string[]} args
   */
  const git = (args) => input.gitRun(args, { cwd: repo });

  // Step 1 — the target repo's own declaration.
  const declaration = readDeclaration(repo, fs);
  if (!declaration.ok) {
    return {
      ok: false,
      step: 'declaration',
      base: null,
      detail: declaration.detail
    };
  }
  const base = declaration.base ?? UNDECLARED_BASE;
  const declared = declaration.base != null;

  try {
    // Step 2 — format.
    const format = await git(['check-ref-format', '--branch', base]);
    if (format.code !== 0) {
      return { ok: false, step: 'format', base, detail: 'check_ref_format' };
    }

    // Step 3 — remote prefix. `check-ref-format` treats slashes as legal, so
    // `origin/main` passes step 2; a declaration is a branch name, never a
    // remote-tracking ref. The boundary is the `/` (or an exact match) rather
    // than a bare `startsWith`, so a legal branch that merely begins with a
    // remote's letters (`originally-x` under remote `origin`) is not refused.
    const remotes_probe = await git(['remote']);
    if (remotes_probe.code !== 0) {
      return { ok: false, step: 'git_error', base, detail: 'remote_list' };
    }
    const remotes = remotes_probe.stdout
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    for (const remote of remotes) {
      if (base === remote || base.startsWith(`${remote}/`)) {
        return {
          ok: false,
          step: 'remote_prefix',
          base,
          detail: `remote:${remote}`
        };
      }
    }

    // Step 4 — the remote: the base branch's configured upstream, else the
    // repo's single remote. Zero remotes is the recorded local-only exception;
    // two or more with no upstream cannot be decided here.
    const configured = await git(['config', '--get', `branch.${base}.remote`]);
    const upstream = configured.code === 0 ? configured.stdout.trim() : '';
    /** @type {string} */
    let remote;
    if (upstream.length > 0 && remotes.includes(upstream)) {
      remote = upstream;
    } else if (remotes.length === 1) {
      remote = remotes[0];
    } else if (remotes.length === 0) {
      // Local-only: there is no remote tip to fetch, so the local branch tip is
      // the only base there is. Recorded, not silently treated as remote.
      const local = await git([
        'rev-parse',
        '--verify',
        '--quiet',
        `refs/heads/${base}^{commit}`
      ]);
      if (local.code !== 0 || local.stdout.trim().length === 0) {
        return { ok: false, step: 'ref', base, detail: 'local_branch_missing' };
      }
      return {
        ok: true,
        base,
        declared,
        remote: null,
        remote_ref: null,
        base_oid: local.stdout.trim(),
        local_only: true
      };
    } else {
      return {
        ok: false,
        step: 'remote',
        base,
        detail: `ambiguous:${remotes.length}`
      };
    }

    // Step 5 — fetch, THEN existence of the full remote-tracking ref. Skipping
    // the fetch lets a stale local ref pass validation; the abbreviated form can
    // collide with other ref namespaces.
    const fetched = await git(['fetch', '--no-tags', remote, base]);
    if (fetched.code !== 0) {
      return { ok: false, step: 'fetch', base, detail: `remote:${remote}` };
    }
    const remote_ref = `refs/remotes/${remote}/${base}`;
    const tip = await git([
      'rev-parse',
      '--verify',
      '--quiet',
      `${remote_ref}^{commit}`
    ]);
    if (tip.code !== 0 || tip.stdout.trim().length === 0) {
      return { ok: false, step: 'ref', base, detail: remote_ref };
    }

    return {
      ok: true,
      base,
      declared,
      remote,
      remote_ref,
      base_oid: tip.stdout.trim(),
      local_only: false
    };
  } catch {
    return { ok: false, step: 'git_error', base, detail: 'threw' };
  }
}
