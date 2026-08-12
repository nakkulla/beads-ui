import { afterEach, describe, expect, test, vi } from 'vitest';
import { showToast, showToastOnce } from './toast.js';

afterEach(() => {
  document.body.innerHTML = '';
  vi.useRealTimers();
});

describe('showToast', () => {
  test('renders text in a .toast element', () => {
    showToast('hello');
    const el = /** @type {HTMLElement} */ (document.querySelector('.toast'));
    expect(el).not.toBeNull();
    expect(el.textContent).toBe('hello');
  });

  test('success variant uses green background', () => {
    showToast('ok', 'success');
    const el = /** @type {HTMLElement} */ (document.querySelector('.toast'));
    expect(el.style.background).toBe('rgb(21, 109, 54)');
  });

  test('error variant uses red background', () => {
    showToast('boom', 'error');
    const el = /** @type {HTMLElement} */ (document.querySelector('.toast'));
    expect(el.style.background).toBe('rgb(159, 32, 17)');
  });

  test('warning variant uses orange background distinct from success and error', () => {
    showToast('careful', 'warning');
    const el = /** @type {HTMLElement} */ (document.querySelector('.toast'));
    const bg = el.style.background;
    expect(bg).not.toBe('');
    expect(bg).not.toBe('rgb(21, 109, 54)'); // not success green
    expect(bg).not.toBe('rgb(159, 32, 17)'); // not error red
    expect(bg).not.toBe('rgba(0, 0, 0, 0.85)'); // not info default
  });

  test('removes element after duration', () => {
    vi.useFakeTimers();
    showToast('vanish', 'info', 1000);
    expect(document.querySelectorAll('.toast').length).toBe(1);
    vi.advanceTimersByTime(1100);
    expect(document.querySelectorAll('.toast').length).toBe(0);
  });

  test('renders a durable notification key once per browser session', () => {
    window.sessionStorage.clear();

    const first = showToastOnce('deployment:recovery-prepared:4', '복구 준비');
    const second = showToastOnce('deployment:recovery-prepared:4', '복구 준비');

    expect(first).toBe(true);
    expect(second).toBe(false);
    expect(document.querySelectorAll('.toast')).toHaveLength(1);
  });

  test('renders and deduplicates once when session storage is unavailable', () => {
    const storage = Object.getOwnPropertyDescriptor(window, 'sessionStorage');
    Object.defineProperty(window, 'sessionStorage', {
      configurable: true,
      get() {
        throw new Error('storage unavailable');
      }
    });

    const first = showToastOnce('deployment:fallback:9', 'fallback');
    const second = showToastOnce('deployment:fallback:9', 'fallback');

    if (storage) {
      Object.defineProperty(window, 'sessionStorage', storage);
    }
    expect(first).toBe(true);
    expect(second).toBe(false);
    expect(document.querySelectorAll('.toast')).toHaveLength(1);
  });
});
