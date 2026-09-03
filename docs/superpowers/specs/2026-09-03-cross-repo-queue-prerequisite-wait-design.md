---
scope:
  - server/worker/scheduler.js
  - server/worker/queue-store.js
  - server/worker/attach.js
  - server/ws/worker-handlers.js
  - app/views/worker/lane-model.js
  - app/views/worker/lanes.js
  - app/views/monitor/drop-plan.js
  - app/views/monitor/index.js
  - app/protocol.md
---

# cross-repo 의존 큐 항목 — 선행 대기 기록·복귀 구독 확대·확정/진행 분리·연결 레인 행 칩 정정

- Bead: `UI-d3i1` (route `spec_backed`)
- 작성일: 2026-09-03
- 선행: `2026-08-26-monitor-cross-lane-run-axis-design.md`(UI-jaua) 발차 축·위치 칩,
  `2026-08-25-monitor-stored-cross-lanes-design.md`(UI-j92s) 확정 절차,
  `2026-09-02-worker-waiting-return-trigger-design.md`(UI-978d, ADR 0023) 복귀 구독,
  `2026-08-28-worker-prerequisite-wait-tier-design.md` 선행 대기 판정식,
  `2026-08-25-card-header-grammar-unify-design.md` §5.1 슬롯 표.
- 사용자 결정(2026-09-03): §3.

## 1. 문제

2026-09-03 연결 레인 `dotfiles-12su → UI-n28d`에서 관측했다.

### 1.1 확정만 눌러도 실행된다

`planLaneConfirm`은 인접 `dep-add`와 함께 멤버를 각 레포 **병렬 큐**에 적재한다
(`app/views/monitor/drop-plan.js` `placeUnplacedMembers`). 그 레포의 `auto_advance`가
ON이면 병렬 큐 진입이 곧 발차다. `▶ 진행`의 arm 축은 `auto_advance`가 OFF일 때만
후보를 좁히므로(UI-jaua §5.2 "ON이면 후보 집합은 현행과 완전히 동일") 자동 진행이
켜진 레포에서는 확정 = 적재 = 발차가 된다. 사용자는 `확정`을 "순서 저장"으로,
`▶ 진행`을 "출발"로 읽는데 화면이 그 구별을 지키지 않는다.

### 1.2 선행이 닫혀도 후행이 출발하지 않는다

| 시각 (UTC) | 사건 |
|---|---|
| 05:10:08 | 확정으로 UI-n28d 병렬 큐 적재, 같은 tick의 admission이 `not_ready:open` 기록 |
| 06:21:59 | dotfiles-12su `closed` |
| 06:27 | `bd ready`에 UI-n28d 있음, 큐에 그대로, 미발차 |

beads-ui 워크스페이스에서 발차 패스를 깨울 사건이 없었다. 외부 레포 활동에 반응하는
유일한 경로 `holdsWaitingOn` → `rescanWaiting`(`server/worker/attach.js`)은 **세션이
떴다가 `waiting`으로 정산된 attempt**의 `cause_detail.blockers[].rig`만 본다.
admission에서 거부된 큐 항목은 attempt가 없으므로 후보가 아니고, 60초 reconcile은
dispatch pass를 돌리지 않는다. 같은 레포 직렬 체인은 선행의 세션 종료·머지·정리가
같은 워크스페이스의 `tick`이라 안 보이던 문제다. 연결 레인이 없는 cross-repo
`blocks` 의존도 정확히 같은 이유로 막힌다.

### 1.3 `not_ready:open`은 진단이 아니다

`notReadyReason`은 `bd ready` 부재에 `bd show`의 status를 붙인 토큰이다
(`server/worker/scheduler.js` `notReadyReason`). "세션의 `in_progress` 잔여 claim"을
"의존 block"과 구별하려는 의도는 맞지만, 실제로 선행 대기인 경우에도 `⛔ not_ready
(open)`으로 그려져 사용자가 무엇을 기다리는지 읽을 수 없다.

### 1.4 `⚠ 의존 없음`이 선행 완료 뒤에 켜진다 (관측된 오탐)

