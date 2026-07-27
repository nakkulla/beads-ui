/**
 * The split `MERGE_RE` fail-closed guards (worker-phase2 §1/§13), migrated from
 * the retired merge-lock guard suite: the gate is the ATTEMPT's mode, not a lock.
 *
 *   - `gh pr merge` / a base push  → killed on EVERY attempt.
 *   - `git merge origin/main`      → killed on a normal attempt, ALLOWED on a
 *                                    conflict-resolution attempt.
 */
import { describe, expect, test, vi } from 'vitest';
import { claudeSpec } from './claude.js';
import { makeFixtureSpawn } from './fixture-spawn.js';
import { runSession } from './session.js';

const WS = '/tmp/ws';

/**
 * A claude assistant Bash tool_use running one shell command.
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
 * Replay one shell command through a session and return the verdict + kill spy.
 *
 * @param {string} command
 * @param {{ conflict_resolution?: boolean }} [settings]
 */
async function runCommand(command, settings = {}) {
  const spawn_impl = makeFixtureSpawn({
    lines: [bashToolLine(command)],
    pid: 5150
  });
  const kill_impl = vi.fn();

  const handle = runSession(claudeSpec(), { id: 'UI-1' }, WS, settings, {
    spawn_impl,
    kill_impl
  });
  const verdict = await handle.done;

  return { verdict, kill_impl };
}

const NORMAL = {};
const RESOLVING = { conflict_resolution: true };

describe('runner/session base-landing guard (always blocked)', () => {
  test('kills `gh pr merge` on a normal attempt', async () => {
    const { verdict, kill_impl } = await runCommand('gh pr merge 304 --squash');

    // Group-kill uses the NEGATIVE pid (whole process group).
    expect(kill_impl).toHaveBeenCalledWith(-5150, 'SIGTERM');
    expect(verdict.blocked).toBe(true);
    expect(verdict.success).toBe(false);
    expect(
      verdict.events.some((e) => e.reason === 'merge_to_base_blocked')
    ).toBe(true);
  });

  test('kills `gh pr merge` on a conflict-resolution attempt too', async () => {
    const { verdict, kill_impl } = await runCommand(
      'gh pr merge 304 --squash',
      RESOLVING
    );

    expect(kill_impl).toHaveBeenCalledWith(-5150, 'SIGTERM');
    expect(
      verdict.events.some((e) => e.reason === 'merge_to_base_blocked')
    ).toBe(true);
  });

  test('kills a push to main on a normal attempt', async () => {
    const { verdict, kill_impl } = await runCommand('git push origin main');

    expect(kill_impl).toHaveBeenCalledWith(-5150, 'SIGTERM');
    expect(
      verdict.events.some((e) => e.reason === 'merge_to_base_blocked')
    ).toBe(true);
  });

  test('kills a push to main on a conflict-resolution attempt too', async () => {
    const { verdict, kill_impl } = await runCommand(
      'git push origin HEAD:master',
      RESOLVING
    );

    expect(kill_impl).toHaveBeenCalledWith(-5150, 'SIGTERM');
    expect(
      verdict.events.some((e) => e.reason === 'merge_to_base_blocked')
    ).toBe(true);
  });
});

describe('runner/session base-into-branch guard (mode-gated)', () => {
  test('kills `git merge origin/main` on a normal attempt', async () => {
    const { verdict, kill_impl } = await runCommand(
      'git merge origin/main',
      NORMAL
    );

    expect(kill_impl).toHaveBeenCalledWith(-5150, 'SIGTERM');
    expect(verdict.blocked).toBe(true);
    expect(verdict.events.some((e) => e.reason === 'base_merge_blocked')).toBe(
      true
    );
  });

  test('allows `git merge origin/main` on a conflict-resolution attempt', async () => {
    const { verdict, kill_impl } = await runCommand(
      'git merge origin/main',
      RESOLVING
    );

    expect(kill_impl).not.toHaveBeenCalled();
    expect(verdict.blocked).toBe(false);
  });

  test('blocks by default when the flag is absent entirely', async () => {
    const { kill_impl } = await runCommand('git merge --no-ff origin/main');

    expect(kill_impl).toHaveBeenCalledWith(-5150, 'SIGTERM');
  });

  test('blocks when the flag is a truthy non-boolean (fail-closed)', async () => {
    const { kill_impl } = await runCommand(
      'git merge origin/main',
      /** @type {any} */ ({ conflict_resolution: 'yes' })
    );

    expect(kill_impl).toHaveBeenCalledWith(-5150, 'SIGTERM');
  });

  test('kills `git merge --ff-only` on a normal attempt', async () => {
    const { verdict, kill_impl } = await runCommand(
      'git merge --ff-only origin/release',
      NORMAL
    );

    expect(kill_impl).toHaveBeenCalledWith(-5150, 'SIGTERM');
    expect(verdict.events.some((e) => e.reason === 'base_merge_blocked')).toBe(
      true
    );
  });
});

describe('runner/session base-into-branch guard subcommand allowlist', () => {
  test('allows `git merge-base --is-ancestor` on a normal attempt', async () => {
    const { verdict, kill_impl } = await runCommand(
      'git merge-base --is-ancestor 1a2b3c4 HEAD',
      NORMAL
    );

    expect(kill_impl).not.toHaveBeenCalled();
    expect(verdict.blocked).toBe(false);
  });

  test('allows `git merge-tree` on a normal attempt', async () => {
    const { verdict, kill_impl } = await runCommand(
      'git merge-tree 1a2b3c4 5d6e7f8',
      NORMAL
    );

    expect(kill_impl).not.toHaveBeenCalled();
    expect(verdict.blocked).toBe(false);
  });

  test('allows `git merge-file` on a normal attempt', async () => {
    const { verdict, kill_impl } = await runCommand(
      'git merge-file a.txt base.txt b.txt',
      NORMAL
    );

    expect(kill_impl).not.toHaveBeenCalled();
    expect(verdict.blocked).toBe(false);
  });

  test('kills `git merge-index`, outside the allowlist', async () => {
    const { verdict, kill_impl } = await runCommand(
      'git merge-index git-merge-one-file -a',
      NORMAL
    );

    expect(kill_impl).toHaveBeenCalledWith(-5150, 'SIGTERM');
    expect(verdict.events.some((e) => e.reason === 'base_merge_blocked')).toBe(
      true
    );
  });

  test('kills `git merge-resolve`, outside the allowlist', async () => {
    const { verdict, kill_impl } = await runCommand(
      'git merge-resolve 1a2b3c4 -- HEAD 5d6e7f8',
      NORMAL
    );

    expect(kill_impl).toHaveBeenCalledWith(-5150, 'SIGTERM');
    expect(verdict.events.some((e) => e.reason === 'base_merge_blocked')).toBe(
      true
    );
  });
});

describe('runner/session merge guards leave innocent commands alone', () => {
  test('does not kill an ordinary push to the session branch', async () => {
    const { verdict, kill_impl } = await runCommand('git push -u origin UI-1');

    expect(kill_impl).not.toHaveBeenCalled();
    expect(verdict.blocked).toBe(false);
  });

  test('does not kill a PR creation', async () => {
    const { kill_impl } = await runCommand('gh pr create --fill');

    expect(kill_impl).not.toHaveBeenCalled();
  });
});
