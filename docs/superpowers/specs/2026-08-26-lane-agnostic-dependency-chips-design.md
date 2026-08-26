---
scope:
  - server/ws/worker-handlers.js
  - server/ws/worker-handlers.bead-scope.test.js
  - server/worker/runnable-cache.js
  - app/protocol.md
  - app/views/monitor/lanes.js
  - app/views/monitor/lanes.test.js
  - app/views/worker/queue-blockers.js
  - app/views/worker/queue-blockers.test.js
  - app/views/worker/queue-overlaps.js
  - app/views/worker/queue-overlaps.test.js
  - app/views/worker/index.js
  - app/views/worker/index.test.js
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
줄(슬롯 4), 칩의 문구·글리프·색, 칩 열 순서(`⛓ 선행` → `⧉ 겹침` → `scope 없음`)는
UI-251y·UI-qm12가 정한 그대로다.

기존 칩의 클릭 동작도 바꾸지 않는다. 다만 Worker 탭에는 blocked 칩 자체가 없었고
그 클릭이 여는 의존성 패널도 없으므로, **Worker에 새로 서는 blocked 칩의 클릭
동작은 이 스펙이 처음 정해야 한다** — §5.3a가 정한다.

### 2.1 실행중·PR 대기의 blocked가 뜻하는 것

대기 레인에서 blocked는 “출발하지 못한다”다. 이미 출발한 레인에서 같은 칩은
“선행이 아직 닫히지 않았다”를 말한다. 두 문장은 다르지만 **사용자가 확인해야
할 것은 같다** — 이 이슈와 저 이슈의 순서다. 실행중에서는 워커 admission을
우회한 세션 착수나 출발 뒤 추가된 간선을 드러내고, PR 대기에서는 선행이 닫히기
전에 머지하려는 상황을 드러낸다. 둘 다 사용자가 보고 판단할 사실이므로 칩이
서는 편이 맞다.

칩은 판정에 입력되지 않는다. 워커 admission도 머지 게이트도 이 표시를 읽지
않으며, 이 스펙은 그 판정을 하나도 바꾸지 않는다.

## 3. 서버 — 적재 범위 (`server/ws/worker-handlers.js`)

### 3.1 `bead_scope`에 PR 대기와 세션 항목 추가

- `beadScopeFor`의 `laneMemberIds(queue, false)`를 `laneMemberIds(queue, true)`로
  바꾼다. `include_pr_wait` 파라미터는 이미 있고 `bead_workflow`
  (`beadWorkflowFor`)가 `true`로 쓴다 — 두 장식의 대상 집합이 같아진다.
  `laneMemberIds`의 attempts 순회는 §3.2와 같은 이유로 실행중 판정을
  `activeAttemptStates`에 맞춘다: 지금의 `status === 'running'` 필터는
  일시정지된 타일을 빼고, 그러면 그 타일에서만 겹침 재료가 사라진다.
- **세션이 잡은 실행중 bead(`session_active`)도 재료를 받아야 한다.** 이 항목은
  attempt가 없어 `laneMemberIds`의 attempts 순회에 걸리지 않고, 큐에도 없을 수
  있다. `SessionActiveItem`은 `spec_id`를 이미 싣지만 `scope`도 `plan_path`도
  싣지 않으므로, 렌더러 억제(§6)만 없애면 세션 타일에는 겹침도 `scope 없음`도
  끝내 서지 않는다 — 사용자 결정 3이 그 타일에서만 무효가 된다.
  `server/worker/runnable-cache.js`의 `SessionActiveItem`에 `RunnableItem`이
  UI-qm12 §4.4로 받은 것과 **같은 모양**의 optional `scope: string[]`와
  `plan_path: string|null`을 additive로 더하고, 그 항목의 scope도 같은 artifact
  집합(`[spec_id, plan_path?]`)을 같은 pinned base에서 읽는다. 원천이 하나여야
  같은 bead가 세션 착수 → 큐 적재로 옮겨갈 때 겹침 판정이 달라지지 않는다.
  `beadScopeFor`는 runnable 행을 훑는 지금의 루프와 같은 방식으로
  `session_active` 행도 훑어 아직 `out`에 없는 bead만 채운다.
- 값의 의미(`{scope, artifacts}` / `{scope: []}` / `null` / 항목 없음)와
  partial·fail-quiet·비영속 계약은 UI-qm12 §4.3 그대로다. 바뀌는 것은 대상
  집합뿐이다. `app/protocol.md`의 `bead_scope` 단락에 대상 집합 변경을 반영한다.
