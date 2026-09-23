---
id: UI-tqqp
title: bd closed·deferred Bead는 모든 대기 레인에서 자동으로 물러나고 leaf paused attempt는 Bead 종료가 우선해 stopped로 종결된다
status: superseded
superseded_by: UI-u6ud-7
date: 2026-09-16
summary: "bd closed·deferred Bead 는 병렬·직렬 대기 레인에서 자동 제거되고 leaf paused attempt 는 Bead 종료가 우선해 stopped 로 종결되며 버릴 수 있는 워크트리만 정리한다"
spec: docs/superpowers/specs/2026-09-15-worker-queue-stale-entry-sweep-and-remove-design.md
bead: UI-tqqp
---

# bd closed·deferred Bead는 모든 대기 레인에서 자동으로 물러나고 leaf paused attempt는 Bead 종료가 우선해 stopped로 종결된다

## Context

2026-09-15 두 워크스페이스에서 bd 가 이미 `closed`·`deferred` 로 바꾼 Bead 가 Worker
대기열에 남아 직렬 레인 앞자리를 점유하는 것을 확인했다. 실행은 막히지 않았지만
(dispatch 는 `not_ready:<status>` 배지만 달고 건너뛴다) 표시가 어긋나고, 사람이
Monitor 에서 손으로 빼기 전에는 영원히 남았다. 원인은 셋이었다. (1) UI-m6bg 가 만든
closed-queue sweep 이 병렬 `queue` 만 순회하고 `serial_lanes[*].entries` 는 보지
않았다. (2) 판정이 `closed` 하나라 `deferred` 는 어떤 스캔의 대상도 아니었다. (3) 닫힌
Bead 가 leaf `paused` attempt 를 갖고 있으면 `activeBeadIdsFrom` 이 그 Bead 를 활성으로
세어 sweep 이 건너뛰었고, `paused` 는 종료 상태가 아니라 어떤 스캔도 이를 풀지 못했다.
UI-m6bg 는 이 마지막 동작을 "leaf paused 는 유지" 로 시험에 고정해 두었다 — 사람이
이어가려던 세션 컨텍스트를 지키려는 의도였다.

대기열 안에서 즉시 빼는 길도 브라우저 WS `worker-queue-remove` 만 있어 세션이나
스크립트가 부를 HTTP 경로가 없었다.

## Decision

1. bd 에서 `closed` 또는 `deferred` 인 Bead 는 병렬 `queue` 와 모든 직렬 레인의
   대기 행에서 자동으로 물러난다. `closed` 는 완료 레인(`done`)으로 이동하고,
   `deferred` 는 끝난 일이 아니라 물러난 일이므로 완료 레인에 넣지 않고 제거하며
   그 Bead 의 비종료 계보가 잡고 있던 직렬 레인 연결도 함께 푼다. `resolved` 는
   PR 대기 overlay 가 그리므로 대상이 아니고, `pr_wait`·`done` 은 순회하지 않는다.
   poller 의 sweep 과 tick 안의 admission 처분은 같은 헬퍼로 같은 판정을 한다.
2. leaf `paused` attempt 는 그 Bead 의 bd 종료가 우선한다. 닫힌 Bead 는 재개될 수
   없으므로 paused 컨텍스트를 지키는 것이 아무것도 사지 못한다. 처분은 ■ 정지의
   paused 분기와 같은 순서(leaf 가드 → 종료 약속 대기 → 복원 기록의 기준 이동 관측 →
   `stopped` 기록 → 보호 훅 해제 → 잔재 정리)를 공유하는 비동기 경로로 하고, 기존
   어휘 `stopped` 에 `cause: bead_closed | bead_deferred` 를 실어 새 상태 이름을 만들지
   않는다. 처분이 끝난 뒤 bd 상태를 다시 읽어 여전히 `closed`/`deferred` 일 때만 레인을
   변이하며, 그 사이 다시 `open` 이 됐으면 attempt 만 종결되고 행은 남는다.
3. 워크트리는 버릴 수 있을 때만 지운다(`removeIfDiscardable`). 미반영 변경이 있는
   워크트리는 보존하고 로그만 남긴다. 스캔이 워크트리를 강제 삭제하는 선택은
   배제했다.
4. 제거 사실은 Bead 타임라인에 `queue_removed` 이벤트 한 줄로 남기고(ADR 0027) 큐
   상태 파일에는 두지 않는다. 다시 `open` 이 돼도 자동 재배치는 없다 — 배치는
   사람·세션의 명시적 place 다(ADR 0033).
5. dispatch·lane fence 가 쓰는 활성 집합은 그대로 paused 를 포함한다. sweep 만
   호출자가 고르는 옵션으로 leaf paused 를 활성에서 제외한다 — 활성 집합에서 paused 를
   아예 빼는 대안은 paused Bead 가 재디스패치되는 회귀 위험이 있어 채택하지 않았다.

## Consequences

- UI-m6bg 가 시험으로 고정한 "closed 여도 leaf paused 는 유지" 는 뒤집힌다. 사람이
  이어가려던 paused 세션 컨텍스트는 그 Bead 가 bd 에서 닫히거나 보류되는 순간 잃을 수
  있다. 그 대신 stale 행의 영구 점유가 사라진다. 이 절충은 사용자 결정(2026-09-15)
  이다.
- `stop` 어휘(`stopped`)가 사람의 ■ 클릭 밖의 자동 경로로 넓어진다. 비교·이력 표시는
  `cause` 로 둘을 구분한다.
- `deferred` 처분의 되돌림은 없다. 보류를 풀어 다시 `open` 이 된 Bead 는 후보 레인에
  관측되고, 자리를 원하면 다시 place 해야 한다.
- HTTP `POST /api/worker/queue/remove` 는 WS 본문을 공유하는 대칭 입구로 함께 열렸지만
  되돌리기 비용이 없어 이 ADR 의 결정이 아니다(스펙 §결정).
