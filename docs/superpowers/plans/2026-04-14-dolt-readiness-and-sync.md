# Dolt readiness 안정화 및 workspace sync UX 추가 Implementation Plan
Parent bead: UI-cdq1

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Beads UI가 Dolt backend workspace 전환 시 안정적으로 board/list를
로드하고, 현재 workspace 기준 `Sync now`와 `Auto sync`로 원격 이슈를 동기화할 수
있게 한다.

**Architecture:** 서버는 daemon/subprocess PATH를 정규화하고, websocket
`sync-workspace` 액션에서 **non-sandbox** `bd dolt status/start/pull` readiness
흐름과 active subscription refresh를 직렬화한다. 또한 workspace
응답(`list-workspaces`, `get-workspace`, `set-workspace`, `sync-workspace`)에
`backend`/`can_sync` 정보를 포함해 클라이언트가 Dolt backend 여부를 추측하지
않게 한다. 클라이언트는 workspace picker 인접 UI에서 `Sync now`와 `Auto sync`를
제공하되, workspace 전환 직후 best-effort 1회 sync는 **단일 트리거 경로**에서만
실행해 `set-workspace` 응답과 `workspace-changed` broadcast가 겹쳐도 중복 sync가
발생하지 않게 한다.

**Tech Stack:** Node.js ESM, Express, ws, Lit HTML, Vitest, Beads CLI (`bd`),
Dolt backend

---

## File Structure

- `server/cli/daemon.js`
  - daemon spawn 시 PATH 정규화 helper를 적용한다.
- `server/bd.js`
  - `bd` subprocess env 정규화와 sync 전용 non-sandbox 실행 경로를 추가한다.
- `server/db.js`
  - workspace backend capability(`backend`, `can_sync`) 판별 helper를 추가하거나
    기존 resolver를 확장한다.
- `server/ws.js`
  - `sync-workspace` 처리, workspace sync lock, readiness/pull/refresh
    orchestration과 workspace capability payload 전파를 구현한다.
- `server/index.js`
  - 필요하면 startup 진단 로그를 최소 범위로 추가한다.
- `app/protocol.js`
  - `sync-workspace` 메시지 타입을 추가한다.
- `app/main.js`
  - sync 상태, 버튼 handler, auto-sync timer, workspace-switch background sync를
    연결한다.
- `app/views/workspace-picker.js`
  - `Sync now` 버튼과 `Auto sync` 선택 UI를 렌더링한다.
- `server/*.test.js`, `app/*.test.js`
  - PATH/readiness/sync/UI 동작을 검증한다.

## Task 1: PATH 정규화 helper와 daemon 적용

**Files:**

- Create: `server/env.js`
- Modify: `server/cli/daemon.js`
- Test: `server/env.test.js`

- [ ] **Step 1: PATH 정규화 helper 테스트를 먼저 작성한다**

```js
import { describe, expect, test } from 'vitest';
import { buildSpawnPath } from './env.js';

describe('buildSpawnPath', () => {
  test('prepends homebrew defaults when missing', () => {
    const result = buildSpawnPath('/usr/bin:/bin');

    expect(result.split(':').slice(0, 4)).toEqual([
      '/opt/homebrew/bin',
      '/usr/local/bin',
      '/usr/bin',
      '/bin'
    ]);
  });

  test('dedupes duplicate path entries while preserving order', () => {
    const result = buildSpawnPath(
      '/opt/homebrew/bin:/usr/bin:/opt/homebrew/bin'
    );

    expect(result.split(':')).toEqual([
      '/opt/homebrew/bin',
      '/usr/local/bin',
      '/usr/bin'
    ]);
  });
});
```

- [ ] **Step 2: 테스트를 실행해 실패를 확인한다**

Run: `npx vitest run server/env.test.js` Expected: FAIL with
`Cannot find module './env.js'` or missing export errors.

- [ ] **Step 3: PATH 정규화 helper를 구현한다**

```js
const DEFAULT_BIN_DIRS = ['/opt/homebrew/bin', '/usr/local/bin'];

/**
 * Build a stable PATH for daemon and subprocess execution.
 *
 * @param {string | undefined} raw_path
 * @returns {string}
 */
export function buildSpawnPath(raw_path) {
  /** @type {string[]} */
  const parts = [];
  /** @type {Set<string>} */
  const seen = new Set();

  for (const entry of [
    ...DEFAULT_BIN_DIRS,
    ...String(raw_path || '').split(':')
  ]) {
    const value = String(entry || '').trim();
    if (!value || seen.has(value)) {
      continue;
    }
    seen.add(value);
    parts.push(value);
  }

  return parts.join(':');
}
```

- [ ] **Step 4: daemon spawn env에 helper를 연결한다**

`server/cli/daemon.js`의 `startDaemon()`에서 `spawn_env` 생성 직후 아래를
추가한다.

```js
import { buildSpawnPath } from '../env.js';

const spawn_env = { ...process.env };
spawn_env.PATH = buildSpawnPath(spawn_env.PATH);
```

- [ ] **Step 5: 테스트를 다시 실행해 통과를 확인한다**

