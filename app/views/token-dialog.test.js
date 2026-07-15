import { afterEach, describe, expect, test, vi } from 'vitest';
import { TOKEN_STORAGE_KEY, createTokenDialog } from './token-dialog.js';

afterEach(() => {
  document.body.innerHTML = '';
  window.localStorage.clear();
});

describe('token-dialog', () => {
  test('renders a token input and submit button', () => {
    const mount = document.createElement('div');
    document.body.appendChild(mount);
    const dialog = createTokenDialog(mount).getElement();

    expect(dialog.querySelector('#token-input')).toBeTruthy();
    expect(dialog.querySelector('#token-submit')).toBeTruthy();
  });

  test('submitting saves the token and calls onSubmit', () => {
    const mount = document.createElement('div');
    document.body.appendChild(mount);
    const onSubmit = vi.fn();
    const dialog = createTokenDialog(mount, { onSubmit }).getElement();

    const input = /** @type {HTMLInputElement} */ (
      dialog.querySelector('#token-input')
    );
    input.value = '  my-secret  ';
    const form = /** @type {HTMLFormElement} */ (
      dialog.querySelector('.token-dialog__form')
    );
    form.dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true })
    );

    expect(window.localStorage.getItem(TOKEN_STORAGE_KEY)).toBe('my-secret');
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith('my-secret');
  });

  test('empty token does not save or call onSubmit', () => {
    const mount = document.createElement('div');
    document.body.appendChild(mount);
    const onSubmit = vi.fn();
    const dialog = createTokenDialog(mount, { onSubmit }).getElement();

    const form = /** @type {HTMLFormElement} */ (
      dialog.querySelector('.token-dialog__form')
    );
    form.dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true })
    );

    expect(window.localStorage.getItem(TOKEN_STORAGE_KEY)).toBeNull();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
