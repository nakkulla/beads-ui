---
id: UI-gpac
title: Codex 모델 카탈로그의 원천은 Codex CLI 목록이다
status: accepted
date: 2026-10-12
summary: "beads-ui의 Codex 모델 선택지는 서버가 Codex CLI 목록(codex debug models)을 비동기로 읽어 dotfiles와 같은 규칙(계열별 최신 list·v2 → 별칭, 모든 적격 버전 → <계열>-<버전> 고정 이름)으로 만들고, 규칙은 JS로 복제해 dotfiles 해석기와 교차 테스트로 묶는다; 마지막 성공 목록을 영속해 읽기 실패가 카탈로그를 줄이지 않으며, effort·speed는 계열 템플릿을, 단가는 별칭이 해석된 고정 이름의 것을 상속하며, 목록에서 빠진 고정 이름의 저장값은 원문을 보존하고 실행은 기본값으로 대신한다"
spec: docs/superpowers/specs/2026-10-07-codex-model-list-from-cli-design.md
bead: UI-gpac
---

# Codex 모델 카탈로그의 원천은 Codex CLI 목록이다

## Context

beads-ui는 Codex 별칭 → 모델 ID 표(`sol` → `gpt-6-sol` 등)를 `runner-catalog.js`에 직접
들고 있었고, 핀 사본 일치 테스트로 dotfiles 표와 묶여 있었다. 실제 최신 sol은 이미
`gpt-6.1-sol`이라 표가 어긋나 있었고, 새 버전마다 손으로 고쳐야 했다. dotfiles는
dotfiles-c8eb9로 표를 없애고 Codex CLI 계정 목록에서 계열별 최신을 찾도록 바뀌었으며,
핀 사본의 `implementation.model_catalog.codex`는 `{families, resolve: codex_cli_latest_v2}`
모양이 되었다(정본: dotfiles `docs/contracts/harness.yaml`, 해석기
`src/shared/skills/flow/workflow/scripts/codex-models.py`).

가장 가까운 현행 ADR은 UI-u6ud-2(dotfiles 계약 파일은 런타임에 읽지 않고 핀 사본으로
소비)지만, 그것은 계약 파일 소비를 정할 뿐 외부 CLI 목록을 카탈로그 원천으로 쓰는 일은
다루지 않는다. 이 결정은 그 전제를 따르는 새 주제다. 2026-09-23 UI-vui5 스펙의 사용자
결정 "runner catalog는 자체 표를 유지하고 일치 테스트로 드리프트를 잡는다"는 이 결정이
대체한다(사용자 결정 2026-10-07).

## Decision

**Codex 모델 선택지는 서버가 Codex CLI 목록(`codex debug models`)을 비동기로 읽어
dotfiles와 같은 규칙으로 만든다. 규칙은 JS로 복제하고 dotfiles 해석기와 교차 테스트로
묶는다.**

- **읽기.** `server/worker/codex-model-list.js`가 기본 홈(`CODEX_HOME` 또는 `~/.codex`)에서
  `codex debug models`를 비동기로 실행한다. 시점은 서버 시작 때 한 번과 그 뒤 주기
  갱신이며, 주기의 현재 기본값은 `CODEX_MODEL_LIST_REFRESH_MS`(한 시간)다. 디스패치마다
  해석하지 않는다.
- **규칙.** 적격 = slug `gpt-<버전>-<계열>` + `visibility == list` +
  `multi_agent_version == v2`. 별칭은 계열의 최고 버전(끝의 0을 뺀 정수열 비교), 최고
  버전이 둘 이상이거나 slug가 중복이면 모호다. 모든 적격 버전에 `<계열>-<버전>` 고정
  이름을 준다. 계열 목록은 핀 사본의 `model_catalog.codex.families`에서 읽는다. 동등성은
  고정 픽스처 기대값 표와, 설치본 해석기가 있을 때만 도는 교차 테스트가 확인한다.
- **영속과 실패.** 마지막 성공 목록과 실제로 쓴 별칭 표를 상태 파일
  (`$XDG_STATE_HOME/bdui/codex-models.json`)에 남긴다. 읽기 실패는 그 목록을 계속 쓰고,
  한 번도 성공하지 못했으면 내장 seed 표를 쓴다. 별칭이 모호하거나 계열이 없으면 그
  별칭만 직전 성공 해석을 유지하고, 고정 이름 오류는 그 이름만 뺀다. Worker는 설정과
  CLI 없이도 기동한다.
- **카탈로그 조립.** 내장 표는 ID 없이 계열 템플릿(effort·orchestration effort·speed)만
  들고, 별칭과 그 계열의 모든 고정 이름이 같은 템플릿을 상속한다. 카탈로그는 동기
  getter로 남고 목록이 바뀌면 교체되며, 교체는 모니터·설정 스냅샷 푸시를 한 번 낸다.
  `config.toml [runner]` 덮어쓰기는 이름별로 합치되, 목록에 없는 Codex 고정 이름은 명시
  `id`가 있을 때만 카탈로그에 들어간다.
- **단가.** 찾는 순서는 그 이름에 적힌 단가 → 별칭이면 해석된 고정 이름의 단가 → 같은
  ID 항목 중 단가가 있는 항목이다. 서버는 사용자 `config.toml`을 쓰지 않는다.
- **목록에서 빠진 고정 이름.** 저장된 실행 설정의 값이 Codex 고정 이름 문법에 맞으면
  카탈로그에 없어도 원문을 보존하고, 같은 값을 다시 적는 쓰기도 받는다. 디스패치는 그
  값과 같은 층의 effort·speed를 쓰지 않고 기본값으로 대신한다. 알 수 없는 모델은 띄우지
  않는다.
- **핀 소비.** 새 핀 모양의 `families`·`resolve`는 모델 토큰이 아니다. 리뷰어 프리셋과
  기본 모델 ID는 런타임 카탈로그로 푼다.

기각한 대안: 정적 표 유지 + 손 갱신(이미 어긋나 있고 dotfiles가 없앤 부담을 되살림),
설치된 dotfiles 해석기 spawn(규칙 소유는 하나가 되지만 Worker가 dotfiles 설치·python3에
기댐 — 사용자 결정 2026-10-07).

## Consequences

- 새 Codex 버전은 코드 변경 없이 다음 목록 갱신에서 별칭과 고정 이름으로 나타난다.
- dotfiles가 해석 규칙을 바꾸면 이 저장소의 JS 복제와 교차 테스트도 함께 고쳐야 한다.
- 되돌리려면 `codex-model-list.js`, `runner-catalog.js` 계열 템플릿, `runner/index.js`
  카탈로그 교체, `usage-pricing.js` 단가 순서, `queue-store.js`·`exec-preset-coordinator.js`의
  목록 밖 값 처리, 핀 소비자(`attempt-facts.js`·`execution-defaults.js`·
  `app/utils/execution-defaults.js`), 설정 화면 안내가 함께 움직인다.
- 계정별 Codex 목록 차이는 다루지 않는다. 기본 홈 하나의 목록을 모든 계정에 쓴다.
