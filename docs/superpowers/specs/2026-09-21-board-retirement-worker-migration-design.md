---
scope:
  - app/main.js
  - app/index.html
  - app/router.js
  - app/views/nav.js
  - app/views/board/
  - app/views/stepper.js
  - app/views/exec-format.js
  - app/views/worker/index.js
  - app/views/worker/lanes.js
  - app/views/worker/lane-model.js
  - app/views/worker/workspace-adapter.js
  - app/views/worker/running-grid.js
  - app/views/detail-panel/
  - app/data/closed-range.js
  - app/protocol.md
  - app/styles.css
  - app/styles/base.css
  - docs/adr/
---

# Board 탭 퇴역 — deferred 표면·새 이슈 버튼·완료 기간·우선순위/타입/라벨 필터를 워커 탭으로 이전하고 기본 뷰를 워커로

- 작업: UI-p7s2
- 작성: 2026-09-21
- 상태: 사용자 검토용 초안, 구현 미착수
- 조사 기준: `origin/main`의 `50902e0bae6b48f8c84e813652bb00465d887224`
- 선행: UI-mfm1(모니터·워커 카드 표시 통일) — `blocks`. 이 스펙은 그 스펙 §5의 슬롯 표와 §3.3의 사유 어휘, §6의 시각 규칙을 전제한다.

## 1. 요구와 확인된 현재 동작

사용자 결정(2026-09-21): Board 탭은 퇴역시키고, 남길 기능을 워커 탭으로 옮긴다. 옮길 것은 deferred 표면, `+ 새 이슈` 버튼, 완료 기간 `최근 30일`·`전체`, 우선순위·타입·라벨 필터다. 드래그로 상태 변경과 카드 키보드 탐색은 옮기지 않는다(이슈 상세의 상태 드롭다운이 대체).

Board가 지금 가진 것과 워커 탭의 현황은 다음과 같다.

| 기능 | Board 위치 | 워커 현황 | 처분 |
|---|---|---|---|
| Blocked·Ready·In progress·Resolved·Closed 5칸 | `app/views/board/index.js` `BOARD_CLIENT_IDS`, `column.js` | 실행 레인(후보·대기·실행 중·PR 대기·완료)이 다른 축으로 덮음 | 이전 없음 |
| deferred 팝업·개수 배지 | `deferred-popup.js`, `filter-bar.js`, `index.js` 741–769; 구독 `tab:board:deferred` → `deferred-issues` | 없음 — `app/main.js WORKER_SUBS`에 `deferred-issues`가 없고 `workspace-adapter.js`에 deferred 컬럼 키가 없음 | **이전** (§3) |
| `+ 새 이슈` | `filter-bar.js` 198–204 → `onNewIssue` → `main.js createNewIssueDialog` | 버튼 없음, `Cmd/Ctrl+N` 단축키만(`main.js` 2072–2091) | **이전** (§4) |
| Closed 기간 `오늘/7일/30일/전체` | `column.js` 헤더, `app/data/closed-range.js CLOSED_RANGE_OPTIONS` | 완료 레인 `DONE_RANGE_OPTIONS`(`오늘`·`7일`), `normalizeDoneRange`가 `30d`/`all`을 `7d`로 접음 | **이전** (§5) |
| 검색(ID·제목) | `filter-bar.js` 132–139 | 있음(`worker/index.js` 3602–3607) | 이전 없음 |
| 우선순위·타입·라벨 필터 | `filter-bar.js` 37–117, `index.js` 245–263 | 없음(준비도·route 필터만, `CANDIDATE_FILTER_KEY`) | **이전** (§6) |
| 정렬(생성·수정·우선순위·수동) | `filter-bar.js` 55–61 | 후보 정렬 체인(`candidate-sort.js`)이 상위 집합 | 이전 없음 |
| 드래그로 상태 변경 · 같은 칸 수동 정렬 | `index.js` 1000–1131, `reorder.js` → `update-status`·`ui-order-set` | 없음 | 제외(사용자 결정) |
| 키보드 탐색 | `index.js` 1134–1222 | 없음 | 제외(사용자 결정) |
| 스테퍼·칩 포맷터·자식 롤업 | `board/stepper.js`, `board/card.js`(`formatExecReceipt`·`formatPlannedExecution`·`childExecChips`·`execReceiptActor`), `utils/child-rollup.js` | 이미 `worker/lanes.js`·`running-grid.js`·`detail-panel/`가 import | 공유 위치로 이동 (§7.3) |
| 기본 뷰·레거시 해시 | `router.js parseView` → `'board'`, `#/issues`·`#/epics`·`#/issue/<id>` → `#/board…`; `nav.js activeView` 기본 `'board'` | 워커는 `#/worker?issue=<id>` | worker로 재지정 (§7.1) |
| bench 라벨 제외 정책 | `index.js` 240–244 | 워커는 의도적으로 표시(실행 탭) | 이전 없음 |

