import { describe, expect, test, vi } from 'vitest';
import { createWorkerDetailView } from './worker-detail.js';

describe('views/worker-detail', () => {
  test('renders summary, spec panel, selected PRs, and workspace PR summary', async () => {
    document.body.innerHTML = '<div id="mount"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const fetch_impl = vi.fn(async (url, init) => {
      const href = String(url);
      if (href.includes('/api/worker/spec/')) {
        return {
          ok: true,
          json: async () => ({ content: '# Worker spec' })
        };
      }
      if (href.includes('/api/worker/prs/UI-62lm')) {
        return {
          ok: true,
          json: async () => ({
            items: [{ number: 42, title: 'Add Worker tab', state: 'OPEN' }]
          })
        };
      }
      if (href.includes('/api/worker/prs?workspace=')) {
        return {
          ok: true,
          json: async () => ({
            items: [{ number: 7, title: 'Workspace PR', state: 'OPEN' }]
          })
        };
      }
      if (init && /** @type {RequestInit} */ (init).method === 'POST') {
        return {
          ok: true,
          json: async () => ({ ok: true })
        };
      }
      throw new Error(`Unhandled fetch: ${href}`);
    });

    const detail = createWorkerDetailView(mount, {
      fetch_impl
    });

    await detail.load(
      {
        id: 'UI-62lm',
        title: 'Worker 탭 추가',
        status: 'in_progress'
      },
      '/workspace',
      [{ status: 'running', issueId: 'UI-62lm', command: 'bd-ralph-v2' }]
    );

    expect(mount.textContent).toContain('UI-62lm');
    expect(mount.textContent).toContain('# Worker spec');
    expect(mount.textContent).toContain('Add Worker tab');
    expect(mount.textContent).toContain('Workspace PR');
    expect(mount.textContent).toContain('running');
  });
});
