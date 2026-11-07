---
scope:
  - server/worker/scheduler.js
  - server/worker/resolve-session.js
  - server/worker/runtime.js
  - server/worker/notify.js
  - server/worker/discard-coordinator.js
  - server/worker/queue-store.js
  - server/ws/lane-membership.js
  - server/ws/worker-handlers.js
  - server/ws/monitor-handlers.js
  - app/utils/active-attempts.js
  - app/views/worker/lane-model.js
  - app/views/worker/tile-resolve.js
---

# 잔재 처분 실패를 사용자 대화로 열고, 세션이 넘겨받은 Bead의 지난 실패를 현재 상태로 그리지 않는다 (UI-68r5)

## 1. 목표

출처는 CRC-rokit `rokit-471`(2026-11-07)이다. Worker가 dispatch 단계의 잔재 처분에서
소유를 판정하지 못하자(`stale_work_unresolved · remote_branch_owner`) attempt를 `failed`로
적고 끝냈다. 대화도 사용자 문의도 열리지 않았고, 사용자에게 남은 출구는 같은 검사를 되풀이하는
`↻ 이어하기`와 워크트리를 지우는 `[폐기]`뿐이었다. 이어서 승계 세션이 그 Bead를 넘겨받아
세션 소유 외부 대기를 걸었는데도, 카드는 이전 attempt의 「⚠ 실패」·「폐기」와 외부 대기 줄을
한 카드에 같이 그렸다.

이 스펙이 정하는 동작은 셋이다.

1. 일시적인 원인으로 실패한 잔재 처분은 Worker가 기존 환경 재시도 사다리로 다시 시도한다.
   판단이 필요한 원인이거나 사다리가 다 소진되면 「실패」 대화를 자동으로 한 번 연다.
2. 그 대화의 「인계」는 Bead의 dispatch를 **같은 안전 검사로** 한 번 다시 돌린다. 사용자 답은
   소유 검사를 대신하지 않는다. 대화는 사용자 답을 받은 뒤 구현 워크트리 안에서 원인을 정리해
   검사가 통과하게 만든다.
3. 실패 attempt보다 새로운 세션 소유 증거(세션 소유 외부 대기나 세션 claim)가 있으면, 그
   실패는 실행중 좌석을 세션에 내준다. 카드는 세션 타일로 그려지고, 실패는 attempt 기록과 Worker
   타임라인에만 남는다. 그동안 Worker의 파괴적 조작은 서버에서 거절된다.

## 2. 검증된 전제

