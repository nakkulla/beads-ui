---
scope:
  - server/model-visibility-store.js
  - server/model-visibility-store.test.js
  - server/ws/model-visibility-handlers.js
  - server/ws.model-visibility.test.js
  - server/ws/connection.js
  - server/ws/index.js
  - server/worker/state-paths.js
  - server/worker/runner-catalog.js
  - server/worker/runner-catalog.test.js
  - server/worker/usage-pricing.test.js
  - generated/contracts/
  - app/protocol.js
  - app/data/model-visibility-store.js
  - app/main.js
  - app/utils/model-visibility.js
  - app/utils/execution-defaults.js
  - app/views/settings-dialog/
  - app/views/detail-panel/effective-settings-view.js
  - app/views/detail-panel/index.js
  - app/views/worker/provider-resume-dialog.js
  - app/views/worker/index.js
  - app/views/monitor/index.js
  - app/styles.css
---

# 러너별 활성 모델 설정과 모델 선택 목록 필터

## 문서 상태

- Bead: `UI-ooc0`
- 경로: `spec_backed`. beads-ui 한 저장소에서 구현·검증·인도를 한 묶음으로 처리한다. 선행 조건은 dotfiles
  크로스 리포 unit 하나다(§7).
- 기준: `main` / `678e433d`
- 상태: 사용자 검토용 초안. 스펙 게이트 승인 전이다.

## 1. 사용자 결과와 확인한 원인

모델 선택 목록에는 사용자가 켜 둔 모델만 보인다. 무엇을 켤지는 러너(Claude/Codex)마다 한 곳에서
체크한다. 사용자 결정(2026-09-29)은 다음과 같다.

- 켜 둘 모델: Claude `opus`·`sonnet`·`haiku`·`fable`, Codex `astra`(gpt-6-astra)·`sol`(gpt-6-sol)·`luna`(gpt-6-luna).
- 처음부터 꺼 둘 모델: `opus-4.8`·`opus-4.6`·`sol-5.6`·`terra`, 그리고 5.6 luna.
- `luna`는 `sol`과 같은 방식으로 gpt-6-luna로 옮긴다. dotfiles 계약이 먼저 바뀌고 beads-ui가 따라간다.
- 워크플로에서 범위가 정해진 구현 위임(`implementation_bounded`)은 `terra` 대신 `sol`을 쓴다(dotfiles unit).
- 설정은 모니터 일괄 창에 둔다.

확인한 사실은 다음과 같다.

- 카탈로그에서 모델을 지우면 여러 곳이 깨진다.
  - 과거 기록의 비용 단가를 잃는다. `usage-pricing.js modelPrice`는 기록된 문자열을 카탈로그 이름과
    `id` 순서로 대조한다.
  - 저장된 설정 검증이 실패한다(`exec-enums.js execSettingEnums`, `policy.js resolveExecSettings`,
    `queue-store.js` 로드 시 무효 모델 제거, `exec-preset-store.js`).
  - 사용자 `config.toml`의 `[runner.claude.models."opus-4.8".price]` 절이 `id=opus-4.8`인 잘못된
    모델을 새로 만든다. `runner-catalog.js mergeModels`는 BUILTIN에 없는 이름을 이름 그대로 `id`로 삼는다.
- 모델 선택지를 만드는 화면은 네 가지다. 모두 카탈로그의 모든 모델을 나열한다.
  - (a) 설정 창 워커·quick fix 탭: `execution-pane.js`의 `orchestrationGroup`·`implGroup`·
    `quickFixOrchestrationGroup`·`quickFixImplGroup`.
  - (b) 모니터 일괄 창의 같은 네 묶음: `bulk-worker-form.js`.
  - (c) 이슈 상세의 실행 설정: `effective-settings-view.js optionsForKey`의 `impl_model`·`orchestration_model`.
  - (d) 공급자 재개 대화상자: `provider-resume-dialog.js`. 공유 빌더를 쓰지 않고 `Object.keys(models)`를 직접 나열한다.
  - (a)~(c)는 `session-model.js`의 `implModelOptions`·`orchestrationModelOptions`를 공유한다.
    `narrowImplTarget`도 `implModelOptions`로 런타임 호환을 판정하므로, 빌더 안에서 거르면
    저장된 모델이 호환 판정에서 조용히 지워진다.
