import { describe, expect, test, vi } from 'vitest';
import { claudeSpec } from './claude.js';
import { makeFixtureSpawn } from './fixture-spawn.js';
import { runSession } from './session.js';

const WS = '/tmp/ws';

/**
 * A claude assistant Bash tool_use that merges into base.
 *
 * @returns {string}
 */
function mergeToolLine() {
  return JSON.stringify({
    type: 'assistant',
    message: {
      content: [
        {
          type: 'tool_use',
          name: 'Bash',
          input: { command: 'git merge --no-ff feature-branch' }
        }
      ]
    }
  });
}

/**
 * @param {{ held: boolean }} opts
 */
function run(opts) {
  const spawn_impl = makeFixtureSpawn({ lines: [mergeToolLine()], pid: 5150 });
  const kill_impl = vi.fn();
  const handle = runSession(
    claudeSpec(),
    { id: 'UI-1' },
    WS,
    { env: { BDUI_WORKER_TOKEN: 'tok-1' } },
    {
      spawn_impl,
      kill_impl,
      lock_state: {
        isHeldBy: (token) => opts.held && token === 'tok-1'
      }
    }
  );
  return { handle, kill_impl };
}

describe('runner/session merge-lock fail-closed guard (F3)', () => {
  test('an UNLOCKED merge tool_use → blocker + group-kill(-pid)', async () => {
    const { handle, kill_impl } = run({ held: false });
    const verdict = await handle.done;
    // Group-kill uses the NEGATIVE pid (whole process group).
    expect(kill_impl).toHaveBeenCalledWith(-5150, 'SIGTERM');
    expect(verdict.blocked).toBe(true);
    expect(verdict.success).toBe(false);
    expect(verdict.events.some((e) => e.reason === 'merge_without_lock')).toBe(
      true
    );
  });

  test('a merge tool_use while the lock IS held → no kill', async () => {
    const { handle, kill_impl } = run({ held: true });
    const verdict = await handle.done;
    expect(kill_impl).not.toHaveBeenCalled();
    expect(verdict.blocked).toBe(false);
  });

  test('without a lock_state dep, merge detection is skipped (no kill)', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: [mergeToolLine()], pid: 42 });
    const kill_impl = vi.fn();
    const handle = runSession(
      claudeSpec(),
      { id: 'UI-2' },
      WS,
      { env: { BDUI_WORKER_TOKEN: 'tok' } },
      { spawn_impl, kill_impl }
    );
    await handle.done;
    expect(kill_impl).not.toHaveBeenCalled();
  });
});
