/**
 * The repo's OWN `[verify]`/`[deploy]` declaration as the worker's execution
 * surface (UI-kfl4).
 *
 * Before this module the commands the worker ran lived in
 * `~/.config/bdui/config.toml` — a COPY of what each repo declares in
 * `docs/agents/repo-ops.toml`. Two files meant a structural drift window: a PR
 * that changes the deploy command could merge while the old command kept
 * running, and reading a repo could not tell you what would actually execute.
 * The declaration is now the first rung of the ladder and config.toml is the
 * legacy fallback:
 *
 *   1. `<pinned-sha>:docs/agents/repo-ops.toml` `[verify]`/`[deploy]`  ← wins
 *   2. `[worker.verify]`/`[worker.deploy]` in config.toml               ← legacy
 *
 * TWO invariants make rung 1 safe to trust.
 *
 * PINNED BLOB, NEVER THE WORKING TREE. The declaration is read with
 * `git show <sha>:<path>`, where the sha is the base pin for the calling
 * context (the fetched remote target-base tip before a merge, the cleanup's
 * `synced.sha` after one). Reading the working tree would break twice over:
 * `syncBase` legitimately succeeds as `fetch_only:dirty` /
 * `fetch_only:not_on_base` without moving the checkout at all, so the file on
 * disk may be stale or uncommitted; and a PR could define its own verification
 * by putting `cmd = ["true"]` on its branch. Pinning to a BASE sha means the
 * code under test is the PR head while the verification COMMAND is the reviewed
 * base — self-attestation is structurally impossible.
 *
 * THREE STATES, NEVER NULL. A resolution is `resolved` / `absent` / `invalid`.
 * Collapsing a broken declaration to null would make it indistinguishable from
 * "this repo has no verification", which is a PASSING tier for the merge gate —
 * a parse error would become a silent no-verification merge. So `invalid` never
 * falls through to rung 2 and never degrades; each consumer fails closed on it.
 *
 * Unknown keys are IGNORED on purpose. The declaration schema is owned by the
 * dotfiles repo-onboarding skill and is additive; and the server that parses a
 * freshly merged declaration is always the PRE-merge build (its own restart is
 * the last cleanup step), so a new key must never break the old reader.
 */
import nodeFs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseToml } from 'smol-toml';
import { debug } from '../logging.js';
import { resolveVerifyCmd } from './verify-cmd.js';

const log = debug('worker:repo-ops');

/**
 * The declaration's path INSIDE a git tree. Forward slashes, not
 * `path.join` — this is a git pathspec (`<sha>:<path>`), not a filesystem path.
 *
 * @type {string}
 */
export const REPO_OPS_BLOB_PATH = 'docs/agents/repo-ops.toml';

/**
 * Last-resort timeout for a declaration that omits `timeout_ms`, mirroring
 * config.js's `DEFAULT_VERIFY_TIMEOUT_MS` for the config rung.
 *
 * @type {number}
 */
const DEFAULT_TIMEOUT_MS = 600000;

/**
 * How many `(repo, sha)` declaration reads stay memoized. A resolution happens
 * per poll pass and per click, and the base pin only moves when the base does,
 * so a handful of entries per workspace covers the live set; the bound is what
 * keeps a long-running server from accumulating one entry per base commit.
 *
 * @type {number}
 */
const CACHE_MAX = 64;

/**
 * @typedef {Object} ResolvedVerifyOps
 * @property {string[]} cmd
 * @property {number} timeout_ms
 */

/**
 * @typedef {Object} ResolvedDeployOps
 * @property {string[]} cmd
 * @property {number} timeout_ms
 * @property {boolean} detached
 */

/**
 * @template T
 * @typedef {{ state: 'resolved', source: 'declaration'|'config', value: T }
 *   | { state: 'absent' }
 *   | { state: 'invalid', source: 'declaration', detail: string }} OpsResolution
 */

/**
 * @typedef {OpsResolution<ResolvedVerifyOps>} VerifyResolution
 */

/**
 * @typedef {OpsResolution<ResolvedDeployOps>} DeployResolution
 */

/**
 * @type {OpsResolution<any>}
 */
const ABSENT = { state: 'absent' };

