import { spawnSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runtimeMarkerPath } from './worker/deployment-paths.js';
import {
  readPrivateJsonFile,
  writePrivateJsonAtomic
} from './worker/managed-state.js';
import { observeProcessIdentity } from './worker/process-controller.js';

const RUNTIME_KEYS = [
  'protocol_version',
  'pid',
  'process_started_at',
  'started_at',
  'instance_id',
  'source_repo',
  'source_sha',
  'host',
  'port',
  'health_path'
];
const SHA_RE = /^[0-9a-f]{40}$/;
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * @param {unknown} value
 */
function isRecord(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @param {string} source_repo
 */
function defaultReadHead(source_repo) {
  const result = spawnSync('git', ['rev-parse', 'HEAD'], {
    cwd: source_repo,
    encoding: 'utf8'
  });
  if (result.status !== 0) {
    throw new Error('runtime_source_head_unavailable');
  }
  return String(result.stdout || '').trim();
}

/**
 * @param {unknown} input
 */
export function validateRuntimeIdentity(input) {
  if (!isRecord(input)) {
    return false;
  }
  const value = /** @type {any} */ (input);
  if (
    Object.keys(value).length !== RUNTIME_KEYS.length ||
    Object.keys(value).some((key) => !RUNTIME_KEYS.includes(key)) ||
    value.protocol_version !== 1 ||
    !Number.isInteger(value.pid) ||
    value.pid <= 0 ||
    !Number.isFinite(value.process_started_at) ||
    value.process_started_at < 0 ||
    typeof value.started_at !== 'string' ||
    typeof value.instance_id !== 'string' ||
    !UUID_RE.test(value.instance_id) ||
    typeof value.source_repo !== 'string' ||
    !path.isAbsolute(value.source_repo) ||
    path.resolve(value.source_repo) !== value.source_repo ||
    !SHA_RE.test(value.source_sha || '') ||
    typeof value.host !== 'string' ||
    value.host.length === 0 ||
    value.host.length > 255 ||
    /[\0\r\n]/.test(value.host) ||
    !Number.isInteger(value.port) ||
    value.port < 1 ||
    value.port > 65535 ||
    value.health_path !== '/healthz'
  ) {
    return false;
  }
  try {
    return new Date(value.started_at).toISOString() === value.started_at;
  } catch {
    return false;
  }
}

/**
 * Compare two independently produced runtime identities without normalizing or
 * filling fields. Recovery requires the live endpoint to prove the exact
 * process described by the private marker.
 *
 * @param {unknown} left
 * @param {unknown} right
 */
export function runtimeIdentitiesEqual(left, right) {
  if (!validateRuntimeIdentity(left) || !validateRuntimeIdentity(right)) {
    return false;
  }
  const left_value = /** @type {any} */ (left);
  const right_value = /** @type {any} */ (right);
  return RUNTIME_KEYS.every((key) => left_value[key] === right_value[key]);
}

/**
 * @param {{ host: string, port: number, module_url?: string, pid?: number, realpath?: (value: string) => string, readHead?: (source_repo: string) => string, observeProcess?: (pid: number) => any, now?: () => Date, randomUUID?: () => string }} input
 * @returns {{ ok: true, identity: any }|{ ok: false, reason: string }}
 */
export function createRuntimeIdentity(input) {
  const pid = input.pid ?? process.pid;
  const module_url = input.module_url || import.meta.url;
  const realpath = input.realpath || fs.realpathSync;
  const readHead = input.readHead || defaultReadHead;
  const observeProcess = input.observeProcess || observeProcessIdentity;
  const now = input.now || (() => new Date());
  const randomUUID = input.randomUUID || crypto.randomUUID;
  let source_repo;
  let source_sha;
  try {
    source_repo = realpath(
      path.resolve(path.dirname(fileURLToPath(module_url)), '..')
    );
    source_sha = readHead(source_repo).trim();
  } catch {
    return { ok: false, reason: 'runtime_source_unavailable' };
  }
  const observed = observeProcess(pid);
  if (!observed.ok) {
    return { ok: false, reason: observed.reason || 'runtime_process_unknown' };
  }
  let started_at;
  let instance_id;
  try {
    started_at = now().toISOString();
    instance_id = randomUUID();
  } catch {
    return { ok: false, reason: 'runtime_identity_unavailable' };
  }
  const identity = {
    protocol_version: 1,
    pid,
    process_started_at: observed.identity.process_started_at,
    started_at,
    instance_id,
    source_repo,
    source_sha,
    host: input.host,
    port: input.port,
    health_path: '/healthz'
  };
  return validateRuntimeIdentity(identity)
    ? { ok: true, identity }
    : { ok: false, reason: 'runtime_identity_invalid' };
}

/**
 * @param {{ marker_path?: string, identity: any }} input
 * @returns {{ ok: true }|{ ok: false, reason: string }}
 */
export function writeRuntimeMarker(input) {
  if (!validateRuntimeIdentity(input.identity)) {
    return { ok: false, reason: 'runtime_identity_invalid' };
  }
  try {
    writePrivateJsonAtomic(
      input.marker_path || runtimeMarkerPath(),
      input.identity
    );
    return { ok: true };
  } catch {
    return { ok: false, reason: 'runtime_marker_write_failed' };
  }
}

/**
 * @param {string} [marker_path]
 * @returns {{ ok: true, identity: any }|{ ok: false, reason: string }}
 */
export function readRuntimeMarker(marker_path = runtimeMarkerPath()) {
  const readback = readPrivateJsonFile(marker_path);
  if (!readback.ok || !validateRuntimeIdentity(readback.value)) {
    return { ok: false, reason: 'runtime_marker_invalid' };
  }
  return { ok: true, identity: readback.value };
}
