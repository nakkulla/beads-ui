# Board Deferred 컬럼 임시 펼침 UX
Parent bead: UI-eigm

## 문제 정의

현재 `beads-ui` board는 `Blocked / Ready / In Progress / Resolved / Closed`
컬럼을 렌더하고, 상태 변경 UI와 websocket mutation도 이 모델에 맞춰져 있다.

하지만 실제 `bd`는 `deferred`를 stored status로 지원한다.

- `bd list --help` 기준 stored status:
  `open, in_progress, blocked, deferred, closed`
- `bd list --status deferred --json` 도 정상 동작한다.

즉, 현재 UI는 실제 beads 상태 모델을 완전히 반영하지 못하고 있다.

동시에 `Deferred`는 사용자가 상시 작업하는 메인 흐름 컬럼이라기보다,
“현재 어떤 이슈가 미뤄져 있는지 잠깐 확인하는 보조 컬럼” 성격이 더 강하다.

따라서 단순히 board에 항상 새 컬럼을 하나 더 추가하기보다,
기본 보드 밀도를 유지하면서 필요할 때만 펼쳐볼 수 있는 UX가 필요하다.

## 목표

- `Deferred`를 board에서 **정식 status column** 으로 지원한다.
- 다만 기본 상태에서는 `Deferred` 컬럼을 숨긴다.
- 사용자는 board 상단 control에서 `Deferred` 컬럼을 **임시로 펼치고 다시 접을 수 있어야** 한다.
- 사용자는 `Deferred` 이슈 개수를 버튼에서 즉시 확인할 수 있어야 한다.
- status dropdown 및 board 이동 흐름에서도 `deferred`를 선택할 수 있어야 한다.

## 비목표

- `Deferred` 표시 여부를 localStorage나 서버에 영구 저장
- “버튼을 누르고 있는 동안만” 잠깐 보이는 momentary UI
- defer_until 날짜 편집 UX 자체를 이번 변경에 포함
- `Resolved` 컬럼 제거 또는 전체 board 정보구조 재설계
- Worker tab / Epics tab / detail metadata 정보구조 전면 개편

## 결정 요약

### 선택한 방향

**Board 상단에 `Deferred (N)` 토글 버튼을 추가하고, 기본은 숨김 상태로 두며,
사용자가 버튼을 클릭할 때만 `Deferred` 컬럼을 펼쳐서 확인할 수 있게 한다.**

### 왜 이 방향인가

- 사용자는 `Deferred` 이슈가 있다는 사실을 버튼의 count로 항상 볼 수 있다.
- 보드는 기본적으로 기존 5컬럼 밀도를 유지한다.
- “설정 저장” 없이도 필요한 순간에만 펼쳐볼 수 있어 UX가 가볍다.
- `Deferred`를 실제 status로 반영하므로 `bd`의 상태 모델과 UI가 더 잘 맞는다.

## 설계

## 변경 범위

### 클라이언트

- `app/views/board.js`
  - `Deferred (N)` 토글 버튼 렌더링
  - `Deferred` 컬럼 조건부 렌더링
  - drag/drop 대상 컬럼에 `deferred` 추가
- `app/main.js`
  - board용 `deferred-issues` subscription wiring 추가
  - board view 진입/이탈 시 subscribe/unsubscribe 관리
- `app/state.js`
  - session-local UI state로 `show_deferred_column` 추가
- `app/utils/status.js`
  - canonical status 목록과 label에 `deferred` 추가
- `app/views/detail.js`, `app/views/issue-row.js`, `app/views/list.js`
  - status dropdown/filter에 `deferred` 반영
- `app/styles.css`
  - deferred 버튼/컬럼/status badge 스타일 추가

### 서버

- `server/list-adapters.js`
  - `deferred-issues` subscription spec → `bd list --status deferred`
- `server/validators.js`
  - `deferred-issues` subscription type 허용
- `server/ws.js`
  - `update-status` validation에 `deferred` 추가

### 테스트

- board 렌더/토글/drag-drop 테스트
- status dropdown 옵션 테스트
- websocket validation 테스트
- subscription mapping/validator 테스트

