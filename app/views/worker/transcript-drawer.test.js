import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createSessionLogStore } from '../../data/session-log-store.js';
import { createTranscriptDrawer } from './transcript-drawer.js';

/** @type {HTMLElement} */
let mount;
/** @type {ReturnType<typeof createSessionLogStore>} */
let store;
/** @type {Array<{ type: string, payload: any }>} */
let sends;

/**
 * @returns {(type: string, payload?: unknown) => Promise<any>}
 */
function mockTransport() {
  return (type, payload) => {
    sends.push({ type, payload: /** @type {any} */ (payload) });
    return Promise.resolve({ ok: true });
  };
}

const READ_EVENT = {
  type: 'assistant',
  message: {
    content: [
      {
        type: 'tool_use',
        id: 't1',
        name: 'Read',
        input: { file_path: '/repo/server/auth.js' }
      }
    ]
  }
};
const TEXT_EVENT = {
  type: 'assistant',
  message: {
    content: [{ type: 'text', text: 'issueToken 경로를 구현합니다.' }]
  }
};
const RESULT_EVENT = {
  type: 'result',
  subtype: 'success',
  is_error: false,
  result: 'DONE'
};

beforeEach(() => {
  document.body.innerHTML = '<div id="drawer"></div>';
  mount = /** @type {HTMLElement} */ (document.getElementById('drawer'));
  store = createSessionLogStore();
  sends = [];
});

describe('transcript drawer', () => {
  test('open() subscribes and renders the persisted (Done) log', () => {
    // A Done session: its log is already in the store (from the snapshot push).
    store.set('att-1', [TEXT_EVENT, READ_EVENT, RESULT_EVENT]);

    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });
    drawer.open({
      attempt_id: 'att-1',
      meta: { runner: 'claude', model: 'opus' }
    });

    // Subscribed via the ws transport.
    expect(sends.find((s) => s.type === 'subscribe-session-log')).toMatchObject(
      {
        payload: { id: 'session-log:att-1', attempt_id: 'att-1' }
      }
    );
    // Rendered the drawer with an id bar + the three line kinds.
    expect(mount.querySelector('.sv__id')?.textContent).toContain('att-1');
    expect(mount.querySelector('.sv__as')?.textContent).toContain('issueToken');
    const tool = mount.querySelector('.sv__tool');
    expect(tool?.textContent).toContain('Read');
    expect(tool?.textContent).toContain('/repo/server/auth.js');
    expect(mount.querySelector('.sv__result--ok')).toBeTruthy();
    expect(drawer.isOpen()).toBe(true);
  });

  test('live append re-renders with the new line', () => {
    store.set('att-2', [TEXT_EVENT]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });
    drawer.open({ attempt_id: 'att-2' });
    expect(mount.querySelectorAll('.sv__tool')).toHaveLength(0);

    // A server append push lands in the store → drawer follows live.
    store.append('att-2', READ_EVENT);
    expect(mount.querySelectorAll('.sv__tool')).toHaveLength(1);
    store.append('att-2', RESULT_EVENT);
    expect(mount.querySelector('.sv__result--ok')).toBeTruthy();
  });

  test('tool line click expands input/output', () => {
    store.set('att-3', [READ_EVENT]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });
    drawer.open({ attempt_id: 'att-3' });
    const tool = /** @type {HTMLElement} */ (mount.querySelector('.sv__tool'));
    expect(mount.querySelector('.sv__tool-expand')).toBeFalsy();
    tool.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(mount.querySelector('.sv__tool--expanded')).toBeTruthy();
    expect(mount.querySelector('.sv__tool-expand')?.textContent).toContain(
      'auth.js'
    );
  });

  test('follow pill toggles OFF on click', () => {
    store.set('att-4', [TEXT_EVENT]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });
    drawer.open({ attempt_id: 'att-4' });
    const pill = /** @type {HTMLElement} */ (
      mount.querySelector('.sv__follow')
    );
    expect(pill.classList.contains('sv__follow--on')).toBe(true);
    pill.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(
      mount.querySelector('.sv__follow')?.classList.contains('sv__follow--on')
    ).toBe(false);
  });

  test('shows the session id short (first 8) and copies the full value on click (§2)', async () => {
    store.set('att-9', [TEXT_EVENT]);
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true
    });
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });
    drawer.open({
      attempt_id: 'att-9',
      meta: { session_id: 'sid-abcdef123456' }
    });

    const sid = /** @type {HTMLElement} */ (
      mount.querySelector('.sv__session')
    );
    expect(sid).not.toBeNull();
    // Short display = first 8 chars; the full value rides the title attribute.
    expect(sid.textContent).toContain('sid-abcd');
    expect(sid.getAttribute('title')).toBe('sid-abcdef123456');

    sid.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    expect(writeText).toHaveBeenCalledWith('sid-abcdef123456');
  });

  test('updateMeta refreshes an already-open bar with a late-arriving session id (§2)', () => {
    store.set('att-10', [TEXT_EVENT]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });
    // Opened before the session id arrives (stream first event lands later).
    drawer.open({ attempt_id: 'att-10', meta: { runner: 'claude' } });
    expect(mount.querySelector('.sv__session')).toBeNull();

    drawer.updateMeta({ runner: 'claude', session_id: 'sid-late01xy' });
    const sid = /** @type {HTMLElement} */ (
      mount.querySelector('.sv__session')
    );
    expect(sid).not.toBeNull();
    expect(sid.getAttribute('title')).toBe('sid-late01xy');
  });

  test('close() unsubscribes and clears the mount', () => {
    store.set('att-5', [TEXT_EVENT]);
    let closed = false;
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store,
      onClose: () => {
        closed = true;
      }
    });
    drawer.open({ attempt_id: 'att-5' });
    drawer.close();
    expect(
      sends.find((s) => s.type === 'unsubscribe-session-log')
    ).toMatchObject({ payload: { id: 'session-log:att-5' } });
    expect(mount.querySelector('.sv')).toBeFalsy();
    expect(drawer.isOpen()).toBe(false);
    expect(closed).toBe(true);
  });
});
