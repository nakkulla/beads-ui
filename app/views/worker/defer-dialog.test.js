import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  DEFER_GUIDANCE,
  SHELF_LIFT_TEXT,
  UNKNOWN_OUTCOME_TEXT,
  deferResultToast,
  openDeferDialog
} from './defer-dialog.js';

/** @returns {HTMLDialogElement} */
function dialog() {
  return /** @type {HTMLDialogElement} */ (
    document.querySelector('.defer-dialog')
  );
}

/** @returns {HTMLButtonElement} */
function confirmButton() {
  return /** @type {HTMLButtonElement} */ (
    dialog().querySelector('.defer-dialog__confirm')
  );
}

/** @returns {HTMLInputElement[]} */
function edgeBoxes() {
  return Array.from(dialog().querySelectorAll('input[type=checkbox]'));
}

/**
 * A transport answering the preview with `preview` and the write with
 * `write`, recording every call.
 *
 * @param {any} preview
 * @param {any} [write]
 */
function transportOf(preview, write = { outcome: 'applied', applied: true }) {
  return vi.fn(async (/** @type {string} */ type) =>
    type.endsWith('-preview') ? preview : write
  );
}

const DEFER_PREVIEW = {
  bead_id: 'UI-1',
  ok: true,
  status: 'resolved',
  pr_url: 'https://github.com/o/r/pull/7',
  dependents: [
    { id: 'UI-2', title: '후행 둘', status: 'open' },
    { id: 'UI-3', title: '후행 셋', status: 'open' }
  ]
};

/**
 * @param {ReturnType<typeof transportOf>} transport
 * @param {'defer'|'revive'} [mode]
 */
async function open(transport, mode = 'defer') {
  const pending = openDeferDialog({ mode, bead_id: 'UI-1' }, { transport });
  await vi.waitFor(() =>
    expect(dialog().querySelector('.defer-dialog__loading')).toBeNull()
  );
  // Wrapped: an async function returning the dialog promise would wait for it.
  return { pending };
}

afterEach(() => {
  document.body.innerHTML = '';
});

describe('openDeferDialog — defer mode (UI-0d9i §3.2)', () => {
  test('requests the defer preview when it opens', async () => {
    const transport = transportOf(DEFER_PREVIEW);

    await open(transport);

    expect(transport).toHaveBeenCalledWith('worker-bead-defer-preview', {
      bead_id: 'UI-1'
    });
  });

  test('draws the title and the two fixed guidance lines', async () => {
    await open(transportOf(DEFER_PREVIEW));

    expect(dialog().querySelector('h2')?.textContent).toBe(
      'UI-1 보류로 전환 — 더 이상 고려하지 않음'
    );
    expect(
      Array.from(dialog().querySelectorAll('.defer-dialog__guide li')).map(
        (li) => li.textContent
      )
    ).toEqual([...DEFER_GUIDANCE]);
  });

  test('selects every dependent edge by default', async () => {
    await open(transportOf(DEFER_PREVIEW));

    expect(edgeBoxes().map((box) => [box.dataset.edgeId, box.checked])).toEqual(
      [
        ['UI-2', true],
        ['UI-3', true]
      ]
    );
  });

  test('defers without mounting a dialog when no dependent waits', async () => {
    const transport = transportOf({ ...DEFER_PREVIEW, dependents: [] });

    const result = await openDeferDialog(
      { mode: 'defer', bead_id: 'UI-1', source: 'detail' },
      { transport }
    );

    expect(dialog()).toBeNull();
    expect(transport).toHaveBeenLastCalledWith('worker-bead-defer', {
      bead_id: 'UI-1',
      source: 'detail',
      remove_edges: []
    });
    expect(result).toMatchObject({ sent: true, ok: true });
  });

  test('enables confirmation without a reason field', async () => {
    await open(transportOf(DEFER_PREVIEW));

    expect(confirmButton().disabled).toBe(false);
    expect(dialog().querySelector('textarea')).toBeNull();
  });

  test('sends only the edges left checked without asking for a reason', async () => {
    const transport = transportOf(DEFER_PREVIEW);
    const { pending } = await open(transport);
    edgeBoxes()[1].click();

    confirmButton().click();
    const result = await pending;

    expect(transport).toHaveBeenLastCalledWith('worker-bead-defer', {
      bead_id: 'UI-1',
      source: 'shelved',
      remove_edges: ['UI-2']
    });
    expect(result.ok).toBe(true);
  });

  test('shows a preview refusal and turns the confirm off', async () => {
    const toast = vi.fn();
    openDeferDialog(
      { mode: 'defer', bead_id: 'UI-1' },
      {
        transport: transportOf({
          bead_id: 'UI-1',
          ok: false,
          reason: 'not_shelved'
        }),
        toast
      }
    );
    await vi.waitFor(() =>
      expect(dialog().querySelector('.defer-dialog__error')).not.toBeNull()
    );

    expect(
      dialog().querySelector('.defer-dialog__error')?.textContent
    ).toContain('not_shelved');
    expect(confirmButton().disabled).toBe(true);
    expect(toast).toHaveBeenCalledWith(
      expect.stringContaining('not_shelved'),
      'error'
    );
  });

  test('turns the confirm off when the preview request fails', async () => {
    openDeferDialog(
      { mode: 'defer', bead_id: 'UI-1' },
      {
        transport: vi.fn(async () => {
          throw new Error('socket closed');
        })
      }
    );
    await vi.waitFor(() =>
      expect(dialog().querySelector('.defer-dialog__error')).not.toBeNull()
    );

    expect(confirmButton().disabled).toBe(true);
  });

  test('reports a write whose readback failed as 적용 여부 확인 불가 without a retry', async () => {
    const transport = transportOf(DEFER_PREVIEW, {
      applied: false,
      outcome: 'unknown',
      reason: 'readback_failed',
      write_applied: true,
      retry_safe: false
    });
    await open(transport);

    confirmButton().click();
    await vi.waitFor(() =>
      expect(dialog().querySelector('.defer-dialog__error')).not.toBeNull()
    );

    expect(
      dialog().querySelector('.defer-dialog__error')?.textContent
    ).toContain(UNKNOWN_OUTCOME_TEXT);
    expect(confirmButton().disabled).toBe(true);
    expect(transport).toHaveBeenCalledTimes(2);
  });
});

