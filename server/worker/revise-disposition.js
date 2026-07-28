/**
 * REVISE-parking disposition actions (UI-hs11 §3.2–§3.4).
 *
 * A bead parked at `blocked_reason=spec_review_stale:revise` is disposed of by
 * a human click in the Worker tab. The click is a session-external human action
 * of the same standing as the merge click and IS explicit user approval — the
 * authority semantics belong to the workflow contract (dotfiles
 * `docs/contracts/workflow.md`, "REVISE parking disposition"); beads-ui only
 * carries the trigger and the observation.
 *
 * Two dispositions:
 *   - {@link createReviseDisposition} `fix` — finding acceptance. The parking
 *     session is resumed (or a substitute session dispatched) with authority to
 *     edit the spec; it applies the findings, publishes on the resolved
 *     `target_base` checkout, and refreshes the receipt itself. This module
 *     judges the RESULT ({@link createReviseDisposition} `complete`) instead of
 *     the PR-existence check every implementation attempt ends with, because a
 *     disposition session opens no PR and would otherwise always fail `no_pr`.
 *   - `approve` — delta approval. No session at all: the server writes
 *     `spec_review = skipped@<target_base tip>` plus the notes lineage and the
 *     unblock in ONE `bd update`, read back.
 *
 * Concurrency (§3.2/§3.3): a per-Bead in-flight guard shared by both actions
 * (the CAS is check-only and cannot cover the async window), plus a per-repo
 * EXCLUSIVE lease held across a fix from dispatch pre-flight to the completion
 * verdict — fix sessions edit the shared `target_base` checkout, so two of them
 * must never overlap there.
 */
import { debug } from '../logging.js';

const log = debug('worker:revise-disposition');

/** A published receipt SHA is exactly 40 hex. */
const SHA40_RE = /^[0-9a-fA-F]{40}$/;

/** The receipt a disposition writes: skip is authority, never review evidence. */
const DISPOSITION_RECEIPT_PREFIX = 'skipped@';

/**
 * The fix-session task prompt. It states the authorizing act, the observed
 * facts the session cannot see from inside (its own parked receipt and the
 * target checkout), and the three prohibitions that keep this session from
 * becoming an implementation run. The PROCEDURE itself is contract-owned, so
 * the prompt points at it rather than restating its rules.
 *
 * The same prompt serves both the `--resume` path and the substitute-session
 * fallback: the lineage it needs (findings, original receipt) lives in the
 * bead's notes either way, so nothing is lost when the transcript is gone.
 *
 * @param {{ bead_id: string, receipt: string|null, repo: string, target_base: string }} input
 * @returns {string}
 */
export function reviseFixPrompt(input) {
  return [
    `Bead ${input.bead_id} REVISE 파킹 처분 — finding 수용.`,
    'beads-ui 처분 클릭이 이 디스패치를 인가했다. 그 클릭은 세션 밖 human 액션이며 explicit user approval에 해당한다.',
    `원 spec_review 영수증: ${input.receipt || '(없음)'}`,
    `스펙 수정 대상 체크아웃: ${input.repo} (target_base: ${input.target_base})`,
    [
      '절차(workflow 계약 "REVISE parking disposition" 소유):',
      '1. 이 비드 notes에 기록된 REVISE findings를 읽고 스펙에 반영한다.',
      `2. 수정은 resolved target_base 체크아웃(${input.repo})에서 하고 거기서 커밋·퍼블리시한다 (fetch, ff-only 동기화, push, ahead == 0).`,
      '3. `spec_review = skipped@<수정 커밋 40hex>` 와 notes 계보(원 영수증·findings·수정 커밋 SHA)를 같은 `bd update`로 기록하고, 그 동일 쓰기에서 `status=open` 과 `blocked_reason` 해제까지 함께 수행한다. readback 필수.',
      '4. 종료한다.'
    ].join('\n'),
    '금지: 재리뷰 디스패치 · 구현 착수 · PR 생성. 구현은 이 처분이 끝난 뒤 워커 일반 레인이 새 세션으로 재디스패치한다.'
  ].join('\n\n');
}

