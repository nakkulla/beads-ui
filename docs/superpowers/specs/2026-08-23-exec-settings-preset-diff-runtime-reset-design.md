---
scope:
  - app/views/settings-dialog/index.js
  - app/views/settings-dialog/index.test.js
  - app/views/settings-dialog/session-model.js
  - app/views/settings-dialog/session-model.test.js
  - app/styles.css
---

# 실행 설정 — 프리셋 diff 미리보기·적용/덮어쓰기 분리와 runtime 변경 시 비호환 모델 리셋

## 배경과 목적

⚙ 설정 다이얼로그 › 실행 설정(`app/views/settings-dialog/index.js` `executionPane`)의
프리셋 바는 `[실행 프리셋▾][전역 기본값으로 적용][이름][갱신|저장][삭제]`다. 세 가지
문제가 있다.

1. 프리셋을 고르면 `preset_choice`만 바뀌고 화면에는 아무 변화가 없어, 무엇이
   어떻게 바뀔지 모른 채 적용하게 된다. 서버의 전역 적용
   (`apply-impl-preset-global`, `server/ws/exec-preset-handlers.js`)은 **전체
   치환**이라 프리셋에 없는 키는 워크스페이스 기본값에서 해제되는데, 이 사실이
   화면에 드러나지 않는다.
2. 「갱신」은 적용이 아니라 **현재 설정으로 선택한 프리셋을 덮어쓰는** 버튼
   (`onSavePreset`)이다. "프리셋을 고르고 갱신"이라는 자연스러운 기대와 반대로
   동작해, 기대대로 누르면 프리셋이 현재 값으로 덮여 사라진다.
3. 위임 대상(`impl_runtime`)이나 오케스트레이션 런타임 필터를 바꿔도 기존 모델
   값이 남아 `claude · sol (비호환)`, `codex · opus` 같은 조합이 화면·저장에
   남는다. 드롭다운 목록 자체는 이미 runtime으로 좁혀지지만(`implModelOptions`,
   `orchestrationModelOptions`) 값 리셋이 없다. 디테일 패널은
   `normalizeImplTarget`(`app/views/detail-panel/exec-settings.js`)으로 이미
   리셋하므로 다이얼로그만 빠져 있다.

이 spec은 (a) 프리셋 선택 즉시 키별 `현재 → 프리셋` diff를 보여주고 「적용」으로만
반영하며, (b) 덮어쓰기/새 저장 버튼의 방향을 라벨로 드러내고, (c) runtime 변경
시 새 runtime에서 불법인 모델/effort를 UI에서 리셋해 한 번의 패치로 저장한다.
서버 변경은 없다. 사용자 결정: 덮어쓰기 확인 대화는 두지 않고, 서버 측 정합성
검사는 범위 밖이다.

## 설계

### 1. 프리셋 바 재구성 (`executionPane`)

```
[실행 프리셋▾] [적용]   [이름 입력] [현재 설정으로 덮어쓰기 | 새 프리셋 저장] [삭제]
┌ diff 미리보기 (프리셋 선택 시에만) ───────────────────────────────┐
│ 변경 3개 · 적용하면 아래와 같이 바뀝니다                            │
│ 위임 대상        claude     → codex                                  │
│ 구현 모델        opus       → sol                                   │
│ 워커 effort      기본       → high                                  │
│ 구현 속도        fast       → 기본(해제)                            │
└────────────────────────────────────────────────────────────────┘
```

| 컨트롤 | data 속성 | 라벨 | 활성 조건 | 핸들러 |
|---|---|---|---|---|
| 프리셋 select | (기존, `aria-label="실행 프리셋"`) | 변경 없음 | 항상 | 기존 — `preset_choice` 갱신 후 `doRender()` |
| 적용 | `data-preset-apply-global` | **`적용`** (기존 `전역 기본값으로 적용`에서 변경) | `preset_choice !== ''` **이고** diff 행이 1개 이상 | 기존 `onApplyPresetGlobally` 그대로 |
| 이름 입력 | (기존) | placeholder 변경 없음 | 항상 | 기존 |
| 덮어쓰기/저장 | `data-preset-save` | `preset_choice` 있으면 **`현재 설정으로 덮어쓰기`**, 없으면 **`새 프리셋 저장`** (기존 `갱신`/`저장`에서 변경) | 기존과 동일(항상 활성; 빈 설정·빈 이름은 기존 notify) | 기존 `onSavePreset` 그대로 |
| 삭제 | `data-preset-delete` | 변경 없음 | 변경 없음 | 변경 없음 |

