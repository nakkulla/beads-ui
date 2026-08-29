---
scope:
  - server/worker/queue-store.js
  - server/worker/queue-store.test.js
  - server/worker/record-retention.js
  - server/worker/attempt-failure.js
  - server/worker/scheduler.js
---

# `queue.json` 이관을 bead 단위에서 attempt 단위로 — 접미(suffix) 불변식

- Bead: UI-e20c (`route=spec_backed`)
- 선행: UI-8wpb (PR #233) — `2026-08-28-worker-record-timeline-retention-design.md` §7
- 날짜: 2026-08-29

## 1. 문제

`2026-08-28-worker-record-timeline-retention-design.md` §7은 처리 완료 terminal
attempt를 `queue.json`에서 `beads/<id>/attempts/<attempt_id>.json`으로 옮겨 큐 파일을
"살아 있는 것과 미처리 상태만" 가진 상태 파일로 만들라고 했다. UI-8wpb는 이관 판정을
**bead 단위**로 착지시켰다(`server/worker/queue-store.js` `beadsWithLiveRecords`):
bead에 미처리 attempt가 하나라도 있거나 어떤 레인에든 앉아 있으면 그 bead의 처리 완료
기록까지 전부 큐에 남는다.

이유는 "그 bead의 마지막 구현 attempt"를 `queue.attempts` **집합**으로 계산하는
reader들이었다. 부분 집합만 이관하면 답이 바뀐다 — 새 `done`을 내보내고 더 오래된
미dismiss `failed`가 남으면 그 실패가 bead의 마지막 attempt가 되어 unhandled로
되살아나고 auto-advance 복원을 닫는다.

남은 문제: 실행 중인 attempt를 가진 bead는 §7이 없애려던 누적을 그대로 갖는다. 그리고
실행 중인 bead는 대기 레인 `q.queue`에도 그대로 남아 있으므로(`appendAttempt`는 레인을
건드리지 않고 스케줄러가 메모리 `claimed`로만 건너뛴다), attempt 판정만 좁혀서는 레인
hold가 같은 누적을 만든다.

## 2. 결정 요약

reader는 손대지 않는다. 이관 규칙을 **접미 불변식**으로 바꾼다:

> 살아 있는 `queue.attempts`는 각 bead 이력의 **최신 접미(suffix)**다. 한 attempt는
> 이관 가능 레코드(§3: 처리 완료 terminal이고 직렬 레인을 점유하지 않음)이고 **같은
> bead의 더 오래된 attempt 전부가 같은 pass에서 이관 가능할 때만** 큐를 떠난다.
> "오래된"은 `q.attempts`의 삽입 순서다.

접미 위에서 계산한 "마지막 구현 attempt"는 전집합 위에서 계산한 것과 같다(접미가
비어 있지 않은 한 최댓값은 보존되고, 비어 있으면 전집합의 마지막도 처리 완료 terminal이라
모든 reader가 "판정할 것 없음"으로 읽는다). 그래서 reader 이관도, 합집합 조회의
비용·캐시 무효화 설계도 필요 없다.

Bead 본문이 제안한 대안(A: reader 8곳을 `readAttemptsForBead` 합집합으로 이관 + 캐시)은
누적을 완전히 0으로 만들지만 매 tick 대기 bead마다 파일 I/O를 열고 scheduler·pr-actions·
merge-candidates·pr-poller의 테스트 표면을 넓힌다. 사용자 결정(2026-08-29): B(접미
불변식) 채택.

## 3. 이관 규칙 (`transferableAttempts`)

```
held = heldBeads(q)                                   # §4
for a in Object.values(q.attempts) (삽입 순서, 오래된 것부터):
  if a.bead_id ∈ held or a.bead_id ∈ stopped: continue
  if !isTransferableRecord(q, a):                     # 첫 비이관 레코드에서 그 bead 종료
    stopped.add(a.bead_id); continue
  candidates.push(a)
```

- **순서는 `q.attempts`의 삽입 순서다 — timestamp가 아니다.** 보존해야 할 reader
  (`createUnhandledFailurePredicate`의 `last_attempt_by_bead`, `scheduler.js`
  `latestImplementationAttempt`, `activeLaneLineages`의 `pr_wait`/discard 조회)는 모두
  `Object.values(q.attempts)`를 순회해 **마지막으로 만난** 레코드를 "마지막 attempt"로
  삼는다. 이관 순서가 그 순서와 다르면(시계 역행·legacy timestamp로 나중 `done`의
  시각이 더 작은 경우) 접미가 깨져 오래된 미dismiss `failed`가 부활한다. 삽입 순서는
  persist(JSON 직렬화)와 load(`normalizeQueue`의 `Object.entries` 순회 재구성)를 거쳐
  보존되고, 기존 키 재대입은 자리를 옮기지 않으며, 이관의 `delete`는 나머지 순서를 바꾸지
  않는다. `readAttemptsForBead`의 시각 정렬은 표시 순서이므로 그대로 둔다 — 그것은 판정
  순서가 아니다. 이 구분은 코드 주석에 고정한다.
- **이관 가능 레코드 `isTransferableRecord(q, a)`** = 처리 완료 terminal **이고** 직렬
  레인을 점유하지 않는 것:
  - 처리 완료 terminal 정의는 지금과 같다: `done`·`discarded`·`superseded`, 그리고
    `dismissed_at`이 숫자인 `failed`. `paused`·`stopped`·`orphaned`·`parked`·
    `retry_wait`·`running`·미dismiss `failed`는 미처리다.
  - **직렬 레인 점유**(`scheduler.js` `activeLaneLineages`의 규칙): `serial_lane_id`가
    직렬 레인이고, status가 해제 집합 `LANE_RELEASING_STATUSES`(`done`·`stopped`·
    `discarded`) 밖이며, 다른 attempt가 `resumed_from`으로 잇지 않은 **leaf**인 레코드는
    착지·폐기 전까지 레인 mutex를 쥔다. `dismissed_at`은 UI hide일 뿐 해제가 아니므로
    dismissed `failed`와 `superseded`가 여기 해당한다. 이런 레코드를 이관하면 다른
    lineage가 그 레인에 조기 진입한다. 따라서 이관 불가이며, 접미를 막는다.
  - 해제 집합은 한 곳에만 둔다: `LANE_RELEASING_STATUSES`를 `queue-store.js`가 export하고
    `scheduler.js`가 import한다(지금은 scheduler에만 있다). 두 사본이 어긋나면 이관과
    점유가 다른 답을 낸다.
- **kind를 구분하지 않는다.** `review_session`·`resolution`·`disposition`·`retired_kind`
  attempt도 같은 bead 이력의 한 줄이다. 전체 순서의 접미는 그 부분 순서(구현 attempt만)의
  접미이기도 하므로 `isImplementationAttempt`로 거르는 reader의 답도 보존된다.
- bead당 개수 상한은 두지 않는다(§7 그대로).
- `record-retention.js` §8.3 step 1 마이그레이션은 같은 `transferableAttempts`를
  export로 쓰므로 자동으로 같은 규칙을 탄다. 별도 마커·별도 마이그레이션 없음.

## 4. bead 전체 hold (`beadsWithLiveRecords` → `heldBeads`)

남기는 hold — bead의 **처리 완료 레코드를 재료로 읽는** 경로의 보호:

| hold | 보호하는 reader |
|---|---|
| `pr_wait` 레인 멤버 | `pr-poller.js`(verify_result의 PR 번호) · `pr-actions.js` `expectedBaseFor`(target_base) · `pr-actions.js` receipt baseline(가장 최신 구현 attempt) |
| `merge_queue` 레인 멤버 | `merge-candidates.js` 완료 subject(target_base·base_oid) |
| 미종료 completion saga(`isFinishedCompletionIntent` false) | completion-intent가 참조하는 `done` attempt |
| 진행 중 discard(`phase !== 'done'`) | `discard-coordinator.js` — 이미 `readAttemptsForBead` 합집합을 쓰지만 진행 중 operation이 집합 변화를 보지 않게 유지 |
| repair-lane 보류 계획의 attempt_ids | `transferProcessedAttempts`의 `withheld` — 단, 지금 코드는 그 attempt **하나만** 건너뛰고 같은 bead의 더 최신 후보를 계속 내보내므로 접미가 깨진다. §7의 규칙으로 바꾼다: withheld를 만나면 그 bead의 나머지 후보도 이번 pass에서 건너뛴다 |

제거하는 hold:

- **대기 레인(`q.queue`·`serial_lanes`) 멤버십.** 대기 bead의 reader는 모두 "마지막 구현
  attempt"(`settledAttemptFence`·`latestImplementationAttempt`) 또는 미처리 상태만
  (`resumableResidueAttempts`: failed/orphaned/paused)을 본다. 접미 불변식이 전자를,
  처리 완료 정의가 후자를 보존한다. 직렬 레인의 **점유**는 레인 멤버십이 아니라
  attempt 레코드(§3 `isTransferableRecord`)가 지키므로 레인 hold가 필요 없다.
- **"미처리 attempt가 하나라도 있으면 bead 전체"** 규칙. §3의 per-bead 순회가 이를
  attempt 단위로 대체한다.

`done` 레인은 지금처럼 hold가 아니다.

## 5. reader 영향 — 변경 없음의 근거

| reader | 보는 것 | 보존 근거 |
|---|---|---|
| `attempt-failure.js` `createUnhandledFailurePredicate` (`auto-advance-restore.js`, `settleMootRepairFailures`) | bead의 마지막 구현 attempt(`superseded`, 삽입 순서 마지막), `queue.done` 시각 | 판정 대상 attempt는 큐에 있으므로 접미 비어 있지 않음 → 삽입 순서 마지막 보존(§3). `queue.done`은 attempt가 아니라 레인 엔트리로 무관 |
| `scheduler.js` `activeLaneLineages` (직렬 레인 mutex) | 해제 집합 밖의 leaf attempt의 `serial_lane_id`; `pr_wait`·discard bead의 삽입 순서 마지막 attempt | 점유 레코드는 `isTransferableRecord`가 이관 불가로 판정(§3); `pr_wait`·discard는 hold(§4) |
| `scheduler.js` `latestImplementationAttempt`·`settledAttemptFence` | 마지막 구현 attempt | 접미 보존; 접미가 비면 null = 전집합 마지막이 처리 완료라 fence 없음(같은 답) |
| `scheduler.js` `resumableResidueAttempts` | failed/orphaned/paused + `resumed_from` 집합 | 대상은 전부 미처리라 잔류. `resumed_from`을 가진 attempt는 대상보다 최신이므로 접미에 함께 있음 |
| `scheduler.js` `resolveConflict` source | session_id 가진 최신 구현 attempt | 충돌 해소는 `pr_wait`/`merge_queue` bead → hold |
| `pr-poller.js` PR 번호 | verify_result 가진 구현 attempt | `pr_wait` hold |
| `merge-candidates.js` 완료 subject | target_base·base_oid 가진 구현 attempt | `merge_queue`/`pr_wait` hold |
| `pr-actions.js` `expectedBaseFor`·receipt baseline | target_base / 최신 구현 attempt | `pr_wait` hold |
| `discard-coordinator.js` `beadAttempts` | 합집합 | 이미 `readAttemptsForBead` |

행동 차이 하나: 대기 레인 bead가 **처리 완료 이력만** 가지면 이제 전부 이관된다. 오늘
"레인 밖 bead"가 받는 것과 같은 취급이며, 그 bead에 대해 어느 reader도 처리 완료
레코드를 요구하지 않는다(위 표). 새 상태 아님.

원래 우려 시나리오 `failed(미dismiss, halted)` → `done` → `running`: `failed`가 첫
미처리 레코드라 그 bead에서 아무것도 이관되지 않는다. 실패의 부활 경로가 규칙 자체로
닫힌다.

## 6. 남는 누적과 그 범위

비이관 레코드(미dismiss `failed`·`parked`·`paused`·`stopped`·`orphaned`·`retry_wait`,
그리고 직렬 레인을 점유하는 leaf `failed(dismissed)`·`superseded`) **뒤의** 처리 완료
기록은 그 레코드가 처리될 때까지 큐에 남는다. 이는 사람이 보고 dismiss·재개·폐기할
상태이거나 레인 착지·폐기를 기다리는 상태이고, 그 처리 순간 다음 persist에서 접두가
함께 나간다. §7의
"미처리 상태만"과 충돌하지 않는다 — 미처리 상태가 붙잡는 것이므로.

## 7. 순서 보장·원자성

`transferProcessedAttempts`의 흐름은 그대로다: 후보마다 타임라인 terminal 이벤트
append(§5 순서 보장) → `attempts/<id>.json` 임시 파일→rename→readback → `next.attempts`에서
제거, 전부 같은 persist 안에서. 후보 중 하나가 이벤트·파일 쓰기에 실패하면 그 attempt는
남고 다음 pass에서 재시도한다. **실패한 attempt보다 최신인 같은 bead의 후보는 이번
pass에서 이관하지 않는다** — 그래야 큐가 접미로 유지된다. repair-lane `withheld`
attempt도 같은 취급이다: 만나면 그 bead의 나머지 후보를 이번 pass에서 건너뛴다(지금
코드의 "그 attempt만 `continue`"는 접미를 깬다). 구현: 후보 목록을 삽입 순서로
순회하며 bead별 `stopped` 집합을 두고, 한 bead에서 첫 실패·withheld가 나면 그 bead의
나머지 후보를 건너뛴다.

`readAttempt`/`readAttemptsForBead`의 dedupe(라이브 우선)와 크래시 창 처리는 변경 없음.

## 8. 테스트 (`queue-store.test.js` `record transfer` describe)

1. `done·done·running` → 앞 둘 이관, running 잔류.
2. `failed(미dismiss)·done·running` → 아무것도 이관되지 않음.
3. 레인 밖 `done·failed(dismissed)·done` → 셋 다 이관.
4. 대기 레인(`q.queue`) bead의 `done·running` → done 이관(레인 hold 제거 확인).
5. `pr_wait` bead의 `done` → 잔류(hold 유지 확인).
6. 이관 뒤 `createUnhandledFailurePredicate`: `failed(halted, 미dismiss)·done·running`
   bead에서 failed가 unhandled로 판정되지 않음 — 이관 전후 같은 답(원래 우려 고정).
7. **timestamp 역전**: 삽입 순서 `failed(미dismiss)` → `done`인데 `done`의
   `started_at`/`finished_at`이 더 작음 → 아무것도 이관되지 않음(삽입 순서 판정 고정).
8. 접미 중간 후보의 파일 쓰기 실패 → 그보다 최신 후보는 같은 pass에서 잔류(§7).
9. repair-lane `withheld` attempt 뒤의 같은 bead `done` → 같은 pass에서 잔류; 보류
   해제 뒤 다음 pass에서 함께 이관.
10. **직렬 레인 점유**: `serial_lane_id`를 가진 leaf `failed(dismissed)` → 잔류하고
    `activeLaneLineages`가 그 레인을 계속 점유로 봄; 더 최신 attempt가 `resumed_from`으로
    이으면(leaf 아님) 이관됨; `superseded` leaf도 같은 규칙.
11. `LANE_RELEASING_STATUSES`가 `queue-store.js` export 하나임(scheduler 테스트의 기존
    기대는 import 경로만 바뀜).
12. `record-retention` 마이그레이션 테스트: in-flight bead의 처리 완료 접두가 이관됨
    (기존 "bead 전체 잔류" 기대가 있으면 갱신).

기존 테스트 중 "bead 전체 잔류"를 기대하는 것(`leaves a restarted process its running
attempts after a transfer` 등)은 접미 규칙의 기대로 갱신한다. 구현 코드를 테스트에
맞추지 않는다.

## 9. 문서·주석

- `beadsWithLiveRecords` 주석("per-attempt로 단순화하지 마라")을 접미 불변식의 근거로
  교체하고 함수명을 `heldBeads`로 바꾼다. 남는 hold 각각이 어떤 reader를 보호하는지
  §4 표를 한 줄씩 옮긴다.
- `isProcessedTerminalAttempt`는 `isTransferableRecord(q, attempt)`로 감싼다(§3). 주석에
  "판정 순서 = 삽입 순서, `readAttemptsForBead`의 시각 정렬은 표시 전용"을 고정한다.
- `LANE_RELEASING_STATUSES`는 `queue-store.js`로 옮겨 export하고 `scheduler.js`
  `activeLaneLineages`가 import한다. 의미 변경 없음.
- `2026-08-28-worker-record-timeline-retention-design.md` §7 원문은 그대로 유효하다
  (attempt 단위 이관을 말함). 이 spec이 그 §7의 이관 판정 규칙을 구체화한다.

## 10. 범위 밖

- reader의 `readAttemptsForBead` 합집합 이관(대안 A) — 채택하지 않음.
- 실패 분류·큐 정지(UI-5ym8), 보존 정책 자체(§8), dotfiles 계약.

## 11. 교차 (scope overlap)

- **UI-8jau** (`in_progress`, `2026-08-28-worker-prerequisite-wait-tier-design.md`):
  `server/worker/queue-store.js`를 공유한다. 같은 파일의 **다른 함수** — UI-8jau는
  `TERMINAL_ATTEMPT_STATUSES`와 직렬 레인 해제 집합에 `'waiting'`을 더하고
  `PROCESSED_TERMINAL_STATUSES`에는 넣지 않는다(그 스펙 §4.5). 이 스펙의 §3은
  `isProcessedTerminalAttempt`를 그대로 쓰므로 `waiting`은 미처리로 읽혀 접미를 막는다 —
  UI-8jau의 기대("`waiting` attempt는 `transferableAttempts`에 들지 않음", 그 스펙 §7 (h))는
  접미 규칙 아래에서도 그대로 성립한다. 두 스펙이 같은 상수를 만진다: UI-8jau는 직렬
  레인 해제 집합에 `'waiting'`을 더하고, 이 스펙은 그 집합(`LANE_RELEASING_STATUSES`)을
  `queue-store.js`로 옮겨 export한다(§3·§9). 의미는 합성 가능하다 — `waiting`은 해제
  집합에 있어도 처리 완료 terminal이 아니므로 이관 불가이고, 옮긴 뒤의 집합에
  `'waiting'`을 더하면 UI-8jau의 의도가 그대로 성립한다. 의존 edge는 두지 않는다
  (어느 쪽이 먼저 착지해도 다른 쪽의 판정이 바뀌지 않음); 뒤에 착지하는 쪽이 상수의
  위치와 `queue-store.test.js`의 textual 충돌을 해소한다.

## 구현 unit 후보

단일 unit: `server/worker/queue-store.js`(`transferableAttempts`·`heldBeads`·
`isTransferableRecord`·`transferProcessedAttempts`·`LANE_RELEASING_STATUSES` export) +
`server/worker/scheduler.js`(import 한 줄) + `queue-store.test.js` +
`record-retention.test.js` 기대 갱신.

## 결정 (ADR 후보)

- **살아 있는 `queue.attempts`는 bead 이력의 최신 접미다 — 이관은 접미 불변식으로
  판정하고 reader는 라이브 큐만 본다.**
  - 되돌리기 어려움: 성립 — §5 표의 reader 전부가 "라이브 큐 = 삽입 순서의 최신 접미"에
    암묵적으로 의존하므로 불변식을 깨려면 reader 전부를 합집합 조회로 먼저 옮겨야 한다.
  - 맥락 없이는 의외: 성립 — 처리 완료된 `done`이 더 오래된 미dismiss 실패 때문에 큐에
    남는 것은 규칙을 모르면 버그로 읽힌다.
  - 실제 트레이드오프: 성립 — 미처리 레코드 뒤의 누적을 허용하는 대신 매 tick 파일 I/O와
    캐시 무효화 설계를 피한다.
  - summary: 살아 있는 `queue.attempts`는 bead 이력의 최신 접미이며, 처리 완료 attempt는
    같은 bead의 더 오래된 attempt가 전부 이관 가능할 때만 큐를 떠난다. "마지막 구현
    attempt" 판정은 라이브 큐만 보고 합집합 조회를 쓰지 않는다.
