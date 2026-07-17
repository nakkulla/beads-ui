import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createSessionLogStore } from '../../data/session-log-store.js';
import { createSubscriptionIssueStores } from '../../data/subscription-issue-stores.js';
import { createWorkerQueueStore } from '../../data/worker-queue-store.js';
import { createDetailPanel } from './index.js';

describe('views/detail-panel', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  test('renders id / title / status from the detail snapshot store', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const issueStores = createSubscriptionIssueStores();
    const panel = createDetailPanel(mount, {
      issueStores,
      onClose: vi.fn()
    });

    issueStores.register('detail:UI-1', {
      type: 'issue-detail',
      params: { id: 'UI-1' }
    });
    const store = issueStores.getStore('detail:UI-1');
    store?.applyPush({
      type: 'snapshot',
      id: 'detail:UI-1',
      revision: 1,
      issues: /** @type {any} */ ([
        {
          id: 'UI-1',
          title: '인증 모듈',
          status: 'in_progress',
          priority: 1,
          description: '설명 본문',
          updated_at: 1700000000000,
          created_at: 1700000000000
        }
      ])
    });

    panel.load('UI-1');

    expect(mount.querySelector('.detail-overlay__id')?.textContent).toContain(
      'UI-1'
    );
    expect(
      mount.querySelector('.detail-overlay__title')?.textContent
    ).toContain('인증 모듈');
    expect(mount.textContent).toContain('in_progress');
    expect(mount.textContent).toContain('설명 본문');
  });

  test('close button and backdrop invoke onClose', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const onClose = vi.fn();
    const panel = createDetailPanel(mount, { onClose });
    panel.load('UI-9');

    const closeBtn = /** @type {HTMLElement} */ (
      mount.querySelector('.detail-overlay__close')
    );
    closeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onClose).toHaveBeenCalledTimes(1);

    const backdrop = /** @type {HTMLElement} */ (
      mount.querySelector('.detail-overlay__backdrop')
    );
    backdrop.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onClose).toHaveBeenCalledTimes(2);

    panel.destroy();
  });

  /**
   * Register a detail store + seed one issue, then build a panel over it.
   *
   * @param {HTMLElement} mount
   * @param {any} issue
   * @param {(type: string, payload: unknown) => Promise<unknown>} transport
   */
  function seedPanel(mount, issue, transport) {
    const issueStores = createSubscriptionIssueStores();
    const panel = createDetailPanel(mount, {
      issueStores,
      transport,
      onClose: vi.fn()
    });
    issueStores.register('detail:' + issue.id, {
      type: 'issue-detail',
      params: { id: issue.id }
    });
    const store = issueStores.getStore('detail:' + issue.id);
    store?.applyPush({
      type: 'snapshot',
      id: 'detail:' + issue.id,
      revision: 1,
      issues: /** @type {any} */ ([issue])
    });
    panel.load(issue.id);
    return { panel, issueStores, store };
  }

  const baseIssue = {
    id: 'UI-1',
    title: '인증 모듈',
    status: 'in_progress',
    priority: 1,
    description: '설명 본문',
    labels: ['area:auth', 'has:spec'],
    updated_at: 1700000000000,
    created_at: 1700000000000
  };

  test('title pencil opens an input; save sends edit-text title', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const transport = vi
      .fn()
      .mockResolvedValue({ ...baseIssue, title: '인증 모듈 v2' });
    const { panel } = seedPanel(mount, baseIssue, transport);

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.detail-edit-btn[data-edit="title"]')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    const input = /** @type {HTMLInputElement} */ (
      mount.querySelector('.detail-edit__input[data-edit="title"]')
    );
    expect(input).not.toBeNull();
    input.value = '인증 모듈 v2';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-edit="title-save"]')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(transport).toHaveBeenCalledWith('edit-text', {
      id: 'UI-1',
      field: 'title',
      value: '인증 모듈 v2'
    });
    await Promise.resolve();
    await Promise.resolve();
    // Editor closed, fresh title rendered.
    expect(
      mount.querySelector('.detail-edit__input[data-edit="title"]')
    ).toBeNull();
    expect(
      mount.querySelector('.detail-overlay__title')?.textContent
    ).toContain('인증 모듈 v2');
    panel.destroy();
  });

  test('a single-item array mutation reply (bd show list shape) is a success', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    // Some bd CLI versions emit `bd show --json` as a single-item ARRAY and the
    // server passes it through unnormalized — this must count as success.
    const transport = vi
      .fn()
      .mockResolvedValue([{ ...baseIssue, title: '배열 응답 제목' }]);
    const { panel } = seedPanel(mount, baseIssue, transport);

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.detail-edit-btn[data-edit="title"]')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    const input = /** @type {HTMLInputElement} */ (
      mount.querySelector('.detail-edit__input[data-edit="title"]')
    );
    input.value = '배열 응답 제목';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-edit="title-save"]')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    await Promise.resolve();
    await Promise.resolve();
    // Success path: editor closed and the fresh title rendered (a failure would
    // keep the editor open).
    expect(
      mount.querySelector('.detail-edit__input[data-edit="title"]')
    ).toBeNull();
    expect(
      mount.querySelector('.detail-overlay__title')?.textContent
    ).toContain('배열 응답 제목');
    panel.destroy();
  });

  test('title cancel sends no message and closes the editor', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const transport = vi.fn().mockResolvedValue(baseIssue);
    const { panel } = seedPanel(mount, baseIssue, transport);

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.detail-edit-btn[data-edit="title"]')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    const input = /** @type {HTMLInputElement} */ (
      mount.querySelector('.detail-edit__input[data-edit="title"]')
    );
    input.value = '버릴 값';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-edit="title-cancel"]')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(transport).not.toHaveBeenCalled();
    expect(
      mount.querySelector('.detail-edit__input[data-edit="title"]')
    ).toBeNull();
    panel.destroy();
  });

  test('description pencil opens a textarea; save sends edit-text description', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const transport = vi.fn().mockResolvedValue(baseIssue);
    const { panel } = seedPanel(mount, baseIssue, transport);

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.detail-edit-btn[data-edit="description"]')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    const ta = /** @type {HTMLTextAreaElement} */ (
      mount.querySelector('.detail-edit__textarea[data-edit="description"]')
    );
    expect(ta).not.toBeNull();
    ta.value = '새 설명';
    ta.dispatchEvent(new Event('input', { bubbles: true }));

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-edit="description-save"]')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(transport).toHaveBeenCalledWith('edit-text', {
      id: 'UI-1',
      field: 'description',
      value: '새 설명'
    });
    panel.destroy();
  });

  test('status select change sends update-status', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const transport = vi.fn().mockResolvedValue(baseIssue);
    const { panel } = seedPanel(mount, baseIssue, transport);

    const sel = /** @type {HTMLSelectElement} */ (
      mount.querySelector('select[data-edit="status"]')
    );
    expect(sel).not.toBeNull();
    sel.value = 'resolved';
    sel.dispatchEvent(new Event('change', { bubbles: true }));

    expect(transport).toHaveBeenCalledWith('update-status', {
      id: 'UI-1',
      status: 'resolved'
    });
    panel.destroy();
  });

  test('priority select change sends update-priority with a number', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const transport = vi.fn().mockResolvedValue(baseIssue);
    const { panel } = seedPanel(mount, baseIssue, transport);

    const sel = /** @type {HTMLSelectElement} */ (
      mount.querySelector('select[data-edit="priority"]')
    );
    expect(sel).not.toBeNull();
    sel.value = '3';
    sel.dispatchEvent(new Event('change', { bubbles: true }));

    expect(transport).toHaveBeenCalledWith('update-priority', {
      id: 'UI-1',
      priority: 3
    });
    panel.destroy();
  });

  test('label chip × sends label-remove; add input Enter sends label-add', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const transport = vi.fn().mockResolvedValue(baseIssue);
    const { panel } = seedPanel(mount, baseIssue, transport);

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.detail-label-chip__x[data-label="area:auth"]')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(transport).toHaveBeenCalledWith('label-remove', {
      id: 'UI-1',
      label: 'area:auth'
    });

    const add = /** @type {HTMLInputElement} */ (
      mount.querySelector('.detail-label-add__input')
    );
    add.value = 'has:pr';
    add.dispatchEvent(new Event('input', { bubbles: true }));
    add.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    );
    expect(transport).toHaveBeenCalledWith('label-add', {
      id: 'UI-1',
      label: 'has:pr'
    });
    panel.destroy();
  });

  test('failed title save shows a toast and keeps the editor open with the value', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const transport = vi.fn().mockRejectedValue(new Error('bd failed'));
    const { panel } = seedPanel(mount, baseIssue, transport);

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.detail-edit-btn[data-edit="title"]')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    const input = /** @type {HTMLInputElement} */ (
      mount.querySelector('.detail-edit__input[data-edit="title"]')
    );
    input.value = '실패할 값';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-edit="title-save"]')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    await Promise.resolve();
    await Promise.resolve();

    // Toast shown.
    expect(document.querySelector('.toast')).not.toBeNull();
    // Editor still open, value preserved.
    const still = /** @type {HTMLInputElement} */ (
      mount.querySelector('.detail-edit__input[data-edit="title"]')
    );
    expect(still).not.toBeNull();
    expect(still.value).toBe('실패할 값');
    panel.destroy();
  });

  test('an unrelated push does not wipe an open title editor', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const transport = vi.fn().mockResolvedValue(baseIssue);
    const { panel, store } = seedPanel(mount, baseIssue, transport);

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.detail-edit-btn[data-edit="title"]')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    const input = /** @type {HTMLInputElement} */ (
      mount.querySelector('.detail-edit__input[data-edit="title"]')
    );
    input.value = '작성 중';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    // A push for an unrelated field (status) arrives mid-edit.
    store?.applyPush({
      type: 'snapshot',
      id: 'detail:UI-1',
      revision: 2,
      issues: /** @type {any} */ ([{ ...baseIssue, status: 'resolved' }])
    });

    const still = /** @type {HTMLInputElement} */ (
      mount.querySelector('.detail-edit__input[data-edit="title"]')
    );
    expect(still).not.toBeNull();
    expect(still.value).toBe('작성 중');
    panel.destroy();
  });

  test('session-history lists a bead attempt and opens the transcript drawer', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      /** @type {any} */ ({
        revision: 1,
        auto_advance: false,
        serial: [],
        parallel: [],
        done: [],
        attempts: {
          a7: {
            attempt_id: 'a7',
            bead_id: 'UI-1',
            status: 'done',
            runner: 'claude',
            model: 'opus',
            started_at: Date.now() - 60000
          }
        }
      })
    );
    const sessionLogStore = createSessionLogStore();
    sessionLogStore.set('a7', [
      {
        type: 'result',
        subtype: 'success',
        is_error: false,
        result: 'DONE'
      }
    ]);
    const transport = vi.fn().mockResolvedValue({ ok: true });

    const panel = createDetailPanel(mount, {
      queueStore,
      sessionLogStore,
      transport,
      onClose: vi.fn()
    });
    panel.load('UI-1');

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.detail-session[data-attempt-id="a7"]')
    );
    expect(row).not.toBeNull();

    row.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(transport).toHaveBeenCalledWith('subscribe-session-log', {
      id: 'session-log:a7',
      attempt_id: 'a7'
    });
    // The transcript drawer renders into its body-appended overlay mount.
    const drawer = document.querySelector('.session-log-root .sv');
    expect(drawer).not.toBeNull();
    expect(drawer?.querySelector('.sv__result--ok')).not.toBeNull();

    panel.destroy();
  });
});

