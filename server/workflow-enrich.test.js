import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  _clearStaleCache,
  classifyGlyph,
  computeStale,
  enrichIssueWorkflow,
  parsePlanReceipt,
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

  test('a skip spec receipt is stale like any other (no exemption)', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/spec.md', '# spec v1\n');
    const sha = commitAll(dir, 'add spec');
    writeFile(dir, 'docs/spec.md', '# spec v1\nchanged\n');
    commitAll(dir, 'revise spec');

    const { spec_stale } = computeStale(
      { spec_id: 'docs/spec.md', spec_review: 'skipped@' + sha },
      dir
    );
    expect(spec_stale).toBe(true);
  });
});

describe('computeStale — impl_review (Bead branch tip)', () => {
  test('branch tip == receipt sha → fresh', () => {
    const dir = makeRepo();
    writeFile(dir, 'a.txt', '1\n');
    const sha = commitAll(dir, 'first');
    git(dir, ['branch', 'UI-1']);

    const { impl_stale } = computeStale(
      { impl_review: 'opus@' + sha },
      dir,
      'UI-1'
    );
    expect(impl_stale).toBe(false);
  });

  test('an abbreviated or upper-case receipt sha at the tip stays fresh', () => {
    const dir = makeRepo();
    writeFile(dir, 'a.txt', '1\n');
    const sha = commitAll(dir, 'first');
    git(dir, ['branch', 'UI-1']);

    const short = computeStale(
      { impl_review: 'opus@' + sha.slice(0, 12) },
      dir,
      'UI-1'
    );
    const upper = computeStale(
      { impl_review: 'opus@' + sha.toUpperCase() },
      dir,
      'UI-1'
    );

    expect(short.impl_stale).toBe(false);
    expect(upper.impl_stale).toBe(false);
  });

  test('commits landed on the Bead branch after the receipt → stale', () => {
    const dir = makeRepo();
    writeFile(dir, 'a.txt', '1\n');
    const sha = commitAll(dir, 'first');
    git(dir, ['checkout', '-q', '-b', 'UI-1']);
    writeFile(dir, 'a.txt', '2\n');
    commitAll(dir, 'REVISE batch fix');

    const { impl_stale } = computeStale(
      { impl_review: 'opus@' + sha },
      dir,
      'UI-1'
    );
    expect(impl_stale).toBe(true);
  });

  test('no Bead branch (merged and deleted) → fresh', () => {
    const dir = makeRepo();
    writeFile(dir, 'a.txt', '1\n');
    const sha = commitAll(dir, 'first');
    writeFile(dir, 'a.txt', '2\n');
    commitAll(dir, 'squash-merged work');

    const { impl_stale } = computeStale(
      { impl_review: 'opus@' + sha },
      dir,
      'UI-1'
    );
    expect(impl_stale).toBe(false);
  });

  test('missing bead_id → fresh (rule does not apply)', () => {
    const dir = makeRepo();
    writeFile(dir, 'a.txt', '1\n');
    const sha = commitAll(dir, 'first');
    writeFile(dir, 'a.txt', '2\n');
    commitAll(dir, 'second');

    const { impl_stale } = computeStale({ impl_review: 'opus@' + sha }, dir);
    expect(impl_stale).toBe(false);
  });

  test('a distractor branch parked on the receipt sha does not fake freshness', () => {
    const dir = makeRepo();
    writeFile(dir, 'a.txt', '1\n');
    const sha = commitAll(dir, 'first');
    // Unrelated branch stays at the receipt sha; the Bead branch advances.
    git(dir, ['branch', 'unrelated']);
    git(dir, ['checkout', '-q', '-b', 'UI-1']);
    writeFile(dir, 'a.txt', '2\n');
    commitAll(dir, 'post-review commit');

    const { impl_stale } = computeStale(
      { impl_review: 'opus@' + sha },
      dir,
      'UI-1'
    );
    expect(impl_stale).toBe(true);
  });

  test('a skip impl receipt is stale like any other (no exemption)', () => {
    const dir = makeRepo();
    writeFile(dir, 'a.txt', '1\n');
    const sha = commitAll(dir, 'first');
    git(dir, ['checkout', '-q', '-b', 'UI-1']);
    writeFile(dir, 'a.txt', '2\n');
    commitAll(dir, 'post-review commit');

    const { impl_stale } = computeStale(
      { impl_review: 'skipped@' + sha },
      dir,
      'UI-1'
    );
    expect(impl_stale).toBe(true);
  });
});