서버 `deferred-issues` 리스트 어댑터(`server/list-adapters.js`)의 소비자는 지금 Board뿐이다. 이 스펙 뒤에는 워커 탭이 소비자가 되므로 어댑터는 남는다.

## 2. 선택한 방식과 대안

**deferred — 선택: 후보 레인 아래의 접힌 "보류" 구역(§3).** 대안 (a) Board의 모달 팝업 이식: 팝업은 열어야 보이고 워커 탭엔 여는 자리(Board 필터 바)가 없다. 대안 (b) 여섯 번째 레인: 화면 폭을 항상 나눠 갖는데 deferred는 가끔 들여다보는 선반이다(Board 스펙의 판단과 같다). 접힌 구역은 후보 레인 안에서 "지금 안 하는 것"으로 읽히고 개수만 상시 보인다.

**완료 기간 — 선택: 워커 완료 레인의 어휘를 `CLOSED_RANGE_OPTIONS`로 넓히고, 닫힌 이슈를 보고서 유무와 무관하게 완료 레인에 합친다(§5).** 어휘만 넓히는 것으로는 부족하다: 지금 `workspace-adapter.js sessionDoneRows()`는 `closed-issues` 구독 행 중 댓글이 있고 `get-comments`로 `lane === 'session'` 완료 보고서가 확인된 이슈만 완료 행으로 만들므로, 보고서 없는 닫힌 이슈와 스냅샷 보존 창 밖의 옛 Worker 완료 이슈는 기간을 넓혀도 계속 빠진다. 대안 서버 스냅샷 보존 확대는 Worker 완료 행(attempt 기록)의 보존 창을 늘리는 서버 변경이라 범위가 크고, 보고서 없는 닫힌 이슈는 그래도 빠진다. 선택안은 클라이언트 합치기 규칙 하나로 두 누락을 함께 없앤다.

**필터 — 선택: 기존 `worker-filter` 줄에 세 축을 더하고 `CANDIDATE_FILTER_KEY` 객체를 확장한다(§6).** Board의 `<select>`와 라벨 팝오버 형태를 워커의 칩·팝오버 문법에 맞춘다.

**퇴역 순서 — 선택: 한 Bead 안에서 이전(unit-01) → 퇴역(unit-02) 두 unit.** 이전이 착지하지 않은 채 Board를 지우면 deferred가 어디에도 없는 창이 생긴다. 두 unit은 같은 Bead의 같은 PR에 순서대로 들어간다.

## 3. deferred 보류 구역

### 3.1 구독과 재료

- `app/main.js WORKER_SUBS`에 `['tab:worker:deferred', 'deferred-issues']`를 더한다. 워커 탭이 활성일 때만 구독하는 기존 생명주기(`ensureWorkerSubscriptions`) 그대로다.
- `workspace-adapter.js`에 `DEFERRED_KEY = 'tab:worker:deferred'`와 `column(DEFERRED_KEY, 'deferred')`를 더하고, `read()` 결과에 `deferred: any[]`를 싣는다. 행 형태는 후보 행과 같은 사실 키(UI-mfm1 §3.1 `CandidateFacts` + `observation: true`)다. 자격 판정은 하지 않으므로 `route`·`spec_state`는 표시 재료(칩)로만 쓰인다.
- `lane-model.js buildLanes`가 `LaneModel.deferred: LaneItem[]`을 더한다. `runnable`에 섞지 않고, 준비도·route 필터와 숨김 개수에 넣지 않으며, 검색(`search`)과 §6의 우선순위·타입·라벨 필터는 적용한다. 정렬은 `updated_at` 내림차순 고정(선반이라 정렬 선택지가 없다). 모니터의 서버 스냅샷에는 deferred가 없으므로 모니터에서는 빈 배열이고 구역이 서지 않는다(fail-quiet).
- 대기 레인 자동 제거(ADR UI-tqqp)는 그대로다: deferred Bead는 병렬·직렬 대기에 있을 수 없고, 보류 구역의 카드에는 `[↴ 대기로]`가 없다.

### 3.2 표시

