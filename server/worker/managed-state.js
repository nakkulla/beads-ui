/**
 * Durable authority for the managed self-deploy handoff.
 *
 * Immutable revision claims are authoritative. The journal JSON is only a
 * recoverable projection, so a crash between claim publication and projection
 * replacement cannot lose an already-won transition.
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {
  deploymentReceiptPath,
  managedJournalPath,
  releasePath,
  releaseRoot,
  runtimePointerPath
} from './deployment-paths.js';

const PROTOCOL_VERSION = 1;
const MAX_JSON_BYTES = 1024 * 1024;
const SHA_RE = /^[0-9a-f]{40}$/;
const STAGES = new Set([
  'prepared',
  'restart_prerecorded',
  'restart_committed',
  'restart_launched'
]);
const BINDING_KEYS = [
  'protocol_version',
  'repo',
  'target_remote',
  'target_base',
  'merged_floor_sha',
  'attempt_id',
  'candidate_sha',
  'release_path',
  'receipt_path',
  'pointer_path',
  'pointer_target'
];

/**
 * @typedef {Object} HelperIdentity
 * @property {number} pid
 * @property {number} pgid
 * @property {number} started_at
 */

/**
 * @typedef {{ ok: true, revision: number, digest: string|null, state: any }|{ ok: false, reason: string }} ManagedStateRead
 */

/**
 * @param {unknown} value
 */
