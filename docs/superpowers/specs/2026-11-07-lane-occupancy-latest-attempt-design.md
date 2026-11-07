---
scope:
  - server/worker/scheduler.js
  - server/worker/queue-store.js
  - app/views/worker/lane-model.js
  - app/views/worker/running-grid.js
  - app/views/monitor/card-parity.test.js
  - app/utils/placement/compute.js
  - app/views/worker/placement.js
---

# 직렬 대기줄 점유는 Bead의 최신 attempt로 판정하고, 선행 이슈는 병렬 레인에 둔다 (UI-ey6v)

## 1. 목표

출처는 CRC-rokit `rokit-471`(2026-11-07)이다. 잔재 처분에 실패한 attempt `-12`가 직렬 대기줄 `s1`을
잡은 채, 그 뒤의 새 attempt가 선행 이슈 `rokit-50d`를 만들고 `대기 · blocks:rokit-50d`로 끝났다.
`rokit-50d`는 `s1` 맨 앞에 놓였지만 `-12`의 점유 때문에 시작하지 못했고, `rokit-471`은
`rokit-50d`가 닫혀야 돌 수 있어 교착이 됐다. 화면은 끝난 `rokit-471`을 「실행 중 · 점유」로 불렀고,
실행 중 레인에도 대기 행에도 카드가 없었다.

이 스펙이 정하는 동작은 넷이다.

1. 점유는 Bead의 최신 구현 attempt로 판정한다. 끝난 attempt가 최신이 아니면 대기줄을 잡지 않는다.
2. 점유 행의 표기는 그 attempt의 실제 상태를 말하고, 근거 없이 「실행 중」이라고 부르지 않는다.
3. 구현 도중 선행 대기에 들어간 Bead는 선행이 열린 동안 실행 중 레인에 카드로 보인다. 슬롯에는 세지 않는다.
4. 이미 대기열이나 점유에 있는 상대를 막는 선행 이슈는 병렬 레인에 놓는다. 세션 배치 절차와 배치안
   계산이 같은 규칙을 따른다.

## 2. 검증된 전제

인용은 base `cc90c986717303da006e4f2bc05ae3cb6ae92bbd` 기준이다(UI-68r5 착지 뒤).

