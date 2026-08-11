import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  candidateInstallMarkerPath,
  deploymentReceiptPath,
  managedJournalPath,
  releasePath,
  runtimePointerPath
} from '../server/worker/deployment-paths.js';
import { validateDeploymentReceipt } from '../server/worker/deployment-reconciler.js';
import {
  advanceManagedState,
  createPreparedState,
  cutoverPointer,
  readManagedFailure,
  readManagedState
} from '../server/worker/managed-state.js';
import {
  adapterFailureForResult,
  bindingFromEnv,
  main,
  publishAdapterFailure,
  readRuntimeHealth,
  runAdapter,
  runRestartHelper,
  waitForRestartHandoff
} from './managed-self-deploy.js';

const SHA = 'a'.repeat(40);
const FLOOR = 'b'.repeat(40);
const REMOTE = 'git@example.test:owner/repo.git';
const ATTEMPT = 'attempt-1';
const IDENTITY = { pid: 42, pgid: 42, started_at: 1 };

/** @type {string} */
let root;
/** @type {string} */
let repo;
/** @type {string} */
let release;
/** @type {Record<string, string>} */
let environment;
/** @type {string|undefined} */
let previous_data_home;
/** @type {string|undefined} */
let previous_state_home;

/**
 * @returns {any}
 */
function binding() {
  const parsed = bindingFromEnv(environment, runtimePointerPath());
  if (!parsed.ok) {
    throw new Error(parsed.reason);
  }
  return parsed.binding;
}

/**
 * @param {Record<string, any>} [overrides]
 */
function runtimeIdentity(overrides = {}) {
  return {
    protocol_version: 1,
    pid: 77,
    process_started_at: 1_000,
    started_at: '2026-08-11T00:00:00.000Z',
    instance_id: '11111111-2222-4333-8444-555555555555',
    source_repo: fs.realpathSync(release),
    source_sha: SHA,
    host: '127.0.0.1',
    port: 3000,
    health_path: '/healthz',
    ...overrides
  };
}

/**
 * @param {Record<string, { code?: number, stdout?: string, stderr?: string }>} [overrides]
 */
function gitRunner(overrides = {}) {
  return vi.fn(async (/** @type {string[]} */ args) => {
    const key = args.join(' ');
    const defaults =
      key === 'rev-parse HEAD'
        ? { code: 0, stdout: `${SHA}\n`, stderr: '' }
        : key === 'status --porcelain --untracked-files=no'
          ? { code: 0, stdout: '', stderr: '' }
          : key === 'remote get-url origin'
            ? { code: 0, stdout: `${REMOTE}\n`, stderr: '' }
            : key === `merge-base --is-ancestor ${FLOOR} ${SHA}`
              ? { code: 0, stdout: '', stderr: '' }
              : { code: 1, stdout: '', stderr: 'unexpected git command' };
    return { ...defaults, ...overrides[key] };
  });
}

/**
 * @param {string} token
 * @returns {any}
 */
function seedPrepared(token = 'token-0001') {
  const exact_binding = binding();
  return advanceManagedState({
    journal_path: managedJournalPath(repo, ATTEMPT),
    expected_revision: 0,
    expected_digest: null,
    state: createPreparedState(exact_binding, token)
  });
}

/**
 * @param {any} prepared
 */
function seedPointer(prepared) {
  return cutoverPointer({
    binding: binding(),
    journal_path: managedJournalPath(repo, ATTEMPT),
    expected_revision: prepared.revision,
    expected_digest: prepared.digest
  });
}

/**
 * @param {string} token
 * @returns {any}
 */
function seedPrerecorded(token = 'token-0001') {
  const prepared = seedPrepared(token);
  seedPointer(prepared);
  return advanceManagedState({
    journal_path: managedJournalPath(repo, ATTEMPT),
    expected_revision: prepared.revision,
    expected_digest: prepared.digest,
    state: {
      ...prepared.state,
      stage: 'restart_prerecorded',
      helper: IDENTITY
    }
  });
}

/**
 * @param {string} token
 * @returns {any}
 */
function seedCommitted(token = 'token-0001') {
  const prerecord = seedPrerecorded(token);
  return advanceManagedState({
    journal_path: managedJournalPath(repo, ATTEMPT),
    expected_revision: prerecord.revision,
    expected_digest: prerecord.digest,
    state: { ...prerecord.state, stage: 'restart_committed' }
  });
}

/**
 * @param {{ ack_stage?: string, probe_state?: string }} [options]
 * @returns {any}
 */