연결 레인 행의 `mismatch`는 "바로 앞 멤버가 스냅샷 `bead_blocked_by`에 없다"로
판정한다(`app/views/worker/lane-model.js` `buildCrossLanes`). 그런데 그 맵은 닫힌
blocker를 이미 뺀 뒤다 — 같은 rig는 status로, foreign은
`pruneClosedForeignBlockers`로(`server/worker/foreign-blocker-status.js`). 따라서
선행이 `closed`되는 순간 후행 행에 `⚠ 의존 없음`이 켜지고 `has_mismatch`가 참이 되어
`재적용` 버튼이 선다. 스크린샷이 그 상태다. `bd show UI-n28d --json`에는 의존이 그대로
있었다.

### 1.5 병렬인지 직렬인지 읽을 수 없다

연결 레인 행의 위치 칩은 UI-jaua §8이 "지금 막혀 있나"만 답하게 바꿨고 큐 종류·순번은
툴팁으로 내렸다. 그 결정은 유지한다. 다만 큐 밖 멤버의 `미적재`는 §1.1의 확정 적재를
전제한 문구라, 확정이 적재하지 않게 되면 "아직 진행하지 않았다"를 어긋남처럼 읽게 한다.

## 2. 검증된 전제

- admission 기록의 shape는 `{ reason: string, at: number, stale?: true, stale_work? }`이고
  `recordAdmission`은 reason 문자열을 enum으로 검증하지 않는다(`server/worker/queue-store.js`
  `recordAdmission`, `AdmissionRecord`). 같은 reason의 재기록은 no-op이다. 기록은
  발차 성공 직후 `clearAdmission`으로 지워진다(`scheduler.js` dispatch 경로).
- 거부 지점은 둘이다: `runPass` 후보 순회에서 `snapshotBead`가 `!ready || blocked`를
  돌려줄 때 `recordSkipReason(workspace, bead_id, notReadyReason(snap))`, 그리고 `dispatch()`
  안의 같은 재검사. `dequeueIfClosed`가 먼저 닫힌 bead를 빼낸다.
- `unresolvedBlockersOf(workspace, issue)`는 `issue.dependencies`의 `blocks` 엣지를 돌며
  같은 rig는 `readStatus`, foreign(`external === true`)은 캐시 없는
  `queryForeignBlockerStatus`로 판정하고, 관측 실패나 엣지 부재면 `null`, 아니면
  `PrerequisiteBlocker[] = { id, rig, status }[]`를 돌려준다. `deps.bd.readIssue`가 그 입력이다.
- `rescanWaiting`은 워크스페이스당 leading + cover(2초, max-wait 30초) throttle 안에서
  `runWaitingRescan`을 돌린다. 후보는 `status === 'waiting'`이고 최신 구현 attempt이며
  레인에 있고 `claimed`·active·paused·`dispatch_refused`·`cleanup_pending`이 아닌 것.
  후보가 비면 bd를 읽지 않고, 있으면 `readyBeadIds()` 한 번, 교집합이 있으면 `tickPass`.
- 외부 활동 버스는 `publishWorkspaceActivity(root)`(owner attachment의 `fire()`와 외부
  `tick()` 진입)와 `onWorkspaceActivity` 리스너다. 수신 attachment의 `holdsWaitingOn(root)`는
  `queue.attempts` 중 `waiting`의 `cause_detail.blockers[].rig`가 `cachedIssuePrefixFor(root)`와
  같을 때(prefix 미상은 일치) 참이다. in-memory 판정만 하고 bd를 부르지 않는다.
- `worker-queue-place`는 `{ bead_id, lane?, index?, expected_revision }`이고 새 적재와
  레인 간 이동이 같은 op다 — 서버가 원 레인에서 빼고 삽입한다(`app/protocol.md`).
  `worker-queue-arm`은 병렬 행에만 쓰고 큐에 없는 id는 조용히 무시한다.
- `▶ 진행`은 `app/views/monitor/index.js` `runLane`이다: `row.unplaced`인 행만 병렬 끝에
  `place`하고, 레인이 걸친 레포마다 전 멤버 id로 `arm`을 보낸다. 직렬 레인 멤버는
  `unplaced`가 아니므로 place되지 않고 arm은 병렬 행에만 쓰이므로 무시된다 — UI-ajkz가
  기록한 구멍이다.
- `row.unplaced = !location || state === 'runnable'`이고 `has_mismatch = confirmed ∧
  (row.mismatch ∨ row.unplaced)`다. `chainRowLocation`은 큐 안이면 `🔒 대기`/`대기`, 큐
  밖이면 `chainScopeLabel`(`미적재`/`외부`/`위치 미확인`), 그 외 `▶ 실행중`·
  `blockerLocationLabel`이다.
