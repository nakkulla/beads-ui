import { afterEach, describe, expect, test } from 'vitest';
import { NOW, mountPipeline, payloadsOf, settle } from './test-harness.js';

/** @type {Array<{ destroy: () => void }>} */
const mounted = [];

afterEach(() => {
  for (const entry of mounted.splice(0)) {
    entry.destroy();
  }
});

const REPO_C = '/fixture/repo-c';

function mount() {
  const handle = mountPipeline({ now: NOW });
  mounted.push(handle);
  return handle;
}

/**
 * @param {ParentNode} root
 * @param {string} op
 * @returns {HTMLElement}
 */
function stripButton(root, op) {
  return /** @type {HTMLElement} */ (
    root.querySelector(`.pl-strip [data-op="${op}"][data-root-dir="${REPO_C}"]`)
  );
}

describe('pipeline repo strip (UI-dbn6 §3.3)', () => {
  test('lists one chip per visible repo', () => {
    const { mount: root } = mount();

    const chips = root.querySelectorAll('.pl-strip__chip');

    expect(chips).toHaveLength(8);
  });

  test('narrows the scope to a repo on a chip click', () => {
    const { mount: root, setScope } = mount();

    stripButton(root, 'scope-repo').click();

    expect(setScope).toHaveBeenCalledWith(REPO_C);
  });

  test('sends worker-automation-toggle with that repo revision from the dot', async () => {
    const { mount: root, send } = mount();

    stripButton(root, 'repo-automation').click();
    await settle();

    expect(payloadsOf(send, 'worker-automation-toggle')).toEqual([
      { on: true, root_dir: REPO_C, expected_revision: 12 }
    ]);
  });

  test('opens that repo settings from ⚙', () => {
    const { mount: root, openSettings } = mount();

    stripButton(root, 'repo-settings').click();

    expect(openSettings).toHaveBeenCalledWith({
      scope: 'repo',
      root_dir: REPO_C
    });
  });
});
