---
scope:
  - server/ws/snapshot-retention.js
  - server/ws/snapshot-retention.test.js
  - server/ws/worker-handlers.js
  - server/ws.worker-queue.test.js
  - server/ws.monitor-pipeline.test.js
  - app/data/closed-range.js
  - app/data/closed-range.test.js
  - app/views/worker/index.js
  - app/views/monitor/index.js
  - app/main.js
  - app/main.bundle.js
  - app/main.bundle.js.map
---

# UI-qbbg — WS 스냅샷 페이로드 다이어트: 보존 상한과 내부 필드 제거

## 1. 문제

UI-d509가 동일 payload 재전송을 막은 뒤에도, Worker 세션이 살아 있는 동안은
`last_event_at`·usage 틱(3초 코얼레스)마다 `worker-queue-snapshot`과
`monitor-pipeline-snapshot` **전체**가 다시 나간다. 크기의 원인은 persisted
`queue.json`에 보존 상한이 없어 `attempts`·`done`·`repo_operations`가 무한히
쌓이고, `decorateQueue()`가 그 전부를 그대로 실어 보내는 것이다.

2026-08-25 beads-ui 워크스페이스 실측(`queue.json`, 프롬프트 제거 후 wire 근사):

| 키 | 개수 | 바이트 | 비고 |
|---|---|---|---|
| `attempts` | 176 | 523 KB | running 1 · done 145 · failed 23 · discarded 5 · stopped 2. 종료 후 7일 이내 77개, 최고 30일 |
| `repo_operations` | 125 | 170 KB (persisted) | succeeded 121 · failed 4, 최고 11일 |
| `done` | 130 | 25 KB | 최고 29일 |

종료 attempt 필드 중 큰 것은 `usage_legs` 51 KB · `exec_values` 35 KB ·
`delegation_sessions` 29 KB · `usage` 24 KB · `verify_result` 21 KB ·
`receipt_check` 12 KB · `base_drift` 11 KB다. 모니터 스냅샷은 visible
워크스페이스마다 같은 `decorateQueue()` 결과를 합치므로(dotfiles 738 KB,
microbiome_bile 283 KB 포함) 크기 문제가 그대로 배가된다.

이 스펙은 **push projection만** 줄인다. persisted 상태·프로토콜·클라이언트
스토어는 바꾸지 않고, 클라이언트는 완료 레인 기간 옵션 하나만 맞춘다.

## 2. 검증된 전제

- 클라이언트 스토어 둘(`app/data/worker-queue-store.js`,
  `app/data/monitor-pipeline-store.js`)은 **전체 교체(last snapshot wins)**이며
  per-id 북키핑이 없다. "스냅샷에 없는 attempt = 삭제"로 해석하는 경로는 스토어에
  없고, 뷰는 `q.attempts[id]`가 없으면 null로 조용히 처리한다.
- 뷰가 **종료 attempt를 읽는 곳**은 셋이다. ① 완료·PR대기 카드의 토큰 합계
  `sumAttemptUsage(attempts, bead_id)`(`app/utils/token-usage.js`; 같은 bead의
  모든 attempt `usage`+`usage_legs`를 `receipt_id`로 중복 제거하며 합산)
  ② 완료 카드 `done_kind` 배지 `latestTerminalAttempt`·head review 배지
  ③ 이슈 상세 패널 세션 이력(`app/views/detail-panel/index.js attemptsForBead`,
  `usage_legs`·`delegation_sessions`·`exec_values`·`cause_detail` 소비, 위임
  transcript는 `attempt_id`+`launch_id`로 `delegation_sessions`를 찾는다).
  세 곳 모두 **bead 단위**로 attempt를 모으므로, 보존을 bead 단위 all-or-nothing으로
  하면 표시가 어긋나지 않는다.
- 실행중 분류기 `app/utils/active-attempts.js activeAttemptStates`는 서버
  (`monitor-handlers.js laneCountsFor`)와 클라이언트가 공유한다. leaf paused는
  뒤따르는 attempt의 `resumed_from`이 가리키면 활성이 아니고, failed/orphaned는
  bead의 마지막 구현 attempt이면서 `done.added_at`이 `finished_at`보다 앞서고
  `dismissed_at`이 없을 때만 "미처리"다. `resumed_from` 체인은 같은 bead 안에서만
  이어진다.
