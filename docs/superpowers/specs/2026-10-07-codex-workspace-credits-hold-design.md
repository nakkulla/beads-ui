---
scope:
  - server/worker/runner/codex-outage.js
  - server/worker/runner/session.js
  - server/worker/provider-holds.js
  - server/worker/provider-health.js
  - server/worker/queue-store.js
  - server/worker/scheduler.js
  - server/worker/notify.js
  - app/views/worker/lane-model.js
  - app/views/worker/lanes.js
  - app/views/worker/failure-labels.js
---

# Codex 워크스페이스 크레딧 소진은 같은 워크스페이스 계정 전체를 막는다 (UI-59f1)

Bead: UI-59f1. 출처: UI-nvmb 후속 질의(2026-09-29 재현). 기준 base:
`996e28ad36f1a4d7b64625fefabd6000350a354c`.

## 1. 목표

Codex의 "Your workspace is out of credits." 실패는 **워크스페이스**(여러 계정이
함께 쓰는 ChatGPT Business 공간) 전체의 크레딧이 바닥난 것이다. 그런데 지금은
개인 플랜 한도와 똑같이 **계정 하나**의 `usage_limit`으로 보류한다. 그래서:

- 자동 전환이 같은 워크스페이스의 다른 계정을 고르고, 10분 뒤 같은 오류로 다시
  보류된다(2026-09-15 실측: nakkulla2 Business → nakkulla@gmail Business).
- 같은 워크스페이스의 다른 계정으로 가는 새 디스패치도 보류 게이트를 통과해 같은
  실패를 반복한다.

이 스펙 이후에는 워크스페이스 크레딧 소진이 그 워크스페이스에 속한 **모든 계정**을
막는다. 자동 전환은 다른 워크스페이스 계정으로만 가고, 그런 후보가 없으면 전환하지
않는다. 개인 플랜 한도("You've hit your usage limit.")는 지금처럼 계정 하나만 막는다.

## 2. 검증된 전제