/**
 * What an async resolution returns when the CALLER could not supply a pin —
 * the target base did not resolve. `invalid`, not `absent`: with no pin there
 * is no rung 1 to read, and answering from the legacy rung alone would let an
 * unresolvable base merge on a command nothing checked against the base it is
 * merging into. Every consumer already fails closed on `invalid`.
 *
 * @type {OpsResolution<any>}
 */
const PIN_UNAVAILABLE = {
  state: 'invalid',
  source: 'declaration',
  detail: 'pin_unavailable'
};

/**
 * Memoized declaration reads, keyed `<repo>\0<sha>`.
 *
 * @type {Map<string, { verify: VerifyResolution, deploy: DeployResolution }>}
 */
const declaration_cache = new Map();

/**
 * The LAST declaration resolved for each repo, with the pin that produced it.
 * Read by the synchronous {@link peekVerifyResolution} /
 * {@link peekDeployResolution} projections — see their doc for why a cache read
 * is the right thing there. One entry per workspace, so it is bounded by the
 * number of repos the server serves.
 *
 * @type {Map<string, { sha: string, verify: VerifyResolution, deploy: DeployResolution }>}
 */
const latest_by_repo = new Map();

/**
 * Drop every memoized read. Tests only — the live server has no invalidation
 * event because a `(repo, sha)` blob cannot change.
 */
export function resetRepoOpsCache() {
  declaration_cache.clear();
  latest_by_repo.clear();
}

/**
 * Validate a declared `cmd`/`timeout_ms` pair. Shared by both sections because
 * the argv rule is identical: the worker spawns WITHOUT a shell, so a shell
 * one-liner string is not a command it can run.
 *
 * An OMITTED `timeout_ms` takes the default; a PRESENT one that is not a
 * positive number is `invalid`. The two are different facts — "the repo did not
 * say" versus "the repo said something we cannot honour" — and coercing the
 * second into the default is the silent-typo failure the three-state contract
 * exists to stop. Tolerant parsing covers keys this reader does not KNOW, never
 * known keys carrying nonsense.
 *
 * @param {any} section
 * @returns {{ ok: true, cmd: string[], timeout_ms: number }|{ ok: false, detail: string }}
 */
function normalizeDeclaredCmd(section) {
  if (!section || typeof section !== 'object' || Array.isArray(section)) {
    return { ok: false, detail: 'section_not_a_table' };
  }
  const raw_cmd = section.cmd;
  if (
    !Array.isArray(raw_cmd) ||
    raw_cmd.length === 0 ||
    !raw_cmd.every((a) => typeof a === 'string' && a.length > 0)
  ) {
    return { ok: false, detail: 'cmd_not_a_nonempty_argv_array' };
  }
  if (!Object.hasOwn(section, 'timeout_ms')) {
    return {
      ok: true,
      cmd: raw_cmd.slice(),
      timeout_ms: DEFAULT_TIMEOUT_MS
    };
  }
  const raw_timeout = section.timeout_ms;
  if (
    typeof raw_timeout !== 'number' ||
    !Number.isFinite(raw_timeout) ||
    raw_timeout <= 0
  ) {
    return { ok: false, detail: 'timeout_ms_not_a_positive_number' };
  }
  return {
    ok: true,
    cmd: raw_cmd.slice(),
    timeout_ms: Math.floor(raw_timeout)
  };
}

/**
 * Project a parsed declaration's `[verify]` section onto the three states.
 *
 * @param {any} parsed
 * @returns {VerifyResolution}
 */
function declaredVerify(parsed) {
  if (!Object.hasOwn(parsed, 'verify')) {
    return ABSENT;
  }
  const normalized = normalizeDeclaredCmd(parsed.verify);
  if (!normalized.ok) {
    return {
      state: 'invalid',
      source: 'declaration',
      detail: `verify:${normalized.detail}`
    };
  }
  return {
    state: 'resolved',
    source: 'declaration',
    value: { cmd: normalized.cmd, timeout_ms: normalized.timeout_ms }
  };
}

/**
 * Project a parsed declaration's `[deploy]` section onto the three states.
 *
 * @param {any} parsed
 * @returns {DeployResolution}
 */
