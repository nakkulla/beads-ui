import { describe, expect, test } from 'vitest';
import { createTokenRegistry } from './session-tokens.js';

describe('worker/session-tokens', () => {
  test('issue → verify returns the session info; unknown token is null', () => {
    let n = 0;
    const reg = createTokenRegistry({ generate: () => `tok-${++n}` });
    const token = reg.issue('att-1', { repo: '/repo', bead_id: 'UI-1' });
    expect(token).toBe('tok-1');
    expect(reg.verify(token)).toEqual({
      attempt_id: 'att-1',
      repo: '/repo',
      bead_id: 'UI-1',
      target_base: null
    });
    expect(reg.verify('nope')).toBe(null);
    expect(reg.verify('')).toBe(null);
    expect(reg.verify(undefined)).toBe(null);
  });

  test('revoke invalidates the token', () => {
    const reg = createTokenRegistry();
    const token = reg.issue('att-1', { repo: '/repo', bead_id: 'UI-1' });
    expect(reg.size()).toBe(1);
    reg.revoke('att-1');
    expect(reg.verify(token)).toBe(null);
    expect(reg.size()).toBe(0);
  });
});