- `app/views/detail-panel/exec-settings.js modelGroups`는 프로덕션에서 호출되지 않는다.
  `detail-panel/index.js`는 이 파일에서 `EXEC_KEYS`·`modelRunnerOf`·`normalizeImplTarget`만 가져온다.
- Codex 별칭과 ID의 정본은 dotfiles `docs/contracts/harness.yaml implementation.model_catalog`이다.
  beads-ui는 핀 사본 `generated/contracts/execution-defaults.json`을 들고 있고,
  `runner-catalog.test.js`가 BUILTIN과 핀의 별칭 ID 일치를 검사한다.
- gpt-6-luna 실측(2026-09-29):
  - `codex exec -m gpt-6-luna` 호출은 성공한다.
  - 설치된 CLI 0.155.1의 번들 카탈로그에는 없어서 `Model metadata for gpt-6-luna not found` 경고가 난다.
  - dotfiles의 `model_catalog_fallback` 합성(ADR dotfiles-oh3s-2)은 gpt-5.6-luna 항목을 복제해 이 공백을 메운다.
- gpt-5.6-terra도 아직 호출된다. 5.6 세대를 끄는 것은 사용 중단이 아니라 사용자의 선택이다.

## 2. 검토한 접근과 선택

1. **(선택) 서버 전역 "꺼 둔 모델" 목록 + 선택지 표시에만 적용.** 카탈로그·저장 값·디스패치 검증·단가는
   그대로 두고 화면의 선택지만 거른다. 새로 추가되는 모델은 목록에 없으므로 자동으로 보인다.
2. `config.toml`에 모델별 `enabled` 플래그를 두는 방법. 체크 UI를 만들려면 서버가 사용자 소유
   설정 파일을 써야 한다. 그런 선례가 없고 사용자 편집과 충돌하므로 기각한다.
3. 서버가 `runner_catalog` 투영에 `disabled` 표시를 싣는 방법. 체크 하나를 바꿀 때마다 워커·모니터
   스냅샷 전체를 다시 밀어야 한다. 모니터 스냅샷은 이미 무겁다(1MB급 전체 재푸시 실측). 그래서 기각한다.

## 3. 저장과 채널

### 3.1 저장소 `server/model-visibility-store.js`

- 파일은 `$XDG_STATE_HOME/bdui/model-visibility.json`이다(`state-paths.js modelVisibilityFilePath()`).
  서버 전역이며 워크스페이스와 무관하다.
- 형태는 `{ revision: number, disabled_models: string[] }`이다. 모델 이름은 러너를 넘어 전역에서 유일하므로
  러너별로 나누지 않는다.
- 파일이 없으면 기본값 `{ revision: 0, disabled_models: DEFAULT_DISABLED_MODELS }`로 읽는다.
  `DEFAULT_DISABLED_MODELS = ['opus-4.8', 'opus-4.6', 'sol-5.6', 'terra', 'luna-5.6']`이다.
- 파일이 깨졌으면 경고를 남기고 기본값으로 읽는다(읽기는 fail-quiet). 다음 쓰기가 파일을 덮는다.
- 쓰기는 `exec-preset-store.js`의 모양을 따른다: revision CAS, `${file}.tmp` + `renameSync`,
  영속화가 성공한 뒤에만 캐시를 반영.
