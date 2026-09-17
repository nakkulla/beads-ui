---
scope:
  - server/worker/wait-judgment.js
  - app/protocol.js
  - app/views/worker/wait-vocabulary.js
  - app/views/worker/lanes.js
  - app/views/worker/running-grid.js
  - app/views/worker/lane-model.js
  - app/views/worker/gate-labels.js
  - app/views/worker/queue-blockers.js
  - app/views/worker/index.js
  - app/views/monitor/deck.js
  - app/views/monitor/index.js
  - app/views/help-dialog/
  - app/utils/relative-time.js
  - app/data/closed-range.js
  - app/index.html
  - app/main.js
  - app/styles.css
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
  - docs/superpowers/specs/2026-08-28-chip-grammar-unify-design.md
---

# 대기 카드·요약 칩의 정보 밀도 정리와 대기 어휘 통일 — 카드당 상태 배지 하나, 큐 단위 사유 분리, 외부 작업 행 단일 문장, 도움말 범례 (UI-8gem)

## 1. 문제 (2026-09-16 관측, origin/main `e1c9138`)

UI-n99w(`2026-09-15-wait-reason-unify-blocked-summary-design.md`, PR #296)가 서버 판정
`wait_reasons`를 두 탭에 실은 뒤 배포 화면(Monitor 1280px·390px 캡처)을 보면 다음이
겹쳐 있다.

- **카드 하나에 상태 토큰이 3~4개.** 선행 대기 타일(`runningTile`)은 held 배지
  (`🔓 복귀 대기`) 뒤에 `wait_reasons` **사유마다** 판정 배지를 하나씩 붙이고
  (`running-grid.js` 1433 `${held_badge}${wait_lines.map((line) => line.badge)}`),
  오른쪽 조작 영역에 경과 라벨 `선행 대기`(1214)까지 그린다. Analysis-c312 행은
  `⛓ 선행 대기` · `⏳ 정상 대기` · `⏳ 정상 대기` · `선행 대기` 네 토큰이다. 두 번째
  `⏳ 정상 대기`는 `auto_advance_off` 사유의 정상 판정이다.
- **워크스페이스 사실이 카드마다 반복.** `wait-judgment.js` 720–738은
  `auto_advance=false`이고 실행이 없으면 **대기 항목마다** `auto_advance_off` 사유
  (`자동 진행 꺼짐 · 대기 3건 출발 안 함` / `[지금 시작] 또는 자동화 켜기`)를 내고,
  렌더는 그 두 줄과 판정 배지를 항목마다 그린다. microbiome_bile 대기 타일 3장과
  다른 저장소의 큐 행(rokit-o48·Hippo-7z9·rokit-7ad·PROSTATE-u53·thalamus-fty)에
  같은 두 줄이 실린다. 툴바의 `▶ 자동화`·Monitor 타일의 스위치가 이미 같은 사실을
  말한다.
- **사유마다 문장 두 줄.** `waitReasonLines`(`lanes.js` 1959)는 사유마다
  `headline`·`release` 두 줄을 그린다. 선행 대기 headline은 선행별 문장을 `·`로
  이어 붙이고(`wait-judgment.js` 452–455: `Analysis-ph3a "외부 작업 246416 관측"
  선행 해제 · 자동 복귀를 기다림 · Analysis-5dbb "…" …`), release는 정적 문장
  (`선행이 닫히면 bd ready 재스캔으로 자동 복귀`)이다. 4b의 `🔓 Analysis-ph3a` 칩이
  이미 ID를 말하므로 문장이 칩과 중복된다. 타일 한 장이 14줄이다.
- **외부 작업 행은 상태 어휘가 셋.** `externalWaitRow`(`lanes.js` 2847)는 판정
  (`⛔ 조치 필요 · 자동 확인이 연속 3회 이상 실패함`), 작업 상태
  (`종료 확인 · 결과 검증 필요`), 감시 상태(`감시 확인 필요 · 원격 작업 확인 시간
  초과`)를 각각 세우고, 그 아래 release `15분마다 자동 확인 · 종료 확인되면 대기
  자동 해제`가 조치 필요 판정과 모순되게 읽힌다. `⛓ ops-4v9` 칩은 행 자신(gate)을
  가리키고, `원래 이슈 ops-a4z · <제목>` 줄과 `ops · 작업 803565 · hamilton` 칩 줄이
  따로 선다. `다음 2026-09-16 11:55`는 관측기의 다음 예정 확인 시각
  (`next_observation_at`)인데 라벨이 그 뜻을 말하지 않는다.
- **요약 칩이 좁은 폭에서 잘린다.** Worker 탭 KPI 줄은 모바일 리본에서
  `flex-wrap: nowrap`(`styles.css` 8417)이라 390px에서 `실행 0 · PR 대…`로 잘리고,
  Monitor 합계 줄 `.mon2-deck__total-counts`는 `white-space: nowrap`(6905) 한 덩어리다.
  `막힘 10 · 조치 필요 1`의 10은 `auto_advance_off` 대상까지 센 수라 대기 전부가
  막힘으로 읽힌다(`blockedSummary`는 사유 종류를 가리지 않고 subject를 센다).
- **"대기"가 아홉 가지 뜻이다.** 복귀 대기·선행 대기(held 종류), 정상 대기(판정),
  실행 대기(외부 작업 상태), 반영 대기·세션 대기·재시도 대기·한도 대기(held 종류),
  대기 조건(감시 정보 없는 gate)이 세 축에 걸쳐 같은 낱말을 쓴다.
- 시각 줄 `마지막 확인 2026-09-16 08:43`은 `formatTimestampLocal`의 전체 날짜
  형식이고 타일 안에서 본문 크기로 그려진다.

## 2. 사용자 결정 (2026-09-16)

1. **카드당 상태 배지 하나.** held 종류와 판정을 한 배지에 합친다. 판정 근거·임계는
   배지 클릭 팝업이다.
2. **본문은 headline 한 줄만.** 해제 조건·안내문·정적 설명은 팝업과 범례로 옮긴다.
3. **범례는 도움말 버튼.** 칩·배지의 뜻과 등장 조건은 앱 상단 도움말 버튼이 여는
   범례 다이얼로그에 둔다("그냥 도움말 버튼에 넣어놓는게 어때?").

세션이 정한 것(사용자 확인 없이 진행, 이 스펙이 근거): 큐 단위 사유(자동 진행
꺼짐·큐 정지·큐 행의 공급자 게이트)는 기존 4a 게이트 칩 하나로만 서고 막힘
집계에서 빠지며, 보류된 attempt의 공급자 보류는 그 이슈의 사정이라 배지·집계에
남는다(§7); 외부 작업 행은 상태 하나·문장 하나이고 원래 이슈는 `→ <ID>` 칩이다
(§7.3); 요약 칩은 줄바꿈되는 칩 묶음과 모바일 짧은 라벨이다(§8); 시각은 슬롯 7
짧은 형식이다(§9).

## 3. 검증된 전제

- 판정은 서버 순수 모듈 `server/worker/wait-judgment.js`가 낸다(UI-n99w §6.1).
  `WaitReason`은 `kind`·`subject`·`headline`·`release`·`since`·`next_check_at`·
  `resets_at`·`verdict`·`verdict_reason {code, message}`·`targets`·`actions`·
  `notify_plan`을 가진다(`app/protocol.js` 119). 임계는 `WAIT_THRESHOLDS`
  (15분 주기·1주기·2주기·오류 3회·복귀 10분·유예 5분·리셋 미상 6시간).
- Worker 스냅샷은 `external_waits`·`wait_reasons`를 싣고
  (`server/ws/worker-handlers.js` 3400) Worker 탭 `waitBody`는 자기 워크스페이스의
  외부 작업 묶음을 그린다(`worker/index.js` 4032·4192). ops-4v9 행이 Worker 탭에
  보이지 않았던 것은 그 세션이 microbiome_bile을 보고 있었기 때문이다 — Monitor는
  전 저장소를 합친다. 탭 배치는 바꾸지 않는다.
- `lane-model.js` 4355–4385는 `wait_reasons`를 subject(원래 이슈)별로 큐·후보·실행·
  PR 대기 항목에 붙이고, `external_wait` 행은 자기 gate의 `external_job` 사유를
  `reason`으로 가진다(2660–2680). 그래서 원래 이슈 카드에도 `external_job` 사유가
  붙어 배지를 하나 더 만든다.
- 큐 단위 게이트 칩은 이미 있다: `LaneGate {kind, label, title, since, runner,
  probe_ready}`를 `gateChipTemplate`(`lanes.js` 1769)이 4a 줄 맨 앞에 그리고 클릭은
  사유 팝업이다(UI-01wh §3.2). 종류는 `systemic`(`⛔ 정지 · <사유>`)·`env`
  (`↻ 환경 보류`)·`provider_usage`(`⏳ 한도 대기`)·`provider_outage`(`⚠️ 공급자 장애`).
  큐 행의 공급자 게이트는 서버 `wait_reasons`가 아니라 클라이언트 `providerGate`
  (`lane-model.js` 1359)가 `queue.provider_hold`에서 만들며, `outage`는 러너 전체에,
  `usage_limit`는 target에 계정이 있으면 **그 계정을 쓰는 행에만** 건다. 서버의
  `provider_hold` WaitReason은 `attempt.status === 'provider_hold'`인 **보류된
  attempt**에만 난다(`wait-judgment.js` 605–613) — 즉 `kind=provider_hold`는 언제나
  이슈(attempt) 단위 사유다. held 타일의 공급자 보류 배지는
  `providerHoldBadgeText`(`gate-labels.js` 38)가 만든다.
- ADR UI-a8rq가 승계한 "상단 배너는 없고 정지·보류의 사실은 막힌 카드에 산다"
  (ADR 0049 계보)는 유효하다. 이 설계는 배너를 만들지 않는다.
- 카드 슬롯 표는 `2026-08-25-card-header-grammar-unify-design.md` §5.1이 소유하고
  새 라벨·칩·버튼은 그 표를 먼저 갱신한다(ADR 0014). 칩 글리프 표는
  `2026-08-28-chip-grammar-unify-design.md` §3이고 `→ <ID>`는 "내가 막는 후속(내가
  먼저 가야 풀리는 이슈)"이다. 판정 칩 클릭은 `chipPopoverTemplate`
  (`app/views/chip-popover.js`)의 카드 안 팝업이다(칩 문법 §4.5).
