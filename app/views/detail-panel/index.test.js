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

    // Opening an issue fetches its comments (UI-ucq6 §변경 3), so the claim is
    // that cancel sent no MUTATION — not that the panel stayed silent.
    expect(transport.mock.calls.filter((c) => c[0] !== 'get-comments')).toEqual(
      []
    );
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
        queue: [],
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

  test('session-history projects the session id (short) and carries it into the drawer (§2)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      /** @type {any} */ ({
        revision: 1,
        auto_advance: false,
        queue: [],
        done: [],
        attempts: {
          a8: {
            attempt_id: 'a8',
            bead_id: 'UI-1',
            status: 'done',
            runner: 'claude',
            model: 'opus',
            session_id: 'sid-999abc12',
            started_at: Date.now() - 60000
          }
        }
      })
    );
    const sessionLogStore = createSessionLogStore();
    sessionLogStore.set('a8', [
      { type: 'result', subtype: 'success', is_error: false, result: 'DONE' }
    ]);
    const transport = vi.fn().mockResolvedValue({ ok: true });

    const panel = createDetailPanel(mount, {
      queueStore,
      sessionLogStore,
      transport,
      onClose: vi.fn()
    });
    panel.load('UI-1');

    const sid = /** @type {HTMLElement} */ (
      mount.querySelector(
        '.detail-session[data-attempt-id="a8"] .detail-session__sid'
      )
    );
    expect(sid).not.toBeNull();
    expect(sid.textContent?.trim()).toBe('sid-999a');
    expect(sid.getAttribute('title')).toBe('sid-999abc12');

    // Opening the row carries the projected session id into the drawer bar.
    /** @type {HTMLElement} */ (
      mount.querySelector('.detail-session[data-attempt-id="a8"]')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    const barSid = /** @type {HTMLElement} */ (
      document.querySelector('.session-log-root .sv__session')
    );
    expect(barSid).not.toBeNull();
    expect(barSid.getAttribute('title')).toBe('sid-999abc12');

    panel.destroy();
  });

  test('session-history: only the newest eligible leaf gets an active ↻ 이어하기; ancestor/pre-session-id disabled; ↻ badge on resume attempts (§1)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      /** @type {any} */ ({
        revision: 1,
        auto_advance: false,
        queue: [],
        done: [],
        attempts: {
          old: {
            attempt_id: 'old',
            bead_id: 'UI-1',
            status: 'failed',
            started_at: 1000
          },
          anc: {
            attempt_id: 'anc',
            bead_id: 'UI-1',
            status: 'failed',
            session_id: 'sid-anc',
            started_at: 2000
          },
          kid: {
            attempt_id: 'kid',
            bead_id: 'UI-1',
            status: 'failed',
            session_id: 'sid-kid',
            resumed_from: 'anc',
            started_at: 3000
          }
        }
      })
    );
    const transport = vi.fn().mockResolvedValue({ resumed: true });
    const panel = createDetailPanel(mount, {
      queueStore,
      transport,
      onClose: vi.fn()
    });
    panel.load('UI-1');

    /**
     * @param {string} id
     * @returns {HTMLButtonElement}
     */
    const resumeBtn = (id) =>
      /** @type {HTMLButtonElement} */ (
        mount.querySelector(`.detail-session__resume[data-attempt-id="${id}"]`)
      );

    // Pre-session-id attempt → button present but disabled.
    expect(resumeBtn('old').disabled).toBe(true);
    // Ancestor spent (kid.resumed_from=anc) → disabled.
    expect(resumeBtn('anc').disabled).toBe(true);
    // Newest eligible leaf → active.
    expect(resumeBtn('kid').disabled).toBe(false);

    // The resume attempt (kid) shows a ↻ badge inside its row.
    expect(
      mount.querySelector(
        '.detail-session[data-attempt-id="kid"] .detail-session__resumed'
      )
    ).not.toBeNull();

    // Clicking the active button fires the resume mutation (and does NOT open
    // the transcript drawer — it is a sibling, not the row button).
    resumeBtn('kid').dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(transport).toHaveBeenCalledWith('worker-attempt-resume', {
      attempt_id: 'kid',
      expected_revision: 1
    });

    panel.destroy();
  });

  test('session-history keeps ↻ 이어하기 active on a dismissed attempt (UI-qult §4)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      /** @type {any} */ ({
        revision: 1,
        auto_advance: false,
        queue: [],
        done: [],
        attempts: {
          dismissed: {
            attempt_id: 'dismissed',
            bead_id: 'UI-1',
            status: 'failed',
            session_id: 'sid-dismissed',
            dismissed_at: 5000,
            started_at: 4000
          }
        }
      })
    );
    const panel = createDetailPanel(mount, {
      queueStore,
      onClose: vi.fn()
    });
    panel.load('UI-1');

    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector(
        '.detail-session__resume[data-attempt-id="dismissed"]'
      )
    );

    // The server's `scheduler.resume()` never reads `dismissed_at`, so the UI
    // must not be stricter than the API it calls.
    expect(btn.disabled).toBe(false);
    expect(btn.getAttribute('title')).toBe(
      '이 세션을 같은 워크트리에서 이어서 진행'
    );

    panel.destroy();
  });

  test('session-history renders the failure cause line with its detail tooltip (UI-qult §4)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      /** @type {any} */ ({
        revision: 1,
        auto_advance: false,
        queue: [],
        done: [],
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'UI-1',
            status: 'failed',
            session_id: 'sid-a1',
            started_at: 1000,
            cause: 'loud_fail_blocker',
            cause_detail: {
              reason: 'merge_guard',
              command: 'git merge --no-ff UI-1'
            }
          }
        }
      })
    );
    const panel = createDetailPanel(mount, { queueStore, onClose: vi.fn() });
    panel.load('UI-1');

    const line = /** @type {HTMLElement} */ (
      mount.querySelector('.detail-session__cause')
    );

    expect(line.textContent?.trim()).toBe('loud_fail_blocker');
    expect(line.getAttribute('title')).toBe(
      'merge_guard · git merge --no-ff UI-1'
    );

    panel.destroy();
  });

  test('session-history tooltips a null cause_detail command as the reason alone', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      /** @type {any} */ ({
        revision: 1,
        auto_advance: false,
        queue: [],
        done: [],
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'UI-1',
            status: 'orphaned',
            started_at: 1000,
            cause: 'runner_exit',
            cause_detail: { reason: 'merge_guard', command: null }
          }
        }
      })
    );
    const panel = createDetailPanel(mount, { queueStore, onClose: vi.fn() });
    panel.load('UI-1');

    const line = /** @type {HTMLElement} */ (
      mount.querySelector('.detail-session__cause')
    );

    expect(line.getAttribute('title')).toBe('merge_guard');

    panel.destroy();
  });

  test('session-history renders nothing for an attempt without a cause', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      /** @type {any} */ ({
        revision: 1,
        auto_advance: false,
        queue: [],
        done: [],
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'UI-1',
            status: 'failed',
            started_at: 1000
          }
        }
      })
    );
    const panel = createDetailPanel(mount, { queueStore, onClose: vi.fn() });
    panel.load('UI-1');

    expect(mount.querySelector('.detail-session__cause')).toBeNull();

    panel.destroy();
  });

  test('exec settings default-option follows the queue exec_defaults (§3.2)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const issueStores = createSubscriptionIssueStores();
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      /** @type {any} */ ({
        revision: 1,
        auto_advance: false,
        queue: [],
        done: [],
        attempts: {},
        exec_defaults: { review_model: 'opus' }
      })
    );
    const panel = createDetailPanel(mount, {
      issueStores,
      queueStore,
      onClose: vi.fn()
    });
    issueStores.register('detail:UI-1', {
      type: 'issue-detail',
      params: { id: 'UI-1' }
    });
    issueStores.getStore('detail:UI-1')?.applyPush({
      type: 'snapshot',
      id: 'detail:UI-1',
      revision: 1,
      issues: /** @type {any} */ ([{ id: 'UI-1', title: 't' }])
    });
    panel.load('UI-1');

    // Global review_model default surfaces as the `(기본: opus — 전역)` label.
    const review = /** @type {HTMLSelectElement} */ (
      mount.querySelector('select[data-key="review_model"]')
    );
    expect(review.options[0].textContent).toContain('기본: opus');
    // The model catalog is the claude one; the retired runner row is gone.
    const model = /** @type {HTMLSelectElement} */ (
      mount.querySelector('select[data-key="orchestration_model"]')
    );
    const opts = Array.from(model.options).map((o) => o.value);
    expect(opts).toEqual(['', 'opus', 'sonnet', 'haiku', 'fable']);
    expect(mount.querySelector('select[data-key="worker_runner"]')).toBe(null);

    panel.destroy();
  });

  test('renders a read-only notes section when the issue carries notes', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { panel } = seedPanel(
      mount,
      { ...baseIssue, notes: 'spec 게이트: REVISE\nfinding 1: §3 누락' },
      vi.fn()
    );

    const notes = mount.querySelector('.detail-overlay__notes');
    expect(notes?.textContent).toContain('finding 1: §3 누락');
    expect(mount.textContent).toContain('노트');

    panel.destroy();
  });

  test('renders no notes section when the issue has none', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { panel } = seedPanel(mount, baseIssue, vi.fn());

    expect(mount.querySelector('.detail-overlay__notes')).toBe(null);

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

describe('views/detail-panel dependency edge types', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  /**
   * @param {unknown[]} dependencies
   * @returns {HTMLElement}
   */
  function mountWithDeps(dependencies) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const issueStores = createSubscriptionIssueStores();
    const panel = createDetailPanel(mount, {
      issueStores,
      onClose: vi.fn(),
      onNavigate: vi.fn()
    });

    issueStores.register('detail:UI-1', {
      type: 'issue-detail',
      params: { id: 'UI-1' }
    });
    issueStores.getStore('detail:UI-1')?.applyPush({
      type: 'snapshot',
      id: 'detail:UI-1',
      revision: 1,
      issues: /** @type {any} */ ([{ id: 'UI-1', title: 't', dependencies }])
    });

    panel.load('UI-1');
    return mount;
  }

  /**
   * @param {HTMLElement} mount
   * @returns {string[]}
   */
  function depTexts(mount) {
    return Array.from(mount.querySelectorAll('.detail-dep')).map((el) =>
      String(el.textContent || '')
        .replace(/\s+/g, ' ')
        .trim()
    );
  }

  test('renders a chain icon for a blocks edge', () => {
    const mount = mountWithDeps([{ id: 'UI-0', dependency_type: 'blocks' }]);

    expect(depTexts(mount)).toEqual(['⛓ UI-0']);
  });

  test('renders a return icon for a discovered-from edge', () => {
    const mount = mountWithDeps([
      { id: 'UI-0', dependency_type: 'discovered-from' }
    ]);

    expect(depTexts(mount)).toEqual(['↩ UI-0']);
  });

  test('renders the bare id for an unknown edge type', () => {
    const mount = mountWithDeps([{ id: 'UI-0', dependency_type: 'mystery' }]);

    expect(depTexts(mount)).toEqual(['UI-0']);
  });

  test('renders the bare id for a plain string edge', () => {
    const mount = mountWithDeps(['UI-0']);

    expect(depTexts(mount)).toEqual(['UI-0']);
  });

  test('renders one row per edge, keeping their order', () => {
    const mount = mountWithDeps([
      { id: 'UI-9', dependency_type: 'parent-child' },
      { id: 'UI-0', dependency_type: 'blocks' }
    ]);

    expect(depTexts(mount)).toEqual(['⌸ UI-9', '⛓ UI-0']);
  });

  test('reports no dependencies when the edge list is empty', () => {
    const mount = mountWithDeps([]);

    expect(mount.textContent).toContain('의존성 없음');
  });
});

