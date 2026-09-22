---
scope:
  - generated/contracts/execution-defaults.json
  - generated/contracts/execution-defaults.provenance.json
  - server/worker/runner-catalog.js
  - server/worker/runner-catalog.test.js
  - server/worker/runner/codex.js
  - server/worker/runner/codex.test.js
  - server/worker/attempt-facts.js
  - server/worker/attempt-facts.test.js
  - server/worker/runner/preamble.js
  - server/worker/runner/preamble.test.js
  - server/worker/runner/__snapshots__/preamble.test.js.snap
  - server/worker/usage-pricing.test.js
  - app/utils/execution-defaults.js
  - app/utils/execution-defaults.test.js
  - app/views/settings-dialog/execution-pane.js
  - app/views/settings-dialog/bulk-worker-form.js
---

# Codex 모델 별칭 정비의 beads-ui 소비자 정합 — 핀 재발행·sol = gpt-6-sol·리뷰어 모델을 표로 풀어 표시

- Bead: UI-vui5 (route=spec_backed) · 선행 dotfiles-oh3s (blocks, closed — PR #525,
  `ded9af947984dbb4ed1e1bd62737e3a0dedecada`)
- 정본: dotfiles `docs/superpowers/specs/2026-09-23-codex-sol-gpt-6-sol-rerouting-design.md`
  (ADR dotfiles/dotfiles-oh3s, ADR dotfiles/dotfiles-oh3s-2). beads-ui는 그 projection의
  소비자다(ADR 0012).
- 기준: beads-ui `origin/main bef092bf8bfb5d6a24450e77efb28a53cbaa8167`, dotfiles
  `origin/main ded9af947984dbb4ed1e1bd62737e3a0dedecada`
- 사용자 결정(2026-09-23): runner catalog는 자체 표를 유지하고 일치 테스트로 드리프트를
  잡는다; 리뷰어 모델은 구현 모델 행과 같은 ID 표시; 직전 세대 gpt-5.6-sol을 버전 고정
  모델 `sol-5.6`으로 남긴다.
- r1 리뷰(astra, REVISE) 반영: BUILTIN 파생 테스트 기대값의 동반 갱신 명시와
  `runner/codex.test.js` scope 추가, preamble 스냅샷 파일 scope 추가, dotfiles ADR 인용 접두.

## 1. 배경 (2026-09-23 실측)

| 사실 | 근거 |
|---|---|
| 핀 사본은 dotfiles `6d50d519`의 blob `a50f950c`에 머물러 있고 그 뒤 정본이 두 번 바뀌었다: dotfiles-qyde가 `review.runtime_transports`를 더했고, dotfiles-oh3s가 `review.reviewers[*].model`을 별칭(`sol`·`astra`)으로 바꾸고 `model_catalog.codex.sol`을 `gpt-6-sol`로, `implementation.model_catalog_fallback`을 새로 넣었다 | `git diff 6d50d519 ded9af94 -- generated/contracts/execution-defaults.json` |
| 새 정본 blob은 `1d0afdfe1c3b398f855c1e67ecf3505e09431596`, sha256 `383d29f95c151a4ad0b220c202bb8ac3a1a9493bb76eb850a845dc82beb3d607`, 3380 bytes이며 `schema_version: 1` 그대로다 | dotfiles `origin/main` |
| Worker는 `server/worker/runner-catalog.js` BUILTIN의 `id`로 `codex exec -m <id>`를 띄운다. 거기서 `sol.id`는 아직 `gpt-5.6-sol`이다 | `runner/codex.js resolveModelId`, `args.push('-m', model_id)` |
| 설치된 `~/.codex/model-catalogs/native-v2.json`에 `gpt-6-sol` 엔트리가 이미 있고 `~/.codex/config.toml`이 그 파일을 `model_catalog_json`으로 쓴다 — Worker의 `codex exec -m gpt-6-sol`은 fallback 경고 없이 뜬다 | 카탈로그 slug 목록, 스탬프 2행 sha256 = 새 blob sha256 |
| 핀의 `reviewers[token].model`을 읽는 곳은 다섯이다. (a) `app/utils/execution-defaults.js reviewerModelId` — 설정·상세·모니터의 리뷰어 행 표시; (b)(c) `execution-pane.js`·`bulk-worker-form.js reviewerModelToken` — 속도 행 노출 판정; (d) `server/worker/attempt-facts.js resolveReviewerPreset` → `runner/preamble.js`의 `리뷰어 프리셋:` 줄; (e) `server/worker/bench-runs.js` — 리뷰어 **토큰**만 쓰고 모델 값은 읽지 않는다 | grep `review?.reviewers` |
| 새 핀을 그대로 넣으면 (a)는 `6-astra` 대신 `astra`, (d)는 `astra → astra/xhigh`를 낸다. (b)(c)는 `rowRunner`가 카탈로그 **이름**과 `id`를 모두 맞춰 보므로 별칭에서도 같은 러너를 찾는다 — 동작 변화 없음 | `session-model.js rowRunner` |
| 사용량 비용은 기록된 모델 문자열을 카탈로그 이름, 다음으로 `id`와 맞춰 가격표를 찾는다. Codex 위임 leg는 rollout의 ID(`gpt-5.6-sol`)를 싣는다. `sol.id`만 바꾸면 과거 기록과 계속 gpt-5.6-sol을 쓰는 `ccx` 세션 기록이 가격을 잃는다 | `usage-pricing.js modelPrice`·`pricingRunner`, `session-observation.test.js` |
| 선례: Claude 쪽은 `opus` 별칭 옆에 버전 고정 `opus-4.8`·`opus-4.6`을 BUILTIN에 두고, 가격은 사용자 `config.toml`이 준다 | UI-3el7, `[runner.claude.models."opus-4.8".price]` |