function declaredDeploy(parsed) {
  if (!Object.hasOwn(parsed, 'deploy')) {
    return ABSENT;
  }
  const normalized = normalizeDeclaredCmd(parsed.deploy);
  if (!normalized.ok) {
    return {
      state: 'invalid',
      source: 'declaration',
      detail: `deploy:${normalized.detail}`
    };
  }
  // `detached` decides whether this command may run synchronously, and this
  // repo's own deploy restarts the server — so a non-boolean value is refused
  // rather than read as `false`, which is the dangerous side.
  if (
    Object.hasOwn(parsed.deploy, 'detached') &&
    typeof parsed.deploy.detached !== 'boolean'
  ) {
    return {
      state: 'invalid',
      source: 'declaration',
      detail: 'deploy:detached_not_a_boolean'
    };
  }
  return {
    state: 'resolved',
    source: 'declaration',
    value: {
      cmd: normalized.cmd,
      timeout_ms: normalized.timeout_ms,
      detached: parsed.deploy.detached === true
    }
  };
}

/**
 * @param {string} repo
 * @param {string} sha
 * @param {{ verify: VerifyResolution, deploy: DeployResolution }} entry
 */
function remember(repo, sha, entry) {
  latest_by_repo.set(repo, { ...entry, sha });
}

/**
 * Both sections of one unreadable declaration.
 *
 * @param {string} detail
 * @returns {{ verify: VerifyResolution, deploy: DeployResolution }}
 */
function brokenEntry(detail) {
  /** @type {{ state: 'invalid', source: 'declaration', detail: string }} */
  const broken = { state: 'invalid', source: 'declaration', detail };
  return { verify: broken, deploy: broken };
}

/**
 * Turn one `git show` result into the pair of resolutions it declares.
 *
 * A non-zero exit here means the PATH is not in that tree — the pin itself was
 * verified to exist by the probe in {@link readDeclarationAt} before this ran,
 * which is what makes "the repo declares nothing at this commit" separable from
 * "git could not answer". Only the first is `absent`.
 *
 * @param {string} repo
 * @param {string} sha
 * @param {{ code: number, stdout: string, stderr: string }} shown
 * @returns {{ verify: VerifyResolution, deploy: DeployResolution }}
 */
function declarationEntry(repo, sha, shown) {
  if (shown.code !== 0) {
    log(
      'no declaration blob for %s at %s: %s',
      repo,
      sha,
      String(shown.stderr || '').trim()
    );
    return { verify: ABSENT, deploy: ABSENT };
  }
  /** @type {any} */
  let parsed;
  try {
    parsed = parseToml(shown.stdout);
  } catch {
    // A file that exists but does not parse is the case `invalid` was
    // introduced for: it says something, and we cannot tell what.
    return brokenEntry('toml_parse_failed');
  }
  if (!parsed || typeof parsed !== 'object') {
    return { verify: ABSENT, deploy: ABSENT };
  }
  return { verify: declaredVerify(parsed), deploy: declaredDeploy(parsed) };
}

/**
 * Read and parse the declaration at one pin.
 *
 * TWO probes, because "this commit declares nothing" and "git could not answer"
 * must not produce the same state — the first is a legitimate `absent` that
 * falls through to the config rung, the second is a read failure that would
 * make an unreadable pin look like an unconfigured repo (a PASSING tier for the
 * merge gate). So the pin's existence is verified first with `rev-parse`, and
 * only then is a non-zero `git show` read as "the path is not in this tree".
 * Anything else — an unresolvable pin, a thrown adapter — is `invalid`.
 *
 * @param {{
 *   gitRun: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   repo: string,
 *   sha: string
 * }} input
 * @returns {Promise<{ verify: VerifyResolution, deploy: DeployResolution }>}
 */
async function readDeclarationAt(input) {
  const repo = path.resolve(String(input.repo || ''));
  const sha = String(input.sha || '');
  const key = `${repo}\0${sha}`;
  const cached = declaration_cache.get(key);
  if (cached) {
    remember(repo, sha, cached);
    return cached;
  }
  /** @type {{ verify: VerifyResolution, deploy: DeployResolution }} */
  let entry;
  try {
    const pinned = await input.gitRun(
      ['rev-parse', '--verify', '--quiet', `${sha}^{commit}`],
      { cwd: repo }
    );
    if (pinned.code !== 0 || pinned.stdout.trim().length === 0) {
      log('declaration pin %s unresolvable in %s', sha, repo);
      // NOT cached: an object database that does not have the commit yet may
      // have it after the next fetch, and caching the failure would keep the
      // repo blocked past the condition that caused it.
      return brokenEntry('pin_unresolvable');
    }
    entry = declarationEntry(
      repo,
      sha,
      await input.gitRun(['show', `${sha}:${REPO_OPS_BLOB_PATH}`], {
        cwd: repo
      })
    );
  } catch (err) {
    log('declaration read threw for %s at %s: %o', repo, sha, err);
    return brokenEntry('git_error');
  }
  if (declaration_cache.size >= CACHE_MAX) {
    const oldest = declaration_cache.keys().next();
    if (!oldest.done) {
      declaration_cache.delete(oldest.value);
    }
  }
  declaration_cache.set(key, entry);
  remember(repo, sha, entry);
  return entry;
}

