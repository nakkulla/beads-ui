# Dolt readiness 안정화 및 workspace sync UX 추가

Parent bead: UI-cdq1

## 목적

Beads UI가 여러 Dolt backend workspace를 오갈 때도 `board`/`issues`/`epics`
화면이 repo별 Dolt server 상태에 따라 불안정하게 깨지지 않도록 한다. 동시에 현재
workspace 기준으로 원격 이슈를 명시적으로 또는 주기적으로 동기화할 수 있는 UX를
추가한다.

이번 변경의 핵심 목표는 두 가지다.

1. **근본 안정화**
   - `dolt not found`, `127.0.0.1:0`, auto-start 실패 같은 환경 문제로 board
     로딩이 치명적으로 깨지는 빈도를 줄인다.
   - 사용자가 repo마다 매번 `bd dolt start`를 수동 실행하지 않아도 되도록,
     daemon/subprocess 환경과 workspace readiness 동작을 보강한다.
2. **원격 sync UX 제공**
   - 현재 workspace에 대해 `Sync now`를 실행할 수 있게 한다.
   - 사용자가 선택적으로 `Auto sync`를 켤 수 있게 한다.
   - workspace 전환 직후에는 best-effort 1회 sync를 시도해 최신 상태를 가져오되,
     실패해도 로컬 데이터 렌더링은 유지한다.

## 범위

이번 spec은 다음을 포함한다.

- daemon/subprocess의 `dolt` 경로 탐지 및 실행 환경 안정화
- workspace 전환 시 Dolt readiness 확인/복구 흐름 정리
- websocket 기반 `sync-workspace` 서버 액션 추가
- top navigation 또는 workspace picker 근처의 `Sync now` 버튼 추가
- `Auto sync` 사용자 설정 추가 (`Off`, `30s`, `60s`)
- workspace 전환 직후 best-effort 1회 sync
- sync 결과에 따른 subscription refresh 및 사용자 피드백
- 관련 서버/프론트엔드 테스트 추가

다음은 범위에서 제외한다.

- 여러 workspace를 동시에 aggregate 해서 한 화면에 합쳐 보여주는 기능
- remote push UX (`bd dolt push`) 추가
- sync conflict 해소 UI
- Beads/Dolt 인증 설정 관리 UI
- background sync 이력/로그 뷰어
- workspace별로 서로 다른 auto-sync 주기를 저장하는 고급 설정

## 현재 상태

- Beads UI는 하나의 글로벌 daemon이 여러 workspace를 오가며 사용한다.
- workspace 전환은 `set-workspace` websocket 메시지로 처리되며, watcher rebind,
  registry clear, list 재구독이 함께 일어난다.
- list/board 데이터는 기본적으로 active workspace의 로컬 `.beads` 상태를 읽고,
  DB watcher 이벤트 또는 mutation refresh를 통해 갱신된다.
- 현재 `bd` subprocess 호출은 기본적으로 `--sandbox`를 prepend 하므로, 일반
  list/read 경로는 auto-sync를 기대하지 않는다.
- 일부 workspace에서 Dolt server가 이미 떠 있으면 화면이 정상 동작하지만, Dolt
  server가 내려간 workspace로 전환했을 때 daemon 환경에서 `dolt`를 찾지 못하면
  auto-start 실패가 발생한다.
- 현재 fatal error dialog는 board/list 로드 실패를 그대로 사용자에게 노출하며,
  remote sync 실패와 local load 실패를 구분하지 않는다.
- remote 변경을 가져오는 명시적 `Sync now` UI나 주기적 sync 루프는 없다.

## 디자인

### 1. 실행 환경 안정화

#### 1-1. daemon PATH 정규화

daemon을 띄우는 `startDaemon()`과, 서버 프로세스 내부에서 `bd`를 spawn 하는 경로
모두에서 `dolt`가 안정적으로 보이도록 PATH를 정규화한다.

정규화 규칙:

1. 기존 `process.env.PATH`를 우선 사용한다.
2. macOS/Homebrew 표준 경로가 빠져 있으면 앞쪽에 보강한다.
   - `/opt/homebrew/bin`
   - `/usr/local/bin`
3. 중복 경로는 제거하되 기존 순서는 최대한 유지한다.

이 변경의 목적은 shell마다 다른 PATH 차이로 인해 daemon이 `dolt`를 찾지 못하는
상황을 줄이는 것이다. 이때 특정 경로를 하드코딩된 절대 실행 파일로 강제하지
않고, 표준 경로 보강 수준에 그친다.

