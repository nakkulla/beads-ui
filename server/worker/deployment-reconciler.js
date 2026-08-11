import { spawn } from 'node:child_process';
import crypto from 'node:crypto';
import nodeFs from 'node:fs';
import path from 'node:path';
import {
  deploymentReceiptPath,
  isReleasePath,
  releasePath,
  releaseRoot
} from './deployment-paths.js';
import { errorDetail } from './verify-cmd.js';

const RECEIPT_MAX_BYTES = 1024 * 1024;
const RETRY_DELAYS_MS = [1000, 5000, 15000];
const MANAGED_ENV_KEYS = [
  'PATH',
  'HOME',
  'USER',
  'LOGNAME',
  'SHELL',
  'LANG',
  'LC_ALL',
  'LC_CTYPE',
  'TMPDIR',
  'TMP',
  'TEMP',
  'TZ',
  'XDG_CONFIG_HOME',
  'XDG_DATA_HOME',
  'XDG_STATE_HOME'
];

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @param {string} value
 */
function isSha(value) {
  return /^[0-9a-f]{40}$/i.test(String(value || ''));
}

/**
 * @param {string} value
 */
function isDigest(value) {
  return /^[0-9a-f]{64}$/i.test(String(value || ''));
}

/**
 * @param {Buffer|string} value
 */
function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

/**
 * Build the candidate Adapter environment without inheriting Worker secrets.
 *
 * @param {Record<string, string>} adapter_env
 * @param {NodeJS.ProcessEnv} [process_env]
 */
export function managedAdapterEnvironment(
  adapter_env,
  process_env = process.env
) {
  /** @type {Record<string, string>} */
  const safe_env = {};
  for (const key of MANAGED_ENV_KEYS) {
    const value = process_env[key];
    if (typeof value === 'string') {
      safe_env[key] = value;
    }
  }
  return { ...safe_env, ...adapter_env };
}

/**
 * Reject the credential-bearing URL forms that must never enter Adapter env or
 * a durable receipt. SSH usernames are transport identities, not credentials;
 * HTTP(S) userinfo and URL query/fragment data are not safe to forward.
 *
 * @param {string} value
 */
function safeRemoteUrl(value) {
  if (path.isAbsolute(value) || value.startsWith('local:')) {
    return value;
  }
  try {
    const parsed = new URL(value);
    if (parsed.search.length > 0 || parsed.hash.length > 0) {
      return null;
    }
    if (
      (parsed.protocol === 'http:' || parsed.protocol === 'https:') &&
      (parsed.username.length > 0 || parsed.password.length > 0)
    ) {
      return null;
    }
    if (parsed.password.length > 0) {
      return null;
    }
    return value;
  } catch {
    return value;
  }
}

/**
 * @param {typeof import('node:fs')} fs_impl
 * @param {string} file
 * @param {unknown} value
 */
function writeJsonAtomic(fs_impl, file, value) {
  fs_impl.mkdirSync(path.dirname(file), { recursive: true, mode: 0o700 });
  const tmp = `${file}.tmp`;
  fs_impl.writeFileSync(tmp, JSON.stringify(value, null, 2), {
    mode: 0o600
  });
  fs_impl.renameSync(tmp, file);
}

/**
 * Validate the worker-owned receipt as an exact deployment/readback binding.
 *
 * @param {{
 *   fs?: typeof import('node:fs'),
 *   receipt_path: string,
 *   repo: string,
 *   target_remote: string,
 *   target_base: string,
 *   attempt_id: string,
 *   merged_floor_sha: string,
 *   candidate_sha: string,
 *   source_path: string
 * }} input
 * @returns {{ ok: true, digest: string, receipt: Record<string, any> }|{ ok: false, reason: string, detail?: string }}
 */
