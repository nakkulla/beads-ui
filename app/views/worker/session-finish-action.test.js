import { beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('../../utils/toast.js', () => ({ showToast: vi.fn() }));

const { showToast } = await import('../../utils/toast.js');
const { SESSION_FINISH_OP, runSessionFinishAction, sessionFinishToast } =
  await import('./session-finish-action.js');

/**
 * @returns {HTMLButtonElement}
 */
function makeButton() {
  const tile = document.createElement('div');
  tile.className = 'rtile';
  tile.dataset.beadId = 'UI-1';
  tile.dataset.rootDir = '/repo/a';
  const button = document.createElement('button');
  tile.append(button);
  return button;
}

beforeEach(() => {
  vi.mocked(showToast).mockClear();
});

describe('runSessionFinishAction (UI-lxxf §3.3)', () => {
  test('sends the finish request with the bead and repository after a confirm', async () => {
    const transport = vi.fn().mockResolvedValue({ sent: true });
    const confirm = vi.fn(() => true);

    const sent = await runSessionFinishAction(makeButton(), {
      transport,
      confirm
    });

    expect(sent).toBe(true);
    expect(confirm).toHaveBeenCalledTimes(1);
    expect(transport).toHaveBeenCalledWith(SESSION_FINISH_OP, {
      bead_id: 'UI-1',
      root_dir: '/repo/a'
    });
  });

  test('sends the tab repository when the tile carries no root_dir', async () => {
    const button = makeButton();
    delete (
      /** @type {HTMLElement} */ (button.closest('.rtile')).dataset.rootDir
    );
    const transport = vi.fn().mockResolvedValue({ sent: true });

    await runSessionFinishAction(button, {
      transport,
      confirm: () => true,
      root_dir: '/repo/tab'
    });

    expect(transport).toHaveBeenCalledWith(SESSION_FINISH_OP, {
      bead_id: 'UI-1',
      root_dir: '/repo/tab'
    });
  });

  test('sends nothing when the confirm is cancelled', async () => {
    const transport = vi.fn();

    const sent = await runSessionFinishAction(makeButton(), {
      transport,
      confirm: () => false
    });

    expect(sent).toBe(false);
    expect(transport).not.toHaveBeenCalled();
    expect(showToast).not.toHaveBeenCalled();
  });

  test('names the bead and both finish outcomes in the confirm text', async () => {
    const confirm = vi.fn(() => false);

    await runSessionFinishAction(makeButton(), {
      transport: vi.fn(),
      confirm
    });

    expect(confirm).toHaveBeenCalledWith(
      expect.stringContaining('UI-1 마무리')
    );
    expect(confirm).toHaveBeenCalledWith(
      expect.stringContaining('PR로 전달하는 작업은 PR 전달까지')
    );
  });

  test('toasts a failure sentence when the transport rejects', async () => {
    const transport = vi.fn().mockRejectedValue(new Error('offline'));

    await runSessionFinishAction(makeButton(), {
      transport,
      confirm: () => true
    });

    expect(showToast).toHaveBeenCalledWith(
      '마감 지시 요청에 실패했습니다',
      'error',
      4000
    );
  });

  test('sends nothing for a button without a bead id', async () => {
    const transport = vi.fn();

    const sent = await runSessionFinishAction(
      document.createElement('button'),
      { transport, confirm: () => true }
    );

    expect(sent).toBe(false);
    expect(transport).not.toHaveBeenCalled();
  });
});

describe('sessionFinishToast (UI-lxxf §3.3)', () => {
  test.each([
    ['resumed', '닫힌 세션을 다시 열어 마감 지시를 보냈습니다'],
    ['typed', '열린 세션에 마감 지시를 보냈습니다'],
    ['queued', '세션이 작업 중입니다 · 지금 턴이 끝나면 마감 지시를 읽습니다']
  ])('words the %s delivery as a success', (delivery, text) => {
    const toast = sessionFinishToast({ sent: true, delivery });

    expect(toast).toEqual({ text, variant: 'success' });
  });

  test.each([
    ['trust_prompt', '폴더 신뢰 확인에서 멈췄습니다'],
    ['resume_unconfirmed', '▤ 세션에서 확인하세요'],
    ['modal_blocked', '질문·승인 창을 띄운 상태'],
    ['in_flight', '다른 조작이 이 세션을 쓰는 중입니다'],
    ['not_session_tile', '직접 세션 타일이 아닙니다'],
    ['session_mismatch', '이 저장소의 세션인지 확인하지 못해']
  ])('words the %s refusal as a warning', (reason, fragment) => {
    const toast = sessionFinishToast({ sent: false, reason });

    expect(toast.variant).toBe('warning');
    expect(toast.text).toContain(fragment);
  });

  test('falls back to the raw code for an unknown refusal', () => {
    const toast = sessionFinishToast({ sent: false, reason: 'hub_exploded' });

    expect(toast).toEqual({
      text: '마감 지시를 보내지 못했습니다 · hub_exploded',
      variant: 'error'
    });
  });

  test('does not read an inherited property name as a refusal sentence', () => {
    const toast = sessionFinishToast({ sent: false, reason: 'toString' });

    expect(toast.variant).toBe('error');
  });
});