#### 1-2. `bd` subprocess 환경 정규화

`server/bd.js`에서 `bd`를 spawn 할 때도 같은 PATH 정규화를 적용한다. 이렇게 하면
daemon이 정상 기동된 이후에도 workspace별 Dolt auto-start 경로가 일관되게
`dolt`를 찾을 수 있다.

### 2. workspace readiness 모델

workspace는 “선택되었다”와 “즉시 읽을 수 있다”를 분리해서 다룬다.

#### 2-1. workspace 전환 후 기본 동작

`set-workspace`가 성공하면 기존처럼:

- current workspace 상태 갱신
- watcher rebind
- subscription registry clear
- current view 재구독

을 수행한다.

그 다음 단계로, background에서 **best-effort 1회 sync/readiness 확인**을
추가한다. 이 1회 sync의 authoritative trigger는 **현재 client의 `set-workspace`
성공 응답 경로**다. `workspace-changed` broadcast는 다른 client나 다른 탭과의
state 동기화를 위한 update / reload 용도로만 쓰고, 동일 전환에 대해 sync를 다시
트리거하지 않는다.

workspace metadata에는 `backend`와 `can_sync`를 함께 포함한다. 초기 정책은
다음과 같다.

- `resolveWorkspaceDatabase(...).source === 'metadata'` → `backend: 'dolt'`,
  `can_sync: true`
- 그 외 → `backend: 'sqlite'`, `can_sync: false`

이 값은 `list-workspaces`, `get-workspace`, `set-workspace`, `sync-workspace`
응답에 공통으로 포함한다. 클라이언트는 이 서버 truth를 기준으로 `Sync now`와
`Auto sync` 활성 여부를 결정한다.

#### 2-2. readiness 확인에서 수행할 일

현재 workspace가 Dolt backend일 때 다음 순서로 처리한다.

1. `bd dolt status`
2. server가 running 이면 다음 단계로 진행
3. not running 또는 포트가 비정상(`0`)이면 `bd dolt start` 시도
4. start 성공 시 workspace는 ready 상태로 간주
5. start 실패 시 로컬 list load는 가능한 범위에서 계속 시도하되, 에러는
   non-blocking toast 우선으로 노출한다

이 readiness 흐름은 explicit sync와 workspace 전환 시 background sync가 공통으로
재사용한다.

### 3. `sync-workspace` 서버 액션

새 websocket 메시지 타입을 추가한다.

- 요청: `sync-workspace`
- payload:
  - `path?: string` — `payload.path` 우선, 없으면 current workspace 사용, 둘 다
    없으면 `bad_request`
  - `reason?: 'manual' | 'auto' | 'workspace-switch'`

응답 payload 예시:

```json
{
  "workspace": {
    "root_dir": "/path/to/repo",
    "db_path": "/path/to/repo/.beads",
    "backend": "dolt",
    "can_sync": true
  },
  "started_dolt": true,
  "pulled": true,
  "refreshed": true
}
```

처리 순서:

1. 대상 workspace 결정
   - current workspace가 없으면 `bad_request`
   - 대상 workspace의 `can_sync !== true`이면 `bad_request`
2. readiness 확인 (`bd dolt status` → 필요 시 `bd dolt start`)
3. `bd dolt pull`
4. 성공 시 active list subscriptions refresh
5. 결과를 reply로 반환

주의점:

- `sync-workspace`는 일반 read 경로와 분리된 명시적 sync 동작이다.
- 이 경로는 `--sandbox`가 아니라 **non-sandbox**로 실행되어야 한다.
- 동일 workspace에 대한 sync는 직렬화한다.
- sync 중복 클릭이나 auto/manual 겹침이 생겨도 한 번에 하나만 실행되도록 한다.
- non-Dolt workspace에 대한 `sync-workspace`는 성공 no-op가 아니라
  `bad_request`로 명확히 거절한다.

### 4. 일반 list load와 sync 실패의 분리

이번 변경 이후에는 “원격 sync 실패”와 “로컬 화면 로드 실패”를 다르게 취급한다.

#### 4-1. local load failure

다음은 기존처럼 강한 에러 처리 대상이다.

- `bd` 실행 자체 실패
- workspace path가 잘못됨
- snapshot을 만들 수 없는 수준의 backend 오류