- 상단 nav의 다이얼로그 버튼은 `#display-settings-btn`(`⚙`, 통합 설정
  `<dialog>` — `app/views/settings-dialog/index.js`, `app/main.js` 1693)과
  `#new-issue-btn`(새 이슈 다이얼로그) 둘이다. 도움말·범례 표면은 없다.
- 요약 줄: Worker는 `.worker-kpi__chip` 세 개 + `blockedSummaryTemplate`
  (`worker/index.js` 3620–3640), Monitor는 `totalTemplate`(`monitor/deck.js` 694)의
  nowrap span + 같은 `blockedSummaryTemplate` + 토큰·비용 칩 `.mon2-deck__tok`.
- 이 설계는 UI-n99w의 판정 임계·알림·`[지금 확인]` op·관측기 계약을 바꾸지 않는다.
  바꾸는 것은 headline 조립 규칙과 `auto_advance_off`의 대상 집합(§10)뿐이다.

## 4. 설계 원칙

- **카드 하나, 상태 하나.** 슬롯 1의 대기 상태 배지는 카드당 하나이고 종류 라벨과
  판정 글리프를 함께 말한다.
- **큐의 사실은 큐의 칩에.** 이슈가 아니라 큐·러너의 사정(자동 진행 꺼짐·큐 정지·
  큐 행의 공급자 게이트)은 4a 게이트 칩 하나로만 서고 배지·문장·막힘 집계를 만들지
  않는다. 보류된 attempt의 공급자 보류는 그 이슈의 사정이므로 이 원칙 밖이다.
- **정적 지식은 카드 밖.** "선행이 닫히면 자동 복귀"처럼 화면마다 같은 문장은
  범례와 팝업이 말하고 카드는 지금 이 카드에만 참인 한 줄만 말한다.
- **어휘는 한 곳.** 배지·게이트 칩·요약 칩·범례·툴팁이 `wait-vocabulary.js` 표
  하나에서 나온다. 판정은 서버, 표현은 이 표.
