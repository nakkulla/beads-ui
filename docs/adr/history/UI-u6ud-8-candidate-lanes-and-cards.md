---
id: UI-u6ud-8
title: 후보 레인과 카드 조립
status: superseded
superseded_by: UI-l48z
date: 2026-09-23
summary: "레인은 buildLanes 하나로 조립하고 카드 줄 순서는 공유 슬롯 표가 정하며 재료 없는 줄은 그리지 않는다; 후보 레인은 미착수 이슈의 관측 집합이고 큐 진입 자격은 서버 admission이 판정한다; Worker와 Monitor의 후보 행은 같은 사실 키를 싣고 lane-model 한 경로가 자격을 접으며 배치 불가 사유는 슬롯 4a 칩 하나다; 워커 탭이 저장소의 단일 이슈 면이고 Board 탭·ui-order는 없다"
supersedes: [14, 33, "UI-mfm1", "UI-p7s2"]
spec: docs/superpowers/specs/2026-09-23-adr-cleanup-history-dir-reader-and-consolidation-design.md
bead: UI-u6ud
---

# 후보 레인과 카드 조립

## Context

- `0014`: 레인은 `buildLanes` 하나로 조립하고 카드 줄 순서는 공유 슬롯 표가 정한다.
- `0033`: 후보 레인은 미착수 이슈의 관측 집합이고 큐 진입 자격은 서버 admission이 판정한다.
- `UI-mfm1`: Worker와 Monitor의 후보 행은 같은 사실 키를 싣고 lane-model 한 경로가 자격을 접으며 배치 불가 사유는 슬롯 4a 칩 하나다.
- `UI-p7s2`: Board 퇴역은 끝났고, 남는 조항인 워커 탭 단일 이슈 면·`ui-order` 없음과 흡수한 표면만 가져온다.

## Decision

레인과 카드 조립

- 레인 조립은 순수 함수 `buildLanes(workspaces, workspaces_state, options)` 하나다. 입력 단위는 언제나 워크스페이스 항목 N개이고 Worker 탭은 자기 store를 어댑터로 그 모양에 접어 넣는다. Worker 전용 모델 빌더는 없다.
- 카드 렌더러는 두 탭이 공유한다. 줄 순서와 새 요소의 자리는 그 요소가 답하는 질문으로 카드 헤더 문법 스펙의 슬롯 표가 정한다.
- 재료가 없는 줄은 그리지 않는다. 조작은 첫 줄 오른쪽 끝이거나 액션 foot이고 그 사이에 칩을 끼우지 않는다. 슬롯 표에 없는 요소는 스펙을 먼저 갱신한 뒤 단다.

후보 레인

- 후보 레인은 미착수 이슈의 관측 집합이고 실행 안전은 서버 admission이 지킨다. `runnable-cache`의 채택 조건은 `bead_id` 있음, `status`가 `open`, phase child 아님 셋뿐이다.
- 자격 조건은 사실(`admitted`·`spec_state`·`has_description`·`awaiting_user`·`worker_ineligible`)로 실리고 `admitted`는 그 사실을 접은 결과다.
- 좁히기는 읽는 쪽이 한다. `runnableFor`/`runnablePeek`의 `include_unadmitted` 기본값은 `false`이고 `true`는 모니터 투영과 `laneCountsFor`만 넘긴다.
- 모집단은 세그먼트 `전체`/`착수 가능`/`준비 필요`와 슬롯 4a 판정 칩이 갈라 보이고, 판정 입력은 `queue_placeable` 하나여서 세그먼트와 `↴ 대기로` 버튼이 같은 답을 낸다.
- 큐 진입 자격은 서버 `checkWorkerQueueAdmission()`이 판정하고, `runnable-cache`는 표시 전용 사전필터이며 스케줄러 dispatch 경로는 이 캐시를 읽지 않는다(`bd ready`가 원천).
- 두 원천의 후보 행은 같은 사실 키 집합 `CandidateFacts`(`app/views/worker/placement.js`가 typedef 소유: `route`·`spec_state`·`has_description`·`awaiting_user`·`awaiting_user_reason`·`release_info`·`dependents_info`·`exec_pins`·`worker_ineligible`·`session_preferred_reason`·`spec_after_blocker`)를 싣는다. 어댑터 행은 `observation: true`만 더하고 판정 필드를 싣지 않는다.
- 자격 판정은 `lane-model`의 `placementFromFacts(facts, null)` 한 경로가 두 원천에 같이 내린다. 사실 키가 없는 구 서버 행만 허용 폴백(`eligible: true`)이다.
- 배치 불가 사유는 슬롯 4a 준비도 칩(`라우팅 필요`/`본문 필요`/`스펙 충돌`/`스펙 미발행`, title = `placementTitle` 문장) 하나가 말한다. `.worker-card__reason` 줄에는 배치 판정이 서지 않고 관측(⛔ 거절, 사용자 결정 대기 사유, ID 없는 blocked)만 남는다.
- `♻ 재리뷰 필요`는 구조화 키 `rereview_required: true`로 실리고 슬롯 1 상태 배지다.
- 실행 설정 칩은 `execChipsFor(state, exec_pins, route)` 한 빌더가 후보·대기 행에 유효값 칩을 만들고 핀에서 온 축만 `pinned`로 표시한다. 완료 행은 마지막 구현 attempt 기록을 유지한다.
- 숨김 개수 산식은 `per_control` 하나다. 어댑터의 `location` 판정은 후보 제외에만 쓰고 카드 사유로 쓰지 않는다.

단일 이슈 면

- 워커 탭이 저장소의 단일 이슈 면이다. Board 탭·Board 구독·`state.board`는 없고, 라우터 기본 뷰와 알 수 없는 해시는 `worker`이며, 레거시 해시(`#/board`·`#/board?issue=<id>`·`#/issue/<id>`·`#/issues`·`#/epics`)는 `#/worker` 또는 `#/worker?issue=<id>`로 정규화한다. nav의 저장소 탭 묶음에는 `Worker` 하나다.
- deferred 이슈는 후보 레인 아래 접힌 `보류 <N>` 선반에 `candidateCard`의 `variant: 'deferred'`로 그리고 `[↴ 대기로]`·준비도 칩·자격 판정이 없다.
- `+ 새 이슈`는 워커 툴바 버튼이다. 완료 레인 기간은 `오늘`·`7일`·`30일`·`전체`이고 완료 레인은 Worker 완료 행과 `closed-issues` 구독의 합집합이며, 세션 완료 보고서가 확인된 행만 세션 배지를 얻는다.
- 우선순위·타입·라벨 필터는 `worker-filter` 줄의 세 축으로 모든 레인에 적용되고 후보·보류는 숨기며 대기·실행 중·PR 대기·완료는 흐린다.
- 드래그로 상태 변경과 카드 키보드 탐색은 없다(상태 변경은 이슈 상세의 상태 드롭다운). `ui-order`(`subscribe-ui-order`·`unsubscribe-ui-order`·`ui-order-set`·`ui-order-snapshot`)와 그 서버 저장소는 없다.
- 공유 코드는 `app/views/stepper.js`와 `app/views/exec-format.js`에 둔다.

## Consequences

- 레인·카드·후보 판정·이슈 면이 한 행으로 읽힌다. 되돌리려면 buildLanes·슬롯 표 스펙·runnable-cache·lane-model·라우터 기본 뷰가 함께 움직인다.
- `UI-p7s2`의 Board 코드 제거는 완료된 실행이라 승계 대상이 아니다(폐기한 조항이 아니다). 스펙이 선언한 대로 상시 조항만 재진술했다. 그 밖에 폐기한 조항은 없다.
