import { beforeEach, describe, expect, test } from 'vitest';
import { requestResumeInstructions } from './resume-instructions-dialog.js';

/** Read the dialog buttons that are currently mounted. false when absent. */
function buttons() {
  return /** @type {HTMLButtonElement[]} */ (
    Array.from(document.querySelectorAll('.resume-instructions-dialog button'))
  );
}

/** Switch the open dialog to its input state (state B). false when absent. */
function openInput() {
  buttons()[1].click();
}

describe('requestResumeInstructions 상태 A', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('resolves with an empty string on the immediate branch', async () => {
    const result = requestResumeInstructions();

    buttons()[0].click();

    await expect(result).resolves.toBe('');
  });

  test('resolves with null on cancel', async () => {
    const result = requestResumeInstructions();

    buttons()[2].click();

    await expect(result).resolves.toBeNull();
  });

  test('resolves with null on Esc', async () => {
    const result = requestResumeInstructions();

    document
      .querySelector('.resume-instructions-dialog')
      ?.dispatchEvent(new Event('cancel', { cancelable: true }));

    await expect(result).resolves.toBeNull();
  });

  test('draws no textarea before the instructions branch is chosen', () => {
    requestResumeInstructions();

    const dialog = document.querySelector('.resume-instructions-dialog');

    expect(dialog?.querySelector('textarea')).toBeNull();
  });

  test('marks the instructions branch collapsed', () => {
    requestResumeInstructions();

    const instruct = buttons()[1];

    expect(instruct.getAttribute('aria-expanded')).toBe('false');
  });

  test('gives the immediate branch the primary style', () => {
    requestResumeInstructions();

    const primary = document.querySelector(
      '.resume-instructions-dialog .op-btn--primary'
    );

    expect(primary?.textContent).toBe('▶ 바로 이어하기');
  });
});

describe('requestResumeInstructions 상태 B', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('switches to the input state and focuses the textarea', () => {
    requestResumeInstructions();

    openInput();

    expect(document.activeElement).toBe(
      document.querySelector('.resume-instructions-dialog textarea')
    );
  });

  test('marks the instructions branch expanded after the switch', () => {
    requestResumeInstructions();
    const instruct = buttons()[1];

    instruct.click();

    expect(instruct.getAttribute('aria-expanded')).toBe('true');
  });

  test('disables the confirm while the input is empty', () => {
    requestResumeInstructions();

    openInput();

    expect(
      /** @type {HTMLButtonElement} */ (
        document.querySelector('.resume-instructions-dialog .op-btn--primary')
      ).disabled
    ).toBe(true);
  });

  test('resolves with the trimmed instructions on confirm', async () => {
    const result = requestResumeInstructions();
    openInput();
    const textarea = /** @type {HTMLTextAreaElement} */ (
      document.querySelector('.resume-instructions-dialog textarea')
    );

    textarea.value = '  실패 로그부터 확인  ';
    textarea.dispatchEvent(new Event('input'));
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.resume-instructions-dialog .op-btn--primary')
    ).click();

    await expect(result).resolves.toBe('실패 로그부터 확인');
  });

  test('accepts Ctrl+Enter as the confirm', async () => {
    const result = requestResumeInstructions();
    openInput();
    const textarea = /** @type {HTMLTextAreaElement} */ (
      document.querySelector('.resume-instructions-dialog textarea')
    );

    textarea.value = '테스트부터';
    textarea.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', ctrlKey: true })
    );

    await expect(result).resolves.toBe('테스트부터');
  });

  test('resolves with null on cancel in the input state', async () => {
    const result = requestResumeInstructions();
    openInput();

    buttons()[1].click();

    await expect(result).resolves.toBeNull();
  });

  test('resolves with null on Esc in the input state', async () => {
    const result = requestResumeInstructions();
    openInput();

    document
      .querySelector('.resume-instructions-dialog')
      ?.dispatchEvent(new Event('cancel', { cancelable: true }));

    await expect(result).resolves.toBeNull();
  });
});

describe('requestResumeInstructions 라벨', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('labels a session resume', () => {
    requestResumeInstructions({ bead_id: 'UI-1', kind: 'session' });

    const dialog = document.querySelector('.resume-instructions-dialog');

    expect(dialog?.querySelector('h2')?.textContent).toBe('세션 이어하기');
    expect(buttons().map((b) => b.textContent)).toEqual([
      '▶ 바로 이어하기',
      '✎ 지시 입력 후 이어하기',
      '취소'
    ]);
  });

  test('labels the session confirm in the input state', () => {
    requestResumeInstructions({ bead_id: 'UI-1', kind: 'session' });

    openInput();

    expect(buttons().map((b) => b.textContent)).toEqual(['이어하기', '취소']);
  });

  test('labels a settlement resume', () => {
    requestResumeInstructions({ bead_id: 'UI-1', kind: 'settlement' });

    const dialog = document.querySelector('.resume-instructions-dialog');

    expect(dialog?.querySelector('h2')?.textContent).toBe(
      '착지 후 정리 재시도'
    );
    expect(buttons().map((b) => b.textContent)).toEqual([
      '▶ 바로 정리 재시도',
      '✎ 지시 입력 후 정리 재시도',
      '취소'
    ]);
  });

  test('labels the settlement confirm in the input state', () => {
    requestResumeInstructions({ bead_id: 'UI-1', kind: 'settlement' });

    openInput();

    expect(buttons().map((b) => b.textContent)).toEqual([
      '정리 재시도',
      '취소'
    ]);
  });
});

describe('requestResumeInstructions 대상 줄', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
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
