---
scope:
  - server/worker/scheduler.js
  - server/worker/provider-health.js
  - server/worker/queue-store.js
  - app/views/worker/lane-model.js
  - app/views/worker/lanes.js
  - app/views/worker/wait-vocabulary.js
  - docs/superpowers/specs/2026-08-24-worker-provider-outage-hold-resume-design.md
---

# 공급자 게이트의 판정은 서버가 내리고 기록으로 보인다 — 러너 무관 계정 사다리, `provider_gate` admission 기록, 상한 target의 재시작 1회 프로브

Bead: UI-1l3a · route: spec_backed · 2026-09-17

## 1. 배경과 문제 (2026-09-17 실측)

PROSTATE 리그의 quick_fix `PROSTATE-u53`(오케스트레이션 codex `astra`)이 자동 진행을
켠 뒤에도 출발하지 않았고, 대기 카드에는 사유·게이트 칩·`↻ 지금 프로브`·`[지금 시작]`
이 하나도 없었다. 원인은 셋이 겹친 것이다.

1. **서버 게이트의 codex 계정 사다리가 한 층 짧다.** 승인 스펙
   `2026-08-24-worker-provider-outage-hold-resume-design.md` §6(rev2)은 `usage_limit`
   게이트의 계정 해석을 "bead pin → workspace 기본값 → 카탈로그 `active_key`"로
   정했다. `scheduler.js providerDispatchHeld`는 claude에만 셋째 층
   (`accountCatalog.activeClaude`)을 타고, codex는 `accounts.codex`가 `null`이면 곧
   "해석 불가"로 막는다. PROSTATE에는 codex 저장소 기본 계정이 없고 u53에 핀도 없어
   서버는 막았다. 실측으로 codex 활성 계정은 `user-HTfe32j6…`(prolite, 7%)이고 보류
   target 계정은 `user-pFUqW7Bk…::3fdb…`(business, 0%)이므로, 사다리를 다 타면 이 행은
   흐른다. codex 런치 자체도 계정이 `null`이면 기본 `CODEX_HOME`(= 활성 로그인)으로
   나가고(`resolveLaunchAccounts`), 선제 전환 판정(`applyPreemptSwitch`)도 이미
   `resolved.accounts[runner] ?? listed.active_key`를 쓴다. 게이트만 어긋나 있다.
2. **게이트 거절이 조용하다.** `dispatch()`는 `providerDispatchHeld`가 `true`면 레인
   예약을 풀고 `return`한다. 다른 모든 skip(`recordSkipReason`)은 admission 기록을
   남겨 화면이 배지나 칩을 그리는데, 이 경로만 기록이 없다. 프론트
   `lane-model.js providerGate`는 자체 계정 해석(핀 → 저장소 기본 → 활성 로그인)으로
   칩을 그리므로, 서버와 프론트가 다르게 판정하면 "서버는 막고 화면은 비어 있는"
   카드가 된다. 칩이 없으니 `providerProbeButtonTemplate`·`startNowButtonTemplate`이
   기대는 `item.gate`도 없고, `provider_hold` 대기 사유(`wait-judgment.js`)는
   `provider_hold` 상태의 attempt가 묶인 Bead에만 붙어(n50 attempt는 `stopped`) 두
   출구가 모두 사라진다.
3. **상한에 걸린 `usage_limit` target은 재시작에도 재판정되지 않는다.**
   `provider-health.js start → sync → scheduleTarget`은 `rearm_count ≥ 3` 또는 24시간이
   지난 target을 프로브 한 번 없이 즉시 다시 `disarmTarget`한다. PROSTATE의 target은
   9-15부터 `auto_resume_disarmed:rearm_cap`으로 남아, 사용량이 회복되고 서버가 하룻밤
   세 번 재시작해도 레코드가 그대로였다. ADR UI-o5ll(승계 UI-a8rq)은 "상한은 자동
   일정을 멈추는 것"이라 적었으므로 이 조항의 supersede가 필요하다.

## 2. 목표와 사용자 결정 (2026-09-17)

- 서버 게이트의 계정 사다리는 **러너 무관**하게 §6의 세 층을 다 탄다. 핀이 없으면
  현재 로그인한 계정이 기본값이다(사용자 결정 2).
