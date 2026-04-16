# Workspace Manual Sync Implementation Plan

Parent bead: UI-pw5u

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** 현재 선택된 workspace에 대해 header의 Sync 버튼으로 실제
`bd dolt pull` 을 실행하고, 성공 시 기존 active subscription refresh 경로로
활성 구독 화면을 최신 상태로 갱신한다.

**Architecture:** `server/bd.js` 에 per-call sandbox override를 추가해
`sync-workspace` 만 실제 pull을 수행할 수 있게 한다. `server/ws.js` 는
`CURRENT_WORKSPACE.root_dir` 기준으로 `bd dolt pull` 을 실행한 뒤 기존
mutation refresh gate를 재사용한다. 클라이언트는 `workspace-picker` 에 Sync
버튼을 추가하고, `app/main.js` 에서 sync 요청/disabled/toast 흐름만 연결한다.

**Tech Stack:** Node.js, WebSocket, lit-html, vitest, Beads (`bd`)

**Spec:** `docs/superpowers/specs/2026-04-16-workspace-manual-sync-design.md`

---

## Working Context

- execution repo root: 현재 작업 디렉터리 (`beads-ui`)
- parent bead: `UI-pw5u`
- 구현 범위는 **manual sync only**

### 이번 런에 포함하는 범위

- `sync-workspace` protocol/handler 추가
- `bd dolt pull` 실행용 sandbox opt-out 경로 추가
- header workspace 영역의 Sync 버튼
- success/error toast + syncing disabled/loading 상태
- server/client 테스트 추가

### 이번 런에서 의도적으로 제외하는 범위

- auto sync
- last sync timestamp
- workspace 목록 재조회
- 상세 sync 결과 패널
- readiness 복구(`bd dolt start`)

## File Structure

| Action | File                                      | Responsibility                                                       |
| ------ | ----------------------------------------- | -------------------------------------------------------------------- |
| Modify | `app/protocol.js`                         | `sync-workspace` message type 추가                                   |
| Modify | `app/protocol.test.js`                    | 새 protocol type 회귀 검증                                           |
| Modify | `server/bd.js`                            | per-call sandbox override 지원                                       |
| Modify | `server/bd.test.js`                       | sandbox override 테스트 추가                                         |
| Modify | `server/ws.js`                            | `sync-workspace` handler 추가                                        |
| Create | `server/ws.sync-workspace.test.js`        | sync 성공/실패 + refresh gate 테스트                                 |
| Modify | `app/views/workspace-picker.js`           | Sync 버튼 + imperative syncing state API                             |
| Create | `app/views/workspace-picker.test.js`      | single/multi workspace + sync UI 상태 테스트                         |
| Modify | `app/styles.css`                          | header workspace sync button/loading 스타일                          |
| Modify | `app/main.js`                             | sync action wiring, toast, component state 연결                      |
| Create | `app/main.workspace-sync.test.js`         | bootstrap 기준 sync 성공/실패 통합 흐름 테스트                       |

---

### Task 1: protocol과 `bd` sandbox override 기반 추가

**Files:**

- Modify: `app/protocol.js`
- Modify: `app/protocol.test.js`
- Modify: `server/bd.js`
- Modify: `server/bd.test.js`

- [ ] **Step 1: protocol type와 sandbox override 테스트를 먼저 추가**

`app/protocol.test.js` 에는 새 message type이 등록되는지 확인하는 assertion을
추가하고, `server/bd.test.js` 에는 per-call override가 환경 기본값보다 우선하는지
확인하는 테스트를 추가한다.

추가할 핵심 테스트 예시:

```js
test('isMessageType returns true for sync-workspace', () => {
  expect(isMessageType('sync-workspace')).toBe(true);
});

test('allows disabling sandbox per call', async () => {
  mockedSpawn.mockReturnValueOnce(makeFakeProc('ok', '', 0));

  await runBd(['dolt', 'pull'], { sandbox: false });

  expect(mockedSpawn.mock.calls[0][1]).toEqual(['dolt', 'pull']);
});
```

- [ ] **Step 2: 새 테스트만 먼저 실행해 실패를 확인**

Run:

```bash
npx vitest run app/protocol.test.js server/bd.test.js
```

Expected:
- `sync-workspace` 가 아직 `MESSAGE_TYPES` 에 없어서 protocol assertion FAIL
- `runBd(..., { sandbox: false })` 옵션이 아직 없어서 sandbox override assertion FAIL