- `failStaleResidue`는 attempt를 `status: failed`, `cause: stale_work_unresolved`로 적고 `attemptFailed` 알림과 타임라인만 남긴다. 그다음 `dispatch_refused`에 넣을 뿐 대화를 열지 않는다 — server/worker/scheduler.js:13429-13471
- 소유 판정이 내는 원인 코드는 `external_pr_owner`, `remote_ref_observe_failed`, `remote_branch_owner`다 — server/worker/scheduler.js:3895-3950
- 처분 경로가 내는 그 밖의 원인은 `ownership_unknown`·`resume_available`·관측 원인(`describeStaleResidue`), `worktree_identity_changed`, `worktree_add_failed`, `backup_failed`/`backup_unavailable`, `observe_failed`, `resume_refused:*`다 — server/worker/scheduler.js:3791-3843, 13524-13656
- `↻ 이어하기`(`resume`)는 `stale_work_unresolved` attempt에서 워크트리 존재 검사를 건너뛰고 `dispatch`를 다시 부른다. 새 attempt에는 `resumed_from`을 적는다. 즉 같은 처분 검사를 한 번 더 돈다 — server/worker/scheduler.js:15801-15852
- 환경 재시도 사다리는 `retry_wait`와 `RETRY_MAX = 3`, 소진되면 `failed`와 `retry.exhausted`로 끝나며, 처분 함수는 `retry_options`를 받아 재시도 dispatch로 넘긴다 — server/worker/scheduler.js:6727-6801, 13485; server/worker/failure-class.js:102
- `dispatch_refused`는 tick마다 비워지는 한 번짜리 집합이다. 실패 뒤 일반 dispatch를 계속 막는 것은 `settledAttemptFence`의 `failed_unhandled`(최신 attempt가 `failed`)이고, `retry_wait` 최신 attempt는 같은 울타리가 `retry_wait`로 막아 사다리 타이머가 다음 dispatch를 가진다 — server/worker/scheduler.js:19186-19192, 20065-20084, 19673-19681
- `resolveFailureContext`는 잔재 처분 실패 attempt만으로는 맥락을 만들지 않는다(마지막 attempt 판정은 파킹만 본다). 그래서 `[세션에서 이어가기]` 클릭도 이 행에서는 거절된다 — server/worker/resolve-session.js:327-466 (파킹 판정 449-465)
- `failureHandoffTarget`의 kind는 `cleanup`·`discard`·`verify_hold`·`merge_gate`·`repo_operation`·`foreign_handoff`뿐이다. 「인계」 실행은 kind별 출구 표를 따른다 — server/worker/resolve-session.js:584-640; server/worker/scheduler.js:1427-1446, 11289-11400
- 실패 대화 자동 기동기는 공용 스위치·행당 live 대화 하나·인계 예약을 문으로 둔다 — server/worker/resolve-session.js:1141-1300
- 「확인 필요」 알림(`needsHuman`)에는 대화 기동 줄이 들어가지만 `attemptFailed`에는 없다 — server/worker/notify.js:377, 609-611, 785
- dotfiles `## Worker 세션 대화`의 「실패」 목록에는 잔재 처분 실패가 없다. 「Resume after 인계」 표에도 그 행이 없다 — dotfiles src/shared/skills/flow/workflow/references/execution-common.md:39-53, 123-153
- beads-ui가 고정(pin)한 digest는 그 절의 fenced `text` 블록만 덮는다. 목록 산문과 표를 고쳐도 digest는 바뀌지 않는다 — server/worker/direction-inquiry.test.js:19-24, 336
- 실행중 좌석은 bead별 최신 implementation attempt가 `failed`/`orphaned`이고 dismiss되지 않았으며 `done`보다 늦게 끝났으면 계속 차지한다. 판정에 쓰는 입력은 attempts와 `done_at_by_bead`뿐이다 — app/utils/active-attempts.js:157-224
- 세션 타일 제외 집합은 활성 레인과 위 좌석의 합이다. 그래서 실패 attempt가 좌석을 잡고 있으면 그 Bead의 세션 행은 그려지지 않는다 — server/ws/lane-membership.js:118-127; app/views/worker/lane-model.js:3874-3883
- 외부 대기는 owner와 상관없이 그 Bead의 실행중 항목에 붙는다. 그래서 실패 타일 위에 세션 소유 대기 줄이 함께 그려진다 — app/views/worker/lane-model.js:5122-5128
- 세션 타일에는 attempt가 없어서 드래그·일시정지·폐기를 그리지 않는다 — app/views/worker/lane-model.js:3929-3934
- 외부 대기 레코드에는 `owner`(`{kind:'session', session_ref, …}` 또는 `{kind:'worker', attempt_id}`)와 `registered_at`이 있다 — server/worker/external-wait/store.js:33-36
- dispatch 스냅샷에는 Bead의 `session_ref` 원문이 있다 — server/worker/scheduler.js:750, 15254
- Worker는 dispatch할 때 Bead를 `in_progress`로 바꾼다. 그래서 `in_progress`만으로는 세션 claim인지 가릴 수 없다 — server/worker/scheduler.js:5921
- Bead의 `started_at`은 세션 claim 시각으로 쓸 수 없다. rokit-471은 `started_at` 2026-11-07T00:18:50Z가 실패 attempt(01:42:25Z)보다 앞선다 — `bd -C ~/GitHub/CRC-rokit show rokit-471 --json`, attempt id `rokit-471-1794015745795-12`
- 세션 행은 `in_progress`이거나, `open`이면서 `external_wait` metadata가 있을 때 만들어지고 `session_refs`를 싣는다 — server/worker/runnable-cache.js:535-568
- 세션 제외 집합은 활성 레인(`queue`·직렬·`pr_wait`) 멤버도 포함하고, 처분 실패는 레인 멤버십을 지우지 않는다. 그래서 레인에 남은 실패 Bead는 좌석과 무관하게 세션 조회에서 빠진다 — server/ws/lane-membership.js:97-127; server/worker/scheduler.js:13429-13471
- 외부 대기 저장소는 끝난 단계(`done`·`resumed`·`stopped`)의 레코드도 보존하고, 살아 있는 단계는 `hold`·`detached`·`completing`이다(`findByBead`가 이것만 본다) — server/worker/external-wait/store.js:42, 351-357
- 좌석 판정(`activeAttemptStates`/`activeBeadIds`)과 세션 제외 집합의 소비자는 클라이언트 레인, Worker 핸들러, 모니터 핸들러 카운트다 — app/views/worker/lane-model.js:782; server/ws/worker-handlers.js:1853; server/ws/monitor-handlers.js:595, 822, 875, 883
- 큐 저장소는 대화 레코드와 attempt를 정규화해 저장한다. 모르는 대화 kind는 `null`이 되고, `makeAttempt`가 아는 필드만 남긴다 — server/worker/queue-store.js:3550, 3953
- `retry_wait` 타일은 배지와 `[지금 재시도]`로 그려진다 — app/views/worker/running-grid.js:111; app/views/worker/index.js:1118-1133
- `needsHuman` 알림은 클래스 문자열을 그대로 받아 제목·클래스 줄을 만들며 등록 표가 없다 — server/worker/notify.js:594-599, 1067-1069; server/worker/discard-coordinator.js:110-116
- 처분 실패는 Worker 타임라인에 `attempt_failed` 줄로 남는다 — server/worker/scheduler.js:13453-13460
- ADR UI-hf8v: 「인수」 동안은 `[세션에서 이어가기]`·`[워커로 이어가기]` 짝 둘만 숨기고 행의 나머지 조작은 그대로다 — docs/adr/UI-hf8v-monitor-full-placement-plan.md:442
- 미확인: rokit-471 카드에서 `↻ 이어하기`가 비활성이었던 원인 — 이 스펙의 동작은 그 원인에 기대지 않는다

