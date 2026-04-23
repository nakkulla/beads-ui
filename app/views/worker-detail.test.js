import { readFileSync } from 'node:fs';
import { describe, expect, test, vi } from 'vitest';
import { createWorkerDetailView } from './worker-detail.js';

describe('views/worker-detail', () => {
  test('renders current job, recent jobs, log preview, and cancel action', async () => {
    document.body.innerHTML = '<div id="mount"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const onCancelJob = vi.fn();
    const fetch_impl = vi.fn(async (url) => {
      const href = String(url);
      if (href.includes('/api/worker/spec/')) {
        return { ok: true, json: async () => ({ content: '# Worker spec' }) };
      }
      if (href.includes('/api/worker/prs/UI-62lm')) {
        return { ok: true, json: async () => ({ items: [{ number: 42, title: 'Add Worker tab', state: 'OPEN' }] }) };
      }
      if (href.includes('/api/worker/prs?workspace=')) {
        return { ok: true, json: async () => ({ items: [{ number: 7, title: 'Workspace PR', state: 'OPEN' }] }) };
      }
      if (href.includes('/api/worker/jobs/job-2/log')) {
        return { ok: true, json: async () => ({ path: '.bdui/worker-jobs/logs/job-2.log', tail: ['line 1', 'line 2'], truncated: false }) };
      }
      throw new Error(`Unhandled fetch: ${href}`);
    });

    const detail = createWorkerDetailView(mount, { fetch_impl, onCancelJob });

    await detail.load({ id: 'UI-62lm', title: 'Worker 탭 추가', status: 'in_progress' }, '/workspace', [
      { id: 'job-2', status: 'running', issueId: 'UI-62lm', command: 'bd-ralph', elapsedMs: 65000, isCancellable: true, workspace: '/workspace', wasForceKilled: true },
      { id: 'job-1', status: 'failed', issueId: 'UI-62lm', command: 'bd-ralph', elapsedMs: 5000, errorSummary: 'boom', workspace: '/workspace' }
    ]);

    expect(mount.textContent).toContain('Current job');
    expect(mount.textContent).toContain('Recent jobs');
    expect(mount.textContent).toContain('line 1');
    expect(mount.textContent).toContain('1m 5s');
    expect(mount.textContent).toContain('boom');
    expect(mount.textContent).toContain('Force killed');

    const cancel_button = /** @type {HTMLButtonElement} */ (mount.querySelector('[data-cancel-job="job-2"]'));
    cancel_button.click();

    expect(onCancelJob).toHaveBeenCalledWith('job-2');
  });

  test('renders log preview error hint when log endpoint returns non-ok', async () => {
    document.body.innerHTML = '<div id="mount"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const fetch_impl = vi.fn(async (url) => {
      const href = String(url);
      if (href.includes('/api/worker/spec/')) {
        return { ok: true, json: async () => ({ content: '# Worker spec' }) };
      }
      if (href.includes('/api/worker/prs/')) {
        return { ok: true, json: async () => ({ items: [] }) };
      }
      if (href.includes('/api/worker/jobs/job-2/log')) {
        return { ok: false, json: async () => ({ error: 'no log' }) };
      }
      return { ok: true, json: async () => ({ items: [] }) };
    });

    const detail = createWorkerDetailView(mount, { fetch_impl });
    await detail.load({ id: 'UI-62lm', title: 'Worker 탭 추가', status: 'in_progress' }, '/workspace', [
      { id: 'job-2', status: 'running', issueId: 'UI-62lm', command: 'bd-ralph', elapsedMs: 65000, isCancellable: true, workspace: '/workspace' }
    ]);

    expect(mount.textContent).toContain('Failed to load log preview.');
  });

  test('defines worker detail scroll owner styles', () => {
    const stylesheet = readFileSync('app/styles.css', 'utf8');

    expect(stylesheet).toContain('#worker-detail-mount');
    expect(stylesheet).toContain('.worker-detail');
    expect(stylesheet).toContain('overflow-y: auto;');
  });

});