- 게이트가 막은 행에는 **반드시** 4a 게이트 칩과 그 행의 출구(`↻ 지금 프로브`,
  `[지금 시작]`)가 선다. 판정은 서버가 내리고 기록으로 공개하며, 프론트는 그 기록을
  우선 그린다.
- 상한으로 자동 프로브가 멎은 `usage_limit` target은 **서버 재시작 시 한 번** 다시
  프로브한다(사용자 결정 1 — "재시작 시 1회만"). 그 외 시각의 출구는 종전대로
  `↻ 지금 프로브`다. 느린 주기 자동 프로브는 채택하지 않는다.
- 세 층 어디에도 계정이 없거나 카탈로그 조회가 실패하면 승인 §6대로 fail-closed로
  막되, 그 사실이 칩으로 보인다. 이 항목은 새 결정이 아니라 §6의 유지다.

비목표는 §7에 있다.

## 3. 설계

### 3.1 서버 게이트 — 러너 무관 사다리와 판정 객체 (`server/worker/scheduler.js`)

`providerDispatchHeld(workspace, runner, accounts)`는 boolean 대신 판정 객체를
돌려준다.

```js
/** @typedef {{ held: false }
 *  | { held: true, runner: string, kind: 'outage'|'usage_limit',
 *      account: string|null, unresolved: boolean }} ProviderGateVerdict */
```

- `outage` target이 있으면 `{ held:true, kind:'outage', account:null, unresolved:false }`.
- `usage_limit`에서 계정 해석은 러너 무관 세 층이다: `accounts[runner]`(핀 또는
  저장소 기본, `resolveDispatchSettings`가 이미 합친 값) → 카탈로그 활성 계정.
  활성 계정은 claude가 `activeClaude().account.email`, codex가
  `listCodex().active_key`다(`account-catalog.js`에 `activeCodex`를 더하지 않고
  `listCodex`의 `active_key`를 그대로 쓴다 — 같은 파일의 주석이 그 이유를 이미
  적고 있다).
- 해석된 계정이 어느 `usage_limit` target의 `account`와 같으면
  `{ held:true, kind:'usage_limit', account:<그 계정>, unresolved:false }`.
- 세 층이 모두 비었거나 카탈로그 조회가 실패하면
  `{ held:true, kind:'usage_limit', account:null, unresolved:true }` — §6의
  fail-closed다. `account:null`인 `usage_limit` target(§6 F3)이 서 있을 때도 같은
  모양이다.
- 그 외 `{ held:false }`.

`dispatch()`의 게이트 분기는 판정이 `held`면 예약을 풀기 전에
`recordSkipReason(workspace, bead_id, 'provider_gate', { gate })`를 부른다. `gate`는
판정 객체에서 `runner`·`kind`·`account`·`unresolved`만 담는다. `refuseDispatch`는
쓰지 않는다 — `dispatch_refused`에 넣으면 외부 tick까지 후보에서 빠지는데, 이 행은
보류가 풀리는 즉시 흘러야 하므로 매 pass 후보로 남는 것이 맞다. 매 pass의 기록은
`recordAdmission`의 같은-기록 no-op 가드가 흡수하므로 revision과 fanout이 뛰지
않는다. `start_now_bypass`(명시 `[지금 시작]`)는 종전대로 게이트를 건너뛴다.

판정이 `held:false`인데 그 Bead의 admission 기록이 `provider_gate`이면 dispatch가
이어지고 기존 `clearAdmission`(런치 직후)이 지운다. 런치 전에 다른 사유로 거절되면
그 사유가 기록을 덮어쓴다(기존 규칙).

### 3.2 기록 스키마와 정리 (`server/worker/queue-store.js`)

`AdmissionRecord`에 선택 필드를 더한다.

```js
 * @property {{ runner: string, kind: 'outage'|'usage_limit',
 *              account: string|null, unresolved: boolean }} [gate]
```

- `recordAdmission`은 `gate`를 정규화해 저장하고, 같은-기록 no-op 비교에
  `JSON.stringify(gate)`를 포함한다(`blockers`와 같은 방식). `normalizeQueue`의
  admission 정규화는 이 필드를 보존한다.
