---
scope:
  - server/worker/scheduler.js
  - server/worker/queue-store.js
  - server/worker/queue-hold.js
  - server/worker/attach.js
  - server/ws/worker-handlers.js
  - app/protocol.js
  - app/views/worker/
  - app/views/monitor/index.js
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
  - docs/superpowers/specs/2026-09-02-worker-operation-surface-unify-design.md
---

# 일시 장애 한 번이 Worker 영구 정지로 굳지 않게 한다 — 자동 재개의 일시 거절 재시도, 고아 재시도 대기 복구, 낡은 admission 표시 정리, 실행 중 칸의 ✕ 내리기와 [지금 재시도]

## 배경

**2026-10-01 관측.** 맥 49.7일 가동 결함으로 07:04부터 임시 포트가 고갈돼 bd의 Dolt 연결이 실패했고, 09:17 재부팅으로
회복했다. 그 한 번의 장애가 세 경로에서 사람 클릭 없이는 풀리지 않는 정지로 굳었다.

1. **자동 재개 1회성 소비.** `PROSTATE-3f9`·`Analysis-7hn5`는 Claude 세션 한도(09:00 해제)로 멈춰 있었다. 09:01 해제 때
   재개를 시도했지만 `bd_snapshot_failed`로 거절됐다. 영수증은 거절 사유와 관계없이 소비됐고 보류 기록은 이미 지워져
   있어서, 다시 시도하는 경로가 없다. 카드는 계속 `⏳ 공급자 보류`만 보인다.
2. **고아 재시도 대기.** `Analysis-owzn`은 외부 대기 카드의 [이어하기]로 대기 레인 밖에서 시작했고, 00:47에 재시도
   1/3(00:49)이 예약됐다. 00:49에 `runDueRetries`가 "레인 밖"이라며 lineage를 닫았다. 그러나 attempt는 `retry_wait`로
   남아 일반 출발도 막는다. 13시간 동안 정지했다. 그동안 간 것은 `retry_stalled` 알림뿐이고, 타일에는 [폐기]만 있었다.
3. **낡은 admission 표시.** `PROSTATE-4ar`·`c3o` 카드에 09:01의 `⛔ bd_snapshot_failed`가 남았다. 자동 진행이 꺼진 rig에서는
   재평가가 없고 기록 시각도 보이지 않는다.

**사용자 결정(2026-10-01).**
- 재부팅·수동 재시작 뒤 자동 진행은 지금처럼 꺼진 채 두고 사용자가 직접 켠다.
- 자동 재개는 너무 자주 하지 말고 적당한 간격으로 한다.
- 점검 때문에 bd 연결을 늘리지 않는다. 연결이 쌓여 같은 고갈을 부르면 안 된다.
- 실행 중 칸의 모든 타일에 ✕가 있어야 한다. ✕는 폐기가 아니라 Worker에서 내리기이고, 실행 중인 이슈에도 둔다.
- 내린 Bead는 후보로 가고, 진행하다 내려왔다는 사실을 칩으로 보인다.
- 재시도 대기 타일에 [지금 재시도]를 둔다.

같은 날의 선행 대기 오분류(게시 push가 push 부재 증명을 깸)는 dotfiles `dotfiles-p10e2`의 계약 변경으로 원인이
사라지므로 여기서 다루지 않는다.

## 검증된 전제

beads-ui `d774ec9987655fb00016d8562518a6c6b1b9cb84` 기준.

