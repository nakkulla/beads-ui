# Workspace 수동 Sync 버튼 추가

## 문제 정의

현재 `beads-ui`는 여러 workspace를 전환해서 볼 수 있고, 현재 선택된 workspace의
DB 변경은 watcher와 subscription refresh를 통해 화면에 반영된다.

하지만 다음 한계가 있다.

1. **다른 환경에서 반영된 변경을 사용자가 직접 가져올 수 없다**
   - 현재 UI에는 “지금 보고 있는 workspace를 원격과 동기화한다”는 명시적 액션이 없다.
   - 따라서 다른 터미널, 다른 머신, 또는 다른 세션에서 반영된 이슈 변경을 UI에서
     바로 끌어오려면 사용자가 별도 CLI에서 `bd dolt pull` 을 알아서 실행해야 한다.

2. **기존 refresh 경로와 실제 데이터 동기화가 구분되지 않는다**
   - 현재 구조에는 `list-workspaces`, `set-workspace`, watcher 기반 refresh가 있다.
   - 하지만 이들은 “UI가 이미 보고 있는 로컬 DB를 다시 읽는 경로”이지,
     원격 변경을 현재 workspace로 가져오는 경로는 아니다.

3. **사용자 기대와 실제 동작 사이에 공백이 있다**
   - workspace picker가 존재하므로 사용자는 자연스럽게 workspace 관련 전역 액션을
     기대할 수 있다.
   - 그러나 지금은 “workspace 선택”만 가능하고 “workspace sync”는 불가능하다.

## 목표

- 현재 선택된 workspace에 대해 **수동 Sync 버튼**을 제공한다.
- Sync 버튼은 실제로 현재 workspace에서 `bd dolt pull` 을 실행한다.
- Sync 성공 후 현재 화면은 기존 subscription refresh 경로를 통해 최신 이슈 상태를 반영한다.
- UX는 첫 버전에서 작게 유지한다.
  - sync 중 disabled/loading
  - success/error toast

## 비목표

- 등록된 모든 workspace 일괄 sync
- 주기 기반 auto sync
- workspace 전환 직후 자동 sync
- sync 결과 상세 패널(stdout/stderr 노출)
- 마지막 sync 시각 저장/표시
- Dolt readiness 복구 또는 `bd dolt start` 자동 처리

## 결정 요약

### 선택한 방향

**workspace picker 근처에 전용 Sync 버튼을 추가하고, 클라이언트는 새
`sync-workspace` websocket command를 호출하며, 서버는 현재 workspace 기준으로
`bd dolt pull` 을 실행한 뒤 기존 active subscription refresh 경로를 재사용한다.**

### 왜 이 방향인가

- 사용자가 기대하는 “Sync” 의미와 가장 직접적으로 맞는다.
- 현재 코드베이스에 이미 존재하는
  - workspace 선택 상태
  - websocket mutation handler
  - subscription refresh/coalescing
  구조를 재사용할 수 있다.
- 새 fetch 체계나 새 global sync 상태를 만들지 않아 영향 범위가 작다.

## 설계

## 변경 범위

### 클라이언트

- `app/views/workspace-picker.js`
  - Sync 버튼 렌더링 및 sync 중 상태 반영
- `app/main.js`
  - `sync-workspace` 요청 함수 추가
  - 성공/실패 toast 처리
  - refresh 후속 동작 연결
- `app/protocol.js`
  - `sync-workspace` message type 추가
- 필요 시 `app/styles.css`
  - header action button/loading 스타일 추가

### 서버

- `server/ws.js`
  - `sync-workspace` handler 추가
  - 성공 시 active subscription refresh 경로 호출
- `server/bd.js`
  - 현재 workspace 기준 `bd dolt pull` 실행을 위한 기존 `runBd()` 재사용

### 테스트

- 클라이언트 view/main 테스트
- server websocket handler 테스트

## 1. UI 위치와 상호작용

### 위치

Sync 버튼은 **workspace picker와 같은 header 영역**에 둔다.

