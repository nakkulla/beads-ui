---
scope:
  - server/worker/scheduler.js
  - server/worker/queue-store.js
  - server/ws/worker-handlers.js
  - app/utils/quickfix-lane.js
  - app/utils/failure-sentences.js
  - app/utils/resume-flow.js
  - app/views/worker/lane-model.js
  - app/views/worker/running-grid.js
  - server/worker/scheduler.test.js
  - server/ws/worker-handlers.test.js
  - app/utils/quickfix-lane.test.js
  - app/utils/resume-flow.test.js
  - app/views/worker/lane-model.test.js
  - app/views/worker/running-grid.test.js
---

# 승인된 작업 방식이 바뀐 이슈의 이전 Worker 실행 재개 정합

- Bead: UI-kq54
- 상태: 사용자 검토용 초안
- 근거 기준: beads-ui `78c4bd14f84ed4ddb2defee05f5624412461ce06`
- 적용 범위: Worker에 등록된 모든 저장소의 attempt 재개·relaunch와 실패 타일 표시

## 문제와 목표

Worker의 첫 dispatch는 실행 레인을 현재 Bead 스냅샷에서 정한다
(`quickfix_lane = snap.route === 'quick_fix'`). 그 값이 attempt 기록에 남고,
hook 모드(`record`/`guard`), 세션 프리앰블의 종점 지시("리뷰드 base push" 대
"PR 제출"), 사실 카드의 착지 스크립트 줄, 완료 판정(push log 정산 대 PR 관측),
base-drift 면제가 전부 이 값 하나를 읽는다.

그러나 재개·relaunch(`relaunchResolvedAttempt`)는 `prior.quickfix_lane`을
새 attempt에 그대로 복사한다. `resume()`이 현재 스냅샷으로 admission을 다시
검사하긴 하지만, admission은 route의 유효성과 spec 영수증만 보고 레인 불일치는
보지 않는다. 그래서 실패 뒤 intake가 route를 `quick_fix`에서 `spec_backed`로(또는
반대로) 재판정한 이슈에서 [이어하기]를 누르면, 현재 승인은 PR 완료인데 세션은
"base push가 임무"라는 계약과 `record` hook으로 되살아난다. Cortex-2nf가 그
상태다: 실패 attempt `Cortex-2nf-1789391523981-4`는 `quickfix_lane=true`,
원인 `quickfix_landing_failed:delivery_unproven:push_log_absent`이고 타일에
[이어하기]가 켜져 있으며, 이슈는 그 뒤 승인 스펙과 `route=spec_backed`,
`spec_review` 영수증을 얻었다. 워크트리는 base(`45f2579`) 위에 clean이고 후보
커밋은 없다.

목표는 하나다. **실행 레인은 매 launch에서 현재 route로만 정해지고, 기록된
레인과 다른 재개·relaunch는 세션을 띄우지 않고 거절하며 그 사유를 보인다.**
이전 세션·검증·효과와 승인 이력은 그대로 보존하고, 새 시작은 기존 첫 dispatch
경로가 현재 승인으로 수행한다. 예전 quick_fix의 base 직접 push 방식과 현재
spec_backed의 PR 완료 방식을 한 세션 안에서 섞지 않는다.

## 선택한 구조 — 거절 + 새 시작

세 안을 비교했고 사용자가 첫 번째를 골랐다.

1. **거절 + 새 시작(채택)**: 레인 불일치는 모든 relaunch 경로에서
   `route_changed`로 거절한다. 복구는 기존 조작으로 한다 — [폐기]가 실패 행을
   `discarded`로 바꿔 후보 fence(`settledAttemptFence`)가 풀리고 이슈가 후보
   레인으로 돌아가며, 사용자가 대기열에 다시 배치하거나 [지금 시작]을 누르면
   일반 pass의 첫 dispatch가 현재 route로 레인을 정한다. 남은 워크트리·브랜치·PR은
   기존 stale-work admission이 판정한다(잃을 것 없음 → 정리 후 dispatch, 후보
   있음 → 가시적 거부와 처분 조작). 세션 승계는 없다.
