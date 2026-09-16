---
scope:
  - server/worker/wait-judgment.js
  - server/worker/wait-judgment.test.js
  - app/protocol.js
  - app/views/worker/wait-vocabulary.js
  - app/views/worker/wait-vocabulary.test.js
  - app/views/worker/lane-model.js
  - app/views/worker/lane-model.test.js
  - app/views/worker/lanes.js
  - app/views/worker/lanes.test.js
  - app/views/worker/index.js
  - app/views/monitor/index.js
  - app/views/monitor/index.test.js
  - app/views/help-dialog/
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
  - docs/superpowers/specs/2026-09-16-wait-surface-density-vocabulary-design.md
  - docs/adr/
---

# 자동 진행이 꺼진 저장소의 대기 카드는 조용하다 — `⏸ 수동 출발` 칩·`[지금 시작]`·유예 칩·요약 큐 줄 제거

## 문서 상태

- Bead: `UI-3pu9`
- 경로: `spec_backed`. beads-ui 안에서 구현·검증·인도를 한 묶음으로 처리한다.
- 기준: `main` / `3950034c365aac94533a163944125f00fa8ddefd`
- 상태: 사용자 검토용 완성 초안. 스펙 게이트 승인 전이다.
- 사용자 결정(2026-09-16):
  1. 제거 범위는 자동 진행 꺼짐(`auto_advance=false`)으로 생긴 표시만이다.
     공급자 보류·큐 정지 게이트에 막힌 행의 `[지금 시작]`은 유지한다.
  2. 자동 진행이 꺼진 저장소에서는 어떤 대기 행에도 `[지금 시작]`을 두지 않는다.
     선두 행에만 남기는 안은 기각했다. 한 건을 출발시키는 경로가 없어지는 비용을
     감수한다.
  3. 자동 진행이 꺼진 저장소의 대기 진입 유예 칩(`⏳ N초`)과 유예 때문에 서는
     `[지금 시작]`도 그리지 않는다.
  4. 상단 `막힘` 요약 팝오버의 `큐: … 수동 출발 N` 항목을 없앤다. 자동 진행 꺼짐은
     레포 카드의 자동화 토글(▷) 상태만 말한다.

## 1. 문제와 확인한 사실

2026-09-16 모바일 스크린샷(Monitor 병렬 영역)에서는 자동 진행이 꺼진 저장소의 대기
카드마다 `⏸ 수동 출발` 칩과 `[지금 시작]` 버튼이 반복된다. 이 사실은 저장소 단위이고,
레포 카드의 자동화 토글(`app/views/monitor/deck.js`, title `자동화 꺼짐 — 다음 행은
수동으로만 출발합니다`)과 Worker 툴바의 `▶ 자동화`가 이미 보여 준다.

확인한 경로(기준 커밋):

- 서버 `server/worker/wait-judgment.js`는 `queue.auto_advance === false`이고 실행
  중인 attempt가 없을 때, 다른 사유가 없는 병렬 항목과 직렬 선두마다
  `auto_advance_off` 사유를 낸다. 각 사유에는 `start_now` 조작이 붙는다. 서버에서
  `start_now` 조작을 내는 곳은 이 한 곳뿐이다.
- `app/views/worker/lane-model.js`는 그 사유가 붙은 큐 행에 게이트가 없으면
  `autoAdvanceOffGate()`(`⏸ 수동 출발`)를 `item.gate`에 넣는다.
- `app/views/worker/lanes.js` `startNowButtonTemplate`은 세 경우에 버튼을 그린다:
  유예 중일 때, 게이트가 있을 때, 서버 `start_now` 조작이 있을 때
  (`waitReasonLines`, `requested=true`). 자동 진행 꺼짐은 뒤의 두 경로로 버튼을
  세운다.
- `graceChipTemplate(item.added_at)`은 저장소의 자동 진행 여부를 보지 않는다.
  자동 진행이 꺼져 있으면 스케줄러가 자동 출발 자체를 하지 않으므로,
  `대기에 막 들어온 항목입니다 — 남은 시간 동안 자동 실행이 미뤄집니다`라는 안내는
  사실과 다르다.