이 경우에는 현재의 fatal dialog 흐름을 유지할 수 있다.

#### 4-2. sync failure

다음은 non-blocking 처리 대상이다.

- `bd dolt pull` 실패
- remote 인증 실패
- 네트워크 오류
- remote unavailable

이 경우:

- 현재 렌더 중인 로컬 데이터는 유지한다.
- 수동 sync는 toast 에러만 표시한다.
- workspace 전환 직후 background sync 실패도 toast만 표시한다.
- sync 실패만으로 현재 board/list를 fatal dialog로 덮어쓰지 않는다.

### 5. UI 변경

#### 5-1. `Sync now` 버튼

위치는 workspace picker 인접 영역을 우선한다. 사용자가 현재 어떤 workspace를
보고 있는지와 sync 액션이 자연스럽게 연결되어야 하기 때문이다.

동작:

- 클릭 시 현재 workspace 대상으로 `sync-workspace { reason: 'manual' }`
- 진행 중에는 버튼 disabled + loading affordance
- 성공 시 `Synced <project>` toast
- 실패 시 `Sync failed for <project>` toast

버튼은 현재 workspace가 없거나, 현재 workspace의 `can_sync !== true`인 경우
비활성화한다.

#### 5-2. `Auto sync` 설정

UI 선택지:

- `Off` (기본값)
- `30s`
- `60s`

선택값은 localStorage에 저장한다.

현재까지 사용자 선택 반영:

- 기본값은 **Off**

자동 sync는 현재 active workspace 기준으로만 동작한다. workspace가 바뀌면 기존
interval은 정리하고 새 workspace 기준으로 다시 시작한다. 현재 workspace의
`can_sync !== true`이면 auto-sync는 시작하지 않는다.

#### 5-3. workspace 전환 직후 1회 sync

workspace를 바꾼 직후에는 auto-sync 설정과 관계없이 **best-effort 1회 sync**를
background로 수행한다.

의도:

- 전환 직후 최신 상태를 가져오되
- 실패해도 화면을 막지 않고
- 사용자가 곧바로 `Sync now`를 다시 누를 수 있게 한다

### 6. 클라이언트 상태 관리

클라이언트는 sync를 별도 상태로 관리한다.

필요 상태:

- `is_syncing`
- `last_sync_at`
- `last_sync_error` (optional, transient UI 용도)
- `auto_sync_interval` (`off` | `30000` | `60000`)

이 상태는 렌더링과 toast 제어를 위해 필요하지만, 전역 store에 반드시 영구 저장할
필요는 없다. 초기 구현은 main bootstrap 범위의 작은 상태 또는 store 확장 중 더
단순한 방식을 선택한다.

### 7. refresh 전략

sync 성공 후에는 다음 순서로 동작한다.

1. 현재 active subscription specs 수집
2. `refreshAllActiveListSubscriptions()` 실행
3. list/board/detail가 current workspace 기준 최신 snapshot으로 갱신

별도의 full page reload는 하지 않는다.

### 8. 중복 실행 방지

manual sync와 auto sync, workspace-switch sync가 서로 겹칠 수 있으므로 현재
workspace 기준으로 하나의 sync lock을 둔다.

권장 규칙:

- 같은 workspace에 sync가 이미 진행 중이면 새 요청은 합치거나 no-op 처리
- 다른 workspace로 전환되면 이전 workspace의 auto sync interval은 즉시 정리
- in-flight sync가 이전 workspace 기준이면 결과를 버리거나 refresh 적용을
  건너뛴다

이 generation/lock 개념은 기존 subscription refresh에서 쓰는 직렬화 방식과
유사한 패턴을 따른다.

## 수정 대상 파일

### 수정 파일

| 파일                            | 변경                                                                                                            |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `server/cli/daemon.js`          | daemon spawn env의 PATH 정규화                                                                                  |
| `server/bd.js`                  | `bd` subprocess env PATH 정규화, sync 전용 non-sandbox 실행 helper 추가 또는 기존 API 확장                      |
| `server/ws.js`                  | `sync-workspace` 메시지 처리, workspace readiness/sync orchestration, refresh 연계, workspace response assembly |
| `server/index.js`               | 필요 시 startup 진단 로그 또는 wiring 보강                                                                      |
| `app/protocol.js`               | `sync-workspace` 메시지 타입 추가                                                                               |
| `app/main.js`                   | sync 버튼/설정/interval/workspace-switch sync wiring                                                            |
| `app/views/workspace-picker.js` | `Sync now`, `Auto sync` UI 추가                                                                                 |
| 관련 server/app test 파일       | sync/readiness/server message 테스트 추가                                                                       |
| 관련 app test 파일              | 버튼, auto sync, workspace switch behavior 테스트 추가                                                          |

