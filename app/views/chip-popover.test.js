import { render } from 'lit-html';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { chipPopoverTemplate, createChipPopover } from './chip-popover.js';

const KEY = { bead_id: 'UI-1', chip_key: 'rec' };

beforeEach(() => {
  document.body.innerHTML = '<div id="m"></div>';
});

/**
 * @returns {HTMLElement}
 */
function mountEl() {
  return /** @type {HTMLElement} */ (document.getElementById('m'));
}

/**
 * @param {string} selector
 */
function clickOn(selector) {
  document
    .querySelector(selector)
    ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
}

describe('createChipPopover (UI-8x90 §5)', () => {
  test('opens the key a toggle names', () => {
    const popover = createChipPopover(() => {});

    popover.toggle(KEY);

    expect(popover.isOpen(KEY)).toBe(true);
  });

  test('closes the same key on a second toggle', () => {
    const popover = createChipPopover(() => {});
    popover.toggle(KEY);

    popover.toggle(KEY);

    expect(popover.isOpen(KEY)).toBe(false);
  });

  test('moves the open state to another chip of the same bead', () => {
    const popover = createChipPopover(() => {});
    popover.toggle(KEY);

    popover.toggle({ bead_id: 'UI-1', chip_key: 'qfr' });

    expect(popover.isOpen(KEY)).toBe(false);
    expect(popover.isOpen({ bead_id: 'UI-1', chip_key: 'qfr' })).toBe(true);
  });

  test('keeps the same chip key of another bead closed', () => {
    const popover = createChipPopover(() => {});

    popover.toggle(KEY);

    expect(popover.isOpen({ bead_id: 'UI-2', chip_key: 'rec' })).toBe(false);
  });

  test('reports a change to the view on every toggle', () => {
    const onChange = vi.fn();
    const popover = createChipPopover(onChange);

    popover.toggle(KEY);

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('reports no change when close finds nothing open', () => {
    const onChange = vi.fn();
    const popover = createChipPopover(onChange);

    popover.close();

    expect(onChange).not.toHaveBeenCalled();
  });

  test('closes on an outside document click', () => {
    mountEl().innerHTML = '<div class="outside">밖</div>';
    const popover = createChipPopover(() => {});
    popover.attach();
    popover.toggle(KEY);

    clickOn('.outside');

    expect(popover.isOpen(KEY)).toBe(false);
  });

  test('ignores a click inside the popup itself', () => {
    mountEl().innerHTML = '<div class="chip-popover"><span>안</span></div>';
    const popover = createChipPopover(() => {});
    popover.attach();
    popover.toggle(KEY);

    clickOn('.chip-popover span');

    expect(popover.isOpen(KEY)).toBe(true);
  });

  test('ignores the opening click on a judgement chip', () => {
    mountEl().innerHTML = '<button class="judgement-chip">복잡</button>';
    const popover = createChipPopover(() => {});
    popover.attach();
    popover.toggle(KEY);

    clickOn('.judgement-chip');

    expect(popover.isOpen(KEY)).toBe(true);
  });

  test('closes on Escape', () => {
    const popover = createChipPopover(() => {});
    popover.attach();
    popover.toggle(KEY);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(popover.isOpen(KEY)).toBe(false);
  });

  test('leaves other keys alone', () => {
    const popover = createChipPopover(() => {});
    popover.attach();
    popover.toggle(KEY);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(popover.isOpen(KEY)).toBe(true);
  });

  test('stops listening after detach', () => {
    mountEl().innerHTML = '<div class="outside">밖</div>';
    const popover = createChipPopover(() => {});
    popover.attach();
    popover.detach();
    popover.toggle(KEY);

    clickOn('.outside');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(popover.isOpen(KEY)).toBe(true);
  });

  test('attaches only one listener for repeated attach calls', () => {
    const onChange = vi.fn();
    mountEl().innerHTML = '<div class="outside">밖</div>';
    const popover = createChipPopover(onChange);
    popover.attach();
    popover.attach();
    popover.toggle(KEY);
    onChange.mockClear();

    clickOn('.outside');

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});

describe('chipPopoverTemplate (UI-8x90 §5)', () => {
  test('frames the content as a dialog titled by its own title', () => {
    render(
      chipPopoverTemplate({ title: '복잡한 작업으로 판정됨', lines: [] }),
      mountEl()
    );

    const dialog = /** @type {HTMLElement} */ (
      mountEl().querySelector('.chip-popover')
    );

    expect(dialog.getAttribute('role')).toBe('dialog');
    expect(dialog.getAttribute('aria-label')).toBe('복잡한 작업으로 판정됨');
  });

  test('draws one list item per line', () => {
    render(
      chipPopoverTemplate({ title: '제목', lines: ['첫 줄', '둘째 줄'] }),
      mountEl()
    );

    expect(
      Array.from(mountEl().querySelectorAll('.chip-popover__lines li'), (li) =>
        li.textContent?.trim()
      )
    ).toEqual(['첫 줄', '둘째 줄']);
  });

  test('draws the title alone when there is no line', () => {
    render(chipPopoverTemplate({ title: '제목', lines: [] }), mountEl());

    expect(
      mountEl().querySelector('.chip-popover__title')?.textContent?.trim()
    ).toBe('제목');
    expect(mountEl().querySelectorAll('.chip-popover__lines li')).toHaveLength(
      0
    );
  });
});
