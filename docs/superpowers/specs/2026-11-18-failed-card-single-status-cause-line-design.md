---
scope:
  - app/views/worker/running-grid.js
  - app/views/worker/lanes.js
  - app/views/worker/lane-model.js
  - app/views/worker/failure-labels.js
  - app/utils/failure-sentences.js
  - app/protocol.md
  - server/ws/worker-handlers.js
  - server/worker/bead-timeline.js
  - server/worker/scheduler.js
  - server/worker/quickfix-landing.js
  - server/worker/queue-store.js
  - server/worker/repo-operation-coordinator.js
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
---

# 실패 카드: 상태 배지 하나, 원인 한 문장, 사람 말 경위 (UI-lx9o)

## 1. 배경

2026-11-18 `dotfiles-jtuda`의 quick_fix attempt가 착지의 배포 단계에서 실패했다.
실제로 일어난 일은 한 가지다 — 배포 스크립트가 exit 1로 끝났고(`repo-ops deploy:
Claude readonly preauthorization probe failed`) 자동 재시도 한 번도 같은 오류였다.
폰(390px)에서 본 실패 카드는 이 한 가지를 다음처럼 보였다.

- 같은 상태를 네 자리에서 말한다: 머리줄의 `실패`, `⛔ 착지 실패` 배지,
  `⛔ 확인 필요 · 조치 필요` 배지, 상세의 `원인: 착지 실패`.
- 상세의 `원인` 칸은 분류 낱말(`착지 실패`)뿐이고, 무엇이 왜 실패했는지는 회색 줄
  하나와 이력 한 줄에만 있다.
- `이력` 다섯 줄 중 세 줄이 같은 시각의 한 사건을 내부 코드로 나열한다
  (`세션 실패 — quickfix_landing_failed:script_failed`, `착지 실패 — script_failed
  (배포 실행)`, `복구 분류 — repair:repair · script_failed`).
- 열리는 상자가 둘이고(`대기 판정 근거`, 실패 상세) 서로 다른 조작을 말한다. 대기
  쪽은 배포 실패를 "검증 실패"라고 부르고, 실패 쪽 `다음`은 Worker 설정의
  `[배포 실행]`을 가리키는데 카드의 버튼은 `[세션에서 이어가기]`와
  `[↻ 정리 재시도]`다.
- `Discord 준비 중`이 머리줄과 팝업에 두 번 선다.

전후 비교 화면: `~/tmp/mockups/2026-11-18-failed-card-declutter.html`.

## 2. 검증된 전제

기준 커밋 `b33b2842a41f2b9ba940b0463a03c7067a2ad867`.

- 실패 타일의 원인 배지는 `failureCategory(failure.cause)` 한 낱말이고 대기 배지가 그
  뒤에 따로 붙으며, 같은 자리에 `자동 진행 꺼짐` 라벨이 설 수 있다 —
  app/views/worker/running-grid.js:1385, :1397, :1406, :1443
- 머리줄 조작 영역의 `실패`·`중단됨` 낱말은 `elapsed_el`이 그린다 —
  app/views/worker/running-grid.js:1204, :1211
- 실패 상세는 원인 배지 클릭으로만 열리고(`failure.open`), 행 순서는 보고·이력·원인·
  다음·재시도 이력·실패 코드·가드/원인·명령·착지 단계·실패 시각·실행·attempt id·비용·
  재개다. 착지 단계 행은 `landing.reason`(원시 코드)을 함께 싣는다 —
  app/views/worker/running-grid.js:512, :544, :587
- `원인` 칸은 `failureSentence(cause)`가 없으면 `failureText`로 물러서고, 문장 사전에
  `script_failed` 항목이 없어 이 실패는 범주 낱말만 남는다 —
  app/views/worker/running-grid.js:516, app/utils/failure-sentences.js:22
- `다음` 문장은 `FAILURE_NEXT_ACTIONS`의 마지막 일치 조각에서 오고 `script_failed`는
  Worker 설정의 `[배포 실행]`을 가리킨다 — app/utils/failure-sentences.js:212,
  app/views/worker/running-grid.js:474
