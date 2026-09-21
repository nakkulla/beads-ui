---
id: UI-00lf
title: 이슈별 프리셋 적용은 오케스트레이션 3키를 포함한 17키를 Bead에 교체 핀하고 quick_fix route는 오케스트레이션도 quick_fix 값을 우선 역매핑한다 — 25키 프리셋·단일 전역 적용·workflow_mode 제외·구현 키 역매핑은 UI-7yh2를 승계한다
status: superseded
date: 2026-09-15
summary: "이슈별 프리셋 적용은 오케스트레이션 3키를 포함한 17키(BEAD_PIN_KEYS)를 Bead에 교체 핀하고 quick_fix route는 오케스트레이션도 quick_fix 값을 우선 역매핑하며 투영된 오케스트레이션 값은 모델 기준으로 검증한다; skipped_orchestration_keys는 폐기한다; 25키 프리셋·단일 전역 적용·workflow_mode 제외·구현 키 역매핑·UI-s8qn 승계분은 UI-7yh2에서 승계한다"
supersedes: [UI-7yh2]
superseded_by: UI-xq3h
spec: docs/superpowers/specs/2026-09-15-issue-preset-pins-orchestration-design.md
bead: UI-00lf
---

# 이슈별 프리셋 적용은 오케스트레이션 3키를 포함한 17키를 Bead에 교체 핀하고 quick_fix route는 오케스트레이션도 quick_fix 값을 우선 역매핑한다 — 25키 프리셋·단일 전역 적용·workflow_mode 제외·구현 키 역매핑은 UI-7yh2를 승계한다

## Context

ADR UI-7yh2(2026-09-10)는 이슈별 프리셋 적용에서 "오케스트레이션 키는 핀하지
않는다"고 정했다. 이 조항은 2026-08-20 실행 탭 프리셋 설계 결정 4("오케스트레이션은
큐 전역이라 핀 불가")를 ADR 0032 → UI-s8qn → UI-7yh2가 승계한 것이다. 그래서
`apply-impl-preset`은 `BEAD_APPLY_KEYS` 14키만 `bd update`로 기록하고 응답에
`skipped_orchestration_keys` 6키를 실어 이슈 상세가 "오케스트레이션 3키는 Bead에 핀할
수 없어 건너뛰었습니다" 토스트와 카드 힌트를 그렸다.

그러나 워커 런타임은 2026-07-16(UI-lo1k)부터 오케스트레이션 3키를 **Bead metadata >
워크스페이스 큐 > 폴백** 순으로 읽는다(`policy.js resolveExecSettings`,
`attach.js` 스냅샷). 이슈 상세의 수동 편집(`update-exec-settings`)도 이 3키를 핀하고
유효 실행 설정 카드는 `핀` 배지로 보여준다. "핀 불가"는 런타임과 어긋난 서술이었고 막힌
곳은 프리셋 적용 경로 하나뿐이었다. 사용자가 이슈에 프리셋을 적용해 그 이슈의 총괄
모델을 정하려 해도 되지 않는 것이 관찰된 결과다(UI-00lf 스펙 §1).

dotfiles 계약(`workflow-state.yaml metadata`)은 `orchestration_model`을
`user_only_never_controller`로 둔다. 이슈 상세에서 사용자가 누르는 프리셋 적용은 사용자
쓰기이므로 `impl_dispatch`(`user_write_only`)를 핀 키에 넣은 것과 같은 논리로 허용된다.
계약 키·어휘는 바뀌지 않는다.

실재한 대안은 셋이었다(스펙 §2).

- **17키 전부 교체, quick_fix는 구현 키와 같은 규칙으로 역매핑**(선택) — 규칙이 하나이고
  런타임·수동 편집과 일치한다. 수동 핀한 오케스트레이션 값은 프리셋 값으로 대체된다.
- **오케스트레이션은 set만 하고 unset하지 않음** — 수동 핀은 보존되지만 키 그룹마다 규칙이
  갈리고, 프리셋 A → B 전환 시 A의 오케스트레이션 값이 남는다.
- **토스트 문구만 안내형으로 바꾸고 동작 유지** — 사용자가 기대한 결과를 주지 못한다.

## Decision