describe('views/detail-panel comments wiring (UI-ucq6 §변경 3)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  /**
   * Panel over a detail store, with a transport that answers `get-comments`
   * with `comments` and every other type with the issue object.
   *
   * @param {any} issue
   * @param {any[]} comments
   */
  function seedCommentPanel(issue, comments) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const transport = vi.fn((/** @type {string} */ type) =>
      Promise.resolve(type === 'get-comments' ? comments : issue)
    );
    const issueStores = createSubscriptionIssueStores();
    const panel = createDetailPanel(mount, {
      issueStores,
      transport: /** @type {any} */ (transport),
      onClose: vi.fn()
    });
    let revision = 0;
    /** @param {any} next */
    const push = (next) => {
      const key = 'detail:' + next.id;
      if (!issueStores.getStore(key)) {
        issueStores.register(key, {
          type: 'issue-detail',
          params: { id: next.id }
        });
      }
      revision += 1;
      issueStores.getStore(key)?.applyPush({
        type: 'snapshot',
        id: key,
        revision,
        issues: /** @type {any} */ ([next])
      });
    };
    push(issue);
    panel.load(issue.id);
    return { mount, panel, transport, push };
  }

  /** @param {(t: string) => boolean} pred */
  const countCalls = (/** @type {any} */ transport, pred) =>
    transport.mock.calls.filter((/** @type {any[]} */ c) => pred(c[0])).length;

  const commentIssue = {
    id: 'UI-1',
    title: '댓글 이슈',
    status: 'open',
    priority: 2,
    description: '설명',
    comment_count: 1
  };

  const one_comment = [
    {
      id: 'c1',
      author: 'ilsun yun',
      text: '사람 댓글',
      created_at: '2026-08-03T17:20:00Z'
    }
  ];

  test('fetches comments once when an issue is opened', async () => {
    const { transport, mount } = seedCommentPanel(commentIssue, one_comment);

    await Promise.resolve();
    await Promise.resolve();

    expect(transport).toHaveBeenCalledWith('get-comments', { id: 'UI-1' });
    expect(mount.textContent).toContain('사람 댓글');
  });

  test('refetches comments when the snapshot comment_count changes', async () => {
    const { transport, push } = seedCommentPanel(commentIssue, one_comment);
    await Promise.resolve();
    await Promise.resolve();
    const before = countCalls(transport, (t) => t === 'get-comments');

    push({ ...commentIssue, comment_count: 2 });
    await Promise.resolve();
    await Promise.resolve();

    expect(countCalls(transport, (t) => t === 'get-comments')).toBe(before + 1);
  });

  test('does not refetch comments when comment_count is unchanged', async () => {
    const { transport, push } = seedCommentPanel(commentIssue, one_comment);
    await Promise.resolve();
    await Promise.resolve();
    const before = countCalls(transport, (t) => t === 'get-comments');

    push({ ...commentIssue, title: '제목만 바뀜' });
    await Promise.resolve();
    await Promise.resolve();

    expect(countCalls(transport, (t) => t === 'get-comments')).toBe(before);
  });

  test('clears comment state when the panel switches issues', async () => {
    const { panel, mount, push } = seedCommentPanel(commentIssue, one_comment);
    await Promise.resolve();
    await Promise.resolve();
    expect(mount.textContent).toContain('사람 댓글');

    push({ ...commentIssue, id: 'UI-2', comment_count: 0 });
    panel.load('UI-2');

    expect(mount.textContent).not.toContain('사람 댓글');
  });
});
