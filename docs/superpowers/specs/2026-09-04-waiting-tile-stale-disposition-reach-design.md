---
scope:
  - app/views/worker/lane-model.js
  - app/views/worker/lanes.js
  - app/views/worker/queue-blockers.js
  - app/views/worker/running-grid.js
  - app/views/worker/index.js
  - app/views/monitor/index.js
  - server/worker/foreign-blocker-status.js
  - server/ws/worker-handlers.js
  - app/styles.css
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
  - AGENTS.md
---

# 선행 대기 타일 — blocker 상태 실시간 갱신·foreign rig 문자 표기·stale-work 처분 도달 (UI-yue8)

- Bead: `UI-yue8`
- 기준 커밋: `baa39873f9b8a1b6b5bcc4732f61f80dd23b6d2d`
- 선행: `UI-978d`(waiting 복귀 트리거, closed) · `UI-6g3t`(조작 표면 정비, closed)
- 소유 스펙: `2026-08-28-worker-prerequisite-wait-tier-design.md`(선행 대기 계층),
  `2026-08-18-worker-stale-worktree-recovery-design.md`(stale-work 처분),
  `2026-08-25-card-header-grammar-unify-design.md`(슬롯 표),
  `2026-09-02-worker-waiting-return-trigger-design.md`(활동 버스)

## 1. 문제

세 가지 결함이 한 타일에 모여 있다. 앞의 둘은 "무엇을 기다리는지"가 틀리게
보이는 문제이고, 셋째는 기다림이 끝났는데 다음 조작에 도달할 수 없는 문제다.

### 1.1 해제된 선행이 계속 `⛓`로 선다

held `waiting` 타일의 슬롯 4a 칩은 `blockedByFields`
(`app/views/worker/lane-model.js:2761`)가 두 재료를 합쳐 만든다 — 서버 장식
`bead_blocked_by`와 attempt에 동결된 `cause_detail.blockers[]`
(`waitProjection`, `:774`). 서버 장식은 닫힌 blocker를 이미 뺀 목록이다(같은
rig는 `bd show` dependency `status`, `server/worker/title-cache.js:238`; foreign은
표시 캐시 `applyForeignBlockerCleanup`, `server/worker/foreign-blocker-status.js:627`).
그러나 동결 목록은 정산 시점의 것이라, blocker가 닫혀 서버 목록에서 빠져도
합집합에는 남아 `⛓ <ID>`가 열린 것처럼 계속 선다.

### 1.2 foreign blocker는 색만 다르다

`predecessorChip`(`app/views/worker/queue-blockers.js:53`)은 foreign에 `foreign:
true`만 얹고 라벨은 `⛓ <ID>` 그대로다(`.worker-dep--foreign`,
`app/styles.css:7531`). ID의 prefix는 rig의 issue prefix라 사용자가 아는
저장소 이름(workspace 디렉터리명)이 아니고, 색약·모노크롬에서는 구분 자체가
없다.

### 1.3 stale-work 처분 버튼에 도달할 수 없다 — 두 경로

`worktree_stale_work` admission의 처분 카드([기존 작업 이어가기]·[백업 후 새로]·
[다시 확인])는 Worker 탭 `waitingRowOf`(`app/views/worker/index.js:2809`)가
대기 행에만 붙인다. 그 행이 그려지지 않는 경로가 둘이다.

| 경로 | 가리는 주체 | 원인 연쇄 | 실측 |
| --- | --- | --- | --- |
| 1 | held `waiting` 타일 | `heldAttemptStates`(`lane-model.js:1057`)가 terminal `waiting`을 타일로 승격 → held 루프(`:571`)의 소비자가 `claimed.add`(`:2802`) → `waitingItem`(`:3202`)이 `claimed.has`로 null → 처분 카드 없음. 타일 자체는 출구가 없다(`waitProjection` 주석 "the blocker closing is what moves it") | prostate `PROSTATE-0yz`, 2026-08-30 |
| 2 | 직렬 레인 점유 ghost 행 | systemic hold `재개`가 마지막 `failed` attempt에 `dismissed_at`을 찍는다(`server/worker/scheduler.js:10781-10787`) → `activeAttemptStates`(`app/utils/active-attempts.js:152`)에서 빠져 실패 타일 소멸 → `failed`는 `LANE_RELEASING_ATTEMPT_STATUSES`(`server/worker/queue-store.js:1827`) 밖이라 점유 유지 → 점유 bead는 ghost 행(`실패 · 점유 유지`, `lane-model.js:3313-3326`)으로만 그려지고 `claimed` | dotfiles `dotfiles-thqc`, 2026-09-04 |

두 경로 모두 **서버 처분 권한은 이미 성립한다**. `staleWorkAction`
(`scheduler.js:2400`)의 조건은 "그 bead가 큐 또는 직렬 레인 entry에 있음 +
admission `worktree_stale_work` + `action_id` 일치"뿐이고, `waiting`·dismissed
`failed`는 둘 다 `TERMINAL_ATTEMPT_STATUSES`(`scheduler.js:269`)에 있어
`activeBeadIdsFrom`이 막지 않는다. 결함은 화면 투영에만 있다.

