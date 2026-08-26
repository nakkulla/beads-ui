---
scope:
  - server/ws/worker-handlers.js
  - app/views/monitor/lanes.js
  - app/views/monitor/lanes.test.js
  - app/views/worker/queue-blockers.js
  - app/views/worker/queue-overlaps.js
  - app/views/worker/index.js
  - app/views/worker/lanes.js
  - app/views/worker/lanes.test.js
  - app/views/worker/running-grid.js
  - app/views/worker/running-grid.test.js
  - docs/superpowers/specs/2026-08-24-monitor-scope-overlap-chips-design.md
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
  - app/main.bundle.js
  - app/main.bundle.js.map
---

# UI-anna — 의존·겹침 칩의 레인 무관 통일

## 1. 문제

카드 헤더 문법은 UI-251y가 통일했다. 줄 순서와 슬롯은 세 렌더러가 공유하고,
`⛓ blocked` · `⧉ 겹침` · `scope 없음`은 슬롯 4(“지금 갈 수 있나”)에 함께 선다.
그런데 **그 슬롯에 재료가 실리는 레인이 아직 갈려 있다.**

| 레인 | `⛓ blocked` | `⧉ 겹침` | `scope 없음` |
|---|---|---|---|
| 후보·실행가능 | ○ | ○ | ○ |
| 대기(병렬·직렬) | Monitor ○ / Worker 뱃지 | ○ | ○ |
| 실행중 | ✕ | ○ | ✕ |
| PR 대기 | ✕ | ✕ | ✕ |

같은 사실이 카드 종류에 따라 보였다 사라진다. 사용자는 카드가 어느 레인의
것인지 먼저 식별한 뒤에야 “이 이슈가 지금 무엇과 부딪히나”를 물을 수 있고,
PR 대기 카드에서는 그 질문에 답이 아예 없다.

배제는 세 자리에서 서로 다른 근거로 생겼다.

- **투영의 강제 배제.** `app/views/monitor/lanes.js`가 `item.lane === 'running'
  || item.lane === 'pr_wait'`이면 `predecessors`를 빈 배열로 만든다. 근거는
  “이미 출발했으므로 막힌 것이 없다”였다.
- **서버 적재 범위.** `beadScopeFor`가 `laneMemberIds(queue, false)`로 읽어
  PR 대기 bead의 `bead_scope`를 아예 싣지 않는다(UI-qm12 §4.3). 클라이언트가
  비교 집합을 넓히려 해도 재료가 없다.
- **렌더러의 레인 분기.** `dependencyChipsTemplate`이 `options.lane !==
  'running'`일 때만 `scope 없음`을 그린다(UI-qm12 §5.3). 근거는 “이미 출발한
  이슈에게 선언을 요구하는 문장이기 때문”이었다.

여기에 **탭 축의 어긋남**이 하나 더 있다. `⛓ blocked` 칩(`predecessors`)을
만드는 곳은 `app/views/monitor/lanes.js` 하나뿐이다. Worker 탭은 같은 사실을
칩이 아니라 대기 행 뱃지 문장 `⏸ <blocker…> 완료 대기 (blocks)`로 그리고,
그것도 서버 admission이 `not_ready`로 스킵한 행에만 붙인다
(`app/views/worker/index.js`). 두 탭이 같은 렌더러를 쓰면서 같은 사실을 다른
모양으로 말하고 있다.

## 2. 확정 결정

사용자 결정(2026-08-26):

1. **blocked 칩은 문구·색을 바꾸지 않는다.** 레인마다 뜻이 미묘하게 다르다는
   이유로 문구를 갈라 쓰지 않는다 — 칩 하나만 익히면 어디서나 읽히는 쪽을
   택한다.
2. **PR 대기도 겹침 비교 집합에 넣는다.** 서버 `bead_scope` 적재 대상에
   `pr_wait`을 추가한다.
