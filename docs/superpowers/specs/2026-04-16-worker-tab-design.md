# Worker 탭 추가

## 목적

`beads-ui` 안에 **worker orchestration 전용 탭**을 추가하여, 현재 workspace의
parent 이슈를 중심으로 작업 진행 상황을 모니터링하고, `bd-ralph-v2` 및
`pr-review` 실행과 spec/PR 확인을 한 화면에서 처리할 수 있게 한다.

이 탭은 기존 `Issues` / `Epics` / `Board`를 대체하지 않는다. 대신 이슈 조회/편집용
탭과 분리된 **운영용 화면**으로 동작한다.

## 문제 정의

현재 `beads-ui`는 issue list, epic group, kanban board, detail view를 제공하지만,
다음과 같은 worker 운영 관점의 공백이 있다.

1. **parent 이슈 단위의 실행/모니터링 화면이 없다**
   - 기존 `epics` 뷰는 parent/child 계층을 보여주지만, execution orchestration용으로
     설계된 화면은 아니다.
   - `bd-ralph-v2` 실행 가능 여부, PR 진행 여부, spec 존재 여부를 한 줄에서 보기가 어렵다.

2. **child 상태를 parent 진행률로 요약하는 운영 시각화가 없다**
   - parent의 child 상태를 합산해서 “어디까지 왔는지”를 빠르게 읽는 progression bar가 없다.
   - 특히 `open / in_progress / resolved / closed`를 운영 감각에 맞게 표현하는 별도
     화면이 없다.

3. **worker action과 spec/PR 맥락이 분리되어 있다**
   - spec은 기존 detail에서 경로만 볼 수 있고, inline 수정은 지원하지 않는다.
   - PR과 `pr-review`, `bd-ralph-v2` 실행도 기존 UI 안에서 연결되지 않는다.
   - 별도 worker 도구로 이동하지 않으면 parent 중심 운영 루프가 끊긴다.

4. **현재 workspace 기준 운영 overview가 부족하다**
   - `beads-ui`는 workspace 전환은 지원하지만, 현재 workspace의 worker 대상 parent와
     관련 PR 현황을 한눈에 보는 화면은 없다.

## 목표

- top nav에 새 `Worker` 탭을 추가한다.
- Worker 탭은 **현재 선택된 workspace 기준**으로 동작한다.
- 왼쪽 패널에 parent 이슈 중심 tree를 보여준다.
- 각 parent row에서 child 상태 기반 progression bar를 보여준다.
- child는 expand 시 표시하되, `closed` child는 기본 숨김으로 둔다.
- parent row에서 `bd-ralph-v2`, `pr-review`, spec 열기 액션을 제공한다.
- 오른쪽 패널에서 선택 parent의 summary, spec 보기/수정, 관련 PR, workspace-wide PR 요약을 제공한다.
- 첫 버전의 실행 상태 표시는 **badge 중심**으로 유지한다.

## 비목표

다음 항목은 이번 변경 범위에서 제외한다.

- multi-workspace worker overview
- child 이슈 단위 실행 버튼
- transcript tail / full log viewer
- queue 관리 UI, concurrency tuning UI
- spec 파일 신규 생성 wizard
- PR merge/close 전체 finisher UI
- conflict resolution UX
- `closed` parent를 기본 노출하는 archival worker 화면

## 현재 상태

- `app/views/nav.js`는 `Issues`, `Epics`, `Board` 세 탭만 제공한다.
- `app/router.js`는 `issues | epics | board` view만 parse/goto한다.
- `app/views/epics.js`는 parent/child 계층 렌더링과 expand/collapse를 이미 지원한다.
- `app/views/detail.js`는 `spec_id`, `metadata.plan`, `metadata.handoff`를 읽기 전용으로
  노출할 수 있다.
- `server/ws.js`는 push-only subscription 모델과 workspace 전환을 이미 제공한다.
- `beads-worker` 레포에는 `bd-ralph-v2`, `pr-review`, spec viewer, PR reader, job 상태 표시를
  다루는 별도 구현이 존재한다.

이번 spec는 이 구조를 바탕으로, `beads-ui` 안에 worker-oriented 탭을 추가하는 설계다.