- **hold가 사라질 때 기록도 사라진다.** `recoverProviderTarget`이 어느 러너의
  `targets`를 비워 러너 항목을 지우는 mutation 안에서, `admission` 가운데
  `reason === 'provider_gate'`이고 `gate.runner`가 그 러너인 기록을 함께 지운다.
  자동 진행이 꺼져 dispatch pass가 돌지 않는 저장소에서도 낡은 칩이 남지 않게 하는
  서버 쪽 정리다. 같은 mutation이므로 revision은 한 번 뛴다.

### 3.3 프론트 — 기록 우선, 자체 판정은 예측 (`app/views/worker/lane-model.js`)

- `autoSkipReason`은 `reason === 'provider_gate'`에 `''`를 돌려준다. 큐 행의 공급자
  게이트는 ADR UI-3pu9(UI-8gem 승계 조항)대로 슬롯 4a 게이트 칩 한 층에만 서고 배지·본문·집계에는
  들지 않는다.
- 큐 행 게이트 부착 루프에서 공급자 게이트의 재료를 고르는 순서를 둔다.
  1. 그 Bead의 admission 기록이 `provider_gate`이고 `gate.runner`의 `provider_hold`가
     스냅샷에 **아직 서 있으면**, 기록으로 칩을 만든다(`providerGateFromRecord`).
     target은 `gate.kind`와 `gate.account`로 찾고, `unresolved`면 그 러너의
     `usage_limit` target 가운데 첫 항목을 재료로 쓴다. 칩 라벨은 종전
     `providerHoldBadgeText`의 것이고, 팝업 줄에 `계정: 미해석 — 핀·저장소 기본·활성
     로그인 어디에도 <runner> 계정이 없음` 한 줄이 더 붙는다(`unresolved`일 때만).
     `probe_ready`·`since`·`runner`·`next_at`은 기존 `providerGate`와 같은 규칙이다.
  2. 기록이 없거나 그 러너의 hold가 이미 사라졌으면 종전 `providerGate(...)` 자체
     판정을 쓴다. 이 층은 서버 pass가 아직 돌지 않은 행(방금 앉은 행, 자동 진행이
     꺼진 저장소의 행)의 **예측**이다. 계정 해석 `resolvedAccountOf`의 세 층은 3.1의
     서버 사다리와 같으므로 두 층이 어긋나는 경우는 카탈로그 실패·조회 시차뿐이며,
     그때는 기록이 이긴다.
- hold가 사라진 뒤의 낡은 `provider_gate` 기록은 위 1의 조건으로 무시된다(3.2의
  서버 정리와 겹치는 fail-quiet 방어).
- `lanes.js`의 `providerProbeButtonTemplate`·`startNowButtonTemplate`·`gateChipTemplate`
  은 `item.gate`만 보므로 바뀌지 않는다. UI-3pu9(착지, 미배포)의 `manual_only` 규칙과도
  독립이다 — 게이트가 선 행의 `[지금 시작]`은 그 스펙이 유지한다고 정한 것과 같다.

### 3.4 재시작 1회 프로브 (`server/worker/provider-health.js`)

- `start(workspace)`(attach 시작 경로 `startWorkerAttachment`에서 프로세스당 워크스페이스
  한 번 호출)가 `sync(workspace)` 뒤에 `probeCapped(workspace)`를 한 번 부른다.
  `sync()`의 다른 호출자(hold 변경 뒤 재동기화)는 부르지 않는다 — "재시작 시 1회"다.
- `probeCapped`는 각 러너 hold의 `usage_limit` target 가운데 `account !== null`이고
  `rearm_count >= USAGE_REARM_CAP || now() - since >= HOLD_AGE_CAP_MS`인 것만 골라,
  `in_flight`가 아니면 무장된 타이머를 지우고 `runTarget(...)`을 지금 부른다
  (`probeNow`와 같은 발화 규칙, 대상만 상한 target으로 좁힘). `failures`는 유지한다.
- 결과 처리는 기존 경로다. 성공 → `recoverProviderTarget`·`providerRecovered`·`tick`.
  `usage_limit` 실패 → `rearm_count + 1`·`last_error` 갱신 뒤 `sync()`가 다시
  `disarmTarget`한다.
