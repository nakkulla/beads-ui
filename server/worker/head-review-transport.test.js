import { describe, expect, test } from 'vitest';
import {
  HEAD_REVIEW_VERDICT_MARKER,
  createHeadReviewTransport,
  parseVerdictLine
} from './head-review-transport.js';

const WS = '/tmp/example-workspace/project-a';
const REPO = '/tmp/example-repo';
const HEAD = 'a'.repeat(40);
const NEW_HEAD = 'b'.repeat(40);

/**
 * @param {Record<string, any>} [overrides]
 */
function transport(overrides = {}) {
  /** @type {Record<string, any[]>} */
  const calls = { spawn: [], set_metadata: [], git: [] };
  /** @type {Record<string, any>} */
  const issue = { metadata: {} };
  const deps = {
    workspace: WS,
    repo: REPO,
    bd: {
      readIssue: async () => issue,
      setMetadata: async (
        /** @type {string} */ bead_id,
        /** @type {string} */ key,
        /** @type {string} */ value
      ) => {
        calls.set_metadata.push({ bead_id, key, value });
        issue.metadata[key] = value;
      }
    },
    makeRunner: (/** @type {string} */ name) => ({
      name,
      spawn: (
        /** @type {any} */ bead,
        /** @type {string} */ cwd,
        /** @type {any} */ settings
      ) => {
        calls.spawn.push({ runner: name, bead, cwd, settings });
        return {
          done: Promise.resolve({
            success: true,
            reason: 'ok',
            exit: 0,
            blocked: false,
            events: [
              {
                kind: 'text',
                text: `검토 완료\n${HEAD_REVIEW_VERDICT_MARKER} {"verdict":"APPROVE","findings":[]}`
              }
            ]
          })
        };
      }
    }),
    worktree: {
      exists: () => true,
      pathFor: (/** @type {string} */ _repo, /** @type {string} */ bead_id) =>
        `${REPO}/.worktrees/${bead_id}`
    },
    gitRun: async (/** @type {string[]} */ args) => {
      calls.git.push(args);
      return { code: 0, stdout: '', stderr: '' };
    },
    probeHead: async () => NEW_HEAD,
    log: () => {},
    ...overrides
  };
  return { t: createHeadReviewTransport(deps), calls, issue };
}

describe('worker/head-review-transport — reviewer selection', () => {
  test('defaults to the harness implementation gate reviewer', async () => {
    const { t } = transport();

    const s = await t.selectReviewer('UI-1');

    expect(s).toEqual({ ok: true, reviewer: 'codex', effort: 'xhigh' });
  });

  test('honours Bead impl_review_model and effort', async () => {
    const { t, issue } = transport();
    issue.metadata.impl_review_model = 'opus';
    issue.metadata.impl_review_effort = 'high';

    const s = await t.selectReviewer('UI-1');

    expect(s).toEqual({ ok: true, reviewer: 'opus', effort: 'high' });
  });

  test('fails closed on self and skip selections', async () => {
    const { t, issue } = transport();

    issue.metadata.impl_review_model = 'self';
    const self_pick = await t.selectReviewer('UI-1');
    issue.metadata.impl_review_model = 'skip';
    const skip_pick = await t.selectReviewer('UI-1');

    expect(self_pick).toMatchObject({
      ok: false,
      reviewer: 'self',
      reason: 'reviewer_selection_self'
    });
    expect(skip_pick).toMatchObject({
      ok: false,
      reviewer: 'skip',
      reason: 'reviewer_selection_skip'
    });
  });

  test('fails closed on an unknown model or unsupported effort', async () => {
    const { t, issue } = transport();

    issue.metadata.impl_review_model = 'gpt9';
    const unknown = await t.selectReviewer('UI-1');
    issue.metadata.impl_review_model = 'codex';
    issue.metadata.impl_review_effort = 'ultra';
    const bad_effort = await t.selectReviewer('UI-1');

    expect(unknown).toMatchObject({
      ok: false,
      reason: 'reviewer_selection_invalid'
    });
    expect(bad_effort).toMatchObject({
      ok: false,
      reason: 'reviewer_effort_invalid'
    });
  });
});

