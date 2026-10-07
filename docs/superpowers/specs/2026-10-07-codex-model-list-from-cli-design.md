---
scope:
  - generated/contracts/execution-defaults.json
  - generated/contracts/execution-defaults.provenance.json
  - server/worker/runner-catalog.js
  - server/worker/codex-model-list.js
  - server/worker/runner/index.js
  - server/worker/runner/codex.js
  - server/worker/execution-defaults.js
  - server/worker/attempt-facts.js
  - server/worker/runner/preamble.js
  - server/worker/usage-pricing.js
  - server/model-visibility-store.js
  - server/worker/queue-store.js
  - server/ws/monitor-handlers.js
  - server/index.js
  - app/utils/execution-defaults.js
  - app/views/settings-dialog/
---

# Codex 모델 선택지를 Codex CLI 목록에서 만든다 (UI-gpac)

Bead: UI-gpac. 선행: dotfiles-c8eb9(착지 `34ba55bbe0c1ff6764a02997d41721fd3b7d123b`,
스펙 dotfiles `docs/superpowers/specs/2026-10-02-codex-model-alias-auto-resolution-design.md`).
기준 base: beads-ui `996e28ad36f1a4d7b64625fefabd6000350a354c`, dotfiles origin/main
`f301fd04ff31433cbf500ea196cb45730284fdc4`.

## 1. 목표

beads-ui는 Codex 모델 이름표(`sol` → `gpt-6-sol` 등)를 코드에 직접 들고 있다. 실제
최신 sol은 이미 `gpt-6.1-sol`이라 지금도 어긋나 있고, 새 버전이 나올 때마다 손으로
고쳐야 한다. dotfiles는 표를 없애고 Codex CLI 목록에서 계열별 최신을 찾도록 바뀌었다.

이 스펙 이후 Worker와 설정 화면의 Codex 선택지는 dotfiles와 **같은 규칙**으로 Codex
CLI 목록에서 만들어진다:

- 별칭(`astra`·`sol`·`terra`·`luna`)은 계열의 최신 버전을 따라간다.
- 모든 적격 버전에 고정 이름(`sol-6.1`·`sol-6`·`sol-5.6` 등)이 생긴다.
- 단가는 고정 이름에 붙고 별칭은 가리키는 버전의 단가를 따른다.
- 설정 화면에는 별칭만 기본으로 보이고, 고정 이름은 사용자가 켤 때 보인다.

2026-09-23 UI-vui5 스펙의 사용자 결정 "runner catalog는 자체 표를 유지하고 일치
테스트로 드리프트를 잡는다"는 이 스펙이 대체한다(사용자 결정 2026-10-07).

## 2. 검증된 전제

**dotfiles(착지 결과)**
- 하네스의 Codex 카탈로그는 표가 아니라 `{families:[astra,sol,terra,luna], resolve: codex_cli_latest_v2}`이고 `model_catalog_fallback`은 없다 — dotfiles `docs/contracts/harness.yaml:77-79`; 투영 `generated/contracts/execution-defaults.json` blob `029ea23b5553f05edc14530ec5a433aed1b370f5`(`git rev-parse origin/main:generated/contracts/execution-defaults.json`)
- 해석 규칙: 적격 = slug `gpt-<버전>-<계열>` + `visibility == list` + `multi_agent_version == v2`; 별칭은 계열의 최고 버전(버전 비교는 끝의 0을 뺀 정수열, `6 == 6.0`); 최고 버전이 둘 이상이거나 같은 slug가 중복이면 `codex_models_ambiguous`; 모든 적격 버전에 `<계열>-<버전>` 이름 — dotfiles `src/shared/skills/flow/workflow/scripts/codex-models.py:27-28`, `:43-114`
- 해석기는 캐시 없이 `codex debug models`를 부르고 timeout은 120초다 — 같은 파일 `:30`, `:147-160`; 설치본은 `~/.claude/skills/workflow/scripts/codex-models.py`
- 2026-10-07 실측(codex-cli 0.160.0, `codex-models.py list`): 별칭 astra → `gpt-6-astra`, sol → `gpt-6.1-sol`, terra → `gpt-5.6-terra`, luna → `gpt-6-luna`; 고정 이름 `astra-6`·`luna-6`·`sol-5.6`·`sol-6`·`sol-6.1`·`terra-5.6`; `gpt-5.6-luna`는 v1이라 이름이 없다