- 종료 attempt의 다음 필드는 클라이언트 소스(`app/`, 번들·테스트 제외)에서 한 번도
  읽히지 않는다: `verify_result`·`verify_cmd_result`·`receipt_check`(클라이언트가
  읽는 `receipt_check`는 `pr_observations`의 것)·`receipt_baseline`·`base_drift`·
  `process_identity`·`guard_warnings`·`exec_stamped_keys`·`exec_restore_values`·
  `continuation_action`(클라이언트가 읽는 것은 `merge_queue` 항목의 것).
- `projectRepoOperations`는 `repair.attempt_id`로 attempt 상태를 붙이는
  **서버측 교차 참조**를 가진다(현재 데이터엔 0건). 클라이언트 repo ops
  타임라인은 최근 5개(펼침 20개, `app/views/worker/repo-ops-timeline.js`)만 그리며,
  PR대기 진행 stepper(`pr-wait-progress.js`)는 `subjects[].bead_id`로 op을 bead에
  묶는다. `server/worker/resolution-ladder.js normalizeResolutionSubjects`는
  `state ∈ {failed, repairing}`·`failure.code` 있음·`superseded_by` 없음인 op을
  미해결 대상으로 본다.
- 완료 레인 기간 드롭다운(`오늘/7일/30일/전체`, 기본 `오늘`)은 Board Closed 컬럼과
  `CLOSED_RANGE_OPTIONS`를 공유하지만 선택값은 별도 키(`bdui.worker.done-range`)다.
  같은 값이 `app/main.js`의 Worker 탭 `closed-issues` 구독 `since`에도 쓰인다.
- 모니터 `hasPipeline()`은 `done`이 비어 있지 않으면 레포를 파이프라인에 넣는다.
- `queue-store.js pruneDoneBefore`는 호출처가 없는 죽은 코드다. persisted 보존
  로직은 없다.
- 보존 규칙 시뮬레이션(§4 규칙, 같은 실측 데이터): attempts 176 → 78개,
  wire 근사 523 KB → 약 233 KB; done 130 → 51개; repo_operations 125 → 약 20개.
  끊기는 `resumed_from`·`repair.attempt_id` 참조는 0건.

## 3. 사용자 결정

1. **보존 단위는 레인 결속 + done 7일.** attempt 단독 상한이 아니라 "bead가
   레인(잔여 done 포함)에 있는가"로 묶고, done은 `added_at` 기준 7일.
2. **완료 레인 드롭다운은 `오늘/7일`만.** 저장된 `30d/all`은 `7d`로 읽는다. Board
   Closed 컬럼은 손대지 않는다. 요청형 이력 조회는 만들지 않는다.
3. **필드 슬리밍은 클라이언트가 읽지 않는 내부 필드만.** `usage_legs`·
   `delegation_sessions`·`exec_values`는 목록에 남긴다(요청형 상세 메시지 없음).
4. **repo_operations는 최근 20개 + 미해결 + 참조된 것.**
5. **heartbeat 분리(부분 갱신 push)는 후속 Bead로 분리.**

## 4. 서버 — projection 보존 규칙

### 4.1 모듈과 위치

규칙은 순수 함수로 새 모듈 `server/ws/snapshot-retention.js`에 둔다:

```
retainedBeadIds(raw, now) -> Set<bead_id>
trimQueueProjection(public_queue, raw, now) -> { done, attempts, repo_operations(raw map) }
```

`decorateQueue()`(`server/ws/worker-handlers.js`)는 `withExternalPrWait`와
`completionStatusFor` **다음**, 그리고 `projectRepoOperations`·`bead_titles`·
`bead_times`·`bead_labels`·`bead_workflow`·`bead_scope`·`bead_blocked_by` 등
레인 기반 데코레이션 **앞**에서 `trimQueueProjection`을 적용한다. 판정 입력은
언제나 **overlaid raw 전체**이고, 잘린 결과만 `public_queue`로 흘러간다.
`attemptsWithUsage`는 지금처럼 마지막에 잘린 `attempts` 맵을 받아 running
attempt에 live overlay를 얹는다.

