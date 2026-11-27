---
id: 'UI-h0hwo'
title: 'Codex·agy 모델 카탈로그의 원천은 CLI 목록이다'
date: '2026-11-28'
summary: 'beads-ui의 Codex 모델 선택지는 서버가 Codex CLI 목록(codex debug models)을 비동기로 읽어 dotfiles와 같은 규칙(계열별 최신 list·v2 → 별칭, 모든 적격 버전 → <계열>-<버전> 고정 이름)으로 만들고, 규칙은 JS로 복제해 dotfiles 해석기와 교차 테스트로 묶는다; 마지막 성공 목록을 영속해 읽기 실패가 카탈로그를 줄이지 않으며, effort·speed는 계열 템플릿을, 단가는 별칭이 해석된 고정 이름의 것을 상속하며, 목록에서 빠진 고정 이름의 저장값은 원문을 보존하고 실행은 기본값으로 대신한다 — agy 모델 선택지도 서버가 agy models 목록을 읽어 보관한 것이고 보관값은 읽을 때의 활성 계정에 묶여 계정이 바뀌면 버리며, 세션 모델은 id 그대로, 워크플로우 모델은 계열과 노력으로 나눠 저장한다'
status: 'accepted'
spec: 'docs/superpowers/specs/2026-11-26-agy-runtime-design.md'
bead: 'UI-h0hwo'
supersedes: ['UI-gpac']
---

# Codex·agy 모델 카탈로그의 원천은 CLI 목록이다

## Status

Accepted (spec `docs/superpowers/specs/2026-11-26-agy-runtime-design.md`)

## Context

beads-ui는 Codex 모델 선택지를 Codex CLI 목록에서 만든다(ADR UI-gpac). 사용자가 2026-11-26에
`agy`(Antigravity CLI)를 세 번째 실행 런타임으로 들이기로 했고(스펙
`docs/superpowers/specs/2026-11-26-agy-runtime-design.md`), agy 모델 선택지의 원천을 정해야 했다.
`agy models`는 `<id>\t<이름>` 줄을 내고 노력 수준이 id에 붙어 있다(`gemini-4-neon-high` 등).

이 결정은 UI-gpac와 소비자 집합(모델 목록 모듈, `runner-catalog.js`의 카탈로그 조립, 모델 보이기
설정, 프리셋, 자동 풀, dotfiles 선택기의 id 풀이)을 공유하므로 새 주제가 아니라 UI-gpac를 대체하는
재진술이다. UI-gpac의 조항은 아래 Codex 절에 그대로 승계한다.

Claude 모델은 고정 목록인데 agy는 CLI 목록이고 노력 선택지가 따로 없다 — 노력이 id 형식에 들어 있기
때문이다. 고정 목록을 코드에 두는 대안이 있었고 사용자가 "실제로 열린 목록"을 골랐다.

## Decision

**Codex와 agy의 모델 선택지는 서버가 각 CLI 목록을 비동기로 읽어 만든다.**

### Codex (UI-gpac 승계)

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

### agy

- **읽기와 보관.** `server/worker/agy-model-list.js`가 서버 시작 때와 그 뒤 주기
  갱신(현재 기본값 `AGY_MODEL_LIST_REFRESH_MS`, 한 시간)에 launcher로 `agy models`를 읽어
  상태 파일(`$XDG_STATE_HOME/bdui/agy-models.json`)에 보관한다. 읽기 실패는 마지막 목록을
  유지한다. 목록이 한 번도 없으면 agy 모델 선택지는 비고 agy 실행은 거부된다.
- **계정에 묶음.** 보관값은 읽을 때의 활성 agy 자격에 묶인다. 계정 이름을 읽을 수단이
  없는 동안에는 자격 파일들의 지문(경로·크기·수정 시각, 내용은 읽지 않음)으로 묶는다.
  지문이 바뀌거나 로그인·전환이 성공하면 모델 목록·사용량 보관값과 이전 지문으로 시작한
  조회 결과를 버리고, 새 목록이 올 때까지 agy 실행을 띄우지 않는다.
- **세션 모델과 워크플로우 모델.** 세션 모델(Worker 총괄 실행, 대화 창)은 `agy models`의
  id 그대로이고 노력 선택지를 따로 두지 않는다. 워크플로우 모델(`impl_model`·
  `quick_fix_impl_model`과 `impl_effort`)은 dotfiles 계약 모양으로 id
  `gemini-4-<계열>-<노력>`을 계열과 노력으로 나눠 저장하고 읽을 때 다시 합친다.
- **카탈로그 분리.** 선택지·프리셋·저장 경로가 읽는 카탈로그와 실행 경로가 읽는 카탈로그를
  나눠, agy 모델이 실행 경로에 있어도 화면 선택지와 저장 경로는 그것을 열 때까지 내지 않는다.

기각한 대안: 정적 표 유지 + 손 갱신(이미 어긋나 있고 dotfiles가 없앤 부담을 되살림),
설치된 dotfiles 해석기 spawn(규칙 소유는 하나가 되지만 Worker가 dotfiles 설치·python3에
기댐 — 사용자 결정 2026-10-07), agy 모델을 코드의 고정 목록으로 두는 안(사용자가 실제로
열린 목록을 고름 — 2026-11-26).

## Consequences

- 새 Codex 버전·agy 모델은 코드 변경 없이 다음 목록 갱신에서 나타난다.
- dotfiles가 Codex 해석 규칙이나 agy 계열·노력 모양을 바꾸면 이 저장소의 JS 복제와 테스트도 함께 고쳐야 한다.
- 되돌리려면 `codex-model-list.js`·`agy-model-list.js`, `runner-catalog.js` 계열 템플릿과
  카탈로그 분리, `runner/index.js` 카탈로그 교체, `usage-pricing.js` 단가 순서,
  `queue-store.js`·`exec-preset-coordinator.js`의 목록 밖 값 처리, 스케줄러의 agy 실행 전 확인,
  핀 소비자(`attempt-facts.js`·`execution-defaults.js`·`app/utils/execution-defaults.js`),
  설정 화면 안내가 함께 움직인다.
- 계정별 Codex 목록 차이는 다루지 않는다. 기본 홈 하나의 목록을 모든 계정에 쓴다.
- 자격 지문은 토큰 갱신에도 바뀌므로 그때 목록을 한 번 더 읽는 일이 생긴다.