## 1. UI 위치와 상호작용

### 기본 상태

- board 최초 진입 시 `Deferred` 컬럼은 렌더하지 않는다.
- 대신 board 상단 control 영역에 `Deferred (N)` 버튼을 항상 보여준다.
- `N`은 현재 deferred 이슈 개수다.

이 버튼은 “deferred 상태인 이슈가 존재한다”는 사실을 항상 드러내되,
기본 보드 폭을 늘리지 않는 역할을 한다.

### 토글 동작

- 숨김 상태에서 버튼 클릭 → `Deferred` 컬럼 표시
- 표시 상태에서 버튼 클릭 → `Deferred` 컬럼 다시 숨김

여기서 말하는 토글은 **session-local expand/collapse** 이다.
즉:

- 새로고침 전까지는 현재 토글 상태 유지 가능
- 하지만 localStorage에는 저장하지 않음
- 새로고침하면 다시 기본 숨김으로 돌아감

### momentary UI를 쓰지 않는 이유

“누르고 있는 동안만 보이기”는 컬럼 내용을 읽거나 카드 이동을 하기 어렵다.
이번 UX의 목적은 단순 hover preview가 아니라
**필요할 때 deferred 목록을 확인하고, 필요하면 바로 상태를 바꾸는 것** 이므로
클릭 기반 펼침/접힘 토글이 더 적절하다.

## 2. 컬럼 구성과 배치

### 기본 board

- `Blocked`
- `Ready`
- `In Progress`
- `Resolved`
- `Closed`

### Deferred 표시 시 board

- `Blocked`
- `Ready`
- `In Progress`
- `Deferred`
- `Resolved`
- `Closed`

`Deferred`는 active execution 흐름 바로 뒤, `Resolved` 앞에 두는 것을 기본안으로 한다.

이유:

- `In Progress`에서 미루는 동작을 시각적으로 가깝게 표현할 수 있다.
- `Resolved`/`Closed` 같은 완료 계열과는 구분된다.

## 3. 데이터 모델과 상태 의미

### canonical status

UI가 다루는 canonical issue status는 다음으로 확장한다.

- `open`
- `in_progress`
- `deferred`
- `resolved`
- `closed`

단, board column 의미는 다음처럼 유지한다.

- `Blocked` / `Ready` 는 모두 `open` 계열의 분리 view
- `In Progress` 는 `in_progress`
- `Deferred` 는 `deferred`
- `Resolved` 는 `resolved`
- `Closed` 는 `closed`

즉, `Blocked`와 `Ready`는 status가 아니라 open 계열의 subdivision이고,
`Deferred`는 진짜 stored status로 취급한다.

### 현재 모델과의 차이

현재 코드에는 `resolved`가 강하게 반영돼 있지만 `deferred`는 없다.
이번 변경은 `resolved`를 제거하지 않고,
**기존 UI 확장 모델 위에 `deferred`를 추가** 하는 방식으로 간다.

이렇게 하면 기존 `resolved` 기반 UX를 깨지 않으면서
실제 `bd`의 `deferred` 상태도 반영할 수 있다.

## 4. board data flow

### subscription

board view는 현재 다음 구독을 사용한다.

- `blocked-issues`
- `ready-issues`
- `in-progress-issues`
- `resolved-issues`
- `closed-issues`

여기에 `deferred-issues`를 추가한다.

기본적으로는 board view 진입 시 함께 subscribe하는 방향을 기본안으로 한다.

이유:

- `Deferred (N)` 버튼에 개수를 즉시 보여주려면 deferred count가 항상 필요하다.
- 버튼을 눌렀을 때 새로 subscription을 시작하면 첫 렌더 지연이 생긴다.
- deferred 목록 규모는 일반적으로 board 전체 대비 제한적일 가능성이 높다.

따라서 첫 버전은:

- board 진입 시 `deferred-issues`도 subscribe
- 컬럼은 숨기더라도 count는 유지
- 버튼 클릭 시 이미 받아둔 데이터로 즉시 렌더

## 5. 상태 변경 UX

### dropdown

