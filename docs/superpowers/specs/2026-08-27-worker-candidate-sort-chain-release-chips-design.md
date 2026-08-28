---
scope:
  - server/list-adapters.js
  - server/workspace-snapshot-coordinator.js
  - server/workspace-snapshot-runtime.js
  - server/worker/foreign-blocker-status.js
  - server/subscriptions.js
  - server/ws/refresh.js
  - app/views/worker/index.js
  - app/views/worker/lanes.js
  - app/views/worker/queue-blockers.js
  - app/views/worker/candidate-sort.js
  - app/data/sort.js
  - app/styles.css
---

# Worker 후보 레인 — 정렬 체인 · 해제/후속 칩 · 후보 드래그 제거 (UI-d13v)

## 1. 문제

선행 이슈(다른 레포 포함)가 close되면 그 뒤를 잇는 이슈를 바로 굴려야 하는데,
Worker 탭 후보 레인에서는 그것을 알아볼 수 없다.

- 후보 레인은 Ready+Blocked를 합쳐 그리고(`app/views/worker/index.js`
  `buildModel`), Ready는 `bd ready --explain`의 `ready`에서 온다. 그 결과에는
  **닫힌 blocker가 없다** — `blocked_info.blockers`는 열린 blocker id 문자열뿐이다
  (`server/list-adapters.js` `attachBlockedInfo`·`extractBlockerIds`). 그래서
  `⛓ blocked: X` 칩은 X가 닫히는 순간 사라지고, "방금 풀렸다"는 사실이 화면에서
  소멸한다.
- 이 이슈를 기다리는 후속 이슈 수(역방향 `blocks` edge)는 서버·클라이언트 어디에도
  없다.
- 정렬은 `spec 우선 / Board 순서 / 최신 생성순 / 최신 수정순` 4개 모드뿐이라
  (UI-raqh §2) priority·의존 구조로 순서를 만들 수 없다.
- 후보→후보 드래그는 "화면 순서 = Board rank"라는 전제 위에 있다. 정렬 축이
  늘어나면 그 전제가 깨지고, 사용자는 Board 탭을 더 쓰지 않는다.

## 2. 확정 결정

1. 정렬은 **원자 키 + 최대 3단 체인**이다. 기존 4모드는 프리셋으로 흡수하고
   `Board 순서`는 폐기한다.
2. 카드에 `🔓 해제: X`와 `→ 후속 n` 칩을 단다. 정렬 키가 카드에서 보여야 순서의
   이유를 읽을 수 있다.
3. 후보 레인은 드래그 소스도 드롭 대상도 아니다. 드래그는 대기·직렬 레인에만
   남는다. 대기→후보 되돌리기는 대기 행의 `✕` 버튼이 대신한다.
4. 서버는 후보 이슈 객체에 `release_info`·`dependents_info`를 additive·partial로
   싣는다. 같은 레포는 스냅샷에서 계산하고, foreign은 기존 캐시를 넓힌다. 없는
   키는 "모름"이며 클라이언트는 칩 생략·정렬 맨 뒤로 읽는다(fail-quiet).
5. ~~Blocked 이슈는 체인과 무관하게 항상 맨 아래 그룹이다(관측용, 현행 유지).~~
   **UI-8ham에서 철회**: 순서는 체인만이 정한다. blocked인지는 `⛓ blocked` 칩이
   말하고, 실행 자격은 `queue_placeable`과 서버 admission이 지키므로 순서가 그
   사실을 두 번 표시할 이유가 없었다.
   **UI-q1y7에서 정정**: 체인 정렬 **뒤에** 의존 인접화 패스가 한 번 돌아 후행을
   자기 선행 바로 뒤로 옮긴다. blocked라는 *사실*은 여전히 순서에 손대지 않고,
   순서를 움직이는 것은 "그 선행이 같은 후보 레인에 있다"는 사실뿐이다 — 맨 아래
   고정으로 되돌아간 것이 아니다.

## 3. 서버

### 3.1 재료가 이미 있는 곳

