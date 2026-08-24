import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createMdViewer } from './md-viewer.js';

/**
 * @param {number} [ms]
 * @returns {Promise<void>}
 */
function tick(ms = 0) {
  return new Promise((r) => setTimeout(r, ms));
}

describe('views/detail-panel/md-viewer', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="mv"></div>';
  });

  test('fetches /api/doc without auth headers and renders the markdown', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('mv'));
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        ok: true,
        path: 'docs/spec.md',
        content: '# 제목\n\n본문 `code` 텍스트'
      })
    });
    const viewer = createMdViewer(mount, {
      getWorkspacePath: () => '/ws/abs',
      fetchImpl: /** @type {any} */ (fetchImpl)
    });

    await viewer.open('docs/spec.md');
    await tick();

    // Called the doc endpoint with workspace + path and no auth header (spec §8).
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toContain('/api/doc?workspace=');
    expect(url).toContain(encodeURIComponent('/ws/abs'));
    expect(url).toContain('path=' + encodeURIComponent('docs/spec.md'));
    expect(init).toBeUndefined();

    // Rendered markdown (h1 + inline code).
    expect(mount.querySelector('.mv')).not.toBeNull();
    expect(mount.querySelector('.mv__body h1')?.textContent).toContain('제목');
    expect(mount.querySelector('.mv__body code')?.textContent).toContain(
      'code'
    );
    // Compact path label strips the docs/ prefix.
    expect(mount.querySelector('.mv__path')?.textContent?.trim()).toBe(
      'spec.md'
    );
  });

  test('shows an error state when the server rejects', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('mv'));
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      json: async () => ({ ok: false, error: 'forbidden' })
    });
    const viewer = createMdViewer(mount, {
      getWorkspacePath: () => '/ws/abs',
      fetchImpl: /** @type {any} */ (fetchImpl)
    });
    await viewer.open('docs/x.md');
    await tick();
    expect(mount.querySelector('.mv__status--error')).not.toBeNull();
  });

  test('shows a reserved missing plan as authoring pending', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('mv'));
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({ ok: false, error: 'not_found' })
    });
    const viewer = createMdViewer(mount, {
      getWorkspacePath: () => '/ws/abs',
      fetchImpl: /** @type {any} */ (fetchImpl)
    });

    await viewer.open('docs/plans/x.md', {
      missing_state: 'plan_pending'
    });
    await tick();

    expect(mount.textContent).toContain('계획 작성 전');
    expect(mount.querySelector('.mv__status--error')).toBeNull();
  });

  test('keeps a forbidden reserved plan as an error', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('mv'));
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      json: async () => ({ ok: false, error: 'forbidden' })
    });
    const viewer = createMdViewer(mount, {
      getWorkspacePath: () => '/ws/abs',
      fetchImpl: /** @type {any} */ (fetchImpl)
    });

    await viewer.open('docs/plans/x.md', {
      missing_state: 'plan_pending'
    });
    await tick();

    expect(mount.querySelector('.mv__status--error')).not.toBeNull();
  });

  test('close() clears the overlay', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('mv'));
    const viewer = createMdViewer(mount, {
      getWorkspacePath: () => '/ws/abs',
      fetchImpl: /** @type {any} */ (
        vi.fn().mockResolvedValue({
          ok: true,
          json: async () => ({ ok: true, content: '# a' })
        })
      )
    });
    await viewer.open('docs/x.md');
    await tick();
    expect(mount.querySelector('.mv')).not.toBeNull();
    viewer.close();
    expect(mount.querySelector('.mv')).toBeNull();
  });

  test('reads from the workspace given to open, not the current one', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('mv'));
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, path: 'docs/spec.md', content: '# x' })
    });
    const viewer = createMdViewer(mount, {
      getWorkspacePath: () => '/ws/current',
      fetchImpl: /** @type {any} */ (fetchImpl)
    });

    await viewer.open('docs/spec.md', { workspace: '/ws/other' });
    await tick();

    const [url] = fetchImpl.mock.calls[0];
    expect(url).toContain(
      '/api/doc?workspace=' + encodeURIComponent('/ws/other')
    );
    expect(url).not.toContain(encodeURIComponent('/ws/current'));
  });
});

describe('splitFrontmatter', () => {
  test('separates leading yaml block from body', async () => {
    const { splitFrontmatter } = await import('./md-viewer.js');

    const result = splitFrontmatter('---\nscope: x\n---\n# 제목\n본문');

    expect(result).toEqual({ front: 'scope: x', body: '# 제목\n본문' });
  });

  test('returns body unchanged without frontmatter', async () => {
    const { splitFrontmatter } = await import('./md-viewer.js');

    const result = splitFrontmatter('# 제목\n---\n본문');

    expect(result).toEqual({ front: null, body: '# 제목\n---\n본문' });
  });
});
