---
scope:
  - server/worker/scheduler.js
  - server/worker/scheduler.external-wait.test.js
---

# 세션 소유 외부 대기 재개는 Bead의 직렬 대기줄을 넘긴다 (UI-yig0)

## 1. 문제

2026-11-07 CRC-rokit `rokit-471`의 세션 소유 외부 대기 `w-fd10a71c083c`가 `completing`(wallace
잡 249351 FAILED, `recovery_needed`)에 이른 뒤 「워커로 이어가기」를 누르자
`재개 실패 · serial_lane_not_head`로 거절됐다. 그 Bead는 직렬 대기줄 `s1`의 유일하고 맨 앞
entry였다. 거절 이유가 실제 원인을 말하지 않는다.

원인은 입력값 하나다. 세션 소유 대기 재개(`fork`·`fresh`)는 lane 없음(`serial_lane_id: null`)으로
launch를 요청하는데, lane 울타리는 그 요청을 Bead의 실제 대기 lane(`s1`)과 비교해
`serial_lane_not_head`로 거절한다. 어떤 lane에도 없는 Bead는 같은 요청이 통과하므로, 예전에
직렬 대기줄에 배치된 Bead가 세션에서 외부 대기를 걸었을 때만 드러난다.

## 2. 검증된 전제

모든 인용은 base `98737beb` 기준이다.

- 세션 소유 대기는 prior attempt가 없어 `fork`·`fresh` 재개가 `launchExternalWaitSession`으로
  가고, Worker 소유 대기는 `relaunchFromAttempt`로 간다 — server/worker/scheduler.js:15196-15199,
  15286-15344
- `launchExternalWaitSession`은 lane lease를 `serial_lane_id: null`로 잡는다 —
  server/worker/scheduler.js:15465-15472
- 같은 함수의 prerecord는 attempt에 `serial_lane_id`를 기록하지 않는다 —
  server/worker/scheduler.js:15558-15599
- `laneLaunchRefusal`은 continuation이 아닌 launch의 요청 lane이 `waitingLaneOf`와 다르면
  `serial_lane_not_head`를 내고, lane이 있으면 다른 lineage 점유(`serial_lane_occupied`)와 맨 앞
  여부(`serial_lane_not_head`)를 차례로 판정한다 — server/worker/scheduler.js:6114-6160, 1008-1015
- `acquireLaneLaunch`는 동기 acquire이고, `lease.revalidate`는 새 입력으로 같은 울타리를 다시
  판정하며 예약 lane을 갱신한다 — server/worker/scheduler.js:6169-6214
- 일반 dispatch는 `serialHeadOf`로 lane을 읽고 prerecord 직전에 다시 판정하며, 최종 lane을
  attempt에 기록한다 — server/worker/scheduler.js:12697-12720, 13144-13158, 13191
- 직렬 대기줄 맨 앞이 아닌 entry의 `[지금 시작]`도 `serial_lane_not_head`로 거절된다 —
  server/worker/scheduler.js:20311-20325
- attempt 기록은 대기 lane을 건드리지 않는다. lane entry는 attempt가 도는 동안 남고
  `moveToPrWait`·`moveToDone`·`remove`·`dropFromQueue` 등으로만 빠진다 —
  server/worker/queue-store.js:9386-9398, 5947-5962, 11324, 12027
- lane 점유는 attempt에 찍힌 `serial_lane_id`로 계산되고, 같은 lineage는 스스로를 막지 않으며
  `failed`는 lane을 점유한다 — server/worker/scheduler.js:1221-1278, 978-985;
  server/worker/queue-store.js:2356-2364
- Worker 소유 대기 재개는 `continuation: true`와 `prior.serial_lane_id`를 넘겨 이 결함과
  무관하고, 자식 attempt도 `prior.serial_lane_id`를 물려받는다 —
  server/worker/scheduler.js:18310-18315, 18379
- 외부 PR 충돌 dispatch도 lane 없이 launch하고 레지스트리 존재만 확인한다. 레지스트리 등록은 활성
  Bead만 빼고 lane 멤버는 빼지 않으며, lane에서 `pr_wait`로 옮기는 `reconcileExternalPrWait`는 별도
  poller 단계이고 비종료 attempt가 있으면 옮기지 않는다. 그래서 등록 뒤 lane 이동 전에는 같은
  `serial_lane_not_head` 거절이 날 수 있다 — server/worker/scheduler.js:17314-17317, 17434-17441,
  17452-17455, 5373-5379; server/worker/attach.js:1962-1986; server/worker/pr-poller.js:491-503;
  server/worker/queue-store.js:11386-11426
