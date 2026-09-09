---
scope:
  - server/worker/scheduler.js
  - server/worker/queue-store.js
  - server/worker/notify.js
  - server/ws/worker-handlers.js
  - server/ws/connection.js
  - app/protocol.js
  - app/views/settings-dialog/execution-pane.js
  - app/views/worker/gate-labels.js
  - app/views/worker/running-grid.js
---

# 사용량 한도 자동 전환 정책 — 러너별 허용 계정 집합·기다림/전환 모드·선제 전환, attempt 단위

2026-09-09 · Bead UI-13o1 · route `spec_backed`

2026-08-24 공급자 보류 스펙 §8.3은 한도 보류에서 "카탈로그의 건강한 계정 아무
곳"으로 자동 전환하는 규칙을 정했다. 이 스펙은 그 규칙의 **대상·시점·러너**를
사용자 정책으로 바꾼다. 보류·프로브·재개 기계(§4–§7, §9)는 그대로 쓴다.

## 1. 목표와 사용자 결정 (2026-09-09)

관측: dotfiles-60u8(claude 러너)이 한도에 걸린 뒤 자동 전환이 nakkulla2@gmail.com을
골랐다. 그 계정은 Pro 요금제라 fable 모델이 없고, 카탈로그(`claude-usage.js`)는
요금제·모델 가용성을 모른다. 후보 규칙이 "모든 계정"인 한 같은 일이 재발한다.

사용자 결정 여섯:

1. **전환 허용 계정은 사용자가 러너별로 고른 집합만이다.** 카탈로그가 요금제를
   모르므로 자동 추론이 아니라 명시 선택이 정본이다. 고르지 않은 계정으로는
   전환하지 않는다.
2. **선제 전환은 선택이고 임계 퍼센트는 사용자가 정한다.** 켜면 한도에 걸리기
   전에, 현재 계정의 사용량 창이 임계를 넘으면 디스패치 시점에 미리 바꾼다.
3. **전환 범위는 attempt 단위 launch-only를 유지한다.** 워크스페이스 기본 계정·Bead
   pin·세션 계정은 건드리지 않는다(§8.3·§9 override 범위 그대로).
4. **codex 러너도 같은 정책으로 전환한다.** Worker는 계정별 `CODEX_HOME` 미러로
   spawn하므로 전역 활성 계정을 바꾸지 않아도 attempt 단위 전환이 성립한다.
5. **한도 시 동작은 러너별 `기다림 | 자동 전환` 모드다.** 계정 전환으로 태어난
   자식은 §8.1의 자동 재개 1회 cap을 **소비하지 않는다** — cap은 리셋 뒤 자동
   재개(`provider_outage` 재개)만 센다.
6. **UI는 실행 패널 `실행 계정` 섹션에 둔다** — 러너별 모드, 허용 계정 체크, 선제
   전환 퍼센트.

세션 안 codex-runner 브리지(리뷰·위임)의 계정은 dotfiles 소관이며 범위 밖이다.

## 2. 확인한 사실 (2026-09-09 실측)

- 전환 판정은 hold 진입 mutation 안에서 1회다(`scheduler.js:4980` `holdAttempt` →
  `queue-store.js:7071` `holdProviderAttempt`). 조건은 `usage_limit ∧ runner ===
  'claude' ∧ provider_auto_switch ∧ classified.account !== null`.
- 후보 규칙(`scheduler.js:1616` `selectProviderSwitchAccount`): `listClaude()` 행
  중 `status==='ok'`, 현재 계정 아님, 어느 `provider_hold` target의 계정도 아님,
  `5h.pct ≤ 80 ∧ (7d 부재 ∨ 7d.pct ≤ 90)`. 정렬은 `7d.pct` 오름차순, 동률이면
  `number`. 상수 `AUTO_SWITCH_5H_MAX_PCT=80`·`AUTO_SWITCH_7D_MAX_PCT=90`(`:145`).
- 저장된 사유 어휘는 `target.auto_switch ∈ 'none'|'cap'|'disabled'|null`
  (`queue-store.js:631`, 알림 `notify.js:509`, 팝오버 `gate-labels.js:79`).