- 이력 블록은 투영이 준 `timeline` 줄의 `summary`를 그대로 그리고, 줄은 최신이
  위다. 실패 상세와 확인 필요 타일 두 곳이 같은 블록을 쓴다 —
  app/views/worker/running-grid.js:382, :577, :1071, app/views/worker/lane-model.js:1354
- 서버는 타일마다 최근 이력 기록 5개만 보낸다. 이력 이벤트는 정해진 필드만 갖고
  클라이언트 투영도 `event_id`·`kind`·`summary`·`at`만 읽는다 —
  server/ws/worker-handlers.js:1252, :1316, server/worker/bead-timeline.js:135,
  app/views/worker/lane-model.js:1372
- 이력 `summary`는 서버가 기록 시점에 만든 문자열이다. 착지 단계와 착지 실패 —
  server/worker/quickfix-landing.js:498, attempt 실패 — server/worker/scheduler.js:1881
  (`appendFailedEvent`, 보통의 경로)와 server/worker/queue-store.js:6932(이관 때 빠진
  종단 기록 보충), 복구 분류 — server/worker/repo-operation-coordinator.js:1320
- 한 번의 배포 실패가 `operation_failed`·`operation_recovery`·`landing_step`(failed)·
  `attempt_failed` 네 이벤트를 남기고, 앞의 둘에는 attempt id가 없다. 정리 재시도는
  같은 attempt id로 돌아 한 attempt에 저장소 작업 id가 다른 실패가 둘 남는다 — `tail
~/.local/state/bdui/dotfiles-fdf036ac32f8/beads/dotfiles-jtuda/events.jsonl`
  (14:45 작업 `d3409a96…`, 16:54 작업 `d758432e…`)
- 대기 사유는 해결 문장(`resolution`)과 풀리는 조건(`release`)을 따로 갖는다.
  "검증 실패를 세션에서 고친 뒤…"는 사유 없는 `repair` 처분의 공용 `release` 문장이고
  확인 필요 타일도 같은 문장을 읽는다 — server/worker/wait-judgment.js:433,
  app/views/worker/tile-resolve.js:83
- `Discord 준비 중`은 머리줄 버튼과 대기 팝업 해결 줄 두 곳에 선다 —
  app/views/worker/lanes.js:2119, app/views/worker/tile-resolve.js:83
- 실패 낱말·문장 사전은 서버와 클라이언트가 같은 파일을 읽는다 —
  app/views/worker/failure-labels.js:213, server/worker/failure-class.js:307
- 카드 본문의 회색 줄은 대기 대표 사유의 headline이다 —
  app/views/worker/running-grid.js:1718
- 속성 칩(`backend`·`리뷰 ✓`)과 `병렬` 칩은 각각 `attr_chips`, `lane_chip`이 그린다 —
  app/views/worker/running-grid.js:1292, :1251, :1785
- 조작 줄의 짝(`[세션에서 이어가기]`·`[워커로 이어가기]`)과 폐기 조작의 유무는
  `tileResolveFields`와 타일의 `discard` 재료가 정한다 —
  app/views/worker/running-grid.js:1468, :1497, :1516, :1569
- Worker 탭과 모니터는 같은 `runningTile`을 쓰고 상세 열림 상태만 각자 가진다 —
  app/views/worker/index.js:664, app/views/monitor/index.js:565
- 배포 실패의 exit code와 자동 재시도 소진 사실은 서버의 저장소 작업 기록에만 있고
  실패 타일 투영에는 없다 — `grep -n -e exit_code -e first_failure` 를
  app/views/worker/lane-model.js 와 app/views/worker/running-grid.js 에 돌려 0건,
  app/views/worker/lane-model.js:1305

## 3. 목표

실패 타일(`failed`이고 대기 타일로 그려지지 않는 것, `중단됨` 포함)을 접힌 상태에서
한 번 읽으면 무엇이 실패했는지 알 수 있게 한다. 자세한 경위와 내부 값은 한 번 눌러 한
상자에서 읽는다. 조작의 유무와 조건은 바꾸지 않는다. Worker 탭과 모니터의 카드는 같다.

## 4. 설계

### 4.1 접힌 카드

