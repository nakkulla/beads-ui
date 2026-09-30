import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createRepoOpsDrawerScreen } from './index.js';

/**
 * @param {Record<string, any>} [patch]
 */
function failedOperation(patch = {}) {
  return {
    operation_id: 'op-1',
    kind: 'deploy',
    state: 'failed',
    target_base: 'main',
    target_sha: 'c'.repeat(40),
    requested_at: Date.now() - 60_000,
    finished_at: Date.now() - 30_000,
    failure: { code: 'deploy_script_failure' },
    ...patch
  };
}

/**
 * @param {{ narrow?: boolean }} [options]
 */
function mountScreen(options = {}) {
  const actions = {
    dismissRepoOperation: vi.fn(async () => {}),
    cleanupRetry: vi.fn(async () => {}),
    resolve: vi.fn(async () => {})
  };
  const onClose = vi.fn();
  const screen = createRepoOpsDrawerScreen({
    getRoot: () => '/repo/a',
    actions,
    onClose,
    matchMedia: (query) =>
      /** @type {MediaQueryList} */ (
        /** @type {unknown} */ ({
          matches: query.includes('min-width') && options.narrow !== true,
          media: query
        })
      )
  });
  return { screen, actions, onClose };
}

/** @returns {HTMLElement|null} */
function overlay() {
  return document.querySelector('.ro-overlay');
}

const INPUT = {
  operations: [failedOperation()],
  cleanup_failures: [
    { bead_id: 'UI-9', step: 'deploy', reason: 'deploy_script_failure', at: 1 }
  ],
  repo: 'repo-a',
  repo_ops: null
};

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('repo-ops drawer screen', () => {
  test('opens the timeline in a body-level overlay', () => {
    const { screen } = mountScreen();

    screen.open(INPUT);

    expect(overlay()?.parentElement).toBe(document.body);
    expect(overlay()?.hidden).toBe(false);
    expect(
      overlay()?.querySelector('[data-seam="repo-ops-timeline"]')
    ).not.toBeNull();
  });

  test('turns into a full-screen sheet below 720px', () => {
    const { screen } = mountScreen({ narrow: true });

    screen.open(INPUT);

    expect(overlay()?.classList.contains('ui-overlay--sheet')).toBe(true);
  });

  test('closes from its ✕ and reports the close', () => {
    const { screen, onClose } = mountScreen();
    screen.open(INPUT);

    /** @type {HTMLButtonElement} */ (
      document.querySelector('[data-seam="repo-ops-close"]')
    ).click();

    expect(overlay()?.hidden).toBe(true);
    expect(screen.isOpen()).toBe(false);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('closes from a click on its backdrop', () => {
    const { screen } = mountScreen();
    screen.open(INPUT);

    /** @type {HTMLElement} */ (
      document.querySelector('.ro-overlay .ui-overlay__backdrop')
    ).click();

    expect(overlay()?.hidden).toBe(true);
  });

  test('closes on Escape', () => {
    const { screen } = mountScreen();
    screen.open(INPUT);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(screen.isOpen()).toBe(false);
  });

  test('dismisses a failed operation of the scope repository', () => {
    const { screen, actions } = mountScreen();
    screen.open(INPUT);

    /** @type {HTMLButtonElement} */ (
      document.querySelector('.worker-repo-op__dismiss')
    ).click();

    expect(actions.dismissRepoOperation).toHaveBeenCalledWith(
      'op-1',
      '/repo/a'
    );
  });

  test('retries and resolves a stopped cleanup from its row', () => {
    const { screen, actions } = mountScreen();
    screen.open(INPUT);

    /** @type {HTMLButtonElement} */ (
      document.querySelector('.worker-cleanup__resume')
    ).click();
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.worker-cleanup__resolve')
    ).click();

    expect(actions.cleanupRetry).toHaveBeenCalledWith('UI-9', '/repo/a');
    expect(actions.resolve).toHaveBeenCalledWith('UI-9', '/repo/a');
  });
});