## 2. 검증된 전제

1. `bead_blocked_by[bead]`는 title cache 적중 bead에 **키를 항상 싣고**, 열린
   `blocks` 선행만 담는다(빈 배열 포함, `title-cache.js:227-244`·`:555`). 키
   부재는 "모름"이다(partiality 계약). foreign 선행은 status가 없어 캐시에
   남고 `applyForeignBlockerCleanup`이 표시 캐시로 닫힌 것을 뺀다. 따라서
   **키가 있고 ID가 없으면 그 선행이 지금 이 bead를 막지 않는다**는 판정이 같은
   rig·foreign 양쪽에 같은 식으로 성립한다. 그 목록은 close와 간선 삭제를
   구분하지 않으므로 close 자체는 증명하지 않는다(§6.0).
2. foreign 표시 캐시(`foreignBlockerStatusFor`, `foreign-blocker-status.js:239`)는
   TTL 5분·실패 재시도 60초(`:44-45`)이고, 답이 `closed`일 때만
   `notifyResolved(requesters)`로 요청 워크스페이스를 깨운다. 그 알림은 이미
   Worker fanout(`server/ws/worker-handlers.js:1287`)·Monitor push
   (`server/ws/monitor-handlers.js:905`)·목록 refresh(`server/ws/refresh.js:262`)에
   배선되어 있다.
3. `queryForeignBlockerStatus`는 판정 전용이며 캐시를 읽지도 쓰지도 않는다(그
   모듈 헤더 계약). 이 스펙은 그 계약을 건드리지 않는다.
4. UI-978d가 만든 워크스페이스 활동 버스(`server/worker/workspace-activity.js`)는
   owner rig의 bd 변경(`fire()`)과 외부 tick 진입에서 root를 publish한다.
   `onWorkspaceActivity(listener)`로 구독한다.
5. Worker 탭 실행 중 타일의 슬롯 4 칩은 `chipsWithOverlaps`(`index.js:2711`)가
   만든다: 선행 칩은 `deriveWorkerBlockers`(`queue-blockers.js:205`)로 워커
   어휘로 다시 만들고, 투영이 실은 `released`·`dependents`는 그대로 지킨다.
   재료 `blockers_by_bead`는 항목의 `blocked_by`를 서버 `bead_blocked_by`가
   덮는다(`index.js:3272-3286`). Monitor는 lane-model이 `describeBlocker`
   (`app/views/monitor/blockers.js:169`)로 `BlockerLocation.workspace_name`을
   안다.
6. 서버 `blocker_workspaces[blocker_id]`는 살아남은 foreign blocker의 owner
   root다(`worker-handlers.js:1310`, `applyForeignBlockerCleanup`이 채움).
7. Worker 탭 held 타일 본문은 `heldBodyTemplate(kind='waiting', ...)`
   (`app/views/worker/running-grid.js:932`)이 요약 + 4a 칩 + foot `폐기`를
   그리고, 상태 뱃지는 `held_badge`(`:1169`)의 배타 자리다.
8. `dismissed_at`은 "UI hide, 해제 아님"이며 단조다(`scheduler.js:770`,
   `queue-store.js:4451`). 되돌리는 쓰기는 없다.
9. Monitor 탭 대기 행에는 stale-work 처분 카드가 원래 없다
   (`app/views/monitor/index.js`에 `stale_work` 소비 없음). Monitor는 admission
   뱃지와 `Worker ↗` 링크로 Worker 탭에 보낸다.

## 3. 사용자 결정 (2026-09-04)

| # | 결정 | 기각한 대안 |
| --- | --- | --- |
| D1 | 처분 도달은 **대기 행 강등**이다: admission이 `worktree_stale_work`인 bead는 held 타일·점유 ghost 행 대신 그 bead의 실제 대기 행(기존 처분 카드 포함)을 그린다. 서버·`dismissed_at` 불변 | 타일·ghost 행에 카드 추가(처분 카드가 세 자리에 산다); `재개`의 dismiss 시점 이동(단조 계약이 바뀌고 경로 1은 별도 해법 필요) |
| D2 | 더 이상 막지 않는 선행은 기존 해제 칩 어휘 `🔓 <ID>`(4b)로 내려가고, 열린 선행이 남지 않으면 상태 뱃지가 `⛓ 복귀 대기`다 (문구는 리뷰 반영으로 "닫힘"이 아니라 "해제"다 — §6.0) | `⛓ <ID> · 닫힘`(새 어휘); 뱃지만 변경 |
| D3 | foreign 칩 라벨은 `⛓ <workspace명>/<ID>`, owner를 모르면 `⛓ 외부/<ID>`. 대기 행·후보·타일의 같은 칩이 같은 문법(공유 `predecessorChip`) | 글리프만; 선행 대기 타일에서만 |
| D4 | foreign 칩 클릭은 현행 유지 — owner를 알면 그 workspace 이슈 상세, 모르면 누를 수 없는 span + 툴팁 | 사유 팝업(열리는 칩이 판정 칩처럼 행동하는 예외) |

