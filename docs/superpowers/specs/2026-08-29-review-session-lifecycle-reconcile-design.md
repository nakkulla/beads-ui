---
scope:
  - server/worker/scheduler.js
  - server/worker/review-session.js
  - server/worker/attach.js
---

# `review_session`의 생존·슬롯·정산 트리거를 scheduler reconcile이 소유한다 — 판정은 큐가 그대로 (UI-k4jm)

- Bead: UI-k4jm (`route=spec_backed`, bug, P1)
- 출처: UI-qksl impl 리뷰(codex, 2026-08-28)가 찾은 기존 결함 둘 (UI-qksl PR #232 착지 뒤)
- 선행 스펙: `2026-08-27-head-review-layer-removal-design.md`(UI-d7fy §5),
  `2026-08-28-auto-review-dispatch-on-hold-design.md`(UI-qksl §4·§5)
- 날짜: 2026-08-29

## 1. 문제

### 1.1 재시작을 살아남은 `review_session`은 정산 주체가 없다

`review_session` attempt(`[리뷰 후 머지]` 클릭·큐의 자동 dispatch)는 구현 attempt와 같은
`launchSession`으로 뜨고, 프로세스가 살아 있는 동안은 `onSessionDone` →
`reviewSession.complete()`(UI-d7fy §5.4)가 정산한다. 서버가 재시작되면 그 핸들이
사라지고, 이후 이 attempt를 끝내 줄 주체가 없다.

- 부팅의 `attach.js recoverReviewSessions`는 `pending`(launch 전 사망)과 프로세스가
  `gone`/`recycled`인 `running`만 `session_lost:*`로 종단한다. 프로세스가 살아 있거나
  probe가 `unknown`이면 의도대로 그대로 둔다(살아 있는 리뷰어를 죽이지 않기 위해).
- `recoverRunningAttempts`가 그 attempt에 monitor(로그 tail·usage·guard)를 붙이지만,
  monitor는 설계상 "끝을 판정하지 않는다"(`session-monitor.js` 머리말).
- 주기적 `scheduler.reconcile`(60초)은 `isSchedulerOwned`(= `kind === 'implementation'`)로
  `review_session`을 아예 보지 않는다. 테스트
  `leaves a running review session attempt out of the orphan sweep`가 그 결정을 고정한다.

결과: 프로세스가 끝나도 attempt는 영구 `running`이다. UI-qksl §4 3번의 per-Bead
in-flight 가드(`reviewSessionInFlight`)가 영원히 참이므로 `review_dispatch` claim은
`active`로 남고, 그 head에 자동 dispatch도 없으며 `[리뷰 후 머지]` 클릭도 완전 no-op이다.
§4 4번의 "`active`인데 attempt 없음 → `exhausted` 정정"도 attempt가 있으니 작동하지
않는다. 남는 사실상의 출구는 취소 CAS(§5.6)뿐인데, 재시작 뒤에는 `running` 핸들이 없어
`stopReviewSessionProcess`가 프로세스를 죽이지 못하고 행만 지운다.

### 1.2 슬롯 fence는 durable `running` 리뷰 세션을 세지 않는다 — Bead 전제의 정정

Bead 본문은 "fence가 리뷰 세션을 세지 않아 보류 행이 M개면 자동 리뷰 M개가 동시에 뜰 수
있다"고 했다. 코드는 그보다 좁다.

- `occupiedBeadIds(q)`는 `new Set(claimed)`로 시작하고, `dispatchReviewSession`은 launch
  직전에 `claimed.add(bead_id)`를 한다. 그래서 **같은 프로세스 안에서 실행 중인 리뷰
  세션은 트리거가 무엇이든 이미 슬롯 점유로 잡힌다.**
- 머지 큐 드레인은 행을 순차 처리하고(`await processItem(head)`), `holdEntry` →
  `judgeAutoReviewDispatch` → `startAuto` → `launch`까지 await 사슬이므로, 앞 행의 자동
  리뷰가 `claimed`에 들어간 뒤에야 다음 행의 fence가 판정된다. 동시 자동 리뷰 수는
  `slots`에 걸린다.
- `isSchedulerOwned` 제외가 실제로 새는 곳은 **durable 분기 하나**다: 재시작 뒤
  `claimed`가 비어 있고 살아남은 `running` `review_session`은 "프로세스가 죽었다고 증명되지
  않은 durable running attempt"인데도 세지 않는다. 그 세션이 살아 있는 동안 fence와 구현
  dispatch 둘 다 그 슬롯을 비어 있다고 읽는다.

즉 1.1과 1.2는 같은 predicate(`isSchedulerOwned`)의 같은 갈래(재시작 뒤 durable 기록)가
만든 결함이다. ADR 0015의 fence 의미("자동 항목은 워크스페이스 실행 슬롯 여유로 판정")는
바꾸지 않는다 — live 경로가 이미 리뷰 세션을 세고 있고, 이 스펙은 재시작 전후의 답을
같게 만들 뿐이다.

### 1.3 인접 구멍: live 경로에서도 binding 상실 attempt는 아무도 종단하지 않는다

리뷰 세션이 영수증을 쓴 뒤 종료하기 전에 kick이 오면(PR poller·큐 변경) 게이트는 영수증을
`current`로 읽어 머지하고 `dequeue`로 행을 지운다. 그 뒤 프로세스가 끝나면
`complete()`는 `bindingAlive`가 거짓이라 `binding_gone`을 돌려주고, `onSessionDone`은 그때
아무것도 쓰지 않는다(UI-d7fy 속성 3 "A DEAD BINDING WRITES NOTHING"). 속성 3은 취소
CAS가 attempt를 **먼저** `failed: cancelled`로 종단하는 경우를 위한 것이었는데, 행이
머지로 사라진 경우에는 attempt를 종단한 주체가 없다. 그래서 live 경로에서도 attempt가
영구 `running`으로 남는다 — 뿌리는 1.1과 같다(binding을 잃은 `review_session`의 lifecycle을
아무도 소유하지 않는다). 부수 효과: 그 bead는 `activeBeadIdsFrom`(비terminal attempt)에
남고, UI-8wpb/UI-e20c의 큐 파일 이관에서 영원히 hold된다.

## 2. 사용자 결정 (2026-08-29)

1. **정산 주체는 reconcile이다.** 구현 attempt와 같은 60초 pid probe로 프로세스 종료를
   감지하고, 리뷰 전용 처분으로 기존 `complete()`(최종 head 재관측 + push 기록 +
   guard_kill 증거)를 호출해 attempt·claim을 정산한다. 부팅에서 살아남은 프로세스를
   죽이는 안(진행 중인 REVISE 수정을 버리고 그 head의 자동 1회를 낭비)과 부팅 시 입양
   감시자를 따로 두는 안(결국 pid 폴링이라 reconcile과 중복)은 기각.
2. **fence는 durable 분기도 live와 동일하게 센다.** `occupiedBeadIds`의 durable 분기가
   `review_session`도 세도록 해 재시작 전후의 fence 답을 같게 한다. 자동 리뷰 전용
   동시성 한도는 두지 않는다 — 새 knob·UI·정규화가 늘고, 리뷰 세션도 같은 머신 자원을
   쓰므로 따로 셀 물리적 근거가 없다.
3. **binding 상실 attempt도 이 Bead에서 닫는다.** `complete()`가 binding_gone을 판정할 때
   attempt가 아직 `pending|running`이면 행은 건드리지 않고 attempt만 `orphaned`
   (`cause: 'binding_gone'`)로 종단한다. 취소 CAS가 이미 종단한 attempt는 terminal이라
   덮어쓰지 않으므로 속성 3의 의도(취소 기록 보존)는 유지된다.

## 3. 설계

### 3.1 소유권을 두 겹으로 가른다

지금 `isSchedulerOwned`는 "이 엔진이 attempt의 lifecycle 소유자인가"와 "이 엔진이 attempt의
판정 소유자인가"를 한 predicate로 묶고 있다. UI-d7fy가 `review_session`을 제외한 이유는
후자(판정은 큐의 것 — `disposeDeadAttempt`의 PR 관측으로 리뷰를 판정하면 `pr_missing`으로
실패시킨다)였는데, 전자까지 같이 잃었다.

이 스펙은 둘을 가른다.

| 질문 | 소유자 | 근거 |
| --- | --- | --- |
| 살아 있는가(pid probe), 슬롯을 점유하는가, 죽었을 때 정산을 **시작**하는가 | scheduler (`reconcile`·`occupiedBeadIds`) | 이 엔진이 `launchSession`으로 띄웠고 pid·process_identity·session log·guard hook을 이 엔진이 기록한다 |
| 죽은 세션의 결과가 무엇인가(영수증 current? claim은 어느 head에 exhausted?) | 큐 (`review-session.js complete` → `settleReviewSession`) | UI-d7fy §5.4·UI-qksl §5.2 그대로 |

구현 형태: `isSchedulerOwned(attempt)`를 **lifecycle 소유 predicate**로 재정의한다 —
`kind ∈ {implementation, review_session}`이면 참(`retired_kind`는 거짓). 판정 소유는
`reconcile`의 dead 처분에서 kind로 가른다(3.3). `occupiedBeadIds`·`reconcile`의 두 호출처
외에 이 predicate를 쓰는 곳은 없다.

### 3.2 `reconcile`: 후보 선별은 같고, 처분만 kind로 가른다

후보 선별의 세 fence(`running.has`·`settling.has`·`claimed.has(bead_id)`)와 `isDeadAttempt`
(pid + start time; `pid == null`은 dead)는 두 kind에 똑같이 적용된다. `review_session`에
대해 이 판정이 건전한 이유:

- durable `status:'running'`은 `dispatchReviewSession`이 `claimed.add(bead_id)` **뒤에**
  `upsertReviewSessionAttempt({status:'running'})`로 쓰고, `launchSession`이 spawn 직후
  `pid`·`process_identity`를 같은 attempt에 기록한다. 그러므로 `pid == null`인 `running`
  `review_session`이 `claimed`에 없다는 것은 이 프로세스가 spawn 전에 죽었다는 뜻이고,
  부팅 `recoverReviewSessions`가 같은 기록을 `gone`(identity 없음)으로 읽는 것과 일치한다.
- `pending`은 후보가 아니다(`status !== 'running'` → continue). claim write와 `running`
  upsert 사이의 await 구간(`snapshotBead`·`restoreWorktree`·계정 레이어 읽기)에서
  reconcile이 돌아도 손대지 않는다. 그 구간에서 서버가 죽으면 부팅 복구가
  `session_lost:never_launched`로 종단한다(기존).

dead 루프의 fresh 재읽기·`discardActive` fence·`status === 'running'` 재확인은 그대로
타고, 그 뒤 `attempt.kind === 'review_session'`이면 `disposeDeadReviewSession`, 아니면
기존 `disposeDeadAttempt`다.

### 3.3 `disposeDeadReviewSession(workspace, attempt_id, attempt)`

`onSessionDone`의 리뷰 분기를 핸들 없이 재현한다. 순서는 `disposeDeadAttempt`와 같다.

1. `settling.add(attempt_id)` — 처분 중 discard 요청이 `attempt_settling`으로 거부되게.
2. `sessionMonitors.stop(workspace, attempt_id)` — 로그를 EOF까지 drain해 usage 집계와
   꼬리의 guard 증거를 확정한다(UI-o2yt §3.3). 실패는 로그만.
3. drain **뒤에** `guardKillOf(workspace, attempt_id)`를 읽는다.
4. verdict — exit code는 관측 불가이므로 `exit: null`:
   - guard_kill 기록이 있으면 `{ session_ok: false, reason: 'guard_kill' }` →
     `complete()`가 `session_failed:guard_kill`로 정산(기존 분기).
   - 없으면 `{ session_ok: true, reason: 'reconciled' }` → `complete()`가 최종 head를
     재관측해 영수증으로 판정(기존 분기): `current`면 `done` + authority 재결속 + claim
     삭제 + `kick()`; 아니면 `failed: receipt_not_current` + 보류 사유 갱신 + claim
     `exhausted`(head는 §5.2 규칙 — push 기록이 hook 디렉터리에 아직 있어야 하므로
     hook 제거는 6번이다).
5. `complete()`의 반환이 `binding_gone`이 아니면 `updateAttempt({ exit: null,
   ...usagePatch })` — `onSessionDone` 리뷰 분기와 같은 규칙. `binding_gone`이면 3.5가
   attempt를 이미 종단했으므로 추가 write 없음.
6. `finally`: `settling.delete`, `removeGuardHook(workspace, attempt_id)`.
7. `notifyChanged(workspace)` 뒤 `tick(workspace)` — 비워진 슬롯을 구현 레인이 채우고,
   queue-changed 이벤트로 머지 큐가 보류 행을 재판정한다(`hasHeldEntry()` → 드레인).
   `complete()`가 `current`에서 이미 `kick()`을 호출하므로 별도 kick은 없다.

bead claim(`claimed.add`)은 잡지 않는다. `disposeDeadAttempt`가 claim을 잡는 이유는
`failAttempt`가 bead를 `open`으로 되돌려 tick이 재dispatch할 수 있어서인데, 리뷰 처분은
bead 상태를 건드리지 않고(bead는 `pr_wait`) `complete()`는 bead를 다시 열지 않는다.

`complete()` 자체는 바꾸지 않는다(3.5 제외). 두 트리거(클릭·자동)와 두 종료 경로(live
핸들·reconcile)가 같은 함수를 쓴다.

### 3.4 `occupiedBeadIds`: durable 분기가 `review_session`도 센다

3.1의 predicate 재정의로 자동으로 따라온다. 효과 둘:

- `queueConflictBlocked`(= UI-qksl §4 5번 fence, ADR 0015): 재시작을 살아남은 리뷰 세션이
  살아 있는 동안 슬롯 하나를 차지한다 — live에서 `claimed`가 세던 것과 같은 답.
- `tickPass`의 구현 dispatch: 같은 슬롯을 비어 있다고 읽지 않는다. 재시작 전에 `claimed`로
  막히던 것과 같은 답.

리뷰 세션이 죽으면 3.2가 정산하고 슬롯이 돌아온다. 살아 있는 동안은 `isDeadAttempt`가
거짓이라 점유가 유지된다 — 구현 attempt와 같은 규칙.

### 3.5 `complete()`: binding을 잃은 비terminal attempt는 `orphaned`로 종단한다

`bindingAlive(attempt_id)`를 세 갈래로 나눈다.

| 상태 | 판정 | write |
| --- | --- | --- |
| attempt 없음·kind 다름·이미 terminal | `binding_gone` | 없음 (취소 CAS 등 다른 주체가 종단했다 — UI-d7fy 속성 3) |
| attempt `pending\|running`인데 행이 없거나 `entry.authority.id !== attempt.authority_id` | `binding_gone` | **attempt만** `updateAttempt({ status: 'orphaned', cause: 'binding_gone', control: null, finished_at })`; 행·claim·authority는 건드리지 않는다(행이 없거나 남의 것이다) |
| attempt `pending\|running`이고 authority 일치 | alive | 기존 정산 |

이 규칙은 **`complete()` 안의 두 자리 모두**에 적용한다. `bindingAlive`는 `observeReviewReceipt`
(`gh` 호출, 수 초)를 기다리기 **전**의 검사라서, 그 대기 중에 행이 머지·취소로 사라지거나
authority가 바뀌면 뒤의 `settle()` → `settleReviewSession`이 `binding_gone`을 돌려준다. 그
결과도 같은 갈래로 처리한다 — `settle()`의 반환이 `binding_gone`이고 attempt가 아직
`pending|running`이면 attempt만 `orphaned`로 종단하고 `{ ok: false, reason: 'binding_gone' }`을
돌려준다. 구현은 "binding_gone 판정 → attempt가 비terminal이면 orphan write" 한 헬퍼로 두고
앞의 검사와 `settle()`의 네 호출처가 그것을 공유한다(리뷰어 지적, 2026-08-29 codex).

반환값은 `{ ok: false, reason: 'binding_gone' }` 그대로다. `onSessionDone`의 "binding_gone이면
exit·usage를 쓰지 않는다" 규칙과 그 테스트는 유지된다 — 이미 주인이 바뀐 기록에 exit를
덧쓰지 않는다는 의도는 같고, `orphaned` write는 그 기록의 **마지막 소유자**로서 끝을
찍는 것이다.

`orphaned`를 고른 이유: `done`은 "lineage가 영수증으로 닫혔다"는 뜻이라 거짓이고,
`failed`는 행이 있을 때 실패 배지를 만든다. `orphaned`는 이미 있는 terminal 상태로
"소유자가 사라져 중단됨"을 뜻하며(`app/views/worker/index.js` 상태 라벨 `중단됨`), UI는
`review_session`을 `running`일 때만 카드에 그리므로(`reviewSessionAttemptStates`) 행이
사라진 bead에서 아무 배지도 만들지 않는다. `activeAttemptStates`는 구현 attempt만 보므로
미처리 실패로도 읽히지 않는다.

### 3.6 부팅 복구는 그대로다

`recoverReviewSessions`는 바꾸지 않는다. `pending`과 `gone`/`recycled`를 부팅 즉시 종단하는
빠른 경로이고, 살아 있거나 `unknown`인 기록은 그대로 두어 3.2의 느린 경로(최대 60초 +
프로세스 수명)에 맡긴다. `unknown`(identity 없는 구형 기록 등)은 `isDeadAttempt`의
`probePid`가 다시 판정한다 — 두 probe가 다른 답을 내는 경우는 부팅 시 `unknown`이었던
것이 reconcile에서 dead로 읽히는 방향뿐이며, 그때는 3.3이 영수증으로 판정하므로 살아
있는 리뷰어를 죽이는 일은 없다(처분은 프로세스에 시그널을 보내지 않는다).

### 3.7 바뀌지 않는 것

- `queue.json` 모양, `review_dispatch` claim 전이(UI-qksl §5), `auto_review_wait`,
  UI(카드·배지·버튼). 이 스펙은 서버 배선만 바꾼다.
- 취소(UI-d7fy §5.6) 경로, `stopReviewSessionProcess`.
- `onSessionDone`의 리뷰 분기.
- 자동 dispatch 판정(UI-qksl §4)의 여섯 조건.

## 4. 전이 요약

재시작을 살아남은 `review_session` attempt(durable `running`, `claimed` 없음):

| 시점 | 지금 | 이 스펙 |
| --- | --- | --- |
| 부팅, 프로세스 살아 있음 | `running` 유지 + monitor | 같음 |
| 살아 있는 동안 | fence·구현 dispatch가 슬롯을 비어 있다고 읽음 | 슬롯 점유 (3.4) |
| 프로세스 종료 후 ≤60초 | 영구 `running`, claim `active`, 버튼 no-op | `complete()`로 정산 → `done`(머지 재판정) 또는 `failed: receipt_not_current`/`session_failed:guard_kill`(claim `exhausted`, 버튼 재활성) (3.3) |
| 행이 먼저 사라진 뒤 종료 | 영구 `running` | attempt `orphaned: binding_gone` (3.5) |

## 5. 테스트

`server/worker/scheduler.test.js`

- 교체: `leaves a running review session attempt out of the orphan sweep` →
  `settles a dead review session through the queue verdict` — durable `running`
  `review_session`(pid 죽음)에 `reconcile`을 돌리면 `reviewSession.complete`가
  `{ session_ok: true, reason: 'reconciled' }`로 1회 호출되고, monitor stop → guard hook
  제거 순서가 지켜진다.
- 추가: `leaves a live review session attempt running` — pid 살아 있고 start time 일치면
  `complete` 미호출, 상태 `running`.
- 추가: `reports a guard kill on a dead review session as a failure` — attempt에 `guard_kill`
  기록이 있으면 `{ session_ok: false, reason: 'guard_kill' }`.
- 추가: `writes exit and usage after a settled review session, none after binding_gone`.
- 추가: `disposes a dead review session that never got a pid` — `pid: null` durable running,
  `claimed` 없음 → 처분.
- 교체: `leaves a live review session attempt out of the occupied slot count` →
  `counts a live detached review session attempt as an occupied slot` — `slots: 1`,
  pid 살아 있음 → `queueConflictBlocked(WS, 'UI-2', 'UI-2') === true`; 같은 조건에서 pid
  죽음 → `false`.
- 추가: `tick does not dispatch into a slot a detached review session holds`.

`server/worker/review-session.test.js`

- 추가: `orphans a still-running attempt whose row is gone` — 행 없음 →
  `{ ok: false, reason: 'binding_gone' }` + attempt `orphaned`/`cause: 'binding_gone'`,
  다른 행·claim 무변경.
- 수정: `writes nothing when the authority was reissued under the session` → 행은 무변경이되
  attempt는 `orphaned`(제목을 `orphans the attempt, not the row, when the authority was
  reissued under it`로).
- 추가: `orphans the attempt when the row disappears during the re-observation` —
  `observeReviewReceipt`가 resolve되기 전에 행을 dequeue → `settle()`이 `binding_gone` →
  attempt `orphaned`, 반환 `{ ok: false, reason: 'binding_gone' }`.
- 유지: `writes nothing at all when the cancel already took the binding` — terminal attempt는
  그대로.

`server/worker/attach.test.js`: 부팅 복구 테스트 변경 없음.

전체: `npm run tsc` · `npx vitest run --reporter=dot`(timeout 120초) · `npm run lint` ·
`npm run prettier:write` · `npm run build`(프런트 소스 무변경이면 번들 동일 확인).

## 6. 검증 시나리오 (수동)

1. `[리뷰 후 머지]`로 리뷰 세션을 띄운 뒤 `bdui-shared restart` — 세션이 끝나면 60초 안에
   attempt가 `done`/`failed`로 바뀌고 행의 `review_dispatch`가 삭제/`exhausted`되며, 실패
   시 버튼이 다시 살아난다.
2. `slots: 1`에서 위 재시작 직후 다른 bead의 자동 리뷰 보류 행이 `리뷰 세션 슬롯 대기`를
   표시하고, 리뷰 세션이 끝나면 자동으로 뜬다.

## 구현 unit 후보

- 한 unit: `scheduler.js`(predicate 재정의·`disposeDeadReviewSession`·reconcile 분기)와
  `review-session.js`(3.5)는 같은 테스트 묶음으로 검증되고 서로를 전제하므로 나누지
  않는다. `attach.js`는 변경이 없을 것으로 예상되며, 배선 변경이 필요해지면 같은 unit이다.

## 결정 (ADR 후보)

- **`review_session`의 생존 판정·슬롯 점유·정산 트리거는 scheduler reconcile이, 결과 판정은
  큐가 소유한다.**
  - 되돌리기 어려움: 성립 — predicate 하나가 reconcile과 fence 두 판정을 같이 정하므로,
    되돌리면 영구 `running`과 슬롯 누락이 함께 돌아온다.
  - 맥락 없이 보면 놀라움: 성립 — 큐 레인의 attempt를 scheduler의 고아 sweep이 처분하면서
    판정은 다른 모듈에 있다. 이전 코드는 주석과 테스트로 정반대(제외)를 고정했다.
  - 실제 trade-off: 성립 — 부팅 시 종료(단순, 살아 있는 리뷰 폐기)·부팅 시 입양 감시자
    (별도 계층)·reconcile 공유(최대 60초 지연) 중 선택.
  - summary 초안: "review_session은 구현 attempt와 같은 reconcile pid probe로 생존·슬롯·정산
    시작을 판정하고, 죽은 세션의 결과는 큐의 complete()가 영수증으로 판정한다; 살아
    있는 리뷰어를 죽이는 부팅 종료는 두지 않는다"
  - 충돌 ADR: 없음. ADR 0015(슬롯 기반 fence)·0019(head당 1회)와 정합. UI-d7fy §5.5의
    "reconcile 제외"는 스펙 문장이며 이 스펙이 supersede한다.
- binding 상실 attempt의 `orphaned` 종단(3.5): 되돌리기 어려움 불성립(한 함수의 지역 규칙)
  — ADR 아님.

## 경계·후속

- 없음 — 다른 저장소·소유자로 갈라지는 작업이 없다.

scope 겹침(`stale-rereview-inputs.py`, 2026-08-29):

| Bead | 상태 | 겹치는 경로 | 관계 |
| --- | --- | --- | --- |
| UI-8jau (`2026-08-28-worker-prerequisite-wait-tier-design.md`) | in_progress | `scheduler.js`, `attach.js` | 같은 파일의 다른 절. 8jau는 `onSessionDone`의 구현 attempt 종결 판정·`settleFailureTier`·터미널 status 집합(`waiting` 추가)·`attach.js`의 `bd.readIssue` 주입을 만지고, 이 스펙은 `isSchedulerOwned`·`reconcile`의 dead 처분·`occupiedBeadIds`·`disposeDeadReviewSession`(신설)을 만진다. `onSessionDone`의 리뷰 분기는 8jau의 판정 삽입 위치(`recordReceiptCheck` 뒤) 앞에서 return하므로 서로 닿지 않는다. 새 `waiting` 상태는 terminal이며 `review_session`은 그 상태를 얻지 않는다. 먼저 착지하는 쪽이 base가 되고, 뒤쪽은 staleness re-review로 정합한다. 의존 엣지 없음 |
| UI-e20c (`2026-08-29-queue-transfer-suffix-invariant-design.md`) | open | `scheduler.js` | 같은 파일의 다른 절. e20c는 이관 reader(`activeLaneLineages`·`latestImplementationAttempt`·`resumableResidueAttempts`·`resolveConflict`)를 읽기만 하고 `queue-store.js`의 이관 판정을 바꾼다. 이 스펙의 §1.3·§3.5(비terminal `review_session`의 `orphaned` 종단)는 e20c의 hold 규칙("bead에 미처리 attempt가 있으면 이관 불가")이 영구 hold로 굳는 원인 하나를 없애는 관계이며, e20c의 규칙 자체는 바꾸지 않는다. 의존 엣지 없음 |
- 관찰: 재시작 뒤 취소(§5.6)는 `running` 핸들이 없어 살아남은 프로세스를 죽이지 못한다
  (`stopReviewSessionProcess`가 monitor만 멈춤) — 이 스펙 뒤에는 그 세션이 끝나면 3.5가
  `orphaned`로 닫으므로 기록은 정리되지만, 즉시 종료를 원하면
  `processController.terminate` 배선이 따로 필요하다. 사용자 요청·소비자 대기 없음.
- 관찰: 1.3의 경쟁(영수증 write와 프로세스 종료 사이의 kick)은 머지 자체는 옳으므로
  게이트가 in-flight 리뷰 세션을 기다리게 하지 않는다. 3.5가 그 결말을 정리한다.