- `blockedSummary`는 `queue` 범위 사유를 `정지 a`·`수동 출발 c`로 나눠
  팝오버 마지막 줄에 싣는다.
- 도움말 범례(`app/views/help-dialog/index.js`)는 `WAIT_KINDS`의 `scope=queue` 행을
  `게이트 칩` 절에 그린다. `auto_advance_off` 행이 그 절에 있다.
- Monitor와 Worker는 같은 `buildLanes`·`miniRow`를 쓰므로 한 번 고치면 두 탭에
  함께 반영된다.
- 이 사유를 읽는 외부 소비자(dotfiles)는 없다(`grep auto_advance_off` 결과 0건).

`[지금 시작]`(`worker-queue-start-now`)은 공급자 보류·큐 정지 게이트에 막힌 행과
자동 진행이 켜진 저장소의 유예 행에서 계속 쓰인다. 이 op와 스케줄러의
`start_now_requests`는 바꾸지 않는다.

## 2. 검토한 접근과 선택

- **선택 — 서버가 사유를 내지 않고 클라이언트가 흔적을 걷는다.** 결정 1~4를
  적용하면 `auto_advance_off` 사유를 소비하는 화면이 하나도 남지 않는다. 읽는 곳이
  없는 사유를 스냅샷에 계속 싣는 것은 죽은 데이터다. 서버 발행을 멈추고 클라이언트의
  게이트·어휘·집계·범례 분기를 함께 지운다.
- 기각 — 서버는 그대로 두고 클라이언트만 무시: 스냅샷에 소비자 없는 사유가 남고,
  `start_now` 조작 필터를 따로 둬야 한다. 스냅샷 크기 문제가 이미 관측된 바 있다
  (monitor-pipeline 푸시 폭주).
- 기각 — 선두 행에만 `[지금 시작]` 유지: 사용자 결정 2.

## 3. 서버 (`server/worker/wait-judgment.js`)

- `auto_advance_off` 사유를 만드는 블록(`queue.auto_advance === false` 분기)을
  지운다. `WaitKind` typedef에서도 `'auto_advance_off'`를 뺀다.
- 다른 사유의 대상 판정, verdict, 알림, 중복 억제 키는 바꾸지 않는다. 이 사유는
  verdict가 항상 `normal`이라 알림 경로에 들어간 적이 없다.

## 4. 클라이언트

### 4.1 모델 (`app/views/worker/lane-model.js`)

- `autoAdvanceOffGate()`와 그것을 넣는 분기를 지운다. `LaneGate.kind` 합집합에서
  `'auto_advance_off'`를 뺀다.
- 대기 행(`lane === 'queue'` 또는 `s1`~`s5`)에 `manual_only: boolean`을 더한다.
  그 행 저장소의 워크스페이스 상태 `auto_advance`가 **정확히 `false`**일 때만
  `true`다. 값이 없거나 읽지 못하면 `false`로 두어 지금처럼 그린다(fail-quiet).
  값은 `buildLanes`가 이미 읽는 워크스페이스 상태(`group_sources`)에서 root_dir별로
  가져온다.

### 4.2 렌더 (`app/views/worker/lanes.js`)

- `graceChipTemplate`은 행을 받아 `manual_only === true`이면 `''`를 반환한다.
  호출부(`miniRow` 슬롯 4a)는 `item.added_at` 대신 행을 넘긴다.
- `startNowButtonTemplate`의 유예 조건은 `manual_only !== true`일 때만 성립한다.
  게이트 조건(`!!item.gate`)은 그대로다. 공급자 보류·큐 정지 게이트가 선 행은 자동
  진행이 꺼진 저장소에서도 버튼을 유지한다(결정 1).
- `requested` 매개변수와 `waitReasonLines`의 `action.op === 'start_now'` 분기,
  `queueRowOps`의 `offered.has('start_now')` 분기는 발행처가 없어지므로 지운다.
- `blockedSummary`의 `manual_start_subjects`와 `수동 출발 N` 항목을 지운다. `queue_line`은
  `정지 a`만 남고, 비면 팝오버에 줄이 서지 않는다.

### 4.3 유예 타이머 (`app/views/worker/index.js`, `app/views/monitor/index.js`)