추가로 중요한 제약 하나가 있다. 현재 `beads-ui`의 `selected_id`는 전역 issue detail dialog와
강하게 연결되어 있다. 따라서 Worker 탭은 기존 `selected_id`를 재사용하지 않고,
**Worker 전용 selection state**를 별도로 둬야 한다.

## 결정 요약

### 선택한 방향

**`beads-ui` 안에 새 `Worker` 탭을 추가하고, 왼쪽에는 parent 중심 tree와
progression/action row를, 오른쪽에는 선택 parent의 spec/PR/상태 패널을 두는
split-view 구조를 채택한다.**

### 왜 이 방향인가

- `epics`를 그대로 확장하는 방식보다 탭 책임이 명확하다.
- 기존 `workspace-picker`, push subscription, detail metadata 구조를 그대로 활용할 수 있다.
- `beads-worker`의 장점(실행/운영 UX)을 가져오되, 별도 앱을 강제하지 않는다.
- 향후 job tail, queue, richer audit를 추가해도 자연스럽게 확장된다.

## 설계

## 1. 화면 구조

### 1.1 새 탭 추가

top nav에 `Worker` 탭을 추가한다.

- 기존 탭: `Issues`, `Epics`, `Board`
- 신규 탭: `Worker`

`Worker`는 조회용이 아니라 **운영/실행용** 화면이라는 점이 기존 탭과 다르다.

### 1.2 라우팅

새 hash route를 추가한다.

- `#/worker`
- 선택 parent가 있을 때: `#/worker?issue=<id>`

이를 위해 현재 `issues | epics | board`만 지원하는 라우팅/URL helper를 Worker까지 확장한다.
즉, `app/router.js`, `app/state.js`, `app/utils/issue-url.js`는 이번 spec의 명시적 변경 범위에 포함된다.

기존 canonical query 방식(`?issue=<id>`)은 유지하되, Worker 탭의 `issue` query는
**Worker 전용 selected parent state**에만 연결한다.

즉:
- `issues / epics / board`에서는 기존 `selected_id`가 detail dialog selection을 의미한다.
- `worker`에서는 `issue` query가 `worker.selected_parent_id`를 의미한다.
- Worker 탭에 있을 때는 기존 detail dialog를 자동으로 열지 않는다.

따라서 구현에는 다음 중 하나가 필요하다.
- store에 `worker.selected_parent_id`를 추가하거나
- 동등한 Worker 전용 selection state를 별도 계층으로 도입한다.

중요한 점은 **Worker selection이 기존 global detail selection side effect를 유발하면 안 된다**는 것이다.

### 1.3 2-panel layout

Worker 탭은 다음 두 패널로 구성한다.

- **왼쪽 패널: Worker Tree**
  - parent filters
  - parent tree list
  - expand/collapse child rows
- **오른쪽 패널: Worker Detail**
  - parent summary
  - status badges / action context
  - spec viewer/editor
  - selected parent PRs
  - workspace-wide open PR summary

### 1.4 parent 중심 목록

왼쪽 목록의 1차 단위는 parent 이슈다.

노출 대상:
- `parent-child` 관계에서 parent인 이슈
- child를 가진 `feature` / `epic`
- 현재/최근 worker job 대상이 된 parent

기본적으로 `closed` parent는 목록에서 제외한다.

### 1.5 child 노출 규칙

- expand 시 child rows를 보여준다.
- 기본 노출 상태: `open`, `in_progress`, `resolved`
- `closed` child는 기본 숨김
- child 영역 하단에 `Show closed (N)` 토글을 둔다.

여기서 중요한 규칙은:
- **progress 계산에는 closed child 포함**
- **기본 렌더에는 closed child 제외**
라는 점이다.

## 2. 왼쪽 패널: Worker Tree

### 2.1 canonical `runnable` 정의

Worker 탭에서 `runnable`은 아래 predicate로 고정한다.

```text
runnable = is_parent && has_spec_id && !has_active_job && workspace_is_valid && parent_status != closed
```

각 항목의 판정 기준은 다음처럼 고정한다.

- `is_parent`
  - `parent-child` 관계에서 parent로 식별되거나, child를 가진 `feature`/`epic`이다.
- `has_spec_id`
  - issue의 `spec_id`가 비어 있지 않은 문자열이다.