- 맨 메시지 `Your workspace is out of credits.`와 개인 한도 `You've hit your usage limit.`은 같은 분기에서 똑같이 `{detail:'usage_limit', scope:'account'}`로 분류된다 — `server/worker/runner/codex-outage.js:31`, `:33`, `:261-267`
- 429 봉투 경로는 본문의 `credits?` 등 문구로 `usage_limit`/`account`를 낸다 — `server/worker/runner/codex-outage.js:49-50`, `:229-235`
- 보류 진입은 `outage.detail === 'usage_limit'`으로 target kind를 정하고, 전환 정책이 `switch`이고 계정이 해석되면 **보류를 저장하기 전에** 전환 후보를 고른다; 저장 뒤 새로 생긴 target이면 그 판정으로 알림을 보내고, 그다음 보류 attempt 전환을 재평가한다 — `server/worker/scheduler.js:6534-6551`, `:6564`, `:6604-6612`, `:6651`
- 전환 후보 선택은 유효 보류의 `target.account` 문자열 집합만 빼고, 워크스페이스 개념이 없다 — `server/worker/scheduler.js:1934-1965`(`:1946-1955`); `::`로 계정 키를 가르는 코드는 서버에 없다(`grep -rn "'::'" server --include='*.js'`, 테스트 제외)
- 후보 필터는 `status === 'ok'`도 요구한다(UI-wiwh 착지, 로그인 만료 계정 제외) — `server/worker/scheduler.js:1960`
- 보류 계정 집합을 계정 문자열로 읽는 곳이 여러 군데다: 전역 `heldAccounts` — `server/worker/provider-holds.js:540-545`; 큐 `heldAccountsOf`·`switchDecision` — `server/worker/queue-store.js:6426-6463`; 보류 attempt 전환 재검증 — `:9349-9376`; 선제 전환의 현재 계정 보류 판정 — `server/worker/scheduler.js:3648-3654`
- 디스패치 게이트는 계정 범위 target을 `target.account === account`일 때만 막는다 — `server/worker/scheduler.js:3839-3925`(`:3914-3916`)
- target 범위는 `providerTargetScope`가 정한다(`usage_limit`은 계정 있으면 account, 없으면 unresolved; 계정 있는 `credential`은 account; 그 밖은 runner) — `server/worker/provider-holds.js:127-135`; 클라이언트 칩 예측은 같은 함수의 복제본과 계정 일치 비교를 쓴다 — `app/views/worker/lane-model.js:1575-1582`, `:1602-1627`
- 전역 target과 저장소 로컬 target은 각자의 normalizer가 알려진 필드만 재조립하고, 저장소 투영도 필드를 나열한다 — `server/worker/provider-holds.js:142-180`, `:251-318`, `server/worker/queue-store.js:4847-4897`
- 전역 target 병합 키는 `(runner, kind, model, account)`다 — ADR UI-3v1h Decision "전역 원본"; `server/worker/provider-holds.js:566-594`
- 프로브가 계정 범위로 재분류하면 `updateTarget`이 `kind`·`detail`·`resets_at`을 덮어쓴다 — `server/worker/provider-health.js:1058-1066`; 리셋 시각이 없는 `usage_limit`은 `provider_usage_unknown_reset_seconds`(기본 900초) 간격으로 재프로브한다 — `server/timing-settings.js:100-105`, `server/worker/provider-health.js:699`
- 프로브는 target 계정의 `CODEX_HOME` 미러로 `codex exec`를 돌리고, 성공하면 전역 target을 지운다 — `server/worker/provider-health.js:481-532`, `:873`
- target 계정이 codex-auth 목록에서 사라지면 `account_absent`로 해제한다 — `server/worker/provider-health.js:723`
- 진입 알림은 `usage_limit`이면 `계정:` 줄과 전환 안 함 사유를 싣는다 — `server/worker/notify.js:1004-1034`
- 실패 라벨은 `provider_outage:usage_limit`을 "계정 사용 한도로 보류"로 그린다 — `app/views/worker/failure-labels.js:113-127`
- 칩 라벨은 계정을 싣지 않는다(`⏳ 공급자 보류 <HH:MM>`) — `app/views/worker/gate-labels.js:52`; 보류 팝오버 줄은 `app/views/worker/lane-model.js:1643-1725`와 `app/views/worker/lanes.js:2618-2669`(`provider_lines`) 두 곳이 만든다
- 계정 키의 `::` 뒤쪽은 그 계정 `auth.json`의 `tokens.account_id`(ChatGPT 워크스페이스 id)와 같다 — 2026-10-07 `~/.codex/accounts/*.auth.json` 6개를 대조(값은 출력하지 않고 일치만 확인); `~/.local/state/bdui/codex-homes/` 디렉터리 이름(base64url 키) 5개를 디코딩하면 서로 다른 `user-…` 두 개가 같은 `::3fdb8f9b…`를 공유한다
- beads-ui는 `auth.json` 내용을 읽지 않고 경로를 `lstat`·심링크로만 다룬다 — `server/worker/codex-account-home.js:252-262`, `:281-339`; 서버 코드에 `account_id` 읽기가 없다(`grep -rn account_id server --include='*.js'`, 테스트 제외 0건)
- 미확인: 계정 키 형식은 codex-auth의 공개 계약이 아니다 — codex-auth 소스·문서를 찾지 못했고 UI-3v1h 스펙도 키를 불투명 문자열로 둔다
- 미확인: 429 봉투에 credits 문구가 실린 실제 사례 — 테스트·실측 모두 맨 메시지만 있다
- 미확인: 크레딧 충전 뒤 프로브가 실제로 통과하는지 — 코드 경로(프로브 성공 = 해제)로만 확인

## 3. 설계

### 3.1 분류 (codex-outage.js)

- 결정: 맨 메시지 `Your workspace is out of credits.`(`WORKSPACE_CREDITS_RE`)만
  워크스페이스 소진으로 표시한다. 분류 결과는 지금처럼 `detail:'usage_limit'`,
  `scope:'account'`이고, 표지 하나를 더한다(예: `workspace_credits: true`).
  `scope`에 새 값을 넣지 않는다 — 프로브 결과의 `scope` 분기
  (`provider-health.js:1035`, `:1058`)가 그대로 동작해야 하기 때문이다.
- 결정: 429 봉투 경로는 바꾸지 않는다(대안: 봉투 본문의 credits 문구도 워크스페이스로
  올림. 이유: 실제 사례가 없고 `\bcredits?\b`는 개인 크레딧과 구별하지 못한다).
- 개인 한도 문구는 표지 없이 지금과 같다.

### 3.2 워크스페이스 식별

- 결정: 계정 키의 **마지막 `::` 뒤** 문자열을 워크스페이스 id로 본다. `::`가 없거나
  뒤가 비면 워크스페이스를 모르는 것으로 보고, 그 target은 지금처럼 **계정 하나**만
  막는다(fail-quiet). 잘못 읽어서 막는 범위가 넓어지는 것보다 오늘의 동작으로 남는
  쪽이 안전하다.
- 키를 가르는 함수는 서버 한 곳(`provider-holds.js`)에 두고, 클라이언트 칩 예측은
  같은 규칙의 복제본을 쓴다(기존 `providerTargetScope` 복제 관례). 비밀 파일
  (`auth.json`)은 읽지 않는다.

### 3.3 보류 target

- 결정: 워크스페이스 소진으로 진입한 `usage_limit` target은 `workspace` 필드에
  워크스페이스 id를 갖는다. 계정을 모르거나 키에서 워크스페이스를 못 읽으면 필드는
  `null`이다. kind·detail·병합 키는 바꾸지 않는다.
