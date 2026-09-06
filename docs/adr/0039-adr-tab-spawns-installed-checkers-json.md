---
id: 39
title: ADR 탭 신호는 설치본 체커를 runtime spawn해 --json으로 소비한다
status: accepted
date: 2026-09-06
summary: "ADR 탭 신호는 설치본 체커를 runtime spawn해 --json으로 소비하고 규칙을 JS로 복제하지 않으며 현재 표만 JS frontmatter 리더가 읽는다"
spec: docs/superpowers/specs/2026-09-05-adr-tab-live-observation-design.md
bead: UI-8uz7
---

# ADR 탭 신호는 설치본 체커를 runtime spawn해 --json으로 소비한다

## Context

ADR 탭(`#/adr`)은 워크스페이스별 저장소의 인덱스 drift·지침 인용 stale·후보
미실체화·교차 인용을 라이브로 그린다. 그 신호의 정의(R1·R5·R6)와 체커 `--json`
형식은 dotfiles 스펙 `docs/superpowers/specs/2026-09-02-adr-consistency-system-design.md`
§7이 소유하고, 체커 세 개 — `adr-index.py`·`adr-cite-check.py`·
`check-adr-candidates.py` — 는 dotfiles가 이 머신의 `$HOME/.claude/skills/` 아래에
설치한다. 이 저장소의 `repo-ops/script/verify`도 앞의 둘을 같은 경로로 이미 부른다.

beads-ui 서버가 같은 신호를 계산할 방법은 셋이었다.

- 체커 규칙을 JS로 재구현한다 — spawn이 없지만 규칙이 두 저장소에 이중 정의된다.
- `python3 -c`로 체커의 내부 함수를 import한다 — spawn은 남고 내부 함수명에
  결합한다.
- 설치본 체커를 그대로 spawn해 `--json` 출력을 소비한다.

ADR 0012는 계약 어휘를 코드의 registry로 복제해 소비하고 계약 파일을 런타임에
읽지 않는다고 정했다. 체커 spawn은 그것과 나란히 놓이면 의외로 보인다 — 다만 여기서
런타임에 읽는 것은 계약 파일이 아니라 **설치된 도구의 출력**이고, kind 어휘는 여전히
registry 상수(`server/adr/adr-registry.js`)로 복제해 소비한다.

## Decision

ADR 탭의 신호는 서버가 **설치본 체커를 runtime에 spawn해 `--json`으로 소비**한다.
체커 규칙은 JS로 복제하지 않는다. 현재 표·이력만 서버의 JS frontmatter 리더
(`server/adr/adr-frontmatter.js`)가 읽으며, 그 리더가 판정하는 것은 "표를 그릴 수
있는가"뿐이고 전체 검증의 정본은 `adr-index.py --check`의 exit이다.

- 모든 spawn은 비동기 warm 경로에서만 일어난다(ADR 0026). 저장소당 in-flight 하나,
  spawn 동시성 상한 4, 타임아웃 20초, `cwd`는 저장소 루트다.
- 체커 JSON의 kind 어휘는 registry 상수로 두고, 미지의 kind는 버리지 않고 `기타`로
  그린다(ADR 0012).
- 환경 오류(`python3` 부재·체커 파일 부재·exit 2·타임아웃·비JSON)는 체커별로 따로
  기록하고 그 체커의 결과만 비운다. 나머지 표·신호는 그대로 싣는다.

## Consequences

- 규칙이 바뀌면 dotfiles 설치본 갱신만으로 탭이 따라간다. 두 저장소가 같은 규칙을
  따로 들고 어긋날 여지가 없다.
- 이 서버는 `$HOME/.claude/skills/` 아래 python을 실행한다. 설치본이 없는 머신에서는
  신호 절이 `환경 · <체커>: <원인>` 한 줄로 대체되고 표만 남는다.
- 되돌리기 어렵다: 규칙 복제로 바꾸면 R1·R5·R6이 바뀔 때마다 두 저장소를 맞춰야
  한다. `adr-index.py`에 `--json` 덤프가 생기면 frontmatter 리더를 그 출력 소비로
  바꾸는 것은 이 결정 안의 국소 변경이다.
