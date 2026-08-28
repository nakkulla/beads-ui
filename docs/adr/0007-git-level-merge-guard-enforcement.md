---
id: 7
title: 머지 금지 강제를 git 수준 예방과 사후 ref 불변식으로 이전
status: accepted
date: 2026-07-30
summary: '머지 금지는 pre-push 훅 예방과 사후 ref 불변식이 강제하고 텍스트 판정은 추론성 판정을 경고로 강등하되 정확한 원격 변경 명령의 kill은 유지한다'
spec: docs/superpowers/specs/2026-07-30-guard-enforcement-layer-replacement-design.md
bead: UI-8mvc
---

# 머지 금지 강제를 git 수준 예방과 사후 ref 불변식으로 이전

## Context

세션이 base를 직접 건드리지 못하게 하는 강제층은 원래 명령 문자열을 읽는 텍스트
가드 하나였다. 텍스트는 그 push가 **어느 저장소의 어느 ref**로 가는지 추측해야
한다. `cd <repo> && git push`, python `subprocess.run(['git','push',...])`, node
자식 프로세스는 모두 다르게 보이지만 결과는 같다. 반대로 `rg`로 `gh pr merge`
문자열을 검색하는 것은 머지 시도로 오판됐다(2026-07-27 실사고).

추측에 근거한 판정이 세션을 kill하는 것이 문제의 핵심이었다. git은 추측할 필요가
없다 — `pre-push` 훅은 해석된 목적지 ref를 stdin으로 받는다.

## Decision

강제층을 두 겹으로 나눈다.

1. **예방**: attempt마다 `pre-push` 훅을 설치하고, attempt의 저장소와 target
   base를 스크립트 안에 셸 **리터럴**로 굽는다(환경 변수는 세션이 덮어쓸 수 있어
   판정이 아니다). 훅은 `GIT_CONFIG_COUNT`/`core.hooksPath`로 전달되어 세션이
   건드리는 모든 저장소에 적용된다.
2. **사후 ref 불변식**: 실제로 움직인 ref를 사후에 확인한다.

텍스트 판정은 남되 효과가 갈린다. 추론성 판정(base로 향하는 것처럼 보이는 push
등)은 **경고·증거**로 강등하고, 정확히 식별되는 원격 변경·가드 무력화 명령
(`gh pr merge`, 훅 무력화)의 **kill은 유지**한다. 토크나이저가 해석하지 못한
입력은 통과가 아니라 옛 정규식 판정으로 fail-closed 폴백한다.

알려진 한계를 그대로 둔다: `git push --no-verify`는 훅을 건너뛴다. 그 구멍은
텍스트 가드의 `hook_bypass` kill이 덮고, 훅은 덮는 척하지 않는다.

## Considered Options

spec이 5개 대안을 검토해 모두 기각했다. 대표적으로 **GitHub branch
protection**은 로컬 push를 막지 못하고 원격 설정에 강제력을 의존시키며, **텍스트
가드 강화**는 추측 판정의 오판(위 실사고)을 구조적으로 없애지 못한다. 예방 없이
사후 감지만 두는 안은 base가 이미 움직인 뒤에야 알게 되어 기각했다.

## Consequences

- 쉬워지는 것: 명령 표기와 무관하게 판정이 정확하다. cross-repo `enclosed`
  push는 allowlist로 "봐주는" 것이 아니라 구조적으로 범위 밖이다.
- 어려워지는 것: attempt마다 훅 설치·제거라는 생애주기가 생기고, 훅 파일의 실행
  비트까지 계약의 일부가 된다.
- 배제되는 것: 추론만으로 세션을 죽이는 권한. 그런 판정은 이제 경고와 증거로만
  남는다.