`buildMonitorPipeline`(`monitor-handlers.js`)은 같은 `decorateQueue`를 쓰므로
별도 코드 없이 같이 줄어든다. mutation 응답의 queue도 `decorateQueue`를 거치므로
같은 규칙이 적용된다. 상수는 모듈 상수로 두고 설정 표면을 만들지 않는다:

```js
export const DONE_RETENTION_MS = 7 * 86_400_000;
export const REPO_OPERATIONS_RECENT = 20;
```

### 4.2 보존 bead 집합 R

raw 전체로 계산한다.

1. `queue` ∪ serial lanes(`serialLaneBeadIds`) ∪ `pr_wait` ∪ `merge_queue`의
   bead.
2. `done` 중 `added_at ≥ now − DONE_RETENTION_MS`인 항목의 bead.
3. 공유 분류기로 판정한 활성 attempt의 bead:
   `activeAttemptStates(raw.attempts, doneAtByBead(raw)).winners`와
   `headReviewAttemptStates(raw.attempts)`의 키. **전체 `done` 맵으로 판정**하므로
   잘린 done 때문에 옛 실패가 되살아나지 않는다.
4. `status === 'running'`이거나 `finished_at ≥ now − DONE_RETENTION_MS`인
   attempt의 bead. (레인에서 바로 빠지는 discarded/stopped attempt가 세션 이력에서
   즉시 사라지지 않게 하는 창. paused는 여기 넣지 않는다 — leaf paused는 규칙 3이
   잡고, 이미 재개된 paused 기록은 후속 attempt의 운명을 따른다. 실측에서는 규칙
   1–2와 같은 집합이다.)
5. `completion_status[*].active_attempt_id`가 가리키는 attempt의 bead(초기
   seed에 포함).
6. §4.4 잔여 repo op의 `repair.attempt_id`가 가리키는 attempt의 bead.

규칙 6과 §4.4는 서로를 참조하므로 **고정점까지 반복**한다: 규칙 1–5로 R을 만들고,
§4.4를 R로 평가해 O를 얻고, O의 `repair.attempt_id`로 규칙 6을 더해 R을 넓히고,
R이 넓어졌으면 §4.4를 다시 평가한다 — R과 O가 더 이상 늘지 않을 때 멈춘다. 두
집합은 단조 증가하고 raw의 bead·op 수로 유계이므로 반복은 유한하다(다중
subject op가 새 bead를 끌어오고 그 op의 `repair.attempt_id`가 또 다른 owner
bead를 가리키는 사슬도 끊기지 않는다). attempt 보존은 최종 R, op 보존은 최종 O
기준이다.

### 4.3 자르기

- `done`: 규칙 2 항목 ∪ **`bead_id ∈ R`인 항목**(나이 무관), 기존 순서 유지. 뒤쪽
  합집합은 클라이언트 분류기의 `doneAtByBead` 입력을 지키기 위한 것이다 — 다른
  이유로 보존된 bead의 옛 failed attempt를 해소한 done 증거가 빠지면 클라이언트가
  그 실패를 "미처리"로 되살리고, raw로 계산하는 `workspaces_state.counts`와 레인이
  어긋난다. 화면에서는 완료 레인 기간 필터(`오늘/7일`)가 그 옛 행을 계속 숨긴다.
- `attempts`: `bead_id ∈ R`인 attempt 전부. bead 단위 all-or-nothing이므로
  `resumed_from` 체인·토큰 합계·`done_kind`/head review 배지가 bead 안에서
  완결된다.
- 종료 attempt(`status !== 'running'`)에서 다음 키를 제거한다:
  `verify_result`·`verify_cmd_result`·`receipt_check`·`receipt_baseline`·
  `base_drift`·`process_identity`·`guard_warnings`·`exec_stamped_keys`·
  `exec_restore_values`·`continuation_action`. running attempt는 무변경(기존
  `stripPrompts`와 live overlay 그대로). 제거는 projection 복사본에서만 한다.
- `repo_operations`: §4.4 잔여 op만 `projectRepoOperations`에 넘긴다. 카드
  shape는 무변경.

### 4.4 repo_operations 잔여 집합

raw `repo_operations` 맵에서 다음의 합집합:

1. `requested_at` 내림차순 최근 `REPO_OPERATIONS_RECENT`개(동률은 `operation_id`
   사전순, `projectRepoOperations`의 정렬과 같다).
