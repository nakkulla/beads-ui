---
scope:
  - app/views/worker/running-grid.js
  - app/views/worker/lanes.js
  - app/views/worker/lane-model.js
  - app/views/worker/failure-labels.js
  - app/views/worker/wait-vocabulary.js
  - app/utils/failure-sentences.js
  - server/worker/wait-judgment.js
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

전후 비교 화면: `~/tmp/mockups/2026-11-18-failed-card-declutter.html`(이 스펙과
같은 내용으로 갱신한 시안).

## 2. 검증된 전제

기준 커밋 `35df8908fda86a53f5dd3933eb156a5e3ac765e6`.

- 실패 타일의 원인 배지는 `failureCategory(failure.cause)` 한 낱말이고 대기 배지가 그
  뒤에 따로 붙는다 — app/views/worker/running-grid.js:1371, :1392, :1429
- 머리줄 조작 영역의 `실패`·`중단됨` 낱말은 `elapsed_el`이 그린다 —
  app/views/worker/running-grid.js:1190, :1197
- 실패 상세는 원인 배지 클릭으로만 열리고(`failure.open`), 행 순서는 보고·이력·원인·
  다음·재시도 이력·실패 코드·가드/원인·명령·착지 단계·실패 시각·실행·attempt id·비용·
  재개다 — app/views/worker/running-grid.js:503, :578
- `원인` 칸은 `failureSentence(cause)`가 없으면 `failureText`로 물러서고, 문장 사전에
  `script_failed` 항목이 없어 이 실패는 범주 낱말만 남는다 —
  app/views/worker/running-grid.js:507, app/utils/failure-sentences.js:22
- `다음` 문장은 `FAILURE_NEXT_ACTIONS`의 마지막 일치 조각에서 오고 `script_failed`는
  Worker 설정의 `[배포 실행]`을 가리킨다 — app/utils/failure-sentences.js:212,
  app/views/worker/running-grid.js:465
- 이력 블록은 투영이 준 `timeline` 줄의 `summary`를 그대로 그리고, 줄은 최신이
  위다 — app/views/worker/running-grid.js:373, app/views/worker/lane-model.js:1314
- 이력 `summary`는 서버가 기록 시점에 만든 문자열이다. 착지 단계와 착지 실패 —
  server/worker/quickfix-landing.js:497, 세션 실패 — server/worker/queue-store.js:6898,
  복구 분류 — server/worker/repo-operation-coordinator.js:1316
- 한 번의 배포 실패가 `operation_failed`·`operation_recovery`·`landing_step`(failed)·
  `attempt_failed` 네 이벤트를 8초 안에 남긴다 — `tail
  ~/.local/state/bdui/dotfiles-fdf036ac32f8/beads/dotfiles-jtuda/events.jsonl`
- 대기 팝업의 "검증 실패를 세션에서 고친 뒤…" 문장은 사유 없는 `repair` 처분 전체에
  쓰는 고정 문장이다 — server/worker/wait-judgment.js:432
- 카드 본문의 회색 줄은 대기 대표 사유의 headline이다 —
  app/views/worker/running-grid.js:1699
- 속성 칩(`backend`·`리뷰 ✓`)과 `병렬` 칩은 각각 `attr_chips`, `lane_chip`이 그린다 —
  app/views/worker/running-grid.js:1278, :1237, :1766
- Worker 탭과 모니터는 같은 `runningTile`을 쓰고 상세 열림 상태만 각자 가진다 —
  app/views/worker/index.js:664, app/views/monitor/index.js:565
- 배포 실패의 exit code와 자동 재시도 소진 사실은 서버의 저장소 작업 기록에만 있고
  실패 타일 투영에는 없다. 투영이 싣는 착지 재료는 `quickfix_landing`(단계·head·사유)
  뿐이다 — `grep -n -e exit_code -e first_failure app/views/worker/lane-model.js
  app/views/worker/running-grid.js`가 0건, app/views/worker/lane-model.js:1265
- 이력 블록은 실패 상세와 확인 필요 타일 두 곳이 함께 쓴다 —
  app/views/worker/running-grid.js:568, :1062
- 이번 실패의 복구 판정이 `repair`인데 수리 이슈 인계가 없는 것은 설계다: 첫 실패와
  재시도의 지문이 달라 `verification_failure`가 됐고, 수리 이슈는 코드 결함으로 증명된
  경우에만 만든다 — server/worker/operation-recovery.js:50, :97