1. 정체성 줄(슬롯 1): 상태 점, 저장소 배지, Bead ID, 우선순위, 속성 칩, 그리고 지금
   서는 조작 그대로(`[↻ 정리 재시도]` 또는 `[↻ 이어하기]`, 폐기 조작, `✕`).
2. 상태 배지 하나: `⛔ <범주>[ · <단계>]`. 예: `⛔ 착지 실패 · 배포`. 이 배지가
   상세를 여는 유일한 손잡이다.
3. 제목(슬롯 2).
4. 원인 한 문장(슬롯 3): 무슨 일이 일어났는지 한 문장, 이어서 스크립트가 남긴 오류
   요약과 재시도 사실. 예: `배포 스크립트가 exit 1로 끝났습니다. repo-ops deploy:
Claude readonly preauthorization probe failed · 자동 재시도 1회도 같은 오류`.
5. 조작 줄(슬롯 6), 좌표 줄의 `병렬`·`직렬 n` 칩, 시간 줄(슬롯 7): 지금 그대로다.

- 결정: 실패 타일은 실패를 말하는 상태 배지를 하나만 그린다. 대기 배지
  (`⛔ 확인 필요 · 조치 필요`)와 머리줄의 `실패`·`중단됨` 낱말은 실패 타일에서 그리지
  않는다 — 셋이 같은 사실이다. `중단됨`은 배지의 범주 낱말로 읽힌다.
- 결정: `자동 진행 꺼짐` 라벨은 그대로 둔다 — 이 카드의 실패가 아니라 저장소의 자동
  진행이 꺼졌다는 다른 사실이다.
- 결정: 조작은 하나도 더하거나 빼지 않는다. 슬롯 1의 `↻ 정리 재시도`·`↻ 이어하기`와
  그 활성 조건, `[폐기]`와 착지 뒤 숨김 조건, `[폐기 포기]`, `✕`의 노출 조건, 슬롯 6의
  짝은 `tileResolveFields`와 현행 판정이 정한 그대로다. 살아 있는 대화가 있을 때의 대화
  세션 배지와 Discord 버튼도 현행 조건대로다.
- 결정: 배지의 `<단계>`는 실패가 난 착지 단계나 저장소 작업 종류의 사람 낱말이다.
  재료가 없으면 범주만 그린다(fail-quiet).
- 결정: 속성 칩과 `병렬` 칩은 카드에 그대로 둔다 — 2026-11-18 사용자 결정.
- 결정: 비활성 `Discord 준비 중` 버튼은 실패 타일 머리줄에 그리지 않는다. 준비 중이라는
  사실은 상세의 `다음`에 있다. 스레드가 생긴 뒤의 Discord 버튼은 현행 자리 그대로다.
- 결정: 원인 문장의 재료가 하나도 없으면 줄을 그리지 않는다.

### 4.2 상세 — 한 상자

배지를 누르면 상자 하나가 열린다. 실패 타일에서는 대기 판정 근거 팝업을 따로 열지
않고 그 내용이 이 상자의 정해진 자리로 들어온다.

1. **경위**: 사건 단위 줄, 시간순(오래된 것이 위).
2. **다음**: 대기 팝업이 싣던 것을 이 순서로 싣는다 — 살아 있는 대화의 안내 또는 해결
   문장, 판정 이유, 풀리는 조건, 다른 사유, 대기 시작 시각.
3. **세부**(기본 접힘): 실패 코드, 착지 단계, 실행(도구·모델·effort·비용), attempt
   id(복사), 로그 경로(복사), `▤ 세션 기록`, `범례 보기`, 그리고 재료가 있을 때만
   가드/원인·명령·재시도 이력.

- 결정: 경위의 한 줄은 한 사건이다. 한 번의 실패가 남긴 기록들(저장소 작업 실패, 복구
  분류, 착지 단계 실패, attempt 실패)은 한 줄로 합친다.
- 결정: 한 실패의 기록은 저장소 작업 id로 잇는다. 저장소 작업이 없는 착지 실패는 정산
  실행마다 다른 식별자로 잇는다. 같은 attempt에서 정리 재시도로 다시 난 실패는 다른
  사건이고 다른 줄이다. 이 변경 전에 기록돼 이을 근거가 없는 줄은 묶지 않고 한 줄씩
  그린다.
