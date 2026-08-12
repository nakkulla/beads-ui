import { describe, expect, test, vi } from 'vitest';
import {
  chooseContinuation,
  resolveContinuationMismatch
} from './continuation-dialog.js';

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

  test('adopts a decision conflict and refreshes before reopening', async () => {
    const mismatch = {
      prior_available: true,
      prior: { runner: 'claude' },
      current: { runner: 'codex' },
      decision_token: { source_attempt_id: 'a1' }
    };
    const adopted = vi.fn();
    const resend = vi.fn(async () => ({
      conflict: true,
      queue: { revision: 2 }
    }));
    const refresh = vi.fn(async () => ({ resumed: true }));
    const result_promise = resolveContinuationMismatch(
      { continuation_mismatch: mismatch },
      resend,
      { onResult: adopted, refresh }
    );
    /** @type {HTMLButtonElement} */ (
      document.querySelectorAll('dialog button')[1]
    ).click();

    await expect(result_promise).resolves.toEqual({ resumed: true });
    expect(refresh).toHaveBeenCalledWith({
      conflict: true,
      queue: { revision: 2 }
    });
    expect(adopted).toHaveBeenLastCalledWith({ resumed: true });
  });
});
