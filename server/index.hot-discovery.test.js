import { afterEach, describe, expect, test, vi } from 'vitest';

afterEach(() => {
  vi.resetModules();
  vi.restoreAllMocks();
});

describe('server hot discovery bootstrap', () => {
  test('broadcasts workspaces-updated when discovered workspaces change', async () => {
    const replace_discovered_workspaces = vi.fn();
    const watch_workspace_discovery = vi.fn(({ onChange }) => {
      onChange([{ path: '/repos/new', database: '/repos/new/.beads' }]);
      return { close() {} };
    });
    const broadcast = vi.fn();
    const listen = vi.fn((_port, _host, cb) => cb?.());
    const on = vi.fn();

    vi.doMock('node:http', () => ({
      createServer: vi.fn(() => ({ listen, on }))
    }));
    vi.doMock('./app.js', () => ({
      createApp: vi.fn(() => ({}))
    }));
    vi.doMock('./cli/daemon.js', () => ({
      printServerUrl: vi.fn()
    }));
    vi.doMock('./config.js', () => ({
      getConfig: vi.fn(() => ({
        root_dir: '/repos/current',
        port: 3000,
        host: '127.0.0.1'
      }))
    }));
    vi.doMock('./db.js', () => ({
      resolveWorkspaceDatabase: vi.fn(() => ({
        source: 'workspace',
        exists: true,
        path: '/repos/current/.beads'
      }))
    }));
    vi.doMock('./logging.js', () => ({
      debug: vi.fn(() => vi.fn()),
      enableAllDebug: vi.fn()
    }));
    vi.doMock('./registry-watcher.js', () => ({
      registerWorkspace: vi.fn(),
      replaceDiscoveredWorkspaces: replace_discovered_workspaces,
      watchRegistry: vi.fn(() => ({ close() {} }))
    }));
    vi.doMock('./watcher.js', () => ({
      watchDb: vi.fn(() => ({ rebind: vi.fn() }))
    }));
    vi.doMock('./workspace-discovery.js', () => ({
      discoverWorkspaces: vi.fn(() => []),
      watchWorkspaceDiscovery: watch_workspace_discovery
    }));
    vi.doMock('./ws.js', () => ({
      attachWsServer: vi.fn(() => ({
        scheduleListRefresh: vi.fn(),
        broadcast,
        setWorkspace: vi.fn()
      }))
    }));

    await import('./index.js');

    expect(replace_discovered_workspaces).toHaveBeenNthCalledWith(1, []);
    expect(replace_discovered_workspaces).toHaveBeenNthCalledWith(2, [
      { path: '/repos/new', database: '/repos/new/.beads' }
    ]);
    expect(broadcast).toHaveBeenCalledWith('workspaces-updated', { count: 1 });
  });
});
