---
scope:
  - server/worker/queue-store.js
  - server/worker/scheduler.js
  - server/worker/provider-health.js
  - server/worker/notify.js
  - server/worker/continuation-refusal.js
  - app/views/worker/gate-labels.js
  - app/views/worker/lane-model.js
---

# 공급자 자동 재개 상한을 '진척 없는 반복'에만 적용하고 멈춘 카드는 조치 필요로 보인다

Bead: UI-87gn · route spec_backed · 2026-10-14 · 대체: `2026-08-24-worker-provider-outage-hold-resume-design.md` §8.1의 "계보당 1회" cap 정의

## 1. 목표

공급자 보류(사용량 한도·장애)가 풀린 뒤의 자동 재개 상한을 "자동 재개가 끝없이 헛도는 것"을 막는 장치로만 남긴다.

1. **진척은 상한을 되돌린다.** 자동 재개된 attempt가 Bead 브랜치에 커밋을 남긴 뒤 다시 보류되면, 다음 해제 때 또 자동 재개한다.
2. **커밋 없는 자동 재개 2회 연속이면 멈춘다.** 그때는 자동 재개하지 않고, 카드가 `⛔ 조치 필요 · 자동 재개 안 함 · 진척 없는 반복`으로 바뀐다. 해제된 보류의 리셋 시각 칩(`⏳ 공급자 보류 오전 12:30`)은 더 이상 보이지 않는다.
3. **재개하지 않은 해제는 회복이라 말하지 않는다.** 이때는 `provider_recovered · 공급자 회복` 타임라인과 `✅ 공급자 회복` 알림을 내지 않는다.

성공 기준:
- RL-ao9 재현: 첫 attempt A가 보류된 뒤 자동 재개된 B가 커밋 5개를 쌓고 다시 보류되면, B의 해제 때 `auto_resume_pending`에 B의 영수증이 생기고 B를 이어받는 새 attempt가 디스패치된다.
- A → 자동 재개 B(커밋 없음) → 자동 재개 C(커밋 없음) 순서에서는 C의 해제 때 영수증이 생기지 않는다. 그 대신 C에 `auto_resume_refused='no_progress'`와 `auto_resume_refusal.kind='permanent'`가 같은 정산 쓰기로 남는다. 두 탭의 카드 배지는 같은 조치 필요 문구다.
- C만 걸린 해제에서는 `provider_recovered` 타임라인과 `providerRecovered` 알림이 나가지 않는다. 대신 `provider_hold_released` 타임라인 한 줄과 `🚨 자동 재개 중단` 알림 한 번이 나간다.
- 사람이 `↻ 이어하기`로 재개한 attempt부터는 연속 횟수를 새로 센다.

## 2. 검증된 전제