3. **`scope 없음`도 실행중·PR 대기에 붙인다.** 레인별 억제를 없앤다.
4. **Worker 대기 행의 `⏸ … 완료 대기 (blocks)` 뱃지는 칩으로 통일한다.**
   뱃지와 칩이 같은 blocker id를 한 카드에 두 번 적지 않게 한다.

이 스펙이 바꾸는 것은 **어느 레인이 슬롯 4의 재료를 받는가** 하나다. 칩이 서는
줄(슬롯 4), 칩의 문구·글리프·색·클릭 동작, 칩 열 순서(`⛓ 선행` → `⧉ 겹침` →
`scope 없음`)는 UI-251y·UI-qm12가 정한 그대로다.

### 2.1 실행중·PR 대기의 blocked가 뜻하는 것

대기 레인에서 blocked는 “출발하지 못한다”다. 이미 출발한 레인에서 같은 칩은
“선행이 아직 닫히지 않았다”를 말한다. 두 문장은 다르지만 **사용자가 확인해야
할 것은 같다** — 이 이슈와 저 이슈의 순서다. 실행중에서는 워커 admission을
우회한 세션 착수나 출발 뒤 추가된 간선을 드러내고, PR 대기에서는 선행이 닫히기
전에 머지하려는 상황을 드러낸다. 둘 다 사용자가 보고 판단할 사실이므로 칩이
서는 편이 맞다.

칩은 판정에 입력되지 않는다. 워커 admission도 머지 게이트도 이 표시를 읽지
않으며, 이 스펙은 그 판정을 하나도 바꾸지 않는다.

## 3. 서버 — 적재 범위 두 곳 (`server/ws/worker-handlers.js`)

### 3.1 `bead_scope`에 PR 대기 추가

- `beadScopeFor`의 `laneMemberIds(queue, false)`를 `laneMemberIds(queue, true)`로
  바꾼다. `include_pr_wait` 파라미터는 이미 있고 `bead_workflow`
  (`beadWorkflowFor`)가 `true`로 쓴다 — 두 장식의 대상 집합이 같아진다.
- 값의 의미(`{scope, artifacts}` / `{scope: []}` / `null` / 항목 없음)와
  partial·fail-quiet·비영속 계약은 UI-qm12 §4.3 그대로다. 바뀌는 것은 대상
  집합뿐이다.
- 비용: 레포당 PR 대기 bead 수만큼 `scope_cache.peek` 조회가 늘고, 캐시 miss일
  때만 `git cat-file` 1~2회가 예약된다. `resolveBase`는 이미 20초 캐시이고
  scope 캐시는 5분 주기다. 한 스냅샷 푸시가 늘리는 동기 작업은 Map 조회뿐이다.

### 3.2 `bead_blocked_by`에 실행중 attempt bead 추가

- `beadDecorationFor`의 `decorated_lanes`는 `queue` · `pr_wait` · `done` ·
  `serial_lanes`를 이미 커버한다. **PR 대기 blocked는 서버 변경 없이도 된다.**
- 실행중은 대개 큐 항목이 남아 커버되지만(구현 attempt가 끝날 때까지 큐 entry가
  남는다), 세션이 직접 잡아 큐에 없는 bead는 빠진다. `laneMemberIds`가 이미 쓰는
  것과 같은 순회 — `queue.attempts` 중 `status === 'running'`이고
  `isImplementationAttempt`인 항목의 `bead_id` — 를 `beadDecorationFor`의 id
  수집에 더한다.
- 이 함수는 `titlesFor` · `timesFor` · `labelsFor` · `blockedByFor` 네 장식이
  공유하므로, 대상이 넓어지면 그 셋도 실행중 bead를 함께 받는다. 모두
  partial·additive 장식이라 추가 항목은 소비자에게 새 재료일 뿐 기존 판정을
  바꾸지 않는다. 실행중 bead는 대개 큐 항목으로 남아 이미 넷을 받고 있으므로,
  실제로 채워지는 것은 큐에 없는 세션 착수 bead뿐이다.