- Worker 탭은 `cross_lanes`를 일부러 받지 않는다(`app/views/worker/index.js` `laneModel`:
  "연결 레인은 모니터 탭의 사실"). Monitor 탭의 병렬 대기 행은 `연결 n` 소속 칩(슬롯 5)과
  `▶ 연결 n` 발차 칩(슬롯 4a)을 이미 그린다(UI-8x90 §5.1).
- waiting 타일은 `cause_detail.blockers`를 `wait.blockers`로 투영하고 `blockedByFields`가
  그것을 `bead_blocked_by`와 합쳐 `⛓ <ID>` 열리는 칩으로 그린다
  (`lane-model.js` `waitProjection`·`blockedByFields`). admission 뱃지는
  `admissionBadge`가 `⛔ <code> (<detail>)` 문자열로 만들고 `miniRow`가 `.worker-mini__reason`
  span으로 그린다 — 판정 칩이 아니다.
- ADR 0023: 복귀 트리거는 이벤트 구독이고 cadence 타이머를 두지 않는다. 판정은 요청 rig의
  `bd ready` 한 번, 복귀는 `tickPass`, not-ready에는 아무것도 쓰지 않는다.

## 3. 사용자 결정

1. 처리는 연결 레인 소속이 아니라 **foreign `blocks` 의존의 존재**에 건다. 레인은 순서를
   적고 발차를 켜는 도구이고 실행 진실은 의존 그래프다. 레인 없이 의존만 있어도 이어진다.
2. `확정`은 의존만 만들고 큐 적재를 하지 않는다. `▶ 진행`이 적재+arm을 맡는다.
3. 직렬 레인에 있는 멤버는 `▶ 진행`이 병렬 큐로 옮긴 뒤 arm한다(UI-ajkz 후보 1).
4. 레포별 크로스레포 직렬 영역은 만들지 않는다 — 순서 정본이 셋(cross-lanes·의존·레포
   레인)이 되고 arm 전파 경로를 다시 깔아야 한다.
5. Worker 탭에 연결 레인 소속 칩을 새로 달지 않는다(설계 제시에서 승인). Monitor 병렬
   대기 행의 기존 칩으로 충분하고, §3-2 뒤에는 큐에 있는 멤버가 곧 발차된 멤버다.

## 4. 설계 원칙

- 거부 사유는 상태 복사가 아니라 진단이다. 증명할 수 있을 때만 진단을 쓰고, 못 하면
  현행 토큰으로 fail-quiet한다.
- 복귀는 이벤트 구독이다(ADR 0023 계승). 후보 집합만 넓히고 판정(`bd ready` 한 번)·
  throttle·`tickPass`는 그대로다.
- 확정은 durable 의존을, 진행은 실행 상태를 쓴다. 두 조작이 같은 것을 쓰지 않는다.
- 되돌리는 것은 만든 것뿐이다(UI-jaua §4). 진행이 옮긴 직렬 레인 멤버는 그 레인의 정지·
  삭제가 되돌리지 않는다 — 큐 위치는 사용자가 다시 끌면 된다.
- 재료가 없는 표시는 그리지 않고, 판정 재료가 이미 닫힌 사실이면 그 판정을 하지 않는다.

## 5. 범위 1 — admission 거부 사유 `prerequisite_unmet`

### 5.1 기록

`AdmissionRecord`에 선택 필드를 더한다.

```
blockers?: Array<{ id: string, rig: string|null, status: string }>
```

`recordAdmission` 입력에 `blockers`를 받아 배열이면 그대로 저장한다(원소는
`PrerequisiteBlocker`와 같은 shape이고 `normalizeStaleWork`처럼 검증한다: `id` 비어 있지
않은 문자열, `rig` 문자열 또는 `null`, `status` 문자열; 하나라도 어긋나면 필드를 버린다).
같은 reason·같은 `blockers`(id·status 순서 동일)의 재기록은 현행처럼 no-op이다. 로드 시
검증은 `stale_work`와 같은 자리에서 한다. `publicAdmissions`는 `blockers`를 그대로 내보낸다.

### 5.2 판정 위치