function effectHarness(options = {}) {
  /** @type {any[]} */
  const installs = [];
  /** @type {any[]} */
  const spawns = [];
  const unref = vi.fn();
  const waitForParentExit = vi.fn(async () => {});
  let token_index = 0;
  return {
    installs,
    spawns,
    unref,
    waitForParentExit,
    runGit: gitRunner(),
    runInstall: vi.fn(async (command) => {
      installs.push(command);
      fs.mkdirSync(path.join(release, 'node_modules'), { recursive: true });
    }),
    spawnHelper: vi.fn((command) => {
      spawns.push(command);
      return { pid: 42, unref };
    }),
    waitForAck: vi.fn(async (input) => ({
      stage: options.ack_stage || 'restart_committed',
      generation: input.generation,
      launch_token: input.launch_token,
      helper: IDENTITY
    })),
    processController: {
      probe: vi.fn(() => ({ state: options.probe_state || 'gone' }))
    },
    randomToken: vi.fn(() => `token-next-${++token_index}`)
  };
}

/**
 * @param {ReturnType<typeof effectHarness>} harness
 * @param {Record<string, any>} [overrides]
 */
async function runWith(harness, overrides = {}) {
  return await runAdapter({
    env: environment,
    runGit: harness.runGit,
    runInstall: harness.runInstall,
    spawnHelper: harness.spawnHelper,
    waitForAck: harness.waitForAck,
    waitForParentExit: harness.waitForParentExit,
    processController: harness.processController,
    randomToken: harness.randomToken,
    ...overrides
  });
}

/**
 * @param {ReturnType<typeof effectHarness>} harness
 */
function expectNoEffects(harness) {
  expect(harness.runInstall).not.toHaveBeenCalled();
  expect(harness.spawnHelper).not.toHaveBeenCalled();
  expect(fs.existsSync(candidateInstallMarkerPath(repo, SHA))).toBe(false);
  expect(fs.existsSync(managedJournalPath(repo, ATTEMPT))).toBe(false);
  expect(fs.existsSync(runtimePointerPath())).toBe(false);
}

beforeEach(() => {
  previous_data_home = process.env.XDG_DATA_HOME;
  previous_state_home = process.env.XDG_STATE_HOME;
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'managed-adapter-'));
  process.env.XDG_DATA_HOME = path.join(root, 'data');
  process.env.XDG_STATE_HOME = path.join(root, 'state');
  repo = path.join(root, 'shared');
  fs.mkdirSync(repo, { recursive: true });
  release = releasePath(repo, SHA);
  fs.mkdirSync(release, { recursive: true });
  fs.writeFileSync(path.join(release, 'package-lock.json'), '{}');
  environment = {
    PATH: '/usr/bin:/bin',
    GITHUB_TOKEN: 'must-not-propagate',
    XDG_DATA_HOME: process.env.XDG_DATA_HOME,
    XDG_STATE_HOME: process.env.XDG_STATE_HOME,
    BDUI_DEPLOY_PROTOCOL_VERSION: '1',
    BDUI_DEPLOY_SOURCE_REPO: repo,
    BDUI_DEPLOY_TARGET_REMOTE: REMOTE,
    BDUI_DEPLOY_TARGET_BASE: 'main',
    BDUI_DEPLOY_MERGED_FLOOR_SHA: FLOOR,
    BDUI_DEPLOY_CANDIDATE_SHA: SHA,
    BDUI_DEPLOY_RELEASE_PATH: release,
    BDUI_DEPLOY_RECEIPT_PATH: deploymentReceiptPath(repo, ATTEMPT),
    BDUI_DEPLOY_ATTEMPT_ID: ATTEMPT
  };
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