- **fail-quiet 유지.** 재료가 없는 요소는 그리지 않고, 없는 사실을 정상으로 추정하지
  않는다(UI-7341·UI-n99w의 규칙 그대로).

## 5. 대기 어휘 표 (`app/views/worker/wait-vocabulary.js`, 신설)

한 모듈이 다음을 export한다. 배지·칩·범례·툴팁·요약 칩은 이 표만 읽는다.

### 5.1 판정 글리프 (세 개뿐)

| verdict | 글리프 | 뜻 | 배지 형태 |
| --- | --- | --- | --- |
| `normal` | 종류 글리프 그대로 | 지연·조치 판정이 없다 — 예상 범위 안에서 기다리는 중 | `<종류 글리프> <라벨>` |
| `overdue` | `⚠` | 예상 시각·주기를 넘겼다 · 사람이 봐야 할 수 있다 | `⚠ <라벨> · 지연[ <n>분]` |
| `action_required` | `⛔` | 스스로 풀리지 않는다 · 사람의 조치가 필요하다 | `⛔ <라벨> · 조치 필요` |

판정과 해제 방법은 다른 축이다: `normal`은 "판정에 걸린 것이 없다"는 뜻이지 "스스로
풀린다"는 뜻이 아니다 — 무엇이 풀어 주는지는 종류 표의 "풀리는 조건" 열이 말하며,
`base_moved`처럼 사람의 `↻ 이어하기`로만 풀리는 정상 대기도 있다. 서버 판정
(`wait_reasons`)이 없는 held 카드는 `normal`로 추정하지 않는다: 종류 글리프와 라벨만
그리고 판정 문구·판정 근거를 붙이지 않는다(§4 fail-quiet, §6.2).
`정상 대기`라는 문구는 폐기한다. `⚠`는 U+26A0 하나로 통일한다(`⚠️` VS16 없음).
`<n>분`은 `since`가 있을 때만 붙이며 클라이언트가 `now - since`로 계산한다.

### 5.2 종류 표

`scope`는 `bead`(이 이슈의 사정 — 슬롯 1 배지)와 `queue`(큐·러너의 사정 — 4a
게이트 칩)로 나뉘고 `kind`가 정한다: 서버 WaitReason 가운데 `queue_hold`·
`auto_advance_off`만 `queue`이고 `provider_hold`를 포함한 나머지는 전부 `bead`다
(`provider_hold` WaitReason은 보류된 attempt에만 나므로, §3). 큐 행의 공급자 게이트는
WaitReason이 아니라 클라이언트 `LaneGate`이며 표에서는 `gate-*` 행으로 따로 둔다.
표의 각 행은 고유한 `id`를 가진다(아래 목록). 라벨은 기존 문구를 유지하고 새 것만
더한다.

| kind (조건) | scope | 글리프 | 라벨 | 언제 뜨나 | 풀리는 조건(범례·팝업 문장) | 조작 |
| --- | --- | --- | --- | --- | --- | --- |
| `prerequisite` (열린 선행 있음) | bead | `⛓` | `선행 대기` | 선행 이슈가 열려 있어 착수하지 못함 | 선행이 닫히면 bd ready 재스캔으로 자동 복귀 | — |
| `prerequisite` (`targets` 전부 해제, returning) | bead | `🔓` | `복귀 대기` | 막던 선행이 남지 않아 다음 pass의 후보 복귀를 기다림 | 다음 재스캔에서 후보로 돌아감 · 10분 넘으면 지연 | — |
| `prerequisite_foreign` | bead | `⛓` | `선행 대기` | 다른 저장소의 선행이 열려 있음(칩 색·툴팁으로 rig 구분) | 다른 저장소 선행이 닫히면 자동 복귀 | — |
| `external_job` (gate 행에만) | bead | `⏳` | `외부 계산` | 외부 호스트의 작업 종료를 관측기가 확인하는 중 | `<interval>`분마다 자동 확인 · 종료 확인되면 대기 자동 해제 (· 완료 시 Discord 알림) | `[지금 확인]` |
| `base_moved` | bead | (없음) | `반영 대기` | 검증된 후보를 보존하고 새 base 재검증을 기다림 | `↻ 이어하기`로 보존 세션 재개 | `↻ 이어하기` |
| `awaiting_user` | bead | `⏸` | `세션 대기` | 세션이 사용자 답변을 기다리며 파킹됨 | 문의 세션에서 답하면 해제 | `[세션에서 해결]` |
| `retry_wait` | bead | `↻` | `재시도 대기` (기존 `retryWaitBadgeText` 문구) | 환경성 실패의 자동 재시도 예약 | 예약 시각에 자동 재시도 | `↻ 지금 재시도` |
| `stale_work` | bead | `⛔` | `처분 대기` | 보존된 작업을 이어갈지 새로 시작할지 결정이 필요 | 처분 버튼으로 선택 | 처분 버튼 |
| `recovery` | bead | `⏳` | `<recovery.label>` (기존) | 복구 분류된 보존 작업이 확인을 기다림 | `<RECOVERY_RELEASES[reason]>` | `↻ 이어하기`·폐기 |
| `provider_hold` (보류된 attempt, `usage_limit`) | bead | `⏳` | `한도 대기` | 이 attempt가 계정 한도로 멈춤 | 리셋 뒤 자동 프로브 · 자동 재개 소진이면 `↻ 지금 프로브` | `↻ 지금 프로브` |
| `provider_hold` (보류된 attempt, `outage`) | bead | `⏳` | `공급자 장애` | 이 attempt가 공급자 장애로 멈춤 | 다음 프로브 시각에 자동 프로브(상한 없음) | `↻ 지금 프로브` |
| `queue_hold` (`systemic`) | queue | `⛔` | `정지 · <사유>` | 큐가 체계적 실패로 멈춤 | `▶ 재개`(사람 승인) | `▶ 재개` |
| `queue_hold` (`env`) | queue | `↻` | `환경 보류` | 환경 오류로 큐가 일시 정지, 자동 재시도 예약 | `<t>`에 자동 재시도 · 성공하면 해제 | `↻ 지금 재시도` |
| `auto_advance_off` | queue | `⏸` | `수동 출발` | 자동 진행이 꺼져 있어 큐가 스스로 출발하지 않음 | `[지금 시작]` 또는 툴바 `▶ 자동화` | `[지금 시작]` |
| gate `provider_usage` (큐 행 LaneGate) | queue | `⏳` | `한도 대기` | 러너의 계정 한도 보류 — target에 계정이 있으면 그 계정을 쓰는 행에만, 없으면 러너의 모든 행에 | 리셋 뒤 자동 프로브 · 소진이면 `↻ 지금 프로브` | `↻ 지금 프로브` |
| gate `provider_outage` (큐 행 LaneGate) | queue | `⏳` | `공급자 장애` | 러너 전체가 공급자 장애로 보류라 이 행이 출발하지 못함 | 다음 프로브 시각에 자동 프로브 | `↻ 지금 프로브` |

