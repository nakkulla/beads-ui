# 보드 Deferred 컬럼을 팝업으로 전환

- Bead: `UI-7b9v`
- Route: `spec_backed`
- 날짜: 2026-08-05

## 1. 문제

보드 필터 바의 `Deferred (N)` 토글(`app/views/board/filter-bar.js:174-181`)을
켜면 In Progress와 Resolved 사이에 Deferred 컬럼이 끼어든다
(`app/views/board/index.js:731-781`, 상태 `show_deferred_column`,
2026-04-21-deferred-board-column-design). 컬럼이 들어오면 나머지 컬럼 폭이
줄며 레이아웃 전체가 밀린다 — deferred는 가끔 들여다보는 보관함이지 상시
컬럼이 아니다.

## 2. 목표

`Deferred (N)` 버튼 클릭 시 컬럼 대신 모달 팝업으로 deferred 이슈 목록을
띄운다. 보드 레이아웃은 변하지 않는다.

## 3. 비목표

- `deferred` 상태·구독(`deferred-issues`, `server/list-adapters.js:82-88`)
  변경 — 데이터 경로는 그대로, 표시만 바꾼다.
- 카운트 배지 제거 — `Deferred (N)` 카운트는 유지한다.
- 다른 컬럼·필터 동작 변경.

## 4. 설계

- `Deferred (N)` 클릭 → 모달 오버레이: 제목(`Deferred (N)`), 닫기(✕·ESC·배경
  클릭), 본문은 deferred 카드 목록. 카드는 기존 보드 카드 템플릿
  (`app/views/board/card.js`)을 재사용해 컬럼과 같은 정보를 보여준다.
- 카드 클릭 → 기존 컬럼 카드와 동일하게 상세 패널로 이동하고 팝업을 닫는다.
- 데이터: 팝업이 열려 있는 동안 기존 `deferred-issues` 구독을 쓴다 — 컬럼
  구현과 같은 조건(열림 = 구독)을 유지한다. 카운트는 현행대로 상시 계산
  (`board/index.js:312-329`).
- 상태: `show_deferred_column`을 `deferred_popup_open`(세션 로컬, 기본
  false)으로 대체하고, 컬럼 렌더 경로(`index.js:731-781`)와 컬럼 전용
  CSS를 제거한다.
- 모달 마크업/스타일은 저장소의 기존 다이얼로그 패턴
  (`app/views/worker/exec-defaults-dialog.js`)을 따른다.

## 5. Test scope

- 버튼 클릭 → 팝업 열림·deferred 카드 렌더, 닫기(✕/ESC/배경) → 팝업 닫힘,
  카드 클릭 → 상세 이동+닫힘 — 기존 board/index 테스트 패턴으로 추가
  (RED→GREEN).
- Deferred 컬럼 미렌더(레이아웃 불변) 단언으로 기존 컬럼 테스트 대체.
