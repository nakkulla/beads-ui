---
id: UI-hgd2
title: 선행 대기 attempt는 잔재 재개 후보다 — 복귀 dispatch의 잔재 처분 사다리가 보존 세션을 resume하고 대기 종결이 worktree HEAD를 기록한다
status: superseded
superseded_by: UI-u6ud-7
date: 2026-09-23
summary: "선행 대기 attempt는 잔재 재개 후보이며 복귀 dispatch의 잔재 처분 사다리가 보존 세션을 resume하고 자격이 없으면 continue·backup_fresh로 떨어진다; 대기 종결은 worktree HEAD를 head_oid로 기록한다"
spec: docs/superpowers/specs/2026-09-22-prerequisite-wait-residue-session-resume-design.md
bead: UI-hgd2
---

# 선행 대기 attempt는 잔재 재개 후보다 — 복귀 dispatch의 잔재 처분 사다리가 보존 세션을 resume하고 대기 종결이 worktree HEAD를 기록한다

## Context

선행 대기(`waiting`/`prerequisite_unmet`) attempt의 복귀는 2026-08-28 waiting-tier
스펙 §4.5와 2026-09-02 return-trigger 스펙(ADR UI-a5l2-2 승계)대로 `rescanWaiting`
→ `bd ready` → `tickPass`의 보통 dispatch였다. 새 attempt·새 세션이 뜨고 이전
세션이 남긴 것은 notes의 `prerequisite:` 줄과 worktree 잔재뿐이었다.

2026-09-22 Cortex-bwq attempt는 quick_fix 구현 중 3파일을 고치고 검증까지 마친 뒤
commit 직전에 외부 정책 훅 결함을 발견해 dotfiles-re1l을 만들고 `대기 · blocks:`로
끝났다. 선행이 닫힌 뒤의 재시도는 잔재 처분 사다리의 `continue`(dirty worktree 위
새 dispatch)였고, 새 세션은 판단을 처음부터 다시 했다. 외부 작업 대기(2026-09-21
external-wait 스펙 §6.2)와 구조가 같은데 재개가 없었다. 사용자 결정(2026-09-22):
세션 작업 중 선행을 만들고 건 대기는 원 세션을 이어야 한다.

현행 코드에는 이미 "같은 세션 resume" 단이 있다. dispatch preflight가 잔재를
관측하면 `disposeStaleResidue`가 `can_resume → 같은 세션 resume`, `can_continue →
잔재 위 새 dispatch`, `can_backup_fresh → 백업 후 새로` 순으로 처분한다(ADR
UI-a5l2-2 §5). `can_resume`는 `resumableResidueAttempts`의 후보 중 `head_oid ===
잔재 HEAD`인 attempt가 있을 때만 참인데, 후보 집합이 `failed`·`orphaned`·`paused`·
`waiting/external_job`뿐이라 선행 대기 attempt는 언제나 `continue`로 떨어졌다.

대안은 셋이었다. (A) 잔재 처분 사다리 재사용 — 후보 집합에 선행 대기를 더한다.
(B) 전용 재개 함수 — external-wait처럼 예약 레코드를 두고 복귀 트리거가 직접
fork/resume한다. (C) 자격 실패 시 `⛔ 조치 필요`로 멈추고 `[이어하기]`/`[새
세션으로]` 출구를 둔다.

## Decision

- **선행 대기 attempt는 잔재 재개 후보다.** `resumableResidueAttempts`가 `status ===
  'waiting' && cause === 'prerequisite_unmet'`을 후보로 더한다. 복귀 트리거·재스캔
  후보·`bd ready` 판정·클레임(ADR 0050)은 그대로이고, 재개 여부는 dispatch
  preflight의 잔재 처분 사다리가 고른다.
