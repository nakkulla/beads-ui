import { describe, expect, test, vi } from 'vitest';
import { createWorkerSpecPanel } from './worker-spec-panel.js';

describe('views/worker-spec-panel', () => {
  test('renders read mode after load', async () => {
    document.body.innerHTML = '<div id="mount"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const fetch_impl = vi.fn(async () => ({
      ok: true,
      json: async () => ({
        content: '# Worker spec'
      })
    }));

    const panel = createWorkerSpecPanel(mount, {
      fetch_impl
    });
    await panel.load('UI-62lm', '/workspace');

    expect(mount.textContent).toContain('# Worker spec');
    expect(mount.textContent).toContain('Edit spec');
  });

  test('switches to edit mode and saves content', async () => {
    document.body.innerHTML = '<div id="mount"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const fetch_impl = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ content: '# Worker spec' })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ content: '# Saved spec' })
      });

    const panel = createWorkerSpecPanel(mount, {
      fetch_impl
    });
    await panel.load('UI-62lm', '/workspace');

    const edit_button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-worker-spec-edit]')
    );
    edit_button.click();

    const textarea = /** @type {HTMLTextAreaElement} */ (
      mount.querySelector('textarea')
    );
    textarea.value = '# Saved spec';
    textarea.dispatchEvent(new Event('input', { bubbles: true }));

    const save_button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-worker-spec-save]')
    );
    save_button.click();
    await Promise.resolve();
    await Promise.resolve();

    expect(fetch_impl).toHaveBeenLastCalledWith(
      '/api/worker/spec/UI-62lm?workspace=%2Fworkspace',
      expect.objectContaining({
        method: 'PUT'
      })
    );
    expect(mount.textContent).toContain('# Saved spec');
  });

  test('cancel restores original content', async () => {
    document.body.innerHTML = '<div id="mount"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const fetch_impl = vi.fn(async () => ({
      ok: true,
      json: async () => ({
        content: '# Worker spec'
      })
    }));

    const panel = createWorkerSpecPanel(mount, {
      fetch_impl
    });
    await panel.load('UI-62lm', '/workspace');

    const edit_button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-worker-spec-edit]')
    );
    edit_button.click();

    const textarea = /** @type {HTMLTextAreaElement} */ (
      mount.querySelector('textarea')
    );
    textarea.value = '# Unsaved';
    textarea.dispatchEvent(new Event('input', { bubbles: true }));

    const cancel_button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-worker-spec-cancel]')
    );
    cancel_button.click();

    expect(mount.textContent).toContain('# Worker spec');
    expect(mount.textContent).not.toContain('# Unsaved');
  });
});
