---
scope:
  - server/worker/runnable-cache.js
  - server/ws/monitor-handlers.js
  - app/views/monitor/lanes.js
  - app/views/monitor/index.js
  - app/views/monitor/deck.js
  - app/views/worker/lanes.js
  - app/views/worker/running-grid.js
  - app/views/worker/index.js
  - app/styles.css
  - app/protocol.md
---

# 모니터 탭: 세션 진행 이슈 투영 + 카드 route 칩 일관 표시 (UI-yrzu)

- Bead: `UI-yrzu` (route `spec_backed`)
- 개정 대상: UI-eey2 `2026-08-23-monitor-redesign-design.md` §4.1/§4.2(데크 합계),
  §7(실행중 레인), §9(서버 투영). 이 문서는 그 스펙에 **추가**하며, 충돌하는 문장은
  이 문서가 우선한다.
- 사용자 요청 2026-08-24: "워커 탭에서 세션에서 진행중인 이슈도 모니터링 가능하도록;
  이슈 카드에 route를 대기 및 실행중 카드들에서도 일관되게 표시".

## 1. 문제

1. **세션이 잡은 이슈가 보이지 않는다.** 실행중 레인은 Worker attempt 레코드
   (`workspace.attempts`)만으로 채워진다(`lanes.js activeByBead`). 실행가능 레인은
   `status === 'open'`만 통과시킨다(`runnable-cache.js qualify`). 따라서 인터랙티브
   세션(Claude/Codex 세션이 `bd update --status in_progress`로 claim)이 작업 중인
   이슈는 어느 레인·데크 합계에도 실리지 않는다 — 예: 이 저장소의 `UI-e6hw`는 현재
   `in_progress`이지만 모니터에서 존재를 알 수 없다.
2. **route 표시가 레인마다 다르다.** `route` 텍스트 칩(`.ctl-chip--route`)은
   실행가능 카드(`candidateCard`)에만 있다. 대기·PR 대기 행(`miniRow`)은
   `workflow`를 아예 싣지 않고, 실행중 타일(`runningTile`)은 stepper 모양으로만
   route를 암시한다. 서버는 이미 `bead_workflow`를 queue ∪ serial ∪ running ∪
   pr_wait 전부에 실어 주므로(UI-eey2 §9.2) 대기 행의 공백은 클라이언트 투영 누락이다.

## 2. 목표와 원칙

- 세션이 진행 중인 이슈를 실행중 레인에 **세션 타일**로 보인다. Worker 타일과 같은
  껍데기(`runningTile`)를 쓰되 Worker 운영 버튼은 없다.
- route 칩을 실행가능·대기·PR 대기·실행중(Worker/세션) 카드 전부에 **같은 칩, 같은
  위치, 같은 파생 규칙**으로 그린다. 하나의 템플릿 함수가 소유한다.
- 표시 전용이다. Worker 스케줄러·admission·Bead 상태에 영향을 주지 않는다.
- fail-quiet: 새 키가 없으면(구 서버) 세션 타일·route 칩이 그냥 생략된다.

## 3. 판정 — "세션 진행 이슈"

워크스페이스 스냅샷(`requestSnapshot(workspace, 'monitor-runnable')` →
`snapshot.all`, `bd list --all`)의 한 행이 다음을 모두 만족하면 세션 진행 이슈다.

| 조건 | 근거 |
|---|---|
| `status === 'in_progress'` | 세션이 claim할 때 취하는 상태(workflow 계약) |
| 활성 Worker attempt가 없다 (`app/utils/active-attempts.js activeBeadIds` 기준) | Worker run도 Bead를 `in_progress`로 잡는다 — 그 경우 기존 Worker 타일이 이미 그리므로 중복 금지 |
| `queue` ∪ `serial_lanes[].entries` ∪ `pr_wait`에 없다 | 레인 배타 우선순위(UI-eey2 §9.4) — Worker가 소유한 이슈는 그 레인이 말한다 |

- `done` 레인 멤버십은 **제외 조건이 아니다**: 완료 이력이 있는 이슈를 세션이 다시
  `in_progress`로 열면 지금 진행 중인 일이 사실이다. 클라이언트의 `claimed` 집합이
  running > done 순서로 중복을 막는다.
