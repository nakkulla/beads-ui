# bdui config.toml 통합과 컬럼형 scroll contract 정리 Implementation Plan

Parent bead: UI-ypjz

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** `beads-ui` 안에서 `~/.config/bdui/config.toml` 기반 설정/워크스페이스
계약을 도입하고, Board/Worker를 viewport-bounded 내부 scroll contract로
정리한다.

**Architecture:** 서버는 `server/config.js`에서 TOML을 정규화해 label policy와
workspace config를 함께 읽고,
`server/workspace-discovery.js`/`server/index.js`/`server/ws.js`가 이를 사용해
startup current workspace와 `set-workspace` 검증을 일관되게 처리한다.
프런트엔드는 bootstrap/refresh config와 `list-workspaces` 응답을 함께 사용해
`default_workspace` 우선 정책을 지키고, layout은 route shell → body shell →
scroll owner 체인에 `min-height: 0`/`overflow` 계약을 부여해 page-level scroll을
줄인다.

**Tech Stack:** ECMAScript modules, Express, WebSocket handlers, Lit HTML
rendering, CSS, Vitest, ESLint, TypeScript JSDoc checking, Prettier,
`smol-toml`, bd CLI

**Scope note:** 이 plan은 `beads-ui` repo의 consumer workstream A를 직접
구현하고, `dotfiles` provider/shared-wrapper 전환은 반드시 follow-up bead로
캡처하는 `accepted_with_followup` 경로를 전제로 한다. shared rollout
completion은 이 plan의 완료 조건이 아니다.

---

## File Structure

- `package.json` — TOML parser dependency 추가
- `server/config.js` — TOML loader, path normalization, UI bootstrap config
  source of truth
- `server/config.test.js` — TOML parse / fallback / normalization regression
  coverage
- `server/workspace-discovery.js` — `scan_roots` + explicit `workspaces` merge,
  startup workspace helper
- `server/workspace-discovery.test.js` — discovery merge/dedupe/invalid-entry
  coverage
- `server/index.js` — normalized config 기반 startup workspace 등록/선택
- `server/ws.js` — `list-workspaces` / `set-workspace` current + allowed-path
  contract
- `server/ws.test.js` — websocket workspace validation coverage
- `server/app.js` — bootstrap `/api/config` payload에 normalized workspace
  config 노출
- `app/main.js` — bootstrap config hydration, saved workspace hint precedence,
  workspace restore policy
- `app/state.js` — config state shape 확장 정규화
- `app/state.test.js` — expanded config state regression
- `app/main.workspace-sync.test.js` — existing sync path 유지 확인
- `app/main.workspace-default.test.js` — `default_workspace` vs localStorage
  precedence regression coverage
- `app/styles.css` — board/worker route shell, body shell, scroll owner contract
- `app/views/board.test.js` — board scroll CSS/DOM contract regression
- `app/views/worker.test.js` — worker pane shell/body contract regression
- `app/views/worker-detail.test.js` — worker detail scroll owner contract
  regression

### Task 1: TOML runtime config loader를 도입한다

**Files:**

- Modify: `package.json`
- Modify: `server/config.js`
- Modify: `server/config.test.js`

- [ ] **Step 1: `config.toml` parse / fallback / normalization 실패 테스트를
      먼저 추가한다**

```js
process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
default_workspace = "/repo-a"
scan_roots = ["/scan-a", "", "relative/path"]
workspaces = ["/repo-b", "/repo-b"]

[labels]
visible_prefixes = ["has:", "reviewed:", "area:"]
`);

const config = getConfig();

expect(config.label_display_policy.visible_prefixes).toEqual([
  'has:',
  'reviewed:',
  'area:'
]);
expect(config.workspace_config).toEqual({
  default_workspace: '/repo-a',
  scan_roots: ['/scan-a'],
  workspaces: ['/repo-b']
});
```

```js
process.env.BDUI_CONFIG_PATH = writeBrokenTomlFixture('default_workspace = [');

const config = getConfig();

expect(config.workspace_config).toEqual({
  default_workspace: null,
  scan_roots: [],
  workspaces: []
});
expect(config.label_display_policy.visible_prefixes).toEqual([
  'has:',
  'reviewed:'
]);
```

- [ ] **Step 2: targeted test를 실행해 JSON-only loader가 새 계약을 못
      만족하는지 확인한다**

Run: `npm test -- server/config.test.js` Expected: TOML fixture parse
assertion과 `workspace_config` shape assertion이 FAIL 한다.

- [ ] **Step 3: `smol-toml`을 추가하고 `server/config.js`를 TOML 기반 normalized
      config loader로 바꾼다**

```json
{
  "dependencies": {
    "smol-toml": "^1.6.1"
  }
}
```

```js
import { parse as parseToml } from 'smol-toml';

