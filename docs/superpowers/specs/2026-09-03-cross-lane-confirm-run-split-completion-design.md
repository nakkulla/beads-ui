---
scope:
  - server/ws/monitor-handlers.js
  - app/views/monitor/drop-plan.js
  - app/views/worker/lane-drag.js
  - app/views/monitor/index.js
  - app/views/worker/lane-model.js
  - app/protocol.md
  - docs/superpowers/specs/2026-08-25-monitor-stored-cross-lanes-design.md
---

# 연결 레인 확정/진행 분리 완성 — 빈 확정 레인 draft 복귀·확정 레인 드롭 적재 제거·큐 op 체인 CAS 재시도

- Bead: `UI-91fl` (route `spec_backed`, discovered-from `UI-d3i1`)
- 작성일: 2026-09-03
- 선행: `2026-09-03-cross-repo-queue-prerequisite-wait-design.md`(UI-d3i1, ADR 0035)
  확정/진행 분리, `2026-08-26-monitor-cross-lane-run-axis-design.md`(UI-jaua) 발차
  축·disarm 규약, `2026-08-25-monitor-stored-cross-lanes-design.md`(UI-j92s) 저장 레인
  op·드롭 표.
- 사용자 결정(2026-09-03): §3.

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
`expected_revision`으로 쓴다. 서버 `placeBeadInQueue`는 응답 직전에 `tickWorkerQueue`를
fire-and-forget으로 띄우고, 그 tick은 `bd` 조회 뒤 `applyUnconditional`로 dispatch·admission을
써 revision을 올린다. `arm`이 그 사이에 도착하면 CAS conflict다. 같은 레포에 큐 밖 멤버가
둘이면 `place` → `place` 체인도 같은 이유로 깨진다. 실측: 17:52:03.544 `UI-o0wz` place →
17:52:04.510 `prerequisite_unmet` admission 기록 → arm conflict. 두 레포 어디에도
`armed_by_lane`이 남지 않았다.

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
  (`runPlanned`, UI-j92s §5.5). 큐 op(`sendQueueCas`)에는 재시도가 없고 conflict 응답도
  `queue.revision`을 싣는다(`applyMutation`이 `exportQueue(cur)`를 돌려준다).
- `sendPlan`의 전송 순서는 `dep-remove` → `disarm` → 레인 op → `dep-add` → 큐 op다
  (`planResult`).
- `disarmOps`는 confirmed 레인에서 **떠나는** 멤버의 disarm만 계획한다.
- ADR 0035: 확정은 `blocks` 의존만, 적재와 arm은 `▶ 진행`. ADR 0011: `auto_advance`는
  별개 스위치이며 이 스펙은 그 의미를 바꾸지 않는다.

## 3. 사용자 결정

1. confirmed 레인은 멤버가 **2개 미만**이 되면 `draft`로 돌아간다. 확정 조건(2개 이상)과
   대칭이며, 1개 남은 확정 레인은 인접 쌍이 없어 확정의 의미가 없다. 빈 레인 자동 삭제는
   하지 않는다(UI-jaua §5.1 "자동 삭제는 없다" 유지).
2. `▶ 진행`의 CAS 경쟁은 **클라이언트 체인 내 충돌 1회 재시도**로 푼다. 서버 단일 op
   (`worker-queue-run`)는 만들지 않는다 — 핸들러·protocol·`queue-place` 다중 버전·테스트가
   새로 필요하고, 레인 op가 이미 쓰는 "conflict → 최신으로 1회" 규약으로 충분하다.

## 4. 설계 원칙

- 규칙은 한 곳에 둔다. 상태 복귀는 서버 `monitor-lane-update`가, 적재는 `runLane`만이,
  CAS 재시도는 `sendQueueCas`만이 한다.
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

## 7. 범위 3 — 큐 op 체인의 CAS 충돌 1회 재시도

`sendQueueCas`(`app/views/worker/lane-drag.js`):

1. 전송 직전에 `chained = revisions.has(root_dir)`를 잡는다 — 이 레포의
   `expected_revision`이 같은 계획의 앞 op 응답에서 왔는가.
2. 응답이 `conflict`이고 `chained`면, 응답의 `queue.revision`으로 **같은 payload**를 1회
   다시 보낸다. 재전송의 응답은 첫 응답과 같은 규칙으로 판정한다(`applied:false`는 거부
   토스트, 성공은 revision 갱신).
3. 재전송도 `conflict`면 현행 토스트 `큐가 바뀌었습니다 — 다시 시도해 주세요`.
4. `chained`가 아닌 첫 op의 conflict는 현행대로 즉시 토스트한다 — 사용자의 화면이
   낡았다는 뜻이며 재시도할 근거가 없다.

적용 범위는 `sendQueueCas`를 지나는 큐 op 전부(`place`·`reorder`·`remove`·`arm`)다.
`disarm`은 `sendOp`가 따로 다루며 실패해도 계획을 멈추지 않으므로 대상이 아니다.

- 재시도의 `index`는 그대로 둔다(서버 `clampIndex`). `arm`은 멱등이고, CAS는 쓰기 전에
  판정하므로 "적용됐는데 conflict로 답한" 경우는 없다.
- 서버 tick을 응답 뒤로 미루는 대안은 택하지 않는다: tick의 쓰기는 `bd` 조회(비동기) 뒤에
  오므로 응답 순서로 막을 수 없고, 다른 클라이언트의 쓰기도 같은 창에 들어온다.
