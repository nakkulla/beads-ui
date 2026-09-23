---
id: UI-u6ud-7
title: Worker 대기·재개·잔재 처분
status: superseded
superseded_by: UI-l48z
date: 2026-09-23
summary: "Worker 대기 어휘는 선행 대기·공급자 보류·재시도 대기·세션이 멈춤 넷이고 사람 결정이 필요한 곳에서만 멈춘다; 미분류 실패는 같은 세션 재시도 사다리 뒤 실패 타일이고 파킹과 복구 대기의 출구는 문의 세션뿐이며 새 attempt 재시도 버튼은 없다; base_moved는 보존 세션을 자동 재개하고 잔재는 resume·continue·backup_fresh 순으로 자동 처분하며 선행 대기 attempt도 그 후보다; 재개는 기록된 provider를 보존하고 현재 route가 유도한 실행 레인이 기록된 레인과 다른 세션 재개는 route_changed로 거절하며 기계 정산만 기록된 레인으로 마친다; closed·deferred Bead는 대기 레인에서 자동으로 물러나고 자동 재배치는 없다"
supersedes: ["UI-a5l2-2", "UI-hgd2", 36, "UI-tqqp", "UI-kq54", 46]
spec: docs/superpowers/specs/2026-09-23-adr-cleanup-history-dir-reader-and-consolidation-design.md
bead: UI-u6ud
---

# Worker 대기·재개·잔재 처분

## Context

- `UI-a5l2-2`: 대기 어휘 넷, 미분류 실패의 같은 세션 재시도 사다리, 복구 대기의 문의 세션 출구, `base_moved` 자동 재개, 잔재 자동 처분과 UI-3vvi·UI-z437·0038·UI-lmqu-2 승계 조항.
- `UI-hgd2`: 선행 대기 attempt는 잔재 재개 후보이고 대기 종결이 worktree HEAD를 기록한다.
- `0036`: 파킹의 출구는 문의 세션뿐이고 새 attempt 재시도 버튼은 없으며 해제 전이 재디스패치는 stale 두 값에만 걸린다.
- `UI-tqqp`: closed·deferred Bead는 모든 대기 레인에서 자동으로 물러나고 자동 재배치는 없다.
- `UI-kq54`: 실행 레인은 매 launch에서 현재 route로 유도하고 기록된 레인과 다른 재개는 `route_changed`로 거절한다.
- `0046`: 같은 작업의 세션 재개는 기록된 provider를 보존하고 provider 변경은 명시적 선택으로만 한다.

## Decision

대기 어휘

- Worker는 사람 결정이 필요한 곳에서만 멈춘다.
- 대기 어휘는 넷이다: `선행 대기 ⛓`(`prerequisite`·`prerequisite_foreign`; 선행이 `blocked`·`deferred`·worker-ineligible이면 `action_required`), `공급자 보류 ⏳`(`provider_hold`), `재시도 대기 ↻`(`retry_wait`; 예약 + `grace_ms` 경과면 `overdue`), `세션이 멈춤 ⏸`(`awaiting_user`와 `recovery`; 항상 `action_required`·코드 `decision`). `external_job` 행은 나란히 선다.
- 판정은 `normal`·`overdue`·`action_required`이고 `overdue`는 다음 확인 시각이 있는 종류(공급자 보류·재시도 대기·외부 작업)에만 난다. 대표 사유 순서는 `awaiting_user`/`recovery` > `provider_hold` > `prerequisite_foreign` > `prerequisite` > `retry_wait`다.
- `세션이 멈춤` 카드 본문(슬롯 3)은 세션이 남긴 문장 한 줄이다. `조건 대기`·`확인 대기`·`반영 대기`·`처분 대기`·`정지`·`환경 보류` 라벨, `stale_work`·`base_moved`·`queue_hold` 종류, verdict `disposition`·`hold`·`recovery_confirm`·`settle_overdue`(recovery)는 없다.
- `막힘 N`은 이슈 단위 사유가 하나라도 있는 원래 이슈 수이고 새 대기 종류는 어휘 표에 행을 더한다. 화면 대표는 "무엇을 기다리나"가 정하고, attempt의 생사와 레인 점유가 대표를 정한다. `복귀 대기` 배지는 없다.

복구 계약 소비

