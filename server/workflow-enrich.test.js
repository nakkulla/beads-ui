import { execFile, execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  _clearStaleCache,
  classifyGlyph,
  computeStale,
  enrichIssueWorkflow,
  enrichIssuesWorkflow,
  parseExecReceipt,
  parseImplEntry,
  parsePlanReceipt,
  parsePlannedExecution,
  parseReceipt,
  parseResolverReceipt,
  warmWorkflowProbes
} from './workflow-enrich.js';

vi.mock('node:child_process', async (importOriginal) => {
  /** @type {typeof import('node:child_process')} */
  const actual = await importOriginal();
  return {
    ...actual,
    execFile: vi.fn(actual.execFile),
    execFileSync: vi.fn(actual.execFileSync)
  };
});

const execFileMock = /** @type {import('vitest').Mock} */ (
  /** @type {unknown} */ (execFile)
);
const execFileSyncMock = /** @type {import('vitest').Mock} */ (
  /** @type {unknown} */ (execFileSync)
);

// Waits on REAL child processes (git, node, python), so wall time here is
// process startup under the load the parallel suite creates, not product work.
// Assertions are unchanged; only the waiting budget is sized for that load.
vi.setConfig({ testTimeout: 30_000 });

/**
 * Vitest's own default budget, restated because this file raises the file-level
 * budget for the suites that drive real git. The suites below are pure
 * computation and are held to the unchanged default.
 */
const PURE = { timeout: 5_000 };

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
  vi.clearAllMocks();
});

afterEach(() => {
  while (tmp_dirs.length > 0) {
    const dir = tmp_dirs.pop();
    if (dir) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  }
});

/**
 * Return async git invocations whose argv contains one token.
 *
 * @param {string} token
 */
function asyncGitCalls(token) {
  return execFileMock.mock.calls.filter(
    ([command, args]) =>
      command === 'git' && Array.isArray(args) && args.includes(token)
  );
}

