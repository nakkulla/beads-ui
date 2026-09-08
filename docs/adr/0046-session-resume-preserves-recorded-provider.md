---
id: 46
title: 같은 작업의 세션 재개는 기록된 provider를 보존하고 provider 변경은 명시적 선택으로만 수행한다
status: accepted
date: 2026-09-08
summary: "같은 작업의 세션 재개는 기록된 provider를 보존하고 provider 변경은 명시적 선택으로만 수행한다"
spec: docs/superpowers/specs/2026-09-08-codex-orchestration-parity-design.md
bead: UI-mn5u
---

# 같은 작업의 세션 재개는 기록된 provider를 보존하고 provider 변경은 명시적 선택으로만 수행한다

## Context

Worker는 Claude와 Codex 두 오케스트레이션 도구로 작업을 시작할 수 있었지만, 보조
경로는 Claude를 전제했다. `resolve-session`·`direction-inquiry`는 fork 대상 runner를
`claude`로 고정해 `codex:` 세션 참조를 `provider_mismatch`로 분류했고,
`review-session`은 기록된 리뷰 세션 ID가 있으면 Claude로만 재개했으며,
`tmux-launcher`는 실행 파일을 `claude`로만 해석했다. 그 결과 Codex로 시작한 작업의
세션 해결·문의·리뷰 재개는 같은 계보를 잇지 못하고 다른 도구의 새 세션으로 바뀌거나
거절됐다.

대안은 셋이었다. (1) 각 함수 경계에서 provider 정보를 보존해 기록된 도구로 재개한다.
(2) Codex 문제 경로를 Claude로 자동 전환해 실행을 계속한다. (3) Codex 전용 Worker와
복구 큐를 복제한다. (2)는 기록된 세션·계정·사용자 선택과 다른 실행을 만들고, (3)은
권한·재개·머지 규칙을 두 갈래로 나눈다.

## Decision

- 세션 참조는 ID만이 아니라 provider와 함께 전달되고, 유효한 로컬 원본 세션이 있으면
  기록된 provider와 ID로 resume 또는 fork한다. 현재 기본 provider가 달라도 유지한다.
- transcript가 없거나 로컬에서 쓸 수 없으면 기존 fresh fallback을 **원본 provider 안에서**
  수행하고 이유를 기록한다. 원본 자체가 없을 때만 현재 실행 설정으로 fresh를 시작한다.
- provider 변경은 사용자의 명시적 선택(`fresh_current`·`exec_override`·decision token)으로만
  일어난다. 도구 오류·기록 누락·알 수 없는 runner를 이유로 Claude↔Codex를 자동
  전환하지 않으며, 실행 파일 부재는 `launch_failed:<runner>_not_found`로 설명한다.
- UI-qce9의 `continuation_choice='prior_attempt'` 자식은 예외로, same-provider fresh
  fallback을 적용하지 않고 기록된 세션의 엄격한 재개만 허용한다(ADR 0045).
- 이 정보는 실행 위치를 고르는 것이며 승인·review 권한을 부여하지 않는다. 머지 큐
  소유권(ADR 0006), review lineage 재시도 횟수(ADR 0019), review ancestry(ADR 0031)는
  바뀌지 않는다.

## Consequences

- 되돌리기 어렵다: 세션·계정 계보가 기록된 provider에 결속되므로, 자동 전환을
  다시 허용하면 이미 기록된 재개 이력의 의미가 바뀐다.
- 맥락 없이는 놀랍다: 현재 설정이 Claude여도 Codex로 시작한 작업의 해결 세션은
  Codex 터미널에서 열린다. 실행 결과와 안내는 실제 도구와 터미널 위치를 명시한다.
- 실제 절충: Codex 도구가 실패하면 Claude로 이어갈 수 있었던 편의를 포기하고, 사용자가
  명시적으로 provider를 바꾸는 한 번의 조작을 요구한다.
- 알 수 없는 runner·unsafe ID·command 부재는 기존 실패 응답으로 남고 fallback을 만들지
  않는다.