- route·라벨(`worker-ineligible`)·스펙 유무는 판정에 쓰지 않는다. 세션은 Worker
  자격과 무관하게 아무 이슈나 잡을 수 있고, 여기서 묻는 것은 "지금 누가 무엇을
  하고 있나"뿐이다.
- 세션의 정체(어느 터미널·어느 launch)는 알 수 없고 알려고 하지 않는다. Bead 행이
  주는 사실만 쓴다: `started_at`, `updated_at`, `metadata`(`exec_receipt`,
  `workflow_mode`, `impl_dispatch` 등 → `enrichIssueWorkflow`가 이미 요약).

## 4. 서버 투영 (`app/protocol.md` 동시 갱신)

### 4.1 `runnable-cache.js` — 같은 스캔, 두 번째 버킷

`fetchRunnable`의 행 루프에서 `qualify()`가 `null`을 돌려준 행 중
`status === 'in_progress'`인 행을 `qualifySession(row, blocked_by, enrich)`로
투영해 레코드에 `session_active: SessionActiveItem[]`으로 함께 저장한다. 추가
`bd` 호출은 없다 — 이 스캔은 이미 `--all` 스냅샷을 읽는다.

```
SessionActiveItem = {
  bead_id, title,
  status: 'in_progress',
  route: string,                     // metadata.route, 없으면 ''
  spec_id: string,                   // resolveSpecId(row).path, 충돌/없음이면 ''
  labels: string[],                  // RunnableItem과 같은 정규화
  created_at, updated_at, started_at // 행 그대로 (number|string|null)
  workflow: WorkflowSummary|null,    // enrichFor(workspace)(row), 실패 시 null
  blocked: boolean, blocked_by: string[]  // RunnableItem과 같은 ready_explain 규약
}
```

- 읽기: `sessionActiveFor(workspace, exclude_ids)` — `runnableFor`와 같은 TTL/
  fill/exclude 규약. `exclude_ids`는 호출자가 §3의 두 제외 집합(레인 멤버 + 활성
  attempt bead)을 합쳐 넘긴다.
- `invalidate`/`refresh`/`clear`/negative cache는 두 버킷에 동시에 적용된다(한
  레코드).
- 신선도는 실행가능 레인과 같다: `POSITIVE_TTL_MS`(30초) driver + 큐 변경
  invalidate. 세션의 `bd update`를 서버가 직접 관측하는 훅은 **추가하지 않는다**
  (§11 비범위) — 최대 30초 지연은 실행가능 레인이 이미 감수하는 값이다.

### 4.2 `monitor-handlers.js` — `workspaces[].session_active`

`buildMonitorPipeline`에서 `runnable` 옆에
`projected.session_active = sessionActiveFor(root_dir, exclude)`를 싣는다.
`exclude = lanedBeadIds(projected) ∪ activeBeadIds(projected.attempts, done_at_by_bead)`
(`laneCountsFor`가 이미 만드는 `done_at_by_bead`와 같은 구성; `done` 레인 id는
`lanedBeadIds`에 포함돼 있지만 §3에 따라 세션 제외 집합에서는 **빼야** 하므로
`lanedBeadIds`와 별도로 `queue ∪ serial ∪ pr_wait`만 모으는 헬퍼를 둔다).

- `hasPipeline(snapshot)`은 `session_active.length > 0`도 "파이프라인 있음"으로
  본다 — 세션 작업만 있는 레포도 데크에 나타난다.
- `counts`에 `session_active: number`를 더한다. `running`은 Worker attempt 수
  그대로다(합계 의미 불변). 세션 수는 배타 우선순위에서 `running` 바로 다음이며
  제외 집합이 그것을 보장한다.
- 테스트 seam: `buildMonitorPipeline({ sessionActiveFor })`, 기본은
  `getWorkerRuntime().runnableCache.sessionActiveFor`.

### 4.3 `bead_workflow`는 그대로

세션 타일의 stepper·route는 `session_active[].workflow`에서 온다(§4.1, 실행가능
행의 `runnable[].workflow`와 같은 방식). `bead_workflow`의 대상 집합은 바꾸지
않는다.

## 5. 클라이언트 레인 투영 (`app/views/monitor/lanes.js`)

`buildLanes`의 워크스페이스 루프에서 Worker 실행 타일 push 직후, 같은 `claimed`
집합으로 `workspace.session_active[]`를 실행중 레인에 push한다.

