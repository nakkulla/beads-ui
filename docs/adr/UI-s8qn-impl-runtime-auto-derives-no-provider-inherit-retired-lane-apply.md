---
id: UI-s8qn
title: impl_runtime은 auto|claude|codex이고 auto는 provider를 유도하지 않으며 inherit은 이관 없이 제거된다 — 레인 무관 프리셋·두 레인 적용은 0032를 승계한다
status: accepted
date: 2026-09-10
summary: "impl_runtime은 auto|claude|codex이고 auto는 실행 시 총괄이 provider를 정하는 상태라 beads-ui 서버·클라이언트는 provider를 유도하지 않으며 exact 모델 토큰만 provider를 정한다; inherit은 이관 없이 제거되어 저장된 값은 compatible:false로 드러나 어느 레인에도 적용되지 않고 구 서버 capability probe는 두지 않는다; 레인 무관 18키 프리셋·두 레인 교체 적용·QUICK_FIX_LANE_MAP·lane_incompatible/skipped_keys 정규화·quick_fix 키의 일반 키 폴스루·kv 먼저 큐 나중의 비원자성·quick_fix_orchestration_model 키 존재의 capability gating은 0032를 승계한다"
supersedes: [32]
spec: docs/superpowers/specs/2026-09-10-impl-runtime-auto-consumer-and-presets-design.md
bead: UI-s8qn
---

# impl_runtime은 auto|claude|codex이고 auto는 provider를 유도하지 않으며 inherit은 이관 없이 제거된다 — 레인 무관 프리셋·두 레인 적용은 0032를 승계한다

## Context