- `bead_blocked_by`는 여전히 partial이다: 항목 부재는 “blocker 없음”이 아니라
  “모른다”이며, 클라이언트는 부재를 칩 생략으로 읽는다(fail-quiet).

## 4. Monitor 투영 (`app/views/monitor/lanes.js`)

### 4.1 강제 배제 제거

`predecessors`를 만드는 루프에서 `item.lane === 'running' || item.lane ===
'pr_wait'` 분기를 없앤다. 네 레인(`queue` · `runnable` · `running` · `pr_wait`)이
모두 `item.blockers`에서 칩을 만든다. 그 자리의 주석(“이미 출발한 이슈에게…”)은
후속 칩을 걷어낸 근거와 실행중·PR 대기 배제 근거가 한 문단에 섞여 있으므로,
후속 칩 근거만 남기고 이 스펙을 가리키도록 고친다.

### 4.2 `blockers` 계산 대상 확대

`item.blockers`를 채우는 루프의 대상을 `[...model.queue, ...model.runnable]`에서
`[...model.queue, ...model.runnable, ...model.running, ...model.pr_wait]`로
넓힌다. `describeBlocker`와 `buildBlockerLocationMap`은 이미 `running`·`pr_wait`
위치를 알고 있어(`blockerLocationLabel`의 `실행중`/`PR 대기`) 새 문자열을
발명하지 않는다.

### 4.3 `blocked_by` 부착

`Object.hasOwn(item, 'blocked_by')` 판정이 재료의 유무를 결정하므로, 지금 그
필드를 싣지 않는 item 생성부에 대기 행과 같은 경로로 부착한다.

- 실행중 attempt item — `bead_blocked_by[bead_id]`에서.
- 실행중 head review·repair 세션 item — 같은 경로. 이 타일은 `non_occupying`
  이라 PR 대기 점유자와 함께 보이는데, 두 카드가 같은 bead의 같은 blocker를
  말하는 것은 사실이 어긋나는 것이 아니라 같은 사실이 두 자리에 서는 것이다.
- PR 대기 item — 같은 경로.
- 세션 타일(`session_active`)과 실행가능(`runnable`)은 서버 entry가 이미
  `blocked_by`를 실어 주므로 그대로 둔다.

부착 규칙은 대기 행과 동일하다: 키가 있으면 문자열만 걸러 배열로 넣고, 키가
없으면 필드를 만들지 않는다.

### 4.4 겹침 비교 집합에 PR 대기 추가

`applyScopeOverlaps`의 순회 대상을 `[...model.running, ...model.queue,
...model.runnable]`에서 `model.pr_wait`을 포함한 넷으로 넓힌다. `scope_state`
부착도 같은 순회에서 이뤄지므로 PR 대기 카드가 `scope 없음` 재료를 함께 받는다.
레포별 분리·양쪽 모두 선언한 쌍만 비교·레포 간 비교 없음은 그대로다.

`pushChip`의 위치 라벨은 `chainRowLocationLabel`이 만들고, 그 소스인
`buildBlockerLocationMap`은 `pr_wait`을 이미 담는다 — PR 대기 상대는 `PR 대기`로
읽힌다.

### 4.5 1클릭 배치는 바꾸지 않는다

`placementPlan`은 `isPlaceable`이 lane 화이트리스트(`runnable`·`queue`·`s1~s5`)
이므로 PR 대기 상대에게 이미 “옮길 수 없음” 계열 문장을 낸다. 실행중과 같은
취급이고, 손댈 곳이 없다.

## 5. Worker 투영

### 5.1 신규 파생 `app/views/worker/queue-blockers.js`

Worker 탭에는 `predecessors` 생산자가 없다. Monitor의 `describeBlocker`는
`workspaces_state`와 레포 축을 가진 `BlockerLocation`에 묶여 있어 워크스페이스
하나짜리 Worker 탭이 그대로 쓸 수 없다. 겹침이 이미 같은 문제를 같은 방법으로
풀었다 — `queue-overlaps.js`가 “모니터의 `applyScopeOverlaps`와 같은 규칙이되
레포 분기가 없는” 두 번째 소비자다. 그 선례를 따른다.