issue detail, list inline edit 등 status를 바꾸는 dropdown에는
`deferred` 옵션을 추가한다.

이로써 사용자는 board가 아니어도 issue를 deferred로 보낼 수 있다.

### board drag/drop

`Deferred` 컬럼이 보일 때:

- 카드 drop to `Deferred` → `status=deferred`
- `Deferred` 카드 drop to 다른 컬럼 → 해당 컬럼 status로 변경

기존 board 구현은 “column → status” 맵으로 mutation을 수행하므로,
여기에 `deferred-col → deferred` 만 추가하면 된다.

단, `Blocked`와 `Ready`는 여전히 둘 다 `open` 계열이므로,
이 기존 규칙은 유지한다.

## 6. 정렬 규칙

`Deferred` 컬럼의 첫 버전 정렬은
`Ready / Blocked / In Progress / Resolved` 와 같은 계열로 둔다.

- priority ascending
- created_at ascending

이유:

- 별도 `defer_until` UX를 이번 범위에 넣지 않으므로
  defer date 중심 정렬을 새로 도입하면 의미가 애매해진다.
- 우선은 기존 board의 active-state 정렬 규칙을 재사용하는 편이 단순하다.

향후 `defer_until` 노출을 붙일 때만 별도 정렬 재검토가 가능하다.

## 7. UI 상태 저장 정책

`show_deferred_column` 은 **UI-only state** 로 둔다.

- store에는 가질 수 있다.
- 하지만 localStorage persistence는 하지 않는다.

즉:

- 같은 page session 안에서는 토글 상태 반영 가능
- reload 후에는 항상 기본 숨김

이 정책은 사용 목적이 “설정”보다 “임시 확인”에 가깝다는 합의에 맞춘다.

## 8. 테스트 포인트

1. board 최초 렌더에서 `Deferred` 컬럼은 보이지 않는다.
2. board 상단에 `Deferred (N)` 버튼이 보인다.
3. 버튼 클릭 시 `Deferred` 컬럼이 표시된다.
4. 다시 클릭하면 컬럼이 숨겨진다.
5. 컬럼이 숨겨져도 버튼 count는 유지된다.
6. status dropdown에 `deferred`가 포함된다.
7. `deferred-issues` subscription spec이 서버에서 허용된다.
8. `update-status`가 `deferred`를 허용한다.
9. `Deferred` 컬럼으로 drag/drop 시 status가 `deferred`로 바뀐다.
10. 새로고침 후에는 `Deferred` 컬럼이 다시 기본 숨김이다.

## 9. 리스크와 대응

### 리스크 1: bd status 모델과 UI status 모델의 혼합

현재 UI는 `resolved`를 쓰고 있고, bd help는 `resolved` 대신 `deferred`/`blocked`
중심 설명을 보여준다. 이 차이를 건드리면 영향 범위가 커질 수 있다.

대응:

- 이번 변경은 `resolved` 제거를 시도하지 않는다.
- 기존 `resolved` flow는 유지하고 `deferred`만 추가한다.

### 리스크 2: board 폭 증가

Deferred를 펼치면 6컬럼이 되어 가로 폭이 늘어난다.

대응:

- 기본은 숨김으로 유지
- 펼침은 사용자가 명시적으로 요청할 때만 발생

### 리스크 3: hidden column이라 존재를 놓칠 수 있음

Deferred를 완전히 숨기면 사용자가 상태 존재를 모를 수 있다.

대응:

- 버튼에 항상 count를 표시한다.
- count가 0이어도 버튼은 유지해 discoverability를 확보한다.

## 10. 수용 기준

- 사용자는 board에서 `Deferred (N)` 버튼으로 deferred 존재 여부를 확인할 수 있다.
- 기본 board는 기존과 유사한 밀도를 유지한다.
- 사용자는 버튼 클릭으로 deferred 목록을 임시로 펼쳐볼 수 있다.
- 사용자는 dropdown 또는 board 이동으로 issue를 `deferred` 상태로 바꿀 수 있다.
- 새로고침 후 deferred 컬럼은 다시 숨겨진다.
