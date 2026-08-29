---
scope:
  - server/worker/receipt-check.js
  - server/worker/scheduler.js
  - server/worker/merge-gate.js
  - server/worker/exec-enums.js
  - server/ws/exec-preset-handlers.js
  - server/ws/worker-handlers.js
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
- `metadata` — 평가 시점(완료 또는 게이트)에 관측한 Bead metadata.
- `baseline` — attempt가 dispatch 직전 뜬 스냅샷(§2). 없으면 `null`
  (Worker attempt 기록이 없는 머지 후보).
- `lineage` — delegation-monitor 계보 조회 deps: 같은 attempt의
  `role=implementation` delegated 세션 목록(모델·launch_id·상태 포함).
- `defaults` — `execution-defaults.js` projection 조회 deps
  (`quick_fix` route의 dispatch 기본값; `supported=false`면 판정 불가로
  표기).
- `head` — attempt가 인도한 unit head SHA(들). verify_receipt 결속 대조용.

출력: `{ ok: true, checks } | { ok: false, violations, checks }`.
`violations[]`는 `{ code, detail }`, `checks`는 판정한 항목의 관측 요약
(표시층 소비용).

검사 술어 — 계약 L54의 same-write 술어를 무인 관측으로 옮긴 것:

| 관측 | 성립 조건 | 위반 code |
| --- | --- | --- |
| `exec_receipt=main:bead@<sha>` | metadata `impl_dispatch=main` 실재 | `main_receipt_unbacked` |
| `main:quick_fix_default@<sha>` | `route=quick_fix` 그리고 `impl_dispatch` 부재 그리고 execution-defaults projection의 quick_fix dispatch 기본이 `main` (projection `supported=false`면 이 요소는 판정 생략·`checks`에 기록) | `main_receipt_unbacked` |
| `main:phase_line@<sha>` | 해당 Bead(full_plan child)의 `planned_execution=main` 실재 | `main_receipt_unbacked` |
| `main:takeover@<sha>` | delegation-monitor에 같은 attempt의 `role=implementation` delegated 세션이 존재하고, 그 세션이 terminal `done`(candidate delivery 증거)이며, 세션 기록의 모델이 attempt의 resolved 구현 모델과 일치 | `takeover_lineage_missing` |
| main 계열인데 고정 4토큰 외 (`user_choice` 포함) | 항상 위반 — historical-read 전용 | `main_reason_retired` |
| `exec_receipt` 형식 자체 불일치 | `delegated:<model>@<40hex>` 또는 `main:<token>@<40hex>` 또는 unit_plan 다중형 | `exec_receipt_malformed` |
| `unit_plan` 존재 시 다중 유닛 영수증 | 영수증의 unit 이름 집합이 `unit_plan`의 유닛 집합과 정확히 일치(누락·잉여·중복 없음), 각 항목은 위 단일 술어를 개별 통과 | `unit_plan_mismatch` |
| `impl_entry`/`plan_approval`이 baseline 대비 등장 **또는 값 변경** | 무인 attempt에서는 항상 위반 (실제 standard 사용자만 쓸 수 있는 키) | `approval_forged` |
| `impl_dispatch`가 baseline 대비 등장 또는 값 변경 | 무인 attempt에서는 항상 위반 (`write_rule: user_write_only`) | `dispatch_forged` |
| `workflow_mode_source`가 baseline 대비 `user`로 등장 또는 변경 | 무인 attempt에서는 항상 위반 | `mode_authority_forged` |
| `verify_receipt` 존재 시 | `<bundle>@<40hex>:<exit>` 파싱, SHA가 attempt unit head와 일치 또는 그 조상, exit 정수 파싱(0 여부는 `checks`에 기록). bundle 이름은 기대값의 canonical 원천이 없어 실측 제외 | `verify_receipt_malformed` / `verify_receipt_unbound` — **표시 전용**, §4에서 보류 사유에서 제외 |

baseline이 `null`이면 baseline 의존 검사(`approval_forged`,
`dispatch_forged`, `mode_authority_forged`)는 판정하지 않는다(스냅샷 없이
"등장·변경"을 주장할 수 없다).

### 2. dispatch 시점 스냅샷 `receipt_baseline`

attempt 기록에 dispatch 직전 `{ exec_receipt, impl_entry, plan_approval,
workflow_mode_source, impl_dispatch }` 5키의 **정확한 값**(부재는 부재로)을
durable 저장한다. 기존 `exec_stamped_keys`/`workflow_mode` prior와 같은
위치·수명. "등장·변경" 판정의 기준이다.

### 3. 세션 완료 시점 — 기록만