- `runLane`의 부분 실패 토스트와 `▶ 이어서 진행` 복구 경로(UI-jaua §9)는 그대로다.

## 8. 에러 처리

- §5.1: `not_found`·CAS conflict는 현행 `sendLaneFailure`. conflict는 `runPlanned`가
  최신 레인으로 재계획한다 — 그때 남는 멤버 수도 다시 세므로 disarm 범위도 다시 정해진다.
- §5.2: disarm 실패는 fail-quiet(현행). 레인은 draft가 되고 남은 arm은 orphan 칩과 그
  해제 버튼으로 드러난다(§5.2 둘째 문단, UI-jaua §5.6 슬롯 4).
- §7: 재시도 뒤 `applied:false`(admission 거부)는 현행 거부 토스트다.

## 9. 재현

- **빈 확정 레인에 드롭.** 드롭 → 레인 update + dep만, 큐 변화 없음, 행 칩 `진행 대기`.
  `▶ 진행` → 레포마다 place → (tick) → arm; arm이 conflict면 최신 revision으로 1회 재전송
  → 성공. 두 레포 모두 `armed_by_lane` 기록, 헤더 `▶ 진행 중`.
- **확정 레인에서 멤버를 빼 1개로.** 행 `✕` → 계획: dep-remove(레인 소유분) → disarm(떠나는
  멤버 + 남는 멤버) → lane update → 서버가 `draft`로 복귀 → 스냅샷 헤더 `draft`, `확정`
  버튼 비활성(1개).
- **같은 레포에 큐 밖 멤버 둘.** `▶ 진행` → place(A) → tick → place(B) conflict → 재전송
  성공 → arm → 성공.

## 10. 검증 bundle

- `server/ws/monitor-handlers.cross-lanes.test.js`: update로 confirmed 레인이 1개·0개가
  되면 `draft`; 2개 이상 재배열은 `confirmed` 유지; 복귀 뒤 `confirm`이 다시 거부(1개)·
  허용(2개).
- `app/views/monitor/drop-plan.test.js`: (a) 527행 "appends a candidate to a confirmed lane"
  기대값에서 `worker-queue-place` 제거(구현을 테스트에 맞추지 않는다); (b) confirmed 레인
  2개 중 하나가 떠나면 `disarm` payload가 두 멤버를 다 싣는다(레포가 다르면 레포별 op);
  (c) 3개 중 하나가 떠나면 떠나는 멤버만; (d) confirmed 행 → repo-serial place는 현행 유지.
- `app/views/worker/lane-drag.test.js`: 체인 두 번째 op가 conflict → 응답 revision으로
  같은 payload 1회 재전송 → 성공; 재전송도 conflict → 토스트 1회, 이후 op 미전송; 첫 op
  conflict → 재전송 없이 토스트.
- `app/views/worker/lane-model.test.js`: draft 레인을 가리키는 `armed_by_lane`이 orphan
  칩으로 그려진다; confirmed 레인은 현행 `▶ 연결 n`.
- `app/views/monitor/index.test.js`: `runLane`에서 arm의 첫 응답이 conflict여도 재전송
  성공이면 실패 토스트가 없다(2959행 describe 확장).
- `app/protocol.md`·UI-j92s 스펙 표 정정.
- Pre-Handoff: `npm run tsc`, `npx vitest run --reporter=dot`, `npm run lint`,
  `npm run prettier:write`, `npm run build`.

## 11. 구현 unit 후보

- `server`: §5.1 — `monitor-handlers.js` + cross-lanes 테스트.
- `view`: §5.2·§6·§7 — `drop-plan.js`·`lane-drag.js`·`lane-model.js` + 테스트,
  `protocol.md`·스펙 표.

단일 패킷으로 충분한 크기다.

## 12. 경계·후속

- 비목표: 서버 단일 `worker-queue-run` op(§3-2). 빈 레인 자동 삭제(§3-1). `auto_advance`
  ON 레포에서 place가 곧 발차인 의미(UI-jaua §5.2, ADR 0011). `disarm`의 재시도.
- 관찰: 복귀로 빈 draft가 2개 공존할 수 있다 — 생성 버튼의 중복 방지 규칙과 무관하고
  사용자가 `✕`로 지우면 되므로 Bead를 만들지 않는다.
- 관찰: `revisionOfRoot`가 첫 op의 revision을 스냅샷에서 찾는 방식은 그대로다.

## 결정 (ADR 후보)

- 전제: ADR 0035 — 확정은 `blocks` 의존만 쓰고 적재와 arm은 `▶ 진행`이 한다. §6은 그
  결정에서 빠진 드롭 경로를 같은 규칙으로 맞추는 정정이다.
- 전제: ADR 0011 — `auto_advance`는 별개 스위치. §7은 그 의미를 바꾸지 않고 CAS 규약
  안에서 경쟁을 푼다.
- confirmed 레인은 멤버 2개 미만이면 draft로 돌아가고 남는 arm은 함께 해제한다.
  되돌리기 어려움: 아니다 — 핸들러 조건문 하나와 disarm 범위 하나. 맥락 없이 놀라움:
  disarm 동반 이유는 §2의 스케줄러 사실에서 나오며 코드 주석으로 충분하다. 실재한 대안:
  0개만 복귀·자동 삭제(§3-1). → ADR 아님
- 큐 op 체인 내 conflict 1회 재시도. 되돌리기 어려움: 아니다 — 레인 op가 이미 쓰는
  규약의 확장. 실재한 대안: 서버 단일 op(§3-2). → ADR 아님