Run: `npx vitest run server/env.test.js` Expected: PASS

## Task 2: `bd` subprocess env 정규화와 non-sandbox sync 실행 경로 추가

**Files:**

- Modify: `server/bd.js`
- Test: `server/bd.test.js`
- Reference: `server/env.js`

- [ ] **Step 1: sync 전용 non-sandbox 경로 테스트를 먼저 추가한다**

`server/bd.test.js`에 아래 테스트를 추가한다.

```js
test('runBd keeps sandbox by default for list reads', async () => {
  await runBd(['list', '--json']);

  expect(spawn_mock).toHaveBeenCalled();
  const args = spawn_mock.mock.calls.at(-1)?.[1] || [];
  expect(args[0]).toBe('--sandbox');
});

test('runBdSync omits sandbox for sync commands', async () => {
  await runBdSync(['dolt', 'pull']);

  expect(spawn_mock).toHaveBeenCalled();
  const args = spawn_mock.mock.calls.at(-1)?.[1] || [];
  expect(args[0]).toBe('dolt');
});

test('runBd injects normalized PATH into spawn env', async () => {
  await runBd(['list', '--json'], { env: { PATH: '/usr/bin:/bin' } });

  const options = spawn_mock.mock.calls.at(-1)?.[2] || {};
  expect(
    String(options.env.PATH).startsWith('/opt/homebrew/bin:/usr/local/bin')
  ).toBe(true);
});
```

- [ ] **Step 2: 새 테스트만 실행해 실패를 확인한다**

Run:
`npx vitest run server/bd.test.js -t "runBdSync|normalized PATH|sandbox by default"`
Expected: FAIL because `runBdSync` does not exist and PATH normalization is not
implemented.

- [ ] **Step 3: `server/bd.js`에 env 정규화 helper와 sync 전용 실행 함수를
      추가한다**

```js
import { buildSpawnPath } from './env.js';

function buildSpawnEnv(options = {}) {
  const env_with_db = { ...(options.env || process.env) };
  env_with_db.PATH = buildSpawnPath(env_with_db.PATH);
  return env_with_db;
}

export function runBdSync(args, options = {}) {
  return withBdRunQueue(async () =>
    runBdUnlocked(args, { ...options, force_no_sandbox: true })
  );
}
```

그리고 `runBdUnlocked()` 내부에서:

```js
const env_with_db = buildSpawnEnv(options);
const final_args = options.force_no_sandbox ? args.slice() : buildBdArgs(args);
```

처럼 연결한다.

- [ ] **Step 4: targeted 테스트를 다시 실행해 통과를 확인한다**

Run:
`npx vitest run server/bd.test.js -t "runBdSync|normalized PATH|sandbox by default"`
Expected: PASS

## Task 3: server-side workspace sync orchestration 추가

**Files:**

- Modify: `server/ws.js`
- Test: `server/ws.sync-workspace.test.js`
- Reference: `server/bd.js`, `server/subscriptions.js`

- [ ] **Step 1: `sync-workspace` 성공 경로 테스트를 먼저 작성한다**

새 파일 `server/ws.sync-workspace.test.js`에 아래 골격을 추가한다.

```js
import { createServer } from 'node:http';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { WebSocket } from 'ws';
import { attachWsServer } from './ws.js';

const run_bd = vi.fn();
const run_bd_sync = vi.fn();
const fetch_list = vi.fn();

describe('sync-workspace', () => {
  test('starts dolt when needed, pulls, and refreshes active subscriptions', async () => {
    run_bd.mockResolvedValueOnce({
      code: 0,
      stdout: 'Dolt server: not running\n  Expected port: 0',
      stderr: ''
    });
    run_bd_sync.mockResolvedValueOnce({
      code: 0,
      stdout: 'started',
      stderr: ''
    });
    run_bd_sync.mockResolvedValueOnce({
      code: 0,
      stdout: 'pulled',
      stderr: ''
    });
    fetch_list.mockResolvedValue({ ok: true, items: [] });

    const server = createServer();
    attachWsServer(server, { path: '/ws', root_dir: process.cwd() });
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    const { port } = server.address();
    const ws = new WebSocket(`ws://127.0.0.1:${port}/ws`);

    const frames = [];
    ws.on('message', (buf) => frames.push(JSON.parse(String(buf))));
    await new Promise((resolve) =>
      ws.addEventListener('open', resolve, { once: true })
    );

    ws.send(
      JSON.stringify({
        id: 'sub-1',
        type: 'subscribe-list',
        payload: { id: 'blocked', type: 'blocked-issues' }
      })
    );
    await new Promise((resolve) => setTimeout(resolve, 0));

    ws.send(
      JSON.stringify({
        id: 'sync-1',
        type: 'sync-workspace',
        payload: { reason: 'manual' }
      })
    );
    await new Promise((resolve) => setTimeout(resolve, 0));

    const reply = frames.find((frame) => frame.id === 'sync-1');
    expect(reply?.ok).toBe(true);
    expect(reply?.payload.started_dolt).toBe(true);
    expect(reply?.payload.pulled).toBe(true);
  });
});
```

- [ ] **Step 2: sync 실패 분기 테스트를 함께 추가한다**

같은 파일에 다음 두 테스트를 추가한다.

```js
test('returns structured error when dolt start fails', async () => {
  run_bd.mockResolvedValueOnce({
    code: 0,
    stdout: 'Dolt server: not running\n  Expected port: 0',
    stderr: ''
  });
  run_bd_sync.mockResolvedValueOnce({
    code: 1,
    stdout: '',
    stderr: 'start failed'
  });

  const sock = {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    send(msg) {
      this.sent.push(String(msg));
    }
  };

  await handleMessage(
    /** @type {any} */ (sock),
    Buffer.from(
      JSON.stringify({
        id: 'sync-start-fail',
        type: 'sync-workspace',
        payload: { reason: 'manual' }
      })
    )
  );

  const reply = JSON.parse(sock.sent.at(-1));
  expect(reply.ok).toBe(false);
  expect(reply.error.code).toBe('bd_error');
  expect(reply.error.message).toContain('start failed');
});