/**
 * Build the notes lineage line a disposition records. Both dispositions write
 * the same three facts — what the click was, what receipt it replaced, and what
 * the new receipt points at — so the bead's history explains the unblock
 * without the reader having to reconstruct it from the UI.
 *
 * @param {{ kind: 'fix'|'approve', receipt: string|null, sha: string, at: string }} input
 * @returns {string}
 */
export function dispositionNotes(input) {
  const what =
    input.kind === 'approve'
      ? '델타 승인(세션 없음, 서버 직접 쓰기)'
      : 'finding 수용(처분 세션 수리)';
  return [
    `${input.at} REVISE 파킹 처분 — beads-ui 처분 클릭(explicit user approval): ${what}.`,
    `원 spec_review: ${input.receipt || '(없음)'} → skipped@${input.sha}.`,
    input.kind === 'approve'
      ? 'findings는 위 notes에 기록된 그대로 두고, 델타를 사용자 권한으로 승인해 unblock했다. 재리뷰 디스패치 없음.'
      : '재리뷰 디스패치 없음. 구현은 워커 일반 레인이 재디스패치한다.'
  ].join(' ');
}

/**
 * Create the REVISE disposition actions for ONE workspace.
 *
 * @param {{
 *   workspace: string,
 *   repo: string,
 *   store: any,
 *   bd: {
 *     readIssue: (bead_id: string) => Promise<Record<string, any>>,
 *     updateFields: (bead_id: string, input: { set?: Record<string, string>, unset?: string[], status?: string, append_notes?: string }) => Promise<void>
 *   },
 *   parked: ReturnType<typeof import('./revise-parked.js').createReviseParkedStore>,
 *   scheduler: { dispatchReviseFix: (workspace: string, input: { bead_id: string, attempt_id: string, prompt: string, prior_receipt: string|null }) => Promise<{ ok: boolean, reason?: string, attempt_id?: string }> },
 *   locks: ReturnType<typeof import('./locks.js').createLockManager>,
 *   gitRun: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   notifyChanged?: (workspace: string) => void,
 *   now?: () => number
 * }} deps
 */