```
running.push({
  ...base(bead_id),
  lane: 'running',
  kind: 'session',                 // 신규 판별자; Worker 타일은 kind 생략(=undefined)
  title, status: 'in_progress',
  started_at: timeOf(entry.started_at) ?? timeOf(entry.updated_at),
  updated_at,
  workflow: entry.workflow || null,
  labels, spec_id,
  blocked, blocked_by,             // 후속/선행 칩 재료 (기존 blocked_by_map 경유)
  draggable: false,
  can_pause: false, can_resume: false,
  exec_chips: null, usage: null, legs: [], last_activity: null,
  badges: [], alert: false
})
```

- 순서: Worker 타일(현행 정렬) 뒤에 세션 타일을 `updated_at` 내림차순으로 잇는다.
  같은 레포 안에서도 Worker 타일이 앞이다.
- `MonitorItem`에 `kind?: 'session'`을 추가한다. 다른 소비자(드롭 계획, 체인 계산,
  `🔗` 팝오버)는 `lane === 'running'`만 보므로 세션 타일도 자연히 "실행중" 위치로
  계산된다 — `buildChains`의 `locations`에 세션 타일이 `running`으로 등록되어 후속
  체인이 `→ 후속 …` 칩을 그릴 수 있다.
- 대기·PR 대기 행: `waitingItem()`과 `pr_wait` 루프가
  `workflow: bead_workflow[bead_id] || null`을 싣는다(실행중/실행가능과 같은
  fail-quiet 규약). **이 한 줄이 §7 route 칩의 재료다.**

## 6. 세션 타일 렌더 (`app/views/worker/running-grid.js`)

`runningTile(tile, now, selected_attempt, { monitor })`에 tile 필드
`kind?: 'session'`을 추가한다. `kind === 'session'`이면:

| 줄 | Worker 타일 | 세션 타일 |
|---|---|---|
| 헤더 | `●` · ID · 레포 배지 · `s1` · 경과 · `▤ 세션` · `⏸/▶` · 폐기 | `◐` (세션 점, `rtile__dot--session`) · ID(복사) · **route 칩(§7)** · 레포 배지 · 경과(`started_at` 기준) · `세션` 텍스트 배지(`rtile__session-badge`, 툴팁 "Worker가 아닌 세션이 in_progress로 잡은 이슈") |
| 제목 | 제목 | 제목 |
| stepper | `stepperTemplate(workflow, 'in_progress')` | 동일 (`workflow` 없으면 생략) |
| 활동 줄 | `last_activity` | `갱신 <n> 전` (`updated_at` 상대시간) — 회색 점. `updated_at` 없으면 줄 생략 |
| 위임 칩 | `legs` | 생략 |
| 후속 칩 | `dependency_chips` | 동일 |
| meta | exec 칩 · 계정 칩 · 토큰/비용 | `exec_receipt` 칩 1개 — `workflow.chips.exec_receipt`가 있으면 `formatExecReceipt`(board/card.js 재사용)로 `main:bead` / `delegated:opus:high` 형태; 없으면 줄 생략 |

- 운영 버튼(`⏸/▶`, 폐기, 실패 닫기, 이어하기)과 `▤ 세션` 드로어는 **그리지 않는다**
  — attempt가 없으므로 열 로그가 없다. 클릭 동작은 다른 타일과 같다: ID 클릭 =
  복사, 타일 클릭 = 이슈 상세(현행 `.rtile[data-bead-id]` 클릭 → `gotoIssue` 경로
  그대로).
- `selected_attempt` 하이라이트·heartbeat 정렬은 attempt가 없으니 적용되지 않는다.
- `paused`/`failed` 상태 없음. `rtile--session` 수식 클래스로 좌측 테두리 색만
  구분한다(색 토큰은 기존 `.ctl-chip--route`와 같은 중립 계열, 경고색 금지 — 주의를
  요구하는 상태가 아니다).
- 데스크톱·모바일 동일 타일(모바일은 현행 문서 스크롤 스택).

## 7. route 칩 일관 표시

### 7.1 하나의 템플릿

`app/views/worker/lanes.js`에 `routeChipTemplate(workflow)`를 export한다. 현재
`candidateCard` 안에 인라인된 규칙을 그대로 옮긴다:

- `workflow`가 없으면 `''`.
- `route = workflow.chips?.route ?? workflow.route`; `derived =
  chips.route_source === 'derived' || workflow.route_source === 'derived'`.
