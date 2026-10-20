---
scope:
  - server/worker/runner/provider-outage.js
  - server/worker/runner/claude.js
  - server/worker/runner/session.js
  - server/worker/scheduler.js
  - server/worker/queue-store.js
  - server/worker/provider-holds.js
  - server/worker/notify.js
  - app/views/worker/lane-model.js
---

# Codex 리프 한도로 끝난 공급자 대기를 Codex 계정 보류에 묶는다 (UI-gggh)

Bead: UI-gggh. 출처: Telegram 헤르메스 thread 1157(2026-10-20). 기준 base:
`3574ff5de491d8ee445a729d0243b8fa8ba628ac`.

## 1. 목표

Worker attempt(러너 claude)가 codex-runner bridge로 맡긴 Codex 리프(리뷰·구현 leg)가
`usage_limit`으로 실패하고 전환 후보도 없으면, 세션은 `대기 · recovery:provider`로 끝난다.
지금은 이 대기가 공급자 보류(target)에 묶이지 않아 프로브도 해제도 없고, Codex 계정이
회복돼도 카드가 「확인 필요 · 대기 · recovery:provider」로 영원히 남는다(UI-refs·
dotfiles-2jg41, 2026-10-20 실측).

이 스펙 이후에는:

- 그 attempt가 리프가 쓴 **Codex 계정의 보류 target**에 묶여 `paused`가 된다.
- 기존 프로브가 그 Codex 계정이 다시 돈다고 판정하면 target이 풀리고, attempt는
  **자기 러너(claude)의 같은 세션**으로 자동 재개된다. 리프는 다음 실행에서 스스로
  계정을 고른다(switch-candidate API, ADR UI-9y1k).
- 증거가 없거나 계정·모델을 해석하지 못하면 지금처럼 `waiting`으로 남는다.

비목표: 세션 레인·대화형 세션의 리프 한도, 워크스페이스 단위 크레딧 보류(UI-59f1,
deferred), dotfiles 계약·bridge payload 변경.

## 2. 검증된 전제

