import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createQueueStore } from './queue-store.js';
import { createSessionLog } from './session-log.js';
import { createSessionMonitors } from './session-monitor.js';
import { createUsageStore } from './usage-store.js';

/** @type {string} */
let tmp_state;
/** @type {string} */
let WS;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-monitor-'));
  process.env.XDG_STATE_HOME = tmp_state;
  WS = path.join(tmp_state, 'workspace');
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
 * Persist a `running` attempt exactly as the PRIOR server process left it.
 *
 * @param {any} store
 * @param {Partial<import('./queue-store.js').Attempt>} [patch]
 */
function seedRunningAttempt(store, patch = {}) {
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
      ...patch
    }
  });
  return store.snapshot(WS).attempts['att-1'];
}

/**
 * Write raw lines the way the ORPHAN session does: straight to its log file,
 * with no server in the path.
 *
 * @param {any} session_log
 * @param {string} text
 */
function sessionWrites(session_log, text) {
  const file = session_log.pathFor(WS, 'att-1');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.appendFileSync(file, text);
}

/**
 * @param {string} text
 * @returns {string}
 */
function assistantText(text) {
  return `${JSON.stringify({
    type: 'assistant',
    message: { id: 'm1', content: [{ type: 'text', text }] }
  })}\n`;
}

/**
 * @param {string} command
 * @returns {string}
 */
function bashLine(command) {
  return `${JSON.stringify({
    type: 'assistant',
    message: {
      id: 'm2',
      content: [{ type: 'tool_use', name: 'Bash', input: { command } }]
    }
  })}\n`;
}

/**
 * Start a monitor the way startup recovery does: at the line boundary the usage
 * replay consumed up to.
 *
 * @param {any} env
 * @param {any} attempt
 */
function startAtBoundary(env, attempt) {
  return env.monitors.start(WS, attempt, {
    start_offset: env.session_log.lineBoundaryOf(WS, 'att-1') ?? 0
  });
}

/**
 * @param {{ probe?: { alive: boolean, started_at: number|null }, usage?: boolean }} [options]
 */
function setup(options = {}) {
  const store = createQueueStore();
  const session_log = createSessionLog();
  const usage = options.usage === false ? undefined : createUsageStore();
  const kill_impl = vi.fn();
  const notifyChanged = vi.fn();
  const probe = options.probe || { alive: true, started_at: 1000 };
  const monitors = createSessionMonitors({
    store,
    sessionLog: session_log,
    usage,
    probePid: () => probe,
    kill_impl,
    notifyChanged,
    now: () => 5000,
    poll_ms: 5
  });
  return { store, session_log, usage, kill_impl, notifyChanged, monitors };
}