행 `id`(범례 anchor·테스트 키): `prerequisite` · `prerequisite-returning` ·
`prerequisite_foreign` · `external_job` · `base_moved` · `awaiting_user` ·
`retry_wait` · `stale_work` · `recovery` · `provider_hold-usage_limit` ·
`provider_hold-outage` · `queue_hold-systemic` · `queue_hold-env` ·
`auto_advance_off` · `gate-provider_usage` · `gate-provider_outage`. `queue_hold`
WaitReason과 `gate-*` LaneGate가 같은 칩(`⛔ 정지`·`↻ 환경 보류`)을 말할 때 범례
행은 `queue_hold-*` 하나다.

정정 두 가지: 공급자 장애의 정상 글리프는 `⚠️`에서 `⏳`로 바뀐다 — 프로브가
스스로 푸는 상태이므로 지연·조치 글리프를 정상 상태에 쓰지 않는다(UI-01wh §3.2의
`⚠️ 공급자 장애` 문구 정정). held 타일의 공급자 보류 배지 상세(리셋 시각·계정·
`수동 조치`)는 배지에서 빼고 팝업으로 내린다(§6.3).

### 5.3 관계 칩 표 (범례용, 칩 문법 §3의 사본이 아니라 참조)

`RELATION_CHIPS`는 `⛓`·`→`·`🔓`·`⧉`·`scope 없음`·`↩`·`워커 생성`·`⏳ <n>초`
(유예)·`외부 계산 N건`의 글리프·뜻·클릭 동작을 한 줄씩 갖고, 테스트가
`queue-blockers.js`·`lanes.js`가 그리는 라벨 접두가 이 표에 있는지 고정한다. 뜻
문장은 칩 문법 §3 표와 같아야 하며 어긋나면 그 스펙의 정정이 먼저다.

## 6. 카드 — 슬롯 1 배지 하나, 슬롯 3 한 줄

### 6.1 대표 사유

카드에 붙은 `wait_reasons` 중 `scope=bead`인 것만 배지·본문 재료다. 여러 개면 대표
하나를 고른다: verdict 심각도(`action_required` > `overdue` > `normal`) → 종류 순서
(`awaiting_user` > `stale_work` > `recovery` > `provider_hold` > `prerequisite_foreign`
> `prerequisite` > `base_moved` > `retry_wait`). `external_job`은 원래 이슈 카드의
배지 재료가 아니다(§7.3). 나머지 사유는 팝업의 `다른 사유` 목록에 한 줄씩 남는다.

### 6.2 슬롯 1 — 배지 하나 (`waitStatusBadge(card)`)

- 재료: 카드의 held 종류(`parked`·`retry_wait`·`waiting {cause, returning, recovery}`·
  `provider_hold`)와 대표 사유. held 종류가 있으면 라벨은 held 종류의 라벨이고,
  판정은 같은 종류의 대표 사유 verdict다. 같은 종류의 사유가 없으면(서버 판정 부재,
  재시작 직후 등) 종류 글리프와 라벨만 그리고 판정 문구를 붙이지 않는다 — `normal`로
  추정하지 않는다(§5.1). held 종류가 없는 큐 행은 대표 사유의 라벨·verdict다.
- 형태는 §5.1이다: `🔓 복귀 대기` / `⚠ 복귀 대기 · 지연 12분` / `⛔ 선행 대기 · 조치
  필요` / `⏳ 외부 계산` / `⛔ 세션 대기 · 조치 필요` / `⏳ 한도 대기`.
- `running-grid.js`의 `held_badge`와 `wait_lines[].badge`, `lanes.js` `miniRow`의
  `wait_lines[].badge`는 이 하나로 대체된다. `status_badges`는 `${conflict}${base}
  ${failure_badges}${wait_status_badge}`가 된다.
- held 카드의 오른쪽 경과/상태 라벨(`elapsed`의 `선행 대기`·`세션 대기`·`재시도 대기`·
  `반영 대기`·`공급자 보류`)은 그리지 않는다 — 배지가 이미 말한다. 실패 타일의
  `실패`·`중단됨`과 실행 타일의 경과 시계는 그대로다.
- 클릭은 기존 `.wait-verdict` details 팝업(제목 `대기 판정 근거`)이며 본문은 순서대로
  `verdict_reason.message`(정상이면 생략) · `release` · `관측 시작 <t>` · `다음 확인
  <t>` · `리셋 <t>` · 공급자 보류 상세(리셋·계정·`자동 재개 <n>회`·`수동 조치`) ·
  `다른 사유 <k>`(각 `<글리프> <라벨> — <headline>`) · 링크 `범례 보기`(§11,
  `data-help-anchor=<행 id>`). 판정이 없는 held 카드의 팝업은 제목이 `대기 종류`이고
  본문은 어휘 표의 풀리는 조건과 `범례 보기`뿐이다.
- `title` 툴팁은 어휘 표의 "언제 뜨나" 문장이다.

### 6.3 슬롯 3 — headline 한 줄

- 대표 사유의 `headline`만 `.wait-reason__headline` 한 줄로 그린다. `release`·
  `.wait-reason__guidance` 안내문은 카드에서 빠지고 팝업이 싣는다.
- held 타일의 기존 `heldBodyTemplate`가 그리던 요약 문장(`wait.summary`)은
  `wait_reasons`가 있으면 그리지 않는다(현행 조건 유지) — 대표 headline이 그 자리다.
