---
id: 4
title: impl_review 신선도를 exact-head 대신 ancestry로 판정
status: accepted
date: 2026-08-27
summary: 'impl_review 영수증은 head와 같거나 그 조상이면 유효하며, head 이동만으로는 재리뷰를 걸지 않고 의미 충돌은 [verify]가 잡는다'
spec: docs/superpowers/specs/2026-08-27-head-review-layer-removal-design.md
bead: UI-d7fy
---

# impl_review 신선도를 exact-head 대신 ancestry로 판정

## Context

원래 `impl_review` 영수증은 관측된 head SHA와 **정확히 같을 때만** 유효했다.
그런데 base 동기화 머지나 머지 큐가 소유한 base update는 리뷰된 델타를 하나도
바꾸지 않으면서 head를 움직인다. exact-head 결속에서는 그때마다 영수증이 죽고,
사람이 아무 판단도 더할 게 없는 재리뷰를 요구받았다.

체인: 2026-08-19 `impl-review-ancestry-verify-design`이 ancestry 결속과
`[verify]` 영수증을 도입하면서, 큐가 만든 `resolver:` 충돌 해소 커밋을 따로
앞세우는 예외 레이어(head_review)를 함께 뒀다. 2026-08-27
`head-review-layer-removal-design`이 그 예외 레이어를 제거했다 — ancestry 규칙
하나가 이미 같은 판정을 내리고 있어서 예외는 순수한 표면 복잡도였다.

## Decision

`impl_review` 영수증은 그 SHA가 관측된 head와 같거나 **그 조상이면** 유효하다
(`git merge-base --is-ancestor`). 조상이 아니면(히스토리 재작성, 브랜치 리셋)
stale이다. 판정 규칙은 하나이며 `resolver:` 커밋에도 별도 선행 조건이 없다.

probe 실패는 머지 게이트에서 fail-closed(보류), 보드 표시에서는 fail-quiet
(`unknown`)이다. 두 소비자가 같은 규칙을 쓰되 불확실성의 처분만 다르다.

리뷰 후 push된 델타를 아무도 다시 읽지 않는 잔여 리스크는 **수용**하고, 그
조합의 의미 충돌은 `[verify]` 영수증이 기계적으로 잡는다.

## Considered Options

- **exact-head 결속을 유지한다.** base가 움직일 때마다 재리뷰가 걸려, 사람이
  판단할 것이 없는 리뷰를 반복시킨다. 실무에서 리뷰가 형식화되는 대가가 커서
  기각했다.
- **resolver 커밋 예외 레이어를 유지한다.** 큐 소유 커밋만 특별 취급하려면 커밋
  출처를 판정하는 두 번째 규칙이 필요했고, ancestry가 이미 같은 답을 냈다. 두
  규칙이 같은 답을 낼 때 유지 비용만 남으므로 08-27에 제거했다.
- **영수증 없이 머지한다.** 리뷰 lineage 자체가 사라지므로 검토하지 않았다.

## Consequences

- 쉬워지는 것: base 동기화 머지와 큐 소유 base update가 리뷰를 무효화하지 않아,
  머지 큐가 자기 자신이 만든 재리뷰 루프에 갇히지 않는다.
- 어려워지는 것: 리뷰 후 추가된 커밋은 사람이 보지 않은 채 머지될 수 있다. 그
  리스크를 `[verify]`가 부분적으로만 덮는다는 점을 알고 받아들인 것이다.
- 배제되는 것: head가 움직였다는 사실만으로 재리뷰를 자동 dispatch하는 동작.
  영수증이 없거나 조상이 아니면 머지는 **보류**이고, 유일한 출구는 사람이 누르는
  `[리뷰 후 머지]`다 — 큐는 리뷰어를 띄우지도 수리하지도 않는다.
