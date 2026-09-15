---
scope:
  - server/external-job-observations.js
  - server/ws/monitor-handlers.js
  - server/ws/worker-handlers.js
  - server/ws/connection.js
  - server/routes/worker-queue.js
  - server/worker/notify.js
  - server/worker/attach.js
  - server/worker/queue-store.js
  - server/worker/wait-judgment.js
  - app/protocol.js
  - app/views/worker/lane-model.js
  - app/views/worker/lanes.js
  - app/views/worker/running-grid.js
  - app/views/worker/index.js
  - app/views/monitor/
  - app/views/detail-panel/
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
---

# 대기·막힘 사유 통일과 막힘 요약 — Worker·Monitor 공용 사유 모델, 지연 판정, 알림 (UI-n99w)

## 1. 문제 (2026-09-15 관측)

전 저장소의 실패·차단 정리 중 다음을 확인했다.

- **Worker 탭에 외부 작업 대기가 없다.** `buildLanes`는 `workspace.external_waits`를
  `external_wait` 행과 원래 이슈 카드의 `외부 계산 대기 N건` 칩으로 투영할 준비가 돼
  있지만(`lane-model.js` 2608–2625, 4281–4306), Worker 탭이 받는 워크스페이스
  payload에는 `external_waits`가 실리지 않는다(`worker-handlers.js`에 참조 없음).
  Monitor만 `monitor-handlers.js` 863에서 붙인다.
- **문장이 아니라 용어 나열이다.** Monitor의 외부 작업 행은 `외부 작업 · 계산 중 /
  ops-4v9 외부 작업 803565 관측 / 자동 확인 중 / 원래 이슈 ops-a4z`로 읽힌다. gate
  ID·잡 번호·감시 단계 용어만 있고, 사용자가 알고 싶은 "누가 무엇을 어디서 기다리며,
  언제 확인되고, 지금 정상인지, 내가 할 일이 있는지"가 없다.
- **지연을 판정하지 않는다.** microbiome_bile의 watch 4건이 `terminal_recorded`에서
  00:10Z부터 03:49Z까지 정산되지 못했다. 화면은 `종료 확인 · 대기 해제 확인 중`으로
  정상처럼 보였고 알림도 없었다. 세션이 관측기 `tick`을 직접 실행해서야 4건이
  풀렸다(관측기 쪽 원인은 dotfiles-jylt).
