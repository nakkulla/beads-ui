---
scope:
  - server/ws/monitor-handlers.js
  - app/protocol.js
  - app/views/monitor/drop-plan.js
  - app/views/monitor/index.js
  - app/views/worker/lane-model.js
  - app/protocol.md
  - docs/superpowers/specs/2026-08-25-monitor-stored-cross-lanes-design.md
---

# 연결 레인 확정/진행 분리 완성 — 빈 확정 레인 draft 복귀·확정 레인 드롭 적재 제거·미등록 메시지 타입 3건

- Bead: `UI-91fl` (route `spec_backed`, discovered-from `UI-d3i1`)
- 작성일: 2026-09-03 (재발행 2026-09-04)
- 선행: `2026-09-03-cross-repo-queue-prerequisite-wait-design.md`(UI-d3i1, ADR 0035)
  확정/진행 분리, `2026-08-26-monitor-cross-lane-run-axis-design.md`(UI-jaua) 발차
  축·disarm 규약, `2026-08-25-monitor-stored-cross-lanes-design.md`(UI-j92s) 저장 레인
  op·드롭 표.
- 사용자 결정: §3.

## 0. 재발행 사유 (2026-09-04)

초판 §3-2는 §1.3의 `▶ 진행` 실패를 **place 응답 뒤 서버 tick이 revision을 올려 생기는
CAS 경쟁**으로 진단하고 클라이언트 체인 내 1회 재시도로 풀기로 했다. 구현과 스펙 게이트를
거치며 그 진단이 두 단계로 무너졌다.

1. 초판 §2는 "큐 op(`sendQueueCas`)에는 재시도가 없다"를 전제했으나 거짓이다.
   `app/views/worker/lane-drag.js`의 `sendCas`는 `#225`(UI-4tud, `26e8c7e`, 2026-08-28)부터
   **모든** 큐 op에 conflict 시 무조건 1회 재시도를 걸어 왔고, `26e8c7e`는 실측 당시 배포
   SHA `3e0d032`(2026-09-03 17:48:30)의 조상이다. 초판 §7이 제안한 재시도는 이미 살아
   있었다.
2. 그렇다면 재시도조차 진 것인가를 확인하다 **진짜 원인**이 드러났다. `app/protocol.js`의
   `MESSAGE_TYPES`에 `worker-queue-arm`·`worker-queue-disarm`·`monitor-lane-provenance`가
   없다. `app/ws.js`의 `send()`가 목록에 없는 타입을 서버로 보내기 전에
   `unknown message type`으로 reject하고, `app/main.js`의 `transport`가 그 오류를
   `PROPAGATED_ERROR_TYPES`에 없다며 `[]`로 삼킨다. `sendQueueCas`는
   `typeof res.applied !== 'boolean'`으로 떨어져 토스트를 내고 `null`을 돌려준다.
   **`▶ 진행`의 arm은 서버에 도달한 적이 없다.** CAS 경쟁은 §1.3에서 일어난 적이 없다.

`worker-queue-arm`은 `#211`(UI-jaua)에서 서버에 추가됐고 `app/protocol.js`에는 한 번도
등록된 적이 없다(`git log -S'worker-queue-arm' -- app/protocol.js`가 0건). 연결 레인의
발차 축은 출시 이후 브라우저에서 작동한 적이 없다.

사용자 결정(2026-09-04)으로 §3-2를 **미등록 메시지 타입 3건의 등록과 재발 방지 대조
테스트**로 축소한다. 서버 단일 op도 클라이언트 재시도 변경도 하지 않는다. §5(범위 1)와
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

`worker-queue-arm`이 `app/protocol.js`의 `MESSAGE_TYPES`에 없어서 요청이 서버에 닿지
않는다. 경로는 하나뿐이고 분기가 없다.

```
runLane → sendQueueCas('worker-queue-arm', …) → transport → tracked_send → ws.send
  → MESSAGE_TYPES.includes('worker-queue-arm') === false
  → Promise.reject(Error('unknown message type: worker-queue-arm'))
  → transport의 catch: PROPAGATED_ERROR_TYPES에 없으므로 `[]` 반환
  → sendQueueCas: typeof res.applied !== 'boolean'
  → 토스트 `큐 요청이 실패했습니다`, 반환 null
  → runLane: 토스트 `일부 레포에서 진행을 켜지 못했습니다 — [▶ 이어서 진행]으로 다시 시도하세요`
```

