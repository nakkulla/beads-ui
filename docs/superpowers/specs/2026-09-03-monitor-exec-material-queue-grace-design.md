---
scope:
  - server/ws/monitor-handlers.js
  - server/worker/title-cache.js
  - server/worker/scheduler.js
  - server/worker/queue-store.js
  - server/ws/worker-handlers.js
  - app/views/worker/lane-model.js
  - app/views/worker/lanes.js
  - app/views/worker/index.js
  - app/views/monitor/index.js
  - app/utils/execution-defaults.js
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
---

# 모니터 실행 재료 적재와 대기 진입 유예 (UI-q1tg)

## 1. 문제

사용자가 2026-09-03에 낸 네 가지다. 넷 중 셋은 표시 문제로 보이지만, 조사에서
**둘의 원인이 같은 하나**임이 드러났다: 모니터 집계 스냅샷에는 bead의 실행 재료가
실려 있지 않다.

1. 후보 레인을 route로 좁혀 볼 수 없다. 필터 스트립에는 `show_blocked`와
   `readiness` 둘뿐이다(`app/views/monitor/index.js:1623`).
2. 자동화가 켜진 레인에 이슈를 넣으면 곧바로 실행이 시작된다. 배치 직후
   `att.scheduler.tick(...)`이 불리고(`server/worker/attach.js:2538`) 그 tick이
   같은 항목을 집는다. 순서를 다시 보거나 빼려면 이미 늦다.
3. 완료 레인 카드가 무엇으로 처리됐는지 말하지 않는다.
4. 모니터 대기 레인 행이 오케/워커를 말하지 않는다.

### 1.1 3과 4의 원인은 하나다 — 모니터에는 재료가 없다

오케/워커 칩은 `overlayExecChips()`가 `bead_overlay` 항목의 `metadata`(핀)와
워크스페이스 실행 설정에서 파생한다(`app/views/worker/lane-model.js:1361`). 그
오버레이는 **Worker 탭 어댑터가 클라이언트에서** Board 라이브 스토어의 다섯 열로
만든다(`app/views/worker/workspace-adapter.js:519`·`:734`). 모니터는 다른 채널을
쓴다 — 서버 집계 `buildMonitorPipeline()`(`server/ws/monitor-handlers.js:358`)이
`decorateQueue()` 결과에 `runnable`·`session_active`만 얹어 보내므로
`bead_overlay`가 없고, Worker 스냅샷이 싣는
`bead_workflow`(`server/ws/worker-handlers.js:2860`)도 없다.

코드가 이미 그 결과를 적어 두었다: *"오버레이가 이 bead의 metadata를
모르면(구독 열 밖·Monitor 스냅샷) 칩이 서지 않는다 — 틀린 칩보다 없는
칩"*(`app/views/worker/lane-model.js:1417`).

따라서 모니터에서는 병렬 대기 행도 오케/워커를 그리지 못한다. 사용자가 관측한
"대기 레인에 안 보인다"는 연결 레인 행만의 문제가 아니라 모니터 전체의 문제다.

### 1.2 3과 4는 기록된 결정을 되돌린다

- 완료 행: `app/views/worker/lanes.js:1772`가 route 칩과 출처 칩을 완료 행에서
  제외하고, 그 근거를 `2026-08-25-card-header-grammar-unify-design.md` §6
  비목표가 소유한다 — *"완료 행은 이미 '무엇이 끝났나'만 답하도록 route·from을
  걷어낸 별도 문법"*.
- 대기 행: `MonitorChainLaneRow`에는 route·실행 주체 필드가 없고, 그 근거는
  *"레인 순서가 곧 의존이므로 같은 사실을 두 번 말하지 않는다"*
  (`app/views/worker/lane-model.js:305`).
- exec 칩 배분: *"`exec_chips`는 '무엇으로 돌아갈까'에 답하는 레인(후보·대기·
  직렬)만 얻는다 — PR 대기·완료 행은 돌아갈 설정이 없다"*
  (`app/views/worker/lane-model.js:3632`).

셋 다 근거가 있는 결정이므로, 되돌리는 근거를 §2와 §7에 남긴다.

### 1.3 레포 접기는 이미 있다 — 이 스펙의 대상이 아니다