describe('worker/session-monitor (UI-o2yt §3.3)', () => {
  test('resumes the drawer live follow of an orphan session', () => {
    const env = setup();
    const attempt = seedRunningAttempt(env.store);
    sessionWrites(env.session_log, assistantText('before the restart'));
    /** @type {any[]} */
    const pushed = [];
    env.session_log.subscribe((a) => pushed.push(a));

    startAtBoundary(env, attempt);
    sessionWrites(env.session_log, assistantText('after the restart'));
    env.monitors.stop(WS, 'att-1');

    // Only what arrived AFTER the reattach: the drawer restores the past from
    // its own snapshot read, so replaying it here would duplicate every line.
    expect(pushed).toHaveLength(1);
    expect(pushed[0].attempt_id).toBe('att-1');
    expect(pushed[0].event.message.content[0].text).toBe('after the restart');
  });

  test('keeps tallying usage into the usage store', () => {
    const env = setup();
    const attempt = seedRunningAttempt(env.store);

    env.monitors.start(WS, attempt);
    sessionWrites(
      env.session_log,
      `${JSON.stringify({
        type: 'assistant',
        message: {
          id: 'm9',
          content: [{ type: 'text', text: 'hi' }],
          usage: { input_tokens: 7, output_tokens: 2 }
        }
      })}\n`
    );
    env.monitors.stop(WS, 'att-1');

    expect(env.usage?.get(WS, 'att-1')).toMatchObject({
      input_tokens: 7,
      output_tokens: 2
    });
  });

  test('drains the tail to EOF on stop so the last lines still count', () => {
    const env = setup();
    const attempt = seedRunningAttempt(env.store);
    env.monitors.start(WS, attempt);

    // Written after the last poll would have run — only the drain sees it.
    sessionWrites(
      env.session_log,
      `${JSON.stringify({
        type: 'result',
        subtype: 'success',
        is_error: false,
        usage: { input_tokens: 100, output_tokens: 20 },
        total_cost_usd: 0.5
      })}\n`
    );
    env.monitors.stop(WS, 'att-1');

    expect(env.usage?.get(WS, 'att-1')).toMatchObject({
      input_tokens: 100,
      output_tokens: 20
    });
  });

  test('records blocker evidence and group-kills on a merge-guard violation', () => {
    const env = setup();
    const attempt = seedRunningAttempt(env.store);

    env.monitors.start(WS, attempt);
    sessionWrites(env.session_log, bashLine('git merge origin/main'));
    env.monitors.stop(WS, 'att-1');

    const record = env.store.snapshot(WS).attempts['att-1'];
    expect(record.guard_kill).toMatchObject({
      reason: 'base_merge_blocked',
      command: 'git merge origin/main',
      at: 5000
    });
    expect(record.cause_detail).toEqual({
      reason: 'base_merge_blocked',
      command: 'git merge origin/main'
    });
    // NEGATIVE pid: the whole session process group, exactly like the engine.
    expect(env.kill_impl).toHaveBeenCalledWith(-4242, 'SIGTERM');
  });

  test('kills on an interactive question the same way', () => {
    const env = setup();
    const attempt = seedRunningAttempt(env.store);

    env.monitors.start(WS, attempt);
    sessionWrites(
      env.session_log,
      `${JSON.stringify({
        type: 'assistant',
        message: {
          id: 'm3',
          content: [{ type: 'tool_use', name: 'AskUserQuestion', input: {} }]
        }
      })}\n`
    );
    env.monitors.stop(WS, 'att-1');

    expect(env.store.snapshot(WS).attempts['att-1'].guard_kill).toBeTruthy();
    expect(env.kill_impl).toHaveBeenCalledWith(-4242, 'SIGTERM');
  });

  test('allows the base merge of a conflict-resolution attempt', () => {
    const env = setup();
    const attempt = seedRunningAttempt(env.store, {
      conflict_resolution: true
    });

    env.monitors.start(WS, attempt);
    sessionWrites(env.session_log, bashLine('git merge origin/main'));
    env.monitors.stop(WS, 'att-1');

    expect(env.store.snapshot(WS).attempts['att-1'].guard_kill).toBe(null);
    expect(env.kill_impl).not.toHaveBeenCalled();
  });

  test('writes the evidence but sends NO signal when the pid stopped being ours', () => {
    const env = setup();
    const attempt = seedRunningAttempt(env.store);
    env.monitors.start(WS, attempt);
    // The session died between the reattach and the violation; the number may
    // now belong to an unrelated process.
    env.store.updateAttempt(WS, {
      attempt_id: 'att-1',
      patch: { started_at: 999999 }
    });

    sessionWrites(env.session_log, bashLine('git merge origin/main'));
    env.monitors.stop(WS, 'att-1');

    expect(env.store.snapshot(WS).attempts['att-1'].guard_kill).toBeTruthy();
    expect(env.kill_impl).not.toHaveBeenCalled();
  });

  test('sends NO signal when the blocker evidence did not become durable', () => {
    const env = setup();
    const attempt = seedRunningAttempt(env.store);
    env.monitors.start(WS, attempt);
    const write_spy = vi
      .spyOn(env.store, 'updateAttempt')
      .mockImplementation(() => {
        throw new Error('queue write failed');
      });

    sessionWrites(env.session_log, bashLine('git merge origin/main'));
    env.monitors.stop(WS, 'att-1');
    write_spy.mockRestore();

    // Killing without the record would let the reconcile pass read an already
    // pushed PR as success — the exact laundering the evidence prevents.
    expect(env.kill_impl).not.toHaveBeenCalled();
    expect(env.store.snapshot(WS).attempts['att-1'].guard_kill).toBe(null);
  });

  test('refuses to monitor an attempt whose pid is already dead', () => {
    const env = setup({ probe: { alive: false, started_at: null } });
    const attempt = seedRunningAttempt(env.store);

    expect(env.monitors.start(WS, attempt)).toBe(false);
    expect(env.monitors.size()).toBe(0);
  });

  test('refuses to monitor a recycled pid', () => {
    const env = setup({ probe: { alive: true, started_at: 999999 } });
    const attempt = seedRunningAttempt(env.store);

    expect(env.monitors.start(WS, attempt)).toBe(false);
  });

  test('never starts a second monitor for the same attempt', () => {
    const env = setup();
    const attempt = seedRunningAttempt(env.store);

    expect(env.monitors.start(WS, attempt)).toBe(true);
    expect(env.monitors.start(WS, attempt)).toBe(false);
    expect(env.monitors.size()).toBe(1);
    env.monitors.stopAll();
  });

  test('reattaches mid-line and emits the completed line exactly once', () => {
    const env = setup();
    const attempt = seedRunningAttempt(env.store);
    const half = assistantText('half-written');
    const cut = half.length - 6;
    sessionWrites(env.session_log, half.slice(0, cut));
    /** @type {any[]} */
    const pushed = [];
    env.session_log.subscribe((a) => pushed.push(a));

    startAtBoundary(env, attempt);
    sessionWrites(env.session_log, half.slice(cut));
    env.monitors.stop(WS, 'att-1');

    expect(pushed).toHaveLength(1);
    expect(pushed[0].event.message.content[0].text).toBe('half-written');
  });

  test('stop is inert for an attempt nothing monitors', () => {
    const env = setup();

    expect(env.monitors.stop(WS, 'att-nope')).toBe(false);
  });

  test('skips malformed lines instead of failing the tail', () => {
    const env = setup();
    const attempt = seedRunningAttempt(env.store);
    /** @type {any[]} */
    const pushed = [];
    env.session_log.subscribe((a) => pushed.push(a));

    env.monitors.start(WS, attempt);
    sessionWrites(env.session_log, 'not json\n');
    sessionWrites(env.session_log, assistantText('still going'));
    env.monitors.stop(WS, 'att-1');

    expect(pushed).toHaveLength(1);
  });
});

