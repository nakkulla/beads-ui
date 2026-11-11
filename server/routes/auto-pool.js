/**
 * GET /api/auto-pool — the dotfiles-facing read of the server-global auto pool
 * (UI-y7h1 §3.3).
 *
 * Answers the stored document exactly as kept: no shipped defaults are filled
 * in, and a runtime absent from `runtimes` means "follow the dotfiles
 * defaults" — dotfiles fills it. The response shape and the projection's
 * `implementation.auto_pool_defaults` key are the only things the two
 * repositories share; the state file and the WebSocket channel are internal.
 *
 * Same rules as the other lookup APIs: tailnet binding, no token, no CORS, and
 * no state change.
 *
 * @import { Request, RequestHandler, Response } from 'express'
 */
import { autoPoolStore } from '../auto-pool-store.js';

/** Version of the response shape dotfiles reads. */
export const AUTO_POOL_API_SCHEMA = 1;

/**
 * Create the handler with an injectable store.
 *
 * @param {{ store?: () => { snapshot: () => import('../auto-pool-store.js').AutoPoolState } }} [deps]
 * @returns {RequestHandler}
 */
export function createAutoPoolHandler(deps = {}) {
  const store = deps.store ?? autoPoolStore;

  /**
   * @param {Request} _req
   * @param {Response} res
   */
  function handler(_req, res) {
    res.set('Cache-Control', 'no-store');
    const snapshot = store().snapshot();
    res.status(200).json({
      ok: true,
      schema: AUTO_POOL_API_SCHEMA,
      revision: snapshot.revision,
      runtimes: snapshot.runtimes
    });
  }

  return handler;
}

export const autoPoolHandler = createAutoPoolHandler();
