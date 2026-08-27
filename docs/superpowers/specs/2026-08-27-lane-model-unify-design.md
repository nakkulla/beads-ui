---
scope:
  - app/views/worker/lane-model.js
  - app/views/worker/lane-model.test.js
  - app/views/worker/workspace-adapter.js
  - app/views/worker/workspace-adapter.test.js
  - app/views/worker/lane-drag.js
  - app/views/worker/lane-drag.test.js
  - app/views/worker/index.js
  - app/views/worker/index.test.js
  - app/views/worker/running-grid.js
  - app/views/worker/running-grid.test.js
  - app/views/worker/queue-blockers.test.js
  - app/views/monitor/lanes.js
  - app/views/monitor/lanes.test.js
  - app/views/monitor/index.js
  - app/views/monitor/index.test.js
  - app/views/monitor/drop-plan.js
  - app/data/worker-queue-store.js
  - app/main.bundle.js
  - app/main.bundle.js.map
---

# UI-4tud — 레인 조립 단일화 2단계: `buildLanes` 워크스페이스 N개로 통일, Worker `buildModel` 제거

- Bead: `UI-4tud` (route `spec_backed`)
- 선행: `2026-08-27-worker-monitor-lane-surface-unify-design.md`(UI-5ksp, closed) §9가
  이 Bead의 경계를 정했다. 카드 슬롯 표는
  `2026-08-25-card-header-grammar-unify-design.md`(UI-251y).