- 계정 전환 재개도 `auto_resume_kind:'provider_outage'`를 스탬프한다
  (`scheduler.js:9772/9792/9798` `consumeProviderAutoResume`의 세 분기 모두). 따라서
  `providerAutoResumeCapped`(`queue-store.js:3794`)가 전환 자식을 cap 소진으로 세어,
  전환 뒤 리셋 회복은 자동 재개되지 않고 `'cap'` 사유가 두 번째 한도에 남는다.
- 디스패치 계정 해석은 `resolveDispatchSettings`(`scheduler.js:2802`): Bead pin >
  워크스페이스 기본(kv `workspace_exec_accounts`) > 없음(현재 로그인). 소스 어휘는
  `'bead'|'workspace_default'|null`이고 `'outage_switch'`는 재개 경로(`:10820`)가
  `account_switched_from`을 보고 **claude 키에만** 찍는다 — codex 전환에도 claude
  소스가 바뀌는 잠복 결함이다.
- 게이트 판정 `providerDispatchHeld`(`:2853`)의 호출처는 디스패치 루프 한 곳
  (`:7812`)이며 `resolveDispatchSettings`의 `accounts`를 받는다. 선제 전환의 자리는
  그 둘 사이다.
- codex 계정 컨텍스트(`scheduler.js:1576`): hold의 계정은 `attempt.codex_account`
  뿐이고 pin·기본값 없이 활성 로그인으로 뜬 codex attempt는 `account:null` target을
  만든다 — §6 fail-closed라 프로브도 전환도 없다. claude는 같은 경우
  `activeClaude()`로 계정을 채운다.
- codex 카탈로그(`codex-usage.js`)의 창 `key`는 분 단위에서 파생된다(`'5h'`/`'7d'`가
  실측상 나오지만 하드코딩이 아니다). `status`는 `'ok'|'unavailable'`.
- 토글 UI는 `execution-pane.js:1915` `실행 계정` 그룹 안 "한도 대응" 체크 하나이고
  `worker-provider-auto-switch-toggle {on}` CAS로 쓴다. 계정 목록은 그 패널이 이미
  `/api/claude-usage`·`/api/codex-usage`로 읽어 `account_catalog`에 들고 있다.
- `provider_auto_switch`는 큐 durable(`KNOWN_QUEUE_FIELDS`, 기본 `true`, load 시
  `!== false`)이며 dotfiles 계약 표면이 아니다(2026-08-25 스펙 §2.2의 선례: 워크스페이스
  층은 beads-ui 소유).

## 3. 설계

### 3.1 정책 저장 — 큐 durable `provider_limit_policy`

`queue.provider_auto_switch`(boolean)를 러너별 객체로 대체한다.

```js
provider_limit_policy: {
  claude: { mode: 'wait'|'switch', accounts: string[], preempt_pct: number|null },
  codex:  { mode: 'wait'|'switch', accounts: string[], preempt_pct: number|null }
}
```

- `accounts` 값은 카탈로그 `key`다(claude: cswap email, codex: codex-auth
  `account_key`) — `workspace_exec_accounts`의 값과 같은 식별자.
- `preempt_pct`는 `null`(선제 전환 끔) 또는 1–99 정수.
- 기본값(`emptyQueue`): 두 러너 모두 `{ mode:'switch', accounts:[], preempt_pct:null }`.
  허용 집합이 비었으므로 실제 전환은 사용자가 계정을 고르기 전에는 일어나지
  않는다(결정 1). 이것이 이 스펙의 의도된 동작 변화다.
- **load 이관**(`normalizeQueue`): raw에 `provider_limit_policy`가 없으면 raw
  `provider_auto_switch`에서 파생한다 — `false`면 두 러너 `mode:'wait'`, 아니면
  기본값. 있으면 러너별로 정규화한다: `mode`가 enum 밖이면 `'switch'`, `accounts`는
  공백 없는 1–256자 문자열만 남기고 중복 제거, `preempt_pct`는 1–99 정수 외
  `null`. `provider_auto_switch`는 파생에만 읽고 더는 쓰지 않으며
  `KNOWN_QUEUE_FIELDS`에서 뺀다.
- **왜 kv가 아니라 큐인가**: hold 진입 판정은 mutation 안의 동기 읽기여야 한다(§8.3
  codex 리뷰 F4). kv는 런치 결정마다 `bd kv get`이 하나 더 붙고 CAS가 없다. 기존
  토글이 이미 큐 durable이라 소유자도 바뀌지 않는다.

