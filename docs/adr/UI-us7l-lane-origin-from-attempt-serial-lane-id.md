---
id: UI-us7l
title: 실행 중·PR 대기 행의 레인 출처는 구현 attempt의 serial_lane_id로 판정한다
status: accepted
date: 2026-09-22
summary: "실행 중·PR 대기 행의 레인 출처는 대기 레인 멤버십이 아니라 그 행이 대표하는 구현 attempt의 serial_lane_id로 판정하고 직렬과 병렬을 모두 칩으로 표시한다"
spec: docs/superpowers/specs/2026-09-22-run-lane-origin-and-parallel-slot-usage-design.md
bead: UI-us7l
---

# 실행 중·PR 대기 행의 레인 출처는 구현 attempt의 serial_lane_id로 판정한다

## Context

실행 타일의 직렬 레인 칩(`.rtile__lane`)은 `buildLanes`
(`app/views/worker/lane-model.js`)가 대기 `serial_lanes.entries`에서 파생한
`serial_lane_by_bead`를 읽었다. dispatch는 항목을 대기 배열에서 빼므로 실행 중인
bead는 그 map에 없고, 실측으로 직렬(s1)에서 나간 attempt와 병렬에서 나간 attempt
모두 `serial_lane_id`가 `null`이었다 — 칩은 있으나 재료가 늘 비어 있었다. 코드만
읽어서는 이 파생이 왜 항상 비는지가 드러나지 않았다.

진짜 재료는 이미 클라이언트에 도착한다. dispatch는 `serial_lane_id`를 durable
attempt에 새기고(`server/worker/scheduler.js`), 스냅샷의 attempt 투영은 프롬프트
필드만 지운다(`server/ws/worker-handlers.js stripPrompts`). `pr_wait` durable
항목도 자기 `serial_lane_id`를 보존하며, 머지 정리가 attempt의 레인 결속을
해제해도(`releaseLandedLineageLanes`) 그 항목은 남는다.

병렬 dispatch는 점유를 만들지 않는다. `serialLaneIndexOf`는 `s1`~`s5`만 레인으로
인정하고 `laneStatesFor`는 `serial_lanes`만 순회한다 — 점유는 실행의 동의어가
아니라 직렬 레인 잠금의 표시다(`2026-08-13-worker-lane-scheduling-design.md`).

## Decision

- 실행 중 행과 PR 대기 행의 레인 출처는 **그 행이 대표하는 구현 attempt의
  `serial_lane_id`**로 판정한다. 값이 `s1`~`s5`면 `{kind:'serial', index:n}`,
  `null`이면 `{kind:'parallel'}`이다. 판정은 `lane-model`이 한 곳에서 하고 행에
  `lane_origin`으로 싣는다. 렌더러는 판정하지 않는다.
- 실행 중 행은 live `attempt_id`가 가리키는 attempt를 읽는다. PR 대기 행은
  durable `pr_wait` 항목의 `serial_lane_id` 키를 먼저 읽고, 그 키가 없으면 그
  bead의 마지막 구현 attempt를 읽는다.
- attempt를 못 찾거나 `serial_lane_id` 키 자체가 없으면 `lane_origin`을 달지
  않고 칩도 그리지 않는다(fail-quiet). `null`을 `parallel`로 읽는 것은 attempt를
  **찾은** 경우뿐이다 — "병렬에서 돌았다"와 "모른다"를 가른다. 세션 타일과 외부
  PR 오버레이 행은 키를 받지 않는다. 대기 행은 자기가 선 자리가 곧 레인이므로
  `lane_origin`을 받지 않는다.
- 직렬과 병렬을 **둘 다** 칩으로 그린다(`직렬 <n>`·`병렬`). Worker와 Monitor가
  같은 어휘·같은 자리(슬롯 5a, `route` 칩 앞)를 쓰며 직렬 레인 pane 제목과 같은
  상수를 공유한다.
- 대기 entries에서 파생하던 `serial_lane_by_bead`와
  `MonitorTileOverlay.serial_lane_id`는 제거한다. 같은 질문에 두 답을 두지 않는다.
- 서버 스냅샷 계약은 바꾸지 않는다. 실행 행용 레인 키를 서버에 새로 만드는
  대안은 버렸다 — 필요한 재료가 이미 전부 도착한다.

## Consequences

- 스냅샷 계약을 늘리지 않는 대신 판정 로직을 클라이언트가 진다. 서버가 attempt
  레코드의 `serial_lane_id`를 지우거나 이름을 바꾸면 칩이 조용히 사라진다 —
  fail-quiet라 오류가 아니라 부재로 관측된다.
- 두 탭의 소비자가 한 재료로 모였으므로 복구는 한 줄 편집이 아니다.
- 병렬 dispatch에 점유 개념을 도입하지 않는다. 서버 `occupied_by`는 직렬 레인
  전용으로 남는다(ADR 0033: 표시 면은 관측 집합이고 실행 안전은 서버 admission이
  지킨다).
- 직렬일 때만 칩을 그리는 안은 칩 부재가 "병렬"인지 "재료 없음"인지 갈리지
  않아 기각했다. raw `s1` 표기는 레인 헤더가 이미 `직렬 1`이라 한 대상을 두
  이름으로 부르게 되어 기각했다.
