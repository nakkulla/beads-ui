---
id: UI-uohc
title: 실행 프리셋은 applies_to로 일반·quick fix 두 계열로 갈리고 계열이 저장소 적용의 키 집합과 이슈 route 일치를 정한다 — 25키 프로파일과 접두어 역매핑을 대체하되 런타임 유도·id 하나 정체성·대칭 비교는 UI-xq3h를 승계한다
status: superseded
superseded_by: UI-wg68
date: 2026-09-22
summary: "실행 프리셋은 applies_to로 일반·quick fix 두 계열로 갈리고 settings는 canonical 키만 담으며, 계열이 저장소 적용의 키 집합과 이슈 route 일치를 정해 다른 계열의 값은 보존된다 — 25키 프로파일과 접두어 역매핑을 대체하되 모델에서의 런타임 유도·id 하나 정체성·대칭 비교는 승계한다"
supersedes: [UI-xq3h]
spec: docs/superpowers/specs/2026-09-22-exec-preset-quick-fix-split-design.md
bead: UI-uohc
---

# 실행 프리셋은 applies_to로 일반·quick fix 두 계열로 갈리고 계열이 저장소 적용의 키 집합과 이슈 route 일치를 정한다 — 25키 프로파일과 접두어 역매핑을 대체하되 런타임 유도·id 하나 정체성·대칭 비교는 UI-xq3h를 승계한다

## Context

프리셋 한 항목은 25키였다. 일반 17키(오케스트레이션 3 + per-Bead 14)에 `quick_fix_orchestration_*` 3키와 `quick_fix_impl_*` 5키를 더한 하나의 희소 객체이고, 두 프로파일을 가르는 것은 키 이름의 `quick_fix_` 접두어뿐이었다. 전역 적용은 그 25키에서 나온 kv 18키와 큐 오케스트레이션 6키를 한 번에 교체했으므로, **어떤 프리셋을 적용하든 그 저장소의 quick fix 값이 함께 바뀌었다.**

실측(`exec-presets.json` revision 111)은 그 표현력이 쓰이지 않고 있었음을 보여 준다. 프리셋 5개가 전부 `quick_fix_orchestration_model=astra`, `quick_fix_orchestration_effort=xhigh` 두 키만, 그것도 똑같이 담고 있었다. 프리셋이 실제로 구분하는 것은 총괄→구현 조합뿐인데 quick fix 축은 다섯 항목이 동일했다. 남은 것은 덮어쓰기 위험뿐이었다.

ADR UI-xq3h(2026-09-21)는 이슈에 적용한 프리셋의 정체성을 `applied_exec_preset` metadata의 id 하나로 기록하고 어긋남을 읽을 때 대칭 비교로 계산하기로 했다. 그 ADR은 UI-00lf에서 **17키 교체와 quick_fix 역매핑을 명시적으로 승계**했다 — route가 `quick_fix`인 이슈에 프리셋을 적용할 때 `quick_fix_<key>`를 먼저 찾고 없으면 일반 키로 떨어지는 규칙이다. 이 설계가 프리셋에서 접두 키 자체를 없애므로 그 조항이 반증된다. 한 조항의 반전은 전체 교체이므로(ADR 규칙) 새 ADR로 승계 조항을 다시 적고 UI-xq3h를 superseded로 돌린다.

사용자 요구는 셋이었다: 프리셋을 바꿔도 quick fix 설정은 그대로일 것, quick fix 이슈에는 quick fix용 프리셋만 고를 수 있을 것, 저장소마다 기본을 두되 이슈별로도 고칠 수 있을 것.

## Decision

프리셋 항목에 계열 필드 `applies_to`를 둔다. 값은 `general` 또는 `quick_fix`이고, 필드가 없거나 어휘 밖이면 `general`로 읽는다. `settings`는 **계열과 무관하게 canonical 키 이름만** 담는다 — 저장 파일에 `quick_fix_` 접두 키는 더 이상 나타나지 않는다.