실측과 정확히 일치한다: 두 레포 어디에도 `armed_by_lane`이 남지 않았고, 첫 레포에서
멈췄으며, 서버 로그에 arm 요청 자체가 없다. 17:52:04.510의 `prerequisite_unmet` admission
기록은 place가 띄운 tick의 정상 동작이고 arm 실패와 인과가 없다.

같은 누락이 `worker-queue-disarm`(`⏸ 정지`·`releaseArm`·레인 이탈 계획의 disarm)과
`monitor-lane-provenance`(드롭 계획의 provenance 각인)에도 있다. 셋 다 조용히 실패해 왔다.

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
- `MESSAGE_TYPES`(`app/protocol.js`)는 클라이언트 전송 허용 목록이고 `MessageType`
  typedef와 짝이다. `app/ws.js`의 `send()`가 목록 밖 타입을 reject한다.
  `server/ws/connection.js`의 dispatch `case` 88개와 대조하면 목록에 없는 것은
  `ping`(이 앱이 보내지 않는 진단용 op — `app/` 어디에도 전송처가 없다)과
  `monitor-lane-provenance`·`worker-queue-arm`·
  `worker-queue-disarm` 셋이다.
- `app/main.js`의 `transport`는 `PROPAGATED_ERROR_TYPES`에 든 타입만 오류를 올려보내고
  나머지는 `[]`로 삼킨다. 그 집합은 레인 op 4종과 프리셋·세션 기본값 op 몇 개이며 워커 큐
  op은 하나도 들어 있지 않다. 따라서 미등록 타입의 실패는 예외가 아니라 "모양이 틀린 응답"으로
  나타난다.
- 큐 op에는 이미 무조건 1회 재시도가 있다. `sendCas`(`app/views/worker/lane-drag.js`)가
  `#225`부터 conflict 응답의 `queue.revision`으로 같은 payload를 1회 다시 보낸다. 이 함수는
  Worker 탭과 Monitor 탭이 공유하고, `app/views/worker/index.test.js`의 두 테스트가 그
  동작을 검증한다(하나는 UI-58y2 `[대기로 ↴]`). **이 스펙은 그 재시도도 `sendCas`·
  `sendQueueCas`·`sendOp`·`sendPlan`도 건드리지 않는다.**
- `queueStore().arm`(`server/worker/queue-store.js`)의 실패는 두 가지다: `lane_id`나
  `bead_ids`가 형식에 맞지 않으면 `{ ok:false, conflict:false }`, 그 외에는 `applyMutation`의
  CAS 불일치. `runLane`이 만드는 payload는 언제나 형식에 맞으므로 **그 경로에서는** CAS
  불일치가 유일한 실패다.
- `sendPlan`의 전송 순서는 `dep-remove` → `disarm` → 레인 op → `dep-add` → 큐 op다
  (`planResult`).
- `disarmOps`는 confirmed 레인에서 **떠나는** 멤버의 disarm만 계획한다.
- `runLane`은 `▶ 진행`·`▶ 이어서 진행`·`▶ 다시 진행` 세 클릭의 유일한 진입점이다
  (`runLaneAction`).
- ADR 0035: 확정은 `blocks` 의존만, 적재와 arm은 `▶ 진행`. 그 Decision이 명시한 "레포마다
  place(들) → arm이고 revision 체이닝·부분 실패 토스트는 현행" 조항을 이 스펙은 바꾸지
  않는다 — 그 순서를 **처음으로 실제로 성립시킬 뿐이다**. ADR 0011: `auto_advance`는 별개
  스위치이며 이 스펙은 그 의미를 바꾸지 않는다.

## 3. 사용자 결정

1. confirmed 레인은 멤버가 **2개 미만**이 되면 `draft`로 돌아간다. 확정 조건(2개 이상)과
   대칭이며, 1개 남은 확정 레인은 인접 쌍이 없어 확정의 의미가 없다. 빈 레인 자동 삭제는
   하지 않는다(UI-jaua §5.1 "자동 삭제는 없다" 유지).