2. 미해결: `state ∈ {failed, repairing}`이고 `dismissed`가 없고 `superseded_by`가
   없는 op.
3. 참조된 op: `subjects[].bead_id ∈ R`, 잔여 attempt의 `repair_operation_id`가
   가리키는 op, `cleanup_failed`의 대상 bead(`subjects[].bead_id`)가 가리키는 op.
4. 잔여 카드가 `superseded_by`로 가리키는 op(대체 관계 표시가 끊기지 않게).
   한 단계만 따라간다.

### 4.5 불변 경계

`revision`·`completion_status`·`completion_intents` 제거·`bead_*` 맵의 계약·
`workspaces_state.counts`(raw로 계산; 활성 attempt는 규칙 3으로 항상 보존되므로
레인 수와 일치)·`cleanup_failed`·`discard_operations`·프로토콜 메시지 타입·
envelope·`pushSnapshotIfChanged` dedup은 변경하지 않는다. persisted `queue.json`과
`queueStore` 연산은 건드리지 않는다.

### 4.6 드러나는 행동 변화

- 7일보다 오래된 done 행만 있던 레포는 `hasPipeline()`이 거짓이 되어 모니터
  파이프라인에서 빠진다. 기본 `오늘` 필터에서는 이미 빈 pane이었으므로 화면
  손실은 없다.
- 이슈 상세 패널 세션 이력은 R 밖 bead(레인에 없고 7일 넘게 지난 bead)의 attempt를
  더 이상 보여주지 않는다. 그 bead의 토큰 합계도 같이 사라진다(합계가 일부만
  남는 상태는 생기지 않는다).
- 종료 attempt 드로어에서 §4.3의 제거 필드는 원래 렌더되지 않았으므로 보이는 차이가
  없다.

## 5. 클라이언트 — 완료 레인 기간 옵션

- `app/data/closed-range.js`에 추가:
  - `DONE_RANGE_OPTIONS = [{ value: 'today', label: '오늘' }, { value: '7d', label: '최근 7일' }]`
  - `normalizeDoneRange(value)`: `'today'`는 그대로, 그 외(`'7d'`·`'30d'`·`'all'`·
    무효값)는 `'7d'`. 반환 타입은 기존 `ClosedRange`의 부분집합 `'today'|'7d'`.
  - `CLOSED_RANGE_OPTIONS`·`closedRangeSince`·`isClosedRange`는 그대로다(Board
    Closed 컬럼 소유).
- 소비처 세 곳을 바꾼다:
  - `app/views/worker/index.js`: `loadDoneRange()`가 `normalizeDoneRange`로
    읽고, 드롭다운(현재 `CLOSED_RANGE_OPTIONS.map` 4899행 부근)과 라벨 조회
    (1843행 부근)를 `DONE_RANGE_OPTIONS`로.
  - `app/views/monitor/index.js`: 같은 방식(351·408·1961행 부근).
  - `app/main.js`: `worker_done_range` 초기화(565행 부근)를 `normalizeDoneRange`로
    읽고, `setWorkerDoneRange`는 정규화된 값만 받는다. Worker 탭 `closed-issues`
    구독 `since`는 그 결과 항상 7일 이내다.
- 저장된 `30d/all`은 읽을 때만 `7d`로 정규화하고 되쓰지 않는다(사용자가 다시
  고르면 그때 저장된다).
- 스토어·뷰 렌더러·프로토콜·`app/protocol.js`는 무변경.

## 6. 에러 처리와 경계값

- `now`는 주입 가능한 인자(테스트용)이고 기본은 `Date.now()`.
- `added_at`·`finished_at`이 숫자가 아닌 항목: done은 제거(보존 근거가 없다),
  attempt는 규칙 4의 시간 창에서 제외되지만 다른 규칙으로 bead가 R에 들면 남는다.
- `raw.attempts`·`raw.done`·`raw.repo_operations`가 없거나 객체가 아니면 각각
  빈 값으로 취급한다(현행 `decorateQueue`의 fail-quiet와 같다).
- `retainedBeadIds`·`trimQueueProjection`이 던지면 `decorateQueue`는 잘리지 않은
  원본을 그대로 실어 보내고 `log()`로 남긴다 — 크기 문제로 되돌아갈 뿐 표시가
  깨지지는 않는다.
