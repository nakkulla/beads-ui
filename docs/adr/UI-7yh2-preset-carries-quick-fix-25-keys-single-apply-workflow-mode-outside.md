---
id: UI-7yh2
title: 실행 프리셋은 quick_fix 키를 함께 담는 25키 프로파일이고 적용 한 번이 일반·quick_fix 키를 교체하며 workflow_mode는 프리셋 밖이다 — auto·inherit·probe 부재·폴스루·비원자성·capability gating은 UI-s8qn을 승계한다
status: accepted
date: 2026-09-10
summary: "실행 프리셋은 quick_fix 오케스트레이션·구현 키를 함께 담는 25키 워크스페이스 프로파일이고 적용 한 번이 kv·큐의 일반·quick_fix 키를 교체하며 프리셋에 없는 quick_fix 키는 unset되어 일반 프로파일로 폴스루한다; workflow_mode는 프리셋과 이슈 핀 밖의 세션 기본값이고 이슈별 적용은 route=quick_fix면 quick_fix 값을 역매핑해 핀한다; auto|claude|codex 어휘·auto의 provider 비유도·inherit 비호환·구 서버 probe 부재·quick_fix 키의 일반 키 폴스루·kv 먼저 큐 나중의 비원자성·quick_fix_orchestration_model 키 존재의 capability gating은 UI-s8qn에서 승계한다"
supersedes: [UI-s8qn]
spec: docs/superpowers/specs/2026-09-10-settings-ui-restructure-design.md
bead: UI-7yh2
---

# 실행 프리셋은 quick_fix 키를 함께 담는 25키 프로파일이고 적용 한 번이 일반·quick_fix 키를 교체하며 workflow_mode는 프리셋 밖이다 — auto·inherit·probe 부재·폴스루·비원자성·capability gating은 UI-s8qn을 승계한다

## Context

ADR UI-s8qn(2026-09-10)은 실행 프리셋을 "레인 무관 18키 프로파일"로 정하고, 같은
프리셋을 `일반에 적용`과 `quick_fix 레인에 적용` 두 버튼으로 워크스페이스의 두 레인에
따로 넣도록 했다. quick_fix 레인 적용은 `QUICK_FIX_LANE_MAP`으로 일반 키 8개를
`quick_fix_*` 저장 키로 옮기고, quick_fix enum 밖 값은 `lane_incompatible`로 해제하며,
대응 키가 없는 리뷰 3×3과 `workflow_mode`는 `skipped_keys`로 알렸다.

이 구조는 두 가지를 표현하지 못했다. 첫째, "일반 레인은 opus, quick_fix 레인은 codex"처럼
두 레인이 다른 값을 갖는 워크스페이스 프로파일 하나를 프리셋 하나로 저장할 수 없었다 —
같은 18키를 어느 레인에 넣을지를 매번 사용자가 골라야 했다. 둘째, `workflow_mode`는
대화형 세션만 읽는 값인데(Worker는 항상 `fast_track`) 프리셋과 이슈 핀 키에 들어 있어,
프리셋을 이슈에 적용하면 그 이슈의 모드까지 함께 바뀌었다. 사용자는 설정 화면이 이
둘을 한 화면에 섞어 "누가 무엇을 정하는지" 파악하기 어렵다고 관찰했다
(UI-7yh2 스펙 §1).

실재한 대안은 둘이었다.

- **레인 투영 유지**(UI-s8qn 그대로) — 프리셋은 18키, 적용 시 `QUICK_FIX_LANE_MAP`으로
  파생. quick_fix 값을 프리셋으로 표현할 수 없고 두 번 적용해야 한다.
- **프리셋이 quick_fix 키를 직접 담는 25키** — 편집 행이 늘지만 조건부 행
  (`실행 방식=main`이면 위임 4행 생략, 속도 행은 provider가 지원할 때만)으로 감춘다.
  적용은 한 번이다.

## Decision

**실행 프리셋은 25키 워크스페이스 실행 프로파일이다.** `IMPL_PRESET_KEYS`는
`BEAD_APPLY_KEYS` 14키(리뷰 3×3, 구현 5키) + `ORCHESTRATION_KEYS` 3키 +
`QUICK_FIX_ORCHESTRATION_KEYS` 3키 + `QUICK_FIX_KV_KEYS` 5키다. `workflow_mode`는
프리셋 키가 아니며, 저장된 사용자 프리셋에 남아 있는 `workflow_mode`는 프리셋 저장소가
디스크에서 읽을 때 그 한 키만 떼어낸다(다른 미지 키는 legacy 처리 그대로).

