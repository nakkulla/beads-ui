---
id: UI-mfm1
title: Worker와 Monitor의 후보 행은 같은 사실 키를 싣고 lane-model 한 경로가 자격을 접는다
status: superseded
superseded_by: UI-u6ud-8
date: 2026-09-21
summary: "Worker와 Monitor의 후보 행은 같은 사실 키를 싣고 lane-model 한 경로가 자격을 접으며 배치 불가 사유는 슬롯 4a 준비도 칩 하나가 말한다"
spec: docs/superpowers/specs/2026-09-21-monitor-worker-card-parity-and-declutter-design.md
bead: UI-mfm1
---

# Worker와 Monitor의 후보 행은 같은 사실 키를 싣고 lane-model 한 경로가 자격을 접는다

## Context

워커 탭과 모니터 탭은 같은 `buildLanes`(`app/views/worker/lane-model.js`)와 같은
`candidateCard`로 후보 카드를 그린다(ADR 0014). 그러나 후보 행의 재료가 달랐다.
워커 어댑터(`app/views/worker/workspace-adapter.js`)는 `tab:worker:ready`/`blocked`
구독 행에 클라이언트가 판정을 끝낸 `eligible`·`route_ok`·`placement_spec`·조각
`reason`·`session_preferred`를 실었고, 서버 `runnable` 캐시
(`server/worker/runnable-cache.js qualify()`)는 `route`·`spec_state`·
`has_description`·`awaiting_user`·`worker_ineligible` 같은 원시 사실만 실었다.
`buildLanes`는 `eligible` 키 유무로 두 분기를 두고 어댑터 행은 실어 온 판정을,
서버 행은 `placementFromFacts`로 만든 판정을 썼다.

그 결과 한쪽에만 실리는 키가 생길 때마다 두 탭이 어긋났다. 2026-09-21 공유 서버
실측에서 모니터만 `placementTitle` 문장("spec이 발행되지 않아 대기 큐에 넣을 수
없습니다")을 카드 본문에 찍었고(10장), 워커는 "spec 없음" 조각을 찍었으며, 준비도
칩이 같은 사실을 한 번 더 말했다. `session_preferred_reason`은 어댑터만 계산해
세션 권장 칩이 워커에서만 설 수 있었고, 실행 설정 칩은 워커는 항상·모니터는 핀이
있을 때만 섰다. 숨김 개수 산식도 탭마다 달랐다.

## Decision

- 두 원천의 후보 행은 같은 사실 키 집합 `CandidateFacts`
  (`app/views/worker/placement.js`가 typedef 소유)를 싣는다: `route`·`spec_state`·
  `has_description`·`awaiting_user`·`awaiting_user_reason`·`release_info`·
  `dependents_info`·`exec_pins`·`worker_ineligible`·`session_preferred_reason`·
  `spec_after_blocker`. 어댑터 행은 `observation: true` 표지만 더 싣고
  `eligible`·`route_ok`·`missing_description`·`placement_spec`·`session_preferred`·
  조각 `reason`을 더 이상 싣지 않는다. 서버 `RunnableItem`은
  `session_preferred_reason`·`spec_after_blocker`·`awaiting_user_reason`·
  `release_info`·`dependents_info`를 더한다.
- 자격 판정은 `lane-model`의 한 경로 `placementFromFacts(facts, null)`가 두 원천에
  같이 내린다. 어댑터가 판정을 싣던 관행은 버린다 — 한쪽에만 실리는 키가 생길
  때마다 두 탭이 어긋난 이력이 근거다. 사실 키가 없는 구 서버 행만 기존 허용
  폴백(`eligible: true`)으로 간다.
- 배치 불가 사유는 슬롯 4a의 준비도 칩(`라우팅 필요`/`본문 필요`/`스펙 충돌`/
  `스펙 미발행`, title = `placementTitle` 문장) **하나**가 말한다. 카드 본문
  `.worker-card__reason` 줄에는 배치 판정 문장·조각이 서지 않고, 관측(⛔ 거절,
  사용자 결정 대기 사유, ID 없는 blocked)만 남는다. `placementTitle` 문장은 버튼·칩
  title에만 남는다.
- `♻ 재리뷰 필요`(stale admission)는 `reason` 문자열이 아니라 구조화 키
  `rereview_required: true`로 실리고 슬롯 1 상태 배지로 선다.
- 실행 설정 칩은 `execChipsFor(state, exec_pins, route)` 한 빌더가 후보·대기 행에
  유효값 칩을 항상 만들고, 핀에서 온 축만 `pinned`로 표시한다. 완료 행은 ADR
  UI-j10d대로 마지막 구현 attempt 기록을 유지한다.
- 숨김 개수 산식은 `per_control` 하나다. 순차 산식과 `candidate_hidden_counts`
  옵션은 없다.
- 어댑터가 로컬 스냅샷으로 알던 `location`(이미 레인에 있음) 판정은 후보 제외에만
  쓰고 카드 사유로는 쓰지 않는다.

## Consequences

- 같은 Bead는 두 탭에서 같은 재료·같은 칩·같은 본문을 얻는다. 세션 권장 칩·해제
  칩(`🔓`)·후속 칩·실행 설정 칩이 모니터 후보 카드에도 선다.
- 서버 `RunnableItem`·`app/protocol.md`·어댑터 행 형태가 함께 바뀌고 `eligible`
  판정 키가 사라진다. 되돌리려면 세 곳을 함께 되돌려야 한다.
- 스케줄러·admission·`ws.worker-queue`는 새 키를 읽지 않는다(ADR 0033). dotfiles
  계약 `session-preferred.consumer: beads-ui-worker-only`의 소비자는 여전히 워커
  후보 카드 하나이고, 모니터는 그 카드를 여러 저장소에 걸쳐 보여줄 뿐이다.
- 기각한 대안: (a) 두 분기를 두고 모니터 분기의 문장만 조각으로 바꾸기 — 다음
  한쪽 키에서 같은 어긋남이 재발한다. (b) 워커 탭이 서버 `runnable` 스냅샷을
  소비하기 — 서버 캐시는 admission 전제를 이미 접은 집합이라 ADR 0033의 관측
  집합이 좁아진다.
