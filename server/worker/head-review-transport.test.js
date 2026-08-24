import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  HEAD_REPAIR_RESULT_MARKER,
  HEAD_REVIEW_VERDICT_MARKER,
  createHeadReviewTransport,
  parseRepairResultLine,
  parseVerdictLine
} from './head-review-transport.js';

/** @type {string} */
let tmp_state;
const WS = '/tmp/example-workspace/project-a';
const REPO = '/tmp/example-repo';
const HEAD = 'a'.repeat(40);
const NEW_HEAD = 'b'.repeat(40);

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-hr-transport-'));
  process.env.XDG_STATE_HOME = tmp_state;
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

/**
 * A transport whose every effect is a recorded fake. `sessionText` is what the
 * fake runner's normalized text output carries.
 *
 * @param {Record<string, any>} [overrides]
 */
function transport(overrides = {}) {
  /** @type {Record<string, any[]>} */
  const calls = { spawn: [], set_metadata: [], git: [] };
  /** @type {Record<string, any>} */
  const issue = { metadata: {} };
  const session_text =
    overrides.sessionText ??
    `검토 완료\n${HEAD_REVIEW_VERDICT_MARKER} {"verdict":"APPROVE","findings":[]}`;
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
          pid: 4242,
          done: Promise.resolve({
            success: true,
            reason: 'ok',
            exit: 0,
            blocked: false,
            events: [{ kind: 'text', text: session_text }]
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
      if (args[0] === 'rev-parse') {
        return { code: 0, stdout: `${NEW_HEAD}\n`, stderr: '' };
      }
      return { code: 0, stdout: '', stderr: '' };
    },
    probeHead: async () => NEW_HEAD,
    pidAlive: () => false,
    sleep: async () => {},
    log: () => {},
    ...overrides
  };
  return { t: createHeadReviewTransport(deps), calls, issue };
}

/**
 * @param {Record<string, any>} [extra]
 */
function reviewPacket(extra = {}) {
  return {
    bead_id: 'UI-1',
    authority_id: 'authority-1',
    attempt_id: 'review:authority-1:x',
    head_sha: HEAD,
    target_base: 'main',
    reviewer: 'codex',
    effort: 'xhigh',
    ...extra
  };
}

/**
 * @param {Record<string, any>} [extra]
 */
function repairPacket(extra = {}) {
  return {
    bead_id: 'UI-1',
    authority_id: 'authority-1',
    attempt_id: 'repair:authority-1:x',
    reviewed_head_sha: HEAD,
    target_base: 'main',
    findings: [{ title: 't' }],
    findings_digest: 'digest',
    ...extra
  };
}

/**
 * A store stub carrying only what the attempt history needs: the same
 * terminal-wins rule the real `upsertHeadReviewAttempt` enforces.
 *
 * @param {Record<string, any>} [attempts]
 */
function attemptStore(attempts = {}) {
  const terminal = new Set(['done', 'failed', 'orphaned', 'stopped']);
  return {
    attempts,
    snapshot: () => ({ attempts }),
    upsertHeadReviewAttempt: (
      /** @type {string} */ _ws,
      /** @type {{ attempt_id: string, patch: Record<string, any> }} */ input
    ) => {
      const current = attempts[input.attempt_id];
      if (current && terminal.has(String(current.status))) {
        return { ok: false, reason: 'head_review_attempt_terminal' };
      }
      attempts[input.attempt_id] = { ...(current || {}), ...input.patch };
      return { ok: true };
    }
  };
}

