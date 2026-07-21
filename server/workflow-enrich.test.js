import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  _clearStaleCache,
  computeStale,
  enrichIssueWorkflow,
  parseReceipt
} from './workflow-enrich.js';

/** @type {string[]} */
const tmp_dirs = [];

/**
 * Create a throwaway git repo and return its absolute path.
 *
 * @returns {string}
 */
function makeRepo() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'wf-enrich-'));
  tmp_dirs.push(dir);
  git(dir, ['init', '-q']);
  git(dir, ['config', 'user.email', 'test@example.com']);
  git(dir, ['config', 'user.name', 'Test']);
  git(dir, ['config', 'commit.gpgsign', 'false']);
  return dir;
}

/**
 * @param {string} cwd
 * @param {string[]} args
 * @returns {string}
 */
function git(cwd, args) {
  return execFileSync('git', args, { cwd, encoding: 'utf8' }).trim();
}

/**
 * @param {string} dir
 * @param {string} rel
 * @param {string} content
 */
function writeFile(dir, rel, content) {
  const abs = path.join(dir, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content);
}

/**
 * @param {string} dir
 * @param {string} message
 * @returns {string} commit sha
 */
function commitAll(dir, message) {
  git(dir, ['add', '-A']);
  git(dir, ['commit', '-q', '-m', message]);
  return git(dir, ['rev-parse', 'HEAD']);
}

beforeEach(() => {
  _clearStaleCache();
});

afterEach(() => {
  while (tmp_dirs.length > 0) {
    const dir = tmp_dirs.pop();
    if (dir) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  }
});

describe('parseReceipt', () => {
  test('parses a review receipt', () => {
    const r = parseReceipt('codex@' + 'a'.repeat(40));
    expect(r).toEqual({
      reviewer: 'codex',
      sha: 'a'.repeat(40),
      is_skip: false
    });
  });

  test('flags a skip receipt as is_skip', () => {
    const r = parseReceipt('skipped@' + 'b'.repeat(40));
    expect(r?.is_skip).toBe(true);
    expect(r?.sha).toBe('b'.repeat(40));
  });

  test('returns null for malformed input', () => {
    expect(parseReceipt('nope')).toBeNull();
    expect(parseReceipt(undefined)).toBeNull();
    expect(parseReceipt('codex@zzz')).toBeNull();
  });
});

describe('computeStale — spec_review', () => {
  test('a follow-up commit touching the spec doc marks spec_stale', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/spec.md', '# spec v1\n');
    const sha = commitAll(dir, 'add spec');
    // Follow-up commit that modifies the spec doc itself.
    writeFile(dir, 'docs/spec.md', '# spec v1\nmore\n');
    commitAll(dir, 'revise spec');

    const { spec_stale } = computeStale(
      { spec_id: 'docs/spec.md', spec_review: 'codex@' + sha },
      dir
    );
    expect(spec_stale).toBe(true);
  });

  test('a commit touching an unrelated path does not mark spec_stale', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/spec.md', '# spec v1\n');
    const sha = commitAll(dir, 'add spec');
    // Follow-up commit touching a different path only.
    writeFile(dir, 'src/other.js', 'export const x = 1;\n');
    commitAll(dir, 'unrelated change');

    const { spec_stale } = computeStale(
      { spec_id: 'docs/spec.md', spec_review: 'opus@' + sha },
      dir
    );
    expect(spec_stale).toBe(false);
  });

  test('a skip spec receipt is never stale', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/spec.md', '# spec v1\n');
    const sha = commitAll(dir, 'add spec');
    writeFile(dir, 'docs/spec.md', '# spec v1\nchanged\n');
    commitAll(dir, 'revise spec');

    const { spec_stale } = computeStale(
      { spec_id: 'docs/spec.md', spec_review: 'skipped@' + sha },
      dir
    );
    expect(spec_stale).toBe(false);
  });
});

