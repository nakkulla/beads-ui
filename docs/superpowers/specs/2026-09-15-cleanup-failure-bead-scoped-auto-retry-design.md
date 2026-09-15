---
scope:
  - server/worker/completion-intent.js
  - server/worker/failure-class.js
  - server/worker/queue-hold.js
  - server/worker/queue-store.js
  - server/worker/pr-actions.js
  - server/worker/resolution-ladder.js
  - app/utils/failure-sentences.js
  - app/views/worker/pr-wait-progress.js
  - server/worker/completion-intent.test.js
  - server/worker/failure-class.test.js
  - server/worker/queue-hold.test.js
  - server/worker/queue-store.test.js
  - server/worker/pr-actions.test.js
  - server/worker/resolution-ladder.test.js
  - server/e2e/worker-flow.test.js
---

# 머지 후 정리 실패의 큐 정지 범위 축소와 자동 재시도

- Bead: UI-a8rq
- 경로: spec_backed. 완료 코디네이터·실패 분류·큐 정지 상태를 한 계약으로 검증하는 단위다.
- 상태: 사용자 방향("사람이 확인하는 단계를 최소화한다", 2026-09-15) 승인에 따른 완성 초안. spec r1(astra, REVISE 8/2)
  반영본. 구현·서비스 변경은 아직 전이다.
- 근거 기준: 55fdc6cbbdbb51c1060832942ba4eff445a8acf6.
- 선행: 없음. UI-m55x(정리 판정 오탐 수리)는 착지됐다.

## 1. 문제

