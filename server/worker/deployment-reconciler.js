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
      reason: 'receipt_missing',
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
 *   action_outcomes?: Record<string, any>[]
 * }} input
 */
function workspaceReceipt(input) {
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
    completed_at: new Date().toISOString()
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
 * @returns {Promise<{ ok: true, release_path: string }|{ ok: false, reason: string, detail?: string, retryable: true }>}
 */
async function materializeRelease(input) {
  const fs_impl = input.fs || nodeFs;
  const release_path = releasePath(input.repo, input.candidate_sha);
  try {
    fs_impl.mkdirSync(release_path, { recursive: true, mode: 0o700 });
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
    const real_root = fs_impl.realpathSync(releaseRoot(input.repo));
    const real_release = fs_impl.realpathSync(release_path);
    const relative = path.relative(real_root, real_release);
    if (
      !isReleasePath(input.repo, release_path) ||
      relative.length === 0 ||
      relative.startsWith('..') ||
      path.isAbsolute(relative) ||
      path.dirname(relative) !== '.'
    ) {
      return {
        ok: false,
        reason: 'release_path_escape',
        retryable: true
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
        env: { ...process.env, ...input.env },
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
 *   verifyCandidate: (input: any) => Promise<any>,
 *   runWorkspaceAdapter: (input: any) => Promise<any>,
 *   materializeManaged?: typeof materializeRelease,
 *   runManagedAdapter?: (input: any) => Promise<any>,
 *   spawnImpl?: typeof spawn,
 *   fs?: typeof import('node:fs'),
 *   now?: () => number,
 *   attemptId?: () => string
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
      return result.code === 0 && result.stdout.trim().length > 0
        ? result.stdout.trim()
        : null;
    } catch {
      return null;
    }
  }

  /**
   * @param {any} current
   * @param {string} reason
   * @param {string|null} detail
   */
  function terminal(current, reason, detail = null) {
    deps.store.failReconcile(deps.workspace, {
      bead_id: current.bead_id,
      attempt_id: current.attempt_id,
      reason,
      detail
    });
    return { ok: false, pending: false, reason, detail };
  }

  /**
   * @param {any} current
   * @param {{ reason: string, detail?: string }} failure
   */
  function retry(current, failure) {
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
      return terminal(updated, failure.reason, failure.detail || null);
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
   * @param {{ bead_id: string, target_base: string, merged_floor_sha: string }} input
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
    const release_lock = await deps.locks.deployLock(deps.repo);
    try {
      let current = deps.store.snapshot(deps.workspace).reconcile[
        input.bead_id
      ];
      if (!current) {
        deps.store.enqueueReconcile(deps.workspace, {
          bead_id: input.bead_id,
          attempt_id: attemptId(),
          target_base: input.target_base,
          merged_floor_sha: input.merged_floor_sha
        });
        current = deps.store.snapshot(deps.workspace).reconcile[input.bead_id];
      }
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
          reason: current.terminal_failure?.reason || 'reconcile_failed'
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
          ? retry(current, failure)
          : terminal(current, failure.reason, failure.detail);
      }
      if (base.base !== input.target_base) {
        return terminal(current, 'target_base_mismatch');
      }
      const target_remote = await remoteUrl(base.remote);
      if (target_remote === null) {
        return retry(current, { reason: 'remote_url_unavailable' });
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
        deps.store.completeReconcile(deps.workspace, {
          bead_id: current.bead_id,
          attempt_id: current.attempt_id,
          receipt_path: source.receipt_path,
          receipt_digest: source.receipt_digest,
          receipt_attempt_id: source.receipt_attempt_id || source.attempt_id,
          receipt_floor_sha: source.receipt_floor_sha || source.merged_floor_sha
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
      if (deploy.state !== 'resolved') {
        return terminal(
          current,
          deploy.state === 'invalid'
            ? `deploy_config_invalid:${deploy.detail}`
            : 'deploy_missing'
        );
      }
      const adapter = deploy.value.adapter || 'workspace';
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

      /** @type {string} */
      let source_path;
      if (adapter === 'managed') {
        if (base.remote === null) {
          return terminal(current, 'managed_remote_required');
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
          return retry(current, materialized);
        }
        source_path = materialized.release_path;
      } else {
        source_path = path.resolve(deps.repo);
      }

      deps.store.advanceReconcile(deps.workspace, {
        bead_id: current.bead_id,
        attempt_id: current.attempt_id,
        stage: 'verifying'
      });
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
          verified.detail || null
        );
      }

      deps.store.advanceReconcile(deps.workspace, {
        bead_id: current.bead_id,
        attempt_id: current.attempt_id,
        stage: 'deploying'
      });
      const receipt_path = deploymentReceiptPath(deps.repo, current.attempt_id);
      /** @type {any} */
      let deployed;
      if (adapter === 'managed') {
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
            pending_deploy: deployed.pending_deploy
          };
        }
        if (deployed.ok) {
          writeJsonAtomic(
            fs_impl,
            receipt_path,
            workspaceReceipt({
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
          ? retry(current, deployed)
          : terminal(
              current,
              deployed.reason || 'adapter_failed',
              deployed.detail || null
            );
      }

      deps.store.advanceReconcile(deps.workspace, {
        bead_id: current.bead_id,
        attempt_id: current.attempt_id,
        stage: 'readback'
      });
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
        return terminal(current, receipt.reason, receipt.detail || null);
      }
      const completed = deps.store.completeReconcile(deps.workspace, {
        bead_id: current.bead_id,
        attempt_id: current.attempt_id,
        receipt_path,
        receipt_digest: receipt.digest
      });
      if (!completed.ok) {
        return terminal(current, 'reconcile_complete_failed');
      }
      return {
        ok: true,
        status: 'complete',
        candidate_sha,
        receipt_path,
        receipt_digest: receipt.digest
      };
    } finally {
      release_lock();
    }
  }

  return { reconcile };
}