const DEFAULT_WORKSPACE_CONFIG = {
  default_workspace: null,
  scan_roots: [],
  workspaces: []
};

function normalizeWorkspacePath(value) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return null;
  }
  if (!path.isAbsolute(value)) {
    return null;
  }
  return path.resolve(value);
}
```

```js
function readRuntimeConfig(config_path) {
  try {
    const parsed = parseToml(fs.readFileSync(config_path, 'utf8'));
    return {
      label_display_policy: {
        visible_prefixes: normalizeVisiblePrefixes(
          parsed?.labels?.visible_prefixes
        )
      },
      workspace_config: normalizeWorkspaceConfig(parsed)
    };
  } catch (error) {
    log('invalid bdui config %s: %o', config_path, error);
    return {
      label_display_policy: {
        visible_prefixes: DEFAULT_VISIBLE_PREFIXES.slice()
      },
      workspace_config: { ...DEFAULT_WORKSPACE_CONFIG }
    };
  }
}
```

- [ ] **Step 4: `getConfig()` 반환 shape를 확장하고 default config path를
      `config.toml`로 바꾼다**

```js
const config_path =
  process.env.BDUI_CONFIG_PATH ||
  path.join(os.homedir(), '.config', 'bdui', 'config.toml');

const runtime_config = readRuntimeConfig(config_path);

return {
  host: host_value,
  port: port_value,
  app_dir: path.resolve(package_root, 'app'),
  root_dir,
  frontend_mode,
  url: `http://${host_value}:${port_value}`,
  config_path,
  ...runtime_config
};
```

- [ ] **Step 5: config regression tests를 다시 실행해 loader contract를
      고정한다**

Run: `npm test -- server/config.test.js` Expected: PASS

- [ ] **Step 6: 변경 파일 목록과 verification evidence를 task 메모로 정리한다**

```md
Touched files: <task에 명시된 파일들> Verification: <바로 위 targeted command
PASS>
```

### Task 2: workspace discovery / startup current / set-workspace 검증을 통합한다

**Files:**

- Modify: `server/workspace-discovery.js`
- Modify: `server/workspace-discovery.test.js`
- Modify: `server/index.js`
- Modify: `server/ws.js`
- Modify: `server/ws.test.js`

- [ ] **Step 1: explicit workspaces + scan merge + unknown path reject에 대한
      failing tests를 추가한다**

```js
const result = discoverWorkspaces({
  workspace_config: {
    default_workspace: '/repo-b',
    scan_roots: [scan_dir],
    workspaces: ['/repo-a', '/repo-a', '/relative-rejected']
  }
});

expect(result.map((ws) => ws.path)).toEqual(['/repo-a', '/repo-b']);
```

```js
await handleMessage(
  ws,
  Buffer.from(
    JSON.stringify({
      id: '1',
      type: 'set-workspace',
      payload: { path: '/outside-configured' }
    })
  )
);

const reply = JSON.parse(ws.sent.at(-1));
expect(reply.ok).toBe(false);
expect(reply.error.code).toBe('bad_request');
```

- [ ] **Step 2: targeted tests를 실행해 legacy conf reader와 unrestricted
      `set-workspace`가 실패하는지 확인한다**

Run: `npm test -- server/workspace-discovery.test.js server/ws.test.js`
Expected: explicit `workspaces` merge assertion과 unknown path reject
assertion이 FAIL 한다.

- [ ] **Step 3: `discoverWorkspaces()`를 normalized config 입력 기반으로
      재작성하고 startup workspace helper를 추가한다**

```js
export function discoverWorkspaces({ workspace_config }) {
  const explicit = collectExplicitWorkspaces(workspace_config.workspaces);
  const scanned = collectScanRootWorkspaces(workspace_config.scan_roots);
  return dedupeWorkspaces([...explicit, ...scanned]);
}

export function resolveStartupWorkspace({
  configured_workspaces,
  default_workspace,
  cwd
}) {
  if (
    default_workspace &&
    hasWorkspace(configured_workspaces, default_workspace)
  ) {
    return default_workspace;
  }
  if (cwd && isWorkspacePath(cwd)) {
    return path.resolve(cwd);
  }
  return configured_workspaces[0]?.path ?? null;
}
```

- [ ] **Step 4: `server/index.js`와 `server/ws.js`를 final available list
      기준으로 current/validation contract에 맞추고, configured workspace가
      없으면 `CURRENT_WORKSPACE = null`을 유지한다**

```js
const configured_workspaces = discoverWorkspaces({
  workspace_config: config.workspace_config
});
for (const workspace of configured_workspaces) {
  registerWorkspace(workspace);
}

const startup_workspace_root = resolveStartupWorkspace({
  configured_workspaces,
  default_workspace: config.workspace_config.default_workspace,
  cwd: config.root_dir
});

