---
scope:
  - server/auto-pool-store.js
  - server/ws/auto-pool-handlers.js
  - server/routes/auto-pool.js
  - server/app.js
  - server/ws/connection.js
  - server/worker/state-paths.js
  - app/protocol.js
  - app/protocol.md
  - app/main.js
  - app/data/auto-pool-store.js
  - app/views/settings-dialog/auto-pool-section.js
  - app/views/settings-dialog/index.js
---

# auto 구현 리프 후보 설정 (UI-y7h1)

## 1. 목표

dotfiles의 jev `bind` 판정이 구현 모델·effort가 `auto`인 단위에서 고를 후보 모델과 effort 범위를
beads-ui가 서버 전역 설정으로 저장하고, 설정 창에서 고치게 하며, dotfiles가 읽는 HTTP API로 낸다.
판정 규칙과 보정 루프는 dotfiles 쪽 설계(dotfiles-ti4xa,
`docs/superpowers/specs/2026-11-11-auto-leaf-pool-setting-criteria-loop-design.md`)가 소유한다.

- 설정은 모든 저장소에 공통으로 하나다(사용자 결정 2026-11-11). 저장소별 값은 두지 않는다.
- 이 설정은 `auto`에만 쓰인다. 저장소·Bead의 모델·effort 직접 지정과 실행 프리셋은 바뀌지 않는다.

비목표: 판정 로직, 임계나 보정 결과 표시, 저장소별 후보, 여러 저장소 설정 창(bulk)의 편집.

## 2. 검증된 전제

기준 커밋 eff15530bf572a6d289724973c7c094c8d907e88 (dotfiles는 ef3e1e7b44cf1c015a79e6ba29eed73c6acd7f7d).

- 서버 전역 설정은 상태 폴더 `bdui/` 아래 파일로 둔다 — server/worker/state-paths.js:154
- 모델 표시 설정은 revision 충돌 검사와 거부 코드를 가진 엄격한 쓰기, 조용히 실패하는 읽기를 쓴다 — server/model-visibility-store.js:200, server/model-visibility-store.js:207
- 모델 표시 설정은 구독·set·snapshot WebSocket 채널로 화면에 닿는다 — app/protocol.js:674, server/ws/model-visibility-handlers.js:1
- 설정 창의 `프리셋·모델` 탭은 서버 전체 값을 고치는 탭이고 모델 표시 절이 거기 있다 — app/views/settings-dialog/index.js:60, app/views/settings-dialog/index.js:479
- 세션이 부르는 HTTP API는 `server/app.js`에 등록하고 tailnet 바인딩·토큰 없음 규칙을 쓴다 — server/app.js:217, server/routes/codex-switch-candidate.js:16
- beads-ui는 dotfiles 계약을 런타임에 읽지 않고 고정한 투영본을 쓴다 — server/worker/execution-defaults.js:159, docs/adr/README.md(UI-jlov)
- Codex 모델 선택지는 서버가 Codex CLI 목록에서 읽은 카탈로그이고 고정 이름을 판별한다 — docs/adr/README.md(UI-gpac), app/utils/execution-defaults.js:1
- 숨긴 모델은 고르는 목록에서만 빠지고 저장된 값은 계속 인식한다 — app/utils/model-visibility.js:1
- 새 조작은 디자인 시스템의 부품으로만 그린다 — AGENTS.md:50
- 서버 WebSocket 메시지 분기는 `server/ws/connection.js`의 switch이고, 클라이언트 snapshot 수신·구독 수명은 `app/main.js`가 맡는다 — server/ws/connection.js:581, app/main.js:394, app/main.js:1068
- `runtimeCatalog()`의 Claude 모델에는 `opus-4.8` 같은 고정 이름이, Codex effort에는 `minimal`이 있어 dotfiles 계약의 목록과 다르다 — server/worker/runner-catalog.js:93, server/worker/runner-catalog.js:106
- 고정 투영본의 `implementation.model_catalog`는 Claude `opus`·`fable`·`sonnet`·`haiku`와 Codex 계열 목록, `implementation.effort_catalog`는 Claude low~xhigh·Codex low~max다 — generated/contracts/execution-defaults.json
- Codex 고정 이름은 `<계열>-<버전>` 문법으로 판별한다 — server/worker/runner-catalog.js:207
- dotfiles는 Codex 이름 해석에 실패하면 대체 없이 그 실행을 실패로 끝낸다 — dotfiles docs/contracts/harness.yaml:74
- dotfiles 투영본에는 아직 후보 기본값 키가 없다 — `python3 -c "import json;print(list(json.load(open('generated/contracts/execution-defaults.json'))['implementation']))"`(dotfiles)