사용자의 다섯 번째 요청("모니터 후보 레인에서 레포 접기")은 이미 구현돼
있다(`sectionHeader()`의 `▾`/`▸` 캐럿과 `sectionCollapsed()`,
`app/views/monitor/index.js:781`·`:878`). 새로고침 뒤에도 복원된다.
정렬이 `updated_flat`·`as_given`이면 `runnable_flat`이 서서 섹션 자체가 생기지
않는데(`app/views/worker/lane-model.js:3844`), 사용자는 "있으면 괜찮다"고
확정했으므로 이 스펙은 정렬과 섹션의 관계를 바꾸지 않는다.

## 2. 사용자 확정 결정 (2026-09-03)

| # | 결정 | 근거 |
| --- | --- | --- |
| 1 | 모니터 집계 스냅샷이 bead별 실행 재료를 싣는다 | 3·4번 요청의 공통 전제. 클라이언트 파생식을 두 벌로 만들지 않고 재료만 채운다 |
| 2 | 유예는 자동 dispatch만 막는다. `▶ 진행` 같은 명시적 실행 지시는 즉시 나간다 | 사용자가 직접 누른 것까지 미루면 조작이 먹지 않은 것으로 읽힌다 |
| 3 | 유예 중인 행은 남은 초를 표시하고 `[지금 시작]`으로 건너뛸 수 있다 | 조용히 20초 기다리면 "안 도는 것"과 구분되지 않는다 |
| 4 | 완료 행에 route·오케·워커 세 칩을 모두 싣는다 | 요청 문장이 "어떤 오케랑 워커로 진행됐는지"다. route만으로는 답하지 못한다 |
| 5 | Worker 탭 완료 행에도 같은 칩을 싣는다 | 두 탭이 같은 사실을 같은 모양으로 말한다(ADR 0014) |
| 6 | 대기 레인은 병렬·연결·직렬 세 종류 행 모두 점검해 같은 칩을 얻는다 | 모니터에서 병렬 행도 칩이 안 뜨는 것이 §1.1의 결과다 |
| 7 | route 필터는 다중 선택이다 | `quick_fix`만 보기 못지않게 `quick_fix`+`unset`을 함께 보는 것이 흔하다 |
| 8 | 유예는 20초 고정 상수다 | 워크스페이스 설정으로 열면 18키 실행 프로파일(ADR 0032)과 별개인 축이 하나 더 생긴다. 필요해지면 그때 연다 |

## 3. 설계

### 3.1 모니터 파이프라인이 bead 실행 재료를 싣는다

`buildMonitorPipeline()`이 워크스페이스마다 `bead_overlay`를 Worker 어댑터와
**같은 모양**으로 싣는다:

```
bead_overlay: { [bead_id]: { route?: string, metadata?: Record<string, string> } }
```

- **대상 bead**: 레인 멤버(`queue` ∪ `serial_lanes[].entries` ∪ 실행중) ∪ `done`.
  `runnable` 행은 자기 행이 이미 `workflow`를 싣고 오므로 오버레이가 필요 없다.
- **재료 출처**: `titleCache`. `workflowFor()`가 이미 같은 id 집합을 받아 route를
  주고(`server/worker/title-cache.js:569`), 실행 핀을 위해 같은 파일에
  `execPinFor(workspace, ids)`를 더한다. 캐시 레코드는 이미 원본 issue의
  `metadata`를 읽고 있으므로(`:246`) 새 bd 호출이 없다 — **ADR 0026(투영 경로는
  동기 자식 프로세스를 띄우지 않는다)을 지킨다.** 레코드가 아직 안 내려온 bead는
  결과에서 빠진다(캐시의 기존 부분성 계약 그대로).
- **`metadata`의 범위**: `EXECUTION_SETTING_KEYS`(`app/utils/execution-defaults.js:16`)에
  실린 키와 `impl_dispatch`만 남긴 subset이다. 전체 metadata를 부으면 페이로드가
  레포 수만큼 곱해지고, 칩 파생이 읽지 않는 값까지 나른다.
- **`route`**: `workflowFor()`가 주는 파생 포함 route. 없으면 키 자체가 없다.

클라이언트는 바뀌지 않는다. `lane-model.js:2497`의 `objectOf(workspace.bead_overlay)`
루프가 두 채널의 오버레이를 같은 코드로 읽고, `overlayExecChips()`가 모니터의
`workspaces_state`(`runner_catalog`·`execution_defaults`·orchestration 3키를 이미
싣는다, `server/ws/monitor-handlers.js:645`)와 짝지어 같은 칩을 만든다.