- 쓰기 검증은 엄격하다(ADR UI-u6ud-11). `set({ expected_revision, disabled_models }, catalog)`는
  목록 전체를 바꾸고 다음 경우 아무것도 쓰지 않는다.
  - revision 불일치 → `conflict`와 현재 스냅샷.
  - 문자열 배열이 아니거나 빈 문자열이 있음 → `invalid_disabled_models`. 중복은 제거한다.
  - 현재 카탈로그에 없는 이름 → `unknown_model`.
  - 어떤 러너의 모델이 전부 꺼짐 → `runner_all_disabled`.
- 읽을 때 현재 카탈로그에 없는 이름은 무시한다. 스냅샷의 `disabled_models`는 카탈로그에 있는 이름만 싣는다.
  기본값의 `luna-5.6`처럼 카탈로그에 아직 없거나 사용자 config에서 사라진 이름이 오류가 되지 않는다.
  클라이언트가 받은 목록을 고쳐 되돌려 보내도 `unknown_model`에 걸리지 않는다. 그런 이름은 다음 쓰기 때 파일에서도 빠진다.

### 3.2 WS 채널

`exec-preset-handlers.js`의 서버 전역 구독 모양을 따른다.

- `subscribe-model-visibility` → 곧바로 `model-visibility-snapshot`을 보낸다. `unsubscribe-model-visibility`가 짝이다.
- `model-visibility-set { expected_revision, disabled_models }`는 성공하면 `ok` 응답을 보낸 뒤
  모든 구독자에게 새 스냅샷을 보낸다. 실패하면 오류 코드와 현재 스냅샷을 담은 응답을 보낸다.
- 스냅샷 페이로드는 `{ revision, disabled_models, runners }`다. `runners`는 `{ claude: [{ name, id }], codex: [...] }`이며
  `runtimeCatalog()`의 카탈로그 순서를 따른다. 모델 탭은 이 채널 하나로 그린다. 모니터 행의 카탈로그에 기대지 않는다.
- 새 메시지 타입은 `app/protocol.js MESSAGE_TYPES`에 등록한다(`protocol.test.js`의 `connection.js` case 스캔).
  `protocol.md`는 ADR 채널 전용이라 적지 않는다.
- 연결이 닫히면 구독자에서 뺀다(`connection.js` close-time detach).

### 3.3 클라이언트 저장소

- `app/data/model-visibility-store.js`는 `exec-preset-store.js`와 같은 모양이다(`get`·`set`·`clear`·`subscribe`,
  마지막 스냅샷이 이김, 첫 스냅샷 전에는 `null`).
- `main.js`는 앱 시작 때 전역 구독을 한 번 하고 재연결 때 다시 구독한다. 워크스페이스를 바꿔도 비우지 않는다.
- 스냅샷이 없으면(`null`) 필터를 적용하지 않고 모든 모델을 보인다(fail-quiet).

## 4. 선택지 필터

### 4.1 공유 헬퍼 `app/utils/model-visibility.js`

- `visibleModelChoices(choices, disabled_models)`는 `choices`에서 꺼 둔 이름을 뺀다. `auto`는 빼지 않는다.
  `disabled_models`가 `null`이면 `choices`를 그대로 돌려준다.
- 필터는 **화면이 선택지를 만드는 자리**에서만 적용한다. `implModelOptions`·`orchestrationModelOptions`·
  `narrowImplTarget`·해석기(`resolveExecutionSettings`·`deriveModelRuntime`)는 바꾸지 않는다.
  이렇게 해야 호환 판정과 런타임 유도가 꺼 둔 모델을 계속 알아본다.

### 4.2 적용 지점

| 화면 | 자리 | 적용 |
| --- | --- | --- |
| 설정 창 워커·quick fix 탭 | `execution-pane.js` 네 묶음의 모델 `choices` | `visibleModelChoices` |
| 모니터 일괄 창 같은 탭 | `bulk-worker-form.js` 네 묶음의 모델 `choices` | `visibleModelChoices` |
| 이슈 상세 실행 설정 | `effective-settings-view.js optionsForKey`의 `impl_model`·`orchestration_model` | `visibleModelChoices` |
| 공급자 재개 대화상자 | `provider-resume-dialog.js` 러너별 모델 `<optgroup>`, `providerResumeDraft`, `providerResumeDraftChange` | 아래 규칙 |