## 4. 설계 원칙

- **한 bead는 한 자리.** 강등은 "타일 또는 ghost 대신 행"이지 "행도"가 아니다.
  수용 기준 2(이중 렌더 없음)는 조건 검사가 아니라 구조로 성립한다.
- **판정 재료는 서버가 이미 증명한 것만.** 해제 판정은 `bd ready`와 같은
  원천(title cache status·foreign 캐시)이고, 처분 강등은 스케줄러가 durable로
  기록한 admission이다. 화면이 새 판정을 발명하지 않는다.
- **cadence 없음(ADR 0034).** foreign 상태 갱신은 활동 버스 이벤트에만 건다.
- **fail-quiet.** 재료가 없으면(키 부재·owner 미상) 현행 렌더 그대로다.

## 5. 범위 1 — 강등 규칙 (`lane-model.js`, 두 탭 공유)

### 5.1 판정식

```
staleDisposition(admission, bead_id) :=
  admission[bead_id]?.reason === 'worktree_stale_work'
  ∧ admission[bead_id].stale_work가 object
  ∧ typeof stale_work.action_id === 'string' ∧ action_id.length > 0
```

`staleWorkProjection`(`lanes.js:711`)이 카드를 그리는 조건과 같은 재료여야 한다 —
카드가 서지 않을 admission으로 타일을 지우면 조작 없는 행만 남는다. 그런데
현행 `staleWorkProjection`은 `action_id`를 `typeof ... === 'string' ? ... : ''`로
읽어 **빈 문자열을 허용한다**(`lanes.js:762`). 빈 `action_id`로 그려진 버튼은
서버 `staleWorkAction`의 `stale_work.action_id !== input.action_id` 비교에서
언제나 `stale_work_conflict`이므로 누를 수 없는 버튼이다. 그래서 이 스펙은 두
곳을 함께 고친다: `staleWorkProjection`은 `action_id`가 비어 있으면 `null`을
돌려주고(현행처럼 admission 뱃지로 fail-quiet), 위 판정식은 그 조건을 그대로
공유한다. 옛 기록이나 손상된 admission은 강등되지 않고 지금처럼 타일·ghost로
남는다.

### 5.2 held `waiting` 타일 (경로 1)

`activeByBead`의 held 루프(`:571`)에서 `held.run_state === 'waiting'`이고
`staleDisposition`이 참이면 **타일을 만들지 않는다**(`map.set` 생략). 그 루프의
소비자(`:2802`)는 map에 없는 bead를 `claimed`에 넣지 않으므로 `waitingItem`이
행을 그린다. `activeByBead`는 `input.admission`을 새로 받는다(기존
`discard_operations`·`observations`와 같은 자리).

- `parked`·`retry_wait`·`provider_hold`는 손대지 않는다. 그 셋은 fence가 있어
  pass가 admission을 쓰지 않으므로 조합 자체가 생기지 않는다(§10).
- `waiting` attempt 기록은 그대로 남고 `latestImplementationAttempt`도 그대로
  `waiting`을 돌려준다. 바뀌는 것은 화면 대표뿐이다.

### 5.3 직렬 레인 점유 ghost 행 (경로 2)

직렬 레인 투영(`:3313-3326`)에서 entry `bead_id`가 `ghost_ids`에 있어도
`staleDisposition`이 참이면 `claimed.add`·`continue`를 **하지 않고**
`waitingItem`으로 떨어뜨린다. 같은 bead는 `occupants`(`:3349`)에서도 뺀다.

- 점유 사실은 잃지 않는다: 그 행의 `badges` 맨 앞에 `occupantOf(bead_id).badge`
  (경로 2에서는 `실패 · 점유 유지`)를 싣는다. 슬롯 1 상태 뱃지 자리다.
- entry가 아닌 점유자(PR 대기 등)는 현행 ghost 그대로다. 강등은 "실제 행이 있는
  점유자"에만 성립한다 — 행이 없으면 대신 그릴 것이 없다.
- 병렬 큐의 dismissed `failed` bead는 지금도 행으로 그려지므로 변경이 없다.

### 5.4 Worker 탭 소비

`waitingRowOf`가 지금처럼 `staleWorkProjection`으로 처분 카드를 붙이고
`draggable=false`·`reason=''`로 접는다. `staleWorkAction`(`index.js:2441`)의
`worker-stale-work-continue`/`backup-fresh`/`recheck` 전송, `expected_revision`
CAS, conflict 토스트 — 전부 현행 그대로다. `serialLanes`(`index.js:2856`)의
건수·빈 판정은 `ghosts + items`이므로 강등 뒤에도 같은 수를 센다.

### 5.5 Monitor 탭 소비