- [ ] **Step 3: `app/protocol.js` 와 `server/bd.js` 구현 추가**

`app/protocol.js` 에는 `sync-workspace` 를 `MessageType` union과
`MESSAGE_TYPES` 배열에 추가한다.

`server/bd.js` 는 `runBd()` 옵션에 `sandbox?: boolean` 을 추가하고,
`buildBdArgs()` 가 per-call 옵션을 우선 해석하도록 바꾼다.

구현 목표 스케치:

```js
/** @param {{ cwd?: string, env?: Record<string, string | undefined>, timeout_ms?: number, sandbox?: boolean }} [options] */
export function runBd(args, options = {}) {
  return withBdRunQueue(async () => runBdUnlocked(args, options));
}

function buildBdArgs(args, options = {}) {
  const arg_set = new Set(args);
  if (options.sandbox === false) {
    return args.slice();
  }
  if (options.sandbox === true) {
    return arg_set.has('--sandbox') ? args.slice() : ['--sandbox', ...args];
  }
  // 기존 env 기반 default sandbox 정책 유지
}
```

- [ ] **Step 4: protocol + `bd` 테스트를 다시 실행**

Run:

```bash
npx vitest run app/protocol.test.js server/bd.test.js
```

Expected: PASS

---

### Task 2: `sync-workspace` websocket handler 구현

**Files:**

- Modify: `server/ws.js`
- Create: `server/ws.sync-workspace.test.js`

- [ ] **Step 1: server sync handler 테스트를 먼저 작성**

`server/ws.sync-workspace.test.js` 를 새로 만들고 아래 세 가지를 고정한다.

1. `sync-workspace` 성공 시 `runBd(['dolt', 'pull'], { cwd, sandbox: false })`
   를 현재 workspace 기준으로 호출한다.
2. 성공 후 기존 mutation refresh gate가 트리거되어 active subscription refresh가
   한 번 실행된다.
3. `runBd()` 가 실패하면 websocket error envelope을 반환하고 refresh를 트리거하지 않는다.

테스트 구조는 `attachWsServer(createServer(), { root_dir: '/repo-a', refresh_debounce_ms: 50 })`
로 `CURRENT_WORKSPACE` 를 실제처럼 초기화하고, `subscribe-list` 로 active subscription
하나를 만든 뒤 `sync-workspace` 요청을 보내는 방식으로 맞춘다.

핵심 테스트 스케치:

```js
await handleMessage(sock, Buffer.from(JSON.stringify({
  id: 'sync-1',
  type: 'sync-workspace',
  payload: {}
})));

expect(runBd).toHaveBeenCalledWith(
  ['dolt', 'pull'],
  expect.objectContaining({
    cwd: '/repo-a',
    sandbox: false
  })
);
```

- [ ] **Step 2: server sync 테스트를 실행해 실패를 확인**

Run:

```bash
npx vitest run server/ws.sync-workspace.test.js
```

Expected: FAIL — `sync-workspace` handler가 아직 없어 `unknown_type` 또는
호출/refresh assertion이 깨진다.

- [ ] **Step 3: `server/ws.js` 에 `sync-workspace` handler를 추가**

기존 `set-workspace` 아래 workspace command 영역에 새 handler를 추가한다.

구현 원칙:

- payload는 빈 객체 허용
- `CURRENT_WORKSPACE?.root_dir` 가 없으면 `server_error` 반환
- `runBd(['dolt', 'pull'], { cwd: CURRENT_WORKSPACE.root_dir, sandbox: false })`
  실행
- 실패 시 `makeError(req, 'bd_error', ...)`
- 성공 시 `triggerMutationRefreshOnce()` 호출
- 응답 payload는 `{ workspace: CURRENT_WORKSPACE }`

구현 스케치:

```js
if (req.type === 'sync-workspace') {
  if (!CURRENT_WORKSPACE?.root_dir) {
    ws.send(JSON.stringify(makeError(req, 'server_error', 'No active workspace')));
    return;
  }

  const res = await runBd(['dolt', 'pull'], {
    cwd: CURRENT_WORKSPACE.root_dir,
    sandbox: false
  });

  if (res.code !== 0) {
    ws.send(JSON.stringify(makeError(req, 'bd_error', res.stderr || 'bd failed')));
    return;
  }

  triggerMutationRefreshOnce();
  ws.send(JSON.stringify(makeOk(req, { workspace: CURRENT_WORKSPACE })));
  return;
}
```