**fail-quiet**: 오버레이가 없거나 캐시가 차갑거나 `resolveExecutionSettings`가
던지면 칩이 서지 않는다. 지금과 같은 화면이지 새 오류 표시가 아니다.

### 3.2 후보 route 필터

`CandidateFilter`에 `routes: string[]`을 더한다. 저장은 기존
`MONITOR_CANDIDATE_FILTER_KEY`와 Worker 탭의 대응 키에 그대로 얹는다.

- 값은 `quick_fix` · `spec_backed` · `full_plan` · `unset` 네 가지이고 **다중
  선택**이다. 빈 배열이 "전체"이므로 저장값 없는 사용자는 지금 화면 그대로다.
- `unset`의 판정은 route 칩이 `unset`을 그리는 판정과 같다
  (`routeChipTemplate`, `app/views/worker/lanes.js:1189`): route가 없거나
  `route_source === 'derived'`. 칩이 `unset`이라고 말하는 행은 `unset` 필터로
  잡히고, 그 반대도 성립한다.
- **숨김이다.** `show_blocked`·`readiness`와 같은 문법이며, 모니터 머리말의
  "필터는 숨김이 아니라 흐림"은 **데크의 포커스 필터**를 말한 것이라
  (`app/views/monitor/index.js:18`·`:1860`) 이 필터와 축이 다르다.
- 판정은 `lane-model`이 소유한다. 두 탭이 같은 결과를 얻고, 숨긴 건수는
  `runnable_hidden`에 `route` 칸을 더해 기존 `숨김 n` 문구가 그대로 답한다.
- 칩 묶음은 준비도 세그먼트 옆에 선다. 준비도는 단일 선택(`aria-pressed` 하나만
  참), route는 다중 선택(각 칩이 독립 `aria-pressed`)이라 두 묶음은 시각적으로
  나뉘어야 한다 — `role="group"`과 `aria-label="route 필터"`로 가른다.

### 3.3 대기 진입 유예

**상수**: `QUEUE_GRACE_MS = 20_000`, `server/worker/scheduler.js` 소유.

**판정**: `tickPass`가 자동 dispatch 후보를 고를 때, 그 항목의
`added_at + QUEUE_GRACE_MS > now()`이면
`refuseDispatch(workspace, bead_id, 'grace_period')`로 넘긴다.
`added_at`은 큐 항목이 이미 갖고 있다(`server/worker/queue-store.js:24`).

이는 `prerequisite_unmet`(ADR 0034)과 **같은 admission 메커니즘**이다 — 새 status
어휘도 새 레인도 만들지 않고, `recordAdmission`이 쓰는 기존 레코드를 쓴다. 그래서
두 탭의 행이 이미 admission을 읽고 있는 경로
(`admissionBadge`, `app/views/worker/lane-model.js:1112`; 연결 레인 행의
`admission_by_bead`, `:2382`)를 그대로 탄다.

**적용 범위(결정 2)**: 유예는 `tickPass`의 자동 dispatch 경로에만 선다.
`▶ 진행`이 발차한 연결 레인, `[지금 재시도]`, 재시도 rung의 due dispatch는 유예를
보지 않는다. 재정렬은 유예를 다시 시작시키지 않는다 — 기준은 `added_at` 하나이고,
드래그는 그 값을 바꾸지 않는다.

**깨우기**: tick이 이벤트 구동이라 유예가 끝나는 것을 깨울 것이 필요하다.
`armRetryTimer()`(`server/worker/scheduler.js:10353`)와 **같은 모양**의
`armGraceTimer(workspace)`를 둔다: 워크스페이스에서 가장 이른 만료 시각 하나에만
`setTimeout`을 걸고, 멱등하게 재무장하며, `unref()`하고, 재시작하면 durable한
`added_at`에서 다시 무장한다. 새 폴링 cadence를 만들지 않으므로 ADR 0034의
"복귀 트리거는 이벤트 구독" 근거를 유지한다.

