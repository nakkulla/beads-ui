import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createNewIssueDialog } from './index.js';

/**
 * The new-issue screen (UI-dbn6 §3.1): the existing dialog plus the 전체
 * scope's target repository picker — another repo is connected with
 * `set-workspace` before `create-issue` goes out, because `create-issue`
 * writes to the connected workspace.
 */

// jsdom has no modal dialog; the screen falls back to the open attribute.
if (typeof HTMLDialogElement !== 'undefined') {
  const proto = /** @type {any} */ (HTMLDialogElement.prototype);
  if (typeof proto.showModal !== 'function') {
    proto.showModal = function showModal() {
      this.setAttribute('open', '');
    };
    proto.close = function close() {
      this.removeAttribute('open');
    };
  }
}

const REPOS = [
  { root_dir: '/repo-a', name: 'repo-a' },
  { root_dir: '/repo-b', name: 'repo-b' }
];

/** @type {Array<string>} */
let order;

/**
 * @param {{ all?: boolean, switch_ok?: boolean }} [options]
 */
function mountDialog(options = {}) {
  document.body.innerHTML = '<main id="app"></main>';
  const mount = /** @type {HTMLElement} */ (document.getElementById('app'));
  const send = vi.fn(async (/** @type {string} */ type) => {
    order.push(type);
    return { created: true };
  });
  const switchWorkspace = vi.fn(async (/** @type {string} */ root_dir) => {
    order.push(`set-workspace:${root_dir}`);
    return options.switch_ok !== false;
  });
  const dialog = createNewIssueDialog(mount, send, {
    targets: () => (options.all === false ? null : REPOS),
    connected: () => '/repo-a',
    switchWorkspace
  });
  return { dialog, send, switchWorkspace };
}

/** @returns {HTMLSelectElement} */
function repoSelect() {
  return /** @type {HTMLSelectElement} */ (document.getElementById('new-repo'));
}

/** @param {string} title */
function fillTitle(title) {
  const input = /** @type {HTMLInputElement} */ (
    document.getElementById('new-title')
  );
  input.value = title;
}

/** @returns {Promise<void>} */
async function settle() {
  for (let index = 0; index < 10; index++) {
    await Promise.resolve();
  }
}

beforeEach(() => {
  order = [];
  window.localStorage.clear();
});

describe('new issue screen', () => {
  test('offers every visible repo in the 전체 scope with the connected one chosen', () => {
    const { dialog } = mountDialog();

    dialog.open();

    const select = repoSelect();
    expect(select.closest('[hidden]')).toBeNull();
    expect(Array.from(select.options).map((option) => option.value)).toEqual([
      '/repo-a',
      '/repo-b'
    ]);
    expect(select.value).toBe('/repo-a');
  });

  test('hides the target repository picker in the 레포 scope', () => {
    const { dialog } = mountDialog({ all: false });

    dialog.open();

    expect(repoSelect().closest('[hidden]')).not.toBeNull();
  });

  test('connects another chosen repo before sending create-issue', async () => {
    const { dialog, send } = mountDialog();
    dialog.open();
    fillTitle('다른 레포 이슈');
    repoSelect().value = '/repo-b';

    /** @type {HTMLFormElement} */ (
      document.getElementById('new-issue-form')
    ).requestSubmit();
    await settle();

    expect(order).toEqual(['set-workspace:/repo-b', 'create-issue']);
    expect(send).toHaveBeenCalledWith('create-issue', {
      title: '다른 레포 이슈',
      priority: 2
    });
  });

  test('sends create-issue without a switch for the connected repo', async () => {
    const { dialog, switchWorkspace } = mountDialog();
    dialog.open();
    fillTitle('연결 레포 이슈');

    /** @type {HTMLFormElement} */ (
      document.getElementById('new-issue-form')
    ).requestSubmit();
    await settle();

    expect(switchWorkspace).not.toHaveBeenCalled();
    expect(order).toEqual(['create-issue']);
  });

  test('sends nothing and says so when the switch fails', async () => {
    const { dialog, send } = mountDialog({ switch_ok: false });
    dialog.open();
    fillTitle('실패');
    repoSelect().value = '/repo-b';

    /** @type {HTMLFormElement} */ (
      document.getElementById('new-issue-form')
    ).requestSubmit();
    await settle();

    expect(send).not.toHaveBeenCalled();
    expect(document.getElementById('new-issue-error')?.textContent).toBe(
      'Failed to switch workspace'
    );
  });

  test('submits with Ctrl+Enter', async () => {
    const { dialog, send } = mountDialog();
    dialog.open();
    fillTitle('단축키');

    document.getElementById('new-issue-dialog')?.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Enter',
        ctrlKey: true,
        bubbles: true
      })
    );
    await settle();

    expect(send).toHaveBeenCalledWith('create-issue', {
      title: '단축키',
      priority: 2
    });
  });

  test('remembers the last type and priority for the next open', async () => {
    const { dialog } = mountDialog();
    dialog.open();
    fillTitle('기본값');
    /** @type {HTMLSelectElement} */ (
      document.getElementById('new-type')
    ).value = 'bug';
    /** @type {HTMLSelectElement} */ (
      document.getElementById('new-priority')
    ).value = '1';
    /** @type {HTMLFormElement} */ (
      document.getElementById('new-issue-form')
    ).requestSubmit();
    await settle();

    dialog.open();

    expect(
      /** @type {HTMLSelectElement} */ (document.getElementById('new-type'))
        .value
    ).toBe('bug');
    expect(
      /** @type {HTMLSelectElement} */ (document.getElementById('new-priority'))
        .value
    ).toBe('1');
  });
});
