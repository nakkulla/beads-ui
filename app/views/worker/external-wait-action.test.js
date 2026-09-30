import { describe, expect, test } from 'vitest';
import {
  resolveLaunchText,
  sessionWindowText
} from './external-wait-action.js';

describe('session window toast text (UI-a119 §3.3)', () => {
  test('says a user-placed window is the active window', () => {
    const res = {
      session: 'launched',
      placement: 'user',
      tmux_session: 'dev',
      tmux_window: '7'
    };

    const text = sessionWindowText(res);

    expect(text).toBe('dev:7에 열었습니다 · 활성 창');
  });

  test('says the inquiry fallback found no user tmux session', () => {
    const res = {
      session: 'launched',
      placement: 'inquiry',
      tmux_session: 'bdui-inquiry',
      tmux_window: '3'
    };

    const text = sessionWindowText(res);

    expect(text).toBe(
      'bdui-inquiry:3에 열었습니다 · 사용자 tmux 세션을 찾지 못함'
    );
  });

  test('names the place of an already open window', () => {
    const res = {
      session: 'already_running',
      tmux_session: 'dev',
      tmux_window: '7'
    };

    const text = sessionWindowText(res);

    expect(text).toBe('이미 열려 있습니다 · dev:7');
  });

  test('answers null for a reply that opened no window', () => {
    const res = { session: 'not_launched', reason: 'tmux_unavailable' };

    const text = sessionWindowText(res);

    expect(text).toBeNull();
  });

  test('gives a same-session conversation launch its window sentence', () => {
    const res = {
      session: 'launched',
      launched: true,
      mode: 'resume',
      placement: 'user',
      tmux_session: 'dev',
      tmux_window: 'UI-1'
    };

    const text = resolveLaunchText(res);

    expect(text).toBe('dev:UI-1에 열었습니다 · 활성 창');
  });

  test('appends the fresh-session caveat after the window place', () => {
    const res = {
      session: 'launched',
      launched: true,
      mode: 'fresh',
      runner: 'claude',
      fallback_reason: 'no_session_ref',
      placement: 'user',
      tmux_session: 'dev',
      tmux_window: 'resolve-UI-1'
    };

    const text = resolveLaunchText(res);

    expect(text).toBe(
      'dev:resolve-UI-1에 열었습니다 · 활성 창 · claude 새 세션으로 시작 (no_session_ref)'
    );
  });
});