`runPass`와 `dispatch()`의 not-ready 거부 지점 둘 다에서, `recordSkipReason(...,
notReadyReason(snap))` 앞에 한 단계를 넣는다.

```
blockers = await prerequisiteBlockersOf(workspace, bead_id, snap)
if (blockers !== null && blockers.length > 0)
  recordSkipReason(workspace, bead_id, 'prerequisite_unmet', { blockers })
else
  recordSkipReason(workspace, bead_id, notReadyReason(snap))      // 현행
```

`prerequisiteBlockersOf`는 `snap.status === 'open'`이고 `deps.bd.readIssue`가 있을 때만
돈다 — `readIssue(bead_id)`로 `dependencies`를 읽고 `unresolvedBlockersOf(workspace,
issue)`에 넘긴다. 어느 단계든 throw나 `null`이면 `null`이다(fail-quiet → 현행 토큰).
`in_progress`·`resolved` 등 `open`이 아닌 status는 의존이 원인이 아니므로 현행 토큰이
맞다(`notReadyReason` 주석의 의도 그대로).

비용: 거부 1건당 `bd show` 1회 + 같은 rig blocker당 `readStatus`(`bd show`) 1회 + foreign
blocker당 `bd -C <root> show` 1회. `bd show`는
`last-touched`를 써서 자기 감시를 울리지만 그 이벤트는 `rescanWaiting`(`bd ready` 1회,
후보가 다시 not-ready)과 parked 스캔으로 끝나며 이 스펙 이전의 `runPass`가 이미 만드는
이벤트와 같은 종류다. 새 루프는 없다 — 재스캔은 admission을 쓰지 않는다(§6.2).

`recordSkipReason`의 시그니처는 `(workspace, bead_id, reason, stale_work, blockers)`가
아니라 옵션 객체 하나를 더 받는 형태로 바꾼다: `(workspace, bead_id, reason, extra?: {
stale_work?, blockers? })`. 현행 호출자 중 `refuseDispatch(workspace, bead_id, reason,
stale_work)`는 `stale_work`를 네 번째 인자로 그대로 넘기고 있으므로 **`{ stale_work }`로
감싸도록 함께 고친다** — 빠뜨리면 `worktree_stale_work` 진단(`stale_work` 요약·digest)이
조용히 사라진다. 기존 stale-work admission 기록 테스트가 그 회귀를 잡는다(§12).

**판정 대상은 모든 미해결 `blocks` 선행이다** — 같은 rig(`rig: null`, `readStatus`)와
foreign(`rig` 있음, `queryForeignBlockerStatus`) 둘 다 `blockers`에 실린다.
`unresolvedBlockersOf`가 그렇게 돌려주고, "무엇을 기다리나"라는 질문에 rig는 무관하다.
foreign 여부는 §6.1의 외부 활동 매칭에서만 의미가 있다. 사용자 승인 문구(설계 제시 §1
"미해결 선행이 있으면 `⛓ 선행 대기`, 선행이 없을 때만 `not_ready`")가 이 범위이며, §3-1의
"foreign 의존의 존재에 건다"는 트리거 원천(연결 레인이 아니라 의존)을 말한 것이지 같은
rig 선행을 제외한 것이 아니다.

### 5.3 지우는 시점

현행 규칙(발차 성공 시 `clearAdmission`)에 하나를 더한다: §6.2의 재스캔이 `bd ready`
교집합으로 복귀를 확인한 bead의 `prerequisite_unmet` 기록을 `tickPass` **전에** 지운다.
슬롯이 없어 그 pass에서 발차되지 않아도 "선행 대기" 뱃지가 닫힌 선행을 가리키며 남지
않게 하기 위해서다. ready에만 쓰고 not-ready에는 쓰지 않으므로 ADR 0023의 "not-ready에
아무것도 쓰지 않는다"와 어긋나지 않는다. 지우는 대상은 reason이 `prerequisite_unmet`인
기록뿐이다 — `spec_review_stale`·stale-work 등 사람의 처분을 기다리는 기록은 건드리지
않는다.

### 5.4 표시