## 2. 목표 (수용 기준)

1. 핀 사본과 provenance가 dotfiles `ded9af94`의 blob `1d0afdfe`와 바이트 단위로 같고
   `loadExecutionDefaults().supported === true`이다.
2. Worker의 `sol`은 `gpt-6-sol`로 뜨고, `sol-5.6`은 `gpt-5.6-sol`로 뜬다. `astra`·`terra`·`luna`의
   ID는 그대로다.
3. BUILTIN의 Codex ID가 핀 `implementation.model_catalog.codex`와 어긋나거나, 핀의 Claude
   별칭·리뷰어 별칭이 BUILTIN에 없으면 단위 테스트가 실패한다.
4. 리뷰어 행은 별칭을 표로 풀어 구현 모델 행과 같은 규칙으로 보인다: codex 리뷰어
   `6-sol`(full `gpt-6-sol`), astra 리뷰어 `6-astra`(full `gpt-6-astra`), opus·fable은 별칭 그대로.
5. Worker preamble의 `리뷰어 프리셋:` 줄이 `astra → gpt-6-astra/xhigh`처럼 ID를 싣는다.
6. `gpt-5.6-sol`로 기록된 사용량은 `sol-5.6`의 가격을, `gpt-6-sol`은 `sol`의 가격을 찾는다.

## 3. 결정

### 3.1 핀 재발행

- 바이트 출처는 dotfiles `ded9af947984dbb4ed1e1bd62737e3a0dedecada:generated/contracts/execution-defaults.json`
  하나다. `git -C <dotfiles> show <commit>:<path>`의 출력 바이트를 그대로 쓰고(재포맷 금지 —
  prettier 대상에서도 뺀다), provenance는 `source_repo: dotfiles`, `source_path` 그대로,
  `source_commit: ded9af94…(40hex)`, `source_blob_sha`는 `git hash-object`로 재계산한 값,
  `sha256`·`bytes`는 `shasum -a 256`·`wc -c`로 계산한 값을 쓴다. 키 순서는 현행 provenance와 같다.
- 구현 시점에 dotfiles `origin/main`의 그 파일 blob이 `1d0afdfe`가 아니면 정본이 이 스펙 뒤로
  또 움직인 것이다 — 이 스펙의 재발행 대상은 `1d0afdfe`로 고정하고, 달라진 부분은
  재발행하지 않은 채 사용자에게 보고한다(새 계약 변경은 그 변경의 소비자 Bead가 맡는다).
