---
id: UI-wg68
title: 판정 칩 복잡·frontend·backend의 클릭은 모니터 설정의 서버 전역 바인딩이 가리키는 general 프리셋을 그 이슈에 적용하고 재클릭은 첫 클릭 전 핀으로 되돌린다 — applied_exec_preset을 chip-preset-toggle도 쓴다는 점만 UI-uohc에서 뒤집고 계열·route 일치·id 하나 정체성·대칭 비교·dispatchPreset 분리는 승계한다
status: accepted
date: 2026-09-22
summary: "판정 칩 복잡·frontend·backend의 클릭은 모니터 설정의 서버 전역 바인딩이 가리키는 general 프리셋을 quick_fix가 아닌 그 이슈에 적용하고 재클릭은 첫 클릭 전 핀으로 되돌리며 그 전이는 이슈별로 직렬화된다 — applied_exec_preset을 chip-preset-toggle도 쓴다는 점만 UI-uohc에서 뒤집고 applies_to 계열·route 일치·id 하나 정체성·계열 키 집합 대칭 비교·dispatchPreset 분리는 승계한다"
supersedes: [UI-uohc]
spec: docs/superpowers/specs/2026-09-22-chip-preset-bindings-design.md
bead: UI-wg68
---

# 판정 칩 복잡·frontend·backend의 클릭은 모니터 설정의 서버 전역 바인딩이 가리키는 general 프리셋을 그 이슈에 적용하고 재클릭은 첫 클릭 전 핀으로 되돌린다 — applied_exec_preset을 chip-preset-toggle도 쓴다는 점만 UI-uohc에서 뒤집고 계열·route 일치·id 하나 정체성·대칭 비교·dispatchPreset 분리는 승계한다

## Context

2026-09-14~22 Worker 실측(spec_backed 60 bead)에서 총괄 모델(opus vs fable)은 착지·r1 리뷰 약점·비용이
구분되지 않았고 **구현자 차이가 결정적**이었다. beads-ui app 작업은 Claude 구현이 r1 blocking
0.6·43분·$17.8 vs astra 1.54·84분·$36.7이었고, 비UI rig는 astra 구현이 blocking 0.42·41분·$13.2로
Claude와 동급이면서 Claude 쿼터를 쓰지 않았다. 프리셋을 골라 적용하는 길은 이슈 상세의 편집기
하나였고, 카드 위의 판정 칩은 칩 문법 스펙 UI-8x90 §4.5·§5.1에 따라 사유 팝업만 열었다 — "카드 위
칩은 상태를 쓰지 않는다"는 그 결정은 ADR로 물질화되지 않았다.

ADR UI-uohc(2026-09-22)는 프리셋을 `applies_to` 계열로 갈라 이슈 route와 계열이 맞을 때만 적용하고,
UI-xq3h에서 "`applied_exec_preset`을 쓰는 경로는 `apply-impl-preset` 하나다 — 개별 키 편집·전역
적용·프리셋 삭제는 이 키를 건드리지 않는다" 조항을 그대로 승계했다. 칩 클릭이 이 키를 쓰고 복원이
지우는 순간 그 조항은 반증된다. 한 조항의 반전은 전체 교체이므로 새 ADR로 승계 조항을 다시 적고
UI-uohc를 superseded로 돌린다.

사용자 결정(2026-09-22): 프리셋은 작업 성격(칩)에 매어 쓰고, 적용은 칩 클릭으로만 일어나며(라벨이
붙어 있다고 자동 적용하지 않는다), 여러 칩 사이에 우선 규칙 없이 가장 마지막 클릭이 이기고, 재클릭은
첫 칩 클릭 전 핀으로 되돌린다. 바인딩은 저장소별이 아니라 서버 전역이고 `기본 프리셋` 슬롯은 두지
않는다. `frontend`·`backend` 라벨은 dotfiles 계약 `labels.area`가 소유한다(dotfiles-kp4c). 판정 칩
클릭은 quick_fix 이슈에서 동작하지 않는다(UI-uohc 사용자 결정).

## Decision

