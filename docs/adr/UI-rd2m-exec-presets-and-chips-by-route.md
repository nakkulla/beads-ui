---
id: UI-rd2m
title: 실행 프리셋과 route 계열별 판정 칩
status: accepted
date: 2026-10-14
summary: "실행 프리셋은 applies_to 계열별 id 하나가 정체성이고 읽을 때 계열 키 집합을 대칭 비교하며 dispatchPreset과 카드 비교는 분리한다; 판정 칩 복잡·frontend·backend는 칩마다 general·quick_fix 서버 전역 바인딩을 하나씩 갖고 클릭은 이슈 route 계열의 바인딩 프리셋을 그 이슈에 적용하며 재클릭은 첫 클릭 전 핀으로 되돌리고 그 전이는 같은 워크스페이스·이슈별로 요청 순서대로 직렬화한다; 칩 바인딩 편집은 모니터 일괄 창의 서버 전역 탭에만 있고 저장소 하나를 편집하는 창에는 섞지 않는다"
supersedes: ["UI-u6ud-10"]
spec: docs/superpowers/specs/2026-10-14-chip-quick-fix-preset-bindings-design.md
bead: UI-rd2m
---

# 실행 프리셋과 route 계열별 판정 칩

## Context

- `UI-u6ud-10`은 칩 바인딩을 칩마다 general 프리셋 하나로 한정하고 `route=quick_fix` 이슈의 칩 클릭을 `preset_route_mismatch`로 거부했다. 그래서 quick_fix 이슈에서는 판정 칩이 사유 팝업만 열었다.
- 사용자 결정(2026-10-14): quick_fix 이슈에서도 칩 클릭이 프리셋을 적용해야 하고, quick fix 쪽 프리셋은 일괄 창 칩 탭에서 일반 프리셋과 함께 고른다. 뒤집는 조항은 "바인딩은 general 프리셋만 가리키고 quick_fix 이슈 클릭은 거부한다" 하나이고, 나머지 조항은 아래에 그대로 다시 적는다.
- 버린 대안: 칩마다 `{ general, quick_fix }` 객체로 저장 형태를 바꾸기(읽는 곳 전부와 파일 이행이 함께 움직여야 하는데 얻는 것이 없다), 프리셋 하나가 두 계열을 겸하기(계열 분리를 뒤집는다).

## Decision

프리셋 정체성

- 실행 프리셋은 `applies_to` 계열을 갖고 route와 계열이 일치해야 적용된다. 프리셋의 정체성은 id 하나다.
- 이슈에 적용된 프리셋은 읽을 때 계열 키 집합을 대칭 비교해 판정하고, 모델에서 런타임을 유도한다. 카드 비교와 `dispatchPreset`은 합치지 않고 분리하며, 워크스페이스는 계열별 적용 기록을 둔다.
- `snapshotBead`가 `applied_exec_preset`을 싣고, `dispatchPreset`은 그 id가 현재 스냅샷에 있고 계열이 이슈와 같으면 이슈의 프리셋으로 attempt를 기록한다. 아니면 워크스페이스의 계열별 기록을 쓴다.
- `applied_exec_preset`의 작성자는 편집기의 `apply-impl-preset`과 칩의 `chip-preset-toggle` 둘이다.

판정 칩

- 칩마다 general 바인딩과 quick_fix 바인딩을 하나씩 갖는다. `exec-presets.json` 최상위 `chip_bindings { complex, frontend, backend }`는 `applies_to=general` 프리셋 id 또는 `null`, `quick_fix_chip_bindings`는 같은 모양으로 `applies_to=quick_fix` 프리셋 id 또는 `null`을 가리킨다. 두 맵은 프리셋 목록과 같은 revision CAS 아래 `impl-preset-bind { …, applies_to? }`로 바꾸고(없으면 general), 계열이 다른 프리셋은 `preset_route_mismatch`로 거부한다. 프리셋 삭제는 같은 mutation에서 두 맵 모두의 그 id를 비운다.
- 판정 칩 `복잡`·`frontend`·`backend` 클릭은 서버 op `chip-preset-toggle { id, chip, expected_revision, root_dir? }`가 지정 워크스페이스에서 이슈를 읽어 판정한다. 이슈 계열은 `route === 'quick_fix'`이면 quick_fix, 그 밖(route 없음 포함)은 general이고 그 계열 맵의 바인딩을 쓴다. 바인딩이 없으면 `chip_unbound`로 아무것도 쓰지 않는다. `chip_preset_source === chip`이고 `applied_exec_preset === 그 계열 바인딩 id`면 복원, 그 밖은 적용이다.
- 적용은 `apply-impl-preset`과 같은 argv 규칙(이슈 계열 키 집합 교체 + `applied_exec_preset`)에 `chip_preset_source=<chip>`을 더하고, `chip_preset_restore`가 없을 때만 클릭 직전 핀과 `applied_exec_preset`을 JSON으로 보관한다. 마지막 클릭이 이기되 복원 대상은 언제나 첫 클릭 전이다. 적용 뒤 이슈 route가 바뀌어도 이슈를 훑지 않는다.
- 복원은 한 argv로 보관된 핀을 되돌리고 나머지 핀·`applied_exec_preset`·두 칩 키를 지운다. 보관이 없거나 깨졌으면 전부 해제하고 `restore_fallback`을 답한다.
- 한 전이(이슈 읽기 → 계열 바인딩 판정 → 쓰기 → 재조회)는 (워크스페이스, 이슈)별 promise 체인으로 요청 순서대로 직렬화한다.
- 편집기의 `apply-impl-preset`은 두 칩 키를 같은 argv에서 unset한다. 개별 키 편집은 두 키를 건드리지 않고 결과는 칩의 `diverged` 상태로 드러난다. 전역 적용·프리셋 삭제·바인딩 해제는 이슈를 훑지 않는다.

바인딩 편집 위치

- 칩 바인딩 편집은 모니터 일괄 창의 서버 전역 탭에만 있고, 저장소 하나를 편집하는 창(전체 설정 창·레포 카드 창)에는 서버 전역 값을 섞지 않는다. 그 탭만 `적용 대상` 저장소 선택과 무관하다.

## Consequences

- 같은 칩이 이슈 route에 따라 다른 프리셋을 적용한다. 칩 위에는 그 이유가 보이지 않으므로 이 기록이 그 근거다.
- 되돌리려면 `exec-presets.json` 스키마(`quick_fix_chip_bindings`), `impl-preset-bind`·`chip-preset-toggle` 프로토콜, 세 탭(워커·모니터·이슈 상세)의 `chipPresetBinding` 판정, 일괄 창 칩 탭이 함께 움직여야 하고, 이미 칩으로 적용된 quick_fix 이슈에는 칩 키가 남는다.
- 기존 파일은 이행 없이 quick fix 맵이 비어 있는 것으로 읽힌다. 기존 quick_fix 이슈에는 소급 적용하지 않는다.