- 자동 재개 루프는 `bead_running` 일부를 빼면 거절 사유와 무관하게 영수증을 소비하고 `auto_resume_refused`만 쓴다 — server/worker/scheduler.js:13697-13705, :13758
- 보류 해제 mutation이 target·보류를 지운 뒤에 영수증을 만든다 — server/worker/queue-store.js:8527-8576
- 원 설계는 거절 시 보류를 유지하고 사유를 알린다고 정했다 — docs/superpowers/specs/2026-08-24-worker-provider-outage-hold-resume-design.md:509
- 자동 재개 상한은 lineage당 재개 자식 하나이고, 거절된 재개는 자식을 만들지 않아 세지 않는다 — server/worker/queue-store.js:4718-4730
- 프로브는 상한 없이 보류 해제를 판정한다 — docs/superpowers/specs/2026-09-09-provider-outage-hold-release-design.md:27-34
- 보류가 없어도 `paused` + `provider_outage:*` attempt는 공급자 보류 타일로 그려진다 — app/views/worker/lane-model.js:1231, :1791-1838
- 거절 사유는 팝업 한 줄에만 보인다 — app/views/worker/gate-labels.js:63-71; app/views/worker/lanes.js:2429-2454
- 공급자 보류 배지는 슬롯 1의 배타 판정 배지다 — app/views/worker/gate-labels.js:32-55; docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md:283-288
- `runDueRetries`는 due lineage의 Bead가 대기 레인에 없으면 lineage를 닫는다 — server/worker/scheduler.js:16572-16587
- 그 결정(UI-c5ko D1)은 attempt 처분을 범위 밖으로 남겼다 — docs/superpowers/specs/2026-08-29-worker-retry-lineage-off-lane-design.md:66-67, :73-79, :207-210
- 최신 attempt가 `retry_wait`이면 일반 출발이 막히고, `dismissed_at`이 있으면 막지 않는다 — server/worker/scheduler.js:16837-16862, :17198
- lineage는 `retry_succeeded`로만 사라진다. `retry_deferred`는 `next_at`을 2분 뒤로 밀고, `retry_now`는 지금으로 당긴다(발신자 없음) — server/worker/queue-hold.js:186-232; server/worker/failure-class.js:74
- 큐 전체 retry-now WS op는 UI-a5l2가 없앴다 — docs/adr/UI-a5l2-guard-pre-tool-deny-no-kill-no-queue-hold.md:54-56
- 재시도 타이머는 `auto_advance`와 무관하게 돈다 — server/worker/scheduler.js:16398-16430
- `retry_wait` 타일에는 폐기 조작만 있다 — app/views/worker/running-grid.js:992-996
- 레인 제거 조작(`✕ 대기에서 빼기`, 후보로 드래그)은 대기 행에만 있다 — app/views/worker/lanes.js:3260-3330; app/views/worker/lane-drag.js:195-202
- 실행 중 칸에 그려지는 Bead는 먼저 claim되어 대기 행이 그려지지 않는다 — app/views/worker/lane-model.js:768-800, :3347-3359, :3839-3842
- 폐기는 `retry_wait` attempt의 lineage를 닫는다 — server/worker/scheduler.js:17899-17901
- 실행 중 조작은 ⏸(runner 종료, session·worktree·lane 보존)와 [폐기] 두 개이고 ■는 없앴다 — docs/superpowers/specs/2026-08-10-worker-recovered-control-discard-rollback-design.md:40-49; server/ws/worker-handlers.js:5240-5256
- 사람의 정지는 runner를 끄고 claim을 놓으며 스탬프를 되돌린다 — server/worker/scheduler.js:17318-17345
- 다시 대기에 넣은 Bead의 잔재는 자동 처분된다: 재개 가능 attempt가 있으면 같은 세션을 잇는다 — docs/superpowers/specs/2026-09-21-worker-wait-guard-simplification-design.md:174-190
- 처리된 실패(✕ dismiss)는 실행 중 칸에서 빠지지만 직렬 레인 점유는 그것을 해제로 읽지 않는다 — app/views/worker/lane-model.js:3975-3980; server/worker/scheduler.js:1128
- 카드 슬롯 표: 슬롯 1 정체성(상태)·슬롯 1 조작(오른쪽 끝, `✕ 대기에서 빼기` 포함)·슬롯 6 액션 foot — docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md:252-262
- `↩`는 발견 출처(`↩ from`)·워커 생성 출처 칩이 쓴다 — app/views/worker/lanes.js:1193, :1233; docs/superpowers/specs/2026-08-28-chip-grammar-unify-design.md:101-102
- Worker와 Monitor는 같은 타일 템플릿을 그린다 — app/views/worker/lane-model.js:1-10
- admission 기록은 `at`을 찍지만 카드는 시각을 그리지 않는다 — server/worker/queue-store.js:9772-9809; app/views/worker/lane-model.js:1847-1890; app/views/worker/lanes.js:3540-3547, :4513-4547
- 자동 진행이 꺼지면 `runPass`가 검사 전에 반환한다 — server/worker/scheduler.js:17090-17099
- `bd_snapshot_failed` 기록을 지우는 경로가 없다 — server/worker/queue-store.js:9855(`clearAdmission` 호출부: scheduler.js:11370, :12086, :13598, :16175)
- 재조정 루프는 60초마다 구독자 없이 돈다 — server/worker/attach.js:359, :1506-1520
- 사다리를 다 쓰면 attempt는 `failed`다 — docs/adr/UI-nuwy-same-worker-session-conversation-and-return.md:364
- 대화 레코드 상태별 타일 조작은 ADR이 정하고, 사람 인수 중 조작은 `폐기`뿐이다 — docs/adr/UI-nuwy-same-worker-session-conversation-and-return.md:87-91, :124
- 재시작 뒤 `auto_advance` 강제 꺼짐과 self-deploy 복원 — server/worker/queue-store.js:5925-5927; docs/superpowers/specs/2026-08-19-self-deploy-auto-advance-restore-design.md:32-34
- 미확인: `runDueRetries`의 신규 `dispatch` 경로가 대기 레인 밖 Bead를 출발시킬 수 있는지 — 세션 재개(`resume`) 경로는 [이어하기]가 레인 밖에서 쓰지만 신규 dispatch는 확인하지 않았다. D3의 수용 기준과 테스트가 이를 요구한다.

