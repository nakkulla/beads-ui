/**
 * The `[리뷰 후 머지]` click (UI-d7fy §5).
 *
 * A missing or stale `impl_review` receipt HOLDS the merge gate: the queue
 * dispatches no reviewer and repairs nothing (§4). This module is that hold's
 * only exit. The click grants exactly the authority `[머지]` grants and resumes
 * the Bead's recorded session to run the REVIEW LINEAGE — one implementation
 * review, and on `REVISE` the ordinary single-pass batch fix plus an
 * exact-delta self-review — after which the queue, still the sole owner of the
 * merge, re-judges the gate.
 *
 * Three properties carry the design:
 *
 *   1. ONE WRITE AUTHORIZES. The authority grant and the `review_session`
 *      attempt registration ride the same `enqueueMergeManual` CAS (§5.2). A
 *      failed write dispatches nothing, so there is no state in which a session
 *      is reviewing under an authority the queue never recorded.
 *   2. THE FINAL HEAD IS THE SUBJECT. A `REVISE` fix pushes to the PR head
 *      branch, which MOVES the head. So the completion verdict re-observes the
 *      PR and judges `reviewReceiptState(receipt, final_head)` (§5.4) — never
 *      the head that was clicked.
 *   3. A DEAD BINDING WRITES NOTHING. A cancel (§5.6) settles the attempt and
 *      reclaims the authority in its own write, so a session that outlives the
 *      stop finds its binding gone and records nothing at all — not even its
 *      own failure.
 *
 * The session-selection rule is NOT redefined here: it is the REVISE-parking
 * `fix` disposition's rule (`revise-disposition.js` → `qualifySessionFork`),
 * which is exactly §5.2's — the last `claude:` entry of `session_ref` with a
 * transcript on this machine is resumed, and a missing transcript, a `codex:`
 * last entry, or no entry at all opens a fresh replacement session.
 *
 * Reviewer selection (`impl_review_model`/`impl_review_effort`) is left to the
 * session's own `review` skill ladder; the server does not participate.
 */
import { debug } from '../logging.js';
import { qualifySessionFork } from './session-ref.js';

const log = debug('worker:review-session');

/**
 * The gate reasons the `[리뷰 후 머지]` button answers (§5.1).
 *
 * `review_receipt_undetermined` is absent on purpose: a probe error is not a
 * verdict, and the next observation re-takes it. `spec_id_missing` is absent
 * because no amount of reviewing writes a `spec_id` — offering the button
 * there is the UI-yqw9 incident.
 *
 * @type {Set<string>}
 */
export const REVIEW_AFTER_MERGE_GATE_REASONS = new Set([
  'review_receipt_missing',
  'review_receipt_stale'
]);

/**
 * Whether a merge-gate reason is the one this click resolves.
 *
 * @param {unknown} reason
 * @returns {boolean}
 */
export function isReviewAfterMergeReason(reason) {
  return (
    typeof reason === 'string' && REVIEW_AFTER_MERGE_GATE_REASONS.has(reason)
  );
}

/**
 * Which session the click resumes, by the REVISE-parking `fix` rule (§5.2).
 *
 * The runner is pinned to `claude` rather than taken from the dispatch's own
 * resolution: `--resume` is a claude-transcript operation, so a codex-resolved
 * dispatch could not honour a claude ref, and a codex ref is explicitly a
 * fresh-session case in the contract.
 *
 * @param {Record<string, unknown>|null|undefined} metadata - The Bead's metadata bag.
 * @param {{ home_dir?: string }} [options]
 * @returns {{ resume_session_id: string|null, session_source: 'resume'|'fresh', reason: string|null }}
 */
export function selectReviewSession(metadata, options = {}) {
  const qualified = qualifySessionFork(metadata, 'claude', options);
  return qualified.ok
    ? {
        resume_session_id: qualified.session_id,
        session_source: /** @type {const} */ ('resume'),
        reason: null
      }
    : {
        resume_session_id: null,
        session_source: /** @type {const} */ ('fresh'),
        reason: qualified.reason
      };
}

/**
 * The review session's task prompt (§5.3).
 *
 * It carries FACTS and PROHIBITIONS only. The procedure — how a review is run,
 * how `REVISE` findings are disposed of, what an exact-delta self-review is —
 * belongs to the workflow contract, and restating it here would create a second
 * copy free to drift from the one the session actually follows.
 *
 * @param {{ bead_id: string, pr_url: string|null, head_ref: string|null, head_sha: string, impl_review: string|null, gate_reason: string, attempt_id: string }} input
 * @returns {string}
 */