describe('classifyGlyph', () => {
  test('maps every contract reviewer token to review evidence', () => {
    for (const reviewer of ['codex', 'opus', 'fable', 'self', 'triage']) {
      expect(classifyGlyph(parseReceipt(reviewer + '@' + 'a'.repeat(40)))).toBe(
        'review'
      );
    }
  });

  test('maps skipped to skip', () => {
    expect(classifyGlyph(parseReceipt('skipped@' + 'a'.repeat(40)))).toBe(
      'skip'
    );
  });

  test('returns null for a token outside the contract enumeration', () => {
    expect(classifyGlyph(parseReceipt('user@' + 'a'.repeat(40)))).toBeNull();
    expect(classifyGlyph(parseReceipt('codx@' + 'a'.repeat(40)))).toBeNull();
    expect(classifyGlyph(null)).toBeNull();
  });
});

describe('parsePlanReceipt', () => {
  test('accepts user, triage and codex with a full 40-hex sha', () => {
    for (const reviewer of ['user', 'triage', 'codex']) {
      expect(parsePlanReceipt(reviewer + '@' + 'a'.repeat(40))).toEqual({
        reviewer,
        sha: 'a'.repeat(40),
        is_skip: false
      });
    }
  });

  test('rejects skipped, other reviewers and short shas', () => {
    expect(parsePlanReceipt('skipped@' + 'a'.repeat(40))).toBeNull();
    expect(parsePlanReceipt('opus@' + 'a'.repeat(40))).toBeNull();
    expect(parsePlanReceipt('user@' + 'a'.repeat(12))).toBeNull();
    expect(parsePlanReceipt(undefined)).toBeNull();
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
    expect(wf.stages.spec.fill).toBe('dim');
    expect(wf.stages.spec.glyph).toBe('review');
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
    expect(wf.stages.plan?.fill).toBe('full');
    expect(wf.stages.plan?.glyph).toBeNull();
    expect(wf.stages.pr.fill).toBe('full');
    expect(wf.stages.merge.fill).toBe('dim');
    expect(wf.chips.fast_track).toBe(true);
    expect(wf.chips.pr).toEqual({ number: 42 });
  });

  test('route_source distinguishes an explicit pin from a derived fallback (§6)', () => {
    const dir = makeRepo();
    writeFile(dir, 'x.txt', '1\n');
    commitAll(dir, 'init');

    const pinned = enrichIssueWorkflow(
      { status: 'open', metadata: { route: 'spec_backed' } },
      dir
    );
    expect(pinned.route_source).toBe('explicit');
    expect(pinned.chips.route_source).toBe('explicit');

    // Absent pin → derived; a plan_path still infers full_plan but stays derived.
    const inferred = enrichIssueWorkflow(
      { status: 'open', metadata: { plan_path: 'docs/plan.md' } },
      dir
    );
    expect(inferred.route).toBe('full_plan');
    expect(inferred.route_source).toBe('derived');

    // An invalid pin value is NOT explicit.
    const invalid = enrichIssueWorkflow(
      { status: 'open', metadata: { route: 'quick_fix' } },
      dir
    );
    expect(invalid.route_source).toBe('derived');
  });
});