- 비용: 레포당 (PR 대기 + 세션 항목) bead 수만큼 `scope_cache.peek` 조회가 늘고,
  캐시 miss일 때만 `git cat-file` 1~2회가 예약된다. `resolveBase`는 이미 20초
  캐시이고 scope 캐시는 5분 주기다. 한 스냅샷 푸시가 늘리는 동기 작업은 Map
  조회뿐이다.

### 3.2 `bead_blocked_by`에 실행중 attempt bead 추가

- `beadDecorationFor`의 `decorated_lanes`는 `queue` · `pr_wait` · `done` ·
  `serial_lanes`를 이미 커버한다. **PR 대기 blocked는 서버 변경 없이도 된다.**
- 실행중은 대개 큐 항목이 남아 커버되지만, 세션이 직접 잡아 큐에 없는 bead는
  빠진다. `beadDecorationFor`의 id 수집에 실행중 레인 bead를 더하되, 판정은
  **클라이언트가 실행중 레인을 그리는 것과 같은 판정**인
  `app/utils/active-attempts.js`의 `activeAttemptStates`를 쓴다. 서버는 이미 그
  모듈의 `isImplementationAttempt`를 import하므로 새 의존이 아니다.
  `laneMemberIds`가 쓰는 `status === 'running'` 필터를 그대로 베끼면 안 된다 —
  그 필터는 `paused`와 아직 처분되지 않은 `failed` attempt를 빼는데, 클라이언트는
  그 둘도 실행중 타일로 그린다. 그러면 일시정지된 타일에서만 blocked 칩이 조용히
  사라진다. 같은 이유로 `laneMemberIds`(§3.1의 `bead_scope` 대상)도 같은 판정을
  쓰도록 맞춘다.
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

### 4.4 겹침 비교 집합에 PR 대기 추가 — bead ID로 한 번만 비교한다

`applyScopeOverlaps`의 순회 대상을 `[...model.running, ...model.queue,
...model.runnable]`에서 `model.pr_wait`을 포함한 넷으로 넓힌다. `scope_state`
부착도 같은 순회에서 이뤄지므로 PR 대기 카드가 `scope 없음` 재료를 함께 받는다.
레포별 분리·양쪽 모두 선언한 쌍만 비교·레포 간 비교 없음은 그대로다.

**여기서 비교 단위를 카드에서 bead로 바꿔야 한다.** 지금 함수는 카드 객체를
그대로 pairwise로 비교하는데, 한 bead가 두 카드로 동시에 서는 조합이 이미
존재한다 — head review·repair 세션 타일은 `non_occupying`이라 `claimed`에 들지
않고, 그 bead는 PR 대기 레인에 점유자로 그대로 남는다(§4.3). PR 대기를 비교
집합에 넣는 순간 그 두 카드가 같은 scope를 들고 만나므로, **자기 자신과 겹친다는
칩**이 서고 제3의 카드에는 같은 상대가 두 번 적힌다.

- 레포별 집합을 만들 때 bead ID로 먼저 dedupe한다: 한 ID당 항목 하나만 비교에
  넣는다.
- pairwise 결과는 그 ID의 **모든 표시 카드**에 복사한다. 그래야 실행중 타일과
  PR 대기 행이 같은 겹침 사실을 보인다.
- `scope_state`도 같은 규칙으로 ID 단위 판정 후 모든 카드에 복사한다.

`pushChip`의 위치 라벨은 `chainRowLocationLabel`이 만들고, 그 소스인
`buildBlockerLocationMap`은 `pr_wait`을 이미 담는다 — PR 대기 상대는 `PR 대기`로
읽힌다. 한 bead가 두 레인에 있으면 그 맵은 `running`을 나중에 덮어쓰는 순서에
따라 하나를 고르는데, 위치 라벨은 어느 쪽이든 사용자가 그 bead를 찾을 수 있는
값이므로 이 스펙은 그 선택을 바꾸지 않는다.

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

- `deriveWorkerBlockers(blockers_by_bead, lane_members)` 하나를 내보낸다.
  `lane_members`는 겹침 파생이 쓰는 것과 **같은 목록**이다(§5.2) — blocked와
  겹침이 같은 화면 사실에서 위치를 읽어야 두 칩의 위치 라벨이 갈리지 않는다.