이유:
- action 대상이 “현재 workspace”이므로 의미상 가장 가깝다.
- Issues / Epics / Board 같은 view 전환과는 성격이 다르므로 top nav 안보다
  workspace 영역 옆이 맞다.
- detail/list/board 개별 화면마다 중복 배치할 필요가 없다.

### 단일 workspace / 다중 workspace 공통 규칙

현재 `workspace-picker`는:
- workspace가 0개면 렌더링하지 않고
- 1개면 label만 보여주고
- 여러 개면 dropdown을 보여준다.

Sync 버튼은 이 규칙을 확장해 다음처럼 동작한다.

- 현재 workspace가 없으면 버튼을 렌더링하지 않는다.
- 현재 workspace가 있으면
  - single workspace label 옆에도 버튼을 보여준다.
  - multi workspace dropdown 옆에도 버튼을 보여준다.

즉, Sync는 “picker가 dropdown인지 label인지”와 무관하게
**현재 workspace가 존재하는지**만 기준으로 노출한다.

### 상태

첫 버전 버튼 상태는 두 가지만 둔다.

- `idle`
- `syncing`

`syncing` 상태에서는:
- 버튼 disabled
- 간단한 spinner 또는 loading 표시 노출
- 같은 클라이언트에서 중복 클릭 차단

### 사용자 피드백

- 성공: `Synced <workspace-name>` toast
- 실패: `Sync failed` toast

첫 버전에서는 stderr 전문이나 상세 diff를 노출하지 않는다.

## 2. 클라이언트 데이터 흐름

클라이언트는 sync 자체를 로컬에서 수행하지 않고, 서버에 mutation 요청을 보낸다.

예시 메시지:

```js
client.send('sync-workspace', {})
```

payload에 workspace path를 다시 넣지 않는 이유는, 서버가 이미 현재 workspace
상태를 authoritative source로 들고 있기 때문이다.

여기서 말하는 “현재 workspace”는 **client-local state가 아니라 서버가 관리하는
`CURRENT_WORKSPACE`** 를 의미한다. 이 앱은 이미 workspace 전환을 server-global
상태로 관리하고 있으며, 클라이언트는 `workspace-changed` 이벤트를 통해 그 상태를
따라간다. 따라서 `sync-workspace` 역시 동일한 server-global workspace 모델 위에서
동작한다.

### 성공 흐름

1. 사용자가 Sync 버튼 클릭
2. 클라이언트가 local `is_syncing` 상태를 켠다
3. `sync-workspace` 요청 전송
4. 서버가 성공 응답 반환
5. 클라이언트는 `is_syncing` 상태를 끈다
6. 응답 payload의 workspace 정보를 기준으로 success toast 표시
7. 화면 데이터는 서버가 발행한 refresh 결과를 기존 subscription push로 반영

핵심은 클라이언트가 별도로 “전체 재조회”를 구현하지 않는다는 점이다.
기존 snapshot/upsert/delete 기반 구독 구조를 그대로 사용한다.

### 실패 흐름

1. 요청 실패 또는 서버가 error 응답 반환
2. 클라이언트는 `is_syncing` 상태를 끈다
3. error toast 표시
4. 현재 화면 상태와 선택 상태는 그대로 유지

## 3. 서버 동작

### 새 websocket command

`server/ws.js` 에 `sync-workspace` handler를 추가한다.

핵심 책임:
- 현재 workspace가 유효한지 확인
- 현재 workspace root 기준으로 `bd dolt pull` 실행
- 성공 시 active subscriptions refresh
- 클라이언트에 성공/실패 응답 반환

예상 응답 shape는 기존 websocket reply envelope 스타일을 따른다.

성공 예시:

```json
{
  "id": "req-123",
  "ok": true,
  "type": "sync-workspace",
  "payload": {
    "workspace": {
      "root_dir": "/path/to/repo",
      "db_path": "/path/to/db"
    }
  }
}
```

실패 시에는 기존 websocket error envelope을 사용한다.

### `bd dolt pull` 실행 위치

`bd dolt pull` 은 **현재 workspace root를 cwd로 삼아** 실행한다.