- 결정: 사건을 묶고 고르는 일은 서버가 한다. 서버는 실패 타일에 실패 사건 하나와 그
  앞 가까운 사건 3개, 그 뒤 최근 사건 3개를 보낸다. 실패 기록이 이력에 없으면 서버가
  attempt의 원인과 종료 시각으로 실패 줄을 만든다. 이 모양을 `app/protocol.md`에 적는다.
- 결정: 확인 필요 타일이 받는 이력(최근 5줄, 최신이 위, 로그 경로 자리)은 바꾸지
  않는다 — 그 타일은 범위 밖이다.
- 결정: 접힌 카드와 경위에는 원시 코드를 쓰지 않는다. 사전이 아는 코드는 그 낱말로,
  모르는 코드는 `알 수 없는 오류로 끝남` 같은 기본 문장으로 쓰고, 원시 값은 세부의
  `실패 코드` 행에만 둔다. 스크립트가 남긴 오류 요약(출력 문장)은 코드가 아니므로 그대로
  보인다. 요약 자리에 코드만 들어 있는 기록은 코드로 다룬다.
- 결정: `다음`은 그 카드에 지금 서 있는 조작만 이름한다. 카드에 없는 버튼(Worker
  설정의 `[배포 실행]`)을 가리키지 않는다. 살아 있는 대화가 있으면 그 대화의 안내가 첫
  문장이다.
- 결정: 대기 판정과 공용 문장(`resolution`·`release`)은 바꾸지 않는다. 실패 상세가
  배포 실패를 "검증 실패"라고 부르지 않게 하는 것은 실패 상세에서 그리는 문구로만
  한다 — 확인 필요 타일이 읽는 공용 문장은 그대로다.
- 결정: `원인`·`실패 시각`·`재개` 행은 없앤다 — 각각 카드의 원인 문장, 경위의 실패
  줄, 조작 버튼의 활성 상태가 이미 말한다. `착지 단계` 행은 단계 낱말과 커밋만 싣고
  사유 코드는 `실패 코드` 행으로 간다.

### 4.3 실패 코드의 사람 말

- 결정: `실패 코드` 행은 사람 말을 먼저, 원시 코드를 그 아래에 쓴다. 합성 코드는
  조각마다 낱말을 얻는다. 예: `착지 실패 › 스크립트가 0이 아닌 코드로 끝남`, 그 아래
  `quickfix_landing_failed:script_failed`. 복구 판정도 같은 행 묶음에 사람 말과 원시
  값으로 둔다.
- 결정: 서버가 이력 줄을 쓸 때 코드 대신 같은 사전의 낱말을 쓴다. 대상은 attempt
  실패(두 생산자 모두), 착지 실패, 저장소 작업 실패, 복구 분류 줄이다. 이미 기록된 줄은
  다시 쓰지 않고 그대로 그린다.
- 결정: 이력 이벤트는 사람 말 `summary`와 함께 원시 코드와 사건을 잇는 식별자를 별도
  필드로 싣는다. 이벤트 생성과 투영이 그 필드를 버리지 않게 한다.
- 결정: 원인 문장과 배지의 재료(저장소 작업 종류, exit code, 오류 요약, 자동 재시도
  소진 여부)는 서버가 실패 투영에 싣는다. 기록이 없으면 키를 싣지 않는다.
- 결정: 낱말과 문장의 정본은 지금처럼 `app/utils/failure-sentences.js` 하나다.
  `script_failed`에 원인 문장을 더한다.

### 4.4 카드 문법 스펙 갱신

`2026-08-25-card-header-grammar-unify-design.md` §5.1의 슬롯 표와 정정 문단을 함께
고친다. 슬롯 표에 실패 타일의 자리를 확정한다: 슬롯 1 상태 배지 하나, 슬롯 3 원인
문장, 실패 상세 세부의 로그 경로.

이 스펙이 실패 타일에 한해 뒤집는 기존 조항은 다음과 같고, 같은 정정 문단이 이들을
이름한다.