## 3. 설계

### 3.1 원인 분류 — 재시도와 대화

잔재 처분 실패의 원인을 두 갈래로 나눈다. 분류는 서버 한 곳(예: `staleFailureTier(reason)`)이
정하고, 표에 없는 원인은 판단 필요 쪽이다(모르면 사람에게 간다).

| 갈래 | 원인 | 처리 |
| --- | --- | --- |
| 일시 | `remote_ref_observe_failed`, `worktree_identity_changed`, `worktree_add_failed`, `observe_failed`, `observer_unavailable`, `backup_failed` | 환경 재시도 사다리에 오른다(`retry_wait`, 기존 지연·`RETRY_MAX`). 사다리가 소진되면 판단 필요와 같이 끝난다 |
| 판단 필요 | `remote_branch_owner`, `external_pr_owner`, `ownership_unknown`, `backup_unavailable`, `resume_refused:*`, resume 실패 원인, 그 밖의 모든 값 | 곧바로 terminal `failed`로 끝나고 3.2의 대화를 연다 |

- 결정: 일시 원인은 새 재시도 장치를 만들지 않고 기존 환경 사다리를 탄다 — 카드에는 기존
  `retry_wait` 타일과 `[지금 재시도]`가 그대로 그려지고, 재시도 dispatch는 이미 `retry_options`를
  처분 함수로 넘긴다.
- 사다리 rung은 지금처럼 새 attempt를 만든다. 사다리가 다시 dispatch할 때도 같은 소유 검사를
  돈다. 검사를 건너뛰는 rung은 없다.
- 사다리에 올리면서 지켜야 할 연결 불변식이 셋 있다. 처분 실패 attempt는 실행되지 않은
  prerecord여서, 실행을 마친 attempt에서 출발하는 지금의 사다리와 다르기 때문이다.
  - rung의 dispatch는 실행 설정을 그 prerecord에서 읽지 않는다. prerecord에는 runner·model 같은
    설정이 없으므로(`recordedDispatchSettings`, server/worker/scheduler.js:19468) 새 dispatch처럼
    설정을 다시 푼다.
  - 일시 원인의 실패는 attempt를 `failed`가 아니라 `retry_wait`로 적는다. 그러면 일반 pass는
    `settledAttemptFence`의 `retry_wait`로 그 Bead를 건너뛰고, 다음 dispatch는 사다리 타이머가
    가진다(2절). 판단 필요 원인과 사다리 소진은 `failed`로 적어 `failed_unhandled` 울타리가 일반
    dispatch를 막는다.
  - 사다리 동안에도, 소진된 뒤에도 attempt의 `cause`는 `stale_work_unresolved`로 남고 일시 원인은
    `cause_detail`에 남는다. `↻ 이어하기`의 처분 경로(server/worker/scheduler.js:15801)와 3.3의
    인계 대상이 모두 이 cause를 기준으로 판정하기 때문이다.

