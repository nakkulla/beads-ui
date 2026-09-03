---
scope:
  - server/ws/monitor-handlers.js
  - server/ws/worker-handlers.js
  - server/ws/connection.js
  - server/worker/queue-store.js
  - server/worker/queue-place.js
  - app/views/monitor/drop-plan.js
  - app/views/monitor/index.js
  - app/views/worker/lane-drag.js
  - app/views/worker/lane-model.js
  - app/protocol.md
  - docs/superpowers/specs/2026-08-25-monitor-stored-cross-lanes-design.md
---

# 연결 레인 확정/진행 분리 완성 — 빈 확정 레인 draft 복귀·확정 레인 드롭 적재 제거·`▶ 진행`의 서버 단일 op

- Bead: `UI-91fl` (route `spec_backed`, discovered-from `UI-d3i1`)
- 작성일: 2026-09-03 (재발행 2026-09-04)
- 선행: `2026-09-03-cross-repo-queue-prerequisite-wait-design.md`(UI-d3i1, ADR 0035)
  확정/진행 분리, `2026-08-26-monitor-cross-lane-run-axis-design.md`(UI-jaua) 발차
  축·disarm 규약, `2026-08-25-monitor-stored-cross-lanes-design.md`(UI-j92s) 저장 레인
  op·드롭 표.
- 사용자 결정: §3.

## 0. 재발행 사유 (2026-09-04)

초판 §3-2는 `▶ 진행`의 CAS 경쟁을 **클라이언트 체인 내 충돌 1회 재시도**로 풀기로 하고,
그 근거로 §2에 "큐 op(`sendQueueCas`)에는 재시도가 없다"를 적었다. 구현 중 그 전제가
거짓임이 드러났고, 재검증에서 초판 §7이 §1.3을 고치지 못한다는 것까지 확인됐다.

- `app/views/worker/lane-drag.js`의 `sendCas`는 `#225`(UI-4tud, 2026-08-28 `26e8c7e`)부터
  **모든** 큐 op에 conflict 시 무조건 1회 재시도를 걸어 왔다. 재시도는 conflict 응답이
  싣고 오는 `queue.revision`을 쓴다.
- `26e8c7e`는 §1의 실측 당시 배포 SHA `3e0d032`(2026-09-03 17:48:30)의 조상이다. **즉
  17:52 실측은 이미 그 1회 재시도가 살아 있는 상태에서 실패했다.** 초판 §7이 제안한
  체인 1회 재시도는 그때 이미 돌았고 이미 졌다.
- `createLaneDrag`는 Worker 탭과 Monitor 탭이 공유한다. 초판 §7-4의 "첫 op conflict는
  재전송 없이 토스트"를 구현하면 Worker 탭 첫 배치와 UI-58y2 `[대기로 ↴]`의 검증된
  재시도가 사라진다 — 초판이 검토하지 않은 표면의 회귀다.

사용자 결정(2026-09-04)으로 §3-2를 뒤집어 **서버 단일 op**로 재설계한다. §5(범위 1)와
§6(범위 2)은 초판 그대로다.

## 1. 문제

UI-d3i1 배포(`3e0d032`) 뒤 2026-09-03 17:49~17:52 실측. 빈 확정 레인 `cl_01M1JTN7…`에
`dotfiles-4z76`과 `UI-o0wz`를 드롭하자 다음이 관측됐다.

### 1.1 확정 레인에 놓자마자 실행된다