describe('openDeferDialog — revive mode (UI-0d9i §3.5)', () => {
  const REVIVE_PREVIEW = {
    bead_id: 'UI-1',
    ok: true,
    target: 'resolved',
    pr_state: 'MERGED',
    pr_url: 'https://github.com/o/r/pull/7',
    restorable: [{ id: 'UI-2', title: '후행 둘', status: 'open' }],
    shelved: true
  };

  test('ignores a late revive preview after cancellation', async () => {
    /** @type {(value: any) => void} */
    let replyPreview = () => {};
    const preview = new Promise((resolve) => {
      replyPreview = resolve;
    });
    const transport = vi.fn(() => preview);
    const pending = openDeferDialog(
      { mode: 'revive', bead_id: 'UI-1' },
      { transport }
    );
    const stale_confirm = confirmButton();

    dialog()
      .querySelector('.defer-dialog__cancel')
      ?.dispatchEvent(new MouseEvent('click'));
    const result = await pending;
    replyPreview(REVIVE_PREVIEW);
    await Promise.resolve();
    stale_confirm.dispatchEvent(new MouseEvent('click'));

    expect(result).toEqual({ sent: false, ok: false });
    expect(dialog()).toBeNull();
    expect(transport).toHaveBeenCalledTimes(1);
  });

  test('names the target, the shelf lift and the default-selected edges', async () => {
    await open(transportOf(REVIVE_PREVIEW), 'revive');

    expect(
      dialog().querySelector('.defer-dialog__target')?.textContent
    ).toContain('resolved — PR 머지됨');
    expect(dialog().querySelector('.defer-dialog__note')?.textContent).toBe(
      SHELF_LIFT_TEXT
    );
    expect(edgeBoxes().map((box) => box.checked)).toEqual([true]);
  });

  test('sends the chosen edges to restore', async () => {
    const transport = transportOf(REVIVE_PREVIEW, {
      applied: true,
      outcome: 'applied',
      target: 'resolved',
      shelf_cleared: true
    });
    const { pending } = await open(transport, 'revive');

    confirmButton().click();
    await pending;

    expect(transport).toHaveBeenLastCalledWith('worker-bead-revive', {
      bead_id: 'UI-1',
      restore_edges: ['UI-2']
    });
  });

  test('turns the confirm off when the PR cannot be read', async () => {
    openDeferDialog(
      { mode: 'revive', bead_id: 'UI-1' },
      {
        transport: transportOf({
          bead_id: 'UI-1',
          ok: false,
          reason: 'pr_lookup_failed',
          message: 'gh_failed'
        })
      }
    );
    await vi.waitFor(() =>
      expect(dialog().querySelector('.defer-dialog__error')).not.toBeNull()
    );

    expect(confirmButton().disabled).toBe(true);
    expect(dialog().querySelector('.defer-dialog__target')).toBeNull();
  });
});