describe('worker/head-review-transport — receipts', () => {
  test('parses the current impl_review receipt', async () => {
    const { t, issue } = transport();
    issue.metadata.impl_review = `codex@${HEAD}`;

    const receipt = await t.readReceipt('UI-1');

    expect(receipt).toEqual({
      actor: 'codex',
      head_sha: HEAD,
      raw: `codex@${HEAD}`
    });
  });

  test('returns null for a malformed receipt', async () => {
    const { t, issue } = transport();
    issue.metadata.impl_review = 'not-a-receipt';

    expect(await t.readReceipt('UI-1')).toBeNull();
  });

  test('writes and reads back the exact receipt', async () => {
    const { t, calls } = transport();

    const written = await t.writeReceipt('UI-1', `codex@${HEAD}`);

    expect(calls.set_metadata).toEqual([
      { bead_id: 'UI-1', key: 'impl_review', value: `codex@${HEAD}` }
    ]);
    expect(written).toEqual({ ok: true, readback: `codex@${HEAD}` });
  });
});

describe('worker/head-review-transport — lineage', () => {
  test('proves a queue-owned move with fetch and ancestry', async () => {
    const { t, calls } = transport();

    const lin = await t.lineage('UI-1', {
      prior_head_sha: HEAD,
      head_sha: NEW_HEAD,
      target_base: 'main'
    });

    expect(lin).toEqual({ queue_owned: true });
    expect(calls.git.some((args) => args.includes('--is-ancestor'))).toBe(true);
  });

  test('treats a failed ancestry probe as external drift', async () => {
    const { t } = transport({
      gitRun: async (/** @type {string[]} */ args) =>
        args.includes('--is-ancestor')
          ? { code: 1, stdout: '', stderr: '' }
          : { code: 0, stdout: '', stderr: '' }
    });

    const lin = await t.lineage('UI-1', {
      prior_head_sha: HEAD,
      head_sha: NEW_HEAD,
      target_base: 'main'
    });

    expect(lin).toMatchObject({
      queue_owned: false,
      reason: 'external_head_drift'
    });
  });
});