- 스냅샷 `all`은 `bd list --json --tree=false --all --limit 0`이라 **닫힌 이슈와
  `closed_at`을 포함**하고, embedded 모드에서 각 이슈는
  `dependencies: [{ issue_id, depends_on_id, type }]`(나가는 방향)를 싣는다
  (`server/workspace-snapshot-coordinator.js`, `workspace-snapshot-runtime.test.js`
  "embedded-dependencies"). legacy 모드는 `snapshot.dependency_edges`에 같은
  edge가 있다.
- foreign blocker의 status는 `server/worker/foreign-blocker-status.js`
  `foreignBlockerStatusFor(bead_id, owner_root, requester_root)`가 `bd show`로
  읽어 캐시한다(UI-u6zf §3). 지금은 `status`만 저장한다.

### 3.2 스냅샷 파생 인덱스 (`server/workspace-snapshot-coordinator.js`)

스냅샷 생성 시 한 번 훑어 두 인덱스를 스냅샷에 additive로 싣는다.

```js
snapshot.blocks_out: Map<string, string[]>   // issue → 그 issue가 의존하는 blocker ids (type==='blocks')
snapshot.blocks_in:  Map<string, string[]>   // issue → 그 issue를 blocks로 기다리는 issue ids
```

- edge 원천은 embedded `dependencies`, legacy는 `dependency_edges`. 두 모드의
  edge 모양은 같다(`{issue_id, depends_on_id, type}`).
- `blocks_in`에는 스냅샷 안의 이슈만 들어간다. 다른 rig의 이슈가 이 이슈를
  기다리는 edge는 그 rig의 DB에 있으므로 여기서는 보이지 않는다(§3.5).
- 비용은 스냅샷 생성당 edge 수에 선형 한 번이다. 투영마다 다시 훑지 않는다.

### 3.3 `release_info` (`server/list-adapters.js` `projectReadyIssues` · `projectBlockedIssues`)

Ready·Blocked 투영의 각 이슈에 붙인다. `attachBlockedInfo`가 `blocked_info`를
붙이는 것과 같은 자리·같은 관용이다.

```js
release_info: {
  released_by: [{ id, closed_at, foreign, root_dir? }],  // closed_at desc
  last_released_at: number                                // released_by[0].closed_at
}
```

- 대상 edge: `blocks_out[issue.id]`.
- 같은 레포 id(prefix가 이 워크스페이스 `issue_prefix`와 같음): `id_index`에서
  `status === 'closed'`이고 `closed_at`이 숫자인 것만 `released_by`에 넣는다.
  열린 것은 `blocked_info`의 몫이다.
- foreign id: `foreignBlockerStatusFor`의 캐시 항목에 `closed_at`을 추가 저장한다
  (§3.4). 캐시가 `closed`이고 `closed_at`이 있으면 `foreign: true`로 넣고, 캐시
  미도착·`open`·`closed_at` 없음이면 넣지 않는다 — "모름"이지 "해제 아님"이 아니다.
  foreign 항목에는 owner workspace를 알 때만 `root_dir`을 싣는다 — 값은
  `applyForeignBlockerCleanup`이 `blocker_workspaces`에 쓰는 것과 같은
  prefix→root 맵(`cachedIssuePrefixFor`·`visibleWorkspaceRoots`)에서 온다.
  `blocker_workspaces`는 **살아남은(열린)** foreign blocker만 싣기 때문에 닫힌
  blocker의 owner를 거기서 읽을 수 없어, 항목 안에 직접 싣는다. owner를 모르면
  키가 없고 클라이언트는 그 칩을 `openable`하지 않은 채로 그린다.
- `released_by`가 비면 키 자체를 싣지 않는다.

### 3.4 foreign 캐시에 `closed_at` 추가 (`server/worker/foreign-blocker-status.js`)

캐시 항목 `{status, expires_at, requesters}`에 `closed_at: number|null`을 더한다.
`bd show` 응답의 `closed_at`을 스냅샷과 같은 규칙(`normalizeIssue`의 숫자
정규화)으로 읽는다. `foreignBlockerStatusFor`는 시그니처를 바꾸지 않고, 새 함수
`foreignBlockerClosedAtFor(bead_id, owner_root, requester_root)`가 캐시의
`closed_at`을 돌려준다(캐시 miss·open이면 `null`, 조회 예약은
`foreignBlockerStatusFor`와 같은 경로를 탄다). 정리(prune)·wake-up 의미는
바꾸지 않는다.