판정 칩 `복잡`·`frontend`·`backend`의 클릭은 이슈의 실행 설정을 바꾼다.

- **바인딩.** `exec-presets.json` 최상위 `chip_bindings { complex, frontend, backend }`가 칩마다
  `applies_to=general` 프리셋 id 하나 또는 `null`을 가리킨다. 프리셋 목록과 같은 revision CAS 아래
  `impl-preset-bind`로 바꾸고, 프리셋 삭제는 같은 mutation에서 그 id를 가리키는 바인딩을 비운다.
  quick_fix 계열 프리셋은 바인딩 대상이 아니다.
- **클릭.** 서버 op `chip-preset-toggle { id, chip, expected_revision, root_dir? }`가 지정 워크스페이스에서
  이슈를 읽어 판정한다. `route=quick_fix` 이슈는 `preset_route_mismatch`로 거부하고 아무것도 쓰지
  않는다. `chip_preset_source === chip` 이고 `applied_exec_preset === 바인딩 id`면 **복원**, 그 밖은
  **적용**이다.
- **적용**은 `apply-impl-preset`과 같은 argv 규칙(계열 키 집합 교체 + `applied_exec_preset`)에
  `chip_preset_source=<chip>`을 더하고, `chip_preset_restore`가 없을 때만 클릭 직전 핀과
  `applied_exec_preset`을 JSON으로 보관한다 — 마지막 클릭이 이기되 복원 대상은 언제나 첫 클릭 전이다.
- **복원**은 한 argv로 보관된 핀을 되돌리고 나머지 핀·`applied_exec_preset`·두 칩 키를 지운다.
  보관이 없거나 깨졌으면 전부 해제하고 `restore_fallback`을 답한다.
- **직렬화.** 한 전이(바인딩 읽기 → 이슈 읽기 → 판정 → 쓰기 → 재조회)는 (워크스페이스, 이슈)별
  promise 체인으로 요청 순서대로 처리한다. 같은 칩을 빠르게 두 번 누르면 applied → restored다.
- **다른 쓰기 경로.** 편집기의 `apply-impl-preset`은 두 칩 키를 같은 argv에서 unset한다(사람이 고른
  순간 칩의 소유가 끝난다). 개별 키 편집은 두 키를 건드리지 않고 결과는 칩의 `diverged` 상태로 드러난다.
  전역 적용·프리셋 삭제·바인딩 해제는 이슈를 훑지 않는다.
- **attempt 귀속.** `snapshotBead`가 `applied_exec_preset`을 싣고, `dispatchPreset`은 그 id가 현재
  스냅샷에 있고 계열이 이슈와 같으면 이슈의 프리셋으로 attempt를 기록한다. 아니면 워크스페이스의
  계열별 기록을 쓴다.
- **승계.** UI-uohc에서 뒤집는 것은 "`applied_exec_preset`의 작성자는 `apply-impl-preset` 하나"
  조항이다. `applies_to` 계열과 route 일치, id 하나 정체성, 읽을 때 계열 키 집합의 대칭 비교, 모델에서의
  런타임 유도, 카드 비교와 `dispatchPreset`을 합치지 않는 분리, 계열별 적용 기록은 그대로다.

## Consequences

같은 카드의 다른 판정 칩(`세션 권장`·`worker-ineligible`·`영수증`·`gate`·`readiness` 등)은 팝업인데
세 칩만 상태를 쓴다. 그 이유 — 프리셋별 성능 비교 실측과, 오터치보다 한 번 클릭을 택한 사용자 결정 —
는 코드에 남지 않으므로 여기 적는다. 팝업 안에 적용 버튼을 두는 절충안은 사용자가 배제했다.

되돌리기 어렵다. 이슈에 `chip_preset_source`·`chip_preset_restore` 두 키가 남고 `exec-presets.json`
스키마가 늘며 클릭 의미를 아는 사용자 습관이 생긴다. 바인딩 없는 칩과 quick_fix 이슈의 칩은 지금과
같은 사유 팝업이라, 바인딩을 세우기 전에는 아무 동작도 바뀌지 않는다(fail-quiet).