describe('worker/head-review-transport — reviewer selection', () => {
  test('defaults to the harness implementation gate reviewer', async () => {
    const { t } = transport();

    const s = await t.selectReviewer('UI-1');

    expect(s).toEqual({
      ok: true,
      reviewer: 'codex',
      effort: 'xhigh',
      source: 'harness'
    });
  });

  test('honours Bead impl_review_model and effort', async () => {
    const { t, issue } = transport();
    issue.metadata.impl_review_model = 'opus';
    issue.metadata.impl_review_effort = 'high';

    const s = await t.selectReviewer('UI-1');

    expect(s).toEqual({
      ok: true,
      reviewer: 'opus',
      effort: 'high',
      source: 'bead'
    });
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

  test('records the harness rung when only the effort comes from the Bead', async () => {
    const { t, issue } = transport();
    issue.metadata.impl_review_effort = 'high';

    const s = await t.selectReviewer('UI-1');

    expect(s).toEqual({
      ok: true,
      reviewer: 'codex',
      effort: 'high',
      source: 'harness'
    });
  });

  test('ignores workspace kv reviewer values', async () => {
    const { t, issue } = transport();
    issue.metadata.review_model = 'opus';
    issue.metadata.review_effort = 'low';

    const s = await t.selectReviewer('UI-1');

    expect(s).toMatchObject({ reviewer: 'codex', effort: 'xhigh' });
  });

  test('fails closed when the harness catalog cannot be read', async () => {
    const { t } = transport({ reviewDefaults: () => ({ ok: false }) });

    const s = await t.selectReviewer('UI-1');

    expect(s).toMatchObject({
      ok: false,
      reviewer: null,
      effort: null,
      reason: 'reviewer_selection_invalid'
    });
  });

  test('rejects a self default coming from the harness catalog', async () => {
    const { t } = transport({
      reviewDefaults: () => ({ ok: true, reviewer: 'self', effort: 'xhigh' })
    });

    const s = await t.selectReviewer('UI-1');

    expect(s).toMatchObject({
      ok: false,
      reviewer: 'self',
      source: 'harness',
      reason: 'reviewer_selection_self'
    });
  });

  test('fails closed when the Bead record cannot be read at all', async () => {
    const { t } = transport({
      bd: {
        readIssue: async () => {
          throw new Error('bd down');
        },
        setMetadata: async () => {}
      }
    });

    const s = await t.selectReviewer('UI-1');

    expect(s).toMatchObject({
      ok: false,
      reason: 'reviewer_selection_unreadable'
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

  test('normalizes derived receipt reviewer identities', async () => {
    const { t, issue } = transport();
    issue.metadata.impl_review = `carry:codex:${HEAD}@${NEW_HEAD}`;

    expect(await t.readReceipt('UI-1')).toEqual({
      actor: 'codex',
      head_sha: NEW_HEAD,
      raw: `carry:codex:${HEAD}@${NEW_HEAD}`
    });

    issue.metadata.impl_review = `resolver-self:res-1:${HEAD}@${NEW_HEAD}`;

    expect(await t.readReceipt('UI-1')).toEqual({
      actor: 'self',
      head_sha: NEW_HEAD,
      raw: `resolver-self:res-1:${HEAD}@${NEW_HEAD}`
    });
  });

  test('rejects nested or ambiguous derived receipts', async () => {
    const { t, issue } = transport();
    issue.metadata.impl_review = `carry:carry:codex:${HEAD}@${NEW_HEAD}`;

    expect(await t.readReceipt('UI-1')).toBeNull();

    issue.metadata.impl_review = `resolver-self:resolver-self:res-1:${HEAD}@${NEW_HEAD}`;

    expect(await t.readReceipt('UI-1')).toBeNull();
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
  test('proves a vouched queue-owned move with ancestry and remote tip', async () => {
    const { t, calls } = transport();

    const lin = await t.lineage('UI-1', {
      prior_head_sha: HEAD,
      head_sha: NEW_HEAD,
      target_base: 'main',
      head_ref: 'UI-1',
      mutation: 'resolver:res-1'
    });

    expect(lin).toEqual({ queue_owned: true });
    expect(calls.git.some((args) => args.includes('--is-ancestor'))).toBe(true);
    expect(
      calls.git.some((args) => args.includes('refs/remotes/origin/UI-1'))
    ).toBe(true);
  });

  test('refuses a moved head no queue-owned mutation vouches for', async () => {
    const { t, calls } = transport();

    const lin = await t.lineage('UI-1', {
      prior_head_sha: HEAD,
      head_sha: NEW_HEAD,
      target_base: 'main',
      head_ref: 'UI-1',
      mutation: null
    });

    expect(lin).toMatchObject({
      queue_owned: false,
      reason: 'mutation_unproven'
    });
    expect(calls.git).toEqual([]);
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
      target_base: 'main',
      mutation: 'resolver:res-1'
    });

    expect(lin).toMatchObject({
      queue_owned: false,
      reason: 'external_head_drift'
    });
  });

  test('refuses when the remote branch tip is not the observed head', async () => {
    const { t } = transport({
      gitRun: async (/** @type {string[]} */ args) =>
        args[0] === 'rev-parse'
          ? { code: 0, stdout: `${'c'.repeat(40)}\n`, stderr: '' }
          : { code: 0, stdout: '', stderr: '' }
    });

    const lin = await t.lineage('UI-1', {
      prior_head_sha: HEAD,
      head_sha: NEW_HEAD,
      target_base: 'main',
      head_ref: 'UI-1',
      mutation: 'base_update'
    });

    expect(lin).toMatchObject({
      queue_owned: false,
      reason: 'remote_ref_mismatch'
    });
  });

  test('accepts an unmoved head without asking for mutation evidence', async () => {
    const { t, calls } = transport();

    const lin = await t.lineage('UI-1', {
      prior_head_sha: HEAD,
      head_sha: HEAD,
      target_base: 'main',
      mutation: null
    });

    expect(lin).toEqual({ queue_owned: true });
    expect(calls.git).toEqual([]);
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

  test('runs the codex reviewer read-only with the explicit preset model', async () => {
    const { t, calls } = transport();

    const result = await t.runReview(reviewPacket());

    expect(result).toEqual({ ok: true, verdict: 'APPROVE', findings: [] });
    expect(calls.spawn).toHaveLength(1);
    expect(calls.spawn[0].runner).toBe('codex');
    expect(calls.spawn[0].cwd).toBe(`${REPO}/.worktrees/UI-1`);
    expect(calls.spawn[0].settings).toMatchObject({
      model: 'sol',
      effort: 'xhigh',
      mode: 'review',
      fast_track: false
    });
    expect(calls.spawn[0].bead.prompt).toContain(HEAD);
    expect(calls.spawn[0].bead.prompt).toContain(HEAD_REVIEW_VERDICT_MARKER);
  });

  test('carries the prior receipt and approved spec into the packet', async () => {
    const { t, calls, issue } = transport();
    issue.metadata.impl_review = `codex@${HEAD}`;
    issue.metadata.spec_id = 'docs/spec.md';

    await t.runReview(reviewPacket());

    expect(calls.spawn[0].bead.prompt).toContain(`codex@${HEAD}`);
    expect(calls.spawn[0].bead.prompt).toContain('docs/spec.md');
  });

  test('reads a native-only spec_id into the review prompt', async () => {
    const { t, calls, issue } = transport();
    issue.spec_id = 'docs/native-spec.md';

    await t.runReview(reviewPacket());

    expect(calls.spawn[0].bead.prompt).toContain('docs/native-spec.md');
  });

  test('maps a claude-family reviewer onto the claude runner', async () => {
    const { t, calls } = transport();

    await t.runReview(reviewPacket({ reviewer: 'opus', effort: 'high' }));

    expect(calls.spawn[0].runner).toBe('claude');
    expect(calls.spawn[0].settings.model).toBe('opus');
    expect(calls.spawn[0].settings.mode).toBe('review');
  });

  test('reports a missing verdict marker as malformed', async () => {
    const { t } = transport({ sessionText: '끝났지만 verdict 없음' });

    const result = await t.runReview(reviewPacket());

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
          pid: 1,
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

    const result = await t.runReview(reviewPacket());

    expect(result).toMatchObject({ ok: false, reason: 'blocker' });
  });

  test('refuses to review without the bead worktree', async () => {
    const { t, calls } = transport({
      worktree: { exists: () => false, pathFor: () => '/nowhere' }
    });

    const result = await t.runReview(reviewPacket());

    expect(result).toMatchObject({ ok: false, reason: 'worktree_missing' });
    expect(calls.spawn).toHaveLength(0);
  });

  test('adopts rather than respawns when the spawn window crashed', async () => {
    /** @type {number} */
    let spawns = 0;
    const { t } = transport({
      makeRunner: (/** @type {string} */ name) => ({
        name,
        spawn: () => {
          spawns += 1;
          // The process starts, writes its log, and the worker dies before
          // recording the terminal result.
          throw Object.assign(new Error('worker died'), { after_spawn: true });
        }
      })
    });

    await t.runReview(reviewPacket());
    const again = await t.runReview(reviewPacket());

    // The prerecorded marker is what stops a SECOND process for the same
    // attempt; an unrecoverable adoption fails closed instead.
    expect(spawns).toBe(1);
    expect(again).toMatchObject({ ok: false });
  });

  test('returns a recorded terminal result instead of re-running an attempt', async () => {
    const { t, calls } = transport();
    await t.runReview(reviewPacket());

    const again = await t.runReview(reviewPacket());

    expect(again).toEqual({ ok: true, verdict: 'APPROVE', findings: [] });
    expect(calls.spawn).toHaveLength(1);
  });
});

describe('worker/head-review-transport — repair runs', () => {
  const REPAIR_TEXT = [
    '수정 완료',
    `${HEAD_REPAIR_RESULT_MARKER} {"self_review":"APPROVE"}`
  ].join('\n');

  test('parses the structured repair result line', () => {
    expect(
      parseRepairResultLine(
        `x\n${HEAD_REPAIR_RESULT_MARKER} {"self_review":"REVISE"}`
      )
    ).toEqual({ self_review: 'REVISE' });
  });

  test('returns the observed head and self-review verdict on success', async () => {
    const { t, calls, issue } = transport({ sessionText: REPAIR_TEXT });
    issue.metadata.exec_receipt = `delegated:codex@${NEW_HEAD}`;

    const result = await t.runRepair(repairPacket());

    expect(result).toEqual({
      ok: true,
      head_sha: NEW_HEAD,
      self_review: 'APPROVE'
    });
    expect(calls.spawn).toHaveLength(1);
    expect(calls.spawn[0].settings.mode).toBeNull();
    expect(calls.spawn[0].bead.prompt).toContain('impl_review=self@');
    // The instructed receipt copies the repair dispatch's own effort, so the
    // repair round writes the contract's delegated format rather than the
    // pre-effort one.
    expect(calls.spawn[0].bead.prompt).toContain(
      'exec_receipt=delegated:codex:xhigh@'
    );
  });

  test('refuses a repair whose exec_receipt does not bind the new head', async () => {
    const { t, issue } = transport({ sessionText: REPAIR_TEXT });
    issue.metadata.exec_receipt = `delegated:codex@${HEAD}`;

    const result = await t.runRepair(repairPacket());

    expect(result).toMatchObject({
      ok: false,
      reason: 'repair_exec_receipt_mismatch'
    });
  });

  test('refuses a repair that returned no structured self-review', async () => {
    const { t, issue } = transport({ sessionText: '수정했다' });
    issue.metadata.exec_receipt = `delegated:codex@${NEW_HEAD}`;

    const result = await t.runRepair(repairPacket());

    expect(result).toMatchObject({
      ok: false,
      reason: 'repair_result_missing'
    });
  });

  test('refuses to repair while an ordinary session owns the bead', async () => {
    const { t, calls } = transport({
      sessionText: REPAIR_TEXT,
      beadSessionActive: () => true
    });

    const result = await t.runRepair(repairPacket());

    expect(result).toMatchObject({ ok: false, reason: 'bead_running' });
    expect(calls.spawn).toHaveLength(0);
  });

  test('refuses to repair when the prerecorded findings are gone', async () => {
    const { t, calls } = transport({ sessionText: REPAIR_TEXT });

    const result = await t.runRepair(repairPacket({ findings: null }));

    expect(result).toMatchObject({
      ok: false,
      reason: 'repair_findings_unavailable'
    });
    expect(calls.spawn).toHaveLength(0);
  });

  test('reports a failed repair session without observing a head', async () => {
    /** @type {any[]} */
    const probes = [];
    const { t } = transport({
      makeRunner: () => ({
        name: 'codex',
        spawn: () => ({
          pid: 1,
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

    const result = await t.runRepair(repairPacket());

    expect(result).toMatchObject({ ok: false, reason: 'turn_failed' });
    expect(probes).toEqual([]);
  });
});

describe('worker/head-review-transport — attempt history', () => {
  test('opens a running record before the spawn and settles it done', async () => {
    const store = attemptStore();
    const { t } = transport({ store });

    await t.runReview(
      reviewPacket({ origin: 'auto', reviewer_source: 'harness' })
    );

    expect(store.attempts['review:authority-1:x']).toMatchObject({
      bead_id: 'UI-1',
      kind: 'head_review',
      origin: 'auto',
      reviewer_source: 'harness',
      authority_id: 'authority-1',
      head_sha: HEAD,
      status: 'done'
    });
  });

  test('points log_path at the attempt session log instead of copying it', async () => {
    const store = attemptStore();
    const { t } = transport({ store });

    await t.runReview(reviewPacket());

    expect(store.attempts['review:authority-1:x'].log_path).toMatch(
      /head-review-attempts\/review_authority-1_x\.log\.jsonl$/
    );
  });

  test('copies the runner result usage onto the settled attempt', async () => {
    const store = attemptStore();
    const { t } = transport({
      store,
      makeRunner: (/** @type {string} */ name) => ({
        name,
        spawn: () => ({
          pid: 7,
          done: Promise.resolve({
            success: true,
            reason: 'ok',
            exit: 0,
            blocked: false,
            events: [
              {
                kind: 'text',
                text: `${HEAD_REVIEW_VERDICT_MARKER} {"verdict":"APPROVE","findings":[]}`
              }
            ],
            raw: [
              {
                type: 'turn.completed',
                usage: { input_tokens: 11, output_tokens: 5 }
              }
            ]
          })
        })
      })
    });

    await t.runReview(reviewPacket());

    expect(store.attempts['review:authority-1:x'].usage).toMatchObject({
      input_tokens: 11,
      output_tokens: 5
    });
  });

  test('records a failed session as a failed attempt', async () => {
    const store = attemptStore();
    const { t } = transport({
      store,
      makeRunner: (/** @type {string} */ name) => ({
        name,
        spawn: () => ({
          pid: 7,
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

    await t.runReview(reviewPacket());

    expect(store.attempts['review:authority-1:x']).toMatchObject({
      status: 'failed',
      cause: 'blocker'
    });
  });

  test('adopts a terminal marker into a history record that was never written', async () => {
    const store = attemptStore();
    const { t, calls } = transport({ store });
    await t.runReview(reviewPacket());
    delete store.attempts['review:authority-1:x'];
    calls.spawn.length = 0;

    await t.runReview(reviewPacket());

    expect(calls.spawn).toHaveLength(0);
    expect(store.attempts['review:authority-1:x']).toMatchObject({
      status: 'done'
    });
  });

  test('settles a running record whose marker never landed', () => {
    const store = attemptStore({
      'review:authority-9:x': {
        attempt_id: 'review:authority-9:x',
        bead_id: 'UI-1',
        kind: 'head_review',
        status: 'running'
      }
    });
    const { t } = transport({ store });

    t.reconcileAttempts();

    expect(store.attempts['review:authority-9:x']).toMatchObject({
      status: 'failed',
      cause: 'attempt_marker_missing'
    });
  });

  test('leaves an adoptable marker alone during reconcile', async () => {
    const store = attemptStore();
    const { t } = transport({
      store,
      makeRunner: (/** @type {string} */ name) => ({
        name,
        spawn: () => ({ pid: 99, done: new Promise(() => {}) })
      })
    });
    void t.runReview(reviewPacket());
    while (!store.attempts['review:authority-1:x']) {
      await new Promise((resolve) => setTimeout(resolve, 0));
    }

    t.reconcileAttempts();

    expect(store.attempts['review:authority-1:x'].status).toBe('running');
  });
});

describe('worker/head-review-transport — upstream violation note', () => {
  test('appends one comment for a root and head', async () => {
    /** @type {any[]} */
    const comments = [];
    const { t } = transport({
      bd: {
        readIssue: async () => ({ metadata: {} }),
        setMetadata: async () => {},
        comment: async (
          /** @type {string} */ bead_id,
          /** @type {string} */ text
        ) => {
          comments.push({ bead_id, text });
        }
      }
    });

    const first = await t.recordUpstreamViolation({
      root_bead_id: 'UI-1',
      head_sha: HEAD,
      reason: 'review_receipt_missing',
      prior_receipt: null,
      gate_reason: 'review_receipt_missing'
    });

    expect(first).toBe(true);
    expect(comments).toEqual([
      {
        bead_id: 'UI-1',
        text: expect.stringContaining(
          `## ⚠️ 상류 위반 관측 — impl_review missing@${HEAD}`
        )
      }
    ]);
  });

  test('writes nothing the second time for the same root and head', async () => {
    /** @type {any[]} */
    const comments = [];
    const { t } = transport({
      bd: {
        readIssue: async () => ({ metadata: {} }),
        setMetadata: async () => {},
        comment: async () => {
          comments.push(1);
        }
      }
    });
    const input = {
      root_bead_id: 'UI-1',
      head_sha: HEAD,
      reason: 'review_receipt_stale',
      prior_receipt: `codex@${NEW_HEAD}`,
      gate_reason: 'review_receipt_stale'
    };

    await t.recordUpstreamViolation(input);
    const second = await t.recordUpstreamViolation(input);

    expect(second).toBe(false);
    expect(comments).toHaveLength(1);
  });

  test('reports a failed comment without throwing so dispatch continues', async () => {
    const { t } = transport({
      bd: {
        readIssue: async () => ({ metadata: {} }),
        setMetadata: async () => {},
        comment: async () => {
          throw new Error('bd down');
        }
      }
    });

    const recorded = await t.recordUpstreamViolation({
      root_bead_id: 'UI-1',
      head_sha: HEAD,
      reason: 'review_receipt_missing'
    });

    expect(recorded).toBe(false);
  });
});