**표시(결정 3)**: admission 사유가 `grace_period`인 행은
`⏳ <남은 초>초` 칩을 슬롯 4a(의존 — "지금 갈 수 있나")에 그린다. `⛔` 접두를
쓰지 않는 것은 `prerequisite_unmet`과 같은 이유다 — 거절이 아니라 곧 풀리는
진단이므로 danger 스타일을 타서는 안 된다. 남은 초는 클라이언트가
`added_at + 20초 - now()`로 계산한다. 서버가 초를 실어 보내면 스냅샷마다 값이
달라져 push 억제(`pushSnapshotIfChanged`)가 무력해진다.

**건너뛰기(결정 3)**: 유예 중인 행에만 `[지금 시작]`이 선다 — 슬롯 1 조작(행 1번
줄 오른쪽 끝, `queueRowOps` 묶음), 공통 토큰 `.op-btn`. 클릭은 WS op
`worker-queue-start-now`를 보내고, 서버는 그 항목의 `added_at`을
`now() - QUEUE_GRACE_MS`로 내려 유예를 소진시킨 뒤 tick한다. 유예 상태가
durable한 `added_at` 하나로만 표현되므로 이 조작도 durable하다 — 재시작해도
다시 20초를 기다리지 않는다.

### 3.4 완료 행이 실행 사실을 말한다

**모니터(3줄 행, `doneThreeLineRow`)**: 3번째 줄은 이미 usage/작업 시간을 싣는
슬롯 5 줄이다. 그 줄 **앞쪽**에 route → 오케 → 워커 순으로 붙인다. 줄 수는 늘지
않는다.

**Worker 탭(2줄 행, `miniRow`의 `two_line`)**: `route_el`·`from_el`의
`item.lane === 'done'` 제외를 걷는다. 완료 행의 2번째 줄이 슬롯 5 줄이므로 칩은
그 줄에 선다.

**재료**: `exec_chips` 배분에 `done`을 더한다(`lane-model.js:3632`). 완료 행의
오케/워커가 답하는 질문은 "무엇으로 돌아갈까"가 아니라 **"무엇으로 돌았나"**이므로
재료가 다를 수 있다. 이 스펙은 **핀 기준 하나로 통일한다**: 오버레이 metadata에서
파생한 값, 즉 지금 후보·대기 행이 쓰는 것과 같은 식이다.

- 근거: attempt 기록은 실행 중 타일이 이미 소유하고(`attemptExecChips`,
  `lane-model.js:1412`), 완료 행이 실제로 답해야 하는 것은 "이 이슈가 어떤
  설정으로 처리되는가"라는 사용자의 질문이다. 두 재료를 섞으면 같은 칩이 레인마다
  다른 뜻을 갖는다.
- 한계를 명시한다: 핀이 실행 이후에 바뀌면 완료 행의 칩은 그 새 핀을 말한다.
  attempt가 실제로 기록한 값은 실행 영수증(`exec_receipt`)과 세션 이력이 소유하며,
  완료 행의 `exec_receipt` 칩이 이미 같은 줄에서 그 질문에 답한다.

### 3.5 대기 레인 세 종류 행이 같은 칩을 얻는다

- **병렬 행**(`parallelRow` → `miniRow`): 템플릿은 이미 칩을 그린다. §3.1이
  재료를 채우면 그대로 뜬다. 코드 변경 없음.
- **직렬 행**: 병렬과 같다 — `lane.startsWith('s')`가 이미 exec 칩 배분에 있다.
- **연결 레인 행**(`chainRow`): `MonitorChainLaneRow`에 `route` ·
  `route_source` · `exec_chips` 세 필드를 더하고, `buildCrossLanes`가
  오버레이에서 채운다. 뷰는 행의 위치 칩 옆에 route → 오케 → 워커를 그린다.
  의존 칩(`⛓`·`← 선행`)을 뺀 근거는 그대로 유지한다 — 레인 순서가 곧 의존이라는
  말은 **의존**에 대한 것이고, route와 실행 주체는 다른 질문에 답한다.

## 4. 슬롯 표 개정 (ADR 0014 절차)

칩을 달기 전에 `2026-08-25-card-header-grammar-unify-design.md`를 먼저 고친다.

1. **§6 비목표의 "완료 행은 바꾸지 않는다"를 정정으로 대체한다.** 그 비목표의
   근거는 "완료 행이 답하는 질문은 '무엇이 끝났나'뿐"이었다. 사용자 관측이 그
   전제를 반증했다 — 끝난 일에 대해서도 "무엇으로 돌았나"를 묻는다. 새 문장:
   완료 행은 슬롯 5 줄을 갖고, 그 줄이 route · 오케/워커 · `exec_receipt` ·
   usage · 작업 시간을 함께 싣는다.