**쓰기 경로**: ws `worker-provider-limit-policy-set { runner:'claude'|'codex',
patch:{ mode?, accounts?, preempt_pct? }, expected_revision }`. 핸들러는 `runner`
enum과 patch 각 필드를 strict 검증(`bad_request`)하고 `queueStore().
setProviderLimitPolicy(key, { expected_revision, runner, patch })`를 부른다. 스토어는
`applyMutation`으로 러너 객체에 patch를 얕게 병합한다. 기존
`worker-provider-auto-switch-toggle`·`toggleProviderAutoSwitch`·
`handleWorkerProviderAutoSwitchToggle`은 제거하고 `protocol.js`·`connection.js`
등록을 바꾼다. 응답은 기존 `replyMutation` → `worker-queue-snapshot` fanout이라
readback 경로도 그대로다.

### 3.2 hold 진입 판정 — 두 러너, 허용 집합 안에서, cap 밖에서

`holdAttempt`:

```js
const policy = snapshot.provider_limit_policy[attempt.runner];
const switch_account =
  usage_limit && policy?.mode === 'switch' && classified.account !== null
    ? await selectProviderSwitchAccount(workspace, attempt.runner, classified.account, policy.accounts)
    : null;
```

`selectProviderSwitchAccount(workspace, runner, current, allowed)`:

- 목록은 `runner==='codex' ? listCodex() : listClaude()`.
- 후보: `allowed`에 `key`가 있고, `status==='ok'`, `key !== current`, 어느
  `provider_hold` target의 `account`도 아니고, 창 조건을 만족하는 행. 창 조건은
  현행 상수 그대로다 — `key==='5h'`인 창은 `pct ≤ 80`, 그 외 모든 창은 `pct ≤ 90`,
  창이 하나도 없는 행은 후보가 아니다. codex의 파생 `key`가 `'5h'`가 아니어도 "그
  외" 규칙으로 읽히므로 fail-quiet다. 임계 상수는 설정 키로 만들지 않는다:
  `preempt_pct`는 "언제 떠나는가"이고 이 상수는 "받는 계정이 건강한가"다.
- 정렬: `'5h'`가 아닌 창의 최대 `pct` 오름차순(부재 0), 동률이면 `number`
  오름차순(codex 행에 `number`가 없으면 `key` 사전순).

`holdProviderAttempt`(mutation 안 재판정, 저장 사유):

| 순서 | 조건 | `target.auto_switch` |
|---|---|---|
| 1 | `policy.mode !== 'switch'` | `'disabled'` |
| 2 | `policy.accounts.length === 0` | `'unconfigured'` (신설) |
| 3 | 후보 없음 | `'none'` |
| 4 | 후보가 이미 다른 target의 계정 | `'none'` |
| 5 | 성공 | `null` + `auto_resume_pending { kind:'account_switch', account }` |

현행 3번째 분기(`providerAutoResumeCapped` → `'cap'`)는 **제거**한다(결정 5).
`'cap'`은 저장 어휘에서 읽기만 남긴다(과거 큐 파일 정규화, 알림·팝오버는 계속
빈 문자열).

`consumeProviderAutoResume`: `pending.kind === 'account_switch'`인 세 분기는
`auto_resume_kind:'account_switch'`를 스탬프한다. `providerAutoResumeCapped`는
바꾸지 않는다 — `'provider_outage'`만 세므로 전환 자식은 cap을 소비하지 않고, 그
자식이 뒤에 리셋으로 회복되면 §8.1대로 1회 자동 재개된다. `Attempt.auto_resume_kind`
typedef와 정규화(`queue-store.js:2976`)의 허용값에 `'account_switch'`를 더한다.

전환 연쇄의 상한은 허용 집합이다: 전환된 자식이 다시 한도에 걸리면 그 계정은
target이 되어 후보에서 빠지고, 후보는 항상 현재 계정과 다르므로 같은 계정으로
되돌아가지 않는다. 허용 집합이 전부 target이면 `'none'`으로 타이머 경로다.

`account_sources` 스탬프(`scheduler.js:10820`): `account_switched_from`이 있으면
**그 러너 키**에 `'outage_switch'`를 찍는다(codex면 `codex`). `AccountSources`
typedef의 codex 쪽에 `'outage_switch'`를 더하고 `account_switched_from`의 설명을
"전환으로 대체된 계정 key"로 고친다.

