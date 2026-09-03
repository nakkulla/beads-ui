---
id: 32
title: 실행 프리셋은 레인 무관 프로파일이고 워크스페이스가 일반·quick_fix 두 레인에 각각 적용한다
status: accepted
date: 2026-09-03
summary: '실행 프리셋은 레인 무관 18키 프로파일이며 워크스페이스는 그것을 일반 레인과 quick_fix 레인에 각각 교체 방식으로 적용하고, quick_fix 레인의 durable 값은 큐 `quick_fix_orchestration_*`와 kv `quick_fix_impl_*`다'
spec: docs/superpowers/specs/2026-09-03-quick-fix-lane-profile-consumer-design.md
bead: UI-25ct
---

# 실행 프리셋은 레인 무관 프로파일이고 워크스페이스가 일반·quick_fix 두 레인에 각각 적용한다

## Context

Worker 실행 설정은 route 구분이 없는 단일 프로파일이었다. 큐의 오케스트레이션 3키
(`orchestration_model`·`orchestration_effort`·`orchestration_speed`)와 kv
`workflow_session_defaults`의 세션 키가 모든 route에 똑같이 적용됐고, quick_fix
전용으로 쓸 수 있는 키는 `quick_fix_impl_model` 하나뿐이었다. 그 키는 모델 하나로
dispatch까지 함의하므로 (1) quick_fix를 메인으로 두면서 다른 오케스트레이터를
쓰거나 (2) 위임하면서 effort·speed·runtime을 spec 계열과 다르게 두는 것이
불가능했다.

이 결정의 계약 쪽 짝은 dotfiles의 kv `quick_fix_impl_dispatch`/`runtime`/`model`/
`effort`/`speed` 5키와 `impl-selector.py` 사다리이며, 그 어휘와 판정은 dotfiles가
소유한다(ADR 0012). 이 ADR은 그 어휘를 beads-ui가 어떤 저장 구조와 어떤 적용
의미로 소비하는지를 기록한다.

선택지는 셋이었다.

- **A. 프리셋에 route 축을 넣는다** — 프리셋 스키마를 18키에서 26키로 넓히고 한
  프리셋이 두 레인을 모두 담는다.
- **B. quick_fix 전용 프리셋 종류를 따로 만든다** — 저장소를 두 개로 나눈다.
- **C(채택). 프리셋은 레인 무관 프로파일로 두고, 워크스페이스가 프리셋 하나를
  일반 레인에, 다른 하나를 quick_fix 레인에 적용한다.**

## Decision

실행 프리셋은 **레인 무관 18키 프로파일**이다. 프리셋 자체에는 route도 레인도
없다. 레인은 프리셋을 **적용하는 순간**에만 존재한다.

워크스페이스는 같은 프리셋 어휘를 두 슬롯에 각각 **교체 방식**으로 적용한다.

- **일반 레인** — kv의 `PRESET_KV_KEYS`와 큐의 `orchestration_*` 3키를 교체한다.
  현행과 같다.
- **quick_fix 레인** — 프리셋의 `impl_dispatch`·`impl_runtime`·`impl_model`·
  `impl_effort`·`impl_speed`를 kv `quick_fix_impl_*` 5키로, `orchestration_*` 3키를
  큐 `quick_fix_orchestration_*` 3키로 옮겨 교체한다. 매핑은 서버와 클라이언트가
  공유하는 표 하나(`QUICK_FIX_LANE_MAP`)가 소유한다.

따라서 **quick_fix 레인의 durable 값은 큐 `quick_fix_orchestration_*`와 kv
`quick_fix_impl_*`**이지 프리셋이 아니다. 프로토콜에서 이 두 슬롯을 가르는 것은
`apply-impl-preset-global`의 선택 필드 `lane`뿐이고, 부재는 `general`이다.

레인 무관 어휘를 route 오버라이드 슬롯에 붓기 때문에 두 규칙이 따라온다.

- **정규화가 적용의 일부다.** quick_fix enum에 없는 값(`impl_runtime=inherit`,
  `impl_model=auto`)은 그 키를 해제하고 `lane_incompatible`로 알린다. quick_fix에
  대응 키가 없는 리뷰 3×3과 `workflow_mode`는 `skipped_keys`로 알린다. 조용히
  버리지 않는다.
- **비어 있는 quick_fix 키는 같은 이름의 일반 키로 떨어진다.** 두 레인은 독립된
  프로파일이 아니라 오버라이드 층이다. 그래서 일반 레인 적용은 quick_fix 키를
  건드리지 않고, quick_fix 레인 적용도 일반 키를 건드리지 않는다.

## Consequences

- 프리셋 저장소·비교 탭·클론 실행의 서명은 18키 그대로다. 프리셋을 만드는 경로도
  하나뿐이다 — 일반 행의 현재 값으로 저장한다. quick_fix 행에서 프리셋을 만드는
  경로는 없다.
- "왜 quick_fix 값으로 프리셋을 못 만드나"와 "왜 프리셋에 quick_fix 키가 없나"는
  반복될 질문이다. 답은 프리셋이 레인을 모르기 때문이며, 필요하면 같은 값을 일반
  행에 놓고 저장한 뒤 quick_fix 레인에 적용한다.
- 적용은 두 저장소(kv와 큐)에 걸치므로 원자적이지 않다. quick_fix 레인도 일반
  레인과 같은 비원자성 규약을 따른다 — kv가 먼저 착지하고 큐 CAS가 실패하면
  `queue_applied:false`다.
- 구 서버는 알 수 없는 `lane`을 무시하고 일반 레인에 적용하므로, 클라이언트는 큐
  스냅샷에 `quick_fix_orchestration_model` 키가 있을 때만 quick_fix 적용을 보낸다.
  이 capability gating이 없으면 quick_fix 프로파일이 일반 프로파일을 덮어쓴다.
- 대안 A를 택했다면 프리셋 편집 UI가 두 배가 되고 비교 서명이 8키를 더 알아야
  했다. 대안 B는 두 저장소를 만들어 "이 프리셋은 어느 종류인가"를 모든 소비자가
  다시 묻게 했을 것이다. 반대로 이 결정을 되돌리려면 프리셋 저장소·비교 탭 서명·
  적용 의미가 함께 바뀌므로 한 줄 수정으로 되돌릴 수 없다.
- `receipt-check`의 `main:quick_fix_default` 판정은 이 결정의 범위 밖이다. kv는
  영수증의 증거가 아니다.