## 3. 설계

### 3.1 저장

서버 전역 상태 파일 하나에 런타임별 후보를 둔다(예: `$XDG_STATE_HOME/bdui/auto-pool.json`).

```json
{"revision": 3, "runtimes": {
  "codex": {"models": ["terra-6.1", "sol-6.1"], "effort": {"min": "high", "max": "xhigh"}}}}
```

- `runtimes`에는 사람이 정한 런타임만 있다. 빠진 런타임은 dotfiles의 출하 기본값을 따른다는 뜻이다.
- 파일이 없거나 깨졌으면 revision 0, 빈 `runtimes`로 읽는다.
- 쓰기는 문서 전체를 바꾸고 `expected_revision`이 현재와 같을 때만 성공한다. 거부되면 아무것도 쓰지 않는다.

### 3.2 쓰기 검증

| 거부 코드 | 조건 |
| --- | --- |
| `conflict` | `expected_revision`이 현재 revision과 다르다 |
| `invalid_auto_pool` | 모양이 다르다, 런타임이 claude·codex가 아니다, `models`가 2개를 넘거나 같은 이름이 겹친다 |
| `unknown_model` | Claude 이름이 투영본 `implementation.model_catalog.claude`에 없거나 `fable`이다. Codex 이름이 투영본 `implementation.model_catalog.codex.families`의 계열 별칭도, 그 계열의 `<계열>-<버전>` 고정 이름 문법도 아니다 |
| `invalid_effort_range` | `min`·`max`가 투영본 `implementation.effort_catalog.<runtime>`에 없다, `min`이 `max`보다 높다, `max`가 xhigh보다 높다 |

- 결정: 허용 이름과 effort 목록의 정본은 고정 투영본이다 — dotfiles가 같은 목록으로 판정하므로, `runtimeCatalog()`의
  목록(`opus-4.8`, `minimal` 등)으로 검증하면 저장에 성공한 값을 dotfiles가 무효로 보고 기본값으로 돌린다.
- Codex 이름이 계정 목록에 실제로 있는지는 검사하지 않는다. 실행 때의 해석이 정하고, 해석 실패는 dotfiles가
  대체 없이 실패로 끝낸다. 그래서 카탈로그를 아직 못 읽었어도 저장할 수 있다.
- `models`는 낮은 자리부터 0~2개다. 빈 목록은 "auto가 이 런타임을 고르지 않는다"는 유효한 값이다.
- 거부 응답은 현재 snapshot을 함께 실어 화면이 받아들이고 다시 시도하게 한다(모델 표시 설정과 같다).

### 3.3 읽기 API

`GET /api/auto-pool`은 저장된 값을 그대로 낸다.

```json
{"ok": true, "schema": 1, "revision": 3, "runtimes": {
  "codex": {"models": ["terra-6.1", "sol-6.1"], "effort": {"min": "high", "max": "xhigh"}}}}
```

- 결정: 두 저장소가 공유하는 것은 이 응답 모양과 투영본의 `implementation.auto_pool_defaults` 키뿐이다 —
  저장 파일과 화면 채널은 내부이고 dotfiles는 이 API만 읽는다.
- 응답에 기본값을 채워 넣지 않는다. 빠진 런타임을 기본값으로 메우는 일은 dotfiles가 한다.
- 다른 조회 API와 같은 규칙이다: tailnet 바인딩, 토큰 없음, CORS 없음. 상태를 바꾸지 않는다.

### 3.4 화면

설정 창 `프리셋·모델` 탭의 모델 표시 절 아래에 `auto 후보` 절을 둔다.