후보 레인(`paneTemplate`의 후보 pane) 본문 맨 아래, 후보 카드 목록 뒤에 `<details class="worker-deferred">`를 둔다.

- `<summary>`: `보류 <N>` — N은 필터 적용 후 개수. N이 0이면 구역 자체를 그리지 않는다(재료가 없는 줄은 그리지 않는다).
- 기본 접힘. 열림 상태는 `localStorage['bdui.worker.deferred-open']`에 `'1'`로 남기고, 읽기 실패는 접힘이다.
- 카드: 같은 `candidateCard`에 `options.variant = 'deferred'`를 넘긴다. 이 변형은 (1) foot의 `[↴ 대기로]`와 place 메뉴를 그리지 않고, (2) 슬롯 4a 준비도 칩을 그리지 않으며(자격을 묻지 않는 선반이다), (3) 카드 전체에 `worker-card--deferred`(`opacity: .7`, route tint 없음, `--border-panel` 테두리)를 준다. ID 클릭 복사·제목·stepper·의존 칩·좌표 칩·시각은 그대로다. 카드 클릭으로 이슈 상세를 여는 기존 경로(`onNavigate`)가 상태를 되돌리는 자리다(상세의 상태 드롭다운).
- 후보 pane 헤더의 개수(`후보 N`)에는 보류를 세지 않는다.

## 4. `+ 새 이슈` 버튼

워커 툴바(`worker/index.js`의 검색 입력이 있는 줄) 오른쪽 끝에 `op-btn op-btn--primary worker-new-issue` 버튼 `+ 새 이슈`를 둔다. `createWorkerView` 옵션에 `onNewIssue`를 더하고 `main.js`가 Board에 넘기던 같은 콜백(`createNewIssueDialog` 열기)을 넘긴다. 단축키 `Cmd/Ctrl+N`은 그대로다. 모바일(≤ 500px)에서는 아이콘 `+`만 남기고 `aria-label="새 이슈"`.

## 5. 완료 레인 기간 — 30일·전체

- `app/data/closed-range.js`: `DONE_RANGE_OPTIONS`를 `CLOSED_RANGE_OPTIONS`와 같은 네 값(`today`·`7d`·`30d`·`all`)으로 넓히고 `short` 라벨(`오늘`·`7일`·`30일`·`전체`)을 유지한다. `DoneRange` typedef는 `ClosedRange`의 별칭이 되고 `normalizeDoneRange`는 `isClosedRange`로 검증해 알 수 없는 값만 `7d`로 접는다(저장값 `30d`/`all`을 더 이상 좁히지 않는다).
- `main.js workerClosedSpec()`은 `closedRangeSince(worker_done_range)`를 이미 넘기므로 `all`은 `since` 없는 구독, `30d`는 30일 전 `since`가 된다. 변경 없음.
- **완료 레인 합치기 규칙.** 완료 레인은 (a) 서버 스냅샷의 Worker 완료 행(`q.done`, attempt 기록, 보존 창 안)과 (b) `closed-issues` 구독의 닫힌 이슈 중 (a)에 없는 것의 합집합이다. 중복 제거는 `root_dir` 안 이슈 `id` 기준이고 (a)가 이긴다. (b)의 각 행은 `sessionDoneRows()`의 기존 `get-comments` 조회로 **분류만** 한다:
  - 세션 완료 보고서(`lane === 'session'`)가 확인되면 지금과 같은 **세션 완료 행** — 세션 배지, `작업` 시간(in_progress 시작~닫힘), 슬롯 5 실행 사실.
  - 그 밖(댓글 없음, 보고서가 세션 lane이 아님, 조회 실패, 조회 대기 중)은 **닫힘 행** — `done: true`, 세션 배지 없음, `작업` 시간 없음, 실행 사실 칩 없음. ID·제목·route 칩·`완료 <시각>`(`closed_at`)·의존 칩만 선다. 출처를 모르는 행에 세션 배지를 붙이지 않는다는 것이 이 행의 규칙이다. 조회가 끝나 세션 보고서로 판명되면 기존 `invalidate()` 재렌더로 세션 완료 행으로 바뀐다.
  - `comment_count`가 0이면 조회 없이 바로 닫힘 행이다(지금은 이 행을 통째로 건너뛴다).
- 보존 창 밖의 옛 Worker 완료 이슈는 (b)로만 오고 그 보고서는 `lane === 'worker'`이므로 닫힘 행으로 선다. 각주는 달지 않는다.
- Board Closed 칸의 `CLOSED_RANGE_KEY`·`CLOSED_CLIENT_ID` 저장값은 §7과 함께 사라진다.