**beads-ui 현재 동작**
- 내장 Codex 표는 별칭마다 고정 ID와 손으로 고른 effort·speed 목록을 갖고, `sol.id`는 `gpt-6-sol`이다 — `server/worker/runner-catalog.js:90-158`(`:107`); effort 목록은 손으로 고른 것이다 — `:71`; 가격 필드는 내장 기본값이 없어 부재가 "미상"이다 — `:28-29`; 모델 이름은 러너를 넘어 전역 유일하다 — `:17-21`
- 카탈로그는 내장 표와 `config.toml [runner]` 덮어쓰기를 동기·순수 함수로 합치고 프로세스 수명 동안 캐시한다 — `server/worker/runner-catalog.js:506`, `server/worker/runner/index.js:48`
- 핀 사본은 옛 모양(별칭 → ID 표)이고 provenance는 dotfiles `6115f058…`다 — `generated/contracts/execution-defaults.provenance.json`; 핀 갱신 절차는 수동(바이트 그대로 쓰고 blob·sha256·bytes 기록)이다 — `docs/superpowers/specs/2026-09-23-codex-sol-alias-consumer-alignment-design.md` §3.1
- 핀 일치 테스트가 옛 모양에 묶여 재핀하면 깨진다: 별칭 ID 대조 — `server/worker/runner-catalog.test.js:16-24`; fallback 대조 — `:61-75`; 실핀 표시값 단언 — `app/utils/execution-defaults.test.js:99-141`
- 새 모양을 그대로 읽으면 오동작하는 소비자: `runtimeModelTokens`가 `Object.keys`로 `families`·`resolve`를 모델 토큰으로 읽는다 — `app/utils/execution-defaults.js:253-257`; 리뷰어 프리셋 해석이 카탈로그 없이 `catalogModelId`를 불러 별칭을 그대로 낸다 — `server/worker/attempt-facts.js:256-259`; `sessionFacts`의 기본 모델 ID — `server/worker/execution-defaults.js:102-125`
- 같은 재핀이 dotfiles-p54ec의 `effort_by_transport.claude-native-agent` 어휘 변경(`agent-type`)을 함께 가져오는데, 클라이언트의 알려진 transport effort 집합에 그 값이 없다 — `app/utils/execution-defaults.js:97`
- Codex 실행은 카탈로그에 없는 이름을 그대로 `-m`으로 넘긴다 — `server/worker/runner/codex.js:126-134`
- 단가는 이름으로 찾고, 없으면 같은 ID의 **첫** 항목에서 찾는다 — `server/worker/usage-pricing.js:73-103`; 사용자 `~/.config/bdui/config.toml`에는 `sol`·`astra`·`terra`·`luna`·`luna-5.6`의 `.price` 절이 있고 고정 이름 절은 없다(2026-10-07 `grep -n price`)
- 모델 활성은 서버 전역 꺼 둔 목록이고 기본값은 `opus-4.8`·`opus-4.6`·`sol-5.6`·`terra`·`luna-5.6`이다 — `server/model-visibility-store.js:33-42`; 카탈로그에 없는 이름은 투영에서 빠지고 다음 쓰기에서 사라진다 — `:87-90`
- 저장된 실행 설정의 모델 검증은 카탈로그에서 만든 허용값이고, 카탈로그에 없는 저장값은 읽을 때 `null`이 되어 디스패치가 기본값으로 대신한다(알 수 없는 모델을 띄우지 않으려는 의도) — `server/worker/queue-store.js:5121-5134`
- 모델 활성 상태 파일은 `revision`과 `disabled_models`만 담는다 — `server/model-visibility-store.js:13-14`, `:55`, `:67-70`; ADR UI-ooc0는 "저장은 꺼 둔 모델 목록이라 새로 추가되는 모델은 자동으로 보인다"고 정한다 — `docs/adr/UI-ooc0-model-visibility-disabled-list.md:41`
- 설정 화면 선택지는 서버가 장식한 `runner_catalog` 스냅샷에서 온다 — `server/ws/monitor-handlers.js:970-982`, `app/views/settings-dialog/`
- 계정별 `CODEX_HOME` 미러는 `models_cache.json`·`config.toml`을 `~/.codex`로 심링크한다 — `server/worker/codex-account-home.js` `prepareCodexAccountHome`(2026-10-07 `ls -la ~/.local/state/bdui/codex-homes/*/`)
- 미확인: 계정마다 `codex debug models` 결과가 다른지 — 캐시 파일을 공유하므로 기본 홈 하나로 읽는다
- 미확인: launchd 서버의 PATH에서 `codex`가 해석되는지 — Worker가 이미 `codex`를 spawn하므로 된다고 보지만 직접 확인하지 않았다

