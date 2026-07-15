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
