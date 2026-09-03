/**
 * Durable provider-hold probes and recovery sequencing.
 *
 * @import { ChildProcess } from 'node:child_process'
 */
import { spawn } from 'node:child_process';
import { resolveCswapPath as defaultResolveCswapPath } from '../routes/claude-usage.js';
import { adapterSpec, runtimeCatalog } from './runner/index.js';

const PROBE_TIMEOUT_MS = 120_000;
const OUTAGE_BACKOFF_MS = Object.freeze([
  60_000, 120_000, 240_000, 480_000, 900_000
]);
const USAGE_FALLBACK_MS = 900_000;
const USAGE_RESET_GRACE_MS = 60_000;
const USAGE_REARM_CAP = 3;
const HOLD_AGE_CAP_MS = 24 * 60 * 60 * 1000;

/**
 * @typedef {{ kind: 'outage'|'usage_limit', model: string, account: string|null, detail: string, last_error: string, resets_at: number|null, rearm_count: number, attempt_ids: string[] }} ProviderTarget
 */

/**
 * Compose an in-memory timer key from one durable target identity.
 *
 * @param {string} workspace
 * @param {string} runner
 * @param {number} generation
 * @param {ProviderTarget} target
 */
function targetKey(workspace, runner, generation, target) {
  return JSON.stringify([
    workspace,
    runner,
    generation,
    target.kind,
    target.model,
    target.account
  ]);
}

/**
 * Parse the probe's single JSON result without accepting trailing noise.
 *
 * @param {string} output
 * @returns {Record<string, any>|null}
 */
function parseProbeOutput(output) {
  try {
    const parsed = JSON.parse(output.trim());
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? parsed
      : null;
  } catch {
    return null;
  }
}

/**
 * Run one lightweight process with a hard timeout.
 *
 * @param {(command: string, args: string[], options: any) => any} spawn_impl
 * @param {string} command
 * @param {string[]} args
 * @param {string} cwd
 * @param {(fn: () => void, delay: number) => any} set_timeout
 * @param {(handle: any) => void} clear_timeout
 * @returns {Promise<{ code: number|null, stdout: string, stderr: string }>}
 */
function runProbeProcess(
  spawn_impl,
  command,
  args,
  cwd,
  set_timeout,
  clear_timeout
) {
  return new Promise((resolve) => {
    /** @type {any} */
    let child;
    try {
      child = spawn_impl(command, args, {
        cwd,
        env: process.env,
        shell: false,
        stdio: ['ignore', 'pipe', 'pipe'],
        windowsHide: true
      });
    } catch (err) {
      resolve({ code: null, stdout: '', stderr: String(err) });
      return;
    }
    let stdout = '';
    let stderr = '';
    let settled = false;
    const timer = set_timeout(() => {
      if (settled) {
        return;
      }
      settled = true;
      try {
        child.kill('SIGKILL');
      } catch {
        // A process that already exited needs no further action.
      }
      resolve({ code: null, stdout, stderr: `${stderr}\nprobe_timeout` });
    }, PROBE_TIMEOUT_MS);
    child.stdout?.on('data', (/** @type {unknown} */ chunk) => {
      stdout += String(chunk);
    });
    child.stderr?.on('data', (/** @type {unknown} */ chunk) => {
      stderr += String(chunk);
    });
    child.on('error', (/** @type {unknown} */ err) => {
      if (settled) {
        return;
      }
      settled = true;
      clear_timeout(timer);
      resolve({ code: null, stdout, stderr: `${stderr}\n${String(err)}` });
    });
    child.on('close', (/** @type {unknown} */ code) => {
      if (settled) {
        return;
      }
      settled = true;
      clear_timeout(timer);
      resolve({ code: typeof code === 'number' ? code : null, stdout, stderr });
    });
  });
}

/**
 * Create the workspace-independent provider health controller.
 *
 * @param {{
 *   store: any,
 *   accountCatalog: any,
 *   notify: any,
 *   timeline?: any,
 *   onPending: (workspace: string) => Promise<any>,
 *   tick: (workspace: string) => Promise<any>|any,
 *   repo?: string,
 *   spawnImpl?: (command: string, args: string[], options: any) => any,
 *   resolveCswapPath?: () => string|null,
 *   catalog?: ReturnType<typeof runtimeCatalog>,
 *   now?: () => number,
 *   setTimeoutImpl?: (fn: () => void, delay: number) => any,
 *   clearTimeoutImpl?: (handle: any) => void
 * }} deps
 */