이 규칙이 중요한 이유:
- `server/bd.js` 는 `runBd(args, { cwd })` 를 지원한다.
- workspace별 backend autodetection과 local DB resolution은 cwd에 의존한다.
- 따라서 sync command는 현재 전역 process cwd가 아니라
  **CURRENT_WORKSPACE.root_dir** 를 기준으로 실행해야 한다.

예시:

```js
await runBd(['dolt', 'pull'], {
  cwd: CURRENT_WORKSPACE.root_dir
});
```

### sandbox 우회 규칙

`server/bd.js` 는 기본적으로 interactive UI 요청에 대해 `bd --sandbox ...` 를 붙인다.
이 기본값은 일반 조회/수정 요청에는 맞지만, `sync-workspace` 의 목적은 **실제 remote
변경을 가져오는 `bd dolt pull` 실행** 이므로 이 command에는 적용되면 안 된다.

따라서 `sync-workspace` 구현은 `bd dolt pull` 실행 시 **default sandbox path를
명시적으로 우회**해야 한다.

의도:
- 버튼이 “UI만 재조회”가 아니라 실제 pull이라는 의미를 보장
- 다른 mutation/read 요청의 sandbox 기본 정책은 그대로 유지
- sandbox 예외 범위를 `sync-workspace` 1개로 국소화

## 4. refresh 연결 방식

Sync 성공 후 새 데이터 반영은 **기존 active subscription refresh 경로를 재사용**한다.

구체적으로는 `server/ws.js` 내부의 watcher/mutation refresh gate 및
active subscription refresh/scheduling 로직을 그대로 활용한다.

의도:
- watcher와 mutation refresh가 이미 쓰는 경로와 동일한 갱신 모델 유지
- view별 추가 fetch 로직 도입 방지
- issues / epics / board 화면 간 일관성 유지

### 선택한 정책

Sync 성공 직후:
- 현재 연결된 active subscriptions에 대해 기존 mutation-style refresh를 한 번 트리거한다.
- watcher event가 오면 그 경로를 우선 사용하고, watcher가 오지 않더라도 timeout 이후
  한 번 refresh가 실행되도록 한다.
- 결과는 기존 snapshot/upsert/delete 발행 구조로 내려간다.

### 하지 않는 것

- 클라이언트가 `loadWorkspaces()` 를 강제로 다시 호출
- 전체 앱 상태 초기화
- 필터/선택/scroll 상태 리셋

즉, 이번 설계는 “현재 활성 구독 중인 화면을 가능한 덜 흔들면서 최신 데이터만 반영”하는 쪽을 택한다.

## 5. workspace 전환과의 관계

sync 대상은 **요청 시점의 현재 workspace** 다.

예를 들어:
- 사용자가 workspace A에서 Sync 클릭
- sync가 끝나기 전에 workspace B로 전환

이 경우 서버는 A 기준으로 `bd dolt pull` 을 계속 수행할 수 있다.
첫 버전에서는 이것을 별도 cancel하지 않는다.

대신 다음 규칙을 둔다.

- sync 요청은 요청 시점의 current workspace에 대해 실행된다.
- UI는 응답 시점에 응답 payload의 workspace를 기준으로 단순 성공/실패를 표시한다.
- 화면 데이터 반영은 그 시점의 active subscription 상태에 맡긴다.

이렇게 하면 “과거 workspace 결과를 현재 화면에 강제로 주입”하는 복잡한 보정 로직이 필요 없다.

## 6. 오류 처리

### 사용자에게 보이는 오류

첫 버전에서는 사용자 메시지를 단순하게 유지한다.

- transport 실패 → `Sync failed`
- `bd dolt pull` non-zero exit → `Sync failed`

필요 시 서버는 stderr를 로그로 남긴다.

### 내부 오류 취급

- `bd` spawn 실패
- `bd dolt pull` 실패
- refresh 중 일부 subscription refresh 실패

이들은 모두 서버 로그에는 남기되, UI에는 상세 stderr를 노출하지 않는다.