같은 lane-model이므로 Monitor도 타일·ghost 대신 행을 그린다. 그 행은 admission
뱃지(`⛔ worktree_stale_work`)와 `Worker ↗`를 지금처럼 싣는다. 처분 카드는
Monitor에 두지 않는다(§14 관찰).

## 6. 범위 2 — 해제된 선행과 `복귀 대기` 뱃지 (held `waiting` 타일)

### 6.0 무엇이 증명되는가

동결 목록(`wait.blockers`)의 ID가 서버 목록(`bead_blocked_by[bead]`)에서 빠졌다는
사실이 증명하는 것은 **"그 선행이 지금 이 bead를 막지 않는다"**뿐이다. close는
그 원인 중 하나이고, `blocks` 간선 삭제나 관계 타입 변경도 같은 결과를 낸다 —
`title-cache.js:227-244`는 `dependency_type === 'blocks' ∧ status !== 'closed'`인
것만 담으므로 두 원인이 목록에서 구분되지 않는다. 따라서 화면은 close를
주장하지 않고 **해제**만 말한다. `bd ready` 복귀 판정도 같은 사실을 쓰므로 —
간선이 사라져도 bead는 돌아온다 — 사용자에게 필요한 답("왜 이제 갈 수 있나")은
이것으로 온전하다. close 시각까지 아는 기존 `🔓 해제` 칩(`release_info`,
`closed_at` 보유)은 후보 행의 것이고 이 타일에는 그 재료가 없다.

### 6.1 판정

`blockedByFields(bead_id, wait)`(`:2761`)가 `wait`를 받는 실행 중 항목 조립
지점(`:2855`)에서:

```
if Object.hasOwn(bead_blocked_by, bead_id):
  open     = bead_blocked_by[bead_id]                     // 서버가 증명한 지금 열린 선행
  resolved = wait.blockers.map(id).filter(id ∉ open)      // 동결 목록 중 더 이상 막지 않는 것
  returning = open.length === 0
else:
  resolved = []                                           // 모름 → 현행(전부 ⛓)
  returning = false
```

- **`returning`은 동결 목록이 아니라 현재 열린 선행 수로 판정한다.** 정산 뒤에
  새 blocker가 걸린 bead는 `open`이 비지 않으므로 `복귀 대기`가 되지 않는다 —
  동결 목록 기준으로 세면 그 새 선행이 보이지 않아 오판한다. `open`이 비어야
  한다는 조건 하나가 두 방향(해제·신규 추가)을 함께 막는다.
- 항목 `blocked_by` = `open ∪ (wait.blockers − resolved)` = `open` — 해제된 ID는
  `⛓`에서 빠지고, 정산 뒤 새로 걸린 선행은 `open`에 있으므로 `⛓`로 함께 선다.
  `prerequisite_unmet` admission의 `blockers`(UI-d3i1 §5.4)는 attempt 없는 큐
  항목의 재료이므로 이 판정 대상이 아니다(현행 합침 유지).
- 키가 있을 때 서버 목록을 신뢰하는 것은 의도된 선택이다. 선행 대기 계층 §5.1이
  동결 목록을 합쳤던 이유는 "큐 장식이 그 엣지를 아직 싣지 않았을 수 있다"였고,
  그 상황은 키 **부재**로 나타나 위 `else` 갈래가 그대로 덮는다. 키가 있는데도
  title cache가 TTL만큼 낡아 잠깐 해제로 보이는 창은 다음 refresh가 스스로
  닫으며, 그 창에서도 조작은 바뀌지 않는다(이 타일에는 처분 조작이 없다).
- 항목 `dependency_chips.released`에 `resolved`를 칩으로 싣는다.
  `releasedChip`(`queue-blockers.js:96`)은 `closed_at`이 없으면 `null`이므로 같은
  파일에 **`resolvedBlockerChip(owner_id, id, workspace_name?, root_dir?)`** 을
  더한다: 라벨은 `🔓 <ID>`(foreign 표기는 §8), 툴팁은 `해제 — 더 이상 이 이슈를
  막지 않는다 · 복귀 대기`, 7일 창 없음, `foreign`·`openable`·`root_dir` 규칙은
  선행 칩과 같다. 4b 줄에 서는 것은 `dependencyChipsTemplate`(`lanes.js:1046`)의
  현행 `released` 처리 그대로다. 이름을 `closedBlockerChip`이 아니라
  `resolvedBlockerChip`으로 두는 이유는 §6.0이다 — 함수 이름이 증명되지 않은
  사실을 주장하면 다음 소비자가 그것을 사실로 읽는다.
- `WaitTile`(`running-grid.js:184`)에 `returning?: boolean`을 더한다. 키 부재면
  `false`.
- Worker 탭은 `chipsWithOverlaps`가 투영의 `released`를 지키고 선행 칩은 서버
  `bead_blocked_by`(= `open`)로 다시 만들므로, 두 탭이 같은 집합을 그린다.
  `blockers_by_bead`가 항목 `blocked_by`를 서버 키로 덮는 현행 순서는 이
  설계와 일치하므로 바꾸지 않는다.