- `has_active_job`
  - `/api/worker/jobs` 기준 현재 parent+workspace 조합에 대해 상태가 `running`, `capacity-wait`, `needs-attention` 중 하나인 job이 존재한다.
- `workspace_is_valid`
  - app state의 `workspace.current`가 존재하고, Worker API 호출 시 그 workspace path를 유효한 current workspace로 사용할 수 있다.
  - 첫 버전에서는 registry 재검증까지 포함하지 않고, **현재 선택된 workspace가 존재하는지**를 canonical 기준으로 본다.
- `parent_status != closed`
  - parent의 자체 status를 의미한다.
  - `resolved` parent는 runnable에 **포함**한다. 즉, `closed`만 runnable에서 제외한다.

이 정의는 다음 세 곳에서 동일하게 재사용한다.

- `runnable only` filter
- parent 기본 정렬의 `runnable` 우선순위 판단
- `Run bd-ralph-v2` 버튼 활성화 판단

즉, selector / view / server helper가 각각 유사하지만 다른 조건을 따로 해석하지 않도록 한다.

### 2.2 filters

첫 버전 필터는 아래 네 가지로 제한한다.

- search (`id`, `title` 대상)
- status (`all`, `open`, `in_progress`, `resolved`)
- `runnable only`
- `has open pr only`

필터는 모두 AND 조건으로 조합한다.

### 2.3 parent row 표시 요소

각 parent row는 다음 정보를 표시한다.

- expand toggle
- `id`
- `title`
- `issue_type`
- progression bar + percent
- child 상태 집계 텍스트
- status badges
- action buttons

### 2.4 parent 기본 정렬

Worker tree의 기본 정렬은 운영 우선순위가 높은 항목이 위로 오도록 고정한다.

우선순위:
1. active job이 있는 parent (`RUNNING`, `WAITING`, `NEEDS-ATTN`)
2. `runnable` parent
3. parent status 우선순위: `in_progress` → `open` → `resolved`
4. priority 오름차순 (`0`이 가장 높음)
5. `updated_at` 내림차순 (없으면 `created_at` 내림차순)
6. `id` 오름차순

이 정렬은 필터 적용 후에도 stable하게 유지한다.

예시 정보 구조:

```text
UI-nl9g · feature
workspace discovery watcher 후속 안정화
[progress bar] 72%
2 closed · 1 resolved · 1 in_progress · 3 open
[RUNNING] [HAS SPEC] [OPEN PR]
[Run bd-ralph-v2] [Run pr-review] [Open spec]
```

### 2.5 child row 표시 요소

child row는 간결하게 유지한다.

- `id`
- `title`
- `status`
- 필요 시 `issue_type`

child row는 Worker 탭의 운영 보조 정보이며, 첫 버전의 중심 상호작용 단위는 아니다.

## 3. 진행률 계산 규칙

Worker 탭의 progression은 **child 상태 가중치 기반**으로 계산한다.

### 3.1 상태 가중치

- `open = 0.0`
- `in_progress = 0.5`
- `resolved = 0.85`
- `closed = 1.0`

### 3.2 계산식

child가 하나 이상 있을 때:

```text
progress = sum(child_weight) / child_count
```

퍼센트는 0–100으로 변환하여 표시한다.

### 3.3 child 없는 parent fallback

child가 없으면 parent 자체 상태를 같은 가중치로 환산한다.

- parent `open` → 0%
- parent `in_progress` → 50%
- parent `resolved` → 85%
- parent `closed` → 100%

### 3.4 근거 표시

진행률 숫자만 보여주지 않고, 상태별 집계 텍스트를 함께 보여준다.

예:

```text
2 closed · 1 resolved · 1 in_progress · 3 open
```

## 4. 실행 가능 조건과 badge 정책

### 4.1 `Run bd-ralph-v2` 활성 조건

`Run bd-ralph-v2` 버튼은 위의 canonical `runnable` predicate가 true일 때만 활성화한다.

즉, 모두 만족해야 한다.

1. 대상이 parent 이슈다.
2. `spec_id`가 있다.
3. parent 상태가 `closed`가 아니다.
4. 현재 parent에 active job이 없다.
5. 현재 workspace가 유효하다.

비활성 사유는 tooltip 또는 보조 설명으로 노출한다.