### 3.5 `dependents_info`

```js
dependents_info: { count: number, ids: string[], root_dirs?: Record<string, string> }
// 열린 후속만, ids는 사전순 전량
```

**정정(UI-8x90).** `ids`의 최대 5개 상한(`DEPENDENTS_ID_LIMIT`)은 없다 — 후속
칩이 ID별로 서게 되면서 잘린 목록은 카드에 없는 칩을 만든다. 타 레포 후속의
owner를 싣는 `root_dirs`가 더해졌고(같은 레포 id는 항목이 없다,
`release_info.released_by[].root_dir`과 같은 의미), §3.7의 `decoration_rev`
지문도 정렬된 `root_dirs` 항목을 함께 읽는다 — 후속 ID는 같은데 소유 레포만
바뀐 경우에도 구독이 upsert돼야 칩의 `openable`이 갱신된다
(`2026-08-28-chip-grammar-unify-design.md` §6.1).

- 같은 레포: `blocks_in[issue.id]` 중 `id_index`에서 `status !== 'closed'`인 것.
- 다른 워크스페이스: `server/workspace-snapshot-runtime.js`에 동기
  `peekWorkspaceSnapshot(root_dir)`를 추가한다 — 그 root의 coordinator가 마지막으로
  성공한 스냅샷을 돌려주고 없으면 `null`. `visibleWorkspaceRoots()`의 다른 root마다
  peek해서 그 스냅샷의 `blocks_in[issue.id]`를 같은 규칙으로 더한다. peek이
  `null`인 root의 후속은 세지 않고, 그 사실을 따로 표시하지 않는다. **새 스냅샷
  요청을 유발하지 않는다** — 다른 root의 갱신 주기는 그 root의 것이다.
- `count === 0`이면 키를 싣지 않는다. 따라서 소비자는 **0과 미상을 구분할 수
  없다** — 둘 다 "키 없음"이다(§4.1 없음 처리).

### 3.6 바꾸지 않는 것

- `bd ready` admission·`blocked_info`·`bead_blocked_by`·`blocker_workspaces`.
  닫힌 blocker를 다시 붙이는 것은 표시 재료이지 판정이 아니다.
- Board 탭은 같은 `ready-issues`/`blocked-issues` 투영을 읽지만 새 키를 소비하지
  않는다. `app/protocol.md`에 두 키를 partial 장식으로 기록한다.

### 3.7 갱신 전파 — 장식이 바뀌면 구독도 바뀌어야 한다

두 장식은 **대상 이슈 자신의** `updated_at`/`closed_at`이 움직이지 않아도
달라진다(선행이 닫힘, 후속이 생기거나 닫힘, foreign 조회 도착). 그런데 리스트
구독의 delta 판정(`server/subscriptions.js` `computeDelta`·`toItemsMap`)은
`updated_at`·`closed_at`·목록 포함 여부만 비교하므로, 그대로 두면 서버가 새
장식을 계산해도 클라이언트에 upsert가 가지 않는다(`server/ws/refresh.js`
`refreshAndPublish`는 `delta.added/updated`만 보낸다).

- `list-adapters`의 Ready/Blocked 투영은 각 이슈에 `decoration_rev: string`을
  붙인다 — `release_info`·`dependents_info`를 정렬된 키 순서로 직렬화한 안정
  문자열(둘 다 없으면 `''`). 표시용이 아니라 delta 지문이다.
- `subscriptions.js`의 `ItemMeta`에 `decoration_rev`를 더하고 `toItemsMap`이
  `it.decoration_rev`(없으면 `''`)를 읽으며, `computeDelta`는 세 값 중 하나라도
  다르면 `updated`로 친다. 다른 리스트 타입은 키가 없어 `''`로 고정이므로 판정이
  바뀌지 않는다.
- foreign 조회 도착: `server/ws/refresh.js`가 `onForeignBlockerResolved`를
  구독해, 리스너가 받는 요청자 root마다 `scheduleListRefresh('foreign-blocker',
  root)`를 부른다. 지금은 Worker 큐·Monitor 채널만 다시 그리고 리스트 구독은
  듣지 않는다(UI-u6zf §3.3).