export function createProviderHealth(deps) {
  const now = deps.now || (() => Date.now());
  const spawnImpl =
    deps.spawnImpl ||
    ((command, args, options) => spawn(command, args, options));
  const resolveCswapPath = deps.resolveCswapPath || defaultResolveCswapPath;
  const catalog = deps.catalog || runtimeCatalog();
  const setTimeoutImpl = deps.setTimeoutImpl || setTimeout;
  const clearTimeoutImpl = deps.clearTimeoutImpl || clearTimeout;
  /** @type {Map<string, { timer: any, failures: number }> } */
  const timers = new Map();
  /** @type {Set<string>} */
  const active_workspaces = new Set();

  /**
   * Resolve the probe command from the same catalog and account route as launch.
   *
   * @param {string} runner
   * @param {ProviderTarget} target
   * @returns {{ command: string, args: string[] }|null}
   */
  function probeArgv(runner, target) {
    const entry = catalog.runners[runner];
    const model = entry?.models?.[target.model];
    if (!entry || !model || typeof model.id !== 'string') {
      return null;
    }
    const args = ['-p', 'ok', '--model', model.id, '--output-format', 'json'];
    if (runner === 'claude' && target.account !== null) {
      const cswap_path = resolveCswapPath();
      if (!cswap_path) {
        return null;
      }
      return {
        command: cswap_path,
        args: [
          'run',
          target.account,
          '--share-history',
          '--',
          entry.command,
          ...args
        ]
      };
    }
    return { command: entry.command, args };
  }

  /**
   * Probe one target and classify a failed response with its runner adapter.
   *
   * @param {string} workspace
   * @param {string} runner
   * @param {ProviderTarget} target
   * @returns {Promise<{ ok: boolean, outage: { detail: string, message: string, scope: 'provider'|'account', resets_at: number|null }|null, error: string }>}
   */
  async function probeTarget(workspace, runner, target) {
    const argv = probeArgv(runner, target);
    if (!argv) {
      return { ok: false, outage: null, error: 'probe_route_unavailable' };
    }
    const result = await runProbeProcess(
      spawnImpl,
      argv.command,
      argv.args,
      workspace,
      setTimeoutImpl,
      clearTimeoutImpl
    );
    const parsed = parseProbeOutput(result.stdout);
    if (result.code === 0 && parsed && parsed.is_error === false) {
      return { ok: true, outage: null, error: '' };
    }
    const classifier = adapterSpec(runner, { catalog }).classifyProviderOutage;
    let account_row = null;
    if (runner === 'claude') {
      const account_result = target.account
        ? await deps.accountCatalog.readClaude(target.account)
        : await deps.accountCatalog.activeClaude();
      account_row = account_result.ok ? account_result.account : null;
    }
    const outage = classifier
      ? classifier({
          raw: parsed ? [parsed] : [],
          stderr_tail: result.stderr,
          finished_at: now(),
          account_row
        })
      : null;
    return {
      ok: false,
      outage,
      error: outage?.message || result.stderr || 'probe_failed'
    };
  }

  /**
   * Notify once and leave a capped target durable for manual recovery.
   *
   * @param {string} workspace
   * @param {string} runner
   * @param {number} generation
   * @param {ProviderTarget} target
   * @param {string} reason
   */
  async function disarmTarget(workspace, runner, generation, target, reason) {
    const marker = `auto_resume_disarmed:${reason}`;
    if (target.last_error === marker) {
      return;
    }
    const saved = deps.store.updateProviderTarget(workspace, {
      runner,
      generation,
      kind: target.kind,
      model: target.model,
      account: target.account,
      patch: { last_error: marker }
    });
    if (!saved.ok) {
      return;
    }
    const queue = saved.queue;
    for (const attempt_id of target.attempt_ids) {
      const attempt = queue.attempts[attempt_id];
      if (attempt) {
        void deps.notify.providerAutoResumeDisarmed({
          bead_id: attempt.bead_id,
          runner,
          reason,
          repo: deps.repo
        });
      }
    }
  }

  /**
   * Schedule a target only when its exact durable generation still exists.
   *
   * @param {string} workspace
   * @param {string} runner
   * @param {number} generation
   * @param {number} since
   * @param {ProviderTarget} target
   * @param {number} failures
   */
  function scheduleTarget(
    workspace,
    runner,
    generation,
    since,
    target,
    failures
  ) {
    if (target.kind === 'usage_limit' && target.account === null) {
      return;
    }
    const key = targetKey(workspace, runner, generation, target);
    if (timers.has(key)) {
      return;
    }
    if (
      target.kind === 'usage_limit' &&
      (target.rearm_count >= USAGE_REARM_CAP ||
        now() - since >= HOLD_AGE_CAP_MS)
    ) {
      void disarmTarget(
        workspace,
        runner,
        generation,
        target,
        target.rearm_count >= USAGE_REARM_CAP ? 'rearm_cap' : 'hold_age_cap'
      );
      return;
    }
    const delay =
      target.kind === 'usage_limit'
        ? target.resets_at === null
          ? USAGE_FALLBACK_MS
          : Math.max(0, target.resets_at + USAGE_RESET_GRACE_MS - now())
        : OUTAGE_BACKOFF_MS[Math.min(failures, OUTAGE_BACKOFF_MS.length - 1)];
    const timer = setTimeoutImpl(() => {
      timers.delete(key);
      void runTarget(workspace, runner, generation, since, target, failures);
    }, delay);
    timer?.unref?.();
    timers.set(key, { timer, failures });
  }

  /**
   * Execute one scheduled target transition and then resynchronize timers.
   *
   * @param {string} workspace
   * @param {string} runner
   * @param {number} generation
   * @param {number} since
   * @param {ProviderTarget} target
   * @param {number} failures
   */
  async function runTarget(
    workspace,
    runner,
    generation,
    since,
    target,
    failures
  ) {
    const current = deps.store.snapshot(workspace).provider_hold[runner];
    if (!current || current.generation !== generation) {
      sync(workspace);
      return;
    }
    const live_target = current.targets.find(
      (/** @type {ProviderTarget} */ candidate) =>
        candidate.kind === target.kind &&
        candidate.model === target.model &&
        candidate.account === target.account
    );
    if (!live_target) {
      sync(workspace);
      return;
    }
    const result = await probeTarget(workspace, runner, live_target);
    if (result.ok) {
      const recovered = deps.store.recoverProviderTarget(workspace, {
        runner,
        generation,
        kind: live_target.kind,
        model: live_target.model,
        account: live_target.account
      });
      if (!recovered.ok) {
        sync(workspace);
        return;
      }
      for (const attempt_id of recovered.disarmed_attempt_ids || []) {
        const attempt = recovered.queue.attempts[attempt_id];
        if (attempt) {
          void deps.notify.providerAutoResumeDisarmed({
            bead_id: attempt.bead_id,
            runner,
            reason: 'auto_resume_cap',
            repo: deps.repo
          });
        }
      }
      const outcome = await deps.onPending(workspace);
      const recovered_attempt_id = (recovered.recovered_attempt_ids || [])[0];
      const recovered_attempt = recovered_attempt_id
        ? recovered.queue.attempts[recovered_attempt_id]
        : null;
      if (recovered_attempt) {
        deps.timeline?.append({
          bead_id: recovered_attempt.bead_id,
          attempt_id: recovered_attempt.attempt_id,
          kind: 'provider_recovered',
          seq: generation,
          summary: `${runner} 공급자 회복`
        });
        void deps.notify.providerRecovered({
          bead_id: recovered_attempt.bead_id,
          runner,
          duration_ms: Math.max(0, now() - since),
          resumed_beads: outcome?.resumed_beads || [],
          refusal: outcome?.refusals?.join(', ') || null,
          repo: deps.repo
        });
      }
      await deps.tick(workspace);
      sync(workspace);
      return;
    }
    if (live_target.kind === 'usage_limit') {
      if (result.outage?.detail === 'usage_limit') {
        deps.store.updateProviderTarget(workspace, {
          runner,
          generation,
          kind: live_target.kind,
          model: live_target.model,
          account: live_target.account,
          patch: {
            resets_at: result.outage.resets_at,
            rearm_count: live_target.rearm_count + 1,
            last_error: result.error
          }
        });
      } else {
        deps.store.updateProviderTarget(workspace, {
          runner,
          generation,
          kind: live_target.kind,
          model: live_target.model,
          account: live_target.account,
          patch: { kind: 'outage' }
        });
      }
      sync(workspace);
      return;
    }
    scheduleTarget(
      workspace,
      runner,
      generation,
      since,
      live_target,
      failures + 1
    );
  }

  /**
   * Reconcile timers against the current durable hold set.
   *
   * @param {string} workspace
   */
  function sync(workspace) {
    if (!active_workspaces.has(workspace)) {
      return;
    }
    const queue = deps.store.snapshot(workspace);
    /** @type {Set<string>} */
    const wanted = new Set();
    for (const [runner, hold] of Object.entries(queue.provider_hold)) {
      for (const target of hold.targets) {
        const key = targetKey(workspace, runner, hold.generation, target);
        wanted.add(key);
        const failures = timers.get(key)?.failures || 0;
        scheduleTarget(
          workspace,
          runner,
          hold.generation,
          hold.since,
          target,
          failures
        );
      }
    }
    for (const [key, entry] of timers) {
      if (key.startsWith(`["${workspace}",`) && !wanted.has(key)) {
        clearTimeoutImpl(entry.timer);
        timers.delete(key);
      }
    }
  }

  return {
    /**
     * Restore pending recovery work before scheduling persisted holds.
     *
     * @param {string} workspace
     */
    async start(workspace) {
      active_workspaces.add(workspace);
      deps.store.discardStaleAutoResumePending(workspace);
      await deps.onPending(workspace);
      sync(workspace);
    },

    /**
     * Start or refresh one workspace after a hold mutation.
     *
     * @param {string} workspace
     */
    sync(workspace) {
      active_workspaces.add(workspace);
      sync(workspace);
    },

    /**
     * Stop every probe owned by one detached workspace.
     *
     * @param {string} workspace
     */
    stop(workspace) {
      active_workspaces.delete(workspace);
      for (const [key, entry] of timers) {
        if (key.startsWith(`["${workspace}",`)) {
          clearTimeoutImpl(entry.timer);
          timers.delete(key);
        }
      }
    },

    probeTarget
  };
}

export { OUTAGE_BACKOFF_MS };
