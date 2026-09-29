import { describe, expect, test } from 'vitest';
import { hasLiveResolveSession, tileResolveFields } from './tile-resolve.js';

/**
 * @param {'inquiry'|'resolve'|'external_resume'} kind
 * @param {Record<string, any>} [over]
 */
function session(kind, over = {}) {
  return { kind, state: 'live', closing: false, ...over };
}

/** @type {Record<string, Record<string, any>>} */
const MATERIALS = {
  recovery_tile: { run_state: 'waiting', wait: { recovery: { kind: 'x' } } },
  recovery_row: { wait_reasons: [{ kind: 'recovery' }] },
  parked: { run_state: 'parked' },
  discard_failed: { discard: { error: 'dirty_worktree' } }
};

describe('tileResolveFields', () => {
  for (const [name, material] of Object.entries(MATERIALS)) {
    test(`exposes the action for ${name} without a live session`, () => {
      const item = { id: 'UI-1', interactive_sessions: [], ...material };

      const fields = tileResolveFields(item, false);

      expect(fields.resolve_action).toBe(true);
    });

    test(`hides the action for ${name} with a live inquiry`, () => {
      const item = {
        id: 'UI-1',
        interactive_sessions: [session('inquiry')],
        ...material
      };

      const fields = tileResolveFields(item, false);

      expect(fields).toEqual({});
    });

    test(`hides the action for ${name} with a live resolve session`, () => {
      const item = {
        id: 'UI-1',
        interactive_sessions: [session('resolve')],
        ...material
      };

      const fields = tileResolveFields(item, false);

      expect(fields).toEqual({});
    });

    test(`keeps the action for ${name} beside an external_resume session`, () => {
      const item = {
        id: 'UI-1',
        interactive_sessions: [session('external_resume')],
        ...material
      };

      const fields = tileResolveFields(item, false);

      expect(fields.resolve_action).toBe(true);
    });
  }

  test('counts a closing session as not live', () => {
    const item = {
      id: 'UI-1',
      run_state: 'parked',
      interactive_sessions: [session('inquiry', { closing: true })]
    };

    const fields = tileResolveFields(item, false);

    expect(fields.resolve_action).toBe(true);
  });

  test('uses the stalled-session title for a recovery tile', () => {
    const item = { id: 'UI-1', ...MATERIALS.recovery_tile };

    const fields = tileResolveFields(item, false);

    expect(fields.resolve_title).toBe(
      '멈춘 세션을 사람이 이어받는 대화형 세션을 띄웁니다 — 기록된 세션이 있으면 fork'
    );
  });

  test('prefers the discard-failure title on a parked tile', () => {
    const item = { id: 'UI-1', run_state: 'parked', discard: { error: 'x' } };

    const fields = tileResolveFields(item, false);

    expect(fields.resolve_title).toContain('실패한 폐기');
  });

  test('locks a recovery tile while its request is pending', () => {
    const item = { id: 'UI-1', ...MATERIALS.recovery_tile };

    const fields = tileResolveFields(item, true);

    expect(fields.resolve_enabled).toBe(false);
  });

  test('omits fields without resolve material', () => {
    const item = { id: 'UI-1', run_state: 'running' };

    const fields = tileResolveFields(item, false);

    expect(fields).toEqual({});
  });
});

describe('hasLiveResolveSession', () => {
  test('ignores an exiting session', () => {
    const views = [session('resolve', { state: 'exiting' })];

    const live = hasLiveResolveSession(views);

    expect(live).toBe(false);
  });
});