- 다른 워크스페이스의 스냅샷 변화로 `dependents_info`가 바뀌는 경우는 이
  워크스페이스의 **다음 refresh(watcher·poll·mutation)** 때 `decoration_rev`
  차이로 잡힌다. 그 순간을 앞당기려고 다른 root의 스냅샷 갱신을 이 root의 리스트
  refresh로 fanout하지는 않는다 — 보이는 워크스페이스 수만큼 refresh가 곱해지고,
  후속 수는 그 지연을 감당할 수 있는 재료다.

## 4. 클라이언트 — 정렬 체인

### 4.1 새 모듈 `app/views/worker/candidate-sort.js`

`index.js`의 `CANDIDATE_SORT_*`·`applyCandidateSort`·`loadCandidateSort`·
`saveCandidateSort`·`normalizeCandidateSort`를 이 모듈로 옮기고 체인으로 바꾼다.

```js
/** @typedef {'priority'|'dependents'|'released'|'spec'|'created'|'updated'} SortKey */
/** @typedef {{ key: SortKey, dir: 'asc'|'desc' }} SortStep */
/** @typedef {{ preset: PresetId } | { chain: SortStep[] }} CandidateSortState */
```

| 키 | 비교 값 | 기본 방향 | 없음 처리 |
|---|---|---|---|
| `priority` | `priority` | asc (0 위) | 맨 뒤 |
| `dependents` | `dependents_info.count` | desc | 맨 뒤 (0과 미상 구분 불가, §3.5) |
| `released` | `release_info.last_released_at` | desc | 맨 뒤 |
| `spec` | `hasSpec` | desc (있음 위) | 없음 |
| `created` | `created_at` | asc (오래 기다린 것 위) | 맨 뒤 |
| `updated` | `updated_at` | desc | 맨 뒤 |

- 방향은 키마다 기본값을 두되 step마다 뒤집을 수 있다. "없음 처리"는 방향과
  무관하게 그 값이다 — 비교기는 방향을 적용하기 **전에** 재료 없는 행을 뒤로
  보내므로, 방향을 뒤집어도 재료 없는 행이 위로 올라오지 않는다. `dependents`의
  "맨 뒤"는 `dependents asc`에서도 후속이 있는 행(1 이상)이 먼저 오고 키 없는
  행이 뒤에 온다는 뜻이다.
- 체인 길이 1~3. 마지막에 암묵 tiebreak `created asc → id asc`가 붙는다.
- `applyCandidateSort(issues, state)`는 `cmpChain(steps)`로만 정렬한다
  (UI-8ham). Blocked 이슈를 맨 아래로 내리던 안정 분할과 `blocked_ids` 인자는
  없앴다 — `blocked_ids`는 호출 측에 행 사유(`⛓ blocked` 칩) 계산용으로만
  남는다.
  **UI-q1y7에서 정정**: `applyCandidateSort`는 `cmpChain(steps)` 정렬 결과 위에
  비공개 `groupByDependency`를 한 번 더 돌린다. 안정 분할과 `blocked_ids` 인자가
  없다는 것은 그대로이며(선행 id는 행이 스스로 싣는 `blocked_info`/`dependencies`
  에서 `blockerIdsOf`가 읽는다), 선행은 체인이 준 자리를 지킨다.
- `cmpChain`은 `app/data/sort.js`에 두고, 기존 `cmpCreatedDescThenPriority`
  등과 같은 파일에서 테스트한다. `cmpEffectiveRank`는 Board 탭이 계속 쓰므로
  남긴다.

### 4.2 프리셋

| id | 라벨 | 체인 |
|---|---|---|
| `spec` (기본) | `spec 우선` | `[spec desc, created asc]` |
| `bottleneck` | `병목 우선` | `[priority asc, dependents desc, released desc]` |
| `created` | `최신 생성` | `[created desc, priority asc]` |
| `updated` | `최신 수정` | `[updated desc]` |

- `spec 우선`이 기본인 이유는 지금과 같다(UI-raqh). 그 체인이 예전과 다른 점은
  그룹 안 순서가 Board rank가 아니라 `created asc`라는 것뿐이다.
