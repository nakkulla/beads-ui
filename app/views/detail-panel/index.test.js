import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createSessionLogStore } from '../../data/session-log-store.js';
import { createSubscriptionIssueStores } from '../../data/subscription-issue-stores.js';
import { createWorkerQueueStore } from '../../data/worker-queue-store.js';
import { createDetailPanel } from './index.js';

describe('views/detail-panel', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  afterEach(() => {
    vi.unstubAllGlobals();
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

  test('loads each account catalog once per open issue and refreshes after reopen', async () => {
    const fetchMock = vi.fn((/** @type {string} */ url) =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({ available: false, accounts: [], endpoint: url })
      })
    );
    vi.stubGlobal('fetch', fetchMock);
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const panel = createDetailPanel(mount, { onClose: vi.fn() });

    panel.load('UI-accounts');
    panel.load('UI-accounts');
    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    panel.clear();
    panel.load('UI-accounts');
    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(4));

    expect(fetchMock.mock.calls.map((call) => call[0])).toEqual([
      '/api/claude-usage',
      '/api/codex-usage',
      '/api/claude-usage',
      '/api/codex-usage'
    ]);
    panel.destroy();
  });

  test('sends selected account through update-exec-settings', async () => {
    const fetchMock = vi.fn((url) =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            available: false,
            accounts:
              url === '/api/claude-usage'
                ? [
                    {
                      key: 'claude@example.com',
                      email: 'claude@example.com',
                      active: true,
                      status: 'ok'
                    }
                  ]
                : [
                    {
                      key: 'codex-key',
                      email: 'codex@example.com',
                      plan: 'team',
                      active: true,
                      status: 'ok'
                    }
                  ]
          })
      })
    );
    vi.stubGlobal('fetch', fetchMock);
    const transport = vi.fn((/** @type {string} */ type) =>
      Promise.resolve(type === 'get-session-defaults' ? { values: {} } : [])
    );
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { panel } = seedPanel(
      mount,
      { ...baseIssue, metadata: {} },
      /** @type {any} */ (transport)
    );
    await vi.waitFor(() =>
      expect(
        mount.querySelector(
          'select[data-exec-key="codex_account"] option[value="codex-key"]'
        )
      ).not.toBe(null)
    );
    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('select[data-exec-key="codex_account"]')
    );

    select.value = 'codex-key';
    select.dispatchEvent(new Event('change', { bubbles: true }));

    expect(transport).toHaveBeenCalledWith('update-exec-settings', {
      id: 'UI-1',
      key: 'codex_account',
      value: 'codex-key'
    });
    panel.destroy();
  });

  test('workflow detail separates normalized plan review and approval', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const review = 'codex@' + 'b'.repeat(12);
    const approval = 'user@' + 'a'.repeat(40);
    const { panel } = seedPanel(
      mount,
      {
        ...baseIssue,
        metadata: {
          route: 'full_plan',
          plan_review: review,
          plan_approval: approval
        },
        workflow: {
          route: 'full_plan',
          route_source: 'explicit',
          stages: {
            spec: { stale: false },
            plan: {
              receipt: review,
              approval_receipt: approval,
              approval_state: 'fresh',
              stale: false
            },
            impl: { stale: false }
          }
        }
      },
      vi.fn()
    );

    const rows = Object.fromEntries(
      Array.from(mount.querySelectorAll('.detail-kv')).map((row) => [
        row.querySelector('.detail-kv__k')?.textContent?.trim(),
        row.querySelector('.detail-kv__v')?.textContent?.trim()
      ])
    );
    expect(rows.plan_review).toBe(review);
    expect(rows.plan_approval).toBe(approval);

    panel.destroy();
  });

  test('workflow detail renders a derived route and its empty editor option as unset', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { panel } = seedPanel(
      mount,
      {
        ...baseIssue,
        metadata: {},
        workflow: {
          route: 'spec_backed',
          route_source: 'derived',
          stages: {
            spec: { stale: false },
            impl: { stale: false }
          }
        }
      },
      vi.fn()
    );

    const route_value = /** @type {HTMLElement} */ (
      mount.querySelector('.detail-kv__v--derived')
    );
    const route_select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('select[data-edit="wfmeta-route"]')
    );
    expect(route_value.textContent?.trim()).toBe('unset');
    expect(route_value.title).toBe('route 미핀 (metadata unset)');
    expect(route_select.selectedOptions[0]?.textContent?.trim()).toBe(
      '(unset)'
    );

    panel.destroy();
  });

  test('quick_fix omits absent review rows and offers the route option', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { panel } = seedPanel(
      mount,
      {
        ...baseIssue,
        metadata: { route: 'quick_fix' },
        workflow: {
          route: 'quick_fix',
          route_source: 'explicit',
          stages: {
            impl: { stale: false },
            close: { fill: 'none', stale: false }
          }
        }
      },
      vi.fn()
    );
    const keys = Array.from(mount.querySelectorAll('.detail-kv__k')).map(
      (node) => node.textContent?.trim()
    );
    const route_select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('select[data-edit="wfmeta-route"]')
    );

    expect(keys).not.toContain('spec_review');
    expect(keys).not.toContain('impl_review');
    expect(
      Array.from(route_select.options).map((option) => option.value)
    ).toContain('quick_fix');

    panel.destroy();
  });

  test('quick_fix renders review rows when metadata carries them', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { panel } = seedPanel(
      mount,
      {
        ...baseIssue,
        metadata: {
          route: 'quick_fix',
          spec_review: 'codex@' + 'a'.repeat(40),
          impl_review: 'self@' + 'b'.repeat(40)
        },
        workflow: {
          route: 'quick_fix',
          route_source: 'explicit',
          stages: {
            spec: { stale: false },
            impl: { stale: false },
            close: { fill: 'none', stale: false }
          }
        }
      },
      vi.fn()
    );
    const keys = Array.from(mount.querySelectorAll('.detail-kv__k')).map(
      (node) => node.textContent?.trim()
    );

    expect(keys).toContain('spec_review');
    expect(keys).toContain('impl_review');

    panel.destroy();
  });

  test('renders parsed planned and actual execution metadata rows', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { panel } = seedPanel(
      mount,
      {
        ...baseIssue,
        metadata: {
          route: 'spec_backed',
          exec_receipt: 'malformed',
          impl_entry: 'malformed'
        },
        workflow: {
          route: 'spec_backed',
          route_source: 'explicit',
          stages: { spec: {}, impl: {} },
          planned_execution: {
            kind: 'main',
            reason: '직접 통합 필요'
          },
          exec_receipt: {
            kind: 'delegated',
            actor: 'gpt-5.6-sol',
            effort: 'xhigh',
            sha: 'a'.repeat(40)
          },
          impl_entry: { actor: 'user', sha: 'b'.repeat(40) }
        }
      },
      vi.fn()
    );
    const rows = Array.from(mount.querySelectorAll('.detail-kv')).map(
      (row) => ({
        key: row.querySelector('.detail-kv__k')?.textContent?.trim(),
        value: row.querySelector('.detail-kv__v')?.textContent?.trim()
      })
    );

    expect(rows).toContainEqual({
      key: 'planned_execution',
      value: 'main'
    });
    expect(rows).toContainEqual({
      key: 'planned_execution_reason',
      value: '직접 통합 필요'
    });
    expect(rows).toContainEqual({
      key: 'exec_receipt',
      value: `delegated:gpt-5.6-sol:xhigh@${'a'.repeat(40)}`
    });
    expect(rows).toContainEqual({
      key: 'impl_entry',
      value: `user@${'b'.repeat(40)}`
    });
    panel.destroy();

    document.body.innerHTML = '<div id="m"></div>';
    const quiet_mount = /** @type {HTMLElement} */ (
      document.getElementById('m')
    );
    const { panel: quiet_panel } = seedPanel(
      quiet_mount,
      {
        ...baseIssue,
        metadata: { route: 'spec_backed' },
        workflow: {
          route: 'spec_backed',
          route_source: 'explicit',
          stages: { spec: {}, impl: {} },
          planned_execution: null,
          exec_receipt: null,
          impl_entry: null
        }
      },
      vi.fn()
    );
    const quiet_keys = Array.from(
      quiet_mount.querySelectorAll('.detail-kv__k')
    ).map((node) => node.textContent?.trim());
    expect(quiet_keys).not.toContain('planned_execution');
    expect(quiet_keys).not.toContain('planned_execution_reason');
    expect(quiet_keys).not.toContain('exec_receipt');
    expect(quiet_keys).not.toContain('impl_entry');
    quiet_panel.destroy();
  });

  test('renders the conflict-resolution row beside a resolver impl_review', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const prior = 'd'.repeat(40);
    const result = 'e'.repeat(40);
    const { panel } = seedPanel(
      mount,
      {
        ...baseIssue,
        metadata: {
          route: 'spec_backed',
          impl_review: `resolver-self:UI-1-1787-1:${prior}@${result}`
        },
        workflow: {
          route: 'spec_backed',
          route_source: 'explicit',
          stages: { spec: {}, impl: {} },
          resolver: { attempt: 'UI-1-1787-1', prior_sha: prior, sha: result }
        }
      },
      vi.fn()
    );

    const rows = Array.from(mount.querySelectorAll('.detail-kv')).map(
      (row) => ({
        key: row.querySelector('.detail-kv__k')?.textContent?.trim(),
        value: row.querySelector('.detail-kv__v')?.textContent?.trim()
      })
    );
    expect(rows).toContainEqual({
      key: '↳ 충돌 해소',
      value: 'ddddddd → eeeeeee'
    });
    panel.destroy();
  });

  test('omits the conflict-resolution row for an ordinary impl_review', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { panel } = seedPanel(
      mount,
      {
        ...baseIssue,
        metadata: {
          route: 'spec_backed',
          impl_review: `codex@${'a'.repeat(40)}`
        },
        workflow: {
          route: 'spec_backed',
          route_source: 'explicit',
          stages: { spec: {}, impl: {} },
          resolver: null
        }
      },
      vi.fn()
    );

    const keys = Array.from(mount.querySelectorAll('.detail-kv__k')).map(
      (node) => node.textContent?.trim()
    );
    expect(keys).not.toContain('↳ 충돌 해소');
    panel.destroy();
  });

  test('omits the planned reason row for delegated execution', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { panel } = seedPanel(
      mount,
      {
        ...baseIssue,
        metadata: { route: 'spec_backed' },
        workflow: {
          route: 'spec_backed',
          route_source: 'explicit',
          stages: { spec: {}, impl: {} },
          planned_execution: { kind: 'delegated', reason: null }
        }
      },
      vi.fn()
    );

    const keys = Array.from(mount.querySelectorAll('.detail-kv__k')).map(
      (node) => node.textContent?.trim()
    );

    expect(keys).toContain('planned_execution');
    expect(keys).not.toContain('planned_execution_reason');
    panel.destroy();
  });

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

    // Opening an issue fetches its comments (UI-ucq6 §변경 3), the workspace
    // session defaults (spec §E), and the repo account defaults (UI-d3cb §6.2),
    // so the claim is that cancel sent no MUTATION — not that the panel stayed
    // silent.
    expect(
      transport.mock.calls.filter(
        (c) =>
          c[0] !== 'get-comments' &&
          c[0] !== 'get-session-defaults' &&
          c[0] !== 'get-workspace-accounts'
      )
    ).toEqual([]);
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

  test('projects explicit or observed effort only for session history', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      /** @type {any} */ ({
        revision: 1,
        auto_advance: false,
        queue: [],
        done: [],
        attempts: {
          observed: {
            attempt_id: 'observed',
            bead_id: 'UI-1',
            status: 'done',
            runner: 'claude',
            model: 'opus',
            observed_effort: 'high',
            started_at: 3000
          },
          explicit: {
            attempt_id: 'explicit',
            bead_id: 'UI-1',
            status: 'done',
            runner: 'claude',
            model: 'opus',
            effort: 'low',
            observed_effort: 'high',
            started_at: 2000
          },
          legacy: {
            attempt_id: 'legacy',
            bead_id: 'UI-1',
            status: 'done',
            runner: 'claude',
            model: 'opus',
            started_at: 1000
          }
        }
      })
    );
    const panel = createDetailPanel(mount, { queueStore, onClose: vi.fn() });

    panel.load('UI-1');

    expect(
      mount.querySelector(
        '.detail-session[data-attempt-id="observed"] .detail-session__meta'
      )?.textContent
    ).toBe('claude · opus · high');
    expect(
      mount.querySelector(
        '.detail-session[data-attempt-id="explicit"] .detail-session__meta'
      )?.textContent
    ).toBe('claude · opus · low');
    expect(
      mount.querySelector(
        '.detail-session[data-attempt-id="legacy"] .detail-session__meta'
      )?.textContent
    ).toBe('claude · opus');

    panel.destroy();
  });

  test('passes delegation effort into the transcript drawer', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      /** @type {any} */ ({
        revision: 1,
        auto_advance: false,
        queue: [],
        done: [],
        attempts: {
          outer: {
            attempt_id: 'outer',
            bead_id: 'UI-1',
            status: 'done',
            delegation_sessions: [
              {
                launch_id: 'launch-1',
                provider: 'codex',
                role: 'implementation',
                model: 'gpt-5.6-sol',
                effort: 'high',
                session_id: 'thread-1',
                turn_id: 'turn-1',
                status: 'done',
                started_at: 100,
                completed_at: '2026-08-18T04:27:00.000Z',
                last_event_at: 200
              }
            ]
          }
        }
      })
    );
    const panel = createDetailPanel(mount, { queueStore, onClose: vi.fn() });
    panel.load('UI-1');

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.detail-session__leg')
    ).click();

    expect(
      document.querySelector('.session-log-root .sv__meta')?.textContent
    ).toBe('gpt-5.6-sol · high');
    panel.destroy();
  });

  test('shows provider usage badges in the issue heading', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      /** @type {any} */ ({
        revision: 1,
        auto_advance: false,
        queue: [],
        done: [],
        attempts: {
          claude: {
            attempt_id: 'claude',
            bead_id: 'UI-1',
            status: 'done',
            runner: 'claude',
            usage: { input_tokens: 10, output_tokens: 5 }
          },
          codex: {
            attempt_id: 'codex',
            bead_id: 'UI-1',
            status: 'done',
            runner: 'codex',
            usage: { input_tokens: 4, output_tokens: 2 }
          }
        }
      })
    );
    const panel = createDetailPanel(mount, { queueStore, onClose: vi.fn() });
    panel.load('UI-1');

    const badges = Array.from(
      mount.querySelectorAll('.detail-title-row .detail-usage-total')
    ).map((badge) => badge.textContent?.trim());

    expect(badges).toEqual(['Claude τ 15', 'Codex τ 6']);

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

  test('session-history: only the newest eligible leaf gets an active ↻ 이어하기; ancestor/pre-session-id disabled; ↻ badge on resume attempts (§1)', async () => {
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
    transport.mockClear();
    resumeBtn('kid').dispatchEvent(new MouseEvent('click', { bubbles: true }));
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.resume-instructions-dialog button')
    ).click();
    await vi.waitFor(() => expect(transport).toHaveBeenCalledTimes(1));
    expect(transport).toHaveBeenCalledWith('worker-attempt-resume', {
      attempt_id: 'kid',
      expected_revision: 1
    });

    panel.destroy();
  });

  test('session-history preserves instructions through initial, conflict, and continuation sends', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    const attempt = {
      attempt_id: 'kid',
      bead_id: 'UI-1',
      status: 'failed',
      session_id: 'sid-kid',
      started_at: 3000
    };
    queueStore.set(
      /** @type {any} */ ({
        revision: 1,
        auto_advance: false,
        queue: [],
        done: [],
        attempts: { kid: attempt }
      })
    );
    const decision_token = { source_attempt_id: 'kid', digest: 'one' };
    const transport = vi.fn().mockResolvedValue({});
    const panel = createDetailPanel(mount, {
      queueStore,
      transport,
      onClose: vi.fn()
    });
    panel.load('UI-1');
    transport
      .mockReset()
      .mockResolvedValueOnce({
        resumed: false,
        conflict: true,
        queue: {
          revision: 7,
          auto_advance: false,
          queue: [],
          done: [],
          attempts: { kid: attempt }
        }
      })
      .mockResolvedValueOnce({
        resumed: false,
        conflict: false,
        reason: 'runner_mismatch',
        continuation_mismatch: {
          prior_available: true,
          prior: { runner: 'codex', model: 'sol' },
          current: { runner: 'claude', model: 'opus' },
          decision_token
        }
      })
      .mockResolvedValueOnce({ resumed: true, conflict: false });

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.detail-session__resume[data-attempt-id="kid"]')
    ).click();
    const textarea = /** @type {HTMLTextAreaElement} */ (
      document.querySelector('.resume-instructions-dialog textarea')
    );
    textarea.value = '  테스트부터 실행  ';
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.resume-instructions-dialog button')
    ).click();
    await vi.waitFor(() => expect(transport).toHaveBeenCalledTimes(2));
    /** @type {HTMLButtonElement} */ (
      document.querySelectorAll('.continuation-dialog button')[1]
    ).click();
    await vi.waitFor(() => expect(transport).toHaveBeenCalledTimes(3));

    expect(transport.mock.calls).toEqual([
      [
        'worker-attempt-resume',
        {
          attempt_id: 'kid',
          expected_revision: 1,
          instructions: '테스트부터 실행'
        }
      ],
      [
        'worker-attempt-resume',
        {
          attempt_id: 'kid',
          expected_revision: 7,
          instructions: '테스트부터 실행'
        }
      ],
      [
        'worker-attempt-resume',
        {
          attempt_id: 'kid',
          expected_revision: 7,
          instructions: '테스트부터 실행',
          continuation: 'fresh_current',
          decision_token
        }
      ]
    ]);
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