## 6. 우선순위·타입·라벨 필터

`worker-filter` 줄(`candidateControlsTemplate`)의 route 필터 뒤에 세 조작을 더한다. 저장은 기존 `CANDIDATE_FILTER_KEY` 객체에 세 키를 더한 것이고, 없는 키는 "전체"다.

| 축 | 조작 | 저장 키 | 판정 |
|---|---|---|---|
| 우선순위 | 칩 묶음 `P0`–`P4`, 다중 선택, 빈 선택 = 전체 | `priorities: number[]` | `priorities.includes(item.priority)` |
| 타입 | `<select class="worker-sort">` `타입 / bug / feature / task / epic / chore` | `type: string` | `type === '' \|\| item.issue_type === type` |
| 라벨 | `라벨 ▾` 버튼 + 팝오버 체크 목록(기존 `chip-popover` 문법) — 옵션은 후보·보류 행 라벨의 합집합, 표시 정책과 무관하게 전부 | `labels: string[]` | `labels.length === 0 \|\| labels.some(l => item.labels.includes(l))` |

- **적용 범위는 Board와 같이 모든 레인이다.** Board는 세 필터를 다섯 칸 전부에 적용했으므로(`board/index.js` 필터 적용은 칸을 가리지 않는다) 워커에서도 후보·보류·대기(병렬·직렬)·실행 중·PR 대기·완료 전부에 적용한다. 다만 표현은 레인 성격을 따른다: 후보·보류는 **숨김**(기존 준비도·route 필터와 같은 `per_control` 산식으로 `hidden.priority`·`hidden.type`·`hidden.label`을 세고 각 조작 옆에 `숨김 N`), 대기·실행 중·PR 대기·완료는 검색어와 같은 **흐림**(`search_match`와 같은 자리에 `filter_match: false` → `is-dimmed`) — 대기 행을 숨기면 직렬 순번과 큐 위치가 화면에서 어긋나고 실행 중 타일을 숨기면 슬롯 점유가 보이지 않기 때문이다. `lane-model.js`의 `CandidateFilter`가 세 키를 얻고 `buildLanes`가 모든 레인 항목에 같은 판정을 적용한다.
- **재료.** 어댑터 행(후보·보류·세션 완료·닫힘)은 `bd` 원본 필드의 `issue_type`·`priority`·`labels`를 그대로 옮긴다. 대기·실행 중·PR 대기·Worker 완료 행은 서버 큐 스냅샷에서 오므로 워커 탭의 `bead_overlay`(`lane-model.js` "이슈 필드 오버레이" `{ priority?, from_id?, metadata?, route?, rollup? }`)에 `issue_type?`·`labels?`를 더해 얻는다 — 오버레이 원천은 워커 탭이 이미 구독하는 in-progress·resolved·closed 컬럼이다. 판정할 필드가 없는 행은 **일치로** 본다(숨기거나 흐리지 않는다, fail-quiet). 서버 `RunnableItem`은 바꾸지 않는다(모니터 필터는 비목표).
- **라벨 옵션.** 팝오버 목록은 워커 탭이 지금 그리는 모든 레인 행(후보·보류·대기·실행 중·PR 대기·완료)의 라벨 합집합이고 표시 정책과 무관하게 전부 보인다.
- 정규화: 저장값이 배열·문자열이 아니거나 모르는 값이면 그 값만 버린다(기존 route 필터의 규칙과 같다).

## 7. Board 퇴역

### 7.1 라우팅·내비게이션

- `app/router.js parseView`: 알 수 없는 해시와 `#/board`는 `'worker'`. `#/board?issue=<id>`·`#/issue/<id>`·`#/issues`·`#/epics`는 `#/worker?issue=<id>` 또는 `#/worker`로 정규화한다(기존 legacy 정규화 분기에 `board`를 더한다). `gotoIssue`·`gotoView`의 폴백도 `'worker'`.
- `app/views/nav.js`: `NAV_VIEWS`에서 `'board'`를 빼고 `activeView()` 기본값을 `'worker'`로. 저장소 탭 묶음에는 `Worker` 탭 하나만 남긴다 — 전역 탭(Monitor·비교·ADR)에서 저장소 화면으로 돌아오는 클릭 경로이므로 탭으로 유지하고, 활성 표시는 `ctl-tab is-active` 규칙 그대로다.
- `app/main.js`: `BOARD_SUBS`·`board_root`·`ensureBoardSubscriptions`·`clearBoardSubscriptions`·`CLOSED_CLIENT_ID`·`CLOSED_RANGE_KEY`·`createBoardView` 호출·`board_root.hidden` 토글을 지운다. `app/index.html`의 board 루트 요소를 지운다.
- `app/state.js`·`app/protocol.md`의 `view: 'board'` 언급을 갱신한다.