export function validateDeploymentReceipt(input) {
  const fs_impl = input.fs || nodeFs;
  /** @type {Buffer} */
  let bytes;
  try {
    const stat = fs_impl.lstatSync(input.receipt_path);
    if (!stat.isFile() || stat.size <= 0 || stat.size > RECEIPT_MAX_BYTES) {
      return { ok: false, reason: 'receipt_file_invalid' };
    }
    bytes = fs_impl.readFileSync(input.receipt_path);
  } catch (err) {
    return {
      ok: false,
      reason:
        isRecord(err) && err.code === 'ENOENT'
          ? 'receipt_missing'
          : 'receipt_file_invalid',
      detail: errorDetail(err)
    };
  }
  /** @type {any} */
  let receipt;
  try {
    receipt = JSON.parse(bytes.toString('utf8'));
  } catch {
    return { ok: false, reason: 'receipt_malformed' };
  }
  if (!isRecord(receipt)) {
    return { ok: false, reason: 'receipt_malformed' };
  }
  if (
    receipt.protocol_version !== 1 ||
    receipt.repo !== path.resolve(input.repo) ||
    receipt.target_remote !== input.target_remote ||
    receipt.target_base !== input.target_base ||
    receipt.attempt_id !== input.attempt_id ||
    receipt.merged_floor_sha !== input.merged_floor_sha ||
    receipt.candidate_sha !== input.candidate_sha
  ) {
    return { ok: false, reason: 'receipt_binding_invalid' };
  }
  if (
    !isRecord(receipt.verify) ||
    receipt.verify.candidate_sha !== input.candidate_sha ||
    receipt.verify.outcome !== 'success' ||
    (receipt.previous_marker !== null &&
      typeof receipt.previous_marker !== 'string') ||
    receipt.deployed_marker !== input.candidate_sha ||
    !isDigest(receipt.action_plan_digest) ||
    !Array.isArray(receipt.action_outcomes) ||
    receipt.action_outcomes.length === 0 ||
    receipt.action_plan_digest !==
      sha256(JSON.stringify(receipt.action_outcomes)) ||
    !receipt.action_outcomes.every(
      (/** @type {unknown} */ outcome) =>
        isRecord(outcome) && outcome.outcome === 'success'
    )
  ) {
    return { ok: false, reason: 'receipt_outcome_invalid' };
  }
  if (
    !isRecord(receipt.deployment_source) ||
    receipt.deployment_source.path !== input.source_path ||
    receipt.deployment_source.head_sha !== input.candidate_sha ||
    !isRecord(receipt.readback) ||
    receipt.readback.outcome !== 'success' ||
    receipt.readback.deployed_marker !== input.candidate_sha ||
    receipt.readback.source_path !== input.source_path ||
    receipt.readback.source_head !== input.candidate_sha ||
    receipt.outcome !== 'success' ||
    typeof receipt.completed_at !== 'string' ||
    Number.isNaN(Date.parse(receipt.completed_at))
  ) {
    return { ok: false, reason: 'receipt_readback_invalid' };
  }
  return {
    ok: true,
    digest: sha256(bytes),
    receipt: /** @type {Record<string, any>} */ (receipt)
  };
}

/**
 * @param {{
 *   repo: string,
 *   target_remote: string,
 *   target_base: string,
 *   attempt_id: string,
 *   merged_floor_sha: string,
 *   candidate_sha: string,
 *   source_path: string,
 *   previous_marker?: string|null,
 *   action_outcomes?: Record<string, any>[],
 *   completed_at?: string
 * }} input
 */
export function createDeploymentReceipt(input) {
  const action_outcomes =
    Array.isArray(input.action_outcomes) && input.action_outcomes.length > 0
      ? input.action_outcomes
      : [{ action: 'workspace_adapter', outcome: 'success' }];
  return {
    protocol_version: 1,
    repo: path.resolve(input.repo),
    target_remote: input.target_remote,
    target_base: input.target_base,
    attempt_id: input.attempt_id,
    merged_floor_sha: input.merged_floor_sha,
    candidate_sha: input.candidate_sha,
    verify: { candidate_sha: input.candidate_sha, outcome: 'success' },
    previous_marker: input.previous_marker ?? null,
    deployed_marker: input.candidate_sha,
    action_plan_digest: sha256(JSON.stringify(action_outcomes)),
    action_outcomes,
    deployment_source: {
      path: input.source_path,
      head_sha: input.candidate_sha
    },
    readback: {
      outcome: 'success',
      deployed_marker: input.candidate_sha,
      source_path: input.source_path,
      source_head: input.candidate_sha
    },
    outcome: 'success',
    completed_at: input.completed_at || new Date().toISOString()
  };
}

/**
 * @param {{
 *   repo: string,
 *   target_base: string,
 *   candidate_sha: string,
 *   remote_url: string,
 *   gitRun: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   fs?: typeof import('node:fs')
 * }} input
 * @returns {Promise<{ ok: true, release_path: string }|{ ok: false, reason: string, detail?: string, retryable: boolean }>}
 */