- 결과 줄 `recovery:provider`는 설계상 공급자 보류 경로로 간다 — docs/superpowers/specs/2026-09-21-worker-wait-guard-simplification-design.md:138-140
- 세션 대기를 보류로 잇는 함수는 결과 줄이 `recovery_wait`/`provider`일 때만 adapter 분류기를 부른다 — server/worker/scheduler.js:2918-2945
- 현재 분류기는 Claude `rate_limit_event`(status `rejected`)만 증거로 본다 — server/worker/runner/provider-outage.js:522-545 (5c0b8bf6, 스펙 없는 fix)
- 분류기가 null이면 `session_recovery_wait`로 실패 기록 → recovery 분기가 `waiting`만 저장한다 — server/worker/scheduler.js:7454-7487, :6433-6468
- 호출 지점은 실시간 종료·disposition 종료·영속 로그 reconcile 셋이다 — server/worker/scheduler.js:7458, :8666, :9482
- `verdict.raw`는 세션 로그 전 줄이며 서브에이전트 안 이벤트(`parent_tool_use_id` 비어 있지 않음)와 tool_result 본문을 거르지 않는다 — server/worker/runner/session.js:664-665, :834; 영속 로그 읽기도 같다 — server/worker/session-log.js:1020-1048
- bridge 결과 매니페스트는 dotfiles 소유의 문서화된 계약이다: `bridge_result.transport='codex_runner_bridge'`, `error_code`(`usage_limit` 등), `limit_kind`(`account`|`workspace_credits`|null), `account_number`(양의 정수|null, `usage_limit`일 때만), `requested_model` — dotfiles src/shared/skills/tools/codex-runner-bridge/references/result-schemas.md, scripts/run.sh:243-279, :356, :387
- UI-refs 로그(sessions/UI-refs-1792464653874-1.jsonl) 1067번째 줄: 서브에이전트 Bash tool_result 본문 문자열이 JSON 봉투이고 `bridge_result = {transport: codex_runner_bridge, error_code: usage_limit, limit_kind: workspace_credits, account_number: 2, requested_model: gpt-6-astra}`; 같은 세션의 `rate_limit_event`는 모두 `allowed` — python으로 로그 파싱해 확인
- 같은 로그의 1064번째 줄은 `bridge_result: null, live: true`인 중간 폴링이고, `usage_limit` 문자열은 Bead notes·스킬 본문 등 무관한 이벤트에도 20여 곳 나온다 — 같은 파싱
- 계정 번호 → 계정 키는 Codex 카탈로그 `listCodex()`의 `{key, number}`로 바꾼다; switch-candidate 라우트가 이미 같은 대조를 쓴다 — server/worker/account-catalog.js:67, server/routes/codex-usage.js:204-255, server/routes/codex-switch-candidate.js:215 부근
- 미확인: Codex 계정 번호가 계정 추가·삭제 뒤에도 같은 계정을 가리키는지 — codex-auth 문서 없음; 번호 중복 검사도 없다(server/routes/codex-usage.js:323-337)
- Codex 카탈로그 모델 키는 별칭·고정 이름(`astra`, `sol-5.6` …)이고 값의 `id`가 `gpt-6-astra` 같은 실제 id다 — `resolveCatalog()` 실행으로 확인(server/worker/runner-catalog.js:641)
- 프로브는 `catalog.runners[runner].models[target.model]`이 없으면 `probe_route_unavailable`이다 — server/worker/provider-health.js:657-662
- 프로브는 target 계정이 카탈로그 목록에 없으면 첫 프로브에서 `account_absent`로 해제한다 — server/worker/provider-health.js:892-910
- `holdAttempt`는 정책·전환 후보·store `runner`·중복 진입 가드·타임라인·알림을 모두 `attempt.runner`로 고른다 — server/worker/scheduler.js:6846, :6861-6873, :6883, :6904-6908, :6925-6945
- 계정은 `providerAccountContext(attempt)`가 attempt 러너로 해석하므로 claude attempt는 Claude 계정이 나온다 — server/worker/scheduler.js:1933-1975
- `holdProviderAttempt`는 `runner`를 입력으로 받고 attempt 러너와 대조하지 않으며 멤버에 `{runner, target_id, account, auto_switch}`를 쓴다 — server/worker/queue-store.js:9482-9570
- 해제 영수증은 멤버 계정을 싣고(server/worker/queue-store.js:10224-10233), 소비 측은 그 계정을 attempt 러너의 override 키에 넣는다(`claude_account`) — server/worker/scheduler.js:16109, :16128-16131; Claude 해석기에 Codex 키가 들어가면 `exec_override_invalid` → permanent 거부로 영구 정지 — server/worker/scheduler.js:16593-16611, server/worker/continuation-refusal.js:87-105
- 영수증 계정이 null이면 `resolve_provider_account`로 attempt 러너의 계정을 다시 해석하고, 기록된 claude 세션을 transcript째 재개한다 — server/worker/scheduler.js:16122, :17344-17369, :17498-17514
- 전환 재평가·보류 attempt 전환·멤버 전환 묶음·기다림 추종은 멤버의 러너를 거르지 않는다 — server/worker/scheduler.js:2187-2292, server/worker/queue-store.js:6702, :6751, :6785, :9820-9877; 투영의 대표 멤버는 첫 멤버다 — server/worker/provider-holds.js:267
- 멤버 정규화는 알려진 필드만 남긴다 — server/worker/queue-store.js:5113
- 무진전 자동 재개 상한·`stop_head_oid`·`leafPausedBeads` 디스패치 차단은 러너와 무관하다 — server/worker/queue-store.js:5249-5281, server/worker/scheduler.js:5900
- 카드의 보류 target 조회는 `provider_hold[attempt.runner]`만 본다 — app/views/worker/lane-model.js:1327-1342; 모든 러너를 attempt_ids로 훑는 선례 — app/views/worker/provider-resume-dialog.js:42-58, server/worker/wait-judgment.js:1000-1065
- `reconcile`은 부팅과 60초마다 돌고 끝에서 `reclassifyPreservedFailures`를 부르며, 그 함수는 이미 recovery가 있는 `waiting` 행을 건드리지 않는다 — server/worker/scheduler.js:10155, :12017-12112, server/worker/attach.js:1635-1642, :3227
- 디스패치 게이트는 `provider_hold[runner]`만 읽으므로 계정 범위 Codex target은 그 계정으로, 또는 계정을 해석하지 못한 채로 나가는 Codex 실행만 막고 Claude 실행은 막지 않는다 — server/worker/scheduler.js:4155
- `usage_limit` target의 프로브 실패는 `rearm_count`만 올리고 재프로브를 멈추는 상한이 없다(표시용 관측) — server/worker/provider-health.js:1313-1330; `grep -rn "rearm_count *>=" server`(테스트 제외) 0건
- 리셋 시각 미상 `usage_limit` target은 `provider_usage_unknown_reset_seconds`(기본 900초) 간격으로 재프로브한다 — server/worker/provider-health.js:36, :71

