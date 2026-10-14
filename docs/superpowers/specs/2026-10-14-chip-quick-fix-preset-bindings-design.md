---
scope:
  - server/exec-preset-store.js
  - server/worker/exec-preset-coordinator.js
  - server/ws/exec-preset-handlers.js
  - app/protocol.md
  - app/main.js
  - app/data/exec-preset-store.js
  - app/utils/chip-preset-binding.js
  - app/views/worker/lanes.js
  - app/views/worker/index.js
  - app/views/monitor/index.js
  - app/views/detail-panel/index.js
  - app/views/settings-dialog/chip-bindings-tab.js
---

# UI-rd2m — 판정 칩마다 quick fix 프리셋도 하나 매고, quick_fix 이슈에서 칩을 누르면 그 프리셋을 적용한다

## 0. 사용자 결정 (2026-10-14)

- 판정 칩 `복잡`·`frontend`·`backend`의 클릭은 quick_fix 이슈에서도 프리셋을 적용해야 한다.
  지금은 그 이슈에서 사유 팝업만 뜬다.
- quick fix 쪽 프리셋도 모니터 일괄 창 `칩` 탭에서 일반 프리셋과 **함께** 고른다.
- 그 밖의 칩 규칙(클릭으로만 적용, 마지막 클릭이 이김, 재클릭은 첫 클릭 전 핀으로 복원, 서버
  전역 바인딩)은 그대로다.

## 1. 검증된 전제

기준 커밋 `519fc83eaa6f6a59be86fe26e9e80dcfdbb64ad5`.

- 바인딩은 `exec-presets.json` 최상위 `chip_bindings { complex, frontend, backend }`이고 값은
  general 프리셋 id 또는 `null`이다 — `server/exec-preset-store.js:19`, `:125`.
- `bindChip`은 `applies_to=general`이 아닌 프리셋을 거부한다 — `server/exec-preset-store.js:482-496`.
- 프리셋 삭제가 같은 mutation에서 그 id를 가리키는 바인딩을 비운다 — `server/exec-preset-store.js:465`.
- `chip-preset-toggle`은 `route=quick_fix` 이슈를 쓰기 전에 `preset_route_mismatch`로 거부하고,
  바인딩은 `snapshot.chip_bindings[chip]` 하나만 읽는다 — `server/ws/exec-preset-handlers.js:1032`, `:1078`.
- 이슈 적용 헬퍼 `presetSettingsForIssue`는 이미 계열을 안다: route와 계열이 같으면 그 계열의 키
  집합(`quick_fix`면 8키)을 교체한다 — `server/ws/exec-preset-handlers.js:421-447`,
  `server/worker/exec-enums.js:326`, `:350`.
- quick fix 8키는 canonical 이름이고 `BEAD_PIN_KEYS` 17키의 부분집합이다. 그래서 17키 기준의
  복원점 저장과 복원 argv가 quick_fix 이슈에도 그대로 맞다 — `server/worker/exec-enums.js:132-146`, `:216`,
  `server/ws/exec-preset-handlers.js:964`, `:988`.
- attempt 기록의 `dispatchPreset`은 이슈의 `applied_exec_preset`이 이슈 계열과 같은 프리셋을 가리킬 때
  그것을 쓴다. 이미 계열을 구분하므로 바꿀 필요가 없다 — `server/worker/exec-preset-coordinator.js:244-275`.
- 카드의 어긋남 계산 `presetDeviation`은 route의 계열 키 집합으로 비교한다 —
  `app/views/detail-panel/effective-settings.js:374`, `:382`.
- 클라이언트 판정 `chipPresetBinding`은 `route=quick_fix`이면 `null`(팝업 칩)을 돌려준다 —
  `app/utils/chip-preset-binding.js:59`.
- 팝업 안내 문구가 quick fix 이슈를 따로 말한다 — `app/views/worker/lanes.js:4762-4766`.
- `칩` 탭은 general 프리셋만 나열하고 머리말이 "quick fix 이슈에는 적용되지 않습니다"라고 말한다
  — `app/views/settings-dialog/chip-bindings-tab.js:18-19`, `:63`.
- 서버 스냅샷 투영 `snapshot()`은 `chip_bindings` 하나만 싣고, 숨긴(legacy) 프리셋을 가리키는 값을
  `null`로 투영한다 — `server/worker/exec-preset-coordinator.js:150-168`.