### refresh 실패 정책

pull은 성공했지만 refresh 일부가 실패할 수 있다.

첫 버전에서는:
- sync command 자체는 pull 결과를 기준으로 성공/실패를 판단한다.
- refresh 세부 실패는 기존 refresh 경로의 에러 처리/로그 정책을 따른다.

이 방식은 UX를 단순하게 유지하지만, 나중에 필요하면 “pull 성공 but refresh partial”
같은 세분화된 상태를 후속으로 추가할 수 있다.

## 7. 테스트 전략

### 클라이언트

#### `app/views/workspace-picker` 또는 관련 view 테스트

- current workspace가 있을 때 Sync 버튼을 렌더링한다.
- sync 중 버튼이 disabled/loading 상태가 된다.
- single workspace label 모드에서도 버튼이 보인다.
- multi workspace dropdown 모드에서도 버튼이 보인다.

#### `app/main.js` 테스트

- 버튼 클릭 시 `sync-workspace` 요청을 보낸다.
- 성공 응답 후 success toast를 표시한다.
- 실패 응답 후 error toast를 표시한다.
- 실패 시 기존 view/selection 상태를 유지한다.

### 서버

#### `server/ws.js` 테스트

- `sync-workspace` 요청이 `runBd(['dolt', 'pull'], { cwd })` 를 현재 workspace 기준으로 호출한다.
- 성공 시 기존 mutation-style refresh gate가 트리거된다.
- 실패 시 websocket error envelope을 반환한다.

### 회귀 포인트

- workspace 전환 기능이 기존처럼 동작하는가
- watcher 기반 refresh와 sync-triggered refresh가 충돌하지 않는가
- header 영역의 기존 layout이 single/multi workspace 모두에서 깨지지 않는가

## 리스크와 완화

### 리스크 1. `bd dolt pull` 이 오래 걸릴 수 있다

sync 중 버튼이 disabled 되므로 사용자는 중복 클릭을 하지 않지만,
응답이 늦으면 체감 지연이 생길 수 있다.

완화:
- 첫 버전에서는 spinner + toast만 제공
- 필요하면 후속에서 timeout/취소/상세 상태를 검토

### 리스크 2. watcher와 refresh가 중복될 수 있다

pull 후 DB watcher가 별도 이벤트를 발생시키면 refresh가 중복될 수 있다.

완화:
- 새 독립 refresh 시스템을 만들지 않고 기존 coalescing/scheduling + mutation gate 경로를 사용한다.
- 구현 단계에서 현재 `server/ws.js` 의 refresh debounce와 mutation window 규칙을 그대로 존중한다.

### 리스크 3. Sync 버튼 위치가 header를 복잡하게 만들 수 있다

workspace picker 옆에 action을 붙이면 header 밀도가 올라간다.

완화:
- 버튼 텍스트/스타일은 작고 중립적으로 유지
- first version은 단일 버튼만 추가
- auto sync, last sync time 등은 제외

## 구현 개요

1. `app/protocol.js` 에 `sync-workspace` message type 추가
2. `server/ws.js` 에 `sync-workspace` handler 추가
3. handler는 `CURRENT_WORKSPACE.root_dir` 기준으로 `bd dolt pull` 실행
4. 성공 시 기존 active subscription refresh 경로 호출
5. `app/main.js` 에 sync action 함수 추가
6. `app/views/workspace-picker.js` 에 Sync 버튼과 `is_syncing` 상태 추가
7. 관련 client/server 테스트 추가

## 검증 기준

- 사용자가 header에서 현재 workspace를 sync할 수 있다.
- Sync 버튼 클릭 시 실제 `bd dolt pull` 이 현재 workspace 기준으로 실행된다.
- 성공 후 활성 구독 중인 이슈 목록/보드/에픽/상세 화면이 기존 subscription refresh 경로로 갱신된다.
- 실패 시 현재 화면 상태는 유지되고, 사용자에게 error toast가 표시된다.
- 단일 workspace / 다중 workspace 모두에서 header UI가 정상 동작한다.
