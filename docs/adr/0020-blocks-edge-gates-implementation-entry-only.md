---
id: 20
title: blocks 의존은 구현 실행 진입만 막고 spec·plan 작성은 blocked Bead에서도 진행한다
status: accepted
date: 2026-08-29
summary: 'blocks 의존은 구현 진입(in_progress claim)만 막는다; 세션은 blocked Bead의 spec·plan을 쓰고 게이트 착지에서 끝나며, 선행 결과가 설계 전제인 경우만 spec-after-blocker 라벨로 spec을 미룬다'
spec: docs/superpowers/specs/2026-08-28-blocked-bead-spec-authoring-allowed-design.md
bead: UI-svh6
---

# blocks 의존은 구현 실행 진입만 막고 spec·plan 작성은 blocked Bead에서도 진행한다

## Context

`blocks`로 막힌 Bead는 선행이 닫힐 때까지 설계(spec·plan)도 멈춰 있다는 관행이
있었다. 계약에는 형제 Bead 규칙(`bead_split.sibling_spec_timing`)에만
"`blocks` edge는 실행만 막는다"가 있었고, 일반 Bead에 대한 문장이 없었다.

그 부재가 두 가지를 낳았다.

- 사람들이 순서를 알면서도 `blocks`를 걸기를 꺼렸다 — 걸면 설계까지 얼어붙는다고
  읽혔기 때문이다. 결과로 "block까지는 아니지만 순서가 있는" 이슈들이 edge 없이
  흩어졌고, 의존 그래프가 실제 순서를 담지 못했다.
- 반대로 선행의 **결과**가 후행의 설계 전제인 경우(선행이 API 모양을 정하고
  후행이 그 위에 서는 경우)는 정말로 spec을 기다려야 하는데, 그 둘을 구분할
  표시가 없었다.

세션에서 spec을 쓰는 것을 막는 기계 장치는 처음부터 없었다.
`impl-gate-hook.py`는 `spec_review` 영수증·`in_progress` claim·승인만 보고 의존
준비 여부는 보지 않는다. 즉 이것은 강제의 문제가 아니라 규칙의 부재였다.

## Decision

`blocks` edge는 **구현 실행 진입만** 막는다.

- 의존 미충족 Bead라도 대화 세션은 spec 작성·발행·`spec_review`, `full_plan`의
  plan 작성·`plan_review`·`plan_approval`까지 진행하고, 그 게이트 착지에서
  세션을 끝낸다.
- `in_progress` claim과 구현 실행 진입은 dependency-ready(`bd ready`에 나열)가
  조건이다. 이후 구현 진입은 기존 staleness 재리뷰 lane을 타므로, 선행이 남긴
  변화는 거기서 흡수한다.
- 형제 규칙 `bead_split.sibling_spec_timing`은 이 일반 규칙의 특수 사례가 된다.

예외는 라벨 하나다. 선행의 결과가 이 Bead의 설계 전제라 spec도 선행 뒤에 써야
할 때 사람이 `spec-after-blocker`를 단다. 라우터는 이 라벨이 있고 Bead가 현재
blocked이면 spec 작성을 시작하지 않고 사용자에게 알린다. blocked가 아니면 라벨은
무의미하므로 떼는 정리가 필요 없다(계약의 `effective_only_while:
dependency_unsatisfied`).

계약 문장과 라벨 어휘의 정본은 dotfiles
`docs/contracts/workflow-contract.md`·`docs/contracts/workflow-state.yaml`이
소유한다(ADR 0012의 소비자 관계 그대로). beads-ui는 그 라벨의 소비자로서 후보
카드 슬롯 4a에 판정 칩 『스펙 대기』를 그린다 — 클릭은 사유 팝업이고, 카드 위의
칩은 상태를 쓰지 않는다.

### 대안과 기각 사유

- **`blocks`가 설계까지 막는 기존 관행 유지.** 의존 그래프가 실제 순서를 잃는
  비용이 계속 든다. 사람이 edge를 안 거는 쪽으로 우회하므로, 강제력 없는 규칙이
  데이터 품질을 갉는다.
- **`related`로 "약한 순서"를 표현.** `bd-usage`가 `related`를 "어디서도 읽지
  않는 죽은 edge"로 정의하므로 큐·`bd ready` 어디에도 영향이 없다. 표현만 있고
  판정이 없는 edge를 늘리는 셈이다.
- **`impl-gate-hook.py`에 dependency-ready 검사 추가.** 규칙을 기계로 강제하는
  안이지만, Codex 런타임이 같은 prose를 강제 없이 지니는 것과 수준을 맞추지
  못하고 훅에 `bd` 조회를 더한다. prose 규칙 위반이 실제로 관측되면 그때 별도로
  제기한다.

## Consequences

- 대기 시간에 설계를 진행하는 대신 **stale spec 정정 비용**을 받아들인다. 선행이
  닫히는 사이 전제가 움직였으면 구현 진입 시 staleness 재리뷰 lane이 그것을
  잡아 `correction` 또는 broken premise로 처분한다. 이 lane이 이 결정의 안전망이며,
  lane 없이는 이 결정을 그대로 쓸 수 없다.
- `blocks`를 거는 비용이 낮아지므로 의존 그래프가 실제 순서를 더 많이 담는다.
  Worker 큐의 `bd ready` 판정은 그대로라 실행 순서 보장은 변하지 않는다.
- 되돌리기가 어렵다. 이 규칙 위에서 걸린 `blocks` edge들이 쌓인 뒤 "설계까지
  막는다"로 되돌리면, 그 edge들의 의미가 소급해서 달라진다.
- Worker는 무변경이다. Worker는 spec을 쓰지 않고(admission이 `spec_id`+유효
  `spec_review`를 요구한다), blocked Bead의 큐 선점·unblock 후 dispatch도
  그대로다. spec은 브레인스토밍 대화의 산물이라 세션이 쓴다.
- 새 라벨이 하나 늘지만 게이트에 결속되지 않고 적격성도 바꾸지 않는다. 사람이
  달고, 선행이 닫히면 저절로 무력화된다.
