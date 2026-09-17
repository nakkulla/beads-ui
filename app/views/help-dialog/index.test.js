import { render } from 'lit-html';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { waitStatusBadge } from '../worker/lanes.js';
import { WAIT_KINDS } from '../worker/wait-vocabulary.js';
import { createHelpDialog, installHelpAnchorDelegation } from './index.js';

// jsdom has no <dialog> behavior: the fallback path in the dialog sets the
// `open` attribute, so the tests read that attribute instead of `showModal`.
if (typeof HTMLElement !== 'undefined') {
  const proto = /** @type {any} */ (HTMLElement.prototype);
  if (typeof proto.scrollIntoView !== 'function') {
    proto.scrollIntoView = function scrollIntoView() {};
  }
}

/** @type {HTMLElement} */
let root;
/** @type {ReturnType<typeof createHelpDialog>|null} */
let dialog = null;

beforeEach(() => {
  root = document.createElement('div');
  document.body.appendChild(root);
});

afterEach(() => {
  dialog?.destroy();
  dialog = null;
  root.remove();
});

/**
 * @param {Parameters<typeof createHelpDialog>[1]} [options]
 * @returns {{ api: ReturnType<typeof createHelpDialog>, element: HTMLDialogElement }}
 */
function mount(options = {}) {
  const api = createHelpDialog(root, options);
  dialog = api;
  api.open();
  const element = /** @type {HTMLDialogElement} */ (
    root.querySelector('dialog.help-dialog')
  );
  return { api, element };
}

describe('help dialog legend', () => {
  test('renders the four sections in spec order', () => {
    const { element } = mount();

    const titles = Array.from(
      element.querySelectorAll('.help-dialog__section h2')
    ).map((node) => node.textContent);

    expect(titles).toEqual([
      '판정 글리프',
      '대기 상태 배지',
      '게이트 칩',
      '관계 칩과 요약 칩'
    ]);
  });

  test('draws every vocabulary row exactly once', () => {
    const { element } = mount();

    const counts = WAIT_KINDS.map(
      (row) => element.querySelectorAll(`#help-${row.id}`).length
    );

    expect(counts).toEqual(WAIT_KINDS.map(() => 1));
  });

  test('reads the times-line words out of the vocabulary table (UI-0bvr §5.1)', () => {
    const { element } = mount();

    const cell = element.querySelector('#help-retry_wait .help-dialog__times');

    expect(cell?.textContent?.trim()).toBe('<경과> 대기 · 다음 재시도 <HH:MM>');
  });

  test('empties the times-line cell of a kind without those words', () => {
    const { element } = mount();

    const cell = element.querySelector(
      '#help-prerequisite .help-dialog__times'
    );

    expect(cell?.textContent?.trim()).toBe('—');
  });

  test('draws only queue-scope rows in the gate section (UI-3pu9 §4.4)', () => {
    const { element } = mount();

    const gate_section = /** @type {HTMLElement} */ (
      element.querySelectorAll('.help-dialog__section')[2]
    );
    const ids = Array.from(gate_section.querySelectorAll('tbody tr')).map(
      (tr) => tr.id
    );

    expect(ids).toEqual(
      WAIT_KINDS.filter((row) => row.scope === 'queue').map(
        (row) => `help-${row.id}`
      )
    );
  });

  test('omits the manual-start gate row from the legend (UI-3pu9 §4.4)', () => {
    const { element } = mount();

    const gate_section = /** @type {HTMLElement} */ (
      element.querySelectorAll('.help-dialog__section')[2]
    );

    expect(gate_section.textContent).not.toContain('⏸');
  });

  test('highlights the anchored row on open', () => {
    const api = createHelpDialog(root, {});
    dialog = api;

    api.open({ anchor: 'provider_hold-usage_limit' });

    expect(
      root
        .querySelector('#help-provider_hold-usage_limit')
        ?.classList.contains('help-dialog__row--highlight')
    ).toBe(true);
  });

  test('closes the enclosing details popup and opens at the anchor', () => {
    const api = createHelpDialog(root, { anchorRoot: root });
    dialog = api;
    const details = document.createElement('details');
    details.open = true;
    details.innerHTML =
      '<summary>대기</summary><button type="button" data-help-anchor="retry_wait">범례 보기</button>';
    root.appendChild(details);

    /** @type {HTMLButtonElement} */ (
      details.querySelector('[data-help-anchor]')
    ).click();

    expect(details.open).toBe(false);
    expect(api.isOpen()).toBe(true);
    expect(
      root
        .querySelector('#help-retry_wait')
        ?.classList.contains('help-dialog__row--highlight')
    ).toBe(true);
  });

  test('opens from the real badge popup whose details stops click propagation', () => {
    const api = createHelpDialog(root, { anchorRoot: document });
    dialog = api;
    const card = document.createElement('div');
    root.appendChild(card);
    render(
      waitStatusBadge({
        wait_reasons: [
          {
            kind: 'prerequisite',
            subject: { bead_id: 'A-1', root_dir: '/repo' },
            headline: 'A-2 완료를 기다림',
            release: '선행 해제 후 자동 복귀',
            verdict: 'normal',
            targets: [],
            actions: [],
            notify_plan: { on_complete: 'none', on_overdue: 'none' }
          }
        ]
      }),
      card
    );
    const details = /** @type {HTMLDetailsElement} */ (
      card.querySelector('details.wait-verdict')
    );
    details.open = true;

    /** @type {HTMLButtonElement} */ (
      card.querySelector('[data-help-anchor="prerequisite"]')
    ).click();

    expect(details.open).toBe(false);
    expect(api.isOpen()).toBe(true);
    expect(
      root
        .querySelector('#help-prerequisite')
        ?.classList.contains('help-dialog__row--highlight')
    ).toBe(true);
  });

  test('clears the open state on close', () => {
    const { api, element } = mount();

    api.close();

    expect(api.isOpen()).toBe(false);
    expect(element.hasAttribute('open')).toBe(false);
  });

  test('removes the delegation listener when uninstalled', () => {
    const api = createHelpDialog(root, {});
    dialog = api;
    const uninstall = installHelpAnchorDelegation(root, api);
    const button = document.createElement('button');
    button.setAttribute('data-help-anchor', 'retry_wait');
    root.appendChild(button);

    uninstall();
    button.click();

    expect(api.isOpen()).toBe(false);
  });
});
