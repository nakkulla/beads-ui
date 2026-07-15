import { describe, expect, test, vi } from 'vitest';
import { bearerAuthMiddleware, requireAuthToken, verifyToken } from './auth.js';

describe('requireAuthToken', () => {
  test('returns the token when present', () => {
    expect(requireAuthToken({ auth: { token: 'sekret' } })).toBe('sekret');
  });

  test('refuses (throws) when config is missing entirely', () => {
    expect(() => requireAuthToken(undefined)).toThrow();
    expect(() => requireAuthToken(null)).toThrow();
    expect(() => requireAuthToken({})).toThrow();
  });

  test('refuses when the token is absent or blank', () => {
    expect(() => requireAuthToken({ auth: {} })).toThrow();
    expect(() => requireAuthToken({ auth: { token: '' } })).toThrow();
    expect(() => requireAuthToken({ auth: { token: '   ' } })).toThrow();
    expect(() => requireAuthToken({ auth: { token: null } })).toThrow();
  });

  test('throws a Korean startup error message', () => {
    let message = '';
    try {
      requireAuthToken({});
    } catch (err) {
      message = err instanceof Error ? err.message : String(err);
    }
    expect(message).toContain('인증 토큰');
  });
});

describe('verifyToken', () => {
  test('true only for exact match', () => {
    expect(verifyToken('abc123', 'abc123')).toBe(true);
    expect(verifyToken('abc123', 'abc124')).toBe(false);
  });

  test('length-mismatched tokens compare false without throwing', () => {
    expect(verifyToken('short', 'a-much-longer-expected-token')).toBe(false);
    expect(verifyToken('a-much-longer-provided-token', 'short')).toBe(false);
  });

  test('non-string / empty expected are rejected', () => {
    expect(verifyToken(null, 'abc')).toBe(false);
    expect(verifyToken(undefined, 'abc')).toBe(false);
    expect(verifyToken(123, 'abc')).toBe(false);
    expect(verifyToken('abc', '')).toBe(false);
  });
});

describe('bearerAuthMiddleware', () => {
  /**
   * @param {string | undefined} authorization
   */
  function fakeReq(authorization) {
    return {
      /** @param {string} name */
      get(name) {
        return name.toLowerCase() === 'authorization'
          ? authorization
          : undefined;
      }
    };
  }

  function fakeRes() {
    return {
      statusCode: 0,
      body: /** @type {any} */ (null),
      /** @param {number} code */
      status(code) {
        this.statusCode = code;
        return this;
      },
      /** @param {any} payload */
      json(payload) {
        this.body = payload;
        return this;
      }
    };
  }

  test('calls next on a valid Bearer token', () => {
    const mw = bearerAuthMiddleware('secret');
    const next = vi.fn();
    const res = fakeRes();
    mw(
      /** @type {any} */ (fakeReq('Bearer secret')),
      /** @type {any} */ (res),
      next
    );
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.statusCode).toBe(0);
  });

  test('401 when header is missing', () => {
    const mw = bearerAuthMiddleware('secret');
    const next = vi.fn();
    const res = fakeRes();
    mw(/** @type {any} */ (fakeReq(undefined)), /** @type {any} */ (res), next);
    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ ok: false, error: 'unauthorized' });
  });

  test('401 when the token is wrong', () => {
    const mw = bearerAuthMiddleware('secret');
    const next = vi.fn();
    const res = fakeRes();
    mw(
      /** @type {any} */ (fakeReq('Bearer nope')),
      /** @type {any} */ (res),
      next
    );
    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(401);
  });
});
