/**
 * The three prompt-inspection surfaces (UI-rxp3 §4/§5) render from the server's
 * reply and hold no prompt text of their own.
 */
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createSessionLogStore } from '../data/session-log-store.js';
import { createWorkerQueueStore } from '../data/worker-queue-store.js';
import { createDetailPanel } from './detail-panel/index.js';
import { createSettingsDialog } from './settings-dialog/index.js';
import { createTranscriptDrawer } from './worker/transcript-drawer.js';

/**
 * @param {HTMLElement} root
 * @param {string} seam
 * @returns {HTMLElement}
 */
function seamEl(root, seam) {
  return /** @type {HTMLElement} */ (
    root.querySelector(`[data-seam="${seam}"]`)
  );
}

/**
 * @param {HTMLElement} el
 */
function click(el) {
  el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
}

/**
 * Let the awaited transport reply and the re-render it triggers settle.
 */
async function settle() {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
}

describe('detail panel 과업 프롬프트 section (UI-rxp3 §5)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  test('starts collapsed and fetches nothing until expanded', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const transport = vi.fn(async () => ({}));
    const panel = createDetailPanel(mount, {
      onClose: vi.fn(),
      transport: /** @type {any} */ (transport)
    });

    panel.load('UI-1');

    expect(seamEl(mount, 'task-prompt-toggle')).toBeTruthy();
    expect(seamEl(mount, 'task-prompt')).toBeFalsy();
    expect(transport).not.toHaveBeenCalledWith('get-bead-prompt', {
      bead_id: 'UI-1'
    });
    panel.destroy();
  });

  test('renders the recorded send on expand — with no worker-queue store at all', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const transport = vi.fn(async (/** @type {string} */ type) =>
      type === 'get-bead-prompt'
        ? {
            attempt_id: 'a-77',
            system_prompt: '## 가드 계약\n계약 전문',
            task_prompt: 'Bead UI-1 작업을 계약 네이티브 흐름으로 완료하라.',
            recorded_at: 1_700_000_000_000
          }
        : []
    );
    // No queueStore: this is the Worker-tab-never-visited path.
    const panel = createDetailPanel(mount, {
      onClose: vi.fn(),
      transport: /** @type {any} */ (transport)
    });
    panel.load('UI-1');

    click(seamEl(mount, 'task-prompt-toggle'));
    await settle();

    expect(transport).toHaveBeenCalledWith('get-bead-prompt', {
      bead_id: 'UI-1'
    });
    const body = seamEl(mount, 'task-prompt');
    expect(body.textContent).toContain('Bead UI-1 작업을');
    expect(body.textContent).toContain('계약 전문');
    expect(body.textContent).toContain('a-77');
    panel.destroy();
  });

  test('previews the default task prompt when nothing was recorded', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const transport = vi.fn(async () => ({
      missing: true,
      default_task_prompt: 'Bead UI-2 작업을 계약 네이티브 흐름으로 완료하라.'
    }));
    const panel = createDetailPanel(mount, {
      onClose: vi.fn(),
      transport: /** @type {any} */ (transport)
    });
    panel.load('UI-2');

    click(seamEl(mount, 'task-prompt-toggle'));
    await settle();

    const body = seamEl(mount, 'task-prompt');
    expect(body.textContent).toContain('기록 없음');
    expect(body.textContent).toContain('예상 기본 과업');
    expect(body.textContent).toContain('Bead UI-2 작업을');
    panel.destroy();
  });

  test('collapses again without refetching', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const transport = vi.fn(async (/** @type {string} */ type) => ({
      missing: true,
      type
    }));
    const panel = createDetailPanel(mount, {
      onClose: vi.fn(),
      transport: /** @type {any} */ (transport)
    });
    panel.load('UI-1');

    click(seamEl(mount, 'task-prompt-toggle'));
    await settle();
    click(seamEl(mount, 'task-prompt-toggle'));
    await settle();

    expect(seamEl(mount, 'task-prompt')).toBeFalsy();
    click(seamEl(mount, 'task-prompt-toggle'));
    await settle();
    expect(
      transport.mock.calls.filter((c) => c[0] === 'get-bead-prompt')
    ).toHaveLength(1);
    panel.destroy();
  });

  test('refetches for the same bead id after a workspace switch', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    let workspace = '/ws/a';
    const transport = vi.fn(async (/** @type {string} */ type) => ({
      attempt_id: `a-${workspace}`,
      system_prompt: 's',
      task_prompt: `${workspace} 과업`,
      recorded_at: null,
      type
    }));
    const panel = createDetailPanel(mount, {
      onClose: vi.fn(),
      transport: /** @type {any} */ (transport),
      getWorkspacePath: () => workspace
    });
    panel.load('UI-1');

    click(seamEl(mount, 'task-prompt-toggle'));
    await settle();
    expect(seamEl(mount, 'task-prompt').textContent).toContain('/ws/a 과업');

    // The overlay stays open across a workspace switch, and the bead id is the
    // same in both — a bead-only cache key would keep showing the old send.
    click(seamEl(mount, 'task-prompt-toggle'));
    workspace = '/ws/b';
    panel.load('UI-1');
    click(seamEl(mount, 'task-prompt-toggle'));
    await settle();

    expect(seamEl(mount, 'task-prompt').textContent).toContain('/ws/b 과업');
    expect(
      transport.mock.calls.filter((c) => c[0] === 'get-bead-prompt')
    ).toHaveLength(2);
    panel.destroy();
  });

  test('shows a failure line and leaves the rest of the panel intact', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const transport = vi.fn(async () => {
      throw new Error('socket down');
    });
    const panel = createDetailPanel(mount, {
      onClose: vi.fn(),
      transport: /** @type {any} */ (transport)
    });
    panel.load('UI-1');

    click(seamEl(mount, 'task-prompt-toggle'));
    await settle();

    expect(seamEl(mount, 'task-prompt').textContent).toContain(
      '불러오지 못했습니다'
    );
    expect(mount.querySelector('.detail-overlay__id')).toBeTruthy();
    panel.destroy();
  });
});