- **입력은 `bead_blocked_by` 하나가 아니다.** Worker 탭에서 blocker id가 오는
  경로는 셋이고, 레인마다 다르다.
  - 큐·직렬 레인·PR 대기·완료 행: 스냅샷 장식 `bead_blocked_by`.
  - 후보 행: 후보는 큐에 없어 그 장식에 들어오지 않는다. 원천은 구독 이슈의
    `blocked_info.blockers`이고, 그것이 통째로 없는 구서버에서는 임베드된
    `blocks` 간선(`depends_on_id`)이다 — `blockedReason`이 이미 쓰는 바로 그
    사다리다.
  - 세션이 잡은 실행중 타일: `session_active` entry의 `blocked_by`.

  이 셋을 호출부에서 하나의 `Map<bead_id, string[]>`로 정규화해 넘긴다. 한
  원천만 읽으면 후보와 세션 타일에서 칩이 조용히 사라지고, 그것은 이 스펙이
  없애려는 바로 그 증상이다. 같은 bead가 둘 이상에서 오면 큐 장식이 이긴다 —
  서버가 스냅샷마다 다시 계산하는 값이다.
- 위치 라벨은 그 목록의 `location_label`을 그대로 쓴다(`실행중` · `#n` ·
  `s1 #n` · `후보` · `PR 대기`). 목록에 없는 blocker는 `미적재`다.
- **위치 라벨은 두 탭에서 같은 값이 되지 않는다.** Worker 탭은 한
  워크스페이스만 보므로, Monitor가 다른 레포의 레인 위치나 `외부` ·
  `위치 미확인`으로 구분해 내는 blocker를 Worker는 전부 `미적재`로 접는다. 이
  스펙은 그 차이를 없애지 않는다 — 없애려면 Worker 채널이 다른 워크스페이스의
  레인 상태를 실어 와야 하고, 그것은 이 스펙이 승인받은 범위 밖이다. 두 탭이
  같아야 하는 것은 **칩의 라벨과 툴팁 문장 틀**(`⛓ blocked: <id>`,
  `이 이슈는 <id>가 close될 때까지 출발하지 않는다 (<위치>)`)과 `foreign`
  판정이고, 괄호 안 위치는 그 탭이 볼 수 있는 만큼이다. §9 검증은 이 경계로
  판정한다.
- 타 레포 판정은 두 탭이 공유하는 `app/utils/blocker-scope.js`
  `isForeignBlocker(owner_id, blocker_id)`를 그대로 쓴다. prefix 기반 순수
  함수라 `workspaces_state` 없이 판정된다.
- 칩 모양은 Monitor의 `predecessorChip`과 같다: `label`은
  `⛓ blocked: <id>`, `title`은 `이 이슈는 <id>가 close될 때까지 출발하지 않는다
  (<위치>)`, 타 레포면 `foreign: true`. 두 탭이 같은 문자열을 내도록 규칙을
  복제하지 않고, `predecessorChip`을 `app/views/monitor/lanes.js`에서
  `queue-blockers.js`로 옮겨 두 투영이 같은 함수를 부른다. Monitor는 그
  함수를 import해 쓴다.
- 세 원천이 모두 비어 있으면 빈 결과다(fail-quiet). 각 원천의 부재는 독립적으로
  읽는다 — `bead_blocked_by`가 없는 구서버 스냅샷에서도 후보 행은 여전히
  `blocked_info`로 칩을 얻는다.

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

- `LaneMember.kind`에 `'pr_wait'`을 추가하고, PR 대기 행은
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

### 5.3a Worker의 blocked 칩은 표시 전용이다

Monitor에서 blocked 칩 클릭은 **그 행의 의존성 패널**을 연다
(`worker-dep__open` → `toggleDepPanel`). Worker 탭에는 그 패널이 없고, 패널
도입은 이 스펙의 비목표다. 그러면 Worker에 같은 마크업을 그대로 내보낼 때 누를
수 있지만 아무 일도 하지 않는 버튼이 남고, 클릭이 카드 기본 동작으로 흘러 사용자가
예상하지 못한 결과를 얻는다.

Worker의 blocked 칩은 **버튼이 아니라 표시 전용**으로 그린다. Worker 탭은 이미
그 관용을 쓴다 — `fromChipTemplate`의 `↩ from` 칩도 Monitor에만 클릭 핸들러가
있고 Worker에서는 표시로만 선다. 라벨·툴팁·색·자리는 Monitor와 같고, 다른 것은
누를 수 있는지 하나뿐이다.