- `route`가 없으면 `''`; 있으면
  `<span class="ctl-chip ctl-chip--route${derived ? ' is-derived' : ''}" title=${derived ? 'route 미핀 (metadata unset)' : 'route'}>${derived ? 'unset' : route}</span>`.

### 7.2 소비자

| 카드 | 위치 | 재료 |
|---|---|---|
| `candidateCard` (실행가능) | 현행 위치(헤더, ID 다음) — 인라인을 `routeChipTemplate`로 교체 | `item.workflow` (변경 없음) |
| `miniRow` (대기 `queue`/`s1..s5`, PR 대기, REVISE 파킹 카드 변형) | ID 바로 다음, 제목 앞. 완료 행(`done`, 2줄·3줄 변형)은 **제외** | `item.workflow` (§5에서 신규 공급) |
| `runningTile` Worker 타일 | 헤더, ID 다음 | `tile.workflow` (신규 tile 필드; 모니터 `index.js runningBody`가 `item.workflow`를 tile에도 넘긴다. `monitor.workflow` overlay는 stepper 전용으로 유지) |
| `runningTile` 세션 타일 | 헤더, ID 다음 (§6) | `tile.workflow` |

- Worker 탭도 같은 컴포넌트를 쓰므로 동일하게 보이려면 재료만 채우면 된다:
  `app/views/worker/index.js`의 queue/serial/pr_wait mini 아이템 빌더와 실행 타일
  빌더가 `bead_workflow[bead_id] || null`을 `workflow`로 싣는다(현행 주석 "queue
  lanes carry no workflow snapshot"은 UI-eey2 §9.2 이후 사실이 아니므로 함께
  정정). Worker 탭 카드 레이아웃 변경은 이 칩 추가뿐이다.
- 좁은 대기 행에서의 제목 폭: 칩은 고정 폭(≈7ch) 한 개이므로 `.worker-mini__title`의
  현행 `min-width:0; overflow:hidden; text-overflow:ellipsis`가 흡수한다. 모바일
  폭(≤480px)에서는 `.worker-mini .ctl-chip--route`를 숨기지 **않는다** — 사용자가
  요청한 일관성이 우선이며, 필요하면 후속으로 재조정한다.

### 7.3 CSS

`.ctl-chip--route`는 전역 규칙(`styles/base.css`)이 이미 있다. 추가는
`.worker-mini .ctl-chip--route`(행 높이에 맞춘 line-height·margin)와
`.rtile .ctl-chip--route`(헤더 정렬), `.rtile--session`·`.rtile__dot--session`·
`.rtile__session-badge`뿐이다.

## 8. 데크·합계 (`app/views/monitor/deck.js`, `index.js`)

- 레포 타일 `실행 n · 대기 n` 뒤에 `counts.session_active > 0`일 때만
  `· 세션 m`을 덧붙인다. 0이면 아무것도 그리지 않는다(조용한 기본).
- 헤더 합계 칸도 같은 규칙으로 `세션 m`을 합산 표시한다.
- 실행중 레인 제목의 카운트는 `lanes.running.length`(Worker + 세션) 그대로다 —
  레인이 보여 주는 타일 수와 일치해야 한다.
- 구 서버(`counts.session_active` 없음)는 키 부재로 조용히 생략된다.

## 9. 상호작용·정렬·갱신

- 세션 타일은 드래그 불가, 드롭 대상 아님. 현행 드롭 핸들러(UI-e6hw가 도입하는
  드롭 계획 모듈이 착지했다면 그것)는 `lane === 'running'` 항목을 드롭 대상으로
  취급하지 않으므로 변경 없음 — 세션 타일에 대해 테스트로 고정한다.
- 세션 타일 → Worker 타일 전환(같은 이슈를 Worker가 재시작)은 다음 스냅샷에서
  attempt가 제외 집합에 들어가며 자연히 교체된다. Worker 타일 → 세션 타일 전환도
  같은 경로(attempt 종료 + `in_progress` 잔류; Worker가 `releaseBeadClaim`으로
  `open`으로 되돌리면 실행가능/백로그로 돌아간다).
- `status`가 `open`/`resolved`/`closed`로 바뀌면 다음 fill에서 사라진다.

## 10. 에러 처리

- `sessionActiveFor`가 throw → 그 레포의 `session_active = []`, 로그 한 줄
  (runnable과 같은 try/catch).