- **알림은 target당 한 번이다.** `disarmTarget`은 `last_error` 마커 비교 대신 durable
  `disarm_notified_at`(number)를 본다: 없으면 알림을 보내고 patch로 기록하며, 있으면
  마커만 갱신하고 알림은 건너뛴다. `updateProviderTarget`의 허용 patch 키에
  `disarm_notified_at`을 더한다. 재시작마다 같은 target으로 알림이 반복되는 것을
  막는다. 성공해 target이 지워지면 필드도 함께 사라진다.
- `next_probe_at`은 건드리지 않는다. 상한 target의 화면 값은 종전대로
  `publicProviderHolds`가 `null`로 계산하고, 칩 문구는 `자동 재개 꺼짐 · ↻ 지금 프로브
  필요`에 `재시작 시 1회 자동 프로브`를 덧붙인다(3.5).

### 3.5 어휘 (`app/views/worker/wait-vocabulary.js`)

- `gate-provider_usage` 행 `when`: "러너의 계정 한도 보류 — target에 계정이 있으면 그
  계정을 쓰는 행과 계정을 해석할 수 없는 행에, 없으면 러너의 모든 행에".
  `release`: "리셋 뒤 자동 프로브 · 소진이면 서버 재시작 시 1회 자동 프로브 또는
  ↻ 지금 프로브".
- `provider_hold-usage_limit` 행 `release`도 같은 문장으로 맞춘다.
- 새 kind·새 슬롯·새 칩은 없다(ADR 0014). 범례는 표를 읽으므로 따로 고치지 않는다.

### 3.6 정본 반영

- `2026-08-24-worker-provider-outage-hold-resume-design.md` §6 게이트 항목 뒤에
  **정정(UI-1l3a)** 문단: 계정 사다리 세 층은 러너 무관이며(codex는 `listCodex().active_key`),
  게이트 거절은 `provider_gate` admission 기록으로 공개되고, 화면은 그 기록을 4a 칩의
  재료로 우선 쓴다.
- 같은 스펙 §7.4 정정(UI-o5ll) 문단 뒤에 **정정(UI-1l3a)** 문단: 상한으로 멎은
  target은 서버 재시작 시 한 번 자동 프로브되며, disarm 알림은 target당 한 번이다.
- ADR은 Finish에서 `adr` 스킬로 만든다(아래 결정 절).

## 4. 검토한 대안

- **기각 — 사다리만 고치고 판정은 양쪽이 각자 계산(최소 변경).** PROSTATE는 풀리지만
  카탈로그 실패·조회 시차·앞으로의 규칙 변경에서 다시 "서버는 막고 화면은 빈" 카드가
  생기고, 조용한 거절이 그대로 남는다. 서버 기록 한 줄이 그 침묵을 없앤다.
- **기각 — 판정을 서버로 완전히 옮기고 프론트 자체 판정 삭제.** 자동 진행이 꺼진
  저장소는 dispatch pass가 게이트 전에 돌아 나가므로 기록이 생기지 않고, UI-3pu9가
  약속한 "게이트 선 행의 `[지금 시작]`"이 그 저장소에서 사라진다. 별도 판정 pass를
  두는 것은 이 결함의 크기에 맞지 않는다. 프론트 예측 층을 남기고 기록이 이기게 한다.
- **기각 — 상한 뒤 느린 자동 프로브(1시간 간격).** 사용자 결정 1로 기각. 재시작 1회가
  "지금 기준으로 다시 본다"는 요구를 비용 없이 채우고, 판정자는 여전히 프로브다.
- **기각 — 계정 미해석 행 통과.** §6 fail-closed를 뒤집는 결정이고, 한도 계정으로 다시
  나가 attempt 기록만 쌓을 위험이 있다. 사용자 결정 2는 "핀 없으면 활성 로그인으로
  해석"이며, 그 층까지 다 타고도 비는 경우만 여기에 남는다.

## 5. 검증과 인수 기준

### Test scope

