---
scope:
  - server/worker/scheduler.js
  - server/worker/scheduler.test.js
  - server/worker/foreign-blocker-status.js
  - server/worker/foreign-blocker-status.test.js
---

# 선행 대기 복귀는 보존 세션을 잇는다 — 잔재 처분 사다리의 resume 단이 waiting attempt를 후보로 삼는다

- Bead: UI-hgd2 (route=spec_backed) · 선행 UI-7dy1, dotfiles-c5xy (blocks)
- 출처: 2026-09-22 Cortex-bwq attempt `Cortex-bwq-1790073067766-1` — quick_fix 구현 중(3파일
  수정·검증 완료, commit 직전) 외부 정책 훅 결함을 발견해 dotfiles-re1l을 만들고
  `대기 · blocks:dotfiles-re1l`로 끝냈다. 사용자 결정(2026-09-22): 세션 작업 중 선행을 만들고
  건 대기는 새 세션이 아니라 원 세션을 이어야 한다.
- 결정 방식(사용자 답 2026-09-22): 재개 자리는 잔재 처분 사다리 재사용, 자격 실패는 자동으로
  새 세션, dotfiles 계약 정정은 선행 quick_fix로 건다.
- 코드 앵커는 `origin/main a107bcdb` 기준이다.
- r1 리뷰(astra, REVISE) 반영: 자격 거절의 사다리 우회(§4.4), `waiting` 서두의 원인 한정(§4.3),
  foreign 선행의 종료 정보 조회(§4.3·scope), 버릴 수 있는 잔재의 재개 배제(§4.1·§4.2), 소비자
  경로 정정(§4.1), ADR 후보 3조건 서술.

## 1. 문제

선행 대기(`waiting`/`prerequisite_unmet`) attempt의 복귀는 2026-08-28 waiting-tier 스펙 §4.5와
2026-09-02 return-trigger 스펙(ADR 0023→0034→UI-z437→UI-a5l2-2 승계)대로 `rescanWaiting`이
`bd ready`를 읽고 `tickPass`를 한 번 돌리는 **보통 dispatch**다. 새 attempt·새 세션이 뜨고,
이전 세션이 남긴 것은 notes의 `prerequisite:` 줄과 worktree 잔재뿐이다.

이 결말은 실제로 두 가지가 섞여 있다.

1. **진입 전 판정** — 본문·self-review만 읽고 선행을 확인해 worktree를 자르기 전에 끝난 경우.
   남길 컨텍스트가 없으니 새 dispatch가 맞다.
2. **구현 중 발견** — Cortex-bwq처럼 파일을 고치고 검증까지 마친 뒤 commit·push 앞에서 막힌
   경우. 새 세션은 dirty worktree와 notes 몇 줄만 받고 판단을 처음부터 다시 한다. 외부 작업
   대기(2026-09-21 external-wait-same-bead-fork-resume 스펙 §6.2)와 구조가 같은데 재개가 없다.

현행 코드에는 이미 "같은 세션 resume" 단이 있다. dispatch preflight가 worktree 잔재를 관측하면
`disposeStaleResidue`(`:9945`)가 `can_resume → 같은 세션 resume`, `can_continue → 잔재 위에서
새 dispatch`, `can_backup_fresh → 백업 후 새로` 순으로 처분한다(ADR UI-a5l2-2 §5). `can_resume`는
`matchingResidueAttempt`(`:2794`)가 `resumableResidueAttempts`(`:2762`)의 후보 중
`head_oid === 잔재 HEAD`인 attempt를 찾을 때만 참인데, 그 후보 집합이 `failed`·`orphaned`·
`paused`·`waiting/external_job`뿐이라 선행 대기 attempt는 언제나 `continue` 단으로 떨어진다.
Cortex-bwq의 재시도(20:26 `잔재 자동 처분 · continue · dirty_unique`)가 정확히 그 경로다.

계약 쪽도 어긋난다. dotfiles `docs/contracts/workflow-contract.md:162`와 설치본
`workflow/references/execution-spec-backed.md:570`은 구현 중 발견 시 "discarding that worktree /
drop that worktree"라 적는다. Cortex 세션은 그 문장과 달리 worktree를 보존했고, 그것이 오히려
resume에 필요한 상태다.