- 복구 계약은 핀된 사본 `generated/contracts/work-recovery-policy.json`으로 소비하고 provenance로 검증하며 `supported:false`면 새 자동 동작을 보류한다. disposition·wait reason·분류 키는 계약이 정의하고, 이 저장소는 분류 순서(`unclassified`를 주는 키를 정책 조회 뒤 env 티어로 보내는 것)만 정한다.
- 세션이 선언한 대기 줄은 계약의 wait reason과 `reconcile`만 허용하고 대기 의도일 뿐 승인·종료·효과·재개 자격을 입증하지 않는다. `BDUI_WORK_RECOVERY_SCHEMA=1`과 preamble 결과 줄은 검증된 구현·quick_fix 세션에만 전달된다.
- 실제 usage-limit는 구조화 증거로만 보류가 된다. 자동 fatal 목록은 비어 있으며 모델의 실패 주장·retry 소진·PR 부재만으로 최종 실패를 만들지 않는다.
- 재개 fence는 복구 대기를 실패 행과 같이 막아 새 attempt를 자동 디스패치하지 않고, 재개는 기록된 runner·model·effort·speed·세션을 보존하며, 같은 계보의 같은 원인 반복은 `no_progress`로 승격한다.

미분류 실패

- 정책 키 `finished_without_result_line`·`past_failure_line`·`environment_line`·`unknown_error`로 `unclassified`가 되는 종료와 `session_failed:turn_failed`는 `env` 티어다(env 패턴이 맞으면 그 그룹, 아니면 `unknown`).
- 재시도는 이 호스트에 실패 attempt의 세션 기록이 있으면 같은 세션·러너·모델·effort·계정을 `resume`하고, 없으면 같은 실행 설정을 승계한 새 `dispatch`다.
- 사다리(2·5·15분, 3회)를 다 쓰면 attempt는 `failed`, 카드는 실패 타일(`↻`·`폐기`), `❌ 실패` 알림 1회, Bead는 `open`이다. `transient_retry_exhausted → wait`는 없고 예산은 리셋되지 않으며 사람의 `↻`는 같은 계보의 수동 재개다. 저장된 `waiting/unclassified` 기록은 로드 시 `failed`(`retry.migrated:'unclassified_wait'`)로 이행하고 알림·자동 재개는 없다.

파킹과 복구 대기의 출구

- `parked`는 verdict `success` ∧ bead status ∉ {resolved, closed} ∧ `pr_url` 없음 ∧ `awaiting_user` 키 존재일 때 `status='parked'`, `cause='session_parked'`이고 실패가 아니므로 큐는 계속 간다. Worker는 스스로 새 attempt를 만들지 않는다.
- 모든 파킹(`awaiting_user` 문자열이 계약 어휘 안이든 밖이든)은 기록 직후 문의 세션을 기동한다. 값별 분기는 stale 두 값, `impl_review_conflict:design`, 그 밖의 값(일반 파킹 블록) 셋이고 프롬프트 원문은 dotfiles 소유이며 beads-ui는 바이트 복사를 다이제스트로 고정한다.
- 파킹 타일의 출구는 `[세션에서 해결]`·`[폐기]` 둘이다. `[세션에서 해결]`은 살아 있는 문의 세션이 있으면 그 pane을 가리키고(`already_running`) 없으면 기록된 세션을 fork해 띄우며 자동 기동 게이트(`worker_direction_inquiry.enabled`)를 읽지 않는다.
- 새 attempt `[재시도]` 버튼은 없다.
- 해제 전이 자동 재디스패치는 stale 두 값에만 걸리고 후보 판정은 파킹 레코드의 `cause_detail.awaiting_user`로 한다. `impl_review_conflict:design`은 PR 관측(`resolved` + `pr_url`)으로만 정산하고, 어휘 밖 값의 정산은 그 값을 정의하는 계약이 소유한다. stale 경로의 attempt당 1회 fence(`parked_resumed_at`)를 둔다.
- 세션이 선언한 복구 대기(결과 줄 `대기 · recovery:<reason>`의 `authority`·`verification`·`no_progress`·`reconcile`, 세션이 선언한 `unclassified`, `blocks` 목록이 빈 `prerequisite`)는 술어 `isSessionStalledRecovery` 하나로 판정하고, `waiting` 기록 직후 파킹과 같은 게이트(`worker_direction_inquiry.enabled`·tmux·Bead당 1개)로 문의 세션을 띄운다. 프롬프트는 dotfiles `execution-common.md` Direction inquiry 절 `recovery` 블록의 바이트 복사이고 다이제스트를 고정한다.
- 복구 대기 카드 조작은 `[세션에서 해결]`·`폐기`이고 `↻ 이어하기`는 없다. 알림은 `waitActionRequired` 1회에 문의 세션 결과 한 줄을 붙인다. `provider`·`credential`은 공급자 보류 경로, `blocks` 목록이 있는 `prerequisite`는 선행 대기다.

base_moved와 재개 종류

