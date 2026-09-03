---
id: 33
title: 후보 레인은 admission 통과 집합이 아니라 관측 집합이다
status: accepted
date: 2026-09-03
summary: '후보 레인은 Worker가 지금 집을 수 있는 집합이 아니라 미착수 이슈의 관측 집합이고, 실행 안전은 서버 admission이 지킨다'
spec: docs/superpowers/specs/2026-09-03-monitor-candidate-observation-readiness-design.md
bead: UI-ff10
---

# 후보 레인은 admission 통과 집합이 아니라 관측 집합이다

## Context

모니터 탭 후보 레인의 원천인 `server/worker/runnable-cache.js`의 `qualify()`는
"이 행을 실을 것인가"와 "이 행이 admission을 통과하는가"를 하나의 `null` 반환으로
함께 결정했다. 그래서 스펙 미발행 `spec_backed`/`full_plan`, route 미핀, 본문 없는
`quick_fix`, `worker-ineligible` 행이 모집단 자체에서 빠졌다. 필터가 감춘 것이
아니라 애초에 없었으므로 사용자가 필터를 풀어도 나타나지 않았다.

Worker 탭은 이미 그렇지 않았다. `app/views/worker/workspace-adapter.js`의
`runnableRows()`는 Board live store의 ready+blocked 열 전부를 관측 행으로 그리고,
"`worker-ineligible`도 spec 미발행도 제외 사유가 아니다 — 워커 탭은 후보를
**관측**하는 화면이고, 실행 안전은 서버 admission이 지킨다"를 명시한다. 두 탭이
같은 이름의 레인에 다른 집합을 담고 있었다.

같은 시기에 세그먼트 축도 어긋나 있었다. `spec 있음`/`spec 없음`은 route와 무관한
발행 판정이라 정확했지만, 사용자가 그 세그먼트로 실제로 묻는 질문은 "지금 착수
가능한가"였고 스펙 없이도 admission을 통과하는 `quick_fix`가 그 답에서 빠졌다.

## Decision

**후보 레인은 Worker가 지금 집을 수 있는 집합이 아니라 미착수 이슈의 관측
집합이고, 실행 안전은 서버 admission이 지킨다.**

- `runnable-cache`의 채택 조건은 셋뿐이다: `bead_id`가 있고, `status`가 `open`이며,
  phase child가 아니다. route 미핀·스펙 미발행·`worker-ineligible`·본문 없는
  `quick_fix`는 모두 채택된다.
- 지금까지 행을 떨어뜨리던 조건은 판정으로 남아 **사실**로 실린다 —
  `admitted`·`spec_state`·`has_description`·`awaiting_user`·`worker_ineligible`.
  `admitted`는 그 사실들을 접은 결과이며 넓히기 이전 `qualify()`가 행을 돌려주던
  조건과 정확히 같다.
- 좁히기는 읽는 쪽이 한다. `runnableFor`/`runnablePeek`의 `include_unadmitted`
  기본값은 `false`이고, `true`를 넘기는 곳은 모니터 투영과 `laneCountsFor` 둘뿐이다.
- 넓어진 모집단은 세그먼트 `전체`/`착수 가능`/`준비 필요`와 슬롯 4a의 판정 칩이
  갈라 보여 준다. 판정 입력은 `queue_placeable` 하나여서 세그먼트와 `↴ 대기로`
  버튼이 같은 답을 낸다.
- 큐 진입 자격은 그대로 서버 `checkWorkerQueueAdmission()`이 권위 있게 판정한다.
  이 결정은 표시 집합만 넓히며 admission의 거부 사유·순서와 스케줄러의 dispatch
  경로는 건드리지 않는다.

`runnable-cache`는 헤더가 선언한 대로 표시 전용 사전필터이고 Worker 스케줄러의
dispatch 경로는 이 캐시를 읽지 않는다(`bd ready`가 원천). 모집단을 넓혀도 실행
안전에 영향이 없는 것은 그 때문이다.

## Consequences

- 이름이 `runnable`인 레인과 `runnable-cache` 모듈에 실행할 수 없는 행이 선다.
  이름만 읽으면 admission 통과 집합으로 오해하기 쉬우므로, 그 오해를 막는 것이 이
  기록의 목적이다.
- 실행 화면의 신호 대 잡음이 낮아진다. 후보 레인이 백로그와 겹치는 만큼 "지금
  돌릴 수 있는 일"이 눈에 덜 띈다. 그 대가는 세그먼트 필터와 판정 칩으로 치른다.
- 되돌리려면 서버 투영(`admitted`와 사실 필드), 두 탭의 세그먼트 어휘와 저장값,
  카드 판정 칩과 그 슬롯 배정, `draggable` 판정, 레인·타일 카운트를 함께 되돌려야
  한다. 사용자가 이미 보던 준비 필요 행이 화면에서 사라지므로 코드만 되돌린다고
  원상복구가 끝나지 않는다.
- ADR 0014(단일 `buildLanes` 계약과 공유 슬롯 표)와 모순하지 않는다. 이 결정은 그
  레인 조립 경로를 그대로 쓰고 입력 집합만 넓히며, 새 판정 칩의 자리도 공유 슬롯
  표의 개정으로 얻는다.

### 대안과 기각 사유

- **좁은 집합 유지.** 레포 간 계획에 필요한 것을 감춘다. 사용자가 "왜 안 보이나"를
  물은 것이 이 스펙의 출발점이었고, 그 질문은 필터로 답할 수 없었다.
- **Worker 탭에도 확장 행을 싣기.** 실행 화면의 노이즈를 키운다. blocked 기본값이
  이미 탭마다 다른(Monitor 표시 / Worker 숨김) 선례를 따라 모집단 확장은 Monitor
  파이프라인에만 적용했다.
- **`spec 있음` 판정에 `quick_fix`를 끼워 넣기.** 라벨이 사실과 달라진다. 축을
  준비도로 바꾸는 쪽이 라벨과 판정을 같게 만든다.