**codex 계정 컨텍스트**(`providerAccountContext`): `attempt.codex_account`가 없으면
`listCodex()`의 `active_key`를 계정으로 쓴다(claude의 `activeClaude()`와 같은
규칙). 이래야 활성 로그인으로 뜬 codex attempt의 한도가 `account:null` fail-closed
target이 아니라 계정 단위 target이 되어 전환·프로브 대상이 된다. `row`는 계속
`null`이다(codex-auth는 행별 usage를 주지 않는다는 기존 주석 유지).

### 3.3 선제 전환 — 디스패치 시점, 상속된 계정에만

디스패치 루프에서 `resolveDispatchSettings` 성공 뒤, `providerDispatchHeld` 전에
`applyPreemptSwitch(workspace, runner_name, resolved_exec)`를 넣는다.

- 전제: `policy.mode === 'switch' ∧ policy.preempt_pct !== null ∧
  policy.accounts.length > 0`. 아니면 no-op.
- **대상은 상속된 계정뿐이다**: `account_sources[runner] ∈ { null,
  'workspace_default' }`. `'bead'`(이슈 pin)는 건드리지 않는다 — pin은 그 이슈에
  대한 명시 선택이고 한도에 실제로 걸리면 §3.2가 처리한다. 재개 경로
  (`resumeAttempt`·`exec_override`)는 이 루프를 타지 않으므로 애초에 대상이 아니다.
- 현재 계정 결정: `accounts[runner]`가 있으면 그것, 없으면 활성 계정
  (`activeClaude().email` / `listCodex().active_key`). 활성 계정을 못 읽으면 no-op.
- 판정: 그 계정의 카탈로그 행에서 **어느 창이든** `pct ≥ preempt_pct`면 §3.2의
  `selectProviderSwitchAccount(workspace, runner, current, policy.accounts)`로 후보를
  고른다. 행이 없거나 후보가 없으면 no-op — 그대로 런치하고, 실제 한도는 §3.2가
  잡는다.
- 적용: `resolved_exec.accounts[runner] = candidate`,
  `account_sources[runner] = 'preempt_switch'`(신설 소스값). attempt 기록에
  `account_switched_from: current`를 싣는다(기존 필드 재사용). 그 다음
  `providerDispatchHeld`가 **바뀐 계정**으로 게이트를 본다 — 후보 규칙이 held
  계정을 이미 뺐으므로 통과한다.
- 기록: timeline에 `kind:'account_preempt'`, `summary: '<runner> 선제 전환 <from> →
  <to> (<창> <pct>%)'`. 푸시 알림은 보내지 않는다 — 임계를 넘긴 채로 있는 동안
  매 디스패치가 같은 결정을 내리므로 알림이 반복되고, 정보는 timeline과 attempt
  기록에 남는다.
- 리뷰 세션 dispatch(`dispatchReviewSession`)는 이 루프 밖이며 선제 전환을 받지
  않는다 — §8 관찰.

### 3.4 표시 어휘

- `gate-labels.js autoSwitchText`: `'disabled'` → `계정 전환 안 함 · 기다림 모드`,
  `'unconfigured'` → `계정 전환 안 함 · 전환 허용 계정 미지정`, `'none'` → 현행
  `조건을 만족하는 다른 계정 없음`(허용 집합 안에서라는 뜻이 되므로 문구는
  `허용 계정 중 사용 가능한 계정 없음`으로 고친다), `'cap'`·`null` → 빈 문자열.
- `notify.js providerHoldEntered`: 같은 세 문장. `providerRecovered`의
  `<from> → <to>`는 그대로. `HoldTile.auto_switch` typedef에 `'unconfigured'` 추가.
- 카드 요소는 새로 그리지 않는다: 슬롯 1 뱃지(`⏳ 한도 대기 …`)와 팝오버 dt/dd는
  그대로이고 문장만 바뀐다. 슬롯 표 갱신 대상이 없다(ADR 0014 무관).

### 3.5 실행 패널 UI — `실행 계정` 섹션

`execution-pane.js` `실행 계정` 그룹의 기존 "한도 대응" 체크 행을 러너별 블록 둘로
바꾼다. 재료는 이미 있는 `account_catalog`와 큐 스냅샷의
`provider_limit_policy`다.