## 3. 설계

### 3.1 증거 — bridge 매니페스트 판정

claude adapter의 recovery 분류는 증거 원천을 하나 더 읽는다. 스트림을 뒤에서부터 훑어
**처음 만나는 증거 하나**로 정한다:

- Claude `rate_limit_event` `rejected` → 지금 그대로(Claude 계정 보류).
- tool_result 본문(문자열, 또는 text 블록들을 이은 것) **전체가 JSON 객체로 파싱되고**
  그 안 `bridge_result`가 null이 아닌 객체이며 `transport === 'codex_runner_bridge'`이고
  `error_code === 'usage_limit'`인 것 → Codex 리프 증거
  `{runner: 'codex', account_number, limit_kind, requested_model}`.
- 그 밖의 매니페스트(성공·다른 오류), `bridge_result: null`인 폴링, 부분 문자열 일치,
  서브에이전트 hand-back 산문은 증거가 아니다 — 건너뛰고 계속 훑는다. 그래서 Claude
  증거만 있는 스트림의 판정은 지금과 같다.

결정: 증거는 구조화된 매니페스트 파싱만 쓴다 (대안: `usage_limit` 부분 문자열 검색;
이유: 같은 토큰이 notes·스킬 본문 등 무관한 이벤트에 20여 곳 나온다).

### 3.2 계정·모델 해석과 보류 진입

scheduler는 Codex 리프 증거를 받으면:

1. `account_number`가 null이거나 `listCodex()` 목록에서 그 번호의 행이 정확히 하나가
   아니면 보류하지 않는다(지금처럼 `waiting`).
2. `requested_model`과 같은 키, 또는 `id`가 같은 Codex 카탈로그 항목을 찾는다(별칭 키
   우선). 없으면 보류하지 않는다 — 프로브가 돌 수 없는 target은 출구가 없다.
3. target `(runner: codex, kind: usage_limit, model: <카탈로그 키>, account: <계정 키>)`로
   `holdAttempt`를 부른다. `detail`은 `usage_limit`, `scope`는 `account`,
   `resets_at`은 null(리셋 시각 미상 재프로브 주기를 따른다). `limit_kind:
   workspace_credits`도 계정 범위다(UI-59f1이 바꿀 몫).

`holdAttempt`는 target 러너·계정·모델을 인자로 받을 수 있게 되고, 중복 진입 가드·store
`runner`·타임라인·`providerHoldEntered` 알림은 target 러너를 쓴다. 다른 러너 target에 들
때 진입 시점 전환 후보 선택은 하지 않는다(세션이 이미 switch-candidate로 물었다).

이 target은 일반 Codex 계정 보류와 같아서, 그 계정으로(또는 계정 미해석으로) 나가는 다른
Codex 디스패치도 회복 때까지 막는다 — 실제로 바닥난 계정이므로 의도한 효과다. Claude
디스패치는 막지 않는다.

### 3.3 다른 러너 멤버의 규칙

target 러너와 attempt 러너가 다른 멤버(이하 **교차 멤버**)는:

- 전환하지 않는다: 진입 전환·전환 재평가·보류 attempt 전환·멤버 전환 묶음의 대상이
  아니고, 같은 target의 Codex 멤버 `auto_switch`를 바꾸지 않는다(투영 대표 멤버는 첫
  비교차 멤버).
- 기다림 모드 추종을 하지 않는다(`waitMemberOf` 제외).
- 해제 영수증 계정은 null이다 → 재개 때 attempt 러너의 계정을 다시 해석하고
  continuation은 `auto`(기록된 claude 세션 재개).
- 무진전 상한·디스패치 차단·폐기·✕ 정리는 지금 규칙 그대로다.

결정: 교차 멤버는 전환·기다림 추종에서 빠지고 해제 영수증 계정은 null이다 (대안: 일반
멤버처럼 다룸; 이유: Codex 계정 키가 `claude_account` override로 들어가 permanent
`exec_override_invalid`로 영구 정지한다 — 고치려는 증상과 같다).

예: 멤버 기록에 표식 필드를 더하거나(정규화에 추가 필요), `attempts[id].runner !==
member.runner`로 유도한다.

