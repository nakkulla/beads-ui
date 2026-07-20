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