### 3.2 「실패」 대화 종류 — 잔재 처분 실패

- 실패 클래스 이름은 `잔재 처분 실패`, 원인 코드는 처분 사유(`cause_detail.summary`), 단계는
  `dispatch`다. `대화 사유`는 기존 규칙대로 `실패 잔재 처분 실패 · <원인 코드>`가 된다.
- `상황` 슬롯은 기존 실패 필드(클래스·원인 코드·단계·진단·로그)를 쓴다. `진단`에는 잔재 요약을
  한 줄로 넣는다. 들어가는 것은 워크트리 경로, 브랜치, 로컬 head sha7, 기록된 원격 head
  sha7(있을 때), 외부 PR 유무, staged/unstaged/untracked/ahead 개수다. 재료가 없는 필드는 뺀다.
  `구현 워크트리`는 잔재의 워크트리 경로이고, 없으면 `(없음)`이다.
- failure identity는 실패 attempt 하나(`stale_residue:<attempt_id>`)다. 결정: attempt 기준으로
  한다 — 처분 실패는 매번 새 attempt를 적고, terminal `failed` 최신 attempt는
  `settledAttemptFence`의 `failed_unhandled`가 일반 dispatch를 계속 막는다(2절). 그래서 새
  identity는 사람의 클릭이나 「인계」에서만 생기고, 같은 실패로 대화가 두 번 열리지 않는다.
- 자동 기동: terminal로 적힌 그 쓰기 직후 한 번, 다른 실패 대화와 같은 공용 스위치와
  `launchForBead` 문(행당 live 대화 하나, 인계 예약)을 거친다. 재시작이나 재관측은 대화를 다시
  열지 않는다. 사다리 rung(`retry_wait`)에서는 열지 않는다.
- 인계 중 재실패: 「인계」 출구의 dispatch가 다시 처분 실패로 끝나면, 그 쓰기 직후의 기동은 아직
  남은 인계 레코드 때문에 `handoff_pending`으로 열리지 않는다. 그래서 인계 정산이 출구가 돌아오고
  레코드를 지운 뒤(`end`), 현재 인계 대상이 출구 전 identity와 다른 새 `stale_residue` identity이면
  `launchForBead`를 한 번 부른다. 앞의 기동은 열리지 않았으므로 이것이 그 identity의 첫 기동이고,
  정산은 한 번만 돌므로 두 번 열리지 않는다.
- 판정 순서: `resolveFailureContext`와 `failureHandoffTarget`에서 이 행은 폐기 실패 판정 뒤,
  파킹 판정 앞에 선다. 그래서 같은 Bead에 오류로 멈춘 폐기 작업(`stale_work_backup_fresh` 포함)이
  있으면 지금처럼 폐기 실패가 그 행의 이름이 된다.
- 알림: 이 실패는 다른 실패 대화 종류처럼 「확인 필요」(`needsHuman`) 한 번으로 알리고, 대화 기동
  줄을 싣는다. 클래스는 `잔재 처분 실패`, 다음 조치는 `[세션에서 이어가기]·[↻ 이어하기]·[폐기]`다.
  `needsHuman`은 클래스 문자열을 그대로 받으므로 따로 등록할 표가 없다
  (server/worker/discard-coordinator.js:110-116). 같은 실패에 `attemptFailed` 알림을 따로 보내지
  않는다.
- 수동 출구: 실패 타일에 `[세션에서 이어가기]`가 선다. `resolveFailureContext`가 이 행의 맥락을
  돌려주고, `tileResolveFields`의 실패 행 판정이 이 행을 안다. 이 버튼에는 짝이 되는
  `[워커로 이어가기]`가 없다(`pair_anchor` 없음). `↻ 이어하기`는 지금 자리 그대로 둔다. 새 슬롯은
  만들지 않는다.

### 3.3 「인계」 — 같은 검사로 dispatch 한 번

- `failureHandoffTarget`에 kind `stale_residue`를 더한다. 이 kind는 Bead의 최신 implementation
  attempt가 terminal `stale_work_unresolved`이고 dismiss되지 않았을 때 서며, identity는 3.2와
  같다. 타임라인의 행 이름은 `실패 — 잔재 처분`, 출구 이름은 `디스패치 재시도`다.