export function reviewSessionPrompt(input) {
  return [
    `Bead ${input.bead_id} — 머지 게이트 리뷰 보류 해소 (리뷰 lineage 전용).`,
    'beads-ui `[리뷰 후 머지]` 클릭이 이 세션을 인가했다. 그 클릭은 세션 밖 human 액션이며 리뷰 진입 승인이다.',
    [
      '관측된 사실:',
      `- PR: ${input.pr_url || '(URL 미상)'}`,
      `- PR head 브랜치: ${input.head_ref || '(미상)'}`,
      `- 관측 head SHA: ${input.head_sha}`,
      `- 현재 impl_review: ${input.impl_review || '(없음)'}`,
      `- 게이트 사유: ${input.gate_reason}`,
      `- attempt id: ${input.attempt_id}`
    ].join('\n'),
    [
      '지시 — 리뷰 lineage만 수행한다 (절차는 workflow 계약 "Worker manual merge continuation" 소유):',
      '1. 이 PR의 구현 리뷰를 1회 수행한다.',
      '2. APPROVE면 `impl_review` 영수증을 쓰고 `bd show <id> --json`으로 readback한 뒤 종료한다.',
      '3. REVISE면 계약의 단일 패스 규칙대로 finding을 전부 처분하고 일괄 수정한 뒤 exact-delta self-review를 하고, 그다음 `impl_review` 영수증을 쓰고 readback한 뒤 종료한다.',
      `4. 수정 커밋·push는 PR head 브랜치(${input.head_ref || '해당 PR의 head'})에만 한다.`
    ].join('\n'),
    [
      '금지:',
      '- 머지 (머지는 beads-ui 큐가 소유한다)',
      '- PR 상태 변경 (close·draft 전환·base 변경)',
      '- base ref push',
      '- 큐 상태 파일 편집'
    ].join('\n')
  ].join('\n\n');
}

/**
 * Turn a `reviewReceiptState` verdict into the gate reason the row displays.
 *
 * @param {string} state
 * @returns {string}
 */
function holdReasonFor(state) {
  return state === 'spec_id_missing'
    ? 'spec_id_missing'
    : `review_receipt_${state}`;
}

/**
 * Build the `[리뷰 후 머지]` coordinator for ONE workspace.
 *
 * @param {{
 *   workspace: string,
 *   store: any,
 *   bd: { readIssue: (bead_id: string) => Promise<Record<string, any>> },
 *   scheduler: { dispatchReviewSession: (workspace: string, input: { bead_id: string, attempt_id: string, prompt: string, resume_session_id: string|null }) => Promise<{ ok: boolean, reason?: string }> },
 *   observeReviewReceipt: (bead_id: string) => Promise<{ ok: true, head_sha: string, head_ref: string|null, state: string }|{ ok: false, reason: string }>,
 *   kick?: () => Promise<void>|void,
 *   notifyChanged?: (workspace: string) => void,
 *   homeDir?: string,
 *   makeAttemptId?: (bead_id: string) => string,
 *   now?: () => number
 * }} deps
 */
