import { describe, expect, test, vi } from 'vitest';
import { closeDialog, createDialog, showDialog } from './dialog.js';

describe('modal dialog primitive (UI-dbn6 §4.4)', () => {
  test('attaches a body-level op-dialog with the given class', () => {
    document.body.innerHTML = '';

    const dialog = createDialog(document, 'resume-instructions-dialog');

    expect(dialog.tagName).toBe('DIALOG');
    expect(dialog.className).toBe('op-dialog resume-instructions-dialog');
    expect(dialog.parentElement).toBe(document.body);
  });

  test('opens through showModal where the platform has it', () => {
    const dialog = /** @type {any} */ (document.createElement('dialog'));
    dialog.showModal = vi.fn();

    showDialog(dialog);

    expect(dialog.showModal).toHaveBeenCalledTimes(1);
  });

  test('opens through the open attribute where showModal is missing', () => {
    const dialog = /** @type {any} */ (document.createElement('dialog'));
    dialog.showModal = undefined;

    showDialog(dialog);

    expect(dialog.hasAttribute('open')).toBe(true);
  });

  test('leaves an already open dialog alone', () => {
    const dialog = /** @type {any} */ (document.createElement('dialog'));
    dialog.setAttribute('open', '');
    dialog.showModal = vi.fn();

    showDialog(dialog);

    expect(dialog.showModal).not.toHaveBeenCalled();
  });

  test('closes and detaches a dialog', () => {
    document.body.innerHTML = '';
    const dialog = /** @type {any} */ (createDialog(document, 'x-dialog'));
    dialog.close = undefined;
    dialog.setAttribute('open', '');

    closeDialog(dialog, { remove: true });

    expect(dialog.hasAttribute('open')).toBe(false);
    expect(document.querySelector('.x-dialog')).toBeNull();
  });
});