2. (2026-09-04 재결정, 초판 뒤집음) §1.3은 **`MESSAGE_TYPES`에 빠진 세 op을 등록**하고,
   서버 dispatch `case` 전부가 그 목록에 있는지 대조하는 테스트로 재발을 막아 푼다.

   서버 단일 op(`worker-queue-run`)도 클라이언트 재시도 변경도 하지 않는다. 관측된 결함의
   원인이 전송 등록 누락 하나이고, CAS 경쟁은 arm이 서버에 닿은 적이 없어 **한 번도 일어난
   적이 없기 때문이다**. 등록 뒤 place → tick → arm 경쟁이 실제로 관측되면 그때 근거를
   가지고 별도 Bead로 판단한다(§12).

## 4. 설계 원칙

- 규칙은 한 곳에 둔다. 상태 복귀는 서버 `monitor-lane-update`가, 적재와 arm은 `▶ 진행`이
  한다(ADR 0035 그대로).
- **프로토콜 표면의 정본은 하나이며 대조로 지킨다.** 서버가 받는 op 집합과 클라이언트가
  보낼 수 있는 op 집합이 어긋나면 요청은 예외가 아니라 빈 응답으로 조용히 사라진다.
  사람이 두 목록을 동기화하는 대신 테스트가 대조한다.
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

## 7. 범위 3 — 미등록 메시지 타입 3건의 등록과 대조 테스트

### 7.1 등록

`app/protocol.js`에 세 op을 더한다. 두 곳을 함께 고쳐야 한다 — `MessageType` typedef의
union과 `MESSAGE_TYPES` 배열이다.

- `monitor-lane-provenance` — 기존 `monitor-lane-remove` 다음, 모니터 레인 op 묶음 안.
- `worker-queue-arm`, `worker-queue-disarm` — 기존 `worker-queue-remove` 다음, 워커 큐 op
  묶음 안. 서버 `connection.js`의 dispatch 순서와 같은 자리다.

주석은 달지 않는다. 이 파일의 다른 항목과 같은 모양으로 들어가는 값이며, 왜 빠졌었는지는
이 스펙과 커밋이 기록한다.

**다른 변경은 없다.** 서버 핸들러·`connection.js`·`queue-store.js`·`lane-drag.js`·
`runLane`은 전부 현행 그대로다. 세 op의 payload·응답·CAS 규약도 이미 서버에 구현돼 있고
바뀌지 않는다.

### 7.2 재발 방지 대조 테스트

`app/protocol.test.js`에 테스트 하나를 더한다.

`server/ws/connection.js`를 텍스트로 읽어 dispatch의 `case '<type>':` 를 모두 뽑고, 그
집합에서 `ping`을 뺀 나머지가 `MESSAGE_TYPES`의 부분집합인지 본다. 실패 메시지는 빠진
타입 이름을 그대로 싣는다.

- 정규식은 `/case '([a-z0-9-]+)':/g` 하나다. dispatch의 `case`는 전부 그 한 줄 형태다.
- `ping`은 서버가 받기만 하고 이 앱은 보내지 않는 진단용 op이므로 제외 목록에 이름으로
  남긴다.
  제외는 이 하나뿐이고, 늘리려면 그 이유가 테스트 안에 적혀야 한다.
- 반대 방향(`MESSAGE_TYPES`에만 있고 서버에 없는 타입)은 보지 않는다. 서버가 보내는
  이벤트 타입(`*-snapshot`, `workspace-changed` 등)이 정상적으로 그쪽에만 있다.

이 테스트가 §1.3의 결함 클래스를 닫는다. 사람이 두 목록을 맞추는 대신 대조가 강제된다.

### 7.3 하지 않는 것

- 서버 단일 op(`worker-queue-run`)를 만들지 않는다(§3-2).
- `sendCas`의 무조건 1회 재시도를 비롯해 `app/views/worker/lane-drag.js`를 손대지 않는다.
  Worker 탭과 UI-58y2 `[대기로 ↴]`가 공유하는 검증된 동작이고 이 스펙이 검토한 표면이
  아니다.
- `runLane`의 place → arm 순서, revision 체이닝, 부분 실패 토스트를 바꾸지 않는다
  (ADR 0035 그대로).
- `transport`의 `PROPAGATED_ERROR_TYPES`를 넓히지 않는다. 미등록 타입이 `[]`로 삼켜지는
  것은 §7.2의 테스트가 막으므로, 오류 전파 정책을 op마다 다시 고르지 않는다.

## 8. 에러 처리

