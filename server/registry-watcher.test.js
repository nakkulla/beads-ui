import { beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('node:os', () => ({
  default: { homedir: () => '/tmp/home' }
}));

describe('registry watcher snapshots', () => {
  beforeEach(async () => {
    vi.resetModules();
    const mod = await import('./registry-watcher.js');
    mod.replaceDiscoveredWorkspaces([]);
  });

  test('replaces discovered workspaces snapshot', async () => {
    const mod = await import('./registry-watcher.js');

    mod.replaceDiscoveredWorkspaces([
      { path: '/repos/a', database: '/repos/a/.beads' }
    ]);
    mod.replaceDiscoveredWorkspaces([
      { path: '/repos/b', database: '/repos/b/.beads' }
    ]);

    expect(mod.getInMemoryWorkspaces()).toEqual([
      {
        path: '/repos/b',
        database: '/repos/b/.beads',
        pid: process.pid,
        version: 'dynamic'
      }
    ]);
  });

  test('keeps manual registrations when discovered snapshot changes', async () => {
    const mod = await import('./registry-watcher.js');

    mod.registerWorkspace({ path: '/manual/x', database: '/manual/x/.beads' });
    mod.replaceDiscoveredWorkspaces([
      { path: '/repos/a', database: '/repos/a/.beads' }
    ]);
    mod.replaceDiscoveredWorkspaces([]);

    expect(mod.getAvailableWorkspaces()).toEqual([
      {
        path: '/manual/x',
        database: '/manual/x/.beads',
        pid: process.pid,
        version: 'dynamic'
      }
    ]);
  });

  test('dedupes same path across manual and discovered sources', async () => {
    const mod = await import('./registry-watcher.js');

    mod.registerWorkspace({ path: '/repos/a', database: '/repos/a/.beads' });
    mod.replaceDiscoveredWorkspaces([
      { path: '/repos/a', database: '/repos/a/.beads' }
    ]);

    expect(mod.getAvailableWorkspaces()).toHaveLength(1);
    expect(mod.getAvailableWorkspaces()[0].path).toBe('/repos/a');
  });
});