- `결정: 핀 드리프트 테스트(로컬 dotfiles 체크아웃과의 바이트 비교)는 execution-defaults에 더하지 않는다 — beads-ui가 읽지 않는 키(qyde의 review.runtime_transports 같은)까지 재핀을 강제해 잡음이 되고, 소비 키의 변경은 dotfiles 쪽 형제 Bead(awaited_by_consumer)가 알린다.`

### 3.2 runner catalog: 자체 표 + 일치 테스트, `sol-5.6` 추가

- BUILTIN `codex.models.sol.id`를 `'gpt-6-sol'`로 바꾼다. efforts·orchestration_efforts·
  speed_tiers는 그대로다 — 설치 카탈로그의 gpt-6-sol 엔트리가 gpt-5.6-sol의 복제라 추론 단계
  목록이 같다(dotfiles 스펙 §3의 가정을 승계).
- `sol` 바로 뒤에 `'sol-5.6': { id: 'gpt-5.6-sol' }`을 더하고 efforts·orchestration_efforts·
  speed_tiers는 현행 `sol` 값을 그대로 복제한다. 순서는 `astra, sol, sol-5.6, terra, luna`
  (Claude의 `opus, opus-4.8, opus-4.6` 배치와 같은 규칙). 가격은 넣지 않는다 — BUILTIN은 가격을
  갖지 않는다는 기존 규칙대로 사용자 `config.toml`이 준다(§5 관찰).
- 표는 코드에 남고 런타임에 핀을 읽지 않는다(ADR 0012). 대신 `runner-catalog.test.js`에
  일치 describe를 둔다: 핀 JSON을 `import … with { type: 'json' }`로 읽어
  (1) `model_catalog.codex`의 모든 `[alias, id]`에 대해 `builtinCatalog().codex.models[alias].id === id`,
  (2) `model_catalog.claude`의 모든 별칭이 `builtinCatalog().claude.models`에 있음,
  (3) `review.reviewers`의 모든 `model` 별칭이 `resolveCatalog().model_index`에 있음을 단언한다.
  BUILTIN에만 있는 버전 고정 이름(`sol-5.6`, `opus-4.8` 등)은 허용한다.
  `model_catalog_fallback`은 이 테스트가 보지 않는다 — 번들이 따라잡으면 dotfiles가 지우는 과도기
  키이고, `sol-5.6`은 그와 무관한 버전 고정 선택지다.
- `runner/codex.js` `resolveModelId` 주석의 예시 ID를 `gpt-6-sol`로 고친다.

### 3.3 리뷰어 모델 해석: 하나의 해석 경로

- `app/utils/execution-defaults.js`의 비공개 `implementationModelId(token, runtime, session, runner_catalog)`를
  `catalogModelId`로 이름을 바꿔 export한다(동작 불변: 핀 `model_catalog` → runner catalog `id`
  → 토큰 그대로). 구현·총괄 모델 행의 기존 호출은 새 이름으로 바꾼다.
- `reviewerModelId(token, session)`는 인자에 `runner_catalog`를 더해(`resolveExecutionSettings`가
  이미 들고 있다) `reviewers[token].model` 별칭을
  `catalogModelId(alias, null, session, runner_catalog)`로 푼다. 표시는 기존대로
  `compactModelId(full_value)`다. 옛 ID형 값(`gpt-5.6-sol`)은 어느 표에도 키로 없으므로 그대로
  통과한다 — 옛 픽스처·옛 핀과 호환된다.
- `attempt-facts.js resolveReviewerPreset`은 반환 `model`을 같은 함수
  `catalogModelId(entry.model, null, defaults.session, null)`로 푼 값으로 채운다(서버가
  `app/utils/execution-defaults.js`를 import하는 선례: `title-cache.js`). 풀리지 않으면 별칭
  그대로다.
- `preamble.js`의 줄은 `리뷰어 프리셋: <token> → <model>/<effort> (source=핀 사본 review.reviewers·implementation.model_catalog[, digest=…])`로
  출처 표기만 늘린다.
- `execution-pane.js`·`bulk-worker-form.js`의 `reviewerModelToken`은 코드를 바꾸지 않는다 —
  별칭이 카탈로그 이름이라 `rowRunner`가 그대로 찾는다. 두 함수 주석의 "model id"를 "catalog
  alias"로 고치는 것만 한다.

