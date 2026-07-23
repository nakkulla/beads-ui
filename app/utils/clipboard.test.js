import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { copyToClipboard } from './clipboard.js';

describe('copyToClipboard', () => {
  /** @type {any} */
  let origClipboard;
  /** @type {any} */
  let origExecCommand;

  beforeEach(() => {
    origClipboard = navigator.clipboard;
    origExecCommand = document.execCommand;
  });

  afterEach(() => {
    // @ts-ignore
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: origClipboard
    });
    document.execCommand = origExecCommand;
    document.body.innerHTML = '';
  });

  /**
   * @param {any} value
   */
  function setClipboard(value) {
    // @ts-ignore
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value
    });
  }

  test('uses navigator.clipboard when available', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard({ writeText });
    await expect(copyToClipboard('UI-1')).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith('UI-1');
  });

  test('falls back to execCommand when clipboard API is undefined', async () => {
    // Simulate non-secure context (HTTP on a non-localhost host).
    setClipboard(undefined);
    document.execCommand = vi.fn().mockReturnValue(true);
    await expect(copyToClipboard('docs/spec.md')).resolves.toBe(true);
    expect(document.execCommand).toHaveBeenCalledWith('copy');
    // The hidden textarea must not survive the call.
    expect(document.querySelector('textarea')).toBeNull();
  });

  test('falls back to execCommand when writeText rejects', async () => {
    setClipboard({ writeText: vi.fn().mockRejectedValue(new Error('denied')) });
    document.execCommand = vi.fn().mockReturnValue(true);
    await expect(copyToClipboard('UI-2')).resolves.toBe(true);
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  test('resolves false when every path fails', async () => {
    setClipboard(undefined);
    document.execCommand = vi.fn().mockReturnValue(false);
    await expect(copyToClipboard('nope')).resolves.toBe(false);
  });
});
