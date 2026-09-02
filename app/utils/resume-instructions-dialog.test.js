import { beforeEach, describe, expect, test } from 'vitest';
import { requestResumeInstructions } from './resume-instructions-dialog.js';

describe('requestResumeInstructions', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

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

  test('titles the dialog and its confirm button for a settlement resume', () => {
    requestResumeInstructions({ bead_id: 'UI-1', kind: 'settlement' });

    const dialog = document.querySelector('.resume-instructions-dialog');

    expect(dialog?.querySelector('h2')?.textContent).toBe('착지 정산 재개');
    expect(dialog?.querySelector('button')?.textContent).toBe('정산 재개');
  });

  test('titles the dialog and its confirm button for a session resume', () => {
    requestResumeInstructions({ bead_id: 'UI-1', kind: 'session' });

    const dialog = document.querySelector('.resume-instructions-dialog');

    expect(dialog?.querySelector('h2')?.textContent).toBe('세션 이어하기');
    expect(dialog?.querySelector('button')?.textContent).toBe('이어하기');
  });

  test('names the target with the bead id and the attempt tuple', () => {
    requestResumeInstructions({
      bead_id: 'UI-1',
      kind: 'session',
      tuple: 'codex · sol · high'
    });

    const target = document.querySelector(
      '.resume-instructions-dialog__target'
    );

    expect(target?.textContent).toBe('UI-1 · codex · sol · high');
  });

  test('names the target with the bead id alone when no tuple is known', () => {
    requestResumeInstructions({ bead_id: 'UI-1', kind: 'session' });

    const target = document.querySelector(
      '.resume-instructions-dialog__target'
    );

    expect(target?.textContent).toBe('UI-1');
  });

  test('draws no target line without a context', () => {
    requestResumeInstructions();

    const dialog = document.querySelector('.resume-instructions-dialog');

    expect(dialog?.querySelector('h2')?.textContent).toBe('세션 이어하기');
    expect(
      dialog?.querySelector('.resume-instructions-dialog__target')
    ).toBeNull();
  });
});