- [ ] **Step 4: 새 server sync 테스트와 기존 mutation 회귀를 함께 실행**

Run:

```bash
npx vitest run server/ws.sync-workspace.test.js server/ws.mutations.test.js server/ws.mutation-window.test.js
```

Expected: PASS

---

### Task 3: workspace picker에 Sync 버튼 UI 추가

**Files:**

- Modify: `app/views/workspace-picker.js`
- Create: `app/views/workspace-picker.test.js`
- Modify: `app/styles.css`

- [ ] **Step 1: component 테스트를 먼저 추가**

`app/views/workspace-picker.test.js` 를 새로 만들고 다음을 검증한다.

1. current workspace가 있을 때 Sync 버튼이 렌더링된다.
2. single workspace label 모드에서도 Sync 버튼이 보인다.
3. multi workspace dropdown 모드에서도 Sync 버튼이 보인다.
4. Sync 버튼 클릭 시 `onSync()` callback 이 호출된다.
5. component의 syncing 상태가 켜지면 버튼이 disabled 되고 spinner/텍스트 상태가 반영된다.

테스트용 store는 `createStore()` 로 만들고, `createWorkspacePicker()` 의 반환값에
`setSyncing(true|false)` 같은 imperative API를 추가하는 방향으로 고정한다.

핵심 테스트 스케치:

```js
const view = createWorkspacePicker(mount, store, vi.fn(), vi.fn());
const btn = mount.querySelector('.workspace-picker__sync');

expect(btn).not.toBeNull();

view.setSyncing(true);
expect(btn.disabled).toBe(true);
```

- [ ] **Step 2: component 테스트를 실행해 실패를 확인**

Run:

```bash
npx vitest run app/views/workspace-picker.test.js
```

Expected: FAIL — Sync 버튼과 `setSyncing()` API가 아직 없다.

- [ ] **Step 3: `workspace-picker` 구현과 스타일을 추가**

`app/views/workspace-picker.js` 는 현재 `destroy()` 만 반환하므로, 여기에
`setSyncing(next)` 를 추가해 `doRender()` 를 다시 호출할 수 있게 한다.

구현 방향:

- `let is_syncing = false`
- 새 fourth argument `onSync`
- current workspace가 있을 때만 Sync 버튼 렌더링
- `is_syncing` 중에는 button disabled + spinner/label 반영

구현 스케치:

```js
let is_syncing = false;

async function onSyncClick() {
  if (is_syncing || typeof onSync !== 'function') {
    return;
  }
  await onSync();
}

return {
  setSyncing(next) {
    is_syncing = next;
    doRender();
  },
  destroy() { ... }
};
```

`app/styles.css` 에는 workspace picker 내부 버튼용 스타일만 최소 추가한다.

```css
.workspace-picker__sync {
  font-size: 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
}

.workspace-picker__sync[disabled] {
  opacity: 0.6;
  cursor: wait;
}
```

- [ ] **Step 4: component/UI 테스트를 다시 실행**

Run:

```bash
npx vitest run app/views/workspace-picker.test.js
```

Expected: PASS

---

### Task 4: `app/main.js` 에 sync action을 연결

**Files:**

- Modify: `app/main.js`
- Create: `app/main.workspace-sync.test.js`

- [ ] **Step 1: main integration 테스트를 먼저 추가**

`app/main.workspace-sync.test.js` 를 새로 만들고, bootstrap 기준으로 다음 두 흐름을
검증한다.

1. Sync 버튼 클릭 시 `client.send('sync-workspace', {})` 가 호출되고 success toast가 보인다.
2. `sync-workspace` 요청이 reject 되면 error toast가 보이고 버튼 disabled 상태가 해제된다.

이 테스트는 `./ws.js` mock client를 사용하고, `document.body.innerHTML` 에
`<div id="workspace-picker"></div>` 를 포함한 최소 header DOM을 만든 뒤
`bootstrap(root)` 를 호출하는 패턴으로 작성한다.

mock send 예시:

```js
send: vi.fn(async (type) => {
  if (type === 'list-workspaces') {
    return {
      workspaces: [{ path: '/repo-a', database: '/repo-a/.beads/workspace.db' }],
      current: { root_dir: '/repo-a', db_path: '/repo-a/.beads/workspace.db' }
    };
  }
  if (type === 'sync-workspace') {
    return { workspace: { root_dir: '/repo-a', db_path: '/repo-a/.beads/workspace.db' } };
  }
  return [];
})
```