- 지금 상한은 계보에 `auto_resume_kind:'provider_outage'` attempt가 하나라도 있으면 참이다. 진척은 보지 않는다 — server/worker/queue-store.js:5120-5132
- 같은 판정을 두 곳이 쓴다. 해제 정산(`settleProviderMembers`)과 거절 재무장(`rearmAutoResume`)이다 — server/worker/queue-store.js:9708, server/worker/queue-store.js:10017
- 정산은 상한에 걸린 attempt도 `recovered_attempt_ids`에 넣은 뒤 disarm한다 — server/worker/queue-store.js:9707-9710
- `releaseTarget`는 `recovered_ids[0]`만 보고 `provider_recovered` 타임라인과 `providerRecovered` 알림을 낸다. 그 attempt가 영수증을 받았는지는 확인하지 않는다 — server/worker/provider-health.js:913-975
- ADR UI-3v1h는 "재개 자격이 생긴 attempt가 하나라도 있으면 회복 알림을 한 번 보낸다"고 정한다 — docs/adr/UI-3v1h-provider-hold-server-global.md:60-64
- disarm 알림은 `reason:'auto_resume_cap'`일 때만 보내고 본문은 `사유: auto_resume_cap`이다 — server/worker/notify.js:989-1012, server/worker/notify.js:61
- 보류 시 attempt 패치는 `status`·`cause`·`cause_detail`·`finished_at`·usage만 쓴다. 브랜치 끝은 기록하지 않는다 — server/worker/scheduler.js:6570-6582
- attempt의 `head_oid`는 spawn 직전 `refs/heads/<bead_id>` 끝 읽기 결과로 갱신된다. 읽기에 실패하면 패치를 생략하므로 `makeAttempt`가 채운 `null`이나 사전 기록 값이 남는다 — server/worker/scheduler.js:12553, server/worker/scheduler.js:12695, server/worker/scheduler.js:4470-4487, server/worker/queue-store.js:3779
- 실행 중 선제 계정 전환(`live_preempt`)으로 멈춘 attempt는 `holdAttempt`가 아니라 `completeAttemptControl`로 `account_preempt:*` 일시정지가 되고, 그 `cause_detail`은 전환 정보만 담는다. 브랜치 끝은 기록하지 않는다 — server/worker/scheduler.js:18862, server/worker/queue-store.js:10174-10232
- `account_absent` 해제에서도 정산은 영수증을 만들지만, `releaseTarget`는 `provider_hold_released`만 남기고 회복·disarm 알림은 보내지 않는다 — server/worker/provider-health.js:913-947
- 같은 러너의 러너 전체 보류가 남아 있으면(`runner_held`) 카드 투영이 거절 기록을 숨긴다. 이때 리셋 시각 칩은 그 attempt의 `cause_detail.resets_at`에서 나온다 — app/views/worker/lane-model.js:1470-1483
- Worker 탭과 모니터는 같은 `buildLanes`로 카드 재료를 만든다 — app/views/worker/index.js:859, app/views/monitor/index.js:2308
- 정산이 실패한 저장소는 `scheduleSettleRetry`로 스스로 다시 정산한다 — server/worker/provider-health.js:812, server/worker/provider-health.js:900
- 거절 사유는 `continuationRefusalClass`가 분류한다. 목록에 없는 사유는 `permanent`다 — server/worker/continuation-refusal.js:77-95
- 연체 정산 sweep은 `permanent` 거절을 재시도하지 않는다 — server/worker/scheduler.js:14586
- 카드의 보류가 사라지면 `auto_resume_refusal` 기록이 슬롯 1 배타 배지를 정한다. `permanent`이면 `⛔ 조치 필요 · 자동 재개 거부 <reason>`이고 해결 안내는 `↻ 이어하기`·`✕`이다 — app/views/worker/lane-model.js:1483, app/views/worker/gate-labels.js:102-125
- 클라이언트에 상한 판정의 사본이 있다. 이 사본은 `auto_resume:'disarmed'`를 만들지만 `autoResumeText`는 그 값을 그리지 않는다 — app/views/worker/lane-model.js:1338-1385, app/views/worker/gate-labels.js:74-85
- 계정 전환 재개(`account_switch`)는 상한을 소비하지 않는다(현행 규칙 유지) — server/worker/queue-store.js:5126
- RL-ao9 실측: `-5`(19:29 보류) → 자동 재개된 `-6`(`head_oid` `5dcf5aa`, 19:31~23:28)이 브랜치를 `d0803648`까지 커밋 5개 이상 진척시켰다. 그런데도 00:31 해제 때 영수증 없이 남았고, `events.jsonl`에는 `provider_recovered`만 찍혔다 — `~/.local/state/bdui/researchline-da0399a554f7/queue.json`, `beads/RL-ao9/events.jsonl`, `git -C ~/GitHub/researchline log RL-ao9`

## 3. 설계

### 3.1 진척 기록 — 멈춘 시점의 브랜치 끝

attempt가 멈추는 두 지점에서 `branchTip(repo, bead_id)`로 Bead 브랜치 끝을 읽어, 그 멈춤을 쓰는 같은 패치에 싣는다(예: `stop_head_oid`).

- `holdAttempt`(공급자 보류)
- 실행 중 선제 전환의 `completeAttemptControl`(`account_preempt:*`): 이 경로의 `cause_detail` 작성이 그 값을 덮어 지우지 않아야 한다.

읽기에 실패하면 필드를 쓰지 않는다. 지금 `head_oid`를 다루는 방식과 같다.

attempt의 **진척**은 "멈춘 시점 브랜치 끝이 있고, 시작 `head_oid`가 문자열이고, 둘이 다르다"로 판정한다. 하나라도 없거나 `null`이면 진척 없음이다. 근거를 모르는 진척을 진척으로 치지 않기 위해서다. Bead 브랜치 밖의 커밋은 진척이 아니다.

결정: 진척 재료는 커밋(브랜치 끝 이동) 하나다 — 실행 시간·토큰은 헛도는 실행도 채우므로 재료가 아니다(사용자 결정 2026-10-14).