### 6.2 해제된 foreign 선행의 owner (`server/ws/worker-handlers.js`)

현행 `blocker_workspaces`는 **살아남은** foreign blocker만 담는다
(`pruneClosedForeignBlockers`는 닫힌 항목에서 `return false`로 빠져나가며 그 키를
쓰지 않는다). 그대로 두면 해제된 foreign 칩은 언제나 `외부/<ID>`이고 누를 수
없어 D3·D4를 만족하지 못한다.

`cleanForeignBlockers`(`worker-handlers.js:1310`) 뒤에 한 단계를 더한다.

```
extra_ids = { blocker.id | attempt.status === 'waiting'
                         ∧ attempt.cause_detail.blockers[] }
          ∪ { blocker.id | admission[*].reason === 'prerequisite_unmet'
                         ∧ admission[*].blockers[] }
          − Object.keys(blocker_workspaces)
blocker_workspaces ∪= ownerRootsForBlockerIds(extra_ids, workspace_key)
```

`foreign-blocker-status.js`에 **`ownerRootsForBlockerIds(ids, requester_root)`** 를
더한다: visible roots를 한 번 읽고 `cachedIssuePrefixFor`로만 prefix를 맞춰
`{id: owner_root}`를 돌려주며, prefix가 cold인 root는 `prewarmIssuePrefix`를 걸고
이번 회차에서는 건너뛴다(다음 스냅샷이 채운다). **bd를 부르지 않는다** — 동기
자식 프로세스를 띄우지 않는다는 ADR 0026을 그대로 지킨다. 같은 rig ID와 owner를
못 찾은 ID는 결과에 없다(fail-quiet → `외부/<ID>`, 누를 수 없음).

이 맵은 이름과 클릭 대상만 공급하고 상태를 말하지 않는다 — 해제 판정은 §6.1이
소유한다.

### 6.3 뱃지

`held_badge`(`running-grid.js:1169`)의 `waiting` 갈래: `tile.wait?.returning`이면
`⛓ 복귀 대기`, 툴팁 `막고 있던 선행이 남지 않았습니다 — 다음 pass에서 후보로
돌아갑니다 (슬롯·레인 순서 대기)`. 아니면 현행 `⛓ 선행 대기`. 같은 배타
자리이며 새 슬롯은 없다.

### 6.4 신선도

- 같은 rig: title cache의 현행 TTL·bd 감시 refresh가 소유한다. 새 트리거 없음.
- foreign: §7.

## 7. 범위 3 — foreign 상태 캐시의 활동 연동 (`foreign-blocker-status.js`)

### 7.1 `refreshForeignBlockerStatusForOwner(owner_root)`

```
for (key, hit) of foreign_blocker_status_cache:
  if hit.owner_root !== resolve(owner_root): continue
  if hit.status === 'closed': continue                   // 최종값, 다시 묻지 않는다
  if hit.in_flight: continue
  if now - hit.asked_at < FOREIGN_STATUS_ACTIVITY_MIN_MS: continue
  startLookup(key, hit.bead_id, hit.owner_root)           // TTL 만료와 같은 경로
```

- `foreignBlockerStatusFor`의 비동기 `bd show` 갈래를 `startLookup`으로 떼어
  둘이 같은 코드를 쓴다. 답이 `closed`면 현행 `notifyResolved(requesters)`가
  돌아 Worker fanout·Monitor push·목록 refresh가 그대로 일어난다(§2-2). 새
  알림 경로는 없다.
- 캐시 항목에 `bead_id`·`owner_root`·`asked_at`을 함께 저장한다(키에서 다시
  파싱하지 않는다).
- `FOREIGN_STATUS_ACTIVITY_MIN_MS = 10_000`. 활동 이벤트는 owner rig의 bd 변경
  burst마다 오므로 항목당 하한을 둔다. TTL 5분·재시도 60초는 그대로다.

### 7.2 구독

모듈 안에서 lazy 1회 배선한다(`wireForeignBlockerFanout`과 같은 모양):
`foreignBlockerStatusFor`가 처음 불릴 때 `onWorkspaceActivity(root =>
refreshForeignBlockerStatusForOwner(root))`를 건다. attachment마다 구독하면
같은 root에 N번 재조회가 걸리므로 모듈 단일 구독이다.
`__resetForeignBlockerCachesForTest`가 구독을 해제한다.

### 7.3 비용 상한

활동 이벤트 1건당 그 rig를 owner로 둔 캐시 항목 수만큼 `bd show`, 항목당 10초에
1회 이하. 항목은 화면에 서 있는 foreign blocker뿐이므로 보통 0~수 개다. 이벤트가
없으면 0회다.

## 8. 범위 4 — foreign 칩 표기 (`queue-blockers.js`·CSS)

### 8.1 라벨