/**
 * The config rung for `[worker.deploy]`. `[worker.verify]` has its own
 * long-standing resolver ({@link resolveVerifyCmd}); this is its deploy twin,
 * and both only ever produce `resolved` or `absent` — config.js drops malformed
 * sections at normalization time, so a config-sourced `invalid` cannot exist.
 *
 * @param {string} repo
 * @param {Record<string, ResolvedDeployOps>|null|undefined} config_map
 * @returns {DeployResolution}
 */
function configDeploy(repo, config_map) {
  const configured = config_map
    ? config_map[path.resolve(String(repo || ''))]
    : null;
  if (
    !configured ||
    !Array.isArray(configured.cmd) ||
    configured.cmd.length === 0
  ) {
    return ABSENT;
  }
  return {
    state: 'resolved',
    source: 'config',
    value: {
      cmd: configured.cmd.slice(),
      timeout_ms:
        typeof configured.timeout_ms === 'number' && configured.timeout_ms > 0
          ? configured.timeout_ms
          : DEFAULT_TIMEOUT_MS,
      detached: configured.detached === true
    }
  };
}

/**
 * The config rung for `[worker.verify]`, wrapped in the three-state shape.
 *
 * @param {string} repo
 * @param {Record<string, { cmd: string[], timeout_ms: number }>|null|undefined} config_map
 * @returns {VerifyResolution}
 */
function configVerify(repo, config_map) {
  const configured = resolveVerifyCmd(repo, config_map);
  return configured
    ? { state: 'resolved', source: 'config', value: configured }
    : ABSENT;
}

/**
 * Apply the ladder to one already-read declaration rung.
 *
 * @template T
 * @param {string} repo
 * @param {'verify'|'deploy'} kind
 * @param {OpsResolution<T>} declared
 * @param {OpsResolution<T>} configured
 * @returns {OpsResolution<T>}
 */
function ladder(repo, kind, declared, configured) {
  if (declared.state === 'invalid') {
    log('%s declaration invalid for %s: %s', kind, repo, declared.detail);
    return declared;
  }
  if (declared.state === 'resolved') {
    if (configured.state === 'resolved') {
      const same =
        JSON.stringify(configured.value) === JSON.stringify(declared.value);
      if (!same) {
        // The drift the single-SoT move exists to close. The declaration wins;
        // the log is what tells an operator the config entry is now a stale
        // leftover worth removing.
        log(
          '%s drift for %s: declaration wins over config.toml (%o vs %o)',
          kind,
          repo,
          declared.value,
          configured.value
        );
      }
    }
    return declared;
  }
  return configured;
}

/**
 * Resolve the verify command for `repo` as of the pinned base sha.
 *
 * @param {{
 *   gitRun: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   repo: string,
 *   sha: string|null,
 *   config_map: Record<string, { cmd: string[], timeout_ms: number }>|null|undefined
 * }} input
 * @returns {Promise<VerifyResolution>}
 */
export async function resolveVerifyAt(input) {
  if (!input.sha) {
    return PIN_UNAVAILABLE;
  }
  const configured = configVerify(input.repo, input.config_map);
  const declaration = await readDeclarationAt({
    gitRun: input.gitRun,
    repo: input.repo,
    sha: input.sha
  });
  return ladder(input.repo, 'verify', declaration.verify, configured);
}

/**
 * Resolve the deploy command for `repo` as of the pinned base sha.
 *
 * @param {{
 *   gitRun: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   repo: string,
 *   sha: string|null,
 *   config_map: Record<string, ResolvedDeployOps>|null|undefined
 * }} input
 * @returns {Promise<DeployResolution>}
 */
