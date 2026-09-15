---
id: UI-kq54
title: Worker 실행 레인은 매 launch에서 현재 route로만 유도하고 기록된 레인과 다른 재개는 거절한다
status: accepted
date: 2026-09-15
summary: 'Worker 실행 레인은 매 launch에서 현재 route로만 유도하고 기록된 레인과 다른 재개는 세션 없이 route_changed로 거절하며 사유 기반 정산 재실행만 기록된 레인으로 마친다'
spec: docs/superpowers/specs/2026-09-15-route-changed-relaunch-refusal-design.md
bead: UI-kq54
---

# Worker 실행 레인은 매 launch에서 현재 route로만 유도하고 기록된 레인과 다른 재개는 거절한다

## Context

Worker의 첫 dispatch는 실행 레인을 현재 Bead 스냅샷의 `route`에서 정한다
(`quick_fix`면 리뷰드 base push 착지, 그 외는 PR 제출 뒤 큐 머지). 그 값은
attempt 기록 `quickfix_lane`에 남아 hook 모드, 세션 프리앰블의 종점 지시, 완료
판정, base-drift 면제를 전부 결정한다. 그러나 재개·relaunch는 `prior.quickfix_lane`을
새 attempt에 그대로 복사했고, admission은 route 유효성과 spec 영수증만 보아 레인
불일치를 잡지 못했다. 실패 뒤 intake가 route를 `quick_fix`에서 `spec_backed`로
재판정한 이슈(Cortex-2nf)에서 [이어하기]는 현재 승인이 PR 완료인데도 "base push가
임무"라는 계약과 `record` hook으로 세션을 되살렸다.

세 안을 비교했다. 거절 + 새 시작, 거절 + 클릭 시 자동 재진입, 증명된 조건에서만
현재 레인으로 승계. 자동 재진입은 [이어하기]의 뜻이 상태에 따라 달라지고, 조건부
승계는 이전 transcript에 반대 계약이 남아 재개 세션의 행동을 보장할 수 없으며
후보가 없는 경우엔 새 시작과 결과가 같다. 사용자가 첫 번째를 골랐다.

## Decision

- 실행 레인은 매 launch에서 현재 route로만 유도한다. 유도는 의존성 없는 leaf
  `app/utils/quickfix-lane.js`의 `laneOfRoute(route)` 하나가 소유하며 서버와
  클라이언트가 같은 사본을 읽는다. `quick_fix`만 `quick_fix`, 그 외 모든 값은 `pr`다.
  레인은 2026-08-12 relaunch 스펙의 상속 목록(repo·target base·base OID·계보)에
  들어가지 않는다.
- 기록된 레인(`prior.quickfix_lane`)과 현재 레인이 다르면 모든 재개·relaunch 경로
  (수동 이어하기, `base_moved` 보존 후보 이어하기, 공급자 자동 재개, 지시 재시작,
  머지 큐 충돌 해소, REVISE 처분)는 세션을 띄우지 않고 `route_changed`로
  거절한다. 판정은 `laneMismatchOf(prior, bead_snapshot)`가 소유하고 진입 경로(스냅샷
  읽기 직후, 워크트리 복원·보존 후보 증명·admission 전)와 launch 직전 재확인의
  두 곳에서 부른다. 승인 상태(admission)보다 먼저 거절된다.
- 거절은 실행 상태를 바꾸지 않는다. 새 attempt·hook·claim·`workflow_mode` stamp·
  워크트리 복원·정리·보존 후보 검증이 없고 이전 attempt의 `status`·`cause`·
  `quickfix_landing`·`dismissed_at`은 그대로다. 쓰는 것은 이전 attempt의 진단 필드
  `resume_refused='route_changed:<prior_lane>→<current_route>'`(같은 값이면 다시
  쓰지 않고 종료 정산을 거치지 않는 경로로 기록)와 공급자 자동 재개의 기존
  `auto_resume_refused`뿐이다. Bead metadata는 읽기 입력이다(ADR 0012).
- 사유 기반 정산 재실행([정리 재시도], `resumeKindOf === 'settlement'`)만 예외로
  기록된 레인으로 완료한다. 정산은 세션을 띄우지 않고 그 attempt의 증거로
  착지를 재증명해 마무리하므로 PR 방식과의 혼합이 아니다.
- 복구는 기존 조작이다. [폐기]가 실패 행을 `discarded`로 바꿔 fence를 풀고, 사용자가
  후보에서 대기열에 다시 배치하거나 [지금 시작]을 누르면 일반 pass의 첫 dispatch가
  현재 route로 레인을 정한다. 세션 승계·자동 재진입·승인 키 위조·사용자 변경 정리는
  없다.
- 표현은 기존 슬롯이다(ADR 0014). 응답 `reason='route_changed'`와 선택 필드
  `route_change`, 토스트와 실패 타일 안내 줄의 같은 문장(`RESUME_REFUSALS`). 새
  슬롯·배지·버튼·타임라인 이벤트는 없다(ADR 0027).

## Consequences

세션 ID와 워크트리가 멀쩡한 실패 행도 route가 바뀌면 이어갈 수 없고, 복구는
[폐기] 뒤 대기열 재배치로 하는 새 시작이다. transcript 승계의 편의를 버리는 대신
착지 방식 혼합 가능성이 0이 된다. 거절 사유 어휘·`resume_refused` 필드·정산
예외가 큐 기록과 화면·테스트에 남아 되돌리려면 세 층을 함께 바꿔야 한다.
UI-3vvi의 자동 복구 재개도 `resume()`을 지나므로 같은 판정을 받는다.
