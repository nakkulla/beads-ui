import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createSessionLogStore } from '../../model/session-log-store.js';
import { fakeMatchMedia } from '../pipeline/test-harness.js';
import { createTranscriptScreen } from './index.js';

/**
 * The transcript host (UI-dbn6 §3.1·§3.6·§4.2): the drawer (UI-2dbn grammar,
 * `transcript-drawer.test.js`) drawn over the shell, a full-screen sheet on a
 * narrow viewport, subscribed to the session log only while it is shown and
 * closed by ✕ or the browser back.
 */

/** @type {ReturnType<typeof createSessionLogStore>} */
let store;
/** @type {import('vitest').Mock} */
let send;
/** @type {ReturnType<typeof createTranscriptScreen>|null} */
let screen = null;

/**
 * @param {string} id
 */
function toolUse(id) {
  return {
    type: 'assistant',
    message: {
      content: [
        {
          type: 'tool_use',
          id,
          name: 'Read',
          input: { file_path: `/repo/${id}.js` }
        }
      ]
    }
  };
}

/**
 * @param {string} id
 */
function toolResult(id) {
  return {
    type: 'user',
    message: {
      content: [{ type: 'tool_result', tool_use_id: id, content: 'ok' }]
    }
  };
}

const TEXT_EVENT = {
  type: 'assistant',
  message: { content: [{ type: 'text', text: '다음 단계로 갑니다.' }] }
};

/**
 * @param {{ width?: number }} [options]
 */
function mountScreen(options = {}) {
  screen = createTranscriptScreen({
    send,
    sessionLogStore: store,
    matchMedia: fakeMatchMedia({ width: options.width ?? 1280 })
  });
  return screen;
}

/**
 * @param {string} type
 * @returns {any[]}
 */
function sent(type) {
  return send.mock.calls
    .filter((call) => call[0] === type)
    .map((call) => call[1]);
}

beforeEach(() => {
  document.body.innerHTML = '';
  window.history.replaceState(null, '', '#/pipeline');
  store = createSessionLogStore();
  send = vi.fn(async () => ({ ok: true }));
});

afterEach(() => {
  screen?.destroy();
  screen = null;
});

describe('transcript screen', () => {
  test('subscribes to the session log only once it is shown', () => {
    const transcript = mountScreen();
    const before = sent('subscribe-session-log').length;

    transcript.open({ attempt_id: 'att-1', meta: { status: 'done' } });

    expect(before).toBe(0);
    expect(sent('subscribe-session-log')).toEqual([
      { id: 'session-log:att-1', attempt_id: 'att-1' }
    ]);
  });

  test('unsubscribes and hides when ✕ closes it', () => {
    const transcript = mountScreen();
    transcript.open({ attempt_id: 'att-1', meta: { status: 'done' } });
    const back = vi.spyOn(window.history, 'back').mockImplementation(() => {});

    /** @type {HTMLButtonElement} */ (
      document.querySelector('.tr-overlay .sv__close')
    ).click();

    expect(sent('unsubscribe-session-log')).toEqual([
      { id: 'session-log:att-1' }
    ]);
    expect(
      /** @type {HTMLElement} */ (document.querySelector('.tr-overlay')).hidden
    ).toBe(true);
    expect(transcript.isOpen()).toBe(false);
    back.mockRestore();
  });

  test('pops its own history entry when ✕ closes it', () => {
    const transcript = mountScreen();
    transcript.open({ attempt_id: 'att-1', meta: { status: 'done' } });
    const back = vi.spyOn(window.history, 'back').mockImplementation(() => {});

    /** @type {HTMLButtonElement} */ (
      document.querySelector('.tr-overlay .sv__close')
    ).click();

    expect(back).toHaveBeenCalledTimes(1);
    back.mockRestore();
  });

  test('closes and unsubscribes on the browser back', async () => {
    const transcript = mountScreen();
    transcript.open({ attempt_id: 'att-2', meta: { status: 'done' } });
    const popped = new Promise((resolve) =>
      window.addEventListener('popstate', resolve, { once: true })
    );

    window.history.back();
    await popped;

    expect(transcript.isOpen()).toBe(false);
    expect(sent('unsubscribe-session-log')).toEqual([
      { id: 'session-log:att-2' }
    ]);
  });

  test('opens as a full-screen sheet on a narrow viewport', () => {
    const transcript = mountScreen({ width: 390 });

    transcript.open({ attempt_id: 'att-1', meta: { status: 'done' } });

    expect(
      document
        .querySelector('.tr-overlay')
        ?.classList.contains('tr-overlay--sheet')
    ).toBe(true);
  });

  test('opens a live session log by provider and session id', () => {
    const transcript = mountScreen();

    transcript.openSessionLog('claude', 'sid-1', 'UI-1', '/repo/a');

    expect(sent('subscribe-session-log')[0]).toMatchObject({
      session_ref: { bead_id: 'UI-1', provider: 'claude', session_id: 'sid-1' },
      root_dir: '/repo/a'
    });
  });

  test('turns live-follow off from the bar', () => {
    const transcript = mountScreen();
    transcript.open({ attempt_id: 'att-1', meta: { status: 'done' } });

    /** @type {HTMLButtonElement} */ (
      document.querySelector('.tr-overlay .sv__follow')
    ).click();

    expect(
      document
        .querySelector('.tr-overlay .sv__follow')
        ?.getAttribute('aria-pressed')
    ).toBe('false');
  });

  test('reopens a collapsed past work bundle on click', () => {
    store.set('session-log:att-3', [
      toolUse('t1'),
      toolResult('t1'),
      toolUse('t2'),
      toolResult('t2'),
      toolUse('t3'),
      toolResult('t3'),
      toolUse('t4'),
      toolResult('t4'),
      TEXT_EVENT
    ]);
    const transcript = mountScreen();
    transcript.open({ attempt_id: 'att-3', meta: { status: 'done' } });
    const summary = () =>
      /** @type {HTMLButtonElement} */ (
        document.querySelector('.tr-overlay .sv__work-sum')
      );
    const collapsed = summary().getAttribute('aria-expanded');

    summary().click();

    expect(collapsed).toBe('false');
    expect(summary().getAttribute('aria-expanded')).toBe('true');
  });
});