describe('implStage', () => {
  test('a receipt-less resolved bead fills impl with no glyph (§4.1)', () => {
    const dir = makeRepo();
    writeFile(dir, 'x.txt', '1\n');
    commitAll(dir, 'init');

    for (const status of ['resolved', 'closed']) {
      const wf = enrichIssueWorkflow(
        { id: 'UI-1', status, metadata: { route: 'spec_backed' } },
        dir
      );
      expect(wf.stages.impl.fill).toBe('full');
      expect(wf.stages.impl.glyph).toBeNull();
    }
  });

  test('in_progress and pr_url stay dim', () => {
    const dir = makeRepo();
    writeFile(dir, 'x.txt', '1\n');
    commitAll(dir, 'init');

    const running = enrichIssueWorkflow(
      { id: 'UI-1', status: 'in_progress', metadata: {} },
      dir
    );
    const with_pr = enrichIssueWorkflow(
      {
        id: 'UI-1',
        status: 'open',
        metadata: { pr_url: 'https://github.com/o/r/pull/1' }
      },
      dir
    );

    expect(running.stages.impl.fill).toBe('dim');
    expect(with_pr.stages.impl.fill).toBe('dim');
  });

  test('an untouched open bead leaves impl empty', () => {
    const dir = makeRepo();
    writeFile(dir, 'x.txt', '1\n');
    commitAll(dir, 'init');

    const wf = enrichIssueWorkflow(
      { id: 'UI-1', status: 'open', metadata: {} },
      dir
    );

    expect(wf.stages.impl.fill).toBe('none');
  });

  test('a receipt outside the contract enumeration fills without a glyph', () => {
    const dir = makeRepo();
    writeFile(dir, 'x.txt', '1\n');
    const sha = commitAll(dir, 'init');
    git(dir, ['branch', 'UI-1']);

    const wf = enrichIssueWorkflow(
      {
        id: 'UI-1',
        status: 'in_progress',
        metadata: { impl_review: 'user@' + sha }
      },
      dir
    );

    expect(wf.stages.impl.fill).toBe('full');
    expect(wf.stages.impl.glyph).toBeNull();
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
    expect(wf.stages.plan?.fill).toBe('none');
  });

  test('new review and approval receipts stay separate', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/plan.md', '# plan\n');
    const approval_sha = commitAll(dir, 'add plan');
    const review = 'codex@' + 'b'.repeat(12);
    const approval = 'user@' + approval_sha;

    const wf = enrichIssueWorkflow(
      {
        status: 'in_progress',
        metadata: {
          route: 'full_plan',
          plan_path: 'docs/plan.md',
          plan_review: review,
          plan_approval: approval
        }
      },
      dir
    );

    expect(wf.stages.plan).toMatchObject({
      fill: 'full',
      glyph: 'review',
      stale: false,
      receipt: review,
      approval_receipt: approval,
      approval_state: 'fresh'
    });
  });

  test('legacy plan_check and plan_review=user map to review and approval', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/plan.md', '# plan\n');
    const approval_sha = commitAll(dir, 'add plan');
    const review = 'fable@' + 'c'.repeat(12);
    const approval = 'user@' + approval_sha;

    const wf = enrichIssueWorkflow(
      {
        status: 'in_progress',
        metadata: {
          route: 'full_plan',
          plan_path: 'docs/plan.md',
          plan_check: review,
          plan_review: approval
        }
      },
      dir
    );

    expect(wf.stages.plan).toMatchObject({
      fill: 'full',
      glyph: 'review',
      receipt: review,
      approval_receipt: approval,
      approval_state: 'fresh'
    });
  });

  test('new skipped review keeps approval independent', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/plan.md', '# plan\n');
    const approval_sha = commitAll(dir, 'add plan');

    const wf = enrichIssueWorkflow(
      {
        status: 'in_progress',
        metadata: {
          route: 'full_plan',
          plan_path: 'docs/plan.md',
          plan_review: 'skipped@' + 'd'.repeat(12),
          plan_approval: 'user@' + approval_sha
        }
      },
      dir
    );

    expect(wf.stages.plan).toMatchObject({
      fill: 'full',
      glyph: 'skip',
      approval_state: 'fresh'
    });
  });

  test('malformed new approval never falls back to legacy plan_review', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/plan.md', '# plan\n');
    const approval_sha = commitAll(dir, 'add plan');

    const wf = enrichIssueWorkflow(
      {
        status: 'in_progress',
        metadata: {
          route: 'full_plan',
          plan_path: 'docs/plan.md',
          plan_check: 'codex@' + 'e'.repeat(12),
          plan_review: 'user@' + approval_sha,
          plan_approval: 'user@not-a-sha'
        }
      },
      dir
    );

    expect(wf.stages.plan).toMatchObject({
      fill: 'dim',
      glyph: null,
      approval_receipt: 'user@not-a-sha',
      approval_state: 'missing'
    });
  });

  test('new review without approval remains visible while approval is pending', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/plan.md', '# plan\n');
    commitAll(dir, 'add plan');

    const wf = enrichIssueWorkflow(
      {
        status: 'in_progress',
        metadata: {
          route: 'full_plan',
          plan_path: 'docs/plan.md',
          plan_review: 'self@' + 'f'.repeat(12)
        }
      },
      dir
    );

    expect(wf.stages.plan).toMatchObject({
      fill: 'dim',
      glyph: 'review',
      approval_receipt: null,
      approval_state: 'missing'
    });
  });

  test('new approval becomes stale after a committed or dirty plan change', () => {
    const committed_dir = makeRepo();
    writeFile(committed_dir, 'docs/plan.md', '# plan\n');
    const committed_sha = commitAll(committed_dir, 'add plan');
    writeFile(committed_dir, 'docs/plan.md', '# plan\nchanged\n');
    commitAll(committed_dir, 'change plan');

    const committed = enrichIssueWorkflow(
      {
        status: 'in_progress',
        metadata: {
          route: 'full_plan',
          plan_path: 'docs/plan.md',
          plan_review: 'codex@' + '1'.repeat(12),
          plan_approval: 'user@' + committed_sha
        }
      },
      committed_dir
    );

    const dirty_dir = makeRepo();
    writeFile(dirty_dir, 'docs/plan.md', '# plan\n');
    const dirty_sha = commitAll(dirty_dir, 'add plan');
    writeFile(dirty_dir, 'docs/plan.md', '# plan\ndirty\n');
    const dirty = enrichIssueWorkflow(
      {
        status: 'in_progress',
        metadata: {
          route: 'full_plan',
          plan_path: 'docs/plan.md',
          plan_review: 'codex@' + '2'.repeat(12),
          plan_approval: 'user@' + dirty_sha
        }
      },
      dirty_dir
    );

    expect(committed.stages.plan).toMatchObject({
      fill: 'dim',
      stale: true,
      approval_state: 'stale'
    });
    expect(dirty.stages.plan).toMatchObject({
      fill: 'dim',
      stale: true,
      approval_state: 'stale'
    });
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
    expect(wf.stages.plan?.fill).toBe('full');
    expect(wf.stages.plan?.glyph).toBeNull();
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
    expect(wf.stages.plan?.fill).toBe('dim');
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
    expect(wf.stages.plan?.fill).toBe('dim');
    expect(wf.stages.plan?.glyph).toBeNull();
    expect(wf.stages.plan?.receipt).toBe(raw);
  });

  test('present null/non-string plan_review + closed → dim, never legacy on', () => {
    // hasOwn presence: a present-but-invalid value must not collapse into
    // "key absent" and reach the legacy-approval branch.
    const dir = makeRepo();
    writeFile(dir, 'docs/plan.md', '# plan\n');
    commitAll(dir, 'add plan');
    for (const bad of [null, 123]) {
      const wf = enrichIssueWorkflow(
        {
          status: 'closed',
          metadata: {
            route: 'full_plan',
            plan_path: 'docs/plan.md',
            plan_review: bad
          }
        },
        dir
      );
      expect(wf.stages.plan?.fill).toBe('dim');
    }
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
    expect(wf.stages.plan?.fill).toBe('full');
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
    expect(wf.stages.plan?.fill).toBe('dim');
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
    expect(wf.stages.plan?.fill).toBe('dim');
    expect(wf.stages.plan?.stale).toBe(true);
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
    expect(first.stages.plan?.fill).toBe('full');
    // Dirty the plan WITHOUT advancing HEAD — the git-log cache still says
    // "unchanged", so only a cache-bypassing dirty probe can flip it to stale.
    writeFile(dir, 'docs/plan.md', '# plan\ndirtied\n');
    const second = enrichIssueWorkflow(
      { status: 'in_progress', metadata: md },
      dir
    );
    expect(second.stages.plan?.stale).toBe(true);
  });
});