- headline 문장 규칙은 서버가 소유한다(§10.1). 클라이언트는 자르지 않는다.

### 6.4 슬롯 4a·4b·7

- 4a: `⛓ <ID>`·`→ <ID>`·게이트 칩·유예 칩·`외부 계산 N건` 칩은 그대로. 4b:
  `🔓 <ID>`·`⧉ <ID>` 그대로. 선행 ID는 이 칩들이 말하므로 headline은 ID를 반복하지
  않는다(§10.1).
- 7: 대표 사유의 시각 줄 `확인 <t> · 다음 <t>` 또는 `리셋 <t>`를 `.worker-mini__times`
  캡션 크기로 그린다. 시각 형식은 §9.

## 7. 큐 단위 사유는 게이트 칩 하나

### 7.1 `queue_hold` 사유와 큐 행의 공급자 게이트

기존 게이트 칩이 유일한 표시다. `queue_hold` WaitReason은 배지·본문·시각을 만들지
않고 두 가지만 더한다: verdict가 `overdue`·`action_required`면 칩에
`.worker-dep--gate-overdue`/`--gate-action` 수식자(경고색)를 얹고, 칩 팝업 본문
첫 줄에 `verdict_reason.message`를 넣는다. 큐 행의 공급자 게이트(`provider_usage`·
`provider_outage` LaneGate)는 WaitReason이 없으므로 현행 칩·팝업 그대로이며 라벨만
어휘 표를 읽는다(`⚠️ 공급자 장애` → `⏳ 공급자 장애`). `[지금 시작]`·`▶ 재개`·
`↻ 지금 프로브`의 표시 조건은 UI-01wh·UI-o5ll 그대로다. 보류된 attempt의
`provider_hold` 사유는 held 타일의 슬롯 1 배지다(§6.2) — 이 절의 대상이 아니다.

### 7.2 `auto_advance_off` → `⏸ 수동 출발` 칩

- `lane-model.js`가 `auto_advance_off` 사유가 붙은 큐·직렬 레인 행에 `item.gate`가
  없을 때만 `LaneGate {kind: 'auto_advance_off', label: '⏸ 수동 출발', title}`를
  만든다. 큐 정지·공급자 보류 게이트가 있으면 그것이 더 바깥 사정이라 이긴다.
- 칩은 4a 줄 맨 앞, 저채도(`worker-dep--muted` 톤). 팝업: `자동 진행이 꺼져 있어
  큐가 스스로 출발하지 않습니다 · [지금 시작]으로 이 행만, 툴바 ▶ 자동화로 큐 전체를
  출발`. `[지금 시작]`은 게이트에 막힌 행에 서는 기존 규칙으로 그대로 나타난다.
- 배지·본문·시각·막힘 집계를 만들지 않는다. 대상 집합은 §10.2로 좁아진다 — 다른
  사유로 이미 멈춘 이슈(선행 대기 타일 등)에는 붙지 않으므로 `[지금 시작]`도 그
  타일에 서지 않는다.

### 7.3 외부 작업 행 — 상태 하나, 문장 하나

```text
⛔ 외부 계산 · 조치 필요   ops-4v9                         [지금 확인]
외부 작업 803565 관측                                      ← gate 제목 (상세 링크)
hamilton 작업 803565 · 종료 확인 · 결과 검증 필요 · 자동 확인 3회 연속 실패
→ ops-a4z
ops · hamilton
확인 23:03 · 다음 11:55
```

- 행은 세 가지다. 서버 `external_job` 사유는 열린 gate에만 나므로(`wait-judgment.js`
  222–233) `reason` 부재는 감시 기록 부재와 다르다 — 감시 기록 유무는 `watch_id`로
  가른다.
  - (a) `watch_id` 없음: 슬롯 1은 `대기 조건 · 감시 정보 없음` 라벨(UI-7341 §4.1
    그대로, 배지 없음), 슬롯 3은 gate 본문 요약이 있으면 그것.
  - (b) `watch_id` 있고 `reason` 있음(열린 gate): 슬롯 1 배지(§6.2 형태, 종류 `외부
    계산`) + gate ID. `외부 계산`/`외부 작업` 종류 라벨과 `<strong>` 작업 상태는
    1번 줄에서 빠진다.
  - (c) `watch_id` 있고 `reason` 없음(gate가 닫힌 종료 확인 묶음의 행, 또는 판정
    부재): 슬롯 1은 배지 없이 라벨 `외부 계산 · <monitor_state>`(예 `외부 계산 ·
    감시 종료`) + gate ID. 종료 확인 묶음(7일)과 그 접기·개수 규칙은 UI-7341 §4.1
    그대로다.
- 슬롯 2: gate 제목 링크(현행).
- 슬롯 3 한 줄은 (b)·(c) 모두 클라이언트가 관측 필드로 조립한다(`externalWaitLine
  (item)`): `[<ssh_host>] [작업 <job_id>] · <job_state>` 뒤에 `monitor_reason`이 있으면
  ` · <monitor_reason>`, 없고 `monitor_state`가 `자동 확인 중`이 아니면
  ` · <monitor_state>`; `previous_job_state`·`stale`은 그 뒤 ` · 이전 관측: <상태>` /
  ` · 오래된 자료`. 서버 `external_job` headline(§10.1)은 같은 규칙으로 조립한 같은
  문장이며 요약 팝오버·알림이 읽는다. 사유가 있어도 카드 본문은 이 조립을 쓰므로
  두 문장이 어긋나면 클라이언트 조립이 이긴다.
- 안내문(`[지금 확인]으로 …`, `원래 이슈가 재개되면 …`)과 release(`15분마다 자동
  확인 …`)는 배지 팝업이다.
- 4a: `→ <consumer_id>`(툴팁 `원래 이슈 · <consumer_title>` — 이 gate가 풀리면
  진행할 이슈; 칩 문법 §3의 "내가 막는 후속"과 같은 관계). 자기 gate를 가리키던
  `⛓ <gate_id>` 칩과 `원래 이슈 <ID> · <제목>` 줄은 없앤다.
- 5: 저장소 배지 · `ssh_host`. 작업 번호는 슬롯 3이 말하므로 칩에서 뺀다.
- 7: `확인 <t>[ · 다음 <t>]` / 종료 기록은 `종료 <t>`. `다음`은 `stopped`·`complete`가
  아닌 감시에만(UI-7341 §4.2 유지).