- 결정: target은 지금처럼 **계정마다** 하나다(대안: 워크스페이스당 하나로 병합. 이유:
  병합 키·멤버십·`findBy`·`account_absent` 해제가 모두 흔들리는데, 게이트가 같은
  워크스페이스 계정의 새 디스패치를 막으므로 중복 target은 이미 돌던 attempt에서만
  생긴다).
- 전역 normalizer, 저장소 로컬 normalizer, 저장소 투영(`effectiveProviderHolds`)
  세 곳이 `workspace`를 보존한다. 필드가 없는 기존 target·영수증은 `null`로 읽혀
  계정 범위다 — 마이그레이션 없음.
- 프로브 재분류가 target을 고칠 때 `workspace`도 그 분류 결과로 다시 쓴다: 다시
  워크스페이스 소진이면 유지, 개인 한도면 `null`(계정 범위로 좁아짐).

### 3.4 범위 판정 하나로 모으기

- 결정: "이 target이 계정 X를 막는가"를 판정하는 함수를 `provider-holds.js`에 하나
  둔다. 규칙: `target.account === X`이거나, `target.workspace`가 있고 X의 워크스페이스가
  그것과 같다. 서버의 모든 계정 일치 지점이 이 함수를 쓴다:
  - 전환 후보 제외(`selectProviderSwitchAccount`), 큐의 전환 판정과 보류 attempt
    전환 재검증(`switchDecision`, `switchHeldProviderAttempts`), 전역
    `heldAccounts` 소비처
  - 디스패치 게이트(`providerDispatchHeld`)
  - 선제 전환의 "현재 계정 보류 중" 판정(`applyPreemptSwitch`)
- 클라이언트 `providerGate`도 같은 규칙으로 예측한다(UI-3v1h: 서버 게이트와 칩
  예측은 같은 규칙).
- 결정: 보류 **진입 때의 첫 후보 선택**도 이미 있는 target과 함께 **지금 진입하려는
  target**(워크스페이스 표지 포함)을 같은 범위 판정으로 검사한다. 저장 전에 고르는
  첫 선택이 진입 예정 target을 모르면, 같은 워크스페이스 계정 B를 고른 뒤 큐가 거절해
  다른 워크스페이스 계정 C가 있어도 `auto_switch:'none'` 알림이 먼저 나가기 때문이다.
- 결과: 전환 후보가 같은 워크스페이스뿐이면 후보 없음이 되어 기존
  `auto_switch:'none'`으로 끝난다. 새 상태는 없다.

### 3.5 해제

- 해제 조건은 바꾸지 않는다: 리셋 시각이 없으므로 `provider_usage_unknown_reset_seconds`
  간격으로 target 계정에서 프로브하고, 통과하면(= 워크스페이스가 충전됨) 해제한다.
  같은 워크스페이스의 계정 target이 여럿이면 각자 프로브하고 각자 풀린다. 하나가
  통과하면 나머지도 다음 프로브에서 통과한다.
- `account_absent` 해제는 그대로 둔다(§경계·후속 관찰).

### 3.6 표시

칩 라벨과 카드 줄은 바꾸지 않는다(카드 문법 슬롯 추가 없음). 문구만 범위를 말한다.

- 보류 팝오버(두 렌더러): `workspace`가 있는 target에 줄 하나 —
  `워크스페이스 크레딧 소진 · 같은 워크스페이스 계정 모두 보류`.
- 실패 라벨: 워크스페이스 소진이면 `워크스페이스 크레딧 소진으로 보류`(리셋 시각 없음).
  필요한 표지는 보류 진입이 실패 원인 상세(`cause_detail`)에 함께 싣는다.
- Discord 진입 알림: `계정:` 줄 다음에 `범위: 워크스페이스 전체(같은 워크스페이스 계정
  모두 보류)`. 후보가 없을 때의 `계정 전환: 안 함 — 허용 계정 중 사용 가능한 계정
  없음`은 그대로다.

## 4. 오류 처리

- 계정 미해석 target은 지금처럼 그 저장소에만 남아 fail-closed다(워크스페이스 판정
  대상이 아니다).
- 키 형식이 바뀌어 워크스페이스를 못 읽으면 계정 범위로 동작한다(§3.2).

## 5. 수용 기준

1. 같은 워크스페이스 계정 A·B와 다른 워크스페이스 계정 C가 허용 목록에 있을 때, A의
   워크스페이스 크레딧 소진은 B가 아니라 C로 전환한다 — 기존 보류가 없고 B의 사용량이
   C보다 낮은 첫 진입에서도 처음부터 C를 고르고 `auto_switch:'none'` 알림을 보내지
   않는다. C가 없으면 전환하지 않고 `auto_switch:'none'`이다.
