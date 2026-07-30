/**
 * The argv-position merge guard (UI-2o4z §1). The regexes it replaced could not
 * tell a command from a quoted argument; these tests pin BOTH directions — the
 * false positives that must now pass, and the evasions that must still block.
 */
import os from 'node:os';
import path from 'node:path';
import { describe, expect, test } from 'vitest';
import {
  BASE_INTO_BRANCH_RE,
  BASE_LANDING_RE,
  baseLandingRegex,
  findMergeViolation,
  tokenize
} from './command-guard.js';

const NORMAL = {};
const RESOLVING = { conflict_resolution: true };

/**
 * The attempt's repo, inside the home directory exactly like the real one — so
 * a move to another repo under `~` has to be judged by the PATH, not by whether
 * it happens to leave `$HOME`.
 */
const REPO = path.join(os.homedir(), 'Documents/GitHub/beads-ui');

/** A subject whose declared base is `main` (the common repo). */
const ON_MAIN = { repo: REPO, target_base: 'main' };

/** A subject whose declared base is NOT named main/master (TRACE-ICI). */
const ON_DEV = { repo: REPO, target_base: 'ilsun/dev' };

/**
 * The 2026-07-30 incident, verbatim: a Cortex bead publishing another
 * repository's `main`, which killed the worker session.
 */
const INCIDENT_2026_07_30 = 'cd ~/GitHub/thalamus && git push origin main';

/**
 * The 2026-07-29 incident, verbatim — same publication one day earlier, with the
 * destination reached through a `$HOME`-valued single assignment.
 */
const INCIDENT_2026_07_29 =
  'H="$HOME/Library/Mobile Documents/iCloud~md~obsidian/Documents/Hippocampus"; cd "$H" && git push origin main';

describe('command-guard false positives', () => {
  test('passes the rg search whose PATTERN contains `gh pr merge`', () => {
    const cmd =
      'rg -n "permissions|contents:|pull-requests:|gh pr merge|merge" .github/workflows/ai-pr-review.yml';

    const violation = findMergeViolation(cmd, NORMAL);

    expect(violation).toBeNull();
  });

  test('passes a commit message quoting the guarded phrase', () => {
    const violation = findMergeViolation(
      'git commit -m "gh pr merge 관련 수정"',
      NORMAL
    );

    expect(violation).toBeNull();
  });

  test('passes a NON-interpreter heredoc body naming the guarded phrase', () => {
    const cmd = [
      "cat <<'EOF' > notes.md",
      'do not run gh pr merge',
      'EOF'
    ].join('\n');

    const violation = findMergeViolation(cmd, NORMAL);

    expect(violation).toBeNull();
  });

  test('passes `git push main feature`, where main is the REMOTE name', () => {
    const violation = findMergeViolation('git push main feature', NORMAL);

    expect(violation).toBeNull();
  });

  test('passes an ordinary push to the session branch', () => {
    const violation = findMergeViolation('git push -u origin UI-1', NORMAL);

    expect(violation).toBeNull();
  });

  test('passes `git push origin main:feature`, which lands on feature', () => {
    const violation = findMergeViolation(
      'git push origin main:feature',
      NORMAL
    );

    expect(violation).toBeNull();
  });

  test('passes the merge-base ancestry query', () => {
    const violation = findMergeViolation(
      'git merge-base --is-ancestor 1a2b3c4 HEAD',
      NORMAL
    );

    expect(violation).toBeNull();
  });
});