`admissionBadge`에 분기를 하나 더한다: `reason === 'prerequisite_unmet'`이고 `blockers`가
비어 있지 않으면 라벨은 `⛓ 선행 대기`다(`⛔` 접두가 아니므로 `candidateCard`의 danger
스타일을 타지 않는다). `blockers[]`는 waiting 타일의 `wait.blockers`와 같은 경로로
`blockedByFields`에 합쳐져 슬롯 4a의 `⛓ <ID>` 열리는 칩이 된다(이미 `bead_blocked_by`에
같은 id가 있으면 중복하지 않는다 — 선행 대기 tier §5.1과 같은 규칙). 타 rig는 색만
다르고 클릭은 그 이슈 상세다. `blockers`가 없거나 비어 있으면 현행 `⛔ prerequisite_unmet`
로 떨어진다(fail-quiet). 슬롯: 뱃지는 1번 정체성(`reason` 자리), 칩은 4a. 새 슬롯은 없다.

## 6. 범위 2 — 복귀 구독 후보 확대

### 6.1 `holdsWaitingOn(root)`

현행 `attempts` 순회에 더해 `queue.admission`을 순회한다: `reason === 'prerequisite_unmet'`
이고 `blockers[]` 중 `rig !== null ∧ (prefix === null ∨ rig === prefix)`인 항목이 있으면
참. in-memory 판정만이라는 성질은 그대로다. 같은 rig 선행(`rig === null`)은 자기
`fire()`가 `rescanWaiting`을 부르므로 여기서 볼 필요가 없다.

### 6.2 `runWaitingRescan(workspace)`

후보 집합을 합집합으로 넓힌다.

```
candidates = waiting attempt 후보(현행)
           ∪ { bead_id ∈ queue ∪ serial_lanes 엔트리
               | admission[bead_id].reason === 'prerequisite_unmet'
               ∧ ¬claimed ∧ ¬activeBeadIdsFrom(q) ∧ ¬leafPausedBeads(q)
               ∧ ¬dispatch_refused ∧ ¬cleanup_pending }
```

`readyBeadIds()` 1회, `returned = candidates ∩ ready`는 현행. `returned`가 비어 있지 않으면
그 중 admission 후보에서 온 bead의 기록을 `clearAdmission`으로 지우고(§5.3) `tickPass`.
`{ checked, returned }` 반환값은 두 집합의 합으로 센다.

직렬 레인 head가 아닌 직렬 레인 멤버도 후보에 넣는 이유: 후보가 되어도 발차는
`tickPass`의 현행 규칙(head만)이 정한다. 재스캔은 "다시 물을 가치가 있나"만 답한다.

### 6.3 트리거 지점

새 트리거는 없다. `fire()`(같은 rig bd 변경), 외부 활동 버스(§6.1), attachment 시작 시
1회 — 셋 다 현행이다. cadence 타이머를 더하지 않는다(ADR 0023).

### 6.4 ADR 0023과의 관계

0023의 결정 조항 "재스캔은 레인에 있는 최신 `waiting` 행만 후보로 삼는다"를 이 스펙이
뒤집는다. 이벤트 구독·cadence 없음·`bd ready` 한 번·`tickPass`·throttle·"not-ready에
아무것도 쓰지 않는다"는 전부 계승한다. `결정 (ADR 후보)` 절이 supersede를 적는다.

## 7. 범위 3 — 확정과 진행 분리

### 7.1 `planLaneConfirm`·`planLaneReapply`

두 함수에서 `placeUnplacedMembers` 호출을 뺀다. `queue_ops`는 빈 배열이 된다.
`placeUnplacedMembers`·`placeOp`는 다른 호출자가 없으면 지운다. `planDrop`의 draft 드롭은
현행대로 적재하지 않는다(변화 없음).

`재적용`의 의미는 "빠진 인접 의존 복구"만 남는다. §9.2가 버튼 조건을 그에 맞춘다.

### 7.2 `runLane` (`▶ 진행`)

적재 대상을 `row.unplaced`에서 **"병렬 큐에 없는 행"**으로 넓힌다. 행이 직렬 레인
(`location.lane`이 `s1..s5`)에 있으면 같은 `worker-queue-place` `{ bead_id, lane:
'parallel', index }`를 보낸다 — 서버가 원 레인에서 빼고 병렬에 삽입하는 현행 op 의미다.
index 규칙은 현행(병렬 raw 길이 + 같은 레포 offset). 고정 행(실행중·PR 대기·완료)은
현행대로 대상이 아니다.