## 3. 설계

### 3.1 목록 읽기 (새 모듈, 예: `server/worker/codex-model-list.js`)

- 결정: 서버가 `codex debug models`를 **비동기**로 실행해(`execFile`, timeout 120초)
  `{models:[…]}`를 읽는다. 기본 홈(`CODEX_HOME` 또는 `~/.codex`)에서 한 번 읽는다.
- 결정: 시점은 서버 시작 때 한 번, 그 뒤 한 시간마다(대안: 디스패치마다 해석. 이유:
  모든 Worker 기동에 지연과 실패 경로가 붙고, 새 모델 출시를 한 시간 늦게 반영해도
  손해가 작다).
- 결정: 마지막으로 성공한 목록을 상태 파일(예: `~/.local/state/bdui/codex-models.json`,
  읽은 시각·codex 버전 포함)에 남긴다. 읽기가 실패하면 그 목록을 계속 쓴다 — 일시
  실패가 카탈로그를 줄여 저장된 설정을 지우지 않게 한다.
- 성공 목록이 한 번도 없으면 내장 seed(현재 별칭 → ID 표, `sol`은 `gpt-6.1-sol`로
  갱신)를 쓴다. Worker는 설정 없이도 기동한다는 원칙(`runner-catalog.js:6-7`)을 지킨다.

### 3.2 해석 규칙 (JS 복제)

- 결정: dotfiles 해석 규칙을 JS로 구현한다(대안: 설치된 `codex-models.py`를 spawn.
  이유: Worker 경로가 dotfiles 설치·python3에 기대지 않는다 — 사용자 결정
  2026-10-07). 규칙은 §2 dotfiles 전제 그대로다. 계열 목록은 핀 사본의
  `model_catalog.codex.families`에서 읽는다.
- 별칭이 `ambiguous`·`family_unavailable`이면 그 별칭만 직전 성공 해석(없으면 seed)을
  유지하고 서버 로그에 남긴다. 고정 이름 오류는 그 이름만 뺀다.
- 결정: 같은 입력으로 dotfiles 해석기와 같은 표를 내는지 교차 테스트로 묶는다.
  설치본이 있을 때만 도는 개발자용 테스트(선례:
  `server/worker/quick-fix-handoff.cross-runtime.test.js`)와, 고정 픽스처(동률·중복·v1·
  hide·`6 == 6.0`)에 대한 기대값 표를 둔다.

### 3.3 카탈로그 조립

- 결정: 내장 표는 ID를 들지 않고 **계열 템플릿**(effort·orchestration effort·speed)만
  든다. 별칭과 그 계열의 모든 고정 이름이 같은 템플릿을 상속한다(지금의
  `sol-5.6`이 `sol` 능력과 같다는 테스트 의미를 유지).
- `config.toml [runner]` 덮어쓰기는 지금처럼 이름별로 합쳐진다. 사용자가 정의한 이름
  (예: `luna-5.6`, `id = "gpt-5.6-luna"`)은 목록에 없어도 그대로 남는다.
- 결정: 카탈로그 캐시는 목록이 바뀔 때 교체되는 동기 getter로 남는다(소비자는
  지금처럼 동기로 읽는다). 교체되면 모니터·설정 스냅샷 푸시가 한 번 일어난다.