export function createReviewSession(deps) {
  const workspace = deps.workspace;
  const now = deps.now || (() => Date.now());
  const notifyChanged = deps.notifyChanged || (() => {});
  let attempt_seq = 0;
  const makeAttemptId =
    deps.makeAttemptId ||
    ((/** @type {string} */ bead_id) =>
      `${bead_id}-review-${now()}-${++attempt_seq}`);

  /**
   * Read the two metadata facts the click needs. A bd that cannot be read is
   * NOT a refusal: the review is exactly what re-establishes the receipt, and
   * an unreadable `session_ref` only means the fresh-session fallback.
   *
   * @param {string} bead_id
   * @returns {Promise<Record<string, any>>}
   */
  async function readMetadata(bead_id) {
    try {
      const issue = await deps.bd.readIssue(bead_id);
      return issue && typeof issue.metadata === 'object' && issue.metadata
        ? issue.metadata
        : {};
    } catch (err) {
      log('review session metadata read failed for %s: %o', bead_id, err);
      return {};
    }
  }

  /**
   * Whether the attempt still speaks for a live authority (§5.4). Read AHEAD of
   * the re-observation so a cancelled session spends no `gh` call before
   * discovering it has nothing to write.
   *
   * @param {string} attempt_id
   * @returns {boolean}
   */
  function bindingAlive(attempt_id) {
    /** @type {any} */
    let q;
    try {
      q = deps.store.snapshot(workspace);
    } catch (err) {
      log('review session binding read failed for %s: %o', attempt_id, err);
      return false;
    }
    const attempt = (q.attempts || {})[attempt_id];
    if (
      !attempt ||
      attempt.kind !== 'review_session' ||
      (attempt.status !== 'pending' && attempt.status !== 'running')
    ) {
      return false;
    }
    const entry = (q.merge_queue || []).find(
      (/** @type {any} */ item) => item.bead_id === attempt.bead_id
    );
    return !!entry && entry.authority?.id === attempt.authority_id;
  }

  /**
   * @param {string} attempt_id
   * @param {{ outcome: 'current'|'failed', final_head_sha?: string|null, cause?: string|null, hold_reason?: string|null, from?: 'launch'|'completion' }} verdict
   */
  function settle(attempt_id, verdict) {
    const result = deps.store.settleReviewSession(workspace, {
      attempt_id,
      at: now(),
      ...verdict
    });
    if (result.ok) {
      notifyChanged(workspace);
    }
    return result;
  }

  return {
    /**
     * The click (§5.2). `probe` is the click's OWN authoritative observation —
     * the same one `[머지]` binds its authority to — so the authority, the
     * attempt and the prompt all describe one moment.
     *
     * @param {{ bead_id: string, expected_revision: number, probe: { head_sha: string, target_base: string, head_ref?: string|null, pr_url?: string|null, external?: boolean, reason: string } }} input
     * @returns {Promise<any>}
     */
    async start(input) {
      const bead_id = input.bead_id;
      const probe = input.probe;
      const metadata = await readMetadata(bead_id);
      const selection = selectReviewSession(metadata, {
        ...(deps.homeDir ? { home_dir: deps.homeDir } : {})
      });
      const attempt_id = makeAttemptId(bead_id);
      const written = deps.store.enqueueMergeManual(workspace, {
        expected_revision: input.expected_revision,
        entries: [
          {
            bead_id,
            head_sha: probe.head_sha,
            target_base: probe.target_base,
            external: probe.external === true
          }
        ],
        review_session: {
          attempt_id,
          session_source: selection.session_source
        }
      });
      // A failed write dispatches NOTHING (§5.2): the authority and the attempt
      // are one decision, so half of it must never reach a session.
      if (!written.ok) {
        return written;
      }
      notifyChanged(workspace);
      // The per-Bead in-flight guard already had a session under this
      // authority. The click reused the authority and creates nothing.
      if (written.review_session_registered !== true) {
        return written;
      }
      /** @type {{ ok: boolean, reason?: string }} */
      let dispatched;
      try {
        dispatched = await deps.scheduler.dispatchReviewSession(workspace, {
          bead_id,
          attempt_id,
          resume_session_id: selection.resume_session_id,
          prompt: reviewSessionPrompt({
            bead_id,
            pr_url: probe.pr_url ?? null,
            head_ref: probe.head_ref ?? null,
            head_sha: probe.head_sha,
            impl_review:
              typeof metadata.impl_review === 'string'
                ? metadata.impl_review
                : null,
            gate_reason: probe.reason,
            attempt_id
          })
        });
      } catch (err) {
        log('review session launch threw for %s: %o', bead_id, err);
        dispatched = { ok: false, reason: 'error' };
      }
      if (!dispatched.ok) {
        settle(attempt_id, {
          outcome: 'failed',
          from: 'launch',
          cause: `launch_failed:${dispatched.reason || 'unknown'}`,
          hold_reason: probe.reason,
          final_head_sha: probe.head_sha
        });
      }
      return { ...written, attempt_id, dispatched: dispatched.ok };
    },

    /**
     * The completion verdict (§5.4), called once the session process exits.
     *
     * @param {{ attempt_id: string, bead_id: string, session_ok: boolean, reason?: string|null }} input
     * @returns {Promise<{ ok: boolean, reason?: string }>}
     */
    async complete(input) {
      const attempt_id = input.attempt_id;
      if (!bindingAlive(attempt_id)) {
        return { ok: false, reason: 'binding_gone' };
      }
      // A session that died is a failure whatever the Bead now says: the
      // receipt branch below judges a session that RAN to the end.
      if (input.session_ok !== true) {
        const settled = settle(attempt_id, {
          outcome: 'failed',
          cause: `session_failed:${input.reason || 'unknown'}`,
          hold_reason: null
        });
        return { ok: settled.ok, reason: 'session_failed' };
      }
      /** @type {any} */
      let observed;
      try {
        observed = await deps.observeReviewReceipt(input.bead_id);
      } catch (err) {
        log(
          'review receipt re-observation threw for %s: %o',
          input.bead_id,
          err
        );
        observed = { ok: false, reason: 'observation_error' };
      }
      if (observed.ok !== true) {
        settle(attempt_id, {
          outcome: 'failed',
          cause: 'receipt_not_current',
          hold_reason: 'review_receipt_undetermined'
        });
        return { ok: false, reason: observed.reason || 'observation_failed' };
      }
      if (observed.state !== 'current') {
        settle(attempt_id, {
          outcome: 'failed',
          cause: 'receipt_not_current',
          hold_reason: holdReasonFor(String(observed.state)),
          final_head_sha: observed.head_sha
        });
        return { ok: false, reason: 'receipt_not_current' };
      }
      const settled = settle(attempt_id, {
        outcome: 'current',
        final_head_sha: observed.head_sha
      });
      if (settled.ok && typeof deps.kick === 'function') {
        try {
          await deps.kick();
        } catch (err) {
          log('review session kick failed for %s: %o', input.bead_id, err);
        }
      }
      return {
        ok: settled.ok,
        reason: settled.ok ? undefined : 'settle_failed'
      };
    }
  };
}