export async function resolveDeployAt(input) {
  if (!input.sha) {
    return PIN_UNAVAILABLE;
  }
  const configured = configDeploy(input.repo, input.config_map);
  const declaration = await readDeclarationAt({
    gitRun: input.gitRun,
    repo: input.repo,
    sha: input.sha
  });
  return ladder(input.repo, 'deploy', declaration.deploy, configured);
}

/**
 * The SYNCHRONOUS projection of the ladder, for the two call sites that cannot
 * await: the queue-snapshot decoration and the auto-merge enrollment scan.
 *
 * Rung 1 comes from the last declaration the ASYNC resolver read for this repo
 * — never a second parse path. The PR poller resolves once per pass for every
 * observed bead, CI or no CI, so any repo the two call sites have something to
 * say about has already published a resolution here; the staleness bound is one
 * poll pass. A repo nothing has resolved yet reads as `absent` and falls
 * through to config, which is also what the ladder does with a repo that
 * declares nothing — and such a repo has no observation either, so its gate is
 * `unobserved` and nothing enrolls.
 *
 * Both call sites are advisory (a dialog's display, an enrollment shortlist)
 * and the authoritative decision behind each one — `gateNow` before a merge,
 * `runDeploy` during cleanup — awaits the real resolver against a fresh pin.
 *
 * @param {string} repo
 * @param {Record<string, { cmd: string[], timeout_ms: number }>|null|undefined} config_map
 * @returns {VerifyResolution}
 */
export function peekVerifyResolution(repo, config_map) {
  const key = path.resolve(String(repo || ''));
  const declared = latest_by_repo.get(key)?.verify ?? ABSENT;
  return ladder(key, 'verify', declared, configVerify(key, config_map));
}

/**
 * The deploy twin of {@link peekVerifyResolution}, on the same contract.
 *
 * @param {string} repo
 * @param {Record<string, ResolvedDeployOps>|null|undefined} config_map
 * @returns {DeployResolution}
 */
export function peekDeployResolution(repo, config_map) {
  const key = path.resolve(String(repo || ''));
  const declared = latest_by_repo.get(key)?.deploy ?? ABSENT;
  return ladder(key, 'deploy', declared, configDeploy(key, config_map));
}

/**
 * This server's own installation root — the checkout `server/worker/` lives in.
 *
 * @type {string}
 */
const SELF_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..'
);

/**
 * Whether `repo` is the checkout this server process is RUNNING FROM.
 *
 * Deploying beads-ui restarts beads-ui, so a synchronous deploy against this
 * repo would kill the process mid-cleanup and strand every remaining step. The
 * declaration is what says `detached = true`, and a declaration is only as
 * correct as its last review — so the guard is here rather than in the schema.
 *
 * Compared through `realpathSync` because the workspace path and the module
 * path routinely differ by a symlink (`/tmp` → `/private/tmp` on darwin, an
 * `npm link`ed install). A comparison that cannot be MADE returns `unknown`
 * rather than `other`: both self-repo defences hang off this answer, and a
 * guess of "not this repo" is the side that lets a self-killing deploy through.
 * The caller decides what `unknown` costs — the deploy step refuses.
 *
 * A workspace path that does NOT EXIST is the one resolution failure that is
 * still an answer: this process is running from its own checkout, so a path
 * with nothing at it cannot be that checkout. Every other error is undecidable
 * — an unreadable parent directory could still hide a symlink into it.
 *
 * @param {string} repo
 * @param {{ fs?: typeof import('node:fs'), self_root?: string }} [options]
 * @returns {'self'|'other'|'unknown'}
 */
export function selfRepoState(repo, options = {}) {
  const fs = options.fs || nodeFs;
  const self_root = options.self_root || SELF_ROOT;
  /** @type {string} */
  let self_real;
  try {
    self_real = fs.realpathSync(self_root);
  } catch (err) {
    log('self root unresolvable (%s): %o', self_root, err);
    return 'unknown';
  }
  try {
    return fs.realpathSync(path.resolve(String(repo || ''))) === self_real
      ? 'self'
      : 'other';
  } catch (err) {
    const code =
      err && typeof err === 'object' ? /** @type {any} */ (err).code : null;
    if (code === 'ENOENT' || code === 'ENOTDIR') {
      return 'other';
    }
    log('self-repo comparison failed for %s: %o', repo, err);
    return 'unknown';
  }
}