- 브라우저의 `impl-presets-snapshot` 수신 핸들러는 `chip_bindings`만 저장소에 넘긴다 — `app/main.js:354-365`.
- 클라이언트 스냅샷 저장소가 `chip_bindings`를 칩 어휘로 좁히고, 응답에 그 필드가 없으면 직전 값을
  유지한다 — `app/data/exec-preset-store.js:26-80`.
- 바인딩 op `handleImplPresetBind`는 payload 형식 오류에 `bad_request`, 계열이 다른 프리셋에
  `preset_route_mismatch`를 돌려준다 — `server/ws/exec-preset-handlers.js:891`, `:921`.
- 칩 토글 클라이언트 `createChipPresetToggle`은 토스트의 프리셋 이름을 `chip_bindings[chip]`에서만 찾고,
  conflict 응답의 `chip_bindings`만 저장소에 넣는다 — `app/utils/chip-preset-binding.js:223`, `:240`.
  `칩` 탭도 응답의 `chip_bindings`만 넣는다 — `app/views/settings-dialog/chip-bindings-tab.js:98`.
- 세 탭(워커·모니터·이슈 상세)이 칩 문맥에 `bindings: state.chip_bindings`를 넘긴다 —
  `app/views/worker/index.js:3049`, `app/views/monitor/index.js:2436`, `app/views/detail-panel/index.js:1275`.

## 2. 검토한 접근과 선택

**저장 형태.** (a) 최상위에 같은 모양의 맵 `quick_fix_chip_bindings { complex, frontend, backend }`를
더한다 — **선택**. 기존 `chip_bindings`의 모양·의미(general 바인딩)가 그대로라 지금 읽는 곳과 낡은
클라이언트가 깨지지 않는다. 같은 파일, 같은 `revision` CAS, 같은 스냅샷 채널을 쓴다. (b) 칩마다
`{ general, quick_fix }` 객체로 바꾼다 — 읽는 곳 전부와 파일 이행이 함께 움직여야 하는데 얻는 것이
없다. (c) 프리셋 하나가 두 계열을 겸한다 — 계열 분리(UI-u6ud-10)를 뒤집는다.

**바인딩 op.** 새 op를 두지 않고 `impl-preset-bind`에 `applies_to`를 더한다(없으면 `general`).
해제(`preset_id: null`)도 어느 맵을 비울지 알아야 하므로 계열은 프리셋 id에서 추론하지 않고
명시한다.

## 3. 서버

### 3.1 상태

- `exec-presets.json`에 `quick_fix_chip_bindings`를 더한다. 키 어휘는 `CHIP_BINDING_KEYS`, 값은
  `applies_to=quick_fix` 프리셋 id 또는 `null`이다. 필드가 없거나 어휘 밖 키가 있으면
  `chip_bindings`와 같은 규칙으로 정규화한다. 기존 파일은 이행 없이 "셋 다 비어 있음"으로 읽힌다.
- `chip_bindings`를 싣는 모든 곳이 `quick_fix_chip_bindings`도 함께 싣는다: 저장소의 mutation·CAS
  거부 응답(`server/exec-preset-store.js`), 코디네이터의 스냅샷 투영
  (`server/worker/exec-preset-coordinator.js` `snapshot()`), ws 핸들러의 스냅샷 푸시·bind·toggle
  conflict 응답(`server/ws/exec-preset-handlers.js`). 숨긴(legacy) 프리셋을 가리키는 값은
  `chip_bindings`처럼 스냅샷 투영에서 `null`로 바꾼다.

### 3.2 변경

- `impl-preset-bind { expected_revision, chip, preset_id, applies_to? }` — `applies_to`가
  `quick_fix`면 `quick_fix_chip_bindings[chip]`, 아니면 `chip_bindings[chip]`을 바꾼다. 가리키는
  프리셋의 `applies_to`가 요청 계열과 다르면 지금 코드처럼 `preset_route_mismatch`로 거부한다.
  어휘 밖 `applies_to`는 다른 payload 형식 오류와 같이 `bad_request`다.
- `impl-preset-delete`는 같은 mutation에서 두 맵 모두의 그 id를 비운다.

### 3.3 `chip-preset-toggle`

판정 표를 바꾼다. 이슈 계열 `profile`은 `route === 'quick_fix'`이면 `quick_fix`, 그 밖(route
없음 포함)은 `general`이다. 이 규칙은 `presetSettingsForIssue`와 같다.