2026-09-15 dotfiles-gyno(PR #506)에서 머지와 배포가 끝난 뒤 정리 단계가 `cleanup_failed:worktree_remove_failed`로
멈추자 세 가지가 함께 일어났다.

1. `needsHumanHoldKind`가 `cleanup_failed:*`를 `systemic`으로 읽어 dotfiles 큐 전체가 `hold.kind='systemic'`으로
   섰다(`completion-intent.js` `terminalize`, `failure-class.js` `ALWAYS_SYSTEMIC_*`). 다른 Bead의 dispatch·merge가 한
   Bead의 정리 실패 때문에 멈췄다.
2. 코디네이터는 `cleaning` 단계의 `cleanup_repairable` 사실을 곧바로 terminal `needs_human`으로 정산한다
   (`decideCompletionAction`: "script_retry는 이미 소진됐다"). 그래서 [정리 재시도]가 유일한 출구인데, 그 클릭은 같은
   정리 절차를 그대로 다시 돌린다. 판정의 입력이 바뀌지 않는 한 사람이 몇 번 눌러도 같은 사유로 거부된다.
3. 정리가 결국 성공한 뒤에도 systemic hold는 남는다. 해제는 사용자 `▶ 재개`(`worker-queue-hold-resume`)뿐이다
   (ADR 0048 → 0049 → UI-o5ll이 승계한 "체계적 정지의 해제는 사람의 승인 한 번" 규칙).

첫 번째 사고 원인(경로별 포함 비교 오탐)은 UI-m55x가 수리했다. 이 설계는 남은 구조 — 한 Bead의 정리 실패가 큐를
세우고, 사람이 같은 실패를 반복 클릭하며, 원인이 사라져도 정지가 남는 — 를 바꾼다.

## 2. 결정 요약 (사용자 방향 2026-09-15)

1. **머지 후 정리 실패는 큐를 세우지 않는다.** `needs_human` 5종 가운데 `cleanup_failed:*`는 `verify_red`와 달리 그
   Bead의 행에만 남는다. 큐 정지 권한은 `verify_red`와 기존 systemic 원인(base 이동·hook 우회·gh/bd 불가)에만 남는다.
   이 조항은 `cleanup_failed` 가족 전체(`branch_cleanup`·`base_containment`·`repo_operations` 어느 단계든)에 적용된다.
2. **`branch_cleanup`·`base_containment` 단계의 정리 실패를 관측형과 결정형으로 나눈다.** 관측형은 다시 관측하면 결과가
   달라질 수 있는 실패, 결정형은 같은 입력이면 같은 결과가 나오는 실패다. 관측형은 코디네이터가 `cleanup_failed` 기록에
   실린 횟수·다음 시각으로 최대 3회(1·5·15분) 자동 재실행한다. 결정형은 즉시 그 Bead의 `needs_human`이 된다.
   `repo_operations`(배포 스크립트) 단계는 이 분류의 대상이 아니다: script_retry(ADR 0009)와 그 소진 뒤의 수정 인계
   (UI-3vvi)가 소유하며 이 설계는 그 동작을 바꾸지 않는다.
3. **원인이 사라진 정리는 사람 없이 끝난다.** worktree·branch가 이미 없으면 정리는 성공이다(UI-lmqu 스펙 §6 1번, 현행).
   관측형 재실행의 어느 회차든 성공하면 행은 `done`으로 가고 `needs_human`은 생기지 않는다. 결정형 실패는 사람이
   원인을 치운 뒤 [정리 재시도] 한 번으로 끝난다.
4. **낡은 정리 정지는 로드 시 정리한다.** 이 배포 이전에 `cleanup_failed:*` 사유로 서 있는 `systemic` hold는 새 규칙에서
   존재할 수 없는 기록이므로 큐 로드 정규화가 지운다. 다만 같은 hold에 다른 systemic 사유의 Bead가 합쳐져 있으면 그
   사유로 hold를 유지한다(§5). 이것은 ADR UI-o5ll이 승계한 "자동 재개는 hold를 풀지 않는다"의 좁은 예외이며 ADR 후보가
   그 supersede를 명시한다.
5. **새 라벨·칩·버튼은 없다.** 큐 4a 판정 칩의 `cleanup_failed` 정지 표시는 정지가 생기지 않으므로 저절로 사라진다.
   Bead 행의 `확인 필요` 문장·[정리 재시도]·[세션에서 해결]은 그대로다. 재실행 대기 중의 표시는 재료가 있을 때만 기존
   문장으로 그리고, 없으면 그리지 않는다(fail-quiet, ADR 0014).

## 3. 분류

### 3.1 관측형(transient) 정리 실패

`cleanup_failed` 기록의 `step`·`reason`과 `detail`의 `manager_reason=`이 정한다. 아래 표가 전부이며 표에 없는 것은
결정형이다.

| step | reason / manager_reason | 근거 |
| --- | --- | --- |
| `branch_cleanup` | `worktree_remove_failed` + manager_reason ∈ {`observe_failed`, `delivered_unobservable`, `archive_failed`} | git 관측·bundle 생성이 일시적으로 실패했다 |
| `branch_cleanup` | `local_branch_delete_failed`(manager_reason `ref_delete_failed`) | CAS ref 삭제가 경합에 졌다 |
| `branch_cleanup` | `remote_branch_delete_failed` | 원격 통신 실패 |
| `base_containment` | `merge_sha_unobserved`, `base_fetch_failed`, `base_rev_unavailable` | `expectedBaseFor`·`syncBase`가 실제로 내는 원격 관측 실패 토큰(`pr-actions.js`) |

`manager_reason`이 없는 `worktree_remove_failed`(레거시 기록)와 `detail`을 읽을 수 없는 기록은 결정형으로 읽는다
(fail-closed → 사람). 분류 함수는 `resolution-ladder.js`의 `cleanupFailureRetryClass(failure) ->
'transient'|'deterministic'|'unowned'`이다. `unowned`는 `repo_operations` 단계와 `internal_record_failed:*` 가족처럼 이
설계가 분류하지 않는 기록이며 현행 처리(§3.3)를 그대로 받는다. 정본 목록은 그 함수의 상수 하나이고 위 표는 그 상수를
옮겨 적은 것이다.

### 3.2 결정형(deterministic) 정리 실패

`branch_cleanup`·`base_containment` 단계에서 3.1에 없는 모든 사유. `removeCompleted`가 내용·소유·identity를 이유로 보존한
경우 — `dirty_unique`, `untracked_present`, `special_file`, `identity_changed`, `ownership_changed`, `foreign_worktree`,
`path_present`, `identity_invalid`, `archive_unavailable` — 가 대표다.

### 3.3 이 설계가 분류하지 않는 정리 실패

- `repo_operations` 단계: script_retry 1회(ADR 0009)를 operation 원장이 소유하고, 소진 뒤의 처리는 UI-3vvi
  (2026-09-15-worker-recovery-continuation-design.md "배포 실패와 수정 작업 인계")가 소유한다. 이 설계는 그 기록에
  `retryable`·`retry_count`를 쓰지도 읽지도 않으며 §4의 재실행을 적용하지 않는다. 현행대로 `needs_human`(hold 없음)이다.
- `cleanup_journal_conflict`, `cleanup_completion_unrecorded`, `cleanup_replay_unavailable`, `internal_record_failed:*`:
  현행 `human` 클래스 유지.

### 3.4 큐 정지 권한

- `needsHumanHoldKind(reason)`은 `verify_red` 가족에만 `'systemic'`을 돌려준다. `cleanup_failed` 가족은 `null`이다.
- `failure-class.js`의 `ALWAYS_SYSTEMIC_CAUSES`·`ALWAYS_SYSTEMIC_PREFIXES`에서 `cleanup_failed`를 뺀다. attempt 수준
  `cleanup_failed:*` 원인은 `individual` tier다(Bead만 실패, 큐 계속).
- `terminalize`의 `hold_event`는 `verify_red`에서만 만들어진다. 다른 가족은 이벤트 없이 terminal만 쓴다.

## 4. 코디네이터 흐름

재실행 상태는 `auto_resolution`(`retrying` 단계)을 쓰지 않는다. `applyCompletionPhase`는 살아 있는 `auto_resolution`이
있는 동안 `cleaning`으로의 이동을 붙들고, `resumeCompletionCleanup`은 `cleaning` 단계만 받으며, `startCleanupReplay`의
실패 분기는 `advanceCompletionOp(clear: true)`로 `auto_resolution`을 지운다(r1 지적 2·3). 그 기존 사다리 위에 새 가족을
얹으면 실제 정리는 한 reconcile 뒤에야 돌고 횟수는 매번 0으로 돌아간다. 대신 재실행 상태를 **`cleanup_failed` 기록**에
싣고, 이미 `cleaning` 단계에서 동작하는 `retry_cleanup` action → `startCleanupReplay` → `resumeCompletionCleanup` 경로를
그대로 쓴다.

### 4.1 기록 필드

`failCleanup`(`pr-actions.js`)이 `cleanup_failed` 기록을 쓸 때 `branch_cleanup`·`base_containment` 단계에 한해:

- `retryable`: `cleanupFailureRetryClass(record) === 'transient'`.
- `retry_count`: 같은 Bead의 직전 `cleanup_failed` 기록이 있고 그 기록도 `retryable`이면 `직전 + 1`, 아니면 `0`. 정리
  성공은 기록을 지우므로(`done` 이동, 현행) 다음 정리 실패는 다시 0부터다.
- `next_retry_at`: `retryable`이고 `retry_count < 3`이면 `now + [60_000, 300_000, 900_000][retry_count]`, 아니면 없음.
  `queue-store.js` `cleanup_failed` typedef와 로드 정규화에 이 한 필드를 추가한다(`number`, 없으면 무시).

`retryable`은 이 기록 자체의 분류값이고 `retry_count`는 기록 간 연속 횟수라 서로 순환하지 않는다(r1 지적 6).

### 4.2 결정

`decideCompletionAction`의 `cleaning` 분기, `fact.state === 'cleanup_repairable'`일 때 `fact.evidence`(기록)로:

- `cleanupFailureRetryClass(evidence) === 'transient'`이고 `evidence.retry_count < 3`:
  - `input.now >= evidence.next_retry_at`이면 `{ kind: 'retry_cleanup' }` (현행 action 재사용).
  - 아니면 `null`(대기).
- `transient`이고 `retry_count >= 3`: `needsHuman('retry_exhausted:' + completionFailureReason(fact), true)`.
- `deterministic`: 현행대로 `needsHuman(completionFailureReason(fact), true)`.
- `unowned`: 현행대로 `needsHuman(completionFailureReason(fact), true)`.

`cleanup_pending`은 현행대로 `{ kind: 'retry_cleanup' }`. `reconcile()`은 이미 `retryWakeMs`(기본 60초) 타이머로
깨어나므로 `next_retry_at` 판정에 전용 타이머를 만들지 않는다. 1·5·15분 지연은 이 주기 해상도로 판정된다.

### 4.3 재실행

`retry_cleanup` action → `startCleanupReplay(root, fact)` → `prepareCompletionOp(phase:'cleaning', kind:'retry_cleanup')` →
`resumeCompletionCleanup(root)` → `runCleanup`을 실패한 `cleanup_cursor`부터 다시 돌린다(모두 현행). 성공 판정은
`startCleanupReplay`의 현행 조건(행이 `done`에 있거나 intent가 `completed`)이다. `retrySucceeded`의 "`active_op`가
`retry_cleanup`이면 성공" 분기는 `auto_resolution` 사다리 전용이라 이 경로에 관여하지 않는다(r1 지적 9).

재실패는 `failCleanup`이 기록을 덮어쓰며 §4.1로 `retry_count`를 잇는다. `startCleanupReplay`의 실패 분기는 현행대로
op를 `consumed`로 닫고 `cleaning`에 머문다. 다음 reconcile에서 §4.2가 새 기록을 다시 분류한다: 관측형이면 다음
회차를 기다리고, 소진이면 `retry_exhausted:cleanup_failed:<원인>`, 결정형으로 바뀌었으면 즉시 `needs_human`(모두 hold
없음).

`startCleanupReplay`가 관측형 재실행으로 들어갈 때 `recordTimeline(root, 'merge_step', 'cleanup_retry:<retry_count+1>',
'머지 후 정리 자동 재시도 <n>/3')`을 남긴다. `seq`가 회차를 담으므로 같은 회차의 재관측은 같은 줄이다(중복 없음).

### 4.4 사람의 출구

- 재실행 대기 중에도 [정리 재시도](`retryCleanup`)는 그대로 동작한다. 클릭 성공은 행을 `done`으로 보내고 다음 reconcile은
  `completed` 사실로 끝난다. 클릭 실패는 `failCleanup`이 기록을 덮어쓰고 §4.1·§4.2를 그대로 탄다 — 결정형으로 바뀐
  실패는 다음 reconcile에서 즉시 `needs_human`이고, 관측형이면 `retry_count`가 하나 오른 채 다음 회차를 기다린다(r1
  지적 4). 클릭은 사다리 밖의 별도 경로가 아니라 같은 기록을 갱신하는 같은 경로다.
- 결정형·소진 `needs_human`의 출구는 현행 두 클릭([정리 재시도]·[세션에서 해결])이다.
- `▶ 재개`는 이 가족과 무관해진다. `cleanup_failed` 사유의 systemic hold는 더 생기지 않는다.

## 5. 낡은 정지 기록의 정규화

`queue-hold.js` `reduceSystemicFailure`는 이미 systemic인 hold에 새 Bead를 **원인은 그대로 둔 채** 합친다(r1 지적 1).
그래서 `cause`가 `cleanup_failed:*`인 hold의 `bead_ids`에 `verify_red`나 base 이동으로 선 Bead가 섞여 있을 수 있다.
정규화는 hold만 보고 지우지 않는다.

큐 로드 정규화(`queue-store.js`, `normalizeHoldState` 호출 자리)에서 `hold.kind === 'systemic'`이고 `hold.cause`가
`cleanup_failed:`로 시작하면 `bead_ids`의 각 Bead에 대해 다른 systemic 사유가 남아 있는지 본다:

- `completion_intents[bead].phase === 'needs_human'`이고 `terminal_reason.reason` 가족이 `verify_red`인 Bead, 또는
  같은 큐의 최신 attempt `cause`가 `failure-class.js` `ALWAYS_SYSTEMIC_CAUSES`(이 설계 이후 `cleanup_failed` 제외)에
  있는 Bead는 "남은 systemic Bead"다.
- 남은 systemic Bead가 없으면 `hold`를 `null`로 읽는다.
- 있으면 `hold`를 유지하되 `bead_ids`를 남은 Bead로 줄이고 `cause`를 그 첫 Bead의 사유로 바꾼다. `since`·
  `halted_by_attempt_id`는 보존한다.

`hold_history`는 env→systemic 승격 집계의 입력이므로 항목을 쓰지 않는다. 지우거나 줄인 hold의 `cause`·`since`·
`bead_ids`는 서버 로그에 한 줄 남긴다. `env` hold와 다른 사유의 systemic hold는 손대지 않는다. 읽기 경로라 서버 재시작
한 번으로 끝나고 사용자 조작을 요구하지 않는다.

## 6. 표면

- 큐 4a 칩: `cleanup_failed` 사유의 정지가 생기지 않으므로 표시가 사라진다. 코드 변경 없음.
- Bead 행: `needs_human` 문장은 `failure-sentences.js`의 `cleanup_failed`·`retry_exhausted` 기존 문장이다. 두 문장의
  `다음` 안내는 현재 같은 문장("남아 있는 원인과 실행 기록을 먼저 확인하세요")이라 추가 분기가 없다.
- 재실행 대기 중: `app/views/worker/pr-wait-progress.js`가 이미 `cleanup_failed` 기록으로 실패 단계를 그린다.
  `retryable`이고 `next_retry_at`이 있으면 그 단계 라벨 뒤에 env 재시도 타일과 같은 꼬리 형식(`· 다음 HH:MM`)만
  붙이고, 재료가 없으면 아무것도 더 그리지 않는다. 새 슬롯·칩·버튼은 없다(ADR 0014).
- 타임라인: §4.3의 `merge_step` 줄로 회차가 읽힌다. `queue_hold` 이벤트는 이 가족에서 더 나오지 않는다. 완료 실패 기록
  댓글(`## 🤖 완료 실패 기록`)은 terminal에서만 쓰므로 재실행 중에는 쓰지 않고, 소진·결정형 terminal에서 현행대로 한 번
  쓴다.

## 7. 오류 처리와 불변식

- `needs_human ⇔ terminal_reason` 불변식(`queue-store.js`)은 유지한다.
- 횟수는 재실행 **전에** 기록된다: `retry_count`는 실패 기록의 값이고 재실행은 그 기록을 읽어 시작하므로, 재실행 중
  프로세스가 죽어도 같은 기록이 같은 회차로 남고 다음 실패가 하나 올린다. 무한 반복은 없다.
- 분류 함수가 기록을 읽지 못하면 결정형으로 읽는다(fail-closed → 사람).
- `retryCleanup`(클릭)과 `resumeCompletionCleanup`(재실행)은 같은 `in_flight` 집합으로 동시 실행을 막는다(현행).
- `verify_red`의 systemic 정지, 공급자 보류·프로브 규칙(ADR UI-o5ll), `▶ 재개`의 `since` CAS는 바꾸지 않는다.
- `auto_resolution`·`retrying` 단계·`COMPLETION_RETRY_POLICY`·`classifyCompletionFailure`는 바꾸지 않는다.

## 8. Test scope

- `resolution-ladder.test.js`(기존 파일): `cleanupFailureRetryClass`의 표 3.1 전 항목 → `transient`, 3.2 대표 사유·
  manager_reason 없음·detail 불량 → `deterministic`, `repo_operations` 단계·`internal_record_failed:*` → `unowned`.
- `completion-intent.test.js`: `needsHumanHoldKind('cleanup_failed:x') === null`이고 `verify_red`는 `systemic`;
  `terminalize`가 `cleanup_failed:*`에 `hold_event: null`을 넘긴다; `cleaning` + `cleanup_repairable` 결정 —
  관측형·`retry_count 0`·`now < next_retry_at` → `null`, `now >= next_retry_at` → `retry_cleanup`, `retry_count 3` →
  `retry_exhausted:cleanup_failed:<원인>` terminal, 결정형 → 즉시 terminal, `unowned` → 즉시 terminal;
  `startCleanupReplay`가 관측형 재실행에 `merge_step` `cleanup_retry:<n>` 줄을 한 번 남긴다. 현재 파일의
  "cleanup_repairable → needs_human" 단언은 결정형 fixture로 바꾼다.
- `pr-actions.test.js`: `failCleanup`이 `branch_cleanup` 관측형 실패에 `retryable: true`·`retry_count`·`next_retry_at`을
  쓰고, 연속 실패에 `retry_count`를 잇고, `repo_operations` 단계에는 세 필드를 쓰지 않는다; 사람이 worktree를 손으로
  지운 뒤 `resumeCompletionCleanup`이 남은 branch 정리로 성공한다.
- `queue-store.test.js`: `cleanup_failed` 로드 정규화가 `next_retry_at`을 읽고 잘못된 값을 버린다; §5 정규화 —
  `cleanup_failed` 단독 hold 삭제, `verify_red` Bead가 섞인 hold는 그 사유·남은 Bead로 축소, 다른 사유 hold와 `env` hold
  보존.
- `failure-class.test.js`: `cleanup_failed`·`cleanup_failed:*`가 `individual`(현행 `systemic` 단언 두 곳 교체).
- `server/e2e/worker-flow.test.js`: 정리 실패 Bead 하나가 있어도 다른 Bead가 dispatch되고 큐 정지 칩이 없다.
- Pre-Handoff Validation: `npm run tsc`, `npm run lint`, 변경 파일 prettier, `npx vitest run --reporter=dot` 전체. 배포
  뒤 healthz `source_sha`와 dotfiles 큐 `hold === null`(정규화) 확인.

## 9. 기각한 대안

- **결정형 실패도 시계로 재시도한다.** 같은 입력에 같은 결과인 판정을 반복하면 로그만 쌓이고 사람 호출은 그대로 3회
  뒤로 미뤄질 뿐이다. 기각.
- **기존 `auto_resolution` `retry` 사다리에 새 가족을 얹는다(r1 초안).** `applyCompletionPhase`가 살아 있는 사다리 동안
  `cleaning` 이동을 붙들어 실제 정리가 한 reconcile 뒤에야 돌고, 실패 분기의 `clear: true`가 횟수를 지운다. 사다리를
  고치면 `verify_cmd_failed`·`cleanup_prerecord_failed`의 기존 의미까지 바뀐다. 기각.
- **정리 실패를 `individual` 실패 attempt로 정산하고 코디네이터를 쓰지 않는다.** 머지는 이미 끝났고 attempt는 종료됐다.
  정리는 완료 코디네이터의 saga다. 기각.
- **hold는 유지하되 정리 성공 시 자동 해제한다.** 한 Bead의 정리 실패가 다른 Bead를 세울 이유가 없으므로 정지 자체를
  없애는 편이 단순하다. 기각.
- **낡은 정지 기록을 사람이 `▶ 재개`로 정리한다.** 이 설계의 목적(사람 확인 최소화)과 어긋난다. 기각.
- **`repo_operations` 단계도 이 분류에 넣는다.** script_retry 소진 증거는 operation 원장에 있고 정리 기록에는 없으며
  (r1 지적 6), 소진 뒤 처리는 UI-3vvi가 설계 중이다(r1 지적 8). 기각.

## 10. 구현 unit 후보

- 단일 unit: `completion-intent.js`·`resolution-ladder.js`·`failure-class.js`·`queue-store.js`·`pr-actions.js`·
  `app/views/worker/pr-wait-progress.js`와 테스트. 분리할 외부 효과가 없다.

## 11. 경계·후속

- 관찰: UI-3vvi와 scope 겹침 — `repo_operations` 단계 소진 뒤 처리는 그쪽이 소유하고 이 설계는 그 단계를 분류하지
  않으므로 결정 충돌 없음. 이 설계는 UI-3vvi의 산출을 소비하지 않아 선행 의존은 없다.
- 관찰: UI-tqqp·UI-n99w와 scope 겹침 — 결정 충돌 없음(r1 리뷰 판정).
- 관찰: session-learnings SessionStart 훅의 처분 — dotfiles 학습 파이프라인의 유일한 렌더 트리거라 훅 제거가 아니라
  파이프라인 처분 설계가 필요하다. 이 저장소 밖이며 이 설계와 무관하므로 행을 만들지 않는다.
- 관찰: `verify_red`의 systemic 정지 — 배포 verify가 붉으면 다음 Bead도 같은 base에서 붉다는 전제가 아직 유효하다.
  바꾸지 않는다.

## 결정 (ADR 후보)

- 전제: ADR 0014 — 새 라벨·칩·버튼을 만들지 않고 기존 슬롯과 문장을 쓴다.
- 전제: ADR UI-lmqu-2 — [정리 재시도]는 같은 attempt의 기계 정리 재실행이며 이 설계에서도 사람의 출구로 유지된다.
- 전제: ADR 0009 — `repo_operations` 단계의 script_retry는 상시이며 이 설계는 그 단계를 건드리지 않는다.
- 머지 후 정리 실패는 큐를 세우지 않고 그 Bead에 머물며, 관측형 실패는 코디네이터가 자동으로 다시 돌리고 결정형 실패만
  사람이 처분한다. 되돌리기 어려움: 정지 상태 모델·코디네이터 결정·실패 분류·정리 기록 형식·표면의 정지 표시를 함께
  바꾸며 큐 운영 습관("확인 필요가 뜨면 큐가 멈춘다")을 바꾼다. 맥락 필요: 정리 실패가 다음 Bead에 재발한다는 원래
  전제가 왜 틀렸는지(정리는 그 Bead의 worktree·branch에 국한된다)와 왜 `auto_resolution` 사다리를 쓰지 않는지는 코드에
  없다. 실제 절충: 정리 실패를 놓칠 위험(큐가 계속 돌아 사람이 늦게 본다)과 낡은 hold 정규화라는 자동 해제 예외 대신
  큐 가용성과 사람 호출 최소화를 택한다. 세 조건 모두 성립한다. ADR UI-o5ll이 승계한 두 조항을 뒤집는다 — 0016에서
  0048로 이어진 "`cleanup_failed:*`는 systemic" 분류와, `cleanup_failed` 사유 hold에 한한 "자동 재개는 hold를 풀지
  않는다"의 예외. UI-o5ll의 나머지 결정(공급자 보류의 해제는 프로브만이 판정, outage 프로브 무상한·백오프 1시간,
  분류기 재판정에 따른 target 강등, `↻ 지금 프로브`, 상단 배너 없음, 막힌 행의 4a 칩과 1번 조작, `▶ 재개`의 사람 승인
  한 번, `[지금 시작]`의 단일 행 우회)은 그대로 존속하며 대체 ADR이 전부 재서술한다. `summary`: "머지 후 정리 실패는
  큐를 세우지 않고 그 Bead에 머물며, 관측형 실패는 코디네이터가 자동으로 다시 돌리고 결정형 실패만 사람이 처분한다"
  → ADR, supersede UI-o5ll