dotfiles-nv53(dotfiles PR #497, 2026-09-10 머지)이 workflow 계약의 `impl_runtime`
어휘를 `inherit|claude|codex`에서 `auto|claude|codex`로 바꿨다(ADR dotfiles/dotfiles-nv53).
`auto`는 "총괄이 위임 unit마다 Claude·Codex provider를 고르고 선택기가 결속·기록한다"는
뜻이다. beads-ui는 그 어휘의 소비자다(ADR 0013) — 프로세스를 띄우지 않고 검증·표시만
한다.

`inherit`의 뜻은 "컨트롤러(오케스트레이션 모델)의 provider를 따른다"였고, 서버
`validateImplSettings`와 클라이언트 `narrowImplTarget`·`normalizeImplTarget`이
오케스트레이션 모델에서 provider를 유도해 모델·effort 정합을 판정했다
(`controller_runtime_required` 사유 포함). 이 유도는 dotfiles 선택기의 "모델 토큰이
provider를 정한다" 규칙과 충돌한다: `auto`는 오케스트레이션 모델과 무관한 provider
축의 상태이며, 어느 provider로 결속될지는 실행 시에만 정해진다.

ADR 0032는 quick_fix 레인 적용의 정규화를 "quick_fix enum에 없는 값
(`impl_runtime=inherit`, `impl_model=auto`)은 그 키를 해제하고 `lane_incompatible`로
알린다"고 적었다. `inherit`이 어휘에서 사라지면 그 조항의 예시 값이 존재하지 않게 되고,
저장된 `inherit` 프리셋은 quick_fix 레인에서 키 하나만 해제되는 것이 아니라 어느
레인에도 적용될 수 없어야 한다 — 한 조항의 반전이므로 0032 전체를 대체한다.

실재한 대안은 셋이었다.

- **`inherit`→`auto` 자동 이관** — 뜻이 다르다("컨트롤러를 따름" vs "실행 시 결정").
  이관하면 오해를 저장한다. 현재 저장된 `inherit`은 0건이다.
- **오케스트레이션 provider 유도 유지** — dotfiles 선택기와 충돌하고, `auto`의 provider를
  클라이언트가 미리 정하는 셈이 된다.
- **구 서버 capability probe** — 갱신 전 서버는 `auto`를 `invalid_impl_runtime`으로
  fail-closed 거부하고, `{auto, auto, auto}` pin이 저장돼도 어떤 경로도 provider를 고르거나
  프로세스를 띄우지 않으므로 잘못된 실행이 생기지 않는다. 불필요.

## Decision

`impl_runtime`은 **`auto|claude|codex`**다. 서버 `IMPL_RUNTIMES`와 클라이언트
`IMPL_RUNTIMES`는 같은 배열이며 테스트가 동일성을 단언한다.

**`auto`는 provider를 유도하지 않는다.** 검증·정규화의 effective runtime은 (a)
`claude`/`codex`면 그 값, (b) `auto`이고 exact `impl_model`이 있으면 그 모델의 provider,
(c) `auto`이고 모델도 `auto`/부재면 판정 없음이다. 오케스트레이션 모델의 provider를
따르던 규칙과 `controller_runtime_required` 사유는 폐기한다. 따라서 `auto`에서
`provider_model_mismatch`는 성립하지 않고, effort는 exact 모델의 목록 또는 카탈로그
합집합으로 검사하며, 설정 화면·상세 패널은 `auto`에서 두 provider의 모델을 모두
제시한다. 표시는 `auto (실행 시 결정)`이다.

**`inherit`은 이관 없이 제거한다.** 저장된 `inherit`(프리셋·Bead pin)은 코디네이터
스냅샷이 `compatible:false / invalid_impl_runtime`으로 드러내고 두 레인 모두 적용을
거절한다. `quick_fix_impl_runtime` enum(`claude|codex`)은 그대로다.

**구 서버 capability probe는 두지 않는다.** 갱신 전 서버의 fail-closed 거부가 경계다.

**0032에서 승계하는 조항.** 실행 프리셋은 레인 무관 18키 프로파일이고 레인은 적용
순간에만 있다. 워크스페이스는 일반 레인(kv `PRESET_KV_KEYS`+큐 `orchestration_*`)과
quick_fix 레인(kv `quick_fix_impl_*` 5키+큐 `quick_fix_orchestration_*` 3키)에 교체
방식으로 적용하고 매핑은 `QUICK_FIX_LANE_MAP` 하나가 소유한다. 정규화는 적용의 일부다:
quick_fix enum 밖 값(`impl_runtime=auto`, `impl_model=auto`)은 그 키를 해제하고
`lane_incompatible`로, 대응 키 없는 리뷰 3×3·`workflow_mode`는 `skipped_keys`로 알린다.
비어 있는 quick_fix 키는 같은 이름의 일반 키로 떨어진다. 적용은 kv 먼저·큐 CAS 나중의
비원자성이며 `queue_applied:false`로 드러난다. 클라이언트는 큐 스냅샷에
`quick_fix_orchestration_model` 키가 있을 때만 quick_fix 적용을 보낸다.

## Consequences

- 서버·클라이언트 enum, 검증 사유(`controller_runtime_required` 폐기), 표시 라벨,
  `protocol.md`, 프리셋 저장소가 함께 바뀌므로 한 줄 수정으로 되돌릴 수 없다.
- `auto`는 `impl_model`·`impl_effort`의 `auto`와 같은 문자열이지만 다른 축(provider)의
  상태이고 오케스트레이션 모델과 무관하다 — 맥락 없이 보면 놀랍다. 설정 화면의
  `auto`+exact 모델 조합은 그 모델의 provider로만 좁혀지고, `auto`+`auto`는 아무것도
  좁히지 않는다.
- 갱신 전 서버와 갱신된 하네스가 섞인 구간에서 `{auto, <exact 모델>, *}` pin은 구 서버가
  `impl_runtime_required`로 거부하고 `{auto, auto, auto}`만 저장된다. 그 pin은 구 서버에서
  `invalid_impl_runtime`으로 표시될 뿐 실행되지 않는다.
- `IMPL_RUNTIMES`를 dotfiles 투영에서 읽는 단일 정본화는 투영에
  `implementation.runtimes`가 없어 범위 밖이다. 두 복제본의 동일성 테스트가 대신한다.
- 0032의 나머지 결과(프리셋 서명 18키, quick_fix 행에서 프리셋을 만드는 경로 없음,
  `receipt-check`의 `main:quick_fix_default` 판정은 범위 밖)는 그대로 유효하다.