예:
- `Spec required`
- `Already running`
- `Parent issue only`
- `Closed issue`

### 4.2 `Run pr-review` 활성 조건

`pr-review`는 **대상 PR이 단일하게 결정될 때만 직접 실행**한다.

parent row의 `Run pr-review` 버튼 활성 조건:
1. 연결된 open PR이 정확히 1개 존재한다.
2. 현재 parent에 active job이 없다.
3. 현재 workspace가 유효하다.
4. parent 상태가 `closed`가 아니다.

동작 규칙:
- open PR이 **1개**면 parent row에서 직접 `pr-review`를 실행할 수 있다.
- open PR이 **2개 이상**면 parent row의 `Run pr-review` 버튼은 비활성화하고,
  오른쪽 `selected parent PR panel`에서 **각 PR row별 실행 버튼**을 제공한다.
- open PR이 **0개**면 비활성화한다.

즉, Worker 탭에서는 “여러 PR이 있는 parent에 대해 어떤 PR을 실행할지”를 암묵적으로 추정하지 않는다.

UI는 issue id 또는 selected PR number 기준으로 action을 보내고, 최종 PR number resolve/검증은 서버가 담당한다.

### 4.3 badge 집합

첫 버전 badge는 아래 집합으로 제한한다.

상태성 badge:
- `RUNNING`
- `WAITING`
- `FAILED`
- `NEEDS-ATTN`

문맥성 badge:
- `HAS SPEC`
- `OPEN PR`

우선순위는 상태성 badge를 앞에 둔다.

### 4.4 실패 표시 정책

첫 버전 실패/문제 표시는 badge 중심으로 둔다.

- `FAILED`: 최근 실행 job이 실패로 끝남
- `NEEDS-ATTN`: 수동 개입 필요 상태
- `RUNNING`: 현재 실행 중

긴 transcript/log tail은 이번 범위에서 제외한다.

## 5. 오른쪽 패널: Worker Detail

### 5.1 parent summary

오른쪽 상단 summary는 다음을 보여준다.

- `id`, `title`, `issue_type`, `status`
- progression
- child 상태 분포
- action context badge

### 5.2 spec panel

선택 parent의 `spec_id`가 있으면 markdown 내용을 로드해서 보여준다.

모드:
- read mode
- edit mode

편집 규칙:
- inline markdown editor
- `Save` / `Cancel`
- 저장 중 중복 submit 방지
- path-safe write 후 viewer refresh

이번 범위에서 지원하는 것은 **기존 `spec_id` 문서 수정**이다.
신규 spec 생성 wizard는 제외한다.

### 5.3 selected parent PR panel

선택 parent와 연결된 open PR 목록을 보여준다.

표시 정보 예:
- `#number`
- `title`
- `state`
- `baseRefName ← headRefName`
- per-PR `Run pr-review` 버튼

이 패널은 parent 맥락에 집중한다.
다중 open PR이 있는 parent에서는 이 패널이 `pr-review` 실행의 canonical 진입점이다.

### 5.4 workspace-wide open PR summary

현재 workspace에 열려 있는 open PR을 별도 summary 섹션으로 보여준다.

이 섹션은 선택 parent의 세부정보가 아니라, 현재 workspace 운영 overview를 위한 것이다.

## 6. 프론트엔드 구조

### 6.1 신규/변경 컴포넌트

예상 변경 파일은 아래와 같다.

| 파일 | 역할 |
| --- | --- |
| `app/state.js` | Worker 전용 selection state shape 추가 (`worker.selected_parent_id` 또는 동등 구조) |
| `app/router.js` | `worker` view parse/goto 지원, Worker query semantics 반영 |
| `app/utils/issue-url.js` | Worker용 canonical issue hash helper 지원 |
| `app/views/nav.js` | `Worker` 탭 추가 |
| `app/main.js` | `worker-root` shell 추가, Worker view mount, route visibility, wiring |
| `app/views/worker.js` | Worker 탭 shell |
| `app/views/worker-toolbar.js` | filters UI |
| `app/views/worker-tree.js` | parent tree/expand 관리 |
| `app/views/worker-parent-row.js` | parent row 렌더 |
| `app/views/worker-child-row.js` | child row 렌더 |
| `app/views/worker-detail.js` | 오른쪽 패널 shell |
| `app/views/worker-spec-panel.js` | spec 보기/수정 |
| `app/views/worker-pr-panel.js` | selected parent PR panel |
| `app/views/worker-pr-summary.js` | workspace-wide PR summary |
| `app/data/worker-selectors.js` | Worker 전용 derived selector 계산 |
| `app/styles.css` | Worker 레이아웃/row/panel 스타일 |