- 저장된 값이 꺼 둔 모델이면 그 값은 지우지 않고 선택된 채로 둔다. 레이블은 `<표시값> (비활성)`이다.
  - `buildOptionView`는 이미 저장 값이 `choices`에 없으면 맨 앞에 되살린다. 여기에 `disabled_models` 입력을 더해,
    꺼 둔 모델인 선택지의 레이블 끝에 ` (비활성)`을 붙인다.
  - 다른 값을 고르면 저장 값이 바뀌고, 꺼 둔 모델은 목록에서 사라진다.
  - `(비호환)`과 겹치면 `(비호환)`을 그대로 둔다. 호환성이 더 강한 신호이기 때문이다.
- 공급자 재개 대화상자는 다음 규칙을 따른다.
  - 원래 attempt의 모델이 꺼져 있으면 그 모델을 선택된 채 `(비활성)`으로 둔다.
  - 러너를 바꾸면 `default_model`이 켜져 있을 때 그것을, 아니면 그 러너의 첫 번째 켜진 모델을 고른다.
- effort·속도 선택지는 바꾸지 않는다. `auto` 모델일 때의 effort 합집합과 속도 합집합은 지금처럼 러너의
  모든 모델에서 모은다. 현재 카탈로그에서는 꺼 둔 모델만 가진 어휘가 없어서 차이가 나지 않는다.
- 리뷰어 모델 목록(`astra`·`opus`·`fable` 고정 목록)은 카탈로그에서 파생하지 않으므로 대상이 아니다.

### 4.3 서버 동작

결정: 서버 검증·디스패치·카탈로그·단가는 바꾸지 않는다 — 활성 여부는 사람이 고를 선택지의 표시 문제다.
워크플로·CLI·기존 프리셋이 꺼 둔 모델을 써도 지금처럼 동작한다.

## 5. 모니터 일괄 창 `전역` 탭

- 일괄 모드 전용 탭 `칩`을 `전역`으로 바꾼다. id는 `global`, 글리프 `⬡`는 유지한다.
  - 이 탭은 ADR UI-u6ud-10이 말하는 "적용 대상 선택과 무관한 유일한 서버 전역 탭"이다. 활성 모델도 서버 전역
    값이라 같은 탭에 둔다. 두 번째 전역 탭을 만들면 그 조항과 어긋난다.
  - 탭 id는 저장되지 않는다(`index.js`의 활성 탭 분기만 `chips`를 읽는다). 그래서 이름을 바꿔도 옮길 상태가 없다.
- 부제는 `모든 저장소에 공통인 서버 전역 설정입니다. 적용 대상 저장소와 무관합니다.`
- 탭 본문은 두 묶음이다.
  1. `판정 칩 프리셋` — 지금의 `createChipBindingsTab` 내용 그대로.
  2. `활성 모델` — 새 모듈 `app/views/settings-dialog/model-visibility-section.js`.
- `활성 모델` 묶음은 다음과 같이 동작한다.
  - 안내 한 줄: `끈 모델은 선택 목록에서만 빠집니다. 이미 저장된 값과 과거 비용은 그대로입니다.`
  - 러너마다 소제목(`Claude`·`Codex`)을 두고 모델마다 체크박스를 둔다. 레이블은 이름이고 옆에 흐린 글씨로 `id`를 쓴다
    (예: `luna` `gpt-6-luna`). 체크됨이 켜짐이다.
  - 체크 UI는 `display-tab.js chipsSection`의 `.settings-dialog__toggle` 모양을 쓴다.
  - 러너에서 켜진 모델이 하나뿐이면 그 체크박스는 비활성이다. 툴팁은 `러너마다 하나 이상 켜 두어야 합니다.`
  - 저장은 즉시 한다. 체크를 바꾸면 `model-visibility-set`을 보낸다. `conflict`면 받은 스냅샷 위에 같은 토글을
    한 번 다시 적용해 재전송하고, 두 번째도 실패하면 오류 줄을 보인다(`index.js savePolicy`의 한 번 재시도와 같다).
  - 스냅샷이 없으면 묶음을 그리지 않는다(재료 없는 줄은 그리지 않는다).
