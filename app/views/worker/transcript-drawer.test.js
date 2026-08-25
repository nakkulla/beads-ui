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
    store.set('session-log:att-1', [TEXT_EVENT, READ_EVENT, RESULT_EVENT]);

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
    store.set('session-log:att-2', [TEXT_EVENT]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });
    drawer.open({ attempt_id: 'att-2' });
    expect(mount.querySelectorAll('.sv__tool')).toHaveLength(0);

    // A server append push lands in the store → drawer follows live.
    store.append('session-log:att-2', READ_EVENT);
    expect(mount.querySelectorAll('.sv__tool')).toHaveLength(1);
    store.append('session-log:att-2', RESULT_EVENT);
    expect(mount.querySelector('.sv__result--ok')).toBeTruthy();
  });

  test('tool line click expands input/output', () => {
    store.set('session-log:att-3', [READ_EVENT]);
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
    store.set('session-log:att-4', [TEXT_EVENT]);
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
    store.set('session-log:att-9', [TEXT_EVENT]);
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
    store.set('session-log:att-10', [TEXT_EVENT]);
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
    store.set('session-log:att-live', [TEXT_EVENT], Date.now() - 3000);
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
    store.set('session-log:att-done2', [TEXT_EVENT, RESULT_EVENT], 1);
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
    store.set('session-log:att-quiet', [TEXT_EVENT], Date.now());
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
    store.set('session-log:att-fin', [TEXT_EVENT], Date.now());
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
    store.set('session-log:att-t', [TEXT_EVENT], Date.now());
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
    store.set('session-log:att-now', [TEXT_EVENT, toolUse('t9', 'Bash')]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-now', meta: { status: 'running' } });

    const now = mount.querySelector('.sv__now');
    expect(now?.textContent).toContain('Bash');
  });

  test('unpins the tool line once its result arrives', () => {
    store.set('session-log:att-now2', [TEXT_EVENT, toolUse('t9', 'Bash')]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });
    drawer.open({ attempt_id: 'att-now2', meta: { status: 'running' } });
    expect(mount.querySelector('.sv__now')).toBeTruthy();

    store.append('session-log:att-now2', toolResult('t9'));

    expect(mount.querySelector('.sv__now')).toBeFalsy();
  });

  test('pins nothing once the attempt stops being live', () => {
    store.set('session-log:att-stop', [TEXT_EVENT, toolUse('t9', 'Bash')]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });
    drawer.open({ attempt_id: 'att-stop', meta: { status: 'running' } });
    expect(mount.querySelector('.sv__now')).toBeTruthy();

    // The attempt finished (or was paused) while its last tool never reported.
    drawer.updateMeta({ status: 'done' });

    expect(mount.querySelector('.sv__now')).toBeFalsy();
    drawer.destroy();
  });

  test('treats an empty tool output as finished, not pending', () => {
    store.set('session-log:att-empty', [
      toolUse('t1', 'Bash'),
      {
        type: 'user',
        message: {
          content: [{ type: 'tool_result', tool_use_id: 't1', content: '' }]
        }
      }
    ]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-empty', meta: { status: 'running' } });

    expect(mount.querySelector('.sv__now')).toBeFalsy();
    drawer.destroy();
  });

  test('finds the still-open tool when a later one finished first', () => {
    store.set('session-log:att-par', [
      toolUse('slow', 'Bash'),
      toolUse('fast', 'Grep'),
      toolResult('fast')
    ]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-par', meta: { status: 'running' } });

    expect(mount.querySelector('.sv__now')?.textContent).toContain('Bash');
    drawer.destroy();
  });

  test('folds a run of 5+ same-tool lines into one group', () => {
    /** @type {unknown[]} */
    const lines = [];
    for (let i = 0; i < 6; i += 1) {
      lines.push(toolUse(`r${i}`, 'Read'), toolResult(`r${i}`));
    }
    store.set('session-log:att-fold', lines);
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
    store.set('session-log:att-fold2', lines);
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
    store.set('session-log:att-fold3', lines);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-fold3' });

    expect(mount.querySelector('.sv__group')).toBeFalsy();
    expect(mount.querySelectorAll('.sv__tool')).toHaveLength(4);
  });

  test('close() unsubscribes and clears the mount', () => {
    store.set('session-log:att-5', [TEXT_EVENT]);
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

  test('unsubscribes the prior subscription when a row switch replaces it', () => {
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-1' });
    drawer.open({ attempt_id: 'att-1', launch_id: 'launch-1' });

    expect(sends).toEqual([
      {
        type: 'subscribe-session-log',
        payload: { id: 'session-log:att-1', attempt_id: 'att-1' }
      },
      {
        type: 'unsubscribe-session-log',
        payload: { id: 'session-log:att-1' }
      },
      {
        type: 'subscribe-session-log',
        payload: {
          id: 'session-log:att-1:launch-1',
          attempt_id: 'att-1',
          launch_id: 'launch-1'
        }
      }
    ]);
  });

  test('uses one delegation subscription id for subscribe close and reopen', () => {
    const subscription_id = 'session-log:att-1:launch-1';
    store.set(subscription_id, [TEXT_EVENT]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-1', launch_id: 'launch-1' });
    drawer.close();
    drawer.open({ attempt_id: 'att-1', launch_id: 'launch-1' });

    expect(sends).toEqual([
      {
        type: 'subscribe-session-log',
        payload: {
          id: subscription_id,
          attempt_id: 'att-1',
          launch_id: 'launch-1'
        }
      },
      { type: 'unsubscribe-session-log', payload: { id: subscription_id } },
      {
        type: 'subscribe-session-log',
        payload: {
          id: subscription_id,
          attempt_id: 'att-1',
          launch_id: 'launch-1'
        }
      }
    ]);
    expect(mount.querySelector('.sv__as')?.textContent).toContain('issueToken');
  });

  test('shows delegation identity instead of the outer attempt id', () => {
    store.set('session-log:att-1:launch-1', [TEXT_EVENT]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({
      attempt_id: 'att-1',
      launch_id: 'launch-1',
      meta: {
        role: 'implementation',
        model: 'gpt-5.6-sol',
        effort: 'high',
        session_id: 'session-1234567890'
      }
    });

    expect(mount.querySelector('.sv__id')?.textContent).toBe('implementation');
    expect(mount.querySelector('.sv__bar')?.textContent).not.toContain('att-1');
    expect(mount.querySelector('.sv__session')?.textContent).toContain(
      'session-'
    );
    expect(mount.querySelector('.sv__session')?.getAttribute('title')).toBe(
      'session-1234567890'
    );
    expect(mount.querySelector('.sv__meta')?.textContent).toBe(
      'gpt-5.6-sol · high'
    );
    expect(
      mount.querySelector('[data-seam="attempt-prompt-toggle"]')
    ).toBeNull();
  });

  test('hides the attempt prompt toggle when opened with hide_prompt', () => {
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'analysis-1', hide_prompt: true });

    expect(
      mount.querySelector('[data-seam="attempt-prompt-toggle"]')
    ).toBeNull();
    expect(mount.querySelector('.sv__id')?.textContent).toContain('analysis-1');
  });

  test('renders the attempt prompt toggle for an ordinary attempt', () => {
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-1' });

    expect(
      mount.querySelector('[data-seam="attempt-prompt-toggle"]')
    ).not.toBeNull();
  });

  test('renders delegation messages reasoning activity and terminal events', () => {
    const base = {
      schema: 'codex-delegation-monitor-v1',
      attempt_id: 'att-1',
      launch_id: 'launch-1',
      provider: 'codex',
      role: 'implementation',
      model: 'gpt-5.6-sol',
      thread_id: 'thread-1',
      turn_id: 'turn-1',
      recorded_at: 1
    };
    store.set('session-log:att-1:launch-1', [
      {
        ...base,
        event: {
          type: 'item.completed',
          item: { id: 'i1', kind: 'agent_message', text: '위임 응답' }
        }
      },
      {
        ...base,
        event: {
          type: 'item.completed',
          item: { id: 'i2', kind: 'reasoning', text: '위임 판단' }
        }
      },
      {
        ...base,
        event: {
          type: 'item.started',
          item: { id: 'i3', kind: 'activity', activity: 'file_change' }
        }
      },
      { ...base, event: { type: 'turn.completed', status: 'completed' } }
    ]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-1', launch_id: 'launch-1' });

    expect(mount.querySelector('.sv__as')?.textContent).toContain('위임 응답');
    expect(mount.querySelector('.sv__think')?.textContent).toContain(
      '위임 판단'
    );
    expect(mount.querySelector('.sv__tool')?.textContent).toContain(
      '파일 변경 · 시작'
    );
    expect(mount.querySelector('.sv__result--ok')?.textContent).toContain(
      'DONE'
    );
  });
});

/**
 * One `tool_use` block with an arbitrary input payload.
 *
 * @param {string} id
 * @param {string} name
 * @param {Record<string, unknown>} input
 */
function toolWith(id, name, input) {
  return {
    type: 'assistant',
    message: {
      content: [{ type: 'tool_use', id, name, input }]
    }
  };
}

/**
 * The `tool_result` that closes a {@link toolWith} with a chosen body.
 *
 * @param {string} id
 * @param {string} content
 */
function resultWith(id, content) {
  return {
    type: 'user',
    message: {
      content: [{ type: 'tool_result', tool_use_id: id, content }]
    }
  };
}

/**
 * A claude `thinking` content block.
 *
 * @param {string} text
 */
function thinking(text) {
  return {
    type: 'assistant',
    message: { content: [{ type: 'thinking', thinking: text }] }
  };
}

describe('transcript drawer — 마크다운·thinking·멀티라인 (UI-dixx 변경 1·2)', () => {
  test('renders an assistant line as markdown DOM', () => {
    store.set('session-log:att-md', [
      {
        type: 'assistant',
        message: {
          content: [{ type: 'text', text: '## 결론\n\n**머지 가능** 상태.' }]
        }
      }
    ]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-md' });

    expect(mount.querySelector('.sv__as h2')?.textContent).toContain('결론');
    expect(mount.querySelector('.sv__as strong')?.textContent).toContain(
      '머지 가능'
    );
  });

  test('renders the result body as markdown and keeps its verdict glyph', () => {
    store.set('session-log:att-md2', [
      {
        type: 'result',
        subtype: 'success',
        is_error: false,
        result: '**완료** — 검증 통과'
      }
    ]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-md2' });

    const res = mount.querySelector('.sv__result--ok');
    expect(res?.textContent).toContain('✓');
    expect(res?.querySelector('strong')?.textContent).toContain('완료');
  });

  test('keeps the failure glyph and colour on an errored result', () => {
    store.set('session-log:att-md3', [
      {
        type: 'result',
        subtype: 'error_during_execution',
        is_error: true,
        result: '**실패** — tsc'
      }
    ]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-md3' });

    const res = mount.querySelector('.sv__result--fail');
    expect(res?.textContent).toContain('✗');
    expect(res?.querySelector('strong')?.textContent).toContain('실패');
  });

  test('shows a thinking line as its first line and expands on click', () => {
    store.set('session-log:att-th', [thinking('첫 줄 판단\n둘째 줄 세부')]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });
    drawer.open({ attempt_id: 'att-th' });

    const think = /** @type {HTMLElement} */ (
      mount.querySelector('.sv__think')
    );
    expect(think.textContent).toContain('💭');
    expect(think.textContent).toContain('첫 줄 판단');
    expect(think.textContent).not.toContain('둘째 줄 세부');

    think.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(mount.querySelector('.sv__think-expand')?.textContent).toContain(
      '둘째 줄 세부'
    );
  });

  test('keeps a thinking line out of the tool fold groups', () => {
    /** @type {unknown[]} */
    const lines = [];
    for (let i = 0; i < 6; i += 1) {
      lines.push(toolUse(`r${i}`, 'Read'), toolResult(`r${i}`));
    }
    lines.push(thinking('중간 판단'));
    store.set('session-log:att-th2', lines);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-th2' });

    expect(mount.querySelector('.sv__group')).toBeTruthy();
    expect(mount.querySelector('.sv__think')?.textContent).toContain(
      '중간 판단'
    );
  });

  test('shows a multi-line Bash command as its first line plus a line-count badge', () => {
    store.set('session-log:att-bash', [
      toolWith('b1', 'Bash', {
        command: 'cat <<EOF > /tmp/x\nline two\nline three\nEOF'
      })
    ]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });
    drawer.open({ attempt_id: 'att-bash' });

    expect(mount.querySelector('.sv__tool-detail')?.textContent).toContain(
      'cat <<EOF'
    );
    expect(mount.querySelector('.sv__tool-detail')?.textContent).not.toContain(
      'line two'
    );
    expect(mount.querySelector('.sv__tool-more')?.textContent).toContain(
      '⋯ 4줄'
    );
  });

  test('expands a Bash line to the verbatim command, not its input JSON', () => {
    store.set('session-log:att-bash2', [
      toolWith('b1', 'Bash', { command: 'echo one\necho two' }),
      resultWith('b1', 'one\ntwo')
    ]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });
    drawer.open({ attempt_id: 'att-bash2' });

    /** @type {HTMLElement} */ (mount.querySelector('.sv__tool')).dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );

    const body = mount.querySelector('.sv__tool-expand')?.textContent || '';
    expect(body).toContain('echo one\necho two');
    expect(body).not.toContain('"command"');
    expect(body).toContain('output:');
  });

  test('pairs the pending tool with the latest thinking in the 지금 bar', () => {
    store.set('session-log:att-now-th', [
      thinking('테스트 먼저 돌린다\n세부'),
      toolWith('b1', 'Bash', { command: 'npm test' })
    ]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-now-th', meta: { status: 'running' } });

    expect(mount.querySelector('.sv__now-name')?.textContent).toContain('Bash');
    const think = mount.querySelector('.sv__now-think')?.textContent || '';
    expect(think).toContain('테스트 먼저 돌린다');
    expect(think).not.toContain('세부');
    drawer.destroy();
  });

  test('shows the 지금 bar for a latest thinking with no pending tool', () => {
    store.set('session-log:att-now-th2', [
      toolWith('b1', 'Bash', { command: 'npm test' }),
      resultWith('b1', 'ok'),
      thinking('결과 읽는 중')
    ]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-now-th2', meta: { status: 'running' } });

    expect(mount.querySelector('.sv__now')).toBeTruthy();
    expect(mount.querySelector('.sv__now-name')).toBeFalsy();
    expect(mount.querySelector('.sv__now-think')?.textContent).toContain(
      '결과 읽는 중'
    );
    drawer.destroy();
  });

  test('shows no 지금 bar for a finished session with thinking', () => {
    store.set('session-log:att-now-th3', [thinking('끝난 세션 판단')]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-now-th3', meta: { status: 'done' } });

    expect(mount.querySelector('.sv__now')).toBeFalsy();
  });
});

/**
 * A TaskCreate tool_use whose input carries only subject/activeForm — the
 * real shape (no taskId until the tool_result comes back).
 *
 * @param {string} id
 * @param {string} subject
 * @param {string} activeForm
 */
function taskCreate(id, subject, activeForm) {
  return toolWith(id, 'TaskCreate', { subject, activeForm });
}

/**
 * A TaskUpdate tool_use whose input carries only taskId/status.
 *
 * @param {string} id
 * @param {number} taskId
 * @param {string} status
 */
function taskUpdate(id, taskId, status) {
  return toolWith(id, 'TaskUpdate', { taskId, status });
}

describe('transcript drawer — 현재 단계 칩 (UI-dixx 변경 3)', () => {
  test('1층: shows the last phase/gate line as an exact stage chip', () => {
    store.set('session-log:att-chip1', [
      {
        type: 'assistant',
        message: { content: [{ type: 'text', text: 'Phase 1/3 · 파서 확장' }] }
      },
      {
        type: 'assistant',
        message: {
          content: [{ type: 'text', text: 'Phase 2/3 · 드로어 렌더' }]
        }
      }
    ]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-chip1', meta: { status: 'done' } });

    const chip = mount.querySelector('.sv__stage');
    expect(chip?.textContent).toContain('Phase 2/3');
    expect(chip?.classList.contains('sv__stage--guess')).toBe(false);
  });

  test('2층: shows the in_progress task activeForm resolved through Task #N', () => {
    store.set('session-log:att-chip2', [
      taskCreate('c1', '파서 확장', '파서 확장하는 중'),
      resultWith('c1', 'Task #1 created: 파서 확장'),
      taskUpdate('u1', 1, 'in_progress')
    ]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-chip2', meta: { status: 'done' } });

    const chip = mount.querySelector('.sv__stage');
    expect(chip?.textContent).toContain('파서 확장하는 중');
    expect(chip?.classList.contains('sv__stage--guess')).toBe(false);
  });

  test('2층: falls through to the lower tier once the task completes', () => {
    store.set('session-log:att-chip3', [
      taskCreate('c1', '파서 확장', '파서 확장하는 중'),
      resultWith('c1', 'Task #1 created: 파서 확장'),
      taskUpdate('u1', 1, 'in_progress'),
      taskUpdate('u2', 1, 'completed'),
      toolWith('e1', 'Edit', {
        file_path: '/a.js',
        old_string: 'a',
        new_string: 'b'
      })
    ]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-chip3', meta: { status: 'done' } });

    const chip = mount.querySelector('.sv__stage');
    expect(chip?.textContent).toContain('~ 구현 중');
    expect(chip?.classList.contains('sv__stage--guess')).toBe(true);
  });

  test('2층: ignores a TaskCreate whose tool_result never carried a Task #N', () => {
    store.set('session-log:att-chip4', [
      taskCreate('c1', '파서 확장', '파서 확장하는 중'),
      taskUpdate('u1', 1, 'in_progress'),
      toolWith('r1', 'Read', { file_path: '/a.js' })
    ]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-chip4', meta: { status: 'done' } });

    expect(mount.querySelector('.sv__stage')?.textContent).toContain(
      '~ 탐색 중'
    );
  });

  test('3층: the majority bucket beats a single more-recent signal', () => {
    /** @type {unknown[]} */
    const lines = [];
    for (let i = 0; i < 6; i += 1) {
      lines.push(toolWith(`g${i}`, 'Grep', { pattern: `p${i}` }));
    }
    lines.push(
      toolWith('e1', 'Edit', {
        file_path: '/a.js',
        old_string: 'a',
        new_string: 'b'
      })
    );
    store.set('session-log:att-chip5', lines);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-chip5', meta: { status: 'done' } });

    expect(mount.querySelector('.sv__stage')?.textContent).toContain(
      '~ 탐색 중'
    );
  });

  test('3층: a tie resolves to the more recent signal', () => {
    store.set('session-log:att-chip6', [
      toolWith('e1', 'Edit', {
        file_path: '/a.js',
        old_string: 'a',
        new_string: 'b'
      }),
      toolWith('e2', 'Write', { file_path: '/b.js', content: 'x' }),
      toolWith('r1', 'Read', { file_path: '/c.js' }),
      toolWith('r2', 'Grep', { pattern: 'q' })
    ]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-chip6', meta: { status: 'done' } });

    expect(mount.querySelector('.sv__stage')?.textContent).toContain(
      '~ 탐색 중'
    );
  });

  test('3층: a single verification bucket reads 검증 중', () => {
    store.set('session-log:att-chip7', [
      toolWith('b1', 'Bash', { command: 'npm test' })
    ]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-chip7', meta: { status: 'done' } });

    expect(mount.querySelector('.sv__stage')?.textContent).toContain(
      '~ 검증 중'
    );
  });

  test('3층: a PR/publish bucket reads PR/게시 중', () => {
    store.set('session-log:att-chip8', [
      toolWith('b1', 'Bash', { command: 'gh pr create --base main' })
    ]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-chip8', meta: { status: 'done' } });

    expect(mount.querySelector('.sv__stage')?.textContent).toContain(
      '~ PR/게시 중'
    );
  });

  test('3층: no bucket signal hides the chip', () => {
    store.set('session-log:att-chip9', [
      toolWith('b1', 'Bash', { command: 'echo hi' }),
      TEXT_EVENT
    ]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-chip9', meta: { status: 'done' } });

    expect(mount.querySelector('.sv__stage')).toBeFalsy();
  });

  test('층간 우선순위: an exact tier-1 signal wins over task and activity', () => {
    store.set('session-log:att-chip10', [
      taskCreate('c1', '파서 확장', '파서 확장하는 중'),
      resultWith('c1', 'Task #1 created'),
      taskUpdate('u1', 1, 'in_progress'),
      {
        type: 'assistant',
        message: { content: [{ type: 'text', text: 'Phase 3/3 · 마감' }] }
      },
      toolWith('e1', 'Edit', {
        file_path: '/a.js',
        old_string: 'a',
        new_string: 'b'
      })
    ]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-chip10', meta: { status: 'done' } });

    expect(mount.querySelector('.sv__stage')?.textContent).toContain(
      'Phase 3/3'
    );
  });

  test('층간 우선순위: a tier-2 task wins over the activity fallback', () => {
    /** @type {unknown[]} */
    const lines = [
      taskCreate('c1', '검증', '검증하는 중'),
      resultWith('c1', 'Task #1 created'),
      taskUpdate('u1', 1, 'in_progress')
    ];
    for (let i = 0; i < 6; i += 1) {
      lines.push(toolWith(`r${i}`, 'Read', { file_path: `/f${i}.js` }));
    }
    store.set('session-log:att-chip11', lines);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-chip11', meta: { status: 'done' } });

    expect(mount.querySelector('.sv__stage')?.textContent).toContain(
      '검증하는 중'
    );
  });
});

/**
 * UI-eey2 §9.5: the monitor opens sessions of repos the connection is NOT
 * pointed at, so both reads carry the owning workspace root. Omitting it keeps
 * the server's own connection scope, which is what the Worker console wants.
 */
describe('transcript drawer root_dir (UI-eey2 §9.5)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="d"></div>';
    mount = /** @type {HTMLElement} */ (document.getElementById('d'));
    store = createSessionLogStore();
    sends = [];
  });

  test('carries root_dir on the session-log subscription', () => {
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'a1', root_dir: '/tmp/other-repo' });

    expect(
      sends.find((s) => s.type === 'subscribe-session-log')?.payload
    ).toMatchObject({ attempt_id: 'a1', root_dir: '/tmp/other-repo' });
    drawer.destroy();
  });

  test('carries root_dir on the recorded prompt read', async () => {
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'a1', root_dir: '/tmp/other-repo' });
    /** @type {HTMLElement|null} */ (
      mount.querySelector('[data-seam="attempt-prompt-toggle"]')
    )?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();

    expect(
      sends.find((s) => s.type === 'get-attempt-prompt')?.payload
    ).toMatchObject({ attempt_id: 'a1', root_dir: '/tmp/other-repo' });
    drawer.destroy();
  });

  test('omits root_dir when the opener does not name one', () => {
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'a1' });

    expect(
      sends.find((s) => s.type === 'subscribe-session-log')?.payload
    ).not.toHaveProperty('root_dir');
    drawer.destroy();
  });
});

describe('transcript drawer subagent folding (UI-2mpn §6.4)', () => {
  const AGENT_EVENT = {
    type: 'assistant',
    parent_tool_use_id: null,
    message: {
      content: [
        {
          type: 'tool_use',
          id: 'toolu_agent_1',
          name: 'Agent',
          input: { description: '스펙 조사', subagent_type: 'general-purpose' }
        }
      ]
    }
  };

  /**
   * @param {string} text
   */
  function childText(text) {
    return {
      type: 'assistant',
      parent_tool_use_id: 'toolu_agent_1',
      message: { content: [{ type: 'text', text }] }
    };
  }

  test('folds a subagent under its Agent call by default', () => {
    store.set('session-log:att-sub', [
      TEXT_EVENT,
      AGENT_EVENT,
      childText('첫 줄'),
      childText('둘째 줄')
    ]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-sub' });

    const head = mount.querySelector('.sv__sub-head');
    expect(head?.textContent).toContain('general-purpose');
    expect(head?.textContent).toContain('2줄');
    expect(mount.querySelector('.sv__sub-body')).toBe(null);
  });

  test('shows the child lines after the header is clicked', () => {
    store.set('session-log:att-sub2', [
      AGENT_EVENT,
      childText('첫 줄'),
      childText('둘째 줄')
    ]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });
    drawer.open({ attempt_id: 'att-sub2' });

    /** @type {HTMLElement} */ (mount.querySelector('.sv__sub-head')).click();

    expect(mount.querySelector('.sv__sub-body')?.textContent).toContain(
      '둘째 줄'
    );
  });

  test('reports a running subagent whose Agent call has no result yet', () => {
    store.set('session-log:att-sub3', [AGENT_EVENT, childText('작업 중')]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-sub3' });

    expect(mount.querySelector('.sv__sub-state')?.textContent).toBe('⟳');
  });

  test('reports a finished subagent once its tool_result landed', () => {
    store.set('session-log:att-sub4', [
      AGENT_EVENT,
      childText('작업 중'),
      {
        type: 'user',
        message: {
          content: [
            {
              type: 'tool_result',
              tool_use_id: 'toolu_agent_1',
              content: '요약'
            }
          ]
        }
      }
    ]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-sub4' });

    expect(mount.querySelector('.sv__sub-state')?.textContent).toBe('✓');
  });

  test('groups orphaned child lines under an anonymous header', () => {
    store.set('session-log:att-sub5', [childText('스냅샷 경계 이후')]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'att-sub5' });

    expect(mount.querySelector('.sv__sub-name')?.textContent).toBe('subagent');
    expect(mount.querySelector('.sv__sub-state')).toBe(null);
  });

  test('folds a same-tool run inside a subagent group independently', () => {
    /**
     * @param {number} n
     */
    const childRead = (n) => ({
      type: 'assistant',
      parent_tool_use_id: 'toolu_agent_1',
      message: {
        content: [
          {
            type: 'tool_use',
            id: `c${n}`,
            name: 'Read',
            input: { file_path: `/repo/c${n}.js` }
          }
        ]
      }
    });
    store.set('session-log:att-sub6', [
      AGENT_EVENT,
      childRead(1),
      childRead(2),
      childRead(3),
      childRead(4),
      childRead(5)
    ]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });
    drawer.open({ attempt_id: 'att-sub6' });

    /** @type {HTMLElement} */ (mount.querySelector('.sv__sub-head')).click();

    expect(
      mount.querySelector('.sv__sub-body .sv__group-count')?.textContent
    ).toBe('5');
  });
});

describe('transcript drawer 바깥 클릭 닫기', () => {
  /**
   * @param {Element} target
   */
  function mousedownOn(target) {
    target.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
  }

  test('closes on a mousedown outside the mount', () => {
    store.set('session-log:att-oc1', [TEXT_EVENT]);
    const outside = document.createElement('div');
    document.body.appendChild(outside);
    const onClose = vi.fn();
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store,
      onClose
    });
    drawer.open({ attempt_id: 'att-oc1' });

    mousedownOn(outside);

    expect(drawer.isOpen()).toBe(false);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(
      sends.some(
        (s) =>
          s.type === 'unsubscribe-session-log' &&
          s.payload.id === 'session-log:att-oc1'
      )
    ).toBe(true);
    drawer.destroy();
  });

  test('stays open on a mousedown inside the drawer', () => {
    store.set('session-log:att-oc2', [TEXT_EVENT]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });
    drawer.open({ attempt_id: 'att-oc2' });

    mousedownOn(/** @type {Element} */ (mount.querySelector('.sv__body')));

    expect(drawer.isOpen()).toBe(true);
    drawer.destroy();
  });

  test('stays open on a mousedown inside a dialog above it', () => {
    store.set('session-log:att-oc3', [TEXT_EVENT]);
    const dialog = document.createElement('dialog');
    const dialog_button = document.createElement('button');
    dialog.appendChild(dialog_button);
    document.body.appendChild(dialog);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });
    drawer.open({ attempt_id: 'att-oc3' });

    mousedownOn(dialog_button);

    expect(drawer.isOpen()).toBe(true);
    drawer.destroy();
  });

  test('stops listening once the drawer is closed', () => {
    store.set('session-log:att-oc4', [TEXT_EVENT]);
    const outside = document.createElement('div');
    document.body.appendChild(outside);
    const onClose = vi.fn();
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store,
      onClose
    });
    drawer.open({ attempt_id: 'att-oc4' });
    drawer.close();

    mousedownOn(outside);

    expect(onClose).toHaveBeenCalledTimes(1);
    drawer.destroy();
  });
});

