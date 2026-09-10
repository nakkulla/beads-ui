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
import {
  effectiveSettingsCardTemplate,
  summaryHeaderTemplate
} from './effective-settings-view.js';

const REC_META = {
  rec_orchestration_model: 'fable',
  rec_impl_runtime: 'claude',
  rec_reason: 'hard_diagnosis+invariant_reasoning'
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
      '원인이 불명확하거나 재현이 불안정해 가설-검증 루프가 필요하다'
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

/**
 * @param {Partial<Parameters<typeof effectiveSettingsCardTemplate>[0]>} [model_overrides]
 * @param {Partial<Parameters<typeof effectiveSettingsCardTemplate>[1]>} [handler_overrides]
 * @returns {HTMLElement}
 */
function renderCard(model_overrides = {}, handler_overrides = {}) {
  const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
  render(
    effectiveSettingsCardTemplate(
      /** @type {any} */ ({
        metadata: {},
        workspace_values: {},
        catalog: null,
        execution_defaults: null,
        controller_runtime: null,
        expanded: true,
        presets: [{ id: 'p1', name: '메인 구현', compatible: true }],
        preset_id: '',
        preset_busy: false,
        skipped_orchestration_keys: [],
        ...model_overrides
      }),
      /** @type {any} */ ({
        onToggle: vi.fn(),
        onEdit: vi.fn(),
        onPresetSelect: vi.fn(),
        onPresetApply: vi.fn(),
        ...handler_overrides
      })
    ),
    mount
  );
  return mount;
}

describe('effective-settings card route visibility', () => {
  test.each([
    ['quick_fix', ['impl']],
    ['spec_backed', ['spec', 'impl']],
    ['full_plan', ['spec', 'plan', 'impl']],
    [undefined, ['spec', 'impl']],
    ['unknown', ['spec', 'impl']]
  ])('shows only applicable review settings for %s', (route, reviews) => {
    const mount = renderCard({ metadata: { route } });

    const keys = Array.from(
      mount.querySelectorAll('.detail-effective__row[data-key]'),
      (row) => row.getAttribute('data-key')
    );

    expect(keys.filter((key) => key?.includes('_review_'))).toEqual(
      /** @type {string[]} */ (reviews).flatMap((step) =>
        ['model', 'effort', 'speed'].map((axis) => `${step}_review_${axis}`)
      )
    );
    expect(keys).toContain('impl_model');
    expect(keys).toContain('orchestration_model');
  });

  test('excludes hidden pins and global values from collapsed counts', () => {
    const mount = renderCard({
      expanded: false,
      metadata: { route: 'quick_fix', spec_review_model: 'opus' },
      workspace_values: { plan_review_model: 'fable' }
    });

    const counts = mount.querySelector('.detail-effective__counts');

    expect(counts?.textContent).toContain('핀 0');
    expect(counts?.textContent).toContain('전역 0');
    expect(counts?.textContent).toContain('기본 12');
  });

  test('restores hidden pins when the route changes without editing metadata', () => {
    const metadata = { spec_review_model: 'opus', plan_review_model: 'fable' };
    const onEdit = vi.fn();
    renderCard({ metadata, route: 'quick_fix' }, { onEdit });

    const mount = renderCard({ metadata, route: 'full_plan' }, { onEdit });

    expect(
      mount.querySelector('[data-edit-key="plan_review_model"]')
    ).toHaveProperty('value', 'fable');
    expect(
      mount.querySelector('[data-edit-key="spec_review_model"]')
    ).toHaveProperty('value', 'opus');
    expect(onEdit).not.toHaveBeenCalled();
    expect(metadata).toEqual({
      spec_review_model: 'opus',
      plan_review_model: 'fable'
    });
  });
});

describe('effective-settings card preset head (UI-7yh2 §3.7-3.9)', () => {
  test('places the preset select inside the card head', () => {
    const mount = renderCard();

    const head = mount.querySelector('.detail-effective__head');

    expect(head?.querySelector('[data-impl-preset-select]')).not.toBe(null);
  });

  test('places the preset apply button inside the card head', () => {
    const mount = renderCard();

    const head = mount.querySelector('.detail-effective__head');

    expect(head?.querySelector('[data-apply-impl-preset]')).not.toBe(null);
  });

  test('renders no foot element', () => {
    const mount = renderCard();

    expect(mount.querySelector('.detail-effective__foot')).toBe(null);
  });

  test('carries the corrected fourteen-key count as the select title', () => {
    const mount = renderCard();

    const select = mount.querySelector('[data-impl-preset-select]');

    expect(select?.getAttribute('title')).toBe('세션 키 14개를 핀으로 기록');
  });

  test('does not toggle the details when the preset select changes', () => {
    const onToggle = vi.fn();
    const mount = renderCard({}, { onToggle });

    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-impl-preset-select]')
    );
    select.value = 'p1';
    select.dispatchEvent(new Event('change', { bubbles: true }));

    expect(onToggle).not.toHaveBeenCalled();
  });

  test('does not toggle the details when the apply button is clicked', () => {
    const onToggle = vi.fn();
    const mount = renderCard({ preset_id: 'p1' }, { onToggle });

    const button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-apply-impl-preset]')
    );
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(onToggle).not.toHaveBeenCalled();
  });
});
