/**
 * Merge-lock REST endpoint (spec §5.2, redesigned per worker-autorun-policy §5).
 *
 * `POST /api/worker/merge-lock` with `{ repo, target_base, action, merge_sha? }`
 * where action ∈ { 'acquire' (default), 'release' }. A headless session's
 * finishing preamble calls `acquire` (and waits) before merging, then `release`
 * after. The adapter separately hard-stops any merge attempt made WITHOUT
 * holding the lock, so this endpoint is the single serialization point per
 * (repo, base).
 *
 * Auth: `Authorization: Bearer <BDUI_WORKER_TOKEN>` — the per-session token
 * from {@link import('./session-tokens.js').createTokenRegistry}, DISTINCT from
 * the config auth token. Missing/invalid token → 401. The token is bound to
 * (repo, target_base, attempt_id): a repo or target_base mismatch → 403.
 *
 * Breaker: a tripped repo refuses acquire with 423 — checked BEFORE queueing
 * AND re-checked after the lock is granted, so a waiter that slept through the
 * trip is refused instead of merging into a failed repo.
 *
 * Server-observed merge_sha (observing mode — `gitRun` injected): the server
 * reads the base tip itself at acquire, and again at release. Release succeeds
 * only when the base ADVANCED from the acquire tip (ancestor-checked) and any
 * session-claimed 40-hex matches the server-read tip; the SERVER-read tip is
 * what reaches the attempt record (`observer.onMergeObserved`) — a session
 * claim is never trusted as merge evidence. A rejected release keeps the lock
 * with the session (revoke frees it). A successful release does NOT free the
 * in-process lock: ownership HANDS OVER to the worker (`takeHandover`), which
 * releases it after post-merge verification — so no second attempt can merge
 * into a base that is still being verified. Without `gitRun` (legacy tests)
 * release frees immediately and nothing is observed.
 *
 * @import { Request, Response, Router } from 'express'
 */
import express from 'express';

/** Strict 40-hex commit sha. */
const SHA40_RE = /^[0-9a-f]{40}$/i;

/**
 * @param {Request} req
 * @returns {string|null}
 */
function bearer(req) {
  const header = req.get('authorization') || '';
  const match = /^Bearer\s+(.+)$/.exec(header);
  return match ? match[1] : null;
}

/**
 * Build the merge-lock router.
 *
 * @param {{
 *   locks: { acquireMerge: (repo: string, target_base: string) => Promise<() => void> },
 *   tokens: { verify: (token: unknown) => { attempt_id: string, repo: string, bead_id: string, target_base?: string|null } | null, onRevoke?: (fn: (token: string) => void) => (() => void) },
 *   breaker: { isTripped: (repo: string) => boolean },
 *   gitRun?: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   observer?: {
 *     onMergeObserved?: (info: { attempt_id: string, repo: string, merge_sha: string }) => void,
 *     onReleaseRejected?: (info: { attempt_id: string, repo: string, reason: string }) => void
 *   }
 * }} deps
 * @returns {Router & { releaseAllForToken: (token: string) => boolean, isHeldBy: (token: string) => boolean, takeHandover: (attempt_id: string) => (() => void) | null }}
 */