## 2. 목표와 비목표

목표

- 선행이 닫혀 복귀할 때 원 attempt의 세션·전사·worktree가 살아 있으면 **그 세션을 resume**한다.
  프롬프트에는 어떤 선행이 어떻게 닫혔는지와 "선행 완료는 구현 완료가 아니다"가 실린다.
- 자격이 없으면 사람 개입 없이 지금의 사다리(`continue`·`backup_fresh`)로 떨어진다. 진입 전
  판정(worktree 없음)과 버릴 수 있는 잔재(`discardable`·`base_contained`: 변경도 고유 커밋도
  없음)는 지금처럼 보통 dispatch다 — 재개 대상은 `unique` 잔재(dirty 또는 고유 커밋)뿐이다.
- 복귀 트리거·재스캔 후보·`bd ready` 판정·클레임(ADR 0050)은 바꾸지 않는다.

비목표

- 새 트리거, 예약 레코드, 재시작 정산, 새 status·cause 어휘, 카드 조작 추가. 선행 대기 타일은
  `폐기`뿐인 무인 결말로 남는다(waiting-tier D3).
- 사람 클릭 `[이어하기]`로 waiting attempt를 재개하는 경로. `resume()`의 허용은 잔재 처분 경로
  (`preclaimed`)에만 연다.
- 외부 작업 대기의 fork 경로 변경. 이 설계는 fork가 아니라 잔재 재개와 같은 `resume`이다.
- 재시작 reconcile 정리 경로의 판정 누락 수리 — 선행 UI-7dy1이 소유한다.

## 3. 결정 요약

| # | 결정 | 근거 |
| --- | --- | --- |
| D1 | 복귀 트리거는 그대로다: `rescanWaiting` → `bd ready` → `tickPass` → `dispatch`. 재개 여부는 dispatch preflight의 잔재 처분 사다리가 고른다 | 트리거·후보·판정을 바꾸지 않아 ADR UI-a5l2-2가 승계한 복귀 규칙과 비용 상한이 그대로다. 재개 자리를 새로 만들면 예약·재시작 정산·카드 출구가 따라온다(사용자 답 1) |
| D2 | `resumableResidueAttempts`가 `status === 'waiting' && cause === 'prerequisite_unmet'`을 후보로 더하되, 이 후보는 `unique` 잔재에만 매칭되고 preflight의 `preserve`를 켜지 않는다 | 잔재 처분의 `can_resume`와 dispatch preflight·재관측의 `removeIfDiscardable` 호출이 이 집합을 읽는다. `preserve`를 켜면 버릴 수 있는 깨끗한 worktree까지 남아 재개되므로(리뷰 r1-4) 선행 대기 후보는 `removeIfDiscardable`의 fail-closed 거부(unique 잔재는 지우지 않는다)에만 기댄다 |
| D3 | 선행 대기 종결 시 `judgePrerequisiteWait`가 owned worktree의 HEAD를 관측해 attempt `head_oid`로 기록한다 | `matchingResidueAttempt`는 `head_oid === 잔재 HEAD`로 identity를 맞춘다. dispatch 때 base로 적힌 `head_oid`는 세션이 커밋한 후보와 어긋나 재개가 `continue`로 새므로, base_moved가 `quickfix_landing.head_sha`를 남기듯 대기 종결이 자기 HEAD를 남긴다 |
| D4 | `resume()`는 `waiting/prerequisite_unmet`를 `continuation.preclaimed === true`일 때만 받는다 | `external_job`과 같은 형태. 잔재 처분 경로만 들어오고 사람 클릭 경로는 열리지 않는다 |
| D5 | 프롬프트는 `resumePrompt`의 선행 복귀 전용 서두(`waiting/prerequisite_unmet`에만) + 기존 ancestor 사실(이전 세션 마지막 보고 포함) + `## 선행 완료` 블록이다 | UI-52uv의 `prior_final_message`가 resume 경로에 이미 실리므로 새로 싣지 않는다(Bead 미결 (5) 해소). 선행의 닫힘 사실은 세션이 다시 조회하지 않도록 서버가 readback해 주며, foreign 선행은 `queryForeignBlockerStatus`가 `closed_at`·`close_reason`을 함께 돌려주도록 넓힌다(리뷰 r1-3) |
| D6 | 재개 자격 거절(기동 전 판정)은 사다리 다음 단으로 떨어지고, 기동·상태 오류만 지금처럼 실패다 | 선행 대기는 사람 결정이 없는 결말이라 `⛔ 조치 필요`로 멈추면 ADR UI-a5l2-2 "사람 결정이 필요한 곳에서만 멈춘다"와 어긋난다(사용자 답 2). 현행 `disposeStaleResidue`는 `resume()`의 모든 거절을 `failStaleResidue`로 기록하므로(리뷰 r1-1) 선행 대기 후보에 한해 거절 어휘를 둘로 나눈다(§4.4) |
| D7 | dotfiles 계약의 "discarding/drop that worktree"는 "worktree를 남긴다"로 정정하고, 그 quick_fix를 이 Bead의 `blocks` 선행으로 건다 | Worker 세션은 설치된 계약 문서를 따르므로 계약이 먼저 바뀌어야 잔재가 남아 재개 자격이 생긴다. 계약 정본은 dotfiles(ADR 0012)다(사용자 답 3) |