- `launchExternalWaitSession`은 acquire 뒤 `fresh` 분기에서 잔재 관측·워크트리 준비를 await하고,
  그 뒤 `installGuardHook`(동기)·prerecord가 await 없이 이어진다 — server/worker/scheduler.js:15465-15472,
  15512-15544, 15546-15557, 4934
- 재개 거절은 `externalWaitResumeError`가 `resume`을 `attempt_id: null`·`error`로 되돌려 쓰고 호출부가
  그 경로로 돌려주므로 같은 버튼으로 다시 재개할 수 있다 — server/worker/scheduler.js:15031-15048,
  15345-15352, 15192; server/worker/external-wait/store.js:79-90
- Worker 레인 화면은 `serial_lane_not_head`를 행 순번이 이미 말하는 사실로 보고 admission 배지를
  그리지 않는다 — app/views/worker/lane-model.js:2097-2102
- `[세션에서 이어가기]`(`session`)는 lane 울타리를 거치지 않는다 — server/worker/scheduler.js:15245-15256
- 실측: `rokit-471`은 `s1`의 유일 entry이고, 이전 attempt 넷(`waiting`·`external_job` 둘,
  `waiting`·`prerequisite_unmet`, `failed`·`stale_work_unresolved`)이 모두 `serial_lane_id: s1`이다.
  대기 기록은 `owner.kind=session`, `resume.error=serial_lane_not_head`다 — `python3`으로
  `~/.local/state/bdui/CRC-rokit-b45eb569227a/queue.json`·`external-wait.json` 읽음

## 3. 목표

- 직렬 대기줄 맨 앞에 있고 다른 lineage가 그 lane을 점유하지 않은 Bead의 세션 소유 외부 대기를
  「워커로 이어가기」(`fork`)·「새 세션으로」(`fresh`)로 재개할 수 있다.
- 재개가 연 Worker attempt는 같은 lane에 기록되어 일반 dispatch와 똑같이 lane 울타리의 보호를
  받는다.
- 거절은 실제 원인을 말한다(다른 lineage 점유면 `serial_lane_occupied`, 맨 앞이 아니면
  `serial_lane_not_head`).

## 4. 설계

### 4.1 lane 선택 — 세션 소유 대기 재개는 첫 시작이다

결정 — 세션 소유 대기 재개는 Bead의 현재 대기 lane을 넘기는 비-continuation launch로 판정한다
(대안: continuation으로 취급해 점유만 검사; 이유: 이 재개는 그 Bead의 첫 Worker attempt를 여는
것이고, 사람의 명시적 `[지금 시작]`도 lane 순서를 지키므로 같은 규칙을 따른다).

- `launchExternalWaitSession`의 launch 입력 lane은 acquire 시점에 새 큐 스냅숏에서 동기로 읽은
  Bead의 대기 lane이다(`waitingLaneOf`; 병렬 대기열·무소속이면 null). 예:
  `serial_lane_id: waitingLaneOf(deps.store.snapshot(workspace), bead_id)`.
- `continuation`은 넘기지 않는다(false). 그래서 직렬 lane의 Bead는 기존 울타리가 다른 lineage
  점유 → 맨 앞 여부 순으로 판정한다.
- 어느 lane에도 없는 Bead는 지금과 같은 null이 되어 동작이 바뀌지 않는다.
- 외부 작업 완료 대화의 `인계`가 여는 `fork`(`conversation` 지정)도 같은 함수를 지나므로 같은
  규칙을 받는다.

### 4.2 prerecord 직전 재판정

- acquire와 prerecord 사이에는 await가 있다(`fresh`의 잔재 관측·워크트리 준비). 그 구간 뒤 첫
  상태 변경인 `installGuardHook` 바로 앞에서 대기 lane을 새 스냅숏으로 다시 읽어 잡고 있는
  lease를 `revalidate`한다. 재판정부터 prerecord까지는 await가 없다.
- 재판정이 거절하면 lease를 놓고 거절 이유를 그대로 돌려준다. 남는 것은 기존 prerecord 이전
  거절(`guard_hook_install_failed` 등)과 같다 — guard hook·attempt 기록은 없고, 이번 호출이 준비한
  워크트리는 그대로 남는다. 대기 기록에는 `externalWaitResumeError`가 쓰는 `resume.error`가 남아
  같은 버튼을 다시 누를 수 있다.

### 4.3 attempt에 lane 기록

