#!/usr/bin/env node
import { spawn, spawnSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  candidateInstallMarkerPath,
  managedJournalPath,
  runtimePointerPath
} from '../server/worker/deployment-paths.js';
import {
  advanceManagedState,
  createPreparedState,
  cutoverPointer,
  inspectManagedPointer,
  readManagedState,
  readPrivateJsonFile,
  validateManagedBinding,
  validateManagedRelease,
  writePrivateJsonAtomic
} from '../server/worker/managed-state.js';
import { createProcessController } from '../server/worker/process-controller.js';

const HELPER_ACK_TIMEOUT_MS = 15_000;
const HELPER_ACK_POLL_MS = 25;
const HANDOFF_TIMEOUT_MS = 600_000;
const HANDOFF_POLL_MS = 100;
const SAFE_ENV_KEYS = [
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
  'XDG_STATE_HOME',
  'BDUI_DEPLOY_PROTOCOL_VERSION',
  'BDUI_DEPLOY_SOURCE_REPO',
  'BDUI_DEPLOY_TARGET_REMOTE',
  'BDUI_DEPLOY_TARGET_BASE',
  'BDUI_DEPLOY_MERGED_FLOOR_SHA',
  'BDUI_DEPLOY_CANDIDATE_SHA',
  'BDUI_DEPLOY_RELEASE_PATH',
  'BDUI_DEPLOY_RECEIPT_PATH',
  'BDUI_DEPLOY_ATTEMPT_ID'
];
const ACK_STAGES = new Set([
  'restart_prerecorded',
  'restart_committed',
  'restart_launched'
]);

/**
 * @typedef {Object} Binding
 * @property {number} protocol_version
 * @property {string} repo
 * @property {string} target_remote
 * @property {string} target_base
 * @property {string} merged_floor_sha
 * @property {string} attempt_id
 * @property {string} candidate_sha
 * @property {string} release_path
 * @property {string} receipt_path
 * @property {string} pointer_path
 * @property {string} pointer_target
 */

/**
 * @param {unknown} value
 */