describe('transcript drawer sent-prompt panel (UI-rxp3 §5)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  test('fetches and renders the attempt send on toggle', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const transport = vi.fn(async (/** @type {string} */ type) =>
      type === 'get-attempt-prompt'
        ? {
            attempt_id: 'a-1',
            system_prompt: '## 무인 모드\n환경 사실',
            task_prompt: '과업 본문',
            recorded_at: 1_700_000_000_000
          }
        : {}
    );
    const drawer = createTranscriptDrawer(mount, {
      transport: /** @type {any} */ (transport),
      sessionLogStore: createSessionLogStore()
    });

    drawer.open({ attempt_id: 'a-1', meta: { status: 'done' } });
    click(seamEl(mount, 'attempt-prompt-toggle'));
    await settle();

    expect(transport).toHaveBeenCalledWith('get-attempt-prompt', {
      attempt_id: 'a-1'
    });
    const panel = seamEl(mount, 'attempt-prompt');
    expect(panel.textContent).toContain('과업 본문');
    expect(panel.textContent).toContain('환경 사실');
    drawer.destroy();
  });

  test('says 기록 없음 for an attempt from before the recording existed', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const transport = vi.fn(async () => ({ missing: true }));
    const drawer = createTranscriptDrawer(mount, {
      transport: /** @type {any} */ (transport),
      sessionLogStore: createSessionLogStore()
    });

    drawer.open({ attempt_id: 'old-1', meta: { status: 'failed' } });
    click(seamEl(mount, 'attempt-prompt-toggle'));
    await settle();

    expect(seamEl(mount, 'attempt-prompt').textContent).toContain('기록 없음');
    drawer.destroy();
  });

  test('drops the fetched prompt when another attempt is opened', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const transport = vi.fn(async () => ({
      attempt_id: 'a-1',
      system_prompt: 's',
      task_prompt: '첫 attempt 과업',
      recorded_at: null
    }));
    const drawer = createTranscriptDrawer(mount, {
      transport: /** @type {any} */ (transport),
      sessionLogStore: createSessionLogStore()
    });

    drawer.open({ attempt_id: 'a-1', meta: { status: 'done' } });
    click(seamEl(mount, 'attempt-prompt-toggle'));
    await settle();
    drawer.open({ attempt_id: 'a-2', meta: { status: 'done' } });

    expect(seamEl(mount, 'attempt-prompt')).toBeFalsy();
    drawer.destroy();
  });
});

describe('settings dialog worker system prompt (UI-rxp3 §4)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  /**
   * @param {any} transport
   */
  async function openExecutionTab(transport) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const dialog = createSettingsDialog(mount, {
      transport,
      policyStore: { get: () => null, set: () => {} },
      queueStore: createWorkerQueueStore(),
      labelOptions: () => [],
      notify: () => {}
    });
    dialog.open();
    await settle();
    const root = /** @type {HTMLElement} */ (
      mount.querySelector('#settings-dialog')
    );
    return { dialog, root };
  }

  test('renders every variant with its selecting condition on expand', async () => {
    const transport = vi.fn(async (/** @type {string} */ type) =>
      type === 'get-worker-system-prompt'
        ? {
            target_base_placeholder: '<target_base>',
            system_prompt: '기본 계약',
            variants: [
              {
                key: 'dispatch',
                label: '워커 디스패치 (기본)',
                condition: 'fast_track · PR 제출',
                system_prompt: '기본 계약'
              },
              {
                key: 'disposition',
                label: 'REVISE 처분 세션',
                condition: 'disposition — PR 미제출',
                system_prompt: '처분 계약'
              }
            ]
          }
        : { values: {}, warnings: [] }
    );
    const { dialog, root } = await openExecutionTab(transport);

    click(seamEl(root, 'system-prompt-toggle'));
    await settle();

    expect(transport).toHaveBeenCalledWith('get-worker-system-prompt', {});
    const section = seamEl(root, 'system-prompt');
    expect(section.textContent).toContain('워커 디스패치 (기본)');
    expect(section.textContent).toContain('기본 계약');
    expect(section.textContent).toContain('REVISE 처분 세션');
    expect(section.textContent).toContain('처분 계약');
    expect(section.querySelectorAll('[data-variant]')).toHaveLength(2);
    dialog.destroy();
  });

  test('holds no prompt text before the reply arrives', async () => {
    const { dialog, root } = await openExecutionTab(
      vi.fn(async () => ({ values: {}, warnings: [] }))
    );

    expect(seamEl(root, 'system-prompt').textContent).not.toContain(
      '가드 계약'
    );
    dialog.destroy();
  });

  test('reports a failed fetch in the section only', async () => {
    const transport = vi.fn(async (/** @type {string} */ type) => {
      if (type === 'get-worker-system-prompt') {
        throw new Error('socket down');
      }
      return { values: {}, warnings: [] };
    });
    const { dialog, root } = await openExecutionTab(transport);

    click(seamEl(root, 'system-prompt-toggle'));
    await settle();

    expect(seamEl(root, 'system-prompt').textContent).toContain(
      '불러오지 못했습니다'
    );
    dialog.destroy();
  });
});
