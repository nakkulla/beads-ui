---
id: UI-jlov
title: dotfiles 계약 소비와 설치본 체커 소비
status: accepted
date: 2026-11-11
summary: "beads-ui는 dotfiles 계약을 런타임에 읽지 않고 필요한 subset만 코드 registry로 복제하며 계약 키 부재는 fail-quiet 표시 생략이다; ADR 탭 신호와 Worker 착지 알림의 보호 경로 표시는 설치본 체커를 비동기로 spawn해 --json을 소비하고 규칙을 JS로 복제하지 않으며, 보호 경로 판정 실패는 생략하지 않고 확인 못 함으로 적는다"
supersedes: ["UI-u6ud-2"]
spec: docs/superpowers/specs/2026-11-10-self-improvement-auto-landing-notice-design.md
bead: UI-jlov
---

# dotfiles 계약 소비와 설치본 체커 소비

## Status

Accepted (스펙 `docs/superpowers/specs/2026-11-10-self-improvement-auto-landing-notice-design.md`, Bead `UI-jlov`).

## Context

- `UI-u6ud-2`: beads-ui는 dotfiles 계약을 런타임에 읽지 않고 필요한 subset을 코드 registry로 복제해 검증을 소유하며 계약 키 부재는 fail-quiet다. ADR 탭 신호는 설치본 체커를 비동기 spawn해 `--json`을 소비하고 규칙을 JS로 복제하지 않는다.
- dotfiles 자기개선 루프가 사람 확인 없이 만든 수정 Bead(`self_improvement_tier=auto`)가 Worker quick_fix로 착지할 때, 사용자는 착지를 막지 않고 알림으로 알기로 했다(2026-11-10). 알림은 바뀐 경로가 보호 경로에 닿는지를 실어야 하는데, 보호 목록과 접두사 규칙은 dotfiles 계약(`workflow-state.yaml`)이 소유한다.
- 고른 길은 셋이었다: 계약 YAML 직접 읽기(UI-u6ud-2와 충돌), 핀 사본(목록이 바뀔 때마다 재핀이 필요해 어긋난다), 설치본 체커 실행. 체커 실행을 골랐다.

## Decision

- beads-ui 서버는 dotfiles 계약 파일을 런타임에 읽지 않는다. 표시·편집에 필요한 subset(허용 키 목록, 값 enum, 영수증 정규식, route preset 조합)을 코드 안의 계약 축별 registry(`server/worker/exec-enums.js`, `server/workflow-enrich.js` 등)로 명시하고, 그 registry가 source mapping·허용값·formatter·편집 가능성·검증을 소유한다.
- 계약과의 동등성은 런타임 의존이 아니라 dotfiles 체커와 계약 파일을 직접 읽는 cross-runtime 테스트로 확인한다.
- 계약 키가 관측되지 않으면 표시를 생략(fail-quiet)하고 계약 쪽 정정은 별도로 제기한다. beads-ui는 소비자이며 정의자가 아니다.
- 설치본 체커를 runtime에 spawn해 `--json`으로 소비하는 소비자는 둘이다: ADR 탭 신호와 Worker 착지 알림의 보호 경로 표시. 체커 규칙은 JS로 복제하지 않는다.
- 현재 표·이력만 JS frontmatter 리더(`server/adr/adr-frontmatter.js`)가 읽고, 그 리더는 "표를 그릴 수 있는가"만 판정한다. 전체 검증의 정본은 `adr-index.py --check`의 exit다.
- ADR 탭의 spawn은 비동기 warm 경로에서만 일어나고, 저장소당 in-flight 하나와 spawn 동시성 상한을 두며 `cwd`는 저장소 루트다(상한·타임아웃 값의 정본은 `server/adr/adr-signals.js` 상수).
- Worker 착지 알림의 보호 경로 판정은 `self_improvement_tier=auto` Bead가 바뀐 채 착지할 때 착지당 한 번, 설치본 dotfiles `check-protected-paths.py`를 비동기 spawn한다. ADR 탭의 warm 경로 제한에 세지 않고, `cwd`는 Worker 저장소 루트이며 타임아웃 값의 정본은 `server/worker/protected-paths.js` 상수다. close·배포 같은 착지 결과는 판정에 기대지 않는다.
- 보호 경로 판정 실패(범위 미상·git 오류·체커 부재·비정상 exit·타임아웃·비JSON)는 줄을 생략하지 않고 `보호 경로: 확인 못 함 (<사유>)`로 적는다. 생략하면 "보호 경로 없음"과 구별되지 않기 때문이고, 이것은 계약 키 부재 fail-quiet 원칙의 예외다.
- 체커 JSON의 kind 어휘는 registry 상수로 두고, 미지의 kind는 버리지 않고 `기타`로 그린다.
- ADR 탭의 환경 오류(`python3` 부재·체커 파일 부재·exit 2·타임아웃·비JSON)는 체커별로 기록하고 그 체커의 결과만 비우며 나머지 표·신호는 그대로 싣는다.

## Consequences

- 계약 소비 방식이 한 행으로 읽힌다. 되돌리려면 exec-enums·workflow-enrich registry, ADR 탭 spawn 경로, Worker 착지 알림 경로(`server/worker/quickfix-landing.js`·`server/worker/protected-paths.js`), cross-runtime 테스트가 함께 움직인다.
- dotfiles `check-protected-paths.py`의 인자·stdin·JSON 모양이 바뀌면 beads-ui 착지 알림 경로가 함께 움직인다. 체커가 아직 설치되지 않은 동안 auto 착지 알림은 `확인 못 함 (checker_missing)`으로 나간다.
- UI-u6ud-2의 조항은 전부 승계했고 폐기한 조항은 없다. 바뀐 것은 spawn 소비자에 Worker 착지 알림이 더해진 것과 그 판정 실패를 `확인 못 함`으로 적는 것이다.