```
실행 계정
  Claude        [기본값 사용 — 현재 로그인(…) ▾]
  Codex         [기본값 사용 — 현재 로그인(…) ▾]
  Claude 한도 대응   (●) 기다림   ( ) 자동 전환
    전환 허용 계정   [x] a@… (5h 12% · 7d 40%)   [ ] b@… (5h 70% · 7d 88%)
    선제 전환        [ ] 사용량 [80]% 이상이면 미리 전환
  Codex 한도 대응    …같은 형태…
```

- 모드: 세그먼트 버튼(워크플로우 모드 행과 같은 `settings-dialog__seg`),
  `mode` 즉시 저장.
- 허용 계정: 카탈로그 행별 체크박스, 라벨은 `claudeLabel`/`codexLabel`에 창
  퍼센트를 붙인 문자열. 저장된 key가 목록에 없으면 `<key> (목록에 없음)` 체크된
  항목으로 남겨 선택을 잃지 않는다(§6.1 규칙 재사용). 카탈로그를 못 읽으면 기존
  `계정 목록을 불러올 수 없습니다` 힌트를 그 러너 블록에 단다.
- 선제 전환: 체크 + `number` 입력(1–99, 기본 80). 체크 해제는 `preempt_pct:null`,
  체크는 입력값으로 저장. 입력 `change`에서 저장.
- 모드가 `기다림`이어도 허용 계정·선제 전환은 편집 가능하다(값은 보존되고 판정만
  모드가 막는다). 모드가 `기다림`이면 두 하위 행을 흐리게 그린다.
- 쓰기는 모두 `sendQueueCas('worker-provider-limit-policy-set', { runner, patch })`.
  실패는 기존 `자동화 설정 저장 실패` 토스트 경로.

## 4. 검토한 대안

- **허용 집합을 요금제 추론으로 대체** — 기각. 카탈로그(cswap·codex-auth)가
  요금제·모델 가용성을 주지 않고, 전환 뒤 실패 문구로 학습하는 방식은 한 번은 반드시
  실패해야 배운다. 명시 선택이 정본(결정 1).
- **정책을 kv `workspace_exec_accounts` 옆에 저장** — 기각. hold 진입 판정이 mutation
  안 동기 읽기여야 하고(F4), 기존 토글이 이미 큐 durable이다(§3.1).
- **선제 전환을 hold 진입 시점에만 두고 디스패치 시점은 두지 않음** — 기각. "직전에
  전환"의 실체는 한도에 걸리기 전 런치를 다른 계정으로 보내는 것이며, 그 지점은
  디스패치뿐이다(결정 2).
- **선제 전환이 Bead pin도 덮어씀** — 기각. pin은 이슈 단위 명시 선택이고 아직 한도에
  걸리지 않았다. 걸리면 §3.2가 pin 계정도 전환한다(현행과 같다).
- **전환 자식도 cap을 소비(현행 유지)** — 기각(결정 5). 계정 전환은 리셋 대기의
  대체이지 "자동 재개"의 소비가 아니며, 전환 뒤 리셋 회복을 수동 조치로 남기는
  것이 관측된 불편이다.
- **워크스페이스 기본 계정을 갱신하는 전역 전환** — 기각(결정 3). 다른 이슈·세션에
  번지고 되돌림 규칙이 필요하다.

## 5. 검증과 인수 기준

### Test scope

**RED 경계**는 변경 전에 실제로 실패해야 하는 것이고, **보존 검증**은 지금도
통과하지만 이 변경이 깨뜨리기 쉬운 동작을 고정하는 것이다.

#### RED 경계

`server/worker/queue-store.test.js`:

1. `provider_limit_policy`가 없고 `provider_auto_switch:false`인 raw 큐를 load하면
   두 러너 `mode`가 `'wait'`다.
2. `provider_limit_policy`가 없고 `provider_auto_switch`가 없거나 `true`인 raw는
   두 러너 `{ mode:'switch', accounts:[], preempt_pct:null }`로 load된다.
3. `setProviderLimitPolicy`가 revision CAS로 러너 하나의 patch만 병합하고 다른
   러너는 보존한다.