| 이슈 상태 | 동작 |
| --- | --- |
| 그 계열 맵의 `[chip]`이 `null` | 오류 코드 `chip_unbound`(현행 코드 그대로), 쓰기 없음 |
| `chip_preset_source === chip` 이고 `applied_exec_preset === 그 계열 바인딩 id` | 복원(현행 §4.3 그대로) |
| 그 밖 | 그 계열 바인딩 프리셋을 적용(현행 §4.2 그대로; 교체 키 집합은 `presetSettingsForIssue`가 계열로 정한다) |

- `route=quick_fix` 거부 분기는 없앤다. `preset_route_mismatch`는 판정 이후 프리셋과 route가
  어긋날 때만 남는다(정상 경로에서는 오지 않는다).
- 복원점(`chip_preset_restore`)·복원 argv·전이 직렬화는 바꾸지 않는다. 17키 기준이라 8키 적용에도
  맞다(§1).
- 결정: 적용 뒤 이슈의 route가 바뀌어도(예: general 칩 적용 뒤 quick_fix 핀) 이슈를 훑지 않는다.
  다음 클릭은 새 계열 바인딩과 비교되므로 일치하지 않아 "적용"이 되고, 복원점은 첫 클릭 전 값을
  그대로 지킨다 — 복원 대상이 언제나 첫 클릭 전이라는 현행 규칙과 같다.

## 4. 클라이언트

### 4.1 스냅샷 저장소와 칩 문맥

- 브라우저 수신 핸들러(`app/main.js`)가 스냅샷의 `quick_fix_chip_bindings`도 저장소에 넘긴다.
  `exec-preset-store`가 그 값을 같은 규칙으로 좁히고, 응답에 없으면 직전 값을 유지한다.
- 응답을 저장소에 넣는 곳(칩 토글 conflict, `칩` 탭의 bind 응답)은 두 맵을 함께 넣는다.
- 칩 문맥(`ChipPresetContext`)에 `quick_fix_bindings`를 더하고, 세 탭이 스냅샷에서 함께 넘긴다.
- `chipPresetBinding`은 quick_fix 이슈를 거르지 않고, 이슈 route로 고른 맵에서 바인딩을 찾는다.
  상태(`applied`·`diverged`·`unapplied`)와 클릭 의미(적용/복원)는 그 바인딩으로 지금과 같은 규칙에 따라
  정한다. `presetDeviation`은 이미 route 계열로 비교한다.
- 그 계열 바인딩이 없는 칩은 지금처럼 사유 팝업이다(fail-quiet). 팝업 안내 줄은 quick fix 이슈에서
  "quick fix 프리셋을 칩에 매려면 모니터 탭 ⚙ → 칩", 그 밖에서는 지금 문구다.
- 클릭 뒤 토스트(`<칩> → <프리셋 이름> 적용`)의 이름은 응답 `issue`의 route 계열 맵에서 찾는다.
  지금은 `chip_bindings`에서만 찾는다(§1).
- 워커·모니터·이슈 상세가 같은 `chipPresetBinding`을 읽으므로 두 탭의 카드 동일성은 그대로다.

### 4.2 `칩` 탭

- 행마다 칩 이름 뒤에 `<select>` 두 개를 둔다: `일반`(general 프리셋 목록)과 `quick fix`(quick_fix
  프리셋 목록). 각 select는 `없음` + 그 계열 프리셋이고 비호환 프리셋은 `disabled`다. 고르는 즉시
  `impl-preset-bind`에 그 계열의 `applies_to`를 실어 보낸다. conflict·실패 처리는 지금과 같다.
- 두 select의 머리글(열 이름)은 `일반`·`quick fix` 한 줄로 행 위에 한 번 둔다. 부품은 기존
  `.ui-select`이고 새 원시 값은 쓰지 않는다(`docs/design-system.md`).
- 머리말: "칩을 클릭하면 이슈 route에 맞는 쪽 프리셋이 그 이슈에 적용됩니다 — quick fix 이슈는
  quick fix 열, 그 밖은 일반 열. 다시 클릭하면 클릭 전 설정으로 돌아갑니다."
- 결정: 탭 위치(모니터 일괄 창에만)와 즉시 저장 동작은 바꾸지 않는다 — 서버 전역 값을 저장소
  창에 섞지 않는 UI-u6ud-10 조항을 그대로 따른다.

## 5. 프로토콜

`app/protocol.md`의 `impl-preset-bind`·`impl-presets-snapshot`·`chip-preset-toggle` 서술을 §3에 맞춘다
(`applies_to` 인자, `quick_fix_chip_bindings` 필드, quick_fix 이슈 거부 삭제).

## 6. 검증