2. A가 워크스페이스 소진으로 보류된 동안 B로 가는 새 디스패치는 모든 저장소에서 막히고,
   C로 가는 디스패치는 막히지 않는다.
3. 개인 한도는 지금처럼 그 계정만 막는다.
4. `::`가 없는 키의 워크스페이스 소진은 그 계정만 막는다.
5. 프로브 통과로 해제되면 같은 워크스페이스 계정의 디스패치가 다시 열린다.
6. `workspace` 필드가 없는 기존 상태 파일을 읽어도 동작이 지금과 같다.
7. 칩 예측(`providerGate`)과 서버 게이트가 같은 결과를 낸다.

## 6. 테스트

- `server/worker/runner/codex-outage.test.js`: 맨 메시지 표지, 개인 한도 무표지, 봉투
  경로 무표지.
- `server/worker/provider-holds.test.js`: 키 파싱(정상·`::` 없음·빈 뒤쪽), 범위 판정
  함수, normalizer·투영의 `workspace` 보존과 부재 기본값.
- `server/worker/scheduler.test.js`: 수용 기준 1·2·5(같은 워크스페이스 후보 제외,
  게이트, 선제 전환), 기존 보류 없는 첫 진입에서 B보다 C를 고르고 잘못된
  `auto_switch:'none'` 알림이 없음.
- `server/worker/queue-store.test.js`: `switchDecision`·보류 attempt 전환 재검증.
- `server/worker/provider-health.test.js`: 재분류 시 `workspace` 유지·해제.
- `app/views/worker/lane-model.test.js`: 칩 예측이 같은 워크스페이스 계정을 막음.
- `app/views/worker/failure-labels.test.js`, `server/worker/notify.test.js`: 문구.

## 7. 대안

- 새 `detail`(`workspace_credits`) — `detail === 'usage_limit'`을 정확히 비교하는 곳이
  여러 군데라 하나라도 놓치면 전환 경로에서 조용히 빠지고, outage로 잘못 가면 러너
  전체를 막는다. 기각.
- 새 target kind — kind 어휘가 normalizer 여럿에 박혀 있어 파급이 가장 크다. 기각.
- `auth.json`의 `account_id`를 직접 읽기 — 지금 beads-ui가 읽지 않는 비밀 파일이다. 기각.

## 8. 비목표

- 429 봉투의 credits 문구 분류, 워크스페이스당 target 병합, codex-auth 키 형식의
  계약화, Claude 러너.

## 결정 (ADR 후보)

- 전제: ADR UI-u6ud-2 — 외부 형식(계정 키)을 모르면 동작을 넓히지 않고 지금처럼 둔다(fail-quiet).
- 워크스페이스 크레딧 소진 target은 같은 워크스페이스의 모든 계정을 막는다 — 첫째(되돌리기 어려움): 전역 상태 파일의 target 필드, 서버 게이트·전환·선제 전환, 큐 전환 판정, 클라이언트 칩 예측이 같은 범위 규칙으로 함께 움직여야 한다. 둘째(대안이 실재): 계정 범위 유지·새 detail·워크스페이스 병합 target이 있었다. 셋째(ADR UI-3v1h와 충돌): UI-3v1h의 "`usage_limit` target은 그 계정을 막는다" 범위 조항을 바꾸므로 같은 소비자 집합의 그 ADR을 대체하고 조항 전부를 승계한다.
  - `summary`: "공급자 보류의 원본은 서버 전역 하나이고 usage_limit·인증 실패는 계정, 그 밖의 outage는 러너 단위로 모든 저장소의 디스패치와 전환 후보를 막되, Codex 워크스페이스 크레딧 소진 usage_limit은 계정 키에서 읽은 같은 워크스페이스의 모든 계정을 막고 워크스페이스를 못 읽으면 계정만 막는다; 계정 미해석 target만 저장소에 남고, 저장소는 보류 attempt를 target_id·계정 멤버십으로 가리키며, 해제는 전역 한 번 뒤 각 저장소가 자기 멤버십을 정산한다 — UI-a5l2의 가드·공급자 조항은 그대로 승계한다" → ADR, supersede UI-3v1h
- 팝오버·실패 라벨·알림 문구 — UI 표시 형식(기본 제외 목록) → ADR 아님

## 경계·후속

- 관찰: target 계정이 codex-auth 목록에서 사라지면 워크스페이스가 아직 소진 상태여도 `account_absent`로 풀린다 — 풀린 뒤 첫 디스패치가 같은 오류로 다시 보류되므로 손실은 헛디스패치 한 번이고, 실제로 반복되면 결함으로 연다.
- 관찰: 429 봉투 경로의 credits 문구 — 실제 사례가 관측되면 분류를 넓히는 후속으로 연다.
