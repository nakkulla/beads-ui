import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { createBeadTimeline } from '../bead-timeline.js';
import {
  guardEventLogPath,
  guardInvokedMarkerPath,
  install,
  preToolHookPath
} from '../guard-hook.js';
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
  // Read each generated script with the installed shell, avoiding macOS's
  // first-execution cost without changing the hook's command or error handling.
  return spawnSync(
    '/bin/sh',
    [preToolHookPath(root, input.attempt_id), runner],
    {
      input: JSON.stringify({ tool_name: 'Bash', tool_input: { command } }),
      encoding: 'utf8'
    }
  );
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
  // Keep one direct execution to cover the installed shebang and executable bit.
  const result = spawnSync(preToolHookPath(root, input.attempt_id), ['codex'], {
    input: JSON.stringify({
      tool_name: 'Bash',
      tool_input: { command: 'gh pr merge 42' }
    }),
    encoding: 'utf8'
  });

  expect(
    JSON.parse(result.stdout).hookSpecificOutput.permissionDecisionReason
  ).toBe('landing on the base branch is never permitted: gh pr merge 42');
});

test('allows malformed input and records the hook error', () => {
  const result = spawnSync(
    '/bin/sh',
    [preToolHookPath(root, input.attempt_id), 'claude'],
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

test('creates the invoked marker on the first invocation', () => {
  const marker = guardInvokedMarkerPath(root, input.attempt_id);

  const result = runHook('git status', 'codex');

  expect(result.status).toBe(0);
  expect(JSON.parse(fs.readFileSync(marker, 'utf8'))).toMatchObject({
    runner: 'codex',
    at: expect.any(Number)
  });
});

test('leaves an existing invoked marker untouched', () => {
  const marker = guardInvokedMarkerPath(root, input.attempt_id);
  fs.writeFileSync(marker, 'first\n');

  const result = runHook('git status', 'codex');

  expect(result.status).toBe(0);
  expect(fs.readFileSync(marker, 'utf8')).toBe('first\n');
});

test('exits normally when the marker location is unwritable', () => {
  const module_path = fileURLToPath(
    new URL('./guard-pre-tool.js', import.meta.url)
  );
  const log_path = path.join(root, 'missing-dir', 'guard-events.jsonl');

  const result = spawnSync(
    process.execPath,
    [module_path, root, 'release/main', log_path, 'codex'],
    {
      input: JSON.stringify({
        tool_name: 'Bash',
        tool_input: { command: 'gh pr merge 42' }
      }),
      encoding: 'utf8'
    }
  );

  expect(result.status).toBe(0);
  expect(JSON.parse(result.stdout).hookSpecificOutput.permissionDecision).toBe(
    'deny'
  );
  expect(fs.existsSync(path.join(root, 'missing-dir'))).toBe(false);
});

test('keeps the denial output unchanged beside the marker', () => {
  const result = runHook('gh pr merge 42', 'codex');

  expect(JSON.parse(result.stdout)).toEqual({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason:
        'landing on the base branch is never permitted: gh pr merge 42'
    }
  });
  expect(fs.existsSync(guardInvokedMarkerPath(root, input.attempt_id))).toBe(
    true
  );
});

test('marks and allows an input without a command', () => {
  const result = spawnSync(
    '/bin/sh',
    [preToolHookPath(root, input.attempt_id), 'codex'],
    {
      input: JSON.stringify({
        tool_name: 'apply_patch',
        tool_input: { patch: '*** Begin Patch' }
      }),
      encoding: 'utf8'
    }
  );

  expect(result.status).toBe(0);
  expect(result.stdout).toBe('');
  expect(fs.existsSync(guardInvokedMarkerPath(root, input.attempt_id))).toBe(
    true
  );
  expect(
    fs.readFileSync(guardEventLogPath(root, input.attempt_id), 'utf8')
  ).toBe('');
});