## 4. 서버

### 4.1 `resumableResidueAttempts` (`scheduler.js:2762`) — D2

status 필터에 `(attempt.status === 'waiting' && attempt.cause === 'prerequisite_unmet')`을 더한다.
나머지 조건(같은 bead·같은 repo·구현 attempt·`session_id`·`head_oid`·`resumed_from` 미소비)은
그대로다. 이 집합의 소비자는 둘이다(`cleanupStopResidue`는 후보를 읽지 않고 `preserve` 없이
정리하며, 그대로 둔다).

- dispatch preflight(`:9390` 근방): `resume_candidates.length > 0`이면 `removeIfDiscardable({
  preserve: true })`를 부른다. 선행 대기 후보는 이 `preserve` 판단에서 **뺀다** —
  `preserve`는 `failed`·`orphaned`·`paused`·`waiting/external_job` 후보가 있을 때만 켠다.
  버릴 수 있는 잔재(`discardable`·`base_contained`)는 지금처럼 제거돼 보통 dispatch가 되고,
  `unique` 잔재는 `removeIfDiscardable`이 어차피 지우지 않으므로(고유 커밋·변경 보호) 그 관측이
  `disposeStaleResidue`로 간다.
- `disposeStaleResidue`(`:9945`)의 `resume_attempt`와 그 안의 재관측(`:10099` 근방):
  `matchingResidueAttempt`(`:2794`)가 HEAD로 찾되, 선행 대기 후보는 `observation.state ===
  'unique'`일 때만 매칭한다. `describeStaleResidue`(`:2819`)가 `resume_attempt`가 있으면
  `base_contained` 관측도 `unique`로 승격하므로, 이 상태 조건이 없으면 깨끗한 worktree가
  재개된다(리뷰 r1-4).

### 4.2 `judgePrerequisiteWait` (`:7150`) — D3

`provePrerequisiteWait`가 `{ blockers, bead_status }`를 돌려준 뒤, `failAttempt` 전에 attempt
기록의 `repo`로 `deps.worktree.observeOwnedByBead({ repo, bead_id })`를 부른다. `ok && present`이고
`branch === branchForBead(bead_id)`이며 `head_sha`가 문자열이면 그 값을 `failAttempt` options의
새 필드 `head_oid`로 넘긴다. `settleFailureTier`의 `waiting` 분기(`:5458` patch)는
`options.head_oid`가 있을 때만 `head_oid`를 함께 쓴다. 관측 실패·부재·브랜치 불일치면 아무것도
쓰지 않는다(fail-quiet) — 그러면 identity가 맞지 않아 D6의 다음 단으로 간다.