## 결정

- **D1 — 거절 사유 분류.** 아래 사유는 **일시**다: `bd_snapshot_failed`, `gh_unavailable`, `git_error`,
  `receipt_unreachable`, `workspace_accounts_unavailable`, `default_exec_preset_resolution_unavailable`,
  `default_exec_preset_resolution_failed`, `exec_restore_capture_failed`, `workflow_mode_record_failed`,
  `attempt_prerecord_failed`, `guard_hook_install_failed`, `serial_lane_occupied`. 그 밖의 사유는 표에 없는 새 사유까지
  모두 **영구**다. 모르는 사유를 무한히 재시도하지 않기 위해서다. 분류표는 서버 한 곳에 두고 D2·D3이 같이 쓴다.
- **D2 — 자동 재개의 일시 거절은 간격을 두고 다시 시도한다.** 거절을 기록할 때 attempt에 거절 시각과 연속 횟수를 함께
  남긴다. 재조정 sweep이 다음 조건을 모두 만족하는 attempt를 찾는다.
  - `status=paused`이고 cause가 `provider_outage:*`이다.
  - 그 러너에 활성 보류가 없다(있으면 프로브가 판정한다).
  - 대기 영수증이 없다.
  - 내린(D7) attempt가 아니다.
  - 마지막 거절이 일시 사유다.
  - 다음 간격이 지났다.

  그런 attempt에 대해 기존 자동 재개 경로로 영수증을 다시 만든다. 간격은 연속 거절 1·2·3회째에 5·15·30분이고, 그
  뒤로는 60분이다. 횟수 상한은 없다(프로브 무상한 결정과 같다). 재개가 성공하면 거절 기록을 지운다. 영구 거절은
  지금처럼 소비·기록하고 다시 시도하지 않는다.