- `base_moved`는 기록 직후 2분 뒤 같은 세션을 자동 재개하고(방아쇠만 자동), 같은 계보에서 세 번 반복되면 `세션이 멈춤`(`reason: no_progress`, `base가 반복 이동함 · 후보 <sha7>`)이다.
- 재개 종류는 `resumeKindOf(quickfix_landing)`이 사유 문자열로 정하고 `session` 목록에 `base_moved`가 있다. 기계 정산은 같은 attempt의 착지 후 단계 재실행이며 버튼은 `↻ 정리 재시도`, 세션 실행은 `↻ 이어하기`다. `settlement`의 세션 참조 면제와 `bd_read_failed` 기록, 폐기의 `parent_reset` 파괴성 경계를 둔다.

잔재 처분

- 디스패치의 `disposeStaleResidue`가 검증된 잔재 identity(`identity`·`state`·`cause`·capability 플래그)로 순서대로 처분한다: `can_resume` → 같은 세션 `resume`; `can_continue` → 잔재 워크트리·브랜치로 새 attempt `dispatch`(커밋 보존); `can_backup_fresh` → `backupFreshResidue(identity)`로 `discard-backups`에 보관 뒤 같은 tick에서 새 attempt(백업이 `identity_changed`면 재관측 뒤 재판정); 그 밖은 재관측 1회 뒤 `failed`·`stale_work_unresolved`.
- 다른 소유자의 PR·원격 브랜치가 확인된 잔재는 `preserve:true`로 재관측해 자동 정리하지 않는다. timeline `stale_work_auto`만 남기고 알림은 없다. WS op `worker-stale-work-*`, admission `worktree_stale_work`는 없고 로드 시 남은 admission은 지운다.
- 선행 대기 attempt(`status === 'waiting' && cause === 'prerequisite_unmet'`)는 `resumableResidueAttempts`의 잔재 재개 후보다. 복귀 트리거·재스캔 후보·`bd ready` 판정·클레임은 그대로이고 재개 여부는 preflight의 잔재 처분 사다리가 고른다.
- 선행 대기 후보는 `unique` 잔재(dirty 또는 고유 커밋)에만 매칭되고 `preserve`를 켜지 않는다. 버릴 수 있는 잔재와 worktree 없음은 보통 dispatch다.
- `judgePrerequisiteWait`는 owned worktree의 HEAD를 attempt `head_oid`로 기록한다. 관측 실패·브랜치 불일치는 아무것도 쓰지 않는다.
- `resume()`는 선행 대기를 `preclaimed` 경로에서만 받고 사람 클릭 `[이어하기]` 경로는 열리지 않는다. 프롬프트는 `prerequisite_return` 서두 + 기존 ancestor 사실 + `## 선행 완료` 블록(닫힌 선행의 `status`·`closed_at`·`close_reason` readback, "선행 완료는 구현 완료가 아니다")이다.
- 선행 대기 후보의 기동 전 판정 거절(`not_failed`·`prior_session_unavailable`·`transcript_missing`·`worktree_missing`·`runner_mismatch`·`continuation_decision_stale`·`already_resumed`·`no_progress`)은 같은 pass에서 `continue`·`backup_fresh`로 이어지고 타임라인 cause는 `resume_refused:<reason>`이다. 기동·상태 오류만 `stale_work_unresolved`다.
- 선행 대기 재개에 예약 레코드·재시작 정산·새 status/cause 어휘·카드 조작은 없고, 재개 attempt는 `resumed_from` 계보·`launch_kind: resume`으로 선다.

외부 작업 대기

- 외부 작업 대기는 소비자 Bead 자신의 `external_wait` 상태이고, Worker 한 런타임이 관찰·완료·알림·재개를 소유하며, hold 예산 판정과 `대기 · external:<wait_id>` 종결, 보존 세션의 fork 재개와 `[이어하기]`·`[새 세션으로]`, 소비자 카드 표면을 둔다.
- 이벤트 구독 복귀·admission 진단 기록·재스캔 후보(`external_job` 제외)·foreign 트리거 매칭을 따른다.
- 자동 진행 꺼짐은 무표시이고 `manual_only`·`[지금 시작]` 게이트 조건·직렬 레인 선두 규칙·연결 레인 폐기를 따른다. `waiting`은 기계 사실 대기이고 `external_wait` 외 새 상태는 만들지 않으며 `prerequisite_unmet`은 증명으로만 선다.

레인 퇴장