이것은 §2 결정 1의 “문구·색을 바꾸지 않는다”를 어기지 않는다. 그 결정은 같은
사실을 레인마다 다른 **문구**로 쓰지 말라는 것이고, 여기서 갈리는 것은 그 탭에
실제로 존재하는 동작이다. 없는 패널을 여는 시늉을 하는 버튼이 오히려 사실과
어긋난다.

### 5.4 대기 행 뱃지 제거

`⏸ <blockers> 완료 대기 (blocks)` 뱃지를 만드는 자리를 없앤다. 같은 조건에
붙던 `✳ serial 권장 …` 뱃지는 `wait_badges`를 계속 쓰므로 배열 자체는 남는다.

뱃지는 “서버 admission이 이 행을 `not_ready`로 스킵했다”와 “blocker가 누구다”를
한 문장에 묶고 있었다. 칩은 뒤쪽만 말하지만, **앞쪽은 같은 카드의 `reason`이
이미 말한다** — `admissionBadge`가 `⛔ not_ready (…)`를 그 자리에 그리고, 두 탭이
같은 규칙을 쓴다. 그래서 뱃지를 지워도 잃는 사실이 없고, 칩에 레인별 문장을
덧붙일 이유도 없다. 두 탭의 blocked 칩은 §5.1이 정한 경계 안에서 같은 라벨과
같은 문장 틀을 쓴다.

## 6. 렌더러 (`app/views/worker/lanes.js`)

- `dependencyChipsTemplate`의 `scope_missing` 계산에서 `options.lane !==
  'running'` 조건을 없앤다.
- `options.lane`은 이 억제가 유일한 소비자이므로 제거하고, 호출 네 곳(`miniRow`
  두 변형 · `candidateCard` · `runningTile`)에서 인자를 뺀다.
- §5.3a가 요구하는 표시 전용 변형은 **투영이 실어 주는 값**으로 정한다:
  `DependencyChips`에 `interactive?: boolean`(생략 = `true`)을 더하고 Worker
  투영만 `false`로 채운다. `true`면 지금의
  `<button class="worker-dep__label worker-dep__open">`, `false`면 같은 자리에
  같은 라벨·툴팁·색을 가진 표시 전용 요소다. 렌더러 인자로 두지 않는 이유는
  `candidateCard`·`miniRow`를 두 탭이 함께 부르기 때문이다 — 호출 인자로 가르면
  같은 템플릿을 탭마다 다르게 부르는 자리가 새로 생기고, 그것이 이 스펙이
  없애려는 종류의 갈림이다.
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
    “`beadWorkflowFor`와 같은 집합 + 세션 항목”으로 고치고, 정정 근거로 이
    스펙을 가리킨다.
  - §4.5 비용 문장의 “레포당 (대기 + 실행 중 + 실행가능) bead 수”를 PR 대기와
    세션 항목을 세는 값으로 고친다.
  - §5.2 비교 집합의 “PR 대기 제외”를 “PR 대기 포함”으로 고치고, §4.4의 bead
    ID dedupe 규칙을 함께 적는다.
  - §5.3 `scope 없음` 칩의 “실행 중 행에는 붙이지 않는다”를 걷어낸다.
  - §7 테스트 계획의 “PR 대기 제외” 문장도 같은 방향으로 고친다. 정정하지 않으면
    그 스펙의 검증 목록이 새 대상 집합을 반증하는 셈이 된다.
- `docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md` §4
  - 레인별 표시 차이를 적어 둔 문단(“후보·대기는 `⛓ blocked` + `⧉ 겹침`,
    실행중은 `⧉ 겹침`만, PR 대기는 없음”)을 레인 무관 통일로 고치고 이 스펙을
    가리킨다. §4의 제목 “투영은 바꾸지 않는다”는 그 스펙이 자기 범위에서
    투영을 건드리지 않았다는 사실이므로 유지하되, 표시 규칙 문장만 현재 상태로
    갱신한다.

`AGENTS.md`는 슬롯 표와 줄 순서만 가리키고 있고 이 스펙은 그 배치를 바꾸지
않으므로 손대지 않는다.

## 8. 비목표

- 칩의 문구 · 글리프 · 색 · 열 순서. `⛓ blocked: <id>` 라벨은 그대로다.
- **이미 있던** 칩의 클릭 동작. Monitor의 blocked 칩은 지금처럼 의존성 패널을
  열고, 겹침 칩은 지금처럼 팝오버를 연다. Worker에 새로 서는 blocked 칩의
  동작만 §5.3a가 정한다.