호출자는 셋이고 바꾸지 않는다: `onSessionDone` quick_fix 갈래(`:6381`)·PR 레인 갈래(`:6514`),
`disposeDeadAttemptSettlement` PR 레인 갈래(`:8620`), 그리고 UI-7dy1이 더하는 quick_fix 갈래.
관측은 `judgePrerequisiteWait` 안이라 네 경로가 같은 기록을 남긴다.

### 4.3 `resume()` (`:11721`) — D4·D5

- `not_failed` 판정의 허용 조건에 `prior.status === 'waiting' && prior.cause === 'prerequisite_unmet'
  && continuation.preclaimed === true`를 더한다(`external_job` 항과 같은 자리).
- `resumePrompt(bead_id, prior_status, facts)`(`:10982`)의 서두에 새 토큰
  `'prerequisite_return'` 갈래를 더한다: `이전 무인 세션이 선행 대기(blocks)로 끝났고 그 선행이
  닫혔다(bead <id>).` 이 토큰은 `resume()`의 prompt 콜백이 `prior.status === 'waiting' &&
  prior.cause === 'prerequisite_unmet'`일 때만 넘긴다. 다른 `waiting`(`base_moved`·
  `external_job`·recovery)은 지금처럼 `prior.status`를 그대로 넘겨 서두가 바뀌지 않는다(리뷰
  r1-2; 외부 작업 재개도 같은 `resumePrompt`를 부른다, `:11428`). 기존 `failed`/`paused` 서두와
  ancestor 문장(`resumeAncestorFacts`, `prior_final_message`)은 그대로 붙는다.
- `resume()`의 prompt 콜백이 같은 조건이면 기본 프롬프트 뒤에 `## 선행 완료` 블록을 붙인다.
  내용은 `prior.cause_detail.blockers[]` 각 항목의 `<ID> · <status> · closed_at <ISO|미상> ·
  close_reason <값|미상>` 한 줄씩과 마지막 한 줄 `선행 완료는 구현 완료가 아니다 — 잔재
  worktree·Bead·base를 다시 확인한 뒤 남은 단계(commit·구현 게이트·push)만 이 세션이 한다`.
  상태는 판정이 쓰는 같은 reader로 읽는다: 같은 rig는 `deps.bd.readIssue`의 `status`·
  `closed_at`·`close_reason`, foreign(`rig` 있음)은 `queryForeignBlockerStatus`. 그 함수는
  지금 `{ ok, status }`만 돌려주므로(`foreign-blocker-status.js:509` 근방) 같은 `bd show`
  payload에서 `closed_at`(기존 `closedAtOfShow` 정규화)·`close_reason`을 더해
  `{ ok: true, status, closed_at, close_reason }`로 넓힌다 — 캐시 경로(`foreignBlockerStatusFor`)와
  `provePrerequisiteWait`의 판정은 `status`만 읽으므로 바뀌지 않는다. 읽기 실패는 `미상`으로
  적고 재개를 막지 않는다.
- 사용자 지침(`continuation.instructions`)은 이 경로에 오지 않으므로 기존 결합 순서를 유지한다.

### 4.4 `disposeStaleResidue` (`:9945`) — 선행 대기 후보의 거절 우회 (D6)

`residue.can_resume && resume_attempt`면 `resume(workspace, resume_attempt.attempt_id, { preclaimed:
true, retry })`를 부르고 성공 시 `recordStaleDisposition(bead_id, residue, 'resume')`가 타임라인에
`잔재 자동 처분 · resume · resume_available`을 남긴다 — 여기까지는 현행이다.

현행은 `resume()`의 모든 `ok:false`를 `failStaleResidue`로 기록해 재디스패치를 막는다(`:9990`
근방). 실행 공급자가 바뀌어 `resolveContinuationForAttempt`가 `runner_mismatch`를 돌려주는 경우도
같다(`:13276`). 선행 대기 후보(`resume_attempt.status === 'waiting' && cause ===
'prerequisite_unmet'`)에 한해 거절을 둘로 나눈다.

