import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { createBeadTimeline } from '../bead-timeline.js';
import { guardEventLogPath, install, preToolHookPath } from '../guard-hook.js';
import { createQueueStore } from '../queue-store.js';
import { monitorGuardEvents } from './guard-events.js';

/** @type {string} */
let root;
/** @type {{ workspace: string, attempt_id: string, repo: string, target_base: string }} */
let input;

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), "worker-guard-'"));
  vi.stubEnv('XDG_STATE_HOME', root);
  input = {
    workspace: root,
    attempt_id: 'attempt-1',
    repo: root,
    target_base: 'release/main'
  };
  expect(install(input).ok).toBe(true);
});

afterEach(() => {
  vi.unstubAllEnvs();
  fs.rmSync(root, { recursive: true, force: true });
});

/**
 * @param {string} command
 * @param {string} [runner]
 */
function runHook(command, runner = 'claude') {
  return spawnSync(preToolHookPath(root, input.attempt_id), [runner], {
    input: JSON.stringify({ tool_name: 'Bash', tool_input: { command } }),
    encoding: 'utf8'
  });
}

test.each([
  'gh pr merge 42 --squash',
  'git merge origin/release/main; gh pr merge 42',
  'git -c core.hooksPath=/dev/null push origin feature',
  'git -c core.hooksPath=.git/hooks diff; git commit -m update',
  'git commit --no-verify -m update',
  'f() { :; }; git commit --no-verify -m update',
  'git rebase --no-verify main',
  'git tag --no-verify release',
  'GIT_CONFIG_COUNT=0 git push origin feature',
  'GIT_CONFIG_KEY_0=core.hooksPath git commit -m update',
  'GIT_CONFIG_VALUE_0=/dev/null git merge main',
  "GIT_CONFIG_PARAMETERS=\"'core.hooksPath'='/dev/null'\" git push origin feature",
  "sh -c 'git -c core.hooksPath=/dev/null push origin feature'",
  'f() { :; }; git -c core.hooksPath=/dev/null push origin feature'
])('refuses a write before execution: %s', (command) => {
  const result = runHook(command);

  expect(result.status).toBe(0);
  expect(JSON.parse(result.stdout).hookSpecificOutput).toMatchObject({
    hookEventName: 'PreToolUse',
    permissionDecision: 'deny'
  });
  expect(
    JSON.parse(
      fs.readFileSync(guardEventLogPath(root, input.attempt_id), 'utf8')
    )
  ).toMatchObject({ kind: 'guard_denied', runner: 'claude', command });
});

test.each([
  'git -c core.hooksPath=/dev/null diff --stat',
  'git -c core.hooksPath=/dev/null log -1',
  'git -c core.hooksPath=/dev/null status --short',
  'git -c core.hooksPath=/dev/null show HEAD',
  'git -c core.hooksPath=/dev/null rev-parse HEAD',
  'GIT_CONFIG_COUNT=0 git diff --stat',
  'git push origin feature',
  'git push origin HEAD:release/main',
  'git merge origin/release/main',
  'f() { :; }; git -c core.hooksPath=/dev/null diff --stat',
  'printf "%s" "gh pr merge 42"',
  'cat <<EOF\ngh pr merge 42\nEOF'
])('allows a command without a denied write: %s', (command) => {
  const result = runHook(command);

  expect(result.status).toBe(0);
  expect(result.stdout).toBe('');
});

test('returns the same denial to Codex', () => {
  const result = runHook('gh pr merge 42', 'codex');

  expect(
    JSON.parse(result.stdout).hookSpecificOutput.permissionDecisionReason
  ).toBe('landing on the base branch is never permitted: gh pr merge 42');
});

test('allows malformed input and records the hook error', () => {
  const result = spawnSync(
    preToolHookPath(root, input.attempt_id),
    ['claude'],
    { input: '{', encoding: 'utf8' }
  );

  expect(result.status).toBe(0);
  expect(result.stdout).toBe('');
  expect(
    JSON.parse(
      fs.readFileSync(guardEventLogPath(root, input.attempt_id), 'utf8')
    )
  ).toMatchObject({ kind: 'guard_warning', reason: 'guard_hook_error' });
});

test('allows a Node startup failure and records the hook error', () => {
  const file = preToolHookPath(root, input.attempt_id);
  fs.writeFileSync(
    file,
    fs
      .readFileSync(file, 'utf8')
      .replace(process.execPath, '/missing/worker-node')
  );

  const result = runHook('gh pr merge 42');

  expect(result.status).toBe(0);
  expect(result.stdout).toBe('');
  expect(
    JSON.parse(
      fs.readFileSync(guardEventLogPath(root, input.attempt_id), 'utf8')
    ).reason
  ).toBe('guard_hook_error');
});

test('records hook denials once across a monitor restart', () => {
  const timeline = createBeadTimeline({ workspace_root: root });
  const store = createQueueStore({ timeline });
  store.appendAttempt(root, {
    expected_revision: 0,
    attempt: { attempt_id: input.attempt_id, bead_id: 'UI-1' }
  });
  const monitor_input = {
    workspace: root,
    attempt_id: input.attempt_id,
    store,
    sessionLog: { publish: vi.fn() }
  };
  const monitor = monitorGuardEvents(monitor_input);

  runHook('gh pr merge 42');
  monitor.stop();
  monitorGuardEvents(monitor_input).stop();

  const denied = timeline
    .readTimeline('UI-1')
    .filter((event) => event.kind === 'guard_denied');
  expect(denied).toHaveLength(1);
  expect(denied[0]).toMatchObject({
    runner: 'claude',
    reason: 'merge_to_base_blocked',
    command: 'gh pr merge 42'
  });
});