- **재개 자격은 잔재 identity에 묶인다.** 선행 대기 후보는 `unique` 잔재(dirty 또는
  고유 커밋)에만 매칭되고 preflight의 `preserve`를 켜지 않는다 — 버릴 수 있는
  잔재(`discardable`·`base_contained`)와 진입 전 판정(worktree 없음)은 지금처럼
  보통 dispatch다.
- **대기 종결이 자기 HEAD를 기록한다.** `judgePrerequisiteWait`는 owned worktree의
  HEAD를 관측해 attempt `head_oid`로 남기므로, 세션이 커밋한 뒤 대기로 끝난
  후보도 identity가 맞는다. 관측 실패·브랜치 불일치는 아무것도 쓰지 않는다.
- **`resume()`는 선행 대기를 `preclaimed` 경로에서만 받는다.** 사람 클릭
  `[이어하기]` 경로는 열리지 않는다. 프롬프트는 `prerequisite_return` 서두 + 기존
  ancestor 사실(`prior_final_message` 포함) + `## 선행 완료` 블록(닫힌 선행의
  `status`·`closed_at`·`close_reason` readback, "선행 완료는 구현 완료가 아니다"
  한 줄)이다. 같은 rig는 `bd.readIssue`, foreign은 `queryForeignBlockerStatus`가
  `closed_at`·`close_reason`을 함께 돌려준다.
- **자격 거절은 사다리의 다음 단으로 떨어진다.** 선행 대기 후보에 한해 기동 전
  판정 거절(`not_failed`·`prior_session_unavailable`·`transcript_missing`·
  `worktree_missing`·`runner_mismatch`·`continuation_decision_stale`·
  `already_resumed`·`no_progress`)은 같은 pass에서 `continue`·`backup_fresh`로
  이어지고 타임라인 cause가 `resume_refused:<reason>`이다. 기동·상태 오류
  (`spawn_failed`·`bead_running` 등)만 지금처럼 `stale_work_unresolved`다. 다른
  후보 종류의 거절 처분은 바뀌지 않는다.
- 예약 레코드·재시작 정산·새 status/cause 어휘·카드 조작은 없다. 재개 attempt는
  기존 resume attempt처럼 `resumed_from` 계보·`launch_kind: resume`으로 선다.

## Consequences

- 세션 작업 중 만든 선행이 닫히면 같은 세션이 `## 선행 완료` 블록을 받고 commit·
  구현 게이트·push로 이어진다. 잔재가 없거나 버릴 수 있으면 현행 보통 dispatch다.
- 몇 달 전 세션이 이어지는 것을 본 사람은 이 기록 없이는 버그로 읽는다 — 선행
  대기 스펙과 ADR 승계 계보는 "복귀는 보통 후보 dispatch"라고 말해 왔고, 잔재
  사다리가 `waiting`을 후보로 보는 이유는 코드만으로는 드러나지 않는다.
- 후보 집합·대기 종결의 `head_oid` 기록·`resume()` 허용 조건·프롬프트 토큰 네
  곳이 서로를 전제하고, 재개된 attempt의 `resumed_from` 계보가 큐 기록에 남아
  나중에 "새 dispatch"로 되돌리면 이미 이어진 세션 기록의 의미가 바뀐다.
- 기각한 대안: (B) 전용 재개 함수는 예약 레코드·재시작 정산·카드 출구가 따라온다.
  (C) `⛔ 조치 필요` 정지는 무인 복귀를 끊어 ADR UI-a5l2-2 "사람 결정이 필요한
  곳에서만 멈춘다"와 어긋난다. 대신 재개 자격을 잔재 identity(HEAD 일치·`unique`)와
  기동 전 거절 어휘에 묶는 제약을 받아들였다.
- 계약 정본(dotfiles `workflow-contract.md` Prerequisite gate)의 "discarding that
  worktree"는 "worktree를 남긴다"로 정정한다(dotfiles-c5xy, 이 Bead의 선행). 계약이
  먼저 바뀌어야 Worker 세션이 잔재를 남겨 재개 자격이 생긴다(ADR 0012).