2. **§5.1 슬롯 표에 두 항목을 더한다.** 슬롯 4a에 `⏳ <n>초`(유예), 슬롯 1
   조작에 `[지금 시작]`. 자리는 각각 `⛓ 선행 대기`·`↻ 이어하기`와 같은 판정으로
   정해진다 — 유예는 "지금 갈 수 있나", `[지금 시작]`은 "내가 여기서 무엇을 하나".
3. **연결 레인 행이 슬롯 5를 갖는다**를 명시한다. 지금 표는 이 행을 다루지
   않는다.

`AGENTS.md`의 "워커·모니터 카드 배치 문법" 절은 스펙을 가리키기만 하므로 문장을
고칠 필요가 없다.

## 5. 검증

- `server/ws/monitor-handlers.test.js`: `bead_overlay`가 레인 멤버와 `done`에만
  실리고, metadata가 실행 키 subset으로 잘리며, 캐시 미스 bead가 빠진다.
- `server/worker/title-cache.test.js`: `execPinFor`의 부분성과 키 subset.
- `server/worker/scheduler.test.js`: `added_at` 직후 tick이
  `grace_period`로 거절하고 20초 뒤 tick이 dispatch한다; `▶ 진행` 경로는 유예를
  보지 않는다; `armGraceTimer`가 가장 이른 만료 하나에만 걸리고 멱등하다;
  `worker-queue-start-now`가 유예를 소진시킨다.
- `app/views/worker/lane-model.test.js`: route 필터 네 값과 다중 선택,
  `unset`이 파생 route를 잡는 것, `runnable_hidden.route` 집계, `done` 레인의
  exec 칩 배분, 연결 레인 행의 세 새 필드.
- `app/views/worker/lanes.test.js`: 완료 2줄·3줄 행의 칩, `⏳` 칩과
  `[지금 시작]`의 슬롯 자리.
- `app/main.monitor.e2e.test.js`: 모니터 대기·완료 행에 오케/워커가 그려진다.
- Pre-Handoff: `npm run tsc` · `npx vitest run --reporter=dot` · `npm run lint` ·
  `npm run prettier:write` · `npm run build`(번들·소스맵 포함, prettier 다음에).

## 6. 비목표

- **후보 레인의 레포 접기는 건드리지 않는다**(§1.3). 정렬과 섹션의 관계도 그대로다.
- **`carried_to`(이월 칩)는 이 스펙이 싣지 않는다.** UI-ys18이 같은 뿌리 — 모니터
  파이프라인에 `bead_overlay` 재료가 없다 — 를 그 필드에 대해 이미 소유하고
  있고, 파생 규칙은 `2026-09-01-sweep-carryover-conversion-design.md` §3이
  소유한다. 이 스펙은 그 필드가 타고 갈 **전송로**(§3.1의 `bead_overlay`)를
  만들 뿐이다. 두 Bead가 같은 배선을 두 번 하지 않도록 UI-ys18을 이 Bead에
  `blocks`로 걸어 뒤에 세운다.
- **유예 길이를 설정으로 열지 않는다**(결정 8). 20초 고정 상수다.
- 결정: **완료 행의 오케/워커는 attempt 기록에서 파생하지 않는다** — 핀 기준
  하나로 통일하고, 실행 시점의 사실은 같은 줄의 `exec_receipt`가 소유한다(§3.4).
- 결정: **route 필터는 흐림이 아니라 숨김이다** — 데크의 포커스 필터와 축이
  다르고, 같은 스트립의 `show_blocked`·`readiness`와 어긋나면 한 줄 안에서 두
  문법이 산다(§3.2).
- 서버가 남은 초를 실어 보내지 않는다(§3.3) — push 억제를 무력화한다.
- 계약 표면(라벨 어휘, durable metadata 키, `status` 어휘)은 건드리지 않는다.
  beads-ui는 소비자다(ADR 0012).

## 7. 결정 (ADR 후보)

- 전제: ADR 0014 — 레인 조립을 단일 `buildLanes`로 유지하고, 새 칩의 자리는 공유
  슬롯 표 개정(§4)으로 얻는다.