- 카드 문법 §5.1 정정(UI-xfjy)의 슬롯 1 오른쪽 상태 라벨 — 실패 타일에서는 `실패`·
  `중단됨`을 그리지 않는다.
- `2026-08-27-failed-tile-decision-surface-design.md`(UI-rj02) §3.2 "닫힌 실패 타일은
  1·2번 줄만 그린다"와 `실패`·`중단됨` 라벨 유지 — 슬롯 3 원인 문장을 더하고 라벨을
  뺀다. §3.3의 "열기/펼치기 상태는 없다"와 재료 표 — 세부를 접는 상태를 하나 두고
  `원인`·`실패 시각`·`재개` 행을 뺀다.
- `2026-08-28-worker-record-timeline-retention-design.md`(UI-8wpb) §9 "최근 타임라인
  5줄과 마지막 로그 경로" — 실패 상세에서는 사건 묶음 경위로 바꾸고 로그 경로를
  세부로 옮긴다.
- `2026-09-16-wait-surface-density-vocabulary-design.md`(UI-8gem) §6.2의 실패 배지와
  대기 배지 병기 — 실패 타일은 실패 배지만 그린다.
- `2026-09-08-worker-feedback-readability-design.md`(UI-kyky) §4.2의 `다음` 행 —
  설정 화면의 조작을 가리키지 않고 카드에 선 조작만 이름한다.
- `2026-10-11-action-required-resolvable-by-button-design.md` §3.5(UI-vviq)의 비활성
  `Discord 준비 중` — 실패 타일 머리줄에서 뺀다. 카드 문법 정정(UI-18a5)의 대화 세션
  배지와 슬롯 1 Discord 버튼 자리는 그대로다.

## 5. 비목표

- 실패가 아닌 타일(확인 필요, 일시정지, 공급자 보류, 외부 대기)의 배치와 이력 — 대기
  팝업과 이력 블록은 그 타일들에서 지금과 같다.
- 대기 판정, 조작의 유무와 활성 조건.
- 레인 위 실행 설정 칩(오케·워커·구현 리뷰·qf) — 2026-11-18 사용자 결정으로 범위 밖.
- 실패 뒤 해결 세션의 자동 시작, 여는 자리, Worker 인계 — UI-1fss.
- PR 대기 행, 저장소 작업 타임라인의 문구.

## 6. 테스트 범위

- 실패 타일이 실패 상태 배지를 정확히 하나 그리고 대기 배지·`실패` 낱말을 그리지
  않는다. `자동 진행 꺼짐`은 그대로 선다.
- 조작: 재개 버튼, `[폐기]`와 착지 뒤 숨김, `[폐기 포기]`, `✕`, 슬롯 6 짝(대화 없음,
  대화 있고 링크 없음, 링크 있음, 인계·인수 중)이 변경 전과 같다.
- 원인 문장: 문장 사전에 있는 코드, 없는 코드, 요약 자리에 코드만 있는 기록, 재료가
  없는 경우.
- 경위: 한 실패의 네 기록이 한 줄이 된다. 같은 attempt에서 정리 재시도로 다시 난
  실패는 두 줄이다. 실패 뒤 사건이 다섯을 넘어도 실패 줄이 남는다. 이을 근거가 없는 옛
  기록은 묶이지 않는다. 실패 기록이 없으면 attempt 재료로 만든 실패 줄이 선다.
- 새로 기록된 줄과 접힌 카드에 원시 코드가 없다(미지 접미사 포함). 세부에는 있다.
- `다음`이 카드에 없는 조작을 이름하지 않고, 대기 팝업이 싣던 다섯 항목을 순서대로
  싣는다.
- 확인 필요 타일의 이력 블록과 대기 팝업 문구가 변경 전과 같다.
- 서버 이력 줄(attempt 실패 두 생산자, 착지 실패, 저장소 작업 실패, 복구 분류)이 사전
  낱말과 원시 코드 필드, 사건 식별자를 싣는다.
- 실패 투영이 저장소 작업 종류·exit code·요약·재시도 소진을 싣고, 기록이 없으면 키를
  싣지 않는다.
