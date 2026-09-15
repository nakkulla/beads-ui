---
scope:
  - server/worker/exec-enums.js
  - server/worker/exec-enums.test.js
  - server/ws/exec-preset-handlers.js
  - server/ws/exec-preset-apply.test.js
  - app/views/settings-dialog/session-model.js
  - app/views/settings-dialog/session-model.test.js
  - app/views/detail-panel/index.js
  - app/views/detail-panel/index.test.js
  - app/views/detail-panel/effective-settings-view.js
  - app/views/detail-panel/effective-settings-view.test.js
  - app/views/detail-panel/effective-card.test.js
  - app/protocol.md
  - docs/adr/
---

# 이슈 프리셋 적용이 오케스트레이션 키도 Bead에 핀한다

## 문서 상태

- Bead: `UI-00lf`
- 경로: `spec_backed`; beads-ui 안에서 하나의 구현·검증·인도 묶음으로 처리한다.
- 기준: `main` / `7012fb1c26636dc912d12587239f1280c8ed1863`
- 상태: 사용자 검토용 완성 초안. 구현·스펙 게이트 승인 전이다.

## 1. 사용자 결과와 확인한 원인

이슈 상세에서 실행 프리셋을 적용하면 그 이슈의 총괄(오케스트레이션) 모델·effort·속도까지
프리셋대로 핀되고, "오케스트레이션 3키는 Bead에 핀할 수 없어 건너뛰었습니다" 안내는
사라진다.

현재 `apply-impl-preset`은 `BEAD_APPLY_KEYS` 14키(리뷰 3×3, 구현 5키)만 `bd update`로
기록하고, 응답에 `skipped_orchestration_keys` 6키를 항상 실어 이슈 상세가 토스트와 카드
힌트로 "핀 불가"를 안내한다(`server/ws/exec-preset-handlers.js`
`presetSettingsForIssue`·`handleApplyImplPreset`, `app/views/detail-panel/index.js`
`applyImplPreset`, `effective-settings-view.js` `data-preset-skip-notice`). 이 전제는
2026-08-20 실행 탭 프리셋 설계 결정 4("큐 전역이라 핀 불가")에서 왔고 ADR 0032 →
UI-s8qn → UI-7yh2가 "오케스트레이션 키는 핀하지 않는다"로 승계했다.

그러나 워커 런타임은 처음부터 Bead 핀을 먼저 읽는다. 시도 디스패치는
`exec-preset-coordinator.js resolveForDispatch`가 큐 값(quick_fix route면
`quick_fix_orchestration_*` ?? 일반)을 `defaults`로 넘기고, `policy.js resolveExecSettings`가
오케스트레이션 3키를 **Bead metadata > 큐 > 폴백** 순으로 고른다. `attach.js`는 Bead
metadata의 `orchestration_model`·`orchestration_effort`·`orchestration_speed`를 스냅샷에
싣는다(2026-07-16 UI-lo1k부터). 이슈 상세의 수동 편집(`update-exec-settings`)도 이 3키를
핀하고, 유효 실행 설정 카드는 `핀` 배지로 보여준다. 즉 "핀 불가"는 런타임과 어긋난 서술이고,
막힌 곳은 프리셋 적용 경로 하나뿐이다.

dotfiles 계약(`workflow-state.yaml metadata`)은 `orchestration_model`을
`write_rule: user_only_never_controller`로 둔다. 이슈 상세에서 사용자가 누르는 프리셋 적용은
사용자 쓰기이므로 `impl_dispatch`(`user_write_only`)를 `BEAD_APPLY_KEYS`에 넣은 것과 같은
논리로 허용된다. 계약 키·어휘는 바뀌지 않는다.

## 2. 검토한 접근과 선택

1. **이슈 핀 키 집합을 14+3=17키로 넓히고 quick_fix는 구현 키와 같은 규칙으로 역매핑**(선택).
   런타임·수동 편집과 일치하고, 적용 의미("적용 뒤 Bead는 그 프리셋만 서술한다")가 키 그룹마다
   갈리지 않는다. 사용자 결정: 프리셋은 항상 총괄·워커 값을 담는 전체 프로파일이므로 없는 값은
   워크스페이스 기본으로 떨어지는 것이 맞고, quick_fix도 프리셋에 값이 있으니 같은 규칙으로 맞춘다.