- **자격 거절(기동 전 판정)** — `reason ∈ { not_failed, prior_session_unavailable,
  transcript_missing, worktree_missing, runner_mismatch, continuation_decision_stale,
  already_resumed, no_progress }`: `resume_attempt = null`로 두고 같은 pass 안에서
  `residue = describeStaleResidue(observation, bead_id, null)`로 다시 기술한 뒤 사다리를 이어
  간다. `unique` 잔재는 `can_continue`로 `stale_work_continue` dispatch가 되고(커밋·변경 보존),
  그것도 안 되면 `can_backup_fresh`다. 타임라인에는 `recordStaleDisposition`의 기존 형식으로
  `잔재 자동 처분 · continue|backup_fresh · resume_refused:<reason>`을 남긴다(`cause` 자리에 거절
  사유; 새 kind 없음).
- **기동·상태 오류** — 그 밖의 모든 사유(`bead_running`·`discard_in_progress`·
  `bd_snapshot_failed`·`attempt_prerecord_failed`·`guard_hook_install_failed`·
  `workflow_mode_record_failed`·`spawn_failed`·admission 사유 등): 지금처럼 `failStaleResidue`다.

다른 후보 종류(`failed`·`orphaned`·`paused`·`external_job`)의 처분은 바꾸지 않는다. 자격의
1차 판정은 `resumableResidueAttempts`(`session_id`·`head_oid`)와 `matchingResidueAttempt`(HEAD·
`unique`)가, 2차는 `resume()`·`resolveContinuationForAttempt`(`transcriptPresent`·runner)가 맡고,
이 절은 2차의 결과를 사다리로 돌려보내는 자리다.

### 4.5 재시작·회계 — 변경 없음

- 예약 레코드가 없으므로 external-wait §6.4 같은 정산이 없다. 서버가 죽어도 waiting attempt와
  worktree는 남고 다음 재스캔·dispatch가 같은 판정을 반복한다.
- 새 attempt는 `relaunchFromAttempt`가 `resumed_from: <prior>`·`launch_kind: 'resume'`로 만든다.
  `resumableResidueAttempts`의 `resumed_from` 미소비 조건이 같은 waiting attempt를 두 번 잇지
  않게 한다. usage 합산·계보 표시는 기존 resume attempt와 같다.
- `queue-store.js`의 이관 집합(`PROCESSED_TERMINAL_STATUSES`)은 `waiting`을 넣지 않는 현행
  그대로라 후보 조회가 라이브 큐에서 끝난다(ADR 0029).
- 재스캔 후보(`runWaitingRescan` `:14452`)·`clearAdmission`·활동 버스는 손대지 않는다.

## 5. 프런트

변경 없음. 대기 행의 release 문장 `선행이 닫히면 bd ready 재스캔으로 자동 복귀`(`wait-judgment.js`)는
여전히 참이고, 재개된 attempt는 기존 resume attempt처럼 실행 중 타일로 선다. 타임라인의
`stale_work_auto`·`dispatched:<id>:resume` 이벤트가 이미 있어 새 kind가 없다.

## 6. 재현 (Cortex-bwq 2026-09-22)

1. attempt A가 quick_fix 레인에서 3파일을 고치고(HEAD는 base 그대로, dirty) `대기 · blocks:X`로
   끝난다 → `waiting/prerequisite_unmet`, `head_oid`는 D3 관측값(=base).
2. X가 닫힌다 → 활동 버스 → `rescanWaiting` → `bd ready`에 복귀 → `tickPass` → `dispatch`.
3. preflight가 잔재를 관측한다: owned·unique·HEAD == A.head_oid → `resume_attempt = A`,
   `can_resume` → `resume(A, { preclaimed: true })` → 같은 세션이 `## 선행 완료` 블록을 받고
   commit·구현 게이트·push로 이어진다.
4. 반례 — A가 커밋했는데 D3가 없으면 HEAD ≠ head_oid → `continue`(현행). D3가 있으면 3과 같다.
5. 반례 — 진입 전 판정으로 worktree가 없거나, worktree는 있지만 변경도 고유 커밋도 없으면
   (`discardable`·`base_contained`) preflight가 `preserve` 없이 제거하고 보통 dispatch(현행).