describe('views/detail-panel comment compose (UI-ucq6 §변경 2/3)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  const composeIssue = {
    id: 'UI-1',
    title: '댓글 이슈',
    status: 'open',
    priority: 2,
    description: '설명',
    comment_count: 1
  };

  const existing = [
    {
      id: 'c1',
      author: 'ilsun yun',
      text: '먼저 있던 댓글',
      created_at: '2026-08-03T17:20:00Z'
    }
  ];

  const after_add = [
    ...existing,
    {
      id: 'c2',
      author: 'ilsun yun',
      text: '새로 쓴 댓글',
      created_at: '2026-08-04T09:00:00Z'
    }
  ];

  /**
   * @param {(type: string, payload: unknown) => Promise<unknown>} transport
   */
  function mountComposePanel(transport) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const issueStores = createSubscriptionIssueStores();
    const panel = createDetailPanel(mount, {
      issueStores,
      transport,
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
      issues: /** @type {any} */ ([composeIssue])
    });
    panel.load('UI-1');
    return { mount, panel };
  }

  test('submitting sends add-comment and swaps in the reply payload', async () => {
    const transport = vi.fn((/** @type {string} */ type) =>
      Promise.resolve(type === 'get-comments' ? existing : after_add)
    );
    const { mount } = mountComposePanel(/** @type {any} */ (transport));
    await Promise.resolve();
    await Promise.resolve();

    const box = /** @type {HTMLTextAreaElement} */ (
      mount.querySelector('.detail-comment-compose__input')
    );
    box.value = '새로 쓴 댓글';
    box.dispatchEvent(new Event('input', { bubbles: true }));
    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.detail-comment-compose__btn')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(transport).toHaveBeenCalledWith('add-comment', {
      id: 'UI-1',
      text: '새로 쓴 댓글'
    });
    await Promise.resolve();
    await Promise.resolve();
    expect(mount.textContent).toContain('새로 쓴 댓글');
    // The reply payload IS the refresh — no second get-comments.
    expect(
      transport.mock.calls.filter((c) => c[0] === 'get-comments').length
    ).toBe(1);
  });

  test('clears the draft after a successful submission', async () => {
    const transport = vi.fn((/** @type {string} */ type) =>
      Promise.resolve(type === 'get-comments' ? existing : after_add)
    );
    const { mount } = mountComposePanel(/** @type {any} */ (transport));
    await Promise.resolve();
    await Promise.resolve();

    const box = /** @type {HTMLTextAreaElement} */ (
      mount.querySelector('.detail-comment-compose__input')
    );
    box.value = '새로 쓴 댓글';
    box.dispatchEvent(new Event('input', { bubbles: true }));
    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.detail-comment-compose__btn')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(
      /** @type {HTMLTextAreaElement} */ (
        mount.querySelector('.detail-comment-compose__input')
      ).value
    ).toBe('');
  });

  test('keeps the draft and the old list when the submission fails', async () => {
    const transport = vi.fn((/** @type {string} */ type) =>
      type === 'get-comments' ? Promise.resolve(existing) : Promise.resolve([])
    );
    const { mount } = mountComposePanel(/** @type {any} */ (transport));
    await Promise.resolve();
    await Promise.resolve();

    const box = /** @type {HTMLTextAreaElement} */ (
      mount.querySelector('.detail-comment-compose__input')
    );
    box.value = '실패할 댓글';
    box.dispatchEvent(new Event('input', { bubbles: true }));
    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.detail-comment-compose__btn')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(
      /** @type {HTMLTextAreaElement} */ (
        mount.querySelector('.detail-comment-compose__input')
      ).value
    ).toBe('실패할 댓글');
    expect(mount.textContent).toContain('먼저 있던 댓글');
  });

  test('shows the load failure line when get-comments rejects', async () => {
    const transport = vi.fn((/** @type {string} */ type) =>
      type === 'get-comments'
        ? Promise.reject(new Error('bd failed'))
        : Promise.resolve(composeIssue)
    );
    const { mount } = mountComposePanel(/** @type {any} */ (transport));

    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(mount.querySelector('[data-seam="comments-error"]')).not.toBe(null);
    expect(mount.querySelector('.detail-comment-compose')).not.toBe(null);
  });
});