- 전제: ADR 0026 — 모니터 투영이 새 재료를 실으면서도 동기 자식 프로세스를 띄우지
  않는다. 재료는 warm `titleCache`에서만 읽는다.
- 전제: ADR 0034 — 유예 거절은 `prerequisite_unmet`과 같은 admission 레코드를
  쓰고 재스캔 후보 판정 규칙을 바꾸지 않으며, 깨우기도 새 폴링 cadence가 아니라
  이미 아는 만료 시각 하나에 건 일회성 타이머다(`armRetryTimer`와 같은 모양).
- 전제: ADR 0032 — 유예를 워크스페이스 실행 프로파일의 키로 만들지 않는다.

판정은 세 조건 각각의 성립 여부를 따진다: 되돌리기 어려움 · 맥락 없이는 놀라움 ·
실질 트레이드오프.

### 후보 1 — 완료 행은 실행 사실을 말한다

- **완료 레인 행은 슬롯 5 줄을 갖고 route·오케/워커를 싣는다.**
  - **되돌리기 어려움: 성립.** 되돌리려면 두 탭의 완료 행 템플릿, exec 칩의 레인
    배분, 카드 문법 스펙 §5.1·§6, 그리고 그 스펙을 가리키는 `AGENTS.md` 문장까지
    함께 되돌려야 한다. 되돌린 뒤에도 사용자가 이미 읽던 사실이 화면에서
    사라지므로 코드 되돌림만으로 끝나지 않는다.
  - **맥락 없이는 놀라움: 성립.** 지금 코드는 반대를 명시적으로 적어 두었다 —
    "끝난 일의 route는 더 이상 어떤 결정도 바꾸지 않는다". 그 문장을 읽은 사람이
    완료 행에 route 칩이 선 것을 보면 규칙이 깨진 것으로 읽는다. 근거 없이는 왜
    이 행만 예외인지 알 수 없다.
  - **실질 트레이드오프: 성립.** 완료 레인은 가장 긴 목록이라 칩 하나가 가져가는
    가로가 그대로 제목이 잃는 가로다. 그것이 원래 결정의 근거였다. 반대편은
    "무엇으로 처리됐나"를 이력 화면까지 건너가야만 알 수 있게 둔다. 우리는
    3줄 행에서 줄을 늘리지 않는 자리(이미 있는 슬롯 5 줄)를 골라 비용을 줄인 채
    후자를 택했다.
  - 세 조건이 모두 성립하므로 `summary` 초안을 단다.
    `summary`: "완료 레인 행은 슬롯 5 줄을 갖고 route와 오케/워커를 실어 '무엇으로 돌았나'에 답한다"
  - `2026-08-25-card-header-grammar-unify-design.md` §6의 완료 행 비목표를
    뒤집으므로 §4가 그 스펙을 먼저 고친다. `docs/adr/README.md`
    `## 현재 유효한 결정`의 어떤 ADR과도 모순하지 않는다 — ADR 0014는 자리를
    슬롯 표가 정하라고 요구할 뿐 어떤 칩이 어느 행에 서는지 정하지 않으며, 이
    결정은 그 절차를 따른다. → ADR

### 후보 2 — 모니터 집계는 bead 실행 재료를 싣는다

- **모니터 집계 스냅샷은 레인 멤버와 완료 bead의 route와 실행 핀 subset을 실어,
  두 탭이 같은 파생식으로 같은 칩을 그린다.**
  - **되돌리기 어려움: 불성립.** 되돌릴 표면이 서버 함수 하나와 캐시 투영 하나로
    닫혀 있고, 클라이언트는 이미 오버레이가 없을 때를 fail-quiet로 다룬다
    (`lane-model.js:3635`의 `size > 0` 가드). 되돌리면 칩이 사라질 뿐 오류가
    나지 않는다.
  - **맥락 없이는 놀라움: 불성립.** 클라이언트 파생식의 주석이 이미 "모니터
    스냅샷은 metadata를 모른다"고 적고 있어, 재료를 채우는 것은 그 주석이 가리킨
    빈칸을 메우는 일로 읽힌다. Worker 채널이 같은 키를 이미 싣는다는 사실도 같은
    방향을 가리킨다.
  - **실질 트레이드오프: 불성립에 가깝다.** 비용은 페이로드 증가 하나인데 키
    subset과 대상 bead 제한으로 이미 묶었고, 대안(서버가 칩 문자열을 만들어
    보낸다)은 같은 파생식을 두 벌로 만들어 ADR 0014가 막으려던 실패를 다시
    부른다. 저울에 올릴 대등한 반대급부가 없다.
  - 하나도 성립하지 않으므로 이 스펙이 소유한다. → ADR 아님