### 3.2 상한 판정 — 커밋 없는 자동 재개의 연속 횟수

해제되는 attempt X에서 출발해 `resumed_from`을 거슬러 올라가며 센다.

- 진척한 attempt를 만나면 멈춘다(종류 불문).
- `auto_resume_kind:'provider_outage'`이고 진척이 없으면 1을 더하고 계속 올라간다.
- `auto_resume_kind:'account_switch'`이고 진척이 없으면 세지 않고 지나간다. 계정 전환은 상한을 소비하지 않는다.
- 그 밖의 attempt를 만나면 멈춘다. 첫 디스패치, 사람의 `↻ 이어하기`, 그 밖의 재개가 여기에 해당한다.

센 값이 **2 이상이면** 상한이다. 이 판정 하나가 지금의 `providerAutoResumeCapped`를 대신하고, 정산·재무장의 두 호출 지점이 그대로 쓴다.

결정: 상한은 커밋 없는 자동 재개 연속 2회이고 서버 상수다(설정으로 노출하지 않는다) — 사용자 결정 2026-10-14.

### 3.3 disarm 기록 — 정산과 같은 쓰기

`settleProviderMembers`는 상한에 걸린 attempt를 `recovered_attempt_ids`에 넣지 않고 `disarmed_attempt_ids`에만 넣는다. 같은 큐 쓰기 안에서 그 attempt에 `auto_resume_refused:'no_progress'`와 `auto_resume_refusal:{at, count:1, kind:'permanent', next_at:null}`을 함께 쓴다.

`no_progress`는 `continuation-refusal.js`의 분류에서 `permanent`로 명시한다. 지금도 기본값이 `permanent`이지만, 명시해서 뜻을 고정한다. 그래서 연체 sweep은 이 attempt를 재시도하지 않는다.

### 3.4 해제 보고 — 재개한 것만 회복이다

`releaseTarget`는 해제 사유에 따라 다르게 남긴다.

**회복 해제(`reason:'recovered'`):** attempt마다 둘 중 하나만 남긴다.

- **영수증을 받은 attempt:** 지금처럼 `provider_recovered` 타임라인을 남긴다. `providerRecovered` 알림은 해제 한 번에 한 번이다. 해제가 영수증을 하나도 만들지 않았다면 이 알림을 보내지 않는다(ADR UI-3v1h 조항과 일치).
- **disarm된 attempt:** `provider_hold_released` 타임라인 한 줄을 남긴다. 요약은 `<runner> 보류 해제 · 자동 재개 안 함 — 진척 없는 자동 재개 2회 연속`이다. 기존 `providerAutoResumeDisarmed` 알림도 한 번 보낸다. 알림 본문은 `사유: 진척 없는 자동 재개 2회 연속(커밋 없음)`과 `다음: ↻ 이어하기로 수동 재개`로 바꾼다. `reason` 토큰 `auto_resume_cap`은 그대로 둔다.

**계정 목록 이탈 해제(`account_absent`):** 영수증을 받은 attempt와 disarm된 attempt 모두 `provider_hold_released` 타임라인만 남긴다. 회복 알림과 disarm 알림은 지금처럼 보내지 않는다. disarm된 attempt의 요약에는 위의 `자동 재개 안 함` 문구를 붙인다.

### 3.5 카드 — 같은 슬롯, 다른 문구

새 슬롯은 만들지 않는다. 보류가 사라진 카드의 슬롯 1 배타 배지는 지금처럼 `auto_resume_refusal`이 정한다(2026-10-01 stall-reconcile D5). `reason==='no_progress'`일 때만 문구를 `⛔ 조치 필요 · 자동 재개 안 함 · 진척 없는 반복`으로 바꾼다. `verdict:'action_required'`, 해제 줄, 해결 안내(`↻ 이어하기`·`✕`)는 그대로다. 두 탭은 같은 `buildLanes`와 공유 함수(`gate-labels.js`·`lane-model.js`)를 읽으므로 같은 배지를 낸다.

`no_progress` 거절 기록은 `runner_held`에 가려지지 않는다. 같은 러너에 다른 러너 전체 보류가 남아 있어도 이 attempt는 자동으로 재개되지 않기 때문이다. 이때도 배지는 조치 필요이고, 그 attempt의 지난 리셋 시각 칩은 보이지 않는다. 다른 거절 종류의 `runner_held` 처리는 지금 그대로다.