## 3. 목표

실패 타일(`failed`이고 대기 타일로 그려지지 않는 것, `중단됨` 포함)을 접힌 상태에서
한 번 읽으면 무엇이 실패했고 지금 무엇을 누르면 되는지 알 수 있게 한다. 자세한
경위와 내부 값은 한 번 눌러 한 상자에서 읽는다. Worker 탭과 모니터의 카드는 같다.

## 4. 설계

### 4.1 접힌 카드

위에서 아래로 다음만 그린다.

1. 정체성 줄(슬롯 1): 상태 점, 저장소 배지, Bead ID, 우선순위, 속성 칩, 그리고
   조작 `[↻ 정리 재시도]` 또는 `[↻ 이어하기]`, `✕`. 지금과 같다.
2. 상태 배지 하나: `⛔ <범주>[ · <단계>]`. 예: `⛔ 착지 실패 · 배포`. 이 배지가
   상세를 여는 유일한 손잡이다.
3. 제목(슬롯 2).
4. 원인 한 문장(슬롯 3): 무슨 일이 일어났는지 한 문장, 이어서 원문 요약과 재시도
   사실. 예: `배포 스크립트가 exit 1로 끝났습니다. repo-ops deploy: Claude readonly
   preauthorization probe failed · 자동 재시도 1회도 같은 오류`.
5. 조작 줄(슬롯 6): `tileResolveFields`가 정한 짝. 대화가 살아 있으면 그 자리에 대화
   세션 배지와 Discord 버튼이 선다.
6. 좌표 줄의 `병렬`·`직렬 n` 칩과 시간 줄(슬롯 7)은 지금 자리에 그대로다.

- 결정: 실패 타일은 상태 배지를 하나만 그린다. 대기 배지(`⛔ 확인 필요 · 조치 필요`)와
  머리줄의 `실패`·`중단됨` 낱말은 실패 타일에서 그리지 않는다 — 셋이 같은 사실이다.
  `중단됨`은 배지의 범주 낱말로 읽힌다.
- 결정: 배지의 `<단계>`는 실패가 난 착지 단계나 저장소 작업 종류의 사람 낱말이다.
  재료가 없으면 범주만 그린다(fail-quiet).
- 결정: 속성 칩과 `병렬` 칩은 카드에 그대로 둔다 — 2026-11-18 사용자 결정(다른 카드와
  칩 자리가 같아야 한다).
- 결정: 비활성 `Discord 준비 중` 버튼은 실패 타일 머리줄에 그리지 않는다. 스레드가
  생기면 Discord 버튼이 조작 줄에 선다. 준비 중이라는 사실은 상세의 `다음`에만 있다.
- 결정: 원인 문장의 재료가 하나도 없으면 줄을 그리지 않는다. 문장 사전에 없는 코드는
  원문 요약만 그린다.

### 4.2 상세 — 한 상자

배지를 누르면 상자 하나가 열린다. 실패 타일에서는 대기 판정 근거 팝업을 따로 열지
않고, 그 내용(해결 문장, 대기 시작, 범례)이 이 상자로 들어온다.

1. **경위**: 사건 단위 줄. 시간순(오래된 것이 위). 실패 줄은 항상 그리고, 그 앞은
   가까운 3개, 그 뒤는 최근 3개까지 그린다.
2. **다음**: 한 문단. 살아 있는 대화나 해결 문장이 있으면 그것이 첫 문장이다.
3. **세부**(기본 접힘): 실패 코드, 착지 단계, 실행(도구·모델·effort·비용), attempt
   id(복사), 로그 경로(복사), `▤ 세션 기록`, `범례 보기`, 그리고 재료가 있을 때만
   가드/원인·명령·재시도 이력.

- 결정: 경위의 한 줄은 한 사건이다. 한 번의 실패가 남긴 여러 기록(저장소 작업 실패,
  복구 분류, 착지 단계 실패, attempt 실패)은 가장 구체적인 한 줄로 합친다. 묶는 기준은
  같은 attempt의 연속한 실패 종단 기록이다.
- 결정: 경위 줄에는 내부 코드를 쓰지 않는다. 코드는 세부의 `실패 코드` 한 곳에만 있다.
- 결정: 사건 묶음과 시간순 표시는 실패 상세의 경위에만 적용한다. 같은 이력 블록을
  쓰는 확인 필요 타일은 줄 수·순서·로그 경로 자리를 그대로 둔다 — 그 타일은 범위 밖이다.
