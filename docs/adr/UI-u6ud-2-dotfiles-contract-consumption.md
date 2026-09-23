---
id: UI-u6ud-2
title: dotfiles 계약 소비와 ADR 탭 체커 소비
status: accepted
date: 2026-09-23
summary: "beads-ui는 dotfiles 계약을 런타임에 읽지 않고 필요한 subset만 코드 registry로 복제해 검증을 소유하며 계약 키 부재는 fail-quiet 표시 생략이다; ADR 탭 신호는 설치본 체커를 비동기로 spawn해 --json을 소비하고 규칙을 JS로 복제하지 않으며 JS 리더는 표를 그릴 수 있는지만 판정한다"
supersedes: [12, 39]
spec: docs/superpowers/specs/2026-09-23-adr-cleanup-history-dir-reader-and-consolidation-design.md
bead: UI-u6ud
---

# dotfiles 계약 소비와 ADR 탭 체커 소비

## Context

- `0012`: beads-ui는 dotfiles 계약을 런타임에 읽지 않고 필요한 subset을 코드 registry로 복제해 검증을 소유하며 계약 키 부재는 fail-quiet다.
- `0039`: ADR 탭 신호는 설치본 체커를 비동기 spawn해 `--json`을 소비하고 규칙을 JS로 복제하지 않는다.

## Decision

- beads-ui 서버는 dotfiles 계약 파일을 런타임에 읽지 않는다. 표시·편집에 필요한 subset(허용 키 목록, 값 enum, 영수증 정규식, route preset 조합)을 코드 안의 계약 축별 registry(`server/worker/exec-enums.js`, `server/workflow-enrich.js` 등)로 명시하고, 그 registry가 source mapping·허용값·formatter·편집 가능성·검증을 소유한다.
- 계약과의 동등성은 런타임 의존이 아니라 dotfiles 체커와 계약 파일을 직접 읽는 cross-runtime 테스트로 확인한다.
- 계약 키가 관측되지 않으면 표시를 생략(fail-quiet)하고 계약 쪽 정정은 별도로 제기한다. beads-ui는 소비자이며 정의자가 아니다.
- ADR 탭 신호는 서버가 설치본 체커를 runtime에 spawn해 `--json`으로 소비한다. 체커 규칙은 JS로 복제하지 않는다.
- 현재 표·이력만 JS frontmatter 리더(`server/adr/adr-frontmatter.js`)가 읽고, 그 리더는 "표를 그릴 수 있는가"만 판정한다. 전체 검증의 정본은 `adr-index.py --check`의 exit다.
- 모든 spawn은 비동기 warm 경로에서만 일어난다. 저장소당 in-flight 하나, spawn 동시성 상한 4, 타임아웃 20초, `cwd`는 저장소 루트다.
- 체커 JSON의 kind 어휘는 registry 상수로 두고, 미지의 kind는 버리지 않고 `기타`로 그린다.
- 환경 오류(`python3` 부재·체커 파일 부재·exit 2·타임아웃·비JSON)는 체커별로 기록하고 그 체커의 결과만 비우며 나머지 표·신호는 그대로 싣는다.

## Consequences

- 계약 소비 방식이 한 행으로 읽힌다. 되돌리려면 exec-enums·workflow-enrich registry, ADR 탭 spawn 경로, cross-runtime 테스트가 함께 움직인다.
- 흡수한 두 ADR의 조항은 전부 승계했고 폐기한 조항은 없다.
