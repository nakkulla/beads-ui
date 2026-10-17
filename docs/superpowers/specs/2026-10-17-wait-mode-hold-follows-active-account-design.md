---
scope:
  - server/worker/scheduler.js
  - server/worker/queue-store.js
  - server/worker/provider-health.js
  - server/worker/provider-holds.js
  - server/worker/account-catalog.js
  - server/worker/attach.js
  - server/routes/account-switch.js
---

# 기다림 모드의 보류 attempt가 일반 해석 계정을 따라 재개·보류 시각을 맞춘다 (UI-np4t)

## 1. 배경

사용자 결정(2026-10-16): Claude 한도 대응 `기다림`은 "자동으로 다른 계정을 고르지
않는다"는 뜻이다. 그런데 지금은 보류 해제 정산이 멤버십의 계정, 곧 한도에 걸렸던
계정으로 재개 receipt를 만든다. 그래서 hanmail이 한도에 걸린 뒤 사용자가 활성 계정을
unist로 바꿔도, 보류 attempt는 hanmail 리셋(23시)까지 기다렸다가 hanmail로 재개되고
카드도 23시를 보인다. 이 동작은 Accepted ADR UI-3v1h("재개 계정은 멤버십의 계정이다")와
2026-08-24 스펙 §7.5(receipt `account: <target.account>`를 launch-only로 고정)가 정했다.
자동 전환 모드에서 정책을 바꿔도 기존 보류에 반영되지 않던 결함은 UI-hatz가 이미 고쳤다.

사용자 결정(2026-10-17, 이 스펙의 질문 1A·2A·3A):

1. 재개 계정의 기준은 **지금 새로 디스패치하면 쓸 계정**이다. 순서는 Bead 핀, 저장소
   기본 계정, 활성 로그인이다. 출처(`account_sources`)로 가르지 않는다.
2. "여유가 있다"의 기준은 **새 디스패치와 같은 게이트**다. 그 계정에 보류가 서 있지
   않으면 재개한다. 카탈로그 사용률(80/90, 100%)은 보지 않는다.
3. 활성 계정 변경 감지는 bdui 전환 경로 + 카탈로그 읽기 관찰 + 대상 멤버가 있는 동안의
   60초 주기 읽기, 이렇게 셋이다.

## 2. 검증된 전제

기준 커밋: `dbe8d6c6c6466ee34a736ad8c45fe27adb5c932d`.

