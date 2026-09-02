---
id: 28
title: waiting은 선행 미충족 결말의 터미널 계층이고 복귀 fence는 bd ready 부재뿐이다
status: accepted
date: 2026-08-28
summary: 'Worker의 waiting 계층은 선행 미충족으로 정상 종료한 attempt의 터미널 결말이며 실패도 파킹도 아니다 — fence는 bd ready 부재뿐이고 선행이 닫히면 보통 후보로 자동 dispatch된다'
spec: docs/superpowers/specs/2026-08-28-worker-prerequisite-wait-tier-design.md
bead: UI-8jau
---

# waiting은 선행 미충족 결말의 터미널 계층이고 복귀 fence는 bd ready 부재뿐이다

## Context

이 ADR은 2026-08-28에 내려진 결정을 뒤늦게 기록한 것이다. 당시 세션이 미충족
선행을 확인하고 push 없이 정상 종료하면 Worker는 quick-fix 착지 정산에서
`quickfix_landing_failed:delivery_unproven:push_log_absent`로 결론냈다. 화면에는
`⛔ 착지 실패` 타일이 생겼고, `settledAttemptFence`가 재디스패치를 막은 채 사람의
처분을 기다렸다.

하지만 이 결말에는 사람이 처분할 것이 없다. 작업도 착지도 시작하지 않았으므로
선행이 닫히면 같은 Bead를 새 attempt로 다시 실행하면 된다. 이 결과를 나타내는 계약
신호는 이 Bead에서 나가는 미해결 `blocks` 간선이 정확히 하나라는 사실뿐이다.
status, metadata, `awaiting_user` 어느 것도 쓰지 않는다.

복귀를 다시 판정하게 만드는 트리거는 이 결정의 범위가 아니다. 원래 스펙의 “다음
tick” 가정은 ADR 0023이 이벤트 구독으로 대체했으며, 이 ADR은 재판정 시 무엇을
판정하고 어떻게 복귀시키는지만 소유한다.

## Decision

`waiting`은 `classifyFailure`가 분류하는 다섯 번째 tier이며,
`settleFailureTier`가 terminal attempt status로 정산한다. 이름은 실패 분류 경로에
있지만 결말 자체는 실패가 아니며, 사용자 결정을 기다리는 park도 아니다.

`settledAttemptFence`는 `waiting`을 차단하지 않는다. 이 Bead가 `bd ready` 결과에
없다는 사실이 이미 유일한 fence다. `waiting`은 `TERMINAL_ATTEMPT_STATUSES`에
포함되어 attempt를 끝내고 직렬 레인을 해제한다. 그래야 같은 레인의 형제가 선행을
닫는 작업을 실행할 수 있다.

선행이 닫혀 Bead가 다시 `bd ready`에 나타나면 보통 후보와 같은 방식으로 새
attempt를 dispatch한다. 이 복귀에는 버튼 클릭도, 별도 상태 전이 관측도 필요하지
않다. 계약의 네 조건 중 하나라도 관측에 실패하거나 결과가 모호하면 `waiting`으로
추정하지 않고 이전 정산 경로로 fail-quiet한다.

## Considered Options

- **계속 착지 실패로 정산한다.** 기존 경로를 유지할 수 있지만 실제 실패가 없는
  attempt에 사람의 처분을 요구한다. 사용자가 선택해 해결할 대상이 없으므로
  기각했다.
- **`parked`처럼 클릭 출구를 둔다.** 명시적 제어는 늘지만 선행이 닫힌 뒤의 보통
  후보 복귀와 클릭 복귀라는 두 경로가 같은 결말에 생긴다. 기계 사실의 해소를
  사람 결정으로 바꾸므로 기각했다.

## Consequences

- 선행 미충족은 실패 통계와 착지 실패 화면에서 분리되고, 끝난 attempt가 직렬
  레인을 붙잡지 않는다. 선행이 해소되면 보통 스케줄링 규칙만으로 다시 실행된다.
- ADR 0017의 `parked`는 `awaiting_user`를 남긴 사람 결정 대기다. `waiting`은
  `awaiting_user`가 없는 기계 사실 대기이므로 두 결말과 두 복귀 규칙은 분리된다.
- 배제되는 것: `waiting`에는 클릭 출구도 전이 관측 출구도 없다. 유일한 fence는
  `bd ready` 부재이며, 복귀는 새 보통 후보 dispatch다.
- 관측 실패를 예전 정산으로 돌리는 대신 실제 선행 대기를 놓칠 수 있다. 잘못된
  자동 재실행보다 기존의 보수적 결말을 택한 대가다.