- `최신 생성`의 체인은 지금의 `cmpCreatedDescThenPriority`와 같다.

### 4.3 저장과 마이그레이션

- `localStorage['bdui.worker.candidate_sort']`에 `CandidateSortState`를 JSON으로
  저장한다.
- 읽기: JSON 파싱 실패 시 옛 문자열 값으로 해석한다 — `spec`·`created`·
  `updated`는 같은 id의 프리셋, `board`와 미지 값은 기본 프리셋. 파싱은 됐지만
  `chain`의 step이 하나라도 미지 키/방향이면 기본 프리셋. 이 narrowing 함수 하나가
  복원과 변경 양쪽을 거친다(UI-raqh의 규칙 유지).
- 사용자 지정 체인이 어느 프리셋과 step 단위로 같으면 `{preset}`으로 저장한다.

### 4.4 편집 UI

- 헤더 `<select class="worker-sort">`는 프리셋 4개 + `사용자 지정…`.
- `사용자 지정…`을 고르거나 저장값이 `{chain}`이면 헤더 **아래 한 줄**
  `.worker-sort-chain`이 펼쳐진다: `<select>` 3개(1차 필수, 2·3차에 `없음` 옵션)와
  각 step 옆 방향 토글 버튼(`↑`/`↓`, `aria-label` "오름차순/내림차순"). 변경은
  즉시 적용·저장한다.
- 같은 키를 두 step에 고르면 뒤의 step이 `없음`으로 접힌다.
- 프리셋을 고르면 줄이 접힌다. 줄은 `paneTemplate`의 `header_control` 다음
  자식으로, 데스크톱·모바일이 같은 마크업을 쓴다(UI-5ksp: 모바일 전용 헤더 없음).
  CSS는 `.worker-sort`와 같은 크기 체계를 따르고 `@media` 분기를 두지 않는다.

## 5. 클라이언트 — 칩

### 5.1 슬롯 배정 (UI-251y §5.1 갱신)

슬롯 4 "지금 갈 수 있나"에 두 칩을 추가한다. 답하는 질문은 같은 슬롯의 것이다:
`⛓ blocked`가 "왜 못 가나"라면 `🔓 해제`는 "왜 이제 갈 수 있나", `→ 후속`은 "왜
먼저 가야 하나"다. 둘 다 사용자의 다음 행동(무엇을 먼저 굴릴지)을 바꾸므로
좌표(5)가 아니다. 줄 안 순서는 `⛓ blocked → 🔓 해제 → → 후속 → ⧉ 겹침 →
scope 없음 → 연결 레인`.

### 5.2 `DependencyChips` 확장 (`app/views/worker/lanes.js`)

```js
released?: ReleasedChip[]      // `🔓 해제: X`
dependents?: DependentsChip     // `→ 후속 n`
```

- `ReleasedChip = { id, label, title, foreign?, root_dir?, openable? }` —
  `DependencyChip`과 같은 모양이다. 렌더는 `worker-dep worker-dep--released`,
  foreign은 `worker-dep--foreign`을 함께 단다. `openable` 규칙은 blocked 칩과
  같다(UI-u6zf §5.1).
- `DependentsChip = { count, title }` — `worker-dep worker-dep--dependents`,
  클릭 없음.

**정정(UI-8x90).** 두 칩의 모양이 바뀌었다. `released`의 라벨은 `🔓 <ID>`,
`dependents`는 `{count,title}` 객체 하나가 아니라 **ID별 배열**
(`DependentsChip[]`)이고 라벨은 `→ <ID>`다. 관계명(`해제`·`후속`)은 툴팁 첫
줄로 갔고, 두 칩 모두 `⛓`와 같은 `.worker-dep__open` 버튼이라 클릭하면 그
이슈의 상세가 열린다(열 수 없는 칩만 `<span>`). 줄 안 순서와 슬롯은 UI-251y
§5.1의 4a/4b 정정이 소유한다 — `→`는 `⛓`와 함께 상단, `🔓`는 `⧉`·`scope 없음`과
함께 하단이다 (`2026-08-28-chip-grammar-unify-design.md` §3·§4.1·§4.2).

