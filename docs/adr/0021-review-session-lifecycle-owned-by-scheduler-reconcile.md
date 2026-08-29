---
id: 21
title: review_session의 생존·슬롯·정산 시작은 scheduler reconcile이, 결과 판정은 큐가 소유한다
status: accepted
date: 2026-08-29
summary: 'review_session은 구현 attempt와 같은 reconcile pid probe로 생존·슬롯 점유·정산 시작을 판정하고 죽은 세션의 결과는 큐의 complete()가 영수증으로 판정하며 살아 있는 리뷰어를 죽이는 부팅 종료는 두지 않는다'
spec: docs/superpowers/specs/2026-08-29-review-session-lifecycle-reconcile-design.md
bead: UI-k4jm
---

# `review_session`의 생존·슬롯·정산 시작은 scheduler reconcile이, 결과 판정은 큐가 소유한다

## Context

`review_session` attempt(`[리뷰 후 머지]` 클릭과 ADR 0019의 head당 1회 자동
dispatch)는 구현 attempt와 같은 `launchSession`으로 뜬다. 프로세스가 살아 있는
동안은 `onSessionDone` → `reviewSession.complete()`가 정산하지만, 그 정산은
자식 프로세스 핸들에 달려 있다. 서버가 재시작되면 핸들이 사라진다.

재시작 뒤 그 attempt를 끝내 줄 주체가 아무도 없었다.

- 부팅의 `attach.js recoverReviewSessions`는 `pending`과 프로세스가
  `gone`/`recycled`인 기록만 종단한다. 프로세스가 실제로 살아남았으면
  의도대로 그대로 둔다 — 진행 중인 리뷰어를 죽이지 않기 위해서다.
- `session-monitor`는 로그를 tail하고 usage를 집계할 뿐 "끝을 판정하지
  않는다"가 설계다.
- 주기적 `scheduler.reconcile`은 `isSchedulerOwned`(= `kind === 'implementation'`)로
  `review_session`을 후보에서 아예 제외했다.

그 제외에는 이유가 있었다. `reconcile`의 처분인 `disposeDeadAttempt`는 PR
관측으로 결말을 판정하는데, 리뷰 lineage는 PR을 열지 않으므로 모든 리뷰 세션이
`pr_missing`으로 실패했을 것이다. 즉 "판정은 큐의 것"이라는 판단은 옳았다.
문제는 그 하나의 predicate가 **판정 소유**와 **lifecycle 소유**를 같이 정했다는
것이다. 판정을 큐에 두면서 생존 감시까지 함께 잃었다.

결과는 두 갈래로 새어 나왔다.

1. 프로세스가 끝나도 attempt는 영구 `running`이다. ADR 0019가 도입한
   `review_dispatch` claim은 영구 `active`로 남고, per-Bead in-flight 가드가
   영원히 참이라 그 head에 자동 dispatch도 없고 `[리뷰 후 머지]` 클릭도 완전
   no-op이 된다. 보류 행에 출구가 남지 않는다.
2. ADR 0015의 슬롯 fence(`occupiedBeadIds`)도 같은 predicate를 쓴다. live
   경로에서는 `dispatchReviewSession`이 launch 직전 `claimed.add`를 하므로 리뷰
   세션이 이미 슬롯으로 잡히지만, 재시작 뒤 `claimed`가 빈 상태의 durable
   `running` 기록은 세지 않았다. 같은 머신 자원을 쓰는 세션이 재시작 전후로
   다르게 세어졌다.

## Decision

`isSchedulerOwned`를 **lifecycle 소유 predicate**로 재정의한다:
`kind ∈ {implementation, review_session}`이면 참이고, `retired_kind`와 미지의
kind는 거짓이다. 소유는 두 질문으로 갈라 각각 다른 모듈이 답한다.

| 질문 | 소유자 |
| --- | --- |
| 살아 있는가(pid probe), 슬롯을 점유하는가, 죽었을 때 정산을 **시작**하는가 | scheduler (`reconcile`·`occupiedBeadIds`) |
| 죽은 세션의 결과가 무엇인가(영수증이 current인가, claim은 어느 head에 exhausted인가) | 큐 (`review-session.js complete()` → `settleReviewSession`) |

scheduler가 앞의 질문을 소유하는 근거는 소유권 그대로다 — 이 엔진이
`launchSession`으로 띄웠고 pid·process identity·session log·guard hook을 이
엔진이 기록한다. 뒤의 질문은 그대로 큐에 남는다.

구현상 `reconcile`의 후보 선별(`running`/`settling`/`claimed` 세 fence와
pid + start time 기반 `isDeadAttempt`)은 두 kind에 동일하게 적용하고, **처분만**
kind로 가른다. `review_session`은 `disposeDeadReviewSession`으로 가서
`onSessionDone`의 리뷰 분기를 핸들 없이 재현한다: monitor stop으로 로그를 EOF까지
drain해 usage와 guard 증거를 확정한 뒤 guard_kill을 읽고, exit code는 관측
불가이므로 `exit: null` verdict로 기존 `complete()`를 호출한다. 그 다음은 전부
큐의 기존 분기다.

슬롯 fence는 이 재정의를 그대로 따라온다. 재시작 전후의 답이 같아질 뿐이므로
ADR 0015의 fence 의미("자동 항목은 워크스페이스 실행 슬롯 여유로 판정")는 바뀌지
않으며, 자동 리뷰 전용 동시성 한도는 두지 않는다.

부팅 복구(`recoverReviewSessions`)는 바꾸지 않는다. 살아 있거나 probe가
`unknown`인 기록은 그대로 두고 reconcile의 느린 경로(최대 60초 + 프로세스
수명)에 맡긴다.

## Consequences

기각한 대안 둘:

- **부팅에서 살아남은 프로세스를 종료한다.** 가장 단순하지만 진행 중인 REVISE
  수정을 버리고 ADR 0019가 그 head에 허용한 자동 1회를 낭비한다. 재시작은
  리뷰어의 잘못이 아니다.
- **부팅 시 입양 감시자를 따로 둔다.** 결국 pid 폴링이므로 reconcile과 같은 일을
  하는 계층이 하나 더 생긴다.

받아들인 비용:

- **최대 60초의 정산 지연.** reconcile 주기다. 프로세스가 살아 있는 동안은
  `isDeadAttempt`가 거짓이라 점유가 유지되고, 죽으면 다음 pass에서 정산된다.
- **큐 레인의 attempt를 scheduler의 고아 sweep이 처분한다.** 맥락 없이 읽으면
  놀랍고, 이전 코드는 주석과 테스트(`leaves a running review session attempt out
  of the orphan sweep`)로 정반대를 고정하고 있었다. 그 테스트는 이 결정으로
  교체됐다.
- **되돌리면 두 결함이 함께 돌아온다.** predicate 하나가 reconcile과 fence 두
  판정을 같이 정하므로 영구 `running`과 슬롯 누락은 분리해 되돌릴 수 없다.

기존 결정과의 관계: ADR 0015(슬롯 기반 fence)와 ADR 0019(head당 1회 자동
dispatch)를 바꾸지 않고 그 전제를 재시작 뒤에도 성립하게 만든다. supersede하는
ADR은 없다. `2026-08-27-head-review-layer-removal-design.md` §5.5의 "reconcile
제외"는 ADR이 아닌 스펙 문장이며 이 결정이 대체한다.
