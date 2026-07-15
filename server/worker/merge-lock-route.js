/**
 * Merge-lock REST endpoint (spec §5.2).
 *
 * `POST /api/worker/merge-lock` with `{ repo, target_base, action }` where
 * action ∈ { 'acquire' (default), 'release' }. A headless session's finishing
 * preamble calls `acquire` (and waits) before merging, then `release` after.
 * The adapter separately hard-stops any merge attempt made WITHOUT holding the
 * lock, so this endpoint is the single serialization point per (repo, base).
 *
 * Auth: `Authorization: Bearer <BDUI_WORKER_TOKEN>` — the per-session token from
 * {@link import('./session-tokens.js').createTokenRegistry}, DISTINCT from the
 * config auth token. Missing/invalid token → 401.
 *
 * Breaker: if the repo's circuit breaker is tripped, acquire is refused with
 * 423 (Locked) so a failed repo can never be merged into by an in-flight
 * session.
 *
 * @import { Request, Response, Router } from 'express'
 */
import express from 'express';

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
 *   tokens: { verify: (token: unknown) => { attempt_id: string, repo: string, bead_id: string } | null, onRevoke?: (fn: (token: string) => void) => (() => void) },
 *   breaker: { isTripped: (repo: string) => boolean }
 * }} deps
 * @returns {Router & { releaseAllForToken: (token: string) => boolean, isHeldBy: (token: string) => boolean }}
 */
export function createMergeLockRouter(deps) {
  const router = express.Router();
  // Ensure body parsing even when mounted standalone in tests.
  router.use(express.json());

  /**
   * Held merge locks keyed by session token: the acquirer releases its own lock.
   *
   * @type {Map<string, { release: () => void, repo: string, target_base: string }>}
   */
  const held = new Map();

  /**
   * Release EVERY merge lock a session token still holds (F4). Invoked when the
   * token is revoked (session terminated / stopped / orphaned) so a dead session
   * can never keep the (repo, target_base) lock forever. Idempotent — a session
   * that already released via the route leaves nothing to free.
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
    // A session may only touch merge locks for its own repo.
    if (session.repo !== repo) {
      res.status(403).json({ ok: false, error: 'repo mismatch' });
      return;
    }

    if (action === 'release') {
      const h = held.get(token);
      if (h) {
        h.release();
        held.delete(token);
      }
      res.json({ ok: true, released: !!h });
      return;
    }

    if (deps.breaker.isTripped(repo)) {
      res.status(423).json({ ok: false, error: 'breaker_tripped' });
      return;
    }

    try {
      const release = await deps.locks.acquireMerge(repo, target_base);
      held.set(token, { release, repo, target_base });
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
  // via the onRevoke wiring above).
  /** @type {any} */ (router).releaseAllForToken = releaseAllForToken;
  /** @type {any} */ (router).isHeldBy = (/** @type {string} */ token) =>
    held.has(token);
  return /** @type {Router & { releaseAllForToken: (token: string) => boolean, isHeldBy: (token: string) => boolean }} */ (
    router
  );
}