describe('closed beads skip the staleness probes', () => {
  /**
   * Fixture where the spec doc moved after the receipt — `pathChangedSince`
   * reports changed, so `resolved` still reads stale.
   *
   * @param {string} dir
   * @returns {string} receipt sha
   */
  function specMovedAfterReceipt(dir) {
    writeFile(dir, 'docs/spec.md', '# spec\n');
    const sha = commitAll(dir, 'add spec');
    writeFile(dir, 'docs/spec.md', '# spec\nrevised\n');
    commitAll(dir, 'revise spec');
    return sha;
  }

  /**
   * Fixture where the Bead branch survives and advanced past the receipt —
   * the branch must stay alive, since a deleted one already reads `unknown`.
   *
   * @param {string} dir
   * @returns {string} receipt sha
   */
  function beadBranchAdvanced(dir) {
    writeFile(dir, 'a.txt', '1\n');
    const sha = commitAll(dir, 'first');
    git(dir, ['checkout', '-q', '-b', 'UI-1']);
    writeFile(dir, 'a.txt', '2\n');
    commitAll(dir, 'post-review commit');
    return sha;
  }

  /**
   * Fixture where the plan doc moved after the receipt.
   *
   * @param {string} dir
   * @returns {string} receipt sha
   */
  function planMovedAfterReceipt(dir) {
    writeFile(dir, 'docs/plan.md', '# plan\n');
    const sha = commitAll(dir, 'add plan');
    writeFile(dir, 'docs/plan.md', '# plan\nrevised\n');
    commitAll(dir, 'revise plan');
    return sha;
  }

  test('keeps spec fresh on a closed bead whose spec doc moved', () => {
    const dir = makeRepo();
    const sha = specMovedAfterReceipt(dir);

    const wf = enrichIssueWorkflow(
      {
        status: 'closed',
        metadata: {
          route: 'spec_backed',
          spec_id: 'docs/spec.md',
          spec_review: 'codex@' + sha
        }
      },
      dir
    );

    expect(wf.stages.spec.stale).toBe(false);
  });

  test('keeps impl fresh on a closed bead whose branch advanced', () => {
    const dir = makeRepo();
    const sha = beadBranchAdvanced(dir);

    const wf = enrichIssueWorkflow(
      {
        id: 'UI-1',
        status: 'closed',
        metadata: { route: 'spec_backed', impl_review: 'codex@' + sha }
      },
      dir
    );

    expect(wf.stages.impl.stale).toBe(false);
  });

  test('keeps plan fresh on a closed bead whose plan doc moved', () => {
    const dir = makeRepo();
    const sha = planMovedAfterReceipt(dir);

    const wf = enrichIssueWorkflow(
      {
        status: 'closed',
        metadata: {
          route: 'full_plan',
          plan_path: 'docs/plan.md',
          plan_review: 'user@' + sha
        }
      },
      dir
    );

    expect(wf.stages.plan?.stale).toBe(false);
  });

  test('leaves a resolved bead staleness untouched on all three probes', () => {
    const spec_dir = makeRepo();
    const spec_sha = specMovedAfterReceipt(spec_dir);
    const impl_dir = makeRepo();
    const impl_sha = beadBranchAdvanced(impl_dir);
    const plan_dir = makeRepo();
    const plan_sha = planMovedAfterReceipt(plan_dir);

    const spec_wf = enrichIssueWorkflow(
      {
        status: 'resolved',
        metadata: {
          route: 'spec_backed',
          spec_id: 'docs/spec.md',
          spec_review: 'codex@' + spec_sha
        }
      },
      spec_dir
    );
    const impl_wf = enrichIssueWorkflow(
      {
        id: 'UI-1',
        status: 'resolved',
        metadata: { route: 'spec_backed', impl_review: 'codex@' + impl_sha }
      },
      impl_dir
    );
    const plan_wf = enrichIssueWorkflow(
      {
        status: 'resolved',
        metadata: {
          route: 'full_plan',
          plan_path: 'docs/plan.md',
          plan_review: 'user@' + plan_sha
        }
      },
      plan_dir
    );

    expect(spec_wf.stages.spec.stale).toBe(true);
    expect(impl_wf.stages.impl.stale).toBe(true);
    expect(plan_wf.stages.plan?.stale).toBe(true);
  });

  test('preserves glyphs and chips on a closed bead', () => {
    const dir = makeRepo();
    const sha = specMovedAfterReceipt(dir);

    const wf = enrichIssueWorkflow(
      {
        id: 'UI-1',
        status: 'closed',
        metadata: {
          route: 'spec_backed',
          spec_id: 'docs/spec.md',
          spec_review: 'codex@' + sha,
          impl_review: 'skipped@' + sha,
          pr_url: 'https://github.com/o/r/pull/42'
        }
      },
      dir
    );

    expect(wf.stages.spec.glyph).toBe('review');
    expect(wf.stages.spec.fill).toBe('full');
    expect(wf.stages.impl.glyph).toBe('skip');
    expect(wf.chips.route).toBe('spec_backed');
    expect(wf.chips.pr).toEqual({ number: 42 });
  });

  test('leaves the status-less computeStale contract unchanged', () => {
    const dir = makeRepo();
    const sha = specMovedAfterReceipt(dir);

    const { spec_stale } = computeStale(
      { spec_id: 'docs/spec.md', spec_review: 'codex@' + sha },
      dir
    );

    expect(spec_stale).toBe(true);
  });
});
