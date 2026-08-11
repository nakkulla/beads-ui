import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  deploymentReceiptPath,
  managedClaimDir,
  managedJournalPath,
  releasePath,
  runtimePointerPath
} from './deployment-paths.js';
import {
  advanceManagedState,
  createPreparedState,
  cutoverPointer,
  inspectManagedPointer,
  readManagedState,
  validateManagedBinding,
  validateManagedRelease
} from './managed-state.js';

const SHA = 'a'.repeat(40);
const FLOOR = 'b'.repeat(40);
const ATTEMPT = 'attempt-1';

/** @type {string} */
let root;
/** @type {string} */
let repo;
/** @type {string} */
let release;
/** @type {string} */
let journal_path;
/** @type {string} */
let pointer_path;
/** @type {string|undefined} */
let previous_data_home;
/** @type {string|undefined} */
let previous_state_home;

/**
 * @returns {any}
 */
function binding() {
  return {
    protocol_version: 1,
    repo,
    target_remote: 'git@example.test:owner/repo.git',
    target_base: 'main',
    merged_floor_sha: FLOOR,
    attempt_id: ATTEMPT,
    candidate_sha: SHA,
    release_path: release,
    receipt_path: deploymentReceiptPath(repo, ATTEMPT),
    pointer_path,
    pointer_target: release
  };
}

/**
 * @param {string} token
 * @returns {any}
 */
function prepare(token = 'token-0001') {
  return advanceManagedState({
    journal_path,
    expected_revision: 0,
    expected_digest: null,
    state: createPreparedState(binding(), token)
  });
}

beforeEach(() => {
  previous_data_home = process.env.XDG_DATA_HOME;
  previous_state_home = process.env.XDG_STATE_HOME;
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'managed-state-'));
  process.env.XDG_DATA_HOME = path.join(root, 'data');
  process.env.XDG_STATE_HOME = path.join(root, 'state');
  repo = path.join(root, 'shared');
  fs.mkdirSync(repo, { recursive: true });
  release = releasePath(repo, SHA);
  fs.mkdirSync(release, { recursive: true });
  journal_path = managedJournalPath(repo, ATTEMPT);
  pointer_path = runtimePointerPath();
});

afterEach(() => {
  if (previous_data_home === undefined) {
    delete process.env.XDG_DATA_HOME;
  } else {
    process.env.XDG_DATA_HOME = previous_data_home;
  }
  if (previous_state_home === undefined) {
    delete process.env.XDG_STATE_HOME;
  } else {
    process.env.XDG_STATE_HOME = previous_state_home;
  }
  fs.rmSync(root, { recursive: true, force: true });
});

