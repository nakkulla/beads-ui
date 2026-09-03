import { describe, expect, test } from 'vitest';
import { tileResolveFields } from './tile-resolve.js';

describe('tileResolveFields', () => {
  test('exposes the session action for a parked tile', () => {
    const fields = tileResolveFields(
      'UI-gjp2',
      { discard: null, parked: true },
      false
    );

    expect(fields).toEqual({
      resolve_action: true,
      resolve_enabled: true,
      resolve_title:
        '파킹을 사람이 이어받는 대화형 세션을 띄웁니다 — 살아 있는 문의 세션이 있으면 그 창을 가리킵니다'
    });
  });

  test('prefers the discard-failure title on a parked tile', () => {
    const fields = tileResolveFields(
      'UI-gjp2',
      { discard: { error: 'dirty_worktree' }, parked: true },
      false
    );

    expect(fields.resolve_title).toContain('실패한 폐기');
  });

  test('disables the action while its request is pending', () => {
    const fields = tileResolveFields(
      'UI-gjp2',
      { discard: null, parked: true },
      true
    );

    expect(fields.resolve_enabled).toBe(false);
  });

  test('omits fields without resolve material', () => {
    const fields = tileResolveFields(
      'UI-gjp2',
      { discard: null, parked: false },
      false
    );

    expect(fields).toEqual({});
  });
});