- 해제 정산은 target이 사라진 멤버마다 `account: member.account`로 `provider_outage` receipt를 만든다(roster에 없으면 null) — server/worker/queue-store.js:9822-9898
- receipt 소비는 `account`가 null이면 `resolve_provider_account: true`로 일반 해석에 맡기고, 아니면 launch-only `exec_override`로 그 계정을 고정한다. 단 `prior_attempt` 잠금의 `provider_outage` receipt는 override를 쓰지 않고, 계정이 기록과 다르면 `prior_attempt_locked`로 거절한다 — server/worker/scheduler.js:15596-15624
- 해제 정산은 해석 계정과 무관하게 멤버마다 먼저 진척 없는 재개 상한을 판정하고, 상한이면 receipt 없이 `no_progress` permanent 거절을 기록한다 — server/worker/queue-store.js:9864-9879
- receipt 정규화는 `origin`으로 `live_preempt`만 보존한다 — server/worker/queue-store.js:5162-5188
- 해제 경로는 정산이 돌려준 회복 attempt마다 소비 뒤 회복 타임라인을 쓰고 회복 알림을 한 번 보낸다 — server/worker/provider-health.js:960-1004
- 전환 재평가는 switch-ready 타이머와 attach 시작에서도 불린다 — server/worker/provider-health.js:1207-1211, server/worker/provider-health.js:1293-1300
- Codex 사용량 목록 캐시는 180초다 — server/routes/codex-usage.js:19, server/routes/codex-usage.js:428-442
- `resolve_provider_account`는 기록된 실행 tuple을 유지한 채 그 러너 계정만 `effectiveAccount(Bead 핀, 저장소 기본)`으로 다시 정한다. 단 `prior_attempt` 잠금이면 다시 정하지 않는다 — server/worker/scheduler.js:16722-16746
- `effectiveAccount`는 핀도 기본값도 없으면 `{ value: null, source: null }`이고, null 계정 launch는 활성 로그인이다 — server/worker/scheduler.js:1272-1282
- `account_switch` 재개에 `account_switched_from`이 있으면 그 러너 출처를 `outage_switch`(또는 `live_switch`)로 다시 적는다 — server/worker/scheduler.js:16754-16765
- 디스패치 게이트 `providerDispatchHeld`는 러너 범위 target이면 막고, 계정 범위면 해석 계정(null이면 활성 계정)이 보류 계정인지 본다 — server/worker/scheduler.js:3890-3960
- 자동 재개 경로는 게이트를 거치지 않는다. `resume`은 `continuation.retry`일 때만, `relaunchFromAttempt`는 `external_wait_resume`일 때만 게이트를 부른다 — server/worker/scheduler.js:15161, server/worker/scheduler.js:17126
- 진척 없는 자동 재개 상한(2회)은 `provider_outage` 재개만 세고 `account_switch` 재개는 세지 않는다 — server/worker/queue-store.js:5198, server/worker/queue-store.js:5227-5245
- `switchHeldProviderAttempts`는 멤버십 제거와 receipt push를 같은 mutation에서 한다 — server/worker/queue-store.js:9748-9781
- 살아 있는 멤버십 곁에 남은 receipt는 `discardStaleAutoResumePending`이 버린다 — server/worker/queue-store.js:10122-10137
- 보류 진입은 `mode === 'switch'`일 때만 전환 후보를 찾고, 기다림 모드 멤버의 판정은 `disabled`다 — server/worker/scheduler.js:6602, server/worker/queue-store.js:6648-6668
- 정책 저장은 기존 보류 멤버를 다시 판정하고(UI-hatz), attach가 재평가를 부른다 — server/worker/queue-store.js:9032-9080, server/worker/attach.js:3443
- `reevaluateProviderSwitches`는 `auto_switch === 'none'`인 usage_limit target만 다룬다 — server/worker/scheduler.js:2132, server/worker/scheduler.js:2175-2183
- 멤버십은 `{runner, target_id, account}`이고 `account`는 진입 때 target의 계정이다 — server/worker/provider-holds.js:57-68
- 카드는 자기 attempt_id를 담은 target을 찾아 그 `resets_at`·계정을 보인다 — app/views/worker/lane-model.js:1442-1475
- 투영의 `attempt_ids`는 그 저장소 멤버십에서 온다 — server/worker/provider-holds.js:255-292
- target 범위: usage_limit은 계정이 있으면 `account`, 없으면 `unresolved`; credential만 계정 범위 outage다 — server/worker/provider-holds.js:127-134
- Claude 카탈로그 관찰자는 읽기마다 행 배열을 받고, 행에는 `active`가 있다. Codex에는 관찰자가 없다 — server/worker/account-catalog.js:20-61, server/routes/claude-usage.js:11, server/routes/claude-usage.js:503-515
- 관찰자는 읽기마다 모든 attach 저장소의 전환 재평가를 부른다 — server/worker/provider-health.js:384-391
- 사용량 목록 캐시는 30초이고, bdui 전환 성공은 캐시를 무효화한다 — server/routes/claude-usage.js:18, server/routes/account-switch.js:337-341, server/app.js:190
- 실행 중 선제 전환 주기는 60초다 — server/worker/scheduler.js:207
- Codex 보류의 계정은 attempt 키가 없으면 카탈로그 `active_key`로 채운다 — server/worker/scheduler.js:1897-1920

## 3. 목표와 비목표

목표 — 기다림 모드에서 계정 범위 usage_limit 보류에 묶인 attempt는 지금의 일반 해석
계정(이하 **해석 계정**)을 기다린다.

- 해석 계정이 보류 중이 아니면 바로 그 계정으로 재개한다.
- 보류 중이면 그 계정의 보류로 옮겨 가 그 리셋 시각을 보이고, 그 보류가 풀릴 때 재개한다.
- Bead 핀이나 저장소 기본 계정으로 돈 attempt는 핀·기본값이 그대로면 지금처럼 그 계정을
  기다린다.

비목표:

- 자동 전환 모드의 동작(전환 후보·`switch_ready_*`·선제 전환)은 바꾸지 않는다.
- 러너 범위 outage, credential outage, 계정 미해석(`account: null`) target은 대상이 아니다.
- 실행 중인 attempt는 활성 계정이 바뀌어도 건드리지 않는다.
- 카드·팝업 문구와 슬롯은 바꾸지 않는다. 보이는 시각·계정은 묶인 target에서 그대로 온다.

## 4. 설계

### 4.1 대상 멤버