async function materializeRelease(input) {
  const fs_impl = input.fs || nodeFs;
  const deployment_root = path.dirname(releaseRoot(input.repo));
  const release_root = releaseRoot(input.repo);
  const release_path = releasePath(input.repo, input.candidate_sha);
  try {
    if (!isReleasePath(input.repo, release_path)) {
      return {
        ok: false,
        reason: 'release_path_escape',
        retryable: false
      };
    }
    fs_impl.mkdirSync(deployment_root, { recursive: true, mode: 0o700 });
    const deployment_stat = fs_impl.lstatSync(deployment_root);
    if (!deployment_stat.isDirectory() || deployment_stat.isSymbolicLink()) {
      return {
        ok: false,
        reason: 'release_root_invalid',
        retryable: false
      };
    }
    fs_impl.mkdirSync(release_root, { recursive: true, mode: 0o700 });
    const root_stat = fs_impl.lstatSync(release_root);
    if (!root_stat.isDirectory() || root_stat.isSymbolicLink()) {
      return {
        ok: false,
        reason: 'release_root_invalid',
        retryable: false
      };
    }
    const real_root = fs_impl.realpathSync(release_root);
    try {
      const release_stat = fs_impl.lstatSync(release_path);
      if (!release_stat.isDirectory() || release_stat.isSymbolicLink()) {
        return {
          ok: false,
          reason: 'release_path_escape',
          retryable: false
        };
      }
    } catch (err) {
      if (!isRecord(err) || err.code !== 'ENOENT') {
        throw err;
      }
      fs_impl.mkdirSync(release_path, { mode: 0o700 });
    }
    const real_release = fs_impl.realpathSync(release_path);
    if (path.dirname(real_release) !== real_root) {
      return {
        ok: false,
        reason: 'release_path_escape',
        retryable: false
      };
    }
    const commands = [
      ['init'],
      ['remote', 'remove', 'origin'],
      ['remote', 'add', 'origin', input.remote_url],
      ['fetch', '--no-tags', 'origin', `refs/heads/${input.target_base}`],
      ['checkout', '--detach', '--force', input.candidate_sha]
    ];
    for (const args of commands) {
      const result = await input.gitRun(args, { cwd: release_path });
      if (args[0] === 'remote' && args[1] === 'remove') {
        continue;
      }
      if (result.code !== 0) {
        return {
          ok: false,
          reason: 'materialize_failed',
          detail: String(result.stderr || '')
            .trim()
            .slice(0, 512),
          retryable: true
        };
      }
    }
    const [head, status, remote] = await Promise.all([
      input.gitRun(['rev-parse', 'HEAD'], { cwd: release_path }),
      input.gitRun(['status', '--porcelain'], { cwd: release_path }),
      input.gitRun(['remote', 'get-url', 'origin'], { cwd: release_path })
    ]);
    if (
      head.code !== 0 ||
      head.stdout.trim() !== input.candidate_sha ||
      status.code !== 0 ||
      status.stdout.trim().length > 0 ||
      remote.code !== 0 ||
      remote.stdout.trim() !== input.remote_url
    ) {
      return {
        ok: false,
        reason: 'materialize_readback_failed',
        retryable: true
      };
    }
    const final_root_stat = fs_impl.lstatSync(release_root);
    const final_release_stat = fs_impl.lstatSync(release_path);
    if (
      final_root_stat.isSymbolicLink() ||
      final_release_stat.isSymbolicLink()
    ) {
      return {
        ok: false,
        reason: 'release_path_escape',
        retryable: false
      };
    }
    const final_real_root = fs_impl.realpathSync(release_root);
    const final_real_release = fs_impl.realpathSync(release_path);
    const relative = path.relative(final_real_root, final_real_release);
    if (
      !isReleasePath(input.repo, release_path) ||
      relative.length === 0 ||
      relative.startsWith('..') ||
      path.isAbsolute(relative) ||
      path.dirname(relative) !== '.' ||
      path.dirname(final_real_release) !== final_real_root
    ) {
      return {
        ok: false,
        reason: 'release_path_escape',
        retryable: false
      };
    }
    return { ok: true, release_path };
  } catch (err) {
    return {
      ok: false,
      reason: 'materialize_failed',
      detail: errorDetail(err),
      retryable: true
    };
  }
}

/**
 * @param {{
 *   cmd: string[],
 *   timeout_ms: number,
 *   release_path: string,
 *   env: Record<string, string>,
 *   spawnImpl?: typeof spawn,
 *   fs?: typeof import('node:fs')
 * }} input
 * @returns {Promise<{ ok: true }|{ ok: false, reason: string, detail?: string, retryable: boolean }>}
 */