- 결정: 원인 문장과 배지의 재료(저장소 작업 종류, exit code, 오류 요약, 자동 재시도
  소진 여부)는 서버가 실패 투영에 싣는다. 클라이언트는 이력 줄을 해석해 만들지 않는다.
- 결정: `다음`은 그 카드에 실제로 서 있는 조작만 이름한다. 카드에 없는 버튼(Worker
  설정의 `[배포 실행]`)을 가리키지 않는다. 지금 `[세션에서 이어가기]`와
  `[↻ 정리 재시도]`가 함께 서면 둘의 차이를 한 문장씩 말한다.
- 결정: `원인`·`실패 시각`·`재개` 행은 없앤다 — 각각 카드의 원인 문장, 경위의 실패
  줄, 조작 버튼의 활성 상태가 이미 말한다.

### 4.3 실패 코드의 사람 말

- 결정: `실패 코드` 행은 사람 말을 먼저, 원시 코드를 뒤에 쓴다. 합성 코드는 조각마다
  낱말을 얻는다. 예: `착지 실패 › 스크립트가 0이 아닌 코드로 끝남` 다음 줄에
  `quickfix_landing_failed:script_failed`. 사전에 없는 조각은 원시 조각 그대로다.
- 결정: 서버가 이력 줄을 쓸 때 코드 대신 같은 사전의 낱말을 쓴다. 대상은 세션 실패,
  착지 실패, 저장소 작업 실패, 복구 분류 줄이다. 복구 분류는 처분을 사람 말로
  쓴다(예: `복구 판정 — 세션에서 고쳐야 함`). 이미 기록된 줄은 다시 쓰지 않고 그대로
  그린다.
- 결정: 이력 이벤트는 사람 말 `summary`와 함께 원시 코드를 별도 필드로 싣는다. 세부의
  `실패 코드` 행이 그 필드와 attempt의 cause를 그린다 — 복구 분류의 원시 값도
  디버깅용으로 남는다.
- 결정: 낱말과 문장의 정본은 지금처럼 `app/utils/failure-sentences.js` 하나다. 서버와
  클라이언트가 같은 파일을 읽는다.
- 결정: `script_failed`에 원인 문장을 더하고, `repair` 처분의 고정 해결 문장에서
  "검증 실패"를 실패 종류를 가리지 않는 말로 바꾼다.

### 4.4 카드 문법 스펙 갱신

`2026-08-25-card-header-grammar-unify-design.md` §5.1에 정정 문단을 더한다: 실패
타일의 슬롯 1 상태 배지는 하나이며 대기 배지와 `실패` 낱말을 대신한다, 실패 타일의
슬롯 3은 원인 한 문장이다, 실패 상세가 대기 판정 근거 팝업의 내용을 싣는다.

이 스펙이 실패 타일에 한해 뒤집는 기존 조항은 다음과 같고, 같은 정정 문단이 이들을
이름한다.

- `2026-08-27-failed-tile-decision-surface-design.md`(UI-rj02) §3.2 "닫힌 실패 타일은
  1·2번 줄만 그린다"와 `실패`·`중단됨` 라벨 유지 — 슬롯 3 원인 문장을 더하고 라벨을
  뺀다. §3.3의 "열기/펼치기 상태는 없다"와 재료 표 — 세부를 접는 상태를 하나 두고
  `원인`·`실패 시각`·`재개` 행을 뺀다.
- `2026-08-28-worker-record-timeline-retention-design.md`(UI-8wpb) §9 "최근 타임라인
  5줄과 마지막 로그 경로" — 실패 상세에서는 사건 묶음 경위로 바꾸고 로그 경로를
  세부로 옮긴다.
- `2026-09-16-wait-surface-density-vocabulary-design.md`(UI-8gem) §6.2의 실패 배지와
  대기 배지 병기 — 실패 타일은 실패 배지만 그린다.
- `2026-10-11-action-required-resolvable-by-button-design.md` §3.5(UI-vviq)의 비활성
  `Discord 준비 중` — 실패 타일 머리줄에서 뺀다.

## 5. 비목표

- 실패가 아닌 타일(확인 필요, 일시정지, 공급자 보류, 외부 대기)의 배치 — 대기 팝업은
  그 타일들에서 지금과 같다.