**대상 멤버**는 같은 저장소에서 아래 조건을 모두 만족하는 멤버십이다.

- 그 러너의 `provider_limit_policy.mode === 'wait'`이다.
- 묶인 target이 계정 범위 usage_limit이다(`kind: 'usage_limit'`, `account`가 문자열).
- attempt가 `paused`이고 `provider_outage:` 원인이며, 철회·dismiss·진행 중 폐기·receipt
  대기·`resumed_from` 자식이 없다. 조건은 `switchHeldProviderAttempts`와 같다.

결정: 대상은 출처로 가르지 않는다. 해석 계정이 진입 때 계정과 같으면 아무 일도 없다.
그래서 핀·기본값 attempt는 값이 바뀌지 않는 한 지금과 같다.

### 4.2 추종 판정 (follow pass)

저장소마다 대상 멤버 각각에 대해:

1. 해석 계정 R을 정한다. Bead 핀 → 저장소 기본(`readWorkspaceAccountsLayer`) → 활성
   로그인(카탈로그 `active_key`) 순이다. Claude는 email, Codex는 계정 키다. 하나라도 읽지
   못하면(카탈로그 실패, 기본값 layer `unusable`, bd 읽기 실패) 그 멤버는 그대로 둔다
   (fail-quiet).
2. R이 멤버의 계정과 같으면 아무것도 하지 않는다.
3. R이 디스패치 게이트에 막히고, 그 이유가 R을 가리키는 usage_limit target T_R이면, 멤버십을
   T_R로 **옮긴다**(`target_id`·`account` = T_R의 것, `auto_switch` = 그 저장소의 판정).
   원래 target은 프로브가 풀 때까지 그대로 선다(UI-3v1h 정리 조항).
4. R이 게이트에 막히지 않으면, 멤버십 제거와 **추종 receipt** push를 같은 mutation에서 한다.
5. R이 러너 범위 outage, R의 credential outage, 미해석 target에 막히면 그대로 둔다. 그 보류는
   지금의 해제 경로가 푼다.

결정: 판정은 디스패치와 같은 술어(`providerDispatchHeld`와 같은 범위 규칙)를 쓴다. 카탈로그
사용률은 보지 않는다(사용자 결정 2A). 이미 소진된 R은 첫 호출에서 한도로 다시 보류된다.
그때 진입 경로가 R의 target을 만들고, 카드는 R의 리셋 시각을 보인다.

예: `reevaluateProviderSwitches`가 정책이 `wait`인 러너에서 이 패스를 함께 돈다. 이 함수에는
이미 관찰자·타이머·정책 변경·attach 시작 트리거가 걸려 있다. 3·4번 쓰기는 queue-store의 새
mutation 하나(예: `followHeldProviderAttempts`)가 받는다. 그 mutation은 정책 `wait`와 4.1
조건을 안에서 다시 읽고, 3번에서는 T_R이 전역에 아직 있는지도 다시 읽는다.

### 4.3 receipt와 재개

**기다림 receipt**는 아래 두 경로가 만드는 receipt다. 결정: 기다림 receipt는 영속 표지와 기다리던
계정을 담는다. 예: `origin: 'wait_follow' | 'wait_release'`, `held_account: <멤버의 계정>`. 큐
정규화와 재시작 뒤에도 보존된다. 이 절의 새 규칙(소비 시점 판정, 잠금 예외, 출처 기록)은 표지가
있는 receipt에만 적용된다. 표지 없는 receipt는 지금 동작 그대로다. 계정이 목록에서 사라져
null이 된 기존 receipt나 credential outage receipt가 여기에 해당한다.

- **추종 receipt**(4.2-4, `wait_follow`): `kind: 'account_switch'`, `account: null`,
  `switched_from: <멤버의 계정>`. 4.2 패스가 이미 해석 계정이 보류 중이 아니고 원래 계정과
  다르다고 판정한 receipt다.
- **해제 receipt**(`wait_release`): 기다림 대상 멤버의 원래 target이 풀리면, 해제 정산은 그
  멤버에 대해 상한을 판정하지 않는다. 멤버십 제거와 `account: null` 해제 receipt push만 한다.
  상한 판정은 소비 시점으로 미룬다. 계정이 바뀌는 재개라면 상한을 쓰지 않아야 하는데, 정산은
  해석 계정을 모르기 때문이다(지금 정산은 계정과 무관하게 먼저 상한을 판정한다). 자동 전환 모드와
  대상 밖 멤버의 정산은 지금 그대로다(`member.account`, 정산 시점 상한).