describe('scripts/managed-self-deploy', () => {
  test('imports before candidate dependencies are installed', () => {
    const source_root = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      '..'
    );
    const fixture_root = path.join(root, 'import-smoke');
    const files = [
      'scripts/managed-self-deploy.js',
      'server/logging.js',
      'server/runtime-identity.js',
      'server/worker/deployment-paths.js',
      'server/worker/deployment-reconciler.js',
      'server/worker/error-detail.js',
      'server/worker/managed-failure.js',
      'server/worker/managed-state.js',
      'server/worker/process-controller.js',
      'server/worker/state-paths.js',
      'server/worker/verify-cmd.js'
    ];
    for (const relative_path of files) {
      const target = path.join(fixture_root, relative_path);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(path.join(source_root, relative_path), target);
    }
    fs.writeFileSync(
      path.join(fixture_root, 'package.json'),
      JSON.stringify({ type: 'module' })
    );

    const output = execFileSync(
      process.execPath,
      [
        '--input-type=module',
        '-e',
        'await import("./scripts/managed-self-deploy.js")'
      ],
      { cwd: fixture_root, encoding: 'utf8' }
    );

    expect(output).toBe('');
  });

  test.each([
    ['install_failed', undefined, 'adapter_regression', false],
    ['pointer_publish_failed', undefined, 'pointer_transient', true],
    ['helper_spawn_failed', undefined, 'helper_spawn_timeout', true],
    ['pointer_target_invalid', undefined, 'pointer_escape', false],
    [
      'runtime_identity_mismatch',
      'restart_committed',
      'restart_effect_ambiguous',
      false
    ],
    [
      'restart_handoff_pending',
      'restart_launched',
      'restart_effect_ambiguous',
      false
    ],
    [
      'runtime_identity_mismatch',
      undefined,
      'runtime_identity_mismatch',
      false
    ],
    ['runtime_health_red', undefined, 'runtime_health_red', false]
  ])(
    'classifies %s at stage %s with the finite failure mapping',
    (reason, stage, failure_code, retryable) => {
      const result = adapterFailureForResult({
        ok: false,
        reason,
        ...(stage ? { state: { stage } } : {})
      });

      expect(result).toEqual({ failure_code, retryable, detail: reason });
    }
  );

  test('publishes a bound failure before returning a nonzero CLI exit', async () => {
    /** @type {string[]} */
    const events = [];
    const result = { ok: false, reason: 'install_failed' };

    const exit_code = await main([], {
      runAdapter: async () => {
        events.push('adapter');
        return result;
      },
      publishFailure: (failure_result) => {
        events.push('failure');
        return publishAdapterFailure(environment, failure_result);
      }
    });
    const failure = readManagedFailure({ binding: binding() });

    expect(exit_code).toBe(1);
    expect(events).toEqual(['adapter', 'failure']);
    expect(failure).toMatchObject({
      ok: true,
      record: {
        failure_code: 'adapter_regression',
        retryable: false,
        detail: 'install_failed'
      }
    });
  });

  test('rejects an invalid protocol before every effect', async () => {
    const harness = effectHarness();

    const result = await runWith(harness, {
      env: { ...environment, BDUI_DEPLOY_PROTOCOL_VERSION: '2' }
    });

    expect(result).toMatchObject({ ok: false, reason: 'protocol_invalid' });
    expectNoEffects(harness);
  });

  test('rejects a missing source repo before every effect', async () => {
    const harness = effectHarness();
    const missing_repo = path.join(root, 'missing-repo');

    const result = await runWith(harness, {
      env: {
        ...environment,
        BDUI_DEPLOY_SOURCE_REPO: missing_repo,
        BDUI_DEPLOY_RELEASE_PATH: releasePath(missing_repo, SHA)
      }
    });

    expect(result).toMatchObject({ ok: false });
    expectNoEffects(harness);
  });

  test('rejects a relative source repo before every effect', async () => {
    const harness = effectHarness();

    const result = await runWith(harness, {
      env: { ...environment, BDUI_DEPLOY_SOURCE_REPO: 'relative/repo' }
    });

    expect(result).toEqual({ ok: false, reason: 'binding_repo_invalid' });
    expectNoEffects(harness);
  });

  test('rejects a relative XDG state root before every effect', async () => {
    const harness = effectHarness();

    const result = await runWith(harness, {
      env: { ...environment, XDG_STATE_HOME: 'relative-state' }
    });

    expect(result).toEqual({
      ok: false,
      reason: 'environment_path_invalid'
    });
    expectNoEffects(harness);
  });

  test('rejects a release symlink escape before every effect', async () => {
    const harness = effectHarness();
    const outside = path.join(root, 'outside');
    fs.mkdirSync(outside);
    fs.rmSync(release, { recursive: true });
    fs.symlinkSync(outside, release, 'dir');

    const result = await runWith(harness);

    expect(result).toMatchObject({ ok: false });
    expectNoEffects(harness);
  });

  test.each(['dangling', 'escape'])(
    'rejects a %s runtime pointer before install or journal creation',
    async (kind) => {
      const harness = effectHarness();
      const target =
        kind === 'dangling'
          ? path.join(root, 'missing-runtime')
          : path.join(root, 'outside-runtime');
      if (kind === 'escape') {
        fs.mkdirSync(target);
      }
      fs.mkdirSync(path.dirname(runtimePointerPath()), {
        recursive: true,
        mode: 0o700
      });
      fs.symlinkSync(target, runtimePointerPath(), 'dir');

      const result = await runWith(harness);

      expect(result).toEqual({
        ok: false,
        reason: 'pointer_target_invalid'
      });
      expect(harness.runInstall).not.toHaveBeenCalled();
      expect(harness.spawnHelper).not.toHaveBeenCalled();
      expect(fs.existsSync(candidateInstallMarkerPath(repo, SHA))).toBe(false);
      expect(fs.existsSync(managedJournalPath(repo, ATTEMPT))).toBe(false);
      expect(fs.readlinkSync(runtimePointerPath())).toBe(target);
    }
  );

  test('rejects a runtime pointer below a symlink parent before effects', async () => {
    const harness = effectHarness();
    const pointer = runtimePointerPath();
    const outside = path.join(root, 'outside-pointer-parent');
    fs.mkdirSync(outside, { mode: 0o700 });
    fs.symlinkSync(release, path.join(outside, 'current'), 'dir');
    fs.mkdirSync(path.dirname(path.dirname(pointer)), { recursive: true });
    fs.symlinkSync(outside, path.dirname(pointer), 'dir');

    const result = await runWith(harness);

    expect(result).toEqual({ ok: false, reason: 'pointer_parent_invalid' });
    expect(harness.runInstall).not.toHaveBeenCalled();
    expect(harness.spawnHelper).not.toHaveBeenCalled();
    expect(fs.existsSync(candidateInstallMarkerPath(repo, SHA))).toBe(false);
    expect(fs.existsSync(managedJournalPath(repo, ATTEMPT))).toBe(false);
    expect(fs.realpathSync(pointer)).toBe(fs.realpathSync(release));
  });

  test.each(['malformed', 'symlink', 'public'])(
    'rejects a %s install marker before dependency install',
    async (kind) => {
      const harness = effectHarness();
      const marker = candidateInstallMarkerPath(repo, SHA);
      fs.mkdirSync(path.dirname(marker), { recursive: true, mode: 0o700 });
      if (kind === 'symlink') {
        const outside = path.join(root, 'outside-marker.json');
        fs.writeFileSync(outside, '{}', { mode: 0o600 });
        fs.symlinkSync(outside, marker);
      } else {
        fs.writeFileSync(marker, kind === 'malformed' ? '{' : '{}', {
          mode: kind === 'public' ? 0o644 : 0o600
        });
      }

      const result = await runWith(harness);

      expect(result).toEqual({
        ok: false,
        reason: 'install_marker_invalid'
      });
      expect(harness.runInstall).not.toHaveBeenCalled();
      expect(harness.spawnHelper).not.toHaveBeenCalled();
      expect(fs.existsSync(managedJournalPath(repo, ATTEMPT))).toBe(false);
      expect(fs.existsSync(runtimePointerPath())).toBe(false);
    }
  );

  test('rejects a matching marker below a symlink parent', async () => {
    const harness = effectHarness();
    const marker = candidateInstallMarkerPath(repo, SHA);
    const outside = path.join(root, 'outside-marker-parent');
    fs.mkdirSync(outside, { mode: 0o700 });
    fs.mkdirSync(path.join(release, 'node_modules'));
    const lockfile_sha256 = crypto
      .createHash('sha256')
      .update(fs.readFileSync(path.join(release, 'package-lock.json')))
      .digest('hex');
    fs.writeFileSync(
      path.join(outside, path.basename(marker)),
      JSON.stringify({
        protocol_version: 1,
        candidate_sha: SHA,
        release_path: release,
        release_realpath: fs.realpathSync(release),
        lockfile_sha256
      }),
      { mode: 0o600 }
    );
    fs.symlinkSync(outside, path.dirname(marker), 'dir');

    const result = await runWith(harness);

    expect(result).toEqual({
      ok: false,
      reason: 'install_marker_invalid'
    });
    expect(harness.runInstall).not.toHaveBeenCalled();
    expect(harness.spawnHelper).not.toHaveBeenCalled();
    expect(fs.existsSync(managedJournalPath(repo, ATTEMPT))).toBe(false);
    expect(fs.existsSync(runtimePointerPath())).toBe(false);
  });

  test.each([
    [
      'candidate head',
      'rev-parse HEAD',
      { code: 0, stdout: `${'c'.repeat(40)}\n` },
      'candidate_head_mismatch'
    ],
    [
      'tracked status',
      'status --porcelain --untracked-files=no',
      { code: 0, stdout: ' M server/index.js\n' },
      'candidate_status_dirty'
    ],
    [
      'remote identity',
      'remote get-url origin',
      { code: 0, stdout: 'git@example.test:other/repo.git\n' },
      'candidate_remote_mismatch'
    ],
    [
      'merge floor',
      `merge-base --is-ancestor ${FLOOR} ${SHA}`,
      { code: 1 },
      'candidate_floor_mismatch'
    ]
  ])(
    'rejects an invalid %s before every effect',
    async (_, key, value, reason) => {
      const harness = effectHarness();
      harness.runGit = gitRunner({ [key]: value });

      const result = await runWith(harness);

      expect(result).toMatchObject({ ok: false, reason });
      expectNoEffects(harness);
    }
  );

  test('rejects a mismatched existing journal before install', async () => {
    const harness = effectHarness();
    const exact_binding = binding();
    const foreign = {
      ...exact_binding,
      target_remote: 'git@example.test:foreign/repo.git'
    };
    advanceManagedState({
      journal_path: managedJournalPath(repo, ATTEMPT),
      expected_revision: 0,
      expected_digest: null,
      state: createPreparedState(foreign, 'token-0001')
    });

    const result = await runWith(harness);

    expect(result).toEqual({ ok: false, reason: 'binding_mismatch' });
    expect(harness.runInstall).not.toHaveBeenCalled();
    expect(harness.spawnHelper).not.toHaveBeenCalled();
  });

  test('installs exact candidate, spawns a fenced helper, and waits after ACK', async () => {
    const harness = effectHarness({ ack_stage: 'restart_launched' });

    const result = await runWith(harness);

    expect(result).toMatchObject({
      ok: false,
      status: 'awaiting_runtime',
      reason: 'restart_handoff_pending'
    });
    expect(harness.installs).toEqual([
      { cmd: 'npm', args: ['ci', '--omit=dev'], cwd: release }
    ]);
    expect(
      fs.statSync(candidateInstallMarkerPath(repo, SHA)).mode & 0o777
    ).toBe(0o600);
    expect(fs.realpathSync(runtimePointerPath())).toBe(
      fs.realpathSync(release)
    );
    expect(harness.spawns).toHaveLength(1);
    expect(harness.spawns[0]).toMatchObject({
      executable: process.execPath,
      cwd: release,
      detached: true,
      stdio: 'ignore'
    });
    expect(harness.spawns[0].args).toContain('--restart-helper');
    expect(harness.spawns[0].args).toContain('--generation');
    expect(harness.spawns[0].args).toContain('--launch-token');
    expect(harness.spawns[0].env.GITHUB_TOKEN).toBeUndefined();
    expect(harness.unref).toHaveBeenCalledOnce();
    expect(harness.waitForParentExit).toHaveBeenCalledOnce();
  });

  test('reuses an exact install marker without a second npm install', async () => {
    const harness = effectHarness();

    await runWith(harness);
    const second = await runWith(harness);

    expect(second).toMatchObject({ ok: false, status: 'awaiting_runtime' });
    expect(harness.runInstall).toHaveBeenCalledTimes(1);
    const current = readManagedState({
      journal_path: managedJournalPath(repo, ATTEMPT),
      binding: binding()
    });
    expect(current).toMatchObject({
      ok: true,
      state: { stage: 'prepared', generation: 2 }
    });
  });

  test('rejects a tracked mutation created during dependency install', async () => {
    const harness = effectHarness();
    let status_reads = 0;
    harness.runGit = vi.fn(async (args) => {
      const key = args.join(' ');
      if (key === 'status --porcelain --untracked-files=no') {
        status_reads += 1;
        return {
          code: 0,
          stdout: status_reads === 1 ? '' : ' M server/index.js\n',
          stderr: ''
        };
      }
      return await gitRunner()(args);
    });

    const result = await runWith(harness);

    expect(result).toEqual({ ok: false, reason: 'candidate_status_dirty' });
    expect(harness.runInstall).toHaveBeenCalledOnce();
    expect(harness.spawnHelper).not.toHaveBeenCalled();
    expect(fs.existsSync(managedJournalPath(repo, ATTEMPT))).toBe(false);
    expect(fs.existsSync(runtimePointerPath())).toBe(false);
  });

  test('does not wait for parent termination on a mismatched ACK', async () => {
    const harness = effectHarness();
    harness.waitForAck = vi.fn(async (input) => ({
      stage: 'restart_committed',
      generation: input.generation,
      launch_token: 'different-token',
      helper: IDENTITY
    }));

    const result = await runWith(harness);

    expect(result).toMatchObject({
      ok: false,
      status: 'retryable',
      reason: 'helper_ack_missing'
    });
    expect(harness.waitForParentExit).not.toHaveBeenCalled();
  });

  test('rejects an ACK from a different helper process', async () => {
    const harness = effectHarness();
    harness.waitForAck = vi.fn(async (input) => ({
      stage: 'restart_committed',
      generation: input.generation,
      launch_token: input.launch_token,
      helper: { pid: 43, pgid: 43, started_at: 2 }
    }));

    const result = await runWith(harness);

    expect(result).toMatchObject({
      ok: false,
      status: 'retryable',
      reason: 'helper_ack_missing'
    });
    expect(harness.waitForParentExit).not.toHaveBeenCalled();
  });

  test('retries the same attempt after helper spawn fails before prerecord', async () => {
    const harness = effectHarness();
    harness.spawnHelper = vi.fn(() => {
      throw new Error('spawn-failed');
    });

    const first = await runWith(harness);
    harness.spawnHelper = vi.fn(() => ({
      pid: IDENTITY.pid,
      unref: harness.unref
    }));
    const second = await runWith(harness);

    expect(first).toMatchObject({
      ok: false,
      status: 'retryable',
      reason: 'helper_spawn_failed'
    });
    expect(second).toMatchObject({
      ok: false,
      status: 'awaiting_runtime'
    });
    expect(harness.runInstall).toHaveBeenCalledOnce();
    expect(harness.spawnHelper).toHaveBeenCalledOnce();
    expect(
      readManagedState({
        journal_path: managedJournalPath(repo, ATTEMPT),
        binding: binding()
      })
    ).toMatchObject({ state: { stage: 'prepared', generation: 2 } });
  });

  test('keeps an owned prerecorded helper without duplicate spawn', async () => {
    seedPrerecorded();
    const harness = effectHarness({ probe_state: 'owned' });

    const result = await runWith(harness);

    expect(result).toMatchObject({ ok: false, status: 'awaiting_runtime' });
    expect(harness.runInstall).not.toHaveBeenCalled();
    expect(harness.spawnHelper).not.toHaveBeenCalled();
    expect(harness.waitForParentExit).toHaveBeenCalledOnce();
  });

  test('returns a retryable result when a prerecorded helper is gone', async () => {
    const prerecorded = seedPrerecorded();
    const wait = vi.fn(async () => {});

    const result = await waitForRestartHandoff({
      journal_path: managedJournalPath(repo, ATTEMPT),
      binding: binding(),
      generation: prerecorded.state.generation,
      launch_token: prerecorded.state.launch_token,
      helper: prerecorded.state.helper,
      parent_pid: 99,
      process_controller: { probe: vi.fn(() => ({ state: 'gone' })) },
      currentParent: () => 99,
      wait
    });

    expect(result).toMatchObject({ state: 'precommit_gone' });
    expect(wait).not.toHaveBeenCalled();
  });

  test.each(['gone', 'recycled'])(
    'rolls a %s prerecorded helper to a new fenced generation',
    async (probe_state) => {
      seedPrerecorded();
      const harness = effectHarness({ probe_state });

      const result = await runWith(harness);

      expect(result).toMatchObject({ ok: false, status: 'awaiting_runtime' });
      const current = readManagedState({
        journal_path: managedJournalPath(repo, ATTEMPT),
        binding: binding()
      });
      expect(current).toMatchObject({
        ok: true,
        state: { stage: 'prepared', generation: 2 }
      });
      expect(harness.spawnHelper).toHaveBeenCalledOnce();
    }
  );

  test('fails closed on an unknown prerecorded helper identity', async () => {
    seedPrerecorded();
    const harness = effectHarness({ probe_state: 'unknown' });
    harness.processController.probe.mockReturnValue({
      state: 'unknown',
      reason: 'group_probe_failed'
    });

    const result = await runWith(harness);

    expect(result).toEqual({ ok: false, reason: 'group_probe_failed' });
    expect(harness.runInstall).not.toHaveBeenCalled();
    expect(harness.spawnHelper).not.toHaveBeenCalled();
  });

  test('never launches again from a committed journal', async () => {
    seedCommitted();
    const harness = effectHarness();

    const result = await runWith(harness);

    expect(result).toMatchObject({ ok: false, status: 'awaiting_runtime' });
    expect(harness.runInstall).not.toHaveBeenCalled();
    expect(harness.spawnHelper).not.toHaveBeenCalled();
  });

  test('recovers a receipt from an exact committed runtime without another restart', async () => {
    seedCommitted();
    const harness = effectHarness();
    const identity = runtimeIdentity();

    const result = await runWith(harness, {
      readRuntimeMarker: vi.fn(() => ({ ok: true, identity })),
      readRuntimeHealth: vi.fn(async () => ({
        ok: true,
        runtime: identity
      })),
      now: () => new Date('2026-08-11T00:01:00.000Z')
    });

    expect(result).toMatchObject({ ok: true, status: 'runtime_recovered' });
    expect(harness.runInstall).not.toHaveBeenCalled();
    expect(harness.spawnHelper).not.toHaveBeenCalled();
    const exact_binding = binding();
    const receipt = validateDeploymentReceipt({
      receipt_path: exact_binding.receipt_path,
      repo: exact_binding.repo,
      target_remote: exact_binding.target_remote,
      target_base: exact_binding.target_base,
      attempt_id: exact_binding.attempt_id,
      merged_floor_sha: exact_binding.merged_floor_sha,
      candidate_sha: exact_binding.candidate_sha,
      source_path: exact_binding.release_path
    });
    expect(receipt.ok).toBe(true);
    expect(receipt.ok && receipt.receipt.action_outcomes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          action: 'dependency_install',
          outcome: 'success'
        }),
        expect.objectContaining({
          action: 'pointer_cutover',
          outcome: 'success'
        }),
        expect.objectContaining({
          action: 'restart_handoff',
          outcome: 'success'
        }),
        expect.objectContaining({
          action: 'runtime_identity_readback',
          outcome: 'success'
        })
      ])
    );
    const receipt_before = fs.readFileSync(exact_binding.receipt_path);
    const readRuntimeMarker = vi.fn(() => ({ ok: true, identity }));
    const readRuntimeHealth = vi.fn(async () => ({
      ok: true,
      runtime: identity
    }));

    const reused = await runWith(harness, {
      readRuntimeMarker,
      readRuntimeHealth,
      now: () => new Date('2026-08-11T00:02:00.000Z')
    });

    expect(reused).toMatchObject({ ok: true, status: 'receipt_reused' });
    expect(fs.readFileSync(exact_binding.receipt_path)).toEqual(receipt_before);
    expect(readRuntimeMarker).not.toHaveBeenCalled();
    expect(readRuntimeHealth).not.toHaveBeenCalled();
  });

  test('installs and cuts over without restart when the exact candidate is already live', async () => {
    const harness = effectHarness();
    const identity = runtimeIdentity();

    const result = await runWith(harness, {
      readRuntimeMarker: vi.fn(() => ({ ok: true, identity })),
      readRuntimeHealth: vi.fn(async () => ({
        ok: true,
        runtime: identity
      }))
    });

    expect(result).toMatchObject({ ok: true, status: 'runtime_recovered' });
    expect(harness.runInstall).toHaveBeenCalledOnce();
    expect(harness.spawnHelper).not.toHaveBeenCalled();
    expect(fs.realpathSync(runtimePointerPath())).toBe(
      fs.realpathSync(release)
    );
  });

  test('reads one exact live runtime from the marker address', async () => {
    const identity = runtimeIdentity();
    const fetch_impl = vi.fn(async () => ({
      ok: true,
      json: async () => ({ ok: true, runtime: identity })
    }));

    const result = await readRuntimeHealth(
      identity,
      /** @type {any} */ (fetch_impl)
    );

    expect(result).toEqual({ ok: true, runtime: identity });
    expect(fetch_impl).toHaveBeenCalledWith(
      'http://127.0.0.1:3000/healthz',
      expect.objectContaining({ headers: { accept: 'application/json' } })
    );
  });

  test.each([
    ['marker protocol', { marker: { protocol_version: 2 } }],
    ['marker SHA', { marker: { source_sha: 'c'.repeat(40) } }],
    ['marker source path', { marker: { source_repo: repo } }],
    ['live PID', { live: { pid: 78 } }],
    ['live process start', { live: { process_started_at: 2_000 } }],
    [
      'live instance',
      { live: { instance_id: 'aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee' } }
    ],
    ['live source path', { live: { source_repo: repo } }],
    ['live SHA', { live: { source_sha: 'c'.repeat(40) } }],
    ['live host', { live: { host: 'localhost' } }],
    ['live port', { live: { port: 3001 } }]
  ])('rejects a committed runtime with a mismatched %s', async (_, changes) => {
    seedCommitted();
    const harness = effectHarness();
    const marker = runtimeIdentity('marker' in changes ? changes.marker : {});
    const live = runtimeIdentity('live' in changes ? changes.live : {});

    const result = await runWith(harness, {
      readRuntimeMarker: vi.fn(() => ({ ok: true, identity: marker })),
      readRuntimeHealth: vi.fn(async () => ({ ok: true, runtime: live }))
    });

    expect(result).toMatchObject({
      ok: false,
      reason: 'runtime_identity_mismatch'
    });
    expect(fs.existsSync(environment.BDUI_DEPLOY_RECEIPT_PATH)).toBe(false);
    expect(harness.runInstall).not.toHaveBeenCalled();
    expect(harness.spawnHelper).not.toHaveBeenCalled();
  });

  test('rejects a committed runtime whose live health is red', async () => {
    seedCommitted();
    const harness = effectHarness();
    const identity = runtimeIdentity();

    const result = await runWith(harness, {
      readRuntimeMarker: vi.fn(() => ({ ok: true, identity })),
      readRuntimeHealth: vi.fn(async () => ({
        ok: false,
        reason: 'runtime_health_red'
      }))
    });

    expect(result).toMatchObject({
      ok: false,
      reason: 'runtime_health_red'
    });
    expect(fs.existsSync(environment.BDUI_DEPLOY_RECEIPT_PATH)).toBe(false);
    expect(harness.spawnHelper).not.toHaveBeenCalled();
  });

  test('fences a delayed helper after prepared generation rollover', async () => {
    const prepared = seedPrepared('token-0001');
    seedPointer(prepared);
    const harness = effectHarness();
    harness.waitForAck = vi.fn(async () => null);
    await runWith(harness);
    let restarts = 0;

    const stale = await runRestartHelper({
      journal_path: managedJournalPath(repo, ATTEMPT),
      binding: binding(),
      expected_generation: 1,
      expected_launch_token: 'token-0001',
      identity: IDENTITY,
      restart: async () => {
        restarts += 1;
      }
    });

    expect(stale).toEqual({ ok: false, reason: 'helper_fenced' });
    expect(restarts).toBe(0);
    expect(
      readManagedState({
        journal_path: managedJournalPath(repo, ATTEMPT),
        binding: binding()
      })
    ).toMatchObject({ state: { stage: 'prepared', generation: 2 } });
  });

  test('commits before restart and lets one concurrent helper invoke it', async () => {
    const prepared = seedPrepared('token-0001');
    seedPointer(prepared);
    /** @type {() => void} */
    let releaseRestart = () => {
      throw new Error('restart_gate_not_initialized');
    };
    const restart_gate = new Promise((resolve) => {
      releaseRestart = () => resolve(undefined);
    });
    let restarts = 0;
    const first = runRestartHelper({
      journal_path: managedJournalPath(repo, ATTEMPT),
      binding: binding(),
      expected_generation: 1,
      expected_launch_token: 'token-0001',
      identity: IDENTITY,
      restart: async () => {
        restarts += 1;
        expect(
          readManagedState({
            journal_path: managedJournalPath(repo, ATTEMPT),
            binding: binding()
          })
        ).toMatchObject({ state: { stage: 'restart_committed' } });
        await restart_gate;
      }
    });
    const second = await runRestartHelper({
      journal_path: managedJournalPath(repo, ATTEMPT),
      binding: binding(),
      expected_generation: 1,
      expected_launch_token: 'token-0001',
      identity: { pid: 43, pgid: 43, started_at: 2 },
      restart: async () => {
        restarts += 1;
      }
    });
    releaseRestart();

    const completed = await first;

    expect(second).toEqual({ ok: false, reason: 'helper_fenced' });
    expect(completed).toMatchObject({ ok: true, stage: 'restart_launched' });
    expect(restarts).toBe(1);
  });

  test('records restart failure after commit and never invokes a retry', async () => {
    const prepared = seedPrepared('token-0001');
    seedPointer(prepared);
    let restarts = 0;
    const failed = await runRestartHelper({
      journal_path: managedJournalPath(repo, ATTEMPT),
      binding: binding(),
      expected_generation: 1,
      expected_launch_token: 'token-0001',
      identity: IDENTITY,
      restart: async () => {
        restarts += 1;
        throw new Error('project-manager-red');
      }
    });
    const duplicate = await runRestartHelper({
      journal_path: managedJournalPath(repo, ATTEMPT),
      binding: binding(),
      expected_generation: 1,
      expected_launch_token: 'token-0001',
      identity: IDENTITY,
      restart: async () => {
        restarts += 1;
      }
    });

    expect(failed).toMatchObject({
      ok: false,
      stage: 'restart_launched',
      reason: 'restart_failed',
      state: { result: { invoked: true, outcome: 'failure' } }
    });
    expect(duplicate).toEqual({ ok: false, reason: 'helper_fenced' });
    expect(restarts).toBe(1);
  });
});