### 6.2 selector 계층

기존 push issue store를 그대로 재사용하되, Worker 탭 전용 파생 계산을
`app/data/worker-selectors.js`에 모은다.

이 selector 계층은 다음 책임을 가진다.

- parent 후보 추출
- child grouping
- progression 계산
- badge 계산
- filter 적용
- runnable/open-PR 상태 계산

이렇게 하면 view 컴포넌트는 presentation에 집중할 수 있다.

## 7. 서버/API 구조

이 spec는 기존 issue subscription 전체를 새 API로 대체하지 않는다.

원칙:
- issue/relationship 데이터는 기존 subscription snapshot을 최대한 재사용
- jobs / PR / spec write/read만 worker 전용 경로로 보강

### 7.1 worker jobs API

신규 API를 추가한다.

예상 구현 파일:
- `server/routes/worker-jobs.js`
- `server/worker/jobs.js` (또는 동등한 manager module)
- `server/app.js` mount 추가

예상 엔드포인트:
- `GET /api/worker/jobs`
- `POST /api/worker/jobs`

`POST` request 예:

```json
{ "command": "bd-ralph-v2", "issueId": "UI-nl9g", "workspace": "/repo" }
```

또는

```json
{ "command": "pr-review", "issueId": "UI-nl9g", "workspace": "/repo" }
```

서버는 `pr-review`의 경우 linked PR number를 resolve한 뒤 실행한다.

### 7.2 worker PR API

예상 구현 파일:
- `server/routes/worker-prs.js`
- 필요 시 `server/worker/pr-reader.js`

예상 엔드포인트:
- `GET /api/worker/prs/:issueId`
- `GET /api/worker/prs?workspace=<path>`

첫 번째는 selected parent용,
두 번째는 workspace summary용이다.

### 7.3 worker spec API

예상 구현 파일:
- `server/routes/worker-spec.js`
- `server/worker/spec-reader.js`
- `server/worker/spec-writer.js`

예상 엔드포인트:
- `GET /api/worker/spec/:issueId`
- `PUT /api/worker/spec/:issueId`

read는 `spec_id` 경로를 안전하게 읽어 markdown를 반환한다.
write는 다음 조건을 만족해야 한다.

- `spec_id`가 존재한다.
- 상대 경로이며 `docs/`로 시작한다.
- `.md` 확장자만 허용한다.
- 절대 경로를 금지한다.
- `..` traversal을 금지한다.
- workspace root 기준으로 canonical resolve한 결과가 `<workspace>/docs/**` 아래에 남아 있어야 한다.
- symlink를 따라간 최종 canonical path도 `<workspace>/docs/**` 밖으로 벗어나면 안 된다.
- 파일이 아직 없더라도 canonical parent directory가 `<workspace>/docs/**` 아래인지 검증해야 한다.
- markdown text만 저장한다.

구현은 가능하면 `beads-worker`의 `path-safety` / `spec-reader` 패턴과 동등한 helper를 재사용하거나
같은 수준의 검증 함수를 도입한다.

### 7.4 parent summary 전용 API는 만들지 않음

parent/child/progression summary는 프론트 selector에서 계산한다.
서버가 summary까지 만들어 주는 구조는 첫 버전에서 불필요하게 복잡하다.

## 8. job 상태 공급 방식

첫 버전은 **`GET /api/worker/jobs` polling** 을 사용한다.

선택 이유:
- 구현 범위를 spec/PR/job API 추가로 한정할 수 있다.
- 기존 issue 데이터는 이미 websocket push를 사용하고 있으므로, job 상태까지 같은 릴리스에서
  push로 묶지 않아도 운영 가치가 충분하다.
- 실행 상태 badge 중심이라는 첫 버전 목표와 잘 맞는다.

