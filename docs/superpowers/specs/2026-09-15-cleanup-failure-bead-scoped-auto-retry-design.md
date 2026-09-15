---
scope:
  - server/worker/completion-intent.js
  - server/worker/failure-class.js
  - server/worker/queue-hold.js
  - server/worker/queue-store.js
  - server/worker/pr-actions.js
  - server/worker/resolution-ladder.js
  - app/utils/failure-sentences.js
  - server/worker/completion-intent.test.js
  - server/worker/failure-class.test.js
  - server/worker/queue-hold.test.js
  - server/worker/pr-actions.test.js
  - server/e2e/worker-flow.test.js
---

# 머지 후 정리 실패의 큐 정지 범위 축소와 자동 재시도

- Bead: UI-a8rq
- 경로: spec_backed. 완료 코디네이터·실패 분류·큐 정지 상태를 한 계약으로 검증하는 단위다.
- 상태: 사용자 방향("사람이 확인하는 단계를 최소화한다", 2026-09-15) 승인에 따른 완성 초안. 구현·서비스 변경은 아직 전이다.
- 근거 기준: 91d2d03a7826ee24b29a922636afa5cabbb657c4.
- 선행: 없음. UI-m55x(정리 판정 오탐 수리)는 착지됐다.

## 1. 문제