### 5.3 투영 (`app/views/worker/queue-blockers.js` · `index.js`)

- `queue-blockers.js`에 `releasedChip(owner_id, released, now)`와
  `dependentsChip(info)`를 추가한다. `predecessorChip`과 같은 파일에 두는 이유는
  같다 — 라벨·툴팁 문장 틀을 Monitor 투영이 나중에 같은 함수로 부를 수 있어야
  한다.
  - `releasedChip`: `label = "🔓 해제: <id>"`, `title = "<id>가 <시각>에 close되어
    이 이슈가 풀렸다"`(시각은 `formatTimestampLocal`). `foreign`은
    `isForeignBlocker`.
  - `dependentsChip`: `label = "→ 후속 <count>"`, `title = "이 이슈가 close되면
    풀리는 이슈: <ids…>"`(`ids`는 서버가 준 최대 5개; `count > ids.length`면
    ` 외 n`).
- `index.js`의 후보 행 투영(`dependency_chips` 조립, 지금 `blocker_chips`를 읽는
  자리)에서:
  - `release_info.released_by` 중 `closed_at >= now - 7일`인 것만, `closed_at`
    desc 최대 2개를 `released`로 만들고 나머지가 있으면 마지막 칩 라벨 끝에
    ` 외 n`을 붙인다. 7일 창은 **칩에만** 적용된다 — 정렬 키 `released`는 창과
    무관하게 `last_released_at`을 쓴다. 오래 전에 풀린 이슈는 정렬로는 여전히
    잡히지만, 칩까지 계속 서면 "방금"이라는 뜻을 잃는다.
  - `dependents_info`가 있으면 `dependents`를 만든다.
- 두 칩은 후보 행에만 싣는다. 대기·실행중·PR 대기 행은 이미 출발했거나 순서가
  정해졌으므로 "왜 먼저"가 의미 없다. `candidateCard`·`miniRow`는 공유
  렌더러이므로 Monitor runnable 행에도 같은 칩이 설 수 있지만, Monitor 투영은 이
  스펙에서 재료를 싣지 않아 fail-quiet로 생략된다(§9).

**정정(UI-8x90).** 세 가지가 바뀌었다.

- `dependentsChip`은 개수 칩 하나가 아니라 ID마다 칩을 만들고, `root_dirs`로 각
  칩의 `openable`·`root_dir`을 정한다. `→ 후속 <count>` 라벨과 툴팁의 ` 외 n`은
  없다.
- `releasedChip`의 `RELEASED_CHIP_MAX`(2)와 마지막 칩의 ` 외 n`도 없다. 칩 수를
  제한하는 것은 7일 창 하나뿐이므로, 창 안의 해제가 3개면 칩도 3개다.
- 두 칩은 후보 행 전용이 아니다. `→`는 `⛓`와 같은 범위 — 후보·대기·실행중·PR
  대기, 두 탭 — 에 서고, 재료는 큐 장식 `bead_dependents`와 후보 행
  `dependents_info`의 **합집합**이며 부착 자리는 `worker/lane-model.js`의
  `buildLanes` 한 곳이다. "이미 출발한 행에는 왜 먼저가 의미 없다"는 판정은
  뒤집혔다: 실행 중인 이슈가 무엇을 막고 있는지는 그 이슈를 지금 어떻게 다룰지를
  바꾼다 (`2026-08-28-chip-grammar-unify-design.md` §2·§4.4·§6.2).

## 6. 클라이언트 — 후보 드래그 제거

- 후보 카드 투영의 `draggable`을 `false`로 고정한다. 지금 `candidateCard`
  (`lanes.js`)는 `draggable`을 배치 자격으로도 쓴다 — 배치 메뉴 열림
  (`menu_open = draggable && …`)과 `[대기로 ↴]` 버튼 렌더 분기가 모두 그 안에
  있다. 그대로 끄면 정상 후보를 대기에 넣는 주 경로가 사라진다. 그래서
  `CandidateItem`에 `queue_placeable: boolean`
  (= `!item.done && !worker_ineligible`, 투영이 계산)을 더하고, 메뉴·`[대기로 ↴]`·
  겹침 팝오버 1클릭 배치의 자격 판정은 전부 이 값을 읽는다. `draggable`은 DOM
  `draggable` 속성과 `worker-card--static` 클래스 판정에만 남는다.