describe('deferResultToast (UI-0d9i §4)', () => {
  test('lists the edges a partial defer could not cut', () => {
    const toast = deferResultToast(
      {
        outcome: 'partial',
        failed_edges: [{ id: 'UI-3', step: 'remove' }]
      },
      { mode: 'defer', bead_id: 'UI-1' }
    );

    expect(toast).toEqual({
      text: 'UI-1 보류 — 간선 처리 실패: UI-3 (그 간선은 계속 막습니다)',
      type: 'error'
    });
  });

  test('says a not_dependent edge keeps blocking', () => {
    const toast = deferResultToast(
      {
        outcome: 'partial',
        failed_edges: [{ id: 'UI-5', step: 'not_dependent' }]
      },
      { mode: 'defer', bead_id: 'UI-1' }
    );

    expect(toast?.text).toBe(
      'UI-1 보류 — 간선 처리 실패: UI-5 (그 간선은 계속 막습니다)'
    );
  });

  test('says a note failure cut the edge but left its notes line missing', () => {
    const toast = deferResultToast(
      {
        outcome: 'partial',
        failed_edges: [
          { id: 'UI-3', step: 'note' },
          { id: 'UI-4', step: 'note_readback' }
        ]
      },
      { mode: 'defer', bead_id: 'UI-1' }
    );

    expect(toast?.text).toBe(
      'UI-1 보류 — 간선은 끊었지만 notes 기록 줄이 없거나 확인되지 않음: UI-3, UI-4 (되살리기 목록에 오르지 않을 수 있습니다)'
    );
  });

  test('says a readback failure could not confirm the removal', () => {
    const toast = deferResultToast(
      {
        outcome: 'partial',
        failed_edges: [{ id: 'UI-3', step: 'readback' }]
      },
      { mode: 'defer', bead_id: 'UI-1' }
    );

    expect(toast?.text).toBe(
      'UI-1 보류 — 간선 제거를 확인하지 못함: UI-3 (bd에서 끊겼는지 확인하세요)'
    );
  });

  test('joins the phrasing of mixed edge failures in one toast', () => {
    const toast = deferResultToast(
      {
        outcome: 'partial',
        failed_edges: [
          { id: 'UI-3', step: 'remove' },
          { id: 'UI-4', step: 'readback' }
        ]
      },
      { mode: 'defer', bead_id: 'UI-1' }
    );

    expect(toast?.text).toBe(
      'UI-1 보류 — 간선 처리 실패: UI-3 (그 간선은 계속 막습니다) · 간선 제거를 확인하지 못함: UI-4 (bd에서 끊겼는지 확인하세요)'
    );
  });

  test('names the dependents a revival skipped because they closed', () => {
    const toast = deferResultToast(
      {
        outcome: 'applied',
        target: 'open',
        failed_edges: [],
        skipped_edges: ['UI-2'],
        shelf_cleared: true
      },
      { mode: 'revive', bead_id: 'UI-1' }
    );

    expect(toast).toEqual({
      text: 'UI-1 되살림(open) · 닫힌 후행이라 복원하지 않음: UI-2',
      type: 'success'
    });
  });

  test('keeps a revival successful when only the shelf lift failed', () => {
    const toast = deferResultToast(
      {
        outcome: 'applied',
        target: 'open',
        failed_edges: [],
        shelf_cleared: false
      },
      { mode: 'revive', bead_id: 'UI-1' }
    );

    expect(toast?.text).toBe(
      'UI-1 되살림(open) · 보관 해제는 실패했습니다 — [보관 해제]를 누르세요'
    );
  });
});