- **대기 종류가 흩어져 있다.** 선행 대기 타일(`⛓ 선행 대기`·`복귀 대기`), 공급자
  보류(`한도 대기 · 리셋 미상 · 수동 조치`), 큐 자동 진행 꺼짐(Cortex는
  `auto_advance=false`라 s1#0이 출발하지 않음), 사용자 결정 대기(파킹), 외부 작업
  gate가 각각 다른 자리와 문법으로 서고 저장소 횡단 합계가 없다. 의존성으로 만든
  이슈가 늘수록 무엇이 왜 멈춰 있는지 한눈에 파악할 수 없다.
- 부수 관측: Analysis-wq0w 타일은 이미 닫힌 gate(Analysis-1l46·x0cr)를 복귀 재스캔
  전까지 `대기 · blocks:` 그대로 표시한다. 기존 `🔓 복귀 대기` 재료가 있으므로 판정에
  포함한다.

## 2. 사용자 결정 (2026-09-15)

1. **사유 통일 + 막힘 요약.** 모든 대기·막힘을 하나의 사유 모델로 투영해 두 탭이 같은
   문장·판정·다음 확인 시각·조치를 보여 주고, Worker 탭 대기 영역에도 외부 작업
   묶음을 두며, 저장소 횡단 `막힘 N · 조치 필요 M` 요약을 둔다.
2. **지연·조치 필요 판정은 Discord 알림, 항목당 1회.**
3. **[지금 확인] 버튼을 두고, 외부 작업 대기는 등록 시점부터 완료 알림을 세팅한다.**
   해석: 완료 알림의 주체는 관측기다 — `register`가 알림 목적지를 기록하고 `tick`이
   종료·정산 시 보낸다(§8, dotfiles 형제). beads-ui는 그 알림 예정 사실을 행에
   표시하고, 자기 판정(지연·조치 필요)만 스스로 알린다. 완료=관측기, 지연=beads-ui로
   주체가 갈려 중복되지 않는다.

## 3. 검증된 전제

- 관측 행 재료: `server/external-job-observations.js`가 watch 파일과 서비스 receipt를
  읽어 `job_state`·`previous_job_state`·`monitor_state`·`monitor_reason`·`overdue`·
  `gate_open`·`recent_complete`·`stage`·`last_observed_at`·`next_observation_at`·
  `completed_at`·`consumer_id`·`gate_id`·`gate_title`·`job_id`·`watch_id`를 낸다.
  watch 파일은 이 밖에 `interval_seconds`·`ssh_host`·`exit_code`·`recovery_needed`·
  `last_error`·`error_count`·`expected_results`를 가진다.
- 수집은 `refreshExternalWaitsForVisible`(`monitor-handlers.js` 1430)이 Monitor
  구독자가 있을 때만 돈다. 뷰어가 없으면 관측·판정이 없다.
- 선행 대기: `heldAttemptStates`(`parked`·`retry_wait`·`waiting`·`provider_hold`),
  `waitProjection`의 `blockers {id, rig, status}`, `admissionBadge`의
  `⛓ 선행 대기`, 해제된 선행의 `🔓 복귀 대기`(UI-yue8 §6).
- 공급자 보류: `provider_hold[runner].targets[]`의 `kind`·`model`·`account`·
  `resets_at`·`rearm_count`·`last_error`(`auto_resume_disarmed:rearm_cap` 등)·
  `next_probe_at`. 해제는 프로브만이 판정하고 `↻ 지금 프로브`는 그것을 앞당긴다
  (ADR UI-o5ll). 오늘 microbiome_bile·prostate의 codex 보류는 계정 4(business)의
  5시간 한도 100%였고 리셋(05:24Z) 전이라 프로브가 실패했다 — 리셋 전 정상 대기,
  리셋 후 `auto_resume_disarmed`면 사람이 프로브를 눌러야 한다.
- 알림: `createNotifier`는 `worker_notify.cmd`에 메시지 한 인자를 붙여 spawn하고
  설정이 꺼져 있으면 무음이다. 메서드는 `attemptStarted`…`needsHuman`.
- 큐 자동 진행: `queue.auto_advance`. 꺼진 저장소의 대기 항목은 사람이 `[지금 시작]`
  하거나 자동화를 켜야 출발한다.
- 설치본 실행: ADR 0039가 설치된 체커를 runtime spawn해 `--json`으로 소비하는
  방식을 이미 허용한다. 관측기 CLI는 `register`·`show`·`tick`·`stop`이며 `tick`은
  호스트 잠금 아래 due 항목 전부를 처리한다(watch 단위 tick 없음). 잠금이 바쁘면
  `skipped=true`로 정상 종료한다.
- 카드 문법: 슬롯 표는 `2026-08-25-card-header-grammar-unify-design.md` §5.1이
  소유하고 UI-7341이 외부 작업 행의 슬롯을 정정했다. 새 라벨·칩·버튼은 그 표를 먼저
  갱신한다(ADR 0014).

## 4. 설계 원칙

- **판정은 한 곳.** 지연·조치 필요 판정은 서버의 순수 모듈이 소유하고 두 탭과 알림은
  같은 결과를 소비한다. 클라이언트는 문장을 조립하고 상대 시각만 다시 계산한다.
- **표시 전용.** 이슈 `status`·Worker admission·gate 닫기를 쓰지 않는다.
- **fail-quiet.** 재료가 없는 요소는 그리지 않고, 없는 사실을 정상으로 추정하지
  않는다.
- **주체 분리.** 완료 알림은 관측기, 지연 알림은 beads-ui, 해제는 기존 소유자(관측기
  정산·프로브·bd ready 재스캔).

## 5. 사유 모델 (`WaitReason`)

```text
WaitReason
  kind      external_job | prerequisite | prerequisite_foreign | provider_hold
            | queue_hold | auto_advance_off | awaiting_user | retry_wait | stale_work
  subject   { bead_id, root_dir }           — 원래 이슈(대기 주체)
  headline  사람 문장 한 줄: 누가 무엇을 기다리는가
  release   해제 조건 한 줄: 무엇이 되면 어떻게 풀리는가
  since · next_check_at · resets_at         — 있는 것만
  verdict   normal | overdue | action_required
  verdict_reason  enum 코드 + 문장 (§5.2)
  targets   [{ id, rig, status, kind: gate|issue }]  — ⛓ 칩 재료
  actions   [{ op, label, payload }]        — 기존 조작만 (§5.3)
  notify_plan { on_complete: discord|none, on_overdue: discord|none }
```

### 5.1 종류별 재료·문장

| kind | 재료 | headline | release |
| --- | --- | --- | --- |
| `external_job` | watch + gate + 원래 이슈 제목 | `<원래 이슈>가 <ssh_host> 작업 <job_id> 종료를 기다림 · <작업 상태>` | `<interval>분마다 자동 확인 · 종료 확인되면 대기 자동 해제` + (notify 필드 있으면) ` · 완료 시 Discord 알림` |
| `prerequisite` | `blockers[]`(같은 rig) + blocker 제목·status | `<blocker ID> "<제목 앞 40자>" 완료를 기다림 (<status>)` | `선행이 닫히면 자동 복귀` |
| `prerequisite_foreign` | `blockers[]`의 `rig` + foreign readback status(UI-yue8 §6.2) | 위와 같고 `<rig>/<ID>` 표기 | `다른 저장소 선행이 닫히면 자동 복귀` |
| `provider_hold` | target + 계정 카탈로그 alias | `<runner> <계정 alias>(<plan>) <창> 한도 초과` | `리셋 <resets_at\|미상> 뒤 자동 프로브 (자동 재개 <남은 회수>회)` / 소진이면 `자동 재개 꺼짐 · ↻ 지금 프로브 필요` |
| `queue_hold` | `queue.hold` | `큐 정지 · <사유>` | `▶ 재개로 해제` |
| `auto_advance_off` | `auto_advance=false` + 대기 항목 존재 + 실행 없음 | `자동 진행 꺼짐 · 대기 <N>건 출발 안 함` | `[지금 시작] 또는 자동화 켜기` |
| `awaiting_user` | 파킹 attempt의 `awaiting_user` 값 | `사용자 결정 대기 · <값의 사람 문장>` | `문의 세션에서 답하면 해제` |
| `retry_wait` | backoff attempt | `<원인> 재시도 대기` | `<t>에 자동 재시도` |
| `stale_work` | 처분 대기 admission | `보존 작업 처분 대기` | `이어하기 / 새로 시작 선택` |

작업 상태 문구는 UI-7341 §4.2 표를 유지한다. 원래 이슈 제목은 40자에서 자르고 없으면
ID만 쓴다. 문장의 모든 조각은 재료가 있을 때만 붙인다.

### 5.2 판정 규칙과 임계 (`server/worker/wait-judgment.js` 상수 한 곳)

| kind | `overdue` (지연) | `action_required` (조치 필요) |
| --- | --- | --- |
| `external_job` | `next_observation_at` + 1주기 경과(`check_overdue`) · `stage ∈ {terminal_recorded, gate_noted}`가 2주기(기본 30분) 이상(`settle_overdue`) | `recovery_needed=true` 확정(`job_failed`) · `error_count ≥ 3`(`observe_failing`) · 서비스 미로드/명령 불일치(`service_down`) · `stopped`(`monitor_stopped`) |
| `prerequisite`(`_foreign`) | 선행이 닫혔는데 10분 넘게 복귀 안 됨(`return_overdue`) | 선행이 stored `blocked`·`deferred`이거나 `worker-ineligible`(`blocker_needs_human`) |
| `provider_hold` | `resets_at` + 5분 경과에도 보류(`reset_passed`) | `last_error`가 `auto_resume_disarmed:*`이고 `resets_at` 경과 또는 미상 6시간 초과(`probe_needed`) |
| `queue_hold` | — | 항상(`hold`) |
| `awaiting_user` | — | 항상(`decision`) |
| `stale_work` | — | 항상(`disposition`) |
| `auto_advance_off` | — | — (요약에 `수동 출발 대기`로만 셈) |
| `retry_wait` | — | — |

임계는 상수로 두고 테스트가 경계값을 고정한다. 판정은 `now`를 인자로 받는 순수
함수다.

### 5.3 조치는 기존 조작만 재사용한다

`probe_now`(`↻ 지금 프로브`, `worker-provider-probe-now`) · `resume`(`▶ 재개`) ·
`start_now`(`[지금 시작]`) · `monitor_tick_now`(`[지금 확인]`, §6.5 신설) ·
`disposition`(기존 처분 버튼). gate를 닫거나 선행을 대신 완료하는 조작은 없다.

## 6. 서버

### 6.1 `server/worker/wait-judgment.js` (신설, 순수)

입력: 워크스페이스 큐 스냅샷(`attempts`·`queue`·`serial_lanes`·`hold`·`auto_advance`·
`provider_hold`), 외부 관측 행(§3), 선행 상태 맵(`bead_blocked_by` + foreign
readback), 계정 카탈로그, `now`. 출력: `WaitReason[]`(원래 이슈당 여러 사유 가능,
`external_job`은 gate당 하나). 판정 외 부작용 없음.

### 6.2 뷰어 독립 수집·판정 타이머

Worker 런타임 attach 시 워크스페이스별 `wait-judge` 타이머(기본 5분, `unref`)를 시작한다.
매 주기: 외부 관측 수집기(`createExternalJobObservations().collect`)를 그 워크스페이스에
대해 실행(로컬 watch 파일·receipt 읽기 + 캐시된 스냅샷, ADR 0043) → §6.1 판정 →
결과를 워크스페이스별 메모리 캐시 `wait_reasons`·`external_waits`에 두고 큐 fanout으로
푸시한다. Monitor의 `refreshExternalWaitsForVisible`은 유지하되 같은 캐시를 갱신하는
경로로 합친다(두 수집기가 따로 돌지 않는다). 타이머는 `provider_hold`·`hold`·
`auto_advance` 변경 이벤트에서도 즉시 한 번 돈다(judgment는 저렴하다).

### 6.3 Worker 스냅샷에 싣기

`decorateQueue(workspace_key, queue)`가 캐시의 `external_waits`(그 root의 행)와
`wait_reasons`를 스냅샷에 붙인다. `protocol.js`의 큐 스냅샷 typedef에 두 필드를
추가한다. 클라이언트 `buildLanes`는 이미 `workspace.external_waits`를 읽으므로 Worker
탭 대기 영역과 원래 이슈 카드 칩이 Monitor와 같은 재료로 채워진다. `wait_reasons`는
`LaneItem.wait_reasons`로 원래 이슈에 부착하고, `external_wait` 행은 자기 gate의
사유 하나를 `reason`으로 가진다. HTTP `GET /api/worker/queue`는 바꾸지 않는다.

### 6.4 알림 (`notify.js`)

`waitOverdue({ bead_id, kind, headline, verdict_reason, repo })`와
`waitActionRequired(...)`를 추가한다. 메시지는 한 인자, 한 줄:
`⚠ <repo> <bead_id> 지연 · <headline> · <verdict_reason 문장>`.

중복 억제는 `(bead_id, kind, verdict_reason)` 키다. 큐 상태에 `wait_notified:
{ [key]: at }`를 두고(상태 전용, ADR 0027), 판정 주기에서 같은 키가 이미 있으면 보내지
않는다. 사유가 사라지면(판정 결과에 그 키가 없으면) 키를 지워 재발 시 다시 한 번
알린다. `verdict`가 `normal`로 돌아가는 해소 알림은 보내지 않는다. 보낸 알림은 bead
타임라인에 `wait_notified` 이벤트로 남긴다(이력 SoT, ADR 0027). `worker_notify`가
꺼져 있으면 키만 기록하고 보내지 않는다(현행 무음 규칙).

### 6.5 `[지금 확인]` — `worker-external-wait-check-now`

payload `{ root_dir, watch_id, since }`(`since`는 행이 그린 `last_observed_at`, 낡은
화면 클릭 필터). 서버는 설치본 `bead-job-monitor tick`을 spawn(ADR 0039 방식: PATH의
설치본, 셸 없음, 120초 timeout, stdout JSON 파싱)하고 워크스페이스당 in-flight 1개만
허용한다. 응답 `{ ok, outcome: settled | still_waiting | skipped | error, summary }`:
receipt의 `completed`와 그 watch의 `stage` 변화로 `settled`/`still_waiting`을 가르고
`skipped=true`는 `이미 실행 중`으로, 비정상 종료는 `error`와 stderr 첫 줄로 표시한다.
완료 후 §6.2 수집·판정을 즉시 한 번 돌려 fanout한다. 관측기 CLI가 watch 단위 실행을
제공하지 않으므로 버튼 문구는 "관측기를 지금 한 번 실행"이며 호스트의 due 항목 전부가
처리된다는 사실을 툴팁에 적는다. 클릭은 `user_action` 타임라인 이벤트 `[지금 확인]
클릭`으로 남긴다. 관측기 판정·주기·gate 해제 순서는 건드리지 않는다.

## 7. 표시

### 7.1 공용 렌더 `waitReasonLines(reason)` (`lanes.js`)와 슬롯

새 요소의 슬롯을 먼저 정한다(ADR 0014). 카드 문법 스펙 §5.1에 다음 정정 문단을
추가한다.

- 슬롯 1 정체성: **대기 판정 배지** `⏳ 정상 대기` / `⚠ 지연 · <사유>` /
  `⛔ 조치 필요 · <사유>`. 이 카드가 지금 어떤 상태인가에 답하므로 1번이다. 클릭은
  판정 근거 팝업(임계·관측 시각).
- 슬롯 1 조작: `[지금 확인]`(외부 작업 행), 기존 `↻ 지금 프로브`·`▶ 재개`·`[지금 시작]`.
- 슬롯 3 진행: **대기 사유 문장**(`headline`)과 **해제 조건**(`release`) 두 줄. 어디까지
  왔나·무엇을 기다리나에 답한다. UI-7341이 3번에 둔 감시 상태·오류는 이 두 줄 뒤
  한 줄로 합친다.
- 슬롯 4a: 기존 `⛓ <ID>`(gate·이슈 상세 열기) 유지. 4b: 기존 `🔓 <ID>` 유지.
- 슬롯 5: 저장소 배지 · 외부 작업 번호 · ssh 호스트.
- 슬롯 7: `마지막 확인 <t> · 다음 <t>` 또는 `리셋 <t>`.

### 7.2 외부 작업 행 (두 탭 대기 영역의 `외부 작업·대기 조건` 묶음)

```text
⏳ 정상 대기   Analysis-x0cr · 외부 계산 · 계산 중                  [지금 확인]
consensus_pac null 보정 pilot (bile_biliary_cancer)
Analysis-wq0w가 wallace 작업 246428 종료를 기다림
15분마다 자동 확인 · 종료 확인되면 대기 자동 해제 · 완료 시 Discord 알림
⛓ Analysis-wq0w
microbiome_bile · 작업 246428 · wallace
마지막 확인 12:47 · 다음 13:02
```

지연 예:

```text
⚠ 해제 지연 · 종료는 09:10에 확인됐지만 3시간째 대기가 안 풀림      [지금 확인]
…
[지금 확인]으로 관측기를 지금 실행하거나 관측기 상태를 점검하세요
```

조치 필요 예(`job_failed`): `⛔ 조치 필요 · 작업이 실패로 끝남(exit 1) · 산출물 없음` +
`원래 이슈가 재개되면 복구 판단이 필요합니다`. 종료 확인 묶음(7일)은 UI-7341 §4.1을
유지한다.

### 7.3 Worker 탭

`waitBody`에 Monitor와 같은 `external` 묶음을 넘긴다(현재 Worker 탭은 `parallel`·
`serial`만 넘긴다). 원래 이슈 카드의 `외부 계산 대기 N건` 칩은 재료가 실리면 그대로
나타난다. 대기 영역 헤더 개수에 열린 외부 작업 수를 더한다(Monitor와 같은 규칙).

### 7.4 막힘 요약 배지

두 탭 상단 집계 줄(Monitor의 `실행 · 대기 · PR · 오늘 완료`, Worker의 `실행 · PR 대기 ·
오늘 완료`)에 `막힘 N · 조치 필요 M`을 추가한다. N은 `wait_reasons`의 원래 이슈 수
(사유 여러 개는 한 번), M은 `action_required`가 하나라도 있는 원래 이슈 수. Monitor는
보이는 전 저장소, Worker는 현재 워크스페이스. 클릭 팝오버: 사유 종류별 그룹(`외부 계산
a · 선행 b · 공급자 c · 사람 d · 수동 출발 e`), 각 항목 한 줄
`<판정 배지> <저장소> <ID> — <headline>`, 클릭은 그 카드로 스크롤하고 강조한다. 0건이면
배지를 그리지 않는다.

### 7.5 상세 패널

gate 상세 상단 `대기 조건` 블록(UI-7341 §4.3)을 사유 모델 문장으로 바꾸고 `[지금 확인]`을
같은 자리에 둔다. 원래 이슈 상세의 의존성 절에는 각 선행 옆에 판정 배지와 headline을
붙인다.

### 7.6 선행 대기 타일과 공급자 보류 카드

held `waiting` 타일 슬롯 3에 `prerequisite` headline(선행 제목·status·rig)을 붙이고,
닫힌 선행의 `🔓 복귀 대기`에는 `return_overdue` 판정을 얹는다. 공급자 보류 카드의
`한도 대기 · 리셋 미상 · 수동 조치`는 `provider_hold` headline·release로 바꾼다:
`codex nakkulla@gmail.com(business) 5h 한도 100% · 리셋 14:24 · 자동 재개 꺼짐(4회
소진)` + 리셋 전 `⏳ 정상 대기 · 리셋까지 n분`, 리셋 후 `⛔ 조치 필요 · ↻ 지금 프로브`.
계정 alias는 기존 카탈로그가 없으면 계정 키 앞 8자로 대신한다. 조작은 기존 버튼이다.

## 8. dotfiles 형제 — 관측기 완료 알림

관측기 `register`에 `--notify discord|none`(기본 `discord`)을 추가하고 watch 기록에
`notify: { on_complete: "discord" }`를 저장한다. `tick`은 종료 기록(`terminal_recorded`)
시 1회, gate 정산(`complete`) 시 1회 Discord 알림을 보낸다 — 메시지
`<consumer> 외부 작업 <job_id> <state> (exit <code>) · gate <gate_id> 정산 → 재개 대기`.
sjob의 잡 완료 알림과는 별개(그것은 잡, 이것은 대기 해제)다. beads-ui는 watch의
`notify` 필드를 읽어 `완료 시 Discord 알림`을 표시하고 필드가 없으면 그 조각을 생략한다
(ADR 0012, fail-quiet). 이 형제는 다른 저장소·소유권이라 분리하며 beads-ui 구현의
선행이 아니다.

## 9. 구현 unit 후보

- unit A `server/judgment`: §6.1 판정 모듈 · §6.2 타이머·수집 통합 · §6.4 알림·중복
  억제 · 타임라인 이벤트.
- unit B `client/render`: §6.3 스냅샷 필드 · `protocol.js` · §7.1–7.6 렌더·요약 배지 ·
  카드 문법 스펙 §5.1 정정.
- unit C `check-now`: §6.5 WS op·spawn·응답·타임라인.

## 10. 검증과 수용 기준

- 단위: `wait-judgment.js` 종류·판정별 표 테스트와 임계 경계값(1주기·2주기·10분·5분·
  6시간); `notify` 중복 억제(같은 키 1회, 사유 소멸 뒤 재발 시 재알림, 설정 꺼짐 무음);
  `decorateQueue`의 `external_waits`·`wait_reasons` 부착; `buildLanes`의 `reason`
  부착; 렌더 템플릿(각 판정 배지·문장·버튼 존재/부재); `[지금 확인]` 핸들러(fake spawn
  으로 `settled`/`still_waiting`/`skipped`/`error`, in-flight 거부, `since` 불일치 거부).
- 재현: watch fixture를 `terminal_recorded` 35분으로 두면 `⚠ 해제 지연`이 뜨고 알림이
  1회 가며, 다음 판정 주기에 두 번째 알림이 없고, `complete`가 되면 배지와 키가 사라진다.
- 브라우저 QA 1280px/390px: Worker 탭 대기 영역에 외부 작업 묶음과 요약 배지가 보이고,
  Monitor 행이 §7.2 문장으로 읽히며, 요약 팝오버 클릭이 카드로 이동한다. 스크린샷을
  남긴다.
- Pre-Handoff Validation 전체(`tsc`·`lint`·`prettier`·Vitest).

## 11. 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | user_request | 다른 저장소·소유권 — 관측기 등록과 tick이 완료 알림을 보낸다(§8) | 없음 | dotfiles-qh5e |

- 관찰: dotfiles-jylt — 관측기 예약 실행에서 gate 정산이 조용히 실패하는 결함. 이
  설계의 `settle_overdue` 판정이 그 증상을 드러내지만 원인 수정은 그 Bead가 소유한다.
- 관찰: `auto_advance=false`인 저장소(Cortex)의 대기 항목은 요약에 `수동 출발 대기`로만
  세고 자동화 토글을 바꾸지 않는다 — 출발 제어는 사용자 결정이다.
- 비목표: 관측기 판정·900초 주기·gate 해제 순서 변경, 이슈 `status`·admission 쓰기,
  gate 닫기 조작, 새 탭, HTTP 큐 API 변경, 해소 알림.
- 결정: 판정 임계는 설정이 아니라 코드 상수다 — 두 탭과 알림이 같은 값을 읽어야 하고
  사용자 설정면이 아직 없다.

## 결정 (ADR 후보)

- 전제: ADR 0014 — 단일 `buildLanes`와 공유 슬롯 표를 유지하고 새 배지·문장·버튼을
  §7.1에서 슬롯에 먼저 배정한다.
- 전제: ADR 0027 — 판정·알림 이력은 bead별 `events.jsonl`에 남기고 `queue.json`에는
  중복 억제 키 상태만 둔다.
- 전제: ADR 0039 — `[지금 확인]`은 설치본 관측기를 runtime spawn해 JSON으로 소비한다.
- 전제: ADR 0012 — dotfiles 계약의 확인된 필드만 소비하고 부재 시 표시를 생략한다.
- 전제: ADR UI-o5ll — 공급자 보류 해제는 프로브만이 판정하고 `↻ 지금 프로브`를
  재사용한다.
- 전제: ADR 0043 — 투영은 준비된 비동기 자료(타이머 수집 캐시)만 읽는다.
- 전제: ADR 0020 — blocks 의존은 구현 진입만 막으며 이 설계는 그 판정을 바꾸지 않는다.
- 후보 1: 대기·막힘 판정은 서버의 순수 판정 모듈이 소유하고 두 탭과 알림은 같은 판정을
  소비한다 — 되돌리기 어려움(표시·알림 두 소비자가 계약), 대안 존재(클라이언트 판정),
  범위 넓음. `summary`: "대기·막힘 판정은 서버 순수 모듈 하나가 소유하고 Worker·
  Monitor·알림은 같은 WaitReason을 소비한다" → ADR
- 후보 2: 지연·조치 필요 알림은 (bead, 종류, 사유)당 1회이며 사유가 사라지면 키를 비워
  재발 시 다시 알리고 해소 알림은 없다 — 되돌리기 어려움(알림 습관), 대안 존재(매 주기
  반복·해소 알림), 범위 넓음(모든 대기 종류). `summary`: "대기 지연 알림은
  (bead, 종류, 사유)당 1회이고 사유 소멸 뒤 재발에만 다시 보내며 해소 알림은 보내지
  않는다" → ADR
- 후보 3: `[지금 확인]`은 관측기 tick을 호스트 단위로 실행하고 watch를 고르지 않는다 —
  CLI 형태에 따른 실행 세부, 되돌리기 쉬움 → ADR 아님.
