/**
 * The argv-position merge guard (UI-2o4z §1). The regexes it replaced could not
 * tell a command from a quoted argument; these tests pin BOTH directions — the
 * false positives that must now pass, and the evasions that must still block.
 */
import { describe, expect, test } from 'vitest';
import {
  BASE_INTO_BRANCH_RE,
  BASE_LANDING_RE,
  findMergeViolation,
  tokenize
} from './command-guard.js';

const NORMAL = {};
const RESOLVING = { conflict_resolution: true };

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