덮어쓰기/저장 버튼에는 `title` 속성으로 방향을 한 번 더 적는다:
`현재 화면의 실행 설정을 이 프리셋에 저장합니다 (프리셋 → 설정 방향이 아님)` /
`현재 화면의 실행 설정을 새 프리셋으로 저장합니다`. 이 외의 프리셋 바 DOM·클래스는
유지한다.

### 2. diff 미리보기

#### 2.1 순수 빌더 `buildPresetDiff` (`session-model.js`)

```js
/**
 * @param {Record<string, string>} current   — executionDraftSettings()
 * @param {Record<string, string>} preset    — preset.settings (sparse)
 * @returns {{ rows: PresetDiffRow[], ignored_keys: string[] }}
 */
export function buildPresetDiff(current, preset)
```

- 비교 키와 순서는 전역 적용이 실제로 쓰는 집합과 같다:
  `[...WORKSPACE_KV_KEYS, ...ORCHESTRATION_KEYS]`(11 + 3 = 14개, 선언 순서).
  `impl_dispatch`는 전역 적용이 쓰지 않으므로(`user_write_only`) 비교하지 않고,
  프리셋이 그 키를 가지면 `ignored_keys`에 넣는다.
- 행 생성 규칙(각 키에 대해 `before = current[key] ?? null`,
  `after = preset[key] ?? null`):

  | before | after | kind | 포함 |
  |---|---|---|---|
  | 같음(둘 다 null 포함) | — | `same` | 제외 |
  | null | 값 | `added` | 포함 |
  | 값 | null | `removed` | 포함 |
  | 값 A | 값 B (A≠B) | `changed` | 포함 |

- `PresetDiffRow = { key, label, before: string|null, after: string|null, kind }`.
  `label`은 `PRESET_DIFF_LABELS[key]`(`session-model.js`에 새로 두는 14키 한국어
  라벨 맵 — 다이얼로그 행 라벨과 같은 어휘: 워크플로 모드 · 스펙 리뷰어 · 스펙
  리뷰 effort · 계획 리뷰어 · 계획 리뷰 effort · 구현 리뷰어 · 구현 리뷰 effort ·
  위임 대상 · 구현 모델 · 구현 effort · 구현 속도 · 워커 모델 · 워커 effort · 워커
  속도).
- 값은 저장 토큰을 그대로 보여준다(`opus`, `sol`, `auto`, `fast` …). null은
  `before` 쪽에서 `기본`, `after` 쪽에서 `기본(해제)`로 렌더한다(렌더 단계의
  표기이며 빌더는 null을 돌려준다).

#### 2.2 렌더 (`executionPane`)

- 위치: 프리셋 바(`.settings-dialog__preset-bar`) 바로 아래, 오케스트레이션
  그룹 위. 루트 `div.settings-dialog__preset-diff[data-preset-diff]`.
- 표시 조건: `preset_choice !== ''`이고 `presetState().presets`에서 그 id를 찾을 수
  있을 때만. 못 찾으면(방금 삭제됨 등) 렌더하지 않는다.
- `current`는 `executionDraftSettings()`다. 세션 값은 변경 즉시 자동 저장되므로
  보통 저장값과 같고, 저장 실패로 draft만 남은 경우에도 "화면에 보이는 값 대비
  diff"라는 의미는 유지된다.
- 내용:
  - 머리글: 행이 있으면 `변경 N개 · 적용하면 아래와 같이 바뀝니다`, 없으면
    `현재 설정과 같습니다 — 적용할 변경이 없습니다`.
  - 행: `<div class="settings-dialog__preset-diff-row" data-diff-kind="added|removed|changed">`
    안에 라벨 · before · `→` · after. `removed`의 after는 `기본(해제)`.
  - `ignored_keys`가 비어 있지 않으면 꼬리 한 줄:
    `impl_dispatch는 이슈별 값이라 전역 적용에서는 무시됩니다`.
- 「적용」 `?disabled`는 `rows.length === 0`일 때도 true다(§1 표).
- 스타일(`app/styles.css` settings-dialog 블록 근처): 바와 같은 `--bg-drawer`
  배경, 1px 실선 `--border-chip`, `--r-7` 모서리, 행은 4열 grid
  (`auto 1fr auto 1fr`), `data-diff-kind="removed"`의 after는
  `--text-secondary`, `added`/`changed`의 after는 `--text-title`. 모노 폰트는 값
  칸에만.

