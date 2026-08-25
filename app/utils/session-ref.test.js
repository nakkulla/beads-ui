import { describe, expect, test } from 'vitest';
import {
  sessionRefDrawerInput,
  sessionRefKey,
  sessionRefLabel
} from './session-ref.js';

/**
 * @param {Partial<import('../../server/worker/session-ref.js').SessionRefView>} [patch]
 * @returns {import('../../server/worker/session-ref.js').SessionRefView}
 */
function view(patch = {}) {
  return {
    index: 0,
    provider: 'claude',
    session_id: 'a1b2c3d4-5e6f-7a8b-9c0d-112233445566',
    host: 'isy-macstudioui-MacStudio-2',
    current: true,
    locality: 'local',
    last_event_at: 1_700_000_000_000,
    resume_command: "claude --resume 'a1b2c3d4-5e6f-7a8b-9c0d-112233445566'",
    ...patch
  };
}

describe('session-ref helpers (UI-4xzk §6.1)', () => {
  test('returns the attempt-id slot key of a session', () => {
    expect(
      sessionRefKey(view({ provider: 'codex', session_id: 'sid-9' }))
    ).toBe('session:codex:sid-9');
  });

  test('returns the provider and short id as the label', () => {
    expect(sessionRefLabel(view())).toBe('claude · a1b2c3d4');
  });

  test('returns a drawer input carrying the session_ref verbatim', () => {
    const input = sessionRefDrawerInput(view(), 'UI-4xzk', 'in_progress');

    expect(input).toMatchObject({
      attempt_id: 'session:claude:a1b2c3d4-5e6f-7a8b-9c0d-112233445566',
      session_ref: {
        bead_id: 'UI-4xzk',
        provider: 'claude',
        session_id: 'a1b2c3d4-5e6f-7a8b-9c0d-112233445566'
      },
      hide_prompt: true
    });
    expect(input).not.toHaveProperty('root_dir');
  });

  test('carries a named workspace onto the drawer input', () => {
    const input = sessionRefDrawerInput(
      view(),
      'UI-4xzk',
      'in_progress',
      '/tmp/other-repo'
    );

    expect(input.root_dir).toBe('/tmp/other-repo');
  });

  test('returns the label and the resume command as drawer meta', () => {
    const input = sessionRefDrawerInput(view(), 'UI-4xzk', 'in_progress');

    expect(input.meta).toMatchObject({
      runner: 'claude',
      label: 'claude · a1b2c3d4',
      session_id: 'a1b2c3d4-5e6f-7a8b-9c0d-112233445566',
      resume_command: "claude --resume 'a1b2c3d4-5e6f-7a8b-9c0d-112233445566'"
    });
  });

  test('omits the resume command a shell-unsafe id refused', () => {
    const input = sessionRefDrawerInput(
      view({ resume_command: null }),
      'UI-4xzk',
      'in_progress'
    );

    expect(input.meta).not.toHaveProperty('resume_command');
  });

  test('reports the current local session of an open issue as running', () => {
    const input = sessionRefDrawerInput(view(), 'UI-4xzk', 'in_progress');

    expect(input.meta.status).toBe('running');
  });

  test('reports a past session as done even while the issue is open', () => {
    const input = sessionRefDrawerInput(
      view({ current: false }),
      'UI-4xzk',
      'in_progress'
    );

    expect(input.meta.status).toBe('done');
  });

  test('reports the current session as done once the issue left in_progress', () => {
    const input = sessionRefDrawerInput(view(), 'UI-4xzk', 'closed');

    expect(input.meta.status).toBe('done');
  });

  test('reports a session of another machine as done', () => {
    const input = sessionRefDrawerInput(
      view({ locality: 'remote' }),
      'UI-4xzk',
      'in_progress'
    );

    expect(input.meta.status).toBe('done');
  });
});