- `deriveWorkerBlockers(bead_blocked_by, lane_members)` 하나를 내보낸다.
  `lane_members`는 겹침 파생이 쓰는 것과 **같은 목록**이다(§5.2) — blocked와
  겹침이 같은 화면 사실에서 위치를 읽어야 두 칩의 위치 라벨이 갈리지 않는다.
- 위치 라벨은 그 목록의 `location_label`을 그대로 쓴다(`실행중` · `#n` ·
  `s1 #n` · `후보` · `PR 대기`). 목록에 없는 blocker는 `미적재`다 — Worker 탭은
  한 워크스페이스만 보므로 타 레포 blocker도, 아직 적재되지 않은 bead도 여기로
  떨어진다.
- 타 레포 판정은 두 탭이 공유하는 `app/utils/blocker-scope.js`
  `isForeignBlocker(owner_id, blocker_id)`를 그대로 쓴다. prefix 기반 순수
  함수라 `workspaces_state` 없이 판정된다.
- 칩 모양은 Monitor의 `predecessorChip`과 같다: `label`은
  `⛓ blocked: <id>`, `title`은 `이 이슈는 <id>가 close될 때까지 출발하지 않는다
  (<위치>)`, 타 레포면 `foreign: true`. 두 탭이 같은 문자열을 내도록 규칙을
  복제하지 않고, `predecessorChip`을 `app/views/monitor/lanes.js`에서
  `queue-blockers.js`로 옮겨 두 투영이 같은 함수를 부른다. Monitor는 그
  함수를 import해 쓴다.
- `bead_blocked_by`가 없는 구서버 스냅샷은 빈 결과다(fail-quiet).

`title`의 문장(“출발하지 않는다”)은 대기 레인 기준으로 쓰인 것이고 실행중·PR
대기에서는 지난 일을 말하게 된다. 그래도 문구를 바꾸지 않는다 — §2 결정 1이
문구 통일을 택했고, 레인별로 툴팁을 갈라 쓰면 칩이 하나라는 사실이 다시
흐려진다.

### 5.2 위치 사전과 겹침 멤버 목록 확장

`app/views/worker/index.js`가 이미 만드는 `overlap_members` 목록을 위치 사전
겸용으로 쓴다. 지금 담기는 것은 실행중 · 직렬 레인 행 · 병렬 대기 행 · 후보이고,
여기에 **PR 대기 행**을 더한다. 두 칩이 함께 읽으므로 목록과 그 타입의 이름을
겹침 전용에서 화면 사실 전체를 가리키는 이름으로 바꾼다 — `overlap_members` →
`lane_members`, `OverlapMember` → `LaneMember`. 이름만 바뀌고 필드는 아래
`kind` 추가 외에 그대로다.

- `OverlapMember.kind`에 `'pr_wait'`을 추가하고, PR 대기 행은
  `location_label: 'PR 대기'` · `lane_id: null`로 넣는다.
- `deriveWorkerOverlaps`는 멤버 목록만 보므로 그대로 PR 대기를 비교 집합에
  넣는다. 서버가 §3.1로 `bead_scope`를 실어 주므로 재료가 있다.
- `workerPlacementPlan`의 이동 가능 판정 `member.kind !== 'running'`을
  화이트리스트 `['parallel', 'serial', 'candidate'].includes(member.kind)`로
  바꾼다. 부정 판정은 새 `kind`가 생길 때마다 조용히 “옮길 수 있다”로
  기울어진다. PR 대기 상대에게는 실행중과 같은 계열의 문장이 서되, 문구는 그
  레인의 사실을 말한다 — 자기가 PR 대기면 `PR 대기 — 순서를 만들려면 상대를
  직렬 레인에 두세요`, 상대가 PR 대기면 `PR 대기 — 종료 후 출발하려면 직렬
  레인에 두세요`. 둘 다 PR 대기·실행중이면 기존 “둘 다 실행 중 —” 문장 대신
  `둘 다 이미 출발 — 순서를 만들 수 없습니다`를 쓴다.

