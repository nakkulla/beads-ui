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

/** @type {readonly number[]} */
const FETCH_RETRY_DELAYS_MS = Object.freeze([100, 300]);
const FETCH_ATTEMPT_TIMEOUT_MS = 30_000;

/**
 * @typedef {'ref_lock'|'network'|'auth'|'missing_ref'|'unknown'} FetchFailureCategory
 */

/**
 * Characters `git check-ref-format` accepts but a shell reads as syntax. The
 * resolved base is interpolated into a `gh pr create --base <base>` directive
 * the session runs, so this fail-closed guard sits ahead of the contract's own
 * steps (implementation review 2026-07-30). It is a pure string test, which is
 * what lets the display-only projection below share it without running git.
 *
 * @type {RegExp}
 */
const SHELL_UNSAFE = /[^A-Za-z0-9._/-]/;

/**
 * Classify fetch stderr without retaining credential-bearing remote output.
 *
 * @param {string} stderr
 * @returns {FetchFailureCategory}
 */
function classifyFetchFailure(stderr) {
  const message = String(stderr || '');
  if (
    /cannot lock ref|unable to create .*\.lock|cannot update ref|reference already exists/i.test(
      message
    )
  ) {
    return 'ref_lock';
  }
  if (
    /permission denied|authentication failed|could not read username|terminal prompts disabled|publickey|credential/i.test(
      message
    )
  ) {
    return 'auth';
  }
  if (
    /couldn't find remote ref|remote ref .* not found|remote branch .* not found/i.test(
      message
    )
  ) {
    return 'missing_ref';
  }
  if (
    /could not resolve host|connection (?:timed out|reset|refused)|network is unreachable|operation timed out|early eof|remote end hung up unexpectedly/i.test(
      message
    )
  ) {
    return 'network';
  }
  return 'unknown';
}

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
 * What the repo DECLARES as its base, for display only (UI-j6wa §3). The
 * toolbar chip has to say something on every render, and the five-step resolver
 * fetches — a network round-trip per snapshot decoration is not what a chip is
 * worth. So this reads the declaration and stops there; dispatch keeps using
 * {@link resolveTargetBase}, and the chip never claims the base was verified.
 *
 * A declaration that cannot be read is NOT `main`: the undeclared fallback
 * belongs to a repo that declared nothing, and showing `main` for a broken
 * declaration is the same silent-typo failure the no-fallback rule exists to
 * stop. Those return null and the chip says `base ?`.
 *
 * @param {string} repo
 * @param {typeof import('node:fs')} [fs]
 * @returns {string|null}
 */
export function readDeclaredBase(repo, fs = nodeFs) {
  const declaration = readDeclaration(String(repo || ''), fs);
  if (!declaration.ok) {
    return null;
  }
  const base = declaration.base ?? UNDECLARED_BASE;
  return SHELL_UNSAFE.test(base) || !wellFormedBranch(base) ? null : base;
}

/**
 * Whether `base` is a legal branch name, decided by string inspection alone.
 *
 * `git check-ref-format --branch` is the authority the dispatch path uses, but
 * it is a process spawn and this projection runs once per snapshot decoration.
 * The characters it rejects outright are already gone — {@link SHELL_UNSAFE}
 * admits only `[A-Za-z0-9._/-]` — so what is left are the POSITIONAL rules,
 * and those are pure string facts (implementation review 2026-08-03): a
 * malformed declaration that slipped through here would be shown as a normal
 * base, which is the mislabelling the null case exists to prevent.
 *
 * @param {string} base
 * @returns {boolean}
 */
function wellFormedBranch(base) {
  if (base.startsWith('-') || base.endsWith('.') || base.includes('..')) {
    return false;
  }
  return base
    .split('/')
    .every(
      (component) =>
        component.length > 0 &&
        !component.startsWith('.') &&
        !component.endsWith('.lock')
    );
}

/**
 * Resolve the target base of `repo`, running every contract step.
 *
 * @param {{
 *   repo: string,
 *   gitRun: (args: string[], options: { cwd?: string, timeout_ms?: number }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   fs?: typeof import('node:fs'),
 *   delay?: (ms: number) => Promise<void>
 * }} input
 * @returns {Promise<TargetBaseResult>}
 */
export async function resolveTargetBase(input) {
  const repo = String(input.repo || '');
  const fs = input.fs || nodeFs;
  const delay =
    input.delay ||
    ((/** @type {number} */ ms) =>
      new Promise((resolve) => {
        setTimeout(resolve, ms);
      }));
  /**
   * @param {string[]} args
   */
  const git = (args) =>
    input.gitRun(args, {
      cwd: repo,
      ...(args[0] === 'fetch' ? { timeout_ms: FETCH_ATTEMPT_TIMEOUT_MS } : {})
    });

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

  // Shell-metacharacter guard, ahead of step 2. `check-ref-format` accepts
  // plenty of characters a shell reads as syntax (`;`, `$`, backtick, `&`, `|`,
  // `(`, `)`, `<`, `>`, quotes, `!`, `#`, `{`, `}`), and the resolved base is
  // interpolated into a `gh pr create --base <base>` directive the session runs
  // (implementation review 2026-07-30). This is a fail-closed ADDITION to the
  // contract's five steps — it never accepts anything they reject.
  if (SHELL_UNSAFE.test(base)) {
    return { ok: false, step: 'format', base, detail: 'shell_unsafe' };
  }

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
    //
    // `git config --get` exits 1 for "not set" and something else for a real
    // failure, and the two must not be conflated: a CONFIGURED upstream that no
    // longer exists is a broken declaration, and quietly substituting the
    // repo's single remote would swallow the step-4 failure the no-fallback rule
    // exists to surface (implementation review 2026-07-30).
    const configured = await git(['config', '--get', `branch.${base}.remote`]);
    if (configured.code !== 0 && configured.code !== 1) {
      return { ok: false, step: 'git_error', base, detail: 'config_get' };
    }
    const upstream = configured.code === 0 ? configured.stdout.trim() : '';
    if (upstream.length > 0 && !remotes.includes(upstream)) {
      return {
        ok: false,
        step: 'remote',
        base,
        detail: `upstream_missing:${upstream}`
      };
    }
    /** @type {string} */
    let remote;
    if (upstream.length > 0) {
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
    /** @type {{ code: number, stdout: string, stderr: string }|null} */
    let fetched = null;
    for (
      let attempt = 0;
      attempt <= FETCH_RETRY_DELAYS_MS.length;
      attempt += 1
    ) {
      fetched = await git(['fetch', '--no-tags', remote, base]);
      if (fetched.code === 0) {
        break;
      }
      if (attempt < FETCH_RETRY_DELAYS_MS.length) {
        await delay(FETCH_RETRY_DELAYS_MS[attempt]);
      }
    }
    if (!fetched || fetched.code !== 0) {
      const category = classifyFetchFailure(fetched ? fetched.stderr : '');
      const exit_code = fetched ? fetched.code : -1;
      return {
        ok: false,
        step: 'fetch',
        base,
        detail: `remote:${remote};attempts:${FETCH_RETRY_DELAYS_MS.length + 1};exit:${exit_code};category:${category}`
      };
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