`predecessorChip(owner_id, blocker)`의 `blocker`에 선택 필드
`workspace_name?: string`을 더한다.

| 조건 | 라벨 |
| --- | --- |
| 같은 rig | `⛓ <ID>` (현행) |
| foreign, `workspace_name` 있음 | `⛓ <workspace_name>/<ID>` |
| foreign, 없음 | `⛓ 외부/<ID>` |

툴팁은 `<라벨 전체> — <현행 문장>`으로 시작해 ellipsis로 잘린 라벨을 hover가
복원한다. foreign이면 문장 뒤에 ` · 다른 저장소의 이슈라 여기서 닫을 수 없다`를
붙인다. `resolvedBlockerChip`(§6.1)과 `releasedChip`도 같은 표를 따른다 — 같은
관계가 두 어휘로 읽히지 않게 한다. `dependentsChip`(`→`)은 후속이라 이 표 밖이다.

### 8.2 재료

- Worker 탭 `deriveWorkerBlockers`: `blocker_workspaces[blocker_id]`가 있으면
  `path.basename` 상당(마지막 `/` 뒤)을 `workspace_name`으로 넘긴다. 없으면
  생략(→ `외부`). 해제된 foreign 선행의 그 키는 §6.2가 채운다 — 살아남은
  blocker만 담는 현행 맵으로는 해제 칩이 이름도 클릭도 갖지 못한다.
- Monitor(lane-model `:3903`): `locations.get(id)?.workspace_name`, 없으면
  `workspace.blocker_workspaces?.[id]`의 basename, 둘 다 없으면 생략.
- `isForeignBlocker`(`app/utils/blocker-scope.js`) 판정은 그대로다 — 이름을
  알아도 같은 rig면 붙이지 않는다.

### 8.3 폭

`.worker-dep`(`styles.css:7487`)에 `max-width: 22ch; overflow: hidden;
text-overflow: ellipsis; white-space: nowrap`을 더한다(인라인 요소라면
`display: inline-block`도). 네 종 칩(`⛓`·`→`·`🔓`·`⧉`)이 같은 클래스라 같은
상한을 받는다. `22ch`는 `⛓ microbiome_bile/Analysis-2zly`(31자)가 잘리고
`⛓ PROSTATE-m67`(14자)이 온전한 값이다 — 잘림은 hover 툴팁이 복원한다.

### 8.4 클릭

변경 없음(D4). `openable`·`root_dir` 규칙은 `deriveWorkerBlockers`·`openTarget`
현행이다.

## 9. 문서 갱신

### 9.1 카드 문법 스펙 §5.1

`2026-08-25-card-header-grammar-unify-design.md` §5.1 끝에 **정정(UI-yue8)** 한
문단을 더한다.

- 1번 정체성: held 판정 뱃지 목록을 `⛓ 선행 대기/복귀 대기`로 — 같은 배타 자리의
  두 문구다.
- 4a: `⛓ <ID>`의 "타 레포는 색만 다름"을 "타 레포는 `<workspace>/<ID>` 표기와
  색"으로.
- 4b: `🔓 <ID>`에 "선행 대기 타일의 해제된 선행(복귀 대기)도 이 칩"을 더한다.
- 6번 foot: stale-work 처분 버튼은 **대기 행 전용**이며, 처분이 필요한 bead가
  held 타일·점유 ghost 행에 가려지지 않도록 강등 규칙(이 스펙 §5)이 도달을
  보장한다. 타일·ghost 행에 그 버튼을 다는 것은 이 정정이 배제한다.

### 9.2 AGENTS.md 카드 배치 문법 절

결정 한 줄: "타 레포 blocker 칩은 `<workspace>/<ID>`로 rig를 문자로 보이고 색은
그대로다. 사람의 처분을 기다리는 admission이 선 bead는 held 타일·점유 ghost가
아니라 대기 행이 대표한다 — 근거는 이 스펙."

## 10. 에러·경계

1. admission 키가 있으나 `stale_work`가 없거나 `action_id`가 빈 옛 기록: 판정
   거짓 → 현행 렌더(타일/ghost). `staleWorkProjection`도 같은 조건에서 `null`을
   돌려주므로(§5.1) 카드가 서지 못할 admission으로 강등하는 일이 없다.
2. 강등된 행의 처분 클릭이 서버에서 `stale_work_conflict`로 거부되면 현행
   토스트·최신 스냅샷 채택 그대로다. 그 뒤 admission이 바뀌면 다음 렌더가
   판정을 다시 한다.
3. `parked`·`retry_wait`·`provider_hold` + `worktree_stale_work` 조합은 생기지
   않는다: 셋은 `settledAttemptFence`가 pass를 막아 admission이 쓰이지 않고,
   dispatch 시작 시 `clearAdmission`으로 지워진다. 그래도 생기면 현행대로 타일이
   이긴다(강등은 `waiting`에만).
