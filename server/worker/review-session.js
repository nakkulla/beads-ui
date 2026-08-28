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
 * The gate reasons the `[리뷰 후 머지]` button answers (§5.1), widened to the
 * workflow contract's four by the 2026-08-28 auto-review-dispatch spec (§4 1번)
 * so that the button and the queue's automatic dispatch answer ONE set.
 *
 * `review_receipt_undetermined` is in it now: a probe error is still not a
 * verdict, but a receipt the review session writes at the exact head is judged
 * `equal` without a probe, so the review lineage is the only exit a persistent
 * probe error has. `spec_id_missing` stays out because no amount of reviewing
 * writes a `spec_id` — offering the button there is the UI-yqw9 incident.
 *
 * @type {Set<string>}
 */
export const REVIEW_AFTER_MERGE_GATE_REASONS = new Set([
  'review_receipt_missing',
  'review_receipt_stale',
  'review_receipt_invalid',
  'review_receipt_undetermined'
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
 * The ONE sentence the two triggers do not share is the authorization: the
 * session is told, truthfully, what let it in (2026-08-28 auto-review-dispatch
 * spec §4.1). It is never told which authority the row carries — the session
 * has no use for that, and naming it would invite it to reason about the merge
 * it is forbidden to perform.
 *
 * @param {{ bead_id: string, trigger: 'click'|'auto', pr_url: string|null, head_ref: string|null, head_sha: string, impl_review: string|null, gate_reason: string, attempt_id: string }} input
 * @returns {string}
 */
export function reviewSessionPrompt(input) {
  return [
    `Bead ${input.bead_id} — 머지 게이트 리뷰 보류 해소 (리뷰 lineage 전용).`,
    input.trigger === 'auto'
      ? 'beads-ui 머지 큐가 durable `review_dispatch` claim으로 이 세션을 인가했다(workflow 계약 `auto_review_dispatch`, head당 1회). 사람의 클릭은 없었다.'
      : 'beads-ui `[리뷰 후 머지]` 클릭이 이 세션을 인가했다. 그 클릭은 세션 밖 human 액션이며 리뷰 진입 승인이다.',
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
 *   scheduler: { dispatchReviewSession: (workspace: string, input: { bead_id: string, attempt_id: string, prompt: string, resume_session_id: string|null, head_ref: string|null }) => Promise<{ ok: boolean, reason?: string }> },
 *   observeReviewReceipt: (bead_id: string) => Promise<{ ok: true, head_sha: string, head_ref: string|null, state: string }|{ ok: false, reason: string }>,
 *   guardHook?: { readPushLog?: (input: { workspace: string, attempt_id: string }) => { ok: true, entries: Record<string, unknown>[] }|{ ok: false, reason: string } },
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
   * The authority the row ALREADY carries, which an automatic dispatch rides
   * and never replaces (§4 2번). Null when the row is gone, unreadable, or is
   * one of the legacy authority-less rows whose only exit is the button.
   *
   * @param {string} bead_id
   * @returns {{ id: string, source: 'manual'|'automatic' }|null}
   */
  function authorityOf(bead_id) {
    /** @type {any} */
    let q;
    try {
      q = deps.store.snapshot(workspace);
    } catch (err) {
      log('review session authority read failed for %s: %o', bead_id, err);
      return null;
    }
    const entry = (q.merge_queue || []).find(
      (/** @type {any} */ item) => item.bead_id === bead_id
    );
    const authority = entry?.authority ?? null;
    return authority && typeof authority.id === 'string' ? authority : null;
  }

  /**
   * Whether THIS attempt is what moved the PR head to where it now stands
   * (2026-08-28 auto-review-dispatch spec §5.2), from the attempt's own
   * pre-push record and nothing else.
   *
   * Three answers, and the third is not a shrug: `null` means the record could
   * not be read at all, and §4 reads the resulting `head_sha: null` claim as
   * "no automatic dispatch at ANY head". Guessing either way would either send
   * a second external review into a lineage that is already running, or lock a
   * genuinely new head out of its own first one.
   *
   * @param {string} attempt_id
   * @param {string|null} final_head_sha
   * @returns {boolean|null}
   */
  function headMovedBySession(attempt_id, final_head_sha) {
    if (typeof final_head_sha !== 'string' || final_head_sha.length === 0) {
      return null;
    }
    const readPushLog = deps.guardHook?.readPushLog;
    if (typeof readPushLog !== 'function') {
      return null;
    }
    /** @type {{ ok: true, entries: Record<string, unknown>[] }|{ ok: false, reason: string }} */
    let read;
    try {
      read = readPushLog({ workspace, attempt_id });
    } catch (err) {
      log('review session push log read threw for %s: %o', attempt_id, err);
      return null;
    }
    if (read.ok !== true) {
      return null;
    }
    const final = final_head_sha.toLowerCase();
    return read.entries.some(
      (entry) =>
        typeof entry.local_oid === 'string' &&
        entry.local_oid.toLowerCase() === final
    );
  }

  /**
   * @param {string} attempt_id
   * @param {{ outcome: 'current'|'failed', final_head_sha?: string|null, head_moved_by_session?: boolean|null, cause?: string|null, hold_reason?: string|null, from?: 'launch'|'completion' }} verdict
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

  /**
   * Launch the session an already-committed attempt stands for, and settle it
   * when the launch is refused.
   *
   * SHARED by the click and the automatic dispatch (2026-08-28
   * auto-review-dispatch spec §4.1). The two triggers differ in ONE thing —
   * the store op that committed the attempt — so everything after that write
   * is this function, and the prompt's authorization sentence is the only
   * place the difference reaches the session.
   *
   * Every launch refusal is one settlement: a `bead_running`, a
   * `bd_snapshot_failed`, a missing worktree and a spawn error are not told
   * apart (결정 2). The hold stays, the claim is exhausted, and the button is
   * the exit.
   *
   * @param {{ bead_id: string, attempt_id: string, trigger: 'click'|'auto', head_sha: string, head_ref: string|null, pr_url: string|null, reason: string, metadata: Record<string, any>, selection: { resume_session_id: string|null, session_source: 'resume'|'fresh' } }} input
   * @returns {Promise<{ ok: boolean, reason?: string }>}
   */
  async function launch(input) {
    /** @type {{ ok: boolean, reason?: string }} */
    let dispatched;
    try {
      dispatched = await deps.scheduler.dispatchReviewSession(workspace, {
        bead_id: input.bead_id,
        attempt_id: input.attempt_id,
        resume_session_id: input.selection.resume_session_id,
        // The PR head branch, not just prompt text: a bead whose worktree
        // post-merge cleanup or a manual removal took away is restored from
        // this ref by the dispatch. Without it a recoverable worktree is a
        // flat `worktree_missing` refusal.
        head_ref: input.head_ref,
        prompt: reviewSessionPrompt({
          bead_id: input.bead_id,
          trigger: input.trigger,
          pr_url: input.pr_url,
          head_ref: input.head_ref,
          head_sha: input.head_sha,
          impl_review:
            typeof input.metadata.impl_review === 'string'
              ? input.metadata.impl_review
              : null,
          gate_reason: input.reason,
          attempt_id: input.attempt_id
        })
      });
    } catch (err) {
      log('review session launch threw for %s: %o', input.bead_id, err);
      dispatched = { ok: false, reason: 'error' };
    }
    if (!dispatched.ok) {
      settle(input.attempt_id, {
        outcome: 'failed',
        from: 'launch',
        cause: `launch_failed:${dispatched.reason || 'unknown'}`,
        hold_reason: input.reason,
        // No session ran, so the head cannot have moved under one: the claim
        // stays exhausted exactly where it was taken (§5.2).
        final_head_sha: input.head_sha,
        head_moved_by_session: false
      });
    }
    return dispatched;
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
      const dispatched = await launch({
        bead_id,
        attempt_id,
        trigger: 'click',
        head_sha: probe.head_sha,
        head_ref: probe.head_ref ?? null,
        pr_url: probe.pr_url ?? null,
        reason: probe.reason,
        metadata,
        selection
      });
      return { ...written, attempt_id, dispatched: dispatched.ok };
    },

    /**
     * The queue's own dispatch of the SAME lineage, once per head (2026-08-28
     * auto-review-dispatch spec §4.1).
     *
     * It never mints authority and never changes its source — only a click
     * does that — so it rides the authority the row already carries, and the
     * claim it writes is the one that stops a second review from ever
     * reaching the same head, whichever trigger spends it.
     *
     * `expected` re-states the facts §4 judged on, because a bead metadata
     * read sits between the judgment and the write: a click or a re-observation
     * in that window would otherwise bind an old head to a new authority. The
     * store rejects the mismatch and the next `kick()` simply judges again.
     *
     * @param {{ bead_id: string, head_sha: string, head_ref: string|null, reason: string }} input
     * @returns {Promise<{ ok: boolean, reason?: string, attempt_id?: string, dispatched?: boolean }>}
     */
    async startAuto(input) {
      const bead_id = input.bead_id;
      const authority = authorityOf(bead_id);
      if (!authority) {
        return { ok: false, reason: 'authority_missing' };
      }
      const metadata = await readMetadata(bead_id);
      const selection = selectReviewSession(metadata, {
        ...(deps.homeDir ? { home_dir: deps.homeDir } : {})
      });
      const attempt_id = makeAttemptId(bead_id);
      const claimed = deps.store.claimAutoReviewDispatch(workspace, {
        bead_id,
        attempt_id,
        session_source: selection.session_source,
        expected: {
          authority_id: authority.id,
          authority_source: authority.source,
          hold_reason: input.reason,
          head_sha: input.head_sha
        }
      });
      // A refused claim dispatches NOTHING (§4.1, UI-d7fy 속성 1): the attempt
      // and the claim are one decision, so half of it must never reach a
      // session.
      if (!claimed.ok) {
        return claimed;
      }
      notifyChanged(workspace);
      const dispatched = await launch({
        bead_id,
        attempt_id,
        trigger: 'auto',
        head_sha: input.head_sha,
        head_ref: input.head_ref,
        // The gate refusal the hold was written from carries no PR url, so the
        // prompt says `(URL 미상)` — exactly as the click path's probe leaves
        // it when GitHub gave none.
        pr_url: null,
        reason: input.reason,
        metadata,
        selection
      });
      return { ...claimed, attempt_id, dispatched: dispatched.ok };
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
      // The re-observation runs AHEAD of the death branch (2026-08-28
      // auto-review-dispatch spec §5.2), not only for the receipt: every
      // receipt-less ending has to say where the head ended up, because that
      // is what decides whether the exhausted claim follows the session's own
      // REVISE push or stays put for a new lineage. Judging a dead session
      // without it would send `head_sha: null` — the fail-closed answer — on
      // every park, turn limit and environment failure alike.
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
      const final_head_sha =
        observed.ok === true && typeof observed.head_sha === 'string'
          ? observed.head_sha
          : null;
      // A session that died is a failure whatever the Bead now says: the
      // receipt branch below judges a session that RAN to the end.
      if (input.session_ok !== true) {
        const settled = settle(attempt_id, {
          outcome: 'failed',
          cause: `session_failed:${input.reason || 'unknown'}`,
          hold_reason: null,
          final_head_sha,
          head_moved_by_session: headMovedBySession(attempt_id, final_head_sha)
        });
        return { ok: settled.ok, reason: 'session_failed' };
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
          final_head_sha,
          head_moved_by_session: headMovedBySession(attempt_id, final_head_sha)
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