describe('computeStale — impl_review', () => {
  test('impl_stale is true when HEAD != receipt sha', () => {
    const dir = makeRepo();
    writeFile(dir, 'a.txt', '1\n');
    const sha = commitAll(dir, 'first');
    writeFile(dir, 'a.txt', '2\n');
    commitAll(dir, 'second'); // HEAD advances past sha

    const { impl_stale } = computeStale({ impl_review: 'opus@' + sha }, dir);
    expect(impl_stale).toBe(true);
  });

  test('impl_stale is false when HEAD == receipt sha', () => {
    const dir = makeRepo();
    writeFile(dir, 'a.txt', '1\n');
    const sha = commitAll(dir, 'first');

    const { impl_stale } = computeStale({ impl_review: 'opus@' + sha }, dir);
    expect(impl_stale).toBe(false);
  });
});

describe('computeStale — fail-quiet', () => {
  test('missing workspace / bad sha never marks stale (no throw)', () => {
    const { spec_stale, impl_stale } = computeStale(
      {
        spec_id: 'docs/spec.md',
        spec_review: 'codex@' + 'f'.repeat(40),
        impl_review: 'opus@' + 'e'.repeat(40)
      },
      '/nonexistent/workspace/path'
    );
    expect(spec_stale).toBe(false);
    expect(impl_stale).toBe(false);
  });

  test('missing receipt sha yields not-stale', () => {
    const dir = makeRepo();
    writeFile(dir, 'a.txt', '1\n');
    commitAll(dir, 'first');
    const { spec_stale, impl_stale } = computeStale(
      { spec_id: 'docs/spec.md' },
      dir
    );
    expect(spec_stale).toBe(false);
    expect(impl_stale).toBe(false);
  });
});

describe('enrichIssueWorkflow', () => {
  test('downgrades a stale spec review to state=stale', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/spec.md', '# spec\n');
    const sha = commitAll(dir, 'add spec');
    writeFile(dir, 'docs/spec.md', '# spec\nedit\n');
    commitAll(dir, 'revise spec');

    const wf = enrichIssueWorkflow(
      {
        status: 'in_progress',
        metadata: {
          route: 'spec_backed',
          spec_id: 'docs/spec.md',
          spec_review: 'codex@' + sha
        }
      },
      dir
    );
    expect(wf.stages.spec.state).toBe('stale');
    expect(wf.stages.spec.stale).toBe(true);
    expect(wf.route).toBe('spec_backed');
    expect(wf.stages.plan).toBeUndefined();
  });

  test('full_plan route adds a plan stage and parses PR chip', () => {
    const dir = makeRepo();
    writeFile(dir, 'x.txt', '1\n');
    commitAll(dir, 'init');
    const wf = enrichIssueWorkflow(
      {
        status: 'resolved',
        metadata: {
          route: 'full_plan',
          plan_path: 'docs/plan.md',
          pr_url: 'https://github.com/o/r/pull/42',
          workflow_mode: 'fast_track'
        }
      },
      dir
    );
    expect(wf.route).toBe('full_plan');
    expect(wf.stages.plan?.state).toBe('on');
    expect(wf.stages.pr.state).toBe('on');
    expect(wf.stages.merge.state).toBe('dim');
    expect(wf.chips.fast_track).toBe(true);
    expect(wf.chips.pr).toEqual({ number: 42 });
  });
});