### 5.3 칩 부착 대상 확대

- 후보 · 병렬 대기 · 직렬 레인 행: 지금 `attachOverlaps`가 겹침만 얹는 자리에
  `predecessors`를 함께 얹는다.
- PR 대기 행: `prWaitRow`가 만드는 행에 `dependency_chips`를 실을 수 있게
  인자를 넓히고, 겹침·`scope 없음`·`predecessors`·팝오버를 얹는다. `miniRow`
  카드 변형은 이미 `dependencyChipsTemplate(item.dependency_chips, ...)`를
  부르므로 렌더러 변경 없이 그려진다.
- 실행중 타일: `running_overlays`가 싣는 `dependency_chips`에 `predecessors`와
  `scope_missing`을 더한다. `RunningOverlay` typedef의 “지금은 겹침 칩만 싣는다”
  주석을 고친다. 오버레이를 만들 최소 조건(지금은 `overlaps || last_activity ||
  legs || session_tile`)에 `predecessors`·`scope_missing`을 더한다 — 그러지
  않으면 겹침 없이 blocked만 있는 타일이 오버레이를 못 받아 칩이 사라진다.
- `overlapPopoverFor`가 만드는 팝오버는 겹침 칩 전용이다. 그대로 둔다.

### 5.4 대기 행 뱃지 제거

`⏸ <blockers> 완료 대기 (blocks)` 뱃지를 만드는 자리를 없앤다. 같은 조건에
붙던 `✳ serial 권장 …` 뱃지는 `wait_badges`를 계속 쓰므로 배열 자체는 남는다.

뱃지는 “서버 admission이 이 행을 `not_ready`로 스킵했다”와 “blocker가 누구다”를
한 문장에 묶고 있었다. 칩은 뒤쪽만 말하지만, **앞쪽은 같은 카드의 `reason`이
이미 말한다** — `admissionBadge`가 `⛔ not_ready (…)`를 그 자리에 그리고, 두 탭이
같은 규칙을 쓴다. 그래서 뱃지를 지워도 잃는 사실이 없고, 칩에 레인별 문장을
덧붙일 이유도 없다. 두 탭의 blocked 칩 문자열은 완전히 같게 남는다.

## 6. 렌더러 (`app/views/worker/lanes.js`)

- `dependencyChipsTemplate`의 `scope_missing` 계산에서 `options.lane !==
  'running'` 조건을 없앤다.
- `options.lane`은 이 억제가 유일한 소비자이므로 파라미터를 제거하고, 호출
  세 곳(`miniRow` 두 변형 · `candidateCard` · `runningTile`)에서 인자를 뺀다.
- 함수 JSDoc의 `lane` 설명 문단을 걷어내고 이 스펙을 가리킨다.

칩이 서는 줄은 `.worker-deps`(슬롯 4) 그대로다. `runningTile`은 이미
`dependencyChipsTemplate`을 슬롯 4 자리에서 부르고 있으므로 마크업 구조는
바뀌지 않는다.

## 7. 계약 스펙 갱신

이 저장소의 스펙이 소유하는 표시 계약이므로 본문을 정정한다. dotfiles의
workflow 계약 표면(라벨 어휘 · durable metadata 키 · `status` 어휘)은 건드리지
않는다.

- `docs/superpowers/specs/2026-08-24-monitor-scope-overlap-chips-design.md`
  - §4.3 대상 집합의 “`beadWorkflowFor`와 같은 집합에서 PR 대기를 뺀 것”을
    “`beadWorkflowFor`와 같은 집합”으로 고치고, 정정 근거로 이 스펙을 가리킨다.
  - §5.2 비교 집합의 “PR 대기 제외”를 “PR 대기 포함”으로 고친다.
  - §5.3 `scope 없음` 칩의 “실행 중 행에는 붙이지 않는다”를 걷어낸다.