### 3. runtime 변경 시 비호환 모델/effort 리셋

#### 3.1 순수 규칙 `narrowImplTarget` (`session-model.js`)

```js
/**
 * @param {{ impl_runtime?: string, impl_model?: string, impl_effort?: string }} target
 * @param {any} catalog
 * @param {string|null} controller_runtime — inherit일 때의 컨트롤러 runtime, 모르면 null
 * @returns {{ impl_runtime: string|undefined, impl_model: string|undefined, impl_effort: string|undefined }}
 */
export function narrowImplTarget(target, catalog, controller_runtime)
```

- 유효 runtime: `impl_runtime`이 `claude`/`codex`면 그 값, `inherit`이면
  `controller_runtime`, 그 외(미설정)면 `null`.
- 유효 runtime이 `null`이면 **아무것도 바꾸지 않는다**(판단 불가 → 유지; 미설정
  runtime에서 모델만 고르는 현재 동작도 보존). 디테일 패널의
  `normalizeImplTarget`이 inherit+미상에서 모델을 비우는 것과 다르며, 이 차이는
  의도다 — 다이얼로그는 워크스페이스 기본값이라 runtime 없이 모델만 두는 것이
  계약상 합법이다(kv 모델의 runtime은 카탈로그에서 파생).
- 유효 runtime이 있으면:
  - `impl_model`: `auto`이거나 `implModelOptions(catalog, 유효 runtime)`에 있으면
    유지, 아니면 `undefined`(해제).
  - `impl_effort`: `auto`이거나 `implEffortOptions(catalog, 유효 runtime, 위에서
    정해진 모델 ?? auto)`에 있으면 유지, 아니면 `undefined`.
- `impl_runtime`은 항상 그대로 돌려준다.

#### 3.2 다이얼로그 연결 (`index.js`)

- `onSessionChange(key, value)`에서 `key ∈ {impl_runtime, impl_model, impl_effort}`면
  새 `onImplTargetChange(key, value)`로 보낸다. 그 함수는
  1. `session_draft`의 세 키 + 이번 변경으로 `target`을 만들고,
  2. `narrowImplTarget(target, runnerCatalog(), controllerRuntime())`을 적용해
     세 키를 `session_draft`에 반영(`undefined`면 키 삭제),
  3. `doRender()` 후 **한 번의** `saveSessionDefaults()`를 호출한다.
     `buildSessionDefaultsPatch`가 바뀐 키만 싣고 삭제는 `null`로 보내므로 서버
     요청은 기존 한 개 그대로다.
- `controllerRuntime()`은 오케스트레이션 모델의 runtime이다:
  `resolveExecutionSettings({ global: { orchestration_model: currentOrchestrationValues().orchestration_model ?? undefined }, execution_defaults: executionProjection(), runner_catalog: runnerCatalog() }).orchestration_model.value`를
  `modelRunnerOf`(`detail-panel/exec-settings.js`에서 import)에 넣은 결과,
  없으면 `null`. projection이 없고 queue 모델도 없으면 `null`이다.
- 오케스트레이션 런타임 필터(`worker_runtime_filter`, UI 전용) 변경 핸들러:
  필터가 `claude`/`codex`로 바뀌고 현재 `orchestration_model`(draft 우선, 없으면
  queue 값)이 `orchestrationModelOptions(catalog, 필터)`에 없으면
  `worker_draft.orchestration_model = null`로, 그리고 현재
  `orchestration_effort`가 `implEffortOptions(catalog, 필터, auto)`에 없으면
  `worker_draft.orchestration_effort = null`로 두고 `saveOrchestration()`을 한 번
  호출한다. 필터가 `전체`로 돌아갈 때는 아무것도 바꾸지 않는다. 모델이 이미
  `null`(기본)이면 건드리지 않는다 — 기본값이 다른 runtime의 모델이라도 그것은
  projection이 보여주는 워커 기본값이며 저장값이 아니다.
- 사용자에게 보이는 결과: runtime을 `claude`로 바꾸는 순간 `sol`이 `기본`으로
  돌아가고 `(비호환)` 옵션이 사라진다. 따로 알림은 띄우지 않는다.

### 4. 변경하지 않는 것