2. 오케스트레이션은 set만 하고 unset하지 않는다 — 수동 핀은 보존되지만 규칙이 그룹마다 달라
   설명이 필요하고, 프리셋 A → B 전환 시 A의 오케스트레이션 값이 남는다. 사용자가 1을 골랐다.
3. 토스트 문구만 안내형으로 바꾸고 동작은 유지 — 사용자가 기대한 결과(이슈별 총괄 모델)를 주지
   못한다.

`BEAD_APPLY_KEYS` 상수에 3키를 직접 넣지 않는다. 그 상수는 `IMPL_PRESET_KEYS` 25키의 재료라
직접 넣으면 프리셋 키가 중복된다. 이슈 핀 전용 집합을 따로 둔다.

## 3. 결정

1. **이슈 핀 키 집합 `BEAD_PIN_KEYS`(17키)를 둔다.** `[...ORCHESTRATION_KEYS, ...BEAD_APPLY_KEYS]`
   순서로 `server/worker/exec-enums.js`에 정의하고 `app/views/settings-dialog/session-model.js`가
   같은 이름으로 미러한다. `BEAD_APPLY_KEYS`(14키)·`IMPL_PRESET_KEYS`(25키)·`PRESET_KV_KEYS`는
   그대로다. 실행 프리셋 저장 형식·전역 적용(`apply-impl-preset-global`)은 바뀌지 않는다.
2. **이슈별 적용은 17키를 교체한다.** `buildApplyImplPresetArgs`는 `BEAD_PIN_KEYS`마다 프리셋에
   있으면 `--set-metadata`, 없으면 `--unset-metadata`를 한 argv에 담는다. 프리셋에 없는
   오케스트레이션 키는 unset되어 그 이슈의 총괄 값은 워크스페이스 큐(quick_fix route면 quick_fix
   레인 ?? 일반)로 떨어진다 — 프리셋이 "기본값 사용"으로 저장한 축은 워크스페이스 기본이 된다.
   수동으로 핀해 둔 오케스트레이션 값은 다른 키와 마찬가지로 프리셋 값으로 대체된다.
3. **quick_fix route 이슈는 오케스트레이션도 역매핑한다.** `presetSettingsForIssue`는
   `route=quick_fix`이면 `orchestration_model`·`orchestration_effort`·`orchestration_speed`
   각각을 `preset[QUICK_FIX_LANE_MAP[key]] ?? preset[key]`로 만든다. 그 외 route는 일반 키
   그대로다. Bead에 쓰는 이름은 route와 무관하게 `orchestration_*`이며, 이는 `policy.js`가
   읽는 이름과 같다. 구현 4키·`impl_runtime` 역매핑 규칙은 현행 그대로다.
4. **투영된 오케스트레이션 3키는 핀 전에 모델 기준으로 검증한다.** `exec-enums.js`에
   `validateOrchestrationPin(settings, { catalog })`를 두어 `orchestration_model`이 카탈로그
   모델이고, `orchestration_effort`가 그 모델의 `modelOrchestrationEfforts`에, `orchestration_speed`가
   그 모델 러너의 `modelSpeedTiers`에 들어가는지 본다. 모델이 없으면 effort·speed는 각 키의
   전역 enum(`execSettingEnums`)만 본다. 실패는 `{ ok:false, reason:'invalid_orchestration_<key>' }`
   이고 핸들러는 `impl_preset_incompatible:<reason>`으로 거절하며 metadata를 쓰지 않는다.
   quick_fix 역매핑으로 일반 모델과 quick_fix effort가 섞이는 조합은 지금도 디스패치 시점에
   `policy.js resolveExecSettings`가 `invalid_reason`을 내고 `scheduler.js`가 디스패치를 거절한다.
   이 검증은 그 거절을 프리셋 적용 시점으로 앞당겨 사용자가 적용 직후에 알게 하는 것이다.
