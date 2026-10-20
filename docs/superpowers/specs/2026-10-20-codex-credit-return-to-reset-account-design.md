---
scope:
  - server/worker/scheduler.js
  - server/worker/codex-switch-candidate.js
  - docs/adr/
---

# Codex 크레딧 실행의 리셋 계정 복귀 (UI-ftww)

## 1. 배경

UI-9y1k(2026-10-19)는 Codex 계정 한도에 닿은 실행이 창 여유 계정이 없을 때 크레딧이 허용된 계정으로
옮겨 가게 했다. 그런데 그 실행은 다른 계정의 창이 리셋돼 무료 여유가 생겨도 끝날 때까지 크레딧을 쓴다.

사용자 원문(2026-10-20, Telegram Hermes): "크레딧으로 진행하다가 계정중에 하나라도 사용량 리셋되면 그
계정으로 전환해서 진행하도록 하자". 같은 날 사용자는 두 해결 방식 중 **코드로 해결**을 골랐다(대안: switch
모드 저장소마다 Codex `preempt_pct`를 켜는 설정 해결 — 저장소마다 켜야 하고 새 저장소에서 빠진다).

## 2. 검증된 전제

기준 커밋: `e05fd5037b52b1f1d7e5faec13a504319832e4b9`.

- 실행 중 attempt를 다른 계정으로 옮기는 길은 `livePreemptPass` 하나다. 현재 계정 창 중 하나가 `preempt_pct` 이상이면 창 여유 후보를 골라 `preemptRunningAttempt`로 멈추고 같은 세션을 그 계정에서 재개한다 — server/worker/scheduler.js:4014-4108, :4115
- `livePreemptPass`는 `preempt_pct`가 null이거나 정책이 `wait`이거나 허용 목록이 비면 그 attempt를 건너뛰고, 세션 레인(`exec: 'session'`)·`review_session`·제어 중 attempt도 건너뛴다 — server/worker/scheduler.js:4020-4036
- 디스패치 때의 `applyPreemptSwitch`는 `preempt_pct`가 null이면 현재 계정에 usage_limit 보류가 있을 때만 계정을 옮긴다 — server/worker/scheduler.js:3907-3929, :3956-3972
- 두 길 모두 후보를 `selectProviderSwitchAccount(..., { max_pct: preempt_pct, kind: 'preempt' })`로 고르고, Codex의 preempt 선택은 창 여유 패스만 쓰며 크레딧 계정으로 가지 않는다 — server/worker/scheduler.js:3973-3979, :4064-4070; server/worker/codex-switch-candidate.js:153-166
- 창 여유 기준은 모든 창이 5h ≤ 80%, 그 밖 ≤ 90%(그리고 `max_pct` 미만)이다 — server/worker/codex-switch-candidate.js:31-61
- 크레딧 패스는 창 기준(5h ≤ 80%, 그 밖 ≤ 90%)을 넘은 계정에서 고른다. 그래서 크레딧 모드로 고른 계정이 아직 100% 미만일 수 있다(예: 주간 95%). 그 동안은 포함 한도를 쓰고, 창이 100%가 된 뒤에야 크레딧이 차감된다. 이번 복귀 조건은 "크레딧 패스로 골랐다"가 아니라 "현재 창이 100%로 관측됐다"이다 — server/worker/codex-switch-candidate.js:46-61, :169-197
- 일반 재개(`resolveContinuationForAttempt`)는 `external_wait_resume === true`일 때만 `applyPreemptSwitch`를 부르고, 일반 `resume`은 그 값을 넘기지 않는다 — server/worker/scheduler.js:17393-17396, :15625-15647
- 재개의 `prior_attempt` 계정 잠금은 계정 전환과 기다림 receipt에 계정만 내주고 기록된 나머지 묶음은 지킨다 — server/worker/scheduler.js:17251-17256
- 실시간 선제 전환은 `account_live_preempt` 타임라인 항목(요약 `<러너> 실행 중 선제 전환 <from> → <to> (<창> <pct>%)`)으로 남고, 디스패치 선제 전환은 계정 출처 `preempt_switch`로 남는다 — server/worker/scheduler.js:16179-16186, :3995-3999
- 실시간·디스패치 선제 전환은 정책을 다시 읽어 `mode`·`preempt_pct`가 그대로이고 고른 후보가 허용 목록에 남아 있을 때만 옮긴다 — server/worker/scheduler.js:3987-3991, :4085-4092
- 디스패치 선제 전환은 현재 계정 행이 없어도 그 계정에 usage_limit 보류가 있으면 후보를 고른다 — server/worker/scheduler.js:3952-3979
- Claude 후보 선택에는 크레딧 패스가 없다 — server/worker/scheduler.js:2042-2100
- 세션 브리지의 `--codex-home`은 한도로 실패한 실행 하나의 재실행에만 붙고, 전역 계정은 바꾸지 않는다 — dotfiles `d6be5465b1183a167642be3b58cd8d04b031e7a3` src/shared/skills/flow/workflow/references/implementation-transient-retry.md:233, :277; src/shared/skills/review/review/references/runtime-legs.md:22
- 실시간 패스는 실행 중 attempt가 있는 동안 60초마다 돈다 — server/worker/scheduler.js:213, :3121-3142, :14225
- Codex 계정 목록은 180초 캐시이고, `codex-auth list --json`(플래그 없음)이 모든 계정의 창을 `source: api`로 새로 읽는다 — server/routes/codex-usage.js:21; 2026-10-20 `codex-auth list --json` 실측(01·02·03 모두 `refresh.method: api`, `status: ok`)
- attempt는 실제로 돈 계정을 `codex_account`에 남기고 실시간 패스는 그 값으로 현재 계정을 읽는다 — server/worker/instructions-restart.js:71-77; server/worker/scheduler.js:4053-4054, :15149
- `preempt_pct`는 1~99 정수만 저장된다 — server/worker/queue-store.js:4950-4955
- 2026-10-20 실측: switch 모드인 모든 저장소의 Codex 정책이 `preempt_pct: null`이다(`~/.local/state/bdui/*/queue.json`) — 지금은 크레딧 실행이 다른 계정 리셋 뒤에도 끝까지 돈다.
- 기존 테스트가 "다른 후보가 모두 100%면 상한에 닿은 크레딧 실행은 계속 돈다"를 고정한다 — server/worker/scheduler.test.js:6846-6877
- ADR UI-9y1k: 선제 전환은 크레딧 계정으로 가지 않고, 상한은 다음 선택만 막으며 이미 시작한 실행은 멈추지 않고, 실행 중 attempt는 `preempt_pct`에서 정지해 허용 계정으로 재개한다 — docs/adr/UI-9y1k-codex-switch-order-and-credits.md:116-122, :227-229

