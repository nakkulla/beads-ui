# 런타임 워크스페이스 재탐색(rescan) 설계 (UI-4pxk)

## 배경

서버는 `discoverWorkspaces()`를 기동 시 1회만 실행해 결과를 in-memory 레지스트리에 넣는다
(`server/index.js`). `~/.beads/registry.json` 기반 항목은 `getAvailableWorkspaces()`가 호출마다
live로 읽지만, config(`scan_roots`/`workspaces`) 스캔 결과는 기동 시점에 동결된다. 그래서 신규
온보딩 레포는 서버 재시작 전까지 picker에 나타나지 않는다(2026-07-22 TRACE-ICI 실측).

## 결정 사항

- 트리거: `list-workspaces` 요청 시마다 서버가 rescan 수행. 새 프로토콜 메시지·주기 타이머·fs
  watcher 없음.
- 신규 발견 워크스페이스는 worker 런타임(디스패치 스케줄러·orphan reap)도 즉시 attach.
- 제거 없음: rescan은 추가·갱신만 한다. 사라진 레포는 숨김 토글이나 재시작으로 정리(현행 유지).

## 서버 변경

`server/workspace-discovery.js`에 `rescanWorkspaces()` 추가:

1. `getConfig()` 재호출 — config 파일은 호출마다 새로 읽으므로 `scan_roots` 변경도 반영된다.
2. `discoverWorkspaces({ workspace_config })` 재실행.
3. 결과를 `registerWorkspace()`로 등록(Map.set 멱등, DB 경로 갱신 겸함).
4. worker attach 대상은 "아직 attachment가 없는 root"로 판별한다: `worker/attach.js`에
   `hasWorkerAttachment(workspace_root)`를 새로 export하고, 이 값이 false인 root만
   `initWorkerRuntime({ workspaces: roots })`에 전달한다. attach가 실패한 root는 ATTACHMENTS에
   남지 않으므로 다음 rescan에서 자연 재시도된다("이번에 새로 등록된 root" 기준은 실패 시 재시도가
   막혀 쓰지 않는다). port 인자 생략 시 기존 워커 포트가 유지되고, 기존 attachment는 건드리지
   않으므로 orphan reap은 attachment 최초 생성 시에만 실행된다.

`server/ws/workspace-handlers.js`의 `handleListWorkspaces`가 목록 조회 전에 `rescanWorkspaces()`를
호출한다. 스로틀은 두지 않는다 — 매 요청이 실제 discovery를 수행한다(스캔 비용은 depth-2 readdir
수준, 호출 빈도는 init·picker 상호작용 수준이라 가드가 불필요).

순환 의존 없음: `registry-watcher.js`/`worker/attach.js`는 `workspace-discovery.js`를 import하지
않는다.

## 클라이언트 변경

`createWorkspacePicker`(`app/views/workspace-picker.js`)에 선택적 콜백 `onRefreshRequest`를 추가하고
다음 시점에 fire-and-forget으로 호출:

- `<select>`의 `mousedown`·`focus`(마우스·키보드 열기 모두 커버)
- "프로젝트 관리" popover 열림(`openManage`)

`app/main.js`가 `loadWorkspaces`를 콜백으로 넘긴다. 데이터가 안 바뀌면 lit-html 재렌더는 DOM
no-op이라 열린 네이티브 드롭다운이 닫히지 않는다. 단일 워크스페이스(라벨 표시) 상태에서는
"프로젝트 관리" 버튼이 트리거를 커버한다.

zero-workspace 상태: 현재 picker는 `available.length === 0`이면 아무것도 렌더링하지 않아 첫
레포 온보딩(0→1) 시 rescan을 트리거할 상호작용이 없다. 빈 상태에서도 "프로젝트 관리" 버튼은
렌더링해(popover 목록은 비어 있음) 열림 시 `onRefreshRequest`로 0→1 전환이 가능하게 한다.

## 에러 처리

- rescan 실패(config 읽기·fs 오류)는 try/catch로 격리해 debug 로그만 남기고 `list-workspaces`는
  기존 목록으로 정상 응답한다.
- worker attach 실패도 동일하게 격리한다(`index.js` 기동부와 같은 패턴).

## 테스트

테스트 격리(선행 조건): Vitest node 프로젝트는 현재 `BDUI_CONFIG_PATH`를 격리하지 않아
`getConfig()`가 실제 `~/.config/bdui/config.toml`을 읽는다(이 파일은 개발 머신에 실존).
`handleListWorkspaces`에 rescan이 들어가면 기존 테스트(`ws.workspace-visibility`, `ws.no-auth` 등)가
실제 워크스페이스 등록·orphan reap을 일으킬 수 있으므로, `vitest.config.mjs` node 프로젝트에
전역 `env.BDUI_CONFIG_PATH`를 존재하지 않는 경로로 기본 설정해 기본 config(scan_roots 빈 배열)로
격리한다. 자체 config를 쓰는 스위트(`config.test.js` 등)는 지금처럼 per-test로 env를 덮어쓴다.

- 서버(ws 테스트, 자체 임시 scan_root config를 `BDUI_CONFIG_PATH`로 주입, 각 테스트에서
  `__resetWorkerAttachmentsForTest`로 attachment 상태 정리):
  1. 첫 `list-workspaces`에 없던 레포가 `.beads` 생성 후 두 번째 호출에서 나타난다(매 요청
     rescan — 호출 간 대기 없이 즉시 재호출로 검증).
  2. rescan 실패 시에도 목록 응답은 정상이다.
  3. 신규 워크스페이스 worker attach 확인 — `hasWorkerAttachment()`로 존재를 검증.
- 클라이언트(picker 테스트): select `mousedown`/`focus`·manage 열림 시 `onRefreshRequest` 호출
  확인, zero-workspace(0→1) 상태에서 "프로젝트 관리" 버튼 렌더·refetch 트리거 확인.
