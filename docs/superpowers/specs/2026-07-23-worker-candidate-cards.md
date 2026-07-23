# Worker 후보 목록 개선 — child 이슈 제외 + 상태 카드 UI (UI-ejdj)

## 배경

Worker 후보 레인은 Board Ready/Blocked 구독을 병합해 `worker-mini` 한 줄 행으로 렌더한다. 문제 셋:

1. full_plan phase-child 이슈(`UI-xxxx.N`)가 ready에 뜨면 후보로 노출된다. child는 부모 plan 실행 하위 단위라 worker 개별 디스패치 대상이 아니다.
2. 후보 행에 route(spec_backed/full_plan), spec/plan 존재 여부, 리뷰 상태가 보이지 않는다. 서버 `enrichIssuesWorkflow`가 모든 리스트 구독에 `workflow.stages`를 이미 실어주는데 후보 UI만 소비하지 않는다.
3. 한 줄 행은 정보 밀도가 낮고 board 카드와 시각 언어가 다르다.

## 변경

### 1. child 이슈 후보 제외 (클라이언트 전용)

`app/views/worker/index.js` `buildModel()`의 후보 병합 단계에서 제외:

- `issue.parent`가 있으면 child (board `parentIdOf`와 동일 판정), 또는
- id가 `/\.\d+$/` 점 표기면 child (`bd ready --json`에 `parent` 필드가 실리지 않는 경우 대비 이중 판정).

Serial/Parallel/Done 레인, admission, 큐 조작은 변경 없음. 이미 큐에 있는 child는 그대로 표시.

### 2. 후보 카드 UI (변형 B — board stepper 재사용, 사용자 선택)

목업: http://100.122.98.8:9000/2026-07-23-worker-candidate-cards.html (변형 A/B 비교 — 게이트에서 B 선택됨)

`miniRow` 대신 후보 전용 카드 템플릿(`lanes.js`):

- 헤더: 드래그 grip(⠿, draggable일 때만) + id(mono) + route 칩(우측, board `ctl-chip--route` 규칙 재사용 — derived는 점선+`?` 접미).
- 제목: 2줄 클램프.
- 스테퍼: board의 `stepperTemplate`(`app/views/board/stepper.js`)를 그대로 재사용 — `workflow.stages`를 소비해 route 순서(spec_backed: spec/impl/pr/merge 4셀, full_plan: +plan 5셀)로 렌더. 상태 표현은 stepper 기존 규칙(dim=문서 있음·미리뷰, ✓=reviewed, ⊘=skip, stale=✓ 흐림)을 그대로 따른다.
- 기존 🔒(의존 차단)·⛔(admission 거부) 표시는 카드 하단 행에 유지.
- 표시 전용: draggable 조건(`hasSpec`)과 admission 로직은 그대로. 리뷰 여부는 차단 요건이 아니다.

Serial/Parallel/Done 레인은 기존 `miniRow` 유지(큐 스냅샷에는 workflow 데이터가 없음 — 범위 외).

## 수용 기준

- 후보 레인에 `parent` 보유 또는 점 표기 id 이슈가 나타나지 않는다 (jsdom 테스트).
- 후보 카드가 route 칩(derived `?` 포함)과 `stepperTemplate` 재사용 스테퍼(spec_backed 4셀/full_plan 5셀, 상태는 `workflow.stages` 값 그대로)를 렌더한다 (템플릿 단위 테스트).
- `workflow` 필드가 없는 이슈(비활성 워크스페이스 등)는 배지 없이 기존 정보만으로 렌더되고 예외가 없다.
- 드래그/큐 배치/admission 동작 불변 (기존 worker 테스트 green).
- `npm run all` green + 번들 재빌드.

## Non-goals

- 큐 레인(Serial/Parallel/Done) 카드화, 큐 스냅샷에 workflow 데이터 추가(서버 변경).
- admission/스케줄러 로직 변경. 리뷰 상태를 차단 요건으로 만드는 것.
- Board 카드/상세 패널 변경.
