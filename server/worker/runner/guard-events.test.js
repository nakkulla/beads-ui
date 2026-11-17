import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createBeadTimeline } from '../bead-timeline.js';
import {
  guardInvokedMarkerPath,
  install,
  preToolHookPath
} from '../guard-hook.js';
import { createQueueStore } from '../queue-store.js';
import { judgeCodexHookLoad, monitorGuardEvents } from './guard-events.js';

const ATTEMPT = 'attempt-1';
const MESSAGE = 'Codex 세션에서 가드 훅 호출이 확인되지 않았습니다.';

/** @type {string} */
let root;

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-guard-events-'));
  vi.stubEnv('XDG_STATE_HOME', root);
  expect(
    install({
      workspace: root,
      attempt_id: ATTEMPT,
      repo: root,
      target_base: 'release/main'
    }).ok
  ).toBe(true);
});

afterEach(() => {
  vi.unstubAllEnvs();
  fs.rmSync(root, { recursive: true, force: true });
});

/**
 * A store and timeline holding one running attempt, plus the guard-events
 * consumer the live path runs beside it.
 *
 * @param {Record<string, unknown>} [patch]
 */
function setup(patch = {}) {
  const timeline = createBeadTimeline({ workspace_root: root });
  const store = createQueueStore({ timeline });
  store.appendAttempt(root, {
    expected_revision: 0,
    attempt: { attempt_id: ATTEMPT, bead_id: 'UI-1' }
  });
  store.updateAttempt(root, {
    attempt_id: ATTEMPT,
    patch: { status: 'running', runner: 'codex', started_at: 1, ...patch }
  });
  const publish = vi.fn();
  const monitor_input = {
    workspace: root,
    attempt_id: ATTEMPT,
    store,
    sessionLog: { publish }
  };
  return { timeline, store, publish, monitor_input };
}

/**
 * @param {ReturnType<typeof setup>} env
 */
function judge(env) {
  judgeCodexHookLoad({
    workspace: root,
    attempt_id: ATTEMPT,
    store: env.store,
    now: () => 4242
  });
}

/**
 * @param {ReturnType<typeof setup>} env
 */
function hookWarnings(env) {
  return env.timeline
    .readTimeline('UI-1')
    .filter(
      (event) =>
        event.kind === 'guard_warning' &&
        event.reason === 'codex_hook_not_loaded'
    );
}

/**
 * @param {ReturnType<typeof setup>} env
 */
function attemptOf(env) {
  return env.store.snapshot(root).attempts[ATTEMPT];
}

describe('judgeCodexHookLoad (UI-zoig §3.4)', () => {
  test('records one warning when a command completed without the marker', () => {
    const env = setup();
    const monitor = monitorGuardEvents(env.monitor_input);

    judge(env);
    monitor.stop();

    expect(hookWarnings(env)).toHaveLength(1);
    expect(hookWarnings(env)[0]).toMatchObject({
      summary: `가드 경고 — ${MESSAGE}`,
      runner: 'codex',
      command: null
    });
    expect(attemptOf(env).guard_warnings).toEqual([
      { reason: 'codex_hook_not_loaded', command: null, at: 4242 }
    ]);
    expect(env.publish).toHaveBeenCalledWith(root, ATTEMPT, {
      kind: 'guard_warning',
      message: `가드 경고 — ${MESSAGE}`,
      runner: 'codex',
      reason: 'codex_hook_not_loaded',
      command: null
    });
    expect(attemptOf(env).guard_hook_judged).toBe(true);
  });

  test('records nothing when the marker exists', () => {
    const env = setup();
    fs.writeFileSync(guardInvokedMarkerPath(root, ATTEMPT), '{}\n');
    const monitor = monitorGuardEvents(env.monitor_input);

    judge(env);
    monitor.stop();

    expect(hookWarnings(env)).toHaveLength(0);
    expect(attemptOf(env).guard_warnings).toBe(null);
    expect(attemptOf(env).guard_hook_judged).toBe(true);
  });

  test('records nothing when another call created the marker before this command completed', () => {
    const env = setup();
    const monitor = monitorGuardEvents(env.monitor_input);
    // The first invocation's hook ran (and created the marker) for a command
    // that is still running; a later command is the one that completed first.
    spawnSync('/bin/sh', [preToolHookPath(root, ATTEMPT), 'codex'], {
      input: JSON.stringify({
        tool_name: 'Bash',
        tool_input: { command: 'sleep 60' }
      }),
      encoding: 'utf8'
    });

    judge(env);
    monitor.stop();

    expect(hookWarnings(env)).toHaveLength(0);
    expect(attemptOf(env).guard_hook_judged).toBe(true);
  });

  test('adds no warning after a home-preparation warning and marks the attempt judged', () => {
    const env = setup({
      guard_warnings: [
        { reason: 'codex_hook_not_loaded', command: null, at: 1 }
      ]
    });
    const monitor = monitorGuardEvents(env.monitor_input);

    judge(env);
    monitor.stop();

    expect(hookWarnings(env)).toHaveLength(0);
    expect(attemptOf(env).guard_warnings).toHaveLength(1);
    expect(attemptOf(env).guard_hook_judged).toBe(true);
  });

  test('skips an attempt that was already judged', () => {
    const env = setup({ guard_hook_judged: true });
    const monitor = monitorGuardEvents(env.monitor_input);

    judge(env);
    monitor.stop();

    expect(hookWarnings(env)).toHaveLength(0);
    expect(attemptOf(env).guard_warnings).toBe(null);
  });

  test('skips a Claude attempt', () => {
    const env = setup({ runner: 'claude' });
    const monitor = monitorGuardEvents(env.monitor_input);

    judge(env);
    monitor.stop();

    expect(hookWarnings(env)).toHaveLength(0);
    expect(attemptOf(env).guard_hook_judged).toBe(false);
  });

  test('keeps one warning across a guard-events replay after a restart', () => {
    const env = setup();
    const monitor = monitorGuardEvents(env.monitor_input);
    judge(env);
    monitor.stop();

    monitorGuardEvents(env.monitor_input).stop();
    judge(env);

    expect(hookWarnings(env)).toHaveLength(1);
    expect(attemptOf(env).guard_warnings).toHaveLength(1);
  });
});