if (
  startup_workspace_root &&
  !configured_workspaces.some((ws) => ws.path === startup_workspace_root)
) {
  registerWorkspace({
    path: startup_workspace_root,
    database: resolveWorkspaceDatabase({ cwd: startup_workspace_root }).path
  });
}

const { scheduleListRefresh } = attachWsServer(server, {
  path: '/ws',
  root_dir: config.root_dir,
  initial_workspace_root: startup_workspace_root,
  watcher: db_watcher
});
```

```js
const allowed = getAvailableWorkspaces().map((ws) => path.resolve(ws.path));
if (!allowed.includes(resolved)) {
  ws.send(JSON.stringify(makeError(req, 'bad_request', 'Workspace must be in the available workspace list')));
  return;
}
```

```js
const initial_root = options.initial_workspace_root ?? null;
CURRENT_WORKSPACE = initial_root
  ? {
      root_dir: initial_root,
      db_path: resolveWorkspaceDatabase({ cwd: initial_root }).path
    }
  : null;
```

- [ ] **Step 5: workspace contract regression tests를 다시 실행한다**

Run: `npm test -- server/workspace-discovery.test.js server/ws.test.js`
Expected: PASS

- [ ] **Step 6: 변경 파일 목록과 verification evidence를 task 메모로 정리한다**

```md
Touched files: <task에 명시된 파일들> Verification: <바로 위 targeted command
PASS>
```

### Task 3: 프런트엔드가 `default_workspace` 우선 정책을 정확히 따른다

**Files:**

- Modify: `server/app.js`
- Modify: `app/main.js`
- Modify: `app/state.js`
- Modify: `app/state.test.js`
- Modify: `app/main.workspace-sync.test.js`
- Create: `app/main.workspace-default.test.js`

- [ ] **Step 1: bootstrap config hydration과 localStorage precedence failing
      tests를 추가한다**

```js
window.localStorage.setItem('beads-ui.workspace', '/repo-b');

CLIENT = {
  send: vi.fn(async (type) => {
    if (type === 'list-workspaces') {
      return {
        workspaces: [
          { path: '/repo-a', database: '/repo-a/.beads/ui.db' },
          { path: '/repo-b', database: '/repo-b/.beads/ui.db' }
        ],
        current: { root_dir: '/repo-a', db_path: '/repo-a/.beads/ui.db' }
      };
    }
    return null;
  }),
  on() {
    return () => {};
  },
  close() {},
  getState() {
    return 'open';
  }
};
window.__BDUI_BOOTSTRAP__ = {
  label_display_policy: { visible_prefixes: ['has:', 'reviewed:'] },
  workspace_config: { default_workspace: '/repo-a' }
};

bootstrap(root);
await Promise.resolve();
await Promise.resolve();

expect(CLIENT.send).not.toHaveBeenCalledWith('set-workspace', {
  path: '/repo-b'
});
expect(window.localStorage.getItem('beads-ui.workspace')).toBe('/repo-a');
```

- [ ] **Step 2: targeted tests를 실행해 현재 bootstrap/state shape가 새 정책을
      못 담는지 확인한다**

Run:
`npm test -- app/state.test.js app/main.workspace-default.test.js app/main.workspace-sync.test.js`
Expected: `workspace_config.default_workspace` hydration assertion과 saved
workspace restore assertion이 FAIL 한다.

- [ ] **Step 3: `/api/config` bootstrap payload와 state shape를 workspace-aware
      config까지 포함하도록 확장한다**

```js
function toBootstrapPayload(config) {
  return {
    label_display_policy: {
      visible_prefixes: config.label_display_policy.visible_prefixes.slice()
    },
    workspace_config: {
      default_workspace: config.workspace_config.default_workspace
    }
  };
}
```

```js
const DEFAULT_CONFIG = {
  label_display_policy: { visible_prefixes: ['has:', 'reviewed:'] },
  workspace_config: { default_workspace: null }
};
```

- [ ] **Step 4: `loadWorkspaces()`의 saved workspace restore를
      `default_workspace` 우선 계약에 맞게 수정한다**

```js
const configured_default =
  store.getState().config.workspace_config.default_workspace;
const saved_workspace = window.localStorage.getItem('beads-ui.workspace');

if (configured_default && current?.path === configured_default) {
  window.localStorage.setItem('beads-ui.workspace', configured_default);
  return;
}