- 카드 동일성 테스트(`card-parity.test.js`)가 실패 타일에서 통과한다.
- 390px 폭 넘침 탐침과 `styles.design-system.test.js`.

## 7. 수용 기준

1. `dotfiles-jtuda`와 같은 실패를 접힌 카드로 볼 때 실패 상태 낱말이 한 번만 나오고,
   실패한 것(배포 스크립트)과 그 오류 요약이 카드에 보인다.
2. 배지를 누르면 상자 하나만 열리고, 경위에서 한 번의 실패가 한 줄이며 정리 재시도로
   다시 난 실패는 따로 한 줄이다.
3. 이 변경 뒤 기록된 실패에서, 접힌 카드와 경위에
   `quickfix_landing_failed`·`script_failed`·`repair:repair` 같은 원시 코드가 보이지
   않는다. 세부에는 원시 코드가 그대로 있다. 그 전에 기록된 이력 줄은 옛 문구로 남는다.
4. `다음`이 이름하는 조작이 모두 그 카드에 있다.
5. 변경 전에 서던 조작이 같은 조건에서 모두 선다.
6. Worker 탭과 모니터에서 같은 Bead의 실패 카드가 같다.

## 결정 (ADR 후보)

- 전제: ADR UI-6kj0(UI-1fss·UI-gmww 승계) — 슬롯 표에 없는 요소는 스펙을 먼저
  갱신한다는 승계 조항을 따라 §4.4로 슬롯 표를 먼저 고친다. 실패 attempt 타일 슬롯 1의
  `↻ 정리 재시도`·`↻ 이어하기`, 대화 레코드와 짝의 판정(UI-1fss의 착지 배포 실패 행
  포함), 대화형 세션 배지 낱말은 그대로 둔다.
- 실패 타일은 대기 배지와 대기 판정 근거 팝업을 따로 그리지 않고, 해결 문장을 포함한
  대기 정보를 실패 상세의 `다음`에 싣는다. 되돌리기 어려움: UI-6kj0이 승계한 조항이
  해결 문장의 자리를 대기 팝업 첫 줄로, `awaiting_user`·`recovery` 행의 라벨을 `확인 필요`로
  정했고 Worker 탭·모니터·카드 문법 스펙·동일성 테스트가 그 자리를 함께 읽는다. 대안:
  실패 타일에도 대기 배지와 팝업을 남긴다(같은 상태가 두 배지로 남는다). 맥락 없이는 왜
  실패 타일만 `확인 필요` 배지와 팝업이 없는지 알 수 없다.
  `summary`: "실패 타일은 상태 배지 하나와 상세 상자 하나만 갖고 대기 사유가 함께 있어도 확인 필요 배지를 그리지 않으며 해결 문장은 그 상세의 다음에 살아 있는 대화 안내 다음 순서로 싣는다 — 나머지 조항은 UI-6kj0 그대로다" → ADR, supersede UI-6kj0
- 경위를 사건 단위로 묶어 서버가 고르고 시간순으로 그린다 — 표시와 투영 규칙이고
  소비자가 이 저장소의 실패 상세 하나다 → ADR 아님
- 서버 이력 줄을 사전 낱말로 쓰고 원시 코드를 별도 필드로 싣는다 — 문구와 필드 추가이며
  이미 기록된 줄은 그대로다 → ADR 아님
- 속성 칩과 `병렬` 칩을 카드에 둔다 — 현행 유지 → ADR 아님
- 실패 타일 머리줄의 비활성 `Discord 준비 중`을 뺀다 — 표시 규칙 → ADR 아님

## 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| ---- | ---------- | ---------------- | --------- | ---------------- | ------- |

- 관찰: 실패 흐름(자동 해결 세션, hub, Worker 인계)은 같은 요청에서 나온 독립 작업
  UI-1fss다 — 이 스펙의 형제가 아니라 별도 설계라 표에 넣지 않는다. UI-1fss가 먼저
  착지해 UI-gmww를 supersede했고 UI-6kj0이 다시 UI-1fss를 supersede했으므로, 이
  스펙은 그때 유효한 UI-6kj0을 대상으로 적는다.