- Worker의 `syncGraceTimer`가 1초 타이머를 켜는 조건을 "유예가 남았고
  `manual_only !== true`인 행이 있음"으로 좁힌다. 그리지 않는 칩 때문에 타이머가
  돌지 않게 한다. Monitor의 `tick_timer`는 다른 표시도 쓰므로 그대로 둔다.

### 4.4 어휘·범례 (`wait-vocabulary.js`, `help-dialog/`)

- `WAIT_KINDS`에서 `auto_advance_off` 행을 지우고, `QUEUE_KINDS`는
  `queue_hold`만 남긴다.
- 요약 칩 `blocked`의 설명에서 큐 사유 목록을 `queue_hold`로 줄인다.
- 범례는 표를 읽어 그리므로 `게이트 칩` 절에서 `⏸ 수동 출발`이 자연히 사라진다.
  범례에 문구를 따로 복사하지 않는다.

### 4.5 바뀌지 않는 것

- `worker-queue-start-now` op, 스케줄러의 `start_now_requests`와 실행 직전 우회
  판정, 직렬 선두 제한(`serial_lane_not_head`).
- 공급자 보류·큐 정지 게이트 칩, 그 행의 `▶ 재개`·`↻ 지금 프로브`·`[지금 시작]`.
- 자동 진행이 켜진 저장소의 유예 칩과 유예 `[지금 시작]`.
- 레포 카드·Worker 툴바의 자동화 토글과 그 title.

## 5. 정본 반영

- `2026-08-25-card-header-grammar-unify-design.md` §5.1 끝의 정정 문단 뒤에
  **정정(UI-3pu9)** 문단을 더한다. 슬롯 4a 게이트 칩에서 `⏸ 수동 출발`을 빼고,
  자동 진행이 꺼진 저장소의 대기 행에는 유예 칩(4a)과 유예·자동 꺼짐으로 서는
  `[지금 시작]`(1 조작)을 그리지 않는다는 내용이다. 슬롯은 새로 만들지 않고 빼기만
  한다(ADR 0014).
- `2026-09-16-wait-surface-density-vocabulary-design.md`는 게시된 이력이라 본문을
  고치지 않는다. §7.2·§8 `수동 출발`·§10.2는 이 스펙과 대체 ADR이 대신한다.
- ADR은 Finish에서 `adr` 스킬로 만든다(아래 결정 절).

## 6. 테스트 범위와 인도 조건

- `server/worker/wait-judgment.test.js`: `auto_advance=false`이고 실행이 없는 큐에서
  어떤 항목에도 `auto_advance_off` 사유가 나지 않는다. `auto_advance_off targets`
  describe와 그 기대 행은 이 기대로 바꾼다. 같은 조건에서 `queue_hold`·
  `provider_hold`·`prerequisite` 사유는 전과 같다.
- `app/views/worker/lane-model.test.js`: 자동 진행이 꺼진 저장소의 대기 행은
  `gate`가 없고 `manual_only === true`다. 켜진 저장소와 값이 없는 저장소는
  `manual_only === false`다. 큐 정지 게이트는 자동 진행이 꺼져도 그대로 선다.
- `app/views/worker/lanes.test.js`:
  - `manual_only` 행은 유예 시간이 남아도 `⏳` 칩과 `[지금 시작]`이 없다.
  - `manual_only` 행이라도 공급자 보류 게이트가 있으면 `[지금 시작]`이 선다.
  - 자동 진행이 켜진 유예 행은 전처럼 둘 다 선다.
  - `blockedSummary`에는 `수동 출발` 항목이 없다.
  - 기존 `auto_advance_off` 게이트 기대와 `start_now` 조작 기대는 지운다.
- `app/views/worker/wait-vocabulary.test.js`, `app/views/help-dialog/index.test.js`:
  어휘 표와 범례에 `auto_advance_off`와 `⏸ 수동 출발`이 없다. `QUEUE_KINDS`에
  해당하는 범위 판정이 `queue_hold`만 `queue`로 본다.
