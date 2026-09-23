---
id: 5
title: 자동 AI 수리 레인 폐기와 needs_human 종단
status: superseded
superseded_by: 22
date: 2026-08-27
summary: 'post-merge 실패는 needs_human으로 종단하고 재진입은 사람 클릭뿐이며 자동 AI 수리 레인은 두지 않는다'
spec: docs/superpowers/specs/2026-08-27-completion-repair-lane-removal-design.md
bead: UI-8w4t
---

# 자동 AI 수리 레인 폐기와 needs_human 종단

## Context

체인: 2026-08-11 `self-healing-auto-merge-completion-intent-design`이 머지 후
실패를 AI 세션이 자동으로 고치는 수리 레인을 도입했다. 2026-08-24
`needs-human-auto-resolution-design`이 그 레인을 실패 종류별로 세분화했다.
2026-08-27 `completion-repair-lane-removal-design`이 레인 전체를 폐기했다 — 도입
16일 만이다.

폐기 이유는 실패의 성격이었다. post-merge 실패(배포 스크립트 red, verify red,
cleanup 중단)는 대부분 사람이 상태를 읽고 결정해야 하는 사건인데, 자동 수리
세션은 그 판단을 대신하지 못하면서 실패 원인을 새 레이어로 덮었다. 무엇이 왜
실패했는지가 수리 시도의 로그 뒤로 밀렸고, 예산 소진 후에도 결국 사람이 같은
자리에서 시작해야 했다.

## Decision

자동 AI 수리 레인을 두지 않는다. post-merge 실패는 원인을 기록한 채
`needs_human`으로 **종단**하고, 재진입은 사람의 클릭뿐이다. 커널이 스스로
종단으로 판정한 `needs_human`은 `terminal` 표시를 갖는다.

자동으로 남는 단계는 pinned 스크립트 identity에 묶인 단발 `script_retry`
하나뿐이며, 토글 없이 상시다. 그 뒤는
`terminal_failed_with_recorded_cause_then_user_manual_rerun_only` 이고, repair
session dispatch는 `never_automatic`에 속한다. 이 정책은 dotfiles가 소유하는
계약 아티팩트의 핀된 사본에서 읽으며, beads-ui 코드가 문장을 다시 쓰지 않는다.

## Considered Options

- **bounded repair(예산 제한 자동 수리)를 유지한다.** 실패마다 N회로 묶으면
  폭주는 막지만, 예산을 다 쓴 뒤 사람이 마주하는 상태가 오히려 더 읽기 어려웠다.
  "자동으로 시도했다"가 원인 진단을 더 쉽게 만들지 않아 기각했다.
- **실패 종류별로 자동/수동을 나눈다.** 08-24가 실제로 그 방향이었고, 분기
  자체가 유지 비용이 되면서 08-27에 함께 접혔다.

## Consequences

- 쉬워지는 것: 실패 화면이 원인 하나로 수렴한다. 실패 시점의 상태가 수리 시도로
  덮이지 않아 사람이 곧바로 진단을 시작한다.
- 어려워지는 것: 일시적 플레이크도 사람이 다시 눌러야 한다. 그 비용을 줄이는
  자리는 `script_retry` 한 단계로 한정된다.
- 배제되는 것: 자동 수리 세션 dispatch, 실패 종류별 자동 해소 분기, 그리고
  `auto_repair` 큐 키 자체(마이그레이션에서 제거된다).
- 정합 부채: `AGENTS.md`의
  `script_retry → auto_repair_session → user_triggered_session` 사다리 문구는 이
  폐기 이후 stale이다. 정정은 별도 소유자·검증을 갖는 형제 작업 `UI-jye3`이
  맡는다.
