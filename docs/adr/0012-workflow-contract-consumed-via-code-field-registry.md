---
id: 12
title: 워크플로 계약은 코드 내 field registry로 복제해 소비한다
status: accepted
date: 2026-05-05
summary: 'beads-ui는 dotfiles 계약 파일을 런타임에 읽지 않고 필요한 subset만 코드의 field registry로 복제한 소비자다'
spec: docs/superpowers/specs/2026-05-05-detail-workflow-config-design.md
---

# 워크플로 계약은 코드 내 field registry로 복제해 소비한다

## Context

workflow 계약 — 라벨 어휘, durable metadata 키, 각 키의 허용값, 리뷰 영수증
형식, 세션 기본값 키 목록 — 의 canonical 정의는 dotfiles가 소유한다. beads-ui는
Detail·Board·Worker 화면에서 그 값을 표시하고 일부를 편집한다. 2026-05-05 Detail
설계가 "그 계약을 어떻게 참조할 것인가"를 정해야 했다. 후보는 둘이었다:
dotfiles의 계약 파일을 서버가 런타임에 읽거나, 필요한 부분만 beads-ui 코드에
명시하거나.

## Decision

beads-ui 서버는 dotfiles 계약 파일을 런타임에 읽지 않는다. 표시와 편집에 필요한
subset — 허용 키 목록, 값 enum, 영수증 정규식, route preset 조합 — 을 코드 안의
registry로 명시하고, 그 registry가 source mapping·허용값·formatter·편집
가능성·검증을 소유한다. 사용자 config 파일은 표시 allowlist만 담당한다.

계약과의 동등성은 런타임 의존이 아니라 dotfiles 체커와 계약 파일을 직접 읽는
cross-runtime 테스트로 확인한다. 계약 키가 관측되지 않으면 표시를
생략(fail-quiet)하고, 계약 쪽 정정은 별도로 제기한다. beads-ui는 소비자이며
정의자가 아니다.

## Considered Options

- **dotfiles 계약 yaml을 런타임에 직접 읽기** — 기각. 서버가 dotfiles 체크아웃의
  존재·경로·파싱 가능성에 의존하게 되고, 계약 파일이 없거나 깨진 환경에서는 UI
  자체가 뜨지 않는다. 게다가 표시에 필요한 것은 계약 전체가 아니라 좁은
  subset이라, 의존의 크기와 얻는 것이 맞지 않는다.
- **Raw metadata JSON 편집기** — 기각. 계약을 코드가 모르게 하는 대신 검증도
  함께 포기하게 된다.

## Consequences

- 쉬워지는 것: 서버가 dotfiles 없이 뜬다. 계약 파싱 실패가 UI 장애로 번지지
  않고, 허용값 검증을 서버가 직접 할 수 있다.
- 어려워지는 것: 계약 표면이 바뀌면 두 저장소를 함께 고쳐야 한다. beads-ui
  코드만 고치는 변경은 금지이며, drift는 사람이 아니라 테스트가 잡아야 한다.
- 배제되는 것: beads-ui가 계약을 정의하거나 확장하는 경로.