- 실행(`resolveModelId`)이 카탈로그에 없는 이름을 그대로 넘기는 동작은 바꾸지 않는다.
- 결정: 정상 목록에서 고정 이름이 빠져도(예: `sol-6`) 그 이름을 가리키는 저장된 실행
  설정의 **원문은 지우지 않는다**. 읽을 때 Codex 고정 이름 문법(`<계열>-<버전>`)에
  맞는 값은 카탈로그에 없어도 보존하고, 디스패치는 지금처럼 그 값을 쓰지 않고 기본값으로
  대신한다(알 수 없는 모델을 띄우지 않는다). 설정 화면은 그 값을
  `<이름> (목록에 없음 — 기본값으로 실행)`으로 보인다. 이름이 목록에 다시 나타나면 그대로
  쓰인다. 문법에 맞지 않는 값은 지금처럼 `null`이 된다.

### 3.4 핀 재발행과 새 모양 소비

- 핀 사본을 dotfiles blob `029ea23b…`(커밋 `34ba55bbe…`)로 다시 받고 provenance를
  갱신한다(UI-vui5 §3.1 수동 절차).
- 새 모양을 읽는 소비자를 고친다: 모델 토큰 목록은 `families`·`resolve` 키가 아니라
  런타임 카탈로그의 Codex 이름을 쓴다; 리뷰어 프리셋·`sessionFacts`의 별칭 → ID는
  런타임 카탈로그로 푼다; 클라이언트의 알려진 transport effort 집합에 핀이 가져온 새
  값을 더한다.
- 옛 일치 테스트(`runner-catalog.test.js:16-24`, `:61-75`)는 "핀의 `families` ⊆ 내장
  계열 템플릿"과 "seed 별칭 = 핀 계열" 테스트로 바뀐다.

### 3.5 단가

- 결정: 단가는 고정 이름에 적고, 별칭은 지금 가리키는 고정 이름의 단가를 따른다
  (사용자 결정 2026-10-07). 찾는 순서: 그 이름에 직접 적힌 단가 → 별칭이면 해석된
  고정 이름의 단가 → 같은 ID를 가진 항목 중 **단가가 있는** 항목. 기존 설정의 별칭
  단가 절은 첫 단계에서 계속 읽히므로 설정을 고치기 전에도 깨지지 않는다.
- 사용량 기록이 ID로만 단가를 찾을 때 가격 없는 별칭 항목에 먼저 걸려 단가를 잃는
  지금의 문제도 세 번째 단계로 사라진다.
- 서버와 구현은 사용자 `config.toml`을 쓰지 않는다(ADR UI-ooc0). 구현은 완료 보고의
  남은 것에 단가 절 이동안(별칭 절 → 고정 이름 절, `gpt-6.1-sol` 등 확인한 현재 단가
  포함)을 한 줄로 남기고, 적용은 사용자가 한다(2026-10-02 사용자 요청: 6.1 단가는
  갱신, 6.0 단가는 `sol-6`으로). 코드 완료는 이 적용에 기대지 않는다 — 별칭 절이
  남아 있어도 첫 단계에서 계속 읽힌다.

### 3.6 기본 표시

- 결정: 설정 화면에는 별칭만 기본으로 보이고 Codex 고정 이름은 꺼 둔다(사용자 결정
  2026-10-07). 표현은 기존 "꺼 둔 모델 목록" 하나로 한다: 목록이 갱신될 때 **처음
  나타난** Codex 고정 이름을 꺼 둔 목록에 더한다. 이미 본 이름은 다시 더하지 않으므로
  사용자가 켠 이름은 켜진 채 남는다(본 이름 집합은 가시성 상태 파일에 함께 둔다).
- 기본 꺼 둔 목록의 `sol-5.6`·`luna-5.6`은 그대로 두고, 상태 파일이 없을 때의 초기값은
  "기존 기본값 + 그때 목록의 모든 Codex 고정 이름"이다.