describe('views/detail-panel created/updated rows (UX v3 spec §1)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  test('renders read-only 생성/수정 rows with local YYYY-MM-DD HH:mm values', async () => {
    const { formatTimestampLocal } =
      await import('../../utils/relative-time.js');
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const issueStores = createSubscriptionIssueStores();
    const panel = createDetailPanel(mount, {
      issueStores,
      onClose: vi.fn()
    });

    const created_at = Date.parse('2026-07-01T02:03:00.000Z');
    const updated_at = Date.parse('2026-07-15T11:22:00.000Z');
    issueStores.register('detail:UI-77', {
      type: 'issue-detail',
      params: { id: 'UI-77' }
    });
    issueStores.getStore('detail:UI-77')?.applyPush({
      type: 'snapshot',
      id: 'detail:UI-77',
      revision: 1,
      issues: /** @type {any} */ ([
        {
          id: 'UI-77',
          title: '시각 표시',
          status: 'open',
          created_at,
          updated_at
        }
      ])
    });

    panel.load('UI-77');

    const times = Array.from(mount.querySelectorAll('.detail-kv__v--time')).map(
      (el) => el.textContent?.trim()
    );
    expect(times).toEqual([
      formatTimestampLocal(created_at),
      formatTimestampLocal(updated_at)
    ]);
    expect(times[0]).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
    expect(mount.textContent).toContain('생성');
    expect(mount.textContent).toContain('수정');
  });
});
