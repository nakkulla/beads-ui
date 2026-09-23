---
id: UI-u6ud-10
title: 실행 프리셋과 판정 칩
status: accepted
date: 2026-09-23
summary: "실행 프리셋은 applies_to 계열별 id 하나가 정체성이고 읽을 때 계열 키 집합을 대칭 비교하며 dispatchPreset과 카드 비교는 분리한다; 판정 칩 복잡·frontend·backend 클릭은 서버 전역 바인딩의 general 프리셋을 그 이슈에 적용하고 재클릭은 첫 클릭 전 핀으로 되돌리며 quick_fix 이슈는 거부한다; 칩 바인딩 편집은 모니터 일괄 창의 서버 전역 탭에만 있고 저장소 하나를 편집하는 창에는 섞지 않는다"
supersedes: ["UI-wg68", "UI-wg68-2"]
spec: docs/superpowers/specs/2026-09-23-adr-cleanup-history-dir-reader-and-consolidation-design.md
bead: UI-u6ud
---

# 실행 프리셋과 판정 칩

## Context

- `UI-wg68`: 판정 칩 클릭은 서버 전역 바인딩의 general 프리셋을 그 이슈에 적용하고 재클릭은 첫 클릭 전 핀으로 되돌리며, 프리셋 정체성·대칭 비교·`dispatchPreset` 분리는 UI-uohc에서 승계한다.
- `UI-wg68-2`: 남는 조항인 "서버 전역 칩 바인딩 편집은 저장소 하나를 편집하는 창에 섞지 않는다"만 가져온다. 탭 구성 자체는 스펙이 정본이다.

## Decision

프리셋 정체성

- 실행 프리셋은 `applies_to` 계열을 갖고 route와 계열이 일치해야 적용된다. 프리셋의 정체성은 id 하나다.
- 이슈에 적용된 프리셋은 읽을 때 계열 키 집합을 대칭 비교해 판정하고, 모델에서 런타임을 유도한다. 카드 비교와 `dispatchPreset`은 합치지 않고 분리하며, 워크스페이스는 계열별 적용 기록을 둔다.
- `snapshotBead`가 `applied_exec_preset`을 싣고, `dispatchPreset`은 그 id가 현재 스냅샷에 있고 계열이 이슈와 같으면 이슈의 프리셋으로 attempt를 기록한다. 아니면 워크스페이스의 계열별 기록을 쓴다.
- `applied_exec_preset`의 작성자는 편집기의 `apply-impl-preset`과 칩의 `chip-preset-toggle` 둘이다.

판정 칩

- `exec-presets.json` 최상위 `chip_bindings { complex, frontend, backend }`가 칩마다 `applies_to=general` 프리셋 id 하나 또는 `null`을 가리킨다. 프리셋 목록과 같은 revision CAS 아래 `impl-preset-bind`로 바꾸고, 프리셋 삭제는 같은 mutation에서 그 id를 가리키는 바인딩을 비운다. quick_fix 계열 프리셋은 바인딩 대상이 아니다.
- 판정 칩 `복잡`·`frontend`·`backend` 클릭은 서버 op `chip-preset-toggle { id, chip, expected_revision, root_dir? }`가 지정 워크스페이스에서 이슈를 읽어 판정한다. `route=quick_fix` 이슈는 `preset_route_mismatch`로 거부하고 아무것도 쓰지 않는다. `chip_preset_source === chip`이고 `applied_exec_preset === 바인딩 id`면 복원, 그 밖은 적용이다.
- 적용은 `apply-impl-preset`과 같은 argv 규칙(계열 키 집합 교체 + `applied_exec_preset`)에 `chip_preset_source=<chip>`을 더하고, `chip_preset_restore`가 없을 때만 클릭 직전 핀과 `applied_exec_preset`을 JSON으로 보관한다. 마지막 클릭이 이기되 복원 대상은 언제나 첫 클릭 전이다.
- 복원은 한 argv로 보관된 핀을 되돌리고 나머지 핀·`applied_exec_preset`·두 칩 키를 지운다. 보관이 없거나 깨졌으면 전부 해제하고 `restore_fallback`을 답한다.
- 한 전이(바인딩 읽기 → 이슈 읽기 → 판정 → 쓰기 → 재조회)는 (워크스페이스, 이슈)별 promise 체인으로 요청 순서대로 직렬화한다.
- 편집기의 `apply-impl-preset`은 두 칩 키를 같은 argv에서 unset한다. 개별 키 편집은 두 키를 건드리지 않고 결과는 칩의 `diverged` 상태로 드러난다. 전역 적용·프리셋 삭제·바인딩 해제는 이슈를 훑지 않는다.

바인딩 편집 위치

- 칩 바인딩 편집은 모니터 일괄 창의 서버 전역 탭에만 있고, 저장소 하나를 편집하는 창(전체 설정 창·레포 카드 창)에는 서버 전역 값을 섞지 않는다. 그 탭만 `적용 대상` 저장소 선택과 무관하다.

## Consequences

- 프리셋 정체성·칩 클릭 의미·바인딩 편집 위치가 한 행으로 읽힌다. 되돌리려면 exec-presets 저장소·chip-preset-toggle op·dispatchPreset·설정 창 두 모드가 함께 움직인다.
- 폐기: `UI-wg68-2`의 탭 구성 조항(일괄 창의 다섯 탭·`칩` 탭의 행·`<select>`·즉시 저장 동작, 그리고 UI-uohc-2에서 승계한 `quick fix` 탭 프리셋 바와 8행·`편집됨` 규칙·관측 네 상태·저장소별 순차 op·모드 고정·레포 카드 다이얼로그·프리셋 관리)은 ADR에서 내리고 설정 창 스펙이 정본으로 소유한다(처분 표 D4의 선언).