순서는 레포마다 place(들) → arm이고, 각 성공 응답의 `revision`을 다음 op의
`expected_revision`으로 넘기는 현행 규약을 지킨다. 부분 실패 시 토스트와 `▶ 이어서 진행`
재시도는 현행이다 — 옮겨진 직렬 멤버는 이미 병렬에 있으므로 재시도에서 다시 옮기지
않는다.

`⏸ 정지`·레인 `✕`·행 `✕`는 큐 위치를 되돌리지 않는다(§4). 되돌릴 durable 상태는 arm뿐이고
현행 `disarm`이 그것을 한다.

### 7.3 UI-ajkz

이 절이 UI-ajkz(직렬 레인 멤버를 `▶ 진행`이 발차시키지 못함)의 후보 1을 채택해 그 Bead가
묻는 설계 선택을 닫는다. Bead 처분은 §14.

## 8. 범위 4 — 연결 레인 행 위치 칩

`chainRowLocation`의 라벨 표를 바꾼다. 툴팁 규칙(`<레포> <레인> #<n>`)은 유지한다.

| 행의 위치 | 현행 | 변경 |
|---|---|---|
| 큐 밖, confirmed 레인, 같은 rig | `미적재` | `진행 대기` |
| 큐 밖, draft 레인 | `미적재`/`외부`/`위치 미확인` | 유지 |
| 큐 안, admission `prerequisite_unmet` | `🔒 대기` | `⛓ 선행 대기` |
| 큐 안, `bead_blocked_by`에 열린 blocker | `🔒 대기` | `🔒 대기` (유지) |
| 큐 안, 그 외 | `대기` | `대기` |
| 실행중·PR 대기·완료·외부·위치 미확인 | 유지 | 유지 |

`⛓ 선행 대기`가 `🔒 대기`보다 앞서는 이유: 전자는 스케줄러가 증명한 진단이고 후자는
표시 캐시의 추정이다.

**재료 배선.** `buildCrossLanes`는 지금 workspace 스냅샷도 `admission`도 받지 않는다 —
`admission`은 `buildLanes` 안에서 workspace마다 읽는 지역값이다. 그래서 `buildLanes`가
보이는 workspace 전부의 `admission`을 `Map<bead_id, AdmissionRecord>`로 모아
`buildCrossLanes`에 인자 하나로 넘기고(`blocked_by_map`·`locations`와 같은 방식의
cross-workspace 합집합), `chainRowLocation`이 그 맵을 읽는다. 새 프로토콜 필드는 없고
`lane-model.js` 내부 배선뿐이다. 같은 bead가 두 workspace에 있을 수 없으므로 충돌
규칙은 필요 없다. 병렬/직렬 구분은 §7 뒤에는 병렬뿐이므로 라벨에
올리지 않는다(UI-jaua §8 결정 유지).

## 9. 범위 5 — `⚠ 의존 없음` 오탐과 `재적용` 조건

### 9.1 `mismatch`

```
previous_row = rows.length > 0 ? rows[rows.length - 1] : null   // 직전에 push한 행 객체
mismatch = confirmed ∧ previous_row !== null
         ∧ !previous_row.done                                     // 추가
         ∧ !(blocked_by_map.get(bead_id) ?? []).includes(previous_row.id)
```

`previous`는 지금 id 문자열이라 `rows[previous]`로는 접근할 수 없다 — 행 객체를 잡아 그
`done`을 읽는다.

바로 앞 멤버가 `완료`면 의존은 이미 이행된 것이고, 그 사실은 열린 blocker 목록에서
읽을 수 없다. `blocked_by_map`에 키가 없는 경우의 현행 처리(어긋남으로 봄)는 그대로다 —
UI-jaua §6.1의 보류 판정이 `확정` 앞에서 그 미확정을 따로 막는다.

### 9.2 `has_mismatch`

`has_mismatch = confirmed ∧ rows.some(row => row.mismatch)`. `unplaced`를 뺀다 — §7 뒤에는
큐 밖이 정상 상태(`진행 대기`)이고 복구 조작은 `재적용`이 아니라 `▶ 진행`이다.

## 10. 에러 처리

- §5.2의 조회 실패는 현행 토큰으로 떨어진다. 화면은 지금과 같다.
- §6.2에서 `readyBeadIds` throw는 현행대로 로그 후 반환(다음 이벤트가 다시 묻는다).
- §7.2에서 직렬 → 병렬 place가 CAS 충돌·거부되면 그 레포의 arm을 보내지 않고 토스트한다
  (현행 부분 실패 경로). 이미 옮겨진 멤버는 되돌리지 않는다.
