import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render } from '../../ui/render.js';
import { createShell } from './shell.js';

/**
 * @param {Partial<import('./shell.js').ShellDeps>} [overrides]
 */
function mountShell(overrides = {}) {
  const mount = document.createElement('header');
  document.body.appendChild(mount);
  /** @type {import('./shell.js').ShellDeps} */
  const deps = {
    scopeView: () => ({
      scope: '*',
      repos: [{ root_dir: '/repo/a', name: 'a' }],
      available: [{ path: '/repo/a' }],
      hidden: [],
      connected: '/repo/a',
      screen: 'pipeline'
    }),
    narrow: () => false,
    onScope: vi.fn(),
    onScreen: vi.fn(),
    onTheme: vi.fn(),
    onSettings: vi.fn(),
    onNewIssue: vi.fn(),
    onGitPull: vi.fn(async () => {}),
    onVisibility: vi.fn(),
    ...overrides
  };
  const shell = createShell(mount, deps);
  return { mount, shell, deps };
}

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('shell header', () => {
  test('opens the settings from the header ⚙', () => {
    const { mount, deps } = mountShell();

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-op="settings"]')
    ).click();

    expect(deps.onSettings).toHaveBeenCalledTimes(1);
  });

  test('keeps the usage meter drawn across a shell re-render', () => {
    const { shell } = mountShell();
    const usage = /** @type {HTMLElement} */ (shell.usageElement());
    render('meter', usage);

    shell.render();

    expect(shell.usageElement()).toBe(usage);
    expect(usage.textContent).toContain('meter');
  });

  test('keeps the usage meter in the phone header', () => {
    const { shell } = mountShell({ narrow: () => true });

    expect(shell.usageElement()).not.toBeNull();
  });
});
