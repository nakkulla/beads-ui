import { describe, expect, test, vi } from 'vitest';
import { chooseContinuation } from './continuation-dialog.js';

describe('chooseContinuation', () => {
  test('returns the fresh choice and shows both tuples', async () => {
    const choice = chooseContinuation({
      prior_available: true,
      prior: { runner: 'codex', model: 'sol', effort: 'ultra', speed: 'fast' },
      current: { runner: 'claude', model: 'opus', effort: 'high' }
    });
    const dialog = /** @type {HTMLDialogElement} */ (
      document.querySelector('dialog')
    );

    dialog.querySelectorAll('button')[1].click();

    await expect(choice).resolves.toBe('fresh_current');
    expect(dialog.textContent).toContain('codex · sol · ultra · Fast');
    expect(dialog.textContent).toContain('claude · opus · high');
  });

  test('disables a legacy prior choice', () => {
    HTMLDialogElement.prototype.showModal = vi.fn();

    void chooseContinuation({
      prior_available: false,
      prior: { runner: null },
      current: { runner: 'codex', model: 'sol' }
    });

    expect(
      /** @type {HTMLButtonElement} */ (document.querySelector('dialog button'))
        .disabled
    ).toBe(true);
    /** @type {HTMLButtonElement} */ (
      document.querySelectorAll('dialog button')[2]
    ).click();
  });

  test('returns the prior-session choice', async () => {
    const choice = chooseContinuation({
      prior_available: true,
      prior: { runner: 'codex', model: 'sol' },
      current: { runner: 'claude', model: 'opus' }
    });

    /** @type {HTMLButtonElement} */ (
      document.querySelector('dialog button')
    ).click();

    await expect(choice).resolves.toBe('prior_session');
  });

  test('returns null when the user cancels', async () => {
    const choice = chooseContinuation({
      prior_available: true,
      prior: { runner: 'codex' },
      current: { runner: 'claude' }
    });

    /** @type {HTMLButtonElement} */ (
      document.querySelectorAll('dialog button')[2]
    ).click();

    await expect(choice).resolves.toBeNull();
  });
});