- 결정: 본 이름 집합이 없는 **기존 상태 파일**을 처음 읽을 때는, 이 변경 전 카탈로그가
  갖던 이름(내장 seed 이름과 `config.toml` 덮어쓰기 이름)을 이미 본 이름으로 채운다.
  그래서 사용자가 이미 켜 둔 이름(예: 켜 둔 `sol-5.6`)은 켜진 채 남고, 이 변경으로
  새로 나타난 고정 이름(`sol-6.1`·`sol-6`·`astra-6`·`luna-6`·`terra-5.6`)만 꺼 둔
  목록에 더해진다.

### 3.7 실패 처리

- CLI가 없거나 읽기가 실패하면 마지막 성공 목록(없으면 seed)으로 동작하고, 설정
  화면 Codex 영역에 `모델 목록: <시각> 기준`을 작게 보인다(목록을 한 번도 못 읽었으면
  `모델 목록을 읽지 못해 기본 표를 씁니다`).

## 4. 수용 기준

1. 실측 목록에서 별칭 `sol`의 ID가 `gpt-6.1-sol`이고 `sol-6.1`·`sol-6`·`sol-5.6`·
   `astra-6`·`luna-6`·`terra-5.6`이 카탈로그에 있다.
2. 고정 픽스처에서 JS 해석 결과가 dotfiles 해석기와 같다(설치본이 있을 때 교차 테스트).
3. 목록 읽기가 실패해도 카탈로그가 줄지 않고 저장된 실행 설정이 지워지지 않는다.
   정상 목록에서 고정 이름이 빠져도 그 이름의 저장값 원문은 남고, 설정 화면에
   `(목록에 없음 — 기본값으로 실행)`으로 보이며, 디스패치는 기본값을 쓴다.
4. 재핀 뒤 `npm run tsc`·`lint`·vitest가 통과하고, 모델 토큰·리뷰어 프리셋·기본 모델
   ID가 별칭이 아니라 해석된 ID로 표시된다.
5. 별칭 단가가 없고 고정 이름 단가만 있을 때 별칭 사용량에 그 단가가 붙는다.
6. 새로 나타난 고정 이름은 기본으로 꺼져 있고, 사용자가 켠 이름은 목록 갱신 뒤에도
   켜져 있다. 본 이름 집합이 없는 기존 상태 파일에서 이미 켜 둔 이름은 켜진 채 남는다.

## 5. 테스트

- `server/worker/codex-model-list.test.js`: 적격 판정, 버전 비교, 동률·중복, 실패 시
  직전 목록 유지, 상태 파일 왕복, seed.
- 교차 테스트(설치본 있을 때만): 같은 `codex debug models` 픽스처로 JS와
  `codex-models.py list` 결과 대조.
- `server/worker/runner-catalog.test.js`: 계열 템플릿 상속, 핀 `families` 포함 관계,
  `config.toml` 덮어쓰기 유지.
- `server/worker/usage-pricing.test.js`: 세 단계 단가 조회.
- `server/model-visibility-store.test.js`: 처음 본 고정 이름만 꺼 둠, 켠 이름 유지,
  본 이름 집합 없는 기존 상태 파일 이전.
- `server/worker/queue-store.test.js`: 목록에서 빠진 고정 이름 저장값 보존·디스패치
  기본값 대체, 문법 밖 값은 `null`.
- `app/utils/execution-defaults.test.js`, `server/worker/attempt-facts.test.js`,
  `server/worker/runner/preamble.test.js`: 새 핀 모양 소비.

## 6. 대안

- 정적 표 유지 + 손 갱신 — 이미 어긋나 있고 dotfiles가 없앤 부담을 되살려 기각.
- 설치된 dotfiles 해석기 spawn — 규칙 소유는 하나가 되지만 Worker가 dotfiles 설치·
  python3에 기대게 되어 기각(사용자 결정).
- 고정 이름 기본 표시 — 선택지가 길어져 기각(사용자 결정).

## 7. 비목표

- Claude 모델 목록, 계정별 Codex 목록 차이, 알 수 없는 모델 이름의 실행 거부,
  사용자 `config.toml` 자동 편집.

## 결정 (ADR 후보)