function isRecord(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @param {string} value
 */
function digest(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

/**
 * @param {string} value
 */
function validRemoteIdentity(value) {
  if (!value.includes('://')) {
    return true;
  }
  try {
    const parsed = new URL(value);
    return (
      (!/^https?:$/i.test(parsed.protocol) || parsed.username.length === 0) &&
      parsed.password.length === 0 &&
      parsed.search.length === 0 &&
      parsed.hash.length === 0
    );
  } catch {
    return false;
  }
}

/**
 * @param {string} directory
 */
function fsyncDirectory(directory) {
  const descriptor = fs.openSync(directory, 'r');
  try {
    fs.fsyncSync(descriptor);
  } finally {
    fs.closeSync(descriptor);
  }
}

/**
 * @param {string} target
 */
function ensurePrivateDirectory(target) {
  fs.mkdirSync(target, { recursive: true, mode: 0o700 });
  const stat = fs.lstatSync(target);
  if (!stat.isDirectory() || stat.isSymbolicLink()) {
    throw new Error('private_directory_invalid');
  }
  fs.chmodSync(target, 0o700);
}

/**
 * @param {string} target
 * @returns {{ ok: true, value: any }|{ ok: false, reason: string }}
 */
export function readPrivateJsonFile(target) {
  let descriptor;
  try {
    descriptor = fs.openSync(
      target,
      fs.constants.O_RDONLY | (fs.constants.O_NOFOLLOW || 0)
    );
  } catch (error) {
    if (isRecord(error) && /** @type {any} */ (error).code === 'ENOENT') {
      return { ok: false, reason: 'private_json_absent' };
    }
    if (isRecord(error) && /** @type {any} */ (error).code === 'ELOOP') {
      return { ok: false, reason: 'private_json_invalid' };
    }
    return { ok: false, reason: 'private_json_unreadable' };
  }
  try {
    const stat = fs.fstatSync(descriptor);
    if (
      !stat.isFile() ||
      stat.size > MAX_JSON_BYTES ||
      (stat.mode & 0o077) !== 0
    ) {
      return { ok: false, reason: 'private_json_invalid' };
    }
    const value = JSON.parse(fs.readFileSync(descriptor, 'utf8'));
    return isRecord(value)
      ? { ok: true, value }
      : { ok: false, reason: 'private_json_invalid' };
  } catch {
    return { ok: false, reason: 'private_json_invalid' };
  } finally {
    fs.closeSync(descriptor);
  }
}

/**
 * @param {string} target
 * @param {unknown} value
 */
export function writePrivateJsonAtomic(target, value) {
  ensurePrivateDirectory(path.dirname(target));
  const temporary = path.join(
    path.dirname(target),
    `.${path.basename(target)}.${process.pid}.${crypto.randomUUID()}.tmp`
  );
  let descriptor = null;
  try {
    descriptor = fs.openSync(temporary, 'wx', 0o600);
    fs.writeFileSync(descriptor, `${JSON.stringify(value)}\n`);
    fs.fsyncSync(descriptor);
    fs.closeSync(descriptor);
    descriptor = null;
    fs.renameSync(temporary, target);
    fs.chmodSync(target, 0o600);
    fsyncDirectory(path.dirname(target));
  } finally {
    if (descriptor !== null) {
      fs.closeSync(descriptor);
    }
    try {
      fs.rmSync(temporary, { force: true });
    } catch {
      // The published target is authoritative; stale private temp cleanup is best effort.
    }
  }
  const readback = readPrivateJsonFile(target);
  if (
    !readback.ok ||
    JSON.stringify(readback.value) !== JSON.stringify(value)
  ) {
    throw new Error('private_json_readback_failed');
  }
}

/**
 * @param {unknown} input
 * @returns {{ ok: boolean, reason?: string }}
 */
export function validateManagedBinding(input) {
  if (!isRecord(input)) {
    return { ok: false, reason: 'binding_invalid' };
  }
  const value = /** @type {any} */ (input);
  if (value.protocol_version !== PROTOCOL_VERSION) {
    return { ok: false, reason: 'protocol_invalid' };
  }
  for (const key of [
    'repo',
    'target_remote',
    'target_base',
    'attempt_id',
    'release_path',
    'receipt_path',
    'pointer_path',
    'pointer_target'
  ]) {
    if (
      typeof value[key] !== 'string' ||
      value[key].trim().length === 0 ||
      value[key].length > 4096 ||
      /[\0\r\n]/.test(value[key])
    ) {
      return { ok: false, reason: `binding_${key}_invalid` };
    }
  }
  if (
    !SHA_RE.test(value.merged_floor_sha || '') ||
    !SHA_RE.test(value.candidate_sha || '')
  ) {
    return { ok: false, reason: 'binding_sha_invalid' };
  }
  if (!/^[A-Za-z0-9._-]{1,200}$/.test(value.attempt_id)) {
    return { ok: false, reason: 'binding_attempt_id_invalid' };
  }
  if (!validRemoteIdentity(value.target_remote)) {
    return { ok: false, reason: 'binding_remote_invalid' };
  }
  if (!path.isAbsolute(value.repo) || path.resolve(value.repo) !== value.repo) {
    return { ok: false, reason: 'binding_repo_invalid' };
  }
  if (
    !path.isAbsolute(value.receipt_path) ||
    path.resolve(value.receipt_path) !== value.receipt_path
  ) {
    return { ok: false, reason: 'binding_receipt_path_invalid' };
  }
  let expected_release;
  try {
    expected_release = releasePath(value.repo, value.candidate_sha);
  } catch {
    return { ok: false, reason: 'binding_release_invalid' };
  }
  if (
    value.release_path !== expected_release ||
    value.pointer_target !== expected_release
  ) {
    return { ok: false, reason: 'binding_release_mismatch' };
  }
  if (value.pointer_path !== runtimePointerPath()) {
    return { ok: false, reason: 'binding_pointer_mismatch' };
  }
  if (
    value.receipt_path !== deploymentReceiptPath(value.repo, value.attempt_id)
  ) {
    return { ok: false, reason: 'binding_receipt_mismatch' };
  }
  return { ok: true };
}

/**
 * @param {unknown} input
 * @returns {{ ok: true, release_realpath: string, root_realpath: string }|{ ok: false, reason: string }}
 */
export function validateManagedRelease(input) {
  const binding = validateManagedBinding(input);
  if (!binding.ok) {
    return { ok: false, reason: binding.reason || 'binding_invalid' };
  }
  const value = /** @type {any} */ (input);
  const root = releaseRoot(value.repo);
  try {
    const repo_stat = fs.lstatSync(value.repo);
    const root_stat = fs.lstatSync(root);
    const release_stat = fs.lstatSync(value.release_path);
    if (
      !repo_stat.isDirectory() ||
      repo_stat.isSymbolicLink() ||
      !root_stat.isDirectory() ||
      root_stat.isSymbolicLink() ||
      !release_stat.isDirectory() ||
      release_stat.isSymbolicLink()
    ) {
      return { ok: false, reason: 'release_path_invalid' };
    }
    const root_realpath = fs.realpathSync(root);
    const release_realpath = fs.realpathSync(value.release_path);
    const relative = path.relative(root_realpath, release_realpath);
    if (
      path.dirname(release_realpath) !== root_realpath ||
      path.dirname(relative) !== '.' ||
      path.basename(relative) !== value.candidate_sha ||
      relative.startsWith('..') ||
      path.isAbsolute(relative)
    ) {
      return { ok: false, reason: 'release_path_escape' };
    }
    return { ok: true, release_realpath, root_realpath };
  } catch {
    return { ok: false, reason: 'release_path_unreadable' };
  }
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
 * @param {unknown} left
 * @param {unknown} right
 */
function sameHelper(left, right) {
  if (!validHelper(left) || !validHelper(right)) {
    return false;
  }
  const left_value = /** @type {any} */ (left);
  const right_value = /** @type {any} */ (right);
  return (
    left_value.pid === right_value.pid &&
    left_value.pgid === right_value.pgid &&
    left_value.started_at === right_value.started_at
  );
}

/**
 * @param {unknown} state
 */
function validateState(state) {
  if (!isRecord(state)) {
    return false;
  }
  const value = /** @type {any} */ (state);
  const allowed_keys = new Set([
    ...BINDING_KEYS,
    'stage',
    'generation',
    'launch_token',
    'helper',
    'result'
  ]);
  if (
    Object.keys(value).some((key) => !allowed_keys.has(key)) ||
    !validateManagedBinding(value).ok ||
    !STAGES.has(value.stage) ||
    !Number.isInteger(value.generation) ||
    value.generation < 1 ||
    typeof value.launch_token !== 'string' ||
    value.launch_token.length < 8 ||
    value.launch_token.length > 256 ||
    /[\0\r\n]/.test(value.launch_token)
  ) {
    return false;
  }
  if (value.stage === 'prepared') {
    return value.helper === null && value.result === undefined;
  }
  if (!validHelper(value.helper)) {
    return false;
  }
  if (value.stage === 'restart_launched') {
    return (
      isRecord(value.result) &&
      Object.keys(value.result).every((key) =>
        ['invoked', 'outcome', 'detail'].includes(key)
      ) &&
      value.result.invoked === true &&
      (value.result.outcome === 'success' ||
        value.result.outcome === 'failure') &&
      (value.result.detail === undefined ||
        (typeof value.result.detail === 'string' &&
          value.result.detail.length > 0 &&
          value.result.detail.length <= 256 &&
          !/[\0\r\n]/.test(value.result.detail)))
    );
  }
  return value.result === undefined;
}

/**
 * @param {any} previous
 * @param {any} next
 */
function validTransition(previous, next) {
  if (!previous) {
    return next.stage === 'prepared' && next.generation === 1;
  }
  for (const key of BINDING_KEYS) {
    if (previous[key] !== next[key]) {
      return false;
    }
  }
  if (previous.stage === 'prepared' && next.stage === 'restart_prerecorded') {
    return (
      next.generation === previous.generation &&
      next.launch_token === previous.launch_token &&
      validHelper(next.helper)
    );
  }
  if (
    previous.stage === 'restart_prerecorded' &&
    next.stage === 'restart_committed'
  ) {
    return (
      next.generation === previous.generation &&
      next.launch_token === previous.launch_token &&
      sameHelper(next.helper, previous.helper)
    );
  }
  if (
    previous.stage === 'restart_committed' &&
    next.stage === 'restart_launched'
  ) {
    return (
      next.generation === previous.generation &&
      next.launch_token === previous.launch_token &&
      sameHelper(next.helper, previous.helper)
    );
  }
  if (
    (previous.stage === 'prepared' ||
      previous.stage === 'restart_prerecorded') &&
    next.stage === 'prepared'
  ) {
    return (
      next.generation === previous.generation + 1 &&
      next.launch_token !== previous.launch_token &&
      next.helper === null
    );
  }
  return false;
}

/**
 * @param {string} journal_path
 */
function claimDirectory(journal_path) {
  return `${journal_path}.claims`;
}

/**
 * @param {string} journal_path
 */
function validManagedJournalParents(journal_path) {
  const immediate = path.dirname(journal_path);
  const managed_parents = [
    path.dirname(path.dirname(immediate)),
    path.dirname(immediate),
    immediate
  ];
  for (const directory of managed_parents) {
    try {
      const stat = fs.lstatSync(directory);
      if (
        !stat.isDirectory() ||
        stat.isSymbolicLink() ||
        (directory === immediate && (stat.mode & 0o077) !== 0)
      ) {
        return false;
      }
    } catch (error) {
      return Boolean(
        isRecord(error) && /** @type {any} */ (error).code === 'ENOENT'
      );
    }
  }
  return true;
}

/**
 * @param {number} revision
 */
function claimFilename(revision) {
  return `${String(revision).padStart(12, '0')}.json`;
}

/**
 * @param {string} file
 * @returns {{ ok: true, record: any }|{ ok: false, reason: string }}
 */
function readClaimFile(file) {
  const readback = readPrivateJsonFile(file);
  if (!readback.ok) {
    return { ok: false, reason: 'claim_invalid' };
  }
  return { ok: true, record: readback.value };
}

/**
 * @param {string} journal_path
 * @returns {ManagedStateRead}
 */
function currentClaim(journal_path) {
  if (!validManagedJournalParents(journal_path)) {
    return { ok: false, reason: 'claim_invalid' };
  }
  const directory = claimDirectory(journal_path);
  let entries;
  try {
    const directory_stat = fs.lstatSync(directory);
    if (
      !directory_stat.isDirectory() ||
      directory_stat.isSymbolicLink() ||
      (directory_stat.mode & 0o077) !== 0
    ) {
      return { ok: false, reason: 'claim_invalid' };
    }
    entries = fs.readdirSync(directory);
  } catch (error) {
    if (isRecord(error) && /** @type {any} */ (error).code === 'ENOENT') {
      const projection = readPrivateJsonFile(journal_path);
      return !projection.ok && projection.reason === 'private_json_absent'
        ? { ok: true, revision: 0, digest: null, state: null }
        : { ok: false, reason: 'claim_invalid' };
    }
    return { ok: false, reason: 'claim_invalid' };
  }
  const claim_entries = [];
  for (const entry of entries) {
    if (entry.startsWith('.')) {
      continue;
    }
    if (!/^\d{12}\.json$/.test(entry)) {
      return { ok: false, reason: 'claim_invalid' };
    }
    claim_entries.push(entry);
  }
  claim_entries.sort();
  if (claim_entries.length === 0) {
    const projection = readPrivateJsonFile(journal_path);
    if (projection.ok || projection.reason !== 'private_json_absent') {
      return { ok: false, reason: 'claim_invalid' };
    }
  }
  let previous_digest = null;
  let previous_state = null;
  for (let index = 0; index < claim_entries.length; index += 1) {
    const expected_revision = index + 1;
    const entry = claim_entries[index];
    if (entry !== claimFilename(expected_revision)) {
      return { ok: false, reason: 'claim_invalid' };
    }
    const readback = readClaimFile(path.join(directory, entry));
    if (!readback.ok) {
      return readback;
    }
    const record = readback.record;
    if (
      Object.keys(record).some(
        (key) =>
          ![
            'revision',
            'previous_revision',
            'previous_digest',
            'state',
            'digest'
          ].includes(key)
      ) ||
      record.revision !== expected_revision ||
      record.previous_revision !== expected_revision - 1 ||
      record.previous_digest !== previous_digest ||
      typeof record.digest !== 'string' ||
      !validateState(record.state) ||
      !validTransition(previous_state, record.state)
    ) {
      return { ok: false, reason: 'claim_invalid' };
    }
    const material = {
      revision: record.revision,
      previous_revision: record.previous_revision,
      previous_digest: record.previous_digest,
      state: record.state
    };
    if (record.digest !== digest(JSON.stringify(material))) {
      return { ok: false, reason: 'claim_invalid' };
    }
    previous_digest = record.digest;
    previous_state = record.state;
  }
  return {
    ok: true,
    revision: claim_entries.length,
    digest: previous_digest,
    state: previous_state
  };
}

/**
 * @param {{ journal_path: string, expected_revision: number, expected_digest: string|null, state: any, skip_projection?: boolean }} input
 * @returns {ManagedStateRead}
 */
export function advanceManagedState(input) {
  if (!validateState(input.state)) {
    return { ok: false, reason: 'transition_invalid' };
  }
  if (
    input.journal_path !==
    managedJournalPath(input.state.repo, input.state.attempt_id)
  ) {
    return { ok: false, reason: 'journal_binding_invalid' };
  }
  const current = currentClaim(input.journal_path);
  if (!current.ok) {
    return current;
  }
  if (
    current.revision !== input.expected_revision ||
    current.digest !== input.expected_digest
  ) {
    return { ok: false, reason: 'claim_conflict' };
  }
  if (!validTransition(current.state, input.state)) {
    return { ok: false, reason: 'transition_invalid' };
  }
  const material = {
    revision: current.revision + 1,
    previous_revision: current.revision,
    previous_digest: current.digest,
    state: input.state
  };
  const record = { ...material, digest: digest(JSON.stringify(material)) };
  const directory = claimDirectory(input.journal_path);
  ensurePrivateDirectory(directory);
  const final_path = path.join(directory, claimFilename(record.revision));
  const temporary = path.join(
    directory,
    `.${record.revision}.${crypto.randomUUID()}.tmp`
  );
  try {
    writePrivateJsonAtomic(temporary, record);
    fs.linkSync(temporary, final_path);
    fsyncDirectory(directory);
  } catch (error) {
    try {
      fs.rmSync(temporary, { force: true });
      fsyncDirectory(directory);
    } catch {
      // The immutable final claim, if present, remains authoritative.
    }
    if (isRecord(error) && /** @type {any} */ (error).code === 'EEXIST') {
      return { ok: false, reason: 'claim_conflict' };
    }
    return { ok: false, reason: 'claim_write_failed' };
  }
  fs.rmSync(temporary, { force: true });
  fsyncDirectory(directory);
  const authoritative = currentClaim(input.journal_path);
  if (
    !authoritative.ok ||
    authoritative.revision < record.revision ||
    (authoritative.revision === record.revision &&
      authoritative.digest !== record.digest)
  ) {
    return { ok: false, reason: 'claim_readback_failed' };
  }
  if (!input.skip_projection) {
    writePrivateJsonAtomic(input.journal_path, {
      revision: authoritative.revision,
      digest: authoritative.digest,
      state: authoritative.state
    });
  }
  return authoritative;
}

/**
 * @param {{ journal_path: string, binding: any }} input
 * @returns {ManagedStateRead}
 */
export function readManagedState(input) {
  const binding = validateManagedBinding(input.binding);
  if (!binding.ok) {
    return { ok: false, reason: binding.reason || 'binding_invalid' };
  }
  if (
    input.journal_path !==
    managedJournalPath(input.binding.repo, input.binding.attempt_id)
  ) {
    return { ok: false, reason: 'journal_binding_invalid' };
  }
  const current = currentClaim(input.journal_path);
  if (!current.ok) {
    return current;
  }
  if (!current.state) {
    return { ok: false, reason: 'state_absent' };
  }
  for (const key of BINDING_KEYS) {
    if (current.state[key] !== input.binding[key]) {
      return { ok: false, reason: 'binding_mismatch' };
    }
  }
  return current;
}

/**
 * @param {any} binding
 * @param {string} launch_token
 */
export function createPreparedState(binding, launch_token) {
  return {
    ...binding,
    stage: 'prepared',
    generation: 1,
    launch_token,
    helper: null
  };
}

/**
 * @param {string} pointer_path
 * @param {boolean} allow_absent
 */
function validManagedPointerParent(pointer_path, allow_absent) {
  const immediate = path.dirname(pointer_path);
  const managed_parents = [
    path.dirname(path.dirname(immediate)),
    path.dirname(immediate),
    immediate
  ];
  for (const directory of managed_parents) {
    try {
      const stat = fs.lstatSync(directory);
      if (!stat.isDirectory() || stat.isSymbolicLink()) {
        return false;
      }
      if (directory === immediate && (stat.mode & 0o077) !== 0) {
        return false;
      }
    } catch (error) {
      return Boolean(
        allow_absent &&
        isRecord(error) &&
        /** @type {any} */ (error).code === 'ENOENT'
      );
    }
  }
  return true;
}

/**
 * @param {any} input
 * @returns {{ ok: true, present: false, link_target: null, target: null }|{ ok: true, present: true, link_target: string, target: string }|{ ok: false, reason: string }}
 */
export function inspectManagedPointer(input) {
  const binding = validateManagedBinding(input);
  if (!binding.ok) {
    return { ok: false, reason: binding.reason || 'binding_invalid' };
  }
  const value = /** @type {any} */ (input);
  if (!validManagedPointerParent(value.pointer_path, true)) {
    return { ok: false, reason: 'pointer_parent_invalid' };
  }
  let pointer_stat;
  try {
    pointer_stat = fs.lstatSync(value.pointer_path);
  } catch (error) {
    if (isRecord(error) && /** @type {any} */ (error).code === 'ENOENT') {
      return { ok: true, present: false, link_target: null, target: null };
    }
    return { ok: false, reason: 'pointer_unreadable' };
  }
  if (!pointer_stat.isSymbolicLink()) {
    return { ok: false, reason: 'pointer_not_symlink' };
  }
  try {
    const root = releaseRoot(value.repo);
    const root_stat = fs.lstatSync(root);
    if (!root_stat.isDirectory() || root_stat.isSymbolicLink()) {
      return { ok: false, reason: 'pointer_target_invalid' };
    }
    const root_realpath = fs.realpathSync(root);
    const target = fs.realpathSync(value.pointer_path);
    const target_stat = fs.lstatSync(target);
    const relative = path.relative(root_realpath, target);
    if (
      !target_stat.isDirectory() ||
      target_stat.isSymbolicLink() ||
      path.dirname(target) !== root_realpath ||
      path.dirname(relative) !== '.' ||
      !SHA_RE.test(path.basename(relative)) ||
      relative.startsWith('..') ||
      path.isAbsolute(relative)
    ) {
      return { ok: false, reason: 'pointer_target_invalid' };
    }
    return {
      ok: true,
      present: true,
      link_target: fs.readlinkSync(value.pointer_path),
      target
    };
  } catch {
    return { ok: false, reason: 'pointer_target_invalid' };
  }
}

/**
 * @param {{ binding: any, journal_path: string, expected_revision: number, expected_digest: string|null }} input
 */
export function cutoverPointer(input) {
  const binding = validateManagedBinding(input.binding);
  if (!binding.ok) {
    return { ok: false, reason: binding.reason || 'binding_invalid' };
  }
  const prepared = readManagedState({
    journal_path: input.journal_path,
    binding: input.binding
  });
  if (
    !prepared.ok ||
    prepared.revision !== input.expected_revision ||
    prepared.digest !== input.expected_digest ||
    prepared.state.stage !== 'prepared'
  ) {
    return { ok: false, reason: 'prepared_authority_missing' };
  }
  const contained = validateManagedRelease(input.binding);
  if (!contained.ok) {
    return contained;
  }
  const current = inspectManagedPointer(input.binding);
  if (!current.ok) {
    return current;
  }
  if (!validManagedPointerParent(input.binding.pointer_path, true)) {
    return { ok: false, reason: 'pointer_parent_invalid' };
  }
  ensurePrivateDirectory(path.dirname(input.binding.pointer_path));
  if (!validManagedPointerParent(input.binding.pointer_path, false)) {
    return { ok: false, reason: 'pointer_parent_invalid' };
  }
  const temporary = path.join(
    path.dirname(input.binding.pointer_path),
    `.${path.basename(input.binding.pointer_path)}.${crypto.randomUUID()}.tmp`
  );
  try {
    fs.symlinkSync(contained.release_realpath, temporary, 'dir');
    fs.renameSync(temporary, input.binding.pointer_path);
    fsyncDirectory(path.dirname(input.binding.pointer_path));
  } catch {
    try {
      fs.rmSync(temporary, { force: true });
    } catch {
      // The pointer was not authorized by this failed publication.
    }
    return { ok: false, reason: 'pointer_publish_failed' };
  }
  try {
    const pointer_stat = fs.lstatSync(input.binding.pointer_path);
    if (
      !pointer_stat.isSymbolicLink() ||
      fs.realpathSync(input.binding.pointer_path) !== contained.release_realpath
    ) {
      return { ok: false, reason: 'pointer_readback_mismatch' };
    }
  } catch {
    return { ok: false, reason: 'pointer_readback_failed' };
  }
  return {
    ok: true,
    previous_target: current.link_target,
    target: contained.release_realpath
  };
}
