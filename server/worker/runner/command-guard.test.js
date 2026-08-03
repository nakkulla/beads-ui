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
  BASE_PUSH_RE,
  GH_PR_MERGE_RE,
  basePushRegex,
  findMergeViolation,
  guardEffect,
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
      kind: 'gh_pr_merge',
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
      kind: 'gh_pr_merge',
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
      kind: 'gh_pr_merge',
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
      kind: 'gh_pr_merge',
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

  // The assignment sits behind `||` after a command that SUCCEEDS, so it never
  // runs and `$H` keeps whatever it already held — possibly the repo itself.
  // Reading the skipped `/foreign` as the destination would exempt a real base
  // landing (spec-delta review 2026-07-30).
  test('blocks a move through an assignment that may never have run', () => {
    const violation = findMergeViolation(
      'true || H=/foreign; cd "$H" && git push origin main',
      ON_MAIN
    );

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks a move whose assignment sits behind && too', () => {
    const violation = findMergeViolation(
      'test -d /x && H=/foreign; cd "$H" && git push origin main',
      ON_MAIN
    );

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  // Anything between the assignment and the move can rebind the variable in a
  // way no static read can see, so the visible assignment is a stale premise.
  test('blocks a move whose assignment is not the immediate predecessor', () => {
    const violation = findMergeViolation(
      'H=/foreign; eval \'H=/somewhere\'; cd "$H" && git push origin main',
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
    expect(basePushRegex(null)).toBe(BASE_PUSH_RE);
    expect(basePushRegex('ilsun/dev').test('git push origin main')).toBe(false);
    expect(basePushRegex('ilsun/dev').test('git push origin ilsun/dev')).toBe(
      true
    );
  });

  // The two split shapes replaced ONE alternation; the legacy union stays
  // exported so the split can be pinned against exactly what it covered.
  test('covers the legacy union with the two split shapes', () => {
    const cases = [
      'gh pr merge 311',
      'git push origin main',
      'git push origin HEAD:master',
      'git push origin UI-1',
      'echo hello'
    ];

    for (const cmd of cases) {
      expect(GH_PR_MERGE_RE.test(cmd) || BASE_PUSH_RE.test(cmd)).toBe(
        BASE_LANDING_RE.test(cmd)
      );
    }
  });
});

describe('command-guard fallback splits the two landing shapes', () => {
  /**
   * @param {string} cmd
   * @returns {string}
   */
  function unparseable(cmd) {
    return `${cmd} "`;
  }

  test('kills an unparseable `gh pr merge`', () => {
    const broken = unparseable('gh pr merge 311');

    expect(tokenize(broken)).toBeNull();
    const violation = findMergeViolation(broken, ON_MAIN);

    expect(violation?.kind).toBe('gh_pr_merge');
    expect(guardEffect(violation)).toBe('kill');
  });

  test('only warns on an unparseable base push', () => {
    const broken = unparseable('git push origin main');

    expect(tokenize(broken)).toBeNull();
    const violation = findMergeViolation(broken, ON_MAIN);

    expect(violation?.kind).toBe('git_push_base');
    expect(guardEffect(violation)).toBe('warn');
  });

  test('kills the `gh pr merge` half of an unparseable command that has both', () => {
    const broken = unparseable('git push origin main && gh pr merge 311');

    const violation = findMergeViolation(broken, ON_MAIN);

    expect(violation?.kind).toBe('gh_pr_merge');
  });
});

describe('command-guard allowlist proof gaps closed by the implementation gate', () => {
  test('blocks a move skipped by a short-circuiting ||', () => {
    // `true` succeeds, so `cd` never runs and the `&&` still reaches the push —
    // the operator between move and push says nothing about the move happening.
    const violation = findMergeViolation(
      'true || cd /foreign && git push origin main',
      ON_MAIN
    );

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks a NEGATED move, which runs the push when the move failed', () => {
    const violation = findMergeViolation(
      '! cd /missing && git push origin main',
      ON_MAIN
    );

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks an intervening eval that can move the shell back', () => {
    const violation = findMergeViolation(
      `cd /tmp && eval 'cd ${REPO}' && git push origin main`,
      ON_MAIN
    );

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks an intervening source', () => {
    const violation = findMergeViolation(
      'cd /tmp && source /x.sh && git push origin main',
      ON_MAIN
    );

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks an intervening pushd', () => {
    const violation = findMergeViolation(
      'cd /tmp && pushd /elsewhere && git push origin main',
      ON_MAIN
    );

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('still allows intervening commands that cannot move the shell', () => {
    const violation = findMergeViolation(
      'cd /opt/other-repo && git status && git push origin main',
      ON_MAIN
    );

    expect(violation).toBeNull();
  });

  test('allows an interpreter in between — a child cannot move its parent', () => {
    const violation = findMergeViolation(
      "cd /opt/other-repo && bash -c 'ls' && git push origin main",
      ON_MAIN
    );

    expect(violation).toBeNull();
  });

  test('blocks a move through a rebound HOME', () => {
    const violation = findMergeViolation(
      `HOME=${REPO}; cd "$HOME" && git push origin main`,
      ON_MAIN
    );

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks a single-quoted $HOME, which the shell never expands', () => {
    const violation = findMergeViolation(
      "cd '$HOME/GitHub/thalamus' && git push origin main",
      ON_MAIN
    );

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('blocks a quoted ~, which the shell never expands either', () => {
    const violation = findMergeViolation(
      'cd "~/GitHub/thalamus" && git push origin main',
      ON_MAIN
    );

    expect(violation?.reason).toBe('merge_to_base_blocked');
  });

  test('keeps a plain literal move resolvable even when HOME was rebound', () => {
    const violation = findMergeViolation(
      'HOME=/somewhere; cd /opt/other-repo && git push origin main',
      ON_MAIN
    );

    expect(violation).toBeNull();
  });
});

describe('command-guard destination matching is exact', () => {
  test('passes a branch that merely ends with the declared base name', () => {
    expect(
      findMergeViolation('git push origin HEAD:feature/main', ON_MAIN)
    ).toBeNull();
    expect(
      findMergeViolation('git push origin HEAD:feature/ilsun/dev', ON_DEV)
    ).toBeNull();
  });

  test('blocks the fully-qualified ref forms of the declared base', () => {
    expect(
      findMergeViolation('git push origin HEAD:refs/heads/main', ON_MAIN)
        ?.reason
    ).toBe('merge_to_base_blocked');
    expect(
      findMergeViolation('git push origin HEAD:heads/main', ON_MAIN)?.reason
    ).toBe('merge_to_base_blocked');
  });
});

describe('basePushRegex boundaries', () => {
  test('matches a base that ends in a non-word character', () => {
    expect(basePushRegex('foo-').test('git push origin foo-')).toBe(true);
  });

  test('still matches the base inside a full ref', () => {
    expect(
      basePushRegex('main').test('git push origin HEAD:refs/heads/main')
    ).toBe(true);
  });

  test('does not match a longer branch that starts with the base', () => {
    expect(basePushRegex('ilsun').test('git push origin ilsun/dev')).toBe(
      false
    );
  });

  test('blocks an unparseable push to a non-word-ending base', () => {
    const cmd = 'f(){ :; }; git push origin foo-';

    expect(tokenize(cmd)).toBeNull();
    expect(
      findMergeViolation(cmd, { repo: REPO, target_base: 'foo-' })?.reason
    ).toBe('merge_to_base_blocked');
  });
});

describe('command-guard effect table', () => {
  test('warns on a base push, whose judgment is now evidence only', () => {
    const violation = findMergeViolation('git push origin main', ON_MAIN);

    expect(violation?.kind).toBe('git_push_base');
    expect(guardEffect(violation)).toBe('warn');
  });

  test('kills `gh pr merge`, which no other layer covers', () => {
    const violation = findMergeViolation('gh pr merge 311', ON_MAIN);

    expect(violation?.kind).toBe('gh_pr_merge');
    expect(guardEffect(violation)).toBe('kill');
  });

  test('kills a hook-disabling command', () => {
    const violation = findMergeViolation(
      'git push --no-verify origin UI-1',
      ON_MAIN
    );

    expect(violation?.kind).toBe('hook_bypass');
    expect(guardEffect(violation)).toBe('kill');
  });

  test('kills `git merge`, unchanged by this Bead', () => {
    const violation = findMergeViolation('git merge origin/main', ON_MAIN);

    expect(violation?.kind).toBe('base_merge');
    expect(guardEffect(violation)).toBe('kill');
  });

  test('kills an unknown kind, so a new kind fails closed', () => {
    const effect = guardEffect(
      /** @type {any} */ ({ kind: 'something_new', command: 'x' })
    );

    expect(effect).toBe('kill');
  });
});

describe('command-guard hook-bypass detection', () => {
  test('kills `git push --no-verify`', () => {
    const violation = findMergeViolation(
      'git push --no-verify origin UI-1',
      ON_MAIN
    );

    expect(violation).toEqual({
      kind: 'hook_bypass',
      reason: 'hook_bypass_blocked',
      command: 'git push --no-verify origin UI-1'
    });
  });

  test('kills `git -c core.hooksPath=`', () => {
    const violation = findMergeViolation(
      'git -c core.hooksPath=/dev/null push origin UI-1',
      ON_MAIN
    );

    expect(violation?.reason).toBe('hook_bypass_blocked');
  });

  test('kills `git config core.hooksPath`', () => {
    const violation = findMergeViolation(
      'git config --global core.hooksPath /tmp/empty-hooks',
      ON_MAIN
    );

    expect(violation?.reason).toBe('hook_bypass_blocked');
  });

  test('kills a GIT_CONFIG_* assignment prefix', () => {
    const violation = findMergeViolation(
      'GIT_CONFIG_COUNT=0 git push origin UI-1',
      ON_MAIN
    );

    expect(violation?.reason).toBe('hook_bypass_blocked');
  });

  test('kills a GIT_CONFIG_KEY_/VALUE_ redefinition', () => {
    const violation = findMergeViolation(
      'GIT_CONFIG_KEY_0=core.hooksPath GIT_CONFIG_VALUE_0=/tmp/x git push origin UI-1',
      ON_MAIN
    );

    expect(violation?.reason).toBe('hook_bypass_blocked');
  });

  test('kills a bare GIT_CONFIG_COUNT assignment, which needs no command', () => {
    const violation = findMergeViolation(
      'GIT_CONFIG_COUNT=0; git push origin UI-1',
      ON_MAIN
    );

    expect(violation?.reason).toBe('hook_bypass_blocked');
  });

  test('kills the hooks-path override behind the env wrapper', () => {
    const violation = findMergeViolation(
      'env GIT_CONFIG_COUNT=0 git push origin UI-1',
      ON_MAIN
    );

    expect(violation?.reason).toBe('hook_bypass_blocked');
  });

  test('kills a hook bypass inside a `bash -c` payload', () => {
    const violation = findMergeViolation(
      'bash -c "git push --no-verify origin UI-1"',
      ON_MAIN
    );

    expect(violation?.reason).toBe('hook_bypass_blocked');
  });

  // `-n` is `--dry-run`: it pushes nothing and runs no hook bypass.
  test('passes `git push -n`, which is a dry run', () => {
    expect(findMergeViolation('git push -n origin UI-1', ON_MAIN)).toBeNull();
    expect(
      findMergeViolation('git push --dry-run origin UI-1', ON_MAIN)
    ).toBeNull();
  });

  test('passes an unrelated assignment prefix and an unrelated -c', () => {
    expect(
      findMergeViolation('GIT_CONFIG_GLOBAL=/dev/null git status', ON_MAIN)
    ).toBeNull();
    expect(
      findMergeViolation('git -c user.name=x commit -m y', ON_MAIN)
    ).toBeNull();
  });

  test('passes a command that merely mentions the flag as text', () => {
    expect(
      findMergeViolation('rg -n "core.hooksPath" docs/', ON_MAIN)
    ).toBeNull();
    expect(
      findMergeViolation('git commit -m "no --no-verify here"', ON_MAIN)
    ).toBeNull();
  });

  test('kills a hook bypass ahead of a base push, the stricter effect', () => {
    const violation = findMergeViolation(
      'git push --no-verify origin main',
      ON_MAIN
    );

    expect(violation?.kind).toBe('hook_bypass');
  });
});

describe('command-guard keeps `gh pr merge` kill on every shape', () => {
  test('kills a merge aimed at ANOTHER repository', () => {
    const violation = findMergeViolation(
      'gh pr merge 12 --repo nakkulla/other --squash',
      ON_MAIN
    );

    expect(violation?.kind).toBe('gh_pr_merge');
    expect(guardEffect(violation)).toBe('kill');
  });

  test('kills `gh pr merge` on a disposition session too', () => {
    const violation = findMergeViolation('gh pr merge 311', {
      ...ON_MAIN,
      disposition: true
    });

    expect(guardEffect(violation)).toBe('kill');
  });

  // gh takes its flags interspersed: both forms below are accepted by gh 2.x
  // and both merge, so a fixed argv[1]/argv[2] test would let a real merge run.
  test('kills a merge whose repo override sits BEFORE the subcommand', () => {
    const violation = findMergeViolation(
      'gh pr --repo nakkulla/other merge 12',
      ON_MAIN
    );

    expect(violation?.kind).toBe('gh_pr_merge');
    expect(guardEffect(violation)).toBe('kill');
  });

  test('kills a merge whose `-R` override sits ahead of `pr`', () => {
    const violation = findMergeViolation(
      'gh -R nakkulla/other pr merge 12',
      ON_MAIN
    );

    expect(violation?.kind).toBe('gh_pr_merge');
  });

  test('kills a merge with an attached `--repo=` override', () => {
    expect(
      findMergeViolation('gh pr --repo=nakkulla/other merge 12', ON_MAIN)?.kind
    ).toBe('gh_pr_merge');
  });

  test('passes a gh command whose ARGUMENT merely reads `pr merge`', () => {
    expect(
      findMergeViolation("gh pr create --title 'pr merge' --body x", ON_MAIN)
    ).toBeNull();
    expect(findMergeViolation('gh issue list --repo a/b', ON_MAIN)).toBeNull();
  });
});

describe('command-guard fallback catches a hook bypass the tokenizer refused', () => {
  // A function definition makes the tokenizer refuse the whole input, which is
  // the fallback's entire purpose — and the fallback must never be MORE
  // permissive than the argv path, so a bypass there stays a kill instead of
  // being demoted to the base-push warning.
  test('kills `--no-verify` hidden behind a function definition', () => {
    const violation = findMergeViolation(
      'f() { :; }; git push --no-verify origin HEAD:main',
      ON_MAIN
    );

    expect(violation?.kind).toBe('hook_bypass');
    expect(guardEffect(violation)).toBe('kill');
  });

  test('kills a relocated hooks path behind a function definition', () => {
    expect(
      findMergeViolation(
        'f() { :; }; git -c core.hooksPath=/tmp/x push origin UI-1',
        ON_MAIN
      )?.kind
    ).toBe('hook_bypass');
    expect(
      findMergeViolation(
        'f() { :; }; git config core.hooksPath /tmp/x',
        ON_MAIN
      )?.kind
    ).toBe('hook_bypass');
  });

  test('kills a GIT_CONFIG_* redefinition behind a function definition', () => {
    expect(
      findMergeViolation(
        'f() { :; }; GIT_CONFIG_COUNT=0 git push origin UI-1',
        ON_MAIN
      )?.kind
    ).toBe('hook_bypass');
  });

  test('leaves a disposition session alone on the same input', () => {
    expect(
      findMergeViolation('f() { :; }; git push --no-verify origin UI-1', {
        ...ON_MAIN,
        disposition: true
      })
    ).toBeNull();
  });
});

describe('command-guard demotes the base-landing judgment to a warning', () => {
  /**
   * @param {string} cmd
   * @returns {string}
   */
  function unparseable(cmd) {
    return `${cmd} "`;
  }

  // The two measured incidents stay JUDGED (the fallback still fires when the
  // command cannot be parsed) but no longer cost the session its life.
  test('warns instead of killing on both unparseable incident commands', () => {
    for (const cmd of [INCIDENT_2026_07_30, INCIDENT_2026_07_29]) {
      const violation = findMergeViolation(unparseable(cmd), ON_MAIN);

      expect(violation?.reason).toBe('merge_to_base_blocked');
      expect(guardEffect(violation)).toBe('warn');
    }
  });

  test('warns on every allowlist counterexample', () => {
    const cases = [
      'git push origin main',
      '( cd /foreign ) && git push origin main',
      '( cd /foreign ) && ( git push origin main )',
      'false && cd /foreign; git push origin main',
      'f(){ cd /foreign; }; git push origin main'
    ];

    for (const cmd of cases) {
      const violation = findMergeViolation(cmd, ON_MAIN);

      expect(violation?.reason).toBe('merge_to_base_blocked');
      expect(guardEffect(violation)).toBe('warn');
    }
  });
});

describe('command-guard excludes a disposition session', () => {
  const DISPOSING = { ...ON_MAIN, disposition: true };

  test('passes a base push, which is the disposition session job', () => {
    expect(findMergeViolation('git push origin main', DISPOSING)).toBeNull();
    expect(
      findMergeViolation('git push origin HEAD:refs/heads/main', DISPOSING)
    ).toBeNull();
  });

  test('passes an unparseable base push too', () => {
    expect(findMergeViolation('git push origin main "', DISPOSING)).toBeNull();
  });

  test('passes the hook-bypass forms, whose hook is never installed', () => {
    expect(
      findMergeViolation('git push --no-verify origin main', DISPOSING)
    ).toBeNull();
    expect(
      findMergeViolation('GIT_CONFIG_COUNT=0 git push origin main', DISPOSING)
    ).toBeNull();
  });

  test('still blocks `git merge`, which disposition does not need', () => {
    expect(findMergeViolation('git merge origin/main', DISPOSING)?.kind).toBe(
      'base_merge'
    );
  });

  test('defaults to NOT disposition when the flag is absent or untrue', () => {
    expect(findMergeViolation('git push origin main', ON_MAIN)?.kind).toBe(
      'git_push_base'
    );
    expect(
      findMergeViolation(
        'git push origin main',
        /** @type {any} */ ({ ...ON_MAIN, disposition: 'yes' })
      )?.kind
    ).toBe('git_push_base');
  });
});