- 전제: ADR UI-u6ud-2 — dotfiles 계약 파일은 런타임에 읽지 않고 핀 사본으로 소비하며, 계약 규칙(해석 규칙)은 코드로 복제하고 교차 테스트로 동등성을 확인한다.
- 전제: ADR UI-u6ud-11 — beads-ui는 dotfiles 허용값 어휘를 넓히지 않는다; Codex 이름 문법은 dotfiles 해석기와 같다.
- Codex 모델 카탈로그의 원천을 Codex CLI 목록으로 — 첫째(되돌리기 어려움): 카탈로그 조립, Worker 실행 ID, 설정 화면 선택지, 단가 조회, 저장된 실행 설정 검증, 리뷰어 프리셋·preamble 표시, 핀 소비가 함께 움직인다. 둘째(대안이 실재): 정적 표·해석기 spawn이 있었다. 셋째(오래 남는 결정): 새 버전마다 손대지 않는 운영 방식을 정한다. 새 주제: 가장 가까운 현행 ADR은 UI-u6ud-2(계약 소비 방식)이지만 그것은 계약 파일 소비를 정하고 외부 CLI 목록을 카탈로그 원천으로 쓰는 일은 다루지 않는다.
  - `summary`: "beads-ui의 Codex 모델 선택지는 서버가 Codex CLI 목록(codex debug models)을 비동기로 읽어 dotfiles와 같은 규칙(계열별 최신 list·v2 → 별칭, 모든 적격 버전 → <계열>-<버전> 고정 이름)으로 만들고, 규칙은 JS로 복제해 dotfiles 해석기와 교차 테스트로 묶는다; 마지막 성공 목록을 영속해 읽기 실패가 카탈로그를 줄이지 않으며, effort·speed는 계열 템플릿을, 단가는 별칭이 해석된 고정 이름의 것을 상속하며, 목록에서 빠진 고정 이름의 저장값은 원문을 보존하고 실행은 기본값으로 대신한다" → ADR
- 처음 나타난 Codex 고정 이름은 꺼 둔 모델 목록에 더해 기본으로 숨긴다 — 첫째(되돌리기 어려움): 모델 활성 상태 파일(본 이름 집합)·설정 화면 선택지·카탈로그 갱신이 함께 움직이고, 한 번 꺼 둔 목록에 더해진 이름은 되돌려도 사용자 상태에 남는다. 둘째(대안이 실재): 모두 표시·별칭만 표시·직전 버전까지 표시가 있었다. 셋째(ADR UI-ooc0와 충돌): UI-ooc0의 "새로 추가되는 모델은 자동으로 보인다" 조항을 바꾸므로 그 ADR을 대체하고 나머지 조항(꺼 둔 목록은 표시만 거름, 카탈로그·저장 값·디스패치 검증·단가 불변, 꺼 둔 저장값은 (비활성)으로 남김, 러너마다 하나 이상 켬, 서버는 사용자 `config.toml`을 쓰지 않음)을 승계한다. 앞 후보와 소비자 집합이 달라(모델 활성 저장소·설정 화면) 두 번째 ADR로 둔다.
  - `summary`: "모델 활성은 서버 전역 꺼 둔 모델 목록이 선택지 표시에서만 빼는 것이며 카탈로그·저장 값·디스패치 검증·단가는 그대로 둔다; 새로 추가되는 모델은 자동으로 보이되 Codex 고정 이름(<계열>-<버전>)은 처음 나타날 때 꺼 둔 목록에 더해져 사용자가 켤 때만 보이고, 기존 상태 파일은 이전 카탈로그 이름을 이미 본 이름으로 이전한다; 저장된 값이 꺼 둔 모델이면 (비활성)으로 남기고 러너마다 하나 이상 켜 둔다" → ADR, supersede UI-ooc0
- 목록 갱신 주기(시작 + 1시간) — 값 조정(기본 제외 목록) → ADR 아님
- 설정 화면의 `모델 목록: <시각> 기준` 표시 — UI 표시 형식(기본 제외 목록) → ADR 아님

## 경계·후속

- 관찰: 사용자 `~/.config/bdui/config.toml`의 단가 절 이동과 `gpt-6.1-sol` 단가 갱신 — 저장소 밖 사용자 소유 파일이라 Bead가 아니다; 구현이 완료 보고에 편집안을 남기고 사용자가 적용한다(§3.5).