4. `accounts` 중복·공백 값과 범위 밖 `preempt_pct`가 정규화된다(중복 제거, `null`).
5. `holdProviderAttempt`가 `mode:'wait'`이면 `'disabled'`를 기록한다.
6. `mode:'switch'`이고 `accounts`가 비었으면 `'unconfigured'`를 기록하고 receipt를
   만들지 않는다.
7. lineage에 `auto_resume_kind:'provider_outage'`가 있어도 후보가 있으면 receipt를
   기록한다(`'cap'`을 더는 쓰지 않는다).
8. `auto_resume_kind:'account_switch'`를 가진 attempt가 정규화에서 보존된다.
9. `account_switch`로 태어난 자식만 있는 lineage는 `providerAutoResumeCapped`가
   `false`다 — 마커 존재를 먼저 단언한 뒤 cap을 본다.

`server/worker/scheduler.test.js`:

10. 허용 집합 밖의 건강한 계정은 후보가 아니다(같은 테스트에서 허용 안 계정은
    후보가 된다는 양성도 본다).
11. codex 러너의 `usage_limit` hold가 `listCodex()` 행에서 허용 후보를 고르고
    `exec_override.codex_account`로 재개하며 `account_sources.codex`가
    `'outage_switch'`다.
12. `account_switch` pending 소비가 자식에 `auto_resume_kind:'account_switch'`를
    스탬프한다.
13. `codex_account` 없이 뜬 codex attempt의 hold target `account`가 카탈로그
    `active_key`다.
14. 디스패치 시 상속 계정(`source:null` 또는 `'workspace_default'`)의 창이
    `preempt_pct` 이상이면 런치 계정이 허용 후보로 바뀌고 `account_sources`가
    `'preempt_switch'`, attempt에 `account_switched_from`이 실리며 timeline에
    `account_preempt`가 남는다.
15. `source:'bead'`인 계정은 창이 임계 이상이어도 바뀌지 않는다.
16. `preempt_pct:null`이면 창이 100%여도 바뀌지 않는다.
17. 선제 전환으로 바뀐 계정으로 `providerDispatchHeld`가 판정된다 — 원 계정이 held
    target이어도 디스패치된다.

`server/ws/worker-handlers.provider-outage.test.js`:

18. `worker-provider-limit-policy-set`이 공유 프로토콜에 선언되고
    `worker-provider-auto-switch-toggle`은 없다.
19. `runner` enum 밖, `mode` enum 밖, `preempt_pct` 범위 밖이 `bad_request`다.
20. 성공 응답이 CAS를 지키고 `provider_limit_policy`가 실린 큐 스냅샷을 fanout한다.

`server/worker/notify.test.js`:

21. `'unconfigured'`가 `계정 전환: 안 함 — 전환 허용 계정 미지정`으로, `'disabled'`가
    `기다림 모드` 문장으로 렌더된다.

`app/views/worker/gate-labels.test.js`:

22. `autoSwitchText('unconfigured')`와 `('disabled')`의 새 문장.

`app/views/settings-dialog/execution-pane.test.js`:

23. 모드 세그먼트 클릭이 `worker-provider-limit-policy-set { runner, patch:{mode} }`를
    보낸다.
24. 허용 계정 체크가 현재 집합에 key를 더하거나 빼서 `patch:{accounts}`로 보낸다.
25. 선제 전환 체크 해제가 `patch:{preempt_pct:null}`, 입력 변경이 정수값을 보낸다.
26. 목록에 없는 저장 key가 `(목록에 없음)` 체크 항목으로 남는다.

#### 보존 검증 (변경 전에도 통과한다)

27. `provider_outage` pending 소비는 여전히 `auto_resume_kind:'provider_outage'`를
    스탬프하고 §8.1 cap에 걸린다.
28. `classified.account === null`인 한도 hold는 여전히 전환하지 않는다.
29. 후보가 이미 다른 target의 계정이면 여전히 `'none'`이다.
30. `[지금 시작]` bypass는 선제 전환·게이트와 무관하게 그 행을 디스패치한다.

### 절차

`npx vitest run --reporter=dot`, `npm run tsc`, `npm run lint`,
`npx prettier --write <변경 파일>`, `npm run build`. 순서는 prettier → build다.

### 인수 기준

- RED 26건과 보존 4건이 통과하고 다섯 명령이 exit 0. RED는 구현 전 실패를 확인한
  뒤 통과시킨다.