- 슬롯 배정. 세 칩 모두 슬롯 4에 남는다.
- 후속(successor) 칩 부활. 카드는 “내가 막혔나” 하나만 말한다.
- 완료 레인(2줄·3줄 행). UI-251y §6이 별도 문법으로 두기로 한 자리다.
- 의존성 패널 · 드래그 계약 · 워커 admission · 머지 게이트 판정.
- Monitor의 연결 레인(`chain_lanes`) 행. 겹침 복사 규칙(UI-qm12 §5.2)은 지금
  그대로 두고, 이 스펙은 레인 소속만 넓힌다.

## 9. 검증

- `npm run tsc` · `npm test` · `npm run lint` · `npm run prettier:write`
- `npm run build` 후 `app/main.bundle.js`·`.map` 포함
- 서버 단위 테스트 (`server/ws/worker-handlers.bead-scope.test.js` 및
  `server/worker/runnable-cache.js` 소유 테스트)
  - `decorateQueue`가 PR 대기 bead의 `bead_scope` 항목을 싣는다.
  - `session_active` 항목이 `scope`·`plan_path`를 받고, 같은 bead가 세션 착수와
    큐 적재 두 상태에서 같은 scope로 판정된다.
  - `bead_blocked_by`가 큐에 없는 실행중 attempt bead의 blocker를 싣고,
    `paused` attempt만 있는 bead도 함께 싣는다.
- Monitor 투영 테스트 (`app/views/monitor/lanes.test.js`)
  - 실행중 item과 PR 대기 item이 `dependency_chips.predecessors`를 받는다.
  - PR 대기 item이 겹침 칩과 `scope_state`를 받고, 상대 카드의 위치 라벨이
    `PR 대기`다.
  - 한 bead가 head review 타일과 PR 대기 행으로 동시에 설 때, 그 bead가 자기
    자신을 겹침 상대로 갖지 않고 제3의 카드가 그 상대를 한 번만 적는다.
  - `bead_blocked_by`에 키가 없는 실행중 item은 칩을 받지 않는다(fail-quiet).
- Worker 투영·렌더러 테스트 (`app/views/worker/index.test.js` ·
  `queue-blockers.test.js` · `queue-overlaps.test.js` · `lanes.test.js` ·
  `running-grid.test.js`)
  - `deriveWorkerBlockers`가 세 원천(큐 장식 · 후보 `blocked_info.blockers` ·
    `session_active.blocked_by`)에서 각각 칩을 만든다.
  - 후보 행과 세션 실행중 타일에 blocked 칩이 선다.
  - 같은 blocker에 대해 Worker 칩과 Monitor 칩의 `label`과 툴팁 문장 틀,
    `foreign` 판정이 같다. 괄호 안 위치 값은 비교하지 않는다 — Worker가 볼 수
    없는 위치는 `미적재`로 접히고, 그 경계는 §5.1이 정한다.
  - PR 대기 행과 실행중 타일이 세 칩을 모두 받는다.
  - Worker의 blocked 칩이 표시 전용이고 `worker-dep__open` 버튼을 그리지 않으며,
    Monitor의 같은 칩은 여전히 버튼이다.
  - `workerPlacementPlan`이 PR 대기 상대에게 `ops`가 아닌 문장을 낸다.
  - 대기 행에 `⏸ … 완료 대기 (blocks)` 뱃지가 더 이상 없고, 같은 blocker가
    blocked 칩으로 서며, `⛔ not_ready (…)` reason은 그대로 남는다.
  - 실행중 타일과 PR 대기 행에 `scope 없음` 칩이 그려진다.
  - 겹침 없이 blocked만 있는 실행중 타일이 오버레이를 받아 칩을 그린다.
- 배치 후 공유 서버에서 Monitor 실행중·PR 대기 레인과 Worker 탭을 실제로
  확인한다(UI 변경은 스크린샷으로 검증한다).

## 10. 구현 unit 후보

하나의 델타로 봉인 가능하다. 나누어 진행한다면 경계는 다음과 같다(권고이며
구속하지 않는다).

- 재료: 서버 적재(§3 — `worker-handlers.js` · `runnable-cache.js` ·
  `app/protocol.md`) + Monitor 투영(§4).
- 표시: Worker 파생·부착(§5) + 렌더러(§6) + 계약 스펙 정정(§7).

재료 unit만 먼저 착지해도 화면은 지금과 같다 — 새 재료를 읽는 소비자가 아직
없기 때문이다. 두 unit을 나눌 경우 그 중간 상태가 안전하다는 뜻이지, 나누라는
뜻은 아니다.