- `app/views/monitor/index.test.js`: Monitor 대기 행이 자동 진행이 꺼진 저장소에서
  `⏸ 수동 출발`·`[지금 시작]`을 그리지 않는다.
- 저장소 전체: `rg -n "auto_advance_off|수동 출발" app server`는 0건이다. ADR과 스펙
  이력은 검색 범위에서 뺀다.
- Pre-Handoff Validation 묶음(`npm run tsc`, `npm run lint`, prettier, vitest)이
  통과하고, 배포 뒤 공유 서버 Monitor에서 자동 진행이 꺼진 저장소의 대기 카드에
  칩·버튼이 없는 390px 캡처를 남긴다(iframe 래퍼).

## 결정 (ADR 후보)

- 전제: ADR 0014 — 슬롯 표에서 칩·조작을 빼는 변경은 카드 문법 스펙 정정으로
  기록한다.
- 전제: ADR 0011 — 자동 진행과 자동 머지는 별개의 스위치이고, 이 스펙은 자동 진행의
  표시만 바꾼다.
- 자동 진행 꺼짐은 대기 카드·요약에 표시하지 않고 저장소 자동화 토글만 말한다. 서버는
  `auto_advance_off` 사유를 내지 않으며, 자동 진행이 꺼진 저장소의 대기 행에는
  유예 칩과 유예·자동 꺼짐으로 서는 `[지금 시작]`이 없다. 세 조건 판단은 다음과 같다.
  되돌림 비용이 있다(서버 사유 종류·어휘 표·범례·집계·두 탭 렌더와 테스트). 배경
  없이 보면 의외다(자동 진행이 꺼진 저장소에서 한 건만 출발시키는 UI 경로가 없고,
  코드만 보면 왜 게이트 칩 목록에 자동 꺼짐이 없는지 드러나지 않는다). 실재 대안이
  있다(선두 행에만 버튼 유지, 칩만 제거, 서버 사유 유지). `summary`: "자동 진행
  꺼짐은 대기 카드·요약에 표시하지 않고 저장소 자동화 토글만 말한다 — 서버는
  auto_advance_off 사유를 내지 않고, 자동 진행이 꺼진 저장소의 대기 행에는 유예
  칩과 [지금 시작]이 없다" → ADR, supersede UI-8gem·UI-cmx3·UI-cmx3-2

대체 ADR에는 세 ADR에서 살아 있는 조항을 전부 다시 적는다. UI-8gem에서는 슬롯 1
배지 하나와 대표 사유 규칙, `queue_hold`·큐 행 공급자 게이트가 4a 게이트 칩으로만
선다는 조항, `막힘 N` 집계 규칙(큐 사유는 `queue_hold`만)을 옮긴다.

UI-cmx3에서는 직렬 선두만 후보라는 조항, `serialHeadOf` 두 검사, `[지금 시작]`이
지정한 이슈 하나의 실행 권한이고 선두가 아닌 직렬 항목은 `serial_lane_not_head`라는
조항, UI-wc67·UI-lmqu 승계 조항을 옮긴다. 뒤집히는 부분은 "`auto_advance_off`
사유와 `[지금 시작]` 버튼은 병렬 항목과 직렬 선두에만 선다" 한 문장뿐이다. 자동
진행이 켜진 저장소에서 유예·게이트로 서는 `[지금 시작]`이 직렬 선두가 아닌 행에
서지 않는다는 규칙은 유지한다.

UI-cmx3-2에서는 선행 대기 attempt를 대기 행이 대표한다는 조항과 시각 참고 줄
조항을 옮긴다. 뒤집히는 부분은 "큐 단위 사정(`auto_advance` 꺼짐)의 표시는 막힌
행의 4a 게이트 칩" 한 문장과 Consequences에 나열된 `⏸ 수동 출발`이다.

## 경계·후속

다른 저장소에서 할 필수 작업과 형제 Bead는 없다. dotfiles 계약(대기 사유 어휘를
정의하지 않음), 스케줄러의 자동 진행·유예·`start_now` 판정, 레포 카드 자동화
토글은 바꾸지 않는다. 모니터 설정 일괄 적용 위치 변경(`UI-nu43`)은 이 스펙과
표면이 겹치지 않는 별개 설계다.