- 레인 위 실행 설정 칩(오케·워커·구현 리뷰·qf) — 2026-11-18 사용자 결정으로 범위 밖.
- 실패 뒤 해결 세션의 자동 시작, 여는 자리, Worker 인계 — UI-1fss.
- PR 대기 행, 저장소 작업 타임라인의 문구.

## 6. 테스트 범위

- 실패 타일이 상태 배지를 정확히 하나 그리고 대기 배지·`실패` 낱말을 그리지 않는다.
- 원인 문장: 문장 사전에 있는 코드, 없는 코드, 재료가 없는 경우.
- 경위: 한 실패의 네 기록이 한 줄이 된다. 서로 다른 attempt의 실패는 합쳐지지 않는다.
  새로 기록된 줄에 원시 코드가 없다. 실패 뒤 사건이 다섯을 넘어도 실패 줄이 남는다.
- 확인 필요 타일의 이력 블록은 줄 수·순서가 그대로다.
- 실패 투영이 저장소 작업 종류·exit code·요약·재시도 소진을 싣고, 기록이 없으면 키를
  싣지 않는다.
- `다음`이 카드에 없는 조작을 이름하지 않는다(재개 가능·불가, 대화 있음·없음).
- 실패 코드 행: 합성 코드, 미지 조각.
- 서버 이력 줄 네 종류가 사전 낱말로 기록된다.
- 카드 동일성 테스트(`card-parity.test.js`)가 실패 타일에서 통과한다.
- 390px 폭 넘침 탐침과 `styles.design-system.test.js`.
- 구현 뒤 390px 스크린샷으로 접힌 카드와 연 상세를 눈으로 확인한다.

## 7. 수용 기준

1. `dotfiles-jtuda`와 같은 실패를 접힌 카드로 볼 때 상태 낱말이 한 번만 나오고, 실패한
   것(배포 스크립트)과 그 오류 요약이 카드에 보인다.
2. 배지를 누르면 상자 하나만 열리고, 경위에서 한 번의 실패가 한 줄이다.
3. 이 변경 뒤 기록된 실패에서, 접힌 카드와 경위에
   `quickfix_landing_failed`·`script_failed`·`repair:repair` 같은 원시 코드가 보이지
   않는다. 세부에는 원시 코드가 그대로 있다. 그 전에 기록된 이력 줄은 옛 문구로 남는다.
4. `다음`이 이름하는 조작이 모두 그 카드에 있다.
5. Worker 탭과 모니터에서 같은 Bead의 실패 카드가 같다.

## 결정 (ADR 후보)

- 전제: ADR UI-gmww — 슬롯 표에 없는 요소는 스펙을 먼저 갱신한다는 조항을 따라 §4.4로
  슬롯 표를 먼저 고친다. 실패 타일 슬롯 1의 `↻ 정리 재시도`·`↻ 이어하기`는 그대로 둔다.
- 실패 타일은 해결 문장을 대기 판정 근거 팝업이 아니라 실패 상세의 `다음` 첫 문장에
  그린다. 되돌리기 어려움: UI-gmww가 해결 문장의 자리를 대기 팝업 첫 줄로 정했고
  Worker 탭·모니터·카드 문법 스펙·동일성 테스트가 그 자리를 함께 읽는다. 대안: 실패
  타일에도 대기 배지와 팝업을 남긴다(같은 상태가 두 배지로 남는다). 맥락 없이는 왜
  실패 타일만 팝업이 없는지 알 수 없다. `summary`: "실패 타일은 상태 배지 하나와 상세
  상자 하나만 갖고 해결 문장을 그 상세의 다음 첫 문장에 그린다 — 나머지 조항은
  UI-gmww 그대로다" → ADR, supersede UI-gmww
- 경위를 사건 단위로 묶고 시간순으로 그린다 — 표시 규칙이라 한 파일에서 되돌릴 수
  있다 → ADR 아님
- 서버 이력 줄을 사전 낱말로 쓴다 — 문구 변경이고 이미 기록된 줄은 그대로다 → ADR 아님
- 속성 칩과 `병렬` 칩을 카드에 둔다 — 현행 유지 → ADR 아님
- 실패 타일 머리줄의 비활성 `Discord 준비 중`을 뺀다 — 표시 규칙 → ADR 아님

## 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |

- 관찰: 실패 흐름(자동 해결 세션, hub, Worker 인계)은 같은 요청에서 나온 독립 작업
  UI-1fss다 — 이 스펙의 형제가 아니라 별도 설계라 표에 넣지 않는다.