- `server/worker/scheduler.test.js` (`scheduler provider hold and recovery` describe):
  - 핀·저장소 기본이 없는 codex 후보가 `listCodex().active_key`로 해석되어, 활성 계정이
    보류 계정과 다르면 흐른다(스폰 1건, admission 없음).
  - 활성 계정이 보류 계정과 같으면 막히고 `admission[bead]`가
    `{ reason:'provider_gate', gate:{ runner:'codex', kind:'usage_limit', account:<held>, unresolved:false } }`다.
  - 활성 계정이 없거나 `listCodex`가 실패하면 막히고 `gate.unresolved === true`,
    `gate.account === null`이다. 기존 claude fail-closed 테스트에도 같은 기록 기대를
    더한다.
  - `outage` 게이트 거절도 `gate.kind:'outage'`를 기록한다.
  - 같은 조건의 두 번째 tick은 revision을 올리지 않는다(no-op 가드).
  - 기록이 있는 Bead가 hold 해제 뒤 런치되면 기록이 사라진다.
- `server/worker/queue-store.test.js`:
  - `recordAdmission`이 `gate`를 저장하고 같은 `gate`는 no-op, 다른 `gate`는 갱신이다.
  - `recoverProviderTarget`으로 러너 항목이 지워지면 그 러너의 `provider_gate` 기록이
    같은 mutation에서 지워지고 다른 러너·다른 사유의 기록은 남는다.
  - `updateProviderTarget`이 `disarm_notified_at`을 받는다.
- `server/worker/provider-health.test.js`:
  - `start()`가 상한(`rearm_count:3`) target을 한 번 프로브한다(spawn 1회); 실패면
    `rearm_count`가 4가 되고 타이머는 무장되지 않으며 알림은 첫 disarm 때 한 번만 온다
    (`start` → `stop` → `start` 두 번 반복해도 `providerAutoResumeDisarmed` 1회).
  - 성공이면 target이 지워지고 `providerRecovered`가 온다.
  - 24시간 상한 target도 `start()`에서 한 번 프로브된다.
  - `sync()` 단독 호출은 상한 target을 프로브하지 않는다.
  - `in_flight`인 target은 건너뛴다.
  - 기존 "leaves a rearm-capped usage target…" 두 테스트는 위 기대로 바꾼다.
- `app/views/worker/lane-model.test.js`:
  - admission `provider_gate` 기록은 배지를 만들지 않는다(`autoSkipReason` `''`).
  - 기록이 있고 hold가 서 있으면 자체 판정이 칩을 못 그리는 조건(활성 계정 없음)에서도
    `gate.kind === 'provider_usage'`·`probe_ready === true`·팝업에 `계정: 미해석` 줄이
    있다.
  - 기록이 있어도 그 러너의 hold가 없으면 칩이 없다.
  - 기록이 없으면 종전 자체 판정 테스트가 그대로 통과한다.
- `app/views/worker/lanes.test.js`: 기록으로 선 게이트의 직렬 선두 행에 `↻ 지금 프로브`
  와 `[지금 시작]`이 둘 다 있다.
- `app/views/worker/wait-vocabulary.test.js`: 두 행의 문구 갱신.

### 절차

Pre-Handoff Validation 묶음(`npm run tsc`, `npm run lint`, prettier, `npx vitest run
--reporter=dot`)이 통과하고, 배포 뒤 공유 서버에서 PROSTATE 탭을 확인한다.

### 인수 기준

- 배포 직후 PROSTATE `queue.json`의 `provider_hold.codex`가 그대로인 상태에서, 자동
  진행이 켜져 있으면 `PROSTATE-u53`이 다음 tick에 출발한다(활성 codex 계정 ≠ 보류
  계정). 출발 전이라면 카드에 `한도 대기` 칩과 두 출구가 보인다 — 둘 중 하나가 아닌
  상태(칩도 없고 출발도 없음)는 실패다.
- 재시작 직후 서버 로그 없이도 `queue.json`의 그 target `rearm_count`가 1 올라가거나
  target이 사라진다(재시작 프로브가 돌았다는 증거).
- 저장소 기본 codex 계정을 보류 계정으로 잠시 지정하면 u53 행에 칩·`↻ 지금
  프로브`·`[지금 시작]`이 서고, 되돌리면 다음 tick에 칩이 사라진다(390px 캡처 1장,
  iframe 래퍼).

## 6. 구현 unit 후보 (advisory)

- `server-gate`: 3.1·3.2 — `scheduler.js providerDispatchHeld`·dispatch 분기,
  `queue-store.js AdmissionRecord.gate`·`recoverProviderTarget` 정리.