- 저장소 하나를 편집하는 창(전체 설정 창·레포 카드 창)에는 이 묶음이 없다.

## 6. luna 재배치(dotfiles 착지 뒤)

§7의 dotfiles unit이 착지한 뒤 같은 PR에서 한다.

- 핀 재발행: `generated/contracts/execution-defaults.json`과 `execution-defaults.provenance.json`을 dotfiles 착지 blob으로
  갱신한다. 절차는 UI-vui5와 같다.
- `runner-catalog.js` BUILTIN의 codex 항목을 다음과 같이 바꾼다.
  - `luna.id`를 `gpt-6-luna`로 바꾼다. efforts·orchestration_efforts·speed_tiers는 지금 luna 값을 그대로 쓴다.
    dotfiles fallback 합성이 gpt-5.6-luna 메타데이터를 복제하기 때문이다.
  - 직전 세대를 `luna-5.6` `{ id: 'gpt-5.6-luna' }`로 남긴다. 어휘는 luna와 같다. `sol-5.6` 선례와 같다.
    이 항목이 있어야 gpt-5.6-luna로 기록된 과거 attempt가 모델 자리와 단가 조회를 잃지 않는다.
- 핀의 나머지 변경(`model_tiers`의 bounded → sol 등)은 beads-ui가 읽지 않는 키다. 재발행으로 따라온다.

## 7. 경계·후속

- 크로스 리포 unit: dotfiles quick_fix — Codex `luna` 별칭을 gpt-6-luna로 옮기고(`model_catalog_fallback.codex.luna: gpt-5.6-luna`),
  `model_tiers.codex.implementation_bounded`를 `terra`에서 `sol`로 바꾸며, Codex `default_subagent_model`과 codex-session
  전사 분석 위임 모델을 gpt-6-luna로 바꾼다. Bead `dotfiles-nn3q5`(Worker 병렬 레인 배치). `UI-ooc0`은 이 Bead에 foreign `blocks`로 걸린다.
- 프런트엔드 재작성 `UI-dbn6`(full_plan)과의 관계(사용자 결정 2026-09-29):
  - 이 기능은 현재 화면에 먼저 구현한다. `UI-dbn6`은 이 Bead를 기다리지 않는다.
  - `UI-dbn6`의 새 설정 화면(3단계, 일괄 모드 서버 전역 탭)과 새 이슈 상세(2단계)는 활성 모델 묶음과 `visibleModelChoices`
    필터를 보존 대상으로 이어받는다. 이 요청은 `UI-dbn6` notes에 남긴다.
  - 두 Bead의 실행 순서는 Worker 직렬 레인 배치가 정한다. 나중에 착지하는 쪽이 먼저 착지한 쪽의 변경을 흡수한다.
- 관찰: `~/.config/bdui/config.toml`의 `[runner.codex.models."luna".price]`는 재배치 뒤 gpt-6-luna에 적용되고
  `luna-5.6` 가격 절은 없다. 사용자 소유 설정이라 이 작업은 쓰지 않는다. gpt-5.6-luna 과거 비용을 보려면
  `luna-5.6` 가격 절을 더한다(`sol-5.6` 선례와 같음).
