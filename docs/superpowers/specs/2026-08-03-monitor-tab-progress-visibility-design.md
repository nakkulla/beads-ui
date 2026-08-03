# 진행 가시성 — 모니터 탭·Worker 카드 현재 단계 표시 (UI-53es)

- Bead: UI-53es
- Route: spec_backed
- 날짜: 2026-08-03

## 배경

진행중 Bead를 한눈에 보는 화면이 없다. Worker 실행중 레인은 워커가 디스패치한
attempt만 보여주고, 대화형 세션으로 진행 중인 Bead는 잡히지 않는다. Worker
실행중 타일에는 현재 단계 정보가 없다(큐 스냅샷에 페이즈명 부재,
`app/views/worker/running-grid.js:396-398` 주석). 반면 Board 카드는 자식 롤업
(`children N/M · current`, `app/views/board/card.js:296-350`)으로 진행중 child
제목을 이미 계산한다.

## 목표

1. 모든 in_progress Bead를 한 화면에서 모니터링하는 전용 모니터 탭.
2. Worker 실행중 카드에 현재 진행중 child 이슈 제목 표시.

## 설계

### 1. 모니터 탭

- Board·Worker 옆 세 번째 탭(`app/views/nav.js` `.ctl-tabs`에 추가). 새 뷰
  `app/views/monitor/`.
- 형태: 상태 그룹 세로 밀도 리스트(관제 테이블). 1차 범위는 in_progress 그룹
  하나, 정렬은 갱신 시각 내림차순.
- 행 구성 (왼쪽부터):
  - 스파인 색(진행 스테이지 색 `--stage-impl-on` 계열)
  - Bead id(모노스페이스, 클릭 시 상세)
  - 제목
  - 현재 진행중 child 제목(자식 롤업과 같은 데이터, 없으면 생략)
  - 워커 attempt가 있으면: 경과시간 + 마지막 이벤트 경과(라이브 하트비트 점,
    최근일수록 밝게) + τ·비용 배지
  - 워커 attempt가 없으면: 마지막 갱신 후 경과시간만(`updated_at` 기준 —
    이슈 표면에 상태 진입 시각이 없으므로 "진입 후 지속시간"이 아니라 "마지막
    갱신 후 경과"로 정의한다)
- 데이터: 기존 이슈 스토어 + 워커 큐 스냅샷 + 아래 `last_event_at`을
  클라이언트에서 bead_id로 조인. 새 REST API 없음.
- 서버 소폭 추가: 실행중 attempt의 큐 스냅샷에 `last_event_at`(마지막 세션 로그
  이벤트 시각)을 노출한다. 세션 로그 브로커(`server/worker/session-log.js`)의
  **모든 live/re-attach publish가 값 갱신과 함께 3초 coalesce된 큐 스냅샷
  fanout을 예약**한다(usage 이벤트와 같은 스로틀 경로) — 큐 변경·usage 이벤트
  에서만 fanout하는 현재 구조로는 usage 없는 로그 이벤트의 `last_event_at`이
  클라이언트에 전달되지 않기 때문. burst는 3초 창으로 병합된다.
  `app/protocol.md`에 문서화.
- 라이브 하트비트 판정: `last_event_at` 경과가 60초 이내면 활성 점,
  넘으면 흐린 점 + "N분 전" 텍스트. 필드 부재 시 점 생략(fail-quiet).

### 2. Worker 실행중 카드 현재 단계

- 실행중 타일(`app/views/worker/running-grid.js` `runningTile()`)에 해당 Bead의
  in_progress child 제목 한 줄 추가 (예: `T5: 프리앰블 정합·통합 검증·PR`).
- 데이터는 Board 카드 롤업이 쓰는 자식 데이터를 클라이언트 조인으로 재사용 —
  공용 유틸 `selectCurrentChild(children)`를 추출해 양쪽(모니터 탭·실행중
  타일·Board 롤업)에서 사용한다. 계약: in_progress child 중 `updated_at`
  내림차순 최상위, 동률이면 id 오름차순 tie-break(결정적). Board 롤업의 현재
  "첫 번째 in_progress child" 선택도 이 계약으로 교체한다. 프로토콜·서버 변경
  없음.
- Worker·모니터 탭 단독 진입 시에도 in_progress 이슈 스토어가 구독되도록
  배선한다(현재 Board 이탈 시 구독 해제, Worker는 ready/blocked만 구독).
- in_progress child가 없으면 줄 자체를 생략(fail-quiet).

## Test scope

- 모니터 행 구성: attempt 있음/없음, child 있음/없음 조합별 렌더 단위 테스트.
- 하트비트: `last_event_at` 최근/오래됨/부재 3분기 단위 테스트.
- 서버: publish→`last_event_at` 갱신 + 3초 coalesce fanout 예약·burst 병합을
  fake timer로 검증하는 단위 테스트(RED — 현재 publish는 fanout을 예약하지
  않음).
- `selectCurrentChild` 유틸: 정렬·tie-break·빈 목록 단위 테스트(RED seam).
  기존 Board 카드 롤업 테스트는 회귀 검증으로 유지.
- 실행중 타일 child 줄: 표시/생략 단위 테스트.
- 통합(main 수준, `app/main.*.test.js`): `#/monitor`·`#/worker` 직접 진입 시
  in_progress 이슈 구독이 배선되고 attempt 없는 이슈가 모니터에 표시되는지,
  모니터 route/nav 동작까지 non-vacuous로 검증.

## 비범위

- blocked/ready 등 다른 상태 그룹 표시(후속 확장).
- 필터·정렬 UI, TV 전용 모드.
- 대화형 세션의 단계 추정(워커 attempt 없는 Bead는 child 제목과 지속시간만).
- 세션 로그 스트림 전체를 모니터 탭에서 구독하는 것.

## 완료 기준

- 모니터 탭에서 모든 in_progress Bead가 현재 child·라이브 지표와 함께 보인다.
- Worker 실행중 타일에 진행중 child 제목이 보인다.
- Pre-Handoff Validation(lint/tsc/test/prettier/build) 통과.
