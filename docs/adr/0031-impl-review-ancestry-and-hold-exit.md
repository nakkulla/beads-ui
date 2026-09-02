---
id: 31
title: impl_review 신선도는 ancestry로 판정하고 영수증 보류의 출구는 head당 1회 리뷰 lineage와 [리뷰 후 머지]다
status: accepted
date: 2026-09-03
supersedes: [4]
summary: 'impl_review 영수증은 관측된 head와 같거나 그 조상이면 유효하고 head 이동만으로는 재리뷰가 걸리지 않으며 resolver 커밋에도 예외가 없다. 영수증이 없거나 조상이 아니면 머지는 terminal 실패가 아니라 보류이고, 그 출구는 ADR 0019의 head당 1회 자동 리뷰 lineage와 [리뷰 후 머지] 클릭이며 사람 클릭만이 유일한 출구는 아니다.'
bead: UI-lm9o
---

# impl_review 신선도는 ancestry로 판정하고 영수증 보류의 출구는 head당 1회 리뷰 lineage와 [리뷰 후 머지]다

## Context

초기 `impl_review` 영수증은 관측된 head SHA와 정확히 같을 때만 유효했다. base
동기화 머지와 큐가 소유한 base update는 리뷰된 델타를 바꾸지 않고도 head를
움직였고, exact-head 결속은 그때마다 영수증을 무효화했다. 사람에게 새로 판단할
내용이 없어도 재리뷰가 필요했다.

2026-08-19 `impl-review-ancestry-verify-design`은 이 문제를 ancestry 결속과
`[verify]` 영수증으로 풀었다. 동시에 큐가 만든 `resolver:` 커밋 앞에는
`head_review` 예외 레이어를 뒀다. 이후
`docs/superpowers/specs/2026-08-27-head-review-layer-removal-design.md`가 그 레이어를
제거했다. 하나의 ancestry 규칙이 이미 `resolver:` 커밋에도 같은 판정을 내렸기
때문이다.

ADR 0004는 여기까지를 기록했지만, 영수증 보류의 유일한 출구를 사람이 누르는
`[리뷰 후 머지]`로 한정했다. 다음 날
`docs/superpowers/specs/2026-08-28-auto-review-dispatch-on-hold-design.md`와 ADR 0019가
그 조항을 뒤집어 큐의 head당 1회 자동 리뷰 lineage를 도입했다. accepted ADR의 한
조항이라도 뒤집히면 전체를 대체한다는 규칙에 따라, ADR 0004의 본문을 고치지 않고
살아남은 조항과 바뀐 조항을 이 ADR에 함께 다시 기록한다.

## Decision

1. `impl_review` 영수증 SHA가 관측된 head와 같거나 그 조상이면 유효하다
   (`git merge-base --is-ancestor`). 조상이 아니면 히스토리 재작성이나 브랜치
   리셋으로 계보가 끊긴 stale 영수증이다. 큐가 만든 `resolver:` 커밋에도 별도
   선행 조건이나 예외 레이어 없이 이 규칙 하나를 적용한다.
2. ancestry probe가 실패하면 머지 게이트에서는 fail-closed로 보류하고, 보드
   표시에서는 fail-quiet로 `unknown`을 표시한다. 판정 규칙은 같고 불확실성을
   처분하는 방식만 소비자에 따라 다르다.
3. 리뷰 뒤 push된 델타를 사람이 다시 읽지 않을 수 있는 잔여 위험은 수용한다.
   ancestry가 통과시킨 조합의 의미 충돌은 `[verify]` 영수증이 기계적으로 검사한다.
4. 영수증이 없거나 현재 head의 조상이 아니면 머지는 terminal 실패가 아니라
   merge-gate hold다. 출구는 사람 클릭에만 예약되지 않는다. 큐가 같은 리뷰
   lineage를 head당 한 번 자동 dispatch하고(ADR 0019), 그 claim이 소진되면
   `[리뷰 후 머지]`가 새 lineage를 만들지 않고 기록된 세션의 같은 lineage를
   resume한다. 머지는 계속 큐가 소유한다(ADR 0006).

## Considered Options

- **exact-head 결속을 유지한다.** base가 움직일 때마다 사람이 판단할 내용이 없는
  리뷰를 반복하게 한다. 반복이 리뷰를 실질적 판단이 아닌 형식으로 만들므로
  기각했다.
- **`resolver:` 예외 레이어를 유지한다.** ancestry가 이미 주는 답을 위해 커밋
  출처를 판정하는 두 번째 규칙을 유지해야 한다. 같은 결론을 내는 별도 상태와
  분기만 늘어나므로 기각했다.
- **ADR 0004 본문에 반전 주석을 덧붙인다.** 한 문서 안에 결정과 그 결정을 뒤집는
  문장이 함께 있으면 현재 판단의 입력으로 쓸 수 없다. 실제로 0004는 하루 뒤
  0019에 조항이 뒤집힌 뒤에도 accepted로 남아 있었고, `AGENTS.md`는 그 사이 내내
  뒤집힌 조항("큐는 리뷰어를 띄우지도 수리하지도 않는다")을 그대로 진술했다.

## Consequences

- base 동기화 머지와 큐 소유 base update가 리뷰를 무효화하지 않는다. 머지 큐가
  자신이 움직인 head 때문에 다시 리뷰를 요구하는 순환에 갇히지 않는다.
- 리뷰 뒤 추가된 커밋은 사람이 보지 않은 채 머지될 수 있다. `[verify]`가 기계로
  검출 가능한 의미 충돌을 막지만 사람 리뷰를 완전히 대신하지는 못한다.
- 배제되는 것: 자동 재리뷰는 head당 하나의 lineage로 제한된다. 그 한 번이 소진된
  뒤에는 판단이 사람에게 돌아가고 `[리뷰 후 머지]`가 같은 lineage를 재개한다.
- 자동 repair 세션은 없다. 그 경계와 post-merge 실패의 재진입 규칙은 ADR 0024가
  소유한다.
