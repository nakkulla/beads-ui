/**
 * The split `MERGE_RE` fail-closed guards (worker-phase2 §1/§13), migrated from
 * the retired merge-lock guard suite: the gate is the ATTEMPT's mode, not a lock.
 *
 * The EFFECT is the violation's `kind`, not its reason
 * (guard-enforcement-layer-replacement §4):
 *
 *   - `gh pr merge` / hook bypass  → killed on EVERY attempt.
 *   - a base push                  → warned about, session continues.
 *   - `git merge origin/main`      → killed on a normal attempt, ALLOWED on a
 *                                    conflict-resolution attempt.
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
 * repo?: string, target_base?: string }} [settings]
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

  test('does not kill a push to master on a conflict-resolution attempt', async () => {
    const { verdict, kill_impl } = await runCommand(
      'git push origin HEAD:master',
      RESOLVING
    );

    expect(kill_impl).not.toHaveBeenCalled();
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
