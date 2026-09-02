---
id: 29
title: 살아 있는 queue.attempts는 bead 이력의 최신 접미라는 불변식으로 이관을 판정한다
status: accepted
date: 2026-08-29
summary: '살아 있는 `queue.attempts`는 bead 이력의 최신 접미이며, 처리 완료 attempt는 같은 bead의 더 오래된 attempt가 전부 이관 가능할 때만 큐를 떠난다. "마지막 구현 attempt" 판정은 라이브 큐만 보고 합집합 조회를 쓰지 않는다.'
spec: docs/superpowers/specs/2026-08-29-queue-transfer-suffix-invariant-design.md
bead: UI-e20c
---

# 살아 있는 queue.attempts는 bead 이력의 최신 접미라는 불변식으로 이관을 판정한다

## Context

ADR 0027의 상태 전용화 결정은 처리 완료 terminal attempt를 `queue.json` 밖으로
옮기도록 했다. 첫 구현인 UI-8wpb는 이관 여부를 attempt가 아니라 bead 단위의
`beadsWithLiveRecords`로 판정했다. 한 bead에 미처리 attempt가 하나라도 있거나 어느
레인에든 자리가 있으면, 이미 처리된 과거 레코드까지 모두 큐에 남았다.

그 이유는 “이 bead의 마지막 구현 attempt”를 `queue.attempts` 집합만 보고 계산하는
reader들이었다. 일부만 이관하면 답이 바뀔 수 있다. 예를 들어 더 최신인 `done`을
내보내고 더 오래된 미dismiss `failed`를 남기면, 그 실패가 갑자기 마지막 attempt로
보인다. 그러면 처리된 실패가 unhandled로 되살아나고 auto-advance 복원도 닫힌다.

bead 전체를 붙잡으면 이 오류는 피하지만, 실행 중 attempt 하나 때문에 그 bead의
처리 완료 이력이 계속 누적된다. reader의 답을 보존하면서 attempt 단위 이관을
허용하는 더 좁은 규칙이 필요했다.

## Decision

기존 reader는 바꾸지 않고 이관 규칙을 접미 불변식으로 정한다. 살아 있는
`queue.attempts`는 각 bead 전체 이력의 최신 접미다.

한 attempt는 처리 완료 terminal이고 직렬 레인을 점유하지 않을 때 이관 가능하다.
그 attempt보다 오래된 같은 bead의 attempt가 모두 같은 pass에서 이관 가능할 때만
큐를 떠난다. “오래된” 순서는 timestamp가 아니라 `q.attempts`의 삽입 순서다.

이 규칙 아래 라이브 접미에서 계산한 “마지막 구현 attempt”는 전체 이력에서 계산한
답과 같다. 접미가 남아 있으면 전체의 마지막 레코드가 보존되고, 접미가 비면 전체의
마지막 레코드도 처리 완료되어 reader가 더 판정할 것이 없다. 따라서 reader는
라이브 큐만 보며, 이관된 파일과의 합집합 조회를 사용하지 않는다.

## Considered Options

- **reader 여덟 곳을 `readAttemptsForBead` 합집합 조회로 옮기고 캐시를 둔다.**
  Bead가 제안한 대안이며 누적을 0까지 줄일 수 있다. 그러나 대기 bead마다 매 tick
  파일 I/O를 열고 캐시 무효화 규칙을 새로 만들어야 한다. scheduler, pr-actions,
  merge-candidates, pr-poller까지 판정과 테스트 표면이 넓어진다. 2026-08-29 사용자
  결정으로 기각했다.
- **bead 하나에 살아 있는 레코드가 있으면 전부 보존한다.** reader의 답은 안전하지만
  처리 완료 이력을 줄인다는 ADR 0027의 효과를 실행 중인 bead에서 거의 얻지 못한다.
  필요 이상으로 넓은 hold라서 기각했다.

## Consequences

- reader를 고치지 않고도 처리 완료 접두를 이관할 수 있다. 라이브 큐의 삽입 순서와
  접미 성질이 reader 전체가 공유하는 암묵적 계약이 된다.
- 받아들인 잔여 누적이 있다. running attempt가 있는 bead라도 그보다 오래된 미처리
  레코드가 있으면, 그 뒤의 처리 완료 레코드는 해당 레코드가 처리될 때까지 큐에
  남는다.
- 배제되는 것: 이관된 attempt와 라이브 큐의 합집합 조회, 매 tick 파일 I/O, 그
  비용을 줄이기 위한 캐시 무효화 설계는 도입하지 않는다.
- 이 불변식을 깨려면 “마지막 구현 attempt”를 비롯한 모든 reader를 먼저 합집합
  조회로 옮겨야 한다. 일부 이관만 허용하면서 reader를 그대로 두는 중간 상태는
  과거 실패를 부활시킬 수 있다.