describe('command-guard base-landing detection', () => {
  test('blocks a plain `gh pr merge`', () => {
    const violation = findMergeViolation('gh pr merge 311 --squash', NORMAL);

    expect(violation).toEqual({
      reason: 'merge_to_base_blocked',
      command: 'gh pr merge 311 --squash'
    });
  });

  test('blocks `gh pr merge` behind a VAR=value assignment prefix', () => {
    const violation = findMergeViolation('FOO=1 gh pr merge 311', NORMAL);

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks `gh pr merge` invoked by absolute path', () => {
    const violation = findMergeViolation('/usr/bin/gh pr merge 311', NORMAL);

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks `gh pr merge` behind an if/then reserved-word prefix', () => {
    const violation = findMergeViolation(
      'if true; then gh pr merge 311; fi',
      NORMAL
    );

    expect(violation?.reason).toBe('merge_to_base_blocked');
    expect(violation?.command).toContain('gh pr merge 311');
  });

  test('blocks `gh pr merge` behind the env wrapper', () => {
    const violation = findMergeViolation(
      'env FOO=1 timeout 30 gh pr merge 311',
      NORMAL
    );

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks a push whose refspec destination is main', () => {
    const violation = findMergeViolation('git push origin HEAD:main', NORMAL);

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks a push naming master as the destination branch', () => {
    const violation = findMergeViolation('git push origin master', NORMAL);

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks a push whose destination hides behind a consumed option value', () => {
    const violation = findMergeViolation(
      'git push --repo origin -o ci.skip origin main',
      NORMAL
    );

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks base landing on a conflict-resolution attempt too', () => {
    const violation = findMergeViolation('gh pr merge 311', RESOLVING);

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });
});

describe('command-guard base-into-branch detection', () => {
  test('blocks `git merge` on a normal attempt', () => {
    const violation = findMergeViolation('git merge origin/main', NORMAL);

    expect(violation?.reason).toBe('base_merge_blocked');
  });

  test('allows `git merge` on a conflict-resolution attempt', () => {
    const violation = findMergeViolation('git merge origin/main', RESOLVING);

    expect(violation).toBeNull();
  });

  test('blocks `git merge-index`, outside the three-subcommand allowlist', () => {
    const violation = findMergeViolation(
      'git merge-index git-merge-one-file -a',
      NORMAL
    );

    expect(violation?.reason).toBe('base_merge_blocked');
  });
});

describe('command-guard interpreter recursion', () => {
  test('blocks a `bash -c` payload', () => {
    const violation = findMergeViolation('bash -c "gh pr merge 311"', NORMAL);

    expect(violation).toEqual({
      reason: 'merge_to_base_blocked',
      command: 'gh pr merge 311'
    });
  });

  test('blocks an `eval` payload', () => {
    const violation = findMergeViolation("eval 'git merge x'", NORMAL);

    expect(violation?.reason).toBe('base_merge_blocked');
  });

  test('blocks a command substitution payload', () => {
    const violation = findMergeViolation('echo $(gh pr merge 311)', NORMAL);

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks a backtick substitution payload', () => {
    const violation = findMergeViolation('echo `gh pr merge 311`', NORMAL);

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks an INTERPRETER heredoc body', () => {
    const cmd = ["bash <<'EOF'", 'gh pr merge 311', 'EOF'].join('\n');

    const violation = findMergeViolation(cmd, NORMAL);

    expect(violation).toEqual({
      reason: 'merge_to_base_blocked',
      command: 'gh pr merge 311'
    });
  });

  test('does not recurse into a non-interpreter argument', () => {
    const violation = findMergeViolation('rg "gh pr merge" .', NORMAL);

    expect(violation).toBeNull();
  });
});