결정: 렌더러는 상한을 다시 판정하지 않는다 — 클라이언트의 계보 상한 사본을 지우고, `auto_resume:'disarmed'`는 서버가 쓴 기록에서만 나온다. 지금 이 값을 그리는 문구는 없다. 따라서 사본을 지워도 화면은 바뀌지 않는다.

### 3.6 비목표

- 이미 disarm된 채 기록 없이 멈춘 attempt(RL-ao9 `-6` 등)를 소급해서 재판정하지 않는다. 사람이 `↻ 이어하기`로 잇는다.
- 공급자 보류 자체의 해제 판정(프로브), 계정 전환 정책, 거절 재시도 사다리는 바꾸지 않는다.

## 4. 오류 처리

- 브랜치 끝 읽기 실패(git 오류, 브랜치 없음): 진척 기록이 없으므로 진척 없음으로 센다. 이것만으로 멈추지는 않는다. 연속 2회가 필요하다.
- 배포 전에 보류된 attempt(기록 필드 없음): 역시 진척 없음으로 센다. 그래도 직전 attempt가 자동 재개가 아니면 첫 자동 재개는 지금처럼 일어난다.
- 정산 쓰기 실패: 지금의 `scheduleSettleRetry` 경로를 그대로 쓴다. 거절 기록과 멤버십 삭제는 한 쓰기라서 반쯤 쓰인 상태가 없다.

## 5. 테스트

- `queue-store` 상한 판정 표 테스트: 진척한 자동 재개 → 상한 아님 / 무진척 1회 → 아님 / 무진척 2회 연속 → 상한 / 사이에 사람 재개 → 0부터 / 무진척 `account_switch` 경유 → 지나감 / 시작 `head_oid`가 `null`이거나 멈춘 시점 기록 없음 → 무진척 / B(`provider_outage`, 커밋 뒤 선제 전환) → S(`account_switch`, 무진척) → C(`provider_outage`, 무진척)에서 C → 상한 아님.
- `settleProviderMembers`: 상한 attempt는 영수증 없이 `no_progress`·`permanent` 기록을 갖고, `recovered_attempt_ids`에 없다.
- `scheduler`: `holdAttempt`의 보류 패치와 선제 전환 `completeAttemptControl`의 일시정지 패치 모두에 브랜치 끝이 실린다. 선제 전환의 `cause_detail`이 그 값을 지우지 않는다. 읽기 실패 시 필드가 없다.
- `provider-health` `releaseTarget`: 회복 해제에서 disarm만 있으면 `provider_recovered`·`providerRecovered`가 0건이고 `provider_hold_released`가 1건이다. 영수증과 disarm이 섞이면 회복 알림이 1건이다. `account_absent` 해제는 영수증·disarm 모두 `provider_hold_released`만 남기고, 회복·disarm 알림이 0건이다.
- `notify`: disarm 알림 본문의 새 사유 줄.
- `continuation-refusal`: `no_progress` → `permanent`.
- `gate-labels`/`lane-model`: `no_progress` 거절 배지 문구를 확인한다. 같은 러너에 다른 러너 전체 보류가 남아 있어도 `no_progress` attempt는 조치 필요 배지를 내고 리셋 시각 칩을 내지 않는다. 클라이언트가 계보만으로 `disarmed`를 만들지 않는다.
- 기존 모니터·Worker 카드 동일성 테스트가 그대로 통과한다.

## 6. 경계·후속

- 없음 — 한 저장소, 한 소유자, 한 착지로 끝난다.

## 7. 결정 (ADR 후보)

- 전제: ADR UI-3v1h — 해제는 전역 한 번 뒤 저장소별 멤버십 정산(자격 검사, 상한이면 disarm, 아니면 `provider_outage` 영수증)이고, 회복 알림은 재개 자격이 생긴 attempt가 있을 때만 보낸다는 조항을 따른다. 이 스펙은 그 "상한"의 정의만 바꾼다.
- 자동 재개 상한을 "커밋 없는 자동 재개 연속 2회"로 재정의한다 — 기본 제외 목록의 재시도 횟수·임계값이다. 판정 함수 하나와 멈춤 패치 필드 하나를 되돌리는 quick_fix로 되돌릴 수 있다(조건 1 실패) → ADR 아님
- disarm 카드 문구와 `provider_hold_released` 타임라인 재사용 — 기본 제외 목록의 칩·문구 → ADR 아님