- 점유 판정은 다음 attempt가 `resumed_from`으로 잇지 않은 attempt를 모두 leaf로 보고, 상태가 해제 집합 밖이면 그 lane을 점유로 센다. 같은 Bead에 더 새로운 attempt가 있는지는 보지 않는다 — server/worker/scheduler.js:1242-1270
- 해제 집합은 `done`·`stopped`·`discarded`·`waiting`이고, 끝난 상태 집합은 여기에 `failed`·`orphaned`·`parked`·`retry_wait`·`superseded`를 더한다 — server/worker/queue-store.js:2326-2367
- 이관 판정도 같은 leaf·해제 집합을 읽어 "lane을 잡은 기록"을 큐에 남긴다. 이관은 삽입 순서의 접미를 남기므로, 삽입 순서 최신 기록은 이력이 통째로 떠나기 전에는 사라지지 않는다 — server/worker/queue-store.js:6468-6480, 6506
- 원래 설계는 "최신 leaf attempt가 실패·orphaned·paused여도" 점유를 유지한다고 적었다 — docs/superpowers/specs/2026-08-13-worker-lane-scheduling-design.md:152-156
- 선행 대기가 lane을 푸는 이유는 "선행을 닫는 형제가 같은 레인에서 못 돈다"이다 — docs/superpowers/specs/2026-08-28-worker-prerequisite-wait-tier-design.md:72
- 실행 중 좌석은 이미 `latestImplementationAttempts`로 Bead의 최신 구현 attempt를 고른다 — app/utils/active-attempts.js:68-91, 503
- 재현: 실제 큐에서 `rokit-471`의 최신 attempt는 `-5`(`waiting`·`prerequisite_unmet`)인데 `activeLaneLineages`가 `s1 → rokit-471`을 돌려준다. 원인 기록은 `-12`(`failed`·`resumed_from` 없음)다. — `~/.local/state/bdui/CRC-rokit-b45eb569227a/queue.json`을 `activeLaneLineages`에 넣어 실행
- 점유 행 표기는 실행 타일의 `run_state` 또는 마지막 구현 attempt 상태를 읽고, 실패·일시정지가 아니면 모두 「실행 중 · 점유」다. 그래서 `parked`·`retry_wait`·`provider_hold`와 폐기 중인 `waiting`도 「실행 중」이 된다 — app/views/worker/lane-model.js:4129-4156
- 점유자로 잡힌 Bead는 대기 행으로 그리지 않는다. 그래서 `rokit-471`은 점유 행 말고는 어디에도 없었다 — app/views/worker/lane-model.js:4187-4195
- `waiting`·`prerequisite_unmet`은 실행 중 그리드에서 빠지고 대기 행이 대표한다 — app/views/worker/lane-model.js:864-871; docs/superpowers/specs/2026-09-16-serial-lane-stack-waiting-row-demotion-design.md:75-83
- 대기 타일 본문(4a 칩과 `폐기`)과 「선행 대기」 라벨은 이미 있다 — app/views/worker/running-grid.js:1000, 1806
- 슬롯 수는 `run_state === 'running'`만 세고, 서버 카운트의 좌석 판정은 `waiting`을 모른다 — app/views/worker/lane-model.js:4954; app/utils/active-attempts.js:503
- 선행 대기 종결은 worktree HEAD를 `head_oid`로 기록하고, `attemptHasPreservedWork`가 같은 `head_oid !== base_oid` 비교로 보존 작업을 판정한다 — server/worker/scheduler.js:8836, 20651-20680
- 실측: 저장된 선행 대기 attempt 33건 중 `head_oid !== base_oid`가 9건이고 `rokit-471`의 3건이 모두 포함된다. `-1`은 `base_oid`가 없다 — 전 워크스페이스 `queue.json` 집계
- 세션 배치 절차는 blocks 간선과 scope 겹침으로 상대의 lane을 따르고, 상대가 점유 중이면 그 lane을 고른다 — dotfiles src/shared/skills/flow/workflow/references/execution-worker-lane.md:82-100
- 실제로 `rokit-50d`·`rokit-09a`·`rokit-ctq`가 모두 `s1#0`에 배치됐다 — `bd -C ~/GitHub/CRC-rokit show` notes의 `lane_placed:`
- 배치안 계산은 대기·점유 상대와의 제약(`blocks` 포함)을 `k_items`로 모아 그 lane을 고르고, 제약을 못 맞추면 `uncovered` 경고를 낸다 — app/utils/placement/compute.js:635-684, 765
- 표시 카드는 Worker와 모니터가 같은 `buildLanes`에서 받는다 — AGENTS.md "워커·모니터 카드 배치 문법"; app/views/worker/index.js:2070; app/views/monitor/index.js:1902
- `blockedByFields`는 `bead_blocked_by`에 키가 있으면 그 값을 열린 선행으로 쓰고, 키가 없으면 지금 값·동결 선행·admission `blockers`의 합집합을 쓴다 — app/views/worker/lane-model.js:3622-3668
- 실행 중 레인에 잡힌 Bead는 `claimed`에 들어가 대기 행을 그리지 않는다 — app/views/worker/lane-model.js:3900-3904, 4038-4042
- `queue-place.js`는 받은 lane에 넣을 뿐 레인을 고르지 않는다 — server/worker/queue-place.js:132-178
- 배치안 묶음은 고른 후보끼리의 제약으로 잇는다 — app/utils/placement/compute.js:483-522
- `[전체 적용]`은 한 행을 보낼 때마다 남은 후보로 다시 계산하고, 자리가 표와 다르면 `moved`로 멈춘다 — app/utils/placement/apply.js:289-300
- `uncovered` 경고 문구는 상대를 직렬 레인으로 옮기면 동시 실행을 피할 수 있다고 말한다 — app/views/worker/placement.js:535-547
- ADR UI-hf8v는 같은 파일을 선언한 쌍을 고정 부딪힘으로, 폴더만 겹치는 쌍은 jev가 높은 확신으로 독립이라 할 때만 병렬로 둔다 — docs/adr/UI-hf8v-monitor-full-placement-plan.md:175, 189

