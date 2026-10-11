import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  DEFER_GUIDANCE,
  NO_DEPENDENTS_TEXT,
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

/** @param {string} text */
function typeReason(text) {
  const area = /** @type {HTMLTextAreaElement} */ (
    dialog().querySelector('.defer-dialog__reason-input')
  );
  area.value = text;
  area.dispatchEvent(new Event('input'));
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

  test('says no same-repository dependent waits when the list is empty', async () => {
    await open(transportOf({ ...DEFER_PREVIEW, dependents: [] }));

    expect(dialog().querySelector('.defer-dialog__none')?.textContent).toBe(
      NO_DEPENDENTS_TEXT
    );
    expect(edgeBoxes()).toEqual([]);
  });

  test('keeps the confirm off until a reason is typed', async () => {
    await open(transportOf(DEFER_PREVIEW));
    const before = confirmButton().disabled;

    typeReason('나중에');

    expect([before, confirmButton().disabled]).toEqual([true, false]);
  });

  test('sends the reason and only the edges left checked', async () => {
    const transport = transportOf(DEFER_PREVIEW);
    const { pending } = await open(transport);
    edgeBoxes()[1].click();
    typeReason('  나중에 ');

    confirmButton().click();
    const result = await pending;

    expect(transport).toHaveBeenLastCalledWith('worker-bead-defer', {
      bead_id: 'UI-1',
      reason: '나중에',
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
    typeReason('나중에');

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
    typeReason('나중에');

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
    typeReason('나중에');

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