- bd `closed` 또는 `deferred` Bead는 병렬 `queue`와 모든 직렬 레인의 대기 행에서 자동으로 물러난다. `closed`는 `done`으로 이동하고, `deferred`는 제거하며 그 Bead의 비종료 계보가 잡은 직렬 레인 연결도 푼다. `resolved`는 대상이 아니고 `pr_wait`·`done`은 순회하지 않는다. poller sweep과 tick 안 admission 처분은 같은 헬퍼로 판정한다.
- leaf `paused` attempt는 그 Bead의 bd 종료가 우선한다. ■ 정지의 paused 분기와 같은 순서(leaf 가드 → 종료 약속 대기 → 기준 이동 관측 → `stopped` 기록 → 보호 훅 해제 → 잔재 정리)로 처분하고 `stopped`에 `cause: bead_closed | bead_deferred`를 싣는다. 처분 뒤 bd 상태를 다시 읽어 여전히 `closed`/`deferred`일 때만 레인을 변이한다.
- 워크트리는 버릴 수 있을 때만 지우고(`removeIfDiscardable`) 미반영 변경이 있으면 보존한다.
- 제거 사실은 Bead 타임라인 `queue_removed` 한 줄로 남긴다. 다시 `open`이 돼도 자동 재배치는 없다 — 배치는 사람·세션의 명시적 place다.
- dispatch·lane fence의 활성 집합은 paused를 포함하고, sweep만 옵션으로 leaf paused를 제외한다.

레인과 provider 보존

- 실행 레인은 매 launch에서 현재 route로만 유도한다. `app/utils/quickfix-lane.js`의 `laneOfRoute(route)` 하나가 소유하고 서버·클라이언트가 같은 사본을 읽는다. `quick_fix`만 `quick_fix`, 그 외는 `pr`다. 레인은 relaunch 상속 목록에 들어가지 않는다.
- 기록된 레인(`prior.quickfix_lane`)과 현재 레인이 다르면 모든 재개·relaunch 경로(수동 이어하기, `base_moved` 보존 후보, 공급자 자동 재개, 지시 재시작, 머지 큐 충돌 해소, REVISE 처분)는 세션을 띄우지 않고 `route_changed`로 거절한다. 판정은 `laneMismatchOf(prior, bead_snapshot)`가 진입 경로와 launch 직전 두 곳에서 하고 admission보다 먼저 거절한다.
- 거절은 실행 상태를 바꾸지 않고 이전 attempt의 진단 필드 `resume_refused='route_changed:<prior_lane>→<current_route>'`와 공급자 자동 재개의 `auto_resume_refused`만 쓴다. Bead metadata는 읽기 입력이다.
- 사유 기반 정산 재실행(`[정리 재시도]`, `resumeKindOf === 'settlement'`)만 기록된 레인으로 완료한다.
- `route_changed` 복구는 기존 조작([폐기] 뒤 재배치 또는 [지금 시작])이고 세션 승계·자동 재진입·승인 키 위조는 없다. 표현은 기존 슬롯(응답 `reason='route_changed'`·`route_change`, 토스트, 실패 타일 안내 줄 `RESUME_REFUSALS`)이고 새 슬롯·배지·버튼·타임라인 이벤트는 없다.
- 세션 참조는 provider와 함께 전달되고, 유효한 로컬 원본 세션이 있으면 기록된 provider와 ID로 resume 또는 fork한다. 현재 기본 provider가 달라도 유지한다.
- transcript가 없거나 쓸 수 없으면 fresh fallback을 원본 provider 안에서 수행하고 이유를 기록한다. 원본 자체가 없을 때만 현재 실행 설정으로 fresh를 시작한다.
- provider 변경은 사용자의 명시적 선택(`fresh_current`·`exec_override`·decision token)으로만 일어나고, 도구 오류·기록 누락·알 수 없는 runner로 Claude↔Codex를 자동 전환하지 않는다. 실행 파일 부재는 `launch_failed:<runner>_not_found`다.
- `continuation_choice='prior_attempt'` 자식은 same-provider fresh fallback 없이 기록된 세션의 엄격한 재개만 허용한다.
- provider 보존은 실행 위치 선택이며 승인·review 권한을 부여하지 않는다.

## Consequences

- Worker 대기·재개·잔재 처분이 한 행으로 읽힌다. 되돌리려면 wait-judgment·resolution-ladder·잔재 처분·문의 세션 기동·큐 sweep·resume 경로가 함께 움직인다.
- 흡수한 여섯 ADR과 `UI-a5l2-2`가 승계하던 UI-3vvi·UI-z437·UI-lmqu-2 조항은 전부 승계했고 폐기한 조항은 없다. `UI-a5l2-2`의 "ADR 0038에 대해"는 0038 전체를 뒤집어 원래 규칙(attempt 생사와 레인 점유가 대표를 정한다)으로 돌아간 것이라 그 원래 규칙만 재진술했다.