- `launchExternalWaitSession`이 기록하는 attempt는 재판정이 받아들인 lane을 `serial_lane_id`로
  갖는다(lane 없으면 null). "기록된 lane은 launch가 실제로 쓴 lane과 같다"는 일반 dispatch 규칙을
  따른다.
- 그래서 실행 중 attempt가 `activeLaneLineages`에서 lane을 점유하고, 이후
  `relaunchFromAttempt`(이어하기·재시도·다음 외부 대기 재개)가 `prior.serial_lane_id`로 lane을
  물려받는다.
- 대기 lane entry는 launch 때 소비하지도 복원하지도 않는다. 일반 dispatch처럼 entry는 자리에
  남고 기존 출구(`pr_wait`·`done`·`remove`)로 빠진다.

### 4.4 거절 이유 이름

결정 — lane 불일치 거절 이름은 `serial_lane_not_head`로 둔다(대안: 새 코드
`serial_lane_mismatch`로 분리; 이유: 올바른 lane을 넘기도록 고치면 불일치는 Bead가 다른 lane으로
옮겨진 경쟁에서만 나고, 그때 "요청 lane의 맨 앞이 아니다"는 정확하다).

## 5. 경계·비목표

- 결정: 외부 PR 충돌 dispatch(`dispatchExternalConflict`)의 lane 없는 launch는 이 spec에서 바꾸지
  않는다 — 레지스트리 등록과 lane 이동 사이 창에서 같은 거절이 날 수 있지만(§2), 이미 PR이 있는
  해소 작업에 맨 앞 판정을 적용할지·continuation으로 볼지는 이 재개와 다른 설계 선택이라 별도로
  다룬다(§8).
- 결정: Worker 소유 대기 재개(`relaunchFromAttempt`)는 바꾸지 않는다 — 이미 prior lane과
  continuation을 넘긴다(§2).
- `[세션에서 이어가기]`, 레인 화면 배지·라벨, lane 배치·철회 조작은 바꾸지 않는다.
- UI-68r5(잔재 처분 실패를 대화로 여는 spec)는 세션 제외 집합과 타일 그리기
  (`server/ws/lane-membership.js`·`app/views/worker/lane-model.js`)를 바꾸고 이 spec의 launch
  울타리와 판정을 공유하지 않으므로 순서 의존이 없다. UI-68r5가 다루는 `failed`·
  `stale_work_unresolved` attempt는 같은 lineage로 lane을 점유하므로 이 재개를 막지 않는다.

## 6. 테스트

`server/worker/scheduler.external-wait.test.js`에 더한다(세션 소유 대기, `completing`):

- `launches a fork resume of a session-owned wait whose bead heads a serial lane`
- `launches a fresh resume of a session-owned wait whose bead heads a serial lane`
- `refuses the resume with serial_lane_occupied when another lineage occupies the lane`
- `refuses the resume with serial_lane_not_head when the bead is not the lane head`
- `stamps the waiting lane on the attempt the resume records`
- `keeps the lane on a relaunch from the resumed attempt`
- `launches a session-owned wait resume lane-free when the bead sits in no lane`
- `refuses the resume when the bead moves behind another entry before the prerecord`(`fresh`의
  워크트리 준비 await 동안 Bead를 다른 lane의 맨 앞이 아닌 자리로 옮긴 뒤 `serial_lane_not_head`
  거절과 attempt 미기록을 확인)
- `records the new lane when the bead moves to the head of an empty lane before the prerecord`(같은
  await 동안 빈 lane의 맨 앞으로 옮기면 재판정이 그 lane으로 승인하고 attempt가 그 lane을 갖는다)

수용 기준: 위 9개와 기존 external-wait·scheduler 테스트, `npm run tsc`·`npm run lint`가 통과한다.

## 7. 결정 (ADR 후보)

- 세션 소유 외부 대기 재개는 Bead의 대기 lane을 넘기는 첫 시작으로 판정하고 그 lane을 attempt에
  기록한다 — 한 launch 경로를 기존 lane 울타리 규칙에 맞추는 동작 수정이라 함께 옮길 소비자가
  없어 되돌리기 쉽다 → ADR 아님
- lane 불일치 거절 이름은 `serial_lane_not_head`로 둔다 — 현 어휘 유지라 되돌리기 쉽다 → ADR 아님

## 8. 경계·후속

없음 — 변경은 한 함수와 그 테스트 안에서 닫힌다.

- 관찰: 외부 PR 충돌 dispatch의 lane 불일치 거절 창(§2·§5) — 해소 작업의 lane 판정 방식이 별도 설계
  선택이라 이 spec 밖이고, 이 세션 종료 시 결함 후속 Bead로 등록한다