test('returns structured error when pull fails without clearing local subscriptions', async () => {
  run_bd.mockResolvedValueOnce({
    code: 0,
    stdout: 'Dolt server: running\n  Port: 50000',
    stderr: ''
  });
  run_bd_sync.mockResolvedValueOnce({
    code: 1,
    stdout: '',
    stderr: 'pull failed'
  });

  const sock = {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    send(msg) {
      this.sent.push(String(msg));
    }
  };

  await handleMessage(
    /** @type {any} */ (sock),
    Buffer.from(
      JSON.stringify({
        id: 'sub-before-pull-fail',
        type: 'subscribe-list',
        payload: { id: 'blocked', type: 'blocked-issues' }
      })
    )
  );

  await handleMessage(
    /** @type {any} */ (sock),
    Buffer.from(
      JSON.stringify({
        id: 'sync-pull-fail',
        type: 'sync-workspace',
        payload: { reason: 'manual' }
      })
    )
  );

  const reply = JSON.parse(sock.sent.at(-1));
  expect(reply.ok).toBe(false);
  expect(reply.error.message).toContain('pull failed');
  expect(
    registry.get(keyOf({ type: 'blocked-issues' }))?.subscribers.size
  ).toBeGreaterThan(0);
});

test('rejects sync-workspace for a workspace with can_sync=false', async () => {
  const sock = {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    send(msg) {
      this.sent.push(String(msg));
    }
  };

  await handleMessage(
    /** @type {any} */ (sock),
    Buffer.from(
      JSON.stringify({
        id: 'sync-disabled',
        type: 'sync-workspace',
        payload: { path: '/tmp/sqlite-only', reason: 'manual' }
      })
    )
  );

  const reply = JSON.parse(sock.sent.at(-1));
  expect(reply.ok).toBe(false);
  expect(reply.error.code).toBe('bad_request');
});
```

- [ ] **Step 3: 새 테스트를 실행해 실패를 확인한다**

Run: `npx vitest run server/ws.sync-workspace.test.js` Expected: FAIL because
`sync-workspace` handler does not exist.

- [ ] **Step 4: `server/ws.js`와 workspace capability helper를 추가한다**

`server/ws.js` 상단 import를 확장하고, `server/db.js`에 `getWorkspaceSyncInfo()`
같은 작은 helper를 추가한다.

```js
import { getGitUserName, runBd, runBdJson, runBdSync } from './bd.js';
import { getWorkspaceSyncInfo, resolveWorkspaceDatabase } from './db.js';
```

그리고 `refreshAndPublish()` 아래에 helper를 추가한다.

```js
/** @type {Map<string, Promise<void>>} */
const WORKSPACE_SYNC_LOCKS = new Map();

