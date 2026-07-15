/**
 * @import { NextFunction, Request, Response } from 'express'
 */
import crypto from 'node:crypto';

/**
 * Read the shared auth token from runtime config, refusing startup when it is
 * absent or empty. The server MUST NOT run without a token because the WS and
 * REST surfaces expose workspace mutations reachable over the network.
 *
 * @param {{ auth?: { token?: string | null } } | null | undefined} config
 * @returns {string}
 */
export function requireAuthToken(config) {
  const token = config?.auth?.token;
  if (typeof token !== 'string' || token.trim().length === 0) {
    throw new Error(
      '인증 토큰이 설정되지 않았습니다. bdui config.toml 의 [auth] token 을 설정한 뒤 다시 실행하세요.'
    );
  }
  return token;
}

/**
 * Constant-time comparison of a provided token against the expected token.
 *
 * Both values are hashed with SHA-256 first so the comparison operates on
 * fixed-length digests: this avoids leaking the expected token's length via an
 * early length check while keeping `crypto.timingSafeEqual`'s equal-length
 * requirement satisfied.
 *
 * @param {unknown} provided
 * @param {unknown} expected
 * @returns {boolean}
 */
export function verifyToken(provided, expected) {
  if (
    typeof provided !== 'string' ||
    typeof expected !== 'string' ||
    expected.length === 0
  ) {
    return false;
  }
  const a = crypto.createHash('sha256').update(provided).digest();
  const b = crypto.createHash('sha256').update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

/**
 * Express middleware factory that requires `Authorization: Bearer <token>` to
 * match `expected_token`. Responds 401 JSON on any mismatch or missing header.
 *
 * @param {string} expected_token
 * @returns {(req: Request, res: Response, next: NextFunction) => void}
 */
export function bearerAuthMiddleware(expected_token) {
  return (req, res, next) => {
    const header = req.get('authorization') || '';
    const match = /^Bearer\s+(.+)$/.exec(header);
    if (!match || !verifyToken(match[1], expected_token)) {
      res.status(401).json({ ok: false, error: 'unauthorized' });
      return;
    }
    next();
  };
}
