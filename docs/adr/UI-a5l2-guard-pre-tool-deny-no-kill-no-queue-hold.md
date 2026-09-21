---
id: UI-a5l2
title: Worker 가드는 실행 전 거부·pre-push 예방·사후 base 착지 감지로만 강제하고 세션을 죽이거나 큐를 세우지 않는다
status: accepted
date: 2026-09-21
summary: "Worker 가드는 Claude·Codex 세션의 실행 전 거부 훅과 pre-push 예방, 사후 base 착지 감지로만 강제하며 텍스트 판정으로 세션을 죽이지 않고, 큐 단위 보류는 어떤 종류도 만들지 않으며, 뚫린 착지는 그 Bead의 개별 실패다"
supersedes: [7, "UI-inge"]
spec: docs/superpowers/specs/2026-09-21-worker-wait-guard-simplification-design.md
bead: UI-a5l2
---

# Worker 가드는 실행 전 거부·pre-push 예방·사후 base 착지 감지로만 강제하고 세션을 죽이거나 큐를 세우지 않는다

## Context

2026-08-22~09-21 30일 실측(스펙 §1)에서 텍스트 판정 kill(`loud_fail_blocker`)로 죽은
세션은 8건이었고 그중 실제 base 훼손은 0건이었다. dotfiles-muao(9/8)는 읽기 전용
`git -c core.hooksPath=/dev/null diff --stat` 한 줄로 세션 kill과 큐 systemic 정지를 함께
겪었다. 정리 실패로 인한 큐 systemic 정지 8건은 전부 하네스 결함이었다(dotfiles-gyno
9/15는 옛 PR head로 identity를 대조한 거짓 경보). 사용자 결정(2026-09-21): 훅 차단은
종결이 아니라 피드백이며 에이전트는 다른 방법으로 이어간다; 자동 큐 정지는 어떤 경우에도
걸지 않는다.

ADR 0007은 예방(`pre-push`)과 사후 ref 불변식을 두면서 "정확히 식별되는 원격 변경·가드
무력화 명령의 kill은 유지한다"고 정했고, ADR UI-inge는 UI-1l3a·UI-a8rq에서 "큐 정지
권한은 `verify_red`와 기존 systemic 원인에만 남고 `▶ 재개`는 체계적 정지의 사람
승인이다"를 승계했다. 두 조항이 사용자 결정과 정면으로 어긋나므로 이 ADR이 둘을 승계한다.

## Decision

**가드는 실행 전 거부와 사후 착지 감지로만 강제한다. 텍스트 판정으로 세션을 죽이지 않고,
큐 단위 보류(`queue.hold`)는 어떤 종류도 만들지 않으며, 예방층이 뚫린 유일한 증거인
`base_landing_detected`는 그 Bead의 개별 실패다.**

- **Claude 러너 실행 전 거부.** Worker의 `--settings`에 `hooks.PreToolUse`(matcher
  `Bash`) 한 항목을 실어 attempt별 가드 스크립트(`guard-hooks/<attempt>`에 pre-push 훅과
  함께 설치, base·target 리터럴을 구움)를 부른다. 스크립트는 `command-guard.js`와 같은
  토크나이저로 `gh pr merge`와 **쓰기 동반** `hook_bypass`(같은 명령줄에 `git push`·
  `commit`·`merge`·`rebase`·`tag`·`gh pr merge`가 있을 때의 `--no-verify`·`core.hooksPath`·
  `GIT_CONFIG_*`)에만 `permissionDecision: "deny"`와 거부 문장을 돌려준다. 읽기 전용
  명령에 붙은 hooksPath는 판정하지 않고, `git_push_base`·`base_merge`는 경고 기록이다.
  세션은 거부 사유를 보고 다음 턴을 이어간다. 거부는 timeline `guard_denied`(runner·
  reason·command)로 남는다.
- **Codex 러너 같은 거부.** attempt별 `CODEX_HOME` 미러(`codex-account-home.js`)가
  `hooks.json`에 같은 가드 스크립트를 `PreToolUse`로 싣고 `config.toml`에 그 그룹의 신뢰
  상태(`hooks.state`, canonical JSON SHA-256 fingerprint)를 쓴다. 기존 사용자 훅과 신뢰
  상태는 미러 경로 키로 보존한다. 훅 로드 흔적이 없는 세션은 `guard_warning`
  (`codex_hook_not_loaded`)만 남기고 예방은 `pre-push`가, 우회 push는 사후 감지가 잡는다.
- **kill 제거.** `session-monitor`의 위반 kill(즉시·`guard_pending` tool_result 확정)은
  없다. `GUARD_EFFECTS`는 전부 `warn`이고 `guard_pending` 기록·`hook_bypass_unresolved`
  경고 정리는 유지한다. `loud_fail_blocker`는 대화형 질문 감지 kill(`question_reason`)에만
  남으며 `individual`이다. 거부 스크립트 자체의 오류는 fail-open이고 `guard_warning`
  (`guard_hook_error`)을 남긴다 — 예방층은 `pre-push` 훅이다.
- **큐 보류 부재.** `queue.hold`·`hold_history`·`systemic` 티어·`ALWAYS_SYSTEMIC_CAUSES`·
  `SYSTEMIC_BLOCKER_REASONS`·큐 보류 WS op(`worker-queue-hold-resume`·`-retry-now`)·4a 칩
  `⛔ 정지`·`↻ 환경 보류`는 없다. `runPass`의 `explicit_only`는 `auto_advance !== true`만
  본다. 재시도 예약은 그 Bead의 `retry_wait` 계보만이며 다른 Bead의 출발을 막지 않는다.
  로드 시 남아 있는 `hold`·`hold_history`는 지우고 버린다. `gh_unavailable`·`bd_unreachable`
  은 그 attempt의 개별 env 실패(그룹 `api`)로 같은 사다리를 탄다.