- 원래 이슈 카드의 4a 칩은 `외부 계산 대기 N건` 대신 `<판정 글리프> 외부 계산 N건`
  (`⏳ 외부 계산 1건` / `⚠ 외부 계산 1건 · 지연` / `⛔ 외부 계산 1건 · 조치 필요`,
  글리프는 그 이슈의 열린 gate 사유 중 최악 verdict). 팝업 각 행은 `<gate_id> · <슬롯
  3 문장>`. 이 칩이 원래 이슈 카드에서 `external_job`을 말하는 유일한 자리이며
  슬롯 1 배지의 재료가 아니다.

## 8. 요약 칩 — 두 탭 같은 칩 묶음

- `lanes.js`에 `summaryChipsTemplate({ running, pr_wait, done, range_label,
  workspaces, reveal })`를 두고 Worker KPI 줄과 Monitor 합계 줄이 같은 것을 그린다.
  칩은 `실행 N` · `PR N` · `<range> 완료 N` · `막힘 N`(N>0일 때만; `조치 M`은 M>0일
  때 같은 칩 안에 ` · ⛔ M`으로 경고색). Worker의 `base <branch>` 칩과 Monitor의
  `세션 N`(N>0)은 그 뒤에 그대로 선다.
- 라벨은 `PR 대기`→`PR`, `최근 7일 완료`→`7일 완료`(범위 라벨의 짧은 형식은
  `app/data/closed-range.js` `DONE_RANGE_OPTIONS`의 두 항목에 `short` 필드를 더한다:
  `today`→`오늘`, `7d`→`7일`. 완료 범위 자체는 넓히지 않는다). 툴팁이 긴 형식을
  유지한다.
- `막힘 N`은 `scope=bead` 사유가 하나라도 있는 원래 이슈 수다(`external_job`은 원래
  이슈로 한 번, 보류된 attempt의 `provider_hold`는 포함). `queue` 사유(`queue_hold`·
  `auto_advance_off`)는 N에 넣지 않고 팝오버 마지막 줄 `큐: 정지 a · 수동 출발 c`로만
  센다(항목 행 없음). 팝오버 그룹은 `외부 계산 · 선행 · 공급자(보류된 attempt) ·
  사람(세션·처분) · 복구 · 기준 이동 · 재시도`, 각 행은 `<배지> <저장소> <ID> —
  <headline>`이고 클릭은 기존 `scrollToWaitCard`.
- CSS: `.worker-kpi--ribbon`의 `flex-wrap: nowrap`을 `wrap`으로 바꾸고,
  `.mon2-deck__total-counts`의 `white-space: nowrap`을 없앤 뒤 같은 `.worker-kpi__chip`
  형태로 그린다. 토큰·비용 칩(`.mon2-deck__tok`·`.worker-kpi__chip--tokens`)은 640px
  이하에서 짧은 형식 `<provider> $<비용>`(부분 집계면 ` · 부분`)만 보이고 전체 문장은
  `title`에 남는다 — 마크업은 `<span class="tok__full">`·`<span class="tok__short">`
  둘을 그리고 미디어 쿼리가 하나만 보인다.

## 9. 시각 형식

`app/utils/relative-time.js`에 `formatClockLocal(ts, now)`를 더한다: 같은 날이면
`HH:MM`, 다른 날이면 `M/D HH:MM`. 대기 배지 팝업·슬롯 7 시각 줄·외부 작업 행 시각·
`⏸ 수동 출발`/게이트 팝업의 재시도 시각이 이 형식을 쓴다. 이슈 생성·수정 시각의
`timesMeta`와 상세 패널은 바꾸지 않는다. `.rtile .wait-reason__times`는
`.worker-mini__times`와 같은 캡션 크기·저채도다.

**승계(UI-0bvr).** 슬롯 7 시각 줄의 정의는
`2026-09-17-wait-card-duplicate-vocabulary-and-narrow-layout-design.md` §5가
대체한다. 낱말은 렌더가 아니라 어휘 표의 `elapsed_word`·`next_word` 두 칸이
소유하고, 줄은 `<경과> <elapsed_word>[ · <next_word> <HH:MM>]`이며 `resets_at`이
있으면 뒤 조각이 `리셋 <HH:MM>`이다. 선행 대기 두 종류는 두 칸이 모두 비어 줄
자체가 서지 않고 그 시작 시각은 배지 팝업의 `대기 시작 <t>`가 싣는다.
`formatClockLocal` 형식과 이 절의 나머지 규칙은 그대로다.

## 10. 서버 (`server/worker/wait-judgment.js`)

### 10.1 headline 규칙

| kind | headline |
| --- | --- |
| `prerequisite`/`_foreign`, 열린 선행 1건 | `<[rig/]ID> "<제목 24자>" 완료를 기다림 (<status>)` |
| 열린 선행 2건 이상 | `선행 <k>건 완료를 기다림 (<status별 수: open 1 · in_progress 1>)` |
| returning | `선행 <k>건 해제됨 · 복귀 재스캔을 기다림` |
| `external_job` | §7.3 슬롯 3과 같은 조립: `[<ssh_host>] [작업 <job_id>] · <job_state>` + (`monitor_reason` 있으면 ` · <monitor_reason>`, 없고 `monitor_state`가 `자동 확인 중`이 아니면 ` · <monitor_state>`) — 요약 팝오버·알림용 |
| `auto_advance_off` | `자동 진행 꺼짐 · 대기 <N>건 출발 안 함` (칩 팝업용, 카드 본문 아님) |
| 그 외 | 현행 유지 |

`release`·`verdict_reason`·`targets`·`actions`·`notify_plan`은 그대로다. 제목은 24자에서
자른다(선행 1건일 때만 쓰므로 40자가 필요 없다).

### 10.2 `auto_advance_off`의 대상

`auto_advance=false`이고 실행이 없을 때, **같은 subject에 다른 사유가 없는** 큐·
직렬 레인 항목에만 낸다. 선행 대기·공급자 보류·파킹 등으로 이미 멈춘 이슈는 자동
진행이 켜져도 출발하지 않으므로 "출발 안 함"의 원인이 아니다. `start_now` 조작은
그대로 붙는다.