describe('warmWorkflowProbes', () => {
  test('keeps snapshot enrichment free of synchronous child processes', async () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/spec.md', '# spec\n');
    const sha = commitAll(dir, 'add spec');
    const issue = {
      id: 'UI-1',
      status: 'in_progress',
      spec_id: 'docs/spec.md',
      metadata: { route: 'spec_backed', spec_review: `codex@${sha}` }
    };
    const probes = await warmWorkflowProbes([issue], dir, {
      generation: 1,
      all: [issue]
    });
    execFileSyncMock.mockClear();

    const enriched = enrichIssuesWorkflow([issue], dir, probes);

    expect(enriched[0].workflow.stages.spec.stale).toBe(false);
    expect(execFileSync).not.toHaveBeenCalled();
  });

  test('reuses immutable keys and captures the changed head in path probes', async () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/spec.md', '# spec\n');
    const receipt_sha = commitAll(dir, 'add spec');
    writeFile(dir, 'other.txt', 'one\n');
    commitAll(dir, 'advance head');
    git(dir, ['branch', 'UI-1']);
    const issue = {
      id: 'UI-1',
      status: 'in_progress',
      spec_id: 'docs/spec.md',
      metadata: {
        route: 'spec_backed',
        spec_review: `codex@${receipt_sha}`,
        impl_review: `codex@${receipt_sha}`
      }
    };
    await warmWorkflowProbes([issue], dir, { generation: 1, all: [issue] });
    execFileMock.mockClear();

    await warmWorkflowProbes([issue], dir, { generation: 1, all: [issue] });
    const repeated_calls = execFileMock.mock.calls.length;
    writeFile(dir, 'other.txt', 'two\n');
    const changed_head = commitAll(dir, 'advance head again');
    execFileMock.mockClear();
    await warmWorkflowProbes([issue], dir, { generation: 2, all: [issue] });
    const log_args = asyncGitCalls('log')[0]?.[1];

    expect(repeated_calls).toBe(0);
    expect(log_args).toContain(`${receipt_sha}..${changed_head}`);
    expect(log_args).not.toContain(`${receipt_sha}..HEAD`);
  });

  test('retries an undetermined path probe only in the next generation', async () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/spec.md', '# spec\n');
    commitAll(dir, 'add spec');
    const issue = {
      id: 'UI-1',
      status: 'in_progress',
      spec_id: 'docs/spec.md',
      metadata: {
        route: 'spec_backed',
        spec_review: `codex@${'f'.repeat(40)}`
      }
    };
    await warmWorkflowProbes([issue], dir, { generation: 1, all: [issue] });
    execFileMock.mockClear();

    await warmWorkflowProbes([issue], dir, { generation: 1, all: [issue] });
    const same_generation_logs = asyncGitCalls('log').length;
    await warmWorkflowProbes([issue], dir, { generation: 2, all: [issue] });
    const next_generation_logs = asyncGitCalls('log').length;

    expect(same_generation_logs).toBe(0);
    expect(next_generation_logs).toBe(1);
  });

  test('retries commit absence only in the next generation', async () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/spec.md', '# spec\n');
    const receipt_sha = commitAll(dir, 'add spec');
    const missing_cursor = 'f'.repeat(40);
    const issue = {
      id: 'UI-1',
      status: 'in_progress',
      spec_id: 'docs/spec.md',
      metadata: {
        route: 'spec_backed',
        spec_review: `codex@${receipt_sha}`,
        last_checked_sha: missing_cursor
      }
    };
    await warmWorkflowProbes([issue], dir, { generation: 1, all: [issue] });
    execFileMock.mockClear();

    await warmWorkflowProbes([issue], dir, { generation: 1, all: [issue] });
    const same_generation_checks = asyncGitCalls(
      `${missing_cursor}^{commit}`
    ).length;
    await warmWorkflowProbes([issue], dir, { generation: 2, all: [issue] });
    const next_generation_checks = asyncGitCalls(
      `${missing_cursor}^{commit}`
    ).length;

    expect(same_generation_checks).toBe(0);
    expect(next_generation_checks).toBe(1);
  });

  test('shares generation capture and checks plans outside the first items', async () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/spec.md', '# spec\n');
    writeFile(dir, 'docs/plan.md', '# plan\n');
    const receipt_sha = commitAll(dir, 'add docs');
    writeFile(dir, 'docs/plan.md', '# plan\ndirty\n');
    const spec_issue = {
      id: 'UI-1',
      status: 'in_progress',
      spec_id: 'docs/spec.md',
      metadata: {
        route: 'spec_backed',
        spec_review: `codex@${receipt_sha}`
      }
    };
    const plan_issue = {
      id: 'UI-2',
      status: 'in_progress',
      metadata: {
        route: 'full_plan',
        plan_path: 'docs/plan.md',
        plan_review: `user@${receipt_sha}`
      }
    };
    const generation = { generation: 1, all: [spec_issue, plan_issue] };
    execFileMock.mockClear();

    const [, plan_probes] = await Promise.all([
      warmWorkflowProbes([spec_issue], dir, generation),
      warmWorkflowProbes([plan_issue], dir, generation)
    ]);
    const workflow = enrichIssueWorkflow(
      plan_issue,
      dir,
      undefined,
      plan_probes
    );

    expect(asyncGitCalls('rev-parse')).toHaveLength(1);
    expect(asyncGitCalls('for-each-ref')).toHaveLength(1);
    expect(asyncGitCalls('status')).toHaveLength(1);
    expect(workflow.stages.plan?.approval_state).toBe('stale');
  });

  test('returns unknown on cache misses without spawning synchronously', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/spec.md', '# spec\n');
    const head = commitAll(dir, 'add spec');
    const probes = {
      head,
      branch_tips: new Map([['UI-1', 'e'.repeat(40)]]),
      dirty_paths: new Set(),
      checked_paths: new Set(['docs/plan.md']),
      undetermined: new Set()
    };
    const issue = {
      id: 'UI-1',
      status: 'in_progress',
      spec_id: 'docs/spec.md',
      metadata: {
        route: 'full_plan',
        spec_review: `codex@${'a'.repeat(40)}`,
        impl_review: `codex@${'b'.repeat(40)}`,
        plan_path: 'docs/plan.md',
        plan_review: `user@${'c'.repeat(40)}`
      }
    };
    execFileSyncMock.mockClear();

    const workflow = enrichIssueWorkflow(issue, dir, undefined, probes);

    expect(workflow.stages.spec.stale).toBe(false);
    expect(workflow.stages.impl.stale).toBe(false);
    expect(workflow.stages.plan?.approval_state).toBe('unknown');
    expect(execFileSync).not.toHaveBeenCalled();
  });
});