- 관찰: dotfiles `ccx` 모델 매핑(`ccx_model_mapping`)은 여전히 gpt-5.6 계열을 가리킨다. `sol` 재배치 때도 바꾸지 않았고
  이번 사용자 결정의 범위가 아니다.
- 관찰: 워크플로의 `자동` 모델 선택은 dotfiles `model_tiers`가 정한다. 이 설정은 beads-ui 선택 목록만 거른다.

## 8. 에러 처리·위험

- 상태 파일을 읽지 못하면 기본값으로 읽고 경고한다. 쓰기 실패는 `set`이 오류를 돌려주고 캐시를 바꾸지 않는다.
- 스냅샷을 받기 전이나 구독에 실패했을 때는 모든 모델이 보인다. 숨김이 풀리는 쪽으로 실패하므로 잘못된
  값이 저장되지 않는다.
- 배포 직후 진행 중인 luna attempt가 재개되면 `-m gpt-6-luna`로 이어진다(`sol` 선례 §4와 같음). 실패하면 기존
  attempt 실패 경로를 탄다.

## 9. Test scope

RED → GREEN 시임:

- `server/model-visibility-store.test.js`
  - 파일이 없을 때 기본 목록으로 읽는다.
  - revision 불일치에 `conflict`와 현재 스냅샷을 돌려준다.
  - 카탈로그에 없는 이름을 `unknown_model`로 거부한다.
  - 한 러너를 전부 끄는 쓰기를 `runner_all_disabled`로 거부한다.
  - 읽을 때 카탈로그에 없는 이름을 무시한다.
- `server/ws.model-visibility.test.js`
  - 구독 즉시 `runners`(이름·id)를 담은 스냅샷을 받는다.
  - 성공한 `set`이 다른 구독자에게 새 스냅샷을 민다.
- `app/utils/model-visibility.test.js`
  - `visibleModelChoices`가 꺼 둔 이름을 빼고 `auto`를 남긴다.
  - `null` 목록에 입력을 그대로 돌려준다.
- `app/utils/execution-defaults.test.js`
  - `buildOptionView`가 꺼 둔 저장 모델을 `(비활성)` 레이블로 되살려 선택된 채 둔다.
- `app/views/settings-dialog/execution-pane` 계열 테스트
  - 워커 탭 구현 모델 선택지에서 꺼 둔 모델이 빠진다.
  - 저장 값이 꺼 둔 모델이면 `(비활성)`으로 남는다.
- `app/views/worker/provider-resume-dialog` 테스트
  - 꺼 둔 모델이 선택지에서 빠진다.
  - 원래 attempt의 꺼 둔 모델은 `(비활성)`으로 남는다.
  - 러너를 바꿀 때 `default_model`이 꺼져 있으면 첫 번째 켜진 모델을 고른다.
- `app/views/settings-dialog/index.test.js`
  - 일괄 탭 목록의 마지막 탭이 `전역`(id `global`)이다.
  - 전역 탭이 `판정 칩 프리셋`과 `활성 모델` 두 묶음을 그린다.
  - 러너의 마지막 켜진 체크박스는 비활성이다.
- `server/worker/runner-catalog.test.js`
  - `luna.id`가 `gpt-6-luna`이고 `luna-5.6.id`가 `gpt-5.6-luna`다.
  - 핀 `model_catalog_fallback.codex`의 모든 ID를 BUILTIN 항목 하나가 싣는다.
- `server/worker/usage-pricing.test.js`
  - `modelPrice(catalog, 'gpt-5.6-luna')`는 `luna-5.6`의 가격을 찾는다.
  - `modelPrice(catalog, 'gpt-6-luna')`는 `luna`의 가격을 찾는다.

검증 bundle은 AGENTS.md Pre-Handoff Validation 그대로다(`npm run tsc`, `npm run lint`, `npx prettier --write <변경 파일>`,
`npx vitest run --reporter=dot`). UI 변경은 공유 서버 배포 뒤 모니터 일괄 창 `전역` 탭과 설정 창 워커 탭의 스크린샷으로 확인한다.