- **소비 시점 판정**: 결정 — 기다림 receipt를 소비하면 먼저 해석 계정 R을 정하고 디스패치
  게이트를 본다. 해석 실패면 표지를 지닌 채 receipt를 남겨 다음 소비가 다시 본다.
  1. R이 usage_limit target T_R에 막힌다 → launch하지 않는다. 한 mutation에서 그 receipt를 지우고
     멤버십을 T_R로 만든다. 그 mutation은 receipt가 같은 `attempt_id`·`generation`으로 아직
     있는지, T_R이 전역에 아직 있는지, attempt가 4.1의 attempt 조건을 만족하는지 다시 읽는다.
     어긋나면 아무것도 쓰지 않고 receipt를 남긴다. 그래서 재시작이나 stale 정리 뒤에도 재개 권한이
     receipt나 멤버십 중 하나로 남는다.
  2. R이 `held_account`와 다르고 막히지 않는다 → 계정이 바뀐 재개다. `kind: 'account_switch'`로
     실행하고 진척 없는 재개 상한을 쓰지 않는다. 해제 receipt였다면 소비 직전에 kind를 바꾼다.
  3. R이 `held_account`와 같다 → 같은 계정의 회복이다. 지금의 상한 판정(`providerAutoResumeCapped`)을
     여기서 적용한다. 상한이면 지금과 같은 `no_progress` permanent 거절을 기록하고 receipt를
     지운다. 아니면 `kind: 'provider_outage'`로 실행한다.
  4. 그 밖의 막힘(러너 범위 outage, credential, 미해석)은 지금처럼 재개를 시도한다.
- **계정과 잠금**: 기다림 receipt의 launch 계정은 일반 해석이 정한다. 그 사이 사용자가 또
  바꿨다면 최신 해석을 따른다. `prior_attempt` 잠금은 계정 전환과 같이 양보한다(UI-inge 승계
  조항). 결정: 기다림 receipt를 소비할 때는 잠금이 있어도 그 러너 계정만 다시 해석하고, 나머지
  tuple은 잠금대로 둔다. 지금은 `!prior_attempt_choice` 조건이 다시 해석을 막는다
  (server/worker/scheduler.js:16722-16726). 계정이 다르다는 이유의 `prior_attempt_locked` 거절도
  기다림 receipt에는 적용하지 않는다.
- **출처 기록**: 결정 — 재개 attempt의 `account_sources`는 일반 해석의 출처
  (`bead`·`workspace_default`·null)를 적는다. `outage_switch`로 다시 적지 않는다. 다음 보류에서도
  같은 규칙을 타기 위해서다.
- **회복 기록과 알림**: 결정 — 소비가 1번(재결속)으로 끝난 attempt는 회복이 아니다. 소비 결과가
  재결속 attempt를 따로 돌려주고, 해제 경로는 그 attempt를 회복 타임라인·회복 알림에서 뺀다.
  2번 재개는 계정 전환 회복과 같은 모양으로 attempt마다 한 번 기록·알린다(from = `held_account`,
  to = 실제 launch 계정). 3번 재개는 지금의 공급자 회복 기록 그대로다. 나중에 T_R이 풀려 실제로
  재개될 때 그때의 계정으로 한 번 기록된다.

이 판정은 4.2 패스와 해제 사이의 경합을 닫는다. 예를 들어 외부 `cswap` 전환이 아직 관측되지
않은 채 원래 target이 먼저 풀린 경우다.

### 4.4 활성 계정 변경 감지

세 트리거 모두 4.2 패스를 부른다. 패스는 저장소마다 직렬이다. 기존 `provider_switch_passes`
합치기를 그대로 쓴다.

1. **bdui 전환 경로**: Claude·Codex 전환이 성공하고 캐시를 무효화하면, attach된 모든 저장소의
   패스를 부른다. 결과를 기다리지 않는다.
2. **카탈로그 관찰**: Claude 관찰자가 받은 행의 `active` 키가 직전 관측과 다르면 패스를 부른다.
   기존 `reevaluateSwitches` 호출에 얹는다. Codex도 같은 관찰자를 둔다. 예: `listCodex`가
   `subscribeCodex` 리스너에 행과 `active_key`를 넘긴다.