### 10.3 바뀌지 않는 것

임계·verdict 코드·알림(`waitOverdue`·`waitActionRequired`)·중복 억제 키·
`[지금 확인]` op·타이머·스냅샷 필드·`provider_hold` 사유의 대상(보류된 attempt만).
`protocol.js`의 `WaitReason` typedef는 그대로이고 `scope`는 클라이언트 어휘 표가
`kind`에서 정한다(§5.2: `queue_hold`·`auto_advance_off`만 `queue`).

## 11. 도움말 범례 (`app/views/help-dialog/index.js`, 신설)

- `app/index.html` 헤더 액션에 `⚙` 왼쪽으로 `<button id="help-btn" aria-haspopup=
  "dialog" aria-label="도움말" title="도움말 · 칩과 배지의 뜻">?</button>`을 둔다.
  `main.js`가 `createHelpDialog(root, { anchor })`로 연결하고 `?` 키(입력 요소 밖)도
  연다.
- 네이티브 `<dialog class="help-dialog">`, 설정 다이얼로그와 같은 껍데기 스타일.
  640px 이하는 전체 화면·세로 스크롤. 절은 넷이고 전부 §5 표에서 렌더한다:
  1. **판정 글리프** — §5.1 세 줄, 각각 실제 배지 마크업으로 예시.
  2. **대기 상태 배지** — §5.2의 `scope=bead` 행: 배지 예시 · 언제 뜨나 · 풀리는
     조건 · 내가 할 수 있는 조작.
  3. **게이트 칩** — `scope=queue` 행(`queue_hold-*`·`auto_advance_off`·`gate-*`),
     같은 열.
  4. **관계 칩과 요약 칩** — §5.3 `RELATION_CHIPS`와 요약 칩 네 개의 뜻(`막힘 N`의
     집계 정의 포함).
- 각 행은 어휘 표 행의 고유 `id`로 `id="help-<행 id>"`를 가진다(예
  `help-prerequisite-returning`, `help-provider_hold-usage_limit`). 배지 팝업의 `범례
  보기`는 그 카드가 그린 행의 `id`를 `data-help-anchor`에 실어 `open({ anchor })`로
  그 행에 스크롤·강조한다.
- 범례는 표를 읽어 그리므로 어휘가 바뀌면 함께 바뀐다. 테스트는 표의 행 `id`가
  모두 유일하고 각 행이 범례에 정확히 한 번 나타나며, 렌더러가 만드는 배지·칩 라벨
  접두가 표의 라벨과 같음을 고정한다.

## 12. 카드 문법·칩 문법 스펙 정정 (ADR 0014)

`2026-08-25-card-header-grammar-unify-design.md` §5.1 끝에 **정정(UI-8gem)** 문단을
더한다.

- 슬롯 1 정체성의 held 판정 뱃지와 UI-n99w의 대기 판정 배지는 **한 배지**다: 종류
  라벨(선행 대기·복귀 대기·외부 계산·반영 대기·세션 대기·재시도 대기·처분 대기·
  한도 대기·공급자 장애)에 판정 글리프(`⚠`·`⛔`)와 `지연`/`조치 필요`를 붙인다.
  카드당 하나이며 대표 사유 규칙(§6.1)이 고른다. held 카드의 경과/상태 라벨은
  그리지 않는다.
- 슬롯 3의 대기 문장은 headline 한 줄이다. release·안내문은 배지 팝업이다.
- 슬롯 4a 게이트 칩에 `⏸ 수동 출발`이 더해지고, `⚠️ 공급자 장애`는 `⏳ 공급자
  장애`가 된다. 원래 이슈 카드의 `외부 계산 대기 N건`은 `<글리프> 외부 계산 N건`이다.
  외부 작업 행의 원래 이슈는 `→ <ID>`이며 자기 gate `⛓` 칩은 없다.
- 외부 작업 행 슬롯 5는 저장소·호스트, 슬롯 3이 작업 번호·상태를 말한다.
- 슬롯 7 시각은 `formatClockLocal` 짧은 형식이다.

`2026-08-28-chip-grammar-unify-design.md` §3 표에 **정정(UI-8gem)** 두 줄: 외부 작업
행의 `→ <consumer>`(원래 이슈, gate가 막는 후속)와 `<글리프> 외부 계산 N건`(원래
이슈 카드, 클릭 = gate별 상태 팝업).

## 13. 구현 unit 후보

- unit A `judgment`: `server/worker/wait-judgment.js` §10.1 headline · §10.2 대상 ·
  테스트.
- unit B `render`: `app/views/worker/wait-vocabulary.js` 신설 · `running-grid.js`·
  `lanes.js`·`lane-model.js`·`gate-labels.js`·`queue-blockers.js` 배지 하나·본문 한
  줄·게이트 칩·외부 작업 행·요약 칩 · `relative-time.js` · `styles.css` · 카드·칩
  문법 스펙 정정.
- unit C `help`: `app/views/help-dialog/` · `index.html`·`main.js` 버튼 연결 · 테스트.

unit B는 A의 headline 형태를 읽으므로 A가 먼저 착지하거나 같은 PR에 든다.

## 14. 검증과 수용 기준