scheduler의 세션 성공 verdict 직후, **경로 분기(external-PR 해소·quick-fix
착지·일반 구현) 전 공통 지점**에서 무인 attempt에 대해 receipt-check를
실행하고 결과를 attempt에 `receipt_check` 패치로 기록한다. quick-fix 성공
경로(`settleQuickfixLanding`)가 먼저 반환되어 검사가 빠지는 일이 없도록
분기 앞에 둔다 — `main:quick_fix_default`는 바로 quick-fix attempt에서
나오는 토큰이다.

- 위반이 있어도 attempt는 성공 경로를 계속 간다(레인 이동, PR wait 또는
  quick-fix 착지). `failAttempt`도 auto_advance halt도 호출하지 않는다.
- 검사 인프라 오류(bd 읽기 실패, monitor 스트림 손상)는 로그만 남기고
  `receipt_check`에 `probe_error`로 기록한다 — 진행을 막지 않는다.
- 검사 대상은 무인 attempt(Worker dispatch)다. 검사 실행 자체는 세션 완료
  1회다.

### 4. merge gate — 유일한 fail-closed 지점

`evaluateMergeGate` 입력에 receipt 상태를 추가한다. 판정:

- 게이트 평가는 attempt의 `receipt_check` 기록을 판정에 **재사용하지
  않는다**. 매 평가마다 현재 관측한 Bead metadata를 저장된
  `receipt_baseline`·lineage(attempt 기록이 있으면)와 함께 receipt-check로
  재검사한다. 완료 후 metadata가 바뀐 경우 — 악화(추가 위조)든 정정(사용자
  해소)이든 — 현재 상태가 판정을 결정하므로, 정정하면 보류가 자동으로
  풀리고 stale 통과도 없다. §3의 `receipt_check` 기록은 표시·이력 전용이다.
- attempt 기록이 없는 머지 후보(외부 경로)는 baseline 없는 검사만 현재
  metadata로 수행한다.
- `verify_receipt_malformed`/`verify_receipt_unbound`를 **제외한** 위반이
  하나라도 있으면 자동 머지 자격 미달 — 기존 verify-receipt 미충족 보류와
  같은 방식으로 사유(`receipt_unbacked:<code>`)를 노출하고 보류한다.
  사용자가 보드에서 원인을 보고 수동으로 해소한다.
- 보류는 **자동 머지 자격**에만 걸린다. 사용자의 `[머지]` 클릭은 그 head에
  결속된 manual 머지 권위(UI-58w8 §1, `merge_queue[].authority.source =
  'manual'`)를 남기며, 게이트는 이 권위가 관측 head와 같은 SHA를 가리키면
  영수증 tier를 `waived`로 통과시킨다(2026-08-24 보정). 영수증 위반은 산출물
  결함이 아닌 기록 문제이므로 사람의 클릭이 곧 해소 판단이다. 위반 코드는
  보드에 그대로 남고, 자동 등록(`automatic`)은 면제되지 않으며, 클릭 이후
  head가 움직이면 권위가 그 head를 덮지 않아 다시 보류된다.
- 게이트 시점 probe 오류는 기존 ancestry probe 관례를 따른다: 게이트에서는
  보류(fail-closed), 보드 표시층에서는 fail-quiet.

**정정(UI-h6t1).** "`verify_receipt_*`를 제외한 위반 하나라도 있으면 자동 머지
자격 미달"은 dotfiles 계약
`workflow-state.yaml metadata.parent_keys.exec_receipt.merge_gate`로 승계됐다 —
보류는 `hold` 집합만이고, `badge` 집합은 표시 전용이다. 등급의 정본은 그 계약이며
beads-ui는 `receipt-check.js`의 `EXEC_RECEIPT_MERGE_GATE` 상수로 복제 소비한다
(ADR 0012). 이 절의 나머지 — 매 평가 재검사·`waived`·probe 오류 fail-closed — 는
그대로다.

### 5. `workflow_mode_source` 쓰기 시행

Worker가 무인 dispatch에서 `workflow_mode=fast_track`을 스탬프할 때 같은
write에 `workflow_mode_source=worker`를 함께 쓰고 readback한다. revert 시
두 키를 함께 원복한다(원래 부재였으면 unset). 현재 이 키를 전혀 쓰지 않는
것은 계약 L102 위반이다.

### 6. exec-enums — workspace kv에서만 `impl_dispatch` 제거

현재 `SESSION_DEFAULT_KEYS`(12키)는 kv 저장(Apply path 2)과 Bead별 apply
(path 1)가 공유하고 `IMPL_PRESET_KEYS`(15키)의 기반이므로, 거기서만 빼면
Bead별 apply·전체 preset에서도 함께 사라져 확정 결정 3을 위반한다. 키
목록을 세 개로 분리한다:

- `WORKSPACE_KV_KEYS`(11키, `impl_dispatch` 제외) — kv 저장·해석
  경로(Apply path 2, 세션 기본값 다이얼로그)가 소비. 계약
  `allowed_keys`와 일치.
- `BEAD_APPLY_KEYS`(12키, `impl_dispatch` 포함) — Bead별 preset apply
  (path 1)와 effective-settings 개별 편집이 소비.
- `IMPL_PRESET_KEYS`(15키 = BEAD_APPLY_KEYS + orchestration 3키) — 전체
  프로필 preset 정의·검증이 소비. `validateImplPresetSettings`의 main 시
  coherence 완화 유지.

(목록 이름은 구현에서 조정 가능하되 세 소비 경로의 분리는 유지한다.)

- 프론트 미러: `app/views/settings-dialog/session-model.js`의 세션 기본값
  편집에서 `impl_dispatch` 제거. Bead별 preset·effective-settings 표시·편집은
  유지.
- 기존 kv에 남은 `impl_dispatch` 값은 키 단위 무시+경고(계약
  workspace_kv_defaults fail-quiet 규칙).

### 7. 표시층 — worker snapshot 경유

`receipt_check` 요약(위반 code 목록·probe_error 여부)은 attempt 기록에
있으므로, Bead metadata 기반 `workflow-enrich` projection이 아니라 **worker
snapshot**(`server/ws/worker-handlers.js`)에 싣는다 — 이미
`review_receipt_state`/`verify_receipt_state`가 attempt/PR 행에 실려 UI로
push되는 것과 같은 transport다. 보드의 Worker/PR 대기 표면이 위반 attempt에
경고를 표시한다. 표시층은 관례대로 fail-quiet: 값 부재·파싱 실패는 표시
생략이며 권위를 만들지 않는다.

## 오류 처리 요약

| 상황 | 완료 시점 | merge gate | 표시층 |
| --- | --- | --- | --- |
| 성립 불가 조합 관측 | 기록 + 경고 | 현재 metadata 재검사로 보류 (자격 미달) | 경고 표시 |
| verify_receipt 형식·결속 위반 | 기록 | 보류하지 않음 | 경고 표시 |
| 검사 probe 오류 | 로그 + `probe_error` 기록 | 보류 (기존 관례) | quiet |

## 테스트 계획

- `receipt-check.test.js`: 술어별 성립/위반 각 1케이스 이상 — main 4토큰
  각각, 은퇴 토큰, malformed, unit_plan 집합 일치/누락/잉여, baseline 값
  변경 감지(approval/dispatch/mode_authority), baseline 부재 시 판정 생략,
  execution-defaults `supported=false` 생략 기록, verify_receipt 결속
  (head 일치·조상·불일치·exit 파싱).
- `scheduler.test.js` 추가: 위반 기록 후에도 레인 이동이 일어난다,
  **quick-fix 착지 경로에서도 `receipt_check`가 기록된다**, probe 오류가
  진행을 막지 않는다, fast_track 스탬프가 `workflow_mode_source=worker`를
  동반하고 revert가 두 키를 원복한다, dispatch 시 `receipt_baseline` 5키
  스냅샷이 기록된다.
- `merge-gate.test.js` 추가: 위반 시 보류·사유 노출, **완료 후 metadata
  정정 시 다음 평가에서 보류가 풀린다**, 완료 후 악화 시 이전 정상 기록에
  기대지 않고 보류한다, verify_receipt 위반 단독으로는 보류하지 않음,
  attempt 기록 부재 시 baseline 없는 검사만 수행.
- `exec-enums.test.js`·프론트 테스트 갱신: kv 키 목록 11키, Bead apply
  12키, preset 15키 분리와 각 소비 경로, kv 잔존 값 무시 경고.
- `worker-handlers` 테스트: `receipt_check` 요약이 snapshot에 실린다,
  부재 시 생략(fail-quiet).

## 구현 unit 후보 (advisory)

- `receipt-check`: server/worker/receipt-check.js — 순수 검사기 + 단위 테스트
- `worker-integration`: server/worker/scheduler.js, server/worker/merge-gate.js
  — 스냅샷·완료 기록·게이트 재검사 보류·workflow_mode_source
- `enums-and-display`: server/worker/exec-enums.js,
  server/ws/exec-preset-handlers.js, server/ws/worker-handlers.js,
  app/views/ — 키 목록 분리·표시층