4. `bead_blocked_by` 키 부재(title cache 미적중): 해제 판정 없음, 전부 `⛓`,
   `returning=false`. 부재를 "해제"로 읽지 않는다.
   - `blocks` 간선이 삭제되거나 관계 타입이 바뀐 경우: 서버 목록에서 빠지므로
     해제 칩이 선다. 오표시가 아니다 — §6.0대로 화면은 close가 아니라 "더 이상
     막지 않는다"만 말하고, `bd ready` 복귀도 같은 사실로 일어난다.
   - 정산 뒤 새 blocker가 걸린 경우: `open`이 비지 않으므로 `returning=false`이고
     그 선행이 `⛓`로 선다. 해제 칩과 선행 칩은 한 카드에 함께 설 수 있다.
5. foreign owner가 visible workspace에 없음(`no_rig`): 캐시 항목이 없으므로 §7
   재조회 대상이 아니고, 서버 prune도 안 하므로 `⛓ 외부/<ID>`로 남는다.
   `queryForeignBlockerStatus`의 `no_rig` fail-quiet와 같은 결과다.
6. `resumeQueueHold`·`dismissAttempt`·`dismissed_at` 단조: 변경 없음.

## 11. 재현

- 경로 1: `waiting` attempt(`cause_detail.blockers=[{id:X, rig:null,
  status:'open'}]`) + `admission[bead]={reason:'worktree_stale_work',
  stale_work:{action_id, can_continue:true, ...}}` + 직렬 s1 entry. 기대: 실행 중
  타일 없음, s1 행 1개에 `.worker-mini__stale-continue`.
- 경로 2: `failed` attempt(`dismissed_at` 있음, `serial_lane_id='s1'`) +
  `lane_states.s1.occupied_by=[bead]` + s1 entry + 같은 admission. 기대: ghost
  행 없음, s1 행 1개, 뱃지 첫 항목 `실패 · 점유 유지`, 처분 카드 있음.
- 해제: `waiting` attempt blockers `[X, Y]`, `bead_blocked_by[bead]=[Y]`. 기대:
  `⛓ Y`·`🔓 X`, 뱃지 `⛓ 선행 대기`. `bead_blocked_by[bead]=[]`면 `🔓 X`·`🔓 Y`,
  뱃지 `⛓ 복귀 대기`. 키 없음이면 `⛓ X`·`⛓ Y`, 뱃지 `⛓ 선행 대기`.
- 신규 선행: blockers `[X]`, `bead_blocked_by[bead]=[Z]`(X는 해제, Z는 정산 뒤
  추가). 기대: `🔓 X`·`⛓ Z`, 뱃지 `⛓ 선행 대기`(`returning=false`).
- foreign: owner `Analysis-2zly` → `blocker_workspaces` 있음 → `⛓
  microbiome_bile/Analysis-2zly`; 없음 → `⛓ 외부/Analysis-2zly`. 해제된 같은
  ID는 §6.2가 채운 owner로 `🔓 microbiome_bile/Analysis-2zly`(열림 가능).

## 12. 검증 bundle

| 파일 | 고정하는 것 |
| --- | --- |
| `app/views/worker/lane-model.test.js` | 경로 1·2 강등(타일/ghost 없음·행 있음·`claimed` 이중 렌더 없음); admission 없음·`stale_work` 없음·**빈 `action_id`**면 현행 타일/ghost 불변; entry 없는 점유자는 ghost 유지; §11 해제 세 케이스·**간선 삭제**·**신규 선행**과 `returning`; foreign `workspace_name` 재료 전달 |
| `app/views/worker/lanes.test.js` | `staleWorkProjection`이 빈 `action_id`에 `null`을 돌려준다(그 admission은 뱃지로 fail-quiet) |
| `app/views/worker/index.test.js` | 두 경로에서 s1 행에 `.worker-mini__stale-continue`·`.worker-mini__stale-backup`·`.worker-mini__stale-recheck`가 `data-action-id`와 함께 렌더되고, 클릭이 `worker-stale-work-continue`(한 경로는 `worker-stale-work-recheck`)를 `{bead_id, action_id, expected_revision}`으로 보낸다; 강등 행 `draggable=false`; 뱃지 `실패 · 점유 유지` |
| `app/views/worker/lane-model.test.js` (회귀) | admission 없이 `dismissed_at`이 찍힌 `failed` 점유 bead는 지금처럼 ghost 행 하나로만 그려진다(수용 기준 7); `parked`·`retry_wait`·`provider_hold` 타일은 admission 유무와 무관하게 불변(수용 기준 3) |
| `app/views/worker/running-grid.test.js` | `wait.returning`이면 `⛓ 복귀 대기`, 아니면 `⛓ 선행 대기`; held 본문의 `released` 칩 렌더 |
| `app/views/worker/queue-blockers.test.js` | `predecessorChip`·`resolvedBlockerChip`·`releasedChip` 라벨 세 변형과 툴팁 접두; `deriveWorkerBlockers`가 `blocker_workspaces`에서 `workspace_name`을 만든다; 해제된 foreign 칩이 owner를 받으면 `openable`·`root_dir`을 갖는다 |
| `server/ws/worker-handlers.test.js` | `waiting` attempt·`prerequisite_unmet` admission의 foreign blocker id가 `blocker_workspaces`에 실린다; 같은 rig·owner 미상 id는 실리지 않는다; 이 경로가 `bd`를 부르지 않는다 |
| `app/views/monitor/index.test.js` | 강등 행이 Monitor 대기 본문에 admission 뱃지와 함께 서고 ghost가 없다 |
| `server/worker/foreign-blocker-status.test.js` | 활동 publish → owner 일치 항목만 재조회 → `closed`면 `onForeignBlockerResolved` 호출; `in_flight`·`closed`·10초 하한 건너뜀; 불일치 root는 `bd` 호출 0회; reset이 구독을 해제 |
| Pre-Handoff | `npm run tsc` · `npx vitest run --reporter=dot` · `npm run lint` · `npm run prettier:write` → `npm run build`(bundle·map 포함) |