- **키 집합.** `general`은 오케스트레이션 3키 + per-Bead 14키 = 17키. `quick_fix`는 오케스트레이션 3키 + 구현 5키(`impl_dispatch`·`impl_runtime`·`impl_model`·`impl_effort`·`impl_speed`) = 8키이며 **리뷰 9키를 담지 않는다.** 리뷰 설정은 계열과 무관한 공통 축이고 계약에도 route별 리뷰 키가 없다.
- **허용 값.** 계열마다 다르고 그 차이는 dotfiles 계약이 정한 것을 옮긴 것이다(ADR 0012, 이 저장소는 소비자다). `general`의 `impl_runtime`·`impl_model`은 `auto`를 허용하고, `quick_fix`의 `impl_runtime`은 `claude`|`codex`만, `impl_model`은 카탈로그 토큰만 받는다 — 그쪽에서는 공급자가 모델 토큰에서 **유도**되기 때문이다. 검증은 계열을 받아 그 키 집합에만 적용하고, 사유는 canonical 이름 하나로 말한다(`quick_fix_` 접두 사유 변환은 사라진다).
- **저장소 적용.** 프리셋의 계열이 무엇을 교체할지 정한다. `general`은 kv canonical 13키(계약이 전역 쓰기를 막는 `impl_dispatch` 제외)와 큐 `orchestration_*` 3키를, `quick_fix`는 kv `quick_fix_impl_*` 5키와 큐 `quick_fix_orchestration_*` 3키를 교체한다. 계열 키 집합 안의 누락은 unset하고, **계열 밖 키는 payload에 나타나지 않으므로 그 저장소의 현재 값이 유지된다.** `workflow_mode`·주소·base 동기화·계정·동시성은 어느 계열에서도 대상이 아니다. quick fix 계열의 `impl_dispatch`는 계약이 허용한 전역 값이므로 `quick_fix_impl_dispatch`로 기록한다 — 일반 계열에는 그 칸이 없다는 이 비대칭은 계약에서 온 것이고 화면의 도움말 한 줄로 설명한다.
- **적용 기록.** 큐는 계열마다 하나씩 기록한다: 기존 `applied_exec_preset`(일반)과 새 `applied_quick_fix_preset`(quick fix). 한 계열의 적용은 다른 계열의 기록을 지우지 않고, 개별 값을 직접 고쳐 기록이 더 이상 사실이 아닐 때 푸는 판정도 그 값이 속한 계열의 기록만 본다.
- **이슈 적용.** route가 `quick_fix`인 이슈에는 `applies_to=quick_fix` 프리셋만, 그 밖(미핀 포함)에는 `general` 프리셋만 적용한다. 어긋나면 아무것도 쓰기 전에 `preset_route_mismatch`로 거부한다. 어긋남 계산도 계열을 따라 대조 대상 기록과 키 집합이 갈린다.
- **승계.** UI-xq3h에서 뒤집는 것은 "17키 교체와 quick_fix 접두 역매핑" 조항 하나다. 나머지는 그대로 살아 있다 — 정체성은 여전히 `applied_exec_preset` metadata의 **id 하나**이고(계열과 무관하게), 어긋남은 저장하지 않고 읽을 때 대칭 비교로 계산하며, 오케스트레이션 핀 검증과 응답 형식도 바뀌지 않는다. **모델에서 런타임을 유도하는 규칙도 승계한다.** 프리셋 저장 검증은 런타임 없는 모델 단독을 허용하지만 이슈 핀 검증은 같은 조합을 거부하므로, 유도를 없애면 모델만 담은 프리셋의 적용이 실패한다. 유도는 이제 계열과 무관하게 canonical `impl_model`에서 하고, 명시된 `impl_runtime`이 있으면 그것이 이긴다.
- **마이그레이션.** 기존 항목마다 quick fix 8키를 떼어내 `applies_to: 'general'`을 부여하고, 떼어낸 값을 canonical 이름으로 되돌려 조합별로 모아 비어 있지 않은 조합마다 `quick fix 기본` 프리셋 하나를 만든다. 값에서 이름을 지어내지 않는다. 한 번의 rename에 마커 `preset_profile_migration`을 함께 기록하고 readback으로 확인하며, 부팅에서 기존 재시드가 끝난 **뒤에** 실행한다 — 반대 순서면 재시드의 전체 교체가 방금 만든 결과를 지운다.

## Consequences

프리셋 목록은 화면에서 둘로 갈리지만 파일은 하나다. 저장 형식·CAS·스냅샷·비교 소비자가 하나로 남고, 이름 중복 회피는 계열을 가로질러 판정한다 — 같은 이름 둘은 비교 탭의 이름 표시를 모호하게 만든다.

프리셋을 바꿔도 quick fix 설정이 그대로 서 있게 된다. 그 대가로 **quick fix 값을 바꾸려면 quick fix 계열 프리셋을 따로 적용하거나 전용 탭에서 직접 고쳐야 한다** — 한 번의 적용으로 두 축을 함께 바꾸던 동작은 사라진다. 실측에서 그 동작이 표현한 것은 모든 프리셋에 같은 두 값이었으므로 잃는 것은 없다.

비교 탭은 계열로 후보를 거르지 **않는다.** 실험 복제 이슈는 route를 `quick_fix`로 두고 만들어지므로, route로 계열을 좁히면 일반 계열 프리셋으로 돌린 실험이 자기 프리셋과 매칭되지 않는다. 모든 프리셋을 canonical 키로 같은 방식으로 대조한다.

되돌리기는 싸지 않다. 영속 형식이 바뀌고 마이그레이션이 한 번 돌며, 적용 경로와 적용 기록이 각각 둘이 되고 비교·실험 소비자가 canonical 대조로 옮겨간다. 대안 둘을 검토했다. 프리셋에서 quick fix 키만 빼고 계열을 만들지 않는 안은 구현이 가장 작지만 "quick fix 이슈에는 quick fix용 프리셋만"이 불가능하다. 별도 파일·별도 목록으로 두는 안은 revision CAS와 스냅샷 이벤트가 둘이 되고 비교 탭이 두 목록을 합쳐 읽어야 한다 — 한 파일 안의 한 필드로 얻을 수 있는 것을 위해 동시성 표면을 두 배로 만든다.

판정 칩(`복잡`·`frontend`·`backend`) 클릭으로 프리셋을 적용하는 조작은 quick fix 이슈에서 동작하지 않는다. 그 이슈에서는 기존처럼 사유 팝업만 뜬다. 칩 바인딩을 계열별로 나누는 일은 필요가 생겼을 때 별도로 판단한다.