- 런타임마다 한 줄이다: `기본값 따르기` 전환, 낮은 자리 모델, 높은 자리 모델, effort 최소, effort 최대.
- `기본값 따르기`가 켜진 런타임은 그 줄의 선택이 잠기고, 투영본에 기본값 키
  `implementation.auto_pool_defaults`(모양은 API의 `runtimes`와 같음)가 있으면 그 런타임 값을 읽기 전용으로
  보여 준다. 키가 없으면 값 없이 "기본값(dotfiles가 정함)"만 적는다.
- 모델 선택지: Claude는 투영본 `model_catalog.claude`에서 `fable`과 숨긴 모델을 뺀 것, Codex는 투영본 계열
  별칭과 서버 카탈로그의 고정 이름 가운데 숨기지 않은 것이다. 지금 저장된 이름은 늘 선택지에 남고 `없음`을
  고를 수 있다. effort 선택지는 투영본 `effort_catalog.<runtime>`에서 xhigh까지다. 낮은 자리만 `없음`이면 후보가 하나, 둘 다 `없음`이면 빈 후보다.
- 빈 후보에는 "auto가 이 런타임을 고르지 않습니다", 후보 하나에는 "모델 실험 없이 이 모델만 씁니다"를
  그 줄 아래에 적는다.
- 절 머리에 "모델·effort가 auto인 구현 단위에만 쓰입니다. 직접 지정한 값은 그대로 이깁니다."를 둔다.
- 다른 창의 snapshot이 오면, 편집하지 않은 절은 즉시 새 값으로 바뀌고, 편집 중인 절은 초안과 편집을 시작할
  때의 revision을 유지한 채 "다른 곳에서 바뀌었습니다" 한 줄만 보인다. 그래서 그 상태의 저장은 `conflict`로
  거부된다.
- 저장은 문서 전체를 한 번에 보낸다. `conflict`면 받은 snapshot의 revision을 새 기준으로 삼고 사용자의
  편집은 초안에 남겨, 다시 저장하면 그 초안이 들어간다. 그 밖의 거부는 코드에 맞는 문장을 그 줄에 보이고 초안을 지키며 아무것도 쓰지 않는다.
- 화면 채널은 구독·구독 해제·set·snapshot 네 메시지다. 서버는 `server/ws/connection.js`의 메시지 분기에
  처리기를 잇고, 클라이언트는 `app/main.js`에서 서버 전역 채널로 한 번 구독하며(재연결 때 다시 구독,
  워크스페이스 전환에도 비우지 않음) snapshot을 store에 넣어 설정 창 절에 넘긴다. snapshot은 저장 상태와
  런타임별 선택지(모델, effort 목록, 투영본의 기본값)를 함께 싣는다.
- 새 부품을 만들지 않고 모델 표시 절이 쓰는 부품으로 그린다.

### 3.5 오류 처리

- 파일 읽기 실패는 미설정으로 읽는다. 쓰기 실패는 알림을 띄우고 초안을 지킨다.
- 저장된 뒤 서버 카탈로그에서 사라진 Codex 이름은 읽기에서 지우지 않고 저장도 막지 않는다. 화면이 그 이름
  옆에 "계정 목록에 없음"을 표시하고, 실행 때의 해석 실패는 dotfiles의 기존 규칙(대체 없이 실패)이 맡는다.
- 투영본에 `implementation.auto_pool_defaults` 키가 없으면 기본값 표시만 생략한다(형제 spec이 이 키를 만든다).

## 4. 수용 기준

- 설정 창에서 Codex 후보를 `terra-6.1`·`sol-6.1`, effort high~xhigh로 저장하면 `GET /api/auto-pool`이
  그 값을 내고, 서버를 재시작해도 같은 값을 낸다.
- 아무것도 저장하지 않은 서버의 `GET /api/auto-pool`은 revision 0과 빈 `runtimes`를 낸다.
- `기본값 따르기`를 켜고 저장하면 그 런타임이 응답의 `runtimes`에서 빠진다.
- 표의 네 거부 조건이 각각 그 코드로 거부되고 파일은 바뀌지 않는다. `opus-4.8`, effort `minimal`은
  `unknown_model`·`invalid_effort_range`로 거부되고, 계정 목록에 없는 문법상 올바른 Codex 고정 이름은 저장된다.
