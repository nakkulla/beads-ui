---
id: UI-a8rq
title: 머지 후 정리 실패는 큐를 세우지 않고 그 Bead에 머물며 관측형 실패는 코디네이터가 자동으로 다시 돌린다
status: superseded
superseded_by: UI-1l3a
date: 2026-09-15
summary: "머지 후 정리 실패는 큐를 세우지 않고 그 Bead에 머물며, 관측형 실패는 코디네이터가 자동으로 다시 돌리고 결정형 실패만 사람이 처분한다"
supersedes: [UI-o5ll]
spec: docs/superpowers/specs/2026-09-15-cleanup-failure-bead-scoped-auto-retry-design.md
bead: UI-a8rq
---

# 머지 후 정리 실패는 큐를 세우지 않고 그 Bead에 머물며 관측형 실패는 코디네이터가 자동으로 다시 돌린다

## Context

2026-09-15 dotfiles-gyno(PR #506)는 머지와 배포가 끝난 뒤 정리 단계가
`cleanup_failed:worktree_remove_failed`로 멈췄다. 그 한 번의 실패로 세 가지가 함께
일어났다. (1) ADR 0016에서 0048·0049·UI-o5ll로 이어진 "`cleanup_failed:*`는 systemic"
분류가 dotfiles 큐 전체를 `hold.kind='systemic'`으로 세워 다른 Bead의 dispatch·merge가
멈췄다. (2) 코디네이터는 `cleaning` 단계의 `cleanup_repairable` 사실을 곧바로 terminal
`needs_human`으로 정산하므로 [정리 재시도]가 유일한 출구였고, 그 클릭은 같은 정리
절차를 같은 입력으로 다시 돌려 매번 같은 사유로 거부됐다. (3) 정리가 결국 성공한 뒤에도
systemic hold는 남아 사용자 `▶ 재개`만이 풀 수 있었다.

첫 사고의 직접 원인(경로별 포함 비교 오탐)은 UI-m55x가 수리했다. 남은 구조 — 한 Bead의
정리 실패가 큐를 세우고, 사람이 같은 실패를 반복 클릭하며, 원인이 사라져도 정지가
남는 — 는 "정리 실패는 다음 Bead에도 재발한다"는 원래 전제 위에 있었다. 그 전제는
틀렸다: 정리는 그 Bead의 worktree·branch에 국한되고 공유 base에는 손대지 않는다.
사용자 방향(2026-09-15)은 사람이 확인하는 단계를 최소화하는 것이다.

## Decision

ADR UI-o5ll의 결정은 두 조항을 빼고 그대로 승계한다 — 공급자 보류의 해제는 프로브만이
판정하고 outage 프로브에는 상한이 없으며 백오프 상한은 1시간이다; 분류기의 판정이
바뀌면 서 있는 target의 `kind`가 `usage_limit`으로 강등된다; 막힌 대기 행에
`↻ 지금 프로브`를 두고 그 조작은 target을 지우지 않는다; 상단 배너는 없고 정지·보류의
사실은 막힌 대기 행의 4a 칩이 말하며 출구는 그 행의 1번 조작이다; `▶ 재개`는 체계적
정지의 사람 승인 한 번이다; `[지금 시작]`은 그 행 하나의 명시적 디스패치로 공급자
게이트도 우회한다. 뒤집는 것은 0016에서 0048로 이어진 "`cleanup_failed:*`는 systemic"
분류와, `cleanup_failed` 사유 hold에 한한 "자동 재개는 hold를 풀지 않는다" 조항이다.

- **머지 후 정리 실패는 큐를 세우지 않는다.** `needs_human` 가족 가운데
  `cleanup_failed:*`는 그 Bead의 행에만 남는다. `needsHumanHoldKind`는 `verify_red`
  가족에만 `systemic`을 돌려주고, `failure-class.js`의 항상-systemic 목록에서
  `cleanup_failed`를 빼 attempt 수준 `cleanup_failed:*`는 `individual` tier다. 큐 정지
  권한은 `verify_red`와 기존 systemic 원인(base 이동·hook 우회·gh/bd 불가)에만 남는다.
- **`branch_cleanup`·`base_containment` 단계의 정리 실패는 관측형과 결정형으로
  나뉜다.** 정본은 `resolution-ladder.js` `cleanupFailureRetryClass`의 상수 하나다.
  관측형(git 관측·bundle 생성·ref CAS·원격 통신·base 관측의 일시 실패)은 코디네이터가
  `cleanup_failed` 기록의 `retry_count`·`next_retry_at`으로 최대 3회(1·5·15분) 자동
  재실행한다. 결정형(내용·소유·identity를 이유로 한 보존, `manager_reason` 없는 레거시
  기록, 읽을 수 없는 기록)은 즉시 그 Bead의 `needs_human`이다. `repo_operations`
  단계는 이 분류의 대상이 아니다 — script_retry(ADR 0009)와 그 소진 뒤 처리(UI-3vvi)가
  소유한다.
- **재실행 상태는 `auto_resolution` 사다리가 아니라 `cleanup_failed` 기록에 싣는다.**
  `applyCompletionPhase`가 살아 있는 사다리 동안 `cleaning` 이동을 붙들어 실제 정리가
  한 reconcile 뒤에야 돌고, 실패 분기의 `clear: true`가 횟수를 지우기 때문이다. 기존
  `retry_cleanup` action → `startCleanupReplay` → `resumeCompletionCleanup` 경로를 그대로
  쓰고, 횟수는 재실행 전에 기록되므로 재실행 중 프로세스가 죽어도 무한 반복은 없다.
- **원인이 사라진 정리는 사람 없이 끝난다.** worktree·branch가 이미 없으면 정리는
  성공이고, 관측형 재실행의 어느 회차든 성공하면 행은 `done`으로 가며 `needs_human`은
  생기지 않는다. 결정형·소진 `needs_human`의 출구는 현행 두 클릭([정리 재시도]·[세션에서
  해결])이다.
- **낡은 정리 정지는 로드 시 정리한다.** 이 결정 이전에 `cleanup_failed:*` 사유로 서
  있는 `systemic` hold는 새 규칙에서 존재할 수 없는 기록이므로 큐 로드 정규화가
  지운다. 같은 hold에 `verify_red`나 다른 systemic 사유의 Bead가 합쳐져 있으면 그 사유와
  남은 Bead로 hold를 줄여 유지한다. 이것이 "자동 재개는 hold를 풀지 않는다"의 유일한
  예외다.
- **새 라벨·칩·버튼은 없다(ADR 0014).** 재실행 대기 중의 표시는 기존 실패 단계 라벨
  뒤에 `· 다음 HH:MM` 꼬리만 붙이고, 재료가 없으면 그리지 않는다.

기각한 대안: 결정형 실패도 시계로 재시도(같은 입력에 같은 결과인 판정을 반복하면
로그만 쌓이고 사람 호출은 3회 뒤로 미뤄질 뿐); 기존 `auto_resolution` `retry` 사다리에
새 가족을 얹기(사다리를 고치면 `verify_cmd_failed`·`cleanup_prerecord_failed`의 기존
의미까지 바뀐다); 정리 실패를 `individual` 실패 attempt로 정산(머지는 끝났고 attempt는
종료됐다 — 정리는 완료 코디네이터의 saga다); hold는 유지하되 정리 성공 시 자동
해제(한 Bead의 정리 실패가 다른 Bead를 세울 이유가 없으므로 정지 자체를 없애는 편이
단순하다); 낡은 정지 기록을 사람이 `▶ 재개`로 정리(사람 확인 최소화와 어긋난다).

## Consequences

- "확인 필요가 뜨면 큐가 멈춘다"는 운영 습관이 바뀐다. 정리 실패 Bead가 있어도 큐는
  계속 돌고, 사람은 그 Bead의 행에서 늦게 볼 수 있다. 이 기록이 없으면 "왜 정리 실패가
  큐를 안 세우나"와 "왜 hold가 재시작 뒤 사라졌나"가 둘 다 결함으로 읽힌다.
- 되돌리기는 정지 상태 모델·코디네이터 결정·실패 분류·정리 기록 형식(`next_retry_at`)·
  표면의 꼬리 표시를 함께 되돌려야 한다. `verify_red`의 systemic 정지와 `▶ 재개`의
  `since` CAS는 그대로다.
- `hold_history`는 env→systemic 승격 집계의 입력이므로 정규화가 항목을 쓰지 않는다.
  지우거나 줄인 hold는 서버 로그 한 줄로만 남는다.