- 경계: `added_at === now − DONE_RETENTION_MS`는 보존(`≥`).

## 7. 테스트 계획

- `server/ws/snapshot-retention.test.js`(단위, 고정 `now`):
  1. 7일 지난 done은 빠지고 경계값(정확히 7일)은 남는다.
  2. 레인 밖 bead의 종료 attempt는 빠지고, 레인 안 bead는 attempt 전부(종료
     포함) 남는다.
  3. 옛 done이 해소한 failed attempt(bead가 레인 밖)는 빠지고, done보다 늦게
     실패한 미처리 attempt는 남는다.
  3a. 옛 done이 해소한 failed attempt를 가진 bead가 다른 이유(예: `queue`
     재등록)로 R에 들면, 7일 지난 그 done 항목도 projection에 남고
     `activeAttemptStates(trimmed.attempts, doneAtByBead(trimmed))`가 그 bead를
     실패로 되살리지 않는다; `laneCountsFor`(raw)의 `running`과 일치한다.
  3b. 참조 사슬 고정점: 다중 subject op가 R 밖 bead를 끌어오고 그 op의
     `repair.attempt_id`가 제3의 bead를 가리키는 입력에서 세 bead의 attempt와 두
     op이 모두 남는다; `repair_operation_id` 역방향 참조도 op을 남긴다.
  4. paused 뒤에 resumed 체인이 있는 bead는 체인 전체가 남거나 전체가 빠진다.
  5. 종료 attempt에서 §4.3 필드가 빠지고 running attempt는 키가 그대로다;
     `usage_legs`·`delegation_sessions`·`exec_values`·`cause_detail`은 남는다.
  6. repo ops: 최근 20개 + 미해결 failed/repairing + `subjects` bead가 R인 op +
     `superseded_by` 대상이 남고, 그 밖의 succeeded는 빠진다.
  7. `revision`·`completion_status`·`cleanup_failed`는 입력과 deep-equal.
  8. raw가 비어 있거나 키가 없어도 던지지 않는다.
- `server/ws.worker-queue.test.js` 데코레이션 describe: 오래된 done bead의 attempt가
  스냅샷에 없고, mutation 응답 queue에도 없다.
- `server/ws.monitor-pipeline.test.js`: 7일 지난 done만 있는 레포는 `workspaces`에
  없고 `workspaces_state`에는 있다.
- `app/data/closed-range.test.js`: `normalizeDoneRange`의 다섯 입력
  (`today`·`7d`·`30d`·`all`·무효)과 `DONE_RANGE_OPTIONS` 길이.
- 배포 후 실측(보고서에 기록): UI-d509와 같은 방식으로 tailnet에서 두 채널을
  구독해 30초 유휴 프레임 수·바이트를 전후 비교한다. 이 수치는 heartbeat 후속
  Bead의 입력이다.
- Pre-handoff 번들: `npm run tsc` · `npm test` · `npm run lint` ·
  `npm run prettier:write` · `npm run build`(갱신된 `app/main.bundle.js`·`.map`
  포함).

## 8. 비범위

- heartbeat 필드(`last_event_at`·`usage`·`last_activity`) 분리 push나 워크스페이스
  단위 부분 갱신(델타 push): discovered-from 후속 Bead. 프로토콜 무변경이 이
  스펙의 경계다.
- `usage_legs`·`delegation_sessions`를 요청형 상세로 옮기는 것과 서버측 usage
  요약: 결정 3에서 제외.
- persisted `queue.json` 보존/정리와 틱마다 통째로 재기록되는 디스크 I/O: 관찰만
  기록한다. `pruneDoneBefore`는 그대로 둔다.
- 완료 레인 `30d/all` 요청형 이력 조회.
- `discard_operations`·`completion_intents` 크기(각 20 KB 안팎).

## 9. 구현 unit 후보 (advisory)

1. `server/ws/snapshot-retention.js` + 단위 테스트 — 순수 규칙(§4.2–4.4).
2. `decorateQueue` 결선 + ws 통합 테스트(§4.1·§7).
3. `closed-range.js` + 소비처 3곳 + 테스트(§5), `npm run build`.

한 세션에서 순서대로 처리 가능한 크기이며 unit 분할은 필수가 아니다.