**이슈 핀 키 집합 `BEAD_PIN_KEYS`는 17키다.** `[...ORCHESTRATION_KEYS, ...BEAD_APPLY_KEYS]`
순서로 `server/worker/exec-enums.js`에 정의하고 `app/views/settings-dialog/session-model.js`가
같은 이름으로 미러한다. `BEAD_APPLY_KEYS`(14키)·`IMPL_PRESET_KEYS`(25키)·`PRESET_KV_KEYS`는
그대로다 — `BEAD_APPLY_KEYS`는 `IMPL_PRESET_KEYS`의 재료라 거기에 3키를 넣으면 프리셋 키가
중복되므로 이슈 핀 전용 집합을 따로 둔다.

**이슈별 적용은 17키를 교체한다.** `buildApplyImplPresetArgs`는 `BEAD_PIN_KEYS`마다 프리셋에
있으면 `--set-metadata`, 없으면 `--unset-metadata`를 한 argv에 담는다. 프리셋에 없는
오케스트레이션 키는 unset되어 그 이슈의 총괄 값은 워크스페이스 큐(quick_fix route면
quick_fix 레인 ?? 일반)로 떨어진다. 수동으로 핀해 둔 오케스트레이션 값은 다른 키와
마찬가지로 프리셋 값으로 대체된다.

**quick_fix route 이슈는 오케스트레이션도 역매핑한다.** `presetSettingsForIssue`는
`route=quick_fix`이면 `orchestration_model`·`orchestration_effort`·`orchestration_speed`
각각을 `preset[QUICK_FIX_LANE_MAP[key]] ?? preset[key]`로 만든다. Bead에 쓰는 이름은
route와 무관하게 `orchestration_*`이며 `policy.js`가 읽는 이름과 같다.

**투영된 오케스트레이션 3키는 핀 전에 모델 기준으로 검증한다.** `validateOrchestrationPin`은
`orchestration_model`이 카탈로그 모델이고 `orchestration_effort`가 그 모델의
`modelOrchestrationEfforts`, `orchestration_speed`가 그 모델 러너의 `modelSpeedTiers`에
있는지 본다. 모델이 없으면 effort·speed는 전역 enum만 본다. 실패는
`impl_preset_incompatible:invalid_orchestration_<key>`이고 metadata를 쓰지 않는다.
디스패치 시점의 `policy.js` fail-closed는 2차 안전망으로 남는다.

**`skipped_orchestration_keys`는 폐기한다.** 서버 응답은 `{ applied, conflict, revision,
issue }`이고 클라이언트의 상태·토스트 분기·`data-preset-skip-notice` 힌트를 제거한다.
성공 토스트는 "실행 프리셋을 적용했습니다." 하나다. 적용 결과 표시는 기존 층 모델(핀 >
quick_fix 전역 > 일반 전역)로 충분하며 새 표시 요소는 없다.

**UI-7yh2에서 승계하는 조항.** 실행 프리셋은 25키 워크스페이스 프로파일이고
`workflow_mode`는 프리셋 키가 아니다. 전역 적용(`apply-impl-preset-global`)은 `lane` 없이
한 번에 kv 18키와 큐 6키를 교체하며 프리셋에 없는 quick_fix 키는 unset되어 일반 키로
폴스루한다. `workflow_mode`는 프리셋과 이슈 핀 밖의 세션 기본값이다. quick_fix route 이슈의
구현 4키·`impl_runtime` 역매핑과 `validateImplSettings` 검사는 그대로다. 비교 탭 서명
대조와 bench tuple의 route 유효값 규칙도 그대로다. UI-s8qn 승계분(`auto|claude|codex`
어휘, `auto`의 provider 비유도, `inherit` 비호환, 구 서버 probe 부재, quick_fix 키의 일반 키
폴스루, kv 먼저 큐 나중의 비원자성, `quick_fix_orchestration_model` 키 존재의 capability
gating)도 그대로 승계한다.

## Consequences

- 핀 키 집합·응답 형식·ADR 전제가 함께 바뀌므로 한 줄 수정으로 되돌릴 수 없다.
- "왜 총괄 모델이 이슈마다 다른가"는 런타임의 Bead 우선 해석을 알아야 이해된다.
- 오케스트레이션 값을 수동으로 핀해 둔 이슈에 프리셋을 적용하면 그 값은 프리셋 값(또는
  unset)으로 대체된다 — 규칙이 하나인 대가다.
- quick_fix 역매핑으로 일반 모델과 quick_fix effort가 섞여 모델 범위를 벗어나는 조합은
  디스패치가 아니라 적용 시점에 거절되어 사용자가 즉시 안다.
- `app/protocol.md`의 `apply-impl-preset` 항목은 17키 교체와 quick_fix 양축 우선을
  서술한다.