- 실행 선행(`blocks`): UI-s582(병렬성 분석·수리 경로 제거, PR #215),
  UI-d13v(후보 정렬 체인·후보 드래그 제거), UI-17mj(PR 대기 external 행 정합).
  §9.
- 사용자 결정(2026-08-27): §3.

## 1. 문제

UI-5ksp가 레인 **표면**(pane·대기 본문·접기·폭·토큰·모바일)을 한 벌로 만들었지만,
스냅샷 → 레인 모델 **조립**은 여전히 두 벌이다.

| | Worker | Monitor |
|---|---|---|
| 조립 함수 | `app/views/worker/index.js` `buildModel()` (~3035–4798, `createWorkerView` 클로저) | `app/views/monitor/lanes.js` `buildLanes(workspaces, workspaces_state, options)` (~1106–2429, export) |
| 입력 | `worker-queue` 스냅샷 + Board live store(Ready·Blocked·In-progress·Resolved·Closed) + `analysisStore` + `uiOrderStore` + `transport('get-comments')` | `monitor-pipeline` 스냅샷(`workspaces[]`, `workspaces_state[]`, `cross_lanes`) |
| 출력 | `{ queue, idToTitle, candidates, candidate_hidden, running, live_count, slots, over_cap, failure, waiting, serial_lanes, serial_lane_count, running_overlays, pr_wait, merge_queue_*, auto_excluded, declared_base, done, token_total, cleanup_failures, repo_operations }` | `MonitorLanes` — `{ runnable, runnable_all, runnable_hidden, runnable_sections, runnable_flat, queue, queue_groups, running, pr_wait, done, parallel_rows, chain_lanes, cross_lanes_revision, cross_lanes_unreadable, parallel_raw_length, owner_of }` |
| 드롭 식별자 | pane `data-lane`(`candidate`·`queue`·`s1..s5`), `onDrop`이 DOM 순서로 인덱스 계산 → `placeBead`/`reorderBead`/`removeBead` | 행 컨테이너 `data-drop`/`data-root-dir`/`data-lane-id`/`data-lane-length`, `dropTarget()` → `planDrop()` → `sendPlan()` |
| 테스트 | `buildModel`은 private — `index.test.js`(14,137줄)가 DOM으로만 간접 검증 | `lanes.test.js` 146건이 `buildLanes`를 직접 호출 |

admission 뱃지·직렬 레인 점유·실행 출발 레인·의존/겹침 칩·PR 대기·완료 행이 따로
구현돼 있어 한쪽 수정이 다른 쪽에 반영되지 않는다. 그 실증이 흡수된 UI-e9sg다:
Monitor PR 대기·완료 레인 본문(`monitor/index.js` ~1819, 모바일 `지금` ~1853)이
`miniRow(item)`을 `withOverlaps` 없이 호출해 투영이 계산한 `⧉ 겹침`·`scope 없음` 칩을
버린다.

## 2. 검증된 전제

- **서버 스냅샷은 이미 같은 계약이다.** `worker-queue`(`server/ws/worker-handlers.js`
  `decorateQueue`, ~2203–2443)와 `monitor-pipeline`(`server/ws/monitor-handlers.js`
  `buildMonitorPipeline`, ~357–423)은 워크스페이스당 **같은 `decorateQueue()` 출력**을
  싣는다(`queue`·`serial_lanes`·`lane_states`·`attempts`·`admission`·`pr_wait`·`done`·
  `merge_queue`·`merge_queue_state`·`pr_observations`·`bead_*`·`bead_scope`·
  `bead_blocked_by`·`blocker_workspaces`·`session_active`·`cleanup_failed`·
  `discard_operations`·`repo_operations`·`declared_base`·`runner_catalog`·
  `execution_defaults` 등). 차이는 셋뿐이다.
  1. envelope: `{ id, root_dir, queue }` vs `{ id, workspaces[], workspaces_state[], cross_lanes }`
     (`root_dir`·`name`은 Monitor 항목 안에 있다).
  2. `runnable`: Monitor만 서버 `runnableFor`(`server/worker/runnable-cache.js`
     `RunnableItem`)를 싣는다. Worker 후보는 클라이언트가 Board live store에서 만든다.
  3. `workspaces_state`·`cross_lanes`: Monitor만.
  따라서 "필드 정합"은 서버·프로토콜 변경 없이 **클라이언트 어댑터**로 끝난다.
- `session_active`는 두 채널 모두 같은 `SessionActiveItem` 형태다(조회 방식만 peek vs
  scan). `decoration_rev`는 어느 스냅샷에도 없다(UI-d13v가 `list-adapters` Board 투영에
  제안한 키라 이 스펙과 무관).
- Worker 후보 레인은 Monitor 후보 레인보다 **넓다**. `RunnableItem`은 자격 통과분만
  (`worker-ineligible`·spec 미발행·description 없음은 서버가 제외)이고, Worker는
  Ready+Blocked 전부를 그리며 `worker_ineligible`·`spec 없음`·`missing_description`·
  `spec_id_conflict`를 `reason`·음영으로 보여 준다(`index.js` ~3503–3600). UI-d13v는
  이 Board 경로 위에 `release_info`·`dependents_info`·정렬 체인을 얹는다.
- Monitor `planDrop`(`app/views/monitor/drop-plan.js` ~740)이 내는 큐 op는
  `worker-queue-place`·`worker-queue-reorder`·`worker-queue-remove`·
  `worker-queue-disarm`으로 Worker `placeBead`/`reorderBead`/`removeBead`가 보내는
  메시지와 같다. chain 계열(`monitor-lane-*`·`dep-add`·`dep-remove`)은
  `cross_lanes`가 있을 때만 나온다.
- Monitor `running` 타일은 이미 `last_activity`·`legs`·`dependency_chips`를 싣는다
  (`monitor/lanes.js` ~1424, ~1480). Worker `running_overlays`는 같은 재료를 타일 밖
  `Map`으로 나르는 두 번째 경로다.
- Monitor `buildLanes`에 **없는** Worker 계산: 미처리 실패 attempt 타일
  (`createUnhandledFailurePredicate`), 실패 배너 `failure`, `live_count`/`over_cap`,
  quick_fix `landing` overlay(`prWaitProgress`), 머지 큐 위치·해소·continuation·
  `autoSkipReason`·`auto_excluded`, `token_total`, `cleanup_failures` 배열,
  세션 완료 행(`session_done_rows`, `get-comments` 비동기 조회 + 캐시 + `doRender()`
  재호출, ~4195–4272), 병렬성 분석 `✳ serial 권장` 배지(UI-s582가 제거).
- **Worker의 Board live store 의존은 후보·세션 완료만이 아니다.** `buildModel`은
  다섯 상태 열 전부에서 `idToPriority`·`idToFromId`(~3198–3225)와 이슈 `metadata`
  (`beadRec`·`beadExecChips`, ~3132–3196)를 만들어 후보뿐 아니라 대기·직렬·실행·
  PR 대기·완료 행에 `priority`·`from_id`·`rec`·`exec_chips`를 덧씌운다(~3650,
  ~3817, ~3923, ~4675). 실행 설정 칩의 전역 값은 `transport('get-session-defaults')`
  로 읽어 워크스페이스 키·generation 가드로 캐시하며(~1904–1980),
  `createWorkerView`는 `refreshSessionDefaults()`를 공개 API로 노출한다(~1763).
  `worker-queue` 스냅샷에는 `execution_defaults`가 있고, Monitor `workspaces_state`
  행은 서버가 `projectExecutionDefaults`(`monitor-handlers.js` ~574)와 서버 쪽
  `session_defaults` 캐시(~130–217)로 채운다. `buildLanes`는 그 행의
  `runner_catalog`·`session_defaults`를 `pinnedExecChips`에 넘긴다(~513–525).
- **`buildLanes`는 대기·직렬·후보가 모두 없는 워크스페이스를 `queue_groups`에서
  뺀다**(`monitor/lanes.js` ~2080–2097 `has_queue`·`roots_with_candidates`). 실행
  중·PR 대기·완료·저장소 작업만 있는 정상 스냅샷에서는 그룹이 없다.
- **Monitor `dropModel`은 투영만 읽지 않는다.** `settledBlockerSources()`가 스냅샷
  원본 `workspaces[].bead_blocked_by`·`runnable[].blocked_by`의 완전성을,
  `blockedByMapWithDelta()`(~2414)가 이 세션이 보낸 `dep-add`/`dep-remove` 델타
  (`rememberDep`)를 읽는다. CAS 충돌 시 `runPlanned`(~2841)는 서버가 돌려준
  `cross_lanes`로 `projectLanes(conflict)`를 다시 돌려 전체를 재계획하고,
  `plan.correction`은 `noteCorrection(lane_id, corrected)`(~476)로 호출자 상태에
  남는다.
- **UI-d13v 확정 설계**(`2026-08-27-worker-candidate-sort-chain-release-chips-design.md`
  §5–§6): 후보 카드 `draggable=false` 고정, 배치 자격은 `queue_placeable`
  (`!done && !worker_ineligible`), Worker는 `uiOrderStore`를 읽지 않음, 정렬은
  `app/views/worker/candidate-sort.js`의 원자 키 체인, 후보 행 `dependency_chips`에
  `release_info`(7일 창·최대 2개·` 외 n`)와 `dependents_info` 칩을 싣는다. Monitor
  runnable 행은 재료가 없어 fail-quiet.
- `app/views/worker/queue-blockers.test.js`는 이미 `../monitor/lanes.js`의
  `buildLanes`를 import한다 — Worker 쪽이 Monitor 조립에 의존하는 방향이 이미 한 곳
  있다.
- Monitor 드래그 코드: `collapsedDropTarget` ~3266–3287, `dropTarget` ~3296–3353,
  `onPointerDown`/`onDragStart`/`onDragOver`/`onDragLeave`/`onDragEnd`/`onDrop`
  ~3375–3563, `runPlanned` ~2841(CAS 충돌 1회 재시도), `applyDrop` ~2878,
  `sendPlan` ~2722, `dropModel` ~2440. Worker: `onDragStart` ~5361, `onDragOver`
  ~5401(`candidate`·`queue`·`s1..s5`만 허용), `onDrop` ~5478–5563.
- `app/main.js`는 `worker-queue-snapshot` payload에서 `root_dir`가 현재
  워크스페이스와 다르면 버리고 `worker_queue_store.set(p.queue)`만 저장한다(~1359).
  스토어(`app/data/worker-queue-store.js`)는 `root_dir`를 갖지 않는다; Worker 뷰는
  `getWorkspacePath?.()`로 경로를 얻는다.

## 3. 사용자 결정 (2026-08-27)

1. Worker 후보 원천은 **Board live store 유지 + 어댑터**. 관측용 행(자격 미달 이유)을
   유지하고 UI-d13v의 Board 정렬 체인과 맞춘다. 서버 `runnable`로 전환하지 않는다.
2. UI-s582·UI-d13v·UI-17mj **셋 다 `blocks` 선행**. 스펙은 지금 pre-author하고 실행은
   셋이 close된 뒤 artifact-staleness 재리뷰 레인으로 들어간다. 스펙은 그 셋이 내린
   상태(병렬성 분석 없음·후보 드래그 없음·정렬 체인 있음·PR 대기 external 행 정합)를
   전제로 쓴다.
3. 드롭은 **Monitor 식별자(`data-drop` 계열) + `planDrop` 공용화**. Worker의 자체
   `onDrop`·`placeBead`·`reorderBead`·`removeBead`는 삭제한다.
4. 조립 함수는 `app/views/worker/lane-model.js`로 **이동**(`git mv`). Monitor가 Worker를
   import하는 현 방향과 "Monitor = Worker + cross-repo"에 맞춘다.

## 4. 구조

### 4.1 한 함수, 두 어댑터

```
worker-queue 스냅샷 + Board live store ─▶ workspace-adapter ─┐
                                                              ├─▶ buildLanes(workspaces, workspaces_state, options) ─▶ LaneModel
monitor-pipeline 스냅샷 (어댑터 없음) ────────────────────────┘
```

- `buildLanes`의 **입력 형태는 지금 Monitor 워크스페이스 항목 그대로**다:
  `decorateQueue` 출력 + `root_dir` + `name` + `runnable[]` + `session_active[]`,
  그리고 `workspaces_state[]` 행(`root_dir`·`revision`·`runner_catalog`·
  `session_defaults`·`slots`·`issue_prefix`), `options.cross_lanes`. Monitor는 서버가
  이미 이 형태를 주므로 어댑터가 없다.
- `buildLanes`는 **순수 함수**로 남는다. 비동기 조회·캐시·재렌더 트리거는 어댑터
  쪽이다.
- 이 스펙이 `buildLanes` 입력에 **추가**하는 키는 넷이다. 없으면 없는 대로
  그린다(fail-quiet). Monitor는 넷 다 넘기지 않는다.
  - `runnable[].eligible?: boolean`, `runnable[].reason?: string`,
    `runnable[].release_info?`, `runnable[].dependents_info?` — Worker 어댑터가
    관측용 행과 UI-d13v 재료를 넘길 때 쓴다(§4.2). 서버 `RunnableItem`에는 없고,
    없으면 `eligible=true`·`reason=''`·칩 없음으로 읽는다.
  - `session_done?: SessionDoneRow[]` — 워크스페이스 항목 키. 완료 레인에 그대로
    합쳐 `done_at` 내림차순 정렬한다(§4.3).
  - `bead_overlay?: Record<bead_id, { priority?: number, from_id?: string,
    metadata?: Record<string,string> }>` — 워크스페이스 항목 키. Board live store가
    아는 이슈 필드를 모든 레인 행에 덧씌우는 재료(§4.2). `buildLanes`는 후보·대기·
    직렬·실행 타일·PR 대기·완료 행마다 `priority`·`from_id`를 이 맵에서 읽고,
    `metadata`로 `recSettings`(`rec`)와 실행 핀(`exec_chips`)을 만든다 — 지금
    `idToPriority`·`idToFromId`·`beadRec`·`beadExecChips`가 하는 일이다. 키가 없는
    bead는 지금 Monitor처럼 스냅샷 `bead_*` 장식만으로 그린다.
  - `workspaces_state[].execution_defaults?` — 이미 서버 Monitor 행에 있는 키.
    `pinnedExecChips`가 `session_defaults`와 함께 전역 실행 값으로 읽는다.

### 4.2 Worker 어댑터 `app/views/worker/workspace-adapter.js`

```js
/**
 * @typedef {{
 *   workspaces: Array<Record<string, any>>,        // 길이 0 또는 1
 *   workspaces_state: Array<Record<string, any>>,  // 길이 0 또는 1
 * }} WorkerLaneInput
 */
export function createWorkspaceAdapter({ queueStore, issueStores, transport, getWorkspacePath, onInvalidate }) {
  return {
    /** @param {{ candidate_sort: CandidateSortState, done_since?: number }} view_state */
    read(view_state): WorkerLaneInput,
    refreshSessionDefaults(): void,   // createWorkerView 공개 API가 그대로 위임
    destroy(): void,                  // inflight 무효화
  };
}
```

- `read()`는 `queueStore.get()`(`WorkerQueueSnapshot`)이 없으면 `{ workspaces: [],
  workspaces_state: [] }`를 돌려준다. 있으면 워크스페이스 항목 하나를 만든다:
  `{ ...queue, root_dir, name: basename(root_dir), runnable, session_done,
  bead_overlay }`. `root_dir`는 `getWorkspacePath?.() || ''`.
- `workspaces_state` 한 행: `{ root_dir, revision: queue.revision, slots: queue.slots,
  runner_catalog: queue.runner_catalog, execution_defaults: queue.execution_defaults,
  session_defaults: <어댑터 캐시 값>, issue_prefix: '' }`. `buildLanes`가 이 행에서
  읽는 것은 `revision`·`runner_catalog`·`execution_defaults`·`session_defaults`다
  (`monitor/lanes.js` ~513–525, ~1203) — 그 네 키가 계약이다.
- **세션 기본값 캐시**: `index.js` ~1904–1980의 `get-session-defaults` 조회
  (워크스페이스 키·generation 가드·inflight 병합)를 어댑터로 옮긴다. 조회 완료는
  `onInvalidate()`로 재렌더한다. `createWorkerView().refreshSessionDefaults()`는
  어댑터의 같은 이름 메서드에 위임해 공개 API가 유지된다(`app/main.js` 호출 측 변경
  없음).
- **`bead_overlay`**: 다섯 상태 열(Ready·Blocked·In-progress·Resolved·Closed)을 돌며
  `{ priority, from_id, metadata }`를 모은다 — 지금 `idToPriority`·`idToFromId`·
  `issue_by_id`(~3064–3225)의 재료다.
- **`runnable`**: 지금 `buildModel` ~3427–3600의 후보 조립을 옮긴다 — Ready+Blocked
  병합, 큐·직렬·실행·PR 대기 구성원 제외, `isPhaseChild` 제외, UI-d13v 정렬 체인
  (`app/views/worker/candidate-sort.js`, `view_state.candidate_sort`) 적용
  (`uiOrderStore`는 UI-d13v대로 읽지 않는다), 행마다 `resolveSpecEvidence`·
  `isWorkerIneligible`·`sessionPreferredReason`·`has_description` 판정. 출력 행은
  `RunnableItem` 키 이름을 쓴다(`bead_id`·`title`·`route`·`spec_id`·`published`·
  `blocked`·`blocked_by`·`labels`·`created_at`·`updated_at`·`workflow`·`exec_pins`·
  `rec`) + `release_info`·`dependents_info`(서버 Ready/Blocked 장식을 그대로 전달)
  + `eligible`·`reason`·`worker_ineligible`·`session_preferred`·
  `session_preferred_reason`. `exec_pins`는 이슈 `metadata`의 실행 핀 키만 뽑는다
  (서버 `runnable-cache.js`와 같은 키 집합).
- `buildLanes`의 후보 행 투영은 `draggable=false` 고정, `queue_placeable =
  eligible && !worker_ineligible`(UI-d13v §6)이며, `release_info`·`dependents_info`
  가 있으면 UI-d13v §5의 규칙(7일 창·최대 2개·` 외 n`·`dependents`)으로
  `dependency_chips`에 `released`·`dependents` 칩을 만든다 — UI-d13v가
  `index.js` 후보 행 투영에 두는 그 코드를 `lane-model.js`로 옮기는 것이고, 재료가
  없는 Monitor runnable 행은 fail-quiet다.
- 후보의 `reason` 문자열 조립(`BLOCKED_WITHOUT_IDS`·`missing_description`·
  `spec_id_conflict`·`spec 없음`·`spec 미발행(draft)`)은 어댑터가 하고, admission
  뱃지(`⛔`·`♻️`)는 `buildLanes`가 `admission`에서 붙인다 — 지금 Monitor와 같다.
  `buildLanes`는 `reason`이 있으면 admission 뱃지 앞에 ` · `로 잇는다.
- **`session_done`**: `buildModel` ~4195–4272의 세션 완료 행 판정을 옮긴다. Closed
  live store에서 Worker `done`에 없는 이슈 중 `comment_count > 0`인 것을
  `transport('get-comments')`로 조회해 `parseReport(...).lane === 'session'`이면 행을
  만든다. 캐시 키는 `${root_dir}\0${id}\0${updated_at}\0${comment_count}`,
  값은 `pending|session|not-session|failed`. 조회가 끝나면 `onInvalidate()`를 불러
  뷰가 재렌더한다(지금의 `doRender()` 호출과 같은 자리). `done_since` 필터는 어댑터가
  `view_state.done_since`로 적용한다 — `buildLanes`도 `options.done_since`로 Worker
  `done`을 거르므로 두 곳의 기준이 같다.
- 어댑터는 `buildLanes`의 입력만 만든다. 후보 카드 표시 규칙(음영·refused affordance)
  은 지금처럼 `candidateCard`가 `worker_ineligible`·`session_preferred`·`reason`
  으로 그린다.

### 4.3 `buildLanes` 확장 — Worker 전용 출력의 자리

파일을 `app/views/worker/lane-model.js`로 `git mv`하고 typedef를 `MonitorLanes` →
`LaneModel`, `MonitorItem` → `LaneItem`, `MonitorQueueGroup` → `LaneQueueGroup`으로
바꾼다(`monitor/lanes.js`는 남기지 않는다; `monitor/index.js`·
`worker/queue-blockers.test.js`·`monitor/lanes.test.js`(→`lane-model.test.js`)의
import 경로를 바꾼다). 함수 이름 `buildLanes`와 시그니처는 유지한다.

Worker가 `buildModel`에서만 계산하던 것 중 **재료가 공유 스냅샷**인 것은 워크스페이스별
값이므로 `queue_groups[i]`에 넣는다. Monitor는 이 키들을 읽지 않는다(표시 변화 없음).

| `queue_groups[i]` 추가 키 | 재료 | 지금 자리 |
|---|---|---|
| `failure: {…}\|null` | `attempts` 미처리 실패 중 최신 | `buildModel` ~4053 |
| `failed_tiles: LaneItem[]` | `attempts` 미처리 실패(`createUnhandledFailurePredicate`), `running`과 **분리** — Monitor 실행 중 레인 표시를 바꾸지 않기 위해 | ~3741–4020 `failed_running` |
| `live_count`, `over_cap` | 슬롯 점유 attempt 수 vs `slots` | ~4136–4167 |
| `merge: { positions, resolutions, continuations, head_reviews, authorities, state, auto_excluded, running }` | `merge_queue`·`merge_queue_state`·`manual_merge_continuation` | ~4083–4134 |
| `token_total: string\|null` | `done` 행 usage 합 | ~4273–4324 |
| `cleanup_failures: […]` | `cleanup_failed` | ~3374–3427 |
| `declared_base: string\|null` | `declared_base` | ~3806 |
| `repo_operations` | 그대로 pass-through | ~4795 |

- `running` 타일의 `landing`(quick_fix 착지 진행, `prWaitProgress`)은 타일 필드로
  싣는다(`runningTile` typedef가 이미 `landing`을 받는다, `running-grid.js` ~96).
- `running_overlays`는 폐기한다. `runningGridTemplate(tiles, now, selected)`는
  타일 자체의 `last_activity`·`legs`·`dependency_chips`를 읽도록 시그니처에서
  overlays 인자를 뺀다.
- `idToTitle`은 폐기한다. 제목은 행에 있다(`title`); 남는 소비처(transcript drawer 등)는
  `LaneItem`에서 찾는다.
- 평면 레인(`runnable`·`running`·`pr_wait`·`done`)과 `queue_groups[0].sublanes`
  (`parallel`·`serial[]`)가 Worker의 `candidates`·`running`·`pr_wait`·`done`·
  `waiting`·`serial_lanes`를 대신한다. `candidate_hidden` → `runnable_hidden`,
  `serial_lane_count` → `queue_groups[0].serial_lane_count`.
- `options.candidate_sort`는 Monitor 값(`repo_spec`·`repo_updated`·`updated_flat`)과
  Worker 값(UI-d13v 체인)이 어휘가 다르다. Worker는 정렬을 **어댑터에서 끝내고**
  `options.candidate_sort = 'as_given'`(신규, 입력 순서 유지·섹션 없음)으로 호출한다.
  `runnable_flat`은 `as_given`에서 `true`.
- **그룹 유지**: `options.groups = 'nonempty' | 'all'`(신규, 기본 `'nonempty'` =
  현행 Monitor 규칙). Worker는 `'all'`로 호출해 대기·직렬·후보가 모두 없어도
  `workspaces_state` 행 하나당 그룹이 남는다 — 실행 중·PR 대기·완료·저장소 작업만
  있는 스냅샷에서도 `queue_groups[0]`의 `slots`·`merge`·`failure`·
  `repo_operations`가 살아 있어야 하기 때문이다. Monitor 표시는 바뀌지 않는다.

### 4.4 Worker 뷰 전환

`createWorkerView`에서:

- `buildModel`·`toRows`·`prWaitRow`·`admissionBadge`·`occupantBadge`·
  `dependencyChipsFor`·`attachChips`·`execRowsFor`·`attemptExecChips`·
  `beadExecChips`·`beadRec`·`runningRollup`·`failureResumeState`·`resolvesConflict`·
  `prWaitTargetBase`·`autoSkipReason`·`session_report_cache` 등 조립 클로저를 지운다.
- `doRender()`: `const input = adapter.read({ candidate_sort, done_since }); const lanes
  = buildLanes(input.workspaces, input.workspaces_state, { done_since,
  candidate_filter, candidate_sort: 'as_given', groups: 'all', cross_lanes: undefined });`
  → `topTemplate(lanes)`·`lanesTemplate(lanes)`. `repoOpsDrawerInput()`도 같은
  경로로 `queue_groups[0].repo_operations`·`cleanup_failures`를 읽는다.
- `topTemplate`·`lanesTemplate`·`waitBodyTemplate`·`runningBody`·`mergeAllTemplate`
  는 `lanes.queue_groups[0]`(없으면 빈 그룹 상수)과 평면 레인을 읽는다. 렌더러
  (`paneTemplate`·`waitBody`·`candidateCard`·`miniRow`·`runningTile`·`nowPanel`)
  와 DOM 구조·클래스는 바뀌지 않는다.
- Worker 전용으로 **남는** 것: repo-ops 드로어·설정·스크립트 뷰어, 머지 전체 버튼,
  슬롯·직렬 레인 수 설정, transcript drawer 선택, 후보 정렬 `<select>`(UI-d13v),
  완료 범위 선택.

### 4.5 드롭 식별자·드래그 공용화 `app/views/worker/lane-drag.js`

- Monitor `index.js`의 `collapsedDropTarget`·`dropTarget`·`onPointerDown`·
  `onDragStart`·`onDragOver`·`onDragLeave`·`onDragEnd`·`onDrop`·`applyDrop`·
  `runPlanned`·`sendPlan`·`sendOp`·`sendLaneOp`·`sendLaneProvenance`·`dropModel`을
  옮긴다.

```js
export function createLaneDrag({
  transport,
  console_el,                 // `is-dragging` 토글 대상
  getLanes,                   // () => LaneModel — 최신 투영
  getWorkspaces,              // () => workspaces[] — 스냅샷 원본 (settledBlockerSources 재료)
  getCrossLanes,              // () => cross_lanes|null — Worker는 () => null
  reproject,                  // (cross_lanes) => { lanes, raw_lanes } — CAS 충돌 재투영 (Monitor projectLanes)
  onCorrection,               // (lane_id, corrected) => void — plan.correction 알림 (Monitor noteCorrection)
  showToast,
}) {
  return {
    attach(mount_el), detach(), isDragging(),
    applyDrop(drag, target),  // 팝오버 1클릭 배치 등 외부 진입
    sendOp(op, bead_id),      // `worker-queue-*` 단일 op + CAS revision 어댑트 — ✕·↑·↓·`대기로 ↴`가 재사용
    rememberDep(op),          // 세션 dep 델타 — blockedByMapWithDelta 재료
  };
}
```

- `dropModel`·`settledBlockerSources`·`blockedByMapWithDelta`·`rememberDep`·
  `runPlanned`·`sendPlan`·`sendOp`·`sendLaneOp`·`sendLaneProvenance`가 이 모듈로
  옮겨진다. 세션 dep 델타 상태는 factory 인스턴스가 소유한다.
- `getCrossLanes()`가 `null`이고 `getLanes().chain_lanes`가 빈 배열이면 chain 관련
  맵이 비어 `planDrop`이 chain 타깃을 `refused`로 돌려준다 — Worker에서 chain
  분기는 데이터로 비활성이지 코드 분기가 아니다. Worker의 `reproject`는 같은
  어댑터 입력으로 `buildLanes`를 다시 돌리는 클로저이고 `onCorrection`은 no-op이다.
- `getWorkspaces()`가 `bead_blocked_by`·`runnable[].blocked_by` 키를 싣지 않으면
  `settledBlockerSources`는 지금처럼 "미상"으로 읽어 `planDrop`이 dep op를 만들지
  않는다(fail-quiet, 테스트 §7).
- DOM 식별자는 두 탭 공통: 드래그 소스 `[data-drag-kind][data-bead-id][data-root-dir]
  [data-queue-index]?[data-lane-id]?`, 드롭 타깃 `[data-drop][data-root-dir]
  [data-lane-id]?[data-lane-length]?`, 접힌 pane 폴백 `[data-lane]`(`queue`만 —
  UI-d13v 이후 `candidate`는 드롭 타깃이 아니다). Worker `waitBodyTemplate`이 행과
  영역에 이 속성을 붙인다(`waitBody`의 `drop` 슬롯, UI-5ksp §4.2).
- Worker `index.js`의 `onDragStart/Over/Leave/End`·`onDrop`·`placeBead`·
  `reorderBead`·`removeBead`·`dragging` 상태·`.worker-pane` `data-lane` 드롭 판별을
  지운다(`reorderCandidates`는 UI-d13v가 먼저 지운다). `대기로 ↴` 배치 메뉴와 대기
  행 `✕`·`↑`·`↓` 조작은 `planDrop`이 아니라 단일 op를 보내므로 factory가 돌려주는
  `sendOp`를 재사용한다(CAS `revision` 어댑트 규칙 포함).
- 접힌 대기 pane(세로 띠) 위 드롭 = 병렬 큐 말미 적재(UI-5ksp §4.4)는
  `collapsedDropTarget`이 `{ kind: 'parallel', marker_index: parallel_raw_length[root_dir] }`
  로 돌려주므로 유지된다.
- `is-dragging` 클래스 토글은 `lane-drag.js`가 `console_el`에 한다(양 탭 동일).

### 4.6 UI-e9sg 해소

`monitor/index.js` `lanePane` 기본 분기(~1819)와 `nowPanel` `pr_wait_rows`(~1853)의
`miniRow(item)`을 `miniRow(withOverlaps(item))`으로 바꾼다. 완료 레인은
`applyScopeOverlaps`가 비교 집합에 넣지 않아 `overlap_chips`·`scope_state`가 없으므로
무변화이며, 그 무변화를 테스트로 고정한다(§7).

## 5. 코드 배치

| 파일 | 변경 |
|---|---|
| `app/views/monitor/lanes.js` → `app/views/worker/lane-model.js` | `git mv`, typedef 개명, `queue_groups[i]` 추가 키·`failed_tiles`·`landing`·`session_done` 합류·`bead_overlay` 전 레인 적용·`runnable[].eligible/reason`·`queue_placeable`·`released`/`dependents` 칩·`candidate_sort: 'as_given'`·`groups: 'all'` |
| `app/views/monitor/lanes.test.js` → `app/views/worker/lane-model.test.js` | `git mv`, import 경로, 신규 케이스 |
| `app/views/worker/workspace-adapter.js` (+test) | 신규 §4.2 — 후보·`bead_overlay`·`session_done`·세션 기본값 캐시 |
| `app/views/worker/lane-drag.js` (+test) | 신규 §4.5 |
| `app/views/worker/index.js` | `buildModel` 일가 제거, 어댑터·`buildLanes`·`lane-drag` 채택, 템플릿 필드 이름 전환, 드롭 속성 부여 |
| `app/views/worker/running-grid.js` | `runningGridTemplate` overlays 인자 제거 |
| `app/views/monitor/index.js` | 드래그 코드 → `lane-drag.js`, import 경로, UI-e9sg 두 줄 |
| `app/views/monitor/drop-plan.js` | 변경 없음(경로 유지 — `LaneState`·`DropModel` 타입의 소유자) |
| `app/views/worker/queue-blockers.test.js` | import 경로 |
| `app/data/worker-queue-store.js` | 변경 없음 |
| 번들 | `npm run build` |

Monitor 전용으로 남는 것: 데크·레포 섹션·연결 레인 pane과 op·`blockers.js`·
`dep-candidates.js`·`drop-plan.js`의 chain 계획·`workspaces_state` 다중 레포 처리.
서버·프로토콜은 건드리지 않는다.

## 6. 데이터 흐름과 오류 처리

- Worker: 스냅샷·store 변경 → `doRender` → `adapter.read` → `buildLanes` → 템플릿.
  세션 완료 조회는 `read` 중 캐시 miss에서 시작되고, 완료 시 `onInvalidate` →
  `doRender` 한 번. 조회 실패는 `failed`로 캐시해 행을 생략한다(현행).
- 어댑터 입력 누락(`queueStore` 없음·`getWorkspacePath` 없음·store 빈 값)은 빈
  워크스페이스 배열 → `buildLanes`가 빈 모델을 돌려주고 pane은 `비어 있음`을 그린다.
- `buildLanes(null, null)` fail-quiet 계약은 그대로다.
- 드롭 `planDrop` `refused`는 토스트(Monitor 현행). CAS 충돌은 `runPlanned`가 최신
  스냅샷으로 1회 재계획한다. Worker는 `cross_lanes`가 없으므로 lane op 자체가 없다.
- `groups: 'all'`이므로 스냅샷이 있는 한 `queue_groups[0]`은 항상 있다. 없는 경우는
  스냅샷 미도착(어댑터가 빈 입력을 돌려줌)뿐이며 그때 `topTemplate`은 빈 그룹
  상수로 그린다 — 지금 `currentQueue()`의 빈 스냅샷 폴백(~2095)과 같은 역할.
- 세션 기본값 조회 실패는 빈 객체로 캐시해 전역 실행 칩을 생략한다(현행).
- 드롭 계획이 `dep-add`를 낸 뒤 CAS 충돌이 나면 `reproject(conflict)`로 전체를
  다시 계획하고 1회만 재시도한다(현행 `runPlanned`). 세션 dep 델타는 factory
  인스턴스에 남아 재투영에도 반영된다.

## 7. 테스트·검증

단위(vitest):

- `lane-model.test.js`: 기존 146건 유지(경로만) + N=1 케이스 — `failed_tiles`가
  `running`과 분리됨, `failure`·`live_count`·`over_cap`·`merge`·`token_total`·
  `cleanup_failures`·`declared_base`가 `queue_groups[0]`에 실림, `landing`이 타일에
  실림, `session_done` 합류·정렬, 후보 행 `draggable=false`·`queue_placeable`이
  `eligible && !worker_ineligible`, `reason`이 admission 뱃지 앞에 붙음,
  `release_info`·`dependents_info`가 `released`·`dependents` 칩으로(7일 창·` 외 n`)·
  재료 없으면 칩 없음, `bead_overlay`의 `priority`·`from_id`·`rec`·`exec_chips`가
  후보·대기·직렬·실행·PR 대기·완료 행 전부에 실림(키 없는 bead는 무변화),
  `workspaces_state[].execution_defaults`가 전역 실행 칩에 반영, `candidate_sort:
  'as_given'`이 입력 순서·`runnable_flat=true`, `groups: 'all'`에서 실행 중만·PR
  대기만·완료만·저장소 작업만 있는 스냅샷 네 경우 모두 `queue_groups[0]`이 남고
  `'nonempty'`(기본)에서는 지금처럼 빠짐.
- `workspace-adapter.test.js`: 빈 store → 빈 입력; 큐 구성원·phase child 제외;
  자격 판정 5종의 `reason`·`eligible`; `exec_pins` 추출; `release_info`·
  `dependents_info` 전달; `bead_overlay`가 다섯 열 전부에서 모임;
  `workspaces_state` 네 키(`execution_defaults`는 스냅샷 값 그대로); 세션 기본값
  캐시(워크스페이스 전환 시 무효·generation 가드·`refreshSessionDefaults`·
  `onInvalidate`); 세션 완료 캐시(`pending→session`·`failed`·`onInvalidate` 1회).
- `lane-drag.test.js`: `dropTarget` 식별자 해석, 접힌 pane 폴백, chain 없는 모델에서
  chain 타깃 `refused`, `sendPlan` op 순서, CAS 충돌 시 `reproject` 호출 후 전체
  재계획 1회, `plan.correction` → `onCorrection`, `getWorkspaces()`에
  `bead_blocked_by`·`runnable[].blocked_by`가 없으면 dep op 없음, `rememberDep`
  델타가 다음 계획에 반영, `sendOp`의 revision 어댑트.
- `worker/index.test.js`: DOM 단언은 유지 — 특히 대기·실행·PR 대기·완료 행의
  priority·출처(`from_id`)·`rec`·실행 설정 칩과 전역 세션 기본값 칩이 통일 전과 같이
  그려지는 기존 케이스가 회귀 방어선이다. `placeBead`/`reorderBead`/`removeBead`
  호출을 단언하던 케이스는 `transport` 메시지(`worker-queue-place` 등) 단언으로 바꾼다
  — 메시지 이름과 payload는 같다. `drag()` 헬퍼(~219)는 `data-drop` 타깃으로 떨어뜨
  리도록 갱신. `refreshSessionDefaults()` 공개 API 케이스 유지.
- `monitor/index.test.js`: UI-e9sg 4건 — PR 대기 행 겹침 칩·`scope 없음` 칩·칩에서
  팝오버 열림·완료 행 무변화; 드래그 케이스는 `lane-drag` 채택 후에도 통과.
- 스타일 테스트: 변화 없음(DOM 클래스 유지).

Pre-handoff: `npm run tsc` · `npm test` · `npm run lint` · `npm run prettier:write` ·
`npm run build`(번들 포함).

시각 검증(구현 세션): 헤드리스 Chrome CDP로 1800×1200·390×844 `#/worker`·
`#/monitor` 캡처 — 두 탭 레인 내용이 통일 전과 같음(후보 관측 행·실패 타일·머지 큐
뱃지·세션 완료 행이 Worker에 남아 있음), Monitor PR 대기 행에 겹침 칩. 배포 후
공유 서버에서 한 번 더.

## 8. 구현 unit 후보

1. `model-move` — `git mv`·typedef·`queue_groups` 추가 키·`failed_tiles`·`landing`·
   `session_done`·`eligible/reason`·`as_given`·`runningGridTemplate` 시그니처·
   UI-e9sg 두 줄 + 테스트.
2. `worker-adopt` — `workspace-adapter.js`, `buildModel` 일가 제거, 템플릿 전환,
   `index.test.js` 갱신.
3. `drag-unify` — `lane-drag.js` 추출, 양 탭 채택, Worker 드롭 속성·op 헬퍼 정리,
   드래그 테스트, 시각 검증.

## 9. 경계·후속

실행 선행(`blocks`, 사용자 결정 §3.2): UI-s582 · UI-d13v · UI-17mj. 셋이 `closed`가
된 뒤 staleness 재리뷰 레인으로 실행에 들어간다. 이 스펙은 그 셋이 내린 상태를
전제로 한다 — 그 셋의 최종 diff가 §2·§4의 전제(정렬 체인 모듈명, 후보 드래그 부재,
PR 대기 행 필드)를 바꾸면 재리뷰에서 정정한다.

형제·후속 Bead 후보는 없다 — 한 설계, 한 Bead.

- 관찰: `app/main.js`가 `worker-queue-snapshot`의 `root_dir`를 store에 싣지 않아
  어댑터가 `getWorkspacePath`로 다시 얻는다 — 스토어가 `root_dir`를 함께 저장하면
  어댑터 입력이 한 곳에서 나오지만 이 스펙 범위 밖이다.
- 관찰: Monitor도 `queue_groups[i].failure`·`failed_tiles`·`merge`를 그릴 수 있게
  되지만 표시 결정은 별도 설계다.
- 관찰: `drop-plan.js`는 `monitor/`에 남는다. chain 계획이 파일의 대부분이라 이동
  이득이 작다.