### 3.4 이미 `waiting`인 행

`reconcile`의 `reclassifyPreservedFailures` 다음에 한 번짜리 소급 판정을 둔다. 대상:
`waiting` + cause `session_recovery_wait` + `recovery.reason === 'provider'` + 보류 멤버
아님 + 소급 판정 표식 없음 + 영속 세션 로그 있음, 그리고 기존 스윕과 같은 제외(Bead
claim 중, 폐기 진행 중, 재개 진행 중, 철회·✕). 영속 로그로 §3.1·§3.2를 적용해 보류하거나,
보류하지 못하면 표식만 남긴다. 표식은 같은 2MB 로그를 60초마다 다시 읽지 않게 하는 용도다.
첫 대상은 dotfiles-2jg41-1792464695879-1이다.

### 3.5 표시와 알림

- 카드의 보류 target 조회는 모든 러너의 `attempt_ids`를 훑는다(선례: provider-resume-dialog).
  팝오버의 모델·계정 줄은 target의 Codex 모델·계정을 보인다.
- 진입 타임라인 예: `codex usage_limit 보류 (리프)`; 진입 알림의 러너는 codex이고, 전환
  안 함 사유 줄은 교차 멤버라서 전환하지 않음을 말한다(예: `세션 리프 한도 — 회복 때 같은
  세션 재개`).
- 재개 뒤 타임라인·알림은 지금처럼 attempt 러너로 남는다.

## 4. 오류 처리

- 계정·모델 해석 실패, 카탈로그 읽기 실패 → 보류하지 않고 지금의 `waiting`(fail-quiet).
- 보류 뒤 계정이 목록에서 사라지면 기존 `account_absent` 해제 → 재개(지금 규칙).
- 재개된 세션이 다시 같은 한도로 끝나면 다시 보류되고, 무진전 재개 상한(2회)이 반복을 끊는다.
- 회복이 오래 걸려도 target은 900초 간격 재프로브를 계속한다(상한 없음, §2) — 프로브 비용은
  계정당 짧은 `codex exec` 한 번이다. `resets_at`은 null로 두고 카탈로그 창 리셋 시각은
  읽지 않는다(필요해지면 별도).

## 5. 테스트

- `provider-outage.test.js` recovery 분류 묶음 옆: bridge 매니페스트 usage_limit → Codex
  증거; `bridge_result: null` 폴링·산문 속 토큰 → null; 최근 증거 우선(Claude rejected vs
  bridge).
- `scheduler.test.js` `providerRecoveryFixture` 변형(live·persisted): claude attempt +
  Codex 리프 증거 → `provider_hold.codex` target에 묶이고 `paused`; 번호 미해석·모델
  미해석 → `waiting` 유지.
- 교차 멤버: 해제 영수증 계정 null → claude 세션 재개(`exec_override` 없음); 전환 재평가·
  기다림 모드에서 교차 멤버 제외.
- 소급 판정: 대상 행 보류, 표식 뒤 재판정 없음.
- `lane-model.test.js`: `provider_hold.codex`에 든 claude attempt가 ⏳ 칩과 Codex 계정 줄로
  그려진다.

## 6. 경계·후속

- 관찰: 세션 레인·대화형 세션의 리프 한도 대기 — 이번 범위 밖, 요청 없음
- 관찰: 워크스페이스 크레딧을 워크스페이스 단위로 막기 — UI-59f1(deferred)이 소유

## 결정 (ADR 후보)

- 전제: ADR UI-9y1k — 보류 해제는 프로브만이 판정하고(UI-o5ll 승계), 세션 리프는 같은
  규칙의 후보 조회 API로 계정을 고른다; 이 설계는 새 해제 경로를 만들지 않고 기존 target에
  멤버를 하나 더 묶는다.
- 보류 target에 다른 러너의 attempt를 교차 멤버로 묶고, 교차 멤버는 전환·기다림 추종에서 빠지며 해제 뒤 자기 러너 계정으로 재개한다 — 첫 조건 실패: 멤버 기록은 해제 때 비워지고 되돌리기는 scheduler·queue-store 안의 조건 몇 줄이라 함께 움직일 외부 소비자가 없다 → ADR 아님
- 리프 증거는 bridge 매니페스트 구조 파싱으로만 판정 — 기본 제외 목록(한 파일 안 구현 선택) → ADR 아님