## 3. 설계

### 3.1 점유 판정

구현 attempt가 끝난 상태(`TERMINAL_ATTEMPT_STATUSES`)이고 그 Bead의 최신 구현 attempt가 아니면 lane을
잡지 않는다. 그 밖의 판정(해제 집합, `resumed_from` leaf, `pr_wait`, 진행 중인 폐기)은 그대로다.

| 최신 attempt | 더 오래된 leaf | 결과 |
| --- | --- | --- |
| `waiting`(선행) | `failed` | 해제 — 이번 사고 |
| `running` | `failed` | 최신 attempt가 점유 |
| `failed` | 없음 | 점유 유지 — UI-4jcn의 의도 그대로 |
| `failed`(dismiss됨) | 없음 | 점유 유지 — dismiss는 해제가 아니다 |
| `done`, `pr_wait` 행 있음 | `failed` | `pr_wait`가 점유 |
| 아무 상태 | `running`·`paused` | 점유 유지 — 살아 있는 세션은 최신 여부와 무관하다 |

- 결정: 최신은 `q.attempts` 삽입 순서에서 그 Bead의 마지막 구현 attempt다(대안: 좌석의
  `latestImplementationAttempts`; 이유: 그 함수는 타임스탬프 순서라 시계가 되돌아간 이력의 부분 이관 뒤 지난
  실패가 최신으로 되살아날 수 있다. 삽입 순서 최신은 이관이 접미를 보존해 사라지지 않는다). 두 순서는 시계가
  되돌아갈 때만 갈리고, 좌석 판정은 바꾸지 않는다.
- 결정: 이관 판정은 점유와 같은 판정 하나를 공유한다 — `LANE_RELEASING_ATTEMPT_STATUSES`가 한 벌인
  것과 같은 이유다. 예: `queue-store.js`가 판정 함수를 내보내고 `activeLaneLineages`가 가져다 쓴다.
- 구현 attempt가 아닌 기록은 판정이 바뀌지 않는다. attempt의 `status`·`serial_lane_id`도 쓰지 않는다.
- 이미 생긴 교착: 점유는 읽을 때마다 다시 계산되므로 배포 뒤 저절로 풀린다. 이관(migration)이나 별도
  교착 감지는 만들지 않는다.
- 남는 경우: 최신 attempt 자체가 실패인데 사람이 그 선행을 같은 줄 앞에 직접 옮기면 선행은 시작하지
  못한다. 화면에는 「실패 · 점유 유지」로 보이고, 실패를 처리하거나 선행을 옮기면 풀린다.

### 3.2 점유 행 표기

점유 행 배지를 상태별로 정한다. 재료는 지금처럼 실행 타일의 `run_state`이고, 없으면 3.1과 같은 삽입 순서 최신
구현 attempt의 상태다. 새 슬롯은 만들지 않고 기존 배지 자리의 문구만 바꾼다.

| 상태 | 배지 |
| --- | --- |
| `pr_wait` 소속 | `PR 대기 · 점유` (그대로) |
| `running` | `실행 중 · 점유` |
| `paused` | `일시정지 · 점유` |
| `failed`·`orphaned` | `실패 · 점유 유지` |
| `parked` | `확인 필요 · 점유` |
| `retry_wait` | `재시도 대기 · 점유` |
| `provider_hold` | `공급자 보류 · 점유` |
| 진행 중인 폐기 작업 있음 | `폐기 중 · 점유` |
| 그 밖의 값이나 재료 없음 | `점유` |

폐기 판정은 위 상태 판정보다 먼저 본다(폐기 중인 Bead의 attempt 상태는 무엇이든 될 수 있다).
`rokit-471`처럼 최신이 `waiting`이면 3.1로 점유자가 아니므로 이 행이 아예 서지 않고, 대기 행이나 3.3
카드로 그려진다.

### 3.3 구현 도중 선행 대기 카드

