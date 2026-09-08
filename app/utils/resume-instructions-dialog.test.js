import { beforeEach, describe, expect, test, vi } from 'vitest';
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

    expect(dialog?.querySelector('h2')?.textContent).toBe(
      '착지 후 정리 재시도'
    );
    expect(dialog?.querySelector('button')?.textContent).toBe('정리 재시도');
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

describe('requestResumeInstructions restart context (UI-qce9 §3.1)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('titles the restart dialog and describes what it does', () => {
    requestResumeInstructions({ bead_id: 'UI-1', kind: 'restart' });

    const dialog = document.querySelector('.resume-instructions-dialog');
    expect(dialog?.querySelector('h2')?.textContent).toBe('지시와 함께 재시작');
    expect(
      dialog?.querySelector('.resume-instructions-dialog__desc')?.textContent
    ).toBe(
      '실행을 중단한 뒤 같은 세션 기록과 실행 설정으로 이어갑니다. 실행 중인 도구는 중단될 수 있으며 작업 디렉터리는 보존됩니다.'
    );
    expect(dialog?.querySelector('.op-btn--primary')?.textContent).toBe(
      '중단 후 재시작'
    );
  });

  test('names the paused entry point 지시와 함께 이어하기', () => {
    requestResumeInstructions({ bead_id: 'UI-1', kind: 'resume_recorded' });

    const dialog = document.querySelector('.resume-instructions-dialog');
    expect(dialog?.querySelector('h2')?.textContent).toBe(
      '지시와 함께 이어하기'
    );
    expect(
      dialog?.querySelector('.resume-instructions-dialog__desc')?.textContent
    ).toBe(
      '같은 세션 기록과 실행 설정으로 이어갑니다. 실행 중인 도구는 중단될 수 있으며 작업 디렉터리는 보존됩니다.'
    );
    expect(dialog?.querySelector('.op-btn--primary')?.textContent).toBe(
      '이어하기'
    );
  });

  test('disables confirm while the mandatory input is empty', () => {
    requestResumeInstructions({ kind: 'restart' });

    const confirm = /** @type {HTMLButtonElement} */ (
      document.querySelector('.resume-instructions-dialog .op-btn--primary')
    );
    const textarea = /** @type {HTMLTextAreaElement} */ (
      document.querySelector('.resume-instructions-dialog textarea')
    );
    expect(confirm.disabled).toBe(true);

    textarea.value = '고쳐라';
    textarea.dispatchEvent(new Event('input'));

    expect(confirm.disabled).toBe(false);
    expect(textarea.required).toBe(true);
  });

  test('shows the target tuple line for the restart dialog', () => {
    requestResumeInstructions({
      bead_id: 'UI-1',
      kind: 'restart',
      tuple: 'claude · opus · high · default · a@example.com'
    });

    expect(
      document.querySelector('.resume-instructions-dialog__target')?.textContent
    ).toBe('UI-1 · claude · opus · high · default · a@example.com');
  });

  test('keeps the typed text and shows the message when onSubmit refuses', async () => {
    const onSubmit = vi
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        message: '재시작 거부: bead_running'
      })
      .mockResolvedValueOnce({ ok: true });
    const result = requestResumeInstructions({ kind: 'restart' }, document, {
      onSubmit
    });
    const textarea = /** @type {HTMLTextAreaElement} */ (
      document.querySelector('.resume-instructions-dialog textarea')
    );
    const confirm = /** @type {HTMLButtonElement} */ (
      document.querySelector('.resume-instructions-dialog .op-btn--primary')
    );
    textarea.value = '테스트부터';
    textarea.dispatchEvent(new Event('input'));

    confirm.click();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(
      document.querySelector('.resume-instructions-dialog__error')?.textContent
    ).toBe('재시작 거부: bead_running');
    expect(textarea.value).toBe('테스트부터');
    expect(
      document.querySelector('.resume-instructions-dialog')
    ).not.toBeNull();

    confirm.click();

    await expect(result).resolves.toBe('테스트부터');
    expect(onSubmit).toHaveBeenCalledTimes(2);
  });

  test('does not submit an empty mandatory input', () => {
    const onSubmit = vi.fn(async () => ({ ok: true }));
    requestResumeInstructions({ kind: 'restart' }, document, { onSubmit });

    /** @type {HTMLButtonElement} */ (
      document.querySelector('.resume-instructions-dialog .op-btn--primary')
    ).click();

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