describe('views/detail-panel shared md viewer (UI-ajkn §4)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  /**
   * @returns {any}
   */
  function fakeViewer() {
    return { open: vi.fn(), close: vi.fn(), destroy: vi.fn() };
  }

  test('mounts its own md-viewer-root when no viewer is injected', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    const panel = createDetailPanel(mount, { onClose: vi.fn() });

    expect(document.querySelectorAll('.md-viewer-root').length).toBe(1);
    panel.destroy();
    expect(document.querySelectorAll('.md-viewer-root').length).toBe(0);
  });

  test('mounts no md-viewer-root of its own when one is injected', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    createDetailPanel(mount, { onClose: vi.fn(), mdViewer: fakeViewer() });

    expect(document.querySelectorAll('.md-viewer-root').length).toBe(0);
  });

  test('closes the injected viewer on clear', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const md_viewer = fakeViewer();
    const panel = createDetailPanel(mount, {
      onClose: vi.fn(),
      mdViewer: md_viewer
    });

    panel.clear();

    expect(md_viewer.close).toHaveBeenCalledTimes(1);
  });

  test('never destroys the injected viewer', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const md_viewer = fakeViewer();
    const panel = createDetailPanel(mount, {
      onClose: vi.fn(),
      mdViewer: md_viewer
    });

    panel.destroy();

    expect(md_viewer.destroy).not.toHaveBeenCalled();
  });
});