`planDrop`의 `target.kind === 'chain'` 분기는 후보 원천을 confirmed 레인에 놓을 때
`worker-queue-place`를 함께 낸다(UI-j92s §5.4 드롭 표 "confirmed 레인에 드롭 → candidate
원천이면 자기 레포 병렬 끝 `place`"). UI-d3i1 §7.1은 `planLaneConfirm`/`planLaneReapply`의
적재만 뺐고 이 경로는 손대지 않았다. `auto_advance` ON 레포에서 병렬 큐 진입은 곧
발차이므로(UI-jaua §5.2) 드롭 = 발차가 된다. ADR 0035 "적재는 `▶ 진행`만"과 어긋난다.

### 1.2 `확정`을 누를 수 없다

`cross-lanes.json`의 `status`를 `draft`로 되돌리는 코드가 없다. `monitor-lane-update`는
entries만 바꾸고, `monitor-lane-confirm`만 `draft → confirmed`를 쓴다. 멤버를 다 빼도
레인은 `confirmed`로 남아 헤더의 `확정`은 버튼이 아니라 배지로 그려지고, 다음 사용은
확정 없이 §1.1의 경로로 바로 들어간다.

### 1.3 `▶ 진행`이 "일부 레포에서 진행을 켜지 못했습니다"로 끝난다

`runLane`은 레포마다 `place` → `arm`을 보내고 `place` 응답의 `queue.revision`을 `arm`의
`expected_revision`으로 쓴다. 그 사이에 **서버가 자기 자신의 revision을 CAS 없이 여러 번
올린다**.

1. `placeBeadInQueue`는 `queueStore().place`(CAS)가 성공한 뒤 `clearAdmission` 또는
   `recordAdmission`을 `applyUnconditional`로 부른다 — 응답 전이므로 응답 revision에는
   반영된다.
2. 그 다음 `tickWorkerQueue`를 fire-and-forget으로 띄운다. tick은 `bd` 조회(비동기) 뒤
   `applyUnconditional`로 dispatch·admission을 **여러 번** 쓴다.

`arm`이 그 창에 도착하면 conflict다. `sendCas`의 1회 재시도가 최신 revision으로 다시
보내도 tick이 그 사이에 또 쓰면 다시 conflict다 — 재시도 횟수를 늘리는 것으로는 닫히지
않는 경쟁이며, 실측이 그 실패다. 실측: 17:52:03.544 `UI-o0wz` place → 17:52:04.510
`prerequisite_unmet` admission 기록(tick의 쓰기) → arm conflict → 재전송도 실패. 두 레포
어디에도 `armed_by_lane`이 남지 않았다.

같은 레포에 큐 밖 멤버가 둘이면 `place` → `place` 체인도 같은 이유로 깨진다.

## 2. 검증된 전제

- `handleMonitorLaneConfirm`은 `entries.length < 2`를 `bad_request`로 거부한다
  (`server/ws/monitor-handlers.js`).
- `stampAdjacencyProvenance`는 index 0 엔트리에 `dep_created_by_lane`을 두지 않는다 —
  멤버 1개 이하 레인에는 provenance가 없다.
- `laneRunState`는 `status === 'draft'`면 arm을 보지 않고 `draft` 하나를 낸다
  (`app/views/worker/lane-model.js`). 그러나 스케줄러는 `armed_by_lane`의 비어 있지 않음만
  보므로(UI-jaua §5.3 (2)) draft 레인 멤버의 arm은 계속 발차된다. 고아 칩 `▶ 진행 중 ·
  레인 없음`은 `cross_lanes.lanes`에 **없는** lane_id에만 켜지므로 살아 있는 draft 레인의
  arm은 화면에 드러나지 않는다.
- 레인 op는 conflict 시 최신 `cross_lanes`로 계획 전체를 다시 세워 1회 재시도한다
  (`runPlanned`, UI-j92s §5.5).
- **큐 op에는 이미 무조건 1회 재시도가 있다.** `sendCas`(`app/views/worker/lane-drag.js`)가
  `#225`부터 conflict 응답의 `queue.revision`으로 같은 payload를 1회 다시 보낸다. 이 함수는
  Worker 탭과 Monitor 탭이 공유하고, `app/views/worker/index.test.js`의 두 테스트가 그
  동작을 검증한다(하나는 UI-58y2 `[대기로 ↴]`). **이 스펙은 그 재시도를 건드리지 않는다.**
- conflict 응답은 최신 큐를 싣는다(`applyMutation`이 `exportQueue(cur)`를 돌려주고
  `replyMutation`이 그대로 전달한다).
- `queueStore().arm`은 CAS 불일치 말고는 실패 경로가 없다 — `applyMutation`의 conflict
  하나뿐이고 admission 거부 경로가 없다. 따라서 §1.3의 arm 실패는 conflict가 확정이다.
- `queueStore().place`의 mutate 본문은 `removeFromLanes` → `splice` →
  `rebindLineageLane` → `applyLaneBlocksOrder`이고 `next`만 읽고 쓴다. 한 mutate 안에서
  여러 번 부르도록 헬퍼로 뽑을 수 있다. `recordAdmission`/`clearAdmission`도 `next.admission`
  하나만 만진다.
- `sendPlan`의 전송 순서는 `dep-remove` → `disarm` → 레인 op → `dep-add` → 큐 op다
  (`planResult`).
- `disarmOps`는 confirmed 레인에서 **떠나는** 멤버의 disarm만 계획한다.
- `runLane`은 `▶ 진행`·`▶ 이어서 진행`·`▶ 다시 진행` 세 클릭의 유일한 진입점이다
  (`runLaneAction`).
- ADR 0035: 확정은 `blocks` 의존만, 적재와 arm은 `▶ 진행`. ADR 0011: `auto_advance`는
  별개 스위치이며 이 스펙은 그 의미를 바꾸지 않는다.

## 3. 사용자 결정

1. confirmed 레인은 멤버가 **2개 미만**이 되면 `draft`로 돌아간다. 확정 조건(2개 이상)과
   대칭이며, 1개 남은 확정 레인은 인접 쌍이 없어 확정의 의미가 없다. 빈 레인 자동 삭제는
   하지 않는다(UI-jaua §5.1 "자동 삭제는 없다" 유지).
2. (2026-09-04 재결정, 초판 뒤집음) `▶ 진행`의 CAS 경쟁은 **레포당 서버 단일 op**로
   푼다. 한 레포의 적재와 arm을 `worker-queue-run` 하나가 한 mutation에서 끝내므로 tick이
   끼어들 창 자체가 없다. 클라이언트 재시도는 늘리지도 줄이지도 않는다 — `sendCas`의
   현행 무조건 1회 재시도는 그대로 둔다.

   초판은 클라이언트 1회 재시도를 골랐으나, 그 재시도는 이미 배포돼 있었고 §1.3의 실패가
   바로 그 재시도의 실패다(§0). 재시도 횟수는 tick의 쓰기 횟수와 경쟁하므로 어떤 상한도
   경쟁을 닫지 못한다.

## 4. 설계 원칙

- 규칙은 한 곳에 둔다. 상태 복귀는 서버 `monitor-lane-update`가, 적재와 arm은 `▶ 진행`이
  낸 서버 op 하나가 한다.
- **한 클릭이 한 레포에 내는 큐 쓰기는 서버 op 하나다.** 클라이언트 CAS 체인은 서버가
  자기 응답 뒤에 띄우는 tick을 이길 수 없다(§1.3).
- 되돌리는 것은 만든 것뿐이다(UI-jaua §4). 복귀가 되돌리는 durable 상태는 arm뿐이다.
- fail-visible: 조용히 발차하는 상태를 남기지 않는다. 그래서 복귀는 disarm을 동반한다.

## 5. 범위 1 — 빈 확정 레인의 draft 복귀

### 5.1 서버

`handleMonitorLaneUpdate`(`server/ws/monitor-handlers.js`)의 `store.mutate` 안에서
entries를 바꾼 뒤:

```
if (lane.status === 'confirmed' && lane.entries.length < 2) {
  lane.status = 'draft';
}
```

응답 `{ lane_id, revision }`은 그대로다. 규칙이 서버인 이유: 행 `✕`(`detachChainRow`),
다른 레인·영역으로의 드래그, 배치 메뉴가 전부 이 op 하나를 타므로 클라이언트마다 판단하지
않는다. `monitor-lane-remove`는 레인을 지우므로 대상이 아니다. 멤버 2개 이상의 재배열은
상태를 건드리지 않는다.

### 5.2 클라이언트 — 남는 멤버의 disarm

`planDrop`의 chain 이탈 분기(`drag.kind === 'chain'`이고 원천 레인을 떠날 때)에서 원천
레인이 `confirmed`이고 이탈 뒤 남는 entries가 2개 미만이면, `disarmOps`의 `leaving`을
떠나는 멤버 하나에서 **원천 레인 entries 전체**로 넓힌다. 남는 멤버(0 또는 1개)의 arm이
같은 계획의 `disarm` 자리(레인 op 앞)에서 해제된다. disarm 실패가 계획을 멈추지 않는
현행(UI-jaua §7.2)은 유지한다 — 그때의 출구는 §5.3의 고아 칩이다.

**draft 레인을 가리키는 arm은 고아다.** `lane-model.js`의 `armed_lane_chip` 판정을
"레인이 없음"에서 "레인이 없거나 `draft`"로 넓혀 `▶ 진행 중 · 레인 없음`과 같은 orphan
칩·해제 버튼을 그린다. draft에는 발차 축이 없으므로(§2) 그 arm은 어느 레인의 것도 아니다.
현행 레인 `✕`(`planLaneRemove`)는 draft 레인의 disarm을 계획하지 않으므로, 이 칩이
disarm 실패 뒤 남은 arm의 유일한 출구다.

### 5.3 부수 사항

- provenance 초기화는 없다(§2). 다시 확정하면 `planLaneConfirm`이 인접 `dep-add`를 새로
  내고 2단계 provenance가 오른다.
- 복귀로 생긴 빈 draft는 `monitor-lane-create`의 `conflict_empty_lane`(생성 시점 규칙)
  밖이라 빈 draft가 잠시 2개일 수 있다. 허용한다(§12 관찰).
- 표시는 현행 draft 그림이다: 헤더 `draft` 배지, `확정` 버튼은 `rows.length >= 2`에서 활성.

## 6. 범위 2 — 확정 레인 드롭의 적재 제거

`planDrop`의 `target.kind === 'chain'` 분기에서 `drag.kind === 'candidate' && lane.status
=== 'confirmed'`일 때 넣던 `placeOp`를 지운다. 확정 레인 드롭은 레인 `update`와 인접
의존(현행 `up`/`down` 삽입 규칙)만 낸다. 새로 붙은 멤버는 위치 칩 `진행 대기`로 서고
(UI-d3i1 §8), `▶ 진행`/`▶ 이어서 진행`이 "병렬 큐에 없는 행"으로 잡아 올린다(ADR 0035).

`placeOp`는 confirmed 행 → `repo-serial` 대상 드래그가 계속 쓰므로 남긴다(대상 영역의
의미이지 레인의 의미가 아니다).

문서 정정: UI-j92s 스펙 §5.4 드롭 표 "confirmed 레인에 드롭" 행의 dep/큐 op 열에서
"candidate 원천이면 자기 레포 병렬 끝 `place`"를 지우고 이 스펙을 가리킨다.
`app/protocol.md` `monitor-lane-update` 문단에 §5.1 복귀 규칙 한 문장을 더한다.

## 7. 범위 3 — `▶ 진행`의 서버 단일 op `worker-queue-run`

### 7.1 프로토콜

새 op 하나를 더한다. 기존 `worker-queue-place`·`worker-queue-arm`은 그대로 남는다 —
드래그·`[대기로 ↴]`·`releaseArm`이 계속 쓴다.

```
worker-queue-run
  payload  { lane_id, places: [{ bead_id, lane?, index? }], arm_bead_ids: string[],
             expected_revision, root_dir? }
  reply    { applied, conflict, queue }
           또는 { applied: false, conflict: false, admission_reason, refused_bead_id, queue }
```

`places`는 이 레포에서 새로 적재할 행을, `arm_bead_ids`는 이 레포가 arm할 레인 멤버십
전체를 싣는다. 둘 다 비어 있을 수 있고, 둘 다 비면 `bad_request`다. `places`의 순서가
곧 적재 순서다.

### 7.2 핸들러 (`server/ws/worker-handlers.js`)

`handleWorkerQueueRun`은 async다. 순서:

1. **admission 먼저, 전부.** `places`의 각 `bead_id`에 `checkWorkerQueueAdmission`을
   돌린다(`placeBeadInQueue`가 쓰는 그 함수). 하나라도 거부되면 그 거부를
   `recordAdmission`으로 기록하고 `{ applied: false, conflict: false, admission_reason,
   refused_bead_id }`로 답한다 — **큐는 건드리지 않는다.** 판정이 mutation 앞에 다 오므로
   부분 적용이 없다.
2. **한 번의 `queueStore().run`.** CAS 한 번, mutate 한 번:
   - `places` 순서대로 현행 `place`의 mutate 본문(`removeFromLanes` → `splice` →
     `rebindLineageLane` → `applyLaneBlocksOrder`)을 돌린다. 이 본문은 공유 헬퍼로
     뽑고 `place`도 그 헬퍼를 쓴다 — 두 벌이 되지 않게 한다.
   - `arm_bead_ids`에 대해 현행 `arm`의 본문(`next.queue`와 `next.pr_wait` 양쪽에서
     `armed_by_lane = lane_id`)을 돌린다. 큐에 없는 id는 현행대로 조용히 무시한다.
   - 적재한 각 bead의 admission 항목을 `placeBeadInQueue`와 같은 규칙으로 정리한다:
     `admission.stale`이면 `spec_review_stale`(stale) 기록, 아니면 삭제.
   - 성공하면 `disarmed_on_load`에서 `lane_id`를 뺀다(현행 `arm`과 같다).
3. **fanout 한 번, tick 한 번.** 성공 응답을 보낸 뒤 `tickWorkerQueue`를 fire-and-forget
   으로 한 번 띄운다.

revision은 정확히 1 오른다. 응답 revision과 서버 revision이 같은 순간이 보장되지는
않지만(다음 tick이 곧 올린다) **클라이언트는 그 뒤에 이어 쓸 op가 없으므로** 경쟁이
없다. 이것이 §4의 원칙이다.

`connection.js`의 dispatch에 `case 'worker-queue-run': await handleWorkerQueueRun(...)`을
더한다.

### 7.3 클라이언트 (`app/views/monitor/index.js` `runLane`)

두 겹의 루프(place 루프 + arm 루프)를 **레포당 op 하나**로 바꾼다.

1. 레인 행을 훑어 레포별로 `places`를 모은다. 대상 판정은 현행 그대로 —
   `row.fixed`도 아니고 `typeof row.queue_index !== 'number'`인 행. `index`는 현행
   `(parallel_raw_length[root_dir] ?? 0) + offset`.
2. `arm_bead_ids`는 현행 `laneMembersByRoot(lane)`가 주는 레포별 멤버십 전체.
3. 레포마다 `sendQueueCas('worker-queue-run', { lane_id, places, arm_bead_ids }, root_dir,
   revisions, adopted_roots?, { bead_id })`를 한 번 부른다. 한 레포가 실패하면 현행처럼
   남은 레포를 보내지 않고 `일부 레포에서 진행을 켜지 못했습니다 — [▶ 이어서 진행]으로
   다시 시도하세요` 토스트를 낸다.
4. `places`도 `arm_bead_ids`도 비는 레포는 op를 보내지 않는다.

`app/views/worker/lane-drag.js`의 변경은 **op 타입 union에 `'worker-queue-run'`을 더하는
것 하나뿐**이다. `sendCas`의 무조건 1회 재시도, `sendQueueCas`의 응답 판정, `sendOp`·
`sendPlan`은 전부 현행 그대로다. 이 스펙은 클라이언트 CAS 규약을 바꾸지 않는다.

`revisions` 좌표(`revisionOfRoot`)와 실패 시 판정도 현행 그대로다. 레포당 op가 하나뿐이라
`revisions`에 이어 쓸 일이 애초에 없다.

### 7.4 하지 않는 것

- `worker-queue-place`/`worker-queue-arm`을 지우거나 합치지 않는다. 드래그·`[대기로 ↴]`·
  `releaseArm`·레인 disarm이 계속 쓰는 op다.
- 서버 tick을 응답 뒤로 미루거나 클라이언트 계획이 끝날 때까지 억제하는 대안은 택하지
  않는다: tick의 쓰기는 `bd` 조회(비동기) 뒤에 오므로 응답 순서로 막을 수 없고, 계획이
  중간에 끊기면 tick이 영영 안 뜬다.
- CAS revision을 사용자 쓰기 전용 카운터와 스케줄러 쓰기 카운터로 쪼개는 대안도 택하지
  않는다: 스케줄러의 dispatch는 사용자가 보는 화면을 실제로 바꾸므로 그 창을 stale로
  판정하는 현행이 옳다. 고칠 것은 판정이 아니라 한 클릭이 여러 op를 내는 모양이다.

## 8. 에러 처리

- §5.1: `not_found`·CAS conflict는 현행 `sendLaneFailure`. conflict는 `runPlanned`가
  최신 레인으로 재계획한다 — 그때 남는 멤버 수도 다시 세므로 disarm 범위도 다시 정해진다.
- §5.2: disarm 실패는 fail-quiet(현행). 레인은 draft가 되고 남은 arm은 orphan 칩과 그
  해제 버튼으로 드러난다(§5.2 둘째 문단, UI-jaua §5.6 슬롯 4).
- §7: `worker-queue-run`의 conflict는 `sendCas`의 현행 1회 재시도를 거친 뒤에도 실패하면
  현행 토스트 `큐가 바뀌었습니다 — 다시 시도해 주세요`다. 사용자 화면이 낡았다는 뜻이며
  이 경로에는 서버 tick 경쟁이 없다.
- §7: admission 거부는 `applied:false` + `admission_reason`으로 오고 현행 거부 토스트가
  그대로 뜬다. `refused_bead_id`는 어느 행이 막혔는지 토스트에 싣기 위한 것이다 —
  `큐 적재 거부: <사유>`에 `<bead_id>`를 앞에 붙인다.

## 9. 재현

- **빈 확정 레인에 드롭.** 드롭 → 레인 update + dep만, 큐 변화 없음, 행 칩 `진행 대기`.
  `▶ 진행` → 레포마다 `worker-queue-run` 한 번 → 적재와 arm이 같은 revision에서 끝난다.
  두 레포 모두 `armed_by_lane` 기록, 헤더 `▶ 진행 중`. tick이 그 뒤에 몇 번 쓰든 클라이언트가
  이어 쓸 op가 없다.
- **확정 레인에서 멤버를 빼 1개로.** 행 `✕` → 계획: dep-remove(레인 소유분) → disarm(떠나는
  멤버 + 남는 멤버) → lane update → 서버가 `draft`로 복귀 → 스냅샷 헤더 `draft`, `확정`
  버튼 비활성(1개).
- **같은 레포에 큐 밖 멤버 둘.** `▶ 진행` → `worker-queue-run` 한 번에 `places` 둘 →
  둘 다 적재되고 둘 다 arm된다. 중간 tick이 없다.
- **적재 대상 하나가 admission 거부.** `worker-queue-run` → 큐 무변화 + 거부 토스트.
  다른 멤버가 절반만 적재된 상태가 남지 않는다(현행보다 나아지는 점).

## 10. 검증 bundle

- `server/ws/monitor-handlers.cross-lanes.test.js`: update로 confirmed 레인이 1개·0개가
  되면 `draft`; 2개 이상 재배열은 `confirmed` 유지; 복귀 뒤 `confirm`이 다시 거부(1개)·
  허용(2개).
- `app/views/monitor/drop-plan.test.js`: (a) 527행 "appends a candidate to a confirmed lane"
  기대값에서 `worker-queue-place` 제거(구현을 테스트에 맞추지 않는다); (b) confirmed 레인
  2개 중 하나가 떠나면 `disarm` payload가 두 멤버를 다 싣는다(레포가 다르면 레포별 op);
  (c) 3개 중 하나가 떠나면 떠나는 멤버만; (d) confirmed 행 → repo-serial place는 현행 유지.
- `app/main.monitor.e2e.test.js`: 398행 확정 레인 드롭 e2e의 전송 순서 기대값에서 큐 op가
  빠진다(§6의 강제 귀결).
- `server/ws/worker-handlers.lane-arm.test.js` 또는 새 `worker-handlers.queue-run.test.js`:
  `worker-queue-run` 한 번이 적재와 arm을 revision 1 증가로 끝낸다; `places`가 여럿이면
  순서대로 들어간다; `arm_bead_ids`의 큐 밖 id는 무시된다; `pr_wait` 행도 arm된다;
  admission 거부 하나면 큐 무변화 + `admission_reason`·`refused_bead_id`; CAS 불일치는
  `conflict:true` + 최신 큐; `disarmed_on_load`에서 `lane_id`가 빠진다.
- `app/views/monitor/index.test.js`: `runLane`이 레포당 `worker-queue-run` 하나만 보내고
  `places`·`arm_bead_ids`가 현행 대상 판정과 같다; 한 레포 실패면 다음 레포를 보내지 않고
  실패 토스트를 낸다; 적재 대상이 없는 레포도 arm만 실린 op를 받는다(2959행 describe 확장).
- `app/views/worker/lane-drag.test.js`: `worker-queue-run`이 다른 큐 op와 같은 응답 판정을
  받는다(`applied:false` 거부 토스트, conflict 토스트). **기존 재시도 테스트는 손대지
  않는다** — 이 스펙은 `sendCas`를 바꾸지 않는다.
- `app/protocol.md`(§5.1 한 문장 + `worker-queue-run` 문단)·UI-j92s 스펙 표 정정.
- Pre-Handoff: `npm run tsc`, `npx vitest run --reporter=dot`, `npm run lint`,
  `npm run prettier:write`, `npm run build`.

## 11. 구현 unit 후보

- `server`: §5.1·§7.1·§7.2 — `monitor-handlers.js`·`queue-store.js`·`worker-handlers.js`·
  `connection.js` + 테스트, `protocol.md`.
- `view`: §5.2·§6·§7.3 — `drop-plan.js`·`index.js`·`lane-model.js`·`lane-drag.js`(타입
  union만) + 테스트, UI-j92s 스펙 표.

단일 패킷으로 충분한 크기다.

## 12. 경계·후속

- 비목표: `sendCas`의 무조건 1회 재시도 변경(§0·§3-2 — Worker 탭과 UI-58y2가 공유하는
  검증된 동작이고 이 스펙이 검토한 표면이 아니다). `worker-queue-place`·`worker-queue-arm`
  폐기. 빈 레인 자동 삭제(§3-1). `auto_advance` ON 레포에서 place가 곧 발차인 의미
  (UI-jaua §5.2, ADR 0011). CAS revision 카운터 분리(§7.4).
- 관찰: 복귀로 빈 draft가 2개 공존할 수 있다 — 생성 버튼의 중복 방지 규칙과 무관하고
  사용자가 `✕`로 지우면 되므로 Bead를 만들지 않는다.
- 관찰: `revisionOfRoot`가 첫 op의 revision을 스냅샷에서 찾는 방식은 그대로다.
- 관찰: 드래그 계획(`sendPlan`)의 큐 op 체인은 여전히 클라이언트 체인이다. 그러나 그
  경로의 `place`는 tick을 띄운 뒤 다음 op가 오기까지 사람 조작이 없어 경쟁 창이 실측된
  적이 없고, 있더라도 현행 `sendCas` 재시도가 흡수한다. 관측되면 같은 원칙(§4)으로
  서버 op를 늘린다.

## 결정 (ADR 후보)

- 전제: ADR 0035 — 확정은 `blocks` 의존만 쓰고 적재와 arm은 `▶ 진행`이 한다. §6은 그
  결정에서 빠진 드롭 경로를 같은 규칙으로 맞추는 정정이고, §7은 그 "`▶ 진행`이 한다"를
  서버 op 하나로 옮길 뿐 소유권을 바꾸지 않는다.
- 전제: ADR 0011 — `auto_advance`는 별개 스위치. §7은 그 의미를 바꾸지 않는다.
- confirmed 레인은 멤버 2개 미만이면 draft로 돌아가고 남는 arm은 함께 해제한다.
  되돌리기 어려움: 아니다 — 핸들러 조건문 하나와 disarm 범위 하나. 맥락 없이 놀라움:
  disarm 동반 이유는 §2의 스케줄러 사실에서 나오며 코드 주석으로 충분하다. 실재한 대안:
  0개만 복귀·자동 삭제(§3-1). → ADR 아님
- **한 클릭이 한 레포에 내는 큐 쓰기는 서버 op 하나로 만든다.** 되돌리기 어려움: 그렇다 —
  `worker-queue-run`은 프로토콜 표면이라 되돌리려면 클라이언트가 쓰는 op를 없애야 한다.
  맥락 없이 놀라움: 그렇다 — 다른 모든 큐 조작이 bead 단위 op인데 `▶ 진행`만 레포 단위
  op이고, 그 이유(`place`가 응답 뒤 띄우는 tick이 CAS 없이 revision을 여러 번 올려 어떤
  클라이언트 체인도 이길 수 없다)는 코드 한 곳에서 읽히지 않는다. 실재한 대안: 클라이언트
  재시도(초판 §3-2, 배포된 상태로 실패했다), tick 지연, CAS 카운터 분리(§7.4).
  `summary`: "한 클릭이 한 워크스페이스에 내는 큐 쓰기는 서버 단일 CAS op다 — 서버가 응답 뒤 띄우는 tick이 CAS 없이 revision을 올리므로 클라이언트 체인과 그 재시도는 경쟁을 닫지 못한다"
  → ADR