function isRecord(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @param {number} delay_ms
 */
function delay(delay_ms) {
  return new Promise((resolve) => setTimeout(resolve, delay_ms));
}

/**
 * @param {string} file
 */
function fileDigest(file) {
  return crypto
    .createHash('sha256')
    .update(fs.readFileSync(file))
    .digest('hex');
}

/**
 * @param {unknown} input
 */
function validHelper(input) {
  if (!isRecord(input)) {
    return false;
  }
  const value = /** @type {any} */ (input);
  return (
    Number.isInteger(value.pid) &&
    value.pid > 0 &&
    Number.isInteger(value.pgid) &&
    value.pgid > 0 &&
    Number.isFinite(value.started_at) &&
    value.started_at >= 0
  );
}

/**
 * @param {Record<string, string|undefined>} environment
 */
function helperEnvironment(environment) {
  /** @type {Record<string, string>} */
  const result = {};
  for (const key of SAFE_ENV_KEYS) {
    const value = environment[key];
    if (typeof value === 'string') {
      result[key] = value;
    }
  }
  return result;
}

/**
 * @param {Record<string, string|undefined>} environment
 * @param {string} [pointer_path]
 * @returns {{ ok: true, binding: Binding }|{ ok: false, reason: string }}
 */
export function bindingFromEnv(
  environment,
  pointer_path = runtimePointerPath()
) {
  for (const key of ['XDG_DATA_HOME', 'XDG_STATE_HOME']) {
    const value = environment[key];
    if (
      typeof value === 'string' &&
      value.trim().length > 0 &&
      !path.isAbsolute(value)
    ) {
      return { ok: false, reason: 'environment_path_invalid' };
    }
  }
  const binding = /** @type {Binding} */ ({
    protocol_version: Number(environment.BDUI_DEPLOY_PROTOCOL_VERSION),
    repo: String(environment.BDUI_DEPLOY_SOURCE_REPO || ''),
    target_remote: environment.BDUI_DEPLOY_TARGET_REMOTE,
    target_base: environment.BDUI_DEPLOY_TARGET_BASE,
    merged_floor_sha: environment.BDUI_DEPLOY_MERGED_FLOOR_SHA,
    attempt_id: environment.BDUI_DEPLOY_ATTEMPT_ID,
    candidate_sha: environment.BDUI_DEPLOY_CANDIDATE_SHA,
    release_path: String(environment.BDUI_DEPLOY_RELEASE_PATH || ''),
    receipt_path: String(environment.BDUI_DEPLOY_RECEIPT_PATH || ''),
    pointer_path,
    pointer_target: String(environment.BDUI_DEPLOY_RELEASE_PATH || '')
  });
  const validated = validateManagedBinding(binding);
  if (!validated.ok) {
    return { ok: false, reason: validated.reason || 'binding_invalid' };
  }
  return { ok: true, binding };
}

/**
 * @param {string[]} args
 * @param {{ cwd: string }} options
 */
function defaultRunGit(args, options) {
  const result = spawnSync('git', args, {
    cwd: options.cwd,
    encoding: 'utf8'
  });
  return {
    code: typeof result.status === 'number' ? result.status : 1,
    stdout: String(result.stdout || ''),
    stderr: String(result.stderr || result.error?.message || '')
  };
}

/**
 * @param {{ cmd: string, args: string[], cwd: string }} command
 */
async function defaultRunInstall(command) {
  const result = spawnSync(command.cmd, command.args, {
    cwd: command.cwd,
    stdio: 'inherit'
  });
  if (result.status !== 0) {
    throw new Error('managed_install_failed');
  }
}

/**
 * @param {Binding} binding
 * @param {(args: string[], options: { cwd: string }) => Promise<{ code: number, stdout: string, stderr: string }>|{ code: number, stdout: string, stderr: string }} runGit
 * @returns {Promise<{ ok: true, release_realpath: string, lockfile: string, lockfile_sha256: string }|{ ok: false, reason: string }>}
 */
async function verifyCandidate(binding, runGit) {
  const contained = validateManagedRelease(binding);
  if (!contained.ok) {
    return contained;
  }
  let head;
  let status;
  let remote;
  let floor;
  try {
    [head, status, remote, floor] = await Promise.all([
      runGit(['rev-parse', 'HEAD'], { cwd: binding.release_path }),
      runGit(['status', '--porcelain', '--untracked-files=no'], {
        cwd: binding.release_path
      }),
      runGit(['remote', 'get-url', 'origin'], {
        cwd: binding.release_path
      }),
      runGit(
        [
          'merge-base',
          '--is-ancestor',
          binding.merged_floor_sha,
          binding.candidate_sha
        ],
        { cwd: binding.release_path }
      )
    ]);
  } catch {
    return { ok: false, reason: 'candidate_git_failed' };
  }
  if (head.code !== 0 || head.stdout.trim() !== binding.candidate_sha) {
    return { ok: false, reason: 'candidate_head_mismatch' };
  }
  if (status.code !== 0 || status.stdout.trim().length > 0) {
    return { ok: false, reason: 'candidate_status_dirty' };
  }
  if (remote.code !== 0 || remote.stdout.trim() !== binding.target_remote) {
    return { ok: false, reason: 'candidate_remote_mismatch' };
  }
  if (floor.code !== 0) {
    return { ok: false, reason: 'candidate_floor_mismatch' };
  }
  const lockfile = path.join(binding.release_path, 'package-lock.json');
  try {
    const lock_stat = fs.lstatSync(lockfile);
    if (!lock_stat.isFile() || lock_stat.isSymbolicLink()) {
      return { ok: false, reason: 'lockfile_invalid' };
    }
  } catch {
    return { ok: false, reason: 'lockfile_missing' };
  }
  return {
    ok: true,
    release_realpath: contained.release_realpath,
    lockfile,
    lockfile_sha256: fileDigest(lockfile)
  };
}

/**
 * @param {string} node_modules
 */
function validNodeModules(node_modules) {
  try {
    const stat = fs.lstatSync(node_modules);
    return stat.isDirectory() && !stat.isSymbolicLink();
  } catch {
    return false;
  }
}

/**
 * @param {any} marker
 * @param {Binding} binding
 * @param {string} release_realpath
 * @param {string} lockfile_sha256
 */
function markerMatches(marker, binding, release_realpath, lockfile_sha256) {
  return (
    marker.protocol_version === 1 &&
    marker.candidate_sha === binding.candidate_sha &&
    marker.release_path === binding.release_path &&
    marker.release_realpath === release_realpath &&
    marker.lockfile_sha256 === lockfile_sha256
  );
}

/**
 * @param {string} marker_path
 * @param {boolean} allow_absent
 */
function validInstallMarkerParent(marker_path, allow_absent) {
  try {
    const marker_parent = fs.lstatSync(path.dirname(marker_path));
    return (
      marker_parent.isDirectory() &&
      !marker_parent.isSymbolicLink() &&
      (marker_parent.mode & 0o077) === 0
    );
  } catch (error) {
    return Boolean(
      allow_absent &&
      isRecord(error) &&
      /** @type {any} */ (error).code === 'ENOENT'
    );
  }
}

/**
 * @param {{ binding: Binding, release_realpath: string, lockfile: string, lockfile_sha256: string, marker_path: string, runInstall: (command: { cmd: string, args: string[], cwd: string }) => Promise<void> }} input
 */
async function ensureInstall(input) {
  const node_modules = path.join(input.binding.release_path, 'node_modules');
  if (!validInstallMarkerParent(input.marker_path, true)) {
    return { ok: false, reason: 'install_marker_invalid' };
  }
  const existing = readPrivateJsonFile(input.marker_path);
  if (existing.ok) {
    if (
      markerMatches(
        existing.value,
        input.binding,
        input.release_realpath,
        input.lockfile_sha256
      ) &&
      validNodeModules(node_modules) &&
      validInstallMarkerParent(input.marker_path, false)
    ) {
      return { ok: true, reused: true };
    }
    return { ok: false, reason: 'install_marker_invalid' };
  }
  if (existing.reason !== 'private_json_absent') {
    return { ok: false, reason: 'install_marker_invalid' };
  }
  try {
    await input.runInstall({
      cmd: 'npm',
      args: ['ci', '--omit=dev'],
      cwd: input.binding.release_path
    });
  } catch {
    return { ok: false, reason: 'install_failed' };
  }
  if (
    !validNodeModules(node_modules) ||
    fileDigest(input.lockfile) !== input.lockfile_sha256
  ) {
    return { ok: false, reason: 'install_readback_failed' };
  }
  const marker = {
    protocol_version: 1,
    candidate_sha: input.binding.candidate_sha,
    release_path: input.binding.release_path,
    release_realpath: input.release_realpath,
    lockfile_sha256: input.lockfile_sha256
  };
  try {
    writePrivateJsonAtomic(input.marker_path, marker);
  } catch {
    return { ok: false, reason: 'install_marker_write_failed' };
  }
  const readback = readPrivateJsonFile(input.marker_path);
  if (
    !validInstallMarkerParent(input.marker_path, false) ||
    !readback.ok ||
    !markerMatches(
      readback.value,
      input.binding,
      input.release_realpath,
      input.lockfile_sha256
    )
  ) {
    return { ok: false, reason: 'install_marker_readback_failed' };
  }
  return { ok: true, reused: false };
}

/**
 * @param {any} current
 * @param {Binding} binding
 * @param {() => string} token
 */
function rollover(current, binding, token) {
  return advanceManagedState({
    journal_path: current.journal_path,
    expected_revision: current.revision,
    expected_digest: current.digest,
    state: {
      ...createPreparedState(binding, token()),
      generation: current.state.generation + 1
    }
  });
}

/**
 * @param {any} state
 * @param {number} generation
 * @param {string} launch_token
 * @param {number} helper_pid
 */
function matchesAck(state, generation, launch_token, helper_pid) {
  return (
    isRecord(state) &&
    ACK_STAGES.has(state.stage) &&
    state.generation === generation &&
    state.launch_token === launch_token &&
    validHelper(state.helper) &&
    state.helper.pid === helper_pid
  );
}

/**
 * @param {{ journal_path: string, binding: Binding, generation: number, launch_token: string, helper_pid: number, timeout_ms?: number, poll_ms?: number }} input
 */
async function defaultWaitForAck(input) {
  const deadline = Date.now() + (input.timeout_ms ?? HELPER_ACK_TIMEOUT_MS);
  while (Date.now() < deadline) {
    const current = readManagedState({
      journal_path: input.journal_path,
      binding: input.binding
    });
    if (!current.ok) {
      return { ack_error: current.reason };
    }
    if (
      matchesAck(
        current.state,
        input.generation,
        input.launch_token,
        input.helper_pid
      )
    ) {
      return current.state;
    }
    if (
      current.state.generation !== input.generation ||
      current.state.launch_token !== input.launch_token
    ) {
      return null;
    }
    await delay(input.poll_ms ?? HELPER_ACK_POLL_MS);
  }
  return null;
}

/**
 * @param {{ journal_path: string, binding: Binding, generation: number, launch_token: string, helper: any, parent_pid: number, process_controller: any, timeout_ms?: number, poll_ms?: number, readState?: typeof readManagedState, currentParent?: () => number, now?: () => number, wait?: (delay_ms: number) => Promise<void> }} input
 */
export async function waitForRestartHandoff(input) {
  const readState = input.readState || readManagedState;
  const currentParent = input.currentParent || (() => process.ppid);
  const now = input.now || Date.now;
  const wait = input.wait || delay;
  const deadline = now() + (input.timeout_ms ?? HANDOFF_TIMEOUT_MS);
  while (now() < deadline) {
    if (currentParent() !== input.parent_pid) {
      return { state: 'parent_exited' };
    }
    const current = readState({
      journal_path: input.journal_path,
      binding: input.binding
    });
    if (!current.ok) {
      return { state: 'unknown', reason: current.reason };
    }
    if (
      current.state.generation !== input.generation ||
      current.state.launch_token !== input.launch_token
    ) {
      return { state: 'fenced', current: current.state };
    }
    if (current.state.stage === 'restart_prerecorded') {
      const observed = input.process_controller.probe(current.state.helper);
      if (observed.state === 'unknown') {
        return {
          state: 'unknown',
          reason: observed.reason || 'helper_identity_unknown'
        };
      }
      if (observed.state === 'gone' || observed.state === 'recycled') {
        const confirmed = readState({
          journal_path: input.journal_path,
          binding: input.binding
        });
        if (!confirmed.ok) {
          return { state: 'unknown', reason: confirmed.reason };
        }
        if (
          confirmed.revision === current.revision &&
          confirmed.digest === current.digest &&
          confirmed.state.stage === 'restart_prerecorded'
        ) {
          return { state: 'precommit_gone', current: confirmed.state };
        }
        continue;
      }
      if (observed.state !== 'owned') {
        return { state: 'unknown', reason: 'helper_identity_unknown' };
      }
    } else if (current.state.stage === 'restart_launched') {
      if (current.state.result?.outcome === 'failure') {
        return { state: 'postcommit_failure', current: current.state };
      }
    } else if (current.state.stage !== 'restart_committed') {
      return { state: 'unknown', reason: 'handoff_stage_invalid' };
    }
    await wait(input.poll_ms ?? HANDOFF_POLL_MS);
  }
  return { state: 'unknown', reason: 'restart_handoff_timeout' };
}

/**
 * @param {any} input
 * @param {any} state
 * @param {{ journal_path: string, binding: Binding, process_controller: any }} context
 */
async function awaitExistingHandoff(input, state, context) {
  const parent_pid = input.parent_pid ?? process.ppid;
  let outcome;
  if (input.waitForParentExit) {
    await input.waitForParentExit({ parent_pid });
    outcome = { state: 'parent_exited' };
  } else {
    const waitForHandoff = input.waitForHandoff || waitForRestartHandoff;
    outcome = await waitForHandoff({
      journal_path: context.journal_path,
      binding: context.binding,
      generation: state.generation,
      launch_token: state.launch_token,
      helper: state.helper,
      parent_pid,
      process_controller: context.process_controller
    });
  }
  if (outcome.state === 'precommit_gone') {
    return {
      ok: false,
      status: 'retryable',
      reason: 'helper_precommit_gone',
      state: outcome.current || state
    };
  }
  if (outcome.state === 'postcommit_failure') {
    return {
      ok: false,
      status: 'awaiting_runtime',
      reason: 'restart_effect_failed',
      state: outcome.current || state
    };
  }
  if (outcome.state !== 'parent_exited') {
    return {
      ok: false,
      status: 'awaiting_runtime',
      reason: outcome.reason || 'restart_handoff_unknown',
      state: outcome.current || state
    };
  }
  return {
    ok: false,
    status: 'awaiting_runtime',
    reason: 'restart_handoff_pending',
    state
  };
}

/**
 * @param {any} input
 * @returns {Promise<any>}
 */
export async function runAdapter(input = {}) {
  const environment = input.env || process.env;
  const parsed = bindingFromEnv(environment, runtimePointerPath());
  if (!parsed.ok) {
    return parsed;
  }
  const binding = parsed.binding;
  const runGit = input.runGit || defaultRunGit;
  const verified = await verifyCandidate(binding, runGit);
  if (!verified.ok) {
    return verified;
  }
  const current_pointer = inspectManagedPointer(binding);
  if (!current_pointer.ok) {
    return current_pointer;
  }
  const journal_path = managedJournalPath(binding.repo, binding.attempt_id);
  const marker_path = candidateInstallMarkerPath(
    binding.repo,
    binding.candidate_sha
  );
  let current = readManagedState({ journal_path, binding });
  if (!current.ok && current.reason !== 'state_absent') {
    return current;
  }
  if (
    current.ok &&
    (current.state.stage === 'restart_committed' ||
      current.state.stage === 'restart_launched')
  ) {
    return { ok: false, status: 'awaiting_runtime', state: current.state };
  }
  const process_controller =
    input.processController || createProcessController();
  if (current.ok && current.state.stage === 'restart_prerecorded') {
    const observed = process_controller.probe(current.state.helper);
    if (observed.state === 'owned') {
      return await awaitExistingHandoff(input, current.state, {
        journal_path,
        binding,
        process_controller
      });
    }
    if (observed.state === 'unknown') {
      return {
        ok: false,
        reason: observed.reason || 'helper_identity_unknown'
      };
    }
    if (observed.state !== 'gone' && observed.state !== 'recycled') {
      return { ok: false, reason: 'helper_identity_unknown' };
    }
  }
  const installed = await ensureInstall({
    binding,
    release_realpath: verified.release_realpath,
    lockfile: verified.lockfile,
    lockfile_sha256: verified.lockfile_sha256,
    marker_path,
    runInstall: input.runInstall || defaultRunInstall
  });
  if (!installed.ok) {
    return installed;
  }
  const install_readback = await verifyCandidate(binding, runGit);
  if (!install_readback.ok) {
    return install_readback;
  }
  if (
    install_readback.release_realpath !== verified.release_realpath ||
    install_readback.lockfile_sha256 !== verified.lockfile_sha256
  ) {
    return { ok: false, reason: 'install_candidate_readback_failed' };
  }
  const token = input.randomToken || (() => crypto.randomUUID());
  let prepared = null;
  let created_here = false;
  for (let attempt = 0; attempt < 6; attempt += 1) {
    current = readManagedState({ journal_path, binding });
    if (!current.ok && current.reason === 'state_absent') {
      const advanced = advanceManagedState({
        journal_path,
        expected_revision: 0,
        expected_digest: null,
        state: createPreparedState(binding, token())
      });
      if (!advanced.ok && advanced.reason === 'claim_conflict') {
        continue;
      }
      if (!advanced.ok) {
        return advanced;
      }
      prepared = advanced;
      created_here = true;
      break;
    }
    if (!current.ok) {
      return current;
    }
    if (
      current.state.stage === 'restart_committed' ||
      current.state.stage === 'restart_launched'
    ) {
      return { ok: false, status: 'awaiting_runtime', state: current.state };
    }
    if (current.state.stage === 'restart_prerecorded') {
      const observed = process_controller.probe(current.state.helper);
      if (observed.state === 'owned') {
        return await awaitExistingHandoff(input, current.state, {
          journal_path,
          binding,
          process_controller
        });
      }
      if (observed.state === 'unknown') {
        return {
          ok: false,
          reason: observed.reason || 'helper_identity_unknown'
        };
      }
      if (observed.state !== 'gone' && observed.state !== 'recycled') {
        return { ok: false, reason: 'helper_identity_unknown' };
      }
    }
    const rolled = rollover({ ...current, journal_path }, binding, token);
    if (!rolled.ok && rolled.reason === 'claim_conflict') {
      continue;
    }
    if (!rolled.ok) {
      return rolled;
    }
    prepared = rolled;
    break;
  }
  if (!prepared) {
    return { ok: false, reason: 'state_contention' };
  }
  if (!created_here && prepared.state.stage !== 'prepared') {
    return { ok: false, reason: 'prepared_state_invalid' };
  }
  const pointer = cutoverPointer({
    binding,
    journal_path,
    expected_revision: prepared.revision,
    expected_digest: prepared.digest
  });
  if (!pointer.ok) {
    return pointer;
  }
  const helper_path = path.resolve(fileURLToPath(import.meta.url));
  const helper_args = [
    helper_path,
    '--restart-helper',
    '--generation',
    String(prepared.state.generation),
    '--launch-token',
    prepared.state.launch_token
  ];
  const spawnHelper =
    input.spawnHelper ||
    ((
      /** @type {{ executable: string, args: string[], cwd: string, env: NodeJS.ProcessEnv, detached: boolean, stdio: 'ignore' }} */ command
    ) =>
      spawn(command.executable, command.args, {
        cwd: command.cwd,
        env: command.env,
        detached: command.detached,
        stdio: command.stdio
      }));
  let spawned;
  try {
    spawned = spawnHelper({
      executable: process.execPath,
      args: helper_args,
      cwd: binding.release_path,
      env: helperEnvironment(environment),
      detached: true,
      stdio: 'ignore'
    });
  } catch {
    return { ok: false, status: 'retryable', reason: 'helper_spawn_failed' };
  }
  if (!spawned || !Number.isInteger(spawned.pid) || spawned.pid <= 0) {
    return { ok: false, status: 'retryable', reason: 'helper_spawn_failed' };
  }
  if (typeof spawned.unref === 'function') {
    spawned.unref();
  }
  const waitForAck = input.waitForAck || defaultWaitForAck;
  const ack = await waitForAck({
    journal_path,
    binding,
    generation: prepared.state.generation,
    launch_token: prepared.state.launch_token,
    helper_pid: spawned.pid
  });
  if (isRecord(ack) && typeof ack.ack_error === 'string') {
    return { ok: false, reason: ack.ack_error };
  }
  if (
    !matchesAck(
      ack,
      prepared.state.generation,
      prepared.state.launch_token,
      spawned.pid
    )
  ) {
    return {
      ok: false,
      status: 'retryable',
      reason: 'helper_ack_missing',
      state: prepared.state
    };
  }
  return await awaitExistingHandoff(input, ack, {
    journal_path,
    binding,
    process_controller
  });
}

/**
 * @param {Binding} binding
 */
function pointerMatches(binding) {
  const contained = validateManagedRelease(binding);
  if (!contained.ok) {
    return false;
  }
  try {
    const pointer_stat = fs.lstatSync(binding.pointer_path);
    return (
      pointer_stat.isSymbolicLink() &&
      fs.realpathSync(binding.pointer_path) === contained.release_realpath
    );
  } catch {
    return false;
  }
}

/**
 * @param {unknown} error
 */
function restartFailureDetail(error) {
  if (!isRecord(error)) {
    return 'restart_failed';
  }
  const value = /** @type {any} */ (error);
  const raw_code =
    typeof value.code === 'string' || typeof value.code === 'number'
      ? String(value.code)
      : '';
  const code = raw_code.replace(/[^A-Za-z0-9._-]/g, '').slice(0, 128);
  return code ? `restart_failed:${code}` : 'restart_failed';
}

/**
 * @param {{ journal_path: string, binding: Binding, expected_generation: number, expected_launch_token: string, identity: { pid: number, pgid: number, started_at: number }, restart: () => Promise<void> }} input
 */
export async function runRestartHelper(input) {
  if (!validHelper(input.identity) || !pointerMatches(input.binding)) {
    return { ok: false, reason: 'helper_binding_invalid' };
  }
  const current = readManagedState({
    journal_path: input.journal_path,
    binding: input.binding
  });
  if (!current.ok) {
    return current;
  }
  if (
    current.state.stage !== 'prepared' ||
    current.state.generation !== input.expected_generation ||
    current.state.launch_token !== input.expected_launch_token
  ) {
    return { ok: false, reason: 'helper_fenced' };
  }
  const prerecord = advanceManagedState({
    journal_path: input.journal_path,
    expected_revision: current.revision,
    expected_digest: current.digest,
    state: {
      ...current.state,
      stage: 'restart_prerecorded',
      helper: input.identity
    }
  });
  if (!prerecord.ok) {
    return prerecord.reason === 'claim_conflict'
      ? { ok: false, reason: 'helper_fenced' }
      : prerecord;
  }
  const prerecord_readback = readManagedState({
    journal_path: input.journal_path,
    binding: input.binding
  });
  if (
    !prerecord_readback.ok ||
    prerecord_readback.state.stage !== 'restart_prerecorded' ||
    prerecord_readback.state.generation !== input.expected_generation ||
    prerecord_readback.state.launch_token !== input.expected_launch_token ||
    !validHelper(prerecord_readback.state.helper) ||
    prerecord_readback.state.helper.pid !== input.identity.pid ||
    prerecord_readback.state.helper.pgid !== input.identity.pgid ||
    prerecord_readback.state.helper.started_at !== input.identity.started_at
  ) {
    return { ok: false, reason: 'helper_prerecord_readback_failed' };
  }
  if (!pointerMatches(input.binding)) {
    return { ok: false, reason: 'helper_pointer_changed' };
  }
  const committed = advanceManagedState({
    journal_path: input.journal_path,
    expected_revision: prerecord_readback.revision,
    expected_digest: prerecord_readback.digest,
    state: { ...prerecord_readback.state, stage: 'restart_committed' }
  });
  if (!committed.ok) {
    return committed;
  }
  const committed_readback = readManagedState({
    journal_path: input.journal_path,
    binding: input.binding
  });
  if (
    !committed_readback.ok ||
    committed_readback.state.stage !== 'restart_committed'
  ) {
    return { ok: false, reason: 'helper_commit_readback_failed' };
  }
  let outcome = 'success';
  let detail;
  try {
    await input.restart();
  } catch (error) {
    outcome = 'failure';
    detail = restartFailureDetail(error);
  }
  const result = {
    invoked: true,
    outcome,
    ...(detail ? { detail } : {})
  };
  const launched = advanceManagedState({
    journal_path: input.journal_path,
    expected_revision: committed_readback.revision,
    expected_digest: committed_readback.digest,
    state: {
      ...committed_readback.state,
      stage: 'restart_launched',
      result
    }
  });
  if (!launched.ok) {
    return launched;
  }
  return outcome === 'success'
    ? { ok: true, stage: 'restart_launched', state: launched.state }
    : {
        ok: false,
        stage: 'restart_launched',
        reason: 'restart_failed',
        state: launched.state
      };
}

/**
 * @param {string[]} args
 * @param {string} name
 */
function optionValue(args, name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

/**
 * @param {string[]} args
 */
export async function main(args) {
  if (!args.includes('--restart-helper')) {
    return (await runAdapter({})).ok ? 0 : 1;
  }
  const parsed = bindingFromEnv(process.env, runtimePointerPath());
  const generation = Number(optionValue(args, '--generation'));
  const launch_token = optionValue(args, '--launch-token');
  if (
    !parsed.ok ||
    !Number.isInteger(generation) ||
    generation < 1 ||
    typeof launch_token !== 'string' ||
    launch_token.length < 8
  ) {
    return 1;
  }
  const controller = createProcessController();
  const captured = controller.capture(process.pid);
  if (!captured.ok) {
    return 1;
  }
  const result = await runRestartHelper({
    journal_path: managedJournalPath(
      parsed.binding.repo,
      parsed.binding.attempt_id
    ),
    binding: parsed.binding,
    expected_generation: generation,
    expected_launch_token: launch_token,
    identity: captured.identity,
    restart: async () => {
      const restarted = spawnSync('bdui-shared', ['restart'], {
        stdio: 'ignore'
      });
      if (restarted.status !== 0) {
        const error = new Error('bdui_shared_restart_failed');
        /** @type {any} */ (error).code = String(
          restarted.status ?? 'spawn_failed'
        );
        throw error;
      }
    }
  });
  return result.ok ? 0 : 1;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  try {
    process.exitCode = await main(process.argv.slice(2));
  } catch {
    process.exitCode = 1;
  }
}
