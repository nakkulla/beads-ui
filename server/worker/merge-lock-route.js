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
 *   tokens: { verify: (token: unknown) => { attempt_id: string, repo: string, bead_id: string } | null },
 *   breaker: { isTripped: (repo: string) => boolean }
 * }} deps
 * @returns {Router}
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

  return router;
}
