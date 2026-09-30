import { afterEach, describe, expect, test } from 'vitest';
import { NOW, mountPipeline, payloadsOf, settle } from './test-harness.js';

/** @type {Array<{ destroy: () => void }>} */
const mounted = [];

afterEach(() => {
  for (const entry of mounted.splice(0)) {
    entry.destroy();
  }
});

const REPO_A = '/fixture/repo-a';

/**
 * @param {string} [scope]
 */
function mount(scope = REPO_A) {
  const handle = mountPipeline({ now: NOW, scope });
  mounted.push(handle);
  return handle;
}

/**
 * @param {ParentNode} root
 * @param {string} selector
 * @returns {HTMLElement}
 */
function el(root, selector) {
  const found = root.querySelector(selector);
  if (!(found instanceof HTMLElement)) {
    throw new Error(`missing ${selector}`);
  }
  return found;
}

describe('pipeline 레포 toolbar (UI-dbn6 §3.3)', () => {
  test('sends worker-automation-toggle off while automation runs', async () => {
    const { mount: root, send } = mount();

    el(root, '.pl-toolbar--repo [data-op="repo-automation"]').click();
    await settle();

    expect(payloadsOf(send, 'worker-automation-toggle')).toEqual([
      { on: false, root_dir: REPO_A, expected_revision: 10 }
    ]);
  });

  test('sends worker-merge-auto-toggle from the auto-merge control', async () => {
    const { mount: root, send } = mount();

    el(root, '.pl-toolbar--repo [data-op="auto-merge"]').click();
    await settle();

    expect(payloadsOf(send, 'worker-merge-auto-toggle')).toEqual([
      { on: true, root_dir: REPO_A, expected_revision: 10 }
    ]);
  });

  test('sends worker-queue-set-slots on a slots change', async () => {
    const { mount: root, send } = mount();
    const input = /** @type {HTMLInputElement} */ (
      el(root, '.pl-toolbar--repo [data-op="slots"]')
    );
    input.value = '3';

    input.dispatchEvent(new Event('change', { bubbles: true }));
    await settle();

    expect(payloadsOf(send, 'worker-queue-set-slots')).toEqual([
      { slots: 3, root_dir: REPO_A, expected_revision: 10 }
    ]);
  });

  test('sends worker-queue-set-serial-lane-count on a serial lane change', async () => {
    const { mount: root, send } = mount();
    const select = /** @type {HTMLSelectElement} */ (
      el(root, '.pl-toolbar--repo [data-op="serial-lanes"]')
    );
    select.value = '2';

    select.dispatchEvent(new Event('change', { bubbles: true }));
    await settle();

    expect(payloadsOf(send, 'worker-queue-set-serial-lane-count')).toEqual([
      { count: 2, root_dir: REPO_A, expected_revision: 10 }
    ]);
  });

  test('sends worker-merge-queue-add-all once per repo from [일괄 머지]', async () => {
    const { mount: root, send } = mount('*');

    el(root, '[data-op="merge-all"]').click();
    await settle();

    const roots = payloadsOf(send, 'worker-merge-queue-add-all').map(
      (payload) => payload.root_dir
    );
    expect(roots).toHaveLength(8);
    expect(new Set(roots).size).toBe(8);
  });
});
