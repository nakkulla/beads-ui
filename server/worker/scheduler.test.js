import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { PassThrough } from 'node:stream';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { EXEC_SETTING_KEYS } from './exec-enums.js';
import { install as guardHookInstall } from './guard-hook.js';
import { resolveExecSettings } from './policy.js';
import { createQueueStore } from './queue-store.js';
import { claudeSpec } from './runner/claude.js';
import { makeFixtureSpawn } from './runner/fixture-spawn.js';
import { createRunner } from './runner/index.js';
import { runSession } from './runner/session.js';
import { createScheduler } from './scheduler.js';
import { guardHookDir, usageReceiptInboxDir } from './state-paths.js';
import { createUsageStore } from './usage-store.js';

const WS = '/tmp/example-workspace/project-a';

/** @type {string} */
let tmp_state;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-sched-'));
  process.env.XDG_STATE_HOME = tmp_state;
});

describe('scheduler retired cleanup diagnosis compatibility (UI-ckgr)', () => {
  /**
   * @param {any} store
   * @param {'running'|'paused'} status
   * @param {number|null} pid
   */
  function seedLegacyDiagnosis(store, status, pid) {
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'legacy-diagnosis',
        bead_id: 'B1',
        cleanup_diagnosis: true,
        cleanup_diagnosis_result_path: '/legacy-result.json'
      }
    });
    store.updateAttempt(WS, {
      attempt_id: 'legacy-diagnosis',
      patch: { status, pid, repo: '/repo', session_id: 'legacy-session' }
    });
  }

  test('does not expose an active cleanup diagnosis dispatcher', () => {
    const env = setup({ config: { B1: {} } });

    expect(
      /** @type {any} */ (env.scheduler).dispatchCleanupDiagnosis
    ).toBeUndefined();
  });

  test.each(['running', 'paused'])(
    'settles an orphaned %s legacy diagnosis once without launching a session',
    async (status) => {
      const env = setup({
        config: { B1: {} },
        probePid: () => ({ alive: false, started_at: null })
      });
      seedLegacyDiagnosis(
        env.store,
        /** @type {'running'|'paused'} */ (status),
        null
      );

      await env.scheduler.reconcile(WS);
      await env.scheduler.reconcile(WS);

      expect(env.store.snapshot(WS).attempts['legacy-diagnosis']).toMatchObject(
        {
          status: 'orphaned',
          cause: 'legacy_cleanup_diagnosis_retired',
          finished_at: 1000
        }
      );
      expect(env.runner.spawnOrder).toEqual([]);
    }
  );

  test('leaves a legacy diagnosis with a matching live process to settle naturally', async () => {
    const env = setup({
      config: { B1: {} },
      probePid: () => ({ alive: true, started_at: 1000 })
    });
    seedLegacyDiagnosis(env.store, 'running', 4321);

    await env.scheduler.reconcile(WS);

    expect(env.store.snapshot(WS).attempts['legacy-diagnosis'].status).toBe(
      'running'
    );
    expect(env.runner.spawnOrder).toEqual([]);
  });

  test('leaves a legacy diagnosis with a live session to settle naturally', async () => {
    const env = setup({
      config: { B1: {} },
      probePid: () => ({ alive: false, started_at: null })
    });
    seedQueue(env.store, ['B1']);

    await env.scheduler.tick(WS);
    env.store.updateAttempt(WS, {
      attempt_id: 'B1-1000-1',
      patch: { cleanup_diagnosis: true }
    });

    await env.scheduler.reconcile(WS);

    expect(env.store.snapshot(WS).attempts['B1-1000-1'].status).toBe('running');
  });

  test('preserves a paused legacy diagnosis with a live process when resume is refused', async () => {
    const env = setup({
      config: { B1: {} },
      probePid: () => ({ alive: true, started_at: 1000 })
    });
    seedLegacyDiagnosis(env.store, 'paused', 4321);

    const result = await env.scheduler.resume(WS, 'legacy-diagnosis');

    expect(result).toEqual({
      ok: false,
      reason: 'legacy_cleanup_diagnosis_retired'
    });
    expect(env.store.snapshot(WS).attempts['legacy-diagnosis']).toMatchObject({
      status: 'paused',
      pid: 4321,
      session_id: 'legacy-session'
    });
  });

  test('preserves a failed terminal legacy diagnosis when resume is refused', async () => {
    const env = setup({ config: { B1: {} } });
    seedLegacyDiagnosis(env.store, 'paused', null);
    env.store.updateAttempt(WS, {
      attempt_id: 'legacy-diagnosis',
      patch: {
        status: 'failed',
        cause: 'historical_failure',
        finished_at: 123
      }
    });

    const result = await env.scheduler.resume(WS, 'legacy-diagnosis');

    expect(result).toEqual({
      ok: false,
      reason: 'legacy_cleanup_diagnosis_retired'
    });
    expect(env.store.snapshot(WS).attempts['legacy-diagnosis']).toMatchObject({
      status: 'failed',
      cause: 'historical_failure',
      finished_at: 123
    });
  });

  test('retires a paused missing-process legacy diagnosis instead of resuming it', async () => {
    const env = setup({ config: { B1: {} } });
    seedLegacyDiagnosis(env.store, 'paused', null);

    const result = await env.scheduler.resume(WS, 'legacy-diagnosis');

    expect(result).toEqual({
      ok: false,
      reason: 'legacy_cleanup_diagnosis_retired'
    });
    expect(env.store.snapshot(WS).attempts['legacy-diagnosis']).toMatchObject({
      status: 'orphaned',
      cause: 'legacy_cleanup_diagnosis_retired',
      finished_at: 1000
    });
    expect(env.runner.spawnOrder).toEqual([]);
  });
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

/**
 * @returns {Promise<void>}
 */
function flush() {
  return new Promise((r) => setImmediate(r));
}

/**
 * Publish one exact v1 receipt into an attempt's deterministic inbox.
 *
 * @param {string} attempt_id
 * @param {string} [receipt_id]
 * @returns {string}
 */
function writeUsageReceipt(attempt_id, receipt_id = 'late-receipt') {
  const inbox = usageReceiptInboxDir(WS, attempt_id);
  fs.mkdirSync(inbox, { recursive: true, mode: 0o700 });
  fs.chmodSync(inbox, 0o700);
  const file = path.join(inbox, `${receipt_id}.json`);
  fs.writeFileSync(
    file,
    JSON.stringify({
      schema: 'codex-usage-receipt-v1',
      receipt_id,
      attempt_id,
      provider: 'codex',
      role: 'implementation',
      thread_id: 'thread-late',
      turn_id: 'turn-late',
      model: 'gpt-5.6-terra',
      usage: {
        input_tokens: 5,
        output_tokens: 3,
        cache_read_input_tokens: 2,
        cache_creation_input_tokens: 1,
        reasoning_output_tokens: 2
      },
      completed_at: '2026-08-11T12:34:56Z'
    }),
    { mode: 0o600 }
  );
  fs.chmodSync(file, 0o600);
  return file;
}

/**
 * Fake runner factory: each spawn returns a handle whose `done` stays pending
 * until the test resolves it. Records every spawn.
 */
function makeFakeRunner() {
  /** @type {Map<string, { handle: any, resolve: (v: any) => void, settings: any }>} */
  const byBead = new Map();
  /** @type {string[]} */
  const spawnOrder = [];
  /**
   * The runner NAME each launch asked the factory for, in call order.
   *
   * @type {string[]}
   */
  const factoryNames = [];
  const factory = (/** @type {string} */ runner_name) => {
    factoryNames.push(runner_name);
    return {
      name: runner_name,
      /**
       * @param {any} bead
       * @param {string} ws
       * @param {any} settings
       */
      spawn(bead, ws, settings) {
        const events = new EventEmitter();
        /** @type {(v: any) => void} */
        let resolveDone = () => {};
        const done = new Promise((res) => {
          resolveDone = res;
        });
        const handle = {
          pid: 9000 + spawnOrder.length,
          process_identity: {
            pid: 9000 + spawnOrder.length,
            pgid: 9000 + spawnOrder.length,
            started_at: 1_000
          },
          kill: vi.fn(),
          events,
          done
        };
        byBead.set(
          bead.id,
          /** @type {any} */ ({
            handle,
            resolve: resolveDone,
            settings,
            bead,
            cwd: ws
          })
        );
        spawnOrder.push(bead.id);
        return handle;
      }
    };
  };
  return {
    factory,
    spawnOrder,
    factoryNames,
    /**
     * @param {string} bead_id
     * @param {Partial<{ success: boolean, reason: string, exit: number | null, blocked: boolean, blocked_detail: { reason: string, command: string|null }|null, events: any[] }>} v
     */
    finish(bead_id, v) {
      const rec = byBead.get(bead_id);
      if (!rec) {
        throw new Error(`no session for ${bead_id}`);
      }
      rec.resolve({
        success: v.success ?? true,
        reason: v.reason ?? 'ok',
        exit: v.exit ?? 0,
        blocked: v.blocked ?? false,
        blocked_detail: v.blocked_detail ?? null,
        events: v.events ?? [],
        raw: []
      });
    },
    settingsFor(/** @type {string} */ bead_id) {
      return byBead.get(bead_id)?.settings;
    },
    /** The spawn literal a dispatch/resume passed to the adapter. */
    spawnedBead(/** @type {string} */ bead_id) {
      return /** @type {any} */ (byBead.get(bead_id))?.bead;
    },
    /** The working directory the session was spawned in. */
    cwdFor(/** @type {string} */ bead_id) {
      return /** @type {any} */ (byBead.get(bead_id))?.cwd;
    },
    killFor(/** @type {string} */ bead_id) {
      return byBead.get(bead_id)?.handle.kill;
    },
    /**
     * The live handle's event emitter for a bead — lets a test drive the
     * runner's `session_id` event (spec §2).
     *
     * @param {string} bead_id
     * @returns {EventEmitter}
     */
    eventsFor(bead_id) {
      return byBead.get(bead_id)?.handle.events;
    }
  };
}

/**
 * Build a fake bd with per-bead snapshots + captured metadata calls.
 *
 * @param {Record<string, Partial<import('./scheduler.js').BeadSnapshot>>} config
 */
function makeFakeBd(config) {
  /** @type {Array<{ method: string, bead_id: string, key?: string, value?: string }>} */
  const calls = [];
  /**
   * Live bd status per bead, seeded from the config's `status` so a test can
   * model a session that ended still holding its `in_progress` claim.
   *
   * @type {Record<string, string>}
   */
  const statuses = {};
  for (const [bead_id, c] of Object.entries(config)) {
    if (c && typeof c.status === 'string' && c.status.length > 0) {
      statuses[bead_id] = c.status;
    }
  }
  /**
   * Per-bead snapshot call count, so a test can make the SECOND read (the
   * dispatch re-read) disagree with the first (the tick scan) — the TOCTOU
   * window the dispatch guards cover.
   *
   * @type {Record<string, number>}
   */
  const snapshot_calls = {};
  let snapshotCount = 0;
  return {
    calls,
    statuses,
    snapshotCounts: () => snapshotCount,
    /**
     * @param {string} bead_id
     * @returns {Promise<import('./scheduler.js').BeadSnapshot>}
     */
    async snapshotBead(bead_id) {
      snapshotCount += 1;
      const nth = (snapshot_calls[bead_id] =
        (snapshot_calls[bead_id] ?? 0) + 1);
      const c = /** @type {any} */ (config[bead_id] || {});
      if (c.throwOnSnapshotAt === 'all' || c.throwOnSnapshotAt === nth) {
        throw new Error(`bd snapshot failed for ${bead_id}`);
      }
      // `ready_follows_status` models bd's real rule — an `in_progress` bead is
      // hidden from `bd ready` — for the tests that turn on the claim.
      const ready = c.ready_follows_status
        ? (statuses[bead_id] ?? 'open') === 'open'
        : (c.ready ?? true);
      // `null` in config means the bead metadata key is ABSENT (undefined),
      // vs. omitted keys which fall back to a present default — this lets a
      // test model a bead that leaves model/effort unset so a global default
      // can fill (and stamp) it.
      return {
        ready: c.notReadyAt === nth ? false : ready,
        blocked: c.blocked ?? false,
        repo: c.repo ?? '/repo',
        target_base: c.target_base ?? 'main',
        model: c.model === null ? undefined : (c.model ?? 'opus'),
        effort: c.effort === null ? undefined : (c.effort ?? 'high'),
        orchestration_speed:
          c.orchestration_speed === null
            ? undefined
            : (c.orchestration_speed ?? undefined),
        spec_review_model: c.spec_review_model ?? undefined,
        impl_model: c.impl_model ?? undefined,
        workflow_mode: c.workflow_mode ?? null,
        route: c.route ?? null,
        status: c.status ?? '',
        title: c.title ?? null,
        labels:
          c.workerIneligibleAt === nth
            ? ['worker-ineligible']
            : (c.labels ?? []),
        spec_review: c.spec_review,
        deps: c.deps ?? []
      };
    },
    async setMetadata(
      /** @type {string} */ bead_id,
      /** @type {string} */ key,
      /** @type {string} */ value
    ) {
      // A bead may be configured to make its workflow_mode set throw (F9), or
      // to make one exec-setting key's stamp throw (exec partial-failure).
      const cfg = /** @type {any} */ (config[bead_id]);
      if (cfg && cfg.throwOnSet && key === 'workflow_mode') {
        throw new Error(`bd set-metadata failed for ${bead_id}`);
      }
      if (cfg && cfg.throwOnSetKey === key) {
        throw new Error(`bd set-metadata failed for ${bead_id} ${key}`);
      }
      if (cfg && typeof cfg.onSet === 'function') {
        cfg.onSet({ bead_id, key, value });
      }
      calls.push({ method: 'setMetadata', bead_id, key, value });
    },
    async unsetMetadata(
      /** @type {string} */ bead_id,
      /** @type {string} */ key
    ) {
      const cfg = /** @type {any} */ (config[bead_id]);
      if (cfg && cfg.throwOnUnset && key === 'workflow_mode') {
        throw new Error(`bd unset-metadata failed for ${bead_id}`);
      }
      calls.push({ method: 'unsetMetadata', bead_id, key });
    },
    async readMetadata(
      /** @type {string} */ bead_id,
      /** @type {string} */ key
    ) {
      // A bead may be configured to make ONE exec-setting key's readback throw
      // (set succeeds, confirming read fails) — the exec-stamp readback-failure
      // cleanup case.
      const cfg = /** @type {any} */ (config[bead_id]);
      if (cfg && typeof cfg.onRead === 'function') {
        cfg.onRead({ bead_id, key });
      }
      if (cfg && cfg.throwOnReadKey === key) {
        throw new Error(`bd read-metadata failed for ${bead_id} ${key}`);
      }
      // Readback of the fast_track we just set.
      const last = [...calls]
        .reverse()
        .find(
          (c) =>
            (c.method === 'setMetadata' || c.method === 'unsetMetadata') &&
            c.bead_id === bead_id &&
            c.key === key
        );
      return last?.method === 'setMetadata' ? (last.value ?? null) : null;
    },
    async setStatus(
      /** @type {string} */ bead_id,
      /** @type {string} */ status
    ) {
      const cfg = /** @type {any} */ (config[bead_id]);
      if (cfg && cfg.throwOnSetStatus) {
        throw new Error(`bd update --status failed for ${bead_id}`);
      }
      calls.push({ method: 'setStatus', bead_id, value: status });
      statuses[bead_id] = status;
    },
    async readStatus(/** @type {string} */ bead_id) {
      const cfg = /** @type {any} */ (config[bead_id]);
      if (cfg && cfg.throwOnReadStatus) {
        throw new Error(`bd show failed for ${bead_id}`);
      }
      // A bead configured to swallow its status write reads back unchanged —
      // the readback-failure case.
      return cfg && cfg.readStatusStuck
        ? (cfg.status ?? null)
        : (statuses[bead_id] ?? null);
    }
  };
}

/**
 * @param {{ config: Record<string, any>, store?: any, slots?: number, verifyOk?: boolean, verify?: any, probePid?: (pid: number|null) => { alive: boolean, started_at: number|null }, processController?: any, makeRunner?: (name: string) => any, admission?: any, resolveBase?: any, notify?: any, disposition?: any, repairSession?: any, externalPrs?: Record<string, any>, execPresetCoordinator?: any, notifyQueueChanged?: (workspace: string) => void, usage?: null, usageReceipts?: any, sessionLog?: any, sessionMonitors?: any, guardHook?: any, gitRun?: any, fs?: { existsSync: (path: string) => boolean }, onCompletionAttemptSettled?: any, onDeploymentRecoveryAttemptSettled?: any }} opts
 */
function setup(opts) {
  const store = /** @type {ReturnType<typeof createQueueStore>} */ (
    opts.store || createQueueStore()
  );
  const runner = makeFakeRunner();
  const bd = makeFakeBd(opts.config);
  const execPresetCoordinator = opts.execPresetCoordinator || {
    /**
     * @param {string} workspace
     * @param {import('./scheduler.js').BeadSnapshot} bead
     */
    resolveForDispatch(workspace, bead) {
      return {
        ok: true,
        preset_id: null,
        preset_revision: null,
        settings: {},
        exec: resolveExecSettings({
          bead,
          defaults: {
            orchestration_model:
              store.snapshot(workspace).orchestration_model ?? undefined,
            orchestration_effort:
              store.snapshot(workspace).orchestration_effort ?? undefined,
            orchestration_speed:
              store.snapshot(workspace).orchestration_speed ?? undefined
          }
        })
      };
    }
  };
  const verify = opts.verify || {
    verifyPrSubmitted: vi.fn(async () => ({
      ok: opts.verifyOk ?? true,
      reason: (opts.verifyOk ?? true) ? 'ok' : 'pr_missing',
      pr_url: (opts.verifyOk ?? true) ? 'https://github.com/o/r/pull/1' : null
    }))
  };
  const worktree = {
    add: vi.fn(async ({ bead_id }) => ({
      path: `/wt/${bead_id}`,
      branch: bead_id,
      base_oid: `base-${bead_id}`
    })),
    remove: vi.fn(async () => ({ code: 0 })),
    // Default: no residue in the way (the primitive's own verdicts are covered
    // against real git in worktree.integration.test.js). Loosely typed so a
    // test can swap in a refusing or throwing variant.
    removeIfDiscardable: /** @type {any} */ (
      vi.fn(async () => ({ ok: true, removed: false, reason: null }))
    ),
    addDetached: vi.fn(async (/** @type {any} */ { name }) => ({
      path: `/wt-verify/${name}`
    })),
    removeDetached: vi.fn(async () => ({ code: 0 })),
    pathFor: (/** @type {string} */ _repo, /** @type {string} */ bead_id) =>
      `/wt/${bead_id}`,
    exists: vi.fn(() => true)
  };
  const sessionLog = opts.sessionLog || { attach: vi.fn() };
  const usage = opts.usage === null ? undefined : createUsageStore();
  const gitRun =
    opts.gitRun ||
    vi.fn(async (args, options = {}) => {
      if (args.includes('--abbrev-ref')) {
        return {
          code: 0,
          stdout: `${path.basename(options.cwd || '')}\n`,
          stderr: ''
        };
      }
      if (args[0] === 'ls-remote') {
        return { code: 0, stdout: '', stderr: '' };
      }
      return { code: 1, stdout: '', stderr: '' };
    });
  const scheduler = createScheduler({
    store,
    makeRunner: opts.makeRunner || runner.factory,
    bd,
    worktree,
    verify,
    sessionLog,
    usage,
    usageReceipts: opts.usageReceipts,
    admission: opts.admission,
    resolveBase: opts.resolveBase,
    notify: opts.notify,
    disposition: opts.disposition,
    repairSession: opts.repairSession,
    // Absent by default: the external registry is a live-wiring dep, and a
    // scheduler built without it must refuse the external dispatch outright.
    externalPrs: opts.externalPrs
      ? {
          get: (/** @type {string} */ _ws, /** @type {string} */ bead_id) =>
            /** @type {any} */ (opts.externalPrs)[bead_id] || null
        }
      : undefined,
    probePid: opts.probePid,
    processController: opts.processController,
    sessionMonitors: opts.sessionMonitors,
    execPresetCoordinator,
    // Absent ⇒ the REAL guard-hook module, writing under the tmp
    // XDG_STATE_HOME this file arms. An override is only how a test drives an
    // install failure (UI-8mvc §2).
    guardHook: opts.guardHook,
    // The post-hoc base observation's two runners (UI-8mvc §3). Absent by
    // default: a scheduler built without them records the observation as
    // undone rather than judging an attempt it could not observe.
    gitRun,
    fs: opts.fs || { existsSync: () => true },
    notifyQueueChanged: opts.notifyQueueChanged,
    onCompletionAttemptSettled: opts.onCompletionAttemptSettled,
    now: () => 1000
  });
  // The concurrency cap lives in the STORE now (worker-phase2 §3), not in a
  // constructor dep, so a test sets it exactly the way the UI does.
  store.setSlots(WS, {
    expected_revision: store.snapshot(WS).revision,
    slots: opts.slots ?? 2
  });
  return { store, runner, bd, verify, worktree, scheduler, usage };
}

/**
 * Seed the single waiting lane in order and arm auto_advance.
 *
 * @param {any} store
 * @param {string[]} ids
 */
function seedQueue(store, ids) {
  let rev = store.snapshot(WS).revision;
  for (const id of ids) {
    rev = store.place(WS, {
      expected_revision: rev,
      bead_id: id
    }).queue.revision;
  }
  store.setAutoAdvance(WS, true);
}

/**
 * Park one bead in the durable PR-wait lane.
 *
 * @param {any} store
 * @param {string} bead_id
 */
function seedPrWait(store, bead_id) {
  const attempt_id = `att-${bead_id}`;
  store.appendAttempt(WS, {
    expected_revision: store.snapshot(WS).revision,
    attempt: { attempt_id, bead_id }
  });
  store.moveToPrWait(WS, {
    bead_id,
    attempt_id,
    patch: { status: 'done' }
  });
}

/**
 * @param {any} store
 * @param {string} bead_id
 * @param {string|null} [attempt_id]
 */
function seedActiveDiscard(store, bead_id, attempt_id = null) {
  store.createDiscardOperation(WS, {
    expected_revision: store.snapshot(WS).revision,
    operation: {
      operation_id: `discard-${bead_id}`,
      bead_id,
      attempt_id,
      source_snapshot: { repo: '/repo', branch: bead_id }
    }
  });
}

const COMPLETION_FAILURE = {
  stage: 'merge_gate',
  reason: 'verify_cmd_failed',
  subject_sha: 'a'.repeat(40),
  base_sha: 'b'.repeat(40),
  result_digest: 'c'.repeat(64)
};

/**
 * @param {any} store
 * @param {string|null} [repair_bead_id]
 */
function seedCompletionIntent(store, repair_bead_id = null) {
  seedPrWait(store, 'B1');
  store.updateAttempt(WS, {
    attempt_id: 'att-B1',
    patch: {
      repo: '/repo',
      target_base: 'main',
      base_oid: COMPLETION_FAILURE.base_sha,
      runner: 'claude',
      model: 'opus',
      effort: 'high',
      session_id: 'session-root',
      finished_at: 10
    }
  });
  store.enqueueCompletionIntent(WS, {
    root_bead_id: 'B1',
    source_attempt_id: 'att-B1',
    target_base: 'main',
    subject: {
      role: 'root',
      bead_id: 'B1',
      pr_url: 'https://github.com/o/r/pull/1',
      head_sha: COMPLETION_FAILURE.subject_sha,
      base_sha: COMPLETION_FAILURE.base_sha,
      merged_sha: null
    }
  });
  if (repair_bead_id) {
    store.prepareCompletionOp(WS, {
      root_bead_id: 'B1',
      phase: 'repairing',
      op: {
        op_id: 'create-child',
        kind: 'create_repair',
        failure_key: COMPLETION_FAILURE,
        attempt_id: null,
        repair_bead_id: null,
        status: 'prepared'
      }
    });
    store.recordCompletionRepairBead(WS, {
      root_bead_id: 'B1',
      op_id: 'create-child',
      repair_bead_id
    });
    store.advanceCompletionOp(WS, {
      root_bead_id: 'B1',
      op_id: 'create-child',
      status: 'consumed',
      next_phase: 'repairing',
      clear: true
    });
  }
}

describe('scheduler completion repair dispatch', () => {
  /**
   * @param {() => void} [on_branch_tip]
   * @returns {any}
   */
  function ownedGit(on_branch_tip) {
    return vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'rev-parse' && args[1] === '--abbrev-ref') {
        return { code: 0, stdout: 'B1\n', stderr: '' };
      }
      if (args[0] === 'rev-parse' && args[1].startsWith('refs/heads/')) {
        if (on_branch_tip) {
          on_branch_tip();
        }
        return { code: 0, stdout: `${'d'.repeat(40)}\n`, stderr: '' };
      }
      return { code: 0, stdout: '', stderr: '' };
    });
  }

  test('resumes the latest same-Bead transcript with the preallocated attempt', async () => {
    const env = setup({ config: { B1: {} }, gitRun: ownedGit(), slots: 1 });
    seedCompletionIntent(env.store);
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'newer', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'newer',
      patch: {
        status: 'done',
        repo: '/repo',
        target_base: 'main',
        base_oid: COMPLETION_FAILURE.base_sha,
        runner: 'claude',
        model: 'opus',
        effort: 'high',
        speed: 'fast',
        session_id: 'session-latest',
        finished_at: 20
      }
    });
    const op = {
      op_id: 'resume-op',
      kind: 'resume_root',
      failure_key: COMPLETION_FAILURE,
      attempt_id: 'repair-attempt-1',
      repair_bead_id: null,
      status: 'prepared'
    };

    const result = await env.scheduler.dispatchCompletionRepair(WS, {
      root_bead_id: 'B1',
      op
    });

    expect(result).toEqual({ ok: true, attempt_id: 'repair-attempt-1' });
    expect(env.runner.settingsFor('B1')).toMatchObject({
      resume_session_id: 'session-latest',
      speed: 'default',
      completion_repair: { mode: 'resume_root' }
    });
    expect(env.store.snapshot(WS).attempts['repair-attempt-1']).toMatchObject({
      resumed_from: 'newer',
      completion_root_id: 'B1',
      completion_op_id: 'resume-op'
    });
    expect(
      env.store.snapshot(WS).completion_intents.B1.repair_sessions_used
    ).toBe(1);
  });

  test('admits a post-merge failure whose subject matches the merged sha', async () => {
    const env = setup({ config: { B1: {} }, gitRun: ownedGit(), slots: 1 });
    seedCompletionIntent(env.store);
    const merged_sha = 'e'.repeat(40);
    env.store.setCompletionSubject(WS, {
      root_bead_id: 'B1',
      phase: 'gating',
      subject: {
        role: 'root',
        bead_id: 'B1',
        pr_url: 'https://github.com/o/r/pull/1',
        head_sha: COMPLETION_FAILURE.subject_sha,
        base_sha: COMPLETION_FAILURE.base_sha,
        merged_sha
      }
    });

    const result = await env.scheduler.dispatchCompletionRepair(WS, {
      root_bead_id: 'B1',
      op: {
        op_id: 'post-merge-op',
        kind: 'resume_root',
        failure_key: { ...COMPLETION_FAILURE, subject_sha: merged_sha },
        attempt_id: 'post-merge-attempt',
        repair_bead_id: null,
        status: 'prepared'
      }
    });

    expect(result).toEqual({ ok: true, attempt_id: 'post-merge-attempt' });
    expect(env.runner.settingsFor('B1')).toMatchObject({
      completion_repair: {
        subject_sha: merged_sha
      }
    });
  });

  test('refuses a vanished completion resume after the final branch-tip await', async () => {
    let present = true;
    const env = setup({
      config: { B1: { status: 'open' } },
      gitRun: ownedGit(() => {
        present = false;
      }),
      fs: { existsSync: () => present },
      slots: 1
    });
    seedCompletionIntent(env.store);
    env.store.setAutoAdvance(WS, true);

    const result = await env.scheduler.dispatchCompletionRepair(WS, {
      root_bead_id: 'B1',
      op: {
        op_id: 'missing-resume-op',
        kind: 'resume_root',
        failure_key: COMPLETION_FAILURE,
        attempt_id: 'missing-resume-attempt',
        repair_bead_id: null,
        status: 'prepared'
      }
    });

    const live = env.store.snapshot(WS);
    const cold = createQueueStore().snapshot(WS);
    expect(result).toEqual({ ok: false, reason: 'worktree_missing' });
    expect(env.runner.spawnOrder).toEqual([]);
    expect(live.auto_advance).toBe(true);
    expect(cold.attempts['missing-resume-attempt']).toMatchObject({
      status: 'failed',
      cause: 'worktree_missing',
      dismissed_at: 1000
    });
    expect(
      Object.values(cold.attempts).filter(
        (attempt) => attempt.status === 'running'
      )
    ).toEqual([]);
    expect(
      fs.existsSync(usageReceiptInboxDir(WS, 'missing-resume-attempt'))
    ).toBe(false);
  });

  test('ends a vanished closed completion resume as repair_target_resolved', async () => {
    const env = setup({
      config: { B1: { status: 'closed' } },
      gitRun: ownedGit(),
      slots: 1
    });
    env.worktree.exists.mockReturnValueOnce(true).mockReturnValueOnce(false);
    seedCompletionIntent(env.store);
    env.store.setAutoAdvance(WS, true);

    const result = await env.scheduler.dispatchCompletionRepair(WS, {
      root_bead_id: 'B1',
      op: {
        op_id: 'closed-resume-op',
        kind: 'resume_root',
        failure_key: COMPLETION_FAILURE,
        attempt_id: 'closed-resume-attempt',
        repair_bead_id: null,
        status: 'prepared'
      }
    });

    const live = env.store.snapshot(WS);
    const cold = createQueueStore().snapshot(WS);
    expect(result).toEqual({ ok: false, reason: 'repair_target_resolved' });
    expect(env.runner.spawnOrder).toEqual([]);
    expect(live.auto_advance).toBe(true);
    expect(cold.attempts['closed-resume-attempt']).toMatchObject({
      status: 'failed',
      cause: 'repair_target_resolved',
      dismissed_at: 1000
    });
    expect(
      Object.values(cold.attempts).filter(
        (attempt) => attempt.status === 'running'
      )
    ).toEqual([]);
  });

  test('falls back to a fresh same-Bead session only with owned worktree proof', async () => {
    const env = setup({ config: { B1: {} }, gitRun: ownedGit(), slots: 1 });
    seedCompletionIntent(env.store);
    env.store.updateAttempt(WS, {
      attempt_id: 'att-B1',
      patch: { session_id: null }
    });
    const op = {
      op_id: 'fresh-root-op',
      kind: 'resume_root',
      failure_key: COMPLETION_FAILURE,
      attempt_id: 'repair-attempt-2',
      repair_bead_id: null,
      status: 'prepared'
    };

    const result = await env.scheduler.dispatchCompletionRepair(WS, {
      root_bead_id: 'B1',
      op
    });

    expect(result).toEqual({ ok: false, reason: 'no_session_id' });
    expect(env.runner.settingsFor('B1')).toBeUndefined();
  });

  test('resumes the latest attempt that actually captured a session id', async () => {
    const env = setup({ config: { B1: {} }, gitRun: ownedGit(), slots: 1 });
    seedCompletionIntent(env.store);
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'newer-without-session', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'newer-without-session',
      patch: {
        status: 'failed',
        repo: '/repo',
        target_base: 'main',
        runner: 'codex',
        model: 'sol',
        effort: 'xhigh',
        session_id: null,
        finished_at: 20
      }
    });

    const result = await env.scheduler.dispatchCompletionRepair(WS, {
      root_bead_id: 'B1',
      op: {
        op_id: 'resume-valid-transcript',
        kind: 'resume_root',
        failure_key: COMPLETION_FAILURE,
        attempt_id: 'repair-attempt-valid-transcript',
        repair_bead_id: null,
        status: 'prepared'
      }
    });

    expect(result.ok).toBe(true);
    expect(env.runner.settingsFor('B1')).toMatchObject({
      resume_session_id: 'session-root',
      model: 'opus',
      effort: 'high'
    });
    expect(
      env.store.snapshot(WS).attempts['repair-attempt-valid-transcript']
    ).toMatchObject({ resumed_from: 'att-B1', runner: 'claude' });
  });

  test('refuses a transcript-missing fallback when the worktree owns another branch', async () => {
    const gitRun = vi.fn(async (/** @type {string[]} */ args) => ({
      code: 0,
      stdout: args[1] === '--abbrev-ref' ? 'other\n' : `${'d'.repeat(40)}\n`,
      stderr: ''
    }));
    const env = setup({ config: { B1: {} }, gitRun, slots: 1 });
    seedCompletionIntent(env.store);
    env.store.updateAttempt(WS, {
      attempt_id: 'att-B1',
      patch: { session_id: null }
    });

    const result = await env.scheduler.dispatchCompletionRepair(WS, {
      root_bead_id: 'B1',
      op: {
        op_id: 'wrong-branch',
        kind: 'resume_root',
        failure_key: COMPLETION_FAILURE,
        attempt_id: 'repair-attempt-3',
        repair_bead_id: null,
        status: 'prepared'
      }
    });

    expect(result).toEqual({ ok: false, reason: 'worktree_branch_mismatch' });
    expect(
      env.store.snapshot(WS).completion_intents.B1.repair_sessions_used
    ).toBe(0);
  });

  test('cuts a linked repair worktree from the pinned base before a fresh launch', async () => {
    const repair_bead_id = 'B1-rcccccccc';
    const env = setup({
      config: { B1: {}, [repair_bead_id]: {} },
      gitRun: ownedGit(),
      slots: 1
    });
    seedCompletionIntent(env.store, repair_bead_id);
    env.worktree.exists.mockReturnValue(false);
    env.worktree.add.mockImplementation(async ({ bead_id, base }) => ({
      path: `/wt/${bead_id}`,
      branch: bead_id,
      base_oid: base
    }));

    const result = await env.scheduler.dispatchCompletionRepair(WS, {
      root_bead_id: 'B1',
      op: {
        op_id: 'repair-child-op',
        kind: 'dispatch_repair',
        failure_key: COMPLETION_FAILURE,
        attempt_id: 'repair-attempt-4',
        repair_bead_id,
        status: 'prepared'
      }
    });

    expect(result.ok).toBe(true);
    expect(env.worktree.add).toHaveBeenCalledWith({
      repo: '/repo',
      bead_id: repair_bead_id,
      base: COMPLETION_FAILURE.base_sha
    });
    expect(env.runner.cwdFor(repair_bead_id)).toBe(`/wt/${repair_bead_id}`);
    expect(env.runner.settingsFor(repair_bead_id)).toMatchObject({
      completion_repair: { mode: 'dispatch_repair' },
      base_oid: COMPLETION_FAILURE.base_sha
    });
  });

  test('atomically replaces a recorded create operation with its repair dispatch', async () => {
    const repair_bead_id = 'B1-rcccccccc';
    const env = setup({
      config: { B1: {}, [repair_bead_id]: {} },
      gitRun: ownedGit(),
      slots: 1
    });
    seedCompletionIntent(env.store, repair_bead_id);
    env.store.prepareCompletionOp(WS, {
      root_bead_id: 'B1',
      phase: 'repairing',
      op: {
        op_id: 'create-atomic',
        kind: 'create_repair',
        failure_key: COMPLETION_FAILURE,
        attempt_id: null,
        repair_bead_id: null,
        status: 'prepared'
      }
    });
    env.store.recordCompletionRepairBead(WS, {
      root_bead_id: 'B1',
      op_id: 'create-atomic',
      repair_bead_id
    });
    env.worktree.exists.mockReturnValue(false);
    env.worktree.add.mockImplementation(async ({ bead_id, base }) => ({
      path: `/wt/${bead_id}`,
      branch: bead_id,
      base_oid: base
    }));

    const result = await env.scheduler.dispatchCompletionRepair(WS, {
      root_bead_id: 'B1',
      op: {
        op_id: 'dispatch-atomic',
        kind: 'dispatch_repair',
        failure_key: COMPLETION_FAILURE,
        attempt_id: 'repair-attempt-atomic',
        repair_bead_id,
        status: 'prepared'
      }
    });

    expect(result.ok).toBe(true);
    expect(env.store.snapshot(WS)).toMatchObject({
      completion_intents: {
        B1: {
          repair_sessions_used: 1,
          active_op: {
            op_id: 'dispatch-atomic',
            kind: 'dispatch_repair',
            repair_bead_id
          }
        }
      },
      attempts: {
        'repair-attempt-atomic': {
          completion_root_id: 'B1',
          completion_op_id: 'dispatch-atomic'
        }
      }
    });
    expect(env.runner.spawnOrder).toEqual([repair_bead_id]);
  });

  test('resolves a linked repair from its current workspace exec settings', async () => {
    const repair_bead_id = 'B1-rcccccccc';
    const env = setup({
      config: {
        B1: {},
        [repair_bead_id]: {
          model: 'sol',
          effort: 'xhigh',
          orchestration_speed: 'fast'
        }
      },
      gitRun: ownedGit(),
      slots: 1
    });
    seedCompletionIntent(env.store, repair_bead_id);
    env.worktree.exists.mockReturnValue(false);
    env.worktree.add.mockImplementation(async ({ bead_id, base }) => ({
      path: `/wt/${bead_id}`,
      branch: bead_id,
      base_oid: base
    }));

    const result = await env.scheduler.dispatchCompletionRepair(WS, {
      root_bead_id: 'B1',
      op: {
        op_id: 'repair-current-selector',
        kind: 'dispatch_repair',
        failure_key: COMPLETION_FAILURE,
        attempt_id: 'repair-attempt-current-selector',
        repair_bead_id,
        status: 'prepared'
      }
    });

    expect(result.ok).toBe(true);
    expect(env.runner.settingsFor(repair_bead_id)).toMatchObject({
      model: 'sol',
      effort: 'xhigh',
      speed: 'fast'
    });
    expect(
      env.store.snapshot(WS).attempts['repair-attempt-current-selector']
    ).toMatchObject({
      runner: 'codex',
      model: 'sol',
      effort: 'xhigh',
      speed: 'fast',
      exec_values: expect.objectContaining({
        orchestration_model: 'sol',
        orchestration_effort: 'xhigh',
        orchestration_speed: 'fast'
      })
    });
  });

  test('adopts an already-prerecorded operation without spending or spawning again', async () => {
    const env = setup({ config: { B1: {} }, gitRun: ownedGit(), slots: 1 });
    seedCompletionIntent(env.store);
    const op = {
      op_id: 'adopt-op',
      kind: 'resume_root',
      failure_key: COMPLETION_FAILURE,
      attempt_id: 'repair-attempt-5',
      repair_bead_id: null,
      status: 'prepared'
    };
    await env.scheduler.dispatchCompletionRepair(WS, {
      root_bead_id: 'B1',
      op
    });

    const result = await env.scheduler.dispatchCompletionRepair(WS, {
      root_bead_id: 'B1',
      op
    });

    expect(result).toEqual({
      ok: true,
      attempt_id: 'repair-attempt-5',
      adopted: true
    });
    expect(env.runner.spawnOrder).toEqual(['B1']);
    expect(
      env.store.snapshot(WS).completion_intents.B1.repair_sessions_used
    ).toBe(1);
  });

  test('refuses to adopt a terminal attempt after its active journal was cleared', async () => {
    const env = setup({ config: { B1: {} }, gitRun: ownedGit(), slots: 1 });
    seedCompletionIntent(env.store);
    const op = {
      op_id: 'settled-op',
      kind: 'resume_root',
      failure_key: COMPLETION_FAILURE,
      attempt_id: 'repair-attempt-settled',
      repair_bead_id: null,
      status: 'prepared'
    };
    await env.scheduler.dispatchCompletionRepair(WS, {
      root_bead_id: 'B1',
      op
    });
    env.store.advanceCompletionOp(WS, {
      root_bead_id: 'B1',
      op_id: op.op_id,
      status: 'consumed',
      next_phase: 'gating',
      clear: true
    });

    const result = await env.scheduler.dispatchCompletionRepair(WS, {
      root_bead_id: 'B1',
      op
    });

    expect(result).toEqual({
      ok: false,
      reason: 'completion_attempt_not_active'
    });
    expect(env.runner.spawnOrder).toEqual(['B1']);
  });

  test('resumes the current repair subject transcript', async () => {
    const repair_bead_id = 'B1-rcccccccc';
    const gitRun = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'rev-parse' && args[1] === '--abbrev-ref') {
        return { code: 0, stdout: `${repair_bead_id}\n`, stderr: '' };
      }
      return { code: 0, stdout: `${'d'.repeat(40)}\n`, stderr: '' };
    });
    const env = setup({
      config: { B1: {}, [repair_bead_id]: {} },
      gitRun,
      slots: 1
    });
    seedCompletionIntent(env.store, repair_bead_id);
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'att-repair-subject', bead_id: repair_bead_id }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'att-repair-subject',
      patch: {
        status: 'done',
        repo: '/repo',
        target_base: 'main',
        runner: 'codex',
        model: 'sol',
        effort: 'xhigh',
        session_id: 'session-repair',
        finished_at: 20
      }
    });
    env.store.setCompletionSubject(WS, {
      root_bead_id: 'B1',
      phase: 'gating',
      subject: {
        role: 'repair',
        bead_id: repair_bead_id,
        pr_url: 'https://github.com/o/r/pull/2',
        head_sha: 'd'.repeat(40),
        base_sha: COMPLETION_FAILURE.base_sha,
        merged_sha: null
      }
    });
    const failure_key = {
      ...COMPLETION_FAILURE,
      subject_sha: 'd'.repeat(40)
    };

    const result = await env.scheduler.dispatchCompletionRepair(WS, {
      root_bead_id: 'B1',
      op: {
        op_id: 'resume-repair-subject',
        kind: 'resume_root',
        failure_key,
        attempt_id: 'repair-attempt-subject',
        repair_bead_id: null,
        status: 'prepared'
      }
    });

    expect(result).toMatchObject({
      ok: false,
      reason: 'runner_mismatch',
      continuation_mismatch: {
        prior: { runner: 'codex' },
        current: { runner: 'claude' }
      }
    });
    expect(env.runner.settingsFor(repair_bead_id)).toBeUndefined();
    expect(
      env.store.snapshot(WS).attempts['repair-attempt-subject']
    ).toBeUndefined();
  });

  test('does not substitute a root transcript for a repair subject', async () => {
    const repair_bead_id = 'B1-rcccccccc';
    const gitRun = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'rev-parse' && args[1] === '--abbrev-ref') {
        return { code: 0, stdout: `${repair_bead_id}\n`, stderr: '' };
      }
      return { code: 0, stdout: `${'d'.repeat(40)}\n`, stderr: '' };
    });
    const env = setup({
      config: { B1: {}, [repair_bead_id]: {} },
      gitRun,
      slots: 1
    });
    seedCompletionIntent(env.store, repair_bead_id);
    env.store.setCompletionSubject(WS, {
      root_bead_id: 'B1',
      phase: 'gating',
      subject: {
        role: 'repair',
        bead_id: repair_bead_id,
        pr_url: 'https://github.com/o/r/pull/2',
        head_sha: 'd'.repeat(40),
        base_sha: COMPLETION_FAILURE.base_sha,
        merged_sha: null
      }
    });

    const result = await env.scheduler.dispatchCompletionRepair(WS, {
      root_bead_id: 'B1',
      op: {
        op_id: 'repair-subject-without-session',
        kind: 'resume_root',
        failure_key: {
          ...COMPLETION_FAILURE,
          subject_sha: 'd'.repeat(40)
        },
        attempt_id: 'repair-attempt-without-session',
        repair_bead_id: null,
        status: 'prepared'
      }
    });

    expect(result).toEqual({ ok: false, reason: 'no_session_id' });
    expect(env.runner.spawnOrder).toEqual([]);
  });

  test('rejects adoption when the pinned failure identity changed', async () => {
    const env = setup({ config: { B1: {} }, gitRun: ownedGit(), slots: 1 });
    seedCompletionIntent(env.store);
    const op = {
      op_id: 'adopt-stale-op',
      kind: 'resume_root',
      failure_key: COMPLETION_FAILURE,
      attempt_id: 'repair-attempt-stale-adopt',
      repair_bead_id: null,
      status: 'prepared'
    };
    await env.scheduler.dispatchCompletionRepair(WS, {
      root_bead_id: 'B1',
      op
    });

    const result = await env.scheduler.dispatchCompletionRepair(WS, {
      root_bead_id: 'B1',
      op: {
        ...op,
        failure_key: {
          ...COMPLETION_FAILURE,
          subject_sha: 'd'.repeat(40)
        }
      }
    });

    expect(result).toEqual({
      ok: false,
      reason: 'completion_attempt_collision'
    });
    expect(env.runner.spawnOrder).toEqual(['B1']);
  });

  test('reports the durable attempt result and failure identity after settlement', async () => {
    const onCompletionAttemptSettled = vi.fn();
    const env = setup({
      config: { B1: {} },
      gitRun: ownedGit(),
      onCompletionAttemptSettled,
      slots: 1
    });
    seedCompletionIntent(env.store);
    const op = {
      op_id: 'settle-op',
      kind: 'resume_root',
      failure_key: COMPLETION_FAILURE,
      attempt_id: 'repair-attempt-6',
      repair_bead_id: null,
      status: 'prepared'
    };
    await env.scheduler.dispatchCompletionRepair(WS, {
      root_bead_id: 'B1',
      op
    });

    env.runner.finish('B1', { success: false, reason: 'subtype' });
    await flush();
    await flush();

    expect(onCompletionAttemptSettled).toHaveBeenCalledWith(
      expect.objectContaining({
        workspace: WS,
        root_bead_id: 'B1',
        op_id: 'settle-op',
        failure_key: COMPLETION_FAILURE,
        attempt: expect.objectContaining({
          attempt_id: 'repair-attempt-6',
          status: 'failed'
        }),
        verdict: expect.objectContaining({ success: false, reason: 'subtype' })
      })
    );
  });

  test('transfers completion identity when a paused repair uses generic resume', async () => {
    const env = setup({
      config: { B1: {} },
      gitRun: ownedGit(),
      slots: 1
    });
    seedCompletionIntent(env.store);
    const op = {
      op_id: 'generic-resume-op',
      kind: 'resume_root',
      failure_key: COMPLETION_FAILURE,
      attempt_id: 'generic-resume-source',
      repair_bead_id: null,
      status: 'prepared'
    };
    await env.scheduler.dispatchCompletionRepair(WS, {
      root_bead_id: 'B1',
      op
    });
    env.runner.eventsFor('B1').emit('session_id', 'completion-session');
    await flush();
    await env.scheduler.pause(WS, 'generic-resume-source');

    const result = await env.scheduler.resume(WS, 'generic-resume-source');

    expect(result.ok).toBe(true);
    const child = env.store.snapshot(WS).attempts[String(result.attempt_id)];
    expect(child).toMatchObject({
      resumed_from: 'generic-resume-source',
      completion_root_id: 'B1',
      completion_op_id: op.op_id,
      completion_mode: op.kind,
      completion_failure_key: op.failure_key
    });
    expect(
      env.store.snapshot(WS).completion_intents.B1.active_op?.attempt_id
    ).toBe(result.attempt_id);
    expect(
      env.store.snapshot(WS).completion_intents.B1.repair_sessions_used
    ).toBe(1);
  });

  test('reports a generic completion resume spawn failure for settlement', async () => {
    const first_runner = makeFakeRunner();
    let factory_count = 0;
    const onCompletionAttemptSettled = vi.fn();
    const env = setup({
      config: { B1: {} },
      gitRun: ownedGit(),
      slots: 1,
      onCompletionAttemptSettled,
      makeRunner(name) {
        factory_count += 1;
        if (factory_count === 1) {
          return first_runner.factory(name);
        }
        return {
          name,
          spawn() {
            throw new Error('spawn failed');
          }
        };
      }
    });
    seedCompletionIntent(env.store);
    const op = {
      op_id: 'generic-spawn-op',
      kind: 'resume_root',
      failure_key: COMPLETION_FAILURE,
      attempt_id: 'generic-spawn-source',
      repair_bead_id: null,
      status: 'prepared'
    };
    await env.scheduler.dispatchCompletionRepair(WS, {
      root_bead_id: 'B1',
      op
    });
    first_runner.eventsFor('B1').emit('session_id', 'completion-spawn-session');
    await flush();
    await env.scheduler.pause(WS, 'generic-spawn-source');
    onCompletionAttemptSettled.mockClear();

    const result = await env.scheduler.resume(WS, 'generic-spawn-source');

    expect(result).toEqual({ ok: false, reason: 'spawn_failed' });
    expect(onCompletionAttemptSettled).toHaveBeenCalledWith(
      expect.objectContaining({
        root_bead_id: 'B1',
        op_id: op.op_id,
        failure_key: op.failure_key,
        attempt: expect.objectContaining({
          resumed_from: 'generic-spawn-source',
          completion_root_id: 'B1',
          status: 'failed',
          cause: 'spawn_failed'
        }),
        verdict: null
      })
    );
  });
});

/**
 * Set workspace-global exec defaults (CAS-threaded) before dispatch.
 *
 * @param {any} store
 * @param {Record<string, string>} defaults
 */
function seedExecDefaults(store, defaults) {
  const values = Object.fromEntries(
    Object.entries(defaults).filter(([key]) => key.startsWith('orchestration_'))
  );
  if (Object.keys(values).length === 0) {
    return;
  }
  store.setOrchestrationDefaults(WS, {
    expected_revision: store.snapshot(WS).revision,
    values
  });
}

describe('scheduler slot policy (single scan, worker-phase2 §3)', () => {
  test('keeps an ineligible queue head and dispatches the next eligible bead', async () => {
    const env = setup({
      config: {
        S1: { labels: ['worker-ineligible'] },
        S2: {}
      },
      slots: 1
    });
    seedQueue(env.store, ['S1', 'S2']);

    await env.scheduler.tick(WS);

    expect(env.runner.spawnOrder).toEqual(['S2']);
    expect(env.store.snapshot(WS).queue.map((entry) => entry.bead_id)).toEqual([
      'S1',
      'S2'
    ]);
    expect(env.store.snapshot(WS).admission.S1.reason).toBe(
      'worker_ineligible'
    );
  });

  test('blocks a label added between scan and dispatch before worktree mutation', async () => {
    const env = setup({
      config: { S1: { workerIneligibleAt: 2 } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.runner.spawnOrder).toEqual([]);
    expect(env.worktree.add).not.toHaveBeenCalled();
    expect(env.store.snapshot(WS).admission.S1.reason).toBe(
      'worker_ineligible'
    );
  });

  test('dispatches and clears the refusal after the label is removed', async () => {
    const bead = { labels: ['worker-ineligible'] };
    const env = setup({ config: { S1: bead }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    bead.labels = [];
    await env.scheduler.tick(WS);

    expect(env.runner.spawnOrder).toEqual(['S1']);
    expect(env.store.snapshot(WS).admission.S1).toBeUndefined();
  });

  test('ignores durable PR waits when slot holding is off', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedPrWait(env.store, 'P1');
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.runningBeads()).toEqual(['S1']);
  });

  test('fills exactly N slots from the queue in order', async () => {
    const env = setup({
      config: {
        S1: {},
        S2: {},
        P1: {},
        P2: {},
        P3: {}
      },
      slots: 3
    });
    seedQueue(env.store, ['S1', 'S2', 'P1', 'P2', 'P3']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.runningCount()).toBe(3);
    expect(env.scheduler.runningBeads().sort()).toEqual(['P1', 'S1', 'S2']);
    expect(env.scheduler.isRunning('P2')).toBe(false);
    expect(env.scheduler.isRunning('P3')).toBe(false);
  });

  test('runs exactly one session at a time at slots=1 (the retired serial lane)', async () => {
    const env = setup({ config: { S1: {}, S2: {}, S3: {} }, slots: 1 });
    seedQueue(env.store, ['S1', 'S2', 'S3']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.runningCount()).toBe(1);
    expect(env.scheduler.runningBeads()).toEqual(['S1']);
    // A second tick against the full cap starts nothing new.
    await env.scheduler.tick(WS);
    expect(env.scheduler.runningCount()).toBe(1);
  });

  test('advances to the next queued bead when the slots=1 session finishes', async () => {
    const env = setup({ config: { S1: {}, S2: {} }, slots: 1 });
    seedQueue(env.store, ['S1', 'S2']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    expect(env.scheduler.runningCount()).toBe(1);
    expect(env.scheduler.runningBeads()).toEqual(['S2']);
  });

  test('reads the cap from the store, so a slots edit applies on the next tick', async () => {
    const env = setup({ config: { S1: {}, S2: {}, S3: {} }, slots: 1 });
    seedQueue(env.store, ['S1', 'S2', 'S3']);
    await env.scheduler.tick(WS);

    env.store.setSlots(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      slots: 3
    });
    await env.scheduler.tick(WS);

    expect(env.scheduler.runningCount()).toBe(3);
  });

  test('skips a blocked bead to the next runnable one', async () => {
    const env = setup({
      config: {
        S1: { blocked: true },
        S2: { blocked: false }
      },
      slots: 1
    });
    seedQueue(env.store, ['S1', 'S2']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S1')).toBe(false);
    expect(env.scheduler.isRunning('S2')).toBe(true);
  });

  /**
   * Persist a `running` attempt the way a PRIOR server process left it: the
   * durable record survives the restart, the in-memory Sets do not. A fresh
   * scheduler over this store IS the post-restart state.
   *
   * @param {any} store
   * @param {string} bead_id
   * @param {Partial<import('./queue-store.js').Attempt>} [patch]
   */
  function seedSurvivingAttempt(store, bead_id, patch = {}) {
    const attempt_id = `att-${bead_id}`;
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id, bead_id }
    });
    store.updateAttempt(WS, {
      attempt_id,
      patch: {
        status: 'running',
        pid: 4242,
        started_at: 1000,
        repo: '/repo',
        workflow_mode_prior: null,
        ...patch
      }
    });
  }

  test('counts a restart-surviving session against the cap (UI-97qo)', async () => {
    const env = setup({
      config: { S1: {}, S2: {} },
      slots: 2,
      probePid: () => ({ alive: true, started_at: 1000 })
    });
    seedSurvivingAttempt(env.store, 'UI-1');
    seedQueue(env.store, ['S1', 'S2']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.runningCount()).toBe(1);
    expect(env.scheduler.runningBeads()).toEqual(['S1']);
  });

  test('frees the slot of a surviving attempt whose process is gone', async () => {
    const env = setup({
      config: { S1: {}, S2: {} },
      slots: 2,
      probePid: () => ({ alive: false, started_at: null })
    });
    seedSurvivingAttempt(env.store, 'UI-1');
    seedQueue(env.store, ['S1', 'S2']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.runningCount()).toBe(2);
  });

  test('frees the slot of a paused attempt', async () => {
    const env = setup({
      config: { S1: {}, S2: {} },
      slots: 2,
      probePid: () => ({ alive: true, started_at: 1000 })
    });
    seedSurvivingAttempt(env.store, 'UI-1', { status: 'paused' });
    seedQueue(env.store, ['S1', 'S2']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.runningCount()).toBe(2);
  });

  test('probes no pid when this process owns every running attempt', async () => {
    const probePid = vi.fn(() => ({ alive: true, started_at: 1000 }));
    const env = setup({ config: { S1: {}, S2: {} }, slots: 2, probePid });
    seedQueue(env.store, ['S1', 'S2']);
    await env.scheduler.tick(WS);

    await env.scheduler.tick(WS);

    expect(probePid).not.toHaveBeenCalled();
  });
});

describe('scheduler stop (■ tile)', () => {
  test('stop group-kills the attempt, discards it, reverts workflow_mode, keeps auto_advance', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    expect(env.scheduler.isRunning('S1')).toBe(true);

    const kill = env.runner.killFor('S1');
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    const stopped = await env.scheduler.stop(WS, attempt_id);
    expect(stopped).toBe(true);

    // The runner handle was group-killed.
    expect(kill).toHaveBeenCalledWith('SIGTERM');

    // Attempt is terminal `stopped` with no cause — a user halt is not a
    // failure (worker-phase1 §1) — and the bead left the lane (§2.2).
    const snap = env.store.snapshot(WS);
    expect(snap.attempts[attempt_id].status).toBe('stopped');
    expect(snap.attempts[attempt_id].cause).toBe(null);
    expect(snap.queue.map((e) => e.bead_id)).toEqual([]);
    expect(env.scheduler.isRunning('S1')).toBe(false);
    // workflow_mode reverted (prior unset → unsetMetadata).
    expect(
      env.bd.calls.some(
        (c) =>
          c.method === 'unsetMetadata' &&
          c.bead_id === 'S1' &&
          c.key === 'workflow_mode'
      )
    ).toBe(true);
    // A user stop does NOT halt the queue.
    expect(snap.auto_advance).toBe(true);
  });

  test('a late done() after stop does not re-fail or halt the queue', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    await env.scheduler.stop(WS, attempt_id);
    // The killed session's done resolves late (failure verdict) — must be inert.
    env.runner.finish('S1', { success: false, reason: 'killed', exit: null });
    await flush();
    await flush();

    expect(env.store.snapshot(WS).auto_advance).toBe(true);
    expect(env.store.snapshot(WS).attempts[attempt_id].status).toBe('stopped');
  });

  test('stop returns false for an unknown attempt', async () => {
    const env = setup({
      config: { B1: { model: 'sol', effort: 'xhigh' } },
      slots: 1
    });
    expect(await env.scheduler.stop(WS, 'nope')).toBe(false);
  });

  test('discard frees the slot and advances the queue (§2.2)', async () => {
    const env = setup({ config: { S1: {}, S2: {} }, slots: 1 });
    seedQueue(env.store, ['S1', 'S2']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    await env.scheduler.stop(WS, attempt_id);

    // The discarded bead is gone from the lane and never re-dispatched; the
    // next queued bead takes the freed slot in the same operation.
    expect(env.scheduler.isRunning('S1')).toBe(false);
    expect(env.scheduler.isRunning('S2')).toBe(true);
    expect(env.store.snapshot(WS).queue.map((e) => e.bead_id)).toEqual(['S2']);
  });
});

describe('scheduler pause (⏸ tile, worker-phase1 §2.1)', () => {
  test('persists verified process identity from the runner handle', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    expect(
      env.store.snapshot(WS).attempts[attempt_id].process_identity
    ).toEqual({
      pid: 9000,
      pgid: 9000,
      started_at: 1_000
    });
  });

  test('persists pause intent before signaling and finalizes after group exit', async () => {
    /** @type {any} */
    let store;
    const processController = {
      terminate: vi.fn(async () => {
        const attempt = Object.values(store.snapshot(WS).attempts)[0];
        expect(/** @type {any} */ (attempt).control.phase).toBe('requested');
        return { ok: true, state: 'gone', forced: false };
      }),
      probe: vi.fn(() => ({ state: 'gone' }))
    };
    const env = setup({
      config: { S1: {} },
      slots: 1,
      processController
    });
    store = env.store;
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.runner.eventsFor('S1').emit('session_id', 'sid-1');

    const result = await env.scheduler.pause(WS, attempt_id);

    expect(result).toEqual({ ok: true });
    expect(env.runner.killFor('S1')).not.toHaveBeenCalled();
    expect(env.store.snapshot(WS).attempts[attempt_id]).toMatchObject({
      status: 'paused',
      control: { kind: 'pause', phase: 'done', last_error: null }
    });
  });

  test('suppresses a live handle exit while durable pause termination is in flight', async () => {
    /** @type {ReturnType<typeof setup>} */
    let env;
    const processController = {
      terminate: vi.fn(async () => {
        env.runner.finish('S1', {
          success: false,
          reason: 'killed',
          exit: null
        });
        await flush();
        return { ok: true, state: /** @type {const} */ ('gone') };
      }),
      probe: vi.fn(() => ({ state: /** @type {const} */ ('gone') }))
    };
    env = setup({ config: { S1: {} }, slots: 1, processController });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.runner.eventsFor('S1').emit('session_id', 'sid-1');

    const result = await env.scheduler.pause(WS, attempt_id);

    expect(result).toEqual({ ok: true });
    expect(env.store.snapshot(WS).attempts[attempt_id].status).toBe('paused');
    expect(env.store.snapshot(WS).auto_advance).toBe(true);
    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();
  });

  test('recovers a pending pause without a process-local handle', async () => {
    const sessionMonitors = { stop: vi.fn() };
    const processController = {
      terminate: vi.fn(async () => ({
        ok: true,
        state: 'gone',
        forced: false
      })),
      probe: vi.fn(() => ({ state: 'gone' }))
    };
    const env = setup({
      config: { S1: {} },
      slots: 1,
      processController,
      sessionMonitors
    });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'recovered', bead_id: 'S1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'recovered',
      patch: {
        status: 'running',
        session_id: 'sid-1',
        repo: '/repo',
        workflow_mode_prior: null,
        process_identity: { pid: 4242, pgid: 4242, started_at: 1_000 }
      }
    });
    env.store.requestAttemptControl(WS, {
      attempt_id: 'recovered',
      kind: 'pause'
    });

    await env.scheduler.recoverControls(WS);

    expect(env.store.snapshot(WS).attempts.recovered).toMatchObject({
      status: 'paused',
      control: { phase: 'done' }
    });
    expect(sessionMonitors.stop).toHaveBeenCalledWith(WS, 'recovered');
    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();
  });

  test('leaves pause control untouched when a durable discard owns the attempt', async () => {
    const processController = {
      terminate: vi.fn(async () => ({
        ok: true,
        state: 'gone',
        forced: false
      })),
      probe: vi.fn(() => ({ state: 'gone' }))
    };
    const env = setup({
      config: { S1: {} },
      slots: 1,
      processController
    });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'recovered', bead_id: 'S1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'recovered',
      patch: {
        status: 'running',
        session_id: 'sid-1',
        repo: '/repo',
        process_identity: { pid: 4242, pgid: 4242, started_at: 1_000 }
      }
    });
    env.store.requestAttemptControl(WS, {
      attempt_id: 'recovered',
      kind: 'pause'
    });
    env.store.createDiscardOperation(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      operation: {
        operation_id: 'discard-1',
        bead_id: 'S1',
        attempt_id: 'recovered',
        source_snapshot: { repo: '/repo', branch: 'S1' }
      }
    });

    await env.scheduler.recoverControls(WS);

    expect(processController.terminate).not.toHaveBeenCalled();
    expect(env.store.snapshot(WS).attempts.recovered).toMatchObject({
      status: 'running',
      control: { phase: 'requested' }
    });
  });

  test('fails closed when recovered process identity is unknown', async () => {
    const processController = {
      terminate: vi.fn(async () => ({
        ok: false,
        state: 'unknown',
        reason: 'ps_failed'
      })),
      probe: vi.fn(() => ({ state: 'unknown', reason: 'ps_failed' }))
    };
    const env = setup({
      config: { S1: {} },
      slots: 1,
      processController
    });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'recovered', bead_id: 'S1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'recovered',
      patch: {
        status: 'running',
        session_id: 'sid-1',
        process_identity: { pid: 4242, pgid: 4242, started_at: 1_000 }
      }
    });
    env.store.requestAttemptControl(WS, {
      attempt_id: 'recovered',
      kind: 'pause'
    });

    await env.scheduler.recoverControls(WS);

    expect(env.store.snapshot(WS).attempts.recovered).toMatchObject({
      status: 'running',
      control: { phase: 'failed', last_error: 'ps_failed' }
    });
  });

  test('pause records `paused`, keeps the bead queued, and advances the queue', async () => {
    const env = setup({ config: { S1: {}, S2: {} }, slots: 1 });
    seedQueue(env.store, ['S1', 'S2']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.runner.eventsFor('S1').emit('session_id', 'sid-1');
    const kill = env.runner.killFor('S1');

    expect(await env.scheduler.pause(WS, attempt_id)).toEqual({ ok: true });

    expect(kill).toHaveBeenCalledWith('SIGTERM');
    const snap = env.store.snapshot(WS);
    expect(snap.attempts[attempt_id].status).toBe('paused');
    expect(snap.attempts[attempt_id].cause).toBe(null);
    // The bead stays queued (resume runs in the same worktree)...
    expect(snap.queue.map((e) => e.bead_id)).toEqual(['S1', 'S2']);
    // ...but is skipped by dispatch, so the freed slot goes to the next bead.
    expect(env.scheduler.isRunning('S1')).toBe(false);
    expect(env.scheduler.isRunning('S2')).toBe(true);
    // A user pause is not a failure — the queue keeps advancing.
    expect(snap.auto_advance).toBe(true);
    // workflow_mode reverted, exactly like a discard.
    expect(
      env.bd.calls.some(
        (/** @type {any} */ c) =>
          c.method === 'unsetMetadata' &&
          c.bead_id === 'S1' &&
          c.key === 'workflow_mode'
      )
    ).toBe(true);
  });

  test('pause is refused before the session id lands (§2.1 fail-closed)', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    // No session_id captured yet → pausing would strand an unresumable attempt.
    expect(await env.scheduler.pause(WS, attempt_id)).toEqual({
      ok: false,
      reason: 'no_session_id'
    });
    expect(env.store.snapshot(WS).attempts[attempt_id].status).toBe('running');
    expect(env.scheduler.isRunning('S1')).toBe(true);
  });

  test('pause returns not_running for an unknown attempt', async () => {
    const env = setup({ config: {}, slots: 1 });
    expect(await env.scheduler.pause(WS, 'nope')).toEqual({
      ok: false,
      reason: 'not_running'
    });
  });

  test('a paused bead stays skipped until resumed, and a resumed ancestor stops blocking it (§1.1)', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const first = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.runner.eventsFor('S1').emit('session_id', 'sid-1');
    await env.scheduler.pause(WS, first);
    expect(env.scheduler.isRunning('S1')).toBe(false);

    // A plain tick must not restart a paused bead — ▶ is the only way back.
    await env.scheduler.tick(WS);
    expect(env.scheduler.isRunning('S1')).toBe(false);

    // Resuming mints a child; the ancestor stays `paused` but is now history,
    // so it no longer blocks dispatch for that bead.
    const res = await env.scheduler.resume(WS, first);
    expect(res.ok).toBe(true);
    expect(env.scheduler.isRunning('S1')).toBe(true);
    expect(env.store.snapshot(WS).attempts[first].status).toBe('paused');
    expect(
      env.store.snapshot(WS).attempts[String(res.attempt_id)].resumed_from
    ).toBe(first);
  });

  test('■ on a RESUMED ancestor is refused, so the running child keeps its lane (§1.1)', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const ancestor = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.runner.eventsFor('S1').emit('session_id', 'sid-1');
    await env.scheduler.pause(WS, ancestor);
    const res = await env.scheduler.resume(WS, ancestor);
    expect(res.ok).toBe(true);

    // A stale client tile could still target the ancestor; discarding it would
    // pull the RUNNING child's bead out of the lane.
    expect(await env.scheduler.stop(WS, ancestor)).toBe(false);
    const snap = env.store.snapshot(WS);
    expect(snap.attempts[ancestor].status).toBe('paused');
    expect(snap.queue.map((e) => e.bead_id)).toEqual(['S1']);
    expect(env.scheduler.isRunning('S1')).toBe(true);
  });

  test('a paused attempt can be discarded from its tile (§2.2)', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.runner.eventsFor('S1').emit('session_id', 'sid-1');
    await env.scheduler.pause(WS, attempt_id);

    expect(await env.scheduler.stop(WS, attempt_id)).toBe(true);
    const snap = env.store.snapshot(WS);
    expect(snap.attempts[attempt_id].status).toBe('stopped');
    expect(snap.queue.map((e) => e.bead_id)).toEqual([]);
  });
});

describe('scheduler session id capture (spec §2)', () => {
  test('a runner session_id event patches the attempt AND fans out', async () => {
    const notify = vi.fn();
    const env = setup({
      config: { S1: {} },
      slots: 1,
      notifyQueueChanged: notify
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    expect(env.scheduler.isRunning('S1')).toBe(true);

    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    // Baseline: no session id yet.
    expect(env.store.snapshot(WS).attempts[attempt_id].session_id).toBe(null);

    // The runner emits its session id on the stream's first event.
    notify.mockClear();
    env.runner.eventsFor('S1').emit('session_id', 'sid-777');
    await flush();

    // Persisted on the attempt record.
    expect(env.store.snapshot(WS).attempts[attempt_id].session_id).toBe(
      'sid-777'
    );
    // updateAttempt alone does NOT fan out, so notifyChanged must fire so a live
    // ws subscriber (open drawer) gets the fresh snapshot.
    expect(notify).toHaveBeenCalledWith(WS);
  });
});

describe('scheduler pause (⏸)', () => {
  test('auto_advance off starts none but lets running finish', async () => {
    const env = setup({ config: { P1: {}, P2: {}, P3: {} }, slots: 2 });
    seedQueue(env.store, ['P1', 'P2', 'P3']);
    await env.scheduler.tick(WS);
    expect(env.scheduler.runningCount()).toBe(2);

    // Pause + queue another runnable bead.
    env.store.setAutoAdvance(WS, false);
    await env.scheduler.tick(WS);
    // No new session started while paused.
    expect(env.scheduler.runningCount()).toBe(2);

    // A running session still finishes; no new dispatch while paused.
    env.runner.finish('P1', { success: true });
    await flush();
    await flush();
    expect(env.scheduler.runningCount()).toBe(1);
    expect(env.scheduler.isRunning('P3')).toBe(false);
    expect(env.store.snapshot(WS).pr_wait.map((e) => e.bead_id)).toContain(
      'P1'
    );
  });
});

describe('scheduler dispatch snapshot', () => {
  test('re-reads bd at dispatch and snapshots the attempt', async () => {
    const env = setup({
      config: { S1: { runner: 'claude', model: 'opus', effort: 'high' } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    // snapshotBead called during dispatch (authoritative re-read).
    expect(env.bd.snapshotCounts()).toBeGreaterThanOrEqual(1);
    expect(env.worktree.add).toHaveBeenCalled();

    const attempts = Object.values(env.store.snapshot(WS).attempts);
    expect(attempts).toHaveLength(1);
    const a = /** @type {any} */ (attempts[0]);
    expect(a.bead_id).toBe('S1');
    expect(a.runner).toBe('claude');
    expect(a.model).toBe('opus');
    expect(a.effort).toBe('high');
    expect(a.base_oid).toBe('base-S1');
    expect(a.started_at).toBe(1000);
    expect(a.pid).toBe(9000);
    expect(a.status).toBe('running');
    expect(a.target_base).toBe('main');
    expect(a.workflow_mode_prior).toBe(null);
  });
});

describe('scheduler happy path (dispatch → PR observation → pr_wait)', () => {
  test('successful session verifies and moves the bead to pr_wait', async () => {
    const env = setup({ config: { S1: {} }, slots: 1, verifyOk: true });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    const snap = env.store.snapshot(WS);
    expect(snap.pr_wait.map((e) => e.bead_id)).toContain('S1');
    expect(snap.done.map((e) => e.bead_id)).not.toContain('S1');
    expect(snap.attempts[attempt_id].status).toBe('done');
  });

  test('judges completion from the observation alone, never the merge axis', async () => {
    // A legacy merge_sha on the record must not reach the completion verdict.
    const env = setup({ config: { S1: {} }, slots: 1, verifyOk: true });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.store.updateAttempt(WS, {
      attempt_id,
      patch: { merge_sha: 'f'.repeat(40) }
    });

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    expect(env.verify.verifyPrSubmitted).toHaveBeenCalledWith({
      repo: '/repo',
      bead_id: 'S1'
    });
    const snap = env.store.snapshot(WS);
    expect(snap.pr_wait.map((e) => e.bead_id)).toContain('S1');
    // The retired done_kind stamp is no longer written on a new attempt.
    expect(snap.attempts[attempt_id].done_kind).toBe(null);
  });

  test('reverts workflow_mode on every success (bead stays open for the merge click)', async () => {
    const env = setup({ config: { S1: {} }, slots: 1, verifyOk: true });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    expect(
      env.bd.calls.some(
        (c) =>
          c.method === 'unsetMetadata' &&
          c.bead_id === 'S1' &&
          c.key === 'workflow_mode'
      )
    ).toBe(true);
  });

  test('records pr_missing and gh_observation_failed distinguishably', async () => {
    for (const reason of ['pr_missing', 'gh_observation_failed']) {
      const env = setup({ config: { S1: {} }, slots: 1 });
      /** @type {any} */ (env.verify).verifyPrSubmitted = vi.fn(async () => ({
        ok: false,
        reason
      }));
      seedQueue(env.store, ['S1']);
      await env.scheduler.tick(WS);
      const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

      env.runner.finish('S1', { success: true });
      await flush();
      await flush();

      const a = env.store.snapshot(WS).attempts[attempt_id];
      expect(a.status).toBe('failed');
      expect(a.cause).toBe(`verify_failed:${reason}`);
      expect(env.store.snapshot(WS).pr_wait).toEqual([]);
    }
  });
});

describe('scheduler failure (auto_advance OFF + workflow_mode revert, no breaker)', () => {
  test('dismisses a moot repair failure without halting auto advance', async () => {
    const repairSession = {
      judge: vi.fn(async () => ({ verdict: 'chain_closed', evidence: null }))
    };
    const env = setup({
      config: { S1: {}, S2: {} },
      slots: 1,
      repairSession
    });
    seedLanes(env.store, { parallel: ['S1'], s1: ['S2'] });
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.store.dropFromQueue(WS, { bead_id: 'S1' });
    env.store.updateAttempt(WS, {
      attempt_id,
      patch: { repair_operation_id: 'cleanup:S1' }
    });

    env.runner.finish('S1', { success: false, reason: 'subtype', exit: 1 });
    await flush();
    await flush();

    const snapshot = env.store.snapshot(WS);
    expect(snapshot.auto_advance).toBe(true);
    expect(snapshot.attempts[attempt_id]).toMatchObject({
      status: 'failed',
      cause: 'session_failed:subtype',
      dismissed_at: 1000,
      halted_auto_advance: false
    });
    expect(repairSession.judge).toHaveBeenCalledWith({
      workspace: WS,
      operation_id: 'cleanup:S1'
    });
    expect(env.runner.spawnOrder).toEqual(['S1', 'S2']);
  });

  test('halts an unresolved repair failure and records responsibility', async () => {
    const repairSession = {
      judge: vi.fn(async () => ({ verdict: 'unresolved', evidence: null }))
    };
    const env = setup({ config: { S1: {} }, slots: 1, repairSession });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.store.updateAttempt(WS, {
      attempt_id,
      patch: { repair_operation_id: 'cleanup:S1' }
    });

    env.runner.finish('S1', { success: false, reason: 'subtype', exit: 1 });
    await flush();
    await flush();

    expect(env.store.snapshot(WS)).toMatchObject({
      auto_advance: false,
      attempts: {
        [attempt_id]: {
          dismissed_at: null,
          halted_auto_advance: true
        }
      }
    });
  });

  test('preserves an existing dismissal on a non-moot failure', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.store.updateAttempt(WS, {
      attempt_id,
      patch: { dismissed_at: 777 }
    });

    env.runner.finish('S1', { success: false, reason: 'subtype', exit: 1 });
    await flush();
    await flush();

    expect(env.store.snapshot(WS).attempts[attempt_id].dismissed_at).toBe(777);
  });

  test('preserves an existing dismissal when runner spawn fails', async () => {
    /** @type {ReturnType<typeof setup>} */
    let env;
    env = setup({
      config: { S1: {} },
      slots: 1,
      makeRunner: () => ({
        name: 'claude',
        spawn() {
          const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
          env.store.updateAttempt(WS, {
            attempt_id,
            patch: { dismissed_at: 777 }
          });
          throw new Error('spawn failed');
        }
      })
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const attempt = Object.values(env.store.snapshot(WS).attempts)[0];
    expect(attempt).toMatchObject({
      status: 'failed',
      cause: 'spawn_failed',
      dismissed_at: 777
    });
  });

  test('keeps a blocker visible when its repair target is closed', async () => {
    const repairSession = {
      judge: vi.fn(async () => ({ verdict: 'chain_closed', evidence: null }))
    };
    const env = setup({ config: { S1: {} }, slots: 1, repairSession });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.store.updateAttempt(WS, {
      attempt_id,
      patch: { repair_operation_id: 'cleanup:S1' }
    });

    env.runner.finish('S1', {
      success: false,
      reason: 'blocker',
      blocked: true,
      exit: 143
    });
    await flush();
    await flush();

    const snapshot = env.store.snapshot(WS);
    expect(snapshot.auto_advance).toBe(false);
    expect(snapshot.attempts[attempt_id]).toMatchObject({
      cause: 'loud_fail_blocker',
      dismissed_at: null,
      halted_auto_advance: true
    });
    expect(repairSession.judge).not.toHaveBeenCalled();
  });

  test('failed session turns auto_advance OFF and leaves a banner-ready record', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts).find(
      (id) => env.store.snapshot(WS).attempts[id].bead_id === 'S1'
    );

    env.runner.finish('S1', {
      success: false,
      reason: 'abnormal_exit',
      exit: 1
    });
    await flush();
    await flush();

    const snap = env.store.snapshot(WS);
    // auto_advance forced OFF — the ONLY halt mechanism now.
    expect(snap.auto_advance).toBe(false);
    // The terminal record carries what the failure banner renders.
    expect(snap.attempts[String(attempt_id)].status).toBe('failed');
    expect(snap.attempts[String(attempt_id)].cause).toBe(
      'session_failed:abnormal_exit'
    );
    expect(snap.attempts[String(attempt_id)].repo).toBe('/repo');
    // workflow_mode reverted (prior was unset → unsetMetadata).
    expect(
      env.bd.calls.some(
        (c) =>
          c.method === 'unsetMetadata' &&
          c.bead_id === 'S1' &&
          c.key === 'workflow_mode'
      )
    ).toBe(true);
  });

  test('a blocker failure records the guard reason and matched command', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    env.runner.finish('S1', {
      success: false,
      reason: 'blocker',
      exit: 143,
      blocked: true,
      blocked_detail: {
        reason: 'merge_to_base_blocked',
        command: 'gh pr merge 311'
      }
    });
    await flush();
    await flush();

    const a = env.store.snapshot(WS).attempts[attempt_id];
    expect(a.cause).toBe('loud_fail_blocker');
    expect(a.cause_detail).toEqual({
      reason: 'merge_to_base_blocked',
      command: 'gh pr merge 311'
    });
  });

  test('truncates a very long matched command in cause_detail', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    env.runner.finish('S1', {
      success: false,
      reason: 'blocker',
      exit: 143,
      blocked: true,
      blocked_detail: {
        reason: 'merge_to_base_blocked',
        command: 'x'.repeat(900)
      }
    });
    await flush();
    await flush();

    expect(
      env.store.snapshot(WS).attempts[attempt_id].cause_detail?.command
    ).toHaveLength(512);
  });

  test('leaves cause_detail null on a non-blocker failure', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    env.runner.finish('S1', { success: false, reason: 'boom', exit: 1 });
    await flush();
    await flush();

    expect(env.store.snapshot(WS).attempts[attempt_id].cause_detail).toBeNull();
  });

  test('a failure does not block the repo: re-enabling auto_advance dispatches again', async () => {
    // With the breaker gone there is no per-repo block, so turning ▶ back on is
    // the whole recovery path — no reset call in between.
    const env = setup({ config: { S1: {}, P1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: false, reason: 'boom', exit: 1 });
    await flush();
    await flush();
    // The user drops the failed bead and queues the next one (the failed bead
    // stays queued on its own — a failure never removes it).
    let rev = env.store.remove(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      bead_id: 'S1'
    }).queue.revision;
    env.store.place(WS, { expected_revision: rev, bead_id: 'P1' });
    env.store.setAutoAdvance(WS, true);
    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('P1')).toBe(true);
  });

  test('a verify failure also turns auto_advance OFF', async () => {
    const env = setup({ config: { S1: {} }, slots: 1, verifyOk: false });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    expect(env.store.snapshot(WS).auto_advance).toBe(false);
  });

  test('bd set-metadata failure fails THAT dispatch only (no unhandled rejection, siblings unaffected) [F9]', async () => {
    const env = setup({
      config: { S1: { throwOnSet: true }, P1: {} },
      slots: 1
    });
    seedQueue(env.store, ['S1']);

    // tick must resolve (the bd failure is contained, not thrown out of it).
    await expect(env.scheduler.tick(WS)).resolves.toBeUndefined();

    // S1 never launched a session and is recorded as a failed attempt.
    expect(env.scheduler.isRunning('S1')).toBe(false);
    const s1 = /** @type {any} */ (
      Object.values(env.store.snapshot(WS).attempts).find(
        (/** @type {any} */ a) => a.bead_id === 'S1'
      )
    );
    expect(s1.status).toBe('failed');
    expect(s1.cause).toBe('workflow_mode_record_failed');

    // auto_advance stays on → siblings unaffected.
    expect(env.store.snapshot(WS).auto_advance).toBe(true);

    // A subsequent normal dispatch still runs (the scheduler was not poisoned).
    const rev = env.store.remove(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      bead_id: 'S1'
    }).queue.revision;
    env.store.place(WS, { expected_revision: rev, bead_id: 'P1' });
    await env.scheduler.tick(WS);
    expect(env.scheduler.isRunning('P1')).toBe(true);
  });

  test('reverts to a prior value when workflow_mode was already set', async () => {
    const env = setup({
      config: { S1: { workflow_mode: 'fast_track' } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    env.runner.finish('S1', { success: false, reason: 'boom', exit: 1 });
    await flush();
    await flush();
    // prior='fast_track' → revert re-sets it (not unset).
    const revert = env.bd.calls.find(
      (c) =>
        c.method === 'setMetadata' &&
        c.bead_id === 'S1' &&
        c.value === 'fast_track' &&
        // the LAST setMetadata is the revert (dispatch also set fast_track).
        env.bd.calls.indexOf(c) === env.bd.calls.length - 1
    );
    expect(revert).toBeTruthy();
  });
});

describe('scheduler admission gate (worker-autorun-policy §1)', () => {
  test('admission-invalid head is skipped to the next candidate in the SAME tick (no starvation)', async () => {
    // The fake routes by a config marker (model:'invalid') since the snapshot
    // itself carries no bead id.
    const admission = {
      validate: vi.fn(async (/** @type {any} */ snap) =>
        snap.model === 'invalid'
          ? { ok: false, reason: 'spec_missing' }
          : { ok: true }
      )
    };
    const env = setup({
      config: {
        S1: { model: 'invalid' },
        S2: {},
        P1: { model: 'invalid' },
        P2: {}
      },
      slots: 2,
      admission
    });
    seedQueue(env.store, ['S1', 'S2', 'P1', 'P2']);
    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S1')).toBe(false);
    expect(env.scheduler.isRunning('S2')).toBe(true);
    expect(env.scheduler.isRunning('P1')).toBe(false);
    expect(env.scheduler.isRunning('P2')).toBe(true);

    const snap = env.store.snapshot(WS);
    expect(snap.admission.S1).toEqual({
      reason: 'spec_missing',
      at: expect.any(Number)
    });
    expect(snap.admission.P1).toEqual({
      reason: 'spec_missing',
      at: expect.any(Number)
    });
    expect(snap.admission.S2).toBeUndefined();
  });

  test('dispatch re-checks admission against the pinned worktree base_oid (TOCTOU)', async () => {
    const admission = {
      // Valid at the tick scan (no base pinned yet), refused once dispatch pins
      // the worktree base_oid — models a base advancing between scan and add.
      validate: vi.fn(
        async (/** @type {any} */ _snap, /** @type {any} */ base) =>
          base === 'base-S1'
            ? { ok: false, reason: 'receipt_unreachable' }
            : { ok: true }
      )
    };
    const env = setup({ config: { S1: {} }, slots: 1, admission });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S1')).toBe(false);
    // The already-created worktree is cleaned up on the admission refusal.
    expect(env.worktree.remove).toHaveBeenCalledWith({
      repo: '/repo',
      bead_id: 'S1'
    });
    expect(env.store.snapshot(WS).admission.S1).toEqual({
      reason: 'receipt_unreachable',
      at: expect.any(Number)
    });
    // No session spawned, no attempt persisted for the refused dispatch.
    expect(Object.keys(env.store.snapshot(WS).attempts)).toHaveLength(0);
  });

  test('a successful dispatch clears the bead admission record', async () => {
    let invalid = true;
    const admission = {
      validate: vi.fn(async () =>
        invalid ? { ok: false, reason: 'receipt_unreachable' } : { ok: true }
      )
    };
    const env = setup({ config: { S1: {} }, slots: 1, admission });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    expect(env.store.snapshot(WS).admission.S1).toEqual({
      reason: 'receipt_unreachable',
      at: expect.any(Number)
    });

    invalid = false;
    await env.scheduler.tick(WS);
    expect(env.scheduler.isRunning('S1')).toBe(true);
    expect(env.store.snapshot(WS).admission.S1).toBeUndefined();
  });
});

describe('scheduler tick coalescing (UI-2hc5)', () => {
  /**
   * Hold the first `n` bd snapshot reads open so a second `tick` enters while a
   * pass is still scanning — the overlap the incident showed, made
   * deterministic with promise control instead of a timer.
   *
   * @param {any} bd
   * @param {number} n
   */
  function holdSnapshots(bd, n) {
    /** @type {(v?: any) => void} */
    let release = () => {};
    const gate = new Promise((r) => {
      release = r;
    });
    const orig = bd.snapshotBead.bind(bd);
    let held = 0;
    bd.snapshotBead = async (/** @type {string} */ bead_id) => {
      held += 1;
      if (held <= n) {
        await gate;
      }
      return orig(bead_id);
    };
    return { release: () => release() };
  }

  test('dispatches a bead once when two ticks overlap', async () => {
    const env = setup({ config: { S1: {} }, slots: 2 });
    seedQueue(env.store, ['S1']);
    const gate = holdSnapshots(env.bd, 2);

    const first = env.scheduler.tick(WS);
    await flush();
    const second = env.scheduler.tick(WS);
    await flush();
    gate.release();
    await Promise.all([first, second]);

    expect(env.runner.spawnOrder).toEqual(['S1']);
  });

  test('stays within the slot cap when two ticks overlap', async () => {
    const env = setup({ config: { S1: {}, S2: {} }, slots: 1 });
    seedQueue(env.store, ['S1', 'S2']);
    const gate = holdSnapshots(env.bd, 2);

    const first = env.scheduler.tick(WS);
    await flush();
    const second = env.scheduler.tick(WS);
    await flush();
    gate.release();
    await Promise.all([first, second]);

    expect(env.scheduler.runningCount()).toBe(1);
  });

  test('picks up a bead queued during the scan in the same cycle', async () => {
    const env = setup({ config: { S1: {}, S2: {} }, slots: 2 });
    seedQueue(env.store, ['S1']);
    const gate = holdSnapshots(env.bd, 1);

    const first = env.scheduler.tick(WS);
    await flush();
    env.store.place(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      bead_id: 'S2'
    });
    const second = env.scheduler.tick(WS);
    await flush();
    gate.release();
    await Promise.all([first, second]);

    expect(env.runner.spawnOrder).toEqual(['S1', 'S2']);
  });

  test('resolves the overlapped tick only after its piggybacked rescan', async () => {
    const env = setup({ config: { S1: {}, S2: {} }, slots: 2 });
    seedQueue(env.store, ['S1']);
    const gate = holdSnapshots(env.bd, 1);

    const first = env.scheduler.tick(WS);
    await flush();
    env.store.place(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      bead_id: 'S2'
    });
    const second = env.scheduler.tick(WS);
    await flush();
    gate.release();
    await second;

    expect(env.scheduler.isRunning('S2')).toBe(true);
    await first;
  });

  test('advances to the next candidate after a dispatch refusal', async () => {
    const admission = {
      // Admits at the scan (no base pinned), refuses S1 once dispatch pins its
      // worktree base_oid — the refuse path that re-enters the pass.
      validate: vi.fn(
        async (/** @type {any} */ _snap, /** @type {any} */ base) =>
          base === 'base-S1'
            ? { ok: false, reason: 'receipt_unreachable' }
            : { ok: true }
      )
    };
    const env = setup({ config: { S1: {}, S2: {} }, slots: 1, admission });
    seedQueue(env.store, ['S1', 'S2']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S1')).toBe(false);
    expect(env.scheduler.isRunning('S2')).toBe(true);
  });
});

describe('scheduler stale spec_review lane (UI-dlim §3.2)', () => {
  const RECEIPT_SHA = 'a'.repeat(40);
  const DELTA_SHA = 'b'.repeat(40);

  /**
   * Admission that ADMITS with a stale payload — the validator's new verdict
   * for a spec that moved after the receipt.
   *
   * @param {{ delta_shas?: string[], onlyAtBase?: string }} [opts]
   */
  function staleAdmission(opts = {}) {
    return {
      validate: vi.fn(
        async (/** @type {any} */ _snap, /** @type {any} */ base) => {
          if (opts.onlyAtBase && base !== opts.onlyAtBase) {
            return { ok: true };
          }
          return {
            ok: true,
            stale: {
              receipt_sha: RECEIPT_SHA,
              delta_shas: opts.delta_shas ?? [DELTA_SHA]
            }
          };
        }
      )
    };
  }

  test('dispatches a stale bead instead of refusing it', async () => {
    const env = setup({
      config: { S1: { spec_review: `codex@${RECEIPT_SHA}` } },
      slots: 1,
      admission: staleAdmission()
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S1')).toBe(true);
    expect(env.worktree.remove).not.toHaveBeenCalled();
  });

  test('records the stale flag on the dispatched attempt', async () => {
    const env = setup({
      config: { S1: { spec_review: `codex@${RECEIPT_SHA}` } },
      slots: 1,
      admission: staleAdmission()
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const attempts = Object.values(env.store.snapshot(WS).attempts);
    expect(attempts[0].spec_review_stale).toBe(true);
    // The badge record is cleared by the launch that followed it — from here on
    // the running attempt's own flag carries the fact.
    expect(env.store.snapshot(WS).admission.S1).toBeUndefined();
  });

  test('injects the receipt, base and delta commits into the dispatch prompt', async () => {
    const env = setup({
      config: { S1: { spec_review: `codex@${RECEIPT_SHA}` } },
      slots: 1,
      admission: staleAdmission({ delta_shas: [DELTA_SHA, 'c'.repeat(40)] })
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const prompt = env.runner.spawnedBead('S1').prompt;
    expect(prompt).toContain('Bead S1 작업을 계약 네이티브 흐름으로 완료하라.');
    expect(prompt).toContain(`codex@${RECEIPT_SHA}`);
    expect(prompt).toContain('base-S1');
    expect(prompt).toContain(DELTA_SHA);
    expect(prompt).toContain('c'.repeat(40));
    expect(prompt).toContain('워커 재리뷰 레인');
  });

  test('builds the prompt from the DISPATCH re-check, not the tick scan', async () => {
    // Fresh at the scan (moving base tip), stale only once the worktree base is
    // pinned — the pinned payload is what the session must be told about.
    const env = setup({
      config: { S1: { spec_review: `codex@${RECEIPT_SHA}` } },
      slots: 1,
      admission: staleAdmission({ onlyAtBase: 'base-S1' })
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S1')).toBe(true);
    expect(env.runner.spawnedBead('S1').prompt).toContain(DELTA_SHA);
  });

  test('leaves a fresh dispatch on the adapter default prompt and flag', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      admission: { validate: vi.fn(async () => ({ ok: true })) }
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.runner.spawnedBead('S1').prompt).toBeUndefined();
    const attempts = Object.values(env.store.snapshot(WS).attempts);
    expect(attempts[0].spec_review_stale).toBe(false);
  });
});

describe('scheduler dispatch through the REAL createRunner (spawn-literal wiring)', () => {
  test('dispatch always spawns claude', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [
        JSON.stringify({
          type: 'result',
          subtype: 'success',
          is_error: false,
          permission_denials: []
        })
      ],
      exit: 0
    });
    const env = setup({
      config: { S1: {} },
      slots: 1,
      makeRunner: (/** @type {string} */ name) =>
        createRunner(name, { spawn_impl })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    expect(spawn_impl.captured.calls.length).toBe(1);
    expect(spawn_impl.captured.calls[0].command).toBe('claude');
    await flush();
  });

  test('a full_plan bead spawns without a runner authorization guard', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [
        JSON.stringify({
          type: 'result',
          subtype: 'success',
          is_error: false,
          permission_denials: []
        })
      ],
      exit: 0
    });
    const env = setup({
      config: {
        S1: {
          route: 'full_plan',
          plan_path: 'docs/plan.md',
          status: 'in_progress'
          // No plan_review: the guard it used to gate is retired with codex/ccx.
        }
      },
      slots: 1,
      makeRunner: (/** @type {string} */ name) =>
        createRunner(name, { spawn_impl })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    expect(spawn_impl.captured.calls.length).toBe(1);
    expect(env.scheduler.isRunning('S1')).toBe(true);
    await flush();
  });
});

describe('scheduler policy axis removal (worker-phase2 §2)', () => {
  test('a new attempt writes none of the retired merge-axis fields', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const a = /** @type {any} */ (
      Object.values(env.store.snapshot(WS).attempts)[0]
    );
    expect(a.merge_policy).toBe(null);
    expect(a.drift_policy).toBe(null);
    expect(a.demoted_reason).toBe(null);
  });

  test('bead policy metadata no longer reaches the session settings', async () => {
    const env = setup({
      config: { S1: /** @type {any} */ ({ merge_policy: 'auto_merge' }) },
      slots: 1
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const settings = env.runner.settingsFor('S1');
    expect(settings.merge_policy).toBe(undefined);
    expect(settings.drift_policy).toBe(undefined);
    expect(settings.merge_lock).toBe(undefined);
  });

  test('the session spawn carries no worker token', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    // `settings.env` is no longer empty — UI-8mvc §2 delivers the guard hook
    // through it — so the retired token is asserted by key, not by the absence
    // of the whole object.
    expect(env.runner.settingsFor('S1').env.BDUI_WORKER_TOKEN).toBe(undefined);
  });

  // UI-1xcd §3: the flag only ever relaxed the base-into-branch guard, which
  // now warns for every attempt — so the runner is not told about it at all.
  test('carries no conflict_resolution into the runner settings', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect('conflict_resolution' in env.runner.settingsFor('S1')).toBe(false);
  });
});

describe('scheduler merge axis detached from completion (worker-phase2 §1)', () => {
  test('a success never runs a post-merge verify_cmd', async () => {
    // The post-merge verify path is deleted outright: even with a merge_sha on
    // the record, nothing may reach for a detached verification worktree.
    const env = setup({ config: { S1: {} }, slots: 1, verifyOk: true });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.store.updateAttempt(WS, {
      attempt_id,
      patch: { merge_sha: 'f'.repeat(40) }
    });

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    expect(
      /** @type {any} */ (env.worktree).addDetached
    ).not.toHaveBeenCalled();
    expect(env.store.snapshot(WS).pr_wait.map((e) => e.bead_id)).toContain(
      'S1'
    );
    expect(env.store.snapshot(WS).attempts[attempt_id].verify_cmd_result).toBe(
      null
    );
  });
});

describe('scheduler fail-closed regressions (implementation review 2026-07-22)', () => {
  test('a success with a FAILED workflow_mode revert blocks the pr_wait move', async () => {
    // Every success now leaves the bead open, so the revert (unset) throwing
    // (bd down) must block the lane move unconditionally.
    const env = setup({
      config: { S1: { throwOnUnset: true } },
      slots: 1,
      verifyOk: true
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    const snap = env.store.snapshot(WS);
    expect(snap.pr_wait.map((e) => e.bead_id)).not.toContain('S1');
    expect(snap.attempts[attempt_id].status).toBe('failed');
    expect(snap.attempts[attempt_id].cause).toBe('workflow_mode_revert_failed');
    expect(snap.auto_advance).toBe(false);
  });
});

describe('scheduler exec-setting global defaults (worker-global-exec-defaults §3)', () => {
  /**
   * @param {any} bd
   * @param {string} bead_id
   * @param {string} method
   * @param {string} key
   */
  function calledMeta(bd, bead_id, method, key) {
    return bd.calls.some(
      (/** @type {any} */ c) =>
        c.method === method && c.bead_id === bead_id && c.key === key
    );
  }

  test('refuses a missing selected preset before worktree or metadata mutation', async () => {
    const resolveForDispatch = vi.fn(() => ({
      ok: false,
      reason: 'default_exec_preset_missing'
    }));
    const env = setup({
      config: { S1: {} },
      slots: 1,
      execPresetCoordinator: { resolveForDispatch }
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(resolveForDispatch).toHaveBeenCalledTimes(1);
    expect(env.worktree.add).not.toHaveBeenCalled();
    expect(env.bd.calls).toEqual([]);
    expect(env.runner.spawnOrder).toEqual([]);
    expect(env.store.snapshot(WS).admission.S1?.reason).toBe(
      'default_exec_preset_missing'
    );
  });

  test('refuses an illegal selected preset tuple before worktree, metadata, or spawn', async () => {
    const resolveForDispatch = vi.fn((/** @type {string} */ _ws, bead) => ({
      ok: true,
      preset_id: 'preset-fast',
      preset_revision: 4,
      settings: {
        orchestration_model: 'opus',
        orchestration_speed: 'fast'
      },
      exec: resolveExecSettings({
        bead,
        defaults: {
          orchestration_model: 'opus',
          orchestration_speed: 'fast'
        }
      })
    }));
    const env = setup({
      config: { S1: { model: null, effort: null } },
      slots: 1,
      execPresetCoordinator: { resolveForDispatch }
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(resolveForDispatch).toHaveBeenCalledTimes(1);
    expect(env.worktree.add).not.toHaveBeenCalled();
    expect(env.bd.calls).toEqual([]);
    expect(env.runner.spawnOrder).toEqual([]);
    expect(env.store.snapshot(WS).admission.S1?.reason).toBe(
      'illegal_orchestration_speed'
    );
  });

  test('pre-records the immutable preset provenance before the workflow_mode write', async () => {
    /** @type {any} */
    let env;
    const resolveForDispatch = vi.fn((/** @type {string} */ _ws, bead) => {
      const exec = resolveExecSettings({
        bead,
        defaults: { orchestration_model: 'sonnet' }
      });
      return {
        ok: true,
        preset_id: 'preset-1',
        preset_revision: 7,
        settings: {
          orchestration_model: 'sonnet',
          spec_review_model: 'codex'
        },
        exec
      };
    });
    env = setup({
      config: {
        S1: {
          model: null,
          effort: null,
          onSet: (/** @type {{ key: string }} */ call) => {
            if (call.key !== 'workflow_mode') {
              return;
            }
            const attempt = Object.values(env.store.snapshot(WS).attempts)[0];
            expect(attempt).toMatchObject({
              exec_default_preset_id: 'preset-1',
              exec_default_preset_revision: 7,
              exec_stamped_keys: null,
              exec_values: {
                orchestration_model: 'sonnet',
                spec_review_model: null
              }
            });
          }
        }
      },
      slots: 1,
      execPresetCoordinator: { resolveForDispatch }
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(resolveForDispatch).toHaveBeenCalledTimes(1);
    const attempt = Object.values(env.store.snapshot(WS).attempts)[0];
    expect(attempt).toMatchObject({
      exec_default_preset_id: 'preset-1',
      exec_default_preset_revision: 7,
      exec_values: {
        orchestration_model: 'sonnet',
        spec_review_model: null
      }
    });
    expect(Object.keys(attempt.exec_values)).toEqual(EXEC_SETTING_KEYS);
  });

  test('refuses before metadata or runner launch when normal attempt prerecord fails', async () => {
    const base_store = createQueueStore();
    const appendAttempt = vi.fn((workspace) => ({
      ok: false,
      conflict: false,
      queue: base_store.snapshot(workspace)
    }));
    const env = setup({
      store: { ...base_store, appendAttempt },
      config: { S1: {} },
      slots: 1
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(appendAttempt).toHaveBeenCalledTimes(1);
    expect(env.store.snapshot(WS).admission.S1?.reason).toBe(
      'attempt_prerecord_failed'
    );
    expect(env.worktree.remove).toHaveBeenCalledWith({
      repo: '/repo',
      bead_id: 'S1'
    });
    expect(env.bd.calls).toEqual([]);
    expect(env.runner.spawnOrder).toEqual([]);
  });

  test('workspace orchestration defaults reach spawn without stamping bead metadata', async () => {
    // Bead leaves runner/model/effort UNSET; the workspace global fills them.
    const env = setup({
      config: { S1: { runner: null, model: null, effort: null } },
      slots: 1,
      verifyOk: true
      // no verify_cmd → resolved auto_merge demotes to pr_stop → the pr_stop
      // termination path reverts workflow_mode AND the exec stamps.
    });
    seedExecDefaults(env.store, {
      orchestration_model: 'sol',
      orchestration_effort: 'high',
      orchestration_speed: 'fast'
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    // Resolved values reached the runner spawn (model/effort) + attempt record.
    expect(env.runner.settingsFor('S1').model).toBe('sol');
    expect(env.runner.settingsFor('S1').effort).toBe('high');
    expect(env.runner.settingsFor('S1').speed).toBe('fast');
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    const a = /** @type {any} */ (env.store.snapshot(WS).attempts[attempt_id]);
    expect(a.runner).toBe('codex');
    expect(a.model).toBe('sol');
    expect(a.effort).toBe('high');
    expect(a.speed).toBe('fast');
    // Nothing is copied onto the Bead any more (spec §C.4).
    expect(a.exec_stamped_keys).toBe(null);
    for (const key of [
      'orchestration_model',
      'orchestration_effort',
      'orchestration_speed'
    ]) {
      expect(calledMeta(env.bd, 'S1', 'setMetadata', key)).toBe(false);
    }

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();
    expect(env.store.snapshot(WS).pr_wait.map((e) => e.bead_id)).toContain(
      'S1'
    );
    // workflow_mode still reverts; there is no exec stamp left to revert.
    expect(calledMeta(env.bd, 'S1', 'unsetMetadata', 'workflow_mode')).toBe(
      true
    );
  });

  test('a bead session pin is used as-is and never stamped/reverted', async () => {
    // Bead pins spec_review_model=opus; no workspace layer supplies it now.
    const env = setup({
      config: {
        S1: {
          runner: 'claude',
          model: 'opus',
          effort: 'high',
          spec_review_model: 'opus'
        }
      },
      slots: 1,
      verifyOk: true
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    const a = /** @type {any} */ (env.store.snapshot(WS).attempts[attempt_id]);
    expect(a.exec_stamped_keys).toBe(null);
    expect(calledMeta(env.bd, 'S1', 'setMetadata', 'spec_review_model')).toBe(
      false
    );

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();
    expect(calledMeta(env.bd, 'S1', 'unsetMetadata', 'spec_review_model')).toBe(
      false
    );
  });

  test('a retired codex model in the globals resolves to the opus fallback (no stamp)', async () => {
    // The global orchestration_model predates the claude-only change, so it is
    // outside the catalog → the hardcoded fallback applies.
    const env = setup({
      config: { S1: { model: null } },
      slots: 1,
      verifyOk: true
    });
    seedExecDefaults(env.store, { orchestration_model: 'gpt-5.6' });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    expect(env.runner.settingsFor('S1').model).toBe('opus');
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    const a = /** @type {any} */ (env.store.snapshot(WS).attempts[attempt_id]);
    expect(a.model).toBe('opus');
    expect(a.exec_stamped_keys).toBe(null);
    expect(calledMeta(env.bd, 'S1', 'setMetadata', 'orchestration_model')).toBe(
      false
    );
  });

  test('a bead with no exec settings and no globals dispatches on the opus fallback', async () => {
    const env = setup({
      config: { S1: { model: null } },
      slots: 1,
      verifyOk: true
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.runner.settingsFor('S1').model).toBe('opus');
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    const a = /** @type {any} */ (env.store.snapshot(WS).attempts[attempt_id]);
    expect(a.model).toBe('opus');
    expect(a.exec_stamped_keys).toBe(null);
    expect(calledMeta(env.bd, 'S1', 'setMetadata', 'orchestration_model')).toBe(
      false
    );
  });

  test('a success reverts workflow_mode and leaves exec metadata untouched', async () => {
    // Every success leaves the bead open for a human merge click, so
    // workflow_mode reverts. No exec key was written, so none is unset.
    const env = setup({
      config: { S1: { runner: null, model: null, effort: null } },
      slots: 1,
      verifyOk: true
    });
    seedExecDefaults(env.store, {
      spec_review_model: 'opus',
      orchestration_model: 'sonnet',
      orchestration_effort: 'high'
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    const snap = env.store.snapshot(WS);
    expect(snap.pr_wait.map((e) => e.bead_id)).toContain('S1');
    expect(calledMeta(env.bd, 'S1', 'unsetMetadata', 'workflow_mode')).toBe(
      true
    );
    expect(
      calledMeta(env.bd, 'S1', 'unsetMetadata', 'orchestration_model')
    ).toBe(false);
  });
});

describe('scheduler resume (spec §1)', () => {
  /**
   * Seed a terminal attempt directly into the store (no dispatch), so a resume
   * test controls the prior snapshot precisely.
   *
   * @param {any} store
   * @param {string} attempt_id
   * @param {Partial<import('./queue-store.js').Attempt>} patch
   */
  function seedAttempt(store, attempt_id, patch) {
    const rev = store.snapshot(WS).revision;
    store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id, bead_id: /** @type {any} */ (patch).bead_id }
    });
    store.updateAttempt(WS, { attempt_id, patch });
  }

  /** @returns {Partial<import('./queue-store.js').Attempt>} */
  function resumablePrior(over = {}) {
    return {
      bead_id: 'B1',
      status: 'failed',
      repo: '/repo',
      target_base: 'main',
      base_oid: 'base-B1',
      runner: 'claude',
      model: 'opus',
      effort: 'high',
      session_id: 'sid-abc',
      workflow_mode_prior: null,
      cause: 'verify_failed:base_not_ancestor',
      ...over
    };
  }

  /**
   * @param {() => void} [onBranchTip]
   */
  function ownedWorktreeGit(onBranchTip = () => {}) {
    return vi.fn(async (args) => {
      if (args.includes('--abbrev-ref')) {
        return { code: 0, stdout: 'B1\n', stderr: '' };
      }
      if (String(args.at(-1)).includes('refs/heads/B1')) {
        onBranchTip();
        return { code: 0, stdout: `${'a'.repeat(40)}\n`, stderr: '' };
      }
      return { code: 1, stdout: '', stderr: '' };
    });
  }

  test('dismisses a terminal resume when its owned worktree disappears', async () => {
    const env = setup({
      config: { B1: { status: 'open' } },
      slots: 1,
      gitRun: ownedWorktreeGit()
    });
    env.worktree.exists.mockReturnValueOnce(true).mockReturnValueOnce(false);
    seedAttempt(
      env.store,
      'r1',
      resumablePrior({ base_drift: { skipped: 'test' } })
    );
    env.store.setAutoAdvance(WS, true);

    const result = await env.scheduler.resume(WS, 'r1');

    const child = Object.values(env.store.snapshot(WS).attempts).at(-1);
    expect(result).toEqual({ ok: false, reason: 'worktree_missing' });
    expect(child).toMatchObject({
      status: 'failed',
      cause: 'worktree_missing',
      dismissed_at: 1000,
      resumed_from: 'r1'
    });
    expect(env.store.snapshot(WS).auto_advance).toBe(true);
    expect(env.runner.spawnOrder).toEqual([]);
  });

  test('ends a closed resume as repair_target_resolved without spawning', async () => {
    const env = setup({
      config: { B1: { status: 'closed' } },
      slots: 1,
      gitRun: ownedWorktreeGit()
    });
    env.worktree.exists.mockReturnValueOnce(true).mockReturnValueOnce(false);
    seedAttempt(
      env.store,
      'r1',
      resumablePrior({ base_drift: { skipped: 'test' } })
    );

    const result = await env.scheduler.resume(WS, 'r1');

    const child = Object.values(env.store.snapshot(WS).attempts).at(-1);
    expect(result).toEqual({ ok: false, reason: 'repair_target_resolved' });
    expect(child).toMatchObject({
      status: 'failed',
      cause: 'repair_target_resolved',
      dismissed_at: 1000
    });
    expect(env.runner.spawnOrder).toEqual([]);
  });

  test('catches deletion during the final branch-tip await', async () => {
    let present = true;
    const env = setup({
      config: { B1: { status: 'open' } },
      slots: 1,
      gitRun: ownedWorktreeGit(() => {
        present = false;
      }),
      fs: { existsSync: () => present }
    });
    seedAttempt(
      env.store,
      'r1',
      resumablePrior({ base_drift: { skipped: 'test' } })
    );

    const result = await env.scheduler.resume(WS, 'r1');

    const cold = createQueueStore().snapshot(WS);
    const child = Object.values(cold.attempts).find(
      (attempt) => attempt.resumed_from === 'r1'
    );
    expect(result).toEqual({ ok: false, reason: 'worktree_missing' });
    expect(env.runner.spawnOrder).toEqual([]);
    expect(child).toMatchObject({
      status: 'failed',
      cause: 'worktree_missing',
      dismissed_at: 1000
    });
    expect(
      Object.values(cold.attempts).filter(
        (attempt) => attempt.status === 'running'
      )
    ).toEqual([]);
  });

  test('catches deletion before a fresh continuation spawn', async () => {
    let present = true;
    const exec_values = /** @type {Record<string, string|null>} */ (
      Object.fromEntries(EXEC_SETTING_KEYS.map((key) => [key, null]))
    );
    exec_values.orchestration_model = 'opus';
    exec_values.orchestration_effort = 'high';
    const env = setup({
      config: { B1: { status: 'open', model: 'sol', effort: 'xhigh' } },
      slots: 1,
      gitRun: ownedWorktreeGit(() => {
        present = false;
      }),
      fs: { existsSync: () => present }
    });
    seedAttempt(
      env.store,
      'r1',
      resumablePrior({
        base_drift: { skipped: 'test' },
        exec_values,
        speed: 'fast'
      })
    );
    const mismatch = await env.scheduler.resume(WS, 'r1');

    const result = await env.scheduler.resume(WS, 'r1', {
      continuation: 'fresh_current',
      decision_token: mismatch.continuation_mismatch.decision_token
    });

    expect(result).toEqual({ ok: false, reason: 'worktree_missing' });
    expect(env.runner.spawnOrder).toEqual([]);
  });

  test('keeps a live owned resume on its original cwd and session', async () => {
    const env = setup({
      config: { B1: { status: 'open' } },
      slots: 1,
      gitRun: ownedWorktreeGit()
    });
    seedAttempt(
      env.store,
      'r1',
      resumablePrior({ base_drift: { skipped: 'test' } })
    );

    const result = await env.scheduler.resume(WS, 'r1');

    expect(result.ok).toBe(true);
    expect(env.runner.cwdFor('B1')).toBe('/wt/B1');
    expect(env.runner.settingsFor('B1').resume_session_id).toBe('sid-abc');
  });

  test('binds a closed repo repair target and ends without a session', async () => {
    const repairSession = {
      judge: vi.fn(async () => ({ verdict: 'chain_closed', evidence: null }))
    };
    const env = setup({
      config: { B1: { status: 'open' } },
      slots: 1,
      repairSession,
      gitRun: ownedWorktreeGit()
    });
    env.worktree.exists.mockReturnValueOnce(true).mockReturnValueOnce(false);
    seedAttempt(
      env.store,
      'r1',
      resumablePrior({ base_drift: { skipped: 'test' } })
    );

    const result = await env.scheduler.dispatchRepoOperationRepair(WS, {
      bead_id: 'B1',
      operation_id: 'cleanup:B1',
      packet: {}
    });

    const child = Object.values(env.store.snapshot(WS).attempts).at(-1);
    expect(result).toEqual({
      ok: false,
      reason: 'repair_target_resolved'
    });
    expect(child).toMatchObject({
      repair_operation_id: 'cleanup:B1',
      status: 'failed',
      dismissed_at: 1000
    });
    expect(env.runner.spawnOrder).toEqual([]);
  });

  test('switches an unresolved repo repair to fresh in the shared checkout', async () => {
    const repairSession = {
      judge: vi.fn(async () => ({ verdict: 'unresolved', evidence: null }))
    };
    const env = setup({
      config: { B1: { status: 'open' } },
      slots: 1,
      repairSession,
      gitRun: ownedWorktreeGit()
    });
    env.worktree.exists.mockReturnValueOnce(true).mockReturnValueOnce(false);
    seedAttempt(
      env.store,
      'r1',
      resumablePrior({ base_drift: { skipped: 'test' } })
    );

    const result = await env.scheduler.dispatchRepoOperationRepair(WS, {
      bead_id: 'B1',
      operation_id: 'cleanup:B1',
      packet: {}
    });

    const child =
      env.store.snapshot(WS).attempts[
        /** @type {string} */ (result.attempt_id)
      ];
    expect(result.ok).toBe(true);
    expect(env.runner.cwdFor('B1')).toBe('/repo');
    expect(env.runner.settingsFor('B1').resume_session_id).toBeUndefined();
    expect(child).toMatchObject({
      repair_operation_id: 'cleanup:B1',
      continuation_mode: 'fresh'
    });
  });

  test('refuses resume when the current bead is worker-ineligible', async () => {
    const env = setup({
      config: { B1: { labels: ['worker-ineligible'] } },
      slots: 1
    });
    seedAttempt(env.store, 'r1', resumablePrior());

    const result = await env.scheduler.resume(WS, 'r1');

    expect(result).toEqual({ ok: false, reason: 'worker_ineligible' });
    expect(env.runner.spawnOrder).toEqual([]);
    expect(env.store.snapshot(WS).admission.B1.reason).toBe(
      'worker_ineligible'
    );
  });

  test('refuses resume when the current Bead snapshot cannot be read', async () => {
    const env = setup({
      config: { B1: { throwOnSnapshotAt: 'all' } },
      slots: 1
    });
    seedAttempt(env.store, 'r1', resumablePrior());

    const result = await env.scheduler.resume(WS, 'r1');

    expect(result).toEqual({ ok: false, reason: 'bd_snapshot_failed' });
    expect(env.runner.spawnOrder).toEqual([]);
  });

  test('refuses before resume metadata or runner launch when child prerecord fails', async () => {
    const base_store = createQueueStore();
    let deny_append = false;
    const store = {
      ...base_store,
      appendAttempt(/** @type {string} */ workspace, /** @type {any} */ input) {
        if (deny_append) {
          return {
            ok: false,
            conflict: false,
            queue: base_store.snapshot(workspace)
          };
        }
        return base_store.appendAttempt(workspace, input);
      }
    };
    const env = setup({ store, config: {}, slots: 1 });
    seedAttempt(env.store, 'r1', resumablePrior());
    deny_append = true;

    const result = await env.scheduler.resume(WS, 'r1');

    expect(result).toEqual({ ok: false, reason: 'attempt_prerecord_failed' });
    expect(env.bd.calls).toEqual([]);
    expect(env.runner.spawnOrder).toEqual([]);
  });

  test('refuses not_failed (running/done/unknown attempt)', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedAttempt(env.store, 'r1', resumablePrior({ status: 'running' }));
    expect((await env.scheduler.resume(WS, 'r1')).reason).toBe('not_failed');
    seedAttempt(env.store, 'r2', resumablePrior({ status: 'done' }));
    expect((await env.scheduler.resume(WS, 'r2')).reason).toBe('not_failed');
    expect((await env.scheduler.resume(WS, 'nope')).reason).toBe('not_failed');
  });

  test('refuses no_session_id for a pre-session-id attempt', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedAttempt(env.store, 'r1', resumablePrior({ session_id: null }));
    expect((await env.scheduler.resume(WS, 'r1')).reason).toBe('no_session_id');
  });

  test('a paused attempt is resumable and is announced as paused (§1.2/§1.4)', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedAttempt(
      env.store,
      'p1',
      resumablePrior({ status: 'paused', cause: null })
    );

    const res = await env.scheduler.resume(WS, 'p1');
    expect(res.ok).toBe(true);
    // The resume prompt says paused, never "failed" (§1.4).
    const prompt = env.runner.spawnedBead('B1').prompt;
    expect(prompt).toContain('일시정지');
    expect(prompt).not.toContain('실패로 남았다');
  });

  test('preserves conflict-resolution lineage across a paused resume', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedAttempt(
      env.store,
      'resolver-paused',
      resumablePrior({
        status: 'paused',
        cause: null,
        conflict_resolution: true
      })
    );

    const res = await env.scheduler.resume(WS, 'resolver-paused');

    expect(res.ok).toBe(true);
    expect(
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)]
        .conflict_resolution
    ).toBe(true);
  });

  test('a failed resume is announced as a failure', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedAttempt(env.store, 'f1', resumablePrior());

    expect((await env.scheduler.resume(WS, 'f1')).ok).toBe(true);

    expect(env.runner.spawnedBead('B1').prompt).toBe(
      [
        '이전 무인 세션이 완료 전에 중단되어 attempt가 실패로 남았다(bead B1).',
        '같은 워크트리에서 세션을 이어 진행한다. 먼저 워크트리·bead 상태·PR/머지 현황을 직접 점검해 어디까지 진행됐는지 확인하라.',
        '이미 끝난 단계는 반복하지 말고, 남은 계약 단계만 마무리한 뒤 종료하라.'
      ].join(' ')
    );
  });

  test('appends user instructions to the existing resume prompt', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedAttempt(env.store, 'f1', resumablePrior());

    const result = await env.scheduler.resume(WS, 'f1', {
      instructions: '실패 로그를 먼저 확인하라.'
    });

    expect(result.ok).toBe(true);
    expect(env.runner.spawnedBead('B1').prompt).toBe(
      [
        '이전 무인 세션이 완료 전에 중단되어 attempt가 실패로 남았다(bead B1). 같은 워크트리에서 세션을 이어 진행한다. 먼저 워크트리·bead 상태·PR/머지 현황을 직접 점검해 어디까지 진행됐는지 확인하라. 이미 끝난 단계는 반복하지 말고, 남은 계약 단계만 마무리한 뒤 종료하라.',
        '사용자가 이번 재개에 추가 지침을 남겼다. 아래 지침이 위 기본 절차와 충돌하면 지침을 우선하라.\n실패 로그를 먼저 확인하라.'
      ].join('\n\n')
    );
  });

  test('refuses worktree_missing when the bead worktree is gone', async () => {
    const env = setup({ config: {}, slots: 1 });
    env.worktree.exists.mockReturnValue(false);
    seedAttempt(env.store, 'r1', resumablePrior());
    expect((await env.scheduler.resume(WS, 'r1')).reason).toBe(
      'worktree_missing'
    );
  });

  test('refuses bead_running when a running attempt exists for the same bead', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedAttempt(env.store, 'r1', resumablePrior());
    seedAttempt(env.store, 'live', { bead_id: 'B1', status: 'running' });
    expect((await env.scheduler.resume(WS, 'r1')).reason).toBe('bead_running');
  });

  test('refuses already_resumed when a child carries resumed_from (success OR failure, cold reload)', async () => {
    // child succeeded
    const env = setup({ config: {}, slots: 1 });
    seedAttempt(env.store, 'anc', resumablePrior());
    seedAttempt(env.store, 'kid', {
      bead_id: 'B1',
      status: 'done',
      resumed_from: 'anc'
    });
    expect((await env.scheduler.resume(WS, 'anc')).reason).toBe(
      'already_resumed'
    );

    // child failed → ancestor still spent
    const env2 = setup({ config: {}, slots: 1 });
    seedAttempt(env2.store, 'anc', resumablePrior());
    seedAttempt(env2.store, 'kid', {
      bead_id: 'B1',
      status: 'failed',
      resumed_from: 'anc'
    });
    expect((await env2.scheduler.resume(WS, 'anc')).reason).toBe(
      'already_resumed'
    );

    // cold reload: the judgment is derived from the persisted attempts scan.
    env2.store.__clearCacheForTest();
    expect((await env2.scheduler.resume(WS, 'anc')).reason).toBe(
      'already_resumed'
    );
  });

  test('an absent prior runner no longer refuses the resume (claude-only)', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedAttempt(env.store, 'r1', resumablePrior({ runner: null }));
    expect((await env.scheduler.resume(WS, 'r1')).ok).toBe(true);
  });

  test('a codex ancestor resumes onto codex', async () => {
    const env = setup({ config: { B1: { model: 'sol' } }, slots: 1 });
    seedAttempt(env.store, 'r2', resumablePrior({ runner: 'codex' }));
    const res = await env.scheduler.resume(WS, 'r2');
    expect(res.ok).toBe(true);
    // The child reopens the ancestor's session id, which only the CLI that
    // minted it can accept (§C-2).
    expect(env.store.snapshot(WS).attempts[String(res.attempt_id)].runner).toBe(
      'codex'
    );
  });

  test('uses the current tuple after globals change; no worktree.add; resumed_from set', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedAttempt(
      env.store,
      'anc',
      resumablePrior({ model: 'sonnet', effort: 'high', speed: 'fast' })
    );
    // Flip the workspace-global exec defaults AFTER the failure.
    seedExecDefaults(env.store, { orchestration_model: 'opus' });

    const res = await env.scheduler.resume(WS, 'anc');
    expect(res.ok).toBe(true);
    const child =
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)];
    // Relaunch tuple comes from the current resolution, while history stays
    // immutable on the source attempt.
    expect(child.model).toBe('opus');
    expect(child.effort).toBe('high');
    expect(child.speed).toBe('default');
    expect(child.base_oid).toBe('base-B1');
    expect(child.resumed_from).toBe('anc');
    expect(child).toMatchObject({
      completion_root_id: null,
      completion_op_id: null,
      completion_mode: null,
      completion_failure_key: null
    });
    // Worktree reused — never re-created.
    expect(env.worktree.add).not.toHaveBeenCalled();
    // The resume argv carries the prior session id.
    expect(env.runner.settingsFor('B1').resume_session_id).toBe('sid-abc');
    expect(env.runner.settingsFor('B1').speed).toBe('default');
  });

  test('requires an explicit cross-runner decision before any state change', async () => {
    const config = { B1: { model: 'sol', effort: 'xhigh' } };
    const env = setup({ config, slots: 1 });
    const exec_values = /** @type {Record<string, string|null>} */ (
      Object.fromEntries(EXEC_SETTING_KEYS.map((key) => [key, null]))
    );
    exec_values.orchestration_model = 'opus';
    exec_values.orchestration_effort = 'high';
    seedAttempt(
      env.store,
      'cross-runner',
      resumablePrior({ exec_values, speed: 'fast' })
    );
    const before = env.store.snapshot(WS);

    const mismatch = await env.scheduler.resume(WS, 'cross-runner');

    expect(mismatch).toMatchObject({
      ok: false,
      reason: 'runner_mismatch',
      continuation_mismatch: {
        prior_available: true,
        prior: { runner: 'claude', speed: 'fast' },
        current: { runner: 'codex', model: 'sol', effort: 'xhigh' }
      }
    });
    expect(env.store.snapshot(WS)).toEqual(before);
    expect(env.bd.calls).toEqual([]);
    expect(env.runner.spawnOrder).toEqual([]);

    const resumed = await env.scheduler.resume(WS, 'cross-runner', {
      continuation: 'fresh_current',
      decision_token: mismatch.continuation_mismatch.decision_token
    });

    expect(resumed.ok).toBe(true);
    expect(env.runner.settingsFor('B1')).toMatchObject({
      model: 'sol',
      effort: 'xhigh'
    });
    expect(env.runner.settingsFor('B1')).not.toHaveProperty(
      'resume_session_id'
    );
    expect(
      env.store.snapshot(WS).attempts[String(resumed.attempt_id)]
    ).toMatchObject({
      runner: 'codex',
      continuation_mode: 'fresh',
      resumed_from: 'cross-runner'
    });
  });

  test('refreshes the mismatch when bead metadata drifts without a queue write', async () => {
    const config = { B1: { model: 'sol', effort: 'high' } };
    const env = setup({ config, slots: 1 });
    seedAttempt(env.store, 'drift', resumablePrior());
    const mismatch = await env.scheduler.resume(WS, 'drift');
    config.B1.effort = 'xhigh';

    const stale = await env.scheduler.resume(WS, 'drift', {
      continuation: 'fresh_current',
      decision_token: mismatch.continuation_mismatch.decision_token
    });

    expect(stale).toMatchObject({
      ok: false,
      reason: 'continuation_decision_stale',
      continuation_mismatch: {
        current: { runner: 'codex', effort: 'xhigh' }
      }
    });
    expect(env.runner.spawnOrder).toEqual([]);
  });

  test('drops a stale explicit choice when drift removes the runner mismatch', async () => {
    const config = { B1: { model: 'sol', effort: 'high' } };
    const env = setup({ config, slots: 1 });
    seedAttempt(env.store, 'drift-same', resumablePrior());
    const mismatch = await env.scheduler.resume(WS, 'drift-same');
    config.B1.model = 'opus';

    const resumed = await env.scheduler.resume(WS, 'drift-same', {
      continuation: 'fresh_current',
      decision_token: mismatch.continuation_mismatch.decision_token
    });

    expect(resumed.ok).toBe(true);
    expect(env.runner.settingsFor('B1').resume_session_id).toBe('sid-abc');
    expect(
      env.store.snapshot(WS).attempts[String(resumed.attempt_id)]
    ).toMatchObject({
      runner: 'claude',
      model: 'opus',
      continuation_mode: 'session'
    });
  });

  test('binds the relaunch prerecord to the revalidated queue revision', async () => {
    const store = createQueueStore();
    const guardHook = {
      install: vi.fn(() => {
        store.setAutoAdvance(WS, false);
        return { ok: true };
      }),
      remove: vi.fn(() => ({ ok: true }))
    };
    const env = setup({ config: {}, slots: 1, store, guardHook });
    seedAttempt(store, 'cas-drift', resumablePrior());

    const result = await env.scheduler.resume(WS, 'cas-drift');

    expect(result).toEqual({ ok: false, reason: 'attempt_prerecord_failed' });
    expect(guardHook.remove).toHaveBeenCalled();
    expect(env.runner.spawnOrder).toEqual([]);
    expect(
      Object.values(store.snapshot(WS).attempts).some(
        (/** @type {any} */ attempt) => attempt.resumed_from === 'cas-drift'
      )
    ).toBe(false);
  });

  test('restores current bead metadata after an explicit prior-session run', async () => {
    const env = setup({
      config: { B1: { model: 'sol', effort: 'xhigh' } },
      slots: 1
    });
    const exec_values = /** @type {Record<string, string|null>} */ (
      Object.fromEntries(EXEC_SETTING_KEYS.map((key) => [key, null]))
    );
    exec_values.orchestration_model = 'opus';
    exec_values.orchestration_effort = 'high';
    exec_values.orchestration_speed = 'fast';
    seedAttempt(
      env.store,
      'prior-choice',
      resumablePrior({ exec_values, speed: 'fast' })
    );
    await env.bd.setMetadata('B1', 'orchestration_model', 'sol');
    await env.bd.setMetadata('B1', 'orchestration_effort', 'xhigh');
    const mismatch = await env.scheduler.resume(WS, 'prior-choice');

    const resumed = await env.scheduler.resume(WS, 'prior-choice', {
      continuation: 'prior_session',
      decision_token: mismatch.continuation_mismatch.decision_token
    });

    expect(resumed.ok).toBe(true);
    const child = env.store.snapshot(WS).attempts[String(resumed.attempt_id)];
    expect(child).toMatchObject({
      runner: 'claude',
      model: 'opus',
      effort: 'high',
      speed: 'fast',
      continuation_mode: 'session',
      exec_restore_values: {
        orchestration_model: 'sol',
        orchestration_effort: 'xhigh'
      }
    });

    env.runner.finish('B1', { success: true });
    await flush();
    await flush();

    const model_calls = env.bd.calls.filter(
      (call) =>
        call.method === 'setMetadata' && call.key === 'orchestration_model'
    );
    expect(model_calls.at(-1)?.value).toBe('sol');
  });

  test('uses current Fast speed for a legacy prior attempt with no speed', async () => {
    const env = setup({
      config: { B1: { model: 'sol', effort: 'xhigh' } },
      slots: 1
    });
    seedAttempt(env.store, 'legacy', resumablePrior({ runner: 'codex' }));
    seedExecDefaults(env.store, {
      orchestration_model: 'sol',
      orchestration_speed: 'fast'
    });

    const res = await env.scheduler.resume(WS, 'legacy');

    expect(res.ok).toBe(true);
    expect(env.runner.settingsFor('B1').speed).toBe('fast');
    expect(
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)]
        .speed
    ).toBe('fast');
  });

  test('resumed_from survives cold reload', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedAttempt(env.store, 'anc', resumablePrior());
    const res = await env.scheduler.resume(WS, 'anc');
    expect(res.ok).toBe(true);
    env.store.__clearCacheForTest();
    expect(
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)]
        .resumed_from
    ).toBe('anc');
  });

  test('a resumed attempt does not carry the retired merge-axis fields forward', async () => {
    const env = setup({ config: {}, slots: 1 });
    // A legacy ancestor still carries the old fields on its own record.
    seedAttempt(
      env.store,
      'anc',
      resumablePrior(
        /** @type {any} */ ({
          merge_policy: 'pr_stop',
          drift_policy: 'halt',
          demoted_reason: 'verify_cmd_unset',
          merge_sha: 'f'.repeat(40)
        })
      )
    );

    const res = await env.scheduler.resume(WS, 'anc');

    const snap = env.store.snapshot(WS);
    const child = snap.attempts[/** @type {string} */ (res.attempt_id)];
    // History is immutable on the ancestor …
    expect(snap.attempts['anc'].merge_policy).toBe('pr_stop');
    expect(snap.attempts['anc'].merge_sha).toBe('f'.repeat(40));
    // … but the new attempt writes none of them.
    expect(child.merge_policy).toBe(null);
    expect(child.drift_policy).toBe(null);
    expect(child.demoted_reason).toBe(null);
    expect(child.merge_sha).toBe(null);
  });

  test('re-stamps workflow_mode and re-resolves exec without stamping it', async () => {
    const env = setup({ config: { B1: { model: null } }, slots: 1 });
    seedExecDefaults(env.store, { orchestration_model: 'sol' });
    seedAttempt(
      env.store,
      'anc',
      resumablePrior({
        workflow_mode_prior: null,
        exec_default_preset_id: 'preset-1',
        exec_default_preset_revision: 7,
        exec_stamped_keys: ['orchestration_model'],
        exec_values: { orchestration_model: 'opus' },
        runner: 'codex'
      })
    );
    const res = await env.scheduler.resume(WS, 'anc');
    expect(res.ok).toBe(true);
    // fast_track re-stamped; the exec key is resolved but never written.
    expect(
      env.bd.calls.some(
        (c) =>
          c.method === 'setMetadata' &&
          c.bead_id === 'B1' &&
          c.key === 'workflow_mode' &&
          c.value === 'fast_track'
      )
    ).toBe(true);
    expect(
      env.bd.calls.some(
        (c) => c.method === 'setMetadata' && c.key === 'orchestration_model'
      )
    ).toBe(false);
    const child =
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)];
    expect(child.exec_stamped_keys).toBe(null);
    expect(child).toMatchObject({
      exec_default_preset_id: null,
      exec_default_preset_revision: null,
      exec_values: { orchestration_model: 'sol' }
    });
  });
});

describe('scheduler conflict resolution (worker-phase2 §6)', () => {
  /**
   * Seed the `done` attempt a `pr_wait` bead carries: the original session,
   * finished, with its session id captured.
   *
   * @param {any} store
   * @param {Partial<import('./queue-store.js').Attempt>} [over]
   */
  function seedDoneAttempt(store, over = {}) {
    const rev = store.snapshot(WS).revision;
    store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'd1', bead_id: 'B1' }
    });
    store.updateAttempt(WS, {
      attempt_id: 'd1',
      patch: {
        bead_id: 'B1',
        status: 'done',
        repo: '/repo',
        target_base: 'main',
        base_oid: 'base-B1',
        runner: 'claude',
        model: 'opus',
        speed: 'fast',
        session_id: 'sid-orig',
        finished_at: 50,
        ...over
      }
    });
  }

  test('resumes the original session in its existing worktree', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedDoneAttempt(env.store);

    const res = await env.scheduler.resolveConflict(WS, 'B1');

    expect(res.ok).toBe(true);
    // `--resume <session_id>` argv branch + the bead's own worktree, not a new one.
    expect(env.runner.settingsFor('B1').resume_session_id).toBe('sid-orig');
    expect(env.runner.settingsFor('B1').speed).toBe('default');
    expect(env.worktree.add).not.toHaveBeenCalled();
  });

  test('links the new attempt with resumed_from and marks it a resolution attempt', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedDoneAttempt(env.store);

    const res = await env.scheduler.resolveConflict(WS, 'B1');

    const child =
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)];
    expect(child.resumed_from).toBe('d1');
    expect(child.conflict_resolution).toBe(true);
    expect(child.completion_root_id).toBe(null);
  });

  test('starts conflict resolution after the source completion op was consumed', async () => {
    const env = setup({ config: {}, slots: 1 });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'completion-root-source',
        bead_id: 'B1',
        status: 'done',
        repo: '/repo',
        target_base: 'main',
        base_oid: COMPLETION_FAILURE.base_sha,
        runner: 'claude',
        finished_at: 49
      }
    });
    seedDoneAttempt(env.store, {
      completion_root_id: 'B1',
      completion_op_id: 'consumed-repair-op',
      completion_mode: 'resume_root',
      completion_failure_key: COMPLETION_FAILURE
    });
    env.store.moveToPrWait(WS, {
      bead_id: 'B1',
      attempt_id: 'd1',
      patch: { finished_at: 50 }
    });
    env.store.enqueueCompletionIntent(WS, {
      root_bead_id: 'B1',
      source_attempt_id: 'completion-root-source',
      target_base: 'main',
      subject: {
        role: 'root',
        bead_id: 'B1',
        pr_url: 'https://github.com/o/r/pull/1',
        head_sha: COMPLETION_FAILURE.subject_sha,
        base_sha: COMPLETION_FAILURE.base_sha,
        merged_sha: null
      }
    });
    env.store.prepareCompletionOp(WS, {
      root_bead_id: 'B1',
      phase: 'merging',
      op: {
        op_id: 'merge-subject-op',
        kind: 'merge_subject',
        failure_key: COMPLETION_FAILURE,
        attempt_id: null,
        repair_bead_id: null,
        status: 'prepared'
      }
    });

    const res = await env.scheduler.resolveConflict(WS, 'B1');

    expect(res.ok).toBe(true);
    const child =
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)];
    expect(child).toMatchObject({
      resumed_from: 'd1',
      conflict_resolution: true,
      completion_root_id: null,
      completion_op_id: null,
      completion_mode: null,
      completion_failure_key: null
    });
  });

  // The ATTEMPT RECORD keeps the flag (asserted above); the guard input does
  // not exist any more (UI-1xcd §3).
  test('does not pass conflict_resolution into the runner settings', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedDoneAttempt(env.store);

    await env.scheduler.resolveConflict(WS, 'B1');

    expect('conflict_resolution' in env.runner.settingsFor('B1')).toBe(false);
  });

  test('instructs merge-into-branch, never rebase, and never a PR merge', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedDoneAttempt(env.store);

    await env.scheduler.resolveConflict(WS, 'B1');

    const prompt = env.runner.spawnedBead('B1').prompt;
    expect(prompt).toContain('git merge origin/main');
    expect(prompt).toContain('rebase와 force-push는 금지');
    expect(prompt).toContain('PR 머지는 절대 수행하지 마라');
  });

  test('instructs recording the resolution as a bd comment on the bead', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedDoneAttempt(env.store);

    await env.scheduler.resolveConflict(WS, 'B1');

    const prompt = env.runner.spawnedBead('B1').prompt;
    expect(prompt).toContain('bd comment B1');
    expect(prompt).toContain('해소 내역을 기록하라');
  });

  test('runs even with the slot cap already full (human-click origin)', async () => {
    const env = setup({
      config: { A1: { ready: true, repo: '/repo', target_base: 'main' } },
      slots: 1
    });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);
    await flush();
    expect(env.scheduler.runningCount()).toBe(1);
    seedDoneAttempt(env.store);

    const res = await env.scheduler.resolveConflict(WS, 'B1');

    expect(res.ok).toBe(true);
    expect(env.scheduler.runningCount()).toBe(2);
  });

  test('defers a queue-origin resolver while another worker bead is active', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedDoneAttempt(env.store);
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'other-running',
        bead_id: 'A1',
        status: 'running'
      }
    });

    const res = await env.scheduler.resolveConflict(WS, 'B1', {
      queue_bead_id: 'B1',
      wait_ms: 100
    });

    expect(res).toEqual({ ok: false, reason: 'worker_sessions_busy' });
    expect(env.runner.spawnOrder).toEqual([]);
  });

  test('refuses no_session_id when no attempt of the bead captured one', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedDoneAttempt(env.store, { session_id: null });

    expect((await env.scheduler.resolveConflict(WS, 'B1')).reason).toBe(
      'no_session_id'
    );
  });

  test('refuses worktree_missing when the bead worktree is gone', async () => {
    const env = setup({ config: {}, slots: 1 });
    env.worktree.exists.mockReturnValue(false);
    seedDoneAttempt(env.store);

    expect((await env.scheduler.resolveConflict(WS, 'B1')).reason).toBe(
      'worktree_missing'
    );
  });

  test('a normal dispatch carries no resolution flag in its settings either', async () => {
    const env = setup({
      config: { A1: { ready: true, repo: '/repo', target_base: 'main' } },
      slots: 1
    });
    seedQueue(env.store, ['A1']);

    await env.scheduler.tick(WS);
    await flush();

    expect('conflict_resolution' in env.runner.settingsFor('A1')).toBe(false);
  });
});

describe('scheduler external-PR conflict dispatch (UI-w0hi §1)', () => {
  const EXT_ROW = {
    bead_id: 'X1',
    pr_url: 'https://github.com/o/r/pull/777',
    pr_number: 777,
    added_at: 1
  };

  /**
   * An external bead as bd really holds it: `resolved`, hence blocked and not
   * ready — the two verdicts this dispatch must NOT consult.
   *
   * @param {{ bead?: Record<string, any>, registry?: boolean, defaults?: Record<string, string>, store?: any, execPresetCoordinator?: any, notify?: any }} [over]
   */
  function extEnv(over = {}) {
    const env = setup({
      config: {
        X1: {
          repo: '/repo',
          target_base: 'main',
          status: 'resolved',
          ready: false,
          blocked: true,
          ...(over.bead || {})
        }
      },
      store: over.store,
      slots: 1,
      notify: over.notify,
      execPresetCoordinator: over.execPresetCoordinator,
      externalPrs: over.registry === false ? undefined : { X1: EXT_ROW }
    });
    if (over.defaults) {
      seedExecDefaults(env.store, over.defaults);
    }
    return env;
  }

  /**
   * Persist a `running` attempt for a bead, the way a live session leaves one.
   *
   * @param {any} store
   * @param {Partial<import('./queue-store.js').Attempt>} patch
   */
  function seedRunningAttempt(store, patch) {
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id: 'prev-1', bead_id: 'X1' }
    });
    store.updateAttempt(WS, { attempt_id: 'prev-1', patch });
  }

  test('refuses an incompatible selected preset before external metadata mutation', async () => {
    const resolveForDispatch = vi.fn(() => ({
      ok: false,
      reason: 'default_exec_preset_incompatible'
    }));
    const env = extEnv({ execPresetCoordinator: { resolveForDispatch } });

    const result = await env.scheduler.dispatchExternalConflict(
      WS,
      'X1',
      'main'
    );

    expect(result).toEqual({
      ok: false,
      reason: 'default_exec_preset_incompatible'
    });
    expect(resolveForDispatch).toHaveBeenCalledTimes(1);
    expect(env.bd.calls).toEqual([]);
    expect(env.runner.spawnOrder).toEqual([]);
    expect(env.store.snapshot(WS).attempts).toEqual({});
  });

  test('refuses before external metadata or runner launch when attempt prerecord fails', async () => {
    const base_store = createQueueStore();
    const appendAttempt = vi.fn((workspace) => ({
      ok: false,
      conflict: false,
      queue: base_store.snapshot(workspace)
    }));
    const env = extEnv({ store: { ...base_store, appendAttempt } });

    const result = await env.scheduler.dispatchExternalConflict(
      WS,
      'X1',
      'main'
    );

    expect(result).toEqual({ ok: false, reason: 'attempt_prerecord_failed' });
    expect(env.bd.calls).toEqual([]);
    expect(env.runner.spawnOrder).toEqual([]);
  });

  test('re-resolves a repeated external conflict before launch', async () => {
    const resolveForDispatch = vi.fn(() => ({
      ok: false,
      reason: 'default_exec_preset_missing'
    }));
    const env = extEnv({ execPresetCoordinator: { resolveForDispatch } });
    seedRunningAttempt(env.store, {
      status: 'done',
      runner: 'codex',
      model: 'sol',
      effort: 'high',
      speed: 'fast',
      exec_default_preset_id: 'preset-7',
      exec_default_preset_revision: 7,
      exec_stamped_keys: ['spec_review_model'],
      exec_values: {
        orchestration_model: 'sol',
        orchestration_effort: 'high',
        spec_review_model: 'codex'
      }
    });

    const result = await env.scheduler.dispatchExternalConflict(
      WS,
      'X1',
      'main'
    );

    expect(result).toEqual({
      ok: false,
      reason: 'default_exec_preset_missing'
    });
    expect(resolveForDispatch).toHaveBeenCalledOnce();
    expect(env.runner.factoryNames).toEqual([]);
  });

  test('starts a fresh current session for a repeated legacy external attempt', async () => {
    const env = extEnv({ bead: { model: 'sonnet', effort: 'high' } });
    seedRunningAttempt(env.store, {
      status: 'done',
      repo: '/repo',
      target_base: 'main',
      runner: 'claude',
      model: 'opus',
      session_id: null,
      external_conflict: true,
      finished_at: 50
    });

    const result = await env.scheduler.dispatchExternalConflict(
      WS,
      'X1',
      'main'
    );

    expect(result.ok).toBe(true);
    expect(env.runner.settingsFor('X1')).toMatchObject({ model: 'sonnet' });
    expect(env.runner.settingsFor('X1')).not.toHaveProperty(
      'resume_session_id'
    );
    expect(
      env.store.snapshot(WS).attempts[/** @type {string} */ (result.attempt_id)]
    ).toMatchObject({
      resumed_from: 'prev-1',
      continuation_mode: 'fresh',
      external_conflict: true
    });
  });

  test('dispatches a fresh session in the bead worktree with no resume', async () => {
    const env = extEnv();

    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(res.ok).toBe(true);
    expect(env.runner.settingsFor('X1').resume_session_id).toBe(undefined);
    expect(env.runner.cwdFor('X1')).toBe('/wt/X1');
    expect(env.worktree.add).not.toHaveBeenCalled();
  });

  test('records the attempt as an external conflict resolution', async () => {
    const env = extEnv();

    const res = await env.scheduler.dispatchExternalConflict(
      WS,
      'X1',
      'develop'
    );

    const a =
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)];
    expect(a).toMatchObject({
      bead_id: 'X1',
      repo: '/repo',
      target_base: 'develop',
      base_oid: null,
      runner: 'claude',
      resumed_from: null,
      conflict_resolution: true,
      external_conflict: true
    });
  });

  test('falls back to main when the click observed no base', async () => {
    const env = extEnv();

    await env.scheduler.dispatchExternalConflict(WS, 'X1', '');

    expect(env.runner.spawnedBead('X1').prompt).toContain(
      'git merge origin/main'
    );
  });

  test('does not pass conflict_resolution into the runner settings', async () => {
    const env = extEnv();

    await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect('conflict_resolution' in env.runner.settingsFor('X1')).toBe(false);
  });

  test('runs with the slot cap already full (human-click origin)', async () => {
    const env = setup({
      config: {
        A1: { repo: '/repo', target_base: 'main' },
        X1: { repo: '/repo', target_base: 'main', ready: false, blocked: true }
      },
      slots: 1,
      externalPrs: { X1: EXT_ROW }
    });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);
    await flush();
    expect(env.scheduler.runningCount()).toBe(1);

    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(res.ok).toBe(true);
    expect(env.scheduler.runningCount()).toBe(2);
  });

  test('defers a queue-origin external resolver while another worker bead is paused', async () => {
    const env = extEnv();
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'other-paused',
        bead_id: 'A1',
        status: 'paused'
      }
    });

    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main', {
      queue_bead_id: 'X1',
      wait_ms: 100
    });

    expect(res).toEqual({ ok: false, reason: 'worker_sessions_busy' });
    expect(env.runner.spawnOrder).toEqual([]);
  });

  test('refuses bead_running while an attempt of the bead is running', async () => {
    const env = extEnv();
    seedRunningAttempt(env.store, { status: 'running', repo: '/repo' });

    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(res).toEqual({ ok: false, reason: 'bead_running' });
    expect(Object.keys(env.store.snapshot(WS).attempts)).toEqual(['prev-1']);
  });

  test('refuses not_external when the registry does not know the bead', async () => {
    const env = extEnv({ registry: false });

    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(res).toEqual({ ok: false, reason: 'not_external' });
    expect(env.store.snapshot(WS).attempts).toEqual({});
  });

  test('refuses bd_snapshot_failed when bd cannot be read', async () => {
    const env = extEnv({ bead: { throwOnSnapshotAt: 'all' } });

    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(res).toEqual({ ok: false, reason: 'bd_snapshot_failed' });
    expect(env.store.snapshot(WS).attempts).toEqual({});
  });

  test('refuses worktree_missing when the delivering worktree is gone', async () => {
    const env = extEnv();
    env.worktree.exists.mockReturnValue(false);

    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(res).toEqual({ ok: false, reason: 'worktree_missing' });
    expect(env.store.snapshot(WS).attempts).toEqual({});
  });

  test('stamps workflow_mode=fast_track and reverts it when the session ends', async () => {
    const env = extEnv();

    await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(env.bd.calls).toContainEqual({
      method: 'setMetadata',
      bead_id: 'X1',
      key: 'workflow_mode',
      value: 'fast_track'
    });
    env.runner.finish('X1', { success: true });
    await flush();
    await flush();
    expect(env.bd.calls).toContainEqual({
      method: 'unsetMetadata',
      bead_id: 'X1',
      key: 'workflow_mode'
    });
  });

  test('records workflow_mode_record_failed and launches nothing when the stamp fails', async () => {
    const env = extEnv({ bead: { throwOnSet: true } });

    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(res).toEqual({ ok: false, reason: 'workflow_mode_record_failed' });
    const a = Object.values(env.store.snapshot(WS).attempts)[0];
    expect(a.status).toBe('failed');
    expect(a.cause).toBe('workflow_mode_record_failed');
    expect(env.runner.spawnOrder).toEqual([]);
  });

  test('launches on the workspace orchestration values without stamping them', async () => {
    const env = extEnv({
      bead: { model: null, effort: null },
      defaults: {
        orchestration_model: 'sol',
        orchestration_effort: 'high',
        orchestration_speed: 'fast'
      }
    });

    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    const a =
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)];
    expect(a.exec_stamped_keys).toBe(null);
    expect(a.model).toBe('sol');
    expect(a.speed).toBe('fast');
    expect(env.runner.settingsFor('X1').model).toBe('sol');
    expect(env.runner.settingsFor('X1').speed).toBe('fast');
    expect(
      env.bd.calls.some(
        (/** @type {any} */ c) =>
          c.method === 'setMetadata' && c.key === 'orchestration_model'
      )
    ).toBe(false);
  });

  test('closes a successful live resolution without touching the durable lane', async () => {
    const notify = {
      attemptStarted: vi.fn(),
      attemptFailed: vi.fn(),
      prWaitEntered: vi.fn()
    };
    const env = extEnv({ notify });
    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    env.runner.finish('X1', { success: true });
    await flush();
    await flush();

    const q = env.store.snapshot(WS);
    expect(q.attempts[/** @type {string} */ (res.attempt_id)].status).toBe(
      'done'
    );
    expect(q.pr_wait).toEqual([]);
    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();
    expect(notify.prWaitEntered).not.toHaveBeenCalled();
    expect(env.bd.calls).toContainEqual({
      method: 'unsetMetadata',
      bead_id: 'X1',
      key: 'workflow_mode'
    });
  });

  test('keeps the ordinary failure route when the resolution session fails', async () => {
    const env = extEnv();
    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    env.runner.finish('X1', { success: false, reason: 'nonzero_exit' });
    await flush();
    await flush();

    const q = env.store.snapshot(WS);
    expect(q.attempts[/** @type {string} */ (res.attempt_id)].status).toBe(
      'failed'
    );
    expect(q.pr_wait).toEqual([]);
    expect(q.queue).toEqual([]);
  });

  test('recovers a restart-surviving resolution attempt as done, not into pr_wait', async () => {
    const notify = {
      attemptStarted: vi.fn(),
      attemptFailed: vi.fn(),
      prWaitEntered: vi.fn()
    };
    const env = setup({
      config: { X1: {} },
      slots: 1,
      notify,
      probePid: () => ({ alive: false, started_at: null })
    });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'ext-1', bead_id: 'X1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'ext-1',
      patch: {
        status: 'running',
        pid: 4242,
        started_at: 1000,
        repo: '/repo',
        target_base: 'main',
        workflow_mode_prior: null,
        exec_stamped_keys: ['spec_review_model'],
        exec_values: { spec_review_model: 'opus' },
        conflict_resolution: true,
        external_conflict: true
      }
    });

    await env.scheduler.reconcile(WS);

    const q = env.store.snapshot(WS);
    expect(q.attempts['ext-1'].status).toBe('done');
    expect(q.pr_wait).toEqual([]);
    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();
    expect(notify.prWaitEntered).not.toHaveBeenCalled();
    expect(env.bd.calls).toContainEqual({
      method: 'unsetMetadata',
      bead_id: 'X1',
      key: 'spec_review_model'
    });
    expect(env.bd.calls).toContainEqual({
      method: 'unsetMetadata',
      bead_id: 'X1',
      key: 'workflow_mode'
    });
  });

  test('a resumed external resolution inherits the external_conflict identifier', async () => {
    const env = extEnv();
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'ext-1', bead_id: 'X1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'ext-1',
      patch: {
        status: 'failed',
        repo: '/repo',
        target_base: 'main',
        session_id: 'sid-ext',
        workflow_mode_prior: null,
        conflict_resolution: true,
        external_conflict: true
      }
    });

    const res = await env.scheduler.resume(WS, 'ext-1');

    expect(res.ok).toBe(true);
    expect(
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)]
        .external_conflict
    ).toBe(true);
  });

  test('a resumed external resolution still closes without a durable lane move', async () => {
    const notify = {
      attemptStarted: vi.fn(),
      attemptFailed: vi.fn(),
      prWaitEntered: vi.fn()
    };
    const env = extEnv({ notify });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'ext-1', bead_id: 'X1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'ext-1',
      patch: {
        status: 'failed',
        repo: '/repo',
        target_base: 'main',
        session_id: 'sid-ext',
        workflow_mode_prior: null,
        conflict_resolution: true,
        external_conflict: true
      }
    });
    const res = await env.scheduler.resume(WS, 'ext-1');

    env.runner.finish('X1', { success: true, reason: 'ok' });
    await flush();
    await flush();

    const q = env.store.snapshot(WS);
    expect(q.attempts[/** @type {string} */ (res.attempt_id)].status).toBe(
      'done'
    );
    expect(q.pr_wait).toEqual([]);
    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();
    expect(notify.prWaitEntered).not.toHaveBeenCalled();
  });
});

describe('scheduler REVISE disposition dispatch (UI-hs11 §3.3)', () => {
  /**
   * Seed the parking attempt a REVISE-parked bead carries: the stale re-review
   * session, failed, with its session id captured.
   *
   * @param {any} store
   * @param {Partial<import('./queue-store.js').Attempt>} [over]
   */
  function seedParkedAttempt(store, over = {}) {
    let rev = store.snapshot(WS).revision;
    rev = store.place(WS, { expected_revision: rev, bead_id: 'B1' }).queue
      .revision;
    store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'p1', bead_id: 'B1' }
    });
    store.updateAttempt(WS, {
      attempt_id: 'p1',
      patch: {
        bead_id: 'B1',
        status: 'failed',
        cause: 'verify_failed:pr_missing',
        spec_review_stale: true,
        repo: '/repo',
        target_base: 'main',
        base_oid: 'base-B1',
        runner: 'claude',
        model: 'opus',
        speed: 'fast',
        session_id: 'sid-park',
        workflow_mode_prior: null,
        finished_at: 50,
        ...over
      }
    });
  }

  test('resumes the parking session in its existing worktree', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedParkedAttempt(env.store);

    const res = await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });

    expect(res.ok).toBe(true);
    expect(env.runner.settingsFor('B1').resume_session_id).toBe('sid-park');
    expect(env.runner.settingsFor('B1').speed).toBe('default');
    expect(env.runner.cwdFor('B1')).toBe('/wt/B1');
    expect(env.worktree.add).not.toHaveBeenCalled();
  });

  test('links the child attempt with resumed_from and marks it a disposition', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedParkedAttempt(env.store);

    const res = await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });

    const child =
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)];
    expect(child.resumed_from).toBe('p1');
    expect(child.disposition).toBe('revise_fix');
    expect(child.speed).toBe('default');
    expect(env.runner.settingsFor('B1').speed).toBe('default');
    expect(child.conflict_resolution).toBe(false);
    expect(child.completion_root_id).toBe(null);
  });

  test('falls back to a fresh session in the shared checkout when the worktree is gone', async () => {
    const env = setup({ config: {}, slots: 1 });
    env.worktree.exists.mockReturnValue(false);
    seedParkedAttempt(env.store);

    await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });

    expect(env.runner.settingsFor('B1').resume_session_id).toBeUndefined();
    expect(env.runner.cwdFor('B1')).toBe('/repo');
  });

  test('switches a disappearing disposition resume to fresh durably', async () => {
    const env = setup({ config: { B1: { status: 'open' } }, slots: 1 });
    env.worktree.exists.mockReturnValueOnce(true).mockReturnValueOnce(false);
    seedParkedAttempt(env.store, { base_drift: { skipped: 'test' } });

    const result = await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });

    const child =
      env.store.snapshot(WS).attempts[
        /** @type {string} */ (result.attempt_id)
      ];
    expect(result.ok).toBe(true);
    expect(env.runner.cwdFor('B1')).toBe('/repo');
    expect(env.runner.settingsFor('B1').resume_session_id).toBeUndefined();
    expect(child).toMatchObject({
      continuation_mode: 'fresh',
      disposition_resume: false
    });
  });

  test('falls back to a fresh session when the parking attempt captured no session id', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedParkedAttempt(env.store, { session_id: null });

    await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });

    expect(env.runner.settingsFor('B1').resume_session_id).toBeUndefined();
    expect(env.runner.cwdFor('B1')).toBe('/repo');
  });

  test('disables prior_session when REVISE cannot resume the original cwd', async () => {
    const env = setup({
      config: { B1: { model: 'sol', effort: 'xhigh' } },
      slots: 1
    });
    env.worktree.exists.mockReturnValue(false);
    const exec_values = /** @type {Record<string, string|null>} */ (
      Object.fromEntries(EXEC_SETTING_KEYS.map((key) => [key, null]))
    );
    exec_values.orchestration_model = 'opus';
    exec_values.orchestration_effort = 'high';
    seedParkedAttempt(env.store, { exec_values });

    const mismatch = await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });

    expect(mismatch).toMatchObject({
      ok: false,
      reason: 'runner_mismatch',
      continuation_mismatch: { prior_available: false }
    });
    const refused = await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트',
      continuation: 'prior_session',
      decision_token: mismatch.continuation_mismatch.decision_token
    });
    expect(refused).toMatchObject({
      ok: false,
      reason: 'prior_session_unavailable',
      continuation_mismatch: { prior_available: false }
    });
    expect(env.runner.spawnOrder).toEqual([]);
  });

  test('tells the runner this session opens no PR', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedParkedAttempt(env.store);

    await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });

    expect(env.runner.settingsFor('B1').disposition).toBe('revise_fix');
  });

  test('refuses a bead with a running attempt', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedParkedAttempt(env.store, { status: 'running' });

    const res = await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });

    expect(res).toEqual({ ok: false, reason: 'bead_running' });
  });

  test('refuses an attempt that was already resumed', async () => {
    const env = setup({ config: {}, slots: 1 });
    seedParkedAttempt(env.store);
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'p2', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'p2',
      patch: { resumed_from: 'p1', status: 'done' }
    });

    const res = await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });

    expect(res).toEqual({ ok: false, reason: 'already_resumed' });
  });
});

describe('scheduler REVISE disposition completion (UI-hs11 §3.3)', () => {
  /**
   * Dispatch a disposition session and hand back its child attempt id.
   *
   * @param {any} env
   * @returns {Promise<string>}
   */
  async function dispatchDisposition(env) {
    let rev = env.store.snapshot(WS).revision;
    rev = env.store.place(WS, { expected_revision: rev, bead_id: 'B1' }).queue
      .revision;
    env.store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'p1', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'p1',
      patch: {
        bead_id: 'B1',
        status: 'failed',
        spec_review_stale: true,
        repo: '/repo',
        target_base: 'main',
        session_id: 'sid-park',
        workflow_mode_prior: null,
        finished_at: 50
      }
    });
    // The park itself halted the queue; the disposition is what resumes it.
    env.store.setAutoAdvance(WS, false);
    const res = await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });
    return /** @type {string} */ (res.attempt_id);
  }

  test('bypasses the PR observation entirely', async () => {
    const complete = vi.fn(async () => ({ ok: true }));
    const env = setup({
      config: {},
      slots: 1,
      verifyOk: false,
      disposition: { complete }
    });
    const child = await dispatchDisposition(env);

    env.runner.finish('B1', { success: true });
    await flush();

    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();
    expect(complete).toHaveBeenCalledWith(
      expect.objectContaining({ bead_id: 'B1', kind: 'revise_fix' })
    );
    expect(env.store.snapshot(WS).attempts[child].status).toBe('done');
  });

  test('leaves the bead in the WAITING lane so the ordinary lane re-dispatches it', async () => {
    const env = setup({
      config: {},
      slots: 1,
      disposition: { complete: async () => ({ ok: true }) }
    });
    await dispatchDisposition(env);

    env.runner.finish('B1', { success: true });
    await flush();

    const q = env.store.snapshot(WS);
    expect(q.queue.map((/** @type {any} */ e) => e.bead_id)).toEqual(['B1']);
    expect(q.pr_wait).toEqual([]);
  });

  test('restores the transient dispatch metadata', async () => {
    const env = setup({
      config: {},
      slots: 1,
      disposition: { complete: async () => ({ ok: true }) }
    });
    await dispatchDisposition(env);

    env.runner.finish('B1', { success: true });
    await flush();

    expect(
      env.bd.calls.filter(
        (/** @type {any} */ c) =>
          c.method === 'unsetMetadata' && c.key === 'workflow_mode'
      ).length
    ).toBeGreaterThan(0);
  });

  test('resumes auto_advance so the ordinary lane re-dispatches the bead', async () => {
    const env = setup({
      config: {},
      slots: 1,
      disposition: { complete: async () => ({ ok: true }) }
    });
    await dispatchDisposition(env);

    env.runner.finish('B1', { success: true });
    await flush();

    expect(env.store.snapshot(WS).auto_advance).toBe(true);
  });

  test('a failed workflow_mode revert blocks the success, fail-closed', async () => {
    const env = setup({
      config: { B1: { throwOnUnset: true } },
      slots: 1,
      disposition: { complete: async () => ({ ok: true }) }
    });
    const child = await dispatchDisposition(env);

    env.runner.finish('B1', { success: true });
    await flush();

    const attempt = env.store.snapshot(WS).attempts[child];
    expect(attempt.status).toBe('failed');
    expect(attempt.cause).toBe('workflow_mode_revert_failed');
    expect(env.store.snapshot(WS).auto_advance).toBe(false);
  });

  test('gives the disposition guard back on every failing termination', async () => {
    const release = vi.fn();
    const env = setup({
      config: {},
      slots: 1,
      disposition: {
        complete: async () => ({ ok: false, reason: 'still_blocked' }),
        release
      }
    });
    await dispatchDisposition(env);

    env.runner.finish('B1', { success: true });
    await flush();

    expect(release).toHaveBeenCalledWith('B1');
  });

  test('gives the disposition guard back when the session is discarded', async () => {
    const release = vi.fn();
    const env = setup({
      config: {},
      slots: 1,
      disposition: { complete: vi.fn(), release }
    });
    const child = await dispatchDisposition(env);

    await env.scheduler.stop(WS, child);
    env.runner.finish('B1', { success: false, reason: 'killed' });
    await flush();

    expect(release).toHaveBeenCalledWith('B1');
  });

  test('reports a spawn abort as a refusal instead of a running session', async () => {
    const env = setup({
      config: {},
      slots: 1,
      makeRunner: () => ({
        name: 'claude',
        spawn() {
          throw new Error('spawn failed');
        }
      }),
      disposition: { complete: vi.fn(), release: vi.fn() }
    });
    let rev = env.store.snapshot(WS).revision;
    rev = env.store.place(WS, { expected_revision: rev, bead_id: 'B1' }).queue
      .revision;
    env.store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'p1', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'p1',
      patch: {
        bead_id: 'B1',
        status: 'failed',
        spec_review_stale: true,
        repo: '/repo',
        target_base: 'main',
        session_id: 'sid-park'
      }
    });

    const res = await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });

    expect(res).toEqual({ ok: false, reason: 'spawn_failed' });
  });

  test('retries a failed resume ONCE as a fresh substitute session', async () => {
    const release = vi.fn();
    const config = { B1: {} };
    const env = setup({
      config,
      slots: 1,
      disposition: { complete: vi.fn(), release }
    });
    const child = await dispatchDisposition(env);
    config.B1 = { model: 'sonnet', effort: 'high' };

    env.runner.finish('B1', { success: false, reason: 'no_result' });
    await flush();

    const q = env.store.snapshot(WS);
    expect(q.attempts[child].cause).toBe('disposition_resume_failed:no_result');
    const substitute = Object.values(q.attempts).find(
      (/** @type {any} */ a) => a.resumed_from === child
    );
    expect(substitute).toMatchObject({
      disposition: 'revise_fix',
      disposition_resume: false,
      status: 'running',
      model: 'sonnet',
      effort: 'high',
      continuation_mode: 'fresh'
    });
    expect(env.runner.cwdFor('B1')).toBe('/repo');
    expect(env.runner.settingsFor('B1')).not.toHaveProperty(
      'resume_session_id'
    );
    // The disposition is still in flight, so its guard must NOT have been
    // handed back yet.
    expect(release).not.toHaveBeenCalled();
  });

  test('persists action-required when a disposition substitute crosses runners', async () => {
    const release = vi.fn();
    const config = { B1: { model: 'opus', effort: 'high' } };
    const env = setup({
      config,
      slots: 1,
      disposition: { complete: vi.fn(), release }
    });
    const child = await dispatchDisposition(env);
    config.B1 = { model: 'sol', effort: 'xhigh' };

    env.runner.finish('B1', { success: false, reason: 'no_result' });
    await flush();

    const q = env.store.snapshot(WS);
    expect(q.attempts[child]).toMatchObject({
      cause: 'disposition_resume_failed:no_result',
      continuation_action: {
        continuation: null,
        mismatch: {
          continuation_required: true,
          prior: { runner: 'claude' },
          current: { runner: 'codex' }
        }
      }
    });
    expect(
      Object.values(q.attempts).some(
        (/** @type {any} */ attempt) => attempt.resumed_from === child
      )
    ).toBe(false);
    expect(release).toHaveBeenCalledWith('B1');
  });

  test('a substitute session that fails again takes the ordinary failure path', async () => {
    const release = vi.fn();
    const env = setup({
      config: {},
      slots: 1,
      disposition: { complete: vi.fn(), release }
    });
    await dispatchDisposition(env);
    env.runner.finish('B1', { success: false, reason: 'no_result' });
    await flush();

    env.runner.finish('B1', { success: false, reason: 'subtype' });
    await flush();

    const q = env.store.snapshot(WS);
    const substitute = /** @type {any} */ (
      Object.values(q.attempts).find(
        (/** @type {any} */ a) =>
          a.disposition_resume === false && a.disposition
      )
    );
    expect(substitute.cause).toBe('session_failed:subtype');
    expect(release).toHaveBeenCalledWith('B1');
  });

  test('guard-kill evidence outranks a restart-surviving disposition’s readback', async () => {
    const complete = vi.fn(async () => ({ ok: true }));
    const release = vi.fn();
    const stop = vi.fn(() => true);
    const env = setup({
      config: {},
      slots: 1,
      probePid: () => ({ alive: false, started_at: null }),
      sessionMonitors: { stop },
      disposition: { complete, release }
    });
    let rev = env.store.snapshot(WS).revision;
    rev = env.store.place(WS, { expected_revision: rev, bead_id: 'B1' }).queue
      .revision;
    env.store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'd1', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'd1',
      patch: {
        bead_id: 'B1',
        status: 'running',
        pid: 4242,
        repo: '/repo',
        target_base: 'main',
        disposition: 'revise_fix',
        disposition_resume: true,
        guard_kill: { reason: 'merge_guard', command: 'git merge', at: 5 }
      }
    });

    await env.scheduler.reconcile(WS);
    await flush();

    // The monitor is drained for a disposition too, the verdict is refused
    // without consulting the disposition dep, and a blocked verdict is never
    // retried as a substitute session.
    expect(stop).toHaveBeenCalledWith(WS, 'd1');
    expect(complete).not.toHaveBeenCalled();
    const q = env.store.snapshot(WS);
    expect(q.attempts.d1.cause).toBe('loud_fail_blocker');
    expect(
      Object.values(q.attempts).some(
        (/** @type {any} */ a) => a.resumed_from === 'd1'
      )
    ).toBe(false);
    expect(release).toHaveBeenCalledWith('B1');
  });

  test('judges a restart-surviving disposition by its own verdict, not by a PR', async () => {
    const complete = vi.fn(async () => ({ ok: true }));
    const env = setup({
      config: {},
      slots: 1,
      verifyOk: false,
      probePid: () => ({ alive: false, started_at: null }),
      disposition: { complete, release: vi.fn() }
    });
    let rev = env.store.snapshot(WS).revision;
    rev = env.store.place(WS, { expected_revision: rev, bead_id: 'B1' }).queue
      .revision;
    env.store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'd1', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'd1',
      patch: {
        bead_id: 'B1',
        status: 'running',
        pid: 4242,
        repo: '/repo',
        target_base: 'main',
        disposition: 'revise_fix',
        disposition_receipt: 'codex@' + 'a'.repeat(40)
      }
    });
    env.store.setAutoAdvance(WS, false);

    await env.scheduler.reconcile(WS);
    await flush();

    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();
    expect(complete).toHaveBeenCalledWith(
      expect.objectContaining({
        bead_id: 'B1',
        prior_receipt: 'codex@' + 'a'.repeat(40),
        target_base: 'main'
      })
    );
    expect(env.store.snapshot(WS).attempts.d1.status).toBe('done');
  });

  test('a rejected verdict fails the attempt with the reason', async () => {
    const env = setup({
      config: {},
      slots: 1,
      disposition: {
        complete: async () => ({ ok: false, reason: 'receipt_not_refreshed' })
      }
    });
    const child = await dispatchDisposition(env);

    env.runner.finish('B1', { success: true });
    await flush();

    const attempt = env.store.snapshot(WS).attempts[child];
    expect(attempt.status).toBe('failed');
    expect(attempt.cause).toBe('disposition_failed:receipt_not_refreshed');
  });

  test('a failed session never reaches the completion verdict', async () => {
    const complete = vi.fn();
    const env = setup({
      config: {},
      slots: 1,
      disposition: { complete, release: vi.fn() }
    });
    await dispatchDisposition(env);

    env.runner.finish('B1', { success: false, reason: 'subtype' });
    await flush();

    expect(complete).not.toHaveBeenCalled();
  });

  test('fails closed when no disposition dep is wired at all', async () => {
    const env = setup({ config: {}, slots: 1 });
    const child = await dispatchDisposition(env);

    env.runner.finish('B1', { success: true });
    await flush();

    expect(env.store.snapshot(WS).attempts[child].cause).toBe(
      'disposition_failed:no_disposition_dep'
    );
  });
});

describe('conflict resolution reaches the session guard end-to-end (§1/§6)', () => {
  /**
   * One claude assistant Bash tool_use, the shape the session guards inspect.
   *
   * @param {string} command
   * @returns {string}
   */
  function bashToolLine(command) {
    return JSON.stringify({
      type: 'assistant',
      message: {
        content: [{ type: 'tool_use', name: 'Bash', input: { command } }]
      }
    });
  }

  /**
   * Dispatch a conflict resolution through the REAL runner so the settings the
   * SCHEDULER built are the ones the guard sees — the whole point is that the
   * flag survives the trip, not that a hand-written settings object works.
   *
   * @param {string} command
   */
  async function resolveAndRun(command) {
    const spawn_impl = makeFixtureSpawn({
      lines: [bashToolLine(command)],
      pid: 7100,
      exit: 0
    });
    const kill_impl = vi.fn();
    const env = setup({
      config: {},
      slots: 1,
      makeRunner: (/** @type {string} */ name) =>
        createRunner(name, { spawn_impl, kill_impl })
    });
    const rev = env.store.snapshot(WS).revision;
    env.store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'd1', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'd1',
      patch: {
        bead_id: 'B1',
        status: 'done',
        repo: '/repo',
        target_base: 'main',
        session_id: 'sid-orig',
        finished_at: 50
      }
    });

    const res = await env.scheduler.resolveConflict(WS, 'B1');
    await flush();
    await flush();

    return { res, kill_impl, spawn_impl };
  }

  test('does not kill the resolution session for merging the base into its branch', async () => {
    const { res, kill_impl } = await resolveAndRun('git merge origin/main');

    expect(res.ok).toBe(true);
    expect(kill_impl).not.toHaveBeenCalled();
  });

  test('still kills the SAME resolution attempt for gh pr merge', async () => {
    const { res, kill_impl } = await resolveAndRun('gh pr merge 304 --squash');

    expect(res.ok).toBe(true);
    expect(kill_impl).toHaveBeenCalledWith(-7100, 'SIGTERM');
  });

  // The base-push judgment survives the trip but no longer kills: the effect is
  // the violation's kind (guard-enforcement-layer-replacement §4), and this one
  // infers a cwd the guard cannot see.
  test('only warns the SAME resolution attempt about a push to the base', async () => {
    const { kill_impl } = await resolveAndRun('git push origin HEAD:main');

    expect(kill_impl).not.toHaveBeenCalled();
  });

  test('kills the SAME resolution attempt for a hook bypass', async () => {
    const { kill_impl } = await resolveAndRun(
      'git push --no-verify origin HEAD:B1'
    );

    expect(kill_impl).toHaveBeenCalledWith(-7100, 'SIGTERM');
  });

  // Publishing the base IS the disposition's job. The scheduler carries the
  // disposition KIND (a string) on the settings, so this pins the real value
  // reaching the guard rather than a hand-written boolean.
  test('raises nothing when a DISPOSITION session publishes the base', async () => {
    const spawn_impl = makeFixtureSpawn({
      // The second line is what makes this discriminating: a base push only
      // warns for anyone, but a hook bypass kills every non-disposition session.
      lines: [
        bashToolLine('git push origin main'),
        bashToolLine('git push --no-verify origin main')
      ],
      pid: 7200,
      exit: 0
    });
    const kill_impl = vi.fn();
    const env = setup({
      config: {},
      slots: 1,
      disposition: { complete: async () => ({ ok: true }) },
      makeRunner: (/** @type {string} */ name) =>
        createRunner(name, { spawn_impl, kill_impl })
    });
    let rev = env.store.snapshot(WS).revision;
    rev = env.store.place(WS, { expected_revision: rev, bead_id: 'B1' }).queue
      .revision;
    env.store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'p1', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'p1',
      patch: {
        bead_id: 'B1',
        status: 'failed',
        spec_review_stale: true,
        repo: '/repo',
        target_base: 'main',
        session_id: 'sid-park',
        finished_at: 50
      }
    });

    const res = await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });
    await flush();
    await flush();

    expect(res.ok).toBe(true);
    expect(kill_impl).not.toHaveBeenCalled();
    expect(
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)]
        .cause_detail
    ).toBeNull();
  });
});

describe('scheduler claim release on close-less termination', () => {
  test('reopens a bead the failed session left in_progress', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    // The session claimed the bead and then died without closing it.
    env.bd.statuses.S1 = 'in_progress';

    env.runner.finish('S1', { success: false, reason: 'boom', exit: 1 });
    await flush();
    await flush();

    expect(env.bd.statuses.S1).toBe('open');
  });

  test('leaves a resolved bead alone when the PR verification fails', async () => {
    const env = setup({ config: { S1: {} }, slots: 1, verifyOk: false });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    // The session finished its work and recorded `resolved`; only the server's
    // PR observation failed, so the record must survive.
    env.bd.statuses.S1 = 'resolved';

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    expect(env.bd.statuses.S1).toBe('resolved');
  });

  test('leaves a closed bead alone', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    env.bd.statuses.S1 = 'closed';

    env.runner.finish('S1', { success: false, reason: 'boom', exit: 1 });
    await flush();
    await flush();

    expect(env.bd.calls.some((c) => c.method === 'setStatus')).toBe(false);
  });

  test('finalizes the failed attempt even when the status read throws', async () => {
    const env = setup({
      config: { S1: { throwOnReadStatus: true } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    env.runner.finish('S1', { success: false, reason: 'boom', exit: 1 });
    await flush();
    await flush();

    expect(env.store.snapshot(WS).attempts[attempt_id].status).toBe('failed');
  });

  test('keeps the queue halted when the reopen write throws', async () => {
    const env = setup({ config: { S1: { throwOnSetStatus: true } }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    env.bd.statuses.S1 = 'in_progress';

    env.runner.finish('S1', { success: false, reason: 'boom', exit: 1 });
    await flush();
    await flush();

    expect(env.store.snapshot(WS).auto_advance).toBe(false);
  });

  test('releases the claim only after the failure halt landed', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    env.bd.statuses.S1 = 'in_progress';
    /** @type {boolean|null} */
    let auto_advance_at_release = null;
    const setStatus = env.bd.setStatus;
    env.bd.setStatus = async (
      /** @type {string} */ bead_id,
      /** @type {string} */ status
    ) => {
      auto_advance_at_release = env.store.snapshot(WS).auto_advance;
      await setStatus(bead_id, status);
    };

    env.runner.finish('S1', { success: false, reason: 'boom', exit: 1 });
    await flush();
    await flush();

    // A tick raised by a concurrent attempt finishing must find the queue
    // already stopped, or it would relaunch the bead that just failed.
    expect(auto_advance_at_release).toBe(false);
  });

  test('reopens a bead the stopped session left in_progress', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.bd.statuses.S1 = 'in_progress';

    await env.scheduler.stop(WS, attempt_id);

    expect(env.bd.statuses.S1).toBe('open');
  });

  test('keeps the claim when the attempt is only paused', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.runner.eventsFor('S1').emit('session_id', 'sid-1');
    env.bd.statuses.S1 = 'in_progress';

    await env.scheduler.pause(WS, attempt_id);

    // A pause is not a termination — the session resumes in the same worktree.
    expect(env.bd.statuses.S1).toBe('in_progress');
  });

  test('reopens the bead when a paused attempt is discarded', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.runner.eventsFor('S1').emit('session_id', 'sid-1');
    env.bd.statuses.S1 = 'in_progress';
    await env.scheduler.pause(WS, attempt_id);

    await env.scheduler.stop(WS, attempt_id);

    expect(env.bd.statuses.S1).toBe('open');
  });

  test('makes a failed bead dispatchable again once the queue is re-armed', async () => {
    const env = setup({
      config: { S1: { ready_follows_status: true } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    // The claim is exactly what hid the bead from `bd ready` after the failure.
    env.bd.statuses.S1 = 'in_progress';
    env.runner.finish('S1', { success: false, reason: 'boom', exit: 1 });
    await flush();
    await flush();

    env.store.setAutoAdvance(WS, true);
    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S1')).toBe(true);
  });
});

describe('scheduler silent-skip reasons', () => {
  test('records not_ready:<status> for a bead the scan cannot dispatch', async () => {
    const env = setup({
      config: { S1: { ready: false, status: 'in_progress' } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).admission.S1.reason).toBe(
      'not_ready:in_progress'
    );
  });

  test('records not_ready:unknown when the snapshot carries no status', async () => {
    const env = setup({ config: { S1: { ready: false } }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).admission.S1.reason).toBe(
      'not_ready:unknown'
    );
  });

  test('records bd_snapshot_failed when the scan snapshot throws', async () => {
    const env = setup({
      config: { S1: { throwOnSnapshotAt: 'all' } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).admission.S1.reason).toBe(
      'bd_snapshot_failed'
    );
  });

  test('records bd_snapshot_failed when the dispatch re-read throws', async () => {
    const env = setup({ config: { S1: { throwOnSnapshotAt: 2 } }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S1')).toBe(false);
    expect(env.store.snapshot(WS).admission.S1.reason).toBe(
      'bd_snapshot_failed'
    );
  });

  test('records not_ready:<status> when the dispatch re-read is no longer ready', async () => {
    const env = setup({
      config: { S1: { notReadyAt: 2, status: 'in_progress' } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S1')).toBe(false);
    expect(env.store.snapshot(WS).admission.S1.reason).toBe(
      'not_ready:in_progress'
    );
  });

  test('clears the reason once the bead dispatches', async () => {
    /** @type {Record<string, any>} */
    const config = { S1: { ready: false, status: 'in_progress' } };
    const env = setup({ config, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    config.S1.ready = true;
    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).admission.S1).toBeUndefined();
  });

  test('does not re-record an unchanged reason on the next tick', async () => {
    const env = setup({
      config: { S1: { ready: false, status: 'in_progress' } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const revision = env.store.snapshot(WS).revision;

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).revision).toBe(revision);
  });

  test('does not fan out an unchanged reason on the next tick', async () => {
    const notify = vi.fn();
    const env = setup({
      config: { S1: { ready: false, status: 'in_progress' } },
      slots: 1,
      notifyQueueChanged: notify
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    notify.mockClear();

    await env.scheduler.tick(WS);

    expect(notify).not.toHaveBeenCalled();
  });

  test('fans out a reason that changed since the last tick', async () => {
    const notify = vi.fn();
    /** @type {Record<string, any>} */
    const config = { S1: { ready: false, status: 'in_progress' } };
    const env = setup({ config, slots: 1, notifyQueueChanged: notify });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    notify.mockClear();

    config.S1.status = 'open';
    await env.scheduler.tick(WS);

    expect(notify).toHaveBeenCalledWith(WS);
  });

  test('a not-ready head does not starve the next queued bead', async () => {
    const env = setup({
      config: { S1: { ready: false, status: 'in_progress' }, S2: {} },
      slots: 1
    });
    seedQueue(env.store, ['S1', 'S2']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S2')).toBe(true);
  });

  test('a snapshot failure at the head does not starve the next queued bead', async () => {
    const env = setup({
      config: { S1: { throwOnSnapshotAt: 'all' }, S2: {} },
      slots: 1
    });
    seedQueue(env.store, ['S1', 'S2']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S2')).toBe(true);
  });
});

describe('scheduler worktree residue hygiene', () => {
  /**
   * @param {ReturnType<typeof import('./queue-store.js').createQueueStore>} store
   * @param {Partial<Record<string, unknown>>} [patch]
   */
  function seedStaleWorkAdmission(store, patch = {}) {
    store.recordAdmission(WS, {
      bead_id: 'S1',
      reason: 'worktree_stale_work',
      stale_work: {
        schema: 1,
        state: 'unique',
        cause: 'dirty_unique',
        summary: {
          staged_count: 1,
          unstaged_count: 1,
          untracked_count: 1,
          branch_ahead: 0,
          head_ahead: 0
        },
        identity_digest: 'identity-1',
        action_id: 'action-1',
        can_resume: false,
        can_continue: true,
        can_backup_fresh: true,
        can_recheck: false,
        identity: {
          worktree_realpath: '/wt/S1',
          branch: 'S1',
          head_sha: 'a'.repeat(40),
          base_oid: 'b'.repeat(40),
          status_digest: 'c'.repeat(64)
        },
        ...patch
      }
    });
  }

  /**
   * @param {Partial<import('./worktree.js').WorktreeObservation>} [patch]
   */
  function uniqueStaleObservation(patch = {}) {
    return {
      ok: false,
      state: 'unique',
      removed: false,
      cause: 'dirty_unique',
      owned: true,
      identity: {
        worktree_realpath: '/wt/S1',
        branch: 'S1',
        head_sha: 'a'.repeat(40),
        base_oid: 'b'.repeat(40),
        status_digest: 'c'.repeat(64)
      },
      summary: {
        staged_count: 1,
        unstaged_count: 1,
        untracked_count: 1,
        branch_ahead: 0,
        head_ahead: 0
      },
      ...patch
    };
  }

  test('records worktree_add_failed when the add throws', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    env.worktree.add = vi.fn(async () => {
      throw new Error('already used by worktree');
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).admission.S1.reason).toBe(
      'worktree_add_failed'
    );
    expect(env.scheduler.isRunning('S1')).toBe(false);
  });

  test('does not retry the failing add inside the same tick cascade', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    const add = vi.fn(async () => {
      throw new Error('already used by worktree');
    });
    env.worktree.add = add;
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(add).toHaveBeenCalledTimes(1);
  });

  test('an add failure does not starve the next queued bead', async () => {
    const env = setup({ config: { S1: {}, S2: {} }, slots: 1 });
    env.worktree.add = vi.fn(async (/** @type {any} */ { bead_id }) => {
      if (bead_id === 'S1') {
        throw new Error('already used by worktree');
      }
      return { path: `/wt/${bead_id}`, branch: bead_id, base_oid: 'base' };
    });
    seedQueue(env.store, ['S1', 'S2']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S2')).toBe(true);
  });

  test('keeps the refill after an add failure inside the slot cap', async () => {
    const env = setup({
      config: { S1: {}, S2: {}, S3: {}, S4: {} },
      slots: 2
    });
    // S1 refuses mid-dispatch while S2 is still in flight (not yet spawned):
    // the refusal's re-entrant pass must count S2's claim as an occupied slot.
    env.worktree.add = vi.fn(async (/** @type {any} */ { bead_id }) => {
      if (bead_id === 'S1') {
        throw new Error('already used by worktree');
      }
      return { path: `/wt/${bead_id}`, branch: bead_id, base_oid: 'base' };
    });
    seedQueue(env.store, ['S1', 'S2', 'S3', 'S4']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.runningCount()).toBe(2);
  });

  test('checks the residue against the pinned base before creating the worktree', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.worktree.removeIfDiscardable).toHaveBeenCalledWith({
      repo: '/repo',
      bead_id: 'S1',
      base: 'main'
    });
    expect(
      env.worktree.removeIfDiscardable.mock.invocationCallOrder[0]
    ).toBeLessThan(env.worktree.add.mock.invocationCallOrder[0]);
  });

  test('dispatches normally once a discardable residue is cleared', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S1')).toBe(true);
    expect(env.store.snapshot(WS).admission.S1).toBeUndefined();
  });

  test('dispatches in the same tick after reclaiming base-contained residue', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    env.worktree.removeIfDiscardable = vi.fn(async () => ({
      ok: true,
      state: 'base_contained',
      removed: true,
      reason: null
    }));
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.worktree.add).toHaveBeenCalledTimes(1);
    expect(env.scheduler.isRunning('S1')).toBe(true);
    expect(env.store.snapshot(WS).admission.S1).toBeUndefined();
  });

  test('dispatches in the same tick after reclaiming a contained ahead worktree', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    env.worktree.removeIfDiscardable = vi.fn(async () => ({
      ok: true,
      state: 'discardable',
      removed: true,
      reason: null,
      identity: {
        worktree_realpath: '/wt/S1',
        branch: 'S1',
        head_sha: 'a'.repeat(40),
        branch_head_sha: 'a'.repeat(40),
        base_oid: 'b'.repeat(40),
        status_digest: 'c'.repeat(64)
      },
      summary: {
        staged_count: 0,
        unstaged_count: 0,
        untracked_count: 0,
        branch_ahead: 2,
        head_ahead: 2
      }
    }));
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.worktree.add).toHaveBeenCalledTimes(1);
    expect(env.scheduler.isRunning('S1')).toBe(true);
    expect(env.store.snapshot(WS).admission.S1).toBeUndefined();
  });

  test('dispatches in the same tick after reclaiming a branch-only contained ahead residue', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    env.worktree.removeIfDiscardable = vi.fn(async () => ({
      ok: true,
      state: 'discardable',
      removed: true,
      reason: null,
      identity: {
        worktree_realpath: null,
        branch: 'S1',
        head_sha: null,
        branch_head_sha: 'a'.repeat(40),
        base_oid: 'b'.repeat(40),
        status_digest: 'c'.repeat(64)
      },
      summary: {
        staged_count: 0,
        unstaged_count: 0,
        untracked_count: 0,
        branch_ahead: 2,
        head_ahead: 0
      }
    }));
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.worktree.add).toHaveBeenCalledTimes(1);
    expect(env.scheduler.isRunning('S1')).toBe(true);
    expect(env.store.snapshot(WS).admission.S1).toBeUndefined();
  });

  test('records an owned unique residue as structured admission without an attempt', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    env.worktree.removeIfDiscardable = vi.fn(async () => ({
      ok: false,
      state: 'unique',
      removed: false,
      reason: 'dirty_unique',
      owned: true,
      identity: {
        worktree_realpath: '/wt/S1',
        branch: 'S1',
        head_sha: 'a'.repeat(40),
        base_oid: 'b'.repeat(40),
        status_digest: 'c'.repeat(64)
      },
      summary: {
        staged_count: 1,
        unstaged_count: 0,
        untracked_count: 0,
        branch_ahead: 0,
        head_ahead: 0
      }
    }));
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).admission.S1).toMatchObject({
      reason: 'worktree_stale_work',
      stale_work: {
        schema: 1,
        residue: 'worktree',
        state: 'unique',
        cause: 'dirty_unique',
        can_resume: false,
        can_continue: true,
        can_backup_fresh: true,
        can_recheck: false
      }
    });
    expect(env.store.snapshot(WS).attempts).toEqual({});
    expect(env.scheduler.activeBeadIds(WS).has('S1')).toBe(true);
    expect(env.scheduler.staleWorkActionInFlight(WS, 'S1')).toBe(false);
    expect(env.worktree.add).not.toHaveBeenCalled();
  });

  test('closes every capability for a foreign residue identity', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    env.worktree.removeIfDiscardable = vi.fn(async () => ({
      ok: false,
      state: 'unique',
      removed: false,
      reason: 'dirty_unique',
      owned: false,
      identity: {
        worktree_realpath: '/someone/worktree',
        branch: 'foreign',
        head_sha: 'a'.repeat(40),
        base_oid: 'b'.repeat(40),
        status_digest: 'c'.repeat(64)
      },
      summary: {
        staged_count: 0,
        unstaged_count: 1,
        untracked_count: 0,
        branch_ahead: 0,
        head_ahead: 0
      }
    }));
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).admission.S1.stale_work).toMatchObject({
      state: 'unknown',
      can_resume: false,
      can_continue: false,
      can_backup_fresh: false,
      can_recheck: false
    });
    expect(env.store.snapshot(WS).attempts).toEqual({});
  });

  test('offers only recheck for an owned unknown residue', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    env.worktree.removeIfDiscardable = vi.fn(async () => ({
      ok: false,
      state: 'unknown',
      removed: false,
      reason: 'observe_failed',
      cause: 'observe_failed',
      owned: true,
      identity: {
        worktree_realpath: '/wt/S1',
        branch: 'S1',
        head_sha: 'a'.repeat(40),
        base_oid: 'b'.repeat(40),
        status_digest: 'c'.repeat(64)
      },
      summary: {
        staged_count: 0,
        unstaged_count: 0,
        untracked_count: 0,
        branch_ahead: 0,
        head_ahead: 0
      }
    }));
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).admission.S1.stale_work).toMatchObject({
      state: 'unknown',
      can_resume: false,
      can_continue: false,
      can_backup_fresh: false,
      can_recheck: true
    });
    expect(env.store.snapshot(WS).attempts).toEqual({});
  });

  test('records branch-only residue with backup and recheck capabilities', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    env.worktree.removeIfDiscardable = vi.fn(async () => ({
      ok: false,
      state: 'unique',
      removed: false,
      reason: 'ahead_not_contained',
      cause: 'ahead_not_contained',
      owned: true,
      identity: {
        worktree_realpath: null,
        branch: 'S1',
        head_sha: null,
        branch_head_sha: 'a'.repeat(40),
        base_oid: 'b'.repeat(40),
        status_digest: 'c'.repeat(64)
      },
      summary: {
        staged_count: 0,
        unstaged_count: 0,
        untracked_count: 0,
        branch_ahead: 2,
        head_ahead: 0
      }
    }));
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).admission.S1.stale_work).toMatchObject({
      residue: 'branch',
      state: 'unique',
      cause: 'ahead_not_contained',
      can_resume: false,
      can_continue: false,
      can_backup_fresh: true,
      can_recheck: true
    });
    expect(env.store.snapshot(WS).attempts).toEqual({});
  });

  test('prefers a matching resumable leaf over automatic reclaim', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'prior', bead_id: 'S1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'prior',
      patch: {
        status: 'failed',
        repo: '/repo',
        session_id: 'session-1',
        head_oid: 'a'.repeat(40)
      }
    });
    env.worktree.removeIfDiscardable = vi.fn(async () => ({
      ok: true,
      state: 'base_contained',
      removed: false,
      reason: null,
      cause: null,
      owned: true,
      identity: {
        worktree_realpath: '/wt/S1',
        branch: 'S1',
        head_sha: 'a'.repeat(40),
        base_oid: 'b'.repeat(40),
        status_digest: 'c'.repeat(64)
      },
      summary: {
        staged_count: 1,
        unstaged_count: 0,
        untracked_count: 0,
        branch_ahead: 0,
        head_ahead: 0
      }
    }));
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.worktree.removeIfDiscardable).toHaveBeenCalledWith({
      repo: '/repo',
      bead_id: 'S1',
      base: 'main',
      preserve: true
    });
    expect(env.worktree.removeIfDiscardable).toHaveBeenCalledTimes(1);
    expect(env.store.snapshot(WS).admission.S1.stale_work).toMatchObject({
      residue: 'worktree',
      state: 'unique',
      cause: 'resume_available',
      can_resume: true,
      can_continue: true,
      can_backup_fresh: true,
      can_recheck: false
    });
    expect(Object.keys(env.store.snapshot(WS).attempts)).toEqual(['prior']);
    expect(env.worktree.add).not.toHaveBeenCalled();
  });

  test('reclaims branch-only residue when a resumable row cannot match it', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'prior', bead_id: 'S1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'prior',
      patch: {
        status: 'failed',
        repo: '/repo',
        session_id: 'session-1',
        head_oid: 'a'.repeat(40)
      }
    });
    env.worktree.removeIfDiscardable = vi.fn(
      async (/** @type {any} */ input) => ({
        ok: true,
        state: 'discardable',
        removed: input.preserve !== true,
        reason: null,
        cause: null,
        owned: true,
        identity: {
          worktree_realpath: null,
          branch: 'S1',
          head_sha: null,
          branch_head_sha: 'a'.repeat(40),
          base_oid: 'b'.repeat(40),
          status_digest: 'c'.repeat(64)
        },
        summary: {
          staged_count: 0,
          unstaged_count: 0,
          untracked_count: 0,
          branch_ahead: 2,
          head_ahead: 0
        }
      })
    );
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.worktree.removeIfDiscardable.mock.calls).toEqual([
      [
        {
          repo: '/repo',
          bead_id: 'S1',
          base: 'main',
          preserve: true
        }
      ],
      [{ repo: '/repo', bead_id: 'S1', base: 'main' }]
    ]);
    expect(env.worktree.add).toHaveBeenCalledTimes(1);
    expect(env.scheduler.isRunning('S1')).toBe(true);
    expect(env.store.snapshot(WS).admission.S1).toBeUndefined();
  });

  test('does not bump revision for the same residue on a later tick', async () => {
    const notifyQueueChanged = vi.fn();
    const env = setup({
      config: { S1: {} },
      slots: 1,
      notifyQueueChanged
    });
    env.worktree.removeIfDiscardable = vi.fn(async () => ({
      ok: false,
      state: 'unknown',
      removed: false,
      reason: 'observe_failed',
      cause: 'observe_failed',
      owned: true,
      identity: {
        worktree_realpath: '/wt/S1',
        branch: 'S1',
        head_sha: 'a'.repeat(40),
        base_oid: 'b'.repeat(40),
        status_digest: 'c'.repeat(64)
      },
      summary: {
        staged_count: 0,
        unstaged_count: 0,
        untracked_count: 0,
        branch_ahead: 0,
        head_ahead: 0
      }
    }));
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const revision = env.store.snapshot(WS).revision;
    const notifications = notifyQueueChanged.mock.calls.length;

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).revision).toBe(revision);
    expect(notifyQueueChanged).toHaveBeenCalledTimes(notifications);
  });

  for (const reason of [
    'dirty',
    'branch_ahead',
    'head_ahead',
    'observe_failed',
    'remove_failed'
  ]) {
    test(`refuses with worktree_stale_work when the residue is preserved (${reason})`, async () => {
      const env = setup({ config: { S1: {} }, slots: 1 });
      env.worktree.removeIfDiscardable = vi.fn(async () => ({
        ok: false,
        removed: false,
        reason
      }));
      seedQueue(env.store, ['S1']);

      await env.scheduler.tick(WS);

      expect(env.store.snapshot(WS).admission.S1.reason).toBe(
        'worktree_stale_work'
      );
      expect(env.worktree.add).not.toHaveBeenCalled();
      expect(env.scheduler.isRunning('S1')).toBe(false);
    });
  }

  test('never force-removes a residue it refused', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    env.worktree.removeIfDiscardable = vi.fn(async () => ({
      ok: false,
      removed: false,
      reason: 'dirty'
    }));
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.worktree.remove).not.toHaveBeenCalled();
  });

  test('records git_error when the residue check itself throws', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    env.worktree.removeIfDiscardable = vi.fn(async () => {
      throw new Error('git exploded');
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).admission.S1.reason).toBe('git_error');
    expect(env.worktree.add).not.toHaveBeenCalled();
  });

  test('a residue refusal does not starve the next queued bead', async () => {
    const env = setup({ config: { S1: {}, S2: {} }, slots: 1 });
    env.worktree.removeIfDiscardable = vi.fn(
      async (/** @type {any} */ { bead_id }) =>
        bead_id === 'S1'
          ? { ok: false, removed: false, reason: 'dirty' }
          : { ok: true, removed: false, reason: null }
    );
    seedQueue(env.store, ['S1', 'S2']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S2')).toBe(true);
  });

  test('continues stale work through the matching resumable leaf first', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'prior', bead_id: 'S1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'prior',
      patch: {
        status: 'failed',
        repo: '/repo',
        target_base: 'main',
        base_oid: 'b'.repeat(40),
        head_oid: 'a'.repeat(40),
        session_id: 'session-1'
      }
    });
    seedStaleWorkAdmission(env.store, {
      can_resume: true,
      can_continue: false,
      can_backup_fresh: false
    });

    const result = await env.scheduler.staleWorkContinue(WS, {
      bead_id: 'S1',
      action_id: 'action-1',
      expected_revision: env.store.snapshot(WS).revision
    });

    expect(result.ok).toBe(true);
    expect(env.worktree.removeIfDiscardable).not.toHaveBeenCalled();
    expect(env.worktree.add).not.toHaveBeenCalled();
    expect(env.runner.spawnOrder).toEqual(['S1']);
    expect(env.runner.settingsFor('S1').resume_session_id).toBe('session-1');
  });

  test('adopts an orphan stale worktree without remove or add', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      resolveBase: vi.fn(async () => ({
        ok: true,
        base: 'main',
        base_oid: 'b'.repeat(40)
      }))
    });
    seedQueue(env.store, ['S1']);
    seedStaleWorkAdmission(env.store);
    env.worktree.removeIfDiscardable = vi.fn(async () => ({
      ok: false,
      state: 'unique',
      removed: false,
      cause: 'dirty_unique',
      owned: true,
      identity: {
        worktree_realpath: '/wt/S1',
        branch: 'S1',
        head_sha: 'a'.repeat(40),
        base_oid: 'b'.repeat(40),
        status_digest: 'c'.repeat(64)
      },
      summary: {
        staged_count: 1,
        unstaged_count: 1,
        untracked_count: 1,
        branch_ahead: 0,
        head_ahead: 0
      }
    }));

    const result = await env.scheduler.staleWorkContinue(WS, {
      bead_id: 'S1',
      action_id: 'action-1',
      expected_revision: env.store.snapshot(WS).revision
    });
    const attempt = Object.values(env.store.snapshot(WS).attempts)[0];

    expect(result.ok).toBe(true);
    expect(env.worktree.removeIfDiscardable).toHaveBeenCalledWith({
      repo: '/repo',
      bead_id: 'S1',
      base: 'b'.repeat(40),
      preserve: true
    });
    expect(env.worktree.remove).not.toHaveBeenCalled();
    expect(env.worktree.add).not.toHaveBeenCalled();
    expect(attempt).toMatchObject({
      base_oid: 'b'.repeat(40),
      head_oid: 'a'.repeat(40),
      status: 'running'
    });
    expect(env.runner.cwdFor('S1')).toBe('/wt/S1');
    expect(env.runner.spawnedBead('S1').prompt).toContain(
      '기존 worktree를 의도적으로 채택'
    );
  });

  test('refuses orphan adoption before prerecord when identity drifts', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      resolveBase: vi.fn(async () => ({
        ok: true,
        base: 'main',
        base_oid: 'b'.repeat(40)
      }))
    });
    seedQueue(env.store, ['S1']);
    seedStaleWorkAdmission(env.store);
    env.worktree.removeIfDiscardable = vi.fn(async () =>
      uniqueStaleObservation({
        identity: {
          worktree_realpath: '/wt/S1',
          branch: 'S1',
          head_sha: 'a'.repeat(40),
          base_oid: 'b'.repeat(40),
          status_digest: 'drifted'
        }
      })
    );

    const result = await env.scheduler.staleWorkContinue(WS, {
      bead_id: 'S1',
      action_id: 'action-1',
      expected_revision: env.store.snapshot(WS).revision
    });

    expect(result).toMatchObject({
      ok: false,
      reason: 'worktree_stale_work'
    });
    expect(env.store.snapshot(WS).attempts).toEqual({});
    expect(env.store.snapshot(WS).admission.S1).toMatchObject({
      reason: 'worktree_stale_work',
      stale_work: { can_recheck: false }
    });
    expect(env.worktree.remove).not.toHaveBeenCalled();
    expect(env.worktree.add).not.toHaveBeenCalled();
  });

  test('preserves adopted worktree when spawn records a failed attempt', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      resolveBase: vi.fn(async () => ({
        ok: true,
        base: 'main',
        base_oid: 'b'.repeat(40)
      })),
      makeRunner: () => ({
        name: 'claude',
        spawn() {
          throw new Error('spawn failed');
        }
      })
    });
    seedQueue(env.store, ['S1']);
    seedStaleWorkAdmission(env.store);
    env.worktree.removeIfDiscardable = vi.fn(async () =>
      uniqueStaleObservation()
    );

    const result = await env.scheduler.staleWorkContinue(WS, {
      bead_id: 'S1',
      action_id: 'action-1',
      expected_revision: env.store.snapshot(WS).revision
    });
    const attempt = Object.values(env.store.snapshot(WS).attempts)[0];

    expect(result).toMatchObject({ ok: false, reason: 'spawn_failed' });
    expect(attempt).toMatchObject({ status: 'failed', cause: 'spawn_failed' });
    expect(env.worktree.remove).not.toHaveBeenCalled();
    expect(env.worktree.add).not.toHaveBeenCalled();
  });

  test('rejects stale-work action when a remote branch owns the residue', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      gitRun: vi.fn(async (args) => ({
        code: 0,
        stdout:
          args[0] === 'ls-remote' ? `${'a'.repeat(40)}\trefs/heads/S1\n` : '',
        stderr: ''
      }))
    });
    seedQueue(env.store, ['S1']);
    seedStaleWorkAdmission(env.store);

    const result = await env.scheduler.staleWorkContinue(WS, {
      bead_id: 'S1',
      action_id: 'action-1',
      expected_revision: env.store.snapshot(WS).revision
    });

    expect(result).toEqual({
      ok: false,
      reason: 'remote_branch_owner',
      conflict: true
    });
    expect(env.store.snapshot(WS).attempts).toEqual({});
    expect(env.worktree.removeIfDiscardable).not.toHaveBeenCalled();
  });

  test('rejects branch-only continue and resume capabilities without mutation', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    seedStaleWorkAdmission(env.store, {
      residue: 'branch',
      can_resume: false,
      can_continue: false,
      can_backup_fresh: true,
      can_recheck: true,
      identity: {
        worktree_realpath: null,
        branch: 'S1',
        head_sha: null,
        branch_head_sha: 'a'.repeat(40),
        base_oid: 'b'.repeat(40),
        status_digest: 'c'.repeat(64)
      }
    });
    const before = env.store.snapshot(WS);

    const result = await env.scheduler.staleWorkContinue(WS, {
      bead_id: 'S1',
      action_id: 'action-1',
      expected_revision: before.revision
    });

    expect(result).toEqual({
      ok: false,
      reason: 'stale_work_conflict',
      conflict: true
    });
    expect(env.store.snapshot(WS)).toEqual(before);
  });

  test('refuses stale continue when waiting authority changes during owner observation', async () => {
    /** @type {() => void} */
    let release_remote = () => {};
    /** @type {() => void} */
    let mark_remote_started = () => {};
    const remote_started = new Promise((resolve) => {
      mark_remote_started = () => resolve(undefined);
    });
    const remote_gate = new Promise((resolve) => {
      release_remote = () => resolve(undefined);
    });
    const env = setup({
      config: { S1: {} },
      slots: 1,
      gitRun: vi.fn(async () => {
        mark_remote_started();
        await remote_gate;
        return { code: 0, stdout: '', stderr: '' };
      })
    });
    seedQueue(env.store, ['S1']);
    seedStaleWorkAdmission(env.store);
    const pending = env.scheduler.staleWorkContinue(WS, {
      bead_id: 'S1',
      action_id: 'action-1',
      expected_revision: env.store.snapshot(WS).revision
    });
    await remote_started;

    env.store.remove(WS, {
      bead_id: 'S1',
      expected_revision: env.store.snapshot(WS).revision
    });
    release_remote();
    const result = await pending;

    expect(result).toMatchObject({ ok: false, conflict: true });
    expect(env.store.snapshot(WS).attempts).toEqual({});
    expect(env.worktree.removeIfDiscardable).not.toHaveBeenCalled();
  });

  test('refuses stale recheck when waiting authority changes during owner observation', async () => {
    /** @type {() => void} */
    let release_remote = () => {};
    /** @type {() => void} */
    let mark_remote_started = () => {};
    const remote_started = new Promise((resolve) => {
      mark_remote_started = () => resolve(undefined);
    });
    const remote_gate = new Promise((resolve) => {
      release_remote = () => resolve(undefined);
    });
    const env = setup({
      config: { S1: {} },
      slots: 1,
      gitRun: vi.fn(async () => {
        mark_remote_started();
        await remote_gate;
        return { code: 0, stdout: '', stderr: '' };
      })
    });
    seedQueue(env.store, ['S1']);
    seedStaleWorkAdmission(env.store, { can_recheck: true });
    const before = env.store.snapshot(WS);
    const pending = env.scheduler.staleWorkRecheck(WS, {
      bead_id: 'S1',
      action_id: 'action-1',
      expected_revision: before.revision
    });
    await remote_started;

    env.store.remove(WS, {
      bead_id: 'S1',
      expected_revision: env.store.snapshot(WS).revision
    });
    release_remote();
    const result = await pending;

    expect(result).toMatchObject({ ok: false, conflict: true });
    expect(env.worktree.removeIfDiscardable).not.toHaveBeenCalled();
    expect(env.store.snapshot(WS).attempts).toEqual(before.attempts);
    expect(env.store.snapshot(WS).discard_operations).toEqual(
      before.discard_operations
    );
  });

  test('rechecks base-contained stale work and dispatches in the same action', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    seedStaleWorkAdmission(env.store, {
      state: 'unknown',
      can_continue: false,
      can_backup_fresh: false,
      can_recheck: true
    });
    env.worktree.removeIfDiscardable = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        state: 'base_contained',
        removed: true,
        cause: null
      })
      .mockResolvedValue({
        ok: true,
        state: 'absent',
        removed: false,
        cause: null
      });

    const result = await env.scheduler.staleWorkRecheck(WS, {
      bead_id: 'S1',
      action_id: 'action-1',
      expected_revision: env.store.snapshot(WS).revision
    });

    expect(result).toMatchObject({ ok: true, state: 'base_contained' });
    expect(env.worktree.add).toHaveBeenCalledTimes(1);
    expect(env.scheduler.isRunning('S1')).toBe(true);
  });

  test('rechecks unique stale work and recalculates its capabilities', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    seedStaleWorkAdmission(env.store, {
      state: 'unknown',
      can_continue: false,
      can_backup_fresh: false,
      can_recheck: true
    });
    env.worktree.removeIfDiscardable = vi.fn(async () => ({
      ok: false,
      state: 'unique',
      removed: false,
      cause: 'untracked_present',
      owned: true,
      identity: {
        worktree_realpath: '/wt/S1',
        branch: 'S1',
        head_sha: 'a'.repeat(40),
        base_oid: 'b'.repeat(40),
        status_digest: 'd'.repeat(64)
      },
      summary: {
        staged_count: 0,
        unstaged_count: 0,
        untracked_count: 1,
        branch_ahead: 0,
        head_ahead: 0
      }
    }));

    const result = await env.scheduler.staleWorkRecheck(WS, {
      bead_id: 'S1',
      action_id: 'action-1',
      expected_revision: env.store.snapshot(WS).revision
    });

    expect(result).toMatchObject({ ok: true, state: 'unique' });
    expect(env.store.snapshot(WS).admission.S1.stale_work).toMatchObject({
      state: 'unique',
      cause: 'untracked_present',
      can_continue: true,
      can_backup_fresh: true,
      can_recheck: false
    });
    expect(env.store.snapshot(WS).attempts).toEqual({});
    expect(env.worktree.add).not.toHaveBeenCalled();
  });

  test('no-ops a recheck whose unknown identity and capabilities are unchanged', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    const observation = {
      ok: false,
      state: 'unknown',
      removed: false,
      cause: 'observe_failed',
      owned: true,
      identity: {
        worktree_realpath: '/wt/S1',
        branch: 'S1',
        head_sha: 'a'.repeat(40),
        base_oid: 'b'.repeat(40),
        status_digest: 'c'.repeat(64)
      },
      summary: {
        staged_count: 0,
        unstaged_count: 0,
        untracked_count: 0,
        branch_ahead: 0,
        head_ahead: 0
      }
    };
    env.worktree.removeIfDiscardable = vi.fn(async () => observation);
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const before = env.store.snapshot(WS);
    const stale_work = before.admission.S1.stale_work;
    expect(stale_work).toBeDefined();
    if (!stale_work) {
      return;
    }

    const result = await env.scheduler.staleWorkRecheck(WS, {
      bead_id: 'S1',
      action_id: stale_work.action_id,
      expected_revision: before.revision
    });
    const after = env.store.snapshot(WS);

    expect(result).toMatchObject({ ok: true, state: 'unknown' });
    expect(after.revision).toBe(before.revision);
    expect(after.attempts).toEqual(before.attempts);
    expect(after.discard_operations).toEqual(before.discard_operations);
    expect(env.worktree.add).not.toHaveBeenCalled();
    expect(env.worktree.remove).not.toHaveBeenCalled();
  });

  test('keeps base drift actionable with a refreshed identity', async () => {
    const current_base = 'd'.repeat(40);
    const env = setup({
      config: { S1: {} },
      slots: 1,
      resolveBase: vi.fn(async () => ({
        ok: true,
        base: 'main',
        base_oid: current_base
      }))
    });
    seedQueue(env.store, ['S1']);
    seedStaleWorkAdmission(env.store);
    env.worktree.removeIfDiscardable = vi.fn(async () =>
      uniqueStaleObservation({
        identity: {
          worktree_realpath: '/wt/S1',
          branch: 'S1',
          head_sha: 'a'.repeat(40),
          base_oid: current_base,
          status_digest: 'c'.repeat(64)
        }
      })
    );

    const continued = await env.scheduler.staleWorkContinue(WS, {
      bead_id: 'S1',
      action_id: 'action-1',
      expected_revision: env.store.snapshot(WS).revision
    });
    const drifted = env.store.snapshot(WS);
    const refreshed = drifted.admission.S1.stale_work;

    expect(continued.ok).toBe(false);
    expect(drifted.attempts).toEqual({});
    expect(drifted.admission.S1.reason).toBe('worktree_stale_work');
    expect(refreshed).toMatchObject({
      state: 'unique',
      can_continue: true,
      can_backup_fresh: true,
      can_recheck: false,
      identity: { base_oid: current_base }
    });
    expect(refreshed?.action_id).not.toBe('action-1');
    expect(env.store.snapshot(WS).attempts).toEqual({});
    expect(env.worktree.remove).not.toHaveBeenCalled();
    expect(env.worktree.add).not.toHaveBeenCalled();
  });
});

describe('scheduler stop residue cleanup', () => {
  test('a live stop cleans the residue only after the killed session exits', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.worktree.removeIfDiscardable.mockClear();

    await env.scheduler.stop(WS, attempt_id);

    // SIGTERM does not wait: checking here would race a process still writing.
    expect(env.worktree.removeIfDiscardable).not.toHaveBeenCalled();

    env.runner.finish('S1', { success: false, reason: 'killed', exit: null });
    await flush();
    await flush();

    expect(env.worktree.removeIfDiscardable).toHaveBeenCalledWith({
      repo: '/repo',
      bead_id: 'S1',
      base: 'main'
    });
  });

  test('refuses a re-queued bead with stop_cleanup_pending until the cleanup lands', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    await env.scheduler.stop(WS, attempt_id);
    // The user re-queues the bead while the killed process is still exiting.
    env.store.place(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      bead_id: 'S1'
    });

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S1')).toBe(false);
    expect(env.store.snapshot(WS).admission.S1.reason).toBe(
      'stop_cleanup_pending'
    );
  });

  test('dispatches the re-queued bead once the stop cleanup finished', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    await env.scheduler.stop(WS, attempt_id);
    env.store.place(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      bead_id: 'S1'
    });

    env.runner.finish('S1', { success: false, reason: 'killed', exit: null });
    await flush();
    await flush();

    expect(env.scheduler.isRunning('S1')).toBe(true);
  });

  test('keeps the residue when the killed session never reports its exit', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.worktree.removeIfDiscardable.mockClear();

    await env.scheduler.stop(WS, attempt_id);
    await flush();
    await flush();

    expect(env.worktree.removeIfDiscardable).not.toHaveBeenCalled();
  });

  test('a paused discard leaves the residue alone while the killed session is still exiting', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.runner.eventsFor('S1').emit('session_id', 'sid-1');
    await env.scheduler.pause(WS, attempt_id);
    env.worktree.removeIfDiscardable.mockClear();

    await env.scheduler.stop(WS, attempt_id);

    expect(env.worktree.removeIfDiscardable).not.toHaveBeenCalled();
  });

  test('a paused discard cleans the residue once the killed session exits', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.runner.eventsFor('S1').emit('session_id', 'sid-1');
    await env.scheduler.pause(WS, attempt_id);
    env.worktree.removeIfDiscardable.mockClear();
    await env.scheduler.stop(WS, attempt_id);

    env.runner.finish('S1', { success: false, reason: 'killed', exit: null });
    await flush();
    await flush();

    expect(env.worktree.removeIfDiscardable).toHaveBeenCalledWith({
      repo: '/repo',
      bead_id: 'S1',
      base: 'main'
    });
  });

  test('a paused record restored without a live handle is cleaned inline', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'A-restored', bead_id: 'S1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'A-restored',
      patch: {
        repo: '/repo',
        target_base: 'main',
        session_id: 'sid-1',
        status: 'paused'
      }
    });

    const discarded = await env.scheduler.stop(WS, 'A-restored');

    expect(discarded).toBe(true);
    expect(env.worktree.removeIfDiscardable).toHaveBeenCalledWith({
      repo: '/repo',
      bead_id: 'S1',
      base: 'main'
    });
  });

  test('never force-removes a residue the stop cleanup refused', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.runner.eventsFor('S1').emit('session_id', 'sid-1');
    await env.scheduler.pause(WS, attempt_id);
    env.worktree.removeIfDiscardable = vi.fn(async () => ({
      ok: false,
      removed: false,
      reason: 'branch_ahead'
    }));

    expect(await env.scheduler.stop(WS, attempt_id)).toBe(true);
    env.runner.finish('S1', { success: false, reason: 'killed', exit: null });
    await flush();
    await flush();

    expect(env.worktree.remove).not.toHaveBeenCalled();
  });

  test('a pause leaves the residue for the resume', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.runner.eventsFor('S1').emit('session_id', 'sid-1');
    env.worktree.removeIfDiscardable.mockClear();

    await env.scheduler.pause(WS, attempt_id);

    expect(env.worktree.removeIfDiscardable).not.toHaveBeenCalled();
  });
});

describe('scheduler terminal-status dequeue', () => {
  test('moves a closed queue member into the done lane instead of badging it', async () => {
    const env = setup({
      config: { S1: { ready: false, status: 'closed' } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const snap = env.store.snapshot(WS);
    expect(snap.queue.map((e) => e.bead_id)).toEqual([]);
    expect(snap.done.map((e) => e.bead_id)).toEqual(['S1']);
    expect(snap.admission.S1).toBeUndefined();
  });

  test('fans out the closed dequeue to subscribers', async () => {
    const notify = vi.fn();
    const env = setup({
      config: { S1: { ready: false, status: 'closed' } },
      slots: 1,
      notifyQueueChanged: notify
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(notify).toHaveBeenCalledWith(WS);
  });

  test('completes a bead that closed between the scan and the dispatch re-read', async () => {
    const env = setup({
      config: { S1: { notReadyAt: 2, status: 'closed' } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).queue.map((e) => e.bead_id)).toEqual([]);
    expect(env.store.snapshot(WS).done.map((e) => e.bead_id)).toEqual(['S1']);
    expect(env.store.snapshot(WS).admission.S1).toBeUndefined();
    expect(env.scheduler.isRunning('S1')).toBe(false);
  });

  test('stops bumping the revision once the closed bead is gone', async () => {
    const env = setup({
      config: { S1: { ready: false, status: 'closed' } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const revision = env.store.snapshot(WS).revision;

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).revision).toBe(revision);
  });

  test('keeps badging a resolved bead instead of dequeuing it', async () => {
    const env = setup({
      config: { S1: { ready: false, status: 'resolved' } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const snap = env.store.snapshot(WS);
    expect(snap.queue.map((e) => e.bead_id)).toEqual(['S1']);
    expect(snap.admission.S1.reason).toBe('not_ready:resolved');
  });

  test('a closed head does not starve the next queued bead', async () => {
    const env = setup({
      config: { S1: { ready: false, status: 'closed' }, S2: {} },
      slots: 1
    });
    seedQueue(env.store, ['S1', 'S2']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S2')).toBe(true);
  });
});

describe('scheduler closed-queue sweep (UI-m6bg)', () => {
  /**
   * Record one attempt for a bead WITHOUT moving it out of the waiting lane —
   * the shape the sweep's active judgment reads.
   *
   * @param {any} store
   * @param {string} bead_id
   * @param {string} attempt_id
   * @param {Record<string, any>} patch
   */
  function seedAttempt(store, bead_id, attempt_id, patch) {
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id, bead_id }
    });
    store.updateAttempt(WS, { attempt_id, patch });
  }

  test('moves a closed queue row into the done lane', () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    env.scheduler.sweepClosedQueue(WS, { S1: 'closed' });

    const snap = env.store.snapshot(WS);
    expect(snap.queue.map((e) => e.bead_id)).toEqual([]);
    expect(snap.done.map((e) => e.bead_id)).toEqual(['S1']);
  });

  test('keeps a resolved queue row in the queue', () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    env.scheduler.sweepClosedQueue(WS, { S1: 'resolved' });

    const snap = env.store.snapshot(WS);
    expect(snap.queue.map((e) => e.bead_id)).toEqual(['S1']);
    expect(snap.done).toEqual([]);
  });

  test('keeps an open queue row in the queue', () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    env.scheduler.sweepClosedQueue(WS, { S1: 'open' });

    expect(env.store.snapshot(WS).queue.map((e) => e.bead_id)).toEqual(['S1']);
  });

  test('keeps an in_progress queue row in the queue', () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    env.scheduler.sweepClosedQueue(WS, { S1: 'in_progress' });

    expect(env.store.snapshot(WS).queue.map((e) => e.bead_id)).toEqual(['S1']);
  });

  test('writes nothing for a bead the status read did not return', () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    const revision = env.store.snapshot(WS).revision;

    env.scheduler.sweepClosedQueue(WS, { S2: 'closed' });

    expect(env.store.snapshot(WS).revision).toBe(revision);
    expect(env.store.snapshot(WS).queue.map((e) => e.bead_id)).toEqual(['S1']);
  });

  test('writes nothing when handed a non-object status map', () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    const revision = env.store.snapshot(WS).revision;

    env.scheduler.sweepClosedQueue(WS, /** @type {any} */ (null));

    expect(env.store.snapshot(WS).revision).toBe(revision);
  });

  test('leaves a closed bead sitting in pr_wait and the merge queue alone', () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    seedAttempt(env.store, 'S1', 'att-1', { status: 'done' });
    env.store.moveToPrWait(WS, {
      bead_id: 'S1',
      attempt_id: 'att-1',
      patch: { status: 'done' }
    });
    env.store.enqueueMerge(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      entries: [{ bead_id: 'S1' }]
    });

    env.scheduler.sweepClosedQueue(WS, { S1: 'closed' });

    const snap = env.store.snapshot(WS);
    expect(snap.pr_wait.map((e) => e.bead_id)).toEqual(['S1']);
    expect(snap.merge_queue.map((e) => e.bead_id)).toEqual(['S1']);
    expect(snap.done).toEqual([]);
  });

  test('keeps a closed bead the dispatch already claimed in the queue', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    // Hang the worktree creation: the claim is taken and no attempt is recorded
    // yet, which is the pre-attempt window `active_bead_ids` cannot see.
    env.worktree.add.mockImplementation(() => new Promise(() => {}));
    seedQueue(env.store, ['S1']);
    const dispatching = env.scheduler.tick(WS);
    await flush();
    await flush();
    expect(env.scheduler.isRunning('S1')).toBe(true);

    env.scheduler.sweepClosedQueue(WS, { S1: 'closed' });

    expect(env.store.snapshot(WS).queue.map((e) => e.bead_id)).toEqual(['S1']);
    dispatching.catch(() => {});
  });

  test('keeps a closed bead holding a leaf paused attempt in the queue', () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    seedAttempt(env.store, 'S1', 'att-1', { status: 'paused' });

    env.scheduler.sweepClosedQueue(WS, { S1: 'closed' });

    expect(env.store.snapshot(WS).queue.map((e) => e.bead_id)).toEqual(['S1']);
  });

  test('keeps a closed bead holding an unfinished attempt in the queue', () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    seedAttempt(env.store, 'S1', 'att-1', { status: 'running' });

    env.scheduler.sweepClosedQueue(WS, { S1: 'closed' });

    expect(env.store.snapshot(WS).queue.map((e) => e.bead_id)).toEqual(['S1']);
  });

  test('moves a closed row whose only attempt already finished', () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    seedAttempt(env.store, 'S1', 'att-1', { status: 'failed' });

    env.scheduler.sweepClosedQueue(WS, { S1: 'closed' });

    expect(env.store.snapshot(WS).done.map((e) => e.bead_id)).toEqual(['S1']);
  });

  test('cleans up with auto_advance off, where no tick pass ever runs', async () => {
    const env = setup({
      config: { S1: { ready: false, status: 'closed' } },
      slots: 1
    });
    seedQueue(env.store, ['S1']);
    env.store.setAutoAdvance(WS, false);
    await env.scheduler.tick(WS);
    expect(env.store.snapshot(WS).queue.map((e) => e.bead_id)).toEqual(['S1']);

    env.scheduler.sweepClosedQueue(WS, { S1: 'closed' });

    expect(env.store.snapshot(WS).done.map((e) => e.bead_id)).toEqual(['S1']);
  });

  test('fans out one snapshot push for the whole sweep', () => {
    const notify = vi.fn();
    const env = setup({
      config: { S1: {}, S2: {} },
      slots: 1,
      notifyQueueChanged: notify
    });
    seedQueue(env.store, ['S1', 'S2']);
    notify.mockClear();

    env.scheduler.sweepClosedQueue(WS, { S1: 'closed', S2: 'closed' });

    expect(notify).toHaveBeenCalledTimes(1);
  });

  test('pushes no snapshot when the sweep moved nothing', () => {
    const notify = vi.fn();
    const env = setup({
      config: { S1: {} },
      slots: 1,
      notifyQueueChanged: notify
    });
    seedQueue(env.store, ['S1']);
    notify.mockClear();

    env.scheduler.sweepClosedQueue(WS, { S1: 'open' });

    expect(notify).not.toHaveBeenCalled();
  });

  test('moves a closed row whose attempt was orphaned', () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    seedAttempt(env.store, 'S1', 'att-1', { status: 'orphaned' });

    env.scheduler.sweepClosedQueue(WS, { S1: 'closed' });

    expect(env.store.snapshot(WS).done.map((e) => e.bead_id)).toEqual(['S1']);
  });

  test('moves a closed row whose paused attempt was already resumed', () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    seedAttempt(env.store, 'S1', 'att-1', { status: 'paused' });
    seedAttempt(env.store, 'S1', 'att-2', {
      status: 'done',
      resumed_from: 'att-1'
    });

    env.scheduler.sweepClosedQueue(WS, { S1: 'closed' });

    expect(env.store.snapshot(WS).done.map((e) => e.bead_id)).toEqual(['S1']);
  });

  test('a sweep during the scan does not resurrect the row as a dispatch', async () => {
    /** @type {(value: any) => void} */
    let release = () => {};
    // Hold the pass inside its admission await — the exact window the poller's
    // sweep runs in, and the one the claim happens AFTER.
    const env = setup({
      config: { S1: {} },
      slots: 1,
      admission: {
        validate: () =>
          new Promise((resolve) => {
            release = resolve;
          })
      }
    });
    seedQueue(env.store, ['S1']);
    const ticking = env.scheduler.tick(WS);
    await flush();
    await flush();

    env.scheduler.sweepClosedQueue(WS, { S1: 'closed' });
    release({ ok: true });
    await ticking;

    const snap = env.store.snapshot(WS);
    expect(snap.done.map((e) => e.bead_id)).toEqual(['S1']);
    expect(env.scheduler.isRunning('S1')).toBe(false);
  });
});

describe('scheduler protected bead sets (UI-b8n8 §접근 A)', () => {
  test('keeps an active discard bead out of dispatch and external adoption', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    env.store.createDiscardOperation(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      operation: {
        operation_id: 'discard-1',
        bead_id: 'S1',
        source_snapshot: { repo: '/repo', branch: 'S1' }
      }
    });

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S1')).toBe(false);
    expect(env.scheduler.activeBeadIds(WS).has('S1')).toBe(true);
    expect(env.scheduler.staleWorkActionInFlight(WS, 'S1')).toBe(true);
    expect(env.scheduler.externalProtectedBeadIds(WS).has('S1')).toBe(true);
  });

  test('finalizes a terminated discard runner as discarded and releases its slot', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.store.requestAttemptControl(WS, {
      attempt_id,
      kind: 'pause'
    });

    const result = await env.scheduler.finalizeDiscardAttempt(WS, attempt_id);

    expect(result).toEqual({ ok: true });
    expect(env.scheduler.runningCount()).toBe(0);
    expect(env.store.snapshot(WS).attempts[attempt_id]).toMatchObject({
      status: 'discarded',
      cause: null,
      control: null
    });
  });

  test('refuses pause while an active discard owns the attempt', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    seedActiveDiscard(env.store, 'S1', attempt_id);

    const result = await env.scheduler.pause(WS, attempt_id);

    expect(result).toEqual({ ok: false, reason: 'discard_in_progress' });
    expect(env.scheduler.isRunning('S1')).toBe(true);
  });

  test('refuses legacy stop while an active discard owns the attempt', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    seedActiveDiscard(env.store, 'S1', attempt_id);

    const result = await env.scheduler.stop(WS, attempt_id);

    expect(result).toBe(false);
    expect(env.scheduler.isRunning('S1')).toBe(true);
  });

  test('refuses resume while an active discard owns the attempt', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'paused-1', bead_id: 'S1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'paused-1',
      patch: {
        status: 'paused',
        session_id: 'session-1',
        repo: '/repo'
      }
    });
    seedActiveDiscard(env.store, 'S1', 'paused-1');

    const result = await env.scheduler.resume(WS, 'paused-1');

    expect(result).toEqual({ ok: false, reason: 'discard_in_progress' });
    expect(env.runner.spawnOrder).toEqual([]);
  });

  test('refuses conflict resolution while an active discard owns the bead', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedPrWait(env.store, 'S1');
    env.store.updateAttempt(WS, {
      attempt_id: 'att-S1',
      patch: { session_id: 'session-1', repo: '/repo', target_base: 'main' }
    });
    seedActiveDiscard(env.store, 'S1', 'att-S1');

    const result = await env.scheduler.resolveConflict(WS, 'S1');

    expect(result).toEqual({ ok: false, reason: 'discard_in_progress' });
    expect(env.runner.spawnOrder).toEqual([]);
  });

  test('refuses external conflict dispatch while an active discard owns the bead', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      externalPrs: { S1: { number: 1 } }
    });
    seedActiveDiscard(env.store, 'S1');

    const result = await env.scheduler.dispatchExternalConflict(
      WS,
      'S1',
      'main'
    );

    expect(result).toEqual({ ok: false, reason: 'discard_in_progress' });
    expect(env.runner.spawnOrder).toEqual([]);
  });

  test('reports a dispatch-claimed bead as active before any attempt exists', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    env.worktree.add.mockImplementation(() => new Promise(() => {}));
    seedQueue(env.store, ['S1']);
    const dispatching = env.scheduler.tick(WS);
    await flush();
    await flush();

    expect([...env.scheduler.activeBeadIds(WS)]).toEqual(['S1']);
    dispatching.catch(() => {});
  });

  test('reports a running bead as active', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.activeBeadIds(WS).has('S1')).toBe(true);
    expect(env.scheduler.staleWorkActionInFlight(WS, 'S1')).toBe(true);
  });

  test('drops a bead whose attempt reached a terminal status', async () => {
    const env = setup({ config: { S1: {} }, slots: 1, verifyOk: true });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    expect(env.scheduler.activeBeadIds(WS).has('S1')).toBe(false);
  });

  test('protects a stopped bead whose teardown has not finished', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    await env.scheduler.stop(WS, attempt_id);

    // The attempt is already `stopped` (terminal) and the claim is released, so
    // the active union alone no longer covers the bead — the cleanup fence is
    // the only thing holding the live worktree out of the external registry.
    expect(env.scheduler.activeBeadIds(WS).has('S1')).toBe(false);
    expect(env.scheduler.staleWorkActionInFlight(WS, 'S1')).toBe(true);
    expect(env.scheduler.externalProtectedBeadIds(WS).has('S1')).toBe(true);
  });

  test('releases the protection once the killed session exits', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    await env.scheduler.stop(WS, attempt_id);

    env.runner.finish('S1', { success: false, reason: 'killed', exit: null });
    await flush();
    await flush();

    expect(env.scheduler.externalProtectedBeadIds(WS).has('S1')).toBe(false);
  });

  test('leaves the closed-queue sweep on the narrower active set', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    await env.scheduler.stop(WS, attempt_id);
    env.store.place(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      bead_id: 'S1'
    });

    env.scheduler.sweepClosedQueue(WS, { S1: 'closed' });

    // `cleanup_pending` in the sweep would only delay a terminating bead's move
    // to `done` — the sweep is deliberately NOT the protected superset.
    expect(env.store.snapshot(WS).done.map((e) => e.bead_id)).toEqual(['S1']);
  });
});

describe('scheduler already-finished verify verdict (UI-b8n8 §접근 B)', () => {
  /**
   * @param {{ already_finished: boolean }} vr
   */
  function verifyWith(vr) {
    return {
      verifyPrSubmitted: vi.fn(async () => ({
        ok: true,
        reason: 'ok',
        pr_url: 'https://github.com/o/r/pull/1',
        pr_state: vr.already_finished ? 'MERGED' : 'OPEN',
        already_finished: vr.already_finished
      }))
    };
  }

  test('routes an already-finished bead to done instead of pr_wait', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      verify: verifyWith({ already_finished: true })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    const snap = env.store.snapshot(WS);
    expect(snap.done.map((e) => e.bead_id)).toEqual(['S1']);
    expect(snap.pr_wait).toEqual([]);
  });

  test('terminates the attempt on the same write as the done move', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      verify: verifyWith({ already_finished: true })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    const attempt = Object.values(env.store.snapshot(WS).attempts)[0];
    expect(attempt.status).toBe('done');
    expect(attempt.finished_at).toBe(1000);
  });

  test('pushes no prWaitEntered notification for a lane it never enters', async () => {
    const notify = {
      attemptStarted: vi.fn(),
      attemptFailed: vi.fn(),
      prWaitEntered: vi.fn()
    };
    const env = setup({
      config: { S1: {} },
      slots: 1,
      notify,
      verify: verifyWith({ already_finished: true })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    expect(notify.prWaitEntered).not.toHaveBeenCalled();
  });

  test('still routes an ordinary success to pr_wait', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      verify: verifyWith({ already_finished: false })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    const snap = env.store.snapshot(WS);
    expect(snap.pr_wait.map((e) => e.bead_id)).toEqual(['S1']);
    expect(snap.done).toEqual([]);
  });

  test('records the verify_result carrying pr_state on the attempt', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      verify: verifyWith({ already_finished: true })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    const attempt = Object.values(env.store.snapshot(WS).attempts)[0];
    expect(/** @type {any} */ (attempt.verify_result).pr_state).toBe('MERGED');
  });
});

describe('scheduler reconcile (worker-detached-session-reconcile §1)', () => {
  /**
   * Persist a `running` attempt exactly as a PRIOR process left it: the durable
   * record survives the restart, the in-memory session handle does not.
   *
   * @param {any} store
   * @param {Partial<import('./queue-store.js').Attempt>} [patch]
   */
  function seedDetachedAttempt(store, patch = {}) {
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id: 'att-1', bead_id: 'UI-1' }
    });
    store.updateAttempt(WS, {
      attempt_id: 'att-1',
      patch: {
        status: 'running',
        pid: 4242,
        started_at: 1000,
        repo: '/repo',
        workflow_mode_prior: null,
        ...patch
      }
    });
  }

  /**
   * A scheduler whose PID probe answers exactly once per attempt.
   *
   * @param {{ alive: boolean, started_at: number|null }} probe
   * @param {Record<string, any>} [config]
   * @param {Record<string, any>} [extra]
   */
  function reconcileEnv(probe, config = { 'UI-1': {} }, extra = {}) {
    return setup({ config, probePid: () => probe, ...extra });
  }

  test('leaves a live attempt whose PID start time matches untouched', async () => {
    const env = reconcileEnv({ alive: true, started_at: 1000 });
    seedDetachedAttempt(env.store);
    env.store.setAutoAdvance(WS, true);

    await env.scheduler.reconcile(WS);

    expect(env.store.snapshot(WS).attempts['att-1'].status).toBe('running');
    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();
  });

  test('keeps an attempt whose probed start time is inside the tolerance', async () => {
    const env = reconcileEnv({ alive: true, started_at: 2999 });
    seedDetachedAttempt(env.store);

    await env.scheduler.reconcile(WS);

    expect(env.store.snapshot(WS).attempts['att-1'].status).toBe('running');
  });

  test('treats a recycled PID (alive, start time mismatch) as dead', async () => {
    const env = reconcileEnv({ alive: true, started_at: 999999 });
    seedDetachedAttempt(env.store);

    await env.scheduler.reconcile(WS);

    expect(env.store.snapshot(WS).attempts['att-1'].status).toBe('done');
  });

  test('treats an attempt with no recorded pid as dead', async () => {
    const env = reconcileEnv({ alive: true, started_at: 1000 });
    seedDetachedAttempt(env.store, { pid: null });

    await env.scheduler.reconcile(WS);

    expect(env.store.snapshot(WS).attempts['att-1'].status).toBe('done');
  });

  test('ignores attempts that are not running', async () => {
    const env = reconcileEnv({ alive: false, started_at: null });
    seedDetachedAttempt(env.store, { status: 'done' });

    await env.scheduler.reconcile(WS);

    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();
  });

  test('recovers a late receipt for a paused attempt after restart', async () => {
    const env = reconcileEnv({ alive: false, started_at: null });
    seedDetachedAttempt(env.store, { status: 'paused' });
    const receipt_file = writeUsageReceipt('att-1');

    await env.scheduler.reconcile(WS);

    expect(env.store.snapshot(WS).attempts['att-1'].usage_legs).toHaveLength(1);
    expect(fs.existsSync(receipt_file)).toBe(false);
    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();
  });

  test('skips an attempt this process still holds a session handle for', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      probePid: () => ({ alive: false, started_at: null })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    await env.scheduler.reconcile(WS);

    // onSessionDone is this attempt's authority — a reconcile disposition here
    // would double-process the session the moment it exits.
    expect(env.store.snapshot(WS).attempts[attempt_id].status).toBe('running');
    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();
  });

  test('moves a dead attempt whose PR the server observes into pr_wait', async () => {
    const env = reconcileEnv({ alive: false, started_at: null });
    seedDetachedAttempt(env.store);
    env.store.setAutoAdvance(WS, true);

    await env.scheduler.reconcile(WS);

    const snap = env.store.snapshot(WS);
    expect(snap.attempts['att-1'].status).toBe('done');
    expect(snap.pr_wait.map((e) => e.bead_id)).toEqual(['UI-1']);
  });

  test('does not halt the queue when it recovers a normal completion', async () => {
    const env = reconcileEnv({ alive: false, started_at: null });
    seedDetachedAttempt(env.store);
    env.store.setAutoAdvance(WS, true);

    await env.scheduler.reconcile(WS);

    expect(env.store.snapshot(WS).auto_advance).toBe(true);
  });

  test('records the verify_result the PR poller resolves its PR number from', async () => {
    const env = reconcileEnv({ alive: false, started_at: null });
    seedDetachedAttempt(env.store);

    await env.scheduler.reconcile(WS);

    expect(
      env.store.snapshot(WS).attempts['att-1'].verify_result
    ).toMatchObject({ ok: true, pr_url: 'https://github.com/o/r/pull/1' });
  });

  test('leaves exit null — a detached session exit is never observed', async () => {
    const env = reconcileEnv({ alive: false, started_at: null });
    seedDetachedAttempt(env.store);

    await env.scheduler.reconcile(WS);

    expect(env.store.snapshot(WS).attempts['att-1'].exit).toBe(null);
  });

  test('reverts the exec stamps the dead session left on the bead', async () => {
    const env = reconcileEnv({ alive: false, started_at: null });
    seedDetachedAttempt(env.store, {
      exec_stamped_keys: ['orchestration_model']
    });

    await env.scheduler.reconcile(WS);

    expect(env.bd.calls).toContainEqual({
      method: 'unsetMetadata',
      bead_id: 'UI-1',
      key: 'orchestration_model'
    });
  });

  test('fails a dead attempt whose PR is missing and halts the queue', async () => {
    const env = reconcileEnv({ alive: false, started_at: null }, undefined, {
      verifyOk: false
    });
    seedDetachedAttempt(env.store);
    env.store.setAutoAdvance(WS, true);

    await env.scheduler.reconcile(WS);

    const snap = env.store.snapshot(WS);
    expect(snap.attempts['att-1'].cause).toBe('verify_failed:pr_missing');
    expect(snap.attempts['att-1'].status).toBe('failed');
    expect(snap.auto_advance).toBe(false);
  });

  test('fails closed when the PR observation could not be completed', async () => {
    const env = reconcileEnv({ alive: false, started_at: null }, undefined, {
      verify: {
        verifyPrSubmitted: vi.fn(async () => ({
          ok: false,
          reason: 'gh_observation_failed',
          pr_url: null
        }))
      }
    });
    seedDetachedAttempt(env.store);

    await env.scheduler.reconcile(WS);

    // An observation error must never be downgraded to "no PR was opened".
    expect(env.store.snapshot(WS).attempts['att-1'].cause).toBe(
      'verify_failed:gh_observation_failed'
    );
  });

  test('fails closed without an observation when the attempt records no repo', async () => {
    const env = reconcileEnv({ alive: false, started_at: null });
    seedDetachedAttempt(env.store, { repo: null });

    await env.scheduler.reconcile(WS);

    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();
    expect(env.store.snapshot(WS).attempts['att-1'].cause).toBe(
      'verify_failed:gh_observation_failed'
    );
  });

  test('fails a monitor-killed attempt even when its PR is observed open (UI-o2yt §3.3)', async () => {
    const env = reconcileEnv({ alive: false, started_at: null });
    seedDetachedAttempt(env.store, {
      guard_kill: {
        reason: 'merge_to_base_blocked',
        command: 'git merge main',
        at: 900
      }
    });
    env.store.setAutoAdvance(WS, true);

    await env.scheduler.reconcile(WS);

    const snap = env.store.snapshot(WS);
    expect(snap.attempts['att-1'].status).toBe('failed');
    expect(snap.attempts['att-1'].cause).toBe('loud_fail_blocker');
    expect(snap.attempts['att-1'].cause_detail).toEqual({
      reason: 'merge_to_base_blocked',
      command: 'git merge main'
    });
    expect(snap.pr_wait).toEqual([]);
    expect(snap.auto_advance).toBe(false);
  });

  test('stops the attempt monitor before lifting its terminal usage patch', async () => {
    /** @type {string[]} */
    const order = [];
    /** @type {any} */
    let env_ref = null;
    const sessionMonitors = {
      stop: vi.fn((/** @type {string} */ ws, /** @type {string} */ id) => {
        order.push('monitor_stop');
        // The drain a real stop performs: the tail's last lines reach the usage
        // store, which is what the disposition's patch then persists.
        env_ref.usage.record(ws, id, {
          message_id: 'm1',
          input_tokens: 12,
          output_tokens: 3
        });
        return true;
      })
    };
    const env = reconcileEnv({ alive: false, started_at: null }, undefined, {
      sessionMonitors,
      verify: {
        verifyPrSubmitted: vi.fn(async () => {
          order.push('verify');
          return { ok: true, reason: 'ok', pr_url: 'https://x/pull/1' };
        })
      }
    });
    env_ref = env;
    seedDetachedAttempt(env.store);

    await env.scheduler.reconcile(WS);

    expect(order).toEqual(['monitor_stop', 'verify']);
    expect(sessionMonitors.stop).toHaveBeenCalledWith(WS, 'att-1');
    expect(env.store.snapshot(WS).attempts['att-1'].usage).toMatchObject({
      input_tokens: 12,
      output_tokens: 3
    });
  });

  test('reads the guard evidence the monitor writes during its final drain', async () => {
    /** @type {any} */
    let env_ref = null;
    const sessionMonitors = {
      stop: vi.fn((/** @type {string} */ ws, /** @type {string} */ id) => {
        env_ref.store.updateAttempt(ws, {
          attempt_id: id,
          patch: {
            guard_kill: { reason: 'question_blocked', command: null, at: 900 }
          }
        });
        return true;
      })
    };
    const env = reconcileEnv({ alive: false, started_at: null }, undefined, {
      sessionMonitors
    });
    env_ref = env;
    seedDetachedAttempt(env.store);

    await env.scheduler.reconcile(WS);

    expect(env.store.snapshot(WS).attempts['att-1'].cause).toBe(
      'loud_fail_blocker'
    );
  });

  test('blocks the lane move when the workflow_mode revert fails', async () => {
    const env = reconcileEnv(
      { alive: false, started_at: null },
      {
        'UI-1': { throwOnUnset: true }
      }
    );
    seedDetachedAttempt(env.store);
    env.store.setAutoAdvance(WS, true);

    await env.scheduler.reconcile(WS);

    const snap = env.store.snapshot(WS);
    expect(snap.attempts['att-1'].cause).toBe('workflow_mode_revert_failed');
    expect(snap.pr_wait).toEqual([]);
  });

  /**
   * A verify dep whose observation parks until the returned `release` is
   * called — the seconds-long `gh` window every ownership fence exists for.
   *
   * @param {{ ok: boolean, reason: string }} [result]
   */
  function gatedVerify(result = { ok: true, reason: 'ok' }) {
    /** @type {() => void} */
    let release = () => {};
    const gate = new Promise((resolve) => {
      release = () => resolve(undefined);
    });
    const verifyPrSubmitted = vi.fn(async () => {
      await gate;
      return { ...result, pr_url: 'https://github.com/o/r/pull/1' };
    });
    return { verify: { verifyPrSubmitted }, verifyPrSubmitted, release };
  }

  /**
   * Settle the detached promise chains a disposition hangs off.
   *
   * @returns {Promise<void>}
   */
  async function drain() {
    for (let i = 0; i < 10; i += 1) {
      await flush();
    }
  }

  test('leaves an attempt alone while its own onSessionDone is still verifying', async () => {
    const gated = gatedVerify();
    const env = setup({
      config: { S1: {} },
      slots: 1,
      verify: gated.verify,
      probePid: () => ({ alive: false, started_at: null })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    // The handle is gone from `running` the moment onSessionDone starts, but
    // the attempt stays durably `running` until its terminal write lands.
    env.runner.finish('S1', { success: true });
    await flush();

    // Asserted while the pass is still open: an unfenced reconcile issues its
    // own observation here, which would ALSO park on the gate.
    const pass = env.scheduler.reconcile(WS);
    await flush();
    expect(gated.verifyPrSubmitted).toHaveBeenCalledTimes(1);

    gated.release();
    await pass;
    await drain();

    expect(gated.verifyPrSubmitted).toHaveBeenCalledTimes(1);
    expect(env.store.snapshot(WS).pr_wait.map((e) => e.bead_id)).toEqual([
      'S1'
    ]);
  });

  test('refuses discard fencing while normal completion is settling', async () => {
    const gated = gatedVerify();
    const env = setup({
      config: { S1: {} },
      slots: 1,
      verify: gated.verify
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.runner.finish('S1', { success: true });
    await flush();

    expect(env.scheduler.canDiscardAttempt(attempt_id)).toBe(false);
    expect(env.scheduler.fenceDiscardAttempt(attempt_id)).toBe(false);
    await expect(
      env.scheduler.finalizeDiscardAttempt(WS, attempt_id)
    ).resolves.toEqual({ ok: false, reason: 'attempt_settling' });

    gated.release();
    await drain();
    expect(env.store.snapshot(WS).attempts[attempt_id].status).toBe('done');
  });

  test('leaves an attempt alone while its dispatch is still in flight', async () => {
    /** @type {() => void} */
    let release = () => {};
    const gate = new Promise((resolve) => {
      release = () => resolve(undefined);
    });
    const env = setup({
      // The `workflow_mode=fast_track` write lands after the durable
      // pre-record (status `running`, pid null) and before the spawn, so
      // gating it holds the dispatch exactly in that window.
      config: { S1: { model: null } },
      slots: 1,
      probePid: () => ({ alive: false, started_at: null })
    });
    seedExecDefaults(env.store, { orchestration_model: 'opus' });
    seedQueue(env.store, ['S1']);
    const setMetadata = env.bd.setMetadata.bind(env.bd);
    env.bd.setMetadata = async (
      /** @type {string} */ bead_id,
      /** @type {string} */ key,
      /** @type {string} */ value
    ) => {
      if (key === 'workflow_mode') {
        await gate;
      }
      return setMetadata(bead_id, key, value);
    };

    const dispatching = env.scheduler.tick(WS);
    await flush();
    await env.scheduler.reconcile(WS);

    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    // pid is still null here — indistinguishable from a dead attempt without
    // the `claimed` fence.
    expect(env.store.snapshot(WS).attempts[attempt_id].pid).toBe(null);
    expect(env.store.snapshot(WS).attempts[attempt_id].status).toBe('running');
    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();

    release();
    await dispatching;

    expect(env.runner.spawnOrder).toEqual(['S1']);
    expect(env.store.snapshot(WS).attempts[attempt_id].pid).not.toBe(null);
  });

  test('blocks a re-dispatch of the bead while its reconcile observation is pending', async () => {
    const gated = gatedVerify();
    const env = reconcileEnv({ alive: false, started_at: null }, undefined, {
      verify: gated.verify
    });
    seedDetachedAttempt(env.store);
    seedQueue(env.store, ['UI-1']);

    const pass = env.scheduler.reconcile(WS);
    await flush();
    await env.scheduler.tick(WS);

    // A second attempt here would mean the disposition's later failAttempt
    // could release the NEW session's claim and revert ITS metadata.
    expect(Object.keys(env.store.snapshot(WS).attempts)).toEqual(['att-1']);
    expect(env.runner.spawnOrder).toEqual([]);

    gated.release();
    await pass;

    const snap = env.store.snapshot(WS);
    expect(snap.attempts['att-1'].status).toBe('done');
    expect(snap.pr_wait.map((e) => e.bead_id)).toEqual(['UI-1']);
  });

  test('gives the claim back so the recovered bead can dispatch again', async () => {
    const env = reconcileEnv({ alive: false, started_at: null });
    seedDetachedAttempt(env.store);

    await env.scheduler.reconcile(WS);

    expect(env.scheduler.isRunning('UI-1')).toBe(false);
  });

  test('runs one reconcile pass at a time per workspace', async () => {
    /** @type {() => void} */
    let release = () => {};
    const gate = new Promise((resolve) => {
      release = () => resolve(undefined);
    });
    const verifyPrSubmitted = vi.fn(async () => {
      await gate;
      return {
        ok: true,
        reason: 'ok',
        pr_url: 'https://github.com/o/r/pull/1'
      };
    });
    const env = reconcileEnv({ alive: false, started_at: null }, undefined, {
      verify: { verifyPrSubmitted }
    });
    seedDetachedAttempt(env.store);

    const first = env.scheduler.reconcile(WS);
    await flush();
    await env.scheduler.reconcile(WS);
    release();
    await first;

    expect(verifyPrSubmitted).toHaveBeenCalledTimes(1);
  });

  test('persists the replayed usage of a dead attempt it disposes (UI-ediw)', async () => {
    const env = reconcileEnv({ alive: false, started_at: null });
    seedDetachedAttempt(env.store);
    // What the startup replay left behind for an attempt this process never
    // owned: a tally rebuilt from the session log.
    env.usage?.record(WS, 'att-1', {
      message_id: 'm1',
      input_tokens: 10,
      output_tokens: 4
    });
    env.usage?.markReplayed(WS, 'att-1');

    await env.scheduler.reconcile(WS);

    expect(env.store.snapshot(WS).attempts['att-1'].usage).toMatchObject({
      input_tokens: 10,
      output_tokens: 4,
      replayed: true
    });
    // …and the in-memory entry is reclaimed with it.
    expect(env.usage?.get(WS, 'att-1')).toBe(null);
  });

  test('leaves usage null on a disposed attempt with nothing replayed', async () => {
    const env = reconcileEnv({ alive: false, started_at: null });
    seedDetachedAttempt(env.store);

    await env.scheduler.reconcile(WS);

    expect(env.store.snapshot(WS).attempts['att-1'].usage).toBe(null);
  });

  test('persists the replayed usage on the FAILED disposition branch too', async () => {
    const env = reconcileEnv({ alive: false, started_at: null }, undefined, {
      verifyOk: false
    });
    seedDetachedAttempt(env.store);
    env.usage?.record(WS, 'att-1', { message_id: 'm1', input_tokens: 7 });
    env.usage?.markReplayed(WS, 'att-1');

    await env.scheduler.reconcile(WS);

    const attempt = env.store.snapshot(WS).attempts['att-1'];
    expect(attempt.status).toBe('failed');
    expect(attempt.usage).toMatchObject({ input_tokens: 7, replayed: true });
  });

  test('leaves an attempt an active discard operation owns untouched', async () => {
    const env = reconcileEnv({ alive: false, started_at: null });
    seedDetachedAttempt(env.store);
    seedActiveDiscard(env.store, 'UI-1', 'att-1');

    await env.scheduler.reconcile(WS);

    // The discard kills the session itself, so an absent process is the
    // EXPECTED midpoint of the operation. Observing a PR the discard is busy
    // closing fails the attempt `verify_failed:pr_missing` on top of the
    // `discarded` status the operation writes.
    expect(env.store.snapshot(WS).attempts['att-1'].status).toBe('running');
    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();
  });

  test('skips a candidate whose discard is accepted mid-pass', async () => {
    const gated = gatedVerify();
    const env = reconcileEnv(
      { alive: false, started_at: null },
      { 'UI-1': {}, 'UI-2': {} },
      { verify: gated.verify }
    );
    seedDetachedAttempt(env.store);
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'att-2', bead_id: 'UI-2' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'att-2',
      patch: {
        status: 'running',
        pid: 4243,
        started_at: 1000,
        repo: '/repo',
        workflow_mode_prior: null
      }
    });

    // Both attempts are selected as dead by the same pass; the gate parks it
    // inside the FIRST disposition, which is the window a discard lands in.
    const pass = env.scheduler.reconcile(WS);
    await flush();
    seedActiveDiscard(env.store, 'UI-2', 'att-2');
    gated.release();
    await pass;
    await drain();

    expect(env.store.snapshot(WS).attempts['att-2'].status).toBe('running');
    expect(gated.verifyPrSubmitted).toHaveBeenCalledTimes(1);
  });

  test('skips a candidate whose discard COMPLETED mid-pass', async () => {
    const gated = gatedVerify();
    const env = reconcileEnv(
      { alive: false, started_at: null },
      { 'UI-1': {}, 'UI-2': {} },
      { verify: gated.verify }
    );
    seedDetachedAttempt(env.store);
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'att-2', bead_id: 'UI-2' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'att-2',
      patch: {
        status: 'running',
        pid: 4243,
        started_at: 1000,
        repo: '/repo',
        workflow_mode_prior: null
      }
    });

    // The whole discard runs inside the window the gate holds open, so by the
    // time the loop reaches att-2 the operation is `done` again — no longer
    // `discardActive` — and the attempt already carries its terminal status.
    const pass = env.scheduler.reconcile(WS);
    await flush();
    await env.scheduler.finalizeDiscardAttempt(WS, 'att-2');
    gated.release();
    await pass;
    await drain();

    expect(env.store.snapshot(WS).attempts['att-2'].status).toBe('discarded');
    expect(env.store.snapshot(WS).attempts['att-2'].cause).toBe(null);
    expect(gated.verifyPrSubmitted).toHaveBeenCalledTimes(1);
  });

  test('leaves a legacy cleanup diagnosis an active discard owns unretired', async () => {
    const env = reconcileEnv({ alive: false, started_at: null });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'legacy-1',
        bead_id: 'UI-1',
        cleanup_diagnosis: true,
        cleanup_diagnosis_result_path: '/legacy-result.json'
      }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'legacy-1',
      patch: { status: 'running', pid: null, repo: '/repo' }
    });
    seedActiveDiscard(env.store, 'UI-1', 'legacy-1');

    await env.scheduler.reconcile(WS);

    // Retirement is a durable terminal write too, so the discard fence has to
    // sit ahead of it, not beside the other three.
    expect(env.store.snapshot(WS).attempts['legacy-1'].status).toBe('running');
  });

  test('refuses discard fencing while a dead-attempt disposition is settling', async () => {
    const gated = gatedVerify();
    const env = reconcileEnv({ alive: false, started_at: null }, undefined, {
      verify: gated.verify
    });
    seedDetachedAttempt(env.store);

    const pass = env.scheduler.reconcile(WS);
    await flush();

    // The reverse race: the disposition is already mid-observation and owns the
    // terminal write, so a discard requested now must be refused rather than
    // race it.
    expect(env.scheduler.canDiscardAttempt('att-1')).toBe(false);
    expect(env.scheduler.fenceDiscardAttempt('att-1')).toBe(false);
    await expect(
      env.scheduler.finalizeDiscardAttempt(WS, 'att-1')
    ).resolves.toEqual({ ok: false, reason: 'attempt_settling' });

    gated.release();
    await pass;
    await drain();

    expect(env.scheduler.canDiscardAttempt('att-1')).toBe(true);
    expect(env.store.snapshot(WS).attempts['att-1'].status).toBe('done');
  });
});

describe('scheduler attempt-lifecycle notifications (UI-2yoq)', () => {
  /** A fake notifier recording every lifecycle push. */
  function makeFakeNotify() {
    return {
      attemptStarted: vi.fn(),
      attemptFailed: vi.fn(),
      prWaitEntered: vi.fn()
    };
  }

  /**
   * Seed a terminal attempt directly into the store, so the resume/conflict
   * paths can be driven without a first dispatch.
   *
   * @param {any} store
   * @param {string} attempt_id
   * @param {any} patch
   */
  function seedAttempt(store, attempt_id, patch) {
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id, bead_id: patch.bead_id }
    });
    store.updateAttempt(WS, { attempt_id, patch });
  }

  /** @returns {any} */
  function resumablePrior(over = {}) {
    return {
      bead_id: 'B1',
      status: 'failed',
      repo: '/repo',
      target_base: 'main',
      base_oid: 'base-B1',
      runner: 'claude',
      model: 'opus',
      effort: 'high',
      session_id: 'sid-abc',
      workflow_mode_prior: null,
      cause: 'verify_failed:pr_missing',
      ...over
    };
  }

  test('pushes attemptStarted with the bead title on a first dispatch', async () => {
    const notify = makeFakeNotify();
    const env = setup({
      config: { S1: { title: '워커 알림' } },
      slots: 1,
      notify
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(notify.attemptStarted).toHaveBeenCalledTimes(1);
    expect(notify.attemptStarted.mock.calls[0][0]).toEqual({
      bead_id: 'S1',
      title: '워커 알림',
      runner: 'claude',
      model: 'opus',
      effort: 'high',
      speed: 'default',
      repo: '/repo',
      kind: 'dispatch'
    });
  });

  test('marks a manual resume launch as a resume', async () => {
    const notify = makeFakeNotify();
    const env = setup({ config: {}, slots: 1, notify });
    seedAttempt(env.store, 'f1', resumablePrior());

    expect((await env.scheduler.resume(WS, 'f1')).ok).toBe(true);

    expect(notify.attemptStarted.mock.calls[0][0].kind).toBe('resume');
    expect(notify.attemptStarted.mock.calls[0][0].title).toBe(null);
  });

  test('marks a conflict-resolution launch as a conflict', async () => {
    const notify = makeFakeNotify();
    const env = setup({ config: {}, slots: 1, notify });
    seedAttempt(env.store, 'f1', resumablePrior());

    expect((await env.scheduler.resolveConflict(WS, 'B1')).ok).toBe(true);

    expect(notify.attemptStarted.mock.calls[0][0].kind).toBe('conflict');
  });

  test('pushes attemptFailed with the session cause', async () => {
    const notify = makeFakeNotify();
    const env = setup({ config: { S1: {} }, slots: 1, notify });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', {
      success: false,
      reason: 'result_count',
      exit: 1
    });
    await flush();
    await flush();

    expect(notify.attemptFailed).toHaveBeenCalledTimes(1);
    expect(notify.attemptFailed.mock.calls[0][0]).toEqual({
      bead_id: 'S1',
      cause: 'session_failed:result_count',
      repo: '/repo',
      cause_detail: null
    });
  });

  test('carries the blocker cause_detail into the failure push', async () => {
    const notify = makeFakeNotify();
    const env = setup({ config: { S1: {} }, slots: 1, notify });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', {
      success: false,
      reason: 'blocked',
      exit: 1,
      blocked: true,
      blocked_detail: { reason: 'git_merge_guard', command: 'git merge main' }
    });
    await flush();
    await flush();

    expect(notify.attemptFailed.mock.calls[0][0].cause).toBe(
      'loud_fail_blocker'
    );
    expect(notify.attemptFailed.mock.calls[0][0].cause_detail).toEqual({
      reason: 'git_merge_guard',
      command: 'git merge main'
    });
  });

  test('pushes attemptFailed from the dispatch workflow_mode_record_failed path', async () => {
    const notify = makeFakeNotify();
    const env = setup({
      config: { S1: { throwOnSet: true } },
      slots: 1,
      notify
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(notify.attemptFailed).toHaveBeenCalledTimes(1);
    expect(notify.attemptFailed.mock.calls[0][0]).toEqual({
      bead_id: 'S1',
      cause: 'workflow_mode_record_failed',
      repo: '/repo',
      cause_detail: null
    });
    expect(notify.attemptStarted).not.toHaveBeenCalled();
  });

  test('pushes attemptFailed from the relaunch workflow_mode_record_failed path', async () => {
    const notify = makeFakeNotify();
    const env = setup({
      config: { B1: { throwOnSet: true } },
      slots: 1,
      notify
    });
    seedAttempt(env.store, 'f1', resumablePrior());

    expect((await env.scheduler.resume(WS, 'f1')).reason).toBe(
      'workflow_mode_record_failed'
    );

    expect(notify.attemptFailed).toHaveBeenCalledTimes(1);
    expect(notify.attemptFailed.mock.calls[0][0]).toEqual({
      bead_id: 'B1',
      cause: 'workflow_mode_record_failed',
      repo: '/repo',
      cause_detail: null
    });
    expect(notify.attemptStarted).not.toHaveBeenCalled();
  });

  test('pushes attemptFailed when the runner spawn throws', async () => {
    const notify = makeFakeNotify();
    const env = setup({
      config: { S1: {} },
      slots: 1,
      notify,
      makeRunner: () => ({
        name: 'claude',
        spawn() {
          throw new Error('spawn exploded');
        }
      })
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(notify.attemptFailed).toHaveBeenCalledTimes(1);
    expect(notify.attemptFailed.mock.calls[0][0]).toEqual({
      bead_id: 'S1',
      cause: 'spawn_failed',
      repo: '/repo',
      cause_detail: null
    });
    expect(notify.attemptStarted).not.toHaveBeenCalled();
  });

  test('pushes prWaitEntered with the observed PR url on success', async () => {
    const notify = makeFakeNotify();
    const env = setup({ config: { S1: {} }, slots: 1, notify });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true, reason: 'ok', exit: 0 });
    await flush();
    await flush();

    expect(notify.prWaitEntered).toHaveBeenCalledTimes(1);
    expect(notify.prWaitEntered.mock.calls[0][0]).toEqual({
      bead_id: 'S1',
      pr_url: 'https://github.com/o/r/pull/1',
      repo: '/repo'
    });
    expect(notify.attemptFailed).not.toHaveBeenCalled();
  });

  test('pushes nothing terminal when the user stops the attempt', async () => {
    const notify = makeFakeNotify();
    const env = setup({ config: { S1: {} }, slots: 1, notify });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    await env.scheduler.stop(WS, attempt_id);
    env.runner.finish('S1', { success: false, reason: 'killed', exit: null });
    await flush();
    await flush();

    expect(notify.attemptStarted).toHaveBeenCalledTimes(1);
    expect(notify.attemptFailed).not.toHaveBeenCalled();
    expect(notify.prWaitEntered).not.toHaveBeenCalled();
  });

  test('pushes nothing terminal when the user pauses the attempt', async () => {
    const notify = makeFakeNotify();
    const env = setup({ config: { S1: {} }, slots: 1, notify });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    env.runner.eventsFor('S1').emit('session_id', 'sid-1');

    expect(await env.scheduler.pause(WS, attempt_id)).toEqual({ ok: true });
    await flush();

    expect(notify.attemptFailed).not.toHaveBeenCalled();
    expect(notify.prWaitEntered).not.toHaveBeenCalled();
  });

  test('a throwing notifier never breaks a queue transition', async () => {
    const notify = {
      attemptStarted: vi.fn(() => {
        throw new Error('notifier exploded');
      }),
      attemptFailed: vi.fn(),
      prWaitEntered: vi.fn(() => {
        throw new Error('notifier exploded');
      })
    };
    const env = setup({ config: { S1: {} }, slots: 1, notify });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);
    expect(env.scheduler.isRunning('S1')).toBe(true);

    env.runner.finish('S1', { success: true, reason: 'ok', exit: 0 });
    await flush();
    await flush();

    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    expect(env.store.snapshot(WS).attempts[attempt_id].status).toBe('done');
  });
});

describe('scheduler token usage (UI-raqh §1)', () => {
  test('persists the tallied usage onto the attempt when the session ends', async () => {
    const env = setup({ config: { A1: {} } });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);
    env.runner.eventsFor('A1').emit('event', {
      kind: 'text',
      usage: { message_id: 'm1', input_tokens: 10, output_tokens: 4 }
    });

    env.runner.finish('A1', { success: true });
    await flush();
    await flush();

    const attempt = Object.values(env.store.snapshot(WS).attempts)[0];
    expect(attempt.usage).toMatchObject({ input_tokens: 10, output_tokens: 4 });
  });

  test('lets the result total replace the per-message tally', async () => {
    const env = setup({ config: { A1: {} } });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);
    const events = env.runner.eventsFor('A1');
    events.emit('event', {
      kind: 'text',
      usage: { message_id: 'm1', input_tokens: 10, output_tokens: 4 }
    });
    events.emit('event', {
      kind: 'result',
      usage: { input_tokens: 18, output_tokens: 1113, total_cost_usd: 0.035 }
    });

    env.runner.finish('A1', { success: true });
    await flush();
    await flush();

    const attempt = Object.values(env.store.snapshot(WS).attempts)[0];
    expect(attempt.usage).toMatchObject({
      input_tokens: 18,
      output_tokens: 1113,
      total_cost_usd: 0.035
    });
  });

  test('leaves usage null when the runner reported none', async () => {
    const env = setup({ config: { A1: {} } });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);

    env.runner.finish('A1', { success: true });
    await flush();
    await flush();

    const attempt = Object.values(env.store.snapshot(WS).attempts)[0];
    expect(attempt.usage).toBe(null);
  });

  test('persists usage when the attempt is paused', async () => {
    const env = setup({ config: { A1: {} } });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);
    const events = env.runner.eventsFor('A1');
    events.emit('session_id', 'sid-1');
    events.emit('event', {
      kind: 'text',
      usage: { message_id: 'm1', input_tokens: 7, output_tokens: 2 }
    });
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    await env.scheduler.pause(WS, attempt_id);

    expect(env.store.snapshot(WS).attempts[attempt_id].usage).toMatchObject({
      input_tokens: 7,
      output_tokens: 2
    });
  });

  test('merges a burst of usage events into one throttled fanout', async () => {
    vi.useFakeTimers();
    try {
      const notifyQueueChanged = vi.fn();
      const env = setup({ config: { A1: {} }, notifyQueueChanged });
      seedQueue(env.store, ['A1']);
      await env.scheduler.tick(WS);
      const events = env.runner.eventsFor('A1');
      notifyQueueChanged.mockClear();

      for (let i = 0; i < 5; i += 1) {
        events.emit('event', {
          kind: 'text',
          usage: { message_id: `m${i}`, input_tokens: 1, output_tokens: 1 }
        });
      }
      expect(notifyQueueChanged).not.toHaveBeenCalled();
      vi.advanceTimersByTime(3000);

      expect(notifyQueueChanged).toHaveBeenCalledTimes(1);
    } finally {
      vi.useRealTimers();
    }
  });

  test('clears the pending usage fanout when the attempt ends', async () => {
    vi.useFakeTimers();
    try {
      const notifyQueueChanged = vi.fn();
      const env = setup({ config: { A1: {} }, notifyQueueChanged });
      seedQueue(env.store, ['A1']);
      await env.scheduler.tick(WS);
      env.runner.eventsFor('A1').emit('event', {
        kind: 'text',
        usage: { message_id: 'm1', input_tokens: 1, output_tokens: 1 }
      });

      env.runner.finish('A1', { success: true });
      await vi.advanceTimersByTimeAsync(0);
      await vi.advanceTimersByTimeAsync(0);
      const after_end = notifyQueueChanged.mock.calls.length;
      vi.advanceTimersByTime(3000);

      expect(notifyQueueChanged.mock.calls.length).toBe(after_end);
    } finally {
      vi.useRealTimers();
    }
  });
});

describe('scheduler usage after a pause or a stop (UI-raqh §1)', () => {
  test('persists a late receipt after pause without an outer usage delta', async () => {
    const env = setup({ config: { A1: {} } });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);
    env.runner.eventsFor('A1').emit('session_id', 'sid-1');
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    await env.scheduler.pause(WS, attempt_id);
    const receipt_file = writeUsageReceipt(attempt_id);

    env.runner.finish('A1', { success: false, reason: 'killed' });
    await flush();
    await flush();

    expect(env.store.snapshot(WS).attempts[attempt_id].usage_legs).toHaveLength(
      1
    );
    expect(fs.existsSync(receipt_file)).toBe(false);
  });

  test('persists a trailing usage event that lands after the pause', async () => {
    const env = setup({ config: { A1: {} } });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);
    const events = env.runner.eventsFor('A1');
    events.emit('session_id', 'sid-1');
    events.emit('event', {
      kind: 'text',
      usage: { message_id: 'm1', input_tokens: 7, output_tokens: 2 }
    });
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    await env.scheduler.pause(WS, attempt_id);

    // Buffered behind the SIGTERM: the process was still writing when we asked
    // it to stop.
    events.emit('event', {
      kind: 'result',
      usage: { input_tokens: 40, output_tokens: 11, total_cost_usd: 0.01 }
    });
    env.runner.finish('A1', { success: false, reason: 'killed' });
    await flush();
    await flush();

    expect(env.store.snapshot(WS).attempts[attempt_id].usage).toMatchObject({
      input_tokens: 40,
      output_tokens: 11
    });
  });

  test('leaves no live tally behind after a paused attempt settles', async () => {
    const env = setup({ config: { A1: {} } });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);
    const events = env.runner.eventsFor('A1');
    events.emit('session_id', 'sid-1');
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    await env.scheduler.pause(WS, attempt_id);
    events.emit('event', {
      kind: 'text',
      usage: { message_id: 'm1', input_tokens: 5, output_tokens: 1 }
    });

    env.runner.finish('A1', { success: false, reason: 'killed' });
    await flush();
    await flush();

    expect(env.usage?.get(WS, attempt_id)).toBe(null);
  });

  test('keeps the paused status when the trailing usage is written', async () => {
    const env = setup({ config: { A1: {} } });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);
    const events = env.runner.eventsFor('A1');
    events.emit('session_id', 'sid-1');
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];
    await env.scheduler.pause(WS, attempt_id);
    events.emit('event', {
      kind: 'text',
      usage: { message_id: 'm1', input_tokens: 5, output_tokens: 1 }
    });

    env.runner.finish('A1', { success: false, reason: 'killed' });
    await flush();
    await flush();

    expect(env.store.snapshot(WS).attempts[attempt_id].status).toBe('paused');
  });

  test('keeps a second running session usage fanout armed when one ends', async () => {
    vi.useFakeTimers();
    try {
      const notifyQueueChanged = vi.fn();
      const env = setup({
        config: { A1: {}, A2: {} },
        slots: 2,
        notifyQueueChanged
      });
      seedQueue(env.store, ['A1', 'A2']);
      await env.scheduler.tick(WS);
      env.runner.eventsFor('A2').emit('event', {
        kind: 'text',
        usage: { message_id: 'm1', input_tokens: 3, output_tokens: 1 }
      });
      notifyQueueChanged.mockClear();

      env.runner.finish('A1', { success: true });
      await vi.advanceTimersByTimeAsync(0);
      await vi.advanceTimersByTimeAsync(0);
      const after_end = notifyQueueChanged.mock.calls.length;
      vi.advanceTimersByTime(3000);

      expect(notifyQueueChanged.mock.calls.length).toBeGreaterThan(after_end);
    } finally {
      vi.useRealTimers();
    }
  });
});

describe('scheduler lane launch reservation releases (UI-nrut phase 1 → UI-04vo)', () => {
  /**
   * @param {any} base_store
   * @returns {any}
   */
  function rejectNextAppend(base_store) {
    const append_attempt = base_store.appendAttempt.bind(base_store);
    let reject_next = true;
    return {
      ...base_store,
      /** @param {string} workspace - Queue workspace. @param {any} input - Append input. */
      appendAttempt(workspace, input) {
        if (reject_next) {
          reject_next = false;
          return {
            ok: false,
            conflict: false,
            queue: base_store.snapshot(workspace)
          };
        }
        return append_attempt(workspace, input);
      }
    };
  }

  /**
   * @param {any} base_store
   * @returns {any}
   */
  function throwNextAppend(base_store) {
    const append_attempt = base_store.appendAttempt.bind(base_store);
    let throw_next = true;
    return {
      ...base_store,
      /** @param {string} workspace - Queue workspace. @param {any} input - Append input. */
      appendAttempt(workspace, input) {
        if (throw_next) {
          throw_next = false;
          throw new Error('append unavailable');
        }
        return append_attempt(workspace, input);
      }
    };
  }

  /**
   * @param {any} base_store
   * @returns {any}
   */
  function rejectNextBeginRepair(base_store) {
    const begin_repair = base_store.beginRepairOp.bind(base_store);
    let reject_next = true;
    return {
      ...base_store,
      /** @param {string} workspace - Queue workspace. @param {any} input - Repair input. */
      beginRepairOp(workspace, input) {
        if (reject_next) {
          reject_next = false;
          return {
            ok: false,
            conflict: false,
            queue: base_store.snapshot(workspace)
          };
        }
        return begin_repair(workspace, input);
      }
    };
  }

  /**
   * @param {any} base_store
   * @returns {any}
   */
  function throwNextBeginRepair(base_store) {
    const begin_repair = base_store.beginRepairOp.bind(base_store);
    let throw_next = true;
    return {
      ...base_store,
      /** @param {string} workspace - Queue workspace. @param {any} input - Repair input. */
      beginRepairOp(workspace, input) {
        if (throw_next) {
          throw_next = false;
          throw new Error('repair prerecord unavailable');
        }
        return begin_repair(workspace, input);
      }
    };
  }

  /**
   * @param {any} store
   * @param {string} bead_id
   */
  function removeQueued(store, bead_id) {
    store.remove(WS, {
      expected_revision: store.snapshot(WS).revision,
      bead_id
    });
  }

  test('permits a same-root completion repair through a different physical bead', async () => {
    const repair_bead_id = 'B1-rcccccccc';
    const env = setup({
      config: {
        B1: { labels: ['worker-serial'] },
        [repair_bead_id]: {}
      },
      slots: 1
    });
    seedCompletionIntent(env.store, repair_bead_id);
    env.store.updateAttempt(WS, {
      attempt_id: 'att-B1',
      patch: { worker_serial: true }
    });
    env.worktree.exists.mockReturnValue(false);
    env.worktree.add.mockImplementation(async ({ bead_id, base }) => ({
      path: `/wt/${bead_id}`,
      branch: bead_id,
      base_oid: base
    }));

    const result = await env.scheduler.dispatchCompletionRepair(WS, {
      root_bead_id: 'B1',
      op: {
        op_id: 'same-root-serial-repair',
        kind: 'dispatch_repair',
        failure_key: COMPLETION_FAILURE,
        attempt_id: 'same-root-serial-attempt',
        repair_bead_id,
        status: 'prepared'
      }
    });

    expect(result).toEqual({
      ok: true,
      attempt_id: 'same-root-serial-attempt'
    });
    expect(env.runner.spawnOrder).toEqual([repair_bead_id]);
  });

  test('releases a normal queue reservation after an attempt prerecord abort', async () => {
    const base_store = createQueueStore();
    const env = setup({
      store: rejectNextAppend(base_store),
      config: { B1: {}, S2: { labels: ['worker-serial'] } },
      slots: 1
    });
    seedQueue(env.store, ['B1']);

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).admission.B1).toMatchObject({
      reason: 'attempt_prerecord_failed'
    });
    removeQueued(env.store, 'B1');
    seedQueue(env.store, ['S2']);
    await env.scheduler.tick(WS);

    expect(env.runner.spawnOrder).toEqual(['S2']);
  });

  test('releases a normal queue reservation when base resolution throws', async () => {
    let resolves = 0;
    const env = setup({
      config: { B1: {}, S2: { labels: ['worker-serial'] } },
      resolveBase: async () => {
        if (++resolves === 1) {
          throw new Error('base unavailable');
        }
        return {
          ok: true,
          base: 'main',
          declared: true,
          remote: 'origin',
          remote_ref: 'refs/remotes/origin/main',
          base_oid: 'a'.repeat(40),
          local_only: false
        };
      },
      slots: 1
    });
    seedQueue(env.store, ['B1']);

    await env.scheduler.tick(WS);
    removeQueued(env.store, 'B1');
    seedQueue(env.store, ['S2']);
    await env.scheduler.tick(WS);

    expect(env.runner.spawnOrder).toEqual(['S2']);
  });

  test('releases a normal queue reservation when guard hook installation fails', async () => {
    let installs = 0;
    const env = setup({
      config: { B1: {}, S2: { labels: ['worker-serial'] } },
      guardHook: {
        install: vi.fn(() => ({ ok: ++installs > 1 })),
        envFor: vi.fn(() => ({})),
        remove: vi.fn(() => true)
      },
      slots: 1
    });
    seedQueue(env.store, ['B1']);

    await env.scheduler.tick(WS);
    removeQueued(env.store, 'B1');
    seedQueue(env.store, ['S2']);
    await env.scheduler.tick(WS);

    expect(env.runner.spawnOrder).toEqual(['S2']);
  });

  test('releases a normal queue reservation when the admission recheck refuses', async () => {
    let checks = 0;
    const env = setup({
      config: { B1: {}, S2: { labels: ['worker-serial'] } },
      admission: {
        validate: vi.fn(async () =>
          ++checks === 2
            ? { ok: false, reason: 'receipt_unreachable' }
            : { ok: true }
        )
      },
      slots: 1
    });
    seedQueue(env.store, ['B1']);

    await env.scheduler.tick(WS);
    removeQueued(env.store, 'B1');
    seedQueue(env.store, ['S2']);
    await env.scheduler.tick(WS);

    expect(env.runner.spawnOrder).toEqual(['S2']);
  });

  test('releases an external-conflict reservation after a prerecord throw', async () => {
    const base_store = createQueueStore();
    const env = setup({
      store: throwNextAppend(base_store),
      config: { B1: {}, S2: { labels: ['worker-serial'] } },
      externalPrs: { B1: {} },
      slots: 1
    });

    const result = await env.scheduler.dispatchExternalConflict(
      WS,
      'B1',
      'main'
    );

    expect(result).toEqual({ ok: false, reason: 'attempt_prerecord_failed' });
    seedQueue(env.store, ['S2']);
    await env.scheduler.tick(WS);

    expect(env.runner.spawnOrder).toEqual(['S2']);
  });

  test('releases an external-conflict reservation after an attempt prerecord abort', async () => {
    const base_store = createQueueStore();
    const env = setup({
      store: rejectNextAppend(base_store),
      config: { B1: {}, S2: { labels: ['worker-serial'] } },
      externalPrs: { B1: {} },
      slots: 1
    });

    const result = await env.scheduler.dispatchExternalConflict(
      WS,
      'B1',
      'main'
    );

    expect(result).toEqual({ ok: false, reason: 'attempt_prerecord_failed' });
    seedQueue(env.store, ['S2']);
    await env.scheduler.tick(WS);

    expect(env.runner.spawnOrder).toEqual(['S2']);
  });

  test('releases a resume reservation after a child prerecord abort', async () => {
    const base_store = createQueueStore();
    base_store.appendAttempt(WS, {
      expected_revision: base_store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'resume-prior',
        bead_id: 'B1',
        status: 'failed',
        repo: '/repo',
        target_base: 'main',
        runner: 'claude',
        session_id: 'resume-session'
      }
    });
    const env = setup({
      store: rejectNextAppend(base_store),
      config: { B1: {}, S2: { labels: ['worker-serial'] } },
      slots: 1
    });

    const result = await env.scheduler.resume(WS, 'resume-prior');

    expect(result).toEqual({ ok: false, reason: 'attempt_prerecord_failed' });
    seedQueue(env.store, ['S2']);
    await env.scheduler.tick(WS);

    expect(env.runner.spawnOrder).toEqual(['S2']);
  });

  test('releases a completion-repair reservation after its journal prerecord abort', async () => {
    const repair_bead_id = 'B1-rcccccccc';
    const base_store = createQueueStore();
    seedCompletionIntent(base_store, repair_bead_id);
    const env = setup({
      store: rejectNextBeginRepair(base_store),
      config: {
        B1: {},
        [repair_bead_id]: {},
        S2: { labels: ['worker-serial'] }
      },
      slots: 1
    });
    env.worktree.exists.mockReturnValue(false);
    env.worktree.add.mockImplementation(async ({ bead_id, base }) => ({
      path: `/wt/${bead_id}`,
      branch: bead_id,
      base_oid: base
    }));

    const result = await env.scheduler.dispatchCompletionRepair(WS, {
      root_bead_id: 'B1',
      op: {
        op_id: 'repair-abort',
        kind: 'dispatch_repair',
        failure_key: COMPLETION_FAILURE,
        attempt_id: 'repair-abort-attempt',
        repair_bead_id,
        status: 'prepared'
      }
    });

    expect(result).toEqual({ ok: false, reason: 'attempt_prerecord_failed' });
    removeQueued(env.store, 'B1');
    seedQueue(env.store, ['S2']);
    await env.scheduler.tick(WS);

    expect(env.runner.spawnOrder).toEqual(['S2']);
  });

  test('releases a completion-repair claim and guard after its journal prerecord throws', async () => {
    const repair_bead_id = 'B1-rcccccccc';
    const base_store = createQueueStore();
    seedCompletionIntent(base_store, repair_bead_id);
    const guardHook = {
      install: vi.fn(() => ({ ok: true })),
      envFor: vi.fn(() => ({})),
      remove: vi.fn(() => true)
    };
    const env = setup({
      store: throwNextBeginRepair(base_store),
      config: {
        B1: {},
        [repair_bead_id]: {},
        S2: { labels: ['worker-serial'] }
      },
      guardHook,
      slots: 1
    });
    env.worktree.exists.mockReturnValue(false);
    env.worktree.add.mockImplementation(async ({ bead_id, base }) => ({
      path: `/wt/${bead_id}`,
      branch: bead_id,
      base_oid: base
    }));

    const result = await env.scheduler.dispatchCompletionRepair(WS, {
      root_bead_id: 'B1',
      op: {
        op_id: 'repair-throw',
        kind: 'dispatch_repair',
        failure_key: COMPLETION_FAILURE,
        attempt_id: 'repair-throw-attempt',
        repair_bead_id,
        status: 'prepared'
      }
    });

    expect(result).toEqual({ ok: false, reason: 'attempt_prerecord_failed' });
    expect(guardHook.remove).toHaveBeenCalledWith({
      workspace: WS,
      attempt_id: 'repair-throw-attempt'
    });
    expect(
      env.store.snapshot(WS).attempts['repair-throw-attempt']
    ).toBeUndefined();
    removeQueued(env.store, 'B1');
    seedQueue(env.store, ['S2']);
    await env.scheduler.tick(WS);

    expect(env.runner.spawnOrder).toEqual(['S2']);
  });

  test('releases a REVISE reservation after a child prerecord abort', async () => {
    const base_store = createQueueStore();
    base_store.place(WS, {
      expected_revision: base_store.snapshot(WS).revision,
      bead_id: 'B1'
    });
    base_store.appendAttempt(WS, {
      expected_revision: base_store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'revise-prior',
        bead_id: 'B1',
        status: 'failed',
        repo: '/repo',
        target_base: 'main',
        runner: 'claude',
        session_id: 'revise-session',
        spec_review_stale: true
      }
    });
    const env = setup({
      store: rejectNextAppend(base_store),
      config: { B1: {}, S2: { labels: ['worker-serial'] } },
      slots: 1
    });

    const result = await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'revise-prior',
      prompt: '수정하라'
    });

    expect(result).toEqual({ ok: false, reason: 'attempt_prerecord_failed' });
    removeQueued(env.store, 'B1');
    seedQueue(env.store, ['S2']);
    await env.scheduler.tick(WS);

    expect(env.runner.spawnOrder).toEqual(['S2']);
  });
});

describe('scheduler dispatch-time base resolution (worker-base-scope-alignment §1)', () => {
  test('cuts the worktree from the resolved base_oid, not the branch name', async () => {
    const { store, worktree, scheduler } = setup({
      config: { 'UI-1': { repo: '/repo', target_base: 'ilsun/dev' } },
      admission: { validate: async () => ({ ok: true }) },
      resolveBase: async () => ({
        ok: true,
        base: 'ilsun/dev',
        declared: true,
        remote: 'origin',
        remote_ref: 'refs/remotes/origin/ilsun/dev',
        base_oid: 'a'.repeat(40),
        local_only: false
      })
    });
    seedQueue(store, ['UI-1']);

    await scheduler.tick(WS);

    expect(worktree.add).toHaveBeenCalledWith({
      repo: '/repo',
      bead_id: 'UI-1',
      base: 'a'.repeat(40)
    });
  });

  test('re-resolves the base at dispatch with force', async () => {
    /** @type {Array<{ force?: boolean }|undefined>} */
    const calls = [];
    const { store, scheduler } = setup({
      config: { 'UI-1': { repo: '/repo', target_base: 'main' } },
      admission: { validate: async () => ({ ok: true }) },
      resolveBase: async (/** @type {any} */ options) => {
        calls.push(options);
        return {
          ok: true,
          base: 'main',
          declared: false,
          remote: 'origin',
          remote_ref: 'refs/remotes/origin/main',
          base_oid: 'b'.repeat(40),
          local_only: false
        };
      }
    });
    seedQueue(store, ['UI-1']);

    await scheduler.tick(WS);

    expect(calls).toContainEqual({ force: true });
  });

  test('refuses the dispatch with the failing step and touches no worktree', async () => {
    const { store, worktree, scheduler } = setup({
      config: { 'UI-1': { repo: '/repo', target_base: 'ilsun/dv' } },
      admission: { validate: async () => ({ ok: true }) },
      resolveBase: async () => ({
        ok: false,
        step: 'ref',
        base: 'ilsun/dv',
        detail: 'refs/remotes/origin/ilsun/dv'
      })
    });
    seedQueue(store, ['UI-1']);

    await scheduler.tick(WS);

    expect(store.snapshot(WS).admission['UI-1'].reason).toBe(
      'base_unresolved:ref'
    );
    expect(worktree.add).not.toHaveBeenCalled();
    expect(worktree.removeIfDiscardable).not.toHaveBeenCalled();
  });

  test('refuses when the resolver throws instead of dispatching on a fallback', async () => {
    const { store, worktree, scheduler } = setup({
      config: { 'UI-1': { repo: '/repo', target_base: 'main' } },
      admission: { validate: async () => ({ ok: true }) },
      resolveBase: async () => {
        throw new Error('git gone');
      }
    });
    seedQueue(store, ['UI-1']);

    await scheduler.tick(WS);

    expect(store.snapshot(WS).admission['UI-1'].reason).toBe(
      'base_unresolved:git_error'
    );
    expect(worktree.add).not.toHaveBeenCalled();
  });
});

describe('scheduler→runner base wiring (worker-base-scope-alignment §3)', () => {
  test('the settings a real dispatch spawns with carry repo, target_base and base_oid', async () => {
    const { store, runner, scheduler } = setup({
      config: { 'UI-1': { repo: '/repo', target_base: 'ilsun/dev' } },
      admission: { validate: async () => ({ ok: true }) },
      resolveBase: async () => ({
        ok: true,
        base: 'ilsun/dev',
        declared: true,
        remote: 'origin',
        remote_ref: 'refs/remotes/origin/ilsun/dev',
        base_oid: 'a'.repeat(40),
        local_only: false
      })
    });
    seedQueue(store, ['UI-1']);

    await scheduler.tick(WS);

    // `base_oid` is what the worktree actually resolved after the cut — the
    // attempt's own pin, which the admission re-check is also taken against.
    expect(runner.settingsFor('UI-1')).toMatchObject({
      repo: '/repo',
      target_base: 'ilsun/dev',
      base_oid: 'base-UI-1'
    });
  });

  test('a resume launch carries the same three fields', async () => {
    const { store, runner, scheduler } = setup({
      config: { 'UI-1': { repo: '/repo', target_base: 'main' } },
      admission: { validate: async () => ({ ok: true }) }
    });
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id: 'a1', bead_id: 'UI-1' }
    });
    store.updateAttempt(WS, {
      attempt_id: 'a1',
      patch: {
        repo: '/repo',
        target_base: 'ilsun/dev',
        base_oid: 'b'.repeat(40),
        session_id: 'sess-1',
        status: 'failed',
        cause: 'blocked',
        finished_at: 10
      }
    });

    await scheduler.resume(WS, 'a1');

    expect(runner.settingsFor('UI-1')).toMatchObject({
      repo: '/repo',
      target_base: 'ilsun/dev',
      base_oid: 'b'.repeat(40)
    });
  });
});

describe('guard hook wiring — prevention layer (UI-8mvc §2)', () => {
  /** @type {string | undefined} */
  let saved_count;

  beforeEach(() => {
    // The append rule is asserted explicitly below; every OTHER case wants a
    // deterministic index 0, so the ambient value is cleared here.
    saved_count = process.env.GIT_CONFIG_COUNT;
    delete process.env.GIT_CONFIG_COUNT;
  });

  afterEach(() => {
    if (saved_count === undefined) {
      delete process.env.GIT_CONFIG_COUNT;
    } else {
      process.env.GIT_CONFIG_COUNT = saved_count;
    }
  });

  /**
   * Whether an attempt's executable hook is on disk.
   *
   * @param {string} attempt_id
   * @returns {boolean}
   */
  function hookInstalled(attempt_id) {
    return fs.existsSync(path.join(guardHookDir(WS, attempt_id), 'pre-push'));
  }

  /**
   * A guardHook double whose install always fails, for the refusal path.
   *
   * @param {string} reason
   */
  function failingGuardHook(reason) {
    return {
      install: vi.fn(() => ({ ok: false, reason })),
      envFor: vi.fn(() => ({})),
      remove: vi.fn(() => true)
    };
  }

  test('delivers the three GIT_CONFIG keys to the spawned session', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.runner.settingsFor('S1').env).toMatchObject({
      GIT_CONFIG_COUNT: '1',
      GIT_CONFIG_KEY_0: 'core.hooksPath',
      GIT_CONFIG_VALUE_0: guardHookDir(WS, 'S1-1000-1'),
      BDUI_ATTEMPT_ID: 'S1-1000-1',
      BDUI_CODEX_USAGE_RECEIPT_DIR: expect.stringContaining(
        path.join('usage-receipts', 'S1-1000-1')
      )
    });
    expect(hookInstalled('S1-1000-1')).toBe(true);
  });

  test('continues the runner lifecycle when receipt inbox setup fails', async () => {
    const usageReceipts = {
      ensureUsageReceiptInbox: vi.fn(() => ({
        ok: false,
        reason: 'directory_mode'
      })),
      readAttemptUsageReceipts: vi.fn(() => ({
        legs: [],
        files: [],
        warnings: []
      })),
      normalizeUsageLegs: vi.fn((legs) => legs),
      removeEmptyUsageReceiptInbox: vi.fn(),
      consumeUsageReceiptFiles: vi.fn()
    };
    const env = setup({ config: { S1: {} }, slots: 1, usageReceipts });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.runner.spawnOrder).toEqual(['S1']);
    expect(env.store.snapshot(WS).attempts['S1-1000-1'].status).toBe('running');
    expect(env.runner.settingsFor('S1').env).not.toHaveProperty(
      'BDUI_ATTEMPT_ID'
    );
    env.runner.finish('S1', { success: true });
    await flush();
    await flush();
    expect(env.store.snapshot(WS).attempts['S1-1000-1'].status).toBe('done');
  });

  test('fans out a receipt-only leg after the bounded live poll', async () => {
    vi.useFakeTimers();
    try {
      const notifyQueueChanged = vi.fn();
      const usageReceipts = {
        ensureUsageReceiptInbox: vi.fn(() => ({
          ok: false,
          reason: 'directory_mode'
        })),
        readAttemptUsageReceipts: vi.fn(() => ({
          legs: [
            {
              receipt_id: 'launch-1',
              provider: 'codex',
              role: 'implementation',
              session_id: 'thread-1',
              turn_id: 'turn-1',
              model: 'gpt-5.6-terra',
              usage: {
                input_tokens: 1,
                output_tokens: 1,
                cache_read_input_tokens: 0,
                cache_creation_input_tokens: 0,
                reasoning_output_tokens: 0
              },
              completed_at: '2026-08-11T12:34:56Z'
            }
          ],
          files: [],
          warnings: []
        })),
        normalizeUsageLegs: vi.fn((legs) => legs),
        removeEmptyUsageReceiptInbox: vi.fn(),
        consumeUsageReceiptFiles: vi.fn()
      };
      const env = setup({
        config: { S1: {} },
        slots: 1,
        usageReceipts,
        notifyQueueChanged
      });
      seedQueue(env.store, ['S1']);

      await env.scheduler.tick(WS);
      notifyQueueChanged.mockClear();
      await vi.advanceTimersByTimeAsync(3000);

      expect(usageReceipts.readAttemptUsageReceipts).toHaveBeenCalledWith(
        WS,
        'S1-1000-1',
        { known_legs: [] }
      );
      expect(notifyQueueChanged).toHaveBeenCalledWith(WS);
    } finally {
      vi.useRealTimers();
    }
  });

  test('the delivered keys reach the real spawn env', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [
        JSON.stringify({
          type: 'result',
          subtype: 'success',
          is_error: false,
          permission_denials: []
        })
      ],
      exit: 0
    });
    const env = setup({
      config: { S1: {} },
      slots: 1,
      makeRunner: (/** @type {string} */ name) =>
        createRunner(name, { spawn_impl })
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const spawned = spawn_impl.captured.calls[0].options.env;
    expect(spawned.GIT_CONFIG_COUNT).toBe('1');
    expect(spawned.GIT_CONFIG_KEY_0).toBe('core.hooksPath');
    expect(spawned.GIT_CONFIG_VALUE_0).toBe(guardHookDir(WS, 'S1-1000-1'));
    await flush();
  });

  test('appends to an inherited GIT_CONFIG_COUNT instead of overwriting it', async () => {
    process.env.GIT_CONFIG_COUNT = '2';
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    // Writing COUNT=1 over an inherited COUNT=2 would drop the parent's
    // KEY_1/VALUE_1 pair.
    expect(env.runner.settingsFor('S1').env).toMatchObject({
      GIT_CONFIG_COUNT: '3',
      GIT_CONFIG_KEY_2: 'core.hooksPath',
      GIT_CONFIG_VALUE_2: guardHookDir(WS, 'S1-1000-1'),
      BDUI_ATTEMPT_ID: 'S1-1000-1'
    });
  });

  test('installs and delivers on a manual resume', async () => {
    const env = setup({ config: {}, slots: 1 });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'anc', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'anc',
      patch: {
        bead_id: 'B1',
        status: 'failed',
        repo: '/repo',
        target_base: 'ilsun/dev',
        session_id: 'sid-abc',
        workflow_mode_prior: null
      }
    });

    const res = await env.scheduler.resume(WS, 'anc');

    expect(res.ok).toBe(true);
    expect(hookInstalled(String(res.attempt_id))).toBe(true);
    expect(env.runner.settingsFor('B1').env.GIT_CONFIG_VALUE_0).toBe(
      guardHookDir(WS, String(res.attempt_id))
    );
  });

  test('installs and delivers on an external-conflict dispatch', async () => {
    const env = setup({
      config: { X1: { repo: '/repo', status: 'resolved' } },
      slots: 1,
      externalPrs: { X1: { bead_id: 'X1', pr_url: 'u' } }
    });

    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(res.ok).toBe(true);
    expect(hookInstalled(String(res.attempt_id))).toBe(true);
    expect(env.runner.settingsFor('X1').env.GIT_CONFIG_VALUE_0).toBe(
      guardHookDir(WS, String(res.attempt_id))
    );
  });

  test('installs NOTHING for a disposition attempt', async () => {
    const env = setup({ config: {}, slots: 1 });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'p1', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'p1',
      patch: {
        bead_id: 'B1',
        status: 'failed',
        repo: '/repo',
        target_base: 'main',
        session_id: 'sid-park',
        workflow_mode_prior: null
      }
    });

    const res = await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });

    // Publishing the resolved base IS this session's job.
    expect(res.ok).toBe(true);
    expect(hookInstalled(String(res.attempt_id))).toBe(false);
    expect(env.runner.settingsFor('B1').env).toMatchObject({
      BDUI_ATTEMPT_ID: String(res.attempt_id),
      BDUI_CODEX_USAGE_RECEIPT_DIR: expect.stringContaining('usage-receipts')
    });
  });

  test('refuses the dispatch with guard_hook_install_failed and leaves zero residue', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      guardHook: failingGuardHook('guard_hook_mkdir_failed')
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).admission.S1.reason).toBe(
      'guard_hook_install_failed'
    );
    // Nothing downstream of the install point ever ran.
    expect(env.worktree.removeIfDiscardable).not.toHaveBeenCalled();
    expect(env.worktree.add).not.toHaveBeenCalled();
    expect(env.store.snapshot(WS).attempts).toEqual({});
    expect(env.bd.calls.filter((c) => c.method !== 'snapshotBead')).toEqual([]);
    expect(env.scheduler.isRunning('S1')).toBe(false);
  });

  test('a PARTIAL install failure refuses and leaves no hook dir behind', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    // Only the HOOK write fails — the queue store shares this module.
    const real_write = fs.writeFileSync;
    const spy = vi
      .spyOn(fs, 'writeFileSync')
      .mockImplementation((file, data, options) => {
        if (
          String(file).endsWith(
            path.join('guard-hooks', 'S1-1000-1', 'pre-push')
          )
        ) {
          throw new Error('ENOSPC');
        }
        return real_write(file, data, options);
      });

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).admission.S1.reason).toBe(
      'guard_hook_install_failed'
    );
    expect(fs.existsSync(guardHookDir(WS, 'S1-1000-1'))).toBe(false);
    expect(env.store.snapshot(WS).attempts).toEqual({});
    expect(env.worktree.add).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  test('refuses the resume with guard_hook_install_failed before spending the ancestor', async () => {
    const env = setup({
      config: {},
      slots: 1,
      guardHook: failingGuardHook('guard_hook_mkdir_failed')
    });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'anc', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'anc',
      patch: {
        bead_id: 'B1',
        status: 'failed',
        repo: '/repo',
        target_base: 'main',
        session_id: 'sid-abc',
        workflow_mode_prior: null
      }
    });

    const res = await env.scheduler.resume(WS, 'anc');

    expect(res).toEqual({ ok: false, reason: 'guard_hook_install_failed' });
    // No child attempt was minted, so the ancestor is still resumable.
    expect(Object.keys(env.store.snapshot(WS).attempts)).toEqual(['anc']);
    expect(env.scheduler.isRunning('B1')).toBe(false);
  });

  for (const early of [
    {
      name: 'the worktree pre-flight refuses (worktree_stale_work)',
      arrange: (/** @type {any} */ env) => {
        env.worktree.removeIfDiscardable = vi.fn(async () => ({
          ok: false,
          removed: false,
          reason: 'dirty'
        }));
      }
    },
    {
      name: 'the worktree pre-flight throws (git_error)',
      arrange: (/** @type {any} */ env) => {
        env.worktree.removeIfDiscardable = vi.fn(async () => {
          throw new Error('git exploded');
        });
      }
    },
    {
      name: 'worktree.add fails (worktree_add_failed)',
      arrange: (/** @type {any} */ env) => {
        env.worktree.add = vi.fn(async () => {
          throw new Error('add failed');
        });
      }
    }
  ]) {
    test(`removes the hook when ${early.name}`, async () => {
      const env = setup({ config: { S1: {} }, slots: 1 });
      early.arrange(env);
      seedQueue(env.store, ['S1']);

      await env.scheduler.tick(WS);

      expect(env.scheduler.isRunning('S1')).toBe(false);
      expect(fs.existsSync(guardHookDir(WS, 'S1-1000-1'))).toBe(false);
    });
  }

  test('removes the hook when the admission re-check refuses', async () => {
    let nth = 0;
    const env = setup({
      config: { S1: {} },
      slots: 1,
      admission: {
        validate: async () => {
          nth += 1;
          // Pass the scan, refuse the dispatch-time re-check.
          return nth === 1 ? { ok: true } : { ok: false, reason: 'no_spec' };
        }
      }
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.scheduler.isRunning('S1')).toBe(false);
    expect(fs.existsSync(guardHookDir(WS, 'S1-1000-1'))).toBe(false);
  });

  test('removes the hook when the workflow_mode record fails', async () => {
    const env = setup({ config: { S1: { throwOnSet: true } }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const a = /** @type {any} */ (
      Object.values(env.store.snapshot(WS).attempts)[0]
    );
    expect(a.cause).toBe('workflow_mode_record_failed');
    expect(fs.existsSync(guardHookDir(WS, 'S1-1000-1'))).toBe(false);
  });

  test('removes the hook when the spawn throws', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      makeRunner: () => ({
        name: 'claude',
        spawn() {
          throw new Error('spawn failed');
        }
      })
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const a = /** @type {any} */ (
      Object.values(env.store.snapshot(WS).attempts)[0]
    );
    expect(a.cause).toBe('spawn_failed');
    expect(fs.existsSync(guardHookDir(WS, 'S1-1000-1'))).toBe(false);
  });

  test('removes the hook when the session terminates normally', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    expect(hookInstalled('S1-1000-1')).toBe(true);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    expect(fs.existsSync(guardHookDir(WS, 'S1-1000-1'))).toBe(false);
  });

  test('removes the hook when the session fails', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: false, reason: 'exit_1' });
    await flush();
    await flush();

    expect(fs.existsSync(guardHookDir(WS, 'S1-1000-1'))).toBe(false);
  });

  test('removes the hook of a restart-surviving attempt disposed by reconcile', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      probePid: () => ({ alive: false, started_at: null }),
      verifyOk: false
    });
    // A hook left by the PREVIOUS server process, whose attempt this one only
    // ever sees as a durable `running` record.
    const installed = installGuardHookForTest('att-dead');
    expect(installed).toBe(true);
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'att-dead', bead_id: 'UI-9' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'att-dead',
      patch: {
        status: 'running',
        pid: 4242,
        started_at: 1000,
        repo: '/repo',
        workflow_mode_prior: null
      }
    });

    await env.scheduler.reconcile(WS);

    expect(fs.existsSync(guardHookDir(WS, 'att-dead'))).toBe(false);
  });
});

/**
 * Install a real hook for an attempt id the scheduler did not mint — the
 * restart cases need one on disk before the scheduler ever sees the record.
 *
 * @param {string} attempt_id
 * @returns {boolean}
 */
function installGuardHookForTest(attempt_id) {
  return guardHookInstall({
    workspace: WS,
    attempt_id,
    repo: '/repo',
    target_base: 'main'
  }).ok;
}

describe('worker/scheduler post-hoc base invariant (UI-8mvc §3, UI-1xcd §4)', () => {
  const MOVED = 'b'.repeat(40);
  const LANDED = 'c'.repeat(40);
  const FOREIGN = 'e'.repeat(40);
  const BRANCH_HEAD = 'f'.repeat(40);

  /**
   * The forced base re-resolution seam, answering with a tip that is NOT the
   * `base-<bead>` oid the worktree fake pins at dispatch — i.e. a base that
   * moved while the session ran.
   *
   * @param {string} [tip]
   */
  function movedBase(tip = MOVED) {
    return vi.fn(async () => ({
      ok: /** @type {const} */ (true),
      base: 'main',
      declared: false,
      remote: 'origin',
      remote_ref: 'refs/remotes/origin/main',
      base_oid: tip,
      local_only: false
    }));
  }

  /**
   * The `git` runner the detection layer now spends on ONE question —
   * "is this recorded push reachable from the observed tip?" — plus the
   * `rev-parse` `launchSession` reads the attempt's starting branch tip with.
   *
   * @param {{ reachable?: string[], ancestor_code?: number, head?: string|null }} [posture]
   */
  function gitFor(posture = {}) {
    const reachable = posture.reachable ?? [];
    const head = posture.head === undefined ? BRANCH_HEAD : posture.head;
    return vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'rev-parse') {
        return head === null
          ? { code: 128, stdout: '', stderr: 'unknown revision' }
          : { code: 0, stdout: `${head}\n`, stderr: '' };
      }
      if (args[0] === 'merge-base') {
        if (posture.ancestor_code !== undefined) {
          return { code: posture.ancestor_code, stdout: '', stderr: 'boom' };
        }
        return {
          code: reachable.includes(args[2]) ? 0 : 1,
          stdout: '',
          stderr: ''
        };
      }
      throw new Error(`unexpected git command: ${args.join(' ')}`);
    });
  }

  /**
   * A `guardHook` override whose push record is driven per attempt id. Every
   * unnamed attempt gets an INITIALIZED-but-empty log, which is what a
   * post-deployment attempt that pushed nothing actually has.
   *
   * @param {Record<string, Record<string, unknown>[]|null>} [by_attempt] - null
   * marks an attempt whose log is ABSENT (dispatched before the record existed).
   */
  function guardHookWith(by_attempt = {}) {
    return {
      install: () => ({ ok: true, dir: '/dir', hook_path: '/dir/pre-push' }),
      envFor: () => ({}),
      remove: () => true,
      readPushLog: vi.fn(
        (/** @type {{ attempt_id: string }} */ { attempt_id }) => {
          const entries = by_attempt[attempt_id];
          return entries === null
            ? { ok: /** @type {const} */ (false), reason: 'absent' }
            : { ok: /** @type {const} */ (true), entries: entries ?? [] };
        }
      )
    };
  }

  /**
   * One base-destined push line as the hook records it.
   *
   * @param {string} local_oid
   */
  function pushedToBase(local_oid) {
    return {
      local_ref: 'HEAD',
      local_oid,
      remote_ref: 'refs/heads/main',
      remote_oid: 'base-S1'
    };
  }

  test('fails the attempt when its recorded base push is on the moved base', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      resolveBase: movedBase(),
      gitRun: gitFor({ reachable: [LANDED] }),
      guardHook: guardHookWith({ 'S1-1000-1': [pushedToBase(LANDED)] })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    const q = env.store.snapshot(WS);
    const attempt = q.attempts['S1-1000-1'];
    expect(attempt.status).toBe('failed');
    expect(attempt.cause).toBe('base_landing_detected');
    expect(attempt.cause_detail).toEqual({
      reason: 'base_landing_detected',
      command: null
    });
    expect(attempt.base_drift).toEqual({
      pinned: 'base-S1',
      observed: MOVED,
      landed: true,
      via: 'direct_push',
      pushed: [LANDED],
      shas: [LANDED]
    });
    // The queue stops and the PR verdict is never reached: a landing is not
    // laundered into a success by an open PR.
    expect(q.auto_advance).toBe(false);
    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();
  });

  // Regression 1 (2026-08-03, ×2 pairs) and regression 4 (the mixed state):
  // the base moved, the attempt pushed nothing at it, and the old inference
  // called that a landing.
  test('completes normally when the attempt pushed nothing at the base', async () => {
    const gitRun = gitFor({ reachable: [FOREIGN] });
    const env = setup({
      config: { S1: {} },
      slots: 1,
      resolveBase: movedBase(),
      gitRun,
      guardHook: guardHookWith({
        'S1-1000-1': [
          {
            local_ref: 'HEAD',
            local_oid: LANDED,
            remote_ref: 'refs/heads/S1',
            remote_oid: '0'.repeat(40)
          }
        ]
      })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    const q = env.store.snapshot(WS);
    expect(q.attempts['S1-1000-1'].base_drift).toEqual({
      pinned: 'base-S1',
      observed: MOVED,
      landed: false,
      pushed: []
    });
    expect(q.attempts['S1-1000-1'].status).toBe('done');
    expect(q.pr_wait.map((e) => e.bead_id)).toEqual(['S1']);
  });

  // The migration boundary: an attempt dispatched before the hook wrote a log
  // is UNOBSERVABLE, and must not quietly read as innocent.
  test('records push_log_absent for a pre-deployment attempt', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      resolveBase: movedBase(),
      gitRun: gitFor(),
      guardHook: guardHookWith({ 'S1-1000-1': null })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    const q = env.store.snapshot(WS);
    expect(q.attempts['S1-1000-1'].base_drift).toEqual({
      pinned: 'base-S1',
      observed: MOVED,
      error: 'push_log_absent'
    });
    // Unobservable is not guilty: the attempt still finishes.
    expect(q.attempts['S1-1000-1'].status).toBe('done');
  });

  test('observes the base of a session that ended in failure', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      resolveBase: movedBase(),
      gitRun: gitFor({ reachable: [LANDED] }),
      guardHook: guardHookWith({ 'S1-1000-1': [pushedToBase(LANDED)] })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    // A SIGTERMed session may have pushed before it died: the landing is the
    // honest cause, not the runner's own exit reason.
    env.runner.finish('S1', { success: false, reason: 'exit_1' });
    await flush();
    await flush();

    expect(env.store.snapshot(WS).attempts['S1-1000-1'].cause).toBe(
      'base_landing_detected'
    );
  });

  test('observes the base after a user stop and fails the attempt on a landing', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      resolveBase: movedBase(),
      gitRun: gitFor({ reachable: [LANDED] }),
      guardHook: guardHookWith({ 'S1-1000-1': [pushedToBase(LANDED)] })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    await env.scheduler.stop(WS, 'S1-1000-1');
    env.runner.finish('S1', { success: false, reason: 'killed' });
    await flush();
    await flush();

    const q = env.store.snapshot(WS);
    expect(q.attempts['S1-1000-1'].base_drift).toEqual({
      pinned: 'base-S1',
      observed: MOVED,
      landed: true,
      via: 'direct_push',
      pushed: [LANDED],
      shas: [LANDED]
    });
    expect(q.attempts['S1-1000-1'].cause).toBe('base_landing_detected');
    expect(q.auto_advance).toBe(false);
  });

  test('leaves a stopped attempt stopped when the base did not move', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      resolveBase: movedBase('base-S1'),
      gitRun: gitFor(),
      guardHook: guardHookWith()
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    await env.scheduler.stop(WS, 'S1-1000-1');
    env.runner.finish('S1', { success: false, reason: 'killed' });
    await flush();
    await flush();

    const q = env.store.snapshot(WS);
    expect(q.attempts['S1-1000-1'].status).toBe('stopped');
    expect(q.attempts['S1-1000-1'].base_drift).toBeNull();
  });

  test('observes the base of a restart-restored paused attempt discarded by ■', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      resolveBase: movedBase(),
      gitRun: gitFor({ reachable: [LANDED] }),
      guardHook: guardHookWith({ 'att-paused': [pushedToBase(LANDED)] })
    });
    // A `paused` record whose server restarted: it is not `running`, so
    // reconcile never disposes of it, and its `onSessionDone` died with the
    // previous process — this discard is its only observer.
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'att-paused', bead_id: 'UI-7' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'att-paused',
      patch: {
        status: 'paused',
        pid: null,
        repo: '/repo',
        base_oid: 'base-S1',
        workflow_mode_prior: null
      }
    });

    const discarded = await env.scheduler.stop(WS, 'att-paused');

    expect(discarded).toBe(true);
    const attempt = env.store.snapshot(WS).attempts['att-paused'];
    expect(attempt.cause).toBe('base_landing_detected');
    expect(attempt.base_drift).toEqual({
      pinned: 'base-S1',
      observed: MOVED,
      landed: true,
      via: 'direct_push',
      pushed: [LANDED],
      shas: [LANDED]
    });
    expect(env.store.snapshot(WS).auto_advance).toBe(false);
  });

  // The ⏸ of a LIVE session parks its `done` promise, and that promise's
  // `onSessionDone` is the observer. Removing the hook at discard time deleted
  // the record before it ran (implementation review 2026-08-04).
  test('leaves the hook alone when a parked `done` still owes the settlement', async () => {
    /** @type {string[]} */
    const removed = [];
    const base = guardHookWith();
    const env = setup({
      config: { S1: {} },
      slots: 1,
      resolveBase: movedBase('base-S1'),
      gitRun: gitFor(),
      guardHook: {
        ...base,
        remove: (/** @type {any} */ i) => {
          removed.push(i.attempt_id);
          return true;
        }
      }
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);
    await env.scheduler.pause(WS, 'S1-1000-1');

    await env.scheduler.stop(WS, 'S1-1000-1');

    // Nothing removed yet: the parked `done` settles first and removes it in
    // its own `finally`.
    expect(removed).not.toContain('S1-1000-1');
    env.runner.finish('S1', { success: false, reason: 'killed' });
    await flush();
    await flush();
    expect(removed).toContain('S1-1000-1');
  });

  test('discards a restart-restored paused attempt normally when nothing landed', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      resolveBase: movedBase('base-S1'),
      gitRun: gitFor(),
      guardHook: guardHookWith()
    });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'att-paused', bead_id: 'UI-7' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'att-paused',
      patch: {
        status: 'paused',
        pid: null,
        repo: '/repo',
        base_oid: 'base-S1',
        workflow_mode_prior: null
      }
    });

    await env.scheduler.stop(WS, 'att-paused');

    const attempt = env.store.snapshot(WS).attempts['att-paused'];
    expect(attempt.status).toBe('stopped');
    expect(attempt.base_drift).toBeNull();
  });

  test('observes the base of a restart-surviving attempt disposed by reconcile', async () => {
    const guardHook = guardHookWith({ 'att-dead': [pushedToBase(LANDED)] });
    const env = setup({
      config: { S1: {} },
      slots: 1,
      probePid: () => ({ alive: false, started_at: null }),
      resolveBase: movedBase(),
      gitRun: gitFor({ reachable: [LANDED] }),
      guardHook
    });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'att-dead', bead_id: 'UI-9' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'att-dead',
      patch: {
        status: 'running',
        pid: 4242,
        started_at: 1000,
        repo: '/repo',
        base_oid: 'base-S1',
        workflow_mode_prior: null
      }
    });

    await env.scheduler.reconcile(WS);

    const attempt = env.store.snapshot(WS).attempts['att-dead'];
    expect(attempt.cause).toBe('base_landing_detected');
    expect(attempt.base_drift).toEqual({
      pinned: 'base-S1',
      observed: MOVED,
      landed: true,
      via: 'direct_push',
      pushed: [LANDED],
      shas: [LANDED]
    });
    expect(env.verify.verifyPrSubmitted).not.toHaveBeenCalled();
  });

  // UI-1xcd §4: the hook assets carry the record the settlement reads, so the
  // dead-attempt disposal must not delete them before it has read them.
  test('reads the dead attempt push record BEFORE removing its hook', async () => {
    /** @type {string[]} */
    const order = [];
    const base = guardHookWith({ 'att-dead': [pushedToBase(LANDED)] });
    const guardHook = {
      ...base,
      readPushLog: (/** @type {any} */ i) => {
        order.push('read');
        return base.readPushLog(i);
      },
      remove: () => {
        order.push('remove');
        return true;
      }
    };
    const env = setup({
      config: { S1: {} },
      slots: 1,
      probePid: () => ({ alive: false, started_at: null }),
      resolveBase: movedBase(),
      gitRun: gitFor({ reachable: [LANDED] }),
      guardHook
    });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'att-dead', bead_id: 'UI-9' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'att-dead',
      patch: {
        status: 'running',
        pid: 4242,
        started_at: 1000,
        repo: '/repo',
        base_oid: 'base-S1',
        workflow_mode_prior: null
      }
    });

    await env.scheduler.reconcile(WS);

    expect(order).toEqual(['read', 'remove']);
    expect(env.store.snapshot(WS).attempts['att-dead'].cause).toBe(
      'base_landing_detected'
    );
  });

  // A restart-restored `paused` ancestor reaches no other observer: removing
  // its hook at relaunch used to delete its push record unread, so a real
  // landing simply disappeared (implementation review 2026-08-04).
  test('settles the ancestor before a resume removes its hook, and refuses on a landing', async () => {
    /** @type {string[]} */
    const order = [];
    const base = guardHookWith({ 'att-paused': [pushedToBase(LANDED)] });
    const guardHook = {
      ...base,
      readPushLog: (/** @type {any} */ i) => {
        order.push(`read:${i.attempt_id}`);
        return base.readPushLog(i);
      },
      remove: (/** @type {any} */ i) => {
        order.push(`remove:${i.attempt_id}`);
        return true;
      }
    };
    const env = setup({
      config: { 'UI-7': {} },
      slots: 1,
      resolveBase: movedBase(),
      gitRun: gitFor({ reachable: [LANDED] }),
      guardHook
    });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'att-paused', bead_id: 'UI-7' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'att-paused',
      patch: {
        status: 'paused',
        pid: null,
        repo: '/repo',
        base_oid: 'base-S1',
        session_id: 'sid-1',
        workflow_mode_prior: null
      }
    });

    const res = await env.scheduler.resume(WS, 'att-paused');

    expect(res.ok).toBe(false);
    expect(res.reason).toBe('base_landing_detected');
    expect(order[0]).toBe('read:att-paused');
    expect(env.store.snapshot(WS).attempts['att-paused'].base_drift).toEqual({
      pinned: 'base-S1',
      observed: MOVED,
      landed: true,
      via: 'direct_push',
      pushed: [LANDED],
      shas: [LANDED]
    });
  });

  test('does not re-observe an ancestor that already carries a base_drift', async () => {
    const guardHook = guardHookWith();
    const env = setup({
      config: { 'UI-7': {} },
      slots: 1,
      resolveBase: movedBase(),
      gitRun: gitFor(),
      guardHook
    });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'att-paused', bead_id: 'UI-7' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'att-paused',
      patch: {
        status: 'paused',
        pid: null,
        repo: '/repo',
        base_oid: 'base-S1',
        session_id: 'sid-1',
        workflow_mode_prior: null,
        // Already settled by its own termination path; re-observing a hook that
        // is gone would overwrite this with `push_log_absent`.
        base_drift: { pinned: 'base-S1', observed: MOVED, landed: false }
      }
    });

    await env.scheduler.resume(WS, 'att-paused');

    expect(guardHook.readPushLog).not.toHaveBeenCalledWith(
      expect.objectContaining({ attempt_id: 'att-paused' })
    );
    expect(env.store.snapshot(WS).attempts['att-paused'].base_drift).toEqual({
      pinned: 'base-S1',
      observed: MOVED,
      landed: false
    });
  });

  test('records the exclusion of an attempt dispatched without a pinned base', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      probePid: () => ({ alive: false, started_at: null }),
      resolveBase: movedBase(),
      gitRun: gitFor(),
      guardHook: guardHookWith()
    });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: { attempt_id: 'att-ext', bead_id: 'UI-9' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'att-ext',
      patch: {
        status: 'running',
        pid: 4242,
        started_at: 1000,
        repo: '/repo',
        base_oid: null,
        external_conflict: true,
        workflow_mode_prior: null
      }
    });

    await env.scheduler.reconcile(WS);

    const attempt = env.store.snapshot(WS).attempts['att-ext'];
    expect(attempt.base_drift).toEqual({ skipped: 'no_base_oid' });
    expect(attempt.cause).toBeNull();
  });

  test('records the exclusion of a disposition attempt before its own verdict', async () => {
    const guardHook = guardHookWith();
    const env = setup({
      config: {},
      slots: 1,
      resolveBase: movedBase(),
      gitRun: gitFor(),
      guardHook,
      disposition: { complete: vi.fn(async () => ({ ok: true })) }
    });
    let rev = env.store.snapshot(WS).revision;
    rev = env.store.place(WS, { expected_revision: rev, bead_id: 'B1' }).queue
      .revision;
    env.store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'p1', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'p1',
      patch: {
        status: 'failed',
        cause: 'verify_failed:pr_missing',
        spec_review_stale: true,
        repo: '/repo',
        target_base: 'main',
        base_oid: 'base-B1',
        runner: 'claude',
        session_id: 'sid-park',
        workflow_mode_prior: null
      }
    });

    const res = await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });
    env.runner.finish('B1', { success: true });
    await flush();
    await flush();

    const child =
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)];
    expect(child.base_drift).toEqual({ skipped: 'disposition' });
    // The disposition CHILD is excluded before anything is consulted; the
    // ancestor `p1` is settled on its way out, which is a different attempt.
    expect(guardHook.readPushLog).not.toHaveBeenCalledWith(
      expect.objectContaining({ attempt_id: res.attempt_id })
    );
  });

  test('records an unanswerable reachability query without failing the attempt', async () => {
    const env = setup({
      config: { S1: {} },
      slots: 1,
      resolveBase: movedBase(),
      gitRun: gitFor({ ancestor_code: 128 }),
      guardHook: guardHookWith({ 'S1-1000-1': [pushedToBase(LANDED)] })
    });
    seedQueue(env.store, ['S1']);
    await env.scheduler.tick(WS);

    env.runner.finish('S1', { success: true });
    await flush();
    await flush();

    const q = env.store.snapshot(WS);
    expect(q.attempts['S1-1000-1'].base_drift).toEqual({
      pinned: 'base-S1',
      observed: MOVED,
      pushed: [LANDED],
      error: 'reachability:merge_base'
    });
    // Observation failure is evidence, not a verdict: the attempt finishes.
    expect(q.attempts['S1-1000-1'].status).toBe('done');
    expect(q.pr_wait.map((e) => e.bead_id)).toEqual(['S1']);
  });
});

describe('scheduler captures the attempt starting point (UI-1xcd §4.2)', () => {
  const BRANCH_HEAD = 'f'.repeat(40);

  test('reads the branch tip BEFORE the spawn, not the base_oid copy', async () => {
    // The order is the seam: read after the spawn and the child may already
    // have committed, so whatever is measured is a race.
    /** @type {string[]} */
    const order = [];
    const gitRun = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'rev-parse') {
        order.push(`rev-parse:${args[1]}`);
        return { code: 0, stdout: `${BRANCH_HEAD}\n`, stderr: '' };
      }
      return { code: 1, stdout: '', stderr: '' };
    });
    const runner = makeFakeRunner();
    const env = setup({
      config: { S1: {} },
      slots: 1,
      gitRun,
      makeRunner: () => ({
        spawn: (
          /** @type {any} */ bead,
          /** @type {string} */ cwd,
          /** @type {any} */ settings
        ) => {
          order.push('spawn');
          return runner.factory('claude').spawn(bead, cwd, settings);
        }
      })
    });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const attempt = env.store.snapshot(WS).attempts['S1-1000-1'];
    expect(attempt.head_oid).toBe(BRANCH_HEAD);
    expect(attempt.head_oid).not.toBe(attempt.base_oid);
    expect(order).toEqual(['rev-parse:refs/heads/S1', 'spawn']);
  });

  test('leaves the field absent rather than falling back to base_oid', async () => {
    const gitRun = vi.fn(async () => ({
      code: 128,
      stdout: '',
      stderr: 'unknown revision'
    }));
    const env = setup({ config: { S1: {} }, slots: 1, gitRun });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const attempt = env.store.snapshot(WS).attempts['S1-1000-1'];
    expect(attempt.head_oid).toBe(null);
    expect(attempt.base_oid).toBe('base-S1');
  });

  test('leaves the field absent when no git runner is wired at all', async () => {
    const env = setup({ config: { S1: {} }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).attempts['S1-1000-1'].head_oid).toBe(null);
  });
});

describe('scheduler records surviving guard warnings (UI-1xcd §1)', () => {
  test('appends a warning event to the attempt record', async () => {
    const env = setup({ config: { A1: {} } });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);

    env.runner.eventsFor('A1').emit('event', {
      kind: 'error',
      reason: 'base_merge_blocked',
      guard_warning: {
        reason: 'base_merge_blocked',
        command: 'git merge origin/main --no-edit'
      }
    });

    const attempt = Object.values(env.store.snapshot(WS).attempts)[0];
    const warnings = attempt.guard_warnings || [];
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toMatchObject({
      reason: 'base_merge_blocked',
      command: 'git merge origin/main --no-edit'
    });
    expect(typeof warnings[0].at).toBe('number');
  });

  test('accumulates repeat warnings in order', async () => {
    const env = setup({ config: { A1: {} } });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);
    const events = env.runner.eventsFor('A1');

    events.emit('event', {
      kind: 'error',
      guard_warning: { reason: 'base_merge_blocked', command: 'git merge a' }
    });
    events.emit('event', {
      kind: 'error',
      guard_warning: { reason: 'merge_to_base_blocked', command: 'git push b' }
    });

    const attempt = Object.values(env.store.snapshot(WS).attempts)[0];
    expect((attempt.guard_warnings || []).map((w) => w.command)).toEqual([
      'git merge a',
      'git push b'
    ]);
  });

  test('records the warning even when no usage store is wired', async () => {
    const env = setup({ config: { A1: {} }, usage: null });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);

    env.runner.eventsFor('A1').emit('event', {
      kind: 'error',
      guard_warning: { reason: 'base_merge_blocked', command: 'git merge a' }
    });

    const attempt = Object.values(env.store.snapshot(WS).attempts)[0];
    expect(attempt.guard_warnings).toHaveLength(1);
  });

  test('leaves guard_warnings null on an attempt that drew none', async () => {
    const env = setup({ config: { A1: {} } });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);

    env.runner.eventsFor('A1').emit('event', { kind: 'text' });

    const attempt = Object.values(env.store.snapshot(WS).attempts)[0];
    expect(attempt.guard_warnings).toBe(null);
  });

  test('the warning survives a cold reload of the store', async () => {
    const env = setup({ config: { A1: {} } });
    seedQueue(env.store, ['A1']);
    await env.scheduler.tick(WS);
    env.runner.eventsFor('A1').emit('event', {
      kind: 'error',
      guard_warning: { reason: 'base_merge_blocked', command: 'git merge a' }
    });

    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    expect(
      createQueueStore().load(WS).attempts[attempt_id].guard_warnings
    ).toHaveLength(1);
  });
});

describe('scheduler prompt recording (UI-rxp3 §3)', () => {
  const STALE_RECEIPT_SHA = 'a'.repeat(40);
  const STALE_DELTA_SHA = 'b'.repeat(40);

  /**
   * A runner that spawns the REAL claude engine over a capturing fake spawn.
   * The point is that nothing here rebuilds a prompt: the argv the assertions
   * read and the record the scheduler writes both come from one `buildArgv`.
   *
   * `stdout` is a stream that never ends, so no `close` fires, `done` stays
   * pending and the attempt record is read exactly as the spawn left it.
   */
  function makeRecordingClaudeRunner() {
    /** @type {Array<{ args: string[] }>} */
    const calls = [];
    const spawn_impl = (
      /** @type {string} */ _command,
      /** @type {string[]} */ args
    ) => {
      calls.push({ args });
      const child = new EventEmitter();
      /** @type {any} */ (child).pid = 7777;
      /** @type {any} */ (child).kill = () => {};
      /** @type {any} */ (child).stdout = new PassThrough();
      return /** @type {any} */ (child);
    };
    const factory = () => ({
      name: 'claude',
      spawn: (
        /** @type {any} */ bead,
        /** @type {string} */ ws,
        /** @type {any} */ settings
      ) => runSession(claudeSpec(), bead, ws, settings, { spawn_impl })
    });
    return { factory, calls };
  }

  /**
   * @param {string[]} args
   * @returns {{ system_prompt: string, task_prompt: string }}
   */
  function sentPrompts(args) {
    const i = args.indexOf('--append-system-prompt');
    return {
      system_prompt: i >= 0 ? args[i + 1] : '',
      task_prompt: /** @type {string} */ (args.at(-1))
    };
  }

  /**
   * The newest attempt of a bead — the one the launch under test just minted.
   *
   * @param {any} store
   * @param {string} bead_id
   * @returns {any}
   */
  function latestAttempt(store, bead_id) {
    const attempts = Object.values(store.snapshot(WS).attempts).filter(
      (/** @type {any} */ a) => a.bead_id === bead_id
    );
    return attempts[attempts.length - 1];
  }

  /**
   * @param {any} store
   * @param {string} attempt_id
   * @param {Partial<import('./queue-store.js').Attempt>} patch
   */
  function seedAttempt(store, attempt_id, patch) {
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id, bead_id: /** @type {any} */ (patch).bead_id }
    });
    store.updateAttempt(WS, { attempt_id, patch });
  }

  /**
   * @param {Partial<import('./queue-store.js').Attempt>} [over]
   * @returns {Partial<import('./queue-store.js').Attempt>}
   */
  function priorAttempt(over = {}) {
    return {
      bead_id: 'B1',
      status: 'failed',
      repo: '/repo',
      target_base: 'main',
      base_oid: 'base-B1',
      runner: 'claude',
      model: 'opus',
      effort: 'high',
      session_id: 'sid-abc',
      workflow_mode_prior: null,
      ...over
    };
  }

  test('records the first dispatch prompts exactly as spawned', async () => {
    const recorder = makeRecordingClaudeRunner();
    const env = setup({
      config: { B1: {} },
      slots: 1,
      makeRunner: recorder.factory
    });
    seedQueue(env.store, ['B1']);

    await env.scheduler.tick(WS);

    const sent = sentPrompts(recorder.calls[0].args);
    const attempt = latestAttempt(env.store, 'B1');
    expect(attempt.system_prompt).toBe(sent.system_prompt);
    expect(attempt.task_prompt).toBe(sent.task_prompt);
    expect(attempt.system_prompt).toContain('## 가드 계약');
  });

  test('records the stale-dispatch task prompt, not the default one', async () => {
    const recorder = makeRecordingClaudeRunner();
    const env = setup({
      config: { B1: { spec_review: `codex@${STALE_RECEIPT_SHA}` } },
      slots: 1,
      makeRunner: recorder.factory,
      admission: {
        validate: vi.fn(async () => ({
          ok: true,
          stale: {
            receipt_sha: STALE_RECEIPT_SHA,
            delta_shas: [STALE_DELTA_SHA]
          }
        }))
      }
    });
    seedQueue(env.store, ['B1']);

    await env.scheduler.tick(WS);

    const sent = sentPrompts(recorder.calls[0].args);
    const attempt = latestAttempt(env.store, 'B1');
    expect(attempt.task_prompt).toBe(sent.task_prompt);
    expect(attempt.task_prompt).toContain('stale spec_review 관측');
    expect(attempt.system_prompt).toBe(sent.system_prompt);
  });

  test('records the resume prompts on the child attempt', async () => {
    const recorder = makeRecordingClaudeRunner();
    const env = setup({
      config: {},
      slots: 1,
      makeRunner: recorder.factory
    });
    seedAttempt(env.store, 'r1', priorAttempt());

    const res = await env.scheduler.resume(WS, 'r1');

    expect(res.ok).toBe(true);
    const sent = sentPrompts(recorder.calls[0].args);
    const attempt =
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)];
    expect(attempt.task_prompt).toBe(sent.task_prompt);
    expect(attempt.task_prompt).toContain('이전 무인 세션');
    expect(attempt.system_prompt).toBe(sent.system_prompt);
  });

  test('records the conflict-resolution prompts', async () => {
    const recorder = makeRecordingClaudeRunner();
    const env = setup({
      config: {},
      slots: 1,
      makeRunner: recorder.factory
    });
    seedAttempt(
      env.store,
      'd1',
      priorAttempt({ status: 'done', session_id: 'sid-orig', finished_at: 50 })
    );

    const res = await env.scheduler.resolveConflict(WS, 'B1');

    expect(res.ok).toBe(true);
    const sent = sentPrompts(recorder.calls[0].args);
    const attempt =
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)];
    expect(attempt.task_prompt).toBe(sent.task_prompt);
    expect(attempt.task_prompt).toContain('git merge origin/main');
    expect(attempt.system_prompt).toBe(sent.system_prompt);
  });

  test('prerecords the resolver and merge wait before launch', async () => {
    const recorder = makeRecordingClaudeRunner();
    const env = setup({
      config: { B1: {} },
      slots: 1,
      makeRunner: recorder.factory
    });
    seedPrWait(env.store, 'B1');
    env.store.updateAttempt(WS, {
      attempt_id: 'att-B1',
      patch: {
        repo: '/repo',
        target_base: 'main',
        session_id: 'sid-orig',
        finished_at: 50
      }
    });
    env.store.enqueueMerge(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      entries: [{ bead_id: 'B1' }]
    });

    const res = await env.scheduler.resolveConflict(WS, 'B1', {
      queue_bead_id: 'B1',
      wait_ms: 100
    });

    expect(res.ok).toBe(true);
    const q = env.store.snapshot(WS);
    expect(q.merge_queue[0].resolution).toEqual({
      attempt_id: res.attempt_id,
      subject_bead_id: 'B1',
      deadline_at: 1100,
      state: 'waiting',
      yielded_at: null,
      settled_at: null
    });
    expect(q.attempts[/** @type {string} */ (res.attempt_id)]).toMatchObject({
      bead_id: 'B1',
      status: 'running',
      conflict_resolution: true,
      started_at: 1000
    });
  });

  test('fans out the terminal resolver transition for wait reconciliation', async () => {
    const notifyQueueChanged = vi.fn();
    const env = setup({
      config: { B1: {} },
      slots: 1,
      notifyQueueChanged
    });
    seedPrWait(env.store, 'B1');
    env.store.updateAttempt(WS, {
      attempt_id: 'att-B1',
      patch: {
        repo: '/repo',
        target_base: 'main',
        session_id: 'sid-orig',
        finished_at: 50
      }
    });
    env.store.enqueueMerge(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      entries: [{ bead_id: 'B1' }]
    });
    const res = await env.scheduler.resolveConflict(WS, 'B1', {
      queue_bead_id: 'B1',
      wait_ms: 100
    });
    notifyQueueChanged.mockClear();

    env.runner.finish('B1', { success: true });
    await flush();
    await flush();

    const q = env.store.snapshot(WS);
    expect(q.attempts[/** @type {string} */ (res.attempt_id)].status).toBe(
      'done'
    );
    expect(q.merge_queue[0].resolution).toMatchObject({
      attempt_id: res.attempt_id
    });
    expect(notifyQueueChanged).toHaveBeenCalledWith(WS);
  });

  test('records the disposition prompts and its own guard variant', async () => {
    const recorder = makeRecordingClaudeRunner();
    const env = setup({
      config: {},
      slots: 1,
      makeRunner: recorder.factory
    });
    seedAttempt(
      env.store,
      'p1',
      priorAttempt({ status: 'done', session_id: 'sid-park', finished_at: 50 })
    );

    const res = await env.scheduler.dispatchReviseFix(WS, {
      bead_id: 'B1',
      attempt_id: 'p1',
      prompt: '처분 프롬프트'
    });

    expect(res.ok).toBe(true);
    const sent = sentPrompts(recorder.calls[0].args);
    const attempt =
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)];
    expect(attempt.task_prompt).toBe(sent.task_prompt);
    expect(attempt.task_prompt).toBe('처분 프롬프트');
    expect(attempt.system_prompt).toBe(sent.system_prompt);
    // The disposition variant: no PR-submit directive, no base-push refusal.
    expect(attempt.system_prompt).not.toContain('PR 제출까지 수행하고');
    expect(attempt.system_prompt).toContain('REVISE 처분 세션');
  });

  test('leaves the fields null for a runner that exposes no prompts', async () => {
    const env = setup({ config: { B1: {} }, slots: 1 });
    seedQueue(env.store, ['B1']);

    await env.scheduler.tick(WS);

    const attempt = latestAttempt(env.store, 'B1');
    expect(attempt.system_prompt).toBeNull();
    expect(attempt.task_prompt).toBeNull();
  });
});

describe('scheduler runner resolution (worker-multi-provider-runner §C-2)', () => {
  /**
   * The external-conflict environment: the bead is an external row, blocked and
   * not ready, so only the click path can dispatch it.
   *
   * @param {Record<string, any>} bead
   */
  function extRunnerEnv(bead) {
    return setup({
      config: { X1: { repo: '/repo', ready: false, blocked: true, ...bead } },
      slots: 1,
      externalPrs: {
        X1: { bead_id: 'X1', pr_url: 'https://github.com/o/r/pull/9' }
      }
    });
  }

  /**
   * Persist one settled attempt of X1 the way a prior session left it.
   *
   * @param {any} store
   * @param {string} attempt_id
   * @param {Partial<import('./queue-store.js').Attempt>} patch
   */
  function seedSettledAttempt(store, attempt_id, patch) {
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id, bead_id: 'X1' }
    });
    store.updateAttempt(WS, {
      attempt_id,
      patch: { status: 'done', repo: '/repo', target_base: 'main', ...patch }
    });
  }

  test('dispatches a codex-model bead through the codex runner', async () => {
    const env = setup({ config: { S1: { model: 'sol' } }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    expect(env.runner.factoryNames).toEqual(['codex']);
    await flush();
  });

  test('records the resolved runner on the attempt', async () => {
    const env = setup({ config: { S1: { model: 'sol' } }, slots: 1 });
    seedQueue(env.store, ['S1']);

    await env.scheduler.tick(WS);

    const attempt = /** @type {any} */ (
      Object.values(env.store.snapshot(WS).attempts)[0]
    );
    expect(attempt.runner).toBe('codex');
    await flush();
  });

  test('uses the current runner for a source-less external conflict', async () => {
    const env = extRunnerEnv({ model: 'opus' });
    seedSettledAttempt(env.store, 'prev-1', { runner: 'codex' });

    await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(env.runner.factoryNames).toEqual(['claude']);
    await flush();
  });

  test('resolves an external conflict from exec when no attempt precedes it', async () => {
    const env = extRunnerEnv({ model: 'sol' });

    await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(env.runner.factoryNames).toEqual(['codex']);
    await flush();
  });

  test('prefers the LAST prior attempt runner over an earlier one', async () => {
    const env = extRunnerEnv({ model: 'opus' });
    seedSettledAttempt(env.store, 'prev-1', { runner: 'codex' });
    seedSettledAttempt(env.store, 'prev-2', { runner: 'claude' });

    await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(env.runner.factoryNames).toEqual(['claude']);
    await flush();
  });

  test('uses the current model and effort for a source-less external conflict', async () => {
    const env = extRunnerEnv({ model: 'opus', effort: 'low' });
    seedSettledAttempt(env.store, 'prev-1', {
      runner: 'codex',
      model: 'sol',
      effort: 'high'
    });

    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(env.runner.factoryNames).toEqual(['claude']);
    expect(env.runner.settingsFor('X1').model).toBe('opus');
    expect(env.runner.settingsFor('X1').effort).toBe('low');
    const a =
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)];
    expect(a.model).toBe('opus');
    expect(a.effort).toBe('low');
    await flush();
  });

  test('uses the current model when the source-less external record has none', async () => {
    const env = extRunnerEnv({ model: 'opus' });
    seedSettledAttempt(env.store, 'prev-1', { runner: 'codex' });

    await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    expect(env.runner.settingsFor('X1').model).toBe('opus');
    await flush();
  });

  test('uses the current workspace orchestration model when the external conflict has no source session', async () => {
    const env = extRunnerEnv({ model: null, effort: null });
    seedSettledAttempt(env.store, 'prev-1', {
      runner: 'codex',
      model: 'sol',
      effort: 'high'
    });
    env.store.setOrchestrationDefaults(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      values: { orchestration_model: 'sonnet' }
    });

    const res = await env.scheduler.dispatchExternalConflict(WS, 'X1', 'main');

    const a =
      env.store.snapshot(WS).attempts[/** @type {string} */ (res.attempt_id)];
    expect(a.exec_stamped_keys).toBe(null);
    expect(a.model).toBe('sonnet');
    await flush();
  });

  test('uses the current runner on a conflict relaunch', async () => {
    const env = setup({
      config: { B1: { model: 'sol', effort: 'xhigh' } },
      slots: 1
    });
    const rev = env.store.snapshot(WS).revision;
    env.store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'd1', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'd1',
      patch: {
        status: 'done',
        repo: '/repo',
        target_base: 'main',
        runner: 'codex',
        session_id: 'sid-orig',
        finished_at: 50
      }
    });

    const res = await env.scheduler.resolveConflict(WS, 'B1');

    expect(res.ok).toBe(true);
    expect(env.runner.factoryNames).toEqual(['codex']);
    await flush();
  });

  // A legacy attempt without a runner adopts the current resolved runner for
  // auto; only explicit prior_session is unavailable.
  test('falls back to claude when the prior attempt recorded no runner', async () => {
    const env = setup({ config: { B1: {} }, slots: 1 });
    const rev = env.store.snapshot(WS).revision;
    env.store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: { attempt_id: 'd1', bead_id: 'B1' }
    });
    env.store.updateAttempt(WS, {
      attempt_id: 'd1',
      patch: {
        status: 'done',
        repo: '/repo',
        target_base: 'main',
        session_id: 'sid-orig',
        finished_at: 50
      }
    });

    const res = await env.scheduler.resolveConflict(WS, 'B1');

    expect(res.ok).toBe(true);
    expect(env.runner.factoryNames).toEqual(['claude']);
    await flush();
  });
});

/**
 * Seed parallel + serial waiting lanes in order and arm auto_advance.
 *
 * @param {any} store
 * @param {{ parallel?: string[], s1?: string[], s2?: string[] }} lanes
 */
function seedLanes(store, lanes) {
  let rev = store.snapshot(WS).revision;
  // 직렬 레인은 기본 1개다 — 시드가 쓰는 최대 레인까지 먼저 늘리지 않으면
  // `s2` 이상으로의 place가 조용히 병렬 큐로 떨어진다.
  const max_serial = Object.entries(lanes)
    .filter(([lane, ids]) => /^s[1-5]$/.test(lane) && (ids || []).length > 0)
    .reduce((max, [lane]) => Math.max(max, Number(lane.slice(1))), 0);
  if (max_serial > 1) {
    rev = store.setSerialLaneCount(WS, {
      expected_revision: rev,
      count: max_serial
    }).queue.revision;
  }
  for (const [lane, ids] of Object.entries(lanes)) {
    for (const id of ids || []) {
      rev = store.place(WS, {
        expected_revision: rev,
        bead_id: id,
        lane: lane === 'parallel' ? undefined : lane
      }).queue.revision;
    }
  }
  store.setAutoAdvance(WS, true);
}

describe('스케줄러 직렬 레인 뮤텍스 (UI-04vo seam B)', () => {
  test('dispatches lane heads and parallel entries concurrently within slots', async () => {
    const env = setup({
      config: { P1: {}, A: {}, B: {}, C: {} },
      slots: 4
    });
    seedLanes(env.store, { parallel: ['P1'], s1: ['A', 'B'], s2: ['C'] });

    await env.scheduler.tick(WS);

    expect([...env.runner.spawnOrder].sort()).toEqual(['A', 'C', 'P1']);
  });

  test('applies the global slots cap across parallel and serial lanes', async () => {
    const env = setup({
      config: { P1: {}, A: {}, C: {} },
      slots: 2
    });
    seedLanes(env.store, { parallel: ['P1'], s1: ['A'], s2: ['C'] });

    await env.scheduler.tick(WS);

    expect(env.runner.spawnOrder.length).toBe(2);
  });

  test('keeps a running lineage occupying its lane across ticks', async () => {
    const env = setup({ config: { A: {}, B: {} }, slots: 3 });
    seedLanes(env.store, { s1: ['A', 'B'] });

    await env.scheduler.tick(WS);
    await env.scheduler.tick(WS);

    expect(env.runner.spawnOrder).toEqual(['A']);
  });

  test('keeps a failed lineage occupying its lane until discard releases it', async () => {
    const env = setup({ config: { A: {}, B: {} }, slots: 3 });
    seedLanes(env.store, { s1: ['A', 'B'] });
    await env.scheduler.tick(WS);

    env.runner.finish('A', {
      success: false,
      reason: 'abnormal_exit',
      exit: 1
    });
    await flush();
    await flush();
    env.store.setAutoAdvance(WS, true);
    await env.scheduler.tick(WS);

    // The failed lineage still holds s1, so the NEXT entry stays put. Its own
    // bead may retry — that is the same lineage continuing, not the next item.
    expect(env.runner.spawnOrder).not.toContain('B');

    // Discard the WHOLE lineage: the mid-step tick retried A, so its lane is
    // held by the newest attempt, not the one that first failed.
    for (const attempt of Object.values(env.store.snapshot(WS).attempts)) {
      if (attempt.bead_id === 'A') {
        env.store.discardAttempt(WS, {
          attempt_id: attempt.attempt_id,
          bead_id: 'A',
          patch: { status: 'discarded' }
        });
      }
    }
    env.store.setAutoAdvance(WS, true);
    await env.scheduler.tick(WS);

    expect(env.runner.spawnOrder).toContain('B');
  });

  test('keeps a dismissed failed lineage occupying its lane', async () => {
    const env = setup({ config: { A: {}, B: {} }, slots: 3 });
    seedLanes(env.store, { s1: ['A', 'B'] });
    await env.scheduler.tick(WS);
    const attempt_id = Object.keys(env.store.snapshot(WS).attempts)[0];

    env.runner.finish('A', {
      success: false,
      reason: 'abnormal_exit',
      exit: 1
    });
    await flush();
    await flush();
    env.store.dismissAttempt(WS, {
      attempt_id,
      expected_revision: env.store.snapshot(WS).revision
    });
    env.store.setAutoAdvance(WS, true);
    await env.scheduler.tick(WS);

    // `dismissed_at` hides the failure banner; it never releases the lane.
    expect(env.runner.spawnOrder).not.toContain('B');
  });

  test('keeps a pr_wait lineage occupying its lane until moveToDone releases it', async () => {
    const env = setup({ config: { A: {}, B: {} }, slots: 3 });
    seedLanes(env.store, { s1: ['A', 'B'] });
    await env.scheduler.tick(WS);

    env.runner.finish('A', { success: true });
    await flush();
    await flush();
    await env.scheduler.tick(WS);

    expect(env.store.snapshot(WS).pr_wait.map((e) => e.bead_id)).toEqual(['A']);
    expect(env.runner.spawnOrder).toEqual(['A']);

    env.store.moveToDone(WS, { bead_id: 'A' });
    await env.scheduler.tick(WS);

    expect(env.runner.spawnOrder).toEqual(['A', 'B']);
  });

  test('rebuilds lane occupancy from durable attempts after a restart', async () => {
    const store = createQueueStore();
    const env = setup({
      config: { B: {}, P1: {} },
      store,
      slots: 3,
      probePid: () => ({ alive: true, started_at: 1_000 })
    });
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'prior-A',
        bead_id: 'A',
        status: 'running',
        serial_lane_id: 's1',
        pid: 4242,
        process_identity: { pid: 4242, pgid: 4242, started_at: 1_000 },
        started_at: 1_000
      }
    });
    seedLanes(env.store, { parallel: ['P1'], s1: ['B'] });

    await env.scheduler.tick(WS);

    expect(env.runner.spawnOrder).toEqual(['P1']);
  });

  test('records serial_lane_id at dispatch and stops writing worker_serial', async () => {
    const env = setup({
      config: { A: { labels: ['worker-serial'] }, P1: {} },
      slots: 3
    });
    seedLanes(env.store, { parallel: ['P1'], s1: ['A'] });

    await env.scheduler.tick(WS);

    const attempts = Object.values(env.store.snapshot(WS).attempts);
    const lane_attempt = attempts.find((a) => a.bead_id === 'A');
    const parallel_attempt = attempts.find((a) => a.bead_id === 'P1');
    expect(lane_attempt?.serial_lane_id).toBe('s1');
    expect(lane_attempt?.worker_serial).toBe(false);
    expect(parallel_attempt?.serial_lane_id).toBeNull();
  });

  test('worker-serial label no longer gates parallel dispatch', async () => {
    const env = setup({
      config: { S1: { labels: ['worker-serial'] }, P2: {} },
      slots: 2
    });
    seedLanes(env.store, { parallel: ['S1', 'P2'] });

    await env.scheduler.tick(WS);

    expect([...env.runner.spawnOrder].sort()).toEqual(['P2', 'S1']);
  });

  test('resume inherits the serial_lane_id of the prior attempt', async () => {
    const env = setup({ config: { A: {} }, slots: 1 });
    env.store.appendAttempt(WS, {
      expected_revision: env.store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'lane-parent',
        bead_id: 'A',
        status: 'failed',
        repo: '/repo',
        target_base: 'main',
        runner: 'claude',
        session_id: 'session-lane',
        serial_lane_id: 's2'
      }
    });

    const result = await env.scheduler.resume(WS, 'lane-parent');

    expect(result.ok).toBe(true);
    expect(
      env.store.snapshot(WS).attempts[String(result.attempt_id)].serial_lane_id
    ).toBe('s2');
  });
});

describe('스케줄러 blocked 직렬 head 레인 대기 (UI-04vo seam D)', () => {
  test('waits on a blocked serial head with a visible reason while other lanes progress', async () => {
    const env = setup({
      config: {
        A: { ready: false, blocked: true, status: 'open' },
        B: {},
        C: {}
      },
      slots: 3
    });
    seedLanes(env.store, { s1: ['A', 'B'], s2: ['C'] });

    await env.scheduler.tick(WS);

    expect(env.runner.spawnOrder).toEqual(['C']);
    expect(env.store.snapshot(WS).admission['A']?.reason).toBe(
      'not_ready:open'
    );
  });

  test('dispatches the serial head after it turns ready', async () => {
    const config = {
      A: { ready: false, blocked: true, status: 'open' }
    };
    const env = setup({ config, slots: 2 });
    seedLanes(env.store, { s1: ['A'] });

    await env.scheduler.tick(WS);
    expect(env.runner.spawnOrder).toEqual([]);

    config.A.ready = true;
    config.A.blocked = false;
    await env.scheduler.tick(WS);

    expect(env.runner.spawnOrder).toEqual(['A']);
  });
});
