/**
 * The split `MERGE_RE` fail-closed guards (worker-phase2 §1/§13), migrated from
 * the retired merge-lock guard suite: the gate is the ATTEMPT's mode, not a lock.
 *
 * The EFFECT is the violation's `kind`, not its reason
 * (guard-enforcement-layer-replacement §4):
 *
 *   - `gh pr merge` / hook bypass  → killed on EVERY attempt.
 *   - a base push                  → warned about, session continues.
 *   - `git merge origin/main`      → warned about on EVERY attempt (UI-1xcd
 *                                    §1/§3); the attempt's mode no longer
 *                                    decides, because the command touches
 *                                    nothing remote.
 *   - a disposition session        → base push and hook bypass do not apply.
 */
import os from 'node:os';
import path from 'node:path';
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
 * @param {{ conflict_resolution?: boolean, disposition?: string|null,
 * repo?: string, target_base?: string }} [settings] - `conflict_resolution` is
 * retired (UI-1xcd §3) and kept in the type only so the tests below can prove a
 * caller still passing it changes nothing.
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
const LEGACY_RESOLVING = /** @type {any} */ ({ conflict_resolution: true });

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

  test('kills `gh pr merge` when the retired resolution flag is passed', async () => {
    const { verdict, kill_impl } = await runCommand(
      'gh pr merge 304 --squash',
      LEGACY_RESOLVING
    );

    expect(kill_impl).toHaveBeenCalledWith(-5150, 'SIGTERM');
    expect(
      verdict.events.some((e) => e.reason === 'merge_to_base_blocked')
    ).toBe(true);
  });

  test('kills `gh pr merge` aimed at another repository', async () => {
    const { verdict, kill_impl } = await runCommand(
      'gh pr merge 12 --repo nakkulla/other'
    );

    expect(kill_impl).toHaveBeenCalledWith(-5150, 'SIGTERM');
    expect(verdict.blocked).toBe(true);
  });
});

describe('runner/session hook-bypass guard (killed)', () => {
  test('kills a `--no-verify` push', async () => {
    const { verdict, kill_impl } = await runCommand(
      'git push --no-verify origin UI-1'
    );

    expect(kill_impl).toHaveBeenCalledWith(-5150, 'SIGTERM');
    expect(verdict.blocked).toBe(true);
    expect(verdict.blocked_detail).toEqual({
      reason: 'hook_bypass_blocked',
      command: 'git push --no-verify origin UI-1'
    });
  });

  test('names the disabled hook in the blocker message', async () => {
    const { verdict } = await runCommand('git config core.hooksPath /tmp/x');

    const blocker = verdict.events.find((e) => e.kind === 'blocker');

    expect(blocker?.reason).toBe('hook_bypass_blocked');
    expect(blocker?.message).toContain('git config core.hooksPath /tmp/x');
  });

  test('kills a GIT_CONFIG_* assignment prefix', async () => {
    const { kill_impl } = await runCommand(
      'GIT_CONFIG_COUNT=0 git push origin UI-1'
    );

    expect(kill_impl).toHaveBeenCalledWith(-5150, 'SIGTERM');
  });

  test('does not kill a dry-run push', async () => {
    const { verdict, kill_impl } = await runCommand('git push -n origin UI-1');

    expect(kill_impl).not.toHaveBeenCalled();
    expect(verdict.blocked).toBe(false);
  });
});

