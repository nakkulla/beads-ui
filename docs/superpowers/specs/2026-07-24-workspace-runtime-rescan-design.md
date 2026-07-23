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
4. 이번 호출에서 새로 등록된 root만 `initWorkerRuntime({ workspaces: new_roots })`에 전달 —
   port 인자 생략 시 기존 워커 포트가 유지되고, 키별 멱등이라 기존 attachment는 건드리지 않는다.

`server/ws/workspace-handlers.js`의 `handleListWorkspaces`가 목록 조회 전에 `rescanWorkspaces()`를
호출한다.

스로틀: 최소 간격 가드(기본 1000ms, 테스트 override 훅 제공). picker 클릭 시 `focus`+`mousedown`이
연달아 와도 스캔은 1회. 간격 내 호출은 스캔을 생략하고 현재 목록만 반환한다.

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

## 에러 처리

- rescan 실패(config 읽기·fs 오류)는 try/catch로 격리해 debug 로그만 남기고 `list-workspaces`는
  기존 목록으로 정상 응답한다.
- worker attach 실패도 동일하게 격리한다(`index.js` 기동부와 같은 패턴).

## 테스트

- 서버(ws 테스트, `BDUI_CONFIG_PATH`로 임시 scan_root config 주입):
  1. 첫 `list-workspaces`에 없던 레포가 `.beads` 생성 후 두 번째 호출에서 나타난다.
  2. 스로틀 간격 내 재호출은 스캔을 생략한다.
  3. rescan 실패 시에도 목록 응답은 정상이다.
  4. 신규 워크스페이스 worker attach 확인 — 기존 `__resetWorkerAttachmentsForTest`로 초기화하고,
     attachment 존재 조회는 필요 시 테스트 전용 조회 훅을 `worker/attach.js`에 추가해 검증.
- 클라이언트(picker 테스트): select `mousedown`/`focus`·manage 열림 시 `onRefreshRequest` 호출 확인.
- 기존 스위트는 기본 config(scan_roots 빈 배열)에서 rescan이 no-op이라 영향 없다.
