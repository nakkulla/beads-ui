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

/**
 * One `tool_use` block; `id` pairs it with {@link toolResult}.
 *
 * @param {string} id
 * @param {string} name
 */
function toolUse(id, name = 'Read') {
  return {
    type: 'assistant',
    message: {
      content: [
        {
          type: 'tool_use',
          id,
          name,
          input: { file_path: `/repo/${id}.js` }
        }
      ]
    }
  };
}

/**
 * The `tool_result` that closes a {@link toolUse}.
 *
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

  test('a live attempt shows the heartbeat and how long ago it moved', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-03T00:00:00Z'));
    store.set('att-live', [TEXT_EVENT], Date.now() - 3000);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-live', meta: { status: 'running' } });

    expect(mount.querySelector('.sv__live-dot')).toBeTruthy();
    expect(mount.querySelector('.sv__live-ago')?.textContent).toContain(
      '3초 전'
    );
    drawer.destroy();
    vi.useRealTimers();
  });

  test('a snapshot-only attempt shows no heartbeat', () => {
    store.set('att-done2', [TEXT_EVENT, RESULT_EVENT], 1);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-done2', meta: { status: 'done' } });

    expect(mount.querySelector('.sv__live-dot')).toBeFalsy();
    expect(mount.querySelector('.sv__live-ago')).toBeFalsy();
  });

  test('the elapsed label advances while the session is quiet', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-03T00:00:00Z'));
    store.set('att-quiet', [TEXT_EVENT], Date.now());
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });
    drawer.open({ attempt_id: 'att-quiet', meta: { status: 'running' } });
    expect(mount.querySelector('.sv__live-ago')?.textContent).toContain('0초');

    // No new event lands — only time passes.
    vi.advanceTimersByTime(7000);

    expect(mount.querySelector('.sv__live-ago')?.textContent).toContain(
      '7초 전'
    );
    drawer.destroy();
    vi.useRealTimers();
  });

  test('a running→done meta refresh drops the heartbeat and its timer', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-03T00:00:00Z'));
    store.set('att-fin', [TEXT_EVENT], Date.now());
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });
    drawer.open({ attempt_id: 'att-fin', meta: { status: 'running' } });
    expect(mount.querySelector('.sv__live-dot')).toBeTruthy();

    drawer.updateMeta({ status: 'done' });

    expect(mount.querySelector('.sv__live-dot')).toBeFalsy();
    expect(vi.getTimerCount()).toBe(0);
    drawer.destroy();
    vi.useRealTimers();
  });

  test('close() releases the heartbeat timer', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-03T00:00:00Z'));
    store.set('att-t', [TEXT_EVENT], Date.now());
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });
    drawer.open({ attempt_id: 'att-t', meta: { status: 'running' } });
    expect(vi.getTimerCount()).toBe(1);

    drawer.close();

    expect(vi.getTimerCount()).toBe(0);
    vi.useRealTimers();
  });

  test('pins the unfinished tool line to the drawer foot', () => {
    store.set('att-now', [TEXT_EVENT, toolUse('t9', 'Bash')]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-now', meta: { status: 'running' } });

    const now = mount.querySelector('.sv__now');
    expect(now?.textContent).toContain('Bash');
  });

  test('unpins the tool line once its result arrives', () => {
    store.set('att-now2', [TEXT_EVENT, toolUse('t9', 'Bash')]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });
    drawer.open({ attempt_id: 'att-now2', meta: { status: 'running' } });
    expect(mount.querySelector('.sv__now')).toBeTruthy();

    store.append('att-now2', toolResult('t9'));

    expect(mount.querySelector('.sv__now')).toBeFalsy();
  });

  test('folds a run of 5+ same-tool lines into one group', () => {
    /** @type {unknown[]} */
    const lines = [];
    for (let i = 0; i < 6; i += 1) {
      lines.push(toolUse(`r${i}`, 'Read'), toolResult(`r${i}`));
    }
    store.set('att-fold', lines);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-fold' });

    const group = /** @type {HTMLElement} */ (
      mount.querySelector('.sv__group')
    );
    expect(group?.textContent).toContain('Read');
    expect(group?.textContent).toContain('6');
    expect(mount.querySelectorAll('.sv__tool')).toHaveLength(0);
  });

  test('a folded group expands on click', () => {
    /** @type {unknown[]} */
    const lines = [];
    for (let i = 0; i < 5; i += 1) {
      lines.push(toolUse(`r${i}`, 'Read'), toolResult(`r${i}`));
    }
    store.set('att-fold2', lines);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });
    drawer.open({ attempt_id: 'att-fold2' });

    /** @type {HTMLElement} */ (
      mount.querySelector('.sv__group')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(mount.querySelectorAll('.sv__tool')).toHaveLength(5);
  });

  test('a run of 4 stays unfolded', () => {
    /** @type {unknown[]} */
    const lines = [];
    for (let i = 0; i < 4; i += 1) {
      lines.push(toolUse(`r${i}`, 'Read'), toolResult(`r${i}`));
    }
    store.set('att-fold3', lines);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-fold3' });

    expect(mount.querySelector('.sv__group')).toBeFalsy();
    expect(mount.querySelectorAll('.sv__tool')).toHaveLength(4);
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