### 신규 helper 후보

필요 시 아래처럼 작은 helper 분리를 허용한다.

- `server/env.js` — PATH 정규화 helper
- `server/sync.js` — workspace sync orchestration helper
- `app/utils/auto-sync.js` — interval 관리 helper

단, 초기 구현에서 파일 수가 불필요하게 늘어나면 기존 파일 내부의 작은 helper로
시작해도 된다. 목표는 과설계보다 명확한 책임 분리다.

## 엣지 케이스

- 현재 workspace가 없음 → sync 버튼 비활성화
- workspace는 있지만 Dolt backend가 아님 → sync API는 명확한 `bad_request`
- `bd dolt start`는 성공했지만 `bd dolt pull` 실패 → 로컬 데이터 유지 + toast
  에러
- remote 인증 정보 없음 → sync 실패 toast, local render 유지
- auto sync 중 사용자가 workspace 변경 → 이전 timer 정리, stale 결과 무시
- auto sync 중 manual sync 클릭 → 동일 workspace면 중복 요청 합치기
- 네트워크가 불안정하여 pull이 오래 걸림 → 버튼/상태에 syncing 표시 유지,
  timeout 정책 필요
- sync 성공했지만 변경 없음 → success toast는 간단히 유지하거나 조용한 처리 허용
- board/detail/list가 동시에 열려 있어도 refresh는 active subscriptions 기준으로
  한 번만 수행

## 테스트

다음 케이스를 검증한다.

### 서버

1. PATH 정규화가 Homebrew 경로를 보강한다.
2. `sync-workspace`가 running Dolt server에서는 바로 pull + refresh를 수행한다.
3. `sync-workspace`가 stopped Dolt server에서는 `bd dolt start` 후 pull을
   수행한다.
4. `bd dolt start` 실패 시 structured error를 반환한다.
5. `bd dolt pull` 실패 시 sync 실패를 반환하되 process는 유지된다.
6. sync 성공 후 active subscriptions refresh가 호출된다.
7. 동일 workspace sync 중복 요청은 직렬화되거나 dedupe 된다.
8. stale workspace sync 결과는 current workspace refresh에 적용되지 않는다.
9. non-Dolt workspace에 대한 `sync-workspace`는 `bad_request`를 반환한다.
10. `workspace-changed` broadcast는 동일 workspace-switch sync를 다시 트리거하지
    않는다.

### 클라이언트

1. `Sync now` 클릭 시 `sync-workspace(reason=manual)` 요청을 보낸다.
2. sync 진행 중 버튼이 disabled 된다.
3. sync 성공 시 success toast를 띄운다.
4. sync 실패 시 fatal dialog 대신 error toast를 띄운다.
5. `Auto sync` 값이 localStorage에 저장/복원된다.
6. `Auto sync`가 `30s`/`60s`일 때 해당 주기로 sync 요청을 보낸다.
7. workspace 전환 직후 best-effort 1회 sync가 실행된다.
8. workspace 전환 시 이전 interval이 정리된다.
9. `can_sync !== true`인 workspace에서는 `Sync now`가 disabled 되고 auto-sync가
   시작되지 않는다.

## 구현 메모

- 초기 구현은 `Sync now`와 `Auto sync`를 current workspace 기준으로만 제공한다.
- manual sync와 workspace-switch sync는 사용자 경험상 중요하므로 먼저 포함한다.
- auto sync는 기본 Off로 두어 네트워크/인증 문제를 사용자 의도 없이 반복하지
  않도록 한다.
- sync 전용 경로는 일반 read path와 분리해야 한다. 일반 list load까지 항상
  remote sync를 끼워 넣으면 UI latency와 실패 범위가 커질 수 있다.
- daemon PATH 정규화는 “특정 머신 전용 해킹”이 아니라, macOS/Homebrew 환경에서
  흔한 PATH 누락을 완화하는 최소 보강 수준으로 제한한다.
- 현재 spec은 설계 문서이며, 구현 단계에서는 테스트 우선으로 세부 API shape와
  helper 경계를 다듬는다.