export function createReviseDisposition(deps) {
  const workspace = deps.workspace;
  const repo = deps.repo;
  const now = deps.now || (() => Date.now());
  const notifyChanged = deps.notifyChanged || (() => {});

  /**
   * Beads with a disposition in flight, shared by BOTH actions (§3.2). The CAS
   * is check-only, so without this a second click landing during a fix's
   * multi-minute session would dispatch a second one against the same bead.
   * A `fix` entry lives until its completion verdict; an `approve` entry only
   * spans its own write.
   *
   * The entry is RESERVED before the first `await`, not after the
   * verification: two clicks arriving in the same tick would otherwise both
   * pass a check taken before either had recorded itself, and both proceed.
   *
   * @type {Map<string, { kind: 'fix'|'approve', receipt: string|null, target_base: string, release: (() => void)|null }>}
   */
  const in_flight = new Map();

  /**
   * The per-repo exclusive lease key. A fix session edits the SHARED
   * `target_base` checkout, so two fixes for different beads must serialize
   * there; a busy lease REFUSES rather than queues, because a click that waits
   * minutes for a lock is indistinguishable from a hung UI.
   *
   * @type {string}
   */
  const lease_key = `repo:${repo}::revise-fix`;

  /**
   * @param {string} reason
   * @returns {{ ok: false, reason: string }}
   */
  function refuse(reason) {
    return { ok: false, reason };
  }

  /**
   * Release everything a bead's in-flight entry holds. Idempotent: the fix
   * completion path and its dispatch-failure path both call it.
   *
   * @param {string} bead_id
   */
  function releaseInFlight(bead_id) {
    const entry = in_flight.get(bead_id);
    if (!entry) {
      return;
    }
    in_flight.delete(bead_id);
    if (entry.release) {
      try {
        entry.release();
      } catch (err) {
        log('revise lease release failed for %s: %o', bead_id, err);
      }
    }
  }

  /**
   * The local tip of the resolved `target_base`, as a 40-hex SHA. LOCAL on
   * purpose: the admission gate computes freshness as
   * `git log <receipt_sha>..<target_base>`, against that same local ref, so a
   * receipt pinned to the local tip is exactly what makes the next dispatch
   * read as fresh. An `origin/<base>` tip the local ref has not reached would
   * refuse as `receipt_unreachable` instead.
   *
   * @param {string} target_base
   * @returns {Promise<{ ok: true, sha: string }|{ ok: false, reason: string }>}
   */
  async function baseTip(target_base) {
    /** @type {{ code: number, stdout: string }} */
    let rev;
    try {
      rev = await deps.gitRun(
        ['rev-parse', '--verify', '--quiet', `${target_base}^{commit}`],
        { cwd: repo }
      );
    } catch (err) {
      log('base tip read threw for %s: %o', target_base, err);
      return refuse('git_error');
    }
    const sha = (rev.stdout || '').trim();
    if (rev.code !== 0 || !SHA40_RE.test(sha)) {
      return refuse('base_rev_unavailable');
    }
    return { ok: /** @type {const} */ (true), sha };
  }

  /**
   * Whether a SHA is published on the base's upstream. Fail-CLOSED: a fetch or
   * ancestry probe that cannot answer counts as unpublished, because the whole
   * point of the check is that the next dispatch (and every other checkout)
   * must be able to reach the receipt commit.
   *
   * @param {string} sha
   * @param {string} target_base
   * @returns {Promise<boolean>}
   */
  async function isPublished(sha, target_base) {
    try {
      const fetched = await deps.gitRun(
        ['fetch', '--no-tags', 'origin', target_base],
        { cwd: repo }
      );
      if (fetched.code !== 0) {
        return false;
      }
      const ancestry = await deps.gitRun(
        ['merge-base', '--is-ancestor', sha, `origin/${target_base}`],
        { cwd: repo }
      );
      return ancestry.code === 0;
    } catch (err) {
      log('publish probe failed for %s: %o', sha, err);
      return false;
    }
  }

  /**
   * ISO timestamp for the notes lineage.
   *
   * @returns {string}
   */
  function stamp() {
    return new Date(now()).toISOString();
  }

  /**
   * Read back what a disposition wrote. Returns the observed triple so both the
   * server-side write and the session-side write are judged by the same rule.
   *
   * @param {string} bead_id
   * @returns {Promise<{ ok: true, receipt: string|null, status: string, blocked_reason: unknown }|{ ok: false, reason: string }>}
   */
  async function readBack(bead_id) {
    /** @type {Record<string, any>} */
    let issue;
    try {
      issue = await deps.bd.readIssue(bead_id);
    } catch (err) {
      log('disposition readback failed for %s: %o', bead_id, err);
      return refuse('bd_error');
    }
    const md =
      issue.metadata && typeof issue.metadata === 'object'
        ? issue.metadata
        : {};
    return {
      ok: /** @type {const} */ (true),
      receipt: typeof md.spec_review === 'string' ? md.spec_review : null,
      status: typeof issue.status === 'string' ? issue.status : '',
      blocked_reason: md.blocked_reason
    };
  }

  /**
   * Resume the queue after a successful disposition (§4.5). The park turned
   * `auto_advance` OFF through the failure path, so leaving it off would end the
   * disposition with the queue still stopped — the exact state this feature
   * exists to leave behind.
   *
   * FAIL-VISIBLE: a persist that throws means the queue is still stopped, so
   * the disposition did not achieve what it claims. The caller turns that into
   * a refusal rather than reporting a success the user cannot see.
   *
   * @returns {boolean}
   */
  function resumeAutoAdvance() {
    try {
      deps.store.setAutoAdvance(workspace, true);
    } catch (err) {
      log('auto_advance resume failed for %s: %o', workspace, err);
      return false;
    }
    notifyChanged(workspace);
    return true;
  }

  /**
   * Is a fix (and therefore the repo lease) currently held by any bead? Read
   * off {@link in_flight} rather than `locks.isLocked`, because the lock
   * manager drops its key entry only after the release chain drains a microtask
   * later — a check right after a release would still read as busy.
   *
   * @returns {boolean}
   */
  function fixInFlight() {
    for (const entry of in_flight.values()) {
      if (entry.kind === 'fix') {
        return true;
      }
    }
    return false;
  }

  /**
   * Is a disposition session already running against this repo's shared
   * checkout? Derived from the STORE, not from {@link in_flight}, so it
   * survives a restart: the in-memory lease dies with the process while the
   * `running` disposition attempt it was protecting does not.
   *
   * @returns {boolean}
   */
  function dispositionRunning() {
    /** @type {Record<string, any>} */
    let attempts;
    try {
      attempts = deps.store.snapshot(workspace).attempts || {};
    } catch (err) {
      log('disposition running probe failed for %s: %o', workspace, err);
      // Unknown counts as busy — a fix that cannot see the lane must not
      // launch a second editor of the shared checkout.
      return true;
    }
    for (const attempt of Object.values(attempts)) {
      if (attempt && attempt.status === 'running' && attempt.disposition) {
        return true;
      }
    }
    return false;
  }

  return {
    /**
     * Dispatch the repair session behind [finding 수용·수정] (§3.3).
     *
     * @param {string} bead_id
     * @returns {Promise<{ ok: boolean, reason?: string, attempt_id?: string }>}
     */
    async fix(bead_id) {
      if (in_flight.has(bead_id)) {
        return refuse('action_in_flight');
      }
      // Check and RESERVE in one synchronous run, BEFORE the first await: two
      // clicks arriving in the same tick must not both get past this point.
      // The reservation is also what keeps the lease acquisition below from
      // ever queueing behind a live fix — a click that waits minutes on a lock
      // is indistinguishable from a hung UI.
      if (fixInFlight() || dispositionRunning()) {
        return refuse('lease_busy');
      }
      /** @type {{ kind: 'fix'|'approve', receipt: string|null, target_base: string, release: (() => void)|null }} */
      const reservation = {
        kind: 'fix',
        receipt: null,
        target_base: 'main',
        release: null
      };
      in_flight.set(bead_id, reservation);
      try {
        reservation.release = await deps.locks.acquire(lease_key);
        const verified = await deps.parked.verify(
          workspace,
          deps.store.snapshot(workspace),
          bead_id
        );
        if (!verified.ok) {
          releaseInFlight(bead_id);
          return refuse(verified.reason);
        }
        const observation = verified.observation;
        const entry = in_flight.get(bead_id);
        if (entry) {
          entry.receipt = observation.receipt;
          entry.target_base = observation.target_base;
        }
        /** @type {{ ok: boolean, reason?: string, attempt_id?: string }} */
        let dispatched;
        try {
          dispatched = await deps.scheduler.dispatchReviseFix(workspace, {
            bead_id,
            attempt_id: observation.attempt_id,
            prior_receipt: observation.receipt,
            prompt: reviseFixPrompt({
              bead_id,
              receipt: observation.receipt,
              repo,
              target_base: observation.target_base
            })
          });
        } catch (err) {
          log('revise fix dispatch threw for %s: %o', bead_id, err);
          dispatched = { ok: false, reason: 'error' };
        }
        if (!dispatched.ok) {
          releaseInFlight(bead_id);
          return refuse(dispatched.reason || 'dispatch_failed');
        }
        // The park is over as an observation the moment a session owns it.
        deps.parked.invalidate(workspace, bead_id);
        return dispatched;
      } catch (err) {
        // Nothing below the reservation may leak the lease.
        log('revise fix failed for %s: %o', bead_id, err);
        releaseInFlight(bead_id);
        return refuse('error');
      }
    },

    /**
     * Release a bead's guard + lease without judging anything (§3.3). Every
     * disposition termination that does NOT reach {@link complete} — a failed
     * session, a spawn abort, a ⏸/■ halt — must call this, or the bead and the
     * repo's whole fix lane stay fenced for the life of the process.
     *
     * @param {string} bead_id
     */
    release(bead_id) {
      releaseInFlight(bead_id);
    },

    /**
     * The disposition session's completion verdict (§3.3), called by the
     * scheduler in place of the PR-existence check. Success requires ALL of:
     * the receipt refreshed to a NEW `skipped@<40hex>`, the bead back at
     * exactly `open` with no `blocked_reason`, and the receipt commit published
     * on the base's upstream. Anything else is a failure the banner reports.
     *
     * `open` is checked exactly, not merely "not blocked": the acceptance
     * criterion is that the ORDINARY lane re-dispatches the implementation, and
     * a `resolved`/`closed` bead never becomes ready again — that would end the
     * disposition looking successful with the work silently dropped.
     *
     * `prior_receipt` and `target_base` come from the caller (which reads them
     * off the durable attempt record) so the verdict survives a restart, where
     * this module's in-memory entry is gone; the entry is only a fallback.
     *
     * The lease and the in-flight guard are released here whatever the verdict
     * — this is the end of the disposition either way.
     *
     * @param {{ bead_id: string, prior_receipt?: string|null, target_base?: string|null }} input
     * @returns {Promise<{ ok: boolean, reason?: string }>}
     */
    async complete(input) {
      const bead_id = input.bead_id;
      const entry = in_flight.get(bead_id);
      const prior_receipt =
        input.prior_receipt !== undefined
          ? input.prior_receipt
          : entry
            ? entry.receipt
            : null;
      const target_base =
        input.target_base || (entry ? entry.target_base : 'main');
      try {
        const back = await readBack(bead_id);
        if (!back.ok) {
          return refuse(back.reason);
        }
        const receipt = back.receipt;
        if (
          typeof receipt !== 'string' ||
          !receipt.startsWith(DISPOSITION_RECEIPT_PREFIX) ||
          !SHA40_RE.test(receipt.slice(DISPOSITION_RECEIPT_PREFIX.length)) ||
          receipt === prior_receipt
        ) {
          return refuse('receipt_not_refreshed');
        }
        if (back.status !== 'open' || back.blocked_reason != null) {
          return refuse('still_blocked');
        }
        const sha = receipt.slice(DISPOSITION_RECEIPT_PREFIX.length);
        if (!(await isPublished(sha, target_base))) {
          return refuse('receipt_not_published');
        }
        deps.parked.invalidate(workspace, bead_id);
        return { ok: true };
      } finally {
        releaseInFlight(bead_id);
      }
    },

    /**
     * Run the delta approval behind [승인하고 진행] (§3.4).
     *
     * No session at all: the server writes the
     * receipt refresh, the notes lineage, the status return and the
     * `blocked_reason` clear in ONE `bd update`, then reads it back.
     *
     * @param {string} bead_id
     * @returns {Promise<{ ok: boolean, reason?: string, sha?: string }>}
     */
    async approve(bead_id) {
      if (in_flight.has(bead_id)) {
        return refuse('action_in_flight');
      }
      // RESERVE before the first await, for the same reason `fix` does.
      in_flight.set(bead_id, {
        kind: 'approve',
        receipt: null,
        target_base: 'main',
        release: null
      });
      try {
        const verified = await deps.parked.verify(
          workspace,
          deps.store.snapshot(workspace),
          bead_id
        );
        if (!verified.ok) {
          return refuse(verified.reason);
        }
        const observation = verified.observation;
        const tip = await baseTip(observation.target_base);
        if (!tip.ok) {
          return refuse(tip.reason);
        }
        const receipt = `${DISPOSITION_RECEIPT_PREFIX}${tip.sha}`;
        try {
          await deps.bd.updateFields(bead_id, {
            set: { spec_review: receipt },
            unset: ['blocked_reason'],
            status: 'open',
            append_notes: dispositionNotes({
              kind: 'approve',
              receipt: observation.receipt,
              sha: tip.sha,
              at: stamp()
            })
          });
        } catch (err) {
          log('revise approve write failed for %s: %o', bead_id, err);
          return refuse('bd_error');
        }
        const back = await readBack(bead_id);
        if (!back.ok) {
          return refuse(back.reason);
        }
        if (back.receipt !== receipt) {
          return refuse('receipt_not_refreshed');
        }
        if (back.status !== 'open' || back.blocked_reason != null) {
          return refuse('still_blocked');
        }
        deps.parked.invalidate(workspace, bead_id);
        // The unblock without the queue restart is only half the disposition,
        // so a failed persist is a failed approve.
        if (!resumeAutoAdvance()) {
          return refuse('auto_advance_resume_failed');
        }
        return { ok: true, sha: tip.sha };
      } finally {
        releaseInFlight(bead_id);
      }
    }
  };
}