2. 거절 + 클릭 시 자동 재진입: 같은 거절이지만 route가 바뀐 행의 [이어하기]가
   실패 행을 dismiss하고 즉시 일반 pass를 돌린다. 한 클릭으로 끝나지만
   [이어하기]의 뜻이 상태에 따라 달라진다. 기각.
3. 조건부 승계: clean 워크트리·push log 없음·PR 없음이 증명될 때만 기록된
   세션을 현재 레인으로 잇는다. 이전 transcript에 반대 계약("base push가
   임무")이 남아 재개 세션의 행동을 보장할 수 없고, 후보가 없는 경우엔 새 시작과
   결과가 같다. 기각.

`2026-08-12-worker-relaunch-current-preset-design.md`는 relaunch가 repo·target
base·base OID·충돌/처분 계보를 상속하고 실행 설정만 현재값으로 다시 푼다고
정했다. 이 설계는 그 상속 목록을 바꾸지 않고, 레인이 계보가 아니라 **현재
승인의 실행 방식**이라는 점만 분명히 한다: 레인은 상속 대상이 아니고 launch마다
현재 route에서 유도되며, 기록과 다르면 launch 자체가 없다.

## 판정 규칙

### 레인 유도

레인 어휘는 둘이다. `quick_fix`(리뷰드 base push 착지)와 `pr`(PR 제출 뒤 큐
머지). 유도는 한 함수가 소유한다:

- `app/utils/quickfix-lane.js`(의존성 없는 leaf, `quickfix-resume-kind.js`와 같은
  자리): `laneOfRoute(route)`는 `route === 'quick_fix'`면 `quick_fix`, 그 외
  모든 값(다른 route, `null`, 비enum)은 `pr`를 돌려준다. 첫 dispatch의 현재
  판정(`snap.route === 'quick_fix'`)과 동치이며, 서버와 클라이언트가 같은 사본을
  읽는다.
- attempt 기록의 `quickfix_lane`(boolean)은 그대로 둔다. 기록된 레인은
  `prior.quickfix_lane === true ? 'quick_fix' : 'pr'`로 읽는다. 새 필드로
  route 문자열을 저장하지 않는다 — 판정에 필요한 것은 레인뿐이고, 현재 route는
  Bead가 소유한다(ADR 0012).

### 판정 지점

판정은 한 함수 `laneMismatchOf(prior, bead_snapshot)`가 소유하고, 두 곳에서
부른다.

```
prior_lane   = prior.quickfix_lane === true ? 'quick_fix' : 'pr'
current_lane = laneOfRoute(bead_snapshot.route)
prior_lane !== current_lane
  → { ok: false, reason: 'route_changed',
      route_change: { prior_lane, current_route: bead_snapshot.route ?? null } }
```

**첫 판정 — 진입 경로에서, 워크트리·후보를 건드리기 전.** 지금 `resume()`은
`base_moved` 보존 후보 증명(`proveBaseMovedWait`)을 스냅샷 읽기보다 먼저 하고,
충돌 해소 진입(`resolveConflict`·`dispatchExternalConflict`)은 relaunch 전에
`restoreWorktree`를 실행한다. 레인이 다른 행에서는 그 둘 다 하지 않아야 하므로
순서를 다음으로 고정한다.

- `resume()`: (1) `not_failed`·legacy cleanup·`discard_in_progress`(기존) →
  (2) `worktree_missing`(정산 계열 제외)·`bead_running`·`already_resumed`·
  `prior_attempt` 정산 대기(기존, 쓰기 없음) → (3) 정산 계열이면 기존 정산
  분기로(레인 판정 없음, 「착지된 정산의 예외」) → (4) `snapshotBead`(실패는 기존
  `bd_snapshot_failed`) 뒤 **레인 판정** → (5) `base_moved` 보존 후보 증명·
  `checkAdmission`·relaunch. 바뀌는 것은 `base_moved` 보존 후보 증명이 (1) 앞에서
  (4) 뒤로 옮겨지는 것뿐이고 나머지 거절 순서는 기존 그대로다. 살아 있는
  writer(`bead_running`)는 레인 판정보다 먼저 거절되므로 실행 중인 행에는
  `resume_refused`를 쓰지 않는다. 스냅샷은 (4)에서 한 번 읽어 (5)의 admission과
  relaunch에 그대로 넘긴다.
- `resolveConflict`·`dispatchExternalConflict`: 스냅샷을 읽고 레인 판정을 통과한
  뒤에만 `restoreWorktree`로 간다. 거절은 기존 `resolution_refused` 처리로 흡수된다.
- `dispatchReviseFix`(REVISE 처분)와 공급자 자동 재개는 각각 `relaunchFromAttempt`와
  `resume()`을 지나므로 위 두 자리 중 하나를 통과한다.

**둘째 판정 — launch 직전 재확인.** `resolveContinuationForAttempt`가
`bead_snapshot`을 읽은 직후, 실행 설정을 풀기 전에 같은 함수를 부른다.
대화상자 뒤의 `revalidateContinuationForAttempt`가 스냅샷을 다시 읽어 이 함수를
다시 부르므로, 선택과 launch 사이에 route가 바뀌어도 첫 상태 변경(serial lease
확보 뒤, prerecord 전)에서 잡히고 lease는 기존 실패 경로처럼 해제된다.

승인 상태와의 순서: 재개 경로에서는 레인 불일치가 admission보다 먼저 거절된다 —
기록된 레인을 이어갈 수 없다는 사실이 승인 상태와 무관하게 성립하기 때문이다.
레인이 같으면 기존 admission 사유(`invalid_route`·`spec_missing`·
`receipt_missing_or_malformed`·`receipt_unreachable`·stale 재리뷰)가 지금과 같이
나오고, 새 시작의 승인 판정은 첫 dispatch admission이 맡는다.

**거절이 바꾸지 않는 것과 쓰는 것.** 실행 상태는 바꾸지 않는다: 새 attempt
기록·guard hook·claim·`workflow_mode` stamp·exec stamp·worktree 복원·정리·보존 후보
검증이 없고, 이전 attempt의 `status`·`cause`·`quickfix_landing`·`dismissed_at`은
그대로다 — 거절은 fence가 아니고, route를 되돌리면 같은 행의 다음 클릭이
성공한다. 진단 기록은 쓴다: 이전 attempt의 `resume_refused` 한 필드(「거절의
표현」), 그리고 공급자 자동 재개 경로의 기존 pending 소비와 `auto_resume_refused`
기록. 이 셋이 거절이 허용하는 쓰기의 전부다.

판정을 통과한 relaunch의 새 attempt `quickfix_lane`은 `current_lane`에서 쓴다.
판정이 같음을 보장하므로 값은 prior와 같지만, 소스는 현재 route 하나다.

### 적용 경로

| 경로 | 진입 | 판정 | 비고 |
| --- | --- | --- | --- |
| 수동 [이어하기] (`failed`/`orphaned`/`paused`) | `resume()` → `relaunchFromAttempt` | 거절 | 토스트 + 실패 타일 문장 |
| `waiting`/`base_moved` 보존 후보 이어하기 | `resume()` → `relaunchFromAttempt` | 거절(보존 후보 증명 전) | 보존 후보는 base push용이었다; route가 바뀌었으면 사람이 [폐기]하거나 route를 되돌린다(ADR UI-lmqu-2의 보존 세션 이어하기는 같은 승인 아래의 규칙) |
| 공급자 자동 재개·계정 전환 회복 | `resume(..., provider_auto_resume)` | 거절 | 기존 pending 소비와 `auto_resume_refused='route_changed'` 기록·로그 경로 그대로 |
| 지시와 함께 재시작(`prior_attempt`) | `resume()` | 거절 | 기록된 세션·튜플 승계 이전에 레인이 먼저 불일치 |
| 머지 큐 충돌 해소 relaunch(내부·외부 충돌) | `resolveConflict`·`dispatchExternalConflict` → `relaunchFromAttempt` | 거절(`restoreWorktree` 전) | 기존 `resolution_refused` 처리로 흡수; PR 레인 attempt인데 route가 `quick_fix`로 바뀐 경우 |
| REVISE 처분 relaunch(`dispatchReviseFix`) | `relaunchFromAttempt` | 거절 | 처분은 스펙 수정 세션이라 `quick_fix`로 바뀐 이슈에는 대상이 없다 |
| **[정리 재시도]** (`quickfix_cleanup_resume`, 정산 재실행) | `resume()` → `settleQuickfixLanding` | **판정하지 않음** | 아래 「착지된 정산의 예외」 |
| 첫 dispatch(일반 pass) | `tick` | 해당 없음 | 이미 현재 route에서 유도; `laneOfRoute` 호출로 치환만 한다 |

### 착지된 정산의 예외

[정리 재시도]는 실패 사유가 정산 계열(`resumeKindOf(quickfix_landing) ===
'settlement'`: 정확 일치·`delivery_unproven:` 접두의 세션 사유가 아닌 모든 사유,
`bd_read_failed`·`containment_unobservable`·미지 사유 포함)인 quick_fix 착지 실패
행에서 같은 attempt의 정산(`settleQuickfixLanding`)을 다시 돌리는 조작이다
(UI-8h1x, ADR UI-lmqu-2). 정산은 세션을 띄우지 않고, 인도가 아직 증명되지 않은
행에서는 그 attempt의 push 기록과 head에 묶인 `impl_review`로 base 포함을 스스로
다시 증명한 뒤에야 다음 단계로 간다 — 증명이 다시 실패하면 같은 사유 체계로
다시 실패할 뿐 새 실행은 없다. 따라서 route가 그 뒤 바뀌었어도 정산 재실행은
**기록된 레인으로 완료**한다 — 기록된 attempt가 실제로 만든 효과를 그 attempt의
증거로 마무리하는 것이지 PR 방식과의 혼합이 아니다(사용자 결정). 진입 조건은
기존 사유 판정 그대로이며 커서나 착지 추정을 새 조건으로 더하지 않는다. 정산
분기는 `resume()`에서 레인 판정보다 앞에 갈라져 `resolveContinuationForAttempt`를
지나지 않으므로 코드상 자연히 예외이며, 회귀 테스트로 그 사실을 고정한다.

## 거절의 표현

- **응답**: `resume()`과 ws `worker-attempt-resume` 응답이 `reason:
  'route_changed'`와 함께 `route_change: { prior_lane, current_route }`를 싣는다.
  `continuation_mismatch`와 같은 자리의 선택 필드이고, 다른 거절에는 실리지 않는다.
- **토스트**: `app/utils/resume-flow.js`의 거부 토스트는 `reason`에 대응하는 문장이
  있으면 그 문장을, 없으면 지금처럼 원문 코드를 쓴다. 문장 표는
  `app/utils/failure-sentences.js`에 `RESUME_REFUSALS`로 두고 이번에는
  `route_changed` 하나만 채운다: "승인된 작업 방식이 `<prior_lane>`에서
  `<current_route>`로 바뀌어 이전 세션을 이어갈 수 없습니다. [폐기] 뒤 후보에서
  대기열에 다시 배치하면 현재 방식으로 새로 시작됩니다." (레인·route 값은 응답의
  `route_change`로 채우고, 없으면 값 없이 같은 문장).
