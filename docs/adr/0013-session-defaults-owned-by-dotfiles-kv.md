---
id: 13
title: 세션 기본값의 source of truth를 dotfiles kv로 이관
status: accepted
date: 2026-08-16
summary: '워크스페이스 세션 기본값은 dotfiles가 소유한 bd kv workflow_session_defaults 하나이고 beads-ui workspace 레이어는 소유권을 반납했다'
spec: docs/superpowers/specs/2026-08-16-unified-settings-session-defaults-design.md
bead: UI-qeiz
---

# 세션 기본값의 source of truth를 dotfiles kv로 이관

## Context

2026-08-10 workspace default preset 설계는 실행 기본값(preset, runtime target)을
beads-ui의 workspace 레이어가 자기 저장소에 두고 해석하게 했다. 같은 값을
dotfiles 하네스도 자기 기준으로 해석했기 때문에, UI가 보여주는 기본값과 실제로
세션에 적용되는 기본값이 조용히 갈라졌다. 어느 쪽이 맞는지 사용자가 확인할
방법이 없었다. 2026-08-16 통합 설정 설계가 소유자를 하나로 정리했다.

## Decision

워크스페이스 전역 세션 기본값은 `bd kv`의 단일 키 `workflow_session_defaults`에
산다. 키 이름, schema 번호, 허용 키 목록, 키별 허용값, 부재·무효 처리 규칙은
모두 dotfiles 계약이 소유하고, beads-ui는 그 값을 읽고 쓰는 소비자다. beads-ui는
어휘를 넓히지 않으며 하네스 기본값을 자기 코드로 복제하지 않는다.

읽기는 fail-quiet다: 계약 밖의 키나 enum을 벗어난 값은 경고와 함께 버리고 레이어
전체를 실패시키지 않는다. 워크스페이스 기본값은 명시적 pin이 아니기 때문이다.
반대로 사용자가 명시적으로 편집하는 쓰기는 strict하게 거절한다.

허용 키 집합 자체도 계약이 소유한다. 설계 시점에는 9개였고 지금은 12개이며, 어느
키가 들어가는지(예: 워크스페이스 전역 사본이 금지된 dispatch 키의 제외)는
beads-ui가 아니라 계약이 정한다.

## Considered Options

- **beads-ui workspace 레이어 유지** — 기각. 같은 뜻의 값을 두 소유자가 각자
  기본값으로 해석하면, 화면에 보이는 것과 실제 실행되는 것이 다른 상태가
  구조적으로 남는다. 실제로 그 drift가 이 결정을 강제했다.
- **양쪽을 동기화하는 브리지** — 기각. 동기화는 소유자를 하나로 만들지 못하고,
  실패 시 어느 쪽이 진짜인지 판정할 근거도 만들지 못한다.

## Consequences

- 쉬워지는 것: 하나의 kv를 읽으면 UI와 하네스가 같은 값을 본다. 설정 문제의 조사
  지점이 한 곳이다.
- 어려워지는 것: beads-ui 단독으로 새 기본값 키를 늘릴 수 없다. 새 축이 필요하면
  계약 변경이 선행한다.
- 배제되는 것: beads-ui가 자기 기본값 어휘나 하네스 기본값 사본을 갖는 경로.
