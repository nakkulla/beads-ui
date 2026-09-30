import { beforeEach, describe, expect, test, vi } from 'vitest';
import { copyButton, copyWithToast } from './copy.js';
import { markdownBlock } from './markdown.js';
import { createOverlayHost } from './overlay.js';
import { render } from './render.js';

/**
 * The Phase 2 primitives the detail and transcript screens draw with
 * (UI-dbn6 §4.4): the copy-with-toast seam and its button, the sanitized
 * markdown block, and the overlay host (backdrop + content host).
 */
vi.mock('../utils/clipboard.js', () => ({
  copyToClipboard: vi.fn(async (/** @type {string} */ text) => text !== 'x')
}));

/** @returns {Promise<void>} */
async function settle() {
  for (let index = 0; index < 5; index++) {
    await Promise.resolve();
  }
}

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('copy primitive', () => {
  test('says 복사됨 once the value landed on the clipboard', async () => {
    copyWithToast('UI-1');
    await settle();

    expect(document.querySelector('.toast')?.textContent).toBe('복사됨');
  });

  test('says 복사 실패 when the clipboard refuses', async () => {
    copyWithToast('x');
    await settle();

    expect(document.querySelector('.toast')?.textContent).toBe('복사 실패');
  });

  test('copies the button value on click', async () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    render(copyButton({ label: 'UI-7', value: 'UI-7', cls: 'x-id' }), host);

    /** @type {HTMLButtonElement} */ (host.querySelector('.ui-copy')).click();
    await settle();

    expect(host.querySelector('.ui-copy')?.classList.contains('x-id')).toBe(
      true
    );
    expect(document.querySelector('.toast')?.textContent).toBe('복사됨');
  });
});

describe('markdown block primitive', () => {
  test('renders markdown inside a ui-markdown block', () => {
    const host = document.createElement('div');

    render(markdownBlock('**굵게**'), host);

    expect(host.querySelector('.ui-markdown strong')?.textContent).toBe('굵게');
  });

  test('drops a script the source smuggles in', () => {
    const host = document.createElement('div');

    render(markdownBlock('<script>alert(1)</script>본문'), host);

    expect(host.querySelector('script')).toBeNull();
  });
});

describe('overlay host primitive', () => {
  test('attaches a hidden body-level overlay with a backdrop and a host', () => {
    const { overlay, backdrop, host } = createOverlayHost(
      document,
      'tr-overlay'
    );

    expect(overlay.parentElement).toBe(document.body);
    expect(overlay.hidden).toBe(true);
    expect(overlay.className).toBe('ui-overlay tr-overlay');
    expect(backdrop.className).toBe('ui-overlay__backdrop');
    expect(host.className).toBe('ui-overlay__host tr-overlay__host');
  });
});