## 3. 목표와 비목표

목표:
- Codex Worker attempt가 창이 소진된(100%) 계정으로 돌고 있을 때, 허용 목록에 창 여유 계정이 생기면
  `preempt_pct` 설정과 무관하게 그 계정으로 옮겨 같은 세션을 이어 간다.
- 같은 상황의 디스패치(새 attempt)와 재개(일반 재개·자동 재개 모두)도 소진 계정 대신 창 여유 계정으로 띄운다.

비목표:
- 세션 브리지(dotfiles codex-runner)의 실행 중 계정 교체. `--codex-home`은 실패한 실행 하나의 재실행에만
  붙고 다음 leg는 전역 계정으로 시작해, 한도면 후보 조회 API가 창 여유 계정을 먼저 고른다 — launch
  경계의 복귀는 이미 된다. 실행 중 교체는 dotfiles-8okoi spec §4.1이 불가로 적었다.
- Claude 러너. Claude 후보 선택에는 크레딧 패스가 없어 크레딧 실행이 생기지 않는다.
- 기다림(`wait`) 모드 저장소. 그 모드는 자동으로 다른 계정을 고르지 않는다(UI-np4t 조항).
- 세션 레인·`review_session` attempt의 실시간 이동. 사람이 보는 대화형 세션은 지금처럼 멈추지 않는다.
  다음 디스패치에서만 복귀한다.