### 후보 3 — 대기 진입에 20초 유예를 둔다

- **자동 dispatch는 큐 항목이 들어온 지 20초가 지나야 그 항목을 집는다.**
  - **되돌리기 어려움: 불성립.** 상수 하나와 판정 한 줄, 타이머 하나로 닫혀
    있고, 되돌려도 durable 상태가 남지 않는다 — 유예는 이미 있는 `added_at`으로만
    표현되므로 이관할 데이터가 없다.
  - **맥락 없이는 놀라움: 성립.** 자동화를 켜 둔 사용자가 항목을 넣고 20초 동안
    아무 일도 일어나지 않는 것을 보면 고장으로 읽을 수 있다. 그래서 결정 3이
    남은 초와 `[지금 시작]`을 요구했다 — 놀라움을 화면이 직접 없앤다.
  - **실질 트레이드오프: 성립.** 유예는 되돌릴 틈을 주지만 모든 자동 실행을
    20초 늦춘다. 짧게 하면 되돌릴 틈이 없고, 길게 하면 자동화가 굼떠 보인다.
    20초는 배치 직후 순서를 다시 보고 빼기에 충분한 최소값으로 고른 값이지 측정된
    최적값이 아니다.
  - 세 조건 중 둘만 성립한다. 되돌리기가 쉽고 durable 잔재가 없으므로 이 스펙이
    소유하고, 놀라움은 §3.3의 표시가 그 자리에서 없앤다. → ADR 아님

### 후보 4 — 연결 레인 행이 route와 실행 주체를 싣는다

- **연결 레인 행은 의존 칩은 계속 갖지 않지만 route와 오케/워커는 싣는다.**
  - **되돌리기 어려움: 불성립.** 투영 필드 셋과 템플릿 한 곳이다.
  - **맥락 없이는 놀라움: 불성립.** 기존 근거가 "레인 순서가 곧 **의존**이므로"
    라고 축을 명시하고 있어, 다른 축의 칩이 서는 것이 그 문장과 부딪히지 않는다.
  - **실질 트레이드오프: 불성립.** 대안(연결 레인만 실행 주체를 감춘다)은 같은
    대기 레인 안에서 행 종류마다 다른 사실을 말하게 만들어, 통일하려던 문제를
    되살릴 뿐이다.
  - → ADR 아님

## 8. 구현 unit 후보

`unit_plan`을 강제하지 않는 참고용 분해다.

| unit | scope anchor |
| --- | --- |
| `material` | `server/worker/title-cache.js` · `server/ws/monitor-handlers.js` |
| `grace` | `server/worker/scheduler.js` · `server/ws/worker-handlers.js` |
| `chips` | `app/views/worker/lane-model.js` · `app/views/worker/lanes.js` · `app/views/monitor/index.js` |
| `filter` | `app/views/worker/lane-model.js` · `app/views/worker/index.js` · `app/views/monitor/index.js` |

## 9. 경계·후속

새로 만드는 행은 없다. §1.3의 레포 접기는 이미 구현돼 있고 사용자가 현행으로
확정했으므로 후속 항목이 아니다.

기존 Bead 하나와의 관계만 기록한다.

- **UI-ys18** (모니터 완료 행이 이월 칩 재료를 못 받음): 같은 뿌리를 같은
  방향으로 결정한다 — 서버가 `bead_overlay` 자리에 재료를 실어 보낸다. 중복
  구현을 막기 위해 전송로는 이 스펙이 만들고(§3.1), `carried_to` 필드는
  UI-ys18이 그 위에 얻는다. 간선: `bd dep add UI-ys18 UI-q1tg --type blocks`.
- **UI-n28d** (프리셋 비교 탭): `server/worker/scheduler.js`·`server/worker/queue-store.js`
  경로만 겹치고 결정 대상이 다르다 — path-only 겹침이므로 순서는 Worker 큐의
  직렬 배치와 `blocks` 간선이 정한다.