2026-09-15 dotfiles-gyno(PR #506)에서 머지와 배포가 끝난 뒤 정리 단계가 `cleanup_failed:worktree_remove_failed`로
멈추자 세 가지가 함께 일어났다.

1. `needsHumanHoldKind`가 `cleanup_failed:*`를 `systemic`으로 읽어 dotfiles 큐 전체가 `hold.kind='systemic'`으로
   섰다(`completion-intent.js` terminalize, `failure-class.js` `ALWAYS_SYSTEMIC_*`). 다른 Bead의 dispatch·merge가 한
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
   Bead의 행에만 남는다(`bead-local`). 큐 정지 권한은 `verify_red`와 기존 systemic 원인(base 이동·hook 우회·gh/bd 불가)에만
   남는다.
2. **정리 실패를 관측형과 결정형으로 나눈다.** 관측형은 다시 관측하면 결과가 달라질 수 있는 실패다. 결정형은 같은 입력이면
   같은 결과가 나오는 실패다. 관측형은 코디네이터의 기존 재시도 사다리(`retry` 클래스, 최대 3회,
   `COMPLETION_RETRY_DELAYS_MS` = 1·5·15분)가 자동으로 다시 돌린다. 결정형은 즉시 그 Bead의 `needs_human`이 된다.
3. **원인이 사라진 정리는 사람 없이 끝난다.** worktree·branch가 이미 없으면 정리는 성공이다(UI-lmqu 스펙 §6 1번, 현행).
   관측형 재시도의 어느 회차든 성공하면 행은 `done`으로 가고 `needs_human`은 생기지 않는다. 결정형 실패는 사람이
   원인을 치운 뒤 [정리 재시도] 한 번으로 끝난다.
4. **낡은 정리 정지는 로드 시 정리한다.** 이 배포 이전에 `cleanup_failed:*` 사유로 서 있는 `systemic` hold는 새 규칙에서
   존재할 수 없는 기록이므로 `normalizeHoldState`가 로드 때 지운다. 이것은 유효한 정지의 자동 해제가 아니라 무효 기록의
   정규화다(ADR 0048의 "자동 재개는 hold를 풀지 않는다"는 유효한 정지에 대한 규칙이다).
5. **새 라벨·칩·버튼은 없다.** 큐 4a 판정 칩의 `cleanup_failed` 정지 표시는 정지가 생기지 않으므로 저절로 사라진다.
   Bead 행의 `확인 필요` 문장·[정리 재시도]·[세션에서 해결]은 그대로다. 관측형 재시도 중의 표시는 기존
   `retrying` 단계 표시를 그대로 쓰고, 재료가 없으면 그리지 않는다(fail-quiet, ADR 0014).

## 3. 분류

### 3.1 관측형(transient) 정리 실패

`cleanup_failed` 기록의 `step`과 `reason`, 그리고 `detail`의 `manager_reason=`이 정한다.

| step | reason / manager_reason | 근거 |
| --- | --- | --- |
| `branch_cleanup` | `worktree_remove_failed` + manager_reason ∈ {`observe_failed`, `delivered_unobservable`, `archive_failed`} | git 관측·bundle 생성이 일시적으로 실패했다 |
| `branch_cleanup` | `local_branch_delete_failed` (manager_reason `ref_delete_failed` 포함) | CAS ref 삭제가 경합에 졌다 |
| `branch_cleanup` | `remote_branch_delete_failed` | 원격 통신 실패 |
| `base_containment` | `merge_sha_unobserved`, `base_unobservable` | 원격 관측 실패 |
| `repo_operations` | 기록의 `retryable === true`이고 `script_retry`가 아직 소진되지 않은 경우 | 기존 script_retry 규칙(ADR 0009) 그대로 |

`manager_reason`이 없는 `worktree_remove_failed`(레거시 기록)는 결정형으로 읽는다. 새 분류 함수는
`resolution-ladder.js`에 두고 이름은 `cleanupFailureRetryClass(failure) -> 'transient'|'deterministic'`이다.
정본 목록은 그 함수의 상수 하나이며, 위 표는 그 상수를 옮겨 적은 것이다.

### 3.2 결정형(deterministic) 정리 실패

`removeCompleted`가 내용·소유·identity를 이유로 보존한 경우 전부: `dirty_unique`, `untracked_present`, `special_file`,
`identity_changed`, `ownership_changed`, `foreign_worktree`, `path_present`, `identity_invalid`, `archive_unavailable`,
그리고 3.1에 없는 모든 사유. `repo_operations`의 script_retry 소진 뒤 실패, `cleanup_journal_conflict`,
`cleanup_completion_unrecorded`, `internal_record_failed:*`도 결정형이다(현행 `human` 클래스 유지).

### 3.3 큐 정지 권한

- `needsHumanHoldKind(reason)`은 `verify_red` 가족에만 `'systemic'`을 돌려준다. `cleanup_failed` 가족은 `null`이다.
- `failure-class.js`의 `ALWAYS_SYSTEMIC_CAUSES`·`ALWAYS_SYSTEMIC_PREFIXES`에서 `cleanup_failed`를 뺀다. attempt 수준
  `cleanup_failed:*` 원인은 `individual` tier다(Bead만 실패, 큐 계속).
- `terminalize`의 `hold_event`는 `verify_red`에서만 만들어진다. 다른 가족은 이벤트 없이 terminal만 쓴다(현행 문장 그대로,
  대상 가족만 준다).

## 4. 코디네이터 흐름

### 4.1 사실 판정

`cleanupFact`는 그대로 `cleanup_repairable`(기록 있음)·`cleanup_pending`·`completed`를 낸다. 사실에 분류를 싣지 않는다.
분류는 결정 시점에 한다.

### 4.2 결정

`decideCompletionAction`의 `cleaning` 분기:

- `cleanup_repairable`이고 `cleanupFailureRetryClass(fact.evidence) === 'transient'`이면
  `{ kind: 'settle_retry', reason: completionFailureReason(fact) }`를 돌려준다. 새 action 종류 하나다.
- `deterministic`이면 현행대로 `needsHuman(completionFailureReason(fact), true)`.
- `cleanup_pending`이면 현행대로 `{ kind: 'retry_cleanup' }`.

reconcile 루프는 `settle_retry`를 `settleFailure(root, reason, 'post_merge_cleanup', fact.failure_key, fact.evidence)`로
넘긴다. 다른 곳에서 사다리를 복제하지 않는다.

### 4.3 분류 표

`classifyCompletionFailure`는 `cleanup_failed:<원인>` 가족을 정확 일치 키가 아니라 가족 단위로 판정한다:
`COMPLETION_FAILURE_POLICY`에 `cleanup_failed: 'retry'`를 두고, `COMPLETION_RETRY_POLICY`에

```
cleanup_failed: {
  return_phase: 'cleaning',
  effect: 'retry_cleanup',
  inputs: ['merged_sha', 'cleanup_cursor'],
  optional_inputs: [],
  success: 'cleanup_step_recorded'
}
```

를 둔다. 결정형은 4.2에서 이미 `needs_human`으로 갈라졌으므로 이 표에는 관측형만 도달한다. 표의 조회 키는 폴딩된
사유의 첫 가족 토큰이다(`foldNeedsHumanReason` 결과의 `:` 앞).

### 4.4 재실행

`retry_failed_op` → `retryFailedOp`은 기존 `retry_cleanup` 효과로 `prActions.resumeCompletionCleanup(root)`를 부른다.
그 함수는 `runCleanup`을 실패한 `cleanup_cursor`부터 다시 돌린다(현행). 성공 판정은 현행 `retrySucceeded`의
`retry_cleanup` 분기(행이 `done`에 있거나 `completed`)다.

재실패는 `failCleanup`이 `cleanup_failed` 기록을 덮어쓰고, 다음 reconcile에서 4.2가 다시 분류한다:

- 다시 관측형이면 `settleFailure`가 같은 사다리를 잇는다(`carried.attempts`). 3회 소진이면
  `retry_exhausted:cleanup_failed:<최초 원인>`으로 terminal `needs_human`(hold 없음).
- 결정형으로 바뀌었으면 즉시 `needs_human`(hold 없음). 사다리는 버린다.

`failCleanup`은 기록에 `retryable`(3.1 판정)과 `retry_count`(사다리 `attempts`)를 함께 쓴다. 두 필드는 이미 기록 형식에
있다(`queue-store.js` `cleanup_failed` typedef).

### 4.5 사람의 출구

- 관측형 사다리 진행 중에도 [정리 재시도]는 그대로 동작한다(`retryCleanup`은 사다리와 독립, 현행). 클릭 성공은 행을
  `done`으로 보내고 사다리는 다음 reconcile에서 `completed` 사실로 끝난다. 클릭 실패는 기록을 덮어쓰고 4.4를 따른다.
- 결정형 `needs_human`의 출구는 현행 두 클릭([정리 재시도]·[세션에서 해결])이다. 자동 재시도는 없다: 같은 입력에 같은
  결과가 나오는 판정을 시계로 반복하지 않는다.
- `▶ 재개`는 이 가족과 무관해진다. `cleanup_failed` 사유의 systemic hold는 더 생기지 않는다.

## 5. 낡은 정지 기록의 정규화

`queue-hold.js` `normalizeHoldState(raw, now)`: `raw.hold.kind === 'systemic'`이고 `raw.hold.cause`가 `cleanup_failed:`로
시작하면 `hold`를 `null`로 읽는다. `hold_history`는 env→systemic 승격 집계의 입력이므로 여기에 항목을 쓰지 않고, 서버
로그에 지운 hold의 `cause`·`since`·`bead_ids`를 한 줄 남긴다. 다른 사유의 hold와 `env` hold는 손대지 않는다. 이 정규화는
읽기 경로에 있으므로 서버 재시작 한 번으로 끝나고, 사용자 조작을 요구하지 않는다.

`hold.bead_ids`에 다른 사유의 Bead가 섞여 있을 수 없다: systemic hold의 `cause`는 하나이고 `bead_ids`는 그 사유로 묶인
Bead들이다(현행 reducer).

## 6. 표면

- 큐 4a 칩: `cleanup_failed` 사유의 정지가 생기지 않으므로 표시가 사라진다. 코드 변경 없음.
- Bead 행: `needs_human` 문장은 `failure-sentences.js`의 `cleanup_failed`·`retry_exhausted` 기존 문장이다.
  `retry_exhausted:cleanup_failed:<원인>`의 `다음` 안내는 `cleanup_failed`와 같은 `[정리 재시도] 또는 [세션에서 해결]`
  이어야 한다 — 현행 `retry_exhausted` 문장이 다른 안내를 가리키면 그 항목만 사유 세부에 따라 고른다.
- 관측형 재시도 중: 기존 `retrying` 단계 표시(다음 재시도 시각)를 그대로 쓴다. 표시할 재료가 없는 뷰는 아무것도 더 그리지
  않는다.
- 타임라인: `settleFailure`·`retryFailedOp`이 이미 남기는 auto_resolution 이벤트로 재시도 회차가 읽힌다. `queue_hold`
  이벤트는 이 가족에서 더 나오지 않는다. 완료 실패 기록 댓글(`## 🤖 완료 실패 기록`)은 terminal에서만 쓰므로 관측형
  사다리 중에는 쓰지 않고, 소진·결정형 terminal에서 현행대로 한 번 쓴다.

## 7. 오류 처리와 불변식

- `needs_human ⇔ terminal_reason` 불변식(`queue-store.js`)은 유지한다.
- 사다리 예산은 재실행 전에 소비한다(현행 `spendRetry`). 프로세스가 재실행 중에 죽어도 무한 반복하지 않는다.
- 분류 함수가 기록을 읽지 못하면(`reason` 없음, `detail` 형식 이상) 결정형으로 읽는다(fail-closed → 사람).
- `retryCleanup`(클릭)과 사다리의 `resumeCompletionCleanup`은 같은 `in_flight` 집합으로 동시 실행을 막는다(현행).
- `verify_red`의 systemic 정지, ADR UI-o5ll의 공급자 보류·프로브 규칙, `▶ 재개`의 CAS는 바꾸지 않는다.

## 8. Test scope

- `completion-intent.test.js`: `needsHumanHoldKind('cleanup_failed:x') === null`, `verify_red`는 `systemic` 유지;
  관측형 `cleanup_repairable` → `settle_retry` → `retrying` 진입(attempts 0, next_at = 1분); 재실패 2회 뒤 3회째 소진 →
  `retry_exhausted:cleanup_failed:<원인>` terminal이고 `hold_event === null`; 결정형 → 즉시 terminal, hold 없음;
  사다리 중 결정형으로 바뀐 재실패 → 즉시 terminal; 재시도 성공(행이 `done`) → 사다리 종료·`needs_human` 없음.
- `resolution-ladder.test.js`(신규 또는 기존 파일에 추가): `cleanupFailureRetryClass`의 표 3.1/3.2 전 항목과
  fail-closed 케이스.
- `failure-class.test.js`: `cleanup_failed`·`cleanup_failed:*`가 `individual`(현행 `systemic` 단언 두 곳 교체).
- `queue-hold.test.js`: `normalizeHoldState`가 `cleanup_failed:*` systemic hold를 지우고 `hold_history`는 그대로 두며
  다른 사유의 systemic hold와 `env` hold는 보존한다.
- `pr-actions.test.js`: `failCleanup`이 `retryable`·`retry_count`를 기록한다; 사람이 worktree를 손으로 지운 뒤
  `resumeCompletionCleanup`이 남은 branch 정리로 성공한다(UI-m55x 회귀와 겹치는 부분은 통합 테스트에 있으므로 여기서는
  호출 경로만).
- `server/e2e/worker-flow.test.js`: 정리 실패 Bead 하나가 있어도 다른 Bead가 dispatch되고 4a 정지 칩이 없다.
- Pre-Handoff Validation: `npm run tsc`, `npm run lint`, 변경 파일 prettier, `npx vitest run --reporter=dot` 전체. 배포
  뒤 healthz `source_sha`와 dotfiles 큐 `hold === null`(정규화) 확인.

## 9. 기각한 대안

- **결정형 실패도 시계로 재시도한다.** 같은 입력에 같은 결과인 판정을 반복하면 로그만 쌓이고 사람 호출은 그대로 3회
  뒤로 미뤄질 뿐이다. 기각.
- **정리 실패를 `individual` 실패 attempt로 정산하고 코디네이터 사다리를 쓰지 않는다.** 머지는 이미 끝났고 attempt는
  종료됐다. 정리는 완료 코디네이터의 saga이며 재시도 사다리·CAS·예산이 이미 거기에 있다. 기각.
- **hold는 유지하되 정리 성공 시 자동 해제한다.** 한 Bead의 정리 실패가 다른 Bead를 세울 이유가 없으므로 정지 자체를
  없애는 편이 단순하다. 자동 해제는 ADR 0048 계보의 "자동 재개는 풀지 않는다"와 충돌한다. 기각.
- **낡은 정지 기록을 사람이 `▶ 재개`로 정리한다.** 배포 직후 한 번의 클릭이지만 이 설계의 목적(사람 확인 최소화)과
  어긋나고, 무효 기록의 정규화는 이미 `normalizeHoldState`의 책임이다. 기각.

## 10. 구현 unit 후보

- 단일 unit: `completion-intent.js`·`resolution-ladder.js`·`failure-class.js`·`queue-hold.js`·`pr-actions.js`와 테스트.
  분리할 외부 효과가 없다.

## 11. 경계·후속

- 관찰: session-learnings SessionStart 훅의 처분 — dotfiles 학습 파이프라인의 유일한 렌더 트리거라 훅 제거가 아니라
  파이프라인 처분 설계가 필요하다. 이 저장소 밖이며 이 설계와 무관하므로 행을 만들지 않는다.
- 관찰: `verify_red`의 systemic 정지 — 배포 verify가 붉으면 다음 Bead도 같은 base에서 붉다는 전제가 아직 유효하다.
  바꾸지 않는다.

## 결정 (ADR 후보)

- 전제: ADR UI-o5ll — 체계적 정지의 해제는 사람의 승인 한 번이고 자동 재개는 hold를 풀지 않는다. 이 설계는 유효한
  정지를 자동으로 풀지 않으며, `cleanup_failed`를 정지 사유에서 뺀다.
- 전제: ADR 0014 — 새 라벨·칩·버튼을 만들지 않고 기존 슬롯과 문장을 쓴다.
- 전제: ADR UI-lmqu-2 — [정리 재시도]는 같은 attempt의 기계 정리 재실행이며 이 설계에서도 사람의 출구로 유지된다.
- 전제: ADR 0009 — `repo_operations` 단계의 script_retry는 상시이며 이 설계의 관측형 분류가 그 소진 여부를 읽는다.
- 머지 후 정리 실패는 큐를 세우지 않고 그 Bead에 머물며, 관측형 실패는 코디네이터의 재시도 사다리가 자동으로 다시 돌리고
  결정형 실패만 사람이 처분한다. 되돌리기 어려움: 정지 상태 모델·코디네이터 결정·실패 분류·표면의 정지 표시를 함께
  바꾸며 큐 운영 습관("확인 필요가 뜨면 큐가 멈춘다")을 바꾼다. 맥락 필요: 정리 실패가 다음 Bead에 재발한다는 원래 전제가
  왜 틀렸는지(정리는 그 Bead의 worktree·branch에 국한된다)는 코드에 없다. 실제 절충: 정리 실패를 놓칠 위험(큐가 계속
  돌아 사람이 늦게 본다) 대신 큐 가용성과 사람 호출 최소화를 택한다. 세 조건 모두 성립한다. ADR 0016의
  `cleanup_failed:*` systemic 분류를 뒤집지만 그 조항은 0048 이후 Accepted ADR에 승계되어 있지 않아 supersede 대상이
  없다. `summary`: "머지 후 정리 실패는 큐를 세우지 않고 그 Bead에 머물며, 관측형 실패는 코디네이터 재시도 사다리가
  자동으로 다시 돌리고 결정형 실패만 사람이 처분한다" → ADR
- 낡은 `cleanup_failed` systemic hold의 로드 시 정규화. 되돌리기 어려움: 낮음, 한 번 지나가는 마이그레이션이다. 첫
  조건이 성립하지 않는다 → ADR 아님