- `restart-probe`: 3.4 — `provider-health.js probeCapped`·`disarm_notified_at`.
- `front-chip`: 3.3·3.5 — `lane-model.js providerGateFromRecord`·`autoSkipReason`,
  `wait-vocabulary.js`.

## 7. 비목표

- `publicProviderHolds`(`worker-handlers.js`)가 상한 상수를 따로 하드코딩하는 문제
  (09-09 스펙 §8 관찰)는 그대로 둔다 — 이 설계는 상수와 `next_probe_at` 계산을 바꾸지
  않는다.
- `wait-judgment.js`의 `provider_hold` 대기 사유를 attempt 없는 큐 행에 붙이지 않는다
  — UI-3pu9(UI-8gem 승계 조항)가 큐 행의 공급자 게이트를 칩 한 층으로 정했다.
- 상한 뒤 주기적 자동 프로브, `usage_limit` 상한 상수(3회·24시간) 변경, `account:null`
  target(§6 F3)의 프로브.
- 저장소 설정 카드의 codex 기본 계정 안내 문구. 사다리가 활성 로그인까지 타면 미설정
  저장소도 정상 동작한다.
- ADR 0052의 허용 계정 집합·선제 전환·`provider_limit_policy`.

## 8. 경계·후속

이 설계의 형제 스펙은 없다 — 한 저장소·한 route·한 구현 단위다.

- 관찰: `publicProviderHolds`의 상한 상수 중복(비목표) — 값이 어긋나면 화면
  `next_probe_at`이 실제와 다르나 이 설계는 값을 바꾸지 않아 지금은 무해하다.
- 관찰: UI-3pu9(8c94706)는 main에 착지했으나 배포 SHA(50a6d67)에 없다. 이 설계의
  구현은 main 위에서 하므로 3pu9의 `startNowButtonTemplate` 변경과 같은 파일을 만난다.
  판정은 겹치지 않는다(3pu9는 자동 꺼짐·유예의 버튼을 빼고, 이 설계는 게이트의 재료를
  더한다).
- 관찰: PROSTATE의 즉시 해소는 배포로 얻는다. 배포 전 운영 조치(수동 프로브·계정 핀)는
  이 설계의 전제가 아니다.

## 결정 (ADR 후보)

- 전제: ADR UI-3pu9 — UI-8gem에서 승계한 조항대로 큐 행의 공급자 게이트는 슬롯 4a 게이트 칩 한 층에만 선다. 이
  설계는 서버 기록을 그 칩의 재료로만 쓰고 배지·집계를 만들지 않는다.
- 전제: ADR 0052 — 한도 전환은 허용 집합 안에서 attempt 단위로 일어난다. 이 설계는
  게이트의 계정 해석만 다루고 전환 후보·정책을 건드리지 않는다.
- 전제: ADR 0014 — 새 슬롯·칩 없이 기존 4a 칩의 팝업 줄만 늘린다.
- 공급자 게이트의 판정은 서버가 러너 무관 세 층 사다리(핀 → 저장소 기본 → 활성
  로그인)로 내리고 `provider_gate` admission 기록으로 공개하며, 화면은 그 기록을 4a 칩의
  재료로 우선 쓴다; 계정을 해석할 수 없으면 fail-closed로 막되 칩에 보이고, 상한으로
  자동 프로브가 멎은 `usage_limit` target은 서버 재시작 시 한 번 자동 프로브된다. 세
  조건 판단: 되돌림 비용이 있다(admission 스키마·프론트 두 층 우선순위·프로브 시작
  경로·알림 durable 필드와 테스트). 배경 없이 보면 의외다(코드만 보면 왜 프론트가 자체
  판정 위에 서버 기록을 두는지, 왜 재시작에만 프로브하고 주기 프로브는 없는지 드러나지
  않는다). 실재 대안이 있다(양쪽 각자 판정, 서버 단독 판정, 느린 주기 프로브, 미해석
  통과). `summary`: "공급자 게이트의 판정은 서버가 러너 무관 세 층 사다리로 내리고
  provider_gate admission 기록으로 공개하며 화면은 그 기록을 4a 칩의 재료로 우선 쓴다 —
  계정 미해석은 fail-closed로 막되 칩에 보이고, 상한으로 멎은 usage_limit target은 서버
  재시작 시 한 번 자동 프로브된다" → ADR, supersede UI-a8rq