- 출구는 그 attempt에 대한 `↻ 이어하기`와 같은 경로(`resume`)를 한 번 부른다. 기존 한 번 규칙
  (`started_at` 선기록, identity가 그대로면 `결과 미상`)을 그대로 쓴다. 다시 실패하면 새 attempt가
  새 identity로 3.1–3.2를 다시 탄다.
- 결정: 사용자 답은 소유 검사를 대신하지 않는다 — 검사를 우회하는 출구나 결과 줄의 선택 토큰은
  만들지 않는다(사용자 선택, 2026-11-07). 대화는 사용자 답을 받은 뒤 계약이 허용하는 "워크트리 안
  로컬 수정"으로 원인을 정리한다(예: 원격 head를 fetch해 로컬 브랜치를 맞춤). push나 원격 브랜치
  삭제, PR 닫기가 필요한 정리는 「인수」로만 한다. 새로 시작하려면 사람이 `[폐기]`를 누른다.
- 결정: `↻ 이어하기`는 지금처럼 같은 검사를 다시 돈다 — 사람이 누르는 「인계」와 같은 조작이고,
  검사를 바꾸는 쪽은 대화다.

### 3.4 세션 소유가 실패 attempt를 앞선다

**세션 소유 증거**는 Bead 하나에 대해 아래 중 하나가 성립할 때다. 판정은
`app/utils/active-attempts.js`의 공유 함수 하나가 한다. 이 파일은 이미 서버 카운트와 클라이언트
레인이 함께 쓰는 판정의 정본이다.

1. 그 Bead에 `owner.kind === 'session'`이고 살아 있는 단계(`hold`·`detached`·`completing`)인
   외부 대기 레코드가 있고, 그 `registered_at`이 실패 attempt의 `finished_at`보다 늦다. 끝난
   단계(`done`·`resumed`·`stopped`)의 레코드는 증거가 아니다.
2. 그 Bead가 `in_progress`이고, 지금 `session_ref`의 마지막 항목이 실패 attempt가 기록한
   `session_ref` 원문에 없다. 그 항목의 session id는 그 Bead의 어느 implementation attempt
   `session_id`와도 다르다.

두 증거 모두, 그 세션이 이 Bead 행의 Worker 대화 세션(큐의 대화 레코드가 가리키는 세션)이면
성립하지 않는다. 결정: Worker 대화를 「인수」한 세션은 이 규칙 밖에 둔다 — ADR UI-hf8v가 「인수」
동안은 짝 둘만 숨기고 행의 나머지 조작은 그대로라고 정했고, 계약도 인수 뒤 카드 버튼을 Worker
출구로 남긴다. 이 규칙은 Worker 대화 없이 일을 넘겨받은 독립 세션(rokit-471의 승계 세션)만 덮는다.

- rokit-471 사고는 1만으로 풀린다(Bead가 `open`이고 세션 소유 대기가 있었다). 2는 세션이 대기 없이
  Bead를 `in_progress`로 잡고 일하는 일반적인 승계를 덮는다. Bead 본문이 "세션 claim"을 함께
  요구했기 때문에 넣었다.
- 2를 판정하려고 Worker는 attempt를 처음 기록할 때 dispatch 스냅샷의 `session_ref` 원문을
  attempt에 함께 적는다(예: `bead_session_ref`). 이 필드가 없는 옛 attempt에서는 2가 성립하지
  않는다(fail-quiet, 지금 동작 그대로).
- 결정: 세션 claim의 "더 새로움"은 시각이 아니라 기록된 `session_ref`와 대조해서 판정한다 —
  Worker가 dispatch할 때 `in_progress`를 쓰고 `started_at`은 claim 시각이 아니어서, 시각으로
  비교하면 오판한다(2절).
- 증거가 성립하면 그 실패 attempt는 실행중 좌석을 차지하지 않는다. 판정 입력은
  `done_at_by_bead`과 같은 형태로 하나 늘어난다.
- 레인 멤버십보다도 앞선다: 증거가 성립한 Bead는 대기열·직렬 레인 멤버여도 세션 제외 집합에서
  빠지고, 레인 행으로도 그리지 않는다. 레인 멤버십 자체는 지우지 않는다(소유가 끝나면 돌아온다).
  서버는 세션 행 재료(Bead 상태·`session_ref`)와 외부 대기 레코드를 제외 필터를 적용하기 **전에**
  읽어 증거를 판정한다.