- §5.1: `not_found`·CAS conflict는 현행 `sendLaneFailure`. conflict는 `runPlanned`가
  최신 레인으로 재계획한다 — 그때 남는 멤버 수도 다시 세므로 disarm 범위도 다시 정해진다.
- §5.2: disarm 실패는 fail-quiet(현행). 레인은 draft가 되고 남은 arm은 orphan 칩과 그
  해제 버튼으로 드러난다(§5.2 둘째 문단, UI-jaua §5.6 슬롯 4).
- §7: 등록만 하므로 새 에러 경로가 없다. 등록 뒤 `worker-queue-arm`의 실패는 서버가
  이미 구현한 CAS conflict 하나이고, 현행 `sendQueueCas`가 `큐가 바뀌었습니다 — 다시
  시도해 주세요`로 그린다. `sendCas`의 1회 재시도가 그 앞에 선다.

## 9. 재현

- **`▶ 진행`이 실제로 arm한다.** 빈 확정 레인에 두 레포 후보를 드롭 → `확정` → `▶ 진행`
  → 레포마다 place → arm이 서버에 도달하고 두 레포 모두 `armed_by_lane`이 기록된다.
  헤더가 `▶ 진행 중`으로 바뀐다. 등록 전에는 첫 arm에서 토스트로 끝났다.
- **`⏸ 정지`가 실제로 해제한다.** `▶ 진행 중` 레인에서 `⏸ 정지` → 멤버 레포의
  `armed_by_lane`이 지워지고 헤더가 되돌아간다.
- **빈 확정 레인에 드롭.** 드롭 → 레인 update + dep만, 큐 변화 없음, 행 칩 `진행 대기`.
- **확정 레인에서 멤버를 빼 1개로.** 행 `✕` → 계획: dep-remove(레인 소유분) → disarm(떠나는
  멤버 + 남는 멤버) → lane update → 서버가 `draft`로 복귀 → 스냅샷 헤더 `draft`, `확정`
  버튼 비활성(1개).
- **대조 테스트.** `MESSAGE_TYPES`에서 `worker-queue-arm`을 지우면 `app/protocol.test.js`가
  그 이름을 실어 실패한다.

## 10. 검증 bundle

- `server/ws/monitor-handlers.cross-lanes.test.js`: update로 confirmed 레인이 1개·0개가
  되면 `draft`; 2개 이상 재배열은 `confirmed` 유지; 복귀 뒤 `confirm`이 다시 거부(1개)·
  허용(2개).
- `app/views/monitor/drop-plan.test.js`: (a) 527행 "appends a candidate to a confirmed lane"
  기대값에서 `worker-queue-place` 제거(구현을 테스트에 맞추지 않는다); (b) confirmed 레인
  2개 중 하나가 떠나면 `disarm` payload가 두 멤버를 다 싣는다(레포가 다르면 레포별 op);
  (c) 3개 중 하나가 떠나면 떠나는 멤버만; (d) confirmed 행 → repo-serial place는 현행 유지.
- `app/views/worker/lane-model.test.js`: draft 레인을 가리키는 `armed_by_lane`이 orphan
  칩으로 그려진다; confirmed 레인은 현행 `▶ 연결 n`.
- `app/main.monitor.e2e.test.js`: 398행 확정 레인 드롭 e2e의 전송 순서 기대값에서 큐 op가
  빠진다(§6의 강제 귀결).
- `app/protocol.test.js`: (a) `MESSAGE_TYPES`가 `monitor-lane-provenance`·
  `worker-queue-arm`·`worker-queue-disarm`을 담는다; (b) §7.2의 대조 —
  `server/ws/connection.js`의 dispatch `case` 집합에서 `ping`을 뺀 나머지가
  `MESSAGE_TYPES`의 부분집합이고, 실패 메시지가 빠진 타입 이름을 싣는다.
- `app/views/monitor/index.test.js`: `runLane`이 arm까지 보내고 성공하면 실패 토스트가
  없다(2959행 describe 확장). 현행 전송 순서·재시도 규약은 그대로 검증된다.
- `app/protocol.md`(§5.1 한 문장)·UI-j92s 스펙 표 정정.
- **손대지 않는 것**: `app/views/worker/index.test.js`의 `sendCas` conflict 재시도 테스트
  둘(796행, 8616행). 이 스펙은 `lane-drag.js`를 바꾸지 않으므로 둘 다 현행대로 통과해야
  한다. 통과하지 않으면 범위를 벗어난 변경이 들어간 것이다.