describe('parseReceipt', PURE, () => {
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

describe('execution metadata display projection', PURE, () => {
  test('parses delegated planned execution with an exact shape', () => {
    const planned_execution = parsePlannedExecution('delegated', undefined);

    expect(planned_execution).toEqual({ kind: 'delegated', reason: null });
  });

  test('parses main planned execution with its exact reason', () => {
    const planned_execution = parsePlannedExecution('main', '복잡한 계약 변경');

    expect(planned_execution).toEqual({
      kind: 'main',
      reason: '복잡한 계약 변경'
    });
  });

  test('returns null when planned execution is absent', () => {
    const planned_execution = parsePlannedExecution(undefined, undefined);

    expect(planned_execution).toBeNull();
  });

  test('returns null for an unknown planned execution kind', () => {
    const planned_execution = parsePlannedExecution('worker', undefined);

    expect(planned_execution).toBeNull();
  });

  test.each([
    ['array', ['main']],
    ['object', { kind: 'main' }],
    ['number', 1],
    ['boolean', true]
  ])('returns null for a %s planned execution value', (_name, value) => {
    const planned_execution = parsePlannedExecution(value, undefined);

    expect(planned_execution).toBeNull();
  });

  test.each([
    ['array', ['reason']],
    ['object', { reason: 'reason' }],
    ['number', 1],
    ['boolean', true]
  ])('returns null for a %s main reason value', (_name, value) => {
    const planned_execution = parsePlannedExecution('main', value);

    expect(planned_execution).toBeNull();
  });

  test('returns null when delegated carries a reason', () => {
    const planned_execution = parsePlannedExecution('delegated', '불필요');

    expect(planned_execution).toBeNull();
  });

  test('returns null when delegated carries a non-string reason', () => {
    const planned_execution = parsePlannedExecution('delegated', null);

    expect(planned_execution).toBeNull();
  });

  test('returns null when main has no reason', () => {
    const planned_execution = parsePlannedExecution('main', undefined);

    expect(planned_execution).toBeNull();
  });

  test('returns null when main has an empty reason', () => {
    const planned_execution = parsePlannedExecution('main', '   ');

    expect(planned_execution).toBeNull();
  });

  test('returns null when main has a multiline reason', () => {
    const planned_execution = parsePlannedExecution('main', '첫 줄\n둘째 줄');

    expect(planned_execution).toBeNull();
  });

  test('keeps existing enrichment when planned execution is malformed', () => {
    const workflow = enrichIssueWorkflow(
      {
        id: 'UI-1',
        status: 'in_progress',
        metadata: {
          route: 'spec_backed',
          planned_execution: 'main',
          planned_execution_reason: '',
          exec_receipt: `delegated:gpt-5.6-sol@${'a'.repeat(40)}`
        }
      },
      null,
      null
    );

    expect(workflow.route).toBe('spec_backed');
    expect(workflow.stages.impl.fill).toBe('dim');
    expect(workflow.exec_receipt).toEqual({
      kind: 'delegated',
      actor: 'gpt-5.6-sol',
      effort: null,
      sha: 'a'.repeat(40)
    });
    expect(workflow.planned_execution).toBeNull();
    expect(workflow.chips.planned_execution).toBeNull();
  });

  test.each([
    ['delegated', undefined, { kind: 'delegated', reason: null }],
    ['main', '직접 통합', { kind: 'main', reason: '직접 통합' }]
  ])(
    'exposes %s planned execution on both enrichment surfaces',
    (kind, reason, expected) => {
      const workflow = enrichIssueWorkflow(
        {
          id: 'UI-1',
          metadata: {
            planned_execution: kind,
            ...(reason === undefined
              ? {}
              : { planned_execution_reason: reason })
          }
        },
        null,
        null
      );

      expect(workflow.planned_execution).toEqual(expected);
      expect(workflow.chips.planned_execution).toEqual(expected);
    }
  );

  test('parses delegated and main execution receipts', () => {
    expect(parseExecReceipt(`delegated:gpt-5.6-sol@${'a'.repeat(40)}`)).toEqual(
      {
        kind: 'delegated',
        actor: 'gpt-5.6-sol',
        effort: null,
        sha: 'a'.repeat(40)
      }
    );
    expect(parseExecReceipt(`main:국소 수정@${'b'.repeat(40)}`)).toEqual({
      kind: 'main',
      actor: '국소 수정',
      effort: null,
      sha: 'b'.repeat(40)
    });
  });

  test.each([['xhigh'], ['default']])(
    'splits the %s effort segment off a delegated receipt',
    (effort) => {
      expect(
        parseExecReceipt(`delegated:gpt-5.6-sol:${effort}@${'a'.repeat(40)}`)
      ).toEqual({
        kind: 'delegated',
        actor: 'gpt-5.6-sol',
        effort,
        sha: 'a'.repeat(40)
      });
    }
  );

  test('keeps a non-effort last segment inside the delegated actor', () => {
    expect(
      parseExecReceipt(`delegated:gpt-5.6-sol:sol@${'a'.repeat(40)}`)
    ).toEqual({
      kind: 'delegated',
      actor: 'gpt-5.6-sol:sol',
      effort: null,
      sha: 'a'.repeat(40)
    });
  });

  test('never reads an effort segment off a main receipt', () => {
    expect(parseExecReceipt(`main:takeover:high@${'a'.repeat(40)}`)).toEqual({
      kind: 'main',
      actor: 'takeover:high',
      effort: null,
      sha: 'a'.repeat(40)
    });
  });

  test('exposes the delegated effort on both enrichment surfaces', () => {
    const workflow = enrichIssueWorkflow(
      {
        id: 'UI-1',
        metadata: {
          exec_receipt: `delegated:gpt-5.6-sol:xhigh@${'a'.repeat(40)}`
        }
      },
      null,
      null
    );

    expect(workflow.exec_receipt?.effort).toBe('xhigh');
    expect(workflow.chips.exec_receipt?.effort).toBe('xhigh');
  });

  test('parses user implementation entry receipts', () => {
    expect(parseImplEntry(`user@${'c'.repeat(40)}`)).toEqual({
      actor: 'user',
      sha: 'c'.repeat(40)
    });
  });

  test('omits malformed execution metadata from enrichment', () => {
    const workflow = enrichIssueWorkflow(
      {
        id: 'UI-1',
        metadata: { exec_receipt: 'delegated:no-sha', impl_entry: 'self@bad' }
      },
      null,
      null
    );

    expect(workflow.exec_receipt).toBeNull();
    expect(workflow.impl_entry).toBeNull();
    expect(workflow.chips.exec_receipt).toBeNull();
    expect(workflow.chips.impl_entry).toBeNull();
  });

  test('parses a resolver self-review receipt into its two heads', () => {
    const prior = 'd'.repeat(40);
    const result = 'e'.repeat(40);

    expect(
      parseResolverReceipt(`resolver-self:UI-1-1787-1:${prior}@${result}`)
    ).toEqual({ attempt: 'UI-1-1787-1', prior_sha: prior, sha: result });
  });

  test('rejects an ordinary review receipt as a resolver receipt', () => {
    expect(parseResolverReceipt(`codex@${'a'.repeat(40)}`)).toBeNull();
    expect(
      parseResolverReceipt(`resolver-self:UI-1:${'a'.repeat(40)}`)
    ).toBeNull();
    expect(parseResolverReceipt(null)).toBeNull();
  });

  test('surfaces the resolver receipt for a closed conflict-resolved bead', () => {
    const prior = 'd'.repeat(40);
    const result = 'e'.repeat(40);

    const workflow = enrichIssueWorkflow(
      {
        id: 'UI-1',
        status: 'closed',
        metadata: {
          impl_review: `resolver-self:UI-1-1787-1:${prior}@${result}`
        }
      },
      null,
      null
    );

    expect(workflow.resolver).toEqual({
      attempt: 'UI-1-1787-1',
      prior_sha: prior,
      sha: result
    });
    expect(workflow.chips).not.toHaveProperty('resolver');
  });

  test('leaves the resolver receipt empty for an ordinary impl review', () => {
    const workflow = enrichIssueWorkflow(
      {
        id: 'UI-1',
        status: 'closed',
        metadata: { impl_review: `codex@${'a'.repeat(40)}` }
      },
      null,
      null
    );

    expect(workflow.resolver).toBeNull();
  });
});

describe('computeStale — spec_review', () => {
  test('reports spec_stale false from metadata alone after the spec doc moved', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/spec.md', '# spec v1\n');
    const sha = commitAll(dir, 'add spec');
    writeFile(dir, 'docs/spec.md', '# spec v1\nmore\n');
    commitAll(dir, 'revise spec');

    const { spec_stale } = computeStale(
      { spec_id: 'docs/spec.md', spec_review: 'codex@' + sha },
      dir
    );

    expect(spec_stale).toBe(false);
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

  test('a skip spec review goes stale on a follow-up commit (no exemption)', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/spec.md', '# spec v1\n');
    const sha = commitAll(dir, 'add spec');
    writeFile(dir, 'docs/spec.md', '# spec v1\nchanged\n');
    commitAll(dir, 'revise spec');

    const wf = enrichIssueWorkflow(
      {
        spec_id: 'docs/spec.md',
        status: 'in_progress',
        metadata: { route: 'spec_backed', spec_review: 'skipped@' + sha }
      },
      dir
    );
    expect(wf.stages.spec.stale).toBe(true);
  });

  test('uses a valid last_checked_sha cursor for spec freshness', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/spec.md', '# spec v1\n');
    const receipt_sha = commitAll(dir, 'add spec');
    writeFile(dir, 'docs/spec.md', '# spec v2\n');
    const cursor_sha = commitAll(dir, 'review updated scope');

    const { spec_stale } = computeStale(
      {
        spec_id: 'docs/spec.md',
        spec_review: 'codex@' + receipt_sha,
        last_checked_sha: cursor_sha
      },
      dir
    );

    expect(spec_stale).toBe(false);
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

  test('the receipt is an ancestor of the tip → fresh', () => {
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
    expect(impl_stale).toBe(false);
  });

  test('a base-sync merge commit on the branch keeps the receipt fresh', () => {
    const dir = makeRepo();
    writeFile(dir, 'a.txt', '1\n');
    const root = commitAll(dir, 'root');
    git(dir, ['checkout', '-q', '-b', 'UI-1']);
    writeFile(dir, 'b.txt', '1\n');
    const sha = commitAll(dir, 'reviewed work');
    git(dir, ['checkout', '-q', 'main']);
    git(dir, ['reset', '-q', '--hard', root]);
    writeFile(dir, 'c.txt', '1\n');
    commitAll(dir, 'sibling PR landed on base');
    git(dir, ['checkout', '-q', 'UI-1']);
    git(dir, ['merge', '-q', '--no-edit', 'main']);

    const { impl_stale } = computeStale(
      { impl_review: 'opus@' + sha },
      dir,
      'UI-1'
    );
    expect(impl_stale).toBe(false);
  });

  test('a tip the receipt is not an ancestor of → stale', () => {
    const dir = makeRepo();
    writeFile(dir, 'a.txt', '1\n');
    const root = commitAll(dir, 'root');
    git(dir, ['checkout', '-q', '-b', 'UI-1']);
    writeFile(dir, 'a.txt', '2\n');
    const sha = commitAll(dir, 'reviewed work');
    git(dir, ['reset', '-q', '--hard', root]);
    writeFile(dir, 'a.txt', '3\n');
    commitAll(dir, 'rewritten work');

    const { impl_stale } = computeStale(
      { impl_review: 'opus@' + sha },
      dir,
      'UI-1'
    );
    expect(impl_stale).toBe(true);
  });

  test('a receipt sha git cannot resolve → undetermined (fail-quiet)', () => {
    const dir = makeRepo();
    writeFile(dir, 'a.txt', '1\n');
    commitAll(dir, 'first');
    git(dir, ['branch', 'UI-1']);

    const { impl_stale } = computeStale(
      { impl_review: 'opus@' + 'f'.repeat(40) },
      dir,
      'UI-1'
    );
    expect(impl_stale).toBe(false);
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

  test('a distractor branch holding the receipt does not fake freshness', () => {
    const dir = makeRepo();
    writeFile(dir, 'a.txt', '1\n');
    const root = commitAll(dir, 'root');
    git(dir, ['checkout', '-q', '-b', 'UI-1']);
    writeFile(dir, 'a.txt', '2\n');
    const sha = commitAll(dir, 'reviewed work');
    // The receipt stays reachable from an unrelated ref, but the Bead branch
    // itself no longer descends from it — a global `--contains` search would
    // call that fresh.
    git(dir, ['branch', 'unrelated']);
    git(dir, ['reset', '-q', '--hard', root]);
    writeFile(dir, 'a.txt', '3\n');
    commitAll(dir, 'rewritten work');

    const { impl_stale } = computeStale(
      { impl_review: 'opus@' + sha },
      dir,
      'UI-1'
    );
    expect(impl_stale).toBe(true);
  });

  test('a skip impl receipt follows the same ancestry rule (no exemption)', () => {
    const dir = makeRepo();
    writeFile(dir, 'a.txt', '1\n');
    const root = commitAll(dir, 'root');
    git(dir, ['checkout', '-q', '-b', 'UI-1']);
    writeFile(dir, 'a.txt', '2\n');
    const sha = commitAll(dir, 'skipped work');
    git(dir, ['reset', '-q', '--hard', root]);
    writeFile(dir, 'a.txt', '3\n');
    commitAll(dir, 'rewritten work');

    const { impl_stale } = computeStale(
      { impl_review: 'skipped@' + sha },
      dir,
      'UI-1'
    );
    expect(impl_stale).toBe(true);
  });
});

describe('classifyGlyph', PURE, () => {
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

describe('parsePlanReceipt', PURE, () => {
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
  test('top-level-only spec_id fills the Board spec stage', () => {
    const wf = enrichIssueWorkflow({
      spec_id: ' docs/spec.md ',
      metadata: { route: 'spec_backed', spec_review: 'codex@' + 'a'.repeat(40) }
    });

    expect(wf.stages.spec.fill).toBe('full');
  });

  test('empties the spec stage for a legacy spec_path with no native spec_id', () => {
    const draft = enrichIssueWorkflow({
      metadata: { route: 'spec_backed', spec_path: 'docs/specs/draft.md' }
    });
    const bare = enrichIssueWorkflow({ metadata: { route: 'spec_backed' } });

    expect(draft.stages.spec).toEqual({
      fill: 'none',
      glyph: null,
      stale: false,
      receipt: null
    });
    expect(draft.stages.impl).toEqual(bare.stages.impl);
    expect(draft.stages.pr).toEqual(bare.stages.pr);
    expect(draft.stages.merge).toEqual(bare.stages.merge);
  });

  test('renders a spec_id with no receipt as the draft cell', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/spec.md', '# spec\n');
    commitAll(dir, 'add spec');

    const wf = enrichIssueWorkflow(
      {
        spec_id: 'docs/spec.md',
        status: 'in_progress',
        metadata: { route: 'spec_backed' }
      },
      dir
    );

    expect(wf.stages.spec).toEqual({
      fill: 'dim',
      glyph: null,
      stale: false,
      receipt: null,
      doc: { path: 'docs/spec.md', missing_state: 'spec_draft' }
    });
  });

  test('renders a spec_id with a malformed receipt as the draft cell', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/spec.md', '# spec\n');
    commitAll(dir, 'add spec');

    const wf = enrichIssueWorkflow(
      {
        spec_id: 'docs/spec.md',
        status: 'in_progress',
        metadata: {
          route: 'spec_backed',
          spec_review: 'codex@abc'
        }
      },
      dir
    );

    expect(wf.stages.spec).toMatchObject({
      fill: 'dim',
      glyph: null,
      doc: { path: 'docs/spec.md', missing_state: 'spec_draft' }
    });
  });

  test('fills a spec published by a valid receipt with the review glyph', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/spec.md', '# spec\n');
    const sha = commitAll(dir, 'add spec');

    const wf = enrichIssueWorkflow(
      {
        spec_id: 'docs/spec.md',
        status: 'in_progress',
        metadata: {
          route: 'spec_backed',
          spec_review: 'codex@' + sha
        }
      },
      dir
    );

    expect(wf.stages.spec).toEqual({
      fill: 'full',
      glyph: 'review',
      stale: false,
      receipt: 'codex@' + sha,
      doc: { path: 'docs/spec.md', missing_state: null }
    });
  });

  test('fills a spec published by a valid skipped receipt with the skip glyph', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/spec.md', '# spec\n');
    const sha = commitAll(dir, 'add spec');

    const wf = enrichIssueWorkflow(
      {
        spec_id: 'docs/spec.md',
        status: 'in_progress',
        metadata: {
          route: 'spec_backed',
          spec_review: 'skipped@' + sha
        }
      },
      dir
    );

    expect(wf.stages.spec).toMatchObject({ fill: 'full', glyph: 'skip' });
  });

  test('binds spec staleness to the published path', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/published.md', '# published\n');
    writeFile(dir, 'docs/other.md', '# other\n');
    const sha = commitAll(dir, 'add specs');
    writeFile(dir, 'docs/other.md', '# other\nedit\n');
    commitAll(dir, 'revise unrelated file only');

    const issue = {
      spec_id: 'docs/published.md',
      status: 'in_progress',
      metadata: {
        route: 'spec_backed',
        spec_review: 'codex@' + sha
      }
    };

    const fresh = enrichIssueWorkflow(issue, dir);
    expect(fresh.stages.spec.stale).toBe(false);
    expect(fresh.stages.spec.fill).toBe('full');

    writeFile(dir, 'docs/published.md', '# published\nedit\n');
    commitAll(dir, 'revise published spec');
    _clearStaleCache();

    expect(enrichIssueWorkflow(issue, dir).stages.spec.stale).toBe(true);
  });

  test('empties a spec_path-only stage even when an off-contract spec_review exists', () => {
    const raw = 'codex@' + 'a'.repeat(40);

    const wf = enrichIssueWorkflow({
      status: 'in_progress',
      metadata: {
        route: 'spec_backed',
        spec_path: 'docs/specs/draft.md',
        spec_review: raw
      }
    });

    expect(wf.stages.spec).toEqual({
      fill: 'none',
      glyph: null,
      stale: false,
      receipt: raw
    });
  });

  test('top-level spec_id drives Board staleness over conflicting metadata', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/native.md', '# native\n');
    writeFile(dir, 'docs/legacy.md', '# legacy\n');
    const sha = commitAll(dir, 'add specs');
    writeFile(dir, 'docs/native.md', '# native\nchanged\n');
    commitAll(dir, 'revise native spec');

    const wf = enrichIssueWorkflow(
      {
        spec_id: 'docs/native.md',
        status: 'in_progress',
        metadata: {
          route: 'spec_backed',
          spec_id: 'docs/legacy.md',
          spec_review: 'codex@' + sha
        }
      },
      dir
    );

    expect(wf.stages.spec.stale).toBe(true);
  });

  test('downgrades a stale spec review to state=stale', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/spec.md', '# spec\n');
    const sha = commitAll(dir, 'add spec');
    writeFile(dir, 'docs/spec.md', '# spec\nedit\n');
    commitAll(dir, 'revise spec');

    const wf = enrichIssueWorkflow(
      {
        spec_id: 'docs/spec.md',
        status: 'in_progress',
        metadata: {
          route: 'spec_backed',
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
    writeFile(dir, 'docs/plan.md', '# plan\n');
    commitAll(dir, 'add plan');
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
    expect(wf.chips.pr).toEqual({
      number: 42,
      url: 'https://github.com/o/r/pull/42'
    });
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
      { status: 'open', metadata: { route: 'foo' } },
      dir
    );
    expect(invalid.route_source).toBe('derived');
  });

  test('keeps the quick_fix close stage empty while implementation is in progress', () => {
    const dir = makeRepo();
    writeFile(dir, 'x.txt', '1\n');
    commitAll(dir, 'init');

    const wf = enrichIssueWorkflow(
      {
        status: 'in_progress',
        metadata: { route: 'quick_fix', plan_path: 'docs/ignored.md' }
      },
      dir
    );

    expect(wf.route).toBe('quick_fix');
    expect(wf.route_source).toBe('explicit');
    expect(wf.chips.route).toBe('quick_fix');
    expect(wf.stages.close).toEqual({
      fill: 'none',
      glyph: null,
      stale: false,
      receipt: null
    });
    expect(wf.stages.plan).toBeUndefined();
  });

  test('fills the quick_fix close stage when the bead is closed', () => {
    const dir = makeRepo();
    writeFile(dir, 'x.txt', '1\n');
    commitAll(dir, 'init');

    const wf = enrichIssueWorkflow(
      { status: 'closed', metadata: { route: 'quick_fix' } },
      dir
    );

    expect(wf.stages.close?.fill).toBe('full');
  });

  test('dims the quick_fix close stage while a resolved bead waits for Worker close', () => {
    const dir = makeRepo();
    writeFile(dir, 'x.txt', '1\n');
    commitAll(dir, 'init');

    const wf = enrichIssueWorkflow(
      { status: 'resolved', metadata: { route: 'quick_fix' } },
      dir
    );

    expect(wf.stages.close?.fill).toBe('dim');
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

  test('reserved plan_path without a document stays empty', () => {
    const dir = makeRepo();
    writeFile(dir, 'x.txt', '1\n');
    commitAll(dir, 'init');

    const wf = enrichIssueWorkflow(
      {
        status: 'in_progress',
        metadata: {
          route: 'full_plan',
          plan_path: 'docs/plan.md'
        }
      },
      dir
    );

    expect(wf.stages.plan).toMatchObject({
      fill: 'none',
      glyph: null,
      stale: false,
      receipt: null,
      approval_receipt: null,
      approval_state: 'missing'
    });
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

  test('uses a valid last_checked_sha cursor for plan freshness', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/plan.md', '# plan v1\n');
    const approval_sha = commitAll(dir, 'add plan');
    writeFile(dir, 'docs/plan.md', '# plan v2\n');
    const cursor_sha = commitAll(dir, 'review updated plan');

    const wf = enrichIssueWorkflow(
      {
        status: 'in_progress',
        metadata: {
          route: 'full_plan',
          plan_path: 'docs/plan.md',
          plan_review: 'codex@' + '3'.repeat(12),
          plan_approval: 'user@' + approval_sha,
          last_checked_sha: cursor_sha
        }
      },
      dir
    );

    expect(wf.stages.plan).toMatchObject({
      fill: 'full',
      stale: false,
      approval_state: 'fresh'
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
   * Fixture where the Bead branch survives but no longer descends from the
   * receipt — the only impl staleness the ancestry rule reports. The branch
   * must stay alive, since a deleted one already reads `unknown`.
   *
   * @param {string} dir
   * @returns {string} receipt sha
   */
  function beadBranchRewritten(dir) {
    writeFile(dir, 'a.txt', '1\n');
    const root = commitAll(dir, 'root');
    git(dir, ['checkout', '-q', '-b', 'UI-1']);
    writeFile(dir, 'a.txt', '2\n');
    const sha = commitAll(dir, 'reviewed work');
    // Keep the receipt commit alive on another ref, then reset the Bead branch
    // off it: exactly the rewritten-history shape the gate refuses.
    git(dir, ['branch', 'keeps-receipt']);
    git(dir, ['reset', '-q', '--hard', root]);
    writeFile(dir, 'a.txt', '3\n');
    commitAll(dir, 'rewritten work');
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
        spec_id: 'docs/spec.md',
        status: 'closed',
        metadata: {
          route: 'spec_backed',
          spec_review: 'codex@' + sha
        }
      },
      dir
    );

    expect(wf.stages.spec.stale).toBe(false);
  });

  test('keeps impl fresh on a closed bead whose branch was rewritten', () => {
    const dir = makeRepo();
    const sha = beadBranchRewritten(dir);

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
    const impl_sha = beadBranchRewritten(impl_dir);
    const plan_dir = makeRepo();
    const plan_sha = planMovedAfterReceipt(plan_dir);

    const spec_wf = enrichIssueWorkflow(
      {
        spec_id: 'docs/spec.md',
        status: 'resolved',
        metadata: {
          route: 'spec_backed',
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
        spec_id: 'docs/spec.md',
        status: 'closed',
        metadata: {
          route: 'spec_backed',
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
    expect(wf.chips.pr).toEqual({
      number: 42,
      url: 'https://github.com/o/r/pull/42'
    });
  });

  test('leaves the status-less computeStale contract unchanged', () => {
    const dir = makeRepo();
    const sha = beadBranchRewritten(dir);

    const { impl_stale } = computeStale(
      { impl_review: 'codex@' + sha },
      dir,
      'UI-1'
    );

    expect(impl_stale).toBe(true);
  });
});

describe('stage doc projection (UI-ajkn §2)', () => {
  test('carries the published spec path with no missing_state', () => {
    const wf = enrichIssueWorkflow({
      spec_id: 'docs/spec.md',
      metadata: { route: 'spec_backed', spec_review: 'codex@' + 'a'.repeat(40) }
    });

    expect(wf.stages.spec.doc).toEqual({
      path: 'docs/spec.md',
      missing_state: null
    });
  });

  test('carries the doc on an unpublished spec_id cell too', () => {
    const wf = enrichIssueWorkflow({
      spec_id: 'docs/spec.md',
      metadata: { route: 'spec_backed' }
    });

    expect(wf.stages.spec.doc).toEqual({
      path: 'docs/spec.md',
      missing_state: 'spec_draft'
    });
  });

  test('omits doc for a legacy spec_path with no native spec_id', () => {
    const wf = enrichIssueWorkflow({
      metadata: { route: 'spec_backed', spec_path: 'docs/specs/draft.md' }
    });

    expect(wf.stages.spec.fill).toBe('none');
    expect(wf.stages.spec.doc).toBeUndefined();
  });

  test('carries a draft path even when the document is proven absent', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/other.md', '# other\n');
    commitAll(dir, 'add other');

    const wf = enrichIssueWorkflow(
      {
        spec_id: 'docs/specs/draft.md',
        status: 'open',
        metadata: { route: 'spec_backed' }
      },
      dir
    );

    expect(wf.stages.spec.fill).toBe('none');
    expect(wf.stages.spec.doc).toEqual({
      path: 'docs/specs/draft.md',
      missing_state: 'spec_draft'
    });
  });

  test('omits doc when there is no spec evidence at all', () => {
    const wf = enrichIssueWorkflow({ metadata: { route: 'spec_backed' } });

    expect(wf.stages.spec.doc).toBeUndefined();
  });

  test('carries the plan path with no missing_state once authoring started', () => {
    const dir = makeRepo();
    writeFile(dir, 'docs/plan.md', '# plan\n');
    commitAll(dir, 'add plan');

    const wf = enrichIssueWorkflow(
      {
        status: 'in_progress',
        metadata: {
          route: 'full_plan',
          plan_path: 'docs/plan.md',
          plan_review: 'codex@' + 'b'.repeat(12)
        }
      },
      dir
    );

    expect(wf.stages.plan?.doc).toEqual({
      path: 'docs/plan.md',
      missing_state: null
    });
  });

  test('marks a reserved plan path without authoring history as plan_pending', () => {
    const dir = makeRepo();
    writeFile(dir, 'x.txt', '1\n');
    commitAll(dir, 'init');

    const wf = enrichIssueWorkflow(
      {
        status: 'in_progress',
        metadata: { route: 'full_plan', plan_path: 'docs/plan.md' }
      },
      dir
    );

    expect(wf.stages.plan?.fill).toBe('none');
    expect(wf.stages.plan?.doc).toEqual({
      path: 'docs/plan.md',
      missing_state: 'plan_pending'
    });
  });

  test('omits doc when no plan_path is reserved', () => {
    const wf = enrichIssueWorkflow({
      status: 'in_progress',
      metadata: { route: 'full_plan' }
    });

    expect(wf.stages.plan?.doc).toBeUndefined();
  });

  test('never carries doc on the impl, pr, merge or close stages', () => {
    const backed = enrichIssueWorkflow({
      spec_id: 'docs/spec.md',
      status: 'resolved',
      metadata: { route: 'spec_backed', pr_url: 'https://x/pull/42' }
    });
    const quick = enrichIssueWorkflow({
      status: 'closed',
      metadata: { route: 'quick_fix' }
    });

    expect(backed.stages.impl.doc).toBeUndefined();
    expect(backed.stages.pr.doc).toBeUndefined();
    expect(backed.stages.merge.doc).toBeUndefined();
    expect(quick.stages.close?.doc).toBeUndefined();
  });
});

describe(
  'enrichIssueWorkflow — quick_fix self-review projection (UI-r7or §4)',
  PURE,
  () => {
    /** A description that satisfies every pinned section, scope and label rule. */
    const COMPLETE_BODY = [
      '출처/배경 — 칩이 없다.',
      '',
      '기대 효과 — 칩이 생긴다.',
      '',
      '영향 surface와 경계 — server/workflow-enrich.js',
      '',
      '검증 bundle — npm test',
      '',
      '## scope',
      '',
      '- server/workflow-enrich.js',
      ''
    ].join('\n');

    /**
     * The contract's body digest: sha256 of the raw UTF-8 bytes, first 12 hex.
     *
     * @param {string} body
     */
    function bodyDigest(body) {
      return createHash('sha256')
        .update(body, 'utf8')
        .digest('hex')
        .slice(0, 12);
    }

    test('attaches a reviewed verdict when the receipt matches the body', () => {
      const wf = enrichIssueWorkflow({
        issue_type: 'task',
        description: COMPLETE_BODY,
        metadata: {
          route: 'quick_fix',
          quick_fix_review: `self@${bodyDigest(COMPLETE_BODY)}`
        }
      });

      expect(wf.quick_fix_review).toEqual({
        state: 'reviewed',
        missing: [],
        digest: bodyDigest(COMPLETE_BODY)
      });
    });

    test('attaches a stale verdict when the receipt names another body', () => {
      const wf = enrichIssueWorkflow({
        issue_type: 'task',
        description: COMPLETE_BODY,
        metadata: {
          route: 'quick_fix',
          quick_fix_review: `self@${'0'.repeat(12)}`
        }
      });

      expect(wf.quick_fix_review?.state).toBe('stale');
    });

    test('attaches an unreviewed verdict when no receipt exists', () => {
      const wf = enrichIssueWorkflow({
        issue_type: 'task',
        description: COMPLETE_BODY,
        metadata: { route: 'quick_fix' }
      });

      expect(wf.quick_fix_review).toEqual({
        state: 'unreviewed',
        missing: [],
        digest: bodyDigest(COMPLETE_BODY)
      });
    });

    test('reports the missing sections independently of the state', () => {
      const wf = enrichIssueWorkflow({
        issue_type: 'task',
        description: '본문만 있고 섹션이 없다.',
        metadata: { route: 'quick_fix' }
      });

      expect(wf.quick_fix_review?.missing).toContain('section:출처/배경');
      expect(wf.quick_fix_review?.missing).toContain('scope:undeclared');
    });

    test('omits the key entirely on a spec_backed row', () => {
      const wf = enrichIssueWorkflow({
        issue_type: 'task',
        description: COMPLETE_BODY,
        metadata: { route: 'spec_backed' }
      });

      expect(Object.hasOwn(wf, 'quick_fix_review')).toBe(false);
    });

    test('omits the key entirely on a full_plan row', () => {
      const wf = enrichIssueWorkflow({
        issue_type: 'task',
        description: COMPLETE_BODY,
        metadata: { route: 'full_plan', plan_path: 'docs/plan.md' }
      });

      expect(Object.hasOwn(wf, 'quick_fix_review')).toBe(false);
    });

    test('omits the key when the route is derived rather than pinned', () => {
      const wf = enrichIssueWorkflow({
        issue_type: 'task',
        description: COMPLETE_BODY,
        metadata: {}
      });

      expect(wf.route_source).toBe('derived');
      expect(Object.hasOwn(wf, 'quick_fix_review')).toBe(false);
    });
  }
);