describe('planStage (full_plan)', () => {
  test('no plan_path → empty', () => {
    const dir = makeRepo();
    writeFile(dir, 'x.txt', '1\n');
    commitAll(dir, 'init');
    const wf = enrichIssueWorkflow(
      { status: 'in_progress', metadata: { route: 'full_plan' } },
      dir
    );
    expect(wf.stages.plan?.state).toBe('empty');
  });

  test('valid user receipt, fresh → reviewed', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/plan.md', '# plan\n');
    const sha = commitAll(dir, 'add plan');
    const wf = enrichIssueWorkflow(
      {
        status: 'in_progress',
        metadata: {
          route: 'full_plan',
          plan_path: 'docs/plan.md',
          plan_review: 'user@' + sha
        }
      },
      dir
    );
    expect(wf.stages.plan?.state).toBe('reviewed');
    expect(wf.stages.plan?.stale).toBe(false);
  });

  test('valid user receipt, later commit touches plan → stale', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/plan.md', '# plan\n');
    const sha = commitAll(dir, 'add plan');
    writeFile(dir, 'docs/plan.md', '# plan\nrevised\n');
    commitAll(dir, 'revise plan');
    const wf = enrichIssueWorkflow(
      {
        status: 'in_progress',
        metadata: {
          route: 'full_plan',
          plan_path: 'docs/plan.md',
          plan_review: 'user@' + sha
        }
      },
      dir
    );
    expect(wf.stages.plan?.state).toBe('stale');
    expect(wf.stages.plan?.stale).toBe(true);
  });

  test('invalid receipt (skipped@) → dim, raw receipt exposed', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/plan.md', '# plan\n');
    const sha = commitAll(dir, 'add plan');
    const raw = 'skipped@' + sha;
    const wf = enrichIssueWorkflow(
      {
        status: 'in_progress',
        metadata: {
          route: 'full_plan',
          plan_path: 'docs/plan.md',
          plan_review: raw
        }
      },
      dir
    );
    expect(wf.stages.plan?.state).toBe('dim');
    expect(wf.stages.plan?.receipt).toBe(raw);
  });

  test('no plan_review key + closed → on (legacy approval)', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/plan.md', '# plan\n');
    commitAll(dir, 'add plan');
    const wf = enrichIssueWorkflow(
      {
        status: 'closed',
        metadata: { route: 'full_plan', plan_path: 'docs/plan.md' }
      },
      dir
    );
    expect(wf.stages.plan?.state).toBe('on');
  });

  test('no plan_review key + in_progress → dim (draft pending)', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/plan.md', '# plan\n');
    commitAll(dir, 'add plan');
    const wf = enrichIssueWorkflow(
      {
        status: 'in_progress',
        metadata: { route: 'full_plan', plan_path: 'docs/plan.md' }
      },
      dir
    );
    expect(wf.stages.plan?.state).toBe('dim');
    expect(wf.stages.plan?.receipt).toBeNull();
  });

  test('worktree-dirty plan (uncommitted overwrite) → stale', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/plan.md', '# plan\n');
    const sha = commitAll(dir, 'add plan');
    // HEAD still == sha (no follow-up commit), but the working copy is dirty.
    writeFile(dir, 'docs/plan.md', '# plan\nuncommitted\n');
    const wf = enrichIssueWorkflow(
      {
        status: 'in_progress',
        metadata: {
          route: 'full_plan',
          plan_path: 'docs/plan.md',
          plan_review: 'user@' + sha
        }
      },
      dir
    );
    expect(wf.stages.plan?.state).toBe('stale');
  });

  test('worktree-dirty check bypasses the stale_cache', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/plan.md', '# plan\n');
    const sha = commitAll(dir, 'add plan');
    const md = {
      route: 'full_plan',
      plan_path: 'docs/plan.md',
      plan_review: 'user@' + sha
    };
    // First pass: clean worktree → reviewed, which caches the git-log probe
    // under the (unchanged) HEAD key.
    const first = enrichIssueWorkflow(
      { status: 'in_progress', metadata: md },
      dir
    );
    expect(first.stages.plan?.state).toBe('reviewed');
    // Dirty the plan WITHOUT advancing HEAD — the git-log cache still says
    // "unchanged", so only a cache-bypassing dirty probe can flip it to stale.
    writeFile(dir, 'docs/plan.md', '# plan\ndirtied\n');
    const second = enrichIssueWorkflow(
      { status: 'in_progress', metadata: md },
      dir
    );
    expect(second.stages.plan?.state).toBe('stale');
  });
});