describe('worker/head-review-transport — review runs', () => {
  test('parses the structured verdict line', () => {
    const parsed = parseVerdictLine(
      `분석...\n${HEAD_REVIEW_VERDICT_MARKER} {"verdict":"REVISE","findings":[{"title":"t"}]}\n`
    );

    expect(parsed).toEqual({
      verdict: 'REVISE',
      findings: [{ title: 't' }]
    });
  });

  test('runs the codex reviewer in the bead worktree and returns APPROVE', async () => {
    const { t, calls } = transport();

    const result = await t.runReview({
      bead_id: 'UI-1',
      authority_id: 'authority-1',
      attempt_id: 'review:authority-1:x',
      head_sha: HEAD,
      target_base: 'main',
      reviewer: 'codex',
      effort: 'xhigh'
    });

    expect(result).toEqual({ ok: true, verdict: 'APPROVE', findings: [] });
    expect(calls.spawn).toHaveLength(1);
    expect(calls.spawn[0].runner).toBe('codex');
    expect(calls.spawn[0].cwd).toBe(`${REPO}/.worktrees/UI-1`);
    expect(calls.spawn[0].settings.effort).toBe('xhigh');
    expect(calls.spawn[0].bead.prompt).toContain(HEAD);
    expect(calls.spawn[0].bead.prompt).toContain(HEAD_REVIEW_VERDICT_MARKER);
  });

  test('maps a claude-family reviewer onto the claude runner', async () => {
    const { t, calls } = transport();

    await t.runReview({
      bead_id: 'UI-1',
      authority_id: 'authority-1',
      attempt_id: 'review:authority-1:x',
      head_sha: HEAD,
      target_base: 'main',
      reviewer: 'opus',
      effort: 'high'
    });

    expect(calls.spawn[0].runner).toBe('claude');
    expect(calls.spawn[0].settings.model).toBe('opus');
  });

  test('reports a missing verdict marker as malformed', async () => {
    const { t } = transport({
      makeRunner: () => ({
        name: 'codex',
        spawn: () => ({
          done: Promise.resolve({
            success: true,
            reason: 'ok',
            exit: 0,
            blocked: false,
            events: [{ kind: 'text', text: '끝났지만 verdict 없음' }]
          })
        })
      })
    });

    const result = await t.runReview({
      bead_id: 'UI-1',
      authority_id: 'authority-1',
      attempt_id: 'review:authority-1:x',
      head_sha: HEAD,
      target_base: 'main',
      reviewer: 'codex',
      effort: 'xhigh'
    });

    expect(result).toMatchObject({
      ok: false,
      reason: 'review_verdict_missing'
    });
  });

  test('reports a failed session as transport failure', async () => {
    const { t } = transport({
      makeRunner: () => ({
        name: 'codex',
        spawn: () => ({
          done: Promise.resolve({
            success: false,
            reason: 'blocker',
            exit: 1,
            blocked: true,
            events: []
          })
        })
      })
    });

    const result = await t.runReview({
      bead_id: 'UI-1',
      authority_id: 'authority-1',
      attempt_id: 'review:authority-1:x',
      head_sha: HEAD,
      target_base: 'main',
      reviewer: 'codex',
      effort: 'xhigh'
    });

    expect(result).toMatchObject({ ok: false, reason: 'blocker' });
  });

  test('refuses to review without the bead worktree', async () => {
    const { t, calls } = transport({
      worktree: { exists: () => false, pathFor: () => '/nowhere' }
    });

    const result = await t.runReview({
      bead_id: 'UI-1',
      authority_id: 'authority-1',
      attempt_id: 'review:authority-1:x',
      head_sha: HEAD,
      target_base: 'main',
      reviewer: 'codex',
      effort: 'xhigh'
    });

    expect(result).toMatchObject({ ok: false, reason: 'worktree_missing' });
    expect(calls.spawn).toHaveLength(0);
  });
});

describe('worker/head-review-transport — repair runs', () => {
  test('returns the freshly observed head after a successful repair session', async () => {
    const { t, calls } = transport();

    const result = await t.runRepair({
      bead_id: 'UI-1',
      authority_id: 'authority-1',
      attempt_id: 'repair:authority-1:x',
      reviewed_head_sha: HEAD,
      target_base: 'main',
      findings: [{ title: 't' }],
      findings_digest: 'digest'
    });

    expect(result).toEqual({ ok: true, head_sha: NEW_HEAD });
    expect(calls.spawn).toHaveLength(1);
    expect(calls.spawn[0].bead.prompt).toContain('impl_review=self@');
  });

  test('reports a failed repair session without observing a head', async () => {
    /** @type {any[]} */
    const probes = [];
    const { t } = transport({
      makeRunner: () => ({
        name: 'codex',
        spawn: () => ({
          done: Promise.resolve({
            success: false,
            reason: 'turn_failed',
            exit: 1,
            blocked: false,
            events: []
          })
        })
      }),
      probeHead: async () => {
        probes.push(1);
        return NEW_HEAD;
      }
    });

    const result = await t.runRepair({
      bead_id: 'UI-1',
      authority_id: 'authority-1',
      attempt_id: 'repair:authority-1:x',
      reviewed_head_sha: HEAD,
      target_base: 'main',
      findings: [],
      findings_digest: 'digest'
    });

    expect(result).toMatchObject({ ok: false, reason: 'turn_failed' });
    expect(probes).toEqual([]);
  });
});