- 서버 단위 테스트: `quick_fix_chip_bindings` 부재·어휘 밖 키 정규화; `applies_to: 'quick_fix'` bind가
  quick fix 맵에만 쓰고, general 프리셋 id를 quick fix 맵에 매면 거부(반대도); delete가 두 맵을 비움;
  코디네이터 스냅샷 투영과 CAS 거부·conflict 응답에 두 맵이 실리고 숨긴 프리셋을 가리키는 quick fix
  값이 `null`로 투영됨; toggle이 quick_fix 이슈에 quick fix 바인딩을 적용(8키 교체 +
  `applied_exec_preset` + 칩 두 키), 같은 칩 재클릭이 복원, quick fix 바인딩이 없으면 `chip_unbound`이고
  쓰기 없음, route 없는 이슈는 general 바인딩.
- 클라이언트 단위 테스트: `chipPresetBinding`이 quick_fix 이슈에서 quick fix 맵을 읽음(바인딩 있음 →
  bound·상태, 없음 → `null`); 팝업 안내 문구 두 갈래; `칩` 탭이 행마다 두 select를 그리고, 계열별
  목록과 `applies_to`를 실은 op를 보냄; 저장소의 응답 누락 시 직전 값 유지.
- 카드 동일성 테스트(워커·모니터)가 quick_fix 이슈의 bound 칩에서도 통과.
- 스크린샷 확인: 일괄 창 `칩` 탭(두 열), quick_fix 이슈 후보 카드의 bound 칩.
- Pre-Handoff Validation 전체(`npm run tsc`·`lint`·prettier·vitest).

## 구현 unit 후보

- unit-01 전부(서버 §3 + 클라이언트 §4 + 프로토콜 §5). 표면이 작아 한 번에 처리한다.

## 경계·후속

- 관찰: 기존 quick_fix 이슈에 프리셋을 소급 적용하지 않는다 — 칩 클릭으로만 적용된다(§0).
- 관찰: quick fix 열은 처음에 비어 있다. 사용자가 `칩` 탭에서 고른다.

## 결정 (ADR 후보)

- 전제: ADR UI-u6ud-10 — 프리셋 정체성(계열별 id 하나, 대칭 비교, `dispatchPreset` 분리), 칩 클릭의
  적용·복원 규칙과 이슈별 직렬화, 바인딩 편집 위치를 따른다. 뒤집는 것은 "바인딩은 general
  프리셋만 가리키고 quick_fix 이슈 클릭은 거부한다"는 조항 하나다.
- 판정 칩 클릭이 이슈 route 계열에 맞는 바인딩을 적용하는 것 — 칩마다 general·quick_fix 바인딩을
  하나씩 두고 quick_fix 이슈에서도 칩 클릭이 이슈 핀을 쓴다. 되돌리기 어렵다 —
  `exec-presets.json` 스키마(`quick_fix_chip_bindings`), `impl-preset-bind`·`chip-preset-toggle`
  프로토콜, 세 탭의 칩 판정, `칩` 탭이 함께 움직여야 되돌릴 수 있고, quick_fix 이슈에 칩 키가 남는다.
  맥락 없이는 놀랍다 — 같은 칩이 이슈 route에 따라 다른 프리셋을 적용하는 이유가 칩 위에 보이지
  않는다. 진짜 트레이드오프가 있다 — 칩별 객체로 바꾸는 저장 형태, 프리셋 하나가 두 계열을 겸하는
  대안을 버렸다(§2). UI-u6ud-10과 소비자가 같으므로 그 ADR을 대체해 남는 조항을 전부 다시 적는다.
  `summary`: "실행 프리셋은 applies_to 계열별 id 하나가 정체성이고 읽을 때 계열 키 집합을 대칭 비교하며 dispatchPreset과 카드 비교는 분리한다; 판정 칩 복잡·frontend·backend는 칩마다 general·quick_fix 서버 전역 바인딩을 하나씩 갖고 클릭은 이슈 route 계열의 바인딩 프리셋을 그 이슈에 적용하며 재클릭은 첫 클릭 전 핀으로 되돌리고 그 전이는 같은 워크스페이스·이슈별로 요청 순서대로 직렬화한다; 칩 바인딩 편집은 모니터 일괄 창의 서버 전역 탭에만 있고 저장소 하나를 편집하는 창에는 섞지 않는다" → ADR, supersede UI-u6ud-10
- quick fix 바인딩을 같은 모양의 별도 최상위 맵으로 두는 것 — 필드 하나를 옮기는 일이라 되돌리기
  어렵지 않다 → ADR 아님