describe('worker/session-monitor guard effect parity (guard-enforcement-layer-replacement Phase 2)', () => {
  // The attempt's own repo/base — findMergeViolation's cross-repo allowlist
  // (isExemptCrossRepoPush) requires `ctx.repo` to actually be a real,
  // resolvable path, so this mirrors session.merge-guard.test.js's REPO.
  const REPO = path.join(os.homedir(), 'Documents/GitHub/beads-ui');

  test("warns without killing on a push to the attempt repo's own declared base", () => {
    const env = setup();
    const attempt = seedRunningAttempt(env.store, {
      repo: REPO,
      target_base: 'main'
    });
    /** @type {any[]} */
    const pushed = [];
    env.session_log.subscribe((a) => pushed.push(a));

    env.monitors.start(WS, attempt);
    sessionWrites(env.session_log, bashLine('git push origin main'));
    env.monitors.stop(WS, 'att-1');

    // No kill: guardEffect('git_push_base') is 'warn', not 'kill'.
    expect(env.kill_impl).not.toHaveBeenCalled();
    expect(env.store.snapshot(WS).attempts['att-1'].guard_kill).toBe(null);
    // The raw bash line, THEN the synthesized warning — the monitor stays
    // alive and keeps re-broadcasting to the drawer.
    expect(pushed).toHaveLength(2);
    expect(pushed[1].event).toMatchObject({
      kind: 'error',
      reason: 'merge_to_base_blocked'
    });
    expect(pushed[1].event.message).toContain('git push origin main');
  });

  test('renders no verdict at all for a cross-repo publication that leaves the attempt repo', () => {
    const env = setup();
    const attempt = seedRunningAttempt(env.store, {
      repo: REPO,
      target_base: 'main'
    });
    /** @type {any[]} */
    const pushed = [];
    env.session_log.subscribe((a) => pushed.push(a));

    env.monitors.start(WS, attempt);
    sessionWrites(
      env.session_log,
      bashLine('cd ~/GitHub/thalamus && git push origin main')
    );
    env.monitors.stop(WS, 'att-1');

    expect(env.kill_impl).not.toHaveBeenCalled();
    expect(env.store.snapshot(WS).attempts['att-1'].guard_kill).toBe(null);
    // Only the raw line — no warning was synthesized (no violation at all).
    expect(pushed).toHaveLength(1);
  });

  test('does not apply the base-push judgment to a disposition session', () => {
    const env = setup();
    const attempt = seedRunningAttempt(env.store, {
      repo: REPO,
      target_base: 'main',
      disposition: 'revise_fix'
    });
    /** @type {any[]} */
    const pushed = [];
    env.session_log.subscribe((a) => pushed.push(a));

    env.monitors.start(WS, attempt);
    sessionWrites(env.session_log, bashLine('git push origin main'));
    env.monitors.stop(WS, 'att-1');

    expect(env.kill_impl).not.toHaveBeenCalled();
    expect(env.store.snapshot(WS).attempts['att-1'].guard_kill).toBe(null);
    expect(pushed).toHaveLength(1);
  });

  test('still kills on gh pr merge (kind decided by argv alone, unaffected by the warn demotion)', () => {
    const env = setup();
    const attempt = seedRunningAttempt(env.store, {
      repo: REPO,
      target_base: 'main'
    });

    env.monitors.start(WS, attempt);
    sessionWrites(env.session_log, bashLine('gh pr merge 42 --squash'));
    env.monitors.stop(WS, 'att-1');

    const record = env.store.snapshot(WS).attempts['att-1'];
    expect(record.guard_kill).toMatchObject({
      reason: 'merge_to_base_blocked',
      command: 'gh pr merge 42 --squash'
    });
    expect(env.kill_impl).toHaveBeenCalledWith(-4242, 'SIGTERM');
  });
});
