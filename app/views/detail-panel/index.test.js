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

  /**
   * Seed one workflow-detail issue and read its `detail-kv` rows back as a map.
   *
   * @param {HTMLElement} mount
   * @param {any} metadata
   * @param {any} workflow
   */
  function seedWorkflowRows(mount, metadata, workflow) {
    const { panel } = seedPanel(
      mount,
      { ...baseIssue, metadata, workflow },
      vi.fn()
    );
    const rows = Object.fromEntries(
      Array.from(mount.querySelectorAll('.detail-kv')).map((row) => [
        row.querySelector('.detail-kv__k')?.textContent?.trim(),
        row.querySelector('.detail-kv__v')?.textContent?.trim()
      ])
    );
    panel.destroy();
    return rows;
  }

  const QUICK_FIX_STAGES = {
    impl: { stale: false },
    close: { fill: 'none', stale: false }
  };

  test('renders the quick_fix_review row on a quick_fix route', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const receipt = 'self@' + '3f9a21c4b0e7';

    const rows = seedWorkflowRows(
      mount,
      { route: 'quick_fix', quick_fix_review: receipt },
      {
        route: 'quick_fix',
        route_source: 'explicit',
        stages: QUICK_FIX_STAGES,
        quick_fix_review: {
          state: 'reviewed',
          missing: [],
          digest: '3f9a21c4b0e7'
        }
      }
    );

    expect(rows.quick_fix_review).toBe(receipt);
  });

  test('renders the quick_fix_review row on another route carrying the key', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const receipt = 'self@' + 'a1b2c3d4e5f6';

    const rows = seedWorkflowRows(
      mount,
      { route: 'spec_backed', quick_fix_review: receipt },
      {
        route: 'spec_backed',
        route_source: 'explicit',
        stages: { spec: { stale: false }, impl: { stale: false } }
      }
    );

    expect(rows.quick_fix_review).toBe(receipt);
  });

  test('omits the quick_fix_review row on another route without the key', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    const rows = seedWorkflowRows(
      mount,
      { route: 'spec_backed' },
      {
        route: 'spec_backed',
        route_source: 'explicit',
        stages: { spec: { stale: false }, impl: { stale: false } }
      }
    );

    expect(Object.hasOwn(rows, 'quick_fix_review')).toBe(false);
  });

  test('says 없음 when the quick_fix route carries no receipt', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    const rows = seedWorkflowRows(
      mount,
      { route: 'quick_fix' },
      {
        route: 'quick_fix',
        route_source: 'explicit',
        stages: QUICK_FIX_STAGES,
        quick_fix_review: { state: 'unreviewed', missing: [], digest: null }
      }
    );

    expect(rows.quick_fix_review).toBe('없음');
  });

  test('suffixes the quick_fix_review row with stale only on a stale judgement', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const receipt = 'self@' + '3f9a21c4b0e7';

    const suffixes = ['reviewed', 'stale', 'unreviewed', 'unknown'].map(
      (state) =>
        seedWorkflowRows(
          mount,
          { route: 'quick_fix', quick_fix_review: receipt },
          {
            route: 'quick_fix',
            route_source: 'explicit',
            stages: QUICK_FIX_STAGES,
            quick_fix_review: { state, missing: [], digest: null }
          }
        ).quick_fix_review
    );

    expect(suffixes).toEqual([receipt, `${receipt} · stale`, receipt, receipt]);
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

  test('renders the 막는 prefix for a blocks edge', () => {
    const mount = mountWithDeps([{ id: 'UI-0', dependency_type: 'blocks' }]);

    expect(depTexts(mount)).toEqual(['⛓ 막는 UI-0 ✕']);
  });

  test('renders a return icon for a discovered-from edge', () => {
    const mount = mountWithDeps([
      { id: 'UI-0', dependency_type: 'discovered-from' }
    ]);

    expect(depTexts(mount)).toEqual(['↩ 발견 UI-0']);
  });

  test('renders the bare type and id for an unknown edge type', () => {
    const mount = mountWithDeps([{ id: 'UI-0', dependency_type: 'mystery' }]);

    expect(depTexts(mount)).toEqual(['mystery UI-0']);
  });

  test('renders the bare id for a plain string edge', () => {
    const mount = mountWithDeps(['UI-0']);

    expect(depTexts(mount)).toEqual(['UI-0']);
  });

  test('renders the 막는 group before the 나머지 group', () => {
    const mount = mountWithDeps([
      { id: 'UI-9', dependency_type: 'parent-child' },
      { id: 'UI-0', dependency_type: 'blocks' }
    ]);

    expect(depTexts(mount)).toEqual(['⛓ 막는 UI-0 ✕', '⌸ 상위 UI-9']);
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

describe('views/detail-panel session_ref rows (UI-4xzk §6.5)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  const VIEW = {
    index: 0,
    provider: 'claude',
    session_id: 'a1b2c3d4-5e6f',
    host: 'mac-studio',
    current: true,
    locality: 'local',
    last_event_at: 1_700_000_000_000,
    resume_command: "claude --resume 'a1b2c3d4-5e6f'"
  };

  /**
   * Panel over a detail store whose transport answers `get-session-refs` from a
   * queue the test controls, so a late reply can be released on demand.
   *
   * @param {any} issue
   * @param {(payload: any) => Promise<any>} onSessionRefs
   * @param {string} [workspace]
   */
  function seedSessionPanel(issue, onSessionRefs, workspace = '/tmp/repo-a') {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    let workspace_path = workspace;
    const transport = vi.fn((/** @type {string} */ type, payload) =>
      type === 'get-session-refs'
        ? onSessionRefs(payload)
        : Promise.resolve(type === 'get-comments' ? [] : issue)
    );
    const issueStores = createSubscriptionIssueStores();
    const panel = createDetailPanel(mount, {
      issueStores,
      transport: /** @type {any} */ (transport),
      getWorkspacePath: () => workspace_path,
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
    return {
      mount,
      panel,
      transport,
      push,
      setWorkspace: (/** @type {string} */ next) => {
        workspace_path = next;
      }
    };
  }

  /** @param {any} transport */
  const sessionCalls = (transport) =>
    transport.mock.calls.filter(
      (/** @type {any[]} */ c) => c[0] === 'get-session-refs'
    );

  const withKey = {
    id: 'UI-1',
    title: '세션이 잡은 이슈',
    status: 'in_progress',
    priority: 2,
    description: '설명',
    metadata: { session_ref: 'claude:a1b2c3d4-5e6f@mac-studio' }
  };

  test('requests the sessions only for an issue carrying the metadata key', async () => {
    const { transport } = seedSessionPanel({ ...withKey, metadata: {} }, () =>
      Promise.resolve({ bead_id: 'UI-1', sessions: [VIEW] })
    );
    await Promise.resolve();

    expect(sessionCalls(transport)).toHaveLength(0);
  });

  test('draws a session row from the reply', async () => {
    const { mount, transport } = seedSessionPanel(withKey, () =>
      Promise.resolve({ bead_id: 'UI-1', sessions: [VIEW] })
    );
    await Promise.resolve();
    await Promise.resolve();

    expect(sessionCalls(transport)[0][1]).toEqual({ bead_id: 'UI-1' });
    expect(mount.querySelector('.detail-session__id')?.textContent).toBe(
      'claude · a1b2c3d4'
    );
  });

  test('re-requests when the contract value itself changes', async () => {
    const { transport, push } = seedSessionPanel(withKey, () =>
      Promise.resolve({ bead_id: 'UI-1', sessions: [VIEW] })
    );
    await Promise.resolve();
    await Promise.resolve();

    push({
      ...withKey,
      metadata: {
        session_ref: 'claude:a1b2c3d4-5e6f@mac-studio; codex:zz-9@mac-studio'
      }
    });
    await Promise.resolve();
    await Promise.resolve();

    expect(sessionCalls(transport)).toHaveLength(2);
  });

  test('does not re-request while the value is unchanged', async () => {
    const { transport, push } = seedSessionPanel(withKey, () =>
      Promise.resolve({ bead_id: 'UI-1', sessions: [VIEW] })
    );
    await Promise.resolve();
    await Promise.resolve();

    push({ ...withKey, title: '제목만 바뀜' });
    await Promise.resolve();

    expect(sessionCalls(transport)).toHaveLength(1);
  });

  test('drops the previous workspace rows when the same bead id is reopened elsewhere', async () => {
    /** @type {Array<(value: any) => void>} */
    const pending = [];
    const { mount, push, setWorkspace } = seedSessionPanel(
      withKey,
      () => new Promise((resolve) => pending.push(resolve))
    );
    await Promise.resolve();
    pending[0]({ bead_id: 'UI-1', sessions: [VIEW] });
    await Promise.resolve();
    await Promise.resolve();
    expect(mount.querySelector('.detail-session__id')).not.toBeNull();

    setWorkspace('/tmp/repo-b');
    push({ ...withKey, title: '다른 저장소의 같은 id' });
    await Promise.resolve();

    expect(mount.querySelector('.detail-session__id')).toBeNull();
  });

  test('discards a reply that arrives after the request generation moved on', async () => {
    /** @type {Array<(value: any) => void>} */
    const pending = [];
    const { mount, push } = seedSessionPanel(
      withKey,
      () => new Promise((resolve) => pending.push(resolve))
    );
    await Promise.resolve();

    push({
      ...withKey,
      metadata: { session_ref: 'codex:zz-9@mac-studio' }
    });
    await Promise.resolve();
    pending[0]({ bead_id: 'UI-1', sessions: [VIEW] });
    await Promise.resolve();
    await Promise.resolve();

    expect(mount.querySelector('.detail-session__id')).toBeNull();
  });

  test('draws no rows when the read fails', async () => {
    const { mount } = seedSessionPanel(withKey, () =>
      Promise.reject(new Error('bd show failed'))
    );
    await Promise.resolve();
    await Promise.resolve();

    expect(mount.querySelector('.detail-session__id')).toBeNull();
    expect(
      mount.querySelector('[data-seam="session-history"]')?.textContent
    ).toBe('세션 이력 없음');
  });

  test('draws no rows for an empty sessions reply', async () => {
    const { mount } = seedSessionPanel(withKey, () =>
      Promise.resolve({ bead_id: 'UI-1', sessions: [] })
    );
    await Promise.resolve();
    await Promise.resolve();

    expect(mount.querySelector('.detail-session__id')).toBeNull();
  });
});

describe('views/detail-panel 의존성 절 편집기 (UI-lx45 §4)', () => {
  const WS_A = '/tmp/example/repo-a';
  const WS_B = '/tmp/example/repo-b';

  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    for (const el of Array.from(document.querySelectorAll('.toast'))) {
      el.remove();
    }
  });

  /**
   * @param {string} bead_id
   * @param {Partial<{ root_dir: string, workspace_name: string, title: string, lane: string }>} [patch]
   */
  function candIssue(bead_id, patch = {}) {
    return {
      bead_id,
      root_dir: WS_A,
      workspace_name: 'repo-a',
      title: `title ${bead_id}`,
      lane: 'runnable',
      ...patch
    };
  }

  /**
   * Panel over one seeded detail snapshot with the three dependency options.
   *
   * @param {any} issue
   * @param {any} [opts]
   */
  function depPanel(issue, opts = {}) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const issueStores = createSubscriptionIssueStores();
    const panel = createDetailPanel(mount, {
      issueStores,
      transport: opts.transport,
      getWorkspacePath: opts.getWorkspacePath || (() => WS_A),
      depCandidates: opts.depCandidates,
      onDepChanged: opts.onDepChanged,
      subscribeCandidates: opts.subscribeCandidates,
      onNavigate: opts.onNavigate,
      onClose: vi.fn()
    });
    issueStores.register('detail:' + issue.id, {
      type: 'issue-detail',
      params: { id: issue.id }
    });
    issueStores.getStore('detail:' + issue.id)?.applyPush({
      type: 'snapshot',
      id: 'detail:' + issue.id,
      revision: 1,
      issues: /** @type {any} */ ([issue])
    });
    panel.load(issue.id);
    return { mount, panel, issueStores };
  }

  /**
   * The dependency ops one transport spy saw — the panel also fetches comments,
   * session defaults and accounts through the same seam.
   *
   * @param {any} transport
   * @returns {any[][]}
   */
  function depCalls(transport) {
    return transport.mock.calls.filter((/** @type {any[]} */ call) =>
      String(call[0]).startsWith('dep-')
    );
  }

  /**
   * @param {HTMLElement} mount
   * @returns {string[]}
   */
  function chipTexts(mount) {
    return Array.from(mount.querySelectorAll('.detail-dep')).map((el) =>
      String(el.textContent || '')
        .replace(/\s+/g, ' ')
        .trim()
    );
  }

  test('orders the chips 막는 → 막히는 → 나머지 with their prefix', () => {
    const { mount } = depPanel({
      id: 'UI-1',
      title: 't',
      dependencies: [
        { id: 'UI-rel', dependency_type: 'related' },
        { id: 'UI-pred', dependency_type: 'blocks' },
        { id: 'UI-disc', dependency_type: 'discovered-from' }
      ],
      dependents: [{ id: 'UI-succ', dependency_type: 'blocks' }]
    });

    expect(chipTexts(mount)).toEqual([
      '⛓ 막는 UI-pred ✕',
      '⛓ 막히는 UI-succ',
      '관련 UI-rel',
      '↩ 발견 UI-disc'
    ]);
  });

  test('marks each chip kind with its own modifier class', () => {
    const { mount } = depPanel({
      id: 'UI-1',
      title: 't',
      dependencies: [
        { id: 'UI-pred', dependency_type: 'blocks' },
        { id: 'UI-par', dependency_type: 'parent-child' }
      ],
      dependents: [{ id: 'UI-succ', dependency_type: 'blocks' }]
    });

    expect(
      Array.from(mount.querySelectorAll('.detail-dep')).map((el) =>
        el.className.includes('detail-dep--pred')
          ? 'pred'
          : el.className.includes('detail-dep--succ')
            ? 'succ'
            : 'other'
      )
    ).toEqual(['pred', 'succ', 'other']);
  });

  test('renders the unlink button only on a 막는 chip', () => {
    const { mount } = depPanel({
      id: 'UI-1',
      title: 't',
      dependencies: [{ id: 'UI-pred', dependency_type: 'blocks' }],
      dependents: [{ id: 'UI-succ', dependency_type: 'blocks' }]
    });

    expect(
      Array.from(mount.querySelectorAll('.detail-dep__unlink')).map((el) =>
        el.getAttribute('data-dep-b')
      )
    ).toEqual(['UI-pred']);
  });

  test('drops a reverse non-blocks dependent from the chips', () => {
    const { mount } = depPanel({
      id: 'UI-1',
      title: 't',
      dependencies: [],
      dependents: [{ id: 'UI-rel', dependency_type: 'related' }]
    });

    expect(mount.textContent).toContain('의존성 없음');
  });

  test('keeps rendering the 막는 chips when the payload has no dependents', () => {
    const { mount } = depPanel({
      id: 'UI-1',
      title: 't',
      dependencies: [{ id: 'UI-0', dependency_type: 'blocks' }]
    });

    expect(chipTexts(mount)).toEqual(['⛓ 막는 UI-0 ✕']);
  });

  test('sends dep-remove with the current issue as a after a confirm', async () => {
    const transport = vi.fn(async () => ({ id: 'UI-1', title: 't' }));
    vi.stubGlobal(
      'confirm',
      vi.fn(() => true)
    );
    const { mount } = depPanel(
      {
        id: 'UI-1',
        title: 't',
        dependencies: [{ id: 'UI-0', dependency_type: 'blocks' }]
      },
      { transport }
    );

    /** @type {HTMLElement} */ (
      mount.querySelector('.detail-dep__unlink')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();

    expect(globalThis.confirm).toHaveBeenCalledWith(
      'UI-0가 UI-1를 막는 연결을 끊을까요?'
    );
    expect(transport).toHaveBeenCalledWith('dep-remove', {
      a: 'UI-1',
      b: 'UI-0',
      view_id: 'UI-1',
      root_dir: WS_A
    });
  });

  test('sends nothing when the unlink confirm is declined', async () => {
    const transport = vi.fn(async () => ({ id: 'UI-1', title: 't' }));
    vi.stubGlobal(
      'confirm',
      vi.fn(() => false)
    );
    const { mount } = depPanel(
      {
        id: 'UI-1',
        title: 't',
        dependencies: [{ id: 'UI-0', dependency_type: 'blocks' }]
      },
      { transport }
    );

    /** @type {HTMLElement} */ (
      mount.querySelector('.detail-dep__unlink')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();

    expect(depCalls(transport)).toEqual([]);
  });

  test('navigates to a chip with the root_dir the candidate model knows', () => {
    const onNavigate = vi.fn();
    const { mount } = depPanel(
      {
        id: 'UI-1',
        title: 't',
        dependencies: [{ id: 'UI-0', dependency_type: 'blocks' }]
      },
      {
        onNavigate,
        depCandidates: () => ({
          issues: [
            candIssue('UI-0', { root_dir: WS_B, workspace_name: 'repo-b' })
          ],
          blocked_by_map: new Map()
        })
      }
    );

    /** @type {HTMLElement} */ (
      mount.querySelector('.detail-dep__link')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(onNavigate).toHaveBeenCalledWith('UI-0', WS_B);
  });

  test('navigates without a root_dir when the candidate model has no such id', () => {
    const onNavigate = vi.fn();
    const { mount } = depPanel(
      {
        id: 'UI-1',
        title: 't',
        dependencies: [{ id: 'UI-0', dependency_type: 'blocks' }]
      },
      {
        onNavigate,
        depCandidates: () => ({ issues: [], blocked_by_map: new Map() })
      }
    );

    /** @type {HTMLElement} */ (
      mount.querySelector('.detail-dep__link')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(onNavigate).toHaveBeenCalledWith('UI-0');
  });

  test('reports the candidate list is unavailable when the model is null', () => {
    const { mount } = depPanel(
      { id: 'UI-1', title: 't', dependencies: [] },
      { depCandidates: () => null }
    );

    expect(mount.textContent).toContain('후보를 불러올 수 없음');
    expect(mount.querySelector('.detail-dep-add__input')).toBeNull();
  });

  test('opens the candidate list on input focus', () => {
    const { mount } = depPanel(
      { id: 'UI-1', title: 't', dependencies: [] },
      {
        depCandidates: () => ({
          issues: [candIssue('UI-2'), candIssue('UI-3')],
          blocked_by_map: new Map()
        })
      }
    );

    /** @type {HTMLElement} */ (
      mount.querySelector('.detail-dep-add__input')
    ).dispatchEvent(new FocusEvent('focus', { bubbles: true }));

    expect(
      Array.from(mount.querySelectorAll('.detail-dep-add__cand')).map((el) =>
        el.getAttribute('data-dep-cand')
      )
    ).toEqual(['UI-2', 'UI-3']);
  });

  test('narrows the candidate list by the typed query', () => {
    const { mount } = depPanel(
      { id: 'UI-1', title: 't', dependencies: [] },
      {
        depCandidates: () => ({
          issues: [candIssue('UI-2'), candIssue('UI-33')],
          blocked_by_map: new Map()
        })
      }
    );

    const input = /** @type {HTMLInputElement} */ (
      mount.querySelector('.detail-dep-add__input')
    );
    input.value = '33';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    expect(
      Array.from(mount.querySelectorAll('.detail-dep-add__cand')).map((el) =>
        el.getAttribute('data-dep-cand')
      )
    ).toEqual(['UI-33']);
  });

  test('disables a candidate that would close a cycle and names the reason', () => {
    const { mount } = depPanel(
      { id: 'UI-1', title: 't', dependencies: [] },
      {
        depCandidates: () => ({
          issues: [candIssue('UI-2')],
          blocked_by_map: new Map([['UI-2', ['UI-1']]])
        })
      }
    );

    /** @type {HTMLElement} */ (
      mount.querySelector('.detail-dep-add__input')
    ).dispatchEvent(new FocusEvent('focus', { bubbles: true }));

    const cand = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.detail-dep-add__cand')
    );
    expect([cand.disabled, cand.getAttribute('title')]).toEqual([
      true,
      '사이클'
    ]);
  });

  test('reports an empty candidate list', () => {
    const { mount } = depPanel(
      { id: 'UI-1', title: 't', dependencies: [] },
      {
        depCandidates: () => ({ issues: [], blocked_by_map: new Map() })
      }
    );

    /** @type {HTMLElement} */ (
      mount.querySelector('.detail-dep-add__input')
    ).dispatchEvent(new FocusEvent('focus', { bubbles: true }));

    expect(mount.textContent).toContain('후보 없음');
  });

  /**
   * @param {any} opts
   */
  function addPanel(opts) {
    return depPanel(
      { id: 'UI-1', title: 't', dependencies: [] },
      {
        depCandidates: () => ({
          issues: [candIssue('UI-2')],
          blocked_by_map: new Map()
        }),
        ...opts
      }
    );
  }

  test('sends dep-add for a clicked candidate and clears the input', async () => {
    const transport = vi.fn(async () => ({ id: 'UI-1', title: 't' }));
    const onDepChanged = vi.fn();
    const { mount } = addPanel({ transport, onDepChanged });
    const input = /** @type {HTMLInputElement} */ (
      mount.querySelector('.detail-dep-add__input')
    );
    input.value = 'UI-2';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    /** @type {HTMLElement} */ (
      mount.querySelector('.detail-dep-add__cand')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(transport).toHaveBeenCalledWith('dep-add', {
      a: 'UI-1',
      b: 'UI-2',
      view_id: 'UI-1',
      root_dir: WS_A
    });
    expect(onDepChanged).toHaveBeenCalledWith({
      type: 'dep-add',
      a: 'UI-1',
      b: 'UI-2'
    });
    expect(
      /** @type {HTMLInputElement} */ (
        mount.querySelector('.detail-dep-add__input')
      ).value
    ).toBe('');
  });

  test('adds the only matching candidate on Enter', async () => {
    const transport = vi.fn(async () => ({ id: 'UI-1', title: 't' }));
    const { mount } = addPanel({ transport });
    const input = /** @type {HTMLInputElement} */ (
      mount.querySelector('.detail-dep-add__input')
    );
    input.value = 'UI-2';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    /** @type {HTMLElement} */ (
      mount.querySelector('.detail-dep-add__input')
    ).dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    );
    await Promise.resolve();

    expect(transport).toHaveBeenCalledWith('dep-add', {
      a: 'UI-1',
      b: 'UI-2',
      view_id: 'UI-1',
      root_dir: WS_A
    });
  });

  test('ignores Enter while more than one candidate matches', async () => {
    const transport = vi.fn(async () => ({ id: 'UI-1', title: 't' }));
    const { mount } = depPanel(
      { id: 'UI-1', title: 't', dependencies: [] },
      {
        transport,
        depCandidates: () => ({
          issues: [candIssue('UI-2'), candIssue('UI-3')],
          blocked_by_map: new Map()
        })
      }
    );

    /** @type {HTMLElement} */ (
      mount.querySelector('.detail-dep-add__input')
    ).dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    );
    await Promise.resolve();

    expect(depCalls(transport)).toEqual([]);
  });

  test('clears the query and closes the list on Escape', () => {
    const { mount } = addPanel({});
    const input = /** @type {HTMLInputElement} */ (
      mount.querySelector('.detail-dep-add__input')
    );
    input.value = 'UI-2';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    /** @type {HTMLElement} */ (
      mount.querySelector('.detail-dep-add__input')
    ).dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );

    expect(mount.querySelector('.detail-dep-add__list')).toBeNull();
    expect(
      /** @type {HTMLInputElement} */ (
        mount.querySelector('.detail-dep-add__input')
      ).value
    ).toBe('');
  });

  test('calls onDepChanged once when the write lands but the readback fails', async () => {
    const transport = vi.fn(async (/** @type {string} */ type) => {
      if (type !== 'dep-add') {
        return [];
      }
      const err = /** @type {any} */ (new Error('readback'));
      err.code = 'bd_readback_failed';
      throw err;
    });
    const onDepChanged = vi.fn();
    const { mount } = addPanel({ transport, onDepChanged });

    /** @type {HTMLElement} */ (
      mount.querySelector('.detail-dep-add__input')
    ).dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    /** @type {HTMLElement} */ (
      mount.querySelector('.detail-dep-add__cand')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(depCalls(transport)).toHaveLength(1);
    expect(onDepChanged).toHaveBeenCalledTimes(1);
    expect(document.querySelector('.toast')?.textContent).toBe(
      '저장됐으나 확인 실패 — 곧 갱신됩니다'
    );
  });

  test('leaves onDepChanged uncalled when the write itself fails', async () => {
    const transport = vi.fn(async (/** @type {string} */ type) => {
      if (type !== 'dep-add') {
        return [];
      }
      const err = /** @type {any} */ (new Error('nope'));
      err.code = 'bd_error';
      throw err;
    });
    const onDepChanged = vi.fn();
    const { mount } = addPanel({ transport, onDepChanged });

    /** @type {HTMLElement} */ (
      mount.querySelector('.detail-dep-add__input')
    ).dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    /** @type {HTMLElement} */ (
      mount.querySelector('.detail-dep-add__cand')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(onDepChanged).not.toHaveBeenCalled();
    expect(document.querySelector('.toast')?.textContent).toBe(
      '의존 추가 실패'
    );
  });

  test('sends no op and warns when the workspace path is unknown', async () => {
    const transport = vi.fn(async () => ({ id: 'UI-1', title: 't' }));
    const { mount } = addPanel({ transport, getWorkspacePath: () => '' });

    /** @type {HTMLElement} */ (
      mount.querySelector('.detail-dep-add__input')
    ).dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    /** @type {HTMLElement} */ (
      mount.querySelector('.detail-dep-add__cand')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();

    expect(depCalls(transport)).toEqual([]);
    expect(document.querySelector('.toast')?.textContent).toBe(
      '레포를 알 수 없어 의존을 바꿀 수 없습니다'
    );
  });

  test('subscribes the candidate store on load and releases it on clear', () => {
    const unsubscribe = vi.fn();
    const subscribeCandidates = vi.fn(() => unsubscribe);
    const { panel } = addPanel({ subscribeCandidates });

    expect(subscribeCandidates).toHaveBeenCalledTimes(1);

    panel.clear();

    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });

  test('resets the query when another issue is loaded', () => {
    const { mount, panel, issueStores } = addPanel({});
    const input = /** @type {HTMLInputElement} */ (
      mount.querySelector('.detail-dep-add__input')
    );
    input.value = 'UI-2';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    issueStores.register('detail:UI-9', {
      type: 'issue-detail',
      params: { id: 'UI-9' }
    });
    issueStores.getStore('detail:UI-9')?.applyPush({
      type: 'snapshot',
      id: 'detail:UI-9',
      revision: 1,
      issues: /** @type {any} */ ([
        { id: 'UI-9', title: 'other', dependencies: [] }
      ])
    });
    panel.load('UI-9');

    expect(
      /** @type {HTMLInputElement} */ (
        mount.querySelector('.detail-dep-add__input')
      ).value
    ).toBe('');
    expect(mount.querySelector('.detail-dep-add__list')).toBeNull();
  });
});
