---
id: UI-p7s2
title: Board 탭은 퇴역하고 워커 탭이 저장소의 단일 이슈 면이 된다
status: accepted
date: 2026-09-21
summary: "Board 탭은 퇴역하고 워커 탭이 저장소의 단일 이슈 면이 되어 deferred 선반·완료 기간·우선순위/타입/라벨 필터·새 이슈 버튼을 흡수하며 기본 뷰와 레거시 해시는 worker로 간다"
spec: docs/superpowers/specs/2026-09-21-board-retirement-worker-migration-design.md
bead: UI-p7s2
---

# Board 탭은 퇴역하고 워커 탭이 저장소의 단일 이슈 면이 된다

## Context

저장소 화면은 Board(칸반 5칸: Blocked·Ready·In progress·Resolved·Closed)와
워커(실행 레인: 후보·대기·실행 중·PR 대기·완료) 두 탭이 같은 이슈 집합을 다른
축으로 보여 주었다. 두 면은 같은 렌더러를 나눠 쓰면서도 구독·필터·기간 어휘가
따로 자라, 같은 이슈가 탭마다 다르게 읽히는 부담이 반복됐다(UI-mfm1이 카드
재료를 통일한 뒤에도 탭 자체가 둘이라는 사실은 남았다).

2026-09-21 사용자 결정: Board 탭을 퇴역시키고 남길 기능만 워커 탭으로 옮긴다.
조사 기준에서 Board만 가진 것은 deferred 팝업·개수 배지, `+ 새 이슈` 버튼,
Closed 기간 `최근 30일`·`전체`, 우선순위·타입·라벨 필터, 드래그로 상태 변경,
카드 키보드 탐색이었다. 워커 탭은 `deferred-issues` 구독이 없어 deferred 이슈가
어디에도 보이지 않았고, 완료 레인 기간은 `오늘`·`7일`뿐이었다.

## Decision

- Board 탭을 퇴역시키고 워커 탭이 저장소의 단일 이슈 면이 된다. `app/views/board/`
  전체, Board 구독 여섯 개(`tab:board:*`), Board 전용 상태(`state.board`)와
  CSS(`.board-*`)를 제거한다. 라우터 기본 뷰와 알 수 없는 해시는 `worker`로
  가고, 레거시 해시 `#/board`·`#/board?issue=<id>`·`#/issue/<id>`·`#/issues`·
  `#/epics`는 `#/worker` 또는 `#/worker?issue=<id>`로 정규화된다. nav의 저장소
  탭 묶음에는 `Worker` 하나만 남는다 — 전역 탭(Monitor·비교·ADR)에서 저장소
  화면으로 돌아오는 클릭 경로다.
- 워커 탭이 흡수한 것: deferred 이슈는 후보 레인 아래 접힌 `보류 <N>` 선반으로
  보이고 같은 `candidateCard`의 변형 하나(`variant: 'deferred'`)로 그린다 —
  `[↴ 대기로]`와 준비도 칩이 없고 자격을 묻지 않는다(ADR 0014·0033·UI-tqqp
  승계). `+ 새 이슈`는 워커 툴바 버튼이 되어 기존 공용 다이얼로그를 연다. 완료
  레인 기간은 `오늘`·`7일`·`30일`·`전체` 네 값이고, 완료 레인은 Worker 완료
  행(`q.done`)과 `closed-issues` 구독의 닫힌 이슈의 합집합이다 — 세션 완료
  보고서가 확인된 행만 세션 배지를 얻고 그 밖은 닫힘 행이다. 우선순위·타입·라벨
  필터는 `worker-filter` 줄의 세 축으로 모든 레인에 적용되되 후보·보류는 숨기고
  대기·실행 중·PR 대기·완료는 흐린다.
- 옮기지 않은 것: 드래그로 상태 변경(이슈 상세의 상태 드롭다운이 유일한
  경로)과 카드 키보드 탐색. Board 수동 정렬의 유일한 전송 채널이던
  `ui-order`(`subscribe-ui-order`·`unsubscribe-ui-order`·`ui-order-set`·
  `ui-order-snapshot`)와 그 서버 저장소도 함께 제거한다.
- 공유 코드는 `app/views/board/` 밖으로 옮긴다: 스테퍼는 `app/views/stepper.js`,
  실행 영수증·계획 실행 포맷터는 `app/views/exec-format.js`.

## Consequences

- 저장소 화면의 이슈 면이 하나가 되어 "같은 이슈가 두 탭에서 다르게 보인다"는
  부담의 원천이 사라진다. 상태 변경은 이슈 상세 한 경로만 남고, deferred는
  접힌 선반으로 격하된다.
- 되돌리기 어렵다: 라우트·nav·구독·CSS·테스트·Board 뷰 코드와 `ui-order`
  채널(클라이언트·프로토콜·서버 저장소)을 지웠고, 기본 뷰와 레거시 해시의
  목적지가 바뀌었다. 복원하려면 뷰·프로토콜·서버를 함께 되살려야 한다.
- 맥락 없이는 놀랍다: 칸반 5칸을 버리고 실행 레인 하나로 합친 이유와, 드래그
  상태 변경·키보드 탐색을 옮기지 않은 절충은 코드만으로 드러나지 않는다.
- 브라우저 저장값 `beads-ui.board.*`와 디스크의 `ui-order.json`은 읽는 쪽이
  없어진 채 남는다(무해한 잔존, 정리하지 않는다).
- 기각한 대안: (a) Board의 모달 팝업을 워커로 이식 — 여는 자리(Board 필터 바)가
  없다. (b) deferred를 여섯 번째 레인으로 — 가끔 들여다보는 선반이 화면 폭을
  항상 나눠 갖는다. (c) 완료 기간만 넓히고 합치기 규칙 없이 두기 — 보고서 없는
  닫힌 이슈와 보존 창 밖의 옛 완료 이슈가 계속 빠진다.
- 모니터 탭의 보류 구역과 우선순위·타입·라벨 필터는 비목표다(서버 스냅샷에
  deferred 행이 없다).