**적용은 한 번이다.** `apply-impl-preset-global`은 `lane`을 받지 않고(있으면
`bad_request`), kv `PRESET_KV_KEYS ∪ QUICK_FIX_KV_KEYS` 18키와 큐
`ORCHESTRATION_KEYS ∪ QUICK_FIX_ORCHESTRATION_KEYS` 6키를 프리셋 값으로 교체한다.
프리셋에 없는 키는 unset이고, unset된 quick_fix 키는 같은 이름의 일반 키로 폴스루한다.
`lane` payload·적용 시 `QUICK_FIX_LANE_MAP` 파생·`lane_incompatible`·`skipped_keys`는
폐기한다. `QUICK_FIX_LANE_MAP` 자체는 남고 소비자는 셋이다: 이슈별 역매핑,
코디네이터의 quick_fix route 오케스트레이션 해석, bench tuple 해석.

**`workflow_mode`는 프리셋과 이슈 핀 밖의 세션 기본값이다.** `BEAD_APPLY_KEYS`는
`workflow_mode`를 뺀 14키이고, `WORKSPACE_KV_KEYS`는 `workflow_mode`를 명시해 21키를
유지한다 — 세션 탭이 그 키를 읽고 쓴다.

**이슈별 적용은 이슈의 route를 본다.** `route=quick_fix` 이슈에 프리셋을 적용하면 핀은
워크스페이스 해석기와 같은 순서로 만든다: `impl_dispatch`·`impl_model`·`impl_effort`·
`impl_speed`는 `quick_fix_*` 키 ?? 일반 키, `impl_runtime`은 `quick_fix_impl_runtime`
?? exact `quick_fix_impl_model`의 러너 ?? `impl_runtime`. 만든 핀은 `validateImplSettings`를
통과해야 하고, 실패하면 `impl_preset_incompatible:<reason>`으로 거절한다.
오케스트레이션 키는 핀하지 않는다. 비교 탭 서명 대조와 bench tuple도 같은 route
유효값 규칙(`preset[lane_key] ?? preset[key]`)을 쓴다.

**UI-s8qn에서 승계하는 조항.** `impl_runtime`은 `auto|claude|codex`이고 `auto`는
provider를 유도하지 않으며 exact 모델 토큰만 provider를 정한다. `inherit`은 이관 없이
제거되어 저장된 값은 `compatible:false`로 드러나고 적용되지 않는다. 구 서버 capability
probe는 두지 않는다. 비어 있는 quick_fix 키는 같은 이름의 일반 키로 떨어진다. 적용은
kv 먼저·큐 CAS 나중의 비원자성이며 `queue_applied:false`로 드러난다. 클라이언트는 큐
스냅샷에 `quick_fix_orchestration_model` 키가 있을 때만 적용을 보낸다 — 그 키가 없는
구 서버는 `lane` 없는 요청을 일반 레인 적용으로 처리해 quick_fix 값을 조용히 버리므로,
`적용` 버튼을 비활성으로 그린다.

## Consequences

- 프리셋 저장 데이터(25키)·적용 프로토콜(단일 교체)·이슈별 역매핑·비교 서명·bench 해석이
  함께 바뀌므로 한 줄 수정으로 되돌릴 수 없다.
- "왜 quick_fix 레인에 적용 버튼이 없나", "왜 프리셋에 모드가 없나"는 맥락 없이 보면
  놀랍다 — 프리셋은 이제 두 레인의 값을 모두 담고, 모드는 세션 탭의 값이다.
- 오늘의 5개 프리셋은 quick_fix 키가 없으므로 적용하면 quick_fix 레인이 일반 프로파일로
  폴스루한다. 현재 kv의 `quick_fix_impl_runtime=codex`는 첫 적용에서 unset되지만 폴스루
  유효값이 같은 `codex`라 실행 결과는 같다.
- `validateImplPresetSettings`는 quick_fix 삼중항에도 provider·모델·effort 정합을 적용하고
  `quick_fix_*_speed=fast`는 러너 카탈로그 `speed_tiers`가 허용할 때만 받는다
  (`quick_fix_speed_unsupported`).
- UI-s8qn의 나머지 결과(`IMPL_RUNTIMES` 복제본 동일성 테스트, 갱신 전 서버와의 혼재
  구간 동작)는 그대로 유효하다.