export function createMergeLockRouter(deps) {
  const router = express.Router();
  // Ensure body parsing even when mounted standalone in tests.
  router.use(express.json());

  const observing = typeof deps.gitRun === 'function';

  /**
   * Held merge locks keyed by session token: the acquirer releases its own lock.
   *
   * @type {Map<string, { release: () => void, repo: string, target_base: string, base_tip_at_acquire: string|null, attempt_id: string }>}
   */
  const held = new Map();

  /**
   * Locks handed over to the worker after a verified release, keyed by
   * attempt_id. Deliberately OUTSIDE the token-keyed ledger: a token revoke
   * (session exit) must not free a lock the worker still needs for post-merge
   * verification.
   *
   * @type {Map<string, { release: () => void, repo: string, target_base: string }>}
   */
  const handover = new Map();

  /**
   * Read the current base tip (server-side observation). Null on any failure.
   *
   * @param {string} repo
   * @param {string} target_base
   * @returns {Promise<string|null>}
   */
  async function readBaseTip(repo, target_base) {
    if (!deps.gitRun) {
      return null;
    }
    try {
      const r = await deps.gitRun(
        ['rev-parse', '--verify', '--quiet', `${target_base}^{commit}`],
        { cwd: repo }
      );
      const tip = r.code === 0 ? r.stdout.trim() : '';
      return SHA40_RE.test(tip) ? tip : null;
    } catch {
      return null;
    }
  }

  /**
   * Release EVERY merge lock a session token still holds (F4). Invoked when the
   * token is revoked (session terminated / stopped / orphaned) so a dead session
   * can never keep the (repo, target_base) lock forever. Idempotent — a session
   * that already released via the route leaves nothing to free. A lock already
   * handed over to the worker is NOT touched (it left this ledger).
   *
   * @param {string} token
   * @returns {boolean} True when a held lock was released.
   */
  function releaseAllForToken(token) {
    const h = held.get(token);
    if (!h) {
      return false;
    }
    try {
      h.release();
    } catch {
      // Best-effort; the lock chain still advances on the next acquire.
    }
    held.delete(token);
    return true;
  }

  // Wire token revocation → lock release so termination frees the merge lock.
  if (typeof deps.tokens.onRevoke === 'function') {
    deps.tokens.onRevoke((token) => releaseAllForToken(token));
  }

  router.post('/', async (req, res) => {
    const token = bearer(req);
    const session = deps.tokens.verify(token);
    if (!token || !session) {
      res.status(401).json({ ok: false, error: 'unauthorized' });
      return;
    }

    const body = /** @type {any} */ (req.body || {});
    const repo = typeof body.repo === 'string' ? body.repo : '';
    const target_base =
      typeof body.target_base === 'string' ? body.target_base : '';
    const action = body.action === 'release' ? 'release' : 'acquire';
    if (!repo || !target_base) {
      res
        .status(400)
        .json({ ok: false, error: 'repo and target_base are required' });
      return;
    }
    // A session may only touch merge locks for its own (repo, target_base).
    if (session.repo !== repo) {
      res.status(403).json({ ok: false, error: 'repo mismatch' });
      return;
    }
    if (
      typeof session.target_base === 'string' &&
      session.target_base.length > 0 &&
      session.target_base !== target_base
    ) {
      res.status(403).json({ ok: false, error: 'target_base mismatch' });
      return;
    }

    if (action === 'release') {
      const h = held.get(token);
      if (!h) {
        res.json({ ok: true, released: false });
        return;
      }
      if (!observing) {
        h.release();
        held.delete(token);
        res.json({ ok: true, released: true });
        return;
      }

      // Server-side merge observation: the base must have ADVANCED from the
      // acquire tip under this lock, and any session claim must match the tip
      // the SERVER reads — a rejected release keeps the lock with the session.
      const tip = await readBaseTip(h.repo, h.target_base);
      /** @type {string|null} */
      let reject = null;
      if (!tip) {
        reject = 'git_error';
      } else if (!h.base_tip_at_acquire || tip === h.base_tip_at_acquire) {
        reject = 'base_not_advanced';
      } else {
        const anc = await /** @type {NonNullable<typeof deps.gitRun>} */ (
          deps.gitRun
        )(['merge-base', '--is-ancestor', h.base_tip_at_acquire, tip], {
          cwd: h.repo
        });
        if (anc.code === 127) {
          reject = 'git_error';
        } else if (anc.code !== 0) {
          reject = 'base_not_advanced';
        } else {
          const claimed =
            typeof body.merge_sha === 'string' ? body.merge_sha.trim() : '';
          if (
            claimed.length > 0 &&
            (!SHA40_RE.test(claimed) ||
              claimed.toLowerCase() !== tip.toLowerCase())
          ) {
            reject = 'merge_sha_mismatch';
          }
        }
      }
      if (reject) {
        if (deps.observer?.onReleaseRejected) {
          deps.observer.onReleaseRejected({
            attempt_id: h.attempt_id,
            repo: h.repo,
            reason: reject
          });
        }
        res
          .status(409)
          .json({ ok: false, error: 'release_rejected', reason: reject });
        return;
      }

      // Verified: record the SERVER-read tip and hand the lock to the worker
      // for post-merge verification. The session may exit immediately.
      held.delete(token);
      handover.set(h.attempt_id, {
        release: h.release,
        repo: h.repo,
        target_base: h.target_base
      });
      if (deps.observer?.onMergeObserved) {
        deps.observer.onMergeObserved({
          attempt_id: h.attempt_id,
          repo: h.repo,
          merge_sha: /** @type {string} */ (tip)
        });
      }
      res.json({ ok: true, released: true, merge_sha: tip });
      return;
    }

    if (deps.breaker.isTripped(repo)) {
      res.status(423).json({ ok: false, error: 'breaker_tripped' });
      return;
    }

    try {
      const release = await deps.locks.acquireMerge(repo, target_base);
      // RE-check after the grant: a waiter may have slept through a trip and
      // must not merge into a repo that failed while it waited.
      if (deps.breaker.isTripped(repo)) {
        try {
          release();
        } catch {
          // Best-effort.
        }
        res.status(423).json({ ok: false, error: 'breaker_tripped' });
        return;
      }
      /** @type {string|null} */
      let base_tip_at_acquire = null;
      if (observing) {
        base_tip_at_acquire = await readBaseTip(repo, target_base);
        if (!base_tip_at_acquire) {
          // Without an acquire tip the release observation cannot work —
          // fail closed instead of granting an unobservable lock.
          try {
            release();
          } catch {
            // Best-effort.
          }
          res.status(500).json({ ok: false, error: 'base_unreadable' });
          return;
        }
      }
      held.set(token, {
        release,
        repo,
        target_base,
        base_tip_at_acquire,
        attempt_id: session.attempt_id
      });
      res.json({ ok: true, acquired: true });
    } catch (err) {
      if (err && /** @type {any} */ (err).code === 'MERGE_BLOCKED') {
        res.status(423).json({ ok: false, error: 'breaker_tripped' });
        return;
      }
      res.status(500).json({ ok: false, error: 'merge_lock_error' });
    }
  });

  // Expose the token-scoped release + a held-by-token query so the runtime's
  // merge-lock ledger (read by the session-side merge guard, F3) and the
  // scheduler/tests can inspect + free locks directly (release is also invoked
  // via the onRevoke wiring above). `takeHandover` transfers a verified-release
  // lock to the caller (the worker) exactly once.
  /** @type {any} */ (router).releaseAllForToken = releaseAllForToken;
  /** @type {any} */ (router).isHeldBy = (/** @type {string} */ token) =>
    held.has(token);
  /** @type {any} */ (router).takeHandover = (
    /** @type {string} */ attempt_id
  ) => {
    const h = handover.get(attempt_id);
    if (!h) {
      return null;
    }
    handover.delete(attempt_id);
    return h.release;
  };
  return /** @type {Router & { releaseAllForToken: (token: string) => boolean, isHeldBy: (token: string) => boolean, takeHandover: (attempt_id: string) => (() => void) | null }} */ (
    router
  );
}