describe('command-guard fallback on unresolvable input', () => {
  test('returns null for an unbalanced quote (tokenize refuses)', () => {
    const parsed = tokenize('echo "gh pr merge');

    expect(parsed).toBeNull();
  });

  test('judges an unbalanced quote by the legacy landing regex', () => {
    const cmd = 'echo "gh pr merge';

    const violation = findMergeViolation(cmd, NORMAL);

    expect(BASE_LANDING_RE.test(cmd)).toBe(true);
    expect(violation).toEqual({
      reason: 'merge_to_base_blocked',
      command: cmd
    });
  });

  test('judges an unterminated heredoc by the legacy branch regex', () => {
    const cmd = ["cat <<'EOF'", 'git merge origin/main'].join('\n');

    const violation = findMergeViolation(cmd, NORMAL);

    expect(BASE_INTO_BRANCH_RE.test(cmd)).toBe(true);
    expect(violation?.reason).toBe('base_merge_blocked');
  });

  test('judges a function definition by the legacy regexes', () => {
    const cmd = 'land() { gh pr merge 311; }';

    const violation = findMergeViolation(cmd, NORMAL);

    expect(tokenize(cmd)).toBeNull();
    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('keeps the conflict-resolution exception on the fallback path', () => {
    const cmd = "git merge origin/main -m 'unbalanced";

    const violation = findMergeViolation(cmd, RESOLVING);

    expect(tokenize(cmd)).toBeNull();
    expect(violation).toBeNull();
  });
});

describe('tokenize scope ids and preceding operators', () => {
  test('records the operator that precedes each simple command', () => {
    const parsed = tokenize('a && b; c || d | e');

    expect(parsed?.commands.map((c) => c.op)).toEqual([
      null,
      '&&',
      ';',
      '||',
      '|'
    ]);
  });

  test('gives SIBLING subshells different scope ids at the same depth', () => {
    const parsed = tokenize('( cd /a ) && ( cd /b )');

    expect(parsed?.commands.map((c) => c.scope)).toEqual(['0/1', '0/2']);
  });

  test('nests a scope id under its parent subshell', () => {
    const parsed = tokenize('x; ( y; ( z ) )');

    expect(parsed?.commands.map((c) => c.scope)).toEqual(['0', '0/1', '0/1/1']);
  });

  test('starts each scope at op null even behind an operator', () => {
    const parsed = tokenize('a && ( b && c )');

    expect(parsed?.commands.map((c) => c.op)).toEqual([null, null, '&&']);
  });
});

describe('command-guard cross-repo push allowlist (passes)', () => {
  test('passes the 2026-07-30 incident command verbatim', () => {
    const violation = findMergeViolation(INCIDENT_2026_07_30, ON_MAIN);

    expect(violation).toBeNull();
  });

  test('passes the 2026-07-29 incident command verbatim', () => {
    const violation = findMergeViolation(INCIDENT_2026_07_29, ON_MAIN);

    expect(violation).toBeNull();
  });

  test('passes a literal absolute move out of the repo', () => {
    const violation = findMergeViolation(
      'cd /opt/other-repo && git push origin main',
      ON_MAIN
    );

    expect(violation).toBeNull();
  });

  test('passes a `$HOME`-prefixed literal move', () => {
    const violation = findMergeViolation(
      'cd "$HOME/GitHub/thalamus" && git push origin main',
      ON_MAIN
    );

    expect(violation).toBeNull();
  });

  test('passes when an intervening command keeps the && chain', () => {
    const violation = findMergeViolation(
      'cd /opt/other-repo && git status && git push origin main',
      ON_MAIN
    );

    expect(violation).toBeNull();
  });

  test('passes a move inside the SAME subshell as the push', () => {
    const violation = findMergeViolation(
      '( cd /opt/other-repo && git push origin main )',
      ON_MAIN
    );

    expect(violation).toBeNull();
  });
});

describe('command-guard cross-repo push allowlist (violations)', () => {
  test('blocks a base push from the worktree cwd, with no move at all', () => {
    const violation = findMergeViolation('git push origin main', ON_MAIN);

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks a move confined to a subshell (cwd never changes)', () => {
    const violation = findMergeViolation(
      '( cd /foreign ) && git push origin main',
      ON_MAIN
    );

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks SIBLING subshells, same depth but no shared cwd', () => {
    const violation = findMergeViolation(
      '( cd /foreign ) && ( git push origin main )',
      ON_MAIN
    );

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks a move that does not dominate the push', () => {
    const violation = findMergeViolation(
      'false && cd /foreign; git push origin main',
      ON_MAIN
    );

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks a function definition, which cannot be parsed at all', () => {
    const cmd = 'f(){ cd /foreign; }; git push origin main';

    const violation = findMergeViolation(cmd, ON_MAIN);

    expect(tokenize(cmd)).toBeNull();
    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks a move whose target stays inside the attempt repo', () => {
    const violation = findMergeViolation(
      `cd ${REPO}/server && git push origin main`,
      ON_MAIN
    );

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks a move through an undecidable variable', () => {
    const violation = findMergeViolation(
      'cd "$SOMEWHERE" && git push origin main',
      ON_MAIN
    );

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  // POSIX 2.9.1 expands the command's words BEFORE performing that command's
  // own assignments, so this really runs `cd ""` and never leaves the repo.
  test('blocks a move whose variable comes from the SAME command prefix', () => {
    const violation = findMergeViolation(
      'H=/opt/other-repo cd "$H" && git push origin main',
      ON_MAIN
    );

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks a move through two ambiguous assignments', () => {
    const violation = findMergeViolation(
      'A=/opt/one; B=/opt/two; cd "$A" && git push origin main',
      ON_MAIN
    );

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks a move through a command substitution', () => {
    const violation = findMergeViolation(
      'cd "$(git rev-parse --show-toplevel)" && git push origin main',
      ON_MAIN
    );

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks `cd -`, whose destination is unknowable here', () => {
    const violation = findMergeViolation(
      'cd - && git push origin main',
      ON_MAIN
    );

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks when a later move returns INTO the repo before the push', () => {
    const violation = findMergeViolation(
      `cd /opt/other-repo && cd ${REPO} && git push origin main`,
      ON_MAIN
    );

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks the incident command when no repo subject is supplied', () => {
    const violation = findMergeViolation(INCIDENT_2026_07_30, {
      target_base: 'main'
    });

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks the incident command with no options at all', () => {
    const violation = findMergeViolation(INCIDENT_2026_07_30, NORMAL);

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });
});

describe('command-guard judges the DECLARED base, not the name main', () => {
  test('blocks a push to the declared base `ilsun/dev`', () => {
    const violation = findMergeViolation('git push origin ilsun/dev', ON_DEV);

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks a fully-qualified refspec landing on the declared base', () => {
    const violation = findMergeViolation(
      'git push origin HEAD:refs/heads/ilsun/dev',
      ON_DEV
    );

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('passes a push to main in a repo whose declared base is ilsun/dev', () => {
    const violation = findMergeViolation('git push origin main', ON_DEV);

    expect(violation).toBeNull();
  });

  test('passes a push to master in a repo whose declared base is ilsun/dev', () => {
    const violation = findMergeViolation('git push origin master', ON_DEV);

    expect(violation).toBeNull();
  });

  test('keeps the legacy main|master match when no base is declared', () => {
    expect(findMergeViolation('git push origin main', NORMAL)?.reason).toBe(
      'merge_to_base_blocked'
    );
    expect(findMergeViolation('git push origin master', NORMAL)?.reason).toBe(
      'merge_to_base_blocked'
    );
  });
});

describe('command-guard fallback is never more permissive than argv', () => {
  /**
   * Break tokenization with a trailing unbalanced quote, leaving the command
   * otherwise identical.
   *
   * @param {string} cmd
   * @returns {string}
   */
  function unparseable(cmd) {
    return `${cmd} "`;
  }

  test('blocks both incident commands once they cannot be parsed', () => {
    for (const cmd of [INCIDENT_2026_07_30, INCIDENT_2026_07_29]) {
      const broken = unparseable(cmd);

      expect(tokenize(broken)).toBeNull();
      expect(findMergeViolation(broken, ON_MAIN)?.reason).toBe(
        'merge_to_base_blocked'
      );
    }
  });

  test('blocks every allowlist counterexample in unparseable form too', () => {
    const cases = [
      'git push origin main',
      '( cd /foreign ) && git push origin main',
      '( cd /foreign ) && ( git push origin main )',
      'false && cd /foreign; git push origin main'
    ];

    for (const cmd of cases) {
      const broken = unparseable(cmd);

      expect(tokenize(broken)).toBeNull();
      expect(findMergeViolation(broken, ON_MAIN)?.reason).toBe(
        'merge_to_base_blocked'
      );
    }
  });

  test('reaches the same verdict as argv for a non-base push under ilsun/dev', () => {
    const cmd = 'git push origin main';
    const broken = unparseable(cmd);

    expect(findMergeViolation(cmd, ON_DEV)).toBeNull();
    expect(tokenize(broken)).toBeNull();
    expect(findMergeViolation(broken, ON_DEV)).toBeNull();
  });

  test('blocks an unparseable push to the declared base ilsun/dev', () => {
    const broken = unparseable('git push origin ilsun/dev');

    expect(findMergeViolation(broken, ON_DEV)?.reason).toBe(
      'merge_to_base_blocked'
    );
  });

  test('builds the declared-base fallback regex and leaves the legacy one', () => {
    expect(baseLandingRegex(null)).toBe(BASE_LANDING_RE);
    expect(baseLandingRegex('ilsun/dev').test('git push origin main')).toBe(
      false
    );
    expect(
      baseLandingRegex('ilsun/dev').test('git push origin ilsun/dev')
    ).toBe(true);
  });
});