- admission `blockers` 검증 실패는 필드만 버린다(§5.1) — reason은 남아 `⛔ prerequisite_unmet`
  로 그려진다. 진단은 잃지만 발차 판정에는 영향이 없다.
- 구서버(`blockers` 없는 스냅샷)에서 클라이언트는 현행 뱃지 문자열로 그린다.

## 11. 재현

- **12su → n28d.** 확정: dep-add만, UI-n28d는 큐 밖 `진행 대기`. `▶ 진행`: beads-ui 병렬
  끝에 place + arm → tick → `snapshotBead` not ready → `readIssue` → foreign `dotfiles-12su`
  `in_progress` → admission `{ prerequisite_unmet, blockers:[{id:'dotfiles-12su', rig:'dotfiles',
  status:'in_progress'}] }` → 행 `⛓ 선행 대기`, Worker 탭 `⛓ 선행 대기 · ⛓ dotfiles-12su`.
  dotfiles가 12su를 close → dotfiles attachment `fire()` → 활동 버스 → beads-ui
  `holdsWaitingOn` 참(admission blockers rig `dotfiles`) → `rescanWaiting` → `bd ready` ∋
  UI-n28d → `clearAdmission` → `tickPass` → dispatch. `⚠ 의존 없음`은 12su가 `완료`라
  켜지지 않는다.
- **레인 없는 cross-repo 의존.** 사람이 Worker에서 후행을 큐에 올린다 → 같은 admission 경로
  → 선행 close → 같은 복귀 경로. 레인 유무가 경로를 바꾸지 않는다.
- **직렬 레인 멤버.** 후행이 `s1`에 있는 채 `▶ 진행` → place(lane parallel)로 이동 → arm →
  이후 동일.

## 12. 검증 bundle

- `server/worker/queue-store.test.js`: `recordAdmission`이 유효한 `blockers`를 저장하고
  잘못된 원소는 필드를 버린다; 같은 reason·같은 blockers는 no-op; 로드 검증; `publicAdmissions`
  통과.