### 7.2 삭제

- `app/views/board/index.js`·`column.js`·`filter-bar.js`·`deferred-popup.js`와 그 테스트, `app/views/board/card.js`의 카드 템플릿(§7.3의 포맷터를 옮긴 뒤).
- `app/views/reorder.js`와 그 테스트: 유일한 호출자가 Board의 수동 정렬이었다. 조사 기준에서 `ui-order-set`을 보내는 클라이언트는 `reorder.js`뿐이므로 `app/data/ui-order-store.js`, `app/main.ui-order.e2e.test.js`, 서버 `server/ws/ui-order-handlers.js`와 그 저장소, `app/protocol.js`의 `subscribe-ui-order`·`unsubscribe-ui-order`·`ui-order-set`·`ui-order-snapshot` 타입, `server/ws/connection.js`의 분기를 이 Bead에서 함께 지운다. `update-status`는 이슈 상세가 쓰므로 남는다.
- `app/main.board-switch.test.js`·`app/styles.board-theme.test.js`, `app/styles/base.css`의 `.board-*` 규칙(338–1089 중 §7.3의 공유 규칙 제외), `app/styles.css`의 `.deferred-popup` 블록.
- 브라우저 저장값 `beads-ui.board.*`·Closed 기간 키는 지우지 않는다(무해한 잔존).

### 7.3 공유 코드 이동

- `app/views/board/stepper.js` → `app/views/stepper.js` (`worker/lanes.js`·`board/card.js`의 import 갱신).
- `app/views/board/card.js`의 `formatExecReceipt`·`formatPlannedExecution`·`childExecChips`·`execReceiptActor`와 그 테스트 → `app/views/exec-format.js` (`worker/running-grid.js`·`detail-panel/index.js`·`detail-panel/effective-settings-view.js`의 import 갱신).
- `app/styles/base.css`의 `.stp*`(스테퍼)·`.priority-badge`·칩 공용 규칙은 `.board-*` 접두가 아니므로 남긴다. `.board-card__*`에 얹혀 있던 규칙 중 워커가 쓰는 것이 있으면 `worker-*` 이름으로 옮긴다(구현 시 `styles.worker-theme.test.js`로 확인).

### 7.4 문서

- `docs/adr/`에 Board 퇴역 ADR(아래 후보).
- `AGENTS.md`·`docs/superpowers/specs/`의 Board 스펙들은 이력으로 남기고 고치지 않는다.

## 8. 검증과 완료 기준

- `app/router.test.js`: `#/board`·`#/board?issue=X`·`#/issue/X`·`#/issues`·`#/epics`·빈 해시·모르는 해시가 모두 `worker`로 가고 `issue` 파라미터가 보존된다.
- `app/views/nav.test.js`: 탭 목록에 Board가 없고 기본 활성이 worker다.
- `app/views/worker/workspace-adapter.test.js`: `tab:worker:deferred` 행이 `deferred`로 나오고 `runnable`에 없다.
- `app/views/worker/lane-model.test.js`: `deferred`는 준비도·route 필터·숨김 개수에 들지 않고 검색·우선순위·타입·라벨 필터에는 든다; 세 필터의 `per_control` 숨김 개수; 라벨 필터가 대기·실행 중·PR 대기·완료 행에 `filter_match: false`를 싣고 숨기지 않는다; `issue_type`이 없는 대기 행은 타입 필터에 일치로 남는다; 오버레이의 `issue_type`·`labels`가 대기 행에 실린다.
- `app/views/worker/workspace-adapter.test.js`(완료): 댓글 0개인 닫힌 이슈가 닫힘 행으로 선다(세션 배지·`작업` 없음); 보고서 `lane === 'worker'`인 옛 닫힌 이슈가 닫힘 행으로 선다; 같은 id가 `q.done`에 있으면 닫힘 행을 만들지 않는다; 세션 보고서가 확인되면 세션 완료 행이다.
- `app/views/worker/lanes.test.js`: `variant: 'deferred'` 카드에 `[↴ 대기로]`·준비도 칩이 없다.
- `app/views/worker/index.test.js`: 보류 구역이 0개면 없고, N개면 `보류 N` summary·접힘 기본·localStorage 열림 복원; `+ 새 이슈` 클릭이 `onNewIssue`를 부른다; 완료 기간 셀렉트에 네 값; 라벨 팝오버 목록이 완료 행의 라벨을 포함한다.
- `app/data/closed-range.test.js`: `normalizeDoneRange('30d') === '30d'`, `('all') === 'all'`, 모르는 값 → `7d`.
- `app/main.worker-queue-sync.test.js` 또는 새 e2e: 워커 탭 진입 시 구독 6개(`deferred-issues` 포함), Board 구독 없음.
- 저장소 규칙: `app/views/board/`가 사라진 뒤 `grep -rn "views/board" app server --include='*.js'`가 0건.
- 스크린샷: `#/worker` 1280px·390px — 보류 구역 접힘/펼침, 필터 줄, `+ 새 이슈`. `#/monitor`는 달라지지 않았음을 같은 캡처로 확인.
- Pre-Handoff Validation 전체와 `npm run build`.