- **D3 — 재시도 대기와 lineage의 불변식.** "내리지 않은 최신 구현 attempt가 `retry_wait`이면 그 Bead의 lineage가 있다."
  - `runDueRetries`는 대기 레인 소속을 보지 않는다. 레인 밖에서 시작한 attempt도 그 자리에서 재시도한다. 레인
    소속은 사다리를 포기시키지 않는다. 사람이 사다리를 끝내는 길은 [폐기](작업을 되돌림)와 ✕ 내리기(작업 보존,
    D7) 둘이고, 둘 다 lineage를 닫는다. 이 결정은 UI-c5ko D1("due 시점에 레인에 없으면 포기")을 대체한다.
  - due lineage의 출발이 영구 사유(D1)로 거절되면 lineage를 닫고 attempt를 `failed`로 정산한다. 일시 사유면 지금처럼
    미룬다. 이 규칙이 레인 밖 재시도가 2분마다 헛도는 것을 막는다.
  - 재조정 sweep이 불변식 위반(lineage 없는 `retry_wait`)을 찾으면, attempt의 `retry`(cause·attempts·origin)로
    lineage를 다시 만들고 `next_at`을 지금으로 둔다.
- **D4 — 일시 admission 표시.** 일시 사유(D1 표 중 admission 사유인 `bd_snapshot_failed`·`gh_unavailable`·`git_error`)
  배지는 기록 시각을 함께 보인다(예: `⛔ bd_snapshot_failed · 09:01`). 그 워크스페이스에서 스케줄러의 bd 읽기가 다음에
  성공하면 지운다. 성공 신호는 이미 일어나는 읽기에서만 얻고, 이를 위해 새 읽기를 만들지 않는다.
- **D5 — 보류 기록이 없는 공급자 보류 타일의 슬롯 1 배지.** 활성 보류가 있으면 현행 그대로다. 보류가 없고 일시 거절
  재시도 중이면 `⏳ 자동 재개 재시도`를 보이고, 슬롯 7에 `다음 <t>`를 둔다. 보류가 없고 영구 거절이면
  `⛔ 조치 필요 · 자동 재개 거부 <사유>`다. 기존 슬롯과 판정 글리프 규칙 안의 문구 변경이며 새 슬롯은 없다.
- **D6 — 호출 예산.** 재조정 sweep은 이미 60초마다 도는 reconcile에 붙는다. 메모리의 큐 상태만 읽고 bd·git·gh·네트워크
  호출을 하지 않는다. bd 호출은 재개·재시도를 실제로 실행할 때만 생긴다. 그 간격은 D2와 기존 사다리(2·5·15분)가
  정한다.