- 실기: 허용 집합에 Pro 계정을 빼고 Max 계정만 넣은 뒤 한도 문구를 심은 attempt가
  Max 계정으로 재개되고, 허용 집합을 비우면 `전환 허용 계정 미지정`으로 타이머
  경로에 남는다.
- 실기: `preempt_pct=10`으로 두고 현재 계정 창이 그 이상일 때 새 디스패치의
  attempt 기록에 `account_switched_from`과 `account_sources.<runner>='preempt_switch'`가
  찍힌다.

## 6. 비목표

- 보류·프로브·리셋 타이머·§8.1 cap의 의미는 바꾸지 않는다. 바뀌는 것은 전환
  자식이 cap을 세지 않는다는 한 줄뿐이다.
- 후보 건강 임계(80/90)는 설정 키로 만들지 않는다.
- 워크스페이스 기본 계정·Bead pin·`bd kv`는 읽기만 하고 쓰지 않는다.
- outage target의 생명주기(UI-o5ll)는 건드리지 않는다.
- 세션 안 codex-runner 브리지의 계정 선택은 범위 밖이다(dotfiles).
- 리뷰 세션 dispatch에는 선제 전환을 적용하지 않는다.
- 카드 슬롯 표·새 카드 요소는 없다.

## 7. 구현 unit 후보 (advisory)

- `server`: §3.1–§3.4 — `queue-store.js`, `scheduler.js`, `notify.js`,
  `worker-handlers.js`, `connection.js`, `protocol.js`.
- `client`: §3.4–§3.5 — `gate-labels.js`, `running-grid.js`(typedef),
  `execution-pane.js`.

두 unit은 ws op 이름·payload와 `provider_limit_policy` 형태만 공유한다.

## 8. 경계·후속

이 설계의 형제 스펙은 없다 — 한 저장소·한 route·한 구현 단위다.

- 관찰: UI-o5ll §3.2가 outage target을 `usage_limit`으로 강등할 때 hold 진입
  mutation을 다시 타지 않으므로 그 target의 paused attempt는 전환 판정을 받지
  못한다. 두 스펙이 착지한 뒤 강등 시점의 전환 판정을 더할지는 별도 항목이다 —
  지금은 관측된 결함이 아니라 두 설계의 교차점이다.
- 관찰: 리뷰 세션 dispatch(`dispatchReviewSession`)는 디스패치 루프 밖이라 선제
  전환을 받지 않는다. 리뷰 attempt의 한도는 §3.2가 그대로 처리한다.
- 관찰: `workspace_exec_accounts`의 계약 등록 여부(2026-08-25 §2.2 dotfiles
  follow-up)는 이 스펙에도 같은 방식으로 적용된다 — `provider_limit_policy`는
  beads-ui 소유 워크스페이스 층이다.

## 결정 (ADR 후보)

- 전제: ADR 0049 — 공급자 보류의 표시·출구는 막힌 카드에 산다. 이 스펙은 카드
  요소를 더하지 않고 문장만 바꾼다.
- **한도 자동 전환은 사용자가 러너별로 고른 계정 집합 안에서만, attempt 단위로
  일어나며 자동 재개 cap을 소비하지 않는다; 선제 전환은 상속된 계정에만 적용된다.**
  되돌리기 어려움: 있음 — `provider_auto_switch` boolean이 `provider_limit_policy`
  객체로 대체되고 load 이관이 한 방향이며, `auto_resume_kind:'account_switch'`
  마커가 attempt 기록에 남는다 / 맥락 없이 놀라움: 있음 — 모드가 `자동 전환`인데
  허용 집합이 비면 전환하지 않고, Worker가 한도에 걸리기 전에 과금 풀을 바꾼다 /
  실제 트레이드오프: 있음 — 자동 추론의 편의 대 잘못된 계정으로의 전환, 선제
  전환의 창 소모 대 리셋 대기. 세 조건 충족이므로 ADR로 남긴다. `summary`: "Worker
  한도 자동 전환은 사용자가 러너별로 고른 허용 계정 집합 안에서만 attempt 단위로
  일어나고 자동 재개 cap을 소비하지 않으며, 선제 전환은 사용자 임계 이상의 상속
  계정에만 적용되고 Bead pin은 덮지 않는다." → ADR