6. 반례 — 3에서 실행 프리셋이 바뀌어 `resume()`이 `runner_mismatch`로 거절하면 같은 pass에서
   `continue`(`stale_work_continue` dispatch)로 떨어지고 실패 타일은 생기지 않는다;
   `spawn_failed`면 지금처럼 `stale_work_unresolved`다.

## 7. 검증 bundle

`server/worker/scheduler.test.js`에 다음을 더한다(기존 `waitingConfig`·잔재 테스트 헬퍼 재사용).

- (a) `waiting/prerequisite_unmet` attempt(`session_id`·`head_oid` 있음)와 같은 HEAD의 owned
  `unique` 잔재(dirty)가 있으면 복귀 dispatch가 `resume`를 `preclaimed: true`로 부르고 새
  attempt가 `resumed_from`=A·`launch_kind` resume이며 타임라인에 `stale_work_auto`·`resume`가
  남는다.
- (b) HEAD가 다르면 `continue`(`stale_work_continue` dispatch)로 떨어지고 resume는 불리지 않는다.
- (c) `judgePrerequisiteWait`가 `observeOwnedByBead`의 `head_sha`를 `head_oid`로 기록한다;
  관측 실패·브랜치 불일치면 `head_oid`가 dispatch 값 그대로다.
- (d) `resume()`는 `waiting/prerequisite_unmet`를 `preclaimed` 없이 부르면 `not_failed`다.
- (e) 재개 프롬프트에 `prerequisite_return` 서두, `## 선행 완료`, blocker `<ID> · closed ·
  closed_at <ISO> · close_reason <값>`, 그리고 `prior_final_message`(세션 로그 마지막 보고)가
  들어간다; foreign blocker의 `closed_at` 읽기 실패는 `미상`이고 launch는 진행된다;
  `base_moved`·`external_job` waiting의 재개 프롬프트 서두는 바뀌지 않는다.
- (f) 선행 대기 후보만 있을 때 preflight `removeIfDiscardable`는 `preserve` 없이 불리고,
  `discardable` 잔재는 제거돼 보통 dispatch가 된다; `failed` 후보가 함께 있으면 지금처럼
  `preserve: true`다.
- (g) `resume()`이 `runner_mismatch`(또는 `transcript_missing`)로 거절하면 같은 pass에서
  `continue`로 떨어지고 타임라인 cause가 `resume_refused:runner_mismatch`다; `spawn_failed`면
  `failStaleResidue`(`stale_work_unresolved`)다; `failed` 후보의 거절 처분은 현행 그대로다.
- (h) `queryForeignBlockerStatus`가 정상 조회에서 `closed_at`(epoch ms)·`close_reason`을
  돌려주고, `closed_at` 부재·파싱 실패는 `null`이며 `status` 판정은 그대로다
  (`foreign-blocker-status.test.js`).
- (i) 기존 사례 유지: 잔재 없는 waiting bead의 보통 dispatch, `transferableAttempts`가
  `waiting`을 이관하지 않음, 외부 작업 대기 fork 경로.
- `npx vitest run server/worker/scheduler.test.js --reporter=dot`, 전체
  `npx vitest run --reporter=dot`, `npm run tsc`, `npm run lint`, `npx prettier --write <변경 파일>`.
- 배포 후: 공유 서버 healthz `source_sha`가 착지 sha와 같고, 선행 대기로 끝난 Worker attempt
  하나를 실제로 닫아 `dispatched:<id>:resume` 이벤트와 재개 세션의 `## 선행 완료` 수신을
  세션 로그에서 확인한다.

## 구현 unit 후보

- `resume-candidate`: §4.1 + §4.2 + §4.4 (`resumableResidueAttempts`·`matchingResidueAttempt`·
  preflight `preserve`·`judgePrerequisiteWait`·`settleFailureTier`·`failAttempt` options·
  `disposeStaleResidue` 거절 우회) — 검증 (a)(b)(c)(f)(g).