- 서버 핸들러·enum·프리셋 저장소(`exec-preset-store`, `exec-preset-handlers`,
  `session-defaults`)·WS 메시지 형식. 정합성 서버 검사는 별도 작업으로 남긴다.
- 디테일 패널의 프리셋 적용·`normalizeImplTarget`.
- 프리셋 select, 이름 입력, 삭제의 동작과 `onSavePreset`/`onApplyPresetGlobally`의
  요청 본문.
- 프리셋 바 밖의 실행 설정 행 구성·순서.

## 테스트 범위

`app/views/settings-dialog/session-model.test.js`
- `buildPresetDiff`: added/removed/changed 행만 만들고 `same`은 뺀다; 키 순서는
  `WORKSPACE_KV_KEYS` 뒤 `ORCHESTRATION_KEYS`; `impl_dispatch`는 비교하지 않고
  `ignored_keys`로 돌려준다; 빈 프리셋 vs 빈 현재값은 행 0개.
- `narrowImplTarget`: `claude`+`sol` → 모델·effort 해제; `codex`+`auto` 유지;
  runtime 미설정+`sol` 유지; `inherit`+controller `null`+`sol` 유지;
  `inherit`+controller `claude`+`sol` 해제; effort가 새 모델/runtime 합집합 밖이면
  해제, `auto`면 유지.

`app/views/settings-dialog/index.test.js`
- 프리셋 선택 시 `[data-preset-diff]`가 렌더되고 행 수·`data-diff-kind`·라벨이
  맞다; 프리셋 미선택 시 렌더되지 않는다.
- 현재 설정과 같은 프리셋을 고르면 "현재 설정과 같습니다" 문구와 함께
  `[data-preset-apply-global]`이 disabled다.
- 버튼 라벨: 선택 없음 → `새 프리셋 저장`, 선택 있음 → `현재 설정으로 덮어쓰기`,
  적용 버튼 라벨 `적용`. 기존 `updates the selected preset keeping its name`,
  `applies a preset with both revisions…` 테스트는 새 라벨/활성 조건에 맞춰
  갱신하되 요청 본문 단언은 유지한다.
- `impl_model=sol` 상태에서 위임 대상을 `claude`로 바꾸면 `set-session-defaults`
  요청이 **한 번** 가고 `values`에 `impl_runtime: 'claude'`와 `impl_model: null`이
  함께 실린다(effort가 불법이면 `impl_effort: null`도).
- 오케스트레이션 런타임 필터를 `codex`로 바꾸면 `orchestration_model=opus`가
  `null`로 패치되어 queue 저장 요청이 한 번 간다; 필터를 `전체`로 돌리면 요청이
  없다.

Pre-Handoff Validation: `npm run tsc`, `npm test`, `npm run lint`,
`npm run prettier:write`, 이후 `npm run build`로 `app/main.bundle.js`·`.map`을 갱신해
같은 델타에 포함한다.

## 수용 기준

1. 프리셋을 선택하면 `[data-preset-diff]`가 렌더되고, 각 행이 `현재 → 프리셋`으로
   읽히며 프리셋에 없는 키가 현재 설정에 있으면 `기본(해제)` 행으로 보인다.
2. `[data-preset-apply-global]`의 텍스트는 `적용`이고, 프리셋 미선택 또는 diff 행
   0개면 disabled, 그 외에는 활성이며 클릭 시 기존 `apply-impl-preset-global`
   요청을 보낸다.
3. `[data-preset-save]`의 텍스트는 프리셋 선택 시 `현재 설정으로 덮어쓰기`, 미선택
   시 `새 프리셋 저장`이고, 클릭 동작은 기존 `impl-preset-update`/`impl-preset-create`
   그대로다.
4. `narrowImplTarget`이 §3.1 표의 모든 경우를 테스트로 통과한다.
5. 위임 대상을 바꿔 모델이 불법이 되면 `set-session-defaults` 요청이 한 번만
   가고, 그 `values`에 runtime과 해제된 키(`null`)가 함께 실린다.
6. 오케스트레이션 런타임 필터를 바꿔 모델이 필터 밖이면 queue 패치 한 번으로
   `orchestration_model`이 `null`이 된다.
7. 서버 디렉터리(`server/`)에 변경이 없다.
8. `npm run tsc`·`npm test`·`npm run lint`가 통과하고 번들이 재빌드돼 있다.