### 3.4 읽지 않는 새 키

- `implementation.model_catalog_fallback`: Worker는 Codex 카탈로그를 빌드하지 않으므로 읽지
  않는다. 표시도 하지 않는다.
- `review.runtime_transports`(dotfiles-qyde): 리뷰 leg의 transport는 세션 쪽 선택기가 고르고
  beads-ui는 표시하지 않으므로 읽지 않는다.
- 두 키 모두 `sessionFacts`가 세션 투영에 그대로 싣고 지나간다. 키를 읽는 코드는 만들지 않는다.

## 4. 에러 처리·위험

- 핀 검증 실패(provenance 불일치 등)는 현행대로 `supported: false` → 리뷰어 행 `기본값 확인
  불가`, preamble 줄 생략. 새 경로를 만들지 않는다.
- 진행 중인 sol attempt가 배포 뒤 재개되면 `codex exec resume … -m gpt-6-sol`로 이어진다
  (재개도 현재 표의 ID를 넘긴다). Codex는 스레드 중 모델 변경을 받는다고 가정하며, 실패하면 그
  attempt의 기존 실패 경로를 탄다.
- `sol`의 `fast` 속도: gpt-6-sol의 priority 지원은 미검증이다(dotfiles 스펙 §4와 같음). 속도는
  사용자의 명시 선택이므로 speed_tiers를 줄이지 않는다.

## Test scope

RED → GREEN 시임(핀 재발행을 먼저 하면 1·2가 RED가 된다):

1. `server/worker/runner-catalog.test.js` — §3.2 일치 describe 세 단언. 재발행 직후
   `sol` ID 불일치로 RED, BUILTIN 갱신으로 GREEN. 같은 파일에 `sol-5.6`이 `codex` 러너에 있고
   `id === 'gpt-5.6-sol'`, efforts·speed_tiers가 `sol`과 같음을 단언한다.
2. `app/utils/execution-defaults.test.js` — 실제 핀으로 `spec_review_model: 'astra'` 행이
   `display '6-astra'`·`full_value 'gpt-6-astra'`(기존 테스트, 재발행 직후 RED)이고,
   `'codex'` 행이 `'6-sol'`·`'gpt-6-sol'`(새 테스트)이다.
3. `server/worker/attempt-facts.test.js` — 별칭형 핀(`reviewers.codex.model: 'sol'`,
   `model_catalog.codex.sol: 'gpt-6-sol'`)에서 `resolveReviewerPreset`의 `model === 'gpt-6-sol'`;
   표에 없는 별칭은 별칭 그대로.
4. `server/worker/usage-pricing.test.js` — `sol`·`sol-5.6`에 서로 다른 가격만 준(overrides에
   `id`를 넣지 않아 BUILTIN ID가 그대로인) 해석 카탈로그에서
   `modelPrice(catalog, 'gpt-5.6-sol')`이 `sol-5.6`의 가격, `'gpt-6-sol'`이 `sol`의 가격이다.

동반 갱신(시임 아님):

- BUILTIN의 `sol` ID에서 파생된 기대값은 새 매핑(`gpt-6-sol`)으로 바꾼다 —
  `runner/codex.test.js`의 `buildArgv` 기대 인자(`:58·120·142`), `runner-catalog.test.js`의
  `sol.id` 단언(`:64·380`), `usage-pricing.test.js` "CLI id로 조회" 테스트(`:247` 부근, `sol`에만
  가격을 준 카탈로그)의 조회 문자열.
- preamble 출처 표기 변경: `preamble.test.js:935`의 기대 줄과
  `runner/__snapshots__/preamble.test.js.snap`의 네 줄(`:380·487·569·675`). 스냅샷 diff가 그 네
  줄의 출처 표기 말고는 없음을 확인한다.
- Codex 모델 이름 목록을 정확히 나열하는 기대값이 있으면 `sol-5.6`을 더한다.
- 옛 ID `gpt-5.6-sol`을 그대로 두는 것은 관측 기록 픽스처(rollout·usage leg·영수증 문자열)와
  카탈로그를 명시 주입한 테스트뿐이다. 전체 테스트에서 추가로 드러나는 BUILTIN 파생 기대값도
  같은 규칙으로 갱신한다.