describe('worker/managed-state', () => {
  test('rejects a binding outside the exact managed paths', () => {
    const invalid = {
      ...binding(),
      release_path: path.join(root, 'outside', SHA),
      pointer_target: path.join(root, 'outside', SHA)
    };

    const result = validateManagedBinding(invalid);

    expect(result).toMatchObject({
      ok: false,
      reason: 'binding_release_mismatch'
    });
    expect(fs.existsSync(journal_path)).toBe(false);
  });

  test('rejects a credential-bearing remote before journal creation', () => {
    const invalid = {
      ...binding(),
      target_remote: 'https://token@example.test/owner/repo.git'
    };

    const result = validateManagedBinding(invalid);

    expect(result).toEqual({ ok: false, reason: 'binding_remote_invalid' });
    expect(fs.existsSync(journal_path)).toBe(false);
  });

  test('rejects a password-bearing ssh remote before journal creation', () => {
    const invalid = {
      ...binding(),
      target_remote: 'ssh://git:secret@example.test/owner/repo.git'
    };

    const result = validateManagedBinding(invalid);

    expect(result).toEqual({ ok: false, reason: 'binding_remote_invalid' });
    expect(fs.existsSync(journal_path)).toBe(false);
  });

  test('rejects an unsafe attempt id before deriving a receipt authority', () => {
    const invalid = {
      ...binding(),
      attempt_id: 'attempt/1',
      receipt_path: deploymentReceiptPath(repo, 'attempt/1')
    };

    const result = validateManagedBinding(invalid);

    expect(result).toEqual({
      ok: false,
      reason: 'binding_attempt_id_invalid'
    });
  });

  test('rejects a journal path outside the exact attempt binding', () => {
    const outside = path.join(root, 'outside-journal.json');

    const advanced = advanceManagedState({
      journal_path: outside,
      expected_revision: 0,
      expected_digest: null,
      state: createPreparedState(binding(), 'token-0001')
    });
    const read = readManagedState({
      journal_path: outside,
      binding: binding()
    });

    expect(advanced).toEqual({
      ok: false,
      reason: 'journal_binding_invalid'
    });
    expect(read).toEqual({ ok: false, reason: 'journal_binding_invalid' });
    expect(fs.existsSync(outside)).toBe(false);
  });

  test('rejects a projection without immutable claims', () => {
    fs.mkdirSync(path.dirname(journal_path), { recursive: true, mode: 0o700 });
    fs.writeFileSync(journal_path, '{', { mode: 0o600 });

    const read = readManagedState({
      journal_path,
      binding: binding()
    });
    const advanced = advanceManagedState({
      journal_path,
      expected_revision: 0,
      expected_digest: null,
      state: createPreparedState(binding(), 'token-0001')
    });

    expect(read).toEqual({ ok: false, reason: 'claim_invalid' });
    expect(advanced).toEqual({ ok: false, reason: 'claim_invalid' });
    expect(fs.existsSync(`${journal_path}.claims`)).toBe(false);
  });

  test('rejects a symlink in the managed journal parent chain', () => {
    const managed_parent = path.dirname(journal_path);
    const outside = path.join(root, 'outside-journal-parent');
    fs.mkdirSync(outside, { mode: 0o700 });
    fs.mkdirSync(path.dirname(managed_parent), { recursive: true });
    fs.symlinkSync(outside, managed_parent, 'dir');

    const read = readManagedState({
      journal_path,
      binding: binding()
    });
    const advanced = advanceManagedState({
      journal_path,
      expected_revision: 0,
      expected_digest: null,
      state: createPreparedState(binding(), 'token-0001')
    });

    expect(read).toEqual({ ok: false, reason: 'claim_invalid' });
    expect(advanced).toEqual({ ok: false, reason: 'claim_invalid' });
    expect(fs.readdirSync(outside)).toEqual([]);
  });

  test('rejects a publicly accessible managed journal parent', () => {
    const managed_parent = path.dirname(journal_path);
    fs.mkdirSync(managed_parent, { recursive: true, mode: 0o755 });
    fs.chmodSync(managed_parent, 0o755);

    const read = readManagedState({
      journal_path,
      binding: binding()
    });
    const advanced = advanceManagedState({
      journal_path,
      expected_revision: 0,
      expected_digest: null,
      state: createPreparedState(binding(), 'token-0001')
    });

    expect(read).toEqual({ ok: false, reason: 'claim_invalid' });
    expect(advanced).toEqual({ ok: false, reason: 'claim_invalid' });
    expect(fs.readdirSync(managed_parent)).toEqual([]);
  });

  test('rejects fields outside the finite journal schema', () => {
    const result = advanceManagedState({
      journal_path,
      expected_revision: 0,
      expected_digest: null,
      state: {
        ...createPreparedState(binding(), 'token-0001'),
        unexpected_field: 'not-authoritative'
      }
    });

    expect(result).toEqual({ ok: false, reason: 'transition_invalid' });
    expect(fs.existsSync(journal_path)).toBe(false);
  });

  test('writes private prepared authority before pointer mutation', () => {
    const advanced = prepare();

    expect(advanced).toMatchObject({
      ok: true,
      revision: 1,
      state: { stage: 'prepared', generation: 1 }
    });
    expect(fs.existsSync(pointer_path)).toBe(false);
    expect(fs.statSync(path.dirname(journal_path)).mode & 0o777).toBe(0o700);
    expect(fs.statSync(journal_path).mode & 0o777).toBe(0o600);
    expect(fs.statSync(managedClaimDir(repo, ATTEMPT)).mode & 0o777).toBe(
      0o700
    );
    expect(
      fs.statSync(
        path.join(managedClaimDir(repo, ATTEMPT), '000000000001.json')
      ).mode & 0o777
    ).toBe(0o600);
  });

  test('allows one competing transition from a revision', () => {
    const prepared = prepare();
    const prerecord_state = {
      ...prepared.state,
      stage: 'restart_prerecorded',
      helper: { pid: 10, pgid: 10, started_at: 1 }
    };
    const rollover_state = {
      ...createPreparedState(binding(), 'token-0002'),
      generation: 2
    };

    const winner = advanceManagedState({
      journal_path,
      expected_revision: prepared.revision,
      expected_digest: prepared.digest,
      state: prerecord_state
    });
    const loser = advanceManagedState({
      journal_path,
      expected_revision: prepared.revision,
      expected_digest: prepared.digest,
      state: rollover_state
    });

    expect(winner).toMatchObject({
      ok: true,
      state: { stage: 'restart_prerecorded' }
    });
    expect(loser).toEqual({ ok: false, reason: 'claim_conflict' });
  });

  test('recovers authority when projection publication is skipped', () => {
    const state = createPreparedState(binding(), 'token-0001');
    const advanced = advanceManagedState({
      journal_path,
      expected_revision: 0,
      expected_digest: null,
      state,
      skip_projection: true
    });

    const recovered = readManagedState({ journal_path, binding: binding() });

    expect(advanced.ok).toBe(true);
    expect(fs.existsSync(journal_path)).toBe(false);
    expect(recovered).toMatchObject({
      ok: true,
      revision: 1,
      state: { stage: 'prepared' }
    });
  });

  test('rejects a truncated immutable claim', () => {
    prepare();
    const claim = path.join(
      managedClaimDir(repo, ATTEMPT),
      '000000000001.json'
    );
    fs.writeFileSync(claim, '{', { mode: 0o600 });

    const result = readManagedState({ journal_path, binding: binding() });

    expect(result).toEqual({ ok: false, reason: 'claim_invalid' });
  });

  test('rejects a symlink claim file', () => {
    prepare();
    const claim = path.join(
      managedClaimDir(repo, ATTEMPT),
      '000000000001.json'
    );
    const outside = path.join(root, 'outside-claim.json');
    fs.writeFileSync(outside, '{}', { mode: 0o600 });
    fs.rmSync(claim);
    fs.symlinkSync(outside, claim);

    const result = readManagedState({ journal_path, binding: binding() });

    expect(result).toEqual({ ok: false, reason: 'claim_invalid' });
  });

  test('rejects a claim directory with public permissions', () => {
    prepare();
    fs.chmodSync(managedClaimDir(repo, ATTEMPT), 0o755);

    const result = readManagedState({ journal_path, binding: binding() });

    expect(result).toEqual({ ok: false, reason: 'claim_invalid' });
  });

  test('requires exact prepared authority before pointer cutover', () => {
    const result = cutoverPointer({
      binding: binding(),
      journal_path,
      expected_revision: 0,
      expected_digest: null
    });

    expect(result).toEqual({
      ok: false,
      reason: 'prepared_authority_missing'
    });
    expect(fs.existsSync(pointer_path)).toBe(false);
  });

  test('cuts over a contained release atomically', () => {
    const prepared = prepare();

    const result = cutoverPointer({
      binding: binding(),
      journal_path,
      expected_revision: prepared.revision,
      expected_digest: prepared.digest
    });

    expect(result).toMatchObject({ ok: true, previous_target: null });
    expect(fs.lstatSync(pointer_path).isSymbolicLink()).toBe(true);
    expect(fs.realpathSync(pointer_path)).toBe(fs.realpathSync(release));
  });

  test('rejects a non-symlink current pointer', () => {
    const prepared = prepare();
    fs.mkdirSync(path.dirname(pointer_path), { recursive: true, mode: 0o700 });
    fs.chmodSync(path.dirname(pointer_path), 0o700);
    fs.writeFileSync(pointer_path, 'not-a-link');

    const result = cutoverPointer({
      binding: binding(),
      journal_path,
      expected_revision: prepared.revision,
      expected_digest: prepared.digest
    });

    expect(result).toEqual({ ok: false, reason: 'pointer_not_symlink' });
  });

  test('rejects a dangling current pointer without replacing it', () => {
    const prepared = prepare();
    const missing = path.join(releasePath(repo, 'c'.repeat(40)), 'missing');
    fs.mkdirSync(path.dirname(pointer_path), { recursive: true, mode: 0o700 });
    fs.chmodSync(path.dirname(pointer_path), 0o700);
    fs.symlinkSync(missing, pointer_path, 'dir');

    const inspected = inspectManagedPointer(binding());
    const result = cutoverPointer({
      binding: binding(),
      journal_path,
      expected_revision: prepared.revision,
      expected_digest: prepared.digest
    });

    expect(inspected).toEqual({
      ok: false,
      reason: 'pointer_target_invalid'
    });
    expect(result).toEqual({ ok: false, reason: 'pointer_target_invalid' });
    expect(fs.readlinkSync(pointer_path)).toBe(missing);
  });

  test('rejects a current pointer outside the managed release root', () => {
    const prepared = prepare();
    const outside = path.join(root, 'outside-pointer');
    fs.mkdirSync(outside);
    fs.mkdirSync(path.dirname(pointer_path), { recursive: true, mode: 0o700 });
    fs.chmodSync(path.dirname(pointer_path), 0o700);
    fs.symlinkSync(outside, pointer_path, 'dir');

    const result = cutoverPointer({
      binding: binding(),
      journal_path,
      expected_revision: prepared.revision,
      expected_digest: prepared.digest
    });

    expect(result).toEqual({ ok: false, reason: 'pointer_target_invalid' });
    expect(fs.realpathSync(pointer_path)).toBe(fs.realpathSync(outside));
  });

  test('cuts over from a valid previous managed release', () => {
    const prepared = prepare();
    const previous = releasePath(repo, 'c'.repeat(40));
    fs.mkdirSync(previous);
    fs.mkdirSync(path.dirname(pointer_path), { recursive: true, mode: 0o700 });
    fs.chmodSync(path.dirname(pointer_path), 0o700);
    fs.symlinkSync(previous, pointer_path, 'dir');

    const result = cutoverPointer({
      binding: binding(),
      journal_path,
      expected_revision: prepared.revision,
      expected_digest: prepared.digest
    });

    expect(result).toMatchObject({ ok: true, previous_target: previous });
    expect(fs.realpathSync(pointer_path)).toBe(fs.realpathSync(release));
  });

  test('rejects a symlink release that escapes the release root', () => {
    const prepared = prepare();
    const outside = path.join(root, 'outside-release');
    fs.mkdirSync(outside);
    fs.rmSync(release, { recursive: true });
    fs.symlinkSync(outside, release, 'dir');

    const contained = validateManagedRelease(binding());
    const cutover = cutoverPointer({
      binding: binding(),
      journal_path,
      expected_revision: prepared.revision,
      expected_digest: prepared.digest
    });

    expect(contained).toMatchObject({ ok: false });
    expect(cutover).toMatchObject({ ok: false });
    expect(fs.existsSync(pointer_path)).toBe(false);
  });
});
