import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createRepoOpsScriptViewer } from './repo-ops-script-viewer.js';

const SHA = 'a'.repeat(40);

/**
 * @param {string} content
 * @param {Partial<Record<string, any>>} [patch]
 */
function successResponse(content, patch = {}) {
  return {
    ok: true,
    json: async () => ({
      ok: true,
      lane: 'deploy',
      path: 'repo-ops/script/deploy',
      base_ref: 'main',
      base_sha: SHA,
      blob_sha: 'b'.repeat(40),
      mode: '100755',
      timeout_ms: 600_000,
      content,
      ...patch
    })
  };
}

/**
 * @param {ReturnType<typeof createRepoOpsScriptViewer>} viewer
 * @param {HTMLElement} trigger
 */
function openDeploy(viewer, trigger) {
  return viewer.open(
    {
      lane: 'deploy',
      base_sha: SHA,
      path: 'repo-ops/script/deploy',
      base_ref: 'main'
    },
    trigger
  );
}

beforeEach(() => {
  document.body.innerHTML = '<button id="trigger">deploy</button>';
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: vi.fn().mockResolvedValue(undefined) }
  });
});

describe('createRepoOpsScriptViewer', () => {
  test('renders loading then path SHA line numbers and original content', async () => {
    /** @type {{ resolve: ((value: any) => void)|null }} */
    const deferred = { resolve: null };
    const fetchImpl = vi.fn(
      () => new Promise((resolve) => (deferred.resolve = resolve))
    );
    const viewer = createRepoOpsScriptViewer({
      getWorkspacePath: () => '/repo',
      fetchImpl
    });
    const trigger = /** @type {HTMLElement} */ (
      document.getElementById('trigger')
    );

    const opened = openDeploy(viewer, trigger);
    expect(
      document.querySelector('.repo-ops-script-viewer__status')?.textContent
    ).toContain('불러오는 중');
    if (!deferred.resolve) {
      throw new Error('fetch resolver missing');
    }
    deferred.resolve(successResponse('#!/bin/sh\necho hello\n'));
    await opened;

    expect(fetchImpl).toHaveBeenCalledWith(
      `/api/repo-ops-script?workspace=${encodeURIComponent('/repo')}&lane=deploy&base_sha=${SHA}`
    );
    expect(
      document.querySelector('.repo-ops-script-viewer__path')?.textContent
    ).toBe('repo-ops/script/deploy');
    expect(
      document.querySelector('.repo-ops-script-viewer__ref')?.textContent
    ).toBe(`main@${SHA.slice(0, 7)}`);
    expect(
      Array.from(
        document.querySelectorAll('.repo-ops-script-viewer__line-number')
      ).map((node) => node.textContent)
    ).toEqual(['1', '2', '3']);
    expect(
      Array.from(
        document.querySelectorAll('.repo-ops-script-viewer__code-line')
      ).map((node) => node.textContent)
    ).toEqual(['#!/bin/sh', 'echo hello', '']);
    viewer.destroy();
  });

  test('renders HTML-shaped content as text', async () => {
    const content = '#!/bin/sh\necho "<img src=x onerror=alert(1)>"';
    const viewer = createRepoOpsScriptViewer({
      getWorkspacePath: () => '/repo',
      fetchImpl: vi.fn().mockResolvedValue(successResponse(content))
    });

    await openDeploy(
      viewer,
      /** @type {HTMLElement} */ (document.getElementById('trigger'))
    );

    expect(
      document.querySelector('.repo-ops-script-viewer__code')?.textContent
    ).toContain('<img src=x onerror=alert(1)>');
    expect(
      document.querySelector('.repo-ops-script-viewer__code img')
    ).toBeNull();
    viewer.destroy();
  });

  test('preserves original shell text and copied content while coloring tokens', async () => {
    const content =
      '#!/bin/bash\nif [ "$USER" ]; then # hello\n  echo \'ok\'\nfi\n';
    const viewer = createRepoOpsScriptViewer({
      getWorkspacePath: () => '/repo',
      fetchImpl: vi.fn().mockResolvedValue(successResponse(content))
    });
    await openDeploy(
      viewer,
      /** @type {HTMLElement} */ (document.getElementById('trigger'))
    );

    /** @type {HTMLButtonElement} */ (
      document.querySelector('.repo-ops-script-viewer__copy')
    ).click();
    await vi.waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(content);
      expect(document.querySelector('.toast')?.textContent).toBe(
        '스크립트 복사됨'
      );
    });

    expect(
      document.querySelectorAll('.repo-ops-script-viewer__token').length
    ).toBeGreaterThan(0);
    expect(
      Array.from(
        document.querySelectorAll('.repo-ops-script-viewer__code-line')
      )
        .map((node) => node.textContent)
        .join('\n')
    ).toBe(content);
    viewer.destroy();
  });

  test('leaves a non-shell env shebang uncolored', async () => {
    const content = '#!/usr/bin/env -S python bash\nif x: # comment\n';
    const viewer = createRepoOpsScriptViewer({
      getWorkspacePath: () => '/repo',
      fetchImpl: vi.fn().mockResolvedValue(successResponse(content))
    });

    await openDeploy(
      viewer,
      /** @type {HTMLElement} */ (document.getElementById('trigger'))
    );

    expect(
      document.querySelectorAll('.repo-ops-script-viewer__token').length
    ).toBe(0);
    viewer.destroy();
  });

  test('colors an env-launched shell shebang', async () => {
    const content = '#!/usr/bin/env bash\nif [ -n "$HOME" ]; then :; fi\n';
    const viewer = createRepoOpsScriptViewer({
      getWorkspacePath: () => '/repo',
      fetchImpl: vi.fn().mockResolvedValue(successResponse(content))
    });

    await openDeploy(
      viewer,
      /** @type {HTMLElement} */ (document.getElementById('trigger'))
    );

    expect(
      document.querySelectorAll('.repo-ops-script-viewer__token').length
    ).toBeGreaterThan(0);
    viewer.destroy();
  });

  test('closes with Escape', async () => {
    const viewer = createRepoOpsScriptViewer({
      getWorkspacePath: () => '/repo',
      fetchImpl: vi.fn().mockResolvedValue(successResponse('echo ok'))
    });
    await openDeploy(
      viewer,
      /** @type {HTMLElement} */ (document.getElementById('trigger'))
    );

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(document.querySelector('.repo-ops-script-viewer')).toBeNull();
    viewer.destroy();
  });

  test('closes with backdrop click', async () => {
    const viewer = createRepoOpsScriptViewer({
      getWorkspacePath: () => '/repo',
      fetchImpl: vi.fn().mockResolvedValue(successResponse('echo ok'))
    });
    await openDeploy(
      viewer,
      /** @type {HTMLElement} */ (document.getElementById('trigger'))
    );

    /** @type {HTMLElement} */ (
      document.querySelector('.repo-ops-script-viewer__backdrop')
    ).click();

    expect(document.querySelector('.repo-ops-script-viewer')).toBeNull();
    viewer.destroy();
  });

  test('closes with close button', async () => {
    const viewer = createRepoOpsScriptViewer({
      getWorkspacePath: () => '/repo',
      fetchImpl: vi.fn().mockResolvedValue(successResponse('echo ok'))
    });
    await openDeploy(
      viewer,
      /** @type {HTMLElement} */ (document.getElementById('trigger'))
    );

    /** @type {HTMLButtonElement} */ (
      document.querySelector('.repo-ops-script-viewer__close')
    ).click();

    expect(document.querySelector('.repo-ops-script-viewer')).toBeNull();
    viewer.destroy();
  });

  test('focuses close then restores trigger focus after closing', async () => {
    const viewer = createRepoOpsScriptViewer({
      getWorkspacePath: () => '/repo',
      fetchImpl: vi.fn().mockResolvedValue(successResponse('echo ok'))
    });
    const trigger = /** @type {HTMLButtonElement} */ (
      document.getElementById('trigger')
    );
    trigger.focus();

    await openDeploy(viewer, trigger);
    expect(document.activeElement).toBe(
      document.querySelector('.repo-ops-script-viewer__close')
    );
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.repo-ops-script-viewer__close')
    ).click();

    expect(document.activeElement).toBe(trigger);
    viewer.destroy();
  });

  test('ignores a late response from an earlier request', async () => {
    /** @type {Array<(value: any) => void>} */
    const resolvers = [];
    const viewer = createRepoOpsScriptViewer({
      getWorkspacePath: () => '/repo',
      fetchImpl: vi.fn(() => new Promise((resolve) => resolvers.push(resolve)))
    });
    const trigger = /** @type {HTMLElement} */ (
      document.getElementById('trigger')
    );
    const first = openDeploy(viewer, trigger);
    const second = viewer.open(
      {
        lane: 'verify',
        base_sha: SHA,
        path: 'repo-ops/script/verify',
        base_ref: 'main'
      },
      trigger
    );

    resolvers[1](
      successResponse('echo current', {
        lane: 'verify',
        path: 'repo-ops/script/verify'
      })
    );
    await second;
    resolvers[0](successResponse('echo old'));
    await first;

    expect(
      document.querySelector('.repo-ops-script-viewer__code')?.textContent
    ).toContain('echo current');
    expect(
      document.querySelector('.repo-ops-script-viewer__code')?.textContent
    ).not.toContain('echo old');
    viewer.destroy();
  });
});