## 10. 구현 unit 후보

- unit-01 `model-visibility`: §3·§4·§5(서버 저장소·채널·클라이언트 저장소·필터·전역 탭). 앵커 `server/model-visibility-store.js`.
- unit-02 `luna-repin`: §6(핀 재발행·BUILTIN luna/luna-5.6·단가 테스트). 앵커 `server/worker/runner-catalog.js`.

한 워크트리·한 PR이다. 두 unit은 파일이 겹치지 않는다.

## 결정 (ADR 후보)

- 전제: ADR UI-u6ud-10 — 서버 전역 값은 모니터 일괄 창의 서버 전역 탭 하나에서만 편집하고 저장소 하나를 편집하는 창에는
  섞지 않는다. 활성 모델도 그 탭(`칩`→`전역`, 탭 구성은 스펙 소유)에 둔다.
- 전제: ADR UI-u6ud-2 — beads-ui는 dotfiles 계약의 소비자다. Codex 별칭 ID는 핀 사본을 코드로 복제하고 일치 테스트로 묶는다.
  luna 재배치는 dotfiles 착지 뒤 재발행으로 따라간다.
- 전제: ADR UI-u6ud-11 — 읽기는 fail-quiet, 사용자 편집 쓰기는 엄격하다. 상태 파일 읽기와 `set` 검증에 그대로 적용한다.
- 전제: ADR dotfiles/dotfiles-oh3s-2 — 번들에 없는 별칭 ID는 `model_catalog_fallback` 항목을 복제해 합성한다.
  gpt-6-luna 메타데이터 공백을 이 장치가 메운다.
- 모델 활성은 카탈로그에서 지우는 것이 아니라 서버 전역 "꺼 둔 모델" 목록으로 선택지 표시에서만 뺀다.
  - 되돌리기 어려움: 충족. 상태 파일·WS 채널·클라이언트 저장소·네 화면의 선택지·일괄 창 전역 탭이 함께 움직인다.
  - 맥락 없이 놀라움: 충족. 쓰지 않는 모델을 카탈로그에서 지우는 "정리"가 과거 단가·저장 값 검증·config 단가 절을
    깨뜨리는 이유가 코드만으로는 보이지 않는다.
  - 실재한 대안: 충족. 카탈로그 삭제, `config.toml` 플래그, 스냅샷 투영 플래그(§2).
  - 새 주제: 인접 ADR UI-u6ud-10. 공유하는 것은 편집 위치뿐이고, 소비자(모델 활성 저장소·선택지 빌더·공급자 재개
    대화상자)가 다르다.
  - `summary`: "모델 활성은 서버 전역 꺼 둔 모델 목록이 선택지 표시에서만 빼는 것이며 카탈로그·저장 값·디스패치 검증·단가는 그대로 둔다; 저장된 값이 꺼 둔 모델이면 (비활성)으로 남기고 러너마다 하나 이상 켜 둔다" → ADR
- 직전 세대 gpt-5.6-luna를 `luna-5.6`으로 남긴다.
  - 되돌리기 어려움: 아니다. 표 한 줄이다.
  - 맥락 없이 놀라움: 아니다. `sol-5.6`·`opus-4.8` 선례와 같은 배치다.
  - 실재한 대안: 남기지 않고 과거 사용량을 비용 미상으로 두기. `sol-5.6` 때 사용자가 기각했다.
  - → ADR 아님
- `칩` 탭을 `전역` 탭으로 바꿔 두 묶음을 담는다.
  - 되돌리기 어려움: 아니다. 탭 배열과 부제다.
  - 맥락 없이 놀라움: 아니다. 부제가 이유를 말한다.
  - 실재한 대안: 두 번째 전역 탭. ADR UI-u6ud-10의 "그 탭만" 조항과 어긋난다.
  - → ADR 아님