- **실패 타일**: 거절 시 서버가 이전 attempt에 `resume_refused:
  'route_changed:<prior_lane>→<current_route>'`를 쓴다(`auto_resume_refused`와 같은
  꼴의 문자열 필드, `queue-store` `makeAttempt` 정규화에 등록). 실패 타일의 안내
  문장 자리(지금 "원인을 확인한 뒤 아래 [이어하기]로 같은 세션에서 작업을
  계속하세요."가 서는 줄)는 이 필드가 `route_changed:`로 시작하면 위 토스트와
  같은 문장을 대신 그린다. 새 슬롯·배지·버튼은 없다(ADR 0014). `can_resume`와
  `resume_eligible`은 바꾸지 않는다 — 클릭은 여전히 가능하고 서버가 매번
  판정한다. 필드가 없는 옛 기록과 옛 서버 payload는 지금 문장 그대로다
  (fail-quiet).
- **자동 재개 보류 타일**: 기존 `auto_resume_refused`가 `route_changed`를 그대로
  보이므로 추가 표시는 없다.
- **타임라인**: 새 이벤트를 추가하지 않는다. 거절은 attempt를 만들지 않으므로
  ADR 0027의 이력 SoT에 실릴 실행 사실이 없다.

## 새 시작 경로(코드 변경 없음)

[폐기]는 실패 행을 `discarded`로 바꾸고 워크트리·브랜치를 아카이브하며
(ADR 0024), `completeDiscardOperation`이 그 이슈를 모든 대기열 레인에서 뺀다.
그래서 이슈는 관측 집합인 후보 레인으로 돌아가지만(ADR 0033) 일반 pass는
대기열 항목만 실행하므로 [폐기]만으로 새 dispatch는 일어나지 않는다. 사용자가
후보에서 저장소 대기열(병렬·직렬 레인)에 다시 배치하거나 [지금 시작]을 누르면,
`latestImplementationAttempt`가 `failed`가 아니라 fence가 풀린 상태에서 일반
pass가 현재 스냅샷으로 admission(spec·영수증·stale 재리뷰)과 stale-work 판정을
거쳐 현재 route의 레인으로 첫 dispatch한다(ADR UI-wc67). 이 경로는 이미 있고 이
설계는 그것을 바꾸지 않는다. 승인 키 위조·사용자 변경 정리·기존 결과 덮어쓰기는
어디에도 없다.

Cortex-2nf에 적용하면: [이어하기] → `route_changed` 거절과 문장 → 사용자의
[폐기] → clean 워크트리 아카이브 → 후보 레인 복귀 → 사용자의 대기열 재배치
또는 [지금 시작] → `spec_backed` 레인(`guard` hook, PR 종점)으로 첫 dispatch.
실패 attempt와 세션 로그, 원래 `quickfix_landing` 사유는 그대로 남는다.

## 보존과 불변

- 이전 attempt의 실행 기록(`status`·`cause`·`cause_detail`·`quickfix_landing`·
  `session_id`·`dismissed_at`)·세션 transcript·타임라인은 읽기만 한다. 거절이 쓰는
  것은 「판정 지점」이 열거한 진단 필드(`resume_refused`, 자동 재개 경로의 pending
  소비와 `auto_resume_refused`)뿐이다.
- Bead metadata는 쓰지 않는다. `route`·`spec_review`·`workflow_mode`는 읽기
  입력이다(ADR 0012, 0046: provider 보존 규칙과 무관).
- 실행 설정 재해석(현재 preset·decision token)·runner mismatch 대화상자·transcript
  부재 fresh 대체·`prior_attempt` 규칙은 그대로다. 레인 판정은 그 앞에 서고,
  통과하면 아무것도 바꾸지 않는다.
- `serial_lane_id`·`bench_run`·`target_base`·`base_oid`·충돌/처분 계보 상속은
  그대로다(2026-08-12 relaunch 스펙).

## 테스트 범위와 완료 기준

`server/worker/scheduler.test.js`의 기존 재개 fixture(`inherits quick_fix lane
with a record-mode hook on resume`, `installs and delivers on a spec_backed
manual resume`)를 유지하고 다음을 추가한다.

1. 같은 route 재개 두 건은 그대로 통과한다(회귀).
2. `quickfix_lane=true` 실패 행 + 스냅샷 `route=spec_backed`(spec_id·spec_review
   있음): `resume()`이 `{ ok:false, reason:'route_changed',
   route_change:{prior_lane:'quick_fix', current_route:'spec_backed'} }`를 돌려주고
   attempt 수·hook install 호출·claim·`workflow_mode` 쓰기·`restoreWorktree`·
   `removeIfDiscardable`·정리 호출이 0이며 이전 행은 `failed`에 `dismissed_at`
   없이 `status`·`cause`·`quickfix_landing` 그대로 남고 `resume_refused`만 기록된다.
3. 역방향: `quickfix_lane=false` 실패 행 + `route=quick_fix`(description 있음)도
   같은 거절. 충돌 해소 진입(`resolveConflict`·`dispatchExternalConflict`)에서는
   워크트리가 없어도 `restoreWorktree`가 호출되지 않고 `resolution_refused`로
   흡수된다.
4. 승인 상태와의 순서: 레인이 같은 `route=spec_backed` 행에서 `spec_review`가
   없거나(`spec_missing`/`receipt_missing_or_malformed`) 영수증 SHA가 도달 불가
   (`receipt_unreachable`)이면 기존 admission 사유가 그대로 나온다; 레인이 다른
   행은 같은 승인 상태에서도 `route_changed`가 먼저다. 어느 쪽도 실행 상태를 쓰지
   않는다.
5. 선택 뒤 변경: runner mismatch 대화상자로 `decision_token`을 받은 뒤 스냅샷
   route가 바뀌면 `revalidateContinuationForAttempt`에서 `route_changed`로 거절되고
   serial lease가 해제되며 prerecord가 없다.
6. 공급자 자동 재개: pending 소비 뒤 `auto_resume_refused='route_changed'`가 이전
   attempt에 남고 자식 attempt는 0개다.
7. `waiting`/`base_moved` 보존 후보 행 + route 변경: 거절, 보존 후보 검증
   (`proveBaseMovedWait`)은 호출되지 않고 보존 후보·워크트리는 그대로다.
8. [정리 재시도]: `quickfix_landing.reason`이 정산 계열인 실패 행은 route가
   바뀌어도 `settleQuickfixLanding`이 호출되고 레인 판정은 돌지 않는다(예외 고정).
9. 살아 있는 writer: 같은 bead의 `running` attempt가 있는 상태에서 레인이 다른
   실패 행을 재개하면 `bead_running`이 먼저이고 `resume_refused`는 쓰지 않는다.
10. 부분 효과 보존: 이전 attempt의 워크트리가 base 앞의 커밋을 갖고, 원격 브랜치와
    관측된 PR이 있는 fixture에서 레인 불일치 재개는 거절만 하고 워크트리·브랜치·
    PR·`quickfix_landing.head_sha`·push 기록을 하나도 바꾸지 않는다.
11. 응답 유실·중복: 같은 거절을 두 번 보내도 `resume_refused` 값이 같고, 이미 같은
    값이면 다시 쓰지 않아 revision이 첫 기록 뒤 움직이지 않는다(쓰기 전 비교).
    ws `worker-attempt-resume` 응답은 `resumed:false, reason:'route_changed',
    route_change`를 싣고 fanout을 내지 않는다.
12. 클라이언트: `lane-model` 실패 투영이 `resume_refused='route_changed:…'`를 문장으로
    바꾸고 `can_resume`은 유지한다; 필드 부재는 기존 문장이다.
    `resume-flow` 토스트는 `route_changed`에 문장을, 미등록 사유에 원문을 쓴다.
    `laneOfRoute`는 `quick_fix`만 `quick_fix`, `null`·비enum·다른 route는 `pr`다.

완료 조건: 위 fixture 전부에서 새 실행·워크트리 복원·정리가 0건이고 기존 증거
(attempt 기록·세션 로그·타임라인·워크트리·브랜치·PR)가 보존됨을 검증한다.

구현 워크트리의 Node 버전·의존성 확인 뒤 `npm run tsc`, `npm run lint`, 변경 파일
Prettier, `npx vitest run --reporter=dot`을 수행한다. 실제 공급자 호출이나 외부
저장소 부작용은 테스트에서 만들지 않는다.

## 배포 후 검증

공유 서비스 배포(`repo-ops/config.toml [deploy]`, ADR 0010) 뒤 조회로만 확인한다.
`worker-attempt-resume`는 조회가 아니라 실행 명령이므로 배포 검증에서 보내지
않는다 — 거절 응답과 `resume_refused` 기록의 검증은 위 테스트 2·11이 격리된
fixture로 맡는다.

1. healthz가 배포 대상 SHA·워크트리 경로·동일 instance를 답한다(기존 배포
   handler의 readback).
2. Cortex 워크스페이스의 `GET /api/worker/queue` 스냅샷에서
   `Cortex-2nf-1789391523981-4`가 `failed`, `quickfix_lane=true`,
   `quickfix_landing.reason='delivery_unproven:push_log_absent'`, `resume_refused`
   없음, 자식 attempt 없음으로 배포 전과 같다 — 배포가 기존 기록을 바꾸지
   않았다는 증거다.
3. 실제 [이어하기]·[폐기]·대기열 재배치는 사용자의 볼트에 대한 조작이므로 이
   Bead의 검증에 포함하지 않는다. 배포 검증은 위 두 조회까지다.

## 경계·후속

- 없음 — 이 설계는 beads-ui 한 저장소의 한 Bead(UI-kq54)로 닫히며 형제·발견 행이
  없다.
- 관찰: UI-3vvi의 자동 복구 재개도 `resume()`을 지나므로 이 판정을 그대로 받는다 —
  그쪽 스펙의 "유효한 원래 승인·리뷰와 실행 선택이 남아 있다" 전제의 한 구현이며
  별도 작업이 아니다.
- 관찰: Cortex-2nf의 폐기·재시작은 사용자 조작 — Bead를 만들지 않는다.
- 관찰: 실패 행이 fence를 잡은 동안 route 변경을 능동적으로 감지해 타일에 미리
  알리는 것(bd 이슈 변경 구독 활용)은 하지 않는다 — 클릭 시 판정과 문장으로
  충분하고, 사전 감지는 실패 행마다 bd 읽기를 요구한다(ADR 0043 취지).

## 결정 (ADR 후보)

- 전제: ADR 0012 — `route` 어휘와 승인 키는 dotfiles 계약이 정의하고 이 저장소는
  읽기만 한다; 레인은 그 값에서 유도한다.
- 전제: ADR 0014 — 새 슬롯·배지·버튼 없이 기존 안내 문장 줄과 토스트로 표현한다.
- 전제: ADR 0024·0036 — 실패 행의 출구는 사람의 클릭([이어하기]·[폐기])이며
  자동 재디스패치를 추가하지 않는다.
- 전제: ADR 0027 — 거절은 attempt를 만들지 않으므로 타임라인 이벤트가 없다.
- 전제: ADR 0033 — 후보 레인 복귀 뒤의 실행 안전은 서버 admission과 stale-work
  판정이 지킨다.
- 전제: ADR 0046 — 기록된 provider 보존 규칙은 그대로이며 레인은 그 대상이 아니다.
- 전제: ADR UI-lmqu-2 — `base_moved` 보존 세션 이어하기는 같은 승인 아래의
  규칙이고, route가 바뀐 행은 이 설계가 거절한다.
- Worker 실행 레인은 매 launch에서 현재 route로만 유도하고, 기록된 레인과 다른
  재개·relaunch는 세션 없이 `route_changed`로 거절하며, 사유 기반 정산 재실행만
  기록된 레인으로 완료한다.
  - 되돌리기 어려움: 거절 사유 어휘·`resume_refused` 필드·정산 예외가 큐 기록과
    화면·테스트에 남는다.
  - 맥락 없이 의외: 세션 ID와 워크트리가 멀쩡한 실패 행도 route가 바뀌면
    이어갈 수 없고, 복구는 [폐기] 뒤 대기열 재배치로 하는 새 시작이다.
  - 실제 절충: transcript 승계의 편의를 버리고 착지 방식 혼합 가능성을 0으로
    만든다; 정산 재실행은 기록된 attempt 증거의 재증명과 완료라 예외로 둔다.
  - `summary`: "Worker 실행 레인은 매 launch에서 현재 route로만 유도하고 기록된 레인과 다른 재개는 세션 없이 route_changed로 거절하며 사유 기반 정산 재실행만 기록된 레인으로 마친다"
  → ADR