## 검증 범위

- `node --version`이 `package.json#engines`를 만족; `npm run tsc`, `npm run lint`,
  `npx prettier --write <변경 파일>`(핀 JSON 제외), `npx vitest run --reporter=dot`.
- 핀 바이트 대조: `git -C <dotfiles> show ded9af94…:generated/contracts/execution-defaults.json | cmp - generated/contracts/execution-defaults.json`.
- 배포 뒤(Post-Merge Runtime Validation): 공유 서버 WS/REST의 execution-defaults 투영이
  `supported: true`이고 runner catalog에 `sol.id = gpt-6-sol`·`sol-5.6`이 보인다; 설정 창의
  리뷰어 행이 `6-astra`로 보인다(스크린샷 1장).

## 구현 unit 후보

- unit-01: 전체(핀·runner catalog·해석 경로·preamble·테스트) — 한 저장소, 한 PR.

## 경계·후속

- 관찰: `~/.config/bdui/config.toml`의 `[runner.codex.models."sol".price]`는 이제 gpt-6-sol에
  적용되고 `sol-5.6` 가격 절은 없다 — 사용자 소유 설정이라 이 작업이 쓰지 않는다. gpt-5.6-sol
  비용을 계속 보려면 사용자가 `sol-5.6` 가격 절을 더하고, gpt-6-sol 가격이 다르면 `sol` 값을
  고친다.
- 관찰: gpt-6-sol의 `fast`(priority) 지원 실측 — 번들 카탈로그가 실을 때 dotfiles가 fallback을
  지우는 변경과 함께 드러난다; 여기서 Bead를 만들지 않는다.

## 결정 (ADR 후보)

- 전제: ADR 0012 — 계약 subset은 코드가 명시하고 drift는 테스트가 잡는다; 핀 사본은 정본
  바이트 그대로이며 beads-ui는 정의자가 아니다. runner catalog의 Codex ID 표도 이 방식으로
  복제하고 일치 테스트로 묶는다.
- 전제: ADR dotfiles/dotfiles-oh3s — Codex 모델 ID는 `implementation.model_catalog` 한 표에만
  있고 reviewer preset은 별칭만 쓴다; 소비자는 별칭을 그 표로 푼다.
- runner catalog BUILTIN의 Codex ID를 핀 `model_catalog.codex`의 코드 복제로 두고 일치 테스트로
  묶는다. 되돌리기 어려움: 아니다 — 테스트 한 describe다. 맥락 없이 놀라움: 아니다 — ADR 0012의
  복제 규칙을 새 표에 적용한 것이고 테스트 이름이 이유를 말한다. 실재한 대안: 핀에서 런타임
  파생 — 핀 검증 실패용 대체 표가 다시 필요해 두 출처가 되므로 사용자가 기각 → ADR 아님
- 리뷰어 모델 표시를 `catalogModelId` 한 경로로 풀어 구현 모델 행과 같은 ID 표시로 둔다.
  되돌리기 어려움: 아니다 — 표시 함수 하나. 맥락 없이 놀라움: 아니다 — 구현 모델 행과 같은
  함수를 쓴다. 실재한 대안: 별칭+ID 병기 — 다른 모델 행과 형식이 갈라져 사용자가 기각 → ADR 아님
- 직전 세대 `gpt-5.6-sol`을 버전 고정 이름 `sol-5.6`으로 남긴다. 되돌리기 어려움: 아니다 — 표
  한 줄. 맥락 없이 놀라움: 아니다 — `opus-4.8`·`opus-4.6` 선례와 같은 배치다. 실재한 대안: 남기지
  않고 과거·ccx 사용량을 비용 미상으로 두기 — 사용자가 기각 → ADR 아님
- `model_catalog_fallback`·`review.runtime_transports`를 읽지 않는다. 되돌리기 어려움: 아니다 —
  읽기가 필요해지면 reader를 더하면 끝난다. 맥락 없이 놀라움: 아니다 — ADR 0012의 "자기 키만
  읽는 소비자"의 현재 상태 기록이다. 실재한 대안: 없다 — 두 키를 쓸 beads-ui 기능이 없다 → ADR 아님