- 그러면 서버의 세션 제외 집합과 실행중 카운트, 클라이언트 레인이 함께 바뀐다. 좌석 판정의 모든
  소비자(2절의 클라이언트 레인, Worker 핸들러, 모니터 핸들러 카운트)에 새 입력을 똑같이 넘긴다.
  Bead는 세션 행(외부 대기 줄 포함) 하나로 그려지고 「⚠ 실패」 배지나 `↻ 이어하기`, `[폐기]`는
  그려지지 않는다. 두 탭의 카드 동일성은 기존 카드 동일성 테스트가 지킨다.
- 결정: 지난 실패는 카드에 그리지 않는다 — 실패는 attempt 기록과 Worker 타임라인의
  `attempt_failed` 줄에 남는다. 카드 배치 문법에 새 슬롯을 만들지 않는다(사용자 선택 「숨김」과
  「카드에 안 그림」, 2026-11-07).
- 저장: 새 attempt 필드(예: `bead_session_ref`)와 새 대화 인계 kind `stale_residue`는 큐 저장소의
  정규화(`makeAttempt`, 대화 레코드 정규화)를 거쳐 저장·재읽기에서 살아남아야 한다.
- 서버 거절: 같은 판정이 성립하는 동안 Worker의 조작 진입점은 `session_owned`로 거절하고 아무것도
  바꾸지 않는다. 대상은 그 실패 attempt의 폐기 요청, `↻ 이어하기`, 실패 대화 자동 기동,
  `[세션에서 이어가기]`, 「인계」 출구, 그리고 그 Bead에 남은 환경 사다리 rung의 재시도
  dispatch다. 버튼을 숨기는 것만으로는 낡은 화면이나 직접 호출을
  막지 못한다.
- 세션 소유가 끝나면(외부 대기 레코드가 사라지고 Bead가 `in_progress`를 벗어나면) 실패는 다시
  현재 상태로 돌아온다. 세션이 일을 사람에게 돌려준 것이기 때문이다.

### 3.5 오류 처리

- 대화 기동, 알림, 판정 읽기의 실패는 지금처럼 NO-THROW이고 `not_launched` 사유로 남는다.
  처분의 terminal 기록은 대화 기동 결과와 무관하게 먼저 확정한다.
- 세션 소유 판정에 쓸 재료(외부 대기 저장소, 세션 행)를 읽지 못하면 표시와 조작을 다르게
  다룬다. 표시는 증거가 없다고 보고 지금처럼 그린다(fail-quiet). 3.4의 서버 조작 진입점은 소유를
  확인하지 못했으므로 `session_owner_unobservable`로 거절하고 아무것도 바꾸지 않는다(fail-closed).
  읽기 실패가 진행 중인 세션의 워크트리를 지울 길을 열면 안 되기 때문이다.

## 4. dotfiles 계약 변경 (선행)

beads-ui는 계약의 소비자다(ADR UI-u6ud-2). 대화 종류는 dotfiles가 먼저 정의한다. 아래 변경은
target rig quick_fix 하나로 착지하고, 이 Bead의 구현 진입을 `blocks`로 막는다(5절).

- `## Worker 세션 대화`의 「실패」 목록에 "dispatch 잔재 처분 실패(`stale_work_unresolved`)"를
  더한다. 공용 스위치 아래 failure identity(실패 attempt)당 한 번, 일시 원인의 자동 재시도가
  끝나고 terminal로 적힌 뒤 자동으로 열린다.
- 슬롯 채움 문단에 이 종류의 `상황` 진단(잔재 요약 필드)을 한 문장으로 더한다.
- 「Resume after 인계」 표에 `실패` · dispatch 잔재 처분 행을 더한다. 내용은 이렇다. Worker는 그
  Bead의 dispatch를 같은 잔재 처분 검사로 한 번 다시 돌리고(`↻ 이어하기`와 같음, beads-ui가
  실행을 소유), 사용자 답은 그 클릭의 권한일 뿐 소유 판정을 대신하지 않는다. 인계 전 대화는 사용자
  답 뒤 구현 워크트리와 그 워크트리 자신의 브랜치에만 로컬 변경을 할 수 있고, push·원격 브랜치
  삭제·PR 닫기는 「인수」 뒤에만 한다. 더 새로운 세션이 Bead를 소유하면 실행하지 않고 행을
  사람에게 돌려준다.