- actions-only foot(`.worker-card__foot--actions-only`)은 지금 데스크톱에서
  `display: none`이고 coarse pointer/640px 이하에서만 보인다 — 데스크톱에서는
  드래그가 배치 수단이라는 전제였다. 그 전제가 사라지므로 이 규칙을 지워 foot이
  포인터 종류와 무관하게 보이게 한다(사유가 있는 foot과 같은 표시).
- `onDragOver`의 드롭 대상에서 `candidate`를 뺀다. `onDrop`의
  `to_lane === 'candidate'` 분기(`reorderCandidates` 호출과 `removeBead` 호출)를
  지운다. `reorderCandidates`, 후보용 `computeDropRank` 사용, `candidate_issues`가
  렌더 순서와 일치해야 한다는 제약(§4 주석)을 함께 지운다.
- Worker 탭은 `uiOrderStore`를 더 이상 읽지 않는다(`createReorderController`
  호출과 `order` 인자 제거). `app/main.js`의 wiring에서 Worker 쪽 인자만 뺀다.
  Board 탭·`app/views/reorder.js`·`ui-order-set` 전송은 그대로다.
- 대기·직렬 행(`miniRow`, `lane === 'queue' | 's1'..'s5'`)에 `options.actions`로
  `✕` 버튼(`data-action="queue-remove"`, `aria-label="대기에서 빼기"`)을 단다.
  Monitor가 UI-5ksp §4.6으로 같은 자리에 붙인 조각과 같은 슬롯(행 1번 줄 조작
  끝)이다. 클릭은 기존 `removeBead(bead_id)`(`worker-queue-remove`)를 부른다.
  실행중 attempt가 걸린 행(`done` 또는 active attempt)은 지금 드롭이 거부되는
  것과 같은 조건으로 버튼을 그리지 않는다.
- 후보→대기·후보→s1~s5(`placeBead`, `[대기로 ↴]`·배치 메뉴·겹침 팝오버 1클릭
  배치), 대기 내부 `reorderBead`, 대기↔직렬 `placeBead`는 불변이다. 후보 카드가
  드래그 소스가 아니게 되므로 후보→대기 **드롭**만 사라지고 버튼 경로는 남는다.

## 7. 계약 영향

- `app/protocol.md`: `ready-issues`/`blocked-issues` 항목에 `release_info`·
  `dependents_info` partial 장식 추가.
- `docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md` §5.1
  슬롯 4 행에 두 칩 추가(§5.1의 표만; 근거는 이 스펙 §5.1을 가리킨다).
- `AGENTS.md` 카드 배치 문법 절은 바뀌지 않는다(슬롯 표가 정하는 규칙 그대로).
- dotfiles workflow 계약 표면(라벨·metadata 키)은 건드리지 않는다.

## 8. 검증

서버 (`server/list-adapters.test.js`, `workspace-snapshot-coordinator.test.js`,
`worker/foreign-blocker-status.test.js`):
- 닫힌 same-repo blocker → `release_info.released_by`에 `closed_at`과 함께 실림,
  열린 blocker는 실리지 않음.
- legacy·embedded 두 모드에서 `blocks_out`/`blocks_in`이 같은 결과.
- 역방향 카운트는 열린 후속만 세고, `ids`는 사전순 전량이다(정정(UI-8x90):
  원래는 "최대 5개 사전순"이었다).
- foreign 캐시 miss → `release_info`에 그 id 없음; `closed`+`closed_at` 도착 후
  실림.
- 다른 워크스페이스 peek `null` → 그 root의 후속은 세지 않음; 스냅샷 있으면 합산.
- `count === 0`·`released_by` 빈 경우 키 부재; foreign `released_by` 항목의
  `root_dir`은 owner를 알 때만.
- `decoration_rev`: 장식만 바뀐 이슈가 `computeDelta`에서 `updated`로 잡힘;
  장식 없는 리스트 타입의 delta는 변화 없음; `onForeignBlockerResolved`가
  요청자 root의 리스트 refresh를 예약함.