- `enrich` 실패 → `workflow: null` → 세션 타일은 stepper·route 칩 없이 ID·제목·
  경과만.
- `started_at`·`updated_at` 파싱 실패 → 경과/활동 줄 생략.
- 클라이언트가 `session_active`·`counts.session_active`·`kind`를 모르는 구
  번들과 새 서버 조합: 알 수 없는 키는 무시된다(기존 규약).

## 11. 비범위

- 세션 식별(어느 터미널·어느 launch_id)과 세션 로그 열람. Bead 행에 그 사실이 없다.
- 세션이 쓰는 `bd update`를 서버가 즉시 관측하는 갱신 훅(UI-eey2 §9.2 (b)는
  Worker 세션 로그에서만 관측한다).
- Worker 탭에 세션 타일을 추가하는 것(Worker 탭은 per-repo Worker 콘솔; 세션
  모니터링은 모니터 탭 소유). route 칩은 공용 컴포넌트라 Worker 탭에도 함께 나타난다.
- 완료 행의 route 칩.
- 세션 타일에서 상태 변경(open으로 되돌리기 등) 버튼.

## 12. 테스트 계획

서버
- `runnable-cache.test.js`: `in_progress` 행이 `runnable`에서 빠지고
  `session_active`에 들어간다 / `sessionActiveFor(exclude_ids)`가 제외한다 /
  `invalidate`가 두 버킷을 함께 만료시킨다 / enrich throw가 그 항목만 `workflow:
  null`로 남긴다.
- `monitor-handlers.test.js`: 활성 attempt·queue·serial·pr_wait 멤버가 제외되고
  `done` 멤버는 제외되지 않는다 / `session_active`만 있는 레포가 `hasPipeline`
  통과 / `counts.session_active` 값과 `running` 불변.

클라이언트
- `monitor/lanes.test.js`: 세션 항목이 `running`에 `kind:'session'`으로, Worker
  타일 뒤 `updated_at` 내림차순 / 같은 bead가 attempt와 session_active 양쪽에
  있으면 Worker 타일만 / `done`과 겹치면 running만 / 대기·PR 대기 항목에
  `workflow`가 `bead_workflow`에서 채워진다 / `locations`에 세션 타일이 `running`.
- `worker/lanes.test.js`: `routeChipTemplate` — 없음/파생(`unset`)/핀 3분기;
  `miniRow`가 `workflow` 있을 때만 칩을 그리고 `done` 행에는 안 그린다.
- `worker/running-grid.test.js`: 세션 타일에 운영 버튼·`▤ 세션`이 없고 `세션` 배지·
  route 칩·`갱신 n 전`·exec_receipt 칩이 조건부로 그려진다 / Worker 타일에
  `tile.workflow`가 있으면 route 칩.
- `monitor/deck.test.js`: `session_active` 0이면 텍스트 없음, >0이면 `· 세션 m`.
- 드롭 핸들러 테스트에 세션 타일이 드롭 대상이 아님을 고정.

수동 확인(스크린샷, 사용자 결정 기록에 따라): 이 저장소에서 `UI-e6hw`(현재
`in_progress`)가 세션 타일로 보이는지, 대기 행에 route 칩이 붙는지.

## 13. 동시 작업 주의

`UI-e6hw`(대기 레인 통합)가 Worker에 의해 `app/views/monitor/lanes.js`·
`index.js`·`styles.css`를 수정 중이다. 이 스펙의 구현은 UI-e6hw PR이 머지된 base
위에서 시작하거나, 머지 전이라면 `waitingItem`·`running.push` 구간만 건드리는 작은
델타로 유지해 충돌 면적을 최소화한다. 순서 강제는 두지 않는다(`blocks` 없음,
`related`만).

## 14. 구현 unit 후보 (구속력 없음)

- `server`: `server/worker/runnable-cache.js` + `server/ws/monitor-handlers.js` +
  `app/protocol.md` — 두 버킷 스캔, `session_active`/`counts`, 테스트.
- `view`: `app/views/worker/lanes.js`(`routeChipTemplate`, `miniRow`) +
  `app/views/worker/running-grid.js`(세션 타일·route 칩) +
  `app/views/monitor/lanes.js`/`index.js`/`deck.js` + `app/views/worker/index.js`
  재료 공급 + `app/styles.css` + 테스트 + `npm run build`.