- fenced 첫 입력 블록은 바꾸지 않는다. 그래서 beads-ui의 digest 고정도 바뀌지 않는다.

## 5. 경계·후속

- 크로스 리포 unit: dotfiles — 4절 계약 변경 quick_fix dotfiles-0d42i(target rig Bead, 이
  Bead의 구현 진입을 `blocks`로 막음).
- 관찰: 같은 출처의 소유 오판 수리 — UI-m7ou로 이미 착지했다(자기 attempt가 push한 원격
  브랜치). 이 스펙은 오판이 아닌, 판정이 정말 불가능한 경우만 다룬다.

## 6. 테스트

서버(scheduler·resolve-session):

- `retries a transient stale disposition failure on the env ladder`
- `fails terminal and launches one conversation for remote_branch_owner`
- `launches the conversation once the env ladder exhausts`
- `skips the conversation launch while a ladder rung waits`
- `sends one needs-human notification with the conversation line and no attemptFailed`
- `builds the stale residue failure context with the residue diagnosis`
- `resolves stale_residue handoff target identity from the failed attempt`
- `reruns dispatch once through resume on 인계`
- `ends a restarted 인계 with an unchanged identity as 결과 미상`
- `opens the next conversation once when the 인계 rerun fails again`
- `records the dispatch snapshot session_ref on a new attempt`
- `keeps bead_session_ref and the stale_residue handoff kind across a queue reload` (queue-store)

판정(active-attempts·lane-membership):

- `yields the failed seat to a session external wait registered after the failure`
- `keeps the failed seat for a session wait registered before the failure`
- `keeps the failed seat once the session wait reaches done, resumed, or stopped`
- `yields the failed seat to a session_ref entry absent from the attempt record`
- `keeps the failed seat for an attempt without a recorded session_ref`
- `keeps the failed seat for the bead's own Worker conversation session after 인수`
- `drops the yielded bead from the session exclusion set and running count`
- `drops a yielded bead that still sits in the queue lane from the session exclusion set`
- `drops a yielded bead that still sits in a serial lane from the session exclusion set`
- `passes the ownership input to the monitor running count`

화면·조작(lane-model·tile-resolve·handlers):

- `draws the session tile without failure badge, resume, or discard while a session owns the bead`
- `draws the same card on the worker and monitor tabs` (기존 카드 동일성 테스트에 사례 추가)
- `draws [세션에서 이어가기] on a stale residue failure tile without a pair anchor`
- `refuses discard, resume, conversation launch, 인계, and ladder redispatch with session_owned`
- `refuses the same operations with session_owner_unobservable when ownership cannot be read`
- `draws no lane row for a yielded bead that still sits in a lane`

## 7. 결정 (ADR 후보)

- 전제: ADR UI-u6ud-2 — 대화 종류와 인계 의미는 dotfiles 계약이 정의하고, beads-ui는 필요한
  부분만 코드로 옮기며 계약이 착지한 뒤에 소비한다
- 전제: ADR UI-hf8v — 승계된 실패 대화 조항(공용 스위치, failure identity당 한 번 자동 기동,
  첫 사용자 답 전 읽기 전용 진단, 행당 live 대화 하나), 「인수」 동안 짝 둘만 숨기는 조항(3.4가
  인수 세션을 규칙 밖에 두어 바꾸지 않는다), 카드 슬롯 규칙을 그대로 따른다
- 잔재 처분 실패를 「실패」 대화 종류로 열고 인계를 같은 검사의 dispatch 재실행으로 둔다 — 기존 실패 인계 의미("실패한 단계를 한 번 다시 돌린다")에 종류 하나를 더할 뿐이라, 계약 목록 한 줄과 그 kind 코드로 되돌릴 수 있다(되돌리기 어려움 조건 실패) → ADR 아님
- 세션 소유 증거가 실패 attempt를 앞서 실행중 좌석을 세션에 내준다 — 공유 판정 함수 하나와 그 소비자만 고치면 되돌릴 수 있다(되돌리기 어려움 조건 실패) → ADR 아님
- 일시 원인을 기존 환경 재시도 사다리에 태운다 — 원인 분류 표 하나로 되돌릴 수 있는 구현 선택이다(되돌리기 어려움 조건 실패) → ADR 아님