5. **`skipped_orchestration_keys`는 폐기한다.** 서버 응답에서 필드를 제거하고, 클라이언트의
   상태 변수·토스트 분기·`data-preset-skip-notice` 힌트를 제거한다. 성공 토스트는
   "실행 프리셋을 적용했습니다." 하나다. `app/protocol.md`는 이 필드를 문서화한 적이 없고
   소비자는 이 저장소의 상세 패널뿐이라 호환 분기를 두지 않는다. 구 클라이언트는 필드 부재를
   빈 배열로 읽어 힌트를 그리지 않는다.
6. **적용 결과 표시는 기존 층 모델로 충분하다.** 적용 뒤 서버가 돌려주는 readback 이슈로 유효
   실행 설정 카드가 다시 그려지고, 오케스트레이션 3행은 `핀` 배지와 값을 보인다. 카드의 표시
   우선순위는 `app/utils/execution-defaults.js resolveExecutionSettings`가 이미 핀 > (route가
   quick_fix면 `quick_fix_*` 전역값) > 일반 전역값 순으로 고르므로 디스패치 해석과 같다. 새 표시
   요소는 없고 표시 로직은 건드리지 않는다.
7. **ADR UI-7yh2의 "오케스트레이션 키는 핀하지 않는다" 조항을 supersede한다.** 나머지 조항
   (25키 프리셋, 단일 전역 적용, workflow_mode 제외, quick_fix 역매핑, UI-s8qn 승계분)은 새
   ADR이 그대로 승계한다.

## 4. 구성 요소와 데이터 흐름

- `server/worker/exec-enums.js` — `BEAD_PIN_KEYS` 상수와 `validateOrchestrationPin`.
  `server/worker/runner-catalog.js`의 기존
  `modelOrchestrationEfforts`·`modelSpeedTiers`·`modelRunner`를 재사용한다.
- `server/ws/exec-preset-handlers.js` — `buildApplyImplPresetArgs`가 `BEAD_PIN_KEYS`를 돈다.
  `presetSettingsForIssue`가 오케스트레이션 3키를 투영(quick_fix면 역매핑)한 뒤
  `validateOrchestrationPin`을 거치고, 기존 `validateImplSettings` 검사는 그대로 둔다.
  `handleApplyImplPreset` 응답은 `{ applied, conflict, revision, issue }`가 된다. 주석의
  "14 session keys"는 "17 pin keys"로 고친다.
- `app/views/settings-dialog/session-model.js` — `BEAD_PIN_KEYS` 미러. 서버와의 동일성은 양쪽
  테스트가 각자 단언한다(기존 `BEAD_APPLY_KEYS` 방식).
- `app/views/detail-panel/index.js` — `skipped_orchestration_keys` 상태와 그 초기화 지점
  전부, 토스트 분기, 뷰 모델 필드를 제거한다.
- `app/views/detail-panel/effective-settings-view.js` — 모델 typedef의
  `skipped_orchestration_keys`와 `data-preset-skip-notice` 템플릿을 제거한다.
- `app/protocol.md` — `apply-impl-preset` 항목을 "17키(오케스트레이션 3키 + 14 세션 키)를
  교체하고, quick_fix route는 오케스트레이션·구현 축 모두 `quick_fix_*` 값을 우선한다"로
  고친다.
- 데이터 흐름: 클라이언트 `apply-impl-preset {id, preset_id, expected_revision}` → 서버 프리셋
  해석·호환 검사 → `bd show` route 읽기 → 17키 투영 + 오케스트레이션 검증 → `bd update`
  set/unset 한 번 → `bd show` readback → 응답 → 카드 재렌더. 큐·kv는 건드리지 않는다.

## 5. 오류 처리

- 투영된 오케스트레이션 값이 검증에 실패하면 `impl_preset_incompatible:invalid_orchestration_<key>`
  로 거절하고 metadata를 쓰지 않는다. 클라이언트는 기존 "실행 프리셋 적용 실패" 토스트다.
- `bd update`·readback 실패 처리는 현행(`bd_update_failed`·`bd_readback_failed`) 그대로다.
- 디스패치 시점의 fail-closed(`policy.js`)는 그대로 남는 2차 안전망이다.

## 6. 테스트

