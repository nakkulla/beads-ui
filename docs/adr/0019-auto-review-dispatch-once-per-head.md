---
id: 19
title: 리뷰 영수증 보류는 큐가 head당 1회 리뷰 lineage를 자동 dispatch해 해소를 시도한다
status: accepted
date: 2026-08-28
summary: '영수증 부재·stale 보류는 큐가 head당 1회 같은 리뷰 lineage를 자동 dispatch하고 실패·소진 뒤에는 [리뷰 후 머지]가 같은 lineage를 resume하며 post-merge 자동 수리 금지(ADR 0005)와는 별개다'
spec: docs/superpowers/specs/2026-08-28-auto-review-dispatch-on-hold-design.md
bead: UI-qksl
---

# 리뷰 영수증 보류는 큐가 head당 1회 리뷰 lineage를 자동 dispatch해 해소를 시도한다

## Context

UI-d7fy(2026-08-27)는 head-review 큐 계층을 제거하면서 영수증 부재/stale 보류의
출구를 `[리뷰 후 머지]` 버튼 하나로 정했다. 그 결과 `impl_review`가 없거나 현재
head의 조상이 아닌 PR은 사람이 버튼을 누를 때까지 큐에 그대로 서 있었다.

UI-5ym8(2026-08-28)이 세션 파킹 결말을 실패가 아니라 대기로 재분류하면서, "세션이
PR은 만들었지만 영수증 없이 정상 종료한" 행이 예외가 아니라 정상 결말이 됐다 —
impl gate REVISE 파킹, 리뷰 레그를 띄우지 못한 런타임 장애, 턴 한도. 이 행들은 전부
같은 자리(리뷰 보류)에서 같은 동작(리뷰 lineage 1회)을 기다리는데, 그 한 번을 매번
사람이 눌러야 했다.

dotfiles 계약이 먼저 정정됐다(`workflow-contract.md` Worker manual merge
continuation, `workflow-state.yaml manual_merge_continuation.auto_review_dispatch`).
beads-ui는 그 계약의 소비자이므로, 남은 문제는 "계약이 정한 자동 dispatch를 큐의
어느 자리에 어떤 durable 상태로 앉히는가"였다.

## Decision

영수증 보류에서 큐가 **head당 1회** 같은 리뷰 lineage를 자동 dispatch한다.

- 판정 자리는 `merge-queue.js` `holdEntry` — 게이트가 보류 사유를 낸 그 턴이다.
  매 `kick()`이 보류 행을 재판정하므로 별도 감시자도 타이머도 없다.
- 주체는 트리거가 아니라 **lineage**다. 행에 durable claim
  `review_dispatch={head_sha, attempt_id, state, at}`를 두고, 클릭이 세션을
  등록하는 CAS도 같은 claim을 쓴다. 그래서 클릭 세션이 head X에서 실패한 직후
  기계가 같은 X에 두 번째 외부 리뷰를 보내는 일이 없다.
- claim이 `exhausted`가 된 head의 출구는 `[리뷰 후 머지]` 하나뿐이고, 그 클릭은
  새 lineage가 아니라 **같은 lineage의 resume**이다.
- 자동 dispatch는 authority를 새로 부여하지도 source를 바꾸지도 않는다. 그것은
  클릭만이 한다. authority 없는 행의 출구도 버튼이다.
- 자동(enrollment) authority 행 앞에는 ADR 0015의 슬롯 fence를 그대로 재사용한다.
  수동 authority는 사람이 방금 누른 것이므로 면제다.
- claim 뒤의 dispatch 실패는 원인을 구분하지 않고 전부 `exhausted`다. 보류는
  유지되고 자동으로 다시 뜨지 않는다.
- 보류 사유는 계약대로 넷이다: `review_receipt_missing`·`stale`·`invalid`·
  `undetermined`. `undetermined`(ancestry probe 오류)가 여기 드는 이유는, 리뷰
  세션이 최종 head에 정확히 쓴 새 영수증은 `equal`로 probe 없이 판정되므로 지속적
  probe 오류의 유일한 출구가 리뷰 lineage이기 때문이다.

## Consequences

- 사람의 클릭 없이 AI 세션이 뜨는 자리가 하나 생긴다. 비용과 슬롯 점유를 지불하고
  "PR이 사람을 기다리며 큐에 머무는 지연"을 없앤 거래다. 한도는 head당 1회이며,
  그 한 번이 소진되면 판단은 사람에게 돌아온다.
- ADR 0005("자동 AI 수리 레인 폐기")와 나란히 놓이면 모순으로 읽히므로 구분을
  명시한다: 0005는 **post-merge** 실패의 자동 수리를 배제한다. 리뷰 보류는
  pre-merge 게이트 상태이고 completion `needs_human`이 아니며, 여기서 뜨는 것은
  수리 세션이 아니라 리뷰 lineage 1회다.
- ADR 0017("파킹 결말은 자동 재디스패치하지 않는다")과도 겹치지 않는다. 0017의
  parked는 `pr_url` 없음이 조건이고, 이 결정이 다루는 행은 이미 PR을 가지고 큐에
  들어온 행이다.
- `queue.json`에 행 단위 `review_dispatch`와 `hold.auto_review_wait`가 추가된다.
  둘 다 beads-ui 큐 내부 durable 상태이며 workflow 계약 키가 아니다(ADR 0012).
- 세션이 REVISE 수정을 push한 뒤 영수증 없이 죽는 경우를 위해, 소진되는 claim의
  head는 "그 세션이 head를 움직였는가"로 정한다. 증거는 attempt의 pre-push 기록이며
  읽히지 않으면 fail-closed(`head_sha: null` — 어느 head에도 자동 dispatch 없음)다.
  그래서 리뷰 세션에도 구현 세션과 같은 pre-push hook을 설치한다.
- `review_receipt_invalid`가 거부(dequeue)에서 보류로 바뀐다. 성립하지 않는 영수증
  기록은 리뷰 lineage가 다시 쓰는 대상이지, 행을 큐 밖으로 밀어낼 이유가 아니다.