## 13. 구현 unit 후보

1. `server/worker/foreign-blocker-status.js` + `server/ws/worker-handlers.js` —
   §7(`startLookup` 분리·활동 구독·항목 필드)과 §6.2(`ownerRootsForBlockerIds`와
   `blocker_workspaces` 확장).
2. `app/views/worker/lane-model.js` + `queue-blockers.js` + `lanes.js` — §5 강등과
   `staleWorkProjection` 가드, §6.1 해제 판정과 `resolvedBlockerChip`,
   §8.1-8.2 라벨 재료.
3. `running-grid.js`·`index.js`(Worker)·`styles.css`·문서(§9) — §6.2 뱃지,
   `WaitTile.returning`, §8.3 폭, 슬롯 표·AGENTS.

## 14. 경계·후속

- 관찰: Monitor 탭 대기 행에는 stale-work 처분 카드가 없다 — Monitor는 cross-repo
  관측 화면이고 처분은 Worker 탭이 소유한다는 기존 결정(UI-eey2)을 따른다. 이
  스펙은 Monitor에서도 타일/ghost 대신 행이 서게 하지만 카드는 더하지 않는다.
- 관찰: `parked`·`retry_wait`가 `DISCARDABLE_ATTEMPT_STATUSES`에 없는 문제는
  선행 대기 계층 스펙 §8이 이미 후속으로 남겼다. 여기서 다루지 않는다.
- 결정: `재개`의 `dismissed_at` 기록 시점은 바꾸지 않는다 — 단조 계약과 "UI hide"
  의미를 유지하고, 강등 규칙이 그 결과를 화면에서 흡수한다.

## 결정 (ADR 후보)

- 전제: ADR 0014 — 새 요소의 자리는 공유 슬롯 표가 정한다(§9.1이 먼저 갱신).
- 전제: ADR 0028 — `waiting`은 터미널 결말이고 fence는 `bd ready` 부재뿐이다(강등은
  기록을 바꾸지 않고 화면 대표만 바꾼다).
- 전제: ADR 0034 — 복귀 관측은 이벤트 구독이며 cadence를 두지 않는다(§7이 같은
  원칙으로 표시 캐시를 갱신).
- 사람의 처분을 기다리는 admission(`worktree_stale_work`)이 선 bead는 held
  타일·점유 ghost 행이 아니라 대기 행이 대표하고, stale-work 처분 조작은 대기
  행에만 산다. **되돌리기 어렵다**: 두 탭·세 투영에 걸치고, 되돌리면 처분 카드가
  세 자리에 다시 살아야 한다. **맥락 없이는 의외다**: 지금까지 화면 대표를 정한
  것은 attempt의 생사와 레인 점유였고(터미널 attempt는 타일, 점유 lineage는
  ghost), 이 규칙은 그 둘을 제치고 **admission**이 대표를 정하게 한다 — 코드만
  읽으면 "waiting attempt가 있는데 왜 대기 행인가"를 설명할 근거가 어디에도 없다.
  **trade-off가 실재한다**: 대안(타일·ghost에 처분 카드 추가, `재개`의 dismiss
  시점 이동)은 각각 조작 표면 분산과 `dismissed_at` 단조 계약 파기를 대가로
  같은 결과를 낸다. `summary`: "처분 대기 admission이 선 bead는 held
  타일·점유 ghost가 아니라 대기 행이 대표하고 stale-work 처분 조작은 대기 행에만
  산다" → ADR
- `dismissed_at`은 단조·UI hide 그대로 — 기존 계약의 재확인이지 새 결정이 아니다
  → ADR 아님.
- foreign 칩 `<workspace>/<ID>` 표기와 `복귀 대기` 뱃지 — 표시 어휘이며 슬롯
  표가 소유한다 → ADR 아님.
- foreign 표시 캐시를 활동 버스에 거는 것 — ADR 0034의 적용이지 새 원칙이 아니다
  → ADR 아님.
