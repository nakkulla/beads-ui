import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createFatalErrorDialog } from './fatal-error-dialog.js';

/** @returns {HTMLDialogElement} */
function dialogEl() {
  return /** @type {HTMLDialogElement} */ (
    document.getElementById('fatal-error-dialog')
  );
}

beforeEach(() => {
  document.body.innerHTML = '<div id="app"></div>';
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('fatal error dialog', () => {
  test('opens with the title, message and diagnostics it is given', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('app'));
    const fatal = createFatalErrorDialog(mount);

    fatal.open('Failed to load workspace', 'bd exited 1', 'stderr: boom');

    expect(dialogEl().hasAttribute('open')).toBe(true);
    expect(document.querySelector('#fatal-error-title')?.textContent).toBe(
      'Failed to load workspace'
    );
    expect(document.querySelector('#fatal-error-message')?.textContent).toBe(
      'bd exited 1'
    );
    expect(document.querySelector('#fatal-error-detail')?.textContent).toBe(
      'stderr: boom'
    );
    expect(
      document.querySelector('#fatal-error-detail')?.hasAttribute('hidden')
    ).toBe(false);
  });

  test('hides the diagnostics block when there is none', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('app'));
    const fatal = createFatalErrorDialog(mount);

    fatal.open('Request failed', 'boom');

    expect(
      document.querySelector('#fatal-error-detail')?.hasAttribute('hidden')
    ).toBe(true);
  });

  test('falls back to a generic title and message', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('app'));
    const fatal = createFatalErrorDialog(mount);

    fatal.open('', '');

    expect(document.querySelector('#fatal-error-title')?.textContent).toBe(
      'Unexpected Error'
    );
    expect(document.querySelector('#fatal-error-message')?.textContent).toBe(
      'An unrecoverable error occurred.'
    );
  });

  test('closes from Dismiss', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('app'));
    const fatal = createFatalErrorDialog(mount);
    fatal.open('Request failed', 'boom');

    /** @type {HTMLButtonElement} */ (
      document.getElementById('fatal-error-close')
    ).click();

    expect(dialogEl().hasAttribute('open')).toBe(false);
  });

  test('closes on Escape', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('app'));
    const fatal = createFatalErrorDialog(mount);
    fatal.open('Request failed', 'boom');

    dialogEl().dispatchEvent(new Event('cancel', { cancelable: true }));

    expect(dialogEl().hasAttribute('open')).toBe(false);
  });

  test('reloads the page from Reload', () => {
    const reload = vi.fn();
    vi.stubGlobal('location', { ...window.location, reload });
    const mount = /** @type {HTMLElement} */ (document.getElementById('app'));
    const fatal = createFatalErrorDialog(mount, { reload });
    fatal.open('Request failed', 'boom');

    /** @type {HTMLButtonElement} */ (
      document.getElementById('fatal-error-reload')
    ).click();

    expect(reload).toHaveBeenCalledTimes(1);
  });

  test('draws Reload as the primary button of the shared dialog', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('app'));
    const fatal = createFatalErrorDialog(mount);

    fatal.open('Request failed', 'boom');

    expect(dialogEl().classList.contains('op-dialog')).toBe(true);
    expect(
      document
        .getElementById('fatal-error-reload')
        ?.classList.contains('ui-btn--primary')
    ).toBe(true);
  });
});