function runManagedCommand(input) {
  const fs_impl = input.fs || nodeFs;
  const spawnImpl = input.spawnImpl || spawn;
  let executable;
  try {
    const declared = path.resolve(input.release_path, input.cmd[0]);
    const real_release = fs_impl.realpathSync(input.release_path);
    executable = fs_impl.realpathSync(declared);
    const relative = path.relative(real_release, executable);
    if (
      relative.length === 0 ||
      relative.startsWith('..') ||
      path.isAbsolute(relative)
    ) {
      return Promise.resolve({
        ok: false,
        reason: 'adapter_path_escape',
        retryable: false
      });
    }
  } catch (err) {
    return Promise.resolve({
      ok: false,
      reason: 'adapter_spawn_error',
      detail: errorDetail(err),
      retryable: true
    });
  }
  return new Promise((resolve) => {
    /** @type {import('node:child_process').ChildProcess} */
    let child;
    try {
      child = spawnImpl(executable, input.cmd.slice(1), {
        cwd: input.release_path,
        env: managedAdapterEnvironment(input.env),
        shell: false,
        stdio: ['ignore', 'pipe', 'pipe'],
        windowsHide: true
      });
    } catch (err) {
      resolve({
        ok: false,
        reason: 'adapter_spawn_error',
        detail: errorDetail(err),
        retryable: true
      });
      return;
    }
    let settled = false;
    let captured = '';
    const capture = (
      /** @type {import('node:stream').Readable|null} */ stream
    ) => {
      stream?.setEncoding('utf8');
      stream?.on('data', (chunk) => {
        captured = `${captured}${chunk}`.slice(-8192);
      });
      stream?.on('error', () => {});
    };
    capture(child.stdout);
    capture(child.stderr);
    const timer = setTimeout(() => {
      try {
        child.kill('SIGKILL');
      } catch {
        // The close/error event still resolves the result.
      }
      if (!settled) {
        settled = true;
        resolve({
          ok: false,
          reason: 'adapter_timeout',
          detail: captured.trim().slice(-512),
          retryable: true
        });
      }
    }, input.timeout_ms);
    timer.unref?.();
    child.on('error', (err) => {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timer);
      resolve({
        ok: false,
        reason: 'adapter_spawn_error',
        detail: errorDetail(err),
        retryable: true
      });
    });
    child.on('close', (code) => {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timer);
      resolve(
        code === 0
          ? { ok: true }
          : {
              ok: false,
              reason: 'adapter_failed',
              detail: captured.trim().slice(-512),
              retryable: false
            }
      );
    });
  });
}

/**
 * @param {{
 *   workspace: string,
 *   repo: string,
 *   store: any,
 *   locks: { deployLock: (repo: string) => Promise<() => void> },
 *   gitRun: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   resolveBase: (options?: { force?: boolean }) => Promise<any>,
 *   resolveDeploy: (pin?: { sha?: string|null, force?: boolean }) => Promise<any>,
 *   prepareCandidate?: (input: any) => Promise<any>,
 *   verifyCandidate: (input: any) => Promise<any>,
 *   runWorkspaceAdapter: (input: any) => Promise<any>,
 *   materializeManaged?: typeof materializeRelease,
 *   runManagedAdapter?: (input: any) => Promise<any>,
 *   spawnImpl?: typeof spawn,
 *   fs?: typeof import('node:fs'),
 *   now?: () => number,
 *   attemptId?: () => string,
 *   onStage?: (input: { bead_id: string, stage: string, adapter?: string|null }) => void
 * }} deps
 */