**판정.** `status === 'waiting'`, `cause === 'prerequisite_unmet'`이고 `head_oid`가 있으며 `base_oid`와
다르면 구현 도중이다. `base_oid`가 없으면 다른 것으로 본다(`attemptHasPreservedWork`와 같은 비교).
`head_oid`가 없는 옛 기록은 구현 도중이 아니다(fail-quiet).

- 결정: 재료는 커밋 증거만 쓴다(대안: `resumed_from` 포함, 작업 트리 변경 관측 추가; 이유: 이어받기만
  한 attempt 6건은 커밋이 없고, 미커밋 관측은 새 필드가 필요하다. 커밋 없이 편집만 남긴 경우는 대기
  행에 남아 사라지지 않는다. 사용자 선택, 2026-11-07).

**표시 조건.** 구현 도중이면서 열린 선행이 하나라도 있는 동안 실행 중 레인에 타일로 그린다. 열린 선행은
칩과 같은 재료다: `bead_blocked_by`에 키가 있으면 그 값이고, 키가 없으면 지금 값·동결
선행(`cause_detail.blockers`)·admission `blockers`의 합집합이다(`blockedByFields`와 같다). 그 결과가 비면 타일이 아니다.

- 카드는 기존 대기 타일이다: 슬롯 1 배지 `선행 대기`, 슬롯 4a `⛓ <blocker ID>`, foot에 `폐기`. 이것이
  Bead의 「선행 대기 · <blocker ID>」이고 새 슬롯은 없다.
- 카드가 서면 그 Bead의 대기 행은 그리지 않는다. 외부 잡 대기 타일과 같은 규칙(`claimed`)이고, 대기 중에는
  그 행을 드래그할 수 없다(사용자 선택, 2026-11-07).
- 대기열 자리는 그대로 남고 선행이 모두 닫히면 대기 행으로 돌아온다. 자동 출발이거나 `[지금 시작]`을
  받으므로 카드에 새 버튼을 달지 않는다.
- 슬롯·실행 중 카운트·좌석·세션 제외 집합은 바뀌지 않는다. 이 타일은 `running`이 아니고 `activeAttemptStates`에
  들어가지 않기 때문이다. 테스트로 고정한다.
- 판정은 공유 함수 하나가 하고, `activeByBead`와 `prerequisite_wait_blockers`, `runningLaneBeadIds`의 결과가
  서로 어긋나지 않게 한다. 구현 도중이 아닌 선행 대기는 지금처럼 대기 행과 칩으로 그린다.

### 3.4 선행 이슈는 병렬 레인에 둔다

Bead가 **이미 대기열에 있거나 lane을 점유한 상대의 직접 `blocks` 선행**이면, 그 Bead는 다른 겹침과 상관없이
병렬 레인 끝으로 간다.

- 근거: 순서는 `blocks` 간선이 이미 보장하므로 같은 줄에 둘 이유가 없다. 같은 줄에 두면 상대의 점유에 막힐
  수 있고, 그것이 이번 교착이다.
- 결정: 선행은 scope가 겹치는 제3의 이슈가 있어도 병렬로 간다(대안: 겹침이 있으면 직렬 유지; 이유: 선행은
  다른 일을 풀어 주는 작업이라 줄에 묶이면 안 된다. 사용자 선택, 2026-11-07). 감수하는 것은 그 제3의 이슈와
  동시에 돌 수 있다는 점이고, 부딪히면 보통의 PR 충돌 처리로 푼다.
- 상대의 배치는 옮기지 않는다.

적용 위치는 두 곳이다.

- beads-ui 배치안 계산(`app/utils/placement/compute.js`):
  - 후보가 대기·점유 상대에 대해 `basis: 'blocks'`인 `c_first`이면 그 후보는 묶음을 잇지 않고 혼자 묶음이 되어
    `parallel` 끝으로 간다. 남은 후보는 그 후보 없이 묶음과 lane을 계산한다. 묶음 전체를 병렬로 보내지 않는다 —
    선행이 적용된 뒤의 재계산에서도 남은 후보의 자리가 같아 `[전체 적용]`이 `moved`로 멈추지 않는다.
  - `basis: 'blocks'` 줄에는 어떤 후보든 `uncovered`를 내지 않는다. 순서는 간선이 지키므로 동시에 돌지 않는다.
  - 이 선행 후보에 남은 다른 제약(대기·점유 상대나 이번에 고른 후보와의 `conflict`)에는 전용 경고를 낸다. 예: 코드
    `predecessor_parallel`, 문구 `⚠ 선행이라 병렬에 둠 — <상대>와 동시에 돌 수 있음`. 상대를 옮기라고 안내하지 않는다.