async function withWorkspaceSyncLock(workspace_path, fn) {
  const previous =
    WORKSPACE_SYNC_LOCKS.get(workspace_path) || Promise.resolve();
  /** @type {() => void} */
  let release = () => {};
  const current = new Promise((resolve) => {
    release = resolve;
  });
  WORKSPACE_SYNC_LOCKS.set(workspace_path, current);
  await previous.catch(() => {});
  try {
    return await fn();
  } finally {
    release();
    if (WORKSPACE_SYNC_LOCKS.get(workspace_path) === current) {
      WORKSPACE_SYNC_LOCKS.delete(workspace_path);
    }
  }
}
```

- [ ] **Step 5: `sync-workspace` 메시지 handler를 구현한다**

`set-workspace` handler 아래에 아래 흐름을 추가한다.

```js
if (req.type === 'sync-workspace') {
  const requested_path =
    typeof (req.payload || {}).path === 'string'
      ? String((req.payload || {}).path).trim()
      : '';
  const base_workspace_root = requested_path || CURRENT_WORKSPACE?.root_dir || '';
  const reason = String((req.payload || {}).reason || 'manual');

  if (!base_workspace_root) {
    ws.send(JSON.stringify(makeError(req, 'bad_request', 'No workspace selected')));
    return;
  }
  const workspace_root = path.resolve(base_workspace_root);
  const workspace_info = getWorkspaceSyncInfo({ cwd: workspace_root });
  if (!workspace_info.can_sync) {
    ws.send(JSON.stringify(makeError(req, 'bad_request', 'Workspace does not support Dolt sync', {
      workspace_root
    })));
    return;
  }

  try {
    const result = await withWorkspaceSyncLock(workspace_root, async () => {
      const status = await runBdSync(['dolt', 'status'], { cwd: workspace_root });
      const status_text = `${status.stdout}\n${status.stderr}`;
      let started_dolt = false;
      if (/not running|Expected port:\s*0/.test(status_text)) {
        const started = await runBdSync(['dolt', 'start'], { cwd: workspace_root });
        if (started.code !== 0) {
          throw new Error(started.stderr || 'Failed to start Dolt server');
        }
        started_dolt = true;
      }

      const pulled = await runBdSync(['dolt', 'pull'], { cwd: workspace_root });
      if (pulled.code !== 0) {
        throw new Error(pulled.stderr || 'Failed to pull workspace');
      }

      if (CURRENT_WORKSPACE?.root_dir === workspace_root) {
        await refreshAllActiveListSubscriptions();
      }

      return {
        workspace: {
          root_dir: workspace_root,
          db_path: resolveWorkspaceDatabase({ cwd: workspace_root }).path,
          backend: workspace_info.backend,
          can_sync: workspace_info.can_sync
        },
        started_dolt,
        pulled: true,
        refreshed: CURRENT_WORKSPACE?.root_dir === workspace_root
      };
    });

    ws.send(JSON.stringify(makeOk(req, result)));
  } catch (err) {
    ws.send(JSON.stringify(makeError(req, 'bd_error', String(err && err.message ? err.message : err), {
      workspace_root,
      reason
    })));
  }
  return;
}
```

- [ ] **Step 6: targeted 테스트를 다시 실행해 통과를 확인한다**

Run: `npx vitest run server/ws.sync-workspace.test.js` Expected: PASS

## Task 4: protocol 및 UI 상태 wiring 추가

**Files:**

- Modify: `app/protocol.js`
- Modify: `app/main.js`
- Test: `app/main.sync-workspace.test.js`

- [ ] **Step 1: protocol + client flow 테스트를 먼저 추가한다**

`app/main.sync-workspace.test.js`에 아래 시나리오를 추가한다.

```js
test('clicking Sync now sends sync-workspace for current workspace', async () => {
  vi.useFakeTimers();
  CLIENT = {
    send: vi.fn(async (type) => {
      if (type === 'list-workspaces') {
        return {
          workspaces: [
            {
              path: '/tmp/demo',
              database: '/tmp/demo/.beads',
              backend: 'dolt',
              can_sync: true
            }
          ],
          current: {
            root_dir: '/tmp/demo',
            db_path: '/tmp/demo/.beads',
            backend: 'dolt',
            can_sync: true
          }
        };
      }
      if (type === 'sync-workspace') {
        return {
          workspace: {
            root_dir: '/tmp/demo',
            db_path: '/tmp/demo/.beads',
            backend: 'dolt',
            can_sync: true
          },
          pulled: true
        };
      }
      return {
        changed: false,
        workspace: {
          root_dir: '/tmp/demo',
          db_path: '/tmp/demo/.beads',
          backend: 'dolt',
          can_sync: true
        }
      };
    }),
    on() {
      return () => {};
    },
    onConnection() {
      return () => {};
    },
    close() {},
    getState() {
      return 'open';
    }
  };
  document.body.innerHTML =
    '<header id="top-nav"></header><div id="header-loading"></div><main id="app"></main>';
  bootstrap(document.getElementById('app'));
  await Promise.resolve();
  await Promise.resolve();

  document.getElementById('sync-now-btn')?.click();
  await Promise.resolve();

  expect(CLIENT.send).toHaveBeenCalledWith('sync-workspace', {
    reason: 'manual',
    path: '/tmp/demo'
  });
});

test('workspace switch triggers one best-effort sync', async () => {
  CLIENT = {
    send: vi.fn(async (type, payload) => {
      if (type === 'list-workspaces') {
        return {
          workspaces: [
            {
              path: '/tmp/a',
              database: '/tmp/a/.beads',
              backend: 'dolt',
              can_sync: true
            },
            {
              path: '/tmp/b',
              database: '/tmp/b/.beads',
              backend: 'dolt',
              can_sync: true
            }
          ],
          current: {
            root_dir: '/tmp/a',
            db_path: '/tmp/a/.beads',
            backend: 'dolt',
            can_sync: true
          }
        };
      }
      if (type === 'set-workspace') {
        return {
          changed: true,
          workspace: {
            root_dir: payload.path,
            db_path: payload.path + '/.beads',
            backend: 'dolt',
            can_sync: true
          }
        };
      }
      if (type === 'sync-workspace') {
        return {
          workspace: {
            root_dir: payload.path || '/tmp/b',
            db_path: '/tmp/b/.beads',
            backend: 'dolt',
            can_sync: true
          },
          pulled: true
        };
      }
      return null;
    }),
    on() {
      return () => {};
    },
    onConnection() {
      return () => {};
    },
    close() {},
    getState() {
      return 'open';
    }
  };
  document.body.innerHTML =
    '<header id="top-nav"></header><div id="header-loading"></div><main id="app"></main>';
  bootstrap(document.getElementById('app'));
  await Promise.resolve();
  await Promise.resolve();

  const picker = document.querySelector('select');
  picker.value = '/tmp/b';
  picker.dispatchEvent(new Event('change'));
  await Promise.resolve();
  await Promise.resolve();

  expect(CLIENT.send).toHaveBeenCalledWith('sync-workspace', {
    reason: 'workspace-switch',
    path: '/tmp/b'
  });
});