- 편집 중인 창은 다른 창의 저장 뒤에도 초안을 잃지 않는다.
- 두 창에서 연달아 저장하면 뒤의 저장이 `conflict`로 거부되고 편집 내용이 화면에 남는다.
- 한 창에서 저장하면 구독 중인 다른 창의 절이 새 값으로 바뀐다.
- `npm run tsc`, `npm run lint`, `npx vitest run --reporter=dot`, `npm run build`가 통과한다.

## 5. 테스트 범위

- server/auto-pool-store.test.js — 읽기 기본값, 검증 표의 각 줄, revision, 깨진 파일.
- server/ws/auto-pool-handlers.test.js — 구독 즉시 snapshot, set 성공 뒤 전체 구독자 push, 거부 응답.
- server/routes/auto-pool.test.js — 응답 모양, 미설정 응답.
- app/views/settings-dialog/auto-pool-section.test.js — 기본값 따르기, 없음 조합의 안내 문장, 충돌 뒤 초안 유지.

## 6. 경계·후속

| 종류(형제\|발견) | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles/dotfiles | user_request | 다른 저장소의 독립 착지 — 판정 규칙·보정 루프·출하 기본값은 dotfiles가 소유하고 따로 승인·실패·재개된다(independently_approvable_failable_resumable_external_effect) | 없음 | dotfiles-ti4xa |

- 관찰: 두 Bead는 서로 기다리지 않는다 — dotfiles는 API가 없으면 출하 기본값으로 판정하고, 이 설정은
  dotfiles가 읽기 전에도 저장된다. 둘 다 착지해야 화면에서 바꾼 값이 판정에 쓰인다.
- 관찰: 투영본의 기본값 키는 dotfiles-ti4xa가 착지하고 투영본을 다시 고정한 뒤에 화면에 보인다.

## 7. 결정 (ADR 후보)

- 전제: ADR UI-jlov — dotfiles 계약을 런타임에 읽지 않는다. 기본값은 고정한 투영본에서만 읽고 키가 없으면 표시를 생략한다.
- 전제: ADR UI-gpac — Codex 모델 이름은 서버가 읽은 Codex CLI 목록 카탈로그로 검증한다.
- 전제: ADR dotfiles/dotfiles-snhls — auto 구현 모델의 판정 규칙은 dotfiles가 소유한다(dotfiles-ti4xa가 대체 ADR을 낸다).
- auto 구현 리프의 후보 모델과 effort 범위는 beads-ui 서버 전역 설정이 정본이고 dotfiles는 `GET /api/auto-pool`로만 읽는다 — 되돌리기 어려움: 저장 파일·화면 채널·설정 절·읽기 API와 dotfiles의 설정 읽기 도구·판정 기록이 함께 움직인다. 맥락 없이 의외임: 실행 설정은 저장소별 kv인데 이 값만 서버 전역이고, dotfiles 판정이 beads-ui API에 의존한다. 실제 트레이드오프: 저장소별 kv에 두면 판정 자료가 저장소마다 쪼개지고 임계도 나눠야 해서 전역 하나를 골랐고, 대신 저장소별로 다른 후보는 못 쓴다. 새 주제: 가장 가까운 ADR은 UI-gpac(모델 카탈로그 원천)이지만 그쪽은 선택지의 원천이고 이쪽은 사람이 정한 판정 입력의 저장·공개라 소비자가 다르다. `summary`: "auto 구현 리프의 후보 모델과 effort 범위는 beads-ui 서버 전역 설정이 정본이고 저장소별 값 없이 dotfiles가 GET /api/auto-pool로만 읽으며, 빠진 런타임은 dotfiles 출하 기본값을 따른다" → ADR
- 거부 코드 이름과 절의 자리(`프리셋·모델` 탭) — 기본 제외 목록(이름·UI 배치) → ADR 아님