- `resume-entry-prompt`: §4.3 (`resume()` 허용·`resumePrompt` 서두·`## 선행 완료` 블록·
  `queryForeignBlockerStatus` 확장) — 검증 (d)(e)(h).

## 경계·후속

- 크로스 리포 unit: dotfiles quick_fix — `docs/contracts/workflow-contract.md:162`의 "discarding
  that worktree without landing"과 `src/shared/skills/flow/workflow/references/execution-spec-backed.md:570`의
  "then drop that worktree without landing"을 "leaving that worktree in place without landing"으로,
  `workflow-state.yaml prerequisite_gate`에 `worktree: preserved_for_resume` 한 줄로 정정한다.
  Worker 디스패치 세션은 Worker가 재개하고, 세션 소유 결말은 재진입 세션이 같은 worktree를
  쓴다. Bead: dotfiles-c5xy (`UI-hgd2`의 `blocks` 선행, Worker 레인 인계).
- 선행 UI-7dy1: 재시작 reconcile 정리 경로의 quick_fix 갈래에 `judgePrerequisiteWait`를 둔다.
  이 설계의 §4.2 관측은 그 갈래에도 같은 함수로 실린다.
- 관찰: 2026-08-28 waiting-tier 스펙 §4.5 "복귀 트리거는 보통 후보 선택"은 그대로이고 바뀌는
  것은 dispatch 이후의 잔재 처분 결과뿐이라 스펙 정정 문단은 두지 않는다.
- 관찰: 세션 소유(사람 세션) 선행 대기의 재개는 사람이 같은 worktree에서 다시 여는 것이며
  Worker의 일이 아니다. 계약 정정이 그 worktree를 남기게 한다는 점만 이 설계와 겹친다.

## 결정 (ADR 후보)

- 전제: ADR UI-a5l2-2 — §5 잔재 자동 처분 사다리(`can_resume → 같은 세션 resume` 우선)와
  "사람 결정이 필요한 곳에서만 멈춘다"를 그대로 따른다.
- 전제: ADR 0050 — 재개는 dispatch가 이미 잡은 클레임 위에서(`preclaimed`) 일어나고 새 클레임
  경로를 만들지 않는다.
- 전제: ADR 0029 — waiting attempt는 라이브 큐에 남아 후보 조회가 합집합 없이 끝난다.
- 선행 대기 attempt는 잔재 재개 후보다 — 복귀 dispatch의 잔재 처분 사다리가 보존 세션을 먼저
  잇고, 대기 종결이 자기 HEAD를 기록해 커밋한 후보도 identity가 맞는다. (1) 되돌리기 어려움:
  후보 집합(`resumableResidueAttempts`)·대기 종결의 `head_oid` 기록·`resume()` 허용 조건·
  프롬프트 토큰 네 곳이 서로를 전제하고, 재개된 attempt의 `resumed_from` 계보가 큐 기록에 남아
  나중에 "새 dispatch"로 되돌리면 이미 이어진 세션 기록의 의미가 바뀐다. (2) 맥락 없이 놀라움:
  선행 대기 스펙(2026-08-28 §4.5)과 ADR 승계 계보는 "복귀는 보통 후보 dispatch"라고 말해 왔고
  잔재 사다리가 `waiting`을 후보로 보는 이유는 코드만으로는 드러나지 않으므로, 몇 달 전 세션이
  이어지는 것을 본 사람은 이 기록 없이는 버그로 읽는다. (3) 실제 절충: 전용 재개 함수(예약
  레코드·재시작 정산·카드 출구가 따라옴)와 `⛔ 조치 필요` 정지(무인 복귀가 끊김)를 기각하고,
  대신 재개 자격을 잔재 identity(HEAD 일치·`unique`)와 기동 전 거절 어휘에 묶는 제약을
  받아들였다. `summary`: "선행 대기 attempt는 잔재 재개 후보이며 복귀 dispatch의 잔재 처분
  사다리가 보존 세션을 resume하고 자격이 없으면 continue·backup_fresh로 떨어진다; 대기 종결은
  worktree HEAD를 head_oid로 기록한다" → ADR