- `server/worker/exec-enums.test.js` — `BEAD_PIN_KEYS`가 17키이고 오케스트레이션 3키 뒤에
  `BEAD_APPLY_KEYS`가 오며, `IMPL_PRESET_KEYS`는 25키 그대로임을 단언.
  `validateOrchestrationPin`: 모델 없는 effort·speed는 전역 enum, 모델 있는 effort는 모델
  범위, 러너가 지원하지 않는 `fast`는 거절.
- `server/ws/exec-preset-apply.test.js` — 기존 "names exactly the fourteen session keys and no
  orchestration key"를 "17키를 쓴다"로 바꾼다. 일반 이슈 적용이 `orchestration_*`를 set하고
  프리셋에 없는 오케스트레이션 키를 unset하는지, quick_fix 이슈가
  `quick_fix_orchestration_*`를 `orchestration_*`로 핀하는지, 역매핑 조합이 모델 범위를 벗어나면
  `impl_preset_incompatible`로 거절하고 `bd update`를 호출하지 않는지, 응답에
  `skipped_orchestration_keys`가 없는지.
- `app/views/settings-dialog/session-model.test.js` — `BEAD_PIN_KEYS` 미러 단언; 기존
  "BEAD_APPLY_KEYS에 orchestration_ 없음" 단언은 유지.
- `app/views/detail-panel/index.test.js`·`effective-card.test.js`·`effective-settings-view.test.js`
  — 힌트·토스트 분기 제거에 맞춰 관련 단언을 지우고, 적용 성공 토스트가 한 문장인지 확인.

## 7. 검증 번들

Pre-Handoff Validation 그대로: `npm run tsc`, `npm run lint`,
`npx prettier --write <변경 파일>`, `npx vitest run --reporter=dot`. 로컬 확인은 이슈 상세에서
프리셋 적용 뒤 유효 실행 설정 카드의 오케스트레이션 3행이 `핀`으로 바뀌는 것과, `bd show
<id> --json`에 `orchestration_model`이 기록되는 것이다.

## 경계·후속

- 결정: 실행 프리셋 저장 형식(25키)과 전역 적용 프로토콜은 바꾸지 않는다 — 이 설계는 이슈별
  적용 경로만 다룬다.

## 결정 (ADR 후보)

- 전제: ADR UI-7yh2 — 25키 프리셋, 단일 전역 적용, workflow_mode 제외, quick_fix route 이슈의
  구현 키 역매핑을 그대로 따른다. "오케스트레이션 키는 핀하지 않는다" 한 조항만 뒤집는다.
- **이슈별 프리셋 적용은 오케스트레이션 3키를 포함한 17키를 Bead에 교체 핀하고, quick_fix
  route는 오케스트레이션도 `quick_fix_*` 값을 우선 역매핑한다** — 되돌리기 어려움: 성립(핀 키
  집합·응답 형식·ADR 전제가 함께 바뀐다) / 맥락 없이 놀라움: 성립("왜 총괄 모델이 이슈마다
  다른가"는 런타임의 Bead 우선 해석을 알아야 이해된다) / 실제 트레이드오프: 성립(전부 교체 vs
  set-only vs 안내 문구만 변경; 전자는 규칙이 하나지만 수동 핀을 대체하고, 중간은 수동 핀을
  보존하지만 그룹마다 규칙이 갈린다). `summary`: "이슈별 프리셋 적용은 오케스트레이션 3키를
  포함한 17키(BEAD_PIN_KEYS)를 Bead에 교체 핀하고 quick_fix route는 오케스트레이션도 quick_fix
  값을 우선 역매핑하며 투영된 오케스트레이션 값은 모델 기준으로 검증한다;
  skipped_orchestration_keys는 폐기한다; 25키 프리셋·단일 전역 적용·workflow_mode 제외·구현 키
  역매핑·UI-s8qn 승계분은 UI-7yh2에서 승계한다" → ADR, supersede UI-7yh2

## 구현 unit 후보

- 단일 unit: 서버 키 집합·검증·핸들러와 클라이언트 미러·표시 제거·프로토콜 문서를 한 PR로
  묶는다. 서버와 번들이 함께 배포되므로 나눌 이유가 없다.