구체 규칙:
- Worker 탭이 active일 때만 polling한다.
- 기본 주기는 3초로 둔다.
- workspace 변경 시 즉시 재조회한다.
- active job이 없으면 polling을 완전히 중단하지는 않지만, 탭이 비활성일 때는 중지한다.

후속 작업에서는 websocket push(`job.started`, `job.finished`, `job.failed`)로 대체하거나
보강할 수 있다.

## 9. 선택/라우팅/전환 규칙

### 9.1 parent 선택

- 왼쪽 parent row 선택 시 오른쪽 패널이 해당 parent 기준으로 갱신된다.
- 선택된 parent id는 hash query의 `issue`에 반영한다.

### 9.2 필터 변경 시 선택 유지

- 필터 후에도 선택 parent가 남아 있으면 유지
- 필터 결과에서 사라지면 첫 visible parent를 자동 선택

빈 오른쪽 패널보다 항상 유효한 운영 컨텍스트를 보여주는 쪽이 낫다.

### 9.3 workspace 전환

workspace 전환 시:
- filters는 유지
- selection은 초기화 후 새 workspace의 첫 visible parent 자동 선택
- PR summary / jobs / parent tree 모두 재평가

## 10. 테스트

### 프론트엔드 테스트

- `worker-selectors` progression 계산
- closed child 기본 숨김 / `Show closed` 토글
- parent filter 적용
- route `#/worker` 진입 및 selection 복원
- button 활성/비활성 규칙
- spec panel read/edit/save/cancel
- selected parent PR panel 렌더

### 서버 테스트

- worker jobs enqueue (`bd-ralph-v2`, `pr-review`)
- linked PR resolve 실패/성공
- worker spec read path-safety
- worker spec write path-safety
- workspace PR summary response

## 11. 엣지 케이스

- child가 없는 parent → parent 상태 fallback으로 progression 계산
- `spec_id`가 없지만 PR은 있는 parent → `pr-review`만 활성 가능
- open PR이 여러 개일 수 있음 → selected parent PR panel은 리스트 + PR별 실행 버튼 형태로 처리, parent row의 단일 `Run pr-review`는 비활성
- 현재 active job이 있을 때 두 action 버튼 모두 비활성
- filter로 모든 parent가 사라질 때 → empty state 표시
- workspace 전환 후 기존 selection이 존재하지 않을 때 → 첫 visible parent 선택
- spec path가 `docs/**.md`가 아니면 editor 진입 금지

## 12. 구현 메모

- Worker 탭은 `Epics`의 parent/child 계층 아이디어를 재사용하되, action/status 중심으로 재구성한다.
- spec read는 기존 detail metadata 경로 노출의 연장선이지만, 이번에는 markdown content read/write를 추가한다.
- `beads-worker`의 `button matrix`, `derive stage`, `spec/pr reader`, `jobs` 구조는 참고하되,
  `beads-ui` 코드베이스에 맞는 더 얇은 형태로 가져온다.
- 첫 버전은 badge 중심으로 충분히 유용해야 하며, transcript/log는 후속 작업으로 분리한다.

## 수용 기준

다음 조건을 만족하면 이번 spec의 구현 목표가 달성된 것으로 본다.

1. top nav에서 `Worker` 탭으로 진입할 수 있다.
2. Worker 탭은 현재 workspace 기준 parent 중심 목록을 보여준다.
3. 각 parent row에 progression bar와 child 상태 요약이 표시된다.
4. child expand 시 `closed` child는 기본 숨김이며 `Show closed (N)`으로 노출할 수 있다.
5. `bd-ralph-v2` 버튼은 parent+spec+non-active-job 조건에서만 활성화된다.
6. open PR이 정확히 1개인 parent는 row에서 `pr-review`를 직접 실행할 수 있고, 여러 PR이 있는 parent는 오른쪽 PR panel에서 PR별 실행을 할 수 있다.
7. 오른쪽 패널에서 선택 parent의 spec을 읽고 inline 수정/저장할 수 있으며, spec 경로는 canonical path safety 검증을 통과해야 한다.
8. 오른쪽 패널에서 선택 parent PR과 workspace-wide open PR 요약을 볼 수 있다.
9. 실행 중/실패/주의 필요 상태가 badge로 표시된다.
10. workspace 전환 시 Worker 탭 데이터가 새 workspace 기준으로 갱신된다.