클라이언트 (`app/data/sort.test.js`, `app/views/worker/candidate-sort.test.js`,
`queue-blockers.test.js`, `lanes.test.js`, `index.test.js`):
- `cmpChain` 키별 비교·방향 반전·"없음 처리"가 방향과 무관·암묵 tiebreak.
- 프리셋 4개의 체인, 옛 문자열 4종+미지 값 마이그레이션, 미지 step 폴백,
  프리셋과 같은 체인의 `{preset}` 정규화.
- Blocked 이슈가 체인 위치대로 정렬됨(맨 아래 고정 없음, UI-8ham).
- `releasedChip` 7일 창·foreign 색; `dependentsChip` 라벨·툴팁.
- 후보 카드 `draggable="false"`이면서 `queue_placeable`이면 `[대기로 ↴]`가
  그려지고 배치 메뉴가 열림, `worker_ineligible`이면 둘 다 없음; foot이
  데스크톱 미디어에서도 보임(CSS 규칙 부재 확인); `onDragOver`가 `candidate`
  페인을 거부; 대기 행 `✕` 클릭이 `worker-queue-remove`를 보냄.
- `cmpChain` `dependents asc`에서 키 없는 행이 뒤로 감; foreign 해제 칩이
  `root_dir` 있을 때만 `openable`.

- Pre-handoff 번들(`npm run tsc`·`npx vitest run --reporter=dot`·`npm run lint`·
  `npm run prettier:write`·`npm run build`). 배포 후 후보 레인 스크린샷으로 체인
  편집 줄·두 칩·대기 행 `✕`를 확인한다.

**정정(UI-8x90).** 위 목록에서 폐기된 검증 항목: `ids` 최대 5개, `releasedChip`
최대 2개와 ` 외 n`, `dependentsChip`의 `→ 후속 n` 라벨, 겹침 팝오버 1클릭 배치
자격(`queue_placeable`이 그 경로에 쓰이던 부분). 대신 확인하는 것은 후속 전량과
`root_dirs`, 7일 창 안 해제 3개 이상이 칩 3개 이상, 네 레인·두 탭의 `→` 칩,
`.worker-dep__open` 클릭이 그 이슈 상세를 여는 것이다. 정렬 체인(§4)은 계속
`dependents_info.count`를 읽으므로 그 검증 항목은 그대로이고, 후보 드래그
제거(§6)의 검증도 그대로다 (`2026-08-28-chip-grammar-unify-design.md` §10).

## 9. 비목표

- Monitor runnable 행의 `🔓 해제`·`→ 후속` 재료 적재 — 공유 렌더러라 칩 자리는
  준비되지만 Monitor 투영은 이번에 바꾸지 않는다.
  **정정(UI-8x90).** 이 비목표는 해소됐다. UI-4tud가 두 탭의 조립을 하나로 합친
  뒤 UI-8x90이 `→` 재료를 네 레인·두 탭에 싣는다(`🔓`는 후보 행 그대로).
- Board 탭 카드의 해제·후속 표시, Board 탭 정렬.
- 보이지 않는 rig의 후속 수 — 셀 수 없고, 못 셌다는 표시도 하지 않는다.
- `⛓ blocked` 칩·`blocked_info`·admission 판정 변경.
- 정렬 키에 usage/비용·exec 설정 추가.

## 10. 경계·후속

형제 Bead 없음. Bead는 하나다(§11).

- 관찰: Monitor runnable 행에 같은 두 칩을 싣는 일 — 이 스펙이 `queue-blockers.js`에
  칩 함수를 두어 재료만 붙이면 되게 해 두므로, 필요가 확인되면 quick_fix로 잇는다.

## 11. 구현 unit 후보

1. `server`: §3.2 인덱스 → §3.4 캐시 `closed_at` → §3.3·§3.5 장식 → protocol.md.
2. `sort`: §4 `candidate-sort.js`·`cmpChain`·저장 마이그레이션·편집 UI.
3. `chips+drag`: §5 칩 투영·렌더·§5.1 슬롯 표 갱신, §6 드래그 제거·`✕` 버튼.

같은 레포·같은 owner의 순차 작업이므로 Bead는 하나다.
