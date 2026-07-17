/**
 * Per-session Worker token registry (spec §5.2 merge-lock gate).
 *
 * Each headless session is issued a fresh random token that the Worker injects
 * into the session's environment (`BDUI_WORKER_TOKEN`). The session's finishing
 * preamble calls the merge-lock REST endpoint with that token as its bearer.
 *
 * This is the only credential in the system (WS/REST carry no token auth —
 * spec §8): a session token is a short-lived, per-attempt capability scoped to
 * one repo's merge lock and revoked when the attempt ends. A leaked session
 * token can only touch its own merge lock, never the workspace-mutation
 * surface.
 */
import { randomBytes } from 'node:crypto';

/**
 * @typedef {Object} SessionTokenInfo
 * @property {string} attempt_id
 * @property {string} repo
 * @property {string} bead_id
 */

/**
 * Create a session-token registry.
 *
 * @param {{ generate?: () => string }} [options]
 * @returns {{
 *   issue: (attempt_id: string, meta: { repo: string, bead_id: string }) => string,
 *   verify: (token: unknown) => SessionTokenInfo | null,
 *   revoke: (attempt_id: string) => void,
 *   onRevoke: (fn: (token: string, info: SessionTokenInfo) => void) => (() => void),
 *   size: () => number
 * }}
 */
export function createTokenRegistry(options = {}) {
  const generate = options.generate || (() => randomBytes(24).toString('hex'));
  /** @type {Map<string, SessionTokenInfo>} */
  const by_token = new Map();
  /** @type {Map<string, string>} */
  const by_attempt = new Map();
  /**
   * Revocation listeners — a merge-lock router subscribes here so a revoked
   * session token can never keep holding a (repo, target_base) merge lock (F4).
   *
   * @type {Set<(token: string, info: SessionTokenInfo) => void>}
   */
  const revoke_listeners = new Set();

  return {
    /**
     * @param {string} attempt_id
     * @param {{ repo: string, bead_id: string }} meta
     * @returns {string}
     */
    issue(attempt_id, meta) {
      const token = generate();
      by_token.set(token, {
        attempt_id,
        repo: meta.repo,
        bead_id: meta.bead_id
      });
      by_attempt.set(attempt_id, token);
      return token;
    },

    /**
     * @param {unknown} token
     * @returns {SessionTokenInfo | null}
     */
    verify(token) {
      if (typeof token !== 'string' || token.length === 0) {
        return null;
      }
      return by_token.get(token) || null;
    },

    /**
     * @param {string} attempt_id
     */
    revoke(attempt_id) {
      const token = by_attempt.get(attempt_id);
      if (token) {
        const info = by_token.get(token);
        by_token.delete(token);
        by_attempt.delete(attempt_id);
        // Notify listeners so any merge lock this token still holds is released
        // (a dead session must never own the lock forever) (spec §5.2, F4).
        if (info) {
          for (const fn of revoke_listeners) {
            try {
              fn(token, info);
            } catch {
              // A listener failure must never block token revocation.
            }
          }
        }
      }
    },

    /**
     * Subscribe to token revocation. The callback receives the revoked token so
     * a merge-lock holder can release it. Returns an unsubscribe function.
     *
     * @param {(token: string, info: SessionTokenInfo) => void} fn
     * @returns {() => void}
     */
    onRevoke(fn) {
      revoke_listeners.add(fn);
      return () => revoke_listeners.delete(fn);
    },

    /**
     * @returns {number}
     */
    size() {
      return by_token.size;
    }
  };
}