describe('runner/session base-push guard (warned, not killed)', () => {
  test('does not kill a push to main on a normal attempt', async () => {
    const { verdict, kill_impl } = await runCommand('git push origin main');

    expect(kill_impl).not.toHaveBeenCalled();
    expect(verdict.blocked).toBe(false);
    expect(verdict.blocked_detail).toBeNull();
  });

  test('records the warning with the guard reason and the command', async () => {
    const { verdict } = await runCommand('git push origin main');

    const warning = verdict.events.find(
      (e) => e.reason === 'merge_to_base_blocked'
    );

    expect(warning?.kind).toBe('error');
    expect(warning?.message).toContain('git push origin main');
  });

  test('keeps normalizing the same line the warning came from', async () => {
    const { verdict } = await runCommand('git push origin main');

    expect(verdict.events.map((e) => e.kind)).toEqual(['error', 'tool']);
  });

  test('lets the session run to its own verdict after a warning', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [
        bashToolLine('git push origin main'),
        JSON.stringify({ type: 'result', subtype: 'success', is_error: false })
      ],
      pid: 5150
    });
    const kill_impl = vi.fn();

    const handle = runSession(claudeSpec(), { id: 'UI-1' }, WS, NORMAL, {
      spawn_impl,
      kill_impl
    });
    const verdict = await handle.done;

    expect(kill_impl).not.toHaveBeenCalled();
    expect(verdict.success).toBe(true);
    expect(verdict.reason).toBe('ok');
  });

  test('does not kill a push to master when the retired flag is passed', async () => {
    const { verdict, kill_impl } = await runCommand(
      'git push origin HEAD:master',
      LEGACY_RESOLVING
    );

    expect(kill_impl).not.toHaveBeenCalled();
    expect(
      verdict.events.some((e) => e.reason === 'merge_to_base_blocked')
    ).toBe(true);
  });
});