3. **주기 읽기**: attach된 저장소 어디든 대상 멤버가 하나라도 있는 동안 60초마다 그 러너 목록을
   읽는다. 읽기는 각 러너의 기존 캐시를 지난다. 대상 멤버가 없어지면 멈춘다. 이 읽기는 2번
   관찰도 함께 울린다.
   - Claude: 캐시 30초이므로 외부 명령은 분당 한 번을 넘지 않는다. 외부 `cswap` 전환은 길어야
     약 90초 안에 반영된다.
   - Codex: 결정 — 캐시 180초를 그대로 둔다. 주기 읽기가 캐시를 무효화하지 않는다. 그래서 외부
     `codex-auth` 전환은 길어야 약 4분(180초 + 60초) 안에 반영되고, `codex-auth` 호출은 3분에
     한 번을 넘지 않는다. bdui 전환은 캐시를 무효화하므로 즉시 반영된다. 이유: 그 캐시는 Codex
     사용량 조회 비용 때문에 길게 잡혀 있고, 사용자 결정 3A는 기존 읽기를 주기적으로 부르는
     것이지 조회 비용을 늘리는 것이 아니다.

결정: 자격 파일 감시는 두지 않는다. 그 파일은 `cswap`·`codex-auth`가 소유하고 형식도 보장되지
않는다.

### 4.5 오류 처리

- 카탈로그·bd·kv 읽기 실패: 그 패스에서 그 멤버를 건너뛴다. 다음 트리거가 다시 본다.
- mutation 재검증 실패(정책이 `switch`로 바뀜, attempt 상태 변화, T_R 소멸): 쓰지 않는다.
- 재시작: 멤버십·receipt는 큐에 영속한다. attach 시작의 정산과 재평가가 패스를 한 번 돈다.
- 추종 재개가 거절되면 지금의 `auto_resume_refusal` 사다리를 그대로 탄다.

## 5. 테스트와 수용 기준

수용 기준:

1. 기다림 모드, 핀 없음, hanmail 보류 중 활성 계정이 unist(보류 없음)로 바뀌면, 다음 패스에서
   attempt가 unist로 재개되고 `account_sources.claude`는 null이다.
2. 같은 상황에서 unist도 보류 중이면 멤버십이 unist target으로 옮겨 가고, 카드가 unist의
   리셋 시각과 계정을 보인다. hanmail이 먼저 풀려도 재개되지 않고, unist가 풀릴 때 재개된다.
3. Bead 핀 hanmail인 attempt는 활성 계정이 바뀌어도 hanmail을 기다린다.
4. 자동 전환 모드의 보류는 활성 계정 변경에 반응하지 않는다.
5. bdui 전환은 즉시 패스를 부른다. 외부 전환은 60초 주기 읽기로 감지한다. Claude는 약 90초,
   Codex는 약 4분 안에 반영된다.
6. 원래 target이 해제되는 순간 해석 계정이 보류 중이면, launch 없이 멤버십이 그 target으로
   옮겨 간다. 이때 회복 알림과 회복 타임라인은 나가지 않는다.
7. 진척 없는 재개 상한에 닿은 attempt도, 원래 target이 풀린 시점에 해석 계정이 바뀌어 있으면
   상한 거절 없이 새 계정으로 재개된다. 해석 계정이 같으면 지금처럼 `no_progress`로 멈춘다.
8. 표지 없는 receipt(credential outage, 목록에서 사라진 계정)는 잠금·게이트·상한 동작이 지금과 같다.
9. 기다림 receipt의 표지와 `held_account`는 큐 재적재(재시작) 뒤에도 남는다. 재결속 mutation이
   어긋나면 receipt가 남는다.
10. Codex 러너도 1·2·3이 같다.

필수 테스트(이름은 예):

- queue-store: `follow moves a wait-mode member to the resolved account target`,
  `follow releases a wait-mode member with an account_switch receipt in one mutation`,
  `follow refuses when the policy turned to switch`,
  `wait-mode release writes a marked null-account receipt without judging the cap`,
  `switch-mode release receipt keeps the member account and its cap check`,
  `marked receipt keeps origin and held_account across reload`,
  `consume-time rebind deletes the receipt and creates the membership in one mutation`,
  `consume-time rebind writes nothing when the receipt generation moved`
- scheduler: `follow pass resolves pin before workspace default before active login`,
  `follow pass skips a member whose catalog read failed`,
  `consuming a wait receipt rebinds instead of launching onto a held account`,
  `consuming a wait release receipt on a changed account skips the no-progress cap`,
  `consuming a wait release receipt on the same account applies the no-progress cap`,
  `wait receipt re-resolves the account under a prior_attempt lock`,
  `unmarked null receipt keeps the prior_attempt lock behavior`,
  `follow resume records the ordinary account source`, `codex follow pass uses active_key`