- `server/worker/scheduler.test.js`: (a) not ready + open + 미해결 blocker(같은 rig·foreign
  각 1건) → `prerequisite_unmet` + blockers; (b) blocker 없음/조회 실패/`in_progress` → 현행
  `not_ready:<status>`; (a') `refuseDispatch` 경로의 `worktree_stale_work` 기록이 `stale_work`
  요약을 그대로 싣는다(현행 회귀 테스트 유지); (c) `runWaitingRescan`이 admission 후보를 세고 ready 교집합에서
  `clearAdmission` 뒤 `tickPass`; (d) 후보가 admission뿐이고 not-ready면 아무것도 쓰지 않는다;
  (e) `spec_review_stale` 기록은 재스캔이 지우지 않는다.
- `server/worker/attach.test.js`(또는 현행 위치): `holdsWaitingOn`이 admission blockers rig로
  참이 된다; 같은 rig(`rig: null`)만 있으면 거짓.
- `app/views/monitor/drop-plan.test.js`: `planLaneConfirm`·`planLaneReapply`의 `queue_ops`가
  빈 배열; dep op는 현행. 확정·재적용의 placement를 기대하던 현행 drop-plan·Monitor index·
  Monitor E2E 테스트의 기대값은 이 결정에 맞춰 갱신한다(구현 코드를 테스트에 맞추지 않는다).
- `app/views/monitor/index.test.js`: `runLane`이 직렬 레인 행에 `worker-queue-place`
  `{lane:'parallel'}`를 보내고 이어서 arm; 병렬 행은 place하지 않는다.
- `app/views/worker/lane-model.test.js`: `admissionBadge` `⛓ 선행 대기`; `blockedByFields`가
  admission blockers를 합친다; `chainRowLocation` 표 §8; `mismatch`가 앞 멤버 `done`이면
  거짓; `has_mismatch`가 `unplaced`를 세지 않는다.
- `app/protocol.md`: admission `blockers` 필드, `worker-queue-arm`/`place` 문단에 진행이
  직렬 멤버를 옮긴다는 한 줄.
- Pre-Handoff: `npm run tsc`, `npx vitest run --reporter=dot`, `npm run lint`,
  `npm run prettier:write`, `npm run build`.

## 13. 구현 unit 후보

- `server`: §5·§6 — `queue-store.js`·`scheduler.js`·`attach.js`·`worker-handlers.js`
  (`publicAdmissions`)·`protocol.md`.
- `view`: §7·§8·§9 — `drop-plan.js`·`monitor/index.js`·`lane-model.js`·`lanes.js`.

## 14. 경계·후속

- 비목표: Worker 탭에 `cross_lanes`를 넘기는 것(§3-5). 레포별 크로스레포 직렬 영역(§3-4).
  `▶ 진행`의 트랜잭션화. `bead_blocked_by` 캐시 TTL(5분) 단축 — §8이 admission 진단을
  앞세워 표시 지연의 실익이 사라진다.
- 관찰: UI-ajkz — 이 스펙 §7이 그 Bead의 설계 선택을 닫는다. 구현 착지 뒤 중복으로 close할지는
  사용자 판단이며 이 스펙은 Bead를 만들거나 닫지 않는다.
- 관찰: `dispatch()` 안의 두 번째 거부 지점은 `runPass`가 이미 판정한 뒤라 대부분 같은
  답을 낸다. 두 곳 모두 §5.2를 적용하되 `readIssue`는 pass당 bead당 1회로 메모해도 된다 —
  구현 재량.

## 결정 (ADR 후보)

- admission 거부는 선행 대기를 진단으로 기록하고 복귀 구독의 후보가 된다. 되돌리기 어려움:
  기록 shape와 재스캔 후보 집합이 스케줄러·attach·클라이언트 세 소비자에 걸친다. 맥락 없이
  놀라움: 상태 복사 토큰 대신 증명된 blockers를 쓰고 ready에서만 지우는 규칙은 코드만
  보면 이유가 없다. 실재한 대안: cadence 재도입·레포별 직렬 영역·연결 레인 전용 트리거.
  tradeoff: 선택안은 거부 1건당 `bd show` 몇 회를 더 내는 대신 ADR 0023의 비용 상한(이벤트당
  `bd ready` 1회, 무이벤트 0회)과 단일 판정자를 지킨다 — cadence는 상한을 깨고, 레포별
  직렬 영역은 순서 정본을 셋으로 늘리며, 레인 전용 트리거는 레인 없는 의존을 버린다.
  `summary`: "Worker의 복귀 트리거는 이벤트 구독이며 재스캔 후보는 waiting attempt와
  `prerequisite_unmet` admission 큐 항목이다 — 판정은 요청 rig의 `bd ready` 한 번, 복귀는
  `tickPass`, not-ready에는 쓰지 않고 ready에서만 그 admission을 지운다" → ADR, supersede 0023
- 연결 레인 `확정`은 의존만 쓰고 `▶ 진행`이 적재와 arm을 쓴다. 되돌리기 어려움: 확정 레인의
  큐 밖 멤버가 정상 상태가 되어 위치 칩·`재적용` 조건·진행 대상이 그 전제 위에 선다. 맥락
  없이 놀라움: `auto_advance` ON 레포에서 확정이 발차였던 과거를 모르면 분리 이유가 안
  보인다. 실재한 대안: 큐에 넣되 보류 플래그로 후보에서 빼는 방식. tradeoff: 선택안은
  확정 뒤 멤버가 큐 순번을 미리 차지하지 못하는 대신 스케줄러에 새 후보 필터를 두지 않고
  `arm`의 현행 의미(후보 확대)를 그대로 쓴다 — 보류 플래그는 순번을 지키지만 `auto_advance`
  ON에서도 후보를 빼는 두 번째 축을 만들어 §5.2의 `armed_only` 규칙과 겹친다. `summary`: "연결 레인
  확정은 blocks 의존만 만들고 큐 적재와 arm은 ▶ 진행이 한다 — 직렬 레인 멤버는 진행 시
  병렬 큐로 옮긴다" → ADR
- `⚠ 의존 없음`은 앞 멤버가 완료면 판정하지 않는다. 오탐 정정이고 되돌릴 이유가 없으며
  대안이 없다 → ADR 아님
- 위치 칩 `진행 대기`·`⛓ 선행 대기` 문구. 표시 규칙이고 UI-jaua §8 결정 안의 조정이라
  세 조건 모두 불성립 → ADR 아님
