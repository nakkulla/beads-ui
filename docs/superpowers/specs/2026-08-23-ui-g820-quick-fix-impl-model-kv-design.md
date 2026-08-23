---
scope:
  - server/worker/exec-enums.js
  - server/session-defaults.js
  - server/ws/exec-preset-handlers.js
  - server/worker/exec-preset-coordinator.js
  - app/utils/execution-defaults.js
  - app/views/settings-dialog/session-model.js
  - app/views/settings-dialog/index.js
  - app/views/detail-panel/effective-settings-view.js
---

# UI-g820 — 전역 kv `quick_fix_impl_model`을 설정 다이얼로그·유효 실행 설정에서 소비한다

Bead: UI-g820 · route: spec_backed · 날짜: 2026-08-23

## 배경

dotfiles-2ubi(closed, PR #427)가 workspace kv `workflow_session_defaults`에
route-scoped 키 `quick_fix_impl_model`을 추가했다. canonical 정의는 dotfiles
`docs/contracts/workflow-state.yaml`(`workspace_kv_defaults.allowed_keys`,
`route_scoped.quick_fix_impl_model`)과 `workflow-contract.md`(Execution selectors
문단)에 있고, 설계 SoT은 dotfiles
`docs/superpowers/specs/2026-08-22-quick-fix-global-impl-model-design.md`(이하
"canonical spec")이다. 이 문서는 그 §6이 beads-ui에 요구한 소비 유닛만 설계한다.

계약 요약(복제 아님, 판단 근거로 인용):

- 값은 harness `implementation.model_catalog` 토큰(`auto` 금지). runtime은
  카탈로그 유일성으로 유도한다.
- 유효하고 read-back `route=quick_fix`이며 Bead `impl_dispatch` metadata가 없으면
  dispatch가 `delegated`로 풀리고, kv 모델 층은 `impl_model`보다 이 키를 먼저 읽는다.
  current user·Bead metadata가 `impl_runtime`을 정했고 그 runtime이 토큰을 제공하지
  않으면 키는 skip+warn이다. kv `impl_runtime`은 이 유도에 참여하지 않는다.
- 미설정·무효(`invalid_value: ignore_key_and_warn`)·`route≠quick_fix`는 현행과 같다.
- kv로 전환된 dispatch는 `impl_dispatch` metadata를 쓰지 않는다. kv는 영수증
  증거가 아니다(canonical spec §4.3) — Worker scheduler·`receipt-check`·projection
  loader는 무변경.

beads-ui는 이 계약의 소비자다. 어휘 정의·해석 순서는 dotfiles 소유이며 이 저장소는
그 값을 검증·저장·표시한다.

## 목표

1. 서버가 kv 키 `quick_fix_impl_model`을 읽기(fail-quiet)·쓰기(strict) 양쪽에서
   카탈로그 모델 토큰 enum으로 받아들인다.
2. 설정 다이얼로그 세션 기본값 그룹에 `quick_fix 구현 모델` 한 행이 생긴다.
3. 유효 실행 설정 표시(`resolveExecutionSettings`)가 `route=quick_fix` Bead에서 kv
   함의(위임·유도 runtime·모델)를 보여 준다.
4. 기존 workspace preset 적용이 이 키를 지우지 않는다.

## 비목표

- 계약 어휘·dispatch 해석 순서 정의(dotfiles 소유).
- `impl_dispatch`의 kv 저장, `quick_fix_impl_model`의 Bead metadata(`parent_keys`)
  추가, preset(`IMPL_PRESET_KEYS`) 추가.
- Worker scheduler·`receipt-check`·`execution-defaults` projection loader 변경.
  `generated/contracts/execution-defaults.json`은 재핀하지 않는다(harness 불변).
- 서버가 kv 키를 읽어 dispatch를 *실행*하는 경로. 실행 해석은 세션(workflow 스킬)이
  한다. beads-ui는 표시만 한다.

## 설계

### 1. 서버 enum — `server/worker/exec-enums.js`

- `WORKSPACE_KV_KEYS`를 `[...BEAD_APPLY_KEYS without impl_dispatch, 'quick_fix_impl_model']`
  (12키)로 바꾼다. 주석의 "11 keys"를 12로, "kv 목록은 per-bead 목록의 부분집합"
  서술을 "kv 전용 route-scoped 키 1개를 더 가진다"로 고친다.
- `sessionDefaultEnums(catalog)`에 `quick_fix_impl_model: base.impl_model`을 추가한다
  (= `Object.keys(catalog.model_index)`, `auto` 없음). runner catalog가 계약의
  `model_catalog`를 mirror하므로 별도 enum 원본을 만들지 않는다.
- 새 상수 `PRESET_KV_KEYS = WORKSPACE_KV_KEYS.filter((key) => IMPL_PRESET_KEYS.includes(key))`
  (11키) — preset이 운반하는 kv 키. 아래 §4의 두 preset 경로가 쓴다.
- `BEAD_APPLY_KEYS`·`IMPL_PRESET_KEYS`·`execSettingEnums`·`validateImplSettings`는
  무변경.

### 2. 서버 kv 읽기/쓰기 — `server/session-defaults.js`

코드 변경 없음(enum 테이블을 통해 자동 반영). 헤더 주석의 "11 allowed keys"를
12로, `impl_dispatch` 부재 설명 옆에 "`quick_fix_impl_model`은 kv 전용 route-scoped
키이며 Bead 층에는 없다"를 한 줄 덧붙인다.

- `normalizeSessionDefaults`: 토큰이 현재 카탈로그 밖이면 `invalid_value:quick_fix_impl_model`
  경고와 함께 drop(fail-quiet). `auto`도 enum 밖이므로 같은 경로.
- `validateSessionDefaultsPatch`: 같은 enum으로 strict 거부. `null`/`''`는 삭제.

### 3. 설정 다이얼로그 — `app/views/settings-dialog/session-model.js`, `index.js`

- `session-model.js`의 `WORKSPACE_KV_KEYS`를 서버와 같은 12키로 mirror한다
  (`buildSessionDefaultsPatch`가 이 키를 diff에 포함하게 된다).
- `index.js` `executionPane()`의 `구현` 그룹 맨 끝(`속도` 다음)에 한 행:
  `selectRow('quick_fix_impl_model', 'quick_fix 구현 모델', <choices>, onSessionChange, session_draft)`.
  choices는 `implModelOptions(catalog, undefined)`에서 `AUTO_LITERAL`을 제외한
  전체 카탈로그 토큰(runtime 무관 — runtime은 유도값이므로 `위임 대상` 선택에
  좁히지 않는다).
- 행 라벨은 기존 `selectControl` 경로(`buildExecutionOptionView` →
  `resolveExecutionSettings`)를 타되, 이 행만은 해석 입력의 `global`에
  `{ ...session_draft, ...currentOrchestrationValues() }`를 넘긴다. projection의
  `orchestration.model`은 고정 fallback(`ORCHESTRATION_MODEL_FALLBACK`)이고 실제
  워크스페이스 orchestration 모델은 queue 값(Worker 탭 초안 우선)이므로, 세션
  초안만 넘기면 unset 라벨이 실제 모델 대신 fallback 모델을 보인다. 선택·저장
  원본은 여전히 `session_draft`다(`buildSessionDefaultsPatch`는 kv 키만 diff하고
  orchestration 키는 `buildOrchestrationPatch`가 따로 diff한다). 결과: unset
  `기본값 사용 — 메인 (orchestration <compactModelId(실제 orchestration 모델)>)`,
  선택지는 `compactModelId(full id)`, `title`에 full id.
- 그룹 hint(`이슈 핀이 있으면 핀이 우선합니다`)는 이 행에도 참이므로 유지.

### 4. preset 경로는 키를 건드리지 않는다

- `server/ws/exec-preset-handlers.js` workspace apply(`apply-impl-preset-global`):
  `for (const key of WORKSPACE_KV_KEYS)`를 `PRESET_KV_KEYS`로 바꾼다. preset은 이
  키를 운반하지 않으므로, 전체 kv 키를 순회하면 preset 적용마다
  `quick_fix_impl_model`이 `null`(삭제)로 덮였을 것이다. readback 대조도 같은 목록.
- `server/worker/exec-preset-coordinator.js` legacy reseed 후보 수집(`WORKSPACE_KV_KEYS`
  순회)도 `PRESET_KV_KEYS`로 바꾼다(현재는 `execSettingEnums()[key]`가 undefined라
  우연히 skip되지만 의도를 명시한다).

### 5. 유효 실행 설정 — `app/utils/execution-defaults.js`

`EXECUTION_SETTING_KEYS`에 `quick_fix_impl_model`을 추가한다(`impl_speed` 다음,
`orchestration_*` 앞). 행 해석과 dispatch 함의는 다음과 같다.

#### 5.1 `quick_fix_impl_model` 행 (kv 층 자체)

- 읽는 층: `global`만. `pin`에는 이 키가 없다(Bead metadata 아님).
- 유효성: 값이 `auto`가 아니고, projection `implementation.model_catalog` 또는
  runner catalog(`runners[*].models`)의 어떤 runtime이 그 토큰을 제공하면 유효하며,
  그 runtime이 **유도 runtime**이다(`runtimeModelTokens` 재사용, 전 runtime 순회).
  어느 runtime도 제공하지 않으면 — 제공 목록이 하나라도 있을 때 — `incompatibleResult`
  (`<값> (비호환)`, resolution `incompatible`)이고 §5.2의 전환은 일어나지 않는다.
  projection·catalog가 둘 다 비어 토큰을 판정할 수 없으면 값은 `explicit`로 표시하되
  유도 runtime이 없으므로 §5.2 전환도 하지 않는다(fail-quiet).
- 미설정: `result(null, 'base', '메인 (orchestration <compactModelId(orchestration_model.full_value)>)', null, 'default')`.
  `orchestration_model` 행은 `global.orchestration_model`(호출자가 합친 실제
  워크스페이스 값) → projection fallback 순으로 이미 해석되므로 그 `full_value`를
  그대로 쓴다. orchestration 모델 행이 `unavailable`이면 `메인`만. 이 행은
  orchestration 행 계산 뒤에 만든다.
- 설정·유효: `result(token, 'global', compactModelId(full), full, 'explicit')`.
  full id는 `implementationModelId(token, derived_runtime, session, runner_catalog)`.
- projection 미지원(`session === null`): 기존 `unavailableResult` 규칙(설정값은
  토큰 그대로, 미설정은 `기본값 확인 불가`).

#### 5.2 `route=quick_fix`에서의 dispatch 함의

다음이 모두 참일 때만 적용한다:

1. `input.route === 'quick_fix'`.
2. `pin.impl_dispatch`가 usable string이 아니다(Bead 핀 없음). `global`의
   `impl_dispatch`는 계약상 존재하지 않으므로 보지 않는다.
3. §5.1에서 키가 유효하고 유도 runtime이 정해졌다.
4. runtime 충돌 없음: `pin.impl_runtime`이 있으면 그것이(`inherit`이면
   `input.controller_runtime`으로 해석한 값이) 유도 runtime과 같아야 한다.
   `inherit`인데 `controller_runtime`이 null이면 판정 불가 → 전환하지 않는다
   (fail-quiet, 현행 표시 유지). kv `impl_runtime`은 비교하지 않는다(계약).

적용 시 행 변경:

- `impl_dispatch`: `result('delegated', 'global', '위임 (전역 quick_fix)', 'delegated', 'explicit')`.
- `impl_runtime`: `pin.impl_runtime`이 있으면 현행 그대로(핀). 없으면
  `result(derived, 'global', \`${derived} (유도)\`, derived, 'explicit')` — kv
  `impl_runtime` 값이 있어도 이 Bead에서는 유도값이 효과값이므로 덮는다.
- `impl_model`: `pin.impl_model`이 있으면 현행 그대로(핀이 kv보다 우선). 없으면
  `result(token, 'global', compactModelId(full), full, 'explicit')` — kv `impl_model`이
  있어도 `quick_fix_impl_model`이 먼저 읽히므로 덮는다.
- `impl_effort`·`impl_speed`: 현행 규칙(핀 → kv → harness)을 그대로 두되, 기존의
  `main ⇒ 해당 없음` 분기를 타지 않으므로 delegated 분기(auto 표시·transport 유추)가
  적용된다. transport 유추는 위에서 정한 `impl_runtime` 행 값을 쓴다.

적용하지 않을 때(핀 `impl_dispatch=main`·키 무효·route 불일치 등)는 현행과
바이트 단위로 같은 결과다 — 기존 테스트 `uses the quick_fix route dispatch default
when upper layers are absent` 등이 그 불변을 고정한다.

#### 5.3 `buildOptionView`의 `route` 전달

per-bead 편집기(`effective-settings-view.js`)의 option view는 현재 `route`를 넘기지
않아 quick_fix Bead의 `impl_dispatch` unset 라벨이 kv 함의를 반영하지 못한다.
`buildOptionView` 입력에 선택 필드 `route?: string|null`을 더해 `resolveWith`로
전달하고, `effective-settings-view.js`는 `model.metadata.route`(string일 때)를 넘긴다.
설정 다이얼로그 쪽 `buildExecutionOptionView`는 route를 넘기지 않는다(전역 층
편집이므로 특정 Bead의 route가 없다). 결과: quick_fix Bead의 `실행 방식` unset 라벨이
`기본값 사용 — 위임 (전역 quick_fix) (전역)`으로 읽힌다.

#### 5.4 `unsetOptionLabel`·summary

변경 없음. `layerSummary`는 전환된 행을 `global`로 센다(의도된 표시: 전역 층이
공급). `EFFECTIVE_GROUPS`·`SETTING_LABELS`에는 `quick_fix_impl_model`을 넣지 않는다
— per-bead 카드는 Bead 키만 보여 주고, 이 키는 설정 다이얼로그 전용 행이다.

### 6. 무변경 확인 목록

- `server/worker/scheduler.js`·`receipt-check.js`·`policy.js`·`execution-defaults`
  projection loader: 무변경(canonical spec §4.3).
- `BEAD_APPLY_KEYS`(12)·`IMPL_PRESET_KEYS`(15)·`EXEC_SETTING_KEYS`: 무변경.
- per-bead 편집기(`exec-settings.js`)의 행 목록: 무변경(route만 이미 전달 중).

## 오류 처리 요약

| 상황 | 서버 | 클라이언트 표시 |
|---|---|---|
| kv 값이 카탈로그 밖/`auto` | 읽기 drop+`invalid_value` 경고, 쓰기 거부 | 설정 다이얼로그 배너(기존 경고 경로), 행은 unset |
| 카탈로그 교체로 저장값이 비호환이 됨 | 읽기에서 drop(값은 클라이언트에 안 옴) | unset으로 보임. `<값> (비호환)` 표시는 projection 카탈로그만 알고 runner catalog가 없을 때의 방어 |
| projection `supported=false` | — | `기본값 확인 불가` / 전환 없음 |
| 핀 `impl_runtime`과 유도 runtime 충돌 | — | 전환 없음(현행 `메인`) |
| `inherit` 핀 + controller_runtime 미상 | — | 전환 없음(fail-quiet) |

## 테스트 계획

RED → GREEN seam (이 저장소):

1. `server/worker/exec-enums.test.js` — `WORKSPACE_KV_KEYS`가 12키이며 마지막이
   `quick_fix_impl_model`, `impl_dispatch` 부재 유지, `PRESET_KV_KEYS`가 11키
   부분집합, `sessionDefaultEnums().quick_fix_impl_model`이 `auto` 없는 카탈로그
   토큰 전체. 기존 `keeps the workspace kv list a subset of the per-bead list`는
   "kv 전용 키 1개만 초과"로 바꾼다.
2. `server/ws/exec-settings-mutation.test.js`(또는 session-defaults 커버 파일) —
   `set-session-defaults`가 `quick_fix_impl_model=terra` 저장·readback, `auto`와 미지
   토큰 거부; 읽기가 미지 토큰을 `invalid_value:quick_fix_impl_model`로 drop.
3. `server/worker/exec-enums.test.js` — `PRESET_KV_KEYS`가 `quick_fix_impl_model`을
   포함하지 않고 `WORKSPACE_KV_KEYS`는 포함한다(키 목록 확장 뒤 preset 운반 목록에서
   제외됨을 고정하는 실제 RED seam; 상수가 아직 없으므로 편집 전 RED).
4. `app/utils/execution-defaults.test.js` — (a) `quick_fix_impl_model` 행 unset 라벨이
   `global.orchestration_model`이 있으면 그 모델(`메인 (orchestration 5.6-sol)` 등),
   없으면 projection fallback(`메인 (orchestration opus)`)을 따르고, 설정 시
   `compactModelId`; (b) route=quick_fix·핀 없음·kv `terra` → `impl_dispatch`
   `위임 (전역 quick_fix)`/global, `impl_runtime` `codex (유도)`, `impl_model` `5.6-terra`;
   (c) 핀 `impl_dispatch=main`이면 현행; (d) route=spec_backed면 현행; (e) 핀
   `impl_model=sol`이면 모델은 핀; (f) 핀 `impl_runtime=claude` + kv `terra` →
   전환 없음; (g) 무효 토큰 → `(비호환)`·전환 없음; (h) `buildOptionView`에 `route`를
   넘기면 quick_fix Bead의 `impl_dispatch` unset 라벨이 바뀐다.
5. `app/views/settings-dialog/session-model.test.js` — `WORKSPACE_KV_KEYS` 12키,
   `buildSessionDefaultsPatch`가 이 키를 diff에 포함.
6. `app/views/settings-dialog/index.test.js` — 실행 탭에 `quick_fix 구현 모델`
   select가 있고 `auto` 옵션이 없으며, queue의 `orchestration_model`이 projection
   fallback과 다를 때 unset 라벨이 queue 모델을 보인다.

회귀(RED→GREEN seam 아님): `server/ws/exec-preset-apply.test.js`에 workspace apply가
기존 kv의 `quick_fix_impl_model`을 보존한다는 단언(현행도 통과하는 보존 동작을 키
목록 확장 뒤에도 고정), 기존 `execution-defaults.test.js`의 quick_fix route 기본값
테스트, Pre-Handoff Validation(`npm run tsc`·`npm test`·`npm run lint`·`npm run prettier:write`·
`npm run build`).

## 구현 unit 후보 (advisory)

단일 유닛. 서버 enum·클라이언트 mirror·resolver·테스트가 같은 키 목록을 고정하므로
나누지 않는다.

## 수용 기준

1. `bd kv set workflow_session_defaults` 값에 `quick_fix_impl_model=terra`를 두면
   설정 다이얼로그가 그 행을 `5.6-terra`로 보여 주고, 지우면 `기본값 사용 — 메인
   (orchestration <모델>)`로 돌아간다.
2. `route=quick_fix`·`impl_dispatch` 핀 없는 Bead의 유효 실행 설정이 `실행 방식: 위임
   (전역 quick_fix) [전역]`, `위임 대상: codex (유도)`, `모델: 5.6-terra`를 보인다.
   핀 `impl_dispatch=main`이면 `메인`·`해당 없음`.
3. workspace preset 적용 후에도 kv의 `quick_fix_impl_model`이 남아 있다.
4. kv 키 미설정 워크스페이스에서 `resolveExecutionSettings`의 모든 행이 현행과 같다.
5. Pre-Handoff Validation 통과, PR → merge → `bdui-shared` 배포 증거 → closed.