describe('transcript drawer session_ref 변형 (UI-4xzk §6.2)', () => {
  const SESSION_REF = {
    bead_id: 'UI-4xzk',
    provider: 'claude',
    session_id: 'a1b2c3d4-5e6f'
  };

  beforeEach(() => {
    document.body.innerHTML = '<div id="d"></div>';
    mount = /** @type {HTMLElement} */ (document.getElementById('d'));
    store = createSessionLogStore();
    sends = [];
  });

  test('carries the session_ref verbatim into the subscribe payload', () => {
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({
      attempt_id: 'session:claude:a1b2c3d4-5e6f',
      session_ref: SESSION_REF,
      root_dir: '/tmp/repo-a'
    });

    expect(
      sends.find((s) => s.type === 'subscribe-session-log')?.payload
    ).toMatchObject({
      id: 'session-log:session:claude:a1b2c3d4-5e6f',
      attempt_id: 'session:claude:a1b2c3d4-5e6f',
      session_ref: SESSION_REF,
      root_dir: '/tmp/repo-a'
    });
    drawer.destroy();
  });

  test('refuses to open when a launch_id arrives with a session_ref', () => {
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({
      attempt_id: 'session:claude:a1b2c3d4-5e6f',
      launch_id: 'toolu_01',
      session_ref: SESSION_REF
    });

    expect(drawer.isOpen()).toBe(false);
    expect(
      sends.find((s) => s.type === 'subscribe-session-log')
    ).toBeUndefined();
    drawer.destroy();
  });

  test('omits the session_ref key from an ordinary attempt subscription', () => {
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'a1' });

    expect(
      sends.find((s) => s.type === 'subscribe-session-log')?.payload
    ).not.toHaveProperty('session_ref');
    drawer.destroy();
  });

  test('shows the meta label instead of the synthetic attempt id', () => {
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({
      attempt_id: 'session:claude:a1b2c3d4-5e6f',
      session_ref: SESSION_REF,
      meta: { label: 'claude · a1b2c3d4' }
    });

    expect(mount.querySelector('.sv__id')?.textContent?.trim()).toBe(
      'claude · a1b2c3d4'
    );
    drawer.destroy();
  });

  test('copies the full resume command from the bar button', async () => {
    const writeText = vi.fn(() => Promise.resolve());
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true
    });
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({
      attempt_id: 'session:claude:a1b2c3d4-5e6f',
      session_ref: SESSION_REF,
      meta: {
        session_id: 'a1b2c3d4-5e6f',
        resume_command: "claude --resume 'a1b2c3d4-5e6f'"
      }
    });
    const button = /** @type {HTMLElement} */ (
      mount.querySelector('.sv__resume-cmd')
    );
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();

    expect(button.getAttribute('title')).toBe(
      "claude --resume 'a1b2c3d4-5e6f'"
    );
    expect(mount.querySelector('.sv__session')).not.toBeNull();
    expect(writeText).toHaveBeenCalledWith("claude --resume 'a1b2c3d4-5e6f'");
    drawer.destroy();
  });

  test('renders no resume button without a resume command', () => {
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({ attempt_id: 'a1', meta: { session_id: 'sid-1' } });

    expect(mount.querySelector('.sv__resume-cmd')).toBeNull();
    drawer.destroy();
  });

  test('hides the prompt toggle for a session that has no dispatched prompt', () => {
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({
      attempt_id: 'session:claude:a1b2c3d4-5e6f',
      session_ref: SESSION_REF,
      hide_prompt: true
    });

    expect(
      mount.querySelector('[data-seam="attempt-prompt-toggle"]')
    ).toBeNull();
    drawer.destroy();
  });

  test('renders a human input turn as a collapsed user line that expands', () => {
    store.set('session-log:session:claude:a1b2c3d4-5e6f', [
      {
        type: 'user',
        message: { content: '첫 줄 지시\n둘째 줄 세부' }
      }
    ]);
    const drawer = createTranscriptDrawer(mount, {
      transport: mockTransport(),
      sessionLogStore: store
    });

    drawer.open({
      attempt_id: 'session:claude:a1b2c3d4-5e6f',
      session_ref: SESSION_REF
    });
    const line = /** @type {HTMLElement} */ (
      mount.querySelector('.sv__line--user')
    );

    expect(line.querySelector('.sv__user-line')?.textContent).toContain(
      '▷ 첫 줄 지시'
    );
    expect(line.querySelector('.sv__user-expand')).toBeNull();

    line.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(mount.querySelector('.sv__user-expand')?.textContent).toBe(
      '첫 줄 지시\n둘째 줄 세부'
    );
    drawer.destroy();
  });
});
