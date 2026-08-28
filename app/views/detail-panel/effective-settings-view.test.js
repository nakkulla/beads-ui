/**
 * The summary header's 복잡 chip as a rendered element (UI-8x90 §5.1).
 *
 * The panel wiring — which store the click reaches and what it does NOT send —
 * is asserted in `effective-card.test.js` over the whole panel. This file owns
 * the template's own contract: a judgement chip that opens a 사유 팝업 and
 * writes nothing.
 */
import { render } from 'lit-html';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { summaryHeaderTemplate } from './effective-settings-view.js';

const REC_META = {
  rec_orchestration_model: 'fable',
  rec_impl_runtime: 'claude',
  rec_reason: 'contract_change+multi_repo'
};

const APPLIED_META = {
  ...REC_META,
  orchestration_model: 'fable',
  impl_runtime: 'claude'
};

/**
 * @param {Record<string, unknown>} metadata
 * @param {any} [handlers]
 * @returns {HTMLElement}
 */
function renderHeader(metadata, handlers = {}) {
  const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
  render(
    summaryHeaderTemplate(
      { id: 'UI-1', status: 'open', metadata },
      /** @type {any} */ (handlers)
    ),
    mount
  );
  return mount;
}

/**
 * @param {HTMLElement} mount
 * @returns {HTMLButtonElement|null}
 */
function recChip(mount) {
  return /** @type {HTMLButtonElement|null} */ (
    mount.querySelector('.detail-summary__chip--rec')
  );
}

beforeEach(() => {
  document.body.innerHTML = '<div id="m"></div>';
});

describe('detail header 복잡 chip (UI-8x90 §5.1)', () => {
  test('draws the chip as a judgement chip button', () => {
    const mount = renderHeader(REC_META);

    const chip = /** @type {HTMLButtonElement} */ (recChip(mount));

    expect(chip.tagName).toBe('BUTTON');
    expect(chip.classList.contains('judgement-chip')).toBe(true);
    expect(chip.dataset.chipKey).toBe('rec');
  });

  test('leaves the chip enabled once the recommendation is applied', () => {
    const mount = renderHeader(APPLIED_META);

    const chip = /** @type {HTMLButtonElement} */ (recChip(mount));

    expect(chip.dataset.state).toBe('applied');
    expect(chip.disabled).toBe(false);
  });

  test('asks the view to toggle the rec popup on click', () => {
    const onChipToggle = vi.fn();
    const mount = renderHeader(REC_META, { onChipToggle });

    /** @type {HTMLButtonElement} */ (recChip(mount)).click();

    expect(onChipToggle).toHaveBeenCalledWith('rec');
  });

  test('opens the 사유 팝업 under the chips line while the chip is open', () => {
    const mount = renderHeader(REC_META, {
      isChipOpen: (/** @type {string} */ key) => key === 'rec'
    });

    const popover = /** @type {HTMLElement} */ (
      mount.querySelector('.chip-popover')
    );

    expect(popover.textContent).toContain('복잡한 작업으로 판정됨');
    expect(popover.textContent).toContain(
      '계약 문서·checker·스킬 사본을 함께 바꿔야 한다'
    );
    expect(popover.textContent).toContain(
      '적용은 이슈 상세의 실행 설정 편집기에서'
    );
  });

  test('marks the open chip with aria-expanded', () => {
    const mount = renderHeader(REC_META, {
      isChipOpen: (/** @type {string} */ key) => key === 'rec'
    });

    expect(recChip(mount)?.getAttribute('aria-expanded')).toBe('true');
  });

  test('draws no popup while no chip is open', () => {
    const mount = renderHeader(REC_META);

    expect(mount.querySelector('.chip-popover')).toBe(null);
    expect(recChip(mount)?.getAttribute('aria-expanded')).toBe('false');
  });

  test('keeps the three recommendation states on the chip', () => {
    const states = [
      recChip(renderHeader(REC_META))?.dataset.state,
      recChip(renderHeader(APPLIED_META))?.dataset.state,
      recChip(renderHeader({ ...REC_META, orchestration_model: 'opus' }))
        ?.dataset.state
    ];

    expect(states).toEqual(['unapplied', 'applied', 'diverged']);
  });

  test('omits the chip for a bead with no recommendation', () => {
    const mount = renderHeader({ rec_impl_runtime: 'claude' });

    expect(recChip(mount)).toBe(null);
  });
});
