import { describe, expect, test } from 'vitest';
import { requestResumeInstructions } from './resume-instructions-dialog.js';

describe('requestResumeInstructions', () => {
  test('returns trimmed instructions on submit', async () => {
    const result = requestResumeInstructions();
    const textarea = /** @type {HTMLTextAreaElement} */ (
      document.querySelector('.resume-instructions-dialog textarea')
    );
    textarea.value = '  실패 로그부터 확인  ';

    /** @type {HTMLButtonElement} */ (
      document.querySelector('.resume-instructions-dialog button')
    ).click();

    await expect(result).resolves.toBe('실패 로그부터 확인');
  });

  test('returns null on cancel', async () => {
    const result = requestResumeInstructions();

    /** @type {HTMLButtonElement} */ (
      document.querySelectorAll('.resume-instructions-dialog button')[1]
    ).click();

    await expect(result).resolves.toBeNull();
  });

  test('returns an empty string on empty submit', async () => {
    const result = requestResumeInstructions();

    /** @type {HTMLButtonElement} */ (
      document.querySelector('.resume-instructions-dialog button')
    ).click();

    await expect(result).resolves.toBe('');
  });
});