- [ ] **Step 2: main integration 테스트를 실행해 실패를 확인**

Run:

```bash
npx vitest run app/main.workspace-sync.test.js
```

Expected: FAIL — bootstrap이 아직 Sync 버튼 callback과 toast 흐름을 연결하지 않았다.

- [ ] **Step 3: `app/main.js` 에 sync action wiring을 추가**

`handleWorkspaceSync()` 함수를 추가하고, `createWorkspacePicker()` 반환값을 변수에
담아 `setSyncing(true|false)` 를 제어한다.

구현 원칙:

- `tracked_send('sync-workspace', {})` 사용
- 성공 시 응답 payload의 `workspace.root_dir` 에서 project name을 추출해 toast 표시
- 실패 시 `Sync failed` toast
- `finally` 에서 `setSyncing(false)`

구현 스케치:

```js
const workspace_picker = workspace_mount
  ? createWorkspacePicker(workspace_mount, store, handleWorkspaceChange, handleWorkspaceSync)
  : null;

async function handleWorkspaceSync() {
  workspace_picker?.setSyncing(true);
  try {
    const result = await client.send('sync-workspace', {});
    const root_dir = result?.workspace?.root_dir || store.getState().workspace.current?.path || '';
    showToast('Synced ' + getProjectName(root_dir), 'success', 2000);
  } catch (err) {
    log('workspace sync failed: %o', err);
    showToast('Sync failed', 'error', 3000);
  } finally {
    workspace_picker?.setSyncing(false);
  }
}
```

`loadWorkspaces()` / `handleWorkspaceChange()` 흐름은 유지하고, sync 성공 후에
클라이언트가 별도로 `loadWorkspaces()` 를 다시 호출하지 않도록 한다.

- [ ] **Step 4: client integration 테스트와 관련 client 회귀를 함께 실행**

Run:

```bash
npx vitest run app/main.workspace-sync.test.js app/main.ws-toast.test.js app/protocol.test.js
```

Expected: PASS

---

### Task 5: 전체 검증과 plan 종료 조건 확인

**Files:**

- Modify: none (verification only)

- [ ] **Step 1: 대상 파일 formatting 적용**

Run:

```bash
npx prettier --write \
  app/protocol.js app/protocol.test.js \
  app/views/workspace-picker.js app/views/workspace-picker.test.js \
  app/main.js app/main.workspace-sync.test.js \
  app/styles.css \
  server/bd.js server/bd.test.js \
  server/ws.js server/ws.sync-workspace.test.js
```

Expected: changed files formatted, exit code 0

- [ ] **Step 2: typecheck / tests / lint 전체 검증**

Run:

```bash
npm run tsc
npm test
npm run lint
npm run prettier:write
```

Expected: PASS

- [ ] **Step 3: 완료 범위를 최종 요약에 명시**

최종 요약에는 반드시 아래를 포함한다.

- added: manual workspace Sync button
- added: `sync-workspace` websocket command
- added: `bd dolt pull` sandbox opt-out path
- verified: success/error toast + existing refresh gate reuse
- excluded: auto sync, last sync timestamp, readiness recovery

## Self-Review Checklist

### Spec coverage

- manual Sync 버튼 추가 → Task 3, Task 4
- 실제 `bd dolt pull` 실행 → Task 1, Task 2
- default sandbox 우회 → Task 1, Task 2
- active subscription refresh gate 재사용 → Task 2
- success/error toast + disabled/loading UX → Task 3, Task 4
- auto sync / 상세 패널 / timestamp 제외 → Working Context, Task 5

### Placeholder scan

- `TODO` / `TBD` 없음
- 각 구현 영역마다 테스트 파일과 실행 명령을 명시함
- “적절히 처리” 같은 모호한 문구 대신 구체 command / function / file path를 적음

### Type / interface consistency

- message type은 `sync-workspace`
- server reply payload key는 `workspace`
- workspace root path key는 `root_dir`
- `runBd()` sandbox override option 이름은 `sandbox`
- component imperative API 이름은 `setSyncing`

### Scope check

- 이번 plan은 manual sync 1개 기능만 다룸
- auto sync / readiness / workspace list reload은 의도적으로 비포함
- 기존 header 구조와 refresh 모델을 유지한 채 최소 변경으로 구현
