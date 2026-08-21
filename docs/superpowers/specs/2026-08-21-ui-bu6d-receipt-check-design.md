---
scope:
  - server/worker/receipt-check.js
  - server/worker/scheduler.js
  - server/worker/merge-gate.js
  - server/worker/exec-enums.js
  - server/ws/exec-preset-handlers.js
  - server/workflow-enrich.js
  - app/views/settings-dialog/
  - app/views/detail-panel/
---

# UI-bu6d — Worker 영수증 검증: 성립 불가 조합 관측·표시와 merge gate 보류

## 배경

dotfiles-9og9(closed, PR #418)가 exec_receipt 어휘를 재설계했다: main 계열은
자유 서술이 아니라 고정 4토큰(`bead|quick_fix_default|phase_line|takeover`)이며
각 토큰은 기계 대조 가능한 계층 상태 술어를 가진다. 발단은 dotfiles-65es 무인
세션이 `exec_receipt=main:user_choice`를 근거 없이 기록한 사건이다. 이 spec은
그 어휘의 **Worker(beads-ui) 측 시행**을 설계한다.

canonical 정의는 dotfiles `docs/contracts/workflow-state.yaml`
(`metadata.parent_keys.exec_receipt`, `impl_dispatch`, `workflow_mode_source`,
`verify_receipt`, `workspace_kv_defaults.allowed_keys`)과
`docs/contracts/workflow-contract.md`(L52–L54 main 토큰 술어, L102
workflow_mode_source 규칙)에 있다. beads-ui는 소비자이며 이 spec은 계약을
복제하지 않고 관측·시행 지점만 정의한다.

## 확정 결정 (사용자 결정, 2026-08-21)

1. **검사 위치**: 세션 완료 시점(기록·표시)과 merge gate(보류) 두 곳.
   admission은 dispatch 전이라 새 exec_receipt가 없어 대상이 아니다.
2. **실패 파급**: 성립 불가 영수증 관측은 attempt 실패도 auto_advance halt도
   일으키지 않는다. 영수증 오류는 산출물 결함이 아닌 기록 문제이므로, 지키는
   선은 "성립 불가 영수증으로 머지 자격을 얻지 못한다"뿐이다. fail-closed
   지점은 merge gate 하나다.
3. **preset**: `impl_dispatch`는 workspace kv(세션 기본값) 경로에서만 제거한다.
   Bead별 preset apply와 effective-settings 개별 편집은 사용자 쓰기이므로
   계약(`write_rule: user_write_only`)과 양립해 유지한다.
4. **verify 재실행**: 신규 실행 경로를 도입하지 않는다. pre-merge `[verify]`
   재실행은 `verify-cmd.js` + merge-gate 영수증 결속으로 이미 구현되어
   required tier 재실행 요구를 충족한다. Bead metadata `verify_receipt`는
   형식·결속 대조만 하며 표시 전용이다(optional 키이므로 머지 보류 사유가
   아니다).

## 설계

### 1. 순수 검사기 `server/worker/receipt-check.js` (신규)

admission.js/merge-gate.js와 같은 패턴: 순수 평가기, 외부 효과는 주입 deps.

입력:
- `metadata` — 완료(또는 게이트) 시점에 관측한 Bead metadata.
- `baseline` — attempt가 dispatch 직전 뜬 스냅샷(§2). 없으면 `null`
  (Worker attempt 기록이 없는 머지 후보).
- `lineage` — delegation-monitor 계보 조회 deps: 같은 attempt에
  `role=implementation`인 delegated 세션 launch 기록이 존재하는가.

출력: `{ ok: true, checks } | { ok: false, violations, checks }`.
`violations[]`는 `{ code, detail }`, `checks`는 판정한 항목의 관측 요약
(표시층 소비용).

검사 술어 — 계약 L54의 same-write 술어를 무인 관측으로 옮긴 것:

| 관측 | 성립 조건 | 위반 code |
| --- | --- | --- |
| `exec_receipt=main:bead@<sha>` | metadata `impl_dispatch=main` 실재 | `main_receipt_unbacked` |
| `main:quick_fix_default@<sha>` | `route=quick_fix` 그리고 `impl_dispatch` 부재 | `main_receipt_unbacked` |
| `main:phase_line@<sha>` | 해당 Bead(full_plan child)의 `planned_execution=main` 실재 | `main_receipt_unbacked` |
| `main:takeover@<sha>` | delegation-monitor에 같은 attempt의 delegated 계보 존재 | `takeover_lineage_missing` |
| main 계열인데 고정 4토큰 외 (`user_choice` 포함) | 항상 위반 — historical-read 전용 | `main_reason_retired` |
| `exec_receipt` 형식 자체 불일치 | `delegated:<model>@<40hex>` 또는 `main:<token>@<40hex>` 또는 unit_plan 다중형 | `exec_receipt_malformed` |
| `impl_entry`/`plan_approval`이 baseline에 없다가 등장 | 무인 attempt에서는 항상 위반 (실제 standard 사용자만 쓸 수 있는 키) | `approval_forged` |
| `workflow_mode_source=user`가 baseline에 없다가 등장 | 무인 attempt에서는 항상 위반 | `mode_authority_forged` |
| `verify_receipt` 존재 시 | `<bundle>@<40hex>:<exit>` 파싱 + SHA 40hex | `verify_receipt_malformed` — **표시 전용**, 아래 §4에서 보류 사유에서 제외 |

baseline이 `null`이면 baseline 의존 검사(`approval_forged`,
`mode_authority_forged`)는 판정하지 않는다(스냅샷 없이 "새 등장"을 주장할 수
없다). 다중 유닛(`unit_plan` 존재) 형식은 각 항목을 같은 술어로 검사한다.

### 2. dispatch 시점 스냅샷 `receipt_baseline`

attempt 기록에 dispatch 직전 `{ exec_receipt, impl_entry, plan_approval,
workflow_mode_source }`의 존재값을 durable 저장한다. 기존
`exec_stamped_keys`/`workflow_mode` prior와 같은 위치·수명. 값이 없던 키는
부재로 기록한다("새로 등장" 판정의 기준).

### 3. 세션 완료 시점 — 기록만

scheduler의 세션 성공 처리(verdict OK, `verifyPrSubmitted` 호출 구간)에서
무인 attempt에 대해 receipt-check를 실행하고 결과를 attempt에
`receipt_check` 패치로 기록한다.

- 위반이 있어도 attempt는 성공 경로를 계속 간다(레인 이동, PR wait).
  `failAttempt`도 auto_advance halt도 호출하지 않는다.
- 검사 인프라 오류(bd 읽기 실패, monitor 스트림 손상)는 로그만 남기고
  `receipt_check`에 `probe_error`로 기록한다 — 진행을 막지 않는다.
- 검사 대상은 무인 attempt(Worker dispatch)다. 검사 실행 자체는 세션 완료
  1회다.

### 4. merge gate — 유일한 fail-closed 지점

`evaluateMergeGate` 입력에 receipt 상태를 추가한다. 판정:

- attempt 기록의 `receipt_check`가 있으면 그것을 소비하고, 없으면(외부 경로
  머지 후보) 현재 metadata로 baseline 없는 검사를 게이트에서 직접 수행한다.
- `verify_receipt_malformed`를 **제외한** 위반이 하나라도 있으면 자동 머지
  자격 미달 — 기존 verify-receipt 미충족 보류와 같은 방식으로 사유
  (`receipt_unbacked:<code>`)를 노출하고 보류한다. 사용자가 보드에서 원인을
  보고 수동으로 해소한다(영수증 정정 또는 판단 후 수동 머지).
- 게이트 시점 probe 오류는 기존 ancestry probe 관례를 따른다: 게이트에서는
  보류(fail-closed), 보드 표시층에서는 fail-quiet.

### 5. `workflow_mode_source` 쓰기 시행

Worker가 무인 dispatch에서 `workflow_mode=fast_track`을 스탬프할 때 같은
write에 `workflow_mode_source=worker`를 함께 쓰고 readback한다. revert 시
두 키를 함께 원복한다(원래 부재였으면 unset). 현재 이 키를 전혀 쓰지 않는
것은 계약 L102 위반이다.

### 6. exec-enums — workspace kv에서 `impl_dispatch` 제거

- `SESSION_DEFAULT_KEYS`에서 `impl_dispatch` 제거 → kv 저장(Apply path 2)과
  세션 기본값 해석 경로에서 사라진다. 계약 `allowed_keys`(11키)와 일치.
- `IMPL_PRESET_KEYS`(Bead별 apply, path 1)는 `impl_dispatch` 유지.
  `validateImplPresetSettings`의 main 시 coherence 완화도 유지.
- 프론트 미러: `app/views/settings-dialog/session-model.js`의 세션 기본값
  편집에서 `impl_dispatch` 제거. Bead별 preset·effective-settings 표시·편집은
  유지.
- 기존 kv에 남은 `impl_dispatch` 값은 키 단위 무시+경고(계약
  workspace_kv_defaults fail-quiet 규칙).

### 7. 표시층

effective-settings/workflow-enrich 계열 projection에 `receipt_check` 요약을
노출해 보드에서 위반 attempt에 경고를 표시한다. 표시층은 관례대로
fail-quiet: 값 부재·파싱 실패는 표시 생략이며 권위를 만들지 않는다.

## 오류 처리 요약

| 상황 | 완료 시점 | merge gate | 표시층 |
| --- | --- | --- | --- |
| 성립 불가 조합 관측 | 기록 + 경고 | 보류 (자격 미달) | 경고 칩 |
| verify_receipt 형식 위반 | 기록 | 보류하지 않음 | 경고 칩 |
| 검사 probe 오류 | 로그 + `probe_error` 기록 | 보류 (기존 관례) | quiet |

## 테스트 계획

- `receipt-check.test.js`: 술어별 성립/위반 각 1케이스 이상, baseline 부재
  시 판정 생략, 다중 유닛 형식, malformed 입력.
- `scheduler.test.js` 추가: 위반 기록 후에도 레인 이동이 일어난다, probe
  오류가 진행을 막지 않는다, fast_track 스탬프가 `workflow_mode_source=worker`
  를 동반하고 revert가 두 키를 원복한다.
- `merge-gate.test.js` 추가: 위반 시 보류·사유 노출, verify_receipt 형식
  위반 단독으로는 보류하지 않음, attempt 기록 부재 시 게이트 직접 검사.
- `exec-enums.test.js`·프론트 테스트 갱신: kv 키 목록 11키, preset 키 유지,
  kv 잔존 값 무시 경고.

## 구현 unit 후보 (advisory)

- `receipt-check`: server/worker/receipt-check.js — 순수 검사기 + 단위 테스트
- `worker-integration`: server/worker/scheduler.js, server/worker/merge-gate.js
  — 스냅샷·완료 기록·게이트 보류·workflow_mode_source
- `enums-and-display`: server/worker/exec-enums.js,
  server/ws/exec-preset-handlers.js, app/views/ — kv 제거·표시층