test('auto sync interval sends sync-workspace repeatedly for current workspace', async () => {
  vi.useFakeTimers();
  window.localStorage.setItem('beads-ui.auto-sync', '30s');
  CLIENT = {
    send: vi.fn(async (type) => {
      if (type === 'list-workspaces') {
        return {
          workspaces: [
            {
              path: '/tmp/demo',
              database: '/tmp/demo/.beads',
              backend: 'dolt',
              can_sync: true
            }
          ],
          current: {
            root_dir: '/tmp/demo',
            db_path: '/tmp/demo/.beads',
            backend: 'dolt',
            can_sync: true
          }
        };
      }
      if (type === 'sync-workspace') {
        return {
          workspace: {
            root_dir: '/tmp/demo',
            db_path: '/tmp/demo/.beads',
            backend: 'dolt',
            can_sync: true
          },
          pulled: true
        };
      }
      return null;
    }),
    on() {
      return () => {};
    },
    onConnection() {
      return () => {};
    },
    close() {},
    getState() {
      return 'open';
    }
  };
  document.body.innerHTML =
    '<header id="top-nav"></header><div id="header-loading"></div><main id="app"></main>';
  bootstrap(document.getElementById('app'));
  await Promise.resolve();
  await Promise.resolve();

  await vi.advanceTimersByTimeAsync(30000);
  expect(CLIENT.send).toHaveBeenCalledWith('sync-workspace', {
    reason: 'auto',
    path: '/tmp/demo'
  });
});
```

- [ ] **Step 2: 새 테스트를 실행해 실패를 확인한다**

Run: `npx vitest run app/main.sync-workspace.test.js` Expected: FAIL because the
UI has no sync button/state/interval logic.

- [ ] **Step 3: protocol에 `sync-workspace` 타입을 추가한다**

`app/protocol.js`의 `MessageType` 정의와 허용 타입 목록에 아래를 추가한다.

```js
'sync-workspace';
```

- [ ] **Step 4: `app/main.js`에 sync 상태와 helper를 추가한다**

`bootstrap()` 내부에 아래 state/helper를 추가한다.

```js
let is_syncing = false;
let auto_sync_mode = window.localStorage.getItem('beads-ui.auto-sync') || 'off';
let auto_sync_timer = null;

async function syncCurrentWorkspace(reason = 'manual') {
  const current = store.getState().workspace.current;
  if (!current || !current.can_sync || is_syncing) {
    return;
  }
  is_syncing = true;
  rerenderNav();
  try {
    await client.send('sync-workspace', { reason, path: current.path });
    showToast('Synced ' + getProjectName(current.path), 'success', 2000);
  } catch (err) {
    log('workspace sync failed: %o', err);
    showToast('Sync failed for ' + getProjectName(current.path), 'error', 3000);
  } finally {
    is_syncing = false;
    rerenderNav();
  }
}
```

- [ ] **Step 5: workspace backend metadata와 중복 없는 workspace-switch sync
      경로를 연결한다**

`list-workspaces` / `set-workspace` / `workspace-changed`에서 `backend`와
`can_sync`를 store에 반영한다. 이 metadata는 `server/ws.js` response
assembly에서 `getAvailableWorkspaces()` 결과와 `resolveWorkspaceDatabase()` /
`getWorkspaceSyncInfo()`를 합쳐 만든다. workspace 전환 직후 1회 sync의
**authoritative trigger는 `handleWorkspaceChange()`의 `set-workspace` 성공 응답
경로 하나만** 사용한다. `workspace-changed` broadcast는 state 갱신과 workspace
목록 reload만 담당하고, sync는 재호출하지 않는다.

```js
if (result.changed) {
  void syncCurrentWorkspace('workspace-switch');
}
resetAutoSyncTimer();
```

또한 helper를 추가한다.

```js
function resetAutoSyncTimer() {
  if (auto_sync_timer) {
    clearInterval(auto_sync_timer);
    auto_sync_timer = null;
  }
  const current = store.getState().workspace.current;
  const interval_ms =
    auto_sync_mode === '30s' ? 30000 : auto_sync_mode === '60s' ? 60000 : 0;
  if (!current || !current.can_sync || interval_ms === 0) {
    return;
  }
  auto_sync_timer = setInterval(() => {
    void syncCurrentWorkspace('auto');
  }, interval_ms);
}
```

- [ ] **Step 6: targeted UI tests를 다시 실행해 통과를 확인한다**

Run: `npx vitest run app/main.sync-workspace.test.js` Expected: PASS

## Task 5: `Sync now` / `Auto sync` UI 렌더링 추가

**Files:**

- Modify: `app/views/workspace-picker.js`
- Modify: `app/main.js`
- Test: `app/main.sync-workspace.test.js`

- [ ] **Step 1: nav UI 렌더링 테스트를 먼저 추가한다**

기존 test 파일 또는 `app/main.sync-workspace.test.js`에 아래 검증을 추가한다.

```js
test('renders Sync now button near workspace picker', async () => {
  CLIENT = {
    send: vi.fn(async (type) => {
      if (type === 'list-workspaces') {
        return {
          workspaces: [
            {
              path: '/tmp/demo',
              database: '/tmp/demo/.beads',
              backend: 'dolt',
              can_sync: true
            }
          ],
          current: {
            root_dir: '/tmp/demo',
            db_path: '/tmp/demo/.beads',
            backend: 'dolt',
            can_sync: true
          }
        };
      }
      return null;
    }),
    on() {
      return () => {};
    },
    onConnection() {
      return () => {};
    },
    close() {},
    getState() {
      return 'open';
    }
  };
  document.body.innerHTML =
    '<header id="top-nav"></header><div id="header-loading"></div><main id="app"></main>';
  bootstrap(document.getElementById('app'));
  await Promise.resolve();
  await Promise.resolve();

  expect(document.getElementById('sync-now-btn')?.textContent).toContain(
    'Sync'
  );
});