if (saved_workspace && current && saved_workspace !== current.path) {
  const saved_exists = available.some((ws) => ws.path === saved_workspace);
  if (saved_exists) {
    await handleWorkspaceChange(saved_workspace);
  } else {
    window.localStorage.removeItem('beads-ui.workspace');
  }
}
```

- [ ] **Step 5: frontend workspace policy regression tests를 다시 실행한다**

Run:
`npm test -- app/state.test.js app/main.workspace-default.test.js app/main.workspace-sync.test.js`
Expected: PASS

- [ ] **Step 6: 변경 파일 목록과 verification evidence를 task 메모로 정리한다**

```md
Touched files: <task에 명시된 파일들> Verification: <바로 위 targeted command
PASS>
```

### Task 4: Board/Worker를 viewport-bounded 내부 scroll contract로 정리한다

**Files:**

- Modify: `app/styles.css`
- Modify: `app/views/board.test.js`
- Modify: `app/views/worker.test.js`
- Modify: `app/views/worker-detail.test.js`

- [ ] **Step 1: 현재 repo의 viewport-bounded column/pane surface를 먼저
      audit하고, Board/Worker가 direct implementation 대상임을 고정한다**

Run:
`rg -n "route board|route worker|board-root|worker-layout|panel__body" app/views app/styles.css`
Expected: 현재 repo에서 direct scroll contract 적용 대상이 Board/Worker 중심임을
확인하고, 다른 유사 surface가 없으면 이 task 범위를 Board/Worker로 고정한다.

- [ ] **Step 2: board/worker scroll ownership failing tests를 CSS contract
      중심으로 추가한다**

```js
const stylesheet = readFileSync(
  new URL('../../app/styles.css', import.meta.url),
  'utf8'
);

expect(stylesheet).toContain('#board-root.route.board');
expect(stylesheet).toContain('#board-root > .panel__body');
expect(stylesheet).toContain('.board-column {');
expect(stylesheet).toContain('overflow: hidden;');
expect(stylesheet).toContain('.board-column__body');
expect(stylesheet).toContain('overflow-y: auto;');
```

```js
expect(stylesheet).toContain('#worker-root.route.worker');
expect(stylesheet).toContain('.worker-layout__left');
expect(stylesheet).toContain('.worker-tree');
expect(stylesheet).toContain('#worker-detail-mount');
expect(stylesheet).toContain('.worker-detail');
expect(stylesheet).toContain('min-height: 0;');
```

- [ ] **Step 3: targeted tests를 실행해 현재 `overflow:auto`/`overflow:visible`
      조합이 계약과 어긋나는지 확인한다**

Run:
`npm test -- app/views/board.test.js app/views/worker.test.js app/views/worker-detail.test.js`
Expected: board column overflow assertion과 worker pane scroll-owner assertion이
FAIL 한다.

- [ ] **Step 4: route shell → body shell → scroll owner 체인으로 CSS를
      재배선한다**

```css
#board-root.route.board,
#worker-root.route.worker {
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

#board-root > .panel__body {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

.board-root,
.board-column,
.worker-layout,
.worker-layout__left,
.worker-layout__right,
#worker-detail-mount {
  min-height: 0;
  overflow: hidden;
}

.board-column {
  overflow: hidden;
}

.board-column__body,
.worker-tree,
.worker-empty,
.worker-detail {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
}
```

- [ ] **Step 5: targeted layout regression tests를 다시 실행한다**

Run:
`npm test -- app/views/board.test.js app/views/worker.test.js app/views/worker-detail.test.js`
Expected: PASS

- [ ] **Step 6: 변경 파일 목록과 verification evidence를 task 메모로 정리한다**

```md
Touched files: <task에 명시된 파일들> Verification: <바로 위 targeted command
PASS>
```

### Task 5: 전체 회귀를 확인하고 follow-up/verification truth를 정리한다

**Files:**

- Modify as needed from Tasks 1-4 only

- [ ] **Step 1: typecheck / targeted tests / full tests를 순서대로 실행한다**

Run: `npm run tsc` Expected: PASS

Run: `npm test` Expected: PASS

- [ ] **Step 2: lint와 prettier write를 실행해 repo contract를 맞춘다**

Run: `npm run lint` Expected: PASS

Run: `npm run prettier:write` Expected: PASS (기존 repo-wide drift도 함께
정리되므로 변경 파일을 다시 확인한다)

- [ ] **Step 3: prettier write 이후 전체 회귀를 다시 확인한다**

Run: `npm run all` Expected: PASS

- [ ] **Step 4: verification 결과와 dotfiles follow-up 필요성을 실행 요약에
      기록한다**

```md
Completed scope: beads-ui consumer workstream A Excluded scope: dotfiles
provider/shared wrapper migration Follow-up: dotfiles repo bead required before
shared rollout claim Verification: npm run all
```

- [ ] **Step 5: execution handoff에 들어갈 완료 조건만 정리한다**

```md
Completed scope: beads-ui consumer workstream A Excluded scope: dotfiles
provider/shared wrapper migration Follow-up requirement: target repo bead before
shared rollout claim Final verification: npm run all
```