export function createDeploymentReconciler(deps) {
  const fs_impl = deps.fs || nodeFs;
  const now = deps.now || (() => Date.now());
  const attemptId =
    deps.attemptId ||
    (() => `deploy-${now()}-${crypto.randomBytes(4).toString('hex')}`);
  const materializeManaged = deps.materializeManaged || materializeRelease;
  const runManagedAdapter =
    deps.runManagedAdapter ||
    ((input) =>
      runManagedCommand({
        cmd: input.cmd,
        timeout_ms: input.timeout_ms,
        release_path: input.release_path,
        env: input.env,
        spawnImpl: deps.spawnImpl,
        fs: fs_impl
      }));

  /** @param {{ bead_id: string, stage: string, adapter?: string|null }} input */
  function onStage(input) {
    try {
      deps.onStage?.(input);
    } catch {
      // Stage projection is advisory; durable queue state remains authoritative.
    }
  }

  /**
   * @param {string} floor_sha
   * @param {string} candidate_sha
   */
  async function contains(floor_sha, candidate_sha) {
    try {
      const result = await deps.gitRun(
        ['merge-base', '--is-ancestor', floor_sha, candidate_sha],
        { cwd: deps.repo }
      );
      return result.code === 0;
    } catch {
      return false;
    }
  }

  /**
   * @param {string|null} remote
   */
  async function remoteUrl(remote) {
    if (remote === null) {
      return `local:${path.resolve(deps.repo)}`;
    }
    try {
      const result = await deps.gitRun(['remote', 'get-url', remote], {
        cwd: deps.repo
      });
      const value = result.stdout.trim();
      return result.code === 0 && value.length > 0
        ? safeRemoteUrl(value)
        : null;
    } catch {
      return null;
    }
  }

  /**
   * @param {any} current
   * @param {string} reason
   * @param {string|null} detail
   * @param {'base_sync'|'post_merge_verify'|'deploy'|null} step
   * @param {{ base_sync?: string|null, output_tail?: string, log_path?: string }} evidence
   */
  function terminal(
    current,
    reason,
    detail = null,
    step = null,
    evidence = {}
  ) {
    const stage = current.stage;
    deps.store.failReconcile(deps.workspace, {
      bead_id: current.bead_id,
      attempt_id: current.attempt_id,
      reason,
      detail,
      step
    });
    onStage({
      bead_id: current.bead_id,
      stage: 'failed',
      adapter: current.adapter
    });
    return {
      ok: false,
      pending: false,
      reason,
      detail,
      stage,
      ...(step === null ? {} : { step }),
      ...evidence
    };
  }

  /**
   * @param {any} current
   * @param {{ reason: string, detail?: string }} failure
   * @param {'base_sync'|'deploy'} step
   */
  function retry(current, failure, step) {
    const retry_at = now() + RETRY_DELAYS_MS[current.retry_count];
    deps.store.retryReconcile(deps.workspace, {
      bead_id: current.bead_id,
      attempt_id: current.attempt_id,
      reason: failure.reason,
      retry_at
    });
    const updated = deps.store.snapshot(deps.workspace).reconcile[
      current.bead_id
    ];
    if (updated.retry_count >= RETRY_DELAYS_MS.length) {
      return terminal(updated, failure.reason, failure.detail || null, step);
    }
    return {
      ok: false,
      pending: true,
      reason: failure.reason,
      retry_at
    };
  }

  /**
   * @param {any} current
   * @param {string} target_remote
   */
  function validateStoredReceipt(current, target_remote) {
    if (
      current.receipt_path === null ||
      current.receipt_digest === null ||
      current.candidate_sha === null
    ) {
      return { ok: false, reason: 'receipt_binding_invalid' };
    }
    const validated = validateDeploymentReceipt({
      fs: fs_impl,
      receipt_path: current.receipt_path,
      repo: deps.repo,
      target_remote,
      target_base: current.target_base,
      attempt_id: current.receipt_attempt_id || current.attempt_id,
      merged_floor_sha: current.receipt_floor_sha || current.merged_floor_sha,
      candidate_sha: current.candidate_sha,
      source_path:
        current.adapter === 'managed'
          ? releasePath(deps.repo, current.candidate_sha)
          : path.resolve(deps.repo)
    });
    if (!validated.ok) {
      return validated;
    }
    if (validated.digest !== current.receipt_digest) {
      return { ok: false, reason: 'receipt_digest_mismatch' };
    }
    return validated;
  }

  /**
   * @param {{ bead_id: string, target_base: string, merged_floor_sha: string, restart?: boolean }} input
   */
  async function reconcile(input) {
    if (
      typeof input.bead_id !== 'string' ||
      input.bead_id.length === 0 ||
      typeof input.target_base !== 'string' ||
      input.target_base.length === 0 ||
      !isSha(input.merged_floor_sha)
    ) {
      return { ok: false, pending: false, reason: 'reconcile_input_invalid' };
    }
    let current = deps.store.snapshot(deps.workspace).reconcile[input.bead_id];
    if (!current || (input.restart === true && current.stage === 'failed')) {
      deps.store.enqueueReconcile(deps.workspace, {
        bead_id: input.bead_id,
        attempt_id: attemptId(),
        target_base: input.target_base,
        merged_floor_sha: input.merged_floor_sha
      });
      current = deps.store.snapshot(deps.workspace).reconcile[input.bead_id];
      if (current) {
        onStage({ bead_id: current.bead_id, stage: 'queued' });
      }
    }
    if (!current) {
      return { ok: false, pending: false, reason: 'reconcile_enqueue_failed' };
    }
    const release_lock = await deps.locks.deployLock(deps.repo);
    try {
      current = deps.store.snapshot(deps.workspace).reconcile[input.bead_id];
      if (
        current.target_base !== input.target_base ||
        current.merged_floor_sha !== input.merged_floor_sha
      ) {
        return terminal(current, 'reconcile_binding_mismatch');
      }
      if (current.stage === 'failed') {
        return {
          ok: false,
          pending: false,
          reason: current.terminal_failure?.reason || 'reconcile_failed',
          detail: current.terminal_failure?.detail || null,
          ...(typeof current.terminal_failure?.step === 'string'
            ? { step: current.terminal_failure.step }
            : {})
        };
      }
      if (current.retry_at !== null && current.retry_at > now()) {
        return {
          ok: false,
          pending: true,
          reason: current.last_retryable_reason || 'retry_wait',
          retry_at: current.retry_at
        };
      }
      const base = await deps.resolveBase({ force: true });
      if (!base.ok) {
        const failure = {
          reason: `base_unresolved:${base.step}`,
          detail: base.detail
        };
        return base.step === 'fetch' && !String(base.detail).includes('auth')
          ? retry(current, failure, 'base_sync')
          : terminal(current, failure.reason, failure.detail, 'base_sync');
      }
      if (base.base !== input.target_base) {
        return terminal(current, 'target_base_mismatch', null, 'base_sync');
      }
      const target_remote = await remoteUrl(base.remote);
      if (target_remote === null) {
        return retry(
          current,
          { reason: 'remote_url_unavailable' },
          'base_sync'
        );
      }

      if (current.stage === 'complete') {
        const validated = validateStoredReceipt(current, target_remote);
        if (!validated.ok) {
          return { ok: false, pending: false, reason: validated.reason };
        }
        if (!(await contains(input.merged_floor_sha, current.candidate_sha))) {
          return {
            ok: false,
            pending: false,
            reason: 'merged_floor_not_ancestor'
          };
        }
        return {
          ok: true,
          status: 'reused',
          candidate_sha: current.candidate_sha,
          receipt_path: current.receipt_path,
          receipt_digest: current.receipt_digest
        };
      }

      for (const source of Object.values(
        deps.store.snapshot(deps.workspace).reconcile
      )) {
        if (
          source.bead_id === current.bead_id ||
          source.stage !== 'complete' ||
          source.target_base !== input.target_base ||
          source.candidate_sha === null ||
          source.adapter === null
        ) {
          continue;
        }
        const validated = validateStoredReceipt(source, target_remote);
        if (
          !validated.ok ||
          !(await contains(input.merged_floor_sha, source.candidate_sha))
        ) {
          continue;
        }
        deps.store.advanceReconcile(deps.workspace, {
          bead_id: current.bead_id,
          attempt_id: current.attempt_id,
          stage: 'readback',
          candidate_sha: source.candidate_sha,
          adapter: source.adapter
        });
        onStage({
          bead_id: current.bead_id,
          stage: 'readback',
          adapter: source.adapter
        });
        deps.store.completeReconcile(deps.workspace, {
          bead_id: current.bead_id,
          attempt_id: current.attempt_id,
          receipt_path: source.receipt_path,
          receipt_digest: source.receipt_digest,
          receipt_attempt_id: source.receipt_attempt_id || source.attempt_id,
          receipt_floor_sha: source.receipt_floor_sha || source.merged_floor_sha
        });
        onStage({
          bead_id: current.bead_id,
          stage: 'complete',
          adapter: source.adapter
        });
        return {
          ok: true,
          status: 'reused',
          candidate_sha: source.candidate_sha,
          receipt_path: source.receipt_path,
          receipt_digest: source.receipt_digest
        };
      }

      const candidate_sha = current.candidate_sha || base.base_oid;
      if (!(await contains(input.merged_floor_sha, candidate_sha))) {
        return terminal(current, 'merged_floor_not_ancestor');
      }
      const deploy = await deps.resolveDeploy({
        sha: candidate_sha,
        force: true
      });
      if (deploy.state === 'invalid') {
        return terminal(
          current,
          'deploy_config_invalid',
          deploy.detail,
          'deploy'
        );
      }
      const adapter =
        deploy.state === 'resolved'
          ? deploy.value.adapter || 'workspace'
          : 'workspace';
      if (current.candidate_sha === null || current.adapter === null) {
        const advanced = deps.store.advanceReconcile(deps.workspace, {
          bead_id: current.bead_id,
          attempt_id: current.attempt_id,
          stage: 'pinned',
          candidate_sha,
          adapter
        });
        if (!advanced.ok) {
          return terminal(current, 'reconcile_state_conflict');
        }
      } else if (
        current.candidate_sha !== candidate_sha ||
        current.adapter !== adapter
      ) {
        return terminal(current, 'reconcile_state_conflict');
      }
      current = deps.store.snapshot(deps.workspace).reconcile[input.bead_id];
      onStage({ bead_id: current.bead_id, stage: 'pinned', adapter });

      const receipt_path = deploymentReceiptPath(deps.repo, current.attempt_id);
      const expected_source_path =
        adapter === 'managed'
          ? releasePath(deps.repo, candidate_sha)
          : path.resolve(deps.repo);
      const existing_receipt = validateDeploymentReceipt({
        fs: fs_impl,
        receipt_path,
        repo: deps.repo,
        target_remote,
        target_base: input.target_base,
        attempt_id: current.attempt_id,
        merged_floor_sha: current.merged_floor_sha,
        candidate_sha,
        source_path: expected_source_path
      });
      if (existing_receipt.ok) {
        deps.store.advanceReconcile(deps.workspace, {
          bead_id: current.bead_id,
          attempt_id: current.attempt_id,
          stage: 'readback'
        });
        onStage({ bead_id: current.bead_id, stage: 'readback', adapter });
        const workspace_no_deploy =
          adapter === 'workspace' &&
          existing_receipt.receipt.action_outcomes.some(
            (/** @type {any} */ outcome) =>
              outcome.action === 'workspace_no_deploy'
          );
        const completed = deps.store.completeReconcile(deps.workspace, {
          bead_id: current.bead_id,
          attempt_id: current.attempt_id,
          receipt_path,
          receipt_digest: existing_receipt.digest,
          mirror_last_deploy: !workspace_no_deploy
        });
        if (!completed.ok) {
          return terminal(current, 'reconcile_complete_failed', null, 'deploy');
        }
        onStage({ bead_id: current.bead_id, stage: 'complete', adapter });
        return {
          ok: true,
          status: 'recovered',
          candidate_sha,
          base_sync: null,
          receipt_path,
          receipt_digest: existing_receipt.digest
        };
      }
      if (existing_receipt.reason !== 'receipt_missing') {
        return terminal(
          current,
          existing_receipt.reason,
          existing_receipt.detail || null,
          'deploy'
        );
      }

      /** @type {string|null} */
      let base_sync = null;
      if (typeof deps.prepareCandidate === 'function') {
        const prepared = await deps.prepareCandidate({
          bead_id: current.bead_id,
          candidate_sha,
          target_base: input.target_base,
          adapter
        });
        if (!prepared.ok) {
          const failed = terminal(
            current,
            prepared.reason || 'candidate_prepare_failed',
            prepared.detail || null,
            'base_sync',
            {
              base_sync: prepared.base_sync || null,
              ...(typeof prepared.output_tail === 'string'
                ? { output_tail: prepared.output_tail }
                : {}),
              ...(typeof prepared.log_path === 'string'
                ? { log_path: prepared.log_path }
                : {})
            }
          );
          return failed;
        }
        base_sync = prepared.base_sync || null;
      }

      /** @type {string} */
      let source_path = expected_source_path;
      if (adapter === 'managed') {
        if (base.remote === null) {
          return terminal(current, 'managed_remote_required', null, 'deploy');
        }
        const materialized = await materializeManaged({
          repo: deps.repo,
          target_base: input.target_base,
          candidate_sha,
          remote_url: target_remote,
          gitRun: deps.gitRun,
          fs: fs_impl
        });
        if (!materialized.ok) {
          return materialized.retryable
            ? retry(current, materialized, 'deploy')
            : terminal(
                current,
                materialized.reason,
                materialized.detail || null,
                'deploy',
                { base_sync }
              );
        }
        source_path = materialized.release_path;
      }

      deps.store.advanceReconcile(deps.workspace, {
        bead_id: current.bead_id,
        attempt_id: current.attempt_id,
        stage: 'verifying'
      });
      onStage({ bead_id: current.bead_id, stage: 'verifying', adapter });
      const verified = await deps.verifyCandidate({
        bead_id: current.bead_id,
        candidate_sha,
        source_path,
        adapter
      });
      if (!verified.ok) {
        return terminal(
          current,
          verified.reason || 'verify_failed',
          verified.detail || null,
          'post_merge_verify',
          {
            base_sync,
            ...(typeof verified.output_tail === 'string'
              ? { output_tail: verified.output_tail }
              : {}),
            ...(typeof verified.log_path === 'string'
              ? { log_path: verified.log_path }
              : {})
          }
        );
      }

      deps.store.advanceReconcile(deps.workspace, {
        bead_id: current.bead_id,
        attempt_id: current.attempt_id,
        stage: 'deploying'
      });
      onStage({ bead_id: current.bead_id, stage: 'deploying', adapter });
      /** @type {any} */
      let deployed;
      if (adapter === 'managed') {
        if (deploy.state !== 'resolved') {
          return terminal(current, 'deploy_missing', null, 'deploy');
        }
        deployed = await runManagedAdapter({
          cmd: deploy.value.cmd,
          timeout_ms: deploy.value.timeout_ms,
          release_path: source_path,
          receipt_path,
          attempt_id: current.attempt_id,
          merged_floor_sha: current.merged_floor_sha,
          candidate_sha,
          env: {
            BDUI_DEPLOY_PROTOCOL_VERSION: '1',
            BDUI_DEPLOY_SOURCE_REPO: path.resolve(deps.repo),
            BDUI_DEPLOY_TARGET_REMOTE: target_remote,
            BDUI_DEPLOY_TARGET_BASE: input.target_base,
            BDUI_DEPLOY_MERGED_FLOOR_SHA: current.merged_floor_sha,
            BDUI_DEPLOY_CANDIDATE_SHA: candidate_sha,
            BDUI_DEPLOY_RELEASE_PATH: source_path,
            BDUI_DEPLOY_RECEIPT_PATH: receipt_path,
            BDUI_DEPLOY_ATTEMPT_ID: current.attempt_id
          }
        });
      } else {
        deployed = await deps.runWorkspaceAdapter({
          bead_id: current.bead_id,
          attempt_id: current.attempt_id,
          target_base: input.target_base,
          merged_floor_sha: current.merged_floor_sha,
          candidate_sha,
          source_path
        });
        if (deployed.ok && deployed.pending === true) {
          return {
            ok: true,
            status: 'detached_pending',
            candidate_sha,
            base_sync,
            pending_deploy: deployed.pending_deploy
          };
        }
        if (deployed.ok) {
          writeJsonAtomic(
            fs_impl,
            receipt_path,
            createDeploymentReceipt({
              repo: deps.repo,
              target_remote,
              target_base: input.target_base,
              attempt_id: current.attempt_id,
              merged_floor_sha: current.merged_floor_sha,
              candidate_sha,
              source_path,
              previous_marker: deployed.previous_marker,
              action_outcomes: deployed.action_outcomes
            })
          );
        }
      }
      if (!deployed.ok) {
        return deployed.retryable
          ? retry(current, deployed, 'deploy')
          : terminal(
              current,
              deployed.reason || 'adapter_failed',
              deployed.detail || null,
              'deploy',
              {
                base_sync,
                ...(typeof deployed.output_tail === 'string'
                  ? { output_tail: deployed.output_tail }
                  : {}),
                ...(typeof deployed.log_path === 'string'
                  ? { log_path: deployed.log_path }
                  : {})
              }
            );
      }

      deps.store.advanceReconcile(deps.workspace, {
        bead_id: current.bead_id,
        attempt_id: current.attempt_id,
        stage: 'readback'
      });
      onStage({ bead_id: current.bead_id, stage: 'readback', adapter });
      const receipt = validateDeploymentReceipt({
        fs: fs_impl,
        receipt_path,
        repo: deps.repo,
        target_remote,
        target_base: input.target_base,
        attempt_id: current.attempt_id,
        merged_floor_sha: current.merged_floor_sha,
        candidate_sha,
        source_path
      });
      if (!receipt.ok) {
        return terminal(
          current,
          receipt.reason,
          receipt.detail || null,
          'deploy'
        );
      }
      const completed = deps.store.completeReconcile(deps.workspace, {
        bead_id: current.bead_id,
        attempt_id: current.attempt_id,
        receipt_path,
        receipt_digest: receipt.digest,
        mirror_last_deploy:
          adapter !== 'workspace' || deployed.deployed !== false
      });
      if (!completed.ok) {
        return terminal(current, 'reconcile_complete_failed', null, 'deploy');
      }
      onStage({ bead_id: current.bead_id, stage: 'complete', adapter });
      return {
        ok: true,
        status: 'complete',
        candidate_sha,
        base_sync,
        receipt_path,
        receipt_digest: receipt.digest
      };
    } finally {
      release_lock();
    }
  }

  return { reconcile };
}