## 9. 비목표

- 드래그로 상태 변경, 카드 키보드 탐색(사용자 결정으로 제외).
- 모니터 탭의 보류 구역(서버 스냅샷에 deferred 행이 없다 — 필요해지면 `runnable-cache`에 deferred 집합을 더하는 별도 작업).
- 모니터 탭의 우선순위·타입·라벨 필터(조작도 서버 재료도 더하지 않는다).
- 새 이슈 다이얼로그 자체의 변경.
- Worker 완료 행 보존 창 확대.

## 10. 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| ---- | ---------- | ---------------- | --------- | ---------------- | ------- |
| 형제 | beads-ui | user_request | 카드 렌더러·서버 runnable 행 계약(사유 어휘·슬롯·툴팁·시각)이라는 다른 계약 표면이며 이 스펙의 보류 카드·필터 줄이 그 결과 위에 선다 | 없음 | UI-mfm1 |

- 관찰: 모니터 보류 구역 — 서버 `runnable-cache`에 deferred 집합을 싣는 확장이 필요하며 사용자 요청이 있을 때 별도 작업으로 연다.

## 구현 unit 후보

- unit-01 이전: `app/main.js` 구독 · `app/views/worker/workspace-adapter.js` · `lane-model.js` · `lanes.js` · `worker/index.js` · `app/data/closed-range.js` (§3–§6)
- unit-02 퇴역: `app/router.js` · `app/views/nav.js` · `app/main.js` Board 배선 · `app/index.html` · `app/views/board/` 삭제와 `stepper.js`·`exec-format.js` 이동 · `app/styles/base.css`·`styles.css` · 테스트 · ADR (§7)

## 결정 (ADR 후보)

- 전제: ADR 0014 — 보류 카드는 같은 `candidateCard`·같은 슬롯 표를 쓴다(변형 하나만 더한다).
- 전제: ADR 0033 — 후보 레인은 관측 집합이며 보류 구역은 그 옆의 관측 선반이다; admission은 변하지 않는다.
- 전제: ADR UI-tqqp — closed·deferred Bead는 대기 레인에서 자동 제거된다; 보류 카드에 `[↴ 대기로]`가 없는 근거다.
- Board 탭을 퇴역시키고 워커 탭이 저장소의 단일 이슈 면이 된다. 되돌리기 어려움: 라우트·nav·구독·CSS·테스트·Board 뷰 코드를 제거하고 기본 뷰와 레거시 해시의 목적지가 바뀐다. 맥락 필요: 칸반 5칸을 버리고 실행 레인 하나로 합친 이유(두 면이 같은 이슈를 다르게 보여 주던 부담)와 드래그 상태 변경·키보드 탐색을 옮기지 않은 절충이 코드만으로 드러나지 않는다. 실제 절충: 상태 변경은 이슈 상세 드롭다운 한 경로만 남고 deferred는 접힌 선반으로 격하된다. `summary`: "Board 탭은 퇴역하고 워커 탭이 저장소의 단일 이슈 면이 되어 deferred 선반·완료 기간·우선순위/타입/라벨 필터·새 이슈 버튼을 흡수하며 기본 뷰와 레거시 해시는 worker로 간다" → ADR
- 완료 기간 어휘 확장과 필터 축 추가의 저장 형태. 되돌리기 쉬움: localStorage 키 확장이고 정규화가 모르는 값을 버린다 → ADR 아님
- 공유 코드의 목적지 경로(`app/views/stepper.js`·`exec-format.js`). 파일 위치일 뿐 절충이 없다 → ADR 아님
