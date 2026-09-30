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
 * A phone-width, coarse-pointer screen showing the 대기 lane.
 */
function mountPhoneQueue() {
  const handle = mountPipeline({ now: NOW, width: 390, coarse: true });
  mounted.push(handle);
  const bar = handle.mount.querySelector(
    '[data-op="mobile-lane"][data-value="queue"]'
  );
  /** @type {HTMLElement} */ (bar).click();
  return handle;
}

/**
 * @param {ParentNode} root
 * @param {string} bead_id
 * @param {string} label
 */
function openAndPick(root, bead_id, label) {
  /** @type {HTMLElement} */ (
    root.querySelector(`[data-op="move-sheet"][data-bead-id="${bead_id}"]`)
  ).click();
  const button = Array.from(
    root.querySelectorAll('.pl-sheet-host button')
  ).find((node) => node.textContent?.trim() === label);
  if (!(button instanceof HTMLElement)) {
    throw new Error(`missing sheet button ${label}`);
  }
  button.click();
}

describe('pipeline move sheet (UI-dbn6 §3.6)', () => {
  test('offers ⋯ instead of ✕ on a waiting row under a coarse pointer', () => {
    const { mount: root } = mountPhoneQueue();

    const row = /** @type {HTMLElement} */ (
      root.querySelector('.pl-row[data-bead-id="A-2"]')
    );

    expect(row.querySelector('[data-op="move-sheet"]')).not.toBeNull();
    expect(row.querySelector('[data-op="queue-remove"]')).toBeNull();
  });

  test('sends worker-queue-reorder from ↑ 위로', async () => {
    const { mount: root, send } = mountPhoneQueue();

    openAndPick(root, 'A-2', '↑ 위로');
    await settle();

    expect(payloadsOf(send, 'worker-queue-reorder')).toEqual([
      { bead_id: 'A-2', to_index: 0, root_dir: REPO_A, expected_revision: 10 }
    ]);
  });

  test('sends worker-queue-place without a lane from 병렬로 on a serial row', async () => {
    const { mount: root, send } = mountPhoneQueue();

    openAndPick(root, 'A-7', '병렬로');
    await settle();

    expect(payloadsOf(send, 'worker-queue-place')).toEqual([
      { bead_id: 'A-7', root_dir: REPO_A, expected_revision: 10 }
    ]);
  });

  test('sends worker-queue-remove from 대기에서 빼기', async () => {
    const { mount: root, send } = mountPhoneQueue();

    openAndPick(root, 'A-3', '대기에서 빼기');
    await settle();

    expect(payloadsOf(send, 'worker-queue-remove')).toEqual([
      { bead_id: 'A-3', root_dir: REPO_A, expected_revision: 10 }
    ]);
  });

  test('closes the sheet from its backdrop', () => {
    const { mount: root, screen } = mountPhoneQueue();
    /** @type {HTMLElement} */ (
      root.querySelector('[data-op="move-sheet"][data-bead-id="A-2"]')
    ).click();

    /** @type {HTMLElement} */ (
      root.querySelector('.pl-sheet-host [data-op="sheet-close"]')
    ).click();

    expect(screen.openSheet()).toBeNull();
  });
});