- **사후 감지.** `base_landing_detected`는 그 attempt를 `failed`(개별)로 기록하고 `❌ 실패`
  알림을 1회 낸다. 큐는 계속 간다. 텍스트 판정은 증거가 아니다.

### ADR 0007에서 승계하는 조항

- 강제층은 두 겹이다: PR로 랜딩하는 attempt마다 `pre-push` 훅을 설치하고 저장소·target
  base를 셸 리터럴로 굽어 `core.hooksPath`를 실은 `GIT_CONFIG_COUNT`로 전달한다; 종단
  임무가 base push 자체인 lane(리뷰를 마친 `quick_fix`·disposition)은 설치 대상에서
  빠지고, 훅은 델타 전체가 `docs/` 아래인 fast-forward를 통과시키고 기록만 남긴다.
  예방층이 강제하는 것은 "세션이 자기 작업을 스스로 머지하지 못한다"다. 사후 ref
  불변식은 실제로 움직인 ref를 사후에 확인한다. `pre-push` 훅의 `guard`·`record`·`deny`
  모드와 선택 규칙(bench=deny, quick_fix lane=record, 그 외 guard)은 바꾸지 않는다.
- 추론성 텍스트 판정(base로 향하는 것처럼 보이는 push 등)은 경고·증거다. 토크나이저가
  해석하지 못한 입력은 옛 정규식 판정으로 fail-closed 폴백한다. 뒤집는 것은 "정확히
  식별되는 원격 변경·가드 무력화 명령의 kill은 유지한다"와 "`git push --no-verify`의
  구멍은 텍스트 가드의 `hook_bypass` kill이 덮는다" 두 조항이며, 그 자리는 실행 전 거부와
  사후 감지가 맡는다.

### ADR UI-inge에서 승계하는 조항

자동 전환 모드에서는 계정 한도가 자동화를 세우지 않는다: 실행 중 attempt도
`preempt_pct`에서 정지해 허용 계정으로 같은 세션을 재개하고, 핀·기본 계정이 보류
중이거나 임계 이상이면 디스패치에서 launch-only로 덮어 전환하며, `prior_attempt` 계정
잠금도 이 전환에는 양보하고, usage_limit 보류의 자동 프로브에는 24시간·재무장 상한이
없으며, 인증 실패는 러너 무관 `credential` 그룹의 계정 단위 공급자 보류로 프로브가
회복을 판정한다(env 재시도 사다리를 쓰지 않는다). 전환 재개 단일성과 같은 계정 기동
직렬화, 그리고 UI-inge가 ADR 0052·UI-1l3a·UI-6icf에서 승계한 조항 전부 — 허용 계정
집합·`wait | switch` 모드·attempt 단위 launch-only `exec_override`·`account_switch` 자식의
cap 미소비·후보 건강 임계·공급자 게이트 계정 해석 사다리 세 층·서버 판정과
`provider_gate` admission 기록·fail-closed 계정 미해석·hold 소멸 시 기록 소멸·outage 프로브
상한 없음·`↻ 지금 프로브`는 target을 지우지 않음·머지 후 정리 실패의 관측형 자동 재실행·
세션 재개 조작 `⏸`·`▶ 재개`와 재개 다이얼로그 갈래·`require_durable` pause 자격 검사와
`prior_attempt` tuple 승계 — 는 그대로다. 뒤집는 것은 UI-1l3a가 UI-a8rq에서 승계한 "큐
정지 권한은 `verify_red`와 기존 systemic 원인에만 남고 `▶ 재개`는 체계적 정지의 사람
승인이다" 한 조항이며, 큐 정지 권한 자체가 사라진다.

기각한 대안: 텍스트 kill 유지 + 오탐 패턴만 정정(읽기 전용 hooksPath는 잡지만 다음
오탐이 또 세션을 죽인다); env 보류만 남기고 systemic 보류만 제거(`runPass`가 `q.hold`가
있으면 다른 Bead의 자동 출발을 막아 사용자 결정 2를 위반한다 — 스펙 r1 리뷰 F1);
Codex는 기록만(훅 없이는 `pre-push`를 거치지 않는 `gh pr merge`가 실행된다 — 스펙 r1
리뷰 F2).

## Consequences

- 되돌리기 어렵다: `loud_fail_blocker`의 systemic 의미, `GUARD_EFFECTS`의 kill,
  `queue_hold systemic`이 함께 사라지고 저장된 보류가 로드 시 버려진다. 되돌리려면 kill
  경로·보류 리듀서·WS op·칩을 함께 되살려야 한다.
- 맥락 없이는 놀랍다: `gh pr merge`를 친 세션이 죽지 않고 거부 문장을 보고 계속 돌며,
  큐를 세우는 자동 경로가 코드에 없다.
- 트레이드오프: 예방층을 우회한 push를 사후에만 알게 되는 대신, 30일간 0건이던 실제
  훼손을 이유로 8건의 세션 kill과 2건의 큐 정지를 없앤다.
- Codex 훅 로드 흔적 판정은 fail-quiet라 훅이 없는 Codex 버전에서는 경고만 남고 예방은
  `pre-push`와 사후 감지에 의존한다.