- Pre-Handoff: `npm run tsc`, `npx vitest run --reporter=dot`, `npm run lint`,
  `npm run prettier:write`, `npm run build`.

## 11. 구현 unit 후보

단일 패킷이다. §5.1(서버 한 조건문), §5.2·§6(`drop-plan.js`·`lane-model.js`),
§7(`protocol.js` 세 줄 + `protocol.test.js` 테스트 하나), 문서 두 곳.

## 12. 경계·후속

- 비목표: 서버 단일 op `worker-queue-run`(§3-2). `app/views/worker/lane-drag.js`의 재시도
  규약(§7.3). `runLane`의 op 순서·체이닝(§7.3). `transport`의 오류 전파 정책(§7.3).
  빈 레인 자동 삭제(§3-1). `auto_advance` ON 레포에서 place가 곧 발차인 의미(UI-jaua §5.2,
  ADR 0011).
- **후속 판단 지점**: 등록 뒤에는 `runLane`의 place → tick → arm 경쟁이 처음으로 실제
  가능해진다. `sendCas`의 1회 재시도가 흡수하지 못하는 실패가 관측되면 그때 서버 단일 op를
  근거를 가지고 판단한다. 관측 전에 프로토콜 표면과 ADR을 늘리지 않는다.
- `UI-q1tg`(모니터 실행 재료·대기 진입 유예)는 그 결정 2 "`▶ 진행` 같은 명시적 실행 지시는
  즉시 나간다"를 검증하려면 arm이 서버에 닿아야 하므로 이 Bead를 선행으로 갖는다.
  `bd dep add UI-q1tg --blocked-by UI-91fl --type blocks`로 엣지를 걸었다.
- 관찰: 복귀로 빈 draft가 2개 공존할 수 있다 — 생성 버튼의 중복 방지 규칙과 무관하고
  사용자가 `✕`로 지우면 되므로 Bead를 만들지 않는다.
- 관찰: `monitor-lane-provenance` 누락은 드롭 계획의 provenance 각인을 조용히 없애 왔다.
  등록으로 함께 닫히고, 이미 각인 없이 만들어진 기존 레인의 소급 복구는 하지 않는다 —
  provenance는 삭제 시 "레인이 만든 의존만 되돌린다"의 근거이고, 없으면 되돌리지 않는
  안전한 쪽으로 떨어진다.
- 관찰: `revisionOfRoot`가 첫 op의 revision을 스냅샷에서 찾는 방식은 그대로다.

## 결정 (ADR 후보)

- 전제: ADR 0035 — 확정은 `blocks` 의존만 쓰고 적재와 arm은 `▶ 진행`이 한다. §6은 그
  결정에서 빠진 드롭 경로를 같은 규칙으로 맞추는 정정이고, §7은 그 Decision이 명시한
  "레포마다 place(들) → arm이고 revision 체이닝·부분 실패 토스트는 현행"을 바꾸지 않고
  처음으로 성립시킨다. supersede 대상이 없다.
- 전제: ADR 0011 — `auto_advance`는 별개 스위치. 이 스펙은 그 의미를 바꾸지 않는다.
- confirmed 레인은 멤버 2개 미만이면 draft로 돌아가고 남는 arm은 함께 해제한다.
  되돌리기 어려움: 아니다 — 핸들러 조건문 하나와 disarm 범위 하나. 맥락 없이 놀라움:
  disarm 동반 이유는 §2의 스케줄러 사실에서 나오며 코드 주석으로 충분하다. 실재한 대안:
  0개만 복귀·자동 삭제(§3-1). → ADR 아님
- 클라이언트 전송 허용 목록과 서버 dispatch 집합을 테스트가 대조한다. 되돌리기 어려움:
  아니다 — 테스트 하나이고 지우면 현행으로 돌아간다. 맥락 없이 놀라움: 아니다 — 테스트
  이름과 실패 메시지가 무엇을 대조하는지 그대로 말한다. 실재한 대안: 두 목록을 한 파일로
  합치는 것(서버가 클라이언트 파일을 import하게 되어 계층이 뒤집힌다)과 현행 수동 동기화.
  → ADR 아님