## 4. 설계

### 4.1 정한 갈림

- 결정 — **소진 판정은 현재 계정 창 사용률로 한다**: Codex 현재 계정의 창 하나라도 `pct ≥ 100`이면
  "소진 계정으로 도는 중"으로 본다 (대안: 크레딧 패스로 옮길 때 attempt에 `credit_mode`를 기록; 이유:
  기록 방식은 핀·기본 계정이 처음부터 크레딧 계정인 실행을 놓치고, 그 계정 창이 스스로 리셋돼도 낡은
  값이 남는다). 크레딧이 없는 소진 계정은 곧 한도로 끝나므로, 같이 옮겨도 헛 한도 1회를 아낄 뿐이다.
- 결정 — **전환 시점은 기존 실시간 선제 전환과 같다(멈춤 → 같은 세션 재개)** (대안: 실행이 끝난 뒤
  다음 launch에서만 복귀; 이유: Worker attempt는 한 세션이 길게 돌아 다음 launch가 사실상 오지 않으므로
  크레딧이 계속 나간다. 멈춤·재개는 UI-inge 이래 검증된 경로다).
- 결정 — **복귀 후보는 창 여유 패스만 쓴다**: `kind: 'preempt'`로 고르고, `preempt_pct`가 있으면 그
  값을 `max_pct`로 그대로 넘긴다 (대안: 다른 크레딧 계정으로도 이동; 이유: 크레딧에서 크레딧으로
  옮기면 비용은 그대로이고 상한 회피처럼 보인다).
- 결정 — **기준 상수는 100이다**(예: `CODEX_EXHAUSTED_WINDOW_PCT = 100`). `preempt_pct`의 저장
  범위(1~99)와 겹치지 않으므로, 사용자가 `preempt_pct`를 켠 저장소에서는 기존 crossed 판정이 먼저
  잡고 동작이 바뀌지 않는다.

### 4.2 실시간 복귀 (`livePreemptPass`)

attempt마다의 판정을 다음처럼 바꾼다. 나머지 거름(세션 레인·`review_session`·제어 중·`in_flight`)은 그대로다.

1. 정책이 `switch`이고 허용 목록이 있어야 한다(지금과 같다).
2. 트리거는 둘 중 하나다:
   - crossed: `preempt_pct`가 있고 현재 계정 창 하나가 그 이상(지금과 같다)
   - exhausted: 러너가 `codex`이고 현재 계정 창 하나가 100 이상(신설, `preempt_pct` 무관)
3. 둘 다 아니면 건너뛴다. `preempt_pct`가 null이고 Codex가 아니면 지금처럼 계정 목록도 읽지 않는다.
4. 후보 선택, 재확인(정책을 다시 읽어 `mode`·`preempt_pct`가 그대로이고 고른 후보가 허용 목록에 남아
   있음), `preemptRunningAttempt` 호출은 지금 그대로다. `switch_to.window`·`pct`는 트리거한 창의 키와 값이다.
5. 후보가 없으면 지금처럼 `live_preempt_last_skip: { reason: 'no_candidate' }`를 남기고 계속 돈다
   (상한에 닿은 크레딧 실행도 계속 돈다 — UI-9y1k §4.7 그대로).

### 4.3 디스패치 복귀 (`applyPreemptSwitch`)

`preempt_pct`가 null일 때의 조기 종료 조건에 Codex를 예외로 둔다: Codex는 계정 목록을 읽고 현재 계정
행을 본다. 트리거는 crossed·held(지금과 같다)에 exhausted(Codex, 창 ≥ 100)를 더한다. 후보 선택과
정책 재확인은 지금 그대로다. 결과의 `window`·`pct`는 트리거한 창이고, held만으로 옮기면 지금처럼
`usage`·0이다.

### 4.4 재개 복귀 (`resolveContinuationForAttempt`)