test('disables Sync now while sync is in progress', async () => {
  let resolve_sync = () => {};
  CLIENT = {
    send: vi.fn(async (type) => {
      if (type === 'list-workspaces') {
        return {
          workspaces: [{ path: '/tmp/demo', database: '/tmp/demo/.beads' }],
          current: { root_dir: '/tmp/demo', db_path: '/tmp/demo/.beads' }
        };
      }
      if (type === 'sync-workspace') {
        return await new Promise((resolve) => {
          resolve_sync = () =>
            resolve({
              workspace: {
                root_dir: '/tmp/demo',
                db_path: '/tmp/demo/.beads',
                backend: 'dolt',
                can_sync: true
              },
              pulled: true
            });
        });
      }
      return null;
    }),
    on() {
      return () => {};
    },
    onConnection() {
      return () => {};
    },
    close() {},
    getState() {
      return 'open';
    }
  };
  document.body.innerHTML =
    '<header id="top-nav"></header><div id="header-loading"></div><main id="app"></main>';
  bootstrap(document.getElementById('app'));
  await Promise.resolve();
  await Promise.resolve();

  const button = document.getElementById('sync-now-btn');
  button.click();
  await Promise.resolve();
  expect(button.disabled).toBe(true);
  resolve_sync();
  await Promise.resolve();
});

test('persists auto sync selection in localStorage', async () => {
  CLIENT = {
    send: vi.fn(async (type) => {
      if (type === 'list-workspaces') {
        return {
          workspaces: [
            {
              path: '/tmp/demo',
              database: '/tmp/demo/.beads',
              backend: 'dolt',
              can_sync: true
            }
          ],
          current: {
            root_dir: '/tmp/demo',
            db_path: '/tmp/demo/.beads',
            backend: 'dolt',
            can_sync: true
          }
        };
      }
      return null;
    }),
    on() {
      return () => {};
    },
    onConnection() {
      return () => {};
    },
    close() {},
    getState() {
      return 'open';
    }
  };
  document.body.innerHTML =
    '<header id="top-nav"></header><div id="header-loading"></div><main id="app"></main>';
  bootstrap(document.getElementById('app'));
  await Promise.resolve();
  await Promise.resolve();

  const select = document.getElementById('auto-sync-select');
  select.value = '60s';
  select.dispatchEvent(new Event('change'));
  expect(window.localStorage.getItem('beads-ui.auto-sync')).toBe('60s');
});