- dotfiles 세션 배치 절차: §5의 크로스 리포 unit으로 같은 규칙을 3·4단계에 더한다.

바꾸지 않는 것은 다음과 같다.

- 결정: 수동 `[↴ 대기로]`, `orderLaneByBlocks`의 줄 안 순서 보정, `queue-place.js`는 바꾸지 않는다 — 사람의 선택을
  막지 않고, `queue-place.js`는 레인을 판단하지 않는다는 ADR UI-hf8v 조항을 지킨다.
- 결정: 아직 대기열에 없는 상대(이번 배치에 함께 고른 후보, 고르지 않은 후보)와의 `blocks`는 바꾸지 않는다 — 그
  상대는 점유할 수 없어 교착이 생기지 않고, full_plan 그룹의 줄 순서 배치가 그대로 유지된다.

### 3.5 오류 처리

점유 판정은 큐 기록만 읽는 순수 계산이라 새 실패 경로가 없다. 재료가 없을 때 표시는 fail-quiet이다(3.2의
`점유`, 3.3의 대기 행). 3.1은 최신이 아닌 끝난 기록만 풀므로 살아 있는 세션의 점유는 풀지 않는다.

## 4. 문서 정정

구현 때 기존 스펙에 정정 문단을 하나씩 더한다.

- `2026-08-13-worker-lane-scheduling-design.md` §2 — 정정(UI-ey6v): 점유하는 끝난 attempt는 Bead의 최신 구현 attempt뿐이다.
- `2026-09-16-serial-lane-stack-waiting-row-demotion-design.md` §5.1 — 정정(UI-ey6v): 구현 도중이고 선행이 열린 attempt는 타일이다.

## 5. 경계·후속

- 크로스 리포 unit: dotfiles — 3.4 규칙을 `execution-worker-lane.md` Worker lane placement 3·4단계에 더하는
  quick_fix(target rig Bead). beads-ui 구현의 선행이 아니므로 `blocks` 없이 출처만 잇는다.
- UI-68r5는 cc90c986으로 착지했고 이 스펙의 기준이다. 그 스펙의 세션 양보(`yielded_bead_ids`)는 그대로 둔다.
- 관찰: dotfiles-h7tvc(배치 규칙 보강·jev 판정 묶음)는 다른 주제라 합치지 않는다. 그 Bead가 3·4단계를 고칠 때
  3.4 규칙을 전제로 읽는다.
- 관찰: UI-ymcx 스펙도 ADR UI-hf8v를 supersede 대상으로 지명한다. 그쪽이 먼저 착지하면 이 스펙의 supersede 대상은
  그 새 ADR로 옮겨 적는다(재검토 때 `adr_current`로 확인한다). 판정 대상은 서로 겹치지 않는다.

## 6. 테스트

점유(queue-store·scheduler):

- `releases a failed leaf once a newer implementation attempt of the bead exists`
- `launches a prerequisite at the lane head while the blocked bead waits behind a failed leaf` (Bead의 회귀 테스트)
- `keeps the lane for a failed attempt that is the bead's latest`
- `keeps the lane for a dismissed failed attempt that is the bead's latest`
- `keeps the lane for an older running or paused attempt`
- `leaves a non-implementation attempt's occupancy unchanged`
- `transfers a dismissed lane-bound failure once a newer attempt exists`
- `judges the latest attempt by insertion order when timestamps run backward`
- `keeps a released failed leaf released across a partial transfer and a reload`

표기(lane-model):

- `labels each occupant status with its own badge` (3.2 표 전체)
- `labels an occupant with an active discard before its attempt status`
- `draws no occupant row for a bead whose latest attempt is a prerequisite wait`

카드(lane-model·running-grid·card-parity):