- **D7 — ✕ Worker에서 내리기.** 실행 중 칸의 모든 구현 attempt 타일(실행 중·일시정지·공급자 보류·재시도 대기·실패·
  확인 필요·세션 대기·외부 작업)의 슬롯 1 조작 오른쪽 끝에 `✕`를 둔다. 툴팁은 `Worker에서 내리기 — 작업은 보존`이고,
  확인 대화는 없다(⏸와 같다). 한 번의 durable 요청으로 아래를 모두 한다.
  - 살아 있는 runner는 ⏸와 같은 경로로 끈다. 세션·워크트리·브랜치는 보존한다.
  - 그 attempt의 자동 계속을 모두 멈춘다: 재시도 lineage, 자동 재개 영수증, 외부 작업 관찰. 원격 잡 자체는 취소하지 않는다.
  - attempt에 내린 시각과 그때의 상태를 남기고(예: `withdrawn: { at, from_status }`), 실행 중 칸에서 뺀다. 일반 출발을
    막지 않는다.
  - Bead를 대기 레인에서 빼고 Worker claim과 스탬프를 기존 정지 정산으로 되돌린다. 그래서 Bead는 후보에 선다.
  - 그 attempt가 잡고 있던 직렬 레인 점유를 푼다(현행 dismiss는 점유를 풀지 않는다 — 뒤 Bead가 막히지 않게).

  다시 대기에 넣으면 기존 잔재 자동 처분(2026-09-21 §3.4)이 내린 attempt를 재개 가능 attempt로 보고 같은 세션을
  잇는다. 그럴 수 없으면 같은 규칙의 다음 순서(잔재 이어 쓰기, 백업 후 새로 시작)를 탄다. 2026-08-10 §2.1("제어는 ⏸와
  [폐기] 두 개")에 세 번째 조작을 더하는 것이다. ⏸와 [폐기]의 뜻은 바꾸지 않는다. PR 대기·리뷰 세션 타일은 대상이
  아니다. 같은 Worker 세션 대화가 열려 있거나 사람이 인수한 타일에도 ✕를 두지 않는다. 그 상태의 조작은 ADR UI-nuwy의
  대화 레코드 표가 정한다.
- **D8 — `⏏ 내려옴` 칩.** 최신 구현 attempt가 내린 attempt인 후보 카드는 슬롯 1 정체성에 `⏏ 내려옴` 칩을 단다.
  `↩`는 발견·생성 출처 칩이 쓰므로 쓰지 않는다. 클릭하면 기존 칩 팝업으로 내린 시각, 그때 상태, 보존된 워크트리·
  브랜치, "다시 대기에 넣으면 이어간다"를 보인다. 그 Bead에 새 attempt가 생기거나, 보존된 워크트리가 폐기로 사라지거나,
  Bead가 닫히면 칩도 사라진다. 대기 행으로 다시 들어간 동안에도 출발 전까지 같은 칩을 단다.
- **D9 — [지금 재시도].** `retry_wait` 타일의 슬롯 6 액션 foot에 `[지금 재시도]`를 [폐기] 앞에 둔다. 누르면 그 Bead의
  lineage에 `retry_now`를 적용하고 `runDueRetries`를 부른다. Bead 단위 조작이라 UI-a5l2가 없앤 큐 전체 retry-now와는
  다르다. 사다리 횟수는 그대로 소비한다.
- **D10 — 슬롯 정본 갱신.** 구현과 같은 변경에서 2026-08-25 스펙 슬롯 표의 세 칸을 갱신한다: 슬롯 1 조작에
  `✕ Worker에서 내리기`(실행 중 칸 타일), 슬롯 1 정체성에 `⏏ 내려옴`, 슬롯 6에 `[지금 재시도]`. 2026-09-02 스펙 §3.2의
  `.op-btn` 적용 대상에도 두 버튼을 더한다. 마크업은 대기 행 ✕와 같은 `.op-btn--icon --ghost`다.
- 결정: 재시작 뒤 `auto_advance` 정책은 바꾸지 않는다 — 사용자가 직접 켠다(2026-10-01). UI-dckr의 fail-closed를 유지한다.
- 결정: 대기 카드에 "자동 진행 꺼짐"을 더하지 않는다 — UI-3pu9 결정(자동화 토글만 말한다)을 유지한다.

## 1. 동작과 수용 기준

1. 일시 사유로 자동 재개가 거절된 `paused` 공급자 보류 attempt는 사람 조작 없이 5분 뒤 다시 재개된다. 계속 거절되면
   15분·30분·이후 60분 간격으로 다시 시도한다. 성공하면 카드가 사라지고 거절 기록도 없다.
2. 영구 사유 거절은 다시 시도하지 않고, 카드 배지가 `⛔ 조치 필요 · 자동 재개 거부 <사유>`다.
3. 러너에 활성 보류가 있으면 D2 sweep은 영수증을 만들지 않는다.
4. 레인 밖에서 시작한 attempt의 재시도는 예정 시각에 실행된다. 서버에 `worker-queue-remove`가 와서 Bead가 레인에서
   빠져도 lineage는 남고 재시도는 실행된다.
5. [폐기]는 지금처럼 lineage를 닫는다(회귀 없음).
6. lineage 없는 `retry_wait` attempt는 다음 sweep(60초 안)에서 lineage를 되찾고 곧 재시도된다.
7. due 출발이 영구 사유로 거절되면 그 lineage는 닫히고 attempt는 `failed`다. 같은 Bead에 2분 주기 재시도가 남지 않는다.
8. 일시 admission 배지는 기록 시각을 보이고, 같은 워크스페이스의 bd 읽기가 성공하면 사라진다.
9. sweep 1회는 bd·git·gh 호출 수를 늘리지 않는다.
10. 실행 중 타일의 ✕는 runner를 끄고 타일을 빼며, Bead를 `open`인 후보로 돌리고 `⏏ 내려옴` 칩을 단다. 워크트리·
    브랜치·세션 기록은 남는다. 그 Bead가 잡던 직렬 레인 뒤 Bead는 다음 판정에서 출발할 수 있다.
11. 일시정지·공급자 보류·재시도 대기·실패·확인 필요·세션 대기·외부 작업 타일의 ✕도 같은 결과다. 내린 뒤에는
    자동 재개·재시도·외부 관찰이 그 attempt를 건드리지 않는다.
12. 내려온 Bead를 다시 대기에 넣으면 잔재 자동 처분이 같은 세션을 잇고, `⏏ 내려옴` 칩은 출발과 함께 사라진다.
13. `retry_wait` 타일의 [지금 재시도]는 예약 시각 전이라도 곧 재시도를 출발시킨다.
14. 배포 뒤 현재 정지(`PROSTATE-3f9`·`Analysis-7hn5`·`Analysis-owzn`)가 여전히 같은 상태라면 사람 조작 없이 풀린다.

## 2. 오류 처리

- sweep의 예외는 기록하고 삼킨다. 한 attempt의 실패가 다른 attempt나 reconcile 본체를 막지 않는다.
- 재개가 진행 중인 attempt(`resume_in_flight`·`claimed`)는 건너뛴다. sweep과 정상 경로가 같은 attempt를 두 번 출발시키지
  않는다.
- 영수증 재생성은 기존 세대 규칙을 따른다. 보류가 다시 생기면 기존 `discardStaleAutoResumePending`이 그 영수증을 정리한다.
- 분류표에 없는 거절 사유는 영구로 다룬다(D1).
- ✕ 내리기는 durable 요청이다. runner 종료와 기록 사이에 서버가 재시작되면 기존 제어 복구(2026-08-10 §2.2)가 남은
  단계를 마친다. 이미 끝난 attempt에 대한 ✕는 기록만 하고 성공으로 답한다. 폐기가 진행 중인 attempt의 ✕는 거부한다.
- 카드 표시 재료(내린 시각·상태)가 없으면 `⏏ 내려옴` 칩만 그리고 팝업 줄은 생략한다(fail-quiet).

## Test scope

RED→GREEN 시임:

1. server/worker/scheduler.test.js — 공급자 자동 재개:
   - `bd_snapshot_failed` 거절 뒤 시계를 5분 넘기면 sweep이 영수증을 만들고 재개된다.
   - 연속 거절 간격은 5·15·30·60분이다.
   - 영구 사유 거절은 재생성되지 않는다.
   - 활성 보류가 있으면 재생성되지 않는다.
   - 재개 성공은 거절 기록을 지운다.
2. server/worker/scheduler.test.js — 재시도 대기:
   - 레인 밖 due lineage가 출발한다. `worker-queue-remove` 뒤에도 lineage가 남아 출발한다.
   - [폐기]는 lineage를 닫는다(기존 동작 고정).
   - lineage 없는 `retry_wait`은 sweep이 lineage를 되살린다.
   - 영구 사유 출발 거절은 lineage를 닫고 `failed`다.
   - [지금 재시도] 요청은 `next_at`을 지금으로 당겨 출발시킨다.
3. server/worker/scheduler.test.js — sweep 1회 동안 가짜 bd·git 호출 카운터가 변하지 않는다.
4. server/worker/queue-store.test.js 또는 scheduler.test.js — `bd_snapshot_failed` admission이 bd 읽기 성공 신호로 지워진다.
5. server/worker/scheduler.test.js·server/ws/worker-handlers.test.js — ✕ 내리기:
   - 실행 중 attempt는 runner가 꺼지고 `withdrawn`이 기록되며 Bead가 레인에서 빠지고 claim이 풀린다.
   - held·공급자 보류·외부 작업 attempt는 lineage·영수증·관찰이 닫힌다.
   - 직렬 레인 점유가 풀린다.
   - 다시 대기에 넣으면 같은 세션 재개가 일어난다.
   - 폐기 진행 중이면 거부한다.
6. app/views/worker/*.test.js — 렌더링:
   - D5 배지 세 상태의 문구와 슬롯 7 시각, D4 admission 배지의 시각 꼬리.
   - 실행 중 칸 타일 종류마다 ✕가 슬롯 1 조작 오른쪽 끝에 있다.
   - 후보 카드의 `⏏ 내려옴` 칩과 팝업 줄.
   - `retry_wait` foot의 `[지금 재시도]`.
   - Monitor 탭도 같은 마크업이다.

## 검증

- AGENTS.md Pre-Handoff Validation: `npm run tsc`, `npm run lint`, prettier(변경 파일), `npx vitest run --reporter=dot`.
- UI 변경은 스크린샷으로 확인한다: 실행 중 칸 ✕, 후보 칩, [지금 재시도], 390px 폭.
- 배포 뒤 공유 서버 확인: 프로세스 경로·포트·HTTP 응답, 그리고 위 세 Bead의 attempt 상태 변화(풀렸거나 사람이 이미
  조작했음을 기록).

## 구현 unit 후보

- unit-01 서버 — D1~D4·D6·D7 서버 측·D9 서버 측(분류표, sweep, lineage 불변식, admission 정리, 내리기 요청, retry-now 요청, WS op).
- unit-02 화면·슬롯 정본 — D4·D5 표시, D7 ✕, D8 칩, D9 버튼, D10 스펙 표 갱신.

## 경계·후속

- 관찰: `UI-1e0s`(세션이 직접 close한 Bead의 대기 attempt가 남는 문제)는 인접하지만 원인이 다르다 — 이 스펙은 닫힌
  Bead의 대기 attempt를 처분하지 않는다.
- 관찰: 평소 bd 연결은 분당 100회를 넘는 것으로 추정된다(07:04~09:17에 Dolt 연결 TIME_WAIT 14,970개) — bd 호출량 자체는
  이 스펙 밖이다.
- 관찰: 재부팅 뒤 rig마다 자동 진행이 갈리는 현상(그 사이 상태 파일이 쓰인 rig만 꺼짐)은 사용자가 직접 켜는 운영으로
  둔다.

## 결정 (ADR 후보)

- 전제: ADR UI-nuwy — 사다리를 다 쓴 attempt는 `failed`이고, 공급자 자동 재개 거절은 `auto_resume_refused`로만
  기록된다. D3의 영구 거절 정산과 D2의 거절 기록이 이 형태를 따른다. 대화·인수 중 타일의 조작은 ADR의 대화 레코드
  표가 정하므로 D7은 그 타일에 ✕를 두지 않는다.
- 전제: ADR UI-a5l2 — 재시도 예약은 그 Bead의 계보만이고 큐 전체를 세우지 않는다. D2·D3·D9도 Bead 단위로만 움직인다.
- 일시 거절을 상태 재조정으로 다시 시도하고 재조정은 외부 호출을 하지 않는다(D1·D2·D6) — 스케줄러 내부 동작이라
  소비자 없이 되돌릴 수 있다 → ADR 아님
- 레인 소속으로 재시도 사다리를 포기하지 않는다(D3, UI-c5ko D1 대체) — 스펙 결정의 갱신이고 이를 담은 Accepted ADR이
  없으며 되돌리기 쉽다 → ADR 아님
- 실행 중 칸에 세 번째 조작 ✕ 내리기와 `⏏ 내려옴` 칩, [지금 재시도]를 둔다(D7~D10, 2026-08-10 §2.1 갱신) — 화면 조작과
  WS op 추가로 되돌리기 쉽고, 슬롯 정본은 D10이 갱신한다 → ADR 아님