test('disables Sync now and skips auto sync for a workspace with can_sync=false', async () => {
  vi.useFakeTimers();
  window.localStorage.setItem('beads-ui.auto-sync', '30s');
  CLIENT = {
    send: vi.fn(async (type) => {
      if (type === 'list-workspaces') {
        return {
          workspaces: [
            {
              path: '/tmp/sqlite-only',
              database: '/tmp/sqlite-only/.beads/default.db',
              backend: 'sqlite',
              can_sync: false
            }
          ],
          current: {
            root_dir: '/tmp/sqlite-only',
            db_path: '/tmp/sqlite-only/.beads/default.db',
            backend: 'sqlite',
            can_sync: false
          }
        };
      }
      return null;
    }),
    on() {
      return () => {};
    },
    onConnection() {
      return () => {};
    },
    close() {},
    getState() {
      return 'open';
    }
  };
  document.body.innerHTML =
    '<header id=\"top-nav\"></header><div id=\"header-loading\"></div><main id=\"app\"></main>';
  bootstrap(document.getElementById('app'));
  await Promise.resolve();
  await Promise.resolve();

  expect(
    document.getElementById('sync-now-btn')?.hasAttribute('disabled')
  ).toBe(true);
  await vi.advanceTimersByTimeAsync(30000);
  expect(CLIENT.send).not.toHaveBeenCalledWith(
    'sync-workspace',
    expect.anything()
  );
});
```

- [ ] **Step 2: 새 UI 테스트를 실행해 실패를 확인한다**

Run: `npx vitest run app/main.sync-workspace.test.js -t "Sync now|auto sync"`
Expected: FAIL because the controls do not exist.

- [ ] **Step 3: nav 또는 workspace picker에 controls를 추가한다**

`app/views/workspace-picker.js`에 아래 props를 받도록 확장한다.

```js
{
  (on_sync_now,
    is_syncing,
    auto_sync_mode,
    on_auto_sync_change,
    sync_disabled,
    sync_unavailable_reason);
}
```

렌더링 예시는 다음과 같다.

```js
html`
  <button
    id="sync-now-btn"
    ?disabled=${sync_disabled || is_syncing}
    @click=${() => on_sync_now()}
  >
    ${is_syncing ? 'Syncing…' : 'Sync now'}
  </button>
  <label>
    Auto sync
    <select
      id="auto-sync-select"
      .value=${auto_sync_mode}
      @change=${(ev) => on_auto_sync_change(ev.target.value)}
    >
      <option value="off">Off</option>
      <option value="30s">30s</option>
      <option value="60s">60s</option>
    </select>
  </label>
`;
```

- [ ] **Step 4: `app/main.js`에서 nav에 새 props를 넘기고 localStorage를
      연결한다**

```js
function handleAutoSyncChange(next_mode) {
  auto_sync_mode = next_mode;
  window.localStorage.setItem('beads-ui.auto-sync', next_mode);
  resetAutoSyncTimer();
  rerenderNav();
}
```

`createTopNav(...)` 호출 또는 nav render path에 아래 값을 넘긴다.

```js
on_sync_now: () => void syncCurrentWorkspace('manual'),
is_syncing,
auto_sync_mode,
on_auto_sync_change: handleAutoSyncChange,
sync_disabled: !store.getState().workspace.current || !store.getState().workspace.current.can_sync
```

workspace metadata는 서버에서 `resolveWorkspaceDatabase()` 결과를 바탕으로
계산한다. 초기 구현에서는 `source === 'metadata'`이면
`backend: 'dolt', can_sync: true`, 그 외는
`backend: 'sqlite', can_sync: false`로 다룬다. 이렇게 하면 `Sync now` 비활성
조건을 UI가 추측하지 않고 서버 truth를 사용한다.

- [ ] **Step 5: targeted UI 테스트를 다시 실행해 통과를 확인한다**

Run: `npx vitest run app/main.sync-workspace.test.js -t "Sync now|auto sync"`
Expected: PASS

## Task 6: sync 이후 refresh / stale result guard 보강

**Files:**

- Modify: `app/main.js`
- Modify: `server/ws.js`
- Test: `server/ws.sync-workspace.test.js`
- Test: `app/main.sync-workspace.test.js`

- [ ] **Step 1: stale workspace sync 결과 무시 테스트를 추가한다**

```js
test('ignores sync completion for a workspace that is no longer current', async () => {
  let resolve_sync = () => {};
  CLIENT = {
    send: vi.fn(async (type, payload) => {
      if (type === 'list-workspaces') {
        return {
          workspaces: [
            {
              path: '/tmp/a',
              database: '/tmp/a/.beads',
              backend: 'dolt',
              can_sync: true
            },
            {
              path: '/tmp/b',
              database: '/tmp/b/.beads',
              backend: 'dolt',
              can_sync: true
            }
          ],
          current: {
            root_dir: '/tmp/a',
            db_path: '/tmp/a/.beads',
            backend: 'dolt',
            can_sync: true
          }
        };
      }
      if (type === 'sync-workspace') {
        return await new Promise((resolve) => {
          resolve_sync = () =>
            resolve({
              workspace: {
                root_dir: payload.path,
                db_path: payload.path + '/.beads',
                backend: 'dolt',
                can_sync: true
              },
              pulled: true
            });
        });
      }
      if (type === 'set-workspace') {
        return {
          changed: true,
          workspace: {
            root_dir: payload.path,
            db_path: payload.path + '/.beads',
            backend: 'dolt',
            can_sync: true
          }
        };
      }
      return null;
    }),
    on() {
      return () => {};
    },
    onConnection() {
      return () => {};
    },
    close() {},
    getState() {
      return 'open';
    }
  };
  document.body.innerHTML =
    '<header id="top-nav"></header><div id="header-loading"></div><main id="app"></main>';
  bootstrap(document.getElementById('app'));
  await Promise.resolve();
  await Promise.resolve();

  document.getElementById('sync-now-btn')?.click();
  const picker = document.querySelector('select');
  picker.value = '/tmp/b';
  picker.dispatchEvent(new Event('change'));
  resolve_sync();
  await Promise.resolve();
  expect(
    Array.from(document.querySelectorAll('.toast')).every(
      (el) => !(el.textContent || '').includes('/tmp/a')
    )
  ).toBe(true);
});
```

서버 쪽에도 아래 테스트를 추가한다.

```js
test('does not refresh active subscriptions for stale workspace after switch', async () => {
  const sock = {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    send(msg) {
      this.sent.push(String(msg));
    }
  };

  /** @type {(value: { code: number, stdout: string, stderr: string }) => void} */
  let resolve_pull = () => {};
  run_bd.mockResolvedValueOnce({ code: 0, stdout: 'Dolt server: running
  Port: 50000', stderr: '' });
  run_bd_sync.mockImplementationOnce(() => new Promise((resolve) => {
    resolve_pull = resolve;
  }));

  const sync_promise = handleMessage(
    /** @type {any} */ (sock),
    Buffer.from(JSON.stringify({ id: 'sync-stale', type: 'sync-workspace', payload: { path: '/tmp/a', reason: 'manual' } }))
  );
  CURRENT_WORKSPACE = { root_dir: '/tmp/b', db_path: '/tmp/b/.beads' };
  resolve_pull({ code: 0, stdout: 'pulled', stderr: '' });
  await sync_promise;
  expect(refresh_all_active_list_subscriptions).not.toHaveBeenCalled();
});
```

- [ ] **Step 2: 새 stale-result 테스트를 실행해 실패를 확인한다**

Run:
`npx vitest run server/ws.sync-workspace.test.js app/main.sync-workspace.test.js -t "stale workspace|no longer current"`
Expected: FAIL because stale sync results are not guarded.

- [ ] **Step 3: client/server에 current workspace guard를 추가한다**

클라이언트 `syncCurrentWorkspace()`에서 시작 시점 workspace path를 캡처하고
finally 직전 current workspace와 비교한다.

```js
const started_for = current.path;
...
const still_current = store.getState().workspace.current?.path === started_for;
if (still_current) {
  showToast('Synced ' + getProjectName(started_for), 'success', 2000);
}
```

서버 `sync-workspace` handler에서는 pull 완료 후 아래 가드를 둔다.

```js
const is_current_workspace = CURRENT_WORKSPACE?.root_dir === workspace_root;
if (is_current_workspace) {
  await refreshAllActiveListSubscriptions();
}
```

- [ ] **Step 4: stale-result 테스트를 다시 실행해 통과를 확인한다**

Run:
`npx vitest run server/ws.sync-workspace.test.js app/main.sync-workspace.test.js -t "stale workspace|no longer current"`
Expected: PASS

## Task 7: 통합 회귀 검증

**Files:**

- Modify: `server/ws.test.js` (필요 시)
- Modify: `app/main.ws-toast.test.js` (필요 시)
- Verify only: 기존 관련 테스트 파일 전반

- [ ] **Step 1: 서버 관련 전체 대상 테스트를 실행한다**

Run:
`npx vitest run server/bd.test.js server/env.test.js server/ws.sync-workspace.test.js server/ws.list-subscriptions.test.js server/ws.mutation-window.test.js`
Expected: PASS

- [ ] **Step 2: 앱 관련 전체 대상 테스트를 실행한다**

Run:
`npx vitest run app/main.sync-workspace.test.js app/main.ws-toast.test.js app/main.board-switch.test.js app/main.test.js`
Expected: PASS

- [ ] **Step 3: 타입 검사와 린트를 실행한다**

Run: `npm run tsc && npm run lint` Expected: PASS

- [ ] **Step 4: 최종 전체 검증을 실행한다**

Run: `npm test && npm run prettier:write` Expected: PASS, formatting applied
with no remaining failures.

- [ ] **Step 5: 수동 smoke 확인을 수행한다**

Run: `npm start` Expected:

- workspace picker에서 `beads-ui`, `dotfiles`, `oliveyoung` 전환 시 board가
  fatal error 없이 열린다.
- `Sync now` 클릭 시 success/error toast가 뜬다.
- `Auto sync`를 `30s` 또는 `60s`로 바꾸면 해당 주기에 sync 요청이 발생한다.
- workspace 전환 직후 background sync가 한 번 실행된다.

## Self-Review Checklist

- spec의 두 축(근본 안정화 + sync UX)이 모두 task로 매핑되었다.
- 빈칸 주석이나 모호한 지시 없이 파일/명령/코드 스니펫을 각 task에 포함했다.
- `sync-workspace`, `runBdSync`, `buildSpawnPath`, `resetAutoSyncTimer`,
  `syncCurrentWorkspace` 등 이름을 plan 전체에서 일관되게 사용했다.
- skill artifact는 건드리지 않으므로 `writing-skills` / `skill-creator` 라우팅은
  필요 없다.
- 기존 parent bead 후보 `UI-nl9g`는 workspace discovery watcher 후속 안정화
  범위라 이번 plan과 완전히 일치하지 않으므로, 잘못된 parent에 metadata.plan을
  덮어쓰지 않는다.