- 결정 — **Codex 재개는 `external_wait_resume`과 무관하게 exhausted 판정만 적용한다** (대안: 일반
  재개에도 `applyPreemptSwitch` 전체를 적용; 이유: crossed·held 트리거를 일반 재개로 넓히는 것은 이번
  요청 밖의 동작 변경이다). crossed·held 트리거는 지금처럼 `external_wait_resume` 재개에만 걸린다.
- 판정 대상은 재개가 실제로 띄울 계정(잠금·override·receipt 해석을 마친 `resolved.accounts.codex`)이다.
  그 계정 창이 100% 이상이고 정책이 `switch`이며 창 여유 후보가 있으면 launch-only로 그 후보로 띄우고
  계정 출처는 `preempt_switch`다. Bead 계정 핀은 쓰지 않는다.
- `prior_attempt` 잠금은 계정 전환·기다림 receipt와 같은 방식으로 계정만 내주고 기록된 나머지 묶음
  (러너·모델·effort·속도)은 지킨다(UI-np4t §4.3, ADR UI-9y1k 승계 UI-inge 조항 "`prior_attempt` 계정
  잠금도 이 전환에는 양보").
- 실시간 선제 전환·반응 계정 전환의 자동 재개는 이미 후보 계정으로 띄우므로 대개 판정에 걸리지 않는다.
  반응 전환이 크레딧 계정으로 재개하는 경우는 창 여유 후보가 없을 때뿐이라 판정이 후보를 못 찾고 그대로
  띄운다.

### 4.5 보이는 것

새 라벨·칩·버튼은 없다. 실시간 이동은 기존 `account_live_preempt` 타임라인 항목과 알림으로 보이며
요약은 `codex 실행 중 선제 전환 <from> → <to> (<창> 100%)` 꼴이 된다. 디스패치·재개 복귀는 기존
`preempt_switch` 계정 출처로 남는다.

### 4.6 오류와 경계

- 계정 목록 실패 → 지금처럼 이동하지 않는다(멈출 근거가 없다). 현재 계정 행이 없으면 crossed·exhausted
  판정만 서지 않는다. 디스패치의 held 전환(행이 없어도 usage_limit 보류로 옮김)은 그대로다.
- 창 정보 없는 행 → exhausted가 아니다.
- 캐시(최대 180초)와 60초 주기 때문에 리셋 뒤 복귀까지 최대 약 4분이 걸릴 수 있다. 그동안의 크레딧
  소모는 원장이 그대로 센다.
- 복귀 직후 새 계정이 다시 한도에 닿으면 기존 반응 전환이 받는다(크레딧 패스 포함). 소진 계정으로
  되돌아가는 왕복은 새 계정이 다시 소진될 때만 일어난다.

## 5. 테스트와 수용 기준

1. `preempt_pct: null`, 현재 03(주간 100%, 크레딧 있음)으로 도는 Codex attempt, 허용 [01, 03]에서 01이
   0% → 실시간 패스가 `account_preempt`로 멈추고 같은 세션을 01에서 재개한다.
2. 1과 같되 01도 100% → 이동 없음, attempt는 `running`, `live_preempt_last_skip.reason`은 `no_candidate`.
3. `preempt_pct: null`, 현재 계정이 99% 이하 → 이동 없음(계정 목록을 읽어도 트리거 없음).
4. 정책이 `wait`면 1의 조건에서도 이동 없음.
5. Claude attempt가 100% 계정으로 돌고 `preempt_pct: null`이면 이동 없음.
6. 세션 레인(`exec: 'session'`) Codex attempt는 1의 조건에서도 이동 없음.
7. 디스패치: `preempt_pct: null`, 해석된 Codex 계정 03이 주간 100%, 01 0% → 01로 launch하고 계정
   출처는 `preempt_switch`.
7a. 일반 재개: `preempt_pct: null`, 직전 attempt가 03(주간 100%)으로 돌았고 재개가 03으로 띄우려 할 때
    01이 0% → 01로 재개하고 계정 출처는 `preempt_switch`. `prior_attempt` 잠금이면 모델·effort는 기록값
    그대로이고 계정만 바뀐다.
7b. 일반 재개에서 03이 99% 이하이거나 정책이 `wait`면 계정을 바꾸지 않는다(crossed·held는 일반 재개에
    걸리지 않는다).
8. 복귀 후보로 크레딧 계정은 고르지 않는다: 01 100%·크레딧 허용, 03 소진 → 이동 없음.
9. 기존 선제 전환·상한·기다림 모드 테스트는 그대로 통과한다(scheduler.test.js:6846 포함).

Test scope:
- seam: 실시간 복귀 — `server/worker/scheduler.test.js` `livePreemptPass` (기준 1·2·3·4·5·6·8)
- seam: 디스패치 복귀 — `server/worker/scheduler.test.js` 디스패치 선제 전환 (기준 7)
- seam: 재개 복귀 — `server/worker/scheduler.test.js` 일반 재개 계정 해석 (기준 7a·7b)

검증: `npx vitest run server/worker/scheduler.test.js`, 그다음 `npx vitest run --reporter=dot`, `npm run tsc`, `npm run lint`,
`npx prettier --check <변경 파일>`.

## 6. 경계·후속

- 관찰: 세션 브리지 실행 중 계정 교체 — dotfiles-8okoi spec §4.1이 불가로 정했고 launch 경계 복귀는 이미 된다.
- 관찰: 세션 레인 attempt의 실시간 복귀 — 대화형 세션을 멈추지 않는 기존 거름을 유지한다; 요청이 오면 별도로 다룬다.

## 7. 결정 (ADR 후보)

- 전제: ADR UI-9y1k — 창 여유 계정 우선·반응 전환에서만 크레딧 패스·상한은 다음 선택만 막음·크레딧 설정 전역 조항을 그대로 따른다.
- Codex 실행이 창이 소진된(100%) 계정으로 도는 동안 허용 목록에 창 여유 계정이 생기면 `preempt_pct`와 무관하게 실시간 선제 전환(멈춤 → 같은 세션 재개)·디스패치 선제 전환·재개 계정 해석으로 그 계정에 옮긴다. ① 되돌리기 어려움: scheduler의 실시간 패스·디스패치 선제 전환·재개 계정 해석(`prior_attempt` 잠금의 계정 양보 포함)이 함께 바뀌고, 사용자 저장소의 `preempt_pct` 운용(지금 모두 꺼짐)이 이 기본 동작을 전제로 굳는다. ② 맥락 없이는 놀라움: 선제 전환 기준을 꺼 둔 저장소에서도 실행이 스스로 멈췄다 다른 계정에서 재개되고, UI-9y1k가 "이미 시작한 실행은 멈추지 않는다"고 적은 크레딧 실행이 멈춘다. ③ 대안 실재: 저장소별 `preempt_pct` 설정 해결, 다음 launch에서만 복귀, attempt의 `credit_mode` 기록으로 판정. UI-9y1k와 소비자(scheduler 선제 전환·후보 선택)가 같고, UI-9y1k가 승계한 UI-inge 조항(실행 중 attempt는 `preempt_pct`에서 정지)에 트리거를 더하므로 그 재진술이다 — `summary`: "Codex 자동 전환 후보는 허용 목록의 사용자 순서로 창 여유 계정을 먼저 고르고 반응 전환에서만 계정별 크레딧 허용·하루 상한(다음 선택만 막음) 안의 크레딧 계정을 고르며, 창이 소진된 계정으로 도는 Codex 실행은 preempt_pct와 무관하게 창 여유 계정이 생기면 그 계정으로 옮기고, 크레딧 설정은 서버 전역이고 세션은 같은 규칙의 후보 조회 API를 쓴다 — 나머지 조항은 UI-np4t 그대로다" → ADR, supersede UI-9y1k
- 소진 기준 100% 상수 — 기본 제외 목록(숫자 한도) → ADR 아님