- `draws a tile for a prerequisite wait with commits while a blocker is open`
- `draws a tile when the attempt has no base_oid and has a head`
- `keeps the waiting row for a prerequisite wait without commits`
- `keeps the waiting row for an old record without head_oid`
- `returns to the waiting row once every blocker closes`
- `treats frozen blockers as open when bead_blocked_by has no key`
- `treats admission blockers as open when bead_blocked_by has no key and no frozen list exists`
- `hides the lane row while the tile stands`
- `leaves slots and running counts unchanged by the prerequisite wait tile`
- `draws the same prerequisite wait card on the worker and monitor tabs`

배치안(compute):

- `places a direct blocks predecessor of a waiting member in the parallel lane`
- `places a direct blocks predecessor of a lane occupant in the parallel lane`
- `places the predecessor in the parallel lane despite a file conflict in a serial lane`
- `warns predecessor_parallel for the file conflict and nothing for the blocks line`
- `emits no uncovered warning for any blocks line`
- `takes the predecessor out of its bundle and lanes the rest without it`
- `finishes a batch apply of a predecessor and its bundle partner without moved`
- `keeps a chosen bundle ordered by blocks in its serial lane`

수용 기준: 위 테스트와 기존 scheduler·queue-store·lane-model·compute 테스트, `npm run tsc`, `npm run lint`가 통과한다.
배포 뒤 CRC-rokit의 `s1`이 `rokit-471`로 점유되지 않고, 그 Bead가 대기 행이나 카드로 보이는 것을 공유 서버에서 확인한다.

## 7. 결정 (ADR 후보)

- 전제: ADR UI-hf8v — 아래 후보가 바꾸는 조항 밖의 카드 슬롯 규칙과 배치 조항(`blocks`가 쌍의 순서를 정한다, `queue-place.js`는 레인을 판단하지 않는다, 수동 배치를 막지 않는다)을 그대로 따른다
- 전제: ADR UI-u6ud-2 — dotfiles 절차 변경은 dotfiles가 소유한다
- 끝난 attempt는 Bead의 최신일 때만 직렬 대기줄을 점유한다 — 판정 함수 하나와 그 테스트만 고치면 되돌릴 수 있다(되돌리기 어려움 조건 실패) → ADR 아님
- 구현 도중 선행 대기를 커밋 증거로 판정해 열린 동안 카드로 보인다 — 공유 판정 함수 하나로 되돌릴 수 있다(되돌리기 어려움 조건 실패) → ADR 아님
- 대기·점유 상대의 직접 `blocks` 선행은 부딪힘과 무관하게 병렬 레인에 둔다.
  - 조건 1(되돌리기 어려움): 다음이 함께 움직인다.
    - beads-ui: `app/utils/placement/compute.js`의 묶음·레인 선택, `app/utils/placement/apply.js`의 `[전체 적용]` 재계산, `app/views/worker/placement.js` 경고 문구
    - dotfiles: `execution-worker-lane.md`의 세션 배치 절차. 한쪽만 되돌리면 같은 선행이 경로마다 다른 줄에 놓인다
  - 조건 2(맥락 없이 의외): 같은 파일을 고치는 쌍은 직렬이 기본인데 선행 이슈만 그 상대와 동시에 돌 수 있다.
  - 조건 3(실제 트레이드오프): 선행이 줄에 막혀 교착될 위험과, 선행이 겹치는 이슈와 동시에 돌아 충돌 해소 세션을 쓸 비용 사이의 선택이다.
  - UI-hf8v에서 바뀌는 조항: 175행과 189행의 부딪힘 쌍 배치에 "대기·점유 상대의 직접 `blocks` 선행인 후보는 예외로 병렬"을 더한다. 쌍 관계 판정 자체는 바뀌지 않고 나머지 조항은 재진술한다.
  - `summary`: "대기·점유 상대의 직접 blocks 선행 후보는 쌍 관계·부딪힘과 무관하게 병렬 레인에 두어 점유에 막히지 않게 하고 세션 배치 절차도 같은 규칙을 따른다 — 쌍 판정과 모니터 전체 배치안 등 나머지 조항은 UI-hf8v 그대로다" → ADR, supersede UI-hf8v