describe('runner/session base-into-branch guard (recorded, not blocked)', () => {
  // The 2026-08-04 `dotfiles-v05o` incident, verbatim: the session was doing the
  // one legitimate base sync left to it and lost $11.67 for it (UI-1xcd §1).
  test('lets `git merge origin/main --no-edit` run and records it', async () => {
    const { verdict, kill_impl } = await runCommand(
      'git merge origin/main --no-edit',
      NORMAL
    );

    expect(kill_impl).not.toHaveBeenCalled();
    expect(verdict.blocked).toBe(false);
    const warning = verdict.events.find(
      (e) => e.reason === 'base_merge_blocked'
    );
    expect(warning?.kind).toBe('error');
    expect(warning?.guard_warning).toEqual({
      reason: 'base_merge_blocked',
      command: 'git merge origin/main --no-edit'
    });
  });

  test('records `git merge origin/main` identically with the retired flag', async () => {
    const { verdict, kill_impl } = await runCommand(
      'git merge origin/main',
      LEGACY_RESOLVING
    );

    expect(kill_impl).not.toHaveBeenCalled();
    expect(verdict.blocked).toBe(false);
    expect(verdict.events.some((e) => e.reason === 'base_merge_blocked')).toBe(
      true
    );
  });

  test('records rather than kills when the flag is absent entirely', async () => {
    const { verdict, kill_impl } = await runCommand(
      'git merge --no-ff origin/main'
    );

    expect(kill_impl).not.toHaveBeenCalled();
    expect(verdict.events.some((e) => e.reason === 'base_merge_blocked')).toBe(
      true
    );
  });

  test('records `git merge --ff-only`, the ff-only base sync', async () => {
    const { verdict, kill_impl } = await runCommand(
      'git merge --ff-only origin/release',
      NORMAL
    );

    expect(kill_impl).not.toHaveBeenCalled();
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

  test('records `git merge-index`, outside the allowlist', async () => {
    const { verdict, kill_impl } = await runCommand(
      'git merge-index git-merge-one-file -a',
      NORMAL
    );

    expect(kill_impl).not.toHaveBeenCalled();
    expect(verdict.events.some((e) => e.reason === 'base_merge_blocked')).toBe(
      true
    );
  });

  test('records `git merge-resolve`, outside the allowlist', async () => {
    const { verdict, kill_impl } = await runCommand(
      'git merge-resolve 1a2b3c4 -- HEAD 5d6e7f8',
      NORMAL
    );

    expect(kill_impl).not.toHaveBeenCalled();
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

  // The 2026-07-27 dotfiles-h3z2 incident, verbatim: the guarded phrase sits
  // inside an `rg` SEARCH PATTERN, never in a command position (UI-2o4z §1).
  test('does not kill an rg search whose pattern contains the guarded phrase', async () => {
    const { verdict, kill_impl } = await runCommand(
      'rg -n "permissions|contents:|pull-requests:|gh pr merge|merge" .github/workflows/ai-pr-review.yml'
    );

    expect(kill_impl).not.toHaveBeenCalled();
    expect(verdict.blocked).toBe(false);
  });

  test('does not kill a commit message quoting the guarded phrase', async () => {
    const { kill_impl } = await runCommand(
      'git commit -m "gh pr merge 관련 수정"'
    );

    expect(kill_impl).not.toHaveBeenCalled();
  });

  test('does not kill a non-interpreter heredoc body naming the guarded phrase', async () => {
    const { kill_impl } = await runCommand(
      ["cat <<'EOF' > notes.md", 'do not run gh pr merge', 'EOF'].join('\n')
    );

    expect(kill_impl).not.toHaveBeenCalled();
  });

  test('does not kill `git push main feature`, where main is the remote name', async () => {
    const { kill_impl } = await runCommand('git push main feature');

    expect(kill_impl).not.toHaveBeenCalled();
  });
});

describe('runner/session merge guards see through wrappers and interpreters', () => {
  test('kills `gh pr merge` behind an assignment prefix', async () => {
    const { kill_impl } = await runCommand('FOO=1 gh pr merge 311');

    expect(kill_impl).toHaveBeenCalledWith(-5150, 'SIGTERM');
  });

  test('kills `gh pr merge` invoked by absolute path', async () => {
    const { kill_impl } = await runCommand('/usr/bin/gh pr merge 311');

    expect(kill_impl).toHaveBeenCalledWith(-5150, 'SIGTERM');
  });

  test('kills `gh pr merge` behind an if/then prefix', async () => {
    const { kill_impl } = await runCommand('if true; then gh pr merge 311; fi');

    expect(kill_impl).toHaveBeenCalledWith(-5150, 'SIGTERM');
  });

  test('kills a `bash -c` payload', async () => {
    const { kill_impl } = await runCommand('bash -c "gh pr merge 311"');

    expect(kill_impl).toHaveBeenCalledWith(-5150, 'SIGTERM');
  });

  test('kills an interpreter heredoc payload', async () => {
    const { kill_impl } = await runCommand(
      ["bash <<'EOF'", 'gh pr merge 311', 'EOF'].join('\n')
    );

    expect(kill_impl).toHaveBeenCalledWith(-5150, 'SIGTERM');
  });

  test('kills an unbalanced-quote command by the regex fallback', async () => {
    const { kill_impl } = await runCommand('echo "gh pr merge');

    expect(kill_impl).toHaveBeenCalledWith(-5150, 'SIGTERM');
  });
});

describe('runner/session base-landing guard reads its subject from settings', () => {
  // The scheduler puts the attempt's repo and its repo-declared base on the
  // launch settings (worker-base-scope-alignment §3); these pin that the values
  // actually reach the guard's judgment rather than stopping at the signature.
  const REPO = path.join(os.homedir(), 'Documents/GitHub/beads-ui');
  const ON_DEV = { repo: REPO, target_base: 'ilsun/dev' };
  const ON_MAIN = { repo: REPO, target_base: 'main' };

  test('does not kill a push to main when the declared base is ilsun/dev', async () => {
    const { verdict, kill_impl } = await runCommand(
      'git push origin main',
      ON_DEV
    );

    expect(kill_impl).not.toHaveBeenCalled();
    expect(verdict.blocked).toBe(false);
  });

  test('warns without killing on a push to the declared base ilsun/dev', async () => {
    const { verdict, kill_impl } = await runCommand(
      'git push origin ilsun/dev',
      ON_DEV
    );

    expect(kill_impl).not.toHaveBeenCalled();
    expect(
      verdict.events.some((e) => e.reason === 'merge_to_base_blocked')
    ).toBe(true);
  });

  // The 2026-07-30 incident, verbatim: a publication to ANOTHER repository's
  // main, which killed this session twice before §6.
  test('does not kill a cross-repo publication that leaves the attempt repo', async () => {
    const { verdict, kill_impl } = await runCommand(
      'cd ~/GitHub/thalamus && git push origin main',
      ON_MAIN
    );

    expect(kill_impl).not.toHaveBeenCalled();
    expect(verdict.blocked).toBe(false);
  });

  test('still JUDGES a base push from the attempt repo itself', async () => {
    const { verdict, kill_impl } = await runCommand(
      'git push origin main',
      ON_MAIN
    );

    expect(kill_impl).not.toHaveBeenCalled();
    expect(
      verdict.events.some((e) => e.reason === 'merge_to_base_blocked')
    ).toBe(true);
  });
});

describe('runner/session excludes a disposition session', () => {
  const REPO = path.join(os.homedir(), 'Documents/GitHub/beads-ui');
  // The scheduler puts the disposition KIND on the settings, not a boolean.
  const DISPOSING = {
    repo: REPO,
    target_base: 'main',
    disposition: 'revise_fix'
  };

  // Publishing the resolved base IS the job of a REVISE-disposition session
  // (`revise-disposition.js`), which this guard used to SIGTERM it for.
  test('raises nothing at all for its base publication', async () => {
    const { verdict, kill_impl } = await runCommand(
      'git push origin main',
      DISPOSING
    );

    expect(kill_impl).not.toHaveBeenCalled();
    expect(verdict.blocked).toBe(false);
    expect(
      verdict.events.some((e) => e.reason === 'merge_to_base_blocked')
    ).toBe(false);
  });

  test('raises nothing for a hook-bypass form either', async () => {
    const { verdict, kill_impl } = await runCommand(
      'git push --no-verify origin main',
      DISPOSING
    );

    expect(kill_impl).not.toHaveBeenCalled();
    expect(verdict.blocked).toBe(false);
  });

  test('still kills `gh pr merge`', async () => {
    const { kill_impl } = await runCommand('gh pr merge 311', DISPOSING);

    expect(kill_impl).toHaveBeenCalledWith(-5150, 'SIGTERM');
  });

  test('applies the guard normally when the kind is null (every other attempt)', async () => {
    const { verdict, kill_impl } = await runCommand('git push origin main', {
      repo: REPO,
      target_base: 'main',
      disposition: null
    });

    expect(kill_impl).not.toHaveBeenCalled();
    expect(
      verdict.events.some((e) => e.reason === 'merge_to_base_blocked')
    ).toBe(true);
  });
});

describe('runner/session blocked_detail', () => {
  test('records the guard reason and the matched command', async () => {
    const { verdict } = await runCommand('gh pr merge 311 --squash');

    expect(verdict.blocked_detail).toEqual({
      reason: 'merge_to_base_blocked',
      command: 'gh pr merge 311 --squash'
    });
  });

  test('records the INNER command for an interpreter payload', async () => {
    const { verdict } = await runCommand('bash -c "gh pr merge 311"');

    expect(verdict.blocked_detail).toEqual({
      reason: 'merge_to_base_blocked',
      command: 'gh pr merge 311'
    });
  });

  test('leaves blocked_detail null on an unblocked session', async () => {
    const { verdict } = await runCommand('gh pr create --fill');

    expect(verdict.blocked_detail).toBeNull();
  });

  test('records a question blocker with no command', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [
        JSON.stringify({
          type: 'assistant',
          message: {
            content: [
              { type: 'tool_use', name: 'AskUserQuestion', input: { q: '?' } }
            ]
          }
        })
      ],
      pid: 5150
    });

    const handle = runSession(claudeSpec(), { id: 'UI-1' }, WS, NORMAL, {
      spawn_impl,
      kill_impl: vi.fn()
    });
    const verdict = await handle.done;

    expect(verdict.blocked_detail).toEqual({
      reason: 'question tool: AskUserQuestion',
      command: null
    });
  });

  test('raises no blocker for a result carrying permission_denials', async () => {
    const spawn_impl = makeFixtureSpawn({
      lines: [
        JSON.stringify({
          type: 'result',
          subtype: 'success',
          is_error: false,
          permission_denials: [{ tool_name: 'Bash' }]
        })
      ],
      pid: 5150
    });

    const handle = runSession(claudeSpec(), { id: 'UI-1' }, WS, NORMAL, {
      spawn_impl,
      kill_impl: vi.fn()
    });
    const verdict = await handle.done;

    expect(verdict.blocked).toBe(false);
    expect(verdict.blocked_detail).toBeNull();
    expect(verdict.success).toBe(true);
  });
});

/**
 * The deferred one-shot verdict (guard-hook-bypass-result-judgment §3/§4).
 *
 * A session whose spawn environment provably carries the PreToolUse mirror
 * holds the arm 3 verdict until the paired `tool_result` says whether the
 * command ran at all.
 */
const ONE_SHOT = 'git -c core.hooksPath=/dev/null diff --stat';

/**
 * A Bash tool_use line that carries its own id, which is what the deferral
 * pairs on.
 *
 * @param {string} command
 * @param {string} id
 * @returns {string}
 */
function bashToolLineWithId(command, id) {
  return JSON.stringify({
    type: 'assistant',
    message: {
      content: [{ type: 'tool_use', id, name: 'Bash', input: { command } }]
    }
  });
}

/**
 * The `user` line a tool call's result arrives on.
 *
 * @param {string} tool_use_id
 * @param {{ is_error?: boolean, content?: unknown }} result
 * @returns {string}
 */
function toolResultLine(tool_use_id, result) {
  return JSON.stringify({
    type: 'user',
    message: {
      content: [
        {
          type: 'tool_result',
          tool_use_id,
          ...(result.is_error === true ? { is_error: true } : {}),
          content: result.content ?? 'ok'
        }
      ]
    }
  });
}

const HOOK_REFUSAL = {
  is_error: true,
  content: 'PreToolUse:Bash hook error: [hook]: BLOCKED: …'
};

/**
 * Replay a line list through a session whose mirror state is fixed.
 *
 * @param {string[]} lines
 * @param {'verified'|'absent'} guard_mirror
 */
async function runLines(lines, guard_mirror) {
  const spawn_impl = makeFixtureSpawn({ lines, pid: 5150 });
  const kill_impl = vi.fn();
  /** @type {any[]} */
  const events = [];
  const spec = { ...claudeSpec(), probeGuardMirror: () => guard_mirror };

  const handle = runSession(
    spec,
    { id: 'UI-1' },
    WS,
    {},
    {
      spawn_impl,
      kill_impl
    }
  );
  handle.events.on('event', (ev) => events.push(ev));
  const verdict = await handle.done;

  return { verdict, kill_impl, events, handle };
}

describe('runner/session deferred hook-bypass verdict (§3)', () => {
  test('does not kill when the mirror refused the command', async () => {
    const { verdict, kill_impl, events } = await runLines(
      [
        bashToolLineWithId(ONE_SHOT, 'toolu_1'),
        toolResultLine('toolu_1', HOOK_REFUSAL)
      ],
      'verified'
    );

    expect(kill_impl).not.toHaveBeenCalled();
    expect(verdict.blocked).toBe(false);
    expect(
      events.filter((e) => e.kind === 'guard_pending').map((e) => e.op)
    ).toEqual(['add', 'clear']);
    expect(events.some((e) => e.guard_warning)).toBe(false);
  });

  test('kills once the tool_result proves the command ran', async () => {
    const { verdict, kill_impl } = await runLines(
      [
        bashToolLineWithId(ONE_SHOT, 'toolu_1'),
        toolResultLine('toolu_1', { content: '3 files changed' })
      ],
      'verified'
    );

    expect(kill_impl).toHaveBeenCalledWith(-5150, 'SIGTERM');
    expect(verdict.blocked_detail).toEqual({
      reason: 'hook_bypass_blocked',
      command: ONE_SHOT,
      confirmed_by: 'tool_result'
    });
  });

  test('reports the spawn env the probe was given', async () => {
    const spawn_impl = makeFixtureSpawn({ lines: [], pid: 5150 });
    const probe = vi.fn(() => /** @type {const} */ ('absent'));
    const spec = {
      ...claudeSpec(),
      buildArgv: () => ({
        command: 'claude',
        args: [],
        env: { CLAUDE_CONFIG_DIR: '/adapter/config' }
      }),
      probeGuardMirror: probe
    };

    const handle = runSession(
      spec,
      { id: 'UI-1' },
      WS,
      { env: { HOME: '/settings/home' } },
      { spawn_impl, kill_impl: vi.fn() }
    );
    await handle.done;

    const input = /** @type {any} */ (probe).mock.calls[0][0];
    expect(input.env.HOME).toBe('/settings/home');
    expect(input.env.CLAUDE_CONFIG_DIR).toBe('/adapter/config');
    expect(input.cwd).toBe(WS);
    expect(handle.guard_mirror).toBe('absent');
  });

  test('keeps the deferral when another tool call reports back', async () => {
    const { kill_impl, events } = await runLines(
      [
        bashToolLineWithId(ONE_SHOT, 'toolu_1'),
        toolResultLine('toolu_other', { content: 'ok' })
      ],
      'verified'
    );

    expect(kill_impl).not.toHaveBeenCalled();
    // The `clear` is §4's end-of-session settlement, not a pairing.
    expect(
      events.filter((e) => e.kind === 'guard_pending').map((e) => e.op)
    ).toEqual(['add', 'clear']);
    expect(events.filter((e) => e.guard_warning).map((e) => e.reason)).toEqual([
      'hook_bypass_unresolved'
    ]);
  });

  test('warns instead of killing when the session ends still holding it', async () => {
    const { verdict, kill_impl, events } = await runLines(
      [
        bashToolLineWithId(ONE_SHOT, 'toolu_1'),
        JSON.stringify({ type: 'result', subtype: 'success', result: 'done' })
      ],
      'verified'
    );

    expect(kill_impl).not.toHaveBeenCalled();
    expect(verdict.blocked).toBe(false);
    expect(
      events.filter((e) => e.guard_warning).map((e) => e.guard_warning)
    ).toEqual([{ reason: 'hook_bypass_unresolved', command: ONE_SHOT }]);
  });

  test('kills a one-shot relocation at once on an unverified session', async () => {
    const { verdict, kill_impl } = await runLines(
      [bashToolLineWithId(ONE_SHOT, 'toolu_1')],
      'absent'
    );

    expect(kill_impl).toHaveBeenCalledWith(-5150, 'SIGTERM');
    expect(verdict.blocked_detail).toEqual({
      reason: 'hook_bypass_blocked',
      command: ONE_SHOT
    });
  });

  test('kills a `--no-verify` push at once even on a verified session', async () => {
    const push = 'git push --no-verify origin UI-1';
    const { verdict, kill_impl } = await runLines(
      [bashToolLineWithId(push, 'toolu_1')],
      'verified'
    );

    expect(kill_impl).toHaveBeenCalledWith(-5150, 'SIGTERM');
    expect(verdict.blocked_detail).toEqual({
      reason: 'hook_bypass_blocked',
      command: push
    });
  });
});