- `docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md` §4
  - 레인별 표시 차이를 적어 둔 문단(“후보·대기는 `⛓ blocked` + `⧉ 겹침`,
    실행중은 `⧉ 겹침`만, PR 대기는 없음”)을 레인 무관 통일로 고치고 이 스펙을
    가리킨다. §4의 제목 “투영은 바꾸지 않는다”는 그 스펙이 자기 범위에서
    투영을 건드리지 않았다는 사실이므로 유지하되, 표시 규칙 문장만 현재 상태로
    갱신한다.

`AGENTS.md`는 슬롯 표와 줄 순서만 가리키고 있고 이 스펙은 그 배치를 바꾸지
않으므로 손대지 않는다.

## 8. 비목표

- 칩의 문구 · 글리프 · 색 · 클릭 동작 · 열 순서. `⛓ blocked: <id>` 라벨은
  그대로다.
- 슬롯 배정. 세 칩 모두 슬롯 4에 남는다.
- 후속(successor) 칩 부활. 카드는 “내가 막혔나” 하나만 말한다.
- 완료 레인(2줄·3줄 행). UI-251y §6이 별도 문법으로 두기로 한 자리다.
- 의존성 패널 · 드래그 계약 · 워커 admission · 머지 게이트 판정.
- Monitor의 연결 레인(`chain_lanes`) 행. 겹침 복사 규칙(UI-qm12 §5.2)은 지금
  그대로 두고, 이 스펙은 레인 소속만 넓힌다.

## 9. 검증

- `npm run tsc` · `npm test` · `npm run lint` · `npm run prettier:write`
- `npm run build` 후 `app/main.bundle.js`·`.map` 포함
- 서버 단위 테스트
  - `decorateQueue`가 PR 대기 bead의 `bead_scope` 항목을 싣는다.
  - `bead_blocked_by`가 큐에 없는 실행중 attempt bead의 blocker를 싣는다.
- Monitor 투영 테스트 (`app/views/monitor/lanes.test.js`)
  - 실행중 item과 PR 대기 item이 `dependency_chips.predecessors`를 받는다.
  - PR 대기 item이 겹침 칩과 `scope_state`를 받고, 상대 카드의 위치 라벨이
    `PR 대기`다.
  - `bead_blocked_by`에 키가 없는 실행중 item은 칩을 받지 않는다(fail-quiet).
- Worker 투영·렌더러 테스트
  - `deriveWorkerBlockers`가 위치 라벨과 `foreign` 판정을 Monitor와 같은
    문자열로 낸다.
  - PR 대기 행과 실행중 타일이 세 칩을 모두 받는다.
  - `workerPlacementPlan`이 PR 대기 상대에게 `ops`가 아닌 문장을 낸다.
  - 대기 행에 `⏸ … 완료 대기 (blocks)` 뱃지가 더 이상 없고, 같은 blocker가
    blocked 칩으로 서며, `⛔ not_ready (…)` reason은 그대로 남는다.
  - 같은 blocker에 대해 Worker 칩과 Monitor 칩의 `label`·`title` 문자열이
    같다.
  - 실행중 타일과 PR 대기 행에 `scope 없음` 칩이 그려진다.
  - 겹침 없이 blocked만 있는 실행중 타일이 오버레이를 받아 칩을 그린다.
- 배치 후 공유 서버에서 Monitor 실행중·PR 대기 레인과 Worker 탭을 실제로
  확인한다(UI 변경은 스크린샷으로 검증한다).

## 10. 구현 unit 후보

하나의 델타로 봉인 가능하다. 나누어 진행한다면 경계는 다음과 같다(권고이며
구속하지 않는다).

- 재료: `server/ws/worker-handlers.js` 적재 두 곳 + Monitor 투영(§4).
- 표시: Worker 파생·부착(§5) + 렌더러(§6) + 스펙 정정(§7).