- provider-health·attach·route: `active key change in an observed catalog triggers a follow pass`,
  `periodic catalog read runs only while a follow member exists`,
  `periodic codex read does not invalidate the codex usage cache`,
  `release that ends in a rebind sends no recovery notification`,
  `account switch route triggers a follow pass on every attached workspace`

검증 bundle은 AGENTS.md Pre-Handoff Validation이다.

## 6. 경계·후속

없음.

- 관찰: 자동 전환 모드에서 활성 계정을 손으로 바꾼 경우 — 그 모드는 허용 계정 집합이 재개 계정을 정하므로 이 스펙의 기다림 의미와 별개다. 요청이 오면 따로 판단한다.
- 관찰: credential outage의 계정 추종 — 인증 실패는 한도 정책 모드와 무관한 보류라서 같은 규칙을 적용할지는 별도 판단이다.

## 7. 결정 (ADR 후보)

- 전제: ADR UI-3v1h — 전역 원본·target_id 멤버십·범위 규칙·프로브만 해제·정리 조항은 그대로 쓰고, 재개 계정 조항만 아래 후보로 바꾼다.
- 전제: ADR UI-u6ud-11 — 저장소 기본 계정은 kv 읽기 fail-quiet layer로만 읽는다.
- 기다림 모드에서 계정 범위 usage_limit 보류 attempt는 지금의 일반 해석 계정(Bead 핀 > 저장소 기본 > 활성 로그인)을 기다린다. 그 계정이 보류 중이면 멤버십이 그 target으로 옮겨 가고, 아니면 멤버십 제거와 상한 미소비 receipt(계정 비움)로 바로 재개한다. 해제 정산은 기다림 대상 멤버의 상한을 판정하지 않고 표지 있는 계정 없는 receipt만 쓴다. 소비 때 해석 계정과 디스패치 게이트를 먼저 보고, 막히면 재결속하고, 계정이 바뀌었으면 상한 없이, 같으면 기존 상한으로 재개한다. 자동 전환 모드의 재개 계정은 멤버십의 계정 그대로다.
  - 되돌리기 어려움: 멤버십 계정의 의미(진입 때 계정 → 지금 기다리는 계정)와 receipt 계정 규칙이 함께 바뀐다. 함께 움직일 소비자는 queue-store 정산·추종 mutation, scheduler 재평가·receipt 소비·재개 출처 기록, provider-health 관찰·주기 타이머, 계정 전환 라우트다.
  - 맥락 없이 놀라움: 한도에 걸린 계정이 아닌 다른 계정으로 재개되고, 카드의 보류 계정이 진입 뒤에 바뀐다.
  - 트레이드오프: 사용률을 보지 않아 소진된 활성 계정에 헛실행 1회가 생길 수 있다. 대신 새 디스패치와 같은 규칙 하나로 끝나고, 새 표시 필드가 없다. 기각한 대안은 출처로 가르기, 카탈로그 100% 또는 80/90 기준, `switch_ready_*` 재사용, 자격 파일 감시다.
  - `summary`: "기다림 모드의 계정 범위 usage_limit 보류 attempt는 지금의 일반 해석 계정(Bead 핀 > 저장소 기본 > 활성 로그인)을 기다린다 — 그 계정이 보류 중이면 멤버십을 그 target으로 옮기고 아니면 멤버십 제거와 같은 쓰기의 계정 없는 상한 미소비 receipt로 재개하며, 해제 정산은 기다림 대상 멤버에 상한 판정 없이 표지 있는 계정 없는 receipt를 쓰고 소비가 해석 계정·디스패치 게이트로 재결속·계정 변경 재개(상한 미소비)·같은 계정 재개(기존 상한)를 가른다; 활성 계정 변경은 bdui 전환·카탈로그 관찰·대상 멤버가 있는 동안의 60초 주기 읽기로 감지하고, 자동 전환 모드의 재개 계정은 멤버십의 계정이다 — UI-3v1h의 나머지 조항과 승계 조항은 그대로다" → ADR, supersede UI-3v1h
- 추종 재개 attempt의 출처를 일반 해석 출처로 적는다 — 되돌리기 쉬운 구현 세부(첫 조건 실패) → ADR 아님