- 단위: `wait-judgment.test.js` — 선행 1건/2건/returning headline, `external_job`
  headline의 `monitor_reason` 우선, `auto_advance_off`가 다른 사유가 있는 subject에
  나지 않음. `wait-vocabulary.test.js` — 모든 행이 유일한 `id`·라벨·scope·글리프를
  갖고 verdict 세 형태를 만들며 `queue_hold`·`auto_advance_off`만 `queue`다.
  `running-grid.test.js`·`lanes.test.js` — 선행 대기 타일과 큐 행에 `.wait-verdict`
  배지가 정확히 하나, `⏳ 정상 대기`·`release` 문자열 부재, `wait_reasons` 없는 held
  타일이 종류 라벨만 그리고 판정 문구가 없음, held 타일에 경과 라벨 부재, 대표 사유
  우선순위(`action_required` `prerequisite_foreign` + `normal` `prerequisite` →
  `⛔ 선행 대기 · 조치 필요`), 팝업에 release·다른 사유·`범례 보기`(`data-help-anchor`가 행 `id`),
  `⏸ 수동 출발` 칩이 게이트 없는 행에만·팝업 문구, 외부 작업 행 세 가지(§7.3 (a)
  감시 정보 없는 gate·(b) 열린 gate 여섯 줄 구조 — 자기 `⛓` 칩 부재·`→ <consumer>`
  존재·슬롯 3 한 줄·(c) 종료 확인 행의 `외부 계산 · 감시 종료` 라벨과 `종료 <t>`),
  원래 이슈 카드의 `⛔ 외부 계산 1건 · 조치 필요`. `deck.test.js`·`worker/index.test.js`
  — 요약 칩 네 개, `막힘` 집계가 `auto_advance_off`·`queue_hold`를 세지 않고 보류된
  attempt의 `provider_hold`는 세며 팝오버에 `공급자` 그룹과 `큐:` 줄, `PR`·`7일 완료`
  라벨, 토큰 칩 짧은 형식 마크업. `help-dialog.test.js` — 네 절·anchor 스크롤·`?`
  키. `relative-time.test.js` — 같은 날/다른 날 형식.
- 브라우저 QA 1280px/390px: Monitor(전 저장소)와 Worker(microbiome_bile·ops)에서
  선행 대기 타일이 7줄 이내(배지+조작 · 제목 · headline · 4a · 4b · foot · 시각),
  외부 작업 행이 §7.3 구조, 390px에서 요약 칩이 잘리지 않고 줄바꿈되며 토큰 칩이
  짧은 형식, 도움말 다이얼로그가 390px에서 전체 화면 스크롤. 스크린샷을
  `~/tmp/mockups/`에 남긴다.
- Pre-Handoff Validation 전체(`tsc`·`lint`·`prettier`·Vitest).

## 15. 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |

- 관찰: UI-n99w §2-2·§6.4 알림 문장(`⚠ <repo> <bead_id> 지연 · <headline> ·
  <verdict_reason>`)은 headline 규칙 §10.1을 자동으로 따른다 — 별도 변경 없음.
- 관찰: 상세 패널(`detail-panel`)의 의존성 절 판정 배지(UI-n99w §7.5)는 같은
  `waitVerdictLabel`을 읽으므로 §5.1 형태로 함께 바뀐다. 상세 패널 구조는 바꾸지
  않는다.
- 관찰: `[지금 시작]`이 큐 행에 서는 조건(유예·게이트)은 UI-01wh 그대로다.
  `auto_advance_off` 대상 축소(§10.2)로 선행 대기 타일에서만 사라진다.
- 비목표: 판정 임계·verdict 코드·Discord 알림·관측기·`[지금 확인]` op·WS 채널·
  레인 배치·탭 구성·상세 패널 구조·이슈 생성/수정 시각 형식·설정 다이얼로그.
- 결정: 큐 단위 사유의 표시는 배너가 아니라 막힌 행의 게이트 칩이다 — ADR UI-a8rq가
  승계한 "상단 배너 없음"을 지킨다.
- 결정: 대기 어휘의 원본은 코드의 표 하나이고 문서는 이 스펙과 앱 내 범례다 —
  별도 마크다운·HTML 문서를 두면 화면과 어긋난다.

## 결정 (ADR 후보)

- 전제: ADR 0014 — 단일 `buildLanes`와 공유 슬롯 표를 유지하고 새 배지·칩·라벨을
  §12에서 슬롯에 먼저 배정한다.
- 전제: ADR UI-a8rq — 큐 정지·공급자 보류의 표시와 출구는 막힌 카드에 살고 상단
  배너는 없다; 이 설계는 `⏸ 수동 출발`도 같은 자리에 둔다.
- 전제: ADR UI-lmqu — `waiting`은 선행 대기와 기준 이동 대기로 갈리고 배지 라벨
  `복귀 대기`·`반영 대기`는 그 구분을 유지한다.
- 전제: ADR 0038 — 처분 대기 admission은 대기 행이 대표하고 처분 버튼은 대기 행에만
  산다; `처분 대기` 배지는 그 행에 선다.
- 전제: ADR 0012 — dotfiles 계약의 확인된 필드만 소비하고 부재 시 표시를 생략한다.
- 후보 1: 카드의 대기 상태는 슬롯 1 배지 하나가 종류 라벨과 판정 글리프로 말하고,
  큐 단위 사유(자동 진행 꺼짐·큐 정지·큐 행의 공급자 게이트)는 4a 게이트 칩으로만
  서며 막힘 집계에서 빠진다.
  - 되돌리기 어려움: 두 탭의 세 렌더러·요약 집계·범례·테스트가 "배지 하나 + 대표
    사유"에 묶이고, 서버 `auto_advance_off`의 대상 집합이 좁아져 알림·집계도 그
    집합을 따른다.
  - 맥락 없이 의외: 서버는 사유를 여럿 내는데 카드는 하나만 배지로 그리고 어떤
    사유는 배지도 본문도 없이 칩 하나로만 나타난다 — 코드만 보면 왜 사유 종류에
    따라 표시 층이 다른지 드러나지 않는다.
  - 실제 절충: 사유별 판정을 카드에서 한눈에 보지 못하고 팝업을 열어야 한다;
    대신 카드당 상태 토큰이 하나로 줄고 큐의 사정이 카드마다 반복되지 않는다.
  - `summary`: "대기 카드의 상태는 슬롯 1 배지 하나가 종류와 판정을 함께 말하고,
    큐 단위 사유는 4a 게이트 칩으로만 서며 막힘 집계는 이슈 단위 사유만 센다" → ADR
- 후보 2: 대기 어휘(라벨·글리프·뜻·조작)는 `wait-vocabulary.js` 표 하나가 소유하고
  배지·칩·요약·범례·툴팁은 그 표에서 렌더한다.
  - 되돌리기 쉬움: 모듈 하나를 나누면 되고 계약 필드는 바뀌지 않는다.
  - 맥락 없이 의외 아님: 범례가 표를 읽는 구조는 코드가 스스로 설명한다.
  - 실제 절충 없음: 다른 선택지(문서 따로 유지)는 어긋남만 낳는다.
  → ADR 아님
